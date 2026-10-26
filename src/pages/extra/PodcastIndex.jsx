// X9 /explain-analyze (PAGES_SPEC_EXTRA §5 X9), dark theme: Hero -> Latest episode -> Episodes grid.
// The page-root noise texture (noise-bg-dual-gradient.png) is omitted (spec §2 allows omitting it).
import { PodcastHero, LatestEpisode, EpisodeGrid, useDarkTheme, useFont, FIRA_MONO } from '../../components/extra/podcast.jsx'
import { episodes } from '../../components/extra/data/media.js'

export default function PodcastIndex() {
  useDarkTheme()
  useFont('font-fira-mono', FIRA_MONO)
  const list = episodes()
  return (
    <div className="relative min-h-[900px]">
      <div className="container relative z-[1]">
        <PodcastHero />
        <LatestEpisode ep={list[0]} />
        <EpisodeGrid items={list} />
      </div>
    </div>
  )
}
