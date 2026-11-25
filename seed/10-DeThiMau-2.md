# ĐỀ THI MÔ PHỎNG SỐ 2 — MIS3047 *QUẢN LÝ QUY TRÌNH KINH DOANH*

> 40 câu × 0,25 điểm = 10 điểm. **75 phút.** Một đáp án đúng.
> Phần I (1–28): tình huống 5 chương. Phần II (29–40): đọc sơ đồ BPMN.
> ★ Làm đúng 75 phút, không mở tài liệu. Mục tiêu: ≥ 34/40.

---

## PHẦN I — CÂU HỎI TÌNH HUỐNG (1–28)

**Câu 1.** Một trường có "Quy định tiếp nhận và xử lý đơn xin chuyển ngành": ghi rõ các bước, biểu mẫu, thời hạn, cấp ký. Quy định này được áp dụng lặp đi lặp lại cho mọi sinh viên. Theo Chương 1, đây gần nhất với khái niệm nào?

A. Dự án
B. Quy trình nghiệp vụ
C. Thủ tục (procedure) — cách thức chuẩn hóa để thực hiện một quy trình
D. Chương trình máy tính

**Câu 2.** Hệ thống gợi ý mức học bổng dựa trên dữ liệu, nhưng hội đồng vẫn họp và quyết định từng hồ sơ. Theo thang A0–A5, đây là mức nào?

A. A4 — hệ thống thông minh nhưng con người vẫn quyết định
B. A3 — hệ thống đã tự động hóa hoàn toàn
C. A2 — hệ thống chỉ kiểm tra luật
D. A1 — hệ thống chỉ lưu trữ

**Câu 3.** Một quy trình nghiệp vụ có "phiên bản mô hình" (model) và "phiên bản đang chạy" (instance). Phát biểu nào đúng?

A. Model và instance là một — không cần phân biệt
B. Model là bản thiết kế; instance là một lần chạy cụ thể của model với dữ liệu và token riêng
C. Instance là bản thiết kế; model là một lần chạy
D. Chỉ quy trình có tự động hóa mới có instance

**Câu 4.** Trong kiến trúc RPA, thành phần nào là điểm nhạy cảm nhất về bảo mật?

A. Bộ điều khiển trung tâm (orchestrator)
B. Robot chạy trên máy trạm
C. Giao diện giả lập người dùng
D. Kho lưu thông tin đăng nhập (credential vault)

**Câu 5.** Một mô hình BPMN có cú pháp đúng, nhưng khi chạy thử thì có token bị treo vĩnh viễn. Tiêu chí chất lượng nào bị vi phạm?

A. Cú pháp (syntax)
B. Ngữ nghĩa (semantics) — mô hình không đảm bảo mọi token đều kết thúc
C. Dễ hiểu (pragmatics)
D. Thẩm mỹ trình bày

**Câu 6.** Theo 7PMG, hướng dẫn G4 nhằm mục đích gì?

A. Tránh bế tắc (deadlock) bằng cách dùng đúng cặp cổng tách/gộp
B. Giảm số lượng task xuống dưới 10
C. Luôn dùng AND thay cho XOR
D. Bỏ qua sự kiện kết thúc

**Câu 7.** Sơ đồ có cổng AND tách thành ba nhánh, cả ba nhánh cùng đi vào một cổng AND gộp, rồi đến hoạt động cuối. Kết quả?

A. Bế tắc vì AND gộp chờ mãi
B. Đồng bộ thiếu vì ba token cùng đi tiếp
C. Đúng — AND gộp chờ đủ ba token rồi hợp nhất thành một token đi tiếp
D. Vi phạm cú pháp vì AND không được gộp

**Câu 8.** Cổng XOR tách có hai điều kiện: (a) "điểm ≥ 8" và (b) "điểm ≥ 7". Một hồ sơ có điểm 9 sẽ đi nhánh nào?

A. Chắc chắn nhánh (a)
B. Chắc chắn nhánh (b)
C. Cả hai nhánh
D. Đây là lỗi mô hình: hai điều kiện không loại trừ nhau; cần sửa để chỉ một điều kiện đúng, hoặc thêm nhánh mặc định

**Câu 9.** Một task "Gọi API ngân hàng" có sự kiện biên lỗi (error boundary) viền đôi nét liền. Khi API trả lỗi, điều gì xảy ra?

A. Task bị hủy, token chuyển sang nhánh xử lý lỗi
B. Task tiếp tục chạy, đồng thời sinh thêm token xử lý lỗi
C. Task chạy lại ba lần rồi mới báo lỗi
D. Không có gì xảy ra vì lỗi không phải sự kiện

**Câu 10.** Một event sub-process được gắn với sự kiện "nhận khiếu nại" và có thể ngắt hoạt động đang chạy trong scope. Đặc điểm nào đúng?

A. Event sub-process chỉ chạy một lần khi bắt đầu quy trình
B. Event sub-process không thể ngắt hoạt động khác
C. Event sub-process được kích hoạt bởi sự kiện, chạy trong scope của process/sub-process chứa nó, và có thể ngắt hoặc không ngắt tùy cấu hình
D. Event sub-process là một pool riêng biệt

**Câu 11.** Một quy trình "xét tốt nghiệp" được định nghĩa độc lập và được ba quy trình khác gọi lại. Khi quy chế xét tốt nghiệp thay đổi, cần sửa ở đâu?

A. Sửa trong cả ba quy trình gọi
B. Sửa một lần trong quy trình được gọi (call activity), vì các quy trình gọi dùng chung định nghĩa
C. Không thể sửa vì đã được gọi
D. Phải tạo ba bản sao mới

**Câu 12.** Một quy trình có 30% hồ sơ phát sinh ngoại lệ. Theo nguyên tắc xử lý ngoại lệ, nên làm gì?

A. Vẽ đủ 30% ngoại lệ vào mô hình chính
B. Bỏ qua ngoại lệ để mô hình gọn
C. Chuyển toàn bộ quy trình sang thủ công
D. Xem lại thiết kế quy trình: tỷ lệ ngoại lệ quá cao (ngưỡng tham khảo ~20%) cho thấy quy trình chưa ổn định, nên cải tiến trước khi tự động hóa

**Câu 13.** Khi đặt ngưỡng tin cậy cho AI, hạ ngưỡng từ 0,95 xuống 0,80 sẽ dẫn đến điều gì?

A. AI tự động nhiều hơn, ít chuyển người hơn, nhưng rủi ro sai tăng
B. AI tự động ít hơn, nhiều người kiểm tra hơn
C. Không thay đổi gì
D. AI sẽ ngừng hoạt động

**Câu 14.** Loại công việc nào phù hợp nhất với agent AI (thay vì workflow xác định)?

A. Việc lặp lại, quy tắc rõ, dữ liệu cấu trúc
B. Việc cần tính toán chính xác tuyệt đối
C. Việc cần phán đoán, bước đi không cố định, phải quyết định dựa trên ngữ cảnh
D. Việc chỉ cần gửi email theo mẫu

**Câu 15.** Trong kiến trúc agent, công cụ nào là "có tác dụng phụ" (side-effect)?

A. Công cụ gửi email cho sinh viên
B. Công cụ tra cứu điểm trong cơ sở dữ liệu
C. Công cụ đọc danh sách học bổng
D. Công cụ tìm kiếm trong tài liệu

**Câu 16.** Mẫu thiết kế số 5 (AI tối ưu theo chỉ số) có rủi ro "reward hacking". Biểu hiện nào đúng?

A. AI chạy chậm hơn dự kiến
B. AI từ chối xử lý hồ sơ
C. AI tối ưu chỉ số được giao nhưng làm sai mục tiêu thật (ví dụ giảm thời gian xử lý bằng cách bỏ bước kiểm tra)
D. AI không kết nối được với cơ sở dữ liệu

**Câu 17.** Citizen developer là gì?

A. Lập trình viên chuyên nghiệp làm việc cho tổ chức
B. Người dùng nghiệp vụ tự xây dựng giải pháp tự động hóa dưới sự quản trị của IT
C. Chuyên gia bảo mật
D. Kiểm thử viên độc lập

**Câu 18.** Trong kiến trúc 3 lớp của workflow, thông tin đăng nhập (credential) nên đặt ở đâu?

A. Lớp 1 — giao diện
B. Lớp 2 — logic nghiệp vụ
C. Lớp 3 — môi trường/an toàn, tách biệt khỏi logic và giao diện
D. Trong tệp cấu hình công khai

**Câu 19.** Cần phản ứng gần như tức thời khi có đơn đăng ký mới từ hệ thống bên ngoài. Nên chọn trigger nào?

A. Webhook — hệ thống nguồn gọi sang khi có sự kiện
B. Polling mỗi 24 giờ
C. Chạy thủ công bằng tay
D. Chỉ chạy vào cuối tháng

**Câu 20.** Một workflow dùng AI để phân loại văn bản, nhưng đầu ra phải là JSON có trường `loai` và `do_tin_cay`. Cách làm đúng?

A. Yêu cầu AI trả lời tự do rồi dùng biểu thức chính quy để tách
B. Định nghĩa JSON schema và yêu cầu AI trả về đúng cấu trúc; kiểm tra schema trước khi dùng
C. Không cần kiểm tra vì AI luôn trả đúng
D. Chỉ dùng AI khi có kết nối Internet

**Câu 21.** Theo phổ C0–C5 của Chương 5, đồ án môn học được khuyến nghị ở mức nào?

A. C1 — AI chỉ gợi ý từng dòng
B. C4 — con người chỉ đạo, AI thực thi phần lớn công việc dưới sự kiểm chứng
C. C5 — AI tự làm toàn bộ, không cần con người
D. C0 — không dùng AI

**Câu 22.** "FAAFO" trong Chương 5 nhấn mạnh điều gì?

A. Xây nhanh, thử nhanh, nhận phản hồi nhanh và chấp nhận rủi ro có kiểm soát
B. Không bao giờ thử nghiệm
C. Phải viết tài liệu trước khi viết mã
D. Chỉ dùng một mô hình AI duy nhất

**Câu 23.** Vì sao ngoại lệ trong mô hình BPMN lại là nguồn tốt để sinh ca kiểm thử?

A. Vì ngoại lệ ít khi xảy ra nên không cần kiểm thử
B. Vì ngoại lệ là các tình huống đã được mô hình hóa nên không cần kiểm thử
C. Vì ngoại lệ chỉ dành cho hệ thống cũ
D. Vì mỗi nhánh ngoại lệ là một tình huống cụ thể cần được kiểm chứng trong mã, giúp phát hiện lỗi xử lý sai

**Câu 24.** Phiếu ý định (intention sheet) trong khung IDEA có bao nhiêu mục?

A. 3
B. 5
C. 7
D. 12

**Câu 25.** Khi dùng Agentic Coding CLI, nguyên tắc phân quyền an toàn nào đúng?

A. Cấp quyền tối thiểu (least privilege); mặc định chỉ đọc, chỉ mở quyền ghi khi thật cần
B. Cấp toàn quyền để agent làm nhanh
C. Không cần phân quyền vì agent luôn đúng
D. Chỉ dùng tài khoản quản trị viên

**Câu 26.** Mã chạy không lỗi, giao diện đẹp, nhưng tính học bổng sai vì hiểu sai quy chế làm tròn. Đây là mẫu thất bại nào?

A. F1 — prompt mơ hồ
B. F2 — giả định ngầm không được nói ra
C. F5 — ảo giác thư viện
D. F8 — thiếu Git

**Câu 27.** Một nhóm không dùng Git, agent xóa nhầm một hàm quan trọng và không thể khôi phục. Đây là hậu quả của mẫu nào?

A. F8 — không kiểm soát phiên bản
B. F1 — prompt mơ hồ
C. F4 — đồng bộ thiếu
D. F11 — vòng 70%

**Câu 28.** Đồ án yêu cầu tối thiểu bao nhiêu commit và trọng số lớn nhất thuộc tiêu chí nào?

A. 5 commit; trọng số lớn nhất là giao diện
B. 10 commit; trọng số lớn nhất là bảo mật
C. 15 commit; trọng số lớn nhất là "đúng nghiệp vụ" (30%)
D. 50 commit; trọng số lớn nhất là số dòng mã

---

## PHẦN II — ĐỌC SƠ ĐỒ BPMN (29–40)

### Sơ đồ 1 — XOR có nhánh mặc định

```
Start ─► [Kiểm tra hồ sơ] ─► X ─┬─ (đủ điều kiện) ─► [Duyệt] ─► End
                                  ├─ (thiếu giấy tờ) ─► [Yêu cầu bổ sung] ─► End
                                  └─ (mặc định) ──────► [Chuyển xem xét] ─► End
```

**Câu 29.** Hồ sơ không thỏa "đủ điều kiện" và cũng không thỏa "thiếu giấy tờ" sẽ đi đâu?

A. Không đi đâu — token kẹt
B. Nhánh mặc định "Chuyển xem xét"
C. Cả hai nhánh còn lại
D. Quay lại bước "Kiểm tra hồ sơ"

**Câu 30.** Vai trò của nhánh mặc định trong sơ đồ trên là gì?

A. Tăng số token
B. Đảm bảo mọi trường hợp còn lại đều có đường đi, tránh bế tắc do điều kiện không bao phủ
C. Thay thế hoàn toàn các điều kiện khác
D. Chỉ để trang trí

### Sơ đồ 2 — AND tách và AND gộp

```
Start ─► [Nhận đơn] ─► + ─┬─ [Kiểm tra học vụ] ──► +
                            └─ [Kiểm tra tài chính] ─┘
                                                      │
                                                      ▼
                                              [Ra quyết định] ─► End
```

**Câu 31.** Sơ đồ này có lỗi không?

A. Có — AND tách thì phải gộp bằng XOR
B. Có — AND gộp không được có hai luồng vào
C. Không — AND tách và AND gộp là cặp đúng; gộp chờ đủ hai token rồi đi tiếp
D. Có — thiếu sự kiện kết thúc

**Câu 32.** Nếu bỏ một nhánh (chỉ còn "Kiểm tra học vụ"), sơ đồ sẽ thế nào?

A. Vẫn đúng vì AND gộp chỉ cần một nhánh
B. Sai — AND gộp sẽ chờ nhánh còn lại mãi, gây bế tắc; phải đổi cổng tách hoặc bỏ cổng gộp cho phù hợp
C. Tự động chuyển thành XOR
D. Không ảnh hưởng gì

### Sơ đồ 3 — Cổng bao hàm (OR)

```
Start ─► [Tiếp nhận] ─► O ─┬─ (có giấy khai sinh) ─► [Xác minh A] ─► O
                             ├─ (có bảng điểm) ──────► [Xác minh B] ─┤
                             └─ (có chứng chỉ) ──────► [Xác minh C] ─┘
                                                                       │
                                                              [Tổng hợp] ─► End
```

**Câu 33.** Cổng OR (bao hàm) khác XOR ở điểm nào?

A. OR chỉ chọn một nhánh, XOR chọn nhiều
B. OR chọn ít nhất một nhánh (có thể nhiều), XOR chỉ chọn đúng một
C. OR không có cổng gộp
D. OR chỉ dùng cho sự kiện

**Câu 34.** Cổng gộp O trong sơ đồ phải chờ điều gì?

A. Chờ đủ cả ba nhánh luôn luôn
B. Chỉ chờ nhánh đầu tiên
C. Chờ tất cả các nhánh đã được kích hoạt (có thể ít hơn ba), rồi đi tiếp
D. Không chờ gì cả

### Sơ đồ 4 — Biên đồng hồ ngắt

```
Start ─► [Chờ duyệt] ──(biên: đồng hồ 3 ngày, viền NÉT LIỀN)──► [Từ chối tự động] ─► End
             │
             └── (được duyệt) ──► [Cập nhật] ─► End
```

**Câu 35.** Sau 3 ngày không có phản hồi, điều gì xảy ra?

A. Hoạt động "Chờ duyệt" vẫn tiếp tục, đồng thời gửi nhắc nhở
B. Hoạt động "Chờ duyệt" bị hủy, token chuyển sang "Từ chối tự động"
C. Hoạt động chạy lại từ đầu
D. Không có gì xảy ra

**Câu 36.** Nếu muốn sau 3 ngày vẫn tiếp tục chờ duyệt nhưng gửi thêm nhắc nhở, phải đổi gì?

A. Đổi viền sự kiện thành nét đứt (không ngắt)
B. Đổi cổng thành AND
C. Bỏ sự kiện biên
D. Đổi sự kiện thành terminate

### Sơ đồ 5 — Terminate end

```
Start ─► [Xử lý A] ─► + ─┬─ [Xử lý B] ─► (tròn đặc, terminate)
                            └─ [Xử lý C] ─► End
```

**Câu 37.** Khi nhánh B chạm sự kiện terminate, điều gì xảy ra với nhánh C?

A. Nhánh C tiếp tục chạy bình thường
B. Toàn bộ process instance kết thúc ngay, nhánh C bị dừng
C. Nhánh C chuyển sang trạng thái chờ
D. Hệ thống báo lỗi cú pháp

### Sơ đồ 6 — Multi-instance và bù trừ

```
┌────────────────────────────────────────────────────────────┐
│ Start ─► [Duyệt từng hồ sơ] (marker |||) ─► [Cấp học bổng] │
│                                                   │(X)     │
│                                                   ▼        │
│                                            [Thu hồi] ─► End│
└────────────────────────────────────────────────────────────┘
```

**Câu 38.** Marker `|||` trên task "Duyệt từng hồ sơ" có ý nghĩa gì?

A. Task lặp vô hạn
B. Task chạy nhiều lần, mỗi lần cho một phần tử trong tập hợp (multi-instance)
C. Task chỉ chạy một lần
D. Task là sự kiện con

**Câu 39.** Nhánh (X) "Thu hồi" là gì?

A. Một sự kiện bắt đầu
B. Một luồng ngoại lệ ngắt
C. Một compensation handler — dùng để hoàn tác khi cần hủy kết quả đã thực hiện
D. Một cổng XOR

**Câu 40.** Khi compensation chạy cho nhiều bước đã hoàn thành, thứ tự thực hiện là gì?

A. Cùng thứ tự với lúc thực hiện
B. Ngẫu nhiên
C. Song song tất cả
D. Ngược thứ tự thực hiện — bước làm sau được hoàn tác trước

---

## ĐÁP ÁN VÀ GIẢI THÍCH

| Câu | Đáp án | Giải thích ngắn |
|---|---|---|
| 1 | C | Thủ tục là cách thức chuẩn hóa (bước, biểu mẫu, thẩm quyền) để thực hiện quy trình; quy trình là chuỗi hoạt động tạo giá trị. |
| 2 | A | A4 — hệ thống thông minh gợi ý nhưng con người vẫn quyết định. A3 là không có con người. |
| 3 | B | Model = thiết kế; instance = một lần chạy cụ thể với token và dữ liệu riêng. |
| 4 | D | Credential vault chứa thông tin đăng nhập — điểm nhạy cảm nhất của RPA. |
| 5 | B | Cú pháp đúng nhưng token treo = lỗi ngữ nghĩa (semantics). |
| 6 | A | G4 = tránh deadlock bằng cách dùng đúng cặp cổng tách/gộp. |
| 7 | C | AND-AND là cặp đúng: gộp chờ đủ token rồi hợp nhất. |
| 8 | D | Hai điều kiện không loại trừ (9 thỏa cả hai) → lỗi mô hình; cần sửa điều kiện hoặc thêm nhánh mặc định. |
| 9 | A | Error boundary viền liền = ngắt: task bị hủy, token sang nhánh lỗi. |
| 10 | C | Event sub-process chạy trong scope, kích hoạt bởi sự kiện, có thể ngắt hoặc không. |
| 11 | B | Call activity dùng chung định nghĩa; sửa một lần, mọi nơi gọi đều cập nhật. |
| 12 | D | 30% > ngưỡng ~20% → quy trình chưa ổn định, cần cải tiến trước khi tự động hóa. |
| 13 | A | Hạ ngưỡng → AI tự động nhiều hơn, ít chuyển người, nhưng rủi ro sai tăng. |
| 14 | C | Agent phù hợp với việc cần phán đoán, bước không cố định. |
| 15 | A | Gửi email là hành động có tác dụng phụ (thay đổi thế giới bên ngoài). |
| 16 | C | Reward hacking: tối ưu chỉ số nhưng làm sai mục tiêu thật. |
| 17 | B | Citizen developer = người nghiệp vụ tự xây dựng dưới quản trị của IT. |
| 18 | C | Credential thuộc lớp 3 (môi trường/an toàn), tách khỏi logic và giao diện. |
| 19 | A | Webhook phản ứng tức thời khi có sự kiện; polling 24h không đáp ứng. |
| 20 | B | Dùng JSON schema + kiểm tra trước khi dùng; không tin AI luôn đúng. |
| 21 | B | Đồ án khuyến nghị C4 — con người chỉ đạo, AI thực thi dưới kiểm chứng. |
| 22 | A | FAAFO = thử nhanh, nhận phản hồi nhanh, rủi ro có kiểm soát. |
| 23 | D | Mỗi nhánh ngoại lệ là một ca kiểm thử cụ thể. |
| 24 | C | Phiếu ý định có 7 mục. |
| 25 | A | Least privilege, mặc định chỉ đọc. |
| 26 | B | Chạy đúng kỹ thuật nhưng sai nghiệp vụ = F2 (giả định ngầm). |
| 27 | A | Không có Git → không thể khôi phục = F8. |
| 28 | C | 15 commit; trọng số lớn nhất là "đúng nghiệp vụ" (30%). |
| 29 | B | Nhánh mặc định hứng mọi trường hợp còn lại. |
| 30 | B | Nhánh mặc định đảm bảo bao phủ, tránh bế tắc. |
| 31 | C | AND-AND đúng: gộp chờ đủ hai token. |
| 32 | B | Bỏ một nhánh → AND gộp chờ mãi → bế tắc; phải sửa cặp cổng. |
| 33 | B | OR chọn ít nhất một (có thể nhiều); XOR chỉ đúng một. |
| 34 | C | OR gộp chờ các nhánh đã kích hoạt, không nhất thiết đủ tất cả. |
| 35 | B | Viền liền = ngắt: task bị hủy, token sang "Từ chối tự động". |
| 36 | A | Đổi sang nét đứt (không ngắt) để vừa chờ vừa gửi nhắc nhở. |
| 37 | B | Terminate kết thúc toàn bộ process instance, dừng mọi nhánh. |
| 38 | B | Marker `|||` = multi-instance: chạy cho từng phần tử. |
| 39 | C | (X) + "Thu hồi" = compensation handler (hoàn tác). |
| 40 | D | Compensation chạy ngược thứ tự thực hiện. |

---

*Hết đề số 2. Tiếp theo: `11-DeThiMau-3.md`.*
