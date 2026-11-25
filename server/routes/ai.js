import express from 'express';
import { AI, INSUFFICIENT_MESSAGE, aiStatus } from '../config.js';
import { db, nowIso } from '../db.js';
import { generateExplanation } from '../lib/ai.js';
import { buildContext, retrieveChunks } from '../lib/retrieval.js';
import { httpError } from '../lib/validate.js';

export const aiRouter = express.Router();

aiRouter.get('/ai/status', (_req, res) => {
  res.json(aiStatus());
});

const inFlight = new Map();

function loadChunks(documentIds) {
  if (!documentIds.length) return [];
  const placeholders = documentIds.map(() => '?').join(',');
  const rows = db
    .prepare(
      `SELECT c.id, c.document_id, c.idx, c.heading, c.content, d.title
       FROM document_chunks c JOIN documents d ON d.id = c.document_id
       WHERE c.document_id IN (${placeholders})
       ORDER BY c.document_id, c.idx`,
    )
    .all(...documentIds);
  return rows.map((row) => ({
    id: row.id,
    documentId: row.document_id,
    idx: row.idx,
    heading: row.heading,
    content: row.content,
    title: row.title,
  }));
}

aiRouter.post('/attempts/:id/explanations/:position', async (req, res) => {
  const attempt = db.prepare('SELECT * FROM attempts WHERE id = ?').get(req.params.id);
  if (!attempt) throw httpError('Không tìm thấy lần làm bài.', 404);
  const position = Number(req.params.position);
  const question = db
    .prepare('SELECT * FROM attempt_questions WHERE attempt_id = ? AND position = ?')
    .get(attempt.id, position);
  if (!question) throw httpError('Không tìm thấy câu hỏi trong lần làm bài.', 404);
  if (question.status === 'correct') {
    throw httpError('Câu này đã đúng nên không cần giải thích AI.', 400);
  }

  const force = req.query.force === '1' || req.query.force === 'true';
  if (!force) {
    const existing = db
      .prepare('SELECT * FROM explanations WHERE attempt_id = ? AND position = ?')
      .get(attempt.id, position);
    if (existing) {
      res.json({
        explanation: {
          position: existing.position,
          sufficient: Boolean(existing.sufficient),
          message: existing.message,
          whyWrong: existing.why_wrong,
          whyCorrect: existing.why_correct,
          knowledge: existing.knowledge,
          summary: existing.summary,
          sources: JSON.parse(existing.sources_json || '[]'),
          model: existing.model,
          createdAt: existing.created_at,
          cached: true,
        },
      });
      return;
    }
  }

  const key = `${attempt.id}:${position}`;
  if (inFlight.has(key)) {
    const result = await inFlight.get(key);
    res.json({ explanation: { ...result, cached: true } });
    return;
  }

  const task = (async () => {
    if (!aiStatus().configured) {
      throw httpError(
        'AI chưa được cấu hình trên máy chủ. Đặt AI_API_KEY trong .env rồi khởi động lại máy chủ.',
        503,
      );
    }

    const documentIds = JSON.parse(attempt.document_ids || '[]');
    if (!documentIds.length) {
      throw httpError(
        'Đề thi chưa liên kết tài liệu ôn tập nào. Vào Đề thi → Sửa để liên kết tài liệu trước khi dùng AI.',
        409,
      );
    }
    const chunks = loadChunks(documentIds);
    if (!chunks.length) {
      throw httpError('Các tài liệu đã liên kết không còn nội dung để tra cứu.', 409);
    }

    const query = [
      question.content,
      question.option_a,
      question.option_b,
      question.option_c,
      question.option_d,
      `đáp án ${question.correct_option}`,
    ].join(' ');
    const selected = retrieveChunks(chunks, query, { limit: 6 });
    const context = buildContext(selected);
    const questionRow = {
      content: question.content,
      optionA: question.option_a,
      optionB: question.option_b,
      optionC: question.option_c,
      optionD: question.option_d,
      correctOption: question.correct_option,
    };

    const generated = await generateExplanation({
      question: questionRow,
      userOption: question.user_option,
      context,
      sourceCount: selected.length,
    });

    let sources = [];
    if (generated.sufficient) {
      const chosen =
        generated.usedSources.length > 0
          ? generated.usedSources.map((index) => selected[index - 1]).filter(Boolean)
          : selected;
      const seen = new Set();
      for (const chunk of chosen) {
        const sourceKey = `${chunk.title}::${chunk.heading}`;
        if (seen.has(sourceKey)) continue;
        seen.add(sourceKey);
        sources.push({ title: chunk.title, heading: chunk.heading || '' });
      }
    }

    const createdAt = nowIso();
    const message = generated.sufficient ? null : INSUFFICIENT_MESSAGE;
    db.prepare(
      `INSERT INTO explanations
        (attempt_id, position, sufficient, message, why_wrong, why_correct, knowledge, summary,
         sources_json, model, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(attempt_id, position) DO UPDATE SET
         sufficient = excluded.sufficient,
         message = excluded.message,
         why_wrong = excluded.why_wrong,
         why_correct = excluded.why_correct,
         knowledge = excluded.knowledge,
         summary = excluded.summary,
         sources_json = excluded.sources_json,
         model = excluded.model,
         created_at = excluded.created_at`,
    ).run(
      attempt.id,
      position,
      generated.sufficient ? 1 : 0,
      message,
      generated.whyWrong,
      generated.whyCorrect,
      generated.knowledge,
      generated.summary,
      JSON.stringify(sources),
      AI.model,
      createdAt,
    );

    return {
      position,
      sufficient: generated.sufficient,
      message,
      whyWrong: generated.whyWrong,
      whyCorrect: generated.whyCorrect,
      knowledge: generated.knowledge,
      summary: generated.summary,
      sources,
      model: AI.model,
      createdAt,
    };
  })();

  inFlight.set(key, task);
  try {
    const result = await task;
    res.json({ explanation: { ...result, cached: false } });
  } finally {
    inFlight.delete(key);
  }
});
