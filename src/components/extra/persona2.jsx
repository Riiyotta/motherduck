// X12 persona landing (PAGES_SPEC_EXTRA §6): /product/for-founders, /product/for-operators. One template, two
// block lists (data/marketing.js PERSONA). Placeholder copy sized to the measured character counts.
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, OffsetButton, Placeholder, UnderlineLink } from '../ui'
import { usePrefersReducedMotion } from '../../lib/sim.js'
import { words } from './generic.jsx'
import '../../styles/extra-marketing.css'

const H1 = 'm-0 font-mono text-[28px] font-normal uppercase leading-[30.52px] md:text-[40px] md:leading-[43.6px] lg:text-[44px] lg:leading-[48px]'
const H2 = 'm-0 font-mono text-[28px] font-normal uppercase leading-[33.6px] md:text-[32px] md:leading-[38.4px] xl:text-[40px] xl:leading-[48px]'
const H3 = 'm-0 font-mono text-[18px] font-normal uppercase leading-[23.4px] tracking-[0.36px] md:text-[20px] md:leading-[26px] md:tracking-[0.4px]'
const LEDE = 'm-0 font-sans text-[16px] font-normal leading-[25.6px] tracking-[0.32px] md:text-[18px] md:leading-[28.8px] md:tracking-[0.36px]'
const PAD = 'py-[64px] md:py-[80px] lg:py-[88px] xl:py-[96px]'
const t = (n, s, o) => words(n, s, o)

// Primary CTA on this template: OffsetButton lg on sky-hover; on dark sections a 2px #F8F8F7 border + backing.
function Primary({ to, dark, children }) {
  return (
    <OffsetButton size="lg" arrow to={to} className={`!bg-sky-hover ${dark ? '!border-surface-2' : ''}`} wrapperClassName={dark ? '!bg-surface-2' : ''}>{children}</OffsetButton>
  )
}
function TextCta({ to, dark, children }) {
  return <UnderlineLink to={to} uppercase className={dark ? '!text-surface-2' : ''} labelClassName={dark ? '!border-surface-2' : ''}>{children}</UnderlineLink>
}

// ---------- 1. hero ----------
export function PersonaHero2({ d }) {
  return (
    <section className="overflow-clip bg-cream pb-[48px] pt-[32px] lg:pb-[64px] lg:pt-[48px]">
      <Container className="flex flex-col items-center gap-[48px] lg:flex-row lg:justify-between xl:gap-[64px]">
        <div className="flex w-full flex-col gap-[24px] lg:w-[475.6px] lg:shrink-0 lg:gap-[32px] xl:w-[600px]">
          <h1 className={H1}>{d.h1}</h1>
          <p className={`${LEDE} max-w-[540px]`}>{t(...d.lede)}</p>
          <div className="flex flex-col items-start gap-[24px] pt-[8px] md:flex-row md:flex-wrap md:items-center md:gap-x-[32px] md:gap-y-[16px]">
            {/* sign-up is an auth URL -> non-link button */}
            <Primary>Start free</Primary>
            <TextCta to="/startups">Join startup program</TextCta>
          </div>
        </div>
        {/* animated SVG product diagram on the original -> static art; the art plays the original's `window` part
            entrance once on load (xm-hero-window, extra-marketing.css) */}
        <div className="h-[300px] w-full overflow-hidden rounded-[10px] border-2 border-ink bg-white md:h-[540px] md:w-[616px] md:rounded-[16px] lg:h-[347.6px] lg:w-[396.4px] lg:rounded-[20px] xl:h-[438.4px] xl:w-[500px]">
          <Placeholder label="Product diagram" bordered={false} rounded="" className="xm-hero-window h-full w-full" />
        </div>
      </Container>
    </section>
  )
}

// ---------- 2. logo strip ----------
const LOGO_W = [88.3, 105, 74.9, 203.9, 39.4, 125.2]
export function LogoStrip2({ d }) {
  return (
    <section className="border-y-2 border-ink bg-white py-[32px] md:py-[40px] xl:py-[48px]">
      <Container className="flex flex-col gap-[16px]">
        <p className="m-0 font-mono text-[12px] font-light uppercase leading-[16px] tracking-[0.24px] text-gray-600">{d.logoLabel}</p>
        <ul className="m-0 -mb-[16px] grid list-none grid-cols-3 gap-y-[16px] p-0 md:grid-cols-[repeat(3,auto)] md:justify-between xl:-m-[8px] xl:flex xl:justify-between">
          {LOGO_W.map((w, i) => (
            <li key={i} className="flex">
              <Link to={`/case-studies/case-study-${i + 1}`} className="xm-lift2 flex h-[48px] max-w-full items-center rounded-sm p-[8px]">
                <Placeholder label={`Customer logo ${i + 1}`} bordered={false} style={{ width: w, height: 32, maxWidth: '100%' }} />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

// ---------- 3. dark feature list ----------
// feature-rise trigger (measured): the list animates once it is ~40% visible (28px above the viewport bottom edge).
// Visible at page load -> the stagger starts after the 1480ms hero offset; reached by scrolling -> it starts at once.
function useFeatureRise() {
  const ref = useRef(null)
  const [state, setState] = useState(null) // null (waiting) | 'load' | 'scroll'
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setState('load'); return undefined }
    let first = true
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState(first ? 'load' : 'scroll'); io.disconnect() }
      first = false
    }, { threshold: 0.4, rootMargin: '0px 0px -28px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, state]
}

export function DarkFeatures({ d }) {
  const [ref, rise] = useFeatureRise()
  return (
    <section className={`bg-ink ${PAD}`}>
      <Container className="flex flex-col gap-[32px] lg:gap-[48px]">
        <h2 className={`${H2} text-surface-2 ${d.features.h2Max || ''}`}>{t(d.features.h2, 9001, { title: true })}</h2>
        {/* motion: feature-rise stagger once in view (see useFeatureRise) + sibling dim on hover */}
        <ul ref={ref} data-rise={rise || undefined} className="xm-features m-0 grid list-none grid-cols-1 gap-[40px] p-0 md:grid-cols-[324px_324px] md:justify-between md:gap-x-[40px] md:gap-y-[48px] lg:grid-cols-[440px_440px] xl:grid-cols-4 xl:gap-0">
          {d.features.items.map(([h, p, link, ps], i) => (
            <li key={i} style={{ '--step-delay': `${i * 80}ms` }} className={`flex flex-col gap-[16px] transition-opacity duration-200 ${i < 3 ? 'xl:pr-[40px]' : ''}`}>
              <Placeholder label="Feature icon" width={56} height={56} bordered={false} />
              <h3 className={`${H3} text-surface-2`}>{t(h, 9010 + i, { title: true })}</h3>
              <p className="m-0 font-sans text-[16px] font-normal leading-[25.6px] tracking-[0.32px] text-surface-2">{t(p, ps || 9020 + i)}</p>
              {link && <UnderlineLink to={link} uppercase size="sm" className="!text-surface-2" labelClassName="!border-surface-2">See how it works</UnderlineLink>}
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-start gap-[24px] md:flex-row md:flex-wrap md:items-center md:gap-x-[24px] md:gap-y-[16px]">
          <Primary dark>{d.features.cta}</Primary>
          {d.features.caption && <p className="m-0 font-sans text-[14px] font-normal leading-[22.4px] tracking-[0.28px] text-[#C0C0C0]">{d.features.caption}</p>}
        </div>
      </Container>
    </section>
  )
}

// ---------- 4. split media (founders) ----------
export function SplitMedia({ d }) {
  return (
    <section className={`bg-cream ${PAD}`}>
      <Container className="flex flex-col gap-[40px] lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-[20px] md:gap-[24px] xl:max-w-[566px]">
          <h2 className={H2}>{t(d.split[0], 9101, { title: true })}</h2>
          <p className={LEDE}>{t(d.split[1], 9102)}</p>
          <div className="flex flex-col items-start gap-[24px] pt-[8px] md:flex-row md:flex-wrap md:items-center md:gap-x-[32px] md:gap-y-[16px]">
            <Primary>Try it with your data</Primary>
            {/* external demo -> non-link */}
            <TextCta>Try the demo app</TextCta>
          </div>
        </div>
        <div className="h-[201px] w-full shrink-0 overflow-hidden rounded-[10px] border-2 border-ink bg-white md:h-[403px] md:rounded-[16px] lg:h-[296.6px] lg:w-[506.1px] lg:rounded-[20px] xl:h-[390.1px] xl:w-[666.7px]">
          <Placeholder label="Product screenshot" bordered={false} rounded="" className="h-full w-full" />
        </div>
      </Container>
    </section>
  )
}

// ---------- 4b. gallery row + security split (operators) ----------
const DIVES = ['232000-theorems-and-counting', 'a-home-fit-for-you', '6-degrees-of-josh-johnson']
export function GalleryRow({ d }) {
  return (
    <section className={`bg-white ${PAD}`}>
      <Container className="flex flex-col gap-[32px] lg:gap-[48px]">
        <div className="flex max-w-[760px] flex-col gap-[20px] md:gap-[24px]">
          <h2 className={H2}>See what you can build.</h2>
          <p className={LEDE}>{t(53, 9201)}</p>
        </div>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3 md:gap-[20px] xl:gap-[28px]">
          {DIVES.map((slug, i) => (
            <Link key={slug} to={`/dive-gallery/dives/${slug}`} className="group flex flex-col gap-[12px] text-ink no-underline">
              <div className="rounded-sm bg-ink">
                <div className="xm-lift-tile overflow-hidden rounded-sm border-2 border-ink bg-white">
                  <Placeholder ratio="16 / 9" label="Gallery thumbnail" bordered={false} rounded="" />
                </div>
              </div>
              <span className="flex flex-col gap-[4px]">
                <span className="font-fono text-[12px] uppercase leading-[16.8px] tracking-[0.48px] text-gray-500">{['Ops', 'Finance', 'Just for fun'][i]}</span>
                <span className="font-sans text-[14px] leading-[14px] md:text-[14px] lg:text-[16px] lg:leading-[16px]">{t(d.gallery[i], 9210 + i, { title: true })}</span>
              </span>
            </Link>
          ))}
        </div>
        <UnderlineLink to="/dive-gallery" uppercase>See more examples</UnderlineLink>
      </Container>
    </section>
  )
}

export function SecuritySplit() {
  return (
    <section className={`bg-cream ${PAD}`}>
      <Container className="flex flex-col gap-[40px] lg:flex-row lg:gap-[48px] xl:gap-[64px]">
        <div className="flex flex-col gap-[32px] lg:w-[360px] lg:shrink-0 lg:gap-[48px] xl:w-[438px]">
          <h2 className={H2}>Fast for you, secure for your IT team.</h2>
          <ul className="m-0 flex list-none flex-wrap gap-x-[32px] gap-y-[16px] p-0">
            {['SOC 2 Type II', 'GDPR'].map((b) => (
              <li key={b} className="flex items-center gap-[12px] font-sans text-[14px] font-medium leading-[20px]">
                <Placeholder label="Compliance badge" width={56} height={56} bordered={false} />{b}
              </li>
            ))}
          </ul>
        </div>
        <ol className="m-0 flex flex-1 list-none flex-col p-0">
          {[[20, 62, 9313], [19, 85, 9311]].map(([h, p, ps], i) => (
            <li key={i} className="flex flex-col gap-[8px] border-t-2 border-ink py-[24px] md:flex-row md:gap-[32px]">
              <h3 className={`${H3} md:w-[232px] md:shrink-0`}>{t(h, 9300 + i, { title: true })}</h3>
              <p className="m-0 font-sans text-[16px] font-normal leading-[25.6px] tracking-[0.32px]">{t(p, ps)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

// ---------- 5. pricing band ----------
export function PricingBand2({ d }) {
  return (
    <section className={`border-t-2 border-ink py-[48px] md:py-[56px] xl:py-[64px] ${d.pricing.sun ? 'border-b-2 bg-sun' : 'bg-cream'}`}>
      <Container className="flex flex-col items-start gap-[32px] lg:flex-row lg:items-center lg:justify-between lg:gap-[64px]">
        <div className="flex max-w-[960px] flex-col gap-[20px] md:gap-[24px]">
          <h2 className={H2}>{d.pricing.h2}</h2>
          <p className={LEDE}>{d.pricing.p}</p>
        </div>
        <Primary to="/product/pricing">See plans &amp; pricing</Primary>
      </Container>
    </section>
  )
}

// ---------- 6. industry swiper ----------
// Measured on the original: autoplay advances one slide every 6.4 s (6 s delay + 0.4 s ease-in-out slide), loops,
// arrows step one slide; 3 / 2 / 1 / 1 slides per view with an "a–b / 6 industries" counter and dots.
export const SWIPER_DELAY_MS = 6000
export const SWIPER_SPEED_MS = 400
const SQUARE = ['bg-coral-soft', 'bg-sky', 'bg-yellow', 'bg-teal', 'bg-[#FFC18A]', 'bg-sand-chip']
const QUERIES = ['(min-width: 1302px)', '(min-width: 960px)']
const perView = () => (typeof window === 'undefined' ? 3 : window.matchMedia(QUERIES[0]).matches ? 3 : window.matchMedia(QUERIES[1]).matches ? 2 : 1)

function Arrow({ dir, onClick, label }) {
  return (
    <button type="button" aria-label={label} onClick={onClick}
      className={`xm-arrow flex h-[48px] w-[48px] items-center justify-center rounded-sm border-2 border-ink ${dir < 0 ? 'bg-cream' : 'bg-sky-hover'}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={dir < 0 ? 'rotate-180' : ''}>
        <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  )
}

export function IndustrySwiper({ d, industries }) {
  const n = industries.length
  const [i, setI] = useState(0) // index into the doubled track
  const [anim, setAnim] = useState(true)
  const [pv, setPv] = useState(perView)
  const reduced = usePrefersReducedMotion()
  const track = useRef(null)
  const [step, setStep] = useState(403.2)
  useEffect(() => {
    const on = () => setPv(perView())
    const mqs = QUERIES.map((q) => window.matchMedia(q))
    mqs.forEach((m) => m.addEventListener('change', on))
    return () => mqs.forEach((m) => m.removeEventListener('change', on))
  }, [])
  useEffect(() => {
    const el = track.current
    if (!el) return undefined
    const measure = () => {
      const a = el.children[0]
      const b = el.children[1]
      if (a && b) setStep(b.getBoundingClientRect().left - a.getBoundingClientRect().left)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const go = useCallback((delta) => {
    setAnim(true)
    setI((x) => {
      if (delta < 0 && x === 0) {
        // jump to the copy, then animate one step back on the next frame
        setAnim(false)
        requestAnimationFrame(() => requestAnimationFrame(() => { setAnim(true); setI(n - 1) }))
        return n
      }
      return x + delta
    })
  }, [n])
  // after a forward move past the last real slide, snap back to the first copy without animation
  const onEnd = () => { if (i >= n) { setAnim(false); setI(i - n) } }
  useEffect(() => {
    if (reduced) return undefined
    const id = setTimeout(() => go(1), SWIPER_DELAY_MS + (i === 0 ? 0 : SWIPER_SPEED_MS))
    return () => clearTimeout(id)
  }, [i, go, reduced])
  const real = ((i % n) + n) % n
  const counter = pv === 1 ? `${real + 1} / ${n}` : `${real + 1}–${Math.min(real + pv, n)} / ${n}`
  return (
    <section className={`${d.swiperBg} ${PAD}`}>
      <Container className="flex flex-col gap-[32px] lg:gap-[48px]">
        <div className="flex flex-col gap-[24px] lg:flex-row lg:items-end lg:justify-between lg:gap-[32px]">
          <h2 className={`${H2} max-w-[640px]`}>{d.swiperH2}</h2>
          <div className="flex items-center justify-end gap-[24px]">
            <Link to="/case-studies" className="hidden font-sans text-[16px] uppercase leading-[19.2px] tracking-[0.32px] text-ink underline lg:inline">All customer stories →</Link>
            <div className="flex gap-[12px]">
              <Arrow dir={-1} label="Previous industry" onClick={() => go(-1)} />
              <Arrow dir={1} label="Next industry" onClick={() => go(1)} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[32px] lg:gap-[48px]">
          <div className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Customer stories by industry">
            <div ref={track} onTransitionEnd={onEnd} className="flex"
              style={{ transform: `translate3d(${-i * step}px,0,0)`, transition: anim ? `transform ${SWIPER_SPEED_MS}ms ease-in-out` : 'none' }}>
              {[...industries, ...industries].map((ind, k) => (
                <div key={k} aria-hidden={k % n !== real || undefined}
                  className="mr-[16px] flex h-[431.2px] w-[309.5px] shrink-0 flex-col gap-[20px] rounded-sm border-2 border-ink bg-surface-2 p-[20px] md:mr-[24px] md:h-[360px] md:w-[421px] md:p-[28px] lg:w-[417.1px] xl:w-[379.2px]">
                  <div className="flex items-center gap-[16px]">
                    <span className={`h-[40px] w-[40px] shrink-0 rounded-sm border-2 border-ink ${SQUARE[k % n]}`} />
                    <h3 className="m-0 font-mono text-[18px] font-normal uppercase leading-[21.6px] tracking-[0.36px] md:text-[20px] md:leading-[24px] md:tracking-[0.4px]">{ind.name}</h3>
                  </div>
                  <ul className="m-0 flex list-none flex-wrap gap-[12px] p-0">
                    {ind.tiles.map(([w, span], q) => (
                      <li key={q} className={span === 'f' ? 'w-full' : span === 'hs' ? 'w-full md:w-[calc(50%-6px)]' : 'w-[calc(50%-6px)]'}>
                        <Link to={`/case-studies/case-study-${((k % n) * 3 + q) % 20 + 1}`} tabIndex={k % n === real ? 0 : -1}
                          className="xm-tile flex h-[72px] items-center justify-center rounded-sm border border-hairline bg-white px-[14px]">
                          <Placeholder label="Customer logo" bordered={false} style={{ width: w, height: 28 }} className="max-w-full" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="flex gap-[8px]">
              {industries.map((_, k) => (
                <button key={k} type="button" aria-label={`Go to industry ${k + 1}`} onClick={() => { setAnim(true); setI(k) }}
                  className={`h-[8px] rounded-sm border-0 p-0 ${k === real ? 'w-[24px] bg-ink' : 'w-[8px] bg-[#C0C0C0]'}`} />
              ))}
            </div>
            <p className="m-0 font-mono text-[14px] uppercase leading-[16.8px] tracking-[1.12px]" aria-live="polite">{counter} industries</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ---------- 7. agent links ----------
const CHIP = { Video: 'bg-[rgba(83,219,201,0.4)]', Docs: 'bg-sand-chip', 'How-to': 'bg-sky-tint', Guide: 'bg-orange' }

function GatedCard({ g }) {
  return (
    <Link to="/lp/guide-to-bi-in-the-agentic-era-full" className="xm-agent-gated flex flex-col rounded-sm border-2 border-ink bg-peach text-ink no-underline lg:col-span-2 lg:flex-row">
      <span className="flex items-center justify-center border-b-2 border-ink bg-[#FFC18A] p-[24px] lg:w-[281.4px] lg:shrink-0 lg:border-b-0 lg:border-r-2 lg:p-[40px] xl:w-[382.3px]">
        <Placeholder label="Guide book cover" className="h-[206.8px] w-[160px] !border-2 !border-ink lg:h-[257.6px] lg:w-[199.4px] xl:h-[305px] xl:w-[236px]" bordered={false} />
      </span>
      <span className="flex flex-1 flex-col gap-[12px] p-[24px] lg:gap-[16px] lg:p-[32px]">
        <span className={`w-fit rounded-sm border border-ink px-[8px] py-[4px] font-mono text-[12px] uppercase leading-[16.8px] tracking-[0.48px] ${CHIP.Guide}`}>Guide</span>
        <span className="font-mono text-[22px] uppercase leading-[27.5px] tracking-[0.44px] lg:text-[28px] lg:leading-[35px] lg:tracking-[0.56px]">Guide to BI for the agent era</span>
        <span className="font-sans text-[16px] leading-[24px] tracking-[0.16px]">{t(88, 9401)}</span>
        <span className="mt-auto flex items-center justify-between gap-[16px] border-t-2 border-[rgba(56,56,56,0.15)] pt-[16px] lg:pt-[20px]">
          <span className="font-sans text-[14px] leading-[19.6px]">Free 18-page guide</span>
          <span className="whitespace-nowrap font-sans text-[16px] font-semibold uppercase leading-[19.2px] tracking-[0.32px] underline">Get the guide →</span>
        </span>
      </span>
    </Link>
  )
}

function LinkCard({ c, i, featured }) {
  const Inner = c.to ? Link : 'div'
  const video = c.kind === 'Video'
  return (
    <Inner {...(c.to ? { to: c.to } : {})} className={`xm-agent-card flex rounded-sm border-2 border-ink bg-white text-ink no-underline lg:flex-col ${featured ? 'flex-col' : 'max-lg:py-[14px] max-lg:pl-[14px]'}`}>
      <span className={`relative flex shrink-0 items-center justify-center bg-cream lg:aspect-[388.7/204] lg:w-auto lg:rounded-none lg:border-0 lg:border-b-2 lg:border-ink ${featured ? 'aspect-[684/357.1] w-full border-b-2 border-ink' : 'h-[59px] w-[112px] rounded-sm border-2 border-ink lg:h-auto'}`}>
        <Placeholder label={video ? 'Video thumbnail' : 'Article thumbnail'} bordered={false} rounded="" className="!absolute inset-0 h-full w-full" />
        {video && (
          <>
            <span className="relative flex h-[26px] w-[26px] items-center justify-center rounded-sm border-2 border-ink bg-sky-hover lg:absolute lg:bottom-[16px] lg:left-[16px] lg:h-[52px] lg:w-[52px]">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="lg:h-[22px] lg:w-[22px]"><path d="M3 1.5v9l7-4.5z" fill="#383838" /></svg>
            </span>
            <span className="absolute bottom-[12px] right-[12px] hidden rounded-sm bg-ink px-[8px] py-[4px] font-mono text-[12px] leading-[16.8px] tracking-[0.48px] text-white lg:inline">{c.dur}</span>
          </>
        )}
      </span>
      <span className={`flex min-w-0 flex-1 flex-col lg:gap-[16px] lg:px-[32px] lg:pb-[32px] lg:pt-[28px] ${featured ? 'gap-[12px] p-[24px]' : 'gap-[8px] pl-[14px] pr-[16px]'}`}>
        <span className={`w-fit rounded-sm border border-ink px-[8px] py-[4px] font-mono text-[12px] uppercase leading-[16.8px] tracking-[0.48px] ${CHIP[c.kind]}`}>{c.kind}</span>
        <span className={`font-mono uppercase lg:line-clamp-2 lg:min-h-[52px] lg:text-[20px] lg:leading-[26px] lg:tracking-[0.4px] ${featured ? 'text-[18px] leading-[23.4px] tracking-[0.36px]' : 'line-clamp-3 text-[16px] leading-[20.8px] tracking-[0.32px]'}`}>{t(c.title, 9500 + i, { sentence: false })}</span>
        {c.desc > 0 && <span className={`font-sans lg:line-clamp-1 lg:text-[15px] lg:leading-[22.5px] lg:tracking-[0.15px] ${featured ? 'line-clamp-1 text-[14px] leading-[21px] tracking-[0.14px]' : 'hidden'}`}>{t(c.desc, 9510 + i)}</span>}
        {c.meta && <span className={`font-sans text-[13px] leading-[18.2px] lg:hidden ${featured ? 'hidden' : ''}`}>{c.meta}</span>}
        <span className={`mt-auto items-center justify-between gap-[16px] border-t-2 border-[rgba(56,56,56,0.15)] pt-[16px] lg:flex lg:pt-[20px] ${featured ? 'flex' : 'hidden'}`}>
          <span className="font-sans text-[14px] leading-[19.6px]">{c.meta}</span>
          <span className="font-sans text-[16px] uppercase leading-[19.2px] tracking-[0.32px] underline">{c.cta}</span>
        </span>
      </span>
    </Inner>
  )
}

export const COPY_RESET_MS = 2000 // "Copied" label revert timing UNMEASURED on the original
export function AgentLinks({ d }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    // all card targets, including the docs pages that render as non-links here (excluded app)
    const links = d.agent.cards.map((c) => c.to || c.copy).filter(Boolean).map((h) => `${window.location.origin}${h}`)
    if (d.agent.gated) links.unshift(`${window.location.origin}/lp/guide-to-bi-in-the-agentic-era-full`)
    navigator.clipboard?.writeText(links.join('\n')).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), COPY_RESET_MS)
  }
  return (
    <section className={`border-y-2 border-ink bg-white ${PAD}`}>
      <Container>
        <div className="mb-[32px] flex flex-col items-start gap-[24px] lg:mb-[48px] lg:flex-row lg:items-end lg:justify-between lg:gap-[40px]">
          <h2 className={`${H2} max-w-[1010px]`}>{d.agent.h2[0]}{d.agent.h2[1] && <><br className="hidden lg:block" /><span className="lg:hidden"> </span>{d.agent.h2[1]}</>}</h2>
          {d.agent.gated && (
            <button type="button" onClick={copy}
              className="xm-copy flex shrink-0 items-center gap-[10px] rounded-sm border-2 border-ink bg-white px-[18px] py-[12px] font-sans text-[14px] font-medium uppercase leading-[16.8px] tracking-[0.56px] text-ink">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5" y="5" width="9" height="9" stroke="currentColor" strokeWidth="1.5" /><path d="M11 2H2v9" stroke="currentColor" strokeWidth="1.5" /></svg>
              <span aria-live="polite">{copied ? `Copied ${d.agent.cards.filter((c) => c.to || c.copy).length + 1} links ✓` : 'Copy all links'}</span>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-3 lg:gap-[32px]">
          {d.agent.gated && <GatedCard />}
          {d.agent.cards.map((c, i) => <LinkCard key={i} c={c} i={i} featured={!d.agent.gated && i === 0} />)}
        </div>
      </Container>
    </section>
  )
}

// ---------- 8. closing band ----------
export function ClosingBand2({ d }) {
  const dark = !d.closing.sun
  return (
    <section className={`${dark ? 'bg-ink pt-[64px] md:pt-[80px] lg:pt-[88px] xl:pt-[96px]' : `bg-sun ${PAD}`}`}>
      <Container className="flex flex-col items-start gap-[40px]">
        <h2 className={`${H1} max-w-[560px] ${dark ? 'text-surface-2' : ''}`}>{d.closing.h2}</h2>
        <div className="flex flex-col items-start gap-[24px] md:flex-row md:flex-wrap md:items-center md:gap-x-[32px] md:gap-y-[16px]">
          <Primary dark={dark}>{d.closing.cta}</Primary>
          {d.closing.link && <TextCta to="/startups" dark={dark}>Join startup program</TextCta>}
        </div>
      </Container>
    </section>
  )
}
