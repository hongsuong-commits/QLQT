import path from 'node:path';
import mammoth from 'mammoth';
import { decodeTextBuffer, normalizeText } from './text.js';

function httpError(message, status = 422) {
  return Object.assign(new Error(message), { status });
}

function extensionOf(name) {
  return path.extname(String(name || '')).toLowerCase();
}

/** Rebuild readable lines from pdf.js text items using their coordinates. */
function itemsToText(items) {
  const rows = [];
  for (const item of items) {
    if (!item || typeof item.str !== 'string' || !item.str.trim()) continue;
    const transform = item.transform ?? [];
    const x = Number(transform[4] ?? 0);
    const y = Number(transform[5] ?? 0);
    const height = Math.abs(Number(item.height ?? transform[3] ?? 10)) || 10;
    let row = rows.find((candidate) => Math.abs(candidate.y - y) <= Math.max(2, height * 0.28));
    if (!row) {
      row = { y, parts: [] };
      rows.push(row);
    }
    row.parts.push({ x, text: item.str, width: Number(item.width ?? 0), height });
  }

  rows.sort((a, b) => b.y - a.y);
  return rows
    .map((row) => {
      row.parts.sort((a, b) => a.x - b.x);
      let line = '';
      let previousEnd = null;
      for (const part of row.parts) {
        const text = part.text.replace(/\s+/g, ' ');
        if (previousEnd !== null && part.x - previousEnd > 1.6 && line && !line.endsWith(' ')) {
          line += ' ';
        }
        line += text;
        previousEnd = part.x + part.width;
      }
      return line.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean)
    .join('\n');
}

export async function extractPdf(buffer) {
  let pdfjs;
  try {
    pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  } catch {
    throw httpError('Máy chủ chưa sẵn sàng để đọc PDF (thiếu pdfjs-dist).', 500);
  }

  let document;
  try {
    const loading = pdfjs.getDocument({
      data: new Uint8Array(buffer),
      useSystemFonts: true,
      isEvalSupported: false,
      disableFontFace: true,
    });
    document = await loading.promise;
  } catch (error) {
    throw httpError(`Không đọc được PDF: ${error.message}`, 422);
  }

  try {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = itemsToText(content.items);
      if (text) pages.push(text);
      page.cleanup();
    }
    const result = normalizeText(pages.join('\n\n'));
    if (result.length < 40) {
      throw httpError(
        'PDF không có lớp văn bản (có thể là bản scan). Hãy dùng bản PDF có thể chọn chữ hoặc nhập nội dung trực tiếp.',
        422,
      );
    }
    return result;
  } finally {
    await document.destroy().catch(() => {});
  }
}

export async function extractDocx(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = normalizeText(result.value);
    if (text.length < 20) {
      throw httpError('DOCX không có văn bản đọc được.', 422);
    }
    return text;
  } catch (error) {
    if (error.status) throw error;
    throw httpError(`Không đọc được DOCX: ${error.message}`, 422);
  }
}

export async function extractUpload(file) {
  if (!file || !file.buffer) {
    throw httpError('Chưa có tệp nào được tải lên.', 400);
  }
  const ext = extensionOf(file.originalname);
  if (ext === '.pdf') return extractPdf(file.buffer);
  if (ext === '.docx') return extractDocx(file.buffer);
  if (ext === '.txt' || ext === '.md') return normalizeText(decodeTextBuffer(file.buffer));
  throw httpError('Chỉ nhận tệp PDF, DOCX, TXT hoặc MD.', 415);
}

export const ACCEPTED_EXTENSIONS = new Set(['.pdf', '.docx', '.txt', '.md']);
export { extensionOf };
