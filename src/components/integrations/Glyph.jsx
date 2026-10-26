// Original, brand-free placeholder glyphs (spec content policy: no third-party logos).
// Simple geometric marks in ink, drawn on a 40x40 grid; size is set by the parent via className.
const SHAPES = [
  <circle key="0" cx="20" cy="20" r="13" />,
  <path key="1" d="M20 6 34 31H6z" />,
  <rect key="2" x="8" y="8" width="24" height="24" />,
  <path key="3" d="M20 5 33 12.5v15L20 35 7 27.5v-15z" />,
  <g key="4"><circle cx="20" cy="20" r="13" /><circle cx="20" cy="20" r="6" /></g>,
  <path key="5" d="M20 6v28M6 20h28" />,
  <path key="6" d="M20 5 35 20 20 35 5 20z" />,
  <path key="7" d="M9 32V20M17 32V12M25 32V16M33 32V8" />,
  <g key="8"><rect x="7" y="7" width="12" height="12" /><rect x="21" y="21" width="12" height="12" /></g>,
  <path key="9" d="M6 28c5-12 9-12 14 0s9 12 14 0" />,
  <g key="10"><circle cx="13" cy="20" r="7" /><circle cx="27" cy="20" r="7" /></g>,
  <path key="11" d="M8 10h24M8 20h24M8 30h24" />,
]

export default function Glyph({ index = 0, className = '' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {SHAPES[index % SHAPES.length]}
      </g>
    </svg>
  )
}
