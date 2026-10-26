// X20 /duckdb-book-summary-chapter1..11: back link -> grid (XL: sticky sidebar left + article; below XL the
// form follows the article) -> optional full-bleed FAQ.
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { UnderlineLink } from '../../components/ui'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { FAQSection } from '../../components/content/videos.jsx'
import { ChapterSidebar, ChapterHeader, ChapterCta, BookPanel, ReadEbookBar } from '../../components/extra/bookChapter.jsx'
import { getChapter } from '../../components/extra/data/content.js'

export default function BookChapter() {
  const { pathname } = useLocation()
  const n = parseInt((pathname.match(/chapter(\d+)/) || [])[1] || '1', 10)
  const c = useMemo(() => getChapter(n), [n])
  return (
    <>
      <div className="container pb-[100px] pt-[40px] lg:pb-[130px] lg:pt-[60px] xl:pb-[160px] xl:pt-[64px]">
        <div className="mb-[36px] xl:mb-[44px]">
          <UnderlineLink to="/duckdb-book-brief#chapter-list" icon="left" uppercase className="flex-row-reverse">Back to table of contents</UnderlineLink>
        </div>
        <section className="flex flex-col gap-[40px] md:gap-[48px] xl:grid xl:grid-cols-[374px_824px] xl:gap-[44px]">
          {/* measured article gaps: 15 (SM, MD) / 24 (LG) / 32 (XL) */}
          <article className="flex min-w-0 flex-col gap-[15px] lg:gap-[24px] xl:order-2 xl:gap-[32px]">
            <ChapterHeader n={n} readMin={c.readMin} />
            <h1 className="xc-mono xc-chapter-h1 m-0 text-ink">{c.title}</h1>
            <ChapterCta cta={c.cta} />
            <BookPanel inline />
            <div className="xc-cq"><ArticleProse blocks={c.body} className="xc-flush-top" /></div>
          </article>
          <div className="xl:order-1"><ChapterSidebar /></div>
        </section>
      </div>
      {c.faqs.length > 0 && <div id="faqs"><FAQSection items={c.faqs} /></div>}
      <ReadEbookBar />
    </>
  )
}
