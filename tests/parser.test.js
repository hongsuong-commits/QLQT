import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseExamText } from '../server/lib/parse-exam.js';

test('parser nhận diện câu hỏi, bốn phương án và đáp án trong đề mẫu', () => {
  const source = fs.readFileSync(new URL('../seed/08-DeThiMau-40-cau.md', import.meta.url), 'utf8');
  const parsed = parseExamText(source);
  assert.equal(parsed.questions.length, 40);
  assert.match(parsed.questions[0].content, /trường đại học/i);
  assert.ok(parsed.questions.every((q) => q.optionA && q.optionB && q.optionC && q.optionD));
  assert.ok(parsed.questions.every((q) => /^[A-D]$/.test(q.correctOption)));
  assert.equal(parsed.answerKeyFound, true);
});

test('parser báo nội dung rỗng, định dạng sai và thiếu trường thay vì tự đoán', () => {
  assert.equal(parseExamText('  ').questions.length, 0);
  assert.ok(parseExamText('đây là văn bản không có câu hỏi').warnings.length);
  const parsed = parseExamText('Câu 1. Câu hỏi duy nhất\nA. Một\nC. Ba');
  assert.equal(parsed.questions[0].optionB, '');
  assert.equal(parsed.questions[0].correctOption, null);
  assert.ok(parsed.warnings.some((warning) => warning.includes('thiếu phương án B')));
  assert.ok(parsed.warnings.some((warning) => warning.includes('chưa có đáp án')));
});
