# ĐỀ NÂNG CAO 3 — ĐỌC SƠ ĐỒ, KIỂM TOÁN VÀ CẢI TIẾN — MIS3047

> 40 câu × 0,25 điểm = 10 điểm. **75 phút.** Một đáp án đúng.
> Phần I (1–28): tình huống vận dụng liên chương. Phần II (29–40): 12 câu đọc sơ đồ BPMN, trong đó nhiều câu chỉ chọn được khi áp dụng Chương 3–5.
> ★ Đề này "đánh bẫy" chỗ đẹp nhưng sai: sơ đồ gọn mà ngữ nghĩa sai, agent chạy được mà không kiểm toán được, workflow gửi đúng email nhưng sai số lượng.

---

## PHẦN I — TÌNH HUỐNG VẬN DỤNG (1–28)

**Câu 1.** Một tác vụ RPA được chấm 5/7 điều kiện (luật rõ, dữ liệu cấu trúc, giao diện ổn định, ít bối cảnh, ít cảm xúc), nhưng khối lượng chỉ 12 ca/tháng và hệ thống đích đã có API tốt; 25% ca phát sinh ngoại lệ. Kết luận đúng?

A. Đạt 5/7 nên triển khai RPA — chấm theo số điều kiện đạt.
B. Không triển khai vì RPA không học được; chỉ cần thay bằng AI.
C. Chấm 7 điều kiện có trọng số và đánh giá ở cấp **tác vụ**: ngoại lệ >~20% phải xem lại thiết kế, API tốt là chống chỉ định, tần suất thấp khó hoàn vốn bảo trì.
D. Triển khai BPA ngay vì BPA luôn rẻ hơn dù chưa thiết kế lại.

**Câu 2.** Quy trình có bước cũ trên hệ thống không API, nhưng các bước trước/sau đã nằm trong engine BPM. Cách phối hợp đúng giữa BPA và RPA?

A. Chọn một trong hai; hai công nghệ loại trừ nhau.
B. BPA điều phối đầu–cuối và gọi bot RPA như một tác nhân cho đúng bước giao diện cũ — hai công nghệ bổ sung cho nhau.
C. Dùng RPA cho toàn bộ quy trình để thống nhất một công cụ.
D. Dùng BPA nhưng bắt bot RPA làm orchestrator.

**Câu 3.** Quy chế học bổng đổi hằng năm; luật nằm rải trong 7 node IF của workflow, mỗi lần đổi phải sửa từng node và test lại toàn bộ. Thiết kế đúng theo BPA là gì?

A. Gom các node IF thành một script task duy nhất.
B. Tách quy tắc ra bảng quyết định DMN/business rule task; luồng chỉ gọi bảng, khi quy chế đổi chỉ sửa bảng quy tắc.
C. Chuyển sang agent tự đọc quy chế mỗi lần chạy.
D. Xóa hết điều kiện để quy trình chạy nhanh hơn.

**Câu 4.** Hai quy trình cùng dùng một mô hình: quy trình A chạy 2.000 thể hiện/tháng, quy trình B chạy 3 thể hiện/tháng. Theo Chương 1, nhận xét đúng về tự động hóa?

A. Khối lượng không ảnh hưởng quyết định, chỉ cần luật rõ.
B. Nên tự động hóa B trước vì ít thể hiện nên ít rủi ro hơn.
C. Khối lượng thể hiện là điều kiện kinh tế: A có nhiều khả năng hoàn vốn; B nên cân nhắc giữa chi phí bảo trì và lợi ích thu được.
D. Cả hai phải đạt cùng mức A5 vì cùng mô hình.

**Câu 5.** Tài liệu ghi quy trình "xét học bổng" có 5 bước. Phỏng vấn người trực tiếp làm thì ra 9 bước, có lúc nhắn Zalo để khỏi chờ ký. Cách xác định as-is đúng nhất?

A. Tin tài liệu vì as-documented là chuẩn đã phê duyệt.
B. Xem dữ liệu/nhật ký và hỏi người trực tiếp làm: as-is là dòng công việc thực tế, có thể khác văn bản; chính lối tắt Zalo là dữ liệu quan trọng.
C. Vẽ ngay to-be và bỏ qua as-is để tiết kiệm thời gian.
D. Coi 9 bước là lỗi cá nhân, không phải quy trình.

**Câu 6.** Phân biệt đúng A4 và A5 trong tình huống sau?

A. AI đề xuất mức học bổng và chuyên viên bấm duyệt từng hồ sơ là A4; người chỉ đặt mục tiêu/ngân sách và kiểm toán sau là A5.
B. Cả hai là A5 vì đều có AI.
C. A4 là không có người; A5 là có người bấm nút.
D. A4 và A5 giống nhau, chỉ khác tên gọi.

**Câu 7.** Mô hình BPMN có cú pháp đúng, engine chạy được, nhưng AI sinh ra ứng dụng cho phép sinh viên tự duyệt vì OR tách được hiểu là "chọn một". Nghiệp vụ nói "chỉ được chọn đúng một". Tiêu chí chất lượng nào bị vi phạm trước tiên?

A. Cú pháp (syntax).
B. Ngữ nghĩa (semantics) — mô hình đúng hình thức nhưng sai ý nghĩa nghiệp vụ.
C. Hiệu năng.
D. Không vi phạm vì engine vẫn chạy.

**Câu 8.** Hai start event đại diện cho hai kênh nộp đơn (trực tuyến và trực tiếp), dù kết quả đều đi vào một luồng xét duyệt. Theo 7PMG, cách sửa đúng?

A. Gộp thành một start event rồi dùng XOR tách theo kênh — G3: một start cho mỗi quy trình, sai dạng chỉ nên có một điểm vào.
B. Giữ hai start vì mỗi kênh là một quy trình riêng hoàn toàn.
C. Đổi hai start thành hai terminate end.
D. Thêm một cổng AND sau hai start để gộp chúng.

**Câu 9.** Công thức IA = BPM + RPA + AI + Analytics. Vì sao Analytics bắt buộc, đặc biệt khi có AI?

A. Vì Analytics là tên khác của RPA.
B. Vì Analytics thay thế hoàn toàn BPM.
C. Vì AI có tính xác suất, sai nhưng trông hợp lý, nên phải đo liên tục để phát hiện.
D. Vì Analytics chỉ cần khi có on-premise.

**Câu 10.** Nhận xét đúng về khác biệt RPA và IA khi vận hành?

A. RPA sai im lặng còn IA sai ồn ào.
B. RPA sai ồn ào (dừng ở giao diện, dễ thấy); IA sai im lặng (kết quả sai nhưng trông hợp lý) nên cần giám sát đo lường chặt hơn.
C. Cả hai đều không bao giờ sai nếu có nhật ký.
D. IA luôn dừng ngay khi sai nên dễ phát hiện hơn RPA.

**Câu 11.** Mô hình trưởng thành AI năm chiều bị chặn ở chiều dữ liệu: dữ liệu đầu vào thiếu, nhiễu, không có nhãn. Nhóm muốn mua mô hình lớn nhất để "vượt" điểm yếu. Đánh giá đúng?

A. Sai — năng lực bị chặn bởi chiều yếu nhất; không có dữ liệu ở G1 thì không huấn luyện/đánh giá được ở G3, công nghệ đỉnh cao không cứu dữ liệu bẩn.
B. Đúng — mô hình mạnh tự sửa dữ liệu bẩn.
C. Đúng vì chiều dữ liệu chỉ quan trọng ở G5.
D. Sai vì phải tăng số agent thay vì sửa dữ liệu.

**Câu 12.** Quy trình duyệt giảm giá cho sinh viên: AI trích xuất và đối chiếu quy chế, luật chặn nếu vượt định mức, trưởng khoa là người chịu trách nhiệm quyết định cuối. Diễn đạt đúng nguyên tắc thiết kế là gì?

A. AI quyết định, luật chỉ gợi ý, con người xem log.
B. Luật quyết định, AI chỉ được dùng để làm đẹp giao diện.
C. AI chuẩn bị — luật quyết định — con người chịu trách nhiệm.
D. Con người chuẩn bị — AI quyết định — luật chỉ để tham khảo.

**Câu 13.** Agent có hai công cụ: `doc_search` (chỉ đọc tài liệu) và `send_email` (gửi email cho sinh viên). Theo Chương 3, thiết kế an toàn đúng?

A. Cấp cả hai quyền mặc định để agent làm nhanh.
B. Phân biệt công cụ chỉ đọc và công cụ có tác dụng phụ; `send_email` chỉ bật khi thật cần và cần phê duyệt/kiểm tra đầu ra.
C. Gộp hai công cụ thành một để giảm số lượng công cụ.
D. Chỉ cần giới hạn số vòng, không cần phân quyền công cụ.

**Câu 14.** System prompt của agent có đủ vai trò, phạm vi, quy tắc, định dạng, giới hạn — nhưng thiếu một nội dung hay quên. Agent vì thế tự xóa hồ sơ khi không chắc thay vì dừng lại. Nội dung bị thiếu là gì?

A. Danh sách connector.
B. Nhiệt độ sinh.
C. "Điều agent KHÔNG được làm" và "khi nào phải dừng lại hỏi người".
D. Số token tối đa của mô hình.

**Câu 15.** Nhóm đổi mô hình ba lần nhưng câu trả lời về quy chế vẫn sai. Câu hỏi đúng cần hỏi trước theo Chương 3 là gì?

A. Mô hình có phiên bản mới nhất không?
B. Agent có đủ thông tin trong ngữ cảnh/đoạn truy hồi không — 80% lỗi do ngữ cảnh.
C. Có bao nhiêu công cụ đã được gắn?
D. Agent chạy bao nhiêu vòng mỗi lần?

**Câu 16.** Báo cáo đánh giá agent có 4 nhóm chỉ số. Nhận xét đúng về "số lần người can thiệp"?

A. Càng thấp càng tốt, không cần nghi ngờ.
B. Càng cao càng chứng tỏ agent cẩn thận.
C. Chỉ cần đo chất lượng; can thiệp không phải chỉ số.
D. Can thiệp cao quá = agent chưa dùng được; can thiệp thấp bất thường = lan can có thể quá lỏng — đây là chỉ số hai mặt.

**Câu 17.** Quy trình có 3 nhánh cố định biết trước từ lúc thiết kế: trích xuất, đối chiếu, tổng hợp; cần chạy đồng thời để nhanh hơn. Chọn mẫu thiết kế phù hợp nhất?

A. Mẫu 3 phân đoạn (sectioning) — nhiều việc khác nhau, số lượng và nội dung biết trước.
B. Mẫu 4 điều phối–thợ — vì muốn chạy song song.
C. Mẫu 6 — vì không có sơ đồ định sẵn.
D. Mẫu 5 — vì cần nhiều vòng tinh chỉnh.

**Câu 18.** Mẫu 6 có bốn điều kiện bắt buộc. Agent đã có giới hạn vòng, giới hạn quyền và điểm dừng phê duyệt, nhưng không lưu tham số công cụ và kết quả trung gian. Điều kiện nào còn thiếu?

A. Giới hạn vòng.
B. Giới hạn quyền.
C. Điểm dừng phê duyệt.
D. Nhật ký kiểm toán đầy đủ — không có nhật ký thì không giải thích được.

**Câu 19.** Trong fusion team, vai trò đúng của nghiệp vụ và CNTT là gì?

A. Nghiệp vụ viết mã, CNTT viết quy chế.
B. Nghiệp vụ thiết kế logic; CNTT tích hợp, bảo mật và vận hành — làm cùng lúc trên cùng sản phẩm.
C. CNTT thiết kế logic, nghiệp vụ chỉ nghiệm thu cuối.
D. Hai bên làm riêng rẽ rồi "ném qua tường".

**Câu 20.** Trong bộ 10 tiêu chí chọn nền tảng, vì sao HTTP node được gọi là "van an toàn"?

A. Vì nó làm giao diện đẹp hơn.
B. Vì nó thay thế hoàn toàn connector có sẵn.
C. Vì khi connector có sẵn không đáp ứng, vẫn có đường gọi API tùy ý để không bị khóa cứng vào nền tảng.
D. Vì nó tự động tạo credential.

**Câu 21.** Nhân viên nghiệp vụ tự xây workflow bằng công cụ được tổ chức phê duyệt, có người sở hữu và được rà soát định kỳ. Đây là gì?

A. Citizen developer hợp pháp — cùng hành vi nhưng có phê duyệt nên là năng lực, không phải Shadow IT.
B. Shadow IT vì bất cứ người không phải IT đều không được xây workflow.
C. Agentic Coding mức C5.
D. RPA orchestrator.

**Câu 22.** Workflow chạy đúng trên dữ liệu mẫu nhưng production gãy vì node sau nhận sai tên trường. Theo 6 bước xây workflow, bước hay bỏ qua nào cần bổ sung?

A. Đặt tên node có ý nghĩa.
B. Hợp đồng dữ liệu input/output/khóa giữa các node.
C. Tăng số retry lên 5.
D. Đổi trigger sang webhook.

**Câu 23.** Hệ thống retry khi lỗi tạm thời trên connector, nhưng lại retry cả lỗi "sai định dạng dữ liệu" và không có kênh cảnh báo có người nhận. Đánh giá đúng?

A. Retry nhiều lần luôn tốt hơn.
B. Chỉ cần tăng thời gian chờ giữa các lần retry.
C. Cần tắt hoàn toàn retry.
D. Retry chỉ cho lỗi tạm thời; cảnh báo phải có kênh có người nhận; workflow không còn cần thiết thì rà soát và ngừng theo quý.

**Câu 24.** Ca kiểm thử dùng chuỗi "Trần Thị B", email `abc@`, số điện thoại có dấu gạch ngang, và một trường bắt buộc để trống. Nhóm nào kiểm thử đang được thực hiện?

A. Dữ liệu bẩn.
B. Happy path.
C. Lỗi hệ thống.
D. Idempotency.

**Câu 25.** Agent trả lời đúng 3/5 ý của quy chế, 2 ý còn lại do mô hình tự suy diễn. Cách sửa đúng theo RAG?

A. Cho mô hình suy diễn thêm để câu trả lời đầy đủ hơn.
B. Tăng số đoạn truy hồi lên 50 đoạn bất kể liên quan.
C. Buộc trả lời dựa trên đoạn đã truy hồi kèm trích dẫn; nếu đoạn không đủ thì báo thiếu thông tin, không tự viết phần còn lại.
D. Bỏ trích dẫn để câu trả lời gọn hơn.

**Câu 26.** Cần tự động hóa bước "đổi trạng thái hồ sơ sang đã duyệt trong CSDL nội bộ" với dữ liệu có cấu trúc. Theo 3 mức tích hợp AI của Chương 4, hỏi nào nên hỏi trước?

A. Có nên dùng agent mức 3 ngay không?
B. Mức 1 (node xác định/quy tắc) có giải quyết được không — chỉ nâng cấp nếu thật sự cần phán đoán.
C. Mô hình nào có nhiều token nhất?
D. Có bao nhiêu agent chạy song song?

**Câu 27.** Giao diện ẩn nút "Xóa hồ sơ" với sinh viên, nhưng API vẫn cho gọi trực tiếp và trả về thành công. Đây là lỗi nào trong F9?

A. Lộ khóa bí mật.
B. Thiếu kiểm tra quyền phía máy chủ.
C. SQL injection.
D. Logic để trống (stub).

**Câu 28.** Dự án chạy được hôm nay, nhưng không có README, không khóa phiên bản thư viện, không ghi chú reason của các quyết định. Theo Chương 5, đây là mẫu nào?

A. F1 — prompt mơ hồ.
B. F5 — ảo giác thư viện.
C. F10 — nợ kỹ thuật vô hình; sản phẩm chạy được nên rất khó nhận ra cho đến khi người khác chạy hoặc nâng cấp gói.
D. F11 — vấn đề 70%.

---

## PHẦN II — ĐỌC SƠ ĐỒ BPMN KẾT HỢP CHƯƠNG 3–5 (29–40)

### Sơ đồ A — Loop marker và làm lại có xác suất

```
(a) Start ─► [Nhập mã] (↻ loop marker) ─► [Lưu] ─► End

(b) Start ─► X ─(sai, p=20%)─► [Nhập lại] ─┐
             └(đúng)────────► [Lưu] ─► End │
                              ▲────────────┘
```

**Câu 29.** Với p = 20%, số lần trung bình đoạn "Nhập mã" trong mô hình (b) là bao nhiêu?

A. 1,2 lần — cộng thêm 20% của 1 lần.
B. 1 lần — không tính được vì có marker.
C. 5 lần — bằng 1/p.
D. 1,25 lần — bằng 1/(1−p).

**Câu 30.** Vì sao mô hình phân tích không nên chỉ dùng marker ở (a)?

A. Marker che giấu điều kiện và điểm quay lại, không cho phép gắn xác suất/thời gian làm lại để mô phỏng và đo lường.
B. Marker làm tăng số token vô hạn.
C. Marker chỉ được dùng trong transaction.
D. Marker vi phạm G7 vì luôn vượt 30 phần tử.

### Sơ đồ B — Error end bên trong sub-process nhúng

```
Start ─► + ─┬─► [Thẩm định (embedded)]
            │      └─► (error end: "Thiếu chứng từ")
            │      ╎(error boundary, LIỀN trên sub-process)
            │      └──► [Yêu cầu bổ sung] ─► End1
            └─► [Kiểm tra tài chính] ─► End2
```

**Câu 31.** Error end trong sub-process kích hoạt. Chuyện gì với nhánh tài chính?

A. Toàn bộ instance dừng như terminate.
B. Error boundary bắt error, hủy token bên trong sub-process; nhánh [Kiểm tra tài chính] vẫn chạy tới End2.
C. Error boundary không bắt được error phát ra từ bên trong sub-process.
D. Phải đổi error boundary thành escalation boundary mới bắt được.

**Câu 32.** Nếu thay error boundary bằng terminate end trong sub-process, kết quả khác đi thế nào?

A. Terminate dừng toàn bộ instance, xóa mọi token kể cả nhánh tài chính; error boundary chỉ ảnh hưởng đúng hoạt động gắn biên.
B. Không khác nhau.
C. Terminate chỉ kết thúc nhánh đang chạy, error boundary mới dừng toàn bộ.
D. Terminate chỉ dùng cho sự kiện bắt đầu.

### Sơ đồ C — Hai start event và OR tách

```
Start1 ─► [Xử lý] ─► O ─┬─► [A] ─► O ─┐
Start2 ─► [Kiểm tra] ─┴─► [B] ─► O ─┤
                                      ► [Tổng hợp] ─► End
```

Mô hình có 45 phần tử; task tên `[Xử lý]`; nghiệp vụ nói "chỉ làm MỘT trong A/B".

**Câu 33.** Nhận xét đúng nhất?

A. Sai cú pháp vì có 2 start; đổi OR thành AND là xong.
B. Đúng ngữ nghĩa vì OR tách–OR gộp là cặp cân bằng; chỉ vi phạm G7.
C. Cú pháp có thể vẫn đúng nhưng ngữ nghĩa sai: OR tách có thể bật cả A và B; đồng thời vi phạm G3 (2 start), G6 (tên task), G7 (~30 phần tử). Muốn biết có khớp thực tế không phải hỏi người làm thật.
D. Đây là mô hình thực thi nên đầy đủ nhất; không cần đổi.

**Câu 34.** Cách sửa khớp ý nghiệp vụ "chỉ làm một" là gì?

A. Gộp thành một start event, dùng XOR tách/XOR gộp cho A/B, đổi tên task thành động từ + danh từ và phân rã để dưới ~30 phần tử.
B. Đổi OR thành AND rồi giữ hai start.
C. Thêm một terminate end sau mỗi nhánh.
D. Xóa hết cổng để token chạy thẳng.

### Sơ đồ D — Pool hộp đen đối tác

```
┌───────────────────┐                ┌──────────────────────┐
│ TRƯỜNG            │                │ ĐỐI TÁC XÁC MINH     │
│ [Gửi yêu cầu] ─ - ►                │  (pool hộp đen)      │
│ (msg) ◄ - - - - -  │                │                      │
│ [Nhận kết quả] ─► [Lưu] ─► End     │                      │
└───────────────────┘                └──────────────────────┘
```

**Câu 35.** Vì sao đối tác được vẽ thành pool hộp đen?

A. Vì đối tác là một lane trong pool của trường.
B. Vì không biết hoặc không quan tâm quy trình nội bộ của đối tác; chỉ trao đổi thông điệp qua luồng thông điệp.
C. Vì pool hộp đen cho phép trường điều khiển token bên trong đối tác.
D. Vì pool hộp đen không cần đặt tên.

**Câu 36.** Trường muốn "chờ đến khi đối tác trả kết quả mới lưu". Thiết kế nào đúng?

A. Vẽ sequence flow từ pool hộp đen sang [Lưu].
B. Đổi pool thành lane rồi vẽ sequence flow.
C. Dùng catching message event hoặc event-based gateway trong pool trường để nhận thông điệp, rồi mới đi tiếp tới [Lưu].
D. Chỉ cần data store chung giữa hai bên.

### Sơ đồ E — Business rule task / DMN

```
Start ─► [Tiếp nhận] ─► ▤ [Kiểm tra định mức: bảng DMN] ─► X
                                                          ├─(đạt)► [Duyệt] ─► End
                                                          └─(vượt)► [Chuyển trưởng khoa] ─► End
```

**Câu 37.** Ký hiệu `▤` ở đây là gì và vì sao chọn nó thay vì script task?

A. Send task — vì gửi hồ sơ cho trưởng khoa.
B. Business rule task — gọi bảng quyết định DMN; luật tách khỏi luồng nên quy chế đổi chỉ sửa bảng, không sửa từng nhánh.
C. Manual task — vì cán bộ tự tính.
D. Event sub-process — vì quy chế có thể đổi bất kỳ lúc nào.

**Câu 38.** Theo Chương 4, hoạt động nào cần thiết để "sửa bảng một lần" mà không làm workflow cũ chạy sai?

A. Đổi tên node cho dài hơn.
B. Thêm nhiều connector tới hệ thống cũ.
C. Quản lý phiên bản bảng quy tắc + môi trường thử + phê duyệt trước khi đưa production.
D. Chuyển trigger sang polling.

### Sơ đồ F — Đa thể hiện tuần tự và gửi tổng hợp

```
Start ─► [Gửi xác nhận cho từng sinh viên] (≡ ngang) ─► [Gộp] ─► [Gửi báo cáo 1 email] ─► End
```

**Câu 39.** Ý nghĩa của `≡` và số token sau node này trước khi vào [Gộp]?

A. `≡` là đa thể hiện song song; 3 token cùng đi tiếp ngay.
B. `≡` là đa thể hiện tuần tự; làm lần lượt từng phần tử, sau khi đủ thì đi tiếp bằng một token vào [Gộp].
C. `≡` là loop marker; token quay lại vô hạn.
D. `≡` là compensation marker.

**Câu 40.** Nếu bỏ node [Gộp], theo Chương 4 kết quả sẽ thế nào?

A. Vẫn gửi 1 email tổng hợp vì node cuối tự gộp.
B. Gửi nhiều email thay vì một — node xử lý theo ITEM; muốn tổng hợp phải có bước GỘP trước.
C. Không gửi email nào.
D. Workflow báo lỗi cú pháp ngay.

---

## ĐÁP ÁN VÀ GIẢI THÍCH NGẮN

| Câu | Đáp án | Gợi ý |
|---|---|---|
| **1** | **C** | 7 điều kiện chấm có trọng số, đánh giá ở cấp tác vụ; ngoại lệ >~20% và API tốt là chống chỉ định RPA. |
| **2** | **B** | BPA điều phối đầu–cuối, gọi RPA như một tác nhân cho bước UI cũ — hai công nghệ bổ sung. |
| **3** | **B** | DMN tách luật khỏi luồng; quy chế đổi chỉ sửa bảng quy tắc. |
| **4** | **C** | Khối lượng instance là điều kiện kinh tế của tự động hóa. |
| **5** | **B** | as-is là dòng công việc thực tế; hỏi người làm và xem log, không tin mùi as-documented. |
| **6** | **A** | A4: người phê duyệt quyết định quan trọng; A5: người đặt mục tiêu/ràng buộc, kiểm toán. |
| **7** | **B** | Cú pháp đúng nhưng OR tách sai ý "chỉ một" → sai ngữ nghĩa. |
| **8** | **A** | G3 một điểm vào; XOR tách theo kênh rồi gộp lại. |
| **9** | **D** | AI có tính xác suất, sai nhưng trông hợp lý → phải đo liên tục bằng Analytics. |
| **10** | **B** | RPA sai ồn ào; IA sai im lặng. |
| **11** | **A** | Chuỗi giá trị bị chặn bởi chiều yếu nhất; dữ liệu bẩn không cứu bằng mô hình lớn. |
| **12** | **C** | AI chuẩn bị — luật quyết định — con người chịu trách nhiệm. |
| **13** | **B** | Chỉ đọc vs có tác dụng phụ; công cụ ghi/gửi cần phê duyệt. |
| **14** | **C** | Chỉ dẫn hay quên: điều không được làm và khi nào dừng hỏi người. |
| **15** | **B** | 80% lỗi do ngữ cảnh; kiểm tra truy hồi trước khi đổi mô hình. |
| **16** | **D** | Can thiệp là chỉ số hai mặt: quá cao hoặc quá thấp bất thường đều đáng nghi. |
| **17** | **A** | Mẫu 3 phân đoạn: việc khác nhau, biết trước, chạy đồng thời để nhanh. |
| **18** | **D** | Mẫu 6 cần nhật ký đầy đủ; nhật ký thay sơ đồ luồng. |
| **19** | **B** | Fusion team: nghiệp vụ thiết kế logic, CNTT tích hợp/bảo mật/vận hành. |
| **20** | **C** | HTTP node là van an toàn chống khóa cứng vào connector. |
| **21** | **A** | Có phê duyệt + chủ sở hữu + rà soát = citizen developer, không phải Shadow IT. |
| **22** | **B** | Hợp đồng dữ liệu input/output/khóa là bước hay bỏ qua. |
| **23** | **D** | Retry cho lỗi tạm thời; cảnh báo có người nhận; rà soát/quý để ngừng workflow cũ. |
| **24** | **A** | Dữ liệu bẩn gồm sai format, ký tự đặc biệt, thiếu trường. |
| **25** | **C** | RAG bắt buộc bám đoạn truy hồi + trích dẫn; thiếu thì báo thiếu. |
| **26** | **B** | Bắt đầu từ mức 1/quy tắc; chỉ nâng lên agent khi thật cần phán đoán. |
| **27** | **B** | Ẩn nút giao diện không đủ; phải kiểm tra quyền phía máy chủ. |
| **28** | **C** | F10 nợ kỹ thuật vô hình — chạy được hôm nay nên rất dễ bỏ sót. |
| **29** | **D** | Số lần trung bình = 1/(1−p) = 1/0,8 = 1,25, không phải 1+p. |
| **30** | **A** | Marker che điều kiện; mô hình phân tích cần cổng tường minh để gắn p/thời gian. |
| **31** | **B** | Error boundary bắt lỗi từ sub-process, hủy token trong đó; nhánh song song vẫn chạy. |
| **32** | **A** | Terminate dừng toàn instance và xóa mọi token; error boundary chỉ ảnh hưởng đúng hoạt động gắn biên. |
| **33** | **C** | OR tách sai ý "chỉ một"; đồng thời G3/G6/G7. |
| **34** | **A** | Một start + XOR/XOR + tên động từ–danh từ + phân rã dưới ~30 phần tử. |
| **35** | **B** | Pool hộp đen: không lộ quy trình nội bộ đối tác, chỉ trao đổi thông điệp. |
| **36** | **C** | Message flow không mang token; muốn chờ phải có catching event/event-based gateway. |
| **37** | **B** | Business rule task gọi DMN; luật tách khỏi luồng. |
| **38** | **C** | Lớp 3: phiên bản, môi trường thử, phê duyệt trước khi production. |
| **39** | **B** | `≡` = đa thể hiện tuần tự; đủ instance thì ra một token. |
| **40** | **B** | Node chạy theo ITEM; bỏ [Gộp] thì gửi nhiều email thay vì một. |
