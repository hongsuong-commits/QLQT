import { spawn } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const node = process.execPath;
const children = [];

function run(args, name) {
  const child = spawn(node, args, { cwd: root, stdio: 'inherit', env: process.env });
  child.on('exit', (code) => {
    if (code && code !== 0) console.error(`[dev] ${name} thoát với mã ${code}`);
  });
  children.push(child);
  return child;
}

run(['--watch', 'server/index.js'], 'server');
run([path.join('node_modules', 'vite', 'bin', 'vite.js'), '--config', 'client/vite.config.js'], 'client');

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
