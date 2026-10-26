import { Link } from 'react-router-dom'
import ArrowRight from './ArrowRight.jsx'

// Text link + trailing icon (PAGES_SPEC_COMPANY P1; the inline pattern in Integrations.jsx).
// Outer: flex, gap 6, 1px transparent border, r 2. Label: Inter 16/19.2 ls .32, padding 1px 0,
// margin-bottom 1px, 1px ink underline. Hover: 2px underline (#6FC2FF by default) with margin-bottom 0,
// so the height does not change. :active: text, underline and icon turn #6FC2FF.
//
// Element: `to` -> react-router <Link>; `href` -> <a>; `onClick` -> <button>; otherwise a non-link
// <span> with identical styling (used for external / out-of-scope destinations).
const ICONS = {
  right: (cls) => <ArrowRight className={cls} />,
  down: (cls) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`transition-transform duration-200 ease-in-out ${cls}`}>
      <path d="M10 4v11M5.5 11 10 15.5 14.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  ),
  left: (cls) => <ArrowRight className={`rotate-180 ${cls}`} />,
  plus: (cls) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cls}>
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  external: (cls) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cls}>
      <path d="M8 4.5H4.5v11h11V12M11 4.5h4.5V9M15.5 4.5 9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  ),
  reset: (cls) => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cls}>
      <path d="M4.5 10a5.5 5.5 0 1 0 1.6-3.9M4.5 3.5v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  ),
}

const LABEL_SIZES = {
  md: 'text-link-label',
  sm: 'text-[14px] leading-[19.2px] tracking-[0.32px]',
  // Original /customer-support cards: label 15/18 ls .3 below 960 (link 24.0 tall), 16/19.2 ls .32 at >=960 (25.2).
  'sm-below-lg': 'text-[15px] leading-[18px] tracking-[0.3px] lg:text-[16px] lg:leading-[19.2px] lg:tracking-[0.32px]',
}

export default function UnderlineLink({
  to,
  href,
  onClick,
  icon = 'right',          // 'right' | 'down' | 'left' | 'plus' | 'external' | 'reset' | null
  size = 'md',             // 'md' Inter 16/19.2 | 'sm' Inter 14/19.2 (marketing text-link-sm)
                           // | 'sm-below-lg' Inter 15/18 ls .3 <960, 16/19.2 ls .32 >=960 (support cards)
  bare = false,            // drop the 1px transparent border box + label bottom padding/margin (byline: 21.2 tall)
  inline = false,          // inline-flex wrapper (marketing TextLink) instead of flex
  tone = 'default',        // 'default' | 'muted' (careers CLEAR ALL: Inter 14/16.8 #666, icon before label)
  hoverTone = 'sky',       // 'sky' | 'ink' (book-brief chapter banner keeps the ink underline on hover)
  uppercase = false,
  iconSize,                // override icon box (book brief 18)
  className = '',
  labelClassName = '',
  children,
  ...rest
}) {
  const muted = tone === 'muted'
  const hover = hoverTone === 'ink' ? 'group-hover:border-ink' : 'group-hover:border-sky-hover'
  const cls = `group ${inline ? 'inline-flex' : 'flex w-fit'} items-center gap-[6px] rounded-sm ${bare ? 'border-0' : 'border border-transparent'} bg-transparent p-0 font-mono text-link-label no-underline ${
    muted ? 'flex-row-reverse text-gray-600' : 'text-ink'
  } active:text-sky-hover ${uppercase ? 'uppercase' : ''} ${className}`
  const label = (
    <span
      className={`${bare ? 'mb-0 pb-0 pt-[1px]' : 'mb-[1px] py-[1px]'} border-b font-sans ${muted ? 'text-link-muted' : LABEL_SIZES[size] || LABEL_SIZES.md} ${
        muted ? 'border-current' : 'border-ink'
      } group-hover:mb-0 group-hover:border-b-2 ${hover} group-active:border-sky-hover ${labelClassName}`}
    >
      {children}
    </span>
  )
  const iconEl = icon && ICONS[icon]
    ? ICONS[icon]('shrink-0')
    : null
  const sized = iconEl && iconSize ? <span className="flex shrink-0" style={{ width: iconSize, height: iconSize }}>{iconEl}</span> : iconEl
  const content = (
    <>
      {label}
      {sized}
    </>
  )
  if (to) return <Link to={to} className={cls} onClick={onClick} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} onClick={onClick} {...rest}>{content}</a>
  if (onClick) return <button type="button" className={`${cls} cursor-pointer`} onClick={onClick} {...rest}>{content}</button>
  return <span className={cls} {...rest}>{content}</span>
}
