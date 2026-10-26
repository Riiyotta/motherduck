import { useLocation } from 'react-router-dom'
import MarqueeBand from '../../components/marketing/MarqueeBand.jsx'
import QuoteCarousel, { quoteSlides } from '../../components/marketing/QuoteCarousel.jsx'
import QuoteSpotlight from '../../components/marketing/QuoteSpotlight.jsx'
import StickyStack, { stackCards } from '../../components/marketing/StickyStack.jsx'
import FAQ, { faqItems } from '../../components/marketing/FAQ.jsx'
import CTABand from '../../components/marketing/CTABand.jsx'
import {
  ProductHeroCentered, SplitHero, ProblemCards, MediaFrame, CookbookGrid, VideoFrame, LiveEmbed, GalleryTeaser, BrowserWindowDemo,
} from '../../components/marketing/feature.jsx'
import { DuckLakeHero, FormatCompare, NewsletterSignup, CodeSample, ResourceCarousel } from '../../components/marketing/ducklake.jsx'
import { DarkHero, AlternatingFeatureRows } from '../../components/marketing/hypertenancy.jsx'
import {
  PersonaHero, PersonaSplitRows, FeatureGrid, ArchitecturePanel, YellowCTA, EcosystemDiagram, CaseStudyCarousel, ContactForm,
} from '../../components/marketing/persona.jsx'
import { UseCaseSplit, OldWorldNewWorld, AgentCardCarousel } from '../../components/marketing/overview.jsx'
import { StartupsPage, ResearchPage, TrustPage, CommunityPage } from './bespokePages.jsx'

// Product group (spec §4 T2 / T3 / T3b / T5). Each route is a block list: [Component, props].
const block = (C, p = {}) => [C, p]

// Persona split rows: side panels garden L / coral-red R / sun L (§3 B18)
// lens per row (original character counts @1440): { h2, p, items: [[h3, p], ...] }
// sized from the original's line counts per element @1440 (h2 24 cpl, p 64 cpl, h3 40 cpl, item p 78 cpl)
const ROW_LENS = {
  app: [
    { h2: 60, p: 864, items: [[28, 351], [60, 507]] },
    { h2: 60, p: 480, items: [[28, 273], [28, 195]] },
    { h2: 36, p: 352, items: [[28, 273], [28, 273]] },
  ],
  data: [
    { h2: 36, p: 224, items: [[60, 273], [28, 273]] },
    { h2: 36, p: 224, items: [[28, 429], [28, 507], [28, 429]] },
    { h2: 36, p: 160, items: [[28, 195], [60, 195]] },
  ],
  duckdb: [
    { h2: 20, p: 96, items: [[28, 60], [28, 117], [28, 117]] },
    { h2: 36, p: 96, items: [[28, 117], [28, 117], [28, 60]] },
    { h2: 36, p: 96, items: [[28, 117], [28, 117]] },
  ],
}
const personaRows = (key) => [
  { bg: 'garden', side: 'left', lens: ROW_LENS[key][0], inline: '/product/hypertenancy' },
  { bg: 'coral-red', side: 'right', lens: ROW_LENS[key][1], inline: '/product/dives' },
  { bg: 'sun', side: 'left', lens: ROW_LENS[key][2] },
]

const PAGES = {
  // ---------- T2 product feature ----------
  '/product/dives': [
    block(ProductHeroCentered, { chip: 'DIVES', page: 'dives', seed: 101 }),
    block(VideoFrame),
    block(MediaFrame, { headMax: 'max-w-[558px]', lens: [25, 62], seed: 102 }),
    block(StickyStack, { bg: 'bg-sun', borderBottom: true, intro: [25, 178], cards: stackCards(5, 103, ['/product/mcp-server', null, '/blog/replacing-our-bi-tool-with-dives', null, null], false, { h3: [38, 20, 28, 23, 25], body: [190, 128, 156, 141, 183] }), seed: 104 }),
    block(LiveEmbed, { lens: [15, 80, 41], seed: 105 }),
    block(GalleryTeaser, { lens: [26, 115], seed: 106 }),
    block(FAQ, { items: faqItems(8, 107, '/learn/skip-the-cache-embedded-analytics', { q: [15, 23, 49, 47, 28, 27, 41, 53], a: [274, 193, 235, 164, 85, 306, 152, 302] }), variant: 'dives' }),
    block(CTABand, { page: 'dives', lens: [34, 48, 'GET STARTED', null], seed: 108 }),
  ],
  '/product/ducklake': [
    block(DuckLakeHero, { seed: 111 }),
    block(FormatCompare, { lens: [32, 128], seed: 112 }),
    block(NewsletterSignup, { lens: [31, 174, 28], seed: 113 }),
    block(StickyStack, { bg: 'bg-yellow', borderBottom: true, introMax: 'max-w-[720px]', mobileWide: true, stackH: 600, intro: [30, 165], cards: stackCards(4, 114, ['/blog/lake-article-1', '/blog/lake-article-2', null, '/blog/lake-article-3'], false, { eyebrow: [9, 13, 20, 17], h3: [55, 32, 23, 21], body: [266, 217, 275, 166], labels: ['READ THE FULL WRITE-UP NOW', 'LEARN MORE', 'READ THE FULL WRITE-UP NOW', 'LEARN MORE'] }), seed: 115 }),
    block(CodeSample, { lens: [23, 143], seed: 116 }),
    block(ResourceCarousel, { count: 8, seed: 117 }),
    block(CTABand, { page: 'ducklake', lens: [33, 154, 'GET STARTED FOR FREE', 'VIEW ALL DOCUMENTATION'], seed: 118 }),
  ],
  '/product/flights': [
    block(ProductHeroCentered, { chip: 'FLIGHTS', status: 'Public Preview', deco: 'flights', page: 'flights', seed: 121 }),
    block(MediaFrame, { headMax: 'max-w-[853px]', lens: [43, 131], seed: 122 }),
    block(StickyStack, { bg: 'bg-sun', borderBottom: true, intro: [42, 156], cards: stackCards(4, 123, ['/product/pricing', null, null, null], false, { h3: [19, 41, 29, 43], body: [208, 218, 191, 175] }), seed: 124 }),
    block(QuoteSpotlight, { tag: 'WHAT OUR CUSTOMERS SAY', rule: 'sand', lens: { q: 193, strong: 0, name: 12, role: 7 }, seed: 125 }),
    block(CookbookGrid, { lens: { h2: 29, cards: [[23, 62], [24, 50], [24, 50], [23, 50], [25, 54], [27, 44]] }, seed: 126 }),
    block(FAQ, { items: faqItems(5, 127, undefined, { q: [17, 25, 45, 51, 25], a: [317, 46, 243, 452, 226] }), variant: 'flights' }),
    block(CTABand, { page: 'flights', lens: [26, 76, 'GET STARTED', 'VIEW THE DOCS'], seed: 128 }),
  ],
  '/product/guides': [
    block(ProductHeroCentered, { chip: 'GUIDES', deco: 'guides', page: 'guides', seed: 131 }),
    block(BrowserWindowDemo, { lens: [30, 104, 37, 68, 20], seed: 132 }),
    block(StickyStack, { bg: 'bg-yellow', borderBottom: true, guides: true, introMax: 'max-w-[800px]', introWeight400: true, intro: [21, 143], cards: stackCards(3, 133, null, true, { h3: [30, 25, 24], body: [163, 132, 131] }), seed: 134 }),
    block(FAQ, { items: faqItems(4, 135, undefined, { q: [16, 35, 38, 36], a: [384, 281, 203, 130] }), variant: 'guides' }),
    block(CTABand, { page: 'guides', lens: [23, 0, 'GET STARTED', null], seed: 136 }),
  ],
  '/product/mcp-server': [
    block(ProductHeroCentered, { chip: 'PLATFORM MCP SERVERS', page: 'mcp', seed: 141 }),
    block(ProblemCards, { lens: { h2: 43, p: 80, cards: [[41, 120], [40, 121], [15, 129]] }, seed: 142 }),
    block(StickyStack, { bg: 'bg-sun', borderBottom: true, introMax: 'max-w-[730px]', intro: [30, 165], cards: stackCards(4, 143, null, false, { h3: [18, 17, 36, 21], body: [197, 161, 123, 123] }), seed: 144 }),
    block(QuoteSpotlight, { tag: 'CUSTOMERS ARE TALKING NOW', link: '/case-studies/customer-six', lens: { q: 234, strong: 20, name: 10, role: 18 }, seed: 145 }),
    block(CTABand, { page: 'mcp', lens: [25, 0, 'GET STARTED', null], seed: 146 }),
  ],
  '/product/postgres-integration': [
    block(SplitHero, { lens: [20, 50, 86], seed: 151 }),
    block(ProblemCards, { lens: { h2: 37, h2Max: 'max-w-[465px] md:max-w-[355px] lg:max-w-[465px] lg:!text-h2-mono-lg', p: 82, cards: [[38, 123], [52, 145], [36, 148]] }, seed: 152 }),
    block(StickyStack, { bg: 'bg-sun', borderBottom: true, introMax: 'max-w-[700px]', intro: [34, 133], cards: stackCards(4, 153, null, false, { h3: [37, 41, 28, 28], body: [115, 100, 102, 102] }), seed: 154 }),
    block(QuoteSpotlight, { tag: 'BUILT ON OUR PLATFORM', link: '/case-studies/customer-seven', variant: 'postgres', lens: { q: 208, strong: 0, name: 11, role: 29 }, seed: 155 }),
    block(CTABand, { page: 'postgres', lens: [40, 0, 'GET STARTED', null], seed: 156 }),
  ],
  '/product/hypertenancy': [
    block(DarkHero, { seed: 161 }),
    block(QuoteCarousel, { slides: quoteSlides(1, 162, ['/case-studies/customer-eight'], { q: [214], name: [10], role: [23], logo: [120] }), variant: 'hypertenancy' }),
    block(AlternatingFeatureRows, { seed: 163 }),
    block(FAQ, { items: faqItems(6, 164, '/learn/skip-the-cache-embedded-analytics', { q: [21, 46, 52, 21, 62, 62], a: [350, 279, 279, 271, 323, 334] }), variant: 'hypertenancy' }),
    block(CTABand, { page: 'hypertenancy', cream: true, lens: [40, 130, 'GET STARTED FOR FREE', 'VIEW DOCUMENTATION'], seed: 165 }),
  ],

  // ---------- T3 persona ----------
  '/product/app-developers': [
    block(PersonaHero, { lens: [43, 107], seed: 171 }),
    block(PersonaSplitRows, { rows: personaRows('app'), seed: 172 }),
    block(FeatureGrid, { seed: 173 }),
    block(ArchitecturePanel, { tone: 'coral', tall: true, sub: 32, seed: 174 }),
    block(YellowCTA, { seed: 175 }),
    block(EcosystemDiagram),
    block(CaseStudyCarousel, { count: 4, seed: 176, tones: 'SSYS' }),
  ],
  '/product/data-teams': [
    block(PersonaHero, { lens: [49, 105], seed: 181 }),
    block(PersonaSplitRows, { rows: personaRows('data'), showcaseAfter: 1, seed: 182 }),
    block(FeatureGrid, { seed: 183 }),
    block(ArchitecturePanel, { tone: 'coral', seed: 184 }),
    block(YellowCTA, { seed: 185 }),
    block(EcosystemDiagram),
    block(CaseStudyCarousel, { count: 14, seed: 186, tones: 'SYSSSSSYSSSSST' }),
  ],
  '/product/duckdb-users': [
    block(PersonaHero, { variant: 'illustration', chip: true, smAlt: true, lens: [27, 190, 24], seed: 191 }),
    block(PersonaSplitRows, { rows: personaRows('duckdb'), seed: 192 }),
    block(FeatureGrid, { seed: 193 }),
    block(ArchitecturePanel, { tone: 'coral', seed: 194 }),
    block(EcosystemDiagram),
    block(CaseStudyCarousel, { count: 13, seed: 195, tones: 'TSYYSYSSSSSSS' }),
    block(FAQ, { items: faqItems(13, 196, undefined, { q: [42, 33, 39, 16, 15, 17, 53, 30, 58, 67, 36, 51], a: [285, 207, 141, 177, 176, 167, 311, 189, 183, 247, 149, 233] }), variant: 'full', tail: true }),
    block(ContactForm, { seed: 197 }),
  ],

  // ---------- T3b /product ----------
  '/product': [
    block(PersonaHero, { links: ['/product/data-teams', '/product/app-developers', '/product/mcp-server'], lens: [41, 35], seed: 91 }),
    block(MarqueeBand, { label: 'USE CASES', bg: 'bg-sun', size: 'product', copies: 17, still: true, borderBottom: false, className: 'mt-[24px] md:mt-[32px] xl:mt-[48px]' }),
    block(UseCaseSplit, { seed: 92 }),
    block(OldWorldNewWorld, { seed: 93 }),
    block(AgentCardCarousel, { seed: 94 }),
    block(ArchitecturePanel, { tone: 'ink', bg: 'sun', wide: true, seed: 95 }),
    block(FeatureGrid, { seed: 96 }),
    block(EcosystemDiagram),
    block(CaseStudyCarousel, { count: 13, seed: 97, tones: 'SYYSYSSSSSSST' }),
    block(FAQ, { items: faqItems(7, 98, '/blog/dosomething-motherduck-data-warehouse-ROI', { q: [48, 38, 31, 44, 40, 41, 34], a: [146, 78, 203, 105, 117, 125, 76] }), variant: 'full', tail: true }),
    block(ContactForm, { seed: 99, intro: 133 }),
  ],

  // ---------- T5 bespoke ----------
  '/startups': [block(StartupsPage)],
  '/research': [block(ResearchPage)],
  '/trust-and-security': [block(TrustPage)],
  '/community-and-open-source': [block(CommunityPage)],
}

export default function ProductRouter() {
  const { pathname } = useLocation()
  const blocks = PAGES[pathname.replace(/\/$/, '')] || PAGES['/product']
  return blocks.map(([Block, props], i) => <Block key={`${pathname}-${i}`} {...props} />)
}
