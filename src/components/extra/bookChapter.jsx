// X20 book chapter summary blocks (PAGES_SPEC_EXTRA §5 X20): sidebar (garden book panel + "Get your free book!"
// form with the focus/fill reveal), chapter chip row, and the mono INFO call-to-action admonition.
import { useLayoutEffect, useRef, useState } from 'react'
import { Placeholder, TextInput, Checkbox, OffsetButton } from '../ui'
import { Doodle } from '../company/bits.jsx'
import ArticleProse from '../content/ArticleProse.jsx'
import { chars } from '../content/lorem.js'
import '../../styles/extra-content.css'

/* XL: top of the sticky sidebar (374x210). Below XL (inline): inside the article between the CTA and the prose,
   342x235 (SM, margin 35/0/25) / full width x 270 (MD, LG, margin 52/0/28). */
export function BookPanel({ inline = false }) {
  return (
    <div className={`relative min-h-[88px] border-2 border-ink bg-garden ${inline
      ? 'mb-[25px] mt-[35px] h-[235px] md:mb-[28px] md:mt-[52px] md:h-[270px] xl:hidden'
      : 'hidden h-[210px] xl:block'}`}>
      <Placeholder kind="cover" seed={3} rounded="" bordered={false} label="Book cover"
        className="!absolute left-1/2 top-[-20.6px] h-[226.6px] w-[181.8px] -translate-x-1/2 border-2 border-ink" />
      <Doodle kind="star" size={82} className="absolute bottom-[14px] right-[18px]" />
    </div>
  )
}

export function ChapterSidebar() {
  const [email, setEmail] = useState('')
  const [focus, setFocus] = useState(false)
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(false)
  const open = focus || email.length > 0
  // reveal (measured): the block stays absolutely positioned; a spacer grows to its height (100ms ease-in-out on
  // open, 250ms on close) while the block plays its own fade/rise (250ms in, 150ms out, ease-in-out, forwards)
  const [touched, setTouched] = useState(false)
  const [h, setH] = useState(0)
  const block = useRef(null)
  useLayoutEffect(() => {
    const el = block.current
    if (!el) return undefined
    const ro = new ResizeObserver(() => setH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  if (open && !touched) setTouched(true)
  return (
    <aside className="w-full max-w-[342px] md:max-w-[500px] xl:sticky xl:top-[156px] xl:max-w-none xl:self-start">
      <BookPanel />
      <form id="page-form" className="relative border-2 border-ink bg-cream px-[24px] pb-[32px] pt-[24px] xl:border-t-0" onSubmit={(e) => e.preventDefault()}>
        <p className="m-0 pb-[30px] font-mono text-[18px] uppercase leading-[25.2px] text-ink">Get your free book!</p>
        <TextInput label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        {/* Hidden until the field is focused or filled (extra-content.css .xc-reveal). */}
        {/* measured: block 27 below the field; the two consents 10 apart (16, labels 14/19.6 <728), 26 to the button; the room it opens is
            154 (block height - 10: the button overhangs the room by 10 into the form's 32 bottom padding) */}
        <div ref={block} className="xc-reveal flex flex-col gap-[26px] pt-[27px]" data-state={open ? 'open' : touched ? 'closed' : undefined} aria-hidden={!open}>
          <div className="flex flex-col gap-[16px] max-md:[&_label]:leading-[19.6px] md:gap-[10px]">
            <Checkbox variant="solid" size="sm" checked={c1} onChange={(e) => setC1(e.target.checked)} label="Subscribe to MotherDuck news" tabIndex={open ? 0 : -1} />
            <Checkbox variant="solid" size="sm" checked={c2} onChange={(e) => setC2(e.target.checked)} label={chars(40, 7401).replace(/\.$/, '')} tabIndex={open ? 0 : -1} />
          </div>
          <div><OffsetButton size="lg" type="submit" disabled disabledStyle tabIndex={open ? 0 : -1}>Download Book</OffsetButton></div>
        </div>
        <div aria-hidden="true" className="xc-reveal-space" style={{ height: open ? Math.max(0, h - 10) : 0 }} data-open={open || undefined} />
      </form>
    </aside>
  )
}

export function ChapterHeader({ n, readMin }) {
  return (
    <div className="flex items-center">
      <span className="bg-ink px-[15px] py-[12px] font-mono text-[16px] uppercase leading-[22.4px] text-white md:px-[24px] md:text-[18px] md:leading-[25.2px] lg:text-[24px] lg:leading-[33.6px]">Chapter {n}</span>
      <span className="ml-[16px] font-sans text-[16px] leading-[22.4px] text-ink opacity-60">{readMin} min read</span>
    </div>
  )
}

/* Below XL: fixed bottom bar (padding 14 24, right-aligned) with a md OffsetButton that jumps to the form. */
export function ReadEbookBar() {
  const go = () => {
    const el = document.getElementById('page-form')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: 'auto' })
  }
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] flex justify-end px-[24px] py-[14px] xl:hidden">
      <OffsetButton wrapperClassName="pointer-events-auto" onClick={go}>
        Read the ebook
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="-my-[2px] shrink-0">
          <path d="M10 3v13M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </OffsetButton>
    </div>
  )
}

/* INFO admonition with a Mono body: text + italic Mono book title + "Download the complete book" link. */
export function ChapterCta({ cta }) {
  const blocks = [{
    type: 'admon', kind: 'info', mono: true, title: '',
    children: [{ type: 'p', inl: [`${cta.before} `, { t: 'em', c: cta.book }, '. ', { t: 'a', c: cta.link, href: '/duckdb-book-brief' }, '.'] }],
  }]
  return <ArticleProse blocks={blocks} className="xc-cta" />
}
