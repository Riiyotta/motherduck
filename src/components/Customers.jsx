import { Container } from './ui'
import Cloud from './integrations/Cloud.jsx'
import CaseCard from './customers/CaseCard.jsx'

// Spec §7 Customers: sky, border-top 2px ink, overflow clip.
// Card tints (hover / active) are the measured values from the §7 table.
const TINTS = [
  ['#FDDFF6', '#FBCAF0'],
  ['#E1F1F8', '#CCE8F3'],
  ['#DEE6FF', '#C8D6FF'],
  ['#FFF7E6', '#FFF1D6'],
  ['#DAEEE8', '#C2E2D9'],
]

// 6 clouds (sizes measured; positions UNMEASURED in the spec — placed on a centred 1440 layer).
const CLOUDS = [
  { w: 313, h: 149, left: -200, top: 60 },
  { w: 337, h: 162, left: 1180, top: -40, flip: true },
  { w: 239, h: 115, left: 860, top: 120 },
  { w: 264, h: 124, left: -40, top: 520, flip: true },
  { w: 414, h: 197, left: 1120, top: 600 },
  { w: 161, h: 78, left: 980, top: 24, flip: true },
]

const SMALL_TEXT = 'm-0 font-sans text-sub'

export default function Customers() {
  return (
    <section aria-labelledby="customers-heading" className="relative overflow-clip border-t-2 border-ink bg-sky">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-full w-[1440px] -translate-x-[720px]">
        {CLOUDS.map((c, i) => (
          <Cloud
            key={i}
            fillClass="fill-cream"
            className={`absolute ${c.flip ? '-scale-x-100' : ''}`}
            style={{ left: c.left, top: c.top, width: c.w, height: c.h }}
          />
        ))}
      </div>

      <Container className="relative z-[1] flex flex-col gap-[40px] py-[48px] md:gap-[48px] md:py-[64px] xl:gap-[56px] xl:py-[80px]">
        <div className="flex flex-col gap-[8px]">
          <h2 id="customers-heading" className="m-0 font-fono text-h2-sm font-normal uppercase md:text-h2-lg xl:text-h2">
            Real customers building products
          </h2>
          <p className="m-0 font-sans text-sub">
            Production applications, customer-facing reporting, and internal tooling across industries.
          </p>
        </div>

        <div className="flex flex-col gap-[16px] md:gap-[24px] lg:gap-[32px]">
          {/* Measured intrinsic widths: row 1 = 527 / 361 (960–1301), 743.6 / 466.4 (>=1302); row 2 = 298.9 / 273.4 / 283.7
              and 410.9 / 376.6 / 390.5. Row 2 is min 220 (223 at 1280 where the copy wraps to 3 lines); cards are min 200 below 960. */}
          <div className="flex flex-col gap-[16px] md:gap-[24px] lg:h-[300px] lg:flex-row lg:gap-[32px]">
            <CaseCard href="/case-studies/together-ai-scaling-with-motherduck/" logo={[230, 55]} hoverBg={TINTS[0][0]} activeBg={TINTS[0][1]} className="lg:w-[527px] lg:shrink-0 xl:w-[743.6px]">
              <p className="m-0 font-sans text-customer-quote-sm xl:text-customer-quote">
                {'“'}The pairing with our notebook tool is fantastic. The whole analytics team works faster now.{'”'}
              </p>
            </CaseCard>
            <CaseCard href="/case-studies/finqore/" logo={[182, 54]} hoverBg={TINTS[1][0]} activeBg={TINTS[1][1]} className="lg:min-w-0 lg:flex-1">
              <div className="flex flex-col gap-[8px]">
                <p className="m-0 font-fono text-stat-sm uppercase md:text-stat-lg xl:text-stat">4h → 6m</p>
                <p className={SMALL_TEXT}>Pipeline runtime after moving all workloads to a single engine.</p>
              </div>
            </CaseCard>
          </div>
          <div className="flex flex-col gap-[16px] md:gap-[24px] lg:min-h-[220px] lg:flex-row lg:gap-[32px]">
            <CaseCard href="/case-studies/goodship-ai-transportation-analyst/" logo={[166, 27]} hoverBg={TINTS[2][0]} activeBg={TINTS[2][1]} className="min-h-[200px] lg:h-auto lg:w-[298.9px] lg:shrink-0 xl:w-[410.9px]">
              <p className={SMALL_TEXT}>An assistant that answers freight and routing questions in plain language.</p>
            </CaseCard>
            <CaseCard href="/case-studies/dosomething-non-profit-tco-cost-savings/" logo={[44, 47]} hoverBg={TINTS[3][0]} activeBg={TINTS[3][1]} className="min-h-[200px] lg:h-auto lg:w-[273.4px] lg:shrink-0 xl:w-[376.6px]">
              <p className={SMALL_TEXT}>Reporting for a large non-profit at a fraction of the earlier cost.</p>
            </CaseCard>
            <CaseCard href="/case-studies/ahead-computing-agent-first-data-platform/" logo={[230, 37]} hoverBg={TINTS[4][0]} activeBg={TINTS[4][1]} className="min-h-[200px] lg:h-auto lg:min-w-0 lg:flex-1">
              <p className={SMALL_TEXT}>A data platform built around isolated compute for every user.</p>
            </CaseCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
