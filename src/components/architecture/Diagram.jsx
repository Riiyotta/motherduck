// Architecture wire diagram (spec §4 "Diagram"). Generic recreation: 4 white top cards with a
// coloured label chip, neutral icon placeholders and dark size chips, wired into a generic storage
// cylinder. The original illustration (characters, gears, mascot, clouds) is NOT reproduced.
// Desktop/tablet: viewBox 0 0 746 432 rendered 778x451 (fluid width), margin-bottom -45, z 2.
// <728: vertical variant viewBox 0 0 327 720 rendered 337x742.
import Wire, { WireDefs } from './Wire.jsx'
import { useLoopInView } from '../../lib/sim.js'

const INK = '#383838'
// Chip fills map to tokens: sky, yellow, orange, mint
const NODES = [
  { id: 'you', label: 'USER A', chip: '#97D4FF', sizes: ['SMALL'] },
  { id: 'teammate', label: 'USER B', chip: '#F9EE3E', sizes: ['MEDIUM'] },
  { id: 'pipeline', label: 'PIPELINE', chip: '#FF9538', sizes: ['LARGE'] },
  { id: 'agents', label: 'AGENTS', chip: '#B0FFF4', sizes: ['SMALL', 'SMALL', 'SMALL'] },
]
// Card heights: spec gives 160x134 and 160x104 but not which card is which (UNMEASURED);
// the 3-chip agents card is assumed to be the 134 one.
const cardH = (n) => (n.sizes.length > 1 ? 134 : 104)

const txt = { fontFamily: '"Fragment Mono", ui-monospace, monospace', fontSize: 10, letterSpacing: 0.2 }

function Node({ n, x, y }) {
  const h = cardH(n)
  const chipW = n.label.length * 6.4 + 14
  return (
    <g data-node={n.id}>
      <rect x={x} y={y} width="160" height={h} rx="2" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x={x + 12} y={y + 12} width={chipW} height="20" rx="2" fill={n.chip} stroke={INK} strokeWidth="1.5" />
      <text x={x + 19} y={y + 25.5} fill={INK} style={txt}>
        {n.label}
      </text>
      {/* neutral icon placeholders (stand-ins for the character + gear art) */}
      <circle cx={x + 26} cy={y + 56} r="12" fill="#F8F8F7" stroke="#A1A1A1" strokeWidth="1" />
      <rect x={x + 46} y={y + 46} width="20" height="20" rx="2" fill="#F8F8F7" stroke="#A1A1A1" strokeWidth="1" />
      {n.sizes.map((s, i) => {
        const w = s.length * 6.4 + 12
        const cy = y + h - 30
        return (
          <g key={i}>
            <rect x={x + 12 + i * (w + 4)} y={cy} width={w} height="18" rx="2" fill={INK} />
            <text x={x + 18 + i * (w + 4)} y={cy + 12.5} fill="#fff" style={txt}>
              {s}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function Cylinder({ cx, top, rx, ry, height }) {
  const bottom = top + height
  return (
    <g data-node="storage">
      <path
        d={`M${cx - rx} ${top} V${bottom} A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom} V${top}`}
        fill="#CEEBFF"
        stroke={INK}
        strokeWidth="2"
      />
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="#fff" stroke={INK} strokeWidth="2" />
      <path d={`M${cx - rx} ${top + height / 2} A${rx} ${ry} 0 0 0 ${cx + rx} ${top + height / 2}`} fill="none" stroke={INK} strokeWidth="1" />
    </g>
  )
}

// Wire routing measured on the original (desktop viewBox 0 0 746 432): each wire drops from its
// card (start hidden under the card), turns on a 24-radius corner into a horizontal bus, and merges
// into one 12-radius trunk ending at (373.688, 251) on the storage top. Card centres here (92 / 279 /
// 467 / 654) already match the original wire x positions.
const WIRE_D = {
  you: 'M92 82.563 93 166.17v29.826c0 13.255 10.745 24 24 24h244.688c6.627 0 12 5.373 12 12v19.004',
  teammate: 'M279.668 90.529 280.336 166.17v29.826c0 13.255 10.745 24 24 24h57.352c6.627 0 12 5.373 12 12v19.004',
  pipeline: 'M467.332 102.889 466.664 166.17v29.826c0 13.255-10.745 24-24 24h-56.976c-6.627 0-12 5.373-12 12v19.004',
  agents: 'M654 121.834v74.162c0 13.255-10.745 24-24 24H385.688c-6.627 0-12 5.373-12 12v19.004',
}
const MERGE = { x: 373.688, y: 251 }

export function DiagramDesktop() {
  const xs = [12, 199, 387, 574]
  const y = 8
  // Cylinder top lifted so the merged trunk (y 251) enters its top face; bottom unchanged at 386.
  const top = 262
  const [ref, inView] = useLoopInView()
  return (
    <svg ref={ref} data-inview={inView} viewBox="0 0 746 432" className="relative z-[2] -mb-[40px] hidden h-auto w-full md:block xl:-mb-[45px]" role="img" aria-label="Diagram: four clients, each with its own compute, connected to shared storage">
      <defs>
        <WireDefs prefix="wd" cx={MERGE.x} cy={MERGE.y} />
      </defs>
      {NODES.map((n) => (
        <Wire key={n.id} id={n.id} prefix="wd" d={WIRE_D[n.id]} />
      ))}
      {NODES.map((n, i) => (
        <Node key={n.id} n={n} x={xs[i]} y={y} />
      ))}
      {/* bottom ends ~11 units into the plate overlap so the SHARED STORAGE chip stays visible */}
      <Cylinder cx={MERGE.x} top={top} rx={90} ry={14} height={386 - top} />
    </svg>
  )
}

export function DiagramMobile() {
  const x = 12
  const ys = [8, 128, 248, 368]
  const cx = 163
  const top = 560
  const ends = { you: 118, teammate: 148, pipeline: 178, agents: 208 }
  const [ref, inView] = useLoopInView()
  return (
    <svg ref={ref} data-inview={inView} viewBox="0 0 327 720" className="relative z-[2] -mb-[45px] block h-auto w-full md:hidden" role="img" aria-label="Diagram: four clients, each with its own compute, connected to shared storage">
      <defs>
        <WireDefs prefix="wm" cx={cx} cy={top} />
      </defs>
      {NODES.map((n, i) => {
        const sx = x + 160
        const sy = ys[i] + cardH(n) / 2
        const ex = ends[n.id]
        const bend = 300 - i * 18
        return <Wire key={n.id} id={n.id} prefix="wm" d={`M${sx} ${sy} C${bend} ${sy} ${bend} ${top - 60} ${ex} ${top}`} />
      })}
      {NODES.map((n, i) => (
        <Node key={n.id} n={n} x={x} y={ys[i]} />
      ))}
      <Cylinder cx={cx} top={top} rx={110} ry={18} height={130} />
    </svg>
  )
}
