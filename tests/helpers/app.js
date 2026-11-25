import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export async function startTestApp(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'so-de-test-'));
  process.env.DATA_DIR = dir;
  process.env.DB_PATH = path.join(dir, 'test.db');
  process.env.SEED_DIR = path.join(dir, 'no-seed');
  const [{ createApp }, database] = await Promise.all([
    import('../../server/app.js'),
    import('../../server/db.js'),
  ]);
  const server = createApp().listen(0);
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    database.db.close();
    fs.rmSync(dir, { recursive: true, force: true });
  });
  return { base, db: database.db };
}

export function examPayload(title = 'Đề kiểm thử', questions = [
  { position: 1, content: 'Câu hỏi mẫu', optionA: 'Đúng', optionB: 'Sai', optionC: 'Khác', optionD: 'Khác nữa', correctOption: 'A' },
  { position: 2, content: 'Câu hỏi thứ hai', optionA: 'Sai', optionB: 'Đúng', optionC: 'Khác', optionD: 'Khác nữa', correctOption: 'B' },
  { position: 3, content: 'Câu hỏi thứ ba', optionA: 'Sai', optionB: 'Sai', optionC: 'Đúng', optionD: 'Khác nữa', correctOption: 'C' },
]) {
  return { title, subject: 'Test', topic: '', description: '', durationMinutes: 30, documentIds: [], questions };
}
