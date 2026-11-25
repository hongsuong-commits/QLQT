import test from 'node:test';
import assert from 'node:assert/strict';
import { retrieveChunks } from '../server/lib/retrieval.js';

test('BM25 xếp đoạn liên quan lên đầu với nội dung tiếng Việt không dấu', () => {
  const chunks = [
    { id: 1, title: 'Tài liệu A', heading: 'BPMN', content: 'Cổng XOR chọn đúng một nhánh theo điều kiện.' },
    { id: 2, title: 'Tài liệu B', heading: 'Lưu trữ', content: 'Kho dữ liệu lưu trữ thông tin khách hàng.' },
  ];
  const ranked = retrieveChunks(chunks, 'Cổng XOR chọn một nhánh theo điều kiện', { limit: 2 });
  assert.equal(ranked[0].id, 1);
  assert.ok(ranked[0].score > ranked[1].score);
});

test('BM25 xử lý tập rỗng và truy vấn không có token', () => {
  assert.deepEqual(retrieveChunks([], 'câu hỏi'), []);
  const rows = retrieveChunks([{ id: 1, content: 'Một đoạn' }, { id: 2, content: 'Đoạn khác' }], 'và của là');
  assert.ok(rows.length > 0);
  assert.ok(rows.every((row) => row.score === 0));
});
