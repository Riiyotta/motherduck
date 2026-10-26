// Hero right column "interface examples" product sim, control variant (spec §3), 600x540 @1440.
// Tab bar (34) + panel (470; min 468 at md, 594 below md as measured) + status bar (36). Tabs switch instantly, no auto-rotate (§11 #16).
import { useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../../lib/sim.js'
import AskPanel from './AskPanel.jsx'
import { SqlPanel, PythonPanel, CliPanel } from './CodePanels.jsx'

const TABS = [
  { id: 'ask', label: 'ASK (MCP)', bg: 'bg-surface-1', Panel: AskPanel },
  // Measured: SQL = light notebook panel, PYTHON = dark code panel (spec §3 had them swapped)
  { id: 'sql', label: 'SQL', bg: 'bg-surface-1', Panel: SqlPanel },
  { id: 'python', label: 'PYTHON', bg: 'bg-ink', Panel: PythonPanel },
  { id: 'cli', label: 'CLI', bg: 'bg-[#1E1E24]', Panel: CliPanel }, // #1E1E24: no shared token
]

export default function ProductSim() {
  const [active, setActive] = useState('ask')
  const tab = TABS.find((t) => t.id === active)
  const { Panel } = tab
  // Original: the ASK sim starts once this wrapper is >=30% visible (IO threshold .3, triggerOnce);
  // later ASK activations replay immediately because inView stays latched.
  const [simRef, inView] = useInView({ threshold: 0.3, once: true })
  const reduced = usePrefersReducedMotion()
  return (
    <div
      ref={simRef}
      aria-label="Product interface examples"
      className="flex w-full flex-col overflow-hidden rounded-sm bg-cream xl:w-[600px] xl:shrink-0"
    >
      <div role="tablist" aria-label="Interface examples" className="flex h-[34px] flex-wrap">
        {TABS.map((t) => {
          const sel = t.id === active
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`hero-tab-${t.id}`}
              aria-selected={sel}
              aria-controls="hero-tabpanel"
              onClick={() => setActive(t.id)}
              className={`-mb-[2px] -mr-[2px] h-[36px] border-2 border-ink px-[20px] py-[8px] font-mono text-label uppercase ${
                sel ? 'bg-ink text-white' : 'bg-transparent text-gray-600'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      {/* key remounts the panel on every activation so the Animation agent's sim can replay */}
      <div
        key={active}
        id="hero-tabpanel"
        role="tabpanel"
        aria-labelledby={`hero-tab-${active}`}
        className={`flex min-h-[594px] md:min-h-[468px] xl:min-h-[470px] flex-col overflow-hidden border-2 xl:h-[470px] border-ink px-[20px] py-[16px] ${tab.bg}`}
      >
        {active === 'ask' ? <Panel animate={!reduced} inView={inView} /> : <Panel />}
      </div>
      <div className="flex h-[36px] items-center justify-between border-x-2 border-b-2 border-ink bg-cream px-[20px] py-[8px]">
        <div className="flex items-center gap-[8px]">
          <span aria-hidden="true" className="h-[8px] w-[8px] rounded-full bg-garden" />
          <span className="font-mono text-[12px] font-light leading-[16px] tracking-[0.24px] uppercase text-ink">CONNECTED</span>
          {/* Measured chip: 18 tall (border-box, text overflows centred), Mono 10/12 300 ls .2 */}
          <span className="flex h-[18px] items-center rounded-sm border-2 border-yellow-chip-border bg-yellow-chip px-[8px] py-[2px] font-mono text-[10px] font-light uppercase leading-[12px] tracking-[0.2px] text-ink">
            REGION-EAST1
          </span>
        </div>
        {/* Right-hand status-bar content is UNMEASURED in the spec: intentionally empty */}
      </div>
    </div>
  )
}
