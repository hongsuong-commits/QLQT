import { db } from '../server/db.js';
import { retrieveChunks, tokenize } from '../server/lib/retrieval.js';

const rows = db
  .prepare(
    `SELECT c.id, c.document_id, c.idx, c.heading, c.content, d.title
     FROM document_chunks c JOIN documents d ON d.id = c.document_id`,
  )
  .all();
const chunks = rows.map((row) => ({
  id: row.id,
  documentId: row.document_id,
  idx: row.idx,
  heading: row.heading,
  content: row.content,
  title: row.title,
}));

const queries = [
  'Theo 7PMG, một mô hình nên có khoảng bao nhiêu phần tử để còn dễ hiểu?',
  'Cổng OR bao hàm khác XOR ở điểm nào?',
  'Ngưỡng tin cậy 0,95 có ý nghĩa gì?',
  'Vì sao ngoại lệ trong mô hình BPMN là nguồn tốt để sinh ca kiểm thử?',
];
for (const query of queries) {
  const result = retrieveChunks(chunks, query, { limit: 3 });
  console.log('\nQUERY:', query);
  console.log('tokens:', tokenize(query).slice(0, 12));
  for (const item of result) {
    console.log(item.score.toFixed(2), '|', item.title.slice(0, 45), '|', item.heading.slice(0, 45));
    console.log('   ', item.content.replace(/\s+/g, ' ').slice(0, 130));
  }
}
