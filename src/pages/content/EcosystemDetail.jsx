// L8 /ecosystem/:slug: PartnerDetail (sticky logo box + title/tags + prose + link icons).
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Placeholder } from '../../components/ui'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { EcoTags, LinkIcons } from '../../components/content/eco.jsx'
import { BackLink, Doodle } from '../../components/content/bits.jsx'
import { genArticle } from '../../components/content/articleGen.js'
import { getPartner } from '../../components/content/data.js'

export default function EcosystemDetail() {
  const { slug } = useParams()
  const p = getPartner(slug)
  const blocks = useMemo(() => genArticle(p.seed + 1600, 'partner'), [p.seed])
  // detail pages always show at least one link tile so the row is represented
  const icons = p.icons.length ? p.icons : [{ kind: 'docs', href: 'https://example.com/docs' }]
  return (
    <section className="relative overflow-x-clip pt-[44px] xl:pt-[80px]">
      <Doodle kind="burst" className="absolute right-[calc(50%-780px)] top-[75px] hidden h-[193px] w-[193px] xl:block" />
      <div className="container">
        <BackLink to="/ecosystem" small>BACK TO ECOSYSTEM</BackLink>
        <article className="grid grid-cols-1 pb-[80px] pt-[40px] md:grid-cols-[327px_1fr] md:gap-x-[24px] md:pb-[116px] md:pt-[32px] lg:grid-cols-[332px_1fr] xl:grid-cols-[392px_1fr] xl:gap-x-[48px]">
          <div className="max-md:order-2 md:row-span-3">
            <div className="relative md:sticky md:top-[160px] xl:top-[186px]">
              <div className="grid aspect-square w-full place-items-center rounded-sm border-2 border-ink bg-white p-[40px] md:w-[327px] lg:w-[332px] xl:w-[392px]">
                <Placeholder label={`${p.name} logo`} className="h-[120px] w-full max-w-[308px]" />
              </div>
              <svg viewBox="0 0 100 100" className="absolute bottom-[-35px] right-[80px] h-[58px] w-[58px] rotate-[30deg] md:h-[69px] md:w-[69px]" aria-hidden="true">
                <path d="M50 30a12 12 0 1 1 0-24 12 12 0 1 1 0 24zm0 64a12 12 0 1 1 0-24 12 12 0 1 1 0 24zM30 50a12 12 0 1 1-24 0 12 12 0 1 1 24 0zm64 0a12 12 0 1 1-24 0 12 12 0 1 1 24 0z" fill="#50C7B7" stroke="#383838" strokeWidth="2" />
                <circle cx="50" cy="50" r="12" fill="#FFFFFF" stroke="#383838" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="max-w-[332px] pb-[24px] pt-0 max-md:order-1 md:pt-[28px] md:max-w-[480px] md:pb-0 xl:max-w-[800px] xl:pt-[36px]">
            <h1 className="m-0 font-mono font-normal uppercase text-ink text-partner-h1-sm md:text-partner-h1-lg xl:text-partner-h1">{p.name}</h1>
            <EcoTags tags={p.tags} className="pt-[8px]" />
          </div>
          <div className="mt-[32px] max-w-[816px] max-md:order-3">
            <ArticleProse blocks={blocks} />
          </div>
          <div className="pb-[16px] pt-[24px] max-md:order-4 md:pt-[24px] xl:pb-[28px]">
            <LinkIcons icons={icons} gap="gap-[12px]" collapse={false} />
          </div>
        </article>
      </div>
    </section>
  )
}
