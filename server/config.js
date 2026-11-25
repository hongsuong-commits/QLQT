import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '..');

/** Read .env without overriding variables already set by the shell. */
function loadEnvFile() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile();

const int = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
};

export const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(ROOT, 'data'));
export const DB_PATH = path.resolve(process.env.DB_PATH || path.join(DATA_DIR, 'app.db'));
export const SEED_DIR = path.resolve(process.env.SEED_DIR || path.join(ROOT, 'seed'));

export const PORT = int(process.env.PORT, 3000);
export const MAX_UPLOAD_BYTES = int(process.env.MAX_UPLOAD_BYTES, 15 * 1024 * 1024);

export const AI = {
  baseUrl: (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, ''),
  apiKey: process.env.AI_API_KEY || '',
  model: process.env.AI_MODEL || 'gpt-4o-mini',
  timeoutMs: int(process.env.AI_TIMEOUT_MS, 90_000),
};

export function aiIsConfigured() {
  let host = '';
  try {
    host = new URL(AI.baseUrl).hostname;
  } catch {
    host = '';
  }
  const local = host === 'localhost' || host === '127.0.0.1' || host === '::1';
  return Boolean(AI.apiKey) || local;
}

export function aiStatus() {
  let host = '';
  try {
    host = new URL(AI.baseUrl).host;
  } catch {
    host = AI.baseUrl;
  }
  return {
    configured: aiIsConfigured(),
    model: AI.model,
    host,
    requiresKey: !/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(AI.baseUrl),
  };
}

export const INSUFFICIENT_MESSAGE =
  'Tài liệu ôn tập chưa cung cấp đủ thông tin để giải thích câu hỏi này';
