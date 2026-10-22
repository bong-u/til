const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');
const opentype = require('opentype.js');
const {Resvg} = require('@resvg/resvg-js');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const OUTPUT_DIR = path.join(ROOT, 'static', 'thumbnail');
const TITLE_FONT = path.join(__dirname, 'fonts', 'Pretendard-ExtraBold.otf');
const STAMP_FONT = path.join(__dirname, 'fonts', 'RobotoMono-Bold.ttf');

const W = 1200, H = 630;
const PAD_X = 100, MAX_TEXT_W = 1000;
const SKIP_SECTIONS = ['tags', 'portfolio'];

// 섹션별 색상(hue). 없는 섹션은 이름 해시로 결정
const SECTION_HUES = {
  java: 5,
  devtools: 28,
  javascript: 48,
  spring: 88,
  python: 130,
  mogako: 165,
  c_cpp: 192,
  algorithm: 218,
  school: 245,
  ai: 272,
  etc: 318,
};

const titleFont = opentype.parse(fs.readFileSync(TITLE_FONT));

// resvg가 hsl() 표기를 지원하지 않아 rgba()로 변환
function hsl(h, s, l, a = 1) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const f = n => l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  const [r, g, b] = [f(0), f(8), f(4)].map(v => Math.round(v * 255));
  return `rgba(${r},${g},${b},${a})`;
}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function fnv(str) {
  let h = 0x811c9dc5;
  for (const c of str) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// mulberry32: 시드 고정 난수
function rng(seed) {
  return () => {
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const measure = (text, size) => titleFont.getAdvanceWidth(text, size);

// 단어 단위 줄바꿈, 한 단어가 너무 길면 글자 단위로 자름
function wrap(title, size, maxLines) {
  const lines = [];
  let cur = '';
  for (const word of title.split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (measure(next, size) <= MAX_TEXT_W) {
      cur = next;
      continue;
    }
    if (cur) lines.push(cur);
    cur = word;
    while (measure(cur, size) > MAX_TEXT_W) {
      let i = cur.length;
      while (i > 1 && measure(cur.slice(0, i), size) > MAX_TEXT_W) i--;
      lines.push(cur.slice(0, i));
      cur = cur.slice(i);
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    let last = lines[maxLines - 1];
    while (measure(`${last}…`, size) > MAX_TEXT_W) last = last.slice(0, -1);
    lines[maxLines - 1] = `${last.trimEnd()}…`;
  }
  return lines;
}

// "말머리 - 본제목", "말머리 : 본제목"에서 말머리를 분리. 말머리가 너무 길면 분리하지 않음
const LABEL_MAX_LEN = 24;
function splitLabel(title) {
  const seps = [...title.matchAll(/ [-:] /g)].reverse();
  for (const m of seps) {
    const label = title.slice(0, m.index).trim();
    const main = title.slice(m.index + 3).trim();
    if (label && main && label.length <= LABEL_MAX_LEN) return {label, main};
  }
  return {label: null, main: title};
}

// 말머리 + 본제목 + 오른쪽 아래 낙인
function textLayer(title, hue) {
  const {label, main} = splitLabel(title);
  // 2줄 안에 들어가면 가장 크게, 길면 3줄까지 단계적으로 줄임
  let size, lines;
  for (const [s, maxLines] of [[104, 2], [88, 3], [76, 3]]) {
    size = s;
    lines = wrap(main, size, 99);
    if (lines.length <= maxLines) break;
  }
  lines = wrap(main, size, 3);
  const lh = size * 1.22;
  const labelSize = 44, labelGap = 28;
  const labelH = label ? labelSize + labelGap : 0;
  const blockH = labelH + (lines.length - 1) * lh + size;
  // 정중앙보다 살짝 위에 배치
  const top = (H - blockH) / 2 - 45;
  const firstBaseline = top + labelH + size * 0.9;
  const tspans = lines.map((l, i) => `<tspan x="${PAD_X}" y="${firstBaseline + i * lh}">${esc(l)}</tspan>`).join('');
  const labelText = label ? `
    <text x="${PAD_X}" y="${top + labelSize * 0.9}" font-family="Pretendard" font-weight="800" font-size="${labelSize}"
      fill="#fff" fill-opacity="0.75">${esc(wrap(label, labelSize, 1)[0])}</text>` : '';
  return `
    <rect width="${W}" height="${H}" fill="url(#scrim)"/>${labelText}
    <text font-family="Pretendard" font-weight="800" font-size="${size}" fill="#fff"
      stroke="${hsl(hue, 50, 15, 0.35)}" stroke-width="8" paint-order="stroke">${tspans}</text>
    <text x="${W - 56}" y="${H - 48}" text-anchor="end"
      font-family="Roboto Mono" font-weight="700" font-size="36" fill="#fff" fill-opacity="0.85">bong-u/til</text>`;
}

function svg(inner, hue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="scrim" x1="0" x2="1">
        <stop offset="0" stop-color="${hsl(hue, 45, 12, 0.55)}"/>
        <stop offset="0.75" stop-color="${hsl(hue, 45, 12, 0.15)}"/>
        <stop offset="1" stop-color="${hsl(hue, 45, 12, 0)}"/>
      </linearGradient>
    </defs>
    ${inner}
  </svg>`;
}

// 스타일 A: 기하 패턴
const SHAPES = {
  hexagon: (s, c) => {
    const h = s * Math.sqrt(3);
    const hex = (x, y) => {
      const p = [];
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i;
        p.push(`${x + s * Math.cos(a)},${y + s * Math.sin(a)}`);
      }
      return `<polygon points="${p.join(' ')}" fill="none" stroke="${c}" stroke-width="${s * 0.12}"/>`;
    };
    return {w: s * 3, h, body: hex(0, 0) + hex(s * 1.5, h / 2) + hex(s * 3, 0) + hex(0, h) + hex(s * 3, h)};
  },
  triangle: (s, c) => ({
    w: s,
    h: s * 1.732,
    body: `<path d="M0 ${s * 0.866}L${s / 2} 0L${s} ${s * 0.866}Z" fill="${c}"/>`
      + `<path d="M${s / 2} ${s * 0.866}L${s} ${s * 1.732}L0 ${s * 1.732}Z" fill="${c}" opacity="0.5"/>`,
  }),
  circle: (s, c) => ({
    w: s,
    h: s,
    body: `<circle cx="${s / 2}" cy="${s / 2}" r="${s * 0.28}" fill="none" stroke="${c}" stroke-width="${s * 0.08}"/>`,
  }),
  stripe: (s, c) => ({w: s, h: s, body: `<rect width="${s / 2.5}" height="${s}" fill="${c}"/>`}),
  plus: (s, c) => ({
    w: s,
    h: s,
    body: `<path d="M${s * 0.4} ${s * 0.2}h${s * 0.2}v${s * 0.2}h${s * 0.2}v${s * 0.2}h-${s * 0.2}v${s * 0.2}h-${s * 0.2}v-${s * 0.2}h-${s * 0.2}v-${s * 0.2}h${s * 0.2}z" fill="${c}"/>`,
  }),
  zigzag: (s, c) => ({
    w: s,
    h: s / 2,
    body: `<path d="M0 ${s / 4}L${s / 2} 0L${s} ${s / 4}" fill="none" stroke="${c}" stroke-width="${s * 0.1}"/>`,
  }),
};

function geometric(r, hue) {
  const names = Object.keys(SHAPES);
  const name = names[Math.floor(r() * names.length)];
  const size = 40 + r() * 50;
  const rot = Math.floor(r() * 4) * 15 - 15;
  const hue2 = hue + (r() * 30 - 15);
  const {w, h, body} = SHAPES[name](size, hsl(hue2, 70, 75, 0.28));
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${hsl(hue, 55, 42)}"/>
        <stop offset="1" stop-color="${hsl(hue2 + 20, 60, 32)}"/>
      </linearGradient>
      <pattern id="pt" width="${w}" height="${h}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot})">${body}</pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#pt)"/>`;
}

// 스타일 B: 그라데이션 + 블롭
function blob(r, hue) {
  let circles = '';
  const n = 3 + Math.floor(r() * 2);
  for (let i = 0; i < n; i++) {
    const h = hue + (r() * 60 - 30);
    circles += `<circle cx="${r() * W}" cy="${r() * H}" r="${180 + r() * 220}" fill="${hsl(h, 80, 55 + r() * 15, 0.75)}"/>`;
  }
  return `
    <defs>
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="90"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="${hsl(hue, 50, 35)}"/>
    <g filter="url(#blur)">${circles}</g>`;
}

// 스타일 C: 저폴리
function lowPoly(r, hue) {
  const cell = 110 + r() * 40;
  const cols = Math.ceil(W / cell) + 2, rows = Math.ceil(H / cell) + 2;
  const pts = [];
  for (let y = 0; y < rows; y++) {
    pts.push([]);
    for (let x = 0; x < cols; x++) {
      pts[y].push([(x - 0.5) * cell + (r() - 0.5) * cell * 0.8, (y - 0.5) * cell + (r() - 0.5) * cell * 0.8]);
    }
  }
  const angle = r() * Math.PI * 2, dx = Math.cos(angle), dy = Math.sin(angle);
  let tris = '';
  const tri = (a, b, c) => {
    const cx = (a[0] + b[0] + c[0]) / 3, cy = (a[1] + b[1] + c[1]) / 3;
    const t = (cx / W - 0.5) * dx + (cy / H - 0.5) * dy + 0.5;
    const color = hsl(hue + t * 25, 55, 28 + t * 22 + (r() - 0.5) * 6);
    tris += `<polygon points="${a} ${b} ${c}" fill="${color}" stroke="${color}" stroke-width="1"/>`;
  };
  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols - 1; x++) {
      const p = pts[y][x], q = pts[y][x + 1], s = pts[y + 1][x], u = pts[y + 1][x + 1];
      if (r() < 0.5) {
        tri(p, q, u);
        tri(p, u, s);
      } else {
        tri(p, q, s);
        tri(q, u, s);
      }
    }
  }
  return tris;
}

const STYLES = [geometric, blob, lowPoly];

function render(title, section) {
  const hue = SECTION_HUES[section] ?? fnv(section) % 360;
  const r = rng(fnv(title));
  const style = STYLES[Math.floor(r() * STYLES.length)];
  return svg(style(r, hue) + textLayer(title, hue), hue);
}

// 썸네일용 제목(thumbnailTitle)이 있으면 우선 사용
function readTitle(file) {
  const src = fs.readFileSync(file, 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const m = fm[1].match(/^thumbnailTitle:\s*"(.*)"\s*$/m) || fm[1].match(/^title:\s*"(.*)"\s*$/m);
  return m ? m[1] : null;
}

function collectPosts() {
  const posts = [];
  for (const section of fs.readdirSync(CONTENT_DIR)) {
    const dir = path.join(CONTENT_DIR, section);
    if (SKIP_SECTIONS.includes(section) || !fs.statSync(dir).isDirectory()) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.md') || name === '_index.md') continue;
      // 공백은 URL(og:image)에서 깨지므로 '-'로 치환. layouts/partials/thumbnail.html과 규칙을 맞춰야 함
      const slug = name.replace(/\.md$/, '').replace(/ /g, '-');
      posts.push({file: `content/${section}/${name}`, section, slug, title: readTitle(path.join(dir, name))});
    }
  }
  return posts;
}

// 커밋되지 않은 변경(수정, 추가, 이름 변경)이 있는 content 파일 목록
function changedFiles() {
  const out = execFileSync('git', ['status', '--porcelain', '-z', '-uall', '--', 'content'], {cwd: ROOT, encoding: 'utf8'});
  const entries = out.split('\0').filter(Boolean);
  const files = new Set();
  for (let i = 0; i < entries.length; i++) {
    const status = entries[i].slice(0, 2);
    files.add(entries[i].slice(3));
    // 이름 변경/복사는 다음 항목이 원래 경로
    if (status[0] === 'R' || status[0] === 'C') i++;
  }
  return files;
}

async function main() {
  const posts = collectPosts();
  const changed = changedFiles();
  let generated = 0;

  for (const {file, section, slug, title} of posts) {
    const out = path.join(OUTPUT_DIR, section, `${slug}.webp`);
    // 썸네일이 이미 있고 글이 바뀌지 않았으면 건너뜀
    if (fs.existsSync(out) && !changed.has(file)) continue;
    if (!title) {
      console.warn(`⚠️ 제목 없음: ${file}`);
      continue;
    }

    const png = new Resvg(render(title, section), {
      font: {fontFiles: [TITLE_FONT, STAMP_FONT], loadSystemFonts: false, defaultFontFamily: 'Pretendard'},
    }).render().asPng();
    fs.mkdirSync(path.dirname(out), {recursive: true});
    await sharp(png).webp({quality: 82}).toFile(out);
    console.log(`🖼️ ${section}/${slug}`);
    generated++;
  }

  // 글이 삭제되거나 이름이 바뀌어 짝이 없는 썸네일 정리
  const expected = new Set(posts.map(p => `${p.section}/${p.slug}.webp`));
  for (const section of fs.existsSync(OUTPUT_DIR) ? fs.readdirSync(OUTPUT_DIR) : []) {
    for (const name of fs.readdirSync(path.join(OUTPUT_DIR, section))) {
      if (expected.has(`${section}/${name}`)) continue;
      fs.rmSync(path.join(OUTPUT_DIR, section, name));
      console.log(`🗑️ ${section}/${name}`);
    }
  }

  console.log(`✅ 썸네일 ${generated}개 생성`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
