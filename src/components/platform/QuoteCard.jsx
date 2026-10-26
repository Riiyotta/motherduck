import { LiftCard, Placeholder } from '../ui'
import { linkTarget } from '../../lib/links.js'

// Quote card (spec §4 "Quote card", reused in §5 "Quote card 2").
// Offset-shadow link: wrapper <a> (ink backing), inner <figure> white, 2px ink border, r 2.
// Hover (>=960) translate(15px,-15px), 120ms.
export default function QuoteCard({ quote, name, role, href, className = '' }) {
  const link = linkTarget(href)
  return (
    <LiftCard
      lift={15}
      press={false}
      as={link.el}
      innerAs="figure"
      wrapperProps={{ ...link.props, 'aria-label': `Quote from ${name}` }}
      wrapperClassName={`no-underline text-ink ${className}`}
      className="m-0 flex flex-col gap-[32px] rounded-sm border-2 border-ink bg-surface-0 px-[18px] py-[26px] xl:flex-row xl:items-center xl:gap-[40px] xl:px-[40px] xl:py-[32px]"
    >
      <div className="flex flex-col gap-[16px] xl:flex-1 xl:flex-row xl:items-start xl:gap-[24px]">
        <span
          aria-hidden="true"
          className="block h-[28px] w-[35px] shrink-0 overflow-hidden font-mono text-quote-mark-sm text-orange xl:-ml-[10px] xl:-mt-[10px] xl:h-auto xl:w-auto xl:overflow-visible xl:text-quote-mark"
        >
          {'“'}
        </span>
        <blockquote className="m-0 font-sans text-quote-sm xl:text-quote">{quote}</blockquote>
      </div>
      <figcaption className="flex shrink-0 flex-col gap-[12px]">
        <Placeholder width={156} height={40} label="Company logo placeholder" />
        <div className="flex flex-col gap-[2px] font-sans">
          <p className="m-0 text-caption font-bold">{name}</p>
          <p className="m-0 text-caption font-light text-gray-600">{role}</p>
        </div>
      </figcaption>
    </LiftCard>
  )
}
