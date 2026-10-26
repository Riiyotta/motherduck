import { useId } from 'react'

// Checkbox row (PAGES_SPEC_COMPANY P4). Hidden native input covers the whole row (opacity 0,
// cursor pointer). Visible box 18x18, 2px ink border, r 2, centred 10x7 check. Label Inter 16/25.6
// (size 'sm' = 14/22.4, book brief), padding-left 11. Hover / focus: box border #2BA5FF.
// variant 'outline' (LP): transparent box, ink check. 'solid' (book brief): ink box, white check.
// Unchecked: check opacity 0.
export default function Checkbox({ label, checked, onChange, variant = 'outline', size = 'md', className = '', ...rest }) {
  const id = useId()
  const solid = variant === 'solid'
  return (
    <div className={`group relative flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer absolute inset-0 z-[1] m-0 h-full w-full cursor-pointer opacity-0"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border-2 border-ink group-hover:border-sky-dark peer-focus-visible:border-sky-dark ${
          solid && checked ? 'bg-ink' : 'bg-transparent'
        }`}
      >
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" className={checked ? 'opacity-100' : 'opacity-0'}>
          <path d="M1 3.5 3.8 6 9 1" stroke={solid ? '#FFFFFF' : '#383838'} strokeWidth="1.5" />
        </svg>
      </span>
      <label htmlFor={id} className={`pl-[11px] font-sans text-ink ${size === 'sm' ? 'text-check-label-sm' : 'text-check-label'}`}>
        {label}
      </label>
    </div>
  )
}
