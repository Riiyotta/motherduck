// /product/hypertenancy blocks (PAGES_SPEC_MARKETING.md §3 B17).
import { useState } from 'react'
import { Container, Placeholder } from '../ui'
import { Btn, Chip, LeadArrow, TagTitle, TextLink } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

const TABS = ['UI', 'CURL', 'PYTHON']

// Pill tablist (Hypertenancy code tabs; §2e pill-tab indicator: `left .2s ease-out`, text `color .2s ease-out`).
function CodeTabs({ seed }) {
  const [active, setActive] = useState(0)
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setActive((a) => (a + 1) % 3)
    if (e.key === 'ArrowLeft') setActive((a) => (a + 2) % 3)
  }
  return (
    <>
      <div role="tablist" aria-label="Code examples" onKeyDown={onKey} className="relative mx-auto mb-[24px] mt-[52px] grid h-[48px] w-full max-w-[342px] grid-cols-3 rounded-pill border-2 border-ink bg-[rgba(255,255,255,0.2)] md:h-[56px] md:max-w-[512px]">
        <span
          aria-hidden="true"
          className="mk-pill-indicator absolute top-[-2px] h-[48px] rounded-pill border-2 border-ink bg-cream md:h-[56px]"
          style={{ left: `calc(${active} * (100% / 3) - 2px)`, width: 'calc(100% / 3 + 4px)' }}
        />
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`ht-tab-${i}`}
            aria-selected={i === active}
            aria-controls="ht-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`mk-pill-tab relative z-[1] border-0 bg-transparent px-[20px] font-sans text-[14px] uppercase leading-[16.8px] md:px-[28px] md:text-[16px] md:leading-[19.2px] ${i === active ? 'text-ink' : 'text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Panel content swaps instantly (no fade measured) */}
      <div id="ht-panel" role="tabpanel" aria-labelledby={`ht-tab-${active}`} className="mx-auto w-full max-w-[1028px] overflow-hidden rounded-frame border-2 border-ink bg-white">
        <Placeholder key={active} ratio="2120 / 1138" rounded="" bordered={false} label={`${TABS[active]} example screenshot`} />
      </div>
    </>
  )
}

export function DarkHero({ seed = 1 }) {
  return (
    <div className="relative overflow-hidden bg-ink">
      {/* Backdrop image rebuilt: solid ink + ht-glow radial gradients behind the lower half */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2">
        <div className="absolute left-[10%] top-[10%] h-[780px] w-[860px] rounded-full bg-[radial-gradient(closest-side,theme(colors.ht-glow-1),transparent)]" />
        <div className="absolute right-[5%] top-[30%] h-[780px] w-[780px] rounded-full bg-[radial-gradient(closest-side,theme(colors.ht-glow-2),transparent)]" />
        <div className="absolute left-1/2 top-[45%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,theme(colors.ht-glow-1),transparent)]" />
      </div>
      <section className="relative pt-[24px] md:pt-[32px] lg:pt-[48px] xl:pt-[72px]">
        <Container className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-[16px] xl:gap-[20px]">
            <Chip className="bg-[rgba(255,255,255,0.1)] !py-[10px] !text-white">HYPERTENANCY</Chip>
            {/* line 1 Mono, line 2 MuseoModerno; max-width 10.54em at every size (measured) */}
            <h1 className="m-0 max-w-[10.54em] font-mono font-normal uppercase text-white text-h1-mono-xl-sm md:text-h1-mono-xl-md xl:text-h1-mono-xl">
              {fitTitle(17, seed)}
              <br />
              <span className="font-museo font-black">{fitTitle(15, seed + 7)}</span>
            </h1>
            <p className="m-0 font-sans text-[18px] font-light leading-[28.8px] text-white lg:max-w-[660px] xl:max-w-[800px] xl:text-body-xl">{fit(127, seed + 1)}</p>
          </div>
          <div className="mt-[16px] flex flex-wrap justify-center gap-x-[24px] gap-y-[12px] xl:mt-[32px]">
            <Btn variant="ht" size="lg">GET STARTED FREE</Btn>
            <Btn variant="ht-dark" size="lg" lead={LeadArrow}>VIEW DOCUMENTATION</Btn>
          </div>
          <div className="mt-[66px] w-full max-w-[600px] overflow-hidden rounded-[12px] bg-ink lg:max-w-[800px] lg:rounded-[15px] xl:max-w-[1028px] xl:rounded-frame">
            <Placeholder ratio="2698 / 1504" rounded="" label="Product media" />
          </div>
        </Container>
      </section>
      <section className="relative py-[80px] md:pb-[120px] md:pt-[92px] lg:pb-[160px]">
        <Container>
          <div className="mx-auto flex flex-col items-center gap-[12px] text-center">
            <h2 className="m-0 font-mono font-normal uppercase text-white text-h2-mono-md xl:text-h2-mono-lg">{fitTitle(33, seed + 2)}</h2>
            <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] text-white lg:text-[18px] lg:leading-[28.8px]">{fit(97, seed + 3)}</p>
          </div>
          <CodeTabs seed={seed} />
        </Container>
      </section>
    </div>
  )
}

// Rows 3–5 carry a link (measured label lengths 17 / 22 / 14); null = docs (non-link).
const ROWS = [
  { chip: 12, h3: 43, p: 288 },
  { chip: 10, h3: 23, p: 162 },
  { chip: 12, h3: 34, p: 215, link: '/blog/faster-ducks', label: 'SEE THE BENCHMARK' },
  { chip: 15, h3: 30, p: 165, link: null, label: 'READ THE DOCUMENTATION' },
  { chip: 9, h3: 23, p: 235, link: null, label: 'EXPLORE THE UI' },
]

// Measured: tag is in flow (centred, 40/56 · 32/44.8 · 24/33.6, full width <728); rows 2-col at every width
// >=728 (581/80 · 439/42 · 328/32), grid pt 100/80/64/44, gap 132/110/80/80, section pb 120/120/112/80.
export function AlternatingFeatureRows({ seed = 1 }) {
  return (
    <section className="relative border-t-2 border-ink bg-cream pb-[80px] md:pb-[112px] lg:pb-[120px]">
      <Container>
        <TagTitle className="mx-auto !w-full px-[30px] py-[11px] text-center text-h2-mono-tall-sm md:!w-fit lg:py-[10px] lg:text-h2-mono-tall xl:text-tag-40-tall">{fitTitle(29, seed)}</TagTitle>
        <div className="mx-auto grid max-w-[450px] grid-cols-1 gap-[80px] pt-[44px] md:max-w-none md:pt-[64px] lg:gap-[110px] lg:pt-[80px] xl:gap-[132px] xl:pt-[100px]">
          {ROWS.map((r, i) => (
            <article key={i} className="grid grid-cols-1 items-center gap-[24px] md:grid-cols-[328px_328px] md:gap-[32px] lg:grid-cols-[439px_439px] lg:gap-[42px] xl:grid-cols-[581px_581px] xl:gap-[80px]">
              <div className={`bg-white ${i % 2 ? 'md:order-2' : ''}`}>
                <Placeholder ratio="581 / 558.6" label={`Feature panel ${i + 1}`} />
              </div>
              <div className="flex flex-col justify-center gap-[12px]">
                <Chip tall className="bg-sand-chip !py-[10px] lg:!py-[8px]">{fitTitle(r.chip, seed * 3 + i).toUpperCase()}</Chip>
                <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-sm lg:text-card-h3-mono">{fitTitle(r.h3, seed * 5 + i)}</h3>
                <p className="m-0 font-sans text-accordion-body text-ink">{fit(r.p, seed * 7 + i)}</p>
                {r.label && <TextLink to={r.link} className="mt-[20px]">{r.label}</TextLink>}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
