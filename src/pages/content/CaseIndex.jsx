// L3 /case-studies: TitleHero -> TestimonialCarousel(6) -> CategoryChips(heading) -> CaseStudyCard grid(20).
import { useSearchParams } from 'react-router-dom'
import { Container } from '../../components/ui'
import CategoryChips from '../../components/content/CategoryChips.jsx'
import { TitleHero, TestimonialCarousel, CaseStudyCard } from '../../components/content/cases.jsx'
import { Doodle } from '../../components/content/bits.jsx'
import { caseStudies, caseSlides, CASE_CATEGORIES } from '../../components/content/data.js'

export default function CaseIndex() {
  const [params] = useSearchParams()
  const raw = params.get('category') || 'All'
  const cat = CASE_CATEGORIES.find((c) => c.toLowerCase() === raw.toLowerCase()) || 'All'
  const list = caseStudies().filter((c) => cat === 'All' || c.categories.includes(cat))
  // Chip clicks keep the scroll position: re-measured with a JS click on the live site (scrollY unchanged at
  // 1440 and 390). The spec's 686 / 443 targets were Playwright's own scroll-into-view before the click.
  return (
    <div className="relative overflow-x-clip">
      <TitleHero>Case Studies</TitleHero>
      <TestimonialCarousel slides={caseSlides()} />
      <Container className="pt-[64px]">
        <div className="flex flex-col gap-[24px] pb-[38px] md:gap-[32px] md:pb-[64px]">
          <h2 className="m-0 font-mono font-normal uppercase text-ink text-section-h2-mono-sm md:text-section-h2-mono-md xl:text-section-h2-mono-tall">Explore all case studies</h2>
          <CategoryChips labels={CASE_CATEGORIES} active={cat} hrefFor={(l) => (l === 'All' ? '/case-studies' : `/case-studies?category=${encodeURIComponent(l)}`)} />
        </div>
      </Container>
      <Container className="relative pb-[160px] xl:pb-[220px]">
        <Doodle kind="loop" className="absolute left-[-60px] top-[200px] h-[110px] w-[155px] rotate-[40deg]" />
        <Doodle kind="star" className="absolute right-[-40px] top-[600px] h-[89px] w-[89px]" />
        <Doodle kind="arc" className="absolute bottom-[40px] right-[-120px] h-[300px] w-[419px] rotate-[135deg]" />
        <div className="relative mx-auto grid max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-2 md:gap-[32px] xl:grid-cols-3">
          {list.map((c) => <CaseStudyCard key={c.slug} c={c} />)}
        </div>
      </Container>
    </div>
  )
}
