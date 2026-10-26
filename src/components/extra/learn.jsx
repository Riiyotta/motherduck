// X7 learn article blocks (PAGES_SPEC_EXTRA §5 X7): sand hero (title + icon), XL sidebar (TOC box + cream
// "Start" card; the VideoDetail TryCard swapped out), and the Start card used at the article end below 1302.
import { Container, OffsetButton, UnderlineLink } from '../ui'
import { BackLink } from '../content/bits.jsx'
import { TocList } from '../content/Toc.jsx'
import { HouseSpot } from '../ui/art/scenes.jsx'
import '../../styles/extra-content.css'

export function LearnHero({ a }) {
  return (
    <section className="border-b-2 border-ink bg-sand-chip pb-[40px] pt-[64px] md:pb-[48px] xl:pb-[75px] xl:pt-[80px]">
      <Container>
        <div className="grid grid-cols-[246px_76px] gap-[20px] md:grid-cols-[568px_100px] lg:grid-cols-[760px_120px] lg:gap-[40px] xl:grid-cols-[815px_333px] xl:gap-[94px]">
          <div className="flex min-w-0 flex-col gap-[8px]">
            <BackLink to="/learn">BACK TO LEARN</BackLink>
            <h1 className="xc-mono xc-learn-h1 m-0 pb-[8px] pt-[16px] text-ink">{a.title}</h1>
            <span className="font-sans text-[14px] leading-[14px] text-ink opacity-60">
              {a.readMin} min read · Last updated <time>{a.updated}</time>
            </span>
            {a.authors.length > 0 && (
              <span className="flex gap-[8px]">
                <span className="pt-[2px] font-sans text-[16px] uppercase leading-[19.2px]">BY</span>
                <span className="flex flex-wrap gap-x-[5px] gap-y-[4px]">
                  {a.authors.map((au) => (
                    <UnderlineLink key={au.slug} to={`/authors/${au.slug}`} icon={null} uppercase className="!border-0" labelClassName="!mb-0 !pb-0 !pt-[1px]">{au.name}</UnderlineLink>
                  ))}
                </span>
              </span>
            )}
          </div>
          <div className="h-[76px] w-[76px] self-center md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px] xl:h-[192px] xl:w-[192px]" role="img" aria-label="Topic icon">
            <HouseSpot variant={a.icon} />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* Cream "Start" card: XL sidebar (padding 30 60, gap 24) / article end below 1302 (gap 16; padding 30 at SM). */
export function StartCard({ inline = false }) {
  return (
    <div className={`flex w-full max-w-[404px] flex-col items-center border-2 border-ink bg-cream py-[30px] ${inline ? 'mx-auto gap-[16px] px-[30px] md:px-[60px]' : 'gap-[24px] px-[60px]'}`}>
      <p className="m-0 text-center font-mono text-[16px] font-light uppercase leading-[22.4px] tracking-[0.32px] text-ink">Start using MotherDuck now!</p>
      {/* external auth destination -> non-link button */}
      <OffsetButton size="lg">Try 7 Days Free</OffsetButton>
    </div>
  )
}

// No entrance animation: the original's /learn/:slug sidebar renders with animation none (measured from load).
export function LearnSidebar({ toc }) {
  return (
    <aside className="sticky top-[143px] hidden w-[333px] shrink-0 flex-col gap-[24px] self-start xl:flex">
      <div className="rounded-sm border-2 border-ink bg-cream">
        <p className="m-0 px-[24px] pb-[20px] pt-[24px] font-mono uppercase text-ink text-toc-title">Table of contents</p>
        <TocList items={toc} variant="video" className="gap-[12px] pb-[16px] pl-[24px] pr-[16px]" />
      </div>
      <StartCard />
    </aside>
  )
}
