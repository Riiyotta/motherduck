// T3 persona + /product shared blocks (PAGES_SPEC_MARKETING.md §3 B18).
import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, LiftCard, Placeholder, TextInput } from '../ui'
import { Btn, Chip, Chevron, InlineLink, QuoteMark, TagTitle, TextLink, smoothScrollTo } from './bits.jsx'
import MarqueeBand from './MarqueeBand.jsx'
import { fit, fitTitle, text, title } from './copy.js'

const headerOffset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-total')) || 0

// ---------- PersonaHero ----------
// variant 'video' (app-dev, data-teams, /product) | 'illustration' (duckdb-users: chip + 540×440 illustration)
// Measured (video): padding 40/160 · 70/100 · 92/156, columns gap 40 (960–1301) / 80, stacked <960 with the
// CTA row padded 64 / 44 below and the video 342 (max 380) / 480 right-aligned; play disc 48 / 76 / 76 / 100.
// Illustration variant: padding 32/60 · 48/70 · 56/80 · 56/100, chip mb 20, h2 pt 20, art 342 / 560 / 440 / 540.
export function PersonaHero({ variant = 'video', chip, links, smAlt = false, lens = [43, 107], seed = 1 }) {
  const ref = useRef(null)
  const illus = variant === 'illustration'
  const learnMore = () => smoothScrollTo(ref.current?.nextElementSibling, headerOffset())
  const pad = illus
    ? 'pb-[60px] pt-[32px] md:pb-[70px] md:pt-[48px] lg:pb-[80px] lg:pt-[56px] xl:pb-[100px]'
    : 'pb-[160px] pt-[40px] lg:pb-[100px] lg:pt-[70px] xl:pb-[156px] xl:pt-[92px]'
  return (
    <section ref={ref} className={pad}>
      <Container className="flex flex-col lg:flex-row lg:items-center lg:gap-[40px] xl:gap-[80px]">
        <div className="w-full lg:max-w-[440px] xl:max-w-[560px]">
          {chip && <Chip className="mb-[20px] bg-sand-chip">{fitTitle(lens[2] || 24, seed + 9).toUpperCase()}</Chip>}
          <h1 className={`m-0 font-fono font-normal uppercase text-ink md:text-h1-persona-md lg:text-h1-persona ${illus ? '' : 'pb-[32px]'} ${smAlt ? 'text-h1-persona-sm-alt' : 'text-h1-persona-sm'}`}>
            {fitTitle(lens[0], seed)}
          </h1>
          <h2 className={`m-0 pb-[32px] font-sans text-body-md text-ink md:text-body-lg ${illus ? 'pt-[20px]' : ''}`}>
            {fit(lens[1], seed + 1)}
            {links && links.map((l, i) => (
              <span key={l}>{i === 0 ? ' ' : ', '}<InlineLink to={l}>{title(2, seed + 3 + i)}</InlineLink></span>
            ))}
          </h2>
          <div className={`flex items-center gap-[32px] md:gap-x-[32px] lg:gap-x-[40px] ${illus ? 'max-md:flex-col max-md:items-start max-md:gap-[30px]' : 'pb-[64px] md:pb-[44px] lg:pb-0'}`}>
            <Btn variant="primary" size="lg">GET STARTED</Btn>
            <TextLink icon="down" onClick={learnMore}>LEARN MORE</TextLink>
          </div>
        </div>
        {illus ? (
          <Placeholder label="Hero illustration" className="mx-auto mt-[40px] aspect-[540/440] w-full max-w-[430px] md:max-w-[560px] lg:mt-0 lg:w-[440px] xl:mx-[30px] xl:w-[540px]" />
        ) : (
          <div className="w-full max-w-[380px] shadow-hard-12 md:ml-auto md:max-w-[480px] lg:ml-0 lg:w-[440px] lg:max-w-none xl:w-[600px]">
            {/* Video player UI UNMEASURED: the thumbnail button is static (no player opens) */}
            <button type="button" aria-label="Play overview video" className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm border-2 border-ink bg-ink p-0">
              <Placeholder ratio="16 / 9" rounded="" bordered={false} label="Video thumbnail" className="!absolute inset-0 !h-full" />
              <span className="relative flex h-[48px] w-[48px] items-center justify-center rounded-full border border-ink bg-white transition-colors duration-[100ms] ease-in-out md:h-[76px] md:w-[76px] xl:h-[100px] xl:w-[100px] xl:border-2">
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" className="h-[40%] w-[40%]"><path d="M11 7v18l15-9z" fill="#383838" /></svg>
              </span>
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}

// ---------- PersonaSplitRows ----------
// variant 'persona' (marquee + sub-items) | 'compact' (pricing value rows: no marquee, no sub-items, H2 32/44.8 + link)
const SIDE_BG = { garden: 'bg-garden', 'coral-red': 'bg-coral-red', sun: 'bg-sun', teal: 'bg-teal' }

function SplitRow({ row, variant, seed, i }) {
  const right = row.side === 'right'
  const compact = variant === 'compact'
  return (
    <div id={row.id} className="relative border-b-2 border-ink">
      <div aria-hidden="true" className={`absolute inset-y-0 hidden w-[528px] xl:block ${right ? 'right-0' : 'left-0'} ${SIDE_BG[row.bg]}`} />
      <Container className={`relative flex flex-col xl:flex-row ${right ? 'xl:flex-row-reverse' : ''}`}>
        {/* ≤1301: a full-width 335-tall strip (padding 20) above the text */}
        <div className={`-mx-[24px] flex h-[375px] items-center justify-center p-[40px_20px] md:-mx-[20px] xl:mx-0 xl:block xl:h-auto xl:border-ink xl:bg-transparent xl:px-0 xl:py-[80px] ${compact ? 'xl:min-w-0 xl:flex-1' : 'xl:w-[509px] xl:shrink-0'} ${SIDE_BG[row.bg]} ${
          right ? 'xl:ml-[120px] xl:border-l-2' : 'xl:mr-[120px] xl:border-r-2'
        }`}>
          <div className="h-full xl:sticky xl:top-[325px] xl:h-[380px]">
            {/* mk-bob: 3s ease-in-out infinite ±8px (measured, all widths, not disabled by reduced motion) */}
            <div className="mk-bob h-full">
              <Placeholder label="Illustration" variant="shape" className="h-full w-[380px] max-w-full xl:w-[507px]" />
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-[40px] pb-[80px] pt-[52px] md:pb-[100px] md:pt-[72px] xl:gap-[52px] xl:py-[120px] ${compact ? (i === 1 ? 'xl:max-w-[520px] xl:px-[40px] xl:box-content' : 'xl:max-w-[551px]') : 'xl:max-w-[600px]'}`}>
          <div className="flex flex-col gap-[20px] xl:gap-[24px]">
            <h2 className={`m-0 font-mono font-normal uppercase text-ink ${compact ? 'text-h2-mono-tall-sm md:text-h2-mono-tall' : 'text-persona-h2-md lg:text-persona-h2-lg xl:text-persona-h2'}`}>
              {row.lens ? fitTitle(row.lens.h2, seed) : title(compact ? 4 : 6, seed)}
            </h2>
            <p className="m-0 font-sans text-body-md text-ink lg:text-body-xl">
              {row.lens ? fit(row.lens.p, seed + 1) : text(compact ? 50 : 70, seed + 1)}
              {row.inline && <> <InlineLink to={row.inline}>{title(2, seed + 2)}</InlineLink>.</>}
            </p>
            {compact && row.link && <TextLink to={row.link}>LEARN MORE</TextLink>}
          </div>
          {!compact && (row.lens?.items || Array.from({ length: row.items }, () => null)).map((it, k) => (
            <div key={k} className="flex flex-col gap-[12px] xl:gap-[16px]">
              <Placeholder label="Icon" variant="shape" className="h-[74px] w-[74px] lg:h-[90px] lg:w-[90px]" />
              <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-tall-sm md:text-card-h3-mono-tall-md lg:text-card-h3-mono-tall">{it ? fitTitle(it[0], seed * 3 + k) : title(3, seed * 3 + k)}</h3>
              <p className="m-0 font-sans text-body-sm text-ink lg:text-accordion-body">{it ? fit(it[1], seed * 5 + k) : text(28, seed * 5 + k)}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

// data-teams: a sky "UI showcase" band sits between rows 2 and 3 (measured: padding 55/88 · 70/96 · 100/90;
// ink tag + content-width subtitle; white panel pulled up like ArchitecturePanel, holding a 16:10 video thumb and
// an h3 + p + 5-item list; 2 columns × 535 gap 40 (padding 80 64) >=960, stacked below).
function UiShowcase({ seed }) {
  return (
    <section className="bg-sky-hover pb-[88px] pt-[55px] md:pb-[96px] md:pt-[70px] lg:pb-[90px] lg:pt-[100px]">
      <Container>
        <div className="relative z-[1] flex max-w-[400px] flex-col items-start md:max-w-none md:flex-row md:items-stretch">
          <TagTitle tone="ink" className="border-2 border-ink px-[20px] py-[12px] text-h2-mono-xs md:border-r-0 md:text-h2-mono-tall-sm lg:text-h2-mono-tall">{fitTitle(13, seed)}</TagTitle>
          <p className="m-0 border-2 border-ink bg-white px-[20px] py-[16.5px] font-sans text-[16px] font-light leading-[19.2px] text-ink max-md:!-mt-[2px] md:py-[10.5px] md:text-[18px] md:leading-[37.8px] lg:px-[30px] lg:py-[21.5px] lg:text-[24px] lg:leading-[28.8px]">{fitTitle(17, seed + 1)}</p>
        </div>
        <div className="max-w-[400px] -translate-y-[22px] border-2 border-ink bg-white md:max-w-none md:-translate-y-[28px] lg:-translate-y-[36px]">
          <div className="grid grid-cols-1 gap-[32px] px-[24px] py-[64px] md:gap-[40px] md:px-[52px] md:py-[80px] lg:grid-cols-2 lg:px-[64px]">
            <div className="relative flex aspect-[16/10] items-center justify-center border-2 border-ink">
              <Placeholder rounded="" bordered={false} label="Product UI video thumbnail" className="!absolute inset-0 !h-full !w-full" />
              <span className="relative h-[50px] w-[50px] rounded-full border border-ink bg-white md:h-[88px] md:w-[88px] lg:h-[76px] lg:w-[76px] lg:border-2" />
            </div>
            <div className="flex flex-col gap-[10px]">
              <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-tall-sm md:text-card-h3-mono-tall-md lg:text-card-h3-mono-tall">{fitTitle(20, seed + 2)}</h3>
              <p className="m-0 font-sans text-body-sm text-ink lg:text-accordion-body">{fit(91, seed + 3)}</p>
              <ul className="m-0 flex flex-col gap-[10px] pl-[20px] font-sans text-body-sm text-ink lg:text-accordion-body">
                {[52, 168, 48, 69, 35].map((n, k) => <li key={k}>{fit(n, seed + 10 + k)}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function PersonaSplitRows({ rows, variant = 'persona', showcaseAfter = -1, seed = 1 }) {
  return (
    <section className={variant === 'persona' ? 'md:pt-[20px]' : ''}>
      {variant === 'persona' && <MarqueeBand label="WHY CHOOSE US?" bg="bg-sun" size="persona" copies={13} />}
      {rows.map((r, i) => (
        <Fragment key={i}>
          <SplitRow i={i} row={r} variant={variant} seed={seed * 10 + i * 3} />
          {i === showcaseAfter && <UiShowcase seed={seed + 50} />}
        </Fragment>
      ))}
    </section>
  )
}

// ---------- FeatureGrid ----------
const FEATURES = ['/product', '/product/mcp-server', null, '/product/dives', '/product/flights', '/product/hypertenancy']

const FEATURE_LENS = [[17, 197], [17, 170], [22, 141], [24, 152], [24, 154], [16, 179]]

// Measured: 3 × 392.7 gap 32 >=1302 · 2 × 354 gap 32 centred (max 740) 960–1301 · 2 × 332 gap 24 728–959 ·
// 1 col (max 350) <728. Cards pad 32 32 40 / 24, icon 140 / 130 / 100, h3 24/33.6 / 18/25.2, p 16/25.6 / 14/22.4.
export function FeatureGrid({ seed = 1 }) {
  return (
    <Container as="section" className="pb-[100px] pt-[40px] md:pb-[140px] md:pt-[64px]">
      <h2 className="m-0 pb-[32px] font-mono font-normal uppercase text-ink text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:pb-[52px] lg:text-h2-mono">FEATURES</h2>
      <div className="grid max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-[repeat(2,332px)] lg:mx-auto lg:max-w-[740px] lg:grid-cols-[repeat(2,354px)] lg:gap-[32px] xl:max-w-none xl:grid-cols-3">
        {FEATURES.map((to, i) => (
          <LiftCard
            key={i}
            lift={14}
            press={false}
            innerAs={to ? Link : 'div'}
            {...(to ? { to } : {})}
            className="flex h-full flex-col gap-[16px] border-2 border-ink bg-white p-[24px] text-ink no-underline lg:px-[32px] lg:pb-[40px] lg:pt-[32px]"
          >
            <Placeholder variant="shape" label="Feature icon" className="h-[100px] w-[100px] md:h-[130px] md:w-[130px] lg:h-[140px] lg:w-[140px]" />
            <h3 className="m-0 font-mono font-normal uppercase text-card-h3-mono-tall-sm lg:text-card-h3-mono-tall">{fitTitle(FEATURE_LENS[i][0], seed * 3 + i)}</h3>
            <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] lg:text-accordion-body">{fit(FEATURE_LENS[i][1], seed * 5 + i)}</p>
            <div className="mt-auto pt-[16px]"><TextLink>MORE DETAILS</TextLink></div>
          </LiftCard>
        ))}
      </div>
    </Container>
  )
}

// ---------- ArchitecturePanel ----------
// tone 'coral' (personas) | 'ink' (/product). bg 'sky' | 'sun'. tall = app-dev panel: intro + 3 feature rows.
// Measured: padding 88 · 110/96 · 120/96 · 144/140; title plate + content-width subtitle (stacked <728, max 400);
// panel pulled up by translateY -22 / -28 / -36 (layout unchanged), diagram 338:1098.8 <728, 916:497.9 above.
const TALL_ROWS = [[34, 394, 1.56], [25, 229, 1.9], [31, 299, 1.7]]

export function ArchitecturePanel({ tone = 'coral', bg = 'sky', tall = false, sub = 27, wide = false, seed = 1 }) {
  return (
    <section id="architecture" className={`border-t-2 border-ink py-[88px] md:pb-[96px] md:pt-[110px] lg:pt-[120px] xl:pb-[140px] xl:pt-[144px] ${bg === 'sun' ? 'bg-sun' : 'bg-sky-hover'}`}>
      <Container>
        <div className="relative z-[1] flex max-w-[400px] flex-col items-start md:max-w-none md:flex-row md:items-stretch">
          <TagTitle tone={tone} className="border-2 border-ink px-[20px] py-[12px] text-h2-mono-xs md:border-r-0 md:text-h2-mono-tall-sm lg:text-h2-mono-tall">
            ARCHITECTURE
          </TagTitle>
          <p className="m-0 border-2 border-ink bg-white px-[20px] max-md:!-mt-[2px] py-[16.5px] font-sans text-[16px] font-light leading-[19.2px] text-ink md:mt-0 md:py-[10.5px] md:text-[18px] md:leading-[37.8px] lg:px-[30px] lg:py-[21.5px] lg:text-[24px] lg:leading-[28.8px]">{fitTitle(sub, seed)}</p>
        </div>
        <div className="max-w-[400px] -translate-y-[22px] border-2 border-ink bg-white shadow-hard-16 md:max-w-none md:-translate-y-[28px] lg:-translate-y-[36px]">
          {tall ? (
            <div className="flex flex-col gap-[32px] px-[24px] pb-[80px] pt-[51px] md:gap-[52px] md:px-[120px] md:pb-[103px] md:pt-[73px] xl:gap-[64px] xl:px-[80px] xl:pb-[121px] xl:pt-[100px]">
              <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] text-ink md:text-[18px] md:leading-[28.8px] xl:text-[24px] xl:leading-[38.4px]">{fit(290, seed + 4)}</p>
              {TALL_ROWS.map(([hc, pc, ratio], k) => (
                <div key={k} className={`flex flex-col border-2 border-ink bg-surface-2 xl:flex-row ${k % 2 ? 'xl:flex-row-reverse' : ''}`}>
                  <Placeholder bordered={false} rounded="" label="Architecture diagram" className="w-full xl:!h-auto xl:flex-1" style={{ aspectRatio: String(ratio) }} />
                  <div className={`flex flex-col justify-center gap-[12px] px-[24px] pb-[24px] pt-[32px] md:pt-[36px] xl:max-w-[443px] xl:shrink-0 xl:p-[32px] ${k === 0 ? 'bg-[#FFE0C6]' : ''}`}>
                    <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-tall-sm xl:text-card-h3-mono-tall">{fitTitle(hc, seed + k)}</h3>
                    <p className="m-0 font-sans text-body-sm text-ink xl:text-accordion-body">{fit(pc, seed * 3 + k)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Placeholder bordered={false} label="Architecture diagram" className={`w-full ${wide ? 'aspect-[338/1358.3] md:aspect-[1238/721.6]' : 'aspect-[338/1098.8] md:aspect-[916/497.9]'}`} />
          )}
        </div>
      </Container>
    </section>
  )
}

// ---------- YellowCTA ----------
// Measured: padding 64 0 0 · 72 · 120 · 140; column 342 · 366 · 464 · 654; h2 24/33.6 · 32/44.8 · 40/48;
// tagline 18/25.2 · 20/28 · 24/33.6. Illustration sits below the text <728 (in flow).
export function YellowCTA({ lens = [43, 44], seed = 1 }) {
  return (
    <section className="relative overflow-hidden border-t-2 border-ink bg-sun pt-[64px] md:py-[72px] lg:py-[120px] xl:py-[140px]">
      <Container className="relative">
        <div className="mb-[20px] flex flex-col gap-[20px] md:mb-0 md:max-w-[366px] lg:max-w-[464px] xl:max-w-[654px]">
          <h2 className="m-0 font-mono font-normal uppercase text-ink text-h2-mono-tall-sm md:text-h2-mono-faq-md lg:text-h2-mono">{fitTitle(lens[0], seed)}</h2>
          <p className="m-0 font-mono text-[18px] font-light uppercase leading-[25.2px] text-ink md:text-[20px] md:leading-[28px] lg:text-hero-tagline-mono">{fitTitle(lens[1], seed + 1)}</p>
          <TextLink to="/product/pricing" className="mt-[20px]">LEARN MORE</TextLink>
        </div>
        <Placeholder label="Illustration" className="h-[300px] w-full md:!absolute md:right-[20px] md:top-1/2 md:h-[260px] md:w-[300px] md:-translate-y-1/2 lg:h-[320px] lg:w-[370px] xl:right-[30px] xl:h-[373px] xl:w-[430px]" />
      </Container>
    </section>
  )
}

// ---------- EcosystemDiagram ----------
// Measured: a 6-column grid (213.3 gap 60 >=1302 · 114.7 gap 20 728–1301 · 55.8 gap 10 <728) of fixed-size
// tiles in 3 rows plus a centred bottom pair; the emblem is absolutely centred over rows 1–2.
// Tile sizes per row (xl / md-lg / sm): row 1 360×145 / 264×145 / 145×70; row 2 360×145 / 172×246 / 84×126.7;
// row 3 sides 300|360×145 / 172×227.3 / 84×116.3, centre 280×155 / 190×197.3 / 97×106.3 (mt 50 / 50 / 20);
// bottom 360×150 / 264×126 / 134×62.
const ECO = [
  ['SOURCES', 'sources', 'bg-eco-sources border-eco-sources-bd', 4],
  ['AI AGENTS', 'agents', 'bg-eco-agents border-eco-agents-bd', 3],
  ['INGESTION', 'ingestion', 'bg-eco-ingestion border-eco-ingestion-bd', 5],
  ['BI', 'bi', 'bg-eco-bi border-eco-bi-bd', 4],
  ['REVERSE ETL', 'reverse-etl', 'bg-eco-retl border-eco-retl-bd', 2],
  ['TRANSFORMATION', 'transformation', 'bg-eco-transform border-eco-transform-bd', 2],
  ['DS & AI', 'ds-ai', 'bg-eco-dsai border-eco-dsai-bd', 4],
  ['ORCHESTRATION', null, 'bg-eco-orch border-eco-orch-bd', 3],
  ['DATA QUALITY', null, 'bg-eco-dq border-eco-dq-bd', 3],
]
const R1 = 'h-[70px] w-[145px] md:h-[145px] md:w-[264px] xl:w-[360px]'
const R2 = 'h-[126.7px] w-[84px] md:h-[246px] md:w-[172px] xl:h-[145px] xl:w-[360px]'
const R3 = 'h-[116.3px] w-[84px] md:h-[227.3px] md:w-[172px] xl:h-[145px]'
const PLACE = [
  `col-span-3 justify-self-start ${R1} mr-[16px] xl:mr-0`,
  `col-span-3 justify-self-end ${R1} ml-[16px] xl:ml-0`,
  `col-span-3 justify-self-start ${R2}`,
  `col-span-3 justify-self-end ${R2}`,
  `col-span-2 justify-self-start ${R3} xl:ml-[30px] xl:w-[300px]`,
  'col-span-2 justify-self-center mt-[20px] h-[106.3px] w-[97px] md:mt-[50px] md:h-[197.3px] md:w-[190px] xl:h-[155px] xl:w-[280px]',
  `col-span-2 justify-self-end ${R3} xl:w-[360px]`,
]
const BOTTOM = 'h-[62px] w-[134px] md:h-[126px] md:w-[264px] xl:h-[150px] xl:w-[360px]'

function EcoTile({ t, className }) {
  const [label, cat, cls, logos] = t
  const inner = (
    <>
      <h3 className="m-0 text-center font-mono text-[9px] font-normal leading-[10.8px] text-ink md:text-[14px] md:leading-[16.8px] xl:text-[18px] xl:leading-[21.6px]">{label}</h3>
      <div className="flex flex-wrap items-center justify-center gap-[4px] overflow-hidden md:gap-[8px]">
        {Array.from({ length: logos }, (_, k) => <Placeholder key={k} label="Tool logo" className="h-[14px] w-[20px] md:h-[28px] md:w-[40px] xl:h-[36px] xl:w-[52px]" />)}
      </div>
    </>
  )
  const c = `mk-eco-tile relative flex flex-col items-center justify-between gap-[8px] overflow-hidden border-2 px-[9px] py-[4px] no-underline md:px-[20px] md:py-[12px] ${cls} ${className}`
  return cat ? <Link to={`/ecosystem?category=${cat}`} className={c}>{inner}</Link> : <div className={c}>{inner}</div>
}

export function EcosystemDiagram() {
  return (
    <section className="mk-grid-texture relative overflow-hidden border-y-2 border-ink pb-[60px] pt-[40px] md:pb-[120px] md:pt-[60px] xl:pt-[80px]">
      <Container className="flex flex-col items-center gap-[24px] md:gap-[32px] xl:gap-[12px]">
        <div className="bg-cream px-[16px] py-[8px] text-center md:px-[32px] md:py-[20px]">
          <h2 className="m-0 font-mono text-[32px] font-normal uppercase leading-[44.8px] text-ink md:text-h1-left-lg xl:text-h1-mono-xl">ECOSYSTEM</h2>
          <p className="m-0 font-mono text-[16px] font-light uppercase leading-[22.4px] text-ink md:text-hero-tagline-mono-lg xl:text-hero-tagline-mono">MODERN DATA STACK</p>
        </div>
        <div className="relative flex w-[335px] flex-col gap-[10px] md:w-[688px] md:gap-[20px] xl:w-[1280px] xl:gap-[50px]">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[660px] w-[1380px] -translate-x-1/2 -translate-y-1/2 xl:block">
            <Placeholder label="Background video (not reproduced)" className="h-full w-full opacity-40" />
          </div>
          <div className="relative grid grid-cols-6 gap-[10px] md:gap-[20px] xl:gap-[60px]">
            <div className="absolute left-1/2 top-[147.5px] z-[1] flex h-[115.6px] w-[84.8px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[4px] md:top-[291.6px] md:h-[215.6px] md:w-[160px] xl:top-[233.7px] xl:h-[278.2px] xl:w-[205px] xl:gap-[12px]">
              <Placeholder rounded="rounded-full" variant="shape" label="Warehouse emblem" className="aspect-square w-full" />
              <span className="bg-cream px-[4px] py-[2px] text-center font-mono text-[8px] leading-[9.6px] text-ink md:px-[9px] md:py-[4px] md:text-[14px] md:leading-[16.8px] xl:px-[18px] xl:py-[9px] xl:text-[18px] xl:leading-[21.6px]">CLOUD DATA WAREHOUSE</span>
            </div>
            {ECO.slice(0, 7).map((t, i) => <EcoTile key={t[0]} t={t} className={PLACE[i]} />)}
          </div>
          <div className="flex justify-center gap-[20px] xl:gap-[62px]">
            {ECO.slice(7).map((t) => <EcoTile key={t[0]} t={t} className={BOTTOM} />)}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ---------- CaseStudyCarousel ----------
// Measured: >=1302 a vertical track of 380-tall slides [938 | 500] (text padding 0 68 0 106); 728–1301 a
// horizontal track of 440-tall slides [971|309] / [459|309] (text padding 10 40 40); <728 stacked slides:
// 356-tall photo with a centred name tag, then the quote box (padding 40 24 74, 16/22.4).
export const CASE_SLIDE_MS = 500 // track transition UNMEASURED
const CASE_Q = [213, 166, 22, 204, 281, 291, 199, 187, 206, 293, 238, 85, 224]
const CASE_NAME = [12, 10, 9, 14, 11, 16, 12, 13, 11, 11, 9, 11, 13]
const CASE_ROLE = [28, 18, 31, 52, 24, 13, 14, 34, 29, 39, 29, 42, 43]

// Slide colours by index, measured per route on the original (S sky #6FC2FF, Y sun #FFDE00, T garden #16AA98);
// the same at every width. Routes without a measured string fall back to sky/sun alternation.
const CASE_TONE = { S: 'bg-sky-hover', Y: 'bg-sun', T: 'bg-garden' }

export function CaseStudyCarousel({ count = 13, seed = 1, tones }) {
  const [i, setI] = useState(0)
  const go = (d) => setI((v) => (v + d + count) % count)
  const slides = Array.from({ length: count }, (_, k) => ({
    quote: fit(CASE_Q[k % 13], seed * 7 + k),
    short: CASE_Q[k % 13] < 40,
    link: k % 3 === 2 ? null : `/case-studies/customer-${(k % 9) + 1}`,
    name: fitTitle(CASE_NAME[k % 13], seed + 40 + k),
    role: fitTitle(CASE_ROLE[k % 13], seed + k),
  }))
  const Slide = ({ s, k }) => {
    const bg = tones ? CASE_TONE[tones[k % tones.length]] : k % 2 ? 'bg-sun' : 'bg-sky-hover'
    return (
      <div className={`grid h-full grid-cols-1 md:grid-cols-[459px_309px] lg:grid-cols-[971px_309px] xl:grid-cols-[938px_500px] ${bg}`}>
        <div className="order-2 flex flex-col items-center justify-center border-t-2 border-ink px-[24px] pb-[74px] pt-[40px] md:order-none md:border-t-0 md:px-[40px] md:pb-[40px] md:pt-[10px] xl:py-0 xl:pl-[106px] xl:pr-[68px]">
          <div className="flex w-full flex-col items-start">
            <QuoteMark w={26} h={24} className="mb-[10px] xl:mb-[16px] xl:!h-[28px] xl:!w-[30px]" />
            <blockquote className={`m-0 w-full font-sans text-ink text-[16px] leading-[22.4px] md:text-[18px] md:leading-[25.2px] lg:text-case-quote ${s.short ? 'xl:text-case-quote-short' : ''}`}>{s.quote}</blockquote>
            <QuoteMark w={26} h={24} className="mt-[10px] self-end xl:!h-[28px] xl:!w-[30px]" style={{ transform: 'rotate(180deg)' }} />
            <TextLink to={s.link} className="self-center md:self-start">READ MORE</TextLink>
          </div>
        </div>
        <div className="relative h-[356px] border-ink md:h-auto md:border-l-2">
          <span aria-hidden="true" className={`absolute left-1/2 top-[349px] h-[22.6px] w-[22.6px] -translate-x-1/2 -rotate-45 border-r-2 border-t-2 border-ink md:left-[-13px] md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:rotate-45 ${bg}`} />
          <Placeholder rounded="" bordered={false} label="Customer photo" className="h-full w-full" />
          <div className="absolute bottom-0 left-1/2 flex max-w-full -translate-x-1/2 flex-col items-center gap-[4px] border-x-2 border-t-2 border-ink bg-cream px-[30px] pb-[18px] pt-[14px] md:left-0 md:translate-x-0 md:items-start md:border-l-0 md:pb-[14px] md:pl-[30px] md:pr-[22px]">
            <p className="m-0 font-sans text-ink text-person-name-lg-md xl:text-person-name-lg">{s.name}</p>
            <p className="m-0 font-sans text-[16px] font-light leading-[20.8px] tracking-[0.32px] text-ink">{s.role}</p>
          </div>
        </div>
      </div>
    )
  }
  const nav = (vertical) => (
    <>
      <button type="button" aria-label="Previous case study" onClick={() => go(-1)} className="border-0 bg-transparent p-0 text-ink"><Chevron rotate={vertical ? 180 : 90} /></button>
      <button type="button" aria-label="Next case study" onClick={() => go(1)} className="border-0 bg-transparent p-0 text-ink"><Chevron rotate={vertical ? 0 : -90} /></button>
    </>
  )
  return (
    <div className="relative">
      <TagTitle tone="sun" className="absolute left-[24px] top-[-32px] z-[2] px-[16px] py-[8px] text-h2-mono-tall-sm md:left-[56px] lg:left-[100px] lg:px-[32px] lg:text-h2-mono-tall xl:left-[102px]">CASE STUDIES</TagTitle>
      <section aria-roledescription="carousel" className="relative overflow-hidden border-b-2 border-ink bg-sky-hover md:h-[442px] xl:h-[380px]">
        {/* >=1302: vertical track, 380px steps */}
        <div className="hidden h-full flex-col xl:flex" style={{ transform: `translateY(-${i * 380}px)`, transition: `transform ${CASE_SLIDE_MS}ms ease-in-out` }}>
          {slides.map((s, k) => (
            <div key={k} aria-hidden={k !== i || undefined} className="h-[380px] shrink-0 border-r-2 border-ink"><Slide s={s} k={k} /></div>
          ))}
        </div>
        <div className="absolute left-[45px] top-1/2 z-[1] hidden h-[108px] w-[24px] -translate-y-[54px] flex-col items-center gap-[60px] xl:flex">{nav(true)}</div>
        {/* <1302: horizontal track (slides 440 tall >=728, content height <728) */}
        <div className="flex xl:hidden" style={{ transform: `translateX(-${i * 100}%)`, transition: `transform ${CASE_SLIDE_MS}ms ease-in-out` }}>
          {slides.map((s, k) => (
            <div key={k} aria-hidden={k !== i || undefined} className="w-full shrink-0 md:h-[440px]"><Slide s={s} k={k} /></div>
          ))}
        </div>
        <div className="absolute bottom-[24px] left-1/2 z-[1] flex -translate-x-1/2 gap-[32px] xl:hidden md:left-[40px] md:translate-x-0">{nav(false)}</div>
      </section>
    </div>
  )
}

// ---------- ContactForm ----------
// Validation (measured on the original): all five fields are required, but an empty submit shows no message —
// focus just moves to the first empty/invalid field. Format errors ("↳ …", 12/19.2 300 #E23F35, red border,
// aria-invalid) appear on blur / submit for a non-empty invalid email and a description under 10 characters,
// then re-validate on change. Filled-valid fields turn green after blur (TextInput).
const CONTACT_FIELDS = ['firstname', 'lastname', 'email', 'company', 'description']
const contactError = (k, val) => {
  if (!val) return undefined
  if (k === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please check this email address'
  if (k === 'description' && val.length < 10) return 'Please write at least 10 characters'
  return undefined
}

// `intro`: intro character count, chosen per page so it wraps like the original (2 / 2 / 3 / 4 lines @1440 / 1280 / 768 / 390).
export function ContactForm({ seed = 1, intro = 135 }) {
  const [v, setV] = useState({})
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => {
    const val = e.target.value
    setV((o) => ({ ...o, [k]: val }))
    setErrors((o) => (o[k] ? { ...o, [k]: contactError(k, val) } : o))
  }
  const blur = (k) => () => setErrors((o) => ({ ...o, [k]: contactError(k, v[k]) }))
  const submit = (e) => {
    e.preventDefault() // posts to an external service on the original: never submitted here
    const errs = {}
    CONTACT_FIELDS.forEach((k) => { errs[k] = contactError(k, v[k]) })
    setErrors(errs)
    const first = CONTACT_FIELDS.find((k) => !v[k] || errs[k])
    if (first) e.currentTarget.elements.namedItem(first)?.focus()
  }
  const f = (k, label, extra = {}) => <TextInput name={k} label={label} value={v[k] || ''} onChange={set(k)} onBlur={blur(k)} error={errors[k]} {...extra} />
  return (
    <section className="relative overflow-hidden">
      {/* Measured: padding 80 24 100 · 80 165 100 (728–959) · 80 185 100 (960–1301) · 80 300 100; h2 32/44.8 from 960;
          intro 16/25.6 ls .32 below 1302, 20/32 above; form gap 36 / 40 (from 960); first/last name side by side from
          960; the footnote sits 2px under the textarea (same block, no form gap), then the button 16 below. */}
      <Container className="pb-[100px] pt-[80px] md:!px-[165px] lg:!px-[185px] xl:!px-[300px]">
        <h2 className="m-0 pb-[12px] font-mono font-normal uppercase text-ink text-h2-mono-tall-sm lg:text-h2-mono-tall">GET IN TOUCH</h2>
        <p className="m-0 pb-[36px] font-sans text-body-md tracking-[0.32px] text-ink xl:text-[20px] xl:leading-[32px] xl:tracking-[0.4px]">{fit(intro, seed)}</p>
        {/* No network submit; reCAPTCHA omitted */}
        <form noValidate onSubmit={submit} className="flex flex-col gap-[36px] lg:gap-[40px]">
          <div className="flex flex-col gap-[36px] lg:flex-row lg:gap-[24px]">
            {f('firstname', 'First name', { className: 'flex-1' })}
            {f('lastname', 'Last name', { className: 'flex-1' })}
          </div>
          {f('email', 'Work email', { type: 'email' })}
          {f('company', 'Company')}
          <div>
            {f('description', 'How can we help?', { multiline: true })}
            <p className="m-0 mt-[2px] pt-[32px] font-sans text-body-sm text-gray-500">{fit(36, seed + 1)}</p>
            <Btn type="submit" variant="primary" size="lg" wrapperClassName="mt-[16px]">SUBMIT</Btn>
          </div>
        </form>
      </Container>
      <Placeholder width={320} height={240} label="Decorative illustration" className="!absolute bottom-[40px] right-[40px] hidden -scale-x-100 xl:flex" />
    </section>
  )
}

