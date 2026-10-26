import { ArrowRight, LiftCard, Placeholder } from '../ui'
import { linkTarget } from '../../lib/links.js'

// Customer case-study card (spec §7 "Card"). Ink wrapper (shadow layer), inner <a> white flex column
// (space-between), 2px ink border; transform + background-color 120ms. Hover (>=960) translate(14px,-14px)
// + per-card tint; active back to 0,0 in 60ms with a deeper tint (tints passed via LiftCard bg props).
export default function CaseCard({ logo, hoverBg, activeBg, href, className = '', children }) {
  const link = linkTarget(href)
  return (
    <LiftCard
      lift={14}
      innerAs={link.el}
      {...link.props}
      bg="#FFFFFF"
      hoverBg={hoverBg}
      activeBg={activeBg}
      wrapperClassName={`flex h-full flex-col rounded-none ${className}`}
      className="flex flex-1 flex-col justify-between rounded-none border-2 border-ink text-ink no-underline"
    >
      <div className="px-[24px] pt-[24px] xl:px-[32px] xl:pt-[32px]">
        <Placeholder width={logo[0]} height={logo[1]} label="Customer logo placeholder" className="max-w-full" />
      </div>
      {/* Measured: content gap 16 below 728, 20 above; card corners are square (no radius) */}
      <div className="flex flex-col justify-end gap-[16px] px-[24px] pb-[24px] pt-[20px] md:gap-[20px] xl:px-[32px] xl:pb-[32px] xl:pt-0">
        {children}
        <span className="flex items-center gap-[6px] font-sans text-button uppercase">
          Read case study
          <ArrowRight size={16} />
        </span>
      </div>
    </LiftCard>
  )
}
