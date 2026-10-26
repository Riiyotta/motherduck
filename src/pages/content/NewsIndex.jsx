// L1 /duckdb-news: FeedHero(news) -> NewsDigestCard -> PostCard grid with SubscribeBanner after row 1 -> F9.
import { Container } from '../../components/ui'
import FeedHero from '../../components/content/FeedHero.jsx'
import { PostCard, NewsDigestCard, NewsletterThumb, FEED_GRID } from '../../components/content/feedCards.jsx'
import { SubscribeBanner } from '../../components/content/subscribe.jsx'
import { FeedFooter } from '../../components/content/bits.jsx'
import { useInfinite } from '../../components/content/hooks.js'
import { newsItems, newsDigest } from '../../components/content/data.js'
import { chars } from '../../components/content/lorem.js'
import { ART_REGISTRY } from '../../components/ui/art/index.js'

const EditorialThumb = ART_REGISTRY.editorialPost

const LEDE = chars(85, 9201)

export default function NewsIndex() {
  const list = newsItems()
  const feed = useInfinite({ total: list.length, first: 18, rest: 18 })
  const shown = list.slice(0, feed.to)
  return (
    <>
      <FeedHero variant="news" h1="Engine News & Updates" lede={LEDE} />
      <Container className="flex flex-col gap-[24px] pt-[32px] md:gap-[32px] lg:gap-[40px]">
        <NewsDigestCard digest={newsDigest()} />
        <div className={FEED_GRID}>
          {shown.map((p, k) => {
            const to = `/blog/${p.slug}`
            // Live: the first card is a regular post thumbnail, every other card a monthly-digest graphic.
            const thumb = k === 0 ? <span className="block h-full w-full [&>svg]:h-full [&>svg]:w-full"><EditorialThumb seed={4} label="Post thumbnail" /></span> : <NewsletterThumb issue={`Issue ${42 - k}`} seed={k} />
            const card = <PostCard key={p.slug} item={p} to={to} thumb={thumb} className={k === 2 ? 'hidden xl:block' : ''} />
            if (k === 2) {
              return [
                card,
                <SubscribeBanner key="banner" className="md:col-span-2 lg:!my-[8px] xl:col-span-3" />,
                <PostCard key={`${p.slug}-dup`} item={p} to={to} thumb={thumb} className="xl:hidden" />,
              ]
            }
            return card
          })}
        </div>
      </Container>
      <div className="pb-[150px] lg:pb-[180px] xl:pb-[200px]">
        <FeedFooter feed={feed} label="Load more blog posts" />
      </div>
    </>
  )
}
