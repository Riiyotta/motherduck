// X2 /glossary/:slug: 1000 column (back link -> H1 -> meta -> lede -> prose -> related terms -> optional FAQ)
// -> full-bleed ReadNext -> footer.
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { FAQSection } from '../../components/content/videos.jsx'
import { BackToGlossary, RelatedTerms, TermPromo } from '../../components/extra/glossary.jsx'
import ReadNextGrid from '../../components/extra/readNext.jsx'
import { getTerm } from '../../components/extra/data/content.js'

export default function GlossaryTerm() {
  const { slug } = useParams()
  const t = useMemo(() => getTerm(slug), [slug])
  return (
    <>
      <div className="container pb-[24px] pt-0 lg:pb-[48px] lg:pt-[34px] xl:pt-[24px]">
        <div className="mx-auto max-w-[1000px]">
          <BackToGlossary />
          <h1 className="xc-mono xc-gloss-h1 m-0 pb-[16px] pt-[12px] text-ink">{t.term}</h1>
          <span className="block pb-[16px] font-sans text-[14px] leading-[14px] text-ink opacity-60">Last updated <time>{t.updated}</time></span>
          <p className="m-0 pb-[32px] font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] text-gray-500">{t.summary}</p>
          <div className="xc-cq">
            {t.promo ? (
              <>
                {t.promo.at > 0 && <ArticleProse blocks={t.body.slice(0, t.promo.at)} className="xc-flush-top" />}
                <TermPromo p={t.promo} />
                <ArticleProse blocks={t.body.slice(t.promo.at)} className={t.promo.at > 0 ? '' : 'xc-flush-top'} />
              </>
            ) : <ArticleProse blocks={t.body} className="xc-flush-top" />}
          </div>
          <RelatedTerms terms={t.related} />
          {t.faqs.length > 0 && <div id="faqs" className="xc-faq-col"><FAQSection items={t.faqs} /></div>}
        </div>
      </div>
      <ReadNextGrid items={t.readNext} footer={{ to: '/glossary', label: 'View all terms' }} />
    </>
  )
}
