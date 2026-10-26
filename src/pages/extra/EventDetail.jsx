// X3 /events/:slug (PAGES_SPEC_EXTRA §5 X3): EventHero -> EventBody -> EventNewsletterBand -> MoreEvents -> BackToTop.
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import PageStub from '../PageStub.jsx'
import { EventHero, EventBody, EventNewsletterBand, MoreEvents, EventBackToTop, MobileRegisterBar } from '../../components/extra/events.jsx'
import { getEvent, moreUpcoming } from '../../components/extra/data/media.js'

export default function EventDetail() {
  const { slug } = useParams()
  const ctaRef = useRef(null)
  const e = getEvent(slug)
  if (!e) return <PageStub template="not-found" />
  return (
    <div className="relative">
      <EventHero e={e} />
      <EventBody e={e} ctaRef={ctaRef} />
      <EventNewsletterBand />
      <MoreEvents items={moreUpcoming()} />
      <EventBackToTop />
      <MobileRegisterBar key={slug} targetRef={ctaRef} />
    </div>
  )
}
