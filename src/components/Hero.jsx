// Spec §3 Hero, control variant (cream, overflow clip, 652 tall @1440).
// Container padding 48 30 64 (>=1302) / 48 20 64 (960-1301) / 32 20 48 (728-959) / 32 24 48 (<728);
// horizontal padding comes from Container. Row: column gap 40 below 1302, row gap 80 + height 540 at >=1302.
import { Container, OffsetButton } from './ui'
import LogoStrip from './hero/LogoStrip.jsx'
import ProductSim from './hero/ProductSim.jsx'

// Neutral 14x14 agent glyphs + copy icon (generic shapes, not third-party marks)
const Glyph = ({ shape }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-ink">
    {shape === 0 && <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />}
    {shape === 1 && <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />}
    {shape === 2 && <path d="M7 1.5 12.5 12h-11z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />}
  </svg>
)
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-ink">
    <rect x="4.5" y="4.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M9.5 2.5V1.5h-8v8h1" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

export default function Hero() {
  return (
    <section className="relative overflow-clip bg-cream">
      <Container className="flex flex-col gap-[48px] pb-[48px] pt-[32px] lg:pb-[64px] lg:pt-[48px]">
        <div className="flex flex-col items-start gap-[40px] xl:h-[540px] xl:flex-row xl:items-center xl:gap-[80px]">
          {/* Left column */}
          <div className="flex w-full flex-col gap-[24px] md:gap-[32px] xl:max-w-[560px] xl:gap-[40px]">
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[20px]">
                {/* H1 placeholder [31ch/5w] */}
                <h1 className="m-0 font-fono text-h1-sm font-normal uppercase text-ink md:text-h1-md lg:text-h1">
                  Analytics that grows with teams
                </h1>
                {/* Lede placeholder [166ch/30w] */}
                <p className="m-0 font-sans text-lede-hero-sm text-ink md:text-lede-hero">
                  Northwind Data is a compact cloud warehouse for teams and all their tools. Load files, run quick
                  queries, and share each result without managing a server or a cluster.
                </p>
              </div>

              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col items-stretch gap-[8px] md:flex-row md:flex-wrap md:items-start md:gap-[16px]">
                  {/* Original target is the auth signup flow -> non-link button */}
                  <OffsetButton variant="primary" arrow className="w-full">
                    TRY 7 DAYS FREE
                  </OffsetButton>
                  <OffsetButton variant="secondary" to="/contact-us/product-expert" className="w-full">
                    BOOK A DEMO
                  </OffsetButton>
                </div>
                <div className="flex flex-wrap items-center gap-[8px]">
                  {/* Label placeholder [32ch/6w]; Inter 12/16 "500" renders 400 */}
                  <span className="font-sans text-[12px] font-normal leading-[16px] text-gray-600">
                    Using agents? Start with this one
                  </span>
                  {/* COPY PROMPT: click behaviour (clipboard + feedback) UNMEASURED -> no-op */}
                  <button
                    type="button"
                    className="group -m-[2px] flex items-center gap-[6px] rounded-sm bg-transparent p-[2px]"
                  >
                    <span className="flex items-center gap-[5px]">
                      <Glyph shape={0} />
                      <Glyph shape={1} />
                      <Glyph shape={2} />
                    </span>
                    <span className="font-sans text-[12px] font-normal uppercase leading-[12px] text-ink underline-offset-[0.2em] group-hover:underline">
                      COPY PROMPT
                    </span>
                    <CopyIcon />
                  </button>
                </div>
              </div>
            </div>

            <LogoStrip />
          </div>

          {/* Right column */}
          <ProductSim />
        </div>
      </Container>
    </section>
  )
}
