// Original placeholder copy for the marketing templates (content policy: no source copy).
// Deterministic word generator so text matches the spec's word / line counts without copying.
const WORDS = (
  'data team query cloud fast simple scale local model shared table build ship answer insight ' +
  'workflow engine storage compute small large every reliable secure open format project ' +
  'pipeline report metric analyst developer product service user customer warehouse lake file ' +
  'sync access control cost speed latency result question tool stack layer instance region ' +
  'support plan feature agent context guide schema source column row join cache serverless ' +
  'clear modern familiar flexible predictable focused steady direct quiet friendly capable ' +
  'run load read write move store share connect explore review measure manage deploy test'
).split(' ')
const GLUE = ['and', 'with', 'for', 'to', 'in', 'from', 'on', 'without', 'across', 'at']

function rng(seed) {
  let s = (seed * 2654435761) >>> 0 || 1
  return () => {
    s ^= s << 13; s >>>= 0
    s ^= s >>> 17
    s ^= s << 5; s >>>= 0
    return s / 4294967296
  }
}

// `n` words of sentence-cased text, split into sentences of 8–14 words.
export function text(n, seed = 1) {
  const r = rng(seed)
  const out = []
  let sinceStop = 0
  let nextStop = 8 + Math.floor(r() * 7)
  for (let i = 0; i < n; i++) {
    let w = (i % 4 === 2 ? GLUE : WORDS)[Math.floor(r() * (i % 4 === 2 ? GLUE.length : WORDS.length))]
    if (sinceStop === 0) w = w[0].toUpperCase() + w.slice(1)
    sinceStop++
    if (sinceStop >= nextStop || i === n - 1) {
      w += '.'
      sinceStop = 0
      nextStop = 8 + Math.floor(r() * 7)
    }
    out.push(w)
  }
  return out.join(' ')
}

// `n` words, no trailing period (headings, titles).
export function title(n, seed = 1) {
  return text(n, seed).replace(/\./g, '')
}

export const upper = (n, seed) => title(n, seed).toUpperCase()

// Generic stand-ins for the compared products (no competitor names or logos).
export const COMPETITORS = {
  clickhouse: 'Warehouse A',
  databricks: 'Warehouse B',
  postgresql: 'Warehouse C',
  bigquery: 'Warehouse D',
  redshift: 'Warehouse E',
  snowflake: 'Warehouse F',
}

// Generic stand-in for the product name in UI labels (no brand names).
export const BRAND = 'Our platform'

// Sentence-cased text cut to about `chars` characters (whole words), so placeholder copy can match the
// original's character counts and therefore its line wraps. `period: false` gives a heading (no full stops).
export function fit(chars, seed = 1, { period = true } = {}) {
  const words = text(Math.ceil(chars / 3) + 8, seed).split(' ')
  let out = ''
  for (const w of words) {
    const next = out ? `${out} ${w}` : w
    if (next.length > chars && out) {
      // headings never overshoot (one extra word can add a line); body copy takes the closer length
      if (period && Math.abs(next.length - chars) < Math.abs(out.length - chars)) out = next
      break
    }
    out = next
  }
  out = out.replace(/[.,]$/, '')
  // Close any remaining gap with one short filler word so the count lands within a character.
  const gap = chars - out.length - 1
  if (gap >= 1 && FILL[gap]) out = `${out} ${FILL[gap]}`
  return period ? `${out}.` : out.replace(/\./g, '')
}
const FILL = { 1: 'a', 2: 'to', 3: 'and', 4: 'with', 5: 'query', 6: 'secure', 7: 'project', 8: 'pipeline' }
export const fitTitle = (chars, seed) => fit(chars, seed, { period: false })
