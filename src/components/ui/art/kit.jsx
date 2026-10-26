// Flat ink-outline primitives for house-style scenes. Each primitive draws around (0,0) in a
// roughly 100x100 local box; <Scene> places them with [kind, x, y, scale, props, rotate].
// Strokes are non-scaling so outlines stay ~2px at any display size (IMAGE_BRIEFS house style).
import { C, svgProps } from './palette.js'
import { PipFigure, tube } from './pip.jsx'

export const K = { stroke: C.ink, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke' }
const L = { ...K, fill: 'none' }
const MONO = "'Fragment Mono', ui-monospace, monospace"
const DISPLAY = "'Space Grotesk', sans-serif"
export const FONTS = { MONO, DISPLAY, SANS: 'Inter, system-ui, sans-serif' }

const lines = (x, y, ws, gap = 9, h = 3, fill = C.ink, op = 0.6) =>
  ws.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={fill} opacity={op} />)

// Window body content kinds, drawn into a box (x, y, w, h).
function Content({ kind, x, y, w, h, accent = C.blue, dark = false }) {
  const ink = dark ? C.white : C.ink
  switch (kind) {
    case 'line':
      return <path d={`M${x + 6} ${y + h - 8} l${w * 0.2} ${-h * 0.25} l${w * 0.18} ${h * 0.1} l${w * 0.2} ${-h * 0.35} l${w * 0.26} ${-h * 0.15}`} {...L} stroke={accent} strokeWidth="2.5" />
    case 'area':
      return <path d={`M${x + 4} ${y + h - 4} l${w * 0.2} ${-h * 0.3} l${w * 0.2} ${h * 0.1} l${w * 0.2} ${-h * 0.4} l${w * 0.3} ${-h * 0.1} V${y + h - 4}z`} {...K} fill={accent} />
    case 'bars':
      return [0.45, 0.7, 0.55, 0.9, 0.65].map((f, i) => (
        <rect key={i} x={x + 6 + i * ((w - 12) / 5)} y={y + h - 4 - (h - 10) * f} width={(w - 12) / 5 - 4} height={(h - 10) * f} {...K} fill={i % 2 ? accent : C.sun} />
      ))
    case 'pie':
      return (
        <g>
          <circle cx={x + w / 2} cy={y + h / 2} r={Math.min(w, h) * 0.34} {...K} fill={C.sun} />
          <path d={`M${x + w / 2} ${y + h / 2} v${-Math.min(w, h) * 0.34} a${Math.min(w, h) * 0.34} ${Math.min(w, h) * 0.34} 0 0 1 ${Math.min(w, h) * 0.34} ${Math.min(w, h) * 0.34}z`} {...K} fill={accent} />
        </g>
      )
    case 'code':
      return lines(x + 6, y + 7, [w * 0.5, w * 0.7, w * 0.35, w * 0.6, w * 0.45].filter((_, i) => 7 + i * 9 < h - 2), 9, 3, ink, 0.7)
    case 'table':
      return (
        <g>
          {[0, 1, 2, 3].filter((r) => 6 + r * (h / 4.2) < h).map((r) => <path key={r} d={`M${x + 4} ${y + 6 + r * (h / 4.2)}h${w - 8}`} {...L} strokeWidth="1" />)}
          <path d={`M${x + w * 0.4} ${y + 2}v${h - 4}`} {...L} strokeWidth="1" />
        </g>
      )
    case 'grid':
      return (
        <g>
          {[1, 2, 3].map((i) => <path key={'v' + i} d={`M${x + (w * i) / 4} ${y}v${h}`} {...L} strokeWidth="1" />)}
          {[1, 2].map((i) => <path key={'h' + i} d={`M${x} ${y + (h * i) / 3}h${w}`} {...L} strokeWidth="1" />)}
        </g>
      )
    case 'heart':
      return <path transform={`translate(${x + w / 2} ${y + h / 2}) scale(${Math.min(w, h) / 60})`} d="M0 14C-22 0-20-16-9-16c5 0 8 4 9 6 1-2 4-6 9-6 11 0 13 16-9 30z" {...K} fill={C.red} />
    case 'kpi':
      return (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={x + 4 + i * (w - 8) / 3} y={y + 4} width={(w - 8) / 3 - 4} height={h * 0.3} {...K} fill={[C.sun, C.mint, C.skyTint][i]} />)}
          <path d={`M${x + 6} ${y + h - 6} l${w * 0.25} ${-h * 0.25} l${w * 0.2} ${h * 0.12} l${w * 0.4} ${-h * 0.3}`} {...L} stroke={accent} strokeWidth="2.5" />
        </g>
      )
    case 'chip':
      return (
        <g>
          <rect x={x + w / 2 - 14} y={y + h / 2 - 14} width="28" height="28" rx="3" {...K} fill={C.sun} />
          {[-8, 0, 8].map((d) => <path key={d} d={`M${x + w / 2 + d} ${y + h / 2 - 20}v6M${x + w / 2 + d} ${y + h / 2 + 14}v6`} {...L} />)}
        </g>
      )
    case 'cols':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={x + 6 + i * ((w - 12) / 4)} y={y + 6} width={(w - 12) / 4 - 6} height={h - 12} {...K} fill={i % 2 ? C.blue : C.skyTint} />)}
          {[1, 2, 3, 4, 5].map((r) => <path key={'r' + r} d={`M${x + 6} ${y + 6 + r * ((h - 12) / 6)}h${w - 12}`} {...L} strokeWidth="1" opacity=".5" />)}
        </g>
      )
    case 'prompt':
      return (
        <g>
          <text x={x + 6} y={y + 14} fontFamily={MONO} fontSize="10" fill={C.sun}>$</text>
          <rect x={x + 16} y={y + 7} width={w * 0.5} height="3" fill={C.white} opacity=".8" />
          <rect x={x + 6} y={y + 20} width="7" height="10" fill={C.white} />
        </g>
      )
    default:
      return null
  }
}

const P = {
  // ---- containers / UI
  win: ({ w = 90, h = 64, fill = C.white, header = C.sky, content = 'line', accent, dark, hh }) => {
    // header bar scales with big windows (~10% of height, min 12)
    const H = hh ?? Math.max(12, Math.round(h * 0.11))
    const r = Math.max(2, H / 6)
    return (
      <g>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" {...K} fill={dark ? C.ink : fill} />
        <path d={`M${-w / 2} ${-h / 2 + H}h${w}`} {...L} />
        <rect x={-w / 2 + 1} y={-h / 2 + 1} width={w - 2} height={H - 2} rx="2" fill={header} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + H * 0.6 + i * r * 3.2} cy={-h / 2 + H / 2} r={r} {...K} fill={C.white} stroke={header === C.ink ? 'none' : C.ink} />)}
        <Content kind={content} x={-w / 2} y={-h / 2 + H} w={w} h={h - H} accent={accent} dark={dark} />
      </g>
    )
  },
  terminal: ({ w = 90, h = 60 }) => P.win({ w, h, header: C.grey, content: 'prompt', dark: true }),
  laptop: ({ screen = C.white, content = 'line', accent }) => (
    <g>
      <rect x="-36" y="-34" width="72" height="48" rx="3" {...K} fill={C.mute} />
      <rect x="-31" y="-29" width="62" height="38" fill={screen} stroke="none" />
      <Content kind={content} x={-31} y={-29} w={62} h={38} accent={accent} />
      <path d="M-46 14h92l-6 10h-80z" {...K} fill={C.line} />
    </g>
  ),
  server: ({ fill = C.white }) => (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="-26" y={-36 + i * 24} width="52" height="20" rx="2" {...K} fill={fill} />
          <circle cx="-16" cy={-26 + i * 24} r="2.5" fill={[C.teal, C.sun, C.red][i]} />
          <path d={`M-6 ${-26 + i * 24}h22`} {...L} />
        </g>
      ))}
    </g>
  ),
  card: ({ w = 50, h = 34, fill = C.white, r = 2, text }) => (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} {...K} fill={fill} />
      {text ? <text x="0" y="4" textAnchor="middle" fontFamily={DISPLAY} fontWeight="700" fontSize="12" fill={C.ink}>{text}</text> : lines(-w / 2 + 6, -h / 2 + 8, [w * 0.6, w * 0.45, w * 0.55].slice(0, Math.max(1, Math.floor((h - 8) / 9))))}
    </g>
  ),
  sheet: ({ fill = C.white, label }) => (
    <g>
      <path d="M-22-30h30l14 14v46h-44z" {...K} fill={fill} />
      <path d="M8-30v14h14" {...L} />
      {label ? <text x="0" y="8" textAnchor="middle" fontFamily={MONO} fontSize="11" fill={C.ink}>{label}</text> : lines(-15, -10, [28, 22, 30, 18], 8)}
    </g>
  ),
  clipboard: ({ fill = C.white }) => (
    <g>
      <rect x="-26" y="-34" width="52" height="68" rx="4" {...K} fill={C.peach} />
      <rect x="-20" y="-26" width="40" height="54" {...K} fill={fill} />
      <rect x="-10" y="-40" width="20" height="12" rx="3" {...K} fill={C.grey} />
      {lines(-14, -16, [28, 22, 26, 16], 9)}
    </g>
  ),
  pill: ({ text = 'QUERY', fill = C.ink, color = C.white }) => {
    const w = 12 + text.length * 7
    return (
      <g>
        <rect x={-w / 2} y="-9" width={w} height="18" rx="9" fill={fill} />
        <text x="0" y="4" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={color}>{text}</text>
      </g>
    )
  },
  badge: ({ text = 'SQL', fill = C.sun, r = 6 }) => (
    <g>
      <rect x="-20" y="-20" width="40" height="40" rx={r} {...K} fill={fill} />
      <text x="0" y={text.length > 3 ? 4 : 5} textAnchor="middle" fontFamily={DISPLAY} fontWeight="700" fontSize={text.length > 3 ? 10 : 14} fill={C.ink}>{text}</text>
    </g>
  ),
  // ---- data objects
  drum: ({ fill = C.white, top, face, h = 54, band = true }) => (
    <g>
      <path d={`M-28-${h / 2}v${h}c0 8 56 8 56 0v-${h}`} {...K} fill={fill} />
      <ellipse cx="0" cy={-h / 2} rx="28" ry="8" {...K} fill={top || fill} />
      {!face && band && <path d={`M-28 0c0 8 56 8 56 0`} {...L} />}
      {face && (
        <g>
          <circle cx="-9" cy="2" r="3" fill={C.ink} />
          <circle cx="9" cy="2" r="3" fill={C.ink} />
          <path d="M-6 12c4 4 8 4 12 0" {...L} />
        </g>
      )}
    </g>
  ),
  gear: ({ fill = C.sky }) => {
    const t = []
    for (let i = 0; i < 8; i++) t.push(<rect key={i} x="-5" y="-30" width="10" height="12" {...K} fill={fill} transform={`rotate(${i * 45})`} />)
    return (
      <g>
        {t}
        <circle r="21" {...K} fill={fill} />
        <circle r="8" {...K} fill={C.white} />
      </g>
    )
  },
  ring: ({ fill = C.sun }) => (
    <g>
      <circle r="26" {...K} fill={fill} />
      <circle r="11" {...K} fill={C.white} />
      <ellipse rx="44" ry="14" {...L} transform="rotate(-20)" strokeDasharray="3 5" />
      <circle cx="40" cy="-14" r="4" {...K} fill={C.blue} />
      <circle cx="-38" cy="16" r="3" {...K} fill={C.red} />
    </g>
  ),
  chartCard: ({ kind = 'bars', fill = C.white, accent = C.blue }) => (
    <g>
      <rect x="-34" y="-26" width="68" height="52" rx="3" {...K} fill={fill} />
      {(kind === 'u' || kind === 'bell') && <path d="M-26-18v38h54M24 16l4 4-4 4M-30-14l4-4 4 4" {...L} strokeWidth="1.5" />}
      {kind === 'u' && <path d="M-20-14c4 36 40 36 44 0" {...L} strokeWidth="2.5" />}
      {kind === 'bell' && <path d="M-22 16c12 0 12-30 22-30s14 30 26 30" {...L} strokeWidth="2.5" />}
      {kind !== 'u' && kind !== 'bell' && <Content kind={kind} x={-34} y={-20} w={68} h={46} accent={accent} />}
    </g>
  ),
  // ---- objects
  cloud: ({ fill = C.white }) => <path d="M-38 16c-12 0-14-18-2-20-2-14 16-22 26-12 6-16 32-16 34 2 14-2 20 18 6 30z" {...K} fill={fill} />,
  heart: ({ fill = C.red }) => <path d="M0 30C-46 2-40-30-18-30c10 0 16 8 18 12 2-4 8-12 18-12 22 0 28 32-18 60z" {...K} fill={fill} />,
  shield: ({ fill = C.aqua, left, check = true }) => (
    <g>
      <path d="M0-40 34-28v22C34 16 18 32 0 40-18 32-34 16-34-6v-22z" {...K} fill={fill} />
      {left && <path d="M0-40-34-28v22C-34 16-18 32 0 40z" {...K} fill={left} />}
      {check && <path d="M-14 0 -3 11 16-10" {...L} strokeWidth="3" />}
    </g>
  ),
  magnifier: ({ rim = C.orange, lens = C.skyTint, handle }) => (
    <g>
      {handle ? <path d="M14 10 42 38l-4 4-28-28z" {...K} fill={handle} /> : <path d="M14 14 38 38" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />}
      <circle cx="-6" cy="-6" r="26" {...K} fill={rim} />
      <circle cx="-6" cy="-6" r="19" {...K} fill={lens} />
      <path d="M-18-12c2-6 6-10 12-11" {...L} stroke={C.white} strokeWidth="3" />
    </g>
  ),
  rocket: ({ fill = C.white, accent = C.red }) => (
    <g transform="rotate(45)">
      <path d="M0-44c16 12 18 40 12 56h-24c-6-16-4-44 12-56z" {...K} fill={fill} />
      <path d="M0-44c8 6 12 14 13 22h-26c1-8 5-16 13-22z" {...K} fill={accent} />
      <circle cy="-4" r="7" {...K} fill={C.skyTint} />
      <path d="M-12 4-24 20l12-2zM12 4l12 16-12-2z" {...K} fill={accent} />
      <path d="M-7 14c0 10 7 20 7 20s7-10 7-20z" {...K} fill={C.orange} />
    </g>
  ),
  // megaphone: bell opening to the left, handle below, sound ticks to the right
  megaphone: ({ fill = C.cream, ticks = true }) => (
    <g>
      <path d="M-8 10 0 40h12L6 12" {...K} fill={fill} />
      <path d="M-30-30 26-12v22l-56 22z" {...K} fill={fill} />
      <ellipse cx="-30" cy="-4" rx="12" ry="27" {...K} fill={fill} />
      <ellipse cx="-30" cy="-4" rx="6" ry="15" fill={C.ink} />
      <rect x="24" y="-15" width="10" height="28" rx="4" {...K} fill={fill} />
      {ticks && <path d="M44-26l12-10M46-8h16M44 10l12 8" {...L} />}
    </g>
  ),
  envelope: ({ fill = C.white }) => (
    <g>
      <rect x="-36" y="-24" width="72" height="48" rx="3" {...K} fill={fill} />
      <path d="M-36-24 0 6l36-30" {...L} />
    </g>
  ),
  calendar: ({ header = C.blue, blank, rings = C.grey }) => (
    <g>
      <rect x="-50" y="-44" width="100" height="92" rx="4" {...K} fill={C.white} />
      <path d="M-50-20h100" {...L} />
      <rect x="-49" y="-43" width="98" height="22" rx="3" fill={header} />
      {[-22, 22].map((x) => <rect key={x} x={x - 4} y="-52" width="8" height="18" rx="4" {...K} fill={rings} />)}
      {!blank && [0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <rect key={`${r}${c}`} x={-42 + c * 18} y={-12 + r * 14} width="12" height="8" fill={C.soft} />))}
    </g>
  ),
  bolt: ({ fill = C.sun }) => <path d="M6-40-22 6h18l-6 34 30-48H2z" {...K} fill={fill} />,
  stopwatch: ({ fill = C.white }) => (
    <g>
      <rect x="-6" y="-44" width="12" height="8" {...K} fill={C.grey} />
      <circle r="34" cy="2" {...K} fill={fill} />
      <path d="M0 2V-32A34 34 0 0 1 30 -14z" {...K} fill={C.red} />
      <path d="M0 2 14-14" {...L} strokeWidth="2.5" />
    </g>
  ),
  piggy: ({ fill = C.red }) => (
    <g>
      <path d="M-24 18v16h12v-12M10 22v12h12v-14" {...K} fill={fill} />
      <ellipse cx="0" cy="0" rx="38" ry="28" {...K} fill={fill} />
      <path d="M6-24l8-14 10 16" {...K} fill={fill} />
      <ellipse cx="38" cy="4" rx="7" ry="10" {...K} fill={fill} />
      <path d="M36 0v6M40 0v6" {...L} />
      <circle cx="18" cy="-8" r="3" fill={C.ink} />
      <rect x="-12" y="-30" width="18" height="4" rx="2" fill={C.ink} />
    </g>
  ),
  mug: ({ fill = C.sun, tall }) => (
    <g>
      <path d={`M-18 ${tall ? -40 : -20}h36v${tall ? 70 : 42}c0 6-4 10-10 10h-16c-6 0-10-4-10-10z`} {...K} fill={fill} />
      <path d="M18-6c14 0 14 22 0 22" {...L} strokeWidth="2" />
      <path d={`M-6 ${tall ? -50 : -30}c-4-6 4-8 0-14M6 ${tall ? -50 : -30}c-4-6 4-8 0-14`} {...L} />
    </g>
  ),
  plane: ({ fill = C.white }) => (
    <g>
      <path d="M-40 0 40-24 4 30-4 6z" {...K} fill={fill} />
      <path d="M-4 6 40-24" {...L} />
    </g>
  ),
  signpost: ({ fill = C.sun, text = 'THIS WAY', text2 = 'THAT WAY', fill2 = C.blue }) => (
    <g>
      <path d="M-2-50v100" {...L} strokeWidth="3" />
      <circle cx="-2" cy="-52" r="4" {...K} fill={C.red} />
      <rect x="-44" y="-42" width="84" height="24" rx="3" {...K} fill={fill} />
      <rect x="-40" y="-14" width="76" height="20" rx="3" {...K} fill={fill2} />
      <text x="-2" y="-26" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={C.ink}>{text} →</text>
      <text x="-2" y="0" textAnchor="middle" fontFamily={MONO} fontSize="7" fill={C.ink}>← {text2}</text>
    </g>
  ),
  sun: ({ fill = C.sun, ring }) => (
    <g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d="M0-34v-10" {...L} strokeWidth="3" stroke={ring ? fill : C.ink} transform={`rotate(${a})`} />)}
      {ring ? <g><circle r="24" fill="none" stroke={C.ink} strokeWidth="9" /><circle r="24" fill="none" stroke={fill} strokeWidth="5" /></g> : <circle r="24" {...K} fill={fill} />}
    </g>
  ),
  leaf: ({ fill = C.teal }) => (
    <g>
      <path d="M-26 26C-30-10-4-30 30-30 30 6 8 30-26 26z" {...K} fill={fill} />
      <path d="M-26 26 16-16" {...L} />
    </g>
  ),
  flag: ({ fill = C.red }) => (
    <g>
      <path d="M-20 40v-80" {...L} strokeWidth="3" />
      <path d="M-20-40h40l-10 14 10 14h-40z" {...K} fill={fill} />
    </g>
  ),
  globe: ({ ocean = C.blue, land = C.aqua }) => (
    <g>
      <defs><clipPath id="art-globe-clip"><circle r="46" /></clipPath></defs>
      <circle r="46" {...K} fill={ocean} />
      <g clipPath="url(#art-globe-clip)">
        <path transform="scale(.82) translate(-4 0)" d="M-44-22c8-14 26-22 36-14 6 6-2 12 4 18s2 16-8 18c-8 2-6 12-12 22-4 8-4 22-12 24-10-14-14-40-8-68zM-20 18c8 0 14 6 12 16-2 12-6 20-4 32h-16c0-16-6-26-2-36 2-8 4-12 10-12zM4-44c14-4 36 4 44 20-6 4-14-2-18 4 0 8 10 10 8 20-2 10-12 6-16 16-4 12 4 24-2 34-10-2-16-14-14-28 2-10-8-14-6-24 2-8 8-8 4-16-4-6-8-10 0-26z" {...K} fill={land} />
      </g>
      <path d="M-36 10h6l3-3 3 3h6M20 30h5l3-3 3 3h5" {...L} strokeWidth="1.2" />
    </g>
  ),
  pin: ({ fill = C.red }) => (
    <g>
      <path d="M0 18C-12 2-14-4-14-8a14 14 0 0 1 28 0c0 4-2 10-14 26z" {...K} fill={fill} />
      <circle cy="-8" r="5" {...K} fill={C.white} />
    </g>
  ),
  book: ({ fill = C.red, open, title }) =>
    open ? (
      <g>
        <path d="M0-26c-14-8-30-8-44-4v58c14-4 30-4 44 4 14-8 30-8 44-4v-58c-14-4-30-4-44 4z" {...K} fill={C.white} />
        <path d="M0-26v58" {...L} />
        <path d="M-44-30v-4c14-4 30-4 44 4 14-8 30-8 44-4v4" {...L} />
        {lines(-36, -16, [26, 30, 22, 28, 18], 8, 2.5)}
        {lines(8, -16, [28, 24, 30, 20, 26], 8, 2.5)}
        <path d="M-46 30c16-6 30-4 46 4 16-8 30-10 46-4" {...K} fill={fill} />
      </g>
    ) : (
      <g>
        <path d="M-26-36h50v72h-46a6 6 0 0 1-6-6z" {...K} fill={fill} />
        <path d="M-26 30a6 6 0 0 1 6-6h44" {...L} />
        <rect x="-14" y="-24" width="28" height="12" {...K} fill={C.white} />
        {title && <text x="0" y="-15" textAnchor="middle" fontFamily={MONO} fontSize="7" fill={C.ink}>{title}</text>}
      </g>
    ),
  books: () => (
    <g>
      {[[C.red, -60, 20, 0], [C.blue, -20, 20, 0], [C.aqua, 20, 20, -12], [C.sun, 56, 22, 8], [C.orange, -36, -18, 90], [C.peach, 20, -22, 84]].map(([f, x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x="-14" y="-30" width="28" height="60" rx="2" {...K} fill={f} />
          <path d="M-14-20h28M-14 20h28" {...L} />
        </g>
      ))}
    </g>
  ),
  // low round coffee table: peach top, brown drum base, soft floor shadow
  lowTable: ({ top = C.peach, base = '#C98B5A', rx = 255 }) => (
    <g>
      <ellipse cx="0" cy="62" rx={rx * 0.66} ry="14" fill="rgba(56,56,56,.22)" />
      <path d={`M-100 10v44c0 10 200 10 200 0V10`} {...K} fill={base} />
      <path d={`M${-rx} 0v8c0 10 ${rx * 2} 10 ${rx * 2} 0v-8`} {...K} fill={top} />
      <ellipse cx="0" cy="0" rx={rx} ry="12" {...K} fill={top} />
    </g>
  ),
  // big rocket lying along +x (rotate it in the scene), cream body, coral nose and fins, porthole
  bigRocket: ({ fill = '#E6E0D8', accent = C.red, band = C.teal }) => (
    <g>
      <path d="M-120-50l-46-40h52l52 40zM-120 50l-46 40h52l52-40z" {...K} fill={accent} />
      <path d="M-150-50h190c60 0 110 30 130 50-20 20-70 50-130 50h-190c-8 0-12-24-12-50s4-50 12-50z" {...K} fill={fill} />
      <path d="M-150-50c-8 0-12 24-12 50s4 50 12 50h14c-8 0-12-24-12-50s4-50 12-50z" {...K} fill={band} />
      <path d="M100-46c34 10 56 30 70 46-14 16-36 36-70 46 12-26 14-66 0-92z" {...K} fill={accent} />
      <circle cx="-20" cy="10" r="30" {...K} fill={C.white} />
      <circle cx="-20" cy="10" r="22" {...K} fill={C.orange} />
      {[[30, -30], [50, -10], [40, 20], [-70, 30], [-60, -26]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.5" fill={C.ink} />)}
    </g>
  ),
  table: ({ fill = '#C98B5A' }) => (
    <g>
      <ellipse cx="0" cy="0" rx="70" ry="16" {...K} fill={fill} />
      <path d="M-8 14v34h16V14" {...K} fill={fill} />
      <path d="M-30 50h60" {...L} strokeWidth="3" />
    </g>
  ),
  trays: () => (
    <g>
      {[-34, 34].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 26}-6h52l-6 24h-40z`} {...K} fill={i ? C.white : C.sun} />
          <text x={x} y="10" textAnchor="middle" fontFamily={MONO} fontSize="8" fill={C.ink}>{i ? 'TO DO' : 'DONE'}</text>
          {lines(x - 18, -16, [36, 30], 4, 2)}
        </g>
      ))}
    </g>
  ),
  building: ({ fill = C.skyTint, h = 90 }) => (
    <g>
      <rect x="-16" y={-h} width="32" height={h} {...K} fill={fill} />
      {Array.from({ length: Math.floor(h / 16) }, (_, r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={-10 + c * 12} y={-h + 8 + r * 16} width="8" height="8" fill={C.white} stroke={C.ink} strokeWidth="1" vectorEffect="non-scaling-stroke" />))}
    </g>
  ),
  planet: ({ fill = C.sun }) => (
    <g>
      <circle r="34" {...K} fill={fill} />
      <ellipse rx="58" ry="14" {...L} strokeWidth="3" transform="rotate(-14)" />
    </g>
  ),
  person: ({ fill = C.white, shirt = C.blue }) => (
    <g>
      <path d="M-26 34c2-20 12-30 26-30s24 10 26 30z" {...K} fill={shirt} />
      <circle cy="-16" r="16" {...K} fill={fill} />
    </g>
  ),
  plugbot: ({ fill = C.white }) => (
    <g>
      <path d="M-8-38v-10M8-38v-10" {...L} strokeWidth="3" />
      <rect x="-20" y="-40" width="40" height="34" rx="8" {...K} fill={fill} />
      <circle cx="-7" cy="-23" r="3" fill={C.ink} />
      <circle cx="7" cy="-23" r="3" fill={C.ink} />
      <rect x="-14" y="-4" width="28" height="30" rx="6" {...K} fill={fill} />
      <path d="M-8 26v10M8 26v10" {...L} strokeWidth="2.5" />
      <path d="M14 6c10 0 14 8 14 14" {...L} />
    </g>
  ),
  water: ({ w = 300, fill = C.blue }) => <path d={`M${-w / 2} 0c20-8 30 8 50 0s30 8 50 0 30 8 50 0 30 8 50 0 30 8 50 0 30 8 50 0V30H${-w / 2}z`} {...K} fill={fill} />,
  mountain: ({ fill = C.aqua }) => (
    <g>
      <path d="M-70 40-10-40 20 0l14-18L70 40z" {...K} fill={fill} />
      <path d="M-22-24-10-40 4-22-6-18z" {...K} fill={C.white} />
    </g>
  ),
  boat: ({ fill = C.red }) => <path d="M-40-6h80l-12 22h-56z" {...K} fill={fill} />,
  pier: () => (
    <g>
      <rect x="-60" y="-6" width="120" height="10" {...K} fill="#C98B5A" />
      {[-50, -20, 10, 40].map((x) => <rect key={x} x={x} y="4" width="8" height="40" {...K} fill="#A86E43" />)}
    </g>
  ),
  biplane: ({ fill = C.red }) => (
    <g>
      <rect x="-40" y="-26" width="80" height="8" rx="3" {...K} fill={fill} />
      <rect x="-44" y="8" width="88" height="8" rx="3" {...K} fill={fill} />
      <path d="M-26-18v26M26-18v26" {...L} />
      <path d="M-52-6c0-10 70-12 86 0 4 4 4 8 0 12-16 10-86 8-86-2z" {...K} fill={C.white} />
      <path d="M38-14v28" {...L} strokeWidth="3" />
    </g>
  ),
  // big side-view biplane facing left: cream fuselage, coral wings, blue tail, spinning prop
  bigPlane: ({ fill = '#EFE9E2', wing = C.red, tail = C.blue }) => (
    <g>
      <path d="M100-60l40-50h26l-20 70zM120-20l60-6 10 18-64 6z" {...K} fill={tail} />
      <path d="M-40-46 60-58l20 10-96 14z" {...K} fill={wing} />
      <path d="M-130 0c0-30 40-50 120-46 90 4 160 0 200-20 4 30-40 60-130 74-90 14-190 22-190-8z" {...K} fill={fill} />
      <path d="M-70 10 60 0 40 60-90 74z" {...K} fill={wing} />
      <path d="M-50 70 40 60 30 84-60 92z" {...K} fill={wing} />
      <path d="M-20 70v-56M20 64v-58" {...L} />
      <ellipse cx="-134" cy="4" rx="12" ry="26" {...K} fill={fill} />
      <path d="M-146 4c-10-2-14 4-12 8" {...K} fill={wing} />
      <path d="M-150-50c-20 30-20 80 0 110M-158-30c-10 20-10 50 0 70M-140-60c-26 40-26 90 0 128" {...L} strokeWidth="1.5" />
      {[-80, -40, 0, 40, 80].map((x) => <circle key={x} cx={x} cy={-10} r="2" fill={C.ink} />)}
    </g>
  ),
  // diving board: plank on a grey strut
  board: () => (
    <g>
      <path d="M60 0 30 140h22L84 0z" {...K} fill="#BDBDBD" />
      <path d="M-90-12h190v18H-90z" {...K} fill="#A86E43" />
      <path d="M-90 6l10 10h180" {...L} />
    </g>
  ),
  // wooden rowing boat
  rowboat: () => (
    <g>
      <path d="M-90-10h180c-10 30-40 46-90 46s-80-16-90-46z" {...K} fill="#A86E43" />
      <path d="M-80 4c40 8 120 8 160 0M-70 18c40 6 100 6 140 0" {...L} />
      <ellipse cy="-10" rx="90" ry="10" {...K} fill="#C98B5A" />
    </g>
  ),
  vr: () => <rect x="-22" y="-8" width="44" height="16" rx="6" {...K} fill={C.ink} />,
  frame: ({ w = 80, h = 96, fill = C.skyTint, scene }) => (
    <g>
      <rect x={-w / 2 - 8} y={-h / 2 - 8} width={w + 16} height={h + 16} {...K} fill="#E5B74A" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} {...K} fill={fill} />
      {scene}
      <rect x="-16" y={h / 2 + 12} width="32" height="9" {...K} fill="#E5B74A" />
    </g>
  ),
  // ---- doodles
  diamond: ({ fill = C.blue }) => <path d="M0-12 9 0 0 12-9 0z" {...K} fill={fill} />,
  star: ({ fill = C.sun }) => <path d="M0-14 3.5-3.5 14 0 3.5 3.5 0 14-3.5 3.5-14 0-3.5-3.5z" {...K} fill={fill} />,
  burst: ({ fill = C.aqua, r = 30, n = 12, text }) => {
    const pts = []
    for (let i = 0; i < n * 2; i++) {
      const a = (Math.PI * i) / n
      const rr = i % 2 ? r * 0.78 : r
      pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`)
    }
    return (
      <g>
        <polygon points={pts.join(' ')} {...K} fill={fill} />
        {text && <text y="4" textAnchor="middle" fontFamily={MONO} fontSize={r / 3.2} fill={C.ink}>{text}</text>}
      </g>
    )
  },
  xcircle: ({ fill = C.sun }) => (
    <g>
      <circle r="10" {...K} fill={fill} />
      <path d="M-4-4 4 4M4-4-4 4" {...L} />
    </g>
  ),
  dot: ({ fill = C.orange, r = 6 }) => <circle r={r} {...K} fill={fill} />,
  tri: ({ fill = C.aqua }) => <path d="M0-12 12 10H-12z" {...K} fill={fill} />,
  blob: ({ fill = C.skyTint, stroke = false }) => <path d="M-60-30c20-30 80-26 96 0s14 60-16 70-80 10-90-20-10-30 10-50z" fill={fill} {...(stroke ? K : {})} />,
  oval: () => <ellipse rx="30" ry="16" {...L} />,
  swirl: () => <path d="M-30 10c0-20 30-20 30 0s-20 20-20 4 20-14 30 4" {...L} />,
  ticket: ({ fill = C.aqua }) => <path d="M-30-16h60v10a6 6 0 0 0 0 12v10h-60V6a6 6 0 0 0 0-12z" {...K} fill={fill} />,
  path: ({ d, dash, color = C.ink, width = 2 }) => <path d={d} {...L} stroke={color} strokeWidth={width} strokeDasharray={dash} />,
  text: ({ t, size = 14, fill = C.ink, font = DISPLAY, anchor = 'start', weight = 700 }) => (
    <text fontFamily={font} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>{t}</text>
  ),
  rect: ({ w, h, fill = C.white, r = 0, stroke = true }) => <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} fill={fill} {...(stroke ? K : {})} />,
  // tube limb along a cubic centre line in scene units (for long hugging arms etc.)
  limb: ({ d, w = 22, w2, fill = C.white, hand }) => {
    const n = d.match(/-?\d*\.?\d+/g).map(Number)
    const hx = n[0] + n[6]
    const hy = n[1] + n[7]
    return (
      <g>
        <path d={tube(d, w, w2 ?? w)} {...K} fill={fill} />
        {hand && <circle cx={hx} cy={hy} r={(w2 ?? w) * 0.62} {...K} fill={fill} />}
      </g>
    )
  },
  // tilted paper tag / sticker with a one-word label
  tag: ({ w = 200, h = 50, fill = C.white, text = '', size = 20, color = C.ink }) => (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} {...K} fill={fill} />
      <text y={size * 0.36} textAnchor="middle" fontFamily={FONTS.SANS} fontSize={size} letterSpacing={size * 0.12} fill={color}>{text}</text>
    </g>
  ),
  // small rotated rounded square doodle (the house style's "diamond")
  sq: ({ fill = C.white, r = 9 }) => <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={r * 0.3} transform="rotate(45)" {...K} fill={fill} />,
  // irregular pebble doodle
  pebble: ({ fill = C.white }) => <path d="M-8-6c4-5 12-4 14 1s0 11-6 12-12-1-12-6 1-5 4-7z" {...K} fill={fill} />,
  // three short motion / emphasis ticks
  ticks: () => <path d="M0-14 3-6M10-10 6-3M14 2 6 1" {...L} />,
  // white cup with a face, on a thin stool (about hero)
  faceMug: ({ fill = C.white }) => (
    <g>
      <path d="M44-40c26 0 30 46 0 52" {...L} stroke={C.ink} strokeWidth="10" />
      <path d="M-56-50v84c0 14 112 14 112 0v-84" {...K} fill={fill} />
      <ellipse cy="-50" rx="56" ry="14" {...K} fill={fill} />
      <path d="M-40-48c10 8 70 8 80 0" {...L} strokeWidth="1.5" opacity=".5" />
      <ellipse cx="-30" cy="-2" rx="4" ry="8" fill={C.ink} /><ellipse cx="-16" cy="-3" rx="4" ry="8" fill={C.ink} />
    </g>
  ),
  // stack of folder cards, front card with a wavy bottom edge
  folders: ({ fill = C.aqua, n = 5 }) => (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const o = (n - 1 - i) * 10
        const front = i === n - 1
        return (
          <path key={i} d={front ? `M${-80 + o} ${-60 + o}h150c4 0 6 2 6 6v104c-30-14-46 18-78 10s-46-24-78-8V${-54 + o}c0-4 2-6 6-6z` : `M${-80 + o} ${-60 + o}h150c4 0 6 2 6 6v80h-162V${-54 + o}c0-4 2-6 6-6z`}
            transform={`translate(${-o * 1.6} ${-o * 1.2})`} {...K} fill={fill} />
        )
      })}
    </g>
  ),
  // laptop seen from behind: tilted grey lid with stickers
  laptopBack: ({ fill = '#C9C9C9' }) => (
    <g>
      <path d="M-50-38h92c4 0 6 2 6 6l-6 70h-96l4-70c0-4 0-6 0-6z" {...K} fill={fill} />
      <path d="M-56 38h112l-4 8h-104z" {...K} fill="#A8A8A8" />
      <circle cx="-4" cy="2" r="6" {...K} fill="#8A8A8A" />
      <path d="M-4 8v10" {...L} />
      <path d="M22-24c-3-4-9-1-6 4l6 5 6-5c3-5-3-8-6-4z" {...K} fill={C.orange} />
      <path d="M32-14c-3-4-9-1-6 4l6 5 6-5c3-5-3-8-6-4z" {...K} fill={C.orange} />
    </g>
  ),
  // rounded tile (spot icons), usually with sh: 'l'
  tile: ({ w = 56, h = 56, fill = C.cream, r = 8 }) => <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} {...K} fill={fill} />,
  // quartered disc (yellow ball with a cross)
  pie: ({ fill = C.sun, r = 32 }) => (
    <g transform="rotate(-20)">
      <circle r={r} {...K} fill={fill} />
      <path d={`M${-r} 0h${r * 2}M0 ${-r}v${r * 2}`} {...L} />
    </g>
  ),
  // outline star (optionally with a face), used for 'goal' scenes
  bigStar: ({ fill = C.sun, face, outline }) => (
    <g>
      <path d="M0-50 14-18 50-16 22 8 32 44 0 24-32 44-22 8-50-16-14-18z" {...K} fill={outline ? 'none' : fill} />
      {face && <g><ellipse cx="-8" cy="0" rx="3" ry="5" fill={C.ink} /><ellipse cx="6" cy="0" rx="3" ry="5" fill={C.ink} /></g>}
    </g>
  ),
  // game controller
  pad: ({ fill = C.white }) => (
    <g>
      <rect x="-36" y="-16" width="72" height="32" rx="8" {...K} fill={fill} />
      <path d="M14-2h14M21-9v14" {...L} strokeWidth="5" />
      <circle cx="-22" cy="-3" r="4" {...K} fill={C.red} /><circle cx="-10" cy="4" r="4" {...K} fill={C.aqua} />
    </g>
  ),
  // shelf tray with a short label
  tray: ({ fill = C.teal, text = '' }) => (
    <g>
      <path d="M-36-20h72v40h-72z" {...K} fill={fill} />
      <rect x="-26" y="-4" width="52" height="16" fill={C.ink} />
      <text y="9" textAnchor="middle" fontFamily={FONTS.MONO} fontSize="10" fill={C.white}>{text}</text>
    </g>
  ),
  // terminal window: thin cream title strip with coloured dots, dark body, prompt line
  term: ({ w = 400, h = 300, cmd = '$ connect' }) => (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="8" {...K} fill={C.ink} />
      <rect x={-w / 2 + 6} y={-h / 2 + 4} width={w - 12} height="16" rx="5" fill={C.cream} />
      {[C.red, C.sun, C.teal].map((c, i) => <circle key={i} cx={-w / 2 + 18 + i * 12} cy={-h / 2 + 12} r="3" fill={c} />)}
      <text x={-w / 2 + 34} y={-h / 2 + 76} fontFamily={FONTS.MONO} fontSize="20" fill={C.white}>{cmd}</text>
    </g>
  ),
  // speech bubble with tail at the bottom (tx = tail x offset from centre)
  bubble: ({ w = 180, h = 56, tx = 30, text = '', size = 13 }) => (
    <g>
      <path d={`M${-w / 2 + 10} ${-h / 2}h${w - 20}a10 10 0 0 1 10 10v${h - 20}a10 10 0 0 1-10 10H${tx + 10}l-12 14 1-14H${-w / 2 + 10}a10 10 0 0 1-10-10v${-(h - 20)}a10 10 0 0 1 10-10z`} {...K} fill={C.white} />
      <text y={size * 0.36} textAnchor="middle" fontFamily={FONTS.SANS} fontSize={size} letterSpacing=".5" fill={C.ink}>{text}</text>
    </g>
  ),
  // stethoscope draped as a curve with a chest piece
  scope: () => (
    <g>
      <path d="M-20-20c-6 30 10 40 24 40s20-10 16-24" {...L} strokeWidth="2.5" />
      <circle cx="20" cy="-6" r="7" {...K} fill={C.line} />
    </g>
  ),
  // stacked drum character with stick legs (pricing tiers)
  drumBuddy: ({ n = 2, fill = C.white, top, legs = true }) => (
    <g>
      {legs && <path d={`M-8 ${n * 18 + 4}v16h-8M8 ${n * 18 + 4}v16h-8`} {...L} />}
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(0 ${(n - 1 - i) * 22})`}>
          <path d="M-24-12v24c0 7 48 7 48 0v-24" {...K} fill={fill} />
          <ellipse cy="-12" rx="24" ry="7" {...K} fill={i === n - 1 && top ? top : fill} />
          <ellipse cx="-6" cy="2" rx="2" ry="3.5" fill={C.ink} /><ellipse cx="4" cy="2" rx="2" ry="3.5" fill={C.ink} />
        </g>
      ))}
    </g>
  ),
  // white swoosh down the left edge of CTA scenes
  swoosh: () => <path d="M0 0h70c-60 100 40 200-20 360H0z" fill={C.white} />,
  // yellow sky blob behind landscape scenes
  blobSky: () => <path d="M0 140C30 40 200 0 480 10V0H0z" fill={C.sun} />,
  // book lying flat: coloured cover with a cream page block on the open side
  hbook: ({ w = 160, h = 26, fill = C.red }) => (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" {...K} fill={fill} />
      <rect x={-w / 2 + 10} y={-h / 2 + 4} width={w - 14} height={h - 8} {...K} fill={C.cream} />
      <path d={`M${-w / 2 + 14} ${-h / 2 + 10}h${w - 24}M${-w / 2 + 14} ${h / 2 - 9}h${w - 24}`} {...L} strokeWidth="1" opacity=".5" />
    </g>
  ),
  // snail
  snail: ({ fill = C.red }) => (
    <g>
      <path d="M-30 14h56c6 0 8-4 4-6L18 4" {...K} fill={C.cream} />
      <circle cx="-6" cy="-2" r="18" {...K} fill={fill} />
      <path d="M-6-2m-10 0a10 10 0 1 1 10 10a6 6 0 1 1-6-6" {...L} />
      <path d="M20 4 26-14M26 4l8-14" {...L} />
    </g>
  ),
  // ---- characters
  pip: (props) => <PipX {...props} />,
  pipJr: ({ body = C.sun, pose = 'idle', facing = 'right', legs, look }) => <PipX body={body} pose={pose} facing={facing} legs={legs} look={look} jr />,
}

// Pip with optional accessories, centred on (0,0) in a 200x200 frame.
function PipX({ body = C.white, pose = 'idle', facing = 'right', hat, glasses, goggles, headset, jr, legs, view, look, mouth, shadow, armR, armL, armFront }) {
  return (
    <g transform="translate(-100 -100)">
      <PipFigure body={body} pose={pose} facing={facing} blush={!jr} legs={legs} view={view} look={look} mouth={mouth} shadow={shadow} armR={armR} armL={armL} armFront={armFront} />
      {glasses && (
        <g {...K} strokeWidth="2.5" fill="none">
          <circle cx={facing === 'left' ? 75 : 85} cy="96" r="13" fill={glasses === true ? 'none' : glasses} fillOpacity=".25" />
          <circle cx={facing === 'left' ? 115 : 125} cy="96" r="13" fill={glasses === true ? 'none' : glasses} fillOpacity=".25" />
          <path d={`M${facing === 'left' ? 88 : 98} 96h${14}`} />
        </g>
      )}
      {goggles && (
        <g {...K}>
          <rect x="58" y="84" width="84" height="24" rx="12" fill={C.ink} />
          <circle cx="82" cy="96" r="9" fill={C.skyTint} />
          <circle cx="118" cy="96" r="9" fill={C.skyTint} />
        </g>
      )}
      {hat === 'hardhat' && <path d="M52 50c0-30 96-30 96 0h10v10H42V50z" {...K} fill={C.sun} />}
      {hat === 'sweatband' && <g><rect x="40" y="56" width="120" height="14" {...K} fill={C.skyTint} /><path d="M60 56v14M80 56v14M100 56v14M120 56v14M140 56v14" {...L} stroke={C.blue} strokeWidth="3" /></g>}
      {hat === 'cap' && <path d="M50 50c0-26 100-26 100 0zM150 50h22v8h-22z" {...K} fill={C.blue} />}
      {hat === 'sunglasses' && <path d="M60 88h80v4c0 14-30 14-34 2h-12c-4 12-34 12-34-2z" {...K} fill={C.ink} />}
      {headset && (
        <g {...K} fill="none" strokeWidth="3">
          <path d="M44 90c0-50 112-50 112 0" />
          <rect x="34" y="82" width="14" height="26" rx="6" fill={C.red} />
          <rect x="152" y="82" width="14" height="26" rx="6" fill={C.red} />
          <path d="M160 108c0 20-20 26-36 24" />
        </g>
      )}
      {hat === 'labcoat' && <path d="M40 130h120v28c0 6-4 4-8 4H48c-4 0-8 2-8-4z" {...K} fill={C.white} />}
    </g>
  )
}

// p.sh: hard ink drop shadow ('l' = down-left, 'r' = down-right, 'd' = straight down), offset in scene units.
export function Item({ k, x = 0, y = 0, s = 1, p = {}, r = 0 }) {
  const Prim = P[k]
  if (!Prim) return null
  const g = <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>{Prim(p)}</g>
  return p.sh ? <g filter={`url(#ish-${p.sh})`}>{g}</g> : g
}
const SH = { l: [-6, 6], r: [6, 6], d: [0, 6], sl: [-3, 3], sr: [3, 3] }
export const ShadowDefs = () => (
  <defs>
    {Object.entries(SH).map(([k, [dx, dy]]) => (
      <filter key={k} id={`ish-${k}`} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feOffset in="SourceAlpha" dx={dx} dy={dy} result="o" />
        <feFlood floodColor={C.ink} />
        <feComposite in2="o" operator="in" result="s" />
        <feMerge>
          <feMergeNode in="s" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    ))}
  </defs>
)

// items: [kind, x, y, scale?, props?, rotate?]
export function Scene({ w = 400, h = 300, bg, items = [], slice = true, children }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} {...svgProps(slice)}>
      <ShadowDefs />
      {bg && <rect width={w} height={h} fill={bg} />}
      {items.map(([k, x, y, s, p, r], i) => <Item key={i} k={k} x={x} y={y} s={s} p={p} r={r} />)}
      {children}
    </svg>
  )
}
