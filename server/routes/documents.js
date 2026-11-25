import express from 'express';
import { randomUUID } from 'node:crypto';
import { db, nowIso, withTransaction } from '../db.js';
import { chunkText } from '../lib/chunk.js';
import { httpError, textField } from '../lib/validate.js';

export const documentsRouter = express.Router();

documentsRouter.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT d.id, d.title, d.source_type, d.filename, d.char_count, d.created_at,
        (SELECT COUNT(*) FROM exam_documents ed WHERE ed.document_id = d.id) AS linked_count
       FROM documents d
       ORDER BY d.created_at DESC`,
    )
    .all();
  const linked = db
    .prepare(
      `SELECT ed.document_id, e.id, e.title
       FROM exam_documents ed JOIN exams e ON e.id = ed.exam_id
       ORDER BY e.title`,
    )
    .all();
  const linkedByDocument = new Map();
  for (const row of linked) {
    const list = linkedByDocument.get(row.document_id) ?? [];
    list.push({ id: row.id, title: row.title });
    linkedByDocument.set(row.document_id, list);
  }

  res.json({
    documents: rows.map((row) => ({
      id: row.id,
      title: row.title,
      sourceType: row.source_type,
      filename: row.filename,
      charCount: row.char_count,
      createdAt: row.created_at,
      linkedExamCount: row.linked_count,
      linkedExams: linkedByDocument.get(row.id) ?? [],
    })),
  });
});

documentsRouter.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id);
  if (!row) throw httpError('Không tìm thấy tài liệu.', 404);
  const chunkCount = db
    .prepare('SELECT COUNT(*) AS count FROM document_chunks WHERE document_id = ?')
    .get(row.id).count;
  res.json({
    document: {
      id: row.id,
      title: row.title,
      sourceType: row.source_type,
      filename: row.filename,
      charCount: row.char_count,
      createdAt: row.created_at,
      text: row.text,
      chunkCount,
    },
  });
});

documentsRouter.post('/', (req, res) => {
  const title = textField(req.body?.title, 'Tên tài liệu', { min: 1, max: 200 });
  const text = textField(req.body?.text, 'Nội dung tài liệu', { min: 20, max: 2_000_000, trim: true });
  const sourceType = req.body?.sourceType === 'upload' ? 'upload' : 'text';
  const filename = textField(req.body?.filename, 'Tên tệp', { max: 260 }) || null;
  const chunks = chunkText(text, title);
  if (chunks.length === 0) throw httpError('Không chia được nội dung tài liệu thành đoạn.', 422);

  const id = randomUUID();
  const stamp = nowIso();
  withTransaction(() => {
    db.prepare(
      `INSERT INTO documents (id, title, source_type, filename, mime, size, text, char_count, created_at)
       VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?)`,
    ).run(id, title, sourceType, filename, Buffer.byteLength(text, 'utf8'), text, text.length, stamp);
    const insertChunk = db.prepare(
      `INSERT INTO document_chunks (document_id, idx, heading, content, token_count)
       VALUES (?, ?, ?, ?, ?)`,
    );
    for (const chunk of chunks) {
      insertChunk.run(id, chunk.idx, chunk.heading, chunk.content, chunk.tokenCount);
    }
  });

  res.status(201).json({
    document: {
      id,
      title,
      sourceType,
      filename,
      charCount: text.length,
      chunkCount: chunks.length,
      createdAt: stamp,
    },
  });
});

documentsRouter.delete('/:id', (req, res) => {
  const row = db.prepare('SELECT id FROM documents WHERE id = ?').get(req.params.id);
  if (!row) throw httpError('Không tìm thấy tài liệu.', 404);
  db.prepare('DELETE FROM documents WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});
