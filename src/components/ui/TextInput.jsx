import { useId, useState } from 'react'

// Optional leading glyph (PAGES_SPEC_CONTENT §4 search field): 24px at left 24 / top 18; the input and
// placeholder then start at 64. Pass icon="search" for the built-in magnifier, or any 24px node.
function SearchGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m15.25 15.25 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

// Floating-label text field (PAGES_SPEC_COMPANY P3). Controlled: pass value + onChange.
// - 58 tall, padding 16/40/16/24, 2px ink border, r 2, bg rgba(248,248,247,.7), Inter 16/25.6 ls .32.
// - Placeholder is a <p> (not the native attribute): left 24, vertically centred, Inter 16/22.4 300 #666.
// - Hover / focus: border #2BA5FF; focus: padding-right 24.
// - variant 'float' (product expert, book brief): placeholder moves above the field on focus / when
//   filled (top -5, left 0, translateY(-100%), Inter 12/16.8 400 ink).
//   variant 'hide' (LP forms): placeholder hidden on focus / when filled.
// - Filled + valid after blur: border rgba(6,132,117,.804). `error` (string) -> #E23F35 border and
//   "↳ <error>" message directly under the field, Inter 12/19.2 300.
// - multiline: textarea, 114 min height, placeholder at y 18 (Inter 16/25.6, wraps), native resize handle.
export default function TextInput({
  label,                // visible placeholder text; also the sr-only <label>
  value = '',
  onChange,
  onBlur,
  onFocus,
  variant = 'float',    // 'float' | 'hide'
  multiline = false,
  error,                // string message or falsy
  valid,                // optional override for the filled-valid state (default: non-empty)
  type = 'text',
  name,
  id,
  className = '',       // wrapper
  inputClassName = '',
  icon,                 // optional: 'search' or a 24px node (adds 64px left padding)
  errorFloat = false,   // error message absolutely positioned 1px below the field (no layout shift; product expert)
  ...rest
}) {
  const autoId = useId()
  const fieldId = id || `ti-${autoId}`
  const [focused, setFocused] = useState(false)
  const [blurred, setBlurred] = useState(false)
  const filled = String(value).length > 0
  const isValid = valid ?? filled
  const raised = focused || filled

  let border = 'border-ink hover:border-sky-dark'
  if (error) border = 'border-error'
  else if (focused) border = 'border-sky-dark'
  else if (blurred && filled && isValid) border = 'border-valid hover:border-sky-dark'

  const Field = multiline ? 'textarea' : 'input'
  const fieldCls = `block w-full rounded-sm border-2 ${border} bg-[rgba(248,248,247,0.7)] py-[16px] ${icon ? 'pl-[64px]' : 'pl-[24px]'} ${
    focused ? 'pr-[24px]' : 'pr-[40px]'
  } font-sans text-input text-ink outline-none [transition:all_.2s_ease-in-out,padding_0s] ${
    multiline ? 'min-h-[114px] resize-y overflow-auto' : 'h-[58px]'
  } ${inputClassName}`

  let ph
  if (variant === 'float' && raised) {
    ph = 'left-0 top-[-5px] -translate-y-full font-normal text-input-float text-ink'
  } else if (multiline) {
    // Original textarea placeholder: left 24 / right 0 (box = field width - 24), white-space break-spaces, so long
    // labels wrap onto more lines instead of ellipsing.
    ph = 'left-[24px] right-0 top-[18px] whitespace-break-spaces text-input text-gray-600 font-light'
  } else {
    // ls .32 measured on every original form (product expert, LP guide, startups, blog search + newsletter).
    ph = `${icon ? 'left-[64px]' : 'left-[24px]'} top-1/2 -translate-y-1/2 text-input-ph tracking-[0.32px] text-gray-600`
  }
  const wrap = multiline && !(variant === 'float' && raised) ? '' : 'text-ellipsis whitespace-nowrap'
  const hidden = variant === 'hide' && raised

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={fieldId} className="sr-only">{label}</label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-[24px] top-[18px] z-[1] flex h-[24px] w-[24px] text-ink">
            {icon === 'search' ? <SearchGlyph /> : icon}
          </span>
        )}
        <Field
          id={fieldId}
          name={name}
          type={multiline ? undefined : type}
          value={value}
          onChange={onChange}
          onFocus={(e) => { setFocused(true); onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); setBlurred(true); onBlur?.(e) }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-err` : undefined}
          className={fieldCls}
          {...rest}
        />
        <p
          aria-hidden="true"
          className={`pointer-events-none absolute m-0 max-w-full overflow-hidden ${wrap} pr-[40px] font-sans transition-all duration-150 ease-out ${ph} ${
            hidden ? 'hidden' : ''
          }`}
        >
          {label}
        </p>
      </div>
      {error && (
        <p id={`${fieldId}-err`} role="alert" className={`m-0 w-full font-sans text-input-error text-error ${errorFloat ? 'absolute left-0 top-[calc(100%+1px)]' : ''}`}>
          ↳ {error}
        </p>
      )}
    </div>
  )
}
