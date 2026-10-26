// L6 /videos/:slug: SandBand -> back link -> VideoPlayerFrame -> VideoMeta -> body + sidebar / FAB -> FAQ(5) -> Related(3).
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UnderlineLink } from '../../components/ui'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import { SandBand, VideoPlayerFrame, VideoSidebar, TocFab, FAQSection, RelatedVideos, Transcript } from '../../components/content/videos.jsx'
import { genArticle, headingsOf } from '../../components/content/articleGen.js'
import { getVideo, videos } from '../../components/content/data.js'
import { chars, title, exactTitle } from '../../components/content/lorem.js'

export default function VideoDetail() {
  const { slug } = useParams()
  const v = getVideo(slug)
  const blocks = useMemo(() => genArticle(v.seed + 800, 'video'), [v.seed])
  const toc = useMemo(() => headingsOf(blocks), [blocks])
  const faq = useMemo(() => Array.from({ length: 5 }, (_, k) => ({
    // live question lengths wrap 2/1/1/1/2 lines @1440 and 3/2/2/2/3 @390
    q: `${exactTitle([69, 39, 49, 41, 65][k], v.seed * 10 + k)}?`,
    a: chars(200 + (k % 2) * 80, v.seed * 10 + k + 50),
  })), [v.seed])
  const lines = useMemo(() => Array.from({ length: 48 }, (_, k) => ({
    t: `${Math.floor((k * 2.3) / 60)}:${String(Math.floor(k * 2.3) % 60).padStart(2, '0')}`,
    text: chars(28 + ((k * 7) % 14), v.seed * 100 + k).replace(/\.$/, ''),
  })), [v.seed])
  const related = useMemo(() => { const all = videos(); return [1, 2, 3].map((k) => all[(v.i + k * 7) % all.length]) }, [v.i])
  return (
    <>
      <SandBand />
      <div className="container relative pb-[140px] -mt-[170px] xl:pb-[120px] md:-mt-[260px] lg:-mt-[274px] xl:-mt-[263px]">
        <div className="mb-[32px] mt-[66px] w-fit bg-sand px-[4px] xl:mt-[80px]">
          <UnderlineLink to="/videos" icon="left" className="flex-row-reverse">BACK TO VIDEOS</UnderlineLink>
        </div>
        <VideoPlayerFrame />
        <div className="pb-[32px] pt-[24px] md:pb-[46px] xl:pb-[56px] xl:pt-[32px]">
          <div className="flex flex-wrap gap-[8px] pb-[16px]">
            {v.tags.map((t) => (
              <Link key={t} to={`/videos?category=${encodeURIComponent(t)}#videos-and-webinars-library`}
                className="bg-sand-chip px-[8px] py-[4px] font-fono uppercase text-ink no-underline transition-colors duration-150 hover:bg-sand-dark text-video-tag-link lg:px-[12px] lg:py-[8px]">
                {t}
              </Link>
            ))}
          </div>
          <h1 className="m-0 font-fono font-normal uppercase text-ink text-video-detail-h1-sm md:text-video-detail-h1-lg xl:text-video-detail-h1">{v.h1}</h1>
          <p className="m-0 pt-[16px] font-sans text-[14px] leading-[19.6px] text-gray-500">{v.date}</p>
        </div>
        <div className="relative flex justify-between gap-[40px]">
          <ArticleProse blocks={blocks} video className="min-w-0 max-w-[816px] flex-1" />
          <VideoSidebar toc={toc} />
          <TocFab toc={toc} />
        </div>
        {/* live: transcript 80 below the body; the block's own padding-bottom is 120 (XL) / 140 */}
        <Transcript lines={lines} />
      </div>
      <FAQSection items={faq} />
      <RelatedVideos items={related} />
    </>
  )
}
