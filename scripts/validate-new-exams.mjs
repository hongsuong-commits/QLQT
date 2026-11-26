import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseExamText } from '../server/lib/parse-exam.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const seedDir = path.join(here, '..', 'seed');
const files = ['13-DeNangCao-1.md', '14-DeNangCao-2.md', '15-DeNangCao-3.md'];
let failed = false;

for (const file of files) {
  const text = fs.readFileSync(path.join(seedDir, file), 'utf8');
  const parsed = parseExamText(text);
  const missing = parsed.questions.filter((q) => !q.correctOption).map((q) => q.position);
  const badOptions = parsed.questions.filter((q) =>
    [q.optionA, q.optionB, q.optionC, q.optionD].some((value) => !value.trim()),
  ).map((q) => q.position);
  console.log(
    `${file}: ${parsed.questions.length} câu, answerKey=${parsed.answerKeyFound}, ` +
      `missing=[${missing.join(',')}], badOptions=[${badOptions.join(',')}], ` +
      `warnings=${parsed.warnings.length}`,
  );
  if (parsed.warnings.length) console.log('  ', parsed.warnings.join(' | '));
  if (parsed.questions.length !== 40 || missing.length || badOptions.length || parsed.warnings.length) {
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
