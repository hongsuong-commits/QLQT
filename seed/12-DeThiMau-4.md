# ĐỀ THI MÔ PHỎNG SỐ 4 — MIS3047 *QUẢN LÝ QUY TRÌNH KINH DOANH*

> 40 câu × 0,25 điểm = 10 điểm. **75 phút.** Một đáp án đúng.
> Bộ này tập trung vào **AI/agentic coding**, **bảo mật**, **kiểm thử**, **12 mẫu thất bại** và đọc sơ đồ.

---

## PHẦN I — CÂU HỎI TÌNH HUỐNG (1–28)

**Câu 1.** Một trường mở "chiến dịch tuyển sinh 2027" có ngân sách, thời hạn, đội riêng; kết thúc chiến dịch thì giải tán đội. Đây là gì?

A. Quy trình nghiệp vụ
B. Dự án
C. Thủ tục
D. Chức năng

**Câu 2.** Hệ thống tự quyết định cấp học bổng, tự gửi thông báo, tự cập nhật tài chính, con người chỉ kiểm tra khi có khiếu nại. Theo A0–A5, đây là mức nào?

A. A2
B. A3
C. A4
D. A5 — tự trị

**Câu 3.** Giai đoạn nào của vòng đời BPM sử dụng dữ liệu nhật ký để phát hiện quy trình thực tế khác mô hình?

A. Khám phá
B. Mô hình hóa
C. Giám sát (monitoring) / process mining
D. Cải tiến liên tục

**Câu 4.** Trường hợp nào RPA **không** phù hợp?

A. Giao diện hệ thống thay đổi liên tục mỗi tháng
B. Hệ thống cũ không có API
C. Quy tắc xử lý cố định
D. Khối lượng giao dịch lớn

**Câu 5.** Mô hình BPMN đúng cú pháp, chạy đúng ngữ nghĩa, nhưng người đọc không hiểu vì quá nhiều ký hiệu và tên viết tắt. Tiêu chí nào bị vi phạm?

A. Cú pháp
B. Ngữ nghĩa
C. Dễ hiểu (pragmatics)
D. Hiệu năng

**Câu 6.** Cổng XOR tách thành hai nhánh. Ở thời điểm token đi qua cổng, có bao nhiêu token được sinh ra?

A. 0
B. 1
C. 2
D. 3

**Câu 7.** Một cổng event-based có hai sự kiện: nhận thông điệp xác nhận và đồng hồ 7 ngày. Điều gì xảy ra?

A. Cả hai sự kiện đều phải xảy ra
B. Sự kiện nào đến trước sẽ kích hoạt nhánh đó; nhánh còn lại không chạy
C. Luôn chạy nhánh đồng hồ
D. Cổng không hợp lệ

**Câu 8.** Sự kiện kết thúc "terminate" khác sự kiện kết thúc thường ở điểm nào?

A. Terminate kết thúc toàn bộ process instance ngay lập tức; end thường chỉ kết thúc nhánh hiện tại
B. Terminate chỉ dùng cho sự kiện bắt đầu
C. End thường kết thúc toàn bộ, terminate chỉ kết thúc nhánh
D. Không khác nhau

**Câu 9.** Một quy trình được nhiều quy trình khác gọi lại và cần cập nhật phiên bản độc lập. Nên dùng gì?

A. Sub-process nhúng
B. Call activity — quy trình được định nghĩa riêng, có thể quản lý phiên bản
C. Event sub-process
D. Transaction

**Câu 10.** Một quy trình có 25% hồ sơ phát sinh ngoại lệ. Kết luận nào đúng?

A. Vẫn ổn vì dưới 50%
B. Vượt ngưỡng tham khảo ~20% → nên xem lại thiết kế quy trình trước khi mô hình hóa từng ngoại lệ
C. Phải bỏ hết ngoại lệ
D. Phải chuyển sang RPA

**Câu 11.** Một hệ thống AI đề xuất hành động, nhưng con người phải bấm "đồng ý" trước khi hệ thống thực hiện. Đây là mức tự chủ nào?

A. Mức 1 — người làm tất cả
B. Mức 2 — AI đề xuất, người quyết định
C. Mức 3 — AI tự quyết, người giám sát
D. Mức 4 — AI tự trị hoàn toàn

**Câu 12.** Một agent có quyền đọc cơ sở dữ liệu và quyền gửi email. Nguyên tắc an toàn nào nên áp dụng?

A. Cấp cả hai quyền mặc định
B. Tách quyền: chỉ đọc là mặc định, quyền gửi email chỉ bật khi thật cần và có kiểm soát
C. Cấp quyền quản trị viên
D. Không cần phân quyền

**Câu 13.** Ngưỡng tin cậy 0,95 có ý nghĩa gì?

A. AI chỉ xử lý khi độ tin cậy đạt ít nhất 0,95; dưới ngưỡng thì chuyển người
B. AI luôn đúng 95%
C. AI chỉ sai 5%
D. AI không cần kiểm tra

**Câu 14.** Mẫu thiết kế số 6 (AI tự trị có giám sát) yêu cầu tối thiểu mấy điều kiện bắt buộc?

A. 2
B. 3
C. 4
D. 6

**Câu 15.** Mẫu thiết kế nào phù hợp với tình huống "AI đề xuất, con người duyệt TRƯỚC khi hành động"?

A. Mẫu 1
B. Mẫu 2
C. Mẫu 3
D. Mẫu 5

**Câu 16.** Hạn chế nào của no-code thường gặp nhất?

A. Không thể xây giao diện phức tạp, khó kiểm soát logic phức tạp và phụ thuộc nhà cung cấp
B. Không thể kết nối API
C. Không thể chạy trên cloud
D. Không thể dùng cho quy trình đơn giản

**Câu 17.** Một node nhận mảng 30 bản ghi và node sau là "Gửi một email tổng hợp". Kết quả?

A. Gửi 1 email
B. Gửi 30 email — vì node xử lý theo item; phải gộp trước khi gửi
C. Không gửi được
D. Gửi 0 email

**Câu 18.** Cần nhận dữ liệu ngay khi có sinh viên đăng ký từ website. Nên dùng gì?

A. Polling mỗi giờ
B. Webhook
C. Chạy tay
D. Lịch cuối ngày

**Câu 19.** Đầu ra của AI cần có trường `loai` và `do_tin_cay` để workflow xử lý tiếp. Cách đúng?

A. Yêu cầu AI trả lời tự do
B. Định nghĩa JSON schema, yêu cầu AI trả đúng cấu trúc, kiểm tra schema trước khi dùng
C. Dùng biểu thức chính quy để đoán
D. Không cần kiểm tra

**Câu 20.** Bốn nhóm chỉ số đo hiệu quả tự động hóa gồm những gì?

A. Màu sắc, font, bố cục, logo
B. Hiệu năng, độ tin cậy, chi phí, tác động nghiệp vụ
C. Số dòng mã, số file, số thư mục, số commit
D. Số người, số máy, số điện thoại, số email

**Câu 21.** Trong phổ C0–C5, mức C5 có nghĩa là gì?

A. Không dùng AI
B. AI gợi ý từng dòng
C. AI tự vận hành hoàn toàn, con người chỉ đặt mục tiêu và giám sát cấp cao
D. AI chỉ dùng để viết báo cáo

**Câu 22.** "Vấn đề 70%" trong Chương 5 nói về điều gì?

A. 70% thời gian dành cho việc viết prompt
B. 30% cuối (biên, bảo mật, hiệu năng, tích hợp) thường bị bỏ qua sau khi nguyên mẫu chạy
C. 70% mã do AI viết
D. 70% lỗi đến từ Git

**Câu 23.** Vì sao ngoại lệ trong mô hình BPMN là nguồn sinh ca kiểm thử tốt?

A. Vì ngoại lệ hiếm khi xảy ra
B. Vì mỗi nhánh ngoại lệ là một tình huống cụ thể cần được kiểm chứng
C. Vì ngoại lệ không cần kiểm thử
D. Vì ngoại lệ chỉ dành cho hệ thống cũ

**Câu 24.** Bước A trong khung IDEA có bao nhiêu nhóm?

A. 3
B. 5
C. 6
D. 12

**Câu 25.** Vì sao nên dùng plan mode trước khi cho agent sửa nhiều tệp?

A. Vì plan mode chạy nhanh hơn
B. Vì sửa một kế hoạch sai tốn 1 phút, còn sửa 20 tệp sai tốn cả buổi
C. Vì plan mode không cần đọc mã
D. Vì plan mode tự động commit

**Câu 26.** Prompt quá chung chung, AI trả lời lan man, sửa chỗ này hỏng chỗ kia. Đây là mẫu nào?

A. F1 — prompt mơ hồ, phạm vi quá lớn
B. F9 — lỗ hổng bảo mật
C. F12 — bào mòn kỹ năng
D. F8 — thiếu Git

**Câu 27.** Một ứng dụng ẩn nút "Xóa" với người dùng thường nhưng API không kiểm tra quyền. Đây là lỗ hổng nào?

A. Lộ khóa bí mật
B. Thiếu kiểm tra quyền phía máy chủ
C. SQL injection
D. Logic để trống

**Câu 28.** Đồ án yêu cầu tối thiểu bao nhiêu commit?

A. 5
B. 10
C. 15
D. 50

---

## PHẦN II — ĐỌC SƠ ĐỒ BPMN (29–40)

### Sơ đồ 1 — XOR tách và XOR gộp

```
Start ─► [Tiếp nhận] ─► X ─┬─ (đủ điều kiện) ─► [Duyệt] ─► X
                             └─ (thiếu) ────────► [Từ chối] ─┘
                                                               │
                                                       [Lưu] ─► End
```

**Câu 29.** Sau cổng gộp XOR, có bao nhiêu token?

A. 1
B. 2
C. 0
D. 3

**Câu 30.** Điều kiện của hai nhánh phải thỏa mãn yêu cầu gì?

A. Có thể cùng đúng
B. Loại trừ nhau và bao phủ hết mọi trường hợp (hoặc có nhánh mặc định)
C. Không cần điều kiện
D. Phải có ít nhất ba nhánh

### Sơ đồ 2 — AND tách và AND gộp

```
Start ─► [Nhận] ─► + ─┬─ [Kiểm tra A] ─► +
                        ├─ [Kiểm tra B] ─► +
                        └─ [Kiểm tra C] ─► +
                                           │
                                   [Tổng hợp] ─► End
```

**Câu 31.** Số token vào và ra cổng gộp AND?

A. 1 vào, 1 ra
B. 3 vào, 3 ra
C. 3 vào, 1 ra
D. 1 vào, 3 ra

**Câu 32.** Nếu một nhánh không bao giờ chạy (ví dụ điều kiện bên trong chặn), điều gì xảy ra?

A. Không sao
B. Cổng gộp tự bỏ qua
C. Chuyển thành XOR
D. Bế tắc — AND gộp chờ nhánh đó mãi

### Sơ đồ 3 — XOR tách, AND gộp

```
Start ─► [Xét] ─► X ─┬─ (đạt) ─► [Cấp] ─► +
                      └─ (không đạt) ─► [Từ chối] ─► +
                                                     │
                                             [Ghi nhận] ─► End
```

**Câu 33.** Chẩn đoán?

A. Bế tắc
B. Đồng bộ thiếu
C. Không lỗi
D. Lỗi cú pháp

**Câu 34.** Cách sửa?

A. Đổi cổng tách thành AND
B. Bỏ cổng gộp
C. Đổi cổng gộp thành XOR
D. Thêm một cổng AND nữa

### Sơ đồ 4 — AND tách, XOR gộp

```
Start ─► [Nhận] ─► + ─┬─ [Tính phí] ─► X
                        └─ [Gửi mail] ─► X
                                         │
                                 [Ghi sổ] ─► End
```

**Câu 35.** Chẩn đoán?

A. Bế tắc
B. Đồng bộ thiếu
C. Không lỗi
D. Lỗi cú pháp

**Câu 36.** Cách sửa?

A. Đổi cổng tách thành XOR
B. Bỏ một nhánh
C. Thêm sự kiện kết thúc
D. Đổi cổng gộp thành AND

### Sơ đồ 5 — Biên đồng hồ không ngắt

```
Start ─► [Chờ phê duyệt] ──(biên: đồng hồ 2 ngày, viền NÉT ĐỨT)──► [Gửi nhắc] ─► End
              │
              └── (được duyệt) ──► [Cập nhật] ─► End
```

**Câu 37.** Sau 2 ngày, hoạt động "Chờ phê duyệt" thế nào?

A. Bị hủy
B. Vẫn tiếp tục chạy, đồng thời sinh thêm token gửi nhắc
C. Chạy lại từ đầu
D. Không có gì xảy ra

**Câu 38.** Nếu đổi viền thành nét liền, điều gì thay đổi?

A. Hoạt động bị hủy khi hết 2 ngày, token chuyển sang nhánh nhắc
B. Không thay đổi
C. Hoạt động chạy nhanh hơn
D. Mất sự kiện biên

### Sơ đồ 6 — Hai pool và hộp đen

```
┌──────────────────────┐        ┌──────────────────────┐
│ SINH VIÊN            │        │ NGÂN HÀNG (hộp đen)  │
│ [Nộp đơn]────────────┼───────►│                      │
│ [Nhận kết quả]◄──────┼────────│                      │
└──────────────────────┘        └──────────────────────┘
```

**Câu 39.** Hai đường nối giữa hai pool phải là loại luồng nào?

A. Sequence flow (nét liền)
B. Data association
C. Message flow (nét đứt)
D. Association

**Câu 40.** Pool "NGÂN HÀNG" để trống bên trong. Đây là gì?

A. Lỗi mô hình
B. Pool ẩn
C. Lane
D. Black-box pool — chỉ quan tâm trao đổi thông điệp, không mô tả nội bộ

---

## ĐÁP ÁN VÀ GIẢI THÍCH

| Câu | Đáp án | Giải thích ngắn |
|---|---|---|
| 1 | B | Có ngân sách, thời hạn, đội riêng, kết thúc thì giải tán = dự án. |
| 2 | D | Tự quyết, tự thực hiện, người chỉ kiểm tra khi có khiếu nại = A5. |
| 3 | C | Process mining thuộc giai đoạn giám sát. |
| 4 | A | Giao diện thay đổi liên tục phá vỡ điều kiện ổn định của RPA. |
| 5 | C | Khó hiểu = vi phạm pragmatics. |
| 6 | B | XOR tách chỉ kích hoạt một nhánh → 1 token. |
| 7 | B | Event-based gateway chờ sự kiện đến trước. |
| 8 | A | Terminate kết thúc toàn bộ instance; end thường kết thúc nhánh. |
| 9 | B | Call activity cho phép định nghĩa riêng và quản lý phiên bản. |
| 10 | B | 25% > ~20% → xem lại thiết kế trước khi mô hình hóa ngoại lệ. |
| 11 | B | AI đề xuất, người quyết định = mức 2. |
| 12 | B | Tách quyền, least privilege. |
| 13 | A | Ngưỡng 0,95: dưới ngưỡng chuyển người. |
| 14 | C | Mẫu 6 có 4 điều kiện bắt buộc. |
| 15 | C | Mẫu 3 = AI đề xuất, người duyệt trước. |
| 16 | A | No-code hạn chế UI phức tạp, logic phức tạp, phụ thuộc nhà cung cấp. |
| 17 | B | Node xử lý theo item → 30 email; phải gộp trước. |
| 18 | B | Webhook nhận ngay khi có sự kiện. |
| 19 | B | JSON schema + kiểm tra trước khi dùng. |
| 20 | B | Bốn nhóm: hiệu năng, tin cậy, chi phí, tác động nghiệp vụ. |
| 21 | C | C5 = AI tự vận hành, người đặt mục tiêu/giám sát cấp cao. |
| 22 | B | 30% cuối (biên, bảo mật, hiệu năng, tích hợp). |
| 23 | B | Mỗi ngoại lệ là một ca kiểm thử. |
| 24 | C | Bước A có 6 nhóm. |
| 25 | B | Plan mode: sửa kế hoạch sai 1 phút; sửa 20 tệp sai cả buổi. |
| 26 | A | Prompt mơ hồ, phạm vi lớn = F1. |
| 27 | B | Thiếu kiểm tra quyền phía máy chủ. |
| 28 | C | Tối thiểu 15 commit. |
| 29 | A | XOR gộp: 1 token. |
| 30 | B | Điều kiện loại trừ + bao phủ (hoặc mặc định). |
| 31 | C | AND gộp: 3 vào, 1 ra. |
| 32 | D | Thiếu một nhánh → AND chờ mãi → bế tắc. |
| 33 | A | XOR tách + AND gộp = bế tắc. |
| 34 | C | Đổi gộp thành XOR. |
| 35 | B | AND tách + XOR gộp = đồng bộ thiếu. |
| 36 | D | Đổi gộp thành AND. |
| 37 | B | Nét đứt = không ngắt: vẫn chờ, sinh thêm token nhắc. |
| 38 | A | Nét liền = ngắt: hủy hoạt động, chuyển nhánh nhắc. |
| 39 | C | Giữa hai pool dùng message flow (nét đứt). |
| 40 | D | Pool trống = black-box pool. |

---

*Hết đề số 4. Hoàn tất bộ 4 đề mô phỏng.*
