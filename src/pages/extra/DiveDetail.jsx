// X5 /dive-gallery/dives/:slug inside the dive-gallery chrome (own 66px nav; App hides the site header under
// /dive-gallery): back link -> dive card -> AI prompts (0-5+) -> comments -> dive-gallery footer.
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { DiveNav, DiveFooter } from '../../components/content/diveChrome.jsx'
import { BrowseDivesLink, DiveCard, PromptsUsed, Comments } from '../../components/extra/dive.jsx'
import { getDive } from '../../components/extra/data/content.js'

export default function DiveDetail() {
  const { slug } = useParams()
  const d = useMemo(() => getDive(slug), [slug])
  return (
    <div className="pt-[66px]">
      <DiveNav />
      <div className="mx-auto max-w-[1440px] px-[24px] py-[32px] lg:px-[100px] lg:py-[48px]">
        <div className="mx-auto max-w-[900px]">
          <BrowseDivesLink />
          <DiveCard d={d} />
          <PromptsUsed prompts={d.prompts} />
          <Comments comments={d.comments} />
        </div>
      </div>
      <DiveFooter />
    </div>
  )
}
