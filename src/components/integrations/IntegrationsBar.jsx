import { Placeholder } from '../ui'
import Glyph from './Glyph.jsx'
import Tooltip from './Tooltip.jsx'

// Integrations bar card (spec §6): 1242x164, white, 2px ink, r 2.
const LANGS = ['Server runtime', 'Scripting', 'JVM', 'Browser', 'Typed web', 'Systems', 'Native', 'Wire protocol', 'Statistics']

export default function IntegrationsBar() {
  return (
    <div className="relative z-[1] rounded-sm border-2 border-ink bg-surface-0">
      {/* Mascot slot: 200x155 (175x135 <1302, 92x71 <728), top -143, centred, z 3. Neutral placeholder only. */}
      {/* Measured offsets: top -67 / -125 / -143 (from the padding box); centre is 12px (20px >=1302) right of the card centre */}
      <div className="absolute left-[calc(50%+12px)] top-[-67px] z-[3] h-[71px] w-[92px] -translate-x-1/2 md:top-[-125px] md:h-[135px] md:w-[175px] xl:left-[calc(50%+20px)] xl:top-[-143px] xl:h-[155px] xl:w-[200px]">
        <Placeholder variant="shape" label="Illustration placeholder" className="h-full w-full" />
      </div>
      {/* Measured: no wrap — the title shrinks/wraps beside the chip (49.6 tall at 390); chip 24 tall, 12px text below 1302 */}
      <div className="flex min-h-[40px] items-center justify-between gap-[12px] bg-ink px-[20px] py-[8px]">
        <h3 className="m-0 min-w-0 font-mono text-bar-title-sm font-normal uppercase text-white xl:text-bar-title">Integrations &amp; Tools</h3>
        <span className="flex h-[24px] shrink-0 items-center rounded-sm border-2 border-yellow-chip-border bg-yellow-chip px-[12px] font-mono text-[12px] uppercase leading-[16px] text-ink xl:text-[14px]">
          Choose your stack
        </span>
      </div>
      <div className="flex flex-col items-center gap-[20px] px-[20px] py-[28px] md:p-[32px] xl:flex-row xl:justify-center xl:gap-[32px] xl:p-[40px]">
        <div className="flex flex-wrap justify-center gap-[20px] xl:flex-nowrap xl:gap-[52px]">
          {LANGS.map((label, i) => (
            // Original language icons all target /docs (one is external) -> non-link
            <span key={label} aria-label={label} className="group relative block h-[40px] w-[40px] text-ink">
              <Glyph index={i + 2} className="h-full w-full" />
              <Tooltip rounded="rounded-tip">{label}</Tooltip>
            </span>
          ))}
        </div>
        <p className="m-0 font-mono text-[14px] uppercase leading-[16px] tracking-[0.28px]">+ ODBC · HTTP · CLI</p>
      </div>
    </div>
  )
}
