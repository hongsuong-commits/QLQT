export function httpError(message, status = 400) {
  return Object.assign(new Error(message), { status });
}

export function textField(value, label, { min = 0, max = 20_000, trim = true } = {}) {
  if (value === undefined || value === null) value = '';
  if (typeof value !== 'string') throw httpError(`${label} phải là văn bản.`);
  const result = trim ? value.trim() : value;
  if (result.length < min) throw httpError(`${label} cần ít nhất ${min} ký tự.`);
  if (result.length > max) throw httpError(`${label} không được vượt quá ${max} ký tự.`);
  return result;
}

export function intField(value, label, { min = 1, max = 600, fallback } = {}) {
  const n = Number(value ?? fallback);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw httpError(`${label} phải là số nguyên từ ${min} đến ${max}.`);
  }
  return n;
}

export function stringArray(value, label) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw httpError(`${label} phải là danh sách.`);
  const seen = new Set();
  const result = [];
  for (const item of value) {
    if (typeof item !== 'string') throw httpError(`${label} chứa giá trị không hợp lệ.`);
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

export function validateExamPayload(body) {
  if (!body || typeof body !== 'object') throw httpError('Thiếu dữ liệu đề thi.');
  const title = textField(body.title, 'Tên đề', { min: 1, max: 200 });
  const subject = textField(body.subject, 'Môn học', { max: 120 });
  const topic = textField(body.topic, 'Chủ đề', { max: 160 });
  const description = textField(body.description, 'Mô tả', { max: 2000 });
  const durationMinutes = intField(body.durationMinutes, 'Thời gian làm bài', {
    min: 1,
    max: 600,
    fallback: 75,
  });
  const documentIds = stringArray(body.documentIds, 'Tài liệu liên kết');

  if (!Array.isArray(body.questions) || body.questions.length === 0) {
    throw httpError('Đề thi cần ít nhất một câu hỏi.');
  }
  if (body.questions.length > 200) throw httpError('Một đề chỉ nhận tối đa 200 câu hỏi.');

  const questions = body.questions.map((question, index) => {
    const label = `Câu ${index + 1}`;
    if (!question || typeof question !== 'object') throw httpError(`${label} không hợp lệ.`);
    const content = textField(question.content, `${label}: nội dung`, { min: 1, max: 20_000 });
    const optionA = textField(question.optionA, `${label}: phương án A`, { min: 1, max: 6000 });
    const optionB = textField(question.optionB, `${label}: phương án B`, { min: 1, max: 6000 });
    const optionC = textField(question.optionC, `${label}: phương án C`, { min: 1, max: 6000 });
    const optionD = textField(question.optionD, `${label}: phương án D`, { min: 1, max: 6000 });
    const correctOption = String(question.correctOption ?? '').trim().toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(correctOption)) {
      throw httpError(`${label}: phải chọn đáp án chính xác A, B, C hoặc D.`);
    }
    return {
      position: index + 1,
      content,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
    };
  });

  return { title, subject, topic, description, durationMinutes, documentIds, questions };
}

export function validateSubmission(body, positions) {
  const answers = {};
  const rawAnswers = body?.answers ?? {};
  if (typeof rawAnswers !== 'object' || Array.isArray(rawAnswers)) {
    throw httpError('Danh sách đáp án không hợp lệ.');
  }
  for (const [key, value] of Object.entries(rawAnswers)) {
    const position = Number(key);
    if (!Number.isInteger(position) || !positions.has(position)) {
      throw httpError(`Vị trí câu ${key} không nằm trong đề.`);
    }
    if (value === null || value === undefined || value === '') continue;
    const letter = String(value).trim().toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(letter)) {
      throw httpError(`Đáp án câu ${position} phải là A, B, C hoặc D.`);
    }
    answers[position] = letter;
  }

  const flags = [];
  const seen = new Set();
  if (body?.flags !== undefined) {
    if (!Array.isArray(body.flags)) throw httpError('Danh sách cờ không hợp lệ.');
    for (const value of body.flags) {
      const position = Number(value);
      if (!Number.isInteger(position) || !positions.has(position)) {
        throw httpError(`Cờ ở vị trí ${value} không nằm trong đề.`);
      }
      if (!seen.has(position)) {
        seen.add(position);
        flags.push(position);
      }
    }
  }
  return { answers, flags };
}
