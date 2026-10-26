// F1 FeedHero (Blog, News, Quack, Learn) with typewriter (blog) and scroll-linked doodles (§3d).
import { useEffect, useRef, useState } from 'react'
import { Doodle } from './bits.jsx'
import { useMedia, usePrefersReducedMotion } from './hooks.js'

const V = {
  blog: {
    section: 'pt-[52px] pb-[42px] lg:pt-[90px] lg:pb-[80px] xl:pt-[80px] xl:pb-[70px]',
    h1: 'text-feed-h1-sm md:text-feed-h1-md lg:text-feed-h1 pb-[8px] lg:pb-[30px]',
  },
  news: {
    section: 'pt-[40px] pb-[40px] md:pt-[64px] md:pb-[70px] lg:pt-[84px] lg:pb-[70px] xl:pt-[90px] xl:pb-[100px]',
    h1: 'text-feed-h1-sm-alt md:text-news-h1-md lg:text-news-h1-lg xl:text-feed-h1 px-[16px] md:px-0 pb-[8px] md:pb-[16px] lg:pb-[24px] xl:pb-[32px]',
  },
  quack: {
    section: '',
    inner: 'flex flex-col gap-[8px] pt-[32px] pb-[48px] md:gap-[16px] md:pt-[36px] md:pb-[90px] lg:gap-[24px] lg:pt-[72px] lg:pb-[110px] xl:gap-[32px] xl:pt-[100px] xl:pb-[120px]',
    h1: 'text-feed-h1-sm md:text-feed-h1-md lg:text-quack-h1-lg xl:text-feed-h1 mx-auto max-w-[290px] md:max-w-[540px] lg:max-w-[720px] xl:max-w-none',
  },
  learn: {
    section: 'pt-[40px] pb-[60px] px-[24px] md:py-[64px] md:px-[40px] lg:pt-[110px] lg:pb-[140px] lg:px-[40px]',
    h1: 'text-feed-h1-sm-alt md:text-feed-h1-md lg:text-feed-h1',
  },
}

/* Blog typewriter: real <h1> at opacity 0, an absolute span copy reveals with steps(N) (>=728).
   Re-measured on the live site: at >=728 the caret lives on the span's ::before/::after (absolute, 1ch wide,
   right:0), so the h1 box is the text only (744 @1440); at SM the caret is inline after the text on both. */
function TypedH1({ text, className }) {
  return (
    <div className="relative mx-auto w-fit">
      <h1 className={`m-0 font-mono font-normal uppercase text-ink opacity-0 ${className}`}>
        {text}<span className="ct-caret md:hidden" />
      </h1>
      <span aria-hidden="true" className={`ct-type font-mono font-normal uppercase text-ink ${className}`} style={{ '--type-steps': text.length }}>
        {text}
      </span>
    </div>
  )
}

/* Parallax doodle (re-measured live at 1440/1280/768, scrollY 0/200/400, viewport 900):
   translateY = -R + 2R * (scrollY + vh - top) / (vh + h), where top/h are the wrapper's untransformed layout
   box. R = 350 (blog, quack) / 320 (news). Not clamped. No parallax below 728. */
function Para({ range, className, kind, flip = false }) {
  const ref = useRef(null)
  const md = useMedia('(min-width: 728px)')
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(false)
  useEffect(() => { const t = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(t) }, [])
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!md || reduced || !range) { el.style.transform = ''; return undefined }
    let cur = 0
    let raf = 0
    const apply = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const top = r.top + window.scrollY - cur
      const vh = window.innerHeight
      cur = -range + (2 * range * (window.scrollY + vh - top)) / (vh + el.offsetHeight)
      el.style.transform = `translateY(${cur}px)`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    // layout above the doodle can still move after mount (fonts, data): recompute when the page reflows
    const ro = new ResizeObserver(on)
    ro.observe(document.body)
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { ro.disconnect(); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf) }
  }, [md, reduced, range])
  return (
    <div ref={ref} className={`pointer-events-none absolute transition-opacity duration-300 ease-out ${shown ? 'opacity-100' : 'opacity-0'} ${className}`} aria-hidden="true">
      <Doodle kind={kind} className={`h-full w-full ${flip ? '-scale-x-100' : ''}`} />
    </div>
  )
}

/* Section-relative doodles (blog, learn). Sizes / offsets re-measured live at 1440 / 1280 / 768 / 390. */
function SectionDoodles({ variant }) {
  if (variant === 'blog') {
    return (
      <>
        <Para range={350} kind="loop" className="hidden h-[186px] w-[207px] lg:block lg:left-[calc(50%-610px)] lg:top-[-370px] xl:left-[calc(50%-785px)] xl:top-[-240px]" />
        <Para range={350} kind="wave" className="bottom-[-65px] right-[-136px] h-[99px] w-[175px] md:bottom-auto md:right-[calc(50%-470px)] md:top-[170px] lg:right-[calc(50%-680px)] lg:top-[380px] lg:h-[155px] lg:w-[272px] xl:right-[calc(50%-840px)]" />
      </>
    )
  }
  if (variant === 'learn') {
    return (
      <>
        <Doodle kind="arc" className="absolute bottom-[-30px] right-[-65px] h-[98.1px] w-[117px] -rotate-[15deg] md:right-[-70px] md:h-[142.6px] md:w-[170px] lg:bottom-0 lg:right-[-110px] lg:h-[226.6px] lg:w-[270px]" />
        <Doodle kind="circle" className="absolute left-[-30px] top-[5px] h-[67.7px] w-[75px] -rotate-[5deg] md:left-[-40px] md:top-[10px] md:h-[108.4px] md:w-[120px] md:-rotate-[10deg] lg:left-[-60px] lg:top-[70px] lg:h-[180.8px] lg:w-[200px] lg:rotate-0" />
      </>
    )
  }
  return null
}

/* Container-relative doodles (news, quack). */
function ContainerDoodles({ variant }) {
  if (variant === 'news') {
    return (
      <>
        <Para range={320} kind="loop" className="hidden h-[108.5px] w-[120px] md:block md:left-[-110px] md:top-[-400px] lg:left-[-78px] lg:top-[-350px] xl:left-[-120px] xl:top-[-280px] xl:h-[171.7px] xl:w-[190px]" />
        <Para range={320} kind="zig" className="right-[-135px] top-[-30px] h-[79.3px] w-[150px] md:bottom-[140px] md:right-[-164px] md:top-auto lg:bottom-[60px] lg:right-[-130px] xl:bottom-[160px] xl:right-[-185px] xl:h-[116.3px] xl:w-[220px]" />
      </>
    )
  }
  if (variant === 'quack') {
    return (
      <>
        <Para range={350} kind="loop" flip className="hidden h-[96px] w-[160px] md:block md:left-[-90px] md:top-[-400px] lg:top-[-180px] xl:left-[-170px] xl:h-[150px] xl:w-[214px]" />
        {/* live fit for this one: R ~313 (LG) / ~302 (MD); XL starts at 0 either way */}
        <Para range={305} kind="star" className="hidden h-[120px] w-[110px] md:block md:right-[-50px] md:top-[-110px] lg:right-0 lg:top-[240px] xl:right-[-130px] xl:h-[176.7px] xl:w-[162px]" />
      </>
    )
  }
  return null
}

export default function FeedHero({ variant, h1, lede }) {
  const v = V[variant]
  const heading = variant === 'blog'
    ? <TypedH1 text={h1} className={v.h1} />
    : <h1 className={`m-0 text-center font-mono font-normal uppercase text-ink ${v.h1}`}>{h1}</h1>
  const ledeEl = lede && (
    <p className="m-0 text-center font-sans text-ink text-lede-sm lg:text-lede">{lede}</p>
  )
  return (
    <section className={`relative overflow-x-clip ${v.section}`}>
      <SectionDoodles variant={variant} />
      <div className="container relative">
        <ContainerDoodles variant={variant} />
        {v.inner ? <div className={`relative ${v.inner}`}>{heading}{ledeEl}</div> : <div className="relative">{heading}{ledeEl}</div>}
      </div>
    </section>
  )
}
