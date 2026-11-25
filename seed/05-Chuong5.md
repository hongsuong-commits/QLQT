# CHƯƠNG 5 — VIBE CODING: XÂY DỰNG ỨNG DỤNG BẰNG AI

> **Vị trí trong đề**: khoảng **3–4 câu Phần I**. Đề ra chủ yếu ở dạng **tình huống thất bại** ("vì sao dự án này hỏng?"), **phân biệt khái niệm** (Vibe Coding vs kỹ thuật phần mềm có AI hỗ trợ) và **liên chương** (Chương 2 ↔ Chương 5).
>
> **Sợi chỉ đỏ của chương**: ***Nếu AI viết phần lớn mã, NĂNG LỰC GÌ của con người còn lại là KHÔNG THỂ THAY THẾ?***
>
> **Câu trả lời của chương — và là câu chốt của cả học phần**: **năng lực hiểu và ĐÁNH GIÁ quy trình nghiệp vụ** — thứ đã rèn từ Chương 2.

---

## 5.0 Bản đồ chương và mạch nối từ Chương 4

```
CHƯƠNG 1–4 đã cho:                              CHƯƠNG 5 trả lời:
• Ch.1 hiểu quy trình là gì, tự động hóa mức nào → • Khi nào no-code KHÔNG CÒN ĐỦ
• Ch.2 mô tả quy trình bằng BPMN = ĐẶC TẢ      → • Vì sao năng lực PHÂN TÍCH QUY TRÌNH là
• Ch.3 bước nào luật, AI, người                    ĐIỀU KIỆN để dùng AI sinh mã hiệu quả
• Ch.4 workflow chạy thật, có xử lý lỗi        → • Quy trình an toàn làm việc với AI (IDEA)
                                                  • 12 cách dự án thất bại + cách phòng
```

```
5.1 TƯ DUY VÀ KHUNG LÀM VIỆC              5.2 KỶ LUẬT THỰC HÀNH
 • Vibe Coding: 2 nghĩa, phổ C0–C5          • Agentic Coding CLI + thiết lập an toàn
 • Hai trục: tự chủ ↔ kiểm chứng            • Vòng làm việc chuẩn, plan mode
 • FAAFO + "vấn đề 70%"                     • 12 mẫu thất bại F1–F12
 • 6 lý do tư duy BPM là nền tảng           • 4 lỗ hổng bảo mật điển hình
 • 5 nhóm công cụ + 4 quyết định kiến trúc  • 6 tiêu chí "hoàn thành"
 • Khung IDEA (I–D–E–A)
```

> **Hai câu của bài giảng tóm gọn cả chương**: **"Mục 5.1 là TƯ DUY VÀ KHUNG LÀM VIỆC; Mục 5.2 là KỶ LUẬT THỰC HÀNH. Đồ án cuối kỳ (Thành phần 3, 60%) đòi hỏi CẢ HAI."**
>
> **Và một câu quan trọng về bản chất chương**: **"Đây KHÔNG phải chương học một CÔNG CỤ MỚI. Đây là chương VẬN DỤNG LẠI TOÀN BỘ TƯ DUY QUY TRÌNH đã học, ở một bối cảnh mới: lập trình cùng AI."**
>
> ★ **Hệ quả cho cách học**: đề thi của chương này **hầu như không hỏi thao tác công cụ**. Đề hỏi **nguyên nhân thất bại**, **so sánh khái niệm**, và **vì sao kỹ năng Chương 2 lại quyết định thành công ở Chương 5**.

### Ẩn dụ mở đầu chương — nhà bếp thương mại (phải nhớ, vì đề hay dùng lại)

> **"Người lập trình cùng AI không còn là ĐẦU BẾP thực hiện từng thao tác — mà là BẾP TRƯỞNG: ra thực đơn, phân công, nếm thử, chịu trách nhiệm về món ăn dọn ra."**

| Vai | Nội dung | Ý nghĩa trong lập trình |
|---|---|---|
| **Bếp trưởng KHÔNG tự tay làm mọi món** | Nhưng phải biết **rõ mỗi món cần nguyên liệu gì, nấu bao lâu** | Người không cần gõ từng dòng mã, **nhưng phải biết hệ thống cần gì** |
| ★ **Phải NẾM THỬ trước khi dọn ra** | **"Không thể chỉ tin lời đầu bếp nói 'xong rồi'"** | ★ **Phải ĐỌC DIFF và CHẠY KIỂM THỬ** — không tin lời AI |
| **Nếu bếp trưởng KHÔNG biết nấu ăn** | Nhà bếp ra món **nhanh trong ngày đầu** — nhưng **không ai phát hiện món nào thiếu muối, chưa chín** cho đến khi **khách phàn nàn** | ★ Đây chính là **"vấn đề 70%"**: nhanh ở 70% đầu, **hỏng âm thầm ở 30% sau**, chỉ lộ khi có người dùng thật |

> ★ **Ẩn dụ này trả lời trực tiếp câu hỏi "AI viết mã rồi thì cần gì học quản lý quy trình?"**: người **không biết nấu** vẫn **thuê được đầu bếp**, nhưng **không thể** (a) **viết thực đơn đúng**, (b) **phát hiện món hỏng**, (c) **chịu trách nhiệm với khách**. **Ba việc đó chính là ba việc của người hiểu quy trình.**

---

## 5.1 Khái niệm No-code × AI và Vibe Coding

### 5.1.1 Vibe Coding — nguồn gốc, hai cách hiểu, và phổ AI Coding

#### Định nghĩa gốc (phải nhớ cả NGUỒN GỐC, vì đề hay hỏi)

> **Thuật ngữ do Andrej Karpathy đưa ra ĐẦU NĂM 2025**: **lập trình viên MÔ TẢ điều mình muốn bằng NGÔN NGỮ TỰ NHIÊN, để AI sinh mã, CHẤP NHẬN kết quả mà GẦN NHƯ KHÔNG ĐỌC TỪNG DÒNG, và tiếp tục điều chỉnh bằng ĐỐI THOẠI.**
>
> **Khẩu hiệu gốc**: ***"Buông mình theo dòng chảy sáng tạo, quên rằng mã tồn tại."***

**Vì sao định nghĩa này GÂY TRANH CÃI — hai lý do độc lập:**

| # | Lý do | Nội dung |
|---|---|---|
| **1** | **Cách hiểu LAN RẤT NHANH** | Thuật ngữ bị dùng để **mô tả CẢ những dự án LỚN, CÓ NGƯỜI DÙNG THẬT** — nơi **"không đọc mã" là RỦI RO NGHIÊM TRỌNG**, không phải phong cách làm việc |
| **2** | ★ **Bối cảnh gốc KHÁC bối cảnh đồ án** | Karpathy mô tả việc **TỰ MÌNH làm một dự án CÁ NHÂN NHỎ, KHÔNG AI KHÁC PHỤ THUỘC vào nó**. Trong bối cảnh đó, "không đọc mã" là **lựa chọn hợp lý** — nhưng **bối cảnh đó KHÔNG PHẢI bối cảnh của đồ án cuối kỳ** |

> ★ **Đây là câu trả lời mẫu cho câu hỏi "Vibe Coding có phải là cách làm sai không?"**: **Không sai — nó đúng TRONG BỐI CẢNH CỦA NÓ.** Vấn đề là **người ta bê nguyên phương pháp của một bối cảnh sang bối cảnh khác** mà không đổi mức kỷ luật. **Cùng một công cụ, khác mức trách nhiệm → khác mức kỷ luật.**

#### Hai cách hiểu phải phân biệt rõ — bảng NĂM tiêu chí ★

| Tiêu chí | **Vibe Coding (nghĩa GỐC)** | **Kỹ thuật phần mềm có AI hỗ trợ** |
|---|---|---|
| **Mức đọc mã** | ★ **KHÔNG ĐỌC, hoặc ĐỌC LƯỚT** | ★ **ĐỌC, HIỂU và CHỊU TRÁCH NHIỆM từng thay đổi** |
| **Tài liệu thiết kế** | **KHÔNG CÓ** | **CÓ đặc tả, CÓ bản thiết kế** |
| **Kiểm thử** | **Thử THỦ CÔNG** | **Kiểm thử TỰ ĐỘNG, REVIEW MÃ** |
| **Mục tiêu** | **NHANH, KHÁM PHÁ** | **ĐÁNG TIN CẬY, BẢO TRÌ ĐƯỢC** |
| **Phù hợp với** | **Nguyên mẫu, công cụ CÁ NHÂN, thử ý tưởng** | **Sản phẩm DÙNG THẬT, CÓ NGƯỜI DÙNG KHÁC** |

**Nhầm lẫn hai khái niệm này gây HAI hậu quả (câu hỏi ôn tập số 1 hỏi đúng điểm này):**

| # | Hậu quả | Cơ chế |
|---|---|---|
| **1** | ★ **HẠ THẤP GIÁ TRỊ của kỷ luật kỹ thuật phần mềm** | Khiến người khác nghĩ **"đọc mã, kiểm thử" là THỪA THÃI** |
| **2** | ★ **Cho người mới hình dung SAI LỆCH về công sức thực sự** | Họ tưởng **làm phần mềm = gõ prompt** → **dẫn THẲNG đến "vấn đề 70%"** |

> ★ **Vì sao hậu quả 2 lại nguy hiểm hơn?** Vì **hậu quả 1 chỉ là một quan điểm sai** (sửa được bằng tranh luận), còn **hậu quả 2 là một KỲ VỌNG SAI** — người học **lên kế hoạch thời gian dựa trên kỳ vọng đó** → **trễ hạn, hoảng loạn ở 30% cuối, và bỏ cuộc**. **Kỳ vọng sai gây thiệt hại thật; quan điểm sai chỉ gây tranh luận.**

#### Quan điểm của học phần — "DI CHUYỂN CÓ Ý THỨC trên phổ"

> **Học phần dùng "Vibe Coding" theo NGHĨA RỘNG** — *xây dựng phần mềm bằng cách ĐỐI THOẠI với AI* — **nhưng dạy sinh viên DI CHUYỂN CÓ Ý THỨC trên phổ**: **bắt đầu ở CHẾ ĐỘ VIBE để khám phá nhanh, rồi chuyển sang CHẾ ĐỘ KỸ THUẬT khi sản phẩm bắt đầu có NGƯỜI DÙNG THẬT.**

```
GIAI ĐOẠN KHÁM PHÁ ─────────────────► GIAI ĐOẠN HOÀN THIỆN
Chế độ VIBE                          Chế độ KỸ THUẬT
Nhanh, thử nhiều ý tưởng              Đọc mã, kiểm thử, tài liệu
                    ↑
        "CÓ NGƯỜI DÙNG THẬT" = điểm chuyển chế độ
```

> ★ **"Sản phẩm cuối kỳ được chấm theo tiêu chí của CHẾ ĐỘ KỸ THUẬT."** Nghĩa là: **được phép bắt đầu nhanh, buông theo AI ở tuần đầu để khám phá** — nhưng **đến lúc nộp bài phải đã chuyển hẳn sang đọc mã, có kiểm thử, có tài liệu, GIẢI THÍCH ĐƯỢC MỌI THAY ĐỔI.**

> **Đây là tiêu chí (3) trong SÁU tiêu chí "hoàn thành" ở cuối chương** — và là **câu trả lời cho câu hỏi "vậy em có được dùng vibe coding không?"**: **Được, nhưng phải BIẾT MÌNH ĐANG Ở CHẾ ĐỘ NÀO và biết KHI NÀO PHẢI CHUYỂN.**

> ★ **Bẫy thi rất dễ gặp**: phương án *"Học phần cấm Vibe Coding vì nó nguy hiểm"* → **SAI**. Học phần **dùng thuật ngữ theo nghĩa rộng và CHO PHÉP** — điều bắt buộc là **chuyển chế độ đúng lúc**. Phương án *"Cứ vibe coding đến cuối vì nhanh hơn"* → **cũng SAI** (vi phạm tiêu chí 3).

#### Phổ AI Coding — SÁU mức C0 đến C5 ★★★

| Mức | Tên gọi | **Vai trò AI** | **Vai trò người** | Ví dụ công cụ |
|---|---|---|---|---|
| **C0** | **Viết tay** | **Không dùng** | **Viết toàn bộ** | **Trình soạn thảo thuần** |
| **C1** | **Gợi ý nội dòng** | **Hoàn thành DÒNG/KHỐI mã** | **Viết là chính, CHẤP NHẬN gợi ý** | Trợ lý gợi ý mã trong IDE |
| **C2** | **Đối thoại** | **Trả lời, giải thích, sinh đoạn mã** | **SAO CHÉP, GHÉP, CHỈNH SỬA** | **Giao diện chat** |
| **C3** | **Tác nhân trong IDE** | ★ **TỰ SỬA NHIỀU TỆP trong dự án** | **Xem DIFF, CHẤP NHẬN/TỪ CHỐI** | IDE có agent |
| **C4** | ★ **Agentic Coding CLI** | ★ **ĐỌC/GHI tệp, CHẠY LỆNH, TỰ SỬA LỖI** | **ĐẶC TẢ, PHÊ DUYỆT, RÀ SOÁT, COMMIT** | Công cụ dòng lệnh có agent |
| **C5** | **Nhiều tác nhân / chạy nền** | **NHIỀU agent làm SONG SONG** | **ĐIỀU PHỐI, ĐÁNH GIÁ, TÍCH HỢP** | Nền tảng agent chạy nền |

> ★ **Mức C4 — Agentic Coding CLI — là CÔNG CỤ CHÍNH của Mục 5.2** và là mức mà **Bài 5.3 (xây dựng ứng dụng) sẽ dùng**.

> ★ **Quan hệ với Chương 4 — câu hỏi liên chương gần như chắc chắn có**: **"Đây chính là PHIÊN BẢN CHI TIẾT của phổ No-code / Low-code / Pro-code đã học ở Chương 4 — CÙNG MỘT Ý TƯỞNG 'PHỔ LIÊN TỤC', nay áp dụng riêng cho việc VIẾT MÃ."**
>
> **Ánh xạ để nhớ**: **no-code ↔ C0–C1** (không/ít viết mã, cấu hình) · **low-code ↔ C2–C3** (đối thoại, agent sửa trong IDE) · **pro-code ↔ C4–C5** (agent vận hành toàn dự án).

> **Điểm hay nhầm giữa C3 và C4** (câu hỏi so sánh có thể ra):
>
> | | **C3 — Tác nhân trong IDE** | **C4 — Agentic Coding CLI** |
> |---|---|---|
> | **Phạm vi thao tác** | Trong **dự án đang mở trong IDE** | **TOÀN BỘ dự án, trên HỆ THỐNG TỆP thật** |
> | **Có chạy lệnh hệ thống?** | **Hạn chế** (thường chỉ trong IDE) | ★ **CÓ: chạy lệnh, cài phần mềm, gọi mạng, XÓA TỆP** |
> | **Vòng tự sửa** | **Có**, trong phạm vi tệp | ★ **Có, và có thể LAN RỘNG** (chạy kiểm thử → đọc lỗi → sửa nhiều tệp) |
> | **Rủi ro** | **Trung bình–cao** | ★ **CAO NHẤT trong phổ** |

#### Hai trục phải theo dõi khi leo lên mức cao hơn ★★★

```
Mức kiểm chứng
của CON NGƯỜI
      ▲
      │        ╱ VÙNG AN TOÀN
      │      ╱   (hai trục tăng cùng nhau)
      │    ╱
      │  ╱
      │╱──────────────────────────►  Mức tự chủ của AI
              VÙNG NGUY HIỂM
        (tự chủ CAO, kiểm chứng THẤP)
```

> ★ **Nguyên tắc**: **MỨC TỰ CHỦ CỦA AI TĂNG thì MỨC KIỂM CHỨNG CỦA CON NGƯỜI PHẢI TĂNG THEO.**
>
> ★ **"Khi hai trục này LỆCH NHAU — AI tự chủ cao mà kiểm chứng thấp — ĐÓ CHÍNH LÀ VÙNG PHÁT SINH MỌI SỰ CỐ trình bày ở MƯỜI HAI MẪU THẤT BẠI (Mục 5.2.2)."**

**Giải thích bản chất — vì sao hai trục phải tăng cùng nhau:**

| Mức tự chủ tăng thì... | ...nên **loại lỗi có thể xảy ra** thay đổi thế nào | Vì sao **kiểm chứng phải tăng** |
|---|---|---|
| AI chỉ **gợi ý một dòng** | Lỗi **cục bộ**, thấy ngay | Người **vẫn đọc từng dòng** |
| AI **sửa nhiều tệp** | Lỗi **lan giữa các tệp**, khó thấy | Phải **xem diff toàn bộ** |
| AI **chạy lệnh và tự sửa** | Lỗi có thể **thay đổi môi trường, xóa dữ liệu** | Phải **quyền hạn + plan mode + kiểm thử + Git** |

> ★ **Đây là lý do C4 "rủi ro CAO NHẤT"**: nó là mức **duy nhất** mà **agent vừa TỰ THỰC HIỆN THAY ĐỔI vừa TỰ CHẠY ĐƯỢC MÃ** → **tạo thành VÒNG LẶP có thể LAN RẤT NHANH nếu không kiểm soát**. Ở C1–C2, **không có vòng lặp**; ở C3, vòng lặp **bị giới hạn trong IDE**.

> **Bẫy thi**: *"Mức C5 là mức cao nhất nên là mức tốt nhất để làm đồ án."* → **SAI**. **C5 = nhiều agent song song** → **mức kiểm chứng cần thiết VƯỢT XA năng lực của một sinh viên làm đồ án** (không thể review 5 nhánh song song). **Đồ án dùng C4** — đúng như bài giảng nói. **Cùng logic với "agent tự chủ không phải lúc nào cũng tốt nhất" ở Chương 3.**

#### FAAFO — năm đóng góp giá trị (nhưng kèm điều kiện)

| Chữ | Tiếng Anh | Nghĩa | Nội dung |
|---|---|---|---|
| **F** | **Faster** | **Nhanh hơn** | Rút ngắn vòng lặp từ ý tưởng đến sản phẩm chạy được |
| **A** | **Ambitious** | **Tham vọng hơn** | Dám làm những việc trước đây **không đủ thời gian** |
| **A** | **Autonomous** | **Tự chủ hơn** | Người làm **tự thực hiện được nhiều việc hơn** mà không cần đội |
| **F** | **Fun** | **Thú vị hơn** | Giảm phần việc **nhàm chán, lặp lại** |
| **O** | ★ **Optionality** | **Nhiều lựa chọn hơn** | ★ **Vì CHI PHÍ THỬ một phương án GIẢM MẠNH**, nên có thể **thử NHIỀU phương án rồi chọn** — thay vì **phải CAM KẾT với một hướng ngay từ đầu vì chi phí LÀM LẠI quá cao** |

> ★ **"Optionality" là chữ khó nhất và hay được hỏi nhất** — vì nó **không phải "tự do" hay "linh hoạt" chung chung**, mà là **một hệ quả KINH TẾ cụ thể**: **chi phí thử giảm → số phương án khảo sát tăng → quyết định tốt hơn.** Đây chính là **"thử nhiều rồi chọn"** thay vì **"phân tích lâu rồi cam kết"**.

> ★ **Cảnh báo kèm theo, phải nhớ nguyên văn**: **"FAAFO là LỢI ÍCH THẬT — nhưng CHỈ KHI ĐI KÈM KỶ LUẬT. Không có kỷ luật, TỐC ĐỘ và THAM VỌNG chỉ KHUẾCH ĐẠI HẬU QUẢ của một ĐẶC TẢ SAI."**
>
> **Lập luận**: nếu đặc tả sai, **làm nhanh hơn** nghĩa là **sai nhanh hơn và sai nhiều hơn**; **tham vọng hơn** nghĩa là **sai ở quy mô lớn hơn**. **Tốc độ không sửa được lỗi định hướng — nó chỉ nhân nó lên.**

#### "Vấn đề 70%" — cảnh báo quan trọng bậc nhất của chương ★★★

> **Với AI, 70% ĐẦU của một ứng dụng hoàn thành RẤT NHANH — nhưng 30% CÒN LẠI lại CHẬM và KHÓ hơn hẳn.**

**Bốn thành phần của 30% quyết định phần mềm có DÙNG ĐƯỢC hay không:**

| # | Thành phần | Nội dung |
|---|---|---|
| **1** | **Xử lý TRƯỜNG HỢP BIÊN** | **Dữ liệu RỖNG, SAI ĐỊNH DẠNG, SỐ LƯỢNG CỰC LỚN** |
| **2** | ★ **BẢO MẬT** | **Xác thực, PHÂN QUYỀN, BẢO VỆ DỮ LIỆU CÁ NHÂN** |
| **3** | **HIỆU NĂNG** | **Chạy ổn định khi có NHIỀU NGƯỜI DÙNG CÙNG LÚC** |
| **4** | ★ **TÍCH HỢP THẬT, SỬA LỖI TINH VI** | **Kết nối HỆ THỐNG THẬT, gỡ lỗi HIẾM KHI TÁI HIỆN** |

> ★ **"Người KHÔNG CÓ NỀN TẢNG KỸ THUẬT thường MẮC KẸT VĨNH VIỄN ở ranh giới 70% này — vì họ KHÔNG CÓ CÔNG CỤ để tự vượt qua phần khó, VÀ CŨNG KHÔNG BIẾT MÌNH ĐANG THIẾU GÌ."**

**Phân tích hai nửa của câu cuối — đây là chỗ lấy điểm khi đề hỏi "vì sao người không có nền tảng kỹ thuật bị kẹt":**

| Nửa câu | Nội dung | Vì sao riêng nó đã đủ để gây thất bại |
|---|---|---|
| **"Không có CÔNG CỤ để tự vượt qua"** | Thiếu **kiến thức để viết kiểm thử, để đọc stack trace, để biết một giải pháp có an toàn không** | Không vượt được **dù biết mình đang ở đâu** |
| ★ **"CŨNG KHÔNG BIẾT MÌNH ĐANG THIẾU GÌ"** | **Không có bản đồ của 30%** — tưởng rằng **"chạy được trên máy em"** là xong | ★ **Đây mới là nửa nguy hiểm hơn**: người **biết mình thiếu** sẽ **tìm người giúp**; người **không biết mình thiếu** sẽ **nộp bài và tuyên bố hoàn thành** |

> ★ **Nối trực tiếp với F11 (mắc kẹt ở "vòng 70%")**: **F11 chính là HẬU QUẢ THỰC TẾ của việc KHÔNG NHẬN RA ranh giới này sớm.** Dấu hiệu: **nguyên mẫu xong trong MỘT BUỔI, nhưng BA TUẦN SAU vẫn chưa dùng được thật.**
>
> **Và nối với quan điểm học phần**: **chuyển từ chế độ vibe sang chế độ kỹ thuật chính là hành động vượt qua ranh giới 70%**.

---

### 5.1.2 Vì sao tư duy BPM là nền tảng của Vibe Coding — SÁU lý do ★★★

> ★ **Đây là MỤC LUẬN ĐIỂM TRUNG TÂM của cả học phần** — bài giảng gọi đúng như vậy.
>
> **Sáu lý do — mỗi lý do NỐI MỘT KỸ NĂNG ĐÃ HỌC ở chương trước với MỘT BƯỚC CỤ THỂ khi làm việc với AI:**

| # | Lý do | Nối với chương nào | Câu chốt |
|---|---|---|---|
| **1** | ★ **AI KHUẾCH ĐẠI chất lượng ĐẶC TẢ, KHÔNG THAY THẾ đặc tả** | **BPMN = đặc tả SẴN CÓ** | Mô tả mơ hồ → phần mềm mơ hồ **nhưng trông vẫn chạy được** → **sai lầm bị phát hiện MUỘN** |
| **2** | ★ **Mô hình BPMN là NGỮ CẢNH CHẤT LƯỢNG CAO cho AI** | **Kỹ thuật ngữ cảnh (3.2.2)** | Chất lượng đầu ra **khác biệt RÕ RỆT** |
| **3** | ★ **PHÂN RÃ QUY TRÌNH = PHÂN RÃ NHIỆM VỤ** | **Sub-process, call activity (2.3.4)** | Bước càng nhỏ → AI làm đúng càng cao, người càng dễ kiểm chứng |
| **4** | ★ **"ĐƯỜNG ĐI HẠNH PHÚC TRƯỚC" là NGUYÊN TẮC CHUNG** | **Xử lý ngoại lệ (2.3.6)** | Danh sách ngoại lệ trong BPMN → **danh sách TRƯỜNG HỢP KIỂM THỬ**, không phải viết lại |
| **5** | ★ **NĂNG LỰC ĐÁNH GIÁ là thứ AI KHÔNG THAY ĐƯỢC** | **Hiểu NGHIỆP VỤ, không phải CÚ PHÁP** | Ứng dụng **chạy KHÔNG LỖI nhưng TÍNH SAI** là ứng dụng **HỎNG** |
| **6** | ★ **Ứng dụng KHÔNG TỒN TẠI ĐỘC LẬP — nó nằm TRONG MỘT QUY TRÌNH** | **Ai dùng, bàn giao cho ai** | **MÃ ĐÚNG cũng VÔ DỤNG** nếu ứng dụng **không khớp cách tổ chức thực sự vận hành** |

#### Lý do 1 và 2 — Đặc tả và Ngữ cảnh

> **Lý do 1**: **Mô hình sinh mã THEO MÔ TẢ NHẬN ĐƯỢC. MÔ TẢ MƠ HỒ cho ra phần mềm MƠ HỒ — nhưng TRÔNG VẪN CÓ VẺ CHẠY ĐƯỢC, nên SAI LẦM BỊ PHÁT HIỆN MUỘN.**

**Vì sao người đã mô hình hóa BPMN có sẵn đặc tả tốt — liệt kê đủ SÁU thành phần:**

| # | Thành phần đặc tả | Có trong BPMN ở đâu |
|---|---|---|
| **1** | **SỰ KIỆN KHỞI PHÁT** | **Sự kiện bắt đầu** (message / timer) |
| **2** | **CÁC BƯỚC** | **Task, sub-process** |
| **3** | **ĐIỀU KIỆN RẼ NHÁNH** | **Cổng XOR / AND** + điều kiện |
| **4** | **DỮ LIỆU VÀO/RA** | **Data object, data store, data collection** |
| **5** | **VAI TRÒ** | **Pool / lane** |
| **6** | **NGOẠI LỆ** | **Sự kiện lỗi biên, event sub-process, timer biên** |

> ★ **"Đó chính là TOÀN BỘ NỘI DUNG của một BẢN ĐẶC TẢ TỐT."** — **Sáu thành phần này chính là SÁU MỤC trong một tài liệu yêu cầu phần mềm tiêu chuẩn.** Người học BPMN **đã viết đặc tả mà không gọi nó là đặc tả**.

> **Lý do 2 — vì sao ngữ cảnh BPMN lại mạnh:** **Thay vì viết "làm cho tôi ứng dụng quản lý hồ sơ", ta ĐƯA MÔ HÌNH QUY TRÌNH (mô tả có cấu trúc hoặc TỆP .bpmn) VÀO NGỮ CẢNH và yêu cầu xây dựng ứng dụng HIỆN THỰC HÓA ĐÚNG LUỒNG ĐÓ.**

| Cách đưa yêu cầu | Ngữ cảnh AI nhận được | Kết quả điển hình |
|---|---|---|
| **"Làm ứng dụng quản lý hồ sơ"** | **Gần như KHÔNG CÓ gì** | AI **tự bịa** một CRUD app chung chung |
| ★ **Dán mô hình BPMN to-be** | **Sáu thành phần đặc tả ở trên** | Ứng dụng **khớp luồng thật**, có **đúng các nhánh và vai trò** |

> ★ **Đây chính là KỸ THUẬT NGỮ CẢNH đã học ở 3.2.2, áp dụng vào bài toán SINH MÃ.** Nguyên tắc **"đưa quy tắc dưới dạng TƯỜNG MINH, CÓ CẤU TRÚC"** — dán BPMN là **hiện thân hoàn hảo nhất** của nguyên tắc đó: **một ký pháp hình thức, có ngữ nghĩa chính xác, không thể diễn giải mơ hồ**.

> **Thực hành trực tiếp cho Bài 5.1**: ***đừng mô tả ứng dụng bằng MỘT CÂU CHUNG CHUNG — hãy DÁN NGUYÊN mô hình BPMN to-be (Bài 2.6) vào ngữ cảnh khi làm việc với AI.***

> **Bẫy thi**: *"Vì AI đọc hiểu ngôn ngữ tự nhiên tốt, mô tả bằng lời cũng tương đương BPMN."* → **SAI**. **Ngôn ngữ tự nhiên có thể mô tả CÙNG MỘT quy trình theo NHIỀU cách**, và **AI sẽ chọn một cách hiểu** — thường **không phải cách bạn muốn**. **BPMN chỉ có MỘT cách hiểu** vì **ngữ nghĩa đã được chuẩn hóa**. Đây là **cùng lập luận với "vì sao BPMN cần thiết khi đã có văn bản mô tả quy trình" ở Chương 2**.

#### Lý do 3 và 4 — Phân rã và Đường đi hạnh phúc

> **Lý do 3**: **Nguyên tắc cốt lõi khi làm việc với AI là CHIA NHỎ. Bước càng NHỎ, khả năng AI làm đúng càng CAO, và người càng DỄ KIỂM CHỨNG.**
>
> ★ **"Kỹ năng phân rã đã học ở 2.3.4 (sub-process, call activity) chuyển TRỰC TIẾP thành kỹ năng CHIA NHIỆM VỤ CHO AGENT — KHÔNG CẦN HỌC LẠI TỪ ĐẦU."**

**Ánh xạ phân rã BPMN → phân rã nhiệm vụ AI (bảng rất "ăn điểm"):**

| Khái niệm BPMN (Ch.2) | Chuyển thành gì khi làm việc với AI |
|---|---|
| **Sub-process nhúng** (phân rã BÊN TRONG) | **Một nhiệm vụ nhỏ 15–30 phút**, làm trọn vẹn rồi mới sang việc khác |
| **Call activity** (phân rã TÁI SỬ DỤNG) | **Một thành phần dùng lại nhiều nơi** — viết một lần, kiểm thử một lần |
| **3–4 cấp phân rã** (2.3.4) | **3–4 mức chia nhỏ nhiệm vụ** — từ "ứng dụng" xuống "tính năng" xuống "nhiệm vụ" xuống "thay đổi một tệp" |
| **Ngưỡng ~30 phần tử** (7PMG G7) | ★ **Ngưỡng "một lượt làm việc"**: nếu một nhiệm vụ **cần hơn ~30 bước suy nghĩ**, nó **quá lớn** — phải chia tiếp |

> ★ **Vì sao "bước càng nhỏ thì người càng DỄ KIỂM CHỨNG" lại quan trọng hơn "AI làm đúng hơn"?** Vì **hai lợi ích không ngang nhau**: AI làm đúng hơn là **xác suất** (vẫn có thể sai), còn **kiểm chứng được** là **điều kiện** để **phát hiện khi nó sai**. **Một thay đổi 5 dòng đọc diff trong 30 giây; một thay đổi 500 dòng thì "đọc diff" trở thành hình thức.**

> **Lý do 4**: **"Đường đi hạnh phúc TRƯỚC, ngoại lệ SAU"** — **đúng như khi mô hình hóa (2.3.6), khi xây dựng ứng dụng cũng phải làm CHẠY THÔNG LUỒNG CHÍNH trước rồi mới bổ sung xử lý ngoại lệ.**

> ★ **Chuyển đổi quan trọng nhất của lý do 4**: **DANH SÁCH NGOẠI LỆ trong mô hình BPMN trở thành DANH SÁCH TRƯỜNG HỢP KIỂM THỬ — KHÔNG PHẢI VIẾT LẠI, CHỈ LÀ CHUYỂN ĐỊNH DẠNG.**

**Ví dụ cụ thể của bài giảng (phải nhớ — vì nó chứng minh "không phải phát minh thêm"):**

> Nếu mô hình BPMN có **sự kiện lỗi biên "Hồ sơ thiếu giấy tờ"** → **đây chính là MỘT DÒNG trong bộ kiểm thử của Bài 5.5** — **không phải phát minh thêm.**

| Phần tử ngoại lệ trong BPMN (Ch.2) | Trường hợp kiểm thử tương ứng (Ch.5) |
|---|---|
| **Sự kiện lỗi biên "thiếu giấy tờ"** | Test: gửi hồ sơ thiếu trường bắt buộc → **kỳ vọng: từ chối kèm lý do** |
| **Timer biên "quá 5 ngày chưa xử lý"** | Test: đặt hồ sơ ở trạng thái chờ quá hạn → **kỳ vọng: chuyển cấp trên** |
| **Cổng XOR nhánh "không đủ điều kiện"** | Test: hồ sơ không đủ điều kiện → **kỳ vọng: không vào luồng duyệt** |
| ★ **Ngưỡng 20% ngoại lệ (2.3.12)** | ★ **Test dữ liệu biên**: đảm bảo hệ thống **không sập** khi gặp phần ngoại lệ — đúng **nguyên tắc "đừng tự động hóa phần ngoại lệ"** |

> ★ **Đây là lập luận mạnh nhất cho "vì sao học BPMN không lãng phí"**: **nếu đã vẽ mô hình tử tế ở Chương 2, phần KIỂM THỬ của Chương 5 gần như MIỄN PHÍ.** Ngược lại, nhóm làm sơ sài ở Chương 2 **phải tự nghĩ ra danh sách ngoại lệ từ đầu** — và **sẽ bỏ sót**, đúng như cảnh báo ở đầu Chương 4: *"Nhóm nào làm sơ sài ở đó sẽ vất vả gấp đôi ở đây."*

#### Lý do 5 và 6 — Đánh giá và Bối cảnh quy trình

> **Lý do 5**: **AI có thể viết mã, nhưng CHỈ NGƯỜI HIỂU NGHIỆP VỤ mới biết KẾT QUẢ CÓ ĐÚNG NGHIỆP VỤ hay không.**
>
> ★ **Ví dụ chốt (thuộc nguyên văn)**: ***"Một ứng dụng CHẠY KHÔNG LỖI nhưng TÍNH SAI ĐỊNH MỨC CHI TIÊU là một ứng dụng HỎNG — DÙ KHÔNG CÓ DÒNG NÀO BÁO LỖI."***
>
> ★ **"Năng lực này đến từ việc HIỂU QUY TRÌNH, KHÔNG đến từ việc BIẾT CÚ PHÁP LẬP TRÌNH."**

**Vì sao đây là lý do QUAN TRỌNG NHẤT trong sáu lý do (và là câu trả lời cho câu hỏi mở đầu chương):**

| Loại lỗi | Ai phát hiện được | Vì sao |
|---|---|---|
| **Lỗi CÚ PHÁP** (mã không chạy) | **Máy** — compiler, kiểm thử | Có **tín hiệu phản hồi tự động** |
| **Lỗi KỸ THUẬT** (chạy nhưng sai logic hiển thị) | **Người biết kỹ thuật** | Cần **đọc diff, chạy test** |
| ★ **Lỗi NGHIỆP VỤ** (chạy đúng kỹ thuật, **tính sai định mức**) | ★ **CHỈ NGƯỜI HIỂU QUY TRÌNH** | ★ **KHÔNG CÓ TÍN HIỆU NÀO TỰ ĐỘNG** — máy **không biết** định mức đúng là bao nhiêu |

> ★ **Đây là lý do "chạy không lỗi" là một tiêu chuẩn VÔ NGHĨA với phần mềm nghiệp vụ.** Ứng dụng tính học bổng **sai 10%** vẫn **chạy hoàn hảo, không một dòng cảnh báo** — và **trả sai tiền cho hàng trăm sinh viên**. **Chỉ người biết quy chế mới phát hiện.**

> **Lý do 6**: **Câu hỏi "AI DÙNG, Ở BƯỚC NÀO, NHẬN DỮ LIỆU TỪ ĐÂU, BÀN GIAO CHO AI" LÀ CÂU HỎI QUY TRÌNH.**
>
> ★ **"Trả lời SAI câu hỏi này thì MÃ ĐÚNG cũng VÔ DỤNG — vì ứng dụng KHÔNG KHỚP với cách tổ chức THỰC SỰ VẬN HÀNH."**

**Ba kiểu "mã đúng nhưng vô dụng" (câu hỏi tình huống hay ra):**

| Kiểu sai | Ví dụ | Vì sao vô dụng |
|---|---|---|
| **Sai NGƯỜI DÙNG** | Ứng dụng cho **sinh viên tự nhập điểm rèn luyện**, trong khi quy trình là **cố vấn lớp nhập** | **Không ai dùng** — hoặc **dùng sai thẩm quyền** |
| **Sai VỊ TRÍ trong chuỗi** | Ứng dụng **xuất báo cáo** nhưng **không ai cần báo cáo đó**; thứ cần là **nhắc hạn** | Giải quyết **một bước không tồn tại** trong quy trình thật |
| **Sai BÀN GIAO** | Ứng dụng **tạo hồ sơ** nhưng **không đẩy sang hệ thống kế toán** — nơi bước tiếp theo diễn ra | **Tạo thêm một bước thủ công**: nhập lại dữ liệu |

> ★ **Câu chốt: "ứng dụng là một MẮT XÍCH, không phải một ỐC ĐẢO."** Đây là **cùng nguyên tắc với "một bước trong quy trình không thể tối ưu cục bộ mà bỏ qua luồng chung"** — và **cùng lỗi với "tối ưu cục bộ" trong 7PMG ở Chương 2**.

#### Câu trả lời trọn vẹn cho câu hỏi mở đầu chương

> **"Nếu AI viết phần lớn mã, năng lực gì của con người là KHÔNG THỂ THAY THẾ?"**
>
> ★ **Chính là NĂNG LỰC ĐÁNH GIÁ (lý do 5) và NĂNG LỰC ĐỊNH VỊ ỨNG DỤNG TRONG BỐI CẢNH TỔ CHỨC (lý do 6). Cả hai đều là năng lực QUY TRÌNH, KHÔNG PHẢI năng lực CÚ PHÁP.**

> ★ **Hệ quả nghề nghiệp — câu rất đáng nhớ**: ***"Đây là lý do một sinh viên ngành Hệ thống thông tin, DÙ KHÔNG GIỎI LẬP TRÌNH NHẤT LỚP, vẫn có thể làm ra sản phẩm TỐT HƠN người giỏi cú pháp nhưng KHÔNG HIỂU NGHIỆP VỤ."***

> **Đọc kỹ câu này — nó có một điều kiện ngầm**: "**vẫn có thể**" chứ không phải "**chắc chắn**". Điều kiện là **phải có đủ năng lực kỹ thuật tối thiểu để đọc diff, chạy kiểm thử, và vượt 30%** — tức là **phải chuyển được sang chế độ kỹ thuật**. **Hiểu nghiệp vụ mà không có kỹ thuật tối thiểu thì vẫn mắc kẹt ở 70%.** Đây là **chỗ hai nửa của chương gặp nhau**: **5.1 dạy vì sao nghiệp vụ là nền tảng; 5.2 dạy kỷ luật kỹ thuật để nền tảng đó có chỗ dựa.**

#### Công thức tóm tắt — PHÉP NHÂN, không phải phép cộng ★★★

> ## **Chất lượng phần mềm do AI tạo ra ≈ CHẤT LƯỢNG ĐẶC TẢ × CHẤT LƯỢNG KIỂM CHỨNG**

| Vế | Được rèn bởi | Nội dung |
|---|---|---|
| **Chất lượng ĐẶC TẢ** | ★ **CHƯƠNG 2** — mô hình hóa quy trình bằng BPMN | **Đặc tả tốt = SỰ KIỆN, LUỒNG, DỮ LIỆU, NGOẠI LỆ đều RÕ RÀNG** |
| **Chất lượng KIỂM CHỨNG** | ★ **MỤC 5.2.2** của chương này | **Đọc DIFF, CHẠY KIỂM THỬ, HIỂU MỌI THAY ĐỔI trước khi chấp nhận** |

> ★ **VÌ SAO LÀ PHÉP NHÂN, KHÔNG PHẢI PHÉP CỘNG — câu hỏi gần như chắc chắn có:**
>
> ***"Một vế bằng KHÔNG thì TÍCH BẰNG KHÔNG. ĐẶC TẢ HOÀN HẢO mà KHÔNG KIỂM CHỨNG GÌ vẫn cho ra SẢN PHẨM HỎNG — và NGƯỢC LẠI."***

**Hai kịch bản chứng minh (nên thuộc để dùng làm ví dụ trong bài thi):**

| Kịch bản | Đặc tả | Kiểm chứng | Kết quả | Vì sao |
|---|---|---|---|---|
| **A** | **Hoàn hảo** (BPMN đầy đủ, quy tắc rõ) | **Bằng 0** (không đọc diff, không test) | ★ **SẢN PHẨM HỎNG** | Mã sinh ra **có thể sai ở bất kỳ đâu** mà **không ai biết**; **đặc tả tốt chỉ giúp AI CÓ CƠ HỘI làm đúng, không bảo đảm** |
| **B** | **Bằng 0** (một câu "làm app quản lý") | **Hoàn hảo** (đọc kỹ mọi diff) | ★ **SẢN PHẨM HỎNG** | Bạn **kiểm chứng rất kỹ một thứ KHÔNG GIẢI ĐÚNG BÀI TOÁN** — **kiểm chứng tốt không sửa được đặc tả sai** |

> ★ **Hệ quả phương pháp quan trọng**: **cải thiện vế YẾU hơn có lãi hơn nhiều so với cải thiện vế đã mạnh.** Nếu đặc tả đã tốt (có BPMN) mà kiểm chứng kém → **đừng viết thêm tài liệu, hãy dựng bộ kiểm thử**. Đây là **cùng logic với "thùng gỗ bị chặn bởi thanh ngắn nhất"** ở Chương 3.

> **Bẫy thi**: *"Chỉ cần đặc tả thật kỹ là AI sẽ ra sản phẩm đúng."* → **SAI** (vế kiểm chứng = 0 → tích = 0). *"Chỉ cần kiểm thử thật kỹ là được."* → **SAI** (kiểm chứng tốt **không phát hiện được** rằng **cả hệ thống giải sai bài toán**). **Cả hai đều là lỗi "một vế bằng không".**

---

### 5.1.3 Hệ sinh thái công cụ, kiến trúc tham chiếu, và ranh giới với no-code

#### NĂM nhóm công cụ trong hệ sinh thái Vibe Coding

| # | Nhóm | Chức năng | **Vai trò trong đồ án học phần** |
|---|---|---|---|
| **1** | **Trợ lý trong IDE** | **Gợi ý và sinh mã NGAY TRONG TRÌNH SOẠN THẢO** | **Dùng khi CHỈNH SỬA CHI TIẾT** |
| **2** | ★ **Agentic Coding CLI** | **Agent làm việc trên TOÀN BỘ DỰ ÁN qua DÒNG LỆNH** | ★ **Công cụ CHÍNH khi XÂY DỰNG (5.2.1)** |
| **3** | **Nền tảng sinh ứng dụng từ mô tả** | ★ **Từ PROMPT ra ỨNG DỤNG WEB CÓ GIAO DIỆN, TRIỂN KHAI SẴN** | **Dựng NGUYÊN MẪU NHANH ở bước D và E** |
| **4** | **Hạ tầng dữ liệu và xác thực** | **Cơ sở dữ liệu, ĐĂNG NHẬP, LƯU TỆP, API TỰ SINH** | ★ **Lớp LƯU TRỮ của ứng dụng** |
| **5** | ★ **Kiểm soát phiên bản và triển khai** | **Git/GitHub, dịch vụ triển khai web** | ★ **BẮT BUỘC — LƯỚI AN TOÀN của TOÀN BỘ quá trình** |

> ★ **Nhóm 5 là nhóm DUY NHẤT được đánh dấu "BẮT BUỘC"** — chi tiết này hay thành câu hỏi ("nhóm công cụ nào bắt buộc?").

**MCP xuất hiện trở lại — vai trò KẾT NỐI (câu hỏi liên chương):**

> **Model Context Protocol (đã học ở 3.2.2) cho phép AGENT LẬP TRÌNH ĐỌC TRỰC TIẾP LƯỢC ĐỒ CƠ SỞ DỮ LIỆU hoặc TRA CỨU TÀI LIỆU API thay vì ĐOÁN — GIẢM MẠNH RỦI RO "ẢO GIÁC THƯ VIỆN" sẽ học ở Mục 5.2.2.**

| | **Không có MCP** | **Có MCP** |
|---|---|---|
| Agent biết lược đồ CSDL bằng cách nào? | **ĐOÁN từ tên bảng, hoặc từ mã có sẵn** | ★ **ĐỌC TRỰC TIẾP lược đồ thật** |
| Agent biết API có tham số gì? | **ĐOÁN theo trí nhớ mô hình** | ★ **TRA CỨU tài liệu thật** |
| Hệ quả | ★ **Sinh mã gọi sai trường, sai tham số** | **Sinh mã khớp thật** |

> ★ **Đây là câu trả lời rất gọn cho "MCP giúp gì cho người lập trình"**: nó **chuyển từ "ĐOÁN" sang "ĐỌC"** — và **"đoán" chính là nguồn gốc của ảo giác**. **Cùng nguyên tắc với "đưa ngữ cảnh chất lượng cao thay vì để mô hình tự suy"** ở lý do 2.

#### Kiến trúc tham chiếu cho một ứng dụng nghiệp vụ nhỏ

```
        ┌─────────────────────────────────────────────────┐
        │  NGƯỜI DÙNG                                     │
        └───────────────────┬─────────────────────────────┘
                            ▼
        ┌─────────────────────────────────────────────────┐
        │  GIAO DIỆN (web/mobile)                         │
        └───────────────────┬─────────────────────────────┘
                            ▼
        ┌──────────────────────────────┐   ┌──────────────┐
        │  MÁY CHỦ / API               │──►│ DỊCH VỤ      │
        │  logic nghiệp vụ             │   │ NGOÀI / AI   │
        └──────────┬───────────────────┘   └──────────────┘
                   ▼
        ┌──────────────────────┐   ┌──────────────────────┐
        │  CSDL                │   │  XÁC THỰC & PHÂN     │
        │                      │   │  QUYỀN               │
        └──────────────────────┘   └──────────────────────┘

   BAO QUANH TOÀN BỘ:  Git (phiên bản) · Biến môi trường (khóa bí mật)
                       · Kiểm thử tự động · Triển khai
```

> ★ **Ba nhận xét về sơ đồ này — mỗi nhận xét là một câu hỏi có thể ra:**
> 1. **Kiến trúc này KHÔNG MỚI** — nó là **kiến trúc ứng dụng web ba lớp cổ điển**. Vibe Coding **không thay đổi kiến trúc**, chỉ **thay đổi AI VIẾT PHẦN LỚN mã**. → **Hiểu kiến trúc vẫn là điều kiện**, đúng như **"hiểu ba lớp workflow"** ở Chương 4.
> 2. ★ **XÁC THỰC & PHÂN QUYỀN là một khối RIÊNG, không nằm trong "logic nghiệp vụ"** — vì nó **cắt ngang mọi chức năng**. Đây chính là **chỗ AI hay làm ẩu nhất** (F9 — lỗ hổng bảo mật).
> 3. ★ **Bốn thứ "BAO QUANH TOÀN BỘ"** (Git, biến môi trường, kiểm thử, triển khai) — **không thuộc một lớp nào** mà **áp cho mọi lớp**. **Đây là lý do Git không phải "một công cụ trong danh sách" mà là "lưới an toàn của toàn bộ quá trình".**

#### BỐN quyết định kiến trúc phải TỰ đưa ra — "KHÔNG ĐỂ AI QUYẾT THAY" ★★★

| # | Câu hỏi | Nội dung | Nối với đâu |
|---|---|---|---|
| **1** | **DỮ LIỆU LƯU Ở ĐÂU?** | **Cơ sở dữ liệu NÀO, Ở ĐÂU, có TUÂN THỦ yêu cầu về NƠI LƯU TRỮ DỮ LIỆU CÁ NHÂN không** | ★ **Tiêu chí 5 của Chương 4** |
| **2** | ★ **AI ĐƯỢC XEM/SỬA GÌ?** | **PHÂN QUYỀN THEO VAI TRÒ** — **LẤY TRỰC TIẾP TỪ CÁC LANE trong mô hình BPMN đã vẽ ở Chương 2** | ★ **Lane ↔ vai trò** |
| **3** | **ỨNG DỤNG CHẠY Ở ĐÂU?** | **Máy chủ NÀO, MÔI TRƯỜNG NÀO** — ảnh hưởng **CHI PHÍ, TỐC ĐỘ, KHẢ NĂNG KIỂM SOÁT** | Chương 4 — lớp 3 |
| **4** | **KHÓA BÍ MẬT NÀO TỒN TẠI?** | **Được CẤT GIỮ thế nào** — đúng **BA nguyên tắc bảo mật connector ở 4.1.2a** | ★ **Chương 4 — credential** |

> ★ **"Vì sao phải TỰ quyết định, không để AI chọn thay?"**
>
> **Vì AI sẽ luôn đưa ra một lựa chọn MẶC ĐỊNH HỢP LÝ VỀ MẶT KỸ THUẬT — nhưng 'HỢP LÝ VỀ KỸ THUẬT' KHÔNG ĐỒNG NGHĨA 'ĐÚNG CHO BỐI CẢNH CỦA EM'."**
>
> ★ **"Chỉ người HIỂU QUY TRÌNH, HIỂU RÀNG BUỘC PHÁP LÝ và RÀNG BUỘC TỔ CHỨC mới trả lời đúng bốn câu hỏi này."**

**Bốn ví dụ về "AI chọn hợp lý về kỹ thuật nhưng sai cho bối cảnh" (dùng trực tiếp trong bài thi):**

| Quyết định | AI thường chọn | Vì sao SAI trong bối cảnh cụ thể |
|---|---|---|
| **1. Dữ liệu lưu ở đâu** | **CSDL đám mây tiện nhất, miễn phí** | ★ **Dữ liệu sinh viên/bệnh án KHÔNG ĐƯỢC ra nước ngoài** → phải **self-host** (tiêu chí 5, Ch.4) |
| **2. Ai được xem/sửa gì** | **Mọi người dùng đăng nhập đều xem được** (đơn giản nhất) | ★ **Quy trình có lane "Hội đồng" và lane "Chuyên viên"** — hội đồng **được quyết**, chuyên viên **chỉ chuẩn bị**. Gộp quyền = **sai thẩm quyền** |
| **3. Chạy ở đâu** | **Máy chủ mặc định của nền tảng** | ★ Có thể **không hỗ trợ yêu cầu sao lưu, nhật ký, hoặc vùng địa lý** tổ chức yêu cầu |
| **4. Khóa bí mật** | **Đặt trong tệp cấu hình cho nhanh** | ★ **Lộ khi đẩy lên kho công khai** — đúng **F9 nhóm 3** ở 5.2.2 |

> ★ **Bài 5.6 (bảo vệ sản phẩm) YÊU CẦU NÊU ĐƯỢC BA quyết định thiết kế TỰ ĐƯA RA thay vì để AI quyết — hãy CHUẨN BỊ SẴN BỐN quyết định này làm nguồn.**
>
> **Nghĩa là**: chuẩn bị **bốn**, trình bày **ba**. Đây là **chiến thuật thi rất thực dụng** — nếu hội đồng hỏi khó một cái, còn cái khác. Và **cả bốn đều là câu hỏi mà AI KHÔNG THỂ trả lời đúng thay bạn**.

#### Ranh giới với No-code (Chương 4) — bảng chọn hướng đi

> ★ **"Chương 4 xây LUỒNG TỰ ĐỘNG HÓA; chương này xây ỨNG DỤNG CÓ GIAO DIỆN."**

| # | **Bài toán** | **Nên chọn** |
|---|---|---|
| **1** | **Nối các HỆ THỐNG SẴN CÓ, chạy NỀN THEO SỰ KIỆN** | ★ **Workflow no-code (Chương 4)** |
| **2** | **Cần GIAO DIỆN RIÊNG cho người dùng NHẬP/TRA CỨU** | ★ **Ứng dụng (Chương 5)** |
| **3** | **Cần CẢ HAI** | ★ **Ứng dụng GỌI workflow, HOẶC workflow GỌI API của ứng dụng** |
| **4** | **Logic PHỨC TẠP, ĐẶC THÙ, KHÓ DIỄN ĐẠT BẰNG NODE** | ★ **Ứng dụng** |
| **5** | **Sẽ BÀN GIAO cho NHÂN VIÊN NGHIỆP VỤ TỰ SỬA** | ★ **Workflow no-code** |

> ★ **Câu hỏi ôn tập số 7 hỏi đúng bảng này KÈM VÍ DỤ** — hãy chuẩn bị **ít nhất một ví dụ cho mỗi hướng**, lấy từ **chính đồ án của nhóm**.

**Ví dụ cho từng hướng — lấy từ bối cảnh trường đại học (dùng được ngay trong bài thi):**

| Hướng | Ví dụ | Vì sao hướng đó đúng |
|---|---|---|
| **Workflow no-code** | **Đối soát điểm rèn luyện hằng đêm giữa hai hệ thống**, gửi cảnh báo nếu lệch | **Chạy nền theo sự kiện**, **không có người dùng trực tiếp**, **không cần giao diện** |
| **Ứng dụng** | **Cổng cho sinh viên nộp minh chứng**, cán bộ xem và duyệt | ★ **Cần giao diện nhập/tra cứu**, **cần hai vai trò**, **cần luồng phê duyệt** |
| **Cả hai** | **Ứng dụng nộp đơn** → **gọi workflow** để gửi thông báo đa kênh và ghi vào bảng theo dõi | Mỗi bên làm **việc nó giỏi nhất**: giao diện ↔ tích hợp |
| **Logic phức tạp** | **Tính học bổng theo 7 tiêu chí lồng nhau, có làm tròn và ưu tiên** | **Diễn đạt bằng node sẽ rối**; viết hàm rõ ràng hơn |
| **Bàn giao nghiệp vụ** | **Nhắc hạn xử lý hồ sơ** — phòng đào tạo tự đổi người nhận, đổi ngưỡng ngày | **Nhân viên tự sửa được**, không cần lập trình viên |

> ★ **Bẫy thi**: *"Đã có workflow no-code thì không cần ứng dụng nữa"* hoặc *"ứng dụng thay thế được workflow"*. → **SAI cả hai**. **Chúng BỔ SUNG nhau** — và **hướng số 3 (kết hợp) thường là đáp án đúng** cho câu hỏi tình huống "cần cả nhập liệu có giao diện lẫn tự động chạy nền".
>
> **Lập luận nền tảng**: **workflow giỏi KẾT NỐI và CHẠY NỀN; ứng dụng giỏi TƯƠNG TÁC NGƯỜI.** Ép một bên làm việc của bên kia → **cả hai đều tệ**. **Đây chính là "dùng đúng công cụ cho đúng việc" của Chương 4, ở tầng cao hơn.**

---

### 5.1.4 Khung IDEA — bốn bước, MỘT VÒNG LẶP ★★★

> ★ **"IDEA KHÔNG PHẢI CHUỖI MỘT CHIỀU — MỖI TÍNH NĂNG ĐI TRỌN MỘT VÒNG RỒI MỚI SANG TÍNH NĂNG TIẾP THEO."**

```
        ┌─────────────────────────────────────────┐
        │                                         │
        ▼                                         │
   I — Intent          D — Design         E — Execute        A — Assess
   Ý ĐỊNH       →   THIẾT KẾ & PHÂN RÃ  →  THỰC THI TỪNG BƯỚC → ĐÁNH GIÁ & BẢO ĐẢM
   (phiếu 7 mục)      (nhiệm vụ nhỏ)        (5 nguyên tắc)      (6 nhóm kiểm tra)
        ▲                                                          │
        └────────────────── tính năng TIẾP THEO ───────────────────┘
                    (hoặc KẾT THÚC nếu đã đạt tiêu chí hoàn thành)
```

> ★ **Vì sao IDEA là VÒNG LẶP theo TỪNG TÍNH NĂNG chứ không phải theo cả dự án?** Vì nó **áp dụng nguyên tắc "chia nhỏ"** ở **tầng cao nhất**: mỗi tính năng có **ý định riêng, thiết kế riêng, đánh giá riêng**. Nếu làm IDEA một lần cho cả dự án, thì **bước A (đánh giá) chỉ xảy ra ở cuối** — và **phát hiện sai ở cuối là phát hiện đắt nhất**. **Đây chính là "vòng phản hồi ngắn" của agile, và cũng là "lọc sớm" của Chương 4.**

#### Bước I — Intent: PHIẾU Ý ĐỊNH BẢY MỤC ★★★

> **Mục tiêu: phát biểu rõ bài toán TRƯỚC KHI GÕ MỘT DÒNG PROMPT NÀO.**

| # | Mục | Nội dung | **Lấy từ đâu** |
|---|---|---|---|
| **1** | **VẤN ĐỀ NGHIỆP VỤ** | Kèm **BẰNG CHỨNG ĐỊNH LƯỢNG** | ★ **Bài 2.3** |
| **2** | **NGƯỜI DÙNG** | Và **VAI TRÒ của họ trong quy trình** | ★ **LANE trong mô hình BPMN** |
| **3** | ★ **PHẠM VI** | **Những gì ứng dụng LÀM — VÀ DANH SÁCH NHỮNG GÌ ỨNG DỤNG KHÔNG LÀM** | Tự xác định |
| **4** | **KỊCH BẢN CHÍNH** | Dạng **câu chuyện người dùng**: *"Với vai trò …, tôi muốn … để …"* | Từ mô hình |
| **5** | ★ **QUY TẮC NGHIỆP VỤ** | Phải tuân thủ: **ĐỊNH MỨC, THỜI HẠN, THẨM QUYỀN PHÊ DUYỆT** | Từ quy chế/quy trình |
| **6** | **DỮ LIỆU** | **Các THỰC THỂ chính, TRƯỜNG BẮT BUỘC, DỮ LIỆU NÀO LÀ DỮ LIỆU CÁ NHÂN** | Từ mô hình + quy định |
| **7** | **TIÊU CHÍ HOÀN THÀNH** | **Làm sao biết ứng dụng đã đạt** | Tự xác định |

> ★ **Mục 3 là mục HAY BỊ BỎ NHẤT và cũng QUAN TRỌNG NHẤT về mặt kiểm soát**: **"VÀ danh sách những gì ứng dụng KHÔNG làm"**. Lý do: **phạm vi không có biên thì AI sẽ tự mở rộng** — và **mỗi lần bạn sửa một chỗ, nó lại phá chỗ khác** (đúng **F1**).

**Vì sao bước I hay bị bỏ qua — và hậu quả (câu hỏi ôn tập số 9):**

> ★ **"Sai lầm PHỔ BIẾN NHẤT của sinh viên là BỎ QUA BƯỚC I — VÌ AI TRẢ LỜI ĐƯỢC NGAY KHI MỚI GÕ MỘT CÂU. Kết quả là một ứng dụng ĐẸP nhưng GIẢI SAI BÀI TOÁN."**

**Cơ chế tâm lý của sai lầm này — phân tích ba lớp:**

| Lớp | Cơ chế | Vì sao nguy hiểm |
|---|---|---|
| **1. Phần thưởng đến NGAY** | Gõ một câu → **nhận được giao diện trong 2 phút** | **Cảm giác tiến bộ tức thì** mạnh hơn **cảm giác "phải suy nghĩ trước"** |
| **2. Sản phẩm TRÔNG đúng** | Ứng dụng **đẹp, bấm được, có biểu mẫu** | ★ **Không có tín hiệu nào cho biết nó SAI NGHIỆP VỤ** |
| **3. Chi phí phát hiện MUỘN** | Chỉ phát hiện khi **chạy kịch bản thật** hoặc **bị hỏi lúc bảo vệ** | ★ **Lúc đó đã xây trên nền sai** — sửa = **làm lại** |

> ★ **Nối với "vấn đề 70%":** bỏ qua bước I **đẩy bạn vào đúng cái bẫy 70%** — vì **70% đầu (giao diện, biểu mẫu, CRUD) xong rất nhanh**, còn **30% sau (quy tắc nghiệp vụ đúng, thẩm quyền đúng)** thì **không thể làm được vì đặc tả chưa từng tồn tại**.

**Ví dụ đối chứng — cùng một yêu cầu, có và không có phiếu ý định:**

| | **Không có phiếu ý định** | **Có phiếu ý định** |
|---|---|---|
| **Prompt** | *"Làm app quản lý học bổng cho sinh viên"* | *"Xây app cho **chuyên viên phòng đào tạo** (lane: Chuyên viên) **nhập và duyệt minh chứng**. **KHÔNG làm** phần sinh viên nộp. **Quy tắc**: học bổng loại A yêu cầu **điểm ≥ 3.2 và rèn luyện ≥ 80**; **hội đồng duyệt** là bước riêng, app **không tự duyệt**. **Dữ liệu**: hồ sơ có mã SV (định danh cá nhân), điểm, minh chứng. **Hoàn thành khi**: 20 hồ sơ mẫu được phân loại đúng, và hồ sơ thiếu minh chứng bị chặn"* | 
| **Kết quả** | App CRUD chung chung, **tự động duyệt**, **không có khái niệm hội đồng**, **không chặn hồ sơ thiếu** | App **khớp quy trình**, có **đúng vai trò**, **chặn đúng ngoại lệ** |

> ★ **Chú ý: phiếu ý định tốt có CẢ những gì KHÔNG làm ("KHÔNG làm phần sinh viên nộp").** Đây là điểm **sinh viên hay quên** khi viết, và **chính là điểm được chấm**.

#### Bước D — Design: thiết kế và phân rã

> **Mục tiêu: biến Ý ĐỊNH thành BẢN THIẾT KẾ đủ cụ thể để chia thành các NHIỆM VỤ NHỎ.**

| # | Sản phẩm của bước D | Nội dung |
|---|---|---|
| **1** | **MÔ HÌNH DỮ LIỆU** | **Bảng, TRƯỜNG, KIỂU, QUAN HỆ, KHÓA** |
| **2** | **DANH SÁCH MÀN HÌNH** | Và **ĐIỀU HƯỚNG** giữa chúng |
| **3** | ★ **ÁNH XẠ BPMN → TÍNH NĂNG** | ★ **User task → MÀN HÌNH. Service task → API. Cổng XOR → ĐIỀU KIỆN LOGIC** |
| **4** | **NGĂN XẾP CÔNG NGHỆ** | Đã chọn — **KÈM LÝ DO**, không chọn theo cảm tính |
| **5** | ★ **DANH SÁCH NHIỆM VỤ NHỎ** | **Mỗi nhiệm vụ đủ nhỏ để hoàn thành VÀ KIỂM CHỨNG trong MỘT LƯỢT (khoảng 15–30 PHÚT)** |

**Bảng ánh xạ BPMN → tính năng ở mục 3 là câu hỏi liên chương rất hay ra — nhớ kèm phần tử còn lại:**

| Phần tử BPMN | Thành phần ứng dụng |
|---|---|
| **User task** | ★ **Màn hình** (có người tương tác) |
| **Service task** | ★ **API / hàm xử lý** (tự động) |
| **Cổng XOR** | ★ **Điều kiện logic trong mã** |
| **Cổng AND** | **Xử lý song song / giao dịch** |
| **Đa thể hiện** | **Vòng lặp trên danh sách** |
| **Pool / Lane** | ★ **Vai trò & phân quyền** (nối **quyết định kiến trúc số 2**) |
| **Data object / store** | **Bảng trong CSDL** |
| **Sự kiện bắt đầu (message)** | **Endpoint nhận webhook** |
| **Sự kiện hẹn giờ** | **Job định kỳ (cron)** |
| **Sub-process / call activity** | ★ **Hàm/thành phần dùng lại, hoặc gọi workflow Chương 4** |

> ★ **Đây chính là câu trả lời cho câu hỏi "mô hình BPMN dùng để làm gì sau khi đã vẽ xong"**: nó **trở thành BẢN THIẾT KẾ KỸ THUẬT** — **mỗi phần tử là một quyết định đã có sẵn**. **Người không có mô hình phải TỰ NGHĨ RA từng quyết định này khi prompt** — và sẽ **quên** phần lớn.

**Mẫu prompt cho bước D (nguyên văn bài giảng — học để nhận cấu trúc):**

```
Bối cảnh:  [dán phiếu ý định + mô tả quy trình BPMN]
Nhiệm vụ:  Đề xuất mô hình dữ liệu và danh sách màn hình.
Ràng buộc: [công nghệ, môi trường triển khai, giới hạn]
Yêu cầu đầu ra:
  1) Bảng thực thể - trường - kiểu - ràng buộc
  2) Danh sách màn hình và vai trò được truy cập
  3) Danh sách nhiệm vụ nhỏ theo thứ tự thực hiện
CHƯA VIẾT MÃ. Nêu ba điểm đặc tả còn thiếu hoặc mâu thuẫn.
```

> ★ **Bốn chi tiết trong mẫu prompt này đều đáng học — mỗi cái là một nguyên tắc:**
>
> | Chi tiết | Nguyên tắc | Nối với |
> |---|---|---|
> | **"Dán phiếu ý định + BPMN"** | **Ngữ cảnh chất lượng cao** | Lý do 2 (5.1.2) |
> | **"Yêu cầu đầu ra 1) 2) 3)"** | ★ **Đầu ra có cấu trúc** | ★ **4.2.2** |
> | ★ **"CHƯA VIẾT MÃ"** | ★ **Tách SUY NGHĨ khỏi HÀNH ĐỘNG** — đây là **plan mode** ở 5.2.1 | Plan mode |
> | ★ **"Nêu ba điểm đặc tả còn thiếu hoặc MÂU THUẪN"** | ★ **Biến AI thành NGƯỜI PHẢN BIỆN đặc tả**, không phải người thi hành | **Lý do 1: khuếch đại chất lượng đặc tả** |

> ★ **Chi tiết "Nêu ba điểm đặc tả còn thiếu" là chi tiết HAY NHẤT trong cả mẫu prompt** — vì nó **dùng AI để tìm lỗ hổng trong suy nghĩ của chính bạn**, trước khi bạn **dùng AI để viết 500 dòng mã dựa trên suy nghĩ sai đó**. **Đây là ứng dụng tinh tế nhất của "AI khuếch đại đặc tả": nó khuếch đại CẢ việc phát hiện lỗ hổng, không chỉ việc sinh mã.**

#### Bước E — Execute: NĂM nguyên tắc thực thi

> **Mục tiêu: hiện thực hóa từng nhiệm vụ nhỏ, GIỮ HỆ THỐNG LUÔN Ở TRẠNG THÁI CHẠY ĐƯỢC.**

| # | Nguyên tắc | Nội dung |
|---|---|---|
| **1** | **MỘT NHIỆM VỤ MỘT LẦN** | **Không yêu cầu "làm luôn cả ứng dụng"** |
| **2** | **CHẠY VÀ NHÌN KẾT QUẢ SAU MỖI BƯỚC** | **Không TÍCH LŨY nhiều thay đổi CHƯA KIỂM CHỨNG** |
| **3** | ★ **COMMIT SAU MỖI NHIỆM VỤ HOÀN THÀNH** | Với **thông điệp mô tả rõ** — **đây là ĐIỂM QUAY LUI khi hỏng** |
| **4** | ★ **ĐỌC PHẦN THAY ĐỔI (DIFF)** | **Trước khi chấp nhận. KHÔNG CẦN hiểu từng ký tự, NHƯNG PHẢI HIỂU thay đổi này LÀM GÌ và VÌ SAO** |
| **5** | ★ **DỪNG LẠI KHI LẠC HƯỚNG** | **BA LƯỢT LIÊN TIẾP không tiến triển → QUAY VỀ COMMIT GẦN NHẤT, ĐỔI CÁCH ĐẶT VẤN ĐỀ** |

> ★ **Nguyên tắc 4 là nguyên tắc TINH TẾ NHẤT — và hay bị hiểu sai thành "phải đọc từng ký tự":** bài giảng nói rõ **"KHÔNG CẦN hiểu từng ký tự"**. Yêu cầu thực sự là **hiểu hai điều**: **thay đổi này LÀM GÌ** và **VÌ SAO nó cần**. Đây chính là **mức đọc đủ để CHỊU TRÁCH NHIỆM**, đúng định nghĩa **"kỹ thuật phần mềm có AI hỗ trợ"** ở 5.1.1.
>
> **Vì sao tiêu chuẩn này lại vừa khắt khe vừa thực tế?** Vì nó **không đòi hỏi bạn viết được đoạn mã đó** (điều AI làm tốt hơn), nhưng **đòi hỏi bạn biết nó có đúng nghiệp vụ không** (điều chỉ bạn làm được). **Đây là sự phân công lao động tối ưu giữa người và AI.**

> ★ **Nguyên tắc 5 (ba lượt) là NGƯỠNG HÀNH ĐỘNG quan trọng nhất** — sẽ học kỹ ở **F6 (doom loop)**. Điểm cốt lõi: **nó biến "cảm giác lạc hướng" MƠ HỒ thành một NGƯỠNG ĐO ĐẾM ĐƯỢC.**

> **Vì sao nguyên tắc 2 (chạy sau mỗi bước) lại quan trọng hơn vẻ ngoài của nó:** nếu tích lũy **5 thay đổi chưa kiểm chứng** rồi mới chạy và thấy lỗi, bạn phải **tìm lỗi trong 5 thay đổi** — và **không biết cái nào gây ra**. Nếu chạy sau **mỗi** thay đổi, lỗi xuất hiện **ngay sau thay đổi vừa làm** → **biết chính xác thủ phạm**. **Đây chính là "lọc sớm" ở Chương 4, áp dụng cho vòng phát triển.**

#### Bước A — Assess: SÁU nhóm kiểm tra

> **Mục tiêu: trả lời câu hỏi "SẢN PHẨM NÀY CÓ DÙNG ĐƯỢC THẬT KHÔNG?"**

| # | Nhóm | Nội dung kiểm tra |
|---|---|---|
| **1** | ★ **ĐÚNG NGHIỆP VỤ** | **Chạy lại các KỊCH BẢN trong phiếu ý định**; kiểm tra **QUY TẮC NGHIỆP VỤ và ĐỊNH MỨC** |
| **2** | ★ **NGOẠI LỆ** | **Chạy đúng các NGOẠI LỆ ĐÃ LIỆT KÊ Ở MÔ HÌNH BPMN** |
| **3** | **DỮ LIỆU** | **Nhập sai định dạng, để trống, TIẾNG VIỆT CÓ DẤU, DỮ LIỆU RẤT LỚN** |
| **4** | ★ **BẢO MẬT** | **Phân quyền, xác thực, KHÓA BÍ MẬT KHÔNG NẰM TRONG MÃ, dữ liệu cá nhân được bảo vệ** |
| **5** | **KHẢ NĂNG BẢO TRÌ** | **Cấu trúc thư mục rõ, không trùng lặp lớn, có README, có GHI CHÚ THIẾT KẾ** |
| **6** | ★ **VẬN HÀNH** | **CHẠY ĐƯỢC TRÊN MÁY KHÁC TỪ ĐẦU**; có **HƯỚNG DẪN CÀI ĐẶT** |

> ★ **"Sáu nhóm này CHÍNH LÀ KHUNG của Bài 5.5."** — nghĩa là **trong bài thi, nếu hỏi "cần kiểm tra gì trước khi nộp", đáp án là SÁU NHÓM NÀY, không phải "chạy thử xem có lỗi không".**

**Ba nhóm dễ bị bỏ nhất và vì sao:**

| Nhóm | Vì sao bị bỏ | Hậu quả |
|---|---|---|
| ★ **1 — Đúng nghiệp vụ** | **"Chạy không lỗi" tạo cảm giác đã xong** | ★ **Ứng dụng tính sai định mức mà không ai biết** |
| ★ **4 — Bảo mật** | **Không có triệu chứng nào khi chưa bị tấn công** | ★ **Lỗ hổng chỉ lộ khi đã bị khai thác** (F9) |
| ★ **6 — Vận hành** | **Máy mình đã cài đủ mọi thứ** | ★ **Người chấm / người dùng KHÔNG CHẠY ĐƯỢC** — mất điểm dù sản phẩm tốt |

> ★ **Nhóm 6 chính là tiêu chí (6) trong sáu tiêu chí "hoàn thành"** — và bài giảng nói rõ **đây là một trong hai tiêu chí sinh viên hay bỏ sót nhất, NHƯNG ĐƯỢC KIỂM TRA TRỰC TIẾP TRONG BUỔI BẢO VỆ**. **Đây là điểm dễ mất nhất mà chi phí sửa lại thấp nhất** — chỉ cần một tệp README tốt.

**Bảng ghép: sáu nhóm Assess ↔ các chương trước**

| Nhóm | Nguồn gốc khái niệm |
|---|---|
| **1. Đúng nghiệp vụ** | **Phiếu ý định (5.1.4)** + quy tắc nghiệp vụ từ **Chương 2** |
| **2. Ngoại lệ** | ★ **Sự kiện lỗi biên, timer biên (2.3.11)** |
| **3. Dữ liệu** | **Bộ kiểm thử dữ liệu bẩn (4.2.1)** |
| **4. Bảo mật** | **Credential 3 nguyên tắc (4.1.2)** + **lan can quyền tối thiểu (3.2.2)** |
| **5. Bảo trì** | **Nợ kỹ thuật trực quan (4.1.1)** + **đặt tên có ý nghĩa (4.2.1)** |
| **6. Vận hành** | **Lớp 3 — thực thi & vận hành (4.1.2)** |

> ★ **Nhận xét quan trọng: KHÔNG có nhóm nào là "khái niệm mới của Chương 5".** Cả sáu đều là **khái niệm đã học, được đặt lại tên cho bối cảnh ứng dụng.** Đây là **bằng chứng thứ hai** (sau bảng ánh xạ BPMN) cho luận điểm **"Chương 5 là chương VẬN DỤNG, không phải chương KIẾN THỨC MỚI"**.

---

## 5.2 Copilot và AI-Assisted Development

### 5.2.1 Agentic Coding CLI — khái niệm, thiết lập an toàn, vòng làm việc chuẩn

#### Định nghĩa

> **Agentic Coding CLI** là **công cụ chạy trong CỬA SỔ DÒNG LỆNH**, trong đó **một TÁC NHÂN AI được cấp quyền ĐỌC và GHI TỆP trong dự án, CHẠY LỆNH, CHẠY KIỂM THỬ, ĐỌC KẾT QUẢ và TỰ SỬA trong MỘT VÒNG LẶP.**

> ★ **"Đây chính là KIẾN TRÚC AI AGENT của Chương 3 — ỨNG DỤNG CỤ THỂ."**
>
> **"Công cụ" (tools) trong kiến trúc agent nay là HỆ THỐNG TỆP và TRÌNH BIÊN DỊCH/THÔNG DỊCH. SÁU THÀNH PHẦN KIẾN TRÚC — mô hình, chỉ dẫn, công cụ, bộ nhớ, vòng lặp, lan can — VẪN NGUYÊN VẸN, CHỈ ĐỔI BỐI CẢNH ÁP DỤNG."**

**Bảng ánh xạ sáu thành phần agent (Chương 3) → Agentic Coding CLI (câu hỏi liên chương rất hay ra):**

| # | Thành phần (3.2.2) | Hiện thân trong Agentic Coding CLI |
|---|---|---|
| **1** | **MÔ HÌNH** | Mô hình ngôn ngữ đứng sau công cụ CLI |
| **2** | ★ **CHỈ DẪN** | ★ **TỆP NGỮ CẢNH DỰ ÁN** ở gốc repo (đặt ở **cấp dự án**, không phải cấp một lượt chat) |
| **3** | **CÔNG CỤ** | ★ **Hệ thống tệp + shell + trình biên dịch + trình chạy kiểm thử** |
| **4** | **BỘ NHỚ** | **Lịch sử phiên + các tệp ghi chú/README/kiến trúc** (bộ nhớ **bền** nằm ở tệp, không ở hội thoại) |
| **5** | **VÒNG LẶP ĐIỀU KHIỂN** | ★ **Vòng: sửa → chạy test → đọc lỗi → sửa lại** |
| **6** | ★ **LAN CAN** | ★ **Cấu hình quyền hạn + plan mode + Git + danh mục kiểm tra bảo mật** |

> ★ **Vì sao agent này có RỦI RO CAO NHẤT trong phổ AI Coding**: **"Vì agent có quyền CHẠY LỆNH THẬT TRÊN MÁY — KỂ CẢ XÓA TỆP, CÀI PHẦN MỀM, GỌI MẠNG — đây là mức C4 có RỦI RO CAO NHẤT trong phổ AI Coding. TOÀN BỘ PHẦN CÒN LẠI của Mục 5.2 DẠY CÁCH KIỂM SOÁT RỦI RO ĐÓ."**

#### Ba chế độ làm việc với AI khi lập trình — bảng so sánh ★

| Tiêu chí | **Gợi ý NỘI DÒNG** | **ĐỐI THOẠI (chat)** | **AGENTIC CLI** |
|---|---|---|---|
| **Phạm vi nhìn thấy** | **TỆP HIỆN TẠI** | **Những gì người DÁN VÀO** | ★ **TOÀN BỘ DỰ ÁN** |
| **Ai thực hiện thay đổi** | **NGƯỜI** | **NGƯỜI** (sao chép) | ★ **AGENT** |
| **Có CHẠY ĐƯỢC MÃ không** | **Không** | **Không** | ★ **CÓ** |
| **Vòng lặp TỰ SỬA LỖI** | **Không** | **Không** | ★ **CÓ** |
| **RỦI RO** | **THẤP** | **THẤP** | ★ **CAO — CẦN LAN CAN** |
| **Phù hợp** | **Sửa NHỎ** | **HỌC, HỎI, THIẾT KẾ** | **Xây TÍNH NĂNG ĐẦU–CUỐI** |

> ★ **Câu hỏi ôn tập số 10: "Vì sao Agentic CLI có RỦI RO CAO NHẤT?"**
>
> **Đáp án nguyên văn**: ***"Vì nó là chế độ DUY NHẤT nơi agent TỰ THỰC HIỆN THAY ĐỔI VÀ TỰ CHẠY ĐƯỢC MÃ, tạo thành VÒNG LẶP CÓ THỂ LAN RỘNG NHANH nếu không kiểm soát."***
>
> ★ **Hai điều kiện phải CÙNG XẢY RA mới thành rủi ro cao**: **(a) tự thực hiện thay đổi** (C1–C2 không có) **VÀ (b) tự chạy được mã** (C1–C3 đều không có). **Chỉ một trong hai thì rủi ro còn giới hạn.** Đây là **cấu trúc lập luận "hội đủ hai điều kiện"** — chỗ sinh viên hay chỉ nêu một điều rồi mất điểm.

> ★ **Ba chế độ này chính là ba mức C2, C2/C3, C4 của phổ AI Coding** — **nhìn lại từ góc độ RỦI RO thay vì góc độ NĂNG LỰC.** **Cùng một thang, hai cách đọc**: theo **năng lực** (làm được gì) và theo **rủi ro** (cần kiểm soát gì). Đây là **dạng câu hỏi "hai cách phân loại cùng một đối tượng"** rất giống Chương 3.

#### HAI điều kiện TIÊN QUYẾT để làm việc an toàn

> ★ **"Điều kiện TUYỆT ĐỐI, KHÔNG CÓ NGOẠI LỆ."**

**① Kho mã và ĐIỂM KHỞI ĐẦU SẠCH**

> **Khởi tạo Git từ COMMIT ĐẦU TIÊN.**
>
> ★ **"KHÔNG BAO GIỜ để agent làm việc trên thư mục CHƯA CÓ KIỂM SOÁT PHIÊN BẢN — vì MẤT KHẢ NĂNG QUAY LUI là MẤT TẤT CẢ."**

**Vì sao "commit đầu tiên" là điều kiện TUYỆT ĐỐI — lập luận đầy đủ:**

> **Vì Git là LƯỚI AN TOÀN DUY NHẤT khi agent hành động sai.** Nếu agent **xóa nhầm một hàm quan trọng** hoặc **sửa hỏng cấu trúc dự án**, lệnh quay lui (revert/reset) **CHỈ HOẠT ĐỘNG NẾU CÓ MỘT ĐIỂM ĐÃ LƯU để quay về**. **Không có Git, mọi sai sót của agent đều KHÔNG THỂ HOÀN TÁC** — đúng như **F8** sẽ học ở 5.2.2.

| | **Có Git** | **Không có Git** |
|---|---|---|
| Agent xóa nhầm 3 tệp | `git checkout .` → **xong trong 2 giây** | ★ **Viết lại từ đầu** |
| Agent "refactor" làm hỏng kiến trúc | `git reset --hard` → **về trạng thái tốt** | ★ **Không có "trạng thái tốt" nào để về** |
| Bạn muốn thử hướng khác | **Nhánh mới** → thử thoải mái | ★ **Phải chọn: hoặc giữ, hoặc mất** |

> ★ **Đây là lý do Git được xếp vào nhóm công cụ số 5 với nhãn "BẮT BUỘC — lưới an toàn của toàn bộ quá trình"**, và **là lý do "Optionality" (FAAFO) chỉ có được KHI CÓ Git**: **chi phí thử giảm mạnh** là **nhờ có điểm quay lui**. **Không có Git thì không có optionality** — mỗi lần thử là một lần liều.

> ★ **Vì sao "KHÔNG BAO GIỜ" là từ đúng, không phải nói quá**: vì **xác suất agent làm hỏng cấu trúc là KHÔNG NHỎ** (đặc biệt với F7 — trôi ngữ cảnh), và **hậu quả là KHÔNG HOÀN TÁC**. **Rủi ro nhỏ × hậu quả không sửa được = rủi ro phải loại bỏ, không phải rủi ro để quản lý.** Đây là **cùng logic với "hành động không đảo ngược phải có phê duyệt"** ở Chương 3.

**② TỆP NGỮ CẢNH DỰ ÁN**

> **Hầu hết công cụ đều đọc MỘT TỆP HƯỚNG DẪN ở GỐC DỰ ÁN** (tên tệp tùy công cụ).
>
> ★ **"Đây chính là 'CHỈ DẪN' (system prompt) trong kiến trúc agent ở Chương 3, ĐẶT Ở CẤP DỰ ÁN."**

**Nội dung tệp ngữ cảnh — BA khối, BA mục đích khác nhau (phải thuộc):**

```
# Bối cảnh dự án
- Mục đích nghiệp vụ, người dùng, quy trình được hỗ trợ
- Ngăn xếp công nghệ và phiên bản
- Cấu trúc thư mục

# Quy ước
- Quy ước đặt tên; giao diện tiếng Việt; định dạng ngày/tiền tệ
- Cách chạy dự án, cách chạy kiểm thử

# Ràng buộc bắt buộc
- Không sửa thư mục X; không thêm phụ thuộc mới nếu chưa hỏi
- Không ghi khóa bí mật vào mã; dùng biến môi trường
- Mọi thay đổi phải kèm kiểm thử
```

| Khối | Trả lời câu hỏi | Mục đích |
|---|---|---|
| **Bối cảnh dự án** | **AI ĐANG LÀM GÌ** | Định vị dự án |
| **Quy ước** | **LÀM THEO CHUẨN NÀO** | Nhất quán |
| ★ **Ràng buộc bắt buộc** | ★ **KHÔNG ĐƯỢC LÀM GÌ** | ★ **"Khối QUAN TRỌNG NHẤT về AN TOÀN"** |

> ★ **Liên hệ Chương 3**: **"Đúng nguyên tắc CHỈ DẪN TỐT LUÔN NÊU RÕ 'ĐIỀU AGENT KHÔNG ĐƯỢC LÀM' — nay viết thành VĂN BẢN CỤ THỂ, ĐẶT Ở CẤP DỰ ÁN thay vì cấp MỘT LƯỢT HỘI THOẠI."**

> **Vì sao khối "Ràng buộc" lại quan trọng nhất — lập luận về bất đối xứng:**
>
> | | **Khối "Bối cảnh" / "Quy ước"** | **Khối "Ràng buộc"** |
> |---|---|---|
> | Nếu **thiếu** | AI **làm được nhưng không đúng chuẩn** → **sửa được** | ★ AI **có thể làm điều KHÔNG HOÀN TÁC ĐƯỢC** |
> | Hậu quả | **Chất lượng giảm** | ★ **Mất dữ liệu, lộ khóa, hỏng repo** |
> | Sửa thế nào | **Sửa mã** | ★ **Có khi KHÔNG sửa được** |
>
> ★ **Bất đối xứng này giải thích vì sao "ràng buộc" phải viết TRƯỚC và CỤ THỂ** — nó **không phải "hướng dẫn cho tốt hơn", mà là "hàng rào chống tai nạn"**.

> **Ba ví dụ ràng buộc tốt vs ràng buộc vô dụng (câu hỏi tình huống hay ra):**
>
> | Ràng buộc | Đánh giá |
> |---|---|
> | *"Hãy viết mã an toàn"* | ★ **VÔ DỤNG** — **không đo được, không kiểm được** |
> | *"Không ghi khóa bí mật vào mã; dùng biến môi trường"* | ★ **TỐT** — **cụ thể, kiểm tra được** |
> | *"Đừng làm hỏng gì"* | ★ **VÔ DỤNG** — quá chung |
> | *"Không sửa thư mục `migrations/`; không thêm phụ thuộc mới nếu chưa hỏi"* | ★ **TỐT** — **phạm vi rõ ràng** |
>
> **Nguyên tắc**: **ràng buộc phải KIỂM TRA ĐƯỢC** — đúng **nguyên tắc 3 ở 4.2.1 (quy tắc tường minh, có cấu trúc)** và **"tiêu chí đánh giá phải kiểm chứng được"** ở Chương 3.

#### HAI lan can VẬN HÀNH

**③ QUYỀN HẠN**

> **Cấu hình rõ những lệnh agent được TỰ CHẠY** (chạy kiểm thử, xem tệp) **và những lệnh BẮT BUỘC PHẢI HỎI** (cài phụ thuộc, XÓA TỆP, thao tác với CƠ SỞ DỮ LIỆU THẬT, ĐẨY MÃ LÊN MÁY CHỦ).
>
> ★ **"Nguyên tắc QUYỀN TỐI THIỂU ở 3.2.2 áp dụng NGUYÊN VẸN — KHÔNG CÓ GÌ MỚI, CHỈ ĐỔI NGỮ CẢNH."**

**Bảng phân loại lệnh theo mức rủi ro — dùng trực tiếp khi thi:**

| Mức | Lệnh | Cho tự chạy? | Lý do |
|---|---|---|---|
| **An toàn** | **Đọc tệp, tìm kiếm, chạy kiểm thử, chạy linter** | ★ **CÓ** | **Chỉ đọc hoặc chỉ kiểm tra** — **không thay đổi trạng thái** |
| **Trung bình** | **Sửa tệp trong dự án** | **Có, nhưng xem diff** | **Thay đổi có Git bảo vệ** |
| ★ **Cao** | **Cài phụ thuộc, xóa tệp** | ★ **PHẢI HỎI** | ★ **Có thể đưa mã lạ vào; xóa là không hoàn tác** |
| ★ **Rất cao** | **Thao tác CSDL thật, đẩy mã lên máy chủ** | ★ **PHẢI HỎI** | ★ **Ảnh hưởng người dùng thật / dữ liệu thật** |

> ★ **Đây chính là "phân biệt công cụ CHỈ ĐỌC và CÓ TÁC DỤNG PHỤ" của Chương 3, áp dụng cho shell.** Và **cũng chính là "ba quyền sửa/chạy/xem log phải tách riêng" của Chương 4** — **cùng một nguyên tắc phân quyền, ba lần xuất hiện.**

**④ LẬP KẾ HOẠCH TRƯỚC KHI SỬA — "PLAN MODE"** ★★★

> **Yêu cầu agent TRÌNH BÀY KẾ HOẠCH và CHỜ PHÊ DUYỆT trước khi thay đổi tệp.**
>
> ★ **"Đây là ĐIỂM DỪNG CÓ GIÁ TRỊ NHẤT trong toàn bộ quy trình: SỬA MỘT KẾ HOẠCH SAI TỐN MỘT PHÚT, SỬA HAI MƯƠI TỆP SAI TỐN CẢ BUỔI."**

**Vì sao plan mode hiệu quả — phân tích chi phí:**

| | **Không có plan mode** | **Có plan mode** |
|---|---|---|
| Phát hiện hướng sai | ★ **Sau khi agent sửa 20 tệp** | ★ **Trước khi sửa tệp nào** |
| Chi phí sửa | **Cả buổi** (đọc diff, revert, làm lại) | **Một phút** (sửa kế hoạch) |
| Tỉ lệ **lỗi lan rộng** | **Cao** — sai ở tệp 1 **lan sang 20 tệp** | **Thấp** — kế hoạch **bị chặn trước** |
| Cảm giác của người dùng | **"Đã tiết kiệm thời gian"** (nhưng thực ra mất) | **"Chậm hơn"** (nhưng thực ra nhanh hơn) |

> ★ **"PLAN MODE — chế độ LẬP KẾ HOẠCH — là KỸ THUẬT HIỆU QUẢ NHẤT MÀ NGƯỜI MỚI HAY BỎ QUA."**
>
> **Vì sao hay bị bỏ qua**: **"Cảm giác muốn 'VÀO VIỆC NGAY' khiến nhiều người bỏ qua bước xem kế hoạch."**
>
> ★ **Ẩn dụ của bài giảng (rất dễ nhớ)**: ***"Đúng như KIỂM TRA BẢN VẼ TRƯỚC KHI XÂY — SAI MỘT DÒNG TRONG KẾ HOẠCH dễ phát hiện và sửa hơn RẤT NHIỀU so với việc DÒ TÌM LỖI TRONG HAI MƯƠI TỆP đã bị agent sửa sai theo một hướng lệch TỪ ĐẦU."***

> ★ **Điểm tinh tế nhất — "hướng lệch TỪ ĐẦU":** khi agent hiểu sai hướng, **cả 20 tệp đều nhất quán với hướng sai** → **không tệp nào "trông sai"** khi đọc riêng lẻ. **Chỉ nhìn tổng thể mới thấy lệch** — và **lúc đó đã mất cả buổi**. **Đây chính là "sai lầm bị phát hiện MUỘN" của lý do 1 (5.1.2), ở dạng cụ thể nhất.**
>
> **Nối với F2 (giả định ngầm)**: giả định ngầm **không nằm trong mã** — nó nằm **trong kế hoạch**. **Plan mode là nơi DUY NHẤT giả định ngầm bị phơi ra trước khi nó thành 20 tệp.**

#### Vòng làm việc chuẩn — TỪ NHIỆM VỤ NHỎ ĐẾN COMMIT

```
  ① Chọn 1 nhiệm vụ nhỏ
            ↓
  ② Yêu cầu agent LẬP KẾ HOẠCH
            ↓
  ③ Người RÀ SOÁT & SỬA KẾ HOẠCH  ──── chưa ổn ────┐
            ↓                                        │
  ④ Agent THỰC HIỆN                                  │
            ↓                                        │
  ⑤ Người ĐỌC DIFF                                  │
            ↓                                        │
  ⑥ CHẠY KIỂM THỬ  ──── đỏ ──► sửa: MÔ TẢ LỖI CỤ THỂ ─┘
            │  xanh
            ▼
  ⑦ COMMIT  ──► nhiệm vụ TIẾP THEO
```

> ★ **"So khớp với Bước E của khung IDEA: đây chính là PHIÊN BẢN CHI TIẾT của NĂM NGUYÊN TẮC THỰC THI — NAY THÊM BƯỚC 'LẬP KẾ HOẠCH' Ở ĐẦU VÒNG."**
>
> **Nghĩa là**: **năm nguyên tắc bước E** (một nhiệm vụ một lần, chạy sau mỗi bước, commit, đọc diff, dừng khi lạc) **vẫn đúng** — **vòng làm việc chuẩn thêm hai thứ**: **lập kế hoạch TRƯỚC** và **phản hồi lỗi CỤ THỂ khi test đỏ**.

> ★ **Chi tiết "MÔ TẢ LỖI CỤ THỂ" khi test đỏ là chi tiết quan trọng nhất của vòng lặp** — vì nó **quyết định agent sửa đúng hay đi lạc**. **"Test đỏ rồi, sửa đi"** → agent **đoán** → dễ **doom loop (F6)**. **"Test X hỏng ở dòng Y, kỳ vọng A nhưng nhận B"** → agent **có tín hiệu** → sửa đúng.
>
> ★ **Đây chính là nguyên tắc "chất lượng NGỮ CẢNH quyết định chất lượng agent" ở Chương 3, áp dụng vào thông báo lỗi.** **Thông báo lỗi là một dạng ngữ cảnh** — và **ngữ cảnh nghèo thì agent đoán mò.**

#### BỐN thực hành QUẢN LÝ NGỮ CẢNH

| # | Thực hành | Nội dung | Vì sao |
|---|---|---|---|
| **1** | **GIỮ NGỮ CẢNH GỌN** | **Phiên càng DÀI, agent càng dễ LẠC. Bắt đầu PHIÊN MỚI cho mỗi NHIỆM VỤ LỚN** | Cửa sổ ngữ cảnh **hữu hạn**; nhiễu tích lũy |
| **2** | **CHỈ ĐƯỜNG thay vì để agent TỰ DÒ** | **Nêu rõ TÊN TỆP và HÀM liên quan** — đừng để agent tự tìm trong toàn dự án mỗi lần | Giảm **lệnh gọi thừa**, giảm **đọc nhầm tệp** |
| **3** | ★ **GHI QUYẾT ĐỊNH vào TỆP NGỮ CẢNH DỰ ÁN** | ★ **KHÔNG để trong LỊCH SỬ HỘI THOẠI — HỘI THOẠI SẼ MẤT, TỆP THÌ CÒN** | Bộ nhớ **bền** vs bộ nhớ **tạm** |
| **4** | **YÊU CẦU TÓM TẮT TRƯỚC KHI CHUYỂN PHIÊN** | *"Tóm tắt trạng thái hiện tại, việc đã xong, việc còn lại"* rồi lưu vào **ghi chú dự án** | Chuyển giao ngữ cảnh **có kiểm soát** |

> ★ **"Đây chính là KỸ THUẬT NGỮ CẢNH (3.2.2) áp dụng vào LẬP TRÌNH."**

**Bảng ánh xạ bốn thực hành ↔ bốn kỹ thuật ngữ cảnh Chương 3 (câu hỏi ghép cặp):**

| Thực hành ở 5.2.1D | Kỹ thuật ngữ cảnh (3.2.2) |
|---|---|
| **1. Giữ ngữ cảnh gọn** | ★ **Chỉ nạp dữ liệu LIÊN QUAN** |
| **2. Chỉ đường thay vì để tự dò** | ★ **Chỉ nạp dữ liệu LIÊN QUAN** (giảm nhiễu) |
| **3. Ghi quyết định vào tệp ngữ cảnh** | ★ **NÉN/TÓM TẮT lịch sử dài** + **quy tắc TƯỜNG MINH, CÓ CẤU TRÚC** |
| **4. Yêu cầu tóm tắt trước khi chuyển phiên** | ★ **NÉN lịch sử dài — GIỮ LẠI KẾT LUẬN, BỎ trao đổi trung gian** |

> ★ **Nhận xét: kỹ thuật "chỉ nạp dữ liệu liên quan" được dùng HAI lần** (thực hành 1 và 2) — vì **trong lập trình, nhiễu chủ yếu đến từ HAI nguồn: phiên quá dài, và agent đọc quá nhiều tệp không liên quan**. **Cắt hai nguồn đó là giải quyết 80% vấn đề ngữ cảnh** — đúng con số **80% lỗi agent do ngữ cảnh** ở Chương 3.

> ★ **Vì sao thực hành 3 lại quan trọng đến mức được đánh dấu**: **"HỘI THOẠI SẼ MẤT, TỆP THÌ CÒN."**
>
> **Lập luận**: khi bạn **đóng phiên** (bắt buộc, theo thực hành 1), **mọi thứ chỉ nằm trong hội thoại sẽ biến mất** — kể cả **quyết định thiết kế quan trọng** như *"dùng mật khẩu một chiều vì lý do X"*. Phiên sau, agent **không biết** → **có thể làm ngược lại** → ★ **đúng F7 (trôi ngữ cảnh và mất kiến trúc)**.
>
> **Đây chính là lý do "bộ nhớ" là một trong sáu thành phần kiến trúc agent, và tại sao bộ nhớ BỀN phải nằm NGOÀI mô hình.**

#### Kiểm thử là BẠN THÂN của agent — tín hiệu phản hồi từ môi trường ★

> **"Bộ kiểm thử tự động đóng vai trò TÍN HIỆU PHẢN HỒI TỪ MÔI TRƯỜNG — ĐIỀU KIỆN BẮT BUỘC để một TÁC NHÂN TỰ CHỦ hoạt động được (Mục 3.2.3, Mẫu 6 — Tác nhân tự chủ)."**

**Thực hành khuyến nghị: SỬA LỖI THEO HAI BƯỚC (thứ tự KHÔNG được đảo):**

```
Phát hiện lỗi
     ↓
① Yêu cầu agent VIẾT KIỂM THỬ TÁI HIỆN LỖI
     ↓
② Rồi mới yêu cầu SỬA LỖI ĐÓ
```

**Vì sao "viết kiểm thử TRƯỚC" lại hiệu quả — HAI lý do độc lập:**

| # | Lý do | Nội dung |
|---|---|---|
| **1** | ★ **XÁC NHẬN LỖI ĐÃ HIỂU ĐÚNG** | **Nếu kiểm thử KHÔNG TÁI HIỆN được lỗi → có thể agent (hoặc bạn) ĐÃ HIỂU SAI VẤN ĐỀ** |
| **2** | ★ **NGĂN LỖI QUAY LẠI** | **Kiểm thử đó Ở LẠI trong bộ kiểm thử VĨNH VIỄN**, bảo vệ trước **những thay đổi sau này** |

**Phân tích sâu hai lý do — vì sao đây là kỹ thuật đáng học nhất:**

> **Lý do 1 giải quyết một vấn đề mà sinh viên thường không nhận ra**: khi một lỗi được mô tả bằng lời (*"nút duyệt không hoạt động"*), **có thể có ba cách hiểu khác nhau**. Viết kiểm thử **buộc phải chọn MỘT cách hiểu cụ thể** — và **nếu cách hiểu đó không tái hiện lỗi, ta phát hiện ngay rằng mình đang hiểu sai**. **Đây là phép thử rẻ nhất cho sự hiểu đúng.**
>
> **Lý do 2 là lý do kinh tế**: nếu **sửa trước, viết test sau**, test sẽ được viết **để khớp với mã vừa sửa** — **không còn là test độc lập**, mà là **test "chứng minh mã đúng"** (vô giá trị). **Viết test trước thì test là TIÊU CHUẨN; viết sau thì test là LỜI KHAI.**

> ★ **Liên hệ cực kỳ quan trọng với Chương 3**: **mẫu 6 (tác nhân tự chủ) BẮT BUỘC có "tín hiệu phản hồi ĐÁNG TIN CẬY từ môi trường"**. **Trong lập trình, tín hiệu đó CHÍNH LÀ BỘ KIỂM THỬ.** **Không có kiểm thử = agent không có tín hiệu = agent mù.** Đây là lý do **"kiểm thử là bạn thân của agent"** không phải khẩu hiệu mà là **điều kiện kỹ thuật**.
>
> **Hệ quả thực dụng**: **nếu dự án không có kiểm thử, agent sẽ "sửa" bằng cách đoán** — và **đoán là nguồn gốc của doom loop (F6)**.

> ★ **Bẫy thi**: *"Kiểm thử là việc làm sau khi xong, để cho đủ thủ tục."* → **SAI nặng**. Kiểm thử là **TÍN HIỆU PHẢN HỒI** — **điều kiện để agent hoạt động**, nên nó **phải tồn tại TRƯỚC và TRONG quá trình**. **Đây là điểm khác biệt giữa "dùng AI như công cụ sinh mã" (không cần test) và "dùng AI như tác nhân" (bắt buộc có test).**

---

### 5.2.2 Mười hai mẫu thất bại và cách phòng tránh ★★★

> ★ **"NỘI DUNG CÓ GIÁ TRỊ THỰC TIỄN CAO NHẤT CỦA CHƯƠNG."**

#### Bốn nhóm — khung để nhớ 12 mẫu

| Nhóm | Tên nhóm | Mẫu | **Câu hỏi chẩn đoán** |
|---|---|---|---|
| **1** | ★ **Thất bại do ĐẶC TẢ** | **F1 · F2** | *"Mình có nói rõ mình muốn gì chưa?"* |
| **2** | ★ **Thất bại do THIẾU KIỂM CHỨNG** | **F3 · F4 · F5** | *"Mình có KIỂM TRA kết quả chưa?"* |
| **3** | ★ **Thất bại trong QUÁ TRÌNH LÀM VIỆC** | **F6 · F7 · F8** | *"Mình có ĐANG đi đúng đường không?"* |
| **4** | ★ **Thất bại về CHẤT LƯỢNG – RỦI RO** | **F9 · F10 · F11 · F12** | *"Sản phẩm này có THẬT SỰ TỐT không?"* |

> ★ **Bốn nhóm này tương ứng BỐN CÂU HỎI theo ĐÚNG THỨ TỰ của khung IDEA**: **nhóm 1 ↔ bước I/D**, **nhóm 2 ↔ bước A**, **nhóm 3 ↔ bước E**, **nhóm 4 ↔ kết quả cuối**. **Đây là cách nhớ 12 mẫu mà không cần học thuộc: hỏi bốn câu theo thứ tự IDEA là ra bốn nhóm.**

> ★ **"Bài 5.4 (nhật ký làm việc với AI) yêu cầu ÍT NHẤT HAI LƯỢT THẤT BẠI THẬT, KÈM PHÂN TÍCH NGUYÊN NHÂN THEO ĐÚNG MƯỜI HAI MẪU NÀY."** — nghĩa là **đề thi hoàn toàn có thể cho một tình huống và hỏi "đây là mẫu nào?"**.

#### NHÓM 1 — Thất bại do ĐẶC TẢ: F1 và F2

**F1 — Prompt MƠ HỒ, PHẠM VI QUÁ LỚN**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **AI sinh ra ứng dụng "CHUNG CHUNG" KHÔNG KHỚP NGHIỆP VỤ; MỖI LẦN SỬA LẠI PHÁ HỎNG CHỖ KHÁC** |
| **Phòng tránh** | ★ **Hoàn thành bước I và D của khung IDEA TRƯỚC; CHIA NHIỆM VỤ 15–30 PHÚT; NÊU RÕ CẢ NHỮNG GÌ **KHÔNG** LÀM** |

> ★ **Phân tích dấu hiệu "mỗi lần sửa lại phá hỏng chỗ khác"** — đây là **dấu hiệu CHẨN ĐOÁN mạnh nhất**, và **cơ chế của nó rất cụ thể**: khi phạm vi mơ hồ, **agent phải TỰ CHỌN một cách hiểu**. Mỗi lần bạn sửa một chỗ, **cách hiểu tổng thể có thể thay đổi** → **agent "sửa" những chỗ khác cho nhất quán với cách hiểu mới** → **phá code cũ**.
>
> **Đây chính là "kiến trúc ngầm không tồn tại"**: khi không có thiết kế rõ, **agent tự tạo một kiến trúc ngầm** — và **kiến trúc ngầm đó thay đổi theo từng prompt**. **Người dùng cảm thấy "AI cứ phá code của tôi"**, nhưng thực ra **chưa bao giờ có một thiết kế ổn định để phá**.

**F2 — GIẢ ĐỊNH NGẦM không được nói ra**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **Ứng dụng CHẠY ĐÚNG KỸ THUẬT nhưng SAI QUY TẮC NGHIỆP VỤ** (sai định mức, sai thẩm quyền duyệt, **sai cách tính ngày**) |
| **Phòng tránh** | ★ **Liệt kê quy tắc nghiệp vụ thành DANH SÁCH TƯỜNG MINH trong phiếu ý định; YÊU CẦU AI NÊU LẠI CÁC GIẢ ĐỊNH NÓ ĐANG DÙNG TRƯỚC KHI VIẾT MÃ** |

> ★ **F2 là mẫu NGUY HIỂM NHẤT trong nhóm 1** — vì nó **không có triệu chứng kỹ thuật nào**. Ứng dụng **chạy, không lỗi, giao diện đẹp**, chỉ **con số sai**.
>
> **Ba ví dụ "giả định ngầm" điển hình (rất dễ ra đề):**
>
> | Giả định ngầm | Cách AI thường hiểu | Cách nghiệp vụ yêu cầu |
> |---|---|---|
> | **"Tính ngày"** | **Ngày dương lịch** | **Ngày LÀM VIỆC** (trừ cuối tuần, ngày lễ) |
> | **"Thẩm quyền duyệt"** | **Ai đăng nhập cũng duyệt được** | **Chỉ trưởng bộ phận, và không duyệt hồ sơ của chính mình** |
> | **"Định mức"** | **Số tuyệt đối** | **Số theo bậc, có làm tròn theo quy chế** |

> ★ **"Cả hai mẫu này đều được phòng tránh NGAY TỪ BƯỚC I — đây là lý do vì sao 'sai lầm phổ biến nhất là bỏ qua bước I' (đã học ở slide Intent)."**
>
> **Hệ quả thi**: nếu đề hỏi **"muốn phòng F1 và F2 thì làm gì?"** → **đáp án là "làm tốt bước I và D"**, KHÔNG phải "dùng mô hình mạnh hơn" hay "prompt kỹ hơn".

#### NHÓM 2 — Thất bại do THIẾU KIỂM CHỨNG: F3, F4, F5

**F3 — CHẤP NHẬN MÙ (blind acceptance)**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **KHÔNG ĐỌC DIFF, KHÔNG CHẠY THỬ, CHỈ NHÌN "KHÔNG BÁO LỖI" LÀ CHẤP NHẬN** |
| **Phòng tránh** | ★ **Quy tắc BẤT DI BẤT DỊCH — KHÔNG COMMIT THỨ MÌNH KHÔNG GIẢI THÍCH ĐƯỢC. Nếu KHÔNG HIỂU, YÊU CẦU AI GIẢI THÍCH BẰNG TIẾNG VIỆT, TỪNG PHẦN** |

> ★ **Câu "KHÔNG COMMIT THỨ MÌNH KHÔNG GIẢI THÍCH ĐƯỢC" là một trong HAI biện pháp hiệu quả nhất trong cả 12 mẫu** (cùng với **quy tắc ba lượt**). Nó **chuyển một tiêu chuẩn mơ hồ ("phải hiểu code") thành một hành động nhị phân, kiểm tra được tại thời điểm commit**.
>
> ★ **Chi tiết "giải thích bằng TIẾNG VIỆT, TỪNG PHẦN" rất thực dụng**: yêu cầu AI giải thích **bằng tiếng Việt** buộc nó **diễn đạt ý nghĩa nghiệp vụ** (không thể nấp sau thuật ngữ kỹ thuật), và **"từng phần"** ngăn nó **tóm tắt chung chung qua loa**.

**F4 — BỎ QUA KIỂM THỬ**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **"CHẠY TRÊN MÁY EM THÌ ĐƯỢC"** |
| **Phòng tránh** | ★ **Yêu cầu kiểm thử ĐI KÈM MỖI TÍNH NĂNG; CHẠY LẠI TOÀN BỘ BỘ KIỂM THỬ TRƯỚC MỖI COMMIT** |

> ★ **"Chạy trên máy em thì được" là CÂU NÓI ĐÁNG SỢ NHẤT trong phát triển phần mềm** — vì nó **thừa nhận** rằng **kết quả phụ thuộc vào môi trường cụ thể của một máy**, tức là **không có gì được bảo đảm**.
>
> **Hai nguyên nhân kỹ thuật của "chạy trên máy em thì được" (nối với nhóm 6 của bước A):**
> ① **Thiếu phụ thuộc/cấu hình** — máy khác chưa cài, hoặc **phiên bản khác**.
> ② **Dữ liệu khác** — máy bạn có **dữ liệu mẫu**, máy người khác **rỗng** (chính là **trường hợp biên số 1 của "vấn đề 70%"**).
>
> ★ **Chi tiết "CHẠY LẠI TOÀN BỘ bộ kiểm thử trước mỗi commit"**: đây là điểm quan trọng — **chỉ chạy test mới viết là chưa đủ**. Thay đổi mới có thể **làm hỏng tính năng cũ** (regression). **AI đặc biệt dễ gây regression** vì nó **tối ưu cục bộ cho yêu cầu hiện tại** — đúng như nguyên nhân hệ thống của F9 nói: *"tối ưu cục bộ cho luồng chính"*.

**F5 — ẢO GIÁC THƯ VIỆN VÀ API (package hallucination)**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **Mã GỌI HÀM HOẶC GÓI PHẦN MỀM KHÔNG TỒN TẠI, hoặc DÙNG CÚ PHÁP CỦA PHIÊN BẢN KHÁC** |
| **Phòng tránh** | ★ **ĐỐI CHIẾU TÀI LIỆU CHÍNH THỨC; KHÓA PHIÊN BẢN PHỤ THUỘC; CẢNH GIÁC VỚI GÓI LẠ** |

> ★ **"F5 NGUY HIỂM HƠN VẺ NGOÀI: KẺ TẤN CÔNG CÓ THỂ LỢI DỤNG ẢO GIÁC CỦA AI."**
>
> **Cơ chế tấn công (phải hiểu, vì đây là câu hỏi bảo mật rất hay ra)**: kẻ tấn công **ĐĂNG KÝ SẴN những TÊN GÓI MÀ AI HAY BỊA RA**, rồi **phát tán MÃ ĐỘC qua đó**. Khi bạn thấy AI "tự tin" gợi ý **`npm install some-package-name`** và tên đó **thật sự tồn tại** (vì kẻ tấn công đã đăng ký), bạn **cài vào** → **mã độc chạy trên máy bạn**.
>
> ★ **Quy tắc**: **"NẾU AGENT 'TỰ TIN' GỢI Ý CÀI MỘT GÓI CÓ TÊN LẠ, ĐỪNG CÀI NGAY — HÃY KIỂM TRA TÊN ĐÓ CÓ THẬT TRONG KHO CHÍNH THỨC KHÔNG."**
>
> **Đây là điểm giao thoa giữa F5 và F9, và là ví dụ hoàn hảo cho "prompt injection + quyền tác dụng phụ" ở Chương 4**: **cài một gói = chạy mã không kiểm chứng, có quyền tác dụng phụ, KHÔNG ĐẢO NGƯỢC.**

> **Ba dấu hiệu nhận biết F5 (dùng để chẩn đoán trong 10 giây):**
> | Dấu hiệu | Nghĩa là |
> |---|---|
> | **Hàm có tên rất hợp lý nhưng IDE báo "không tìm thấy"** | **Tên hàm được bịa** |
> | **Gói có tên rất đúng nhu cầu nhưng ít lượt tải** | ★ **Có thể là tên bịa được đăng ký sẵn** |
> | **Cú pháp chạy được nhưng cảnh báo deprecated** | **Dùng cú pháp phiên bản cũ** → **khóa phiên bản** |

#### NHÓM 3 — Thất bại trong QUÁ TRÌNH LÀM VIỆC: F6, F7, F8

**F6 — VÒNG LẶP TUYỆT VỌNG (doom loop)**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **SỬA LỖI NÀY SINH LỖI KHÁC, QUAY VÒNG NHIỀU LƯỢT MÀ KHÔNG TIẾN TRIỂN; NGỮ CẢNH ĐẦY NHỮNG THỬ NGHIỆM THẤT BẠI** |
| **Phòng tránh** | ★ **QUY TẮC BA LƯỢT — sau BA LƯỢT không tiến triển: DỪNG LẠI, `git reset` VỀ COMMIT SẠCH, TỰ ĐỌC THÔNG BÁO LỖI, THU HẸP PHẠM VI và BẮT ĐẦU PHIÊN MỚI** |

> ★ **"QUY TẮC BA LƯỢT (F6) LÀ BIỆN PHÁP PHÒNG VỆ HIỆU QUẢ NHẤT TRONG TOÀN BỘ MƯỜI HAI MẪU — NÓ BIẾN 'CẢM GIÁC LẠC HƯỚNG' MƠ HỒ THÀNH MỘT NGƯỠNG HÀNH ĐỘNG CỤ THỂ, ĐO ĐẾM ĐƯỢC."**

**Phân tích BỐN hành động của quy tắc ba lượt — mỗi hành động giải quyết một cơ chế khác nhau:**

| # | Hành động | Giải quyết cơ chế gì |
|---|---|---|
| **1** | **DỪNG LẠI** | ★ **Phá vỡ vòng lặp** — mỗi lượt tiếp theo **làm ngữ cảnh nhiễu thêm** và **giảm khả năng thoát** |
| **2** | ★ **`git reset` VỀ COMMIT SẠCH** | ★ **Xóa "ngữ cảnh nhiễm độc"** — các thử nghiệm thất bại **đang nằm trong mã** và **làm agent bối rối** |
| **3** | ★ **TỰ ĐỌC THÔNG BÁO LỖI** | ★ **Lấy lại quyền chủ động nhận thức** — bạn **hiểu vấn đề** thay vì **để agent đoán** |
| **4** | **THU HẸP PHẠM VI và BẮT ĐẦU PHIÊN MỚI** | ★ **Giảm độ phức tạp** + **làm sạch ngữ cảnh hội thoại** |

> ★ **Vì sao bước 2 (`git reset`) là bước KHÔNG THỂ BỎ**: nếu không reset, **mã đang chứa 3 lần sửa sai** — phiên mới sẽ **nhìn thấy mã hỏng đó** và **tiếp tục từ trạng thái hỏng**. **Đây là lý do Git là điều kiện TIÊN QUYẾT**: **không có commit sạch thì không có `reset`** — và **doom loop trở thành không lối thoát**.
>
> ★ **Đây là ví dụ hoàn hảo cho sự liên kết giữa các phần của chương**: **F8 (không có Git) làm F6 (doom loop) TRỞ NÊN KHÔNG THỂ THOÁT.** Hai mẫu thất bại **khuếch đại nhau**.

> ★ **Vì sao "3 lượt" mà không phải 5 hay 10**: vì **sau 3 lượt thất bại, xác suất lượt thứ 4 thành công là THẤP** (vấn đề **không phải ngẫu nhiên mà là hiểu sai hướng**), trong khi **chi phí mỗi lượt tăng** (ngữ cảnh dài hơn, nhiễu hơn). **Con số 3 là điểm cân bằng giữa "cho cơ hội" và "không phí thời gian"** — và quan trọng hơn, **nó là một NGƯỠNG CỤ THỂ, không phải một lời khuyên chung**.

**F7 — TRÔI NGỮ CẢNH VÀ MẤT KIẾN TRÚC (context drift)**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **CÀNG VỀ SAU agent CÀNG "QUÊN" QUY ƯỚC; MÃ CÙNG CHỨC NĂNG BỊ VIẾT LẠI NHIỀU NƠI** |
| **Phòng tránh** | ★ **GHI QUY ƯỚC VÀO TỆP NGỮ CẢNH DỰ ÁN; ĐỊNH KỲ YÊU CẦU AGENT RÀ SOÁT TOÀN DỰ ÁN TÌM TRÙNG LẶP; REFACTOR SAU MỖI VÀI TÍNH NĂNG** |

> ★ **Dấu hiệu "mã cùng chức năng bị viết lại nhiều nơi" là dấu hiệu ĐẶC TRƯNG NHẤT của F7** — và nó **nguy hiểm vì nó TĂNG DẦN, không có sự kiện rõ ràng**. Không ai **quyết định** viết trùng; nó **tích lũy** qua từng phiên.
>
> **Cơ chế**: mỗi phiên mới, agent **không nhớ** rằng **đã có hàm `tinhDiemRenLuyen()`** → **viết hàm mới** → **hai phiên bản logic khác nhau** → ★ **sửa một cái, cái kia vẫn sai** → **lỗi âm thầm**.
>
> ★ **Đây chính là "nợ kỹ thuật trực quan" của Chương 4 (hạn chế 5), nhưng ở dạng NGUY HIỂM HƠN**: ở Chương 4, workflow 80 node khó hiểu nhưng **vẫn là MỘT nguồn sự thật**; ở F7, **có NHIỀU bản logic song song** — **không có nguồn sự thật nào**.

**F8 — KHÔNG CÓ KIỂM SOÁT PHIÊN BẢN**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **KHÔNG THỂ QUAY LẠI TRẠNG THÁI CHẠY ĐƯỢC CỦA HÔM QUA** |
| **Phòng tránh** | ★ **GIT NGAY TỪ COMMIT ĐẦU; NHÁNH RIÊNG CHO TÍNH NĂNG LỚN; COMMIT NHỎ VÀ THƯỜNG XUYÊN** |

> ★ **Dấu hiệu "không thể quay lại trạng thái chạy được của HÔM QUA" là câu chẩn đoán hay nhất trong cả 12 mẫu** — vì nó **cụ thể, cảm nhận được, và không thể ngụy biện**. Không ai có thể nói *"chắc là vẫn ổn"* khi **hôm qua chạy được, hôm nay không, và không có gì để quay về**.
>
> ★ **Ba mức độ của F8 (từ nhẹ đến nặng):**
> | Mức | Trạng thái | Hậu quả |
> |---|---|---|
> | **Nhẹ** | **Chưa có Git** | Không thể **so sánh** thay đổi |
> | **Trung bình** | **Có Git nhưng commit thưa (1 commit "xong")** | ★ **Không thể quay về ĐIỂM CỤ THỂ** — chỉ có "đầu" và "cuối" |
> | ★ **Nặng** | **Có Git nhưng commit lên nhánh chính, không nhánh riêng** | ★ **Không thể thử hướng khác mà không phá trạng thái tốt** |

#### NHÓM 4 — Thất bại về CHẤT LƯỢNG – RỦI RO: F9, F10, F11, F12

**F9 — LỖ HỔNG BẢO MẬT (mẫu thất bại NGHIÊM TRỌNG NHẤT)** ★★★

> **"Nghiên cứu trên ứng dụng xây bằng vibe coding ghi nhận lỗ hổng LẶP ĐI LẶP LẠI và KHÁC VỚI PHẦN MỀM TRUYỀN THỐNG — tập trung ở BA NHÓM."**

| # | Nhóm lỗ hổng | Nội dung | Vì sao khó phát hiện |
|---|---|---|---|
| **1** | ★ **LOGIC ĐỂ TRỐNG** | **Hàm TRẢ VỀ GIÁ TRỊ CỐ ĐỊNH kèm ghi chú "SẼ TRIỂN KHAI SAU"** — **nhưng ứng dụng VẪN CHẠY nên KHÔNG AI PHÁT HIỆN** | ★ **Không có lỗi, không có cảnh báo** — chỉ là **kết quả sai** |
| **2** | ★ **DỮ LIỆU ĐẦU VÀO KHÔNG ĐƯỢC LỌC** | **Truy vấn CSDL GHÉP CHUỖI** (nguy cơ **SQL injection**); **KHÔNG KIỂM TRA QUYỀN Ở PHÍA MÁY CHỦ mà CHỈ ẨN NÚT Ở GIAO DIỆN** | **Giao diện trông đúng**; phải **gọi API trực tiếp** mới thấy |
| **3** | ★ **LỘ KHÓA BÍ MẬT** | **Khóa API NẰM THẲNG TRONG MÃ NGUỒN** hoặc **bị ĐẨY LÊN KHO CÔNG KHAI**; **DỮ LIỆU CÁ NHÂN BỊ GHI VÀO NHẬT KÝ** | ★ **Không có triệu chứng** cho đến khi **bị khai thác** |

> ★ **"NGUYÊN NHÂN MANG TÍNH HỆ THỐNG — KHÔNG THỂ LOẠI BỎ HOÀN TOÀN BẰNG MÔ HÌNH MẠNH HƠN."**
>
> **Ba nguyên nhân hệ thống (phải thuộc)**: **① Agent MẤT NGỮ CẢNH GIỮA CÁC PHIÊN; ② TỐI ƯU CỤC BỘ CHO LUỒNG CHÍNH; ③ THIẾU KIẾN THỨC BẢO MẬT CHUYÊN SÂU.**
>
> ★ **"MÔ HÌNH MẠNH HƠN HAY PROMPT TỐT HƠN CHỈ **GIẢM** CHỨ **KHÔNG LOẠI BỎ** ĐƯỢC RỦI RO NÀY — ĐÂY LÀ LÝ DO DANH MỤC KIỂM TRA BẢO MẬT Ở BƯỚC A LÀ **BẮT BUỘC, KHÔNG PHẢI TÙY CHỌN**."**

**Phân tích ba nguyên nhân hệ thống — vì sao mỗi cái KHÔNG sửa được bằng "công cụ tốt hơn":**

| Nguyên nhân | Cơ chế | Vì sao mô hình mạnh hơn không sửa được |
|---|---|---|
| **① Mất ngữ cảnh giữa các phiên** | Agent **không biết** rằng **phiên trước đã cố ý để trống hàm đó** | **Mô hình mạnh vẫn không có thông tin** — *"thiếu ngữ cảnh thì không suy ra được"* (Ch.3: 80% lỗi do ngữ cảnh) |
| **② Tối ưu cục bộ cho luồng chính** | Yêu cầu là *"làm cho nút duyệt hoạt động"* → agent **làm nó hoạt động**, **không tự hỏi "ai được phép bấm"** | **Đó là hành vi ĐÚNG theo yêu cầu** — sửa nó đòi **yêu cầu khác**, không phải **mô hình mạnh hơn** |
| **③ Thiếu kiến thức bảo mật chuyên sâu** | Bảo mật là **lĩnh vực chuyên biệt**, cần **biết các mẫu tấn công cụ thể** | **Mô hình không được huấn luyện như chuyên gia bảo mật**, và **mỗi bối cảnh có rủi ro riêng** |

> ★ **Kết luận phương pháp quan trọng nhất của cả mục**: **vì nguyên nhân là HỆ THỐNG, biện pháp cũng phải là HỆ THỐNG** — tức là **MỘT DANH MỤC KIỂM TRA CHẠY ĐỊNH KỲ**, không phải **một prompt hay hơn**. **Đây chính là "kiểm tra đầu ra bằng luật" của Chương 3 và "bảo mật là quy trình, không phải tính năng" của Chương 4.**

#### Bốn lỗ hổng cụ thể (cách đếm của câu hỏi ôn tập số 13)

> ★ **Chỗ dễ nhầm về SỐ ĐẾM — cần xử lý rõ trước khi thi:**
> **Slide 41 trình bày BA NHÓM lỗ hổng; câu hỏi ôn tập số 13 lại nói "BỐN lỗ hổng bảo mật thường gặp".** **Cả hai đều đúng, ở hai mức chi tiết khác nhau**: khi **tách nhóm 2 thành hai lỗ hổng riêng biệt** (SQL injection và thiếu kiểm tra quyền phía máy chủ) **và gộp nhóm 3 thành một** (lộ khóa bí mật), ta được **bốn**:

| # | Lỗ hổng | Thuộc nhóm | **Biện pháp phòng tránh** |
|---|---|---|---|
| **1** | **LOGIC ĐỂ TRỐNG** (hàm trả giá trị cố định) | **Nhóm 1** | ★ **Rà soát mọi `TODO`/stub trước khi nộp**; **kiểm thử theo kịch bản nghiệp vụ** để lộ ra kết quả cố định |
| **2** | **SQL INJECTION** (ghép chuỗi truy vấn) | **Nhóm 2** | ★ **Dùng TRUY VẤN THAM SỐ HÓA (parameterized)** — không bao giờ ghép chuỗi |
| **3** | ★ **THIẾU KIỂM TRA QUYỀN Ở PHÍA MÁY CHỦ** | **Nhóm 2** | ★ **Kiểm tra quyền Ở MỌI ENDPOINT**, không chỉ **ẩn nút ở giao diện** |
| **4** | **LỘ KHÓA BÍ MẬT** (hard-code, đẩy lên kho công khai, PII trong log) | **Nhóm 3** | ★ **Biến môi trường**; **`.gitignore`**; **không log dữ liệu cá nhân** |

> ★ **Lỗ hổng số 3 là lỗ hổng BỊ ĐÁNH GIÁ THẤP NHẤT và PHỔ BIẾN NHẤT** — vì **"ẩn nút" là một hành động CÓ VẺ đúng**: bạn thấy **giao diện đã sạch**, **nút đã mất**, và **tin rằng đã phân quyền xong**. Nhưng **kẻ tấn công không dùng giao diện** — họ **gọi API trực tiếp**. **Đây là ví dụ hoàn hảo cho "kiểm soát ở tầng hiển thị không phải kiểm soát"**, và **cùng lỗi với "ẩn cột trong báo cáo" thay vì "không cấp quyền đọc"**.
>
> ★ **Câu hỏi chẩn đoán dùng được ngay**: ***"Nếu tôi dùng Postman gọi thẳng API này với tư cách người dùng thường, có bị chặn không?"*** — nếu **không chắc**, đó là **lỗ hổng số 3**.

**F10 — NỢ KỸ THUẬT VÔ HÌNH**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **Dự án CHẠY ĐƯỢC nhưng KHÔNG AI (KỂ CẢ TÁC GIẢ) HIỂU TỔNG THỂ; THÊM MỘT TÍNH NĂNG NHỎ TỐN NHIỀU THỜI GIAN HƠN TUẦN TRƯỚC** |
| **Phòng tránh** | ★ **Giữ TÀI LIỆU KIẾN TRÚC NGẮN GỌN nhưng CẬP NHẬT; ĐẶT NGƯỠNG — KHI THỜI GIAN THÊM TÍNH NĂNG BẮT ĐẦU TĂNG, DỪNG LẠI REFACTOR** |

> ★ **Dấu hiệu "thêm tính năng nhỏ tốn nhiều thời gian hơn tuần trước" là một ĐỒNG HỒ ĐO ĐẾM ĐƯỢC** — và đó là **điểm mạnh của nó**: nó **không phải cảm giác**, mà là **so sánh thời gian thực tế**. **Đây là cùng nguyên tắc với quy tắc ba lượt: biến cảm giác thành ngưỡng.**
>
> ★ **"NỢ KỸ THUẬT VÔ HÌNH" — vì sao chữ "VÔ HÌNH"**: nợ kỹ thuật thông thường **có dấu hiệu trong mã** (hàm quá dài, trùng lặp). Nợ kỹ thuật **do AI tạo** thường **không có dấu hiệu rõ** — mã **có thể trông gọn gàng từng tệp**, nhưng **tổng thể không ai hiểu**. **Mỗi tệp "hợp lý", cả hệ thống "vô nghĩa".**
>
> **Đây là cùng hiện tượng với "nợ kỹ thuật TRỰC QUAN" ở Chương 4 (workflow 80 node)** — và **cùng cách phòng**: **tài liệu ngắn + đặt tên tốt + refactor định kỳ**.

**F11 — MẮC KẸT Ở "VÒNG 70%"**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **NGUYÊN MẪU XONG TRONG MỘT BUỔI, nhưng BA TUẦN SAU VẪN CHƯA DÙNG ĐƯỢC THẬT** |
| **Phòng tránh** | ★ **CHẤP NHẬN CHUYỂN CHẾ ĐỘ — từ VIBE sang KỸ THUẬT: ĐỌC MÃ, VIẾT KIỂM THỬ, LÀM THỦ CÔNG PHẦN KHÓ, THU HẸP PHẠM VI thay vì CỐ ÉP AI LÀM NỐT** |

> ★ **"F11 NỐI TRỰC TIẾP VỀ 'VẤN ĐỀ 70%' ĐÃ HỌC ĐẦU CHƯƠNG — ĐÂY LÀ HẬU QUẢ THỰC TẾ CỦA VIỆC KHÔNG NHẬN RA RANH GIỚI ĐÓ SỚM."**

> ★ **Chi tiết quan trọng nhất: "LÀM THỦ CÔNG PHẦN KHÓ" và "THU HẸP PHẠM VI".** Đây là **hai hành động phản trực giác** — vì **người mới tin rằng "AI làm được mọi thứ, chỉ cần prompt đúng"**. **Thực tế**: có phần **AI làm mãi không xong** (ví dụ **tích hợp với hệ thống cũ không có tài liệu**) → **làm tay 2 giờ nhanh hơn ép AI 2 ngày**. Và **cắt bớt phạm vi** (bỏ một tính năng) **tốt hơn nộp muộn cả sản phẩm**.
>
> ★ **Đây là biểu hiện của một năng lực quản lý: BIẾT KHI NÀO DỪNG ĐẦU TƯ VÀO MỘT HƯỚNG.** Cùng bản chất với **quy tắc ba lượt**, nhưng ở **tầng dự án** thay vì tầng phiên.

**F12 — PHỤ THUỘC VÀ BÀO MÒN KỸ NĂNG**

| | Nội dung |
|---|---|
| **Dấu hiệu** | ★ **KHÔNG THỂ GIẢI THÍCH VÌ SAO MÃ CHẠY; KHÔNG TỰ SỬA ĐƯỢC LỖI ĐƠN GIẢN KHI KHÔNG CÓ AI** |
| **Phòng tránh** | ★ **TỰ VIẾT PHẦN LÕI NGHIỆP VỤ; SAU MỖI TÍNH NĂNG, TỰ TÓM TẮT CÁCH NÓ HOẠT ĐỘNG; ĐỊNH KỲ LÀM BÀI TẬP NHỎ KHÔNG DÙNG AI** |

> ★ **F12 là mẫu DUY NHẤT mà hậu quả không nằm ở SẢN PHẨM mà ở CON NGƯỜI** — và **vì thế khó phát hiện nhất**, vì **sản phẩm vẫn chạy tốt**.
>
> ★ **Hai dấu hiệu và hai mức độ khác nhau của nó:**
> | Dấu hiệu | Mức độ | Hệ quả |
> |---|---|---|
> | **"Không thể giải thích vì sao mã chạy"** | ★ **Vi phạm tiêu chí 3 "hoàn thành"** | **Không bảo vệ được** (mất điểm trực tiếp) |
> | **"Không tự sửa được lỗi đơn giản khi không có AI"** | ★ **Mất năng lực** | **Không còn khả năng làm việc độc lập** |

> ★ **Chi tiết "TỰ VIẾT PHẦN LÕI NGHIỆP VỤ" là chi tiết sâu sắc nhất** — vì nó **phân biệt được đâu là phần cần tự làm**: **phần lõi nghiệp vụ chính là phần BẠN HIỂU HƠN AI** (lý do 5 và 6 ở 5.1.2) → **tự viết phần đó vừa đúng về chuyên môn, vừa giữ được kỹ năng**. **Đây là sự phân công lao động tối ưu, không phải sự khổ hạnh.**

**Bảng tổng hợp 12 mẫu — in ra học (dạng câu hỏi "tình huống này là mẫu nào?"):**

| Mẫu | Tên | **Dấu hiệu NHẬN BIẾT NHANH** | **Biện pháp số 1** |
|---|---|---|---|
| **F1** | Prompt mơ hồ, phạm vi lớn | "Chung chung, sửa chỗ này hỏng chỗ kia" | **Làm bước I + D; chia 15–30 phút** |
| **F2** | Giả định ngầm | ★ **"Chạy đúng kỹ thuật nhưng sai nghiệp vụ"** | **Danh sách quy tắc tường minh** |
| **F3** | Chấp nhận mù | "Không đọc diff, không báo lỗi là xong" | ★ **Không commit thứ không giải thích được** |
| **F4** | Bỏ qua kiểm thử | ★ **"Chạy trên máy em thì được"** | **Test đi kèm; chạy lại TOÀN BỘ trước commit** |
| **F5** | Ảo giác thư viện | "Hàm/gói không tồn tại" | **Đối chiếu tài liệu; khóa phiên bản** |
| **F6** | Doom loop | "Sửa lỗi này sinh lỗi khác" | ★ **Quy tắc BA LƯỢT + `git reset`** |
| **F7** | Trôi ngữ cảnh | "Càng sau càng quên quy ước; mã trùng lặp" | **Tệp ngữ cảnh + rà soát trùng lặp** |
| **F8** | Không kiểm soát phiên bản | "Không quay lại được trạng thái hôm qua" | **Git ngay từ commit đầu** |
| **F9** | Lỗ hổng bảo mật | "Logic để trống / SQL injection / lộ khóa" | ★ **Danh mục kiểm tra BẢO MẬT (bắt buộc)** |
| **F10** | Nợ kỹ thuật vô hình | "Thêm tính năng nhỏ tốn thời gian hơn tuần trước" | **Tài liệu kiến trúc + ngưỡng refactor** |
| **F11** | Vòng 70% | ★ **"Một buổi xong nguyên mẫu, ba tuần chưa dùng được"** | ★ **Chuyển chế độ vibe → kỹ thuật** |
| **F12** | Phụ thuộc, bào mòn kỹ năng | "Không giải thích được vì sao mã chạy" | **Tự viết phần lõi; tự tóm tắt sau mỗi tính năng** |

> ★ **Cách nhớ 12 mẫu theo NHÓM + SỐ LƯỢNG**: **2 – 3 – 3 – 4** (đặc tả / kiểm chứng / quá trình / chất lượng). **Tổng 12.** **Nhóm 4 có 4 mẫu vì nó bao gồm cả "sản phẩm xấu" (F9, F10) lẫn "người yếu đi" (F12) lẫn "không xong" (F11).**

> ★ **Hai biện pháp được bài giảng đánh giá HIỆU QUẢ NHẤT trong cả 12 mẫu**: **① QUY TẮC BA LƯỢT (F6) — "biện pháp phòng vệ hiệu quả nhất trong toàn bộ mười hai mẫu"**; **② KHÔNG COMMIT THỨ KHÔNG GIẢI THÍCH ĐƯỢC (F3)**. **Nếu đề hỏi "hai biện pháp quan trọng nhất", đây là đáp án.**

#### SÁU tiêu chí "HOÀN THÀNH" cho một tính năng ★★★

> ★ **"Một tính năng CHỈ ĐƯỢC COI LÀ XONG KHI THỎA ĐỦ SÁU ĐIỀU KIỆN SAU."**

| # | Tiêu chí | Nội dung | Nối với |
|---|---|---|---|
| **1** | **CHẠY ĐÚNG KỊCH BẢN CHÍNH và CÁC NGOẠI LỆ đã liệt kê** | Không chỉ happy path | **Nhóm A số 1, 2** |
| **2** | **CÓ KIỂM THỬ TỰ ĐỘNG ĐI KÈM** | Mỗi tính năng có test của nó | **Nhóm A số 3** |
| **3** | ★ **GIẢI THÍCH ĐƯỢC MỌI THAY ĐỔI TRONG DIFF** | Hiểu **làm gì** và **vì sao** | ★ **F3; chế độ kỹ thuật** |
| **4** | **QUA DANH MỤC KIỂM TRA BẢO MẬT** | Không có lỗ hổng đã biết | ★ **F9** |
| **5** | **ĐÃ COMMIT với THÔNG ĐIỆP RÕ RÀNG** | Lịch sử đọc được | ★ **F8** |
| **6** | ★ **NGƯỜI KHÁC CÀI ĐẶT VÀ CHẠY ĐƯỢC THEO README** | Không phải "chạy trên máy em" | ★ **F4; nhóm A số 6** |

> ★ **"TIÊU CHÍ 3 VÀ 6 LÀ HAI TIÊU CHÍ SINH VIÊN HAY BỎ SÓT NHẤT — NHƯNG LẠI LÀ HAI TIÊU CHÍ ĐƯỢC KIỂM TRA TRỰC TIẾP TRONG BUỔI BẢO VỆ (Bài 5.6)."**
>
> ★ **Đây là thông tin chiến lược quan trọng nhất của chương**: **hai thứ dễ bỏ nhất lại là hai thứ bị kiểm tra trực tiếp nhất.** **Chi phí chuẩn bị thấp** (giải thích được diff = hiểu bài; README = 30 phút viết) nhưng **không chuẩn bị thì mất điểm chắc chắn**.

**Vì sao sáu tiêu chí này là "ĐỊNH NGHĨA HOÀN THÀNH" chứ không phải "danh sách mong muốn":**

| Đặc điểm | Nội dung |
|---|---|
| **Đủ** | **Thỏa cả 6 mới coi là xong** — không phải "càng nhiều càng tốt" |
| **Kiểm tra được** | Mỗi tiêu chí **có/không rõ ràng** — không có "tương đối tốt" |
| **Ánh xạ 12 mẫu** | **Mỗi tiêu chí chặn ít nhất một mẫu thất bại** (xem cột "Nối với") |
| **Ánh xạ bước A** | **Sáu nhóm kiểm tra của bước A ↔ sáu tiêu chí** — gần như 1:1 |

> ★ **Nhận xét cuối: sáu tiêu chí này chính là BẢN CAM KẾT giữa người và AI** — chúng **định nghĩa ranh giới trách nhiệm**: AI làm phần **sinh mã**, người **chịu trách nhiệm về sáu điều kiện trên**. **Đó chính là "bếp trưởng" trong ẩn dụ mở đầu chương: không tự tay nấu, nhưng chịu trách nhiệm món ăn dọn ra.**

---

## 5.3 Tóm tắt trọng tâm chương 5

### Tám điểm cần nhớ (theo đúng bảng tóm tắt của bài giảng — slide 44)

| # | Nội dung | **Câu chốt của bài giảng** | Dạng câu hỏi |
|---|---|---|---|
| **1** | **Hai cách hiểu Vibe Coding** | **Nghĩa GỐC (không đọc mã) KHÁC kỹ thuật phần mềm có AI hỗ trợ (đọc, hiểu, chịu trách nhiệm)** — **sản phẩm dùng thật cần cách thứ hai** | "Phân biệt theo 5 tiêu chí" |
| **2** | ★ **Phổ AI Coding C0–C5** | ★ **Mức tự chủ của AI TĂNG thì mức kiểm chứng của con người PHẢI TĂNG THEO — LỆCH NHAU LÀ NGUỒN CỦA MỌI SỰ CỐ** | "Vì sao hai trục phải tăng cùng nhau?" |
| **3** | ★ **FAAFO và "vấn đề 70%"** | **Lợi ích THẬT nhưng CHỈ KHI CÓ KỶ LUẬT. 30% CUỐI — BIÊN, BẢO MẬT, HIỆU NĂNG, TÍCH HỢP — QUYẾT ĐỊNH phần mềm DÙNG ĐƯỢC hay không** | "30% cuối gồm gì? Vì sao người không có nền tảng bị kẹt?" |
| **4** | ★ **Sáu lý do BPM là nền tảng** | **Đặc tả, ngữ cảnh, phân rã, happy-path-trước, đánh giá, bối cảnh quy trình** — **công thức: chất lượng ≈ ĐẶC TẢ × KIỂM CHỨNG** | "Kể 6 lý do + giải thích phép nhân" |
| **5** | **Năm nhóm công cụ, khung IDEA** | ★ **GIT BẮT BUỘC, KHÔNG TÙY CHỌN.** **IDEA: Intent → Design → Execute → Assess, LẶP THEO TỪNG TÍNH NĂNG** | "Bốn bước IDEA + sản phẩm từng bước" |
| **6** | ★ **Agentic Coding CLI** | ★ **KIẾN TRÚC AGENT CHƯƠNG 3 ÁP DỤNG VÀO DỰ ÁN PHẦN MỀM — an toàn nhờ TỆP NGỮ CẢNH, QUYỀN HẠN, PLAN MODE, KIỂM THỬ** | "Vì sao rủi ro cao nhất? Bốn lan can?" |
| **7** | ★ **Mười hai mẫu thất bại** | **Bốn nhóm: ĐẶC TẢ, KIỂM CHỨNG, QUÁ TRÌNH, CHẤT LƯỢNG–RỦI RO.** ★ **QUY TẮC BA LƯỢT và "KHÔNG COMMIT THỨ KHÔNG GIẢI THÍCH ĐƯỢC" HIỆU QUẢ NHẤT** | "Tình huống này là mẫu nào? Phòng thế nào?" |
| **8** | ★ **Sáu tiêu chí hoàn thành** | **Đúng kịch bản, CÓ KIỂM THỬ, GIẢI THÍCH ĐƯỢC DIFF, QUA BẢO MẬT, ĐÃ COMMIT, NGƯỜI KHÁC CHẠY ĐƯỢC** | "Sáu tiêu chí; hai tiêu chí hay bỏ sót?" |

> ★ **Câu chốt khép chương — phải nhớ nguyên văn**:
> ***"ĐÂY LÀ CHƯƠNG ĐÍCH CỦA HỌC PHẦN: BỐN CHƯƠNG TRƯỚC HỘI TỤ VÀO MỘT SẢN PHẨM THẬT — ỨNG DỤNG DO CHÍNH CÁC EM XÂY, CHIẾM 60% ĐIỂM HỌC PHẦN."***

**Ba điểm "ẩn" trong tám điểm trên mà đề hay hỏi (vì dễ đọc lướt):**

| Điểm | Chi tiết ẩn | Vì sao dễ ra đề |
|---|---|---|
| **2** | **"HAI TRỤC"** — không chỉ một trục tự chủ | Đề hay cho tình huống **tự chủ cao + kiểm chứng thấp** và hỏi **vùng nào** |
| **4** | **PHÉP NHÂN**, không phải phép cộng | Đề hay cho phương án *"cần cả hai, cộng lại thì tốt"* — **sai về bản chất toán học** |
| **6** | **BỐN lan can** (tệp ngữ cảnh, quyền hạn, plan mode, kiểm thử) — **Git là điều kiện tiên quyết, KHÔNG nằm trong bốn** | Đề hay hỏi **"đâu KHÔNG phải lan can"** |

---

### Bảng "con số và ngưỡng" của chương 5 (dễ ra câu hỏi con số)

| Con số | Ý nghĩa | Ngữ cảnh |
|---|---|---|
| **2025** | Năm Karpathy đưa ra thuật ngữ Vibe Coding | 5.1.1 |
| **5** | Số tiêu chí phân biệt hai cách hiểu Vibe Coding | 5.1.1 |
| **6** | ★ **Số mức trong phổ AI Coding (C0–C5)** | 5.1.1 |
| **C4** | ★ **Mức dùng trong đồ án — Agentic Coding CLI** | 5.1.1, 5.2.1 |
| **5** | Số chữ trong **FAAFO** | 5.1.1 |
| **70% / 30%** | ★ **"Vấn đề 70%"**: 70% đầu nhanh, **30% cuối chậm và khó** | 5.1.1 |
| **4** | Số thành phần của 30% cuối (biên, bảo mật, hiệu năng, tích hợp) | 5.1.1 |
| **6** | ★ **Số lý do tư duy BPM là nền tảng** | 5.1.2 |
| **5** | Số nhóm công cụ trong hệ sinh thái | 5.1.3 |
| **4** | ★ **Số quyết định kiến trúc phải TỰ đưa ra** (Bài 5.6 nêu **3**) | 5.1.3 |
| **5** | Số dòng trong bảng chọn hướng đi (no-code vs ứng dụng) | 5.1.3 |
| **4** | Số bước của khung **IDEA** | 5.1.4 |
| **7** | ★ **Số mục của phiếu ý định (bước I)** | 5.1.4 |
| **5** | Số nguyên tắc của bước E | 5.1.4 |
| **6** | ★ **Số nhóm kiểm tra của bước A** | 5.1.4 |
| **15–30 phút** | ★ **Độ lớn tối đa của MỘT nhiệm vụ nhỏ** | 5.1.4, 5.2.2 (F1) |
| **3** | ★ **Số chế độ làm việc với AI** (gợi ý nội dòng / chat / Agentic CLI) | 5.2.1 |
| **2** | ★ **Số điều kiện TIÊN QUYẾT** (Git, tệp ngữ cảnh) + **số lan can vận hành** (quyền hạn, plan mode) | 5.2.1 |
| **3** | ★ **Số khối của tệp ngữ cảnh dự án** (bối cảnh / quy ước / ràng buộc) | 5.2.1 |
| **4** | Số thực hành quản lý ngữ cảnh | 5.2.1 |
| **2** | ★ **Số bước sửa lỗi** (viết test tái hiện → rồi mới sửa) | 5.2.1 |
| **12** | ★ **Số mẫu thất bại (F1–F12)** | 5.2.2 |
| **2 – 3 – 3 – 4** | ★ **Số mẫu trong BỐN nhóm thất bại** (đặc tả / kiểm chứng / quá trình / chất lượng) | 5.2.2 |
| **3** | ★ **Số nhóm lỗ hổng bảo mật (F9)** — câu ôn tập nói **4 lỗ hổng cụ thể** | 5.2.2 |
| **3** | ★ **QUY TẮC BA LƯỢT** (F6) — ngưỡng dừng | 5.2.1, 5.2.2 |
| **6** | ★ **Số tiêu chí "hoàn thành"** | 5.2.2 |
| **3 và 6** | ★ **Hai tiêu chí hay bỏ sót nhất, bị kiểm tra trực tiếp khi bảo vệ** | 5.2.2 |
| **10 lượt / 2 lượt** | Bài 5.4: **≥10 lượt tương tác**, trong đó **≥2 lượt thất bại thật** | Bài tập |
| **15 commit** | ★ **Số commit TỐI THIỂU của Bài 5.3** | Bài tập |
| **30% / 25% / 15% / 15% / 15%** | **Trọng số đồ án**: đúng nghiệp vụ / chất lượng kỹ thuật / kiểm thử & bảo mật / quá trình / bảo vệ | Bài tập |

> ★ **Hai con số chiến lược nhất để nhớ**: **30% trọng số lớn nhất là "ĐÚNG NGHIỆP VỤ" — KHÔNG PHẢI "MÃ ĐẸP" hay "GIAO DIỆN ĐẸP"**, và **15 commit tối thiểu** (không chấp nhận **một commit "hoàn thành ứng dụng"**). **Cả hai đều là hệ quả trực tiếp của lý do 5 và 6 ở 5.1.2.**

---

## 5.4 Thuật ngữ chương 5 (Việt – Anh)

| Tiếng Việt | Tiếng Anh |
|---|---|
| Lập trình theo dòng cảm hứng | Vibe coding |
| Kỹ thuật phần mềm có AI hỗ trợ | AI-assisted engineering |
| Phổ AI Coding | AI coding spectrum |
| Tác nhân lập trình dòng lệnh | Agentic coding CLI |
| Chế độ lập kế hoạch | Plan mode |
| Tệp ngữ cảnh dự án | Project context file |
| Phần thay đổi | Diff |
| Lưu phiên bản / điểm lưu | Commit |
| Quay lui | Revert / reset |
| Kiểm soát phiên bản | Version control |
| Nguyên mẫu | Prototype |
| Vấn đề 70% | The 70% problem |
| Vòng lặp tuyệt vọng | Doom loop |
| Trôi ngữ cảnh | Context drift |
| Chấp nhận mù | Blind acceptance |
| Ảo giác thư viện | Package hallucination |
| Nợ kỹ thuật | Technical debt |
| Biến môi trường | Environment variable |
| Danh mục kiểm tra bảo mật | Security checklist |
| Tiêu chí hoàn thành | Definition of done |

> **Lưu ý của bài giảng, nên nhớ**: *"**Nhiều thuật ngữ ở đây (doom loop, blind acceptance, package hallucination) là TIẾNG LÓNG KỸ THUẬT MỚI, CHƯA CÓ BẢN DỊCH CHUẨN HÓA — hãy HIỂU KHÁI NIỆM HƠN LÀ HỌC THUỘC CHỮ.**"*
>
> ★ **Hệ quả thi trực tiếp**: đề có thể dùng **"vòng lặp tuyệt vọng"**, **"vòng lặp vô tận"**, **"sửa mãi không xong"**, **"lặp không lối thoát"** — **tất cả đều là doom loop**. **Đừng tìm đúng chữ, hãy tìm đúng HIỆN TƯỢNG.**

**Bổ sung những thuật ngữ xuất hiện trong chương nhưng không có trong bảng chính thức** (cần biết để đọc đề):

| Thuật ngữ | Nghĩa | Xuất hiện ở |
|---|---|---|
| **FAAFO** | **Faster, Ambitious, Autonomous, Fun, Optionality** — năm lợi ích | 5.1.1 |
| **Khung IDEA** | **Intent – Design – Execute – Assess** | 5.1.4 |
| **Phiếu ý định** | **Intent sheet** — 7 mục ở bước I | 5.1.4 |
| **Đường đi hạnh phúc** | Happy path — luồng chính, chưa ngoại lệ | 5.1.2 |
| **Hợp đồng dữ liệu** | Data contract | 5.1.4 (bước D) |
| **Kiểm thử tái hiện lỗi** | Reproduction test | 5.2.1 |
| **Quy tắc ba lượt** | Three-strike rule | 5.2.1, 5.2.2 |
| **Stub / logic để trống** | Stub function trả giá trị cố định | 5.2.2 (F9) |
| **Truy vấn tham số hóa** | Parameterized query | 5.2.2 (F9) |

> **Cách học thuật ngữ hiệu quả nhất (giống Chương 4)**: **ghép mỗi thuật ngữ với MỘT TÌNH HUỐNG**. `doom loop` → *"sửa lỗi này sinh lỗi khác, lượt thứ tư vẫn hỏng"*. `blind acceptance` → *"thấy không báo lỗi là commit"*. `package hallucination` → *"cài gói có tên rất hợp lý nhưng không tồn tại"*. `context drift` → *"phiên thứ năm, agent quên quy ước đặt tên"*.

---

## 5.5 Các dạng câu hỏi có thể xuất hiện + bẫy

### Sáu dạng câu hỏi của chương 5

| # | Dạng | Mẫu câu | Cách chốt đáp án |
|---|---|---|---|
| **1** | **Phân biệt hai nghĩa Vibe Coding** | "Nhóm không đọc mã, chỉ thử bằng cách bấm thử, dự án cá nhân → cách làm nào?" | ★ **Vibe Coding nghĩa GỐC — phù hợp nguyên mẫu, KHÔNG phù hợp sản phẩm dùng thật** |
| **2** | **Chẩn đoán mẫu thất bại** | "Sửa lỗi này sinh lỗi khác, năm lượt vẫn hỏng → mẫu nào?" | ★ **F6 — doom loop** → **quy tắc ba lượt + `git reset`** |
| **3** | **Tìm nguyên nhân gốc** | "Ứng dụng chạy đúng kỹ thuật nhưng tính sai định mức → nguyên nhân?" | ★ **F2 — giả định ngầm** → **thiếu danh sách quy tắc tường minh ở bước I** |
| **4** | **Chọn mức trên phổ / chọn chế độ** | "Mức nào dùng trong đồ án? Vì sao không dùng C5?" | **C4**; **C5 đòi mức kiểm chứng vượt năng lực một đồ án** |
| **5** | **Liên chương (Ch.2/3/4 → Ch.5)** | "Tệp ngữ cảnh dự án là thành phần nào trong kiến trúc agent?" | ★ **"Chỉ dẫn" (system prompt) — đặt ở CẤP DỰ ÁN** |
| **6** | **Chọn no-code hay ứng dụng** | "Cần giao diện nhập liệu cho cán bộ, đồng thời chạy nền theo sự kiện" | ★ **Cả hai: ứng dụng GỌI workflow** |

### Bảy cái bẫy phải nhớ

> **Bẫy 1**: *"Học phần cấm Vibe Coding vì nó nguy hiểm."* → **SAI**. Học phần **dùng thuật ngữ theo NGHĨA RỘNG và CHO PHÉP** — điều bắt buộc là **DI CHUYỂN CÓ Ý THỨC trên phổ** và **chuyển sang chế độ kỹ thuật khi sản phẩm bắt đầu có người dùng thật**.

> **Bẫy 2**: *"Mức tự chủ cao nhất (C5) là mức tốt nhất."* → **SAI**. **Mức tự chủ tăng thì mức KIỂM CHỨNG phải tăng theo — lệch nhau là vùng nguy hiểm.** **C5 (nhiều agent song song) đòi hỏi năng lực review vượt xa một đồ án** → **đồ án dùng C4**. Cùng logic với **"agent tự chủ hơn không phải lúc nào cũng tốt hơn"** ở Chương 3.

> **Bẫy 3**: *"Chất lượng phần mềm ≈ đặc tả + kiểm chứng (cộng lại)."* → **SAI**. Là **PHÉP NHÂN**: **một vế bằng KHÔNG thì tích bằng KHÔNG**. **Đặc tả hoàn hảo mà không kiểm chứng vẫn ra sản phẩm hỏng — và ngược lại.**

> **Bẫy 4**: *"Chỉ cần prompt kỹ hơn / dùng mô hình mạnh hơn là hết lỗ hổng bảo mật."* → **SAI**. Nguyên nhân là **HỆ THỐNG** (mất ngữ cảnh giữa phiên, tối ưu cục bộ cho luồng chính, thiếu kiến thức bảo mật chuyên sâu) → **mô hình mạnh hơn chỉ GIẢM, KHÔNG LOẠI BỎ** → **danh mục kiểm tra bảo mật là BẮT BUỘC**.

> **Bẫy 5**: *"Ẩn nút trên giao diện là đã phân quyền xong."* → **SAI**. **Kẻ tấn công gọi API trực tiếp, không dùng giao diện.** **Phải kiểm tra quyền Ở PHÍA MÁY CHỦ** — đây là **lỗ hổng phổ biến nhất và bị đánh giá thấp nhất** (F9 nhóm 2).

> **Bẫy 6**: *"Đã có Git là đủ."* → **SAI**. Cần **commit NHỎ và THƯỜNG XUYÊN** và **nhánh riêng cho tính năng lớn**. **Một commit "hoàn thành ứng dụng" không cho quay về điểm cụ thể** → **F6 (doom loop) không có lối thoát**.

> **Bẫy 7**: *"Kiểm thử là việc làm sau khi xong, cho đủ thủ tục."* → **SAI**. Kiểm thử là **TÍN HIỆU PHẢN HỒI TỪ MÔI TRƯỜNG** — **điều kiện BẮT BUỘC để tác nhân tự chủ hoạt động** (mẫu 6, Chương 3). **Không có kiểm thử = agent mù = doom loop.**

### Bốn bẫy "ngôn ngữ" trong phương án nhiễu

| Cụm từ trong phương án | Vì sao thường sai |
|---|---|
| "**chỉ cần** dùng AI giỏi hơn" | Lỗi **hệ thống** không sửa được bằng **năng lực mô hình** |
| "**không cần** đọc mã vẫn **chịu trách nhiệm** được" | **Mâu thuẫn nội tại** — không hiểu thì không thể chịu trách nhiệm |
| "**thay thế** hoàn toàn kỹ năng lập trình" | Chương này dạy **DỊCH CHUYỂN** kỹ năng (sang đặc tả và đánh giá), không phải **xóa bỏ** |
| "**luôn** nhanh hơn / **luôn** rẻ hơn" | Đúng với **70% đầu**; **30% cuối chậm và khó hơn hẳn** — chính là **"vấn đề 70%"** |

---

## 5.6 Câu hỏi tự luyện (16 câu — có đáp án và giải thích)

**Câu 1.** Một sinh viên dùng AI sinh mã cho **dự án cá nhân, chỉ mình dùng, không ai phụ thuộc**, **không đọc mã**, chỉ thử bằng cách bấm thử. Cách làm này được gọi đúng nhất là gì?

A. Kỹ thuật phần mềm có AI hỗ trợ
B. Vibe Coding theo **nghĩa gốc**
C. Agentic Coding
D. Phát triển theo mô hình thác nước

**Câu 2.** Cùng sinh viên đó dùng cách làm trên cho **đồ án cuối kỳ có người dùng thật và hội đồng chấm**. Vấn đề chính là gì?

A. Không có vấn đề gì, miễn sản phẩm chạy được
B. **Dùng sai chế độ** — sản phẩm dùng thật cần **chế độ kỹ thuật** (đọc mã, kiểm thử, chịu trách nhiệm từng thay đổi)
C. Chỉ cần đổi sang mô hình mạnh hơn
D. Chỉ cần viết prompt dài hơn

**Câu 3.** Một nhóm dựng nguyên mẫu trong **một buổi**, nhưng **ba tuần sau vẫn chưa dùng được thật** vì liên tục gặp vấn đề phân quyền, dữ liệu rỗng và tích hợp hệ thống cũ. Hiện tượng này ứng với mẫu thất bại nào?

A. Doom loop (F6)
B. **"Vấn đề 70%"** → **F11 — mắc kẹt ở vòng 70%**
C. Ảo giác thư viện (F5)
D. Trôi ngữ cảnh (F7)

**Câu 4.** Phát biểu *"chất lượng phần mềm do AI tạo ra ≈ chất lượng đặc tả × chất lượng kiểm chứng"* — vì sao là **phép nhân** chứ không phải phép cộng?

A. Vì phép nhân cho số lớn hơn
B. **Vì một vế bằng KHÔNG thì tích bằng KHÔNG** — đặc tả hoàn hảo mà không kiểm chứng vẫn ra sản phẩm hỏng, và ngược lại
C. Vì hai yếu tố độc lập nhau
D. Vì kiểm chứng quan trọng gấp đôi đặc tả

**Câu 5.** Một nhóm dán **nguyên mô hình BPMN to-be** vào ngữ cảnh khi yêu cầu AI xây ứng dụng, thay vì viết *"làm app quản lý hồ sơ"*. Điều này minh họa lý do nào trong sáu lý do?

A. Lý do 3 — phân rã quy trình
B. **Lý do 2 — mô hình BPMN là NGỮ CẢNH CHẤT LƯỢNG CAO cho AI** (kỹ thuật ngữ cảnh, Ch.3)
C. Lý do 6 — bối cảnh quy trình
D. Lý do 5 — năng lực đánh giá

**Câu 6.** Một nhóm làm đúng **bước D**: bảng phân rã nhiệm vụ, mỗi nhiệm vụ **15–30 phút**. Điều này chủ yếu phòng tránh **mẫu thất bại nào**?

A. F5 — ảo giác thư viện
B. **F1 — prompt mơ hồ, phạm vi quá lớn**
C. F12 — phụ thuộc và bào mòn kỹ năng
D. F9 — lỗ hổng bảo mật

**Câu 7.** Ứng dụng **chạy hoàn toàn không lỗi**, giao diện đẹp, nhưng **tính học bổng theo số tuyệt đối** trong khi quy chế yêu cầu **tính theo bậc có làm tròn**. Đây là mẫu thất bại nào và cách phòng?

A. F3 — chấp nhận mù; phòng bằng cách đọc diff
B. **F2 — giả định ngầm không được nói ra**; phòng bằng **liệt kê quy tắc nghiệp vụ thành danh sách tường minh + yêu cầu AI nêu lại giả định trước khi viết mã**
C. F1 — prompt mơ hồ; phòng bằng cách chia nhiệm vụ nhỏ
D. F11 — vòng 70%; phòng bằng cách chuyển chế độ

**Câu 8.** Sau **năm lượt** sửa, mỗi lần sửa lỗi này lại sinh lỗi khác, ngữ cảnh đầy thử nghiệm thất bại. Theo chương này, hành động đúng **đầu tiên** là gì?

A. Tiếp tục thêm lượt nữa, có thể lượt thứ sáu sẽ đúng
B. **Dừng lại (đã vượt quy tắc ba lượt), `git reset` về commit sạch, tự đọc thông báo lỗi, thu hẹp phạm vi, bắt đầu phiên mới**
C. Đổi sang mô hình mạnh hơn rồi tiếp tục
D. Viết prompt dài hơn, mô tả kỹ hơn

**Câu 9.** Một nhóm **chỉ ẩn nút "Duyệt" trên giao diện** với người dùng thường, nhưng **API phía máy chủ không kiểm tra quyền**. Đây là lỗ hổng nào, và cách phòng?

A. Lộ khóa bí mật; phòng bằng biến môi trường
B. **Thiếu kiểm tra quyền PHÍA MÁY CHỦ** (nhóm 2 của F9); phòng bằng **kiểm tra quyền ở MỌI endpoint**, không chỉ ẩn nút
C. SQL injection; phòng bằng truy vấn tham số hóa
D. Logic để trống; phòng bằng rà soát stub

**Câu 10.** Agent "tự tin" đề nghị cài một gói có tên rất hợp lý nhưng **ít người biết**. Trước khi cài, cần làm gì và vì sao?

A. Cài ngay vì agent đã kiểm tra
B. **Kiểm tra gói có thật trong kho chính thức — vì kẻ tấn công có thể đăng ký sẵn những tên gói mà AI hay bịa ra** (F5 + rủi ro mã độc)
C. Cài rồi gỡ nếu lỗi
D. Đổi mô hình khác để hỏi lại

**Câu 11.** Vì sao **Agentic Coding CLI** có rủi ro cao nhất trong ba chế độ làm việc với AI?

A. Vì nó chạy chậm nhất
B. **Vì nó là chế độ DUY NHẤT vừa TỰ THỰC HIỆN THAY ĐỔI vừa TỰ CHẠY ĐƯỢC MÃ — tạo vòng lặp có thể lan rộng nhanh**
C. Vì nó không có giao diện đồ họa
D. Vì nó cần kết nối Internet

**Câu 12.** Một nhóm muốn "tiết kiệm thời gian" nên cho agent **sửa trực tiếp 20 tệp** rồi mới xem kết quả. Theo chương này, nhận xét đúng và cách làm đúng?

A. Cách đó đúng, vì AI làm nhanh
B. **Sai — phải dùng PLAN MODE: sửa một kế hoạch sai tốn MỘT PHÚT, sửa hai mươi tệp sai tốn CẢ BUỔI**
C. Sai — phải chuyển sang chế độ chat
D. Sai — phải viết prompt dài hơn

**Câu 13.** Khi một lỗi được phát hiện, vì sao nên yêu cầu agent **viết kiểm thử TÁI HIỆN lỗi TRƯỚC** rồi mới sửa?

A. Để có thêm mã trong dự án
B. **Để XÁC NHẬN lỗi đã hiểu đúng, và để NGĂN LỖI QUAY LẠI (kiểm thử ở lại vĩnh viễn trong bộ kiểm thử)**
C. Vì yêu cầu của Git
D. Để agent chạy lâu hơn

**Câu 14.** Một nhóm dựng ứng dụng có giao diện nhập liệu cho cán bộ, **đồng thời** cần tự động gửi thông báo đa kênh và ghi vào bảng theo dõi hằng đêm. Nên chọn hướng nào?

A. Chỉ workflow no-code
B. Chỉ ứng dụng
C. **Cả hai: ứng dụng (giao diện) GỌI workflow (tích hợp, chạy nền)**
D. Chỉ dùng bảng tính

**Câu 15.** Một nhóm nộp sản phẩm: **chạy được trên máy nhóm**, **không có README**, **không có kiểm thử**, **một commit duy nhất "hoàn thành ứng dụng"**, **không ai giải thích được đoạn mã xử lý học bổng**. Bao nhiêu trong **sáu tiêu chí "hoàn thành"** bị vi phạm, và hai tiêu chí nào **bị kiểm tra trực tiếp khi bảo vệ**?

A. Vi phạm 3 tiêu chí; kiểm tra tiêu chí 1 và 2
B. **Vi phạm 4 tiêu chí (2, 3, 5, 6); tiêu chí 3 (giải thích diff) và 6 (người khác chạy được theo README) bị kiểm tra trực tiếp khi bảo vệ**
C. Vi phạm cả 6 tiêu chí
D. Không vi phạm tiêu chí nào vì sản phẩm chạy được

**Câu 16.** Một bạn nói: *"Vì AI viết được mã, em không cần học mô hình hóa quy trình nữa — chỉ cần prompt hay."* Phản biện đúng nhất dựa trên chương này là gì?

A. Vẫn cần học vì đó là yêu cầu của môn học
B. **Vì AI KHUẾCH ĐẠI chất lượng đặc tả chứ không thay thế đặc tả; và chỉ người hiểu quy trình mới ĐÁNH GIÁ được kết quả có đúng nghiệp vụ hay không — hai năng lực này chiếm trọng số lớn nhất của đồ án (30% là "đúng nghiệp vụ")**
C. Vì mô hình hóa giúp vẽ đẹp hơn
D. Vì BPMN là một ngôn ngữ lập trình

---

### Đáp án và giải thích

| Câu | Đáp án | Giải thích |
|---|---|---|
| **1** | **B** | Đúng **định nghĩa gốc của Karpathy**: không đọc mã, điều chỉnh bằng đối thoại, **bối cảnh dự án cá nhân không ai phụ thuộc**. A sai: kỹ thuật phần mềm có AI hỗ trợ **đòi đọc, hiểu, chịu trách nhiệm**. C sai: Agentic Coding là **mức C4 với agent tự chạy lệnh** — đề không nêu. D sai: hoàn toàn khác |
| **2** | **B** | ★ **Sai lầm là DÙNG SAI CHẾ ĐỘ, không phải dùng AI.** Sản phẩm **dùng thật** cần **chế độ kỹ thuật** (tiêu chí 3 "hoàn thành"). A sai: **"chạy được" không đồng nghĩa "đúng nghiệp vụ"** — lý do 5. C, D sai: **không phải vấn đề năng lực mô hình hay độ dài prompt** |
| **3** | **B** | ★ **Đúng định nghĩa F11**: *"nguyên mẫu xong trong MỘT BUỔI, BA TUẦN SAU vẫn chưa dùng được"*. Ba vấn đề nêu (phân quyền, dữ liệu rỗng, tích hợp) **chính là các thành phần của 30% cuối**. A sai: doom loop là **sửa đi sửa lại trong một phiên**. C sai: F5 là **gói/hàm không tồn tại**. D sai: F7 là **quên quy ước, viết trùng** |
| **4** | **B** | ★ **Đây là toàn bộ lý do dùng phép nhân.** A sai: **không phải chuyện số học, mà chuyện LOGIC**. C sai: hai yếu tố **không độc lập** — chúng **nhân vào nhau**. D sai: **không có trọng số gấp đôi** — **cả hai đều cần thiết** |
| **5** | **B** | Đúng **lý do 2** — dán mô hình **chính là kỹ thuật ngữ cảnh**. A sai: phân rã là **chia nhỏ nhiệm vụ**. C sai: bối cảnh quy trình là **ai dùng, bàn giao cho ai**. D sai: đánh giá là **năng lực con người**, không phải việc đưa ngữ cảnh |
| **6** | **B** | ★ **Bước D chính là phòng F1** — chia 15–30 phút, phạm vi rõ, nêu cả những gì **không** làm. A sai: F5 phòng bằng **đối chiếu tài liệu, khóa phiên bản**. C sai: F12 phòng bằng **tự viết phần lõi**. D sai: F9 phòng bằng **danh mục bảo mật** |
| **7** | **B** | ★ **"Chạy đúng kỹ thuật nhưng SAI quy tắc nghiệp vụ"** là **dấu hiệu ĐẶC TRƯNG của F2**. A sai: F3 là **không kiểm tra gì**. C sai: F1 là **"chung chung, sửa chỗ này hỏng chỗ kia"**. D sai: F11 là **mắc kẹt ba tuần ở 30% cuối** |
| **8** | **B** | ★ **Quy tắc BA LƯỢT** — năm lượt là **đã vượt ngưỡng**. Hành động phải gồm **reset về commit sạch** vì **mã đang chứa nhiều lần sửa sai và ngữ cảnh đã nhiễm**. A sai: **mỗi lượt làm nhiễu thêm**. C sai: **đổi mô hình không sửa được hướng lệch**. D sai: **prompt dài hơn làm ngữ cảnh nặng hơn** |
| **9** | **B** | ★ **Lỗ hổng bị đánh giá thấp nhất**: **ẩn nút là kiểm soát ở tầng HIỂN THỊ, không phải kiểm soát**. A, C, D là **lỗ hổng khác** — đề không nêu dấu hiệu tương ứng |
| **10** | **B** | ★ **F5 + cơ chế tấn công**: kẻ tấn công **đăng ký sẵn tên gói AI hay bịa** → **phát tán mã độc**. A sai: **agent không kiểm tra được kho thật**. C sai: **mã độc đã chạy rồi** — gỡ không xóa hậu quả. D sai: **đổi mô hình vẫn có thể bịa tên khác** |
| **11** | **B** | ★ **Hai điều kiện phải CÙNG XẢY RA**: **tự thực hiện thay đổi** VÀ **tự chạy được mã**. A, C, D là **thuộc tính bề mặt**, không phải **nguồn rủi ro** |
| **12** | **B** | ★ **"Điểm dừng có giá trị nhất trong toàn bộ quy trình"** — sửa **kế hoạch sai** tốn một phút. A sai: **"cảm giác tiết kiệm thời gian" chính là bẫy**. C sai: **chat không giải quyết** — vấn đề là **thiếu bước duyệt kế hoạch**. D sai: **prompt dài hơn không thay thế plan mode** |
| **13** | **B** | ★ **Hai lý do độc lập**: **xác nhận hiểu đúng** + **ngăn lỗi quay lại**. A, C, D là lý do **không có thật**. ★ **Lưu ý thêm**: viết test **sau** khi sửa thì test **khớp với mã vừa sửa** → **không còn là tiêu chuẩn độc lập** |
| **14** | **C** | ★ **Hướng số 3 của bảng ranh giới**: **cần CẢ HAI** → **ứng dụng gọi workflow**. A sai: **workflow không có giao diện nhập liệu cho người**. B sai: **ứng dụng tự làm tích hợp đa kênh là làm lại việc Chương 4 đã có**. D sai: **không đáp ứng được** |
| **15** | **B** | ★ **Vi phạm (2) không kiểm thử, (3) không giải thích được diff, (5) một commit không rõ thông điệp, (6) không README**. **Tiêu chí (1) đúng kịch bản** — có thể đạt. **Tiêu chí (4) bảo mật** — đề không nói. → **4 tiêu chí**; **hai tiêu chí hay bỏ sót nhất là 3 và 6, và bị kiểm tra trực tiếp khi bảo vệ**. A sai: **đếm thiếu**. C sai: **không phải cả 6** (1 và 4 chưa xác định). D sai: **"chạy được" không phải tiêu chí duy nhất** |
| **16** | **B** | ★ **Hai lập luận độc lập**: **(a) AI khuếch đại đặc tả, không thay thế** (lý do 1); **(b) chỉ người hiểu quy trình mới đánh giá được đúng nghiệp vụ** (lý do 5). **Cộng bằng chứng định lượng: 30% trọng số đồ án là "đúng nghiệp vụ"**. A sai: **lý do hành chính, không phải lý do bản chất**. C sai: **BPMN không phải để vẽ đẹp**. D sai: **BPMN KHÔNG phải ngôn ngữ lập trình** — lỗi khái niệm cơ bản |

> **Cách dùng bộ 16 câu này**: làm **không mở tài liệu**, giới hạn **30 phút** (≈ 1,9 phút/câu — đúng nhịp thi). Câu nào sai thì **quay lại đúng mục đã ghi** và **đọc lại cả mục**, không chỉ đọc dòng đáp án.

### Mười bốn câu ôn tập của bài giảng — bảng đối chiếu để không bỏ sót

> **Bài giảng có 14 câu ôn tập trải cả chương.** Dưới đây là **bảng đối chiếu nhanh** — câu nào **thuộc mục nào** trong tài liệu này:

| Câu ôn tập | Nội dung | Mục tương ứng |
|---|---|---|
| **1** | Phân biệt hai nghĩa Vibe Coding (5 tiêu chí); vì sao nhầm lẫn nguy hiểm | **5.1.1** |
| **2** | Các mức phổ AI Coding; vì sao tự chủ tăng thì kiểm chứng phải tăng | **5.1.1** (hai trục) |
| **3** | "Vấn đề 70%"; vì sao nặng nhất với người không có nền tảng | **5.1.1** |
| **4** | Sáu lý do tư duy BPM; lý do nào quan trọng nhất | **5.1.2** (gợi ý: **lý do 5 và 6**) |
| **5** | Giải thích công thức đặc tả × kiểm chứng | **5.1.2** |
| **6** | Năm nhóm công cụ; vì sao Git bắt buộc | **5.1.3**, **5.2.1** |
| **7** | Khi nào no-code, khi nào ứng dụng; ví dụ mỗi hướng | **5.1.3** |
| **8** | Bốn bước IDEA và sản phẩm đầu ra từng bước | **5.1.4** |
| **9** | Vì sao bước I hay bị bỏ qua, hậu quả | **5.1.4** (bước I) |
| **10** | So sánh ba chế độ; vì sao Agentic CLI rủi ro cao nhất | **5.2.1** |
| **11** | Nội dung tệp ngữ cảnh; liên hệ "chỉ dẫn" ở Chương 3 | **5.2.1** |
| **12** | Quy tắc ba lượt; phòng mẫu nào, vì sao hiệu quả | **5.2.2** (F6) |
| **13** | **Bốn lỗ hổng** bảo mật + biện pháp phòng | **5.2.2** (F9) |
| **14** | Sáu tiêu chí "hoàn thành" | **5.2.2** |

> ★ **Ba câu khó nhất trong 14 câu (nên tự trả lời bằng GIẤY trước khi thi)**: **câu 4** (lý do nào quan trọng nhất — cần lập luận), **câu 5** (phép nhân — cần giải thích **vì sao không phải phép cộng**), **câu 10** (rủi ro cao nhất — cần nêu **hai điều kiện cùng xảy ra**).

---

## 5.7 Nhìn lại toàn học phần — năm chương hội tụ

> ★ **Đây là bảng cuối cùng của học phần, và là câu trả lời cho câu hỏi "học năm chương này để làm gì?"**

| Chương | Cho ta | Trở thành gì ở Chương 5 |
|---|---|---|
| **1** | Hiểu **quy trình là gì**, tự động hóa ở **mức nào** (A0–A5), vòng đời BPM 6 giai đoạn | **Nền tảng khái niệm** — biết mình đang tự động hóa cái gì, ở mức nào |
| **2** | **Ngôn ngữ mô tả quy trình chính xác** — BPMN | ★ **Chính là ĐẶC TẢ** (vế thứ nhất của phép nhân) + **nguồn của bộ kiểm thử** |
| **3** | **Thiết kế phần thông minh** — bước nào luật, AI, người; ngưỡng tin cậy; sáu thành phần agent | **Thiết kế các node AI** trong ứng dụng; **kiến trúc agent chính là kiến trúc Agentic CLI** |
| **4** | **Hiện thực hóa bằng no-code** — luồng chạy thật, bảy nguyên tắc, xử lý lỗi, idempotency | **Workflow được ứng dụng GỌI** — không làm lại từ đầu; **bốn quyết định kiến trúc** lấy từ **tiêu chí 5, 7, 10** |
| **5** | **Xây ứng dụng hoàn chỉnh bằng AI** | ★ **Sản phẩm cuối kỳ — 60% điểm học phần** |

> ★ **"Bốn chương đầu đã đi trọn một VÒNG CUNG: MÔ TẢ quy trình (Ch.2) → THIẾT KẾ phần thông minh (Ch.3) → DỰNG hệ thống bằng no-code (Ch.4) → MỞ RỘNG bằng mã do AI sinh (Ch.5)."**

**Ba tư tưởng xuyên suốt — dùng để trả lời BẤT KỲ câu hỏi liên chương nào:**

| # | Tư tưởng | Xuất hiện ở |
|---|---|---|
| **1** | ★ **Dùng công cụ ĐÚNG CHỖ, không dùng công cụ MẠNH NHẤT** | **A0–A5 (Ch.1)** · **bảy mẫu agent (Ch.3)** · **sáu nhóm nền tảng (Ch.4)** · **phổ C0–C5 (Ch.5)** |
| **2** | ★ **KIỂM CHỨNG phải tương xứng với QUYỀN HẠN** | **ngưỡng tin cậy (Ch.3)** · **quản trị ba tầng (Ch.4)** · **quyền hạn + plan mode (Ch.5)** |
| **3** | ★ **HÀNH ĐỘNG KHÔNG ĐẢO NGƯỢC phải có NGƯỜI PHÊ DUYỆT** | **lan can 3 (Ch.3)** · **node WAIT / event-based gateway (Ch.4)** · **commit + đọc diff (Ch.5)** |

> ★ **Nếu chỉ nhớ được ba dòng này, bạn vẫn trả lời được phần lớn câu hỏi tình huống của cả học phần** — vì **mọi câu hỏi tình huống đều là một biến thể của một trong ba tư tưởng đó.**

---

*Hết Chương 5 — hết phần lý thuyết năm chương. Tiếp theo: `06-PhanII-DocSoDo.md` — mười hai dạng câu hỏi đọc sơ đồ BPMN (toàn bộ 12 câu Phần II của đề thi), phương pháp trace token sáu bước, và bộ sơ đồ mô tả bằng chữ để luyện.*
