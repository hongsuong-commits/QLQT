import express from 'express';
import { randomUUID } from 'node:crypto';
import { db, nowIso, withTransaction } from '../db.js';
import { httpError, validateSubmission } from '../lib/validate.js';

export const attemptsRouter = express.Router();

function playable(question) {
  return {
    position: question.position,
    content: question.content,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,
  };
}

function sessionPayload(session) {
  const exam = db
    .prepare('SELECT id, title, subject, topic, duration_minutes FROM exams WHERE id = ?')
    .get(session.exam_id);
  const questions = JSON.parse(session.questions_json);
  return {
    attemptId: session.id,
    startedAt: session.started_at,
    exam: {
      id: exam?.id ?? session.exam_id,
      title: exam?.title ?? 'Đề đã xóa',
      subject: exam?.subject ?? '',
      topic: exam?.topic ?? '',
      durationMinutes: exam?.duration_minutes ?? 0,
    },
    questions: questions.map(playable),
  };
}

attemptsRouter.post('/start', (req, res) => {
  const examId = String(req.body?.examId ?? '');
  const exam = db.prepare('SELECT * FROM exams WHERE id = ?').get(examId);
  if (!exam) throw httpError('Không tìm thấy đề thi.', 404);

  const questions = db
    .prepare('SELECT * FROM questions WHERE exam_id = ? ORDER BY position')
    .all(examId)
    .map((question) => ({
      position: question.position,
      questionId: question.id,
      content: question.content,
      optionA: question.option_a,
      optionB: question.option_b,
      optionC: question.option_c,
      optionD: question.option_d,
      correctOption: question.correct_option,
    }));
  if (questions.length === 0) throw httpError('Đề thi chưa có câu hỏi nào.', 400);

  const documentIds = db
    .prepare('SELECT document_id FROM exam_documents WHERE exam_id = ?')
    .all(examId)
    .map((row) => row.document_id);

  const id = randomUUID();
  const startedAt = nowIso();
  db.prepare(
    `INSERT INTO attempt_sessions (id, exam_id, started_at, questions_json, document_ids_json)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, examId, startedAt, JSON.stringify(questions), JSON.stringify(documentIds));

  // Housekeeping: abandoned sessions are not part of the history.
  db.prepare('DELETE FROM attempt_sessions WHERE started_at < ?').run(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  );

  res.status(201).json({
    ...sessionPayload({
      id,
      exam_id: examId,
      started_at: startedAt,
      questions_json: JSON.stringify(questions),
    }),
    documentCount: documentIds.length,
  });
});

attemptsRouter.get('/sessions/:id', (req, res) => {
  const session = db.prepare('SELECT * FROM attempt_sessions WHERE id = ?').get(req.params.id);
  if (!session) throw httpError('Phiên làm bài không còn tồn tại. Hãy bắt đầu lại.', 404);
  const documentCount = JSON.parse(session.document_ids_json).length;
  res.json({ ...sessionPayload(session), documentCount });
});

attemptsRouter.post('/:id/submit', (req, res) => {
  const session = db.prepare('SELECT * FROM attempt_sessions WHERE id = ?').get(req.params.id);
  if (!session) throw httpError('Phiên làm bài không còn tồn tại. Hãy bắt đầu lại.', 404);

  const questions = JSON.parse(session.questions_json);
  const positions = new Set(questions.map((question) => question.position));
  const { answers, flags } = validateSubmission(req.body, positions);
  const flagged = new Set(flags);

  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  const rows = questions.map((question) => {
    const userOption = answers[question.position] ?? null;
    let status;
    if (!userOption) {
      status = 'unanswered';
      unansweredCount += 1;
    } else if (userOption === question.correctOption) {
      status = 'correct';
      correctCount += 1;
    } else {
      status = 'wrong';
      wrongCount += 1;
    }
    return { ...question, userOption, status, flagged: flagged.has(question.position) };
  });

  const total = questions.length;
  const score = Math.round((correctCount / total) * 10 * 100) / 100;
  const accuracy = Math.round((correctCount / total) * 1000) / 10;
  const submittedAt = nowIso();
  const durationSeconds = Math.max(
    0,
    Math.round((Date.parse(submittedAt) - Date.parse(session.started_at)) / 1000),
  );
  const exam = db.prepare('SELECT * FROM exams WHERE id = ?').get(session.exam_id);
  const attemptId = randomUUID();

  withTransaction(() => {
    db.prepare(
      `INSERT INTO attempts
        (id, exam_id, exam_title, subject, topic, total_questions, started_at, submitted_at,
         duration_seconds, score, correct_count, wrong_count, unanswered_count, accuracy, document_ids)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      attemptId,
      exam?.id ?? null,
      exam?.title ?? 'Đề đã xóa',
      exam?.subject ?? '',
      exam?.topic ?? '',
      total,
      session.started_at,
      submittedAt,
      durationSeconds,
      score,
      correctCount,
      wrongCount,
      unansweredCount,
      accuracy,
      session.document_ids_json,
    );

    const insert = db.prepare(
      `INSERT INTO attempt_questions
        (attempt_id, position, question_id, content, option_a, option_b, option_c, option_d,
         correct_option, user_option, status, flagged)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    for (const row of rows) {
      insert.run(
        attemptId,
        row.position,
        row.questionId ?? null,
        row.content,
        row.optionA,
        row.optionB,
        row.optionC,
        row.optionD,
        row.correctOption,
        row.userOption,
        row.status,
        row.flagged ? 1 : 0,
      );
    }
    db.prepare('DELETE FROM attempt_sessions WHERE id = ?').run(session.id);
  });

  res.status(201).json({
    attemptId,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions: total,
    accuracy,
    durationSeconds,
  });
});

attemptsRouter.get('/', (_req, res) => {
  const rows = db
    .prepare('SELECT * FROM attempts ORDER BY submitted_at DESC')
    .all();
  res.json({
    attempts: rows.map((row) => ({
      id: row.id,
      examId: row.exam_id,
      examTitle: row.exam_title,
      subject: row.subject,
      topic: row.topic,
      totalQuestions: row.total_questions,
      startedAt: row.started_at,
      submittedAt: row.submitted_at,
      durationSeconds: row.duration_seconds,
      score: row.score,
      correctCount: row.correct_count,
      wrongCount: row.wrong_count,
      unansweredCount: row.unanswered_count,
      accuracy: row.accuracy,
    })),
  });
});

attemptsRouter.get('/:id', (req, res) => {
  const attempt = db.prepare('SELECT * FROM attempts WHERE id = ?').get(req.params.id);
  if (!attempt) throw httpError('Không tìm thấy lần làm bài.', 404);

  const questions = db
    .prepare('SELECT * FROM attempt_questions WHERE attempt_id = ? ORDER BY position')
    .all(attempt.id)
    .map((row) => ({
      position: row.position,
      questionId: row.question_id,
      content: row.content,
      optionA: row.option_a,
      optionB: row.option_b,
      optionC: row.option_c,
      optionD: row.option_d,
      correctOption: row.correct_option,
      userOption: row.user_option,
      status: row.status,
      flagged: Boolean(row.flagged),
    }));

  const explanations = db
    .prepare('SELECT * FROM explanations WHERE attempt_id = ? ORDER BY position')
    .all(attempt.id)
    .map((row) => ({
      position: row.position,
      sufficient: Boolean(row.sufficient),
      message: row.message,
      whyWrong: row.why_wrong,
      whyCorrect: row.why_correct,
      knowledge: row.knowledge,
      summary: row.summary,
      sources: JSON.parse(row.sources_json || '[]'),
      model: row.model,
      createdAt: row.created_at,
    }));

  const documentIds = JSON.parse(attempt.document_ids || '[]');
  let documents = [];
  if (documentIds.length) {
    const placeholders = documentIds.map(() => '?').join(',');
    documents = db
      .prepare(`SELECT id, title FROM documents WHERE id IN (${placeholders})`)
      .all(...documentIds)
      .map((row) => ({ id: row.id, title: row.title }));
  }

  const examExists = attempt.exam_id
    ? Boolean(db.prepare('SELECT id FROM exams WHERE id = ?').get(attempt.exam_id))
    : false;

  res.json({
    attempt: {
      id: attempt.id,
      examId: attempt.exam_id,
      examTitle: attempt.exam_title,
      subject: attempt.subject,
      topic: attempt.topic,
      totalQuestions: attempt.total_questions,
      startedAt: attempt.started_at,
      submittedAt: attempt.submitted_at,
      durationSeconds: attempt.duration_seconds,
      score: attempt.score,
      correctCount: attempt.correct_count,
      wrongCount: attempt.wrong_count,
      unansweredCount: attempt.unanswered_count,
      accuracy: attempt.accuracy,
      examExists,
      documents,
      questions,
      explanations,
    },
  });
});
