// F4 PostCard, F5 FeaturedPostCard, F8 NewsDigestCard.
import { Link } from 'react-router-dom'
import { LiftCard, Placeholder, UnderlineLink } from '../ui'
import { Reveal } from './bits.jsx'

const BADGE_BG = { News: 'bg-yellow', Article: 'bg-sky', Video: 'bg-teal', Podcast: 'bg-coral-red' }
const GLYPH = {
  News: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#383838" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="4" width="15" height="16" /><path d="M18 8h3v10a2 2 0 0 1-2 2H6M6 8h9M6 12h9M6 16h6" />
    </svg>
  ),
  Article: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#383838" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 11h6M9 14h6M9 17h4" />
    </svg>
  ),
  Video: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#383838" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" /><path d="M10 9v6l5-3z" fill="#383838" />
    </svg>
  ),
  Podcast: (
    <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" stroke="#383838" strokeWidth="2" aria-hidden="true">
      <rect x="12" y="4" width="8" height="15" rx="4" /><path d="M8 15a8 8 0 0 0 16 0M16 23v5M11 28h10" />
    </svg>
  ),
}

/* Monthly-digest thumbnail (live /duckdb-news cards 2..42): dark top band with a centred two-line heading
   (white name, yellow issue line), yellow panel with three icon rows and corner doodles. Drawn on a 389x217 box
   (the live image size inside the 16:9 wrapper) and scaled with the card. Placeholder words only. */
const NL_ROWS = [[0.36], [0.62, 0.32], [0.55]]
export function NewsletterThumb({ issue = 'Issue 1', seed = 0 }) {
  const C = { ink: '#383838', sun: '#FFDE00', white: '#FFFFFF' }
  return (
    <svg viewBox="0 0 389 217" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label="Newsletter thumbnail">
      <rect width="389" height="217" fill={C.sun} />
      <path d="M340 0c4 22 20 34 38 40M389 120c-12 2-20-4-24-12" fill="none" stroke={C.ink} strokeWidth="1.2" opacity=".55" />
      <circle cx={362 - (seed % 3) * 4} cy="121" r="3" fill={C.ink} />
      <path d="M318 217c-2-14 6-26 14-24 9 2 6 16-4 18-8 2-14-6-8-16" fill="none" stroke={C.ink} strokeWidth="2.4" />
      <path d="M18 120c-10 6-12 18-4 26" fill="none" stroke={C.ink} strokeWidth="1" opacity=".4" />
      <rect width="389" height="73" fill={C.ink} />
      <text x="194.5" y="31" textAnchor="middle" fill={C.white} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20">Monthly Engine Digest</text>
      <text x="194.5" y="57" textAnchor="middle" fill={C.sun} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20">{issue}</text>
      {NL_ROWS.map((lines, i) => {
        const y = [103, 140, 182][i]
        return (
          <g key={i}>
            <rect x="40" y={y - 9} width="18" height="18" rx="2" fill="none" stroke={C.ink} strokeWidth="1.6" />
            <path d={`M44 ${y + 4}h10M44 ${y}h6`} stroke={C.ink} strokeWidth="1.4" />
            {lines.map((wFrac, j) => (
              <rect key={j} x="76" y={y - 5 + j * 17} width={Math.round(270 * wFrac + ((seed * 7 + i * 13) % 30))} height="8" rx="1" fill={C.ink} opacity={j ? 0.7 : 0.9} />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

/* F4. `to` = internal route; without it the card renders as a non-link (quack: external). */
export function PostCard({ item, to, badge, reveal = true, className = '', thumb = null }) {
  return (
    <Reveal enabled={reveal} className={`h-full ${className}`}>
      <LiftCard
        lift={14}
        as="article"
        innerAs={to ? Link : 'div'}
        {...(to ? { to } : {})}
        wrapperClassName="h-full"
        className="flex h-full flex-col rounded-sm border-2 border-ink text-ink no-underline"
      >
        {badge && (
          <span className={`absolute right-[24px] top-[-23px] z-[1] flex h-[44px] w-[44px] items-center justify-center rounded-sm border-2 border-ink p-[4px] lg:right-[32px] lg:top-[-27px] lg:h-[52px] lg:w-[52px] lg:p-[8px] ${BADGE_BG[badge]}`} aria-label={badge}>
            <span className="block h-[32px] w-[32px]">{GLYPH[badge]}</span>
          </span>
        )}
        {/* Original: the photo wrapper (incl. its 2px bottom border) is the 16:9 box, the image fills the rest. */}
        <div className="aspect-[16/9] shrink-0 overflow-hidden border-b-2 border-ink bg-cream">
          {thumb || <Placeholder bordered={false} rounded="" label="Post thumbnail" className="!h-full !w-full" />}
        </div>
        <div className="flex flex-1 flex-col gap-[8px] bg-white p-[24px] md:min-h-[220px] lg:min-h-[286px] lg:p-[32px]">
          <p className="m-0 font-sans opacity-60 text-card-date-md lg:text-card-date">{item.byline || item.date}</p>
          <h2 className="m-0 font-mono font-normal uppercase text-card-title-mono-md lg:text-card-title-mono">{item.title}</h2>
          <p className="m-0 line-clamp-[7] font-sans text-card-excerpt-md lg:text-card-excerpt">{item.excerpt}</p>
        </div>
      </LiftCard>
    </Reveal>
  )
}

/* F5: horizontal at >=728; a normal PostCard at SM. */
export function FeaturedPostCard({ item, to }) {
  return (
    <>
      <div className="mx-auto w-full max-w-[350px] md:hidden">
        <PostCard item={item} to={to} reveal={false} />
      </div>
      <LiftCard
        lift={14}
        as="article"
        innerAs={Link}
        to={to}
        wrapperClassName="hidden md:block"
        className="flex rounded-sm border-2 border-ink text-ink no-underline"
      >
        <div className="w-[calc(50%-12px)] shrink-0 border-r-2 border-ink bg-cream lg:w-[calc(50%-16px)] xl:w-1/2">
          <Placeholder bordered={false} rounded="" label="Featured thumbnail" className="!h-full !w-full" />
        </div>
        <div className="flex w-[calc(50%+12px)] flex-col gap-[8px] bg-white py-[18px] pl-[24px] pr-[18px] md:min-h-[190px] lg:min-h-[246px] lg:py-[20px] lg:pl-[32px] lg:pr-[20px] xl:min-h-[350px] xl:w-1/2 xl:p-[32px] lg:w-[calc(50%+16px)]">
          <p className="m-0 font-sans opacity-60 text-card-date-md lg:text-card-date">{item.byline || item.date}</p>
          <h2 className="m-0 font-mono font-normal uppercase text-featured-title-md lg:text-featured-title-lg xl:text-featured-title">{item.title}</h2>
          <p className="m-0 line-clamp-[7] font-sans text-card-excerpt-md lg:text-card-excerpt">{item.excerpt}</p>
        </div>
      </LiftCard>
    </>
  )
}

/* F8: News digest (no hover rule on this card -> LiftCard with hover disabled). */
export function NewsDigestCard({ digest }) {
  return (
    <LiftCard lift={14} disabled as="article" className="flex flex-col gap-[24px] rounded-sm border-2 border-ink bg-white p-[24px] md:gap-[28px] md:p-[32px] lg:gap-[32px] lg:p-[40px]">
      <div className="flex flex-col gap-[4px]">
        <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] opacity-60">{digest.date}</p>
        <h2 className="m-0 font-mono font-normal uppercase text-ink text-news-digest-h2-sm md:text-news-digest-h2-md lg:text-news-digest-h2">{digest.title}</h2>
      </div>
      <div className="flex flex-col gap-[32px]">
        {digest.items.map((it, k) => (
          <article key={k} className="flex flex-col gap-[6px]">
            {/* external (target=_blank on the original) -> non-link */}
            <h3 className="m-0 cursor-pointer font-mono font-medium text-ink underline underline-offset-[3px] transition-colors hover:text-sky-dark text-news-item-md lg:text-news-item">{it.title}</h3>
            <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] lg:text-[16px] lg:leading-[25.6px]">{it.desc}</p>
          </article>
        ))}
      </div>
      <UnderlineLink to={`/blog/${digest.slug}`}>Read the full newsletter</UnderlineLink>
    </LiftCard>
  )
}

/* F3 grid: 3 / 2 / 2 / 1 (max-width 350 SM), gap 32 (>=960) / 24. */
export const FEED_GRID = 'mx-auto grid w-full max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-2 lg:gap-[32px] xl:grid-cols-3'
