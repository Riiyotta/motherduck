import { ArrowRight, LiftCard, Placeholder } from '../ui'
import { linkTarget } from '../../lib/links.js'

// Product card (spec §5 "Product cards"). <article> wrapper is the ink shadow layer; inner <a>.
// Hover (>=960) translate(10px,-10px) 120ms; active back in 60ms.
export default function ProductCard({ title, body, bgClass, href }) {
  const link = linkTarget(href)
  return (
    <LiftCard
      lift={10}
      as="article"
      innerAs={link.el}
      {...link.props}
      wrapperClassName="h-full w-full md:max-lg:mx-auto md:max-lg:max-w-[450px]"
      className={`flex h-full flex-col gap-[24px] rounded-sm border-2 border-ink px-[10px] py-[16px] text-ink no-underline xl:gap-[32px] xl:px-[24px] xl:py-[32px] ${bgClass}`}
    >
      {/* Corner icon tab 44x44, borders 0 0 2px 2px */}
      <span className="absolute right-0 top-0 flex h-[44px] w-[44px] items-center justify-center border-b-2 border-l-2 border-ink bg-cream">
        <Placeholder width={28} height={28} variant="shape" label="Product icon placeholder" />
      </span>
      {/* Measured: title + body share a column with gap 8, inset 10px on the left below 1302 */}
      <div className="flex flex-col gap-[8px] pl-[10px] xl:pl-0">
        <h3 className="m-0 font-fono text-card-h3-sm font-normal uppercase xl:text-card-h3">{title}</h3>
        <p className="m-0 font-sans text-card-body">{body}</p>
      </div>
      <div className="overflow-hidden border-2 border-ink bg-surface-0" style={{ aspectRatio: '350 / 171' /* measured frame aspect */ }}>
        <Placeholder ratio="342 / 165" bordered={false} rounded="" variant="shape" label="Product screenshot placeholder" className="h-full" />
      </div>
      <span className="mt-auto flex items-center gap-[6px] font-sans text-button uppercase">
        Learn more
        <ArrowRight size={16} />
      </span>
    </LiftCard>
  )
}
