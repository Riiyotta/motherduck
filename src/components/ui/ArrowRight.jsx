// Generic right arrow (viewBox 0 0 20 20, ASSET_MANIFEST "Arrow right"). Path geometry is generic.
export default function ArrowRight({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
