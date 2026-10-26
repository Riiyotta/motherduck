// One wire = a static solid base path (5px, per-wire opacity) + 3 stacked animated round-capped
// pulse paths (spec §4 "Animated wires"): halo 9px / opacity .24 / feGaussianBlur 2.5, main 5px,
// core 1.75px. Strokes use radial gradients (measured: r=120, white at 0 -> colour at 1, centred
// where the wires merge). Under prefers-reduced-motion the original drops the pulse layers and only
// the solid base paths remain (index.css hides .animate-wire-flow).
//
// Motion (§11 #18, measured on the original's @keyframes): every layer runs
// stroke-dashoffset --from -> --to, linear, infinite, at the wire's --wire-dur
// (agents 312.5ms, you 625ms, teammate 1250ms, pipeline 2500ms). Offsets decrease, so dashes travel
// along the path direction (card -> storage). Paused while the diagram is >200px off-screen.

// Wire colours (§4). Values come from shared tokens except the teammate core (#FFF8B0, no token).
export const WIRES = {
  agents: {
    base: 0.45, // measured base-path opacity
    color: '#16AA98', core: '#B0FFF4', dur: '312.5ms', // garden / mint
    halo: ['32.94 20.19', 53.125, 0], main: ['18.06 35.06', 38.25, -14.875], coreDash: ['8.5 44.63', 28.69, -24.44],
  },
  you: {
    base: 0.48, // measured base-path opacity
    color: '#2BA5FF', core: '#CEEBFF', dur: '625ms', // sky-dark / sky-tint
    halo: ['51.68 31.68', 83.36, 0], main: ['28.34 55.02', 60.02, -23.34], coreDash: ['13.34 70.02', 45.02, -38.35],
  },
  teammate: {
    base: 0.78, // measured base-path opacity
    color: '#EBCD00', core: '#FFF8B0', dur: '1250ms', // yellow-chip-border / (no token)
    halo: ['81.10 49.71', 130.81, 0], main: ['44.48 86.33', 94.18, -36.63], coreDash: ['20.93 109.88', 70.64, -60.17],
  },
  pipeline: {
    base: 0.62, // measured base-path opacity
    color: '#FF9538', core: '#FFDCBD', dur: '2500ms', // orange / peach
    halo: ['127.26 78.00', 205.26, 0], main: ['69.79 135.47', 147.79, -57.47], coreDash: ['32.84 172.42', 110.84, -94.42],
  },
}

// Gradient defs for every wire. Original centres the gradients where the wires merge (373.688, 251
// in the desktop viewBox), so they brighten toward storage.
export function WireDefs({ prefix, cx, cy }) {
  return (
    <>
      <filter id={`${prefix}-halo`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
      {Object.entries(WIRES).map(([k, w]) => (
        <g key={k}>
          {[
            ['c', w.color],
            ['k', w.core],
          ].map(([s, col]) => (
            <radialGradient key={s} id={`${prefix}-${k}-${s}`} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r="120">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor={col} />
            </radialGradient>
          ))}
        </g>
      ))}
    </>
  )
}

const layer = (dash, dur) => ({
  strokeDasharray: dash[0],
  strokeDashoffset: dash[1],
  '--wire-dur': dur,
  '--from': dash[1],
  '--to': dash[2],
})

export default function Wire({ id, d, prefix }) {
  const w = WIRES[id]
  return (
    <g data-wire={id} fill="none" strokeLinecap="round">
      <path data-wire-layer="base" d={d} stroke={`url(#${prefix}-${id}-c)`} strokeWidth="5" opacity={w.base} />
      <path
        data-wire-layer="halo"
        className="animate-wire-flow"
        d={d}
        stroke={`url(#${prefix}-${id}-c)`}
        strokeWidth="9"
        opacity="0.24"
        filter={`url(#${prefix}-halo)`}
        style={layer(w.halo, w.dur)}
      />
      <path data-wire-layer="main" className="animate-wire-flow" d={d} stroke={`url(#${prefix}-${id}-c)`} strokeWidth="5" style={layer(w.main, w.dur)} />
      <path data-wire-layer="core" className="animate-wire-flow" d={d} stroke={`url(#${prefix}-${id}-k)`} strokeWidth="1.75" style={layer(w.coreDash, w.dur)} />
    </g>
  )
}
