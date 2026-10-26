// X4 /events/past and /events/past/page/:n (PAGES_SPEC_EXTRA §5 X4): the /events page (EventsHero, SpeakerBanner, tabs,
// SearchFilterPanel, rows) with the Past tab active, no SubscribeBanner, 20 rows per page and numbered pagination.
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useParams as useRouteParams } from 'react-router-dom'
import { Container } from '../../components/ui'
import PageStub from '../PageStub.jsx'
import { EventsHero, SpeakerBanner } from '../content/EventsHub.jsx'
import { SearchFilterPanel, SearchField, Select } from '../../components/content/filters.jsx'
import { chipClass } from '../../components/content/CategoryChips.jsx'
import { NoResults } from '../../components/content/bits.jsx'
import { useParams } from '../../components/content/hooks.js'
import { PastEventRow, Pagination } from '../../components/extra/events.jsx'
import { pastEvents, PAST_PER_PAGE, pastPageCount } from '../../components/extra/data/media.js'

const TYPES = ['Online', 'In Person']

export default function EventsPast() {
  const { n } = useRouteParams()
  const { hash, pathname } = useLocation()
  const [params, set, clear] = useParams()
  const page = n ? Number(n) : 1
  const last = pastPageCount()
  const type = params.get('type') || ''
  const location = params.get('location') || ''
  const q = params.get('title') || ''
  const filtering = Boolean(type || location || q)
  const all = pastEvents()
  const locations = useMemo(() => ['Online', ...[...new Set(all.filter((e) => e.type !== 'Online').map((e) => e.location))].sort()], [all])
  const list = useMemo(() => {
    // Filtering on past pages is UNMEASURED: matches across all past events are listed without paging.
    if (filtering) {
      return all.filter((e) => (!type || e.type.toLowerCase() === type.toLowerCase())
        && (!location || e.location === location)
        && (!q || e.title.toLowerCase().includes(q.toLowerCase())))
    }
    return all.slice((page - 1) * PAST_PER_PAGE, page * PAST_PER_PAGE)
  }, [all, filtering, type, location, q, page])

  // Pagination links target #event-list; App's ScrollToTop runs first, then this jumps to the list.
  useEffect(() => {
    if (hash === '#event-list') requestAnimationFrame(() => document.getElementById('event-list')?.scrollIntoView())
  }, [hash, pathname])

  if (!Number.isInteger(page) || page < 1 || page > last || (n && page === 1)) return <PageStub template="not-found" />
  return (
    <>
      <EventsHero />
      <SpeakerBanner />
      <Container id="event-list" className="scroll-mt-[var(--header-total)] pt-[80px] md:pt-[60px]">
        <h2 className="sr-only">Past Data Conferences &amp; Events</h2>
        <div className="mb-[32px] flex gap-[8px] lg:gap-[12px]">
          <Link to="/events" className={`${chipClass(false)} !px-[16px] !py-[12px] lg:!px-[20px] lg:!py-[16px]`}>Upcoming</Link>
          <Link to="/events/past" aria-current="page" className={`${chipClass(true)} !px-[16px] !py-[12px] lg:!px-[20px] lg:!py-[16px]`}>Past</Link>
        </div>
        <SearchFilterPanel
          active={filtering}
          onClear={clear}
          gridClassName="md:grid-cols-2 md:gap-[22px] md:[&>*:first-child]:col-span-2 lg:grid-cols-[37%_1fr_1fr] lg:gap-[20px] lg:[&>*:first-child]:col-span-1 xl:grid-cols-[42%_1fr_1fr] xl:gap-[22px]"
        >
          <SearchField value={q} onCommit={(v) => set({ title: v })} />
          <Select label="Location" value={location} options={locations} onChange={(v) => set({ location: v })} menuClassName="max-h-[300px] xl:max-h-[400px]" />
          <Select label="Type" value={type ? TYPES.find((t) => t.toLowerCase() === type.toLowerCase()) : ''} options={TYPES} onChange={(v) => set({ type: v })} menuClassName="max-h-[300px] xl:max-h-[400px]" />
        </SearchFilterPanel>
        {list.length === 0 ? <NoResults /> : (
          <div className="flex flex-col gap-[24px] pt-[48px] md:gap-[32px] md:pt-[64px] lg:pt-[80px]">
            {list.map((e) => <PastEventRow key={e.slug} e={e} />)}
          </div>
        )}
      </Container>
      {!filtering && <Pagination cur={page} last={last} />}
    </>
  )
}
