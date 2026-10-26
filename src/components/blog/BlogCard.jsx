import { LiftCard, Placeholder } from '../ui'
import { linkTarget } from '../../lib/links.js'

// Spec §9 slide card: 348x369 @1440, thumbnail 344x194 (cover; logo thumbs contain + padding 32 24),
// body padding 22 16 24 24 (19 14 20 20 below 1302). Hover >=960 translate(14px,-14px); active 60ms.
export default function BlogCard({ post, href }) {
  const link = linkTarget(href)
  return (
    <LiftCard
      lift={14}
      pressDuration={60}
      wrapperClassName="h-full rounded-none"
      innerAs={link.el}
      {...link.props}
      className="flex h-full flex-col rounded-none border-2 border-ink bg-surface-0 text-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-hover"
    >
      {/* Measured: thumbnail box is 16:9 of the inner width, plus the 2px bottom border (344.3 x 193.7 + 2) */}
      <div className="w-full border-b-2 border-ink bg-cream">
        <div className={`aspect-video w-full ${post.logo ? 'px-[24px] py-[32px]' : ''}`}>
        <Placeholder
          label={`Thumbnail: ${post.title}`}
          variant={post.logo ? 'shape' : 'hatch'}
          bordered={false}
          rounded="rounded-none"
          className="h-full w-full"
        />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[8px] bg-surface-0 pb-[20px] pl-[20px] pr-[14px] pt-[19px] xl:pb-[24px] xl:pl-[24px] xl:pr-[16px] xl:pt-[22px]">
        <span className="self-start rounded-sm border-2 border-gray-400 bg-chip-gray px-[6px] py-[4px] font-mono text-chip uppercase">
          {post.type}
        </span>
        <h3 className="font-fono text-blog-h3-sm uppercase xl:text-blog-h3">{post.title}</h3>
        <p className="font-sans text-meta text-gray-600">{post.meta}</p>
      </div>
    </LiftCard>
  )
}
