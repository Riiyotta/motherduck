// Thumbnails, covers, collages, brand marks and product feature images (IMAGE_BRIEFS.md).
// Photo-based templates embed stock photos from public/assets/photos via <image>.
import { useId } from 'react'
import { C, svgProps, pick } from './palette.js'
import { Item, K, FONTS } from './kit.jsx'
import { Dashboard, SqlNotebook } from './ui.jsx'
import { wrap } from './text.js'

const { MONO, SANS, DISPLAY } = FONTS
const L = { ...K, fill: 'none' }
const Tx = ({ x, y, t, s = 10, f = C.ink, w = 400, a = 'start', font = SANS, o, ls }) => (
  <text x={x} y={y} fontFamily={font} fontSize={s} fontWeight={w} fill={f} textAnchor={a} opacity={o} letterSpacing={ls}>{t}</text>
)
const Svg = ({ w, h, children, bg, slice = true, box }) => (
  <svg viewBox={`0 0 ${w} ${h}`} {...svgProps(slice)} {...box}>
    {bg && <rect width={w} height={h} fill={bg} />}
    {children}
  </svg>
)
const Lines = ({ x, y, text, max, size, fill = C.ink, lines = 3, font = DISPLAY, w = 700, lh = 1.05 }) => (
  <text x={x} y={y} fontFamily={font} fontSize={size} fontWeight={w} fill={fill}>
    {wrap(text, max, lines).map((l, i) => <tspan key={i} x={x} dy={i ? size * lh : 0}>{l}</tspan>)}
  </text>
)
function Photo({ href, x, y, w, h, r = 0, stroke = true, pos = 'xMidYMid' }) {
  const id = `ph${useId().replace(/:/g, '')}`
  return (
    <g>
      <defs><clipPath id={id}><rect x={x} y={y} width={w} height={h} rx={r} /></clipPath></defs>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={C.soft} />
      {href && <image href={href} x={x} y={y} width={w} height={h} preserveAspectRatio={`${pos} slice`} clipPath={`url(#${id})`} />}
      {stroke && <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={C.ink} strokeWidth="2" />}
    </g>
  )
}
const Duration = ({ x, y, t = '12:48' }) => (
  <g>
    <rect x={x - 40} y={y - 16} width="40" height="18" rx="3" fill="#000000CC" />
    <Tx x={x - 20} y={y - 3} t={t} s={10} f={C.white} a="middle" w={600} />
  </g>
)
const Ticker = ({ w, h, word, fill = C.sun }) => (
  <g>
    <rect x="0" y={h - 20} width={w} height="20" fill={fill} stroke={C.ink} strokeWidth="2" />
    <Tx x={6} y={h - 6} t={`${word} • `.repeat(20)} s={10} font={MONO} />
  </g>
)
const HEADLINES = ['QUERY FASTER', 'SHIP THE DASHBOARD', 'SMALL DATA, BIG WINS', 'PIPES THAT FLOW', 'AGENTS THAT ASK', 'ONE FILE, MANY USERS', 'COST PER TENANT', 'JOINS WITHOUT TEARS', 'LAKES, SIMPLY', 'FROM CSV TO CHART', 'NOTEBOOKS ANYWHERE', 'READ THE PLAN']

// ---------------------------------------------------------------- editorial blog graphic (389x219)
const ACTS = ['fish', 'present', 'pipes', 'desk', 'surf', 'house', 'rocket', 'read']
export function EditorialPost({ seed = 0, act, tone }) {
  const a = act || ACTS[seed % ACTS.length]
  const bg = tone || pick([C.blue, C.teal, C.red, C.sun, '#C9A7F5'], seed)
  const head = HEADLINES[seed % HEADLINES.length]
  return (
    <Svg w={389} h={219} bg={bg}>
      <rect x="16" y="18" width={Math.min(200, 14 + head.length * 7.6)} height="60" fill={C.sun} stroke={C.ink} strokeWidth="2" />
      <Lines x={24} y={42} text={head} max={13} size={18} lines={2} />
      {a === 'fish' && <g><Item k="water" x={290} y={170} s={0.6} p={{ w: 300 }} /><Item k="boat" x={280} y={160} s={1} /><Item k="pip" x={280} y={116} s={0.36} p={{ pose: 'point' }} /><path d="M314 104 360 70v100" {...L} /><Item k="drum" x={360} y={176} s={0.25} /></g>}
      {a === 'present' && <g><Item k="chartCard" x={300} y={100} s={1.3} p={{ kind: 'line' }} /><Item k="pip" x={220} y={140} s={0.4} p={{ pose: 'point' }} /></g>}
      {a === 'pipes' && <g><path d="M200 160h60v-60h60v40h50" {...L} strokeWidth="8" stroke={C.ink} /><path d="M200 160h60v-60h60v40h50" fill="none" stroke={C.white} strokeWidth="4" /><Item k="pip" x={290} y={78} s={0.32} p={{ pose: 'cheer', legs: 'sit' }} /></g>}
      {a === 'desk' && <g><rect x="210" y="160" width="160" height="10" fill="#C98B5A" stroke={C.ink} strokeWidth="2" /><Item k="laptop" x={310} y={140} s={0.7} p={{ content: 'bars' }} /><Item k="pip" x={240} y={124} s={0.36} p={{ pose: 'type', legs: 'sit' }} /></g>}
      {a === 'surf' && <g><Item k="water" x={290} y={170} s={0.6} p={{ w: 300 }} /><path d="M230 160h120l-10 8H240z" fill={C.sun} stroke={C.ink} strokeWidth="2" /><Item k="pip" x={290} y={122} s={0.36} p={{ pose: 'cheer' }} r={-10} /></g>}
      {a === 'house' && <g><path d="M300 90l40 30v50h-80v-50z" fill={C.red} stroke={C.ink} strokeWidth="2" /><rect x="288" y="140" width="24" height="30" rx="12" fill={C.ink} /><Item k="pip" x={230} y={136} s={0.36} p={{ pose: 'wave', facing: 'right' }} /></g>}
      {a === 'rocket' && <g><Item k="rocket" x={300} y={100} s={1.2} /><Item k="pip" x={290} y={72} s={0.24} p={{ legs: 'sit', goggles: true }} /></g>}
      {a === 'read' && <g><Item k="pip" x={290} y={110} s={0.42} p={{ pose: 'read', look: 'down' }} /><Item k="book" x={290} y={140} s={0.8} p={{ open: true, fill: C.blue }} /></g>}
      <Item k="star" x={180} y={110} s={0.8} p={{ fill: C.white }} />
      <Ticker w={389} h={219} word={head.split(' ')[0]} />
    </Svg>
  )
}

// Monthly newsletter graphic: dark band with title, yellow panel listing items (also 617x350 featured).
export function NewsletterPost({ seed = 0, w = 389, h = 219 }) {
  const band = h * 0.3
  return (
    <Svg w={w} h={h} bg={C.sun}>
      <rect width={w} height={band} fill={C.ink} />
      <Tx x={w * 0.05} y={band * 0.62} t={`THIS MONTH IN DATA · ${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][seed % 12]}`} s={w / 22} w={700} f={C.white} font={DISPLAY} />
      {[0, 1, 2].map((i) => {
        const y = band + (h - band) * (0.16 + i * 0.28)
        const s = h / 219
        return (
          <g key={i}>
            <rect x={w * 0.05} y={y} width={18 * s} height={18 * s} fill={[C.blue, C.red, C.aqua][i]} stroke={C.ink} strokeWidth="2" />
            <rect x={w * 0.05 + 28 * s} y={y + 2 * s} width={w * [0.5, 0.42, 0.55][i]} height={7 * s} fill={C.ink} />
            <rect x={w * 0.05 + 28 * s} y={y + 13 * s} width={w * [0.34, 0.4, 0.28][i]} height={4 * s} fill={C.ink} opacity=".45" />
          </g>
        )
      })}
      <path d={`M${w * 0.8} ${h * 0.55}c${w * 0.08} -${h * 0.1} ${w * 0.16} ${h * 0.05} ${w * 0.08} ${h * 0.14}s-${w * 0.12} ${h * 0.02} -${w * 0.04} ${h * 0.14}`} {...L} />
    </Svg>
  )
}
export const NewsletterFeatured = ({ seed = 0 }) => <NewsletterPost seed={seed} w={617} h={350} />

// Event / speaker graphic: grid of small speaker headshots, or pixel headline on pink.
export function EventPost({ seed = 0, photos = [] }) {
  if (seed % 2)
    return (
      <Svg w={389} h={219} bg={C.pink}>
        {'MEETUP'.split('').map((ch, i) => <Tx key={i} x={40 + i * 52} y={130} t={ch} s={60} w={700} font={MONO} />)}
        {Array.from({ length: 30 }, (_, i) => <rect key={i} x={20 + (i * 47) % 350} y={20 + ((i * 31) % 40)} width="8" height="8" fill={C.ink} />)}
        <Tx x={40} y={180} t="SPEAKERS · SNACKS · SQL" s={12} font={MONO} />
      </Svg>
    )
  return (
    <Svg w={389} h={219} bg={C.ink}>
      <Tx x={20} y={36} t="LIVE PANEL" s={20} w={700} f={C.sun} font={DISPLAY} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Photo href={photos[i % Math.max(1, photos.length)]} x={20 + i * 90} y={60} w={78} h={98} r={4} />
          <rect x={20 + i * 90} y={166} width="60" height="6" fill={C.white} />
          <rect x={20 + i * 90} y={178} width="44" height="4" fill={C.white} opacity=".5" />
        </g>
      ))}
    </Svg>
  )
}
// Photo-based graphic (dark sea with a small boat) with a headline.
export function PhotoPost({ seed = 0, photo, headline = 'SET SAIL' }) {
  return (
    <Svg w={389} h={219}>
      <Photo href={photo} x={0} y={0} w={389} h={219} stroke={false} />
      <rect x="16" y="150" width={headline.length * 13 + 20} height="44" fill={C.sun} stroke={C.ink} strokeWidth="2" />
      <Tx x={26} y={180} t={headline} s={22} w={700} font={DISPLAY} />
    </Svg>
  )
}

// ---------------------------------------------------------------- quack (external press / blogs)
export function QuackPost({ seed = 0, kind, photo, photos = [] }) {
  const k = kind || ['printer', 'site', 'podcast', 'house'][seed % 4]
  if (k === 'photo') return <Svg w={389} h={219}><Photo href={photo} x={0} y={0} w={389} h={219} stroke={false} /></Svg>
  if (k === 'printer')
    return (
      <Svg w={389} h={219} bg="#F2D9B3">
        <rect x="110" y="70" width="170" height="90" rx="6" fill="#D8CBB0" stroke={C.ink} strokeWidth="2" />
        <rect x="130" y="86" width="90" height="56" fill="#2B3A2B" stroke={C.ink} strokeWidth="2" />
        {[0, 1, 2].map((i) => <rect key={i} x="138" y={96 + i * 12} width={[60, 44, 70][i]} height="4" fill="#7CFC9A" />)}
        <path d="M150 160c0 30-30 40-60 50h200c-30-10-50-20-50-50z" fill={C.white} stroke={C.ink} strokeWidth="2" />
        {[0, 1, 2].map((i) => <path key={i} d={`M${120 + i * 50} 196h40`} stroke={C.ink} strokeDasharray="3 3" />)}
        <circle cx="250" cy="100" r="8" fill={C.red} stroke={C.ink} strokeWidth="2" />
      </Svg>
    )
  if (k === 'site')
    return (
      <Svg w={389} h={219} bg={C.white}>
        <rect width="389" height="30" fill="#F1F3F5" />
        {[0, 1, 2].map((i) => <circle key={i} cx={14 + i * 12} cy="15" r="4" fill={[C.red, C.sun, '#3CCB7F'][i]} />)}
        <rect x="60" y="8" width="220" height="14" rx="7" fill={C.white} />
        <Tx x={24} y={70} t={['Why small data is back', 'Benchmarking local engines', 'A tour of in-process OLAP'][seed % 3]} s={20} w={700} font={'Georgia, serif'} />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="24" y={90 + i * 14} width={[320, 300, 330, 280, 200][i]} height="6" rx="3" fill={C.line} />)}
        <rect x="24" y="168" width="140" height="40" fill={C.skyTint} />
      </Svg>
    )
  if (k === 'podcast')
    return (
      <Svg w={389} h={219} bg="#1B1B2F">
        <Photo href={photos[0]} x={16} y={30} w={170} h={150} r={8} stroke={false} />
        <Photo href={photos[1]} x={203} y={30} w={170} h={150} r={8} stroke={false} />
        <rect x="16" y="190" width="120" height="16" rx="8" fill={C.red} />
        <Tx x={76} y={202} t="● REC  EP. 42" s={10} f={C.white} a="middle" w={700} />
      </Svg>
    )
  return (
    <Svg w={389} h={219} bg="#20124D">
      {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={(i * 71) % 389} cy={(i * 37) % 120} r="1.5" fill={C.white} />)}
      <path d="M100 190V110l95-50 95 50v80z" fill="#3B2A7A" stroke="#B9A6FF" strokeWidth="2" />
      <rect x="130" y="120" width="130" height="50" rx="25" fill="#7CF5FF" opacity=".5" stroke="#B9A6FF" />
      <Item k="pip" x={195} y={152} s={0.26} p={{ pose: 'wave' }} />
      <path d="M0 190h389v29H0z" fill="#3B2A7A" />
    </Svg>
  )
}

// ---------------------------------------------------------------- video thumbnails
export function CreatorThumb({ seed = 0, photo, headline, w = 389, h = 219 }) {
  const bg = pick([C.ink, C.blue, C.sun, '#000000'], seed)
  const fg = bg === C.sun ? C.ink : C.white
  const hl = bg === C.sun ? C.white : C.sun
  const head = headline || HEADLINES[(seed * 5) % HEADLINES.length]
  const words = head.split(' ')
  const left = seed % 2 === 0
  const px = left ? 0 : w * 0.56
  const tx = left ? w * 0.47 : w * 0.05
  return (
    <Svg w={w} h={h} bg={bg}>
      <Photo href={photo} x={px} y={h * 0.12} w={w * 0.44} h={h * 0.88} stroke={false} pos="xMidYMin" />
      <text x={tx} y={h * 0.32} fontFamily={DISPLAY} fontWeight="800" fontSize={h * 0.13} fill={fg}>
        <tspan x={tx}>{words.slice(0, Math.ceil(words.length / 2)).join(' ')}</tspan>
        <tspan x={tx} dy={h * 0.14} fill={hl}>{words.slice(Math.ceil(words.length / 2)).join(' ')}</tspan>
      </text>
      <g transform={`translate(${tx} ${h * 0.56})`}>
        <rect width={w * 0.38} height={h * 0.3} rx="4" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <rect x="6" y="6" width={w * 0.38 - 12} height="6" fill={C.line} />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={10 + i * (w * 0.065)} y={h * 0.27 - (10 + ((i * 13 + seed * 7) % 26))} width={w * 0.045} height={10 + ((i * 13 + seed * 7) % 26)} fill={i % 2 ? C.blue : C.orange} />)}
      </g>
      <Duration x={w - 8} y={h - 8} t={`${8 + (seed % 40)}:${String((seed * 17) % 60).padStart(2, '0')}`} />
    </Svg>
  )
}
export function WebinarThumb({ seed = 0, photos = [], w = 389, h = 219 }) {
  const n = seed % 2 ? 4 : 2
  const cols = n === 4 ? 2 : 2
  const rows = n === 4 ? 2 : 1
  const cw = (w - 12) / cols
  const ch = (h - 12) / rows
  return (
    <Svg w={w} h={h} bg="#111827">
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <Photo href={photos[i % Math.max(1, photos.length)]} x={4 + (i % cols) * (cw + 4)} y={4 + Math.floor(i / cols) * (ch + 4)} w={cw} h={ch} r={4} stroke={false} />
          <rect x={10 + (i % cols) * (cw + 4)} y={Math.floor(i / cols) * (ch + 4) + ch - 16} width="54" height="14" rx="3" fill="#000000AA" />
        </g>
      ))}
      <Duration x={w - 8} y={h - 8} t={`${40 + (seed % 20)}:12`} />
    </Svg>
  )
}
export function FeaturedVideo({ seed = 0, photo }) {
  return (
    <Svg w={679} h={383} bg="#000000">
      <Photo href={photo} x={340} y={20} w={339} h={363} stroke={false} pos="xMidYMin" />
      {/* printed diagram held up in front of the presenter */}
      <g transform="translate(400 250) rotate(-4)">
        <rect width="180" height="110" fill={C.white} stroke={C.ink} strokeWidth="2" />
        {[[16, 20], [100, 20], [58, 70]].map(([x, y], i) => <rect key={i} x={x} y={y} width="62" height="26" fill="none" stroke={C.ink} strokeWidth="2" />)}
        <path d="M78 33h22M130 46 100 70M47 46l20 24" stroke={C.ink} strokeWidth="2" />
      </g>
      <rect x="28" y="28" width="96" height="26" rx="13" fill="#2F6FDE" />
      <Tx x={76} y={46} t="NEW SERIES" s={11} w={700} f={C.white} a="middle" />
      <Lines x={28} y={120} text="DATA STACK IN ONE DRAWING" max={11} size={44} fill="#FFE600" lines={3} />
      <Duration x={665} y={370} t="24:06" />
    </Svg>
  )
}

// ---------------------------------------------------------------- careers collage (610x531)
export function CareersCollage({ photos = [] }) {
  return (
    <Svg w={610} h={531}>
      <Item k="cloud" x={90} y={70} s={1.2} /><Item k="cloud" x={540} y={460} s={1} />
      <ellipse cx="520" cy="90" rx="60" ry="34" fill={C.sun} stroke={C.ink} strokeWidth="2" />
      <Item k="tri" x={60} y={430} s={3} p={{ fill: C.aqua }} />
      <Item k="ticket" x={300} y={500} s={1.6} p={{ fill: C.blue }} r={-8} />
      <g transform="rotate(-4 200 180)"><Photo href={photos[0]} x={40} y={60} w={340} h={230} /></g>
      <g transform="rotate(5 470 250)"><Photo href={photos[1]} x={370} y={140} w={200} h={250} /></g>
      <g transform="rotate(-2 250 380)"><Photo href={photos[2]} x={120} y={300} w={290} h={190} /></g>
    </Svg>
  )
}

// ---------------------------------------------------------------- covers
export function Cover({ variant = 'eval', seed = 0, box }) {
  if (variant === 'eval' || variant === 'survey' || variant === 'bi') {
    const bg = { eval: C.skyTint, survey: C.sun, bi: C.aqua }[variant]
    const title = { eval: ['EVALUATING', 'AI ANALYTICS'], survey: ['STATE OF', 'DATA + AI'], bi: ['BI IN THE', 'AGENT ERA'] }[variant]
    return (
      <Svg w={384} h={497} bg={bg}>
        {variant === 'eval' && <><Item k="cloud" x={300} y={80} s={1.1} /><Item k="cloud" x={80} y={420} s={1.3} /></>}
        <Tx x={30} y={50} t="FIELD GUIDE" s={12} font={MONO} />
        <Tx x={30} y={110} t={title[0]} s={38} w={700} font={DISPLAY} />
        <rect x="26" y="124" width={title[1].length * 23} height="46" fill={variant === 'eval' ? C.sun : C.white} />
        <Tx x={30} y={160} t={title[1]} s={38} w={700} font={DISPLAY} />
        <rect x="40" y="220" width="300" height="190" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
        {variant === 'bi'
          ? [0.4, 0.7, 0.55, 0.9, 0.6].map((v, i) => <rect key={i} x={70 + i * 52} y={390 - v * 140} width="34" height={v * 140} fill={i % 2 ? C.blue : C.orange} stroke={C.ink} strokeWidth="1.5" />)
          : <path d="M60 380 110 340l50 20 50-70 50 30 60-90" fill="none" stroke="#2F6FDE" strokeWidth="4" strokeLinejoin="round" />}
        <rect x="250" y="236" width="76" height="30" rx="15" fill={C.sun} stroke={C.ink} strokeWidth="2" />
        <Tx x={288} y={256} t="+38%" s={14} w={700} a="middle" font={MONO} />
        <Tx x={30} y={460} t="A practical report" s={14} />
      </Svg>
    )
  }
  if (variant === 'lakebook')
    // Technical-publisher style: white cover with a lakeside engraving (reeds and water; no bird).
    return (
      <Svg w={320} h={500} bg={C.white} box={box}>
        <rect width="320" height="50" fill="#7A1F1F" />
        <path d="M270 0h50v50z" fill="#C0392B" />
        <g stroke="#5B4636" strokeWidth="1.2" fill="none">
          {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${40 + i * 15} 360c${-4 + (i % 3) * 4}-60 ${8 - (i % 4) * 4}-110 ${i % 2 ? 10 : -6}-${140 + (i % 5) * 12}`} />)}
          {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx={46 + i * 32} cy={220 + (i % 3) * 18} rx="5" ry="16" fill="#8B5E3C" />)}
          {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M20 ${370 + i * 8}c40-4 80 4 140 0s100-4 140 0`} stroke="#3E6B4F" />)}
        </g>
        <Tx x={30} y={440} t="Lakehouse Table Formats" s={20} w={700} f="#2B2B2B" font={'Georgia, serif'} />
        <Tx x={30} y={466} t="A Practical Guide" s={13} f="#555" font={'Georgia, serif'} />
      </Svg>
    )
  if (variant === 'bookbrief')
    // Dark technical book with a white title block and a flat period-costume figure.
    return (
      <Svg w={186} h={262} bg="#1F1F1F">
        <rect x="14" y="16" width="158" height="54" fill={C.white} />
        <Tx x={22} y={40} t="Analytics" s={15} w={700} font={'Georgia, serif'} />
        <Tx x={22} y={60} t="in Process" s={15} w={700} font={'Georgia, serif'} />
        <g stroke="#E9E2D0" strokeWidth="1.2">
          <circle cx="93" cy="106" r="12" fill="#E8C9B0" />
          <path d="M80 100c4-16 22-16 26 0" fill="#6B4E3D" />
          <path d="M84 120h18l6 30-6 4h-18l-6-4z" fill="#C98A9B" />
          <path d="M78 154h30l22 80H56z" fill="#6E8B6A" />
          <path d="M70 200h46M64 220h58" stroke="#C98A9B" />
        </g>
        <Tx x={22} y={252} t="2ND EDITION" s={8} f="#E9E2D0" font={MONO} />
      </Svg>
    )
  return null
}
// Book cover on a pile of outline clouds with a teal starburst badge (ducklake signup block).
export function CoverOnClouds() {
  return (
    <Svg w={410} h={468}>
      <Cover variant="lakebook" box={{ x: 95, y: 30, width: 218, height: 340 }} />
      <rect x="95" y="30" width="218" height="340" fill="none" stroke={C.ink} strokeWidth="2" />
      <Item k="cloud" x={110} y={400} s={1.6} /><Item k="cloud" x={300} y={410} s={1.8} /><Item k="cloud" x={205} y={430} s={1.4} />
      <Item k="burst" x={330} y={60} s={1.4} p={{ fill: C.aqua, r: 36, text: 'FREE' }} />
    </Svg>
  )
}

// ---------------------------------------------------------------- own brand mark / wordmark
export function BrandMark({ outline = false, tile = false }) {
  const f = outline ? 'none' : C.orange
  return (
    <svg viewBox="0 0 100 80" {...svgProps(false)}>
      {tile && <rect x="12" y="2" width="76" height="76" rx="16" fill={C.white} />}
      <g stroke={C.ink} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        <path d="M50 18 76 30 50 42 24 30z" fill={f} vectorEffect="non-scaling-stroke" />
        <path d="M24 40 50 52 76 40M24 50 50 62 76 50" fill="none" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}
export function OwnWordmark() {
  return (
    <svg viewBox="0 0 240 44" {...svgProps(false)}>
      <g transform="translate(0 2) scale(0.5)">
        <path d="M50 18 76 30 50 42 24 30z" fill={C.orange} stroke={C.ink} strokeWidth="3" />
        <path d="M24 40 50 52 76 40M24 50 50 62 76 50" fill="none" stroke={C.ink} strokeWidth="3" />
      </g>
      <Tx x={46} y={31} t="Northwind Data" s={24} w={700} font={DISPLAY} ls="-0.5" />
    </svg>
  )
}

// ---------------------------------------------------------------- persona hero promo frames (596x335)
export function PromoFrame({ variant = 'product' }) {
  if (variant === 'appdev')
    return (
      <Svg w={596} h={335} bg="#7FA8D9">
        <Item k="server" x={200} y={110} s={1.4} />
        <Item k="drum" x={400} y={110} s={1.2} />
        <path d="M250 110h100M258 102l-8 8 8 8M342 102l8 8-8 8" {...L} strokeWidth="3" />
        <Item k="laptop" x={300} y={250} s={1.6} p={{ content: 'line' }} />
      </Svg>
    )
  return (
    <Svg w={596} h={335} bg={variant === 'product' ? C.cream : C.white}>
      <g transform="translate(30 26) scale(0.7)"><BrandMarkInline /></g>
      <Tx x={84} y={52} t="Northwind Data" s={16} w={700} font={DISPLAY} />
      <Lines x={30} y={120} text={variant === 'product' ? 'ONE WAREHOUSE FOR EVERY TEAM' : 'ANSWERS FOR THE WHOLE DATA TEAM'} max={13} size={32} lines={3} />
      <rect x="30" y="250" width="120" height="36" fill={C.orange} stroke={C.ink} strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={320 + (i % 2) * 130} y={40 + Math.floor(i / 2) * 90} width="116" height="76" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <Item k={['badge', 'drum', 'gear', 'cloud', 'server', 'win'][i]} x={350 + (i % 2) * 130} y={78 + Math.floor(i / 2) * 90} s={0.4} p={i === 0 ? { text: 'SQL' } : i === 2 ? { fill: C.sky } : {}} />
          <rect x={378 + (i % 2) * 130} y={66 + Math.floor(i / 2) * 90} width="44" height="6" fill={C.ink} opacity=".7" />
          <rect x={378 + (i % 2) * 130} y={80 + Math.floor(i / 2) * 90} width="30" height="4" fill={C.ink} opacity=".4" />
        </g>
      ))}
    </Svg>
  )
}
function BrandMarkInline() {
  return (
    <g stroke={C.ink} strokeWidth="3" strokeLinejoin="round">
      <path d="M50 18 76 30 50 42 24 30z" fill={C.orange} />
      <path d="M24 40 50 52 76 40M24 50 50 62 76 50" fill="none" />
    </g>
  )
}
// Dives promo poster: Pip in a diving helmet + dashboard collage + wordmark + play button.
export function DivesPoster() {
  return (
    <Svg w={796} h={448} bg={C.cream}>
      {[[40, 50, 'bars'], [180, 130, 'kpi'], [60, 250, 'gauge']].map(([x, y, k], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${[-4, 3, -2][i]})`}>
          <rect width="200" height="130" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2" />
          {k === 'bars' && [0.5, 0.8, 0.6, 0.9, 0.4].map((v, j) => <rect key={j} x={20 + j * 34} y={110 - v * 80} width="22" height={v * 80} fill="#2F6FDE" />)}
          {k === 'kpi' && <><Tx x={20} y={40} t="Active users" s={12} o=".6" /><Tx x={20} y={80} t="48.2K" s={34} w={700} font={DISPLAY} /></>}
          {k === 'gauge' && <><path d="M50 100a50 50 0 0 1 100 0" fill="none" stroke={C.line} strokeWidth="14" /><path d="M50 100a50 50 0 0 1 80-40" fill="none" stroke="#2F6FDE" strokeWidth="14" /></>}
        </g>
      ))}
      <g transform="translate(560 230)">
        <circle r="96" fill="#B9C3CC" stroke={C.ink} strokeWidth="2" />
        <circle r="66" fill="#CFE9F7" stroke={C.ink} strokeWidth="2" />
        <g transform="translate(-50 -48) scale(0.5)"><Item k="pip" x={100} y={100} s={1} p={{}} /></g>
        <rect x="80" y="-40" width="34" height="110" rx="14" fill="#4B5563" stroke={C.ink} strokeWidth="2" />
      </g>
      <Tx x={398} y={70} t="Northwind Data · Dives" s={22} w={700} font={DISPLAY} a="middle" />
      <circle cx="398" cy="224" r="40" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <path d="M386 204v40l32-20z" fill={C.ink} />
    </Svg>
  )
}

// ---------------------------------------------------------------- sticky feature images (580x488)
const PANEL = { blue: C.skyTint, aqua: '#8EF0E3', coral: C.coral, pink: '#FFC9C9' }
export function FeatureImage({ variant = 'chatChart', seed = 0 }) {
  const tint = variant === 'lakeLayers' ? PANEL.pink : pick([PANEL.blue, PANEL.aqua, PANEL.coral], seed)
  const W = 580
  const H = 488
  return (
    <Svg w={W} h={H} bg={tint}>
      <Item k="blob" x={70} y={420} s={0.5} p={{ fill: C.aqua, stroke: true }} />
      <Item k="drum" x={530} y={60} s={0.4} p={{ fill: C.blue }} />
      <Item k="diamond" x={40} y={50} s={1} p={{ fill: C.sun }} />
      {variant === 'chatChart' && (
        <g>
          <rect x="60" y="80" width="250" height="70" rx="16" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <Tx x={80} y={122} t="Which stores grew fastest?" s={16} />
          <path d="M290 150c40 40 60 60 80 80" {...L} strokeDasharray="5 6" />
          <Item k="win" x={380} y={320} s={3.4} p={{ content: 'bars', header: C.sun }} />
        </g>
      )}
      {variant === 'agentHub' && (
        <g>
          {[[120, 110, 'AI'], [460, 110, 'GPT'], [100, 380, 'LLM'], [480, 380, 'IDE']].map(([x, y, t]) => <g key={t}><path d={`M290 244L${x} ${y}`} {...L} strokeWidth="2.5" /><Item k="badge" x={x} y={y} s={1.6} p={{ text: t, fill: [C.white, C.sun, C.aqua, C.blue][t.length % 4] }} /></g>)}
          <circle cx="290" cy="244" r="60" fill={C.sun} stroke={C.ink} strokeWidth="2" />
          <Tx x={290} y={250} t="MCP" s={22} w={700} a="middle" font={MONO} />
        </g>
      )}
      {variant === 'pipIcons' && (
        <g>
          <Item k="pip" x={290} y={280} s={1.3} p={{ pose: 'sign' }} />
          <Item k="win" x={140} y={110} s={1.2} p={{ content: 'bars', header: C.sun }} />
          <Item k="book" x={440} y={110} s={1.1} p={{ fill: C.orange }} />
        </g>
      )}
      {variant === 'pipeClock' && (
        <g>
          <path d="M60 400h120V250h120v120h120V140h100" fill="none" stroke={C.ink} strokeWidth="22" strokeLinejoin="round" />
          <path d="M60 400h120V250h120v120h120V140h100" fill="none" stroke={C.white} strokeWidth="16" strokeLinejoin="round" />
          <Item k="stopwatch" x={300} y={150} s={1.4} />
        </g>
      )}
      {variant === 'guideFn' && (
        <g>
          <Item k="book" x={140} y={240} s={2} p={{ open: true, fill: C.orange }} />
          <path d="M230 240h60" {...L} strokeWidth="2.5" />
          <rect x="290" y="200" width="230" height="40" rx="6" fill={C.ink} />
          <Tx x={304} y={226} t="get_context('revenue')" s={14} font={MONO} f={C.sun} />
          <rect x="300" y="280" width="210" height="110" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <Tx x={316} y={308} t="RETRIEVED" s={11} font={MONO} o=".6" />
          {[0, 1, 2].map((i) => <rect key={i} x="316" y={324 + i * 18} width={[160, 130, 170][i]} height="6" fill={C.line} />)}
        </g>
      )}
      {variant === 'saasCharts' && (
        <g>
          <rect x="60" y="70" width="460" height="350" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <rect x="60" y="70" width="460" height="40" rx="8" fill={C.ink} />
          <Tx x={80} y={96} t="acme · analytics" s={13} f={C.white} />
          <Item k="chartCard" x={170} y={190} s={1.4} p={{ kind: 'pie' }} />
          <Item k="chartCard" x={400} y={190} s={1.4} p={{ kind: 'bars' }} />
          <Item k="chartCard" x={290} y={340} s={2} p={{ kind: 'area', accent: C.aqua }} />
        </g>
      )}
      {variant === 'filterDash' && (
        <g>
          <rect x="56" y="76" width="468" height="264" fill={C.ink} />
          <Dashboard seed={8} theme="light" kind="bars" box={{ x: 60, y: 80, width: 460, height: 256 }} />
        </g>
      )}
      {variant === 'workspace' && (
        <g>
          <rect x="36" y="56" width="508" height="376" fill="none" stroke={C.ink} strokeWidth="2" />
          <SqlNotebook seed={seed} w={531} h={370} box={{ x: 37, y: 57, width: 506, height: 374 }} />
        </g>
      )}
      {(variant === 'pyEditor' || variant === 'sqlTerm' || variant === 'mcpPanel') && (
        <g>
          <rect x="60" y="70" width="460" height="350" rx="10" fill="#1E1E1E" stroke={C.ink} strokeWidth="2" />
          {[C.red, C.sun, '#3CCB7F'].map((f, i) => <circle key={i} cx={84 + i * 16} cy={94} r="5" fill={f} />)}
          {(variant === 'pyEditor'
            ? ['import duckdb', 'import pandas as pd', '', 'con = duckdb.connect("cloud:analytics")', 'df = con.sql("""', '  FROM read_parquet(\'s3://bucket/*.parquet\')', '""").df()', 'print(df.head())']
            : variant === 'sqlTerm'
              ? ['cloud> SELECT count(*) FROM events;', '┌──────────────┐', '│ count_star() │', '├──────────────┤', '│   48,213,907 │', '└──────────────┘', 'cloud> SUMMARIZE orders;', 'cloud> _']
              : ['tool_call: query', '{', '  "sql": "SELECT region, sum(total)', '          FROM orders GROUP BY 1"', '}', '→ 6 rows · 41 ms', 'tool_call: describe_table', '{ "table": "customers" }']
          ).map((l, i) => <Tx key={i} x={84} y={136 + i * 30} t={l} s={15} font={MONO} f={/^(import|cloud>|tool_call)/.test(l) ? '#C9A7F5' : /→|│/.test(l) ? C.aqua : '#E5E7EB'} />)}
        </g>
      )}
      {variant === 'fileTree' && (
        <g>
          <rect x="80" y="70" width="420" height="350" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          {['flights/', '  ├─ ingest_orders.py', '  ├─ enrich_customers.py', '  ├─ schedules.yaml', '  └─ tests/', '      └─ test_ingest.py', 'requirements.txt', 'README.md'].map((l, i) => <Tx key={i} x={104} y={116 + i * 36} t={l} s={16} font={MONO} f={i === 1 ? '#2F6FDE' : C.ink} />)}
        </g>
      )}
      {variant === 'lakeLayers' && (
        <g>
          {['CATALOG (SQL DB)', 'SNAPSHOTS', 'PARQUET FILES'].map((t, i) => (
            <g key={t}>
              <rect x={90 + i * 20} y={80 + i * 120} width={400 - i * 40} height="90" rx="8" fill={[C.white, C.sun, C.aqua][(i + seed) % 3]} stroke={C.ink} strokeWidth="2" />
              <Tx x={290} y={132 + i * 120} t={t} s={16} font={MONO} a="middle" />
              {i < 2 && <path d={`M290 ${170 + i * 120}v30`} {...L} strokeWidth="2.5" />}
            </g>
          ))}
        </g>
      )}
    </Svg>
  )
}
