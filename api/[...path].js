/* Vercel API adapter.
 *
 * The Express application keeps running on a normal Node host with a persistent
 * disk, because SQLite (node:sqlite) cannot survive Vercel's read-only,
 * ephemeral serverless filesystem. This function only forwards /api/* traffic
 * to that host under the same origin, so the browser still calls relative
 * /api/... URLs and no CORS or client rewrite is needed.
 *
 * Required Vercel environment variable:
 *   API_ORIGIN   e.g. https://so-de-api.onrender.com  (no trailing /api)
 * Optional:
 *   ORIGIN_SECRET  shared secret; also set on the Express host to verify calls
 */

const ORIGIN = (process.env.API_ORIGIN || '').replace(/\/+$/, '');
const ORIGIN_SECRET = process.env.ORIGIN_SECRET || '';
const HOP_HEADERS = new Set([
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
  'content-encoding',
]);

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

export default async function handler(request) {
  const incoming = new URL(request.url);

  if (!incoming.pathname.startsWith('/api/')) {
    return json(404, { error: 'Không tìm thấy đường dẫn API này.' });
  }

  if (!ORIGIN) {
    return json(503, {
      error:
        'API_ORIGIN chưa được cấu hình trên Vercel. Hãy trỏ biến môi trường API_ORIGIN tới máy chủ Express có ổ cứng lưu SQLite, rồi triển khai lại.',
    });
  }

  let target;
  try {
    target = new URL(`${ORIGIN}${incoming.pathname}${incoming.search}`);
  } catch {
    return json(500, { error: 'API_ORIGIN không phải là URL hợp lệ.' });
  }

  const headers = new Headers(request.headers);
  for (const name of HOP_HEADERS) headers.delete(name);
  if (ORIGIN_SECRET) headers.set('x-origin-secret', ORIGIN_SECRET);

  const hasBody = !['GET', 'HEAD'].includes(request.method.toUpperCase());
  const init = {
    method: request.method.toUpperCase(),
    headers,
    redirect: 'manual',
    signal: AbortSignal.timeout(55_000),
  };
  if (hasBody) init.body = await request.arrayBuffer();

  let upstream;
  try {
    upstream = await fetch(target, init);
  } catch (error) {
    return json(502, {
      error: `Không kết nối được máy chủ API. Kiểm tra API_ORIGIN và trạng thái backend: ${error.message}`,
    });
  }

  const responseHeaders = new Headers();
  for (const [name, value] of upstream.headers) {
    if (!HOP_HEADERS.has(name.toLowerCase())) responseHeaders.set(name, value);
  }
  responseHeaders.set('cache-control', 'no-store');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
