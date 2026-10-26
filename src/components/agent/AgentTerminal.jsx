import { useRef, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../../lib/sim.js'
import { TabGlyph, ExternalArrow } from './icons.jsx'
import { ClaudePanel, CursorPanel, ChatPanel } from './TerminalPanels.jsx'

// Spec §8 "Left: agent client tabs + terminal sim" (600x571 @1440; full width below 1302).
const TABS = [
  { id: 'claude', label: 'Claude Code', glyph: 'a', Panel: ClaudePanel },
  { id: 'cursor', label: 'Cursor', glyph: 'b', Panel: CursorPanel },
  { id: 'chatgpt', label: 'ChatGPT', glyph: 'c', Panel: ChatPanel },
]

export default function AgentTerminal() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const { Panel, label, id } = TABS[active]
  // Original: sim starts when this wrapper is >=30% visible (IO threshold .3, triggerOnce)
  const [simRef, inView] = useInView({ threshold: 0.3, once: true })
  const reduced = usePrefersReducedMotion()

  const onKeyDown = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + TABS.length) % TABS.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div ref={simRef} className="w-full overflow-clip rounded-sm xl:w-[600px] xl:shrink-0">
      <div role="tablist" aria-label="Agent clients" className="flex overflow-auto" onKeyDown={onKeyDown}>
        {TABS.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`agent-tab-${t.id}`}
              aria-selected={selected}
              aria-controls="agent-tabpanel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group -mb-[2px] -mr-[2px] flex h-[36px] shrink-0 items-center gap-[4px] border-2 border-ink px-[16px] py-[8px] font-mono text-[14px] uppercase leading-[16px] tracking-[0.28px] transition-[background-color] duration-125 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-hover ${
                selected
                  ? 'bg-ink text-white [&_svg]:brightness-0 [&_svg]:invert'
                  : 'bg-cream text-gray-600 hover:text-ink [&_svg]:brightness-0 [&_svg]:invert-[.4] hover:[&_svg]:invert-[.22]'
              }`}
            >
              <TabGlyph kind={t.glyph} />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id="agent-tabpanel"
        aria-labelledby={`agent-tab-${id}`}
        aria-label={`${label} session`}
        // Measured: below 1302 the original panel is content-height and grows as sim rows appear
        // (185 idle -> 483; 222 -> 646 @390); >=1302 it is fixed at 483. Transition 'all 0s' = instant.
        className="overflow-clip border-2 border-ink xl:h-[483px]"
      >
        <Panel key={id} animate={!reduced} inView={inView} />
      </div>

      <div className="flex min-h-[54px] flex-wrap items-center justify-between gap-[12px] border-2 border-t-0 border-ink bg-cream px-[20px] py-[8px]">
        <div className="flex flex-col gap-[2px]">
          <p className="font-mono text-label uppercase tracking-[0.24px] text-ink">Any MCP-capable agent</p>
          <p className="font-sans text-[12px] font-light leading-[16.8px] tracking-[0.24px] text-gray-600">Editors, desktop chat apps, and others</p>
        </div>
        {/* Original target: /docs (MCP setup) -> non-link */}
        <span
          className="flex items-center gap-[4px] rounded-sm border-2 border-ink bg-sky px-[16px] py-[8px] font-sans text-pill uppercase text-ink hover:bg-sky-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-hover"
        >
          Docs
          <ExternalArrow size={16} />
        </span>
      </div>
    </div>
  )
}
