import Glyph from './Glyph.jsx'
import Tooltip from './Tooltip.jsx'
import { useLoopInView } from '../../lib/sim.js'

// Integrations arc (spec §6 "Arc"): 1242x560 @1440, aspect 2.218, scales with container width.
// Background: concentric half-rings (alternating sand / cream fill, sand-dark 1.75px stroke)
// and 5 spokes (sand-dark 1.5px, opacity .7) in a 0 0 1440 649 viewBox, centre (720, 730).
const RINGS = [691, 580, 516, 437, 366, 276, 212]
const SPOKE_ANGLES = [162, 128, 90, 52, 18] // degrees, measured from the original spoke endpoints
const SPOKE_R = [212, 691]

// Tile centres (% of arc box). >=1302: spec §6 table. Below 1302 the original uses a second layout
// (measured at 1280/768/390, identical in %): [left, top] in TILES_SM. Labels are neutral categories.
const TILES_SM = [
  [17, 34], [29, 15], [43, 5], [56, 5], [70, 15], [82, 34], [22, 60], [36, 42], [50, 34], [64, 42], [78, 60],
]
const TILES = [
  ['Notebooks', 50.0, 6.9],
  ['Scripting', 34.83, 12.62],
  ['JVM', 65.49, 12.62],
  ['Transform', 20.83, 27.35],
  ['Systems', 80.66, 27.35],
  ['Loading', 50.0, 33.63],
  ['Ingestion', 36.49, 38.69],
  ['Dashboards', 62.24, 38.69],
  ['Modeling', 24.08, 57.84],
  ['BI', 50.0, 57.84],
  ['Orchestration', 75.42, 57.84],
]

function Rings() {
  return (
    <svg viewBox="0 0 1440 649" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="absolute inset-0 h-full w-full">
      {RINGS.map((r, i) => (
        <circle key={r} cx="720" cy="730" r={r} strokeWidth="1.75" className={`stroke-sand-dark ${i % 2 ? 'fill-cream' : 'fill-sand'}`} />
      ))}
      {SPOKE_ANGLES.map((deg) => {
        const a = (deg * Math.PI) / 180
        const [r1, r2] = SPOKE_R
        return (
          <line
            key={deg}
            x1={720 + r1 * Math.cos(a)}
            y1={730 - r1 * Math.sin(a)}
            x2={720 + r2 * Math.cos(a)}
            y2={730 - r2 * Math.sin(a)}
            strokeWidth="1.5"
            opacity="0.7"
            className="stroke-sand-dark"
          />
        )
      })}
    </svg>
  )
}

// Sun: centred at 50% / 68.4%, 30% of arc width.
// rays (inset -30%) rotate 360deg / 54s linear infinite  -> animate-spin-slow (spec §11 #19)
// core glow (inset -2%), orange glow (inset -2%) opacity 0 -> .6 4s alternate -> animate-glow (§11 #20)
const RAY_MASK = {
  maskImage: 'radial-gradient(circle, #000 6%, rgba(0,0,0,.45) 36%, rgba(0,0,0,0) 66%)',
  WebkitMaskImage: 'radial-gradient(circle, #000 6%, rgba(0,0,0,.45) 36%, rgba(0,0,0,0) 66%)',
}

// Measured: the sun box's TOP edge sits at 68.4% (only translateX(-50%)), so it rises out of the arc bottom.
function Sun() {
  return (
    <div aria-hidden="true" className="absolute left-1/2 top-[68.4%] aspect-square w-[30%] -translate-x-1/2">
      {/* Measured: rays are blurred 9px and radially masked (#000 6%, .45 36%, 0 66%) */}
      <div className="absolute inset-[-30%] animate-spin-slow rounded-full bg-[repeating-conic-gradient(theme(colors.sun)_0deg_5deg,rgba(255,222,0,0)_5deg_30deg)] blur-[9px]" style={RAY_MASK} />
      <div className="absolute inset-[-2%] bg-[radial-gradient(circle,theme(colors.sun)_0%,rgba(255,222,0,0)_70%)]" />
      <div className="absolute inset-[-2%] animate-glow bg-[radial-gradient(circle,theme(colors.orange)_0%,rgba(255,149,56,0)_62%)]" />
    </div>
  )
}

// Tile: 72x72 (10% of arc width below that: 69 @688, 34 @337), centred on its point, white, 1px ink,
// r 14, 40px logo. Hover: translate(3px,-3px) + -6px 6px 0 ink shadow (200ms) + tooltip.
// Sizes use container units of the arc box: tile min(72px,10cqw), logo 40/72 of the tile, radius 14/72.
// Original tile targets are all /docs or external (C++ -> duckdb.org) -> non-link tiles.
function Tile({ label, left, top, smLeft, smTop, index }) {
  return (
    <span
      aria-label={label}
      className="group absolute left-[var(--l-sm)] top-[var(--t-sm)] z-[2] aspect-square w-[min(72px,10cqw)] -translate-x-1/2 -translate-y-1/2 xl:left-[var(--l)] xl:top-[var(--t)]"
      style={{ '--l': `${left}%`, '--t': `${top}%`, '--l-sm': `${smLeft}%`, '--t-sm': `${smTop}%` }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-[min(14px,1.944cqw)] border border-ink bg-surface-0 text-ink transition-[transform,box-shadow] duration-200 ease-in-out group-hover:translate-x-[3px] group-hover:translate-y-[-3px] group-hover:shadow-hard-6">
        <Glyph index={index} className="h-[min(40px,5.556cqw)] w-[min(40px,5.556cqw)] shrink-0" />
      </span>
      <Tooltip>{label}</Tooltip>
    </span>
  )
}

export default function Arc() {
  // Original: rays + glow animations are paused until this box is within 200px of the viewport
  const [ref, inView] = useLoopInView()
  return (
    <div ref={ref} data-inview={inView} className="relative w-full" style={{ aspectRatio: '1440 / 649', containerType: 'inline-size' }}>
      <Rings />
      <Sun />
      {TILES.map(([label, left, top], i) => (
        <Tile key={label} label={label} left={left} top={top} smLeft={TILES_SM[i][0]} smTop={TILES_SM[i][1]} index={i} />
      ))}
    </div>
  )
}
