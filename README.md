# Sổ Đề

Ứng dụng luyện đề trắc nghiệm MIS3047, lưu đề, tài liệu và lịch sử làm bài bằng SQLite. Cần Node.js 22.13 trở lên (dùng `node:sqlite`).

## Cài đặt và chạy locally

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

---

## Triển khai

### 1. Frontend trên Vercel

`vercel.json` nằm ở **gốc repository** và đã được đưa vào git. Các thiết lập bắt buộc trong Vercel Dashboard → Project Settings:

| Thiết lập | Giá trị |
| --- | --- |
| Root Directory | `.` (gốc repository, **không** phải `client`) |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `client/dist` |
| Node.js Version | 22.x trở lên (≥ 22.13 để dùng `node:sqlite` nếu chạy backend) |

Lệnh `npm run build` chạy `vite build --config client/vite.config.js`. Vite lấy `client` làm root và ghi ra `client/dist`; thư mục `dist` ở gốc **không bao giờ tồn tại**. Đó là lý do Vercel báo `STATIC_BUILD_NO_OUT_DIR ... "dist"`: bản deploy trước đó không đọc được `vercel.json` (tệp chưa được commit) nên rơi về output mặc định của Vite là `dist`.

> Sau khi commit/push `vercel.json`, phải redeploy thì Vercel mới áp dụng Output Directory mới.

### 2. Backend và API

Chỉ deploy frontend là chưa đủ: mọi chức năng (làm bài, nộp bài, lưu lịch sử, tải tài liệu, AI) đều gọi `/api/...`. Vercel serverless có hệ thống tệp **chỉ đọc** và chỉ `/tmp` ghi được, nhưng `/tmp` bị xóa giữa các invocation. Vì vậy **không chạy SQLite trên Vercel Functions** — đề, tài liệu và lịch sử sẽ bị mất.

Phương án đang cấu hình trong repository (không đổi kiến trúc ứng dụng, không đổi database):

1. Chạy Express trên một Node host có ổ cứng persistent (Render + Persistent Disk, Railway/Fly.io + Volume, hoặc VPS). Deploy từ thư mục gốc:
   ```powershell
   npm install
   npm run build
   npm start
   ```
   Trỏ `DATA_DIR` (hoặc `DB_PATH`) tới đường dẫn trên ổ persistent, ví dụ `DATA_DIR=/data/so-de`. Giữ nguyên các tệp `seed/` để lần đầu chạy tự nạp 4 đề và 8 tài liệu.
2. Đặt các biến môi trường **trên backend**, không đặt trên Vercel: `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`, `AI_TIMEOUT_MS`, và tùy chọn `ORIGIN_SECRET`.
3. Trên Vercel đặt:
   - `API_ORIGIN` = URL gốc của backend, ví dụ `https://so-de-api.onrender.com` (không thêm `/api`).
   - `ORIGIN_SECRET` = cùng giá trị với backend (nếu dùng).

`api/[...path].js` là catch-all Function nhận mọi `/api/*`, chuyển tiếp nguyên method, body (kể cả multipart), query và header tới `API_ORIGIN`, rồi trả response về cùng origin với frontend — trình duyệt vẫn gọi `/api/...` tương đối nên không cần CORS. Nếu thiếu `API_ORIGIN`, function trả lỗi `503` rõ ràng thay vì để giao diện gọi nhầm vào `index.html`.

Không có module đăng nhập trong dự án này (theo yêu cầu gốc không dùng xác thực); không có khâu "đăng nhập" nào bị bỏ sót hay được giả lập.

### 3. Nếu muốn chạy toàn bộ API trên Vercel

Cần thay SQLite bằng database quản lý (khuyến nghị **Turso/libSQL** vì giữ nguyên cú pháp SQLite và dễ migrator schema hiện tại; Neon/Postgres là lựa chọn khác). Việc này đòi hỏi đổi lớp `server/db.js`, migrate dữ liệu `data/app.db` và cấu hình connection string trên Vercel. **Chưa thực hiện** vì yêu cầu giữ nguyên dữ liệu và không tự ý đổi kiến trúc; cần được duyệt riêng trước khi sửa.
