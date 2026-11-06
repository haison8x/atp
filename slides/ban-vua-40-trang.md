# Bán ERP cho khách ngoài — bản vừa (40 trang)

> Bản vừa, trình bày khoảng 45–60 phút · **40 trang** · [Xem dạng trình chiếu](ban-vua-40-trang.html) · [Tài liệu đầy đủ](../tai-lieu/ban-erp-cho-khach-hang.html)

---

## 1. Bán ERP cho khách ngoài: cần gì để làm được

_Bản vừa · 40 trang_

Những khó khăn kỹ thuật, quy trình, vận hành, pháp lý — mỗi ý kèm **số liệu đo trên chính hệ thống đang chạy**.

> 🗣 **Lời trình bày:** Bản vừa, khoảng 45–60 phút. Đi qua tất cả các nhóm khó khăn, mỗi nhóm vài trang, rồi mới so sánh các phương án và chốt những câu cần trả lời.

---

## 2. Câu hỏi hôm nay là "làm thế nào", không phải "có nên"

_Mở đầu_

> Mục tiêu chung: **xây được một sản phẩm đáp ứng nhu cầu của nhiều khách hàng**. Tài liệu này liệt kê những gì phải giải để đạt mục tiêu đó.

**Mỗi khó khăn có mã K-xx**

Tra ngược được về tài liệu đầy đủ (159 mục, 17 phần).

**Mỗi khó khăn có 📊 số liệu**

Đo trên chính hệ thống đang chạy, hoặc từ nguồn công khai có dẫn link.

**Xếp theo mức quan trọng**

Phần 1–8 là trọng tâm; Phần 9–17 ít cấp bách hơn nhưng vẫn phải giải.

> 🗣 **Lời trình bày:** Nhấn mạnh rằng đây không phải tài liệu phản đối ý tưởng. Hệ thống hiện tại chạy tốt cho một công ty; câu hỏi là cần thêm gì để chạy tốt cho nhiều công ty khác nhau.

---

## 3. Mô hình đang được đề xuất (gọi là phương án S)

_Mở đầu · mô hình đang đề xuất_

- Khách đưa yêu cầu bằng **chữ, ảnh** → công ty dựng cấu hình → sửa mã nếu cấu hình không đủ → triển khai.
- **Một bộ mã nguồn duy nhất.** Ra bản mới giống Windows: khách **tự chọn** nâng cấp hay không.
- Tính năng nào dùng là do **file cấu hình** của từng khách.
- Khách đòi sửa sâu vào lõi → sửa mã sao cho **không ảnh hưởng khách khác**.
- Cài lên máy chủ của khách hoặc máy thuê bên mình; khách tự cài hoặc thuê bên mình cài.
- Bộ cài có sẵn DB; **khách tự backup, tự tối ưu**; bên mình cung cấp script.
- Không giao mã nguồn; **mã được làm rối** trước khi giao.

> 🗣 **Lời trình bày:** Đọc lại đúng mô hình để mọi người cùng hiểu một thứ. Cuối bộ slide sẽ đặt mô hình này cạnh ba con đường mà ngành phần mềm doanh nghiệp đã đi.

---

## 4. Năm điều kiện thuận lợi hôm nay — cả năm sẽ mất khi bán

_Mở đầu_

| Điều kiện hôm nay | Số liệu | Khi bán cho khách |
| --- | --- | --- |
| Được **xoá sạch dữ liệu làm lại** bất cứ lúc nào | Mỗi lần kiểm tra đầy đủ = **xoá sạch DB 2 lần** | Dữ liệu khách không bao giờ được xoá |
| **Một** phiên bản đang chạy | Cao điểm **140** lần thay đổi mã **trong 1 ngày** | Mỗi khách dừng ở một phiên bản khác nhau |
| **Một** khách, ngồi cùng nhà, chịu được lỗi | **37%** lần thay đổi mã là sửa lỗi | Nhiều khách, ở xa, không chịu được lỗi |
| Yêu cầu đổi liên tục, sửa ngay | **~1.920** quyết định trong ~2 tháng; **≥20** bị đảo | Mỗi lần đổi phải qua phân loại, kiểm thử, nghiệm thu |
| Người viết mã cũng vận hành, **thấy mọi dữ liệu và máy chủ** | **3** môi trường do chính mình giữ | Không thấy dữ liệu khách, không giữ máy chủ, mã bị làm rối |

> 🗣 **Lời trình bày:** Hệ thống chạy tốt hôm nay không phải ngẫu nhiên — nó dựa vào năm điều kiện này. Khi bán, cả năm điều kiện đều biến mất cùng lúc, nên tốc độ và cách làm hiện tại không mang sang được nguyên vẹn.

---

## 5. Hai khách dùng cùng chức năng — khách B chỉ muốn thêm một ô

_Phần 4 · Ví dụ thứ nhất_

> Ở mọi module, danh sách trường **viết cứng cho mọi công ty**. Thêm một ô cho khách B là sửa mã và sửa DB — và khách A cũng nhận ô đó (K-50).

- **66** — bảng từ điển khai cột cứng trong mã
- **~243** — chỗ đọc ô theo vị trí cột — khách bỏ hay đổi thứ tự một cột là gãy
- **0** — bảng khai báo trường theo công ty, trong toàn bộ 104 bảng

> 🗣 **Lời trình bày:** Ngay phần trông "cấu hình được" nhất là các bảng từ điển — dữ liệu lưu dạng JSON theo công ty — thì danh sách cột vẫn khai trong mã, và nghiệp vụ đọc ô theo "cột thứ mấy".

---

## 6. Quy trình y hệt nhau — công ty X chỉ thêm một bước duyệt

_Phần 4 · Ví dụ thứ hai_

| Module | Các bước (cố định trong DB) | Ai duyệt (viết cứng trong mã) |
| --- | --- | --- |
| Tiếp nhận nhân sự mới | Mời → Xem xét → **Duyệt 1 → Duyệt 2** → IT cấp → Xong | TP Nhân sự → CEO; trưởng phòng: CEO → Chủ tịch |
| Sửa hồ sơ nhân sự | **Quản lý → Nhân viên NS → Trưởng NS** → Áp dụng | Tên bước nằm ngay trong cấu trúc DB |
| Nghỉ phép | Chờ → Duyệt / Từ chối (lưu bước n/N) | ≤ **3** ngày: 1 cấp; dài hơn: 2 cấp |
| Đơn hàng · Giải ngân | Nháp → Chờ → Duyệt | 1 bước |
| Từ điển (66 bảng) | Khoá → Đang sửa → Chờ duyệt → Trả về | Chuỗi duyệt tính trong mã |
| Kế hoạch năm · tháng | Nháp → Gửi → Xác nhận / Trả về | Theo cây tổ chức, chuỗi vị trí |

- **38** — luồng trạng thái cố định trong cấu trúc DB
- **8+** — hàm tính chuỗi duyệt riêng, mỗi module một kiểu
- **0** — chỗ khai báo quy trình theo công ty

> 🗣 **Lời trình bày:** Thêm một bước cho công ty X là chuyển đổi DB cho mọi khách, cộng rẽ nhánh theo tên khách trong mã, sửa màn, nhãn, thông báo, hạn xử lý (K-51).

---

## 7. Hai công ty có số cấp tổ chức khác nhau

_Phần 4 · Ví dụ thứ ba_

| Công ty | Cây tổ chức thật | Hệ thống hiện tại |
| --- | --- | --- |
| Nhỏ | Công ty → phòng → nhân viên (không có trưởng nhóm) | 🟡 Chạy **một phần** — chuỗi duyệt bỏ qua được ghế trống, nhưng nhãn, cột "Trưởng nhóm", bước giao chỉ tiêu cho nhóm vẫn hiện |
| Giống công ty mình | Công ty → phòng → trưởng nhóm → nhân viên | ✅ Đúng khuôn |
| Tập đoàn | Tổng công ty → vùng → công ty con → khối/phòng → nhóm → nhân viên | ❌ Không có chỗ đặt "vùng"; công ty không có công ty mẹ; phòng không có phòng con |

- **0** — cột "đơn vị cha" ở bảng công ty và bảng phòng ban ⇒ tối đa 2 tầng đơn vị
- **5 + 7** — vai nghiệp vụ cố định trong DB + bậc vị trí cố định trong mã
- **40–72** — tệp mã gọi thẳng tên từng vai (CEO 72 · Trưởng nhóm 40)

> 🗣 **Lời trình bày:** Thêm một cấp không phải thêm một dòng dữ liệu, mà là sửa cấu trúc DB, hàm tính cấp trên – cấp dưới, phạm vi dữ liệu, chuỗi duyệt, giao và cộng dồn chỉ tiêu, và mọi màn có cột theo cấp — cho mọi khách (K-52).

---

## 8. Danh mục cố định cũng vậy — và một chỗ đã đi đúng hướng

_Phần 4 · Danh mục cố định_

**Danh mục nằm trong cấu trúc DB**

Loại nghỉ phép chỉ có đúng **4** loại: phép năm, ốm, không lương, việc riêng. Công ty muốn thêm "nghỉ thai sản" hay "nghỉ cưới" là **một lần chuyển đổi DB cho mọi khách** (K-53). Tổng cộng **59** danh sách giá trị cố định.

**Điểm sáng: nghỉ phép lưu "bước n trên N"**

Đúng cách ở tầng dữ liệu — thêm bước không cần đổi cấu trúc. Nhưng **luật** số cấp duyệt (≤ 3 ngày thì 1 cấp) vẫn viết cứng, giống nhau cho mọi công ty. Chỉ **1/9** module làm được như vậy (K-54).

> 🗣 **Lời trình bày:** Điểm sáng này đáng giữ: nó cho thấy cách làm đúng đã có mầm trong hệ thống, chỉ chưa thành nền tảng chung.

---

## 9. Ba tính năng nền tảng phải xây, rồi chuyển từng module sang

_Phần 4 · Phải xây gì_

**① Trường dữ liệu theo khách**

Khai báo trường theo công ty; biểu mẫu và kiểm tra dữ liệu tự sinh; trường mới hiện ở danh sách, tìm kiếm, báo cáo, xuất Excel.

**② Bộ máy quy trình duyệt theo khách**

Chuỗi bước khai trong DB theo công ty và loại hồ sơ; hồ sơ lưu "bước n trên N"; hồ sơ đang dở chạy tiếp theo quy trình cũ khi quy trình đổi.

**③ Cây đơn vị do khách khai**

Số cấp, tên cấp, đơn vị cha – con tuỳ khách; cấp trên, phạm vi dữ liệu, chuỗi duyệt, cộng dồn chỉ tiêu đều đọc từ cây.

> 📊 **25** nhóm tính năng · **38** luồng trạng thái · **8+** cách tính chuỗi duyệt gom về một bộ máy · **~243** chỗ đọc theo vị trí cột · **5** vai và **2** tầng đơn vị cố định phải thành cây do khách khai (K-55).

> 🗣 **Lời trình bày:** Đây không phải chỉnh vài form, mà là làm lại tầng dưới của mọi module. Nhưng đây cũng chính là thứ biến hệ thống từ "phần mềm của một công ty" thành "sản phẩm cho nhiều công ty".

---

## 10. Hệ thống gắn cứng với một công ty ở hàng trăm chỗ

_Phần 4 · Gắn cứng với một công ty_

- **45** — tệp chứa tên công ty
- **73** — tệp chứa cây thư mục Google Drive của công ty
- **119** — tệp gọi thẳng tên vai; riêng "Chủ tịch" 41 tệp
- **~455** — tệp giao diện viết thẳng tiếng Việt, 0 bộ đa ngôn ngữ

- **Luật của một công ty đã thành luật của cả hệ thống** — ví dụ "một người chỉ giữ một vị trí", trong khi kiêm nhiệm rất phổ biến ở doanh nghiệp Việt (K-57).
- **Chỉ đăng nhập bằng Google, chỉ lưu tệp lên Google Drive** — khách dùng Microsoft 365 không dùng được: **1/3** kiểu đăng nhập, **1/4** nơi lưu tệp phổ biến (K-58).
- **Không thể làm khuôn chung đúng khi mới có một khách** — quy tắc "ba lần": cần thấy ít nhất 3 trường hợp; hiện có **1/3** (K-59).

> 🗣 **Lời trình bày:** Trên tổng 1.148 tệp mã. Phần lớn các quyết định trong 1.920 quyết định là luật của một công ty, chưa tách cái nào là luật chung, cái nào là luật riêng.

---

## 11. Khách nghe "ERP" sẽ so với Odoo, SAP, MISA

_Phần 4 · Phạm vi còn phải xây_

- **10** — phân hệ đã có, trên 65 phân hệ thường gặp
- **9** — phân hệ có một phần
- **46** — phân hệ chưa có

| Nhóm | Chưa có — ví dụ |
| --- | --- |
| Tài chính – kế toán | Kế toán tổng hợp, công nợ, **hoá đơn điện tử**, ngân hàng, tài sản cố định, giá thành, thuế |
| Kinh doanh, marketing | Báo giá, hợp đồng, khuyến mãi, bán lẻ tại quầy, **thương mại điện tử**, email/SMS |
| Nhân sự | Chấm công, nghỉ phép, **lương, bảo hiểm, thuế TNCN** |
| Nền tảng | Ứng dụng di động, **API công khai**, báo cáo tự thiết kế, đa ngôn ngữ |

> 🗣 **Lời trình bày:** Tích hợp với kế toán, hoá đơn điện tử, ngân hàng hiện là 0 (K-70). Nhập dữ liệu ban đầu — phần tốn công nhất của mọi dự án ERP — chỉ cho chính công ty mình đã phải viết 11 lệnh riêng (K-71). Kho ứng dụng của Odoo có hơn 80.000 module.

---

## 12. Nâng cấp hỏng thì không có nút "quay lại"

_Phần 1 · Dữ liệu của khách_

- **0/89** — bước chuyển đổi có đường lùi (K-01)
- **24 giờ** — dữ liệu có thể mất — backup 1 lần/ngày
- **88** — bước phải chạy liên tiếp nếu khách cài bản đầu, nay mới nâng (K-02)

- **Máy phát triển luôn "đạt", máy thật mới hỏng** — đổi tên một giá trị lựa chọn đã làm máy thật hỏng khi nâng cấp; lỗi loại này ghi **6** lần (K-03).
- **Dữ liệu mỗi khách một kiểu** — riêng lỗi số kiểu Việt `319,87` bị đọc thành 0 đã vấp **5** lần (K-04).
- **Lỗi chỉ lộ trên dữ liệu thật** — chạy tác vụ thật trên bản sao dữ liệu thật mới lộ **140** dòng bị khoá nhầm (K-05).

> 🗣 **Lời trình bày:** "Khách tự chọn nâng cấp" nghĩa là có khách đứng yên hai năm rồi nhảy thẳng lên bản mới nhất, chạy một chuỗi bước chuyển đổi chưa ai chạy thử trên dữ liệu mình không được nhìn thấy.

---

## 13. Mình chịu trách nhiệm cấu trúc, nhưng không giữ chìa khoá

_Phần 1 · Khách có toàn quyền trên DB_

**Khách sửa DB theo cách của họ**

Thêm chỉ mục, trigger, báo cáo phụ thuộc cột, sửa tay dữ liệu "chữa cháy" — lần nâng cấp sau **thất bại**, khó chứng minh lỗi do ai (K-09, K-12).

**Không phát hiện được DB bị sửa**

Nâng cấp an toàn cần công cụ so cấu trúc thật với cấu trúc mong đợi. Hiện có **0** công cụ (K-10).

**"Khách tự backup" = không ai làm**

Phần lớn công ty vừa và nhỏ không có người quản trị DB. Để vận hành **1** khách, bên mình đang cần **31** script máy chủ (K-11).

> 🗣 **Lời trình bày:** Mô hình "khách tự quản DB" chuyển rủi ro sang khách trên giấy, nhưng khi dữ liệu hỏng thì người bị gọi vẫn là mình.

---

## 14. Lỗ hổng bảo mật không chờ khách sẵn sàng

_Phần 2 · "Như Windows"_

- **10/10** — điểm nghiêm trọng — CVE-2025-55182 (12/2025)
- **1** — lần gửi yêu cầu là chiếm được máy chủ, không cần đăng nhập
- **7** — dòng phiên bản Next.js phải ra bản vá riêng

> Lỗ hổng **đã bị khai thác thật**, và hệ thống đang dùng đúng nền tảng này. Khách "chọn không nâng cấp" thì máy chủ của họ mở toang.

- Phải chọn: **ép** cập nhật (tức là không còn "khách tự chọn") hoặc **vá ngược** cho từng phiên bản cũ (K-19).
- Windows **ép** cập nhật bảo mật mỗi tháng, và không phải chuyển đổi dữ liệu kế toán, kho, nhân sự mỗi lần nâng (K-21).

> 🗣 **Lời trình bày:** Đây là ví dụ thật, không phải giả định. Một nền tảng phổ biến bị lỗ hổng 10/10, chỉ một yêu cầu là chiếm máy chủ. Nếu lúc đó mình có 10 khách ở 10 phiên bản, mình phải vá 10 lần, hoặc ép tất cả nâng cấp.

---

## 15. Nền tảng bên dưới tự hết hạn, dù khách không đụng gì

_Phần 2 · Nền tảng tự hết hạn_

| Thành phần | Thời gian được vá | Mốc hết hỗ trợ |
| --- | --- | --- |
| Next.js | ~2 năm mỗi bản lớn | Next.js 15: **21/10/2026** |
| Node.js | 30 tháng mỗi bản LTS | Node 20: **30/04/2026** (đã hết) |
| PostgreSQL | 5 năm mỗi bản lớn | PostgreSQL 16: **11/2028** |
| Thư viện | **51** trực tiếp, **~900** gián tiếp | **3** bản nâng cấp lớn đang bị chặn |

> Mọi khách phải được nâng nền tảng định kỳ — **kể cả khách "chọn không nâng cấp"** (K-22).

> 🗣 **Lời trình bày:** Đây là lý do thứ hai khiến "khách tự chọn nâng cấp" không đứng được: nền tảng hết hạn thì không còn bản vá bảo mật, dù khách hài lòng với tính năng hiện có.

---

## 16. Giữa "khách gửi" và "triển khai" có ít nhất 12 bước

_Phần 3 · Quy trình_

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

> 🗣 **Lời trình bày:** Mô hình đang đề xuất nhắc tới bước 1, 7 và 10. Chín bước còn lại không biến mất — rủi ro của chúng dồn xuống lúc nghiệm thu, đúng lúc tốn kém nhất để sửa. Mỗi bước còn cần một người tương ứng ở phía khách: tổng cộng 8 vai phía mình, 6 vai phía khách.

---

## 17. Ai kiểm thử, ai nghiệm thu — theo tiêu chí nào?

_Phần 3 · Ai kiểm thử, ai nghiệm thu?_

**Kiểm thử**

**0** kiểm thử viên độc lập; **1** bộ dữ liệu mẫu của 1 công ty; **72** tổ hợp phải chạy lại cho mỗi bản vá. Người làm (và AI của họ) kiểm điều họ hiểu, không phải điều khách cần.

**Nghiệm thu**

Hiện là "nhìn màn thật": **0** mẫu biên bản, **0** tiêu chí viết trước. Thiếu đặc tả viết trước thì mọi điều khách chưa vừa ý đều thành "lỗi" phải sửa miễn phí.

> Ngay với khách nội bộ đã **2 lần** kết luận sai lúc xem màn vì xem nhầm nhánh màn hình.

> 🗣 **Lời trình bày:** Hai câu "ai kiểm" và "ai nghiệm thu" phải có câu trả lời bằng tên người và bằng văn bản trước khách đầu tiên.

---

## 18. Nút thắt chuyển từ "viết" sang "kiểm"

_Phần 3 · Phát triển với AI_

**Kiểm tự động đạt, màn vẫn vỡ**

Một màn vỡ bố cục (cao từ **4.413** lên **5.200** điểm ảnh) trong khi **mọi** bước kiểm tự động báo đạt (K-44).

**AI viết, AI kiểm, AI sửa**

Cùng một điểm mù: kiểm thử do AI viết kiểm đúng điều AI nghĩ. **37%** lần thay đổi là sửa lỗi (K-45).

**Rất nhiều "rào chắn"**

**21** lệnh kiểm tự động, **396** dòng hướng dẫn cho AI, **~25.000** dòng đặc tả — sinh ra **sau** khi AI đã làm sai, cho 1 khách (K-46).

**Nhiều người, nhiều AI đụng nhau**

Chỉ 1 người chạy nhiều phiên AI đã trùng số bước chuyển đổi DB, hai phiên dựng một tính năng hai cách, một phiên xoá DB của phiên kia (K-47).

> 🗣 **Lời trình bày:** AI làm tăng tốc độ viết lên rất nhiều lần, nên chỗ tắc chuyển sang khâu đọc lại, kiểm và đánh giá ảnh hưởng tới các khách khác (K-43: hiện 0 người giữ vai kiến trúc sư).

---

## 19. Ba tầng kiểm thử: nhiều ở dưới, 0 ở trên cùng

_Phần 5 · Kiểm thử_

- **~420** — tệp **unit** — kiểm từng hàm, logic tính toán
- **40 + 45** — tệp **integration** với DB thật + luồng nghiệp vụ nhiều bước
- **0** — kịch bản **E2E** — người dùng bấm xuyên nhiều màn trên trình duyệt thật

> Các loại còn lại — đồng thời, mutation, tải, bảo mật… — là **cách** kiểm, chạy ở một hay nhiều tầng. Bộ kiểm thử hiện tại khá lớn (**509** tệp), nhưng dựng cho **một** khách, **một** phiên bản, **một** cỡ tải (K-73).

> 🗣 **Lời trình bày:** Tầng unit và integration là thế mạnh hiện có. Cái thiếu là tầng trên cùng — kiểm như người dùng thật — và các loại kiểm thử chỉ cần khi bán cho nhiều khách.

---

## 20. 46 loại kiểm thử một ERP thương mại cần: 29 loại đang là 0

_Phần 5 · Kiểm thử_

| Nhóm | Số loại | ✅ Có | 🟡 Một phần | ❌ Chưa có |
| --- | --- | --- | --- | --- |
| Phát hành & nâng cấp | 6 | 0 | 1 | 5 |
| Hiệu năng & độ bền | 7 | 0 | 0 | 7 |
| Bảo mật | 8 | 0 | 2 | 6 |
| Chức năng | 13 | 4 | 3 | 6 |
| Con người (nghiệm thu, dễ dùng) | 2 | 0 | 1 | 1 |
| Riêng của ERP | 10 | 0 | 6 | 4 |
| **Tổng** | **46** | **4** | **13** | **29** |

> Toàn bộ **7** loại hiệu năng và **6/8** loại bảo mật đang là 0. **0/10** loại riêng của ERP có đủ (K-73).

> 🗣 **Lời trình bày:** Bảng chi tiết từng loại có ở bản đầy đủ và tài liệu. Loại quan trọng nhất phải có trước khách đầu tiên: nâng cấp từ mọi bản cũ, backup & khôi phục, kiểm thử tải, E2E, kiểm thử đồng thời.

---

## 21. 10 loại kiểm thử riêng của phần mềm giữ tiền, kho, hồ sơ

_Phần 5 · Riêng của ERP_

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

> 🗣 **Lời trình bày:** Ứng dụng thông thường không cần những loại này, nhưng ERP thì phải có: lỗi ở đây là tiền sai, kho âm, nhật ký bị sửa — loại lỗi khách và kiểm toán viên không tha thứ.

---

## 22. Máy chủ là của khách, dữ liệu mình không được xem

_Phần 7 · N máy chủ của N khách_

**Gỡ lỗi mù (K-92)**

Khách báo "màn này sai số": không xem được dữ liệu (có dữ liệu cá nhân), mã đã làm rối, máy là của khách.

**Một máy, một DB (K-93)**

**1** máy ứng dụng + **1** DB, **0** bản dự phòng. Sập máy là sập hệ thống.

**Kiểm soát 1/3 tầng (K-94)**

Ứng dụng là của mình; máy chủ và mạng là của khách — nhưng khi sập, khách gọi mình.

**Lệnh nguy hiểm (K-95)**

Hệ thống có lệnh **xoá sạch DB** dùng cho phát triển. Chạy nhầm trên máy khách = mất dữ liệu khách.

> 🗣 **Lời trình bày:** Dự án đã phải cấm AI tự chạy lệnh xoá DB vì nó phá dữ liệu của phiên làm việc khác. Trên máy khách, một lần nhầm như vậy là sự cố nghiêm trọng.

---

## 23. Cần ít nhất một DevOps và một chuyên gia bảo mật — hiện chưa có ai

_Phần 7 · Vận hành_

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

> 🗣 **Lời trình bày:** Đây là những việc "dễ" với người có nghề: chạy công cụ là thấy, sửa trong vài ngày. Cái khó không nằm ở từng việc mà ở chỗ hiện không có người làm, và khi bán thì mỗi việc phải làm lại ở N nơi, định kỳ.

---

## 24. Ba việc bảo mật chuyên gia cũng không làm nhanh được

_Phần 9 · Bảo mật_

| Vấn đề | Vì sao khó | 📊 Số liệu |
| --- | --- | --- |
| Cách ly dữ liệu giữa các công ty (K-105) | Nằm trong **từng** câu đọc dữ liệu ở khắp hệ thống, không phải một chỗ cấu hình | **36/104** bảng mang trực tiếp mã công ty; ~**7** tệp kiểm thử |
| Mã AI viết chưa ai soi về bảo mật (K-106) | Kiểm thử xâm nhập và soi mã trên khối lượng này mất nhiều tuần, lặp lại sau mỗi bản lớn | ~**143.000** dòng; **0** lần kiểm thử xâm nhập |
| Vá cho mọi khách, mọi phiên bản (K-107) | Hệ quả của "khách tự chọn nâng cấp" | **7** dòng phiên bản phải vá riêng trong sự cố 12/2025 |
| Máy chủ nằm ở khách | Khách có toàn quyền; khách tự cài thì mình có thể không vào được | Bên mình kiểm soát **1/3** tầng |

> 🗣 **Lời trình bày:** 68 bảng không mang trực tiếp mã công ty phải nối qua bảng khác — một câu đọc quên nối là lộ dữ liệu công ty khác. Đây là loại lỗi không công cụ nào tự tìm hết được.

---

## 25. Dữ liệu hôm nay chỉ 3,7 MB — và có cả một bậc thang cách xử lý

_Lo ngại · "Dữ liệu nhiều làm chậm, nên cắt dữ liệu từng năm"_

- **3,7 MB** — toàn bộ dữ liệu production, ~6.760 dòng (bản sao 21/09/2026)
- **~9.000×** — khách lớn 60 triệu dòng so với hôm nay — đó mới là lúc phải lo

| Bậc | Cách làm | Khi nào cần |
| --- | --- | --- |
| 0 | Không làm gì | Khách nhỏ, trong nhiều năm |
| 1 | Phân trang + chỉ mục đúng chỗ | **Ngay bây giờ**, mọi khách |
| 2 | Bảng tổng hợp sẵn cho báo cáo, bộ nhớ đệm | Khách vừa |
| 3 | **Chia bảng theo năm ngay trong DB** — dữ liệu vẫn đủ | Khách lớn · bản đúng của "cắt từng năm" |
| 4 | Năm cũ sang kho lưu trữ chỉ-đọc | Khách rất lớn |
| 5 | Bản sao DB cho báo cáo, nhiều máy ứng dụng, hàng đợi | Hàng chục nghìn người dùng |

> 🗣 **Lời trình bày:** "Cắt dữ liệu từng năm" có tác dụng phụ: báo cáo nhiều năm gãy, truy vết lô thuốc khi thu hồi bị đứt, lịch sử nhân sự mất, nhiều loại dữ liệu theo luật phải giữ nhiều năm. Bậc 3 là phiên bản đúng của ý tưởng đó. Hiện hệ thống ở bậc 0; bậc 1 mới làm ở 3 chỗ.

---

## 26. Nội bộ thì bỏ qua được nhiều chuẩn — bán cho khách thì không

_Phần 10 · Chuẩn tuân thủ cho khách Việt Nam_

| Mức | Chuẩn / luật | Đòi hỏi chính | Hiện có |
| --- | --- | --- | --- |
| **Bắt buộc theo luật** | Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 (từ 01/01/2026) · Nghị định 356/2025 · Nghị định 330/2026 về xử phạt | Xin đồng ý; cho xem, sửa, xoá, rút đồng ý; hồ sơ đánh giá tác động; báo sự cố; phạt tới **5%** doanh thu | ❌ 0 chức năng đồng ý, xem, xuất, xoá |
| **Bắt buộc theo luật** | Luật An ninh mạng 116/2025/QH15 (từ 01/07/2026) | Bảo vệ hệ thống theo cấp độ; lưu dữ liệu tại Việt Nam với một số loại doanh nghiệp | 🟡 Chưa đánh giá — chờ nghị định |
| **Khách lớn sẽ hỏi** | ISO/IEC 27001:2022 | Chứng nhận cách công ty mình quản lý an toàn thông tin: **93** biện pháp, đánh giá mỗi năm | ❌ 0 chứng nhận |
| **Nên tự làm trước** | OWASP ASVS 5.0 | Bảng kiểm bảo mật ứng dụng miễn phí, ~**350** yêu cầu, 3 mức | ❌ 0 lần đối chiếu |
| **Chỉ khi có khách nước ngoài** | SOC 2 Type II · SOX · GDPR | Khách Mỹ · công ty con của doanh nghiệp niêm yết Mỹ · dữ liệu người châu Âu | Không cần cho khách Việt |

> 🗣 **Lời trình bày:** Bảng xếp theo mức cần thiết với khách Việt Nam. Luật bảo vệ dữ liệu cá nhân đã có hiệu lực — không phải việc chọn làm hay không. Các mục luật lấy từ bài phân tích của công ty luật, kiểm toán; cần luật sư đối chiếu văn bản gốc.

---

## 27. Bán ERP thì mình thành bên xử lý dữ liệu cá nhân cho khách

_Phần 10 · Dữ liệu cá nhân_

> Hồ sơ nhân sự có CCCD, lương, tài khoản ngân hàng, ngày nghỉ ốm — dữ liệu sức khoẻ thuộc loại **nhạy cảm**. Mỗi lần mình hỗ trợ, gỡ lỗi, sao lưu hộ hay cho khách thuê máy là mình đang xử lý dữ liệu đó (K-108).

- **5%** — doanh thu năm trước — mức phạt tối đa khi chuyển dữ liệu ra nước ngoài sai luật
- **10×** — khoản thu — mức phạt khi mua bán dữ liệu cá nhân
- **0** — mẫu hợp đồng xử lý dữ liệu

> Doanh nghiệp nhỏ và khởi nghiệp được ân hạn một số nghĩa vụ trong 5 năm (Điều 41 Nghị định 356) — cần luật sư xác nhận phần nào áp cho mình, phần nào cho khách.

> 🗣 **Lời trình bày:** Mỗi khách cần một hợp đồng xử lý dữ liệu nói rõ trách nhiệm hai bên. Đây là việc pháp lý, nhưng nó kéo theo yêu cầu kỹ thuật ở các trang sau.

---

## 28. Khách bán hàng online: ERP phải nhận tiền qua VNPay, MoMo, ZaloPay…

_Phần 11 · Cổng thanh toán_

- **0/5** — cổng phổ biến đã tích hợp (VNPay, MoMo, ZaloPay, OnePay, VietQR)
- **0** — đường nhận thông báo từ bên ngoài (webhook)

**Mỗi cổng một kiểu kết nối (K-114)**

Cách ký dữ liệu, mã lỗi, luồng hoàn tiền, tệp đối soát đều khác nhau — mỗi cổng là một tích hợp phải viết, kiểm, bảo trì riêng.

**Cổng phải gọi ngược vào máy khách (K-115)**

Người mua trả xong, cổng gửi kết quả về một địa chỉ của khách ⇒ **máy chủ khách phải mở ra internet**, có tên miền, có HTTPS. Với VNPay, địa chỉ này ở môi trường thật phải đăng ký với VNPay — mỗi khách một thủ tục.

> 🗣 **Lời trình bày:** Đây là chỗ ERP chạm vào tiền thật của khách và của người mua. Nó va thẳng với mô hình "cài trong mạng nội bộ của khách".

---

## 29. Thu tiền kéo theo hoá đơn điện tử — luật thuế không chờ khách

_Phần 11 · Hoá đơn điện tử, sàn thương mại điện tử_

**Hoá đơn điện tử (K-120)**

Nghị định 123/2020, sửa bằng Nghị định 70/2025 — ví dụ từ 01/06/2025, hộ kinh doanh doanh thu từ 1 tỷ đồng/năm phải dùng hoá đơn từ máy tính tiền kết nối cơ quan thuế. Mỗi nhà cung cấp hoá đơn (MISA meInvoice, Viettel, VNPT, BKAV…) một kiểu kết nối; luật đổi là **mọi** khách phải nâng cấp đúng hạn. 📊 **0** tích hợp hoá đơn điện tử.

**Sàn thương mại điện tử (K-121)**

Đơn từ Shopee, Lazada, TikTok Shop phải về ERP; tồn kho phải trừ ngay để không bán vượt. 📊 Thương mại điện tử: **chưa có**; **0** chỗ khoá dòng khi trừ kho.

> 🗣 **Lời trình bày:** Bán online không chỉ là một nút thanh toán: nó kéo theo hoá đơn, đồng bộ đơn, tồn kho thời gian thực, đối soát — mỗi thứ là một tích hợp với bên ngoài có lịch thay đổi riêng.

---

## 30. Ba cấp khách, ba cách cài

_Lo ngại · "Mỗi khách một bài toán"_

**Cấp nhỏ · < 100 người**

1 máy, ứng dụng và DB chung. Lo: sao lưu, cập nhật bảo mật. Dữ liệu **không** phải vấn đề.

**Cấp vừa · 100 – 2.000 người**

DB tách sang máy riêng. Lo: báo cáo chậm, giám sát, giờ bảo trì.

**Cấp lớn · > 2.000 người**

Nhiều máy ứng dụng, bản sao DB, hàng đợi, bộ nhớ đệm. Lo: tải, dữ liệu lớn, hạ tầng nhiều máy.

> Mốc chia cấp là **ước lượng** — **0** lần kiểm thử tải. Hiện chỉ có **1** cách cài (cấp nhỏ); thêm một cấp là thêm một bộ cài, một bộ kiểm thử, một chiều trong ma trận phát hành.

> 🗣 **Lời trình bày:** Cài riêng cho từng khách thì đúng là mỗi khách một bài toán. Chia cấp khách giúp gom bài toán lại thành ba, nhưng mỗi cấp vẫn là một sản phẩm vận hành riêng.

---

## 31. 8 vai cần người chịu trách nhiệm, kể cả khi dùng AI thoải mái

_Phần 14 · Đội ngũ · hiện 0 vai có người riêng_

**Quản trị DB**

Review cấu trúc, kiểm các bước chuyển đổi, dữ liệu lớn

**Kiểm thử viên**

Kiểm độc lập, dựng 46 loại kiểm thử

**Kiến trúc sư**

Khuôn chung, đánh giá ảnh hưởng tới mọi khách

**Người review mã**

Đọc lại mã AI viết trước khi phát hành

**Phân tích nghiệp vụ**

Biến chữ, ảnh của khách thành đặc tả kiểm được

**DevOps**

Đóng gói, bộ cài, triển khai, nâng cấp N khách

**Hỗ trợ, trực sự cố**

Gỡ lỗi trên máy khách, trực khi sập

**Bảo mật**

Quét, vá, theo dõi lỗ hổng, kiểm thử xâm nhập

> AI giúp **mỗi người làm nhanh hơn** — không thay được **người ký "bản này đủ an toàn để giao"** ở từng khâu (K-136).

> 🗣 **Lời trình bày:** Tám vai này là tối thiểu cho một công ty bán phần mềm cho nhiều khách. Hiện nhiều vai đang dồn vào một người.

---

## 32. Làm rối mã là gờ giảm tốc, không phải ổ khoá

_Phần 15 · Đóng gói và làm rối mã_

- **100%** — quyền quản trị máy chủ chạy phần mềm nằm ở khách (K-140)
- **104 + 89** — bảng và tệp chuyển đổi dạng chữ — không làm rối được (K-141)
- **0** — cơ chế khoá bản quyền (K-144)

- **Cấu trúc dữ liệu lộ trọn vẹn** — DB nằm trên máy khách; cấu trúc + giao diện đủ để một đội giỏi dựng lại phần lớn nghiệp vụ.
- **Gỡ lỗi khó hơn hẳn** — lỗi gửi về chỉ vị trí trong mã đã làm rối; phải giữ bản đối chiếu cho **từng** phiên bản đã giao, tới 12 bản (K-142).
- **Làm rối có thể làm hỏng hoặc chậm** — Next.js/React dựa vào tên hàm và cấu trúc mã; phải kiểm lại toàn bộ trên bản đã làm rối mỗi lần phát hành (K-143).

> 🗣 **Lời trình bày:** Chống cài chui — cài thêm cho công ty con, dùng tiếp sau khi hết hạn — cần khoá bản quyền, mà khoá chạy trên máy khách thì cũng gỡ được.

---

## 33. Ngôn ngữ lập trình không phải nút thắt chính

_Phần 16 · Công nghệ_

> Chỉ khoảng **5** khó khăn trong 159 gắn trực tiếp với nền tảng; phần còn lại giữ nguyên dù viết bằng ngôn ngữ nào. Nhưng ở lại hay chuyển đi đều có giá.

| Ở lại Node.js + Next.js + PostgreSQL | 📊 |
| --- | --- |
| Next.js đổi rất nhanh — mỗi năm một bản lớn, mỗi bản được vá ~2 năm (K-145) | 13 · 14 · 15 · 16 trong 2022–2025 |
| Giao diện và xử lý dính vào nhau — không có lớp API riêng cho tích hợp, di động, báo cáo (K-146) | **47** tệp thao tác ghi gắn vào màn; API công khai: **0** |
| Node.js xử lý trên một luồng — phép tính nặng làm chậm mọi người khác (K-147) | Chưa đo |
| IT của khách lớn quen Java, .NET, Python (K-148) | SAP: ABAP/Java · Dynamics: .NET · Odoo, ERPNext: Python |

> 🗣 **Lời trình bày:** Kết luận chuyên môn: chuyển ngôn ngữ không giải quyết được phần lớn khó khăn trong tài liệu này.

---

## 34. Một khách chưa phải là thị trường

_Phần 17 · Thị trường_

- **1** — khách tham chiếu, 15 người dùng (K-157)
- **0** — chỉ số hiệu quả đã đo — tiết kiệm bao nhiêu giờ, giảm bao nhiêu sai sót (K-158)
- **07/2026** — năm ra đời — so với SAP 1972 · MISA 1994 · Odoo 2005 (K-159)

> **Sản phẩm hay dịch vụ?** Tuỳ biến nhiều như làm dự án nhưng muốn nâng cấp đồng loạt như bán sản phẩm — đó là vị trí khó có lãi nhất (K-156).

> 🗣 **Lời trình bày:** Đối thủ có hàng chục năm, đối tác triển khai, tài liệu và cộng đồng. Lợi thế của mình phải nằm ở chỗ khác — và cần khách thứ hai, thứ ba để biết hệ thống hợp với ai.

---

## 35. Một bộ mã phục vụ nhiều khách: ngành đã đi ba con đường

_Bốn phương án_

**S — đang đề xuất**

Một bộ mã + file cấu hình; sửa mã khi cấu hình không đủ; cài ở khách; khách tự chọn nâng cấp.

**A — một bộ mã cho mọi khách**

Khách theo phần mềm; khác biệt chỉ qua cấu hình. Ví dụ: MISA AMIS, Base.vn, Salesforce.

**B — mỗi khách một bộ mã**

Phần mềm theo khách, chiều mọi yêu cầu. Ví dụ: đối tác Navision trước 2018, công ty làm phần mềm theo dự án.

**C — lõi chung + gói mở rộng**

Lõi không ai sửa cho một khách; phần riêng là gói cài thêm. Ví dụ: Business Central, SAP "clean core", Odoo kèm module riêng.

> 🗣 **Lời trình bày:** Ba con đường A, B, C đều có công ty thành công. Câu hỏi là phương án S đang gần con đường nào, và có kế thừa được ưu điểm của con đường đó không.

---

## 36. So sánh S với A, B, C

_Bốn phương án · so sánh_

| Tiêu chí | **S** — đang đề xuất | **A** — một bộ mã | **B** — mỗi khách một bộ mã | **C** — lõi + gói mở rộng |
| --- | --- | --- | --- | --- |
| Chiều khách được tới đâu | Hứa rất nhiều — kể cả sửa lõi | **Thấp** — từ chối nhiều yêu cầu | **Cao nhất** | Cao, trong giới hạn điểm mở rộng |
| Chi phí phục vụ khách thứ N | Tăng theo số phiên bản đang chạy | **Thấp** | **Tăng tuyến tính** | Thấp với lõi, tuyến tính với gói riêng |
| Một lỗ hổng như 12/2025 | Vá mọi phiên bản khách đang dừng | Vá **1** lần nếu mình vận hành | Vá **N** lần trên N bộ mã | Vá lõi 1 lần + kiểm từng gói |
| Nâng cấp | Khách tự chọn ⇒ nhiều bản song song | Nâng mọi khách cùng lúc | Mỗi lần một dự án — thường **không nâng** | Lõi nâng định kỳ; gói phải theo kịp |
| Đầu tư trước | Như A **cộng** như B | **Rất lớn** — nền tảng | **Thấp** | **Lớn** — nền tảng + điểm mở rộng |
| Dòng tiền | Chưa có mô hình | Thuê bao đều | Dự án + phí bảo trì | Thuê bao + dự án gói riêng |
| Hệ thống hiện tại còn thiếu | Mọi thứ A và B thiếu | 3 tính năng nền tảng, vận hành tập trung | Quy trình quản lý N bộ mã | 3 tính năng nền tảng **và** điểm mở rộng (hiện **0**) |

> 🗣 **Lời trình bày:** Đọc theo hàng: phương án S có cột "đầu tư trước" và "chi phí khách thứ N" nặng nhất, trong khi chưa có mô hình dòng tiền.

---

## 37. Phương án S dùng mã của A, nhưng chịu chi phí của B

_Bốn phương án_

> "Một bộ mã, file cấu hình quyết định" là cách của A. Nhưng "cài ở máy khách, khách tự chọn nâng cấp" làm **mỗi khách dừng ở một phiên bản** — mỗi phiên bản còn chạy là một bộ mã phải vá, phải hỗ trợ: tức là B.

- **10** — khách dừng ở 10 bản khác nhau ⇒ 10 bộ mã phải vá (ra bản mỗi tháng)
- **7** — dòng phiên bản Next.js phải vá trong sự cố 12/2025
- **434** — lần thay đổi mã trong ~2 tháng với 1 khách

Khác B ở chỗ các bộ mã đó **không sinh ra để chiều khách**, mà do khách ngừng nâng cấp vào những lúc khác nhau — nên **không chiều khách được như B** (K-100).

> 🗣 **Lời trình bày:** Đây là kết luận quan trọng nhất của phần so sánh. Phương án S gánh chi phí bảo trì của B mà không có lợi thế chiều khách của B, và cần nền tảng của A mà chưa có.

---

## 38. Mỗi phương án là một kiểu công ty khác nhau

_Bốn phương án · tổ chức công ty_

| | Đội ngũ cốt lõi | Ai quyết làm gì tiếp | Ai làm việc với khách | Rủi ro tổ chức |
| --- | --- | --- | --- | --- |
| **A** | Nhóm sản phẩm · nhóm nền tảng · nhóm theo module · kiểm thử tự động · vận hành 24/7 · bảo mật · hỗ trợ 3 tầng | Quản lý sản phẩm, theo **số đông** khách | Đội triển khai: cấu hình, nhập dữ liệu, đào tạo — **không sửa mã** | Mất khách có quy trình khác chuẩn |
| **B** | Mỗi khách một nhóm dự án · người phụ trách khách · đội bảo trì theo hợp đồng · nhóm nhỏ giữ thư viện chung | Từng khách, cho bộ mã của họ | Chính nhóm dự án | Đội bảo trì phình theo số khách; người nghỉ mang theo hiểu biết |
| **C** | Như A cho lõi · nhóm (hoặc đối tác) làm gói mở rộng · kiến trúc sư giữ "hợp đồng" điểm mở rộng · khâu duyệt gói riêng | Lõi: quản lý sản phẩm. Gói riêng: khách đặt | Đội triển khai + nhóm gói mở rộng | Giữ kỷ luật "không ai sửa lõi cho một khách" |
| **S** | Cần **cả** đội của A **và** đội của B · cộng đội vận hành từ xa cho N máy chủ không phải của mình | Chưa rõ | Chưa rõ — đội cấu hình hay đội sửa mã | Gánh chi phí của cả A lẫn B |

> 🗣 **Lời trình bày:** Đổi phương án giữa chừng là tái cơ cấu công ty, không chỉ là sửa mã (K-104). Hiện 0/8 vai kỹ thuật có người riêng.

---

## 39. Phải chọn hướng trước khi viết thêm module

_Kết_

**Nếu chọn A hoặc C**

Từ hôm nay mọi module mới phải viết trên **ba tính năng nền tảng**: trường theo khách, quy trình duyệt theo khách, cây đơn vị do khách khai. Mỗi module viết theo cách cũ là thêm một module phải làm lại.

**Nếu chọn B**

Không cần nền tảng, nhưng **phí bảo trì và đội bảo trì theo số khách** phải có ngay trong báo giá đầu tiên.

> Mỗi tuần chưa chọn là thêm mã viết theo khuôn "một công ty" — đúng thứ sẽ phải làm lại.

> 🗣 **Lời trình bày:** Đây là đề xuất hành động duy nhất của buổi trình bày: chọn hướng, rồi mới quyết các câu hỏi còn lại.

---

## 40. Những câu cần trả lời trước khi đi tiếp

_Kết · những câu cần trả lời_

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

> 🗣 **Lời trình bày:** Không cần trả lời hết trong buổi họp, nhưng mỗi câu chưa có câu trả lời là một rủi ro sẽ lộ ra ở khách đầu tiên.
