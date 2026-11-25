import test from 'node:test';
import assert from 'node:assert/strict';
import { startTestApp, examPayload } from './helpers/app.js';

test('chấm điểm, trạng thái và cờ độc lập; snapshot bảo toàn lần làm cũ khi đề sửa', async (t) => {
  const { base } = await startTestApp(t);
  const create = await fetch(`${base}/api/exams`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(examPayload()) });
  assert.equal(create.status, 201);
  const { exam } = await create.json();
  const start = await fetch(`${base}/api/attempts/start`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ examId: exam.id }) });
  const session = await start.json();
  assert.equal(session.questions[0].correctOption, undefined, 'answer key is not exposed while taking exam');

  const submit = await fetch(`${base}/api/attempts/${session.attemptId}/submit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ answers: { 1: 'A', 2: 'A' }, flags: [1, 3] }) });
  assert.equal(submit.status, 201);
  const result = await submit.json();
  assert.deepEqual([result.correctCount, result.wrongCount, result.unansweredCount], [1, 1, 1]);
  assert.equal(result.score, 3.33);

  const snapshot = await (await fetch(`${base}/api/attempts/${result.attemptId}`)).json();
  const questions = snapshot.attempt.questions;
  assert.deepEqual(questions.map((q) => q.status), ['correct', 'wrong', 'unanswered']);
  assert.deepEqual(questions.map((q) => q.flagged), [true, false, true]);
  assert.equal(questions[0].userOption, 'A');
  assert.equal(questions[0].correctOption, 'A');

  const edited = examPayload('Đề đã sửa', exam.questions.map((q) => ({ ...q, content: 'Nội dung mới', correctOption: 'D' })));
  const update = await fetch(`${base}/api/exams/${exam.id}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(edited) });
  assert.equal(update.status, 200);
  const oldAttempt = (await (await fetch(`${base}/api/attempts/${result.attemptId}`)).json()).attempt;
  assert.equal(oldAttempt.questions[0].content, 'Câu hỏi mẫu');
  assert.equal(oldAttempt.questions[0].correctOption, 'A');
  assert.equal(oldAttempt.questions[0].userOption, 'A');
  assert.equal(oldAttempt.score, 3.33);
  const secondSession = await (await fetch(`${base}/api/attempts/start`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ examId: exam.id }) })).json();
  const response = await fetch(`${base}/api/attempts/${secondSession.attemptId}/submit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ answers: { 99: 'A' } }) });
  assert.equal(response.status, 400);
});
