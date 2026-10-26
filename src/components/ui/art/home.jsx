// Original artwork for homepage slots (IMAGE_BRIEFS.md, Homepage group).
import { C, svgProps, pick } from './palette.js'
import { PipFigure, Doodle, Sunburst } from './pip.jsx'
import { wrap, titleFromLabel } from './text.js'

const INK = { stroke: C.ink, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' }
const MONO = "'Fragment Mono', ui-monospace, monospace"
const SANS = "Inter, system-ui, sans-serif"
const DISPLAY = "'Space Grotesk', sans-serif"

// --- Product icons (Dives = chart window, Flights = paper plane, Guides = book with ink shadow) -----
// No tile behind them on the original: subject plus two small white diamonds.
export function ProductIcon({ seed = 0, variant }) {
  const v = variant || ['dives', 'flights', 'guides'][seed % 3]
  const dia = (x, y, r = 2.2) => <rect x={x - r} y={y - r} width={r * 2} height={r * 2} rx=".6" transform={`rotate(45 ${x} ${y})`} fill={C.white} {...INK} strokeWidth="1.3" />
  return (
    <svg viewBox="0 0 32 32" {...svgProps(false)}>
      {v === 'dives' && (
        <g {...INK} strokeWidth="1.4">
          <rect x="4" y="8" width="25" height="18" rx="1" fill={C.cream} />
          <path d="M4 12h25M10 8v18M16 8v18M22 8v18M4 17h25" strokeWidth=".6" opacity=".35" />
          <path d="M4 24l6-6 4 3 6-7 4 3 5-4v13H4z" fill={C.blue} />
          {dia(22, 8, 2.6)}{dia(5, 26, 2.2)}
        </g>
      )}
      {v === 'flights' && (
        <g {...INK} strokeWidth="1.4">
          <path d="M3 17 29 7 12 24z" fill={C.cream} />
          <path d="M12 24 14 18 29 7" fill="none" />
          <path d="M8 18.5 26 9.2" stroke={C.sun} strokeWidth="1.6" />
          {dia(10, 9, 2)}{dia(20, 25, 2.4)}
        </g>
      )}
      {v === 'guides' && (
        <g {...INK} strokeWidth="1.4">
          <rect x="7" y="8" width="19" height="20" rx="1.5" fill={C.ink} />
          <rect x="9" y="5" width="18" height="20" rx="1.5" fill={C.orange} />
          <path d="M9 22h18v3H10.5A1.5 1.5 0 0 1 9 23.5z" fill={C.white} />
          <path d="M13 10h10M13 13h10M13 16h10" />
          {dia(26.5, 5.5, 2)}{dia(8, 22, 2.4)}
        </g>
      )}
    </svg>
  )
}

// --- Product screenshots (342x165 crop of a light-mode UI on the card tint) -------------------------
const TINT = { flights: '#FFD6B3', guides: '#CDEBFF', dives: '#B8F5E8' }
function Prompt({ y, w = 302 }) {
  return (
    <g>
      <rect x="20" y={y} width={w} height="26" rx="5" fill={C.white} stroke={C.line} />
      <text x="30" y={y + 17} fontFamily={SANS} fontSize="9" fill={C.mute}>Ask anything about your data…</text>
      <rect x={20 + w - 24} y={y + 4} width="18" height="18" rx="4" fill={C.orange} />
      <path d={`M${20 + w - 19} ${y + 13}h8m-3-3 3 3-3 3`} fill="none" stroke={C.white} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}
export function ProductShot({ seed = 0, variant }) {
  const v = variant || ['flights', 'guides', 'dives'][seed % 3]
  return (
    <svg viewBox="0 0 342 165" {...svgProps()}>
      <rect width="342" height="165" fill={TINT[v]} />
      {v === 'flights' && (
        <g>
          <rect x="20" y="14" width="302" height="104" rx="6" fill={C.white} stroke={C.line} />
          <text x="32" y="32" fontFamily={SANS} fontSize="9" fontWeight="600" fill={C.ink}>Scheduled jobs</text>
          <text x="282" y="32" fontFamily={SANS} fontSize="8" fill={C.mute}>Last run</text>
          {[
            ['load_orders_daily', '2m 14s', '#C9F2D6', '#1E7A44', 'OK'],
            ['enrich_customers', '48s', '#C9F2D6', '#1E7A44', 'OK'],
            ['sync_events_hourly', 'running', '#FFF1B8', '#8A6A00', 'RUN'],
            ['backfill_returns', '1m 02s', '#FFD9D6', '#B0352B', 'FAIL'],
          ].map(([name, t, bg, fg, st], i) => (
            <g key={name} transform={`translate(0 ${42 + i * 19})`}>
              <path d="M28 -6h286" stroke={C.soft} />
              <text x="32" y="7" fontFamily={MONO} fontSize="8.5" fill={C.ink}>{name}</text>
              <text x="232" y="7" fontFamily={SANS} fontSize="8" fill={C.grey}>{t}</text>
              <rect x="276" y="-3" width="34" height="13" rx="6.5" fill={bg} />
              <text x="293" y="6.6" textAnchor="middle" fontFamily={SANS} fontSize="7" fontWeight="700" fill={fg}>{st}</text>
            </g>
          ))}
          <Prompt y={128} />
        </g>
      )}
      {v === 'guides' && (
        <g>
          <rect x="20" y="14" width="302" height="140" rx="6" fill={C.white} stroke={C.line} />
          <text x="32" y="32" fontFamily={SANS} fontSize="8" fill={C.mute}>Guides  /  Metrics  /  revenue</text>
          <text x="32" y="56" fontFamily={DISPLAY} fontSize="15" fontWeight="600" fill={C.ink}>Net revenue</text>
          <text x="32" y="76" fontFamily={SANS} fontSize="9" fill={C.ink}>Sum of</text>
          <rect x="64" y="67" width="70" height="13" rx="3" fill={C.soft} />
          <text x="68" y="76.5" fontFamily={MONO} fontSize="8" fill={C.ink}>order_total</text>
          <text x="139" y="76" fontFamily={SANS} fontSize="9" fill={C.ink}>minus</text>
          <rect x="166" y="67" width="64" height="13" rx="3" fill={C.soft} />
          <text x="170" y="76.5" fontFamily={MONO} fontSize="8" fill={C.ink}>refunds</text>
          <text x="235" y="76" fontFamily={SANS} fontSize="9" fill={C.ink}>, per</text>
          <rect x="32" y="85" width="56" height="13" rx="3" fill={C.soft} />
          <text x="36" y="94.5" fontFamily={MONO} fontSize="8" fill={C.ink}>order_id</text>
          <text x="93" y="94" fontFamily={SANS} fontSize="9" fill={C.ink}>in the</text>
          <rect x="124" y="85" width="44" height="13" rx="3" fill={C.soft} />
          <text x="128" y="94.5" fontFamily={MONO} fontSize="8" fill={C.ink}>sales</text>
          <text x="173" y="94" fontFamily={SANS} fontSize="9" fill={C.ink}>schema.</text>
          {[112, 124, 136].map((y, i) => <rect key={y} x="32" y={y} width={[250, 214, 160][i]} height="5" rx="2.5" fill={C.soft} />)}
        </g>
      )}
      {v === 'dives' && (
        <g>
          <rect x="20" y="14" width="302" height="104" rx="6" fill={C.white} stroke={C.line} />
          <text x="32" y="32" fontFamily={SANS} fontSize="9" fontWeight="600" fill={C.ink}>Daily orders</text>
          <text x="32" y="50" fontFamily={DISPLAY} fontSize="15" fontWeight="600" fill={C.ink}>12,480</text>
          <rect x="88" y="39" width="38" height="14" rx="7" fill="#C9F2D6" />
          <text x="107" y="49" textAnchor="middle" fontFamily={SANS} fontSize="8" fontWeight="700" fill="#1E7A44">+8.2%</text>
          <path d="M32 106 58 96 84 100 110 86 136 90 162 76 188 80 214 68 240 72 266 60 292 64 310 56V108H32z" fill={C.skyTint} />
          <path d="M32 106 58 96 84 100 110 86 136 90 162 76 188 80 214 68 240 72 266 60 292 64 310 56" fill="none" stroke={C.blue} strokeWidth="2" strokeLinejoin="round" />
          <path d="M32 108h278" stroke={C.line} />
          <Prompt y={128} />
        </g>
      )}
    </svg>
  )
}

// --- Mascot scenes ------------------------------------------------------------------------------
// Integrations: Pip pointing, with a speech bubble, standing in a yellow sunburst (200x155).
export function PipPointing({ seed = 0 }) {
  // Integrations: Pip rises from behind the dark language bar (cut by the slot's bottom edge),
  // turned left, pointing left with a laugh; speech bubble top right. The sunburst is the section's.
  return (
    <svg viewBox="0 0 200 155" {...svgProps(false)}>
      <g transform="rotate(-10 80 120)">
        <PipFigure x={22} y={50} s={0.66} body={C.white} pose="pointLeft" facing="right" look="left" mouth="open" legs="none" />
      </g>
      <path d="M80 12h108a9 9 0 0 1 9 9v29a9 9 0 0 1-9 9h-50l-14 14 2-14H80a9 9 0 0 1-9-9V21a9 9 0 0 1 9-9z" fill={C.white} {...INK} vectorEffect="non-scaling-stroke" />
      <text x="134" y="41" textAnchor="middle" fontFamily={SANS} fontSize="15" letterSpacing=".3" fill={C.ink}>LET&apos;S GO!</text>
    </svg>
  )
}
// Blog heading: Pip standing on its ground shadow, eyes left, back arm raised in greeting (247x246).
export function PipWaving({ seed = 0 }) {
  return (
    <svg viewBox="0 0 247 246" {...svgProps(false)}>
      <PipFigure x={8} y={2} s={1.15} body={C.white} pose="greet" facing="right" look="left" legs="walk" shadow="rgba(56,56,56,.16)" />
    </svg>
  )
}

// --- Footer compliance seals (round, blue and white; invented wording) -----------------------------
export function Seal({ seed = 0, variant }) {
  const v = variant || (seed % 2 ? 'privacy' : 'audit')
  const id = `seal-${v}`
  const ring = v === 'audit' ? 'INDEPENDENTLY AUDITED · SECURITY CONTROLS · ' : 'DATA PROTECTION · PRIVACY READY · '
  return (
    <svg viewBox="0 0 72 72" {...svgProps(false)}>
      <defs>
        <path id={id} d="M36 36m-25 0a25 25 0 1 1 50 0a25 25 0 1 1-50 0" />
      </defs>
      <circle cx="36" cy="36" r="34" fill={v === 'audit' ? '#1F5FA8' : C.white} stroke="#1F5FA8" strokeWidth="2" />
      <circle cx="36" cy="36" r="19" fill={v === 'audit' ? C.white : '#1F5FA8'} />
      <text fontFamily={SANS} fontSize="6.2" fontWeight="700" letterSpacing=".4" fill={v === 'audit' ? C.white : '#1F5FA8'}>
        <textPath href={`#${id}`}>{ring}</textPath>
      </text>
      {v === 'audit' ? (
        <path d="M28 36.5 34 42 45 30" fill="none" stroke="#1F5FA8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <g fill="none" stroke={C.white} strokeWidth="2.4" strokeLinejoin="round">
          <rect x="29" y="34" width="14" height="11" rx="2" fill={C.white} />
          <path d="M31.5 34v-3.5a4.5 4.5 0 0 1 9 0V34" />
        </g>
      )}
    </svg>
  )
}

// --- Square brand mark for near-square logo slots (invented) ---------------------------------------
export function Monogram({ seed = 0 }) {
  const letter = pick(['Q', 'R', 'V', 'Z', 'K', 'M'], seed)
  return (
    <svg viewBox="0 0 48 40" {...svgProps(false)}>
      <rect x="6" y="2" width="36" height="36" rx="9" fill={C.ink} />
      <text x="24" y="28.5" textAnchor="middle" fontFamily={DISPLAY} fontSize="24" fontWeight="700" fill={C.white}>{letter}</text>
    </svg>
  )
}

// --- 16px storage glyphs: table format (stacked slabs), open table format (peak), object store (bucket)
export function StorageGlyph({ seed = 0, variant }) {
  const v = variant || ['layers', 'peak', 'bucket'][seed % 3]
  return (
    <svg viewBox="0 0 16 16" {...svgProps(false)}>
      {v === 'layers' && (
        <g stroke={C.ink} strokeWidth="1" strokeLinejoin="round">
          <path d="M8 9.5 14 12 8 14.5 2 12z" fill={C.aqua} />
          <path d="M8 5.5 14 8 8 10.5 2 8z" fill={C.sun} />
          <path d="M8 1.5 14 4 8 6.5 2 4z" fill={C.orange} />
        </g>
      )}
      {v === 'peak' && (
        <g stroke="#1F5FA8" strokeWidth="1" strokeLinejoin="round">
          <path d="M1 13 6.5 4 9 8l1.8-2.6L15 13z" fill={C.skyTint} />
          <path d="M5.2 6.2 6.5 4l1.4 2.2-1.4.8z" fill={C.white} />
          <path d="M0.5 13.5h15" fill="none" />
        </g>
      )}
      {v === 'bucket' && (
        <g>
          <circle cx="8" cy="8" r="8" fill="#E8590C" />
          <path d="M4 5.5h8l-1 6.5H5z" fill={C.white} />
          <ellipse cx="8" cy="5.5" rx="4" ry="1.3" fill="#FFB27A" />
        </g>
      )}
    </svg>
  )
}

// --- Blog card thumbnails (344x194, 16:9) -----------------------------------------------------------
function Headline({ text, x, y, max = 14, size = 18, fill = C.ink, lines = 3 }) {
  return (
    <text x={x} y={y} fontFamily={DISPLAY} fontSize={size} fontWeight="700" fill={fill} style={{ textTransform: 'uppercase' }}>
      {wrap(text, max, lines).map((l, i) => (
        <tspan key={i} x={x} dy={i ? size * 1.08 : 0}>{l}</tspan>
      ))}
    </text>
  )
}
const short = (t, n = 5) => t.split(/\s+/).slice(0, n).join(' ').replace(/[,:;]$/, '')

// Webinar / video: one presenter photo beside a bold headline on a branded panel.
export function PresenterThumb({ seed = 0, label, photo, tone }) {
  const bg = tone || pick([C.blue, C.sun, C.ink, C.aqua], seed)
  const fg = bg === C.ink ? C.white : C.ink
  const cid = `pt-${seed}-${(photo || '').length}`
  return (
    <svg viewBox="0 0 344 194" {...svgProps()}>
      <rect width="344" height="194" fill={bg} />
      <rect x="18" y="18" width="62" height="16" rx="2" fill={bg === C.sun ? C.ink : C.sun} />
      <text x="49" y="29.5" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={bg === C.sun ? C.white : C.ink}>
        {seed % 2 ? 'WEBINAR' : 'LIVE TALK'}
      </text>
      <Headline text={short(titleFromLabel(label))} x={18} y={66} max={13} size={19} fill={fg} />
      <path d="M18 166h44" stroke={fg} strokeWidth="3" />
      <defs>
        <clipPath id={cid}>
          <rect x="196" y="18" width="130" height="158" rx="6" />
        </clipPath>
      </defs>
      <rect x="196" y="18" width="130" height="158" rx="6" fill={C.white} />
      {photo && <image href={photo} x="196" y="18" width="130" height="158" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${cid})`} />}
      <rect x="196" y="18" width="130" height="158" rx="6" fill="none" stroke={C.ink} strokeWidth="2.5" />
    </svg>
  )
}

// Designed editorial graphics: Pip with an object, a chart card, or a speaker-card layout.
export function EditorialThumb({ seed = 0, label, variant }) {
  const v = variant || ['pip', 'chart', 'speakers'][seed % 3]
  const title = short(titleFromLabel(label), 4)
  if (v === 'pip') {
    const bg = pick([C.blue, C.aqua, C.peach], seed)
    return (
      <svg viewBox="0 0 344 194" {...svgProps()}>
        <rect width="344" height="194" fill={bg} />
        <Headline text={title} x={18} y={40} max={12} size={18} />
        <Sunburst cx={252} cy={104} r={74} rays={16} fill={C.sun} />
        <PipFigure x={196} y={44} s={0.58} body={C.white} pose="hold" facing="left" />
        {/* held object: a small database cylinder */}
        <g {...INK} strokeWidth="2.2">
          <path d="M226 120v16c0 4 10 7 22 7s22-3 22-7v-16" fill={C.orange} />
          <ellipse cx="248" cy="120" rx="22" ry="7" fill={C.sun} />
        </g>
        <Doodle kind="star" x={40} y={160} fill={C.white} />
        <Doodle kind="x" x={84} y={150} s={0.8} fill={C.white} />
      </svg>
    )
  }
  if (v === 'chart') {
    return (
      <svg viewBox="0 0 344 194" {...svgProps()}>
        <rect width="344" height="194" fill={C.sun} />
        <Headline text={title} x={18} y={40} max={11} size={18} />
        <g transform="rotate(-4 250 100)">
          <rect x="176" y="28" width="150" height="140" rx="4" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
          <text x="188" y="48" fontFamily={MONO} fontSize="8" fill={C.grey}>QUERY TIME (MS)</text>
          {[86, 58, 70, 40, 26].map((h, i) => (
            <rect key={i} x={190 + i * 26} y={154 - h} width="18" height={h} fill={i === 4 ? C.orange : C.blue} stroke={C.ink} strokeWidth="1.8" />
          ))}
          <path d="M186 154h128" stroke={C.ink} strokeWidth="2" />
        </g>
        <rect x="18" y="130" width="120" height="40" rx="3" fill={C.ink} />
        <text x="28" y="148" fontFamily={MONO} fontSize="8" fill={C.sun}>SELECT count(*)</text>
        <text x="28" y="161" fontFamily={MONO} fontSize="8" fill={C.white}>FROM events;</text>
      </svg>
    )
  }
  // speakers: two illustrated speaker cards with abstract busts
  return (
    <svg viewBox="0 0 344 194" {...svgProps()}>
      <rect width="344" height="194" fill={C.ink} />
      <Headline text={title} x={18} y={40} max={14} size={17} fill={C.white} lines={2} />
      {[0, 1].map((i) => {
        const x = 26 + i * 158
        const tint = i ? C.aqua : C.sun
        return (
          <g key={i}>
            <rect x={x} y="86" width="138" height="88" rx="4" fill={tint} stroke={C.white} strokeWidth="2" />
            <circle cx={x + 36} cy="122" r="16" fill={C.white} stroke={C.ink} strokeWidth="2" />
            <path d={`M${x + 12} 168c2-16 12-24 24-24s22 8 24 24`} fill={C.white} stroke={C.ink} strokeWidth="2" />
            <rect x={x + 72} y="112" width="52" height="8" fill={C.ink} />
            <rect x={x + 72} y="126" width="38" height="6" fill={C.ink} opacity=".5" />
          </g>
        )
      })}
    </svg>
  )
}

// Newsletter: yellow and dark split panel with a list of headline items.
export function NewsletterThumb({ seed = 0, label }) {
  return (
    <svg viewBox="0 0 344 194" {...svgProps()}>
      <rect width="344" height="194" fill={C.sun} />
      <rect x="150" y="0" width="194" height="194" fill={C.ink} />
      <Headline text={short(titleFromLabel(label), 3)} x={18} y={44} max={9} size={20} />
      <text x="18" y="172" fontFamily={MONO} fontSize="9" fill={C.ink}>ISSUE #{12 + (seed % 30)}</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(168 ${30 + i * 38})`}>
          <rect width="14" height="14" fill={[C.sun, C.blue, C.aqua, C.orange][i]} />
          <rect x="24" y="1" width={[130, 112, 140, 96][i]} height="6" fill={C.white} />
          <rect x="24" y="12" width={[90, 120, 70, 104][i]} height="4" fill={C.white} opacity=".45" />
        </g>
      ))}
    </svg>
  )
}

// Invented customer wordmark with tight bounds so it fills wide, short logo slots.
const BRANDS = ['Northwind', 'Lumen', 'Kestrel', 'Orbitly', 'Fernway', 'Quartzo', 'Halcyon', 'Brightloop', 'Tidewell', 'Parallax', 'Monarch', 'Cobalt', 'Saltmarsh', 'Vantage', 'Pinecrest', 'Arbor']
export function Brand({ seed = 0, name }) {
  const n = name || pick(BRANDS, seed)
  const mark = seed % 4
  const w = 40 + n.length * 15.5
  return (
    <svg viewBox={`0 0 ${w} 34`} {...svgProps(false)}>
      <g fill={C.ink}>
        {mark === 0 && <circle cx="15" cy="17" r="12" />}
        {mark === 1 && <rect x="3" y="5" width="24" height="24" rx="5" />}
        {mark === 2 && <path d="M15 4 28 29H2z" />}
        {mark === 3 && <path d="M3 17a12 12 0 0 1 24 0h-8a4 4 0 0 0-8 0zM3 20h24a12 12 0 0 1-24 0z" />}
        <text x="36" y="26" fontFamily={DISPLAY} fontSize="26" fontWeight="700" letterSpacing="-0.6">{n}</text>
      </g>
    </svg>
  )
}
