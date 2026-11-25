import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { DATA_DIR, DB_PATH } from './config.js';

fs.mkdirSync(DATA_DIR, { recursive: true });

export const db = new DatabaseSync(DB_PATH);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;
  PRAGMA synchronous = NORMAL;

  CREATE TABLE IF NOT EXISTS exams (
    id               TEXT PRIMARY KEY,
    title            TEXT NOT NULL,
    subject          TEXT NOT NULL DEFAULT '',
    topic            TEXT NOT NULL DEFAULT '',
    description      TEXT NOT NULL DEFAULT '',
    duration_minutes INTEGER NOT NULL DEFAULT 75 CHECK (duration_minutes > 0),
    created_at       TEXT NOT NULL,
    updated_at       TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS questions (
    id             TEXT PRIMARY KEY,
    exam_id        TEXT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    position       INTEGER NOT NULL,
    content        TEXT NOT NULL,
    option_a       TEXT NOT NULL,
    option_b       TEXT NOT NULL,
    option_c       TEXT NOT NULL,
    option_d       TEXT NOT NULL,
    correct_option TEXT NOT NULL CHECK (correct_option IN ('A','B','C','D')),
    created_at     TEXT NOT NULL,
    updated_at     TEXT NOT NULL,
    UNIQUE (exam_id, position)
  );

  CREATE TABLE IF NOT EXISTS documents (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('upload','text','seed')),
    filename    TEXT,
    mime        TEXT,
    size        INTEGER,
    text        TEXT NOT NULL,
    char_count  INTEGER NOT NULL,
    created_at  TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS document_chunks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    idx         INTEGER NOT NULL,
    heading     TEXT NOT NULL DEFAULT '',
    content     TEXT NOT NULL,
    token_count INTEGER NOT NULL DEFAULT 0,
    UNIQUE (document_id, idx)
  );

  CREATE TABLE IF NOT EXISTS exam_documents (
    exam_id     TEXT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    PRIMARY KEY (exam_id, document_id)
  );

  CREATE TABLE IF NOT EXISTS attempt_sessions (
    id               TEXT PRIMARY KEY,
    exam_id          TEXT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    started_at       TEXT NOT NULL,
    questions_json   TEXT NOT NULL,
    document_ids_json TEXT NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS attempts (
    id               TEXT PRIMARY KEY,
    exam_id          TEXT REFERENCES exams(id) ON DELETE SET NULL,
    exam_title       TEXT NOT NULL,
    subject          TEXT NOT NULL DEFAULT '',
    topic            TEXT NOT NULL DEFAULT '',
    total_questions  INTEGER NOT NULL,
    started_at       TEXT NOT NULL,
    submitted_at     TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL,
    score            REAL NOT NULL,
    correct_count    INTEGER NOT NULL,
    wrong_count      INTEGER NOT NULL,
    unanswered_count INTEGER NOT NULL,
    accuracy         REAL NOT NULL,
    document_ids     TEXT NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS attempt_questions (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    attempt_id     TEXT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
    position       INTEGER NOT NULL,
    question_id    TEXT,
    content        TEXT NOT NULL,
    option_a       TEXT NOT NULL,
    option_b       TEXT NOT NULL,
    option_c       TEXT NOT NULL,
    option_d       TEXT NOT NULL,
    correct_option TEXT NOT NULL CHECK (correct_option IN ('A','B','C','D')),
    user_option    TEXT CHECK (user_option IS NULL OR user_option IN ('A','B','C','D')),
    status         TEXT NOT NULL CHECK (status IN ('correct','wrong','unanswered')),
    flagged        INTEGER NOT NULL DEFAULT 0 CHECK (flagged IN (0,1)),
    UNIQUE (attempt_id, position)
  );

  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS explanations (
    attempt_id  TEXT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
    position    INTEGER NOT NULL,
    sufficient  INTEGER NOT NULL CHECK (sufficient IN (0,1)),
    message     TEXT,
    why_wrong   TEXT,
    why_correct TEXT,
    knowledge   TEXT,
    summary     TEXT,
    sources_json TEXT NOT NULL DEFAULT '[]',
    model       TEXT,
    created_at  TEXT NOT NULL,
    PRIMARY KEY (attempt_id, position)
  );

  CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id, position);
  CREATE INDEX IF NOT EXISTS idx_chunks_doc ON document_chunks(document_id, idx);
  CREATE INDEX IF NOT EXISTS idx_attempts_submitted ON attempts(submitted_at DESC);
  CREATE INDEX IF NOT EXISTS idx_attempt_questions_attempt ON attempt_questions(attempt_id, position);
`);

export function nowIso() {
  return new Date().toISOString();
}

export function withTransaction(fn) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    try {
      db.exec('ROLLBACK');
    } catch {
      /* the transaction may already be closed */
    }
    throw error;
  }
}

export function getSetting(key) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : null;
}

export function setSetting(key, value) {
  db.prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
  ).run(key, String(value));
}

export function unusedPathHint() {
  return path.basename(DB_PATH);
}
