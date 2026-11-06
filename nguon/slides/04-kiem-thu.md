@@ id: kt-tang
@@ kicker: Phần 5 · Kiểm thử
# Ba tầng kiểm thử: nhiều ở dưới, 0 ở trên cùng

:::stats
~420 | tệp **unit** — kiểm từng hàm, logic tính toán
40 + 45 | tệp **integration** với DB thật + luồng nghiệp vụ nhiều bước
0 | kịch bản **E2E** — người dùng bấm xuyên nhiều màn trên trình duyệt thật
:::

> Các loại còn lại — đồng thời, mutation, tải, bảo mật… — là **cách** kiểm, chạy ở một hay nhiều tầng. Bộ kiểm thử hiện tại khá lớn (**509** tệp), nhưng dựng cho **một** khách, **một** phiên bản, **một** cỡ tải (K-73).

Ghi chú: Tầng unit và integration là thế mạnh hiện có. Cái thiếu là tầng trên cùng — kiểm như người dùng thật — và các loại kiểm thử chỉ cần khi bán cho nhiều khách.

@@ id: kt-46
@@ kicker: Phần 5 · Kiểm thử
# 46 loại kiểm thử một ERP thương mại cần: 29 loại đang là 0

| Nhóm | Số loại | ✅ Có | 🟡 Một phần | ❌ Chưa có |
| --- | --- | --- | --- | --- |
| Phát hành & nâng cấp | 6 | 0 | 1 | 5 |
| Hiệu năng & độ bền | 7 | 0 | 0 | 7 |
| Bảo mật | 8 | 0 | 2 | 6 |
| Chức năng | 13 | 4 | 3 | 6 |
| Con người (nghiệm thu, dễ dùng) | 2 | 0 | 1 | 1 |
| Riêng của ERP | 10 | 0 | 6 | 4 |
| **Tổng** | **46** | **4** | **13** | **29** |

:::note
Toàn bộ **7** loại hiệu năng và **6/8** loại bảo mật đang là 0. **0/10** loại riêng của ERP có đủ (K-73).
:::

Ghi chú: Bảng chi tiết từng loại có ở bản đầy đủ và tài liệu. Loại quan trọng nhất phải có trước khách đầu tiên: nâng cấp từ mọi bản cũ, backup & khôi phục, kiểm thử tải, E2E, kiểm thử đồng thời.

@@ id: kt-bang-1
@@ kicker: Phần 5 · Bảng 46 loại (1/3)
# Phát hành, nâng cấp, hiệu năng: gần như toàn bộ là 0

| Nhóm | Loại kiểm thử | Dùng để | Hiện có |
| --- | --- | --- | --- |
| Phát hành | **Nâng cấp từ mọi bản cũ** | chuyển đổi từ bản N lên bản mới trên dữ liệu giống thật | ❌ |
| | Backup & khôi phục | khôi phục được thật | ❌ |
| | Tổ hợp cấu hình | các file cấu hình khách hay dùng | ❌ chưa có cấu hình |
| | Cài đặt sạch | cài trên máy trắng theo đúng hướng dẫn | ❌ |
| | Bản đã làm rối mã | bản giao khách chạy giống bản đã kiểm | ❌ |
| | Kiểm nhanh sau khi cài (smoke) | hệ thống còn sống | 🟡 2 tệp |
| Hiệu năng | **Load** · **Stress** · Spike | tải thường · tới khi gãy · tăng vọt (sáng thứ Hai, chốt tháng) | ❌ |
| | Soak · Volume | chạy nhiều ngày · dữ liệu 60 triệu dòng | ❌ |
| | Hồi quy hiệu năng · Chaos | bản mới không chậm hơn · tắt DB, đầy ổ, mất mạng | ❌ |

Ghi chú: Nhóm phát hành chỉ cần khi có nhiều khách, nhiều phiên bản — đó là lý do hôm nay chưa có. Nhóm hiệu năng chưa có vì chưa từng có khách lớn.

@@ id: kt-bang-2
@@ kicker: Phần 5 · Bảng 46 loại (2/3)
# Bảo mật và con người

| Nhóm | Loại kiểm thử | Dùng để | Hiện có |
| --- | --- | --- | --- |
| Bảo mật | Kiểm thử xâm nhập (pentest) | người ngoài tấn công thử | ❌ |
| | DAST · SAST | tấn công thử khi đang chạy · soi mã tĩnh | ❌ |
| | SCA — thư viện có lỗ hổng | ~900 thư viện bên ngoài | ❌ chưa tự động |
| | Quét bí mật lọt vào mã · quét container | mật khẩu, khoá · lỗ hổng trong hệ điều hành đóng kèm | ❌ |
| | Cách ly giữa các công ty | A không thấy dữ liệu B | 🟡 ~7 tệp |
| | Vượt quyền | gọi thẳng thao tác ghi khi không có quyền | 🟡 có chặn, chưa có bộ tấn công thử |
| Con người | Nghiệm thu với khách (UAT) | khách xác nhận | 🟡 chỉ khách nội bộ |
| | Khả năng sử dụng | người mới dùng được không | ❌ |

Ghi chú: Phần lớn các loại kiểm thử bảo mật là việc dùng công cụ — một chuyên gia bảo mật dựng được nhanh. Khó là ở cách ly giữa các công ty và mã AI chưa ai soi (Phần 9).

@@ id: kt-bang-3
@@ kicker: Phần 5 · Bảng 46 loại (3/3)
# Chức năng: có nền tốt ở tầng dưới

| Loại kiểm thử | Dùng để | Hiện có |
| --- | --- | --- |
| **End-to-end (E2E)** | người dùng bấm xuyên nhiều màn trên trình duyệt thật | ❌ 0 kịch bản — mới có lệnh mở từng màn |
| **Mutation test** | đo **chất lượng** bộ test: cố ý cài lỗi xem test có bắt được | ❌ |
| Đo độ phủ (coverage) | dòng mã nào chưa có test | ❌ 0 công cụ |
| Contract / API | giữ ổn định giao tiếp với phần mềm khác | ❌ chưa có API công khai |
| Tương thích trình duyệt, thiết bị | Chrome, Edge, Safari, máy tính bảng, điện thoại | ❌ 1 trình duyệt, 1 cỡ màn hẹp |
| Trên bản sao dữ liệu thật | lỗi chỉ có ở dữ liệu thật | 🟡 4 tệp — chỉ dữ liệu của mình |
| Hồi quy giao diện (so ảnh) | màn không bị vỡ | 🟡 28 ảnh, có danh sách ảnh "nhiễu" |
| Property-based / fuzz | sinh ngẫu nhiên đầu vào tìm ca biên | 🟡 1 lần vét cạn luồng duyệt |
| Unit · Integration · Luồng nghiệp vụ | logic · ghi đọc DB · chuỗi thao tác | ✅ ~420 · 40 · 45 tệp |
| Ma trận phân quyền | vai nào thấy màn nào | ✅ |

Ghi chú: Bảng này có thêm Accessibility (dùng bằng bàn phím, trình đọc màn hình) — hiện chưa có. Bốn loại ✅ là nền tốt để xây tiếp.

@@ id: kt-erp
@@ kicker: Phần 5 · Riêng của ERP
# 10 loại kiểm thử riêng của phần mềm giữ tiền, kho, hồ sơ

| Loại | Kiểm điều gì | Hiện có |
| --- | --- | --- |
| **Đồng thời (concurrency)** | hai người duyệt cùng một hồ sơ; hai đơn cùng trừ một lô hàng | 🟡 ~4 tệp; **0** chỗ khoá dòng khi ghi |
| Tiền và số tổng | làm tròn, VAT, tổng báo cáo = tổng chi tiết, đối soát | 🟡 có phép tính chỉ tiêu; chưa có tiền, thuế |
| Gửi lại hai lần (idempotency) | bấm hai lần, mạng chập chờn, cổng thanh toán báo lại | 🟡 vài chỗ có chặn |
| Vết kiểm toán | nhật ký thao tác không ai sửa, xoá được | ❌ **0** cơ chế chống sửa |
| Ngày, giờ, lịch | múi giờ, ngày lễ, cuối tháng, chốt kỳ | 🟡 có sau sự cố mất 1 ngày |
| Định dạng kiểu Việt | số `1.234,5`, ngày `dd/mm`, chữ có dấu | 🟡 có máy canh sau 5 lần vấp |
| Tác vụ định kỳ | chạy đúng giờ, chạy lại không ghi đôi | 🟡 khoá nhầm 140 dòng chỉ lộ khi chạy thật |
| Lùi bản khi nâng cấp hỏng | quay về bản cũ, dữ liệu không mất | ❌ **0/89** có đường lùi |
| Tích hợp qua sandbox | cổng thanh toán, hoá đơn điện tử, ngân hàng | ❌ chưa có tích hợp |
| Nhập dữ liệu ban đầu | số dòng, số tiền trước và sau khi nhập khớp | ❌ |

Ghi chú: Ứng dụng thông thường không cần những loại này, nhưng ERP thì phải có: lỗi ở đây là tiền sai, kho âm, nhật ký bị sửa — loại lỗi khách và kiểm toán viên không tha thứ.

@@ id: kt-dong-thoi
@@ kicker: Phần 5 · Lỗi ERP điển hình
# Lỗi đồng thời không bao giờ lộ khi một người thử

:::stats
0 | chỗ khoá dòng khi ghi trong toàn hệ thống
8 | cột số phiên bản để phát hiện ghi đè
15 | người dùng production hôm nay — chưa đủ đông để lộ lỗi
:::

:::cols
### Đồng thời (K-80)
Hai người duyệt cùng một hồ sơ, hai đơn cùng trừ một lô hàng: duyệt hai lần, **kho âm**, số tiền cộng đôi. Chạy đúng ở mọi lần thử đơn lẻ.
### Tiền và nhật ký (K-81)
ERP phải chứng minh số tổng khớp chi tiết và **mọi** thay đổi để lại dấu vết không ai xoá được — kể cả người quản trị DB của khách.
### Tích hợp ngoài (K-82)
Cổng thanh toán, hoá đơn điện tử, ngân hàng chỉ kiểm được trên môi trường thử của bên kia — và môi trường thử khác môi trường thật.
:::

Ghi chú: Ở khách có hàng trăm người dùng cùng lúc, lỗi đồng thời là chuyện hằng ngày. Đây là loại lỗi tốn công gỡ nhất vì không tái hiện được khi một người thử.

@@ id: kt-chi-phi
@@ kicker: Phần 5 · Chi phí kiểm thử
# Kiểm thử cũng tốn — và tốn theo số khách

| Khó khăn | 📊 Số liệu |
| --- | --- |
| Kiểm thử nhân theo số tổ hợp đang bán (K-74) | **72** tổ hợp × 15 phút = **18 giờ máy** mỗi bản phát hành |
| Mutation test rất tốn trên mã lớn (K-75) | ~**14.000** lần chạy ⇒ hàng chục giờ máy mỗi lượt |
| Kiểm thử chập chờn — người ta quen bỏ qua cảnh báo (K-76) | **16/28** ảnh lệch dù không ai sửa giao diện |
| Bộ kiểm thử cũng phải bảo trì (K-77) | **509** tệp; **37** tệp đã xoá vì tính năng dựng lại |
| Dữ liệu kiểm thử cho khách lớn (K-78) | Dữ liệu mẫu hiện có: **1** công ty, vài chục người |
| Hạ tầng: máy tạo tải, dữ liệu lớn, quét bảo mật, pentest thuê ngoài (K-79) | **Chưa ước lượng** |

Ghi chú: Kiểm thử không phải làm một lần. Mỗi bản phát hành, mỗi tổ hợp khách, mỗi phiên bản còn sống đều phải chạy lại.

@@ id: ai-toc-do
@@ kicker: Phần 6 · Mã do AI viết
# AI viết nhanh hơn người đọc

:::stats
78% | lần thay đổi mã có AI viết cùng (338/434)
10% | số lần thay đổi lớn hơn 15.000 dòng
~143.000 | dòng mã, 1.148 tệp
37% | lần thay đổi là sửa lỗi (159/434)
:::

- Trung vị **134** dòng mỗi lần — nhưng không ai review nổi một thay đổi 15.000 dòng (K-83).
- Nhóm lớn nhất: Hoạch định **23.600** dòng · Thực thi **15.000** · Từ điển **13.000** · Nhân sự **10.200**; phần dùng chung **42.800** (K-87).
- Với khách ngoài, mỗi lần sửa lỗi là một bản vá phải đóng gói, kiểm, giao, cài (K-88).

Ghi chú: Khối lượng mã vượt khả năng đọc của con người. Đây không phải lời chê AI — AI giúp xây nhanh — nhưng trước khi giao cho khách, phải có người chịu trách nhiệm về những gì được giao.

@@ id: ai-cau-truc
@@ kicker: Phần 6 · Cấu trúc dữ liệu do AI sinh
# Cấu trúc dữ liệu rất lớn, vẫn phình nhanh, chưa ai review

:::stats
104 | bảng · ~1.140 cột · 229 liên kết · 59 danh sách giá trị cố định
+60% | số bảng trong 2 tuần (65 → 104)
0 | người chuyên DB — review kỹ 2 phút/cột ≈ 38 giờ một lượt
32 | cột dạng JSON "túi tự do", chưa chuẩn hoá
:::

Ghi chú: Cấu trúc đổi 29 lần trong 6 ngày thì review xong đã cũ (K-85). Các cột JSON là cố ý cho chỗ nghiệp vụ còn mơ hồ — nhưng muốn chuẩn hoá sau này phải chuyển từng túi, mà nội dung túi mỗi khách mỗi khác (K-86).

@@ id: ai-on-dinh
@@ kicker: Phần 6 · Tốc độ dựa vào việc được phép sai
# Tốc độ hôm nay dựa vào việc được phép làm sai

:::stats
~30 | quyết định mỗi ngày (~1.920 trong ~2 tháng)
≥20 | quyết định bị đảo ngược
37 | bộ kiểm thử phải xoá vì tính năng bị dựng lại
2 | lần xoá sạch DB mỗi lượt kiểm tra đầy đủ
:::

> Cách làm hiện tại là _"dựng nhanh → dùng thử → góp ý → sửa"_, và **xoá sạch dữ liệu dựng lại** là chuyện thường. Với khách ngoài, cả hai điều này không còn (K-89, K-90).

Ghi chú: Đây là cách làm đúng cho giai đoạn tìm yêu cầu với một khách nội bộ. Nó không mang sang được khi dữ liệu là của khách và mỗi thay đổi phải qua nghiệm thu.
