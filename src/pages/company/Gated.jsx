import { useLocation, useParams } from 'react-router-dom'
import '../../styles/company.css'
import PageStub from '../PageStub.jsx'
import {
  LPHero, LPSection, BenchmarkCards, StatRow, TwoColProse, CardGrid, FindingCards, NumberedList, DarkFeatureGrid,
  PartCards, SplitChecklist, AuthorsGrid, FAQSection, MutedCardGrid, SpectrumCards, InsightWithBars, CodeWindow,
  PgSignCards, PgArchitecturePanel, PgChapterList, PgQuoteCards, GatedFormSection,
} from '../../components/company/lp.jsx'
import { BookHero, BookBody } from '../../components/company/book.jsx'
import { filler, heading } from '../../components/company/copy.js'

const SKY = '#6FC2FF'
const SUN = '#FFDE00'
const TEAL_B = '#53DBC9'
const ORANGE = '#E87D2F'
const BI_FAQ_LINKS = [
  ['/videos/mcp-understand-it-set-it-up-use-it', 'this walkthrough'],
  ['/videos/more-than-a-vibe-ai-driven-sql-that-actually-works', 'this talk'],
  [],
  ['/videos/text-to-sql-data-modeling-llms-mcp-dives', 'this session'],
]

// PAGES_SPEC_COMPANY §5: each gated route = LPHero -> N x LPSection -> GatedFormSection.
const PAGES = {
  // [chars, seed] pairs below are tuned so every block wraps to the original's line counts (pixel audit)
  'ai-analytics-eval-field-guide-full': () => (
    <>
      <LPHero chip="Practical guide · free download" h1={heading(52, 4925)} sub={heading(30, 4581)} finePrint={filler(55, 3275)} cta="Get the guide" />
      <LPSection bg="sun" title={heading(18, 2141)} intro={filler(153, 838)} introMb={32}>
        <BenchmarkCards notes={[[43, 4736], [43, 3142]]} />
        <StatRow stats={['6 parts', '3 viewpoints', '5 setups', '−$25']} notes={[[40, 3628], [46, 2141], [37, 2816], [43, 4502]]}
          cols="grid-cols-[134.8px_221.6px_152.2px_113.5px] md:grid-cols-[134.8px_221.6px_152.2px_131.5px] lg:grid-cols-[216.8px_221.6px_216.8px_216.8px]" />
      </LPSection>
      <LPSection bg="white" title={heading(109, 681)}><TwoColProse paras={[[207, 2068], [191, 4114]]} /></LPSection>
      <LPSection bg="cream" title={heading(25, 583)}>
        <CardGrid count={4} items={[[16, 2818, 83, 2189], [13, 157, 126, 4495], [10, 2176, 139, 1042], [24, 4824, 91, 3879]]} />
      </LPSection>
      <LPSection bg="white" title={heading(23, 3277)} intro={filler(59, 4105)} introMaxW={560}>
        <CardGrid count={3} cols={3} tabs={['The framework', 'The worked case', 'The weekly check']} items={[[22, 2864, 161, 2926], [32, 2222, 156, 1195], [17, 2696, 146, 4819]]} />
      </LPSection>
      <LPSection bg="teal" title={heading(12, 3529)} intro={filler(89, 399)}>
        <CardGrid count={7} steps shadow="shadow-hard-4" mt={32}
          items={[[22, 4662, 131, 3672], [19, 4971, 90, 1303], [19, 4108, 92, 1296], [15, 1295, 81, 1313], [15, 2321, 120, 4218], [33, 2214, 90, 1597], [20, 4419, 99, 2505]]} />
      </LPSection>
      <GatedFormSection title="Get the guide" intro={filler(71, 523)} />
    </>
  ),
  'data-ai-survey-full': () => (
    <>
      <LPHero chip="Practical report · free download" h1={heading(90, 4903)} sub={heading(58, 4590)} finePrint={filler(111, 3275)} cta="Get the report" />
      <LPSection bg="sun" title={heading(21, 2141)} intro={filler(165, 838)} introMb={32}>
        <FindingCards />
        <StatRow stats={['6 pages', '40 : 60', '3 moves', '4 weeks']} notes={[[44, 3628], [55, 2138], [46, 2823], [37, 4501]]}
          cols="grid-cols-[173.6px_102.3px_134.8px_134.8px] md:grid-cols-[173.6px_155.5px_155.5px_155.5px] lg:grid-cols-[repeat(4,218px)]" />
      </LPSection>
      <LPSection bg="white" title={heading(28, 681)}><NumberedList /></LPSection>
      <GatedFormSection title="Get the report" intro={filler(86, 524)} />
    </>
  ),
  'ducklake-lakehouse-table-format-book-full': () => (
    <>
      <LPHero chip="Free book · early release" h1={heading(31, 4899)} sub={heading(56, 4595)} body={filler(197, 3349)} finePrint={filler(109, 3275)} cta="Get early access" />
      <LPSection bg="ink" title={heading(12, 2141)} intro={filler(195, 838)}>
        <DarkFeatureGrid rules={[SKY, SKY, SKY, SUN, SUN, SUN]}
          items={[[20, 667, 60, 3193], [14, 344, 62, 102], [14, 3669, 63, 3269], [20, 3553, 64, 367], [18, 3337, 67, 317], [16, 682, 49, 2713]]} />
      </LPSection>
      <LPSection bg="white" title={heading(23, 682)} intro={filler(61, 975)} introTone="ink">
        <PartCards items={[[21, 2166, 186, 683], [30, 4827, 163, 2276], [27, 3098, 165, 4552]]} />
      </LPSection>
      <LPSection bg="cream" title={heading(29, 583)}>
        <SplitChecklist paras={[[227, 4192], [273, 4027]]} title={[25, 2622]} checks={[[49, 4459], [44, 1494], [33, 676], [44, 120]]} />
      </LPSection>
      <LPSection bg="sun" title={heading(16, 3274)} intro={filler(70, 4105)} introTone="ink"><AuthorsGrid bios={[[519, 3818], [448, 1727]]} /></LPSection>
      <FAQSection count={5} title={heading(26, 4927)} qs={[[53, 1125], [10, 3785], [32, 2519], [27, 4502], [19, 492]]}
        as={[[117, 3396], [81, 3826], [238, 1696], [215, 4853], [200, 3063]]} />
      <GatedFormSection title={heading(32, 1434)} intro={filler(81, 549)} />
    </>
  ),
  'guide-to-bi-in-the-agentic-era-full': () => (
    <>
      <LPHero chip="Practical guide · free download" h1={heading(30, 4899)} sub={heading(72, 4581)} body={filler(182, 3347)} finePrint={filler(73, 3276)} cta="Download free guide" />
      <LPSection bg="ink" title={heading(25, 2141)} intro={filler(198, 838)}>
        <DarkFeatureGrid rules={[ORANGE, ORANGE, ORANGE]} items={[[23, 663, 114, 3210], [19, 405, 132, 208], [21, 3698, 126, 3279]]} />
      </LPSection>
      <LPSection bg="white" title={heading(23, 682)} intro={filler(100, 975)} introTone="ink">
        <MutedCardGrid items={[[12, 2522, 128, 1120], [27, 4788, 175, 3085], [33, 1854, 145, 238], [33, 4240, 151, 4075], [25, 3807, 144, 4060], [32, 4767, 159, 2537]]} />
      </LPSection>
      <LPSection bg="ink" title={heading(27, 583)}>
        <p className="m-0 mb-[16px] max-w-[640px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-white opacity-70">{filler(189, 3968)}</p>
        <SpectrumCards />
      </LPSection>
      <LPSection bg="cream" title={heading(15, 3274)}><InsightWithBars quote={[309, 4898]} caption={[19, 1123]} /></LPSection>
      <FAQSection count={9} links={BI_FAQ_LINKS} title={heading(26, 4927)}
        qs={[[25, 1123], [26, 3787], [49, 2597], [28, 4503], [40, 492], [38, 4002], [31, 3368], [40, 271], [14, 393]]}
        as={[[248, 3396], [170, 3826], [320, 1696], [252, 4853], [428, 3052], [444, 4266], [528, 103], [444, 808], [391, 2427]]} />
      <GatedFormSection title={heading(18, 1428)} intro={filler(65, 523)} />
    </>
  ),
  'postgres-analytics-guide-full': () => (
    <>
      <LPHero chip="Practical guide · free download" h1={heading(17, 4899)} sub={heading(74, 4581)} finePrint={filler(73, 3276)} cta="Get the guide" media="image" />
      <LPSection bg="white">
        <PgSignCards eyebrow={[50, 4440]} title={[50, 1280]} intro={[147, 3148]}
          items={[[36, 3935, 138, 3163], [38, 2496, 133, 4136], [38, 3526, 142, 1124], [41, 4251, 140, 3509], [36, 212, 135, 768], [34, 25, 138, 3649], [28, 2989, 101, 4729]]} />
      </LPSection>
      <LPSection bg="cream"><PgArchitecturePanel eyebrow={[19, 3550]} title={[33, 175]} intro={[193, 4218]} bodies={[[90, 3422], [91, 3828], [124, 1717]]} /></LPSection>
      <LPSection bg="white">
        <PgChapterList eyebrow={[26, 324]} title={[55, 2358]} callout={[[51, 34], [192, 4215]]}
          rows={[[16, 549, 73, 307], [12, 2768, 76, 2858], [30, 2407, 73, 3793], [28, 3754, 73, 2312], [26, 4867, 71, 4393], [15, 4484, 72, 3678], [21, 2187, 83, 525]]} />
      </LPSection>
      <LPSection bg="sun"><PgQuoteCards eyebrow={[46, 881]} title={[47, 1745]} quotes={[[106, 1268], [176, 3785], [142, 2651]]} /></LPSection>
      <GatedFormSection title={heading(34, 1432)} intro={filler(79, 526)} />
    </>
  ),
  'duckdb-cheatsheet-full': () => (
    <>
      <LPHero chip="Cheatsheet · free download" h1={heading(25, 4900)} sub={heading(102, 4581)} body={filler(304, 3348)} cta="Get the cheatsheet" media="image" finePrint={false} />
      <LPSection bg="ink" title={heading(31, 2141)} intro={filler(72, 838)}>
        <DarkFeatureGrid rules={[SKY, SUN, TEAL_B]} items={[[21, 664, 258, 3194], [38, 342, 198, 235], [28, 3669, 169, 3267]]} />
      </LPSection>
      <LPSection bg="teal" title={heading(19, 680)} intro={filler(95, 975)} introTone="ink"><CodeWindow /></LPSection>
      <GatedFormSection title={heading(30, 1428)} intro={filler(56, 523)} />
    </>
  ),
}

// gated key: /lp/:slug (G template), /duckdb-cheatsheet-full (G), /duckdb-book-brief (H)
export default function Gated() {
  const { pathname } = useLocation()
  const { slug } = useParams()
  const path = pathname.replace(/\/$/, '')
  if (path === '/duckdb-book-brief') {
    return (
      <>
        <BookHero />
        <BookBody />
      </>
    )
  }
  const key = path === '/duckdb-cheatsheet-full' ? 'duckdb-cheatsheet-full' : slug
  const Page = PAGES[key]
  return Page ? <Page /> : <PageStub template="gated" />
}
