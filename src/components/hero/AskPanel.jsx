// Hero ASK (MCP) tab content (spec §3 "ASK (MCP) tab content") + typing sim (§11 #17).
// Measured on the original (bundle + rAF probes): stage 0 shows only the bubble. Once the product
// sim is >=30% in view (IO threshold .3, triggerOnce) it plays: +450ms step-1, +550ms step-2 whose
// text types at 16ms/char (setInterval), then the tool card with the SQL at 2 chars / 12ms, then the
// answer at 18ms/char. Each stream advances the next stage on completion. Plays once per
// activation (panel remounts per tab). Reduced motion -> final stage (5) immediately.
// data-sim-stream holds the effective chars/second.
import { useEffect, useState } from 'react'
import { Streamed } from '../../lib/sim.js'

const SQL = `SELECT region,
       count(*)        AS orders,
       sum(amount)     AS revenue
FROM sales.orders
GROUP BY region ORDER BY revenue DESC;`

// Generic geometric mark for the "assistant/tool" step icon (not a brand mark)
function MarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-ink">
      <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 12.5v-7l7 7v-7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
// Orange asterisk glyph (generic)
function AsteriskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-orange">
      <path d="M9 2v14M3 5.5l12 7M3 12.5l12-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const stepText = 'font-sans text-[12px] leading-[19.2px] font-light tracking-[0.24px]'

// Measured row: padding-left 2, 18px icon slot, gap 12, text column (x offset 32 from the row).
function Step({ icon, children, stage, className = '' }) {
  return (
    <div data-sim-stage={stage} className={`flex items-center gap-[12px] pl-[2px] ${className}`}>
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">{icon}</span>
      <p className={`m-0 min-w-0 flex-1 ${stepText}`}>{children}</p>
    </div>
  )
}
// 22x12 rail (padding 2 0) with a 1x8 hairline at x 10.5 between steps
const Rail = () => (
  <div aria-hidden="true" className="flex w-[22px] py-[2px]">
    <span className="ml-[10.5px] h-[8px] w-px bg-hairline" />
  </div>
)

function IconButton({ label, children, className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-[28px] w-[28px] items-center justify-center rounded-md p-0 ${className || 'bg-transparent text-ink'}`}
    >
      {children}
    </button>
  )
}

const STEP2 = 'I will total order revenue by region from the sales schema tables.'
const ANSWER =
  'The west region led with the highest revenue this quarter, followed by north and south, with east well behind them.'
const LAST = 5

export default function AskPanel({ animate = true, inView = true }) {
  const [stage, setStage] = useState(() => (animate ? 0 : LAST))
  const [played, setPlayed] = useState(false)
  const advance = (n) => setStage((s) => (s < n ? n : s))
  useEffect(() => {
    if (!animate) setStage(LAST)
  }, [animate])
  useEffect(() => {
    if (animate && inView) setPlayed(true)
  }, [animate, inView])
  useEffect(() => {
    if (!played) return undefined
    const ms = stage === 0 ? 450 : stage === 1 ? 550 : undefined
    if (ms === undefined) return undefined
    const t = setTimeout(() => advance(stage + 1), ms)
    return () => clearTimeout(t)
  }, [stage, played])
  const sp = { stage, advance }

  return (
    <div className="flex flex-1 flex-col gap-[12px]">
      <div className="flex">
        <div
          data-sim-stage="bubble"
          className="ml-auto max-w-[400px] rounded-[16px_16px_2px_16px] bg-surface-3 px-[16px] py-[8px]"
        >
          <p className="m-0 font-sans text-[14px] font-light leading-[20px] tracking-[0.28px] text-ink">
            Which region led on revenue over the last quarter?
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {stage >= 1 && <div className="flex flex-col">
          <Step stage="step-1" icon={<MarkIcon />}>
            <span className="text-gray-600">Listing tables</span>
          </Step>
          <Rail />
        </div>}
        {stage >= 2 && <div className="flex flex-col">
          <Step stage="step-2" icon={<AsteriskIcon />}>
            <span data-sim-stream="62.5" className="text-ink">
              <Streamed {...sp} at={2} text={STEP2} speedMs={16} />
            </span>
          </Step>
          <Rail />
        </div>}

        {/* Tool card: bg #fff, r 8, padding 4 8 8 2, gap 4; header row (pl 2, gap 12) + request row
            (pl 32). Rail: absolute left 0 / top 29, 22 wide, 1x156 hairline centred. */}
        {stage >= 3 && <div data-sim-stage="tool" className="relative flex flex-col">
          <div className="flex flex-col gap-[4px] rounded-md bg-white pb-[8px] pl-[2px] pr-[8px] pt-[4px]">
            <Step icon={<MarkIcon />}>
              <span className="text-gray-600">Warehouse query</span>
            </Step>
            <div className="flex gap-[12px] pl-[32px]">
              <div className="min-w-0 flex-1 rounded-md bg-white p-[8px]" style={{ border: '0.5px solid #D7D7D7' /* hairline */ }}>
                <div className="flex flex-col gap-[8px] rounded-[6px] bg-surface-2 px-[12px] py-[8px]">
                  <p className="m-0 font-sans text-[10px] leading-[16px] tracking-[0.2px] text-ink">Request</p>
                  <pre data-sim-stream="166.7" className="m-0 overflow-hidden whitespace-pre-wrap break-words font-code text-[12px] leading-[15.6px] text-garden">
                    <Streamed {...sp} at={3} text={SQL} speedMs={12} charsPerTick={2} />
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute left-0 top-[29px] flex w-[22px] justify-center">
            <span className="h-[156px] w-px bg-hairline" />
          </div>
        </div>}
      </div>

      {stage >= 4 && <div data-sim-stage="answer" className="flex items-start gap-[12px] pl-[2px]">
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <AsteriskIcon />
        </span>
        <p data-sim-stream="55.6" className="m-0 min-w-0 flex-1 font-sans text-[14px] font-light leading-[20px] tracking-[0.28px] text-ink">
          <Streamed {...sp} at={4} text={ANSWER} speedMs={18} />
        </p>
      </div>}

      {/* Chat input card */}
      <div
        className="relative mt-auto flex flex-col gap-[12px] rounded-bubble bg-white p-[12px] shadow-chat-input transition-[border-color] duration-120 ease-in-out [border:0.5px_solid_theme(colors.hairline)] focus-within:border-gray-400"
      >
        <label className="sr-only" htmlFor="hero-ask-input">
          Ask a follow-up about your data
        </label>
        <textarea
          id="hero-ask-input"
          rows={1}
          placeholder="Ask a follow-up about your data…"
          className="block h-[23.2px] resize-none border-0 bg-transparent p-0 pl-[6px] pt-[4px] font-sans text-[12px] leading-[19.2px] text-ink outline-none placeholder:text-gray-600"
        />
        <span aria-hidden="true" className="absolute right-[10px] top-[10px] h-[8px] w-[8px] rounded-full bg-garden" />
        <div className="flex items-center justify-between">
          <IconButton label="Add attachment">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </IconButton>
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              className="flex h-[28px] items-center gap-[6px] rounded-md bg-transparent px-[12px] font-sans text-[12px] font-light leading-[19.2px] tracking-[0.24px] text-ink"
            >
              Model 4 Large
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="opacity-75">
                <path d="M2.5 4 5.5 7 8.5 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <IconButton label="Settings">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </IconButton>
            <IconButton label="Send message" className="bg-clay text-white hover:bg-clay-hover">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}
