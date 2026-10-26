// Neutral generic glyphs (ASSET_MANIFEST: agent tab logos and Skills/MCP/CLI icons are replaced
// with generic shapes; no third-party marks).

// 16x16 tab glyphs. Drawn in black so the spec's CSS filters (brightness/invert) set the tone.
export function TabGlyph({ kind }) {
  const common = { width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': true, className: 'shrink-0' }
  if (kind === 'a')
    return (
      <svg {...common}>
        <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8l4.9-1.6Z" fill="#000" />
      </svg>
    )
  if (kind === 'b')
    return (
      <svg {...common}>
        <path d="M8 1.5 14 5v6l-6 3.5L2 11V5Z" fill="none" stroke="#000" strokeWidth="1.5" />
        <path d="M8 8 14 5M8 8v6.5M8 8 2 5" stroke="#000" strokeWidth="1.2" />
      </svg>
    )
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="6" fill="none" stroke="#000" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.25" fill="#000" />
    </svg>
  )
}

// 28x28 card icons
export function CardIcon({ kind }) {
  const common = { width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none', 'aria-hidden': true, className: 'shrink-0' }
  const s = { stroke: 'currentColor', strokeWidth: 2 }
  if (kind === 'skills')
    return (
      <svg {...common}>
        <rect x="5" y="3" width="18" height="22" rx="1" {...s} />
        <path d="M9 9h10M9 14h10M9 19h6" {...s} />
      </svg>
    )
  if (kind === 'server')
    return (
      <svg {...common}>
        <rect x="4" y="4" width="20" height="8" rx="1" {...s} />
        <rect x="4" y="16" width="20" height="8" rx="1" {...s} />
        <path d="M8 8h2M8 20h2" {...s} />
      </svg>
    )
  return (
    <svg {...common}>
      <rect x="3" y="5" width="22" height="18" rx="1" {...s} />
      <path d="m8 11 3 3-3 3M14 17h6" {...s} />
    </svg>
  )
}

// Small external arrow (generic)
export function ExternalArrow({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

// 42x26 terminal header mark: neutral pixel block placeholder (not the original mascot).
export function PixelMark() {
  const cells = [
    [1, 0, 4], [0, 1, 6], [0, 2, 1], [2, 2, 2], [5, 2, 1], [0, 3, 6], [1, 4, 1], [4, 4, 1],
  ]
  return (
    <svg width="42" height="26" viewBox="0 0 42 26" aria-hidden="true" className="h-[26px] w-[28px] shrink-0 md:w-[42px]">
      {cells.map(([x, y, w], i) => (
        <rect key={i} x={7 + x * 4.67} y={1 + y * 4.8} width={w * 4.67} height="4.8" className="fill-term-dim" />
      ))}
    </svg>
  )
}
