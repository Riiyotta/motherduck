// Architecture accordion (spec §4 "Accordion"): single-open, click toggles, item 1 open by default,
// no auto-advance. Card transition background-color, box-shadow 200ms; body max-height 250ms.
import { useLayoutEffect, useRef, useState } from 'react'

// Placeholder copy: titles ~19-24ch, bodies ~120-151ch
const ITEMS = [
  {
    title: 'DEDICATED COMPUTE UNITS',
    body: 'Every person, every report and every job gets its own engine, so one heavy query never slows down the rest of the team.',
  },
  {
    title: 'SCALES TO ZERO WHEN IDLE',
    body: 'Engines start in a moment when a query arrives and stop again as soon as the work is done, so quiet hours and weekends cost you close to nothing.',
  },
  {
    title: 'ONE COPY OF YOUR DATA',
    body: 'All engines read the same tables from shared storage, which keeps results consistent without copying files across separate systems.',
  },
  {
    title: 'OPEN STORAGE FORMATS',
    body: 'Tables are stored in open file formats on object storage, so other tools can read them directly and your data is never locked into one vendor.',
  },
]

function Item({ i, title, body, open, onToggle }) {
  const bodyRef = useRef(null)
  const [h, setH] = useState(null)
  useLayoutEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const measure = () => setH(el.scrollHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el.firstElementChild)
    return () => ro.disconnect()
  }, [])
  return (
    <div
      className={`rounded-sm border-2 border-ink transition-[background-color,box-shadow] duration-200 ease-in-out ${
        open ? 'bg-white shadow-hard-4' : 'bg-surface-2 shadow-none'
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={`arch-acc-btn-${i}`}
          aria-expanded={open}
          aria-controls={`arch-acc-panel-${i}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-[12px] bg-transparent px-[12px] py-[24px] text-left text-ink xl:px-[24px]"
        >
          <span className="font-mono text-accordion-title-sm font-normal uppercase xl:text-accordion-title">{title}</span>
          <span aria-hidden="true" className="font-mono text-[20px] leading-[20px]">
            {open ? '-' : '+'}
          </span>
        </button>
      </h3>
      <div
        ref={bodyRef}
        id={`arch-acc-panel-${i}`}
        role="region"
        aria-labelledby={`arch-acc-btn-${i}`}
        className="overflow-hidden transition-[max-height] duration-250 ease-in-out"
        style={{ maxHeight: open ? (h ?? 'none') : 0 }}
      >
        <p className="m-0 px-[24px] pb-[24px] font-sans text-accordion-body text-ink">{body}</p>
      </div>
    </div>
  )
}

export default function Accordion() {
  const [open, setOpen] = useState(0)
  // Measured <728: the accordion column is 26px taller than its items (diagram starts 42px below)
  return (
    <div className="flex flex-col gap-[16px] max-md:pb-[26px] xl:w-[400px] xl:shrink-0">
      {ITEMS.map((it, i) => (
        <Item key={i} i={i} {...it} open={open === i} onToggle={() => setOpen((o) => (o === i ? null : i))} />
      ))}
    </div>
  )
}
