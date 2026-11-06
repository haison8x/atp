@@ id: qt-12-buoc
@@ kicker: Phần 3 · Quy trình
# Giữa "khách gửi" và "triển khai" có ít nhất 12 bước

| # | Bước | Phía mình cần | Hiện có |
| --- | --- | --- | --- |
| 1 | Tiếp nhận | Quản lý dự án | ❌ 0 hệ thống phiếu yêu cầu |
| 2 | Làm rõ | Phân tích nghiệp vụ | 🟡 1 người kiêm, tự chốt giả định |
| 3 | Phân loại: lỗi, thay đổi, tính năng, cấu hình | Người làm sản phẩm | ❌ |
| 4 | Ước lượng | Trưởng kỹ thuật | ❌ 0 dữ liệu ước lượng |
| 5 | Chốt phạm vi + tiêu chí nghiệm thu | Quản lý dự án | ❌ 0 mẫu |
| 6 | Thiết kế, đánh giá ảnh hưởng khách khác | Kiến trúc sư | ❌ |
| 7 | Phát triển + review mã | Lập trình viên + AI, người review | 🟡 1 người |
| 8 | Kiểm thử hệ thống | Kiểm thử viên độc lập | ❌ 0 kiểm thử viên |
| 9 | Nghiệm thu với khách | Hỗ trợ khách thử | 🟡 nhìn màn thật |
| 10 | Lên lịch, triển khai | Vận hành (DevOps) | 🟡 1 script do người phát triển chạy |
| 11 | Đào tạo, tài liệu | Đào tạo viên | ❌ 0 tài liệu người dùng |
| 12 | Hỗ trợ sau bàn giao | Hỗ trợ kỹ thuật | ❌ 0 hệ thống phiếu hỗ trợ |

Ghi chú: Mô hình đang đề xuất nhắc tới bước 1, 7 và 10. Chín bước còn lại không biến mất — rủi ro của chúng dồn xuống lúc nghiệm thu, đúng lúc tốn kém nhất để sửa. Mỗi bước còn cần một người tương ứng ở phía khách: tổng cộng 8 vai phía mình, 6 vai phía khách.

@@ id: qt-kiem-thu
@@ kicker: Phần 3 · Ai kiểm thử?
# Người làm không nên là người kiểm cuối cùng

:::stats
0 | kiểm thử viên độc lập (K-28)
1 | bộ dữ liệu mẫu, của 1 công ty (K-29)
2 + 19 | môi trường thử và script riêng — chỉ cho 1 khách nội bộ (K-30)
72 | tổ hợp phải chạy lại cho mỗi bản vá (K-31)
:::

- Lập trình viên và AI của họ kiểm **điều họ hiểu**; kiểm thử viên độc lập kiểm **điều khách cần**.
- Không được dùng dữ liệu thật của khách để kiểm; dữ liệu mẫu đã bỏ sót lỗi (K-05).
- Sửa cho khách A thì phải kiểm lại cho khách B, C…

Ghi chú: Với một khách nội bộ, lỗi lọt thì sửa ngay hôm sau. Với khách ngoài, lỗi lọt là một bản vá phải đóng gói, kiểm, giao và cài lại.

@@ id: qt-nghiem-thu
@@ kicker: Phần 3 · Ai nghiệm thu?
# Nghiệm thu hiện nay là "nhìn màn thật"

:::cols
### Khách ngoài cần tiêu chí viết trước
Có biên bản, có tiêu chí viết **trước khi làm**. Hiện **0** mẫu biên bản, **0** tiêu chí viết trước (K-32).
### "Lỗi" hay "yêu cầu mới"?
Không có đặc tả viết trước để đối chiếu thì mọi thứ khách chưa vừa ý đều thành "lỗi", sửa miễn phí. Hiện **0** đặc tả được khách xác nhận trước (K-33).
### Nhìn màn cũng nhầm
Ngay với khách nội bộ đã **2 lần** kết luận "màn không có nút" vì xem nhầm nhánh màn hình (K-39).
:::

Ghi chú: Khách không có người, không có thời gian, nên thường thử vài màn rồi đồng ý; dùng thật rồi mới phát hiện lỗi — lúc đó tranh cãi ai trả tiền sửa.

@@ id: qt-kiem-nghiem
@@ kicker: Phần 3 · Ai kiểm thử, ai nghiệm thu?
# Ai kiểm thử, ai nghiệm thu — theo tiêu chí nào?

:::cols
### Kiểm thử
**0** kiểm thử viên độc lập; **1** bộ dữ liệu mẫu của 1 công ty; **72** tổ hợp phải chạy lại cho mỗi bản vá. Người làm (và AI của họ) kiểm điều họ hiểu, không phải điều khách cần.
### Nghiệm thu
Hiện là "nhìn màn thật": **0** mẫu biên bản, **0** tiêu chí viết trước. Thiếu đặc tả viết trước thì mọi điều khách chưa vừa ý đều thành "lỗi" phải sửa miễn phí.
:::

:::note
Ngay với khách nội bộ đã **2 lần** kết luận sai lúc xem màn vì xem nhầm nhánh màn hình.
:::

Ghi chú: Hai câu "ai kiểm" và "ai nghiệm thu" phải có câu trả lời bằng tên người và bằng văn bản trước khách đầu tiên.

@@ id: qt-chu-anh
@@ kicker: Phần 3 · Đầu vào "chữ và ảnh"
# Chữ và ảnh không phải là đặc tả

> Ảnh cho thấy màn **trông thế nào**, không cho biết **luật**: ai được thấy, ai được sửa, có những trạng thái nào, dữ liệu lấy từ đâu, sai thì sao (K-34).

| Đã xảy ra ngay với khách nội bộ | 📊 |
| --- | --- |
| Yêu cầu qua nhiều phiên bản bản vẽ màn hình rồi **bỏ hẳn** cách giao bằng bản vẽ | **≥5** phiên bản; **35** tệp đặc tả ghi chỗ lệch bản vẽ |
| Yêu cầu ẩn: phân quyền, lịch sử sửa, xuất Excel, in, tìm kiếm… (K-35) | **6** tiêu chí "xong" + **16** luật chung không yêu cầu nào nhắc tới |
| Câu hỏi không được trả lời ⇒ phải đoán (K-36) | **86** dòng ghi "tự chốt / giả định" |
| Yêu cầu đổi ngay trong lúc làm và sau nghiệm thu (K-38) | **≥20** quyết định bị đảo |
| Hiểu nhầm hai chiều (K-39) | **18** dòng ghi "hiểu nhầm / đọc nhầm" |

Ghi chú: Với khách nội bộ, đoán sai thì sửa. Với khách ngoài, đoán sai là bị từ chối lúc nghiệm thu. Nhiều người phía khách còn nói khác nhau (K-37).

@@ id: qt-uoc-luong
@@ kicker: Phần 3 · Ước lượng, ưu tiên, truy vết
# AI viết mã nhanh — nhưng viết mã chỉ là 1/12 bước

:::stats
1/12 | bước là viết mã — không biết cả chuỗi mất bao lâu thì không hứa được ngày giao (K-41)
0 | dữ liệu lịch sử từ lúc nhận yêu cầu đến lúc nghiệm thu
~1.920 | quyết định trong 182 tệp cho 1 khách — N khách ⇒ N lần (K-48)
:::

- **Ưu tiên giữa các khách:** A, B, C cùng đòi gấp, chỉ có một đội; đổi qua đổi lại làm mỗi việc chậm thêm (K-42).
- **Truy vết:** yêu cầu nào → mã nào → kiểm thử nào → nghiệm thu nào, **theo từng khách**.

Ghi chú: Báo giá, cam kết ngày giao và phân xử tranh chấp đều cần ước lượng và truy vết. Hiện chưa có dữ liệu cho cả hai.

@@ id: qt-ai
@@ kicker: Phần 3 · Phát triển với AI
# Nút thắt chuyển từ "viết" sang "kiểm"

:::cols
### Kiểm tự động đạt, màn vẫn vỡ
Một màn vỡ bố cục (cao từ **4.413** lên **5.200** điểm ảnh) trong khi **mọi** bước kiểm tự động báo đạt (K-44).
### AI viết, AI kiểm, AI sửa
Cùng một điểm mù: kiểm thử do AI viết kiểm đúng điều AI nghĩ. **37%** lần thay đổi là sửa lỗi (K-45).
### Rất nhiều "rào chắn"
**21** lệnh kiểm tự động, **396** dòng hướng dẫn cho AI, **~25.000** dòng đặc tả — sinh ra **sau** khi AI đã làm sai, cho 1 khách (K-46).
### Nhiều người, nhiều AI đụng nhau
Chỉ 1 người chạy nhiều phiên AI đã trùng số bước chuyển đổi DB, hai phiên dựng một tính năng hai cách, một phiên xoá DB của phiên kia (K-47).
:::

Ghi chú: AI làm tăng tốc độ viết lên rất nhiều lần, nên chỗ tắc chuyển sang khâu đọc lại, kiểm và đánh giá ảnh hưởng tới các khách khác (K-43: hiện 0 người giữ vai kiến trúc sư).
