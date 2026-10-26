// X12 persona landing (PAGES_SPEC_EXTRA §6): /product/for-founders, /product/for-operators.
import { useLocation } from 'react-router-dom'
import {
  PersonaHero2, LogoStrip2, DarkFeatures, SplitMedia, GalleryRow, SecuritySplit, PricingBand2, IndustrySwiper, AgentLinks, ClosingBand2,
} from '../../components/extra/persona2.jsx'
import { PERSONA } from '../../components/extra/data/marketing.js'

const BLOCKS = {
  hero: PersonaHero2, logos: LogoStrip2, features: DarkFeatures, split: SplitMedia, gallery: GalleryRow,
  security: SecuritySplit, pricing: PricingBand2, agent: AgentLinks, closing: ClosingBand2,
}

export default function PersonaLanding() {
  const path = useLocation().pathname.replace(/\/$/, '')
  const d = PERSONA[path] || PERSONA['/product/for-founders']
  return (
    <>
      {d.order.map((k) => (k === 'swiper'
        ? <IndustrySwiper key={k} d={d} industries={d.industries} />
        : (() => { const B = BLOCKS[k]; return <B key={k} d={d} /> })()))}
    </>
  )
}
