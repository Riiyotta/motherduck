// T4 pricing blocks (PAGES_SPEC_MARKETING.md §3 B20).
import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Placeholder } from '../ui'
import { Btn, Check, Check24, Chevron, Dash24, InlineLink, LeadArrow, TagTitle, TextLink } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// ---------- PricingTabs ----------
// Route-driven: the sun indicator sits on the active route's half (`left .2s ease-out`).
const PTABS = [['CLOUD DUCKDB', '/product/pricing'], ['DUCKDB SUPPORT', '/product/pricing/duckdb-support']]

export function PricingTabs({ active = 0 }) {
  // Indicator position is driven by the route; animate from the other half on mount so the slide is visible.
  const [pos, setPos] = useState(1 - active)
  useEffect(() => {
    const id = requestAnimationFrame(() => setPos(active))
    return () => cancelAnimationFrame(id)
  }, [active])
  return (
    <div role="tablist" aria-label="Pricing" className="relative grid h-[24px] w-[239.3px] grid-cols-2 rounded-pill border-2 border-ink bg-white md:h-[28px] md:w-[265.8px]">
      <span aria-hidden="true" className="mk-pill-indicator absolute top-[-2px] h-[24px] rounded-pill border-2 border-ink bg-sun md:h-[28px]"
        style={{ left: `calc(${pos} * 50% - 2px)`, width: 'calc(50% + 4px)' }} />
      {PTABS.map(([l, to], i) => (
        <Link key={to} to={to} role="tab" aria-selected={i === active}
          className={`mk-pill-tab relative z-[1] flex items-center justify-center whitespace-nowrap px-[8px] font-sans text-[11px] md:px-[10px] uppercase leading-[13.2px] no-underline md:text-[12px] md:leading-[14.4px] hover:text-ink ${i === active ? 'text-ink' : 'text-gray-500'}`}>
          {l}
        </Link>
      ))}
    </div>
  )
}

// ---------- PricingHero ----------
export function PricingHero({ seed = 1 }) {
  return (
    <Container as="section" className="flex flex-col items-center gap-[28px] pb-[20px] pt-[40px] text-center md:pt-[62px] lg:gap-[32px] lg:pb-[48px] lg:pt-[82px] xl:pb-[60px] xl:pt-[100px]">
      <PricingTabs active={0} />
      <div className="flex w-full flex-col items-center gap-[20px]">
        <h1 className="m-0 font-mono font-normal uppercase text-ink text-h1-mono-sm md:text-h1-mono-md lg:text-h1-mono">{fitTitle(46, seed)}</h1>
        <p className="m-0 font-sans text-accordion-body text-ink lg:text-lede-hero">{fit(81, seed + 1)}</p>
      </div>
    </Container>
  )
}

// ---------- TierCards + AnnualPlanStrip ----------
// Prices / plan names are generic placeholders (no source pricing copy).
// desc / intro / items = original character counts (line wraps follow)
const TIERS = [
  { name: 'LITE', desc: 53, intro: 9, items: [52, 18, 39, 20, 40, 54, 17], cta: 'START FREE', variant: 'white', to: null, price: 'lite' },
  { name: 'BUSINESS', desc: 44, intro: 28, items: [61, 42, 36, 54, 25, 13, 51, 31, 22], cta: 'START A TRIAL', variant: 'primary', to: null, price: 'business', scale: true },
  { name: 'ENTERPRISE', desc: 44, intro: 29, items: [52, 27, 28, 15, 9, 51], cta: 'CONTACT US', variant: 'white', to: '/contact-us/product-expert', price: 'custom' },
]
const PRICE = 'font-mono text-[50px] leading-[60px] md:text-price-md lg:text-price-lg xl:text-price text-ink'

function Price({ kind }) {
  if (kind === 'lite') {
    return (
      <div className="-mt-[6px] flex items-center gap-[12px] md:gap-[6px] lg:gap-[12px]">
        <span className="w-[60px] font-mono text-[12px] leading-[14.4px] text-gray-500 md:w-[40px] md:text-[8px] md:leading-[9.6px] lg:w-[60px] lg:text-[12px] lg:leading-[14.4px]">STARTING FROM</span>
        <span className={PRICE}>$0</span>
      </div>
    )
  }
  if (kind === 'business') {
    return (
      <div className="-mt-[6px] flex items-center gap-[12px]">
        <span className={PRICE}>$100</span>
        <span className="max-w-[140px] pb-[12px] font-mono text-[16px] leading-[22.4px] text-gray-500 md:max-w-[92px] md:pb-0 md:text-[10px] md:leading-[14px] lg:max-w-[140px] lg:pb-[12px] lg:text-[16px] lg:leading-[22.4px]">PER TEAM / MONTH + USAGE</span>
      </div>
    )
  }
  return <div className="-mt-[6px]"><span className={PRICE}>CUSTOM</span></div>
}

export function TierCards({ seed = 1 }) {
  return (
    <section className="pb-[50px] pt-[32px] md:pt-[68px] lg:pt-[95px] xl:pt-[90px]">
      <Container>
        {/* Measured: 1 col gap 52 <728; 3 × 233.3 gap 14 / 306.7 gap 20 (grid spans the container padding, ml -20);
            3 × 392.7 gap 32. Top panel min-height 270 / 320 / 334 (content + gap 40 <728); mascot 100 · 80 · 80 · 100. */}
        <div className="grid grid-cols-1 gap-[52px] md:-mx-[20px] md:grid-cols-[repeat(3,233.3px)] md:gap-[14px] lg:grid-cols-[repeat(3,306.7px)] lg:gap-[20px] xl:mx-0 xl:grid-cols-[repeat(3,392.7px)] xl:gap-[32px]">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`relative flex flex-col border-2 border-ink ${t.scale ? 'z-[1] md:scale-110' : ''}`}>
              <Placeholder label="Tier mascot" className={`!absolute right-[10px] top-[-42px] h-[100px] w-[100px] md:right-0 md:top-[-32px] lg:top-[-52px] xl:right-[5px] xl:top-[-43px] ${t.scale ? 'md:h-[88px] md:w-[88px] xl:h-[110px] xl:w-[110px]' : 'md:h-[80px] md:w-[80px] xl:h-[100px] xl:w-[100px]'}`} />
              <div className="flex flex-col justify-between gap-[40px] bg-white p-[24px] md:min-h-[270px] md:gap-0 md:p-[20px] lg:min-h-[320px] lg:px-[24px] lg:pb-[24px] lg:pt-[32px] xl:min-h-[334px] xl:p-[32px]">
                <div className="flex flex-col gap-[12px] lg:gap-[16px]">
                  <p className="m-0 font-mono uppercase text-ink text-tier-name md:text-tier-name-lg xl:text-tier-name">{t.name}</p>
                  <Price kind={t.price} />
                  <p className="m-0 font-sans text-[14px] font-normal leading-[19.6px] text-gray-500 lg:text-[15px] lg:leading-[24px] xl:text-[16px] xl:leading-[25.6px]">{fit(t.desc, seed * 3 + i)}</p>
                </div>
                <Btn variant={t.variant} size="tier" fullWidth to={t.to}>{t.cta}</Btn>
              </div>
              <div className="flex flex-1 flex-col gap-[16px] bg-white p-[24px] md:px-[20px] md:pb-[24px] md:pt-[20px] lg:px-[24px] lg:pb-[32px] lg:pt-[24px] xl:px-[30px] xl:pb-[36px] xl:pt-[30px]">
                <p className="m-0 font-sans text-[14px] font-normal leading-[21px] text-ink xl:text-[16px] xl:leading-[25.6px]">{fitTitle(t.intro, seed * 5 + i)}:</p>
                {/* Live: 14/21 with a 20px check below 1302 (text 32 / 27 / 31 from the row start at SM / MD / LG), 16/25.6 + 24px at XL. */}
                <ul className="m-0 flex list-none flex-col gap-[16px] p-0">
                  {t.items.map((n, k) => (
                    <li key={k} className="flex font-sans text-[14px] font-normal leading-[21px] text-ink xl:text-[16px] xl:leading-[25.6px]">
                      <Check24 className="mr-[12px] h-[20px] w-[20px] shrink-0 md:mr-[7px] lg:mr-[11px] xl:mr-[12px] xl:h-[24px] xl:w-[24px]" />
                      <span>{fitTitle(n, seed * 7 + i * 10 + k)}</span>
                    </li>
                  ))}
                </ul>
                {i > 0 && <TextLink to="#instance-types" size="sm" className="ml-[36px]">SEE INSTANCE TYPES</TextLink>}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <div className="relative mt-[92px] bg-sand-chip px-[24px] py-[21px] md:pl-[180px] md:pr-[67px]">
        <Placeholder width={136} height={111} label="Illustration" className="!absolute left-[400px] top-1/2 hidden -translate-y-1/2 xl:flex" />
        <div className="flex flex-wrap items-center justify-center gap-x-[16px] gap-y-[8px]">
          <p className="m-0 text-center font-mono text-[16px] uppercase leading-[22.4px] text-ink">LOOKING FOR AN ANNUAL PLAN?</p>
          <TextLink to="/contact-us/product-expert" labelClassName="!font-mono">GET IN TOUCH</TextLink>
        </div>
      </div>
    </section>
  )
}

// ---------- PlanMatrix ----------
const REGIONS = [
  'USA (N. Virginia): us-east-1', 'USA (Oregon): us-west-2', 'Europe (Frankfurt): eu-central-1', 'Europe (Dublin): eu-west-1',
  'Japan (Tokyo): ap-northeast-1', 'Australia (Sydney): ap-southeast-2', 'Request a Different Region',
]
const GROUPS = [
  ['DATA WAREHOUSE', 14],
  ['WORKFLOW AND COLLABORATION', 12],
  [null, 9], // [36ch/4w] heading
  ['SUPPORT', 8],
] // 43 rows

function cellFor(g, r, p) {
  const k = (g * 7 + r * 3 + p) % 5
  if (r % 5 === 3) return { sub: true, v: `${2 + p * 2} units`, s: `${title(2, g + r + p)}` }
  if (k === 0 || k === 3) return { bool: p > 0 || r % 2 === 0 }
  return { v: ['Included', 'Up to 10', 'Unlimited', 'Shared', 'Custom'][(r + p * 2) % 5] }
}

function Cell({ c, business }) {
  if (c.bool !== undefined) return c.bool ? <Check24 /> : <Dash24 />
  return (
    <span className={business ? 'text-black' : ''}>
      {c.v}
      {c.sub && <span className={`block text-[14px] leading-[19.6px] ${business ? 'text-gray-600' : 'text-gray-500'}`}>{c.s}</span>}
    </span>
  )
}

function RegionSelect() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(REGIONS[0])
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    // Outside-click close: UNMEASURED on the original; implemented as the expected behaviour.
    const on = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', on)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', on); document.removeEventListener('keydown', key) }
  }, [open])
  return (
    <div className="flex items-center justify-center gap-[10px] px-[20px] py-[12px]">
      <span className="font-sans text-[14px] leading-[19.6px] text-gray-500">Region</span>
      <div ref={ref} className="relative">
        <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}
          className="flex h-[38.4px] w-[280px] cursor-pointer items-center gap-[8px] border-0 bg-sand-chip p-[8px] text-ink md:w-[309px]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M2.5 10h15M10 2.5c2.2 2.3 2.2 12.7 0 15M10 2.5c-2.2 2.3-2.2 12.7 0 15" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <span className="max-w-[175px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left font-sans text-[16px] font-light leading-[22.4px]">{value}</span>
          <Chevron size={20} open={open} className="ml-auto" />
        </button>
        {open && (
          <ul role="listbox" className="absolute left-0 top-full z-[3] m-0 w-[328px] max-w-[calc(100vw-80px)] list-none border-2 border-ink bg-white p-0">
            {REGIONS.map((r) => (
              <li key={r} role="option" aria-selected={r === value}>
                {/* Per-region price data UNMEASURED: values below stay at the default */}
                <button type="button" onClick={() => { setValue(r); setOpen(false) }}
                  className="flex h-[43.4px] w-full items-center border-0 bg-transparent px-[12px] text-left font-sans text-[16px] leading-[16px] text-ink hover:bg-row-hover">
                  {r}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const COLS = 'grid-cols-[repeat(3,114px)] justify-center md:justify-start md:grid-cols-[110px_repeat(3,192.7px)] lg:grid-cols-[165px_repeat(3,251.7px)] xl:grid-cols-[240px_repeat(3,334px)]'
const PLANS = [['LITE', 'secondary', 'START FREE', null], ['BUSINESS', 'primary', 'START TRIAL', null], ['ENTERPRISE', 'secondary', 'CONTACT US', '/contact-us/product-expert']]

export function PlanMatrix({ seed = 1 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  let row = 0
  return (
    <section id="info-table" ref={ref} className="pb-[100px] pt-[60px]">
      <Container>
        <h2 className="m-0 pb-[32px] text-center font-mono font-normal uppercase text-ink text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono">COMPARE PLANS</h2>
        <RegionSelect />
        <div role="table" aria-label="Plan comparison" className="mt-[16px]">
          <div role="row" className={`sticky top-[70px] z-[2] grid border-b-2 border-ink bg-cream md:top-[110px] xl:top-[120px] ${COLS}`}>
            <div role="columnheader" className="hidden items-center border-r-2 border-t-2 border-sand-dark font-mono text-[18px] leading-[21.6px] text-ink md:flex lg:pl-[20px] lg:text-[24px] lg:leading-[28.8px] xl:text-[32px] xl:leading-[38.4px]">PLANS</div>
            {PLANS.map(([n, variant, cta, to], p) => (
              <div key={n} role="columnheader" className={`flex flex-col border-t-2 border-sand-dark px-[8px] py-[16px] md:px-[12px] lg:px-[20px] ${p === 1 ? 'bg-[rgba(255,255,255,0.282)]' : ''}`}>
                <span className="mt-[2px] font-mono text-[16px] uppercase leading-[22.4px] text-ink md:mt-0 md:text-[18px] md:leading-[25.2px] xl:text-[24px] xl:leading-[33.6px]">{n}</span>
                <span className="hidden pb-[16px] font-sans text-[12px] font-light leading-[16.8px] text-ink md:block lg:text-[14px] lg:leading-[19.6px]"><span className="font-normal">{['$0', '$100', 'Custom'][p]}</span> {['/ month', '/ month + usage', 'pricing'][p]}</span>
                <div className="hidden md:block"><Btn variant={variant} to={to} fullWidth wrapperClassName="lg:!inline-flex lg:!w-auto" className="lg:!w-auto">{cta}</Btn></div>
              </div>
            ))}
          </div>
          {GROUPS.map(([g, count], gi) => (
            <Fragment key={gi}>
              <div role="row" className="sticky top-[100px] z-[1] border-b-2 border-ink bg-cream pb-[12px] pl-[8px] pr-[236px] pt-[40px] md:static md:px-0 md:pb-[20px] md:pt-[64px] xl:px-[20px] xl:pb-[24px]">
                <h3 role="rowheader" className="m-0 font-mono text-[14px] font-light uppercase leading-[19.6px] tracking-[-0.16px] text-ink md:text-[16px] md:leading-[22.4px] xl:text-[18px] xl:leading-[25.2px]">{g || title(4, seed + 50).toUpperCase()}</h3>
              </div>
              {Array.from({ length: count }, (_, r) => {
                row += 1
                const sub = r % 5 === 3
                const tip = r % 6 === 1
                const label = title(2 + (r % 3), seed * 11 + row)
                return (
                  <div key={r} role="row" className={`grid transition-colors duration-[100ms] ease-in-out hover:bg-row-hover ${COLS} ${r > 0 ? 'border-t-2 border-sand-chip' : ''}`}>
                    <div role="rowheader" className={`group relative col-span-3 py-[12px] pl-[8px] pr-[236px] font-sans text-[14px] leading-[19.6px] text-ink md:col-span-1 md:px-0 md:py-[20px] xl:p-[20px] xl:text-[16px] xl:leading-[25.6px] ${sub ? 'xl:min-h-[89.2px] xl:pl-[50px]' : ''}`}>
                      {tip ? (
                        // Tooltip label (same pattern as the LogoStrip tooltip). Underline style UNMEASURED: dotted underline.
                        <span className="cursor-help underline decoration-dotted underline-offset-4">
                          {label}
                          <span role="tooltip" className="pointer-events-none absolute left-[20px] top-[calc(100%-8px)] z-[3] hidden w-[260px] rounded-sm bg-ink py-[6px] pl-[8px] pr-[6px] font-sans text-tooltip text-white lg:group-hover:block">
                            <span aria-hidden="true" className="absolute bottom-[calc(100%-4px)] left-[16px] h-[8px] w-[8px] rotate-45 bg-ink" />
                            <span className="relative">{text(9, seed + row)} <InlineLink to="/product/hypertenancy">{title(2, row)}</InlineLink></span>
                          </span>
                        </span>
                      ) : label}
                    </div>
                    {[0, 1, 2].map((p) => (
                      <div key={p} role="cell" className={`flex items-start py-[12px] pl-[8px] pr-[6px] font-sans text-[14px] leading-[19.6px] text-ink md:px-[12px] md:py-[20px] xl:p-[20px] xl:text-[16px] xl:leading-[25.6px] ${p === 1 ? 'bg-[rgba(255,255,255,0.282)]' : ''}`}>
                        <Cell c={cellFor(gi, r, p)} business={p === 1} />
                      </div>
                    ))}
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      </Container>
      {/* <728: sticky bottom CTA bar, visible while the table is in view */}
      <div aria-hidden={!inView || undefined} className={`fixed inset-x-0 bottom-0 z-[5] border-t-2 border-ink bg-cream px-[24px] py-[14px] transition-opacity duration-200 ease-in-out md:hidden ${inView ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <Btn variant="primary" fullWidth tabIndex={inView ? 0 : -1}>START TRIAL</Btn>
      </div>
    </section>
  )
}

// ---------- InstancesSection + MarketplaceLogos ----------
const INSTANCES = [
  ['MICRO', [1, 0, 0]], ['STANDARD', [1, 1, 1]], ['LARGE', [0, 1, 1]], ['X-LARGE', [0, 1, 1]], ['XX-LARGE', [0, 0, 1]],
]

function InstanceCard({ inst, i, seed }) {
  const [name, plans] = inst
  return (
    <div className="relative flex flex-col gap-[24px] border-2 border-ink bg-white px-[22px] pb-[30px] pt-[110px] lg:gap-[28px] lg:px-[24px] lg:pb-[32px] lg:pt-[104px]">
      <Placeholder label="Instance illustration" className="!absolute left-1/2 top-[-106px] h-[196px] w-[calc(100%-4px)] -translate-x-1/2 lg:top-[-98px] lg:h-[180px]" />
      <div className="flex flex-col items-center gap-[14px] border-b-2 border-ink pb-[24px] lg:pb-[28px]">
        <span className="bg-ink px-[14px] py-[6px] font-mono text-[24px] leading-[28.8px] text-white">{name}</span>
        <p className="m-0 text-center font-sans text-body-sm text-ink lg:text-[13px] lg:leading-[18.2px] xl:text-[16px] xl:leading-[25.6px]">{text(14, seed + i)}</p>
      </div>
      <div className="flex flex-col gap-[16px]">
        <p className="m-0 text-center font-sans text-accordion-body text-gray-500">Commonly used when...</p>
        <ul className="m-0 flex flex-col gap-[16px] p-0">
          {[0, 1, 2].map((k) => <li key={k} className="ml-[20px] font-sans text-body-md text-ink">{text(8, seed * 3 + i * 5 + k)}</li>)}
        </ul>
      </div>
      <div className="mt-auto border-t-2 border-[rgba(56,56,56,0.15)] pt-[28px]">
        <p className="m-0 text-center font-sans text-body-md text-gray-500">Included Plans:</p>
        <div className="mt-[8px] flex flex-wrap justify-center gap-[4px]">
          {['LITE', 'BUSINESS', 'ENTERPRISE'].map((p, k) => (
            plans[k]
              ? <span key={p} className="flex items-center gap-[4px] bg-sun p-[8px] font-mono text-[12px] uppercase leading-[16.8px] text-ink"><Check w={16} h={12} />{p}</span>
              : <span key={p} className="bg-hairline p-[8px] font-mono text-[12px] uppercase leading-[16.8px] text-ink opacity-50">{p}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function InstancesSection({ seed = 1 }) {
  return (
    <>
      <section id="instance-types" className="mt-[40px] border-y-2 border-ink bg-sky-hover pb-[121px] md:pb-[155px] xl:pb-[174px]">
        <Container className="flex flex-col items-center">
          <TagTitle className="max-w-[calc(100%-56px)] px-[16px] py-[8px] text-center text-h2-mono-tall-sm lg:px-[32px] lg:text-h2-mono-tall">SERVERLESS INSTANCES</TagTitle>
          <p className="mx-auto mb-[140px] mt-[32px] max-w-[624px] text-center font-sans text-body-md text-ink lg:mb-[160px] lg:max-w-[910px] lg:text-body-xl">
            {text(30, seed)} <InlineLink to="/product/hypertenancy">{title(2, seed + 1)}</InlineLink>.
          </p>
          <div className="grid w-full max-w-[420px] grid-cols-1 gap-[160px] lg:max-w-none lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-[repeat(3,392.7px)] xl:gap-[32px]">
            {INSTANCES.slice(0, 3).map((inst, i) => <InstanceCard key={inst[0]} inst={inst} i={i} seed={seed} />)}
          </div>
          <div className="mx-auto mb-[156px] mt-[116px] max-w-[520px] text-center font-mono text-[24px] uppercase leading-[33.6px] text-ink md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]">
            {title(6, seed + 2)}
          </div>
          <div id="large-instance-types" className="grid w-full max-w-[420px] grid-cols-1 gap-[160px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(2,394px)] lg:gap-[32px]">
            {INSTANCES.slice(3).map((inst, i) => <InstanceCard key={inst[0]} inst={inst} i={i + 3} seed={seed} />)}
          </div>
        </Container>
      </section>
      <section className="mk-grid-texture px-[24px] pb-[164px] pt-[80px] md:px-[20px] md:pb-[160px] md:pt-[100px] xl:px-[30px] xl:pb-[220px] xl:pt-[140px]">
        <div className="mx-auto flex flex-col items-center gap-[32px]">
          <h2 className="m-0 max-w-[507px] bg-cream p-[8px] text-center font-mono text-[18px] font-normal leading-[25.2px] text-ink">{fitTitle(44, seed + 3)}</h2>
          <div className="flex w-full max-w-[286px] flex-wrap items-center justify-center gap-x-[40px] gap-y-[32px] bg-cream p-[12px] md:max-w-[588px] md:gap-x-[52px] md:gap-y-[24px] xl:max-w-[942px] xl:gap-y-[32px]">
            {[[110, 28], [90, 34], [130, 21], [100, 30], [120, 24], [80, 34], [140, 22], [96, 28], [116, 26], [88, 32]].map(([w, h], i) => (
              <Placeholder key={i} width={w} height={h} label={`Marketplace logo ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ---------- FinalCTA ----------
export function FinalCTA({ seed = 1 }) {
  return (
    <section className="py-[120px]">
      <Container className="flex flex-col items-center gap-[32px] text-center md:gap-[40px]">
        <Placeholder width={100} height={73} label="Logo mark" />
        {/* Live: 16/22.4 at 501 wide with an 8px gap below 1302; 20/28 at 430 wide with a 12px gap at XL. */}
        <div className="flex flex-col items-center gap-[8px] xl:gap-[12px]">
          <h3 className="m-0 font-mono text-[24px] font-normal uppercase leading-[33.6px] text-ink md:text-h2-mono-tall">{fitTitle(18, seed)}</h3>
          <p className="m-0 max-w-[501px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-ink xl:max-w-[430px] xl:text-[20px] xl:leading-[28px] xl:tracking-[0.4px]">{fit(60, seed + 1)}</p>
        </div>
        <Btn variant="primary" size="lg" arrow>START FREE TRIAL</Btn>
      </Container>
    </section>
  )
}

// ---------- DuckDBSupportPanel ----------
export function DuckDBSupportPanel({ seed = 1 }) {
  return (
    // Live: the panel's own bottom padding (32 / 20 / 48 / 60) plus the section's 80 (<960) / 120 (>=960) below it.
    <Container as="section" className="relative flex flex-col items-center gap-[24px] pb-[112px] pt-[38px] md:gap-[28px] md:pb-[100px] md:pt-[62px] lg:gap-[32px] lg:pb-[168px] lg:pt-[82px] xl:pb-[180px] xl:pt-[100px]">
      <PricingTabs active={1} />
      <div role="tabpanel" className="flex max-w-[720px] flex-col items-center gap-[20px] text-center">
        <Placeholder variant="shape" label="Support icon" className="h-[64px] w-[63px] lg:h-[88px] lg:w-[86px]" />
        <h1 className="m-0 font-mono font-normal uppercase text-ink text-h1-mono-sm md:text-h1-mono-md lg:text-h1-mono">SUPPORT ON YOUR END</h1>
        <p className="m-0 font-sans text-accordion-body text-ink lg:text-lede-hero">{fit(180, seed)}</p>
        <Btn variant="primary" size="lg" lead={LeadArrow} to="/contact-us/product-expert" wrapperClassName="mt-[4px] lg:mt-[12px]">CONTACT US</Btn>
      </div>
      <Placeholder width={76} height={76} label="Decoration" className="!absolute left-[30px] top-[120px] hidden xl:flex" />
      <Placeholder width={92} height={92} label="Decoration" className="!absolute bottom-[40px] right-[30px] hidden xl:flex" />
    </Container>
  )
}
