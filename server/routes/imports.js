import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { MAX_UPLOAD_BYTES } from '../config.js';
import { ACCEPTED_EXTENSIONS, extractUpload, extensionOf } from '../lib/extract.js';
import { parseExamText } from '../lib/parse-exam.js';
import { filenameTitle, normalizeText } from '../lib/text.js';
import { httpError } from '../lib/validate.js';

export const importsRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!ACCEPTED_EXTENSIONS.has(extensionOf(file.originalname))) {
      callback(httpError('Chỉ nhận tệp PDF, DOCX, TXT hoặc MD.', 415));
      return;
    }
    callback(null, true);
  },
});

function sourceText(req) {
  const bodyText = typeof req.body?.text === 'string' ? normalizeText(req.body.text) : '';
  return bodyText;
}

importsRouter.post('/exam', upload.single('file'), async (req, res) => {
  let text = '';
  let sourceName = '';
  if (req.file) {
    text = await extractUpload(req.file);
    sourceName = path.basename(req.file.originalname);
  } else {
    text = sourceText(req);
    sourceName = 'Văn bản dán';
  }
  if (!text || text.length < 20) {
    throw httpError('Nội dung đề quá ngắn để phân tích. Hãy kiểm tra tệp hoặc dán lại đề.', 422);
  }
  if (text.length > 2_000_000) throw httpError('Đề quá dài (giới hạn 2 triệu ký tự).', 413);

  const parsed = parseExamText(text);
  res.json({
    text,
    sourceName,
    suggestedTitle:
      (typeof req.body?.title === 'string' && req.body.title.trim()) ||
      (req.file ? filenameTitle(req.file.originalname) : '') ||
      'Đề nhập',
    questions: parsed.questions,
    warnings: parsed.warnings,
    answerKeyFound: parsed.answerKeyFound,
    charCount: text.length,
  });
});

importsRouter.post('/document', upload.single('file'), async (req, res) => {
  let text = '';
  let sourceName = '';
  if (req.file) {
    text = await extractUpload(req.file);
    sourceName = path.basename(req.file.originalname);
  } else {
    text = sourceText(req);
    sourceName = 'Văn bản dán';
  }
  if (!text || text.length < 20) {
    throw httpError('Tài liệu quá ngắn (cần ít nhất 20 ký tự).', 422);
  }
  if (text.length > 2_000_000) throw httpError('Tài liệu quá dài (giới hạn 2 triệu ký tự).', 413);

  res.json({
    text,
    sourceName,
    suggestedTitle:
      (typeof req.body?.title === 'string' && req.body.title.trim()) ||
      (req.file ? filenameTitle(req.file.originalname) : '') ||
      'Tài liệu ôn tập',
    charCount: text.length,
  });
});
