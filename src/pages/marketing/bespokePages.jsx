import { useRef } from 'react'
import QuoteSpotlight from '../../components/marketing/QuoteSpotlight.jsx'
import FAQ, { faqItems } from '../../components/marketing/FAQ.jsx'
import {
  LeftHero, InvestorLogos, ProgramBenefits, LogoMarquee, PersonaSplitSticky, ApplyForm, scrollToApply,
  ResearchChips, PaperList, TrustSection, RepoGrid, SocialCarousel,
} from '../../components/marketing/bespoke.jsx'

// T5 bespoke compositions (spec §4). Startups needs a shared ref (hero APPLY NOW -> ApplyForm).
export function StartupsPage() {
  const form = useRef(null)
  return (
    <>
      <LeftHero page="startups" seed={301} onApply={() => scrollToApply(form)} />
      <QuoteSpotlight variant="startups" tag="TRUSTED BY YOUNG TEAMS" lens={{ q: 384, strong: 0, name: 13, role: 18 }} seed={302} />
      <InvestorLogos seed={303} />
      <ProgramBenefits seed={304} />
      <LogoMarquee seed={305} />
      <PersonaSplitSticky seed={306} />
      <ApplyForm seed={307} formRef={form} />
      <FAQ items={faqItems(5, 308, undefined, { q: [16, 28, 58, 33, 50], a: [239, 212, 167, 130, 210] })} variant="full" tail />
    </>
  )
}

export function ResearchPage() {
  return (
    <>
      <LeftHero page="research" seed={311} />
      <ResearchChips />
      <PaperList seed={312} />
    </>
  )
}

export function TrustPage() {
  return (
    <>
      <LeftHero page="trust" seed={321} />
      <TrustSection seed={322} />
    </>
  )
}

export function CommunityPage() {
  return (
    <>
      <LeftHero page="community" seed={331} />
      <RepoGrid seed={332} />
      <SocialCarousel count={19} seed={333} />
    </>
  )
}
