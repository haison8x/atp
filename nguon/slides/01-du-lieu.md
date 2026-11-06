@@ id: du-lieu-nhip
@@ kicker: Phần 1 · Dữ liệu của khách
# Cấu trúc dữ liệu đổi rất thường xuyên

> Mỗi bản mới thường kèm thay đổi "bản vẽ kết cấu" của kho dữ liệu. Ở máy phát triển thì **đập đi xây lại**; ở khách phải sửa kết cấu **khi kho đang đầy hàng**.

:::stats
89 | lần chuyển đổi cấu trúc DB (K-06)
29 | lần trong 6 ngày (15–21/09/2026)
500 | lệnh sửa bảng; 34 lần đổi tên, 7 lần xoá cột/bảng
~12× | sửa bảng cũ nhiều hơn tạo bảng mới (500 so với 43) — K-08
:::

:::note
Quy tắc dự án ghi nguyên văn: _"chi phí sai schema ≈ 0"_. Đúng khi có một khách và được xoá làm lại; khi bán, chi phí sai cấu trúc = **N khách × rủi ro mất dữ liệu** (K-07).
:::

Ghi chú: Tốc độ đổi cấu trúc hiện nay là bình thường ở giai đoạn dựng nhanh cho một khách. Nhưng mỗi lần đổi cấu trúc ở khách là một lần chuyển dữ liệu thật, không được hỏng một dòng.

@@ id: du-lieu-lui
@@ kicker: Phần 1 · Dữ liệu của khách
# Nâng cấp hỏng thì không có nút "quay lại"

:::stats
0/89 | bước chuyển đổi có đường lùi (K-01)
24 giờ | dữ liệu có thể mất — backup 1 lần/ngày
88 | bước phải chạy liên tiếp nếu khách cài bản đầu, nay mới nâng (K-02)
:::

- **Máy phát triển luôn "đạt", máy thật mới hỏng** — đổi tên một giá trị lựa chọn đã làm máy thật hỏng khi nâng cấp; lỗi loại này ghi **6** lần (K-03).
- **Dữ liệu mỗi khách một kiểu** — riêng lỗi số kiểu Việt `319,87` bị đọc thành 0 đã vấp **5** lần (K-04).
- **Lỗi chỉ lộ trên dữ liệu thật** — chạy tác vụ thật trên bản sao dữ liệu thật mới lộ **140** dòng bị khoá nhầm (K-05).

Ghi chú: "Khách tự chọn nâng cấp" nghĩa là có khách đứng yên hai năm rồi nhảy thẳng lên bản mới nhất, chạy một chuỗi bước chuyển đổi chưa ai chạy thử trên dữ liệu mình không được nhìn thấy.

@@ id: du-lieu-quyen
@@ kicker: Phần 1 · Khách có toàn quyền trên DB
# Mình chịu trách nhiệm cấu trúc, nhưng không giữ chìa khoá

:::cols
### Khách sửa DB theo cách của họ
Thêm chỉ mục, trigger, báo cáo phụ thuộc cột, sửa tay dữ liệu "chữa cháy" — lần nâng cấp sau **thất bại**, khó chứng minh lỗi do ai (K-09, K-12).
### Không phát hiện được DB bị sửa
Nâng cấp an toàn cần công cụ so cấu trúc thật với cấu trúc mong đợi. Hiện có **0** công cụ (K-10).
### "Khách tự backup" = không ai làm
Phần lớn công ty vừa và nhỏ không có người quản trị DB. Để vận hành **1** khách, bên mình đang cần **31** script máy chủ (K-11).
:::

Ghi chú: Mô hình "khách tự quản DB" chuyển rủi ro sang khách trên giấy, nhưng khi dữ liệu hỏng thì người bị gọi vẫn là mình.

@@ id: du-lieu-khac
@@ kicker: Phần 1 · Những khó khăn khác khi nâng cấp
# Nâng cấp ở khách còn vấp những gì

| Khó khăn | 📊 Số liệu |
| --- | --- |
| Một số thay đổi **khoá cả bảng** khi chạy ⇒ phải dừng hệ thống, hẹn giờ với khách (K-13) | Thời gian chạy trên dữ liệu khách lớn: **chưa từng đo** |
| Công cụ **đòi người ngồi trả lời** khi chuyển đổi — ở máy khách không ai hiểu để trả lời (K-14) | Ghi lại **5** lần |
| Mỗi tổ hợp cấu hình là một hình dạng dữ liệu (K-15) | **25** nhóm tính năng ⇒ **2²⁵ ≈ 33 triệu** tổ hợp lý thuyết |
| Chuyển đổi kéo theo tác vụ nền, báo cáo, tích hợp (K-16) | **5** tác vụ định kỳ; **26** lệnh xử lý dữ liệu |
| 100 khách thì bao nhiêu bảng? (K-17) | Mỗi khách thêm 5 bảng riêng ⇒ **~600** bảng trong DB của **mọi** khách |

Ghi chú: Mỗi dòng ở đây là một loại sự cố đã gặp hoặc sẽ gặp khi nâng cấp ở khách. Phần lớn đã xảy ra ngay với khách nội bộ.

@@ id: du-lieu-db
@@ kicker: Phần 1 · DB đóng sẵn trong bộ cài, sao lưu
# DB đóng sẵn trong bộ cài — bớt một việc, sinh việc khác

- Phiên bản DB cố định, không lệch giữa các khách — **được**.
- Nâng PostgreSQL lên bản lớn mới thành **việc của mình trên mọi máy khách**, phải dừng hệ thống.
- DB chung máy với ứng dụng thì tranh tài nguyên; khách lớn thường đòi dùng DB **của họ** — lại lệch phiên bản.
- DB nằm trong bộ cài của mình mà "khách tự quản" — ranh giới trách nhiệm càng mờ (K-18).

:::stats
11/2028 | PostgreSQL 16 hết hỗ trợ — mọi khách phải nâng trước mốc đó
1/4 | loại dữ liệu cần giữ đang được sao lưu
0 | lần khôi phục thử từ bản sao lưu
:::

Ghi chú: Lần đổi bản PostgreSQL gần nhất, script sao lưu đã suýt xoá nhầm bản sao lưu tốt. Sao lưu và khôi phục là việc thường ngày của một DevOps có nghề — hiện chưa có người đó (Phần 7).

@@ id: windows-cve
@@ kicker: Phần 2 · "Như Windows"
@@ layout: dark
# Lỗ hổng bảo mật không chờ khách sẵn sàng

:::stats
10/10 | điểm nghiêm trọng — CVE-2025-55182 (12/2025)
1 | lần gửi yêu cầu là chiếm được máy chủ, không cần đăng nhập
7 | dòng phiên bản Next.js phải ra bản vá riêng
:::

> Lỗ hổng **đã bị khai thác thật**. Hệ thống mình dùng đúng nền tảng này — hôm nay **mình đã ở bản an toàn**, vì chỉ có một máy chủ do mình giữ. Khi bán, khách "chọn không nâng cấp" thì máy chủ của họ mở toang.

- Phải chọn: **ép** cập nhật (tức là không còn "khách tự chọn") hoặc **vá ngược** cho từng phiên bản cũ (K-19).
- Windows **ép** cập nhật bảo mật mỗi tháng, và không phải chuyển đổi dữ liệu kế toán, kho, nhân sự mỗi lần nâng (K-21).

Ghi chú: Đây là ví dụ thật, không phải giả định. Một nền tảng phổ biến bị lỗ hổng 10/10, chỉ một yêu cầu là chiếm máy chủ. Nếu lúc đó mình có 10 khách ở 10 phiên bản, mình phải vá 10 lần, hoặc ép tất cả nâng cấp.

@@ id: windows-nhieu-ban
@@ kicker: Phần 2 · "Như Windows"
# Nhiều phiên bản cùng sống = nhiều sản phẩm

:::stats
12 | phiên bản cùng sống nếu phát hành mỗi tháng, hỗ trợ 12 tháng (K-20)
72 | tổ hợp phải kiểm cho mỗi bản phát hành (K-23)
29 | lần đổi cấu trúc dữ liệu có thể nằm trong một bản mới
:::

- Mỗi phiên bản còn khách dùng phải **tái hiện lỗi, vá lỗi trên đúng phiên bản đó**.
- Ma trận 72 = **4** phiên bản × **3** kiểu cài × **3** cấu hình điển hình × **2** cỡ tải — ví dụ khiêm tốn.
- Không tách nhánh mã nhưng thực chất vẫn là nhiều sản phẩm.

Ghi chú: "Một bộ mã" chỉ đúng ở kho mã. Ở phía khách, mỗi phiên bản đang chạy là một sản phẩm riêng phải hỗ trợ.

@@ id: windows-vong-doi
@@ kicker: Phần 2 · Nền tảng tự hết hạn
# Nền tảng bên dưới tự hết hạn, dù khách không đụng gì

| Thành phần | Thời gian được vá | Mốc hết hỗ trợ |
| --- | --- | --- |
| Next.js | ~2 năm mỗi bản lớn | Next.js 15: **21/10/2026** |
| Node.js | 30 tháng mỗi bản LTS | Node 20: **30/04/2026** (đã hết) |
| PostgreSQL | 5 năm mỗi bản lớn | PostgreSQL 16: **11/2028** |
| Thư viện | **51** trực tiếp, **~900** gián tiếp | **3** bản nâng cấp lớn đang bị chặn |

> Mọi khách phải được nâng nền tảng định kỳ — **kể cả khách "chọn không nâng cấp"** (K-22).

Ghi chú: Đây là lý do thứ hai khiến "khách tự chọn nâng cấp" không đứng được: nền tảng hết hạn thì không còn bản vá bảo mật, dù khách hài lòng với tính năng hiện có.

@@ id: windows-chinh-sach
@@ kicker: Phần 2 · Chính sách phát hành
# Bốn câu chưa có chính sách

| Câu hỏi | 📊 Hiện có |
| --- | --- |
| Làm xong yêu cầu nào triển khai ngay cho khách đó, hay gom đợt phát hành chung? (K-24) | **~31** lần thay đổi mã/ngày cho **1** khách |
| File cấu hình cũng có phiên bản — bản mới đổi nghĩa một mục thì file của từng khách chuyển đổi thế nào? (K-25) | **24** biến cấu hình máy chủ; file cấu hình nghiệp vụ theo khách: **0** |
| Hỗ trợ bản cũ đến bao giờ? (K-26) | **Chưa có** chính sách vòng đời |
| Ghi chú phát hành cho người dùng và IT khách (K-27) | **0** |

Ghi chú: Bốn câu này không cần công nghệ mới, chỉ cần quyết định. Nhưng thiếu quyết định thì mỗi khách sẽ tự hiểu một kiểu.
