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

test('ba đề nâng cao có 40 câu, đủ đáp án và sơ đồ cho cả câu hỏi thứ hai', () => {
  for (const file of ['13-DeNangCao-1.md', '14-DeNangCao-2.md', '15-DeNangCao-3.md']) {
    const source = fs.readFileSync(new URL(`../seed/${file}`, import.meta.url), 'utf8');
    const parsed = parseExamText(source);
    assert.equal(parsed.questions.length, 40, `${file}: số câu`);
    assert.deepEqual(parsed.warnings, [], `${file}: cảnh báo`);
    assert.ok(
      parsed.questions.every((q) => /^[A-D]$/.test(q.correctOption)),
      `${file}: đáp án`,
    );
    for (const position of [30, 32, 34, 36, 38, 40]) {
      const question = parsed.questions.find((q) => q.position === position);
      assert.match(question.content, /```/, `${file} câu ${position}: thiếu sơ đồ`);
    }
  }
});
