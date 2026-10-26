// L4 /case-studies/:slug, live top-level order inside <main>: section (back row + H1) -> section QuoteBand(+ProfileCard) ->
// article (lede + prose) -> section FAQ (only where the original has one, e.g. finqore) -> an absolutely positioned
// back-to-top rail spanning hero..last section. Measured slugs (caseProfiles.js) keep the original's block types and character
// counts; any other slug falls back to the generic case mix.
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { CaseDetailHero, QuoteBand, BackToTop } from '../../components/content/cases.jsx'
import { Doodle } from '../../components/content/bits.jsx'
import { genArticle, genCaseBody } from '../../components/content/articleGen.js'
import { getCase } from '../../components/content/data.js'
import FAQ, { faqItems } from '../../components/marketing/FAQ.jsx'

function useSpan(fromRef, toRef) {
  const [box, setBox] = useState(null)
  useLayoutEffect(() => {
    const a = fromRef.current
    const b = toRef.current
    if (!a || !b) return undefined
    const on = () => {
      const top = a.getBoundingClientRect().top + window.scrollY
      setBox({ top, height: b.getBoundingClientRect().bottom + window.scrollY - top })
    }
    on()
    const ro = new ResizeObserver(on)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [fromRef, toRef])
  return box
}

export default function CaseDetail() {
  const { slug } = useParams()
  const c = getCase(slug)
  const blocks = useMemo(() => (c.profile ? genCaseBody(c.profile.b, c.seed + 400) : genArticle(c.seed + 400, 'case')), [c])
  const faq = c.profile?.faq
  const heroRef = useRef(null)
  const endRef = useRef(null)
  const rail = useSpan(heroRef, endRef)
  return (
    <>
      <CaseDetailHero c={c} innerRef={heroRef} />
      <QuoteBand c={c} />
      <article className="relative overflow-x-clip">
        <div className="container relative pb-[40px] lg:pb-[32px] xl:pr-[450px]">
          <Doodle kind="arc" className="absolute right-[-200px] top-[700px] hidden h-[500px] w-[830px] rotate-[215deg] xl:block" />
          <Doodle kind="dot" fill="#383838" className="absolute right-[120px] top-[640px] hidden h-[20px] w-[20px] xl:block" />
          <Doodle kind="dot" fill="#383838" className="absolute right-[300px] top-[1300px] hidden h-[20px] w-[20px] xl:block" />
          <p className="relative m-0 border-l-2 border-sky-hover pl-[24px] font-sans text-ink text-case-lede-lg xl:text-case-lede">{c.lede}</p>
          <div className="relative pb-[72px] pt-[40px] md:pb-[24px] md:pt-[32px] lg:pb-[128px]">
            <ArticleProse blocks={blocks} className="max-w-[816px]" />
          </div>
        </div>
      </article>
      {faq && <FAQ items={faqItems(faq.q.length, c.seed + 700, undefined, { q: faq.q, a: faq.a })} variant="full" tail />}
      <div ref={endRef} aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 right-0" style={rail ? { top: rail.top, height: rail.height } : { top: 0, height: 0 }}>
        <BackToTop />
      </div>
    </>
  )
}
