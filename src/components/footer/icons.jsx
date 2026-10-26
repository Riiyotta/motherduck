// Generic glyphs for the footer (ASSET_MANIFEST: generic icon set, no brand marks).
// Social icons are simple outline shapes in currentColor, sized by the parent (32px, 24 <728).
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }

const GLYPHS = {
  chat: <path d="M4 5h16v11H9l-5 4Z" {...S} />,
  post: <path d="M5 5 19 19M19 5 5 19" {...S} />,
  network: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" {...S} />
      <path d="M8 10.5V16M8 7.5v.5M11.5 16v-5.5M11.5 13c0-2 4.5-3 4.5 0v3" {...S} />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3" {...S} />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1" {...S} />
      <path d="m3.5 6.5 8.5 7 8.5-7" {...S} />
    </>
  ),
  feed: (
    <>
      <path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" {...S} />
      <circle cx="6" cy="18" r="1.5" fill="currentColor" />
    </>
  ),
}

export function SocialGlyph({ kind }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
      {GLYPHS[kind]}
    </svg>
  )
}

export function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

// Placeholder wordmark (neutral; not the original logo). viewBox matches the manifest's 0 0 210 37.
export function Wordmark({ className = '' }) {
  return (
    <svg viewBox="0 0 210 37" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="35" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="10" width="17" height="17" fill="currentColor" />
      <rect x="48" y="9" width="150" height="7" fill="currentColor" />
      <rect x="48" y="22" width="96" height="6" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
