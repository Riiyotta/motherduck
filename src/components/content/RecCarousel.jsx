// B1 Read-next carousel: 1-slide viewport, loop clone first, 0.2s slide, autoplay 8s (paused on hover), dots,
// 44x44 secondary arrows at XL only. Reduced motion: no autoplay, no slide transition.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { OffsetButton, Placeholder, ArrowRight } from '../ui'
import { useInterval, usePrefersReducedMotion, internalPath } from './hooks.js'

function Slide({ s }) {
  const to = internalPath(s.href)
  const Tag = to ? Link : 'div'
  return (
    <Tag {...(to ? { to } : {})} className="block w-full shrink-0 text-ink no-underline" aria-hidden={s.clone || undefined} tabIndex={s.clone ? -1 : undefined}>
      <Placeholder ratio="16 / 9" bordered={false} rounded="" label="Read next image" className="!bg-white" />
      <div className="flex flex-col items-start gap-[8px] p-[16px] xl:p-[20px]">
        <span className="rounded-sm border-2 border-sand-dark bg-cream px-[11px] py-[3px] font-mono uppercase text-rec-chip-lg md:px-[10px] md:py-[2px] md:text-rec-chip-md lg:px-[11px] lg:py-[3px] lg:text-rec-chip-lg xl:px-[12px] xl:py-[4px] xl:text-rec-chip">
          {s.chip}
        </span>
        <p className="m-0 line-clamp-3 font-fono uppercase text-rec-title-lg md:text-rec-title-md lg:text-rec-title-lg xl:text-rec-title">{s.title}</p>
      </div>
    </Tag>
  )
}

export default function RecCarousel({ slides }) {
  const n = slides.length
  const reduced = usePrefersReducedMotion()
  const [idx, setIdx] = useState(1)
  const [anim, setAnim] = useState(true)
  const [hover, setHover] = useState(false)
  const go = (d) => { setAnim(!reduced); setIdx((i) => i + d) }
  useInterval(() => go(1), 8000, !hover && !reduced)
  const onEnd = () => {
    if (idx === n + 1) { setAnim(false); setIdx(1) }
    if (idx === 0) { setAnim(false); setIdx(n) }
  }
  // reduced motion: wrap immediately (no transitionend fires)
  if (reduced && (idx === n + 1 || idx === 0)) setIdx(idx === 0 ? n : 1)
  const track = [{ ...slides[n - 1], clone: true }, ...slides, { ...slides[0], clone: true }]
  const real = ((idx - 1 + n) % n)
  return (
    <div className="mx-auto mb-[42px] w-full max-w-[400px] md:mx-0 md:mb-0" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <p className="m-0 mb-[16px] font-fono text-[20px] uppercase leading-[28px] tracking-[calc(0.4px+0.01em)] text-ink md:hidden">Read Next</p>
      <div className="relative">
        <div className="overflow-hidden rounded-sm border-2 border-ink bg-white">
          <div
            className="flex"
            style={{ transform: `translateX(-${idx * 100}%)`, transition: anim ? 'transform 0.2s' : 'none' }}
            onTransitionEnd={onEnd}
          >
            {track.map((s, i) => <Slide key={i} s={s} />)}
          </div>
        </div>
        <div className="absolute left-[-24px] top-[70px] z-[1] hidden xl:block">
          <OffsetButton variant="secondary" size="icon-44" aria-label="Previous" onClick={() => go(-1)}><ArrowRight className="rotate-180" /></OffsetButton>
        </div>
        <div className="absolute right-[-24px] top-[70px] z-[1] hidden xl:block">
          <OffsetButton variant="secondary" size="icon-44" aria-label="Next" onClick={() => go(1)}><ArrowRight /></OffsetButton>
        </div>
      </div>
      {/* gap box -> dots UNMEASURED (16) */}
      <div className="mt-[16px] flex items-center justify-center gap-[24px] xl:gap-[32px]">
        {slides.map((_, i) => (
          <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => { setAnim(!reduced); setIdx(i + 1) }}
            className={`rounded-full border-0 bg-ink p-0 ${i === real ? 'h-[16px] w-[16px]' : 'h-[8px] w-[8px]'}`} />
        ))}
      </div>
    </div>
  )
}
