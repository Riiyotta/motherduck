// Storage stack under the diagram (spec §4 "Storage stack"): 3 stacked plates.
// Container 104 tall (front 88 + 16). Back plate inset 16 l/r and 16 lower, middle inset 8/8;
// both sand with 2px ink border. Front plate cream, flex centre, padding 0 24.
// <728: front plate 142 tall, padding 40 24 28, content left-aligned and wrapped.
import { Placeholder } from '../ui'

// Generic labels (format/product names replaced); icons are 16x16 placeholders, #3 circle-cropped.
const ITEMS = [
  { label: 'OPEN TABLES' },
  { label: 'DIFFERENTIAL STORAGE' },
  { label: 'TABLE FORMAT' },
  { label: 'OBJECT STORAGE', round: true },
]

export default function StorageStack() {
  const plate = 'absolute h-[142px] rounded-sm border-2 border-ink bg-sand md:h-[88px]'
  return (
    <div className="relative h-[158px] md:h-[104px]">
      <div aria-hidden="true" className={`${plate} inset-x-[16px] top-[16px]`} />
      <div aria-hidden="true" className={`${plate} inset-x-[8px] top-[8px]`} />
      <div className="relative z-[1] flex h-[142px] items-start rounded-sm border-2 border-ink bg-cream px-[24px] pb-[28px] pt-[40px] md:h-[88px] md:items-center md:justify-center md:py-0">
        <div className="flex flex-col items-start gap-[10px]">
          {/* Measured chip: 20 tall border-box (text overflows centred), left-aligned in the column */}
          <span className="flex h-[20px] items-center justify-center rounded-sm border-2 border-sky-dark bg-sky-tint px-[8px] py-[4px] font-mono text-label uppercase text-ink">
            SHARED STORAGE
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0">
            {ITEMS.map((it) => (
              <li key={it.label} className="flex items-center gap-[8px] font-sans text-[12px] font-normal uppercase leading-[16px] text-gray-600">
                <Placeholder width={16} height={16} label="" rounded={it.round ? 'rounded-full' : 'rounded-sm'} bordered={false} />
                {it.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
