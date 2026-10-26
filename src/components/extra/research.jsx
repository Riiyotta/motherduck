// X11 research paper blocks (PAGES_SPEC_EXTRA §5 X11): hero (back link, H1, date + authors), XL sticky sidebar
// (TOC box + paper card), static TOC box below 1302 and the floating "View Paper" button (X7 FAB pattern).
import { Container, OffsetButton, Placeholder, UnderlineLink } from '../ui'
import { TocList } from '../content/Toc.jsx'
import '../../styles/extra-content.css'

export function ResearchHero({ p }) {
  return (
    <section className="pt-[44px] md:pt-[64px] lg:pt-[72px] xl:pt-[80px]">
      <Container>
        <UnderlineLink to="/research" icon="left" uppercase className="flex-row-reverse">Back to research</UnderlineLink>
        <h1 className="xc-mono xc-research-h1 m-0 pb-[16px] pt-[24px] text-ink md:py-[32px]">{p.title}</h1>
        <div className="flex flex-col gap-[8px] xl:max-w-[816px]">
          <p className="m-0 font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] text-gray-500">{p.date}</p>
          <div className="flex gap-[8px] font-sans text-[16px] leading-[22.4px] tracking-[0.32px] text-ink">
            <span className="shrink-0">By</span>
            <span>{p.authors}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function TocBox({ toc, className = '' }) {
  return (
    <div className={`rounded-sm border-2 border-ink bg-cream ${className}`}>
      <p className="m-0 px-[24px] pb-[20px] pt-[24px] font-mono uppercase text-ink text-toc-title">Table of contents</p>
      <TocList items={toc} variant="video" className="gap-[12px] pb-[16px] pl-[24px] pr-[16px]" />
    </div>
  )
}

/* Paper card: teal panel (grid pattern, mascot overflowing 18 above) + box with the "View Paper" button. */
export function PaperCard() {
  return (
    <div>
      <div className="xc-grid-bg relative h-[116px] border-2 border-b-0 border-ink bg-teal-bright">
        <Placeholder kind="mascot" seed={2} rounded="" bordered={false} label="Mascot illustration"
          className="!absolute left-1/2 top-[-18px] h-[132px] w-[145px] -translate-x-1/2" />
      </div>
      <div className="flex flex-col items-center border-2 border-ink px-[24px] pb-[24px] pt-[20px] text-center">
        <p className="m-0 pb-[20px] font-fono text-[18px] uppercase leading-[25.2px] tracking-[calc(0.36px+0.01em)] text-ink">Get the full document</p>
        {/* external PDF -> non-link button */}
        <OffsetButton>View Paper</OffsetButton>
      </div>
    </div>
  )
}

export function ResearchSidebar({ toc }) {
  return (
    <aside className="sticky top-[148px] ml-[93px] hidden w-[333px] shrink-0 flex-col gap-[24px] self-start xl:flex">
      <TocBox toc={toc} />
      <PaperCard />
    </aside>
  )
}

/* <1302: floating "View Paper" (sticky near the viewport bottom over the article at LG/MD; a block after it at SM).
   Exact sticky offsets are UNMEASURED on the original; this follows the X7 TOC FAB geometry. */
export function ViewPaperFab() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 hidden md:block xl:hidden">
        <div className="pointer-events-auto sticky top-[calc(100%-90px)] z-[2] mb-[-43.8px] ml-auto w-fit">
          <OffsetButton>View Paper</OffsetButton>
        </div>
      </div>
      <div className="md:hidden"><OffsetButton>View Paper</OffsetButton></div>
    </>
  )
}
