// Original SVG artwork used by Placeholder for non-photo slots. Everything here is drawn from
// scratch in the site's token palette: no third-party marks, no duck. `seed` picks a variant.
import { PipFigure } from './art/pip.jsx'

const C = {
  cream: '#F4EFEA', ink: '#383838', sky: '#97D4FF', skyTint: '#CEEBFF', pink: '#FEB9E2',
  yellow: '#F9EE3E', sun: '#FFDE00', orange: '#FF9538', peach: '#FFDCBD', mint: '#B0FFF4',
  coral: '#FFCBC8', teal: '#16AA98', white: '#FFFFFF',
}
const FILLS = [C.sky, C.pink, C.yellow, C.mint, C.peach, C.coral, C.skyTint]
const pick = (arr, seed, k = 0) => arr[(seed + k * 7) % arr.length]
const svgProps = (slice = true) => ({
  width: '100%',
  height: '100%',
  preserveAspectRatio: slice ? 'xMidYMid slice' : 'xMidYMid meet',
  'aria-hidden': true,
  style: { display: 'block' },
})

// Landscape / abstract scenes for illustration slots.
export function Illustration({ seed = 0 }) {
  const bg = pick([C.cream, C.skyTint, C.peach, C.mint], seed)
  const a = pick(FILLS, seed, 1)
  const b = pick(FILLS, seed, 2)
  switch (seed % 4) {
    case 0: // sun, clouds, hills
      return (
        <svg viewBox="0 0 400 260" {...svgProps()}>
          <rect width="400" height="260" fill={bg} />
          <circle cx="300" cy="80" r="42" fill={C.sun} stroke={C.ink} strokeWidth="3" />
          <path d="M60 92c0-14 12-24 26-22 6-12 24-14 33-3 14-2 24 8 23 20 0 3-2 5-5 5H66c-4 0-6-0-6 0z" fill={C.white} stroke={C.ink} strokeWidth="3" />
          <path d="M0 200 90 140l70 46 80-70 160 110v34H0z" fill={a} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
          <path d="M0 236 120 190l90 30 70-24 120 40v24H0z" fill={b} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
        </svg>
      )
    case 1: // isometric stacked slabs
      return (
        <svg viewBox="0 0 400 260" {...svgProps()}>
          <rect width="400" height="260" fill={bg} />
          {[0, 1, 2].map((i) => {
            const y = 70 + i * 52
            const f = pick(FILLS, seed, i + 1)
            return (
              <g key={i} stroke={C.ink} strokeWidth="3" strokeLinejoin="round">
                <path d={`M200 ${y - 34} 300 ${y} 200 ${y + 34} 100 ${y}z`} fill={f} />
                <path d={`M100 ${y} v18 l100 34 v-18z`} fill={C.ink} opacity=".85" />
                <path d={`M300 ${y} v18 l-100 34 v-18z`} fill={C.ink} opacity=".6" />
              </g>
            )
          })}
        </svg>
      )
    case 2: // bar chart with trend line
      return (
        <svg viewBox="0 0 400 260" {...svgProps()}>
          <rect width="400" height="260" fill={bg} />
          <path d="M50 220h300" stroke={C.ink} strokeWidth="3" />
          {[70, 120, 95, 160, 140, 190].map((h, i) => (
            <rect key={i} x={64 + i * 48} y={220 - h} width="32" height={h} fill={pick(FILLS, seed, i)} stroke={C.ink} strokeWidth="3" />
          ))}
          <path d="M80 140 128 110l48 18 48-56 48 20 48-40" fill="none" stroke={C.orange} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default: // overlapping shapes
      return (
        <svg viewBox="0 0 400 260" {...svgProps()}>
          <rect width="400" height="260" fill={bg} />
          <circle cx="150" cy="130" r="80" fill={a} stroke={C.ink} strokeWidth="3" />
          <rect x="190" y="70" width="130" height="130" fill={b} stroke={C.ink} strokeWidth="3" transform="rotate(8 255 135)" />
          <path d="M120 230 170 150l50 80z" fill={C.yellow} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="300" cy="60" r="14" fill={C.orange} stroke={C.ink} strokeWidth="3" />
        </svg>
      )
  }
}

// Original mascot "Pip" (pose library in ./art/pip.jsx).
export function Mascot({ seed = 0 }) {
  const pose = ['idle', 'wave', 'cheer', 'point'][seed % 4]
  return (
    <svg viewBox="0 0 200 200" {...svgProps(false)}>
      <PipFigure pose={pose} facing={seed % 2 ? 'left' : 'right'} />
    </svg>
  )
}

// Invented company wordmarks for logo slots.
const NAMES = ['Northwind', 'Lumen', 'Kestrel', 'Orbitly', 'Fernway', 'Quartzo', 'Halcyon', 'Brightloop', 'Cobalt & Co', 'Tidewell', 'Parallax', 'Monarch']
export function Wordmark({ seed = 0 }) {
  const name = pick(NAMES, seed)
  const mark = seed % 3
  return (
    <svg viewBox="0 0 220 60" {...svgProps(false)}>
      <g fill={C.ink}>
        {mark === 0 && <circle cx="24" cy="30" r="14" />}
        {mark === 1 && <rect x="10" y="16" width="28" height="28" rx="4" />}
        {mark === 2 && <path d="M24 14 40 44H8z" />}
        <text x="50" y="39" fontFamily="'Space Grotesk', sans-serif" fontSize="24" fontWeight="600" letterSpacing="-0.5">
          {name}
        </text>
      </g>
    </svg>
  )
}

export function BookCover({ seed = 0 }) {
  const bg = pick([C.sky, C.yellow, C.pink, C.mint, C.orange], seed)
  return (
    <svg viewBox="0 0 300 400" {...svgProps()}>
      <rect width="300" height="400" fill={bg} />
      <rect x="0" y="0" width="22" height="400" fill={C.ink} opacity=".85" />
      <rect x="48" y="56" width="200" height="18" fill={C.ink} />
      <rect x="48" y="84" width="150" height="18" fill={C.ink} />
      <rect x="48" y="124" width="110" height="8" fill={C.ink} opacity=".5" />
      <g transform="translate(150 290)" stroke={C.ink} strokeWidth="4" strokeLinejoin="round">
        <path d="M0 -50 70 -15 0 20 -70 -15z" fill={C.white} />
        <path d="M0 -20 70 15 0 50 -70 15z" fill={C.cream} />
      </g>
    </svg>
  )
}

// App-window mock for diagram / screenshot slots.
export function UiWindow({ seed = 0 }) {
  const accent = pick(FILLS, seed)
  return (
    <svg viewBox="0 0 480 300" {...svgProps()}>
      <rect width="480" height="300" fill={C.white} />
      <rect width="480" height="34" fill={C.cream} />
      <path d="M0 34h480" stroke={C.ink} strokeWidth="2" />
      {[20, 40, 60].map((x, i) => (
        <circle key={x} cx={x} cy="17" r="6" fill={[C.coral, C.yellow, C.mint][i]} stroke={C.ink} strokeWidth="2" />
      ))}
      <rect x="0" y="34" width="110" height="266" fill={C.cream} opacity=".6" />
      {[60, 86, 112, 138, 164].map((y, i) => (
        <rect key={y} x="16" y={y} width={i === seed % 5 ? 80 : 64} height="10" rx="2" fill={i === seed % 5 ? C.ink : '#C9C2BB'} />
      ))}
      <rect x="132" y="56" width="324" height="120" fill={accent} stroke={C.ink} strokeWidth="2" />
      <path d="M146 150 196 120l40 14 50-46 54 22 52-36 50 18" fill="none" stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={132 + i * 112} y="194" width="100" height="84" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <rect x={144 + i * 112} y="208" width="50" height="8" fill={C.ink} opacity=".5" />
          <rect x={144 + i * 112} y="232" width="70" height="20" fill={pick(FILLS, seed, i + 2)} />
        </g>
      ))}
    </svg>
  )
}

export function Glyph({ seed = 0 }) {
  const f = pick(FILLS, seed)
  const shapes = [
    <circle key="c" cx="24" cy="24" r="14" fill={f} stroke={C.ink} strokeWidth="3" />,
    <rect key="r" x="10" y="10" width="28" height="28" rx="4" fill={f} stroke={C.ink} strokeWidth="3" />,
    <path key="t" d="M24 8 40 38H8z" fill={f} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />,
    <path key="d" d="M24 6 42 24 24 42 6 24z" fill={f} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />,
  ]
  return (
    <svg viewBox="0 0 48 48" {...svgProps(false)}>
      {shapes[seed % shapes.length]}
    </svg>
  )
}
