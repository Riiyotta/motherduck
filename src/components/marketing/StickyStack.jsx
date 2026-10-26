import { useEffect, useRef } from 'react'
import { Container, Placeholder } from '../ui'
import { SectionHead, TextLink, useMedia, usePrefersReducedMotion } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// §3 B7 StickyStack. >=728: a tall wrapper (565px + (n-1)×83.333vh) with a view timeline; a sticky
// (top 250) box holds n absolutely stacked articles. Card i scales 1 -> 0.9 over the same range in which
// card i+1 slides up from translate 0 1000px. CSS scroll-driven animations where supported, rAF fallback
// otherwise. <728 (and under prefers-reduced-motion): plain column, gap 52.

// "cover a% cover b%" steps per card count (measured n=5/4/3; other n interpolate from 20%).
function steps(n) {
  if (n === 3) return { start: 30, w: 20 }
  if (n === 5) return { start: 20, w: 15 }
  return { start: 20, w: 60 / Math.max(1, n - 1) }
}
const rangeOf = (n, k) => {
  const { start, w } = steps(n)
  return [start + k * w, start + (k + 1) * w]
}
const fmt = ([a, b]) => `cover ${a}% cover ${b}%`

function animFor(n, i) {
  const names = []
  const ranges = []
  if (i > 0) { names.push('mk-stack-slide'); ranges.push(fmt(rangeOf(n, i - 1))) }
  if (i < n - 1) { names.push('mk-stack-scale'); ranges.push(fmt(rangeOf(n, i))) }
  return { '--stack-names': names.join(', '), '--stack-ranges': ranges.join(', ') }
}

const supportsTimeline = () => typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()')

function Card({ c, stacked, i, wide }) {
  if (!stacked) {
    return (
      <article className={`flex w-full ${wide ? 'max-w-[450px]' : 'max-w-[327px]'} flex-col overflow-hidden border-2 border-ink bg-white`}>
        <div className="flex flex-col gap-[12px] px-[24px] pb-[20px] pt-[24px]">
          {c.eyebrow && <span className="w-fit bg-cream px-[12px] py-[8px] font-mono text-chip-mono-tall uppercase text-ink">{c.eyebrow}</span>}
          <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-sm">{c.h}</h3>
          <p className={`m-0 font-sans text-card-body text-ink ${c.p400 ? '!font-normal' : ''}`}>{c.p}</p>
          {c.link !== undefined && <TextLink to={c.link} className="mt-[12px]">{c.label}</TextLink>}
        </div>
        <Placeholder width={304} height={254} label={`Feature image ${i + 1}`} rounded="" bordered={false} className="-mr-[5px] self-end" />
      </article>
    )
  }
  return (
    <>
      <div className="flex flex-col gap-[12px] px-[40px] pb-[20px] pt-[40px] xl:w-[500px] xl:shrink-0 xl:justify-center xl:p-0">
        {c.eyebrow && <span className="w-fit bg-cream px-[12px] py-[8px] font-mono text-chip-mono-tall uppercase text-ink">{c.eyebrow}</span>}
        <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono">{c.h}</h3>
        <p className={`m-0 max-w-[550px] font-sans text-ink text-card-body xl:max-w-none xl:text-accordion-body ${c.p400 ? '!font-normal' : ''}`}>{c.p}</p>
        {c.link !== undefined && <TextLink to={c.link} className="mt-[12px]">{c.label}</TextLink>}
      </div>
      <Placeholder
        label={`Feature image ${i + 1}`}
        rounded=""
        bordered={false}
        className="-mr-[2px] h-[394px] w-[470px] shrink-0 self-end xl:order-first xl:h-[488px] xl:w-[580px] xl:self-auto"
      />
    </>
  )
}

// `lens` ({ h3, body: [chars...], labels: [link label...] }) sizes each card to the original's counts.
export function stackCards(n, seed, links, p400 = false, lens) {
  return Array.from({ length: n }, (_, i) => ({
    h: lens?.h3 ? fitTitle(lens.h3[i], seed * 17 + i) : title(3 + (i % 3), seed * 17 + i),
    p: lens?.body ? fit(lens.body[i], seed * 19 + i) : text(34 + ((i * 5) % 16), seed * 19 + i),
    link: links ? links[i] ?? null : undefined,
    label: lens?.labels?.[i] || 'LEARN MORE',
    eyebrow: lens?.eyebrow ? fitTitle(lens.eyebrow[i], seed * 23 + i).toUpperCase() : null,
    p400,
  }))
}

export default function StickyStack({ bg = 'bg-sun', cards, introMax = 'max-w-[820px]', introWeight400 = false, guides = false, borderBottom = false, seed = 3, intro, vs = false, mobileWide = false, stackH = 565 }) {
  const wide = useMedia('(min-width: 728px)')
  const reduced = usePrefersReducedMotion()
  const stacked = wide && !reduced
  const n = cards.length
  const wrap = useRef(null)
  const items = useRef([])

  // rAF fallback for browsers without scroll-driven animations.
  useEffect(() => {
    if (!stacked || supportsTimeline()) return undefined
    let raf = 0
    const lerp = (p, [a, b]) => Math.min(1, Math.max(0, (p - a) / (b - a)))
    const update = () => {
      raf = 0
      const r = wrap.current.getBoundingClientRect()
      const vh = window.innerHeight
      const p = ((vh - r.top) / (vh + r.height)) * 100
      items.current.forEach((el, i) => {
        if (!el) return
        const slide = i > 0 ? 1 - lerp(p, rangeOf(n, i - 1)) : 0
        const scale = i < n - 1 ? 1 - 0.1 * lerp(p, rangeOf(n, i)) : 1
        el.style.translate = `0 ${slide * 1000}px`
        el.style.scale = String(scale)
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [stacked, n])

  return (
    <section className={`overflow-clip border-t-2 border-ink ${borderBottom ? 'border-b-2' : ''} ${bg}`}>
      <Container className={`flex flex-col items-center gap-[30px] pb-[80px] pt-[64px] md:gap-[40px] md:pb-[184px] md:pt-[92px] xl:gap-[100px] xl:pt-[80px] ${guides ? 'xl:pb-[200px]' : 'xl:pb-[180px]'}`}>
        <SectionHead
          title={intro ? fitTitle(intro[0], seed) : title(5, seed)}
          className="w-full"
          style={{ '--intro-max': `${introMax.match(/\d+/)[0]}px` }}
          pClass={`text-accordion-body xl:max-w-[var(--intro-max)] xl:text-lede-hero mb-[10px] ${vs || stackH > 565 ? 'md:mb-[60px]' : 'md:mb-[40px]'} xl:mb-[10px] ${introWeight400 ? '!font-normal' : ''}`}
        >
          {intro ? fit(intro[1], seed + 1) : text(32, seed + 1)}
        </SectionHead>
        {stacked ? (
          <div ref={wrap} className="mk-stack-wrap relative w-full xl:![--stack-h:492px]" style={{ '--stack-h': `${stackH}px`, height: `calc(var(--stack-h) + ${n - 1} * 83.333vh)` }}>
            <div className="sticky top-[250px] mx-auto h-[555px] w-[688px] lg:h-[565px] lg:w-[920px] xl:h-[492px] xl:w-[1242px]">
              {cards.map((c, i) => (
                <article
                  key={i}
                  ref={(el) => { items.current[i] = el }}
                  data-anim=""
                  className="mk-stack-card absolute left-0 top-0 -mt-[60px] flex w-full flex-col overflow-hidden border-2 border-ink bg-white xl:-mt-[10px] xl:h-full xl:flex-row xl:items-stretch xl:justify-start xl:gap-[80px]"
                  style={{ zIndex: i + 1, '--scale-end': 0.9, ...animFor(n, i) }}
                >
                  <Card c={c} i={i} stacked />
                </article>
              ))}
            </div>
          </div>
        ) : wide ? (
          // prefers-reduced-motion at >=728: same articles, laid out statically in a column.
          <div className="flex w-full flex-col items-center gap-[40px]">
            {cards.map((c, i) => (
              <article key={i} className="flex w-[688px] flex-col overflow-hidden border-2 border-ink bg-white lg:w-[920px] xl:h-[492px] xl:w-[1242px] xl:flex-row xl:items-stretch xl:justify-start xl:gap-[80px]">
                <Card c={c} i={i} stacked />
              </article>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-[52px]">
            {cards.map((c, i) => <Card key={i} c={c} i={i} stacked={false} wide={mobileWide} />)}
          </div>
        )}
      </Container>
    </section>
  )
}
