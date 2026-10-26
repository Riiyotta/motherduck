// `hub` route key: picks the layout from the pathname (spec §1). /duckdb-news and /quacking-around-the-web use the
// L1 feed listing; /learn, /events, /community-code and /dive-gallery use L9–L12.
import { useLocation } from 'react-router-dom'
import NewsIndex from './NewsIndex.jsx'
import QuackIndex from './QuackIndex.jsx'
import LearnHub from './LearnHub.jsx'
import EventsHub from './EventsHub.jsx'
import CommunityCode from './CommunityCode.jsx'
import DiveGallery from './DiveGallery.jsx'

const BY_PATH = {
  '/duckdb-news': NewsIndex,
  '/quacking-around-the-web': QuackIndex,
  '/learn': LearnHub,
  '/events': EventsHub,
  '/community-code': CommunityCode,
  '/dive-gallery': DiveGallery,
}

export default function Hub() {
  const { pathname } = useLocation()
  const key = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  const Page = BY_PATH[key] || LearnHub
  return <Page key={key} />
}
