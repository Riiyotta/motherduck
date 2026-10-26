// "Pip", the clone's original mascot: a rounded data-block body with an antenna and stubby legs.
// Pose library built from composable parts, all in a 200x200 local box (body centre ~100,100):
//   pose   arms: none | idle | wave | point | pointLeft | greet | cheer | hold | hug | read | type | peek | fly | sign | lift | hip
//   legs:  stand | walk | sit | fly | none          view: front | side
//   look:  left | right | up | down | center | closed        facing: left | right (mirrors arms)
//   mouth: smile | open | flat          shadow: ground shadow colour (or true for translucent ink)
// Limbs are filled tubes (body colour) with a 2px non-scaling ink outline, so the figure keeps the
// house style's chunky white silhouettes at any size. Props drawn by scenes go in front of / behind
// Pip via scene ordering.
import { C } from './palette.js'

// Mascot theme from IMAGE_BRIEFS.md house style: white body, orange #FF9538 accents (antenna tip,
// feet), coral #FF7169 cheeks, #383838 outline rendered at 2px on screen (non-scaling stroke),
// round caps and joins.
export const PIP = { body: C.white, accent: C.orange, cheek: C.red, ink: C.ink }
const NS = { vectorEffect: 'non-scaling-stroke' }
const S = { stroke: PIP.ink, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...NS }

// --- tube geometry: a cubic centre line ("M x y c dx1 dy1 dx2 dy2 dx dy") swept to a filled outline
const num = (s) => s.match(/-?\d*\.?\d+/g).map(Number)
function cubic(d) {
  const [x0, y0, a, b, c, e, f, g] = num(d)
  return [[x0, y0], [x0 + a, y0 + b], [x0 + c, y0 + e], [x0 + f, y0 + g]]
}
const at = ([p0, p1, p2, p3], t) => {
  const u = 1 - t
  return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k])
}
export function tube(d, w = 20, w2 = w) {
  const P = cubic(d)
  const n = 14
  const L = []
  const R = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const p = at(P, t)
    const q = at(P, Math.min(1, t + 0.01))
    const o = at(P, Math.max(0, t - 0.01))
    let dx = q[0] - o[0]
    let dy = q[1] - o[1]
    const len = Math.hypot(dx, dy) || 1
    dx /= len
    dy /= len
    const r = (w + (w2 - w) * t) / 2
    L.push([p[0] - dy * r, p[1] + dx * r])
    R.push([p[0] + dy * r, p[1] - dx * r])
  }
  const f = (pt) => `${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`
  const r0 = w / 2
  const r1 = w2 / 2
  return `M${f(L[0])}L${L.map(f).join(' ')}A${r1} ${r1} 0 0 0 ${f(R[n])}L${R.slice().reverse().map(f).join(' ')}A${r0} ${r0} 0 0 0 ${f(L[0])}z`
}
const end = (d) => cubic(d)[3]
const dir = (d) => {
  const P = cubic(d)
  const dx = P[3][0] - P[2][0]
  const dy = P[3][1] - P[2][1]
  const l = Math.hypot(dx, dy) || 1
  return [dx / l, dy / l]
}

// Right-hand arm centre lines (for facing right); the left arm is the mirror unless given.
// front: arm crosses in front of the body (otherwise it tucks behind the body edge).
const ARMS = {
  idle: { r: 'M150 104c14 6 22 20 22 38' },
  wave: { r: 'M150 98c18-8 30-28 32-54' },
  point: { r: 'M150 104c18 0 36-4 48-12', finger: true },
  cheer: { r: 'M150 98c18-8 30-28 32-54', l: 'M50 98c-18-8-30-28-32-54' },
  hold: { r: 'M154 102c12 10 4 32-22 36', front: true, l: 'M46 102c-12 10-4 32 22 36' },
  hug: { r: 'M154 104c14 14 6 40-30 44', front: true, l: 'M46 104c-14 14-6 40 30 44' },
  read: { r: 'M154 108c10 12 2 28-20 32', front: true, l: 'M46 108c-10 12-2 28 20 32' },
  type: { r: 'M150 112c14 12 18 30 10 44', front: true, l: 'M50 112c-14 12-18 30-10 44' },
  peek: { r: 'M150 124c12 14 14 30 10 42', front: true, l: 'M50 124c-12 14-14 30-10 42' },
  fly: { r: 'M150 100c20 2 38 12 46 28', l: 'M50 100c-20 2-38 12-46 28' },
  sign: { r: 'M150 98c16-6 24-22 22-42', l: 'M50 98c-16-6-24-22-22-42' },
  lift: { r: 'M150 98c18-6 26-22 26-44', front: false },
  hip: { r: 'M150 104c16 2 24 12 20 26' },
  greet: { r: 'M150 98c18-8 30-28 32-54', l: 'M50 106c-16 2-30 10-38 24' },
  pointLeft: { r: 'M150 106c16 6 26 20 28 36', l: 'M50 104c-20 0-42-4-56-12', lfinger: true },
}
// Leg centre lines and foot placement (front view, facing right; mirrored when facing left).
const LEGS = {
  stand: { l: 'M76 150c0 10 0 18-2 26', r: 'M124 150c0 10 0 18 2 26', fl: [74, 188], fr: [128, 188] },
  walk: { l: 'M76 150c-2 10-6 18-12 24', r: 'M124 150c2 10 4 18 8 26', fl: [62, 186], fr: [134, 188] },
  sit: { l: 'M78 150c2 16 8 26 24 28', r: 'M122 150c4 16 12 26 28 28', fl: [108, 176], fr: [154, 176] },
  fly: { l: 'M76 152c-6 12-16 18-30 20', r: 'M104 156c-4 12-14 20-26 24', fl: [42, 172], fr: [74, 180] },
  none: null,
}
const LOOK = { left: [-6, 0], right: [6, 0], up: [0, -7], down: [0, 6], center: [0, 0], closed: [0, 0] }

function Arm({ d, body, finger }) {
  const [hx, hy] = end(d)
  const [ux, uy] = dir(d)
  return (
    <g>
      <path d={tube(d, 20, 18)} fill={body} {...S} />
      {finger && <path d={tube(`M${hx} ${hy}c${ux * 6} ${uy * 6} ${ux * 12} ${uy * 12} ${ux * 18} ${uy * 18}`, 8, 8)} fill={body} {...S} />}
      <circle cx={hx} cy={hy} r="12" fill={body} {...S} />
    </g>
  )
}
// Chunky orange foot pointing forward (toward +x before mirroring).
const Foot = ({ x, y, sit }) => (
  <path
    d={sit ? `M${x - 7} ${y - 16}c-5 9-5 18 2 20h10c5-2 5-11-2-20z` : `M${x - 14} ${y}c-2-8 6-13 14-13 10 0 20 6 24 13z`}
    fill={PIP.accent}
    {...S}
  />
)

export function PipFigure({
  x = 0, y = 0, s = 1, body = PIP.body, pose = 'idle', facing = 'right', blush = true,
  legs = 'stand', view = 'front', look, mouth = 'smile', shadow, armR, armL, armFront,
}) {
  const flip = facing === 'left'
  const lk = LOOK[look || (view === 'side' ? 'center' : facing === 'left' ? 'left' : facing === 'right' ? 'right' : 'center')]
  const a0 = pose === 'none' ? { r: null } : ARMS[pose] || ARMS.idle
  // armR / armL: custom centre lines (local 200-box units, facing-right frame) override the pose
  const a = armR || armL ? { ...a0, r: armR || a0.r || ARMS.idle.r, l: armL || a0.l, front: armFront ?? a0.front } : a0
  const side = view === 'side'
  const bx = side ? 58 : 40
  const bw = side ? 84 : 120
  const mirror = (d) => {
    const v = num(d)
    return `M${200 - v[0]} ${v[1]}c${-v[2]} ${v[3]} ${-v[4]} ${v[5]} ${-v[6]} ${v[7]}`
  }
  const right = a.r && (side ? a.r.replace(/^M150/, 'M120') : a.r)
  const oneArm = ['wave', 'point', 'lift', 'hip'].includes(pose)
  const left = side || !a.r ? null : a.l || mirror(oneArm ? ARMS.idle.r : a.r)
  const lg = LEGS[legs]
  const sh = shadow === true ? 'rgba(56,56,56,.18)' : shadow
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={flip ? 'translate(200 0) scale(-1 1)' : undefined}>
        {sh && lg && <ellipse cx={100} cy={legs === 'sit' ? 180 : 190} rx={side ? 58 : 82} ry="10" fill={sh} />}
        <g {...S}>
          <path d="M100 40V20" fill="none" />
          <circle cx="100" cy="14" r="9" fill={PIP.accent} />
        </g>
        {/* far limbs (behind the body) */}
        {lg && (side ? (
          <g>
            <path d={tube('M94 150c0 10 0 18 0 26', 16, 14)} fill={body} {...S} />
            <Foot x={102} y={188} />
          </g>
        ) : (
          <g>
            <path d={tube(lg.l, 16, 14)} fill={body} {...S} />
            <path d={tube(lg.r, 16, 14)} fill={body} {...S} />
            <Foot x={lg.fl[0]} y={lg.fl[1]} sit={legs === 'sit'} />
            <Foot x={lg.fr[0]} y={lg.fr[1]} sit={legs === 'sit'} />
          </g>
        ))}
        {left && !a.front && <Arm d={left} body={body} finger={a.lfinger} />}
        {right && !a.front && <Arm d={right} body={body} finger={a.finger} />}
        <g {...S}>
          <rect x={bx} y="38" width={bw} height="124" rx="28" fill={body} />
          <path d={`M${bx + 10} 80h${bw - 20}M${bx + 10} 122h${bw - 20}`} fill="none" opacity=".3" />
        </g>
        {/* face (drawn in the un-mirrored direction by reversing the look offset when flipped) */}
        {side ? (
          <g>
            <circle cx={124} cy={96 + lk[1]} r="7" fill={C.ink} />
            <circle cx={126} cy={94 + lk[1]} r="2" fill={C.white} />
            {mouth === 'open' ? (
              <path d="M114 112h24c0 10-6 15-12 15s-12-5-12-15z" fill={C.ink} {...S} />
            ) : (
              <path d="M118 116c6 4 14 4 20 0" fill="none" {...S} />
            )}
            {blush && <ellipse cx="110" cy="112" rx="6" ry="4" fill={PIP.cheek} opacity=".55" />}
          </g>
        ) : (
          <g transform={`translate(${flip ? -lk[0] : lk[0]} ${lk[1]})`}>
            {look === 'closed' ? (
              <path d="M72 96c4 4 12 4 16 0M112 96c4 4 12 4 16 0" fill="none" {...S} />
            ) : (
              // pip-eyes / pip-blink: unstyled hooks for scene idle loops (index.css .pip-aster)
              <g className="pip-eyes">
                <g className="pip-blink">
                  <ellipse cx="80" cy="95" rx="7" ry="8.5" fill={C.ink} />
                  <ellipse cx="120" cy="95" rx="7" ry="8.5" fill={C.ink} />
                  <circle cx="82" cy="92" r="2.2" fill={C.white} />
                  <circle cx="122" cy="92" r="2.2" fill={C.white} />
                </g>
              </g>
            )}
            {mouth === 'open' ? (
              <g>
                <path d="M84 112h32c0 14-8 20-16 20s-16-6-16-20z" fill={C.ink} {...S} />
                <path d="M92 126c4-5 12-5 16 0-4 4-12 4-16 0z" fill={PIP.cheek} />
              </g>
            ) : mouth === 'flat' ? (
              <path d="M90 118h20" fill="none" {...S} />
            ) : (
              <path d="M86 114c8 8 20 8 28 0" fill="none" {...S} />
            )}
            {blush && <ellipse cx="64" cy="112" rx="7" ry="4" fill={PIP.cheek} opacity=".55" />}
            {blush && <ellipse cx="136" cy="112" rx="7" ry="4" fill={PIP.cheek} opacity=".55" />}
          </g>
        )}
        {/* near limbs crossing in front of the body */}
        {left && a.front && <Arm d={left} body={body} finger={a.lfinger} />}
        {right && a.front && <Arm d={right} body={body} finger={a.finger} />}
      </g>
    </g>
  )
}

// Small floating doodles from the house style: diamond, starburst, circle-with-X, cloud.
export function Doodle({ kind, x, y, s = 1, fill = C.white }) {
  const p = { stroke: C.ink, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round', ...NS }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {kind === 'diamond' && <path d="M0-10 8 0 0 10-8 0z" fill={fill} {...p} />}
      {kind === 'star' && <path d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3z" fill={fill} {...p} />}
      {kind === 'x' && (
        <g {...p} fill={fill}>
          <circle r="9" />
          <path d="M-4-4 4 4M4-4-4 4" fill="none" />
        </g>
      )}
      {kind === 'cloud' && (
        <path d="M-30 8c-8 0-10-12-2-14 0-10 14-14 20-6 6-10 24-8 24 4 10-2 14 12 4 16z" fill={fill} {...p} />
      )}
    </g>
  )
}

// Sunburst rays behind a subject (house style).
export function Sunburst({ cx, cy, r, rays = 16, fill = C.sun }) {
  const pts = []
  for (let i = 0; i < rays * 2; i++) {
    const a = (Math.PI * i) / rays
    const rr = i % 2 ? r * 0.72 : r
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`)
  }
  return <polygon points={pts.join(' ')} fill={fill} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" {...NS} />
}
