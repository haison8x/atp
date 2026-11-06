# Bán ERP cho khách ngoài — bản ngắn (20 trang)

> Bản ngắn, trình bày khoảng 20 phút · **20 trang** · [Xem dạng trình chiếu](ban-ngan-20-trang.html) · [Tài liệu đầy đủ](../tai-lieu/ban-erp-cho-khach-hang.html)

---

## 1. Bán ERP cho khách ngoài: cần gì để làm được

_Bản ngắn · 20 trang_

Những khó khăn kỹ thuật phải giải trước khi bán — mỗi ý kèm **số liệu đo trên chính hệ thống đang chạy**.

> 🗣 **Lời trình bày:** Bản ngắn, khoảng 20 phút. Mục tiêu buổi này không phải bàn "có nên bán hay không", mà là "muốn bán được thì phải làm thêm những gì". Mọi con số đều đo trên hệ thống hiện tại; tài liệu đầy đủ có nguồn đo của từng con số.

---

## 2. Mục tiêu chung và mô hình đang đề xuất

_Mở đầu_

> Mục tiêu: **xây được một sản phẩm đáp ứng nhu cầu của nhiều khách hàng**. Câu hỏi hôm nay là "làm thế nào", không phải "có nên".

**Mô hình đang đề xuất — phương án S**

- Khách gửi yêu cầu bằng chữ, ảnh → cấu hình → sửa mã nếu cần → triển khai
- **Một bộ mã**; bản mới như Windows, khách **tự chọn** nâng cấp
- **File cấu hình** quyết định tính năng của từng khách
- Cài ở máy khách hoặc máy thuê; **khách tự quản DB**
- Không giao mã nguồn, **làm rối mã**

**Cách đọc các trang sau**

- Mỗi khó khăn có mã **K-xx**, tra được trong tài liệu đầy đủ (159 mục)
- Mỗi ý có **số liệu đo trên chính hệ thống đang chạy**
- Cuối bộ: so sánh S với ba con đường ngành đã đi, và những câu cần trả lời

> 🗣 **Lời trình bày:** Đây không phải tài liệu phản đối ý tưởng. Hệ thống chạy tốt cho một công ty; câu hỏi là cần thêm gì để chạy tốt cho nhiều công ty khác nhau.

---

## 3. Năm điều kiện thuận lợi hôm nay — cả năm sẽ mất khi bán

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

## 4. Thêm một ô, thêm một bước duyệt — đều phải sửa mã cho mọi khách

_Một bộ mã cho nhiều khách_

## Thêm một ô vào biểu mẫu

- **66** — bảng từ điển khai cột cứng trong mã
- **~243** — chỗ đọc ô theo vị trí cột
- **0** — bảng khai báo trường theo công ty

## Thêm một bước duyệt

- **38** — luồng trạng thái (bước duyệt) cố định trong DB
- **8+** — hàm tính chuỗi duyệt riêng, mỗi module một kiểu
- **0** — chỗ khai báo quy trình theo công ty

> Ví dụ: tiếp nhận nhân sự mới luôn đúng **2** bước duyệt; nghỉ phép chỉ có **4** loại; ≤ 3 ngày thì 1 cấp — giống nhau cho mọi công ty.

> 🗣 **Lời trình bày:** Hai khách dùng cùng chức năng, khách B chỉ muốn thêm một ô hay công ty X thêm một bước duyệt: hôm nay đều là sửa mã và chuyển đổi DB cho mọi khách. Ba tính năng nền tảng (hai trang sau) là cách gỡ đúng hai ví dụ này.

---

## 5. Hai công ty có số cấp tổ chức khác nhau

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

## 6. Ba tính năng nền tảng phải xây, rồi chuyển từng module sang

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

## 7. Nâng cấp hỏng thì không có nút "quay lại"

_Phần 1 · Dữ liệu của khách_

- **0/89** — bước chuyển đổi có đường lùi (K-01)
- **24 giờ** — dữ liệu có thể mất — backup 1 lần/ngày
- **88** — bước phải chạy liên tiếp nếu khách cài bản đầu, nay mới nâng (K-02)

- **Máy phát triển luôn "đạt", máy thật mới hỏng** — đổi tên một giá trị lựa chọn đã làm máy thật hỏng khi nâng cấp; lỗi loại này ghi **6** lần (K-03).
- **Dữ liệu mỗi khách một kiểu** — riêng lỗi số kiểu Việt `319,87` bị đọc thành 0 đã vấp **5** lần (K-04).
- **Lỗi chỉ lộ trên dữ liệu thật** — chạy tác vụ thật trên bản sao dữ liệu thật mới lộ **140** dòng bị khoá nhầm (K-05).

> 🗣 **Lời trình bày:** "Khách tự chọn nâng cấp" nghĩa là có khách đứng yên hai năm rồi nhảy thẳng lên bản mới nhất, chạy một chuỗi bước chuyển đổi chưa ai chạy thử trên dữ liệu mình không được nhìn thấy.

---

## 8. Lỗ hổng bảo mật không chờ khách sẵn sàng

_Phần 2 · "Như Windows"_

- **10/10** — điểm nghiêm trọng — CVE-2025-55182 (12/2025)
- **1** — lần gửi yêu cầu là chiếm được máy chủ, không cần đăng nhập
- **7** — dòng phiên bản Next.js phải ra bản vá riêng

> Lỗ hổng **đã bị khai thác thật**, và hệ thống đang dùng đúng nền tảng này. Khách "chọn không nâng cấp" thì máy chủ của họ mở toang.

- Phải chọn: **ép** cập nhật (tức là không còn "khách tự chọn") hoặc **vá ngược** cho từng phiên bản cũ (K-19).
- Windows **ép** cập nhật bảo mật mỗi tháng, và không phải chuyển đổi dữ liệu kế toán, kho, nhân sự mỗi lần nâng (K-21).

> 🗣 **Lời trình bày:** Đây là ví dụ thật, không phải giả định. Một nền tảng phổ biến bị lỗ hổng 10/10, chỉ một yêu cầu là chiếm máy chủ. Nếu lúc đó mình có 10 khách ở 10 phiên bản, mình phải vá 10 lần, hoặc ép tất cả nâng cấp.

---

## 9. "Khách gửi → làm → triển khai" bỏ qua 9/12 bước

_Quy trình_

- **12** — bước giữa "khách gửi" và "triển khai"
- **3** — bước mô hình đang nhắc tới: tiếp nhận, phát triển, triển khai
- **0** — kiểm thử viên · 0 mẫu biên bản nghiệm thu · 0 tiêu chí viết trước
- **8 + 6** — vai cần ở phía mình + vai cần ở phía khách

> Bỏ bước nào thì rủi ro của bước đó dồn xuống **lúc nghiệm thu** — đúng lúc tốn kém nhất để sửa. Ngay với khách nội bộ, yêu cầu đã qua **≥5** phiên bản bản vẽ rồi bỏ hẳn cách giao bằng bản vẽ.

> 🗣 **Lời trình bày:** Chín bước bị bỏ qua gồm làm rõ, phân loại, ước lượng, chốt tiêu chí nghiệm thu, đánh giá ảnh hưởng tới khách khác, kiểm thử độc lập, nghiệm thu, đào tạo, hỗ trợ sau bàn giao.

---

## 10. 46 loại kiểm thử một ERP thương mại cần: 29 loại đang là 0

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

## 11. AI viết nhanh hơn người đọc

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

## 12. N máy chủ ở N khách, chưa có người chuyên nghiệp

_Vận hành · bảo mật_

- **0** — DevOps · 0 chuyên gia bảo mật · 0 lần kiểm thử xâm nhập
- **1/3** — tầng bên mình kiểm soát — ứng dụng; máy chủ và mạng là của khách
- **36/104** — bảng mang trực tiếp mã công ty — cách ly dữ liệu nằm trong từng câu đọc
- **4 → 7–9** — dịch vụ mỗi khách khi thêm giám sát, hàng đợi, bộ nhớ đệm

> Phần lớn việc vận hành, bảo mật là **dễ với người có nghề** — dùng công cụ là thấy. Cái khó là **không có người làm**, và khi bán thì mỗi việc làm lại ở **N** nơi. Khi khách báo lỗi, mình **không thấy** dữ liệu, **không giữ** máy chủ.

> 🗣 **Lời trình bày:** Lo ngại bảo mật có câu trả lời đầu tiên rất rõ: cần người. Những việc khó thật nằm trong cách hệ thống được xây: cách ly dữ liệu giữa công ty, mã AI chưa ai soi, vá cho mọi phiên bản.

---

## 13. Dữ liệu hôm nay chỉ 3,7 MB — và có cả một bậc thang cách xử lý

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

## 14. Luật bảo vệ dữ liệu cá nhân đã có hiệu lực — không phải lựa chọn

_Luật · dữ liệu cá nhân_

**Bắt buộc theo luật**

Luật Bảo vệ dữ liệu cá nhân 91/2025 (từ 01/01/2026) · Luật An ninh mạng 116/2025 (từ 01/07/2026). Phạt tới **5%** doanh thu năm trước.

**Khách lớn sẽ hỏi**

ISO/IEC 27001:2022 — chứng nhận cách công ty mình quản lý an toàn thông tin, **93** biện pháp, đánh giá mỗi năm.

**Nên tự làm trước**

OWASP ASVS 5.0 — bảng kiểm bảo mật ứng dụng miễn phí, ~350 yêu cầu. SOC 2, SOX, GDPR: chỉ khi có khách nước ngoài.

> 📊 Bán ERP thì mình thành **bên xử lý dữ liệu cá nhân** cho khách: **0** chức năng đồng ý / xem / xoá dữ liệu · **97** khoá ngoại trỏ tới nhân viên (khó "xoá dữ liệu của tôi") · tệp lưu trên Google Drive có thể bị coi là chuyển dữ liệu ra nước ngoài.

> 🗣 **Lời trình bày:** Các mục luật lấy từ bài phân tích của công ty luật, kiểm toán; cần luật sư đối chiếu văn bản gốc.

---

## 15. Cổng thanh toán và hoá đơn điện tử

_Tích hợp_

- **0/5** — cổng thanh toán phổ biến đã tích hợp
- **0** — tích hợp hoá đơn điện tử
- **0** — đường nhận thông báo từ bên ngoài

- **Cổng phải gọi ngược vào máy chủ của khách** ⇒ máy khách phải mở ra internet, có tên miền, HTTPS.
- **Cổng đổi cách kết nối là khách phải nâng cấp** — không còn "khách tự chọn nâng cấp".
- **Tiền phải đúng tới từng đồng**: thông báo trùng, giao dịch treo, hoàn tiền một phần, đối soát cuối ngày.
- **Luật thuế đổi** (Nghị định 70/2025) là mọi khách phải nâng cấp đúng hạn.

> 🗣 **Lời trình bày:** Khách bán hàng online sẽ đòi những thứ này ngay từ đầu. Mỗi tích hợp có lịch thay đổi riêng của bên ngoài, chồng lên lịch phát hành của mình.

---

## 16. Ba cấp khách, tám vai, chưa vai nào có người riêng

_Con người_

**Cấp nhỏ · < 100 người**

1 máy, ứng dụng và DB chung. Dữ liệu không phải vấn đề.

**Cấp vừa · 100 – 2.000**

DB tách máy riêng. Lo báo cáo chậm, giám sát.

**Cấp lớn · > 2.000**

Nhiều máy, bản sao DB, hàng đợi. Lo tải, dữ liệu lớn.

- **8** — vai kỹ thuật cần: DBA, kiểm thử, kiến trúc sư, review mã, phân tích nghiệp vụ, DevOps, hỗ trợ, bảo mật
- **0** — vai đang có người riêng
- **1** — cách cài hiện có (cấp nhỏ); 0 lần kiểm thử tải

> 🗣 **Lời trình bày:** AI giúp mỗi người làm nhanh hơn, nhưng không thay được người ký "bản này đủ an toàn để giao" ở từng khâu.

---

## 17. Một bộ mã phục vụ nhiều khách: ngành đã đi ba con đường

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

## 18. Phương án S dùng mã của A, nhưng chịu chi phí của B

_Bốn phương án_

> "Một bộ mã, file cấu hình quyết định" là cách của A. Nhưng "cài ở máy khách, khách tự chọn nâng cấp" làm **mỗi khách dừng ở một phiên bản** — mỗi phiên bản còn chạy là một bộ mã phải vá, phải hỗ trợ: tức là B.

- **10** — khách dừng ở 10 bản khác nhau ⇒ 10 bộ mã phải vá (ra bản mỗi tháng)
- **7** — dòng phiên bản Next.js phải vá trong sự cố 12/2025
- **434** — lần thay đổi mã trong ~2 tháng với 1 khách

Khác B ở chỗ các bộ mã đó **không sinh ra để chiều khách**, mà do khách ngừng nâng cấp vào những lúc khác nhau — nên **không chiều khách được như B** (K-100).

> 🗣 **Lời trình bày:** Đây là kết luận quan trọng nhất của phần so sánh. Phương án S gánh chi phí bảo trì của B mà không có lợi thế chiều khách của B, và cần nền tảng của A mà chưa có.

---

## 19. Mỗi phương án là một kiểu công ty khác nhau

_Bốn phương án · tổ chức công ty_

| | Đội ngũ cốt lõi | Ai quyết làm gì tiếp | Ai làm việc với khách | Rủi ro tổ chức |
| --- | --- | --- | --- | --- |
| **A** | Nhóm sản phẩm · nhóm nền tảng · nhóm theo module · kiểm thử tự động · vận hành 24/7 · bảo mật · hỗ trợ 3 tầng | Quản lý sản phẩm, theo **số đông** khách | Đội triển khai: cấu hình, nhập dữ liệu, đào tạo — **không sửa mã** | Mất khách có quy trình khác chuẩn |
| **B** | Mỗi khách một nhóm dự án · người phụ trách khách · đội bảo trì theo hợp đồng · nhóm nhỏ giữ thư viện chung | Từng khách, cho bộ mã của họ | Chính nhóm dự án | Đội bảo trì phình theo số khách; người nghỉ mang theo hiểu biết |
| **C** | Như A cho lõi · nhóm (hoặc đối tác) làm gói mở rộng · kiến trúc sư giữ "hợp đồng" điểm mở rộng · khâu duyệt gói riêng | Lõi: quản lý sản phẩm. Gói riêng: khách đặt | Đội triển khai + nhóm gói mở rộng | Giữ kỷ luật "không ai sửa lõi cho một khách" |
| **S** | Cần **cả** đội của A **và** đội của B · cộng đội vận hành từ xa cho N máy chủ không phải của mình | Chưa rõ | Chưa rõ — đội cấu hình hay đội sửa mã | Gánh chi phí của cả A lẫn B |

> 🗣 **Lời trình bày:** Đổi phương án giữa chừng là tái cơ cấu công ty, không chỉ là sửa mã (K-104). Hiện 0/8 vai kỹ thuật có người riêng.

---

## 20. Chọn hướng trước — rồi trả lời năm câu

_Kết_

**Chọn hướng trước khi viết thêm module**

Chọn A hoặc C ⇒ mọi module mới phải viết trên ba tính năng nền tảng. Chọn B ⇒ phí và đội bảo trì theo số khách phải có trong báo giá đầu tiên.

**Năm câu cần trả lời**

1. Nâng cấp hỏng, dữ liệu mất — xử lý thế nào?
2. Lỗ hổng như 12/2025: ép nâng cấp hay vá ngược?
3. Ai kiểm thử, ai nghiệm thu, theo tiêu chí nào?
4. Làm cho cỡ khách nào trước?
5. Ai giữ 8 vai kỹ thuật?

> 🗣 **Lời trình bày:** Tài liệu đầy đủ có 159 khó khăn, mỗi mục kèm số liệu đo trên hệ thống hiện tại. Bản 40 trang và bản đầy đủ đi sâu từng phần.
