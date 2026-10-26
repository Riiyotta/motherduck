// /product/ducklake blocks (PAGES_SPEC_MARKETING.md §3 B16).
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, LiftCard, Placeholder, TextInput, Checkbox, OffsetButton, ArrowRight } from '../ui'
import { Btn, Chip, SectionHead, TagTitle } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// ---------- CodePanel ----------
// Prism "tomorrow" palette (§2a, tokens prism-*). Neutral placeholder SQL; tiny tokenizer.
const KW = /^(SELECT|FROM|WHERE|CREATE|TABLE|AS|ATTACH|INSERT|INTO|VALUES|GROUP|BY|ORDER|LIMIT|USE|AND|OR|ON|JOIN|DESC|OR|REPLACE)$/i
function tokens(line) {
  if (line.trim().startsWith('--')) return [[line, 'text-prism-comment']]
  const out = []
  const re = /('[^']*')|(\b\d+\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\()|([A-Za-z_][A-Za-z0-9_.]*)|([*=<>+\-/;(),.])|(\s+)/g
  let m
  while ((m = re.exec(line))) {
    const [s, str, num, fn, word, op] = m
    if (str) out.push([s, 'text-prism-string'])
    else if (num) out.push([s, 'text-prism-number'])
    else if (fn) out.push([s, 'text-prism-function'])
    else if (word) out.push([s, KW.test(word) ? 'text-prism-keyword' : 'text-prism-text'])
    else if (op) out.push([s, 'text-prism-operator'])
    else out.push([s, ''])
  }
  return out
}

// 5 lines, as the original hero snippet (code block 119 = 5 × 23.8 @1440); line lengths chosen so the pre-wrap
// wraps match the original at 390 (7 visual lines here, 13 for SQL_9)
export const SQL_6 = [
  '-- attach a catalog and load a sample file',
  "ATTACH 'lake:analytics' AS lake;",
  'CREATE TABLE lake.events AS',
  "  SELECT * FROM 'events.csv';",
  'SELECT count(*) AS total FROM lake.events;',
]
export const SQL_9 = [
  '-- query a shared table from two places',
  "ATTACH 'lake:analytics' AS lake;",
  'USE lake;',
  'SELECT region, sum(amount) AS revenue',
  'FROM orders',
  "WHERE order_date >= '2026-01-01' AND amount > 0",
  'GROUP BY region',
  'ORDER BY revenue DESC NULLS LAST, region',
  'LIMIT 10;',
]

export const COPY_RESET_MS = 2000 // "Code copied!" restore timing UNMEASURED

export function CodePanel({ lines }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), COPY_RESET_MS)
    return () => clearTimeout(id)
  }, [copied])
  const copy = () => {
    navigator.clipboard?.writeText(lines.join('\n')).catch(() => {})
    setCopied(true)
  }
  return (
    <div className="w-full max-w-[1028px] overflow-hidden rounded-[10px] border-2 border-[rgba(255,255,255,0.2)] bg-prism-bg text-left md:rounded-[16px] lg:rounded-frame">
      <div className="flex items-center justify-between border-b-2 border-[rgba(255,255,255,0.1)] p-[16px] lg:px-[24px]">
        <span aria-live="polite" className="font-sans text-[16px] uppercase leading-[19.2px] text-white md:text-[18px] md:leading-[21.6px]">{copied ? 'Code copied!' : 'SQL'}</span>
        <button type="button" onClick={copy} aria-label="Copy code" className="flex h-[24px] w-[44px] items-center justify-center border-0 bg-transparent px-[10px] text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="8" y="8" width="11" height="11" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 8V5H5v11h3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <pre className="m-0 overflow-auto px-[14px] pb-[20px] pt-[12px] font-mono text-code-block text-prism-text lg:px-[24px] lg:pb-[24px] lg:pt-[16px]">
        {/* code is white-space: pre-wrap on the original, so long lines wrap at narrow widths instead of scrolling */}
        <code className="whitespace-pre-wrap">
          {lines.map((l, i) => (
            <span key={i} className="block">
              {tokens(l).map(([s, c], k) => <span key={k} className={c}>{s}</span>)}
              {l === '' ? ' ' : null}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

// ---------- DuckLakeHero ----------
// Measured: padding 24/254 · 32/460 · 72/263; heading box 340×71.6 · 470×96.2 · 690×144.2 (line 2 is a
// wordmark on the original, rendered as text here); horizon ellipse 2120×431.8@590 · 4100×835@631 · 10820×2204@566.
export function DuckLakeHero({ seed = 1 }) {
  return (
    <>
      <section className="relative overflow-hidden bg-sun pb-[254px] pt-[24px] md:pb-[460px] md:pt-[32px] lg:pb-[263px] lg:pt-[72px]">
        <div aria-hidden="true" className="absolute left-1/2 top-[590px] h-[431.8px] w-[2120px] -translate-x-1/2 rounded-[50%] bg-sky-hover md:top-[631px] md:h-[835px] md:w-[4100px] lg:top-[566px] lg:h-[2204px] lg:w-[10820px]" />
        <Container className="relative flex flex-col items-center gap-[16px] text-center lg:gap-[20px]">
          <Chip tall status="Public Preview" className="bg-yellow-chip-border">MANAGED LAKE</Chip>
          <h1 className="m-0 max-w-[340px] pb-[4.4px] font-mono font-normal uppercase text-ink text-h1-mono-sm md:max-w-[470px] md:pb-[9.8px] md:text-h1-mono-xl-md lg:max-w-[690px] lg:text-h1-mono-xl">
            {fitTitle(12, seed)}
            <br />
            <span className="tracking-[3.2px]">{fitTitle(16, seed + 9)}</span>
          </h1>
          <p className="m-0 max-w-[680px] font-sans text-[18px] font-light leading-[28.8px] text-ink lg:max-w-[636px] lg:text-body-xl">{fit(178, seed + 1)}</p>
          <div className="mt-[16px] flex flex-col items-center gap-[12px] md:flex-row md:gap-[24px]">
            <Btn variant="primary">TRY IT FOR FREE NOW</Btn>
            <Btn variant="secondary">VIEW THE DOCUMENTATION</Btn>
          </div>
        </Container>
      </section>
      {/* gradient stops beyond #6FC2FF 0%, #97D4FF 25% UNMEASURED: ends on cream */}
      <section className="pb-[64px] pt-[48px] md:pb-[82px] md:pt-[40px] lg:py-[120px]" style={{ background: 'linear-gradient(#6FC2FF 0%, #97D4FF 25%, #F4EFEA 100%)' }}>
        <Container className="flex flex-col items-center">
          <SectionHead title={fitTitle(37, seed + 2)} h2Class="text-h2-mono-md lg:text-h2-mono-lg" className="w-full !gap-0" pClass="text-body-md max-w-[620px] pt-[12px] pb-[40px] lg:max-w-[720px] lg:pb-[52px] lg:text-lede-hero">{fit(125, seed + 3)}</SectionHead>
          <CodePanel lines={SQL_6} />
        </Container>
      </section>
    </>
  )
}

// ---------- IcebergVsDuckLake (format names replaced with generic labels) ----------
// Measured: padding-x 100 / 40 / 24, tag plate 32/38.4 (24/28.8 and full width <728), panels 612.5×676 >=1302,
// 3:4 below; label chips 200 wide (14/16.1) or 127 wide (9/10.35) <728.
export function FormatCompare({ lens = [32, 128], seed = 1 }) {
  return (
    <section className="flex flex-col items-center gap-[40px] border-t-2 border-ink px-[24px] pb-[64px] md:gap-[52px] md:px-[40px] md:pb-[56px] xl:px-[100px] xl:pb-[128px]">
      <div className="flex w-full flex-col items-center gap-[12px] text-center">
        <div className="flex w-full justify-center border-2 border-ink bg-ink px-[20px] py-[8px] md:w-fit">
          <h2 className="m-0 font-mono font-normal uppercase text-white text-h2-mono-md md:text-h2-mono-lg">{fitTitle(lens[0], seed)}</h2>
        </div>
        <p className="m-0 max-w-[720px] font-sans text-[16px] font-normal leading-[25.6px] tracking-[0.32px] text-ink md:text-[18px] md:leading-[28.8px] md:tracking-[0.36px]">{fit(lens[1], seed + 1)}</p>
      </div>
      <div className="grid w-full max-w-[1240px] grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[15px]">
        {[['FORMAT A', 'bg-white text-ink'], ['FORMAT B', 'bg-ink text-white']].map(([l, c]) => (
          <div key={l} className="relative">
            <Placeholder label={`${l} diagram`} className="aspect-[3/4] w-full lg:aspect-auto lg:h-[676px]" />
            <span className={`absolute left-1/2 top-[2px] w-[127px] -translate-x-1/2 px-[6px] py-[5px] text-center font-mono text-[9px] uppercase leading-[10.35px] tracking-[0.18px] md:w-[200px] md:px-[10px] md:py-[8px] md:text-[14px] md:leading-[16.1px] md:tracking-[0.28px] xl:top-[1px] ${c}`}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- NewsletterSignup ----------
// Mascot (measured): 218×250 at (4, -262) <728 · 298×340 at (-44, -98) 728–959 · 410×468 at (124, -136) >=960.
export function NewsletterSignup({ lens = [31, 174, 28], seed = 1 }) {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(true)
  return (
    <section className="relative border-t-2 border-ink pb-[50px] pt-[214px] md:pb-[62px] md:pt-[64px] lg:pb-[82px] lg:pt-[74px]">
      <Container className="relative">
        <Placeholder label="Mascot illustration" className="!absolute left-[4px] top-[-262px] h-[250px] w-[218px] md:left-[-44px] md:top-[-98px] md:h-[340px] md:w-[298px] lg:left-[-54px] lg:top-[-136px] lg:h-[414px] lg:w-[362px] xl:left-[124px] xl:h-[468px] xl:w-[410px]" />
        <div className="relative md:ml-[258px] md:max-w-[430px] lg:ml-[345px] lg:max-w-[575px] xl:ml-[577px]">
          <h2 className="m-0 pb-[12px] font-fono text-[24px] font-normal uppercase leading-[33.6px] tracking-[0.01em] text-ink md:-mt-[12px] lg:-mt-[8px] lg:text-[32px] lg:leading-[44.8px]">{fitTitle(lens[0], seed)}</h2>
          <p className="m-0 pb-[32px] font-sans text-body-md text-ink lg:pb-[40px] lg:text-body-xl">{fit(lens[1], seed + 1)}</p>
          <form onSubmit={(e) => e.preventDefault()} className="grid max-w-[420px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-[1fr_107.7px] md:gap-x-[16px] md:gap-y-[20px] lg:grid-cols-[447.3px_111.7px]">
            <TextInput label="WORK EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <OffsetButton type="submit" size="xl" disabled disabledStyle fullWidth wrapperClassName="max-md:!w-[109.7px] max-md:order-last" className="!text-gray-600">SUBMIT</OffsetButton>
            <Checkbox variant="solid" checked={agree} onChange={(e) => setAgree(e.target.checked)} label={fit(lens[2], seed + 2)} className="md:col-span-2" />
          </form>
        </div>
      </Container>
    </section>
  )
}

// ---------- CodeSample ----------
export function CodeSample({ lens = [23, 143], seed = 1 }) {
  return (
    <section className="pb-[64px] pt-[48px] md:pb-[96px] md:pt-[56px] lg:pb-[120px] lg:pt-[72px]">
      <Container className="flex flex-col items-center">
        <SectionHead title={fitTitle(lens[0], seed)} h2Class="text-h2-mono-md lg:text-h2-mono-lg" className="w-full !gap-0" pClass="text-body-md max-w-[620px] pt-[12px] pb-[40px] lg:max-w-[720px] lg:pb-[52px] lg:text-lede-hero">{fit(lens[1], seed + 1)}</SectionHead>
        <CodePanel lines={SQL_9} />
      </Container>
    </section>
  )
}

// ---------- ResourceCarousel ----------
export const RESOURCE_SLIDE_MS = 500 // track transition duration UNMEASURED

const R_TITLE = [43, 31, 67, 37, 113, 64, 63, 68]
const R_BODY = [257, 538, 221, 324, 181, 134, 241, 155]

function RevealCard({ i, seed }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const slug = `/blog/lake-article-${i + 1}`
  return (
    <div ref={ref} className={`mk-reveal-up mr-[24px] w-[342px] shrink-0 md:w-[332px] lg:mr-[32px] lg:w-[392.7px] ${vis ? 'is-visible' : ''}`}>
      <LiftCard lift={14} press={false} innerAs="article" wrapperClassName="h-full" className="flex h-full flex-col overflow-hidden border-2 border-ink">
        <Placeholder ratio="500 / 270" rounded="" bordered={false} label="Article thumbnail" className="border-b-2 border-ink !bg-cream" />
        <div className="flex flex-1 flex-col gap-[8px] bg-white p-[32px]">
          <p className="m-0 font-sans text-accordion-body text-ink opacity-60">Jan {i + 3}, 2026 · Author {String.fromCharCode(65 + i)}</p>
          <h3 className="m-0 font-mono font-normal uppercase text-resource-h3">
            <Link to={slug} className="text-ink no-underline">{fitTitle(R_TITLE[i % 8], seed * 3 + i)}</Link>
          </h3>
          <p className="m-0 line-clamp-[7] font-sans text-accordion-body text-ink">{fit(R_BODY[i % 8], seed * 7 + i)}</p>
        </div>
      </LiftCard>
    </div>
  )
}

export function ResourceCarousel({ count = 8, seed = 1 }) {
  const [idx, setIdx] = useState(0)
  const wrap = useRef(null)
  const step = () => (window.innerWidth < 728 ? 366 : window.innerWidth < 960 ? 356 : 424.7)
  const move = (d) => {
    const visible = Math.max(1, Math.floor((wrap.current?.clientWidth || 0) / step()))
    setIdx((i) => Math.min(Math.max(0, i + d), Math.max(0, count - visible)))
  }
  return (
    <section className="border-t-2 border-ink bg-cream pt-[56px] md:pt-[80px]">
      <Container>
        <h2 className="m-0 font-mono font-normal uppercase text-ink text-h2-mono-tall-sm lg:text-h2-mono-tall">{fitTitle(18, seed)}</h2>
        <div ref={wrap} className="overflow-hidden pb-[32px] pt-[40px]">
          <div className="flex items-stretch" style={{ transform: `translateX(-${idx * step()}px)`, transition: `transform ${RESOURCE_SLIDE_MS}ms ease-in-out` }}>
            {Array.from({ length: count }, (_, i) => <RevealCard key={i} i={i} seed={seed} />)}
          </div>
        </div>
        <div className="flex items-center justify-between pb-[48px]">
          <div className="flex h-[56.2px] items-center gap-[24px] lg:gap-[16px]">
            <button type="button" aria-label="Previous" onClick={() => move(-1)} className="flex h-[28px] w-[28px] items-center justify-center border-0 bg-transparent p-0 text-ink"><ArrowRight size={28} className="rotate-180" /></button>
            <button type="button" aria-label="Next" onClick={() => move(1)} className="flex h-[28px] w-[28px] items-center justify-center border-0 bg-transparent p-0 text-ink"><ArrowRight size={28} /></button>
          </div>
          <Btn variant="primary" size="lg" to="/blog" arrow>VISIT BLOG</Btn>
        </div>
      </Container>
    </section>
  )
}
