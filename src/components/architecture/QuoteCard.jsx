// Architecture quote card (spec §4 "Quote card"). Offset-shadow link (LiftCard, lift 15, hover >=960).
// >=1302: row, centre, gap 40, padding 32 40, height 161. Below: column, gap 32, padding 26 18.
import { Link } from 'react-router-dom'
import { LiftCard, Placeholder } from '../ui'

export default function QuoteCard() {
  return (
    <LiftCard
      lift={15}
      press={false}
      as={Link}
      wrapperProps={{ to: '/case-studies/together-ai-scaling-with-motherduck', 'aria-label': 'Read the customer story' }}
      wrapperClassName="mt-[24px] no-underline xl:mt-[56px]"
      innerAs="figure"
      className="m-0 flex flex-col gap-[32px] rounded-sm border-2 border-ink bg-white px-[18px] py-[26px] xl:flex-row xl:items-center xl:gap-[40px] xl:px-[40px] xl:py-[32px]"
    >
      <div className="flex flex-col gap-[16px] xl:flex-1 xl:flex-row xl:items-start xl:gap-[24px]">
        <span
          aria-hidden="true"
          className="block h-[28px] w-[35px] shrink-0 overflow-hidden font-mono text-quote-mark-sm text-orange xl:-ml-[10px] xl:-mt-[10px] xl:h-auto xl:w-auto xl:overflow-visible xl:text-quote-mark"
        >
          “
        </span>
        {/* Placeholder quote [172ch/24w] */}
        <blockquote className="m-0 font-sans text-quote-sm text-ink xl:text-quote">
          Giving every analyst dedicated compute eliminated our backlog of sluggish dashboards. Nowadays our team
          delivers new reporting within hours, and cloud spending decreased.
        </blockquote>
      </div>
      <figcaption className="flex shrink-0 flex-col gap-[12px]">
        <Placeholder width={156} height={40} label="Company logo" />
        <div className="flex flex-col gap-[2px]">
          <span className="font-sans text-caption font-bold text-ink">Jordan Avery</span>
          <span className="font-sans text-caption font-light text-gray-600">Head of Data Platform, Exco</span>
        </div>
      </figcaption>
    </LiftCard>
  )
}
