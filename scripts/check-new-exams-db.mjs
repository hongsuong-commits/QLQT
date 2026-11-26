import { db } from '../server/db.js';

const rows = db
  .prepare(
    `SELECT e.title AS title, q.position AS position, q.content AS content
     FROM questions q
     JOIN exams e ON e.id = q.exam_id
     WHERE e.title LIKE 'Đề nâng cao%'
       AND q.position IN (30, 32, 34, 36, 38, 40)
     ORDER BY e.title, q.position`,
  )
  .all();
console.log(rows.map((row) => ({ exam: row.title.slice(0, 22), pos: row.position, diagram: row.content.includes('```') })));
const totals = db
  .prepare(
    `SELECT e.title AS title,
            (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS questions,
            (SELECT COUNT(*) FROM exam_documents ed WHERE ed.exam_id = e.id) AS links
     FROM exams e
     ORDER BY e.title`,
  )
  .all();
console.log(totals);
db.close();
