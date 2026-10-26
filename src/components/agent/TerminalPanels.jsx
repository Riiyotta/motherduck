import { useState } from 'react'
import { PixelMark } from './icons.jsx'
import { Streamed, StreamedSegments, useSimStage } from '../../lib/sim.js'

// Spec §8 panels + typing sim (§11 #21). Stage machine read from the original bundle: stage -1 idle
// until the terminal wrapper is >=30% visible (IO threshold .3, triggerOnce), then each stage either
// types its text with a setInterval typewriter (user prompts 26ms/char, assistant text 18ms/char in
// Claude Code, 16ms in Cursor, 14ms in ChatGPT) and advances on completion, or waits a fixed timer.
// Plays once; the panel remounts on tab switch so the selected client replays. Reduced motion ->
// final stage. Rows are only rendered once reached, so below 1302 the panel grows as rows appear
// (Claude: 185 -> 483 @728-1301, 222 -> 646 @390); >=1302 the panel is fixed at 483.
// Placeholder transcripts are mapped onto the original's stage cadence.
const CLAUDE_TIMERS = { 2: 320, 4: 240, 5: 240, 6: 280, 7: 420 } // original dD
const CURSOR_TIMERS = { 1: 300, 2: 380, 4: 300, 5: 260, 6: 260, 7: 340, 8: 380, 10: 260 } // original ds
const CHAT_TIMERS = { 2: 320, 4: 300, 5: 240, 6: 240, 7: 240, 8: 340, 10: 320 } // original sW

// ---------- Claude Code panel (term tokens) ----------
const Gutter = ({ children, className = '' }) => (
  <span className={`w-[26px] shrink-0 ${className}`} aria-hidden="true">{children}</span>
)

function Row({ glyph, glyphClass = 'text-term-text', user = false, children }) {
  return (
    <div data-sim-row className={`flex px-[16px] ${user ? 'bg-term-line py-[2px]' : ''}`}>
      <Gutter className={glyphClass}>{glyph}</Gutter>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

const Tok = ({ children }) => <span className="text-term-token">{children}</span>
const Dim = ({ children }) => <span className="text-term-dim">{children}</span>

const C_PROMPT_1 = 'compare weekly order counts across regions'
const C_TEXT_1 = 'Checking the sample warehouse via the tool API.'
const C_TEXT_2 = 'Found it: the change is limited to one region:'
const C_PROMPT_2 = 'chart the north region drop'

export function ClaudePanel({ animate = false, inView = true }) {
  const { stage, advance } = useSimStage({ animate, inView, last: 10, timers: CLAUDE_TIMERS })
  const sp = { stage, advance }
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  return (
    <div className="flex h-full flex-col bg-term-bg pb-[14px] pt-[18px]">
      <div className="flex items-start gap-[14px] px-[16px] font-jet text-[13px] leading-[21px] text-term-dim">
        <PixelMark />
        <div>
          <p><strong className="text-term-text">Claude Code </strong>v1.0.0</p>
          <p>default model · standard effort · team plan</p>
          <p>~/workspace</p>
        </div>
      </div>

      {/* Row geometry measured on the original's final state: 9 rows, gap 10, 298 tall at >=728 (424 @390);
          then a >=10px flexible spacer, the 42.6px input row (38 <728) and the 23px hint row. */}
      <div data-sim="claude" className="mt-[10px] flex flex-col gap-[10px] font-code text-[13px] leading-[21px] text-term-text">
        {stage >= 0 && (
          <Row glyph="❯" glyphClass="text-term-prompt" user>
            <Streamed {...sp} at={0} text={C_PROMPT_1} speedMs={26} />
          </Row>
        )}
        {stage >= 1 && (
          <Row glyph="●">
            <Streamed {...sp} at={1} text={C_TEXT_1} speedMs={18} />
          </Row>
        )}
        {stage >= 2 && (
          <Row glyph="">
            <Dim>⎿ listed 4 tables (0.2s)</Dim>
          </Row>
        )}
        {stage >= 3 && (
          <Row glyph="●">
            <Streamed {...sp} at={3} text={C_TEXT_2} speedMs={18} />
          </Row>
        )}
        {stage >= 4 && (
          <div data-sim-row>
            <div className="flex px-[16px]">
              <Gutter />
              <div className="min-w-0 flex-1 whitespace-pre-wrap">  <Tok>north</Tok>   1,204 → 987 weekly orders   <strong>−18%</strong></div>
            </div>
            {stage >= 5 && (
              <div className="flex px-[16px]">
                <Gutter />
                <div className="min-w-0 flex-1 whitespace-pre-wrap">  <Tok>others</Tok>  steady within ±2% week over week</div>
              </div>
            )}
          </div>
        )}
        {stage >= 6 && (
          <Row glyph="">
            <Dim>⎿ ran on isolated worker w-3a1 (sandboxed)</Dim>
          </Row>
        )}
        {stage >= 7 && (
          <Row glyph="✻" glyphClass="text-term-hot">
            Worked for 18s
          </Row>
        )}
        {stage >= 8 && (
          <Row glyph="❯" glyphClass="text-term-prompt" user>
            <Streamed {...sp} at={8} text={C_PROMPT_2} speedMs={26} />
          </Row>
        )}
        {stage >= 9 && (
          <Row glyph="✻" glyphClass="text-term-hot">
            Drafting a chart… <Dim>(esc to stop)</Dim>
          </Row>
        )}
      </div>

      <div aria-hidden="true" className="min-h-[10px] flex-1" />
      <label className="flex items-center border-t border-term-rule px-[16px] pb-[6px] pt-[10px] font-code transition-[border-color] duration-120 ease-in-out focus-within:border-term-dim">
        <Gutter className="text-[14px] leading-[19.6px] text-term-text md:text-[16px] md:leading-[25.6px]">❯</Gutter>
        {/* Original: caret hidden while the input is focused or has text */}
        {!focused && !value && (
          <span className="h-[15px] w-[7px] shrink-0 animate-blink rounded-[1px] bg-term-caret" aria-hidden="true" />
        )}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Terminal prompt"
          spellCheck="false"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent font-code text-[13px] leading-[21px] text-term-text caret-transparent outline-none"
        />
      </label>
      <div className="flex px-[16px] pt-[2px] font-code text-[13px] leading-[21px] text-term-dim">
        <Gutter />
        <span>
          <strong className="text-term-amber">▶▶ auto-accept on </strong>(tab to toggle) · esc to stop
        </span>
      </div>
    </div>
  )
}

// ---------- Cursor-style panel (spec §8: bg #14171D, bubbles #232832, system-ui 13/18,
// white at .44–.75 alpha, #D6D6D6 / #EDEDED, code JetBrains Mono 12.5/16).
// Stage script measured from the original bundle (ds): 0 prompt 26ms/char -> 1 "Worked" (300) ->
// 2 "Thought" (380) -> 3 text 16ms/char -> 4 "Explored" (300) -> 5/6/7 one tool row each
// (260/260/340) -> 8 "Thought" (380) -> 9 segmented answer 16ms/char -> 10 heading (260) -> 11 table.
// Placeholder strings keep the original's per-stage lengths (42 / 76 / 69) so timing matches (~5.9s);
// static labels are length-matched too (final textContent 402 chars, as measured on the original).
const CUR_PROMPT = 'why did weekly order volume dip last week?'
const CUR_TEXT = "I'll query the sample warehouse over the data tool and compare week to week."
const CUR_ANSWER = [
  { text: 'Found it: the drop is isolated to the ' },
  { text: 'north region', render: (t) => <strong className="font-bold text-[#EDEDED]">{t}</strong> },
  { text: ', here is the diff:' },
]
const CUR_TOOLS = [
  { verb: 'List', object: 'accessible databases' },
  { verb: 'Run', object: 'warehouse lookup' },
  { verb: 'Run', object: 'warehouse lookup' },
]
const Caret = ({ stroke = 'rgba(255,255,255,0.55)' }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2.5 3.75 5 6.25 7.5 3.75" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
// Generic tool mark (not a brand mark)
const ToolMark = ({ size = 16 }) => (
  <span aria-hidden="true" className="inline-block shrink-0 rounded-[3px] bg-orange" style={{ width: size * 0.75, height: size * 0.75 }} />
)
const CurCell = ({ w, children }) => (
  <div className={`px-[12px] py-[6px] leading-[16px] [&:not(:last-child)]:border-r [&:not(:last-child)]:border-white/10 ${w ? 'shrink-0' : 'flex-1'}`} style={w ? { width: w } : undefined}>
    {children}
  </div>
)
const CurHead = ({ children }) => <span className="text-[12px] font-semibold text-[#9CA0A5]">{children}</span>
const CurNum = ({ children, className = '' }) => <span className={`font-jet text-[12.5px] ${className}`}>{children}</span>

export function CursorPanel({ animate = false, inView = true }) {
  const { stage, advance } = useSimStage({ animate, inView, last: 12, timers: CURSOR_TIMERS })
  const sp = { stage, advance }
  const tools = CUR_TOOLS.slice(0, Math.max(0, stage - 5 + 1))
  return (
    <div data-sim="cursor" className="flex h-full flex-col gap-[6px] overflow-clip bg-[#14171D] px-[16px] pb-[12px] pt-[16px] font-[system-ui] text-[13px] leading-[18px] text-[#D2D2D2] [&_p]:text-[14px]">
      {stage >= 0 && (
        <div data-sim-row className="rounded-[10px] bg-[#232832] px-[14px] py-[10px] text-[#D6D6D6]">
          <Streamed {...sp} at={0} text={CUR_PROMPT} speedMs={26} />
        </div>
      )}
      {stage >= 1 && (
        <div data-sim-row className="flex items-center gap-[5px]">
          <span className="text-white/60">Worked for 18s</span>
          <Caret />
        </div>
      )}
      {stage >= 2 && (
        <div data-sim-row className="flex items-center gap-[4px]">
          <span className="text-white/60">Thought</span>
          <span className="text-white/[.46]">briefly</span>
        </div>
      )}
      {stage >= 3 && (
        <p data-sim-row className="leading-[19px]">
          <Streamed {...sp} at={3} text={CUR_TEXT} speedMs={16} />
        </p>
      )}
      {stage >= 4 && (
        <div data-sim-row className="flex items-center gap-[4px]">
          <span className="font-medium text-white/[.68]">Explored</span>
          <span className="text-white/[.46]">3 queries</span>
        </div>
      )}
      {stage >= 5 && (
        <div className="flex flex-col gap-[6px]">
          {tools.map((t, i) => (
            <div data-sim-row key={i} className="flex items-center gap-[8px]">
              <ToolMark />
              <span className="text-white/[.66]">{t.verb}</span>
              <span className="text-white/[.44]">{t.object}</span>
            </div>
          ))}
        </div>
      )}
      {stage >= 8 && (
        <div data-sim-row className="flex items-center gap-[4px]">
          <span className="text-white/60">Thought</span>
          <span className="text-white/[.46]">briefly</span>
        </div>
      )}
      {stage >= 9 && (
        <p data-sim-row className="leading-[19px]">
          <StreamedSegments {...sp} at={9} segments={CUR_ANSWER} speedMs={16} />
        </p>
      )}
      {stage >= 10 && <p data-sim-row className="!text-[16px] font-semibold leading-[22px] text-[#ECECEC]">What changed</p>}
      {stage >= 11 && (
        <div data-sim-row className="overflow-clip rounded-[6px] border border-white/10">
          <div className="flex border-b border-white/10">
            <CurCell w={110}><CurHead>week</CurHead></CurCell>
            <CurCell><CurHead>orders · north region</CurHead></CurCell>
            <CurCell w={90}><CurHead>WoW</CurHead></CurCell>
          </div>
          <div className="flex border-b border-white/10">
            <CurCell w={110}>07-21</CurCell>
            <CurCell><CurNum>484,500</CurNum></CurCell>
            <CurCell w={90}><span className="text-[#9CA0A5]">—</span></CurCell>
          </div>
          <div className="flex">
            <CurCell w={110}>07-28</CurCell>
            <CurCell><CurNum>397,290</CurNum></CurCell>
            <CurCell w={90}><CurNum className="font-bold text-[#D08770]">−18%</CurNum></CurCell>
          </div>
        </div>
      )}
      <div className="mt-auto flex shrink-0 items-center gap-[8px] rounded-[12px] bg-[#232832] px-[12px] py-[10px]">
        <input
          aria-label="Send a follow-up"
          placeholder="Send follow-up"
          spellCheck="false"
          autoComplete="off"
          className="min-w-0 flex-1 border-0 bg-transparent p-0 font-[system-ui] text-[13px] leading-[18px] text-[#EDEDED] outline-none placeholder:text-white/[.46]"
        />
        <span className="text-[12px] leading-[16px] text-white/75">Model 4 Fast</span>
        <Caret />
      </div>
      <div className="flex items-center gap-[6px]">
        <span className="text-[12px] leading-[16px] text-white/60">Local machine</span>
        <Caret />
      </div>
    </div>
  )
}

// ---------- ChatGPT-style panel (spec §8: bg #fff, surfaces #E9EAEA / #F3F3F4 / #ECECEC,
// Inter 14/22 #0D0D0D and 12.5/15 #67686A, code JetBrains Mono 11.5/14).
// Stage script measured from the original bundle (sW): 0 segmented intro 14ms/char -> 1 prompt
// 26ms/char -> 2 "Worked" (320) -> 3 segmented text 14ms/char -> 4 "Used integration" (300) ->
// 5/6/7/8 one tool row each (240/240/240/340) -> 9 text 14ms/char -> 10 "Query" (320) -> 11 summary.
// Placeholder strings keep the original's per-stage lengths (120 / 49 / 102 / 119): ~8.0s total,
// final textContent 639 chars (static labels length-matched).
const Chip = (t) => (
  <span className="inline-block rounded-[4px] bg-[#E9EAEA] px-[4px] py-[1px] align-[1px] font-jet text-[11.5px] leading-[14px] tracking-normal">{t}</span>
)
const CHAT_INTRO = [
  { text: 'The data tool is authenticated and connected. I confirmed access to 12 databases, including ' },
  { text: 'sales', render: Chip },
  { text: ', and shared data sets.' },
]
const CHAT_PROMPT = "query sales to get this quarter's regional shifts"
const CHAT_TEXT = [
  { text: "I'll inspect the " },
  { text: 'orders', render: Chip },
  { text: ' tables and identify the region columns before running the quarterly summaries.' },
]
const CHAT_TEXT_3 = 'The order data is current through this week. I found five region records and I am totaling quarter-over-quarter change.'
const CHAT_TOOLS = ['List tables', 'List columns', 'Get query guide', 'Query']
const ChatMeta = ({ children, className = '' }) => (
  <span className={`text-[12.5px] leading-[15px] text-[#67686A] ${className}`}>{children}</span>
)
const ChatChevron = ({ color = '#A0A0A1' }) => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
    <path d="M1 1 4 4 7 1" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function ChatPanel({ animate = false, inView = true }) {
  const { stage, advance } = useSimStage({ animate, inView, last: 12, timers: CHAT_TIMERS })
  const sp = { stage, advance }
  const tools = CHAT_TOOLS.slice(0, Math.max(0, stage - 5 + 1))
  return (
    <div data-sim="chat" className="flex h-full flex-col gap-[4px] overflow-clip bg-surface-0 px-[16px] py-[12px] font-sans text-[14px] leading-[22px] tracking-[-0.01em] text-[#0D0D0D]">
      {stage >= 0 && (
        <p data-sim-row>
          <StreamedSegments {...sp} at={0} segments={CHAT_INTRO} speedMs={14} />
        </p>
      )}
      {stage >= 1 && (
        <div data-sim-row className="flex justify-end pt-[2px]">
          <div className="rounded-[12px] bg-[#F3F3F4] px-[12px] py-[6px] leading-[16px]">
            <Streamed {...sp} at={1} text={CHAT_PROMPT} speedMs={26} />
          </div>
        </div>
      )}
      {stage >= 2 && (
        <div data-sim-row className="flex flex-col gap-[7px]">
          <div className="flex items-center gap-[5px]">
            <ChatMeta className="!text-[#6B6C6D]">Worked for 1m 3s</ChatMeta>
            <ChatChevron />
          </div>
          <div className="h-px bg-[#ECECEC]" />
        </div>
      )}
      {stage >= 3 && (
        <p data-sim-row>
          <StreamedSegments {...sp} at={3} segments={CHAT_TEXT} speedMs={14} />
        </p>
      )}
      {stage >= 4 && (
        <div data-sim-row className="flex items-center gap-[7px]">
          <ToolMark size={13} />
          <ChatMeta>Used local data integration</ChatMeta>
          <ChatChevron />
        </div>
      )}
      {stage >= 5 && (
        <div className="flex flex-col gap-[4px] pl-[2px]">
          {tools.map((t) => (
            <div data-sim-row key={t} className="flex items-center gap-[7px]">
              <ToolMark size={13} />
              <ChatMeta>{t}</ChatMeta>
            </div>
          ))}
        </div>
      )}
      {stage >= 9 && (
        <p data-sim-row>
          <Streamed {...sp} at={9} text={CHAT_TEXT_3} speedMs={14} />
        </p>
      )}
      {stage >= 10 && (
        <div data-sim-row className="flex items-center gap-[7px]">
          <ToolMark size={13} />
          <ChatMeta>Query</ChatMeta>
        </div>
      )}
      {stage >= 11 && (
        <div data-sim-row>
          <p>Regional shifts this quarter (5 regions):</p>
          <p className="whitespace-pre-wrap pl-[10px]">• 1.2M rows scanned in 0.8s</p>
          <p className="whitespace-pre-wrap pl-[10px]">• North orders down 18%, and one store group drives the dip</p>
        </div>
      )}
      <div className="mt-auto flex shrink-0 flex-col pt-[10px]">
        <div className="flex flex-col gap-[10px] rounded-[16px] border border-[#E4E4E4] bg-surface-0 pb-[8px] pl-[12px] pr-[10px] pt-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <input
            aria-label="Message the assistant"
            placeholder="Work with the assistant"
            spellCheck="false"
            autoComplete="off"
            className="w-full border-0 bg-transparent p-0 font-sans text-[14px] leading-[16px] tracking-[-0.01em] text-[#0D0D0D] outline-none placeholder:text-[#C0C0C1]"
          />
          <div className="flex items-center gap-[10px] text-[12px] leading-[15px]">
            <span className="text-[#818283]">Ask for approval</span>
            <span aria-hidden="true" className="flex-1" />
            <span className="font-medium">Model 5.5</span>
            <span className="text-[#828385]">Medium</span>
            <ChatChevron color="#898A8B" />
          </div>
        </div>
      </div>
    </div>
  )
}
