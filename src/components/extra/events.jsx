// PAGES_SPEC_EXTRA X3 event detail + X4 past-events blocks.
// X3: EventHero -> EventBody (article + sticky EventSidebar) -> EventNewsletterBand -> MoreEvents -> EventBackToTop,
//     plus the <960 fixed MobileRegisterBar (measured on the original, not in the spec).
// X4: PastEventRow, RecordingTag, Pagination (EventsHero / SpeakerBanner come from content/EventsHub.jsx).
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LiftCard, OffsetButton, Placeholder, TextInput, Checkbox, UnderlineLink } from '../ui'
import { BackLink, Icon } from '../content/bits.jsx'
import { shaped } from '../content/lorem.js'
import '../../styles/extra-media.css'

/* ---------------------------------------------------------------- icons (generic line glyphs) ---------------------------------------------------------------- */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
export const EvIcon = {
  person: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.5" r="3.25" {...S} /><path d="M3.5 17.5c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" {...S} /></svg>
  ),
  screen: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="3.5" width="15" height="10" {...S} /><path d="M7 17h6M10 13.5V17" {...S} /></svg>
  ),
  video: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true"><rect x="1.75" y="4.25" width="10.5" height="9.5" {...S} /><path d="m12.25 7.5 4-2.25v7.5l-4-2.25" {...S} /></svg>
  ),
  calendar: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="24" height="22" {...S} /><path d="M4 12h24M10 3v6M22 3v6" {...S} /><path d="M9 17h3M15 17h3M21 17h2M9 22h3M15 22h3" {...S} /></svg>
  ),
  pin: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 30s11-9.2 11-17.5A11 11 0 0 0 5 12.5C5 20.8 16 30 16 30z" {...S} /><circle cx="16" cy="12.5" r="4" {...S} /></svg>
  ),
  check: () => (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" className="shrink-0"><rect x="2" y="2" width="24" height="24" {...S} /><path d="m8 14.5 4 4 8-9" {...S} /></svg>
  ),
}

/* ---------------------------------------------------------------- tags ---------------------------------------------------------------- */
// Hero: 20px icon + Mono 14/14 600; cards: 18px icon + Mono 12/12 600. bg apricot, 2px ink, padding 6 12, gap 8.
export function TypeTag({ type, small = false, className = '' }) {
  const Glyph = type === 'Online' ? EvIcon.screen : EvIcon.person
  return (
    <div className={`flex w-fit items-center gap-[8px] border-2 border-ink bg-apricot px-[12px] py-[6px] font-mono font-semibold uppercase text-ink ${small ? 'text-[12px] leading-[12px]' : 'text-[14px] leading-[14px]'} ${className}`}>
      <Glyph size={small ? 18 : 20} />{type}
    </div>
  )
}

// X4 "Recording Available": same tag style on #75E8D9 with an 18px video glyph.
export function RecordingTag() {
  return (
    <span className="flex items-center gap-[8px] rounded-sm border-2 border-ink bg-[#75E8D9] px-[12px] py-[6px] font-mono uppercase text-ink text-event-tag">
      <EvIcon.video />Recording Available
    </span>
  )
}

/* ---------------------------------------------------------------- X3 hero ---------------------------------------------------------------- */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-[12px]">
      <span className="flex shrink-0 pt-[7.6px] text-ink lg:pt-[7.6px]">{icon}</span>
      <div>
        <span className="mb-[2px] block font-sans text-[14px] leading-[19.6px] text-gray-500">{label}</span>
        <span className="font-sans text-[16px] leading-[25.6px] text-ink">{value}</span>
      </div>
    </div>
  )
}

export function EventHero({ e }) {
  return (
    <section className="border-b-2 border-ink bg-sand-chip pb-[40px] pt-[64px] md:pt-[60px] lg:py-[60px] xl:py-[56px]">
      <div className="container">
        <div className="pb-[24px] lg:pb-[32px]">
          <BackLink to="/events">BACK TO EVENTS</BackLink>
        </div>
        {/* block flow: the H1 margin-bottom (24) and the meta margin-top (32 / 24) collapse, as on the original */}
        <h1 className="m-0 mb-[24px] font-mono font-normal uppercase text-ink text-[32px] leading-[38.4px] md:text-[48px] md:leading-[57.6px] xl:text-[56px] xl:leading-[67.2px]">{e.title}</h1>
        <div className="mt-[24px] flex flex-col gap-[18px] lg:mt-[32px] lg:flex-row lg:items-center lg:gap-x-[24px] lg:gap-y-[18px]">
          <TypeTag type={e.type} className="max-lg:mb-[8px]" />
          <InfoItem icon={<EvIcon.calendar />} label="Date & Time" value={e.dateLong} />
          <InfoItem icon={<EvIcon.pin />} label="Location" value={e.location} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- X3 body ---------------------------------------------------------------- */
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-[32px] border-b border-[#C0C0C0] py-[12px] lg:gap-[48px]">
      <span className="shrink-0 font-sans text-[14px] leading-[25.6px] text-ink">{label}</span>
      <span className="text-right font-sans text-[16px] font-light leading-[25.6px] text-ink">{value}</span>
    </div>
  )
}

// External registration URL -> non-link button.
export function EventSidebar({ e, ctaRef }) {
  return (
    <div className="min-w-0">
      <aside id="detail-sidebar" className="lg:sticky lg:top-[142px] xl:top-[168px]">
        <div className="border-2 border-ink bg-white p-[24px]">
          <h3 className="m-0 mb-[16px] font-mono text-[18px] font-normal uppercase leading-[21.6px] text-ink">Event Details</h3>
          <DetailRow label="Date" value={e.date} />
          <DetailRow label="Time" value={e.time} />
          <DetailRow label="Format" value={e.format} />
          <DetailRow label="Location" value={e.location} />
          <DetailRow label="Price" value={e.price} />
          <div ref={ctaRef} className="mt-[24px]">
            <OffsetButton size="lg" arrow fullWidth className="!px-[18px]">Register</OffsetButton>
          </div>
        </div>
      </aside>
    </div>
  )
}

export function EventArticle({ e }) {
  return (
    <article className="min-w-0">
      <section>
        <h2 className="m-0 mb-[16px] font-mono font-normal uppercase text-ink text-[24px] leading-[33.6px] md:text-[32px] md:leading-[44.8px] lg:text-[28px] lg:leading-[33.6px]">About This Event</h2>
        <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] text-ink xl:text-[18px] xl:leading-[28.8px] xl:tracking-[0.36px]">{e.about}</p>
      </section>
      {e.learn && (
        <div className="mt-[40px] border-2 border-ink bg-white p-[24px] xl:p-[32px]">
          <h3 className="m-0 mb-[16px] font-mono text-[18px] font-normal uppercase leading-[21.6px] text-ink">What You&apos;ll Learn</h3>
          <ul className="m-0 mt-[16px] flex list-none flex-col gap-[12px] p-0">
            {e.learn.map((t, k) => (
              <li key={k} className="flex gap-[12px] font-sans text-[16px] font-light leading-[25.6px] text-ink">
                <EvIcon.check /><span className="pt-[2px]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {e.audience && (
        <div className="mt-[40px]">
          <h3 className="m-0 mb-[16px] font-mono text-[18px] font-normal uppercase leading-[21.6px] text-ink">Who Should Attend</h3>
          <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] text-ink">This event is ideal for:</p>
          <div className="mt-[16px] flex flex-wrap gap-[8px]">
            {e.audience.map((t) => (
              <span key={t} className="border-2 border-ink bg-sand-chip px-[12px] py-[6px] font-mono text-[12px] font-medium uppercase leading-[16.8px] text-ink">{t}</span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export function EventBody({ e, ctaRef }) {
  return (
    <div className="container grid grid-cols-1 gap-[40px] pb-[120px] pt-[40px] md:gap-[80px] md:pt-[48px] lg:grid-cols-[570px_318px] lg:gap-[32px] lg:pt-[56px] xl:grid-cols-[818px_318px] xl:gap-[106px] xl:pt-[80px]">
      <EventArticle e={e} />
      <EventSidebar e={e} ctaRef={ctaRef} />
    </div>
  )
}

/* ---------------------------------------------------------------- X3 newsletter band ---------------------------------------------------------------- */
// CONTENT B2 SubscribeBand values with the events title (SubscribeBand takes no title prop, so it is rebuilt here).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONSENT = shaped([9, 2, 5, 10, 4, 3], 8812) // [37ch] consent label stand-in
export function EventNewsletterBand() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(true)
  const valid = EMAIL.test(email) && ok
  return (
    <section className="bg-sand-chip py-[40px] md:py-[64px] xl:py-[80px]">
      <div className="container flex flex-col gap-[24px] md:flex-row md:items-center md:justify-center xl:gap-[80px]">
        <Placeholder label="Newsletter icon" className="h-[100px] w-full md:h-[130px] md:w-[130px] lg:h-[140px] lg:w-[140px]" />
        <form className="flex flex-col gap-[32px]" onSubmit={(ev) => ev.preventDefault()}>
          <h2 className="m-0 font-fono font-normal uppercase tracking-[0.01em] text-ink text-[16px] leading-[22.4px] lg:text-[24px] lg:leading-[33.6px]">Hear about upcoming events!</h2>
          <div className="grid grid-cols-1 gap-[16px] md:grid-cols-[402px_113.7px] md:gap-x-[16px] md:gap-y-[20px] xl:grid-cols-[434px_113.7px]">
            <TextInput variant="float" type="email" label="E-mail" value={email} onChange={(ev) => setEmail(ev.target.value)}
              className="mb-[16px]" inputClassName="!h-[56px]" />
            <div className="order-3 md:order-none">
              <OffsetButton type="submit" size="submit" variant="primary" disabled={!valid} disabledStyle
                className="!h-auto !px-[22px] !py-[16.5px] md:!px-[24px] md:!py-[16px]">Submit</OffsetButton>
            </div>
            <Checkbox variant="solid" label={CONSENT} checked={ok} onChange={(ev) => setOk(ev.target.checked)}
              className="order-2 md:order-none md:col-span-2 max-md:[&_label]:leading-[22.4px]" />
          </div>
        </form>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- X3 more upcoming ---------------------------------------------------------------- */
function MoreCard({ e, className = '' }) {
  return (
    <LiftCard lift={12} innerAs={Link} to={`/events/${e.slug}`} wrapperClassName={`h-full ${className}`}
      className="flex h-full flex-col gap-[8px] border-2 border-ink bg-white p-[24px] text-ink no-underline">
      <TypeTag type={e.type} small className="mb-[8px]" />
      <div className="line-clamp-1 font-sans text-[14px] font-light leading-[19.6px] text-gray-500 xl:text-[16px] xl:leading-[24px]">{e.date} - {e.location}</div>
      <h3 className="m-0 font-mono font-normal uppercase text-ink text-[18px] leading-[21.6px] xl:text-[22px] xl:leading-[26.4px]">{e.title}</h3>
      <div className="mt-auto pt-[24px] lg:pt-[32px]">
        <UnderlineLink uppercase>Learn More</UnderlineLink>
      </div>
    </LiftCard>
  )
}

export function MoreEvents({ items }) {
  return (
    <section className="border-t-2 border-ink pb-[120px] pt-[64px] lg:pt-[80px]">
      <div className="container">
        <h2 className="m-0 mb-[24px] font-mono text-[24px] font-normal uppercase leading-[28.8px] text-ink md:mb-[40px]">More Upcoming Events</h2>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3 xl:gap-[32px]">
          {/* MD (728-959) shows only the first two cards (one row), as on the original */}
          {items.map((e, k) => <MoreCard key={e.slug} e={e} className={k === 2 ? 'md:max-lg:hidden' : ''} />)}
        </div>
        <div className="mt-[40px] flex justify-center">
          <OffsetButton size="lg" to="/events">View Category</OffsetButton>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- X3 back-to-top + mobile register bar ---------------------------------------------------------------- */
// CONTENT C5 BackToTop markup; the X3 threshold is opacity 0 at scrollY 300 and 1 at 500 (C5 uses 600). Hidden <960.
export function EventBackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY >= 400)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className={`sticky top-[calc(100%-96px)] mb-[32px] ml-auto mr-[32px] w-fit transition-opacity duration-150 ease-in-out xl:mr-[100px] ${show ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <OffsetButton variant="secondary" size="icon-64" noLift aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
          <Icon.arrowUp />
        </OffsetButton>
      </div>
    </div>
  )
}

// Original (<960): fixed bottom bar, cream, 2px ink top border, padding 14 24, full-width md "Register" button.
// Measured (390 / 768, two events): shown until the sidebar (aside) has come 128px up into the viewport, hidden from
// then on (also once scrolled past), shown again when it drops back below that line. Hide = translateY(100%) over
// 200ms ease-in-out, then opacity 0; show = opacity 1, then slide in (extra-media.css .xm-regbar).
export function MobileRegisterBar({ targetRef }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const el = targetRef.current?.closest('aside') || targetRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(([en]) => setShow(!en.isIntersecting && en.boundingClientRect.top > 0), { rootMargin: '0px 0px -128px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [targetRef])
  return (
    <div data-hidden={show ? undefined : ''} className="xm-regbar fixed inset-x-0 bottom-0 z-[1] flex border-t-2 border-ink bg-cream px-[24px] py-[14px] lg:hidden">
      <OffsetButton arrow fullWidth>Register</OffsetButton>
    </div>
  )
}

/* ---------------------------------------------------------------- X4 rows ---------------------------------------------------------------- */
// Same classes as the EventsHub EventRow, plus the recording tag and the Watch Recording CTA; the whole row is a link
// (recorded rows -> /videos/<slug>, the others -> /events/<slug>).
export function PastEventRow({ e }) {
  const to = e.recording && e.video ? `/videos/${e.video}` : `/events/${e.slug}`
  return (
    <LiftCard lift={14} as={Link} wrapperProps={{ to }} innerAs="article"
      wrapperClassName="text-ink no-underline"
      className="flex flex-col rounded-sm border-2 border-ink bg-white lg:flex-row">
      <RowInner e={e} />
    </LiftCard>
  )
}

function RowInner({ e }) {
  return (
    <>
      <div className="flex items-baseline gap-[8px] border-b-2 border-ink px-[24px] py-[16px] lg:w-[167.5px] lg:shrink-0 lg:flex-col lg:items-center lg:justify-center lg:gap-0 lg:border-b-0 lg:border-r-2 lg:px-[48px] lg:py-[32px]">
        <span className="font-mono uppercase text-event-month-md lg:text-event-month">{e.monthShort}</span>
        <span className="font-mono text-event-day-md lg:text-event-day">{e.day}</span>
        <span className="font-mono text-gray-400 text-event-year-md lg:pt-[4px] lg:text-event-year">{e.year}</span>
      </div>
      <div className="flex flex-1 flex-col gap-[24px] p-[24px] lg:flex-row lg:items-center lg:justify-between lg:gap-[20px] lg:pb-[22px] lg:pl-[32px] lg:pr-[32px] lg:pt-[16px] xl:pr-[64px]">
        <div className="flex flex-col gap-[4px] lg:gap-[8px]">
          <h3 className="m-0 font-sans text-ink text-event-title-lg xl:text-event-title">{e.title}</h3>
          <p className="m-0 mb-[12px] line-clamp-[7] font-sans text-[14px] font-light leading-[19.6px] md:line-clamp-5 lg:mb-[8px] xl:line-clamp-3 xl:text-[16px] xl:leading-[25.6px]">{e.desc}</p>
          <p className="m-0 font-sans text-gray-400 text-event-loc-lg xl:text-event-loc">{e.locationLine}</p>
          {/* the recording tag wraps onto its own row below XL (measured) */}
          <div className="flex flex-col items-start gap-[4px] xl:flex-row">
            <span className="flex items-center gap-[8px] rounded-sm border-2 border-ink bg-apricot px-[12px] py-[6px] font-mono uppercase text-ink text-event-tag">
              <Icon.pin />{e.type}
            </span>
            {e.recording && <RecordingTag />}
          </div>
        </div>
        <div className="shrink-0">
          <OffsetButton size="lg" arrow noLift>{e.recording ? 'Watch Recording' : 'View Details'}</OffsetButton>
        </div>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- X4 pagination ---------------------------------------------------------------- */
// Window rule measured on all 13 pages: siblings s = 2 (>=728) / 1 (<728).
// cur <= s+2 -> 1..(2s+3) … last; cur >= last-(s+1) -> 1 … (last-2s-2)..last; else 1 … cur-s..cur+s … last.
export function pageWindow(cur, last, s) {
  const span = 2 * s + 3
  if (last <= span + 1) return Array.from({ length: last }, (_, i) => i + 1)
  if (cur <= s + 2) return [...Array.from({ length: span }, (_, i) => i + 1), '…', last]
  if (cur >= last - (s + 1)) return [1, '…', ...Array.from({ length: span }, (_, i) => last - span + 1 + i)]
  return [1, '…', ...Array.from({ length: 2 * s + 1 }, (_, i) => cur - s + i), '…', last]
}

export const pastHref = (n) => (n <= 1 ? '/events/past#event-list' : `/events/past/page/${n}#event-list`)

function Chev({ dir }) {
  return (
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true" className="block">
      <path d={dir === 'prev' ? 'M11 3 3 12l8 9' : 'M3 3l8 9-8 9'} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Group({ items, cur, className }) {
  return (
    <div className={`items-center gap-[8px] ${className}`}>
      {items.map((p, k) => (p === '…'
        ? <p key={`e${k}`} className="m-0 font-sans text-[16px] leading-[19.2px] tracking-[0.32px] text-ink">…</p>
        : (
          <Link key={p} to={pastHref(p)} aria-current={p === cur ? 'page' : undefined} className="block text-ink no-underline">
            <p className={`m-0 font-sans text-[16px] leading-[19.2px] tracking-[0.32px] ${p === cur ? 'font-semibold' : 'font-normal'}`}>{p}</p>
          </Link>
        )))}
    </div>
  )
}

export function Pagination({ cur, last }) {
  return (
    <div className="pb-[120px]">
    <nav aria-label="Past events pages" className="mt-[48px] flex items-center justify-center gap-[12px] text-ink lg:mt-[60px]">
      {cur > 1 && <Link to={pastHref(cur - 1)} aria-label="Previous page" className="block text-ink"><Chev dir="prev" /></Link>}
      <Group items={pageWindow(cur, last, 1)} cur={cur} className="flex md:hidden" />
      <Group items={pageWindow(cur, last, 2)} cur={cur} className="hidden md:flex" />
      {cur < last && <Link to={pastHref(cur + 1)} aria-label="Next page" className="block text-ink"><Chev dir="next" /></Link>}
    </nav>
    </div>
  )
}
