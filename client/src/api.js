async function readResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.slice(0, 300) };
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(path, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error('Không kết nối được máy chủ. Kiểm tra máy chủ đang chạy.');
  }
  const data = await readResponse(response);
  if (!response.ok) {
    throw new Error(data?.error || `Máy chủ trả lỗi ${response.status}.`);
  }
  return data;
}

export async function upload(path, formData) {
  let response;
  try {
    response = await fetch(path, { method: 'POST', body: formData });
  } catch {
    throw new Error('Không kết nối được máy chủ. Kiểm tra máy chủ đang chạy.');
  }
  const data = await readResponse(response);
  if (!response.ok) {
    throw new Error(data?.error || `Máy chủ trả lỗi ${response.status}.`);
  }
  return data;
}
