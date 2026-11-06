# Bán ERP cho khách ngoài — bản đầy đủ

> Bản đầy đủ để tra cứu, theo đúng thứ tự tài liệu · **78 trang** · [Xem dạng trình chiếu](ban-day-du.html) · [Tài liệu đầy đủ](../tai-lieu/ban-erp-cho-khach-hang.html)

---

## 1. Bán ERP cho khách ngoài: những khó khăn kỹ thuật

_Bản đầy đủ · tra cứu_

Toàn bộ **159 khó khăn**, 17 phần, kèm **số liệu đo trên chính hệ thống đang chạy**. Bản này dùng để tra cứu và thảo luận sâu từng phần.

> 🗣 **Lời trình bày:** Bản đầy đủ đi theo đúng thứ tự tài liệu. Không cần trình bày hết trong một buổi — có thể mở đúng phần đang bàn. Mã K-xx trên từng trang khớp với tài liệu đầy đủ.

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

## 4. Từ "tự xây nhà cho mình" sang "mở công ty xây nhà"

_Mở đầu · một hình ảnh_

**Hôm nay: căn nhà tự xây cho gia đình mình**

Xây nhanh, sửa lúc nào cũng được. Ở trong nhà nên biết chỗ nào dột. Đập đi xây lại cũng không sao.

**Khi bán: công ty xây nhà cho người khác**

Chủ nhà đang ở bên trong khi mình sửa. Có bản vẽ ký trước, có nghiệm thu, có bảo hành. Một lỗi thiết kế phải sửa ở **mọi** căn đã xây.

> 🗣 **Lời trình bày:** Hình ảnh này giúp người không làm kỹ thuật thấy ngay khác biệt: cùng một kỹ năng xây nhà, nhưng làm cho mình và làm cho khách là hai nghề khác nhau.

---

## 5. Sáu điều kiện thuận lợi hôm nay — cả sáu sẽ mất khi bán

_Mở đầu_

| Điều kiện hôm nay | Số liệu | Khi bán cho khách |
| --- | --- | --- |
| Được **xoá sạch dữ liệu làm lại** bất cứ lúc nào | Mỗi lần kiểm tra đầy đủ = **xoá sạch DB 2 lần** | Dữ liệu khách không bao giờ được xoá |
| **Một** phiên bản đang chạy | Cao điểm **140** lần thay đổi mã **trong 1 ngày** | Mỗi khách dừng ở một phiên bản khác nhau |
| **Một** khách, ngồi cùng nhà, chịu được lỗi | **37%** lần thay đổi mã là sửa lỗi | Nhiều khách, ở xa, không chịu được lỗi |
| Yêu cầu đổi liên tục, sửa ngay | **~1.920** quyết định trong ~2 tháng; **≥20** bị đảo | Mỗi lần đổi phải qua phân loại, kiểm thử, nghiệm thu |
| Người viết mã cũng vận hành, **thấy mọi dữ liệu và máy chủ** | **3** môi trường do chính mình giữ | Không thấy dữ liệu khách, không giữ máy chủ, mã bị làm rối |
| Mình **chấp nhận** sản phẩm chưa hoàn hảo: còn lỗi, còn rủi ro bảo mật, rủi ro mất dữ liệu | **0** chuyên gia bảo mật · **0** lần khôi phục thử từ bản sao lưu · **0/89** lần đổi cấu trúc DB có đường quay lại | Khách **không chấp nhận**: lỗi là khiếu nại, lộ dữ liệu là bị phạt theo luật, mất dữ liệu là đòi bồi thường |

> 🗣 **Lời trình bày:** Hệ thống chạy tốt hôm nay không phải ngẫu nhiên — nó dựa vào sáu điều kiện này. Khi bán, cả sáu điều kiện đều biến mất cùng lúc, nên tốc độ và cách làm hiện tại không mang sang được nguyên vẹn. Điều kiện cuối là quan trọng nhất: rủi ro mà công ty mình đang chấp nhận cho chính mình, khách sẽ không chấp nhận — và khi xảy ra ở khách thì người chịu trách nhiệm là mình (Luật Bảo vệ dữ liệu cá nhân 91/2025, Phần 10).

---

## 6. Tám điều quan trọng nhất

_Mở đầu · lộ trình_

1. **Dữ liệu khách có thể mất khi nâng cấp** — 0/89 lần đổi cấu trúc có đường quay lại.
2. **"Như Windows" không chạy được với ERP** — lỗ hổng 10/10 điểm đã bị khai thác thật.
3. **"Khách gửi → làm → triển khai" bỏ qua 9/12 bước.**
4. **Sửa cho khách này không hỏng khách khác** — thêm một ô, một bước duyệt, một cấp tổ chức đều phải sửa mã cho mọi khách.
5. **Chưa có hệ thống kiểm thử để bán** — 29/46 loại đang là 0.
6. **Mã và cấu trúc dữ liệu do AI sinh, chưa ai review** — 78% thay đổi có AI viết cùng.
7. **Vận hành N máy chủ ở N khách** — 0 DevOps, 0 chuyên gia bảo mật.
8. **Phương án S dùng mã của "một bộ mã" nhưng chịu chi phí của "mỗi khách một bộ mã".**

> 🗣 **Lời trình bày:** Đây là lộ trình của bản đầy đủ. Tám điều này tương ứng Phần 1 đến Phần 8 của tài liệu.

---

## 7. Cấu trúc dữ liệu đổi rất thường xuyên

_Phần 1 · Dữ liệu của khách_

> Mỗi bản mới thường kèm thay đổi "bản vẽ kết cấu" của kho dữ liệu. Ở máy phát triển thì **đập đi xây lại**; ở khách phải sửa kết cấu **khi kho đang đầy hàng**.

- **89** — lần chuyển đổi cấu trúc DB (K-06)
- **29** — lần trong 6 ngày (15–21/09/2026)
- **500** — lệnh sửa bảng; 34 lần đổi tên, 7 lần xoá cột/bảng
- **~12×** — sửa bảng cũ nhiều hơn tạo bảng mới (500 so với 43) — K-08

> Quy tắc dự án ghi nguyên văn: _"chi phí sai schema ≈ 0"_. Đúng khi có một khách và được xoá làm lại; khi bán, chi phí sai cấu trúc = **N khách × rủi ro mất dữ liệu** (K-07).

> 🗣 **Lời trình bày:** Tốc độ đổi cấu trúc hiện nay là bình thường ở giai đoạn dựng nhanh cho một khách. Nhưng mỗi lần đổi cấu trúc ở khách là một lần chuyển dữ liệu thật, không được hỏng một dòng.

---

## 8. Nâng cấp hỏng thì không có nút "quay lại"

_Phần 1 · Dữ liệu của khách_

- **0/89** — bước chuyển đổi có đường lùi (K-01)
- **24 giờ** — dữ liệu có thể mất — backup 1 lần/ngày
- **88** — bước phải chạy liên tiếp nếu khách cài bản đầu, nay mới nâng (K-02)

- **Máy phát triển luôn "đạt", máy thật mới hỏng** — đổi tên một giá trị lựa chọn đã làm máy thật hỏng khi nâng cấp; lỗi loại này ghi **6** lần (K-03).
- **Dữ liệu mỗi khách một kiểu** — riêng lỗi số kiểu Việt `319,87` bị đọc thành 0 đã vấp **5** lần (K-04).
- **Lỗi chỉ lộ trên dữ liệu thật** — chạy tác vụ thật trên bản sao dữ liệu thật mới lộ **140** dòng bị khoá nhầm (K-05).

> 🗣 **Lời trình bày:** "Khách tự chọn nâng cấp" nghĩa là có khách đứng yên hai năm rồi nhảy thẳng lên bản mới nhất, chạy một chuỗi bước chuyển đổi chưa ai chạy thử trên dữ liệu mình không được nhìn thấy.

---

## 9. Mình chịu trách nhiệm cấu trúc, nhưng không giữ chìa khoá

_Phần 1 · Khách có toàn quyền trên DB_

**Khách sửa DB theo cách của họ**

Thêm chỉ mục, trigger, báo cáo phụ thuộc cột, sửa tay dữ liệu "chữa cháy" — lần nâng cấp sau **thất bại**, khó chứng minh lỗi do ai (K-09, K-12).

**Không phát hiện được DB bị sửa**

Nâng cấp an toàn cần công cụ so cấu trúc thật với cấu trúc mong đợi. Hiện có **0** công cụ (K-10).

**"Khách tự backup" = không ai làm**

Phần lớn công ty vừa và nhỏ không có người quản trị DB. Để vận hành **1** khách, bên mình đang cần **31** script máy chủ (K-11).

> 🗣 **Lời trình bày:** Mô hình "khách tự quản DB" chuyển rủi ro sang khách trên giấy, nhưng khi dữ liệu hỏng thì người bị gọi vẫn là mình.

---

## 10. Nâng cấp ở khách còn vấp những gì

_Phần 1 · Những khó khăn khác khi nâng cấp_

| Khó khăn | 📊 Số liệu |
| --- | --- |
| Một số thay đổi **khoá cả bảng** khi chạy ⇒ phải dừng hệ thống, hẹn giờ với khách (K-13) | Thời gian chạy trên dữ liệu khách lớn: **chưa từng đo** |
| Công cụ **đòi người ngồi trả lời** khi chuyển đổi — ở máy khách không ai hiểu để trả lời (K-14) | Ghi lại **5** lần |
| Mỗi tổ hợp cấu hình là một hình dạng dữ liệu (K-15) | **25** nhóm tính năng ⇒ **2²⁵ ≈ 33 triệu** tổ hợp lý thuyết |
| Chuyển đổi kéo theo tác vụ nền, báo cáo, tích hợp (K-16) | **5** tác vụ định kỳ; **26** lệnh xử lý dữ liệu |
| 100 khách thì bao nhiêu bảng? (K-17) | Mỗi khách thêm 5 bảng riêng ⇒ **~600** bảng trong DB của **mọi** khách |

> 🗣 **Lời trình bày:** Mỗi dòng ở đây là một loại sự cố đã gặp hoặc sẽ gặp khi nâng cấp ở khách. Phần lớn đã xảy ra ngay với khách nội bộ.

---

## 11. DB đóng sẵn trong bộ cài — bớt một việc, sinh việc khác

_Phần 1 · DB đóng sẵn trong bộ cài, sao lưu_

- Phiên bản DB cố định, không lệch giữa các khách — **được**.
- Nâng PostgreSQL lên bản lớn mới thành **việc của mình trên mọi máy khách**, phải dừng hệ thống.
- DB chung máy với ứng dụng thì tranh tài nguyên; khách lớn thường đòi dùng DB **của họ** — lại lệch phiên bản.
- DB nằm trong bộ cài của mình mà "khách tự quản" — ranh giới trách nhiệm càng mờ (K-18).

- **11/2028** — PostgreSQL 16 hết hỗ trợ — mọi khách phải nâng trước mốc đó
- **1/4** — loại dữ liệu cần giữ đang được sao lưu
- **0** — lần khôi phục thử từ bản sao lưu

> 🗣 **Lời trình bày:** Lần đổi bản PostgreSQL gần nhất, script sao lưu đã suýt xoá nhầm bản sao lưu tốt. Sao lưu và khôi phục là việc thường ngày của một DevOps có nghề — hiện chưa có người đó (Phần 7).

---

## 12. Lỗ hổng bảo mật không chờ khách sẵn sàng

_Phần 2 · "Như Windows"_

- **10/10** — điểm nghiêm trọng — CVE-2025-55182 (12/2025)
- **1** — lần gửi yêu cầu là chiếm được máy chủ, không cần đăng nhập
- **7** — dòng phiên bản Next.js phải ra bản vá riêng

> Lỗ hổng **đã bị khai thác thật**. Hệ thống mình dùng đúng nền tảng này — hôm nay **mình đã ở bản an toàn**, vì chỉ có một máy chủ do mình giữ. Khi bán, khách "chọn không nâng cấp" thì máy chủ của họ mở toang.

- Phải chọn: **ép** cập nhật (tức là không còn "khách tự chọn") hoặc **vá ngược** cho từng phiên bản cũ (K-19).
- Windows **ép** cập nhật bảo mật mỗi tháng, và không phải chuyển đổi dữ liệu kế toán, kho, nhân sự mỗi lần nâng (K-21).

> 🗣 **Lời trình bày:** Đây là ví dụ thật, không phải giả định. Một nền tảng phổ biến bị lỗ hổng 10/10, chỉ một yêu cầu là chiếm máy chủ. Nếu lúc đó mình có 10 khách ở 10 phiên bản, mình phải vá 10 lần, hoặc ép tất cả nâng cấp.

---

## 13. Nhiều phiên bản cùng sống = nhiều sản phẩm

_Phần 2 · "Như Windows"_

- **12** — phiên bản cùng sống nếu phát hành mỗi tháng, hỗ trợ 12 tháng (K-20)
- **72** — tổ hợp phải kiểm cho mỗi bản phát hành (K-23)
- **29** — lần đổi cấu trúc dữ liệu có thể nằm trong một bản mới

- Mỗi phiên bản còn khách dùng phải **tái hiện lỗi, vá lỗi trên đúng phiên bản đó**.
- Ma trận 72 = **4** phiên bản × **3** kiểu cài × **3** cấu hình điển hình × **2** cỡ tải — ví dụ khiêm tốn.
- Không tách nhánh mã nhưng thực chất vẫn là nhiều sản phẩm.

> 🗣 **Lời trình bày:** "Một bộ mã" chỉ đúng ở kho mã. Ở phía khách, mỗi phiên bản đang chạy là một sản phẩm riêng phải hỗ trợ.

---

## 14. Nền tảng bên dưới tự hết hạn, dù khách không đụng gì

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

## 15. Bốn câu chưa có chính sách

_Phần 2 · Chính sách phát hành_

| Câu hỏi | 📊 Hiện có |
| --- | --- |
| Làm xong yêu cầu nào triển khai ngay cho khách đó, hay gom đợt phát hành chung? (K-24) | **~31** lần thay đổi mã/ngày cho **1** khách |
| File cấu hình cũng có phiên bản — bản mới đổi nghĩa một mục thì file của từng khách chuyển đổi thế nào? (K-25) | **24** biến cấu hình máy chủ; file cấu hình nghiệp vụ theo khách: **0** |
| Hỗ trợ bản cũ đến bao giờ? (K-26) | **Chưa có** chính sách vòng đời |
| Ghi chú phát hành cho người dùng và IT khách (K-27) | **0** |

> 🗣 **Lời trình bày:** Bốn câu này không cần công nghệ mới, chỉ cần quyết định. Nhưng thiếu quyết định thì mỗi khách sẽ tự hiểu một kiểu.

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

## 17. Người làm không nên là người kiểm cuối cùng

_Phần 3 · Ai kiểm thử?_

- **0** — kiểm thử viên độc lập (K-28)
- **1** — bộ dữ liệu mẫu, của 1 công ty (K-29)
- **2 + 19** — môi trường thử và script riêng — chỉ cho 1 khách nội bộ (K-30)
- **72** — tổ hợp phải chạy lại cho mỗi bản vá (K-31)

- Lập trình viên và AI của họ kiểm **điều họ hiểu**; kiểm thử viên độc lập kiểm **điều khách cần**.
- Không được dùng dữ liệu thật của khách để kiểm; dữ liệu mẫu đã bỏ sót lỗi (K-05).
- Sửa cho khách A thì phải kiểm lại cho khách B, C…

> 🗣 **Lời trình bày:** Với một khách nội bộ, lỗi lọt thì sửa ngay hôm sau. Với khách ngoài, lỗi lọt là một bản vá phải đóng gói, kiểm, giao và cài lại.

---

## 18. Nghiệm thu hiện nay là "nhìn màn thật"

_Phần 3 · Ai nghiệm thu?_

**Khách ngoài cần tiêu chí viết trước**

Có biên bản, có tiêu chí viết **trước khi làm**. Hiện **0** mẫu biên bản, **0** tiêu chí viết trước (K-32).

**"Lỗi" hay "yêu cầu mới"?**

Không có đặc tả viết trước để đối chiếu thì mọi thứ khách chưa vừa ý đều thành "lỗi", sửa miễn phí. Hiện **0** đặc tả được khách xác nhận trước (K-33).

**Nhìn màn cũng nhầm**

Ngay với khách nội bộ đã **2 lần** kết luận "màn không có nút" vì xem nhầm nhánh màn hình (K-39).

> 🗣 **Lời trình bày:** Khách không có người, không có thời gian, nên thường thử vài màn rồi đồng ý; dùng thật rồi mới phát hiện lỗi — lúc đó tranh cãi ai trả tiền sửa.

---

## 19. Chữ và ảnh không phải là đặc tả

_Phần 3 · Đầu vào "chữ và ảnh"_

> Ảnh cho thấy màn **trông thế nào**, không cho biết **luật**: ai được thấy, ai được sửa, có những trạng thái nào, dữ liệu lấy từ đâu, sai thì sao (K-34).

| Đã xảy ra ngay với khách nội bộ | 📊 |
| --- | --- |
| Yêu cầu qua nhiều phiên bản bản vẽ màn hình rồi **bỏ hẳn** cách giao bằng bản vẽ | **≥5** phiên bản; **35** tệp đặc tả ghi chỗ lệch bản vẽ |
| Yêu cầu ẩn: phân quyền, lịch sử sửa, xuất Excel, in, tìm kiếm… (K-35) | **6** tiêu chí "xong" + **16** luật chung không yêu cầu nào nhắc tới |
| Câu hỏi không được trả lời ⇒ phải đoán (K-36) | **86** dòng ghi "tự chốt / giả định" |
| Yêu cầu đổi ngay trong lúc làm và sau nghiệm thu (K-38) | **≥20** quyết định bị đảo |
| Hiểu nhầm hai chiều (K-39) | **18** dòng ghi "hiểu nhầm / đọc nhầm" |

> 🗣 **Lời trình bày:** Với khách nội bộ, đoán sai thì sửa. Với khách ngoài, đoán sai là bị từ chối lúc nghiệm thu. Nhiều người phía khách còn nói khác nhau (K-37).

---

## 20. AI viết mã nhanh — nhưng viết mã chỉ là 1/12 bước

_Phần 3 · Ước lượng, ưu tiên, truy vết_

- **1/12** — bước là viết mã — không biết cả chuỗi mất bao lâu thì không hứa được ngày giao (K-41)
- **0** — dữ liệu lịch sử từ lúc nhận yêu cầu đến lúc nghiệm thu
- **~1.920** — quyết định trong 182 tệp cho 1 khách — N khách ⇒ N lần (K-48)

- **Ưu tiên giữa các khách:** A, B, C cùng đòi gấp, chỉ có một đội; đổi qua đổi lại làm mỗi việc chậm thêm (K-42).
- **Truy vết:** yêu cầu nào → mã nào → kiểm thử nào → nghiệm thu nào, **theo từng khách**.

> 🗣 **Lời trình bày:** Báo giá, cam kết ngày giao và phân xử tranh chấp đều cần ước lượng và truy vết. Hiện chưa có dữ liệu cho cả hai.

---

## 21. Nút thắt chuyển từ "viết" sang "kiểm"

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

## 22. AI viết mã, AI viết test, AI review — lấy gì bảo đảm chất lượng?

_Phần 3 · Phát triển với AI · câu hỏi còn mở_

**Vì sao "test đạt" chưa đủ**

Khi cùng một AI viết mã, viết test rồi review, ba bước **không độc lập**: AI hiểu sai yêu cầu thì test cũng kiểm theo cái hiểu sai đó, và review cũng gật theo. Test báo đạt chỉ chứng minh mã khớp với **chính nó**, không chứng minh khớp với **điều khách cần**.

**Đã xảy ra ở đây**

**4** lần thay đổi đều ghi "đã kiểm, đạt" — gộp lại thì **6** chỗ hỏng. **3** lỗi gần nhất đều lọt qua bộ test báo đạt. Một màn vỡ bố cục trong khi mọi bước kiểm tự động báo đạt (K-44).

**Hướng cần nghiên cứu**

Test viết từ **tiêu chí nghiệm thu, trước khi viết mã**, bởi người hoặc một phiên AI không nhìn thấy mã · cố ý cài lỗi xem test có bắt được không (mutation test) · **người** review bắt buộc ở chỗ đụng tiền, phân quyền, chuyển đổi DB · đo **lỗi lọt tới khách**, không đo số test.

> Chưa có đáp án chuẩn — đây là câu hỏi chung của cả ngành khi dùng AI viết mã. Phải nghiên cứu, thử và chốt **cách viết test và cách review** trước khi nhận khách đầu tiên.

> 🗣 **Lời trình bày:** Hiện bộ test của hệ thống phần lớn do AI viết cùng lúc với mã. Với một khách nội bộ, lỗi lọt thì sửa hôm sau; với khách ngoài, chất lượng test quyết định lỗi có tới tay khách hay không. Mutation test hiện là 0 (Phần 5).

---

## 23. Sửa cho khách này mà không hỏng khách khác: bốn cách, cách nào cũng có giá

_Phần 4 · Một bộ mã cho nhiều khách_

| Cách | Cái giá |
| --- | --- |
| Rẽ nhánh theo tên khách trong mã ("nếu là khách X thì…") | Nhanh lúc đầu. Sau 10 khách, mỗi chức năng là một mớ điều kiện; sửa một chỗ phải thử lại cho mọi khách |
| Mỗi khách một "phiên bản" của đoạn logic đó (cắm – rút) | Mỗi lần đổi lõi phải kiểm lại **mọi** phiên bản đã cắm; phải biết trước chỗ nào được cắm |
| Đưa thành cấu hình | Chỉ làm được với thứ biết trước sẽ khác; công thức tính toán dần biến cấu hình thành **một ngôn ngữ lập trình thu nhỏ** |
| Cơ chế mở rộng (plugin) cho khách hoặc đối tác tự viết | Mâu thuẫn với "không giao mã, làm rối mã"; khách đã dựa vào thì **không được đổi nữa** |

> 📊 Mã hiện có **0** điểm mở rộng thiết kế cho mục đích này (K-49).

> 🗣 **Lời trình bày:** Đây là bài toán kiến trúc khó nhất của mọi phần mềm doanh nghiệp. Ba trang tiếp theo là ba ví dụ nhỏ nhất cho thấy hệ thống hiện tại chưa chọn cách nào trong bốn cách này.

---

## 24. Mỗi khách cần trường riêng — hệ thống phải hỗ trợ trường dữ liệu động

_Phần 4 · Yêu cầu thứ nhất: trường dữ liệu động_

> Ví dụ: hai khách dùng cùng chức năng, khách B muốn thêm một ô. Hệ thống cần cho B **tự khai thêm ô bằng cấu hình**, không sửa mã, khách A không bị ảnh hưởng. Hiện nay danh sách trường **viết cứng trong mã, giống nhau cho mọi công ty** ⇒ thêm ô cho B là sửa mã, sửa DB, và A cũng nhận ô đó (K-50).

- **0** — bảng khai báo trường theo công ty, trong toàn bộ 104 bảng
- **66** — bảng từ điển khai cột cứng trong mã
- **~243** — chỗ đọc ô theo vị trí cột — khách bỏ hay đổi thứ tự một cột là gãy

> Trường động nghĩa là: khai trường theo từng khách → biểu mẫu và kiểm tra dữ liệu tự sinh → trường hiện ở danh sách, tìm kiếm, báo cáo, xuất Excel → **nâng cấp phiên bản không làm mất trường riêng của khách**.

> 🗣 **Lời trình bày:** Ngay phần trông "cấu hình được" nhất là các bảng từ điển — dữ liệu lưu dạng JSON theo công ty — thì danh sách cột vẫn khai trong mã, và nghiệp vụ đọc ô theo "cột thứ mấy". Đây là yêu cầu nền tảng thứ nhất; muốn có nó phải thiết kế lại cách lưu và cách đọc dữ liệu của mọi module.

---

## 25. Công ty X chỉ thêm một bước duyệt — cần thiết kế DB và kiến trúc mã cho quy trình động

_Phần 4 · Yêu cầu thứ hai: quy trình động_

| Module | Các bước (cố định trong DB) | Ai duyệt (viết cứng trong mã) |
| --- | --- | --- |
| Tiếp nhận nhân sự mới | Mời → Xem xét → **Duyệt 1 → Duyệt 2** → IT cấp → Xong | TP Nhân sự → CEO; trưởng phòng: CEO → Chủ tịch |
| Sửa hồ sơ nhân sự | **Quản lý → Nhân viên NS → Trưởng NS** → Áp dụng | Tên bước nằm ngay trong cấu trúc DB |
| Nghỉ phép | Chờ → Duyệt / Từ chối (lưu bước n/N) | ≤ **3** ngày: 1 cấp; dài hơn: 2 cấp |
| Đơn hàng · Giải ngân | Nháp → Chờ → Duyệt | 1 bước |
| Từ điển (66 bảng) | Khoá → Đang sửa → Chờ duyệt → Trả về | Chuỗi duyệt tính trong mã |
| Kế hoạch năm · tháng | Nháp → Gửi → Xác nhận / Trả về | Theo cây tổ chức, chuỗi vị trí |

**Thiết kế DB cần có**

Bảng **định nghĩa quy trình** theo công ty và loại hồ sơ: các bước, ai duyệt, điều kiện (ví dụ "trên 3 ngày"). Hồ sơ lưu **phiên bản quy trình + bước đang ở**. Hiện: **38** luồng trạng thái cố định, **0** chỗ khai quy trình theo công ty.

**Kiến trúc mã cần có**

**Một bộ máy duyệt chung** đọc định nghĩa đó; màn, nhãn, thông báo, hạn xử lý đều lấy từ định nghĩa. Hiện: **8+** hàm tính chuỗi duyệt riêng, mỗi module một kiểu.

> 🗣 **Lời trình bày:** Với thiết kế hiện tại, thêm một bước cho công ty X là chuyển đổi DB cho mọi khách, cộng rẽ nhánh theo tên khách trong mã, sửa màn, nhãn, thông báo, hạn xử lý (K-51). Hồ sơ đang dở khi quy trình đổi phải chạy tiếp theo quy trình cũ — vì thế hồ sơ phải nhớ phiên bản quy trình.

---

## 26. Hai công ty có số cấp tổ chức khác nhau

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

## 27. Danh mục cố định cũng vậy — và một chỗ đã đi đúng hướng

_Phần 4 · Danh mục cố định_

**Danh mục nằm trong cấu trúc DB**

Loại nghỉ phép chỉ có đúng **4** loại: phép năm, ốm, không lương, việc riêng. Công ty muốn thêm "nghỉ thai sản" hay "nghỉ cưới" là **một lần chuyển đổi DB cho mọi khách** (K-53). Tổng cộng **59** danh sách giá trị cố định.

**Điểm sáng: nghỉ phép lưu "bước n trên N"**

Đúng cách ở tầng dữ liệu — thêm bước không cần đổi cấu trúc. Nhưng **luật** số cấp duyệt (≤ 3 ngày thì 1 cấp) vẫn viết cứng, giống nhau cho mọi công ty. Chỉ **1/9** module làm được như vậy (K-54).

> 🗣 **Lời trình bày:** Điểm sáng này đáng giữ: nó cho thấy cách làm đúng đã có mầm trong hệ thống, chỉ chưa thành nền tảng chung.

---

## 28. Ba tính năng nền tảng phải xây, rồi chuyển từng module sang

_Phần 4 · Phải xây gì_

**① Trường dữ liệu theo khách**

Khai báo trường theo công ty; biểu mẫu và kiểm tra dữ liệu tự sinh; trường mới hiện ở danh sách, tìm kiếm, báo cáo, xuất Excel.

**② Bộ máy quy trình duyệt theo khách**

Chuỗi bước khai trong DB theo công ty và loại hồ sơ; hồ sơ lưu "bước n trên N"; hồ sơ đang dở chạy tiếp theo quy trình cũ khi quy trình đổi.

**③ Cây đơn vị do khách khai**

Số cấp, tên cấp, đơn vị cha – con tuỳ khách; cấp trên, phạm vi dữ liệu, chuỗi duyệt, cộng dồn chỉ tiêu đều đọc từ cây.

> 📊 **25** nhóm tính năng · **38** luồng trạng thái · **8+** cách tính chuỗi duyệt gom về một bộ máy · **~243** chỗ đọc theo vị trí cột · **5** vai và **2** tầng đơn vị cố định phải thành cây do khách khai (K-55).

> 🗣 **Lời trình bày:** Đây không phải chỉnh vài form, mà là làm lại tầng dưới của mọi module. Nhưng đây cũng chính là thứ biến hệ thống từ "phần mềm của một công ty" thành "sản phẩm cho nhiều công ty". Danh mục (loại nghỉ phép, loại hồ sơ…) đã có hướng làm động theo từ điển — lưu ý giá trị nào kéo theo luật riêng (nghỉ ốm → bảo hiểm, tính lương) thì luật đó cũng phải khai được, không chỉ thêm tên.

---

## 29. Hệ thống gắn cứng với một công ty ở hàng trăm chỗ

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

## 30. File cấu hình vẫn là công tắc bật/tắt, chỉ đổi tên

_Phần 4 · "Tính năng do file cấu hình quyết định"_

- **1.024** — tổ hợp với 10 mục bật/tắt
- **1 triệu+** — tổ hợp với 20 mục
- **~157.000** — tổ hợp trạng thái chỉ từ 3 luồng duyệt khi kiểm vét cạn

- **Tính năng phụ thuộc lẫn nhau** — bật A mà tắt B thì sao? Cấu hình phải tự kiểm tổ hợp hợp lệ; hiện **0** cơ chế (K-62).
- **Mỗi chỗ cho phép "sửa riêng" là một lời hứa tương thích vĩnh viễn** — 10 khách × 5 chỗ = **50** điểm kiểm lại mỗi lần đổi lõi (K-63).
- **Sửa riêng ở bản 1.5, khách nâng lên 2.0** — phần sửa riêng còn chạy không? Ai kiểm? (K-64)
- **Tắt một tính năng khi đã có dữ liệu** — dữ liệu đó đi đâu? (K-67)

> 🗣 **Lời trình bày:** Mỗi mục cấu hình làm hệ thống chạy khác đi là một nhánh trong mã phải kiểm thử. Chưa có quy tắc phân định cái gì cấu hình được, ai cấu hình (K-68).

---

## 31. Khách nghe "ERP" sẽ so với Odoo, SAP, MISA

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

## 32. Ba tầng kiểm thử: nhiều ở dưới, 0 ở trên cùng

_Phần 5 · Kiểm thử_

- **~420** — tệp **unit** — kiểm từng hàm, logic tính toán
- **40 + 45** — tệp **integration** với DB thật + luồng nghiệp vụ nhiều bước
- **0** — kịch bản **E2E** — người dùng bấm xuyên nhiều màn trên trình duyệt thật

> Các loại còn lại — đồng thời, mutation, tải, bảo mật… — là **cách** kiểm, chạy ở một hay nhiều tầng. Bộ kiểm thử hiện tại khá lớn (**509** tệp), nhưng dựng cho **một** khách, **một** phiên bản, **một** cỡ tải (K-73).

> 🗣 **Lời trình bày:** Tầng unit và integration là thế mạnh hiện có. Cái thiếu là tầng trên cùng — kiểm như người dùng thật — và các loại kiểm thử chỉ cần khi bán cho nhiều khách.

---

## 33. 46 loại kiểm thử một ERP thương mại cần: 29 loại đang là 0

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

## 34. Phát hành, nâng cấp, hiệu năng: gần như toàn bộ là 0

_Phần 5 · Bảng 46 loại (1/3)_

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

> 🗣 **Lời trình bày:** Nhóm phát hành chỉ cần khi có nhiều khách, nhiều phiên bản — đó là lý do hôm nay chưa có. Nhóm hiệu năng chưa có vì chưa từng có khách lớn.

---

## 35. Bảo mật và con người

_Phần 5 · Bảng 46 loại (2/3)_

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

> 🗣 **Lời trình bày:** Phần lớn các loại kiểm thử bảo mật là việc dùng công cụ — một chuyên gia bảo mật dựng được nhanh. Khó là ở cách ly giữa các công ty và mã AI chưa ai soi (Phần 9).

---

## 36. Chức năng: có nền tốt ở tầng dưới

_Phần 5 · Bảng 46 loại (3/3)_

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

> 🗣 **Lời trình bày:** Bảng này có thêm Accessibility (dùng bằng bàn phím, trình đọc màn hình) — hiện chưa có. Bốn loại ✅ là nền tốt để xây tiếp.

---

## 37. 10 loại kiểm thử riêng của phần mềm giữ tiền, kho, hồ sơ

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

## 38. Lỗi đồng thời không bao giờ lộ khi một người thử

_Phần 5 · Lỗi ERP điển hình_

- **0** — chỗ khoá dòng khi ghi trong toàn hệ thống
- **8** — cột số phiên bản để phát hiện ghi đè
- **15** — người dùng production hôm nay — chưa đủ đông để lộ lỗi

**Đồng thời (K-80)**

Hai người duyệt cùng một hồ sơ, hai đơn cùng trừ một lô hàng: duyệt hai lần, **kho âm**, số tiền cộng đôi. Chạy đúng ở mọi lần thử đơn lẻ.

**Tiền và nhật ký (K-81)**

ERP phải chứng minh số tổng khớp chi tiết và **mọi** thay đổi để lại dấu vết không ai xoá được — kể cả người quản trị DB của khách.

**Tích hợp ngoài (K-82)**

Cổng thanh toán, hoá đơn điện tử, ngân hàng chỉ kiểm được trên môi trường thử của bên kia — và môi trường thử khác môi trường thật.

> 🗣 **Lời trình bày:** Ở khách có hàng trăm người dùng cùng lúc, lỗi đồng thời là chuyện hằng ngày. Đây là loại lỗi tốn công gỡ nhất vì không tái hiện được khi một người thử.

---

## 39. Kiểm thử cũng tốn — và tốn theo số khách

_Phần 5 · Chi phí kiểm thử_

| Khó khăn | 📊 Số liệu |
| --- | --- |
| Kiểm thử nhân theo số tổ hợp đang bán (K-74) | **72** tổ hợp × 15 phút = **18 giờ máy** mỗi bản phát hành |
| Mutation test rất tốn trên mã lớn (K-75) | ~**14.000** lần chạy ⇒ hàng chục giờ máy mỗi lượt |
| Kiểm thử chập chờn — người ta quen bỏ qua cảnh báo (K-76) | **16/28** ảnh lệch dù không ai sửa giao diện |
| Bộ kiểm thử cũng phải bảo trì (K-77) | **509** tệp; **37** tệp đã xoá vì tính năng dựng lại |
| Dữ liệu kiểm thử cho khách lớn (K-78) | Dữ liệu mẫu hiện có: **1** công ty, vài chục người |
| Hạ tầng: máy tạo tải, dữ liệu lớn, quét bảo mật, pentest thuê ngoài (K-79) | **Chưa ước lượng** |

> 🗣 **Lời trình bày:** Kiểm thử không phải làm một lần. Mỗi bản phát hành, mỗi tổ hợp khách, mỗi phiên bản còn sống đều phải chạy lại.

---

## 40. AI viết nhanh hơn người đọc

_Phần 6 · Mã do AI viết_

- **78%** — lần thay đổi mã có AI viết cùng (338/434)
- **10%** — số lần thay đổi lớn hơn 15.000 dòng
- **~143.000** — dòng mã, 1.148 tệp
- **37%** — lần thay đổi là sửa lỗi (159/434)

- Trung vị **134** dòng mỗi lần — nhưng không ai review nổi một thay đổi 15.000 dòng (K-83).
- Nhóm lớn nhất: Hoạch định **23.600** dòng · Thực thi **15.000** · Từ điển **13.000** · Nhân sự **10.200**; phần dùng chung **42.800** (K-87).
- Với khách ngoài, mỗi lần sửa lỗi là một bản vá phải đóng gói, kiểm, giao, cài (K-88).

> 🗣 **Lời trình bày:** Khối lượng mã vượt khả năng đọc của con người. Đây không phải lời chê AI — AI giúp xây nhanh — nhưng trước khi giao cho khách, phải có người chịu trách nhiệm về những gì được giao.

---

## 41. Cấu trúc dữ liệu rất lớn, vẫn phình nhanh, chưa ai review

_Phần 6 · Cấu trúc dữ liệu do AI sinh_

- **104** — bảng · ~1.140 cột · 229 liên kết · 59 danh sách giá trị cố định
- **+60%** — số bảng trong 2 tuần (65 → 104)
- **0** — người chuyên DB — review kỹ 2 phút/cột ≈ 38 giờ một lượt
- **32** — cột dạng JSON "túi tự do", chưa chuẩn hoá

> 🗣 **Lời trình bày:** Cấu trúc đổi 29 lần trong 6 ngày thì review xong đã cũ (K-85). Các cột JSON là cố ý cho chỗ nghiệp vụ còn mơ hồ — nhưng muốn chuẩn hoá sau này phải chuyển từng túi, mà nội dung túi mỗi khách mỗi khác (K-86).

---

## 42. Tốc độ hôm nay dựa vào việc được phép làm sai

_Phần 6 · Tốc độ dựa vào việc được phép sai_

- **~30** — quyết định mỗi ngày (~1.920 trong ~2 tháng)
- **≥20** — quyết định bị đảo ngược
- **37** — bộ kiểm thử phải xoá vì tính năng bị dựng lại
- **2** — lần xoá sạch DB mỗi lượt kiểm tra đầy đủ

> Cách làm hiện tại là _"dựng nhanh → dùng thử → góp ý → sửa"_, và **xoá sạch dữ liệu dựng lại** là chuyện thường. Với khách ngoài, cả hai điều này không còn (K-89, K-90).

> 🗣 **Lời trình bày:** Đây là cách làm đúng cho giai đoạn tìm yêu cầu với một khách nội bộ. Nó không mang sang được khi dữ liệu là của khách và mỗi thay đổi phải qua nghiệm thu.

---

## 43. Cần ít nhất một DevOps và một chuyên gia bảo mật — hiện chưa có ai

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

## 44. Máy chủ là của khách, dữ liệu mình không được xem

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

## 45. Mỗi thành phần thêm vào nhân với số khách

_Phần 7 · Giám sát, nhật ký, bộ nhớ đệm, hàng đợi_

> Hiện trạng: nhật ký ghi ra tệp trên máy chủ; **0** Redis · **0** hàng đợi · **0** Sentry · **0** Kibana/Grafana · **0** cảnh báo tự động.

| Thành phần | Cần khi | Cái giá |
| --- | --- | --- |
| Prometheus + Grafana + cảnh báo | CPU, RAM, ổ đĩa, DB chậm, tác vụ hỏng | phải có người trực nhận cảnh báo |
| Sentry — bắt lỗi | biết lỗi trước khi khách gọi | tự cài khuyến nghị **16 GB RAM**; mã làm rối ⇒ giữ bản đối chiếu từng phiên bản |
| ELK hoặc Loki — tìm nhật ký | tìm nhật ký trên N máy chủ | thêm dịch vụ, ngốn RAM |
| Hàng đợi · Redis | gửi thư có thử lại, báo cáo nặng; khách lớn chạy nhiều máy | xử lý trùng, sai thứ tự; dữ liệu đệm cũ ⇒ số sai không báo lỗi |

> 📊 Từ **4** lên **7–9** dịch vụ mỗi khách × N khách (K-96). Thêm hàng đợi, bộ nhớ đệm là **đổi cách viết mã**: **47** tệp xử lý thao tác ghi phải xem lại (K-98).

> 🗣 **Lời trình bày:** Khách nhỏ chỉ muốn một máy rẻ; mỗi dịch vụ thêm vào chiếm RAM trên máy của họ và phải được cài, nâng, vá, sao lưu.

---

## 46. Giám sát đặt riêng từng khách hay gom về một chỗ?

_Phần 7 · Giám sát đặt ở đâu_

| | Riêng từng khách | Gom về hệ thống chung của mình |
| --- | --- | --- |
| Được | Dữ liệu không rời máy khách | Một nơi xem mọi khách |
| Mất | Không ai xem (khách thường không có người); tốn tài nguyên; mình phải vào N nơi | Nhật ký rời máy khách, có thể chứa dữ liệu cá nhân; khách lớn thường cấm kết nối ra ngoài; một sự cố lộ dữ liệu **mọi** khách |

**Dữ liệu nhạy cảm**

**39** chỗ mã hoá dữ liệu cá nhân — dữ liệu đi qua hệ thống giám sát là nhạy cảm (K-97).

**Hiểu biết về từng khách**

Cấu hình, phần làm riêng, phiên bản, lịch sử yêu cầu, đầu mối — phải nằm ở đâu đó để người khác hỗ trợ được, không chỉ trong đầu một người (K-99).

> 🗣 **Lời trình bày:** Cả hai cách đều có giá; quan trọng là phải chọn và ghi vào hợp đồng, và phải có người trực.

---

## 47. Ba việc bảo mật chuyên gia cũng không làm nhanh được

_Phần 9 · Bảo mật_

| Vấn đề | Vì sao khó | 📊 Số liệu |
| --- | --- | --- |
| Cách ly dữ liệu giữa các công ty (K-105) | Nằm trong **từng** câu đọc dữ liệu ở khắp hệ thống, không phải một chỗ cấu hình | **36/104** bảng mang trực tiếp mã công ty; ~**7** tệp kiểm thử |
| Mã AI viết chưa ai soi về bảo mật (K-106) | Kiểm thử xâm nhập và soi mã trên khối lượng này mất nhiều tuần, lặp lại sau mỗi bản lớn | ~**143.000** dòng; **0** lần kiểm thử xâm nhập |
| Vá cho mọi khách, mọi phiên bản (K-107) | Hệ quả của "khách tự chọn nâng cấp" | **7** dòng phiên bản phải vá riêng trong sự cố 12/2025 |
| Máy chủ nằm ở khách | Khách có toàn quyền; khách tự cài thì mình có thể không vào được | Bên mình kiểm soát **1/3** tầng |

> 🗣 **Lời trình bày:** 68 bảng không mang trực tiếp mã công ty phải nối qua bảng khác — một câu đọc quên nối là lộ dữ liệu công ty khác. Đây là loại lỗi không công cụ nào tự tìm hết được.

---

## 48. Câu trả lời đầu tiên cho "cần gì" là: cần người

_Lo ngại · "Lo bảo mật nhưng chưa biết cần gì"_

> Phần lớn việc bảo mật — gia cố máy chủ, quét thư viện có lỗ hổng, quản lý mật khẩu và khoá, mã hoá backup, chống dò mật khẩu — là **việc thường ngày** của một chuyên gia bảo mật hoặc một DevOps có nghề: dùng công cụ là thấy, sửa nhanh.

- **0** — chuyên gia bảo mật
- **0** — DevOps
- **0** — lần kiểm thử xâm nhập

Những việc khó thật nằm trong **cách hệ thống được xây** và trong mô hình **"mỗi khách một bản cài"**: cách ly dữ liệu giữa các công ty, mã AI chưa ai soi, vá cho mọi phiên bản, máy chủ ở khách.

> 🗣 **Lời trình bày:** Bảo mật không phải một tính năng làm một lần. Nó là một vai trò, phải có người giữ, và phải lặp lại sau mỗi bản lớn, ở mỗi khách.

---

## 49. Nội bộ thì bỏ qua được nhiều chuẩn — bán cho khách thì không

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

## 50. Bán ERP thì mình thành bên xử lý dữ liệu cá nhân cho khách

_Phần 10 · Dữ liệu cá nhân_

> Hồ sơ nhân sự có CCCD, lương, tài khoản ngân hàng, ngày nghỉ ốm — dữ liệu sức khoẻ thuộc loại **nhạy cảm**. Mỗi lần mình hỗ trợ, gỡ lỗi, sao lưu hộ hay cho khách thuê máy là mình đang xử lý dữ liệu đó (K-108).

- **5%** — doanh thu năm trước — mức phạt tối đa khi chuyển dữ liệu ra nước ngoài sai luật
- **10×** — khoản thu — mức phạt khi mua bán dữ liệu cá nhân
- **0** — mẫu hợp đồng xử lý dữ liệu

> Doanh nghiệp nhỏ và khởi nghiệp được ân hạn một số nghĩa vụ trong 5 năm (Điều 41 Nghị định 356) — cần luật sư xác nhận phần nào áp cho mình, phần nào cho khách.

> 🗣 **Lời trình bày:** Mỗi khách cần một hợp đồng xử lý dữ liệu nói rõ trách nhiệm hai bên. Đây là việc pháp lý, nhưng nó kéo theo yêu cầu kỹ thuật ở các trang sau.

---

## 51. Luật đòi "xoá dữ liệu của tôi", ERP lại phải giữ dữ liệu nhiều năm

_Phần 10 · Dữ liệu cá nhân_

**Xoá mà không gãy (K-109)**

Người nghỉ việc có quyền yêu cầu xoá, nhưng lịch sử nhân sự và chứng từ kế toán phải giữ theo luật khác. Phải thiết kế "xoá" thành **ẩn danh hoá** sao cho báo cáo cũ và các liên kết không gãy. 📊 **97** khoá ngoại trỏ tới bảng nhân viên; **0** chức năng ẩn danh hoá.

**Mã hoá mới có ở một chỗ (K-110)**

Mã hoá **4** trường của hồ sơ người mới; điện thoại, địa chỉ, mã số thuế ở các bảng khác lưu dạng thường; bản sao lưu chỉ nén, không mã hoá.

> 🗣 **Lời trình bày:** Đây là ví dụ điển hình của yêu cầu pháp lý biến thành yêu cầu thiết kế: không thể thêm vào sau một cách rẻ tiền, vì nó đụng tới mọi bảng có liên kết với nhân viên.

---

## 52. Tệp trên Google Drive, chứng nhận ISO và nhật ký

_Phần 10 · Dữ liệu cá nhân, chứng nhận_

**Dữ liệu có thể đã ra nước ngoài (K-111)**

Tệp đang lưu trên Google Drive. Chuyển dữ liệu cá nhân ra nước ngoài cần hồ sơ riêng và có mức phạt cao nhất. 📊 **1/4** nơi lưu tệp phổ biến; **73** tệp mã gắn với cây thư mục Drive.

**ISO 27001 chấm cả vận hành (K-112)**

Chứng nhận cấp cho **công ty mình**. Cài ở máy khách thì phạm vi chỉ gồm phát triển và hỗ trợ; khách thuê máy của mình thì gồm cả vận hành — nặng hơn nhiều.

**Hai câu mọi chuẩn đều hỏi (K-113)**

Người lập có tự duyệt được không? Nhật ký có ai sửa được không? 📊 Có bảng nhật ký, nhưng **0** cơ chế chống sửa ở tầng DB, và khách có toàn quyền trên DB.

> 🗣 **Lời trình bày:** Chi phí đánh giá ISO 27001 cho công ty nhỏ khoảng 20.000–23.000 USD cho 3 năm, chưa kể tư vấn và khoảng 550–600 giờ công mỗi năm nếu tự làm (ước tính của các bên tư vấn).

---

## 53. Khách bán hàng online: ERP phải nhận tiền qua VNPay, MoMo, ZaloPay…

_Phần 11 · Cổng thanh toán_

- **0/5** — cổng phổ biến đã tích hợp (VNPay, MoMo, ZaloPay, OnePay, VietQR)
- **0** — đường nhận thông báo từ bên ngoài (webhook)

**Mỗi cổng một kiểu kết nối (K-114)**

Cách ký dữ liệu, mã lỗi, luồng hoàn tiền, tệp đối soát đều khác nhau — mỗi cổng là một tích hợp phải viết, kiểm, bảo trì riêng.

**Cổng phải gọi ngược vào máy khách (K-115)**

Người mua trả xong, cổng gửi kết quả về một địa chỉ của khách ⇒ **máy chủ khách phải mở ra internet**, có tên miền, có HTTPS. Với VNPay, địa chỉ này ở môi trường thật phải đăng ký với VNPay — mỗi khách một thủ tục.

> 🗣 **Lời trình bày:** Đây là chỗ ERP chạm vào tiền thật của khách và của người mua. Nó va thẳng với mô hình "cài trong mạng nội bộ của khách".

---

## 54. Tiền phải đúng tới từng đồng — và khách mất quyền "tự chọn nâng cấp"

_Phần 11 · Cổng thanh toán_

| Khó khăn | Vì sao | 📊 |
| --- | --- | --- |
| Cổng đổi cách kết nối là khách **phải** nâng cấp (K-116) | Khách dừng ở bản cũ sẽ ngừng thu được tiền online — mâu thuẫn trực tiếp với "khách tự chọn nâng cấp" | Thêm lịch thay đổi của **5** bên ngoài |
| Tiền đúng trong mọi tình huống lỗi (K-117) | Thông báo đến hai lần, đến trước khi người mua quay lại, giao dịch treo, hoàn tiền một phần, đối soát cuối ngày | **0** chỗ khoá dòng khi ghi |
| Mỗi khách một bộ khoá bí mật (K-118) | Lưu ở đâu, ai đổi định kỳ, lộ thì thu hồi thế nào — nhân N khách, N cổng | **24** biến cho **1** công ty |
| Chuẩn thẻ PCI DSS (K-119) | Chuyển sang trang của cổng thì phạm vi nhỏ; tự nhận số thẻ thì phạm vi rất lớn | **Chưa có** quyết định |

> 🗣 **Lời trình bày:** Cổng thanh toán là ví dụ rõ nhất cho thấy "khách tự chọn nâng cấp" không đứng được: bên thứ ba đổi, mình buộc phải đổi theo, ở mọi khách.

---

## 55. Thu tiền kéo theo hoá đơn điện tử và kế toán — luật thuế không chờ khách

_Phần 11 · Hoá đơn điện tử, kế toán, sàn thương mại điện tử_

**Hoá đơn điện tử (K-120)**

Nghị định 123/2020, sửa bằng Nghị định 70/2025 — ví dụ từ 01/06/2025, hộ kinh doanh doanh thu từ 1 tỷ đồng/năm phải dùng hoá đơn từ máy tính tiền kết nối cơ quan thuế. Mỗi nhà cung cấp hoá đơn (MISA meInvoice, Viettel, VNPT, BKAV…) một kiểu kết nối; luật đổi là **mọi** khách phải nâng cấp đúng hạn. 📊 **0** tích hợp hoá đơn điện tử.

**Kế toán: tự làm hay tích hợp MISA (K-70)**

Tiền thu được phải thành chứng từ, công nợ, sổ sách. Nếu **không tự làm phân hệ kế toán** thì phải **tích hợp với phần mềm kế toán khách đang dùng** — ở Việt Nam thường là MISA: đẩy hoá đơn, phiếu thu – chi, công nợ sang và đối soát hai chiều; MISA đổi cách kết nối là mình phải đổi theo. 📊 Kế toán: **chưa có**; tích hợp kế toán: **0**.

**Sàn thương mại điện tử (K-121)**

Đơn từ Shopee, Lazada, TikTok Shop phải về ERP; tồn kho phải trừ ngay để không bán vượt. 📊 Thương mại điện tử: **chưa có**; **0** chỗ khoá dòng khi trừ kho.

> 🗣 **Lời trình bày:** Bán online không chỉ là một nút thanh toán: nó kéo theo hoá đơn, đồng bộ đơn, tồn kho thời gian thực, đối soát — mỗi thứ là một tích hợp với bên ngoài có lịch thay đổi riêng.

---

## 56. Khách 30 người và khách 50.000 người — cùng một bộ mã

_Phần 12 · Hiệu năng_

- **~1.700×** — chênh lệch số người dùng (30 so với 50.000)
- **60 triệu** — dòng sau 5 năm, nếu khách lớn thêm 1 triệu dòng/tháng
- **0** — lần kiểm thử tải; hiện chạy với 15 người dùng
- **1** — kiểu triển khai duy nhất: 1 máy ứng dụng + 1 DB trên cùng máy

- **Một kiến trúc không vừa cả hai cỡ** — kiểu lớn cho khách nhỏ thì đắt; kiểu nhỏ cho khách lớn thì sập (K-123).
- **Tính toán theo cây tổ chức** chạy mỗi khi mở màn — cây hiện tại 15 người; cây 50.000 người: chưa có số (K-127).
- **Báo cáo nặng chạy trên DB chính** làm chậm cả hệ thống lúc cuối tháng (K-128).

> 🗣 **Lời trình bày:** Khách 50.000 người bằng khoảng 3.333 lần quy mô hiện tại (K-122). Không ai biết hệ thống chịu được tới đâu vì chưa từng đo.

---

## 57. Nếu chậm, thủ phạm đầu tiên là cách viết mã

_Phần 12 · Hiệu năng_

- **~75%** — câu đọc dữ liệu không giới hạn số dòng (~790/1.050)
- **3** — chỗ phân trang ngay trong DB
- **104** — chỉ mục cho 104 bảng (trung bình 1/bảng)
- **0** — bảng chia vùng theo thời gian; 0 chính sách dọn dữ liệu cũ

> Với 10.000 dòng không ai thấy; với 60 triệu dòng là hết bộ nhớ, màn quay mãi (K-124, K-125). **32** cột JSON lọc, sắp xếp, tổng hợp chậm hơn nhiều so với cột thường (K-126).

> 🗣 **Lời trình bày:** Sửa cách đọc dữ liệu — phân trang, giới hạn số dòng, chỉ mục đúng chỗ — rẻ hơn và hiệu quả hơn mọi giải pháp hạ tầng.

---

## 58. Dữ liệu hôm nay chỉ 3,7 MB — và có cả một bậc thang cách xử lý

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

## 59. "Cắt dữ liệu từng năm" có tác dụng phụ

_Lo ngại · "Cắt dữ liệu từng năm"_

**Báo cáo nhiều năm gãy**

So sánh năm nay với năm trước, xu hướng 3–5 năm không còn dữ liệu để tính.

**Truy vết bị đứt**

Truy vết lô thuốc, hạn dùng khi thu hồi; lịch sử nhân sự, lịch sử duyệt bị mất.

**Luật đòi giữ**

Nhiều loại dữ liệu theo luật phải giữ nhiều năm; dữ liệu năm nay còn tham chiếu sang năm trước.

> Phiên bản đúng của ý tưởng này là **chia bảng theo năm ngay trong DB** (bậc 3): dữ liệu vẫn đủ, màn thường chỉ đọc năm hiện tại.

> 🗣 **Lời trình bày:** Lo ngại "dữ liệu nhiều sẽ chậm" là chính đáng cho khách lớn. Nhưng cách xử lý đúng là đi theo bậc thang, không phải xoá dữ liệu.

---

## 60. Ba kiểu cài = ba quy trình, ba mức trách nhiệm

_Phần 13 · Triển khai tại khách_

| Kiểu | Ai giữ quyền cao nhất trên máy | Bên mình vào máy để hỗ trợ bằng cách nào |
| --- | --- | --- |
| Máy thuê của bên mình | Mình | Trực tiếp |
| Máy của khách, bên mình cài | Khách | Khách phải cấp đường vào (VPN, SSH), ghi lại ai làm gì |
| Máy của khách, khách tự cài | Khách | Có thể **không có** quyền gì |

- **Lịch triển khai do IT khách quyết** — khung giờ bảo trì, phê duyệt thay đổi, kế hoạch quay lại khi hỏng; mỗi khách một quy định. Hiện triển khai bằng **1** script do người phát triển chạy, bất cứ lúc nào (K-132).
- Hướng dẫn cài hiện có: **1** bộ, gắn với hạ tầng của chính mình (K-131).

> 🗣 **Lời trình bày:** Ba kiểu cài nghe như một lựa chọn cho khách, nhưng với bên mình là ba quy trình hỗ trợ khác nhau, ba mức cam kết khác nhau.

---

## 61. Môi trường thử, định cỡ máy, đào tạo

_Phần 13 · Triển khai tại khách_

- **3** — môi trường cho 1 khách hôm nay — mỗi khách cần thêm môi trường thử (K-133)
- **0** — số liệu định cỡ — "cần máy cỡ nào?" là câu đầu tiên khách hỏi (K-134)
- **7** — vai, mỗi vai một bộ màn và luồng khác nhau
- **0** — tài liệu cho người dùng cuối — ~25.000 dòng tài liệu hiện có là cho kỹ thuật (K-135)

> 🗣 **Lời trình bày:** Đào tạo phải làm cho từng vai, từng đợt, kể cả khi khách thay người. Đây là chi phí lặp lại ở mỗi khách.

---

## 62. 8 vai cần người chịu trách nhiệm, kể cả khi dùng AI thoải mái

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

## 63. Người mới tiếp nhận chậm — kể cả có AI

_Phần 14 · Đội ngũ_

- **~143.000** — dòng mã · 1.148 tệp · 509 tệp kiểm thử
- **~1.920** — quyết định trong 182 tệp; ≥20 đã bị đảo — phải biết dòng nào còn hiệu lực
- **37%** — thay đổi là sửa lỗi — với chỉ 1 khách

- **AI đọc được mã, nhưng hiểu vì sao** một quyết định được đưa ra, chỗ nào không được đụng, vẫn cần thời gian và người kèm (K-137).
- **Một đội vừa phát triển, vừa triển khai, vừa hỗ trợ** ⇒ liên tục bị kéo ra chữa cháy ở khách, sản phẩm chậm lại đúng lúc cần đi nhanh nhất (K-138).
- **Chi phí và sự phụ thuộc vào công cụ AI** — đổi phiên bản, đổi giá, đổi cách làm; chưa đo chi phí AI trên mỗi tính năng (K-139).

> 🗣 **Lời trình bày:** Rủi ro "một người nắm hết" giảm được bằng tài liệu và kiểm thử, nhưng không giảm được bằng AI một mình.

---

## 64. Làm rối mã là gờ giảm tốc, không phải ổ khoá

_Phần 15 · Đóng gói và làm rối mã_

- **100%** — quyền quản trị máy chủ chạy phần mềm nằm ở khách (K-140)
- **104 + 89** — bảng và tệp chuyển đổi dạng chữ — không làm rối được (K-141)
- **0** — cơ chế khoá bản quyền (K-144)

- **Cấu trúc dữ liệu lộ trọn vẹn** — DB nằm trên máy khách; cấu trúc + giao diện đủ để một đội giỏi dựng lại phần lớn nghiệp vụ.
- **Gỡ lỗi khó hơn hẳn** — lỗi gửi về chỉ vị trí trong mã đã làm rối; phải giữ bản đối chiếu cho **từng** phiên bản đã giao, tới 12 bản (K-142).
- **Làm rối có thể làm hỏng hoặc chậm** — Next.js/React dựa vào tên hàm và cấu trúc mã; phải kiểm lại toàn bộ trên bản đã làm rối mỗi lần phát hành (K-143).

> 🗣 **Lời trình bày:** Chống cài chui — cài thêm cho công ty con, dùng tiếp sau khi hết hạn — cần khoá bản quyền, mà khoá chạy trên máy khách thì cũng gỡ được.

---

## 65. Ngôn ngữ lập trình không phải nút thắt chính

_Phần 16 · Công nghệ_

> Chỉ khoảng **5** khó khăn trong 159 gắn trực tiếp với nền tảng; phần còn lại giữ nguyên dù viết bằng ngôn ngữ nào. Nhưng ở lại hay chuyển đi đều có giá.

| Ở lại Node.js + Next.js + PostgreSQL | 📊 |
| --- | --- |
| Next.js đổi rất nhanh — mỗi năm một bản lớn, mỗi bản được vá ~2 năm (K-145) | 13 · 14 · 15 · 16 trong 2022–2025 |
| Chưa có "cửa" cho phần mềm khác gọi vào (API): mọi thao tác chỉ chạy qua màn web ⇒ muốn làm app di động, nối MISA, nhận kết quả từ cổng thanh toán, kéo số sang Power BI… đều phải xây lớp API trước (K-146) | **47** tệp thao tác ghi gắn vào màn; API công khai: **0** |
| Node.js xử lý trên một luồng — phép tính nặng làm chậm mọi người khác (K-147) | Chưa đo |
| IT của khách lớn quen Java, .NET, Python (K-148) | SAP: ABAP/Java · Dynamics: .NET · Odoo, ERPNext: Python |

> 🗣 **Lời trình bày:** Kết luận chuyên môn: chuyển ngôn ngữ không giải quyết được phần lớn khó khăn trong tài liệu này.

---

## 66. Chuyển sang Python / Java / Go: viết lại là làm lại từ đầu

_Phần 16 · Công nghệ_

| Lựa chọn | Được | Mất |
| --- | --- | --- |
| Python (Django, FastAPI) | Odoo, ERPNext dùng; nhiều thư viện nghiệp vụ; dễ tuyển | Chậm hơn ở tính toán nặng; vẫn cần giao diện riêng ⇒ hai ngôn ngữ |
| Java (Spring) | Chuẩn doanh nghiệp; IT khách lớn tin dùng | Nặng, phát triển chậm hơn; vẫn cần giao diện riêng |
| .NET (C#) | Như Java; hợp khách dùng hệ sinh thái Microsoft | Như Java |
| Go | Nhanh, gọn, triển khai dễ | Ít thư viện cho nghiệp vụ ERP; ít người làm ERP bằng Go |

> 📊 Phải tái hiện đúng **~143.000** dòng mã + **509** tệp kiểm thử + **~1.920** quyết định nghiệp vụ. AI dịch mã nhanh, nhưng phần tốn là **chứng minh bản mới chạy giống hệt bản cũ** (K-149).

> 🗣 **Lời trình bày:** Trong lúc viết lại thì không có tính năng mới — đúng lúc cần chứng minh sản phẩm với khách.

---

## 67. Hợp đồng và báo giá cần những thứ kỹ thuật chưa có

_Phần 17 · Thị trường, giá, hợp đồng_

| Khó khăn | 📊 |
| --- | --- |
| Hợp đồng phải ghi: tiêu chí nghiệm thu, phân định lỗi / yêu cầu mới, thời gian xử lý sự cố, số phiên bản hỗ trợ, ai chịu trách nhiệm máy chủ – DB – backup, bàn giao dữ liệu khi chấm dứt (K-150) | **0** mẫu hợp đồng; **0/7** điều khoản có quy trình đứng sau |
| Báo giá — viết mã chỉ là 1/12 bước (K-151) | **0** dữ liệu về công triển khai một khách |
| Dự án ERP thường vượt dự tính, kể cả nhà cung cấp có kinh nghiệm (K-152) | **~57%** vượt ngân sách, **57–65%** vượt thời gian |
| Giá theo cỡ khách — khách 50.000 người tốn gấp hàng trăm lần khách 30 người (K-153) | **0** mô hình chi phí |
| Giá cố định hay theo công · tiền gắn với nghiệm thu (K-154, K-155) | Chưa có số |

> 🗣 **Lời trình bày:** Phần thị trường viết ngắn vì không phải trọng tâm kỹ thuật, nhưng mỗi điều khoản hợp đồng đều cần một quy trình kỹ thuật đứng sau mới thực hiện được.

---

## 68. Một khách chưa phải là thị trường

_Phần 17 · Thị trường_

- **1** — khách tham chiếu, 15 người dùng (K-157)
- **0** — chỉ số hiệu quả đã đo — tiết kiệm bao nhiêu giờ, giảm bao nhiêu sai sót (K-158)
- **07/2026** — năm ra đời — so với SAP 1972 · MISA 1994 · Odoo 2005 (K-159)

> **Sản phẩm hay dịch vụ?** Tuỳ biến nhiều như làm dự án nhưng muốn nâng cấp đồng loạt như bán sản phẩm — đó là vị trí khó có lãi nhất (K-156).

> 🗣 **Lời trình bày:** Đối thủ có hàng chục năm, đối tác triển khai, tài liệu và cộng đồng. Lợi thế của mình phải nằm ở chỗ khác — và cần khách thứ hai, thứ ba để biết hệ thống hợp với ai.

---

## 69. Ba cấp khách, ba cách cài

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

## 70. Một bộ mã phục vụ nhiều khách: ngành đã đi ba con đường

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

## 71. So sánh S với A, B, C

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

## 72. Phương án S dùng mã của A, nhưng chịu chi phí của B

_Bốn phương án_

> "Một bộ mã, file cấu hình quyết định" là cách của A. Nhưng "cài ở máy khách, khách tự chọn nâng cấp" làm **mỗi khách dừng ở một phiên bản** — mỗi phiên bản còn chạy là một bộ mã phải vá, phải hỗ trợ: tức là B.

- **10** — khách dừng ở 10 bản khác nhau ⇒ 10 bộ mã phải vá (ra bản mỗi tháng)
- **7** — dòng phiên bản Next.js phải vá trong sự cố 12/2025
- **434** — lần thay đổi mã trong ~2 tháng với 1 khách

Khác B ở chỗ các bộ mã đó **không sinh ra để chiều khách**, mà do khách ngừng nâng cấp vào những lúc khác nhau — nên **không chiều khách được như B** (K-100).

> 🗣 **Lời trình bày:** Đây là kết luận quan trọng nhất của phần so sánh. Phương án S gánh chi phí bảo trì của B mà không có lợi thế chiều khách của B, và cần nền tảng của A mà chưa có.

---

## 73. A khó với khách Việt, B tốn theo số khách, C cần thứ chưa có

_Bốn phương án_

**A đòi nói "không" (K-101)**

Doanh nghiệp chọn ERP làm riêng thay vì MISA, SAP thường **chính vì quy trình của họ không khớp phần mềm chuẩn**. Mỗi lần nói "có" khi chưa có điểm mở rộng là trượt từ A sang B. 📊 Ngay 1 khách nội bộ: ~1.920 quyết định, ≥20 bị đảo.

**B: AI làm rẻ việc tạo, không làm rẻ việc giữ (K-102)**

Mỗi bộ mã riêng phải vá bảo mật, nâng nền tảng khi hết hỗ trợ, có người hiểu khi khách gọi. 📊 10 khách × ~143.000 dòng = **1,43 triệu** dòng; mỗi lần nền tảng hết hạn là **10** dự án nâng cấp.

**C: đường các hãng lớn đã chọn (K-103)**

Microsoft bỏ cách sửa thẳng mã Navision cho từng khách để chuyển sang gói mở rộng; SAP gọi là "clean core". 📊 **0** điểm mở rộng · **0/3** tính năng nền tảng · **1/3** số khách cần để vẽ đúng khuôn chung.

> 🗣 **Lời trình bày:** C không miễn phí: nó cần đúng ba tính năng nền tảng ở Phần 4 và các điểm mở rộng có phiên bản. Nhưng đó là con đường đã được chứng minh ở quy mô lớn.

---

## 74. Mỗi phương án là một kiểu công ty khác nhau

_Bốn phương án · tổ chức công ty_

| | Đội ngũ cốt lõi | Ai quyết làm gì tiếp | Ai làm việc với khách | Rủi ro tổ chức |
| --- | --- | --- | --- | --- |
| **A** | Nhóm sản phẩm · nhóm nền tảng · nhóm theo module · kiểm thử tự động · vận hành 24/7 · bảo mật · hỗ trợ 3 tầng | Quản lý sản phẩm, theo **số đông** khách | Đội triển khai: cấu hình, nhập dữ liệu, đào tạo — **không sửa mã** | Mất khách có quy trình khác chuẩn |
| **B** | Mỗi khách một nhóm dự án · người phụ trách khách · đội bảo trì theo hợp đồng · nhóm nhỏ giữ thư viện chung | Từng khách, cho bộ mã của họ | Chính nhóm dự án | Đội bảo trì phình theo số khách; người nghỉ mang theo hiểu biết |
| **C** | Như A cho lõi · nhóm (hoặc đối tác) làm gói mở rộng · kiến trúc sư giữ "hợp đồng" điểm mở rộng · khâu duyệt gói riêng | Lõi: quản lý sản phẩm. Gói riêng: khách đặt | Đội triển khai + nhóm gói mở rộng | Giữ kỷ luật "không ai sửa lõi cho một khách" |
| **S** | Cần **cả** đội của A **và** đội của B · cộng đội vận hành từ xa cho N máy chủ không phải của mình | Chưa rõ | Chưa rõ — đội cấu hình hay đội sửa mã | Gánh chi phí của cả A lẫn B |

> 🗣 **Lời trình bày:** Đổi phương án giữa chừng là tái cơ cấu công ty, không chỉ là sửa mã (K-104). Hiện 0/8 vai kỹ thuật có người riêng.

---

## 75. Phải chọn hướng trước khi viết thêm module

_Kết_

**Nếu chọn A hoặc C**

Từ hôm nay mọi module mới phải viết trên **ba tính năng nền tảng**: trường theo khách, quy trình duyệt theo khách, cây đơn vị do khách khai. Mỗi module viết theo cách cũ là thêm một module phải làm lại.

**Nếu chọn B**

Không cần nền tảng, nhưng **phí bảo trì và đội bảo trì theo số khách** phải có ngay trong báo giá đầu tiên.

> Mỗi tuần chưa chọn là thêm mã viết theo khuôn "một công ty" — đúng thứ sẽ phải làm lại.

> 🗣 **Lời trình bày:** Đây là đề xuất hành động duy nhất của buổi trình bày: chọn hướng, rồi mới quyết các câu hỏi còn lại.

---

## 76. Những câu cần trả lời trước khi đi tiếp

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

---

## 77. Tài liệu đầy đủ và nguồn số liệu

_Kết · nguồn_

- **Tài liệu đầy đủ:** [159 khó khăn, 17 phần](../tai-lieu/ban-erp-cho-khach-hang.html) — mỗi khó khăn có mã K-xx và dòng 📊 số liệu.
- **Số liệu đo trên hệ thống** (Phụ lục B): đếm trên kho mã nhánh phát triển ngày 05/11/2026 và bản sao dữ liệu production 21/09/2026.
- **Nguồn bên ngoài** (Phụ lục C): CVE-2025-55182 · chính sách vòng đời Next.js, Node.js, PostgreSQL · Panorama Consulting · Luật 91/2025/QH15 · Nghị định 356/2025 · Luật 116/2025/QH15 · Nghị định 70/2025 · ISO/IEC 27001:2022 · OWASP ASVS 5.0 · tài liệu VNPay.

> Các mục luật lấy từ bài phân tích của công ty luật, kiểm toán và báo chí — cần luật sư đối chiếu văn bản gốc trước khi dùng cho hợp đồng.

> 🗣 **Lời trình bày:** Ai muốn kiểm lại một con số thì mở tài liệu đầy đủ, tìm mã K-xx tương ứng, rồi xem cách đo ở Phụ lục B.

---

## 78. Đi sai hướng thì nhanh mấy cũng vô ích

![Đi sai hướng thì nhanh mấy cũng vô ích](assets/sai-huong.png)

_Kết_

AI giúp mình đi **rất nhanh**. Trước khi tăng tốc, hãy chắc chắn mình đang đi **đúng hướng**.

> 🗣 **Lời trình bày:** Câu trên ảnh: "Speed is irrelevant if you are going in the wrong direction" — tốc độ không còn ý nghĩa nếu đi sai hướng. Đây là lời kết: tốc độ viết mã nhờ AI là thật, nhưng hướng đi — một bộ mã hay nhiều bộ mã, xây nền tảng trước hay nhận khách trước — phải chốt trước khi tăng tốc.
