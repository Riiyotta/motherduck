// Original UI mocks, charts and diagrams for screenshot/diagram slots (IMAGE_BRIEFS.md).
import { C, svgProps, pick } from './palette.js'
import { Item, K, FONTS } from './kit.jsx'

const { MONO, SANS, DISPLAY } = FONTS
const L = { ...K, fill: 'none' }
const Tx = ({ x, y, t, s = 10, f = C.ink, w = 400, a = 'start', font = SANS, o }) => (
  <text x={x} y={y} fontFamily={font} fontSize={s} fontWeight={w} fill={f} textAnchor={a} opacity={o}>{t}</text>
)
const bar = (x, y, w, h = 4, f = C.line, r = 2) => <rect x={x} y={y} width={w} height={h} rx={r} fill={f} />
const Svg = ({ w, h, children, bg, slice = true, box }) => (
  <svg viewBox={`0 0 ${w} ${h}`} {...svgProps(slice)} {...box}>
    {bg && <rect width={w} height={h} fill={bg} />}
    {children}
  </svg>
)
const Dots = ({ x, y }) => [C.red, C.sun, '#3CCB7F'].map((f, i) => <circle key={i} cx={x + i * 14} cy={y} r="5" fill={f} />)
const series = (n, seed, lo = 0.2, hi = 0.9) => Array.from({ length: n }, (_, i) => lo + ((Math.sin(seed * 3.7 + i * 1.3) + 1) / 2) * (hi - lo))
const linePath = (vals, x, y, w, h) => vals.map((v, i) => `${i ? 'L' : 'M'}${(x + (i * w) / (vals.length - 1)).toFixed(1)} ${(y + h - v * h).toFixed(1)}`).join(' ')

// ---------------------------------------------------------------- dashboards (dive / gallery / live embed)
export function Dashboard({ seed = 0, theme, kind, box }) {
  const dark = theme ? theme === 'dark' : seed % 9 < 5
  const k = kind || ['kpi', 'gauge', 'table', 'map', 'scatter', 'music', 'game', 'grid', 'bars'][seed % 9]
  const bg = dark ? '#0D1117' : C.white
  const panel = dark ? '#161B22' : '#F6F7F9'
  const line = dark ? '#30363D' : '#E3E5E8'
  const fg = dark ? '#E6EDF3' : C.ink
  const acc = [C.teal, C.orange, '#8B5CF6', '#3B82F6', '#22D3EE'][seed % 5]
  const acc2 = [C.orange, '#8B5CF6', C.teal, C.sun, '#F472B6'][seed % 5]
  const P = (x, y, w, h) => <rect x={x} y={y} width={w} height={h} rx="6" fill={panel} stroke={line} />
  return (
    <Svg w={393} h={219} bg={bg} box={box}>
      <Tx x={14} y={22} t={['Revenue overview', 'Fleet health', 'Quarterly P&L', 'Sales by state', 'Pitch explorer', 'Now playing', 'Arcade stats', 'Inventory grid', 'Weekly signups'][seed % 9]} s={11} w={700} f={fg} />
      {bar(300, 14, 78, 10, line, 5)}
      {k === 'kpi' && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {P(14 + i * 124, 34, 116, 50)}
              <Tx x={24 + i * 124} y={52} t={['Revenue', 'Orders', 'Margin'][i]} s={8} f={fg} o=".6" />
              <Tx x={24 + i * 124} y={74} t={['$1.24M', '18,402', '32.4%'][i]} s={16} w={700} f={fg} />
            </g>
          ))}
          {P(14, 92, 364, 112)}
          <path d={linePath(series(14, seed), 26, 104, 340, 88)} {...L} stroke={acc} strokeWidth="2.5" />
          <path d={linePath(series(14, seed + 2, 0.1, 0.5), 26, 104, 340, 88)} {...L} stroke={acc2} strokeWidth="2" />
        </g>
      )}
      {k === 'gauge' && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {P(14 + i * 124, 34, 116, 86)}
              <path d={`M${36 + i * 124} 104a36 36 0 0 1 72 0`} fill="none" stroke={line} strokeWidth="9" />
              <path d={`M${36 + i * 124} 104a36 36 0 0 1 ${[50, 64, 30][i]} ${[-34, -18, -36][i]}`} fill="none" stroke={[acc, acc2, C.sun][i]} strokeWidth="9" />
              <Tx x={72 + i * 124} y={102} t={['72%', '91%', '48%'][i]} s={12} w={700} f={fg} a="middle" />
            </g>
          ))}
          {P(14, 128, 364, 78)}
          {series(24, seed).map((v, i) => <rect key={i} x={24 + i * 14.5} y={196 - v * 58} width="9" height={v * 58} fill={i % 3 ? acc : acc2} rx="2" />)}
        </g>
      )}
      {k === 'table' && (
        <g>
          {P(14, 34, 176, 56)}
          <Tx x={24} y={52} t="Net income" s={8} f={fg} o=".6" />
          <Tx x={24} y={78} t="$4.82M" s={22} w={700} f={fg} />
          {P(200, 34, 178, 56)}
          {series(10, seed).map((v, i) => <rect key={i} x={210 + i * 16} y={84 - v * 40} width="10" height={v * 40} fill={acc} rx="2" />)}
          {P(14, 98, 364, 108)}
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <g key={r}>
              <path d={`M22 ${116 + r * 16}h348`} stroke={line} />
              {bar(26, 108 + r * 16, 70, 4, fg, 2)}
              <Tx x={250} y={113 + r * 16} t={`${(12.4 + r * 3.1).toFixed(1)}M`} s={8} f={fg} />
              <Tx x={320} y={113 + r * 16} t={r % 2 ? '+4.1%' : '-1.2%'} s={8} f={r % 2 ? '#1E7A44' : '#B0352B'} />
            </g>
          ))}
        </g>
      )}
      {k === 'map' && (
        <g>
          {P(14, 34, 250, 172)}
          {Array.from({ length: 40 }, (_, i) => {
            const v = (Math.sin(i * 2.1 + seed) + 1) / 2
            return <rect key={i} x={28 + (i % 8) * 28} y={46 + Math.floor(i / 8) * 30} width="26" height="28" rx="3" fill={`hsl(${120 - v * 120} 60% ${dark ? 40 : 60}%)`} />
          })}
          {P(272, 34, 106, 172)}
          {[0, 1, 2, 3, 4, 5, 6].map((r) => <g key={r}>{bar(282, 50 + r * 21, 40, 4, fg)}{bar(330, 50 + r * 21, 36 - r * 3, 4, acc)}</g>)}
        </g>
      )}
      {k === 'scatter' && (
        <g>
          {P(14, 34, 364, 172)}
          {Array.from({ length: 120 }, (_, i) => {
            const x = 30 + ((Math.sin(i * 12.9898 + seed) * 43758.5453) % 1 + 1) % 1 * 330
            const y = 48 + ((Math.sin(i * 78.233 + seed) * 12345.678) % 1 + 1) % 1 * 145
            return <circle key={i} cx={x} cy={y} r="3" fill={dark ? C.sun : '#3B82F6'} opacity={0.35 + (i % 5) / 8} />
          })}
        </g>
      )}
      {k === 'music' && (
        <g>
          {P(14, 34, 140, 172)}
          <rect x="30" y="48" width="108" height="108" rx="8" fill={acc} />
          <circle cx="84" cy="102" r="30" fill={bg} />
          <circle cx="84" cy="102" r="8" fill={acc2} />
          {bar(30, 170, 108, 4, line)}{bar(30, 170, 60, 4, acc2)}
          {P(162, 34, 216, 172)}
          {series(32, seed).map((v, i) => <rect key={i} x={172 + i * 6.3} y={120 - v * 60} width="4" height={v * 120} fill={acc} rx="2" />)}
        </g>
      )}
      {k === 'game' && (
        <g>
          {P(14, 34, 364, 172)}
          {Array.from({ length: 12 * 22 }, (_, i) => {
            const c = i % 22
            const r = Math.floor(i / 22)
            const on = (Math.sin(c * 0.9 + seed) * 3 + 7 < r) || (r === 3 && c % 5 === 1)
            return on ? <rect key={i} x={24 + c * 16} y={44 + r * 13} width="14" height="11" fill={r === 3 ? C.sun : acc} /> : null
          })}
          <rect x={120} y={140} width="14" height="14" fill={acc2} />
        </g>
      )}
      {k === 'grid' && (
        <g>
          {P(14, 34, 364, 172)}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => (
            <g key={r}>
              <path d={`M14 ${54 + r * 19}h364`} stroke={line} />
              {[0, 1, 2, 3, 4].map((c) => <g key={c}>{bar(24 + c * 72, 42 + r * 19, 30 + ((r * 7 + c * 13) % 30), 4, c === 0 ? fg : line)}</g>)}
            </g>
          ))}
        </g>
      )}
      {k === 'bars' && (
        <g>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={14 + i * 56} y="34" width="50" height="16" rx="8" fill={i ? panel : acc} stroke={line} />)}
          {P(14, 58, 364, 148)}
          {series(12, seed).map((v, i) => <rect key={i} x={30 + i * 29} y={194 - v * 120} width="18" height={v * 120} fill={acc} rx="2" />)}
        </g>
      )}
      {seed % 4 === 1 && <path d="M14 0h22v28l-11-7-11 7z" fill={[C.sun, C.red, C.blue][seed % 3]} />}
    </Svg>
  )
}

// Live geo dashboard for the "try a live dive" embed (world map with point markers).
export function LiveMap({ seed = 0 }) {
  return (
    <Svg w={896} h={600} bg="#F6F7F9">
      <rect width="896" height="52" fill={C.ink} />
      <Tx x={24} y={32} t="Quake explorer" s={16} w={700} f={C.white} />
      <rect x="160" y="18" width="46" height="20" rx="10" fill={C.sun} />
      <Tx x={183} y={32} t="LIVE" s={10} w={700} a="middle" font={MONO} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={24 + i * 214} y="72" width="200" height="70" rx="8" fill={C.white} stroke={C.line} />
          <Tx x={40 + i * 214} y={96} t={['Events (24h)', 'Max magnitude', 'Avg depth', 'Regions'][i]} s={11} o=".6" />
          <Tx x={40 + i * 214} y={128} t={['1,284', '6.1', '34 km', '42'][i]} s={22} w={700} />
        </g>
      ))}
      <rect x="24" y="160" width="848" height="416" rx="8" fill="#DCEBF5" stroke={C.line} />
      <g fill="#C7D9C0" stroke="#9FB79A">
        <path d="M120 230c60-20 140-10 170 30 10 40-20 80-60 90-30 30-40 80-80 70-30-30-20-80-50-110-10-40 0-70 20-80z" />
        <path d="M330 220c40-20 90-10 110 20-10 30-40 30-50 60 20 60-10 140-50 150-20-50-30-100-20-150-20-30-10-60 10-80z" />
        <path d="M470 210c80-30 200-20 260 20 30 40-10 70-50 70-20 40-80 30-110 60-40-10-40-60-80-70-30-20-20-60-20-80z" />
        <path d="M680 420c30-10 70 0 80 30-10 30-50 40-80 20-10-20-10-40 0-50z" />
      </g>
      {Array.from({ length: 70 }, (_, i) => {
        const x = 60 + (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1 * 780
        const y = 190 + (((Math.sin(i * 78.233) * 12345.678) % 1) + 1) % 1 * 360
        const r = 3 + (i % 5) * 2
        return <circle key={i} cx={x} cy={y} r={r} fill={C.orange} fillOpacity=".55" stroke="#C2410C" />
      })}
    </Svg>
  )
}

// ---------------------------------------------------------------- SQL notebook / workspace
export function SqlNotebook({ seed = 0, w = 531, h = 332, box }) {
  return (
    <Svg w={w} h={h} bg={C.white} box={box}>
      <rect width={w} height="30" fill="#2F6FDE" />
      <Tx x={14} y={20} t="Notebook · orders_analysis" s={11} w={600} f={C.white} />
      <rect x="0" y="30" width="120" height={h - 30} fill="#F6F7F9" />
      <path d={`M120 30v${h}`} stroke={C.line} />
      {['my_db', '  orders', '  customers', '  events', 'sample_data', '  nyc_taxi', '  hn'].map((t, i) => <Tx key={i} x={12} y={54 + i * 18} t={t} s={9} font={MONO} f={i === 1 ? '#2F6FDE' : C.ink} />)}
      <rect x="134" y="44" width={w - 270} height="64" rx="4" fill="#FBFBFC" stroke={C.line} />
      <Tx x={146} y={64} t="SELECT region, sum(total) AS revenue" s={9} font={MONO} f="#7C3AED" />
      <Tx x={146} y={80} t="FROM orders GROUP BY 1" s={9} font={MONO} />
      <Tx x={146} y={96} t="ORDER BY revenue DESC;" s={9} font={MONO} />
      <rect x="134" y="118" width={w - 270} height={h - 132} rx="4" fill={C.white} stroke={C.line} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
        <g key={r}>
          <path d={`M134 ${138 + r * 20}h${w - 270}`} stroke="#EEF0F2" />
          <Tx x={144} y={133 + r * 20} t={r ? ['north', 'south', 'east', 'west', 'central', 'coastal', 'metro', 'rural'][r - 1] : 'region'} s={9} w={r ? 400 : 700} font={MONO} />
          <Tx x={260} y={133 + r * 20} t={r ? `${(980 - r * 87).toLocaleString()}.20` : 'revenue'} s={9} w={r ? 400 : 700} font={MONO} />
        </g>
      ))}
      <rect x={w - 124} y="44" width="112" height={h - 58} rx="4" fill="#F6F7F9" stroke={C.line} />
      <Tx x={w - 114} y={62} t="Column profile" s={9} w={700} />
      {series(8, seed).map((v, i) => <rect key={i} x={w - 112 + i * 12} y={140 - v * 60} width="8" height={v * 60} fill="#2F6FDE" opacity=".7" />)}
      {[0, 1, 2, 3].map((i) => <g key={i}>{bar(w - 112, 160 + i * 18, 50, 4, C.line)}{bar(w - 56, 160 + i * 18, 30, 4, '#2F6FDE')}</g>)}
    </Svg>
  )
}

// ---------------------------------------------------------------- hypertenancy
export function AdminTable({ seed = 0, tab = 'UI' }) {
  if (tab !== 'UI') return <CodePanel lang={tab} />
  const tiers = [['Pulse', 'Light, bursty reads'], ['Standard', 'Everyday analytics'], ['Jumbo', 'Heavier joins'], ['Mega', 'Large scans'], ['Giga', 'Largest workloads']]
  return (
    <Svg w={1024} h={540} bg={C.white}>
      <Tx x={40} y={56} t="Users" s={22} w={700} />
      {['Username', 'Instance size', 'Role'].map((t, i) => <Tx key={t} x={[40, 420, 760][i]} y={100} t={t} s={13} w={600} o=".6" />)}
      {['ana.ruiz', 'svc-reporting', 'kenji.t', 'agent-orders', 'priya.m', 'tenant-0412', 'li.wei'].map((u, r) => (
        <g key={u}>
          <path d={`M40 ${118 + r * 56}h944`} stroke="#EEF0F2" />
          <circle cx="56" cy={146 + r * 56} r="12" fill={[C.blue, C.sun, C.aqua, C.coral][r % 4]} />
          <Tx x={78} y={151 + r * 56} t={u} s={14} font={MONO} />
          <rect x="420" y={130 + r * 56} width="200" height="32" rx="6" fill={C.white} stroke={C.line} />
          <Tx x={434} y={151 + r * 56} t={tiers[(r + 1) % 5][0]} s={13} />
          <path d={`M600 ${143 + r * 56}l6 6 6-6`} {...L} strokeWidth="1.5" />
          <Tx x={760} y={151 + r * 56} t={r % 3 ? 'Member' : 'Admin'} s={13} />
        </g>
      ))}
      <rect x="420" y="218" width="300" height="290" rx="8" fill={C.white} stroke={C.line} />
      <rect x="420" y="218" width="300" height="290" rx="8" fill="none" stroke="#00000014" strokeWidth="8" />
      {tiers.map(([t, d], i) => (
        <g key={t}>
          {i === 1 && <rect x="426" y={226 + i * 56} width="288" height="52" rx="6" fill="#F1F5FF" />}
          <rect x="438" y={236 + i * 56} width="30" height="30" rx="6" fill={[C.mint, C.skyTint, C.peach, C.coral, '#E9DDFB'][i]} stroke={C.ink} />
          <Tx x={482} y={248 + i * 56} t={t} s={14} w={600} />
          <Tx x={482} y={265 + i * 56} t={d} s={11} o=".6" />
        </g>
      ))}
    </Svg>
  )
}
function CodePanel({ lang }) {
  const code = lang === 'CURL'
    ? ['curl -X POST https://api.example.dev/v1/users \\', '  -H "Authorization: Bearer $TOKEN" \\', '  -d \'{', '    "username": "tenant-0412",', '    "instance_size": "standard"', '  }\'']
    : ['import requests', '', 'resp = requests.post(', '    f"{API}/v1/users",', '    headers={"Authorization": f"Bearer {TOKEN}"},', '    json={"username": "tenant-0412",', '          "instance_size": "standard"},', ')', 'print(resp.json())']
  return (
    <Svg w={1024} h={540} bg="#1E1E1E">
      <Dots x={28} y={26} />
      {code.map((l, i) => (
        <g key={i}>
          <Tx x={40} y={90 + i * 32} t={String(i + 1)} s={15} font={MONO} f="#6B7280" />
          <Tx x={84} y={90 + i * 32} t={l} s={17} font={MONO} f={/^\s*(import|curl|print)/.test(l) ? '#C9A7F5' : /"/.test(l) ? C.aqua : '#E5E7EB'} />
        </g>
      ))}
    </Svg>
  )
}
export function AsciiTerminal() {
  const rows = ['┌──────────────┬───────────┬──────────┐', '│ org          │ instance  │ tenants  │', '├──────────────┼───────────┼──────────┤', '│ acme-retail  │ standard  │      214 │', '│ fjord-labs   │ jumbo     │       38 │', '│ kite-health  │ pulse     │    1,902 │', '│ orbit-ship   │ mega      │       12 │', '└──────────────┴───────────┴──────────┘']
  return (
    <Svg w={581} h={559} bg="#2B2A3A">
      <rect x="30" y="60" width="521" height="440" rx="10" fill="#1E1E1E" stroke={C.ink} strokeWidth="2" />
      <Dots x={52} y={84} />
      <Tx x={50} y={128} t="$ cloudctl tenants list --org all" s={13} font={MONO} f={C.sun} />
      {rows.map((r, i) => <Tx key={i} x={50} y={160 + i * 22} t={r} s={13} font={MONO} f="#E5E7EB" />)}
      <Tx x={50} y={360} t="$ _" s={13} font={MONO} f={C.aqua} />
    </Svg>
  )
}
const PanelFrame = ({ children }) => (
  <Svg w={581} h={559}>
    <defs>
      <linearGradient id="hpg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#383838" />
        <stop offset="1" stopColor="#9B7BC4" />
      </linearGradient>
    </defs>
    <rect width="581" height="559" fill="url(#hpg)" />
    <rect x="30" y="40" width="521" height="479" rx="12" fill={C.white} stroke={C.ink} strokeWidth="2" />
    {children}
  </Svg>
)
export function HyperPanel({ seed = 0, n = 2 }) {
  if (n === 1) return <AsciiTerminal />
  if (n === 2)
    return (
      <PanelFrame>
        <Item k="cloud" x={140} y={330} s={1.6} />
        <Item k="pip" x={140} y={260} s={0.55} p={{ goggles: true, pose: 'point' }} />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M190 ${250 - i * 6}C${260 + i * 10} ${120 - i * 14} ${360} ${140} ${410} 300`} {...L} stroke={[C.teal, C.blue, C.red, C.orange, '#9B7BC4'][i]} />)}
        <Item k="drum" x={420} y={340} s={1.6} p={{ fill: C.white }} />
        <rect x="350" y="100" width="150" height="70" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <Tx x={366} y={124} t="UTILISATION" s={10} font={MONO} o=".6" />
        <Tx x={366} y={154} t="70%" s={26} w={700} font={DISPLAY} />
        <path d="M440 150a22 22 0 0 1 44 0" fill="none" stroke={C.line} strokeWidth="7" />
        <path d="M440 150a22 22 0 0 1 36-17" fill="none" stroke={C.teal} strokeWidth="7" />
      </PanelFrame>
    )
  if (n === 3)
    return (
      <PanelFrame>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="60" y={90 + i * 120} width="90" height="80" rx="8" fill={[C.aqua, C.blue, C.red][i]} stroke={C.ink} strokeWidth="2" />
            <Item k="laptop" x={105} y={136 + i * 120} s={0.6} />
            <path d={`M150 ${130 + i * 120}H240`} {...L} stroke={[C.teal, '#2F6FDE', C.red][i]} strokeWidth="2.5" />
            <Item k="pipJr" x={270} y={130 + i * 120} s={0.22} />
            <Item k="gear" x={300} y={150 + i * 120} s={0.3} p={{ fill: C.sun }} />
            <path d={`M310 ${130 + i * 120}C380 ${130 + i * 120} 380 280 420 280`} {...L} stroke={[C.teal, '#2F6FDE', C.red][i]} strokeWidth="2.5" />
          </g>
        ))}
        <Item k="cloud" x={460} y={320} s={1.2} />
        <Item k="drum" x={460} y={280} s={1.1} p={{ fill: C.sun }} />
      </PanelFrame>
    )
  if (n === 4)
    return (
      <PanelFrame>
        <Tx x={60} y={86} t="Monthly cost" s={14} w={700} />
        <path d="M60 460h460M60 110v350" {...L} strokeWidth="1.5" />
        <path d="M60 220C120 220 120 400 180 400S240 180 300 200 360 420 420 410 480 260 520 250V220H60z" fill={C.peach} />
        <path d="M60 220H520" {...L} stroke="#2F6FDE" strokeWidth="3" />
        <path d="M60 220C120 220 120 400 180 400S240 180 300 200 360 420 420 410 480 260 520 250" {...L} stroke={C.orange} strokeWidth="3" />
        <rect x="150" y="420" width="96" height="24" rx="12" fill={C.ink} />
        <Tx x={198} y={436} t="SPIN DOWN" s={10} font={MONO} f={C.white} a="middle" />
        <Tx x={420} y={208} t="legacy" s={11} f="#2F6FDE" font={MONO} />
      </PanelFrame>
    )
  return (
    <PanelFrame>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {['SERVICE ACCT', 'INSTANCE', 'DATA', 'QUERIES', 'IDLE'].map((t, i) => (
            <g key={t}>
              <rect x={48 + i * 100} y={110 + r * 130} width="86" height="36" rx="18" fill={[C.ink, C.sun, C.aqua, C.blue, C.line][i]} stroke={C.ink} />
              <Tx x={91 + i * 100} y={133 + r * 130} t={t} s={9} font={MONO} a="middle" f={i ? C.ink : C.white} />
              {i < 4 && <path d={`M${134 + i * 100} ${128 + r * 130}h14`} {...L} />}
            </g>
          ))}
        </g>
      ))}
    </PanelFrame>
  )
}

// Routing diagram (hypertenancy hero media).
export function RoutingDiagram() {
  return (
    <Svg w={1028} h={573} bg="#4A4A2E">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="60" y={90 + i * 140} width="160" height="110" rx="10" fill={[C.aqua, C.blue, C.red][i]} stroke={C.ink} strokeWidth="2" />
          {i ? <Item k="laptop" x={140} y={150 + i * 140} s={0.9} /> : <Item k="plugbot" x={140} y={160} s={1} />}
          <Tx x={140} y={218 + i * 140} t={['AGENT', 'ANALYST', 'APP USER'][i]} s={11} font={MONO} f={C.white} a="middle" />
          <path d={`M220 ${145 + i * 140}C300 ${145 + i * 140} 300 286 360 286`} {...L} stroke={[C.teal, '#6FC2FF', C.red][i]} strokeWidth="4" />
        </g>
      ))}
      <rect x="360" y="256" width="60" height="60" rx="10" fill={C.ink} stroke={C.white} />
      <path d="M380 270v-14M400 270v-14" stroke={C.white} strokeWidth="4" />
      <rect x="470" y="70" width="200" height="440" rx="12" fill="#5E5E3E" stroke={C.ink} strokeWidth="2" />
      <Tx x={570} y={100} t="INSTANCES" s={12} font={MONO} f={C.white} a="middle" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="490" y={120 + i * 62} width="160" height="44" rx="22" fill={C.white} stroke={C.ink} />
          <Item k="pipJr" x={516} y={142 + i * 62} s={0.15} />
          <Tx x={540} y={147 + i * 62} t={`tenant-${String(i + 1).padStart(2, '0')}`} s={12} font={MONO} />
          <path d={`M420 286C450 286 450 ${142 + i * 62} 490 ${142 + i * 62}`} {...L} stroke={[C.teal, '#6FC2FF', C.red][i % 3]} strokeWidth="2.5" />
          <path d={`M650 ${142 + i * 62}C700 ${142 + i * 62} 700 286 730 286`} {...L} stroke={[C.teal, '#6FC2FF', C.red][i % 3]} strokeWidth="2.5" />
        </g>
      ))}
      <rect x="730" y="256" width="60" height="60" rx="10" fill={C.ink} stroke={C.white} />
      <Item k="drum" x={900} y={180} s={1.8} />
      {[0, 1, 2].map((i) => <Item key={i} k="drum" x={850 + i * 60} y={400} s={0.7} />)}
      <path d="M790 286C830 286 840 200 870 200M790 286C830 286 830 400 850 400M790 286C850 300 880 390 910 400M790 286C860 300 920 380 970 400" {...L} stroke={C.white} strokeWidth="2" />
    </Svg>
  )
}

// ---------------------------------------------------------------- big system diagrams
const Box = ({ x, y, w, h, fill, title, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={C.ink} strokeWidth="2" />
    {title && <Tx x={x + 16} y={y + 26} t={title} s={13} font={MONO} w={400} />}
    {children}
  </g>
)
const DPill = ({ x, y, t }) => (
  <g>
    <rect x={x - (t.length * 7 + 16) / 2} y={y - 11} width={t.length * 7 + 16} height="22" rx="11" fill={C.ink} />
    <Tx x={x} y={y + 4} t={t} s={10} font={MONO} f={C.white} a="middle" />
  </g>
)
export function ArchDiagram({ variant = 'persona' }) {
  const mid = variant === 'product' ? C.red : C.gold
  return (
    <Svg w={1238} h={700} bg={C.white}>
      {variant === 'product' && <rect x="440" y="20" width="360" height="40" rx="8" fill={C.ink} />}
      {variant === 'product' && <Tx x={620} y={46} t="SERVER" s={14} font={MONO} f={C.white} a="middle" />}
      <Box x={40} y={80} w={300} h={580} fill="#F7F6F3" title="CLIENTS" />
      {['ANALYST', 'DATA SCIENTIST', 'PYTHON APP', 'CLI'].map((t, i) => (
        <g key={t}>
          <rect x="64" y={120 + i * 132} width="252" height="110" rx="8" fill={C.aqua} stroke={C.ink} strokeWidth="2" />
          <Item k={i < 2 ? 'pip' : 'badge'} x={120} y={175 + i * 132} s={i < 2 ? 0.32 : 1.1} p={i < 2 ? { pose: 'hold' } : { text: i === 2 ? 'PY' : '>_', fill: C.white }} />
          {i < 2 && <Item k="laptop" x={140} y={195 + i * 132} s={0.45} />}
          <Tx x={190} y={180 + i * 132} t={t} s={12} font={MONO} />
        </g>
      ))}
      <Box x={460} y={80} w={320} h={580} fill={mid} title="CLOUD SERVICE" />
      {['DUAL EXECUTION', 'PER-USER COMPUTE', 'SHARED STORAGE', 'ACCESS CONTROL', 'CACHING'].map((t, i) => (
        <g key={t}>
          <rect x="484" y={120 + i * 104} width="272" height="84" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <Item k={['gear', 'server', 'drum', 'shield', 'bolt'][i]} x={524} y={162 + i * 104} s={0.45} p={i === 0 ? { fill: C.sky } : {}} />
          <Tx x={570} y={167 + i * 104} t={t} s={12} font={MONO} />
        </g>
      ))}
      <Box x={900} y={80} w={300} h={580} fill="#A5A0F5" title="YOUR DATA" />
      {['OBJECT STORAGE', 'DATABASES', 'LAKE FORMATS'].map((t, i) => (
        <g key={t}>
          <rect x="924" y={130 + i * 170} width="252" height="140" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <Item k={['cloud', 'drum', 'sheet'][i]} x={990} y={200 + i * 170} s={0.8} />
          <Tx x={1050} y={206 + i * 170} t={t} s={12} font={MONO} />
        </g>
      ))}
      {[200, 370, 540].map((y, i) => (
        <g key={y}>
          <path d={`M340 ${y}H460`} {...L} strokeDasharray="6 6" />
          <path d={`M780 ${y}H900`} {...L} strokeDasharray="6 6" />
          <DPill x={400} y={y} t={['SQL', 'ARROW', 'MCP'][i]} />
          <DPill x={840} y={y} t={['READ', 'ATTACH', 'SCAN'][i]} />
        </g>
      ))}
    </Svg>
  )
}
export function TierDiagram({ seed = 0, tier }) {
  const t = tier ?? seed % 3
  const h = [404, 332, 371][t]
  return (
    <Svg w={631} h={h} bg="#F7F6F3">
      <Tx x={24} y={36} t={['1.5-TIER', '2-TIER', '3-TIER'][t]} s={14} font={MONO} />
      <rect x="24" y="60" width="130" height="130" rx="8" fill={C.blue} stroke={C.ink} strokeWidth="2" />
      <Item k="pipJr" x={70} y={110} s={0.2} p={{}} />
      <Item k="laptop" x={100} y={140} s={0.5} />
      <Tx x={89} y={178} t="USER" s={10} font={MONO} a="middle" />
      <path d="M154 125h40" {...L} />
      {t === 0 && (
        <g>
          <Box x={194} y={60} w={400} h={h - 90} fill="#A5A0F5" title="BROWSER CLIENT" />
          <Box x={234} y={120} w={320} h={h - 190} fill={C.gold} title="EMBEDDED ENGINE (WASM)" />
          <Item k="drum" x={394} y={h / 2 + 60} s={0.8} />
        </g>
      )}
      {t === 1 && (
        <g>
          <Box x={194} y={60} w={160} h={130} fill="#A5A0F5" title="CLIENT" />
          <path d="M354 125h80" {...L} />
          <Box x={434} y={60} w={170} h={h - 90} fill={C.gold} title="CLOUD" />
          <Item k="drum" x={519} y={190} s={0.8} />
        </g>
      )}
      {t === 2 && (
        <g>
          <Box x={194} y={60} w={120} h={130} fill="#A5A0F5" title="CLIENT" />
          <path d="M314 125h30" {...L} />
          <Box x={344} y={60} w={110} h={130} fill={C.red} title="SERVER" />
          <Item k="server" x={399} y={140} s={0.6} />
          <path d="M454 125h30" {...L} />
          <Box x={484} y={60} w={120} h={h - 90} fill={C.gold} title="CLOUD" />
          <Item k="drum" x={544} y={200} s={0.7} />
        </g>
      )}
    </Svg>
  )
}
// Dives / Flights media frame: users -> plug -> product zone.
export function SystemDiagram({ variant = 'dives' }) {
  return (
    <Svg w={1028} h={544} bg={C.white}>
      {['CHAT APP', 'ANALYST', 'AGENT'].map((t, i) => (
        <g key={t}>
          <rect x="40" y={80 + i * 140} width="170" height="110" rx="10" fill={[C.white, C.aqua, C.sun][i]} stroke={C.ink} strokeWidth="2" />
          {i === 0 && <Item k="badge" x={125} y={125} s={1.2} p={{ text: '#', fill: C.blue }} />}
          {i === 1 && <><Item k="pip" x={100} y={250} s={0.3} p={{ pose: 'hold' }} /><Item k="laptop" x={140} y={270} s={0.5} /></>}
          {i === 2 && <Item k="cloud" x={125} y={400} s={0.7} />}
          <Tx x={125} y={178 + i * 140} t={t} s={11} font={MONO} a="middle" />
          <path d={`M210 ${135 + i * 140}C260 ${135 + i * 140} 260 272 300 272`} {...L} stroke={variant === 'flights' ? C.ink : C.red} strokeWidth="2.5" strokeDasharray={variant === 'flights' ? '6 6' : undefined} />
        </g>
      ))}
      <rect x="300" y="244" width="56" height="56" rx="10" fill={C.ink} />
      <path d="M318 256v-14M338 256v-14" stroke={C.ink} strokeWidth="5" />
      <DPill x={330} y={330} t="CONNECT" />
      <rect x="400" y="50" width="590" height="444" rx="16" fill={C.skyTint} stroke={C.ink} strokeWidth="2" />
      <path d="M356 272h90" {...L} stroke={C.red} strokeWidth="2.5" />
      <Item k="server" x={500} y={200} s={1.4} />
      <Item k="drum" x={500} y={370} s={1.2} />
      <DPill x={500} y={290} t="QUERY" />
      <path d="M540 200h80M540 370h80" {...L} stroke={C.red} strokeWidth="2.5" />
      {variant === 'dives' ? (
        <g>
          <Item k="win" x={780} y={270} s={3.4} p={{ content: 'bars', header: C.sun }} />
          <DPill x={780} y={460} t="RENDER" />
        </g>
      ) : (
        <g>
          <Item k="win" x={760} y={190} s={2.6} p={{ content: 'code', header: C.blue, dark: true }} />
          <Tx x={700} y={120} t="python runtime" s={11} font={MONO} />
          <Item k="drum" x={700} y={400} s={0.9} p={{ fill: C.sun }} />
          <Item k="drum" x={800} y={400} s={0.9} p={{ fill: C.aqua }} />
          <Item k="plane" x={900} y={110} s={0.8} r={-10} />
          <DPill x={760} y={330} t="SCHEDULE" />
        </g>
      )}
    </Svg>
  )
}
// DuckLake / Iceberg format comparison panels.
export function FormatDiagram({ variant = 'iceberg' }) {
  const dark = variant === 'iceberg'
  const ink = dark ? C.white : C.ink
  const S = { fill: 'none', stroke: ink, strokeWidth: 2 }
  const fileBox = (x, y, tabs) => (
    <g key={x}>
      <path d={`M${x} ${y}h120v90H${x}z`} {...S} fill={dark ? '#4A4A4A' : C.white} />
      <path d={`M${x} ${y}l14-18h92l14 18`} {...S} />
      {tabs.map((f, i) => <rect key={i} x={x + 14 + i * 32} y={y + 18} width="24" height="56" fill={f} stroke={C.ink} />)}
      <Tx x={x + 60} y={y + 112} t="DATA FILES" s={10} font={MONO} a="middle" f={ink} />
    </g>
  )
  return (
    <Svg w={613} h={676} bg={dark ? C.ink : C.white}>
      <Tx x={306} y={50} t={dark ? 'FORMAT A' : 'FORMAT B'} s={18} font={MONO} a="middle" f={ink} />
      {dark ? (
        <g>
          <Item k="drum" x={306} y={130} s={1} p={{ fill: '#4A4A4A' }} />
          {[[306, 230, 'METADATA']].concat([[180, 330, 'MANIFEST LIST'], [432, 330, 'MANIFEST LIST']]).map(([x, y, t]) => (
            <g key={`${x}${y}`}>
              <rect x={x - 70} y={y - 24} width="140" height="48" rx="6" {...S} />
              <Tx x={x} y={y + 4} t={t} s={10} font={MONO} a="middle" f={ink} />
            </g>
          ))}
          {[[110, 430], [250, 430], [362, 430], [502, 430]].map(([x, y]) => (
            <g key={x}>
              <rect x={x - 50} y={y - 20} width="100" height="40" rx="6" {...S} />
              <Tx x={x} y={y + 4} t="MANIFEST" s={9} font={MONO} a="middle" f={ink} />
            </g>
          ))}
          <path d="M306 166v40M306 254 180 306M306 254l126 52M180 354 110 410M180 354l70 56M432 354l-70 56M432 354l70 56M110 450 100 520M250 450l56 70M362 450l-56 70M502 450l10 70" {...S} />
          {fileBox(40, 530, [C.line, C.line, C.line])}{fileBox(246, 530, [C.line, C.line, C.line])}{fileBox(452, 530, [C.line, C.line, C.line])}
        </g>
      ) : (
        <g>
          <Item k="cloud" x={120} y={110} s={0.8} /><Item k="cloud" x={500} y={100} s={0.7} />
          <Item k="drum" x={306} y={170} s={1.8} p={{ fill: C.white }} />
          <Item k="pip" x={290} y={110} s={0.3} p={{}} /><Item k="pipJr" x={330} y={120} s={0.2} p={{}} />
          <path d="M260 230C200 330 100 380 100 520" {...S} stroke={C.teal} strokeWidth="3" />
          <path d="M306 236V520" {...S} stroke="#2F6FDE" strokeWidth="3" />
          <path d="M352 230C412 330 512 380 512 520" {...S} stroke={C.red} strokeWidth="3" />
          {fileBox(40, 530, [C.aqua, C.sun, C.blue])}{fileBox(246, 530, [C.red, C.aqua, C.sun])}{fileBox(452, 530, [C.blue, C.red, C.aqua])}
        </g>
      )}
    </Svg>
  )
}

// ---------------------------------------------------------------- charts
export function BenchmarkChart() {
  const rows = Array.from({ length: 14 }, (_, i) => ({ own: i % 2 === 0, v: i % 2 === 0 ? 0.12 + (i % 5) * 0.03 : 0.45 + ((i * 37) % 50) / 100 }))
  return (
    <Svg w={1003} h={243} bg={C.white}>
      {rows.map((r, i) => (
        <g key={i}>
          <Tx x={170} y={18 + i * 16} t={`${r.own ? 'Ours' : 'Warehouse F'} · ${['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'][i >> 1]}`} s={10} a="end" f={r.own ? '#6B7A2A' : '#2F6FDE'} />
          <rect x="180" y={8 + i * 16} width={r.v * 720} height="12" fill="#F5D9A8" />
          <rect x="180" y={8 + i * 16} width="6" height="12" fill="#D9A24E" />
          <Tx x={190 + r.v * 720} y={18 + i * 16} t={`${(r.v * 10).toFixed(1)}×`} s={10} />
        </g>
      ))}
    </Svg>
  )
}
export function GuidesChart() {
  const groups = [['EASY', 82, 61, '+21 pts'], ['HARD', 64, 28, '+36 pts'], ['OVERALL', 74, 46, '+28 pts']]
  return (
    <Svg w={1186} h={470} bg={C.skyTint}>
      <path d="M80 380h1040" {...L} />
      {groups.map(([g, a, b, d], i) => {
        const x = 160 + i * 340
        return (
          <g key={g}>
            <rect x={x} y={380 - a * 3.2} width="90" height={a * 3.2} fill={C.sun} stroke={C.ink} strokeWidth="2" />
            <rect x={x + 100} y={380 - b * 3.2} width="90" height={b * 3.2} fill={C.red} stroke={C.ink} strokeWidth="2" />
            <Tx x={x + 45} y={370 - a * 3.2} t={`${a}%`} s={16} font={MONO} a="middle" />
            <Tx x={x + 145} y={370 - b * 3.2} t={`${b}%`} s={16} font={MONO} a="middle" />
            <Tx x={x + 95} y={410} t={g} s={14} font={MONO} a="middle" />
            {i === 1 && <rect x={x + 40} y={422} width="110" height="28" rx="4" fill={C.sun} />}
            <Tx x={x + 95} y={442} t={d} s={14} font={MONO} a="middle" />
          </g>
        )
      })}
      <rect x="880" y="30" width="16" height="16" fill={C.sun} stroke={C.ink} /><Tx x={904} y={44} t="WITH GUIDES" s={12} font={MONO} />
      <rect x="880" y="56" width="16" height="16" fill={C.red} stroke={C.ink} /><Tx x={904} y={70} t="WITHOUT" s={12} font={MONO} />
    </Svg>
  )
}
export function ArticleChart({ seed = 0 }) {
  const hist = seed % 2 === 1
  return (
    <Svg w={816} h={260} bg={C.cream}>
      <Tx x={40} y={34} t={hist ? 'Query latency distribution (log scale)' : 'Monthly active projects'} s={14} w={600} />
      <path d="M60 220h720M60 50v170" {...L} stroke="#9CA3AF" strokeWidth="1" />
      {hist ? (
        <g>
          <path d={`M60 220${series(24, seed, 0.05, 0.9).map((v, i) => `V${220 - v * 150}h30`).join('')}V220`} fill="#1F77B4" fillOpacity=".35" stroke="#1F77B4" strokeWidth="1.5" />
          <path d={`M60 220${series(24, seed + 5, 0.05, 0.7).map((v, i) => `V${220 - v * 140}h30`).join('')}V220`} fill="#E8892F" fillOpacity=".35" stroke="#E8892F" strokeWidth="1.5" />
          <rect x="620" y="24" width="12" height="12" fill="#1F77B4" /><Tx x={638} y={34} t="before" s={11} />
          <rect x="700" y="24" width="12" height="12" fill="#E8892F" /><Tx x={718} y={34} t="after" s={11} />
        </g>
      ) : (
        <g>
          {(() => {
            const v = Array.from({ length: 12 }, (_, i) => Math.pow(i / 11, 2.2) * 0.9 + 0.04)
            return (
              <g>
                <path d={linePath(v, 60, 50, 720, 170)} fill="none" stroke="#1F77B4" strokeWidth="2.5" />
                {v.map((p, i) => (i % 3 === 2 || i === 11) && (
                  <g key={i}>
                    <circle cx={60 + (i * 720) / 11} cy={220 - p * 170} r="4" fill="#1F77B4" />
                    <Tx x={60 + (i * 720) / 11 - 8} y={210 - p * 170} t={`${Math.round(p * 1200)}`} s={10} a="end" />
                  </g>
                ))}
              </g>
            )
          })()}
          {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m, i) => <Tx key={m} x={60 + i * 131} y={238} t={m} s={10} o=".6" />)}
        </g>
      )}
    </Svg>
  )
}
// Neutral embedded-app frame for iframe slots.
export function EmbedFrame({ seed = 0 }) {
  return (
    <Svg w={816} h={600} bg="#F6F7F9">
      <rect width="816" height="44" fill={C.white} stroke={C.line} />
      <Dots x={20} y={22} />
      <rect x="80" y="12" width="420" height="20" rx="10" fill="#EEF0F2" />
      <rect x="24" y="64" width="768" height="512" rx="8" fill={C.white} stroke={C.line} />
      {[0, 1, 2].map((i) => <rect key={i} x={44 + i * 248} y="84" width="232" height="80" rx="6" fill="#F6F7F9" stroke={C.line} />)}
      <path d={linePath(series(18, seed), 60, 200, 700, 300)} fill="none" stroke="#2F6FDE" strokeWidth="3" />
      <Tx x={408} y={560} t="Interactive content loads here" s={12} o=".5" a="middle" />
    </Svg>
  )
}
// Chat-app workspace header banner (About "Join the community").
export function CommunityBanner() {
  return (
    <Svg w={886} h={175} bg="#4A2C48">
      <rect width="120" height="175" fill="#3F2240" />
      {[0, 1, 2].map((i) => <rect key={i} x="36" y={30 + i * 48} width="48" height="36" rx="8" fill={i ? '#5B3A59' : C.white} />)}
      <Item k="dot" x={60} y={48} s={0.9} p={{ fill: C.sun, r: 8 }} />
      <rect x="150" y="38" width="64" height="64" rx="14" fill={C.white} />
      <Item k="ring" x={182} y={70} s={0.45} />
      <Tx x={236} y={70} t="data-builders" s={28} w={700} f={C.white} font={DISPLAY} />
      <rect x="236" y="96" width="300" height="22" rx="11" fill="#7A5C78" />
      <path d="M540 122l0 30 8-8 6 14 6-3-6-13h11z" fill={C.white} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
    </Svg>
  )
}
// LP guide previews: Postgres terminal / cheatsheet sheet.
export function GuidePreview({ variant = 'pg' }) {
  if (variant === 'pg')
    return (
      <Svg w={480} h={640} bg={C.cream}>
        <rect x="30" y="60" width="420" height="520" rx="12" fill="#1E1E1E" stroke={C.ink} strokeWidth="2" />
        <Dots x={56} y={86} />
        {['SELECT customer_id,', '       count(*) AS orders,', '       sum(total) AS spend', 'FROM pg.public.orders', 'WHERE created_at > now() - INTERVAL 90 DAY', 'GROUP BY 1', 'ORDER BY spend DESC;'].map((l, i) => (
          <Tx key={i} x={56} y={130 + i * 22} t={l} s={12} font={MONO} f={i === 3 ? C.aqua : '#E5E7EB'} />
        ))}
        <Tx x={56} y={330} t="row store" s={11} font={MONO} f="#9CA3AF" />
        <rect x="56" y="338" width="360" height="22" fill="#FF5A4E" />
        <Tx x={56} y={392} t="columnar" s={11} font={MONO} f="#9CA3AF" />
        <rect x="56" y="400" width="48" height="22" fill={C.aqua} />
        <Tx x={56} y={530} t="40× faster" s={46} w={700} f={C.sun} font={DISPLAY} />
      </Svg>
    )
  return (
    <Svg w={480} h={640} bg={C.cream}>
      <rect x="44" y="96" width="420" height="320" fill={C.ink} />
      <rect x="30" y="82" width="420" height="320" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <Tx x={48} y={110} t="SQL CHEATSHEET" s={14} w={700} font={DISPLAY} />
      {[0, 1].map((c) => [0, 1, 2, 3].map((r) => (
        <g key={`${c}${r}`}>
          <rect x={48 + c * 200} y={124 + r * 68} width="80" height="12" fill="#FFF3A8" />
          <Tx x={52 + c * 200} y={134 + r * 68} t={['IMPORT', 'JOINS', 'WINDOW', 'EXPORT', 'PIVOT', 'STRINGS', 'DATES', 'JSON'][c * 4 + r]} s={8} font={MONO} />
          {[0, 1, 2].map((k) => <Tx key={k} x={48 + c * 200} y={150 + r * 68 + k * 12} t={['SELECT * FROM read_csv(…)', 'COPY t TO \'out.parquet\'', 'SUMMARIZE tbl;', 'FROM t LIMIT 10;'][(c + r + k) % 4]} s={7.5} font={MONO} o=".8" />)}
        </g>
      )))}
    </Svg>
  )
}
