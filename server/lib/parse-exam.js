import { normalizeText, plainInline } from './text.js';

const QUESTION_RE = /^[ \t]*(?:\*\*)?Câu\s+(\d{1,3})\s*[\.:\)]\s*(?:\*\*)?[ \t]*/gim;
const ANSWER_HEADING_RE = /^#{1,6}\s*(ĐÁP ÁN|DAP AN|ANSWER|HƯỚNG DẪN CHẤM)/im;

function matchOption(raw) {
  let line = String(raw).replace(/^[ \t]+/, '');
  line = line.replace(/^\*\*([A-D])[\.\)]\*\*[ \t]*/, '$1. ');
  line = line.replace(/^\*\*([A-D])[\.\)][ \t]+/, '$1. ');
  line = line.replace(/^([A-D])[\.\)][ \t]*/, '$1. ');
  const m = line.match(/^([A-D])[\.\)][ \t]+(.+)$/);
  if (!m) return null;
  return { letter: m[1], text: m[2] };
}

/** Pull the nearest diagram (fenced block + its heading) that sits before a question. */
function extractContext(between) {
  const fenceRe = /```[\s\S]*?```/g;
  const fences = [...between.matchAll(fenceRe)];
  if (fences.length === 0) return '';
  const firstFenceAt = fences[0].index;
  const before = between.slice(0, firstFenceAt);
  const headingMatches = [...before.matchAll(/^#{2,4}[ \t]+(.+)$/gm)];
  let start = firstFenceAt;
  if (headingMatches.length) {
    const last = headingMatches[headingMatches.length - 1];
    start = last.index;
  }
  const context = between
    .slice(start, fences[fences.length - 1].index + fences[fences.length - 1][0].length)
    .trim();
  return context;
}

function parseBlock(rawBlock, position) {
  const lines = rawBlock.split('\n');
  let optionStart = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (matchOption(lines[i])) {
      optionStart = i;
      break;
    }
  }

  const contentLines = (optionStart === -1 ? lines : lines.slice(0, optionStart))
    .filter((line) => !/^\s*---+\s*$/.test(line))
    .join('\n')
    .trim();

  const options = {};
  const warnings = [];
  if (optionStart !== -1) {
    let current = null;
    for (let i = optionStart; i < lines.length; i += 1) {
      const line = lines[i];
      const option = matchOption(line);
      if (option) {
        current = option.letter;
        options[current] = option.text.trim();
        continue;
      }
      if (/^\s*(?:Đáp án|Dap an|Answer)\b/i.test(line)) break;
      if (/^\s*$/.test(line)) {
        if (Object.keys(options).length === 4) break;
        continue;
      }
      if (Object.keys(options).length === 4) break;
      if (/^(#{1,6}\s|```)/.test(line)) break;
      if (current) {
        options[current] = `${options[current] ?? ''} ${line.trim()}`.trim();
      }
    }
  }

  for (const letter of ['A', 'B', 'C', 'D']) {
    if (!options[letter]) warnings.push(`Câu ${position} thiếu phương án ${letter}.`);
    else options[letter] = plainInline(options[letter]);
  }

  const content = contentLines
    .split('\n')
    .filter((line) => !/^#{1,6}\s/.test(line))
    .join('\n')
    .trim();

  if (!content) warnings.push(`Câu ${position} không có nội dung.`);

  return {
    position,
    content,
    optionA: options.A ?? '',
    optionB: options.B ?? '',
    optionC: options.C ?? '',
    optionD: options.D ?? '',
    warnings,
  };
}

/**
 * Parse questions from an exam text (markdown, DOCX text or PDF text).
 * The answer key is read from a markdown table, an answer list, or an inline
 * "Đáp án: X". A missing answer is reported, never invented.
 */
export function parseExamText(input) {
  const text = normalizeText(input);
  if (!text) {
    return { questions: [], warnings: ['Văn bản rỗng, không có câu hỏi nào.'], answerKeyFound: false };
  }

  const answerHeading = text.match(ANSWER_HEADING_RE);
  const answerSection = answerHeading ? text.slice(answerHeading.index) : '';
  const answerMap = new Map();

  for (const row of text.matchAll(
    /^\|\s*\*{0,2}(\d{1,3})\*{0,2}\s*\|\s*\*{0,2}([A-D])\*{0,2}\s*\|/gm,
  )) {
    answerMap.set(Number(row[1]), row[2]);
  }
  for (const row of answerSection.matchAll(/^\s*(\d{1,3})\s*[\.\)]\s*\*{0,2}([A-D])\*{0,2}\b/gm)) {
    if (!answerMap.has(Number(row[1]))) answerMap.set(Number(row[1]), row[2]);
  }

  // Question blocks stop before the answer section so explanations do not
  // become question text.
  const body = answerHeading ? text.slice(0, answerHeading.index) : text;
  const matches = [...body.matchAll(QUESTION_RE)];
  const warnings = [];

  if (matches.length === 0) {
    warnings.push(
      'Không nhận ra câu hỏi. Cần mỗi câu bắt đầu bằng "Câu 1." và bốn phương án A, B, C, D.',
    );
    return { questions: [], warnings, answerKeyFound: answerMap.size > 0 };
  }

  const questions = [];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length;
    const block = body.slice(start, end);
    const position = Number(match[1]);
    const parsed = parseBlock(block, position);

    if (!parsed.content.includes('```')) {
      const previousEnd = index === 0 ? 0 : matches[index - 1].index + matches[index - 1][0].length;
      const previousStart = index === 0 ? 0 : matches[index - 1].index;
      const between =
        index === 0 ? body.slice(0, match.index) : body.slice(previousStart, match.index);
      void previousEnd;
      const context = extractContext(between);
      if (context) parsed.content = `${context}\n\n${parsed.content}`.trim();
    }

    const inline = block.match(
      /(?:Đáp án|Dap an|Answer)\s*(?:chính thức|đúng)?\s*[:\-]\s*\*{0,2}([A-D])\*{0,2}/i,
    );
    const correctOption = answerMap.get(position) ?? (inline ? inline[1] : null);
    if (!correctOption) warnings.push(`Câu ${position} chưa có đáp án chính xác.`);

    warnings.push(...parsed.warnings);
    questions.push({
      position,
      content: parsed.content,
      optionA: parsed.optionA,
      optionB: parsed.optionB,
      optionC: parsed.optionC,
      optionD: parsed.optionD,
      correctOption,
    });
  }

  const seen = new Set();
  const deduped = [];
  for (const question of questions.sort((a, b) => a.position - b.position)) {
    if (seen.has(question.position)) {
      warnings.push(`Bỏ qua câu trùng số ${question.position}.`);
      continue;
    }
    seen.add(question.position);
    deduped.push(question);
  }

  return {
    questions: deduped,
    warnings: [...new Set(warnings)],
    answerKeyFound: answerMap.size > 0,
  };
}
