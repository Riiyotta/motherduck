// Spec §4 Architecture section: sky, border-top 2px ink, overflow clip.
// Padding 80 0 180 (>=1302) / 80 0 88 (728-1301) / 56 0 64 (<728).
import { Container } from './ui'
import Clouds from './architecture/Clouds.jsx'
import Accordion from './architecture/Accordion.jsx'
import { DiagramDesktop, DiagramMobile } from './architecture/Diagram.jsx'
import StorageStack from './architecture/StorageStack.jsx'
import QuoteCard from './architecture/QuoteCard.jsx'

export default function Architecture() {
  return (
    <section className="relative overflow-clip border-t-2 border-ink bg-sky pb-[64px] pt-[56px] md:pb-[88px] md:pt-[80px] xl:pb-[180px]">
      <Clouds />
      <Container className="relative z-[1]">
        {/* H2 placeholder [27ch/3w], the only Mono H2 on the page */}
        <h2 className="m-0 font-mono text-h2-mono-sm font-normal uppercase text-ink md:text-h2-mono-lg xl:text-h2-mono">
          Isolated compute everywhere
        </h2>
        {/* Lede placeholder [147ch/19w] */}
        <p className="m-0 mt-[12px] max-w-lede font-sans text-lede-sm text-ink xl:text-lede">
          Analysts, pipelines and assistants each receive dedicated compute matched to their workload, while
          everybody reads one shared, consistent dataset.
        </p>

        <div className="mt-[32px] flex flex-col gap-[16px] md:gap-[64px] xl:mt-[56px] xl:flex-row xl:items-stretch xl:gap-[64px]">
          <Accordion />
          <div className="flex min-w-0 flex-1 flex-col">
            <DiagramDesktop />
            <DiagramMobile />
            <StorageStack />
          </div>
        </div>

        <QuoteCard />
      </Container>
    </section>
  )
}
