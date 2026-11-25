# CHƯƠNG 1 — TỔNG QUAN QUẢN LÝ QUY TRÌNH VÀ TỰ ĐỘNG HÓA

> **Vị trí trong đề**: ~5–6 câu Phần I. Đây là chương "khái niệm nền" — đề không hỏi định nghĩa trần trụi mà hỏi **phân biệt** (quy trình/thể hiện, BPA/RPA, as-is/as-documented) và **tìm nguyên nhân** (vì sao dự án tự động hóa thất bại).
>
> **Câu thần chú của chương**: *Tự động hóa không phải là mục tiêu. Ba ngày chờ một tờ giấy xác nhận là bài toán của **thời gian bàn giao**, không phải bài toán của tốc độ gõ phím.*

---

## 1.0 Bản đồ chương

```
1.1 Quy trình nghiệp vụ ──► 1.2 Tự động hóa (A0–A5, người–máy)
        │                            │
        ▼                            ▼
1.3 Vòng đời BPM 6 giai đoạn ──► 1.4 BPA (tầng hệ thống)
                                     │
                                     ▼
                              1.5 RPA (tầng giao diện)
```

Logic của chương: **hiểu đúng đối tượng** (quy trình) → **định vị mức can thiệp** (A0–A5) → **đặt can thiệp vào đúng chỗ trong chu trình** (vòng đời BPM) → **chọn đòn bẩy đúng tầng** (BPA ở tầng API, RPA ở tầng giao diện).

---

## 1.1 Quy trình nghiệp vụ

### 1.1.1 Hai định nghĩa bổ sung cho nhau

| Nguồn | Nội dung | Nhấn mạnh điều gì |
|---|---|---|
| **Weske (2024)** — góc nhìn cấu trúc | "Một tập hợp các hoạt động được thực hiện **có phối hợp**, trong một môi trường **tổ chức và kỹ thuật**, cùng nhau hiện thực hóa một **mục tiêu nghiệp vụ**" | Tính **phối hợp** và **bối cảnh tổ chức** |
| **Dumas và cộng sự (2018)** — góc nhìn thực dụng | "Chuỗi các **sự kiện, hoạt động và điểm quyết định** có liên quan với nhau, được thực hiện bởi **nhiều tác nhân** và đối tượng khác nhau, tạo ra một **kết quả có giá trị** cho ít nhất một khách hàng" | Tính **chuỗi** và **giá trị cho khách hàng** |

Ghép hai định nghĩa lại ta được ba đặc trưng cốt lõi. Đây chính là cách đề thi hay hỏi: *"Đặc trưng nào của quy trình nghiệp vụ giải thích hiện tượng X?"*

### 1.1.2 Ba đặc trưng cốt lõi — và hệ quả phân tích của từng đặc trưng

| # | Đặc trưng | Bản chất | Hệ quả khi phân tích / cải tiến | Ví dụ |
|---|---|---|---|---|
| 1 | **Tính có trật tự** (ordering) | Các hoạt động không xảy ra ngẫu nhiên mà theo logic thời gian **và điều kiện**: có trước – có sau, có rẽ nhánh, có lặp | Đảo thứ tự có thể phá vỡ giá trị. Muốn rút ngắn thời gian → tìm các bước **không phụ thuộc nhau** để làm song song | Phải kiểm tra tồn kho **xong** mới được đóng gói |
| 2 | **Tính xuyên chức năng** (cross-functional) | Quy trình đi qua **nhiều bộ phận/vai trò/hệ thống**, không nằm gọn trong một phòng ban | **Sinh ra các điểm bàn giao (handoff)** — và bàn giao là nơi phát sinh phần lớn thời gian chờ, mất thông tin, đùn đẩy trách nhiệm | Đơn hàng đi qua Kho → Kế toán → Vận chuyển → CSKH |
| 3 | **Tính hướng kết quả** (outcome-oriented) | Luôn kết thúc bằng một **kết quả nhận biết được**, có giá trị với khách hàng nội bộ hoặc bên ngoài | Nếu không xác định được kết quả → đó chưa phải quy trình, chỉ là "danh sách việc". Kết quả có thể **tiêu cực** (hủy đơn, từ chối hồ sơ) — vẫn là kết quả | "Giao hàng thành công" / "Hủy đơn" |

**Vì sao đặc trưng (2) quan trọng nhất về mặt phân tích?**
Vì nó giải thích nghịch lý ở câu hỏi khởi động: thao tác thật chỉ 5 phút nhưng sinh viên chờ 3 ngày. Trong một quy trình hành chính, **70–90% thời gian chu trình là thời gian chờ**, và thời gian chờ tập trung ở các điểm bàn giao (chờ ký, chờ chuyển hồ sơ, chờ người có thẩm quyền quay lại bàn).

> **Kỹ thuật phân tích đáng nhớ**: *"Khi phân tích một quy trình, hãy đếm số lần hồ sơ đổi chủ. Con số đó dự báo khá chính xác độ dài thời gian chu trình."* Trong mô hình BPMN, mỗi lần luồng cắt qua ranh giới lane là một lần bàn giao (Chương 2).

### 1.1.3 Sáu thành phần cấu tạo (bộ ký hiệu sẽ gặp lại ở BPMN)

| Thành phần | Vai trò | Ví dụ (đơn hàng trực tuyến) | Ký hiệu BPMN tương ứng |
|---|---|---|---|
| **Sự kiện** (event) | Điều xảy ra **tức thời**, không tiêu tốn thời gian; kích hoạt hoặc kết thúc | Đơn hàng được đặt; đơn hàng được giao | Hình tròn |
| **Hoạt động** (activity/task) | Đơn vị công việc **tiêu tốn thời gian và nguồn lực** | Kiểm tra tồn kho, đóng gói | Chữ nhật bo góc |
| **Điểm quyết định** (decision point) | Nơi luồng rẽ nhánh theo điều kiện | "Còn hàng?" | Hình thoi (cổng) |
| **Tác nhân** (actor) | Người / bộ phận / hệ thống thực hiện | Nhân viên kho, hệ thống thanh toán | Pool / lane |
| **Đối tượng nghiệp vụ** (business object) | Dữ liệu/vật thể được tạo ra hoặc biến đổi | Đơn hàng, hóa đơn, phiếu xuất kho | Data object |
| **Kết quả** (outcome) | Trạng thái kết thúc, tích cực hoặc tiêu cực | Giao thành công / hủy đơn | End event |

> **Mẹo học**: sáu thành phần này **chính là** bộ ký hiệu cơ bản của BPMN 2.0 ở Chương 2. Học kỹ ở đây thì Chương 2 nhẹ đi một nửa.

### 1.1.4 Phân biệt quy trình với bốn khái niệm lân cận (dạng câu hỏi rất dễ ra)

| Khái niệm | Điểm khác biệt cốt lõi | Ví dụ | Bẫy |
|---|---|---|---|
| **Chức năng** (function) | Nhóm năng lực **theo phòng ban, chiều dọc**. Quy trình chảy **chiều ngang**, cắt qua các chức năng | Phòng Kế toán, phòng Marketing | Đề cho "phòng Kế toán xử lý hóa đơn" → đây là **chức năng**, không phải quy trình |
| **Dự án** (project) | **Tính duy nhất** — làm một lần rồi kết thúc. Quy trình **lặp lại** với cùng logic | Xây một tòa nhà mới | Đề cho "triển khai hệ thống ERP" → là dự án (nhưng *chứa* nhiều quy trình) |
| **Thủ tục** (procedure) | **Văn bản mô tả** cách làm. Quy trình là **dòng công việc thực tế đang diễn ra**, có thể khác văn bản | Quy chế chi tiêu nội bộ | Nhầm thủ tục với quy trình là **nguyên nhân trực tiếp** của lỗi tự động hóa "quy trình trên giấy" |
| **Luồng công việc** (workflow) | Chỉ phần **đã số hóa và tự động điều phối**. Quy trình bao hàm **cả phần thủ công và phần ngoài hệ thống** | Workflow duyệt đơn trên phần mềm | Workflow ⊂ quy trình, không đồng nghĩa |

> **Bẫy thi điển hình**: *"Một tổ chức có thủ tục rất đầy đủ nhưng quy trình vẫn hỗn loạn"* — phương án đúng phải chỉ ra **khoảng lệch as-documented ≠ as-is**, không phải "thiếu công cụ" hay "nhân viên kém".

### 1.1.5 Quy trình vs Thể hiện quy trình (process vs process instance)

| | **Quy trình** (process) | **Thể hiện quy trình** (instance / case) |
|---|---|---|
| Bản chất | **Mô hình chung** — mô tả cách công việc *phải* diễn ra | **Một lần chạy cụ thể** của mô hình đó |
| Vòng đời | Được thiết kế, ban hành, **phiên bản hóa** | Có mã số, trạng thái, mốc thời gian riêng |
| Ví dụ | "Quy trình Xử lý đơn hàng trực tuyến" | Đơn hàng `#DH-2026-04871` của chị Lan |
| Ta làm gì với nó | **Vẽ, phân tích, cải tiến** | **Theo dõi, đo lường, ghi nhật ký** |
| Số lượng | Một (hoặc vài phiên bản) | Có thể **hàng triệu** |

**Ba hệ quả cần nhớ:**

1. **Khối lượng thể hiện là điều kiện kinh tế của tự động hóa.** Quy trình chạy 5 lần/năm gần như không bao giờ hoàn vốn nếu đầu tư nặng; quy trình 5.000 lần/tháng thì ngược lại.
2. **Đo lường luôn đo trên tập thể hiện**, không đo trên mô hình. KPI như cycle time trung bình, tỷ lệ lỗi, p95 — đều là thống kê trên các instance.
3. **Khi ai đó nói "quy trình này chậm", phải hỏi lại**: chậm ở **mô hình** (thiết kế sai, thừa bước, tuần tự hóa không cần thiết) hay chậm ở **một số thể hiện cá biệt** (dữ liệu xấu, người vắng mặt)? Hai nguyên nhân này dẫn đến hai loại can thiệp hoàn toàn khác nhau — sửa mô hình (Chương 2) hay sửa dữ liệu/vận hành.

> Liên hệ Chương 2: "token" là công cụ mô tả **một thể hiện**. Nghìn hồ sơ đang chạy = nghìn tập token độc lập. Đây là lý do ngữ nghĩa token dùng được để kiểm tra tính đúng đắn của mô hình.

### 1.1.6 As-documented, as-is, to-be — điểm mấu chốt của ngành BPM

| Trạng thái | Định nghĩa | Có thể sai lệch vì | Ai biết rõ nhất |
|---|---|---|---|
| **As-documented** | Quy trình **được ban hành**: văn bản, quy chế, sổ tay nội bộ nói công việc *phải* diễn ra thế nào | Đã lỗi thời; lý tưởng hóa; viết cho đẹp hồ sơ kiểm định | Người soạn quy chế |
| **As-is** | Quy trình **đang thực sự diễn ra** hằng ngày — kể cả lối tắt, bước bị bỏ qua, thỏa thuận miệng, file Excel "chữa cháy" | Không ai ghi lại; là "quy trình ngầm" (shadow process) | **Người trực tiếp làm** |
| **To-be** | Quy trình **mong muốn**, đã thiết kế lại, sẽ triển khai sau khi phân tích as-is | Chưa tồn tại; phải được thiết kế có căn cứ | Nhóm cải tiến + người làm |

**Cơ chế thất bại điển hình (rất hay vào đề):**

```
Nhóm dự án đọc quy chế  →  dựng bot theo quy chế  →  phát hiện nhân viên làm khác
        (as-documented)                                    (as-is)
                ↓
     Bot chạy đúng văn bản nhưng sai thực tế
                ↓
     Người dùng quay lại làm thủ công  →  dự án "thất bại" dù kỹ thuật không sai
```

> **Nguyên tắc**: giai đoạn **khám phá quy trình** phải đi trước mọi quyết định công nghệ. Phải **quan sát và phỏng vấn người làm thật**, không chỉ đọc quy chế.
>
> **Câu hỏi phân biệt cực hay ra thi**: "Tài liệu nói 5 bước, thực tế 9 bước" → khoảng lệch **as-is ≠ as-documented**. "Sau khi cải tiến còn 4 bước" → đó là **to-be**.

### 1.1.7 Phân loại quy trình trong tổ chức

| Nhóm | Định nghĩa | Ví dụ | Hàm ý đầu tư |
|---|---|---|---|
| **Cốt lõi** (core) | Trực tiếp tạo giá trị cho khách hàng **bên ngoài** | Sản xuất, bán hàng, giao vận, CSKH | Ưu tiên tự động hóa đầu tiên nếu khối lượng lớn |
| **Hỗ trợ** (support) | Phục vụ để quy trình cốt lõi vận hành được | Tuyển dụng, mua sắm, quản trị hạ tầng CNTT, kế toán | Ưu tiên khi đang **gây tắc nghẽn** cho cốt lõi |
| **Quản trị** (management) | Hoạch định, đo lường, kiểm soát tổ chức | Lập ngân sách, đánh giá hiệu quả, quản trị rủi ro | Thường chuẩn hóa trước, tự động hóa sau |

> **Lưu ý**: cùng một hoạt động có thể thuộc nhóm khác nhau ở hai tổ chức. Với **trường đại học**, đào tạo là cốt lõi; với **ngân hàng**, đào tạo nội bộ là hỗ trợ. Việc xếp nhóm không nhằm dán nhãn mà nhằm **quyết định mức đầu tư và mức chuẩn hóa**.

**Bốn quy trình "kinh điển" trong BPM** (đề có thể hỏi tên/viết tắt):

| Viết tắt | Tên | Từ đâu đến đâu | Đặc điểm |
|---|---|---|---|
| **O2C** | Order-to-Cash | Nhận đơn hàng → thu được tiền | Ví dụ chuẩn nhất trong tài liệu BPM |
| **P2P** | Procure-to-Pay | Phát sinh nhu cầu mua → thanh toán nhà cung cấp | Gắn chặt kiểm soát nội bộ, tuân thủ |
| **I2R** | Issue-to-Resolution | Khách khiếu nại → vấn đề được giải quyết | **Tỷ lệ ngoại lệ cao**, nhiều tình huống cần con người |
| **H2R** | Hire-to-Retire | Tuyển dụng → nhân sự rời tổ chức | Chu kỳ dài, nhiều bên, nhiều giấy tờ |

---

## 1.2 Tự động hóa

### 1.2.1 Định nghĩa và hai từ khóa bị bỏ qua

> **Tự động hóa** = việc sử dụng công nghệ để thực hiện các hoạt động, ra quyết định hoặc **điều phối luồng công việc** mà trước đó do con người thực hiện, với mức độ can thiệp của con người được giảm thiểu **một cách có chủ đích**.

| Từ khóa | Nội dung | Vì sao quan trọng |
|---|---|---|
| **"Có chủ đích"** | Tự động hóa **không phải** là loại bỏ con người tối đa, mà là **phân công lại** công việc giữa người và máy sao cho tổng thể hiệu quả nhất | Có bước để người làm sẽ **rẻ hơn, an toàn hơn, linh hoạt hơn**. Đây là nền của mục 1.2.5 |
| **"Điều phối"** | Không chỉ làm thay **từng thao tác**, mà quan trọng hơn là tự động hóa **việc chuyển giao công việc giữa các bước** | Đây thường là nơi phát sinh chậm trễ **lớn nhất** (xem 1.1.2) |

Áp vào câu hỏi khởi động: rút 3 ngày xuống 3 giờ **đến từ việc bỏ thời gian chờ**, không đến từ việc gõ phím nhanh hơn.

### 1.2.2 Bốn mục tiêu CQST — và sự đánh đổi không thể tránh

| Mục tiêu | Nội dung | Chỉ số thường dùng |
|---|---|---|
| **C — Cost** (chi phí) | Giảm chi phí nhân công cho thao tác lặp lại **và** chi phí khắc phục hậu quả sai sót | Chi phí/thể hiện |
| **Q — Quality** (chất lượng) | Giảm sai sót do mệt mỏi/nhầm lẫn; tăng tính **nhất quán** giữa các lần thực hiện | Tỷ lệ lỗi, tỷ lệ làm lại |
| **S — Speed** (tốc độ) | Rút ngắn **thời gian chu trình**, chủ yếu bằng cách xóa **thời gian chờ** | Cycle time, p95 |
| **T — Transparency** (minh bạch) | Tăng khả năng theo dõi, đo lường, **chứng minh tuân thủ** nhờ nhật ký ghi tự động | Tỷ lệ hồ sơ có vết kiểm toán |

**Bốn mục tiêu này thường KHÔNG đạt được đồng thời.** Tăng tốc có thể làm giảm chất lượng; tăng minh bạch thường làm tăng chi phí (ghi log, lưu trữ, kiểm toán). Một đề xuất tự động hóa nghiêm túc **phải nói rõ đang tối ưu chiều nào và chấp nhận đánh đổi chiều nào**.

> Liên hệ Chương 2: bốn chiều này chính là **devil's quadrangle** (thời gian – chi phí – chất lượng – linh hoạt) ở giai đoạn phân tích. Cải thiện một chiều thường phải hy sinh một chiều khác.

### 1.2.3 Phổ tự động hóa A0–A5 (bảng phải thuộc)

| Mức | Tên gọi | Vai trò của **con người** | Công nghệ tiêu biểu | Ví dụ |
|---|---|---|---|---|
| **A0** | Thủ công hoàn toàn | Làm **mọi thứ** | Giấy tờ, trao đổi miệng | Sổ điểm giấy, chuyển hồ sơ bằng tay |
| **A1** | Hỗ trợ số | **Làm**, máy chỉ lưu trữ và tính toán | Excel, email, biểu mẫu điện tử | Nhập điểm vào Excel, in và ký |
| **A2** | Tự động theo luật, **có người điều khiển** | **Kích hoạt và giám sát từng bước** | Macro, **RPA attended** | Nhân viên bấm nút, bot chạy phần nhập liệu |
| **A3** | Tự động theo luật, **không người điều khiển** | Chỉ xử lý **ngoại lệ** | BPMS, **RPA unattended**, workflow no-code | Bot đối soát dữ liệu hằng đêm |
| **A4** | Tự động hóa **thông minh** | **Phê duyệt** các quyết định quan trọng | RPA + AI, mô hình dự đoán, LLM trích xuất | AI đọc hóa đơn → người duyệt khoản chi lớn |
| **A5** | **Tự trị** (agentic) | Đặt **mục tiêu, ràng buộc** và kiểm toán kết quả | AI Agent lập kế hoạch và gọi công cụ | Agent tự đối soát, tự đề xuất điều chỉnh |

**Xu hướng chung**: càng lên cao, **máy càng chủ động** và **con người càng lùi về** vai trò *thiết kế – giám sát – xử lý ngoại lệ*.

### 1.2.4 Hai nguyên tắc khi đọc phổ — đây là chỗ đề hay gài bẫy nhất

#### Nguyên tắc 1: Mức cao hơn KHÔNG mặc nhiên tốt hơn

Chi phí xây dựng, chi phí bảo trì và **rủi ro** đều **tăng theo mức**. Một quy trình chạy 5 lần/năm thì **A1** (biểu mẫu điện tử + bảng tính) có thể đã là tối ưu.

Câu hỏi đúng không phải *"làm được tới mức nào"* mà là *"mức nào **hợp lý** với tần suất, rủi ro và ngân sách của ta"*.

#### Nguyên tắc 2: Một quy trình thường trải trên NHIỀU mức cùng lúc

Không có chuyện cả quy trình nằm gọn ở một mức. **Định vị phải làm ở cấp độ từng bước**, không phải cấp độ toàn quy trình.

**Ví dụ chuẩn — quy trình xử lý hóa đơn nhà cung cấp:**

| Bước | Mức | Vì sao |
|---|---|---|
| Bóc tách dữ liệu từ **ảnh hóa đơn** | **A4** | Cần nhận thức (OCR/LLM) vì dữ liệu phi cấu trúc |
| Nhập liệu vào phần mềm kế toán | **A3** | Theo luật, không cần người |
| Đối chiếu với đơn đặt hàng | **A3** | So khớp theo quy tắc |
| **Phê duyệt** khoản chi > 50 triệu | **A1** (thực chất là A0/A1 về mặt quyết định) | Cần **thẩm quyền và trách nhiệm cá nhân** |

→ Cùng một quy trình, bốn bước nằm ở ba mức khác nhau — **và đó là thiết kế đúng**, không phải sự thiếu nhất quán.

> **Bẫy thi**: phương án "quy trình này đạt mức A3" — sai về bản chất, vì mức tự động hóa là thuộc tính của **từng bước**, và một quy trình có thể "A3 ở phần thân nhưng A1 ở phần duyệt".

### 1.2.5 Human-in-the-loop / on-the-loop / out-of-the-loop — chọn theo hai tiêu chí

| Mô hình | Định nghĩa | Máy / Người | Ví dụ | Liên hệ A0–A5 |
|---|---|---|---|---|
| **In-the-loop** (trong vòng lặp) | Con người **phê duyệt TRƯỚC KHI** hành động có hiệu lực | Máy chuẩn bị — **người quyết định** | Duyệt lệnh chuyển tiền | A4 (thực thi có phê duyệt) |
| **On-the-loop** (trên vòng lặp) | Máy hành động, con người **giám sát và có thể can thiệp** | Máy quyết định — **người theo dõi** | Bot gửi email xác nhận đơn hàng | A4 (theo ngưỡng) |
| **Out-of-the-loop** (ngoài vòng lặp) | Máy hành động và **tự đối soát**; người chỉ kiểm tra định kỳ | Máy tự chủ trong phạm vi cho phép | Đồng bộ dữ liệu giữa hai hệ thống | A3, A5 |

#### Hai tiêu chí quyết định (sẽ dùng lại nguyên vẹn ở Chương 3)

| Tiêu chí | Câu hỏi | Kéo về phía nào |
|---|---|---|
| **Mức độ thiệt hại khi sai** (severity) | Nếu máy sai, thiệt hại bao nhiêu? | Thiệt hại **càng lớn** → càng kéo con người **về phía trước hành động** (in-the-loop) |
| **Khả năng đảo ngược** (reversibility) | Sai rồi có sửa được không? | Hành động **không đảo ngược được** (chuyển tiền, gửi thư cho khách, xóa dữ liệu, ra quyết định hành chính) → **bắt buộc có người phê duyệt** |

**Ma trận chọn mô hình:**

| | Đảo ngược được | Không đảo ngược được |
|---|---|---|
| **Thiệt hại thấp** | **Out-of-the-loop** (gắn nhãn spam, gợi ý sản phẩm) | **On-the-loop** + lấy mẫu kiểm tra (gửi email marketing) |
| **Thiệt hại cao** | **On-the-loop** + ngưỡng tin cậy (phân loại hồ sơ) | **In-the-loop** bắt buộc (chuyển tiền, kê đơn, phê duyệt tín dụng lớn, tốt nghiệp) |

> **Câu chốt để nhớ**: *"Nếu máy làm sai thì ai phát hiện, phát hiện lúc nào, và sửa bằng cách nào?"* — khi mức tự động hóa tăng, câu hỏi thiết kế **không còn là** "máy có làm được không".

---

## 1.3 Vòng đời quản lý quy trình nghiệp vụ (BPM)

### 1.3.1 BPM là gì — và hai điều dễ hiểu sai

> **BPM** = tập hợp các **phương pháp, kỹ thuật và công cụ** nhằm **khám phá, phân tích, thiết kế lại, triển khai và giám sát** quy trình nghiệp vụ **một cách liên tục**.

| Điều dễ hiểu sai | Thực tế |
|---|---|
| "BPM là một dự án có ngày kết thúc" | **BPM là một chu trình.** Mỗi vòng cải tiến kết thúc bằng dữ liệu giám sát, và dữ liệu đó mở ra vòng tiếp theo. Tổ chức coi BPM là dự án thường **quay lại trạng thái cũ sau 12–18 tháng** |
| "BPM là chuyện công nghệ" | **BPM rộng hơn công nghệ.** Phần lớn công việc BPM là quan sát, phỏng vấn, đo lường, thương lượng giữa các bộ phận. Công nghệ chỉ xuất hiện ở **giai đoạn 5** |

### 1.3.2 Sáu giai đoạn — mục tiêu, đầu ra, sai lầm

| # | Giai đoạn | Câu hỏi trung tâm | **Đầu ra** | Sai lầm thường gặp |
|---|---|---|---|---|
| 1 | **Xác định** (identification) | Tổ chức có những quy trình nào? Cải tiến cái nào **trước**? | **Kiến trúc quy trình** + danh mục ưu tiên | Chọn theo cảm tính của **người có tiếng nói to nhất** |
| 2 | **Khám phá** (discovery) | Quy trình **thực sự** diễn ra thế nào? | **Mô hình as-is** (thường bằng BPMN) | Chỉ đọc quy chế, không quan sát → mô hình hóa as-documented |
| 3 | **Phân tích** (analysis) | Vấn đề nằm ở đâu, **lớn bao nhiêu**? | **Danh sách vấn đề đã định lượng** | Nêu vấn đề định tính ("chậm", "rối") mà không có số |
| 4 | **Thiết kế lại** (redesign) | Làm thế nào để tốt hơn? | **Mô hình to-be** | Nhảy thẳng sang "mua công cụ" |
| 5 | **Triển khai** (implementation) | Đưa vào vận hành thế nào? | **Quy trình mới đang chạy** | Chỉ làm kỹ thuật, **bỏ quản trị thay đổi** → hệ thống tốt nhưng không ai dùng |
| 6 | **Giám sát & kiểm soát** (monitoring) | Có đạt như mong đợi không? Lệch ở đâu? | **Dữ liệu KPI + sai lệch phát hiện được** | Không đặt KPI từ giai đoạn 4 → không có gì để so sánh |

**Mũi tên khép vòng**: kết quả giám sát ở (6) quay lại làm đầu vào cho (1)–(2). Đây là điểm khiến BPM khác một dự án cải tiến đơn lẻ: **dữ liệu vận hành thu được ở cuối vòng cho biết quy trình nào đang trục trặc nhất**.

> **Không có nhật ký sự kiện (event log) thì không có cơ sở định lượng để bắt đầu vòng mới.** Đây là câu nối sang Chương 4 (nhật ký thực thi) và Chương 3 (process mining).

#### Chi tiết hóa giai đoạn 1 — ba tiêu chí xếp hạng ưu tiên

| Tiêu chí | Câu hỏi |
|---|---|
| **Mức độ quan trọng** (importance) | Quy trình này ảnh hưởng bao nhiêu đến giá trị/khách hàng? |
| **Mức độ trục trặc** (dysfunction) | Nó đang hỏng đến mức nào (thời gian chờ, lỗi, phàn nàn)? |
| **Tính khả thi** (feasibility) | Có nguồn lực, dữ liệu, thẩm quyền để sửa không? |

#### Chi tiết hóa giai đoạn 2 — ba phương pháp khám phá (rất dễ ra câu so sánh)

| Phương pháp | Ưu điểm | Hạn chế |
|---|---|---|
| **Phỏng vấn** | Nhanh, hiểu được **lý do** | Chịu ảnh hưởng của **trí nhớ** và **mong muốn** của người kể |
| **Quan sát tại chỗ / workshop** | Thấy được **lối tắt và bước không ai khai báo** | Tốn thời gian; có hiệu ứng "được quan sát" |
| **Process mining** (khai phá từ nhật ký hệ thống) | **Khách quan**, đo được tần suất thật | Cần **dữ liệu log đủ tốt**; chỉ thấy việc *xảy ra*, không thấy *vì sao* |

> **Thực tiễn tốt**: kết hợp cả ba. *Process mining chỉ ra **điều gì** xảy ra; phỏng vấn giải thích **vì sao** nó xảy ra.*

#### Chi tiết hóa giai đoạn 3 — bốn công cụ phân tích

1. **Phân tích giá trị gia tăng** (value-added analysis): phân loại từng bước thành (a) tạo giá trị cho khách hàng, (b) cần thiết cho vận hành/tuân thủ, (c) **lãng phí thuần túy**. Nhóm (c) **phải bị loại bỏ trước khi nghĩ đến tự động hóa**.
2. **Phân tích nguyên nhân gốc** (root cause): biểu đồ xương cá, **5-Why** — đi từ triệu chứng "hồ sơ chậm" tới nguyên nhân thật, **thường nằm ở phân công trách nhiệm chứ không ở công nghệ**.
3. **Devil's quadrangle** — bốn chiều hiệu năng: **thời gian** (cycle time, thời gian chờ) – **chi phí** (trên mỗi thể hiện) – **chất lượng** (tỷ lệ lỗi, hài lòng) – **linh hoạt** (khả năng thích ứng). Quy tắc: cải thiện một chiều **thường phải đánh đổi** một chiều khác.
4. **Phân tích nút cổ chai & vòng lặp làm lại**: nhánh quay lui cho biết tỷ lệ rework — **thường là mục tiêu cải tiến hiệu quả nhất trên mỗi đồng chi phí**.

#### Chi tiết hóa giai đoạn 4 — năm hướng can thiệp, theo đúng thứ tự nên cân nhắc

| Thứ tự | Hướng | Nội dung | Ví dụ |
|---|---|---|---|
| **1** | **Loại bỏ** bước không tạo giá trị | Bước rẻ nhất là bước **không phải làm** | Bỏ bước "photo hồ sơ để lưu" khi đã có bản số |
| **2** | **Gộp bước** | Giảm số lần bàn giao | Giao trọn cụm việc cho một người thay vì 3 người ký |
| **3** | **Song song hóa** | Bước không phụ thuộc nhau thì không nên xếp hàng | Vừa kiểm tra học vụ vừa kiểm tra tài chính |
| **4** | **Chuyển việc cho tác nhân phù hợp hơn** | Kể cả **chuyển cho khách hàng tự phục vụ** | Sinh viên tự tra cứu thay vì gửi đơn hỏi |
| **5** | **Tự động hóa** | Chỉ là **MỘT** trong nhiều đòn bẩy, và **thường nên dùng SAU** khi đã loại bỏ lãng phí | Bot nhập liệu |

> ★ **Nguyên tắc vàng**: *Tự động hóa một bước lãng phí chỉ khiến lãng phí diễn ra **nhanh hơn** và **khó nhìn thấy hơn**.*
>
> Câu hỏi kiểm tra trước khi tự động hóa: *"Nếu bước này biến mất hoàn toàn thì ai bị ảnh hưởng, và ảnh hưởng thế nào?"*

#### Chi tiết hóa giai đoạn 5–6

- **Giai đoạn 5** gồm **hai nửa bắt buộc**: (a) **quản trị thay đổi tổ chức** — đào tạo, phân công lại vai trò, truyền thông với người bị ảnh hưởng; (b) **hiện thực hóa kỹ thuật** — cấu hình BPMS, xây bot RPA, dựng workflow no-code, viết ứng dụng. *Bỏ qua (a) là lý do phổ biến khiến "hệ thống chạy tốt nhưng không ai dùng".*
- **Giai đoạn 6**: KPI thường dùng — **cycle time, throughput, tỷ lệ lỗi, chi phí/thể hiện, mức độ tuân thủ**. Nhiệm vụ quan trọng nhất: **phát hiện sai lệch giữa thiết kế và thực tế vận hành** (conformance checking).

### 1.3.3 Sai lầm phương luận số 1: "giải pháp đi tìm vấn đề"

Trình tự sai:
```
Nghe nói về một công cụ → Mua về, ký hợp đồng bản quyền → Rồi mới đi tìm quy trình để áp dụng → Không đạt ROI
```

**Bốn lý do thất bại:**
1. Công cụ được chọn **trước khi biết bài toán** → gần như chắc chắn lệch nhu cầu.
2. Không có mô hình **as-is** → không biết vấn đề thật nằm ở đâu.
3. Không có **số liệu nền (baseline)** → không thể chứng minh cải thiện.
4. Bỏ qua giai đoạn **thiết kế lại** → tự động hóa cái sai.

**Cách phòng tránh:**
- Bắt đầu bằng **danh mục quy trình có xếp hạng ưu tiên**, không bằng danh mục sản phẩm.
- **Đo trước khi làm**: cycle time, số hồ sơ/tháng, tỷ lệ lỗi hiện tại.
- Chọn công nghệ ở **giai đoạn 4–5**, sau khi phương án to-be đã rõ.

> Đây là **nguyên nhân hàng đầu** khiến các dự án RPA không đạt ROI kỳ vọng — và là câu hỏi "tìm nguyên nhân" rất được chuộng trong đề.

---

## 1.4 Tự động hóa quy trình doanh nghiệp (BPA)

### 1.4.1 Định nghĩa và ba đặc điểm phân biệt

> **BPA** = sử dụng công nghệ để tự động hóa **toàn bộ hoặc phần lớn một quy trình đầu–cuối**, bao gồm cả việc **điều phối luồng công việc** giữa các bước, giữa các hệ thống và giữa các tác nhân.

| Đặc điểm | Nội dung | Phân biệt với |
|---|---|---|
| **Đối tượng là quy trình, không phải thao tác** | BPA hỏi "làm sao để **hồ sơ tự chảy** từ đầu đến cuối", không chỉ "làm sao bước nhập liệu này nhanh hơn" | RPA (tác vụ) |
| **Tích hợp ở tầng hệ thống** | Kết nối qua **API, CSDL, hàng đợi thông điệp** — tức "đi cửa sau", ở tầng logic nghiệp vụ | RPA (tầng giao diện) |
| **Có cỗ máy điều phối trung tâm** ★ | **Workflow engine** nắm trạng thái của **từng thể hiện**, quyết định bước tiếp theo, giao việc và ghi nhật ký | — |

> ★ Đặc điểm thứ ba là **quan trọng nhất**: nó là thứ giữ cho quy trình có **một nguồn sự thật duy nhất** về trạng thái. Không có nó, hệ thống chỉ là một tập script rời rạc.

### 1.4.2 Sáu nhóm năng lực của một giải pháp BPA (dùng để chấm điểm nền tảng)

| # | Năng lực | Nội dung | Ghi chú |
|---|---|---|---|
| 1 | **Mô hình hóa quy trình** | Thường bằng BPMN, để mô hình **vừa là tài liệu vừa chạy được** | Không phải hai bản tách rời |
| 2 | **Điều phối luồng** | Tuần tự, song song, rẽ nhánh, vòng lặp, hẹn giờ, xử lý ngoại lệ | — |
| 3 | **Quản lý việc của con người** | Hộp thư công việc, biểu mẫu, phân công, ủy quyền, **leo thang (escalation)** | Đây là phần RPA không có |
| 4 | **Tích hợp hệ thống** | Connector tới ERP, CRM, email, ngân hàng, dịch vụ web | — |
| 5 | **Quy tắc nghiệp vụ** | **Tách logic quyết định khỏi luồng** để dễ thay đổi (chuẩn DMN) | Khi quy chế chi tiêu đổi, chỉ sửa **bảng quy tắc**, không vẽ lại luồng |
| 6 | **Giám sát và báo cáo** | Dashboard thời gian thực, cảnh báo SLA, dữ liệu cho process mining | — |

> **Cách dùng**: khi đánh giá một nền tảng BPA, **chấm điểm theo sáu nhóm này**, không theo danh sách tính năng do nhà cung cấp đưa ra.

### 1.4.3 Phân loại BPA theo phạm vi (4 cấp)

| Phạm vi | Mô tả | Ví dụ | Rủi ro dự án |
|---|---|---|---|
| **Tác vụ** (task-level) | Tự động **một thao tác** đơn lẻ | Sinh file PDF hợp đồng từ dữ liệu đã nhập | Rất thấp, vài ngày |
| **Quy trình con** (sub-process) | Tự động **một cụm bước** liên quan chặt | Toàn bộ khâu thẩm định hồ sơ trước khi trình duyệt | Thấp–trung bình |
| **Đầu–cuối** (end-to-end) | Tự động **toàn bộ** từ sự kiện khởi phát đến kết quả | O2C | Cao |
| **Liên tổ chức** (inter-organizational) | Tự động cả phần **trao đổi dữ liệu với đối tác** | Kết nối hải quan, ngân hàng, nhà cung cấp | Rất cao, nhiều tháng |

> **Quy luật**: phạm vi càng rộng → giá trị càng lớn **và** rủi ro càng lớn. Thực tiễn tốt: **bắt đầu ở quy trình con có khối lượng lớn**, chứng minh giá trị, rồi mở rộng dần ra đầu–cuối.

### 1.4.4 Phân loại BPA theo mức độ thông minh (ánh xạ sang A0–A5)

| Mức | Bản chất logic | Xử lý dữ liệu phi cấu trúc | ≡ Mức A | Chương liên quan |
|---|---|---|---|---|
| **BPA theo luật** (rule-based) | Nếu–thì **tường minh**, do con người viết | Không | **A3** | Ch.1, Ch.4 |
| **BPA hỗ trợ AI** (AI-augmented) | Luật là chính; AI đảm nhiệm **một số bước**: trích xuất, phân loại, dự đoán | Có, **phạm vi hẹp** | **A4** | Ch.3, Ch.4 |
| **BPA tự trị** (agentic) | **Mục tiêu** được nêu; tác nhân tự lập kế hoạch, chọn công cụ | Có, **phạm vi rộng** | **A5** | Ch.3 |

### 1.4.5 Giá trị BPA mang lại (6 điểm — dùng cho câu hỏi "vì sao đầu tư BPA")

1. **Rút ngắn thời gian chu trình** — bằng cách loại bỏ **thời gian chờ** (70–90% tổng thời gian của quy trình hành chính).
2. **Bảo đảm tuân thủ** — mọi thể hiện đi đúng đường đã thiết kế và **được ghi vết đầy đủ**. Đây là giá trị **lớn nhất** trong tài chính, y tế, giáo dục công.
3. **Chuẩn hóa và giữ tri thức trong hệ thống** — giảm phụ thuộc vào kinh nghiệm cá nhân; người mới không phải học "ai làm gì tiếp theo".
4. **Tạo dữ liệu vận hành** — không có nhật ký sự kiện thì không có process mining, không có cải tiến định lượng.
5. **Nâng cao trải nghiệm khách hàng** — người nộp hồ sơ biết hồ sơ đang ở bước nào, còn bao lâu.
6. **Nâng cao trải nghiệm nhân viên** — không phải nhớ việc, không phải đi hỏi hồ sơ đang ở đâu.

> Điểm 5 và 6 **thường bị bỏ quên khi tính ROI**, dù chúng quyết định việc hệ thống **có được dùng thật hay không**.

---

## 1.5 Tự động hóa quy trình bằng robot (RPA)

### 1.5.1 Định nghĩa và ba từ khóa dễ hiểu nhầm

> **RPA** = công nghệ dùng các **chương trình phần mềm (bot)** để **mô phỏng thao tác của con người trên GIAO DIỆN NGƯỜI DÙNG** của các ứng dụng.

Bot làm được: mở ứng dụng – đọc màn hình – nhập liệu – sao chép/dán – tải tệp – gửi email.

| Chữ | Hiểu nhầm phổ biến | Thực tế |
|---|---|---|
| **R** — "Robot" | Robot vật lý | **KHÔNG** phải robot vật lý. Là **tiến trình phần mềm** trên máy trạm/máy chủ, không tay chân, không cảm biến |
| **P** — "Process" | Toàn bộ quy trình | Đối tượng thường là **quy trình con hoặc chuỗi tác vụ**. RPA hiếm khi tự động được toàn bộ quy trình **đầu–cuối** vì luôn có bước cần phán đoán/thẩm quyền |
| **A** — "Automation" | Có khả năng học | Bot tuân theo **kịch bản do con người định nghĩa**. RPA truyền thống **KHÔNG có khả năng học**. Muốn học phải ghép thêm AI (Chương 3) |

> **Cách gọi trung thực hơn**: *"tự động hóa thao tác giao diện theo kịch bản"*. Ít hấp dẫn hơn nhưng đúng bản chất — và đây chính là nội dung câu hỏi "vì sao kỳ vọng quá mức rồi thất vọng".

### 1.5.2 Hai đường vào hệ thống: cửa trước và cửa sau

| Tầng | Nội dung | Ai dùng |
|---|---|---|
| **Tầng trình bày** (presentation) | Giao diện người dùng — nhấp chuột, đọc ô, gõ phím | **RPA** — "đi cửa trước" |
| **Tầng ứng dụng** (application) | Logic nghiệp vụ, API, dịch vụ web, hàng đợi thông điệp | **BPA** — "đi cửa sau" |
| **Tầng dữ liệu** (data) | CSDL — nơi trạng thái thật sự được lưu | Cả hai đều có thể chạm tới |

| | **RPA (cửa trước)** | **BPA (cửa sau)** |
|---|---|---|
| Ưu điểm | **Không cần hệ thống đích hỗ trợ gì** — chạy được với phần mềm cũ không có API | **Ổn định hơn nhiều** vì API thay đổi chậm và có phiên bản |
| Nhược điểm | **Phụ thuộc vào vị trí và thuộc tính** của từng phần tử giao diện | Đòi hỏi hệ thống đích **phải mở giao diện tích hợp** |

> **Hệ quả trực tiếp**: RPA triển khai nhanh, không cần sửa hệ thống lõi — **nhưng dễ hỏng khi giao diện thay đổi**.

### 1.5.3 Bảy điều kiện để một tác vụ phù hợp với RPA (bảng phải thuộc)

| # | Điều kiện | Vì sao | Dấu hiệu **vi phạm** (khi đó RPA sẽ thất bại) |
|---|---|---|---|
| 1 | **Khối lượng lớn và lặp lại** | ROI dương **sau khi trừ chi phí bảo trì**; lợi ích tỷ lệ với số lần chạy | Chạy vài lần/năm → không bao giờ hoàn vốn |
| 2 | **Dựa trên luật rõ ràng** | Phải mô tả được đầy đủ bằng if–then | Cần "cảm nhận", "ước lượng", "tùy tình huống" |
| 3 | **Dữ liệu đầu vào có cấu trúc, dạng số** | Bot đọc được ô, bảng, CSV | Ảnh chụp, chữ viết tay, email tự do → cần OCR/AI trước |
| 4 | **Quy trình ổn định** | Bot "ký hợp đồng ngầm" với giao diện | Giao diện/phiên bản nâng cấp liên tục |
| 5 | **Tỷ lệ ngoại lệ thấp** | Nếu 40% hồ sơ phải xử lý ngoại lệ, bot chỉ giải quyết phần nhỏ | Ngoại lệ > ~20% → xem lại thiết kế quy trình |
| 6 | **Nhiều hệ thống, KHÔNG có API** ("ghế xoay" — swivel chair) | Đây là **kịch bản kinh điển** và là nơi RPA tạo giá trị rõ nhất: đọc ở A rồi gõ lại vào B | Hệ thống đã có API tốt → **dùng tích hợp trực tiếp** |
| 7 | **Ít phụ thuộc bối cảnh và cảm xúc** | Không đòi thương lượng, đồng cảm, sáng tạo | Bước chăm sóc khách hàng khó tính, đàm phán giá |

**Cách dùng bộ tiêu chí**: chấm **0–1–2 điểm** cho từng tiêu chí; điểm càng cao, khả năng thành công càng lớn.

> **Ba lưu ý cực quan trọng (hay bị bỏ qua):**
> 1. Điều kiện **6** là *điều kiện lý tưởng* của RPA, nhưng cũng chính là **nguồn rủi ro bảo trì**: không có API nghĩa là phải bám vào giao diện, mà giao diện thì thay đổi.
> 2. Bảy tiêu chí này đánh giá **TÁC VỤ**, không đánh giá **quy trình**. Một quy trình có thể chứa vài tác vụ điểm cao và nhiều tác vụ điểm thấp.
> 3. **Điều kiện 6 và điều kiện 3, 5 thường xung đột với nhau trong thực tế** — đó là lý do cần chấm điểm có trọng số chứ không đếm số tiêu chí đạt.

### 1.5.4 Khi nào KHÔNG nên dùng RPA (chống chỉ định)

| Tình huống | Vì sao không nên |
|---|---|
| **Quy trình vốn đã sai và cần thiết kế lại** | Tự động hóa lãng phí chỉ làm lãng phí **nhanh hơn và khó nhìn thấy hơn** — nó biến mất khỏi tầm mắt người quản lý |
| **Hệ thống đích đã có API tốt** | Tích hợp trực tiếp **rẻ hơn và bền hơn nhiều**. Không có lý do gì để bot giả làm người dùng khi có cửa sau hợp lệ |
| **Tần suất quá thấp** | Chi phí xây dựng + bảo trì bot không bao giờ hoàn lại |
| **Dữ liệu phi cấu trúc là chủ yếu** | Ngoài khả năng RPA thuần → cần Chương 3 |

> ★ **"Paving the cow path"** — *lát đường cho lối mòn của bò*: đổ nhựa lên lối mòn quanh co do đàn bò đi mãi thành đường, thay vì làm con đường thẳng. Đường đẹp hơn, đi nhanh hơn — **nhưng vẫn quanh co và vẫn dài gấp đôi mức cần thiết**.
>
> Áp vào tự động hóa: giữ nguyên một quy trình vô lý rồi dùng bot chạy nó nhanh hơn. **Vấn đề gốc không được giải quyết, và giờ nó còn được cố định lại bằng phần mềm.**
>
> Phòng tránh: **luôn hoàn thành giai đoạn 3 và 4** của vòng đời BPM trước khi chọn công cụ.

### 1.5.5 Bảng BPA–RPA (bảng "phải thuộc" của đề cương + 3 dòng bổ sung)

| Tiêu chí | **BPA** | **RPA** | Vì sao khác nhau (bản chất) |
|---|---|---|---|
| **Tầng tương tác** | Ứng dụng / dữ liệu (**API, CSDL**) | **Giao diện người dùng** | API là hợp đồng có phiên bản; giao diện là bề mặt thay đổi liên tục |
| **Đối tượng** | **Quy trình đầu–cuối** | **Tác vụ, quy trình con** | RPA không điều phối được trạng thái toàn quy trình |
| **Triển khai** | **Hàng tháng** | **Hàng tuần** | BPA cần phân tích, thiết kế lại, tích hợp, kiểm thử, chuyển đổi |
| **Bảo trì** | **Trung bình** | **Cao** (dễ vỡ khi UI đổi) | Selector bám vào thuộc tính phần tử giao diện |
| **Tác động thiết kế** | **Thiết kế lại quy trình** | **Giữ nguyên quy trình** | RPA "đóng băng" quy trình cũ, kể cả bước dư thừa |
| *(bổ sung)* Yêu cầu thay đổi hệ thống lõi | Thường **có** | **Hầu như không** | — |
| *(bổ sung)* Chi phí đầu tư ban đầu | **Cao** | **Thấp – trung bình** | — |
| *(bổ sung)* Rủi ro đặc thù | Dự án kéo dài, **phạm vi phình to** | **Nợ kỹ thuật, "bot farm" khó quản trị** | — |

> ★ **Hai công nghệ BỔ SUNG, không thay thế nhau**: BPA điều phối luồng tổng thể, và **gọi bot RPA như một "tác nhân"** để xử lý những hệ thống cũ không có API.
>
> **Câu hỏi bẫy kinh điển**: *"Công ty muốn tự động hóa toàn bộ quy trình từ đầu đến cuối, thay đổi cách làm việc"* → **BPA**. *"Bot làm đúng các bước nhân viên đang làm, không đổi quy trình"* → **RPA**.

### 1.5.6 Kiến trúc bốn khối của hệ thống RPA

```
① STUDIO (phát triển)  →  ② ORCHESTRATOR (điều khiển)  →  ③ BOT (thực thi)  →  ④ HỆ THỐNG ĐÍCH
   recorder, kéo-thả,          kho quy trình, lịch,            attended/unattended      ERP, CRM, web,
   selector                    hàng đợi, vault, log                                    Excel, app cũ
```

#### Khối 1 — Studio (môi trường phát triển)

Ba cơ chế xây dựng: **ghi hình thao tác** (recorder — nhanh nhưng kịch bản sinh ra cần dọn dẹp), **thiết kế trực quan** (kéo-thả activity — về bản chất rất gần tư duy BPMN), **viết mã bổ trợ** (VB, C#, Python, JS).

★ **Selector — điểm quyết định độ bền của bot**: Studio phải xác định một nút/ô nhập theo thuộc tính: `id`, `class`, tên cửa sổ, **tọa độ**, hoặc **hình ảnh**.
- Selector dựa trên `id` ổn định → **sống sót** qua nhiều lần cập nhật.
- Selector dựa trên **tọa độ/hình ảnh** → **hỏng ngay** khi bố cục thay đổi.

> **Chất lượng selector quyết định chi phí bảo trì của toàn bộ dự án RPA về sau.** Đây là câu trả lời cho "vì sao bảo trì RPA cao".

#### Khối 2 — Orchestrator (trung tâm điều khiển) — 6 thành phần

| Thành phần | Nội dung |
|---|---|
| **Kho quy trình & phiên bản** | Lưu gói bot đã xuất bản, cho phép **quay lại phiên bản trước** |
| **Lập lịch & kích hoạt** | Theo thời gian, theo sự kiện, hoặc **theo yêu cầu từ hệ thống BPA** |
| **Hàng đợi giao dịch** (queue) | Chia khối lượng thành các mục để **nhiều bot chạy song song** và **xử lý lại mục lỗi** |
| ★ **Kho bí mật** (credential vault) | Lưu tài khoản/mật khẩu bot dùng để đăng nhập hệ thống đích — **điểm nhạy cảm nhất về an ninh** |
| **Phân quyền & kiểm toán** | Ai được **xuất bản**, ai được **chạy**, ai **xem nhật ký** — mọi thao tác để lại dấu vết |
| **Nhật ký & dashboard** | Số giao dịch thành công/thất bại, thời gian xử lý trung bình, giờ công tiết kiệm |

> ★ **Vì sao credential vault là điểm nhạy cảm nhất?** Vì bot thường được cấp **quyền cao** để thao tác trên **nhiều hệ thống**. Một tài khoản bot bị lộ = **lộ toàn bộ các hệ thống đó cùng lúc**. Đây là câu hỏi gần như chắc chắn có trong đề.

#### Khối 3 — Bot thực thi: attended vs unattended

| Tiêu chí | **Attended** (có giám sát) | **Unattended** (không giám sát) |
|---|---|---|
| Nơi chạy | Máy tính **của nhân viên** | **Máy chủ / máy ảo** |
| Cách kích hoạt | **Nhân viên bấm nút** | **Theo lịch hoặc theo sự kiện** |
| Thời gian hoạt động | Trong giờ làm việc | **24/7** |
| Tình huống dùng | Hỗ trợ tổng đài viên **ngay trong lúc gọi** | Đối soát dữ liệu **ban đêm** |
| Xử lý ngoại lệ | **Con người xử lý ngay** khi bot dừng | **Phải có cơ chế bắt lỗi và cảnh báo tự động** |
| Mức A tương ứng | A2 | A3 |

> **Cách chọn**: attended khi công việc **gắn với một người cụ thể tại một thời điểm** (bot = trợ lý cá nhân). Unattended khi công việc **chạy theo lô, khối lượng lớn, không cần ai có mặt** — tiết kiệm rõ rệt nhất nhưng đòi hạ tầng, giám sát, quy trình xử lý sự cố nghiêm túc hơn.

#### Khối 4 — Hệ thống đích + ba thành phần mở rộng (cầu nối sang Chương 3)

| Mở rộng | Vai trò |
|---|---|
| **OCR / Document Understanding** | Đọc tài liệu quét, bán cấu trúc → **cầu nối đầu tiên giữa RPA và AI** |
| **Action Center** | Hàng đợi xử lý ngoại lệ **có con người tham gia**; bot không đủ tự tin → đẩy sang người → trả lại luồng tự động. **Đây là hiện thân kỹ thuật của "human-in-the-loop"** |
| **Task Mining** | Tự động phát hiện thao tác lặp đáng tự động hóa bằng cách **quan sát hành vi thật** trên máy nhân viên |

### 1.5.7 Bốn hạn chế của RPA truyền thống (nền cho Chương 3)

| Hạn chế | Bản chất | Hệ quả |
|---|---|---|
| **Tính giòn** (brittleness) | Bot **không hiểu ý nghĩa** giao diện, chỉ tìm đúng phần tử theo selector | Một thay đổi nhỏ về vị trí/thuộc tính nút bấm → bot dừng ngay |
| **Không thay đổi bản chất quy trình** | RPA **che giấu** vấn đề thay vì giải quyết | Quy trình vẫn nguyên bước thừa, chỉ là máy làm → **cải tiến thật sự về sau khó hơn** vì không còn ai thấy khó chịu |
| **Nợ kỹ thuật & rủi ro quản trị** | Hàng trăm bot do nhiều bộ phận tự tạo | Quản lý phiên bản, quyền, tài khoản bot trở thành **rủi ro an ninh nghiêm trọng** |
| **Không xử lý dữ liệu phi cấu trúc** | Ảnh chụp, chữ viết tay, email tự do | Chính giới hạn này **sinh ra** tự động hóa thông minh (Chương 3) |

### 1.5.8 Vòng đời một dự án RPA (7 bước — khớp vòng đời BPM)

| # | Bước | Nội dung |
|---|---|---|
| 1 | **Đánh giá khả thi & ROI** | Đối chiếu **bảy tiêu chí**; ước lượng khối lượng, tần suất, chi phí hiện tại |
| 2 | **Phân tích chi tiết tác vụ** | Lập **Process Definition Document** — từng thao tác, từng màn hình, từng ngoại lệ |
| 3 | **Phát triển bot trong Studio** | Dựng kịch bản, đặt selector, xử lý ngoại lệ, ghi nhật ký |
| 4 | **Kiểm thử trên môi trường giống thật** | Dữ liệu thật/gần thật; đo tỷ lệ thành công trên **toàn bộ các nhánh** |
| 5 | **Xuất bản lên Orchestrator** | Đóng gói, phân quyền, cấu hình lịch, hàng đợi |
| 6 | **Vận hành & giám sát** | Dashboard, xử lý mục lỗi trong hàng đợi |
| 7 | **Bảo trì khi hệ thống đích thay đổi** | Cập nhật selector và kịch bản sau mỗi lần nâng cấp giao diện |

> ★ **Giai đoạn 7 — bảo trì — thường chiếm PHẦN LỚN tổng chi phí sở hữu (TCO).** Đây là thực tế phải đưa vào bài toán ROI **ngay từ bước 1**. Nếu tính ROI chỉ bằng chi phí xây dựng ban đầu, con số sẽ sai nghiêm trọng.

---

## 1.6 Tóm tắt trọng tâm — bảng "phải thuộc lòng"

| # | Nội dung | Dạng câu hỏi |
|---|---|---|
| 1 | 3 đặc trưng: **có trật tự – xuyên chức năng – hướng kết quả** | "Đặc trưng nào giải thích thời gian chờ?" → xuyên chức năng |
| 2 | **Quy trình vs thể hiện**: mô hình vs một lần chạy | "Chậm ở mô hình hay ở thể hiện?" |
| 3 | **as-documented ≠ as-is**; to-be là kết quả thiết kế lại | Tài liệu 5 bước, thực tế 9 bước |
| 4 | **A0–A5**: thủ công → hỗ trợ số → luật có người → luật không người → thông minh → tự trị | "Mức nào phù hợp với…" |
| 5 | Hai nguyên tắc: **cao hơn ≠ tốt hơn**; **một quy trình trải nhiều mức** | "Quy trình này đạt A3" → sai |
| 6 | In/on/out-of-the-loop chọn theo **thiệt hại** và **đảo ngược** | "Chuyển tiền → mô hình nào?" |
| 7 | Vòng đời 6 giai đoạn + **tự động hóa chỉ là 1 đòn bẩy ở giai đoạn 4** | "Dự án thất bại vì bỏ giai đoạn nào?" |
| 8 | **BPA: API, đầu–cuối, hàng tháng, bảo trì TB, thiết kế lại** | Bảng 5 dòng |
| 9 | **RPA: UI, tác vụ, hàng tuần, bảo trì cao, giữ nguyên** | Bảng 5 dòng |
| 10 | **7 điều kiện RPA** — đặc biệt #6 "ghế xoay" | Chấm điểm tác vụ |
| 11 | **Kiến trúc 4 khối**; **credential vault = nhạy cảm nhất** | "Điểm yếu an ninh lớn nhất?" |
| 12 | **Bảo trì = phần lớn TCO** | "Vì sao ROI RPA hay bị tính sai?" |

---

## 1.7 Thuật ngữ chương 1

| Tiếng Việt | Tiếng Anh |
|---|---|
| Quy trình nghiệp vụ | Business process |
| Thể hiện quy trình | Process instance / case |
| Vòng đời quản lý quy trình | BPM lifecycle |
| Khám phá quy trình | Process discovery |
| Khai phá quy trình | Process mining |
| Thiết kế lại quy trình | Process redesign |
| Thời gian chu trình | Cycle time |
| Nút cổ chai | Bottleneck |
| Điểm bàn giao | Handoff |
| Tự động hóa quy trình doanh nghiệp | Business Process Automation (BPA) |
| Tự động hóa quy trình bằng robot | Robotic Process Automation (RPA) |
| Cỗ máy điều phối quy trình | Process / workflow engine |
| Quy tắc nghiệp vụ | Business rules |
| Trung tâm điều khiển | Orchestrator / Control room |
| Bot có giám sát / không giám sát | Attended / Unattended bot |
| Kho bí mật | Credential vault |
| Hàng đợi giao dịch | Transaction queue |
| Con người trong vòng lặp | Human-in-the-loop |
| Tình huống "ghế xoay" | Swivel chair |
| Lát đường cho lối mòn của bò | Paving the cow path |
| Tổng chi phí sở hữu | Total Cost of Ownership (TCO) |

---

## 1.8 Các dạng câu hỏi có thể xuất hiện + bẫy

### Dạng 1 — "Đặc trưng nào…" (tìm nguyên nhân)
**Mẫu**: "Thời gian chờ chiếm 80% thời gian chu trình của một quy trình cấp giấy xác nhận. Đặc trưng nào của quy trình nghiệp vụ giải thích trực tiếp hiện tượng này?"
→ Đáp án phải là **tính xuyên chức năng** (sinh ra handoff), **không** phải "tính có trật tự" hay "thiếu công nghệ".

### Dạng 2 — "Mức tự động hóa nào phù hợp" (tình huống)
**Mẫu**: "Một trường hợp duyệt học bổng chỉ chạy 2 đợt/năm, hồ sơ ít, nhưng mỗi quyết định ảnh hưởng quyền lợi sinh viên. Nên đầu tư tới mức nào?"
→ Đáp án: **A1–A2 cho phần xử lý, A1 (thực chất thủ công có hỗ trợ) cho phần quyết định**. Mọi phương án "đẩy lên A4/A5" đều sai vì **tần suất thấp + thiệt hại cao + không đảo ngược**.

### Dạng 3 — So sánh BPA/RPA
**Mẫu**: "Hai phương án được đề xuất cho cùng một bước: (a) gọi API của hệ thống đào tạo; (b) bot đăng nhập và nhập liệu như nhân viên. Kết luận nào đúng?"
→ Nếu **hệ thống đã có API đầy đủ** → (a) là **tích hợp trực tiếp**, rẻ hơn, bền hơn; (b) vi phạm **chống chỉ định** của RPA.

### Dạng 4 — Tìm nguyên nhân thất bại
**Mẫu**: "Sau 6 tháng triển khai RPA, công ty thấy thời gian chu trình gần như không đổi. Nguyên nhân khả dĩ nhất?"
→ **Thời gian chờ ở các điểm bàn giao, không phải thời gian xử lý** — bot chỉ tăng tốc phần nhỏ. Hoặc: **tự động hóa một quy trình chưa được thiết kế lại** (paving the cow path).

### Ba cái bẫy phải nhớ

> **Bẫy 1**: "RPA là phiên bản hiện đại/thay thế của BPA." → **SAI**. Hai tầng khác nhau, **bổ sung** nhau.
>
> **Bẫy 2**: "Tự động hóa ở mức cao nhất luôn mang lại hiệu quả cao nhất." → **SAI**. Chi phí, bảo trì, rủi ro tăng theo mức; tần suất thấp thì mức thấp tốt hơn.
>
> **Bẫy 3**: "As-documented chính là as-is nếu quy chế được cập nhật đầy đủ." → **SAI**. Con người luôn có lối tắt; chỉ **quan sát + log** mới thấy as-is.

---

## 1.9 Câu hỏi tự luyện (12 câu — có đáp án và giải thích)

**Câu 1.** Phòng Công tác sinh viên nói: "Quy trình xác nhận sinh viên của trường gồm 4 bước, đúng quy chế." Trong khi khảo sát cho thấy nhân viên thực tế làm 7 bước, có 2 bước trao đổi qua Zalo cá nhân. Hiện tượng này minh họa cho:
A. Quy trình khác thể hiện quy trình
B. Khoảng lệch giữa as-documented và as-is
C. Sự khác biệt giữa to-be và as-is
D. Tính xuyên chức năng của quy trình

**Câu 2.** Một quy trình gồm: (1) AI đọc ảnh hóa đơn và trích xuất số tiền; (2) phần mềm kế toán tự ghi nhận; (3) kế toán trưởng duyệt khoản chi trên 50 triệu. Mô tả nào đúng nhất?
A. Quy trình đạt mức A4 vì có AI
B. Quy trình đạt mức A3 vì phần lớn tự động
C. Ba bước nằm ở ba mức khác nhau: A4, A3, và mức thấp cho bước duyệt
D. Quy trình không thể định vị trên phổ A0–A5

**Câu 3.** Vì sao một quy trình chạy 5 lần mỗi năm thường KHÔNG nên tự động hóa ở mức cao?
A. Vì công nghệ chưa hỗ trợ được tần suất thấp
B. Vì chi phí xây dựng và bảo trì không hoàn vốn trên số lần chạy ít
C. Vì quy trình tần suất thấp luôn có nhiều ngoại lệ
D. Vì mức tự động hóa cao làm mất khả năng kiểm toán

**Câu 4.** Một ngân hàng tự động gắn nhãn giao dịch đáng ngờ, sau đó chuyên viên rà soát **tất cả** các trường hợp bị gắn nhãn trước khi báo cáo cơ quan quản lý. Mô hình nào đang được áp dụng?
A. Human-out-of-the-loop
B. Human-on-the-loop
C. Human-in-the-loop
D. Không thuộc mô hình nào vì có hai bước

**Câu 5.** Một bệnh viện mua phần mềm RPA trước, sau đó mới đi tìm quy trình để áp dụng, và sau 1 năm không đạt ROI. Nguyên nhân gốc phù hợp nhất với vòng đời BPM là:
A. Thiếu giai đoạn giám sát
B. Nhảy từ giai đoạn xác định sang giai đoạn triển khai, bỏ qua khám phá – phân tích – thiết kế lại
C. Công cụ RPA không phù hợp với bệnh viện
D. Thiếu nhân lực kỹ thuật

**Câu 6.** Đặc điểm nào phân biệt BPA với tự động hóa cục bộ một cách rõ nhất?
A. BPA dùng công nghệ đám mây
B. BPA có cỗ máy điều phối trung tâm nắm trạng thái từng thể hiện
C. BPA luôn rẻ hơn RPA
D. BPA không cần con người

**Câu 7.** Một tác vụ: đọc dữ liệu từ phần mềm cũ (không có API), rồi nhập vào hệ thống ERP mới, thực hiện 400 lần/ngày, luật rõ ràng, ít ngoại lệ. Kết luận nào đúng nhất?
A. Nên dùng BPA vì đối tượng là quy trình
B. Nên dùng RPA vì đây là kịch bản "ghế xoay" điển hình, đạt nhiều tiêu chí trong 7 điều kiện
C. Không nên tự động hóa vì hệ thống cũ không có API
D. Nên dùng AI Agent vì có hai hệ thống

**Câu 8.** Bảy điều kiện phù hợp RPA được dùng để đánh giá:
A. Toàn bộ quy trình đầu–cuối
B. Từng tác vụ
C. Năng lực của nhà cung cấp
D. Mức độ sẵn sàng của tổ chức

**Câu 9.** Trong kiến trúc RPA, thành phần nào được coi là điểm nhạy cảm nhất về an ninh?
A. Studio, vì chứa toàn bộ kịch bản
B. Credential vault, vì tập trung tài khoản bot có quyền cao trên nhiều hệ thống
C. Hàng đợi giao dịch, vì chứa dữ liệu giao dịch
D. Hệ thống đích, vì là nơi lưu dữ liệu thật

**Câu 10.** Vì sao bảo trì thường chiếm phần lớn tổng chi phí sở hữu của một dự án RPA?
A. Vì bot cần được huấn luyện lại bằng dữ liệu mới
B. Vì bot phụ thuộc vào selector bám vào giao diện, mà giao diện thay đổi thường xuyên
C. Vì nhà cung cấp tăng giá thuê bao hằng năm
D. Vì mỗi bot cần một máy chủ riêng

**Câu 11.** "Paving the cow path" trong tự động hóa có nghĩa là:
A. Tự động hóa từng bước nhỏ trước khi tự động hóa toàn quy trình
B. Dùng bot để chạy nhanh một quy trình vốn đã quanh co, thay vì thiết kế lại nó
C. Xây dựng lộ trình tự động hóa theo từng giai đoạn
D. Chuẩn hóa dữ liệu trước khi tự động hóa

**Câu 12.** Một quy trình có 70–90% thời gian là chờ đợi tại các điểm bàn giao. Can thiệp nào mang lại hiệu quả lớn nhất **trước khi** nghĩ đến tự động hóa?
A. Mua công cụ RPA để nhập liệu nhanh hơn
B. Loại bỏ bước không tạo giá trị, gộp bước và song song hóa để giảm số lần bàn giao
C. Tăng số nhân viên ở mỗi phòng ban
D. Đưa toàn bộ quy trình lên mức A4

---

### Đáp án

| Câu | Đáp án | Giải thích |
|---|---|---|
| 1 | **B** | Quy chế = as-documented; thực tế 7 bước + Zalo = as-is. Đây đúng là khoảng lệch as-documented ≠ as-is. A sai vì không phải chuyện mô hình vs một lần chạy; C sai vì to-be là tương lai; D đúng nhưng không phải hiện tượng được mô tả |
| 2 | **C** | Nguyên tắc 2 của phổ: **một quy trình trải trên nhiều mức**. A và B đều mắc lỗi gán một mức cho toàn quy trình |
| 3 | **B** | Nguyên tắc 1: chi phí xây dựng + bảo trì + rủi ro tăng theo mức. ROI phụ thuộc **tần suất**. A, C, D là các lý do bịa |
| 4 | **C** | Có người **phê duyệt trước khi hành động có hiệu lực** (báo cáo cơ quan quản lý) = in-the-loop. Nếu chỉ lấy mẫu kiểm tra mới là on-the-loop |
| 5 | **B** | Đúng mô tả "giải pháp đi tìm vấn đề": nhảy từ (1) sang (5), bỏ (2)(3)(4) |
| 6 | **B** | Ba đặc điểm của BPA, nhưng đặc điểm **quan trọng nhất** là cỗ máy điều phối trung tâm — nguồn sự thật duy nhất về trạng thái |
| 7 | **B** | Điều kiện 6 ("ghế xoay") + 1 (khối lượng) + 2 (luật rõ) + 5 (ít ngoại lệ) đều đạt. A sai vì đối tượng là **tác vụ**, không phải đầu–cuối. C sai: không có API chính là **lý do dùng** RPA. D sai: không cần phán đoán |
| 8 | **B** | Bảy tiêu chí đánh giá **tác vụ**. Đây là bẫy rất hay ra: "đánh giá quy trình" → sai |
| 9 | **B** | Bot thường có quyền cao trên nhiều hệ thống; lộ một tài khoản = lộ nhiều hệ thống cùng lúc |
| 10 | **B** | Bản chất "giòn" của RPA: selector bám vào giao diện. A sai: RPA **không học** |
| 11 | **B** | Định nghĩa chính xác. Lưu ý: phương án A nghe hợp lý nhưng đó là "triển khai tăng dần", không phải paving the cow path |
| 12 | **B** | Thời gian chờ sinh ra từ **bàn giao**; giảm bàn giao là đòn bẩy 1–3 trong 5 hướng thiết kế lại, phải làm **trước** đòn bẩy 5 (tự động hóa) |

---

*Tiếp theo: `02-Chuong2.md` — chương có trọng số lớn nhất, chứa toàn bộ 12 câu đọc sơ đồ của Phần II.*
