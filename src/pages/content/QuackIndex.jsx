// L1 /quacking-around-the-web: FeedHero(quack) -> SearchFilterPanel(search + Type) -> PostCard(badge) grid -> F9.
// Every card is external on the original, so cards render as non-links.
import { useMemo } from 'react'
import { Container } from '../../components/ui'
import FeedHero from '../../components/content/FeedHero.jsx'
import { SearchFilterPanel, SearchField, Select } from '../../components/content/filters.jsx'
import { PostCard, FEED_GRID } from '../../components/content/feedCards.jsx'
import { FeedFooter, NoResults, Doodle } from '../../components/content/bits.jsx'
import { useParams, useInfinite } from '../../components/content/hooks.js'
import { quackItems, QUACK_TYPES } from '../../components/content/data.js'
import { chars } from '../../components/content/lorem.js'

const LEDE = chars(62, 9301)

export default function QuackIndex() {
  const [params, set, clear] = useParams()
  const type = params.get('type') || ''
  const q = params.get('title') || ''
  const all = quackItems()
  const list = useMemo(() => all.filter((p) =>
    (!type || p.type.toLowerCase() === type.toLowerCase()) && (!q || p.title.toLowerCase().includes(q.toLowerCase()))), [all, type, q])
  // Live: no "Load more" link here; the next 18 land ~400-460ms after the grid bottom rises 135px above the viewport bottom.
  const feed = useInfinite({ total: list.length, first: 18, rest: 18, delay: 420, offset: -135, resetKey: `${type}|${q}` })
  const shown = list.slice(0, feed.to)
  const typeLabel = QUACK_TYPES.find((t) => t.toLowerCase() === type.toLowerCase()) || ''
  return (
    <div className="relative overflow-x-clip">
      <FeedHero variant="quack" h1="Browsing Around the Web" lede={LEDE} />
      <Container>
        <SearchFilterPanel
          active={Boolean(type || q)}
          onClear={clear}
          gridClassName="md:grid-cols-2 md:gap-[24px] lg:grid-cols-[56%_1fr] lg:gap-[30px] xl:grid-cols-[66.4%_1fr]"
        >
          <SearchField value={q} onCommit={(v) => set({ title: v })} />
          <Select label="Type" value={typeLabel} options={QUACK_TYPES} onChange={(v) => set({ type: v.toLowerCase() })} />
        </SearchFilterPanel>
        <div className="pt-[48px] md:pt-[64px] lg:pt-[80px]">
          {shown.length === 0 ? <NoResults /> : (
            <div className={FEED_GRID}>
              {shown.map((p) => <PostCard key={p.i} item={p} badge={p.type} />)}
            </div>
          )}
        </div>
      </Container>
      {/* live: grid -> 60 -> section padding-bottom 140 / 165 / 200; the hidden load-more (48 + 16) sits inside it */}
      <div className="pb-[136px] md:pb-[161px] lg:pb-[176px] xl:pb-[196px]">
        <FeedFooter feed={feed} label={null} />
      </div>
      {/* live @1440: 110 shape bottom 84 / x1061 (right side), 160 shape bottom 126 / x93 (left, hidden SM);
          @390: 110 shape bottom 50, right -46. 728-1301 positions UNMEASURED (same centre offsets). */}
      <Doodle kind="arc" className="absolute bottom-[50px] right-[-46px] h-[110px] w-[110px] md:bottom-[84px] md:right-[calc(50%-451px)]" />
      <Doodle kind="burst" className="absolute bottom-[126px] left-[calc(50%-627px)] hidden h-[160px] w-[160px] md:block" />
    </div>
  )
}
