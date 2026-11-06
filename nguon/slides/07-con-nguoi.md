@@ id: tk-ba-kieu
@@ kicker: Phần 13 · Triển khai tại khách
# Ba kiểu cài = ba quy trình, ba mức trách nhiệm

| Kiểu | Ai giữ quyền cao nhất trên máy | Bên mình vào máy để hỗ trợ bằng cách nào |
| --- | --- | --- |
| Máy thuê của bên mình | Mình | Trực tiếp |
| Máy của khách, bên mình cài | Khách | Khách phải cấp đường vào (VPN, SSH), ghi lại ai làm gì |
| Máy của khách, khách tự cài | Khách | Có thể **không có** quyền gì |

- **Lịch triển khai do IT khách quyết** — khung giờ bảo trì, phê duyệt thay đổi, kế hoạch quay lại khi hỏng; mỗi khách một quy định. Hiện triển khai bằng **1** script do người phát triển chạy, bất cứ lúc nào (K-132).
- Hướng dẫn cài hiện có: **1** bộ, gắn với hạ tầng của chính mình (K-131).

Ghi chú: Ba kiểu cài nghe như một lựa chọn cho khách, nhưng với bên mình là ba quy trình hỗ trợ khác nhau, ba mức cam kết khác nhau.

@@ id: tk-moi-truong
@@ kicker: Phần 13 · Triển khai tại khách
# Môi trường thử, định cỡ máy, đào tạo

:::stats
3 | môi trường cho 1 khách hôm nay — mỗi khách cần thêm môi trường thử (K-133)
0 | số liệu định cỡ — "cần máy cỡ nào?" là câu đầu tiên khách hỏi (K-134)
7 | vai, mỗi vai một bộ màn và luồng khác nhau
0 | tài liệu cho người dùng cuối — ~25.000 dòng tài liệu hiện có là cho kỹ thuật (K-135)
:::

Ghi chú: Đào tạo phải làm cho từng vai, từng đợt, kể cả khi khách thay người. Đây là chi phí lặp lại ở mỗi khách.

@@ id: dn-8-vai
@@ kicker: Phần 14 · Đội ngũ · hiện 0 vai có người riêng
# 8 vai cần người chịu trách nhiệm, kể cả khi dùng AI thoải mái

:::cols
### Quản trị DB
Review cấu trúc, kiểm các bước chuyển đổi, dữ liệu lớn
### Kiểm thử viên
Kiểm độc lập, dựng 46 loại kiểm thử
### Kiến trúc sư
Khuôn chung, đánh giá ảnh hưởng tới mọi khách
### Người review mã
Đọc lại mã AI viết trước khi phát hành
### Phân tích nghiệp vụ
Biến chữ, ảnh của khách thành đặc tả kiểm được
### DevOps
Đóng gói, bộ cài, triển khai, nâng cấp N khách
### Hỗ trợ, trực sự cố
Gỡ lỗi trên máy khách, trực khi sập
### Bảo mật
Quét, vá, theo dõi lỗ hổng, kiểm thử xâm nhập
:::

> AI giúp **mỗi người làm nhanh hơn** — không thay được **người ký "bản này đủ an toàn để giao"** ở từng khâu (K-136).

Ghi chú: Tám vai này là tối thiểu cho một công ty bán phần mềm cho nhiều khách. Hiện nhiều vai đang dồn vào một người.

@@ id: dn-nguoi-moi
@@ kicker: Phần 14 · Đội ngũ
# Người mới tiếp nhận chậm — kể cả có AI

:::stats
~143.000 | dòng mã · 1.148 tệp · 509 tệp kiểm thử
~1.920 | quyết định trong 182 tệp; ≥20 đã bị đảo — phải biết dòng nào còn hiệu lực
37% | thay đổi là sửa lỗi — với chỉ 1 khách
:::

- **AI đọc được mã, nhưng hiểu vì sao** một quyết định được đưa ra, chỗ nào không được đụng, vẫn cần thời gian và người kèm (K-137).
- **Một đội vừa phát triển, vừa triển khai, vừa hỗ trợ** ⇒ liên tục bị kéo ra chữa cháy ở khách, sản phẩm chậm lại đúng lúc cần đi nhanh nhất (K-138).
- **Chi phí và sự phụ thuộc vào công cụ AI** — đổi phiên bản, đổi giá, đổi cách làm; chưa đo chi phí AI trên mỗi tính năng (K-139).

Ghi chú: Rủi ro "một người nắm hết" giảm được bằng tài liệu và kiểm thử, nhưng không giảm được bằng AI một mình.

@@ id: dg-lam-roi
@@ kicker: Phần 15 · Đóng gói và làm rối mã
# Làm rối mã là gờ giảm tốc, không phải ổ khoá

:::stats
100% | quyền quản trị máy chủ chạy phần mềm nằm ở khách (K-140)
104 + 89 | bảng và tệp chuyển đổi dạng chữ — không làm rối được (K-141)
0 | cơ chế khoá bản quyền (K-144)
:::

- **Cấu trúc dữ liệu lộ trọn vẹn** — DB nằm trên máy khách; cấu trúc + giao diện đủ để một đội giỏi dựng lại phần lớn nghiệp vụ.
- **Gỡ lỗi khó hơn hẳn** — lỗi gửi về chỉ vị trí trong mã đã làm rối; phải giữ bản đối chiếu cho **từng** phiên bản đã giao, tới 12 bản (K-142).
- **Làm rối có thể làm hỏng hoặc chậm** — Next.js/React dựa vào tên hàm và cấu trúc mã; phải kiểm lại toàn bộ trên bản đã làm rối mỗi lần phát hành (K-143).

Ghi chú: Chống cài chui — cài thêm cho công ty con, dùng tiếp sau khi hết hạn — cần khoá bản quyền, mà khoá chạy trên máy khách thì cũng gỡ được.

@@ id: cn-o-lai
@@ kicker: Phần 16 · Công nghệ
# Ngôn ngữ lập trình không phải nút thắt chính

> Chỉ khoảng **5** khó khăn trong 159 gắn trực tiếp với nền tảng; phần còn lại giữ nguyên dù viết bằng ngôn ngữ nào. Nhưng ở lại hay chuyển đi đều có giá.

| Ở lại Node.js + Next.js + PostgreSQL | 📊 |
| --- | --- |
| Next.js đổi rất nhanh — mỗi năm một bản lớn, mỗi bản được vá ~2 năm (K-145) | 13 · 14 · 15 · 16 trong 2022–2025 |
| Giao diện và xử lý dính vào nhau — không có lớp API riêng cho tích hợp, di động, báo cáo (K-146) | **47** tệp thao tác ghi gắn vào màn; API công khai: **0** |
| Node.js xử lý trên một luồng — phép tính nặng làm chậm mọi người khác (K-147) | Chưa đo |
| IT của khách lớn quen Java, .NET, Python (K-148) | SAP: ABAP/Java · Dynamics: .NET · Odoo, ERPNext: Python |

Ghi chú: Kết luận chuyên môn: chuyển ngôn ngữ không giải quyết được phần lớn khó khăn trong tài liệu này.

@@ id: cn-chuyen
@@ kicker: Phần 16 · Công nghệ
# Chuyển sang Python / Java / Go: viết lại là làm lại từ đầu

| Lựa chọn | Được | Mất |
| --- | --- | --- |
| Python (Django, FastAPI) | Odoo, ERPNext dùng; nhiều thư viện nghiệp vụ; dễ tuyển | Chậm hơn ở tính toán nặng; vẫn cần giao diện riêng ⇒ hai ngôn ngữ |
| Java (Spring) | Chuẩn doanh nghiệp; IT khách lớn tin dùng | Nặng, phát triển chậm hơn; vẫn cần giao diện riêng |
| .NET (C#) | Như Java; hợp khách dùng hệ sinh thái Microsoft | Như Java |
| Go | Nhanh, gọn, triển khai dễ | Ít thư viện cho nghiệp vụ ERP; ít người làm ERP bằng Go |

:::note
📊 Phải tái hiện đúng **~143.000** dòng mã + **509** tệp kiểm thử + **~1.920** quyết định nghiệp vụ. AI dịch mã nhanh, nhưng phần tốn là **chứng minh bản mới chạy giống hệt bản cũ** (K-149).
:::

Ghi chú: Trong lúc viết lại thì không có tính năng mới — đúng lúc cần chứng minh sản phẩm với khách.

@@ id: mk-hop-dong
@@ kicker: Phần 17 · Thị trường, giá, hợp đồng
# Hợp đồng và báo giá cần những thứ kỹ thuật chưa có

| Khó khăn | 📊 |
| --- | --- |
| Hợp đồng phải ghi: tiêu chí nghiệm thu, phân định lỗi / yêu cầu mới, thời gian xử lý sự cố, số phiên bản hỗ trợ, ai chịu trách nhiệm máy chủ – DB – backup, bàn giao dữ liệu khi chấm dứt (K-150) | **0** mẫu hợp đồng; **0/7** điều khoản có quy trình đứng sau |
| Báo giá — viết mã chỉ là 1/12 bước (K-151) | **0** dữ liệu về công triển khai một khách |
| Dự án ERP thường vượt dự tính, kể cả nhà cung cấp có kinh nghiệm (K-152) | **~57%** vượt ngân sách, **57–65%** vượt thời gian |
| Giá theo cỡ khách — khách 50.000 người tốn gấp hàng trăm lần khách 30 người (K-153) | **0** mô hình chi phí |
| Giá cố định hay theo công · tiền gắn với nghiệm thu (K-154, K-155) | Chưa có số |

Ghi chú: Phần thị trường viết ngắn vì không phải trọng tâm kỹ thuật, nhưng mỗi điều khoản hợp đồng đều cần một quy trình kỹ thuật đứng sau mới thực hiện được.

@@ id: mk-thi-truong
@@ kicker: Phần 17 · Thị trường
# Một khách chưa phải là thị trường

:::stats
1 | khách tham chiếu, 15 người dùng (K-157)
0 | chỉ số hiệu quả đã đo — tiết kiệm bao nhiêu giờ, giảm bao nhiêu sai sót (K-158)
07/2026 | năm ra đời — so với SAP 1972 · MISA 1994 · Odoo 2005 (K-159)
:::

> **Sản phẩm hay dịch vụ?** Tuỳ biến nhiều như làm dự án nhưng muốn nâng cấp đồng loạt như bán sản phẩm — đó là vị trí khó có lãi nhất (K-156).

Ghi chú: Đối thủ có hàng chục năm, đối tác triển khai, tài liệu và cộng đồng. Lợi thế của mình phải nằm ở chỗ khác — và cần khách thứ hai, thứ ba để biết hệ thống hợp với ai.

@@ id: lo-cap-khach
@@ kicker: Lo ngại · "Mỗi khách một bài toán"
# Ba cấp khách, ba cách cài

:::cols 3
### Cấp nhỏ · < 100 người
1 máy, ứng dụng và DB chung. Lo: sao lưu, cập nhật bảo mật. Dữ liệu **không** phải vấn đề.
### Cấp vừa · 100 – 2.000 người
DB tách sang máy riêng. Lo: báo cáo chậm, giám sát, giờ bảo trì.
### Cấp lớn · > 2.000 người
Nhiều máy ứng dụng, bản sao DB, hàng đợi, bộ nhớ đệm. Lo: tải, dữ liệu lớn, hạ tầng nhiều máy.
:::

> Mốc chia cấp là **ước lượng** — **0** lần kiểm thử tải. Hiện chỉ có **1** cách cài (cấp nhỏ); thêm một cấp là thêm một bộ cài, một bộ kiểm thử, một chiều trong ma trận phát hành.

Ghi chú: Cài riêng cho từng khách thì đúng là mỗi khách một bài toán. Chia cấp khách giúp gom bài toán lại thành ba, nhưng mỗi cấp vẫn là một sản phẩm vận hành riêng.
