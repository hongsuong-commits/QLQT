# ĐỀ NÂNG CAO 1 — QUYẾT ĐỊNH, NGƯỠNG VÀ LAN CAN — MIS3047

> 40 câu × 0,25 điểm = 10 điểm. **75 phút.** Một đáp án đúng.
> Phần I (1–28): tình huống vận dụng liên chương. Phần II (29–40): 12 câu đọc sơ đồ BPMN, bắt buộc trace token và đối chiếu ngữ cảnh Chương 3–5.
> ★ Đây là đề **khó hơn** các đề mô phỏng 1–4: nhiều câu có hai lớp lập luận (ký hiệu BPMN + quyết định quản trị/AI). Đừng chọn theo cảm giác; hãy chỉ ra được **căn cứ tài liệu**.

---

## PHẦN I — TÌNH HUỐNG VẬN DỤNG (1–28)

**Câu 1.** Trường có ba đối tượng: (i) văn bản "Quy định tiếp nhận hồ sơ" ghi 5 bước, biểu mẫu và cấp ký; (ii) đợt rà soát quy chế 3 tháng, có đội riêng, ngân sách riêng, kết thúc thì giải tán; (iii) dòng hồ sơ hằng ngày do 4 phòng luân chuyển, có lúc nhân viên nhắn Zalo để khỏi chờ ký. Phân loại nào đúng nhất?

A. Cả ba đều là quy trình vì đều có nhiều bước và nhiều người tham gia.
B. (i) là thủ tục/as-documented, (ii) là dự án, (iii) là quy trình as-is.
C. (i) và (iii) là dự án; chỉ (ii) là quy trình vì có mốc thời gian.
D. (i) là quy trình vì được áp dụng lặp lại; (iii) là workflow vì đã có phần mềm.

**Câu 2.** Quy trình "Cấp xác nhận học vụ" chạy 500 hồ sơ/tháng: cycle time trung bình 2 ngày, p95 = 6 ngày; 497 hồ sơ đúng hạn, 3 hồ sơ chậm do nhân viên mới nhập thiếu trường. Kết luận đúng nhất?

A. Mô hình quy trình sai, cần vẽ lại to-be và bỏ bước chờ ký.
B. Cần mua RPA để nhập liệu nhanh hơn cho 3 hồ sơ đó.
C. Vấn đề nằm ở thể hiện cá biệt (dữ liệu/vận hành), không phải ở mô hình; KPI phải đo trên tập thể hiện.
D. Tăng thêm một nhân viên ở mỗi phòng là đòn bẩy đúng.

**Câu 3.** Trường đã đo baseline, dựng to-be, cấu hình xong hệ thống và chạy ổn định về kỹ thuật. Sau 2 tháng cán bộ vẫn mở file Excel cũ và nhập lại vào hệ thống vì "không ai dạy mình dùng, không biết việc mình đổi thế nào". Theo vòng đời BPM, lỗi nằm ở đâu?

A. Giai đoạn 6 — chưa đặt KPI nên không so sánh được.
B. Giai đoạn 5 — triển khai chỉ làm nửa kỹ thuật, bỏ qua quản trị thay đổi tổ chức.
C. Giai đoạn 4 — thiết kế lại sai nên hệ thống không khớp nghiệp vụ.
D. Giai đoạn 1 — chọn sai quy trình cần cải tiến trước.

**Câu 4.** Sau một chu kỳ cải tiến, nhật ký cho thấy 40% hồ sơ vẫn quay lại bước cũ dù luồng to-be đã ban hành. Cách xử lý đúng theo vòng đời BPM là gì?

A. Dùng sai lệch đó làm đầu vào cho vòng mới: quay lại (1)–(2), cập nhật as-is và kiểm tra conformance.
B. Coi dự án đã kết thúc vì đã đi đủ 6 giai đoạn.
C. Mua ngay nền tảng process mining mới vì dữ liệu log chưa đủ.
D. Chỉ đổi KPI cho đẹp hơn để phản ánh luồng mới.

**Câu 5.** Quy trình tuyển dụng gồm: AI đọc CV dạng ảnh → hệ thống tự đặt lịch theo luật → hội đồng phỏng vấn ra quyết định cuối → bot gửi email nhắc lịch. Nhận xét đúng nhất?

A. Cả quy trình đạt A4 vì có AI.
B. Cả quy trình đạt A3 vì phần lớn không có người.
C. Đây là A5 vì có bot gửi email tự động.
D. Mức tự động hóa là thuộc tính **từng bước**: A4 → A3 → bước quyết định giữ mức thấp → A3/A2; giữ bước duyệt thấp là thiết kế đúng vì thẩm quyền và trách nhiệm cá nhân.

**Câu 6.** Một bệnh viện kiểm định thiết bị y tế 2 lần/năm, sai sót có hậu quả pháp lý và báo cáo đã phát hành không rút lại được. Tư vấn đề xuất "lên A5 agent tự kiểm định, tự phát hành báo cáo". Đánh giá đúng?

A. Đúng — A5 là mức cao nhất nên tối ưu nhất.
B. Đúng nếu dùng mô hình AI đủ mạnh để giảm sai sót.
C. Sai — tần suất thấp, thiệt hại cao, không đảo ngược ⇒ giữ A1–A2 cho xử lý và bắt buộc có người ở bước phát hành.
D. Sai, nhưng chỉ vì ngân sách; nếu có tiền thì A5 vẫn tốt hơn.

**Câu 7.** Hai hành động trong cùng hệ thống: (a) tự gắn nhãn "ưu tiên", sai thì sửa ngay; (b) tự xóa hồ sơ lưu trữ sau 30 ngày, sai thì không khôi phục và thiệt hại pháp lý lớn. Chọn mô hình human-in/on/out đúng?

A. (a) out-of-the-loop; (b) in-the-loop bắt buộc.
B. Cả hai on-the-loop vì máy đang tự làm.
C. Cả hai in-the-loop vì liên quan đến hồ sơ sinh viên.
D. Cả hai out-of-the-loop vì đã có nhật ký kiểm toán.

**Câu 8.** ERP mới đã có API ổn định, có phiên bản; khối lượng chỉ 50 ca/tháng, dữ liệu nằm sẵn trong bảng. Nhóm vẫn đề xuất bot gõ giao diện "vì RPA triển khai trong vài tuần". Kết luận đúng?

A. Đúng — RPA luôn nhanh hơn BPA nên cứ dùng RPA.
B. Đúng vì 50 ca/tháng là khối lượng lớn.
C. Sai — có API tốt là chống chỉ định của RPA; tích hợp trực tiếp bền hơn và tần suất này khó hoàn vốn chi phí bảo trì bot.
D. Sai vì BPA luôn rẻ hơn dù không cần thiết kế lại.

**Câu 9.** Bot RPA chạy tốt 6 tháng. Sau lần nâng cấp giao diện hệ thống đích, 30% ca dừng dù logic nghiệp vụ không đổi. Báo cáo ROI chỉ tính chi phí xây dựng ban đầu và kết luận "bot vẫn có lãi". Chẩn đoán đúng?

A. Bot cần huấn luyện lại bằng dữ liệu mới — RPA truyền thống có khả năng học.
B. Selector bám tọa độ/thuộc tính giao diện nên giòn; bảo trì chiếm phần lớn TCO, phải đưa vào ROI ngay từ bước 1.
C. Lỗi do nhà cung cấp tăng giá thuê bao sau 6 tháng.
D. Lỗi do mỗi bot cần một máy chủ riêng.

**Câu 10.** Nhóm đã viết nhiều script gọi API ERP, CRM, ngân hàng. Script chạy đúng từng tác vụ nhưng không nơi nào biết một hồ sơ đang ở bước nào; quá hạn thì không ai được giao việc, quy chế đổi thì sửa từng script. Theo BPA, thiếu năng lực nào là quyết định?

A. Thêm connector tới nhiều hệ thống hơn.
B. Dùng Orchestrator của RPA để điều khiển bot.
C. Cỗ máy điều phối trung tâm nắm trạng thái từng thể hiện + quản lý việc con người/leo thang + tách quy tắc khỏi luồng (DMN).
D. Chỉ cần chạy process mining để biết script nào chậm.

**Câu 11.** Xưởng bảo trì thiết bị y tế đặt ngưỡng 0,97: từ 0,97 hệ thống tự tạo lệnh bảo trì và phân công; dưới 0,97 chỉ hiện gợi ý để kỹ thuật viên tự quyết. Đây là mức tự chủ nào của Chương 3?

A. Gợi ý (mức 1).
B. Thực thi có phê duyệt (mức 2).
C. Thực thi theo ngưỡng (mức 3) — mô hình lai.
D. Tự chủ có giám sát (mức 4).

**Câu 12.** Xử lý 10.000 hồ sơ hoàn thuế nhỏ. Chi phí thủ công X = 50.000đ/hồ sơ; thiệt hại sai Y = 500.000đ/quyết định. Ngưỡng 0,90: tự động 70%, sai 2% trong nhóm tự động. Ngưỡng 0,99: tự động 30%, sai 0,4%. Chọn ngưỡng nào theo tổng chi phí kỳ vọng?

A. 0,90 — kỳ vọng ≈ 22.000đ/hồ sơ, thấp hơn ≈ 35.600đ của 0,99.
B. 0,99 — vì ngưỡng cao luôn ít sai nên luôn tốt nhất.
C. 0,99 — vì tỷ lệ sai 2% của 0,90 vượt ngưỡng 1%.
D. Không tự động hóa ở bất kỳ ngưỡng nào.

**Câu 13.** Quy trình kỷ luật sinh viên: mô hình phân loại mức vi phạm đạt 0,99, nhưng quyết định sai ảnh hưởng quyền lợi người học và không đảo ngược được. Thiết kế nào đúng?

A. Tự động hóa ở 0,99 vì độ tin cậy rất cao.
B. Hạ xuống 0,95 để tăng tỷ lệ tự động mà vẫn an toàn.
C. Dùng mẫu 6 để agent tự đối chiếu quy chế rồi tự ra quyết định.
D. Giữ hội đồng quyết định; AI chỉ tóm tắt hồ sơ — không tự động hóa bước này ở ngưỡng nào.

**Câu 14.** Agent đối soát học phí đã có mô hình mạnh, system prompt đầy đủ, 5 công cụ, bộ nhớ và vòng lặp điều khiển. Nhật ký cho thấy agent chạy 40 vòng, đã ghi bảng và gửi email mà không hỏi người, không lưu tham số lệnh gọi. Theo kiến trúc sáu thành phần, thành phần nào bị thiếu?

A. Mô hình.
B. Lan can.
C. Bộ nhớ.
D. Chỉ dẫn.

**Câu 15.** Trợ lý xử lý biên lai: trích xuất mã/số tiền làm tốt bằng mô hình nhỏ; giải quyết khiếu nại phức tạp cần lập luận. Vì sao không dùng mô hình mạnh nhất cho mọi bước?

A. Vì mô hình nhỏ không trích xuất được dữ liệu có cấu trúc.
B. Một hệ thống tốt dùng nhiều mô hình: mạnh cho lập kế hoạch/khiếu nại, nhỏ rẻ cho bước đơn giản → tiết kiệm chi phí và độ trễ.
C. Vì prompt không thể định dạng đầu ra với mô hình lớn.
D. Vì mô hình mạnh bị cấm gọi công cụ.

**Câu 16.** Phòng nhân sự cần trả lời lặp lại các câu hỏi về quy chế nghỉ phép từ 200 trang tài liệu nội bộ. Nhóm đề xuất dùng agent tự chủ tự lập kế hoạch và chọn công cụ. Đề xuất phù hợp hơn?

A. Mẫu 6 — vì câu hỏi có thể phát sinh bất thường.
B. Mẫu 4 — điều phối viên tự chia tài liệu cho nhiều thợ.
C. Mẫu 0 — một lệnh gọi kèm RAG; chi phí và độ trễ dự đoán được.
D. Mẫu 5 — vì cần nhiều vòng tinh chỉnh câu trả lời.

**Câu 17.** Đơn khiếu nại hiện được xử lý bằng một lệnh gọi vừa trích xuất thông tin vừa soạn thư; thường sót trường bắt buộc rồi lỗi lan xuống bức thư. Sửa đúng theo mẫu 1 là gì?

A. Thêm nhiều công cụ hơn cho cùng một lệnh gọi.
B. Chia thành các bước cố định: trích xuất → cổng kiểm tra đủ trường → soạn thư; đánh đổi độ trễ lấy độ đúng.
C. Đổi sang mẫu 6 để agent tự sửa sai.
D. Chỉ tăng ngưỡng tin cậy lên 0,99 mà không chia bước.

**Câu 18.** Hộp thư phòng đào tạo có 3 loại email: hỏi lịch (tự trả lời), khiếu nại điểm (chuyển chuyên viên), xin giấy tờ (kích hoạt workflow). Trong riêng nhánh khiếu nại, hệ thống còn tự xử lý khi điểm tin cậy ≥ 0,95. Mô tả đúng?

A. Chỉ cần ngưỡng tin cậy; phân loại loại đầu vào là thừa.
B. Routing rẽ theo **loại** đầu vào; ngưỡng rẽ theo **độ chắc chắn** trong từng nhánh — hai cơ chế dùng cùng nhau.
C. Dùng mẫu 3 bỏ phiếu thay cho phân loại.
D. Dùng mẫu 5 đánh giá–tinh chỉnh thay cho cổng XOR.

**Câu 19.** Hai nhu cầu: (1) chấm sơ loại 3 tiêu chí độc lập để nhanh hơn; (2) kiểm duyệt nội dung nhạy cảm bằng cùng một nhiệm vụ lặp nhiều lần để chắc hơn. Chọn đúng biến thể của mẫu 3?

A. Cả hai dùng phân đoạn (sectioning).
B. Cả hai dùng bỏ phiếu (voting).
C. (1) phân đoạn để tốc độ; (2) bỏ phiếu để độ tin cậy — phân đoạn làm việc khác nhau, bỏ phiếu làm cùng việc nhiều lần.
D. (1) bỏ phiếu; (2) phân đoạn.

**Câu 20.** Agent tổng hợp hồ sơ sự cố thiết bị: có ca chỉ cần 2 nguồn (nhật ký + ảnh), có ca cần 7 nguồn. Cách chia nhỏ chỉ biết sau khi đọc mô tả sự cố. Chọn mẫu nào?

A. Mẫu 3 — chia 3 nhánh cố định ngay lúc thiết kế.
B. Mẫu 4 — điều phối viên tự phân rã lúc chạy; số lệnh gọi và độ trễ không dự đoán trước.
C. Mẫu 0 — một lệnh gọi duy nhất.
D. Mẫu 2 — phân loại rồi dùng một nhánh xử lý giống hệt nhau.

**Câu 21.** Mẫu đánh giá–tinh chỉnh được giao chỉ số "tỷ lệ phiếu giảm giá được duyệt tự động". Sau vài vòng, bộ sinh duyệt cả phiếu thiếu điều kiện để chỉ số tăng, dù nghiệp vụ sai. Đây là gì và xử lý thế nào?

A. Dao động — chỉ cần tăng giới hạn lên 10 vòng.
B. Reward hacking — cần kiểm tra bằng luật nghiệp vụ và cải thiện đầu vào/ngữ cảnh, không chỉ tăng số vòng.
C. Không hội tụ — hạ nhiệt độ về 0 là đủ.
D. Bế tắc — đổi cổng gộp AND sang XOR.

**Câu 22.** Agent tự đối soát dữ liệu hằng đêm không có sơ đồ luồng định sẵn. Kiểm toán viên yêu cầu "sơ đồ agent đã đi". Phản hồi đúng nhất?

A. Không có sơ đồ định trước; đường đi sinh lúc chạy — thay bằng nhật ký: công cụ, tham số, kết quả, thời điểm; kèm giới hạn vòng/quyền/phê duyệt.
B. Vẽ lại BPMN sau mỗi lần chạy để nộp kiểm toán.
C. Đổi sang mẫu 3 vì mẫu 6 không kiểm toán được.
D. Chỉ cần system prompt đầy đủ, không cần nhật ký.

**Câu 23.** Nhóm đã cấu hình webhook, connector, node IF/loop và chạy đúng dữ liệu mẫu. Trước production, quản trị viên hỏi: "Lỗi có sinh cảnh báo không? Retry thế nào? Có dev/prod, phiên bản và tách quyền sửa/chạy/xem log không?" Theo kiến trúc ba lớp, nhóm đang thiếu gì?

A. Lớp 1 — Kích hoạt & kết nối.
B. Lớp 2 — Điều phối & logic.
C. Lớp 3 — Thực thi & vận hành.
D. Không thiếu; BPMN đã bao gồm sẵn các tính năng đó.

**Câu 24.** Chuyên viên dán khóa API trực tiếp vào 3 node và dùng tài khoản Google cá nhân. Khóa lộ trong bản xuất JSON; khi chuyên viên nghỉ việc workflow chết. Sửa đúng nhất?

A. Dán khóa vào một node "cấu hình" công khai để dễ đọc.
B. Lưu credential trong kho riêng của nền tảng, không hard-code; dùng tài khoản dịch vụ với quyền tối thiểu.
C. Cấp quyền quản trị cho tài khoản dịch vụ để khỏi sửa nhiều lần.
D. Chia sẻ tài khoản cá nhân cho cả nhóm nhưng ẩn node credential.

**Câu 25.** Hai workflow: (1) sinh viên thực tập tạo workflow phát hệ quả đến điểm của cả khóa; (2) trưởng phòng tạo workflow chỉ nhắc lịch cho riêng mình. Phân tầng quản trị đúng?

A. (1) Tầng 1, (2) Tầng 3 — vì chức vụ quyết định.
B. Cả hai Tầng 2 — vì đều dùng no-code.
C. (1) Tầng 2, (2) Tầng 1 — vì một cái nhiều người dùng, cái kia cá nhân.
D. (1) Tầng 3 (hệ quả rộng), (2) Tầng 1 (chỉ ảnh hưởng người tạo) — phân loại theo tác động, không theo chức vụ.

**Câu 26.** Workflow 80 node không chú thích, tên node để mặc định "HTTP Request 1", "IF 2". Người mới nhận xét: "Trực quan thì luôn dễ hiểu hơn mã." Đánh giá đúng?

A. Đúng — trực quan luôn dễ đọc hơn 200 dòng mã.
B. Đây là nợ kỹ thuật trực quan; phòng trực tiếp bằng nguyên tắc đặt tên có ý nghĩa và module hóa.
C. Đây là vendor lock-in; phòng bằng xuất JSON/XML/BPMN.
D. Đây là chi phí tăng phi tuyến; phòng bằng ước tính sau 12 tháng.

**Câu 27.** Đối tác gửi đơn qua API cũ không hỗ trợ webhook. Nghiệp vụ cần dữ liệu mới trong 2–3 phút; chạy cuối ngày là quá trễ. Chọn trigger nào?

A. Webhook — luôn là lựa chọn tốt nhất dù nguồn không hỗ trợ.
B. Schedule/cron mỗi đêm — dễ kiểm soát tải nhất.
C. Polling với chu kỳ ngắn 1–5 phút — phương án thay thế khi không có webhook.
D. Thủ công — vì cần con người kiểm soát từng đơn.

**Câu 28.** Node trước trả 120 bản ghi sinh viên. Cần: 120 email xác nhận riêng + 1 email tổng hợp cho trưởng khoa + 1 dòng tổng kết vào bảng. Cách làm đúng?

A. Đặt một node gộp ngay sau node trước — mọi node sau đều chạy đúng 1 lần.
B. Giữ hành vi item cho 120 email xác nhận; thêm nhánh GỘP riêng trước email tổng hợp và dòng tổng kết.
C. Giảm mảng về 1 bản ghi rồi nhân bản tay.
D. Đổi trigger sang schedule để node chỉ chạy một lần.

---

## PHẦN II — ĐỌC SƠ ĐỒ BPMN KẾT HỢP CHƯƠNG 3–5 (29–40)

> Mỗi câu chỉ trace **một lần bằng bút**. Đáp án đúng phải khớp cả hai lớp: ký hiệu BPMN và hệ quả quản trị/AI được hỏi.

### Sơ đồ A — Cổng lồng nhau với OR tách

```
Start ─► +1 ─┬─► X1 ─┬(A)─► a ─► X2 ─┐
             │       └(B)─► b ──────┘
             └─► O1 ─┬(có BH)─► c ─► +2 ─┐
                     └(có HS)─► d ──────┘
                                          +3 ─► E ─► End
```

**Câu 29.** Case 1: hồ sơ có cả BH và HS, X1 chọn A. Case 2: chỉ có BH. Đếm token đúng?

A. Case 1: +3 nhận 1 từ trên + 1 từ dưới → ra 1, E chạy 1 lần. Case 2: OR chỉ bật c, +2 chờ d mãi → bế tắc.
B. Case 1: +3 nhận 4 token → ra 2. Case 2: vẫn ra 1 vì OR tự bỏ nhánh không kích hoạt.
C. Case 1: +3 nhận 1 + 2 → chờ nhánh thứ ba. Case 2: X2 sinh thêm token để bù cho d.
D. Case 1: X2 gộp sai nên 2 token đi tiếp. Case 2: +3 chạy 2 lần.

**Câu 30.** Theo Chương 5, Case 2 đáng lẽ phải là một ca kiểm thử bắt buộc vì nó phơi bày giả định ngầm nào?

A. Giả định rằng cổng OR tách luôn bật nhiều nhánh, nên AND gộp chắc chắn có đủ token.
B. Giả định rằng mô hình có ít hơn 30 phần tử thì không cần kiểm thử.
C. Giả định rằng agent sẽ tự sửa lỗi này sau 3 vòng.
D. Giả định rằng dữ liệu đầu ra đã đúng JSON schema.

### Sơ đồ B — Event-based gateway và phản hồi muộn

```
[Gửi yêu cầu] ─► <> ─┬─► (msg) Nhận trả lời ─► [Xử lý] ─► End1
                     └─► (timer 7 ngày) ──────► [Hủy] ─► End2
```

**Câu 31.** Phản hồi đến ngày thứ 9. Điều gì xảy ra?

A. Message flow mang token nên nhánh message vẫn chạy dù timer đã thắng.
B. Cả hai nhánh chạy song song; End1 và End2 đều có token.
C. Timer ngày 7 thắng; nhánh message bị hủy, trả lời ngày 9 không được tiêu thụ bởi thể hiện này.
D. Hệ thống báo lỗi cú pháp vì có hai sự kiện cùng chờ.

**Câu 32.** Vì sao không thay `<>` bằng XOR + nhánh mặc định cho đúng ý nghiệp vụ "chờ bên ngoài trả lời"?

A. XOR cũng chờ sự kiện nhưng chậm hơn 7 ngày.
B. Event-based gateway chờ **sự kiện tương lai**; XOR chọn ngay từ **dữ liệu đã có** — thay bằng XOR mất hoàn toàn ý nghĩa chờ.
C. XOR không có nhánh mặc định nên sẽ bế tắc.
D. XOR chỉ dùng được trong cùng một pool.

### Sơ đồ C — Error boundary và escalation không ngắt

```
Start ─► [Gọi API thanh toán] ─► [Ghi sổ] ─► End
             ╎(error, LIỀN)──────► [Log lỗi] ─► End1
             ╎(escalation, ĐỨT)─► [Báo trưởng phòng] ─► End2
```

Escalation xảy ra ngày 2 trong khi API task vẫn chạy; error xảy ra ngày 3.

**Câu 33.** Đếm token và kết quả cuối?

A. Error không ngắt nên [Ghi sổ] vẫn chạy sau khi log lỗi.
B. Escalation hủy token chính; error chỉ sinh token phụ.
C. Escalation sinh token phụ, token chính vẫn nằm trong task; error luôn ngắt hủy token chính → End1 và End2 đều có token, [Ghi sổ] không chạy.
D. Hai sự kiện biên khác loại không được gắn cùng một task.

**Câu 34.** Nếu nhánh [Log lỗi] retry mà không có khóa định danh duy nhất, theo Chương 4 rủi ro gì xuất hiện dù BPMN đã đúng?

A. Bế tắc do AND gộp chờ nhánh error.
B. Ghi log trùng / tác dụng phụ lặp lại — vi phạm idempotency.
C. Token bị nhân bản vô hạn do marker đa thể hiện.
D. Mô hình vi phạm G7 vì vượt 30 phần tử.

### Sơ đồ D — Transaction với hoàn tác một phần

```
╔══ TRANSACTION (viền đôi) ═══════════════════════════════╗
║ [1 Giữ chỗ]─►[2 Đặt phòng]─►[3 Thu phí]─►(X cancel)      ║
║    ↺Trả chỗ      ↺Hủy phòng      ↺Hoàn tiền             ║
╚═══════════════════════════════════════════════════════════╝
```

Bước 1 và 2 đã hoàn tất; bước 3 lỗi trước khi hoàn tất; đi tới cancel.

**Câu 35.** Compensation handler nào chạy, thứ tự nào?

A. Hoàn tiền → Hủy phòng → Trả chỗ (cả ba).
B. Trả chỗ → Hủy phòng → Hoàn tiền (cùng chiều thực hiện).
C. Hủy phòng → Trả chỗ; Hoàn tiền không chạy vì bước 3 chưa hoàn tất.
D. Chỉ Hoàn tiền chạy vì lỗi phát sinh ở bước 3.

**Câu 36.** Theo Chương 5, nhánh cancel này bắt buộc phải xuất hiện trong danh sách kiểm thử vì lý do nào?

A. Vì là ngoại lệ đã được mô hình hóa; tiêu chí hoàn thành số 1 yêu cầu chạy đúng kịch bản chính **và ngoại lệ**.
B. Vì transaction luôn làm tăng số commit.
C. Vì compensation làm mã ngắn hơn.
D. Vì agent mẫu 6 không cần nhật ký.

### Sơ đồ E — Call activity và sub-process nhúng

```
Mua sắm:   Start ─► ▓[Phê duyệt chi tiêu: tiền, nguồn] ─► End
Công tác:  Start ─► ▓[Phê duyệt chi tiêu: tiền, nguồn] ─► End

Khác:      Start ─► [Thẩm định] ─► +[Gom chứng từ] ─► End
                                   (viền mảnh, dấu +)
```

**Câu 37.** Quy chế chi tiêu đổi. Chỗ sửa và hệ quả dữ liệu?

A. Sửa ba nơi; call activity dùng chung dữ liệu với quy trình cha.
B. Sửa MỘT quy trình "Phê duyệt chi tiêu" được gọi; mọi caller dùng phiên bản mới, dữ liệu truyền qua tham số; khung viền mảnh `+` là embedded sub-process, dùng chung dữ liệu cha, không gọi được từ ngoài.
C. Sửa trong khung viền mảnh `+`; call activity không tái sử dụng được.
D. Dùng chung một data store để đồng bộ luật.

**Câu 38.** Theo Chương 4, hoạt động nào của Lớp 3 cần thiết để "mọi caller dùng phiên bản mới" mà không làm workflow cũ chạy sai?

A. Đổi tên node cho có ý nghĩa.
B. Quản lý phiên bản + môi trường dev/prod + phân quyền sửa/chạy/xem log.
C. Tăng số connector tới hệ thống cũ.
D. Chuyển trigger sang webhook.

### Sơ đồ F — Đa thể hiện song song

```
Start ─► [Gửi báo giá cho 3 NCC] (||| dọc) ─► [Tổng hợp] ─► End
```

**Câu 39.** Số lần chạy, số token trên luồng ra, và ý nghĩa nếu đổi sang `≡` ngang?

A. 1 lần, 3 token ra; ngang là loop marker.
B. 3 lần song song, luồng ra chỉ 1 token sau khi đủ 3 instance; `≡` ngang = tuần tự, luồng ra vẫn 1 token.
C. 3 lần tuần tự, 3 token ra; dọc là tuần tự.
D. Dọc là rework; nên cắt bỏ.

**Câu 40.** Nếu node này là bước "bỏ phiếu" trong mẫu 3 của Chương 3, nhận xét đúng?

A. Đây là phân đoạn (sectioning): ba việc khác nhau để nhanh hơn.
B. Đây là bỏ phiếu (voting): cùng một việc lặp nhiều lần để chắc hơn; cần cổng kiểm tra/đếm phiếu trước khi đi tiếp.
C. Đây là mẫu 4 vì số instance không biết trước.
D. Đây là reward hacking vì sinh ra nhiều kết quả.

---

## ĐÁP ÁN VÀ GIẢI THÍCH NGẮN

| Câu | Đáp án | Gợi ý |
|---|---|---|
| **1** | **B** | Thủ tục là văn bản/as-documented; đợt rà soát có tính duy nhất = dự án; dòng công việc thực tế có lối tắt Zalo = as-is. |
| **2** | **C** | Chậm ở 3 instance cá biệt không có nghĩa mô hình sai; đo lường luôn trên tập thể hiện. |
| **3** | **B** | Giai đoạn 5 có hai nửa: quản trị thay đổi + hiện thực kỹ thuật; bỏ nửa đầu → hệ thống tốt nhưng không ai dùng. |
| **4** | **A** | Giám sát (6) quay lại làm đầu vào (1)–(2); BPM là chu trình, không phải dự án kết thúc. |
| **5** | **D** | Mức tự động hóa định vị ở từng bước; bước quyết định giữ người vì thẩm quyền/trách nhiệm. |
| **6** | **C** | Mức cao không mặc nhiên tốt; tần suất thấp + không đảo ngược → giữ người phê duyệt. |
| **7** | **A** | Thiệt hại thấp + đảo ngược được → out; thiệt hại cao + không đảo ngược → in. |
| **8** | **C** | API tốt là chống chỉ định RPA; bảo trì bot khó hoàn vốn ở 50 ca/tháng. |
| **9** | **B** | Selector giòn khi giao diện đổi; bảo trì chiếm phần lớn TCO, phải tính từ đầu. |
| **10** | **C** | BPA cần engine nắm trạng thái instance, việc người/leo thang và DMN tách luật. |
| **11** | **C** | Mức 3 = tự thi hành khi đạt ngưỡng, còn lại do người; khác mức 2 vì không phê duyệt từng ca. |
| **12** | **A** | 0,90: 0,3×50k + 0,7×0,02×500k = 22k; 0,99: 0,7×50k + 0,3×0,004×500k = 35,6k. Chọn min chi ph kỳ vọng. |
| **13** | **D** | Y lớn và không đảo ngược → đáp án đúng có thể là không tự động hóa ở bất kỳ ngưỡng nào. |
| **14** | **B** | Lan can gồm giới hạn vòng/token, phê duyệt hành động không đảo ngược, kiểm tra đầu ra, nhật ký. |
| **15** | **B** | Mạnh cho lập kế hoạch, nhỏ rẻ cho bước đơn giản — đánh đổi năng lực/độ trễ/chi phí. |
| **16** | **C** | Mẫu 0 = một lệnh gọi + RAG; một bước + dữ liệu nội bộ không cần agent. |
| **17** | **B** | Mẫu 1 chia bước và đặt cổng kiểm tra giữa chừng; lỗi bị chặn sớm, đổi lấy độ trễ. |
| **18** | **B** | Routing hỏi "là cái gì"; ngưỡng hỏi "chắc đến đâu" — dùng cùng nhau. |
| **19** | **C** | Phân đoạn = việc khác nhau để nhanh; bỏ phiếu = cùng việc nhiều lần để chắc. |
| **20** | **B** | Mẫu 4: số lượng/nội dung việc con không biết trước → chi phí, độ trễ không dự đoán được. |
| **21** | **B** | Reward hacking: tối ưu bộ đánh giá thay vì đúng nghiệp vụ; sửa ngữ cảnh/luật, không chỉ tăng vòng. |
| **22** | **A** | Mẫu 6 không có sơ đồ định trước; nhật ký thay vai trò sơ đồ luồng. |
| **23** | **C** | Lớp 3 gồm runtime, log, retry/queue, dev/prod, phiên bản, phân quyền — không có trong BPMN. |
| **24** | **B** | Credential trong kho riêng, không hard-code, tài khoản dịch vụ quyền tối thiểu. |
| **25** | **D** | Quản trị tỷ lệ thuận với rủi ro/tác động, không với chức vụ người tạo. |
| **26** | **B** | 80 node không tên là nợ kỹ thuật trực quan; đặt tên có ý nghĩa + module hóa. |
| **27** | **C** | Không có webhook thì polling chu kỳ ngắn là phương án thay thế cho độ trễ ~phút. |
| **28** | **B** | Hành vi mặc định là theo ITEM; gộp chỉ ở nhánh cần tổng hợp. |
| **29** | **A** | XOR tách/gộp ra 1; OR tách bật cả hai thì AND gộp ra 1; chỉ bật một thì AND chờ mãi. |
| **30** | **A** | Giả định ngầm rằng OR chắc bật nhiều nhánh → F2; phải đưa Case 2 vào ca kiểm thử. |
| **31** | **C** | Event-based: sự kiện đầu tiên thắng, nhánh còn lại bị hủy; message flow không mang token. |
| **32** | **B** | Event-based chờ tương lai; XOR quyết ngay từ dữ liệu hiện có. |
| **33** | **C** | Đứt = không ngắt → token phụ; error luôn ngắt → hủy token chính; nhánh phụ đã sinh vẫn chạy. |
| **34** | **B** | Retry cùng dữ liệu mà không có khóa định danh → kết quả lặp; vi phạm idempotency. |
| **35** | **C** | Chỉ hoạt động đã hoàn tất được bù trừ; thứ tự ngược: bước 2 rồi bước 1. |
| **36** | **A** | Ngoại lệ đã mô hình hóa là ca kiểm thử; tiêu chí 1 yêu cầu kịch bản chính và ngoại lệ. |
| **37** | **B** | Call activity định nghĩa riêng, tái sử dụng, truyền tham số; embedded dùng chung dữ liệu cha. |
| **38** | **B** | Lớp 3 quản lý phiên bản/dev-prod/ quyền — điều kiện để cập nhật an toàn mọi caller. |
| **39** | **B** | `|||` = song song, `≡` = tuần tự; cả hai đi tiếp bằng một token sau khi đủ instance. |
| **40** | **B** | Bỏ phiếu là cùng một việc lặp nhiều lần; cần cơ chế đếm/kiểm tra trước khi đi tiếp. |
