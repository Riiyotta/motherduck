// X8 /webinar/:slug and /video/:slug (PAGES_SPEC_EXTRA §5 X8) plus the two measured non-spec layouts (see webinar.jsx).
import { useLocation, useParams } from 'react-router-dom'
import PageStub from '../PageStub.jsx'
import { WebinarStandard, WebinarRegisterLP, WebinarSideForm } from '../../components/extra/webinar.jsx'
import { getWebinar } from '../../components/extra/data/media.js'

export default function Webinar() {
  const { slug } = useParams()
  const kind = useLocation().pathname.split('/')[1]
  const w = getWebinar(kind, slug)
  if (!w) return <PageStub template="not-found" />
  if (w.variant === 'lp') return <WebinarRegisterLP key={slug} w={w} />
  if (w.variant === 'side') return <WebinarSideForm key={slug} w={w} />
  return <WebinarStandard key={slug} w={w} />
}
