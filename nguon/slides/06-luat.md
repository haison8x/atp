@@ id: ld-bang
@@ kicker: Phần 10 · Chuẩn tuân thủ cho khách Việt Nam
# Nội bộ thì bỏ qua được nhiều chuẩn — bán cho khách thì không

| Mức | Chuẩn / luật | Đòi hỏi chính | Hiện có |
| --- | --- | --- | --- |
| **Bắt buộc theo luật** | Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 (từ 01/01/2026) · Nghị định 356/2025 · Nghị định 330/2026 về xử phạt | Xin đồng ý; cho xem, sửa, xoá, rút đồng ý; hồ sơ đánh giá tác động; báo sự cố; phạt tới **5%** doanh thu | ❌ 0 chức năng đồng ý, xem, xuất, xoá |
| **Bắt buộc theo luật** | Luật An ninh mạng 116/2025/QH15 (từ 01/07/2026) | Bảo vệ hệ thống theo cấp độ; lưu dữ liệu tại Việt Nam với một số loại doanh nghiệp | 🟡 Chưa đánh giá — chờ nghị định |
| **Khách lớn sẽ hỏi** | ISO/IEC 27001:2022 | Chứng nhận cách công ty mình quản lý an toàn thông tin: **93** biện pháp, đánh giá mỗi năm | ❌ 0 chứng nhận |
| **Nên tự làm trước** | OWASP ASVS 5.0 | Bảng kiểm bảo mật ứng dụng miễn phí, ~**350** yêu cầu, 3 mức | ❌ 0 lần đối chiếu |
| **Chỉ khi có khách nước ngoài** | SOC 2 Type II · SOX · GDPR | Khách Mỹ · công ty con của doanh nghiệp niêm yết Mỹ · dữ liệu người châu Âu | Không cần cho khách Việt |

Ghi chú: Bảng xếp theo mức cần thiết với khách Việt Nam. Luật bảo vệ dữ liệu cá nhân đã có hiệu lực — không phải việc chọn làm hay không. Các mục luật lấy từ bài phân tích của công ty luật, kiểm toán; cần luật sư đối chiếu văn bản gốc.

@@ id: ld-ben-xu-ly
@@ kicker: Phần 10 · Dữ liệu cá nhân
# Bán ERP thì mình thành bên xử lý dữ liệu cá nhân cho khách

> Hồ sơ nhân sự có CCCD, lương, tài khoản ngân hàng, ngày nghỉ ốm — dữ liệu sức khoẻ thuộc loại **nhạy cảm**. Mỗi lần mình hỗ trợ, gỡ lỗi, sao lưu hộ hay cho khách thuê máy là mình đang xử lý dữ liệu đó (K-108).

:::stats
5% | doanh thu năm trước — mức phạt tối đa khi chuyển dữ liệu ra nước ngoài sai luật
10× | khoản thu — mức phạt khi mua bán dữ liệu cá nhân
0 | mẫu hợp đồng xử lý dữ liệu
:::

:::note
Doanh nghiệp nhỏ và khởi nghiệp được ân hạn một số nghĩa vụ trong 5 năm (Điều 41 Nghị định 356) — cần luật sư xác nhận phần nào áp cho mình, phần nào cho khách.
:::

Ghi chú: Mỗi khách cần một hợp đồng xử lý dữ liệu nói rõ trách nhiệm hai bên. Đây là việc pháp lý, nhưng nó kéo theo yêu cầu kỹ thuật ở các trang sau.

@@ id: ld-xoa
@@ kicker: Phần 10 · Dữ liệu cá nhân
# Luật đòi "xoá dữ liệu của tôi", ERP lại phải giữ dữ liệu nhiều năm

:::cols
### Xoá mà không gãy (K-109)
Người nghỉ việc có quyền yêu cầu xoá, nhưng lịch sử nhân sự và chứng từ kế toán phải giữ theo luật khác. Phải thiết kế "xoá" thành **ẩn danh hoá** sao cho báo cáo cũ và các liên kết không gãy. 📊 **97** khoá ngoại trỏ tới bảng nhân viên; **0** chức năng ẩn danh hoá.
### Mã hoá mới có ở một chỗ (K-110)
Mã hoá **4** trường của hồ sơ người mới; điện thoại, địa chỉ, mã số thuế ở các bảng khác lưu dạng thường; bản sao lưu chỉ nén, không mã hoá.
:::

Ghi chú: Đây là ví dụ điển hình của yêu cầu pháp lý biến thành yêu cầu thiết kế: không thể thêm vào sau một cách rẻ tiền, vì nó đụng tới mọi bảng có liên kết với nhân viên.

@@ id: ld-drive-iso
@@ kicker: Phần 10 · Dữ liệu cá nhân, chứng nhận
# Tệp trên Google Drive, chứng nhận ISO và nhật ký

:::cols
### Dữ liệu có thể đã ra nước ngoài (K-111)
Tệp đang lưu trên Google Drive. Chuyển dữ liệu cá nhân ra nước ngoài cần hồ sơ riêng và có mức phạt cao nhất. 📊 **1/4** nơi lưu tệp phổ biến; **73** tệp mã gắn với cây thư mục Drive.
### ISO 27001 chấm cả vận hành (K-112)
Chứng nhận cấp cho **công ty mình**. Cài ở máy khách thì phạm vi chỉ gồm phát triển và hỗ trợ; khách thuê máy của mình thì gồm cả vận hành — nặng hơn nhiều.
### Hai câu mọi chuẩn đều hỏi (K-113)
Người lập có tự duyệt được không? Nhật ký có ai sửa được không? 📊 Có bảng nhật ký, nhưng **0** cơ chế chống sửa ở tầng DB, và khách có toàn quyền trên DB.
:::

Ghi chú: Chi phí đánh giá ISO 27001 cho công ty nhỏ khoảng 20.000–23.000 USD cho 3 năm, chưa kể tư vấn và khoảng 550–600 giờ công mỗi năm nếu tự làm (ước tính của các bên tư vấn).

@@ id: tt-cong
@@ kicker: Phần 11 · Cổng thanh toán
# Khách bán hàng online: ERP phải nhận tiền qua VNPay, MoMo, ZaloPay…

:::stats
0/5 | cổng phổ biến đã tích hợp (VNPay, MoMo, ZaloPay, OnePay, VietQR)
0 | đường nhận thông báo từ bên ngoài (webhook)
:::

:::cols 2
### Mỗi cổng một kiểu kết nối (K-114)
Cách ký dữ liệu, mã lỗi, luồng hoàn tiền, tệp đối soát đều khác nhau — mỗi cổng là một tích hợp phải viết, kiểm, bảo trì riêng.
### Cổng phải gọi ngược vào máy khách (K-115)
Người mua trả xong, cổng gửi kết quả về một địa chỉ của khách ⇒ **máy chủ khách phải mở ra internet**, có tên miền, có HTTPS. Với VNPay, địa chỉ này ở môi trường thật phải đăng ký với VNPay — mỗi khách một thủ tục.
:::

Ghi chú: Đây là chỗ ERP chạm vào tiền thật của khách và của người mua. Nó va thẳng với mô hình "cài trong mạng nội bộ của khách".

@@ id: tt-tien
@@ kicker: Phần 11 · Cổng thanh toán
# Tiền phải đúng tới từng đồng — và khách mất quyền "tự chọn nâng cấp"

| Khó khăn | Vì sao | 📊 |
| --- | --- | --- |
| Cổng đổi cách kết nối là khách **phải** nâng cấp (K-116) | Khách dừng ở bản cũ sẽ ngừng thu được tiền online — mâu thuẫn trực tiếp với "khách tự chọn nâng cấp" | Thêm lịch thay đổi của **5** bên ngoài |
| Tiền đúng trong mọi tình huống lỗi (K-117) | Thông báo đến hai lần, đến trước khi người mua quay lại, giao dịch treo, hoàn tiền một phần, đối soát cuối ngày | **0** chỗ khoá dòng khi ghi |
| Mỗi khách một bộ khoá bí mật (K-118) | Lưu ở đâu, ai đổi định kỳ, lộ thì thu hồi thế nào — nhân N khách, N cổng | **24** biến cho **1** công ty |
| Chuẩn thẻ PCI DSS (K-119) | Chuyển sang trang của cổng thì phạm vi nhỏ; tự nhận số thẻ thì phạm vi rất lớn | **Chưa có** quyết định |

Ghi chú: Cổng thanh toán là ví dụ rõ nhất cho thấy "khách tự chọn nâng cấp" không đứng được: bên thứ ba đổi, mình buộc phải đổi theo, ở mọi khách.

@@ id: tt-hoa-don
@@ kicker: Phần 11 · Hoá đơn điện tử, kế toán, sàn thương mại điện tử
# Thu tiền kéo theo hoá đơn điện tử và kế toán — luật thuế không chờ khách

:::cols
### Hoá đơn điện tử (K-120)
Nghị định 123/2020, sửa bằng Nghị định 70/2025 — ví dụ từ 01/06/2025, hộ kinh doanh doanh thu từ 1 tỷ đồng/năm phải dùng hoá đơn từ máy tính tiền kết nối cơ quan thuế. Mỗi nhà cung cấp hoá đơn (MISA meInvoice, Viettel, VNPT, BKAV…) một kiểu kết nối; luật đổi là **mọi** khách phải nâng cấp đúng hạn. 📊 **0** tích hợp hoá đơn điện tử.
### Kế toán: tự làm hay tích hợp MISA (K-70)
Tiền thu được phải thành chứng từ, công nợ, sổ sách. Nếu **không tự làm phân hệ kế toán** thì phải **tích hợp với phần mềm kế toán khách đang dùng** — ở Việt Nam thường là MISA: đẩy hoá đơn, phiếu thu – chi, công nợ sang và đối soát hai chiều; MISA đổi cách kết nối là mình phải đổi theo. 📊 Kế toán: **chưa có**; tích hợp kế toán: **0**.
### Sàn thương mại điện tử (K-121)
Đơn từ Shopee, Lazada, TikTok Shop phải về ERP; tồn kho phải trừ ngay để không bán vượt. 📊 Thương mại điện tử: **chưa có**; **0** chỗ khoá dòng khi trừ kho.
:::

Ghi chú: Bán online không chỉ là một nút thanh toán: nó kéo theo hoá đơn, đồng bộ đơn, tồn kho thời gian thực, đối soát — mỗi thứ là một tích hợp với bên ngoài có lịch thay đổi riêng.
