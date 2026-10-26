// Small shared pieces for the content templates. Visual primitives come from ../ui.
import { Link } from 'react-router-dom'
import '../../styles/content.css'
import { UnderlineLink, Placeholder } from '../ui'
import Chevron from '../header/Chevron.jsx'
import { internalPath, useReveal } from './hooks.js'

export { Chevron }

/* Internal route -> <Link>; anything else -> non-link element with identical styling (§10). */
export function SmartLink({ href, className = '', children, as: Fallback = 'span', ...rest }) {
  const to = internalPath(href)
  if (to) return <Link to={to} className={className} {...rest}>{children}</Link>
  return <Fallback className={className} {...rest}>{children}</Fallback>
}

/* Scroll-reveal wrapper (§2). */
export function Reveal({ as: Tag = 'div', enabled = true, className = '', children, ...rest }) {
  const [ref, cls] = useReveal(enabled)
  return <Tag ref={ref} className={`${cls} ${className}`} {...rest}>{children}</Tag>
}

/* Back row: 20px (16 SM) chevron rotated 90deg + UnderlineLink, gap 6. */
export function BackLink({ to, children, small = false }) {
  return (
    <div className="flex items-center gap-[6px]">
      <Chevron size={20} className={`rotate-90 ${small ? 'max-md:h-[16px] max-md:w-[16px]' : ''}`} />
      <UnderlineLink to={to} icon={null} uppercase className={small ? 'max-md:[&>span]:text-[14px]' : ''}>{children}</UnderlineLink>
    </div>
  )
}

/* F9 spinner: ~66px rotating ring (60.5 SM). */
export function Spinner() {
  return (
    <div className="flex justify-center pt-[39px]" role="status" aria-label="Loading">
      <svg viewBox="0 0 66 66" className="h-[60.5px] w-[60.5px] animate-feed-spin md:h-[65.6px] md:w-[65.6px]" aria-hidden="true">
        <circle cx="33" cy="33" r="28" fill="none" stroke="#E1D6CB" strokeWidth="4" />
        <path d="M33 5a28 28 0 0 1 28 28" fill="none" stroke="#383838" strokeWidth="4" strokeLinecap="square" />
      </svg>
    </div>
  )
}

/* F9 hidden SEO "load more" link (opacity 0, pointer-events none). */
export function LoadMoreLink({ next, label = 'Load more blog posts' }) {
  return (
    <div className="mt-[48px] flex justify-center opacity-0 pointer-events-none" aria-hidden="true">
      <Link to={`?page=${next}`} tabIndex={-1} className="font-sans text-[16px] font-medium leading-[16px] text-ink underline">{label}</Link>
    </div>
  )
}

/* Infinite-scroll footer: sentinel + spinner + hidden link. */
export function FeedFooter({ feed, label }) {
  return (
    <>
      <div ref={feed.sentinelRef} data-sentinel="" className="h-0" />
      {/* live feeds (news, blog, quack, videos) show no spinner while the next page loads */}
      {feed.hasMore && label && <LoadMoreLink next={feed.pages + 1} label={label} />}
    </>
  )
}

/* F9 no-results (typography UNMEASURED: Inter 16/25.6). */
// variant 'art' = /blog empty state (measured live @1440/768/390; the page's own bottom padding supplies the 200/150); centred
// column margin 100 auto (58 <960); 102x116 illustration (75x85 <960); text block margin-top 48; title Inter
// 20/32 600 ls .4 (16/25.6 ls .32 <960), margin-bottom 32; sub-line 20/32 300 ls .4 (16/25.6 ls .32 <728).
export function NoResults({ variant }) {
  if (variant === 'art') {
    return (
      <div>
        <div className="mx-auto my-[58px] flex flex-col items-center justify-center text-center font-sans text-ink lg:my-[100px]">
          <Placeholder variant="shape" label="Empty state illustration" className="h-[85px] w-[75px] lg:h-[116px] lg:w-[102px]" />
          <div className="mt-[48px]">
            <p className="m-0 mb-[32px] text-[16px] font-semibold leading-[25.6px] tracking-[0.32px] lg:text-[20px] lg:leading-[32px] lg:tracking-[0.4px]">There are no exact matches found</p>
            <p className="m-0 text-[16px] font-light leading-[25.6px] tracking-[0.32px] md:text-[20px] md:leading-[32px] md:tracking-[0.4px]">Please, try again!</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="py-[48px] text-center font-sans text-[16px] leading-[25.6px] text-ink">
      <p className="m-0">There are no exact matches found</p>
      <p className="m-0">Please, try again!</p>
    </div>
  )
}

/* Neutral outline doodles (never brand art). `kind` picks a shape; stroke ink. */
const SHAPES = {
  loop: <path d="M6 70c20-50 60-60 80-30s-10 50-30 30 10-60 50-50 40 40 60 20" />,
  wave: <path d="M4 40c16-24 32-24 48 0s32 24 48 0 32-24 48 0 32 24 48 0" />,
  star: <path d="M50 6l11 30 32 2-25 20 9 31-27-18-27 18 9-31L7 38l32-2z" />,
  circle: <circle cx="50" cy="50" r="42" />,
  burst: <path d="M50 4v24M50 72v24M4 50h24M72 50h24M17 17l17 17M66 66l17 17M83 17 66 34M34 66 17 83" />,
  flower: <path d="M50 30a12 12 0 1 1 0-24 12 12 0 1 1 0 24zm0 64a12 12 0 1 1 0-24 12 12 0 1 1 0 24zM30 50a12 12 0 1 1-24 0 12 12 0 1 1 24 0zm64 0a12 12 0 1 1-24 0 12 12 0 1 1 24 0zM50 62a12 12 0 1 0 0-24 12 12 0 1 0 0 24z" />,
  zig: <path d="M4 60 24 20l20 40 20-40 20 40 20-40" />,
  arc: <path d="M6 90C6 40 40 6 94 6" />,
  dot: <circle cx="50" cy="50" r="30" />,
}
const VB = { wave: '0 0 200 80', zig: '0 0 108 80', loop: '0 0 200 110' }
export function Doodle({ kind = 'loop', className = '', style, fill = 'none', strokeWidth = 2 }) {
  return (
    <svg viewBox={VB[kind] || '0 0 100 100'} fill={fill} stroke="#383838" strokeWidth={strokeWidth} strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" preserveAspectRatio="none" className={`pointer-events-none ${className}`} style={style}>
      {SHAPES[kind]}
    </svg>
  )
}

/* Neutral play glyph for video placeholders (no embed). */
export function PlayFrame({ className = '', dark = true }) {
  return (
    <div className={`relative flex items-center justify-center ${dark ? 'bg-black' : 'bg-surface-2'} ${className}`} role="img" aria-label="Video placeholder">
      <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r="34" fill="none" stroke={dark ? '#FFFFFF' : '#383838'} strokeWidth="2" opacity="0.85" />
        <path d="M29 23v26l21-13z" fill={dark ? '#FFFFFF' : '#383838'} opacity="0.85" />
      </svg>
    </div>
  )
}

/* Small icons (generic geometry) */
export const Icon = {
  list: (p) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...p}>
      <path d="M7 5h10M7 10h10M7 15h10M3 5h1M3 10h1M3 15h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  ),
  arrowUp: (p) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...p}>
      <path d="M10 16V5M5.5 9.5 10 5l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  ),
  link: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a3 3 0 0 1 4.2 4.2l-2.1 2.1-1.4-1.4 2.1-2.1a1 1 0 0 0-1.4-1.4L12 13.4a1 1 0 0 1-1.4 0zM13.4 10.6a1 1 0 0 1 0 1.4l-3.5 3.5a3 3 0 0 1-4.2-4.2l2.1-2.1 1.4 1.4-2.1 2.1a1 1 0 0 0 1.4 1.4L12 10.6a1 1 0 0 1 1.4 0z" />
    </svg>
  ),
  calendar: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...p}>
      <rect x="2" y="3" width="12" height="11" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  pin: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" {...p}>
      <path d="M9 16s5-5 5-9A5 5 0 0 0 4 7c0 4 5 9 5 9z" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  star: (p) => (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" {...p}>
      <path d="M5 .5l1.3 3 3.2.3-2.4 2.1.7 3.2L5 7.4 2.2 9.1l.7-3.2L.5 3.8l3.2-.3z" fill="currentColor" />
    </svg>
  ),
  sliders: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...p}>
      <path d="M1 3.5h12M1 10.5h12" stroke="currentColor" strokeWidth="1.3" /><circle cx="4.5" cy="3.5" r="1.6" fill="#383838" stroke="currentColor" strokeWidth="1.3" /><circle cx="9.5" cy="10.5" r="1.6" fill="#383838" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
}

/* Generic image stand-in shortcuts */
export const Thumb = ({ className = '' }) => (
  <Placeholder ratio="16 / 9" bordered={false} rounded="" className={`!w-full ${className}`} label="Thumbnail" />
)
