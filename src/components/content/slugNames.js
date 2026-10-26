// Tiny shared slug -> display-string helpers, used by both the hub cards (src/components/content, main bundle) and the
// lazy detail templates (src/components/extra/data/*), so a card and the page it opens show the same title / name.
// Deterministic: same slug, same string. Functions moved verbatim from extra/data/content.js and media.js; no dataset
// rows live here beyond the small lookup tables below.
import { rng, exactTitle, shaped, pick, hash } from './lorem.js'

/* ---- word-length shapes -> placeholder words (extra fromShape) ---- */
// Word-length shape (one base-36 digit per word, measured on the original) -> placeholder words of those lengths.
// A run longer than 16 (e.g. 'z' = 35: the original's hyphen-joined title, which wraps at its hyphens) becomes several
// spaced words of the same total length, so the placeholder wraps too instead of forming one unbreakable run.
export const splitRun = (n) => { const out = []; while (n > 16) { const w = n - 9 >= 4 ? 8 : n - 6; out.push(w); n -= w + 1 } out.push(n); return out }
export const wordLens = (w) => [...String(w)].flatMap((ch) => splitRun(parseInt(ch, 36)))
// Generic long words for 10-16 letter slots (lorem.js only has short words and glues longer ones together).
const LONG = {}
for (const w of ['analytical', 'dashboards', 'governance', 'serverless', 'statistics', 'vectorized', 'benchmarks', 'warehouses',
  'performance', 'consistency', 'distributed', 'incremental', 'aggregation', 'concurrency', 'replication', 'compression', 'scalability',
  'partitioning', 'architecture', 'materialized', 'transactions', 'integrations', 'optimization',
  'observability', 'orchestration', 'compatibility', 'serialization', 'configuration',
  'transformations', 'interoperable', 'implementation', 'synchronization', 'interoperability', 'parallelization'])
  (LONG[w.length] ||= []).push(w)
export function shapedWords(lens, seed) {
  const r = rng(seed + 77)
  return lens.map((n, i) => {
    const w = n >= 10 && LONG[n] ? pick(r, LONG[n]) : shaped([n], seed + i * 13, { sentence: false })
    return i === 0 ? w[0].toUpperCase() + w.slice(1) : w
  }).join(' ')
}
export const fromShape = (w, seed, fallback = 40) => (w && String(w).length ? shapedWords(wordLens(w), seed) : exactTitle(fallback, seed))

/* ---- slug words -> title (glossary terms, dive titles) ---- */
const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs', 'with', 'from', 'into'])
const ACR = new Set(['ab', 'acid', 'ai', 'api', 'apis', 'aws', 'bi', 'cdc', 'cli', 'cpu', 'csv', 'cte', 'dag', 'dbt', 'ddl', 'dlt', 'dml', 'elt', 'etl', 'gcs', 'gpu', 'hdfs', 'htap', 'iam', 'io', 'iot', 'jdbc', 'json', 'kpi', 'llm', 'llms', 'mcp', 'ml', 'mpp', 'mvcc', 'nlp', 'odbc', 'olap', 'oltp', 'orc', 'orm', 'pii', 'rag', 'rbac', 'rest', 's3', 'sdk', 'sla', 'sql', 'ssd', 'ssl', 'tls', 'udf', 'ui', 'uuid', 'wal', 'xml', 'yaml', 'nyc', 'nba', 'nfl', 'mlb', 'us', 'uk', 'eu', 'f1', 'tpc', 'gis'])
export function titleFromSlug(slug) {
  return slug.split('-').filter(Boolean).map((w, i) => {
    const lw = w.toLowerCase()
    if (ACR.has(lw)) return lw.toUpperCase()
    if (i > 0 && SMALL.has(lw)) return lw
    return lw[0].toUpperCase() + lw.slice(1)
  }).join(' ')
}
// Dive title: slug words minus a trailing "-by-<user>-YYYY-MM-DD[-n]" / "-YYYY-MM-DD" suffix.
export function diveTitle(slug) {
  const base = String(slug || '').replace(/-by-[a-z0-9]+-\d{4}-\d{2}-\d{2}(-\d+)?$/, '').replace(/-\d{4}-\d{2}-\d{2}$/, '')
  return titleFromSlug(base)
}

/* ---- events ---- */
const ACRONYM = { ai: 'AI', sf: 'SF', sql: 'SQL', mcp: 'MCP', llm: 'LLM', llms: 'LLMs', nyc: 'NYC', uk: 'UK', us: 'US', bi: 'BI', ml: 'ML',
  aws: 'AWS', api: 'API', etl: 'ETL', cdc: 'CDC', gpu: 'GPU', dbt: 'dbt', duckdb: 'DuckDB', motherduck: 'MotherDuck', ducklake: 'DuckLake', ui: 'UI', csv: 'CSV' }
const EV_SMALL = new Set(['a', 'an', 'and', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with', 'vs', 'from'])
// Event name from slug words: trailing listing year (and duplicate counters) dropped, words title-cased.
export function eventTitleFromSlug(slug) {
  const parts = slug.split('-').filter(Boolean)
  while (parts.length > 1 && /^\d{1,2}$/.test(parts[parts.length - 1]) && /^\d{4}$/.test(parts[parts.length - 2])) parts.pop()
  if (parts.length > 1 && /^\d{4}$/.test(parts[parts.length - 1])) parts.pop()
  return parts.map((w, i) => ACRONYM[w] || (i > 0 && EV_SMALL.has(w) ? w : w[0].toUpperCase() + w.slice(1))).join(' ')
}
// /events upcoming rows: [year, month, day, in person] as the event detail pages have them (extra/data/media.js rows).
export const UPCOMING_EVENT_FACTS = {
  'ducklake-performance-optimization-faster-queries-from-your-lakehouse-2026': [2026, 10, 27, 0],
  'the-data-teams-new-tools-motherduck-at-helsinki-data-week-2026': [2026, 10, 28, 1],
  'data-outpost-2026-2026': [2026, 11, 5, 1],
  'duckdb-20-how-to-speed-up-your-workloads-2026': [2026, 11, 10, 0],
  'aligned-on-decisions-how-our-product-lead-builds-with-data-agents-in-motherduck-2026': [2026, 11, 12, 0],
  'forward-data-conference-2026-2026': [2026, 11, 16, 1],
  'everyone-gets-a-data-agent-whats-coming-in-motherduck-from-our-ceo-2026': [2026, 11, 17, 0],
}

/* ---- learn ---- */
// Learn article title (extra getLearn: fromShape(H1 shape, (hash(slug) % 9000) + 7)). The hub passes its card word
// lengths, which equal the article H1's for every slug but these two (the H1 lengths are used on both sides).
const LEARN_H1_LENS = {
  'motherduck-ai-agent-data-layer': [10, 2, 2, 2, 5, 4, 6, 3, 2, 5, 3, 9, 4, 6, 3, 3, 3, 6],
  'skip-the-cache-embedded-analytics': [3, 10, 7, 4, 1, 7, 5, 3, 8, 9],
}
export const learnSeed = (slug) => (hash(slug) % 9000) + 7
export const learnTitle = (slug, lens) => shapedWords(LEARN_H1_LENS[slug] || lens, learnSeed(slug))

/* ---- people ---- */
// Invented names (no real people). nameOfLength() finds a "First Last" pair with exactly n characters.
const FIRST = ['Bo', 'Jo', 'Ada', 'Eli', 'Ira', 'Kai', 'Lin', 'Max', 'Noa', 'Rae', 'Sol', 'Uma', 'Dana', 'Fern', 'Gale', 'Quin', 'Wren', 'Yael', 'Robin', 'Avery', 'Casey', 'Riley', 'Rowan', 'Emery', 'Jordan', 'Morgan', 'Harper', 'Sawyer', 'Parker', 'Hayden', 'Marlowe', 'Kendall', 'Sterling', 'Florence', 'Augustine']
const LAST = ['Fox', 'Ash', 'Lake', 'Hill', 'Reed', 'Moss', 'Vale', 'Cole', 'Ford', 'Hart', 'Nash', 'Penn', 'Shaw', 'Tate', 'West', 'Stone', 'Field', 'Brook', 'Marsh', 'Birch', 'Rhodes', 'Hollis', 'Mercer', 'Calder', 'Ainsley', 'Whitlock', 'Fairbank', 'Kingsley', 'Thornbury', 'Pemberton', 'Hargreaves', 'Montgomery', 'Featherstone']
export function nameOfLength(n, seed) {
  const r = rng(seed)
  const pairs = []
  for (const f of FIRST) for (const l of LAST) if (f.length + 1 + l.length === n) pairs.push(`${f} ${l}`)
  if (pairs.length) return pick(r, pairs)
  // very long: add a middle initial; very short: closest pair
  for (const f of FIRST) for (const l of LAST) if (f.length + 4 + l.length === n) return `${f} ${pick(r, 'ABCDEFGHJKLMNPRSTW'.split(''))}. ${l}`
  return `${pick(r, FIRST)} ${pick(r, LAST)}`
}
// /authors/<slug> display name (extra authorName(k) = nameOfLength(name length, k * 17 + 3)) for the 23 blog-byline
// authors: [index in the author dataset, measured name length].
const BLOG_AUTHOR_KEYS = {"simon-spati":[107,11],"mehdi-ouazza":[81,12],"jacob-matson":[46,12],"jordan-tigani":[56,13],"ryan-boyd":[100,9],"alex-monahan":[5,12],"sheila-sitaram":[106,14],"marcos-ortiz":[75,12],"garrett-obrien":[38,15],"till-dohmen":[113,11],"hamilton-ulmer":[41,14],"adithya-krishnan":[2,16],"dumky-de-wilde":[33,14],"jerel-navarrete":[52,15],"tino-tereshko":[114,13],"jelte-fennema-nio":[51,17],"aditya-aomani":[3,13],"vasilije-markovic":[115,17],"michael-hunger":[83,14],"louisa-huang":[69,12],"joseph-hwang":[57,12],"emily-lucek":[34,11],"zhenni-wu":[119,9]}
export const BLOG_AUTHOR_SLUGS = Object.keys(BLOG_AUTHOR_KEYS)
export function authorDisplayName(slug) {
  const k = BLOG_AUTHOR_KEYS[slug]
  return k ? nameOfLength(k[1], k[0] * 17 + 3) : null
}
