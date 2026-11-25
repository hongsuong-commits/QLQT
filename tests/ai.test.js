import test from 'node:test';
import assert from 'node:assert/strict';
import { startTestApp, examPayload } from './helpers/app.js';

test('AI mock lưu giải thích có căn cứ; từ chối câu đúng; lưu nhánh thiếu tài liệu', async (t) => {
  process.env.AI_BASE_URL = 'http://localhost:12345/v1';
  process.env.AI_API_KEY = 'test-only-secret';
  const { base, db } = await startTestApp(t);
  const documentId = 'doc-test';
  db.prepare(`INSERT INTO documents (id,title,source_type,text,char_count,created_at) VALUES (?,?,'text',?,?,?)`).run(documentId, 'Tài liệu BPMN', 'Cổng XOR chỉ chọn một nhánh thỏa điều kiện. Nội dung hướng dẫn này có đủ độ dài.', 80, new Date().toISOString());
  db.prepare(`INSERT INTO document_chunks (document_id,idx,heading,content,token_count) VALUES (?,?,?,?,?)`).run(documentId, 0, 'Cổng XOR', 'Cổng XOR chỉ chọn một nhánh thỏa điều kiện. Nội dung hướng dẫn này có đủ độ dài.', 15);
  const payload = examPayload('Đề AI');
  payload.documentIds = [documentId];
  payload.questions[0].content = 'Cổng XOR hoạt động như thế nào?';
  const created = await (await fetch(`${base}/api/exams`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })).json();
  const session = await (await fetch(`${base}/api/attempts/start`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ examId: created.exam.id }) })).json();
  const submitted = await (await fetch(`${base}/api/attempts/${session.attemptId}/submit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ answers: { 1: 'B', 2: 'B' } }) })).json();
  const status = await (await fetch(`${base}/api/ai/status`)).json();
  assert.equal(status.configured, true);
  assert.equal(JSON.stringify(status).includes('test-only-secret'), false);
  const realFetch = globalThis.fetch;
  let mode = 'success';
  globalThis.fetch = async (input, init) => {
    if (!String(input).endsWith('/chat/completions')) return realFetch(input, init);
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(mode === 'success' ? {
    sufficient: true, why_wrong: 'B không phải nhánh duy nhất.', why_correct: 'XOR chọn một nhánh.', knowledge: 'Tài liệu mô tả cổng XOR.', summary: 'XOR chọn một nhánh.', used_sources: [1],
  } : { sufficient: false }) } }] }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  t.after(() => { globalThis.fetch = realFetch; });

  const wrongUrl = `${base}/api/attempts/${submitted.attemptId}/explanations/1`;
  const success = await (await fetch(wrongUrl, { method: 'POST' })).json();
  assert.equal(success.explanation.sufficient, true);
  assert.equal(success.explanation.sources[0].title, 'Tài liệu BPMN');
  const persisted = db.prepare('SELECT * FROM explanations WHERE attempt_id = ? AND position = 1').get(submitted.attemptId);
  assert.equal(persisted.why_correct, 'XOR chọn một nhánh.');

  const correctResponse = await fetch(`${base}/api/attempts/${submitted.attemptId}/explanations/2`, { method: 'POST' });
  assert.equal(correctResponse.status, 400);
  mode = 'insufficient';
  const insufficient = await (await fetch(`${base}/api/attempts/${submitted.attemptId}/explanations/1?force=1`, { method: 'POST' })).json();
  assert.equal(insufficient.explanation.sufficient, false);
  assert.equal(insufficient.explanation.whyCorrect, null);
  assert.match(insufficient.explanation.message, /chưa cung cấp đủ thông tin/);
});
