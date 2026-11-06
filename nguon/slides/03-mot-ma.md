@@ id: mot-ma-4-cach
@@ kicker: Phần 4 · Một bộ mã cho nhiều khách
# Sửa cho khách này mà không hỏng khách khác: bốn cách, cách nào cũng có giá

| Cách | Cái giá |
| --- | --- |
| Rẽ nhánh theo tên khách trong mã ("nếu là khách X thì…") | Nhanh lúc đầu. Sau 10 khách, mỗi chức năng là một mớ điều kiện; sửa một chỗ phải thử lại cho mọi khách |
| Mỗi khách một "phiên bản" của đoạn logic đó (cắm – rút) | Mỗi lần đổi lõi phải kiểm lại **mọi** phiên bản đã cắm; phải biết trước chỗ nào được cắm |
| Đưa thành cấu hình | Chỉ làm được với thứ biết trước sẽ khác; công thức tính toán dần biến cấu hình thành **một ngôn ngữ lập trình thu nhỏ** |
| Cơ chế mở rộng (plugin) cho khách hoặc đối tác tự viết | Mâu thuẫn với "không giao mã, làm rối mã"; khách đã dựa vào thì **không được đổi nữa** |

:::note
📊 Mã hiện có **0** điểm mở rộng thiết kế cho mục đích này (K-49).
:::

Ghi chú: Đây là bài toán kiến trúc khó nhất của mọi phần mềm doanh nghiệp. Ba trang tiếp theo là ba ví dụ nhỏ nhất cho thấy hệ thống hiện tại chưa chọn cách nào trong bốn cách này.

@@ id: them-o
@@ kicker: Phần 4 · Ví dụ thứ nhất
# Hai khách dùng cùng chức năng — khách B chỉ muốn thêm một ô

> Ở mọi module, danh sách trường **viết cứng cho mọi công ty**. Thêm một ô cho khách B là sửa mã và sửa DB — và khách A cũng nhận ô đó (K-50).

:::stats
66 | bảng từ điển khai cột cứng trong mã
~243 | chỗ đọc ô theo vị trí cột — khách bỏ hay đổi thứ tự một cột là gãy
0 | bảng khai báo trường theo công ty, trong toàn bộ 104 bảng
:::

Ghi chú: Ngay phần trông "cấu hình được" nhất là các bảng từ điển — dữ liệu lưu dạng JSON theo công ty — thì danh sách cột vẫn khai trong mã, và nghiệp vụ đọc ô theo "cột thứ mấy".

@@ id: them-buoc
@@ kicker: Phần 4 · Ví dụ thứ hai
# Quy trình y hệt nhau — công ty X chỉ thêm một bước duyệt

| Module | Các bước (cố định trong DB) | Ai duyệt (viết cứng trong mã) |
| --- | --- | --- |
| Tiếp nhận nhân sự mới | Mời → Xem xét → **Duyệt 1 → Duyệt 2** → IT cấp → Xong | TP Nhân sự → CEO; trưởng phòng: CEO → Chủ tịch |
| Sửa hồ sơ nhân sự | **Quản lý → Nhân viên NS → Trưởng NS** → Áp dụng | Tên bước nằm ngay trong cấu trúc DB |
| Nghỉ phép | Chờ → Duyệt / Từ chối (lưu bước n/N) | ≤ **3** ngày: 1 cấp; dài hơn: 2 cấp |
| Đơn hàng · Giải ngân | Nháp → Chờ → Duyệt | 1 bước |
| Từ điển (66 bảng) | Khoá → Đang sửa → Chờ duyệt → Trả về | Chuỗi duyệt tính trong mã |
| Kế hoạch năm · tháng | Nháp → Gửi → Xác nhận / Trả về | Theo cây tổ chức, chuỗi vị trí |

:::stats
38 | luồng trạng thái cố định trong cấu trúc DB
8+ | hàm tính chuỗi duyệt riêng, mỗi module một kiểu
0 | chỗ khai báo quy trình theo công ty
:::

Ghi chú: Thêm một bước cho công ty X là chuyển đổi DB cho mọi khách, cộng rẽ nhánh theo tên khách trong mã, sửa màn, nhãn, thông báo, hạn xử lý (K-51).

@@ id: so-cap
@@ kicker: Phần 4 · Ví dụ thứ ba
# Hai công ty có số cấp tổ chức khác nhau

| Công ty | Cây tổ chức thật | Hệ thống hiện tại |
| --- | --- | --- |
| Nhỏ | Công ty → phòng → nhân viên (không có trưởng nhóm) | 🟡 Chạy **một phần** — chuỗi duyệt bỏ qua được ghế trống, nhưng nhãn, cột "Trưởng nhóm", bước giao chỉ tiêu cho nhóm vẫn hiện |
| Giống công ty mình | Công ty → phòng → trưởng nhóm → nhân viên | ✅ Đúng khuôn |
| Tập đoàn | Tổng công ty → vùng → công ty con → khối/phòng → nhóm → nhân viên | ❌ Không có chỗ đặt "vùng"; công ty không có công ty mẹ; phòng không có phòng con |

:::stats
0 | cột "đơn vị cha" ở bảng công ty và bảng phòng ban ⇒ tối đa 2 tầng đơn vị
5 + 7 | vai nghiệp vụ cố định trong DB + bậc vị trí cố định trong mã
40–72 | tệp mã gọi thẳng tên từng vai (CEO 72 · Trưởng nhóm 40)
:::

Ghi chú: Thêm một cấp không phải thêm một dòng dữ liệu, mà là sửa cấu trúc DB, hàm tính cấp trên – cấp dưới, phạm vi dữ liệu, chuỗi duyệt, giao và cộng dồn chỉ tiêu, và mọi màn có cột theo cấp — cho mọi khách (K-52).

@@ id: danh-muc
@@ kicker: Phần 4 · Danh mục cố định
# Danh mục cố định cũng vậy — và một chỗ đã đi đúng hướng

:::cols 2
### Danh mục nằm trong cấu trúc DB
Loại nghỉ phép chỉ có đúng **4** loại: phép năm, ốm, không lương, việc riêng. Công ty muốn thêm "nghỉ thai sản" hay "nghỉ cưới" là **một lần chuyển đổi DB cho mọi khách** (K-53). Tổng cộng **59** danh sách giá trị cố định.
### Điểm sáng: nghỉ phép lưu "bước n trên N"
Đúng cách ở tầng dữ liệu — thêm bước không cần đổi cấu trúc. Nhưng **luật** số cấp duyệt (≤ 3 ngày thì 1 cấp) vẫn viết cứng, giống nhau cho mọi công ty. Chỉ **1/9** module làm được như vậy (K-54).
:::

Ghi chú: Điểm sáng này đáng giữ: nó cho thấy cách làm đúng đã có mầm trong hệ thống, chỉ chưa thành nền tảng chung.

@@ id: nen-tang-3
@@ kicker: Phần 4 · Phải xây gì
# Ba tính năng nền tảng phải xây, rồi chuyển từng module sang

:::cols
### ① Trường dữ liệu theo khách
Khai báo trường theo công ty; biểu mẫu và kiểm tra dữ liệu tự sinh; trường mới hiện ở danh sách, tìm kiếm, báo cáo, xuất Excel.
### ② Bộ máy quy trình duyệt theo khách
Chuỗi bước khai trong DB theo công ty và loại hồ sơ; hồ sơ lưu "bước n trên N"; hồ sơ đang dở chạy tiếp theo quy trình cũ khi quy trình đổi.
### ③ Cây đơn vị do khách khai
Số cấp, tên cấp, đơn vị cha – con tuỳ khách; cấp trên, phạm vi dữ liệu, chuỗi duyệt, cộng dồn chỉ tiêu đều đọc từ cây.
:::

:::note
📊 **25** nhóm tính năng · **38** luồng trạng thái · **8+** cách tính chuỗi duyệt gom về một bộ máy · **~243** chỗ đọc theo vị trí cột · **5** vai và **2** tầng đơn vị cố định phải thành cây do khách khai (K-55).
:::

Ghi chú: Đây không phải chỉnh vài form, mà là làm lại tầng dưới của mọi module. Nhưng đây cũng chính là thứ biến hệ thống từ "phần mềm của một công ty" thành "sản phẩm cho nhiều công ty".

@@ id: gan-cung
@@ kicker: Phần 4 · Gắn cứng với một công ty
# Hệ thống gắn cứng với một công ty ở hàng trăm chỗ

:::stats
45 | tệp chứa tên công ty
73 | tệp chứa cây thư mục Google Drive của công ty
119 | tệp gọi thẳng tên vai; riêng "Chủ tịch" 41 tệp
~455 | tệp giao diện viết thẳng tiếng Việt, 0 bộ đa ngôn ngữ
:::

- **Luật của một công ty đã thành luật của cả hệ thống** — ví dụ "một người chỉ giữ một vị trí", trong khi kiêm nhiệm rất phổ biến ở doanh nghiệp Việt (K-57).
- **Chỉ đăng nhập bằng Google, chỉ lưu tệp lên Google Drive** — khách dùng Microsoft 365 không dùng được: **1/3** kiểu đăng nhập, **1/4** nơi lưu tệp phổ biến (K-58).
- **Không thể làm khuôn chung đúng khi mới có một khách** — quy tắc "ba lần": cần thấy ít nhất 3 trường hợp; hiện có **1/3** (K-59).

Ghi chú: Trên tổng 1.148 tệp mã. Phần lớn các quyết định trong 1.920 quyết định là luật của một công ty, chưa tách cái nào là luật chung, cái nào là luật riêng.

@@ id: cau-hinh
@@ kicker: Phần 4 · "Tính năng do file cấu hình quyết định"
# File cấu hình vẫn là công tắc bật/tắt, chỉ đổi tên

:::stats
1.024 | tổ hợp với 10 mục bật/tắt
1 triệu+ | tổ hợp với 20 mục
~157.000 | tổ hợp trạng thái chỉ từ 3 luồng duyệt khi kiểm vét cạn
:::

- **Tính năng phụ thuộc lẫn nhau** — bật A mà tắt B thì sao? Cấu hình phải tự kiểm tổ hợp hợp lệ; hiện **0** cơ chế (K-62).
- **Mỗi chỗ cho phép "sửa riêng" là một lời hứa tương thích vĩnh viễn** — 10 khách × 5 chỗ = **50** điểm kiểm lại mỗi lần đổi lõi (K-63).
- **Sửa riêng ở bản 1.5, khách nâng lên 2.0** — phần sửa riêng còn chạy không? Ai kiểm? (K-64)
- **Tắt một tính năng khi đã có dữ liệu** — dữ liệu đó đi đâu? (K-67)

Ghi chú: Mỗi mục cấu hình làm hệ thống chạy khác đi là một nhánh trong mã phải kiểm thử. Chưa có quy tắc phân định cái gì cấu hình được, ai cấu hình (K-68).

@@ id: pham-vi
@@ kicker: Phần 4 · Phạm vi còn phải xây
# Khách nghe "ERP" sẽ so với Odoo, SAP, MISA

:::stats
10 | phân hệ đã có, trên 65 phân hệ thường gặp
9 | phân hệ có một phần
46 | phân hệ chưa có
:::

| Nhóm | Chưa có — ví dụ |
| --- | --- |
| Tài chính – kế toán | Kế toán tổng hợp, công nợ, **hoá đơn điện tử**, ngân hàng, tài sản cố định, giá thành, thuế |
| Kinh doanh, marketing | Báo giá, hợp đồng, khuyến mãi, bán lẻ tại quầy, **thương mại điện tử**, email/SMS |
| Nhân sự | Chấm công, nghỉ phép, **lương, bảo hiểm, thuế TNCN** |
| Nền tảng | Ứng dụng di động, **API công khai**, báo cáo tự thiết kế, đa ngôn ngữ |

Ghi chú: Tích hợp với kế toán, hoá đơn điện tử, ngân hàng hiện là 0 (K-70). Nhập dữ liệu ban đầu — phần tốn công nhất của mọi dự án ERP — chỉ cho chính công ty mình đã phải viết 11 lệnh riêng (K-71). Kho ứng dụng của Odoo có hơn 80.000 module.
