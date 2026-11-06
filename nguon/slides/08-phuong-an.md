@@ id: pa-tong-quan
@@ kicker: Bốn phương án
# Một bộ mã phục vụ nhiều khách: ngành đã đi ba con đường

:::cols 1
### S — đang đề xuất
Một bộ mã + file cấu hình; sửa mã khi cấu hình không đủ; cài ở khách; khách tự chọn nâng cấp.
### A — một bộ mã cho mọi khách
Khách theo phần mềm; khác biệt chỉ qua cấu hình. Ví dụ: MISA AMIS, Base.vn, Salesforce.
### B — mỗi khách một bộ mã
Phần mềm theo khách, chiều mọi yêu cầu. Ví dụ: đối tác Navision trước 2018, công ty làm phần mềm theo dự án.
### C — lõi chung + gói mở rộng
Lõi không ai sửa cho một khách; phần riêng là gói cài thêm. Ví dụ: Business Central, SAP "clean core", Odoo kèm module riêng.
:::

Ghi chú: Ba con đường A, B, C đều có công ty thành công. Câu hỏi là phương án S đang gần con đường nào, và có kế thừa được ưu điểm của con đường đó không.

@@ id: pa-bang
@@ kicker: Bốn phương án · so sánh
# So sánh S với A, B, C

| Tiêu chí | **S** — đang đề xuất | **A** — một bộ mã | **B** — mỗi khách một bộ mã | **C** — lõi + gói mở rộng |
| --- | --- | --- | --- | --- |
| Chiều khách được tới đâu | Hứa rất nhiều — kể cả sửa lõi | **Thấp** — từ chối nhiều yêu cầu | **Cao nhất** | Cao, trong giới hạn điểm mở rộng |
| Chi phí phục vụ khách thứ N | Tăng theo số phiên bản đang chạy | **Thấp** | **Tăng tuyến tính** | Thấp với lõi, tuyến tính với gói riêng |
| Một lỗ hổng như 12/2025 | Vá mọi phiên bản khách đang dừng | Vá **1** lần nếu mình vận hành | Vá **N** lần trên N bộ mã | Vá lõi 1 lần + kiểm từng gói |
| Nâng cấp | Khách tự chọn ⇒ nhiều bản song song | Nâng mọi khách cùng lúc | Mỗi lần một dự án — thường **không nâng** | Lõi nâng định kỳ; gói phải theo kịp |
| Đầu tư trước | Như A **cộng** như B | **Rất lớn** — nền tảng | **Thấp** | **Lớn** — nền tảng + điểm mở rộng |
| Dòng tiền | Chưa có mô hình | Thuê bao đều | Dự án + phí bảo trì | Thuê bao + dự án gói riêng |
| Muốn đi đường này, hệ thống còn phải xây | **Cả hai:** 3 tính năng nền tảng (như A) **và** cách giữ N phiên bản trên N máy khách (như B) | 3 tính năng nền tảng (trường, quy trình, cây tổ chức động) + mình tự vận hành máy chủ cho mọi khách | Cách quản lý N bộ mã: tách mã theo khách, đưa bản vá sang từng bộ, có người hiểu từng bộ | 3 tính năng nền tảng + "ổ cắm" gắn gói riêng của khách (điểm mở rộng, hiện **0**) |

Ghi chú: Đọc theo hàng: phương án S có cột "đầu tư trước" và "chi phí khách thứ N" nặng nhất, trong khi chưa có mô hình dòng tiền.

@@ id: pa-s
@@ kicker: Bốn phương án
@@ layout: dark
# Phương án S dùng mã của A, nhưng chịu chi phí của B

> "Một bộ mã, file cấu hình quyết định" là cách của A. Nhưng "cài ở máy khách, khách tự chọn nâng cấp" làm **mỗi khách dừng ở một phiên bản** — mỗi phiên bản còn chạy là một bộ mã phải vá, phải hỗ trợ: tức là B.

:::stats
10 | khách dừng ở 10 bản khác nhau ⇒ 10 bộ mã phải vá (ra bản mỗi tháng)
7 | dòng phiên bản Next.js phải vá trong sự cố 12/2025
434 | lần thay đổi mã trong ~2 tháng với 1 khách
:::

Khác B ở chỗ các bộ mã đó **không sinh ra để chiều khách**, mà do khách ngừng nâng cấp vào những lúc khác nhau — nên **không chiều khách được như B** (K-100).

Ghi chú: Đây là kết luận quan trọng nhất của phần so sánh. Phương án S gánh chi phí bảo trì của B mà không có lợi thế chiều khách của B, và cần nền tảng của A mà chưa có.

@@ id: pa-b-c
@@ kicker: Bốn phương án
# A khó với khách Việt, B tốn theo số khách, C cần thứ chưa có

:::cols
### A đòi nói "không" (K-101)
Doanh nghiệp chọn ERP làm riêng thay vì MISA, SAP thường **chính vì quy trình của họ không khớp phần mềm chuẩn**. Mỗi lần nói "có" khi chưa có điểm mở rộng là trượt từ A sang B. 📊 Ngay 1 khách nội bộ: ~1.920 quyết định, ≥20 bị đảo.
### B: AI làm rẻ việc tạo, không làm rẻ việc giữ (K-102)
Mỗi bộ mã riêng phải vá bảo mật, nâng nền tảng khi hết hỗ trợ, có người hiểu khi khách gọi. 📊 10 khách × ~143.000 dòng = **1,43 triệu** dòng; mỗi lần nền tảng hết hạn là **10** dự án nâng cấp.
### C: đường các hãng lớn đã chọn (K-103)
Microsoft bỏ cách sửa thẳng mã Navision cho từng khách để chuyển sang gói mở rộng; SAP gọi là "clean core". 📊 **0** điểm mở rộng · **0/3** tính năng nền tảng · **1/3** số khách cần để vẽ đúng khuôn chung.
:::

Ghi chú: C không miễn phí: nó cần đúng ba tính năng nền tảng ở Phần 4 và các điểm mở rộng có phiên bản. Nhưng đó là con đường đã được chứng minh ở quy mô lớn.

@@ id: pa-to-chuc
@@ kicker: Bốn phương án · tổ chức công ty
# Mỗi phương án là một kiểu công ty khác nhau

| | Đội ngũ cốt lõi | Ai quyết làm gì tiếp | Ai làm việc với khách | Rủi ro tổ chức |
| --- | --- | --- | --- | --- |
| **A** | Nhóm sản phẩm · nhóm nền tảng · nhóm theo module · kiểm thử tự động · vận hành 24/7 · bảo mật · hỗ trợ 3 tầng | Quản lý sản phẩm, theo **số đông** khách | Đội triển khai: cấu hình, nhập dữ liệu, đào tạo — **không sửa mã** | Mất khách có quy trình khác chuẩn |
| **B** | Mỗi khách một nhóm dự án · người phụ trách khách · đội bảo trì theo hợp đồng · nhóm nhỏ giữ thư viện chung | Từng khách, cho bộ mã của họ | Chính nhóm dự án | Đội bảo trì phình theo số khách; người nghỉ mang theo hiểu biết |
| **C** | Như A cho lõi · nhóm (hoặc đối tác) làm gói mở rộng · kiến trúc sư giữ "hợp đồng" điểm mở rộng · khâu duyệt gói riêng | Lõi: quản lý sản phẩm. Gói riêng: khách đặt | Đội triển khai + nhóm gói mở rộng | Giữ kỷ luật "không ai sửa lõi cho một khách" |
| **S** | Cần **cả** đội của A **và** đội của B · cộng đội vận hành từ xa cho N máy chủ không phải của mình | Chưa rõ | Chưa rõ — đội cấu hình hay đội sửa mã | Gánh chi phí của cả A lẫn B |

Ghi chú: Đổi phương án giữa chừng là tái cơ cấu công ty, không chỉ là sửa mã (K-104). Hiện 0/8 vai kỹ thuật có người riêng.

@@ id: ket-chon
@@ kicker: Kết
@@ layout: dark
# Phải chọn hướng trước khi viết thêm module

:::cols
### Nếu chọn A hoặc C
Từ hôm nay mọi module mới phải viết trên **ba tính năng nền tảng**: trường theo khách, quy trình duyệt theo khách, cây đơn vị do khách khai. Mỗi module viết theo cách cũ là thêm một module phải làm lại.
### Nếu chọn B
Không cần nền tảng, nhưng **phí bảo trì và đội bảo trì theo số khách** phải có ngay trong báo giá đầu tiên.
:::

> Mỗi tuần chưa chọn là thêm mã viết theo khuôn "một công ty" — đúng thứ sẽ phải làm lại.

Ghi chú: Đây là đề xuất hành động duy nhất của buổi trình bày: chọn hướng, rồi mới quyết các câu hỏi còn lại.

@@ id: ket-cau-hoi
@@ kicker: Kết · những câu cần trả lời
# Những câu cần trả lời trước khi đi tiếp

1. Nâng cấp hỏng ở máy khách, dữ liệu mất, khách không có backup — xử lý thế nào?
2. Lỗ hổng như 12/2025: **ép** nâng cấp hay **vá ngược**? Hỗ trợ tối đa bao nhiêu phiên bản?
3. Ai kiểm thử, ai nghiệm thu — theo tiêu chí viết trước nào?
4. Khách đòi sửa sâu vào lõi — chọn cách nào, ai đánh giá ảnh hưởng tới khách khác?
5. Trong 29 loại kiểm thử còn thiếu, loại nào phải có trước khách đầu tiên?
6. Ai review cấu trúc dữ liệu và mã trước khi giao cho khách?
7. Giám sát đặt riêng từng khách hay gom về một chỗ — và ai trực?
8. Chọn phương án nào — A, B hay C — **trước** khi viết thêm module mới?
9. Ai chịu trách nhiệm pháp lý về dữ liệu cá nhân của khách?
10. Bán cho cỡ khách nào trước — nhỏ (một máy) hay lớn (cụm máy)?
11. Ai giữ từng vai trong 8 vai kỹ thuật?
12. Phân hệ nào trong 46 phân hệ chưa có phải làm xong trước khách đầu tiên?

Ghi chú: Không cần trả lời hết trong buổi họp, nhưng mỗi câu chưa có câu trả lời là một rủi ro sẽ lộ ra ở khách đầu tiên.

@@ id: ket-nguon
@@ kicker: Kết · nguồn
# Tài liệu đầy đủ và nguồn số liệu

- **Tài liệu đầy đủ:** [159 khó khăn, 17 phần](../tai-lieu/ban-erp-cho-khach-hang.html) — mỗi khó khăn có mã K-xx và dòng 📊 số liệu.
- **Số liệu đo trên hệ thống** (Phụ lục B): đếm trên kho mã nhánh phát triển ngày 05/11/2026 và bản sao dữ liệu production 21/09/2026.
- **Nguồn bên ngoài** (Phụ lục C): CVE-2025-55182 · chính sách vòng đời Next.js, Node.js, PostgreSQL · Panorama Consulting · Luật 91/2025/QH15 · Nghị định 356/2025 · Luật 116/2025/QH15 · Nghị định 70/2025 · ISO/IEC 27001:2022 · OWASP ASVS 5.0 · tài liệu VNPay.

> Các mục luật lấy từ bài phân tích của công ty luật, kiểm toán và báo chí — cần luật sư đối chiếu văn bản gốc trước khi dùng cho hợp đồng.

Ghi chú: Ai muốn kiểm lại một con số thì mở tài liệu đầy đủ, tìm mã K-xx tương ứng, rồi xem cách đo ở Phụ lục B.

@@ id: ket-huong
@@ layout: image
@@ image: assets/sai-huong.png
@@ kicker: Kết
# Đi sai hướng thì nhanh mấy cũng vô ích

AI giúp mình đi **rất nhanh**. Trước khi tăng tốc, hãy chắc chắn mình đang đi **đúng hướng**.

Ghi chú: Câu trên ảnh: "Speed is irrelevant if you are going in the wrong direction" — tốc độ không còn ý nghĩa nếu đi sai hướng. Đây là lời kết: tốc độ viết mã nhờ AI là thật, nhưng hướng đi — một bộ mã hay nhiều bộ mã, xây nền tảng trước hay nhận khách trước — phải chốt trước khi tăng tốc.
