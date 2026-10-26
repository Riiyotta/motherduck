// L5 /videos: SandGridHero -> FeaturedVideo -> [heading + CategoryChips(24) + search] -> VideoCard grid + SubscribeTile -> F9.
import { useEffect, useMemo, useRef } from 'react'
import { Container } from '../../components/ui'
import CategoryChips from '../../components/content/CategoryChips.jsx'
import { SearchField } from '../../components/content/filters.jsx'
import { SandGridHero, FeaturedVideo, VideoCard } from '../../components/content/videos.jsx'
import { SubscribeTile } from '../../components/content/subscribe.jsx'
import { FeedFooter, NoResults } from '../../components/content/bits.jsx'
import { useParams, useInfinite } from '../../components/content/hooks.js'
import { videos, featuredVideo, VIDEO_CATEGORIES } from '../../components/content/data.js'
import { title } from '../../components/content/lorem.js'

const LIB_TITLE = title(25, 7101) // [25ch/4w]

export default function VideoIndex() {
  const [params, set] = useParams()
  const raw = params.get('category') || 'All'
  const cat = VIDEO_CATEGORIES.find((c) => c.toLowerCase() === raw.toLowerCase()) || 'All'
  const q = params.get('title') || ''
  const all = videos()
  const list = useMemo(() => all.filter((v) =>
    (cat === 'All' || v.tags.includes(cat)) && (!q || v.title.toLowerCase().includes(q.toLowerCase()))), [all, cat, q])
  const feed = useInfinite({ total: list.length, first: 35, rest: 36, resetKey: `${cat}|${q}` })
  const shown = list.slice(0, feed.to)
  const lib = useRef(null)
  // video-detail tag links target #videos-and-webinars-library
  useEffect(() => {
    if (window.location.hash !== '#videos-and-webinars-library') return undefined
    const id = requestAnimationFrame(() => lib.current?.scrollIntoView({ block: 'start', behavior: 'auto' }))
    return () => cancelAnimationFrame(id)
  }, [])
  // Chip clicks do not scroll (live site: scrollY unchanged after a JS click; see CaseIndex).
  const href = (l) => {
    const p = new URLSearchParams()
    if (l !== 'All') p.set('category', l)
    if (q) p.set('title', q)
    p.set('page', '1')
    return `/videos?${p.toString()}`
  }
  const order = (k) => (k === 0 ? 'order-none' : k === 1 ? 'order-2 xl:order-none' : 'order-3')
  return (
    <>
      <SandGridHero>Videos and Online Events</SandGridHero>
      <div className="-mt-[196px] md:-mt-[386px] xl:-mt-[320px]">
        <FeaturedVideo v={featuredVideo()} />
      </div>
      <Container id="videos-and-webinars-library" className="pb-[176px] pt-[24px] md:pt-[32px] lg:pt-[40px]">
        <div ref={lib} className="scroll-mt-[92px]">
          <h2 className="m-0 pb-[32px] font-mono font-normal uppercase text-ink text-section-h2-mono-sm md:pb-[40px] md:text-section-h2-mono-md lg:text-section-h2-mono">{LIB_TITLE}</h2>
          <div className="flex flex-col gap-[24px] pb-[72px] md:gap-[32px] md:pb-[64px]">
            <CategoryChips labels={VIDEO_CATEGORIES} active={cat} hrefFor={href} />
            <SearchField value={q} onCommit={(v) => set({ title: v })} />
          </div>
        </div>
        {shown.length === 0 ? <NoResults /> : (
          <div className="mx-auto grid max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-2 lg:gap-[32px] xl:grid-cols-3">
            {shown.map((v, k) => <VideoCard key={v.slug} v={v} className={order(k)} />)}
            {shown.length > 1 && <SubscribeTile className="order-1" />}
          </div>
        )}
        <FeedFooter feed={feed} label="Load more videos" />
      </Container>
    </>
  )
}
