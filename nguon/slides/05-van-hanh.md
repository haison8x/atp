@@ id: vh-devops
@@ kicker: Phần 7 · Vận hành
# Cần ít nhất một DevOps và một chuyên gia bảo mật — hiện chưa có ai

| Việc người có nghề sẽ làm ngay | Hiện trạng |
| --- | --- |
| Sao lưu đủ loại dữ liệu, mã hoá, khôi phục thử | Chỉ **1/4** loại; **0** lần khôi phục thử; mất tới **24 giờ** |
| Gia cố máy chủ và cấu hình mạng của DB | Chưa rà soát |
| Quét thư viện có lỗ hổng, quét mật khẩu lọt vào mã | ~**900** thư viện, **0** lần quét |
| Quản lý mật khẩu, khoá · chống dò mật khẩu | **24** biến trong tệp cấu hình chép tay · **0** trong ứng dụng |
| Dây chuyền kiểm tra và đóng gói tự động, ký bộ cài | **0**; đóng gói từ **1** máy cá nhân |
| Bộ cài đứng một mình cho khách | **0**; **31** script gắn với hạ tầng riêng |
| Giám sát, cảnh báo, theo dõi tác vụ định kỳ | **0**; **5** tác vụ chạy lặng lẽ |
| Đường vào máy khách có kiểm soát · tiếp nhận sự cố | **0** quy trình · **0** hệ thống |

> Mỗi dòng, một người có nghề làm được — nhưng cộng lại là **việc toàn thời gian**, và **nhân với số khách** (K-91).

Ghi chú: Đây là những việc "dễ" với người có nghề: chạy công cụ là thấy, sửa trong vài ngày. Cái khó không nằm ở từng việc mà ở chỗ hiện không có người làm, và khi bán thì mỗi việc phải làm lại ở N nơi, định kỳ.

@@ id: vh-n-may
@@ kicker: Phần 7 · N máy chủ của N khách
# Máy chủ là của khách, dữ liệu mình không được xem

:::cols
### Gỡ lỗi mù (K-92)
Khách báo "màn này sai số": không xem được dữ liệu (có dữ liệu cá nhân), mã đã làm rối, máy là của khách.
### Một máy, một DB (K-93)
**1** máy ứng dụng + **1** DB, **0** bản dự phòng. Sập máy là sập hệ thống.
### Kiểm soát 1/3 tầng (K-94)
Ứng dụng là của mình; máy chủ và mạng là của khách — nhưng khi sập, khách gọi mình.
### Lệnh nguy hiểm (K-95)
Hệ thống có lệnh **xoá sạch DB** dùng cho phát triển. Chạy nhầm trên máy khách = mất dữ liệu khách.
:::

Ghi chú: Dự án đã phải cấm AI tự chạy lệnh xoá DB vì nó phá dữ liệu của phiên làm việc khác. Trên máy khách, một lần nhầm như vậy là sự cố nghiêm trọng.

@@ id: vh-giam-sat
@@ kicker: Phần 7 · Giám sát, nhật ký, bộ nhớ đệm, hàng đợi
# Mỗi thành phần thêm vào nhân với số khách

> Hiện trạng: nhật ký ghi ra tệp trên máy chủ; **0** Redis · **0** hàng đợi · **0** Sentry · **0** Kibana/Grafana · **0** cảnh báo tự động.

| Thành phần | Cần khi | Cái giá |
| --- | --- | --- |
| Prometheus + Grafana + cảnh báo | CPU, RAM, ổ đĩa, DB chậm, tác vụ hỏng | phải có người trực nhận cảnh báo |
| Sentry — bắt lỗi | biết lỗi trước khi khách gọi | tự cài khuyến nghị **16 GB RAM**; mã làm rối ⇒ giữ bản đối chiếu từng phiên bản |
| ELK hoặc Loki — tìm nhật ký | tìm nhật ký trên N máy chủ | thêm dịch vụ, ngốn RAM |
| Hàng đợi · Redis | gửi thư có thử lại, báo cáo nặng; khách lớn chạy nhiều máy | xử lý trùng, sai thứ tự; dữ liệu đệm cũ ⇒ số sai không báo lỗi |

:::note
📊 Từ **4** lên **7–9** dịch vụ mỗi khách × N khách (K-96). Thêm hàng đợi, bộ nhớ đệm là **đổi cách viết mã**: **47** tệp xử lý thao tác ghi phải xem lại (K-98).
:::

Ghi chú: Khách nhỏ chỉ muốn một máy rẻ; mỗi dịch vụ thêm vào chiếm RAM trên máy của họ và phải được cài, nâng, vá, sao lưu.

@@ id: vh-rieng-gom
@@ kicker: Phần 7 · Giám sát đặt ở đâu
# Giám sát đặt riêng từng khách hay gom về một chỗ?

| | Riêng từng khách | Gom về hệ thống chung của mình |
| --- | --- | --- |
| Được | Dữ liệu không rời máy khách | Một nơi xem mọi khách |
| Mất | Không ai xem (khách thường không có người); tốn tài nguyên; mình phải vào N nơi | Nhật ký rời máy khách, có thể chứa dữ liệu cá nhân; khách lớn thường cấm kết nối ra ngoài; một sự cố lộ dữ liệu **mọi** khách |

:::cols
### Dữ liệu nhạy cảm
**39** chỗ mã hoá dữ liệu cá nhân — dữ liệu đi qua hệ thống giám sát là nhạy cảm (K-97).
### Hiểu biết về từng khách
Cấu hình, phần làm riêng, phiên bản, lịch sử yêu cầu, đầu mối — phải nằm ở đâu đó để người khác hỗ trợ được, không chỉ trong đầu một người (K-99).
:::

Ghi chú: Cả hai cách đều có giá; quan trọng là phải chọn và ghi vào hợp đồng, và phải có người trực.

@@ id: bm-kho
@@ kicker: Phần 9 · Bảo mật
# Ba việc bảo mật chuyên gia cũng không làm nhanh được

| Vấn đề | Vì sao khó | 📊 Số liệu |
| --- | --- | --- |
| Cách ly dữ liệu giữa các công ty (K-105) | Nằm trong **từng** câu đọc dữ liệu ở khắp hệ thống, không phải một chỗ cấu hình | **36/104** bảng mang trực tiếp mã công ty; ~**7** tệp kiểm thử |
| Mã AI viết chưa ai soi về bảo mật (K-106) | Kiểm thử xâm nhập và soi mã trên khối lượng này mất nhiều tuần, lặp lại sau mỗi bản lớn | ~**143.000** dòng; **0** lần kiểm thử xâm nhập |
| Vá cho mọi khách, mọi phiên bản (K-107) | Hệ quả của "khách tự chọn nâng cấp" | **7** dòng phiên bản phải vá riêng trong sự cố 12/2025 |
| Máy chủ nằm ở khách | Khách có toàn quyền; khách tự cài thì mình có thể không vào được | Bên mình kiểm soát **1/3** tầng |

Ghi chú: 68 bảng không mang trực tiếp mã công ty phải nối qua bảng khác — một câu đọc quên nối là lộ dữ liệu công ty khác. Đây là loại lỗi không công cụ nào tự tìm hết được.

@@ id: lo-bao-mat
@@ kicker: Lo ngại · "Lo bảo mật nhưng chưa biết cần gì"
@@ layout: dark
# Câu trả lời đầu tiên cho "cần gì" là: cần người

> Phần lớn việc bảo mật — gia cố máy chủ, quét thư viện có lỗ hổng, quản lý mật khẩu và khoá, mã hoá backup, chống dò mật khẩu — là **việc thường ngày** của một chuyên gia bảo mật hoặc một DevOps có nghề: dùng công cụ là thấy, sửa nhanh.

:::stats
0 | chuyên gia bảo mật
0 | DevOps
0 | lần kiểm thử xâm nhập
:::

Những việc khó thật nằm trong **cách hệ thống được xây** và trong mô hình **"mỗi khách một bản cài"**: cách ly dữ liệu giữa các công ty, mã AI chưa ai soi, vá cho mọi phiên bản, máy chủ ở khách.

Ghi chú: Bảo mật không phải một tính năng làm một lần. Nó là một vai trò, phải có người giữ, và phải lặp lại sau mỗi bản lớn, ở mỗi khách.

@@ id: hn-hai-khach
@@ kicker: Phần 12 · Hiệu năng
# Khách 30 người và khách 50.000 người — cùng một bộ mã

:::stats
~1.700× | chênh lệch số người dùng (30 so với 50.000)
60 triệu | dòng sau 5 năm, nếu khách lớn thêm 1 triệu dòng/tháng
0 | lần kiểm thử tải; hiện chạy với 15 người dùng
1 | kiểu triển khai duy nhất: 1 máy ứng dụng + 1 DB trên cùng máy
:::

- **Một kiến trúc không vừa cả hai cỡ** — kiểu lớn cho khách nhỏ thì đắt; kiểu nhỏ cho khách lớn thì sập (K-123).
- **Tính toán theo cây tổ chức** chạy mỗi khi mở màn — cây hiện tại 15 người; cây 50.000 người: chưa có số (K-127).
- **Báo cáo nặng chạy trên DB chính** làm chậm cả hệ thống lúc cuối tháng (K-128).

Ghi chú: Khách 50.000 người bằng khoảng 3.333 lần quy mô hiện tại (K-122). Không ai biết hệ thống chịu được tới đâu vì chưa từng đo.

@@ id: hn-ma
@@ kicker: Phần 12 · Hiệu năng
# Nếu chậm, thủ phạm đầu tiên là cách viết mã

:::stats
~75% | câu đọc dữ liệu không giới hạn số dòng (~790/1.050)
3 | chỗ phân trang ngay trong DB
104 | chỉ mục cho 104 bảng (trung bình 1/bảng)
0 | bảng chia vùng theo thời gian; 0 chính sách dọn dữ liệu cũ
:::

> Với 10.000 dòng không ai thấy; với 60 triệu dòng là hết bộ nhớ, màn quay mãi (K-124, K-125). **32** cột JSON lọc, sắp xếp, tổng hợp chậm hơn nhiều so với cột thường (K-126).

Ghi chú: Sửa cách đọc dữ liệu — phân trang, giới hạn số dòng, chỉ mục đúng chỗ — rẻ hơn và hiệu quả hơn mọi giải pháp hạ tầng.

@@ id: hn-bac-thang
@@ kicker: Lo ngại · "Dữ liệu nhiều làm chậm, nên cắt dữ liệu từng năm"
# Dữ liệu hôm nay chỉ 3,7 MB — và có cả một bậc thang cách xử lý

:::stats
3,7 MB | toàn bộ dữ liệu production, ~6.760 dòng (bản sao 21/09/2026)
~9.000× | khách lớn 60 triệu dòng so với hôm nay — đó mới là lúc phải lo
:::

| Bậc | Cách làm | Khi nào cần |
| --- | --- | --- |
| 0 | Không làm gì | Khách nhỏ, trong nhiều năm |
| 1 | Phân trang + chỉ mục đúng chỗ | **Ngay bây giờ**, mọi khách |
| 2 | Bảng tổng hợp sẵn cho báo cáo, bộ nhớ đệm | Khách vừa |
| 3 | **Chia bảng theo năm ngay trong DB** — dữ liệu vẫn đủ | Khách lớn · bản đúng của "cắt từng năm" |
| 4 | Năm cũ sang kho lưu trữ chỉ-đọc | Khách rất lớn |
| 5 | Bản sao DB cho báo cáo, nhiều máy ứng dụng, hàng đợi | Hàng chục nghìn người dùng |

Ghi chú: "Cắt dữ liệu từng năm" có tác dụng phụ: báo cáo nhiều năm gãy, truy vết lô thuốc khi thu hồi bị đứt, lịch sử nhân sự mất, nhiều loại dữ liệu theo luật phải giữ nhiều năm. Bậc 3 là phiên bản đúng của ý tưởng đó. Hiện hệ thống ở bậc 0; bậc 1 mới làm ở 3 chỗ.

@@ id: lo-du-lieu
@@ kicker: Lo ngại · "Cắt dữ liệu từng năm"
# "Cắt dữ liệu từng năm" có tác dụng phụ

:::cols
### Báo cáo nhiều năm gãy
So sánh năm nay với năm trước, xu hướng 3–5 năm không còn dữ liệu để tính.
### Truy vết bị đứt
Truy vết lô thuốc, hạn dùng khi thu hồi; lịch sử nhân sự, lịch sử duyệt bị mất.
### Luật đòi giữ
Nhiều loại dữ liệu theo luật phải giữ nhiều năm; dữ liệu năm nay còn tham chiếu sang năm trước.
:::

> Phiên bản đúng của ý tưởng này là **chia bảng theo năm ngay trong DB** (bậc 3): dữ liệu vẫn đủ, màn thường chỉ đọc năm hiện tại.

Ghi chú: Lo ngại "dữ liệu nhiều sẽ chậm" là chính đáng cho khách lớn. Nhưng cách xử lý đúng là đi theo bậc thang, không phải xoá dữ liệu.
