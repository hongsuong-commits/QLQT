# SỔ TAY NHANH — MIS3047 *QUẢN LÝ QUY TRÌNH KINH DOANH*

> Tra cứu nhanh trước khi vào phòng thi: **tất cả bảng so sánh**, **mọi con số/ngưỡng then chốt**, **mọi bẫy thi**, **tóm tắt 12 mẫu thất bại**, **12 câu tự kiểm tra nhanh**.

---

## 1. CON SỐ & NGƯỠNG THEN CHỐT

| Chương | Con số / ngưỡng | Ý nghĩa |
|---|---|---|
| Ch1 | A0 → A5 | A0 thủ công → A1 hỗ trợ số → A2 luật có người trong vòng quyết định → A3 luật do máy (BPA) → A4 thông minh → A5 tự trị |
| Ch1 | 6 giai đoạn vòng đời BPM | Khám phá → Mô hình hóa → Thực thi → Giám sát → Tối ưu → Cải tiến liên tục |
| Ch1 | 7PMG (G1–G7) | G4 = phòng deadlock; G7 ~ 30 phần tử (ngưỡng không quá phức tạp) |
| Ch1 | 3 mức mô hình | Mô tả (~10 ký hiệu, bỏ ngoại lệ) / Phân tích / Thực thi |
| Ch2 | 5 vị trí sự kiện | Bắt đầu, Giữa, Kết thúc (luồng chính), Nút nháy bên trong, Nháy bên cạnh |
| Ch2 | Viền đôi | Nét liền = NGẮT (dừng hoạt động chính); Nét đứt = KHÔNG NGẮT (sinh thêm token) |
| Ch2 | 6 loại task | Nhận, Gửi, Người dùng, Thủ tục, Thông tin, Màn hình |
| Ch2 | 4 marker | Nhiều lần (multi-instance), Lặp (loop), Đánh giá (đánh giá điều kiện), Tự động |
| Ch2 | 4 cổng | XOR tách, XOR gộp, AND tách, AND gộp; 2 lỗi cân bằng: đồng bộ thiếu & bế tắc |
| Ch2 | Công thức XOR | T = Σ pᵢ·Tᵢ |
| Ch2 | Công thức AND | T = max(T₁, T₂, ...) |
| Ch2 | Công thức rework | R = p / (1 − p) |
| Ch2 | Ngưỡng ngoại lệ | ~20% = ngưỡng xử lý ngoại lệ; lập luận 4 điểm |
| Ch2 | 5 loại ngoại lệ | Lỗi, Bậc thang, Kết thúc, Hủy, Bù đắp |
| Ch2 | 4 cơ chế xử lý ngoại lệ | Ngắt, Không ngắt, Đóng gói, Ủy thác |
| Ch2 | 35–40 phần tử | Sơ đồ lớn nhất nên vẽ (dưới ngưỡng ~30–40) |
| Ch3 | 4 mức tự chủ | Người làm → Người theo dõi → AI đề nghị → AI tự thực hiện |
| Ch3 | 7 mẫu | Mẫu 0–6 (7 mẫu), nhưng Ch3 chỉ thiết kế 6 mẫu → bẫy "7 vs 6" |
| Ch3 | Ngưỡng do_tin_cay | 0,95 = tự động xử lý; 0,99 = rất tự tin; 0,80 = quy trình truyền thống |
| Ch3 | Ví dụ minh chứng | 1.200 hồ sơ → 65% đạt ngưỡng → 780 lượt xử lý AI |
| Ch3 | 3 rủi ro mẫu 5 | Không hội tụ, dao động, reward hacking |
| Ch3 | 4 điều kiện mẫu 6 | Bắt buộc (mã rõ ràng, kiểm thử, fallback, giám sát) |
| Ch4 | 3 lớp | Lớp 1 (giao diện), Lớp 2 (logic nghiệp vụ), Lớp 3 (môi trường/an toàn) |
| Ch4 | 4 trigger | Lịch, Sự kiện (webhook), Yêu cầu người dùng, Kích hoạt bên ngoài |
| Ch4 | 10 tiêu chí | Bộ chọn nền tảng (3 tiêu chí quyết định: 5, 7, 10 với trường công lập) |
| Ch4 | 6 nhóm nền tảng | BPMS → self-host → hệ sinh thái → đơn giản (4 câu hỏi tuần tự) |
| Ch4 | 6 bước xây dựng | 7 nguyên tắc (idempotency là #1) |
| Ch4 | 5 loại kiểm thử | Hàm, Tích hợp, Hiệu năng, Bảo mật, Chấp nhận (ưu tiên tiếng Việt có dấu) |
| Ch4 | Idempotency | 3 cơ chế: khóa định danh duy nhất, kiểm tra tồn tại, đánh dấu đã xử lý |
| Ch4 | p95 | Chỉ số hiệu năng (phần trăm thứ 95) |
| Ch4 | baseline | Đo TRƯỚC khi triển khai (không thể đo lại quá khứ) |
| Ch4 | 98% | Ngưỡng tin cậy hệ thống vận hành |
| Ch5 | 4 chế độ AI | Thảo luận / Trợ giúp / Lập kế hoạch / Tự thực thi (CLI) |
| Ch5 | Rủi ro cao nhất CLI | Agent TỰ thực hiện thay đổi VÀ TỰ chạy được mã (2 điều kiện cùng xảy ra) |
| Ch5 | Plan mode | Sửa kế hoạch sai tốn 1 phút; sửa 20 tệp sai tốn cả buổi |
| Ch5 | Quy tắc ba lượt | Vượt 5 lượt sửa → reset về commit sạch, phiên mới |
| Ch5 | 2–3–3–4 | 12 mẫu thất bại (2 chuẩn bị, 3 thực thi, 3 an toàn, 4 vận hành) |
| Ch5 | Phiếu ý định | 7 mục |
| Ch5 | Bước D | 5 sản phẩm; ánh xạ BPMN → thành phần ứng dụng (10 dòng) |
| Ch5 | Bước E | 5 nguyên tắc; Bước A | 6 nhóm; 3 nhóm dễ bỏ |
| Ch5 | 6 tiêu chí "hoàn thành" | Tiêu chí 3 (giải thích diff) và 6 (người khác chạy được theo README) hay bỏ sót nhất + bị kiểm tra trực tiếp khi bảo vệ |
| Ch5 | Trọng số đồ án | 30% đúng nghiệp vụ / 25% / 15% / 15% / 15% |
| Ch5 | Tối thiểu commit | 15 commit |
| Ch5 | Vấn đề 70% | 30% cuối: biên, bảo mật, hiệu năng, tích hợp |
| Ch5 | Công thức chất lượng | ≈ đặc tả × kiểm chứng (một vế bằng KHÔNG → tích bằng KHÔNG) |

---

## 2. BẢNG SO SÁNH HỆ THỐNG HÓA

### 2.1 A0–A5

| Mức | Định nghĩa ngắn | Có con người trong vòng quyết định? | Ví dụ |
|---|---|---|---|
| A0 | Thủ công | Có (làm tất cả) | Nhập bill vào sổ tay |
| A1 | Hỗ trợ số | Có (máy chỉ lưu trữ) | Excel quản lý hồ sơ |
| A2 | Luật do máy, người trong vòng quyết định | Có (phê duyệt) | Hệ thống định tuyến, trưởng phê duyệt |
| A3 | Luật do máy, không người | Không (BPA) | Tự tạo bút toán qua API |
| A4 | Thông minh | Có (AI đề nghị, người duyệt) | AI gợi định mức, kế toán chính nhận |
| A5 | Tự trị | Không | AI tự xử lý end-to-end |

**Bẫy**: A2 ≠ A3. Nếu có bước "con người bấm phê duyệt" → là **A2**, không phải A3.

### 2.2 BPA vs RPA

| Tiêu chí | BPA (A3) | RPA |
|---|---|---|
| Vị trí | Tối ưu quy trình trước, rồi tự động hóa | Robot mô phỏng con người trên UI |
| Thay đổi hệ thống | Có thể thay đổi ứng dụng | Không thay đổi ứng dụng (giao diện) |
| Phù hợp | Quy trình có API, ổn định | Hệ thống cũ không có API, ít thay đổi |
| 7 điều kiện RPA | — | Lặp lại, quy tắc rõ, dữ liệu cấu trúc, ổn định, số lượng lớn, thời gian cố định, rủi ro thấp |

**Bẫy**: Credential vault là điểm nhạy cảm nhất của RPA.

### 2.3 Bốn cổng (XOR / AND)

| Cổng tách | Cổng gộp | Hành vi | Kết luận |
|---|---|---|---|
| XOR | XOR | Chọn MỘT nhánh; 1 token đi tiếp | Đúng |
| AND | AND | TẤT CẢ nhánh; N token đi tiếp | Đúng |
| XOR | AND | XOR chỉ ra 1 token, AND chờ đủ N → treo mãi | **BẾ TẮC** |
| AND | XOR | AND ra N token, XOR không chờ → N token đi tiếp | **ĐỒNG BỘ THIẾU** |

**Quy tắc**: Điều kiện cổng tách phải **loại trừ** và **bao phủ hết** (hoặc có nhánh mặc định).

### 2.4 Sự kiện biên (viền đôi)

| Viền | Ngắt hay không | Hành vi |
|---|---|---|
| Nét liền | NGẮT | Dừng hoạt động chính, chuyển sang nhánh sự kiện |
| Nét đứt | KHÔNG NGẮT | Hoạt động chính vẫn tiếp tục, sinh thêm token ở nhánh phụ |

### 2.5 No-code vs Ứng dụng

| Tiêu chí | Workflow no-code | Ứng dụng |
|---|---|---|
| Giao diện người dùng | Giới hạn | Mạnh |
| Tích hợp/chạy nền | Mạnh | Cần API |
| Thay đổi nhanh | Nhanh | Chậm hơn |
| Phù hợp | Tích hợp, chạy nền, không cần UI phức tạp | Tương tác phức tạp với người dùng |

**Hướng khuyên**: Ứng dụng (giao diện) GỌI workflow (tích hợp, chạy nền).

### 2.6 6 nhóm nền tảng (4 câu hỏi tuần tự)

| Câu hỏi | Nền tảng gợi ý |
|---|---|
| Cần BPMS chuẩn BPMN? | Camunda / nhóm BPMS |
| Dữ liệu không ra ngoài? | Self-host (n8n tự vận hành) |
| Đã dùng hệ sinh thái (M365)? | Power Automate |
| Muốn đơn giản, nhanh? | Công cụ đơn giản (Zapier tương tự) |

**Bẫy bệnh viện/Microsoft 365**: Dữ liệu y tế không ra ngoài dịch vụ bên ngoài → chọn self-host, không chọn M365 chỉ vì "đã dùng".

---

## 3. BẪY THI TOÀN BỘ HỌC PHẦN

| # | Bẫy | Cách tránh |
|---|-----|------------|
| 1 | A2 vs A3: có người phê duyệt = A2 | Xem có bước "con người bấm nút" không |
| 2 | XOR tách → AND gộp = bế tắc | Tách phải cùng loại với gộp (XOR-XOR, AND-AND) |
| 3 | AND tách → XOR gộp = đồng bộ thiếu | XOR gộp không chờ → chạy nhiều lần |
| 4 | Điều kiện không loại trừ & không bao phủ → token kẹt | Thêm nhánh mặc định hoặc làm loại trừ + bao phủ |
| 5 | Viền nét đứt = không ngắt (sinh thêm token) | Đừng nhầm là ngắt |
| 6 | Viền đậm + dấu + = Call activity (tái sử dụng) | Khác sub-process nhúng (chỉ trong 1 mô hình) |
| 7 | Viền đôi = Transaction; bù trừ chạy NGƯỢC thứ tự | Bù trừ: bước sau hoàn tác trước |
| 8 | Message flow không nối trong cùng pool | Dùng sequence flow |
| 9 | Sequence flow không vượt ranh giới pool | Dùng message flow |
| 10 | Idempotency: chạy lại không sinh kết quả thứ hai | Khóa định danh, kiểm tra tồn tại, đánh dấu đã xử lý |
| 11 | Prompt injection + công cụ tác dụng phụ = nguy hiểm nhất | Nội dung bên ngoài là dữ liệu, không phải lệnh |
| 12 | Ẩn nút ≠ kiểm tra quyền (phải kiểm tra ở mọi endpoint) | Kiểm tra quyền phía máy chủ |
| 13 | AI bịa tên gói (F5) → mã độc | Kiểm tra gói trong kho chính thức trước khi cài |
| 14 | Plan mode: sửa kế hoạch sai tốn 1 phút; sửa 20 tệp sai tốn cả buổi | Luôn plan mode trước khi sửa nhiều tệp |
| 15 | Quy tắc ba lượt: vượt 5 lượt → reset commit sạch | Đừng tiếp tục sửa mãi |
| 16 | Test viết TRƯỚC khi sửa (xác nhận hiểu đúng + ngăn quay lại) | Test sau sửa thì không độc lập |
| 17 | "Vấn đề 70%": 30% cuối (biên, bảo mật, hiệu năng, tích hợp) | Không chủ quan sau khi nguyên mẫu chạy |
| 18 | Chất lượng ≈ đặc tả × kiểm chứng (phép nhân) | Một vế bằng KHÔNG → tích bằng KHÔNG |
| 19 | Không thể đo lại quá khứ → baseline cần đo TRƯỚC | Đo baseline trước khi triển khai |
| 20 | Tiêu chí 3 & 6 hay bỏ sót nhất + kiểm tra trực tiếp bảo vệ | Chuẩn bị diff giải thích + README chạy được |

---

## 4. TÓM TẮT 12 MẪU THẤT BẠI F1–F12 (Chương 5)

| Nhóm | Mã | Tên | Dấu hiệu | Phòng tránh |
|---|---|---|---|---|
| Chuẩn bị (2) | F1 | Prompt mơ hồ, phạm vi quá lớn | AI trả lời lớn, không hướng | Chia nhiệm vụ nhỏ, phạm vi rõ |
| | F2 | Giả định ngầm không nói ra | Chạy đúng kỹ thuật, sai nghiệp vụ | Liệt kê quy tắc nghiệp vụ tường minh |
| Thực thi (3) | F3 | Chấp nhận mù (không đọc diff) | Không kiểm tra mã AI tạo | Đọc diff mọi lần |
| | F4 | Đồng bộ thiếu (lack of sync) | Nhiều token chạy song song không chờ | Thiết kế cổng gộp đúng |
| | F5 | Ảo giác thư viện (bịa tên gói/hàm) | Gói không tồn tại hoặc mã độc | Kiểm tra kho chính thức, khóa phiên bản |
| An toàn (3) | F6 | Doom loop (vòng lặp vô hạn) | Lỗi sinh lỗi, ngữ cảnh đầy test thất bại | Dừng, reset commit sạch, phiên mới |
| | F7 | Trôi ngữ cảnh | Quên yêu cầu cũ, sửa lại cũ | Giữ ngữ cảnh, tệp ngữ cảnh 3 khối |
| | F8 | Không kiểm soát phiên bản (thiếu Git) | "Không quay lại được trạng thái hôm qua"; 3 mức từ nhẹ đến nặng | Git ngay từ commit đầu; mỗi tính năng một commit |
| Vận hành (4) | F9 | Lỗ hổng bảo mật (nghiêm trọng nhất) | Logic để trống / SQL injection / lộ khóa / thiếu kiểm tra quyền; không triệu chứng khi chưa bị tấn công | Danh mục kiểm tra bảo mật bắt buộc; kiểm tra quyền mọi endpoint |
| | F10 | Nợ kỹ thuật vô hình | "Thêm tính năng nhỏ tốn thời gian hơn tuần trước" | Tài liệu kiến trúc + ngưỡng refactor |
| | F11 | Mắc kẹt ở "vòng 70%" | "Một buổi xong nguyên mẫu, ba tuần chưa dùng được" | Chuẩn bị 30% cuối sớm; chuyển chế độ vibe → kỹ thuật |
| | F12 | Phụ thuộc & bào mòn kỹ năng | "Không giải thích được vì sao mã chạy"; sản phẩm vẫn chạy nhưng người yếu đi | Tự viết phần lõi; tự tóm tắt sau mỗi tính năng; đọc diff mọi lần |

**Cách nhớ**: **2–3–3–4** (chuẩn bị / thực thi / an toàn / vận hành) = 12 mẫu.

---

## 5. 12 CÂU TỰ KIỂM TRA NHANH (đáp án trong ngoặc)

1. Có người phê duyệt trong quy trình tự động là mức A nào? (**A2**)
2. XOR tách → AND gộp gây lỗi gì? (**Bế tắc**)
3. AND tách → XOR gộp gây lỗi gì? (**Đồng bộ thiếu**, chạy nhiều lần)
4. Viền nét đứt sự kiện biên là ngắt hay không ngắt? (**Không ngắt**)
5. Call activity khác sub-process nhúng thế nào? (**Tái sử dụng, sửa 1 nơi ảnh hưởng mọi nơi**)
6. Transaction bù trừ chạy theo thứ tự nào? (**Ngược thứ tự thực hiện**)
7. Idempotency có 3 cơ chế gì? (**Khóa định danh, kiểm tra tồn tại, đánh dấu đã xử lý**)
8. Prompt injection + công cụ tác dụng phụ nguy hiểm vì sao? (**Agent thực hiện hành động thật, không chỉ trả lời sai**)
9. Ẩn nút "Duyệt" mà không kiểm tra API là lỗi gì? (**Thiếu kiểm tra quyền phía máy chủ**)
10. Quy tắc ba lượt là gì? (**Vượt 5 lượt sửa → reset commit sạch, phiên mới**)
11. Công thức chất lượng ≈ đặc tả × kiểm chứng là phép nhân vì sao? (**Một vế bằng KHÔNG → tích bằng KHÔNG**)
12. Hai tiêu chí "hoàn thành" hay bỏ sót nhất và bị kiểm tra trực tiếp khi bảo vệ là tiêu chí nào? (**Tiêu chí 3 và 6**)

---

## 6. CHECKLIST VÀO PHÒNG THI (75 phút)

- [ ] Đeo đồng hồ, chia thời gian: ≤ 1 phút 52 giây/câu
- [ ] Làm Phần I (28 câu tình huống) trước, sau mới Phần II (12 câu đọc sơ đồ)
- [ ] Phần II: trace token một lần bằng bút; nếu chưa ra thì đánh dấu vòng 3
- [ ] Mỗi câu chỉ chọn 1 đáp án; không có "chọn tất cả"
- [ ] Ghi đáp án trên giấy, sau khi làm xong mới đối chiếu
- [ ] Câu sai → quay lại mục tương ứng trong tài liệu chương
- [ ] Mục tiêu: ≥ 34/40 (lần 2 sau khi học lại)

---

*Hết sổ tay nhanh. Tiếp theo: rà soát lần cuối đối chiếu checklist trong `00-README-MUC-LUC.md`.*