// Original placeholder copy generator for the content templates (content policy: no source copy).
// Deterministic: the same seed always yields the same text, so every slug renders identically.

const WORDS = (
  'data query table column engine storage cloud local file format schema index cache layer ' +
  'model metric report pipeline workflow notebook analyst developer team project service ' +
  'result answer insight sample batch stream window partition snapshot branch version ' +
  'compute memory thread vector join filter scan merge export import loader driver client ' +
  'server endpoint region account workspace token budget limit latency speed size cost ' +
  'simple fast small quiet steady clear modern portable reliable flexible familiar shared ' +
  'build ship test read write load move store share connect explore review measure tune ' +
  'plan run deploy query join sort group count track check update migrate'
).split(' ')
const GLUE = ['and', 'with', 'for', 'to', 'in', 'from', 'on', 'across', 'at', 'into', 'over', 'by']

export function rng(seed) {
  let a = (Math.imul(seed | 0, 2654435761) ^ 0x9e3779b9) >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export const pick = (r, arr) => arr[Math.floor(r() * arr.length)]
export const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1))

const cap = (w) => w[0].toUpperCase() + w.slice(1)

// Sentence-cased running text of about `chars` characters (ends with a full stop).
export function chars(n, seed = 1) {
  const r = rng(seed)
  const out = []
  let len = 0
  let since = 0
  let stopAt = int(r, 8, 15)
  while (len < n - 1) {
    const glue = since % 4 === 2
    let w = glue ? pick(r, GLUE) : pick(r, WORDS)
    if (since === 0) w = cap(w)
    since++
    if (len + w.length + 2 >= n) {
      out.push(w)
      len += w.length + 1
      break
    }
    if (since >= stopAt) {
      w += '.'
      since = 0
      stopAt = int(r, 8, 15)
    }
    out.push(w)
    len += w.length + 1
  }
  let s = out.join(' ')
  if (!s.endsWith('.')) s += '.'
  return s
}

// Title of about `n` characters (no full stop, words capitalised in sentence case).
export function title(n, seed = 1) {
  const r = rng(seed + 7)
  const out = []
  let len = 0
  let i = 0
  while (len < n) {
    let w = i % 3 === 2 ? pick(r, GLUE) : pick(r, WORDS)
    if (i === 0) w = cap(w)
    if (len + w.length > n + 3 && out.length > 1) break
    out.push(w)
    len += w.length + 1
    i++
  }
  return out.join(' ')
}

// `w` words of running text.
export function words(w, seed = 1) {
  return chars(w * 6.2, seed)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]
export function fmtDate(d) {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}
// Day offset back from a fixed anchor date (deterministic, no Date.now()).
const ANCHOR = Date.UTC(2026, 9, 20)
export const daysAgo = (n) => new Date(ANCHOR - n * 86400000)
export const monthShort = (d) => MONTHS[d.getUTCMonth()]

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Placeholder words whose lengths follow `lengths` exactly (so monospace / Inter lines wrap like the live copy).
// Words are generated from the neutral pool above; no source text is used.
const BY_LEN = {}
for (const w of [...WORDS, ...GLUE]) (BY_LEN[w.length] ||= []).push(w)
export function shaped(lengths, seed = 1, { sentence = true } = {}) {
  const r = rng(seed + 31)
  const out = lengths.map((n, i) => {
    let w
    if (BY_LEN[n]) w = pick(r, BY_LEN[n])
    else if (n < 2) w = 'a'
    else { w = ''; while (w.length < n) w += pick(r, WORDS); w = w.slice(0, n) } // long compound word, no break point
    return sentence && i === 0 ? cap(w) : w
  })
  return out.join(' ')
}

// Exactly `n` characters of title-like copy (word lengths cycle a neutral pattern), via shaped().
export function exactTitle(n, seed = 1) {
  const PAT = [5, 3, 7, 2, 6, 4, 8, 3, 5, 9, 2, 6]
  const lens = []
  let len = -1
  for (let k = (seed % PAT.length); len < n; k++) {
    const w = PAT[k % PAT.length]
    if (len + 1 + w > n) { const rest = n - len - 1; if (rest >= 1) lens.push(rest); break }
    lens.push(w); len += 1 + w
  }
  return shaped(lens, seed)
}
