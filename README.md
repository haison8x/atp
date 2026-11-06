# Bán ERP cho khách ngoài — những khó khăn kỹ thuật

Tài liệu thảo luận: 159 khó khăn khi đóng gói một hệ thống ERP đang chạy nội bộ để bán cho khách hàng bên ngoài, mỗi mục kèm số liệu đo trên chính hệ thống.

## Nội dung

| | HTML | Markdown |
| --- | --- | --- |
| Slide bản vừa — 41 trang | [slides/ban-vua-40-trang.html](slides/ban-vua-40-trang.html) | [slides/ban-vua-40-trang.md](slides/ban-vua-40-trang.md) |
| Slide bản đầy đủ — 78 trang | [slides/ban-day-du.html](slides/ban-day-du.html) | [slides/ban-day-du.md](slides/ban-day-du.md) |
| Tài liệu đầy đủ (159 khó khăn, 17 phần) | [tai-lieu/ban-erp-cho-khach-hang.html](tai-lieu/ban-erp-cho-khach-hang.html) | [tai-lieu/ban-erp-cho-khach-hang.md](tai-lieu/ban-erp-cho-khach-hang.md) |

Trang chính khi bật GitHub Pages: `index.html`.

## Trình chiếu

`←` `→` / `Space` chuyển trang · `N` lời trình bày · `F` toàn màn hình · `Ctrl+P` in ra PDF (mỗi trang một tờ). Mỗi trang có địa chỉ riêng: `…/ban-vua-40-trang.html#12`.

## Sửa nội dung slide

Slide không viết tay bằng HTML. Nguồn nằm ở:

- `nguon/slides/*.md` — thư viện slide; mỗi slide bắt đầu bằng `@@ id: …`, có `@@ kicker:` và `@@ layout:` (`default` · `dark` · `cover` · `image` — kèm `@@ image: assets/<tệp>`), tiêu đề `# …`, phần thân Markdown, và lời trình bày sau dòng `Ghi chú:`.
  Khối đặc biệt: `:::stats` (mỗi dòng `số | chú thích`), `:::cols [số thẻ tô nổi]` (mỗi thẻ mở bằng `### tiêu đề`), `:::note`.
- `nguon/decks.json` — thứ tự slide của từng bộ (một slide dùng chung được cho nhiều bộ).

Dựng lại cả hai bộ (Node.js 18+):

```bash
node tools/build-deck.mjs
```

Tài liệu HTML dựng từ Markdown:

```bash
node tools/md2html.mjs tai-lieu/ban-erp-cho-khach-hang.md tai-lieu/ban-erp-cho-khach-hang.html
```
