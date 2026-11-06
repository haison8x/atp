# Bán hệ thống ERP cho khách hàng bên ngoài — những khó khăn về kỹ thuật

> Bản nháp · 05/11/2026
> **Mục đích:** liệt kê đầy đủ các khó khăn **kỹ thuật**, **quy trình phát triển phần mềm**, **triển
> khai** và **bảo trì** khi đóng gói hệ thống ERP đang chạy ở công ty mình để bán cho khách hàng khác.
> **Cách đọc:** các phần xếp theo **mức độ quan trọng giảm dần** — Phần 1 nặng nhất. Mỗi khó khăn có mã
> `K-xx` và một dòng **📊 Số liệu** đo trên **chính hệ thống hiện tại** (Phụ lục B) hoặc từ nguồn bên ngoài
> (Phụ lục C). Gặp thuật ngữ lạ: xem **Phụ lục A — Từ điển nhanh**.

**Mô hình đang được đề xuất:**

- Khách đưa yêu cầu (chữ, ảnh…) → công ty dựng cấu hình → sửa code nếu cấu hình không đủ → triển khai.
- Một bộ mã nguồn duy nhất. Ra bản mới giống Windows: khách **tự chọn** nâng cấp hay không.
- Tính năng nào dùng là do **file cấu hình** của từng khách.
- Khách đòi sửa sâu vào lõi → sửa code sao cho không ảnh hưởng khách khác.
- Cài lên máy chủ của khách hoặc máy thuê bên mình; khách tự cài hoặc thuê bên mình cài.
- Bộ cài có sẵn DB; khách tự backup, tự tối ưu; bên mình cung cấp script.
- Không giao mã nguồn; mã được làm rối trước khi giao.

Phần 8 gọi mô hình này là **phương án S** và so nó với ba con đường ngành phần mềm đã đi.

---

## Tóm tắt — đọc trang này nếu chỉ có 5 phút

**Một hình ảnh:** hệ thống hiện nay giống **một căn nhà tự xây cho gia đình mình** — xây nhanh, sửa lúc
nào cũng được, ở trong nhà nên biết chỗ nào dột. Bán ERP cho nhiều khách là **mở công ty xây nhà cho
người khác**: chủ nhà đang ở bên trong khi mình sửa, có bản vẽ ký trước, có nghiệm thu, có bảo hành, và
một lỗi thiết kế phải sửa ở **mọi** căn đã xây.

Hệ thống chạy tốt ở công ty mình nhờ **năm điều kiện thuận lợi** — cả năm sẽ **mất** khi bán:

| Điều kiện hôm nay                                              | Số liệu                                                         | Khi bán cho khách                                                         |
| -------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Được **xoá sạch dữ liệu làm lại** bất cứ lúc nào               | Mỗi lần kiểm tra đầy đủ = **xoá sạch DB 2 lần**                 | Dữ liệu khách không bao giờ được xoá                                      |
| **Một** phiên bản đang chạy                                    | Cao điểm **140** lần thay đổi mã **trong 1 ngày**               | Mỗi khách dừng ở một phiên bản khác nhau                                  |
| **Một** khách, ngồi cùng nhà, chịu được lỗi                    | **37%** lần thay đổi mã là sửa lỗi                              | Nhiều khách, ở xa, không chịu được lỗi                                    |
| Yêu cầu đổi liên tục, sửa ngay                                 | **~1.920** quyết định trong ~2 tháng; **≥20** quyết định bị đảo | Mỗi lần đổi phải qua phân loại, kiểm thử, nghiệm thu                      |
| Người viết code cũng vận hành, **thấy mọi dữ liệu và máy chủ** | **3** môi trường do chính mình giữ                              | Không thấy dữ liệu khách, không giữ máy chủ, mã bị làm rối nên khó gỡ lỗi |

**Tám điều quan trọng nhất** (theo thứ tự các phần):

1. **Dữ liệu của khách có thể mất khi nâng cấp** (Phần 1). Với **một** khách, cấu trúc dữ liệu đã đổi **29
   lần trong 6 ngày**; **0/89** lần có đường quay lại; khách đứng yên hai năm rồi nâng cấp phải chạy **88** bước
   liên tiếp trên dữ liệu mình không được nhìn thấy.
2. **"Như Windows" không chạy được với ERP** (Phần 2). Tháng 12/2025 nền tảng mà hệ thống dùng có lỗ hổng
   **10/10 điểm**, kẻ tấn công chiếm được máy chủ, **đã bị khai thác thật**. Khách nào "chọn không nâng
   cấp" thì máy chủ của họ mở toang. Windows thì **ép** cập nhật hằng tháng.
3. **"Khách gửi → làm → triển khai" bỏ qua 9/12 bước** (Phần 3). **0** kiểm thử viên; nghiệm thu
   hiện là "nhìn màn thật"; ngay với khách nội bộ, yêu cầu đã qua **≥5** phiên bản bản vẽ rồi bỏ hẳn.
4. **"Sửa cho khách này không ảnh hưởng khách khác" là bài toán khó nhất của phần mềm doanh nghiệp**
   (Phần 4). Ngay ví dụ nhỏ nhất — hai khách dùng cùng chức năng, khách B chỉ **thêm một ô** vào biểu mẫu hay **thêm
   một bước duyệt** — cũng phải sửa mã và DB cho **mọi** khách, ở **mọi** module: **38** luồng trạng thái cố định, **8**
   cách tính chuỗi duyệt, **0** chỗ khai báo theo công ty. Công ty chỉ 2 cấp hay tập đoàn 6 cấp cũng không khớp cây
   cố định **2** tầng đơn vị của hệ thống.
5. **Chưa có hệ thống kiểm thử để bán** (Phần 5). **29/46** loại kiểm thử đang là **0**, kể cả toàn bộ kiểm
   thử chịu tải; **0/10** loại riêng của ERP (đồng thời, tiền, vết kiểm toán…) có đủ.
6. **Mã và cấu trúc dữ liệu do AI sinh, chưa ai review** (Phần 6). **78%** lần thay đổi mã có AI viết cùng;
   **10%** số lần lớn hơn **15.000 dòng**; **104** bảng tăng **60% trong 2 tuần**.
7. **Vận hành N máy chủ ở N khách, chưa có người chuyên nghiệp** (Phần 7). Hàng chục lỗ hổng vận hành và bảo mật
   thuộc loại người có nghề dùng công cụ là thấy ngay — nhưng hiện **0** DevOps, **0** chuyên gia bảo mật, và mỗi
   việc phải làm lại ở **N** khách. Khi khách báo lỗi, mình **không thấy** dữ liệu, **không giữ** máy chủ.
8. **Phương án đang đề xuất dùng mã của "một bộ mã cho mọi khách" nhưng chịu chi phí của "mỗi khách một bộ mã"**
   (Phần 8). Khách tự chọn nâng cấp ⇒ 10 khách có thể là **10** phiên bản phải vá. Các hãng lớn đã chọn "lõi chung
   + gói mở rộng" — cần **3** tính năng nền tảng và các điểm mở rộng mà hệ thống hiện có **0**.

Phần 9 → 17 (bảo mật, chuẩn tuân thủ và dữ liệu cá nhân, cổng thanh toán, hiệu năng, triển khai, đội ngũ, đóng
gói, công nghệ, thị trường) ít cấp bách hơn nhưng vẫn phải giải trước khi bán. Riêng **luật bảo vệ dữ liệu cá
nhân** đã có hiệu lực từ 01/01/2026 — không phải việc chọn làm hay không (Phần 10).

Ba câu hỏi kỹ thuật đang được quan tâm — **bảo mật**, **dữ liệu nhiều làm chậm hệ thống**, **cài riêng
từng khách** — có trả lời ngắn ở mục "Ba lo ngại kỹ thuật" cuối tài liệu.

---

## Phần 1 — Dữ liệu của khách: nâng cấp và sao lưu

> **Nói nôm na:** mỗi bản mới thường kèm thay đổi "bản vẽ kết cấu" của kho dữ liệu. Ở máy phát triển, việc
> này dễ vì **được đập đi xây lại**. Ở khách phải **sửa kết cấu khi kho đang đầy hàng và người ta đang làm
> việc bên trong** — không được mất một món.

### 1.1. Nâng cấp

- **K-01 · Không có nút "quay lại".** Nâng cấp hỏng giữa chừng thì chỉ còn cách **khôi phục backup** — mất
  mọi dữ liệu khách nhập từ lúc backup.
  📊 **0/89** bước chuyển đổi có đường lùi; backup **1 lần/ngày** ⇒ có thể mất tới **24 giờ** dữ liệu.
- **K-02 · Nâng cấp nhảy cóc.** "Khách tự chọn nâng cấp" ⇒ có khách đứng yên hai năm rồi nâng lên bản mới
  nhất — phải chạy tuần tự **mọi** bước chuyển đổi ở giữa, trên dữ liệu hai năm, theo đường chưa ai chạy thử.
  📊 Khách cài từ bản đầu hôm nay muốn lên bản mới nhất phải chạy **88** bước liên tiếp.
- **K-03 · Máy phát triển luôn "đạt", máy thật mới hỏng.** Đã xảy ra: đổi tên một giá trị lựa chọn — máy
  phát triển chạy tốt (DB luôn mới tinh), máy thử và máy thật **hỏng khi nâng cấp** vì dữ liệu cũ còn giữ
  tên cũ. Công cụ chuyển đổi **không tự sinh** bước sửa dữ liệu.
  📊 Lỗi loại này được ghi **6** lần trong sổ quyết định.
- **K-04 · Dữ liệu mỗi khách một kiểu.** Bước chuyển đổi đúng trên dữ liệu công ty mình có thể sai trên dữ
  liệu khách B: ô bỏ trống, dữ liệu trùng phá ràng buộc mới, cách nhập số khác.
  📊 Riêng lỗi số kiểu Việt `319,87` bị đọc thành **0** đã **vấp 5 lần**.
- **K-05 · Lỗi chỉ lộ ra trên dữ liệu thật — mà mình không được lấy dữ liệu khách về thử.** Dự án đã phải
  dựng quy trình kiểm thử trên bản sao dữ liệu thật vì dữ liệu mẫu không bắt được lỗi.
  📊 Chạy tác vụ thật trên bản sao dữ liệu thật mới lộ ra **140** dòng bị khoá nhầm; sau một lần chép dữ
  liệu, bộ đếm mã lùi lại và **cấp trùng mã đã có người giữ** ⇒ màn hình lỗi.
- **K-06 · Cấu trúc dữ liệu đổi rất thường xuyên.**
  📊 **89** lần chuyển đổi; riêng 15–21/09/2026 là **29 lần trong 6 ngày**; tổng **500** lệnh sửa bảng, **34**
  lần đổi tên, **7** lần xoá cột/bảng — loại thao tác nguy hiểm nhất với dữ liệu đang có.
- **K-07 · Cách làm hiện tại coi cấu trúc dữ liệu là "đồ dùng một lần".** Đúng khi có một khách và được xoá
  làm lại. Khi bán, chi phí sai cấu trúc = **N khách × rủi ro mất dữ liệu** ⇒ phải đổi cách làm, và tốc độ
  phát triển sẽ chậm lại rõ rệt.
  📊 Quy tắc dự án ghi nguyên văn: _"chi phí sai schema ≈ 0"_.
- **K-08 · Sửa cái cũ nhiều hơn hẳn thêm cái mới.** Yêu cầu mới thường là thêm cột vào bảng dùng chung, đổi
  ràng buộc, thêm giá trị vào danh sách cố định — đụng tới **mọi** khách.
  📊 **500** lệnh sửa bảng có sẵn so với **43** bảng tạo mới ⇒ sửa cái cũ nhiều gấp ~**12 lần**.

### 1.2. Khách có toàn quyền trên DB

- **K-09 · Mình chịu trách nhiệm cấu trúc, nhưng không giữ chìa khoá.** Khách thêm chỉ mục, trigger, báo cáo
  phụ thuộc vào cột, sửa tay dữ liệu "chữa cháy" — bất kỳ điều nào cũng làm lần nâng cấp sau **thất bại**, và
  **khó chứng minh lỗi do ai**.
  📊 **104** bảng; **500** lệnh sửa bảng trong lịch sử — mỗi lệnh là một chỗ có thể đụng vào thứ khách tự thêm.
- **K-10 · Không phát hiện được DB bị sửa ngoài luồng.** Nâng cấp an toàn cần công cụ so cấu trúc thật với
  cấu trúc mong đợi, và từ chối nâng cấp khi lệch.
  📊 **0** công cụ.
- **K-11 · Phần lớn công ty vừa và nhỏ không có người quản trị DB** ⇒ "khách tự backup, tự tối ưu" thường
  thành "không ai làm".
  📊 Để vận hành **1** khách, bên mình đang cần **31** script máy chủ.
- **K-12 · Khách "tối ưu" DB theo cách của họ** — tắt ràng buộc, xoá dữ liệu cũ, đổi thông số — có thể phá
  tính đúng đắn mà phần mềm dựa vào.
  📊 **Chưa có số**.

### 1.3. Những khó khăn khác khi nâng cấp

- **K-13 · Một số thay đổi khoá cả bảng trong lúc chạy** ⇒ phải dừng hệ thống, hẹn giờ với khách, ước lượng
  thời gian trên dữ liệu từng khách.
  📊 Thời gian chạy trên dữ liệu khách lớn: **chưa có số** (chưa từng đo).
- **K-14 · Một số thay đổi không chạy tự động được.** Công cụ **đòi người ngồi trả lời** ("đổi tên hay xoá
  rồi thêm mới?"); có thay đổi phải tách làm hai lần. Ở máy khách tự cài, không ai hiểu để trả lời.
  📊 Ghi lại **5** lần trong sổ quyết định.
- **K-15 · Cấu hình khác nhau ⇒ dữ liệu khác hình dạng.** Một bước chuyển đổi phải đúng với **mọi** tổ hợp
  cấu hình đã bán.
  📊 **25** nhóm tính năng; nếu mỗi nhóm chỉ bật/tắt ⇒ **2²⁵ ≈ 33 triệu** tổ hợp lý thuyết.
- **K-16 · Chuyển đổi kéo theo tác vụ nền, báo cáo, tích hợp** — tất cả có thể gãy theo.
  📊 **5** tác vụ chạy nền định kỳ; **26** lệnh xử lý dữ liệu riêng.
- **K-17 · 100 khách thì bao nhiêu bảng?** Một bộ mã duy nhất ⇒ bảng làm cho khách nào cũng nằm trong DB của
  **mọi** khách, và mọi bước chuyển đổi chạy ở **mọi** khách.
  📊 Giả sử mỗi khách thêm **5** bảng riêng: 100 khách ⇒ **~600** bảng; khách nào cũng mang đủ 600 dù chỉ dùng
  khoảng 100. Công cụ chuyển đổi lưu ảnh chụp cấu trúc **4,2 KB/bảng/lần** — ở 500 bảng thành **hàng trăm
  MB**, dự án đã phải viết lệnh dọn riêng.

- **K-18 · DB đóng sẵn trong bộ cài — bớt được một việc, sinh việc khác.** Phiên bản đã cố định, không lệch
  giữa các khách. Nhưng: ① nâng PostgreSQL lên bản lớn mới thành **việc của mình trên mọi máy khách**, phải
  dừng hệ thống; ② DB chung máy với ứng dụng thì tranh tài nguyên — khách lớn phải tách ra; ③ khách lớn
  thường đòi dùng DB **của họ** (DB dịch vụ trên cloud, cụm dự phòng) — khi đó lại lệch phiên bản, lệch phần
  mở rộng, lệch cách sắp xếp tiếng Việt; ④ DB nằm trong bộ cài của mình mà lại "khách tự quản" — ranh giới
  trách nhiệm càng mờ.
  📊 Bộ cài dùng PostgreSQL **16**, hết hỗ trợ **11/2028** ⇒ mọi khách phải được nâng bản lớn trước mốc đó.
  Lần đổi bản gần nhất, script backup đã phải sửa riêng vì PostgreSQL 18 ghi thêm một dòng cuối tệp — suýt
  **xoá nhầm bản backup tốt**.

> Sao lưu và khôi phục (hiện chỉ giữ **1/4** loại dữ liệu cần giữ, không mã hoá, **0** lần khôi phục thử, có thể mất
> tới **24 giờ** dữ liệu) là việc thường ngày của một DevOps có nghề — đã gom vào K-91.

---

## Phần 2 — "Như Windows": nhiều phiên bản và bản vá bảo mật

- **K-19 · Lỗ hổng bảo mật không chờ khách sẵn sàng.** Khách không nâng cấp vẫn bị tấn công. Phải chọn:
  **ép** cập nhật (tức là không còn "khách tự chọn"), hoặc **vá ngược** cho từng phiên bản cũ.
  📊 CVE-2025-55182 (12/2025): **10/10** điểm, kẻ tấn công chiếm máy chủ **không cần đăng nhập** chỉ bằng **1**
  lần gửi yêu cầu, **đã bị khai thác thật**; nhà phát triển Next.js phải ra bản vá riêng cho **7** dòng phiên
  bản. Hệ thống dùng đúng nền tảng này (Next.js 16, React 19) — hôm nay **đã ở bản an toàn** (Next.js 16.3.5,
  React 19.3.0) vì chỉ có một máy chủ do mình giữ; khi bán, khách "chọn không nâng cấp" thì máy chủ của họ mở toang.
- **K-20 · Nhiều phiên bản cùng sống.** Mỗi phiên bản còn khách dùng là một sản phẩm phải hỗ trợ: tái hiện
  lỗi, vá lỗi — trên **đúng** phiên bản đó. Không tách nhánh mã nhưng thực chất vẫn là nhiều sản phẩm.
  📊 Nhịp hiện tại **434** lần thay đổi mã / 14 ngày. Giả sử phát hành mỗi tháng và hỗ trợ 12 tháng ⇒ tới **12
  phiên bản** cùng sống.
- **K-21 · Windows là phép so sánh sai.** Windows **ép** cập nhật bảo mật hằng tháng, và không phải chuyển đổi
  dữ liệu kế toán, kho, nhân sự của người dùng mỗi lần nâng cấp — ERP thì phải (Phần 1).
  📊 Windows: cập nhật bảo mật **mỗi tháng**, tự động. ERP này: một bản mới có thể kèm tới **29** lần đổi cấu
  trúc dữ liệu (K-06).
- **K-22 · Nền tảng bên dưới tự hết hạn**, dù khách không đụng gì ⇒ mọi khách phải được nâng nền tảng định
  kỳ, kể cả khách "chọn không nâng cấp".
  📊 Next.js: mỗi bản lớn được vá **~2 năm** — Next.js 15 hết hỗ trợ **21/10/2026**. PostgreSQL: **5 năm** mỗi
  bản. Node.js: **30 tháng** — Node 20 đã hết **30/04/2026**. Hệ thống kéo theo **51** thư viện trực tiếp và
  **~900** thư viện gián tiếp; đã có **3** bản nâng cấp lớn của thư viện bị chặn vì không tương thích.
- **K-23 · Ma trận phải kiểm thử cho mỗi bản phát hành.**
  📊 Ví dụ khiêm tốn: **4** phiên bản đang sống × **3** kiểu cài đặt × **3** cấu hình điển hình × **2** cỡ tải
  (nhỏ / lớn) = **72** tổ hợp.
- **K-24 · Phát hành chung hay riêng từng khách?** Làm xong yêu cầu nào triển khai ngay cho khách đó ⇒ mỗi
  khách một phiên bản. Gom thành đợt phát hành chung ⇒ khách phải chờ.
  📊 Nhịp hiện tại **~31** lần thay đổi mã/ngày cho **1** khách.
- **K-25 · File cấu hình cũng có phiên bản.** Bản mới thêm/bỏ/đổi nghĩa một mục cấu hình ⇒ file cấu hình
  từng khách phải chuyển đổi theo; sai thì thường **không báo lỗi**, chỉ chạy khác đi.
  📊 Hiện có **24** biến cấu hình máy chủ; file cấu hình nghiệp vụ theo khách: **0** — chưa tồn tại.
- **K-26 · Hỗ trợ bản cũ đến bao giờ?** Cần chính sách "chỉ hỗ trợ N bản gần nhất".
  📊 **Chưa có số** — chưa có chính sách vòng đời phiên bản.
- **K-27 · Ghi chú phát hành cho người dùng và cho IT của khách** — bản mới có gì, phải làm gì trước khi
  nâng cấp.
  📊 **0**.

---

## Phần 3 — Quy trình: "khách gửi → làm → triển khai" thiếu những gì

> Giữa "khách gửi" và "triển khai" có ít nhất **12 bước**. Mỗi bước cần một người chịu trách nhiệm ở phía
> mình **và** một người tương ứng ở phía khách. Bỏ bước nào thì rủi ro của bước đó dồn xuống lúc nghiệm thu
> — đúng lúc tốn kém nhất để sửa.

| #   | Bước                               | Câu hỏi phải trả lời                                                      | Phía mình cần                     | Phía khách cần                      | Hiện có                              |
| --- | ---------------------------------- | ------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ------------------------------------ |
| 1   | Tiếp nhận                          | Ai bên khách được quyền yêu cầu? Qua kênh nào? Ghi lại ở đâu?             | Quản lý dự án                     | Đầu mối được uỷ quyền               | ❌ 0 hệ thống phiếu yêu cầu          |
| 2   | Làm rõ                             | Yêu cầu nói gì, **không** nói gì? Ca ngoại lệ? Ai được thấy, ai được sửa? | Phân tích nghiệp vụ (BA)          | Người dùng chủ chốt trả lời câu hỏi | 🟡 1 người kiêm, tự chốt giả định    |
| 3   | Phân loại                          | Lỗi, thay đổi, tính năng mới hay chỉ là cấu hình? Vào lõi hay làm riêng? | Người làm sản phẩm                | —                                   | ❌                                   |
| 4   | Ước lượng                          | Mất bao lâu — tính cả kiểm thử, nghiệm thu, triển khai?                  | Trưởng kỹ thuật                   | —                                   | ❌ 0 dữ liệu ước lượng               |
| 5   | Chốt phạm vi + tiêu chí nghiệm thu | Thế nào là "xong"? Viết ra trước khi làm                                  | Quản lý dự án                     | Người có thẩm quyền xác nhận        | ❌ 0 mẫu                             |
| 6   | Thiết kế, đánh giá ảnh hưởng       | Sửa thế này có làm hỏng khách khác không? (Phần 4)                        | Kiến trúc sư                      | —                                   | ❌                                   |
| 7   | Phát triển + review mã             | Ai đọc lại mã AI viết?                                                    | Lập trình viên + AI, người review | —                                   | 🟡 1 người                           |
| 8   | Kiểm thử hệ thống                  | Ai kiểm, trên dữ liệu nào, môi trường nào, chạy lại cho khách khác không? | Kiểm thử viên (QA) độc lập        | —                                   | ❌ 0 QA                              |
| 9   | Nghiệm thu (UAT)                   | Khách thử theo tiêu chí đã chốt, trên môi trường thử của họ               | Hỗ trợ khách thử                  | Người dùng chủ chốt, có thời gian   | 🟡 "nhìn màn thật"               |
| 10  | Lên lịch, triển khai               | Khi nào dừng hệ thống? Ai bấm? Hỏng thì quay lại thế nào?                 | Vận hành (DevOps)                 | IT của khách duyệt, mở quyền        | 🟡 1 script do người phát triển chạy |
| 11  | Đào tạo, tài liệu                  | Người dùng biết dùng tính năng mới chưa?                                  | Đào tạo viên                      | Người dùng sắp xếp thời gian học    | ❌ 0 tài liệu người dùng             |
| 12  | Hỗ trợ sau bàn giao                | Lỗi phát sinh xử lý thế nào, trong bao lâu?                               | Hỗ trợ kỹ thuật                   | Đầu mối báo lỗi                     | ❌ 0 hệ thống phiếu hỗ trợ           |

📊 **0/12** bước có quy trình viết sẵn cho khách ngoài; cần **8** vai phía mình, **6** vai phía khách.

### 3.1. Ai kiểm thử?

- **K-28 · Người làm không nên là người kiểm cuối cùng.** Lập trình viên (và AI của họ) kiểm điều họ hiểu;
  kiểm thử viên độc lập kiểm điều khách cần.
  📊 **0** kiểm thử viên.
- **K-29 · Kiểm trên dữ liệu nào?** Không được dùng dữ liệu thật của khách; dữ liệu mẫu đã bỏ sót lỗi (K-05).
  📊 **1** bộ dữ liệu mẫu, của **1** công ty.
- **K-30 · Kiểm trên môi trường nào?** Mỗi khách một cấu hình, một phiên bản ⇒ cần môi trường thử giống máy
  thật của **từng** khách.
  📊 **1** khách nội bộ đã cần **2** môi trường thử và **19** script riêng cho chúng.
- **K-31 · Sửa cho khách A thì phải kiểm lại cho khách B, C…**
  📊 **72** tổ hợp phải chạy thử cho mỗi bản vá (K-23).

### 3.2. Ai nghiệm thu?

- **K-32 · Nghiệm thu hiện nay là "nhìn màn thật".** Khách ngoài cần nghiệm thu theo **tiêu chí viết trước**,
  có biên bản. Khách không có người, không có thời gian ⇒ thử vài màn rồi đồng ý, dùng thật rồi mới phát
  hiện lỗi.
  📊 **0** mẫu biên bản; **0** tiêu chí nghiệm thu viết trước; ngay với khách nội bộ đã **2 lần** kết luận sai
  lúc xem màn (K-39).
- **K-33 · "Lỗi" hay "yêu cầu mới"?** Muốn phân biệt phải có đặc tả viết ra **trước** để đối chiếu. Không có
  thì mọi thứ khách thấy chưa vừa ý đều thành "lỗi" và phải sửa miễn phí.
  📊 **0** đặc tả được khách xác nhận trước khi làm.

### 3.3. Đầu vào "chữ và ảnh"

- **K-34 · Chữ và ảnh không phải là đặc tả.** Ảnh cho thấy màn **trông thế nào**, không cho biết **luật**: ai
  được thấy, ai được sửa, có những trạng thái nào, dữ liệu lấy từ đâu, sai thì sao.
  📊 Ngay với khách nội bộ: yêu cầu đã qua **≥5** phiên bản bản vẽ màn hình (ceov5.8 → 5.10 → 6.3 → 6.15 →
  v8.15) rồi **bỏ hẳn** cách giao bằng bản vẽ; **35** tệp đặc tả phải có mục riêng ghi chỗ "màn làm ra lệch
  bản vẽ"; ít nhất **2** lần chép nhầm phần thừa trong bản vẽ vào màn thật.
- **K-35 · Yêu cầu ẩn.** Những thứ khách coi là hiển nhiên nên không viết: phân quyền, lịch sử sửa, xuất
  Excel, in, tìm kiếm, xác nhận trước khi xoá, dùng trên màn hẹp… Thiếu thì khách gọi là lỗi.
  📊 Hệ thống hiện có **6** tiêu chí "xong" và **16** luật chung mà không yêu cầu nào của khách nhắc tới,
  nhưng màn nào cũng phải đáp ứng.
- **K-36 · Câu hỏi không được trả lời ⇒ phải đoán.** Với khách nội bộ, đoán sai thì sửa. Với khách ngoài,
  đoán sai là **bị từ chối lúc nghiệm thu**.
  📊 Một màn gom câu hỏi cho phía nghiệp vụ từng được dựng rồi **gỡ bỏ** vì không được dùng; **86** dòng trong
  sổ quyết định ghi "tự chốt / giả định".
- **K-37 · Nhiều người phía khách, nhiều ý.** Giám đốc, trưởng phòng, người dùng nói khác nhau; yêu cầu của
  người này phủ định yêu cầu của người kia.
  📊 Hiện chỉ có **1** người chốt yêu cầu. Khách ngoài: **chưa có số**.
- **K-38 · Yêu cầu đổi ngay trong lúc làm, và sau khi đã nghiệm thu.**
  📊 **≥20** quyết định bị đảo tường minh; **57** dòng trong sổ quyết định ghi chữ "đảo".
- **K-39 · Hiểu nhầm hai chiều.** Bên kỹ thuật hiểu sai yêu cầu; người nghiệp vụ cũng đọc sai màn đã làm.
  📊 **18** dòng trong sổ quyết định ghi "hiểu nhầm / hiểu sai / đọc nhầm"; ngay với khách nội bộ đã **2 lần**
  kết luận "màn không có nút" vì xem nhầm nhánh màn hình.
- **K-40 · Viết yêu cầu bằng chữ cho đủ là việc khó — kể cả với người trong nhà.** Đã dựng sẵn khuôn 4 tệp
  và công cụ AI đóng vai lập trình viên hỏi trước 5 câu khó nhất.
  📊 Số đợt yêu cầu đã nộp theo khuôn này: **0**; **22/22** lần thay đổi trong thư mục nhận yêu cầu là của bên
  kỹ thuật. Khách ngoài sẽ khó hơn.

### 3.4. Ước lượng và ưu tiên

- **K-41 · Ước lượng.** AI viết mã rất nhanh, nhưng viết mã chỉ là **1/12** bước. Không biết cả chuỗi mất bao
  lâu thì không hứa được ngày giao.
  📊 **0** dữ liệu lịch sử về thời gian từ lúc nhận yêu cầu đến lúc nghiệm thu.
- **K-42 · Ưu tiên giữa các khách.** Khách A, B, C cùng đòi gấp, chỉ có một đội; đổi qua đổi lại giữa các
  khách làm mỗi việc chậm thêm.
  📊 **Chưa có số**.

### 3.5. Phát triển với AI

- **K-43 · Mỗi yêu cầu phải được đánh giá ảnh hưởng tới mọi khách khác** (Phần 4) — trước khi viết dòng mã
  đầu tiên.
  📊 **0** người giữ vai kiến trúc sư.
- **K-44 · Nút thắt chuyển từ "viết" sang "kiểm".**
  📊 Một màn bị vỡ bố cục (cao từ **4.413** lên **5.200** điểm ảnh) trong khi **mọi** bước kiểm tự động đều báo
  đạt.
- **K-45 · AI viết, AI kiểm, AI sửa — cùng một điểm mù.** Kiểm thử do chính AI viết thường kiểm đúng điều AI
  nghĩ, chưa chắc đúng điều nghiệp vụ cần.
  📊 **37%** lần thay đổi là sửa lỗi.
- **K-46 · Mã AI viết cần rất nhiều "rào chắn".**
  📊 **21** lệnh kiểm tra tự động; **396** dòng hướng dẫn cho AI + **320** dòng sổ lệnh; **268** tệp đặc tả,
  **~25.000** dòng — tất cả sinh ra **sau** khi AI đã làm sai, cho **1** sản phẩm, **1** khách.
- **K-47 · Nhiều người cùng dùng AI trên một bộ mã sẽ đụng nhau.** Công cụ quản lý mã chỉ báo xung đột khi
  trùng **dòng**, không báo khi trùng **ý**.
  📊 Chỉ với **1** người chạy nhiều phiên AI song song đã xảy ra: trùng số bước chuyển đổi DB, hai phiên dựng
  cùng một tính năng theo hai cách, một phiên xoá sạch DB của phiên kia. Đội 5 người — nhân lên.
- **K-48 · Truy vết.** Yêu cầu nào → mã nào → kiểm thử nào → nghiệm thu nào, **theo từng khách**. Thiếu truy
  vết thì không trả lời được "vì sao màn này chạy thế này".
  📊 Với **1** khách đã có **~1.920** quyết định trong **182** tệp. N khách ⇒ N lần.

---

## Phần 4 — Một bộ mã cho nhiều khách: sửa cho khách này mà không hỏng khách khác

- **K-49 · Đây là bài toán kiến trúc khó nhất của mọi phần mềm doanh nghiệp.** Có bốn cách, cách nào cũng có
  giá:

  | Cách                                                     | Cái giá                                                                                                                                                                        |
  | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | Rẽ nhánh theo tên khách trong mã (`nếu là khách X thì…`) | Nhanh lúc đầu. Sau 10 khách, mỗi chức năng là một mớ điều kiện; sửa một chỗ phải thử lại cho mọi khách.                                                                         |
  | Mỗi khách một "phiên bản" của đoạn logic đó (cắm–rút)    | Mỗi lần đổi lõi phải kiểm lại **mọi** phiên bản đã cắm. Phải biết trước chỗ nào được cắm — mà chưa biết khách sẽ đòi sửa chỗ nào (K-59).                                       |
  | Đưa thành cấu hình                                       | Chỉ làm được với thứ biết trước sẽ khác. Với công thức tính toán, cấu hình dần biến thành **một ngôn ngữ lập trình thu nhỏ** — cần trình soạn, kiểm lỗi, kiểm thử, tài liệu. |
  | Cơ chế mở rộng (plugin) cho khách hoặc đối tác tự viết   | Mâu thuẫn với "không giao mã, làm rối mã". Khi khách đã dựa vào thì **không được đổi nữa**.                                                                                    |

  📊 Mã hiện có **0** điểm mở rộng thiết kế cho mục đích này.
- **K-50 · Ví dụ nhỏ nhất đã không làm được: hai khách dùng cùng chức năng, khách B chỉ muốn thêm một ô vào
  biểu mẫu.** Ở mọi module, danh sách trường là **viết cứng cho mọi công ty**: thêm một ô cho khách B là sửa mã và
  sửa DB, và khách A cũng nhận ô đó. Ngay phần trông "cấu hình được" nhất — các bảng từ điển, dữ liệu lưu dạng JSON
  theo công ty — thì **danh sách cột vẫn khai trong mã**, và logic nghiệp vụ đọc ô **theo vị trí cột** (cột thứ
  mấy), nên khách bỏ hay đổi thứ tự một cột là gãy.
  📊 **66** bảng từ điển khai cột cứng trong mã, **0** chỗ phân biệt theo công ty; ~**243** chỗ đọc ô theo vị trí
  cột; **0** bảng khai báo trường theo công ty trong toàn bộ **104** bảng.
- **K-51 · Ví dụ thứ hai: quy trình y hệt nhau, công ty X chỉ thêm một bước duyệt.** Ở mọi module, các bước duyệt
  nằm cố định ở **hai tầng**: danh sách trạng thái trong cấu trúc DB, và ai duyệt bước nào trong mã. Thêm một bước
  cho công ty X là chuyển đổi DB cho **mọi** khách, cộng "rẽ nhánh theo tên khách" trong mã, sửa màn, nhãn, thông
  báo, hạn xử lý.

  | Module                     | Các bước (cố định trong DB)                                     | Ai duyệt (viết cứng trong mã)                                           |
  | -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
  | Tiếp nhận nhân sự mới      | Mời → Xem xét → **Duyệt 1 → Duyệt 2** → Đã duyệt → IT cấp → Xong | TP Nhân sự → CEO; vị trí trưởng phòng: CEO → Chủ tịch                    |
  | Sửa hồ sơ nhân sự          | **Quản lý → Nhân viên NS → Trưởng NS** → Lên lịch → Áp dụng     | Tên từng bước duyệt nằm ngay trong cấu trúc DB                           |
  | Nghỉ phép                  | Chờ → Duyệt / Từ chối / Rút (lưu bước n/N)                      | ≤ **3** ngày: 1 cấp; dài hơn: 2 cấp; CEO luôn 1 cấp                      |
  | Đơn hàng                   | Nháp → Chờ → Duyệt / Trả về                                     | 1 bước                                                                  |
  | Giải ngân ngân sách        | Nháp → Gửi → Duyệt                                              | 1 bước                                                                  |
  | Từ điển (66 bảng)          | Khoá → Đang sửa → Chờ duyệt → Trả về                            | Chuỗi duyệt tính trong mã                                               |
  | Kế hoạch năm, phân bổ      | Nháp → Gửi → Xác nhận / Trả về; ban quản trị: Nháp → Gửi → Duyệt | Theo cây tổ chức                                                        |
  | Phiên kế hoạch tháng       | Đóng → Đang sửa → Chờ → Duyệt / Trả về                          | Theo chuỗi vị trí                                                       |
  | Khởi tạo công ty           | Đề xuất → Duyệt cơ cấu → IT xong → Chạy                         | Platform IT ↔ Chủ tịch                                                  |

  📊 **38** luồng trạng thái cố định trong cấu trúc DB; ít nhất **8** hàm tính chuỗi duyệt riêng, mỗi module một kiểu;
  **0** chỗ khai báo quy trình theo công ty.
- **K-52 · Ví dụ thứ ba: hai công ty có số cấp tổ chức khác nhau.** Hệ thống dựng sẵn đúng một hình cây:
  **Chủ tịch → công ty → phòng ban → trưởng nhóm → nhân viên**.

  | Công ty                   | Cây tổ chức thật                                                        | Hệ thống hiện tại                                                                                                                                  |
  | ------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Nhỏ                       | Công ty → phòng → nhân viên (không có trưởng nhóm)                       | Chuỗi duyệt bỏ qua được ghế trống nên chạy **một phần**; nhưng màn, nhãn, cột "Trưởng nhóm" và bước giao chỉ tiêu cho nhóm vẫn hiện (**50** tệp)           |
  | Giống công ty mình        | Công ty → phòng → trưởng nhóm → nhân viên                                | ✅ Đúng khuôn                                                                                                                                       |
  | Tập đoàn                  | Tổng công ty → vùng → công ty con → khối/phòng → nhóm → nhân viên        | ❌ Không có chỗ đặt "vùng"; công ty không có công ty mẹ; phòng không có phòng con                                                                  |

  Thêm một cấp không phải thêm một dòng dữ liệu, mà là sửa cấu trúc DB, hàm tính cấp trên – cấp dưới, phạm vi dữ
  liệu ai thấy gì, chuỗi duyệt, giao và cộng dồn chỉ tiêu, và mọi màn có cột theo cấp — cho **mọi** khách.
  📊 Bảng công ty và bảng phòng ban đều có **0** cột "đơn vị cha" ⇒ tối đa **2** tầng đơn vị. **5** vai nghiệp vụ cố
  định trong cấu trúc DB, **7** bậc vị trí cố định trong mã; chuỗi cấp trên viết cứng Nhân viên → Trưởng nhóm →
  Trưởng đơn vị → CEO → Chủ tịch. Tên vai nằm trong mã: CEO **72** tệp · Trưởng đơn vị **54** · Nhân viên **48** ·
  Trưởng nhóm **40**; chữ "Trưởng nhóm" hiện trên màn ở **50** tệp.
- **K-53 · Danh mục cố định cũng vậy.** Ví dụ loại nghỉ phép chỉ có đúng **4** loại (phép năm, ốm, không lương, việc
  riêng), nằm trong cấu trúc DB. Công ty muốn thêm "nghỉ thai sản" hay "nghỉ cưới" là một lần chuyển đổi DB cho
  **mọi** khách.
  📊 **59** danh sách giá trị cố định trong cấu trúc DB.
- **K-54 · Có một chỗ đã đi đúng hướng — và nó cho thấy phần còn thiếu.** Đơn nghỉ phép lưu "đang ở bước n trên N"
  thay vì tên bước cố định — đúng cách ở tầng dữ liệu. Nhưng **luật** số cấp duyệt (≤ 3 ngày thì 1 cấp) vẫn viết
  cứng, giống nhau cho mọi công ty.
  📊 **1/9** module trong bảng trên lưu bước duyệt dạng "n trên N".
- **K-55 · Muốn làm được ba ví dụ trên cho từng khách, phải xây ba tính năng nền tảng rồi chuyển từng module
  sang.** ① **Trường dữ liệu theo khách**: khai báo trường theo công ty, biểu mẫu và kiểm tra dữ liệu tự sinh, trường
  mới hiện được ở danh sách, tìm kiếm, báo cáo, xuất Excel. ② **Bộ máy quy trình duyệt theo khách**: chuỗi bước khai
  trong DB theo công ty và loại hồ sơ, hồ sơ lưu "bước n trên N", màn và thông báo đọc theo khai báo, hồ sơ đang dở
  chạy tiếp theo quy trình cũ khi quy trình đổi. ③ **Cây đơn vị do khách khai**: số cấp, tên cấp, đơn vị cha –
  con tuỳ khách; cấp trên, phạm vi dữ liệu, chuỗi duyệt và cộng dồn chỉ tiêu đều đọc từ cây. Đây không phải chỉnh vài form — mà là làm lại tầng dưới của **mọi**
  module.
  📊 **25** nhóm tính năng · **38** luồng trạng thái · ít nhất **8** cách tính chuỗi duyệt phải gom về một bộ máy ·
  ~**243** chỗ đọc theo vị trí cột phải đổi sang đọc theo tên trường · **5** vai và **2** tầng đơn vị cố định phải
  thành cây do khách khai.
- **K-56 · Hệ thống gắn cứng với một công ty ở hàng trăm chỗ.**
  📊 Trên **1.148** tệp mã: **45** tệp chứa tên công ty · **73** tệp chứa cây thư mục Google Drive của công ty ·
  **119** tệp gọi thẳng tên vai (Chủ tịch, CEO, Trưởng bộ phận…), riêng "Chủ tịch" **41** tệp · **~455** tệp
  giao diện viết thẳng tiếng Việt, **0** bộ đa ngôn ngữ · **59** danh sách giá trị cố định nằm trong cấu trúc
  DB — thêm một giá trị cho một khách là một lần chuyển đổi DB cho **mọi** khách.
- **K-57 · Luật của một công ty đã thành luật của cả hệ thống.** Ví dụ _"một người chỉ giữ đúng một vị trí"_ —
  đúng ở công ty mình, nhưng kiêm nhiệm rất phổ biến ở doanh nghiệp Việt Nam. Luật này nằm sâu trong cách
  đọc dữ liệu ở khắp nơi, không phải một dòng cấu hình.
  📊 **~1.920** quyết định — phần lớn là luật của **1** công ty, chưa tách cái nào là luật chung, cái nào là
  luật riêng.
- **K-58 · Chỉ đăng nhập bằng Google, chỉ lưu tệp lên Google Drive.** Khách dùng Microsoft 365 (rất phổ biến)
  không đăng nhập được, không lưu tệp được.
  📊 Đăng nhập: **1/3** kiểu phổ biến (thiếu Microsoft, tài khoản–mật khẩu). Lưu tệp: **1/4** nơi phổ biến
  (thiếu SharePoint, ổ đĩa máy chủ, lưu trữ đám mây khác).
- **K-59 · Không thể làm khuôn chung đúng khi mới có một khách.** Nghề phần mềm có quy tắc "ba lần": khuôn
  chung đúng chỉ hiện ra sau khi thấy **ít nhất ba** trường hợp khác nhau. Làm khuôn từ một trường hợp là
  **đoán** — đoán sai còn tệ hơn không làm, vì phải phá khuôn cũ **và** chuyển dữ liệu (Phần 1).
  📊 Có **1/3** trường hợp cần thiết.
- **K-60 · Mô hình đã đổi qua đổi lại ngay trong một công ty.**
  📊 Quan hệ giữa các tầng công việc đổi qua **4** quyết định rồi quay về hướng ban đầu; nhóm tính năng từ
  điển chiếm **2/3** số bộ kiểm thử bị xoá trong 30 ngày.
- **K-61 · "Tính năng do file cấu hình quyết định" vẫn là công tắc bật/tắt, chỉ đổi tên.** Mỗi mục cấu hình
  làm hệ thống chạy khác đi là một nhánh trong mã phải kiểm thử.
  📊 10 mục bật/tắt = **1.024** tổ hợp; 20 mục = **hơn 1 triệu**. Chỉ **3** luồng duyệt hiện có đã ra **~157.000**
  tổ hợp trạng thái khi kiểm vét cạn.
- **K-62 · Tính năng phụ thuộc lẫn nhau.** Bật A mà tắt B thì sao? Cấu hình phải tự kiểm tổ hợp hợp lệ, nếu
  không khách cấu hình ra một hệ thống chạy được nhưng **sai**.
  📊 **0** cơ chế kiểm tra — file cấu hình theo khách **chưa tồn tại**, phải thiết kế từ đầu.
- **K-63 · Mỗi chỗ cho phép "sửa riêng" là một lời hứa tương thích vĩnh viễn.** Càng nhiều chỗ cắm, lõi càng
  khó đổi — sản phẩm chậm dần theo số khách.
  📊 Ví dụ: 10 khách × 5 chỗ sửa riêng = **50** điểm phải kiểm lại mỗi lần đổi lõi.
- **K-64 · Sửa riêng ở bản 1.5, khách nâng lên 2.0** — phần sửa riêng còn chạy không? Ai kiểm?
  📊 Từ 1.5 lên 2.0 với nhịp hiện tại có thể kéo theo hàng chục lần đổi cấu trúc dữ liệu (K-06).
- **K-65 · Cây tổ chức và chuỗi duyệt cố định.** Khách khác cần duyệt theo hạn mức tiền, duyệt song song,
  vượt cấp, theo dự án, công ty mẹ–con, nhiều chi nhánh.
  📊 Lõi tổ chức và duyệt gồm **14** tệp, cho **7** vai cố định.
- **K-66 · Công thức, mẫu biểu, cách tính chỉ tiêu, phân bổ, chốt kỳ** đều theo cách công ty mình làm.
  📊 **0** công thức được tách ra thành cấu hình.
- **K-67 · Tắt một tính năng khi đã có dữ liệu** — dữ liệu đó đi đâu? Bật lại thì sao?
  📊 **Chưa có số**.
- **K-68 · Chưa có quy tắc kỹ thuật phân định "cái gì cấu hình được".** Phải phân biệt khác nhau ở **dữ liệu**
  (dễ cấu hình) hay ở **luật xử lý** (khó); sai cấu hình thì chỉ xấu màn hay hỏng dữ liệu; ai cấu hình — kỹ
  sư mình hay quản trị viên của khách.
  📊 **0** mục trong danh sách "cấu hình được"; dữ liệu từ **1** khách.
- **K-69 · Tính năng làm riêng cho khách A có cho khách B dùng?** Có ⇒ phải làm tổng quát hơn (tốn thêm);
  không ⇒ thành mã thừa với mọi khách khác nhưng vẫn phải bảo trì.
  📊 **Chưa có số** — chưa có quy tắc.
- **K-70 · Tích hợp với phần mềm khách đang dùng:** kế toán, hoá đơn điện tử, ngân hàng, liên thông dữ liệu
  ngành dược, chấm công. Mỗi tích hợp là một dự án nhỏ; bên kia đổi là mình phải sửa theo.
  📊 Tích hợp hiện có: Google (đăng nhập, Drive) và gửi thư. Kế toán / hoá đơn điện tử / ngân hàng: **0**.
- **K-71 · Nhập dữ liệu ban đầu** từ Excel, phần mềm cũ — thường là phần tốn công nhất của mọi dự án ERP, và
  lần nào cũng khác.
  📊 Chỉ để nhập dữ liệu cho **chính công ty mình** đã phải viết **11** lệnh riêng.
- **K-72 · Phạm vi còn phải xây thêm.** Khách nghe "ERP" sẽ so với bộ ứng dụng của Odoo, SAP, MISA. Mỗi ô
  "chưa có" dưới đây là một khối việc phát triển + kiểm thử + bảo trì.
  📊 Trên **65** phân hệ thường gặp: **10** đã có · **9** có một phần · **46** chưa có. Kho ứng dụng của Odoo có
  **hơn 80.000** module (kể cả của bên thứ ba), trong đó có cả phân hệ **đặt cơm** chính thức.

  | Phòng ban                | ✅ Đã có                                                                                                                                          | 🟡 Một phần                                                                 | ❌ Chưa có                                                                                                                                                    |
  | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Ban điều hành            | Hoạch định chiến lược & BSC · Kế hoạch năm, phân bổ chỉ tiêu · Nhiệm vụ tháng, lịch tuần · Họp · Bảng điều khiển · Luồng duyệt, nhật ký thao tác | Ngân sách (mới theo dõi trong hoạch định)                                   | Quản lý rủi ro, kiểm soát nội bộ                                                                                                                              |
  | Tài chính – kế toán      | —                                                                                                                                                 | —                                                                           | Kế toán tổng hợp, báo cáo tài chính · Công nợ phải thu/phải trả · Hoá đơn điện tử · Chi phí, tạm ứng · Ngân hàng, đối soát · Tài sản cố định · Giá thành · Thuế |
  | Kinh doanh               | —                                                                                                                                                 | Khách hàng, liên hệ · Đơn hàng · Bác sĩ, cơ sở y tế                         | Cơ hội, phễu bán hàng · Báo giá, bảng giá · Hợp đồng · Khuyến mãi, chiết khấu · Bán lẻ tại quầy (POS) · Thương mại điện tử                                   |
  | Marketing                | —                                                                                                                                                 | —                                                                           | Email, SMS · Sự kiện, hội thảo · Khảo sát · Mạng xã hội · Tự động hoá marketing · Ngân sách & chương trình marketing                                         |
  | Chuỗi cung ứng           | Kho · Giao hàng                                                                                                                                   | —                                                                           | Mua hàng, nhà cung cấp · Xuất nhập khẩu · Dự báo nhu cầu, kế hoạch cung ứng                                                                                  |
  | Sản xuất – chất lượng    | —                                                                                                                                                 | —                                                                           | Sản xuất, định mức nguyên vật liệu · Kế hoạch sản xuất · QA/QC, phiếu kiểm nghiệm · Bảo trì thiết bị · Hồ sơ đăng ký thuốc, vòng đời sản phẩm                  |
  | Nhân sự                  | Hồ sơ nhân viên, cây tổ chức                                                                                                                      | Tuyển dụng (mới có hồ sơ người mới vào) · Đánh giá, KPI · Năng lực, đào tạo | Chấm công · Nghỉ phép · Lương, bảo hiểm, thuế TNCN · Đội xe, công tác phí · Đặt cơm · Phúc lợi                                                                |
  | Hành chính – IT          | Yêu cầu IT                                                                                                                                        | Lưu trữ tài liệu (qua Google Drive)                                         | Văn thư, công văn đến/đi · Ký số · Đặt phòng họp, tài sản dùng chung · Chat nội bộ, wiki                                                                      |
  | Dịch vụ – chăm sóc khách | —                                                                                                                                                 | Dự án, giao việc (qua nhiệm vụ tháng)                                       | Chăm sóc khách hàng, khiếu nại · Đặt lịch hẹn · Chấm công theo dự án                                                                                          |
  | Nền tảng                 | —                                                                                                                                                 | —                                                                           | Ứng dụng di động · API công khai cho tích hợp · Báo cáo tự thiết kế · Đa ngôn ngữ                                                                             |

  _Đánh giá nhanh theo tên các nhóm tính năng — người nắm nghiệp vụ nên rà lại cột "Một phần"._

---

## Phần 5 — Kiểm thử

- **K-73 · Gần như toàn bộ phần kiểm thử "để bán" đang là 0.** Bộ kiểm thử hiện tại khá lớn, nhưng dựng cho
  **một** khách, **một** phiên bản, **một** cỡ tải.
  📊 **46** loại thường cần: **4** có · **13** một phần · **29** chưa có. Toàn bộ **7** loại hiệu năng và **6/8** loại
  bảo mật đang là 0; **10** loại riêng của ERP: **0** loại có đủ.

Ba **tầng** kiểm thử thường nhắc tới: **unit** (từng hàm), **integration** (với DB thật), **E2E** (người dùng bấm
trên trình duyệt thật). Hệ thống có nhiều ở hai tầng dưới và **0** ở tầng trên cùng. Các loại còn lại — đồng thời,
mutation, tải, bảo mật… — là **cách** kiểm, chạy ở một hay nhiều tầng. Nhóm "Riêng của ERP" cuối bảng là những thứ
phần mềm giữ tiền, kho và hồ sơ của khách phải kiểm, mà ứng dụng thông thường không cần.

| Nhóm                 | Loại kiểm thử                      | Dùng để                                                       | Hiện có                                 |
| -------------------- | ---------------------------------- | ------------------------------------------------------------- | --------------------------------------- |
| Phát hành & nâng cấp | **Nâng cấp từ mọi bản cũ**         | chuyển đổi từ bản N lên bản mới trên dữ liệu giống thật       | ❌                                      |
|                      | Backup & khôi phục                 | khôi phục được thật                                           | ❌                                      |
|                      | Tổ hợp cấu hình                    | các file cấu hình khách hay dùng                              | ❌ (chưa có cấu hình)                   |
|                      | Cài đặt sạch                       | cài trên máy trắng theo đúng hướng dẫn                        | ❌                                      |
|                      | Bản đã làm rối mã                  | bản giao khách chạy giống bản đã kiểm thử                     | ❌                                      |
|                      | Kiểm tra nhanh sau khi cài (smoke) | hệ thống còn sống                                             | 🟡 2 tệp                                |
| Hiệu năng & độ bền   | **Load test**                      | tải bình thường                                               | ❌                                      |
|                      | **Stress test**                    | tăng tải tới khi gãy, biết ngưỡng                             | ❌                                      |
|                      | Spike test                         | tăng vọt đột ngột (sáng thứ Hai, chốt tháng)                  | ❌                                      |
|                      | Soak test                          | chạy liên tục nhiều ngày — rò bộ nhớ                          | ❌                                      |
|                      | Volume test                        | dữ liệu 60 triệu dòng                                         | ❌                                      |
|                      | Hồi quy hiệu năng                  | bản mới không chậm hơn bản cũ                                 | ❌                                      |
|                      | Chaos — chịu lỗi                   | tắt DB giữa chừng, đầy ổ, mất mạng                            | ❌                                      |
| Bảo mật              | Kiểm thử xâm nhập (pentest)        | người ngoài tấn công thử                                      | ❌                                      |
|                      | DAST — tấn công thử khi đang chạy  | lỗi chỉ lộ khi chạy                                           | ❌                                      |
|                      | SAST — soi mã tĩnh                 | lỗ hổng trong mã                                              | ❌                                      |
|                      | SCA — thư viện có lỗ hổng          | ~900 thư viện bên ngoài                                       | ❌ (chưa tự động)                       |
|                      | Quét bí mật lọt vào mã             | mật khẩu, khoá                                                | ❌                                      |
|                      | Quét container                     | lỗ hổng trong hệ điều hành đóng kèm                           | ❌                                      |
|                      | Cách ly giữa các công ty           | A không thấy dữ liệu B                                        | 🟡 ~7 tệp                               |
|                      | Vượt quyền                         | gọi thẳng thao tác ghi khi không có quyền                     | 🟡 có chặn, chưa có bộ tấn công thử     |
| Chức năng            | **End-to-end (E2E)**               | người dùng bấm xuyên nhiều màn trên trình duyệt thật          | ❌ 0 kịch bản — mới có lệnh mở từng màn |
|                      | **Mutation test**                  | đo **chất lượng** bộ test: cố ý cài lỗi xem test có bắt được | ❌                                      |
|                      | Đo độ phủ (coverage)               | dòng mã nào chưa có test                                      | ❌ 0 công cụ                            |
|                      | Contract / API                     | giữ ổn định giao tiếp với phần mềm khác                       | ❌ (chưa có API công khai)              |
|                      | Tương thích trình duyệt, thiết bị  | Chrome, Edge, Safari, máy tính bảng, điện thoại               | ❌ 1 trình duyệt, 1 cỡ màn hẹp          |
|                      | Accessibility                      | dùng được bằng bàn phím, trình đọc màn hình                   | ❌                                      |
|                      | Trên bản sao dữ liệu thật          | lỗi chỉ có ở dữ liệu thật                                     | 🟡 4 tệp — chỉ dữ liệu của mình         |
|                      | Hồi quy giao diện (so ảnh)         | màn không bị vỡ                                               | 🟡 28 ảnh, có danh sách ảnh "nhiễu"     |
|                      | Property-based / fuzz              | sinh ngẫu nhiên đầu vào để tìm ca biên                        | 🟡 1 lần vét cạn luồng duyệt            |
|                      | Unit — kiểm từng hàm               | logic tính toán                                               | ✅ ~420 tệp                             |
|                      | Integration — với DB thật          | ghi/đọc DB đúng                                               | ✅ 40 tệp                               |
|                      | Luồng nghiệp vụ nhiều bước         | chuỗi thao tác xuyên nhiều bảng                               | ✅ 45 tệp                               |
|                      | Ma trận phân quyền                 | vai nào thấy màn nào                                          | ✅                                      |
| Riêng của ERP | **Đồng thời (concurrency)** | hai người duyệt cùng một hồ sơ; hai đơn cùng trừ một lô hàng | 🟡 ~4 tệp; **0** chỗ khoá dòng khi ghi |
|  | Tiền và số tổng | làm tròn, thuế VAT, tổng báo cáo = tổng chi tiết, đối soát | 🟡 có kiểm phép tính chỉ tiêu; chưa có tiền, thuế |
|  | Gửi lại hai lần (idempotency) | bấm hai lần, mạng chập chờn, cổng thanh toán báo lại | 🟡 vài chỗ có chặn, chưa có bộ kiểm riêng |
|  | Vết kiểm toán | nhật ký thao tác không ai sửa, xoá được | ❌ có bảng nhật ký, **0** cơ chế chống sửa |
|  | Ngày, giờ, lịch | múi giờ, ngày lễ, cuối tháng, chốt kỳ | 🟡 có sau sự cố hạn tính theo giờ quốc tế, mất 1 ngày |
|  | Định dạng kiểu Việt | số `1.234,5`, ngày `dd/mm`, tìm và sắp xếp chữ có dấu | 🟡 có máy canh sau **5** lần vấp |
|  | Tác vụ định kỳ | chạy đúng giờ, chạy lại không ghi đôi, bỏ lỡ một đêm | 🟡 lỗi khoá nhầm **140** dòng chỉ lộ khi chạy thật |
|  | Lùi bản khi nâng cấp hỏng | quay về bản cũ, dữ liệu không mất | ❌ **0/89** lần đổi cấu trúc có đường lùi |
|  | Tích hợp qua môi trường thử (sandbox) | cổng thanh toán, hoá đơn điện tử, ngân hàng | ❌ chưa có tích hợp loại này |
|  | Nhập dữ liệu ban đầu | số dòng, số tiền trước và sau khi nhập khớp nhau | ❌ |
| Con người            | Nghiệm thu với khách (UAT)         | khách xác nhận                                                | 🟡 chỉ khách nội bộ                     |
|                      | Khả năng sử dụng                   | người mới dùng được không                                     | ❌                                      |

- **K-74 · Kiểm thử nhân theo số tổ hợp đang bán.**
  📊 **72** tổ hợp (K-23). Giả sử **15 phút**/tổ hợp (gồm dựng DB) ⇒ **18 giờ máy** cho mỗi bản phát hành, chưa
  tính kiểm thử tải và nâng cấp.
- **K-75 · Mutation test rất tốn trên mã lớn.** Mỗi "lỗi cài thử" phải chạy lại phần kiểm thử liên quan.
  📊 Giả sử 1 lỗi cài thử / 10 dòng ⇒ ~**14.000** lần chạy ⇒ **hàng chục giờ máy** mỗi lượt.
- **K-76 · Kiểm thử chập chờn.** Lúc đạt lúc trượt dù mã không đổi ⇒ người ta quen bỏ qua cảnh báo.
  📊 Bộ so ảnh đã phải có danh sách ảnh nhiễu; chụp lại sau khi dựng lại DB thì **16/28** ảnh lệch dù không ai
  sửa giao diện.
- **K-77 · Bộ kiểm thử cũng phải bảo trì.** Yêu cầu đổi thì kiểm thử đổi theo.
  📊 **509** tệp kiểm thử; **37** tệp đã phải xoá vì tính năng bị dựng lại.
- **K-78 · Dữ liệu kiểm thử cho khách lớn.** Kiểm thử tải cần hàng chục triệu dòng giả nhưng **hợp lý về
  nghiệp vụ**.
  📊 Bộ dữ liệu mẫu hiện có là của **1** công ty, vài chục người.
- **K-79 · Hạ tầng kiểm thử tốn tài nguyên** — máy tạo tải, máy chứa dữ liệu lớn, môi trường nâng cấp từ mọi
  bản cũ, công cụ quét bảo mật, kiểm thử xâm nhập thuê ngoài.
  📊 **Chưa có số** — chưa ước lượng.
- **K-80 · Lỗi đồng thời không bao giờ lộ khi một người thử.** Ở khách có hàng trăm người dùng cùng lúc, hai
  người duyệt cùng một hồ sơ hay hai đơn cùng trừ một lô hàng là chuyện hằng ngày: duyệt hai lần, kho âm, số
  tiền cộng đôi. Lỗi kiểu này chạy đúng ở mọi lần thử đơn lẻ.
  📊 **0** chỗ khoá dòng khi ghi; **8** cột số phiên bản để phát hiện ghi đè; ~**4** tệp kiểm thử chạy song song;
  production hiện **15** người dùng.
- **K-81 · Tiền và nhật ký là hai thứ kiểm toán viên của khách xem đầu tiên.** Một ERP phải chứng minh được số
  tổng khớp chi tiết, và **mọi** thay đổi đều để lại dấu vết không ai xoá được — kể cả người quản trị DB của khách
  (Phần 1.2).
  📊 **0** phân hệ kế toán, thuế (K-72); có bảng nhật ký nhưng **0** cơ chế chống sửa ở tầng DB.
- **K-82 · Tích hợp bên ngoài chỉ kiểm được trên môi trường thử của bên kia, và môi trường thử khác môi trường
  thật.** Cổng thanh toán, hoá đơn điện tử, ngân hàng đều vậy: không ai cho kiểm bằng tiền thật, hoá đơn thật.
  📊 **0** tích hợp loại này; gửi thư hiện chỉ giả lập ở **2/3** môi trường.

---

## Phần 6 — Mã và cấu trúc dữ liệu hiện tại: phần lớn do AI viết, chưa ai review

- **K-83 · AI viết nhanh hơn người đọc.** Không ai review nổi một thay đổi 15.000 dòng.
  📊 **235/434** lần thay đổi mã do AI đứng tên, **338/434** (**78%**) có AI viết cùng. Trung vị **134** dòng mỗi
  lần, nhưng **10%** số lần lớn hơn **15.000 dòng**.
- **K-84 · Cấu trúc dữ liệu do AI sinh ra, rất lớn và vẫn phình nhanh.**
  📊 **104** bảng · ~**1.140** cột · **229** liên kết giữa các bảng · **59** danh sách giá trị cố định. Ngày
  09/09/2026 có **65** bảng; 13 ngày sau tạo thêm **43**, xoá **4** ⇒ **+60% trong 2 tuần**.
- **K-85 · Chưa ai review cấu trúc dữ liệu.** Không có người chuyên về DB; cấu trúc đổi 29 lần/6 ngày thì
  review xong đã cũ.
  📊 **0** người chuyên DB. Giả sử review kỹ **2 phút/cột** ⇒ ~**38 giờ** chỉ để đọc qua một lượt.
- **K-86 · Nhiều dữ liệu cố ý lưu dạng "túi tự do" (JSON)** cho chỗ nghiệp vụ còn mơ hồ — tức là cấu trúc dữ
  liệu **chưa chuẩn hoá**, chưa ai review xem có phù hợp không. Muốn chuẩn hoá sau này phải đọc và chuyển
  từng túi, mà nội dung túi mỗi khách mỗi khác.
  📊 **32** cột dạng JSON.
- **K-87 · Khối lượng mã vượt khả năng đọc của con người.**
  📊 ~**143.000** dòng mã, **1.148** tệp. Nhóm lớn nhất: Hoạch định **23.600** dòng · Thực thi **15.000** · Từ
  điển **13.000** · Nhân sự **10.200**; phần dùng chung **42.800** dòng.
- **K-88 · Tỉ lệ sửa lỗi cao.** Với khách ngoài, mỗi lần sửa là một bản vá phải đóng gói, kiểm thử, giao, cài.
  📊 **159/434** lần thay đổi mã (**37%**) là sửa lỗi.
- **K-89 · Yêu cầu chưa ổn định ngay cả với khách đầu tiên.**
  📊 **~1.920** quyết định ghi chép trong ~2 tháng (23/07 → 22/09/2026, ≈ **30 quyết định/ngày**); **≥20** quyết
  định bị đảo ngược; **37** bộ kiểm thử phải xoá vì tính năng bị dựng lại; **93** tệp mã bị xoá trong 14 ngày.
- **K-90 · Tốc độ hiện tại dựa vào việc được phép làm sai.** Cách làm hiện tại là _"dựng nhanh → dùng thử →
  góp ý → sửa"_, và **xoá sạch dữ liệu dựng lại** là chuyện thường. Với khách ngoài, cả hai điều này không còn.
  📊 **1** khách, **15** người dùng. Mỗi lượt kiểm tra đầy đủ xoá sạch DB **2 lần**.

---

## Phần 7 — Vận hành và bảo trì ở N máy chủ của N khách

- **K-91 · Cần ít nhất một DevOps và một chuyên gia bảo mật giàu kinh nghiệm — hiện chưa có ai.** Rất nhiều lỗ
  hổng vận hành và bảo mật của hệ thống thuộc loại **dễ phát hiện, dễ sửa** với người có nghề: chạy công cụ là
  thấy, sửa trong vài ngày. Cái khó không nằm ở từng lỗi mà ở chỗ **không có người làm** — và khi bán cho N khách
  thì mỗi việc phải làm lại ở **N** nơi, định kỳ, không bao giờ xong hẳn.
  📊 **0** DevOps, **0** chuyên gia bảo mật. Những việc người có nghề sẽ làm ngay, hiện đều đang dở:

  | Việc                                                                     | Hiện trạng                                                                     |
  | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
  | Sao lưu đủ loại dữ liệu, mã hoá, khôi phục thử, giảm mất dữ liệu xuống vài phút | Chỉ **1/4** loại (thiếu tệp, cấu hình, **khoá mã hoá**); không mã hoá; **0** lần khôi phục thử; mất tới **24 giờ** |
  | Gia cố máy chủ và cấu hình mạng của DB                                             | Chưa rà soát                                                                |
  | Quét thư viện có lỗ hổng, quét mật khẩu lọt vào mã                       | ~**900** thư viện, **0** lần quét                                                |
  | Quản lý mật khẩu, khoá                                                   | **24** biến trong tệp cấu hình chép tay                                          |
  | Chống dò mật khẩu, tiêu đề bảo mật trình duyệt                           | **0** trong ứng dụng                                                             |
  | Dây chuyền kiểm tra và đóng gói tự động (CI/CD), ký bộ cài               | **0**; đóng gói từ **1** máy cá nhân; bộ cài mang mã nguồn gốc                   |
  | Bộ cài đứng một mình cho khách (HTTPS, kiểm tra máy trước khi cài)       | **0**; **31** script gắn với hạ tầng riêng của mình                              |
  | Giám sát, cảnh báo, theo dõi tác vụ định kỳ                              | **0**; **5** tác vụ định kỳ chạy lặng lẽ                                          |
  | Gửi thư qua dịch vụ chuyên dụng, có thử lại                              | Giới hạn **2.000** thư/ngày/tài khoản; **0** cơ chế thử lại                      |
  | Chạy nhiều máy ứng dụng: tác vụ không chạy trùng, chia sẻ bộ nhớ đệm      | Chưa từng chạy quá **1** máy                                                     |
  | Lọc dữ liệu cá nhân khỏi nhật ký                                         | Chưa rà                                                                          |
  | Đường vào máy khách có kiểm soát, ghi lại mọi thao tác                   | **0** quy trình                                                                  |
  | Hệ thống tiếp nhận và theo dõi sự cố                                     | **0**                                                                            |

  Mỗi dòng trên, một người có nghề làm được — nhưng cộng lại là **việc toàn thời gian**, và nhân với số khách.

- **K-92 · Gỡ lỗi mù.** Khách báo "màn này sai số": mình không xem được dữ liệu (có dữ liệu cá nhân), mã đã
  làm rối (Phần 15), máy chủ là của khách.
  📊 **39** chỗ mã hoá dữ liệu cá nhân — càng không xem được khi gỡ lỗi.
- **K-93 · Một máy chủ, một DB.** Sập máy là sập hệ thống. Khách lớn đòi dự phòng — kiến trúc khác, tốn gấp
  nhiều lần.
  📊 **1** máy ứng dụng + **1** DB, **0** bản dự phòng.
- **K-94 · Cam kết thời gian hoạt động cho thứ mình không kiểm soát.** Máy, mạng của khách — nhưng khi sập,
  khách gọi mình.
  📊 Bên mình kiểm soát **1/3** tầng (ứng dụng; không phải máy chủ, không phải mạng).
- **K-95 · AI hoặc kỹ sư dùng AI trên máy chủ khách là rủi ro.** Hệ thống có lệnh **xoá sạch DB** dùng cho phát
  triển; dự án đã phải **cấm AI tự chạy** một lệnh như vậy vì nó phá dữ liệu của phiên làm việc khác.
  📊 Một lượt kiểm tra đầy đủ = **2** lần xoá sạch DB. Chạy nhầm trên máy khách = mất dữ liệu khách.

### 7.1. Giám sát, nhật ký, bộ nhớ đệm, hàng đợi

> 📊 **Hiện trạng:** nhật ký ghi ra tệp trên máy chủ; có gắn sẵn OpenTelemetry nhưng chưa có nơi nhận; **0**
> Redis · **0** hàng đợi · **0** Sentry · **0** Kibana/Grafana · **0** cảnh báo tự động. Bộ cài gồm **4** dịch vụ.

| Thành phần                                     | Cần khi                                                                                     | Cái giá                                                                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Prometheus + Grafana + cảnh báo                | CPU, RAM, ổ đĩa, DB chậm, tác vụ hỏng, backup hỏng                                          | phải có người trực nhận cảnh báo                                                                                                     |
| Sentry — bắt lỗi                               | biết lỗi trước khi khách gọi                                                                | bản tự cài khuyến nghị **16 GB RAM**; bản cloud thì dữ liệu lỗi rời máy khách; mã đã làm rối ⇒ phải tải bản đối chiếu từng phiên bản |
| Kibana (ELK) hoặc Loki + Grafana — tìm nhật ký | tìm nhật ký trên N máy chủ                                                                  | Elasticsearch rất ngốn RAM; Loki nhẹ hơn nhưng vẫn là thêm dịch vụ                                                                   |
| Hàng đợi (RabbitMQ, BullMQ…)                   | gửi thư/lưu tệp có thử lại; nhập dữ liệu lớn; báo cáo nặng chạy nền                         | thêm 1 dịch vụ; phải xử lý trùng, sai thứ tự, việc "chết"; phải viết lại phần đang chạy ngay sau khi lưu                              |
| Redis — bộ nhớ đệm, phiên, khoá                | khách lớn chạy >1 máy ứng dụng; giới hạn tần suất truy cập; tác vụ định kỳ không chạy trùng | thêm 1 dịch vụ phải cài, theo dõi, vá ở mỗi khách; dữ liệu đệm cũ ⇒ màn hiện số sai mà không báo lỗi                                  |
| OpenTelemetry + nơi nhận (Tempo, Jaeger…)      | lần theo một yêu cầu chậm qua nhiều tầng                                                    | cần máy chủ thu thập; dữ liệu theo dõi có thể chứa thông tin nghiệp vụ                                                                |

- **K-96 · Mỗi thành phần thêm vào nhân với số khách.**
  📊 Từ **4** lên **7–9** dịch vụ mỗi khách × N khách — mỗi dịch vụ phải cài, nâng cấp, vá, sao lưu, và **chiếm RAM
  trên máy của khách nhỏ** vốn chỉ muốn một máy rẻ.
- **K-97 · Đặt riêng từng khách hay gom về một chỗ?**

  |      | Riêng từng khách                                                                | Gom về hệ thống chung của mình                                                                                                                                       |
  | ---- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Được | dữ liệu không rời máy khách                                                     | một nơi xem mọi khách                                                                                                                                                |
  | Mất  | không ai xem (khách thường không có người); tốn tài nguyên; mình phải vào N nơi | nhật ký rời máy khách (có thể chứa dữ liệu cá nhân); máy khách phải cho kết nối ra ngoài — khách lớn thường cấm; một sự cố ở hệ thống chung lộ dữ liệu **mọi** khách |

  📊 **39** chỗ mã hoá dữ liệu cá nhân — dữ liệu đi qua hệ thống là nhạy cảm.
- **K-98 · Thêm hàng đợi, bộ nhớ đệm là đổi cách viết mã**, không chỉ là cài thêm phần mềm.
  📊 **47** tệp xử lý thao tác ghi phải xem lại.

### 7.2. Hỗ trợ kỹ thuật

- **K-99 · Hiểu biết về từng khách** (cấu hình, phần làm riêng, phiên bản, lịch sử yêu cầu, đầu mối) phải nằm
  ở đâu đó để người khác hỗ trợ được, không chỉ trong đầu một người.
  📊 **Chưa có số**.

---

## Phần 8 — Bốn phương án: phương án đang đề xuất so với A, B, C

Ngành phần mềm doanh nghiệp đã đi qua ba con đường để phục vụ nhiều khách bằng một đội ngũ. Mô hình đang đề xuất
ở đầu tài liệu là một tổ hợp mới, gọi là **phương án S**, nên cần đặt cạnh ba con đường đó.

| Tiêu chí                       | **S** — đang đề xuất                                                  | **A** — một bộ mã cho mọi khách                    | **B** — mỗi khách một bộ mã                                    | **C** — lõi chung + gói mở rộng riêng                                    |
| ------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Ví dụ trên thị trường          | —                                                                     | MISA AMIS, Base.vn, Salesforce                     | Đối tác Navision trước 2018, công ty làm phần mềm theo dự án   | Microsoft Business Central, SAP "clean core", Odoo kèm module riêng      |
| Khách nhận gì                  | Bộ mã chung + file cấu hình; sửa mã khi cấu hình không đủ             | Đúng sản phẩm; khác biệt chỉ qua cấu hình          | Bộ mã riêng, sửa theo ý khách                                  | Lõi chung không ai sửa + gói riêng cài thêm                              |
| Chiều khách được tới đâu       | Hứa rất nhiều — kể cả sửa lõi                                         | **Thấp** — phải từ chối nhiều yêu cầu              | **Cao nhất**                                                   | Cao, trong giới hạn các điểm mở rộng                                     |
| Chi phí phục vụ khách thứ N    | Tăng theo số phiên bản đang chạy ở khách                              | **Thấp**                                           | **Tăng tuyến tính** theo số khách                              | Thấp với lõi, tuyến tính với gói riêng                                   |
| Một lỗ hổng như 12/2025        | Vá mọi phiên bản khách đang dừng                                      | Vá **1** lần nếu mình vận hành                     | Vá **N** lần trên N bộ mã khác nhau                            | Vá lõi 1 lần + kiểm lại từng gói riêng                                   |
| Nâng cấp                       | Khách tự chọn ⇒ nhiều phiên bản song song                             | Mình nâng cho mọi khách cùng lúc                   | Mỗi lần là một dự án riêng — thường là **không nâng**          | Lõi nâng định kỳ; gói riêng phải theo kịp                                |
| Đầu tư trước                   | Như A (nền tảng cấu hình) **cộng** như B (hỗ trợ từng bản cài)        | **Rất lớn** — nền tảng                             | **Thấp**                                                       | **Lớn** — nền tảng + điểm mở rộng                                        |
| Dòng tiền                      | Chưa có mô hình                                                       | Thuê bao đều hằng năm                              | Theo dự án + phí bảo trì                                       | Thuê bao + dự án gói riêng                                               |
| Hệ thống hiện tại còn thiếu gì | Mọi thứ A và B thiếu                                                  | Ba tính năng nền tảng (K-55), vận hành tập trung  | Quy trình quản lý N bộ mã                                      | Ba tính năng nền tảng **và** điểm mở rộng có phiên bản (hiện **0**, K-49) |

- **K-100 · Phương án S dùng mã của A nhưng chịu chi phí của B — mà không chiều khách được như B.** "Một bộ mã,
  file cấu hình quyết định" là cách của A. Nhưng "cài ở máy khách, khách tự chọn có nâng cấp hay không" làm mỗi
  khách dừng ở một phiên bản: mỗi phiên bản còn chạy là một bộ mã phải vá, phải hỗ trợ, phải hiểu khi gỡ lỗi —
  tức là B. Khác B ở chỗ các bộ mã đó không sinh ra để chiều khách, mà do khách ngừng nâng cấp vào những lúc khác
  nhau.
  📊 Nhịp hiện tại **434** lần thay đổi mã trong ~2 tháng. Giả sử ra bản mỗi tháng, **10** khách dừng ở 10 bản
  khác nhau ⇒ **10** bộ mã phải vá. Sự cố 12/2025 đã buộc Next.js ra bản vá cho **7** dòng phiên bản.
- **K-101 · A đòi nói "không" — với khách Việt Nam đó là việc khó nhất.** Doanh nghiệp chọn một ERP làm riêng
  thay vì MISA hay SAP thường chính vì quy trình của họ không khớp phần mềm chuẩn. Mỗi lần nói "có" với một yêu
  cầu riêng khi chưa có điểm mở rộng là một bước trượt từ A sang B.
  📊 Ngay với **1** khách nội bộ: **~1.920** quyết định trong ~2 tháng, **≥20** quyết định bị đảo.
- **K-102 · B: AI làm rẻ việc tạo bộ mã, không làm rẻ việc giữ N bộ mã.** Mỗi bộ mã riêng phải được vá bảo mật,
  nâng nền tảng khi hết hỗ trợ, và có người hiểu nó khi khách gọi.
  📊 10 khách × ~**143.000** dòng = **1,43 triệu** dòng phải giữ. Next.js 15 hết hỗ trợ 21/10/2026, Node 20 hết
  30/04/2026 (Phụ lục C) ⇒ mỗi lần như vậy là **10** dự án nâng cấp.
- **K-103 · C là đường các hãng lớn đã chọn sau khi đi qua B — nhưng nó cần đúng những thứ hệ thống chưa có.**
  Microsoft bỏ cách sửa thẳng mã Navision cho từng khách để chuyển sang gói mở rộng trên Business Central; SAP gọi
  hướng này là giữ lõi sạch ("clean core").
  📊 **0** điểm mở rộng (K-49) · **0/3** tính năng nền tảng (K-55) · **1/3** số khách cần để vẽ đúng khuôn chung
  (K-59).
- **K-104 · Mỗi phương án là một kiểu công ty khác nhau — đổi giữa chừng là tái cơ cấu.**
  📊 Hiện **0/8** vai kỹ thuật có người riêng (Phần 14).

**Công ty phần mềm tổ chức thế nào theo từng phương án:**

| Phương án | Đội ngũ cốt lõi                                                                                                                                                                  | Ai quyết làm gì tiếp                                   | Ai làm việc với khách                                                                                       | Rủi ro tổ chức                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| A         | Nhóm sản phẩm (quản lý sản phẩm, phân tích nghiệp vụ) · nhóm nền tảng · nhóm theo module · kiểm thử tự động · vận hành trực 24/7 · bảo mật · hỗ trợ 3 tầng                      | Quản lý sản phẩm, theo nhu cầu của **số đông** khách   | Đội triển khai: cấu hình, nhập dữ liệu, đào tạo — **không sửa mã**; đông khách thì thêm đối tác triển khai   | Mất những khách có quy trình khác chuẩn                                                       |
| B         | Mỗi khách một nhóm dự án (quản lý dự án, phân tích nghiệp vụ, lập trình, kiểm thử) · người phụ trách khách · đội bảo trì theo hợp đồng từng khách · nhóm nhỏ giữ thư viện chung | Từng khách, cho bộ mã của họ                           | Chính nhóm dự án                                                                                            | Đội bảo trì phình theo số khách; người nghỉ việc mang theo hiểu biết về bộ mã của khách đó   |
| C         | Như A cho phần lõi · thêm nhóm (hoặc đối tác) làm gói mở rộng · kiến trúc sư giữ "hợp đồng" của các điểm mở rộng · khâu duyệt gói riêng trước khi cài                          | Lõi: quản lý sản phẩm. Gói riêng: khách đặt            | Đội triển khai + nhóm gói mở rộng                                                                           | Giữ kỷ luật "không ai sửa lõi cho một khách"                                                  |
| S         | Cần **cả** đội của A (nền tảng, cấu hình) **và** đội của B (hỗ trợ từng bản cài, từng phiên bản) · cộng đội vận hành từ xa cho N máy chủ không phải của mình                    | Chưa rõ — cấu hình chung hay yêu cầu của từng khách    | Chưa rõ — đội cấu hình hay đội sửa mã                                                                       | Gánh chi phí của cả A lẫn B                                                                   |

**Vì sao phải chọn ngay bây giờ:** chọn A hoặc C thì từ hôm nay mọi module mới phải viết trên ba tính năng nền
tảng (K-55) — mỗi module viết theo cách cũ là thêm một module phải làm lại. Chọn B thì không cần nền tảng, nhưng
phí bảo trì và đội bảo trì theo số khách phải có ngay trong báo giá đầu tiên.

---

## Phần 9 — Bảo mật

> Các việc bảo mật thường ngày (đóng cổng, quét thư viện, quản lý mật khẩu, chống dò mật khẩu, đường vào máy
> khách) đã gom vào K-91. Dưới đây chỉ còn những việc chuyên gia cũng **không** làm nhanh được.

- **K-105 · Cách ly dữ liệu giữa các công ty dựa vào việc mọi câu đọc dữ liệu được viết đúng.** Hệ thống chạy
  nhiều công ty trên một DB; phải chứng minh công ty A **không bao giờ** thấy dữ liệu công ty B.
  📊 Chỉ **36/104** bảng mang trực tiếp mã công ty; **68** bảng còn lại phải nối qua bảng khác — một câu đọc quên
  nối là lộ dữ liệu. Chỉ khoảng **7/509** tệp kiểm thử nhắc tới việc cách ly này.
- **K-106 · Mã AI viết chưa ai soi về bảo mật.** Kiểm thử xâm nhập và soi mã trên khối lượng này mất nhiều tuần,
  và phải lặp lại sau mỗi bản lớn — không phải chạy một công cụ là xong.
  📊 ~**143.000** dòng mã, **78%** lần thay đổi có AI viết cùng; **0** lần kiểm thử xâm nhập.
- **K-107 · Vá bảo mật cho mọi khách, mọi phiên bản** — xem K-19.
  📊 **7** dòng phiên bản Next.js cần bản vá riêng trong sự cố 12/2025.

---

## Phần 10 — Chuẩn bảo mật, tuân thủ và dữ liệu cá nhân: khách Việt Nam cần gì

Dùng nội bộ thì công ty tự chịu rủi ro của chính mình. Bán cho khách thì mình giữ — hoặc chạm vào — dữ liệu của
người khác: luật áp lên cả mình, và khách lớn sẽ hỏi "có chứng nhận gì?". Bảng dưới xếp theo mức cần thiết với
khách **Việt Nam**; các chuẩn chỉ cần khi có khách nước ngoài để ở dòng cuối.

| Mức                           | Chuẩn / luật                                                                                                                                    | Đòi hỏi chính                                                                                                                                                                                                                                       | 📊 Hiện có                                                                                    |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Bắt buộc theo luật**        | Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 (hiệu lực 01/01/2026) · Nghị định 356/2025 (thay Nghị định 13/2023) · Nghị định 330/2026 về xử phạt (từ 19/08/2026) | Xin đồng ý; cho người có dữ liệu xem, sửa, xoá, rút đồng ý; hồ sơ đánh giá tác động; hồ sơ chuyển dữ liệu ra nước ngoài; báo sự cố; người phụ trách bảo vệ dữ liệu. Phạt tới **5%** doanh thu năm trước (chuyển dữ liệu ra nước ngoài sai luật), tới **10 lần** khoản thu (mua bán dữ liệu) | **0** chức năng đồng ý, xem, xuất, xoá; mã hoá **4** trường của hồ sơ người mới                 |
| **Bắt buộc theo luật**        | Luật An ninh mạng 116/2025/QH15 (hiệu lực 01/07/2026; gộp Luật An toàn thông tin mạng 2015 và Luật An ninh mạng 2018)                          | Bảo vệ hệ thống thông tin theo cấp độ; lưu dữ liệu tại Việt Nam với một số loại doanh nghiệp — chi tiết chờ nghị định hướng dẫn (dự thảo 02/2026)                                                                                                    | **Chưa đánh giá**                                                                             |
| **Khách lớn sẽ hỏi**          | ISO/IEC 27001:2022                                                                                                                              | Chứng nhận cách **công ty mình** quản lý an toàn thông tin: **93** biện pháp kiểm soát, đánh giá giám sát mỗi năm, cấp lại sau **3** năm                                                                                                             | **0** chứng nhận. Công ty nhỏ: ~**20.000–23.000 USD**/3 năm phí đánh giá, chưa kể tư vấn và ~**550–600** giờ công/năm |
| **Nền tảng nên tự làm trước** | OWASP ASVS 5.0 (05/2025)                                                                                                                        | Bảng kiểm bảo mật ứng dụng miễn phí, ~**350** yêu cầu, **3** mức; mức 2 dành cho ứng dụng giữ dữ liệu nhạy cảm như ERP                                                                                                                               | **0** lần đối chiếu                                                                           |
| **Chỉ khi có khách nước ngoài** | SOC 2 Type II · SOX · GDPR                                                                                                                    | SOC 2: khách Mỹ hay hỏi, theo dõi vận hành thật 3–12 tháng. SOX: chỉ khi khách là công ty con của doanh nghiệp niêm yết ở Mỹ. GDPR: khi xử lý dữ liệu người ở châu Âu                                                                               | Không cần cho khách Việt                                                                      |

_Doanh nghiệp nhỏ và khởi nghiệp được ân hạn một số nghĩa vụ trong 5 năm (Điều 41 Nghị định 356, theo VCCI) —
cần luật sư xác nhận phần nào áp cho mình, phần nào cho khách. Các mục luật ở đây lấy từ bài phân tích của công ty
luật, kiểm toán (Phụ lục C), chưa đối chiếu văn bản gốc._

- **K-108 · Bán ERP thì mình thành bên xử lý dữ liệu cá nhân cho khách.** Hồ sơ nhân sự có CCCD, lương, tài
  khoản ngân hàng, ngày nghỉ ốm — dữ liệu sức khoẻ thuộc loại nhạy cảm. Mỗi lần mình hỗ trợ, gỡ lỗi, sao lưu hộ
  hay cho khách thuê máy là mình đang xử lý dữ liệu đó, nên mỗi khách cần một hợp đồng xử lý dữ liệu nói rõ trách
  nhiệm hai bên.
  📊 **0** mẫu hợp đồng xử lý dữ liệu; mức phạt ở bảng trên.
- **K-109 · Luật đòi "xoá dữ liệu của tôi", ERP lại phải giữ dữ liệu nhiều năm.** Người nghỉ việc có quyền yêu
  cầu xoá, nhưng lịch sử nhân sự và chứng từ kế toán phải giữ theo luật khác. Phải thiết kế "xoá" thành ẩn danh
  hoá sao cho báo cáo cũ và các liên kết không gãy.
  📊 **97** khoá ngoại trỏ tới bảng nhân viên; **0** chức năng ẩn danh hoá.
- **K-110 · Mã hoá dữ liệu cá nhân mới có ở một chỗ.**
  📊 Mã hoá **4** trường của hồ sơ người mới; điện thoại, địa chỉ, mã số thuế ở các bảng khác lưu dạng thường;
  bản sao lưu chỉ nén, không mã hoá (Phụ lục B).
- **K-111 · Tệp đang lưu trên Google Drive — dữ liệu có thể đã ra nước ngoài.** Chuyển dữ liệu cá nhân ra nước
  ngoài cần hồ sơ riêng và là hành vi có mức phạt cao nhất (5% doanh thu). Khách không muốn dữ liệu rời Việt Nam
  thì phải có nơi lưu tệp khác.
  📊 Lưu tệp: **1/4** nơi phổ biến (K-58); **73** tệp mã gắn với cây thư mục Drive.
- **K-112 · Chứng nhận ISO 27001 chấm cả cách vận hành — mà máy chủ nằm ở khách.** Chứng nhận cấp cho **công ty
  mình**. Cài ở máy khách thì phạm vi chỉ gồm phát triển và hỗ trợ; khách hỏi "hệ thống có đạt chuẩn không?" thì
  câu trả lời phụ thuộc vào cách khách tự vận hành. Khách thuê máy của mình thì phạm vi gồm cả vận hành — nặng hơn
  nhiều.
  📊 **93** biện pháp kiểm soát; hiện **0** người phụ trách bảo mật (K-91).
- **K-113 · Mọi chuẩn kiểm soát đều hỏi hai câu: người lập có tự duyệt được không, và nhật ký có ai sửa được
  không.** Đây là điều kiện của ISO 27001, SOC 2, SOX và cả kiểm toán báo cáo tài chính thông thường.
  📊 Có bảng nhật ký, nhưng **0** cơ chế chống sửa ở tầng DB, và khách có toàn quyền trên DB (Phần 1.2).

---

## Phần 11 — Cổng thanh toán và hoá đơn điện tử: khi khách bán hàng online qua ERP

Khách có bán hàng online sẽ muốn ERP nhận tiền qua VNPay, MoMo, ZaloPay, OnePay, VietQR… rồi xuất hoá đơn điện tử
ngay sau khi thu. Đây là chỗ ERP chạm vào **tiền thật** của khách và của người mua.

- **K-114 · Mỗi cổng một kiểu kết nối.** Cách ký dữ liệu, mã lỗi, luồng hoàn tiền, tệp đối soát đều khác nhau;
  mỗi cổng là một tích hợp phải viết, kiểm thử và bảo trì riêng.
  📊 **0/5** cổng phổ biến đã tích hợp.
- **K-115 · Cổng phải gọi ngược được vào máy chủ của khách.** Người mua trả xong, cổng gửi kết quả về một địa chỉ
  của khách ⇒ máy chủ khách phải mở ra internet, có tên miền, có HTTPS. Điều này va với "cài trong mạng nội bộ của
  khách" và với bảo mật (Phần 9). Với VNPay, địa chỉ nhận kết quả ở môi trường thật phải đăng ký với VNPay — mỗi
  khách một thủ tục.
  📊 **0** đường nhận thông báo từ bên ngoài (webhook) trong hệ thống.
- **K-116 · Cổng đổi cách kết nối là khách phải nâng cấp — không có quyền chọn.** Khách đang dừng ở bản cũ sẽ ngừng
  thu được tiền online. Mâu thuẫn trực tiếp với "khách tự chọn nâng cấp" (Phần 2).
  📊 Thêm lịch thay đổi của **5** bên ngoài, chồng lên lịch hết hỗ trợ của Next.js, Node.js, PostgreSQL (Phụ lục
  C).
- **K-117 · Tiền phải đúng tới từng đồng trong mọi tình huống lỗi.** Thông báo đến hai lần; thông báo đến trước khi
  người mua quay lại trang; giao dịch treo; hoàn tiền một phần; số tiền cổng báo khác số tiền đơn; đối soát cuối
  ngày với tệp của cổng.
  📊 **0** chỗ khoá dòng khi ghi (K-80); chưa có bộ kiểm "gửi lại hai lần" (Phần 5).
- **K-118 · Mỗi khách một hợp đồng với cổng, một bộ khoá bí mật.** Lưu ở đâu, ai đổi định kỳ, lộ thì thu hồi thế
  nào — nhân lên N khách, N cổng.
  📊 Hiện **24** biến môi trường cho **1** công ty, mỗi loại khoá **1** bộ.
- **K-119 · Chuẩn thẻ PCI DSS: phải chốt kiến trúc từ đầu.** Chuyển người mua sang trang thanh toán của cổng thì
  phạm vi chuẩn nhỏ; tự nhận số thẻ trên màn của mình thì phạm vi rất lớn, kèm đánh giá hằng năm.
  📊 **Chưa có** quyết định.
- **K-120 · Thu tiền kéo theo hoá đơn điện tử — và luật thuế không đợi khách chọn nâng cấp.** Nghị định 123/2020
  đã được sửa bằng Nghị định 70/2025 (ví dụ: từ 01/06/2025, hộ kinh doanh doanh thu từ 1 tỷ đồng/năm phải dùng hoá
  đơn từ máy tính tiền kết nối cơ quan thuế). Mỗi nhà cung cấp hoá đơn (MISA meInvoice, Viettel, VNPT, BKAV…) một
  kiểu kết nối; luật đổi là **mọi** khách phải nâng cấp đúng hạn.
  📊 **0** tích hợp hoá đơn điện tử (K-70).
- **K-121 · Bán online còn kéo theo sàn thương mại điện tử và tồn kho thời gian thực.** Đơn từ Shopee, Lazada,
  TikTok Shop phải về ERP; tồn kho phải trừ ngay để không bán vượt.
  📊 Thương mại điện tử: **chưa có** (K-72); **0** chỗ khoá dòng khi trừ kho (K-80).

---

## Phần 12 — Hiệu năng: khách 30 người và khách 50.000 người

> **Ví dụ:** khách 1 có **30** người dùng, ~**10.000** dòng dữ liệu. Khách 2 có **50.000** người dùng, thêm **1
> triệu dòng mỗi tháng** ⇒ **12 triệu dòng/năm**, **60 triệu dòng sau 5 năm**. Chênh nhau **~1.700 lần** về người
> dùng, **hàng nghìn lần** về dữ liệu. Cùng một bộ mã phải phục vụ được cả hai.

- **K-122 · Chưa từng đo với khách lớn.**
  📊 Đang chạy với **15** người dùng; **0** lần kiểm thử tải. Khách 50.000 người = **3.333 lần** quy mô hiện tại.
- **K-123 · Một kiến trúc không vừa cả hai cỡ.** Khách nhỏ cần một máy rẻ. Khách lớn cần nhiều máy ứng dụng,
  DB tách riêng có bản sao, bộ nhớ đệm, hàng đợi. Hai kiểu triển khai = hai thứ phải kiểm thử, cài đặt, hỗ
  trợ. Kiểu lớn cho khách nhỏ thì đắt; kiểu nhỏ cho khách lớn thì sập.
  📊 Hiện có **1** kiểu duy nhất: **1** máy ứng dụng + **1** DB trên cùng một máy.
- **K-124 · Cách đọc dữ liệu chưa được viết cho dữ liệu lớn.** Với 10.000 dòng không ai thấy; với 60 triệu dòng
  là hết bộ nhớ, màn quay mãi.
  📊 ~**1.050** chỗ đọc dữ liệu, chỉ ~**260** chỗ có giới hạn số dòng (≈ **75%** đọc không giới hạn); phân trang
  ngay trong DB chỉ ở **3** chỗ; vài chỗ còn tải hết về rồi mới cắt.
- **K-125 · Chỉ mục, chia vùng, dọn dữ liệu cũ** — những thứ giúp DB lớn vẫn nhanh.
  📊 **104** chỉ mục cho **104** bảng (trung bình 1/bảng); **0** bảng chia vùng theo thời gian; **0** chính sách dọn
  dữ liệu cũ.
- **K-126 · Dữ liệu dạng "túi tự do" khó tìm nhanh khi lớn** — lọc, sắp xếp, tổng hợp chậm hơn nhiều so với cột
  thường.
  📊 **32** cột dạng JSON (K-86).
- **K-127 · Tính toán theo cây tổ chức** (chuỗi duyệt, phạm vi dữ liệu) chạy mỗi khi mở màn.
  📊 Cây hiện tại **15** người; với cây 50.000 người: **chưa có số**.
- **K-128 · Báo cáo nặng chạy trên DB chính** làm chậm cả hệ thống lúc cuối tháng, cuối năm.
  📊 **Chưa có số**.
- **K-129 · Dữ liệu và tệp tích luỹ theo năm.**
  📊 Dữ liệu thật hiện có **< 1 năm**, toàn bộ chỉ **3,7 MB** / ~**6.760** dòng — chưa biết hệ thống chạy thế nào với
  dữ liệu 3–5 năm. Bậc thang xử lý: mục "Ba lo ngại kỹ thuật" cuối tài liệu.
- **K-130 · Nhiều khách nhỏ dùng chung một máy** ⇒ một khách nặng làm chậm khách khác.
  📊 **Chưa có số**.

---

## Phần 13 — Triển khai, cài đặt tại khách

- **K-131 · Ba kiểu cài = ba quy trình, ba mức trách nhiệm.**

  | Kiểu                        | Ai giữ quyền cao nhất trên máy | Bên mình vào máy để hỗ trợ bằng cách nào               |
  | --------------------------- | ------------------------------ | ------------------------------------------------------ |
  | Máy thuê của bên mình       | Mình                           | Trực tiếp                                              |
  | Máy của khách, bên mình cài | Khách                          | Khách phải cấp đường vào (VPN, SSH), ghi lại ai làm gì |
  | Máy của khách, khách tự cài | Khách                          | Có thể **không có** quyền gì                           |

  📊 Hướng dẫn cài hiện có: **1** bộ, gắn với hạ tầng của chính mình (K-91).
- **K-132 · Lịch triển khai do IT khách quyết.** Cần khung giờ bảo trì, phê duyệt thay đổi, kế hoạch quay lại
  khi hỏng — ở mỗi khách một quy định.
  📊 Hiện triển khai bằng **1** script do chính người phát triển chạy, bất cứ lúc nào.
- **K-133 · Mỗi khách cần thêm môi trường thử** để kiểm bản mới trước khi lên máy thật — gấp đôi tài nguyên.
  📊 Hiện **3** môi trường cho **1** khách.
- **K-134 · "Cần máy cỡ nào?"** — câu đầu tiên khách tự cấp máy sẽ hỏi.
  📊 **0** số liệu định cỡ.
- **K-135 · Đào tạo và tài liệu người dùng** cho từng vai, từng đợt, kể cả khi khách thay người.
  📊 **7** vai, mỗi vai một bộ màn và luồng khác nhau; **0** tài liệu cho người dùng cuối (toàn bộ ~25.000 dòng
  tài liệu hiện có là cho kỹ thuật).

---

## Phần 14 — Đội ngũ kỹ thuật, kể cả khi được dùng AI thoải mái

AI giúp **mỗi người làm nhanh hơn**, nhưng không thay được **người chịu trách nhiệm** ở từng khâu:

| Vai                         | Việc chính                                                                        | Hiện có |
| --------------------------- | --------------------------------------------------------------------------------- | ------- |
| Quản trị DB (DBA)           | review cấu trúc, viết và kiểm các bước chuyển đổi, tối ưu dữ liệu lớn (Phần 1, 12)| 0       |
| Kiểm thử viên (QA)          | kiểm độc lập, dựng và chạy 46 loại kiểm thử (Phần 3, 5)                           | 0       |
| Kiến trúc sư                | quyết khuôn chung, đánh giá ảnh hưởng mọi yêu cầu tới mọi khách (Phần 4)          | 0       |
| Người review mã             | đọc lại mã AI viết trước khi vào bản phát hành (Phần 6)                           | 0 riêng |
| Phân tích nghiệp vụ (BA)    | biến "chữ và ảnh" của khách thành đặc tả kiểm thử được (Phần 3)                   | 0 riêng |
| Vận hành (DevOps)           | dây chuyền đóng gói, bộ cài, triển khai, nâng cấp N khách (Phần 2, 13)            | 0 riêng |
| Hỗ trợ kỹ thuật, trực sự cố | nhận lỗi, gỡ lỗi trên máy khách, trực khi hệ thống sập (Phần 7)                   | 0       |
| Bảo mật                     | quét, vá, theo dõi lỗ hổng, kiểm thử xâm nhập (Phần 9)                            | 0       |

- **K-136 · Nhiều vai đang dồn vào một người.**
  📊 **8** vai, hiện **0** vai có người riêng.
- **K-137 · Người mới tiếp nhận chậm, kể cả có AI.** AI đọc được mã, nhưng **hiểu vì sao** một quyết định được
  đưa ra, chỗ nào không được đụng, vẫn cần thời gian và người kèm.
  📊 **~143.000** dòng mã · **1.148** tệp · **509** tệp kiểm thử · **104** bảng · **~1.920** quyết định trong **182** tệp ·
  **~25.000** dòng đặc tả; **≥20** quyết định đã bị đảo — người mới phải biết dòng nào còn hiệu lực.
- **K-138 · Một đội vừa phát triển, vừa triển khai, vừa hỗ trợ** ⇒ liên tục bị kéo ra chữa cháy ở khách, sản
  phẩm chậm lại đúng lúc cần đi nhanh nhất.
  📊 Với **1** khách, **37%** thay đổi mã đã là sửa lỗi.
- **K-139 · Chi phí và sự phụ thuộc vào công cụ AI.** Chi phí tăng theo số người và số khách; công cụ AI đổi
  phiên bản, đổi giá, đổi cách làm việc — quy trình đang chạy tốt hôm nay có thể phải chỉnh lại.
  📊 **Chưa có số** — chưa đo chi phí AI trên mỗi tính năng.

---

## Phần 15 — Đóng gói và làm rối mã

- **K-140 · Làm rối không bảo vệ được thật.** Phần mềm chạy trên máy khách, khách có quyền cao nhất ⇒ mọi thứ
  đều đọc được, chỉ tốn thêm công. Làm rối là **gờ giảm tốc, không phải ổ khoá**.
  📊 Khách giữ **100%** quyền quản trị máy chủ chạy phần mềm.
- **K-141 · Cấu trúc dữ liệu lộ trọn vẹn.** DB nằm trên máy khách ⇒ khách thấy toàn bộ cấu trúc và các bước
  chuyển đổi (phải giao dạng đọc được thì DB mới chạy). Cấu trúc dữ liệu + giao diện đủ để một đội giỏi dựng
  lại phần lớn nghiệp vụ.
  📊 **104** bảng, **59** danh sách giá trị, **89** tệp chuyển đổi dạng chữ — **không** làm rối được.
- **K-142 · Gỡ lỗi khó hơn hẳn.** Lỗi gửi về chỉ vị trí trong mã đã làm rối — vô nghĩa nếu không giữ bản đối
  chiếu cho **từng phiên bản đã giao**.
  📊 Số bản đối chiếu phải giữ = số phiên bản đã giao (tới **12** — K-20).
- **K-143 · Làm rối có thể làm hỏng hoặc làm chậm.** Next.js/React dựa vào tên hàm và cấu trúc mã khi đóng gói
  và khi chạy; làm rối mạnh tay dễ làm gãy. Phải kiểm thử lại toàn bộ trên bản đã làm rối mỗi lần phát hành.
  📊 **47** tệp xử lý thao tác ghi phía máy chủ phải kiểm lại.
- **K-144 · Chống cài chui.** Ngăn khách cài thêm cho công ty con, dùng tiếp sau khi hết hạn — cần khoá bản
  quyền, mà khoá chạy trên máy khách thì cũng gỡ được (K-140).
  📊 **0** cơ chế khoá bản quyền.

---

## Phần 16 — Công nghệ đang dùng có phù hợp không?

> **Nhận định chuyên môn:** ngôn ngữ lập trình **không phải** nút thắt chính. Chỉ khoảng **5** khó khăn trong tài
> liệu này (phần dưới đây) gắn trực tiếp với nền tảng; phần còn lại giữ nguyên dù viết bằng ngôn ngữ nào. Nhưng ở
> lại hay chuyển đi đều có giá.

### 16.1. Ở lại Node.js + Next.js + PostgreSQL

- **K-145 · Next.js đổi rất nhanh.**
  📊 Mỗi năm một bản lớn (13: 2022 · 14: 2023 · 15: 2024 · 16: 2025), mỗi bản chỉ được vá ~**2 năm**; tài liệu dự
  án phải cảnh báo riêng cho AI: _"đây không phải Next.js bạn từng biết"_.
- **K-146 · Giao diện và xử lý dính vào nhau.** Cách viết hiện tại (thao tác ghi gắn thẳng vào màn hình) tiện
  cho một ứng dụng, nhưng không có lớp giao tiếp riêng (API) cho tích hợp, ứng dụng di động, hay khách tự làm
  báo cáo.
  📊 **47** tệp thao tác ghi gắn trực tiếp vào màn hình; API công khai: **0**.
- **K-147 · Node.js xử lý trên một luồng.** Một phép tính nặng (phân bổ chỉ tiêu cả công ty, báo cáo lớn) làm
  chậm mọi người dùng khác trên cùng tiến trình.
  📊 **Chưa có số** — chưa đo các phép tính nặng nhất.
- **K-148 · IT của khách lớn quen Java, .NET, Python.**
  📊 SAP: ABAP/Java · Microsoft Dynamics: .NET · Odoo, ERPNext: Python. ERP viết bằng Next.js: hiếm.

### 16.2. Chuyển sang Python / Java / Go

- **K-149 · Viết lại = làm lại từ đầu, trong lúc không có tính năng mới.** AI dịch mã nhanh, nhưng phần tốn là
  **chứng minh bản mới chạy giống hệt bản cũ**.
  📊 **~143.000** dòng mã + **509** tệp kiểm thử + **~1.920** quyết định nghiệp vụ phải được tái hiện đúng.

  | Lựa chọn                 | Được                                                                       | Mất                                                                                      |
  | ------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
  | Python (Django, FastAPI) | Odoo, ERPNext dùng; nhiều thư viện nghiệp vụ, báo cáo; dễ tuyển            | chậm hơn ở tính toán nặng; vẫn cần giao diện riêng (React) ⇒ hai ngôn ngữ                 |
  | Java (Spring)            | chuẩn doanh nghiệp: giao dịch, xử lý lô, phân quyền; IT khách lớn tin dùng | nặng, phát triển chậm hơn; vẫn cần giao diện riêng                                        |
  | .NET (C#)                | như Java; hợp với khách dùng hệ sinh thái Microsoft                        | như Java                                                                                 |
  | Go                       | nhanh, gọn, triển khai dễ                                                  | ít thư viện cho nghiệp vụ ERP (báo cáo, biểu mẫu, truy cập DB); ít người làm ERP bằng Go |

---

## Phần 17 — Thị trường, giá, hợp đồng (tóm tắt)

| Mã    | Khó khăn                                                                                                                                                                                                                                                    | 📊 Số liệu                                                                  |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| K-150 | **Hợp đồng phải ghi được những thứ kỹ thuật chưa có**: tiêu chí nghiệm thu, cách phân định lỗi / yêu cầu mới, thời gian xử lý sự cố, số phiên bản được hỗ trợ, ai chịu trách nhiệm máy chủ – DB – backup, quyền vào máy khách, bàn giao dữ liệu khi chấm dứt | **0** mẫu hợp đồng; **0/7** điều khoản kỹ thuật kể bên có quy trình đứng sau |
| K-151 | **Báo giá** — viết mã chỉ là 1/12 bước (Phần 3); không biết công của cả chuỗi thì báo giá dễ lỗ                                                                                                                                                              | **0** dữ liệu về công triển khai một khách                                  |
| K-152 | **Dự án ERP thường vượt dự tính** — kể cả với nhà cung cấp có kinh nghiệm                                                                                                                                                                                   | **~57%** vượt ngân sách, **57–65%** vượt thời gian (Panorama, 2015–2016)    |
| K-153 | **Giá theo cỡ khách** — phục vụ khách 50.000 người tốn gấp hàng trăm lần khách 30 người (Phần 12)                                                                                                                                                            | **0** mô hình chi phí theo cỡ khách                                         |
| K-154 | **Giá cố định hay theo công** — cố định thì mình gánh rủi ro yêu cầu mơ hồ (Phần 3.3); theo công thì khách lo không kiểm soát được                                                                                                                           | **Chưa có số**                                                              |
| K-155 | **Tiền gắn với nghiệm thu** — khách chậm ký là chậm thu tiền, đội vẫn phải trả lương                                                                                                                                                                        | **Chưa có số**                                                              |
| K-156 | **Sản phẩm hay dịch vụ?** — tuỳ biến nhiều như làm dự án nhưng muốn nâng cấp đồng loạt như bán sản phẩm: vị trí khó có lãi nhất                                                                                                                             | **Chưa có số** — chưa có mô hình tài chính                                  |
| K-157 | **Một khách không phải là thị trường** — chưa có khách thứ hai để biết hệ thống hợp với ai                                                                                                                                                                  | **1** khách tham chiếu, **15** người dùng                                   |
| K-158 | **Chưa chứng minh được hiệu quả** — tiết kiệm bao nhiêu giờ, giảm bao nhiêu sai sót                                                                                                                                                                         | **0** chỉ số hiệu quả được đo                                               |
| K-159 | **Đối thủ có hàng chục năm, đối tác triển khai, tài liệu, cộng đồng**                                                                                                                                                                                       | SAP **1972** · MISA **1994** · Odoo **2005** · hệ thống này **07/2026**      |

---

## Câu hỏi kỹ thuật cần trả lời trước khi đi tiếp

1. Nâng cấp hỏng ở máy khách, dữ liệu mất, khách không có backup — kỹ thuật xử lý thế nào? (Phần 1)
2. Khách ở phiên bản cũ gặp lỗ hổng nghiêm trọng như 12/2025 — **ép** nâng cấp hay **vá ngược**? Hỗ trợ tối đa
   bao nhiêu phiên bản cùng lúc? (Phần 2)
3. Ai kiểm thử, ai nghiệm thu? "Nghiệm thu xong" nghĩa là gì — tiêu chí nào, viết ra trước khi làm hay không?
   (Phần 3)
4. Khách đòi sửa sâu vào lõi — chọn cách nào trong 4 cách ở K-49, và ai đánh giá ảnh hưởng tới khách khác?
   (Phần 4)
5. Trong 29 loại kiểm thử còn thiếu, loại nào phải có trước khách đầu tiên? (Phần 5)
6. Ai review cấu trúc dữ liệu và mã trước khi giao cho khách? (Phần 6)
7. Giám sát đặt riêng ở từng khách hay gom về một chỗ — và ai trực? (Phần 7)
8. Chọn phương án nào — A, B hay C — **trước** khi viết thêm module mới? Ai quyết lộ trình sản phẩm? (Phần 8)
9. Ai chịu trách nhiệm pháp lý về dữ liệu cá nhân của khách — hợp đồng xử lý dữ liệu, báo sự cố, dữ liệu trên
   Google Drive? (Phần 10)
10. Bán cho cỡ khách nào trước — nhỏ (một máy) hay lớn (cụm máy)? Không thể làm tốt cả hai ngay từ đầu. (Phần 12)
11. Ai giữ từng vai trong 8 vai của Phần 14?
12. Phân hệ nào trong 46 phân hệ chưa có (K-72) phải làm xong trước khi chào khách đầu tiên?

---

## Ba lo ngại kỹ thuật: bảo mật · dữ liệu nhiều · mỗi khách một bài toán

### Lo ngại 1 — "Dữ liệu nhiều sẽ làm chậm hệ thống, nên cắt dữ liệu từng năm"

**Hôm nay chưa có "dữ liệu nhiều".**

📊 Toàn bộ dữ liệu production (bản sao ngày 21/09/2026) là một tệp **3,7 MB**, khoảng **6.760 dòng** trên **48**
bảng có dữ liệu; bảng lớn nhất **5.313** dòng (từ điển), nhật ký thao tác **374** dòng. Một máy chủ PostgreSQL bình
thường chạy tốt bảng **hàng chục triệu dòng** nếu có chỉ mục và phân trang đúng. Khách 50.000 người thêm 1 triệu
dòng/tháng (60 triệu dòng sau 5 năm) lớn gấp **~9.000 lần** hôm nay — đó mới là lúc phải lo.

**Nếu hệ thống chậm, thủ phạm đầu tiên là cách viết mã, không phải lượng dữ liệu.**

📊 ~**75%** câu đọc dữ liệu không giới hạn số dòng; phân trang ngay trong DB chỉ ở **3** chỗ (K-124). Sửa chỗ này
rẻ hơn và hiệu quả hơn cắt dữ liệu.

**"Cắt dữ liệu từng năm" có tác dụng phụ:** báo cáo so sánh nhiều năm bị gãy · truy vết lô thuốc, hạn dùng khi
thu hồi bị đứt · lịch sử nhân sự, lịch sử duyệt bị mất · nhiều loại dữ liệu theo luật phải giữ nhiều năm · dữ
liệu năm nay còn tham chiếu sang năm trước.

**Có cả một bậc thang cách xử lý — dùng tới bậc nào là tuỳ cỡ khách:**

| Bậc | Cách làm                                                                                                                                  | Khi nào cần                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 0   | Không làm gì                                                                                                                              | Khách nhỏ, trong nhiều năm                  |
| 1   | Phân trang + chỉ mục đúng chỗ                                                                                                             | **Ngay bây giờ**, cho mọi khách             |
| 2   | Bảng tổng hợp sẵn cho báo cáo, bộ nhớ đệm                                                                                                 | Khách vừa, báo cáo bắt đầu chậm             |
| 3   | **Chia bảng theo năm ngay trong DB** — dữ liệu vẫn còn đủ, màn thường chỉ đọc năm hiện tại. Đây là phiên bản đúng của ý "cắt dữ liệu từng năm" | Khách lớn, hàng chục triệu dòng             |
| 4   | Chuyển các năm cũ sang kho lưu trữ chỉ-đọc, vẫn tra cứu được                                                                               | Khách rất lớn, nhiều năm dữ liệu            |
| 5   | Bản sao DB riêng cho báo cáo, nhiều máy ứng dụng, hàng đợi                                                                                | Khách hàng chục nghìn người dùng            |

📊 Hiện hệ thống ở bậc **0**; bậc 1 mới làm ở **3** chỗ; bậc 2–5: **0**.

### Lo ngại 2 — "Lo bảo mật nhưng chưa biết cần gì"

**Câu trả lời đầu tiên cho "cần gì" là: cần người.** Phần lớn việc bảo mật — đóng cổng, gia cố máy chủ, quét thư
viện có lỗ hổng, quản lý mật khẩu và khoá, mã hoá backup, chống dò mật khẩu — là việc thường ngày của một chuyên
gia bảo mật hoặc một DevOps có nghề: dùng công cụ là phát hiện ra, sửa nhanh. Hiện có **0** người như vậy (K-91).

**Những việc chuyên gia cũng không làm nhanh được**, vì chúng nằm trong cách hệ thống được xây và trong mô hình
"mỗi khách một bản cài":

| Vấn đề                                            | Vì sao khó                                                                                   | 📊 Số liệu                                                           |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Cách ly dữ liệu giữa các công ty                  | Nằm trong **từng** câu đọc dữ liệu ở khắp hệ thống, không phải một chỗ cấu hình               | **36/104** bảng mang trực tiếp mã công ty; ~**7** tệp kiểm thử        |
| Mã AI viết chưa ai soi về bảo mật                 | Kiểm thử xâm nhập và soi mã trên khối lượng này mất nhiều tuần, lặp lại sau mỗi bản lớn      | ~**143.000** dòng mã, **78%** lần thay đổi có AI viết cùng; **0** lần kiểm thử xâm nhập |
| Vá cho mọi khách, mọi phiên bản                   | Hệ quả của "khách tự chọn nâng cấp" (Phần 2)                                                 | **7** dòng phiên bản Next.js phải vá riêng trong sự cố 12/2025         |
| Máy chủ nằm ở khách, mình không kiểm soát         | Khách có toàn quyền; khách tự cài thì mình có thể không vào được                             | Bên mình kiểm soát **1/3** tầng                                       |

Chi tiết ở Phần 9.

### Lo ngại 3 — "Cài riêng cho từng khách thì mỗi khách một bài toán"

Đúng — và vì thế phải chia **cấp khách**, mỗi cấp một cách cài, một bộ kiểm thử, một mức chi phí vận hành:

| Cấp  | Quy mô người dùng | Cách cài                                          | Nỗi lo chính                                                        |
| ---- | ----------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| Nhỏ  | < 100             | 1 máy, ứng dụng và DB chung                       | Backup, cập nhật bảo mật. Dữ liệu **không** phải vấn đề             |
| Vừa  | 100 – 2.000       | DB tách sang máy riêng                            | Báo cáo chậm, giám sát, cửa sổ bảo trì                              |
| Lớn  | > 2.000           | Nhiều máy ứng dụng, bản sao DB, hàng đợi, bộ nhớ đệm | Toàn bộ Phần 12 (tải, dữ liệu lớn) và hạ tầng nhiều máy (K-91)     |

📊 Mốc chia cấp là **ước lượng** — phải kiểm thử tải mới chốt được, và hiện **0** lần kiểm thử tải. Hệ thống hiện chỉ
có **1** cách cài (cấp Nhỏ). Mỗi cấp thêm vào là thêm một bộ cài, một bộ kiểm thử và một nhân tố trong ma trận
phát hành (K-23).

---

## Phụ lục A — Từ điển nhanh

| Thuật ngữ                            | Nói nôm na                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Cơ sở dữ liệu (DB)**               | Kho chứa toàn bộ dữ liệu của khách: nhân sự, kế hoạch, kho, đơn hàng…                               |
| **Cấu trúc dữ liệu (schema)**        | "Bản vẽ kết cấu" của kho: có những ngăn nào (bảng), mỗi ngăn có những ô nào (cột)                   |
| **Chuyển đổi cấu trúc (migration)**  | Sửa bản vẽ kết cấu **khi kho đang đầy hàng** — phải dời hàng sang chỗ mới mà không làm mất món nào  |
| **Phiên bản**                        | Một lần "đóng gói" phần mềm để giao. Khách A dùng bản 1.2, khách B dùng bản 1.5                      |
| **Cấu hình**                         | Các lựa chọn khách tự đặt mà không cần sửa mã (bật tính năng nào, quy trình duyệt mấy cấp…)          |
| **Trừu tượng hoá, khuôn chung**      | Làm "khuôn" để nhiều khách dùng được, thay vì làm đúng cho một khách                                |
| **Kiểm thử (test)**                  | Chương trình tự động thử phần mềm xem có chạy đúng không                                            |
| **CI (dây chuyền kiểm tra tự động)** | Máy tự chạy toàn bộ kiểm thử **mỗi lần** có người sửa mã, không phụ thuộc vào trí nhớ của ai         |
| **Nghiệm thu (UAT)**                 | Khách thử và xác nhận "đã đúng như yêu cầu"                                                         |
| **Triển khai (deploy)**              | Cài phần mềm lên máy chủ thật của khách                                                             |
| **Container**                        | "Hộp đóng sẵn" chứa một phần mềm cùng mọi thứ nó cần, cài ở đâu cũng chạy giống nhau                |
| **Backup / khôi phục**               | Chụp lại toàn bộ dữ liệu / dựng lại từ bản chụp khi có sự cố                                         |
| **Giám sát, nhật ký (log)**          | Theo dõi máy chủ còn khoẻ không; ghi lại phần mềm đã làm gì để tra khi có lỗi                        |
| **Bộ nhớ đệm (cache, Redis)**        | Giữ sẵn kết quả hay dùng để trả lời nhanh, khỏi tính lại                                            |
| **Hàng đợi (queue)**                 | Xếp hàng các việc chạy nền (gửi thư, xuất báo cáo) để làm dần, hỏng thì làm lại                     |
| **Làm rối mã (obfuscate)**           | Biến mã thành dạng khó đọc trước khi giao, để khách khó sao chép                                    |
| **Lỗ hổng bảo mật (CVE)**            | Lỗi trong phần mềm mà kẻ xấu lợi dụng được; được chấm điểm 0–10                                     |
| **Kiểm thử tải**                     | Giả lập hàng nghìn người dùng cùng lúc để xem hệ thống chịu được tới đâu                            |

## Phụ lục B — Số liệu đo trên hệ thống (để người kỹ thuật kiểm chứng)

Đo trên kho mã nội bộ, nhánh phát triển, ngày 05/11/2026. Lịch sử git hiện có bắt đầu 09/09/2026 (lịch sử trước
đó đã được gộp vào bản nền).

| Số liệu                                                                         | Giá trị                                    | Cách đo / nguồn                                                             |
| ------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| Migration; `0059` (15/09) → `0088` (21/09)                                      | 89                                         | `drizzle/*.sql`, ngày thêm theo git                                         |
| `ALTER TABLE` / `RENAME` / `DROP COLUMN·TABLE` / migration có `down`            | 500 / 34 / 7 / 0                           | đếm trong `drizzle/*.sql`                                                   |
| Migration tên ngẫu nhiên                                                        | 72/89                                      | tên dạng `<tính_từ>_<danh_từ>` do drizzle-kit đặt                           |
| Ảnh chụp cấu trúc drizzle                                                       | 4,2 KB/bảng/migration                      | `CLAUDE.md` §0 (D1257)                                                      |
| Lỗi enum đổi tên `22P02` / drizzle-kit cần người trả lời (TTY)                  | 6 / 5 lần nhắc                             | `specs/decisions/`                                                          |
| 140 dòng khoá nhầm · bộ đếm mã lùi · số Việt vấp 5 lần · vỡ bố cục 4413→5200px  | —                                          | ghi chú dự án D1501–D1508 · D1394–D1395 · D1273/D1279/D1419 · D309          |
| Backup                                                                          | chỉ sao lưu DB, nén, giữ 14 ngày     | script sao lưu                                           |
| Bảng / cột / khoá ngoại / chỉ mục / danh sách giá trị cố định / cột JSON        | 104 / ~1.140 / 229 / 104 / 59 / 32         | `pgTable(` · khai báo cột · `references(` · `index(` · `pgEnum(` · `jsonb(` |
| Bảng lúc 09/09 → tạo thêm / xoá                                                 | 65 → +43 / −4                              | `CREATE TABLE` trong `0000_baseline.sql` và các migration sau               |
| Bảng mang trực tiếp mã công ty                                                  | 36/104                                     | cột `companyId` / `company_id`                                              |
| Lần thay đổi mã / ngày cao điểm / mang nhãn sửa lỗi                             | 434 / 140 (17/09) / 159                    | `git log`; nhãn `fix`, `sửa`                                                |
| Lần thay đổi mã AI đứng tên / AI đồng tác giả                                   | 235 / 338 trên 434                         | `git shortlog`; dòng `Co-Authored-By: Claude`                               |
| Dòng đổi mỗi lần: trung vị / phân vị 90                                         | 134 / 15.357                               | `git log --shortstat`                                                       |
| Tệp mã bị xoá trong lịch sử                                                     | 93                                         | `git log --diff-filter=D`                                                   |
| Dòng mã nguồn (không tính test) / số tệp                                        | ~142.700 / 1.148                           | `git ls-files '*.ts' '*.tsx'` trừ `*test*`                                  |
| Dòng mã theo nhóm: planning / execution / dictionary / people / lib             | 23.576 / 14.962 / 12.986 / 10.157 / 42.774 | `git ls-files` trừ test                                                     |
| Tệp test theo loại: unit `.ts` / `.tsx` / flow / integration / prod             | 325 / 95 / 45 / 40 / 4 (tổng 509)          | đuôi tệp                                                                    |
| E2E / mutation / coverage / tải / CI                                            | 0 / 0 / 0 / 0 / 0                          | không có tệp, thư viện hay thư mục `.github` tương ứng                      |
| Ảnh so giao diện / lệch sau khi dựng lại DB                                     | 28 / 16                                    | `CLAUDE.md` §0 (`pnpm ui:shots`)                                            |
| Quyết định / tệp quyết định / dòng                                              | ~1.920 / 182 / 3.134                       | `specs/decisions/`                                                          |
| Quyết định bị đảo/thu hẹp tường minh                                            | ≥20                                        | chuỗi "ĐẢO D…", "THU HẸP D…"                                                |
| Dòng quyết định ghi "tự chốt/giả định" · "đảo" · "hiểu nhầm/hiểu sai/đọc nhầm" | 86 · 57 · 18                               | `grep -ci` trong `specs/decisions/*.md` (đo thô)                            |
| Bộ kiểm thử bị xoá                                                              | 37 (2/3 ở cụm từ điển)                     | `CLAUDE.md` §3                                                              |
| Phiên bản bản vẽ màn hình (mockup HTML)                                         | ≥5: ceov5.8 · 5.10 · 6.3 · 6.15 · v8.15    | tên tệp trong lịch sử git; ngừng hẳn ở D1154                                |
| Tệp đặc tả có mục "Lệch mockup"                                                 | 35                                         | `git grep -l 'Lệch mockup' specs`                                           |
| Đợt yêu cầu nộp vào `raw-specs/` / thay đổi của bên kỹ thuật                    | 0 / 22 trên 22                             | `raw-specs/` trên mọi nhánh: chỉ `README.md` + khuôn `_khuon/`              |
| Màn gom câu hỏi `/thac-mac`                                                     | đã gỡ                                      | ghi chú dự án "Màn thắc mắc — ĐÃ BÃI BỎ"                                    |
| Kết luận nhầm "màn không có nút" do xem nhầm nhánh                              | 2 lần                                      | ghi chú dự án D1063–D1070                                                   |
| Tệp chứa tên công ty / cây thư mục Drive / tên vai                           | 45 / 73 / 119 (`'CHAIRMAN'`: 41)           | `git grep -l` trên `*.ts(x)`                                                |
| Tệp `.tsx` có chuỗi tiếng Việt / thư viện đa ngôn ngữ                           | ~455 / 0                                   | `git grep` ký tự có dấu; `package.json`                                     |
| Vét cạn ba luồng duyệt                                                          | ~157.000 tổ hợp                            | ghi chú dự án 22/09/2026                                                    |
| Thư viện trực tiếp / trong lockfile                                             | 51 / ~900                                  | `package.json`, `pnpm-lock.yaml`                                            |
| Biến môi trường                                                                 | 24                                         | `process.env.*` khác nhau                                                   |
| Lệnh `*:check` / dòng `CLAUDE.md` / dòng `COMMANDS.md`                          | 21 / 396 / 320                             | `package.json`                                                              |
| Vi phạm cũ được giữ trong máy canh                                              | 207 · 113 · 34 · 15 · 5                    | `scripts/dev/*-baseline.json` (comment · doc-link · title · merge · reason) |
| Tệp đặc tả / dòng                                                               | 268 / ~25.000                              | `specs/**/*.md`                                                             |
| Tác vụ định kỳ / script VM / script UAT / lệnh xử lý dữ liệu / lệnh `tenant:*`  | 5 / 31 / 19 / 26 / 10                      | `scripts/jobs`, `scripts/vm`, `package.json`                                |
| Tệp xử lý thao tác ghi phía máy chủ                                             | 47                                         | tệp có `'use server'`                                                       |
| Chỗ gọi mã hoá dữ liệu cá nhân                                                  | 39                                         | `encrypt*(` trong `lib/`, `features/`                                       |
| Tệp test nhắc tới cách ly công ty                                               | ~7                                         | `git grep` "tenant isolation", "công ty khác"… (đo thô)                     |
| Chỗ đọc dữ liệu / có `.limit(` / có `.offset(`                                  | ~1.050 / ~260 / 3                          | `git grep` (đo thô)                                                         |
| Dịch vụ trong bộ cài production                                                 | 4 (postgres, app, migrator, cron)          | tệp cấu hình triển khai                                             |
| Redis / hàng đợi / Sentry                                                       | 0 / 0 / 0                                  | `package.json`; có `pino`, `pino-roll`, `@vercel/otel`, `node-cron`         |
| Người dùng production                                                           | 15                                         | bản sao dữ liệu thật 09/2026                                                |
| Luồng trạng thái cố định trong DB / hàm tính chuỗi duyệt riêng / khai báo quy trình theo công ty | 38 / ≥8 / 0 | `pgEnum` có giá trị trạng thái trong `lib/db/schema/`; `approvalChain`, `leaveChain`, `buildApprovalChain`, `movementApproverRole`, `accountingApproverOf`… |
| Bước duyệt nhân sự mới · sửa hồ sơ · nghỉ phép                                  | `APPR1`,`APPR2` · `MGR`,`HR_STAFF`,`HR_LEAD` · ≤3 ngày 1 cấp | `lib/db/schema/hr.ts`, `lib/hr-onboarding/state.ts`, `lib/db/schema/people.ts`, `lib/people/leave.ts` |
| Bảng từ điển khai cột trong mã / chỗ đọc ô theo vị trí cột / loại nghỉ phép     | 66 / ~243 / 4                              | `lib/plan/dictionary/dictionary-defs*.ts`; `git grep ColumnIndex`; `leave_type` |
| Chỗ khoá dòng khi ghi / cột số phiên bản / tệp test chạy song song              | 0 / 8 / ~4                                 | `.for('update')`, `FOR UPDATE`, `pg_advisory`; `integer('version'…)`; `git grep` "concurren", "song song" (đo thô) |
| Trigger trong DB / khoá ngoại trỏ tới nhân viên                                 | 0 / 97                                     | `CREATE TRIGGER` trong `drizzle/`; `references(() => employee.id`            |
| Trường dữ liệu cá nhân được mã hoá / chức năng đồng ý, ẩn danh                  | 4 / 0                                      | `lib/hr-onboarding/secure.ts`; `git grep` consent, anonymi…                  |
| Tích hợp cổng thanh toán / đường nhận webhook                                   | 0 / 0                                      | `git grep` vnpay, momo, zalopay, onepay, vietqr, payos, stripe, webhook      |
| Dữ liệu production: dung lượng / số dòng / bảng có dữ liệu / bảng lớn nhất     | 3,7 MB / ~6.760 / 48 / 5.313 (`dictionary_row`) | bản sao dữ liệu production 21/09/2026, đếm dòng trong các khối `COPY`     |

## Phụ lục C — Nguồn số liệu bên ngoài

- **CVE-2025-55182** — 10.0/10, chiếm máy chủ không cần đăng nhập qua React Server Components, bị khai thác
  thực tế; bản vá Next.js 15.0.5+ · 15.1.9+ · 15.2.6+ · 15.3.6+ · 15.4.8+ · 15.5.7+ · 16.0.7+.
  [Trend Micro](https://www.trendmicro.com/en_us/research/25/l/critical-react-server-components-vulnerability.html) ·
  [Triskele Labs](https://www.triskelelabs.com/resources/react-server-components-critical-rce-vulnerability-cve-2025-55182)
- **Vòng đời Next.js** — mỗi bản lớn: Active LTS tới khi có bản lớn tiếp theo, sau đó Maintenance LTS; Next.js 15
  hết hỗ trợ 21/10/2026.
  [Next.js Support Policy](https://nextjs.org/support-policy) ·
  [HeroDevs](https://www.herodevs.com/blog-posts/nextjs-eol-dates-version-support-timeline)
- **Vòng đời PostgreSQL** — mỗi bản lớn được hỗ trợ 5 năm; PostgreSQL 16 phát hành 09/2023, hết hỗ trợ 11/2028.
  [PostgreSQL Versioning Policy](https://www.postgresql.org/support/versioning/)
- **Vòng đời Node.js** — bản LTS được hỗ trợ 30 tháng (Node 20: hết 30/04/2026).
  [Node.js Releases](https://nodejs.org/en/about/previous-releases)
- **Tấn công chuỗi cung ứng npm 08/09/2025** — 18 thư viện (chalk, debug…), hơn 2 tỷ lượt tải/tuần; đợt sau lan
  hơn 180 thư viện.
  [Cycode](https://cycode.com/blog/npm-debug-chalk-supply-chain-attack-the-complete-guide/) ·
  [SiliconANGLE](https://siliconangle.com/?p=710445)
- **Giới hạn gửi thư Google Workspace** — 2.000 thư/ngày/người dùng.
  [Google Workspace Admin Help](https://support.google.com/a/answer/166852)
- **Thống kê dự án ERP** — ~57% vượt ngân sách, 57–65% vượt thời gian (Panorama Consulting, 2015–2016).
  [Datamation](https://www.datamation.com/trends/survey-majority-of-erp-project-experience-budget-overruns-and-schedule-delays/) ·
  [Computerworld](https://www.computerworld.com/article/1516480/widespread-discontent-persists-with-erp-projects.html)
- **Odoo** — kho ứng dụng hơn 80.000 module (kể cả bên thứ ba); phân hệ Đặt cơm (Lunch) chính thức.
  [Odoo Apps](https://apps.odoo.com/apps/modules/browse/page/4055?seq_no=2) ·
  [Odoo Lunch](https://www.odoo.com/documentation/17.0/applications/hr/lunch/management.html)
- **Sentry tự cài** — khuyến nghị tối thiểu 16 GB RAM.
  [Sentry self-hosted](https://develop.sentry.dev/self-hosted/)
- **Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15** — hiệu lực 01/01/2026; phạt tới 5% doanh thu năm trước khi chuyển
  dữ liệu ra nước ngoài sai luật, tới 10 lần khoản thu khi mua bán dữ liệu.
  [VnEconomy](https://vneconomy.vn/xam-pham-du-lieu-ca-nhan-co-the-bi-phat-toi-da-den-5-doanh-thu-nam-lien-ke.htm) ·
  [Cổng TTĐT Hà Tĩnh](https://hatinh.gov.vn/vi/bai-viet/luat-bao-ve-du-lieu-ca-nhan-chinh-thuc-co-hieu-luc-thi-hanh-tu-ngay-112026) ·
  [KPMG](https://kpmg.com/vn/vi/home/phan-tich-chuyen-sau/2025/06/vietnam-new-personal-data-protection-law.html)
- **Nghị định 356/2025** — thay Nghị định 13/2023 từ 01/01/2026; Điều 41 ân hạn 5 năm cho doanh nghiệp nhỏ, khởi
  nghiệp. **Nghị định 330/2026** — xử phạt vi phạm bảo vệ dữ liệu cá nhân từ 19/08/2026.
  [Luật Việt An](https://luatvietan.vn/diem-moi-cua-nghi-dinh-356-2025-so-voi-nghi-dinh-13-2023-ve-huong-dan-bao-ve-du-lieu-ca-nhan.html) ·
  [VCCI](https://vcci.com.vn/tin-tuc/luat-bao-ve-du-lieu-ca-nhan-luu-y-ve-hanh-lang-phap-ly-moi-cho-doanh-nghiep) ·
  [Luật Việt An — NĐ 330](https://luatvietan.vn/nghi-dinh-330-2026-nd-cp.html)
- **Luật An ninh mạng 116/2025/QH15** — thông qua 10/12/2025, hiệu lực 01/07/2026, gộp Luật An toàn thông tin mạng
  2015 và Luật An ninh mạng 2018; dự thảo nghị định hướng dẫn công bố 13/02/2026.
  [EY Việt Nam](https://www.ey.com/vi_vn/technical/tax/tax-and-law-updates/luat-an-ninh-mang-2025-cua-viet-nam-cac-diem-chinh-va-yeu-cau-tuan-thu) ·
  [PLO](https://plo.vn/bo-cong-an-cong-bo-du-thao-nghi-dinh-ve-an-ninh-mang-post502929.html)
- **Nghị định 70/2025** (sửa Nghị định 123/2020) — từ 01/06/2025 hộ kinh doanh doanh thu từ 1 tỷ đồng/năm dùng hoá
  đơn điện tử từ máy tính tiền.
  [Thời báo Tài chính](https://thoibaotaichinhvietnam.vn/ho-ca-nhan-kinh-doanh-chu-dong-ra-soat-doanh-thu-ap-dung-hoa-don-dien-tu-tu-may-tinh-tien-175242.html) ·
  [Sapo](https://www.sapo.vn/blog/nghi-dinh-so-70-2025-nd-cp)
- **ISO/IEC 27001:2022** — 93 biện pháp kiểm soát; chứng nhận 3 năm, đánh giá giám sát hằng năm; công ty nhỏ
  ~20.000–23.000 USD phí đánh giá cho 3 năm, ~550–600 giờ công/năm nếu tự làm (ước tính của các bên tư vấn, chênh
  nhau tới 2 lần).
  [Techplained](https://www.techplained.com/iso-27001-certification-cost) ·
  [Konfirmity](https://www.konfirmity.com/blog/iso-27001-audit-cost)
- **OWASP ASVS 5.0.0** — phát hành 30/05/2025, ~350 yêu cầu trong 17 chương, 3 mức.
  [OWASP ASVS](https://github.com/OWASP/ASVS) · [SoftwareMill](https://softwaremill.com/whats-new-in-asvs-5-0/)
- **VNPay** — địa chỉ nhận kết quả (IPN) ở môi trường thật phải liên hệ VNPay để cài; phải xử lý thông báo trùng
  và đối soát định kỳ.
  [vnpay.js.org — IPN](https://vnpay.js.org/ipn/config-ipn) · [vnpay.js.org — Best practices](https://vnpay.js.org/best-practices)
