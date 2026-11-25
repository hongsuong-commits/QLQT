import fs from 'node:fs';
import { parseExamText } from '../server/lib/parse-exam.js';

for (const file of ['08-DeThiMau-40-cau.md', '10-DeThiMau-2.md', '11-DeThiMau-3.md', '12-DeThiMau-4.md']) {
  const text = fs.readFileSync(`seed/${file}`, 'utf8');
  const result = parseExamText(text);
  const answers = result.questions.filter((question) => question.correctOption).length;
  console.log(file, 'questions', result.questions.length, 'answers', answers, 'warnings', result.warnings.length);
  const first = result.questions[0];
  console.log('  first:', JSON.stringify(first?.content.slice(0, 70)), first?.correctOption);
  const q29 = result.questions.find((question) => question.position === 29);
  console.log(
    '  q29 fence:',
    q29?.content.includes('```'),
    'options:',
    [q29?.optionA, q29?.optionB, q29?.optionC, q29?.optionD].every(Boolean),
  );
  if (result.warnings.length) console.log('  warnings:', result.warnings.slice(0, 3));
}
