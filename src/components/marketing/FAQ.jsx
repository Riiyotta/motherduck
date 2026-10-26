import { useId, useLayoutEffect, useRef, useState } from 'react'
import { Container, Placeholder } from '../ui'
import { Chevron, InlineLink } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// §3 B9 FAQ (new; the homepage Accordion is single-open card styling). Multiple items may be open.
// Chevron rotates 180° (.2s ease-in-out); answer max-height 0 -> content (all .25s ease-in-out);
// row background .2s (no visible change measured). Nothing open by default.

// Placeholder items: question 8–14 words; answer paragraph, with a list / inline code / link on some.
// `lens` ({ q: [chars...], a: [chars...] }) sizes each question / answer to the original's character count.
export function faqItems(n, seed = 1, link, lens) {
  const count = lens?.q ? lens.q.length : n
  return Array.from({ length: count }, (_, i) => ({
    q: lens?.q ? `${fitTitle(lens.q[i] - 1, seed * 31 + i)}?` : `${title(7 + ((i * 3) % 6), seed * 31 + i)}?`,
    a: lens?.a?.[i] ? fit(lens.a[i], seed * 53 + i) : text(38 + ((i * 7) % 24), seed * 53 + i),
    list: i % 4 === 1 ? [0, 1, 2].map((k) => [title(2, seed + i + k), text(10, seed * 7 + i + k)]) : null,
    code: i % 5 === 3 ? 'SELECT 1' : null,
    link: i === 2 && link ? link : null,
  }))
}

function Answer({ it }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <p className="m-0">
        {it.a}
        {it.code && (
          <>
            {' '}
            <code className="rounded-code bg-[rgba(56,56,56,0.08)] px-[4px] py-[2px] font-code text-code-inline">{it.code}</code>
          </>
        )}
        {it.link && (
          <>
            {' '}
            <InlineLink to={it.link}>{title(3, 99)}</InlineLink>.
          </>
        )}
      </p>
      {it.list && (
        <ul className="m-0 flex flex-col p-0">
          {it.list.map(([s, b], k) => (
            <li key={k} className="ml-[24px] pl-[4px] font-sans text-body-md text-ink">
              <strong className="text-[18px] font-bold">{s}:</strong> {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Item({ it, last, rowPad, qType, inner, full, qMax = '', fullMr = 'md:mr-[164px] lg:mr-[300px] xl:mr-[341.3px]' }) {
  const [open, setOpen] = useState(false)
  const [h, setH] = useState(0)
  const ref = useRef(null)
  const id = useId()
  useLayoutEffect(() => {
    if (!ref.current) return undefined
    const ro = new ResizeObserver(() => setH(ref.current.scrollHeight))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  const body = (
    <div className={full ? fullMr : `${inner} ${qMax}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center border-0 bg-transparent p-0 text-left text-ink"
      >
        <h3 className={`m-0 mr-[8px] font-mono font-normal uppercase lg:mr-[20px] ${qType}`}>{it.q}</h3>
        <Chevron open={open} className="!h-[20px] !w-auto !shrink md:!h-[24px]" />
      </button>
      <div
        id={id}
        role="region"
        className="max-w-[98%] overflow-hidden transition-all duration-250 ease-in-out"
        style={{ maxHeight: open ? h : 0 }}
      >
        <div ref={ref} className="pt-[16px] font-sans text-[14px] font-light leading-[21px] tracking-[0.28px] text-ink md:text-[15px] md:leading-[22.5px] md:tracking-[0.3px] lg:text-faq-a">
          <Answer it={it} />
        </div>
      </div>
    </div>
  )
  return (
    <div className={`border-t-2 border-ink [transition:background_.2s_ease-in-out] ${last ? 'border-b-2' : ''} ${rowPad}`}>
      {full ? <Container>{body}</Container> : body}
    </div>
  )
}

// Contained variants (measured @1440 / 768 / 390). `spacer`: the empty 74px row <728 (as in `full`);
// `firstRule`: 'always' | 'sm' (first item's top rule only <728).
const CONTAINED = {
  flights: {
    wrap: 'pb-[100px] pt-[20px]', inner: 'px-[24px] md:px-[20px] lg:px-[24px] xl:px-[80px]', title: 'text-center', spacer: true, firstRule: 'always',
    q: 'text-faq-q-sm md:text-faq-q-md lg:text-faq-q xl:text-faq-q-lg', row: 'py-[20px] lg:py-[28px]', head: 'py-[20px] lg:py-[34px]',
    h2: 'text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono',
  },
  guides: {
    wrap: 'pb-[40px] pt-[10px]', inner: 'px-[24px] md:px-[20px] lg:px-[24px] xl:px-[80px]', title: 'text-center', spacer: true, firstRule: 'always',
    q: 'text-faq-q-sm md:text-faq-q-md lg:text-faq-q xl:text-faq-q-lg', row: 'py-[20px] lg:py-[28px]', head: 'py-[20px] lg:py-[34px]',
    h2: 'text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono',
  },
  hypertenancy: {
    wrap: 'pb-[40px]', inner: 'px-[24px] md:px-[20px] xl:px-[72px]', title: 'text-left', firstRule: 'sm',
    q: 'text-faq-q-sm md:text-faq-q-md lg:text-faq-q', row: 'py-[20px] lg:py-[26px]', head: 'py-[20px] lg:py-[34px]',
    h2: 'text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono',
  },
  // dives: the section itself is the box (full width <1302 with 40 / 24 side padding, 1028 >=1302)
  dives: {
    wrap: '', inner: 'px-[24px] md:px-[20px] xl:px-[30px]', title: 'text-center', firstRule: 'sm',
    q: 'text-faq-q-sm md:text-faq-q-md lg:text-faq-q', row: 'py-[20px] lg:py-[26px]', head: 'py-[20px] lg:py-[34px]',
    h2: 'text-[20px] leading-[24px] md:text-h2-mono-md lg:text-h2-mono-lg',
  },
}

// `tail` (startups): question column only narrowed >=1302, plus an empty trailing ruled row
// (min-height 74px, 90px >=960) after the last item, as measured on the original.
export default function FAQ({ items, variant = 'full', borderTop = false, decor = true, tail = false, fullMr }) {
  if (variant === 'full') {
    return (
      <section className={`relative bg-cream ${borderTop ? 'px-[24px] md:px-[40px] xl:border-t-2 xl:border-ink xl:px-0' : ''}`}>
        <div aria-hidden="true" className="h-[74px] md:hidden" />
        <Container className="border-t-2 border-ink py-[20px] md:border-t-0 lg:py-[34px]">
          <h2 className="m-0 font-mono font-normal uppercase text-ink text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono">FAQS</h2>
        </Container>
        {items.map((it, i) => (
          <Item key={i} it={it} last={!tail && i === items.length - 1} full rowPad="py-[20px] lg:py-[26px]" qType="text-faq-q-sm md:text-faq-q-md lg:text-faq-q"
            fullMr={fullMr || (tail ? 'xl:mr-[341.3px]' : undefined)} />
        ))}
        {tail && <div aria-hidden="true" className="min-h-[74px] border-y-2 border-ink lg:min-h-[90px]" />}
        {decor && (
          <Placeholder width={260} height={231} label="Decorative illustration" className={`pointer-events-none !absolute right-[142px] hidden xl:flex ${tail ? 'bottom-[77px]' : 'bottom-0'}`} />
        )}
      </section>
    )
  }
  const v = CONTAINED[variant]
  const rows = (
    <>
      {v.spacer && <div aria-hidden="true" className="h-[74px] md:hidden" />}
      <div className={`${v.head} ${v.inner} ${v.spacer ? 'border-t-2 border-ink md:border-t-0' : ''}`}>
        <h2 className={`m-0 font-mono font-normal uppercase text-ink ${v.h2} ${v.title}`}>FAQS</h2>
      </div>
      {items.map((it, i) => (
        <Item
          key={i}
          it={it}
          last={i === items.length - 1}
          inner={v.inner}
          rowPad={`${v.row} ${i === 0 && v.firstRule === 'sm' ? 'md:!border-t-0' : ''}`}
          qType={v.q}
        />
      ))}
    </>
  )
  if (variant === 'dives') {
    return (
      <section className="mx-auto w-full bg-cream px-[24px] md:px-[40px] md:pt-[20px] xl:max-w-[1028px] xl:px-0 xl:py-[20px]">
        {rows}
      </section>
    )
  }
  return (
    <div className="bg-cream">
      <Container>
        <section className={`mx-auto max-w-[1028px] ${v.wrap}`}>{rows}</section>
      </Container>
    </div>
  )
}
