// X11 /research/:slug: hero -> article (ArticleProse, H2 anchors) + XL sticky sidebar (TOC + paper card);
// below 1302 the TOC renders first (static) and a floating "View Paper" button replaces the card.
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { headingsOf } from '../../components/content/articleGen.js'
import { ResearchHero, ResearchSidebar, TocBox, ViewPaperFab } from '../../components/extra/research.jsx'
import { getPaper } from '../../components/extra/data/content.js'

export default function ResearchPaper() {
  const { slug } = useParams()
  const p = useMemo(() => getPaper(slug), [slug])
  const toc = useMemo(() => headingsOf(p.body), [p])
  return (
    <>
      <ResearchHero p={p} />
      <div className="container">
        <div className="flex flex-col-reverse gap-[40px] pb-0 pt-[40px] md:pb-[112px] md:pt-[48px] lg:pt-[58px] xl:flex-row xl:gap-0 xl:pb-[176px]">
          <article className="xc-cq relative min-w-0 xl:max-w-[816px] xl:flex-1">
            <ArticleProse blocks={p.body} />
            <ViewPaperFab />
          </article>
          <TocBox toc={toc} className="w-full md:w-[196px] lg:w-[250px] xl:hidden" />
          <ResearchSidebar toc={toc} />
        </div>
      </div>
    </>
  )
}
