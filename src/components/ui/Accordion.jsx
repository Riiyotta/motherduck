import { useId, useLayoutEffect, useRef, useState } from 'react'

// FAQ accordion (PAGES_SPEC_COMPANY G12). Items 2..n have a 2px ink top border; the last also has a
// bottom border. Each item padding 26/0, inner padding 0/30. Button: full width, flex centre,
// transparent; question Mono 23/32.2 (margin-right 20) + 24px chevron (transform .2s, open 180deg).
// Answer: max-height 0 -> content, margin-top 0 -> 16, transition all .25s ease-in-out, overflow
// hidden. Multiple items can be open at once. No hover change.
function Chevron({ open, className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      className={`ml-auto shrink-0 transition-transform duration-200 ease-in-out ${open ? 'rotate-180' : ''} ${className}`}>
      <path d="M6 9.5 12 15.5 18 9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// Optional class overrides (all default to the company G12 values): itemClassName (padding),
// innerClassName (inner padding), qClassName (question type + margin), chevronClassName, aClassName,
// firstBorder (also give item 1 a top border, content V6). Wrapper hooks: questionClassName (the question
// <button> row: h3 + chevron), answerClassName (the collapsible answer wrapper around the aClassName div).
const DEF = { item: 'py-[26px]', inner: 'px-[30px]', q: 'mr-[20px] text-faq-q', a: 'text-faq-a' }

function Item({ q, a, index, last, cls }) {
  const [open, setOpen] = useState(false)
  const [h, setH] = useState(0)
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (!ref.current) return undefined
    const ro = new ResizeObserver(() => setH(ref.current.scrollHeight))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  const id = useId()
  return (
    <div className={`${cls.item} [transition:background_.2s] ${index > 0 || cls.firstBorder ? 'border-t-2 border-ink' : ''} ${last ? 'border-b-2 border-ink' : ''}`}>
      <div className={cls.inner}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={`flex w-full items-center border-0 bg-transparent p-0 text-left text-ink ${cls.question}`}
        >
          <h3 className={`m-0 font-mono font-normal ${cls.q}`}>{q}</h3>
          <Chevron open={open} className={cls.chevron || ''} />
        </button>
        <div
          id={id}
          className={`overflow-hidden transition-all duration-250 ease-in-out ${cls.answer}`}
          style={{ maxHeight: open ? h : 0, marginTop: open ? 16 : 0 }}
        >
          <div ref={ref} className={`font-sans text-ink ${cls.a}`}>{a}</div>
        </div>
      </div>
    </div>
  )
}

export default function Accordion({
  items, className = '', itemClassName, innerClassName, qClassName, aClassName, chevronClassName, answerClassName,
  questionClassName, firstBorder = false,
}) {
  const cls = {
    item: itemClassName ?? DEF.item,
    inner: innerClassName ?? DEF.inner,
    q: qClassName ?? DEF.q,
    a: aClassName ?? DEF.a,
    chevron: chevronClassName,
    answer: answerClassName || '',
    question: questionClassName || '',
    firstBorder,
  }
  return (
    <div className={className}>
      {items.map((it, i) => (
        <Item key={i} index={i} last={i === items.length - 1} q={it.q} a={it.a} cls={cls} />
      ))}
    </div>
  )
}
