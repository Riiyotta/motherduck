// T5 bespoke blocks: startups, research, trust-and-security, community (PAGES_SPEC_MARKETING.md §3 B21, B22).
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Container, LiftCard, Placeholder, TextInput } from '../ui'
import { Btn, InlineLink, LeftArrow, TagTitle, TextLink, smoothScrollTo, useAutoplay, usePrefersReducedMotion } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

const headerOffset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-total')) || 0

// ---------- LeftHero ----------
const HERO = {
  // measured: padding 32/254 · 40/110 (728–1301) · 102/132; column 342 · 520 · 880; tagline 16/22.4 · 18/25.2 (max 330) · 24/33.6
  startups: {
    pad: 'pb-[254px] pt-[32px] md:pb-[110px] md:pt-[40px] xl:pb-[132px] xl:pt-[102px]',
    h1: 'text-h1-left-sm-tall md:text-h1-left-lg xl:text-h1-mono-xl',
    col: 'max-w-[520px] gap-[16px] md:gap-[20px] xl:max-w-[880px]',
    tag: 'text-[16px] font-light leading-[22.4px] tracking-[0.32px] md:max-w-[330px] md:text-hero-tagline-mono-lg xl:max-w-none xl:text-hero-tagline-mono',
    illus: 'xl:h-[368px] xl:w-[440px] aspect-[440/368]',
    lens: [31, 39],
  },
  // measured: padding 32/240 · 40/210 · 100/148; tagline 16/19.2 (max 320) · 18/21.6 (390) · 20/24 (440) · 24/30 (540);
  // art 246×159 @(147,144) · 320×207 @(424,106) · 320×207 @(770,42.6) · 500×324 @(800,21.2) (section-relative)
  research: {
    pad: 'pb-[240px] pt-[32px] md:pb-[210px] md:pt-[40px] lg:pb-[148px] lg:pt-[100px]',
    h1: 'text-h1-left-sm md:text-h1-left-lg xl:text-h1-mono-xl',
    col: 'max-w-[320px] gap-[16px] md:max-w-none md:gap-[20px]',
    tag: 'max-w-[320px] text-[16px] font-light leading-[19.2px] tracking-[0.32px] md:max-w-[390px] md:text-research-tagline-md lg:max-w-[440px] lg:text-research-tagline-lg xl:max-w-[540px] xl:text-research-tagline',
    art: 'left-[147px] top-[144.2px] h-[159px] w-[246px] md:left-[424px] md:top-[106.2px] md:h-[207px] md:w-[320px] lg:left-[770px] lg:top-[42.6px] xl:left-[800px] xl:top-[21.2px] xl:h-[324px] xl:w-[500px]',
    lens: [19, 34],
  },
  // measured: padding 40/215 · 40/218 · 70/170 · 100/170; gap 16 · 24 · 32; tagline 16/22.4 · 18/25.2 (max 410) · 24/33.6 (max 700)
  trust: {
    pad: 'pb-[215px] pt-[40px] md:pb-[218px] lg:pb-[170px] lg:pt-[70px] xl:pt-[100px]',
    h1: 'text-h1-trust-sm md:text-h1-trust-lg xl:text-h1-trust',
    col: 'gap-[16px] md:gap-[24px] lg:gap-[32px]',
    tag: 'text-[16px] font-light leading-[22.4px] tracking-[0.32px] md:max-w-[410px] md:text-hero-tagline-mono-lg xl:max-w-[700px] xl:text-hero-tagline-mono',
    art: 'hidden xl:flex xl:right-[calc((100%-1302px)/2+30px)] xl:top-[56px] xl:h-[324px] xl:w-[368px]',
    lens: [18, 56],
  },
  // measured: padding 32/224 · 32/200 · 82/132 · 102/164; column 511 / 611; h1 48/67.2 at 728–1301
  community: {
    pad: 'pb-[224px] pt-[32px] md:pb-[200px] lg:pb-[132px] lg:pt-[82px] xl:pb-[164px] xl:pt-[102px]',
    h1: 'text-h1-left-sm-tall md:text-[48px] md:leading-[67.2px] xl:text-h1-mono-xl',
    col: 'gap-[16px] md:max-w-[511px] md:gap-[20px] xl:max-w-[611px]',
    tag: 'text-[16px] font-light leading-[22.4px] tracking-[0.32px] md:text-hero-tagline-mono-lg xl:text-hero-tagline-mono',
    illus: 'xl:h-[353px] xl:w-[604px] aspect-[604/353]',
    lens: [26, 66],
  },
}

export function LeftHero({ page, seed = 1, onApply }) {
  const h = HERO[page]
  return (
    <section className={`relative overflow-hidden ${h.pad}`}>
      <Container className="relative flex justify-between">
        <div className={`relative z-[1] flex flex-col ${h.col || h.gap || 'gap-[20px]'}`}>
          <h1 className={`m-0 font-mono font-normal uppercase text-ink ${h.h1}`}>{h.lens ? fitTitle(h.lens[0], seed) : title(page === 'research' ? 2 : 4, seed)}</h1>
          <p className={`m-0 font-mono uppercase text-ink ${h.tag}`}>{h.lens ? fitTitle(h.lens[1], seed + 1) : title(page === 'startups' ? 18 : 12, seed + 1)}</p>
          {onApply && <Btn variant="primary" size="lg" onClick={onApply} wrapperClassName="mt-[16px] w-fit md:mt-[12px]">APPLY NOW</Btn>}
        </div>
      </Container>
      {h.art ? (
        <Placeholder label="Hero illustration" className={`!absolute ${h.art}`} />
      ) : (
        // startups / community: <1302 placement UNMEASURED (centred in the reserved bottom padding / right edge)
        <Placeholder
          label="Hero illustration"
          className={`!absolute bottom-[24px] left-1/2 h-[190px] -translate-x-1/2 lg:bottom-auto lg:left-auto lg:right-[20px] lg:top-1/2 lg:h-[260px] lg:-translate-y-1/2 lg:translate-x-0 xl:right-[calc((100%-1302px)/2+30px)] ${h.illus}`}
        />
      )}
    </section>
  )
}

// ---------- InvestorLogos ----------
export function InvestorLogos({ seed = 1 }) {
  // measured: heading 16/22.4 · 18/25.2 · 24/33.6; logos 33 / 35 / 42 tall, gaps 36×40 · 38×52 · 42×76
  return (
    <section className="py-[64px] md:py-[80px] lg:py-[96px] xl:py-[110px]">
      <Container className="flex flex-col items-center gap-[40px] md:gap-[52px]">
        <h2 className="m-0 text-center font-mono text-[16px] font-normal uppercase leading-[22.4px] text-ink md:text-h2-mono-xs xl:text-h2-mono-tall-sm">{fitTitle(41, seed)}</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-[40px] gap-y-[36px] md:gap-x-[52px] md:gap-y-[38px] xl:gap-x-[76px] xl:gap-y-[42px]">
          {[181.2, 148, 127.2, 87.2, 175.2, 140].map((w, i) => (
            <Placeholder key={i} label={`Investor logo ${i + 1}`} className="h-[33px] w-[var(--w)] md:h-[35px] xl:h-[42px]" style={{ '--w': `${Math.round(w * (0.79))}px` }} />
          ))}
        </div>
      </Container>
    </section>
  )
}

// ---------- ProgramBenefits ----------
const BENEFIT_LINKS = ['/product/mcp-server', '/product/dives', '/product/hypertenancy', '/ecosystem']

const BENEFIT_LENS = [[22, 393], [31, 322], [40, 313], [17, 125]]

export function ProgramBenefits({ seed = 1 }) {
  return (
    <section className="border-y-2 border-ink bg-sun pb-[64px] pt-[52px] md:pb-[100px] md:pt-[64px] xl:pb-[120px] xl:pt-[92px]">
      <Container className="flex flex-col items-start gap-[32px] md:!px-[40px] xl:gap-[52px]">
        <TagTitle className="px-[20px] py-[12px] text-h2-mono-xs md:py-[8px] md:text-h2-mono-tall-sm xl:px-[32px] xl:py-[12px] xl:text-tag-40">{fitTitle(24, seed)}</TagTitle>
        <div className="grid w-full max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-[repeat(2,312px)] lg:grid-cols-[repeat(2,354px)] lg:gap-[32px] xl:grid-cols-[repeat(2,595px)]">
          {BENEFIT_LINKS.map((to, i) => (
            <div key={i} className="flex flex-col gap-[16px] border-2 border-ink bg-white p-[24px] lg:px-[32px] lg:pb-[40px] lg:pt-[32px]">
              <Placeholder variant="shape" label="Benefit icon" className="h-[100px] w-[100px] md:h-[120px] md:w-[120px]" />
              <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-tall-sm lg:text-card-h3-mono-tall">{fitTitle(BENEFIT_LENS[i][0], seed * 3 + i)}</h3>
              <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] text-ink lg:text-accordion-body">
                {fit(BENEFIT_LENS[i][1] - 12, seed * 5 + i)} <InlineLink to={to}>{title(2, seed + i)}</InlineLink>.
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ---------- LogoMarquee ----------
export const LOGO_STEP_MS = 3000 // measured: continuous drift ~83 px/s (3 s linear steps of one 250px slot @1440)

export function LogoMarquee({ seed = 1 }) {
  const [i, setI] = useState(0)
  const [animate, setAnimate] = useState(true)
  const reduced = usePrefersReducedMotion()
  useAutoplay(() => { setAnimate(true); setI((v) => v + 1) }, LOGO_STEP_MS, !reduced)
  const onEnd = () => {
    if (i >= 9) { setAnimate(false); setI(0) } // seamless wrap: second half mirrors the first
  }
  return (
    // measured: padding 64 · 80 · 110; heading 16/22.4 · 18/25.2 · 24/33.6; track starts at the container edge;
    // items 120×33 (mr 38) · 145×35 (mr 44) · 180×42 (mr 70)
    <section className="overflow-hidden py-[64px] md:py-[80px] lg:py-[96px] xl:py-[110px]">
      <Container className="flex flex-col items-center gap-[40px] md:gap-[52px]">
        <h2 className="m-0 text-center font-mono text-[16px] font-normal uppercase leading-[22.4px] text-ink md:text-h2-mono-xs xl:text-h2-mono-tall-sm">{fitTitle(30, seed)}</h2>
        <div className="w-full">
          {/* Portfolio logos link externally -> non-links */}
          <div
            onTransitionEnd={onEnd}
            className="flex w-max [--step:158px] md:[--step:189px] xl:[--step:250px]"
            style={{ transform: `translateX(calc(-${i} * var(--step)))`, transition: animate ? 'transform 3s linear' : 'none' }}
          >
            {Array.from({ length: 18 }, (_, k) => (
              <div key={k} aria-hidden={k >= 9 || undefined} className="mr-[38px] flex h-[33px] w-[120px] shrink-0 items-center justify-center md:mr-[44px] md:h-[35px] md:w-[145px] xl:mr-[70px] xl:h-[42px] xl:w-[180px]">
                <Placeholder label={`Portfolio logo ${(k % 9) + 1}`} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ---------- PersonaSplitSticky ----------
const STICKY_ITEMS = [['FOR DATA TEAMS', '/product/data-teams'], ['FOR APP DEVS', '/product/app-developers']]

export function PersonaSplitSticky({ seed = 1 }) {
  const second = useRef(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = second.current
      if (el) setActive(el.getBoundingClientRect().top < window.innerHeight * 0.55 ? 1 : 0)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf) }
  }, [])
  const LENS = [[14, 18, 315], [12, 57, 381]]
  return (
    // measured: padding 80 · 120 · 150 · 180; grid [300|348] gap 40 · [380|500] · [440|690] gap 112; items 40 / 120 / 140 apart;
    // <728 each item carries its own 240×185.7 image (margin 0 51 32)
    <section className="border-t-2 border-ink py-[80px] md:py-[120px] lg:py-[150px] xl:py-[180px]">
      <Container className="grid grid-cols-1 md:grid-cols-[300px_348px] md:gap-[40px] lg:grid-cols-[380px_500px] xl:grid-cols-[440px_690px] xl:gap-[112px]">
        <div className="hidden md:block">
          <div className="sticky top-[389px] aspect-[440/340] w-full xl:top-[335px]">
            {[0, 1].map((k) => (
              <Placeholder key={k} label={`Persona image ${k + 1}`} className={`!absolute inset-0 !h-full !w-full [transition:all_.2s_ease-in-out] ${active === k ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[40px] md:gap-[120px] md:pb-[20px] md:pt-[10px] lg:pt-[15px] xl:gap-[140px] xl:pb-[25px] xl:pt-[20px]">
          {STICKY_ITEMS.map(([eyebrow, to], k) => [
            // the original has an empty flex child between the items, so the column gap applies twice
            k > 0 && <div key={`gap${k}`} aria-hidden="true" />,
            <div key={to} ref={k === 1 ? second : undefined}>
              <Placeholder label={`Persona image ${k + 1}`} className="mx-auto mb-[32px] h-[185.7px] w-[240px] md:hidden" />
              <div className="mb-[32px] md:mb-[40px]">
                <p className="m-0 font-mono text-[16px] uppercase leading-[22.4px] text-ink lg:text-[18px] lg:leading-[25.2px]">{fitTitle(LENS[k][0], seed + 20 + k).toUpperCase()}</p>
                <h2 className="m-0 pb-[12px] pt-[4px] font-mono font-normal uppercase text-ink text-persona-h2-md md:pb-[20px] md:pt-[8px] md:text-persona-h2-lg xl:text-persona-h2">{fitTitle(LENS[k][1], seed + k)}</h2>
                {/* second item: two paragraphs separated by a blank line (white-space: pre-line on the original) */}
                <p className="m-0 whitespace-pre-line font-sans text-body-md text-ink xl:text-body-xl">{k === 1 ? `${fit(227, seed * 3 + k)}\n\n${fit(136, seed * 5 + k)}` : fit(LENS[k][2], seed * 3 + k)}</p>
              </div>
              <TextLink to={to}>LEARN MORE</TextLink>
            </div>,
          ])}
        </div>
      </Container>
    </section>
  )
}

// ---------- ApplyForm ----------
const REQUIRED = ['first', 'last', 'role', 'email', 'site']

// Question label: 16/25.6 (+16 below) under 1302, 18/28.8 (+20 below) at >=1302 (measured; the
// original's form keeps its compact layout up to the xl breakpoint).
function QLabel({ children }) {
  return <p className="m-0 mb-[16px] font-mono text-[16px] font-light uppercase leading-[25.6px] tracking-[0.32px] text-ink xl:mb-[20px] xl:text-[18px] xl:leading-[28.8px] xl:tracking-[0.36px]">{children}</p>
}

export function ApplyForm({ seed = 1, formRef }) {
  const [v, setV] = useState({})
  const [errors, setErrors] = useState({})
  const [coupon, setCoupon] = useState(false)
  const set = (k) => (e) => { setV((o) => ({ ...o, [k]: e.target.value })); setErrors((o) => ({ ...o, [k]: undefined })) }
  const submit = (e) => {
    e.preventDefault() // posts to an external service on the original: never submitted here
    const errs = {}
    REQUIRED.forEach((k) => { if (!v[k]) errs[k] = 'This field is required' }) // message copy/style UNMEASURED
    setErrors(errs)
  }
  const f = (k, label, extra = {}) => <TextInput label={label} value={v[k] || ''} onChange={set(k)} error={errors[k]} {...extra} />
  // Copy lengths / seeds chosen so every label wraps like the original at 1440 / 1280 / 768 / 390.
  const q = 'mt-[20px] xl:mt-0'
  return (
    <section id="apply" ref={formRef} className="border-y-2 border-ink bg-garden">
      <Container className="pb-[100px] pt-[72px] md:py-[100px] xl:!px-[220px]">
        <div className="relative border-2 border-ink bg-white px-[24px] py-[40px] shadow-hard-16 md:px-[40px] md:py-[72px] xl:px-[80px] xl:py-[64px]">
          <TagTitle className="absolute left-[24px] top-[-24px] whitespace-nowrap px-[20px] py-[12px] text-h2-mono-xs md:py-[8px] md:text-h2-mono-tall-sm xl:left-[64px] xl:top-[-32px] xl:text-h2-mono-tall">APPLY NOW!</TagTitle>
          <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-ink xl:text-[20px] xl:leading-[28px] xl:tracking-[0.4px]">{fit(231, 5)}</p>
          <div className="mt-[16px] flex flex-col gap-[8px] bg-surface-2 p-[12px] md:flex-row md:gap-[16px] xl:mt-[20px] xl:p-[20px]">
            <p className="m-0 shrink-0 font-sans text-[14px] font-normal leading-[22.4px] tracking-[0.28px] text-ink xl:text-[16px] xl:leading-[25.6px] xl:tracking-[0.32px]">Eligibility criteria:</p>
            <ul className="m-0 pl-[16px] font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] text-ink md:pl-[12px] xl:text-body-md xl:tracking-[0.32px]">
              {[[42, 3], [39, 2], [22, 4], [27, 1]].map(([n, sd], k) => <li key={k}>{fit(n, sd)}</li>)}
            </ul>
          </div>
          <form noValidate onSubmit={submit} className="mt-[40px] flex flex-col gap-[20px] xl:gap-[40px]">
            <div className="mb-[24px] grid grid-cols-1 gap-[44px] md:mb-[20px] md:grid-cols-2 md:gap-[16px] xl:mb-0">
              {f('first', 'First Name')}
              {f('last', 'Last Name')}
            </div>
            <div className="mb-[28px] grid grid-cols-1 gap-[21px] md:mb-0 md:grid-cols-2 md:gap-[16px]">
              {f('role', 'Role / Title')}
              <div className="md:min-h-[84px] xl:min-h-0">
                {f('email', 'Work e-mail', { type: 'email' })}
                <p className="m-0 mt-[4px] text-right font-sans text-[12px] font-light leading-[19.2px] tracking-[0.24px] text-ink">{fit(45, 1)}</p>
              </div>
            </div>
            <div className="-mt-[10px] xl:-mt-[20px]">{f('site', 'Company website')}</div>
            <div className={q}>
              <QLabel>{fitTitle(43, 4)}?</QLabel>
              {f('q1', 'Your answer')}
            </div>
            <div className={q}>
              <QLabel>DO YOU HAVE A COUPON CODE?</QLabel>
              <span className="flex h-[22.8px] items-center gap-[6px] text-ink">
                <TextLink size="sm" icon={null} labelClassName="!leading-[16.8px] !tracking-[0.28px]" onClick={() => setCoupon(true)} aria-expanded={coupon}>ADD COUPON</TextLink>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" /></svg>
              </span>
              {coupon && <div className="mt-[20px]">{f('coupon', 'Coupon code')}</div>}
            </div>
            <div className={q}>
              <QLabel>{fitTitle(33, 7)}?</QLabel>
              {f('q2', 'Amount')}
            </div>
            <div className={`${q} pb-[2px]`}>
              <QLabel>{fitTitle(34, 5)}?</QLabel>
              {f('q3', 'Your answer', { multiline: true })}
            </div>
            <div className={`${q} pb-[2px]`}>
              <QLabel>{fitTitle(66, 2)}?</QLabel>
              {f('q4', 'Your answer', { multiline: true })}
            </div>
            <div>
              <p className="m-0 my-[20px] font-sans text-[12px] font-light leading-[16.8px] tracking-[0.24px] text-gray-500 xl:mb-[16px] xl:mt-0">{fit(36, seed + 13)}</p>
              <Btn type="submit" variant="primary" size="lg" wrapperClassName="w-fit">SUBMIT</Btn>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

export function scrollToApply(ref) {
  smoothScrollTo(ref.current, headerOffset())
}

// ---------- FilterChips + PaperList (research) ----------
// Generic topic labels sized to the original chip text lengths (16 topics after "ALL")
const TOPIC_LENS = [7, 15, 23, 9, 12, 19, 14, 6, 15, 23, 3, 10, 18, 20, 20, 11]
export const TOPICS = TOPIC_LENS.map((n, i) => fitTitle(n, 300 + i).toUpperCase())
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export function ResearchChips() {
  const [params] = useSearchParams()
  const cat = params.get('category')
  return (
    <Container as="section">
      <h2 className="m-0 pb-[32px] font-mono font-normal uppercase text-ink text-h2-mono-xs md:pb-[40px] md:text-h2-mono-tall-sm lg:pb-[52px] lg:text-h2-mono-lg">PUBLICATIONS</h2>
      <div className="pb-[40px] md:pb-[64px]">
        <div className="mk-no-scrollbar flex flex-wrap gap-[8px] bg-cream lg:gap-[12px]">
          {['ALL', ...TOPICS].map((t) => {
            const active = t === 'ALL' ? !cat : cat === slug(t)
            return (
              <Link key={t} to={t === 'ALL' ? '/research' : `/research?category=${slug(t)}`} aria-current={active ? 'page' : undefined}
                className="mk-chip flex h-[39.8px] items-center rounded-sm px-[16px] font-sans text-[12px] uppercase leading-[16.8px] no-underline md:px-[20px] md:text-[14px] lg:h-[47.8px]">
                {t}
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

// measured copy lengths per paper: [h3, p, topic indices]. Tag sets mirror the original's
// per-paper topics, so every chip filters to the original's count (DuckDB 5, Hybrid 3,
// MotherDuck 3, Query Opt 2, every other topic 1).
const PAPERS = [
  [49, 218, [7, 9, 14]], [68, 275, [0, 4, 7, 11]], [50, 251, [2, 7, 9, 12]],
  [70, 276, [7, 11, 13, 15]], [33, 283, [3, 7, 9, 12]], [64, 170, [1, 5, 6, 8, 10, 11]],
]

// /research/<slug> targets, in the original list order
const PAPER_SLUGS = [
  'motherduck-duckdb-in-the-cloud-and-in-the-client', 'results-on-results-cached-partial-results',
  'cost-based-hybrid-query-optimization-in-motherduck', 'query-log-informed-schema-descriptions-text-to-sql',
  'declarative-caching-in-motherduck', 'efficient-data-wrangling-llms-code-generation',
]

export function PaperList({ seed = 1 }) {
  const [params] = useSearchParams()
  const cat = params.get('category')
  const papers = PAPERS.map(([h, pc, tl], i) => ({ i, h, pc, tags: tl.map((k) => TOPICS[k]) }))
  const shown = cat ? papers.filter((p) => p.tags.some((t) => slug(t) === cat)) : papers
  return (
    <section className="bg-cream pb-[120px] lg:pb-[160px] xl:pb-[200px]">
      <Container>
        <div className="grid max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:gap-[40px] xl:gap-[32px]">
        {shown.map(({ i, h, pc, tags }) => (
          // original: a full-card overlay <a> (title text) plus the LEARN MORE link, both to /research/<slug>
          <LiftCard key={i} lift={14} press={false} innerAs="article" className="relative grid grid-cols-1 gap-[2px] overflow-hidden border-2 border-ink bg-ink md:grid-cols-[332px_1fr] md:gap-0 lg:grid-cols-[332px_584px] xl:grid-cols-[392px_846px]">
            <Link to={`/research/${PAPER_SLUGS[i]}`} className="absolute inset-0 z-[1] overflow-hidden text-transparent">{fitTitle(h, seed * 3 + i)}</Link>
            <Placeholder rounded="" bordered={false} label="Paper figure" className="aspect-[338/225.3] w-full md:aspect-auto md:h-[400px] xl:h-[350px]" />
            <div className="flex flex-col bg-white p-[24px] lg:p-[32px]">
              <div className="flex flex-wrap gap-[8px] pb-[16px] lg:gap-[10px] lg:pb-[20px]">
                {tags.map((t, k) => <span key={k} className="bg-chip-gray px-[8px] py-[4px] font-mono text-[12px] uppercase leading-[16.8px] text-ink lg:px-[12px] lg:py-[8px]">{t}</span>)}
              </div>
              <h3 className="m-0 font-mono font-normal uppercase text-ink text-paper-h3-md lg:text-paper-h3">{fitTitle(h, seed * 3 + i)}</h3>
              <p className="m-0 pb-[32px] pt-[8px] font-sans text-body-sm text-ink lg:text-body-md">{fit(pc, seed * 5 + i)}</p>
              <TextLink to={`/research/${PAPER_SLUGS[i]}`} className="mt-auto">LEARN MORE</TextLink>
            </div>
          </LiftCard>
        ))}
        </div>
      </Container>
    </section>
  )
}

// ---------- Trust tabs + TrustArticle ----------
export const TRUST_TABS = ['COMPLIANCE', 'SECURITY', 'PRIVACY', 'AVAILABILITY']
const tabHash = (t) => t[0] + t.slice(1).toLowerCase() // #Compliance
// Item counts: Compliance 2, Security 5 (measured); Privacy 3, Availability 2 (UNMEASURED)
const TRUST_COUNTS = { COMPLIANCE: 2, SECURITY: 5, PRIVACY: 3, AVAILABILITY: 2 }
// Compliance copy lengths measured (head p 325; items [13, 633], [4, 280]); other tabs reuse them
const TRUST_LENS = { COMPLIANCE: { p: 340, items: [[13, 690], [4, 330]] } }

export function TrustSection({ seed = 1 }) {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const tabsRef = useRef(null)
  const current = TRUST_TABS.find((t) => `#${tabHash(t)}` === hash) || 'COMPLIANCE'
  const pick = (t) => {
    navigate({ hash: tabHash(t) }, { replace: true })
    // Measured: the page scrolls so the tabs sit near the top (scrollY 258 @1440)
    requestAnimationFrame(() => smoothScrollTo(tabsRef.current, headerOffset() + 16))
  }
  const n = TRUST_COUNTS[current]
  const k0 = TRUST_TABS.indexOf(current) * 10
  return (
    <>
      <Container as="section" className="pb-[40px] md:pb-[64px]">
        <div ref={tabsRef} role="tablist" aria-label="Trust topics" className="flex flex-wrap gap-[8px] md:gap-[12px]">
          {TRUST_TABS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={t === current} aria-controls="trust-article" onClick={() => pick(t)}
              className="mk-chip flex h-[39.8px] items-center rounded-sm border-0 px-[16px] font-sans text-[12px] uppercase leading-[16.8px] lg:h-[47.8px] lg:px-[20px] lg:text-[14px]">
              {t}
            </button>
          ))}
        </div>
      </Container>
      <Container id="trust-article" role="tabpanel" className="mb-[128px] flex flex-col gap-[52px] md:mb-[136px] xl:gap-[64px] xl:pr-[455px]">
        <div className="flex flex-col gap-[20px] xl:gap-[24px]">
          <h2 className="m-0 font-mono font-normal uppercase text-ink text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono">{current}</h2>
          <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] text-ink xl:text-accordion-body">{fit(TRUST_LENS[current]?.p || 325, seed + k0)}</p>
        </div>
        <div className="flex flex-col gap-[24px] md:gap-[32px]">
          {Array.from({ length: n }, (_, i) => (
            <div key={`${current}-${i}`} className="mb-[28px] grid grid-cols-1 gap-[12px] md:mb-[8px] md:grid-cols-[65px_1fr] md:gap-[24px] xl:mb-[20px] xl:grid-cols-[74px_711px] xl:gap-[32px]">
              <Placeholder label="Topic icon" variant="shape" className="h-[65px] w-[65px] xl:h-[74px] xl:w-[74px]" />
              <div className="flex flex-col gap-[12px] md:gap-[16px] md:pt-[20px]">
                <h3 className="m-0 flex items-center gap-[8px] font-mono font-normal uppercase text-ink text-[16px] leading-[22.4px] md:text-card-h3-mono-tall-sm xl:text-card-h3-mono-tall">
                  {fitTitle(TRUST_LENS[current]?.items?.[i]?.[0] || 14, seed + k0 + i)}
                  {i === 0 && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
                      <path d="M8 4.5H4.5v11h11V12M11 4.5h4.5V9M15.5 4.5 9 11" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </h3>
                <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] text-ink xl:text-accordion-body">
                  {fit(TRUST_LENS[current]?.items?.[i]?.[1] || 400, seed * 3 + k0 + i)}
                  {i === 1 && <> <InlineLink to="/product/pricing">{title(2, 5)}</InlineLink></>}
                  {i === 0 && <> <InlineLink to="/contact-us/product-expert">{title(2, 6)}</InlineLink></>}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

// ---------- RepoGrid (community) ----------
function Glyph({ size = 22, d = 'M4 11h14M11 4v14' }) {
  return <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d={d} stroke="#383838" strokeWidth="1.5" /></svg>
}

export function RepoGrid({ seed = 1 }) {
  return (
    <section className="relative border-y-2 border-ink bg-sky-hover">
      <TagTitle className="absolute left-[24px] top-[-25px] z-[1] px-[20px] py-[12px] text-h2-mono-xs md:left-[39px] md:top-[-32px] md:text-h2-mono-tall-sm xl:left-[102px] xl:top-[-35px] xl:text-h2-mono-tall">{fitTitle(23, seed)}</TagTitle>
      {/* 960–1301 column layout UNMEASURED beyond the 448 width */}
      <Container className="grid grid-cols-1 gap-[24px] pb-[64px] pt-[100px] md:grid-cols-[repeat(2,332px)] md:pb-[100px] lg:grid-cols-[repeat(2,448px)] lg:justify-center xl:grid-cols-[repeat(2,609px)]">
        {/* All repo / resource links are external -> non-links */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col border-2 border-ink bg-white p-[24px] xl:p-[32px]">
            <Placeholder width={120} height={120} variant="shape" label="Project logo" />
            <div className="flex flex-wrap gap-[4px] py-[20px]">
              {[['bg-tag-blue', 'EXTENSION'], ['bg-tag-violet', 'OPEN SOURCE']].map(([c, l]) => (
                <span key={l} className={`px-[12px] py-[8px] font-mono text-[12px] font-light uppercase leading-[16.8px] tracking-[0.24px] text-ink ${c}`}>{l}</span>
              ))}
            </div>
            {/* Fragment Mono has no bold: synthetic bold for the repo name */}
            <h3 className="m-0 break-words font-mono text-[24px] font-normal leading-[28.8px] text-ink">org-{i + 1}/<strong className="font-bold">{title(2, seed + i).toLowerCase().replace(' ', '-')}</strong></h3>
            <p className="m-0 font-sans text-body-md text-ink">{text(8, seed * 3 + i)}</p>
            <div className="my-[32px] flex items-center gap-[12px]">
              <Glyph size={32} d="M11 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
              <span className="font-sans text-[20px] font-light leading-[20px] text-ink">{(1200 + i * 731).toLocaleString('en-US')}</span>
              <Glyph size={24} d="m11 2.5 2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L2.4 8.8l6-.7Z" />
            </div>
            <div className="flex gap-[8px]">
              {Array.from({ length: 2 + (i % 2) }, (_, k) => (
                <span key={k} aria-label="Resource link (external)" className="flex h-[46px] w-[46px] items-center justify-center bg-[rgba(255,113,105,0.08)] p-[12px]">
                  <Glyph d={['M4 11h14M11 4v14', 'M4 6h14M4 11h14M4 16h9', 'M6 4v14l12-7z'][k]} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

// ---------- SocialCarousel (community) ----------
export const SOCIAL_AUTOPLAY_MS = 6000 // measured on the original: 6.0 s per card
export const SOCIAL_SLIDE_MS = 500 // measured: transform .5s

export function SocialCarousel({ count = 19, seed = 1 }) {
  const [i, setI] = useState(0)
  const reduced = usePrefersReducedMotion()
  useAutoplay(() => setI((v) => (v + 1) % count), SOCIAL_AUTOPLAY_MS, !reduced)
  return (
    <section className="overflow-hidden">
      <Container className="flex flex-col gap-[32px] py-[72px] md:py-[88px] xl:py-[120px]">
        <h2 className="m-0 font-mono font-normal uppercase text-ink text-h2-mono-xs md:text-h2-mono-tall-sm xl:text-h2-mono-tall">{title(4, seed)}</h2>
        <div
          className="flex [--card:342px] md:[--card:403px] xl:[--card:392.7px]"
          style={{ transform: `translateX(calc(${-i} * (var(--card) + 32px)))`, transition: reduced ? 'none' : `transform ${SOCIAL_SLIDE_MS}ms ease-in-out` }}
        >
          {/* All social links are external -> non-links */}
          {Array.from({ length: count }, (_, k) => (
            <article key={k} className="mr-[32px] flex h-[304px] w-[var(--card)] shrink-0 flex-col gap-[20px] border-2 border-ink bg-white p-[40px] xl:h-[326px]">
              <div className="flex items-center gap-[12px]">
                <Placeholder width={46} height={46} rounded="rounded-full" label="Avatar" />
                <div className="min-w-0 flex-1">
                  <p className="m-0 font-sans text-[16px] font-bold leading-[22.4px] tracking-[0.32px] text-ink">Person {String.fromCharCode(65 + (k % 26))}</p>
                  <p className="m-0 font-sans text-[14px] leading-[19px] text-gray-600">@person_{k + 1}</p>
                </div>
                <Glyph size={24} d="M3 3h16v16H3z" />
              </div>
              <p className="m-0 line-clamp-6 font-sans text-[16px] font-normal leading-[22px] tracking-[0.32px] text-ink">{text(28 + (k % 4) * 6, seed * 3 + k)}</p>
            </article>
          ))}
        </div>
        {/* controls row (measured 24 tall: two 24px arrows, gap 16 / 24 <728) */}
        <div className="flex items-center gap-[24px] md:gap-[16px]">
          <button type="button" aria-label="Previous posts" onClick={() => setI((v) => (v - 1 + count) % count)} className="flex h-[24px] w-[24px] items-center justify-center border-0 bg-transparent p-0 text-ink"><LeftArrow /></button>
          <button type="button" aria-label="Next posts" onClick={() => setI((v) => (v + 1) % count)} className="flex h-[24px] w-[24px] items-center justify-center border-0 bg-transparent p-0 text-ink"><ArrowRight /></button>
        </div>
      </Container>
    </section>
  )
}
