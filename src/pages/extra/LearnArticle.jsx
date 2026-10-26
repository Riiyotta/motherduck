// X7 /learn/:slug: sand hero -> article + sticky sidebar (TOC + Start card; FAB + end-of-article card below 1302)
// -> FAQ -> ReadNext.
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { TocFab, FAQSection } from '../../components/content/videos.jsx'
import { headingsOf } from '../../components/content/articleGen.js'
import { LearnHero, LearnSidebar, StartCard } from '../../components/extra/learn.jsx'
import ReadNextGrid from '../../components/extra/readNext.jsx'
import { getLearn } from '../../components/extra/data/content.js'

export default function LearnArticle() {
  const { slug } = useParams()
  const a = useMemo(() => getLearn(slug), [slug])
  const toc = useMemo(() => headingsOf(a.body), [a])
  return (
    <>
      <LearnHero a={a} />
      <div className="container">
        <div className="relative flex flex-col gap-[20px] pb-[124px] pt-[40px] md:gap-[44px] md:pt-[48px] lg:pt-[58px] xl:flex-row xl:justify-between xl:gap-0 xl:pb-[132px]">
          <div className="xc-cq min-w-0 xl:max-w-[816px] xl:flex-1"><ArticleProse blocks={a.body} /></div>
          <LearnSidebar toc={toc} />
          <div className="xl:hidden"><StartCard inline /></div>
          <TocFab toc={toc} />
        </div>
      </div>
      {a.faqs.length > 0 && <div id="faqs"><FAQSection items={a.faqs} /></div>}
      <ReadNextGrid items={a.readNext} footer={{ to: '/learn', label: 'View all articles' }} />
    </>
  )
}
