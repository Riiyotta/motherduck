// Nav chevron (ASSET_MANIFEST: 20x20, viewBox 0 0 24 24, stroke ink). Rotates 180deg when open,
// transition transform 200ms ease-in-out (desktop nav); the mobile menu groups use 150ms (measured).
export default function Chevron({ open = false, size = 20, duration = 'duration-200', className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...rest}
      className={`shrink-0 text-ink transition-transform ${duration} ease-in-out ${open ? 'rotate-180' : ''} ${className}`}
    >
      <path d="M6 9.5 12 15.5 18 9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
