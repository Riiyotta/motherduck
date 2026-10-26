import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './bits.jsx'

// §3 B2 MarqueeBand. Full-bleed strip, 2px ink border top/bottom, N copies of the label; the last copy
// is the semantic <h2>. Motion: scroll-linked translateX, +0.32px per px scrolled (moves right while
// scrolling down). `still` = static band (/product "Use Cases": no movement measured).
const SIZES = {
  vs: { type: 'text-marquee-sm md:text-marquee-alt xl:text-marquee', gap: 'mx-[50px]' },
  persona: { type: 'text-marquee-sm lg:text-marquee-alt', gap: 'mx-[46px] lg:mx-[70px]' },
  product: { type: 'text-marquee-sm lg:text-marquee-alt', gap: 'mx-[60px]' },
}

export default function MarqueeBand({ label, copies = 9, bg = 'bg-yellow', size = 'vs', still = false, borderBottom = true, className = '' }) {
  const track = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const el = track.current
    if (!el || still || reduced) {
      if (el) el.style.transform = ''
      return undefined
    }
    let raf = 0
    // Measured on the original: the band-wide track is translated by -10% .. +10% of its own width as the
    // band's top travels from the viewport bottom to the viewport top (clamped). At 1440×900 that is the
    // spec's +0.32 px per scrolled px (0.2 × width / viewport height).
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const top = el.parentElement.getBoundingClientRect().top
      const p = Math.min(1, Math.max(0, (vh - top) / vh))
      el.style.transform = `translate3d(${(-10 + 20 * p).toFixed(4)}%, 0, 0)`
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
  }, [still, reduced])
  const s = SIZES[size]
  return (
    <div className={`relative overflow-hidden border-t-2 border-ink ${borderBottom ? 'border-b-2' : ''} ${bg} ${className}`}>
      <div ref={track} className="flex w-full items-center justify-center whitespace-nowrap will-change-transform">
        {Array.from({ length: copies }, (_, i) => {
          const last = i === copies - 1
          const Tag = last ? 'h2' : 'span'
          return (
            <Tag
              key={i}
              aria-hidden={last ? undefined : true}
              className={`m-0 shrink-0 py-[16px] font-mono font-normal uppercase text-ink ${s.type} ${s.gap}`}
            >
              {label}
            </Tag>
          )
        })}
      </div>
    </div>
  )
}
