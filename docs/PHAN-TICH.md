# Sổ Đề — Phân tích, kiến trúc và đặc tả

Ứng dụng luyện đề trắc nghiệm cho MIS3047, dùng bốn bộ đề mẫu có sẵn trong `on-tap/`.
Tài liệu này được viết **trước khi lập trình** và là căn cứ cho phần cài đặt.

## 1. Mục tiêu và phạm vi

Người học cần một vòng luyện tập trọn vẹn:

1. Chọn một đề mẫu 40 câu, làm bài trong giao diện tập trung.
2. Đánh dấu cờ những câu muốn xem lại — độc lập hoàn toàn với việc đã trả lời hay chưa.
3. Nộp bài sau khi xác nhận số câu đã làm / chưa làm.
4. Được chấm điểm tự động phía máy chủ và xem lại **toàn bộ** câu hỏi.
5. Với câu sai hoặc chưa làm, đọc giải thích do AI tạo, **chỉ dựa trên tài liệu ôn tập đã liên kết**.
6. Mở lại bất kỳ lần làm bài cũ nào, kèm nguyên văn câu hỏi, đáp án, cờ và giải thích đã lưu.

Ngoài phạm vi: tạo đề lần hai, sinh câu hỏi mới sau khi nộp, chấm điểm bằng dữ liệu giả,
hoặc thay đổi đáp án chính thức của đề gốc.

## 2. Tác nhân và ca sử dụng

Chỉ một tác nhân: **người học** (đồng thời là người quản lý đề và tài liệu của mình).

| Nhóm | Ca sử dụng |
|---|---|
| Đề thi | Tạo đề thủ công; nhập từ PDF/DOCX/văn bản; sửa; xóa; liên kết tài liệu; xem danh sách |
| Tài liệu | Tải PDF/DOCX/TXT; nhập trực tiếp; xem nội dung; xóa; xem tài liệu nào đang liên kết đề nào |
| Làm bài | Bắt đầu; chọn/đổi đáp án; câu trước/câu sau; nhảy theo phiếu trả lời; bật/tắt cờ; nộp bài có xác nhận |
| Kết quả | Xem điểm, số đúng/sai/chưa làm, tỷ lệ, thời gian; mở phần xem lại |
| Xem lại | Xem toàn bộ câu hỏi; đối chiếu đáp án người chọn và đáp án chính thức; xem cờ; lọc; xin giải thích AI |
| Lịch sử | Xem các lần làm bài; mở lại kết quả và phần giải thích cũ |

## 3. Kiến trúc hệ thống

```
┌──────────────────────────── Trình duyệt ────────────────────────────┐
│  React SPA (Vite)                                                    │
│  Tổng quan · Đề thi · Soạn đề · Tài liệu · Làm bài · Kết quả ·      │
│  Xem lại · Lịch sử                                                   │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ JSON /api  (không có khóa AI)
┌───────────────────────────────▼──────────────────────────────────────┐
│  Express 5 (Node)                                                    │
│  ├─ routes/exams       CRUD đề + câu hỏi + liên kết tài liệu         │
│  ├─ routes/documents   tải lên, trích văn bản, chia đoạn, xóa         │
│  ├─ routes/attempts    bắt đầu, nộp bài, chấm điểm, lịch sử           │
│  ├─ routes/ai          truy xuất tài liệu + gọi nhà cung cấp AI       │
│  └─ lib/extract        PDF (pdfjs-dist), DOCX (mammoth), TXT/MD       │
│                                                                      │
│  SQLite (node:sqlite, WAL)      Tệp .env (khóa AI chỉ ở máy chủ)      │
└───────────────┬───────────────────────────────┬──────────────────────┘
                │                               │
        data/app.db (bền vững)          HTTPS tới API nhà cung cấp AI
                                                 (OpenAI-compatible)
```

- **Frontend và backend tách biệt**: Vite build ra `client/dist`; Express phục vụ tệp tĩnh và API.
- **Cơ sở dữ liệu thật**: SQLite lưu đề, câu hỏi, tài liệu, đoạn tài liệu, phiên làm bài,
  lần nộp, ảnh chụp câu hỏi và giải thích AI.
- **AI chỉ ở server**: khóa đọc từ biến môi trường `AI_API_KEY`, không bao giờ gửi xuống trình duyệt.
- **Không phụ thuộc dịch vụ ngoài để chạy**: trừ lần gọi AI, mọi thứ chạy cục bộ.

## 4. Mô hình dữ liệu

Các bảng chính (khóa ngoại bật, xóa theo tầng hợp lý):

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `exams` | id, title, subject, topic, description, duration_minutes, created_at, updated_at | Đề mẫu |
| `questions` | id, exam_id, position, content, option_a…d, correct_option | `position` duy nhất trong đề; đáp án chỉ A–D |
| `documents` | id, title, source_type, filename, mime, size, text, char_count, created_at | Văn bản đã trích |
| `document_chunks` | id, document_id, idx, heading, content, token_count | Đơn vị truy xuất cho AI |
| `exam_documents` | exam_id, document_id | Nhiều tài liệu cho một đề |
| `attempt_sessions` | id, exam_id, started_at, questions_json, document_ids_json | Phiên đang làm; ảnh chụp câu hỏi lúc bắt đầu |
| `attempts` | id, exam_id (nullable), exam_title, subject, topic, total_questions, started_at, submitted_at, duration_seconds, score, correct_count, wrong_count, unanswered_count, accuracy, document_ids | Lần nộp; đề bị xóa vẫn giữ lịch sử |
| `attempt_questions` | attempt_id, position, question_id, content, option_a…d, correct_option, user_option, status, flagged | Ảnh chụp nguyên văn câu hỏi và đáp án tại lúc nộp |
| `explanations` | attempt_id, position, sufficient, message, why_wrong, why_correct, knowledge, summary, sources_json, model, created_at | Giải thích AI đã lưu, mở lại lịch sử vẫn còn |

Ràng buộc quan trọng:

- `attempt_questions.status ∈ {correct, wrong, unanswered}` được **tính từ đáp án**, không từ cờ.
- `flagged` là cờ boolean riêng; cờ không bao giờ đổi `status` hay `user_option`.
- `correct_option` trong ảnh chụp là bất biến; API giải thích không có trường ghi đè đáp án.
- `questions.position` và `attempt_questions.position` bắt đầu từ 1, liên tục 1…N.

## 5. Luồng hoạt động

### 5.1 Nhập đề

```
Người dùng chọn tệp PDF/DOCX hoặc dán văn bản
        │
        ▼
POST /api/imports/exam  → trích văn bản → bộ phân tích câu hỏi
        │                                   (Câu N + A/B/C/D + bảng đáp án)
        ▼
Xem trước: số câu, cảnh báo, câu thiếu đáp án
        │  người dùng đặt tên môn/chủ đề, bổ sung đáp án thiếu
        ▼
POST /api/exams  → ghi đề + câu hỏi + liên kết tài liệu trong một transaction
```

Nếu tệp không phân tích được thành câu hỏi, hệ thống trả văn bản đã trích và cảnh báo để người dùng
dùng trình soạn thủ công; **không tự bịa câu hỏi hay đáp án**.

### 5.2 Nhập tài liệu

```
PDF/DOCX/TXT hoặc văn bản dán
  → trích văn bản (PDF theo tọa độ dòng; DOCX thô; TXT UTF-8)
  → chuẩn hóa, chia đoạn theo tiêu đề markdown và độ dài ~1.100 ký tự
  → lưu documents + document_chunks
```

Tài liệu được liên kết với đề ở trang soạn đề. Một đề có thể dùng nhiều tài liệu.

### 5.3 Làm bài và chấm điểm

```
POST /api/attempts/start {examId}
  → máy chủ chụp câu hỏi (bỏ correct_option) vào attempt_sessions
  → trả attemptId + câu hỏi + startedAt

Trình duyệt giữ answers {position: "A"} và flags [position]
  → cờ và đáp án là hai tập độc lập

POST /api/attempts/:id/submit {answers, flags}
  → máy chủ đọc phiên, so đáp án gốc, tính:
       status = unanswered | correct | wrong
       score  = round(correct / total × 10, 2)
       accuracy = round(correct / total × 100, 1)
       duration = submitted_at − started_at
  → ghi attempts + attempt_questions, xóa phiên
  → trả attemptId để mở trang kết quả
```

Chấm điểm **chỉ ở server**; frontend không nhận đáp án đúng trong lúc làm bài.

### 5.4 Giải thích bằng AI

```
POST /api/attempts/:id/explanations/:position
  → kiểm tra câu này sai hoặc chưa làm (câu đúng: 400, không cần giải thích)
  → lấy tài liệu đã liên kết với đề lúc nộp
  → BM25 trên các đoạn tài liệu với truy vấn = câu hỏi + 4 phương án + đáp án đúng
  → 6 đoạn liên quan nhất (kèm tên tài liệu, tiêu đề mục)
  → gọi API AI (OpenAI-compatible) với prompt tiếng Việt, temperature thấp, JSON
  → kiểm tra JSON; nếu thiếu căn cứ, trả đúng câu:
     "Tài liệu ôn tập chưa cung cấp đủ thông tin để giải thích câu hỏi này"
  → lưu explanations + nguồn; trả về frontend
```

Nguyên tắc prompt:

- Đáp án chính thức do hệ thống cung cấp và **không được thay đổi**; schema phản hồi không có trường đáp án.
- Chỉ dùng các đoạn trích; không dùng kiến thức nền ngoài tài liệu.
- Tách rõ: đáp án chính thức (do đề) / giải thích AI (do mô hình).
- Nếu không đủ căn cứ, `sufficient=false` và đúng một câu thông báo bắt buộc.

### 5.5 Lịch sử

Mỗi lần nộp lưu ảnh chụp câu hỏi, đáp án người chọn, trạng thái từng câu, cờ, thời gian, điểm
và các giải thích AI đã tạo. Sửa hoặc xóa đề sau đó không làm thay đổi lịch sử.

## 6. Công thức và quy ước hiển thị

- `Tổng câu = N`
- `Đúng = C`, `Sai = W` (đã chọn nhưng sai), `Chưa làm = U`; `C + W + U = N`
- `Điểm = C / N × 10`, làm tròn 2 chữ số thập phân
- `Tỷ lệ chính xác = C / N × 100`, làm tròn 1 chữ số thập phân
- Câu chưa làm **không được cộng điểm** (tính như sai khi tính điểm) nhưng hiển thị riêng.
- Thời gian = giây giữa bắt đầu và nộp, hiển thị `mm phút ss giây` (hoặc `ss giây`).
- Điểm hiển thị theo tiếng Việt: dấu phẩy thập phân (`7,75`), số câu là số nguyên.

## 7. API

| Phương thức | Đường dẫn | Chức năng |
|---|---|---|
| GET | `/api/health` | Trạng thái máy chủ, DB, AI đã cấu hình hay chưa |
| GET | `/api/ai/status` | Nhà cung cấp + model + đã cấu hình (không trả khóa) |
| GET | `/api/home` | Thống kê, đề, lần làm gần đây |
| GET/POST | `/api/exams` | Danh sách / tạo đề |
| GET/PUT/DELETE | `/api/exams/:id` | Chi tiết / cập nhật / xóa đề |
| POST | `/api/imports/exam` | Trích + phân tích đề từ tệp hoặc văn bản (chưa ghi DB) |
| GET/POST | `/api/documents` | Danh sách / tạo tài liệu từ văn bản |
| GET/DELETE | `/api/documents/:id` | Nội dung đầy đủ / xóa |
| POST | `/api/imports/document` | Trích văn bản từ tệp (chưa ghi DB) |
| POST | `/api/attempts/start` | Bắt đầu phiên làm bài |
| GET | `/api/attempts/sessions/:id` | Khôi phục phiên sau khi tải lại trang |
| POST | `/api/attempts/:id/submit` | Nộp và chấm điểm |
| GET | `/api/attempts` | Lịch sử |
| GET | `/api/attempts/:id` | Chi tiết lần làm + giải thích đã lưu |
| POST | `/api/attempts/:id/explanations/:position` | Tạo giải thích AI cho câu sai/chưa làm |

Mã lỗi: 400 dữ liệu không hợp lệ, 404 không tìm thấy, 409 xung đột trạng thái,
413 tệp quá lớn, 415 định dạng không hỗ trợ, 422 không trích được nội dung,
503 AI chưa cấu hình / nhà cung cấp lỗi. Mọi lỗi trả `{ error: "..." }` bằng tiếng Việt.

## 8. Bảo mật và xử lý lỗi

- Khóa AI chỉ đọc từ `.env` phía máy chủ; API trạng thái chỉ trả boolean, tên model và host.
- Tệp tải lên giới hạn 15 MB; chỉ nhận `.pdf`, `.docx`, `.txt`, `.md`; lưu trong bộ nhớ rồi trích,
  không phục vụ tệp thô qua HTTP.
- Tên tệp được hiển thị dưới dạng văn bản (React tự escape); không dùng làm đường dẫn.
- Mọi đầu vào được kiểm tra độ dài, số câu (1–200), đáp án A–D, vị trí câu hợp lệ.
- Chấm điểm và ảnh chụp câu hỏi ở server; frontend không thể sửa điểm.
- Lỗi trích PDF scan, DOCX hỏng, tệp rỗng, AI thiếu khóa, AI quá thời gian, JSON sai:
  hiển thị tại đúng khối bị lỗi, kèm nút thử lại; không nuốt lỗi thành dữ liệu giả.
- Ghi DB trong transaction cho tạo đề, nộp bài, lưu giải thích.

## 9. Giao diện

Bảy màn hình: Tổng quan, Đề thi, Soạn đề, Tài liệu, Làm bài, Kết quả, Xem lại, Lịch sử (Soạn đề là
màn hình con của Đề thi).

Hướng thị giác: **Achromatic ledger** — nền giấy rất nhạt, chữ mực, một xanh duy nhất cho dữ liệu
chính (tiến độ, ô hiện tại), xanh lá/đỏ/xám/cam chỉ dành cho trạng thái kết quả và cờ. Geist cho chữ,
Geist Mono cho mọi con số (nếu thiếu glyph tiếng Việt, thay bằng IBM Plex Sans + Plex Mono và ghi rõ).
Chi tiết: phẳng, viền 1px, không bóng ở trạng thái nghỉ, bán kính 8/6.

Điểm nhận diện riêng: **phiếu trả lời** — lưới số câu 5×8, có trạng thái đã làm/chưa làm/cờ, dùng lại
ở trang làm bài, kết quả, xem lại và tổng quan. Mỗi màn hình trả lời một câu hỏi:

| Màn hình | Câu hỏi | Khối lớn nhất |
|---|---|---|
| Tổng quan | Hôm nay nên làm đề nào? | Danh sách đề + phiếu trả lời thu nhỏ của lần gần nhất |
| Đề thi | Bộ đề nào đang có, sửa hay làm? | Bảng đề |
| Soạn đề | Nội dung đề có đúng nguyên bản? | Danh sách câu hỏi có thể sửa |
| Tài liệu | AI có căn cứ nào để giải thích? | Danh sách tài liệu + số ký tự |
| Làm bài | Câu này tôi chọn gì, còn câu nào chưa làm? | Câu hỏi + phiếu trả lời |
| Kết quả | Tôi được bao nhiêu, sai chỗ nào? | Điểm + phiếu trả lời đã tô |
| Xem lại | Vì sao câu này sai? | Từng câu + đáp án + giải thích AI |
| Lịch sử | Tôi đã tiến bộ chưa? | Bảng các lần làm |

Trạng thái:

- Đã trả lời: ô phiếu nền mực; chưa trả lời: ô trắng viền; hiện tại: viền xanh 2px.
- Cờ: tam giác cam ở góc ô, **giữ nguyên** dù câu đã làm hay chưa.
- Kết quả: đúng nền xanh lá nhạt, sai nền đỏ nhạt, chưa làm nền xám; cờ cam.
- Trong phần xem lại, đáp án chính thức luôn có nhãn "Đáp án chính thức"; lựa chọn của người học
  có nhãn "Bạn đã chọn"; hai nhãn có thể cùng xuất hiện trên một phương án.

Điện thoại: sidebar thu thành thanh trên 56px + ngăn kéo toàn màn hình; phiếu trả lời thành ngăn kéo
mở bằng nút "Phiếu trả lời"; không che câu hỏi đang đọc; bảng chuyển thành danh sách hai dòng.

## 10. Kiểm thử

Kiểm thử tự động (Node test runner):

1. Bộ phân tích đọc đúng 40 câu và 40 đáp án từ đề mẫu 08.
2. Chấm điểm: đúng/sai/chưa làm, điểm, tỷ lệ, thời gian; cờ không ảnh hưởng trạng thái.
3. Ảnh chụp lịch sử: sửa đề sau khi nộp không đổi câu hỏi/đáp án trong lần làm cũ.
4. Truy xuất BM25 trả đoạn chứa khái niệm của câu hỏi.
5. Gọi AI qua một máy chủ giả lập tương thích OpenAI: lưu giải thích, nguồn; nhánh thiếu căn cứ trả
   đúng câu bắt buộc; câu đúng bị từ chối giải thích.
6. API: tạo đề, bắt đầu, nộp, đọc lịch sử; kiểm tra đáp án đúng không lộ trong payload làm bài.

Kiểm thử giao diện: build production, chạy inspector của taste-design ở 1440/768/390, mở toàn bộ
ảnh chụp, sửa mọi FAIL.

## 11. Cấu hình

`.env` (máy chủ):

```
PORT=3000
AI_BASE_URL=https://api.openai.com/v1
AI_API_KEY=
AI_MODEL=gpt-4o-mini
AI_TIMEOUT_MS=90000
```

Ví dụ nhà cung cấp tương thích OpenAI:

| Nhà cung cấp | AI_BASE_URL | AI_MODEL |
|---|---|---|
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Google Gemini | `https://generativelanguage.googleapis.com/v1beta/openai/` | `gemini-2.0-flash` |
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenRouter | `https://openrouter.ai/api/v1` | model trên OpenRouter |
| Ollama (cục bộ) | `http://localhost:11434/v1` | model đã kéo |

Không có khóa: ứng dụng vẫn dùng được mọi chức năng khác; nút giải thích AI báo "AI chưa được cấu hình".
