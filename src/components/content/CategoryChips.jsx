// C3 CategoryChips (case index, videos, ecosystem). Chips are <Link>s to ?category=<Label>; active chip ink.
// Row scrolls horizontally when it does not wrap; 40px cream edge fades show only while scrollable.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const chipClass = (active) =>
  `inline-flex shrink-0 items-center rounded-sm px-[12px] py-[11.5px] font-sans text-button uppercase no-underline transition-[background,color] duration-[100ms] ease-in-out lg:px-[20px] lg:py-[15.5px] ${
    active ? 'bg-ink text-cream hover:bg-ink' : 'bg-sand-chip text-ink hover:bg-sand-dark'
  }`

export default function CategoryChips({ labels, active = 'All', hrefFor, onPick, className = '' }) {
  const ref = useRef(null)
  const [fade, setFade] = useState({ l: false, r: false })
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const on = () => setFade({ l: el.scrollLeft > 0, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 })
    on()
    el.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { el.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  return (
    <div className={`ct-chiprow ${className}`} data-fade-l={fade.l} data-fade-r={fade.r}>
      <div ref={ref} className="ct-noscroll flex flex-wrap gap-[8px] overflow-x-auto bg-cream lg:gap-[12px]">
        {labels.map((l) => (
          <Link key={l} to={hrefFor(l)} preventScrollReset onClick={() => onPick?.(l)} className={chipClass(l === active)} aria-current={l === active ? 'true' : undefined}>
            {l}
          </Link>
        ))}
      </div>
    </div>
  )
}
