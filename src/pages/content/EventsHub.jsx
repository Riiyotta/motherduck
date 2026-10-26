// L10 /events: EventsHero -> SpeakerBanner -> EventTabs -> SearchFilterPanel(search + Location + Type) -> EventRow list (7)
// with SubscribeBanner after the first row. Rows link to /events/<slug> (the whole row is the anchor, as on the
// original); the Past tab links to /events/past.
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container, LiftCard, OffsetButton, Placeholder, UnderlineLink } from '../../components/ui'
import { SearchFilterPanel, SearchField, Select } from '../../components/content/filters.jsx'
import { SubscribeBanner } from '../../components/content/subscribe.jsx'
import { chipClass } from '../../components/content/CategoryChips.jsx'
import { Doodle, Icon, NoResults } from '../../components/content/bits.jsx'
import { useParams } from '../../components/content/hooks.js'
import { events, EVENT_LOCATIONS, EVENT_TYPES } from '../../components/content/data.js'
import { chars, title, shaped } from '../../components/content/lorem.js'

// Word lengths mirror the live hero (H1 3 lines @1440 / 390, lede 1 / 2 lines)
const H1 = shaped([4, 12, 6, 7, 1, 10, 6], 9501)
const LEDE = `${shaped([4, 2, 2, 4, 4, 3, 4, 6, 6, 3, 6, 6, 3, 4], 9502)}.`

export function EventsHero() {
  return (
    <section className="relative overflow-x-clip">
      <div className="container relative flex justify-between pb-[260px] pt-[20px] md:pb-[190px] md:pt-[40px] lg:pb-[70px] lg:pt-[90px] xl:pb-[90px]">
        {/* decor positions UNMEASURED; hidden at SM where they would overlap the heading */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <Doodle kind="star" className="absolute left-[2%] top-[20px] h-[24px] w-[24px]" />
        <Doodle kind="circle" className="absolute left-[40%] top-[10px] h-[18px] w-[18px]" />
        <Doodle kind="burst" className="absolute right-[38%] top-[40px] h-[28px] w-[28px]" />
        <Doodle kind="zig" className="absolute bottom-[30px] left-[5%] h-[20px] w-[40px]" />
        <Doodle kind="arc" className="absolute bottom-[20px] left-[45%] h-[30px] w-[30px]" />
        <Doodle kind="star" className="absolute right-[4%] top-[12px] h-[20px] w-[20px] rotate-12" />
        <Doodle kind="dot" className="absolute bottom-[60px] right-[35%] h-[14px] w-[14px]" />
        <Doodle kind="wave" className="absolute left-[25%] top-[48%] hidden h-[18px] w-[60px] lg:block" />
        </div>
        <div className="relative z-[2] flex max-w-[900px] flex-col gap-[16px] lg:max-w-[550px] lg:gap-[32px] xl:max-w-[800px]">
          <h1 className="m-0 font-mono font-normal uppercase text-ink text-events-h1-sm md:text-events-h1-lg xl:text-events-h1">{H1}</h1>
          <p className="m-0 max-w-[400px] font-sans text-ink text-events-lede-sm md:text-events-lede lg:max-w-[490px] xl:max-w-[800px]">{LEDE}</p>
        </div>
        <Placeholder label="Events illustration" className="!absolute bottom-0 left-1/2 z-[1] h-[231px] w-[220px] -translate-x-1/2 md:left-auto md:right-[20px] md:h-[284px] md:w-[270px] md:translate-x-0 lg:bottom-[60px] lg:right-[110px] lg:h-[263px] lg:w-[250px] xl:bottom-[30px] xl:right-[70px] xl:h-[347px] xl:w-[330px]" />
      </div>
    </section>
  )
}

export function SpeakerBanner() {
  return (
    <section className="pt-[120px] md:pb-[20px] md:pt-[72px] lg:py-[30px]">
      <div className="container">
        <div className="relative bg-sand-chip px-[20px] pb-[24px] pt-[40px] text-center md:py-[21px] md:pl-[180px] md:pr-[67px]">
          <Placeholder label="Community illustration" className="!absolute left-1/2 top-[-80px] h-[111px] w-[136px] -translate-x-1/2 md:left-[80px] md:top-1/2 md:h-[100px] md:w-[122px] md:-translate-y-1/2 md:translate-x-0 xl:left-[240px]" />
          <p className="m-0 inline font-mono text-[16px] uppercase leading-[22.4px] text-ink">{chars(37, 9601).replace(/\.$/, '')} </p>
          {/* target UNMEASURED -> button with no navigation */}
          <UnderlineLink onClick={() => {}} inline uppercase labelClassName="!font-mono !text-[16px] !leading-[19.2px]" className="align-middle">Apply to be a speaker</UnderlineLink>
        </div>
      </div>
    </section>
  )
}

function EventRow({ e }) {
  return (
    <LiftCard lift={14} as={Link} wrapperProps={{ to: `/events/${e.slug}` }} wrapperClassName="text-ink no-underline" innerAs="article"
      className="flex flex-col rounded-sm border-2 border-ink bg-white lg:flex-row">
      <div className="flex items-baseline gap-[8px] border-b-2 border-ink px-[24px] py-[16px] lg:w-[167.5px] lg:shrink-0 lg:flex-col lg:items-center lg:justify-center lg:gap-0 lg:border-b-0 lg:border-r-2 lg:px-[48px] lg:py-[32px]">
        <span className="font-mono uppercase text-event-month-md lg:text-event-month">{e.monthShort}</span>
        <span className="font-mono text-event-day-md lg:text-event-day">{e.day}</span>
        <span className="font-mono text-gray-400 text-event-year-md lg:pt-[4px] lg:text-event-year">{e.year}</span>
      </div>
      <div className="flex flex-1 flex-col gap-[24px] p-[24px] lg:flex-row lg:items-center lg:justify-between lg:gap-[20px] lg:pb-[22px] lg:pl-[32px] lg:pr-[32px] lg:pt-[16px] xl:pr-[64px]">
        <div className="flex flex-col gap-[4px] lg:gap-[8px]">
          <h3 className="m-0 font-sans text-ink text-event-title-lg xl:text-event-title">{e.title}</h3>
          <p className="m-0 mb-[12px] line-clamp-[7] font-sans text-[14px] font-light leading-[19.6px] md:line-clamp-5 lg:mb-[8px] lg:line-clamp-3 lg:text-[16px] lg:leading-[25.6px]">{e.desc}</p>
          <p className="m-0 font-sans text-gray-400 text-event-loc-lg xl:text-event-loc">{e.location}</p>
          <div className="flex">
            <span className="mt-[4px] flex items-center gap-[8px] rounded-sm border-2 border-ink bg-apricot px-[12px] py-[6px] font-mono uppercase text-ink text-event-tag">
              <Icon.pin />{e.type}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <OffsetButton size="lg" arrow noLift>View Details</OffsetButton>
        </div>
      </div>
    </LiftCard>
  )
}

export default function EventsHub() {
  const [params, set, clear] = useParams()
  const type = params.get('type') || ''
  const location = params.get('location') || ''
  const q = params.get('title') || ''
  const list = useMemo(() => events().filter((e) =>
    (!type || e.type.toLowerCase() === type.toLowerCase())
    && (!location || e.location === location)
    && (!q || e.title.toLowerCase().includes(q.toLowerCase()))), [type, location, q])
  return (
    <>
      <EventsHero />
      <SpeakerBanner />
      <Container className="pb-[96px] pt-[80px] md:pt-[60px] lg:pb-[120px]">
        <div className="mb-[32px] flex gap-[8px] lg:gap-[12px]">
          <Link to="/events" className={`${chipClass(true)} !px-[16px] !py-[12px] lg:!px-[20px] lg:!py-[16px]`}>Upcoming</Link>
          <Link to="/events/past" className={`${chipClass(false)} !px-[16px] !py-[12px] lg:!px-[20px] lg:!py-[16px]`}>Past</Link>
        </div>
        <SearchFilterPanel
          active={Boolean(type || location || q)}
          onClear={clear}
          gridClassName="md:grid-cols-2 md:gap-[22px] md:[&>*:first-child]:col-span-2 lg:grid-cols-[37%_1fr_1fr] lg:gap-[20px] lg:[&>*:first-child]:col-span-1 xl:grid-cols-[42%_1fr_1fr] xl:gap-[22px]"
        >
          <SearchField value={q} onCommit={(v) => set({ title: v })} />
          <Select label="Location" value={location} options={EVENT_LOCATIONS} onChange={(v) => set({ location: v })} menuClassName="max-h-[300px] xl:max-h-[400px]" />
          <Select label="Type" value={type ? EVENT_TYPES.find((t) => t.toLowerCase() === type.toLowerCase()) : ''} options={EVENT_TYPES} onChange={(v) => set({ type: v })} menuClassName="max-h-[300px] xl:max-h-[400px]" />
        </SearchFilterPanel>
        {list.length === 0 ? <NoResults /> : (
          <div className="flex flex-col gap-[24px] pt-[48px] md:gap-[32px] md:pt-[64px] lg:pt-[80px]">
            {list.map((e, k) => (k === 0 ? [<EventRow key={e.slug} e={e} />, <SubscribeBanner key="banner" />] : <EventRow key={e.slug} e={e} />))}
          </div>
        )}
      </Container>
    </>
  )
}
