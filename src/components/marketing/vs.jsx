// T1 vs-comparison blocks (PAGES_SPEC_MARKETING.md §3 B1, B3, B4, B5, B8).
import { Link, useNavigate } from 'react-router-dom'
import { Container, LiftCard, Placeholder } from '../ui'
import { Btn, Check, CheckCircle, Chevron, SectionHead, TextLink } from './bits.jsx'
import MarqueeBand from './MarqueeBand.jsx'
import { BRAND, COMPETITORS, fit, fitTitle, text, title } from './copy.js'

// ---------- B1 VsHero ----------
// `lens` = [h1 chars, h2 chars, p chars] of the original page (line wraps follow from the counts).
export function VsHero({ name, seed, lens = [59, 68, 230], tail }) {
  const lead = `${BRAND} vs ${name}: `
  // Like the original, the hero is a position:relative / overflow:hidden <section>: the 728–959 illustration
  // (right -32) is clipped instead of widening the page.
  return (
    <section className="relative overflow-hidden">
    <Container className="relative pb-[342px] pt-[40px] md:pb-[312px] md:pt-[64px] lg:pb-[278px] xl:pb-[146px] xl:pt-[72px]">
      <div className="flex max-w-[742px] flex-col gap-[16px] md:gap-[20px]">
        {/* Back row: chevron + link to /vs (the chevron sits outside the anchor, as on the original) */}
        <div className="flex items-center gap-[6px] text-ink">
          <Chevron size={20} rotate={90} />
          <TextLink to="/vs" icon={null}>BACK TO COMPARISONS</TextLink>
        </div>
        <h1 className="m-0 font-mono font-normal uppercase text-ink text-h1-vs-sm md:text-h1-vs">
          {lead}{tail || fitTitle(Math.max(4, lens[0] - lead.length), seed)}
        </h1>
        <h2 className="m-0 font-sans text-gray-600 text-sub-head-sm md:text-sub-head">{fit(lens[1], seed + 1)}</h2>
        <p className="m-0 font-sans text-ink text-lede-hero lg:text-lede">{fit(lens[2], seed + 2)}</p>
        <div className="mt-[4px] flex flex-col gap-[8px] md:mt-[12px] md:flex-row">
          {/* auth sign-up URL -> non-link button */}
          <Btn variant="primary" fullWidth wrapperClassName="md:!inline-flex md:!w-auto" className="md:!w-auto">START FOR FREE TODAY</Btn>
          <Btn variant="secondary" to="/contact-us/product-expert" fullWidth wrapperClassName="md:!inline-flex md:!w-auto" className="md:!w-auto">GET A DEMO</Btn>
        </div>
      </div>
      <Placeholder
        label="Comparison illustration"
        // <728: bottom -6, inset 0 35, translateX 20 · 728–959: right -32 bottom -6 · 960–1301: right -12 · >=1302: left 889 top 156
        className="!absolute bottom-[-6px] left-[35px] h-[313.9px] w-[320px] translate-x-[20px] md:left-auto md:right-[-32px] md:h-[358px] md:w-[365px] md:translate-x-0 lg:right-[-12px] xl:bottom-auto xl:left-[889px] xl:right-auto xl:top-[156px]"
      />
    </Container>
    </section>
  )
}

// ---------- B3 ComparisonTable ----------
// `rows` = original per-row character counts [label, competitor, ours]; `lede` = intro chars.
// `logo` = the competitor logo's rendered height (196 wide; live header row = 57 + the taller of the two logos);
// `logoSm` = [w, h] override below 960; `wide` = the redshift layout (its logo art makes the auto table 739 wide with
// 131 | 134 | 474 columns below 960 and 154 | auto | 474 from 960 to 1301, measured @390 / 768 / 959 / 960 / 1024).
export function ComparisonTable({ name, rows, seed, lede = 227, logo = 44, logoSm = null, wide = false }) {
  const thPad = 'pb-[36px] pt-[20px] px-[16px] xl:px-[24px]' // 16 below 1302 (measured @768 / 1280)
  return (
    <section className="bg-cream py-[72px] md:py-[80px] xl:py-[60px]">
      <Container className="flex flex-col items-center gap-[64px]">
        <SectionHead title={fitTitle(31, seed + 10)} h2Class="text-h2-mono-tall-sm lg:text-h2-mono-md xl:text-h2-mono-lg" className="w-full">
          {fit(lede, seed + 11)}
        </SectionHead>
        <div className="w-full overflow-x-auto">
          <table className={`w-full ${wide ? 'min-w-[739px] lg:min-w-[688px]' : 'min-w-[688px]'} border-separate border-spacing-0 font-sans text-[16px] font-normal leading-[25.6px] text-ink`}>
            <colgroup>
              {/* <1302: 154 | auto | 267 (688 min, scrolls <728); >=1302: 286.5 | 457.7 | 497.8. The first column keeps its
                  1px sand rules + 16px padding below 1302 (measured @390 / 768 / 960 / 1280 / 1301). */}
              <col className={wide ? 'w-[131px] lg:w-[154px] xl:w-[23.07%]' : 'w-[154px] xl:w-[23.07%]'} />
              <col className={wide ? 'w-[134px] lg:w-auto xl:w-[36.85%]' : 'xl:w-[36.85%]'} />
              <col className={wide ? 'w-[474px] xl:w-[40.08%]' : 'w-[267px] xl:w-[40.08%]'} />
            </colgroup>
            <thead>
              <tr>
                <th className="border-l border-t border-sand-chip pb-[36px] pl-[16px] pr-[16px] pt-[20px] xl:border-0 xl:pl-0 xl:pr-[24px]"><span className="sr-only">Capability</span></th>
                <th className={`border-l border-t border-sand-chip text-left ${thPad}`}>
                  <Placeholder label={`${name} logo`}
                    className={logoSm ? 'h-[var(--lh)] w-[var(--lw)] max-w-full lg:h-[var(--lhl)] lg:w-[196px]' : 'max-w-full'}
                    style={logoSm ? { '--lw': `${logoSm[0]}px`, '--lh': `${logoSm[1]}px`, '--lhl': `${logo}px` } : { width: 196, height: logo }} />
                </th>
                <th className={`border-x-2 border-t-2 border-sand-dark bg-[rgba(255,255,255,0.5)] text-left ${thPad}`}>
                  {/* live: 196x36 below 1302, 218x40 at XL */}
                  <Placeholder label={`${BRAND} logo`} className="h-[36px] w-[196px] max-w-full xl:h-[40px] xl:w-[218px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([lc, cc, mc], i) => {
                const last = i === rows.length - 1
                return (
                  <tr key={i}>
                    <td className="border-b border-l border-sand-chip p-[16px] align-baseline xl:border-b-2 xl:border-l-0 xl:pl-0 xl:pr-[32px]">{fitTitle(lc, seed * 3 + i)}</td>
                    <td className="border-b border-l border-sand-chip p-[16px] align-baseline xl:pl-[24px] xl:pr-[32px]">{fit(cc, seed * 5 + i)}</td>
                    <td className={`border-x-2 border-x-sand-dark bg-[rgba(255,255,255,0.5)] p-[16px] align-baseline xl:pl-[24px] xl:pr-[32px] ${last ? 'border-b-2 border-b-sand-dark' : 'border-b border-b-sand-chip'}`}>
                      <div className="flex items-start gap-[16px]">
                        <CheckCircle />
                        <span>{fit(mc, seed * 7 + i)}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}

// "Last updated" line between the table and the LogoBar (Inter 14/22.4 #666, Mono 14 300 date; 1200 max, padding 0 24 8).
export function LastUpdated() {
  return (
    <p className="m-0 mx-auto max-w-[1200px] px-[24px] pb-[8px] font-sans text-[14px] leading-[22.4px] text-gray-600">
      Last updated <time dateTime="2026-08-01" className="align-top font-mono font-light tracking-[0.28px]">August 2026</time>
    </p>
  )
}

// ---------- B4 LogoBar (dot + tooltip pattern from hero/LogoStrip.jsx; layout differs) ----------
const LOGOS = [
  { d: [230, 28], m: [184, 22.4], link: '/case-studies/customer-one' },
  { d: [33.6, 28], m: [26.9, 22.4], link: '/case-studies/customer-two' },
  { d: [163, 18], m: [130.4, 14.4], link: null },
  { d: [104, 28], m: [83.2, 22.4], link: '/case-studies/customer-three' },
  { d: [132.7, 28], m: [106.2, 22.4], link: '/case-studies/customer-four' },
  { d: [92.4, 28], m: [73.9, 22.4], link: '/case-studies/customer-five' },
]

export function LogoBar() {
  return (
    <section className="mb-[50px] pt-[20px] md:px-[60px] md:pb-[10px] md:pt-[30px] lg:px-[100px] xl:px-0 xl:pb-[20px] xl:pt-[40px]">
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-[32px] p-0 md:gap-[48px]">
        {LOGOS.map((l, i) => {
          const box = (
            <Placeholder
              label={`Customer logo ${i + 1}`}
              className="h-[var(--mh)] w-[var(--mw)] md:h-[var(--dh)] md:w-[var(--dw)]"
              style={{ '--dw': `${l.d[0]}px`, '--dh': `${l.d[1]}px`, '--mw': `${l.m[0]}px`, '--mh': `${l.m[1]}px` }}
            />
          )
          return (
            <li key={i} className="group relative flex">
              {l.link ? (
                <Link to={l.link} aria-label={`Read customer story ${i + 1}`} className="relative flex">
                  {box}
                  <span aria-hidden="true" className="absolute right-[-12px] top-[-3px] h-[4.8px] w-[4.8px] rounded-full bg-orange" />
                </Link>
              ) : box}
              {l.link && (
                <span role="tooltip" className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-[1] hidden -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink py-[6px] pl-[8px] pr-[6px] font-sans text-tooltip text-white lg:group-hover:block">
                  <span aria-hidden="true" className="absolute bottom-[calc(100%-4px)] left-1/2 h-[8px] w-[8px] -translate-x-1/2 rotate-45 bg-ink" />
                  <span className="relative">Read the story</span>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// ---------- B5 BenchmarkPanel ----------
export function BenchmarkPanel({ bullets = [3, 3], seed, lens = { h2: 33, p: 101, h3: [20, 22], li: [[71, 58, 53], [79, 77]] } }) {
  return (
    <section className="-mt-[10px] md:-mt-[30px] xl:-mt-[40px]">
      <div className="overflow-hidden pb-[64px] pt-[48px] md:pb-[98px] md:pt-[56px] xl:pb-[107px] xl:pt-[80px]">
        <Container className="flex flex-col items-center gap-[64px] xl:gap-[52px]">
          <SectionHead title={fitTitle(lens.h2, seed + 20)} className="w-full" h2Class="text-h2-mono-tall md:text-h2-mono-tall-sm lg:text-h2-mono-md xl:text-h2-mono-lg" pClass="text-[18px] leading-[25.2px] tracking-[0.36px] font-light">
            {fit(lens.p, seed + 21)}
          </SectionHead>
          <div className="w-full max-w-[1047px] border-2 border-ink bg-white p-[10px] lg:p-[20px]">
            <Placeholder ratio={`1003 / ${lens.chart || 243.3}`} label="Benchmark chart" />
          </div>
          <div className="grid w-full grid-cols-1 gap-[24px] md:w-auto md:grid-cols-[repeat(2,332px)] lg:grid-cols-[repeat(2,448px)] xl:grid-cols-[repeat(2,511.5px)]">
            {bullets.map((count, c) => (
              <div key={c} className="flex flex-col gap-[12px] border-2 border-sand-dark bg-cream p-[32px]">
                <h3 className="m-0 font-sans text-[20px] font-bold leading-[32px] tracking-[0.4px] text-ink">{fitTitle(lens.h3[c] ?? 21, seed * 9 + c)}</h3>
                <ul className="m-0 flex list-none flex-col gap-[8px] p-0">
                  {Array.from({ length: count }, (_, k) => (
                    <li key={k} className="flex gap-[12px]">
                      <span className="mt-[4px] flex h-[25px] w-[26px] shrink-0 items-center justify-center rounded-[100px] border-2 border-ink bg-apricot px-[5px] py-[6px] text-ink">
                        <Check />
                      </span>
                      <span className="font-sans text-[18px] font-normal leading-[28.8px] text-ink">{fit(lens.li[c]?.[k] ?? 65, seed * 11 + c * 5 + k)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="flex flex-col items-center gap-[16px] border-t-2 border-sand-dark px-[24px] pb-[60px] pt-[40px] md:px-[100px]">
        <Placeholder width={108} height={108} label="Mascot illustration" />
        {/* external benchmark site -> non-link */}
        <TextLink>SEE BENCHMARK RESULTS</TextLink>
      </div>
    </section>
  )
}

// ---------- B8 CompareCards ----------
const ORDER = ['clickhouse', 'databricks', 'postgresql', 'bigquery', 'redshift', 'snowflake']

// Card body length per comparison target (original character counts).
const CARD_LEN = { clickhouse: 222, databricks: 191, postgresql: 267, bigquery: 309, redshift: 273, snowflake: 230 }

export function CompareCards({ current }) {
  const navigate = useNavigate()
  const others = ORDER.filter((k) => k !== current)
  return (
    <section>
      <MarqueeBand label="MORE COMPARISONS" bg="bg-aqua" size="vs" copies={9} />
      <div className="py-[64px]">
        <Container className="flex flex-col gap-[40px] md:gap-[64px]">
          <h2 className="m-0 text-center font-mono font-normal uppercase text-ink text-h2-mono-tall-sm lg:text-h2-mono-md xl:text-left xl:text-h2-mono-lg">
            Choose a comparison
          </h2>
          <div className="grid grid-cols-1 justify-center gap-[24px] md:gap-[32px] md:grid-cols-[repeat(2,328px)] lg:grid-cols-[repeat(2,354px)] xl:grid-cols-[repeat(3,400.7px)] xl:justify-start xl:gap-[20px]">
            {others.map((k, i) => {
              const to = `/vs/${k}-alternative`
              return (
                <LiftCard
                  key={k}
                  lift={14}
                  press={false}
                  innerAs="article"
                  onClick={() => navigate(to)}
                  className="flex h-full cursor-pointer flex-col gap-[12px] border-2 border-ink bg-white p-[24px]"
                >
                  <div className="flex flex-col gap-[8px] md:gap-[16px]">
                    <span className="w-fit border-2 border-orange bg-peach px-[14px] py-[8px] font-mono text-[14px] leading-[14px] text-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-[8px]">
                      {/* -0.4px tracking <728 keeps the (longer) generic title on one line in the 290 column, as on the original */}
                      <h3 className="m-0 font-mono font-normal uppercase tracking-[-0.4px] text-card-h3-mono-md md:tracking-normal xl:text-card-h3-mono">
                        <Link to={to} className="text-ink no-underline" onClick={(e) => e.stopPropagation()}>
                          {BRAND} vs {COMPETITORS[k]}
                        </Link>
                      </h3>
                      {/* 5-line clamp: 128 (16/25.6) >=1302, 98 (14/19.6) below */}
                      <p className="m-0 line-clamp-5 max-h-[98px] overflow-hidden font-sans text-body-sm text-ink xl:max-h-[128px] xl:text-accordion-body">{fit(CARD_LEN[k], i + 70)}</p>
                    </div>
                  </div>
                  <TextLink size="sm" onClick={() => navigate(to)} className="self-start" tabIndex={-1}>LEARN MORE</TextLink>
                </LiftCard>
              )
            })}
          </div>
        </Container>
      </div>
    </section>
  )
}
