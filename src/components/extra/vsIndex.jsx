// X15 /vs comparisons index (PAGES_SPEC_EXTRA §6): new centred hero + MarqueeBand (reused) + the B8 CompareCards
// card grid with all six comparisons. The card markup repeats marketing/vs.jsx CompareCards classes (that component
// filters the current page out and carries its own "more comparisons" marquee, so it is composed here instead).
import { Link, useNavigate } from 'react-router-dom'
import { Container, LiftCard, Placeholder } from '../ui'
import { Btn, TextLink } from '../marketing/bits.jsx'
import { COMPETITORS, fit } from '../marketing/copy.js'
import MarqueeBand from '../marketing/MarqueeBand.jsx'
import { words } from './generic.jsx'

export function VsIndexHero() {
  return (
    <div className="relative overflow-hidden border-b-2 border-sand-dark">
      <Container className="relative flex flex-col items-center gap-[32px] !px-[24px] pb-[195px] pt-[24px] md:!px-[20px] md:pb-[182px] md:pt-[32px] xl:!px-[30px] xl:pb-[120px] xl:pt-[100px]">
        <div className="flex max-w-[1028px] flex-col items-center gap-[16px] text-center lg:gap-[20px] xl:max-w-[1028px] max-xl:max-w-[688px]">
          <h1 className="m-0 font-mono text-[28px] font-normal uppercase leading-[33.6px] text-ink md:text-[36px] md:leading-[43.2px] xl:text-[56px] xl:leading-[67.2px]">How our platform stacks up</h1>
          <p className="m-0 font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] text-ink xl:text-[20px] xl:leading-[32px] xl:tracking-[0.4px]">{words(141, 5125)}</p>
        </div>
        <div className="relative z-[1] flex flex-col items-center gap-[12px] md:flex-row md:gap-[24px]">
          {/* sign-up is an auth URL -> non-link button */}
          <Btn variant="primary">Try it free</Btn>
          <Btn variant="secondary" to="/contact-us/product-expert">Get a demo</Btn>
        </div>
      </Container>
      <Placeholder label="Comparison illustration" className="!absolute bottom-[-90px] left-1/2 h-[257.8px] w-[250px] -translate-x-1/2 md:left-auto md:right-[calc(50%-364px)] md:translate-x-0 lg:right-[calc(50%-480px)] xl:bottom-[-80px] xl:right-[calc(50%-501px)]" />
    </div>
  )
}

// measured card order on the original (01-06) and body lengths
const ORDER = [['snowflake', 230], ['redshift', 273], ['postgresql', 267, 1], ['bigquery', 309], ['databricks', 191, 1], ['clickhouse', 222, 1]]

export function AllComparisons() {
  const navigate = useNavigate()
  return (
    <section id="motherduck-vs-competitors" className="pb-[80px] pt-[64px] md:pb-[92px] xl:pb-[64px]">
      <Container className="flex flex-col gap-[40px] md:gap-[64px]">
        <h2 className="m-0 text-center font-mono font-normal uppercase text-ink text-h2-mono-tall-sm lg:text-h2-mono-md xl:text-left xl:text-h2-mono-lg">Choose a comparison</h2>
        <div className="grid grid-cols-1 justify-center gap-[24px] md:grid-cols-[repeat(2,328px)] md:gap-[32px] lg:grid-cols-[repeat(2,354px)] xl:grid-cols-[repeat(3,400.7px)] xl:justify-start xl:gap-[20px]">
          {ORDER.map(([k, len, wraps], i) => {
            const to = `/vs/${k}-alternative`
            return (
              <LiftCard key={k} lift={14} press={false} innerAs="article" onClick={() => navigate(to)}
                className="flex h-full cursor-pointer flex-col gap-[12px] border-2 border-ink bg-white p-[24px]">
                <div className="flex flex-col gap-[8px] md:gap-[16px]">
                  <span className="w-fit border-2 border-orange bg-peach px-[14px] py-[8px] font-mono text-[14px] leading-[14px] text-ink">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex flex-col gap-[8px]">
                    <h3 className="m-0 font-mono font-normal uppercase tracking-[-0.4px] text-card-h3-mono-md md:tracking-normal xl:text-card-h3-mono">
                      <Link to={to} className="text-ink no-underline" onClick={(e) => e.stopPropagation()}>
                        {/* cards 03 / 05 / 06 wrap to two lines at XL on the original (longer names) */}
                        {wraps && <span className="hidden xl:inline">Our </span>}Platform vs {COMPETITORS[k]}
                      </Link>
                    </h3>
                    <p className="m-0 line-clamp-5 max-h-[98px] overflow-hidden font-sans text-body-sm text-ink xl:max-h-[128px] xl:text-accordion-body">{fit(len, i + 170)}</p>
                  </div>
                </div>
                <TextLink size="sm" onClick={() => navigate(to)} className="self-start" tabIndex={-1}>LEARN MORE</TextLink>
              </LiftCard>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export function WhyBand() {
  return <MarqueeBand label="Why choose us?" bg="bg-yellow" size="vs" copies={9} className="z-[1] -mt-[2px]" />
}
