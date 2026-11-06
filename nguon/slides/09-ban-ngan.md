@@ id: muc-tieu-s
@@ kicker: Mở đầu
# Mục tiêu chung và mô hình đang đề xuất

> Mục tiêu: **xây được một sản phẩm đáp ứng nhu cầu của nhiều khách hàng**. Câu hỏi hôm nay là "làm thế nào", không phải "có nên".

:::cols 2
### Mô hình đang đề xuất — phương án S
- Khách gửi yêu cầu bằng chữ, ảnh → cấu hình → sửa mã nếu cần → triển khai
- **Một bộ mã**; bản mới như Windows, khách **tự chọn** nâng cấp
- **File cấu hình** quyết định tính năng của từng khách
- Cài ở máy khách hoặc máy thuê; **khách tự quản DB**
- Không giao mã nguồn, **làm rối mã**
### Cách đọc các trang sau
- Mỗi khó khăn có mã **K-xx**, tra được trong tài liệu đầy đủ (159 mục)
- Mỗi ý có **số liệu đo trên chính hệ thống đang chạy**
- Cuối bộ: so sánh S với ba con đường ngành đã đi, và những câu cần trả lời
:::

Ghi chú: Đây không phải tài liệu phản đối ý tưởng. Hệ thống chạy tốt cho một công ty; câu hỏi là cần thêm gì để chạy tốt cho nhiều công ty khác nhau.

@@ id: o-va-buoc
@@ kicker: Một bộ mã cho nhiều khách
# Thêm một ô, thêm một bước duyệt — đều phải sửa mã cho mọi khách

## Thêm một ô vào biểu mẫu

:::stats
66 | bảng từ điển khai cột cứng trong mã
~243 | chỗ đọc ô theo vị trí cột
0 | bảng khai báo trường theo công ty
:::

## Thêm một bước duyệt

:::stats
38 | luồng trạng thái (bước duyệt) cố định trong DB
8+ | hàm tính chuỗi duyệt riêng, mỗi module một kiểu
0 | chỗ khai báo quy trình theo công ty
:::

> Ví dụ: tiếp nhận nhân sự mới luôn đúng **2** bước duyệt; nghỉ phép chỉ có **4** loại; ≤ 3 ngày thì 1 cấp — giống nhau cho mọi công ty.

Ghi chú: Hai khách dùng cùng chức năng, khách B chỉ muốn thêm một ô hay công ty X thêm một bước duyệt: hôm nay đều là sửa mã và chuyển đổi DB cho mọi khách. Ba tính năng nền tảng (hai trang sau) là cách gỡ đúng hai ví dụ này.

@@ id: qt-12-gon
@@ kicker: Quy trình
# "Khách gửi → làm → triển khai" bỏ qua 9/12 bước

:::stats
12 | bước giữa "khách gửi" và "triển khai"
3 | bước mô hình đang nhắc tới: tiếp nhận, phát triển, triển khai
0 | kiểm thử viên · 0 mẫu biên bản nghiệm thu · 0 tiêu chí viết trước
8 + 6 | vai cần ở phía mình + vai cần ở phía khách
:::

> Bỏ bước nào thì rủi ro của bước đó dồn xuống **lúc nghiệm thu** — đúng lúc tốn kém nhất để sửa. Ngay với khách nội bộ, yêu cầu đã qua **≥5** phiên bản bản vẽ rồi bỏ hẳn cách giao bằng bản vẽ.

Ghi chú: Chín bước bị bỏ qua gồm làm rõ, phân loại, ước lượng, chốt tiêu chí nghiệm thu, đánh giá ảnh hưởng tới khách khác, kiểm thử độc lập, nghiệm thu, đào tạo, hỗ trợ sau bàn giao.

@@ id: vh-gon
@@ kicker: Vận hành · bảo mật
# N máy chủ ở N khách, chưa có người chuyên nghiệp

:::stats
0 | DevOps · 0 chuyên gia bảo mật · 0 lần kiểm thử xâm nhập
1/3 | tầng bên mình kiểm soát — ứng dụng; máy chủ và mạng là của khách
36/104 | bảng mang trực tiếp mã công ty — cách ly dữ liệu nằm trong từng câu đọc
4 → 7–9 | dịch vụ mỗi khách khi thêm giám sát, hàng đợi, bộ nhớ đệm
:::

> Phần lớn việc vận hành, bảo mật là **dễ với người có nghề** — dùng công cụ là thấy. Cái khó là **không có người làm**, và khi bán thì mỗi việc làm lại ở **N** nơi. Khi khách báo lỗi, mình **không thấy** dữ liệu, **không giữ** máy chủ.

Ghi chú: Lo ngại bảo mật có câu trả lời đầu tiên rất rõ: cần người. Những việc khó thật nằm trong cách hệ thống được xây: cách ly dữ liệu giữa công ty, mã AI chưa ai soi, vá cho mọi phiên bản.

@@ id: ld-gon
@@ kicker: Luật · dữ liệu cá nhân
# Luật bảo vệ dữ liệu cá nhân đã có hiệu lực — không phải lựa chọn

:::cols
### Bắt buộc theo luật
Luật Bảo vệ dữ liệu cá nhân 91/2025 (từ 01/01/2026) · Luật An ninh mạng 116/2025 (từ 01/07/2026). Phạt tới **5%** doanh thu năm trước.
### Khách lớn sẽ hỏi
ISO/IEC 27001:2022 — chứng nhận cách công ty mình quản lý an toàn thông tin, **93** biện pháp, đánh giá mỗi năm.
### Nên tự làm trước
OWASP ASVS 5.0 — bảng kiểm bảo mật ứng dụng miễn phí, ~350 yêu cầu. SOC 2, SOX, GDPR: chỉ khi có khách nước ngoài.
:::

:::note
📊 Bán ERP thì mình thành **bên xử lý dữ liệu cá nhân** cho khách: **0** chức năng đồng ý / xem / xoá dữ liệu · **97** khoá ngoại trỏ tới nhân viên (khó "xoá dữ liệu của tôi") · tệp lưu trên Google Drive có thể bị coi là chuyển dữ liệu ra nước ngoài.
:::

Ghi chú: Các mục luật lấy từ bài phân tích của công ty luật, kiểm toán; cần luật sư đối chiếu văn bản gốc.

@@ id: tt-gon
@@ kicker: Tích hợp
# Cổng thanh toán và hoá đơn điện tử

:::stats
0/5 | cổng thanh toán phổ biến đã tích hợp
0 | tích hợp hoá đơn điện tử
0 | đường nhận thông báo từ bên ngoài
:::

- **Cổng phải gọi ngược vào máy chủ của khách** ⇒ máy khách phải mở ra internet, có tên miền, HTTPS.
- **Cổng đổi cách kết nối là khách phải nâng cấp** — không còn "khách tự chọn nâng cấp".
- **Tiền phải đúng tới từng đồng**: thông báo trùng, giao dịch treo, hoàn tiền một phần, đối soát cuối ngày.
- **Luật thuế đổi** (Nghị định 70/2025) là mọi khách phải nâng cấp đúng hạn.

Ghi chú: Khách bán hàng online sẽ đòi những thứ này ngay từ đầu. Mỗi tích hợp có lịch thay đổi riêng của bên ngoài, chồng lên lịch phát hành của mình.

@@ id: nguoi-gon
@@ kicker: Con người
# Ba cấp khách, tám vai, chưa vai nào có người riêng

:::cols 3
### Cấp nhỏ · < 100 người
1 máy, ứng dụng và DB chung. Dữ liệu không phải vấn đề.
### Cấp vừa · 100 – 2.000
DB tách máy riêng. Lo báo cáo chậm, giám sát.
### Cấp lớn · > 2.000
Nhiều máy, bản sao DB, hàng đợi. Lo tải, dữ liệu lớn.
:::

:::stats
8 | vai kỹ thuật cần: DBA, kiểm thử, kiến trúc sư, review mã, phân tích nghiệp vụ, DevOps, hỗ trợ, bảo mật
0 | vai đang có người riêng
1 | cách cài hiện có (cấp nhỏ); 0 lần kiểm thử tải
:::

Ghi chú: AI giúp mỗi người làm nhanh hơn, nhưng không thay được người ký "bản này đủ an toàn để giao" ở từng khâu.

@@ id: ket-gon
@@ kicker: Kết
@@ layout: dark
# Chọn hướng trước — rồi trả lời năm câu

:::cols 2
### Chọn hướng trước khi viết thêm module
Chọn A hoặc C ⇒ mọi module mới phải viết trên ba tính năng nền tảng. Chọn B ⇒ phí và đội bảo trì theo số khách phải có trong báo giá đầu tiên.
### Năm câu cần trả lời
1. Nâng cấp hỏng, dữ liệu mất — xử lý thế nào?
2. Lỗ hổng như 12/2025: ép nâng cấp hay vá ngược?
3. Ai kiểm thử, ai nghiệm thu, theo tiêu chí nào?
4. Làm cho cỡ khách nào trước?
5. Ai giữ 8 vai kỹ thuật?
:::

Ghi chú: Tài liệu đầy đủ có 159 khó khăn, mỗi mục kèm số liệu đo trên hệ thống hiện tại. Bản 40 trang và bản đầy đủ đi sâu từng phần.
