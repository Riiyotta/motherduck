import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Checkbox, Container, OffsetButton, Placeholder, TextInput } from '../ui'
import { filler, heading } from './copy.js'
import { isEmail } from './forms.js'
import { routeProps } from './links.js'

// NOTE (user decision): LP body grids keep their column count at every width, like the original
// (columns shrink; content that cannot shrink is clipped by the section's overflow:hidden).
// Only the hero collapses (1 column below 728).

const BG = { sun: 'bg-sun', white: 'bg-white', cream: 'bg-cream', teal: 'bg-teal', ink: 'bg-ink text-white' }
const COLOURED = new Set(['sun', 'teal'])

// ---------- G1 LPHero ----------
export function LPHero({ chip, h1, sub, body, cta, finePrint = true, media = 'cover' }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section className="bg-cream pb-[55px] pt-[24px] md:pt-[32px] lg:pb-[136px] lg:pt-[40px]">
      <Container>
        <div className="grid grid-cols-1 items-center gap-[40px] md:grid-cols-[314px_314px] md:gap-[60px] lg:grid-cols-[430px_430px] xl:grid-cols-[591px_591px]">
          <div className="flex flex-col gap-[14px] lg:gap-[20px]">
            <span className="w-fit border-2 border-ink bg-yellow-chip px-[14px] py-[6px] font-mono text-lp-eyebrow uppercase">{chip}</span>
            <h1 className="m-0 font-fono text-lp-h1-md font-normal uppercase lg:text-lp-h1-lg xl:text-lp-h1">{h1}</h1>
            <h2 className="m-0 font-fono text-lp-sub-md font-normal uppercase lg:text-lp-sub">{sub}</h2>
            {body && <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] lg:text-[18px] lg:leading-[28.8px] lg:tracking-[0.36px]">{body}</p>}
            {sent ? (
              <p role="status" className="m-0 mt-[8px] font-mono text-[18px] uppercase leading-[25.2px]">Thanks! Check your inbox.</p>
            ) : (
              <form className="mt-[8px] flex flex-col gap-[10px] lg:flex-row lg:items-center" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <TextInput variant="hide" type="email" required label="Enter your email" name="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" valid={isEmail(email)} />
                <OffsetButton size="lg" type="submit" wrapperClassName="self-start lg:self-auto">{cta}</OffsetButton>
              </form>
            )}
            {finePrint && (
              <p className="m-0 font-sans text-[13px] font-light leading-[18.2px] tracking-[0.26px] opacity-70">{typeof finePrint === 'string' ? finePrint : filler(55, 7)}</p>
            )}
          </div>
          {media === 'cover' ? (
            <div className="flex justify-center [perspective:1200px]">
              <div className="lp-cover w-[343px] max-w-full overflow-hidden rounded-sm border-2 border-ink md:w-[360px]">
                <Placeholder ratio="384 / 497" label="Book cover" bordered={false} rounded="" />
              </div>
            </div>
          ) : (
            <div className="mx-auto aspect-[3/4] w-full max-w-[480px]">
              <Placeholder label="Guide preview image" className="h-full w-full" />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

// ---------- LP section shell + head ----------
// intro tone: 'auto' (coloured -> opacity .6, dark -> white, else #666) | 'ink' | 'white'; introMaxW e.g. 560
export function LPSection({ bg = 'white', title, intro, introMb = 16, introTone = 'auto', introMaxW, children }) {
  const coloured = COLOURED.has(bg)
  const dark = bg === 'ink'
  return (
    <section className={`overflow-hidden border-y border-ink py-[64px] md:py-[80px] lg:py-[96px] ${BG[bg]}`}>
      <Container>
        <div className="max-w-[1280px]">
          {title && <h2 className={`m-0 mb-[16px] font-mono text-lp-h2-sm font-normal uppercase md:text-lp-h2-md lg:mb-[20px] lg:text-lp-h2 ${dark ? 'text-white' : ''}`}>{title}</h2>}
          {intro && (
            <p
              className={`m-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] ${
                introTone === 'ink' ? '' : introTone === 'white' || dark ? 'text-white' : coloured ? 'opacity-60' : 'text-gray-600'
              }`}
              style={{ marginBottom: introMb, maxWidth: introMaxW }}
            >
              {intro}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  )
}

// ---------- G2 BenchmarkCards ----------
function Bar({ label, value, pct, fill, track = 'bg-[rgba(56,56,56,0.1)]', radius = '', valueCls = '' }) {
  return (
    <div>
      <div className="mb-[4px] flex justify-between font-mono text-[14px] leading-[23.8px]">
        <span>{label}</span>
        <span className={`font-semibold ${valueCls}`}>{value}</span>
      </div>
      <div className={`h-[8px] w-full ${track} ${radius}`}>
        <div className={`h-full ${fill} ${radius}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function BenchmarkCards({ notes = [[43, 20], [43, 21]] }) {
  // bar fill widths as measured on the original (placeholder data)
  const cards = [
    { tab: 'Model one · placeholder benchmark', rows: [['Baseline', 7.2], ['With guide', 44.4]] },
    { tab: 'Model two · placeholder benchmark', rows: [['Baseline', 31.2], ['With guide', 59.9]] },
  ]
  return (
    <div className="mb-[32px] grid grid-cols-[repeat(2,1fr)] gap-[40px] xl:grid-cols-[601px_601px]">
      {cards.map((c, i) => (
        <div key={c.tab} className="overflow-hidden border-2 border-ink shadow-hard-6">
          <div className="bg-ink px-[12px] py-[8px] font-mono text-lp-tab uppercase text-white">{c.tab}</div>
          <div className="bg-white p-[24px]">
            <div className="flex flex-col gap-[12px]">
              {c.rows.map(([l, p], k) => (
                <Bar key={l} label={l} value={`${p}%`} pct={p} fill={k === 0 ? 'bg-bar-gray' : 'bg-lp-orange'} />
              ))}
            </div>
            <p className="m-0 mt-[12px] font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] opacity-60">{filler(...notes[i])}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------- G3 StatRow ----------
// Below XL the original's columns are content-sized; `cols` pins the measured widths per range
// ({ sm, md, lg } Tailwind classes); the default is repeat(4, auto).
export function StatRow({ stats = ['3.2x', '47%', '12', '9 of 10'], notes = [[40, 30], [46, 31], [37, 32], [43, 33]], cols = 'grid-cols-[repeat(4,auto)]' }) {
  return (
    <div className={`grid gap-[16px] xl:grid-cols-[repeat(4,298.5px)] ${cols}`}>
      {stats.map((s, i) => (
        <div key={i} className="p-[24px]">
          <h3 className="m-0 mb-[8px] font-mono text-lp-stat font-normal uppercase">{s}</h3>
          <p className="m-0 font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] opacity-60">{filler(...notes[i])}</p>
        </div>
      ))}
    </div>
  )
}

// ---------- G4 TwoColProse ----------
export function TwoColProse({ paras = [[207, 40], [191, 41]] }) {
  return (
    <div className="mt-[24px] grid max-w-[800px] grid-cols-[repeat(2,1fr)] gap-[40px] xl:grid-cols-[380px_380px]">
      {paras.map(([ch, seed], i) => (
        <p key={i} className="m-0 mb-[16px] font-sans text-[16px] font-light leading-[28.8px] tracking-[0.32px] opacity-85">{filler(ch, seed)}</p>
      ))}
    </div>
  )
}

// ---------- G5 CardGrid ----------
const TAB_BG = ['bg-sky-hover', 'bg-sun', 'bg-teal-bright']
// items: optional [[h3 chars, seed, body chars, seed], ...] to tune wraps per card
export function CardGrid({ count, cols = 4, tabs, steps = false, shadow = 'shadow-hard-6', seed = 50, mt = 24, items }) {
  const colCls = cols === 4 ? 'grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(4,292.5px)]' : 'grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(3,398px)]'
  return (
    <div className={`grid gap-[24px] ${colCls}`} style={{ marginTop: mt }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`border-2 border-ink bg-white ${tabs ? 'overflow-hidden' : ''} ${shadow}`}>
          {tabs && (
            <div className={`border-b-2 border-ink px-[12px] py-[8px] font-mono text-lp-tab uppercase text-ink ${TAB_BG[i % 3]}`}>{tabs[i]}</div>
          )}
          <div className="p-[24px]">
            {steps && <p className="m-0 mb-[12px] font-mono text-lp-tab uppercase text-step-label">Step {i + 1}</p>}
            <h3 className={`m-0 mb-[8px] font-mono font-normal uppercase ${steps ? 'text-lp-step-h3' : 'text-lp-card-h3'}`}>{items ? heading(items[i][0], items[i][1]) : heading(steps ? 22 : 26, seed + i)}</h3>
            <p className={`m-0 font-sans text-gray-600 ${steps ? 'text-lp-step-body' : 'text-lp-body'}`}>{items ? filler(items[i][2], items[i][3]) : filler(steps ? 110 : 130, seed + 10 + i)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------- G6 FindingCards (survey) ----------
export function FindingCards({
  titles = [[52, 2713], [50, 4508]],
  barLabels = [[48, 3817], [31, 1579], [39, 4925], [35, 2152], [31, 458]],
  notes = [[35, 2357], [22, 4130], [22, 3845]],
} = {}) {
  // values / fills as measured on the original (placeholder data)
  const bars = [86, 63, 39, 35, 31].map((v, i) => [heading(...barLabels[i]), v])
  const stacked = [['Read only', 52, 'bg-survey-teal'], ['Write and change', 48, 'bg-survey-orange'], ['Schema access', 21, 'bg-survey-teal']]
  // Card 1: h3 mb 4 + caption mb 18; card 2: h3 mb 18. Rows mb 12 (none after the last).
  const Card = ({ tab, title, caption, children }) => (
    <div className="overflow-hidden rounded-tile border-2 border-survey-ink bg-survey-paper text-ink shadow-hard-6-survey">
      <div className="bg-survey-ink px-[14px] py-[9px] font-mono text-lp-tab uppercase text-survey-paper">{tab}</div>
      <div className="p-[24px]">
        <h3 className={`m-0 font-mono text-lp-finding-h3 font-normal uppercase ${caption ? 'mb-[4px]' : 'mb-[18px]'}`}>{title}</h3>
        {caption && <p className="m-0 mb-[18px] font-sans text-[11px] font-light uppercase leading-[15.4px] tracking-[1.32px] opacity-50">{caption}</p>}
        {children}
      </div>
    </div>
  )
  return (
    <div className="mb-[32px] grid grid-cols-[repeat(2,1fr)] items-start gap-[40px] xl:grid-cols-[601px_601px]">
      <Card tab="Finding · placeholder topic" title={heading(...titles[0])} caption="Multi-select · placeholder">
        {bars.map(([l, v], i) => (
          <div key={l} className={`flex items-center gap-[14px] ${i < bars.length - 1 ? 'mb-[12px]' : ''}`}>
            <span className="w-[44%] shrink-0 font-mono text-[14px] leading-[18.2px]">{l}</span>
            <span className="h-[10px] flex-1 rounded-pill bg-survey-track"><span className="block h-full rounded-pill bg-survey-ink" style={{ width: `${v}%` }} /></span>
            <span className="w-[40px] text-right font-mono text-[14px] font-bold leading-[23.8px]">{v}%</span>
          </div>
        ))}
      </Card>
      <Card tab="Finding · second topic" title={heading(...titles[1])}>
        <div className="grid gap-[18px]">
          {stacked.map(([l, v, c], i) => (
            <div key={l}>
              <p className="m-0 mb-[8px] font-sans text-[12px] font-bold uppercase leading-[16.8px] tracking-[1.44px]">{l}</p>
              <div className="mb-[8px] h-[10px] rounded-pill bg-survey-track"><div className={`h-full rounded-pill ${c}`} style={{ width: `${v}%` }} /></div>
              <p className="m-0 font-sans text-[13px] font-light leading-[19.5px] tracking-[0.26px]"><b className="font-mono font-normal">{v}% placeholder;</b> {filler(...notes[i])}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ---------- G7 NumberedList (survey) ----------
// Row text blocks are content-sized on the original; h3 / p lengths follow its character counts.
const NL_ITEMS = [[40, 56], [47, 63], [34, 65], [37, 58], [44, 61], [33, 56], [48, 82]]
export function NumberedList({ items = NL_ITEMS }) {
  return (
    <div className="mt-[24px] max-w-[860px] border-t-2 border-survey-ink">
      {items.map(([hch, pch], i) => (
        <div key={i} className={`flex items-baseline gap-[20px] px-[4px] py-[16px] ${i === items.length - 1 ? 'border-b-2 border-survey-ink' : 'border-b border-[rgba(22,18,12,0.25)]'}`}>
          <span className="font-mono text-[13px] font-semibold leading-[22.1px] opacity-50">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="m-0 font-mono text-[17px] font-normal uppercase leading-[22.1px]">{heading(hch, 70 + i)}</h3>
            <p className="m-0 mt-[4px] font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] text-gray-600">{filler(pch, 80 + i)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------- G8 DarkFeatureGrid ----------
const H3LG = 'text-[24px] leading-[31.2px] lg:text-lp-card-h3-lg' // 32/41.6, 24/31.2 below 960
export function DarkFeatureGrid({ rules, seed = 90, items }) {
  return (
    <div className="mt-[24px] grid grid-cols-[repeat(3,1fr)] gap-[16px] xl:grid-cols-[repeat(3,403.3px)]">
      {rules.map((c, i) => (
        <div key={i} className="border-t-[3px] p-[24px]" style={{ borderTopColor: c }}>
          <h3 className={`m-0 mb-[8px] font-mono font-normal uppercase text-white ${H3LG}`}>{items ? heading(items[i][0], items[i][1]) : heading(14, seed + i)}</h3>
          <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-white opacity-70">{items ? filler(items[i][2], items[i][3]) : filler(110, seed + 10 + i)}</p>
        </div>
      ))}
    </div>
  )
}

// ---------- G9 PartCards ----------
// 3 columns at LG+, 2 at MD, 1 at SM (as on the original)
export function PartCards({ items = [[16, 110, 140, 120], [16, 111, 140, 121], [16, 112, 140, 122]] }) {
  return (
    <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(3,398px)]">
      {TAB_BG.map((bg, i) => (
        <div key={i} className={`border-2 border-black p-[32px] shadow-hard-6-black ${bg}`}>
          <p className="m-0 mb-[8px] font-sans text-[13px] font-semibold uppercase leading-[18.2px] tracking-[0.26px] opacity-70">Part 0{i + 1}</p>
          <h3 className={`m-0 mb-[12px] font-mono font-normal uppercase ${H3LG}`}>{heading(items[i][0], items[i][1])}</h3>
          <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px]">{filler(items[i][2], items[i][3])}</p>
        </div>
      ))}
    </div>
  )
}

// ---------- G10 SplitChecklist ----------
// 2 columns from MD, 1 at SM
export function SplitChecklist({ paras = [[260, 130], [220, 131]], title = [18, 135], checks = [[24, 140], [24, 141], [24, 142], [24, 143]] }) {
  return (
    <div className="mt-[24px] grid grid-cols-1 gap-[40px] md:grid-cols-[repeat(2,1fr)] xl:grid-cols-[601px_601px]">
      <div>
        {paras.map(([ch, seed], i) => <p key={i} className="m-0 mb-[16px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px]">{filler(ch, seed)}</p>)}
      </div>
      <div className="border-2 border-black bg-white p-[32px] shadow-hard-6-black">
        <h3 className={`m-0 mb-[16px] font-mono font-normal uppercase ${H3LG}`}>{heading(...title)}</h3>
        <ul className="m-0 list-none p-0">
          {checks.map(([ch, seed], i) => (
            <li key={i} className={`py-[8px] font-mono text-[18px] leading-[30.6px] ${i < checks.length - 1 ? 'border-b border-[#EEEEEE]' : ''}`}>✓ {heading(ch, seed)}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ---------- G11 AuthorsGrid ----------
// 2 columns from MD, 1 at SM
export function AuthorsGrid({ bios = [[519, 150], [448, 151]] }) {
  return (
    <div className="mt-[24px] grid grid-cols-1 gap-[40px] md:grid-cols-[repeat(2,1fr)] xl:grid-cols-[601px_601px]">
      {bios.map(([ch, seed], i) => (
        <div key={i}>
          <Placeholder width={200} height={200} label={`Author ${i + 1} photo`} bordered={false} className="mb-[16px] max-w-full border-2 border-black shadow-hard-6-black" />
          <h3 className={`m-0 mb-[4px] text-center font-mono font-normal uppercase ${H3LG}`}>Author {i + 1}</h3>
          <p className="m-0 mb-[16px] text-center font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px]">Role placeholder</p>
          <p className="m-0 mb-[16px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px]">{filler(ch, seed)}</p>
        </div>
      ))}
    </div>
  )
}

// ---------- G12 FAQ ----------
// Title row py 34 / 20 (MD-), inner px 30 (XL) / 20 (LG, MD) / 24 (SM); items py 26 / 20 (MD-).
// h2 40/48, 32/44.8 (MD), 24/33.6 (SM); question 23/32.2, 17/23.8 (MD), 16/22.4 (SM).
export function FAQSection({ count, links = [], title = 'Frequently asked questions', qs, as }) {
  const items = Array.from({ length: count }, (_, i) => ({
    q: qs ? `${heading(...qs[i])}?` : `${heading(34 + (i % 3) * 6, 160 + i)}?`,
    a: (
      <p className="m-0">
        {as ? filler(...as[i]) : filler(220, 170 + i)}
        {links[i] && links[i].length > 0 && (
          <> See <InlineLink path={links[i][0]}>{links[i][1]}</InlineLink>.</>
        )}
      </p>
    ),
  }))
  const inner = 'px-[24px] md:px-[20px] xl:px-[30px]'
  return (
    <section className="overflow-hidden border-y border-ink bg-white py-[64px] md:py-[80px] lg:py-[96px]">
      <Container>
        <section className="bg-white">
          <div className={`py-[20px] lg:py-[34px] ${inner}`}>
            <h2 className="m-0 font-mono text-[24px] font-normal uppercase leading-[33.6px] md:text-[32px] md:leading-[44.8px] lg:text-[40px] lg:leading-[48px]">{title}</h2>
          </div>
          <Accordion
            items={items}
            itemClassName="py-[20px] lg:py-[26px]"
            innerClassName={inner}
            qClassName="mr-[8px] text-[16px] uppercase leading-[22.4px] md:mr-[20px] md:text-[17px] md:leading-[23.8px] lg:text-faq-q"
          />
        </section>
      </Container>
    </section>
  )
}

export function InlineLink({ path, children }) {
  const { to } = routeProps(path)
  return to ? <Link to={to} className="underline">{children}</Link> : <span className="underline">{children}</span>
}

// ---------- G13 MutedCardGrid (BI) ----------
const BI_LINKS = [
  ['/product/mcp-server', 'the MCP server'], ['/product/dives', 'Dives'], ['/product/hypertenancy', 'hypertenancy'],
  ['/dive-gallery', 'the gallery'], ['/blog/introducing-embedded-dives', 'this post'], ['/videos/preparing-data-warehouse-for-ai', 'this video'],
]
export function MutedCardGrid({ items }) {
  return (
    <div className="mt-[24px] grid grid-cols-[repeat(3,1fr)] gap-[24px] xl:grid-cols-[repeat(3,398px)]">
      {BI_LINKS.map(([path, label], i) => (
        <div key={i} className="rounded-md bg-muted-card p-[20px] transition-all duration-200 ease-[ease]">
          <h3 className="m-0 mb-[8px] font-mono text-lp-card-h3 font-normal uppercase">{items ? heading(items[i][0], items[i][1]) : heading(24, 180 + i)}</h3>
          <p className="m-0 font-sans text-[15px] font-light leading-[21px] tracking-[0.3px] opacity-70">
            {items ? filler(items[i][2], items[i][3]) : filler(100, 190 + i)} Read about <InlineLink path={path}>{label}</InlineLink>.
          </p>
        </div>
      ))}
    </div>
  )
}

// ---------- G14 SpectrumCards (BI, dark) ----------
export function SpectrumCards({
  titles = [[17, 467], [21, 3106], [18, 202], [18, 203]],
  examples = [[14, 1069], [17, 3504], [20, 4807], [18, 3026]],
  spans = ['Seconds', 'Minutes', 'Days / months', 'Persistent'],
} = {}) {
  return (
    <div className="mt-[36px] grid grid-cols-[repeat(4,1fr)] gap-[20px] xl:grid-cols-[repeat(4,295.5px)]">
      {[0, 1, 2, 3].map((i) => {
        const hot = i === 3
        return (
          <div key={i} className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] px-[24px] py-[28px] text-white">
            <h3 className={`m-0 mb-[6px] font-mono text-[17px] font-normal uppercase leading-[22.1px] ${hot ? 'text-lp-orange' : ''}`}>{heading(...titles[i])}</h3>
            <p className="m-0 mb-[16px] font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] opacity-50">{filler(...examples[i])}</p>
            <div className="border-t border-[rgba(255,255,255,0.1)] pt-[12px]">
              <p className="m-0 font-sans text-[12px] font-light leading-[16.8px] tracking-[0.96px] opacity-40">LIFESPAN</p>
              <p className={`m-0 mt-[4px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] ${hot ? 'text-lp-orange' : ''}`}>{spans[i]}</p>
            </div>
            <span className={`mt-[16px] block h-[8px] w-[8px] rounded-full ${i === 0 ? 'bg-[rgba(255,255,255,0.15)]' : 'bg-lp-orange'}`} />
          </div>
        )
      })}
    </div>
  )
}

// ---------- G15 InsightWithBars (BI) ----------
// Track rgba(255,255,255,.1) r4 on the cream section, so it is nearly invisible (as measured on the original).
export function InsightWithBars({ quote = [309, 210], caption = [19, 1123] } = {}) {
  const rows = [['Option A', 29.8, 'bg-bar-gray'], ['Option B', 30.1, 'bg-bar-gray'], ['Option C', 61, 'bg-lp-orange'], ['Option D', 84, 'bg-lp-orange']]
  return (
    <div className="mt-[24px] grid grid-cols-[repeat(2,1fr)] items-start gap-[40px] xl:grid-cols-[601px_601px]">
      <p className="m-0 mb-[26px] font-sans text-[26px] font-light leading-[39px] tracking-[0.52px]">{filler(...quote)}</p>
      <div>
        <p className="m-0 mb-[16px] font-sans text-[13px] font-light uppercase leading-[18.2px] tracking-[1.04px] opacity-50">
          {filler(...caption)} <span className="underline">placeholder study</span>
        </p>
        <div className="flex flex-col gap-[12px]">
          {rows.map(([l, v, c], i) => (
            <Bar key={l} label={l} value={`${v}%`} pct={v} fill={c} track="bg-[rgba(255,255,255,0.1)]" radius="rounded-tip" valueCls={i === 3 ? 'text-lp-orange' : ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- G16 CodeWindow (cheatsheet) ----------
const K = ({ children }) => <span className="text-code-keyword">{children}</span>
const S = ({ children }) => <span className="text-code-string">{children}</span>
const C = ({ children }) => <span className="text-code-comment">{children}</span>
const N = ({ children }) => <span className="text-code-number">{children}</span>
export function CodeWindow() {
  return (
    <div className="mx-auto mt-[32px] max-w-[720px] overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-code-bg">
      <div className="flex items-center gap-[8px] px-[16px] py-[12px]">
        <span className="h-[12px] w-[12px] rounded-full bg-code-red" />
        <span className="h-[12px] w-[12px] rounded-full bg-code-yellow" />
        <span className="h-[12px] w-[12px] rounded-full bg-code-green" />
        <span className="ml-auto font-[monospace] text-[12px] leading-[20.4px] text-[rgba(255,255,255,0.3)]">examples.sql</span>
      </div>
      <pre className="m-0 overflow-x-auto px-[24px] pb-[28px] pt-[16px] font-code text-[14px] leading-[23.8px] text-code-text">
        <code>
          <C>-- 1. Read a local file</C>{'\n'}
          <K>SELECT</K> * <K>FROM</K> <S>'events.csv'</S> <K>LIMIT</K> <N>10</N>;{'\n'}
          {'\n'}
          <C>-- 2. Summarise by group</C>{'\n'}
          <K>SELECT</K> category, <K>count</K>(*) <K>AS</K> n{'\n'}
          <K>FROM</K> items{'\n'}
          <K>GROUP BY</K> category{'\n'}
          <K>ORDER BY</K> n <K>DESC</K>;{'\n'}
          {'\n'}
          <C>-- 3. Create a table from a query</C>{'\n'}
          <K>CREATE TABLE</K> recent <K>AS</K>{'\n'}
          <K>SELECT</K> * <K>FROM</K> items <K>WHERE</K> created_at {'>'} <S>'2026-01-01'</S>;{'\n'}
          {'\n'}
          <C>-- 4. Window function</C>{'\n'}
          <K>SELECT</K> id, amount,{'\n'}
          {'  '}<K>sum</K>(amount) <K>OVER</K> (<K>ORDER BY</K> id) <K>AS</K> running{'\n'}
          <K>FROM</K> payments;{'\n'}
          {'\n'}
          <C>-- 5. Export results</C>{'\n'}
          <K>COPY</K> recent <K>TO</K> <S>'recent.parquet'</S>{'\n'}
          {'  '}(<K>FORMAT</K> parquet);{'\n'}
          <C>-- end of examples</C>
        </code>
      </pre>
    </div>
  )
}

// ---------- G17 Postgres blocks ----------
// h2: Mono 700 UPPER, ls -0.03em, lh 1.3, size clamp(28px, 4.4vw, 44px) (panel: clamp(28px, 4.6vw, 48px)).
// Margins: eyebrow 14 (panel 16), h2 0.5em, intro 17. Panel padding clamp(28px, 4vw, 56px).
function PgHead({ eyebrow, title, intro, dark = false, titleMaxW = 760, introMaxW = 620 }) {
  return (
    <div>
      <p className={`m-0 font-code text-[12px] uppercase leading-[20.4px] ${dark ? 'mb-[16px] tracking-[1.92px] text-pg-yellow' : 'mb-[14px] tracking-[1.68px] text-pg-eyebrow'}`}>{eyebrow}</p>
      <h2
        className={`m-0 font-mono font-bold uppercase leading-[1.3] tracking-[-0.03em] mb-[0.5em] ${dark ? 'text-[clamp(28px,4.6vw,48px)] text-white' : 'text-[clamp(28px,4.4vw,44px)] text-pg-head'}`}
        style={{ maxWidth: titleMaxW }}
      >
        {title}
      </h2>
      {intro && <p className={`m-0 mb-[17px] font-sans text-[17px] font-light leading-[26.35px] tracking-[0.34px] ${dark ? 'text-pg-body-light' : 'text-pg-body'}`} style={{ maxWidth: introMaxW }}>{intro}</p>}
    </div>
  )
}

// Copy props are [chars, seed] pairs (tuned per page). Grids: signs 4 / 3 (LG) / 2 (MD) / 1 (SM);
// quotes 3 / 2 (MD) / 1 (SM); the architecture row stacks at SM.
export function PgSignCards({ eyebrow = [24, 219], title = [36, 220], intro = [120, 221], items }) {
  const list = items || Array.from({ length: 7 }, (_, i) => [20, 225 + i, 90, 235 + i])
  return (
    <div className="max-w-[1100px]">
      <PgHead eyebrow={heading(...eyebrow)} title={heading(...title)} intro={filler(...intro)} />
      <div className="grid grid-cols-1 gap-[16px] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,263px)]">
        {list.map(([hc, hs, pc, ps], i) => (
          <div key={i} className="flex flex-col gap-[11px] rounded-tile border border-pg-rule bg-white px-[22px] py-[24px]">
            <span className="font-code text-[13px] font-bold leading-[22.1px] tracking-[0.65px] text-garden">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-mono text-[18px] font-bold leading-[22.5px] text-pg-head">{heading(hc, hs)}</span>
            <span className="font-mono text-[14.5px] leading-[21.75px] text-pg-sub">{filler(pc, ps)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PgArchitecturePanel({ eyebrow = [19, 239], title = [28, 240], intro = [110, 241], bodies = [[70, 245], [70, 246], [70, 247]] }) {
  // [eyebrow, title, pill, highlighted]; the middle card is the highlighted engine
  const cards = [['Primary store · writes', 'Database', 'as is', false], ['Columnar store · reads', 'Engine room', 'big speedup', true], ['The read path', 'Your dashboards', '~000ms', false]]
  const links = [['periodic copy', 'connector'], ['standard protocol link', 'same client']]
  const Arrow = () => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><path d="M3 13h18M15 7l6 6-6 6" stroke="#FFDE02" strokeWidth="2" /></svg>
  )
  return (
    <div className="max-w-[1080px] rounded-2xl bg-pg-panel p-[clamp(28px,4vw,56px)]">
      <PgHead dark eyebrow={heading(...eyebrow)} title={heading(...title)} intro={filler(...intro)} titleMaxW="none" introMaxW={680} />
      <div className="mt-[34px] flex flex-col items-stretch gap-[12px] md:flex-row md:gap-0">
        {cards.map(([eb, t, pill, hi], i) => (
          <div key={t} className="contents">
            <div className={`flex min-w-0 shrink flex-col gap-[9px] rounded-bubble border px-[22px] py-[24px] md:max-lg:shrink-0 lg:w-[258.7px] ${i === 0 ? 'md:max-lg:w-[151.4px]' : 'md:max-lg:w-[178.2px]'} ${hi ? 'border-garden bg-pg-card-hi' : 'border-pg-card-bd bg-pg-card'}`}>
              <span className={`font-code text-[10.5px] uppercase leading-[17.85px] tracking-[1.26px] ${hi ? 'text-garden' : 'text-[#6E7066]'}`}>{eb}</span>
              <span className="font-mono text-[22px] font-bold leading-[37.4px] tracking-[-0.22px] text-white">{t}</span>
              <span className={`font-mono text-[14px] leading-[21px] ${hi ? 'text-[#B8BAB0]' : 'text-[#9A9C92]'}`}>{filler(...bodies[i])}</span>
              <span className={`w-fit rounded-[7px] px-[11px] py-[5px] font-code text-[11px] leading-[18.7px] ${hi ? 'bg-garden font-bold text-pg-panel' : 'bg-[#1F201A] text-garden'}`}>{pill}</span>
            </div>
            {i < 2 && (
              <div className="flex min-w-0 shrink-0 flex-col items-center justify-center gap-[6px] text-center md:w-[96px]">
                <span className="max-w-[86px] font-code text-[10.5px] leading-[13.65px] text-pg-connector">{links[i][0]}</span>
                <span className="rotate-90 md:rotate-0"><Arrow /></span>
                <span className="font-code text-[10px] leading-[17px] text-[#6E7066]">{links[i][1]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PgChapterList({ eyebrow = [26, 249], title = [24, 250], rows, callout = [[51, 275], [192, 276]] }) {
  const list = rows || Array.from({ length: 7 }, (_, i) => [30, 255 + i, 70, 265 + i])
  return (
    <div className="max-w-[980px]">
      <PgHead eyebrow={heading(...eyebrow)} title={heading(...title)} titleMaxW={680} />
      <div className="border-t border-pg-rule">
        {list.map(([hc, hs, pc, ps], i) => (
          <div key={i} className="flex items-baseline gap-[18px] border-b border-pg-rule px-[4px] py-[20px]">
            <span className="w-[34px] shrink-0 font-code text-[14px] font-bold leading-[23.8px] text-pg-num-mute">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex flex-col gap-[4px]">
              <span className="font-mono text-[19px] font-bold leading-[22.8px] text-pg-head">{heading(hc, hs)}</span>
              <span className="font-mono text-[15px] leading-[22.5px] text-pg-sub">{filler(pc, ps)}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Callout measured on the original: bg #EFFAF7, 1px #CDEBE5, r 18, padding 30/32, margin-top 30 */}
      <div className="mt-[30px] flex items-center gap-[28px] rounded-[18px] border border-pg-callout-bd bg-pg-callout-bg px-[32px] py-[30px]">
        <div className="flex flex-col gap-[8px]">
          <span className="font-code text-[11px] uppercase leading-[18.7px] tracking-[1.43px] text-pg-callout-eyebrow">Bonus material</span>
          <span className="font-mono text-[20px] font-bold leading-[24px] text-pg-head lg:text-[26px] lg:leading-[31.2px]">{heading(...callout[0])}</span>
          <span className="font-mono text-[15px] leading-[22.5px] text-pg-callout-body">{filler(...callout[1])}</span>
        </div>
      </div>
    </div>
  )
}

export function PgQuoteCards({ eyebrow = [24, 279], title = [22, 280], quotes = [[200, 285], [200, 286], [200, 287]] }) {
  const roles = ['founder · placeholder team', 'engineer · placeholder company', 'engineer · placeholder']
  return (
    <div className="max-w-[1080px]">
      <PgHead eyebrow={heading(...eyebrow)} title={heading(...title)} titleMaxW={720} />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(3,346.7px)]">
        {quotes.map((q, i) => (
          <div key={i} className="flex flex-col gap-[16px] rounded-bubble border border-pg-rule bg-white px-[26px] py-[28px]">
            <span className="font-mono text-[40px] font-bold leading-[20px] text-pg-yellow">“</span>
            <span className="font-mono text-[18px] leading-[27px] text-pg-quote">{filler(...q)}</span>
            <div className="mt-auto flex items-center gap-[9px] border-t border-pg-quote-rule pt-[14px]">
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-garden" />
              <span className="font-code text-[12.5px] leading-[21.25px] text-pg-sub">{roles[i]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------- G18 GatedFormSection ----------
export function GatedFormSection({ title, intro }) {
  const [v, setV] = useState({ first: '', last: '', email: '', company: '' })
  const [sub, setSub] = useState(true)
  const [sent, setSent] = useState(false)
  const [count, setCount] = useState(5)
  const ok = v.first.trim() && v.last.trim() && isEmail(v.email) && v.company.trim()
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  useEffect(() => {
    if (!sent || count <= 0) return undefined
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [sent, count])
  return (
    <section className="overflow-hidden border-y border-ink bg-cream py-[64px] md:py-[80px] lg:py-[96px]">
      <Container>
        <div className="mx-auto max-w-[840px]">
          <h2 className="m-0 mb-[12px] text-center font-mono text-[28px] font-normal uppercase leading-[39.2px] md:text-[36px] md:leading-[50.4px] lg:text-lp-form-h2">{title}</h2>
          <p className="m-0 mb-[16px] text-center font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] opacity-85">{intro}</p>
          <div className="relative flex flex-col gap-[24px] px-[24px] pb-[80px] md:px-[72px]">
            <form noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }}
              className="grid grid-cols-2 gap-[16px] xl:grid-cols-[340px_340px]" aria-hidden={sent || undefined}>
              <TextInput variant="hide" label="First Name" name="firstname" value={v.first} onChange={set('first')} />
              <TextInput variant="hide" label="Last Name" name="lastname" value={v.last} onChange={set('last')} />
              <TextInput variant="hide" label="E-mail" name="email" value={v.email} onChange={set('email')} valid={isEmail(v.email)} className="col-span-2" />
              <TextInput variant="hide" label="Company Name" name="company" value={v.company} onChange={set('company')} className="col-span-2" />
              <Checkbox className="col-span-2" checked={sub} onChange={(e) => setSub(e.target.checked)} label="Subscribe to email updates" />
              <div className="col-span-2 mt-[8px]">
                <OffsetButton size="lg" type="submit" disabled={!ok} disabledStyle>Submit</OffsetButton>
              </div>
            </form>
            <div
              role="status"
              className={`absolute inset-0 flex flex-col items-center gap-[36px] bg-cream px-[24px] pb-[64px] transition-opacity duration-300 md:px-[64px] ${sent ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              {sent && (
                <>
                  <Placeholder width={240} ratio="900 / 472" label="Download thumbnail" />
                  <p className="m-0 text-center font-mono text-[30px] font-light uppercase leading-[42px] tracking-[0.6px]">
                    {count > 0 ? `Thanks! Opening in ${count} sec` : 'Thanks! (preview: no redirect)'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
