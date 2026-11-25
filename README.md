# Sổ Đề

Ứng dụng luyện đề trắc nghiệm MIS3047, lưu đề và lịch sử bằng SQLite. Cần Node.js 22.13 trở lên (dùng `node:sqlite`).

## Cài đặt và chạy

```powershell
npm install
npm run build
npm start
```

Mở <http://localhost:3000>. Lần chạy đầu tiên sẽ nạp đề mẫu và tài liệu vào `data/app.db` nếu database chưa có đề. `npm run dev` chạy server và Vite trong quá trình phát triển.

## Cấu hình giải thích AI

Sao chép `.env.example` thành `.env` trong thư mục dự án, rồi đặt khóa nhà cung cấp ở `AI_API_KEY`. Có thể đổi `AI_BASE_URL`, `AI_MODEL` và `AI_TIMEOUT_MS` cho nhà cung cấp tương thích OpenAI. Khởi động lại server sau khi thay đổi.

Khóa chỉ được đọc trong backend; không đặt khóa vào biến `VITE_*` hay mã frontend. Không có khóa thật thì các chức năng đề thi vẫn hoạt động, còn giải thích AI sẽ báo chưa cấu hình. Có thể dùng Ollama cục bộ bằng `AI_BASE_URL=http://localhost:11434/v1` và model đã cài; khi đó không cần khóa. Bộ test dùng mock cục bộ và không gọi nhà cung cấp AI thật.

## Kiểm thử

```powershell
npm test
```

Các test API dùng database riêng trong thư mục tạm, không thay đổi `data/app.db`.
