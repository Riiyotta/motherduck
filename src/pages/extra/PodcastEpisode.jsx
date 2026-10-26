// X10 /explain-analyze/:slug (PAGES_SPEC_EXTRA §5 X10), dark theme: back link -> header / video + chapters / paywall /
// transcript grid.
import { useParams } from 'react-router-dom'
import PageStub from '../PageStub.jsx'
import { EpisodeBack, EpisodeBody, useDarkTheme } from '../../components/extra/podcast.jsx'
import { getEpisode } from '../../components/extra/data/media.js'

export default function PodcastEpisode() {
  useDarkTheme()
  const { slug } = useParams()
  const ep = getEpisode(slug)
  if (!ep) return <PageStub template="not-found" />
  return (
    <div className="relative">
      <div className="container relative z-[1]">
        <EpisodeBack />
        <EpisodeBody key={slug} ep={ep} />
      </div>
    </div>
  )
}
