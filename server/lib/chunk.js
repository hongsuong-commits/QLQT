import { countWords } from './text.js';

/**
 * Split a long text into retrieval chunks. Markdown headings become the
 * chunk's heading; paragraphs are grouped up to MAX chars.
 */
export function chunkText(text, fallbackHeading = '') {
  const source = String(text ?? '').replace(/\r\n?/g, '\n').trim();
  if (!source) return [];

  const MAX = 1100;
  const OVERLAP = 160;
  const chunks = [];

  const pushLong = (body, heading) => {
    let rest = body.trim();
    while (rest.length > MAX) {
      let cut = rest.lastIndexOf('\n\n', MAX);
      if (cut < MAX * 0.45) cut = rest.lastIndexOf('. ', MAX);
      if (cut < MAX * 0.45) cut = MAX;
      const piece = rest.slice(0, cut).trim();
      if (piece) chunks.push({ heading, content: piece });
      rest = rest.slice(Math.max(0, cut - OVERLAP)).trim();
    }
    if (rest) chunks.push({ heading, content: rest });
  };

  const sections = [];
  let heading = fallbackHeading;
  let bodyLines = [];

  const flushSection = () => {
    const body = bodyLines.join('\n').trim();
    if (body) sections.push({ heading, body });
    bodyLines = [];
  };

  for (const line of source.split('\n')) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (match) {
      flushSection();
      heading = match[1].trim();
    } else {
      bodyLines.push(line);
    }
  }
  flushSection();

  for (const section of sections) {
    const paragraphs = section.body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    let buffer = '';
    for (const paragraph of paragraphs) {
      if (paragraph.length > MAX) {
        if (buffer) {
          pushLong(buffer, section.heading);
          buffer = '';
        }
        pushLong(paragraph, section.heading);
        continue;
      }
      if ((buffer ? buffer.length + 2 : 0) + paragraph.length > MAX) {
        if (buffer) pushLong(buffer, section.heading);
        buffer = paragraph;
      } else {
        buffer = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
      }
    }
    if (buffer) pushLong(buffer, section.heading);
  }

  return chunks.map((chunk, index) => ({
    idx: index,
    heading: chunk.heading,
    content: chunk.content,
    tokenCount: countWords(chunk.content),
  }));
}
