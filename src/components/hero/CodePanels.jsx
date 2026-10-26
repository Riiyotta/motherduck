// Hero SQL / PYTHON / CLI tab contents. Generic sample code (original wording).
// Measured live (Pixel-audit): the original's SQL tab is the light NOTEBOOK card and its PYTHON
// tab is the dark #383838 code block -- CLONE_SPEC §3 had these two swapped.
// Colours without a shared token are scoped here.
const C = {
  string: '#53DBC9',
  nbBorder: '#CDD9F8',
  chipBg: '#F0F4FD',
  chipBorder: '#AFC0F2',
  tokA: '#494AB9',
  tokB: '#05635A',
  tableBg: '#FCFCFD',
  cell: '#E8E8E8',
  cliDim: '#9A9AA5',
  cliBox: '#6E6E7A',
}

// ---------- SQL tab: notebook card (bg #FCFCFB panel) ----------
// Card: white, 1px #CDD9F8, r 3. Toolbar 32 (padding 0 6 0 10), code area padding 4 0 12 with a
// gutter (padding 0 14 0 16, right-aligned), output row 32 (pl 12, 1px rgba(0,0,0,.1) top), result
// table (1px #E8E8E8 top): header 28, 9 body rows of 24, columns 36 / 200 / 130 / rest.
const NB_LINES = [
  [['a', 'SELECT'], ['p', ' region, '], ['a', 'ROUND'], ['p', '('], ['a', 'SUM'], ['p', '(amount)) '], ['a', 'AS'], ['p', ' revenue']],
  [['a', 'FROM'], ['p', ' sales.orders']],
  [['a', 'WHERE'], ['p', ' order_date >= '], ['b', "'2025-07-01'"]],
  [['a', '  AND'], ['p', ' status = '], ['b', "'complete'"]],
  [['a', 'GROUP BY'], ['p', ' 1']],
  [['a', 'ORDER BY'], ['p', ' revenue '], ['a', 'DESC'], ['p', ';']],
]
const NB_ROWS = [
  ['west', '4210.0'],
  ['north', '3388.0'],
  ['south', '2951.0'],
  ['central', '2604.0'],
  ['northeast', '2287.0'],
  ['southwest', '1930.0'],
  ['mountain', '1544.0'],
  ['pacific', '1311.0'],
  ['east', '1027.0'],
]
const cellLine = { borderRight: `1px solid ${C.cell}`, borderBottom: `1px solid ${C.cell}` }

const TypeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-gray-500">
    <rect x="2.5" y="3.5" width="11" height="9" rx="1" stroke="currentColor" />
    <path d="M2.5 7h11" stroke="currentColor" />
  </svg>
)

export function SqlPanel() {
  return (
    <div className="overflow-hidden rounded-[3px] bg-white" style={{ border: `1px solid ${C.nbBorder}` }}>
      <div className="flex h-[32px] items-center justify-between pl-[10px] pr-[6px]">
        <span
          className="flex h-[20px] items-center rounded-[3px]"
          style={{ background: C.chipBg, border: `1px solid ${C.chipBorder}` }}
        >
          <span className="flex h-[18px] w-[20px] items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <ellipse cx="6" cy="3" rx="4" ry="1.6" stroke={C.tokA} />
              <path d="M2 3v6c0 .9 1.8 1.6 4 1.6s4-.7 4-1.6V3" stroke={C.tokA} />
            </svg>
          </span>
          <span className="flex h-[18px] w-[16px] items-center justify-center" style={{ borderLeft: `1px solid ${C.chipBorder}` }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1.5 3 4 5.5 6.5 3" stroke={C.tokA} />
            </svg>
          </span>
        </span>
        <span className="flex items-center gap-[4px] px-[4px] py-[2px]">
          <TypeIcon />
          <span className="font-sans text-[12px] font-light leading-[19.2px] tracking-[0.24px] text-ink">sales</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-gray-500">
            <path d="M5 6.5 8 9.5l3-3" stroke="currentColor" />
          </svg>
        </span>
      </div>
      <div className="flex items-start pb-[12px] pt-[4px]">
        <div aria-hidden="true" className="flex flex-col items-end pl-[16px] pr-[14px] font-mono text-[12px] leading-[16.8px] text-gray-600">
          {NB_LINES.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre className="m-0 min-w-0 flex-1 overflow-hidden font-mono text-[12px] leading-[16.8px] text-ink">
          {NB_LINES.map((line, i) => (
            <div key={i}>
              {line.map(([r, t], j) => (
                <span key={j} style={r === 'a' ? { color: C.tokA } : r === 'b' ? { color: C.tokB } : undefined}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
      <div
        className="flex h-[32px] items-center gap-[4px] pl-[12px] font-sans text-[12px] font-light leading-[19.2px] tracking-[0.24px] text-gray-600"
        style={{ borderTop: '1px solid rgba(0,0,0,.1)' }}
      >
        9 rows returned in 0.8s
      </div>
      <div className="flex flex-col" style={{ borderTop: `1px solid ${C.cell}`, background: C.tableBg }}>
        <div className="flex h-[28px] font-sans text-[12px] font-light leading-[19.2px] tracking-[0.24px] text-ink">
          <div className="w-[36px] shrink-0" style={{ borderRight: `1px solid ${C.cell}` }} />
          {['region', 'revenue'].map((h, i) => (
            <div key={h} className={`flex shrink-0 items-center gap-[8px] px-[8px] ${i === 0 ? 'w-[200px]' : 'w-[130px]'}`} style={{ borderRight: `1px solid ${C.cell}` }}>
              <TypeIcon />
              <p className="m-0">{h}</p>
            </div>
          ))}
          <div className="flex-1" />
        </div>
        {NB_ROWS.map(([r, v], i) => (
          <div key={r} className="flex h-[24px] font-sans text-[12px] font-light leading-[19.2px] tracking-[0.24px] text-ink">
            <div className="flex w-[36px] shrink-0 items-center justify-end px-[8px] text-gray-600" style={cellLine}>
              <p className="m-0">{i + 1}</p>
            </div>
            <div className="flex w-[200px] shrink-0 items-center bg-white px-[8px]" style={cellLine}>
              <p className="m-0">{r}</p>
            </div>
            <div className="flex w-[130px] shrink-0 items-center bg-white px-[8px] font-code leading-[24px]" style={cellLine}>
              {v}
            </div>
            <div className="flex-1" style={{ borderBottom: `1px solid ${C.cell}` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------- PYTHON tab: dark code block (bg ink panel; font-code (ui-monospace stack) 12/19.2, 19 lines) ----------
// roles: c comment/output (gray-400), k keyword (sky), f function/number (yellow-chip), s string (#53DBC9), p plain
const PY_LINES = [
  [['c', '# warehouse Python client, reads the shared analytics db']],
  [],
  [['k', 'import'], ['p', ' warehouse']],
  [],
  [['p', 'con = warehouse.'], ['f', 'connect'], ['p', '('], ['s', '"wh:analytics"'], ['p', ')']],
  [['p', 'df = con.'], ['f', 'sql'], ['p', '('], ['s', '"""']],
  [['s', '  SELECT region, ROUND(SUM(amount)) AS revenue']],
  [['s', '  FROM sales.orders']],
  [['s', "  WHERE order_date >= '2025-07-01'"]],
  [['s', '  GROUP BY 1 ORDER BY revenue DESC']],
  [['s', '"""'], ['p', ').'], ['f', 'df'], ['p', '()']],
  [],
  [['f', 'print'], ['p', '(df.'], ['f', 'head'], ['p', '('], ['f', '4'], ['p', '))']],
  [['c', '      region  revenue']],
  [['c', '0       west   4210.0']],
  [['c', '1      north   3388.0']],
  [['c', '2      south   2951.0']],
  [['c', '3    central   2604.0']],
  [['c', '# 9 rows in 0.8s']],
]
const PY_COLOR = { c: 'text-gray-400', k: 'text-sky', f: 'text-yellow-chip', p: 'text-surface-2' }

export function PythonPanel() {
  return (
    <pre className="m-0 whitespace-pre-wrap font-code text-[12px] leading-[19.2px] text-surface-2">
      {PY_LINES.map((line, i) => (
        <div key={i}>
          {line.length === 0 ? ' ' : null}
          {line.map(([r, t], j) => (
            <span key={j} className={PY_COLOR[r]} style={r === 's' ? { color: C.string } : undefined}>
              {t}
            </span>
          ))}
        </div>
      ))}
    </pre>
  )
}

// ---------- CLI tab (bg #1E1E24 terminal, Mono 12/19) ----------
// Measured stack: prompt row (gap 7.5) / dim line / 17 spacer / yellow-prompt query (4 lines) /
// 17 spacer / 370x212 result box (2-row header 39 incl. 1px rule, 9 rows of 19; cells padding 0 8,
// 240 + 128 columns, 1px #6E6E7A rules) / dim timing line / 17 spacer / final prompt row 25.6.
const CLI_ROWS = [
  ['west', '4210.0'],
  ['north', '3388.0'],
  ['south', '2951.0'],
  ['central', '2604.0'],
  ['northeast', '2287.0'],
  ['southwest', '1930.0'],
  ['mountain', '1544.0'],
  ['pacific', '1311.0'],
  ['east', '1027.0'],
]
const rule = `1px solid ${C.cliBox}`

export function CliPanel() {
  const dim = { color: C.cliDim }
  const Spacer = () => <div className="h-[17px]" aria-hidden="true" />
  return (
    <div className="flex flex-col font-mono text-[12px] leading-[19px] text-surface-2">
      <div className="flex items-center gap-[7.5px]">
        <span style={dim}>$</span>
        <span>wh &apos;wh:analytics&apos;</span>
      </div>
      <span style={dim}>Connected to analytics (region east-1). Type .help for usage hints.</span>
      <Spacer />
      <div className="flex items-center gap-[7.5px]">
        <span className="text-sun">›</span>
        <span>SELECT region, ROUND(SUM(amount)) AS revenue</span>
      </div>
      <span>FROM sales.orders</span>
      <span>WHERE order_date &gt;= &apos;2025-07-01&apos; AND status = 1</span>
      <span>GROUP BY 1 ORDER BY revenue DESC;</span>
      <Spacer />
      <div>
        <div className="flex w-[370px] flex-col" style={{ border: rule }}>
          <div className="flex flex-col" style={{ borderBottom: rule }}>
            {[
              ['region', 'revenue'],
              ['varchar', 'double'],
            ].map(([a, b]) => (
              <div key={a} className="flex h-[19px]">
                <div className="flex w-[240px] justify-center px-[8px]" style={{ borderRight: rule }}>
                  <span>{a}</span>
                </div>
                <div className="flex w-[128px] justify-center px-[8px]">
                  <span>{b}</span>
                </div>
              </div>
            ))}
          </div>
          {CLI_ROWS.map(([a, b]) => (
            <div key={a} className="flex h-[19px]">
              <div className="flex w-[240px] justify-start px-[8px]" style={{ borderRight: rule }}>
                {a}
              </div>
              <div className="flex w-[128px] justify-end px-[8px]">{b}</div>
            </div>
          ))}
        </div>
      </div>
      <span style={dim}>Run time (s): 0.8 · 9 rows scanned from 1 table</span>
      <Spacer />
      <div className="flex h-[25.6px] items-center gap-[7.5px]">
        <span className="text-sun">›</span>
        {/* Caret (original t6): 7x15 block, r 1, prompt colour, blink 1s step-end infinite */}
        <span aria-hidden="true" className="block h-[15px] w-[7px] shrink-0 animate-blink rounded-[1px] bg-sun" />
      </div>
    </div>
  )
}
