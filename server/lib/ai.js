import { AI, INSUFFICIENT_MESSAGE, aiIsConfigured } from '../config.js';

const SYSTEM_PROMPT = `Bạn là trợ giảng giải thích đề trắc nghiệm tiếng Việt.
QUY TẮC BẮT BUỘC:
1. Chỉ được dùng nội dung trong các "ĐOẠN TÀI LIỆU" do người dùng cung cấp. Không dùng kiến thức bên ngoài, không suy đoán, không bịa ví dụ, không thêm số liệu không có trong tài liệu.
2. Đáp án chính thức do đề thi quy định và là bất biến. Bạn không được sửa, thay thế hay phản đối đáp án đó. Không đưa ra một đáp án khác.
3. Nếu các đoạn tài liệu không đủ căn cứ để giải thích cả vì sao đáp án chính thức đúng và vì sao lựa chọn của người học chưa đúng, hãy đặt "sufficient": false. Khi đó trường "message" phải đúng nguyên văn: "${INSUFFICIENT_MESSAGE}".
4. Khi đủ căn cứ, giải thích ngắn gọn, rõ ràng, bám sát câu hỏi; mỗi phần 2-4 câu. Trích dẫn ý trong tài liệu bằng lời, không bịa tên mục.
5. Nếu người học chưa chọn đáp án, "why_wrong" giải thích vì sao việc chưa chọn hoặc những nhầm lẫn thường gặp dẫn đến sai, dựa trên tài liệu.
6. Chỉ trả về một đối tượng JSON hợp lệ, không thêm văn bản ngoài JSON, theo đúng cấu trúc:
{
  "sufficient": true | false,
  "message": "chỉ dùng khi sufficient=false",
  "why_wrong": "vì sao lựa chọn của người học (hoặc việc chưa chọn) chưa đúng",
  "why_correct": "vì sao đáp án chính thức đúng",
  "knowledge": "kiến thức liên quan trong tài liệu, nêu rõ tài liệu/mục nếu có",
  "summary": "một câu ghi nhớ ngắn để tránh nhầm lẫn",
  "used_sources": [1, 2]
}`;

function jsonFromContent(content) {
  const text = String(content ?? '').trim();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) {
    throw Object.assign(new Error('AI không trả về JSON hợp lệ.'), { status: 502 });
  }
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    throw Object.assign(new Error('AI trả về JSON không đọc được.'), { status: 502 });
  }
}

async function postChat(body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI.timeoutMs);
  try {
    const response = await fetch(`${AI.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(AI.apiKey ? { Authorization: `Bearer ${AI.apiKey}` } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const raw = await response.text();
    let data = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }
    return { response, data, raw };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Ask the configured OpenAI-compatible provider for a grounded explanation.
 * The official answer is passed in as a fact and has no field in the response.
 */
export async function generateExplanation({ question, userOption, context, sourceCount }) {
  if (!aiIsConfigured()) {
    throw Object.assign(
      new Error(
        'AI chưa được cấu hình trên máy chủ. Đặt AI_API_KEY (và AI_BASE_URL, AI_MODEL) trong tệp .env rồi khởi động lại.',
      ),
      { status: 503 },
    );
  }

  const optionLines = ['A', 'B', 'C', 'D']
    .map((letter) => `${letter}. ${question[`option${letter}`] ?? ''}`)
    .join('\n');
  const chosen = userOption
    ? `${userOption}. ${question[`option${userOption}`] ?? ''}`
    : '(người học chưa chọn đáp án)';

  const userPrompt = `CÂU HỎI:
${question.content}

CÁC PHƯƠNG ÁN:
${optionLines}

ĐÁP ÁN CHÍNH THỨC (bất biến): ${question.correctOption}. ${
    question[`option${question.correctOption}`] ?? ''
  }
NGƯỜI HỌC ĐÃ CHỌN: ${chosen}

ĐOẠN TÀI LIỆU (${sourceCount} đoạn, chỉ được dùng những đoạn này):
${context || '(không truy xuất được đoạn tài liệu nào)'}

Hãy giải thích theo đúng JSON schema trong lời nhắc hệ thống. Nhắc lại: không thay đổi đáp án chính thức; nếu thiếu căn cứ thì sufficient=false và message đúng nguyên văn.`;

  const body = {
    model: AI.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.1,
    max_tokens: 1400,
    response_format: { type: 'json_object' },
  };

  let { response, data, raw } = await postChat(body);

  // Some compatible providers reject response_format; retry once without it.
  if (!response.ok && response.status === 400 && /response_format|json/i.test(raw)) {
    delete body.response_format;
    ({ response, data, raw } = await postChat(body));
  }

  if (!response.ok) {
    const detail = data?.error?.message || raw || response.statusText;
    const status = response.status === 401 || response.status === 403 ? 503 : 502;
    throw Object.assign(new Error(`Nhà cung cấp AI trả lỗi: ${String(detail).slice(0, 300)}`), {
      status,
    });
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw Object.assign(new Error('AI trả về câu trả lời rỗng.'), { status: 502 });
  }

  const parsed = jsonFromContent(content);
  if (parsed.sufficient === false) {
    return {
      sufficient: false,
      message: INSUFFICIENT_MESSAGE,
      whyWrong: null,
      whyCorrect: null,
      knowledge: null,
      summary: null,
      usedSources: [],
    };
  }

  const fields = {
    whyWrong: String(parsed.why_wrong ?? '').trim(),
    whyCorrect: String(parsed.why_correct ?? '').trim(),
    knowledge: String(parsed.knowledge ?? '').trim(),
    summary: String(parsed.summary ?? '').trim(),
  };
  if (!fields.whyWrong || !fields.whyCorrect || !fields.knowledge || !fields.summary) {
    throw Object.assign(
      new Error('AI trả về thiếu nội dung giải thích. Hãy thử lại hoặc kiểm tra model.'),
      { status: 502 },
    );
  }

  const usedSources = Array.isArray(parsed.used_sources)
    ? parsed.used_sources
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value >= 1 && value <= sourceCount)
    : [];

  return {
    sufficient: true,
    message: null,
    ...fields,
    usedSources: [...new Set(usedSources)].sort((a, b) => a - b),
  };
}
