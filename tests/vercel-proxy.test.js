import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

async function withProxy(server, run) {
  process.env.API_ORIGIN = `http://127.0.0.1:${server.address().port}`;
  process.env.ORIGIN_SECRET = 'proxy-test-secret';
  const module = await import('../api/[...path].js?proxy-test');
  return run(module.default);
}

test('Vercel adapter forwards /api path, query, body and secret to the Express host', async () => {
  let observed = null;
  const server = createServer((req, res) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      observed = {
        method: req.method,
        url: req.url,
        secret: req.headers['x-origin-secret'],
        body: Buffer.concat(chunks).toString('utf8'),
      };
      res.writeHead(201, { 'content-type': 'application/json', 'x-upstream': 'yes' });
      res.end(JSON.stringify({ ok: true, answer: 42 }));
    });
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await withProxy(server, async (handler) => {
      const response = await handler(
        new Request('http://sode.vercel.app/api/attempts/start?force=1', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ examId: 'exam-1' }),
        }),
      );

      assert.equal(response.status, 201);
      assert.equal(response.headers.get('x-upstream'), 'yes');
      assert.deepEqual(await response.json(), { ok: true, answer: 42 });
      assert.equal(observed.method, 'POST');
      assert.equal(observed.url, '/api/attempts/start?force=1');
      assert.equal(observed.secret, 'proxy-test-secret');
      assert.deepEqual(JSON.parse(observed.body), { examId: 'exam-1' });
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('Vercel adapter rejects non-API paths', async () => {
  const server = createServer((_req, res) => res.end('{}'));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await withProxy(server, async (handler) => {
      const response = await handler(new Request('http://sode.vercel.app/exams'));
      assert.equal(response.status, 404);
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('Vercel adapter fails loudly when API_ORIGIN is missing', () => {
  const script = [
    "import('./api/[...path].js').then(async (m) => {",
    "  const r = await m.default(new Request('http://localhost/api/health'));",
    '  process.stdout.write(String(r.status));',
    '});',
  ].join('\n');
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { ...process.env, API_ORIGIN: '' },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, '503');
});
