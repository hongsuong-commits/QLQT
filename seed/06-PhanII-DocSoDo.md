# PHẦN II — ĐỌC SƠ ĐỒ BPMN (câu 29–40)

> **Vị trí trong đề**: **12 câu / 40 câu = 3 điểm**, tức **30% số câu nhưng chỉ 7,5% điểm**. Đây là **phần "ăn điểm rẻ nhất" của đề** — vì nó **không đòi học thuộc**, chỉ đòi **nhìn đúng ký hiệu** và **trace token đúng cách**.
>
> ★ **Nhưng cũng là phần "đốt thời gian" nguy hiểm nhất**: 12 câu mà mỗi câu ngồi suy luận 5 phút là **mất 60 phút** — hết veo 75 phút của cả bài.

---

## 06.0 Chiến lược làm Phần II — ba quy tắc cứng

| # | Quy tắc | Nội dung | Vì sao |
|---|---|---|---|
| **1** | ★ **MỘT LẦN TRACE BẰNG BÚT** | Mỗi sơ đồ chỉ được **một lần** đánh số token lên hình. Nếu sau một lần trace vẫn chưa ra → **đánh dấu, để vòng 3** | Nhìn bằng mắt **không đếm được token**; trace lại lần hai nghĩa là lần đầu đã sai hướng |
| **2** | ★ **NHÌN KÝ HIỆU TRƯỚC, ĐỌC CHỮ SAU** | 80% câu Phần II giải được **chỉ bằng ký hiệu** (nét liền/đứt, viền mảnh/đôi/đậm, X/+/○, hình người/bánh răng/bàn tay) | Chữ trên hình thường là **bẫy ngữ nghĩa**; ký hiệu là **sự thật hình thức** |
| **3** | ★ **PHÂN BIỆT "CÂU HỎI VỀ HÌNH" VÀ "CÂU HỎI VỀ NGHIỆP VỤ"** | Hỏi *"có lỗi gì"* → **trả lời bằng lỗi hình thức** (deadlock, lack of sync, vi phạm cú pháp). Hỏi *"hậu quả"* → **trả lời bằng hậu quả nghiệp vụ** (treo hồ sơ, gửi 2 email) | Đề hay trộn hai loại; chọn nhầm loại là **chọn nhầm đáp án dù hiểu đúng hình** |

**Phân bổ thời gian khuyến nghị cho 12 câu**: **18–22 phút** (≈ 1,5–1,8 phút/câu). Nếu làm nhanh hơn, dành thời gian cho các câu tình huống dài ở Phần I.

> ★ **Thứ tự làm bài tối ưu**: làm **Phần I trước** (câu 1–28) rồi **Phần II** — vì Phần II **có thể làm "cơ học"** khi đã mệt, còn câu tình huống cần **đầu óc tỉnh**. **Ngược lại, nếu bạn rất chắc Chương 2, làm Phần II trước để "lấy điểm an toàn" rồi mới sang tình huống.**

---

## 06.1 Bộ ký hiệu phải nhận ra trong 2 giây

### Nhóm 1 — Sự kiện: đọc **hình dạng** (loại) + **viền** (vị trí) + **nét** (ngắt/không ngắt)

| Hình dạng | Loại sự kiện | Ghi nhớ |
|---|---|---|
| **Hình tròn** | **Sự kiện bắt đầu** | Chỉ có **một luồng RA** |
| **Hình tròn viền đôi** | **Sự kiện trung gian** | Có **luồng vào và ra** (nếu ở giữa luồng) |
| **Hình tròn viền đậm** | **Sự kiện kết thúc** | Chỉ có **một luồng VÀO** |

**Biểu tượng bên trong — 11 loại (nhóm thường dùng 6):**

| Biểu tượng | Loại | Bắt / Ném |
|---|---|---|
| **Không có gì** (tròn trơn) | **Không xác định** | Cả hai |
| **Phong bì** | **Thông điệp** | Bắt (nhận) / Ném (gửi) |
| **Đồng hồ** | **Hẹn giờ** | ★ **Chỉ BẮT** |
| **Tia chớp** | **Lỗi** | ★ **Chỉ BẮT ở biên**; **ném ở kết thúc** |
| **Mũi tên chéo lên** | **Leo thang** | Bắt / Ném |
| **Nút tròn đặc** | **Kết thúc (terminate)** | ★ **Chỉ ở sự kiện KẾT THÚC** |
| **Chữ X / hai nét chéo** | **Hủy (cancel)** | ★ **Chỉ trong TRANSACTION** |
| **Mũi tên quay lui** | **Bù trừ (compensation)** | Bắt / Ném |
| **Nhiều chấm / dấu sao** | **Nhiều thể hiện** | Bắt / Ném |
| **Dấu "="** | **Liên kết (link)** | Ném → Bắt (cặp) |
| **Hai đường song song** | **Tín hiệu (signal)** | Bắt / Ném (phát cho **nhiều** người nhận) |

> ★ **Bốn cặp dễ nhầm nhất — bảng "ăn điểm" của Phần II:**
>
> | | **Thông điệp** | **Tín hiệu** | **Leo thang** | **Lỗi** |
> |---|---|---|---|---|
> | **Phạm vi** | **MỘT** người nhận xác định | **PHÁT** cho nhiều người | **Đi LÊN cấp trên** | **Trong cùng phạm vi** xử lý |
> | **Có người nhận cụ thể?** | ★ **CÓ** | ★ **KHÔNG** | **CÓ** (cấp trên) | **Không cần** |
> | **Ngắt được không** | **Có** | **Có** | ★ **CÓ** (khác error) | ★ **LUÔN ngắt** |

**Viền — xác định VỊ TRÍ (5 vị trí):**

| Viền | Vị trí | Ý nghĩa |
|---|---|---|
| **Nét mảnh** | **Đầu / cuối / giữa luồng** | Sự kiện **bình thường** |
| ★ **Nét đôi, nằm TRÊN VIỀN task/sub-process** | **Sự kiện BIÊN** | Gắn vào hoạt động — **bắt sự kiện trong lúc hoạt động đang chạy** |
| **Nét đôi, trong khung nét đứt có start event riêng** | **Event sub-process** | ★ **Kích hoạt ở BẤT KỲ ĐÂU** trong phạm vi, **không cần gắn biên** |
| **Trong khung transaction** | **Sự kiện hủy** | Chỉ dùng **cancel** |
| **Cuối luồng, viền đậm** | **Sự kiện kết thúc** | Xem bảng terminate bên dưới |

**Nét — ngắt hay không ngắt (CHỈ áp dụng cho sự kiện BIÊN và event sub-process):**

| Nét | Loại | Hành vi |
|---|---|---|
| ★ **NÉT LIỀN** | **NGẮT** (interrupting) | **DỪNG hoạt động** đang chạy, **hủy token** trong hoạt động, **chuyển sang nhánh ngoại lệ** |
| ★ **NÉT ĐỨT** | **KHÔNG NGẮT** (non-interrupting) | **Hoạt động VẪN TIẾP TỤC**, **SINH THÊM một token** ở nhánh phụ → **hai nhánh chạy SONG SONG** |

> ★ **Mẹo nhớ**: **"Liền = cắt đứt. Đứt = không cắt."** Nghịch lý bề mặt nhưng **đúng tuyệt đối**: **nét liền** là **hành động dứt khoát** (dừng), **nét đứt** là **"chỉ thông báo thôi"** (chạy tiếp).

### Nhóm 2 — Hoạt động: đọc **kÝ hiệu góc trên trái**

| Ký hiệu | Loại task | Nghĩa | Ứng viên gì |
|---|---|---|---|
| **Hình người** | **User task** | Người làm **có hỗ trợ hệ thống** | ★ **A4 — hỗ trợ bằng AI** |
| **Bàn tay** | **Manual task** | Người làm **ngoài hệ thống** | **Số hóa A0/A1 → A2** |
| **Bánh răng** | **Service task** | Hệ thống tự làm qua **API/dịch vụ** | **Đã tự động A3–A4** |
| **Trang giấy** | **Script task** | **Engine chạy mã** | **Đã tự động** |
| **Bảng** | **Business rule task** | Gọi **bảng quyết định DMN** | Tự động **nhưng dễ đổi** |
| **Phong bì** | **Send / Receive task** | Gửi hoặc **chờ nhận** thông điệp | ★ **Chờ nhận = ĐIỂM CHỜ** (đừng vẽ thành cổng) |

**Bốn marker (dấu hiệu bổ sung, ở **đáy** hoặc **giữa** hình chữ nhật):**

| Marker | Ký hiệu | Nghĩa | Phân biệt |
|---|---|---|---|
| **Vòng lặp** | **Mũi tên tròn** | Lặp **đến khi** thỏa điều kiện | **MỘT** token quay lại |
| **Đa thể hiện SONG SONG** | ★ **Ba gạch DỌC** | Làm **ĐỒNG THỜI** cho **từng phần tử** | **"Dọc như hàng rào"** |
| **Đa thể hiện TUẦN TỰ** | ★ **Ba gạch NGANG** | Làm **LẦN LƯỢT** từng phần tử | **"Ngang như hàng đợi"** |
| **Bù trừ** | **Mũi tên quay lui** | Chỉ chạy khi **hoàn tác** | **Chạy NGƯỢC thứ tự** |

### Nhóm 3 — Cổng: đọc **biểu tượng trong hình thoi**

| Cổng | Ký hiệu | Tách | Gộp |
|---|---|---|---|
| **XOR** | **X** hoặc **trống** | **Chọn ĐÚNG MỘT** nhánh | **Đi tiếp khi MỘT** nhánh đến |
| **AND** | **+** | **Kích hoạt TẤT CẢ** | ★ **CHỜ ĐỦ TẤT CẢ** |
| **OR** | **○** | Kích hoạt **một hoặc nhiều** theo điều kiện | **Chờ ĐÚNG các nhánh đã kích hoạt** |
| ★ **Event-based** | **Ngũ giác** (hoặc hình thoi có **phong bì/đồng hồ** bên trong) | ★ **CHỜ sự kiện nào đến TRƯỚC** → đi nhánh đó, **hủy nhánh còn lại** | ★ **KHÔNG dùng để gộp** |

> ★ **Cổng event-based là cổng DUY NHẤT chỉ dùng để TÁCH** — vì bản chất nó là **"chờ"**, không phải **"gộp"**. Đây là **bẫy số 4** ở Chương 2 và là **câu hỏi rất hay ra**.

### Nhóm 4 — Luồng và làn

| Ký hiệu | Tên | Quy tắc tuyệt đối |
|---|---|---|
| **Mũi tên NÉT LIỀN** | **Luồng tuần tự** (sequence flow) | ★ **KHÔNG vượt ranh giới pool** |
| **Mũi tên NÉT ĐỨT, đầu tròn** | **Luồng thông điệp** (message flow) | ★ **KHÔNG nối hai phần tử TRONG CÙNG pool**; ★ **KHÔNG mang token** |
| **Khung lớn có tên** | **Pool** | **Một thực thể độc lập** (tổ chức, khách hàng, đối tác) |
| **Dải trong pool** | **Lane** | **Một vai trò BÊN TRONG** tổ chức |
| **Khung có tên + KHÔNG có nội dung** | ★ **Pool hộp đen** (black-box) | Thực thể ngoài — **chỉ nhận/gửi thông điệp**, không lộ quy trình |

### Nhóm 5 — Dữ liệu và cấu trúc đặc biệt

| Ký hiệu | Tên | Ghi nhớ |
|---|---|---|
| **Tờ giấy gấp góc** | **Data object** | **Một** tài liệu/hồ sơ; phải ghi **trạng thái** `[đã duyệt]` |
| **Hình trụ** | **Data store** | **Kho bền** — sống **lâu hơn** một thể hiện quy trình |
| **Ba tờ giấy xếp** | **Data collection** | **Tập** các đối tượng cùng loại |
| **Đường chấm chấm** | **Association** | Nối dữ liệu với hoạt động (không mang token) |
| **Khung nét đứt bao quanh cụm task, có start event riêng** | ★ **Event sub-process** | Kích hoạt **bất kỳ đâu** trong phạm vi |
| **Khung viền ĐẬM quanh task, có dấu `+`** | ★ **Call activity** | Gọi quy trình **định nghĩa độc lập**, **tái sử dụng được** |
| **Khung viền ĐÔI quanh cụm task** | ★ **Transaction sub-process** | **Giao dịch** — có **cancel** và **bù trừ ngược thứ tự** |
| **Khung có dấu `+` ở đáy, viền mảnh** | **Sub-process nhúng** (collapsed) | Quy trình con **nằm bên trong**, **KHÔNG tái sử dụng** |

> ★ **Bảng phân biệt ba khung — câu hỏi "khung này là gì" gần như chắc chắn có:**
>
> | | **Sub-process nhúng** | **Call activity** | **Transaction** |
> |---|---|---|---|
> | **Viền** | **Mảnh**, dấu `+` ở **đáy** | ★ **ĐẬM**, dấu `+` ở **đáy** | ★ **ĐÔI** |
> | **Tái sử dụng** | ★ **KHÔNG** | ★ **CÓ** (nhiều quy trình gọi lại) | **Không** (trong một quy trình) |
> | **Sửa ở một nơi** | Chỉ ảnh hưởng **một mô hình** | ★ **Ảnh hưởng MỌI nơi gọi** | Chỉ ảnh hưởng **một mô hình** |
> | **Có cancel?** | **Không** | **Không** (trừ khi bên trong là transaction) | ★ **CÓ** |
> | **Bù trừ** | Không mặc định | Không mặc định | ★ **CÓ, ngược thứ tự** |

---

## 06.2 Phương pháp trace token — sáu bước và năm khuôn mẫu

> ★ **Token là "vật mang công việc".** Nó sinh ra ở **sự kiện bắt đầu**, **di chuyển theo luồng tuần tự**, **bị tiêu thụ hoặc nhân bản ở cổng**, và **biến mất ở sự kiện kết thúc**. **Mọi câu hỏi Phần II đều quy về: "có bao nhiêu token, ở đâu, lúc nào?"**

### Sáu bước (đã học ở 2.2.5 — nay luyện thành phản xạ)

| Bước | Việc làm | Câu hỏi tự kiểm |
|---|---|---|
| **1** | **Đếm sự kiện bắt đầu** | **Bao nhiêu start event?** Mỗi cái = **một dòng token độc lập** |
| **2** | **Đi từng cung, đánh số token bằng bút** | **Đã VIẾT số lên hình chưa?** (nhìn bằng mắt là nguồn sai số 1) |
| **3** | **Gặp cổng TÁCH** → áp bảng | XOR = 1 · AND = n · OR = số nhánh thỏa · event-based = 1 (hủy phần còn lại) |
| **4** | ★ **Gặp cổng GỘP** → **đếm token đến** rồi so với yêu cầu | AND cần **đủ** · XOR cần **1** · OR cần **đúng số đã kích hoạt** |
| **5** | **Đi hết, ghi lại** số token ra khỏi mỗi cổng gộp + **số lần đoạn phía sau chạy** | Phía sau chạy **2 lần** = lack of sync · token **dừng** = deadlock |
| **6** | **Kết luận** + **hậu quả nghiệp vụ** | *"Bế tắc → hồ sơ treo vĩnh viễn"* · *"Đồng bộ thiếu → gửi 2 email"* |

### Năm khuôn mẫu phải nhận ra ngay (không cần trace)

```
① XOR tách ──► XOR gộp          → ĐÚNG. 1 token vào, 1 token ra.

        ┌──A──┐
   ──X──┤     ├──X──            Luôn có ĐÚNG 1 token ở mọi thời điểm.
        └──B──┘

② AND tách ──► AND gộp          → ĐÚNG. 1 token vào, n token, gộp về 1.

        ┌──A──┐
   ──+──┤     ├──+──            Gộp CHỜ ĐỦ n nhánh rồi mới đi tiếp.
        └──B──┘

③ XOR tách ──► AND gộp          → ★ BẾ TẮC (deadlock).

        ┌──A──┐
   ──X──┤     ├──+──            Chỉ 1 nhánh chạy → AND gộp CHỜ MÃI
        └──B──┘                 nhánh còn lại → token treo VĨNH VIỄN.

④ AND tách ──► XOR gộp          → ★ ĐỒNG BỘ THIẾU (lack of sync).

        ┌──A──┐
   ──+──┤     ├──X──            2 token cùng đi qua XOR gộp (XOR không
        └──B──┘                 chờ) → đoạn sau chạy 2 LẦN.

⑤ OR tách ──► OR gộp            → ĐÚNG nếu gộp OR chờ ĐÚNG số đã kích hoạt.
                                  ★ Nhưng KHÓ kiểm chứng → 7PMG khuyên
                                    thay bằng hai XOR lồng nhau.
```

> ★ **Câu thần chú: "Tách gì thì gộp nấy."** Ngoại lệ duy nhất cần nhớ: **OR tách có thể gộp bằng OR**, nhưng **nếu một nhánh không bao giờ kích hoạt thì OR gộp sẽ chờ mãi** → **đây là biến thể deadlock của OR**, rất hay ra ở câu khó.

### Ba biến thể lỗi nâng cao (câu khó của Phần II)

| Biến thể | Hình dạng | Vì sao sai |
|---|---|---|
| ★ **Bế tắc do điều kiện KHÔNG BAO PHỦ** | **XOR tách** với hai nhánh *"Thiếu ≥ 0,5"* và *"Đạt từ 0,3"* | Hồ sơ lệch **0,4** **không thỏa nhánh nào** → token **kẹt tại cổng tách** (không phải tại cổng gộp) |
| ★ **Bế tắc do OR gộp chờ nhánh không kích hoạt** | **OR tách** → **OR gộp**, nhánh B không chạy | OR gộp **chờ đủ số đã kích hoạt**, nhưng nếu cài đặt sai (**chờ TẤT CẢ**) → **treo** |
| ★ **Đồng bộ thiếu do vòng lặp** | **AND tách** → một nhánh **quay lại** → **AND gộp** | Mỗi vòng lặp **sinh thêm token**; AND gộp nhận **nhiều token hơn số nhánh** → **tích lũy token**, đoạn sau chạy nhiều lần |

### Ví dụ trace đầy đủ — sơ đồ 8 cổng (dùng làm mẫu cho mọi bài)

```
[Mô tả sơ đồ]
  Start ──► A ──► XOR1 ──┬── (đủ điều kiện) ──► B ──► AND1 ──┐
                          │                                    │
                          └── (không đủ) ──► C ──► XOR2 ──► D ──┤
                                                               │
                        AND1 ──► E ──► AND2 ──► XOR3 ──► F ──► End
```

**Trace từng bước:**

| Bước | Vị trí | Số token | Ghi chú |
|---|---|---|---|
| 1 | Start | **1** | Một start event |
| 2 | A | **1** | |
| 3 | **XOR1 (tách)** | **1** | Chọn **một** trong hai nhánh → **một nhánh có token, nhánh kia = 0** |
| 4a | **Nhánh "đủ điều kiện"** | **1** tại B | |
| 4b | **Nhánh "không đủ"** | **0** | ★ **Không có token** — nhánh này **không chạy** |
| 5 | **AND1 (gộp)** | ★ **CHỜ 2, chỉ nhận 1** | ★ **BẾ TẮC** — token tại B **treo vĩnh viễn**, C/D/E/F **không bao giờ chạy** |
| 6 | Kết luận | — | ★ **Deadlock (bế tắc)** do **XOR tách → AND gộp**. Hậu quả: **hồ sơ đủ điều kiện bị treo**, không ai được duyệt |

> ★ **Đây là lý do phải trace đến HẾT, không dừng ở cổng gộp đầu tiên.** Nếu chỉ nhìn *"XOR1 và XOR2 đều là XOR, có vẻ cân"* — bạn sẽ chọn sai. **Lỗi nằm ở cặp XOR1 → AND1, cách nhau ba phần tử.**

**Nếu sửa AND1 thành XOR (gộp XOR):**

| Vị trí | Số token | Kết quả |
|---|---|---|
| XOR1 (tách) | 1 → **1** | Chỉ một nhánh chạy |
| Nhánh "đủ" | **1** tại B → XOR gộp | Đi tiếp **ngay** |
| XOR gộp | **1** | **ĐÚNG** — mô hình chạy được, nhưng **mất tính song song** (nếu ý định là làm cả hai) |

> ★ **Bài học kép**: **cùng một hình vẽ có thể "đúng cú pháp" theo hai cách sửa khác nhau, nhưng chỉ một cách đúng NGHIỆP VỤ.** Câu hỏi Phần II hay hỏi *"cách sửa nào đúng"* — đáp án phải khớp **ý định** (chọn một hay làm cả hai), không chỉ khớp cú pháp.

---

## 06.3 Mười hai dạng câu hỏi đọc sơ đồ

### Dạng 1 — Đếm token sau cổng gộp

**Câu hỏi mẫu**: *"Sau cổng gộp G, có bao nhiêu token đi vào hoạt động X?"*

**Cách làm**: đếm token đến **từng nhánh** → so với **yêu cầu của cổng gộp** → **số token ra = 1** nếu cổng gộp đúng (XOR, AND, OR đều gộp về **một** dòng).

| Cổng gộp | Token đến | Token ra | Trường hợp sai |
|---|---|---|---|
| **XOR** | 1 | **1** | 2 token đến → **2 token ra** (đồng bộ thiếu) |
| **AND** | n | **1** | Thiếu token → **0 ra** (bế tắc) |
| **OR** | k (đã kích hoạt) | **1** | Chờ sai số → **0 ra** |

> ★ **Bẫy**: phương án *"AND gộp có 2 token đến thì ra 2 token"* → **SAI**. **AND gộp TIÊU THỤ tất cả token đến và sinh ĐÚNG MỘT token ra.** Ngược lại **XOR gộp KHÔNG tiêu thụ** — nó để token đi qua từng cái → **2 token vào = 2 token ra**.

### Dạng 2 — "Hoạt động X chạy bao nhiêu lần?"

| Nguyên nhân | Số lần chạy | Cách nhận |
|---|---|---|
| **Luồng tuyến tính** | **1** | Không có cổng tách phía trước |
| **XOR tách** | **1** | Chỉ một nhánh được chọn |
| **AND tách + AND gộp** | **1** (nhưng **song song**) | Đúng cấu trúc |
| ★ **AND tách + XOR gộp** | ★ **n** (bằng số nhánh) | ★ **Đồng bộ thiếu** — mỗi token đi qua riêng |
| **Marker vòng lặp** | **1 + số lần lặp lại** | Có mũi tên quay lui |
| **Marker đa thể hiện** | ★ **n** (bằng số phần tử tập) | Ba gạch dọc/ngang |
| **Có vòng lặp phía trước** | **1 + số vòng** | ★ **Tính cả lần chạy đầu** — bẫy hay gặp |

> ★ **Công thức vòng lặp làm lại (rework) — nếu đề cho xác suất**: **số lần thực hiện trung bình = 1 / (1 − p)** với p là **xác suất phải làm lại**. Ví dụ p = 20% → **1,25 lần**. **Thời gian = thời gian 1 lần / (1 − p)** — tức **tăng 25%**, không phải **tăng 20%**. Đây là **câu hỏi tính toán duy nhất của Phần II** và **rất dễ chọn nhầm đáp án "1,2 lần"**.

### Dạng 3 — Phát hiện BẾ TẮC (deadlock)

| Dấu hiệu | Kết luận |
|---|---|
| ★ **Tách XOR (X) ... gộp AND (+)** | ★ **BẾ TẮC** |
| **Tách XOR với điều kiện KHÔNG bao phủ** | **BẾ TẮC tại cổng tách** |
| **Nhánh không bao giờ kích hoạt nhưng gộp AND/OR chờ nó** | **BẾ TẮC** |
| **Vòng lặp không có nhánh thoát** | ★ **BẾ TẮC** (token quay mãi) |

**Hậu quả nghiệp vụ phải nêu kèm**: **thể hiện quy trình treo vĩnh viễn**, **không có thông báo lỗi**, **hồ sơ nằm im trong hàng đợi**, **không ai biết vì sao**.

> ★ **Vì sao deadlock lại "im lặng"**: **engine không coi đó là lỗi** — nó chỉ **chờ**. Không exception, không log, không cảnh báo. **Đây là lỗi nguy hiểm nhất về mặt vận hành**, và là lý do **kiểm thử phải bao gồm cả nhánh hiếm**.

### Dạng 4 — Phát hiện ĐỒNG BỘ THIẾU (lack of synchronization)

| Dấu hiệu | Kết luận |
|---|---|
| ★ **Tách AND (+) ... gộp XOR (X)** | ★ **ĐỒNG BỘ THIẾU** |
| **Cổng gộp XOR nhận nhiều token** | Đoạn sau chạy **nhiều lần** |
| **Hai nhánh AND cùng ghi vào một bản ghi** | **Hai bút toán / hai email / hai bản ghi trùng** |

**Hậu quả nghiệp vụ**: **gửi 2 email xác nhận**, **ghi 2 bút toán**, **trừ tiền 2 lần**, **tạo 2 hồ sơ**. Đây là **lỗi "đắt tiền" hơn deadlock** — vì nó **không treo**, nó **âm thầm làm sai**, và **chỉ phát hiện khi khách phàn nàn**.

> ★ **Bảng phân biệt hai lỗi — câu hỏi so sánh gần như chắc chắn có:**
>
> | | **Bế tắc** | **Đồng bộ thiếu** |
> |---|---|---|
> | **Cặp cổng** | **XOR tách → AND gộp** | **AND tách → XOR gộp** |
> | **Triệu chứng** | **Treo, không chạy tiếp** | **Chạy nhiều lần** |
> | **Số token** | **Thiếu** (0 ở nhánh chờ) | **Thừa** (nhiều token qua cổng gộp) |
> | **Phát hiện khi nào** | **Ngay** (không có kết quả) | ★ **Muộn** (kết quả sai) |
> | **Hậu quả** | **Không xử lý được** | **Xử lý hai lần** |

### Dạng 5 — Chọn cổng đúng theo mô tả nghiệp vụ (câu hỏi NGƯỢC)

**Đây là dạng khó hơn**: đề **không cho hình**, chỉ cho **mô tả**, hỏi **nên dùng cổng nào**.

| Mô tả | Cổng |
|---|---|
| *"Chỉ làm MỘT trong các việc, tùy điều kiện"* | **XOR** |
| *"Làm TẤT CẢ, không phụ thuộc thứ tự"* | **AND** |
| *"Làm MỘT SỐ, tùy trường hợp"* | **OR** (nhưng **cân nhắc hai XOR lồng**) |
| *"Chờ một trong nhiều sự kiện, cái nào đến trước thì đi"* | ★ **Event-based gateway** |
| *"Chờ người phê duyệt"* | ★ **Receive task** hoặc **event-based gateway** — **KHÔNG phải cổng XOR** |
| *"Nếu A thì B, ngược lại C"* | **XOR có nhánh mặc định** |

> ★ **Câu chốt: "Cổng rẽ nhánh, SỰ KIỆN chờ đợi."** Mọi nhu cầu **"chờ"** phải dùng **sự kiện** (trung gian bắt, biên, event-based gateway) — **không bao giờ dùng cổng XOR để "kiểm tra lại"**. Đây là **quy tắc 4 ở 2.2.4** và là **lỗi thiết kế phổ biến nhất của sinh viên**.

### Dạng 6 — Nhận diện sáu loại task

| Ký hiệu góc trên trái | Đáp án | Từ khóa nhận dạng trong đề |
|---|---|---|
| **Hình người** | **User task** | *"trên phần mềm"*, *"có hỗ trợ hệ thống"* |
| **Bàn tay** | **Manual task** | *"giấy tờ"*, *"ngoài hệ thống"*, *"đóng dấu"* |
| **Bánh răng** | **Service task** | *"gọi API"*, *"hệ thống tự động"* |
| **Trang giấy** | **Script task** | *"engine chạy mã"*, *"tính toán"* |
| **Bảng** | **Business rule task** | *"bảng quyết định"*, *"DMN"*, *"quy chế"* |
| **Phong bì** | **Send / Receive task** | *"gửi email"*, *"chờ phản hồi"* |

> ★ **Bẫy "bàn tay vs hình người"** — hai ký hiệu đều nói về **con người**:
>
> | | **Bàn tay (manual)** | **Hình người (user)** |
> |---|---|---|
> | **Hệ thống có biết không?** | ★ **KHÔNG** — không có dữ liệu, không có log | ★ **CÓ** — có biểu mẫu, có trạng thái |
> | **Ai chịu trách nhiệm ghi nhận?** | **Con người tự ghi** | **Hệ thống ghi** |
> | **Ứng viên gì** | **Số hóa (A0/A1 → A2)** | **Hỗ trợ AI (A4)** |
>
> **Nếu đề nói "nhân viên ký giấy rồi chuyển phòng"** → **manual task**. **Nếu đề nói "nhân viên duyệt trên cổng thông tin"** → **user task**.

### Dạng 7 — Nhận diện bốn marker

| Marker trên hình | Đáp án | Phân biệt |
|---|---|---|
| **Mũi tên tròn** | **Vòng lặp (loop)** | **MỘT** token quay lại; **chạy lại cùng một việc** |
| ★ **Ba gạch DỌC** | **Đa thể hiện song song** | **NHIỀU việc cùng lúc**, chờ **đủ tất cả** |
| ★ **Ba gạch NGANG** | **Đa thể hiện tuần tự** | **NHIỀU việc lần lượt**, **từng cái một** |
| **Mũi tên quay lui** | **Bù trừ (compensation)** | Chỉ chạy khi **hoàn tác** — **ngược thứ tự** |

> ★ **Bẫy kinh điển: "ba gạch dọc hay ngang?"** — đề **rất hay** cho hình và hỏi. **Mẹo**: **dọc = hàng rào = nhiều việc đứng cạnh nhau (song song)**; **ngang = hàng đợi = lần lượt từng người (tuần tự)**.
>
> ★ **Bẫy thứ hai: vòng lặp (loop marker) vs vòng lặp VẼ BẰNG CỔNG.** Hai cách **khác nhau về hệ quả phân tích**:
>
> | | **Marker vòng lặp** | **Vòng lặp vẽ bằng cổng** |
> |---|---|---|
> | **Điều kiện lặp** | ★ **BỊ CHE GIẤU** (không thấy trên hình) | ★ **HIỆN RÕ** (trên nhánh quay lại) |
> | **Dùng khi** | **Mô hình MÔ TẢ** (gọn) | ★ **Mô hình PHÂN TÍCH** (cần đo, cần tối ưu) |
> | **Rủi ro** | **Không phân tích được thời gian/chi phí** | **Rối hình** nếu nhiều vòng |
>
> **Đây là câu hỏi "khi nào KHÔNG dùng marker"** — đáp án: **khi điều kiện lặp là thông tin quan trọng cần phân tích**.

### Dạng 8 — Vị trí sự kiện (5 vị trí) và bắt/ném

| Vị trí trên hình | Tên | Quy tắc nhớ |
|---|---|---|
| **Đầu luồng, nét mảnh** | **Sự kiện bắt đầu** | **Chỉ RA** |
| **Giữa luồng, viền đôi** | **Sự kiện trung gian** | **VÀO rồi RA**; có thể **bắt** hoặc **ném** |
| ★ **Trên VIỀN task, viền đôi** | **Sự kiện biên** | ★ **Bắt** — gắn vào **hoạt động**, **không nằm trên luồng chính** |
| **Trong khung nét đứt có start riêng** | **Event sub-process** | ★ **Kích hoạt ở BẤT KỲ ĐÂU** trong phạm vi |
| **Cuối luồng, viền đậm** | **Sự kiện kết thúc** | **Chỉ VÀO** |

**Quy tắc bắt/ném — mẹo nhớ:**

| Loại | Bắt được? | Ném được? |
|---|---|---|
| **Hẹn giờ** | ★ **CÓ** (chờ đồng hồ) | ★ **KHÔNG** (không "ném" thời gian) |
| **Lỗi** | **CÓ** (ở biên) | **CÓ** (ở kết thúc) |
| **Leo thang** | **CÓ** | **CÓ** |
| **Thông điệp** | **CÓ** | **CÓ** |
| **Hủy (cancel)** | **CÓ** (trong transaction) | **CÓ** (ở kết thúc transaction) |
| **Bù trừ** | **CÓ** | **CÓ** (kết thúc) |
| **Kết thúc (terminate)** | ★ **KHÔNG** | ★ **CHỈ ở kết thúc** |

> ★ **Câu hỏi hay ra: "sự kiện hẹn giờ ném được không?"** → **KHÔNG**. **Đồng hồ chỉ chờ, không gửi.** Đây là **câu dễ mất điểm** vì phương án *"timer ném để báo cho pool khác"* nghe rất hợp lý — nhưng **sai**: muốn báo cho pool khác phải dùng **sự kiện thông điệp ném** hoặc **send task**.

### Dạng 9 — Biên NGẮT hay KHÔNG NGẮT (trọng tâm Phần II)

**Cách nhìn**: **viền của vòng tròn sự kiện biên** — **nét liền** hay **nét đứt**.

| Hình | Loại | Hành vi | Ví dụ |
|---|---|---|---|
| **Vòng tròn viền đôi, NÉT LIỀN** | ★ **NGẮT** | **DỪNG** hoạt động ngay, **hủy token** bên trong, **chuyển sang nhánh ngoại lệ** | *"Quá 5 ngày chưa xử lý → chuyển cấp trên"* — hồ sơ **không còn ở bước cũ** |
| **Vòng tròn viền đôi, NÉT ĐỨT** | ★ **KHÔNG NGẮT** | **Hoạt động VẪN CHẠY**, **sinh THÊM token** ở nhánh phụ → **hai nhánh song song** | *"Cứ 3 ngày gửi email nhắc"* — việc chính **vẫn tiếp tục**, chỉ **thêm thông báo** |

**Ba cặp tình huống để luyện phân biệt:**

| Tình huống | Ngắt hay không | Vì sao |
|---|---|---|
| *"Quá hạn 30 ngày thì **hủy hồ sơ**"* | ★ **NGẮT** | **Hủy** = không thể tiếp tục → phải dừng |
| *"Quá hạn 30 ngày thì **gửi nhắc nhở**"* | ★ **KHÔNG NGẮT** | **Nhắc** = việc chính vẫn làm tiếp |
| *"Khách **rút yêu cầu** giữa lúc đang xử lý"* | ★ **NGẮT** | Yêu cầu **không còn tồn tại** |
| *"Mỗi khi có **khiếu nại mới**, ghi nhận thêm vào hồ sơ đang xử lý"* | ★ **KHÔNG NGẮT** | Hồ sơ **vẫn đang xử lý** |
| *"Nhân viên **nghỉ việc**, cần chuyển giao hồ sơ"* | ★ **NGẮT** | Người xử lý **không còn** |
| *"**Giám sát viên** xem tiến độ mỗi ngày"* | ★ **KHÔNG NGẮT** | Chỉ **quan sát**, không can thiệp |

> ★ **Câu chốt để phân biệt: "Sau sự kiện này, VIỆC ĐANG LÀM còn ý nghĩa không?"** Nếu **không còn** → **ngắt**. Nếu **vẫn còn** → **không ngắt**.
>
> ★ **Bẫy**: *"Sự kiện lỗi có thể là không ngắt."* → **SAI**. **Error LUÔN ngắt.** Chỉ **escalation**, **message**, **timer**, **signal**, **conditional** mới có **biến thể không ngắt**.

### Dạng 10 — Bốn sự kiện kết thúc dễ nhầm

| Sự kiện kết thúc | Ký hiệu | Hành vi | Dùng khi |
|---|---|---|---|
| **Kết thúc thường** (none) | **Tròn viền đậm, trơn** | **Tiêu thụ MỘT token**; các token khác **vẫn chạy** | Kết thúc **một nhánh** |
| ★ **Kết thúc (terminate)** | ★ **Tròn đặc** (nút tròn đen) | ★ **DỪNG TOÀN BỘ thể hiện**, **xóa MỌI token** | **Kết thúc khẩn cấp** — không nhánh nào được tiếp tục |
| **Kết thúc lỗi** | **Tia chớp** | **Ném lỗi** lên phạm vi cha (hoặc kết thúc thể hiện nếu không có ai bắt) | Kết thúc **vì lỗi** |
| **Kết thúc hủy** | **Chữ X** | **Hủy transaction** → kích hoạt **bù trừ** | Chỉ trong **transaction** |
| **Kết thúc bù trừ** | **Mũi tên quay lui** | Kích hoạt **bù trừ** cho các bước đã làm | Hoàn tác **có kiểm soát** |

> ★ **Bẫy "terminate vs kết thúc thường"** — đây là **câu hỏi Phần II rất hay ra**:
>
> | | **Kết thúc thường** | **Terminate** |
> |---|---|---|
> | **Token khác** | **Vẫn chạy tiếp** | ★ **BỊ XÓA HẾT** |
> | **Nhánh song song** | **Tiếp tục** | ★ **Dừng ngay** |
> | **Dùng khi** | Nhánh này xong, nhánh khác còn việc | ★ **Không được làm gì thêm** (ví dụ: **phát hiện gian lận → dừng toàn bộ**) |
>
> **Ví dụ chốt**: quy trình có **hai nhánh song song** — *"kiểm tra hồ sơ"* và *"gửi thông báo cho ứng viên"*. Nếu nhánh kiểm tra **phát hiện hồ sơ giả** và dùng **kết thúc thường**, thì **nhánh gửi thông báo VẪN CHẠY** → **ứng viên gian lận vẫn nhận thông báo**. Phải dùng **terminate**.

### Dạng 11 — Luồng tuần tự vs luồng thông điệp (lỗi cú pháp)

| Hình vẽ sai | Lỗi | Cách sửa |
|---|---|---|
| **Nét LIỀN nối hai pool khác nhau** | ★ **Sequence flow vượt ranh giới pool** | Đổi thành **message flow** (nét đứt) |
| **Nét ĐỨT nối hai task trong CÙNG pool** | ★ **Message flow nối trong cùng pool** | Đổi thành **sequence flow** |
| **Message flow nối vào gateway trong pool khác** | ★ **Sai**: message flow **không nối vào cổng** bên trong pool khác | Nối vào **task/sự kiện** của pool đó, hoặc dùng **pool hộp đen** |
| **Message flow "mang token" điều khiển thứ tự** | ★ **Sai ngữ nghĩa**: message flow **KHÔNG mang token** | Thứ tự **chỉ do sequence flow** quyết định |

> ★ **Vì sao message flow không mang token**: vì **mỗi pool là một thực thể độc lập, tự quyết định thứ tự công việc của mình**. Message flow chỉ nói **"có thông tin đi qua đây"** — **không ai bắt được đối tác phải chờ**. Đây chính là **bản chất của cộng tác liên tổ chức**: **bạn gửi, họ quyết định khi nào đọc**.
>
> ★ **Bẫy**: *"Message flow có thể nối hai hoạt động trong cùng một pool nếu chúng thuộc hai lane khác nhau."* → **SAI**. **Lane vẫn nằm trong cùng pool** — thứ tự **do ta kiểm soát** → phải dùng **sequence flow**.

### Dạng 12 — Nhận diện cấu trúc đặc biệt + event-based gateway

| Hình | Đáp án | Chìa khóa |
|---|---|---|
| **Khung nét đứt, có start event RIÊNG bên trong** | ★ **Event sub-process** | Kích hoạt **bất kỳ đâu** trong phạm vi |
| **Khung viền ĐẬM quanh task, dấu `+`** | ★ **Call activity** | **Tái sử dụng**, sửa một nơi ảnh hưởng mọi nơi |
| **Khung viền ĐÔI quanh cụm task** | ★ **Transaction sub-process** | Có **cancel** + **bù trừ ngược thứ tự** |
| **Khung viền mảnh, dấu `+` ở đáy** | **Sub-process nhúng (collapsed)** | **Không tái sử dụng** |
| ★ **Hình ngũ giác / thoi có phong bì + đồng hồ** | ★ **Event-based gateway** | **Chờ cái nào đến trước**, hủy nhánh còn lại |
| **Pool rỗng, chỉ có tên** | **Pool hộp đen** | Đối tác ngoài, **không lộ quy trình** |

> ★ **Ba câu hỏi then chốt của event-based gateway:**
>
> | Câu hỏi | Đáp án |
> |---|---|
> | **Nó dùng để TÁCH hay GỘP?** | ★ **CHỈ TÁCH** |
> | **Sau nó là gì?** | ★ **Các sự kiện BẮT** (message, timer, signal) — **không phải task** |
> | **Các nhánh còn lại thì sao?** | ★ **BỊ HỦY** khi một sự kiện đến |
>
> **Ví dụ chuẩn**: *"Sau khi gửi yêu cầu báo giá, chờ **hoặc** nhà cung cấp trả lời **hoặc** hết 7 ngày"* → **event-based gateway** với hai nhánh: **message (trả lời)** và **timer (7 ngày)**. **Cái nào đến trước thì đi, cái kia bị hủy.**
>
> ★ **Bẫy**: *"Có thể thay event-based gateway bằng XOR kiểm tra điều kiện."* → **SAI**. XOR **kiểm tra NGAY** rồi chọn; event-based **CHỜ**. Nếu dùng XOR, hệ thống **không chờ** mà **đi ngay theo một nhánh** (thường là nhánh mặc định) → **mất hoàn toàn ý nghĩa "chờ phản hồi"**.

---

## 06.4 Bộ sơ đồ luyện tập (mô tả bằng chữ — 16 câu có đáp án)

> ★ **Cách dùng**: che phần đáp án, **trace bằng giấy bút**, ghi **số token** lên từng cung. Mỗi sơ đồ **giới hạn 3 phút**. Đây là **bài tập mô phỏng đúng dạng 12 câu Phần II**.

### Sơ đồ 1 — Xét duyệt hồ sơ (hai cổng, ba nhánh)

```
Start ──► [Tiếp nhận hồ sơ] ──► X1 ──┬── (hồ sơ đầy đủ) ──► [Kiểm tra học vụ] ──► +
                                      │                                          │
                                      ├── (thiếu giấy tờ) ──► [Yêu cầu bổ sung] ──┤
                                      │                                          │
                                      └── (hồ sơ nước ngoài) ─► [Xác minh văn bằng] ┘
                                                                                 │
                                              + ──► [Ra quyết định] ──► End
```

**Câu 1.** Sơ đồ trên có lỗi gì?

A. Không có lỗi — ba nhánh đều quay về một cổng gộp
B. **Bế tắc (deadlock)** — cổng tách XOR chỉ kích hoạt **một** nhánh, nhưng cổng gộp AND **chờ đủ cả ba**
C. **Đồng bộ thiếu** — đoạn sau chạy ba lần
D. Vi phạm cú pháp — thiếu sự kiện kết thúc

**Câu 2.** Nếu sửa cổng gộp `+` thành cổng `X`, kết quả là gì?

A. Vẫn bế tắc, vì XOR cũng chờ đủ ba nhánh
B. **Chạy đúng — mỗi lần chỉ một nhánh được chọn và một token đi tiếp**, nhưng **mất khả năng chờ cả ba nhánh** (nếu nghiệp vụ cần làm song song thì phải sửa cổng TÁCH thành AND)
C. Sinh ra ba token ở đoạn sau
D. Vi phạm cú pháp vì XOR không được gộp

### Sơ đồ 2 — Ghi nhận thanh toán

```
Start ──► [Nhận yêu cầu] ──► + ──┬── [Tính phí] ────────► X ──► [Ghi bút toán] ──► End
                                  │                        ▲
                                  └── [Gửi email xác nhận] ─┘
```

**Câu 3.** Lỗi trong sơ đồ này là gì?

A. Bế tắc — AND gộp chờ mãi
B. **Đồng bộ thiếu (lack of synchronization)** — tách AND sinh **hai** token, gộp XOR **không chờ** nên **cả hai** token đi tiếp
C. Vi phạm cú pháp — XOR không được đặt sau task
D. Không có lỗi

**Câu 4.** Hậu quả nghiệp vụ cụ thể nhất của sơ đồ trên?

A. Hồ sơ bị treo, không ai xử lý
B. **Mỗi yêu cầu bị ghi **hai bút toán** và gửi **hai email xác nhận** — sai sổ sách, khách nhận trùng thư**
C. Hệ thống báo lỗi cú pháp khi triển khai
D. Chỉ chậm hơn, không sai kết quả

### Sơ đồ 3 — Cổng tách có điều kiện không bao phủ

```
Start ──► [Chấm điểm rèn luyện] ──► X ──┬── (thiếu từ 0,5 điểm trở lên) ──► [Xét lại]
                                        └── (đạt từ 0,3 điểm) ───────────► [Công nhận]
```

**Câu 5.** Hồ sơ **lệch đúng 0,4 điểm** sẽ đi nhánh nào?

A. Nhánh "Xét lại"
B. Nhánh "Công nhận"
C. **Không nhánh nào — token kẹt tại cổng tách; đây là bế tắc do điều kiện KHÔNG BAO PHỦ và KHÔNG LOẠI TRỪ**
D. Cả hai nhánh

**Câu 6.** Cách sửa **đúng nguyên tắc** (quy tắc 5 ở 2.2.4) là gì?

A. Thêm một cổng AND sau cổng tách
B. **Làm hai điều kiện loại trừ và bao phủ** (*"thiếu từ 0,5 trở lên"* / *"thiếu dưới 0,5"*), **hoặc thêm nhánh mặc định** hứng mọi trường hợp còn lại
C. Đổi cổng tách thành AND
D. Bỏ nhánh "Xét lại"

### Sơ đồ 4 — Năm hoạt động trong một quy trình tuyển dụng

```
Start ──► [1. Ký hợp đồng giấy] ──► [2. Nhập hồ sơ lên cổng] ──► [3. Gọi API mã số thuế]
       ──► [4. Xác định mức lương theo bảng quyết định] ──► [5. Gửi email chào mừng] ──► End
```

**Câu 7.** Ký hiệu góc trên trái của **hoạt động 1, 2, 3, 5** lần lượt là gì?

A. Hình người · bàn tay · bánh răng · phong bì
B. **Bàn tay · hình người · bánh răng · phong bì**
C. Bàn tay · hình người · trang giấy · bảng
D. Hình người · hình người · bánh răng · phong bì

**Câu 8.** Hoạt động 4 dùng **bảng quyết định DMN**. Loại task và hệ quả khi quy chế lương thay đổi?

A. Script task — phải sửa mã, cần lập trình viên
B. **Business rule task — chỉ sửa BẢNG QUYẾT ĐỊNH, không sửa mã; đây là lý do chọn loại task này thay vì script**
C. Service task — phải gọi lại API
D. Manual task — phải làm giấy

### Sơ đồ 5 — Xử lý đơn xin nghỉ phép (biên ngắt, terminate)

```
Start ──► [Chờ trưởng phòng duyệt] ──(biên: đồng hồ 5 ngày, VIỀN ĐÔI NÉT ĐỨT)──► [Gửi nhắc nhở] ──► End
                    │
                    ├──(biên: thông điệp "nhân viên rút đơn", VIỀN ĐÔI NÉT LIỀN)──► [Hủy đơn] ──► (tròn đặc)
                    │
                    └── (được duyệt) ──► [Cập nhật bảng công] ──► End
```

**Câu 9.** Sự kiện **đồng hồ 5 ngày** là ngắt hay không ngắt, và vì sao?

A. Ngắt — vì đồng hồ luôn dừng hoạt động
B. **Không ngắt (viền nét đứt) — việc chờ duyệt VẪN TIẾP TỤC, chỉ SINH THÊM một token gửi nhắc nhở**
C. Không ngắt — vì thông điệp mới là ngắt
D. Ngắt — vì sau 5 ngày hoạt động phải dừng

**Câu 10.** Nếu **cùng lúc** có **nhắc nhở thứ nhất** và **nhân viên rút đơn**, chuyện gì xảy ra với **hoạt động đang chờ duyệt**?

A. Hoạt động tiếp tục bình thường vì cả hai sự kiện đều không ngắt
B. **Hoạt động bị DỪNG bởi sự kiện rút đơn (ngắt) — token trong hoạt động bị hủy; nhắc nhở đã sinh token riêng nên nhánh đó vẫn có thể chạy tiếp tới End**
C. Hệ thống báo lỗi cú pháp vì có hai sự kiện biên
D. Hoạt động chạy hai lần

**Câu 11.** Sự kiện cuối nhánh "Hủy đơn" là **tròn đặc (terminate)**. Nếu đổi thành **kết thúc thường**, điều gì thay đổi?

A. Không thay đổi gì
B. **Nhánh "Chờ duyệt" và nhánh "Gửi nhắc nhở" VẪN TIẾP TỤC chạy — trái với ý định "hủy là dừng toàn bộ"; terminate đảm bảo KHÔNG nhánh nào đi tiếp**
C. Hệ thống không biên dịch được
D. Chỉ nhánh nhắc nhở dừng

### Sơ đồ 6 — Ba pool: sinh viên, phòng đào tạo, ngân hàng

```
┌─────────────────────┐        ┌──────────────────────────┐        ┌───────────────┐
│ SINH VIÊN           │        │ PHÒNG ĐÀO TẠO            │        │ NGÂN HÀNG     │
│ [Nộp đơn]───────────┼───────►│ [Tiếp nhận]──►[Xét duyệt]│        │ (hộp đen)     │
│                     │  (a)   │        │                 │        │               │
│ [Nhận kết quả]◄─────┼────────│ [Gửi kết quả]            │        │               │
└─────────────────────┘  (b)   └──────────┬───────────────┘        └───────────────┘
                                            │ (c) nét ĐỨT
                                            ▼
                                   ┌──────────────────┐
                                   │ [Chuyển học phí] │  ◄── trong CÙNG pool
                                   └──────────────────┘
```

**Câu 12.** Đường **(a)**, **(b)**, **(c)** — đường nào **SAI** và vì sao?

A. (a) và (b) sai vì nối hai pool phải dùng nét liền
B. **(c) sai — luồng thông điệp (nét đứt) KHÔNG được nối hai phần tử trong CÙNG một pool; phải dùng luồng tuần tự**
C. Chỉ (a) sai
D. Không đường nào sai

**Câu 13.** Nếu đường **(a)** được vẽ bằng **nét liền**, đó là lỗi gì?

A. Không phải lỗi, miễn có mũi tên
B. **Vi phạm cú pháp: luồng tuần tự KHÔNG được vượt ranh giới pool — giao tiếp giữa hai thực thể độc lập CHỈ qua luồng thông điệp**
C. Chỉ là lỗi thẩm mỹ
D. Sẽ làm sinh viên nhận hai kết quả

**Câu 14.** Pool **NGÂN HÀNG** để trống nội dung. Tên gọi và lý do hợp lệ?

A. Pool rỗng — luôn là lỗi thiết kế
B. **Pool hộp đen — hợp lệ khi đối tác ngoài không muốn/không cần lộ quy trình nội bộ; chỉ nhận và gửi thông điệp**
C. Lane — vì không có nội dung
D. Sub-process — vì được thu gọn

### Sơ đồ 7 — Ba cấu trúc đặc biệt trong một mô hình

```
┌───────────────────────────────────────────────────────────────┐
│ PHÒNG CÔNG TÁC SINH VIÊN                                      │
│                                                               │
│  Start ──► [Kiểm tra hồ sơ] ──► ⬛ [Phê duyệt học bổng] ⬛ ──► End
│                  │                  (viền ĐẬM, dấu +)         │
│                  │                                            │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   │
│  │ (start) ──► [Ghi nhận khiếu nại] ──► [Chuyển cán bộ]   │   │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘   │
│                                                               │
│  ╔═══════════════════════════════════════════════════════╗    │
│  ║ Start ─► [Trừ tiền] ─► [Cấp học bổng] ─► End          ║    │
│  ║            │(X)                                        ║    │
│  ║            └─► [Hoàn tiền] ─► End                     ║    │
│  ╚═══════════════════════════════════════════════════════╝    │
└───────────────────────────────────────────────────────────────┘
```

**Câu 15.** Khung **viền đậm có dấu `+`** là gì, và vì sao nó khác khung **viền mảnh có dấu `+`**?

A. Cả hai là sub-process nhúng, chỉ khác cách vẽ
B. **Call activity — quy trình được ĐỊNH NGHĨA ĐỘC LẬP và TÁI SỬ DỤNG; sửa một nơi ảnh hưởng MỌI quy trình gọi nó. Sub-process nhúng chỉ nằm trong một mô hình, không tái sử dụng**
C. Transaction — vì có viền đậm
D. Event sub-process — vì có dấu +

**Câu 16.** Khung **viền đôi** có nhánh **hủy (X)** và **hoàn tiền**: đây là gì, và thứ tự bù trừ ra sao?

A. Sub-process nhúng; bù trừ cùng thứ tự
B. **Transaction sub-process; bù trừ chạy NGƯỢC thứ tự thực hiện — bước nào làm sau thì hoàn tác trước**
C. Call activity; bù trừ do quy trình ngoài quyết định
D. Event sub-process; bù trừ chạy song song

### Đáp án và giải thích

| Câu | Đáp án | Giải thích |
|---|---|---|
| **1** | **B** | ★ **Cặp lỗi kinh điển: XOR tách → AND gộp.** XOR chỉ kích hoạt **một** nhánh → **hai nhánh kia không có token** → AND gộp **chờ đủ ba, chờ mãi**. A sai: ba nhánh *"đều quay về"* **không có nghĩa là đúng** — quan trọng là **cổng gộp yêu cầu bao nhiêu token**. C sai: đồng bộ thiếu là **AND tách → XOR gộp** (ngược lại). D sai: có End |
| **2** | **B** | ★ **Đổi cổng GỘP thành XOR sửa được bế tắc** vì XOR **không chờ**. Nhưng **phải kiểm tra ý định**: nếu nghiệp vụ muốn **làm cả ba song song**, cách sửa đúng là **đổi cổng TÁCH thành AND**. A sai: XOR **không chờ**. C sai: chỉ **một** nhánh được kích hoạt nên **một** token. D sai: XOR gộp **hoàn toàn hợp lệ** |
| **3** | **B** | ★ **AND tách (+) → XOR gộp (X)** = **đồng bộ thiếu**. AND sinh **hai** token; XOR **không chờ** nên **cả hai** đi qua → đoạn sau chạy **hai lần**. A sai: AND gộp mới gây bế tắc. C sai: **cú pháp hợp lệ** — lỗi ở **ngữ nghĩa**. D sai |
| **4** | **B** | ★ **Hậu quả cụ thể của lack of sync**: **hai bút toán**, **hai email**. A sai: đó là hậu quả **deadlock**. C sai: **không có lỗi cú pháp**. D sai: **có sai kết quả** — đó chính là điểm nguy hiểm |
| **5** | **C** | ★ **Điều kiện không bao phủ**: 0,4 **không thỏa** *"thiếu ≥ 0,5"* và cũng **không thỏa** *"đạt từ 0,3"* (vì 0,4 lệch nghĩa là **không đạt**). Token **kẹt tại cổng TÁCH** — biến thể deadlock **không nằm ở cổng gộp**. A, B sai: không nhánh nào thỏa. D sai: XOR **chỉ chọn một** |
| **6** | **B** | ★ **Quy tắc 5**: **loại trừ + bao phủ hết**, và **nên có nhánh mặc định**. A sai: thêm AND chỉ **tăng phức tạp**, không sửa điều kiện. C sai: AND **làm cả hai nhánh** — sai nghiệp vụ. D sai: **bỏ nhánh** làm mất chức năng, và vẫn có thể hở điều kiện |
| **7** | **B** | **1. Ký hợp đồng giấy → bàn tay (manual)** vì **ngoài hệ thống**. **2. Nhập lên cổng → hình người (user)** vì **có hệ thống**. **3. Gọi API → bánh răng (service)**. **5. Gửi email → phong bì (send)**. A sai: đảo 1 và 2. C sai: 3 là **service** không phải script; 5 là **send** không phải **business rule**. D sai: 1 là **manual** |
| **8** | **B** | ★ **Business rule task** tồn tại **chính vì** lý do này: **quy tắc thay đổi thường xuyên** → **tách khỏi mã**. A sai: đó là **script task**. C sai: **service** là gọi API. D sai: **manual** là làm tay |
| **9** | **B** | ★ **Viền nét ĐỨT = KHÔNG NGẮT** → hoạt động **vẫn chạy**, **sinh thêm token**. A, D sai: **đồng hồ không tự động ngắt** — phải xem **nét vẽ**. C sai: **loại sự kiện không quyết định** ngắt/không ngắt; **nét vẽ mới quyết định** |
| **10** | **B** | ★ **Hai sự kiện biên độc lập**: nhắc nhở **đã sinh token riêng** → nhánh đó **không bị ảnh hưởng**. Sự kiện **ngắt** hủy **token trong hoạt động chính**. A sai: rút đơn là **ngắt**. C sai: **nhiều sự kiện biên là hợp lệ**. D sai: hoạt động **bị hủy**, không chạy lại |
| **11** | **B** | ★ **Terminate xóa MỌI token**; **kết thúc thường chỉ tiêu thụ MỘT token**. Vì nhắc nhở đã sinh token **song song**, kết thúc thường **không dừng được nhánh đó** → **"đã hủy đơn" mà vẫn gửi nhắc nhở**. A sai. C sai: cả hai **hợp lệ cú pháp**. D sai: **cả hai nhánh** đều tiếp tục |
| **12** | **B** | ★ **Message flow không nối trong cùng pool** (quy tắc 2). (a) và (b) **đúng** vì nối **hai pool khác nhau** bằng nét đứt. C sai: (a) đúng. D sai |
| **13** | **B** | ★ **Sequence flow không vượt ranh giới pool** (quy tắc 1) — **quy tắc bị vi phạm nhiều nhất**. A sai: **mũi tên không làm nó hợp lệ**. C sai: đây là **lỗi mô hình**, không phải thẩm mỹ — engine **không thực thi** đúng. D sai: hậu quả là **không mô tả đúng quan hệ hai tổ chức**, không phải gửi hai lần |
| **14** | **B** | **Pool hộp đen** là **khái niệm hợp lệ**, dùng khi **đối tác ngoài** chỉ cần **nhận/gửi thông điệp**. A sai: **rỗng là hợp lệ** với hộp đen. C sai: **lane nằm TRONG pool**, phải có pool chứa. D sai: **sub-process nằm trong pool**, không phải pool |
| **15** | **B** | ★ **Viền đậm + dấu `+` = call activity**. Khác biệt **cốt lõi** không phải hình thức mà **hệ quả bảo trì**: **sửa một nơi, ảnh hưởng mọi nơi** — vừa là **lợi thế** (nhất quán) vừa là **rủi ro** (một lỗi lan rộng). A, C, D sai về **loại cấu trúc** |
| **16** | **B** | ★ **Viền đôi = transaction**; **bù trừ chạy NGƯỢC thứ tự** — đây là **bẫy số 6** của Chương 2. A sai: **cùng thứ tự là sai bản chất**. C sai: transaction **tự quản lý bù trừ**. D sai: **bù trừ không chạy song song** — nó **tuần tự ngược** |

> ★ **Tự chấm**: **13–16 đúng** = đã sẵn sàng cho Phần II. **9–12** = xem lại **dạng 3, 4, 9**. **Dưới 9** = đọc lại **06.1 và 06.2** rồi làm lại từ đầu, **không mở đáp án**.

---

## 06.5 Bảng chẩn đoán 10 giây — in ra và dán trước mặt khi thi

| Nhìn thấy | Chẩn đoán ngay | Từ khóa đáp án |
|---|---|---|
| **Tách X ... gộp +** | **Bế tắc** | deadlock · treo vĩnh viễn · token không bao giờ đến |
| **Tách + ... gộp X** | **Đồng bộ thiếu** | lack of sync · chạy hai lần · hai email · hai bút toán |
| **Cổng X có điều kiện không phủ hết** | **Bế tắc tại cổng tách** | điều kiện không bao phủ · lỗ hổng điều kiện |
| **Nét LIỀN nối hai pool** | **Vi phạm cú pháp** | sequence flow không vượt pool |
| **Nét ĐỨT nối hai phần tử cùng pool** | **Vi phạm cú pháp** | message flow không nối trong pool |
| **Viền đôi NÉT ĐỨT trên task** | **Biên KHÔNG ngắt** | hoạt động vẫn tiếp tục · sinh thêm token |
| **Viền đôi NÉT LIỀN trên task** | **Biên NGẮT** | hoạt động bị dừng · hủy token |
| **Ngũ giác / thoi có phong bì + đồng hồ** | **Event-based gateway** | chờ cái đến trước · hủy nhánh còn lại · CHỈ TÁCH |
| **Tròn ĐẶC ở cuối** | **Terminate** | dừng toàn bộ · xóa mọi token |
| **Khung nét đứt có start riêng** | **Event sub-process** | kích hoạt bất kỳ đâu · không cần biên |
| **Khung viền ĐẬM, dấu +** | **Call activity** | tái sử dụng · sửa một nơi ảnh hưởng mọi nơi |
| **Khung viền ĐÔI** | **Transaction** | cancel · bù trừ NGƯỢC thứ tự |
| **Ba gạch DỌC** | **Đa thể hiện song song** | hàng rào · cùng lúc · chờ đủ |
| **Ba gạch NGANG** | **Đa thể hiện tuần tự** | hàng đợi · lần lượt |
| **Bàn tay** | **Manual task** | ngoài hệ thống · số hóa |
| **Hình người** | **User task** | trên hệ thống · ứng viên AI (A4) |
| **Bánh răng** | **Service task** | API · đã tự động |
| **Bảng** | **Business rule task** | DMN · quy chế hay đổi |
| **Phong bì (task)** | **Send/Receive task** | gửi / **chờ nhận = điểm chờ** |
| **Mũi tên quay lui** | **Bù trừ** | hoàn tác · ngược thứ tự |

---

## 06.6 Bảy câu hỏi tự kiểm trước khi nộp bài thi

| # | Câu hỏi | Nếu trả lời "không" thì |
|---|---|---|
| **1** | Mình đã **đếm số sự kiện bắt đầu** chưa? | Có thể **bỏ sót một dòng token** → mọi kết luận sau sai |
| **2** | Mình đã **viết số token** lên hình, hay chỉ **nhìn bằng mắt**? | **Trace lại**, viết ra giấy |
| **3** | Mình đã so **cặp cổng tách–gộp** chưa? | Nhìn lại **mọi** cổng, không chỉ cổng gần chỗ nghi ngờ |
| **4** | Câu hỏi hỏi **lỗi hình thức** hay **hậu quả nghiệp vụ**? | Đọc lại câu hỏi — chọn nhầm loại là **sai dù hiểu đúng** |
| **5** | Mình có đang **suy luận về chữ** thay vì **về ký hiệu** không? | Quay lại **06.1**, đọc ký hiệu |
| **6** | Đáp án mình chọn có chứa từ **"luôn"**, **"chắc chắn"**, **"mọi trường hợp"**? | ★ **Nghi ngờ ngay** — BPMN là ngôn ngữ **theo mục đích**, hầu như không có gì **luôn đúng** |
| **7** | Mình đã dành **quá 2 phút** cho câu này? | ★ **Đánh dấu, đi tiếp** — quay lại ở vòng 3 |

---

## 06.7 Ba tư tưởng để nhớ cả 12 dạng câu

| # | Tư tưởng | Dạng câu nó giải quyết |
|---|---|---|
| **1** | ★ **Tách gì thì gộp nấy** | Dạng 3, 4 (deadlock, lack of sync) |
| **2** | ★ **Cổng rẽ nhánh, SỰ KIỆN chờ đợi** | Dạng 5, 8, 9, 12 (chọn cổng, vị trí sự kiện, biên, event-based) |
| **3** | ★ **Ký hiệu là sự thật, chữ là diễn giải** | Dạng 6, 7, 10, 11 (task, marker, kết thúc, luồng) |

> ★ **Nếu chỉ còn 10 phút trước khi vào phòng thi**: đọc **bảng chẩn đoán 10 giây** ở 06.5 và **ba tư tưởng** ở 06.7. Đó là **toàn bộ Phần II cô đọng trong một trang**.

---

*Hết Phần II. Tiếp theo: `07-TuKiemTra-12-cau.md` — đáp án chi tiết 12 câu tự kiểm tra cuối đề cương (phần giảng viên ghi rõ "nếu làm đúng 12 câu này là đã nắm được 80% nội dung ôn tập").*
