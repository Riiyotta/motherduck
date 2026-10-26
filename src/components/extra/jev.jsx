// X21 /jev-full (PAGES_SPEC_EXTRA §7): bespoke dark LP. Sections: #141413 hero -> sun ROI calculator ->
// #141413 pricing -> sun closing. Geist / Geist Mono / Anybody are loaded for this route only.
// Model names, prices and partner labels are invented placeholders.
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Placeholder } from '../ui'
import { words } from './generic.jsx'
import '../../styles/extra-marketing.css'

const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Anybody:wght@100..900&family=Geist:wght@600&family=Geist+Mono:wght@400;500;700&display=swap'
function useJevFonts() {
  useEffect(() => {
    if (document.getElementById('xm-jev-fonts')) return undefined
    const l = document.createElement('link')
    l.id = 'xm-jev-fonts'
    l.rel = 'stylesheet'
    l.href = FONTS_HREF
    document.head.appendChild(l)
    return () => l.remove()
  }, [])
}

// Tailwind emits an empty rule for font-[Geist_Mono,...] (read as a font-weight), so the family lives in a class.
const GM = 'xm-gm'
const MUTED = 'text-[#A19C91]'
const SEC = 'py-[64px] md:py-[80px] lg:py-[96px]'

function Pill({ solid, to, children, full }) {
  const cls = `xm-jv-pill inline-flex h-[56px] items-center justify-center gap-[12px] rounded-pill border-2 px-[28px] font-[Geist,Inter,sans-serif] text-[16px] font-semibold leading-[27.2px] no-underline ${full ? 'max-md:w-full' : ''} ${solid ? 'border-sun bg-sun text-[#141413]' : 'border-[#F4EFEA] text-[#F4EFEA]'}`
  const inner = (
    <>
      {children}
      {solid && <span className={`grid h-[28px] w-[28px] place-items-center rounded-full bg-[#141413] font-mono text-[14px] font-semibold leading-[23.8px] text-sun`}>→</span>}
    </>
  )
  return to ? <Link to={to} className={cls}>{inner}</Link> : <span className={cls}>{inner}</span>
}

// ---------- hero ----------
const STATS = [['48×', 25], ['75×', 15], ['$0.50', 21], ['97%', 33]]
const SOURCES = ['Files', 'MCP', 'CRM', 'Ads', 'Spreadsheets', 'Tickets', 'Chat', 'Analytics', 'Anything']
function Hero() {
  return (
    <section className="bg-[#141413] pb-[64px] pt-[24px] text-[#F4EFEA] md:pb-[80px] md:pt-[32px] lg:pb-[96px] lg:pt-[40px]">
      <Container>
        <div className="mx-auto max-w-[1200px] pt-[8px]">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-[504px_360px] lg:justify-between lg:gap-[56px] xl:grid-cols-[784px_360px]">
            <div>
              {/* CRT heading: scanline-filled transparent text; typed last line + block cursor (extra-marketing.css) */}
              <h1 className="xm-crt xm-jv-h1 xm-gm m-0 mt-[8px] font-bold uppercase [&>span]:font-mono">
                <span className="block">Make choices</span>
                <span className="block">with data</span>
                <span className="block">75× cheaper</span>
                <span className="block normal-case">&gt; <span className="xm-jv-type">ask_model()</span><i aria-hidden="true" className="xm-jv-cursor" /></span>
              </h1>
              <p className={`m-0 mt-[30px] max-w-[86%] font-sans text-[18px] font-light leading-[27px] tracking-[0.36px] lg:text-[19.2px] lg:leading-[28.8px] lg:tracking-[0.384px] xl:text-[21px] xl:leading-[31.5px] xl:tracking-[0.42px] ${MUTED}`}>
                {words(120, 12001)} <strong className="font-mono font-medium text-[#F4EFEA]">{words(26, 12002, { sentence: false })}</strong>.
              </p>
              <div className="mt-[28px] flex flex-col gap-[12px] md:flex-row">
                {/* sign-up (auth) + docs (excluded) -> non-links */}
                <Pill solid full>Start free</Pill>
                <Pill full>Read the model docs</Pill>
              </div>
            </div>
            <Placeholder label="Product demo video" bordered={false} className="h-[192.4px] w-full rounded-[22px] md:h-[387px] lg:h-[640px] lg:w-[360px]" />
          </div>
          <div className="mt-[64px] grid grid-cols-2 border-t border-[#3A3A35] lg:grid-cols-4">
            {STATS.map(([v, c], i) => (
              <div key={i} className={`flex flex-col gap-[6px] pb-[26px] pr-[20px] pt-[22px] ${i % 2 === 1 ? 'border-l border-[#F4EFEA] pl-[20px]' : ''} ${i >= 2 ? 'max-lg:border-t max-lg:border-t-[#3A3A35]' : ''} ${i === 2 ? 'lg:border-l lg:border-[#F4EFEA] lg:pl-[20px]' : ''}`}>
                <strong className={`${GM} xm-jv-stat font-bold`}>{v}</strong>
                <span className={`${GM} text-[12px] leading-[20.4px] ${MUTED}`}>{words(c, 12010 + i, { sentence: false }).toLowerCase()}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[20px] border-t border-[#3A3A35] pb-[8px] pt-[22px] md:flex-row md:items-center">
            <span className={`${GM} shrink-0 text-[12px] uppercase leading-[20.4px] tracking-[0.96px] ${MUTED}`}>Choose your data sources</span>
            <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0">
              {SOURCES.map((s, i) => (
                <li key={s} className={`${GM} rounded-pill border px-[16px] py-[8px] text-[14px] font-medium leading-[23.8px] ${i === SOURCES.length - 1 ? 'border-sun bg-sun font-bold text-[#141413]' : 'border-[#3A3A35]'}`}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ---------- ROI calculator ----------
// The original's calculator does not respond in a static render (formula UNMEASURED). Defaults measured: 10,000,000 rows ->
// $50 model cost vs $3,758 with the comparison LLM, $3,708 saved, 52 hours saved. Local, monotonic stand-in:
// rows = 10^(4 + v * 1.5 / 100) for slider v in 0..300 (v = 200 -> 10M); cost scales linearly with rows.
const MODELS = [['large-llm', 3.758e-4, 53], ['mid-llm', 1.9e-4, 41], ['small-llm', 6.2e-5, 22], ['mini-llm', 3.1e-5, 17]]
const fmt = (n) => Math.round(n).toLocaleString('en-US')
const B = ({ children }) => <b className="font-mono font-medium">{children}</b>
function Calculator() {
  const [v, setV] = useState(200)
  const [m, setM] = useState(0)
  const r = useMemo(() => {
    const rows = 10 ** (4 + (v * 1.5) / 100)
    const jev = rows * 5e-6
    const llm = rows * MODELS[m][1]
    const llmHrs = (rows / 1e7) * MODELS[m][2]
    const jevMin = (rows / 1e7) * 67
    return { rows, jev, llm, saved: Math.max(0, llm - jev), hrs: Math.max(0, llmHrs - jevMin / 60), x: Math.max(1, Math.round(llm / jev)), llmHrs, jevMin }
  }, [v, m])
  const cells = [
    // figures inside the caption are Mono 500 <b> on the original
    ['Model cost', `$${fmt(r.jev)}`, <>vs <B>${fmt(r.llm)}</B> with the LLM</>],
    ['You save', `$${fmt(r.saved)}`, <><B>{r.x}×</B> cheaper every month</>],
    ['Hours saved', `${fmt(r.hrs)} hrs`, <>done in <B>{fmt(r.jevMin)} min</B> instead of <B>{fmt(r.llmHrs)} hrs</B></>],
  ]
  return (
    <section id="savings" className={`bg-sun ${SEC}`}>
      <Container>
        <div id="roi" className="mx-auto max-w-[1200px]">
          <div className="overflow-hidden rounded-[28px] border-2 border-[#141413] bg-sun text-[#141413]">
            <div className="grid grid-cols-1 gap-[24px] px-[32px] py-[28px] lg:grid-cols-[1fr_488.8px]">
              <div>
                <label htmlFor="jvRows" className={`${GM} block text-[12px] uppercase leading-[16.8px] tracking-[0.96px] md:leading-[19.2px]`}>Rows per month</label>
                <output htmlFor="jvRows" className="xm-jv-rows mt-[8px] block font-[Anybody,sans-serif] font-extrabold">{fmt(r.rows)}</output>
                <input id="jvRows" type="range" min="0" max="300" value={v} onChange={(e) => setV(+e.target.value)} aria-label="Rows per month"
                  className="xm-jv-range mb-[11.6px] mt-[20px] block h-[36px] w-full" />
              </div>
              <div className="flex flex-col gap-[12px] lg:items-end">
                <span className={`${GM} text-[12px] uppercase leading-[20.4px] tracking-[0.96px]`}>Compare against</span>
                <div className="flex flex-wrap gap-[6px] lg:justify-end" role="group" aria-label="Compare against">
                  {MODELS.map(([name], i) => (
                    <button key={name} type="button" aria-pressed={i === m} onClick={() => setM(i)}
                      className={`${GM} rounded-pill border-2 border-[#141413] px-[12px] py-[8px] text-[13px] font-medium leading-normal ${i === m ? 'bg-[#141413] text-sun' : 'bg-transparent text-[#141413]'}`}>{name}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 bg-[#141413] lg:grid-cols-3" aria-live="polite">
              {cells.map(([l, val, sub], i) => (
                <div key={l} className="flex flex-col gap-[10px] px-[32px] pb-[32px] pt-[28px]">
                  <span className={`${GM} text-[12px] uppercase leading-[20.4px] tracking-[0.96px] ${MUTED}`}>{l}</span>
                  <span className={`xm-crt ${GM} xm-jv-out font-bold uppercase`}>{val}</span>
                  <span className={`${GM} text-[13px] leading-[22.1px] ${MUTED}`}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="m-0 max-w-[780px] font-sans text-[13px] font-light leading-[19.5px] tracking-[0.26px] text-[#3D3A1E]">{words(158, 12020)}</p>
        </div>
      </Container>
    </section>
  )
}

// ---------- pricing ----------
const METERS = [
  { minH: 'lg:min-h-[95.7px]', label: ['Model', 'AI units'], price: '$1', per: 'per 20M input tokens', rows: [['Output tokens', 'Free'], ['Typical cost, 100k rows', '≈ $0.50'], ['Default daily soft limit', '10 units ($10)']] },
  { minH: 'lg:min-h-[161.9px]', label: ['Compute', 'Instance time'], price: '$0.60', per: 'per hour and up, only while queries run', rows: [['Small instance', 'Per CU-second'], ['Medium to XL', 'Business plan'], ['Storage', '$0.05 / GB / month']] },
]
const SIZES = [['Small', '$0.50', 0.04, 'None', 21], ['Medium', '$2.00', 0.16, '1 min', 18], ['Large', '$4.00', 0.32, '1 min', 22], ['XL', '$10.00', 0.6, '5 min', 21], ['XXL', '$20.00', 1, '10 min', 18]]
const PLANS = [['Business', '$250', 'platform fee / month', [22, 34, 20], true], ['Enterprise', 'Custom', 'talk to sales', [22, 19, 34], false]]
function Pricing() {
  return (
    <section id="pricing" className={`bg-[#141413] text-[#F4EFEA] ${SEC}`}>
      <Container>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-[1fr_371.7px] lg:items-end xl:grid-cols-[1fr_488.9px]">
            <h2 className="xm-crt xm-jv-flick xm-jv-h2 xm-gm m-0 font-bold uppercase [&>span]:font-mono">
              <span className="block">Where it</span>
              <span className="xm-jv-h2b block">pays off</span>
            </h2>
            <p className={`m-0 font-sans text-[18px] font-light leading-[27.9px] tracking-[0.36px] ${MUTED}`}>{words(183, 12030)}</p>
          </div>
          <div className="mt-[48px] grid grid-cols-1 gap-[20px] rounded-[34px] border border-sun p-[16px] lg:grid-cols-2">
            {METERS.map((mt, i) => (
              <div key={i} className="flex flex-col gap-[12px] rounded-[28px] border border-[#3A3A35] bg-[#1F1F1C] px-[30px] pb-[26px] pt-[28px]">
                <p className={`m-0 flex justify-between font-mono text-[12px] font-light uppercase leading-[16.8px] tracking-[0.96px] ${MUTED}`}><span>{mt.label[0]}</span><span>{mt.label[1]}</span></p>
                <p className={`m-0 flex flex-wrap items-end gap-x-[12px] pt-[20px] ${mt.minH}`}>
                  <strong className={`${GM} xm-jv-meter font-bold`}>{mt.price}</strong>
                  <span className="pb-[6px] font-mono text-[17px] font-medium leading-[22.1px]">{mt.per}</span>
                </p>
                <ul className="m-0 list-none p-0">
                  {mt.rows.map(([a, b]) => (
                    <li key={a} className="flex items-center justify-between gap-[12px] border-b border-[#3A3A35] py-[12px] font-mono text-[15px] leading-[25.5px]">
                      <span className={MUTED}>{a}</span><span className={GM}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-[56px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between">
            <h3 className={`${GM} m-0 text-[14px] font-medium uppercase leading-[18.2px] tracking-[1.12px] text-sun`}>Instance sizes</h3>
            <p className={`m-0 font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] ${MUTED}`}>Tier 1 region prices, for example one US region</p>
          </div>
          <div className="mt-[16px] overflow-x-auto rounded-[24px] border border-[#3A3A35] bg-[#1F1F1C]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>{['Instance', 'Price / hour', 'Relative price', 'Cooldown', 'Best for'].map((h) => <th key={h} className={`${GM} border-b border-[#3A3A35] px-[24px] py-[17px] text-left text-[11px] font-medium uppercase leading-[18.7px] tracking-[0.88px] ${MUTED}`}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {SIZES.map(([n, p, rel, cd, bf], i) => (
                  <tr key={n} className={i < SIZES.length - 1 ? 'border-b border-[#3A3A35]' : ''}>
                    <td className="px-[24px] py-[17px] font-mono text-[16px] font-semibold leading-[27.2px]">{n}</td>
                    <td className={`${GM} px-[24px] py-[17px] text-[16px] font-bold leading-[27.2px] text-sun`}>{p}</td>
                    <td className="px-[24px] py-[17px]"><span className="block h-[8px] rounded-pill bg-[#3A3A35]"><span className="block h-full rounded-pill bg-sun" style={{ width: `${rel * 100}%` }} /></span></td>
                    <td className="px-[24px] py-[17px] font-mono text-[15px] leading-[25.5px]">{cd}</td>
                    <td className={`px-[24px] py-[17px] font-mono text-[15px] leading-[25.5px] ${MUTED}`}>{words(bf, 12040 + i, { sentence: false })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[56px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between">
            <h3 className={`${GM} m-0 text-[14px] font-medium uppercase leading-[18.2px] tracking-[1.12px] text-sun`}>Plans with the model</h3>
            <p className={`m-0 font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] ${MUTED}`}>Usage beyond included amounts is pay as you go</p>
          </div>
          <div className="mt-[16px] grid grid-cols-1 gap-[20px] lg:grid-cols-2">
            {PLANS.map(([name, price, per, lis, solid]) => (
              <div key={name} className="grid grid-cols-1 gap-[14px] rounded-[24px] border border-[#3A3A35] bg-[#1F1F1C] px-[28px] pb-[28px] pt-[26px] md:grid-cols-[1fr_auto] md:items-end">
                <div className="flex flex-col gap-[14px]">
                  <h4 className={`${GM} m-0 text-[12px] font-medium uppercase leading-[15.6px] tracking-[0.96px] ${MUTED}`}>{name}</h4>
                  <p className="m-0 flex items-end gap-[10px]"><strong className={`${GM} text-[60px] font-bold leading-[51px] tracking-[-0.02em]`}>{price}</strong><span className={`font-mono text-[14px] leading-[23.8px] ${MUTED}`}>{per}</span></p>
                  <ul className="m-0 flex list-none flex-col gap-[8px] p-0">
                    {lis.map((n, k) => <li key={k} className="relative pl-[24px] font-mono text-[15px] leading-[21px] before:absolute before:left-0 before:text-sun before:content-['✓']">{words(n, 12050 + k, { sentence: false })}</li>)}
                  </ul>
                </div>
                <Pill solid={solid}>{solid ? 'Start free' : 'Contact us'}</Pill>
              </div>
            ))}
          </div>
          <p className={`m-0 font-sans text-[13px] font-light leading-[20.15px] tracking-[0.26px] ${MUTED}`}>
            Full details on the <Link to="/product/pricing" className="font-mono font-semibold text-[#F4EFEA] underline">pricing page</Link> and in the <span className="font-mono font-semibold text-[#F4EFEA] underline">billing docs</span>.
          </p>
        </div>
      </Container>
    </section>
  )
}

// ---------- closing ----------
const LINKS = [['Docs', 24, 48, 'Read the docs →'], ['Blog', 15, 43, 'Read the post →', '/blog/sample-post-8'], ['Video', 22, 26, 'Watch the demo →', '/videos/sample-video-4'], ['Community', 16, 32, 'Join the chat →']]
function Closing() {
  return (
    <section className={`bg-sun text-[#141413] ${SEC}`}>
      <Container>
        <div className="mx-auto max-w-[1200px] pb-[8px] pt-[24px]">
          <h2 className="xm-crt-dark xm-jv-h3 xm-gm m-0 font-bold uppercase [&>span]:font-mono">
            <span className="block">Ask your data</span>
            <span className="xm-jv-h3b block">today</span>
          </h2>
          <div className="mt-[31px] flex flex-col gap-[12px] md:flex-row">
            <span className="xm-jv-pill max-md:w-full inline-flex h-[56px] items-center justify-center gap-[12px] rounded-pill border-2 border-[#141413] bg-[#141413] px-[28px] font-[Geist,Inter,sans-serif] text-[16px] font-semibold text-sun">Start free<span className="grid h-[28px] w-[28px] place-items-center rounded-full bg-sun font-mono text-[14px] text-[#141413]">→</span></span>
            <span className="xm-jv-pill max-md:w-full inline-flex h-[56px] items-center justify-center rounded-pill border-2 border-[#141413] px-[28px] font-[Geist,Inter,sans-serif] text-[16px] font-semibold">Talk to us</span>
          </div>
          <div className="mt-[72px] grid grid-cols-1 border-t-2 border-[#141413] md:grid-cols-2 lg:grid-cols-4">
            {LINKS.map(([k, h, p, cta, to], i) => {
              const Tag = to ? Link : 'div'
              return (
                <Tag key={k} {...(to ? { to } : {})} className={`flex flex-col gap-[8px] pb-[26px] pr-[24px] pt-[22px] text-[#141413] no-underline lg:min-h-[211px] ${i > 0 ? 'max-md:border-t-2 max-md:border-[#141413] lg:border-l-2 lg:border-[#141413] lg:pl-[26px]' : ''} ${i >= 2 ? 'md:max-lg:border-t-2 md:max-lg:border-[#141413] lg:border-t-0' : ''} ${i % 2 === 1 ? 'md:border-l-2 md:border-[#141413] md:pl-[26px]' : ''}`}>
                  <span className={`${GM} text-[12px] uppercase leading-[20.4px] tracking-[0.72px]`}>{k}</span>
                  <h3 className="m-0 font-[Geist,Inter,sans-serif] text-[20px] font-semibold leading-[24px]">{words(h, 12060 + i, { title: true })}</h3>
                  <p className="m-0 font-sans text-[14px] font-light leading-[20.3px]">{words(p, 12070 + i)}</p>
                  <span className="mt-auto font-mono text-[14px] font-semibold leading-[23.8px]">{cta}</span>
                </Tag>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function JevLP() {
  useJevFonts()
  return (
    <div className="bg-[#141413]">
      <Hero />
      <Calculator />
      <Pricing />
      <Closing />
    </div>
  )
}
