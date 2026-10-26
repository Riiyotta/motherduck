// Original neutral placeholder copy, generated to the spec's character / word counts.
// Deterministic (seeded) so renders are stable. Never transcribes the original text.
const BANK = (
  'our team builds simple tools that help people work with data in a calm and clear way we care about ' +
  'small details shared ownership honest feedback and steady progress each week brings new questions ' +
  'about how analysis should feel and we answer them by listening closely testing ideas early and ' +
  'keeping things easy to use for everyone from first query to production workloads across many teams ' +
  'placeholder text stands in here until final copy is written for this page section and layout'
).split(' ')

function rng(seed) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function words(seed) {
  const r = rng(seed)
  const out = []
  let start = true
  return () => {
    let w = BANK[Math.floor(r() * BANK.length)]
    if (start) { w = w[0].toUpperCase() + w.slice(1); start = false }
    if (r() < 0.09) { w += '.'; start = true }
    return w
  }
}

// Sentence-cased text of about `ch` characters (whole words, ending with a period).
export function filler(ch, seed = 1) {
  const next = words(seed)
  let out = ''
  for (;;) {
    const w = next()
    const cand = out ? `${out} ${w}` : w
    if (cand.replace(/\.$/, '').length + 1 > ch) break
    out = cand
  }
  return out.replace(/\.$/, '') + '.'
}

// Heading-style text of about `ch` characters (whole words, no punctuation).
export function heading(ch, seed = 1) {
  const next = words(seed + 101)
  let out = ''
  for (;;) {
    const w = next().replace(/\./g, '')
    const cand = out ? `${out} ${w}` : w
    if (cand.length > ch && out.length >= ch * 0.7) break
    out = cand
    if (out.length >= ch) break
  }
  return out
}
