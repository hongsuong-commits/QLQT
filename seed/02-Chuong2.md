# CHƯƠNG 2 — MÔ HÌNH HÓA VÀ TRỰC QUAN HÓA LUỒNG CÔNG VIỆC (BPMN 2.0)

> **Vị trí trong đề**: khoảng **7–8 câu Phần I** + **toàn bộ 12 câu Phần II** → **≈ 19–20 câu / 40 câu (≈ 5 điểm)**.
> Đây là chương duy nhất bạn *không được phép* học ở mức "hiểu ý". Phải học ở mức **đọc được sơ đồ và trace được token**.
>
> **Câu thần chú của chương**: *Một mô hình tốt trả lời được ba câu: **đúng cú pháp chưa, đúng thực tế chưa, người khác đọc có hiểu không?** Còn câu hỏi "quy trình này có chạy được không" chỉ trả lời được bằng **một** cách: đi theo token.*

---

## 2.0 Bản đồ chương — và vì sao chương này quyết định điểm

```
2.1 TƯ DUY             2.2 TỪ VỰNG                 2.3 NGỮ PHÁP
(mô hình hóa)     →    (ký pháp BPMN)        →    (mô hình hóa quy trình)
 • 3 mức chi tiết        • 5 nhóm phần tử            • 6 loại task + marker
 • 3 tiêu chí chất lượng • NGỮ NGHĨA TOKEN ★          • 4 cổng + 2 lỗi cân bằng ★
 • 7PMG                  • 5 quy tắc cú pháp          • dữ liệu, pool, lane
 • 6 quan hệ             • sự kiện (vị trí × loại)    • phân rã, call activity
                         • 6 bước, quy ước đặt tên    • 4 cơ chế ngoại lệ
```

Câu trong bài giảng tóm gọn cả chương: **"Mục 2.1 là tư duy, mục 2.2 là từ vựng, mục 2.3 là ngữ pháp. Cả ba đều cần để viết được một 'câu' hoàn chỉnh."**

**Vì sao chương này nặng?** Vì BPMN là ngôn ngữ *vừa đọc được bằng mắt người, vừa chạy được bằng máy*. Khi một ngôn ngữ có ngữ nghĩa hình thức, người ta **kiểm tra được** nó — và đề thi cũng kiểm tra được bạn. Một sơ đồ có thể *trông* rất hợp lý nhưng **treo vĩnh viễn** hoặc **chạy hai lần**. Muốn phát hiện, bạn phải có một công cụ tư duy chính xác hơn trực giác: **token**.

**Mạch nối sang các chương sau** (đề hay hỏi dạng "vì sao phải học BPMN"):

| Mô hình BPMN trở thành gì ở chương sau | Nội dung |
|---|---|
| Chương 3 | **Ngữ cảnh để giao việc cho AI Agent** — biết bước nào là luật, bước nào cần phán đoán |
| Chương 4 | **Bản đặc tả để cấu hình workflow no-code** — mỗi cấu trúc BPMN có một node tương ứng |
| Chương 5 | **Bản thiết kế để sinh mã bằng Vibe Coding** — phân rã quy trình = phân rã nhiệm vụ |

> **Vì sao ba người trong cùng một phòng ban mô tả ba quy trình khác nhau?** (câu mở đầu bài giảng) — Không phải vì ai nhớ kém, mà vì **ngôn ngữ mô tả không đủ chính xác để phát hiện chỗ khác nhau**. Mô tả bằng lời: mơ hồ về thứ tự, không diễn tả được song song. Mô tả bằng bảng: rõ trách nhiệm nhưng không diễn tả được rẽ nhánh, chờ đợi, ngoại lệ. Mô tả bằng **ký pháp chuẩn**: có cú pháp và ngữ nghĩa xác định → người đọc hiểu như nhau, **và máy cũng diễn giải được**. Đó chính là lý do BPMN ra đời.

---

## 2.1 Tổng quan về mô hình hóa quy trình

### 2.1.1 Mô hình là gì — ba chân lý định hình toàn chương

> **Mô hình** là một biểu diễn **có chủ đích** và **được đơn giản hóa** của một phần thực tại, nhằm phục vụ **một mục đích cụ thể**.
> **Mô hình hóa quy trình** là hoạt động tạo ra biểu diễn **tường minh** của một quy trình bằng một ngôn ngữ có **cú pháp và ngữ nghĩa xác định**.

| Chân lý | Nội dung | Hệ quả thi |
|---|---|---|
| **① Mô hình luôn không đầy đủ** | Việc lược bỏ chi tiết **không phải khiếm khuyết** mà chính là **mục đích** của mô hình hóa. "Một bản đồ tỷ lệ 1:1 vô dụng" | Đừng cố nhồi mọi thứ vào một bản vẽ. Câu hỏi "mô hình này thiếu bước X" chỉ có nghĩa khi biết mục đích của mô hình |
| **② Không có mô hình đúng tuyệt đối** | Chỉ có mô hình **phù hợp mục đích**. Cùng quy trình xét học bổng: mô hình để truyền thông cho sinh viên **khác hẳn** mô hình để cấu hình hệ thống | Phương án "mô hình B là sai vì khác mô hình A" → sai về bản chất |
| **③ Mô hình là công cụ giao tiếp trước tiên** | Nếu **người làm nghiệp vụ không đọc được** mô hình, mô hình đó **đã thất bại** ở mục tiêu quan trọng nhất — dù cú pháp hoàn hảo | Đây là nền của tiêu chí "dễ hiểu" (pragmatic quality) ở 2.1.4 |

> ★ **Câu hỏi đầu tiên khi bắt đầu vẽ không phải "vẽ thế nào" mà là "vẽ cho ai đọc và để làm gì".**

### 2.1.2 Sáu mục đích của mô hình hóa — và yêu cầu tương ứng

Đây là bảng rất "ăn điểm" vì nó giải thích **vì sao cùng một quy trình lại cần nhiều mô hình**.

| # | Mục đích | Câu hỏi được trả lời | Yêu cầu đối với mô hình |
|---|---|---|---|
| 1 | **Giao tiếp, thống nhất hiểu biết** | "Chúng ta có đang nói về cùng một quy trình không?" | Đơn giản, **ít ký hiệu**, dễ đọc |
| 2 | **Tài liệu hóa và đào tạo** | "Người mới vào việc phải làm gì?" | Đầy đủ vai trò, biểu mẫu, hướng dẫn |
| 3 | **Phân tích và cải tiến** | "Thời gian và chi phí đang bị mất ở đâu?" | **Có dữ liệu định lượng gắn kèm** |
| 4 | **Tuân thủ và kiểm toán** | "Quy trình có đúng quy định không?" | Chính xác, **có phiên bản, có phê duyệt** |
| 5 | **Tự động hóa và thực thi** | "Hệ thống phải điều phối thế nào?" | **Đúng cú pháp, đủ chi tiết kỹ thuật** |
| 6 | **Xác định yêu cầu phần mềm** | "Ứng dụng cần hỗ trợ những bước nào?" | Rõ **dữ liệu vào / ra** của từng bước |

> ★ **Đừng cố nhồi cả sáu mục đích vào một bản vẽ duy nhất.** Mục đích 1 và mục đích 5 có yêu cầu **xung đột nhau**: cái đầu cần ít ký hiệu, cái sau cần nhiều thuộc tính kỹ thuật.

### 2.1.3 Ba mức độ chi tiết của mô hình (bảng phải thuộc)

| Mức | Tên | Đặc điểm | Dùng để | Hệ quả |
|---|---|---|---|---|
| **1** | **Mô tả** (descriptive) | Tập ký hiệu **tối thiểu, khoảng 10 ký hiệu**; **bỏ qua ngoại lệ**, chỉ tập trung **đường đi hạnh phúc** (happy path) | Giao tiếp với **người làm nghiệp vụ** | Đọc nhanh, ai cũng hiểu; nhưng **không đủ để phân tích hay thực thi** |
| **2** | **Phân tích** (analytical) | Bổ sung **sự kiện, ngoại lệ, dữ liệu, thông điệp** | **Phân tích hiệu năng và thiết kế lại** quy trình (mức của Bài 2.3 và 2.4) | Đây là mức **dùng cho bài thi đọc sơ đồ**: có đủ nhánh ngoại lệ để hỏi |
| **3** | **Thực thi** (executable) | Bổ sung **thuộc tính kỹ thuật**: biến, biểu thức điều kiện, cấu hình dịch vụ, biểu mẫu | Để **process engine chạy trực tiếp** không cần viết thêm mã điều phối | Máy chạy được; nhưng **người nghiệp vụ không còn đọc được** |

#### Vì sao **bắt đầu ở mức mô tả** — lập luận hay được hỏi

> Vẽ mô hình thực thi ngay từ đầu thường làm **người nghiệp vụ mất khả năng tham gia góp ý**: họ nhìn thấy biến, biểu thức và cấu hình dịch vụ, rồi **im lặng**. Mà chính họ mới là người biết quy trình thật diễn ra thế nào.

Đây là lập luận **hai lớp**: (a) mức kỹ thuật gây **rào cản giao tiếp**; (b) mất giao tiếp thì mất **nguồn dữ liệu duy nhất** về as-is → mô hình đúng cú pháp nhưng **sai ngữ nghĩa**. Nó nối trực tiếp với chân lý ③ ở 2.1.1.

**Nguyên tắc thực hành**: bắt đầu ở mức mô tả, **chỉ nâng mức khi có nhu cầu rõ ràng**.

> ★ **Ưu thế lớn nhất của BPMN so với lưu đồ thường**: **cùng một ký pháp** phục vụ **cả ba mức**. Bạn không phải chuyển sang ngôn ngữ khác khi đi từ "vẽ cho người đọc" sang "đưa cho máy chạy".

### 2.1.4 Ba tiêu chí chất lượng — độc lập với nhau (rất dễ ra đề)

| # | Tiêu chí | Nội dung | Kiểm bằng cách nào |
|---|---|---|---|
| 1 | **Đúng cú pháp** (syntactic quality) | Tuân thủ **quy tắc của ngôn ngữ**: luồng tuần tự không vượt pool, cổng cân bằng, mọi hoạt động có luồng vào và ra | **Kiểm được bằng công cụ** (bpmn.io, Camunda Modeler) |
| 2 | **Đúng ngữ nghĩa** (semantic quality) | Phản ánh **trung thực quy trình thực tế** — cả những gì **CÓ** và những gì **KHÔNG CÓ** | **Chỉ kiểm được bằng cách xác nhận với người thực hiện** |
| 3 | **Dễ hiểu** (pragmatic quality) | **Người đọc mục tiêu** hiểu được mà **không cần giải thích thêm** | Đưa mô hình cho **một người chưa từng tham gia vẽ** |

**Ba tiêu chí độc lập** — đây chính là nội dung câu hỏi tình huống kinh điển:

| Tình huống | Cú pháp | Ngữ nghĩa | Dễ hiểu | Kết luận |
|---|---|---|---|---|
| Mô hình công cụ không báo lỗi nhưng mô tả sai thực tế | ✅ | ❌ | ✅ | Đúng cú pháp, **sai ngữ nghĩa** |
| Mô hình phản ánh đúng nhưng 60 phần tử chằng chịt trên một trang | ✅ | ✅ | ❌ | Đúng thực tế, **không dùng được để giao tiếp** |
| Mô hình 8 ký hiệu, đọc 30 giây hiểu, nhưng bỏ hết ngoại lệ | ✅ | ❌ (thiếu) | ✅ | Đây là mô hình **mô tả** — *chấp nhận được nếu mục đích là giao tiếp* |

> ★ **Tiêu chí khó đạt nhất là ngữ nghĩa** — vì nó đòi hỏi **quay lại hỏi người làm thật**, không thể suy ra từ bàn giấy. Đây là lý do bước 6 của quy trình 6 bước (rà soát, xác nhận) là bước quan trọng nhất và hay bị bỏ qua nhất.

### 2.1.5 Bảy hướng dẫn thực hành mô hình hóa — 7PMG (Mendling và cộng sự)

| # | Hướng dẫn | Bản chất / vì sao | Cách phát hiện vi phạm |
|---|---|---|---|
| **G1** | **Dùng càng ít phần tử càng tốt** | Mỗi phần tử thêm vào làm **tăng xác suất người đọc hiểu sai** | Đếm phần tử; nếu > ~30 → nghĩ đến phân rã |
| **G2** | **Hạn chế số cung nối mỗi phần tử** | Một phần tử có **nhiều luồng vào/ra** là dấu hiệu **logic chưa được tách rõ** | Nhìn các "ngã tư" quanh một task |
| **G3** | **Một sự kiện bắt đầu; một kết thúc cho mỗi loại kết quả** | Nhiều điểm bắt đầu rải rác khiến **không xác định được quy trình khởi phát từ đâu** | Đếm start event |
| **G4** | **Mô hình hóa có cấu trúc** ★ | Mỗi cổng **tách** phải có một cổng **gộp tương ứng CÙNG LOẠI** | Đây là hướng dẫn **phòng tránh bế tắc trực tiếp** (chứng minh ở 2.3.4) |
| **G5** | **Hạn chế dùng cổng OR** | OR **khó đọc và khó cài đặt đúng**; thường thay được bằng **hai cổng XOR lồng nhau** | Thấy ký hiệu vòng tròn có "O" → cân nhắc thay |
| **G6** | **Đặt tên hoạt động: động từ + danh từ** | "Kiểm tra hồ sơ" — **không** phải "Hồ sơ", cũng **không** phải "Kiểm tra" | Đọc tên task: thiếu động từ hoặc thiếu danh từ |
| **G7** | **Phân rã nếu vượt quá ~30 phần tử** | Vượt ngưỡng này mô hình **khó đọc, khó bảo trì và dễ sai** | Đếm phần tử trên một trang |

> ★ **7PMG là bộ quy tắc tối thiểu khi chấm bài 2.1 → 2.6 của học phần.** Bảy hướng dẫn này rút ra từ **nghiên cứu thực nghiệm trên hàng nghìn mô hình**: chúng **dự báo khá tốt xác suất một mô hình có lỗi**.
>
> **G4 là hướng dẫn liên quan trực tiếp đến phòng tránh bế tắc** — đề rất hay hỏi đúng ý này ("7PMG hướng dẫn nào phòng tránh deadlock?").

### 2.1.6 So sánh các ngôn ngữ mô hình hóa quy trình

| Ngôn ngữ | Ưu điểm | Hạn chế |
|---|---|---|
| **Lưu đồ** (flowchart) | Ai cũng đọc được, không cần đào tạo | **Không diễn tả được song song, sự kiện, vai trò** |
| **EPC** (Event-driven Process Chain) | Mạnh về **liên kết chức năng – dữ liệu** | **Cồng kềnh**, ít công cụ thực thi |
| **UML Activity Diagram** | Gần gũi với **kỹ sư phần mềm** | **Ít thân thiện với người làm nghiệp vụ** |
| **BPMN 2.0** | **Chuẩn quốc tế (OMG)**, vừa đọc được **vừa chạy được**, hệ sinh thái công cụ rộng | **Tập ký hiệu lớn**, dễ bị lạm dụng |
| **DMN** | Biểu diễn **quyết định dạng bảng**, bổ sung tốt cho BPMN | **Không mô tả luồng công việc** |

**Ba lý do học phần chọn BPMN 2.0** (thuộc để trả lời câu "vì sao BPMN"):

| # | Lý do | Nội dung |
|---|---|---|
| i | **Được hỗ trợ rộng rãi** | Các nền tảng BPA và no-code đều nhận BPMN → nội dung Chương 4 |
| ii | **Có ngữ nghĩa thực thi** | Mô hình không dừng ở bản vẽ mà **chạy được trên process engine** |
| iii | **Là ngôn ngữ chung với AI** | Dùng để **mô tả nhiệm vụ cho AI Agent** ở Chương 3 |

> **Phân biệt BPMN – DMN (dễ nhầm)**: BPMN mô tả **luồng công việc** ("làm gì, theo thứ tự nào, ai làm"); DMN mô tả **một quyết định** dưới dạng bảng ("với đầu vào này thì kết luận gì"). Trong BPMN, chỗ nào cần gọi DMN chính là **business rule task**.

### 2.1.7 Kiến trúc quy trình theo cấp — chống lại "mô hình khổng lồ"

> Một tổ chức **không có một quy trình duy nhất** mà có một **HỆ THỐNG** quy trình liên kết với nhau.

| Cấp | Tên gọi | Nội dung | Ví dụ tại trường đại học |
|---|---|---|---|
| **0** | **Bản đồ quy trình** (process landscape) | Toàn cảnh **các nhóm quy trình** | Đào tạo – Nghiên cứu – Phục vụ người học – Quản trị nội bộ |
| **1** | **Quy trình chính** | **Chuỗi đầu–cuối** | Quản lý học vụ một học kỳ |
| **2** | **Quy trình con** | Cụm bước **có mục tiêu riêng** | Đăng ký học phần |
| **3** | **Tác vụ / thao tác** | Từng bước cụ thể | Kiểm tra điều kiện tiên quyết |

> ★ **Sai lầm phổ biến của người mới**: cố vẽ cả "Quản lý học vụ một học kỳ" trên một trang A3. Kết quả là bản vẽ **200 phần tử** mà **không ai đọc, không ai bảo trì và không dùng để làm gì**. Hiểu kiến trúc theo cấp giúp tránh đúng lỗi này.

### 2.1.8 Sáu loại quan hệ giữa các quy trình (câu hỏi "kể đủ 6 loại")

| # | Quan hệ | Định nghĩa | Cách biểu diễn | Ví dụ |
|---|---|---|---|---|
| 1 | **Phân rã** (decomposition) | Quy trình **cấp trên chứa** quy trình cấp dưới | **Sub-process** (2.3.8) | "Thẩm định hồ sơ" chứa "Kiểm tra tính đầy đủ" |
| 2 | **Gọi lại / tái sử dụng** (invocation) | Nhiều quy trình **cùng gọi một quy trình dùng chung** | **Call activity** (2.3.9) | "Phê duyệt chi tiêu" dùng cho mua sắm, công tác phí, hội thảo |
| 3 | **Kích hoạt tuần tự** (triggering) | Quy trình A **kết thúc sinh ra sự kiện** khởi phát quy trình B | Không cùng một sơ đồ; nối bằng sự kiện/ thông điệp | "Xét duyệt đề tài" → "Cấp kinh phí" |
| 4 | **Trao đổi thông điệp** | Hai quy trình chạy **song song ở hai tổ chức**, trao đổi qua message flow | **Message flow giữa hai pool** | Trường ↔ Ngân hàng giải ngân học bổng |
| 5 | **Chuyên biệt hóa** (specialization) | Các **biến thể** cùng khung chung nhưng khác một số nhánh | Nhiều mô hình / mô hình cấu hình được | Xét tốt nghiệp hệ chính quy và hệ liên thông |
| 6 | **Chia sẻ dữ liệu** | Hai quy trình **độc lập** cùng đọc/ghi một **data store** → ràng buộc **ngầm** | **Data store** chung | Cùng ghi vào CSDL sinh viên |

> **Quy tắc thực hành**: một mô hình BPMN nên chỉ mô tả **MỘT quy trình ở MỘT cấp**. Khi thấy mình đang vẽ **hai loại quan tâm khác nhau** trên cùng một trang, đó là dấu hiệu cần **tách mô hình** theo một trong sáu quan hệ trên.
>
> **Chi tiết dễ ra đề**: **bốn quan hệ đầu** có ký hiệu BPMN tương ứng; **hai quan hệ cuối** (chuyên biệt hóa, chia sẻ dữ liệu) phải xử lý ở **mức tổ chức tài liệu**, **không có ký hiệu riêng**.

---

## 2.2 Bộ ký pháp BPMN 2.0 — từ vựng của ngôn ngữ

### 2.2.1 BPMN là gì — và cái giá của nó

> **BPMN** = **Business Process Model and Notation** — chuẩn ký pháp do **OMG** (Object Management Group) ban hành. **Phiên bản 2.0 (2011)** trở thành chuẩn **ISO/IEC 19510 năm 2013**.

**Mục tiêu thiết kế**: làm **cầu nối** giữa người làm nghiệp vụ và người làm kỹ thuật.

```
Người làm nghiệp vụ  ──đọc được Ý NGHĨA──►  MỘT sơ đồ BPMN  ──►  Hệ thống diễn giải được để THỰC THI
                        (bằng mắt)          duy nhất              (bằng XML)
```

**Vì sao "một sơ đồ" lại quan trọng?** Khi nghiệp vụ và kỹ thuật dùng **hai bản vẽ khác nhau**, hai bản đó **lệch nhau ngay từ tuần thứ hai** và **không ai biết bản nào đúng**. BPMN giữ **một nguồn sự thật duy nhất**: cùng một tệp, người đọc bằng mắt, máy đọc bằng XML.

**Cái giá phải trả**: tập ký hiệu **lớn — hơn 100 ký hiệu** ở đặc tả đầy đủ → **rất dễ bị lạm dụng**. Giải pháp: dùng **tập con tối thiểu** ở mô hình mô tả, **chỉ mở rộng khi mục đích đòi hỏi** (chính là nội dung ba mức chi tiết ở 2.1.3).

#### Ba loại sơ đồ con của BPMN 2.0

| # | Loại sơ đồ | Nội dung | Dùng khi nào |
|---|---|---|---|
| 1 | **Sơ đồ quy trình** (process diagram) | Mô tả luồng công việc **bên trong MỘT thực thể** | **Nội dung chính của chương này** và toàn bộ bài tập học phần |
| 2 | **Sơ đồ cộng tác** (collaboration diagram) | **Nhiều pool** trao đổi **thông điệp** với nhau | Cần thể hiện tương tác với khách hàng, đối tác, hệ thống bên ngoài |
| 3 | **Sơ đồ hội thoại & biên đạo** (conversation & choreography) | Mô tả **mẫu trao đổi thông điệp** ở mức trừu tượng cao | Ít dùng trong thực tiễn; **học phần không đi sâu** |

> **Hai con số/fact đáng nhớ**: trong thực tiễn doanh nghiệp, **hơn 90%** mô hình BPMN là **sơ đồ quy trình hoặc sơ đồ cộng tác**. Và **sơ đồ cộng tác thực chất là nhiều sơ đồ quy trình đặt cạnh nhau, nối bằng luồng thông điệp** → học tốt sơ đồ quy trình là **đủ nền tảng**.

### 2.2.2 Năm nhóm phần tử (bảng "phải thuộc")

| # | Nhóm | Các phần tử | Vai trò | Có mang token? |
|---|---|---|---|---|
| **1** | **Đối tượng luồng** (flow objects) | **Sự kiện · Hoạt động · Cổng** | Bộ xương của mô hình | **Có** (sự kiện sinh/chuyển token; cổng điều khiển token) |
| **2** | **Đối tượng kết nối** (connecting objects) | **Luồng tuần tự · Luồng thông điệp · Liên kết** (association) | Nối các phần tử | **Sequence flow: CÓ**; message flow & association: **KHÔNG** |
| **3** | **Làn bơi** (swimlanes) | **Pool · Lane · Black-box pool** | Trả lời câu hỏi **"ai làm"** | Không (nhưng quyết định **nơi bàn giao**) |
| **4** | **Dữ liệu** (data) | **Data object · Data store · Data input/output · Data collection** | Làm mô hình **giàu thông tin** | **Không** |
| **5** | **Phụ trợ** (artifacts) | **Text annotation · Group** | Giải thích thêm | **Không** |

**Ba nhận định cần nhớ nguyên văn:**

1. **Nhóm 1 và nhóm 2 là bắt buộc**: không có chúng thì **không có luồng công việc nào được biểu diễn**.
2. **Nhóm 3 trả lời "ai làm"** — thiếu nó thì **không đếm được số lần bàn giao**, tức là **mất khả năng phân tích**.
3. **Nhóm 4 và 5 không mang token** → thêm hay bớt **không làm quy trình chạy khác đi**, chỉ làm mô hình **dễ hiểu hơn**.

> **Con số thực hành**: mô hình **mô tả** chỉ cần **khoảng 10 ký hiệu** lấy từ **ba nhóm đầu** — đủ cho phần lớn nhu cầu giao tiếp.

### 2.2.3 Ngữ nghĩa thẻ (token semantics) ★★★ — công cụ tư duy quan trọng nhất chương

> Hãy hình dung một **THẺ (token)** được **sinh ra tại sự kiện bắt đầu** và **di chuyển dọc theo các luồng tuần tự**.

**Bốn quy tắc nền — học thuộc lòng:**

| # | Quy tắc | Nội dung |
|---|---|---|
| 1 | **Sinh token** | Mỗi **sự kiện bắt đầu** sinh ra **đúng một token** khi thể hiện được khởi tạo |
| 2 | **Điều kiện khởi động hoạt động** | Một hoạt động **chỉ khởi động khi NHẬN ĐƯỢC token trên luồng vào**; khi hoàn tất, nó **CHUYỂN token sang luồng ra** |
| 3 | **Token độc lập theo thể hiện** | Mỗi thể hiện quy trình tương ứng **một tập token riêng** — *nghìn hồ sơ đang chạy là nghìn tập token độc lập* |
| 4 | **Điều kiện kết thúc** | Quy trình **kết thúc khi KHÔNG CÒN token nào** trong mô hình. **Nếu còn token mắc kẹt ở đâu đó, quy trình treo** |

> ★ Đây là câu trả lời cho câu hỏi **"quy trình này có chạy được không"** — và là **cách duy nhất** trả lời được **mà không cần chạy thử**.

#### Token đi qua bốn loại cổng như thế nào

| Cổng | Khi **TÁCH** (split) | Khi **GỘP** (join) | Hệ quả số token |
|---|---|---|---|
| **AND** (song song, dấu **+**) | **Nhân bản** token ra **MỌI** nhánh | **Chờ đủ** token từ **MỌI** nhánh rồi **hợp lại thành MỘT** | n vào → 1 ra; 1 vào → n ra |
| **XOR** (loại trừ, chữ **X** hoặc để trống) | Chuyển token sang **ĐÚNG MỘT** nhánh theo điều kiện | **Chuyển tiếp NGAY** khi có token đến từ **bất kỳ** nhánh nào | 1 vào → 1 ra ở mỗi lần |
| **OR** (bao hàm, vòng tròn) | Kích hoạt **MỘT HOẶC NHIỀU** nhánh theo điều kiện | **Chờ đúng những nhánh ĐÃ được kích hoạt** | Số token ra = số nhánh đã kích hoạt |
| **Event-based** (ngũ giác trong hình tròn đôi) | **CHỜ XEM sự kiện nào xảy ra trước** — không rẽ theo dữ liệu | **Không dùng để gộp** | 1 token chờ; **chỉ MỘT nhánh** được đi, các nhánh khác **bị hủy** |

> ★ **Vì sao OR khó?** Vì ở cổng gộp, **engine phải SUY LUẬN** xem những nhánh nào đã được kích hoạt để biết cần chờ bao nhiêu token. Chính vì thế **OR khó cài đặt và khó đọc** → 7PMG G5 khuyên **hạn chế dùng OR**, thay bằng **hai cổng XOR lồng nhau**.

#### Ứng dụng ngay: chứng minh hai lỗi cân bằng cổng (xem đầy đủ 2.3.4)

| Cấu trúc | Trace token | Kết luận |
|---|---|---|
| **Tách XOR → gộp AND** | 1 token vào cổng tách → **chỉ 1 nhánh** nhận token → cổng AND **chờ đủ mọi nhánh** → nhánh còn lại **không bao giờ** có token | **BẾ TẮC (deadlock)** — treo vĩnh viễn |
| **Tách AND → gộp XOR** | 1 token vào cổng tách → **2 token** ra → cổng XOR **chuyển tiếp ngay** từng token → phía sau nhận **2 token** và **chạy HAI LẦN** | **ĐỒNG BỘ THIẾU (lack of synchronization)** — gửi 2 email, tạo 2 bút toán |

> ★ **Cả hai lỗi phát hiện được chỉ bằng cách đi theo token** — **không cần công cụ, không cần chạy thử**. Đây chính là kỹ năng Bài tập 2.1 yêu cầu.

### 2.2.4 Năm quy tắc cú pháp cơ bản

| # | Quy tắc | Nội dung | Công cụ kiểm được? |
|---|---|---|---|
| **1** | **Luồng tuần tự KHÔNG vượt ranh giới pool** | Giao tiếp giữa các pool **CHỈ qua luồng thông điệp**. *Đây là quy tắc bị vi phạm nhiều nhất* | ✅ Có |
| **2** | **Luồng thông điệp KHÔNG nối hai phần tử cùng pool** | Trong cùng một pool, **thứ tự do ta kiểm soát** → phải dùng **luồng tuần tự** | ✅ Có |
| **3** | **Mọi hoạt động có ít nhất một luồng vào và một luồng ra** | *Trừ khi* hoạt động được **kích hoạt trực tiếp bởi một sự kiện** | ✅ Có |
| **4** | **Không nối trực tiếp hai cổng** nếu diễn đạt được rõ hơn; **không dùng cổng để làm việc của sự kiện** | Nguyên tắc: **cổng rẽ nhánh, sự kiện chờ đợi** | ❌ Phải **tự đọc bằng mắt** |
| **5** | **Điều kiện các nhánh XOR phải LOẠI TRỪ và BAO PHỦ HẾT** | Loại trừ nhau **và** bao phủ mọi khả năng. **Nên có một nhánh mặc định** để không bỏ sót trường hợp | ❌ Phải **tự đọc bằng mắt** |

> ★ **Đúng cú pháp mới chỉ là điều kiện CẦN.** Một mô hình đúng cú pháp vẫn có thể **mô tả sai hoàn toàn quy trình thực tế** (ngữ nghĩa) hoặc **không ai đọc nổi** (dễ hiểu).

**Ví dụ về quy tắc 5 — bài học "lỗ hổng 0,1 điểm"** (liên hệ câu tự kiểm tra số 6 của đề cương):

> Cổng XOR có hai nhánh: **"Thiếu 0,5 điểm trở lên"** và **"Đạt từ 0,3 điểm"**. Hồ sơ lệch **0,4 điểm** không thỏa nhánh nào → **token kẹt tại cổng** → **bế tắc im lặng**, hồ sơ treo mà không ai báo lỗi.
> **Cách sửa**: (a) làm hai điều kiện **loại trừ và bao phủ** ("Thiếu từ 0,5 trở lên" / "Thiếu dưới 0,5"); hoặc (b) thêm **nhánh mặc định** (`default flow`) hứng mọi trường hợp còn lại.

### 2.2.5 Phương pháp trace token — kỹ năng kiếm 3 điểm Phần II

Đây là **quy trình 6 bước** bạn sẽ dùng cho **mọi** câu đọc sơ đồ. Luyện đến mức làm được trong **60–90 giây/câu**.

| Bước | Việc làm | Ghi chú thi |
|---|---|---|
| **1** | **Đếm sự kiện bắt đầu** | Mỗi start event = **1 token** ban đầu. Nhiều start → nhiều token độc lập (hoặc nhiều kịch bản khởi phát khác nhau) |
| **2** | **Đi theo từng cung**, đánh số token bằng bút chì lên hình | Đừng đi bằng mắt — **token phải được VIẾT RA** |
| **3** | Gặp **cổng tách**: áp bảng ở 2.2.3 | XOR → 1 nhánh; AND → n nhánh; OR → các nhánh thỏa điều kiện; event-based → 1 nhánh, hủy phần còn lại |
| **4** | Gặp **cổng gộp**: **đếm số token đến** rồi so với yêu cầu của cổng | Đây là bước quyết định: AND cần **đủ**, XOR cần **1**, OR cần **đúng số đã kích hoạt** |
| **5** | **Đi tiếp đến hết**, ghi lại: số token ra khỏi mỗi cổng gộp, số lần đoạn phía sau được chạy | Nếu phía sau chạy **2 lần** → lack of sync. Nếu token **dừng lại** → deadlock |
| **6** | **Kết luận**: đúng / bế tắc / đồng bộ thiếu / vi phạm cú pháp | Kèm **hậu quả nghiệp vụ** (treo hồ sơ / gửi 2 email / 2 bút toán) |

#### Bảng chẩn đoán nhanh 10 giây (dùng khi thi, nhìn hình là biết đáp án)

| Dấu hiệu trên hình | Chẩn đoán | Từ khóa đáp án đúng |
|---|---|---|
| Cổng tách **X** ... cổng gộp **+** | **Bế tắc** | deadlock, treo vĩnh viễn, token không bao giờ đến |
| Cổng tách **+** ... cổng gộp **X** | **Đồng bộ thiếu** | lack of synchronization, chạy hai lần, hai email |
| Mũi tên **nét liền** nối hai **pool** khác nhau | Vi phạm cú pháp | sequence flow không vượt pool |
| Mũi tên **nét đứt** nối hai phần tử **trong cùng pool** | Vi phạm cú pháp | message flow không nối trong pool |
| Sự kiện **viền đôi nét đứt** trên viền task | Biên **không ngắt** | hoạt động vẫn tiếp tục, sinh thêm token nhánh phụ |
| Sự kiện **viền đôi nét liền** trên viền task | Biên **ngắt** | hoạt động bị dừng, token sang nhánh ngoại lệ |
| Cổng **ngũ giác** ngay sau một task, phía sau là các **sự kiện bắt** | **Event-based gateway** | chờ sự kiện nào đến trước, hủy nhánh còn lại |
| Sự kiện kết thúc **viền đậm, hình tròn đặc** | **Terminate** | dừng **toàn bộ** thể hiện, xóa **mọi** token |
| Khung **nét đứt** bao quanh một cụm task, có start event riêng | **Event sub-process** | kích hoạt ở **bất kỳ đâu**, không cần gắn biên |
| Khung **viền đậm** quanh một task có dấu **+** | **Call activity** | quy trình **định nghĩa độc lập**, tái sử dụng |
| Khung **viền đôi** bao quanh cụm task | **Transaction sub-process** | giao dịch, bù trừ **thứ tự ngược** |

### 2.2.6 Sáu bước xây dựng một mô hình (quy trình làm việc chuẩn)

| # | Bước | Nội dung | Mẹo / cạm bẫy |
|---|---|---|---|
| **1** | **Xác định phạm vi** | Xác định rõ **sự kiện khởi phát**, các **kết quả kết thúc có thể có** và **mức chi tiết** mong muốn | Viết **một câu duy nhất**: *"Quy trình bắt đầu khi … và kết thúc khi …"*. **Nếu chưa viết được câu này thì chưa nên vẽ** |
| **2** | **Liệt kê hoạt động và sự kiện** | Thu thập qua **phỏng vấn, quan sát tại chỗ hoặc nhật ký hệ thống** | Ghi ra **danh sách PHẲNG trước, chưa vội nối luồng**. *Nối luồng quá sớm khiến ta bỏ sót các bước không nằm trên đường đi chính* |
| **3** | **Xác định người tham gia, bố trí pool và lane** | Mỗi **thực thể độc lập** → một **pool**; mỗi **vai trò bên trong tổ chức** → một **lane** | Đặt lane theo **vai trò**, **không theo tên người** và **không theo số thứ tự bước** |
| **4** | **Sắp xếp trật tự và bổ sung cổng** | Nối theo **trật tự thực tế**; chỗ nào luồng chia tách thì **đặt cổng** | Câu hỏi chọn cổng: **"chọn một hay làm cả hai?"** → chọn một = **XOR**, làm cả hai = **AND** |
| **5** | **Bổ sung dữ liệu, thông điệp, sự kiện trung gian** | Gắn biểu mẫu/hồ sơ; nối thông điệp với pool bên ngoài; thêm **sự kiện hẹn giờ, sự kiện lỗi** | Đây là lúc mô hình chuyển từ mức **MÔ TẢ** sang mức **PHÂN TÍCH** — *chỉ làm khi thật sự cần* |
| **6** | **Rà soát và tinh gọn** | Kiểm theo **7PMG**, kiểm cú pháp bằng **công cụ**, và **xác nhận lại với người thực hiện quy trình** | ★ **Bước xác nhận là bước QUAN TRỌNG NHẤT và hay bị bỏ qua nhất.** Không có nó, mô hình **chỉ đúng cú pháp chứ chưa chắc đúng thực tế** |

> **Bản chất của sáu bước**: 1–3 là **thu thập và cấu trúc hóa** (đang học, đang hỏi); 4–5 là **mã hóa thành ký pháp**; 6 là **kiểm chứng**. Bước 6 chính là **tiêu chí ngữ nghĩa** ở 2.1.4 được biến thành hành động.

### 2.2.7 Quy ước đặt tên (bảng dễ ra đề nhất chương)

| Phần tử | Mẫu đặt tên | Ví dụ **ĐÚNG** | Ví dụ **SAI** |
|---|---|---|---|
| **Hoạt động** | **Động từ + danh từ** | "Thẩm định hồ sơ vay" | "Hồ sơ vay" |
| **Sự kiện** | **Danh từ + động từ ở dạng ĐÃ HOÀN TẤT** | "Đơn hàng đã được xác nhận" | "Xác nhận đơn hàng" |
| **Cổng XOR** | **Câu hỏi** | "Hồ sơ hợp lệ?" | "Kiểm tra" |
| **Nhánh ra** | **Kết quả trả lời câu hỏi ở cổng** | "Hợp lệ" / "Không hợp lệ" | (để trống) |
| **Pool / Lane** | **Danh từ chỉ vai trò** | "Chuyên viên đào tạo" | "Bước 2" |

**Vì sao quy ước này quan trọng đến vậy?** Ba lý do:

1. **Tên là phần DUY NHẤT của mô hình mà người đọc thật sự đọc.** Ký hiệu hoàn hảo nhưng task tên "Xử lý" và cổng tên "Kiểm tra" thì **không truyền đạt được gì cả**.
2. **Nó có tác dụng kỹ thuật**: buộc người vẽ trả lời câu hỏi **"làm gì, với cái gì"** — và chính câu hỏi đó **lộ ra những bước còn mơ hồ** trong hiểu biết về quy trình.
3. **Sự kiện dạng "đã hoàn tất"** phản ánh đúng **ngữ nghĩa**: sự kiện là **điều ĐÃ XẢY RA**, không phải việc cần làm. Viết "Xác nhận đơn hàng" ở sự kiện là **biến sự kiện thành hoạt động** — vi phạm cả ngữ nghĩa lẫn quy tắc 4 ở 2.2.4.

> ★ **Bẫy thi**: đề cho một sơ đồ có task tên **"Hồ sơ"** hoặc cổng tên **"Kiểm tra"** → lỗi **đặt tên**, **không** phải lỗi cú pháp (công cụ sẽ không báo).

### 2.2.8 Bốn phép phân tích trên mô hình — và công thức tính

> Mô hình as-is **không chỉ để nhìn** — nó là **công cụ đo lường**. Đây là lý do **giai đoạn khám phá phải đi trước giai đoạn phân tích** trong vòng đời BPM.

#### Bốn chỉ số BẮT BUỘC ghi trên mô hình phân tích

| Chỉ số | Định nghĩa | Ghi ở đâu |
|---|---|---|
| **Thời gian xử lý** (processing time) | Thời gian **thực sự làm việc** trên mỗi thể hiện | Text annotation gắn vào từng hoạt động |
| **Thời gian chờ** (waiting time) | Thời gian hồ sơ **nằm im giữa hai bước** | Cùng annotation: *"Xử lý 15 phút · Chờ 2 ngày · Chuyên viên đào tạo"* |
| **Tần suất mỗi nhánh** | **Tỷ lệ phần trăm** thể hiện đi theo từng nhánh | **Ngay trên nhánh ra của cổng XOR** |
| **Chi phí và vai trò** | Chi phí mỗi lần thực hiện và **ai là người làm** | Annotation / lane |

> **Số liệu lấy từ đâu?** Nhật ký hệ thống nếu có; nếu không thì **ước lượng bằng phỏng vấn ba người và lấy khoảng**. **Ước lượng có ghi rõ là ước lượng vẫn tốt hơn không có số.**

#### Bốn phép phân tích

| # | Phép phân tích | Cách làm | Giá trị phát hiện |
|---|---|---|---|
| **1** | **Đếm số lần bàn giao** (handoff) | **Mỗi lần luồng đi qua ranh giới lane = 1 lần bàn giao** | Nơi tiềm ẩn **thời gian chờ và mất thông tin** |
| **2** | **Phân tích thời gian chu trình** | Gán **thời gian xử lý + thời gian chờ** cho mỗi hoạt động, rồi **tính tổng theo từng đường đi** | Cho biết **thời gian đang mất ở đâu** |
| **3** | **Phân tích giá trị gia tăng** | Phân loại mỗi hoạt động: **(a) tạo giá trị cho khách hàng**, **(b) cần cho vận hành/tuân thủ**, **(c) lãng phí** | Nhóm (c) **phải bị loại bỏ TRƯỚC KHI nghĩ đến tự động hóa** |
| **4** | **Phân tích nút cổ chai & vòng lặp làm lại** | Nhánh **quay lui** cho biết **tỷ lệ làm lại** | ★ Thường là **mục tiêu cải tiến hiệu quả nhất trên mỗi đồng chi phí** |

#### Ba công thức tính thời gian chu trình (phần tính toán của chương)

**① Cổng XOR (nhánh loại trừ) → tính KỲ VỌNG theo xác suất**

```
E[T] = Σ (pᵢ × Tᵢ)        với Σ pᵢ = 1
```

*Ý nghĩa*: mỗi thể hiện chỉ đi **một** nhánh, nên thời gian trung bình là **bình quân gia quyền** theo tần suất.
*Điều kiện áp dụng*: các nhánh **loại trừ nhau** và **đã biết tần suất** (lấy từ log hoặc ước lượng).

**② Cổng AND (nhánh song song) → lấy GIÁ TRỊ LỚN NHẤT**

```
T = max(T₁, T₂, …, Tₙ)
```

*Ý nghĩa*: các nhánh chạy **đồng thời**; cổng gộp **chờ đủ mọi nhánh**, nên **nhánh chậm nhất quyết định**. Nhánh nhanh hơn **không** làm tổng nhanh hơn — nó chỉ **chờ**.
*Hệ quả thiết kế*: **song song hóa chỉ có lãi khi các nhánh tương đối cân nhau**. Nếu một nhánh chiếm 95% thời gian, song song hóa gần như vô ích → phải **cắt riêng nhánh dài nhất**.

**③ Vòng lặp làm lại (rework) → cấp số nhân**

```
Số lần thực hiện trung bình của đoạn lặp = 1 / (1 − p)
Thời gian phát sinh thêm ≈ [p / (1 − p)] × T_đoạn_lặp
```

*Ý nghĩa*: `p` là **xác suất phải làm lại**. Với `p = 20%`, đoạn lặp trung bình chạy **1,25 lần** → phát sinh thêm **25%** thời gian của đoạn đó. Với `p = 50%`, đoạn lặp chạy **2 lần** → **gấp đôi**.
*Vì sao đây là công thức đáng sợ nhất*: `p` tăng theo **cấp số nhân** ở mẫu số. Từ 20% lên 40% không phải "gấp đôi" mà là từ **25%** phát sinh lên **67%** phát sinh.

#### Ví dụ tính đầy đủ — Quy trình xét học bổng (số liệu giả định để luyện)

| Bước | Xử lý | Chờ | Ghi chú |
|---|---|---|---|
| 1. Lọc danh sách đủ điều kiện | 30 phút | 1 ngày | Phòng Đào tạo |
| 2. Rà soát, bổ sung điểm rèn luyện | 60 phút | 2 ngày | Cố vấn học tập |
| 3a. **Kiểm tra điều kiện học vụ** | 20 phút | 2 ngày | **song song (AND)** |
| 3b. **Kiểm tra công nợ học phí** | 10 phút | 4 ngày | **song song (AND)** |
| 4. Họp hội đồng khoa xét | 120 phút | 3 ngày | Hội đồng khoa |
| 5. Trình ký quyết định | 20 phút | 5 ngày | CTSV → Ban Giám hiệu |
| 6. Thông báo + chi trả | 40 phút | 1 ngày | CTSV / KHTC |

**Bước tính 1 — tổng thời gian xử lý** (cộng hết, vì xử lý là tuần tự hoặc song song nhưng đều tốn công):
`30 + 60 + 20 + 10 + 120 + 20 + 40 = 300 phút = 5 giờ`

**Bước tính 2 — tổng thời gian chờ theo đường đi dài nhất**:
Bước 3 là **AND** → lấy **max(2 ngày; 4 ngày) = 4 ngày** (nhánh kiểm tra công nợ quyết định).
`1 + 2 + 4 + 3 + 5 + 1 = 16 ngày`

**Bước tính 3 — thời gian chu trình cơ sở**:
`≈ 16 ngày + 5 giờ ≈ 16,6 ngày làm việc` (quy 8 giờ/ngày)

**Bước tính 4 — tỷ lệ lãng phí**:
`16 ngày chờ / 16,6 ngày ≈ 96,4%` → **chỉ ~3,6% thời gian là làm việc thật**.

> ★ **Đây là con số "gây bất ngờ nhất cho chính người vận hành"** — và là câu trả lời chuẩn cho câu hỏi "vì sao phải đo trước khi tự động hóa": nếu bạn đưa bot vào **tăng tốc 5 giờ xử lý kia lên 0 giờ**, thời gian chu trình chỉ giảm từ **16,6 → 16,0 ngày** (~3,6%).

**Bước tính 5 — thêm vòng lặp làm lại**:
Giả sử **25%** danh sách **không được hội đồng thông qua** → quay lại bước 2.
Đoạn lặp gồm bước 2 → 3a/3b → 4: chờ `2 + 4 + 3 = 9 ngày`, xử lý `60 + 30 + 120 = 210 phút ≈ 3,5 giờ`.
`p = 0,25` → số lần chạy thêm trung bình `p/(1−p) = 0,25/0,75 = 0,333`
Thời gian phát sinh `≈ 0,333 × 9 ngày ≈ 3 ngày`
**→ Thời gian chu trình kỳ vọng ≈ 16,6 + 3 = 19,6 ngày.**

> ★ **Bài học**: một phần tư hồ sơ phải làm lại đã **cộng thêm 18% thời gian chu trình** và **gấp ba lần khối lượng việc của hội đồng khoa**. Đây là lý do phép phân tích **số 4 (vòng lặp làm lại)** thường là **nơi cải tiến rẻ nhất** — không cần công nghệ, chỉ cần **sửa điều kiện đầu vào** để giảm `p`.

**Bước tính 6 — đếm bàn giao**: đếm số lần luồng cắt qua ranh giới lane: PĐT→CVHT (1), CVHT→Hội đồng (2), Hội đồng→CTSV (3), CTSV→BGĐ (4), CTSV/KHTC (5) → **ít nhất 5 lần bàn giao**. Mỗi lần là **một điểm chờ tiềm ẩn**, và số này **dự báo khá chính xác độ dài thời gian chu trình**.

> **Lưu ý phương pháp**: khi tính thời gian chu trình, phải **phân biệt rõ** "thời gian xử lý" và "thời gian chờ" — nếu mô hình hóa việc chờ như một **hoạt động** (lỗi rất phổ biến), phép tính sẽ **sai hoàn toàn**. Đó chính là lý do cần **sự kiện trung gian bắt** thay vì "task chờ".

### 2.2.9 Sự kiện — phân loại theo VỊ TRÍ (5 vị trí)

> Sự kiện là điều làm cho BPMN **mạnh hơn hẳn lưu đồ**: nó cho phép mô tả những gì xảy ra **NGOÀI kịch bản chính**.

| # | Vị trí | Ký hiệu (viền) | Ngữ nghĩa | Ví dụ |
|---|---|---|---|---|
| **1** | **Bắt đầu** (start) | **Viền mảnh, đơn** | **Khởi phát** một thể hiện | "Kết quả học kỳ đã công bố" |
| **2** | **Trung gian BẮT** (intermediate catching) | **Viền đôi** | Quy trình **DỪNG CHỜ** đến khi sự kiện xảy ra | "Chờ khách hàng phản hồi" |
| **3** | **Trung gian NÉM** (intermediate throwing) | Viền đôi, **ký hiệu TÔ ĐEN** | Quy trình **PHÁT RA** sự kiện rồi **đi tiếp** | "Gửi email xác nhận" |
| **4** | **Biên** (boundary) | Gắn **trên viền hoạt động** | Bắt sự kiện xảy ra **TRONG LÚC hoạt động đang chạy** | "Quá 3 ngày chưa duyệt" |
| **5** | **Kết thúc** (end) | **Viền ĐẬM** | Kết thúc **một nhánh** của quy trình | "Học bổng đã chi trả" |

#### Bắt (catching) và ném (throwing) — quy tắc nhớ nhanh

| | **Bắt** (catch) | **Ném** (throw) |
|---|---|---|
| Bản chất | Quy trình **chờ** điều gì đó **đến từ bên ngoài** | Quy trình **chủ động phát ra** điều gì đó |
| Ví dụ | Nhận email, đến hạn, có tín hiệu | Gửi thông điệp, phát tín hiệu, ném lỗi |
| Dấu hiệu hình | **Không tô** (rỗng) | **TÔ ĐEN** bên trong |

> ★ **Vì sao cần sự kiện trung gian?** Không có nó, mọi việc **chờ đợi** phải được mô tả như một **"hoạt động chờ"** — mà **chờ đợi không phải là công việc và không tiêu tốn nguồn lực**. Mô tả sai như vậy **làm hỏng toàn bộ phép tính thời gian chu trình** ở 2.2.8.

> **Sự kiện biên là loại có sức mạnh biểu đạt LỚN NHẤT — và cũng là loại người mới học ÍT DÙNG NHẤT.** Đây là nhận định rất dễ thành câu hỏi lý thuyết.

### 2.2.10 Sự kiện — phân loại theo LOẠI (11 loại)

#### Nhóm thường dùng (6 loại)

| # | Loại | Ý nghĩa | Ví dụ | Ghi chú thi |
|---|---|---|---|---|
| 1 | **Không xác định** (none) | Bắt đầu hoặc kết thúc **thông thường**, không có nguyên nhân/hệ quả đặc biệt | "Bắt đầu học kỳ" | Ký hiệu **rỗng hoàn toàn** |
| 2 | **Thông điệp** (message) | **Nhận hoặc gửi thông tin** từ/đến **một** bên ngoài xác định | "Nhận đơn hàng", "Gửi email xác nhận" | **Điểm-đến-một-người** (1-1) |
| 3 | **Hẹn giờ** (timer) | Kích hoạt theo **thời điểm** hoặc **sau một khoảng** | "Sau 3 ngày làm việc chưa duyệt" | Dùng **đồng hồ**; cần **lịch làm việc** để tính đúng |
| 4 | **Lỗi** (error) | Sự cố **nghiệp vụ hoặc kỹ thuật** | "Không đủ tồn kho" | ★ **LUÔN là interrupting** — không có biến thể không ngắt |
| 5 | **Tín hiệu** (signal) | **Phát quảng bá cho NHIỀU người nhận cùng lúc** | "Công bố kết quả xét tuyển" | **1-nhiều** — khác message ở đúng điểm này |
| 6 | **Điều kiện** (conditional) | Kích hoạt khi **một điều kiện DỮ LIỆU trở thành đúng** | "Số dư dưới ngưỡng" | Không phải "chờ người", mà "chờ dữ liệu" |

> **Thông điệp và hẹn giờ chiếm phần lớn nhu cầu thực tế** — nắm chắc hai loại này là đủ cho Bài tập 2.2 và 2.4.

#### Nhóm chuyên biệt (5 loại)

| # | Loại | Ý nghĩa | Ví dụ | Ràng buộc |
|---|---|---|---|---|
| 7 | **Leo thang** (escalation) | Chuyển vấn đề **lên cấp cao hơn**; **CÓ THỂ không ngắt** hoạt động đang chạy | "Quá hạn — báo trưởng phòng" | **Không** nhất thiết dừng việc đang làm |
| 8 | **Bù trừ** (compensation) | **Hoàn tác** một việc **đã hoàn tất** | "Hủy đặt phòng đã giữ" | Chạy theo **thứ tự NGƯỢC** |
| 9 | **Hủy** (cancel) | Hủy một giao dịch | "Hủy giao dịch thanh toán" | ★ **CHỈ dùng với sub-process GIAO DỊCH** |
| 10 | **Chấm dứt** (terminate) | Kết thúc **TOÀN BỘ thể hiện**, **xóa mọi token** kể cả nhánh song song | "Hồ sơ bị rút" | Chỉ dùng ở **end event**; công cụ **mạnh và nguy hiểm** |
| 11 | **Liên kết** (link) | Nối **hai phần của sơ đồ**, tránh vẽ đường quá dài | Chuyển trang trong sơ đồ lớn | Luôn đi **thành cặp** (ném → bắt); **chỉ trung gian** |

#### Bảng phân biệt 5 sự kiện dễ nhầm nhất (bảng "ăn điểm" của chương)

| | **Error** (lỗi) | **Escalation** (leo thang) | **Terminate** (chấm dứt) | **Cancel** (hủy) | **Compensation** (bù trừ) |
|---|---|---|---|---|---|
| **Vị trí dùng** | Biên, end, (event sub-process) | Biên, end, trung gian | **Chỉ END** | **Biên trong transaction**, end trong transaction | Biên trên task đã hoàn tất, trung gian |
| **Phạm vi ảnh hưởng** | **Đúng hoạt động gắn biên** (hoặc nhánh) | Hoạt động gắn biên **hoặc** không | **TOÀN BỘ thể hiện** | **Toàn bộ transaction** | **Một hoạt động cụ thể** |
| **Có thể KHÔNG ngắt?** | ❌ **Không bao giờ** | ✅ **Có** | — (luôn kết thúc) | ❌ | ❌ |
| **Điều kiện áp dụng** | Đã lỗi thì **không thể hoàn tất** | Cần **báo cấp trên** mà **vẫn làm tiếp** | Cần **dừng khẩn**, kể cả việc dở dang | Chỉ trong **giao dịch** | Việc đã xong phải **đảo ngược** |
| **Ví dụ chuẩn** | "Hết hàng" | "Quá hạn 3 ngày — báo trưởng phòng" | "Hồ sơ bị rút" | "Hủy giao dịch thanh toán" | "Hủy đặt phòng" |

> ★ **Ba loại Bù trừ – Hủy – Chấm dứt gắn với nhau**: chúng thường xuất hiện **cùng nhau** trong **sub-process giao dịch**. Học riêng lẻ sẽ khó nhớ — hãy học chúng như **một cụm cơ chế hoàn tác**.

#### Bảng: loại sự kiện nào dùng được ở vị trí nào (dùng để loại phương án sai)

| Loại | Start | Trung gian bắt | Trung gian ném | Biên | End |
|---|---|---|---|---|---|
| None | ✅ | ❌ | ❌ | ❌ | ✅ |
| Message | ✅ | ✅ | ✅ | ✅ | ✅ |
| Timer | ✅ | ✅ | ❌ | ✅ | ❌ |
| Error | ❌ | ❌ | ❌ | ✅ | ✅ |
| Signal | ✅ | ✅ | ✅ | ✅ | ✅ |
| Conditional | ✅ | ✅ | ❌ | ✅ | ❌ |
| Escalation | ❌ | ❌ | ✅ | ✅ | ✅ |
| Compensation | ❌ | ✅ | ✅ | ✅ | ❌ |
| Cancel | ❌ | ❌ | ❌ | ✅ (transaction) | ✅ (transaction) |
| Terminate | ❌ | ❌ | ❌ | ✅ | ✅ |
| Link | ❌ | ✅ | ✅ | ❌ | ❌ |

> **Cách dùng bảng này trong phòng thi**: nếu một phương án nói *"sự kiện terminate ở vị trí trung gian bắt"* → **sai ngay**, không cần đọc phần còn lại. Đây là loại nhiễu rất hay gặp.

### 2.2.11 Sự kiện biên: NGẮT và KHÔNG NGẮT (trọng tâm Phần II)

> **Sự kiện biên** gắn vào **viền một hoạt động** và mô tả **điều có thể xảy ra TRONG KHI hoạt động đó đang diễn ra**.

| | **NGẮT** (interrupting) | **KHÔNG NGẮT** (non-interrupting) |
|---|---|---|
| **Nét vẽ** | Viền đôi **NÉT LIỀN** | Viền đôi **NÉT ĐỨT** |
| **Hoạt động đang chạy** | **BỊ DỪNG** | **VẪN TIẾP TỤC** |
| **Token** | Token **rời khỏi** hoạt động, **chuyển sang nhánh ngoại lệ** | Sinh **THÊM MỘT token** đi theo **nhánh phụ**, token chính **ở nguyên** |
| **Ví dụ** | Đang thẩm định thì **khách hàng rút yêu cầu** | Sau 3 ngày chưa duyệt xong thì **nhắc nhở**, việc duyệt **vẫn tiếp diễn** |
| **Kết quả sau đó** | Hoạt động **không hoàn tất**, kết quả của nó **bị bỏ** | Hoạt động **hoàn tất bình thường**; nhánh phụ chạy **song song** |

> ★ **Câu hỏi để chọn (thuộc lòng)**: **"Khi điều này xảy ra, công việc đang làm có phải dừng lại không?"** → **Phải dừng = NGẮT. Vẫn làm tiếp = KHÔNG NGẮT.**

**Ba cặp tình huống kinh điển (đề rất hay hỏi dạng này):**

| Tình huống | Chọn | Vì sao |
|---|---|---|
| "Nhắc sau 3 ngày nhưng **vẫn tiếp tục duyệt**" | **Timer KHÔNG ngắt** | Công việc không dừng; nhắc chỉ là hành động phụ |
| "Quá 30 ngày **thì hủy hồ sơ**, không xét nữa" | **Timer NGẮT** | Hồ sơ **không thể tiếp tục** được nữa |
| "Khách hàng **rút yêu cầu**" | **Message NGẮT** | Yêu cầu không còn → mọi việc đang làm **vô nghĩa** |

> **Lưu ý về sự kiện LỖI**: **luôn là ngắt** — **không có biến thể không ngắt**. Lý do: **đã lỗi thì hoạt động không thể hoàn tất được nữa**.
>
> ★ **Đây là câu hỏi gần như chắc chắn có trong 12 câu Phần II**: nhìn **nét liền / nét đứt** để kết luận hoạt động **dừng / tiếp tục**. Nếu đề cho timer **nét đứt** và hỏi "hoạt động thẩm định có bị dừng không?" → **KHÔNG**.

### 2.2.12 Cổng dựa trên sự kiện (event-based gateway)

> Thay vì rẽ nhánh theo **dữ liệu**, quy trình **CHỜ XEM sự kiện nào xảy ra trước**.

**Tình huống chuẩn**: *"Chờ khách hàng phản hồi; nếu quá 7 ngày thì hủy yêu cầu."*

```
                    ┌──► (bắt) Nhận phản hồi ──► Xử lý phản hồi
Gửi yêu cầu ──◇──┤
 (ngũ giác)         └──► (bắt) Quá 7 ngày   ──► Hủy yêu cầu
```

| Đặc điểm | Nội dung |
|---|---|
| **Ngữ nghĩa** | **Chỉ MỘT nhánh được đi.** Ngay khi **một** sự kiện xảy ra, các nhánh còn lại **BỊ HỦY BỎ** |
| **Khác gì cổng XOR?** ★ | XOR rẽ nhánh dựa trên **DỮ LIỆU ĐÃ CÓ** tại thời điểm đi qua cổng. Event-based rẽ nhánh dựa trên **SỰ KIỆN SẼ XẢY RA TRONG TƯƠNG LAI** — tại thời điểm đi qua cổng, **ta CHƯA BIẾT** nhánh nào sẽ được chọn |
| **Quy tắc sử dụng** | Ngay sau cổng **phải là** các **SỰ KIỆN TRUNG GIAN BẮT** hoặc **task nhận** (receive task) — **không được là hoạt động thường** |
| **Chỉ dùng để TÁCH** | **Không dùng để gộp** |
| **Nếu không có cổng này** | Tình huống "chờ hoặc hết hạn" buộc phải mô hình hóa bằng **vòng lặp kiểm tra** — **vừa sai ngữ nghĩa vừa rối** |

> ★ **Câu chốt phân biệt**: *XOR hỏi "dữ liệu nói gì?" — Event-based hỏi "cái gì sẽ xảy ra trước?"*
>
> **Bẫy thi**: phương án "cổng event-based dùng để gộp hai nhánh sau khi một trong hai sự kiện xảy ra" → **SAI**, cổng này **không dùng để gộp**.

---

## 2.3 Mô hình hóa quy trình — ngữ pháp của ngôn ngữ

### 2.3.1 Sáu loại hoạt động (task) và bản đồ tự động hóa

| # | Loại task | Ký hiệu (góc trên trái) | Ý nghĩa | Ví dụ | Ứng viên gì |
|---|---|---|---|---|---|
| 1 | **Task người dùng** (user task) | **Hình người** | Người thực hiện **có hỗ trợ của hệ thống** | Duyệt đơn trên phần mềm | ★ **Ứng viên HỖ TRỢ BẰNG AI** (Chương 3, mức A4) |
| 2 | **Task thủ công** (manual task) | **Bàn tay** | Người thực hiện **hoàn toàn NGOÀI hệ thống** | Ký giấy, đóng gói hàng | ★ **Ứng viên SỐ HÓA** (A0/A1 → A2) |
| 3 | **Task dịch vụ** (service task) | **Bánh răng** | **Hệ thống tự** thực hiện qua **dịch vụ hoặc API** | Gọi API kiểm tra CIC | **ĐÃ tự động** (A3–A4) |
| 4 | **Task kịch bản** (script task) | **Trang giấy** | **Engine chạy một đoạn mã** | Tính điểm trung bình | **ĐÃ tự động** (A3–A4) |
| 5 | **Task quy tắc nghiệp vụ** (business rule task) | **Bảng** | Gọi một **bảng quyết định (DMN)** | Xác định mức học bổng | Tự động **nhưng dễ thay đổi** |
| 6 | **Task gửi / nhận** (send / receive) | **Phong bì** | **Gửi** hoặc **chờ nhận** một thông điệp | Gửi email xác nhận | Nhận = **điểm chờ**; gửi = **đã tự động** |

> ★ **Ký hiệu nhỏ ở góc trên bên trái mỗi hình chữ nhật chính là thứ phân biệt sáu loại task.** Đề Phần II rất hay cho hình và hỏi "task này thuộc loại nào".

#### Chọn đúng loại task = đã vẽ xong bản đồ tự động hóa (nối Chương 1)

| Loại task | Hàm ý tự động hóa | Mức A tương ứng | Việc cần làm tiếp |
|---|---|---|---|
| **Manual task** | Việc đang làm **hoàn toàn ngoài hệ thống** | A0/A1 | **Số hóa**: đưa lên biểu mẫu điện tử → **A2** |
| **User task** | Người **vẫn quyết định** nhưng máy có thể **chuẩn bị thông tin, gợi ý phân loại, soạn nháp** | **A4** | Chương 3: thiết kế lớp AI hỗ trợ |
| **Service / script task** | Máy làm **trọn vẹn** | **A3–A4** | Chỉ còn **giám sát và xử lý ngoại lệ** |

> ★ **Một mô hình BPMN đã gán đúng loại task CHÍNH LÀ bảng phân loại của Bài tập 1.3.** Ở Chương 1, sinh viên phải tự phân loại từng bước vào nhóm BPA / RPA / giữ cho con người. Với mô hình có gán loại task, việc phân loại đó **trở thành hiển nhiên** — chỉ cần đọc ký hiệu ở góc mỗi hình chữ nhật.
>
> **Khi vẽ mô hình to-be**, hãy **đổi loại task** để thể hiện phương án: **manual → user → service**.

### 2.3.2 Dấu hiệu bổ sung trên hoạt động (markers)

| Marker | Ký hiệu | Ngữ nghĩa | Ví dụ |
|---|---|---|---|
| **Vòng lặp** (loop) | **Mũi tên tròn** | Hoạt động lặp lại **đến khi thỏa điều kiện** | "Nhập lại mật khẩu đến khi đúng" |
| **Đa thể hiện song song** (parallel multi-instance) | **Ba gạch DỌC** | Thực hiện **ĐỒNG THỜI** cho **từng phần tử** của một tập | "Thu thập báo giá" từ 3 nhà cung cấp **cùng lúc** — chờ đủ cả 3 rồi đi tiếp |
| **Đa thể hiện tuần tự** (sequential multi-instance) | **Ba gạch NGANG** | Thực hiện **LẦN LƯỢT** cho từng phần tử | "Thẩm định từng khoản mục trong hồ sơ" |
| **Bù trừ** (compensation) | **Mũi tên quay lui** | Hoạt động **chỉ chạy khi cần HOÀN TÁC** | "Hủy đặt phòng" |

> ★ **Khi nào KHÔNG dùng marker?** Khi **điều kiện lặp là thông tin quan trọng cần phân tích**. Marker **gọn nhưng CHE GIẤU điều kiện** → ở **mô hình phân tích**, hãy cân nhắc kỹ; ở **mô hình mô tả**, marker là lựa chọn tốt.
>
> **Phân biệt nhanh 3 gạch**: **dọc = song song, ngang = tuần tự.** Mẹo: "dọc như hàng rào — nhiều việc đứng cạnh nhau; ngang như hàng đợi — lần lượt từng người".

### 2.3.3 Bốn loại cổng — bảng "phải thuộc lòng" (bản đầy đủ)

| Cổng | Ký hiệu | Khi **TÁCH** | Khi **GỘP** | Câu hỏi chọn |
|---|---|---|---|---|
| **XOR** — loại trừ | Chữ **X** hoặc **để trống** | **Chọn ĐÚNG MỘT** nhánh theo điều kiện | **Đi tiếp NGAY** khi **MỘT** nhánh đến | *"Chỉ làm MỘT trong các việc này?"* |
| **AND** — song song | Dấu **+** | **Kích hoạt TẤT CẢ** các nhánh | **CHỜ ĐỦ** tất cả các nhánh | *"Làm TẤT CẢ, không phụ thuộc thứ tự?"* |
| **OR** — bao hàm | **Vòng tròn** (có chữ O) | Kích hoạt **MỘT HOẶC NHIỀU** nhánh theo điều kiện | **Chờ ĐÚNG các nhánh ĐÃ được kích hoạt** | *"Làm MỘT SỐ tùy trường hợp?"* → **cân nhắc thay bằng hai XOR lồng nhau** |
| **Event-based** | **Ngũ giác** trong hình tròn đôi | **Chờ SỰ KIỆN NÀO ĐẾN TRƯỚC** | **(không dùng để gộp)** | *"Chờ xem điều gì xảy ra?"* |

> **Mẹo nhớ ký hiệu**: **X** = eXclusive; **+** = cộng = làm hết; **O** = Optional/OR; **ngũ giác** = "nhiều khả năng, chờ xem".

#### Bản chất khác nhau của bốn cổng — giải thích bằng "cái gì quyết định"

| Cổng | **Cái gì quyết định nhánh đi** | Có **chờ** không? |
|---|---|---|
| XOR | **Dữ liệu đã có** (biến, thuộc tính hồ sơ) | **Không chờ** ở cổng gộp |
| AND | **Không cần quyết định** — mọi nhánh đều đi | **Chờ đủ** ở cổng gộp |
| OR | **Dữ liệu đã có**, nhưng có thể thỏa **nhiều** điều kiện | Chờ **đúng số nhánh đã bật** |
| Event-based | **Sự kiện trong tương lai** | **Chờ sự kiện**, và **hủy** nhánh thua |

### 2.3.4 Quy tắc cân bằng cổng và hai lỗi kinh điển

> ★ **Quy tắc vàng**: **Cổng TÁCH loại nào thì phải GỘP bằng cổng CÙNG LOẠI đó.**
> Đây chính là 7PMG **G4** ("mô hình hóa có cấu trúc") — hướng dẫn **phòng tránh bế tắc**.

#### Lỗi 1 — BẾ TẮC (deadlock): tách **XOR** → gộp **AND**

```
                 ┌──► [Nhánh A] ──┐
──► (X) ────────┤                 ├──► (+) ──► [Bước tiếp]
                 └──► [Nhánh B] ──┘
```

**Trace token**:
1. 1 token vào cổng **XOR tách** → XOR chọn **đúng một** nhánh → **chỉ Nhánh A** có token.
2. Cổng **AND gộp** yêu cầu **đủ token từ MỌI nhánh** (A **và** B).
3. Nhánh B **không bao giờ** có token → cổng AND **chờ mãi**.
4. **Kết quả: quy trình TREO VĨNH VIỄN.** Mọi bước phía sau **không bao giờ chạy**. Hồ sơ nằm im, **không có thông báo lỗi** vì chương trình vẫn "đang chờ" hợp lệ.

> **Hậu quả nghiệp vụ**: hồ sơ "biến mất" khỏi hệ thống. Đây là loại lỗi **nguy hiểm nhất** vì **im lặng**.

#### Lỗi 2 — ĐỒNG BỘ THIẾU (lack of synchronization): tách **AND** → gộp **XOR**

```
                 ┌──► [Nhánh A] ──┐
──► (+) ────────┤                 ├──► (X) ──► [Bước tiếp] ──► [Gửi email]
                 └──► [Nhánh B] ──┘
```

**Trace token**:
1. 1 token vào cổng **AND tách** → AND **nhân bản** thành **2 token** (A và B).
2. Cổng **XOR gộp** **chuyển tiếp NGAY** khi có token đến — **không chờ**.
3. Token A đến → đi tiếp. Token B đến → **đi tiếp lần nữa**.
4. **Phần phía sau chạy HAI LẦN**: **gửi hai email**, tạo **hai bút toán**, **trừ tiền hai lần**, in **hai hóa đơn**.

> **Hậu quả nghiệp vụ**: sai lệch dữ liệu **âm thầm** — không có exception nào bật lên, chỉ có **khách hàng nhận 2 email** hoặc **sổ sách lệch**.

#### Bảng so sánh hai lỗi (câu hỏi so sánh rất dễ ra)

| | **Bế tắc** (deadlock) | **Đồng bộ thiếu** (lack of synchronization) |
|---|---|---|
| **Cấu trúc gây lỗi** | Tách **XOR**, gộp **AND** | Tách **AND**, gộp **XOR** |
| **Trạng thái token** | **Thiếu** token ở cổng gộp | **Thừa** token ở cổng gộp |
| **Biểu hiện** | Quy trình **treo**, không tiến được | Quy trình **chạy 2 lần**, sinh **tác dụng phụ kép** |
| **Có thông báo lỗi?** | **Không** (im lặng) | **Không** (im lặng) |
| **Hậu quả điển hình** | Hồ sơ **kẹt vĩnh viễn** | **2 email, 2 bút toán, 2 lần trừ tiền** |
| **Cách sửa** | Đổi cổng gộp thành **XOR**, hoặc đổi cổng tách thành **AND** | Đổi cổng gộp thành **AND**, hoặc đổi cổng tách thành **XOR** |
| **Phát hiện bằng** | **Trace token** | **Trace token** |

> ★ **Cả hai lỗi KHÔNG cần công cụ, KHÔNG cần chạy thử** — chỉ cần **đi theo token**. Đây chính là kỹ năng Bài 2.1 yêu cầu: *chỉ ra lỗi và giải thích hậu quả **BẰNG NGỮ NGHĨA TOKEN***.
>
> **Câu chốt**: *Bế tắc là lỗi của **thiếu**; đồng bộ thiếu là lỗi của **thừa**. Cùng một nguyên nhân: **tách và gộp KHÔNG cùng loại**.*

#### Ba biến thể lỗi khác cần nhận ra (nâng cao — hay gặp ở câu khó)

| Biến thể | Cấu trúc | Hậu quả |
|---|---|---|
| **OR tách → AND gộp** | OR có thể chỉ bật 1 nhánh, AND chờ tất cả | **Bế tắc có điều kiện** (chỉ treo khi không bật đủ nhánh) — khó phát hiện hơn |
| **OR tách → XOR gộp** | Nhiều token ra ở cổng OR, XOR không chờ | **Đồng bộ thiếu có điều kiện** |
| **AND tách → quên gộp, hai nhánh cùng chảy vào một task** | Task nhận **2 token** | Task **chạy 2 lần** — cùng bản chất đồng bộ thiếu |

> **Quy tắc thực hành**: khi đọc sơ đồ, **luôn vẽ một đường thẳng đứng tưởng tượng** qua mỗi cặp tách–gộp và **so ký hiệu**. Nếu khác nhau → **gần như chắc chắn có lỗi**.

### 2.3.5 Ba cách biểu diễn vòng lặp — và phân biệt REWORK với MULTI-INSTANCE

| # | Cách biểu diễn | Hình thức | Ưu / Nhược | Dùng ở mức nào |
|---|---|---|---|---|
| **1** | **Vòng lặp tường minh** | Một **luồng tuần tự quay ngược** về cổng XOR phía trước | ✅ **Nhìn thấy rõ điều kiện và điểm quay lại**; đo được **tỷ lệ làm lại** | **Mô hình PHÂN TÍCH** |
| **2** | **Dấu vòng lặp trên hoạt động** (loop marker) | **Mũi tên tròn** trên hình chữ nhật | ✅ Gọn; ❌ **che giấu điều kiện lặp và điểm quay lại** | **Mô hình MÔ TẢ** |
| **3** | **Đa thể hiện** (multi-instance) | **Ba gạch dọc/ngang** | ✅ Gọn cho "làm cho **từng phần tử của danh sách**" | Cả hai, khi bản chất là duyệt danh sách |

#### ★ Phân biệt quyết định: VÒNG LẶP LÀM LẠI vs ĐA THỂ HIỆN

| | **Vòng lặp làm lại** (rework) | **Đa thể hiện** (multi-instance) |
|---|---|---|
| **Bản chất** | **Làm lại vì CHƯA ĐẠT** | **Làm cho TỪNG PHẦN TỬ của một danh sách** |
| **Ví dụ** | "Hồ sơ chưa đạt → rà soát lại" | "Thẩm định từng khoản mục trong hồ sơ" |
| **Ý nghĩa quản trị** | ★ **Dấu hiệu của VẤN ĐỀ CHẤT LƯỢNG** — là **mục tiêu cải tiến** | **Bản chất của công việc** — **không phải lãng phí** |
| **Tỷ lệ cao nghĩa là** | Quy trình **có vấn đề** (đầu vào xấu, tiêu chí mơ hồ) | **Bình thường** (danh sách dài) |
| **Hành động đúng** | **Giảm `p`** (sửa điều kiện đầu vào, chuẩn hóa tiêu chí) | **Không cắt bỏ**; nếu quá lâu thì **song song hóa** (đổi sang MI song song) |

> ★ **Nhầm lẫn hai loại này dẫn đến kết luận SAI khi phân tích**: hoặc **bỏ sót một vấn đề chất lượng thật**, hoặc **đề xuất cắt bỏ một công việc cần thiết**. Đây là câu hỏi tình huống rất hay ra.
>
> **Ở Bài 2.3**, tỷ lệ đi qua nhánh quay lui **chính là tỷ lệ làm lại** — *thường là con số gây bất ngờ nhất cho chính người vận hành quy trình* (xem công thức tính ở 2.2.8).

### 2.3.6 Đối tượng dữ liệu: data object, data store, data collection

| Phần tử | Định nghĩa | Quy tắc dùng | Ví dụ |
|---|---|---|---|
| **Đối tượng dữ liệu** (data object) | Tài liệu, hồ sơ được **tạo ra hoặc sử dụng trong vòng đời của MỘT thể hiện** | ★ **Luôn ghi kèm TRẠNG THÁI trong ngoặc vuông** | "Đơn hàng **[đã xác nhận]**", "Hồ sơ **[chờ bổ sung]**" |
| **Kho dữ liệu** (data store) | Nơi lưu trữ **tồn tại NGOÀI vòng đời quy trình**; **nhiều quy trình cùng đọc và ghi** | Vẽ như một "ống" (cylinder) | CSDL sinh viên, ERP, kho hồ sơ giấy |
| **Tập dữ liệu** (data collection) | **Tập nhiều phần tử** — **ba gạch dọc** | Thường đi kèm **hoạt động đa thể hiện** | Danh sách 50 hồ sơ cần thẩm định |

#### Vì sao phải ghi TRẠNG THÁI cho data object

> Ghi trạng thái giúp mô hình thể hiện được **sự BIẾN ĐỔI của đối tượng qua các bước** — nếu không, data object **chỉ là hình trang trí**.
>
> Ví dụ chuỗi biến đổi: `Hồ sơ [đã tiếp nhận]` → (thẩm định) → `Hồ sơ [đã thẩm định]` → (ra quyết định) → `Hồ sơ [đã có quyết định]`.
> **Đầu ra của bước trước là đầu vào của bước sau** — data object chính là **sợi chỉ vật chất** nối các bước lại.

#### Chiều của association — chi tiết dễ mất điểm

> Dữ liệu nối vào hoạt động bằng **association CÓ HƯỚNG**:
> **mũi tên VÀO hoạt động = đầu vào**; **mũi tên RA KHỎI hoạt động = đầu ra**.
> Vẽ association **không đầu mũi tên** → mất thông tin "dữ liệu này được tạo ra hay chỉ được đọc".

#### Data store — ràng buộc NGẦM giữa các quy trình

> Khi **hai quy trình độc lập** cùng đọc/ghi **một data store**, chúng **phụ thuộc lẫn nhau** dù trên sơ đồ **không có luồng nào nối chúng**.
> Đây là **quan hệ "chia sẻ dữ liệu"** đã nêu ở 2.1.8 — và là **nguồn của nhiều lỗi khó tìm**: quy trình A ghi dữ liệu sai → quy trình B (chạy sau, không liên quan trên giấy tờ) **ra kết quả sai**.

### 2.3.7 Pool, lane, luồng thông điệp và pool hộp đen

#### Ba khái niệm làn bơi

| Phần tử | Định nghĩa | Đặc điểm | Ví dụ |
|---|---|---|---|
| **Pool** | Một **thực thể tham gia ĐỘC LẬP**: một tổ chức, một hệ thống | ★ **Mỗi pool chứa TỐI ĐA MỘT quy trình** | "Trường đại học", "Ngân hàng" |
| **Lane** | **Phân chia BÊN TRONG pool** theo **vai trò, phòng ban hoặc hệ thống** | ★ **Lane KHÔNG phải thực thể độc lập** | Phòng Đào tạo, Cố vấn học tập, Hội đồng khoa |
| **Black-box pool** (pool hộp đen) | **Pool để TRỐNG**, **không mô tả quy trình nội bộ** | Dùng khi **không biết hoặc không quan tâm** quy trình nội bộ của đối tác | "Sinh viên", "Ngân hàng", "Nhà cung cấp vận chuyển" |

> ★ **Mỗi lần luồng đi qua ranh giới lane là MỘT LẦN BÀN GIAO** — và **bàn giao là nơi tiềm ẩn thời gian chờ**. *Đây là lý do lane không chỉ để trang trí*: nó là **đơn vị đo** của phép phân tích số 1 ở 2.2.8.

#### Quy tắc chọn POOL hay LANE — câu hỏi kiểm tra duy nhất

> **"Ta có KIỂM SOÁT ĐƯỢC THỨ TỰ công việc của họ không?"**
> **Có → LANE** (cùng pool, điều phối nội bộ bằng sequence flow)
> **Không → POOL RIÊNG** (giao tiếp bằng message flow)

*Vì sao quy tắc này đúng về bản chất?* Vì trong nội bộ, **ta ra lệnh và kiểm soát được thứ tự**. Với bên ngoài, **ta chỉ gửi đi rồi chờ** — đối tác làm gì, làm khi nào, **ta không quyết định được**.

#### Sequence flow vs Message flow — bảng phân biệt then chốt (đề gần như chắc chắn hỏi)

| Tiêu chí | **Luồng tuần tự** (sequence flow) | **Luồng thông điệp** (message flow) |
|---|---|---|
| **Nét vẽ** | **LIỀN**, đầu mũi tên **ĐẶC** | **ĐỨT**, đầu mũi tên **RỖNG** |
| **Phạm vi** | **Trong cùng MỘT pool** | **GIỮA hai pool KHÁC NHAU** |
| **Ý nghĩa** | **"Sau đó làm gì"** — **điều phối thứ tự** | **"Gửi gì cho ai"** — **trao đổi thông tin** |
| **Mang token** | ★ **CÓ** | ★ **KHÔNG** |
| **Ai kiểm soát thứ tự** | **Ta** | **Không ai** (bên nhận tự quyết) |

> ★ **Message flow KHÔNG mang token chính là cách BPMN diễn đạt sự thật: ta không điều khiển được bên ngoài.** Đây là câu trả lời chuẩn cho câu hỏi "vì sao message flow không mang token".

**Ba hệ quả trực tiếp của việc message flow không mang token** (hay hỏi ở dạng "hậu quả là gì"):

1. **Không thể dùng message flow để "chờ" bên kia hoàn tất** — muốn chờ thì phải có **sự kiện trung gian bắt thông điệp** (event-based, 2.2.12).
2. **Không thể tính thời gian chu trình của đối tác** từ mô hình của ta — ta chỉ biết **đã gửi**, không biết **họ làm mất bao lâu**.
3. **Không thể biểu diễn "hủy" công việc của đối tác** bằng cách rút token — muốn hủy phải **gửi một thông điệp hủy** và họ **tự xử lý**.

#### Câu hỏi bẫy kinh điển: "message flow có được nối hai task trong cùng một pool không?"

> **KHÔNG.** Lý do **không phải** hình thức mà là **ngữ nghĩa**:
> - Trong cùng pool, **thứ tự do TA kiểm soát** → phải dùng **sequence flow** (quy tắc cú pháp 2).
> - Message flow diễn tả **cộng tác giữa hai thực thể độc lập**, nơi **không ai điều khiển được thứ tự của bên kia**.
> - Nếu vẽ message flow trong cùng pool, mô hình **mất khả năng diễn đạt "cái gì chạy trước"** → mô hình **không còn ngữ nghĩa thực thi**.

#### Khi nào dùng black-box pool

> Khi mô tả **đối tác bên ngoài** mà **quy trình nội bộ của họ KHÔNG thuộc phạm vi mô hình**. Đây là lựa chọn **ĐÚNG trong đa số trường hợp** và giúp mô hình **gọn hơn rất nhiều**.
>
> **Sai lầm hay gặp**: cố vẽ chi tiết quy trình của ngân hàng/đối tác → mô hình phình to, **và thông tin đó thường sai** vì ta **không thực sự biết** họ làm gì bên trong.

### 2.3.8 Phân rã bằng sub-process

#### Vì sao phải phân rã — hai lý do khác nhau

| Lý do | Nội dung |
|---|---|
| **Kỹ thuật** | Một mô hình **vượt quá khoảng 30 phần tử** trở nên **khó đọc, khó bảo trì và dễ sai** (7PMG G7) |
| **Tổ chức** | Phân rã cho phép trình bày quy trình theo **nhiều mức trừu tượng**: **cấp trên cho lãnh đạo** nhìn tổng thể, **cấp dưới cho người thực hiện** làm việc hằng ngày |

#### Hai dạng hiển thị

| Dạng | Hình thức | Dùng ở đâu |
|---|---|---|
| **Thu gọn** (collapsed) | Hiển thị như **một hoạt động có dấu +** ở cạnh dưới | **Mô hình cấp trên** |
| **Mở rộng** (expanded) | Hiển thị **toàn bộ nội dung bên trong khung** | Khi cần trình bày **chi tiết ngay trên cùng sơ đồ** |

#### Ví dụ phân rã hai cấp (mô hình trong bài giảng)

```
CẤP 1:  (bắt đầu) → [Tiếp nhận hồ sơ] → [Thẩm định hồ sơ] → [Ra quyết định] → (kết thúc)

CẤP 2 (bên trong "Thẩm định hồ sơ"):
        (bắt đầu) → [Kiểm tra tính đầy đủ] → <Đủ?> ──Không──► [Yêu cầu bổ sung] ──┐
                                              │                                      │
                                             Có ◄────────────────────────────────────┘
                                              ↓
                                    [Thẩm định nội dung] → (kết thúc)
```

> ★ **Ba ràng buộc của sub-process nhúng** (rất dễ hỏi):
> 1. Phải có **MỘT sự kiện bắt đầu KHÔNG XÁC ĐỊNH** (none start event).
> 2. Phải có **ít nhất một sự kiện kết thúc**.
> 3. **Dùng CHUNG dữ liệu với quy trình cha** và **KHÔNG THỂ được gọi từ quy trình khác**.

#### Bốn nguyên tắc phân cấp tốt

| # | Nguyên tắc | Nội dung | Dấu hiệu vi phạm |
|---|---|---|---|
| **1** | **Phân rã theo MỤC TIÊU, không theo số lượng** | Mỗi sub-process phải trả lời được: **"cụm bước này nhằm đạt điều gì?"** | Phân rã chỉ để **đủ số phần tử dưới 30** → tạo ra những sub-process **vô nghĩa mà không ai đặt tên nổi** |
| **2** | **Giữ mức chi tiết ĐỒNG ĐỀU trong cùng sơ đồ** | Không để "Ký duyệt" nằm cạnh "Vận hành toàn bộ khâu tuyển sinh" | **Mức chi tiết lệch nhau** là dấu hiệu rõ nhất của mô hình **chưa được rà soát** |
| **3** | **Không quá BA đến BỐN CẤP** | Với quy trình hành chính thông thường | Quá 4 cấp → người đọc **mất phương hướng**, **không ai buồn mở tiếp xuống dưới** |
| **4** | **Đặt tên sub-process theo CÙNG quy ước** | Vẫn là **động từ + danh từ** như hoạt động thường | Sub-process là **một hoạt động**, chỉ khác ở chỗ **có nội dung bên trong** |

> **Kiểm tra nhanh chất lượng phân rã**: đưa **mô hình cấp 1** cho một người **chưa biết quy trình**. Nếu họ đọc xong mà **kể lại được câu chuyện tổng thể** → phân rã đã đạt.

### 2.3.9 Tái sử dụng bằng call activity — và kho quy trình

> **Call activity** (hoạt động gọi) tham chiếu đến một quy trình được **định nghĩa ĐỘC LẬP**, có thể được **gọi từ NHIỀU quy trình khác nhau**. **Ký hiệu**: **khung viền ĐẬM**.

#### Bảng so sánh sub-process nhúng vs call activity (bảng 4 tiêu chí — đề hay hỏi đúng dạng này)

| Tiêu chí | **Sub-process NHÚNG** (embedded) | **Call activity** |
|---|---|---|
| **Nơi định nghĩa** | **BÊN TRONG quy trình cha** | **ĐỘC LẬP**, đặt trong **thư viện quy trình** |
| **Tái sử dụng** | ❌ **Không** | ✅ **Có** — từ **nhiều quy trình khác nhau** |
| **Dữ liệu** | **Dùng CHUNG** với quy trình cha | **Truyền qua THAM SỐ vào / ra** |
| **Khi nào dùng** | **Chỉ để GOM NHÓM cho dễ đọc** | Khi **cùng một việc lặp lại ở NHIỀU quy trình** |
| **Ký hiệu** | Khung thường (có dấu **+** khi thu gọn) | Khung **viền ĐẬM** |

#### Ví dụ 2.2 — vì sao call activity tiết kiệm chi phí bảo trì

> Quy trình **"Phê duyệt chi tiêu"** xuất hiện trong **cả ba** quy trình: **mua sắm**, **công tác phí**, **tổ chức hội thảo**.
> Thay vì **vẽ lại ba lần**, ta định nghĩa **MỘT** quy trình dùng chung và **gọi bằng call activity** với các tham số: **số tiền, nguồn kinh phí, người đề nghị**.
> **Khi quy chế chi tiêu nội bộ thay đổi, chỉ cần sửa MỘT nơi** thay vì tìm và sửa ở ba mô hình.

> ★ **Đây là lập luận "một nguồn sự thật"** — cùng bản chất với lý do BPMN tồn tại (2.2.1), nhưng ở **cấp độ mô hình**. Câu hỏi tình huống hay ra: *"Ba quy trình đều có bước phê duyệt giống nhau, quy chế vừa thay đổi, làm sao tránh sửa ba nơi?"* → **call activity**.

#### Kho quy trình (process repository) và quản trị tài sản mô hình

Tổ chức **trưởng thành về BPM** thường xây dựng **kho quy trình** với **bốn thành phần**:

| # | Thành phần | Nội dung |
|---|---|---|
| 1 | **Quy ước ký pháp thống nhất** | Mọi người vẽ cùng một cách → mô hình **đọc được xuyên phòng ban** |
| 2 | **Danh mục quy trình dùng chung** | Nơi chứa các quy trình để **call activity** tham chiếu |
| 3 | **Quản lý phiên bản** | Biết **phiên bản nào đang chạy**, quay lại được phiên bản trước |
| 4 | **Phân quyền chỉnh sửa** | Ai được sửa quy trình dùng chung — **tránh mỗi người sửa một kiểu** |

**Mô hình chuẩn ngành có thể tham chiếu** (câu hỏi "kể tên khung chuẩn"):

| Khung | Lĩnh vực |
|---|---|
| **APQC Process Classification Framework** | **Đa ngành** — khung phân loại quy trình phổ quát |
| **SCOR** | **Chuỗi cung ứng** (Supply Chain Operations Reference) |
| **ITIL** | **Dịch vụ CNTT** |
| **eTOM** | **Viễn thông** |

#### Biến thể quy trình — khi cùng một quy trình có nhiều phiên bản

Ví dụ: khác nhau theo **khu vực**, **loại khách hàng**, hoặc **hệ đào tạo** (chính quy / liên thông). **Ba cách xử lý:**

| # | Cách | Ưu điểm | Nhược điểm | Khi nào nên |
|---|---|---|---|---|
| **1** | **Một mô hình, nhiều nhánh điều kiện** | Đơn giản khi mới bắt đầu; **một nơi duy nhất** | **Nhanh chóng rối** khi số biến thể tăng | **Ít biến thể** (2–3), khác biệt nhỏ |
| **2** | **Nhiều mô hình riêng biệt** | **Dễ đọc từng mô hình** | **Khó đồng bộ** khi phần chung thay đổi — sửa một nơi **phải nhớ sửa mọi nơi** | Biến thể **rất khác nhau** |
| **3** | **Mô hình CẤU HÌNH ĐƯỢC** (configurable model) | Một **khung chung** với các **điểm biến thiên được đánh dấu** — **cân bằng nhất** khi số biến thể lớn | Cần công cụ và kỷ luật | **Nhiều biến thể**, phần chung lớn |

> **Không có câu trả lời đúng cho mọi tổ chức**: chọn cách nào phụ thuộc **số biến thể** và **tần suất thay đổi phần chung**.

### 2.3.10 Ngoại lệ — phân loại 5 loại và ánh xạ cơ chế

| # | Loại ngoại lệ | Bản chất | **Cơ chế BPMN phù hợp** |
|---|---|---|---|
| 1 | **Ngoại lệ nghiệp vụ** | Kết quả **không mong muốn nhưng ĐÃ LƯỜNG TRƯỚC** | **Cổng XOR** hoặc **sự kiện lỗi biên** |
| 2 | **Lỗi kỹ thuật** | Hệ thống **không phản hồi**, dịch vụ lỗi | **Sự kiện lỗi biên** + **cơ chế thử lại** |
| 3 | **Hết hạn** | Bên liên quan **không phản hồi đúng hạn** | **Sự kiện hẹn giờ biên** — **ngắt hoặc không ngắt** |
| 4 | **Hủy bỏ từ bên ngoài** | Khách hàng **rút yêu cầu** | **Sự kiện thông điệp biên (NGẮT)** |
| 5 | **Cần hoàn tác** | Việc **đã làm xong** phải được **đảo ngược** | **Sub-process giao dịch + bù trừ** |

#### Câu hỏi phân biệt ngoại lệ nghiệp vụ vs lỗi kỹ thuật

> **"Điều này có Ý NGHĨA với người làm nghiệp vụ không?"**
> - **"Hồ sơ thiếu giấy tờ"** = **ngoại lệ NGHIỆP VỤ** → **trưởng phòng cần biết**.
> - **"API trả về mã 503"** = **lỗi KỸ THUẬT** → **chỉ đội vận hành cần biết**.

> ★ **Vì sao phân loại lại quan trọng?** Vì nó **quyết định ngoại lệ đó có được vẽ vào mô hình PHÂN TÍCH hay không**. Đưa **mọi lỗi kỹ thuật** vào mô hình phân tích sẽ làm mô hình **rối gấp ba lần** mà **không thêm giá trị nghiệp vụ nào**.
>
> Lỗi kỹ thuật **thuộc về mô hình THỰC THI**, nơi kỹ sư cấu hình **cơ chế thử lại và cảnh báo**.

### 2.3.11 Bốn cơ chế xử lý ngoại lệ (bảng "phải thuộc")

#### ① Sự kiện LỖI BIÊN (boundary error event)

> Hoạt động **ném lỗi**; **token rời khỏi hoạt động** và **đi theo nhánh xử lý lỗi**.

| | Nội dung |
|---|---|
| **Vai trò** | **Cơ chế MẶC ĐỊNH** cho ngoại lệ có thể xử lý **CỤC BỘ ngay tại chỗ** |
| **Ưu điểm** | **Gọn, rõ ràng**, chỉ ảnh hưởng **đúng hoạt động bị lỗi** |
| **Hạn chế** | ★ Phải **gắn riêng vào TỪNG hoạt động** có thể lỗi |
| **Khi dùng** | Ngoại lệ **chỉ xảy ra ở một bước xác định** — "Kiểm tra tồn kho" → "Hết hàng" → "Đề xuất sản phẩm thay thế" |

#### ② Sub-process sự kiện (event sub-process)

> Khối vẽ bằng **NÉT ĐỨT** đặt **bên trong quy trình**, **tự kích hoạt** khi sự kiện tương ứng xảy ra ở **BẤT KỲ ĐÂU trong phạm vi quy trình cha**.

| | Nội dung |
|---|---|
| **Vai trò** | Dùng cho ngoại lệ có thể xảy ra ở **MỌI BƯỚC** — *"khách hàng yêu cầu hủy"*, *"phát hiện hồ sơ giả mạo"* |
| **Ưu điểm** | ★ **KHÔNG phải gắn sự kiện biên vào từng hoạt động** |
| **Hạn chế** | Có thể **khó đọc** với người mới; phạm vi ảnh hưởng **rộng** nên cần cẩn thận về ngữ nghĩa |

```
┌─ Quy trình xử lý hồ sơ ────────────────────────────────┐
│  [Tiếp nhận] → [Thẩm định] → [Ra quyết định]            │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐            │
│  │ (bắt) Nhận yêu cầu hủy → [Dừng và hoàn hồ sơ] │      │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘            │
│  Event sub-process: kích hoạt bất kể đang ở bước nào    │
└──────────────────────────────────────────────────────────┘
```

#### ③ Giao dịch và bù trừ (transaction & compensation)

> Khi một cụm bước phải có tính **"hoặc TẤT CẢ hoặc KHÔNG GÌ CẢ"**, ta dùng **SUB-PROCESS GIAO DỊCH — vẽ bằng VIỀN ĐÔI**.
> Nếu giao dịch **bị hủy**, các hoạt động **đã hoàn tất** bên trong sẽ được **BÙ TRỪ**: mỗi hoạt động có một **compensation handler** mô tả **cách hoàn tác**.

**Ví dụ 2.3 — Đăng ký tham dự hội thảo:**

```
┌─ TRANSACTION (viền đôi) ────────────────────────┐
│  [Giữ chỗ] → [Đặt phòng khách sạn] → [Thu phí]  │
│                                         ✗ thất bại
└──────────────────────────────────────────────────┘
                    ↓ sự kiện HỦY kích hoạt
   Bù trừ theo thứ tự NGƯỢC:
   ① [Hủy đặt phòng]      (hoàn tác "Đặt phòng khách sạn")
   ② [Trả chỗ về danh sách trống]  (hoàn tác "Giữ chỗ")
```

> ★ **Thứ tự bù trừ NGƯỢC với thứ tự thực hiện**: **hủy đặt phòng TRƯỚC, trả chỗ SAU**.
> **Vì sao phải ngược?** Vì các bước có thể **phụ thuộc nhau**: chỉ khi đã hủy phòng thì chỗ mới thực sự trống để trả về danh sách. Hoàn tác **cùng chiều** sẽ tạo **trạng thái không nhất quán**.
>
> Đây là điểm **rất dễ ra đề** dưới dạng: *"Thứ tự bù trừ là cùng chiều hay ngược chiều với thứ tự thực hiện?"* → **NGƯỢC CHIỀU**.

#### ④ Leo thang và chấm dứt (escalation & terminate)

| | **Escalation — leo thang** | **Terminate — chấm dứt** |
|---|---|---|
| **Nội dung** | Chuyển vấn đề **LÊN CẤP CAO HƠN** mà **không nhất thiết dừng** việc đang làm | **DỪNG TOÀN BỘ thể hiện NGAY LẬP TỨC**, kể cả **nhánh song song đang chạy** |
| **Ví dụ** | Quá hạn 3 ngày thì **báo trưởng phòng**, chuyên viên **vẫn xử lý tiếp** | Hồ sơ **bị rút** thì **mọi việc liên quan đều dừng ngay** |
| **Token** | Không xóa token; có thể **sinh token phụ** | ★ **XÓA MỌI TOKEN** |
| **Tính chất** | Nhẹ, có thể **không ngắt** | ★ **Công cụ MẠNH và NGUY HIỂM** |

> ★ **Terminate xóa mọi token, kể cả những token đang ở GIỮA MỘT CÔNG VIỆC DỞ DANG.** Hệ quả: công việc dở có thể **đã ghi một phần dữ liệu** mà **không có cơ chế hoàn tác** → **dữ liệu không nhất quán**. Đây là lý do phải dùng **cẩn thận**, và khi có **tác dụng phụ đã xảy ra** thì cần **compensation** chứ không chỉ terminate.

### 2.3.12 Bốn nguyên tắc thiết kế ngoại lệ

| # | Nguyên tắc | Nội dung | Vì sao |
|---|---|---|---|
| **1** | ★ **Vẽ ĐƯỜNG ĐI HẠNH PHÚC TRƯỚC** | Hoàn thiện **kịch bản chính** rồi mới **bổ sung ngoại lệ** | Nếu làm ngược lại, mô hình **rối ngay từ đầu** và **không ai còn nhìn ra câu chuyện chính** |
| **2** | **Chỉ mô hình hóa ngoại lệ CÓ Ý NGHĨA NGHIỆP VỤ** | Không đưa mọi **lỗi kỹ thuật** vào mô hình phân tích | Lỗi kỹ thuật **thuộc mô hình thực thi** (thử lại, cảnh báo) |
| **3** | **Mỗi ngoại lệ phải có KẾT CỤC RÕ RÀNG** | Hoặc **quay lại luồng chính**, hoặc **kết thúc bằng một sự kiện kết thúc ĐƯỢC ĐẶT TÊN** | **Nhánh ngoại lệ cụt là LỖI THIẾT KẾ**, không phải "chi tiết bỏ ngỏ" |
| **4** | ★ **Ghi lại TẦN SUẤT ngoại lệ** | **Ngoại lệ chiếm TRÊN 20% số thể hiện thường KHÔNG PHẢI ngoại lệ** | Đó là **một nhánh CHÍNH CHƯA ĐƯỢC THỪA NHẬN**, và là **dấu hiệu quy trình cần THIẾT KẾ LẠI** |

> ★ **Nguyên tắc 4 là nguyên tắc DỄ BỊ BỎ QUA NHẤT — và cũng mang lại PHÁT HIỆN GIÁ TRỊ NHẤT khi phân tích quy trình thực tế.**
>
> **Lập luận đầy đủ cho ngưỡng 20%** (câu hỏi "vì sao 20% lại là dấu hiệu cần thiết kế lại?"):
> 1. **Về mặt thiết kế**: nếu 1/5 số hồ sơ đi vào nhánh đó, thì đó là **đường đi bình thường của 20% khách hàng** — mô hình đang **coi thường một nhóm khách hàng thật**.
> 2. **Về mặt kinh tế**: ngoại lệ **luôn đắt hơn** đường chính (xử lý thủ công, không tự động được). 20% ngoại lệ nghĩa là **20% chi phí đang ở chế độ "đắt"** — thường là **khoản tiết kiệm lớn nhất** nếu thiết kế lại.
> 3. **Về mặt tự động hóa**: RPA/BPA **chỉ hoạt động tốt khi tỷ lệ ngoại lệ thấp**. Đưa tự động hóa vào một quy trình có 30% ngoại lệ → **bot chỉ xử lý được 70%**, phần còn lại **vẫn cần người** nhưng nay **khó phát hiện hơn**.
> 4. **Về mặt đo lường**: ngoại lệ **không có KPI**. Việc "nâng cấp" nó thành nhánh chính khiến nó **được đo, được tối ưu, được giám sát**.
>
> **Kết luận**: ngưỡng 20% là **tín hiệu tổ chức đang tự lừa mình** — *"chúng tôi đã thiết kế đúng, chỉ là thực tế không tuân theo"*. Thực tế **luôn đúng**; mô hình mới là cái cần sửa.

---

## 2.4 Tóm tắt trọng tâm chương 2

### Tám điểm cần nhớ (theo đúng tóm tắt của bài giảng)

| # | Nội dung | Dạng câu hỏi |
|---|---|---|
| **1** | **Mô hình hóa là biểu diễn CÓ CHỦ ĐÍCH** — mức chi tiết (mô tả / phân tích / thực thi) phải chọn **theo MỤC ĐÍCH**, **không theo khả năng của công cụ** | "Vì sao không nên bắt đầu bằng mô hình thực thi?" |
| **2** | **Ba mặt chất lượng** (cú pháp, ngữ nghĩa, dễ hiểu) và **7PMG** | "Mô hình đúng cú pháp nhưng vô dụng — vì sao?" |
| **3** | **Sáu quan hệ** giữa các quy trình: phân rã, tái sử dụng, kích hoạt, trao đổi thông điệp, chuyên biệt hóa, chia sẻ dữ liệu | "Kể đủ 6 loại + ví dụ" |
| **4** | **Năm nhóm phần tử** và **ngữ nghĩa token** — token là công cụ **để đọc và KIỂM TRA tính đúng đắn** | "Trace token qua sơ đồ" |
| **5** | **Sự kiện: theo VỊ TRÍ và theo LOẠI**; sự kiện biên có thể **ngắt hoặc không ngắt** | "Nhắc quá hạn → biên loại nào?" |
| **6** | **Bốn loại cổng, phải CÂN BẰNG** — mất cân bằng gây **bế tắc** hoặc **đồng bộ thiếu** | "Tách AND gộp XOR → hậu quả?" |
| **7** | **Phân rã và tái sử dụng**: sub-process giữ mô hình **gọn**; call activity giữ mô hình **dễ bảo trì** | "Chọn sub-process hay call activity?" |
| **8** | **Bốn cơ chế xử lý ngoại lệ** — luôn **vẽ đường đi hạnh phúc TRƯỚC** | "Ba ngoại lệ này dùng cơ chế nào?" |

### Bảng "số liệu và ngưỡng" của chương (rất dễ ra câu hỏi con số)

| Con số | Ý nghĩa | Ngữ cảnh |
|---|---|---|
| **~10 ký hiệu** | Số ký hiệu tối thiểu cho **mô hình mô tả** | 3 mức chi tiết |
| **~30 phần tử** | **Ngưỡng phân rã** (7PMG G7) | Quá ngưỡng → khó đọc, khó bảo trì |
| **3–4 cấp** | Số cấp phân rã **tối đa** nên dùng | 4 nguyên tắc phân cấp |
| **20%** | **Ngưỡng "ngoại lệ"** — trên mức này là nhánh chính chưa thừa nhận | Nguyên tắc thiết kế ngoại lệ 4 |
| **>100 ký hiệu** | Số ký hiệu trong **đặc tả đầy đủ BPMN 2.0** | Cái giá của chuẩn |
| **90%+** | Tỷ lệ mô hình BPMN thực tế là **sơ đồ quy trình hoặc cộng tác** | 3 loại sơ đồ con |
| **2011 / 2013** | Năm BPMN 2.0 ra đời / năm thành **ISO/IEC 19510** | Câu hỏi lịch sử chuẩn |
| **5 / 11** | **5 vị trí** sự kiện / **11 loại** sự kiện | Bảng sự kiện |

### Ba câu hỏi mà cả chương là câu trả lời

> **① Mô hình này có ĐÚNG CÚ PHÁP không?** → 5 quy tắc + công cụ kiểm.
> **② Có ĐÚNG THỰC TẾ không?** → bước 6 (xác nhận với người làm thật) + tiêu chí ngữ nghĩa.
> **③ Người khác ĐỌC CÓ HIỂU không?** → 7PMG + quy ước đặt tên + phân rã + ba mức chi tiết.

---

## 2.5 Thuật ngữ chương 2 (Việt – Anh)

| Tiếng Việt | Tiếng Anh |
|---|---|
| Mô hình hóa quy trình | Process modeling |
| Mô hình mô tả / phân tích / thực thi | Descriptive / analytical / executable |
| Đường đi hạnh phúc | Happy path |
| Đối tượng luồng | Flow object |
| Luồng tuần tự / luồng thông điệp | Sequence flow / message flow |
| Làn bơi, pool, lane | Swimlane, pool, lane |
| Pool hộp đen | Black-box pool |
| Thẻ (ngữ nghĩa thẻ) | Token (token semantics) |
| Cổng loại trừ / song song / bao hàm | Exclusive / parallel / inclusive gateway |
| Cổng dựa trên sự kiện | Event-based gateway |
| Bế tắc | Deadlock |
| Đồng bộ thiếu | Lack of synchronization |
| Sự kiện biên ngắt / không ngắt | Interrupting / non-interrupting (boundary) event |
| Quy trình con nhúng | Embedded sub-process |
| Hoạt động gọi | Call activity |
| Đa thể hiện | Multi-instance |
| Đối tượng dữ liệu / kho dữ liệu | Data object / data store |
| Bù trừ · Leo thang | Compensation · Escalation |
| Biến thể quy trình | Process variant |
| Số lần bàn giao | Handoff |
| Giao dịch (quy trình con) | Transaction (sub-process) |
| Quy trình con sự kiện | Event sub-process |
| Kho quy trình | Process repository |
| Bảng quyết định | Decision table (DMN) |
| Nhiệm vụ người dùng / thủ công / dịch vụ | User / manual / service task |
| Kịch bản / quy tắc nghiệp vụ | Script / business rule task |

> **Lời khuyên tra cứu**: khi dùng **bpmn.io** hay **Camunda Modeler**, hãy tra bằng **thuật ngữ tiếng Anh** — tài liệu tiếng Việt về BPMN **còn rất ít**.

---

## 2.6 Các dạng câu hỏi có thể xuất hiện + bẫy

### Phần I — bảy dạng câu hỏi lý thuyết/tình huống

| # | Dạng | Mẫu câu | Cách chốt đáp án |
|---|---|---|---|
| **1** | **Chọn mức chi tiết** | "Mô hình dùng để họp với lãnh đạo, cần nhanh và dễ hiểu — nên ở mức nào?" | **Mô tả** (10 ký hiệu, bỏ ngoại lệ) |
| **2** | **Chẩn đoán chất lượng** | "Mô hình không có lỗi cú pháp nhưng nhân viên nói 'không phải chúng tôi làm thế'" | **Sai ngữ nghĩa** (semantic) |
| **3** | **Chọn cổng theo tình huống** | "Vừa kiểm tra học vụ vừa kiểm tra tài chính, không phụ thuộc nhau" | **AND** |
| **4** | **Tìm nguyên nhân lỗi** | "Hệ thống gửi 2 email xác nhận cho mỗi đơn" | **Tách AND – gộp XOR** |
| **5** | **Chọn cơ chế ngoại lệ** | "Khách rút yêu cầu ở bất kỳ bước nào" | **Event sub-process** (message ngắt) |
| **6** | **Phân biệt sub-process / call activity** | "Ba quy trình dùng chung bước phê duyệt, quy chế hay đổi" | **Call activity** |
| **7** | **Tính toán** | "Nhánh A 2 ngày, nhánh B 5 ngày, chạy song song — tổng bao nhiêu?" | **5 ngày** (max), không phải 7 |

### Phần II — bốn dạng câu đọc sơ đồ (12 câu)

| # | Dạng | Câu hỏi điển hình | Mẹo |
|---|---|---|---|
| **1** | **Đếm token / số lần chạy** | "Sau cổng gộp có bao nhiêu token?" / "Bước X chạy mấy lần?" | Trace token **từng bước**, đếm bằng bút |
| **2** | **Phát hiện lỗi cấu trúc** | "Mô hình này có lỗi gì?" | So **cặp tách–gộp** cùng loại hay khác loại |
| **3** | **Nhận diện ký hiệu** | "Sự kiện này loại gì, ở vị trí nào, ngắt hay không ngắt?" | Nét **liền/đứt**, viền **mảnh/đôi/đậm** |
| **4** | **Nhận diện cấu trúc đặc biệt** | "Khung này là gì?" (nét đứt / viền đậm / viền đôi) | Bảng chẩn đoán 10 giây ở 2.2.5 |

### Bảy cái bẫy phải nhớ

> **Bẫy 1**: "Tách AND – gộp XOR gây **bế tắc**." → **SAI**. Đó là **đồng bộ thiếu**. Bế tắc là **XOR tách – AND gộp**.
>
> **Bẫy 2**: "Message flow **mang token** nhưng không điều khiển được thứ tự." → **SAI**. Message flow **KHÔNG mang token**.
>
> **Bẫy 3**: "Sự kiện lỗi có thể là **không ngắt**." → **SAI**. Error **luôn ngắt**; **escalation** mới có biến thể không ngắt.
>
> **Bẫy 4**: "Cổng event-based dùng để **gộp** sau khi một sự kiện xảy ra." → **SAI**. Nó **chỉ dùng để tách**.
>
> **Bẫy 5**: "Sub-process nhúng có thể **gọi lại từ quy trình khác**." → **SAI**. Đó là **call activity**. Sub-process nhúng **không tái sử dụng được**.
>
> **Bẫy 6**: "Bù trừ chạy theo **cùng thứ tự** với thực hiện." → **SAI**. **Ngược thứ tự**.
>
> **Bẫy 7**: "Mô hình thực thi là mô hình **tốt nhất** vì đầy đủ nhất." → **SAI**. **Phù hợp mục đích** mới là tiêu chuẩn; mô hình thực thi **loại người nghiệp vụ ra khỏi cuộc trao đổi**.

### Ba bẫy "ngôn ngữ" hay gặp trong phương án nhiễu

| Cụm từ trong phương án | Vì sao thường sai |
|---|---|
| "luôn luôn", "trong mọi trường hợp", "tốt nhất" | BPMN là ngôn ngữ **theo mục đích**; hầu như không có gì "luôn đúng" |
| "thay thế hoàn toàn" (ví dụ: OR thay XOR; DMN thay BPMN) | Các khái niệm **bổ sung**, không thay thế |
| "càng chi tiết càng tốt" | Ngược với chân lý ① ở 2.1.1: **lược bỏ chi tiết là mục đích** |

---

## 2.7 Câu hỏi tự luyện (21 câu — có đáp án và giải thích)

**Câu 1.** Nhóm dự án cần trình bày quy trình xét học bổng trong **15 phút** cho Ban Giám hiệu để **xin chủ trương cải tiến**. Mô hình nên ở mức nào?
A. Mức thực thi, vì đầy đủ nhất và không phải vẽ lại
B. Mức phân tích, vì phải có đủ ngoại lệ mới thuyết phục
C. Mức mô tả, khoảng 10 ký hiệu, tập trung đường đi hạnh phúc
D. Cả ba mức trên cùng một trang để Ban Giám hiệu tự chọn

**Câu 2.** Mô hình mở bằng Camunda Modeler **không báo lỗi nào**, nhưng khi họp với phòng ban, nhân viên nói: *"Chúng tôi không làm như vậy, bước này thực tế bỏ qua"*. Mô hình đang thiếu tiêu chí nào?
A. Đúng cú pháp (syntactic quality)
B. Đúng ngữ nghĩa (semantic quality)
C. Dễ hiểu (pragmatic quality)
D. Tính đầy đủ của ký pháp

**Câu 3.** Trong bảy hướng dẫn 7PMG, hướng dẫn nào **liên quan trực tiếp nhất** đến việc phòng tránh bế tắc?
A. G1 — dùng càng ít phần tử càng tốt
B. G3 — một sự kiện bắt đầu, một kết thúc cho mỗi kết quả
C. G4 — mô hình hóa có cấu trúc: mỗi cổng tách có cổng gộp **cùng loại**
D. G6 — đặt tên hoạt động theo động từ + danh từ

**Câu 4.** Một mô hình tách bằng cổng **AND** thành hai nhánh, sau đó gộp bằng cổng **XOR**, rồi mới đến bước "Gửi email xác nhận". Trace token cho kết quả nào?
A. Quy trình bế tắc ở cổng gộp, không gửi email nào
B. Hai token cùng đi qua cổng gộp, bước "Gửi email" chạy hai lần
C. Đúng: AND tách thì XOR gộp là cặp cân bằng hợp lệ
D. Chỉ một token đi qua, email gửi một lần

**Câu 5.** Một mô hình tách bằng cổng **XOR** (điều kiện "còn hàng?" / "hết hàng"), sau đó gộp hai nhánh bằng cổng **AND**. Kết luận đúng?
A. Quy trình chạy hai lần ở phía sau cổng gộp
B. Quy trình bế tắc: cổng AND chờ nhánh không bao giờ có token
C. Quy trình chạy bình thường vì XOR luôn chọn đúng một nhánh
D. Chỉ sai cú pháp, không ảnh hưởng ngữ nghĩa

**Câu 6.** Vì sao **không được** dùng luồng thông điệp để nối hai task trong **cùng một pool**?
A. Vì công cụ vẽ không cho phép
B. Vì trong cùng pool, thứ tự do ta kiểm soát nên phải dùng luồng tuần tự; luồng thông điệp diễn tả cộng tác giữa hai thực thể độc lập, không mang token
C. Vì luồng thông điệp chỉ dùng cho task dịch vụ
D. Vì luồng thông điệp không được nối vào sự kiện

**Câu 7.** Yêu cầu: *"Sau 3 ngày làm việc mà hồ sơ chưa được duyệt thì gửi nhắc nhở cho chuyên viên, **việc duyệt vẫn tiếp tục**."* Chọn ký pháp nào?
A. Sự kiện hẹn giờ biên **ngắt** (viền đôi nét liền)
B. Sự kiện hẹn giờ biên **không ngắt** (viền đôi nét đứt)
C. Sự kiện lỗi biên
D. Sự kiện kết thúc terminate

**Câu 8.** Tình huống: *"Gửi yêu cầu bổ sung hồ sơ; nếu nhận được phản hồi trong 7 ngày thì xử lý, quá 7 ngày thì hủy yêu cầu."* Cấu trúc nào đúng nhất?
A. Cổng XOR với hai điều kiện dữ liệu
B. Cổng dựa trên sự kiện, phía sau là sự kiện bắt thông điệp và sự kiện hẹn giờ
C. Cổng AND rồi gộp bằng XOR
D. Vòng lặp kiểm tra mỗi ngày một lần

**Câu 9.** Ba quy trình — mua sắm, công tác phí, tổ chức hội thảo — đều có bước "Phê duyệt chi tiêu" giống nhau. Quy chế chi tiêu vừa thay đổi. Cách mô hình hóa nào **giảm chi phí bảo trì** nhiều nhất?
A. Vẽ lại bước phê duyệt trong cả ba mô hình
B. Tách bước phê duyệt thành **sub-process nhúng** trong mỗi mô hình
C. Định nghĩa "Phê duyệt chi tiêu" một lần và gọi bằng **call activity** với tham số
D. Dùng chung một **data store** cho cả ba quy trình

**Câu 10.** Ràng buộc nào **đúng** với sub-process nhúng?
A. Phải có nhiều sự kiện bắt đầu để linh hoạt
B. Phải có một sự kiện bắt đầu không xác định, ít nhất một sự kiện kết thúc, dùng chung dữ liệu với cha và không gọi được từ quy trình khác
C. Có thể truyền tham số vào/ra và tái sử dụng ở quy trình khác
D. Không cần sự kiện kết thúc nếu bên trong có cổng XOR

**Câu 11.** Tên nào **đúng** quy ước đặt tên cho **sự kiện**?
A. "Xác nhận đơn hàng"
B. "Kiểm tra đơn hàng"
C. "Đơn hàng đã được xác nhận"
D. "Đơn hàng"

**Câu 12.** Một cổng XOR có hai nhánh với điều kiện **"Thiếu 0,5 điểm trở lên"** và **"Đạt từ 0,3 điểm"**. Chuyện gì xảy ra với hồ sơ lệch **0,4 điểm**, và cách sửa đúng?
A. Đi nhánh thứ hai vì 0,4 lớn hơn 0,3
B. Không nhánh nào nhận → token kẹt tại cổng; sửa bằng cách làm hai điều kiện **loại trừ và bao phủ hết**, hoặc thêm **nhánh mặc định**
C. Đi cả hai nhánh, tạo hai token
D. Công cụ tự động chọn nhánh có điều kiện gần nhất

**Câu 13.** Hoạt động *"Thẩm định từng khoản mục trong hồ sơ"* được thực hiện lặp lại cho **12 khoản mục**. Đây là gì?
A. Vòng lặp làm lại — dấu hiệu của vấn đề chất lượng, cần cắt bỏ
B. Đa thể hiện — bản chất của công việc, không phải lãng phí
C. Bế tắc, vì hoạt động lặp mà không có cổng gộp
D. Lỗi cú pháp, vì một hoạt động không được lặp quá 10 lần

**Câu 14.** Ngoại lệ *"hồ sơ thiếu giấy tờ"* chiếm **35%** số thể hiện. Kết luận đúng nhất theo nguyên tắc thiết kế ngoại lệ?
A. Đây là ngoại lệ bình thường, chỉ cần thêm sự kiện lỗi biên là đủ
B. Vượt ngưỡng 20% → đây là **nhánh chính chưa được thừa nhận**, dấu hiệu quy trình cần được **thiết kế lại**
C. Phải chuyển toàn bộ quy trình sang mô hình thực thi
D. Phải dùng terminate để loại bỏ các hồ sơ thiếu giấy tờ

**Câu 15.** Hai nhánh chạy **song song** giữa cổng AND: nhánh A chờ **2 ngày**, nhánh B chờ **5 ngày**. Thời gian chờ của cả cụm tính đến khi qua cổng gộp AND là bao nhiêu?
A. 3,5 ngày — trung bình cộng
B. 7 ngày — cộng hai nhánh
C. 5 ngày — lấy giá trị lớn nhất
D. 2 ngày — lấy giá trị nhỏ nhất

**Câu 16.** Cổng XOR: **70%** hồ sơ đi nhánh mất **1 ngày**, **30%** đi nhánh mất **4 ngày**. Thời gian chờ **kỳ vọng** là bao nhiêu?
A. 2,5 ngày
B. 1,9 ngày
C. 4 ngày
D. 2,8 ngày

**Câu 17.** Đoạn lặp trong quy trình mất **9 ngày**, và **25%** hồ sơ phải làm lại đoạn đó một lần. Thời gian **phát sinh thêm** do làm lại (tính trung bình) là bao nhiêu?
A. 2,25 ngày
B. 3 ngày
C. 9 ngày
D. 0,25 ngày

**Câu 18.** Nhân viên kho **đóng gói hàng và ghi sổ bằng giấy**, hoàn toàn **không dùng hệ thống**. Task này thuộc loại nào và là ứng viên gì?
A. User task — ứng viên **hỗ trợ bằng AI**
B. Manual task — ứng viên **số hóa**
C. Service task — **đã tự động**, chỉ cần giám sát
D. Script task — engine chạy một đoạn mã

**Câu 19.** Khách hàng **rút hồ sơ vay** giữa lúc đang thẩm định; **mọi việc liên quan — kể cả nhánh song song kiểm tra tài sản — phải dừng ngay**. Chọn ký pháp nào?
A. Sự kiện **hủy** (cancel) biên gắn trên task thẩm định
B. Sự kiện thông điệp biên **ngắt** gắn lên **từng** task
C. **Event sub-process** kích hoạt bởi sự kiện thông điệp ngắt, bên trong kết thúc bằng **terminate end event**
D. Sự kiện **leo thang** biên **không ngắt**

**Câu 20.** Mô hình cần thể hiện tương tác với **ngân hàng giải ngân**, nhưng quy trình nội bộ của ngân hàng **không thuộc phạm vi** và ta **không biết rõ**. Nên vẽ gì?
A. Một pool đầy đủ với các bước của ngân hàng do ta suy đoán
B. **Black-box pool**, nối với pool của trường bằng **message flow**
C. Một **lane** trong pool của trường
D. Một **data store** đặt giữa hai pool

**Câu 21.** Hai quy trình **độc lập** — cấp học bổng và đăng ký học phần — cùng **đọc/ghi CSDL sinh viên**, nhưng **không có luồng nào nối chúng**. Đây là quan hệ nào trong sáu quan hệ giữa các quy trình?
A. Phân rã (decomposition)
B. Kích hoạt tuần tự (triggering)
C. Chia sẻ dữ liệu (qua data store)
D. Chuyên biệt hóa (specialization)

---

### Đáp án và giải thích

| Câu | Đáp án | Giải thích |
|---|---|---|
| **1** | **C** | Mục đích là **giao tiếp + xin chủ trương** trong 15 phút → cần **ít ký hiệu, dễ đọc**, tức **mức mô tả**. A sai vì mức thực thi **loại người nghiệp vụ ra khỏi cuộc trao đổi** (chân lý ③). B sai vì ngoại lệ **làm rối** mô hình khi mục đích là xin chủ trương. D sai: trộn ba mức **phá vỡ khả năng đọc** |
| **2** | **B** | Công cụ chỉ kiểm **cú pháp**; "không phải chúng tôi làm thế" là **lệch thực tế** → **ngữ nghĩa**. A sai vì công cụ **không báo lỗi**. C sai: mô hình vẫn có thể dễ đọc. D sai: "tính đầy đủ của ký pháp" không phải tiêu chí trong ba tiêu chí chất lượng |
| **3** | **C** | G4 yêu cầu **cổng tách và cổng gộp CÙNG LOẠI** — đúng là điều kiện loại trừ **cả** bế tắc **và** đồng bộ thiếu. A, B, D là hướng dẫn tốt nhưng **không liên quan trực tiếp** đến tính đúng đắn của luồng |
| **4** | **B** | AND tách → **2 token**; XOR gộp **chuyển tiếp ngay** từng token → phía sau **chạy hai lần** = **đồng bộ thiếu**. A sai: đó là hệ quả của **XOR tách – AND gộp**. C sai: cặp cân bằng phải **cùng loại**. D sai: XOR gộp **không chờ**, nên không "gộp lại thành một" |
| **5** | **B** | XOR tách → **chỉ 1 nhánh** có token; AND gộp **chờ đủ mọi nhánh** → **bế tắc**. C sai: XOR chọn đúng một nhánh, nhưng **chính vì thế** AND không bao giờ đủ. D sai: đây là lỗi **ngữ nghĩa** (quy trình **không chạy được**), không chỉ là hình thức |
| **6** | **B** | Lý do là **ngữ nghĩa**: trong pool, **ta điều khiển thứ tự** → sequence flow (quy tắc cú pháp 2). Message flow diễn tả **cộng tác**, **không mang token** nên **không diễn đạt được "cái gì chạy trước"**. A sai: đó là lý do công cụ, không phải lý do mô hình hóa. C, D sai: không có ràng buộc như vậy |
| **7** | **B** | "**Việc duyệt vẫn tiếp tục**" → **không ngắt** → **nét đứt**. A sai: ngắt sẽ **dừng** việc thẩm định. C sai: đây không phải lỗi. D sai: terminate **xóa mọi token**, không phải "nhắc nhở" |
| **8** | **B** | Ta **chưa biết trước** sự kiện nào sẽ xảy ra → **cổng dựa trên sự kiện**, phía sau là **sự kiện bắt** (message + timer). A sai: XOR rẽ theo **dữ liệu đã có**, không dùng được cho "chờ tương lai". C sai: AND sẽ **chạy cả hai** nhánh. D sai: vòng lặp kiểm tra **sai ngữ nghĩa và rối** — đúng như bài giảng nêu |
| **9** | **C** | Cùng một việc **lặp ở nhiều quy trình** + **quy chế hay đổi** → **call activity** để chỉ sửa **một nơi**. A sai: sửa ba nơi, dễ quên. B sai: sub-process nhúng **không tái sử dụng** được. D sai: data store giải quyết **chia sẻ dữ liệu**, không giải quyết **lặp logic** |
| **10** | **B** | Đúng ba ràng buộc: **một none start event**, **≥1 end event**, **dùng chung dữ liệu**, **không gọi từ ngoài**. A sai: nhiều start event **không xác định được điểm khởi phát** (7PMG G3). C sai: đó là **call activity**. D sai: vẫn **bắt buộc** có end event |
| **11** | **C** | Sự kiện phải là **danh từ + động từ dạng ĐÃ HOÀN TẤT** ("đã được xác nhận"). A sai: đó là **hoạt động** (động từ + danh từ) — biến sự kiện thành việc cần làm. B sai: cũng là hoạt động. D sai: thiếu động từ, chỉ là **đối tượng dữ liệu** |
| **12** | **B** | **0,4** không thỏa cả hai điều kiện → **token kẹt tại cổng** → **bế tắc im lặng**. Sửa bằng **loại trừ + bao phủ** hoặc **nhánh mặc định** (quy tắc cú pháp 5). A sai: 0,4 **không** thỏa "từ 0,3" theo cách phát biểu đã cho (và ngay cả khi thỏa thì hai điều kiện **không loại trừ** nhau). C sai: XOR **chỉ một** nhánh. D sai: BPMN **không có** cơ chế "chọn gần nhất" |
| **13** | **B** | Lặp **cho từng phần tử của danh sách** = **đa thể hiện**, là **bản chất công việc**. A sai: rework là "**làm lại vì chưa đạt**". C sai: đa thể hiện **không gây bế tắc**. D sai: không có giới hạn số lần lặp |
| **14** | **B** | Nguyên tắc 4: **>20% là nhánh chính chưa thừa nhận** → **thiết kế lại**. A sai: thêm lỗi biên chỉ **hợp thức hóa** một thiết kế sai. C sai: mức thực thi là **chuyện kỹ thuật**, không giải quyết lý do nghiệp vụ. D sai: terminate **không phải công cụ loại hồ sơ** |
| **15** | **C** | AND → **max**. Nhánh B quyết định. A sai: trung bình cộng **không có ý nghĩa** với nhánh song song. B sai: **7 ngày là nếu tuần tự**. D sai: min là **khi hai nhánh thay thế nhau**, không phải song song |
| **16** | **B** | `0,7 × 1 + 0,3 × 4 = 0,7 + 1,2 = 1,9 ngày`. A, D là các phép tính sai; C là **giá trị của nhánh chậm nhất**, không phải kỳ vọng |
| **17** | **B** | `p/(1−p) = 0,25/0,75 = 0,333`; `0,333 × 9 ≈ 3 ngày`. A sai: `0,25 × 9 = 2,25` — **quên mẫu số** `(1−p)`. C sai: đó là **toàn bộ** đoạn lặp. D sai: nhầm `p` với thời gian |
| **18** | **B** | Làm **hoàn toàn ngoài hệ thống** = **manual task** → ứng viên **số hóa** (A0/A1 → A2). A sai: user task **có** hỗ trợ hệ thống. C sai: service task là **hệ thống tự gọi API**. D sai: script task do **engine** chạy |
| **19** | **C** | Cần dừng **toàn bộ**, kể cả **nhánh song song** → **terminate**, và sự kiện có thể xảy ra **ở bất kỳ bước nào** → **event sub-process**. A sai: **cancel chỉ dùng trong transaction**. B sai: biên chỉ dừng **đúng task được gắn**, nhánh song song **vẫn chạy**. D sai: leo thang **không ngắt** thì **không dừng gì cả** |
| **20** | **B** | Không biết/không cần mô tả nội bộ đối tác → **black-box pool** + **message flow**. A sai: **bịa** quy trình đối tác, thường **sai** và làm mô hình phình to. C sai: lane nghĩa là **ta kiểm soát thứ tự của họ** — không đúng. D sai: data store không diễn tả **trao đổi thông điệp** |
| **21** | **C** | Cùng đọc/ghi **một data store** mà **không có luồng nối** = **chia sẻ dữ liệu**, ràng buộc **ngầm**. A sai: phân rã cần **chứa** (sub-process). B sai: kích hoạt là **A kết thúc sinh sự kiện cho B**. D sai: chuyên biệt hóa là **biến thể của cùng khung** |

> **Cách dùng bộ 21 câu này**: làm **không mở tài liệu**, giới hạn **35 phút** (≈ 1,7 phút/câu — đúng nhịp thi). Sai câu nào thì **quay lại đúng mục** đã ghi trong cột giải thích và **trace lại bằng bút**.

---

*Tiếp theo: `03-Chuong3.md` — tự động hóa thông minh, ngưỡng tin cậy, mức tự chủ và bảy mẫu thiết kế agent.*
