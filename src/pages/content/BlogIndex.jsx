// L1 /blog: FeedHero (typewriter) -> SearchFilterPanel -> FeaturedPostCard -> PostCard grid + SubscribeTile -> F9.
import { useMemo } from 'react'
import { Container } from '../../components/ui'
import FeedHero from '../../components/content/FeedHero.jsx'
import { SearchFilterPanel, SearchField, Select } from '../../components/content/filters.jsx'
import { PostCard, FeaturedPostCard, FEED_GRID } from '../../components/content/feedCards.jsx'
import { SubscribeTile, MobileSubscribeButton } from '../../components/content/subscribe.jsx'
import { FeedFooter, NoResults } from '../../components/content/bits.jsx'
import { useParams, useInfinite } from '../../components/content/hooks.js'
import { blogPosts, BLOG_TOPICS } from '../../components/content/data.js'
import { chars } from '../../components/content/lorem.js'

const LEDE = chars(55, 9101)

export default function BlogIndex() {
  const [params, set, clear] = useParams()
  const topic = params.get('topic') || ''
  const q = params.get('title') || ''
  const all = blogPosts()
  // Original: the featured card is the first post matching the current search/topic, the grid holds the rest,
  // and a query with no matches shows only the empty state (no featured card).
  const matches = useMemo(() => all.filter((p) =>
    (!topic || p.topic.toLowerCase() === topic.toLowerCase()) && (!q || p.title.toLowerCase().includes(q.toLowerCase()))), [all, topic, q])
  const featured = matches[0]
  const list = matches.slice(1)
  const feed = useInfinite({ total: list.length, first: 17, rest: 18, resetKey: `${topic}|${q}` })
  const shown = list.slice(0, feed.to)

  return (
    <>
      <FeedHero variant="blog" h1="Field Notes Log" lede={LEDE} />
      <Container className="flex flex-col gap-[24px] pt-[32px] md:gap-[40px] lg:gap-[56px]">
        <SearchFilterPanel
          active={Boolean(topic || q)}
          onClear={clear}
          gridClassName="md:grid-cols-2 md:gap-[22px] lg:grid-cols-[60%_1fr] lg:gap-[20px] xl:grid-cols-[70%_1fr] xl:gap-[22px]"
        >
          <SearchField value={q} onCommit={(v) => set({ title: v })} />
          <Select label="Topic" value={topic} options={BLOG_TOPICS} onChange={(v) => set({ topic: v })} />
        </SearchFilterPanel>
        {featured && <FeaturedPostCard item={featured} to={`/blog/${featured.slug}`} />}
        {!featured ? <NoResults variant="art" /> : (
          <div className={FEED_GRID}>
            {shown.map((p, k) => {
              const card = <PostCard key={p.slug} item={p} to={`/blog/${p.slug}`} className={k === 1 ? 'hidden xl:block' : ''} />
              if (k === 1) {
                return [
                  card,
                  <SubscribeTile key="tile" />,
                  <PostCard key={`${p.slug}-dup`} item={p} to={`/blog/${p.slug}`} className="xl:hidden" />,
                ]
              }
              return card
            })}
          </div>
        )}
      </Container>
      <div className="pb-[150px] lg:pb-[180px] xl:pb-[200px]">
        <FeedFooter feed={feed} label="Load more blog posts" />
      </div>
      <MobileSubscribeButton />
    </>
  )
}
