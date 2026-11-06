import fs from 'node:fs';

const [, , src, out] = process.argv;
const md = fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n');
const lines = md.split('\n');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
function headingId(t) {
  let m = t.match(/^Phần (\d+)/);
  if (m) return 'phan-' + m[1];
  m = t.match(/^Phụ lục ([A-Z])/);
  if (m) return 'phu-luc-' + m[1].toLowerCase();
  return slug(t);
}

function inline(s, opts = {}) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  const links = [];
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => { links.push([t, u]); return `\u0001${links.length - 1}\u0001`; });
  s = esc(s);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])_(.+?)_(?=[\s.,;:)!?]|$)/g, '$1<em>$2</em>');
  if (!opts.noLinks) {
    s = s.replace(/\bK-(\d{2,3})\b/g, '<a class="kref" href="#K-$1">K-$1</a>');
    s = s.replace(/Phần (\d+)(\.\d+)?/g, (m, n) => `<a class="pref" href="#phan-${n}">${m}</a>`);
  }
  s = s.replace(/\u0001(\d+)\u0001/g, (_, i) => {
    const [t, u] = links[i];
    return `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`;
  });
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[i])}</code>`);
  return s;
}

function parseRow(l) {
  l = l.trim();
  if (l.startsWith('|')) l = l.slice(1);
  if (l.endsWith('|')) l = l.slice(0, -1);
  return l.split('|').map((c) => c.trim());
}
function cellClass(c) {
  if (c.startsWith('❌')) return ' class="st-bad"';
  if (c.startsWith('🟡')) return ' class="st-mid"';
  if (c.startsWith('✅')) return ' class="st-ok"';
  return '';
}
function renderTable(rows) {
  const head = parseRow(rows[0]);
  const body = rows.slice(2).map(parseRow);
  const groupFirst = head[0] === 'Nhóm';
  let h = '<div class="tbl"><table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
  body.forEach((r, ri) => {
    const km = r[0] && r[0].match(/^K-(\d+)$/);
    if (km) {
      kCount++;
      h += `<tr id="K-${km[1]}" class="krow"><td><a class="kid" href="#K-${km[1]}">K-${km[1]}</a></td>`;
      r.slice(1).forEach((c) => { h += `<td${cellClass(c)}>${inline(c)}</td>`; });
      h += '</tr>';
      return;
    }
    h += '<tr>';
    r.forEach((c, ci) => {
      if (groupFirst && ci === 0) {
        if (!c) return;
        let span = 1;
        while (ri + span < body.length && !body[ri + span][0]) span++;
        h += `<th scope="rowgroup" class="grp" rowspan="${span}">${inline(c)}</th>`;
        return;
      }
      h += `<td${cellClass(c)}>${inline(c)}</td>`;
    });
    h += '</tr>';
  });
  return h + '</tbody></table></div>';
}

const toc = [];
let kCount = 0;

function renderList(items, ordered, startNum) {
  const first = items[0][0].match(/^\*\*K-(\d+) · /);
  if (first) {
    return items.map((body) => {
      let end = 0;
      while (end < body.length && !/\*\*K-\d+ · [\s\S]*?\*\*/.test(body.slice(0, end + 1).join('\n'))) end++;
      const head = body.slice(0, end + 1).join(' ');
      const m = head.match(/^\*\*K-(\d+) · (.+?)\*\*\s*(.*)$/);
      if (!m) return `<div class="li">${renderBlock(body)}</div>`;
      kCount++;
      const title = m[2].replace(/[.:]\s*$/, '');
      const rest = [m[3], ...body.slice(end + 1)];
      return `<article class="k" id="K-${m[1]}"><a class="kid" href="#K-${m[1]}">K-${m[1]}</a><div class="kbody"><h4>${inline(title, { noLinks: true })}</h4>${renderBlock(rest)}</div></article>`;
    }).join('\n');
  }
  const tag = ordered ? 'ol' : 'ul';
  const start = ordered && startNum !== 1 ? ` start="${startNum}"` : '';
  return `<${tag}${start}>` + items.map((b) => `<li>${renderBlock(b)}</li>`).join('') + `</${tag}>`;
}

function renderBlock(ls, top = false) {
  const out = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    const text = para.join(' ');
    if (text.startsWith('📊')) out.push(`<div class="stat"><span class="stat-ico" aria-hidden="true">📊</span><div>${inline(text.replace(/^📊\s*/, ''))}</div></div>`);
    else if (text) out.push(`<p>${inline(text)}</p>`);
    para = [];
  };
  let i = 0;
  while (i < ls.length) {
    const l = ls[i];
    if (!l.trim()) { flush(); i++; continue; }
    if (/^---\s*$/.test(l)) { flush(); if (!top) out.push('<hr>'); i++; continue; }
    let m = l.match(/^(#{1,3}) (.*)$/);
    if (m) {
      flush();
      const level = m[1].length;
      const text = m[2];
      if (level === 1) { i++; continue; }
      const id = headingId(text);
      if (level === 2) {
        toc.push({ id, text });
        const pm = text.match(/^Phần (\d+) — (.*)$/);
        const n = pm ? Number(pm[1]) : 0;
        const cls = pm ? (n <= 8 ? 'major' : 'minor') : (text.startsWith('Tóm tắt') || text.startsWith('Ba lo ngại') ? 'summary' : text.startsWith('Phụ lục') ? 'appendix' : 'other');
        const label = pm ? `<span class="pn">Phần ${pm[1]}</span>${inline(pm[2], { noLinks: true })}` : inline(text, { noLinks: true });
        out.push(`</section><section class="sec ${cls}" id="${id}"><h2>${label}</h2>`);
      } else {
        out.push(`<h3 id="${id}">${inline(text, { noLinks: true })}</h3>`);
      }
      i++;
      continue;
    }
    if (l.startsWith('>')) {
      flush();
      const q = [];
      while (i < ls.length && ls[i].startsWith('>')) { q.push(ls[i].replace(/^> ?/, '')); i++; }
      const split = q.filter((x) => !/^Bản nháp/.test(x)).flatMap((x) => (/^\*\*/.test(x) ? ['', x] : [x]));
      out.push(`<blockquote>${renderBlock(split)}</blockquote>`);
      continue;
    }
    if (/^\s*\|/.test(l)) {
      flush();
      const t = [];
      while (i < ls.length && /^\s*\|/.test(ls[i])) { t.push(ls[i]); i++; }
      out.push(renderTable(t));
      continue;
    }
    m = l.match(/^(- |(\d+)\. )/);
    if (m) {
      flush();
      const ordered = !!m[2];
      const startNum = ordered ? Number(m[2]) : 1;
      const items = [];
      while (i < ls.length) {
        const mm = ls[i].match(/^(- |(\d+)\. )(.*)$/);
        if (!mm || !!mm[2] !== ordered) break;
        const body = [mm[3]];
        i++;
        while (i < ls.length) {
          const n = ls[i];
          if (!n.trim()) {
            let j = i;
            while (j < ls.length && !ls[j].trim()) j++;
            if (j < ls.length && /^\s{2,}\S/.test(ls[j])) { body.push(''); i++; continue; }
            break;
          }
          if (/^\s{2,}\S/.test(n)) { body.push(n.replace(/^ {2,4}/, '')); i++; continue; }
          break;
        }
        items.push(body);
        let j = i;
        while (j < ls.length && !ls[j].trim()) j++;
        if (j > i && j < ls.length && /^(- |\d+\. )/.test(ls[j])) i = j;
      }
      out.push(renderList(items, ordered, startNum));
      continue;
    }
    if (l.trim().startsWith('📊') && para.length) flush();
    para.push(l.trim());
    i++;
  }
  flush();
  return out.join('\n');
}

const title = (lines.find((l) => l.startsWith('# ')) || '# Tài liệu').slice(2);
let body = renderBlock(lines, true);
body = `<section class="sec intro" id="gioi-thieu">${body}</section>`.replace('<section class="sec intro" id="gioi-thieu"></section>', '');

const tocHtml = toc.map((t) => {
  const pm = t.text.match(/^Phần (\d+) — (.*)$/);
  const sep = pm && Number(pm[1]) === 9 ? '<li class="toc-sep">Ít cấp bách hơn</li>' : '';
  const label = pm ? `<span class="tn">${pm[1]}</span>${esc(pm[2])}` : esc(t.text.split(/ — |: /)[0]);
  const cls = pm ? (Number(pm[1]) <= 8 ? 'major' : 'minor') : 'other';
  return `${sep}<li class="${cls}"><a href="#${t.id}">${label}</a></li>`;
}).join('');
const phanCount = toc.filter((t) => /^Phần \d+/.test(t.text)).length;

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Khó khăn kỹ thuật khi bán ERP</title>
<style>
:root {
  --bg: #f6f5f2; --surface: #ffffff; --surface-2: #f0eee9; --text: #1f2328; --muted: #5d636b;
  --border: #e2dfd8; --accent: #b4462b; --accent-soft: #fbece7; --link: #1f5fa8;
  --stat-bg: #fff7e0; --stat-border: #f0d68a;
  --ok: #1e7a3c; --ok-bg: #e7f5ec; --mid: #8a6100; --mid-bg: #fff4d6; --bad: #b42318; --bad-bg: #fdeceb;
  --shadow: 0 1px 2px rgba(0,0,0,.05), 0 2px 8px rgba(0,0,0,.04);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #15171a; --surface: #1d2024; --surface-2: #24282d; --text: #e7e9ec; --muted: #9aa1aa;
    --border: #33383e; --accent: #f08a6c; --accent-soft: #3a2621; --link: #7fb3ec;
    --stat-bg: #2f2a1a; --stat-border: #5c4d1f;
    --ok: #6fd28f; --ok-bg: #1d3226; --mid: #f1c75b; --mid-bg: #3a3119; --bad: #f2877c; --bad-bg: #3d2120;
    --shadow: none;
  }
}
:root[data-theme="dark"] {
  --bg: #15171a; --surface: #1d2024; --surface-2: #24282d; --text: #e7e9ec; --muted: #9aa1aa;
  --border: #33383e; --accent: #f08a6c; --accent-soft: #3a2621; --link: #7fb3ec;
  --stat-bg: #2f2a1a; --stat-border: #5c4d1f;
  --ok: #6fd28f; --ok-bg: #1d3226; --mid: #f1c75b; --mid-bg: #3a3119; --bad: #f2877c; --bad-bg: #3d2120;
  --shadow: none;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 16px; }
body { margin: 0; background: var(--bg); color: var(--text);
  font: 16px/1.6 "Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif; }
a { color: var(--link); text-decoration: none; }
a:hover { text-decoration: underline; }
code { font: .86em/1.4 ui-monospace, "Cascadia Mono", Consolas, monospace; background: var(--surface-2);
  padding: .1em .35em; border-radius: 4px; word-break: break-word; }
.layout { display: grid; grid-template-columns: 280px minmax(0, 1fr); max-width: 1320px; margin: 0 auto; }
nav.toc { position: sticky; top: 0; height: 100vh; overflow-y: auto; padding: 28px 18px 28px 24px;
  border-right: 1px solid var(--border); }
nav.toc .brand { font-weight: 700; font-size: 15px; line-height: 1.35; margin-bottom: 14px; }
nav.toc ul { list-style: none; margin: 0; padding: 0; }
nav.toc li a { display: flex; gap: 8px; padding: 6px 8px; border-radius: 6px; color: var(--text); font-size: 14px; line-height: 1.35; }
nav.toc li a:hover { background: var(--surface-2); text-decoration: none; }
nav.toc li.minor a { color: var(--muted); }
nav.toc li a.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
nav.toc .tn { flex: 0 0 22px; height: 22px; border-radius: 50%; display: inline-grid; place-items: center;
  font-size: 12px; font-weight: 700; background: var(--accent); color: #fff; }
nav.toc li.minor .tn { background: var(--surface-2); color: var(--muted); }
nav.toc .toc-sep { margin: 14px 8px 6px; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
main { padding: 32px 40px 80px; min-width: 0; }
.hero { margin-bottom: 8px; }
.hero h1 { font-size: 30px; line-height: 1.25; margin: 0 0 6px; }
.hero .sub { color: var(--muted); margin: 0 0 16px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.chip { background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 4px 12px; font-size: 14px; }
.chip b { color: var(--accent); }
.sec { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 22px 26px;
  margin: 22px 0; box-shadow: var(--shadow); }
.sec.summary { border: 2px solid var(--accent); }
.sec.minor { background: transparent; box-shadow: none; }
.sec.appendix { background: transparent; box-shadow: none; font-size: 14.5px; }
.sec h2 { font-size: 23px; line-height: 1.3; margin: 0 0 14px; display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap; }
.pn { flex: none; font-size: 13px; font-weight: 700; letter-spacing: .03em; text-transform: uppercase;
  background: var(--accent); color: #fff; padding: 3px 10px; border-radius: 999px; position: relative; top: -2px; }
.sec.minor .pn { background: var(--surface-2); color: var(--muted); }
h3 { font-size: 18px; margin: 26px 0 10px; padding-bottom: 4px; border-bottom: 1px solid var(--border); }
p { margin: 8px 0; }
blockquote { margin: 12px 0; padding: 12px 16px; background: var(--surface-2); border-left: 4px solid var(--accent); border-radius: 0 8px 8px 0; }
blockquote p { margin: 4px 0; }
ul, ol { padding-left: 24px; margin: 8px 0; }
li { margin: 6px 0; }
li p { margin: 0; }
hr { border: 0; border-top: 1px solid var(--border); margin: 18px 0; }
.k { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 14px; padding: 14px 0; border-top: 1px solid var(--border); }
.k:first-of-type { border-top: 0; }
.k:target { background: var(--accent-soft); border-radius: 8px; padding-left: 8px; padding-right: 8px; }
.kid { align-self: start; text-align: center; font: 700 13px/1 ui-monospace, Consolas, monospace; color: var(--accent);
  border: 1.5px solid var(--accent); border-radius: 6px; padding: 6px 0; }
.kid:hover { text-decoration: none; background: var(--accent-soft); }
.k h4 { margin: 0 0 4px; font-size: 16.5px; line-height: 1.4; }
.k p { margin: 4px 0; }
.stat { display: flex; gap: 10px; align-items: flex-start; margin: 8px 0 2px; padding: 8px 12px;
  background: var(--stat-bg); border: 1px solid var(--stat-border); border-radius: 8px; font-size: 15px; }
.stat-ico { flex: none; line-height: 1.6; }
.stat strong { color: var(--accent); }
.kref, .pref { white-space: nowrap; }
tr.krow .kid { display: inline-block; padding: 5px 7px; }
tr.krow:target td { background: var(--accent-soft); }
.tbl { overflow-x: auto; margin: 12px 0; border: 1px solid var(--border); border-radius: 8px; }
table { border-collapse: collapse; width: 100%; font-size: 14.5px; }
th, td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--border); }
thead th { background: var(--surface-2); font-weight: 600; position: sticky; top: 0; }
tbody tr:last-child td { border-bottom: 0; }
th.grp { background: var(--surface-2); font-weight: 700; white-space: nowrap; border-right: 1px solid var(--border); }
td.st-ok { background: var(--ok-bg); color: var(--ok); }
td.st-mid { background: var(--mid-bg); color: var(--mid); }
td.st-bad { background: var(--bad-bg); color: var(--bad); }
.theme-btn { position: fixed; right: 16px; bottom: 16px; border: 1px solid var(--border); background: var(--surface);
  color: var(--text); border-radius: 999px; padding: 8px 14px; font: inherit; font-size: 14px; cursor: pointer; box-shadow: var(--shadow); }
details.mtoc { display: none; }
@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  nav.toc { display: none; }
  details.mtoc { display: block; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; margin: 12px 0; }
  details.mtoc summary { cursor: pointer; font-weight: 600; }
  details.mtoc ul { list-style: none; padding: 6px 0 0; margin: 0; }
  details.mtoc li a { display: flex; gap: 8px; padding: 5px 0; color: var(--text); font-size: 15px; }
  details.mtoc .tn { flex: 0 0 22px; height: 22px; border-radius: 50%; display: inline-grid; place-items: center; font-size: 12px; font-weight: 700; background: var(--accent); color: #fff; }
  details.mtoc li.minor .tn { background: var(--surface-2); color: var(--muted); }
  details.mtoc .toc-sep { margin: 10px 0 2px; font-size: 12px; text-transform: uppercase; color: var(--muted); }
  main { padding: 20px 16px 72px; }
  .sec { padding: 16px; }
  .hero h1 { font-size: 24px; }
  .k { grid-template-columns: 1fr; gap: 6px; }
  .kid { justify-self: start; padding: 5px 8px; }
}
@media print {
  nav.toc, details.mtoc, .theme-btn { display: none !important; }
  .layout { display: block; }
  body { background: #fff; font-size: 11pt; }
  main { padding: 0; }
  .sec { box-shadow: none; break-inside: auto; }
  .k, .stat, tr { break-inside: avoid; }
  thead th { position: static; }
  a { color: inherit; }
}
</style>
</head>
<body>
<div class="layout">
  <nav class="toc" aria-label="Mục lục">
    <div class="brand">${esc(title)}</div>
    <ul>${tocHtml}</ul>
  </nav>
  <main>
    <header class="hero">
      <h1>${esc(title)}</h1>
      <p class="sub">Bản nháp · 05/11/2026 · các phần xếp theo mức độ quan trọng giảm dần</p>
      <div class="chips">
        <span class="chip"><b>${kCount}</b> khó khăn</span>
        <span class="chip"><b>${phanCount}</b> phần</span>
        <span class="chip">Phần <b>1–8</b>: trọng tâm</span>
        <span class="chip">Mỗi mục có <b>📊</b> số liệu đo được</span>
      </div>
      <details class="mtoc"><summary>Mục lục</summary><ul>${tocHtml}</ul></details>
    </header>
    ${body}
  </main>
</div>
<button class="theme-btn" type="button" id="themeBtn">Đổi nền sáng/tối</button>
<script>
(function () {
  var root = document.documentElement, key = 'erp-doc-theme';
  try { var saved = localStorage.getItem(key); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  document.getElementById('themeBtn').addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(key, next); } catch (e) {}
  });
  var links = Array.prototype.slice.call(document.querySelectorAll('nav.toc a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -70% 0px' });
    document.querySelectorAll('section.sec[id]').forEach(function (s) { io.observe(s); });
  }
})();
</script>
</body>
</html>
`;
fs.writeFileSync(out, html);
console.log(`ok: ${kCount} K items, ${toc.length} sections -> ${out}`);
