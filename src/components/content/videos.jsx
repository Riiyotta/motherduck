// L5 / L6 video blocks: SandGridHero (V1), FeaturedVideo (V2), VideoCard (V3), VideoPlayerFrame (V4),
// VideoSidebar / TOC FAB (V5), FAQSection (V6), RelatedVideos (V7).
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LiftCard, OffsetButton, Placeholder, Accordion } from '../ui'
import { Reveal, PlayFrame, Icon } from './bits.jsx'
import { TocList } from './Toc.jsx'
import { useOutside } from './hooks.js'
import { title } from './lorem.js'

/* V1 index hero */
export function SandGridHero({ children }) {
  return (
    <section className="ct-sand-grid border-b-2 border-ink pb-[256px] pt-[40px] md:pb-[471px] md:pt-[70px] lg:pb-[452px] lg:pt-[96px] xl:pb-[380px] xl:pt-[90px]">
      <div className="container">
        <h1 className="mx-auto m-0 w-fit bg-sand px-[4px] text-center font-mono font-normal uppercase text-ink text-video-h1-sm md:text-video-h1-md lg:text-video-h1-lg xl:text-video-h1">{children}</h1>
      </div>
    </section>
  )
}

/* V1 detail band (holds nothing; the content container overlaps it) */
export function SandBand() {
  return <section className="ct-sand-grid border-b-2 border-ink pb-[170px] md:pb-[256px] lg:pb-[242px]" />
}

function Duration({ value, featured }) {
  return (
    <span className={`absolute bottom-0 right-0 bg-ink px-[16px] py-[8px] font-mono text-white ${featured ? 'text-duration-sm md:text-duration' : 'text-duration-sm lg:text-duration'}`}>
      {value}
    </span>
  )
}

/* V2 */
export function FeaturedVideo({ v }) {
  const to = `/videos/${v.slug}`
  return (
    <div className="pb-[52px]">
      <div className="mx-auto w-full px-[24px] md:max-w-[728px] md:px-[20px] xl:max-w-[1302px] xl:px-[30px] xl:pt-[30px]">
        <div className="mx-auto grid grid-cols-1 overflow-hidden rounded-sm border-2 border-ink bg-white md:max-w-none lg:max-w-[688px] xl:max-w-none xl:grid-cols-[45%_55%]">
          {/* live: 16:9 applies to the border-box (680.9x383 @1440, 684x384.8 @768, 338x190.1 @390) */}
          <Link to={to} className="relative block aspect-video border-b-2 border-ink xl:order-2 xl:border-b-0 xl:border-l-2">
            <Placeholder rounded="" bordered={false} label="Featured video thumbnail" className="!absolute inset-0 !h-full !w-full" />
            <Duration value={v.duration} featured />
          </Link>
          <div className="flex min-h-[312px] flex-col gap-[8px] p-[24px] md:min-h-[332px] md:gap-[16px] md:px-[24px] md:pb-[32px] md:pt-[24px] xl:order-1 xl:pb-[24px] xl:pl-[24px] xl:pr-[18px]">
            <div className="flex min-w-0 items-center gap-[8px]">
              <span className="flex shrink-0 items-center gap-[8px] rounded-sm border-2 border-ink bg-ink px-[8px] py-[4px] font-mono uppercase text-white text-kicker-chip md:px-[12px] md:py-[8px]">
                {v.date}<Icon.calendar />
              </span>
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-2 border-ink px-[8px] py-[4px] font-mono uppercase text-ink text-kicker-chip md:px-[12px] md:py-[8px]">{v.type}</span>
            </div>
            <Link to={to} className="line-clamp-3 font-mono uppercase text-ink no-underline [word-spacing:-0.05em] hover:underline text-video-feat-title-sm md:text-video-feat-title-md lg:text-video-feat-title-lg xl:text-video-feat-title">{v.title}</Link>
            <p className="m-0 mb-[16px] line-clamp-4 md:-mt-[6px] font-sans text-[14px] font-light leading-[22.4px] tracking-[0.32px] text-ink md:text-[16px] md:leading-[25.6px] xl:-mt-[8px] xl:mb-0">{v.desc}</p>
            <div className="mt-auto">
              <OffsetButton size="lg" arrow to={to} wrapperClassName="!flex w-full md:!inline-flex md:w-auto" className="w-full md:w-auto">Watch Now</OffsetButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* V3 */
export function VideoCard({ v, className = '', reveal = true }) {
  return (
    <Reveal enabled={reveal} className={`h-full ${className}`}>
      <LiftCard lift={14} as="article" innerAs={Link} to={`/videos/${v.slug}`} wrapperClassName="h-full"
        className="flex h-full flex-col rounded-sm border-2 border-ink text-ink no-underline">
        <div className="relative border-b-2 border-ink bg-cream">
          <Placeholder ratio="16 / 9" rounded="" bordered={false} label="Video thumbnail" />
          <Duration value={v.duration} />
        </div>
        <div className="flex flex-1 flex-col gap-[8px] bg-white p-[24px] md:min-h-[147px] lg:p-[32px]">
          <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] text-gray-400">{v.date}</p>
          <h3 className="m-0 font-mono font-normal uppercase text-card-title-mono-md lg:text-card-title-mono">{v.title}</h3>
          <p className="m-0 line-clamp-[7] whitespace-pre-wrap font-sans text-card-excerpt-md lg:text-card-excerpt">{v.desc}</p>
          <div className="mt-auto flex flex-wrap gap-[8px] pt-[10px]">
            {v.tags.map((t) => (
              <span key={t} className="bg-chip-gray px-[8px] py-[4px] font-mono uppercase text-video-tag-sm md:text-video-tag lg:px-[12px] lg:py-[8px]">{t}</span>
            ))}
          </div>
        </div>
      </LiftCard>
    </Reveal>
  )
}

/* V4: static placeholder frame, no iframe. SM bleeds to the viewport edges. */
export function VideoPlayerFrame() {
  return (
    <div className="w-[calc(100%+48px)] -translate-x-[24px] border-2 border-ink bg-ink md:w-full md:translate-x-0">
      <PlayFrame className="aspect-video w-full" />
    </div>
  )
}

/* V5 TryCard (XL only) */
function TryCard() {
  return (
    <div>
      <div className="relative h-[116px] overflow-hidden border-2 border-b-0 border-ink bg-yellow">
        <Placeholder label="Decorative line art" rounded="" bordered={false} className="!h-full !w-full !bg-transparent" />
      </div>
      <div className="flex flex-col items-center border-2 border-ink px-[24px] pb-[24px] pt-[20px] text-center">
        <p className="m-0 pb-[16px] font-fono text-[18px] uppercase leading-[25.2px] tracking-[calc(0.36px+0.01em)] text-ink">{title(27, 7001)}</p>
        {/* external auth destination -> non-link button */}
        <OffsetButton>Try 7 Days Free</OffsetButton>
      </div>
    </div>
  )
}

/* V5 sidebar (XL): sticky TOC box + TryCard */
export function VideoSidebar({ toc }) {
  return (
    <aside className="sticky top-[143px] hidden w-[333px] shrink-0 flex-col gap-[24px] self-start animate-sidebar-in xl:flex">
      <div className="rounded-sm border-2 border-ink bg-cream">
        <p className="m-0 px-[24px] pb-[20px] pt-[24px] font-mono uppercase text-ink text-toc-title">Table of contents</p>
        <TocList items={toc} variant="video" className="gap-[12px] pb-[16px] pl-[24px] pr-[16px]" />
      </div>
      <TryCard />
    </aside>
  )
}

/* V5 FAB (<1302): toggles the TOC popover */
export function TocFab({ toc }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutside(ref, () => setOpen(false), open)
  return (
    <div className="pointer-events-none absolute inset-0 xl:hidden">
      <div ref={ref} className="pointer-events-auto sticky top-[calc(100%-90px)] z-[2] mb-[-56px] ml-auto w-fit">
        {open && (
          <div className="absolute bottom-[calc(100%-2px)] right-0 w-[calc(100vw-48px)] max-w-[482px] rounded-sm border-2 border-ink bg-cream animate-fab-pop">
            <p className="m-0 px-[24px] pb-[20px] pt-[24px] font-mono uppercase text-ink text-toc-title">Table of contents</p>
            <TocList items={toc} variant="video" onPick={() => setOpen(false)} className="max-h-[calc(100vh-260px-40px)] gap-[12px] pb-[16px] pl-[24px] pr-[16px]" />
          </div>
        )}
        <OffsetButton variant="secondary" size="icon-60" aria-label="Table of contents" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon.list />
        </OffsetButton>
      </div>
    </div>
  )
}

/* V6 FAQ (reuses ui/Accordion). Live: every row is full-bleed (2px top border across the viewport) with the
   content in the container; a trailing empty row (90 / 74 tall incl. its border) closes the list; at SM an empty
   74px row precedes the title row, which then gets the top border. */
export function FAQSection({ items }) {
  return (
    <section className="ct-faq relative bg-cream">
      <div className="h-[74px] py-[20px] md:hidden" aria-hidden="true" />
      <div className="border-t-2 border-ink py-[20px] md:border-t-0 lg:py-[34px]">
        <div className="container">
          <h2 className="m-0 font-mono text-[24px] font-normal uppercase leading-[33.6px] text-ink md:text-[32px] md:leading-[44.8px] lg:text-[40px] lg:leading-[48px]">FAQS</h2>
        </div>
      </div>
      <Placeholder label="FAQ illustration" className="!absolute bottom-[77px] right-[calc(50%-578px)] hidden h-[231px] w-[260px] xl:flex" />
      <Accordion
        items={items}
        firstBorder
        itemClassName="py-[20px] lg:py-[26px]"
        innerClassName="container xl:[&>*]:!w-[calc(54%+230px)]"
        qClassName="mr-[8px] uppercase text-faq-q-sm md:text-faq-q-md lg:text-faq-q lg:mr-[20px]"
        aClassName="text-faq-a-sm md:text-faq-a-md lg:text-faq-a"
        chevronClassName="max-md:h-[18.9px] max-md:w-[18.9px]"
        answerClassName="max-w-[98%]"
      />
      <div className="h-[72px] lg:h-[88px]" aria-hidden="true" />
    </section>
  )
}

/* Transcript panel (on the live detail page below the body; not in the spec). Re-measured live:
   2px ink frame, header sand-chip + 2px bottom border (padding 19 24 / 16 20 <960), body max-height 220
   (640 when expanded via the chevron, max-height .3s), rows Inter 16/25.6 300 (15/24 <960) with a Mono 13
   timestamp, hover bg sand-chip .15s. Placeholder copy; COPY is a no-op button. */
export function Transcript({ lines }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="mt-[80px] overflow-hidden border-2 border-ink">
      <div className="flex items-center justify-between gap-[12px] border-b-2 border-ink bg-sand-chip px-[20px] py-[16px] lg:px-[24px] lg:py-[19px]">
        <h2 className="m-0 font-mono text-[14px] font-normal uppercase leading-[19.6px] tracking-[0.7px] text-ink lg:text-[16px] lg:leading-[19.2px] lg:tracking-[0.8px]">Transcript</h2>
        <div className="flex items-center gap-[14px]">
          <button type="button" className="cursor-pointer rounded-sm border border-sand-dark bg-transparent px-[10px] py-[5px] font-sans text-[12px] font-semibold uppercase leading-[12px] tracking-[0.48px] text-gray-600 transition-[color,border-color] duration-150 hover:border-ink hover:text-ink">Copy</button>
          <button type="button" aria-label={open ? 'Collapse transcript' : 'Expand transcript'} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex cursor-pointer border-0 bg-transparent p-0 text-ink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`transition-transform duration-200 ease-in-out ${open ? 'rotate-180' : ''}`}>
              <path d="M5 8.5 12 15.5 19 8.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-auto transition-[max-height] duration-300" style={{ maxHeight: open ? 640 : 220 }}>
        <div className="px-[20px] py-[16px] lg:px-[24px] lg:py-[20px]">
          {lines.map((l, k) => (
            <p key={k} role="button" tabIndex={0} className="m-0 flex cursor-pointer gap-[12px] border-l-2 border-transparent p-[8px] font-sans text-[15px] font-light leading-[24px] tracking-[0.3px] text-ink transition-colors duration-150 hover:bg-sand-chip lg:px-[12px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[0.32px]">
              <span className="w-[40px] shrink-0 pt-[2px] font-mono text-[13px] font-light leading-[20.8px] tracking-[0.3px] text-gray-600 lg:pt-[3px] lg:tracking-[0.32px]">{l.t}</span>
              <span>{l.text}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

/* V7 */
export function RelatedVideos({ items }) {
  return (
    <section className="border-t-2 border-ink bg-cream pb-[112px] pt-[100px] md:pb-[64px] md:pt-[80px] xl:pb-[160px]">
      <div className="container">
        <h2 className="m-0 pb-[32px] font-mono font-normal uppercase text-ink text-related-h2-sm md:pb-[40px] md:text-related-h2-md lg:text-related-h2">Related Videos</h2>
        <div className="mx-auto grid max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-2 lg:gap-[32px] xl:grid-cols-3">
          {items.map((v) => <VideoCard key={v.slug} v={v} reveal={false} />)}
        </div>
        <div className="mt-[32px] flex justify-end md:mt-[40px]">
          <OffsetButton size="lg" to="/videos">View all</OffsetButton>
        </div>
      </div>
    </section>
  )
}
