import express from 'express';
import { db } from '../db.js';
import { aiStatus } from '../config.js';

export const homeRouter = express.Router();

homeRouter.get('/', (_req, res) => {
  const exams = db
    .prepare(
      `SELECT e.*,
        (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS question_count,
        (SELECT COUNT(*) FROM exam_documents ed WHERE ed.exam_id = e.id) AS document_count,
        (SELECT id FROM attempts a WHERE a.exam_id = e.id ORDER BY a.submitted_at DESC LIMIT 1) AS last_attempt_id
       FROM exams e
       ORDER BY e.updated_at DESC, e.created_at DESC`,
    )
    .all();

  const attemptRows = db.prepare('SELECT * FROM attempts ORDER BY submitted_at DESC').all();
  const attemptById = new Map(attemptRows.map((row) => [row.id, row]));

  const examCards = exams.map((row) => {
    const attempt = row.last_attempt_id ? attemptById.get(row.last_attempt_id) : null;
    const answerSheet = attempt
      ? db
          .prepare(
            'SELECT position, status, flagged FROM attempt_questions WHERE attempt_id = ? ORDER BY position',
          )
          .all(attempt.id)
          .map((question) => ({
            position: question.position,
            status: question.status,
            flagged: Boolean(question.flagged),
          }))
      : [];
    return {
      id: row.id,
      title: row.title,
      subject: row.subject,
      topic: row.topic,
      durationMinutes: row.duration_minutes,
      questionCount: row.question_count,
      documentCount: row.document_count,
      updatedAt: row.updated_at,
      lastAttempt: attempt
        ? {
            id: attempt.id,
            score: attempt.score,
            submittedAt: attempt.submitted_at,
            correctCount: attempt.correct_count,
            totalQuestions: attempt.total_questions,
            answerSheet,
          }
        : null,
    };
  });

  const best = db.prepare('SELECT MAX(score) AS value FROM attempts').get().value;
  const average = db.prepare('SELECT AVG(score) AS value FROM attempts').get().value;
  const documents = db
    .prepare('SELECT id, title, char_count, created_at FROM documents ORDER BY created_at DESC LIMIT 4')
    .all();

  res.json({
    stats: {
      exams: db.prepare('SELECT COUNT(*) AS value FROM exams').get().value,
      questions: db.prepare('SELECT COUNT(*) AS value FROM questions').get().value,
      documents: db.prepare('SELECT COUNT(*) AS value FROM documents').get().value,
      attempts: attemptRows.length,
      bestScore: best === null ? null : Math.round(best * 100) / 100,
      averageScore: average === null ? null : Math.round(average * 100) / 100,
    },
    exams: examCards,
    recentAttempts: attemptRows.slice(0, 4).map((row) => ({
      id: row.id,
      examTitle: row.exam_title,
      submittedAt: row.submitted_at,
      score: row.score,
      correctCount: row.correct_count,
      wrongCount: row.wrong_count,
      unansweredCount: row.unanswered_count,
      totalQuestions: row.total_questions,
      durationSeconds: row.duration_seconds,
    })),
    documents: documents.map((row) => ({
      id: row.id,
      title: row.title,
      charCount: row.char_count,
      createdAt: row.created_at,
    })),
    ai: aiStatus(),
  });
});
