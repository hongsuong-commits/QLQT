/** Text helpers shared by extraction, parsing and chunking. */

/** Decode a buffer that may come from a UTF-8, Windows-1258 or Windows-1252 file. */
export function decodeTextBuffer(buffer) {
  if (!buffer || buffer.length === 0) {
    throw Object.assign(new Error('Tệp rỗng.'), { status: 422 });
  }
  if (buffer.includes(0)) {
    throw Object.assign(new Error('Tệp có vẻ là tệp nhị phân, không phải văn bản.'), {
      status: 415,
    });
  }
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer).replace(/^\uFEFF/, '');
  } catch {
    /* try a Vietnamese legacy code page next */
  }
  for (const encoding of ['windows-1258', 'windows-1252']) {
    try {
      const value = new TextDecoder(encoding).decode(buffer);
      if (!value.includes('\uFFFD')) return value;
    } catch {
      /* not supported */
    }
  }
  return buffer.toString('utf8');
}

export function normalizeText(input) {
  return String(input ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

/** Strip inline markdown emphasis for contexts where only words matter. */
export function plainInline(input) {
  return String(input ?? '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function firstHeading(text, fallback = '') {
  const line = String(text ?? '')
    .split('\n')
    .map((value) => value.trim())
    .find((value) => /^#{1,3}\s+\S/.test(value));
  if (line) return plainInline(line.replace(/^#{1,3}\s+/, ''));
  const first = String(text ?? '')
    .split('\n')
    .map((value) => value.trim())
    .find((value) => value && !value.startsWith('>') && !value.startsWith('```'));
  return first ? plainInline(first).slice(0, 120) : fallback;
}

export function filenameTitle(filename) {
  return String(filename || 'Tài liệu')
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .trim();
}

export function countWords(text) {
  const value = String(text ?? '').trim();
  return value ? value.split(/\s+/).length : 0;
}
