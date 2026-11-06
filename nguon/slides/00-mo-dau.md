@@ id: cover-40
@@ layout: cover
@@ kicker: Bản vừa · 40 trang
# Bán ERP cho khách ngoài: cần gì để làm được

Những khó khăn kỹ thuật, quy trình, vận hành, pháp lý — mỗi ý kèm **số liệu đo trên chính hệ thống đang chạy**.

Ghi chú: Bản vừa, khoảng 45–60 phút. Đi qua tất cả các nhóm khó khăn, mỗi nhóm vài trang, rồi mới so sánh các phương án và chốt những câu cần trả lời.

@@ id: cover-full
@@ layout: cover
@@ kicker: Bản đầy đủ · tra cứu
# Bán ERP cho khách ngoài: những khó khăn kỹ thuật

Toàn bộ **159 khó khăn**, 17 phần, kèm **số liệu đo trên chính hệ thống đang chạy**. Bản này dùng để tra cứu và thảo luận sâu từng phần.

Ghi chú: Bản đầy đủ đi theo đúng thứ tự tài liệu. Không cần trình bày hết trong một buổi — có thể mở đúng phần đang bàn. Mã K-xx trên từng trang khớp với tài liệu đầy đủ.

@@ id: muc-dich
@@ kicker: Mở đầu
# Câu hỏi hôm nay là "làm thế nào", không phải "có nên"

> Mục tiêu chung: **xây được một sản phẩm đáp ứng nhu cầu của nhiều khách hàng**. Tài liệu này liệt kê những gì phải giải để đạt mục tiêu đó.

:::cols
### Mỗi khó khăn có mã K-xx
Tra ngược được về tài liệu đầy đủ (159 mục, 17 phần).
### Mỗi khó khăn có 📊 số liệu
Đo trên chính hệ thống đang chạy, hoặc từ nguồn công khai có dẫn link.
### Xếp theo mức quan trọng
Phần 1–8 là trọng tâm; Phần 9–17 ít cấp bách hơn nhưng vẫn phải giải.
:::

Ghi chú: Nhấn mạnh rằng đây không phải tài liệu phản đối ý tưởng. Hệ thống hiện tại chạy tốt cho một công ty; câu hỏi là cần thêm gì để chạy tốt cho nhiều công ty khác nhau.

@@ id: mo-hinh-s
@@ kicker: Mở đầu · mô hình đang đề xuất
# Mô hình đang được đề xuất (gọi là phương án S)

- Khách đưa yêu cầu bằng **chữ, ảnh** → công ty dựng cấu hình → sửa mã nếu cấu hình không đủ → triển khai.
- **Một bộ mã nguồn duy nhất.** Ra bản mới giống Windows: khách **tự chọn** nâng cấp hay không.
- Tính năng nào dùng là do **file cấu hình** của từng khách.
- Khách đòi sửa sâu vào lõi → sửa mã sao cho **không ảnh hưởng khách khác**.
- Cài lên máy chủ của khách hoặc máy thuê bên mình; khách tự cài hoặc thuê bên mình cài.
- Bộ cài có sẵn DB; **khách tự backup, tự tối ưu**; bên mình cung cấp script.
- Không giao mã nguồn; **mã được làm rối** trước khi giao.

Ghi chú: Đọc lại đúng mô hình để mọi người cùng hiểu một thứ. Cuối bộ slide sẽ đặt mô hình này cạnh ba con đường mà ngành phần mềm doanh nghiệp đã đi.

@@ id: can-nha
@@ kicker: Mở đầu · một hình ảnh
@@ layout: dark
# Từ "tự xây nhà cho mình" sang "mở công ty xây nhà"

:::cols 2
### Hôm nay: căn nhà tự xây cho gia đình mình
Xây nhanh, sửa lúc nào cũng được. Ở trong nhà nên biết chỗ nào dột. Đập đi xây lại cũng không sao.
### Khi bán: công ty xây nhà cho người khác
Chủ nhà đang ở bên trong khi mình sửa. Có bản vẽ ký trước, có nghiệm thu, có bảo hành. Một lỗi thiết kế phải sửa ở **mọi** căn đã xây.
:::

Ghi chú: Hình ảnh này giúp người không làm kỹ thuật thấy ngay khác biệt: cùng một kỹ năng xây nhà, nhưng làm cho mình và làm cho khách là hai nghề khác nhau.

@@ id: nam-dieu-kien
@@ kicker: Mở đầu
# Sáu điều kiện thuận lợi hôm nay — cả sáu sẽ mất khi bán

| Điều kiện hôm nay | Số liệu | Khi bán cho khách |
| --- | --- | --- |
| Được **xoá sạch dữ liệu làm lại** bất cứ lúc nào | Mỗi lần kiểm tra đầy đủ = **xoá sạch DB 2 lần** | Dữ liệu khách không bao giờ được xoá |
| **Một** phiên bản đang chạy | Cao điểm **140** lần thay đổi mã **trong 1 ngày** | Mỗi khách dừng ở một phiên bản khác nhau |
| **Một** khách, ngồi cùng nhà, chịu được lỗi | **37%** lần thay đổi mã là sửa lỗi | Nhiều khách, ở xa, không chịu được lỗi |
| Yêu cầu đổi liên tục, sửa ngay | **~1.920** quyết định trong ~2 tháng; **≥20** bị đảo | Mỗi lần đổi phải qua phân loại, kiểm thử, nghiệm thu |
| Người viết mã cũng vận hành, **thấy mọi dữ liệu và máy chủ** | **3** môi trường do chính mình giữ | Không thấy dữ liệu khách, không giữ máy chủ, mã bị làm rối |
| Mình **chấp nhận** sản phẩm chưa hoàn hảo: còn lỗi, còn rủi ro bảo mật, rủi ro mất dữ liệu | **0** chuyên gia bảo mật · **0** lần khôi phục thử từ bản sao lưu · **0/89** lần đổi cấu trúc DB có đường quay lại | Khách **không chấp nhận**: lỗi là khiếu nại, lộ dữ liệu là bị phạt theo luật, mất dữ liệu là đòi bồi thường |

Ghi chú: Hệ thống chạy tốt hôm nay không phải ngẫu nhiên — nó dựa vào sáu điều kiện này. Khi bán, cả sáu điều kiện đều biến mất cùng lúc, nên tốc độ và cách làm hiện tại không mang sang được nguyên vẹn. Điều kiện cuối là quan trọng nhất: rủi ro mà công ty mình đang chấp nhận cho chính mình, khách sẽ không chấp nhận — và khi xảy ra ở khách thì người chịu trách nhiệm là mình (Luật Bảo vệ dữ liệu cá nhân 91/2025, Phần 10).

@@ id: tam-dieu
@@ kicker: Mở đầu · lộ trình
# Tám điều quan trọng nhất

1. **Dữ liệu khách có thể mất khi nâng cấp** — 0/89 lần đổi cấu trúc có đường quay lại.
2. **"Như Windows" không chạy được với ERP** — lỗ hổng 10/10 điểm đã bị khai thác thật.
3. **"Khách gửi → làm → triển khai" bỏ qua 9/12 bước.**
4. **Sửa cho khách này không hỏng khách khác** — thêm một ô, một bước duyệt, một cấp tổ chức đều phải sửa mã cho mọi khách.
5. **Chưa có hệ thống kiểm thử để bán** — 29/46 loại đang là 0.
6. **Mã và cấu trúc dữ liệu do AI sinh, chưa ai review** — 78% thay đổi có AI viết cùng.
7. **Vận hành N máy chủ ở N khách** — 0 DevOps, 0 chuyên gia bảo mật.
8. **Phương án S dùng mã của "một bộ mã" nhưng chịu chi phí của "mỗi khách một bộ mã".**

Ghi chú: Đây là lộ trình của bản đầy đủ. Tám điều này tương ứng Phần 1 đến Phần 8 của tài liệu.
