// Placeholder article bodies (PAGES_SPEC_CONTENT §6 "Sampled body sizes"). Block AST rendered by ArticleProse.
// Mixes: A = callouts with code + tables; B = many blockquotes + H3s; C = nested lists + iframe;
// D = H3/H4 depth + images. All copy is generated; code snippets are original generic examples.
import { rng, chars, title, int, pick, slugify } from './lorem.js'

const SNIPPETS = [
  { lang: 'sql', code: `-- daily totals for the last week
SELECT event_day, count(*) AS events, sum(amount) AS total
FROM sample_events
WHERE event_day >= current_date - INTERVAL 7 DAY
GROUP BY event_day
ORDER BY event_day;` },
  { lang: 'sql', code: `CREATE TABLE readings AS
SELECT * FROM read_csv('readings_*.csv', header = true);` },
  { lang: 'python', code: `import sample_client

con = sample_client.connect("workspace.db")
rows = con.sql("SELECT region, avg(latency) FROM pings GROUP BY 1").fetchall()
for region, value in rows:
    print(region, round(value, 2))` },
  { lang: 'bash', code: `$ pip install sample-client
$ sample-cli query "SELECT 42 AS answer"` },
  { lang: 'sql', code: `WITH ranked AS (
  SELECT item_id, score,
         row_number() OVER (PARTITION BY group_id ORDER BY score DESC) AS rn
  FROM scores
)
SELECT item_id, score
FROM ranked
WHERE rn <= 3; -- top three per group` },
  { lang: 'sql', code: `ATTACH 'remote_store' AS store;
INSERT INTO store.metrics SELECT * FROM local_metrics WHERE ts > '2026-01-01';
SELECT count(*) FROM store.metrics;` },
  { lang: 'diff', code: `- SELECT * FROM orders;
+ SELECT id, status, total FROM orders WHERE status = 'open';` },
]

function inline(r, seed, n) {
  const text = chars(n, seed)
  const parts = text.split(' ')
  const out = []
  let buf = []
  const flush = () => { if (buf.length) { out.push(buf.join(' ') + ' '); buf = [] } }
  for (let i = 0; i < parts.length; i++) {
    const roll = r()
    if (i > 2 && roll < 0.025 && i < parts.length - 3) {
      flush()
      const kind = pick(r, ['internal', 'internal', 'docs', 'external'])
      const href = kind === 'internal'
        ? pick(r, ['/product', '/blog/sample-post-12', '/product/dives', '/ecosystem/partner-3', '/case-studies/case-study-2'])
        : kind === 'docs' ? '/docs/getting-started' : 'https://example.com/reference'
      out.push({ t: 'a', c: `${parts[i]} ${parts[i + 1]}`, href })
      out.push(' ')
      i++
    } else if (roll > 0.985) {
      flush(); out.push({ t: 'code', c: parts[i].replace(/[.,]/g, '').toLowerCase() + '()' }); out.push(' ')
    } else if (roll > 0.975) {
      flush(); out.push({ t: 'strong', c: parts[i] }); out.push(' ')
    } else if (roll > 0.968) {
      flush(); out.push({ t: 'em', c: parts[i] }); out.push(' ')
    } else buf.push(parts[i])
  }
  flush()
  return out
}

function heading(type, r, seed, used) {
  let text = title(int(r, 18, 38), seed)
  let id = slugify(text)
  while (used.has(id)) id += '-x'
  used.add(id)
  return { type, text, id }
}

function para(r, seed, n) { return { type: 'p', inl: inline(r, seed, n ?? int(r, 220, 420)) } }

function table(r, seed) {
  const cols = int(r, 3, 4)
  const head = Array.from({ length: cols }, (_, i) => title(int(r, 5, 12), seed + i))
  const rows = Array.from({ length: int(r, 3, 5) }, (_, j) =>
    Array.from({ length: cols }, (_, i) => (i === 0 ? title(int(r, 6, 14), seed + 50 + j * 9 + i) : `${int(r, 1, 999)}${pick(r, [' ms', ' GB', '%', ''])}`)))
  return { type: 'table', head, rows }
}

function list(type, r, seed, n, nested) {
  return {
    type,
    items: Array.from({ length: n }, (_, i) => ({
      inl: inline(r, seed + i * 3, int(r, 50, 140)),
      sub: nested && i === 1 ? list(type === 'ul' ? 'ol' : 'ul', r, seed + 99, 2, false) : null,
    })),
  }
}

// mix: 'A' | 'B' | 'C' | 'D' | 'case' | 'video' | 'partner' | 'community'
export function genArticle(seed, mix) {
  const r = rng(seed * 31 + 5)
  const used = new Set()
  const b = []
  let s = seed * 1000
  const P = (n) => b.push(para(r, ++s, n))
  if (mix === 'A') {
    for (let p = 0; p < 3; p++) P()
    for (let h = 0; h < 5; h++) {
      b.push(heading('h2', r, ++s, used))
      for (let p = 0; p < 7; p++) P()
      if (h < 2) { b.push(heading('h3', r, ++s, used)); P() }
      const sn = SNIPPETS[(seed + h) % SNIPPETS.length]
      b.push({ type: 'callout', children: [para(r, ++s, 160), { type: 'code', ...sn }] })
      if (h === 1) b.push({ type: 'callout', children: [{ type: 'code', ...SNIPPETS[(seed + 3) % SNIPPETS.length] }] })
      if (h < 4) b.push(table(r, ++s))
    }
  } else if (mix === 'B') {
    P(); P()
    for (let h = 0; h < 6; h++) {
      b.push(heading('h2', r, ++s, used))
      P()
      for (let k = 0; k < (h < 4 ? 2 : 1); k++) {
        b.push(heading('h3', r, ++s, used))
        P()
        for (let q = 0; q < 2; q++) b.push({ type: 'quote', inl: inline(r, ++s, int(r, 120, 260)) })
        P(160)
      }
      if (h % 2 === 0) b.push({ type: 'img', h: int(r, 174, 320) })
      if (h === 3) b.push({ type: 'hr' })
    }
  } else if (mix === 'C') {
    P(); P()
    for (let h = 0; h < 4; h++) {
      b.push(heading('h2', r, ++s, used))
      P(); P()
      if (h === 0) b.push(list('ul', r, ++s, 4, true))
      if (h === 1) { b.push({ type: 'code', ...SNIPPETS[seed % SNIPPETS.length] }); b.push({ type: 'img', h: 260 }) }
      if (h === 2) { b.push({ type: 'iframe', kind: 'youtube' }); b.push(list('ol', r, ++s, 3, true)) }
      if (h === 3) b.push({ type: 'img', h: 210 })
      P()
    }
  } else if (mix === 'D') {
    P(); P()
    for (let h = 0; h < 5; h++) {
      b.push(heading('h2', r, ++s, used))
      P(); P()
      b.push(heading('h3', r, ++s, used))
      P(); P()
      if (h < 4) { b.push(heading('h4', r, ++s, used)); P() }
      b.push({ type: 'img', h: int(r, 174, 320) })
      P()
    }
  } else if (mix === 'case') {
    // Block lengths (characters) mirror the live case-study body (re-measured on together-ai…): 2 p,
    // a 4-item list, then 3 H2 sections of 9 / 8 / 5 paragraphs. Copy is generated.
    const CASE = [[328, 347], [83, 214, 95, 72], [43, [165, 149, 167, 375, 362, 99, 77, 198, 130]],
      [38, [203, 478, 158, 269, 515, 230, 193, 225]], [54, [66, 449, 410, 196, 96]]]
    CASE[0].forEach((n) => P(n))
    b.push({ type: 'ul', items: CASE[1].map((n, i) => ({ inl: inline(r, ++s + i, n), sub: null })) })
    for (const [hn, ps] of CASE.slice(2)) {
      const text = title(hn, ++s)
      let id = slugify(text); while (used.has(id)) id += '-x'; used.add(id)
      b.push({ type: 'h2', text, id })
      ps.forEach((n) => P(n))
    }
  } else if (mix === 'video') {
    P()
    for (let h = 0; h < 4; h++) {
      b.push(heading('h2', r, ++s, used))
      P(); P()
      if (h === 1) b.push(list('ul', r, ++s, 3, false))
      if (h === 2) b.push({ type: 'code', ...SNIPPETS[seed % SNIPPETS.length] })
    }
  } else if (mix === 'partner') {
    // live partner page (sigma): p 461ch, h2 18ch, p 476ch
    P(461)
    { const text = title(18, ++s); const id = slugify(text); used.add(id); b.push({ type: 'h2', text, id }) }
    P(476)
  } else if (mix === 'community') {
    // live lengths: h2 17ch, 4 p of 233 / 297 / 291 / 386 (bold lead-in included), h3 11ch, p 64 (mailto), 200px image
    b.push({ type: 'h2', text: title(17, seed), id: 'principles' })
    for (const n of [233, 297, 291, 386]) {
      const lead = title(14, ++s) + '.'
      b.push({ type: 'p', inl: [{ t: 'strong', c: lead }, ' ', ...inline(r, ++s, n - lead.length - 1)] })
    }
    b.push({ type: 'h3', text: title(11, seed + 1), id: 'contact' })
    b.push({ type: 'p', inl: [...inline(r, ++s, 42), { t: 'a', c: 'conduct@example.com', href: 'mailto:conduct@example.com' }, '.'] })
    b.push({ type: 'img', h: 200, w: 200, contain: true })
  }
  return b
}

export const headingsOf = (blocks) => blocks.filter((x) => x.type === 'h2')

// Body from a measured live profile (caseProfiles.js / blogProfiles.js): every block keeps the original's type and
// character count (links / inline-code counts on paragraphs, item lengths on lists, cell lengths on tables, image
// aspect ratios); copy, link targets, code and cell text are generated.
const PROFILE_LINKS = ['/product', '/product/dives', '/case-studies', '/product/pricing', '/blog', '/learn']
export function genProfileBody(blocks, seed) {
  const r = rng(seed * 37 + 11)
  const used = new Set()
  let s = seed * 1000
  // paragraph inline run with the live link / inline-code counts spread evenly
  const run = (n, links = 0, codes = 0) => {
    if (!links && !codes) return inline(r, ++s, n)
    const words = chars(n, ++s).split(' ')
    const marks = links + codes
    const step = Math.max(2, Math.floor(words.length / (marks + 1)))
    const out = []
    let li = 0
    let ci = 0
    for (let i = 0; i < words.length; i++) {
      const last = i === words.length - 1
      if (i > 0 && i % step === 0 && !last && (li < links || ci < codes)) {
        if (li < links) { out.push({ t: 'a', c: `${words[i]} ${words[i + 1]}`, href: PROFILE_LINKS[(seed + li) % PROFILE_LINKS.length] }); li++; i++ }
        else { out.push({ t: 'code', c: words[i].replace(/[.,]/g, '').toLowerCase() }); ci++ }
        out.push(i < words.length - 1 ? ' ' : '')
      } else out.push(words[i] + (last ? '' : ' '))
    }
    return out
  }
  const item = (x) => (Array.isArray(x)
    ? { inl: inline(r, ++s, x[0] || 20), sub: x[1] && x[1].length ? { type: 'ul', items: x[1].map((k) => ({ inl: inline(r, ++s, k), sub: null })) } : null }
    : { inl: inline(r, ++s, x), sub: null })
  const one = (blk) => {
    const [type, a, b, c] = blk
    switch (type) {
      case 'h2': case 'h3': case 'h4': {
        const text = title(Math.max(6, a), ++s)
        let id = slugify(text); while (used.has(id)) id += '-x'; used.add(id)
        return { type, text, id }
      }
      case 'p': return { type: 'p', inl: run(a, b || 0, c || 0) }
      case 'ul': case 'ol': return { type, items: a.map(item) }
      case 'quote': return { type: 'quote', inl: inline(r, ++s, a) }
      case 'img': return b ? { type: 'img', w: b, h: Math.round(b * a) } : { type: 'img', ratio: a || 0.55 }
      case 'video': return { type: 'iframe', kind: 'youtube' }
      case 'embed': return { type: 'img', h: a || 600 }
      case 'hr': return { type: 'hr' }
      case 'callout': return { type: 'callout', children: a.map(one).filter(Boolean) }
      case 'code': {
        // profile: [lines, longest line] (blog) or a character count (case)
        const lines = b ? a : Math.max(1, Math.round(a / 50))
        const width = b ? Math.min(b, 120) : 56
        const words = chars(lines * width, ++s).toLowerCase().replace(/[.,]/g, '').split(' ')
        const out = []
        let cur = ''
        for (const w of words) {
          if (out.length >= lines) break
          if ((cur + ' ' + w).length > width) { out.push(cur); cur = w } else cur = cur ? `${cur} ${w}` : w
        }
        while (out.length < lines) { out.push(cur || 'select 1'); cur = '' }
        return { type: 'code', lang: 'sql', code: out.map((l, i) => (i % 4 === 0 ? `-- ${l}` : l.replace(/ /g, '_').replace(/_/, ' '))).join('\n') }
      }
      case 'table': {
        // blog: per-cell char counts (first row = header); case: total characters
        const cells = Array.isArray(a) ? a : [[10, 10, 10], ...Array.from({ length: Math.max(2, Math.round(a / 40) - 1) }, () => [12, 12, 12])]
        const txt = (n, k) => (n <= 0 ? '' : title(Math.max(2, n), ++s + k))
        return { type: 'table', head: cells[0].map((n, k) => txt(n, k)), rows: cells.slice(1).map((row) => row.map((n, k) => txt(n, k))) }
      }
      default: return null
    }
  }
  return blocks.map(one).filter(Boolean)
}
export const genCaseBody = genProfileBody
