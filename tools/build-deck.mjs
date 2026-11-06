// Dựng bộ slide từ thư viện slide Markdown.
//   node tools/build-deck.mjs
// Nguồn: nguon/slides/*.md (mỗi slide bắt đầu bằng dòng "@@ id: ...") + nguon/decks.json (thứ tự slide của từng bộ).
// Kết quả: slides/<bộ>.html (trình chiếu) và slides/<bộ>.md (bản đọc trên GitHub).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const libDir = path.join(root, 'nguon', 'slides');
const decks = JSON.parse(fs.readFileSync(path.join(root, 'nguon', 'decks.json'), 'utf8'));

const library = new Map();
for (const f of fs.readdirSync(libDir).filter((f) => f.endsWith('.md')).sort()) {
  const text = fs.readFileSync(path.join(libDir, f), 'utf8').replace(/\r\n/g, '\n');
  const chunks = text.split(/^(?=@@ id:)/m).filter((c) => c.startsWith('@@ id:'));
  for (const chunk of chunks) {
    const lines = chunk.split('\n');
    const meta = {};
    let i = 0;
    while (i < lines.length && lines[i].startsWith('@@ ')) {
      const m = lines[i].match(/^@@ (\w+):\s*(.*)$/);
      if (m) meta[m[1]] = m[2].trim();
      i++;
    }
    let body = lines.slice(i).join('\n').trim();
    let title = '';
    const tm = body.match(/^# (.+)$/m);
    if (tm) {
      title = tm[1].trim();
      body = body.replace(tm[0], '').trim();
    }
    let notes = '';
    const nm = body.match(/^Ghi chú:\s*([\s\S]*)$/m);
    if (nm) {
      notes = nm[1].trim();
      body = body.slice(0, nm.index).trim();
    }
    if (library.has(meta.id)) throw new Error(`Trùng id slide: ${meta.id}`);
    library.set(meta.id, { ...meta, title, body, notes, file: f });
  }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(s) {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  out = out.replace(/(^|[^\w*])_([^_]+)_(?=[^\w]|$)/g, '$1<i>$2</i>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}
function cellClass(c) {
  if (c.startsWith('✅')) return ' class="ok"';
  if (c.startsWith('🟡')) return ' class="part"';
  if (c.startsWith('❌')) return ' class="no"';
  return '';
}

function renderBlocks(src) {
  const lines = src.split('\n');
  const out = [];
  let i = 0;
  const para = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para.length = 0;
  };
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { flush(); i++; continue; }
    const fence = line.match(/^:::(\w+)\s*(.*)$/);
    if (fence) {
      flush();
      const kind = fence[1];
      const arg = fence[2];
      const inner = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      i++;
      if (kind === 'stats') {
        const items = inner.filter((l) => l.trim()).map((l) => {
          const [v, ...cap] = l.split('|');
          return `<div class="stat"><div class="num">${inline(v.trim())}</div><div class="cap">${inline(cap.join('|').trim())}</div></div>`;
        });
        out.push(`<div class="stats n${items.length}">${items.join('')}</div>`);
      } else if (kind === 'cols') {
        const cards = [];
        let cur = null;
        for (const l of inner) {
          const h = l.match(/^### (.+)$/);
          if (h) { cur = { h: h[1], body: [] }; cards.push(cur); }
          else if (cur) cur.body.push(l);
        }
        const hl = arg.trim();
        out.push(`<div class="cols n${cards.length}">${cards.map((c, k) => {
          const hot = hl && hl.split(',').map(Number).includes(k + 1) ? ' hot' : '';
          return `<div class="card${hot}"><h3>${inline(c.h)}</h3>${renderBlocks(c.body.join('\n'))}</div>`;
        }).join('')}</div>`);
      } else if (kind === 'note') {
        out.push(`<div class="note">${renderBlocks(inner.join('\n'))}</div>`);
      } else if (kind === 'big') {
        out.push(`<div class="big">${renderBlocks(inner.join('\n'))}</div>`);
      }
      continue;
    }
    if (line.startsWith('> ')) {
      flush();
      const buf = [];
      while (i < lines.length && lines[i].startsWith('> ')) buf.push(lines[i++].slice(2));
      out.push(`<p class="lead">${inline(buf.join(' '))}</p>`);
      continue;
    }
    if (line.startsWith('## ')) { flush(); out.push(`<h4>${inline(line.slice(3))}</h4>`); i++; continue; }
    if (/^\s*\|/.test(line)) {
      flush();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const bodyRows = rows.slice(2).map(cells);
      out.push(`<table><thead><tr>${head.map((h) => `<th>${inline(h)}</th>`).join('')}</tr></thead><tbody>${bodyRows
        .map((r) => `<tr>${r.map((c) => `<td${cellClass(c)}>${inline(c)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table>`);
      continue;
    }
    const li = line.match(/^(\s*)([-*]|\d+\.) (.*)$/);
    if (li) {
      flush();
      const ordered = /\d+\./.test(li[2]);
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)([-*]|\d+\.) (.*)$/);
        if (m) { items.push(m[3]); i++; continue; }
        if (lines[i].startsWith('  ') && lines[i].trim() && items.length) { items[items.length - 1] += ' ' + lines[i].trim(); i++; continue; }
        break;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`);
      continue;
    }
    para.push(line.trim());
    i++;
  }
  flush();
  return out.join('\n');
}

function readableBlocks(src) {
  const lines = src.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const fence = lines[i].match(/^:::(\w+)/);
    if (fence) {
      const kind = fence[1];
      const inner = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      i++;
      if (kind === 'stats') {
        out.push(inner.filter((l) => l.trim()).map((l) => {
          const [v, ...cap] = l.split('|');
          return `- **${v.trim().replace(/\*\*/g, '')}** — ${cap.join('|').trim()}`;
        }).join('\n'));
      } else if (kind === 'cols') {
        const parts = [];
        for (const l of inner) {
          const h = l.match(/^### (.+)$/);
          if (h) parts.push(`\n**${h[1].replace(/\*\*/g, '')}**\n`);
          else parts.push(l);
        }
        out.push(parts.join('\n').trim());
      } else if (kind === 'note') {
        out.push(inner.map((l) => (l.trim() ? '> ' + l : '>')).join('\n'));
      } else {
        out.push(inner.join('\n'));
      }
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const css = fs.readFileSync(path.join(root, 'tools', 'deck.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'tools', 'deck.js'), 'utf8');

for (const deck of decks) {
  const slides = deck.slides.map((id) => {
    const s = library.get(id);
    if (!s) throw new Error(`[${deck.file}] thiếu slide: ${id}`);
    return s;
  });
  const total = slides.length;
  const html = slides.map((s, k) => {
    const n = k + 1;
    const layout = s.layout || 'default';
    const head = layout === 'image'
      ? `<div class="image-wrap"><img src="${esc(s.image || '')}" alt="${esc(s.title)}"><div class="image-text"><p class="kicker">${inline(s.kicker || '')}</p><h1>${inline(s.title)}</h1><div class="content">${renderBlocks(s.body)}</div></div></div>`
      : layout === 'cover'
      ? `<div class="cover-wrap"><p class="kicker">${inline(s.kicker || '')}</p><h1>${inline(s.title)}</h1><div class="content">${renderBlocks(s.body)}</div></div>`
      : `<header><p class="kicker">${inline(s.kicker || '')}</p><h2>${inline(s.title)}</h2></header><div class="content">${renderBlocks(s.body)}</div>`;
    const foot = layout === 'cover' || layout === 'image' ? '' : `<footer><span>${esc(deck.footer)}</span><span>${n} / ${total}</span></footer>`;
    return `<section class="slide ${layout}" id="s${n}" data-title="${esc(s.title)}">${head}${foot}<aside class="notes">${inline(s.notes)}</aside></section>`;
  }).join('\n');
  const page = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(deck.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="viewport"><div class="deck">
${html}
</div></div>
<div class="bar"><div class="progress"></div></div>
<nav class="controls">
  <a href="../index.html" class="home" data-tip="Về trang chính">⌂</a>
  <button class="prev" aria-label="Trang trước">‹</button>
  <span class="counter"></span>
  <button class="next" aria-label="Trang sau">›</button>
  <button class="notes-toggle" aria-label="Lời trình bày">Ghi chú</button>
</nav>
<div class="notes-panel"><div class="notes-text"></div></div>
<script>${js}</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, 'slides', deck.file + '.html'), page);

  const md = [
    `# ${deck.title}`,
    '',
    `> ${deck.summary} · **${total} trang** · [Xem dạng trình chiếu](${deck.file}.html) · [Tài liệu đầy đủ](../tai-lieu/ban-erp-cho-khach-hang.html)`,
    '',
    ...slides.map((s, k) => {
      const body = readableBlocks(s.body);
      return [
        '---',
        '',
        `## ${k + 1}. ${s.title}`,
        s.image ? `
![${s.title}](${s.image})` : '',
        s.kicker ? `\n_${s.kicker}_` : '',
        '',
        body,
        '',
        s.notes ? `> 🗣 **Lời trình bày:** ${s.notes}` : '',
        '',
      ].join('\n');
    }),
  ].join('\n').replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(path.join(root, 'slides', deck.file + '.md'), md);
  console.log(`${deck.file}: ${total} trang`);
}

const used = new Set(decks.flatMap((d) => d.slides));
const unused = [...library.keys()].filter((id) => !used.has(id));
if (unused.length) console.log('Slide chưa dùng:', unused.join(', '));
