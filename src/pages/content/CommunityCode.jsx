// L11 /community-code: ProsePage (P1). Links are mailto: only -> rendered as non-links.
import { useMemo } from 'react'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { genArticle } from '../../components/content/articleGen.js'
import { shaped } from '../../components/content/lorem.js'

const H1 = shaped([9, 4, 2, 7], 9701) // live: 25ch, 1 line @1440, 2 @768, 3 @390

export default function CommunityCode() {
  const blocks = useMemo(() => genArticle(42, 'community'), [])
  return (
    <div className="container pb-[24px] pt-0 lg:pb-[48px] lg:pt-[34px] xl:pt-[24px]">
      {/* live: no max-width (1 line @1440); padding 64/36 at >=960, 40/32 below */}
      <h1 className="m-0 pb-[32px] pt-[40px] font-mono text-[48px] font-normal uppercase leading-[67.2px] text-ink lg:pb-[36px] lg:pt-[64px] lg:leading-[57.6px]">{H1}</h1>
      <div className="grid grid-cols-1 pb-[112px]">
        <ArticleProse blocks={blocks} className="max-w-[816px]" />
      </div>
    </div>
  )
}
