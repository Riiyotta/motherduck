import { useLocation } from 'react-router-dom'
import QuoteCarousel, { quoteSlides } from '../../components/marketing/QuoteCarousel.jsx'
import FAQ, { faqItems } from '../../components/marketing/FAQ.jsx'
import { PersonaSplitRows } from '../../components/marketing/persona.jsx'
import {
  PricingHero, TierCards, PlanMatrix, InstancesSection, FinalCTA, DuckDBSupportPanel,
} from '../../components/marketing/pricing.jsx'

// T4 pricing (spec §4): /product/pricing is a composition of pricing blocks; /product/pricing/duckdb-support
// is the one-section DuckDBSupportPanel sharing the PricingTabs pill.
const VALUE_ROWS = [
  { id: 'built-for-humans', bg: 'coral-red', side: 'left', link: '/about-us', lens: { h2: 34, p: 410 } },
  { id: 'support-with-heart', bg: 'sun', side: 'right', link: '/customer-support', lens: { h2: 20, p: 292 } },
  { id: 'gold-standard', bg: 'teal', side: 'left', link: '/trust-and-security#Compliance', lens: { h2: 26, p: 398 } },
]

const PAGES = {
  '/product/pricing': [
    [PricingHero, { seed: 201 }],
    [TierCards, { seed: 202 }],
    [QuoteCarousel, { slides: quoteSlides(2, 203), variant: 'pricing' }],
    [PlanMatrix, { seed: 204 }],
    [InstancesSection, { seed: 205 }],
    [PersonaSplitRows, { rows: VALUE_ROWS, variant: 'compact', seed: 206 }],
    [FAQ, { items: faqItems(16, 207, '/support-policy', { q: [34, 54, 40, 26, 75, 38, 47, 57, 46, 34, 36, 45, 36, 64, 49, 27], a: [236, 164, 198, 222, 518, 379, 247, 126, 43, 235, 155, 500, 489, 171, 163, 126] }), variant: 'full', tail: true, fullMr: 'xl:mr-[281.8px]' }], // live: trailing empty ruled row; questions span the full 920 / 688 row below 1302, 960 (mr 281.8) at XL
    [FinalCTA, { seed: 208 }],
  ],
  '/product/pricing/duckdb-support': [[DuckDBSupportPanel, { seed: 210 }]],
}

export default function Pricing() {
  const { pathname } = useLocation()
  const blocks = PAGES[pathname.replace(/\/$/, '')] || PAGES['/product/pricing']
  return blocks.map(([Block, props], i) => <Block key={`${pathname}-${i}`} {...props} />)
}
