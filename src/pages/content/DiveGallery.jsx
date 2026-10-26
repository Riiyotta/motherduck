// L12 /dive-gallery (D1): own fixed 66px nav (App hides the site header here) -> hero -> filter band -> toolbar ->
// DiveCard grid (9 per page) + visible "Load more dives" + infinite scroll (appends, no URL change). A direct ?page=N
// load shows only page N. Cards link to /dive-gallery/dives/<slug>; user pages, DOCS, Slack and SIGN IN stay non-links.
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Placeholder } from '../../components/ui'
import { Chevron, Icon, NoResults } from '../../components/content/bits.jsx'
import { useParams, useInfinite, useOutside, useDebounced } from '../../components/content/hooks.js'
import { dives, DIVE_FORMATS, DIVE_TOPICS } from '../../components/content/data.js'
import { chars } from '../../components/content/lorem.js'
import { DiveNav, DiveFooter } from '../../components/content/diveChrome.jsx'

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function Pill({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={`rounded-pill border px-[9px] py-[4px] font-sans text-[12.5px] leading-[15px] ${active ? 'border-ink bg-ink text-white' : 'border-sand-dark bg-white text-ink hover:border-ink'}`}>
      {children}
    </button>
  )
}

function SortMenu({ sort, setSort }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutside(ref, () => setOpen(false), open)
  const other = sort === 'popular' ? 'recent' : 'popular'
  const label = { popular: 'Most Popular', recent: 'Most Recent' }
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="flex items-center gap-[8px] rounded-pill border border-ink bg-ink px-[16px] py-[8px] font-sans text-[14px] font-medium [line-height:normal] text-white hover:bg-gray-500">
        <Icon.sliders />{label[sort]}<Chevron size={14} open={open} className="!text-white" />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[5] w-[180px] rounded-tip border border-ink bg-white p-[4px] shadow-dive-menu">
          <button type="button" onClick={() => { setSort(other); setOpen(false) }} className="block w-full rounded-tip border-0 bg-transparent px-[10px] py-[8px] text-left font-sans text-[13px] text-ink hover:bg-surface-2">
            {label[other]}
          </button>
        </div>
      )}
    </div>
  )
}

function DiveCard({ d }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-sm border-2 border-ink bg-white">
      <Link to={`/dive-gallery/dives/${d.slug}`} className="ct-dive-link relative block cursor-pointer text-ink no-underline">
        {/* live: 16:9 on the border-box (image 393.3x219.2 + 2px cream border = 221.2 @1440) */}
        <div className="relative aspect-video border-b-2 border-cream bg-surface-2">
          <Placeholder rounded="" bordered={false} label="Dive thumbnail" className="!absolute inset-0 !h-full !w-full" />
          <div className="ct-dive-overlay absolute inset-0 flex items-center justify-center bg-dive-hover opacity-0 transition-opacity duration-200">
            <span className="rounded-pill bg-ink px-[20px] py-[10px] font-sans text-[14px] font-medium leading-[14px] text-white shadow-dive-pill">Open this interactive dive now</span>
          </div>
          {d.pick && (
            <span className="absolute left-[10px] top-[10px] flex items-center gap-[4px] border border-orange bg-peach px-[6px] py-[2px] font-mono text-[10px] uppercase leading-[10px] tracking-[0.4px] text-ink">
              <Icon.star />Northwind&apos;s Pick
            </span>
          )}
        </div>
        <h3 className="m-0 line-clamp-2 px-[16px] pb-[12px] pt-[16px] font-sans text-ink text-dive-card-title-sm lg:px-[32px] lg:pb-[16px] lg:pt-[24px] lg:text-dive-card-title">{d.title}</h3>
      </Link>
      <div className="flex flex-wrap gap-[6px] px-[16px] pb-[16px] lg:px-[24px] lg:pb-[20px]">
        {d.tags.map((t) => (
          <span key={t} className="rounded-pill border border-sand-dark bg-surface-2 px-[8px] py-[3px] font-sans text-[12px] leading-[12px] text-gray-500">{t}</span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-sand-dark bg-surface-2 px-[16px] py-[12px] lg:px-[24px]">
        <span className="flex items-center gap-[8px]">
          <span className="h-[28px] w-[28px] rounded-full border border-sand-dark bg-sand" aria-hidden="true" />
          {/* live: author Inter 13/13 500 (14/14 >=960); upvote 12px, padding 4 8, 30 tall (13px, 4 10, 32 >=960);
              downvote 12px, padding 4 6, 27 tall; buttons centred */}
          <span className="cursor-pointer font-sans text-[13px] font-medium leading-[13px] text-ink hover:underline lg:text-[14px] lg:leading-[14px]">{d.author}</span>
        </span>
        <span className="flex items-center gap-[4px]">
          <button type="button" aria-label="Upvote" className="rounded-sm border-2 border-cream bg-transparent px-[8px] py-[4px] font-sans text-[12px] font-semibold leading-[18px] text-ink hover:border-ink lg:px-[10px] lg:text-[13px] lg:leading-[20px]">▲ {d.votes}</button>
          <button type="button" aria-label="Downvote" className="rounded-sm border-2 border-cream bg-transparent px-[6px] py-[4px] font-sans text-[12px] leading-[15px] text-ink hover:border-coral-red">▼</button>
        </span>
      </div>
    </article>
  )
}

export default function DiveGallery() {
  const [params, set] = useParams()
  const tag = params.get('tag') || ''
  const [search, setSearch] = useState('')
  const q = useDebounced(search, 250)
  const [sort, setSort] = useState('popular')
  const [pick, setPick] = useState(false)
  const [hack, setHack] = useState(false)
  const list = useMemo(() => {
    const l = dives().filter((d) => (!tag || d.tags.some((t) => slug(t) === tag))
      && (!q || `${d.title} ${d.author} ${d.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase()))
      && (!pick || d.pick) && (!hack || d.hackathon))
    return [...l].sort((a, b) => (sort === 'popular' ? b.votes - a.votes : a.recency - b.recency))
  }, [tag, q, sort, pick, hack])
  // Live: the next 9 append ~25ms (client-side) after the "Load more dives" button comes within ~590px of the
  // viewport bottom (the sentinel sits 40px above the button -> 550).
  const feed = useInfinite({ total: list.length, first: 9, rest: 9, delay: 30, offset: 550, cumulative: false, updateUrl: false, resetKey: `${tag}|${q}|${sort}|${pick}|${hack}` })
  const shown = list.slice(feed.from, feed.to)
  const toggleTag = (t) => set({ tag: slug(t) === tag ? null : slug(t) })
  const row = (label, items) => (
    <div className="flex flex-wrap items-center justify-center gap-[5px]">
      <span className="mr-[6px] font-mono text-[11px] uppercase leading-[11px] tracking-[0.66px] text-gray-500">{label}</span>
      {items.map((t) => <Pill key={t} active={slug(t) === tag} onClick={() => toggleTag(t)}>{t}</Pill>)}
    </div>
  )
  return (
    <div className="pt-[66px]">
      <DiveNav />
      <section className="flex flex-col items-center gap-[24px] px-[24px] pt-[32px] lg:flex-row lg:justify-center lg:gap-[48px] lg:px-[80px] lg:pt-[48px]">
        <Placeholder label="Dive gallery hero image" className="aspect-[1100/680] w-full max-w-[420px] lg:w-[45%] lg:max-w-[480px]" />
        <div className="text-center lg:text-left">
          <h1 className="m-0 mb-[12px] font-mono uppercase text-ink text-dive-h1-sm lg:text-dive-h1">Dive Gallery</h1>
          <p className="m-0 max-w-[440px] font-sans text-gray-500 text-dive-lede">{chars(132, 9801)}</p>
        </div>
      </section>
      <section className="bg-cream px-[16px] py-[24px] lg:px-[24px] lg:pb-[32px] lg:pt-[40px]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[14px]">
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search dives by name, tag, or author…"
            className="w-full max-w-[540px] rounded-pill border border-sand-dark bg-white px-[18px] py-[11px] font-sans text-[14px] [line-height:normal] text-ink outline-none focus:border-ink" />
          <div className="flex flex-col gap-[14px]">
            {row('Format', DIVE_FORMATS)}
            {row('Topic', DIVE_TOPICS)}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] px-[24px] py-[16px] lg:px-[100px] lg:py-[24px]">
        <div className="mb-[16px] flex flex-wrap items-center gap-[10px]">
          <SortMenu sort={sort} setSort={setSort} />
          <button type="button" aria-pressed={pick} onClick={() => setPick((x) => !x)}
            className={`flex items-center gap-[5px] rounded-pill border border-orange px-[10px] py-[4px] font-sans text-[12.5px] [line-height:normal] text-ink hover:bg-orange ${pick ? 'bg-orange font-semibold' : 'bg-peach'}`}>
            <Icon.star />Northwind&apos;s Pick
          </button>
          <button type="button" aria-pressed={hack} onClick={() => setHack((x) => !x)}
            className={`flex items-center gap-[5px] rounded-pill border border-ink px-[10px] py-[4px] font-sans text-[12.5px] [line-height:normal] text-ink hover:bg-sun ${hack ? 'bg-sun font-semibold' : 'bg-yellow-chip'}`}>
            <span aria-hidden="true">🏆</span>Community Build Hackathon
          </button>
        </div>
        {shown.length === 0 ? <NoResults /> : (
          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2 xl:grid-cols-3">
            {shown.map((d) => <DiveCard key={d.slug} d={d} />)}
          </div>
        )}
        <div ref={feed.sentinelRef} data-sentinel="" className="h-0" />
        {feed.hasMore && (
          <div className="mt-[40px] flex justify-center">
            <Link to={`/dive-gallery?page=${feed.pages + 1}`} onClick={(e) => { e.preventDefault(); feed.loadMore() }}
              className="rounded-sm border-2 border-ink bg-white px-[22px] py-[11px] font-mono text-[13px] uppercase leading-[13px] tracking-[0.65px] text-ink no-underline hover:bg-surface-2">
              Load more dives
            </Link>
          </div>
        )}
      </div>
      <DiveFooter />
    </div>
  )
}
