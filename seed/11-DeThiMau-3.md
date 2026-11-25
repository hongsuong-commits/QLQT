# ĐỀ THI MÔ PHỎNG SỐ 3 — MIS3047 *QUẢN LÝ QUY TRÌNH KINH DOANH*

> 40 câu × 0,25 điểm = 10 điểm. **75 phút.** Một đáp án đúng.
> Bộ này tập trung vào **bài tập tính thời gian**, **vòng đời BPM**, **process mining**, **KPI** và đọc sơ đồ.

---

## PHẦN I — CÂU HỎI TÌNH HUỐNG (1–28)

**Câu 1.** Một trường muốn biết "thực tế sinh viên đi qua những bước nào, mất bao lâu, chỗ nào tắc" thay vì hỏi ý kiến cán bộ. Kỹ thuật nào phù hợp nhất?

A. Phỏng vấn cán bộ
B. Process mining — khai thác nhật ký sự kiện (event log) để dựng lại quy trình thực tế
C. Vẽ BPMN theo trí nhớ
D. Khảo sát bảng hỏi

**Câu 2.** Quy trình "tuyển dụng giảng viên", "thanh toán lương", "lập kế hoạch chiến lược" lần lượt thuộc nhóm nào?

A. Core — support — management
B. Support — core — management
C. Management — support — core
D. Core — management — support

**Câu 3.** Hệ thống tự động phê duyệt khoản vay dưới 10 triệu, không có con người xem xét, chỉ ghi log để kiểm toán sau. Đây là dạng nào?

A. Human-in-the-loop
B. Human-on-the-loop
C. Human-out-of-the-loop
D. Không tự động hóa

**Câu 4.** Trường hợp nào **KHÔNG** phù hợp với RPA?

A. Nhập 10.000 hóa đơn có mẫu cố định mỗi tháng
B. Sao chép dữ liệu giữa hai hệ thống cũ không có API
C. Xử lý 20 email khiếu nại mỗi ngày, nội dung tự do, cần phán đoán
D. Đối soát bảng lương theo quy tắc cố định

**Câu 5.** Cổng XOR có hai nhánh: nhánh A xác suất 0,4 thời gian 2 ngày; nhánh B xác suất 0,6 thời gian 5 ngày. Thời gian trung bình của cổng là bao nhiêu?

A. 2 ngày
B. 3,8 ngày
C. 5 ngày
D. 7 ngày

**Câu 6.** Cổng AND có hai nhánh song song: nhánh A 3 ngày, nhánh B 5 ngày. Thời gian của cổng AND là bao nhiêu?

A. 3 ngày
B. 4 ngày
C. 5 ngày
D. 8 ngày

**Câu 7.** Một bước có xác suất phải làm lại p = 0,25. Thời gian xử lý một lần là 6 ngày. Thời gian kỳ vọng bao gồm cả làm lại là bao nhiêu?

A. 6 ngày
B. 7,5 ngày
C. 8 ngày
D. 12 ngày

**Câu 8.** Muốn mô phỏng (simulation) để so sánh các phương án thời gian, mô hình cần đạt mức nào?

A. Mức mô tả
B. Mức phân tích — có xác suất, thời gian, tài nguyên
C. Mức thực thi — bắt buộc phải có engine
D. Chỉ cần hình vẽ tay

**Câu 9.** Theo 7PMG, một mô hình nên có khoảng bao nhiêu phần tử để còn dễ hiểu?

A. Không giới hạn
B. Khoảng 30 phần tử
C. Khoảng 300 phần tử
D. Đúng 10 phần tử

**Câu 10.** Một task "Kiểm tra hồ sơ" có sự kiện biên "escalation" (viền đôi, mũi tên chéo lên). Khi sự kiện này xảy ra, điều gì khác với error boundary?

A. Không có gì khác
B. Escalation thường dùng để chuyển cấp xử lý (không nhất thiết là lỗi), còn error dùng cho lỗi thực sự; cả hai đều có thể ngắt hoặc không ngắt tùy cấu hình
C. Escalation luôn không ngắt, error luôn ngắt
D. Escalation chỉ dùng cho sự kiện kết thúc

**Câu 11.** Event-based gateway khác exclusive gateway (XOR) ở điểm nào?

A. Event-based gateway chờ một sự kiện xảy ra (message, timer, signal) rồi mới chọn nhánh; XOR chọn nhánh ngay dựa trên điều kiện dữ liệu
B. Event-based gateway chạy song song mọi nhánh
C. XOR chỉ dùng cho sự kiện
D. Không có khác biệt

**Câu 12.** Vì sao nên dùng sub-process thay vì vẽ tất cả hoạt động trên một mặt phẳng?

A. Để giảm số lượng ký hiệu trên mô hình chính, che giấu chi tiết, giúp người đọc tập trung vào luồng chính; có thể mở rộng (expand) khi cần
B. Vì BPMN bắt buộc mọi task phải nằm trong sub-process
C. Để tăng số token
D. Để tránh phải đặt tên

**Câu 13.** "IA = BPM + RPA + AI + Analytics" — thành phần nào cung cấp dữ liệu để đo lường và cải tiến?

A. BPM
B. RPA
C. AI
D. Analytics

**Câu 14.** Một trường đặt ngưỡng tin cậy 0,99 thay vì 0,95. Hệ quả kinh tế là gì?

A. Nhiều hồ sơ được tự động hóa hơn, chi phí giảm
B. Ít hồ sơ được tự động hóa hơn, nhiều hồ sơ chuyển người, chi phí kiểm tra tăng nhưng rủi ro sai giảm
C. Không thay đổi
D. AI tự động tất cả

**Câu 15.** Trong 6 thành phần kiến trúc agent, thành phần nào lưu "những gì đã xảy ra" để agent không lặp lại bước cũ?

A. Mục tiêu
B. Bộ nhớ/ngữ cảnh (memory/context)
C. Đầu ra
D. Quyền hạn

**Câu 16.** Mẫu thiết kế số 3 (AI đề xuất, người duyệt TRƯỚC khi thực hiện) khác mẫu số 4 (AI thực hiện, người kiểm tra SAU) ở điểm nào?

A. Mẫu 3 kiểm tra sau, mẫu 4 kiểm tra trước
B. Mẫu 3 có người duyệt trước khi hành động; mẫu 4 để AI hành động rồi người kiểm tra kết quả
C. Cả hai đều không có con người
D. Mẫu 3 chỉ dùng cho email

**Câu 17.** Một phòng ban tự mua công cụ no-code và xây workflow gửi dữ liệu sinh viên ra ngoài mà IT không biết. Đây là rủi ro gì?

A. Shadow IT — công cụ ngoài kiểm soát của IT
B. Deadlock
C. Lack of synchronization
D. Reward hacking

**Câu 18.** Cần chạy báo cáo tổng hợp vào 23h mỗi ngày. Nên dùng trigger nào?

A. Webhook
B. Lịch (schedule)
C. Yêu cầu người dùng
D. Sự kiện thủ công

**Câu 19.** Một workflow có thể nhận cùng một yêu cầu hai lần do hệ thống nguồn gửi lại. Cách chống trùng đúng nhất?

A. Tắt trigger
B. Dùng khóa định danh duy nhất (idempotency key) và kiểm tra đã xử lý trước khi ghi
C. Tăng thời gian chờ
D. Gửi email cảnh báo

**Câu 20.** Ba mức tích hợp AI trong workflow: mức 1 AI hỗ trợ, mức 2 AI đề xuất + người duyệt, mức 3 AI tự quyết. Với quy trình cấp học bổng có tác động tài chính lớn, nên chọn mức nào?

A. Mức 1
B. Mức 2
C. Mức 3
D. Không dùng AI

**Câu 21.** Vibe Coding (theo nghĩa gốc của Karpathy) phù hợp nhất với tình huống nào?

A. Hệ thống ngân hàng có dữ liệu tài chính nhạy cảm
B. Dự án cá nhân, nguyên mẫu nhanh, không ai phụ thuộc vào kết quả
C. Phần mềm y tế cần kiểm chứng nghiêm ngặt
D. Hệ thống điều khiển máy bay

**Câu 22.** Trong phổ C0–C5, mức C3 khác C4 ở điểm nào?

A. C3 AI tự chủ hoàn toàn, C4 con người làm tay
B. C3 AI thực thi có kiểm chứng từng bước; C4 con người chỉ đạo ở mức mục tiêu, AI tự lập kế hoạch và thực thi
C. C3 không dùng AI
D. C4 chỉ dùng cho văn bản

**Câu 23.** Một mô hình BPMN có nhánh ngoại lệ "thiếu chứng chỉ ngoại ngữ". Nhánh này hữu ích nhất cho việc gì khi xây ứng dụng?

A. Tăng số dòng mã
B. Làm đẹp tài liệu
C. Sinh ca kiểm thử cho tình huống thiếu chứng chỉ, đảm bảo ứng dụng xử lý đúng
D. Giảm số commit

**Câu 24.** Bước E trong khung IDEA có bao nhiêu nguyên tắc?

A. 3
B. 5
C. 6
D. 7

**Câu 25.** Ba chế độ làm việc với AI Coding CLI thường gồm những gì?

A. Chat — Plan — Execute
B. Đọc — Ghi — Xóa
C. Xanh — Đỏ — Vàng
D. Một chế độ duy nhất

**Câu 26.** Hiện tượng "sửa lỗi này sinh lỗi khác, lặp lại nhiều vòng, ngữ cảnh ngày càng rối" là mẫu nào?

A. F2 — giả định ngầm
B. F6 — doom loop
C. F9 — lỗ hổng bảo mật
D. F12 — bào mòn kỹ năng

**Câu 27.** F9 (lỗ hổng bảo mật) thường gồm những nhóm nào?

A. Lỗi cú pháp, lỗi chính tả, lỗi font
B. Lỗi logic để trống (stub), injection, lộ khóa bí mật, thiếu kiểm tra quyền phía máy chủ
C. Lỗi giao diện, lỗi màu sắc
D. Lỗi mạng, lỗi điện

**Câu 28.** Hai tiêu chí "hoàn thành" hay bị bỏ sót nhất trong đồ án là gì?

A. Chạy được và có giao diện
B. Có báo cáo và có slide
C. Giải thích được diff (tiêu chí 3) và người khác chạy được theo README (tiêu chí 6)
D. Có màu sắc và có logo

---

## PHẦN II — ĐỌC SƠ ĐỒ BPMN (29–40)

### Sơ đồ 1 — XOR ba nhánh

```
Start ─► [Phân loại] ─► X ─┬─ (loại A, p=0,5, 1 ngày) ─► [Xử lý A] ─► X
                            ├─ (loại B, p=0,3, 2 ngày) ─► [Xử lý B] ─┤
                            └─ (loại C, p=0,2, 4 ngày) ─► [Xử lý C] ─┘
                                                                      │
                                                              [Hoàn tất] ─► End
```

**Câu 29.** Sau cổng gộp XOR, có bao nhiêu token đi tiếp?

A. 1 token
B. 2 token
C. 3 token
D. 0 token

**Câu 30.** Thời gian trung bình từ cổng tách đến cổng gộp là bao nhiêu?

A. 1 ngày
B. 1,9 ngày
C. 2,3 ngày
D. 4 ngày

### Sơ đồ 2 — AND ba nhánh

```
Start ─► [Nhận hồ sơ] ─► + ─┬─ [Kiểm tra A] ─► +
                              ├─ [Kiểm tra B] ─► +
                              └─ [Kiểm tra C] ─► +
                                                 │
                                         [Tổng hợp] ─► End
```

**Câu 31.** Có bao nhiêu token đi vào cổng gộp AND và bao nhiêu token đi ra?

A. 1 vào, 1 ra
B. 3 vào, 1 ra
C. 3 vào, 3 ra
D. 1 vào, 3 ra

**Câu 32.** Nếu thay cổng gộp AND bằng XOR, hiện tượng gì xảy ra?

A. Bế tắc
B. Không có gì thay đổi
C. Chỉ một nhánh chạy
D. Đồng bộ thiếu — ba token cùng đi tiếp, "Tổng hợp" chạy ba lần

### Sơ đồ 3 — XOR tách, AND gộp

```
Start ─► [Kiểm tra] ─► X ─┬─ (đạt) ─► [Duyệt] ─► +
                            └─ (không đạt) ─► [Từ chối] ─► +
                                                          │
                                                  [Lưu hồ sơ] ─► End
```

**Câu 33.** Chẩn đoán sơ đồ?

A. Bế tắc — XOR chỉ ra một token, AND gộp chờ đủ hai
B. Đồng bộ thiếu
C. Không lỗi
D. Lỗi cú pháp

**Câu 34.** Cách sửa đúng?

A. Đổi cổng tách thành AND
B. Bỏ cổng gộp
C. Đổi cổng gộp thành XOR (vì mỗi lần chỉ một nhánh được chọn)
D. Thêm một cổng AND nữa

### Sơ đồ 4 — AND tách, XOR gộp

```
Start ─► [Nhận] ─► + ─┬─ [Tính phí] ─► X
                        └─ [Gửi mail] ─► X
                                         │
                                 [Ghi sổ] ─► End
```

**Câu 35.** Chẩn đoán sơ đồ?

A. Bế tắc
B. Đồng bộ thiếu — hai token cùng đi qua XOR, "Ghi sổ" chạy hai lần
C. Không lỗi
D. Lỗi cú pháp

**Câu 36.** Cách sửa đúng?

A. Đổi cổng tách thành XOR
B. Bỏ một nhánh
C. Thêm sự kiện kết thúc
D. Đổi cổng gộp thành AND

### Sơ đồ 5 — Transaction và cancel end

```
╔══════════════════════════════════════════════╗
║ Start ─► [Trừ tiền] ─► [Cấp học bổng] ─► End ║
║            │                                 ║
║            └─► (X) cancel ─► [Hoàn tiền] ─► End
╚══════════════════════════════════════════════╝
```

**Câu 37.** Sự kiện cancel end (X) trong transaction có tác dụng gì?

A. Hủy toàn bộ transaction và kích hoạt compensation cho các bước đã hoàn thành
B. Chỉ kết thúc nhánh hiện tại
C. Khởi động lại transaction
D. Gửi email thông báo

**Câu 38.** Thứ tự chạy compensation khi hủy transaction?

A. Cùng thứ tự thực hiện
B. Ngẫu nhiên
C. Ngược thứ tự thực hiện
D. Song song tất cả

### Sơ đồ 6 — Pool, lane, data store

```
┌─────────────────────────────────────────────┐
│ PHÒNG ĐÀO TẠO                               │
│ ┌─────────────────────────────────────────┐ │
│ │ LANE: TIẾP NHẬN                         │ │
│ │ [Nhận hồ sơ] ─► [Kiểm tra]              │ │
│ ├─────────────────────────────────────────┤ │
│ │ LANE: XÉT DUYỆT                         │ │
│ │ [Họp hội đồng] ─► [Ra quyết định]       │ │
│ └─────────────────────────────────────────┘ │
│              │                              │
│        [(data store)] Hồ sơ                 │
└─────────────────────────────────────────────┘
```

**Câu 39.** Lane khác pool ở điểm nào?

A. Lane là một tổ chức độc lập; pool là một phòng ban
B. Lane là phân vùng bên trong pool (cùng một tổ chức); pool là một bên tham gia độc lập
C. Lane chỉ dùng cho dữ liệu
D. Không có khác biệt

**Câu 40.** Ký hiệu hình trụ "(data store)" dùng để làm gì?

A. Biểu diễn một task
B. Biểu diễn một cổng
C. Biểu diễn một sự kiện
D. Biểu diễn dữ liệu lưu trữ lâu dài, có thể được nhiều hoạt động đọc/ghi

---

## ĐÁP ÁN VÀ GIẢI THÍCH

| Câu | Đáp án | Giải thích ngắn |
|---|---|---|
| 1 | B | Process mining dựng lại quy trình thực tế từ event log. |
| 2 | A | Tuyển dụng = core; lương = support; chiến lược = management. |
| 3 | C | Không có con người trong vòng quyết định = out-of-the-loop. |
| 4 | C | Nội dung tự do, cần phán đoán → không đủ 7 điều kiện RPA. |
| 5 | B | XOR = 0,4×2 + 0,6×5 = 0,8 + 3 = 3,8 ngày. |
| 6 | C | AND = max(3, 5) = 5 ngày. |
| 7 | C | T/(1−p) = 6/0,75 = 8 ngày. |
| 8 | B | Mô phỏng cần xác suất, thời gian, tài nguyên → mức phân tích. |
| 9 | B | 7PMG G7 khuyến nghị khoảng 30 phần tử. |
| 10 | B | Escalation để chuyển cấp xử lý; error cho lỗi; cả hai có thể ngắt/không ngắt. |
| 11 | A | Event-based gateway chờ sự kiện; XOR chọn theo điều kiện dữ liệu. |
| 12 | A | Sub-process giảm phần tử trên mô hình chính, che chi tiết, mở rộng khi cần. |
| 13 | D | Analytics cung cấp đo lường, phân tích, cải tiến. |
| 14 | B | Ngưỡng cao hơn → ít tự động, nhiều người kiểm tra, rủi ro thấp hơn. |
| 15 | B | Bộ nhớ/ngữ cảnh lưu lịch sử để tránh lặp bước. |
| 16 | B | Mẫu 3 duyệt trước; mẫu 4 kiểm tra sau. |
| 17 | A | Công cụ ngoài kiểm soát IT = Shadow IT. |
| 18 | B | Báo cáo định kỳ 23h → trigger lịch. |
| 19 | B | Idempotency key + kiểm tra đã xử lý. |
| 20 | B | Tác động tài chính lớn → mức 2 (AI đề xuất, người duyệt). |
| 21 | B | Vibe Coding gốc phù hợp nguyên mẫu cá nhân, không phụ thuộc. |
| 22 | B | C3 kiểm chứng từng bước; C4 con người chỉ đạo mục tiêu. |
| 23 | C | Nhánh ngoại lệ sinh ca kiểm thử. |
| 24 | B | Bước E có 5 nguyên tắc. |
| 25 | A | Chat — Plan — Execute. |
| 26 | B | Sửa lỗi sinh lỗi, lặp vòng = F6 doom loop. |
| 27 | B | Bốn nhóm: stub, injection, lộ khóa, thiếu kiểm tra quyền. |
| 28 | C | Tiêu chí 3 và 6 hay bỏ sót, bị kiểm tra khi bảo vệ. |
| 29 | A | XOR gộp không chờ; chỉ một nhánh được kích hoạt → 1 token. |
| 30 | B | 0,5×1 + 0,3×2 + 0,2×4 = 0,5 + 0,6 + 0,8 = 1,9 ngày. |
| 31 | B | AND tách sinh 3 token; AND gộp chờ đủ 3 rồi hợp nhất thành 1. |
| 32 | D | AND tách + XOR gộp = đồng bộ thiếu, 3 token đi tiếp. |
| 33 | A | XOR tách + AND gộp = bế tắc. |
| 34 | C | Đổi gộp thành XOR vì mỗi lần chỉ một nhánh. |
| 35 | B | AND tách + XOR gộp = đồng bộ thiếu. |
| 36 | D | Đổi gộp thành AND để chờ đủ hai nhánh. |
| 37 | A | Cancel end hủy transaction, kích hoạt compensation. |
| 38 | C | Compensation chạy ngược thứ tự. |
| 39 | B | Lane trong pool; pool là bên tham gia độc lập. |
| 40 | D | Data store = dữ liệu lưu trữ lâu dài. |

---

*Hết đề số 3. Tiếp theo: `12-DeThiMau-4.md`.*
