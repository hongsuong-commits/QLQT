# CHƯƠNG 3 — TỰ ĐỘNG HÓA THÔNG MINH VÀ AI AGENT

> **Vị trí trong đề**: khoảng **5–6 câu Phần I**. Đề ra chủ yếu ở dạng **tình huống chọn mức tự chủ / chọn mẫu thiết kế / chọn ngưỡng tin cậy**, và dạng **tìm nguyên nhân** ("vì sao hệ thống AI này thất bại").
>
> **Sợi chỉ đỏ của chương** (câu này trả lời được phần lớn câu hỏi tình huống):
> ***Dùng AI ở nơi cần PHÁN ĐOÁN, dùng luật ở nơi cần CHẮC CHẮN.***
> Hệ quả: **AI chuẩn bị — luật quyết định — con người chịu trách nhiệm.**
>
> Và câu hỏi xuyên suốt để tự kiểm tra: ***"Bước này cần phán đoán hay cần chắc chắn?"***

---

## 3.0 Bản đồ chương và mạch nối từ Chương 2

```
CHƯƠNG 2 đã cho:                    CHƯƠNG 3 trả lời:
• BPMN mô tả quy trình          →   • Bước nào CÓ THỂ giao cho AI
• Mô hình as-is có số liệu      →   • Giao theo CÁCH NÀO (gợi ý / duyệt / ngưỡng / tự chủ)
• Mô hình to-be (Bài 2.6)       →   • Với LAN CAN nào
• Loại task manual/user/service →   • Chọn MẪU THIẾT KẾ nào + biện luận tin cậy–chi phí–độ trễ
```

```
3.1 TỰ ĐỘNG HÓA THÔNG MINH (IA)          3.2 TÁC NHÂN AI (AI AGENT)
 • IA = BPM + RPA + AI + Analytics         • LLM: 3 đặc điểm bản chất
 • 3 lớp năng lực: nhận thức–suy luận–hành động  • Workflow vs Agent
 • 8 tiêu chí so sánh RPA ↔ IA             • 6 thành phần kiến trúc
 • 4 mức tự chủ + NGƯỠNG TIN CẬY ★          • MCP, kỹ thuật ngữ cảnh, 4 nhóm chỉ số
 • G1–G5 + 5 chiều trưởng thành            • 7 MẪU THIẾT KẾ ★ + ánh xạ BPMN
```

> **Ba chương nối thành một chuỗi**: Chương 2 **mô tả** quy trình → Chương 3 **thiết kế phần thông minh** → Chương 4 **dựng hệ thống chạy được**.
> Vì thế Bài 3.1 **bắt đầu từ chính mô hình to-be của Bài 2.6**. *Em nào chưa hoàn thành Bài 2.6 sẽ khó theo kịp phần thực hành.*

---

## 3.1 Tự động hóa thông minh (IA)

### 3.1.1 Khái niệm IA — và vì sao nó không phải "RPA tốt hơn"

#### Định nghĩa

> **Tự động hóa thông minh (IA)** là việc **KẾT HỢP** các công nghệ **tự động hóa theo luật** (RPA, BPMS, workflow) với các công nghệ **trí tuệ nhân tạo** (thị giác máy tính, xử lý ngôn ngữ tự nhiên, học máy, mô hình ngôn ngữ lớn) và các công nghệ **phân tích quy trình** (process mining), nhằm tự động hóa **cả PHẦN THAO TÁC lẫn PHẦN NHẬN THỨC** của một **quy trình đầu–cuối**.

#### Công thức phải thuộc

```
IA = BPM (điều phối) + RPA (thao tác) + AI (nhận thức) + Analytics (đo lường và học)
```

| Thành phần | Vai trò trong công thức | Nếu thiếu thì sao |
|---|---|---|
| **BPM** | **Điều phối** — quyết định bước nào chạy, theo thứ tự nào | Có nhận thức nhưng **không ai điều phối** → các mảnh rời rạc |
| **RPA** | **Thao tác** — chạm vào hệ thống, nhập liệu, gửi thông báo | "Hiểu" nhưng **không làm được gì** |
| **AI** | **Nhận thức** — đọc hiểu, phân loại, phán đoán | Chỉ chạy được luật if–then, tức là **dừng ở A3** |
| **Analytics** | **Đo lường và học** — biết hệ thống còn đúng hay đã trôi | ★ **Không có đo lường thì không có IA, chỉ có hy vọng** |

> ★ **Từ khóa quan trọng nhất: KẾT HỢP.** IA **không phải một công nghệ mới thay thế RPA**. Nó là cách **ghép bốn nhóm công nghệ đã có** lại với nhau sao cho **mỗi nhóm làm đúng việc mà nó giỏi nhất**.
>
> **Vì sao Analytics bắt buộc phải có?** Vì thành phần AI **có tính xác suất** → phải **đo liên tục** mới biết nó **còn chạy đúng hay không**. Đây là câu trả lời cho câu hỏi "vì sao công thức IA có Analytics" — và nó nối trực tiếp với **sai lầm thứ 3** ở 3.1.3.

#### Ba lớp năng lực của một hệ thống IA

| # | Lớp | Câu hỏi nó trả lời | Công nghệ | Ví dụ trong quy trình |
|---|---|---|---|---|
| **1** | **NHẬN THỨC** (perception) | "**Trong tài liệu này có gì?**" | OCR, IDP, nhận dạng giọng nói, thị giác máy tính, **LLM đa phương thức** | Trích xuất **số tiền, ngày, mã số thuế** từ ảnh hóa đơn |
| **2** | **SUY LUẬN** (reasoning) | "**Trường hợp này nên xử lý ra sao?**" | Phân loại, dự đoán, chấm điểm rủi ro, **LLM suy luận** | Phân loại khiếu nại theo **mức độ nghiêm trọng** |
| **3** | **HÀNH ĐỘNG** (action) | "**Thực hiện việc đó ở đâu?**" | **RPA, API, workflow engine** | Cập nhật hệ thống, gửi thông báo, tạo bút toán |

> ★ **Ba lớp này gần như LUÔN xuất hiện cùng nhau.** Một dự án IA **chỉ có lớp 1 mà thiếu lớp 3** sẽ dừng lại ở mức *"trích xuất được dữ liệu rồi… để đó"*.
>
> **Bài học thực tiễn**: đây là kiểu thất bại rất hay gặp — làm demo OCR rất ấn tượng, rồi **không có gì ghi vào hệ thống**, nên **không tiết kiệm được một giờ công nào**.

#### Tám tiêu chí so sánh RPA truyền thống và IA (bảng "phải thuộc")

| # | Tiêu chí | **RPA truyền thống** | **Tự động hóa thông minh (IA)** |
|---|---|---|---|
| 1 | **Dữ liệu đầu vào** | **Có cấu trúc** | Có cấu trúc, **bán cấu trúc và phi cấu trúc** |
| 2 | **Logic xử lý** | **Luật tường minh** do người viết | **Luật + mô hình học từ dữ liệu + suy luận của LLM** |
| 3 | **Xử lý ngoại lệ** | **Dừng và báo lỗi** | **Suy luận** để xử lý hoặc **phân loại rồi chuyển tiếp** |
| 4 | **Khả năng thích ứng** | **Không**; phải sửa kịch bản | **Có, ở mức độ nhất định** |
| 5 | ★ **Tính xác định** | **CAO** — cùng đầu vào cho cùng đầu ra | **THẤP HƠN** — kết quả **có tính xác suất** |
| 6 | ★ **Khả năng giải thích** | **Cao** — đọc được kịch bản | **Thấp hơn**; cần **cơ chế ghi vết và đánh giá** |
| 7 | ★ **Chi phí vận hành** | Theo **số bot và giờ chạy** | Theo **số bot VÀ lượng token / lệnh gọi mô hình** |
| 8 | ★ **Rủi ro chính** | **Bot hỏng khi giao diện đổi** | **Kết quả SAI nhưng TRÔNG HỢP LÝ** (hallucination) |

> ★ **Bốn dòng cuối (5–8) là bốn dòng quan trọng nhất**: chúng cho thấy **IA không phải là "RPA tốt hơn", mà là một loại hệ thống có ĐẶC TÍNH RỦI RO HOÀN TOÀN KHÁC.**
>
> **Cách diễn đạt để nhớ**: *RPA sai một cách **ồn ào** (bot dừng, có log lỗi). IA sai một cách **im lặng** (văn bản trôi chảy, con số hợp lý, không ai nghi ngờ).* Loại sai thứ hai nguy hiểm hơn vì **không kích hoạt bất kỳ cảnh báo nào**.

#### Nguyên tắc thiết kế cốt lõi — và vì sao KHÔNG THỂ "chọn cả hai"

> **Dùng AI ở nơi cần PHÁN ĐOÁN, dùng luật ở nơi cần CHẮC CHẮN.**

**Lập luận đầy đủ** (đây là câu hỏi lý thuyết có thể ra):

> Năng lực **nhận thức** của mô hình đến từ **chính đặc tính xác suất** của nó. Một hệ thống **vừa suy luận được trên dữ liệu chưa từng gặp, vừa cho kết quả xác định tuyệt đối** — **KHÔNG TỒN TẠI**.
> Do đó lựa chọn **không phải** là "có dùng AI hay không", mà là **"dùng ở bước nào"**.

| Loại bước | Công cụ đúng | Ví dụ | Vì sao |
|---|---|---|---|
| **Cần chắc chắn** | **LUẬT** (dù mô hình cũng làm được) | Tính tiền, cộng điểm, kiểm tra điều kiện tiên quyết, đối chiếu số liệu | Sai một đồng là sai; **không có "gần đúng"** |
| **Cần phán đoán** | **AI** | Đọc hiểu tài liệu, phân loại theo ngữ cảnh, soạn nháp văn bản, tóm tắt | Luật **không viết nổi**; chấp nhận "gần đúng + kiểm chứng" |

> ★ **Một hệ thống tốt không phải là hệ thống dùng NHIỀU AI nhất, mà là hệ thống đặt AI ĐÚNG CHỖ.**
>
> **Đây là tiêu chí chấm điểm của Bài 3.1**: nhóm nào gán "dùng AI" cho **mọi bước** sẽ **bị trừ điểm**, vì đó là dấu hiệu **chưa phân biệt được phán đoán với tính toán**.

#### Siêu tự động hóa (Hyperautomation) — khác biệt nằm ở QUẢN TRỊ, không ở công nghệ

> **Siêu tự động hóa** là cách tiếp cận ở **CẤP TỔ CHỨC**: **phối hợp có hệ thống** nhiều công nghệ nhằm tự động hóa **mọi thứ có thể tự động hóa được**, một cách **CÓ QUẢN TRỊ**.

```
Process mining  →  BPMS  →  RPA + AI  →  Low-code
(phát hiện cơ hội)  (điều phối)  (thực thi)  (mở rộng nhanh)
```

| Câu hỏi | Trả lời |
|---|---|
| **Khác biệt nằm ở đâu?** | ★ **KHÔNG phải ở công nghệ** — các công nghệ này đã được nói đến trong **từng dự án đơn lẻ**. Khác biệt nằm ở **DANH MỤC** (danh sách cơ hội tự động hóa **được xếp hạng và theo dõi**) và ở **NĂNG LỰC TỔ CHỨC** (đội ngũ, quy chuẩn, cơ chế phê duyệt) |
| **Vì sao quan trọng với người học HTTT?** | Vì **phần lớn thất bại của tự động hóa KHÔNG phải thất bại kỹ thuật**. Doanh nghiệp làm được **năm bot chạy tốt, rồi dừng lại** — không ai biết **nên làm tiếp cái gì, ai chịu trách nhiệm, và bot cũ ai bảo trì** |
| **Câu chốt** | *Một dự án tự động hóa là chuyện **kỹ thuật**; siêu tự động hóa là chuyện **quản trị**.*

### 3.1.2 Giá trị, ba cách phân loại và ngưỡng tin cậy

#### Năm vai trò của IA trong quy trình kinh doanh

| # | Vai trò | Nội dung | Ví dụ |
|---|---|---|---|
| **1** | **Mở rộng phạm vi tự động hóa** | Sang các bước **trước đây bắt buộc phải có con người** vì liên quan đến **đọc hiểu và phán đoán** | Đọc hợp đồng PDF quét để trích điều khoản |
| **2** | ★ **Giảm tỷ lệ ngoại lệ** | Chương 2 đã chỉ ra **ngoại lệ là kẻ thù của tự động hóa**. IA xử lý được nhiều trường hợp *"gần giống nhưng không giống"* thay vì **đẩy tất cả cho con người** | Ảnh giấy chứng nhận chụp nghiêng, mờ, lệch khung |
| **3** | **Rút ngắn thời gian ra quyết định** | **Tổng hợp và chuẩn bị sẵn thông tin** cho người quyết định — *người vẫn quyết, nhưng không mất thời gian đi tìm dữ liệu* | Bảng tóm tắt hồ sơ 30 trang thành nửa trang |
| **4** | **Cá nhân hóa ở quy mô lớn** | Phản hồi khách hàng **theo ngữ cảnh cụ thể** thay vì **mẫu cố định cho mọi trường hợp** | Email trả lời riêng từng sinh viên |
| **5** | **Phát hiện cơ hội cải tiến** | Nhờ **phân tích nhật ký quy trình** — nối trực tiếp với **giai đoạn 6** của vòng đời BPM ở Chương 1 | Process mining chỉ ra nhánh bất thường |

> ★ **Vai trò số 2 là vai trò BỊ ĐÁNH GIÁ THẤP NHẤT.** Giảm tỷ lệ ngoại lệ thường mang lại **giá trị lớn hơn cả việc tự động hóa thêm một bước mới**, vì **mỗi ngoại lệ đều kéo theo thời gian chờ**.

**Lập luận đầy đủ** (rất dễ thành câu hỏi "vì sao"): một ngoại lệ không chỉ tốn **thời gian xử lý của chính nó**, mà còn:
- **phá vỡ luồng tự động** → hồ sơ **rời khỏi đường chính** và **nằm chờ** trong hàng đợi của con người (thời gian chờ ≫ thời gian xử lý — xem 2.2.8);
- **kéo theo nhiều lần bàn giao** (chuyển lên cấp có thẩm quyền);
- **không đo được** nếu không có KPI → **không ai quản trị**.

→ Giảm `p` trong công thức rework ở Chương 2 **luôn** có lợi ích **phi tuyến**.

#### Phân loại IA theo NĂNG LỰC — năm nhóm

| # | Nhóm | Năng lực chính | Ứng dụng điển hình |
|---|---|---|---|
| **1** | **Xử lý tài liệu thông minh** (IDP) | **Đọc, trích xuất và kiểm tra** tài liệu | Hóa đơn, hợp đồng, hồ sơ nhập học |
| **2** | **Tự động hóa hội thoại** | **Hiểu và trả lời ngôn ngữ tự nhiên** | Trợ lý tư vấn tuyển sinh, tổng đài |
| **3** | **Tự động hóa dự đoán** | **Dự báo, chấm điểm, phát hiện bất thường** | Dự báo tỷ lệ bỏ học, phát hiện gian lận |
| **4** | **Tự động hóa sinh nội dung** | **Soạn thảo, tóm tắt, dịch, sinh mã** | Soạn công văn trả lời, tóm tắt biên bản |
| **5** | **Tự động hóa tác nhân** (agentic) | **Lập kế hoạch, gọi công cụ, tự điều chỉnh** | Tự tra cứu nhiều hệ thống rồi tổng hợp hồ sơ |

> ★ **Ranh giới quan trọng nhất trong bảng này nằm giữa nhóm 4 và nhóm 5:**
> - **Bốn nhóm đầu: AI làm MỘT việc, TA định sẵn việc đó.** Đầu vào rõ, đầu ra rõ, **dễ kiểm thử bằng bộ dữ liệu cố định**. **Đây là nơi NÊN BẮT ĐẦU với mọi tổ chức.**
> - **Nhóm thứ năm: AI tự quyết định LÀM NHỮNG VIỆC GÌ.** Mạnh hơn hẳn nhưng **khó kiểm toán**, **chi phí và độ trễ khó dự đoán**. Toàn bộ mục 3.2 dành cho nhóm này.

#### Phân loại IA theo MỨC ĐỘ TỰ CHỦ — bốn mức (bảng phải thuộc)

| Mức tự chủ | Vai trò của **AI** | Vai trò của **con người** | Ví dụ | Mức A (Ch.1) |
|---|---|---|---|---|
| **1. Gợi ý** | **Đề xuất**, con người quyết định | **Quyết định MỌI trường hợp** | AI gợi ý phân loại hồ sơ | **A3–A4** |
| **2. Thực thi có phê duyệt** | **Chuẩn bị hành động** | **Phê duyệt TRƯỚC KHI có hiệu lực** | AI soạn email, người bấm gửi | **A4** |
| **3. Thực thi theo ngưỡng** | **Tự xử lý khi độ tin cậy cao** | **Xử lý phần còn lại** | Tự duyệt khi điểm tin cậy > 0,95 | **A4** |
| **4. Tự chủ có giám sát** | **Tự lập kế hoạch và hành động** | **Giám sát, kiểm toán định kỳ** | Agent tự đối soát dữ liệu hằng đêm | **A5** |

**Bảng ánh xạ sang ba mô hình "con người trong vòng lặp" của Chương 1** (đề rất hay hỏi chéo):

| Mức tự chủ | Mô hình human-in/on/out | Vì sao |
|---|---|---|
| **1. Gợi ý** | **Human-in-the-loop** | Người quyết **mọi** trường hợp |
| **2. Thực thi có phê duyệt** | **Human-in-the-loop** | Có bước phê duyệt **trước khi** hành động có hiệu lực |
| **3. Thực thi theo ngưỡng** | ★ **Mô hình LAI**: một phần **in-the-loop**, một phần **out-of-the-loop** | Phần trên ngưỡng **không có người**; phần dưới ngưỡng **có người** |
| **4. Tự chủ có giám sát** | **Human-on-the-loop** | Máy làm, người **theo dõi và can thiệp được** |

> ★ **Hai tiêu chí chọn mức vẫn là hai tiêu chí cũ của Chương 1**: **mức độ thiệt hại khi sai** và **khả năng đảo ngược của hành động**.
>
> **Bài 3.1 yêu cầu gán mức tự chủ cho từng hoạt động — hãy dùng ĐÚNG BỐN TÊN GỌI trong bảng này** ("gợi ý", "thực thi có phê duyệt", "thực thi theo ngưỡng", "tự chủ có giám sát").

#### Cơ chế NGƯỠNG ĐỘ TIN CẬY — mẫu thiết kế quan trọng nhất trong thực tiễn

> Quy trình được chia thành **LUỒNG TỰ ĐỘNG** và **LUỒNG CÓ CON NGƯỜI**, dựa trên **điểm tin cậy do mô hình trả về**.

```
[Mô hình phân loại] → <Điểm tin cậy ≥ ngưỡng?> ──Có──► [Xử lý thẳng — tự động]
                                                    └─Không─► [Chuyển chuyên viên xử lý]
```

**Hai khái niệm cần phân biệt:**

| Khái niệm | Nội dung |
|---|---|
| **Xử lý thẳng** (straight-through processing) | Phần hồ sơ **đi hết quy trình mà KHÔNG có con người chạm vào** |
| **Điểm tin cậy đến từ đâu?** | Hầu hết **mô hình phân loại và trích xuất đều trả về một điểm số kèm kết quả**. Với **LLM**, có thể **yêu cầu mô hình tự đánh giá độ chắc chắn** — nhưng **con số này KÉM TIN CẬY hơn, cần hiệu chỉnh bằng dữ liệu thật**. |

> ★ **Vì sao đây là mẫu quan trọng nhất?** Vì nó cho phép **hưởng lợi ích của AI mà vẫn kiểm soát được rủi ro**: phần **dễ và chắc chắn** thì máy làm, phần **khó và mơ hồ** thì người làm. **Và tỷ lệ hai phần đó ĐO ĐƯỢC.**
>
> Điểm cuối cùng là điểm hay bị bỏ qua: ngưỡng tin cậy biến một vấn đề **định tính** ("AI có đáng tin không?") thành một vấn đề **định lượng** ("bao nhiêu % hồ sơ đi luồng tự động, và trong đó sai bao nhiêu %").

#### Chọn ngưỡng là một quyết định KINH TẾ (Bài tập 3.2)

| | **Ngưỡng CAO** (ví dụ 0,99) | **Ngưỡng THẤP** (ví dụ 0,80) |
|---|---|---|
| **Tỷ lệ tự động** | Ít hồ sơ được xử lý tự động → **tiết kiệm ÍT** | Nhiều hồ sơ được xử lý tự động → **tiết kiệm NHIỀU** |
| **Rủi ro sai** | **Rất ít** quyết định sai lọt qua | **Nhiều** quyết định sai lọt qua hơn |
| **Chi phí còn lại** | **Chi phí xử lý thủ công vẫn cao** | **Chi phí khắc phục hậu quả tăng** |
| **Phù hợp khi** | Một quyết định sai gây **thiệt hại LỚN** hoặc **KHÔNG ĐẢO NGƯỢC ĐƯỢC** | Sai sót **dễ phát hiện, dễ sửa**, chi phí mỗi lần sai **thấp** |

**Cách lập luận chuẩn của Bài 3.2** (rất có thể là dạng câu hỏi tính toán/kinh tế):

> Gọi **X** = **chi phí xử lý thủ công một hồ sơ**; **Y** = **thiệt hại của một quyết định sai**.
> Với **mỗi ngưỡng**, ước lượng: **(a) tỷ lệ hồ sơ được tự động hóa**, **(b) tỷ lệ sai trong nhóm đó**, rồi **tính tổng chi phí kỳ vọng**:

```
Tổng chi phí kỳ vọng = (tỷ lệ còn phải xử lý thủ công × X)
                     + (tỷ lệ tự động × tỷ lệ sai trong nhóm tự động × Y)
```

> ★ **Ngưỡng hợp lý là ngưỡng làm TỔNG CHI PHÍ KỲ VỌNG NHỎ NHẤT — KHÔNG PHẢI ngưỡng cao nhất.**
>
> **Trường hợp đặc biệt phải nhớ**: khi **Y rất lớn và không đảo ngược được** — ví dụ **quyết định hành chính ảnh hưởng quyền lợi người học** — thì **đáp án đúng có thể là KHÔNG TỰ ĐỘNG HÓA bước đó ở BẤT KỲ NGƯỠNG NÀO**.
> Đây là phương án "không hành động" mà đề rất hay đưa vào và sinh viên hay bỏ qua vì nghĩ phải chọn một ngưỡng.

**Ví dụ tính minh họa** (số liệu giả định, để luyện lập luận):

| | Ngưỡng 0,99 | Ngưỡng 0,80 |
|---|---|---|
| Tỷ lệ tự động | 40% | 85% |
| Tỷ lệ sai trong nhóm tự động | 0,5% | 3% |
| Chi phí thủ công còn lại | 60% × 100.000đ = **60.000đ/hồ sơ** | 15% × 100.000đ = **15.000đ/hồ sơ** |
| Chi phí sai | 40% × 0,5% × 2.000.000đ = **4.000đ** | 85% × 3% × 2.000.000đ = **51.000đ** |
| **Tổng kỳ vọng** | **64.000đ** | **66.000đ** |

→ Với **X = 100.000đ, Y = 2.000.000đ**, ngưỡng **0,99 tốt hơn** dù chỉ tự động được 40%.
Nhưng nếu **Y = 200.000đ** (sai sót rẻ, dễ sửa) thì ngưỡng **0,80 thắng rõ**. **Kết luận**: ngưỡng đúng **phụ thuộc vào Y**, không có ngưỡng vạn năng.

#### Phân loại IA theo VỊ TRÍ trong quy trình — ba vị trí

| # | Vị trí | Nội dung | Mức độ | Tương ứng BPMN |
|---|---|---|---|---|
| **1** | **AI tại MỘT BƯỚC** (task-level) | Thay thế hoặc **hỗ trợ một hoạt động cụ thể** | **Dễ triển khai, dễ kiểm soát, dễ đo** | ★ **Một service task hoặc user task được nâng cấp** |
| **2** | **AI tại ĐIỂM QUYẾT ĐỊNH** | Thay **logic của một cổng XOR** bằng **mô hình phân loại** | Cần **ĐẶC BIỆT THẬN TRỌNG** khi quyết định có **hệ quả pháp lý** hoặc **ảnh hưởng quyền lợi con người** | **Cổng XOR** — nhưng điều kiện rẽ nhánh **nay do mô hình sinh ra** |
| **3** | **AI tại TẦNG ĐIỀU PHỐI** | **Agent tự quyết định TRÌNH TỰ các bước** | **Mạnh nhất nhưng KHÓ KIỂM TOÁN NHẤT** | ★ **KHÔNG CÓ** — đây chính là chỗ BPMN **không mô tả được** |

> ★ **Ba vị trí này tăng dần về SỨC MẠNH và cũng tăng dần về KHÓ KHĂN KHI GIẢI TRÌNH.**
> Với **quyết định hành chính**, **vị trí 2 đã cần cân nhắc rất kỹ**; **vị trí 3 hầu như không phù hợp**.
>
> **Hai thực hành tốt kèm theo (dễ thành câu hỏi tình huống):**
> - **Ở vị trí 2**: giữ **nguyên cổng XOR trong mô hình BPMN** và **chỉ ghi chú** rằng điều kiện do mô hình quyết định → **quy trình vẫn kiểm toán được theo cấu trúc cũ**.
> - **Ở vị trí 3**: thứ **thay cho sơ đồ luồng là NHẬT KÝ** — agent đã gọi công cụ nào, với tham số gì, nhận kết quả gì. **Không có nhật ký thì không có kiểm toán.**

### 3.1.3 Lộ trình tiến hóa và mô hình trưởng thành

#### Lộ trình năm giai đoạn G1–G5

| Giai đoạn | Đặc trưng | **Điều kiện TIÊN QUYẾT** |
|---|---|---|
| **G1. Số hóa** | **Biểu mẫu điện tử** thay giấy tờ; **dữ liệu bắt đầu được ghi nhận** | Hạ tầng và **kỷ luật nhập liệu** |
| **G2. Tự động hóa theo luật** | **RPA, workflow**; quy trình **được chuẩn hóa** | **Quy trình ổn định, ĐÃ MÔ HÌNH HÓA** (Chương 2) |
| **G3. Tự động hóa thông minh** | **AI xử lý bước nhận thức**; xử lý **theo ngưỡng tin cậy** | **Dữ liệu đủ và sạch**, có **cơ chế đánh giá** |
| **G4. Tự động hóa tác nhân** | **Agent điều phối nhiều công cụ**, xử lý **nhiệm vụ mở** | **Công cụ có API tốt**, có **lan can và nhật ký kiểm toán** |
| **G5. Quy trình tự tối ưu** | Hệ thống **tự phát hiện sai lệch** và **đề xuất điều chỉnh** | **Process mining**, **văn hóa cải tiến liên tục** |

> ★ **Cột "ĐIỀU KIỆN TIÊN QUYẾT" quan trọng hơn cột "ĐẶC TRƯNG".**
>
> **Ba chuỗi phụ thuộc phải thuộc** (câu hỏi "vì sao không được nhảy cóc" hỏi đúng vào đây):
> - **Không có dữ liệu được ghi nhận ở G1** → **không HUẤN LUYỆN và ĐÁNH GIÁ được gì ở G3**.
> - **Không có mô hình quy trình ở G2** → **ở G4 không biết agent đang làm đúng hay sai SO VỚI CÁI GÌ**.
> - **Không có đo lường (G5) và ngưỡng (G3)** → không biết **AI còn đúng hay đã trôi**.

#### Mô hình trưởng thành NĂM CHIỀU — đánh giá năng lực tổ chức

> Đánh giá năng lực tự động hóa của tổ chức **KHÔNG chỉ nhìn công nghệ**.

| # | Chiều | Câu hỏi | Ghi chú |
|---|---|---|---|
| **1** | **Quy trình** | Đã **được mô hình hóa và đo lường** chưa? | **Không có mô hình thì không có đối tượng để tự động hóa** |
| **2** | **Dữ liệu** | Có sẵn không, **có chất lượng** không, và **có ĐƯỢC PHÉP sử dụng** không? | ★ **Câu hỏi thứ ba hay bị bỏ qua nhất** |
| **3** | **Công nghệ** | Hạ tầng, API, nền tảng, khả năng **tích hợp** giữa các hệ thống hiện có | — |
| **4** | **Con người** | **Kỹ năng phân tích quy trình**, kỹ năng **làm việc với AI**, và **năng lực quản trị thay đổi** | — |
| **5** | **Quản trị** | **Ai duyệt, ai chịu trách nhiệm, kiểm toán thế nào, tuân thủ quy định bảo vệ dữ liệu cá nhân** ra sao | ★ Thường là **chiều YẾU NHẤT** ở khu vực công và giáo dục |

> ★ **Chiều YẾU NHẤT quyết định tất cả**: *năng lực tổ chức bị chặn bởi chiều yếu nhất, không phải chiều mạnh nhất. **Công nghệ đỉnh cao không cứu được dữ liệu bẩn.***
>
> Đây là **nguyên lý "thùng gỗ"** (Liebig): sức chứa của thùng do **thanh gỗ ngắn nhất** quyết định. **Câu hỏi tình huống hay ra**: *"Công ty đã mua nền tảng AI hàng đầu nhưng dự án vẫn thất bại — nguyên nhân khả dĩ nhất?"* → **dữ liệu chưa sạch / chưa được phép dùng / thiếu quản trị**, **không phải** "công nghệ chưa đủ mạnh".

#### Ba sai lầm khi triển khai

| # | Sai lầm | Nội dung | Hậu quả |
|---|---|---|---|
| **1** | ★ **Nhảy cóc giai đoạn** | Áp dụng **agent** lên một quy trình **CHƯA được mô hình hóa** và **CHƯA có dữ liệu** | ★ Hậu quả nghiêm trọng nhất **không phải** là agent chạy sai — mà là **KHÔNG THỂ ĐÁNH GIÁ ĐÚNG SAI**, vì **không có chuẩn nào để đối chiếu** |
| **2** | **Tự động hóa lãng phí** | Như cảnh báo ở Chương 1: **phải THIẾT KẾ LẠI trước khi tự động hóa** | *"Dùng AI để làm nhanh hơn một bước lẽ ra nên bị xóa bỏ là cách tiêu tiền TINH VI NHẤT — vì giờ nó còn được gắn nhãn ĐỔI MỚI."* |
| **3** | ★ **Bỏ quên chi phí ĐÁNH GIÁ** | Hệ thống có AI cần **bộ dữ liệu kiểm thử** và **quy trình đánh giá ĐỊNH KỲ** | Chi phí này **gần như luôn bị bỏ sót trong dự toán**, vì nó **không nằm ở giai đoạn xây dựng mà nằm ở giai đoạn VẬN HÀNH** |

> ★ **Vì sao sai lầm 3 NGUY HIỂM NHẤT về lâu dài?**
> Vì **mô hình KHÔNG HỎNG theo kiểu DỪNG LẠI**. Dữ liệu thực tế **thay đổi dần** — mẫu biểu mới, cách viết mới, loại hồ sơ mới — và **độ chính xác TRƯỢT XUỐNG TỪ TỪ mà không ai nhận ra**. Nếu **không có bộ kiểm thử chạy định kỳ**, tổ chức **chỉ phát hiện khi đã có hậu quả**.
>
> Đây gọi là **"trôi dạt khái niệm"** (concept drift) trong ngôn ngữ học máy — nhưng trong đề thi chỉ cần diễn đạt: *sai lệch tích lũy âm thầm*.
>
> **Hệ quả học tập**: đây là lý do **Bài 3.5 yêu cầu các nhóm tự xây bộ kiểm thử — kỹ năng này quan trọng NGANG với kỹ năng thiết kế giải pháp**.

---

## 3.2 Tác nhân AI (AI Agent)

### 3.2.1 Từ mô hình ngôn ngữ đến tác nhân

#### LLM là gì — và ba đặc điểm phải nắm để dùng đúng

> **Mô hình ngôn ngữ lớn (LLM)** là mô hình **DỰ ĐOÁN CHUỖI VĂN BẢN TIẾP THEO** dựa trên **ngữ cảnh được cung cấp**.

| # | Đặc điểm | Nội dung | Hệ quả thiết kế |
|---|---|---|---|
| **1** | ★ **Chỉ biết những gì có trong NGỮ CẢNH** | Và những gì **đã học trong tham số** | Phải **CHỦ ĐỘNG cung cấp dữ liệu nghiệp vụ vào ngữ cảnh** — **mô hình KHÔNG TỰ TRUY CẬP được hệ thống của bạn** |
| **2** | ★ **Có tính XÁC SUẤT** | **Cùng một câu hỏi có thể cho hai câu trả lời khác nhau ở hai lần chạy** | **Không thể kiểm thử bằng cách chạy MỘT LẦN rồi kết luận** |
| **3** | ★ **Có thể tạo nội dung SAI nhưng TRÔI CHẢY** | Hiện tượng **ảo giác (hallucination)** | **MỌI kết quả có hệ quả nghiệp vụ đều cần cơ chế KIỂM CHỨNG** — bằng **luật**, bằng **dữ liệu**, hoặc bằng **con người** |

> ★ **Ba đặc điểm này KHÔNG PHẢI khuyết điểm cần khắc phục — chúng là BẢN CHẤT của công nghệ.**
>
> **Nhiệm vụ của người thiết kế hệ thống KHÔNG phải là làm cho mô hình hết xác suất, mà là THIẾT KẾ HỆ THỐNG XUNG QUANH sao cho đặc tính đó KHÔNG GÂY HẠI.**
>
> Đây là câu chốt của cả chương, và là câu trả lời cho câu hỏi "vì sao tính không xác định vừa là ưu điểm vừa là rủi ro": **chính đặc tính xác suất tạo ra năng lực nhận thức** (nếu xác định tuyệt đối thì chỉ là bảng tra); **và cũng chính nó tạo ra rủi ro**.

#### LLM được tăng cường (augmented LLM) — khối xây dựng cơ bản

> **Khối xây dựng cơ bản của MỌI hệ thống tác nhân**: mô hình được bổ sung **ba năng lực**.

```
                    ┌──────────────┐
   Đầu vào  ──────► │  LLM         │ ──────►  Đầu ra
                    │  + Truy hồi  │
                    │  + Công cụ   │
                    │  + Bộ nhớ    │
                    └──────────────┘
```

| Năng lực | Nội dung | Khắc phục đặc điểm nào |
|---|---|---|
| **Truy hồi** (retrieval) | **Lấy thông tin liên quan từ kho tài liệu và đưa vào ngữ cảnh TRƯỚC KHI mô hình trả lời** — đây chính là **RAG** | Khắc phục **"chỉ biết những gì có trong ngữ cảnh"** |
| **Công cụ** (tools) | Cho phép mô hình **GỌI RA BÊN NGOÀI**: truy vấn CSDL, gọi API, gửi thông báo | ★ Đây là thứ **biến mô hình từ chỗ chỉ NÓI ĐƯỢC thành chỗ LÀM ĐƯỢC** |
| **Bộ nhớ** (memory) | **Giữ lại thông tin giữa các lượt và giữa các phiên** | Không có bộ nhớ thì **mỗi lượt hỏi là một lần bắt đầu lại từ số không** |

> ★ **Rất nhiều bài toán doanh nghiệp CHỈ CẦN ĐÚNG KHỐI NÀY** — một lệnh gọi mô hình kèm truy hồi — **chứ chưa cần đến agent**. Đây là câu nhắc lại quan trọng nhất của chương: **đừng nhảy sang agent**.

#### Workflow vs Agent — bảng phân biệt nền tảng của cả chương

| Tiêu chí | **WORKFLOW** (luồng công việc) | **AGENT** (tác nhân) |
|---|---|---|
| ★ **Ai quyết định bước tiếp theo** | **Người thiết kế**, định sẵn trong mã hoặc sơ đồ | **Chính MÔ HÌNH**, quyết định **tại thời điểm chạy** |
| **Tính dự đoán được** | **Cao** | **Thấp** |
| **Chi phí và độ trễ** | **Thấp và ổn định** | **Cao, khó dự đoán trước** |
| **Kiểm thử** | **Dễ** | **Khó** — **bắt buộc phải có bộ đánh giá** |
| **Khi nào dùng** | Khi **ĐÃ BIẾT trình tự** các bước | Khi **không thể định trước đường đi** nhưng **vẫn kiểm chứng được kết quả** |

> **Cách nhớ ngắn gọn**: ***Workflow là hệ thống mà CON NGƯỜI vẽ đường đi; agent là hệ thống mà MÔ HÌNH tự tìm đường đi.***
>
> ★ **Nguyên tắc**: **bắt đầu bằng giải pháp ĐƠN GIẢN NHẤT vượt qua được bài kiểm thử; chỉ tăng độ phức tạp khi thật sự cần.** Mỗi bậc phức tạp tăng thêm đều làm tăng **chi phí, độ trễ và khó khăn khi gỡ lỗi**.

#### Khi nào NÊN và KHÔNG NÊN dùng agent (bảng ra quyết định)

| **NÊN dùng agent khi** | **KHÔNG NÊN dùng agent khi** |
|---|---|
| **Số bước và trình tự PHỤ THUỘC TỪNG TRƯỜNG HỢP**, không định trước được | **Quy trình đã có luật rõ ràng** → dùng luật, **rẻ hơn và chắc chắn hơn** |
| **Không gian tìm kiếm rộng** — nhiều nguồn, nhiều khả năng phải thử | Yêu cầu **tính xác định và khả năng giải thích cao**: kế toán, chấm điểm học tập, quyết định hành chính |
| **Kết quả CÓ THỂ KIỂM CHỨNG** — bằng luật, bằng kiểm tra tự động, hoặc bằng con người | **Độ trễ phải thấp** — agent chạy nhiều vòng nên **chậm và khó dự đoán** |
| **Sai sót có chi phí CHẤP NHẬN ĐƯỢC và SỬA ĐƯỢC** | Mỗi lần sai gây **thiệt hại lớn và KHÔNG ĐẢO NGƯỢC được** |

> ★ **Điều kiện quan trọng nhất: KẾT QUẢ PHẢI KIỂM CHỨNG ĐƯỢC.**
>
> **Lập luận đầy đủ** (câu hỏi "vì sao" rất dễ ra): Agent hoạt động bằng cách **thử, quan sát phản hồi, rồi điều chỉnh**. Nếu **môi trường KHÔNG trả về tín hiệu đáng tin cậy** về việc làm đúng hay sai, **vòng lặp đó KHÔNG HỘI TỤ** — agent **chỉ đang đoán mò nhiều lần một cách TỐN KÉM**.
>
> **Ví dụ kiểm chứng TỐT**: chạy **bộ kiểm thử tự động** (đúng/sai rõ ràng), dữ liệu trả về có thể đối chiếu (mã số tồn tại hay không).
> **Ví dụ kiểm chứng KÉM**: *"bài viết này hay không"*, *"bản tóm tắt này có duyên không"*.

### 3.2.2 Kiến trúc AI Agent — SÁU thành phần

```
┌───────────────────────── 2 · CHỈ DẪN (system prompt) ─────────────────────────┐
│                    vai trò · phạm vi · quy tắc · định dạng đầu ra              │
├───────────────────────────────────────────────────────────────────────────────┤
│  1 · MÔ HÌNH          │  3 · CÔNG CỤ                 │  4 · BỘ NHỚ            │
│  "bộ não" suy luận    │  API · CSDL · tìm kiếm       │  ngắn hạn · dài hạn    │
│                       │  gửi thông báo               │  ngữ nghĩa (RAG)       │
├───────────────────────────────────────────────────────────────────────────────┤
│  5 · VÒNG LẶP ĐIỀU KHIỂN:  quan sát → suy nghĩ → hành động → quan sát…        │
├───────────────────────────────────────────────────────────────────────────────┤
│  6 · LAN CAN:  quyền hạn · giới hạn vòng lặp · phê duyệt của người · nhật ký   │
└───────────────────────────────────────────────────────────────────────────────┘
```

> ★ **Thiếu bất kỳ thành phần nào trong sáu thành phần này thì hệ thống CHƯA PHẢI là một agent DÙNG ĐƯỢC trong môi trường doanh nghiệp — đặc biệt là thành phần số 6.**
>
> **Đây là câu hỏi lý thuyết gần như chắc chắn có**: "Kể tên sáu thành phần" + "thành phần nào hay bị bỏ qua nhất" (**lan can**).

#### Thành phần 1 — MÔ HÌNH ("bộ não" suy luận)

| Nội dung | Chi tiết |
|---|---|
| **Bản chất** | Lựa chọn mô hình là bài toán **ĐÁNH ĐỔI** giữa **năng lực, độ trễ và chi phí** |
| ★ **Thực tiễn phổ biến** | **Mô hình MẠNH cho bước LẬP KẾ HOẠCH**; **mô hình NHỎ, RẺ cho các bước đơn giản** (trích xuất, phân loại, định dạng lại) |
| **Kết luận thiết kế** | **Một hệ thống tốt thường dùng NHIỀU mô hình khác nhau**, **không phải một mô hình mạnh nhất cho mọi việc** |

> **Đây chính là Mẫu 2 (Routing) ở cấp độ mô hình** — tối ưu chi phí bằng cách giao việc dễ cho mô hình rẻ. Đề có thể hỏi: *"Vì sao không dùng mô hình mạnh nhất cho mọi bước?"* → vì **chi phí và độ trễ**, và vì **không cần thiết**.

#### Thành phần 2 — CHỈ DẪN (system prompt)

> Mô tả **vai trò, phạm vi được phép, quy tắc nghiệp vụ, định dạng đầu ra** và **cách xử lý khi không chắc chắn**.

> ★ **Chỉ dẫn tốt LUÔN nêu rõ HAI ĐIỀU mà người mới viết hay QUÊN**:
> 1. **Điều agent KHÔNG ĐƯỢC LÀM** (danh sách hành vi bị cấm).
> 2. **Khi nào phải DỪNG LẠI HỎI NGƯỜI**.

#### Cấu trúc một system prompt dùng được trong doanh nghiệp — SÁU phần

| # | Phần | Ví dụ |
|---|---|---|
| **1** | **Vai trò** | "Bạn là trợ lý xử lý hồ sơ của Phòng Đào tạo." |
| **2** | **Phạm vi** | Được truy cập **những dữ liệu nào** |
| **3** | **Quy tắc nghiệp vụ** | **Trích từ quy chế, viết TƯỜNG MINH** |
| **4** | **Định dạng đầu ra** | **JSON theo lược đồ định sẵn** |
| **5** | **Khi không chắc chắn** | **Không đoán**, trả về trạng thái *"cần người xem xét"* |
| **6** | **Giới hạn** | **Không gửi email, không sửa dữ liệu** |

> **Bài 3.3 yêu cầu viết ĐẦY ĐỦ system prompt — hãy dùng đúng SÁU PHẦN trên làm khung.** Đây là dạng câu hỏi "cho một prompt thiếu gì" — đáp án luôn là một trong sáu phần trên, thường là **(5) hoặc (6)**.

#### Thành phần 3 — CÔNG CỤ (tools) và bốn nguyên tắc thiết kế

> **Công cụ** là các **hàm mà agent có thể gọi**: truy vấn CSDL, gọi API nội bộ, tìm kiếm, gửi thông báo, ghi tệp.

| # | Nguyên tắc | Nội dung | Vì sao |
|---|---|---|---|
| **1** | **Mỗi công cụ làm MỘT việc rõ ràng** | **Tên và mô tả phải viết cho MÔ HÌNH ĐỌC**, không phải cho lập trình viên đọc | ★ Mô hình chọn công cụ **dựa trên mô tả** — **mô tả mơ hồ thì chọn sai** |
| **2** | ★ **ÍT công cụ nhưng ĐÚNG** | Hơn là **nhiều công cụ gần giống nhau** | **Công cụ CHỒNG CHÉO là nguyên nhân HÀNG ĐẦU khiến agent chọn nhầm** |
| **3** | **Tham số đơn giản, có giá trị mặc định** | Và **thông báo lỗi phải HƯỚNG DẪN CÁCH SỬA**, không chỉ báo lỗi | Vì **chính mô hình sẽ đọc thông báo đó để thử lại** |
| **4** | ★ **Phân biệt CHỈ ĐỌC và CÓ TÁC DỤNG PHỤ** | Công cụ **ghi, gửi, xóa** phải đi kèm **cơ chế phê duyệt** | ★ **Đây là ranh giới an toàn QUAN TRỌNG NHẤT trong thiết kế công cụ** |

> ★ **Trong nhiều trường hợp, THIẾT KẾ CÔNG CỤ quan trọng hơn việc CHỌN MÔ HÌNH**: *một mô hình trung bình với bộ công cụ tốt thường vượt một mô hình mạnh với bộ công cụ lộn xộn.*
>
> **Đây là câu trả lời cho câu hỏi ôn tập "vì sao thiết kế công cụ lại quan trọng hơn chọn mô hình"**: vì mô hình **không thể làm gì ngoài những gì công cụ cho phép**, và **chọn công cụ sai thì mô hình mạnh cũng gọi nhầm**.

#### MCP — Model Context Protocol

> Là **chuẩn MỞ** cho phép kết nối mô hình với các **nguồn dữ liệu và công cụ bên ngoài** qua **MỘT GIAO DIỆN THỐNG NHẤT**, thay vì viết tích hợp riêng cho từng hệ thống.

| | **KHÔNG có chuẩn chung** | **CÓ chuẩn MCP** |
|---|---|---|
| **Cách làm** | Mỗi agent phải **viết tích hợp riêng** cho từng hệ thống | Mỗi hệ thống **chỉ cần mở MỘT "cổng" MCP một lần** |
| **Số tích hợp** | **3 agent × 4 hệ thống = 12 đoạn tích hợp** phải viết và bảo trì | **4 hệ thống = 4 cổng**, dùng cho **bao nhiêu agent cũng được** |
| **Khi hệ thống đổi API** | **Sửa ở 3 nơi** | **Sửa ở 1 nơi** |
| **Hệ quả** | **Tích hợp trở thành phần ĐẮT NHẤT của dự án** | Công cụ và dữ liệu trở thành thứ **"cắm vào" được nhiều agent khác nhau** |

**So sánh vai trò MCP với CONNECTOR của nền tảng no-code (Chương 4)** — câu hỏi ôn tập số 7:

| | **MCP** | **Connector (no-code)** |
|---|---|---|
| **Điểm GIỐNG** | ★ **Cả hai đều CHUẨN HÓA việc kết nối** — biến *"viết tích hợp riêng"* thành *"cấu hình một kết nối chuẩn"* | 〃 |
| **Điểm KHÁC** | Là **chuẩn MỞ dùng chung cho nhiều nền tảng và nhiều mô hình** | **Phục vụ MỘT nền tảng cụ thể** |
| **Tầng hoạt động** | Tầng **mô hình / agent** (công cụ của agent) | Tầng **workflow** (node trong nền tảng) |

> **Mẹo nhớ**: *"Connector là MCP của một nền tảng; MCP là connector của mọi nền tảng."*

#### Thành phần 4 — BỘ NHỚ (memory) — ba loại trả lời ba câu hỏi khác nhau

| # | Loại | Nội dung | Giới hạn / ghi chú | Câu hỏi nó trả lời |
|---|---|---|---|---|
| **1** | **Ngắn hạn** (short-term) | Nội dung của **phiên làm việc hiện tại**, nằm trong **CỬA SỔ NGỮ CẢNH** | ★ **Cửa sổ có kích thước HỮU HẠN**. Phiên dài **phải được NÉN hoặc TÓM TẮT**, nếu không **phần đầu sẽ bị ĐẨY RA NGOÀI** | *"Chúng ta vừa nói gì với nhau?"* |
| **2** | **Dài hạn** (long-term) | **Dữ kiện được lưu lại GIỮA CÁC PHIÊN**: hồ sơ khách hàng, quyết định đã đưa ra, sở thích đã ghi nhận | Đây là thứ **khiến lần làm việc thứ hai KHÁC lần thứ nhất** | *"Lần trước tôi đã quyết định gì cho hồ sơ này?"* |
| **3** | **Ngữ nghĩa / tri thức** (semantic) | **Kho tài liệu được đánh chỉ mục VECTOR**, truy hồi theo **mức TƯƠNG ĐỒNG** — chính là **RAG** | Dùng để đưa **quy chế, sổ tay, tài liệu nội bộ** vào ngữ cảnh **đúng lúc cần** | *"Quy chế nói gì về trường hợp này?"* |

> ★ **Khi thiết kế agent, phải trả lời RIÊNG TỪNG CÂU — gộp cả ba vào một chỗ là nguyên nhân khiến NGỮ CẢNH PHÌNH TO VÀ NHIỄU.**
>
> **Bài 3.3 yêu cầu nêu rõ agent dùng những loại bộ nhớ nào và lưu ở đâu — KHÔNG PHẢI agent nào cũng cần cả ba.**

#### Thành phần 5 — VÒNG LẶP ĐIỀU KHIỂN (agent loop)

```
QUAN SÁT (đọc trạng thái và kết quả trước)
   ↓
SUY NGHĨ (quyết định bước tiếp theo)
   ↓
HÀNH ĐỘNG (gọi công cụ)
   ↓
QUAN SÁT KẾT QUẢ (công cụ trả về gì)
   ↓
… lặp cho đến khi ĐẠT MỤC TIÊU **HOẶC CHẠM GIỚI HẠN**
```

| | Một **lệnh gọi mô hình** đơn lẻ | **Agent** |
|---|---|---|
| Cách chạy | **Đưa vào, nhận ra, xong** | **Thử, xem kết quả, điều chỉnh, thử tiếp** |

> ★ **Đây là điểm khác biệt CƠ BẢN giữa agent và một lệnh gọi mô hình đơn lẻ.** Chính **vòng lặp này tạo ra SỨC MẠNH — và cũng chính nó tạo ra CHI PHÍ KHÔNG DỰ ĐOÁN ĐƯỢC**.
>
> ★ **Vì sao BẮT BUỘC phải có GIỚI HẠN?** Nếu **môi trường không trả về tín hiệu rõ ràng**, vòng lặp **có thể chạy MÃI**: mỗi vòng đều **tốn token, tốn thời gian và có thể gây TÁC DỤNG PHỤ**.
>
> **Nhận ra chưa?** Đây **chính là cấu trúc VÒNG LẶP LÀM LẠI của Chương 2** — và nó **chịu đúng rủi ro** đã cảnh báo ở đó: **phải giới hạn số vòng**.

#### Thành phần 6 — LAN CAN (guardrails) — năm loại

> **Lan can là thành phần QUYẾT ĐỊNH việc hệ thống có được đưa vào VẬN HÀNH hay không.**

| # | Lan can | Nội dung | Rủi ro nó chặn |
|---|---|---|---|
| **1** | **Giới hạn quyền truy cập** | Theo nguyên tắc **TỐI THIỂU**: agent chỉ được cấp **đúng quyền cần cho nhiệm vụ**, **không hơn**. **Không cấp quyền quản trị "cho tiện"** | Leo thang đặc quyền, thao tác ngoài phạm vi |
| **2** | **Giới hạn số vòng lặp và ngân sách token** | Chặn **cả rủi ro kỹ thuật** (lặp vô hạn) **lẫn rủi ro tài chính** (hóa đơn tăng đột biến ngoài dự tính) | Doom loop, chi phí vô hạn |
| **3** | ★ **Danh sách hành động phải có NGƯỜI PHÊ DUYỆT** | **Mọi hành động KHÔNG ĐẢO NGƯỢC ĐƯỢC** — **gửi thư cho khách, chuyển tiền, xóa dữ liệu, ra quyết định hành chính** — đều thuộc danh sách này | Tác dụng phụ không thể hoàn tác |
| **4** | ★ **Kiểm tra ĐẦU RA bằng LUẬT** | Đầu ra của mô hình được **kiểm lại bằng quy tắc XÁC ĐỊNH**: **đúng lược đồ JSON không, số tiền có nằm trong khoảng hợp lệ không, mã số có tồn tại không** | Hallucination lọt qua |
| **5** | ★ **NHẬT KÝ KIỂM TOÁN ĐẦY ĐỦ** | Ghi lại **agent đã gọi công cụ nào, với tham số gì, nhận kết quả gì, ở thời điểm nào** | ★ **Không có nhật ký thì KHÔNG GIẢI TRÌNH ĐƯỢC — và KHÔNG ĐƯỢC PHÉP VẬN HÀNH** |

> ★ **Lan can KHÔNG PHẢI phần thêm vào cuối — nó phải được thiết kế CÙNG LÚC với công cụ.** *Một agent không có lan can là một agent chỉ dùng được để TRÌNH DIỄN.*
>
> ★ **Lan can số 4 đáng chú ý: nó chính là HIỆN THÂN của nguyên tắc "dùng luật ở nơi cần chắc chắn"** — ta dùng **AI** để sinh ra kết quả, rồi dùng **LUẬT** để kiểm tra kết quả đó. Đây là câu trả lời mẫu cho câu hỏi "làm sao kiểm soát hallucination" ở cấp kiến trúc.

#### Kỹ thuật ngữ cảnh (context engineering) — kỹ năng quan trọng hơn "viết prompt hay"

> Là việc quyết định đưa **ĐÚNG THÔNG TIN** vào **cửa sổ ngữ cảnh**, **ĐÚNG LÚC**, với **ĐÚNG ĐỊNH DẠNG**.

> ★ **Phần lớn lỗi của agent trong môi trường doanh nghiệp bắt nguồn từ việc THIẾU THÔNG TIN hoặc NHIỄU THÔNG TIN, CHỨ KHÔNG PHẢI từ NĂNG LỰC SUY LUẬN CỦA MÔ HÌNH.**

| # | Kỹ thuật | Nội dung | Vì sao |
|---|---|---|---|
| **1** | **Chỉ nạp dữ liệu LIÊN QUAN** | **Nhiều thông tin KHÔNG đồng nghĩa với kết quả tốt hơn** | Dữ liệu thừa **làm loãng tín hiệu và tăng chi phí** |
| **2** | **Nén và tóm tắt lịch sử dài** | **Tóm tắt định kỳ**, **giữ lại KẾT LUẬN**, **bỏ phần trao đổi trung gian** | Cửa sổ ngữ cảnh **hữu hạn** |
| **3** | ★ **Đưa quy tắc nghiệp vụ dưới dạng TƯỜNG MINH, CÓ CẤU TRÚC** | **Trích đúng điều khoản quy chế, ĐÁNH SỐ, viết thành DANH SÁCH** — thay vì mô tả bằng **văn xuôi dài** | Quy tắc **có cấu trúc** thì mô hình **tuân thủ chính xác hơn** và **kiểm tra được** |
| **4** | ★ **Nêu rõ ĐỊNH DẠNG ĐẦU RA mong muốn** | Thường là **JSON theo một lược đồ định sẵn** | ★ **Định dạng cố định giúp KIỂM TRA ĐẦU RA BẰNG LUẬT — chính là lan can số 4** |

> ★ **Cách kiểm tra nhanh (dùng trong thi)**: nếu agent trả lời sai, hãy hỏi trước ***"nó có ĐỦ THÔNG TIN để trả lời đúng không?"*** **trước khi** kết luận *"mô hình yếu"*.
>
> Đây là câu chốt cho dạng câu hỏi "tìm nguyên nhân": **80% trường hợp agent sai không phải do mô hình, mà do ngữ cảnh**.

#### Đánh giá agent — bốn nhóm chỉ số tối thiểu

> **"Không thể quản trị thứ KHÔNG ĐO ĐƯỢC."**

| # | Nhóm | Chỉ số | Ghi chú |
|---|---|---|---|
| **1** | **Chất lượng** | **Tỷ lệ hoàn thành nhiệm vụ**; **tỷ lệ đúng trên bộ kiểm thử** | ★ Cần **bộ dữ liệu kiểm thử CỐ ĐỊNH** để **so sánh được giữa các phiên bản** |
| **2** | **Chi phí** | **Số token**; **số lệnh gọi công cụ**; **chi phí trên mỗi hồ sơ** | **So sánh trực tiếp với chi phí xử lý thủ công** — đây là **căn cứ ra quyết định** |
| **3** | **Độ trễ** | **Thời gian hoàn tất một nhiệm vụ** | Quyết định **trải nghiệm người dùng**; agent **nhiều vòng thì độ trễ tăng nhanh** |
| **4** | **An toàn** | **Số lần vượt quyền**; **số lần cần con người can thiệp** | **Đầu vào để điều chỉnh lan can theo thời gian** |

> ★ **Bộ kiểm thử phải CỐ ĐỊNH.** *Nếu mỗi lần đánh giá lại dùng dữ liệu khác thì **không biết hệ thống TỐT LÊN hay chỉ GẶP MAY**.*
> **Bài 3.5 yêu cầu: ít nhất 10 trường hợp, trong đó 3 ngoại lệ và 2 trường hợp "bẫy".**
>
> ★ **Nhóm AN TOÀN dùng để làm gì?** **Số lần cần con người can thiệp là chỉ số HAI MẶT**:
> - **Cao quá** → agent **chưa dùng được**.
> - **Thấp bất thường** → có thể **lan can quá lỏng** và **agent đang tự làm những việc lẽ ra phải hỏi**.
>
> Đây là ví dụ rất hay về việc **một chỉ số không có "chiều tốt" tuyệt đối** — câu hỏi tình huống có thể hỏi đúng điểm này.

---

### 3.2.3 Bảy mẫu thiết kế cho hệ thống tác nhân ★★★

> **Điểm sư phạm quan trọng nhất của cả mục**: **mỗi mẫu đều có MỘT CẤU TRÚC BPMN TƯƠNG ỨNG đã học ở Chương 2**. Nghĩa là **tư duy quy trình chính là nền tảng để thiết kế hệ thống AI**.

```
0 ──► 1 ──► 2 ──► 3 ──► 4 ──► 5 ──► 6
LLM      nối     định   song    điều     đánh     tác nhân
tăng     chuỗi   tuyến  song    phối     giá –    tự chủ
cường    lời     hóa    viên–    tinh
         nhắc           thợ      chỉnh

Độ phức tạp, chi phí, độ trễ và khó khăn khi gỡ lỗi TĂNG DẦN theo chiều mũi tên ──►
```

**Hai câu phải thuộc nguyên văn:**

> ★ **Quy tắc chọn mẫu**: đi **từ trái sang phải**, **DỪNG LẠI ở mẫu ĐẦU TIÊN** giải quyết được bài toán.
>
> ★ **Trong môi trường doanh nghiệp, các mẫu 1–3 giải quyết được PHẦN LỚN nhu cầu thực tế.**

**Nguồn gốc**: tài liệu kỹ thuật ***Building Effective Agents* của Anthropic**. Đây là các mẫu **đúc kết từ thực tiễn triển khai**, **không phải phân loại học thuật**. (Chi tiết này hay được hỏi để phân biệt với "phân loại theo năng lực" ở 3.1.2 — cái đó mới là phân loại khái niệm.)

> ★ **Bẫy thi về số đếm**: slide gọi **"Bảy mẫu"** (đánh số **0 → 6**) nhưng câu hỏi ôn tập lại nói **"sáu mẫu thiết kế"**. **Cả hai đều đúng**: **mẫu 0 KHÔNG phải một mẫu thiết kế** mà là **"khối cơ bản"** (điểm khởi đầu mặc định); **sáu mẫu THIẾT KẾ là 1 → 6**. Nếu đề hỏi "kể tên sáu mẫu thiết kế" thì **đừng kể mẫu 0**, và ngược lại nếu hỏi "bảy mẫu" thì **phải có mẫu 0**.

---

#### Mẫu 0 — LLM được tăng cường (khối cơ bản)

> **Một lệnh gọi mô hình DUY NHẤT, có kèm truy hồi, công cụ và bộ nhớ.**
> **Không có vòng lặp, không có nhánh** → nên **chi phí và độ trễ đều DỰ ĐOÁN ĐƯỢC CHÍNH XÁC**.

| | Nội dung |
|---|---|
| **Khi nào dùng** | Bài toán chỉ có **MỘT bước** và **cần dữ liệu nội bộ** để trả lời đúng |
| **Ví dụ** | Trả lời câu hỏi của sinh viên về **quy chế đào tạo**, có **truy hồi từ kho văn bản của trường (RAG)** |
| **Tương ứng BPMN** | **Một service task** |
| **Điều gì KHÔNG có** | Không vòng lặp, không cổng, không nhánh → **không có gì để hỏng về mặt điều phối** |

> ★ **Đây là điểm khởi đầu MẶC ĐỊNH cho MỌI bài toán.** Trước khi nghĩ đến bất kỳ mẫu nào khác, **hãy thử mẫu này và xem nó có đủ không**.
>
> **Vì sao mẫu 0 lại quan trọng đến vậy trong thực tiễn?** Vì **rất nhiều bài toán doanh nghiệp chỉ cần đúng khối này** — một lệnh gọi mô hình kèm truy hồi — **chứ chưa cần đến agent**. Chi phí: **một lần gọi**. Độ trễ: **một lần gọi**. Gỡ lỗi: **đọc một lần gọi là xong**. Mọi mẫu phía sau đều **đánh đổi** những thứ này để lấy năng lực mà **bài toán có thể không cần**.

> **Câu hỏi tình huống hay ra**: *"Nhóm đề xuất dùng agent tự chủ để trả lời câu hỏi quy chế đào tạo cho sinh viên. Nhận xét?"* → **Quá mức cần thiết**. Đây là bài toán **một bước + cần dữ liệu nội bộ** → **mẫu 0 với RAG**. Agent sẽ **tăng chi phí, tăng độ trễ, và khó đảm bảo câu trả lời đúng quy chế** — trong khi mẫu 0 đã đủ.

---

#### Mẫu 1 — Nối chuỗi lời nhắc (Prompt chaining)

> **Chia nhiệm vụ thành các bước TUẦN TỰ; đầu ra bước trước là đầu vào bước sau.** Có thể **chèn cổng kiểm tra (gate)** giữa các bước.

```
[Bước 1] ──► <Đạt?> ──đạt──► [Bước 2] ──► [Bước 3]
                │
                └──không đạt──► [Xử lý lại / báo lỗi]
```

| | Nội dung |
|---|---|
| **Đánh đổi cốt lõi** | ★ **Đánh đổi ĐỘ TRỄ để lấy ĐỘ CHÍNH XÁC**: mỗi bước **làm MỘT việc** nên **dễ đúng hơn** |
| **Khi nào dùng** | Nhiệm vụ chia được thành các bước **CỐ ĐỊNH, RÕ RÀNG, BIẾT TRƯỚC TRÌNH TỰ** |
| **Ví dụ** | Trích xuất thông tin từ đơn khiếu nại → **kiểm tra đủ trường bắt buộc** → soạn thư trả lời → **kiểm tra giọng văn** |
| **Tương ứng BPMN** | **Chuỗi task nối tiếp CÓ CỔNG XOR KIỂM TRA** |

> ★ **Cổng kiểm tra giữa các bước là ĐIỂM MẠNH NHẤT của mẫu này**: **lỗi được CHẶN SỚM thay vì LAN XUỐNG các bước sau**.
>
> **Lập luận đầy đủ** (câu hỏi "vì sao chia bước lại chính xác hơn?"): một lệnh gọi phải làm **ba việc cùng lúc** sẽ **phân bổ "sự chú ý"** cho cả ba và **không việc nào được làm kỹ**. Tách ra thì **mỗi lần gọi chỉ có một tiêu chí đúng/sai** → **dễ kiểm tra, dễ sửa, và lỗi không nhân lên**. Đây chính là **nguyên tắc "một việc một công cụ"** ở 3.2.2 được áp dụng cho **bước suy luận** thay vì cho công cụ.

> **Chi phí phải trả**: **số lệnh gọi tăng theo số bước** → **độ trễ tăng** và **chi phí token tăng**. Với bài toán **cần trả lời trong 2 giây** thì mẫu này **có thể không phù hợp** — đây là lý do **phải biện luận theo ba tiêu chí** (tin cậy – chi phí – độ trễ) chứ không chỉ chọn mẫu "xịn nhất".

---

#### Mẫu 2 — Định tuyến (Routing)

> **Một bước PHÂN LOẠI đầu vào rồi chuyển sang NHÁNH XỬ LÝ CHUYÊN BIỆT.**

```
                  ┌──► Xử lý loại A — mô hình nhỏ, RẺ
[Phân loại] ──────┼──► Xử lý loại B — mô hình lớn, MẠNH
   đầu vào       └──► Chuyển cho CON NGƯỜI
```

| | Nội dung |
|---|---|
| **Giá trị cốt lõi** | ★ **Cho phép TỐI ƯU CHI PHÍ**: việc **dễ** giao **mô hình rẻ**, việc **khó** giao **mô hình mạnh**, việc **nhạy cảm** giao **con người** |
| **Khi nào dùng** | Các **loại đầu vào khác nhau cần cách xử lý khác nhau**, **VÀ việc phân loại có thể làm CHÍNH XÁC** |
| **Ví dụ** | Phân loại email đến hộp thư phòng đào tạo: **hỏi lịch học** (trả lời tự động) · **khiếu nại điểm** (chuyển chuyên viên) · **xin cấp giấy tờ** (kích hoạt workflow) |
| **Tương ứng BPMN** | **Cổng XOR** — đây chính là điểm mà **logic luật được THAY BẰNG mô hình phân loại** (vị trí 2 ở 3.1.2) |

> ★ **ĐIỀU KIỆN SỐNG CÒN của mẫu này**: **bước phân loại phải ĐỦ CHÍNH XÁC**. **Phân loại sai thì MỌI xử lý phía sau đều sai, dù nhánh xử lý hoàn hảo.**
>
> Đây là **điểm yếu có tính cấu trúc** của routing: nó **đặt toàn bộ rủi ro vào MỘT điểm** duy nhất ở đầu vào. Một nhánh tốt nhất thế giới cũng **vô dụng nếu hồ sơ bị đưa nhầm nhánh**.
>
> **Hệ quả thiết kế**: khi dùng mẫu 2, **phải đo riêng độ chính xác của bước phân loại** (không chỉ đo đầu ra cuối cùng) — và thường phải **thêm nhánh "không chắc chắn → chuyển người"** để hứng phần mơ hồ.

> **Phân biệt mẫu 2 với ngưỡng tin cậy (3.1.2)**: **routing rẽ theo LOẠI đầu vào** (cái này là gì?); **ngưỡng tin cậy rẽ theo ĐỘ CHẮC CHẮN của mô hình** (mô hình chắc đến đâu?). **Hai cơ chế có thể dùng CÙNG NHAU**: routing theo loại trước, rồi trong từng nhánh áp ngưỡng tin cậy. Đây là dạng câu hỏi phân biệt khá khó.

---

#### Mẫu 3 — Song song hóa (Parallelization) — hai biến thể

> **Ba nhánh chạy ĐỒNG THỜI** → **tổng độ trễ bằng NHÁNH CHẬM NHẤT**, **không phải TỔNG ba nhánh**.

```
                  ┌──► Đánh giá tiêu chí 1 ──┐
[Chia nhánh] ─────┼──► Đánh giá tiêu chí 2 ──┼──► [Tổng hợp]
                  └──► Đánh giá tiêu chí 3 ──┘
```

| Biến thể | Cách làm | **Mục tiêu** | Ví dụ |
|---|---|---|---|
| **PHÂN ĐOẠN** (sectioning) | Chia nhiệm vụ thành các phần **ĐỘC LẬP**, xử lý **đồng thời** rồi tổng hợp | ★ **TỐC ĐỘ** | Chấm sơ loại hồ sơ dự thi theo **ba tiêu chí độc lập** |
| **BỎ PHIẾU** (voting) | Chạy **CÙNG một nhiệm vụ NHIỀU LẦN** — hoặc bằng **nhiều mô hình, nhiều góc nhìn** — rồi lấy **kết quả ĐỒNG THUẬN** | ★ **ĐỘ TIN CẬY** | Kiểm tra nội dung nhạy cảm bằng **hai lần đánh giá độc lập** |

| | Nội dung |
|---|---|
| **Khi nào dùng** | Cần **TỐC ĐỘ** (phân đoạn) **hoặc** cần **ĐỘ TIN CẬY cao hơn** cho quyết định nhạy cảm (bỏ phiếu) |
| **Tương ứng BPMN** | **Cổng AND tách và gộp**; **biến thể bỏ phiếu tương ứng hoạt động ĐA THỂ HIỆN** |

> ★ **Hai biến thể này trả lời HAI câu hỏi KHÁC NHAU — đây là điểm hay bị nhầm:**
> - **Phân đoạn**: *"Làm nhiều việc KHÁC NHAU cùng lúc để NHANH hơn."* → các nhánh **làm những việc khác nhau** trên **cùng một đầu vào**.
> - **Bỏ phiếu**: *"Làm CÙNG một việc nhiều lần để CHẮC hơn."* → các nhánh **làm đúng một việc giống nhau** rồi **so kết quả**.
>
> **Nhầm lẫn hai biến thể dẫn đến thiết kế sai**: nếu cần **độ tin cậy** mà lại dùng phân đoạn → **không có cơ chế đối chiếu nào**. Nếu cần **tốc độ** mà lại dùng bỏ phiếu → **tốn gấp ba chi phí mà không nhanh hơn bao nhiêu** (vì vẫn phải chờ cả ba).

> ★ **Liên hệ công thức Chương 2**: mẫu 3 **chính là công thức AND = max(T₁…Tₙ)** ở 2.2.8. Và **cùng một hệ quả thiết kế**: **song song hóa chỉ có lãi khi các nhánh TƯƠNG ĐỐI CÂN NHAU**. Nếu một nhánh chiếm 95% thời gian thì song song hóa **gần như vô ích** → phải **cắt riêng nhánh dài nhất**.
>
> **Đây là câu hỏi tình huống rất hay ra**: *"Ba nhánh chạy song song mất 2, 5 và 20 giây. Song song hóa tiết kiệm bao nhiêu?"* → Trước: **27 giây**; sau: **max = 20 giây** → **tiết kiệm 7 giây (26%)**, **không phải** chia 3. Muốn nhanh hơn nữa thì **phải tấn công nhánh 20 giây**, không phải thêm nhánh.

---

#### Mẫu 4 — Điều phối viên và thợ (Orchestrator–workers)

> **Một mô hình trung tâm PHÂN RÃ NHIỆM VỤ TẠI THỜI ĐIỂM CHẠY**, giao cho các **mô hình con** thực hiện, rồi **TỔNG HỢP kết quả**.

```
              ┌──► Thợ 1 ──┐
[ĐIỀU PHỐI] ──┼──► Thợ 2 ──┼──► [Tổng hợp]
 tự phân rã   └──► Thợ n ──┘
 nhiệm vụ
```

| | Nội dung |
|---|---|
| ★ **Khác song song hóa ở chỗ** | **SỐ LƯỢNG và NỘI DUNG các nhiệm vụ con KHÔNG BIẾT TRƯỚC** |
| **Khi nào dùng** | Nhiệm vụ phức tạp mà **CÁCH CHIA NHỎ PHỤ THUỘC VÀO CHÍNH ĐẦU VÀO** |
| **Ví dụ** | Tổng hợp báo cáo về một doanh nghiệp: điều phối viên **tự quyết định cần tra cứu những nguồn nào** — đăng ký kinh doanh, báo cáo tài chính, tin tức — giao cho từng thợ rồi tổng hợp |
| **Tương ứng BPMN** | **Sub-process ĐA THỂ HIỆN với số thể hiện xác định LÚC CHẠY** |

> ★ **Từ mẫu này trở đi, CHI PHÍ và ĐỘ TRỄ KHÔNG CÒN DỰ ĐOÁN ĐƯỢC TRƯỚC KHI CHẠY** — vì **chính mô hình quyết định sẽ làm bao nhiêu việc**.
>
> Đây là **bước ngoặt quan trọng nhất trong cả bảy mẫu**: mẫu 0–3 đều có **chi phí biết trước** (số lệnh gọi cố định, có thể đếm trên sơ đồ). Từ mẫu 4, **số lệnh gọi là một biến ngẫu nhiên** phụ thuộc dữ liệu.

**Bảng phân biệt mẫu 3 và mẫu 4 (câu hỏi so sánh gần như chắc chắn có):**

| Tiêu chí | **Mẫu 3 — Song song hóa** | **Mẫu 4 — Điều phối viên – thợ** |
|---|---|---|
| **Ai quyết định chia nhỏ?** | **Người thiết kế** — chia **lúc thiết kế** | **Mô hình điều phối viên** — chia **lúc chạy** |
| **Số nhiệm vụ con** | **Biết trước** (thường là hằng số) | ★ **KHÔNG biết trước** |
| **Nội dung nhiệm vụ con** | **Biết trước** | ★ **KHÔNG biết trước** |
| **Chi phí & độ trễ** | **Dự đoán được** | ★ **KHÔNG dự đoán được trước khi chạy** |
| **Kiểm thử** | **Dễ** — cấu trúc cố định | **Khó hơn** — phải kiểm thử cả *"cách chia"* lẫn *"cách làm"* |
| **Tương ứng BPMN** | Cổng **AND** tách/gộp | **Sub-process đa thể hiện, số thể hiện xác định lúc chạy** |

> ★ **Mẹo nhớ**: *"Mẫu 3 là **chia theo BẢN THIẾT KẾ**; mẫu 4 là **chia theo ĐẦU VÀO**."* Nếu đề nói *"số lượng công việc con phụ thuộc vào nội dung hồ sơ"* → **mẫu 4**. Nếu đề nói *"chạy ba tiêu chí độc lập cùng lúc"* → **mẫu 3**.

---

#### Mẫu 5 — Đánh giá và tinh chỉnh (Evaluator–optimizer)

> **Một mô hình TẠO RA kết quả, một mô hình khác ĐÁNH GIÁ theo tiêu chí và TRẢ VỀ NHẬN XÉT**; **vòng lặp tiếp diễn đến khi ĐẠT hoặc CHẠM GIỚI HẠN SỐ VÒNG**.

```
[Tạo bản nháp] ──► [Đánh giá theo tiêu chí] ──► <Đạt?>
                            ▲                    │  │
                            │                  đạt │  │ chưa đạt — kèm nhận xét CỤ THỂ
                            └──────────────────────┘  ▼
                                              (giới hạn số vòng!)
```

| | Nội dung |
|---|---|
| ★ **Điều kiện BẮT BUỘC** | **PHẢI có BỘ ĐẾM VÒNG LẶP.** *Không có nó, hệ thống có thể **lặp MÃI mà KHÔNG HỘI TỤ*** |
| **Khi nào dùng** | Có **tiêu chí đánh giá RÕ RÀNG** **VÀ** việc **phản hồi THỰC SỰ CẢI THIỆN** kết quả — điển hình là **dịch thuật, viết văn bản theo chuẩn, sinh mã** |
| **Ví dụ** | Soạn công văn theo mẫu quy định: **bản nháp** → đánh giá theo **danh mục kiểm tra thể thức** → sửa → kiểm tra lại |
| **Tương ứng BPMN** | ★ **Vòng lặp làm lại với cổng XOR** — chính là **cấu trúc rework ở 2.3.5**, và **chịu CÙNG MỘT RỦI RO** |

> ★ **Điều kiện để mẫu này HIỆU QUẢ**: **tiêu chí đánh giá phải KIỂM CHỨNG ĐƯỢC**.
> *"Văn bản đúng thể thức"* → **đánh giá được**.
> *"Bài viết hay"* → **KHÔNG đánh giá được**.
>
> **Đây là cùng một nguyên tắc với 3.2.1**: agent chỉ hoạt động khi **môi trường trả về tín hiệu đáng tin cậy**. Mẫu 5 là **phiên bản thu nhỏ** của nguyên tắc đó trong một vòng lặp cục bộ.

**Ba rủi ro của mẫu 5** (hay hỏi ở dạng "vì sao phải giới hạn vòng lặp"):

| # | Rủi ro | Cơ chế | Hậu quả |
|---|---|---|---|
| **1** | **Không hội tụ** | Bộ đánh giá cho nhận xét **mâu thuẫn** hoặc **quá khắt khe** → mỗi vòng sửa lại sinh lỗi mới | **Lặp vô hạn**, đốt token |
| **2** | **Dao động** (oscillation) | Sửa A thì hỏng B, sửa B thì hỏng A | **Không bao giờ đạt**, chi phí tăng tuyến tính theo số vòng |
| **3** | **Tối ưu hóa vào bộ đánh giá** (reward hacking) | Mô hình **học cách làm vừa lòng bộ đánh giá** thay vì **làm đúng việc** | Kết quả **đạt điểm cao nhưng sai về nghiệp vụ** — loại lỗi **nguy hiểm nhất** vì trông hoàn hảo |

> ★ **Rủi ro 3 nối trực tiếp với cảnh báo ở 2.3.5**: **vòng lặp làm lại là dấu hiệu của vấn đề chất lượng**. Ở đây, nếu mẫu 5 **thường xuyên cần 4–5 vòng**, thì vấn đề **không phải ở bộ đánh giá** mà ở **bước tạo ban đầu** — cần **cải thiện đầu vào (ngữ cảnh)** chứ không phải **tăng số vòng**.

---

#### Mẫu 6 — Tác nhân tự chủ (Autonomous agent)

> Agent **nhận MỤC TIÊU**, **tự lập kế hoạch**, **gọi công cụ**, **quan sát phản hồi từ môi trường** và **lặp cho đến khi hoàn thành hoặc chạm lan can**.
> ★ **KHÔNG CÓ SƠ ĐỒ LUỒNG ĐỊNH SẴN.**

| | Nội dung |
|---|---|
| **Khi nào dùng** | Nhiệm vụ **MỞ**, **số bước KHÔNG BIẾT TRƯỚC**, **VÀ có tín hiệu phản hồi ĐÁNG TIN CẬY** từ môi trường: **kết quả kiểm thử, dữ liệu trả về, xác nhận của người dùng** |

**Bốn điều kiện BẮT BUỘC — không phải khuyến nghị:**

| # | Điều kiện | Chặn rủi ro gì |
|---|---|---|
| **1** | **Giới hạn số vòng lặp** | Lặp vô hạn, chi phí không kiểm soát |
| **2** | **Giới hạn quyền** | Thao tác ngoài phạm vi, leo thang đặc quyền |
| **3** | ★ **Điểm dừng để con người PHÊ DUYỆT trước các hành động KHÔNG ĐẢO NGƯỢC ĐƯỢC** | Tác dụng phụ không thể hoàn tác |
| **4** | **Nhật ký ĐẦY ĐỦ** | Không giải trình được |

> ★ **VÌ SAO MẪU NÀY KHÔNG CÓ SƠ ĐỒ TRONG SLIDE?** — câu hỏi này **rất hay được hỏi**, và câu trả lời chính là **bản chất của mẫu**:
>
> Vì **bản chất của nó là KHÔNG CÓ sơ đồ định trước** — **đường đi được SINH RA TẠI THỜI ĐIỂM CHẠY** và **mỗi lần chạy có thể KHÁC NHAU**. Đây cũng chính là **lý do BPMN KHÔNG MÔ TẢ ĐƯỢC mẫu này**, và là **lý do NHẬT KÝ KIỂM TOÁN THAY THẾ VAI TRÒ CỦA SƠ ĐỒ LUỒNG**: **thứ DUY NHẤT ta có để giải trình là BẢN GHI những gì agent đã THỰC SỰ LÀM**.
>
> ★ **Trong môi trường HÀNH CHÍNH và TÀI CHÍNH, mẫu này HIẾM KHI là lựa chọn đúng.** *Hãy chắc chắn rằng **NĂM MẪU TRƯỚC đều đã được CÂN NHẮC và LOẠI BỎ CÓ LÝ DO**.*

> **Bẫy thi quan trọng nhất của mục này**: phương án *"Agent tự chủ là mức tiến hóa cao nhất nên luôn là lựa chọn tốt nhất cho mọi bài toán"* → **SAI**.
> Lý do: **độ phức tạp, chi phí, độ trễ và khó khăn khi gỡ lỗi đều TĂNG DẦN** theo chiều 0 → 6. Trong **môi trường doanh nghiệp**, **mẫu 1–3 giải quyết được PHẦN LỚN nhu cầu thực tế**. Chọn agent khi mẫu 2 đủ → **tăng rủi ro mà không tăng giá trị**.

---

#### Bảng chọn mẫu — công cụ ra quyết định (dùng trực tiếp trong thi)

> **Quy tắc**: đọc **đặc điểm bài toán** ở cột trái, đi **từ TRÊN XUỐNG**, **DỪNG ở mẫu ĐẦU TIÊN** giải quyết được bài toán.

| # | Đặc điểm bài toán | Mẫu phù hợp |
|---|---|---|
| 1 | **Một bước**, cần **dữ liệu nội bộ** | **Mẫu 0** — LLM tăng cường + RAG |
| 2 | **Nhiều bước CỐ ĐỊNH** | **Mẫu 1** — Prompt chaining |
| 3 | **Nhiều LOẠI đầu vào khác nhau** | **Mẫu 2** — Routing |
| 4 | **Nhiều phần độc lập** / cần **độ tin cậy cao** | **Mẫu 3** — Parallelization |
| 5 | **Cách chia nhỏ PHỤ THUỘC ĐẦU VÀO** | **Mẫu 4** — Orchestrator–workers |
| 6 | Có **tiêu chí đánh giá rõ**, cần **tinh chỉnh** | **Mẫu 5** — Evaluator–optimizer |
| 7 | **Nhiệm vụ MỞ**, có **phản hồi KIỂM CHỨNG ĐƯỢC** | **Mẫu 6** — Autonomous agent |

> ★ **Mỗi bậc tăng thêm đều làm tăng CHI PHÍ, ĐỘ TRỄ và KHÓ KHĂN KHI GỠ LỖI.**
>
> **Cách dùng bảng này khi làm bài**: **viết ra chữ** "bài toán có đặc điểm ___ → mẫu ___" rồi **soát lại các mẫu TRƯỚC nó** để chứng minh **đã cân nhắc và loại bỏ có lý do**. Bài 3.4 **bắt buộc** phải chỉ rõ **"mẫu đơn giản hơn nào đã được cân nhắc và vì sao không đủ"** — đây chính là **câu trả lời mẫu** cho yêu cầu đó.

> **Bẫy thi tinh vi**: đề cho một bài toán *"nhiều loại đầu vào, mỗi loại cần xử lý nhiều bước khác nhau"*. **Đáp án không phải mẫu 2 đơn thuần** mà là **mẫu 2 + mẫu 1 lồng trong từng nhánh** (routing rồi chaining). Các mẫu **không loại trừ nhau** — bảng chọn mẫu là **điểm khởi đầu**, không phải **danh mục đóng**. Đề hay đưa phương án "chỉ được chọn một mẫu duy nhất cho toàn hệ thống" → **SAI**.

---

#### Ánh xạ bảy mẫu sang cấu trúc BPMN — bảng "thông điệp của cả chương"

> ★ **SÁU trong BẢY mẫu thiết kế hệ thống AI đều là những CẤU TRÚC QUY TRÌNH mà bạn ĐÃ HỌC ở Chương 2.** *Thiết kế hệ thống AI không đòi hỏi một tư duy mới — nó đòi hỏi **tư duy quy trình**, cộng thêm hiểu biết về **nơi AI đáng tin và nơi AI không đáng tin**.*

| Mẫu thiết kế | **Cấu trúc BPMN tương ứng** | Đã học ở |
|---|---|---|
| **Mẫu 0** — LLM tăng cường | **Một service task** | 2.3.1 |
| **Mẫu 1** — Prompt chaining | **Chuỗi task nối tiếp có cổng XOR kiểm tra** | 2.3.3 |
| **Mẫu 2** — Routing | **Cổng XOR** — điều kiện **do mô hình sinh ra** | 2.3.3 |
| **Mẫu 3** — Parallelization | **Cổng AND tách và gộp**; **bỏ phiếu = đa thể hiện** | 2.3.3 và 2.3.2 |
| **Mẫu 4** — Orchestrator–workers | **Sub-process đa thể hiện, số thể hiện xác định LÚC CHẠY** | 2.3.2 và 2.3.8 |
| **Mẫu 5** — Evaluator–optimizer | **Vòng lặp làm lại với cổng XOR** | 2.3.3 |
| **Mẫu 6** — Autonomous agent | ★ **KHÔNG có cấu trúc tương ứng — thay bằng NHẬT KÝ KIỂM TOÁN** | — |

**Đọc bảng này theo ba lớp — đây là cách trả lời câu hỏi "vì sao phải học BPMN":**

| Lớp | Nội dung |
|---|---|
| **Lớp 1 — Kỹ thuật** | Biết cấu trúc BPMN tương ứng, ta **vẽ được thiết kế AI bằng ký pháp mà người nghiệp vụ đọc được** → không phải giải thích bằng mã nguồn |
| **Lớp 2 — Kiểm chứng** | Mọi **lỗi cấu trúc đã biết của BPMN** (bế tắc, đồng bộ thiếu, vòng lặp không giới hạn) **đều trở thành rủi ro của hệ thống AI** → **dùng bài học Chương 2 để phòng ngừa** |
| **Lớp 3 — Giới hạn** | **Mẫu 6 không ánh xạ được** → đây chính là **ranh giới nhận thức**: khi đường đi do mô hình tự sinh, **sơ đồ không còn là công cụ quản trị**; **nhật ký thay thế** |

> ★ **Ba lỗi BPMN trở thành ba rủi ro AI — bảng này rất "ăn điểm" ở câu hỏi liên chương:**
>
> | Lỗi BPMN (Ch.2) | Biểu hiện trong hệ thống AI |
> |---|---|
> | **Vòng lặp không giới hạn** (rework) | **Mẫu 5 lặp mãi không hội tụ**; **mẫu 6 doom loop** → đốt token |
> | **Bế tắc** (deadlock) | Hệ thống **chờ một điều kiện không bao giờ đến** — ví dụ chờ một công cụ luôn trả về lỗi |
> | **Đồng bộ thiếu** (lack of sync) | **Một hành động được thực hiện HAI LẦN** — gửi hai email, tạo hai bút toán (đặc biệt nguy hiểm với agent có quyền ghi) |
>
> **Cách phòng**: đúng ba cơ chế đã học — **giới hạn số vòng**, **điều kiện dừng rõ ràng**, **công cụ có tính bất biến (idempotent)** — nội dung idempotency sẽ học kỹ ở Chương 4.

---

#### Ví dụ tổng hợp 1 — Bản đồ AI cho quy trình xét học bổng (mẫu cho Bài 3.1)

> Lấy **mô hình to-be ở Bài 2.6**. Với **MỖI hoạt động**, phân loại vào **một trong BỐN nhóm**:
> **(a) giữ nguyên thủ công · (b) tự động theo luật · (c) tự động có AI hỗ trợ · (d) giao cho agent.**

| Hoạt động (từ mô hình Chương 2) | Nhóm | Lý do | **Rủi ro nếu sai** |
|---|---|---|---|
| **Lọc danh sách đủ điều kiện** | **(b) Luật** | Điều kiện **đã có trong quy chế**, **tính được chính xác** | **Cao** — nhưng **luật không sai** |
| **Rà soát và bổ sung điểm rèn luyện** | **(c) AI hỗ trợ** | Đọc **bản tự thuật dạng văn tự do**; AI **tóm tắt**, **người xác nhận** | **Trung bình** — có người duyệt |
| **Kiểm tra tính hợp lệ của minh chứng** | **(c) AI hỗ trợ** | Đọc **ảnh giấy chứng nhận**; dùng **ngưỡng tin cậy 0,95** | **Trung bình** — dưới ngưỡng thì **chuyển người** |
| **Họp xét danh sách** | **(a) Thủ công** | **Quyết định TẬP THỂ**, có **hệ quả về quyền lợi người học** | ★ **Rất cao** — **không tự động hóa** |
| **Soạn thảo quyết định và thông báo** | **(c) AI hỗ trợ** | Soạn **theo mẫu**; **người KÝ DUYỆT trước khi gửi** | **Thấp** — **đảo ngược được** |
| **Chi trả học bổng** | **(b) Luật** | Cần **tính XÁC ĐỊNH TUYỆT ĐỐI**; **không đảo ngược được** | ★ **Rất cao** — **chỉ dùng luật** |

**Hai nhận xét quan trọng nhất của ví dụ này:**

> ★ **① Trong sáu hoạt động, KHÔNG có hoạt động nào thuộc nhóm (d) giao cho agent.** *Đó là **kết quả BÌNH THƯỜNG** với một quy trình **hành chính có hệ quả về quyền lợi**.*
>
> **Bài học**: nếu bảng của bạn có **nhiều nhóm (d)**, hãy **soát lại** — rất có thể bạn đang **giao cho agent những việc mà luật hoặc AI có ngưỡng làm tốt hơn, rẻ hơn, an toàn hơn**. Nhóm (d) **không phải "trình độ cao hơn"**, nó chỉ là **một công cụ khác**.

> ★ **② Cột "RỦI RO NẾU SAI" QUYẾT ĐỊNH cột "NHÓM" — KHÔNG PHẢI NGƯỢC LẠI.** *Hãy **điền cột rủi ro TRƯỚC** khi quyết định giao cho ai.*
>
> Đây là **cơ chế lập luận được chấm điểm**: không được **chọn công nghệ trước rồi tìm lý do**; phải **đánh giá hậu quả trước rồi chọn công nghệ**.

**Vì sao mỗi lựa chọn lại đúng — lập luận chi tiết:**

| Hoạt động | Nếu dùng công cụ SAI thì sao |
|---|---|
| Lọc danh sách → **AI** | AI có thể **bỏ sót một sinh viên đủ điều kiện** dù điều kiện là **phép so sánh đơn giản**. Dùng AI ở đây chỉ **thêm rủi ro mà không thêm năng lực** |
| Họp xét → **AI/agent** | Đây là **quyết định tập thể có hệ quả pháp lý**; **không ai chịu trách nhiệm được** nếu máy quyết. Ngoài ra **không thể kiểm chứng** *"hội đồng đã cân nhắc đúng chưa"* → **không thỏa điều kiện của agent** |
| Chi trả → **AI** | Sai một con số là **sai tiền thật**, **không đảo ngược**. **Hallucination ở đây = mất tiền** |
| Soạn thảo → **thủ công** | Đây là **lãng phí rõ ràng**: việc **theo mẫu, đảo ngược được** (chưa gửi) là **ứng viên hoàn hảo** cho AI + người ký duyệt |

---

#### Ví dụ tổng hợp 2 — Thiết kế cho MỘT bước cụ thể (mức chi tiết Bài 3.4 yêu cầu)

> **Bước được chọn**: *"Kiểm tra tính hợp lệ của minh chứng thành tích"* — khoảng **1.200 hồ sơ mỗi đợt xét**.

**① Mẫu thiết kế đã chọn: Mẫu 1 — Prompt chaining**

| Nội dung | Chi tiết |
|---|---|
| **Cấu trúc** | **Bước 1**: trích xuất thông tin từ ảnh → **cổng kiểm tra ở giữa** → **Bước 2**: đối chiếu với **danh mục thành tích được công nhận** |
| ★ **Mẫu đơn giản hơn đã cân nhắc** | **Mẫu 0** — nhưng **KHÔNG ĐỦ**: *một lệnh gọi vừa đọc ảnh vừa đối chiếu cho **tỷ lệ sai CAO HƠN HẲN*** |
| **Vì sao mẫu 1 đủ** | Nhiệm vụ chia được thành **hai bước cố định, rõ ràng, biết trước trình tự**; **cổng kiểm tra chặn lỗi trích xuất trước khi đối chiếu** |
| **Vì sao KHÔNG dùng mẫu 4/6** | Cách chia nhỏ **KHÔNG phụ thuộc đầu vào** (luôn là hai bước) → mẫu 4 **thừa**; nhiệm vụ **đóng** → mẫu 6 **thừa và không kiểm toán được** |

**② Mức tự chủ và ngưỡng**

| Nội dung | Chi tiết |
|---|---|
| **Mức tự chủ** | ★ **Thực thi theo ngưỡng (A4)** |
| **Ngưỡng** | **Điểm tin cậy ≥ 0,95 → TỰ DUYỆT**; **dưới ngưỡng → CHUYỂN CHUYÊN VIÊN** |
| **Ước tính tác động** | **65% hồ sơ đi luồng tự động** → **cắt được khoảng 780 lượt xử lý thủ công mỗi đợt** (0,65 × 1.200) |

> ★ **Vì sao không chọn "tự chủ có giám sát" (mức 4)?** Vì đây là **quyết định về quyền lợi người học**, và **kết quả kiểm tra minh chứng là đầu vào cho hội đồng** — **cần người xem xét phần mơ hồ**. Mức 3 **đã đủ tiết kiệm** (65%) trong khi **giữ được điểm kiểm soát** ở phần khó.

**③ Lan can áp dụng (bốn lan can cụ thể)**

| # | Lan can | Nội dung |
|---|---|---|
| **1** | **Công cụ CHỈ ĐỌC** | Agent **KHÔNG được sửa hồ sơ** — chỉ trả về kết quả kiểm tra |
| **2** | ★ **Kiểm tra đầu ra bằng LUẬT** | **Mã minh chứng PHẢI TỒN TẠI trong danh mục** — nếu không, **kết quả bị loại ngay** dù mô hình nói gì |
| **3** | **Ghi nhật ký đầy đủ** | Mỗi lần trích xuất đều được ghi lại |
| **4** | ★ **Mọi hồ sơ DƯỚI NGƯỠNG đều có NGƯỜI XEM** | Không có hồ sơ nào **biến mất** |

**④ Biện luận theo BA TIÊU CHÍ (bắt buộc — đây là chỗ lấy điểm)**

| Tiêu chí | Biện luận |
|---|---|
| **Độ tin cậy** | ★ **Chia hai bước VÀ có luật kiểm tra đầu ra** nên **sai sót lọt qua RẤT THẤP** — hai lớp bảo vệ độc lập |
| **Chi phí** | **Hai lệnh gọi mỗi hồ sơ**, **vẫn RẺ HƠN NHIỀU** so với **15 phút công của chuyên viên** |
| **Độ trễ** | ★ **KHÔNG quan trọng ở đây**, vì việc xét **theo ĐỢT** chứ **không theo thời gian thực** |

> ★ **Đây là độ chi tiết mà Bài 3.4 yêu cầu**: **chọn mẫu → nêu mẫu đơn giản hơn đã loại → gán mức tự chủ → liệt kê lan can → biện luận đủ ba tiêu chí**.
>
> **Vì sao "độ trễ không quan trọng" lại là một câu trả lời ĐÚNG?** Vì **biện luận theo tiêu chí không có nghĩa là cả ba tiêu chí đều phải "tốt"**. Nó có nghĩa là **phải chỉ ra tiêu chí nào RÀNG BUỘC và tiêu chí nào KHÔNG**. Ở đây **ràng buộc là độ tin cậy và chi phí**; **độ trễ là tiêu chí tự do** → **được phép đánh đổi nó**. Đây là dạng câu hỏi tình huống rất hay ra, và là chỗ sinh viên hay **cố gắng tối ưu cả ba** rồi **mất điểm vì không có trọng tâm**.

**Bảng "ba tiêu chí nào ràng buộc trong tình huống nào" — dùng để trả lời nhanh:**

| Tình huống | Tiêu chí RÀNG BUỘC | Tiêu chí được phép đánh đổi |
|---|---|---|
| Xét học bổng **theo đợt** | **Tin cậy + chi phí** | **Độ trễ** |
| Chatbot tư vấn tuyển sinh **trực tuyến** | **Độ trễ + tin cậy** | Chi phí (trong ngưỡng hợp lý) |
| Đối soát **hàng nghìn giao dịch/đêm** | **Tin cậy + chi phí** | **Độ trễ** |
| Trợ lý soạn thảo cho chuyên viên | **Tin cậy (có người duyệt)** | Độ trễ, chi phí |
| Kiểm duyệt **nội dung công khai** | **Tin cậy (không được bỏ sót)** | Chi phí, độ trễ |

> **Kết luận phương pháp**: **không có mẫu "tốt nhất"** — chỉ có **mẫu phù hợp với bộ ràng buộc của bài toán**. Đây là lý do **câu 9 của phần ôn tập được đánh trọng số cao nhất**, và **điểm nằm ở chất lượng biện luận, KHÔNG ở việc chọn đúng mẫu**.

---

## 3.3 Tóm tắt trọng tâm chương 3

### Bảy điểm cần nhớ (theo đúng tóm tắt của bài giảng)

| # | Nội dung | Dạng câu hỏi |
|---|---|---|
| **1** | **IA là sự KẾT HỢP**: điều phối quy trình + tự động hóa theo luật + năng lực AI + phân tích. Nó **khắc phục bốn giới hạn của RPA** nhưng **đánh đổi bằng TÍNH KHÔNG XÁC ĐỊNH** | "IA khác RPA ở đâu? Cái giá phải trả là gì?" |
| **2** | ★ **Nguyên tắc thiết kế cốt lõi**: dùng **AI ở nơi cần PHÁN ĐOÁN**, dùng **LUẬT ở nơi cần CHẮC CHẮN**, và dùng **NGƯỠNG ĐỘ TIN CẬY** để chia luồng tự động với luồng có con người | "Bước này giao AI, luật hay người?" |
| **3** | **Ba cách phân loại IA**: theo **năng lực** (IDP, hội thoại, dự đoán, sinh nội dung, tác nhân); theo **mức tự chủ** (gợi ý → tự chủ có giám sát); theo **vị trí** trong quy trình | "Phân loại IA theo mấy cách?" |
| **4** | ★ **Lộ trình năm giai đoạn** G1→G5. **NHẢY CÓC GIAI ĐOẠN là sai lầm phổ biến nhất** — vì khi đó **không còn CHUẨN NÀO để đánh giá đúng sai** | "Vì sao không được nhảy cóc?" |
| **5** | **Workflow và agent**: workflow là hệ thống mà **CON NGƯỜI định sẵn đường đi**; agent là hệ thống mà **MÔ HÌNH tự quyết định đường đi**. **Luôn bắt đầu từ giải pháp ĐƠN GIẢN NHẤT** | "Phân biệt theo 5 tiêu chí" |
| **6** | **Kiến trúc agent SÁU thành phần**: mô hình, chỉ dẫn, công cụ, bộ nhớ, vòng lặp điều khiển, lan can. ★ **Chất lượng CÔNG CỤ và chất lượng NGỮ CẢNH quyết định chất lượng agent** | "Kể 6 thành phần + thành phần nào hay bị bỏ qua?" |
| **7** | ★ **Bảy mẫu thiết kế** 0→6. **SÁU trong bảy mẫu đều ÁNH XẠ ĐƯỢC sang cấu trúc BPMN đã học ở Chương 2** | "Chọn mẫu cho tình huống + cấu trúc BPMN tương ứng" |

> ★ **Một câu để nhớ (câu chốt của cả chương)**:
> ***Một hệ thống tốt KHÔNG PHẢI là hệ thống dùng NHIỀU AI NHẤT, mà là hệ thống đặt AI ĐÚNG CHỖ và có LAN CAN ĐÚNG MỨC.***

> **Quay lại câu hỏi xuyên suốt**: ***"Bước này cần PHÁN ĐOÁN hay cần CHẮC CHẮN?"***
> **Trả lời được câu đó cho TỪNG BƯỚC là đã làm xong phần khó nhất của Bài 3.1.**

### Bảng "con số và ngưỡng" của chương (dễ ra câu hỏi con số)

| Con số | Ý nghĩa | Ngữ cảnh |
|---|---|---|
| **4** | Số thành phần trong công thức IA (BPM + RPA + AI + Analytics) | 3.1.1 |
| **3** | Số lớp năng lực (nhận thức – suy luận – hành động) | 3.1.1 |
| **8** | Số tiêu chí so sánh RPA ↔ IA (4 dòng cuối quan trọng nhất) | 3.1.1 |
| **5** | Số nhóm phân loại theo năng lực | 3.1.2 |
| **4** | Số mức tự chủ | 3.1.2 |
| **3** | Số vị trí IA trong quy trình (task / cổng quyết định / tầng điều phối) | 3.1.2 |
| **5** | Số giai đoạn lộ trình G1–G5 **và** số chiều trưởng thành | 3.1.3 |
| **6** | Số thành phần kiến trúc agent **và** số phần của system prompt | 3.2.2 |
| **5** | Số loại lan can | 3.2.2 |
| **4** | Số nhóm chỉ số đánh giá (chất lượng – chi phí – độ trễ – an toàn) | 3.2.2 |
| **7** | Số mẫu 0–6; **6** là số mẫu THIẾT KẾ (trừ mẫu 0) | 3.2.3 |
| **10 / 3 / 2** | Bộ kiểm thử: **≥10 trường hợp**, trong đó **3 ngoại lệ**, **2 bẫy** | Bài 3.5 |
| **0,95** | Ngưỡng tin cậy trong ví dụ minh họa | 3.1.2, 3.2.3 |
| **65% / 780** | Tỷ lệ tự động / số lượt thủ công cắt được (trên 1.200 hồ sơ) | Ví dụ tổng hợp 2 |
| **80%** | Tỷ lệ lỗi agent **do NGỮ CẢNH**, không do mô hình | 3.2.2 |
| **20%** | (từ Chương 2) ngưỡng "ngoại lệ" — vẫn dùng để lập luận ở chương này | 2.3.12 |

---

## 3.4 Thuật ngữ chương 3 (Việt – Anh)

| Tiếng Việt | Tiếng Anh |
|---|---|
| Tự động hóa thông minh | Intelligent Automation (IA) |
| Siêu tự động hóa | Hyperautomation |
| Xử lý tài liệu thông minh | Intelligent Document Processing (IDP) |
| Xử lý thẳng, không có người can thiệp | Straight-through processing |
| Ngưỡng độ tin cậy | Confidence threshold |
| Mô hình ngôn ngữ lớn | Large Language Model (LLM) |
| LLM được tăng cường | Augmented LLM |
| Ảo giác — nội dung sai nhưng trôi chảy | Hallucination |
| Truy hồi tăng cường sinh nội dung | Retrieval-Augmented Generation (RAG) |
| Cửa sổ ngữ cảnh | Context window |
| Kỹ thuật ngữ cảnh | Context engineering |
| Công cụ / lời gọi công cụ | Tool / tool call |
| Giao thức ngữ cảnh mô hình | Model Context Protocol (MCP) |
| Vòng lặp điều khiển | Agent loop |
| Lan can | Guardrails |
| Nối chuỗi lời nhắc | Prompt chaining |
| Định tuyến | Routing |
| Song song hóa (phân đoạn / bỏ phiếu) | Parallelization (sectioning / voting) |
| Điều phối viên – thợ | Orchestrator–workers |
| Đánh giá – tinh chỉnh | Evaluator–optimizer |
| Tác nhân tự chủ | Autonomous agent |
| Mức tự chủ | Level of autonomy |
| Trôi dạt khái niệm | Concept drift |
| Tối ưu hóa vào bộ đánh giá | Reward hacking |
| Người trong / trên / ngoài vòng lặp | Human-in / on / out-of-the-loop |

> **Lưu ý của bài giảng, nên nhớ nguyên văn**: *"Lĩnh vực này **gần như toàn bộ tài liệu là tiếng Anh**, và **thuật ngữ thay đổi rất nhanh**. Hãy nắm **KHÁI NIỆM trước, TÊN GỌI sau**."* — Nghĩa là **đề thi có thể dùng tên khác** cho cùng một khái niệm; hãy **nhận ra bằng bản chất**, đừng học thuộc tên.

---

## 3.5 Các dạng câu hỏi có thể xuất hiện + bẫy

### Sáu dạng câu hỏi của chương 3

| # | Dạng | Mẫu câu | Cách chốt đáp án |
|---|---|---|---|
| **1** | **Phân loại bước: AI / luật / người / agent** | "Bước tính tiền học bổng nên giao cho ai?" | **Luật** — cần xác định tuyệt đối |
| **2** | **Chọn mức tự chủ** | "Hệ thống tự duyệt khi tin cậy > 0,95 là mức nào?" | **Thực thi theo ngưỡng** (A4) |
| **3** | **Chọn mẫu thiết kế** | "Số lượng nhiệm vụ con phụ thuộc nội dung hồ sơ → mẫu nào?" | **Mẫu 4** — orchestrator–workers |
| **4** | **Tìm nguyên nhân thất bại** | "Agent trả lời sai dù mô hình mạnh — nguyên nhân khả dĩ nhất?" | ★ **Thiếu/nhiễu NGỮ CẢNH**, không phải mô hình yếu |
| **5** | **Tính toán ngưỡng / kinh tế** | "Với X, Y cho trước, chọn ngưỡng nào?" | **Tổng chi phí kỳ vọng nhỏ nhất** |
| **6** | **Liên chương (Ch.2 ↔ Ch.3)** | "Mẫu evaluator–optimizer tương ứng cấu trúc BPMN nào?" | **Vòng lặp làm lại + cổng XOR** |

### Bảy cái bẫy phải nhớ

> **Bẫy 1**: *"Ngưỡng tin cậy càng CAO càng tốt vì ít sai."* → **SAI**. Ngưỡng cao → **ít hồ sơ được tự động** → **chi phí thủ công còn cao**. Ngưỡng đúng là ngưỡng **tối thiểu hóa TỔNG CHI PHÍ KỲ VỌNG**.

> **Bẫy 2**: *"Agent tự chủ là mức tiến hóa cao nhất nên luôn là lựa chọn tốt nhất."* → **SAI**. **Độ phức tạp, chi phí, độ trễ, khó gỡ lỗi TĂNG DẦN** theo chiều 0→6. **Mẫu 1–3 đủ cho phần lớn nhu cầu doanh nghiệp.**

> **Bẫy 3**: *"Mẫu evaluator–optimizer không cần giới hạn vòng lặp vì bộ đánh giá sẽ tự dừng khi đạt."* → **SAI**. **BẮT BUỘC có bộ đếm vòng lặp**; bộ đánh giá có thể **mâu thuẫn**, gây **dao động** hoặc **lặp vô hạn**.

> **Bẫy 4**: *"IA là phiên bản tốt hơn của RPA nên thay thế được RPA."* → **SAI**. IA **bổ sung** năng lực nhận thức nhưng **đánh đổi bằng tính không xác định**; nhiều bước **vẫn phải dùng luật/RPA** vì cần **xác định tuyệt đối**.

> **Bẫy 5**: *"Cứ dùng mô hình mạnh nhất cho mọi bước là tốt nhất."* → **SAI**. **Đánh đổi chi phí – độ trễ**; hệ thống tốt **dùng NHIỀU mô hình** (mạnh cho lập kế hoạch, nhỏ/rẻ cho bước đơn giản) — chính là **mẫu 2 ở cấp mô hình**.

> **Bẫy 6**: *"Agent sai là do mô hình yếu, cần đổi sang mô hình mạnh hơn."* → **SAI** trong **80% trường hợp**. Nguyên nhân thường là **thiếu thông tin hoặc nhiễu thông tin trong ngữ cảnh**. **Phải hỏi "nó có ĐỦ THÔNG TIN để trả lời đúng không?" trước.**

> **Bẫy 7**: *"MCP và connector no-code là cùng một thứ."* → **SAI**. **Giống**: cả hai **chuẩn hóa việc kết nối**. **Khác**: MCP là **chuẩn MỞ dùng chung nhiều nền tảng** ở **tầng mô hình/agent**; connector **phục vụ MỘT nền tảng** ở **tầng workflow**.

### Ba bẫy "ngôn ngữ" trong phương án nhiễu

| Cụm từ trong phương án | Vì sao thường sai |
|---|---|
| "tự động hóa hoàn toàn", "không cần con người" | Trái với **nguyên tắc ngưỡng tin cậy** và **human-in/on/out**; hầu như luôn có **điểm dừng cho người** |
| "thay thế hoàn toàn" (AI thay RPA, agent thay workflow) | Các khái niệm **bổ sung nhau**, không thay thế |
| "AI hiểu và tự kiểm tra được mình sai" | **Chính đặc tính xác suất** khiến mô hình **không tự bảo đảm** được; phải **kiểm bằng luật / dữ liệu / người** |

---

## 3.6 Câu hỏi tự luyện (16 câu — có đáp án và giải thích)

**Câu 1.** Một ngân hàng muốn **tự động hóa bước tính lãi và phí** cho khoản vay. Bước này dùng công thức đã ban hành, sai một đồng là sai sổ sách. Nên giao cho công cụ nào?

A. AI (LLM) vì có thể xử lý mọi trường hợp phát sinh
B. Luật (tính toán xác định), vì cần tính xác định tuyệt đối
C. Agent tự chủ, vì có thể tự kiểm tra lại kết quả
D. Ngưỡng tin cậy 0,95, phần dưới ngưỡng chuyển người

**Câu 2.** Hệ thống được thiết kế: nếu **điểm tin cậy ≥ 0,95** thì **tự duyệt**, dưới ngưỡng thì **chuyển chuyên viên**. Cách gọi nào đúng nhất?

A. Gợi ý (mức 1)
B. Thực thi có phê duyệt (mức 2)
C. Thực thi theo ngưỡng (mức 3), tương ứng mô hình LAI
D. Tự chủ có giám sát (mức 4)

**Câu 3.** Một hệ thống AI **trích xuất dữ liệu từ hóa đơn** nhưng **không ghi gì vào hệ thống kế toán**; kết quả chỉ hiện trên màn hình cho nhân viên xem. Vấn đề chính là gì?

A. Thiếu lớp nhận thức
B. Thiếu lớp **hành động** — không có RPA/API để ghi kết quả, nên không tiết kiệm giờ công
C. Thiếu lớp suy luận
D. Thiếu mô hình lớn hơn

**Câu 4.** Công ty đã mua nền tảng AI hàng đầu, thuê chuyên gia giỏi, nhưng dự án tự động hóa vẫn thất bại. Theo mô hình trưởng thành năm chiều, nguyên nhân **khả dĩ nhất** là gì?

A. Công nghệ chưa đủ mạnh
B. Mô hình AI chưa đủ lớn
C. **Chiều yếu nhất** — thường là **dữ liệu** (chưa sạch/chưa được phép dùng) hoặc **quản trị** — quyết định năng lực tổ chức
D. Thiếu nhân viên biết viết prompt

**Câu 5.** Một nhóm **áp dụng agent tự chủ** lên quy trình **chưa từng được mô hình hóa** và **chưa có dữ liệu lịch sử**. Hậu quả nghiêm trọng nhất là gì?

A. Agent sẽ chạy chậm
B. Agent sẽ tốn nhiều token
C. **Không thể đánh giá đúng hay sai** vì không có chuẩn nào để đối chiếu
D. Agent sẽ không khởi động được

**Câu 6.** Một mô hình AI được huấn luyện tốt, chạy đúng trong 6 tháng, sau đó **độ chính xác giảm dần** vì xuất hiện **mẫu biểu mới và cách viết mới** trong hồ sơ. Hiện tượng này và cách phòng ngừa?

A. Hallucination — phòng bằng cách giảm temperature
B. **Trôi dạt khái niệm** (concept drift) — phòng bằng **bộ kiểm thử CỐ ĐỊNH chạy ĐỊNH KỲ**
C. Bế tắc — phòng bằng cách giới hạn vòng lặp
D. Đồng bộ thiếu — phòng bằng cách đổi cổng gộp

**Câu 7.** Một agent trả lời sai câu hỏi về **quy chế đào tạo** của trường. Trước khi kết luận "mô hình yếu", cần kiểm tra điều gì **trước tiên**?

A. Nhiệt độ (temperature) của mô hình
B. Số tham số của mô hình
C. **Agent có ĐỦ THÔNG TIN trong ngữ cảnh không** — quy chế hiện hành đã được truy hồi chưa, có bị nhiễu không
D. Tốc độ mạng

**Câu 8.** Một trợ lý ảo cần **tra cứu 3 hệ thống nội bộ** (nhân sự, tài chính, đào tạo). Hiện mỗi agent phải viết tích hợp riêng cho từng hệ thống, và có 4 agent khác nhau. Chuẩn nào giải quyết vấn đề này?

A. RAG
B. MCP — chuẩn hóa kết nối để mỗi hệ thống chỉ mở **một cổng**, dùng cho nhiều agent
C. DMN
D. BPMN

**Câu 9.** Một hệ thống agent có **quyền ghi vào hệ thống tài chính** và **quyền gửi email cho khách hàng**. Theo thiết kế công cụ, cần bổ sung gì **bắt buộc**?

A. Nhiều công cụ hơn để agent linh hoạt
B. Mô hình mạnh hơn
C. **Phân biệt công cụ CHỈ ĐỌC và CÓ TÁC DỤNG PHỤ**, kèm **cơ chế phê duyệt của người** cho các hành động không đảo ngược
D. Tăng cửa sổ ngữ cảnh

**Câu 10.** Bài toán: *"Mỗi hồ sơ vay cần điều tra số nguồn khác nhau tùy vào loại tài sản thế chấp — có hồ sơ chỉ cần 2 nguồn, có hồ sơ cần 7 nguồn; cách chia nhỏ chỉ biết khi đọc hồ sơ."* Chọn mẫu nào?

A. Mẫu 1 — Prompt chaining
B. Mẫu 2 — Routing
C. Mẫu 3 — Parallelization (sectioning)
D. **Mẫu 4** — Orchestrator–workers

**Câu 11.** Hệ thống cần **kiểm tra nội dung nhạy cảm** trước khi công khai, và **một lần đánh giá là chưa đủ tin cậy**. Chọn mẫu nào và biến thể nào?

A. Mẫu 1, với nhiều cổng kiểm tra
B. **Mẫu 3, biến thể BỎ PHIẾU** — chạy nhiều lần/nhiều mô hình rồi lấy đồng thuận
C. Mẫu 3, biến thể PHÂN ĐOẠN
D. Mẫu 6, để agent tự quyết

**Câu 12.** Ba nhánh chạy song song mất **2 giây, 5 giây và 20 giây**. Song song hóa tiết kiệm bao nhiêu so với tuần tự, và nhận xét đúng là gì?

A. Tiết kiệm 18 giây (27 → 9 giây), vì chia đều ba nhánh
B. Tiết kiệm 7 giây (27 → 20 giây); muốn nhanh hơn nữa phải **cắt nhánh 20 giây**, không phải thêm nhánh
C. Không tiết kiệm gì vì phải chờ cả ba
D. Tiết kiệm 20 giây vì chỉ cần nhánh nhanh nhất

**Câu 13.** Một hệ thống dùng **mẫu evaluator–optimizer**, và **trung bình phải 5 vòng** mới đạt. Nhận xét đúng nhất?

A. Bình thường, chỉ cần tăng giới hạn lên 10 vòng
B. **Vấn đề nằm ở BƯỚC TẠO BAN ĐẦU hoặc NGỮ CẢNH**, không phải ở số vòng — tăng vòng chỉ làm chi phí tăng tuyến tính
C. Phải đổi sang mẫu 6 (agent tự chủ)
D. Phải bỏ bộ đánh giá

**Câu 14.** Theo bảng ánh xạ bảy mẫu sang BPMN, mẫu nào **KHÔNG có cấu trúc BPMN tương ứng**, và **cái gì thay thế vai trò của sơ đồ**?

A. Mẫu 4 — thay bằng sub-process; không cần gì thêm
B. Mẫu 5 — thay bằng cổng XOR
C. **Mẫu 6** — thay bằng **NHẬT KÝ KIỂM TOÁN** (agent đã gọi công cụ gì, tham số gì, kết quả gì)
D. Mẫu 0 — thay bằng service task

**Câu 15.** Chi phí xử lý thủ công một hồ sơ là **100.000đ**; thiệt hại của một quyết định sai là **2.000.000đ**. Với ngưỡng 0,99: tự động 40%, sai 0,5%. Với ngưỡng 0,80: tự động 85%, sai 3%. Tổng chi phí kỳ vọng mỗi hồ sơ?

A. 0,99: 64.000đ; 0,80: 66.000đ → chọn 0,99
B. 0,99: 60.000đ; 0,80: 15.000đ → chọn 0,80
C. 0,99: 4.000đ; 0,80: 51.000đ → chọn 0,99
D. Không tính được vì thiếu dữ liệu

**Câu 16.** Một quy trình hành chính có **hệ quả về quyền lợi người học**, trong đó bước **"họp hội đồng xét"** là **quyết định tập thể**. Theo bản đồ AI (bốn nhóm a/b/c/d), bước này nên xếp vào nhóm nào?

A. (b) Tự động theo luật
B. (c) AI hỗ trợ
C. **(a) Giữ nguyên thủ công** — rủi ro rất cao, không tự động hóa
D. (d) Giao cho agent

---

### Đáp án và giải thích

| Câu | Đáp án | Giải thích |
|---|---|---|
| **1** | **B** | Bước **tính toán theo công thức đã ban hành**, cần **xác định tuyệt đối** → **luật**. A sai: AI **có tính xác suất**, "sai một đồng là sai sổ sách" nên **không chấp nhận được "gần đúng"**. C sai: agent **cũng xác suất**, còn **tăng rủi ro** vì tự quyết nhiều bước. D sai: ngưỡng chỉ **giảm** chứ **không loại bỏ** sai, và ở đây **luật đã làm được chính xác 100%** — dùng AI là **thêm rủi ro mà không thêm năng lực** |
| **2** | **C** | Đúng định nghĩa **mức 3**: AI **tự xử lý khi tin cậy cao**, người xử lý phần còn lại → **mô hình LAI** (một phần in-the-loop, một phần out-of-the-loop). A sai: gợi ý là **người quyết MỌI trường hợp**. B sai: phê duyệt nghĩa là **người duyệt TRƯỚC KHI có hiệu lực** cho **mọi** trường hợp. D sai: tự chủ có giám sát là **máy tự lập kế hoạch**, người chỉ giám sát định kỳ |
| **3** | **B** | Thiếu **lớp HÀNH ĐỘNG**. Đây là kiểu thất bại kinh điển: **demo OCR ấn tượng rồi "trích xuất được dữ liệu rồi… để đó"**, nên **không tiết kiệm một giờ công nào**. A, C sai: nhận thức và suy luận **đã có** (nó đọc và trích xuất được). D sai: vấn đề **không phải năng lực mô hình** mà là **thiếu khâu ghi kết quả** |
| **4** | **C** | Nguyên lý **thùng gỗ (Liebig)**: năng lực tổ chức bị chặn bởi **chiều YẾU NHẤT**, không phải chiều mạnh nhất. A, B sai: **công nghệ đỉnh cao không cứu được dữ liệu bẩn**, và đề đã nói công nghệ là hàng đầu. D sai: thiếu kỹ năng prompt là vấn đề **nhỏ hơn nhiều** so với dữ liệu/quản trị |
| **5** | **C** | Hậu quả nghiêm trọng nhất của **nhảy cóc** là **mất CHUẨN ĐỐI CHIẾU** → **không thể đánh giá đúng sai** (nối với sai lầm 3: bỏ quên chi phí đánh giá). A, B là hệ quả **kỹ thuật nhỏ**, sửa được. D sai: agent vẫn **khởi động được** — đó chính là điều nguy hiểm (nó chạy mà **không ai biết đúng sai**) |
| **6** | **B** | **Trôi dạt khái niệm** (concept drift): dữ liệu thực tế thay đổi → **độ chính xác trượt xuống âm thầm**; phòng bằng **bộ kiểm thử CỐ ĐỊNH chạy ĐỊNH KỲ**. A sai: hallucination là **sai ngay từng lần**, không phải **giảm dần theo thời gian**; giảm temperature không sửa được **lệch phân bố dữ liệu**. C, D là lỗi **cấu trúc quy trình**, không liên quan |
| **7** | **C** | **80% lỗi agent là do NGỮ CẢNH**, không do mô hình → phải kiểm tra **"có đủ thông tin để trả lời đúng không?"** trước. A, B, D là các yếu tố **kỹ thuật phụ**, hầu như không phải nguyên nhân của lỗi **nội dung sai về quy chế** |
| **8** | **B** | **MCP** giải quyết đúng bài toán **N×M tích hợp** → **N+M**: mỗi hệ thống mở **một cổng**, dùng cho **mọi agent**. A sai: RAG là **truy hồi tài liệu**, không phải chuẩn kết nối công cụ. C sai: DMN là **bảng quyết định**. D sai: BPMN là **ký pháp mô hình hóa luồng** |
| **9** | **C** | Nguyên tắc 4 thiết kế công cụ: **phân biệt CHỈ ĐỌC và CÓ TÁC DỤNG PHỤ**, và **công cụ ghi/gửi/xóa phải đi kèm phê duyệt** — đây là **ranh giới an toàn quan trọng nhất**. A sai: **nhiều công cụ chồng chéo là nguyên nhân hàng đầu khiến agent chọn nhầm**. B sai: mô hình mạnh **không sửa được** thiếu cơ chế phê duyệt. D sai: ngữ cảnh lớn hơn **không tăng an toàn** |
| **10** | **D** | **Số lượng và nội dung nhiệm vụ con phụ thuộc đầu vào** → **mẫu 4**. A sai: các bước **không cố định** (2 hay 7 nguồn tùy hồ sơ). B sai: routing chọn **một nhánh xử lý**, không **phân rã thành n việc**. C sai: phân đoạn là chia **theo thiết kế**, số nhánh **biết trước**. **Mẫu 4 về bản chất chính là đa thể hiện có số lượng xác định lúc chạy** |
| **11** | **B** | Cần **ĐỘ TIN CẬY** trên cùng một nhiệm vụ → **bỏ phiếu**. A sai: nhiều cổng tuần tự chỉ **lọc lại cùng một cách đánh giá**, không tạo **đồng thuận độc lập**. C sai: phân đoạn nhắm **TỐC ĐỘ** và các nhánh làm **việc khác nhau** → **không có đối chiếu**. D sai: mẫu 6 **không có tín hiệu kiểm chứng** cho "nội dung nhạy cảm", và **không kiểm toán được** |
| **12** | **B** | Tuần tự = 2+5+20 = **27 giây**; song song = **max = 20 giây** → **tiết kiệm 7 giây (26%)**. Nhánh chậm nhất **quyết định** → phải **cắt nhánh 20 giây**. A sai: **không có phép chia đều** — đây là lỗi hiểu sai bản chất AND. C sai: **có** tiết kiệm. D sai: max **không phải** min |
| **13** | **B** | Theo 2.3.5 và mẫu 5: **vòng lặp làm lại là dấu hiệu vấn đề chất lượng**, không phải thiếu số vòng. Tăng giới hạn → **chi phí tăng tuyến tính mà không giải quyết nguyên nhân**. A sai: tăng vòng chỉ **hợp thức hóa** một thiết kế yếu. C sai: đổi sang agent làm **rủi ro tăng thêm**. D sai: bỏ bộ đánh giá thì **không còn tiêu chí đúng** |
| **14** | **C** | **Mẫu 6 không có sơ đồ định trước** vì **đường đi sinh ra lúc chạy** → **nhật ký kiểm toán thay thế sơ đồ**. A, B, D sai: các mẫu này **đều ánh xạ được** (mẫu 4 → sub-process đa thể hiện; mẫu 5 → vòng lặp XOR; mẫu 0 → service task) |
| **15** | **A** | Ngưỡng 0,99: `60%×100.000 + 40%×0,5%×2.000.000 = 60.000 + 4.000 = **64.000đ**`. Ngưỡng 0,80: `15%×100.000 + 85%×3%×2.000.000 = 15.000 + 51.000 = **66.000đ**`. → **0,99 tốt hơn** dù chỉ tự động 40%. B sai: **bỏ hẳn số hạng chi phí sai** ở cả hai ngưỡng. C sai: **chỉ tính chi phí sai**, quên chi phí thủ công còn lại. D sai: đủ dữ liệu để tính |
| **16** | **C** | **Quyết định tập thể, hệ quả về quyền lợi người học, rủi ro RẤT CAO** → **giữ thủ công**. A sai: đây **không phải** phép tính theo luật. B sai: AI hỗ trợ chỉ phù hợp khi **có người xác nhận** và **rủi ro trung bình**. D sai: **không thỏa điều kiện kiểm chứng** của agent, và **mẫu 6 hiếm khi đúng trong môi trường hành chính** |

> **Cách dùng bộ 16 câu này**: làm **không mở tài liệu**, giới hạn **30 phút** (≈ 1,9 phút/câu — đúng nhịp thi). Câu nào sai thì **quay lại đúng mục đã ghi** và **đọc lại cả mục**, không chỉ đọc dòng đáp án.

### Ba câu hỏi ôn tập "mở" của bài giảng — dùng để tự kiểm tra mức hiểu

| # | Câu hỏi | Hướng trả lời ngắn |
|---|---|---|
| **1** | Nêu **bốn giới hạn của RPA truyền thống** và IA khắc phục từng giới hạn bằng năng lực nào | ① Dữ liệu phi cấu trúc → **nhận thức (OCR/IDP/LLM)**; ② Không xử lý ngoại lệ → **suy luận**; ③ Không thích ứng → **mô hình học từ dữ liệu**; ④ Chỉ bắt chước thao tác, không "hiểu" → **lớp nhận thức + suy luận** |
| **2** | Vì sao tính không xác định của AI **vừa là ưu điểm vừa là rủi ro**? Nêu **hai cơ chế** kiểm soát | Ưu: **chính nó tạo ra năng lực nhận thức** trên dữ liệu chưa gặp. Rủi: **cùng đầu vào có thể ra kết quả khác**, và **sai nhưng trông hợp lý**. Hai cơ chế: **① ngưỡng tin cậy + chuyển người**; **② kiểm tra đầu ra bằng luật + bộ kiểm thử cố định** |
| **3** | Vì sao **mẫu evaluator–optimizer phải giới hạn số vòng lặp**? Liên hệ rủi ro vòng lặp trong BPMN | Vì có thể **không hội tụ, dao động, hoặc reward hacking** → **lặp mãi, đốt token**. Liên hệ: đây chính là **vòng lặp rework + cổng XOR** ở 2.3.5, nơi `p` gần 1 làm **số lần lặp tiến tới vô hạn** |

---

*Tiếp theo: `04-Chuong4.md` — nền tảng no-code/low-code: ba mức phát triển, quản trị ba tầng, kiến trúc ba lớp, idempotency, bảo mật thông tin xác thực và các quyết định thiết kế khi dựng workflow thật.*
