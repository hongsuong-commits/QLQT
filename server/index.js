import fs from 'node:fs';
import path from 'node:path';
import { createApp } from './app.js';
import { PORT, ROOT, aiStatus } from './config.js';
import { db } from './db.js';
import { seedIfEmpty, seedMissingExams } from './seed.js';

const seeded = seedIfEmpty();
const added = seedMissingExams();
const app = createApp();

const server = app.listen(PORT, () => {
  const dist = path.join(ROOT, 'client', 'dist', 'index.html');
  console.log(`Sổ Đề đang chạy tại http://localhost:${PORT}`);
  if (seeded) console.log(`Đã nạp dữ liệu mẫu: ${seeded}`);
  if (added) console.log(`Đã thêm đề mới: ${added}`);
  if (!fs.existsSync(dist)) {
    console.log('Giao diện chưa build. Chạy "npm run build" hoặc "npm run dev".');
  }
  const ai = aiStatus();
  console.log(
    ai.configured
      ? `AI: ${ai.model} @ ${ai.host}`
      : 'AI: chưa cấu hình (đặt AI_API_KEY trong .env để bật giải thích).',
  );
});

function shutdown() {
  server.close(() => {
    try {
      db.close();
    } catch {
      /* already closed */
    }
    process.exit(0);
  });
  setTimeout(() => process.exit(0), 3000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
