import { useLocation } from 'react-router-dom'
import MarqueeBand from '../../components/marketing/MarqueeBand.jsx'
import QuoteCarousel, { quoteSlides } from '../../components/marketing/QuoteCarousel.jsx'
import StickyStack, { stackCards } from '../../components/marketing/StickyStack.jsx'
import FAQ, { faqItems } from '../../components/marketing/FAQ.jsx'
import CTABand from '../../components/marketing/CTABand.jsx'
import { VsHero, ComparisonTable, LastUpdated, LogoBar, BenchmarkPanel, CompareCards } from '../../components/marketing/vs.jsx'
import { COMPETITORS } from '../../components/marketing/copy.js'

// T1 vs comparison (spec §4 T1): one data-driven template for all six /vs/* routes.
// Copy is placeholder text sized to the original's character counts per element (measured @1440), so
// line wraps and block heights follow the original: hero [h1, h2, p]; table rows [label, competitor, ours];
// bench (null = no BenchmarkPanel); quote / stack / faq / cta lengths.
const STACK_H3 = [25, 23, 25, 18, 19]
const STACK_LABELS = ['LEARN MORE', 'LEARN MORE', 'START BUILDING', 'SEE IT LIVE', 'LEARN MORE']
const FAQ_TAIL = { q: [46, 21, 44], a: [238, 150, 323] }
const faqLens = (q, a) => ({ q: [...q, ...FAQ_TAIL.q], a: [...a, ...FAQ_TAIL.a] })
const CONFIG = {
  snowflake: {
    // comparison-table competitor logo (live, 196 wide)
    logo: 44,
    seed: 11, hero: [55, 76, 222], tail: 'Faster data for every team', lede: 227,
    rows: [[12, 72, 90], [10, 96, 86], [14, 120, 79], [19, 67, 71], [17, 74, 91], [14, 14, 68], [28, 66, 101], [30, 82, 74]],
    bench: { h2: 33, p: 101, h3: [20, 22], li: [[71, 58, 53], [79, 77]] },
    quote: { q: [116, 210, 113], name: [13, 11, 12], role: [24, 16, 3], logo: [121.9, 142.2, 172] },
    stack: [31, 193, [290, 272, 252, 265, 282]],
    faq: faqLens([43, 57, 55, 51, 38], [325, 191, 385, 310, 97]), faqLink: '/learn/top-snowflake-alternatives-2026',
    cta: 32,
  },
  clickhouse: {
    // comparison-table competitor logo (live, 196 wide)
    logo: 36,
    seed: 12, hero: [40, 48, 232], lede: 363,
    rows: [[12, 131, 98], [11, 118, 80], [10, 131, 108], [11, 148, 50], [22, 104, 151], [14, 14, 108], [17, 99, 100], [28, 51, 110]],
    bench: null,
    quote: { q: [97, 210, 224], name: [11, 11, 13], role: [17, 16, 28], logo: [189.6, 142.2, 189.6] },
    stack: [32, 241, [362, 344, 341, 359, 448]],
    faq: faqLens([40, 65, 39, 51], [426, 261, 360, 357]),
    cta: 34,
  },
  databricks: {
    // comparison-table competitor logo (live, 196 wide)
    logo: 33,
    seed: 13, hero: [47, 44, 191], lede: 307,
    rows: [[12, 103, 98], [10, 94, 76], [11, 88, 50], [14, 101, 85], [14, 14, 108], [17, 57, 100], [17, 71, 102], [28, 68, 110]],
    bench: { chart: 242.4, h2: 33, p: 137, h3: [20, 39], li: [[106, 96, 100], [123, 112, 78]] },
    quote: { q: [210, 139, 204], name: [11, 10, 15], role: [16, 3, 3], logo: [142.2, 272.5, 48.6] },
    stack: [32, 160, [275, 265, 254, 282, 270]],
    faq: faqLens([57, 56, 45, 51], [251, 312, 142, 283]),
    cta: 29,
  },
  redshift: {
    // comparison-table competitor logo (live, 196 wide)
    logo: 77, logoSm: [101, 40], wide: true,
    seed: 14, hero: [43, 51, 273], lede: 323,
    rows: [[12, 79, 98], [10, 106, 91], [11, 89, 50], [14, 61, 79], [17, 60, 138], [14, 14, 108], [17, 59, 100], [14, 64, 35]],
    bench: { chart: 190.4, h2: 33, p: 103, h3: [20, 22], li: [[107, 76, 76], [93, 110, 103]] },
    quote: { q: [111, 115, 162], name: [10, 13, 10], role: [3, 3, 10], logo: [138.4, 167, 254.8] },
    stack: [30, 201, [282, 264, 276, 277, 269]],
    faq: faqLens([56, 44, 55, 54, 42, 31], [368, 321, 206, 278, 160, 223]),
    cta: 36,
  },
  bigquery: {
    // comparison-table competitor logo (live, 196 wide)
    logo: 67,
    seed: 15, hero: [35, 49, 309], lede: 359,
    rows: [[12, 37, 98], [10, 113, 90], [19, 117, 96], [15, 125, 89], [14, 132, 133], [14, 14, 108], [17, 56, 100], [28, 135, 122], [16, 52, 35], [28, 69, 101]],
    bench: { chart: 130.9, h2: 33, p: 122, h3: [20, 38], li: [[91, 76, 64], [90, 99, 109]] },
    quote: { q: [210, 212, 127], name: [11, 12, 11], role: [16, 3, 16], logo: [142.2, 172, 133] },
    stack: [30, 207, [289, 259, 295, 270, 279]],
    faq: faqLens([36, 42, 55, 54, 51], [409, 366, 323, 278, 234]), faqLink: '/learn/data-warehouse-tco',
    cta: 29,
  },
  postgresql: {
    // comparison-table competitor logo (live, 196 wide)
    logo: 51,
    seed: 16, hero: [34, 38, 267], lede: 246,
    rows: [[12, 128, 141], [13, 90, 106], [22, 15, 115], [17, 90, 105], [13, 123, 98], [25, 125, 100], [14, 14, 108], [17, 74, 100], [14, 31, 85], [28, 37, 110]],
    bench: { chart: 139.3, h2: 33, p: 128, h3: [27, 37], li: [[129, 98, 123], [126, 106, 77]] },
    quote: { q: [336, 116, 127], name: [9, 13, 11], role: [10, 24, 16], logo: [148.6, 121.9, 133] },
    stack: [46, 202, [318, 305, 274, 307, 271]],
    faq: faqLens([46, 48, 56, 51], [291, 256, 236, 253]),
    cta: 40,
  },
}

// StickyStack links: 3 internal + 2 docs (docs -> non-link)
const STACK_LINKS = ['/product/hypertenancy', '/product/pricing', null, '/product/dives', null]
const CASE_LINKS = ['/case-studies/customer-one', '/case-studies/customer-two', '/case-studies/customer-three']

export default function VsPage() {
  const { pathname } = useLocation()
  const key = pathname.split('/')[2]?.replace('-alternative', '')
  const c = CONFIG[key] || CONFIG.snowflake
  const name = COMPETITORS[key] || COMPETITORS.snowflake
  return (
    <>
      <VsHero name={name} seed={c.seed} lens={c.hero} tail={c.tail} />
      <MarqueeBand label="WHY CHOOSE US?" bg="bg-yellow" size="vs" copies={9} />
      <ComparisonTable name={name} rows={c.rows} seed={c.seed} lede={c.lede} logo={c.logo} logoSm={c.logoSm} wide={c.wide} />
      <LastUpdated />
      <LogoBar />
      {c.bench && <BenchmarkPanel bullets={c.bench.li.map((l) => l.length)} lens={c.bench} seed={c.seed} />}
      <QuoteCarousel slides={quoteSlides(3, c.seed, key === 'postgresql' ? [null, ...CASE_LINKS.slice(1)] : CASE_LINKS, c.quote)} variant="vs" tag="NOTES FROM REAL DATA TEAMS" />
      <StickyStack
        bg="bg-sun"
        vs
        cards={stackCards(5, c.seed, STACK_LINKS, false, { h3: STACK_H3, body: c.stack[2], labels: STACK_LABELS })}
        introMax="max-w-[820px]"
        intro={[c.stack[0], c.stack[1]]}
        seed={c.seed + 30}
      />
      <CompareCards current={key} />
      <FAQ items={faqItems(0, c.seed, c.faqLink, c.faq)} variant="full" borderTop />
      <CTABand variant="vs" lens={[c.cta, 66, 'GET STARTED', 'GET A DEMO']} seed={c.seed + 40} />
    </>
  )
}
