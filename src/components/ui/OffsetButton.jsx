import { Link } from 'react-router-dom'
import ArrowRight from './ArrowRight.jsx'

// Primary / secondary offset button (spec §2d).
// 43.8px tall (measured: 16.8 line + 23 padding + 4 border; spec rounds to 44), padding 11.5px 18px, 2px ink border, r 2, Inter 14/16.8 UPPER.
// Hover translate(7px,-7px) 120ms ease-in-out; :active back to 0,0 in 30ms with
// primary bg #6FC2FF / secondary bg #E1D6CB.
const VARIANTS = {
  primary: { bg: '#97D4FF', active: '#6FC2FF' },   // sky / sky-hover
  secondary: { bg: '#F4EFEA', active: '#E1D6CB' }, // cream / sand-dark
  // PAGES_SPEC_MARKETING §2d. white: press bg UNMEASURED (kept white).
  white: { bg: '#FFFFFF', active: '#FFFFFF' },
  // Hypertenancy hero: white 2px border, white text, white backing layer.
  ht: { bg: '#1276BF', active: '#1276BF', light: true },
  'ht-dark': { bg: '#383838', active: '#383838', light: true },
}

// size: 'md' = homepage default (43.8 tall, Inter 14/16.8, padding 11.5/18).
//       'lg' = company pages (PAGES_SPEC_COMPANY P2: 56.2 tall, Inter 16/19.2, padding 16.5/22).
//       'xl' = book-brief submit (57.7 tall, padding 17.25/23).
const SIZES = {
  md: 'h-[43.8px] px-[18px] py-[11.5px] text-button',
  lg: 'h-[56.2px] px-[22px] py-[16.5px] text-button-lg',
  xl: 'h-[57.7px] px-[23px] py-[17.25px] text-button-lg',
  // PAGES_SPEC_MARKETING §2d pricing tier CTA: 52 tall, padding 15, Inter 15/18 centred (pass fullWidth).
  tier: 'h-[52px] p-[15px] text-[15px] leading-[18px] font-normal',
  // PAGES_SPEC_CONTENT §4 newsletter Submit (111.7x58, padding 17.4/23, Inter 16/19.2).
  submit: 'h-[58px] px-[23px] py-[17.4px] text-button-lg',
  // Same as `submit` but content-driven height (19.2 line + 2x17.4 padding + 4 border = 58.0 at the defaults);
  // for call sites that change the padding per breakpoint instead of forcing `!h-auto`.
  'submit-auto': 'h-auto px-[23px] py-[17.4px] text-button-lg',
  // PAGES_SPEC_CONTENT §4 icon-only squares (border-box; pass the 20px icon as children).
  'icon-44': 'h-[44px] w-[44px] px-[10px] py-[12px]',        // read-next arrows
  'icon-54': 'h-[50px] w-[54px] p-[15px]',                   // case carousel arrows (>=960)
  'icon-42': 'h-[38px] w-[42px] p-[10px]',                   // case carousel arrows (MD)
  'icon-54-md': 'h-[38px] w-[42px] p-[10px] lg:h-[50px] lg:w-[54px] lg:p-[15px]', // 42x38 <960, 54x50 >=960
  'icon-60': 'h-[56px] w-[60px] p-[18px]',                   // video TOC FAB
  'icon-64': 'h-[60px] w-[64px] p-[20px]',                   // back-to-top
}

export default function OffsetButton({
  variant = 'primary',
  href,                 // renders <a> when set, otherwise <button>
  to,                   // renders a react-router <Link> when set (internal routes)
  arrow = false,        // trailing 20x20 arrow icon (margin -2px 0)
  fullWidth = false,    // stretch wrapper + button (hero CTAs <728)
  disabled = false,
  size = 'md',
  // Company P2 disabled look (text #666, bg #F8F8F7, border #818181, no lift, cursor pointer).
  // Opt-in so existing call sites that pass `disabled` keep their previous look.
  disabledStyle = false,
  leadingIcon,          // node rendered before the label (gap 8), e.g. docs arrow / GitHub glyph
  noLift = false,       // keep the button enabled but drop its own hover lift (content event rows)
  wrapperClassName = '',
  className = '',
  children,
  ...rest
}) {
  const v = VARIANTS[variant]
  const Inner = to ? Link : href ? 'a' : 'button'
  const muted = disabled && disabledStyle
  const tint = muted
    ? { '--lift-bg': '#F8F8F7', '--lift-active-bg': '#F8F8F7' }
    : { '--lift-bg': v.bg, '--lift-active-bg': v.active }
  return (
    <span
      className={`lift ${fullWidth ? 'flex w-full' : 'inline-flex'} ${wrapperClassName}`}
      data-hover="always"
      data-disabled={disabled || noLift || undefined}
      style={{ '--lift': '7px', '--lift-press': '30ms', ...tint, ...(v.light && { backgroundColor: '#FFFFFF' }) }}
    >
      <Inner
        {...(to ? { to } : href ? { href } : { type: rest.type || 'button', disabled })}
        {...rest}
        data-tint
        className={`lift-inner flex ${SIZES[size] || SIZES.md} items-center justify-center gap-[8px] whitespace-nowrap rounded-sm border-2 font-sans uppercase no-underline ${muted ? 'cursor-pointer border-gray-500 text-gray-600' : v.light ? 'border-white text-white' : 'border-ink text-ink'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-hover ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {leadingIcon}
        {children}
        {arrow && <ArrowRight className="-my-[2px] shrink-0" />}
      </Inner>
    </span>
  )
}
