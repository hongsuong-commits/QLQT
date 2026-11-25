const STOP_WORDS = new Set(
  `a an và vài bằng bị bởi các cách cái cần càng cho chứ chưa có có thể cùng cũng đã đang
   đây để đến đều đi do đó được gì khi không là lại lên nếu người này nên như những một
   trong từ từng về việc với vẫn vào ra rồi sau sẽ sự tại theo trên tới trước tuy vì
   của cũng nhưng hay hoặc nó họ ta tôi bạn mình ấy ai nào đâu sao thế vậy rất quá
   chỉ còn phải nữa đúng sai câu hỏi đáp án chọn phương án nào theo`
    .split(/\s+/)
    .filter(Boolean),
);

const tokenCache = new Map();

export function normalizeForSearch(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export function tokenize(text) {
  return normalizeForSearch(text)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function tokensFor(chunk) {
  const key = chunk.id != null ? `id:${chunk.id}` : `pos:${chunk.documentId}:${chunk.idx}:${chunk.heading}`;
  if (tokenCache.has(key)) return tokenCache.get(key);
  const tokens = tokenize(`${chunk.heading ?? ''} ${chunk.content ?? ''}`);
  tokenCache.set(key, tokens);
  if (tokenCache.size > 20_000) {
    const oldest = tokenCache.keys().next().value;
    tokenCache.delete(oldest);
  }
  return tokens;
}

/**
 * Rank chunks with BM25. Chunks are objects with id, heading, content,
 * documentId and title. Returns the best `limit` chunks.
 */
export function retrieveChunks(chunks, query, { limit = 6 } = {}) {
  const queryTokens = tokenize(query);
  if (!chunks.length) return [];
  if (!queryTokens.length) {
    return chunks.slice(0, Math.min(limit, 3)).map((chunk) => ({ ...chunk, score: 0 }));
  }

  const tokenized = chunks.map((chunk) => {
    const tokens = tokensFor(chunk);
    const frequencies = new Map();
    for (const token of tokens) frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
    return { chunk, frequencies, length: tokens.length };
  });

  const averageLength =
    tokenized.reduce((sum, item) => sum + item.length, 0) / Math.max(1, tokenized.length);
  const documentFrequency = new Map();
  for (const token of new Set(queryTokens)) {
    let count = 0;
    for (const item of tokenized) if (item.frequencies.has(token)) count += 1;
    documentFrequency.set(token, count);
  }

  const k1 = 1.35;
  const b = 0.72;
  const scored = tokenized.map((item) => {
    let score = 0;
    for (const token of new Set(queryTokens)) {
      const frequency = item.frequencies.get(token) ?? 0;
      if (!frequency) continue;
      const df = documentFrequency.get(token) ?? 0;
      const idf = Math.log(1 + (tokenized.length - df + 0.5) / (df + 0.5));
      const denominator = frequency + k1 * (1 - b + (b * item.length) / Math.max(1, averageLength));
      score += idf * ((frequency * (k1 + 1)) / denominator);
    }
    return { ...item.chunk, score };
  });

  return scored
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.max(1, limit))
    .map((chunk) => ({ ...chunk, score: Math.round(chunk.score * 1000) / 1000 }));
}

/** Build the numbered context block sent to the model. */
export function buildContext(chunks) {
  return chunks
    .map((chunk, index) => {
      const heading = chunk.heading ? ` — ${chunk.heading}` : '';
      return `[Đoạn ${index + 1} | ${chunk.title}${heading}]\n${chunk.content}`;
    })
    .join('\n\n');
}
