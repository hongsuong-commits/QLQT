import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SEED_DIR } from './config.js';
import { db, nowIso, withTransaction } from './db.js';
import { chunkText } from './lib/chunk.js';
import { parseExamText } from './lib/parse-exam.js';
import { firstHeading, plainInline } from './lib/text.js';

const DOCUMENT_FILES = [
  '01-Chuong1.md',
  '02-Chuong2.md',
  '03-Chuong3.md',
  '04-Chuong4.md',
  '05-Chuong5.md',
  '06-PhanII-DocSoDo.md',
  '07-TuKiemTra-12-cau.md',
  '09-SoTay-Nhanh.md',
];

const EXAM_FILES = [
  {
    file: '08-DeThiMau-40-cau.md',
    title: 'Đề mô phỏng 1 — Tổng hợp 5 chương',
    topic: 'Tổng hợp · BPMN',
  },
  {
    file: '10-DeThiMau-2.md',
    title: 'Đề mô phỏng 2 — Cân bằng 5 chương',
    topic: 'Cổng BPMN · Ngoại lệ · Tự động hóa',
  },
  {
    file: '11-DeThiMau-3.md',
    title: 'Đề mô phỏng 3 — Tính toán & vòng đời BPM',
    topic: 'Thời gian · Process mining · KPI',
  },
  {
    file: '12-DeThiMau-4.md',
    title: 'Đề mô phỏng 4 — AI, bảo mật & BPMN',
    topic: 'Agentic coding · Bảo mật · Kiểm thử',
  },
];

const SUBJECT = 'MIS3047 — Quản lý quy trình kinh doanh';

/** Import the bundled study material once. Returns a short summary or null. */
export function seedIfEmpty() {
  const examCount = db.prepare('SELECT COUNT(*) AS count FROM exams').get().count;
  if (examCount > 0) return null;
  if (!fs.existsSync(SEED_DIR)) return null;

  const warnings = [];
  const documents = [];
  for (const file of DOCUMENT_FILES) {
    const fullPath = path.join(SEED_DIR, file);
    if (!fs.existsSync(fullPath)) continue;
    const text = fs.readFileSync(fullPath, 'utf8').trim();
    if (text.length < 20) continue;
    const title = firstHeading(text, file).slice(0, 200);
    const chunks = chunkText(text, title);
    if (!chunks.length) continue;
    documents.push({ id: randomUUID(), title, file, text, chunks });
  }

  const exams = [];
  for (const definition of EXAM_FILES) {
    const fullPath = path.join(SEED_DIR, definition.file);
    if (!fs.existsSync(fullPath)) continue;
    const text = fs.readFileSync(fullPath, 'utf8');
    const parsed = parseExamText(text);
    if (parsed.questions.length < 10) {
      warnings.push(`${definition.file}: chỉ nhận ra ${parsed.questions.length} câu — bỏ qua.`);
      continue;
    }
    if (parsed.questions.some((question) => !question.correctOption)) {
      warnings.push(`${definition.file}: có câu thiếu đáp án — bỏ qua.`);
      continue;
    }
    exams.push({
      id: randomUUID(),
      ...definition,
      description: `${parsed.questions.length} câu · 75 phút · Một đáp án đúng. Nội dung giữ nguyên từ tệp ${definition.file}.`,
      questions: parsed.questions,
    });
  }

  if (!exams.length) {
    for (const warning of warnings) console.warn('[seed]', warning);
    return null;
  }

  const stamp = nowIso();
  withTransaction(() => {
    const insertDocument = db.prepare(
      `INSERT INTO documents (id, title, source_type, filename, mime, size, text, char_count, created_at)
       VALUES (?, ?, 'seed', ?, 'text/markdown', ?, ?, ?, ?)`,
    );
    const insertChunk = db.prepare(
      `INSERT INTO document_chunks (document_id, idx, heading, content, token_count)
       VALUES (?, ?, ?, ?, ?)`,
    );
    for (const document of documents) {
      insertDocument.run(
        document.id,
        document.title,
        document.file,
        Buffer.byteLength(document.text, 'utf8'),
        document.text,
        document.text.length,
        stamp,
      );
      for (const chunk of document.chunks) {
        insertChunk.run(document.id, chunk.idx, chunk.heading, chunk.content, chunk.tokenCount);
      }
    }

    const insertExam = db.prepare(
      `INSERT INTO exams (id, title, subject, topic, description, duration_minutes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 75, ?, ?)`,
    );
    const insertQuestion = db.prepare(
      `INSERT INTO questions
        (id, exam_id, position, content, option_a, option_b, option_c, option_d, correct_option, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    const link = db.prepare(
      'INSERT OR IGNORE INTO exam_documents (exam_id, document_id) VALUES (?, ?)',
    );

    for (const exam of exams) {
      insertExam.run(
        exam.id,
        plainInline(exam.title),
        SUBJECT,
        exam.topic,
        exam.description,
        stamp,
        stamp,
      );
      for (const question of exam.questions) {
        insertQuestion.run(
          randomUUID(),
          exam.id,
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
      for (const document of documents) link.run(exam.id, document.id);
    }
  });

  for (const warning of warnings) console.warn('[seed]', warning);
  return `${exams.length} đề, ${documents.length} tài liệu`;
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const result = seedIfEmpty();
  console.log(result ? `Đã nạp: ${result}` : 'Cơ sở dữ liệu đã có đề, không nạp lại.');
}
