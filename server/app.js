import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, aiStatus, DB_PATH } from './config.js';
import { db } from './db.js';import { homeRouter } from './routes/home.js';
import { examsRouter } from './routes/exams.js';
import { documentsRouter } from './routes/documents.js';
import { importsRouter } from './routes/imports.js';
import { attemptsRouter } from './routes/attempts.js';
import { aiRouter } from './routes/ai.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'",
    );
    next();
  });

  app.use(express.json({ limit: '3mb' }));
  app.use('/api', (_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      database: fs.existsSync(DB_PATH),
      ai: aiStatus(),
      now: new Date().toISOString(),
    });
  });

  app.use('/api/home', homeRouter);
  app.use('/api/exams', examsRouter);
  app.use('/api/documents', documentsRouter);
  app.use('/api/imports', importsRouter);
  app.use('/api/attempts', attemptsRouter);
  app.use('/api', aiRouter);

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Không tìm thấy đường dẫn API này.' });
  });

  const dist = path.join(ROOT, 'client', 'dist');
  if (fs.existsSync(dist)) {
    app.use(
      express.static(dist, {
        index: false,
        maxAge: '1h',
        setHeaders(res, filePath) {
          if (filePath.endsWith('index.html')) res.setHeader('Cache-Control', 'no-store');
        },
      }),
    );
  }

  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    const indexPath = path.join(dist, 'index.html');
    if (!fs.existsSync(indexPath)) {
      res
        .status(503)
        .type('text/plain')
        .send('Giao diện chưa được build. Chạy: npm run build, rồi khởi động lại máy chủ.');
      return;
    }
    res.setHeader('Cache-Control', 'no-store');
    res.sendFile(indexPath);
  });

  app.use((error, _req, res, _next) => {
    let status = Number(error?.status) || 500;
    let message = error?.message || 'Lỗi máy chủ.';
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        status = 413;
        message = 'Tệp vượt quá giới hạn 15 MB.';
      } else {
        status = 400;
        message = `Lỗi tải tệp: ${error.message}`;
      }
    }
    if (status >= 500) console.error('[server]', error);
    if (res.headersSent) return;
    res.status(status).json({ error: message });
  });

  return app;
}
