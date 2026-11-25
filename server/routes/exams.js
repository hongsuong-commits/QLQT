import express from 'express';
import { randomUUID } from 'node:crypto';
import { db, nowIso, withTransaction } from '../db.js';
import { httpError, validateExamPayload } from '../lib/validate.js';

export const examsRouter = express.Router();

function examSummary(row) {
  return {
    id: row.id,
    title: row.title,
    subject: row.subject,
    topic: row.topic,
    description: row.description,
    durationMinutes: row.duration_minutes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    questionCount: row.question_count ?? 0,
    documentCount: row.document_count ?? 0,
    documentIds: row.document_ids ? row.document_ids.split(',').filter(Boolean) : [],
    lastAttemptId: row.last_attempt_id ?? null,
    lastAttempt: row.last_attempt_id
      ? {
          id: row.last_attempt_id,
          score: row.last_score,
          submittedAt: row.last_submitted_at,
          correctCount: row.last_correct,
          totalQuestions: row.last_total_questions ?? row.question_count,
        }
      : null,
  };
}

function readExam(id) {
  const row = db
    .prepare(
      `SELECT e.*,
        (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS question_count,
        (SELECT COUNT(*) FROM exam_documents ed WHERE ed.exam_id = e.id) AS document_count,
        (SELECT group_concat(ed.document_id) FROM exam_documents ed WHERE ed.exam_id = e.id) AS document_ids,
        (SELECT id FROM attempts a WHERE a.exam_id = e.id ORDER BY a.submitted_at DESC LIMIT 1) AS last_attempt_id
       FROM exams e WHERE e.id = ?`,
    )
    .get(id);
  if (!row) return null;
  const attempt = row.last_attempt_id
    ? db
        .prepare('SELECT score, submitted_at, correct_count, total_questions FROM attempts WHERE id = ?')
        .get(row.last_attempt_id)
    : null;
  const questions = db
    .prepare('SELECT * FROM questions WHERE exam_id = ? ORDER BY position')
    .all(id)
    .map((question) => ({
      id: question.id,
      position: question.position,
      content: question.content,
      optionA: question.option_a,
      optionB: question.option_b,
      optionC: question.option_c,
      optionD: question.option_d,
      correctOption: question.correct_option,
    }));

  return {
    ...examSummary({
      ...row,
      last_score: attempt?.score,
      last_submitted_at: attempt?.submitted_at,
      last_correct: attempt?.correct_count,
      last_total_questions: attempt?.total_questions,
    }),
    questions,
  };
}

function assertDocumentsExist(documentIds) {
  for (const id of documentIds) {
    const row = db.prepare('SELECT id FROM documents WHERE id = ?').get(id);
    if (!row) throw httpError('Một tài liệu được chọn không còn tồn tại. Hãy tải lại danh sách.', 400);
  }
}

function insertQuestions(examId, questions) {
  const statement = db.prepare(
    `INSERT INTO questions
      (id, exam_id, position, content, option_a, option_b, option_c, option_d, correct_option, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const stamp = nowIso();
  for (const question of questions) {
    statement.run(
      randomUUID(),
      examId,
      question.position,
      question.content,
      question.optionA,
      question.optionB,
      question.optionC,
      question.optionD,
      question.correctOption,
      stamp,
      stamp,
    );
  }
}

examsRouter.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT e.*,
        (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS question_count,
        (SELECT COUNT(*) FROM exam_documents ed WHERE ed.exam_id = e.id) AS document_count,
        (SELECT group_concat(ed.document_id) FROM exam_documents ed WHERE ed.exam_id = e.id) AS document_ids,
        (SELECT id FROM attempts a WHERE a.exam_id = e.id ORDER BY a.submitted_at DESC LIMIT 1) AS last_attempt_id
       FROM exams e
       ORDER BY e.updated_at DESC, e.created_at DESC`,
    )
    .all();

  const attempts = new Map(
    db
      .prepare('SELECT id, score, submitted_at, correct_count, total_questions FROM attempts')
      .all()
      .map((attempt) => [attempt.id, attempt]),
  );

  res.json({
    exams: rows.map((row) => {
      const attempt = row.last_attempt_id ? attempts.get(row.last_attempt_id) : null;
      return examSummary({
        ...row,
        last_score: attempt?.score,
        last_submitted_at: attempt?.submitted_at,
        last_correct: attempt?.correct_count,
        last_total_questions: attempt?.total_questions,
      });
    }),
  });
});

examsRouter.get('/:id', (req, res) => {
  const exam = readExam(req.params.id);
  if (!exam) throw httpError('Không tìm thấy đề thi.', 404);
  res.json({ exam });
});

examsRouter.post('/', (req, res) => {
  const payload = validateExamPayload(req.body);
  assertDocumentsExist(payload.documentIds);
  const id = randomUUID();
  const stamp = nowIso();

  withTransaction(() => {
    db.prepare(
      `INSERT INTO exams (id, title, subject, topic, description, duration_minutes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      payload.title,
      payload.subject,
      payload.topic,
      payload.description,
      payload.durationMinutes,
      stamp,
      stamp,
    );
    insertQuestions(id, payload.questions);
    const link = db.prepare('INSERT INTO exam_documents (exam_id, document_id) VALUES (?, ?)');
    for (const documentId of payload.documentIds) link.run(id, documentId);
  });

  res.status(201).json({ exam: readExam(id) });
});

examsRouter.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM exams WHERE id = ?').get(req.params.id);
  if (!existing) throw httpError('Không tìm thấy đề thi.', 404);
  const payload = validateExamPayload(req.body);
  assertDocumentsExist(payload.documentIds);
  const stamp = nowIso();

  withTransaction(() => {
    db.prepare(
      `UPDATE exams
       SET title = ?, subject = ?, topic = ?, description = ?, duration_minutes = ?, updated_at = ?
       WHERE id = ?`,
    ).run(
      payload.title,
      payload.subject,
      payload.topic,
      payload.description,
      payload.durationMinutes,
      stamp,
      req.params.id,
    );
    db.prepare('DELETE FROM questions WHERE exam_id = ?').run(req.params.id);
    insertQuestions(req.params.id, payload.questions);
    db.prepare('DELETE FROM exam_documents WHERE exam_id = ?').run(req.params.id);
    const link = db.prepare('INSERT INTO exam_documents (exam_id, document_id) VALUES (?, ?)');
    for (const documentId of payload.documentIds) link.run(req.params.id, documentId);
  });

  res.json({ exam: readExam(req.params.id) });
});

examsRouter.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM exams WHERE id = ?').get(req.params.id);
  if (!existing) throw httpError('Không tìm thấy đề thi.', 404);
  db.prepare('DELETE FROM exams WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});
