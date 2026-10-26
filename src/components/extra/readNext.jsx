// ReadNextGrid (PAGES_SPEC_EXTRA X2 "ReadNext section", shared by X2 glossary term and X7 learn article).
// Full-bleed, 2px ink top border; H2 "READ NEXT"; 3 LiftCard(14) cards (1 column, max-width 400 below 960);
// footer UnderlineLink right-aligned (>=960) / centred.
import { Link } from 'react-router-dom'
import { LiftCard, Placeholder, UnderlineLink } from '../ui'
import { internalPath } from '../content/hooks.js'
import '../../styles/extra-content.css'

function Arrow16() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// item: { kind, title, href, gated }
export function ReadNextCard({ item, seed = 0 }) {
  const to = internalPath(item.href)
  const g = item.gated
  return (
    <LiftCard
      lift={14}
      as="article"
      innerAs={to ? Link : 'div'}
      {...(to ? { to } : {})}
      wrapperClassName="h-full"
      className="flex h-full flex-col border-2 border-ink text-ink no-underline"
    >
      {/* live: 16:9 on the border-box (388.7 x 218.6 incl. the 2px bottom border) */}
      <div className={`relative aspect-video border-b-2 border-ink ${g ? 'bg-peach' : 'bg-cream'}`}>
        <Placeholder kind={g ? 'diagram' : 'thumbnail'} seed={seed} rounded="" bordered={false} label="Read next thumbnail"
          className={`!absolute inset-0 !h-full !w-full ${g ? '!bg-peach' : ''}`} />
      </div>
      <div className={`flex flex-1 flex-col items-start gap-[12px] p-[24px] lg:p-[32px] ${g ? 'bg-peach' : 'bg-white'}`}>
        <span className={`border border-ink px-[8px] py-[4px] font-mono text-[12px] uppercase leading-[16.8px] tracking-[0.48px] ${g ? 'bg-orange' : 'bg-cream'}`}>{item.kind}</span>
        <h3 className="xc-mono xc-rec-title m-0 text-ink">{item.title}</h3>
        {g && (
          <span className="flex items-center gap-[8px] font-mono text-[14px] font-medium uppercase leading-[14px] tracking-[0.56px]">
            Explore the product <Arrow16 />
          </span>
        )}
      </div>
    </LiftCard>
  )
}

export default function ReadNextGrid({ items, footer }) {
  return (
    <section className="border-t-2 border-ink pb-[112px] pt-[112px] md:pt-[80px] lg:pb-[160px]">
      <div className="container">
        <h2 className="xc-mono xc-readnext-h2 m-0 mb-[32px] text-ink lg:mb-[40px]">Read next</h2>
        <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-[24px] lg:max-w-none lg:grid-cols-3 lg:gap-[32px]">
          {items.map((it, k) => <ReadNextCard key={k} item={it} seed={it.seed ?? k} />)}
        </div>
        <div className="mt-[40px] flex justify-center lg:justify-end">
          {/* live: a 1px transparent box, padding 2 8 0; label Inter 16/22.4 ls .32 UPPER */}
          <UnderlineLink to={footer.to} uppercase className="px-[8px] pt-[2px]" labelClassName="!leading-[22.4px]">{footer.label}</UnderlineLink>
        </div>
      </div>
    </section>
  )
}
