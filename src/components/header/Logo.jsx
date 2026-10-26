// Original geometric placeholder wordmark (ASSET_MANIFEST "Logo": viewBox 0 0 210 37).
// Rendered 174x31 (>=1302) / 154x27 (<1302) in the header. Not the brand mark.
export default function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 210 37" fill="none" aria-hidden="true" className={`text-ink ${className}`}>
      <rect x="1" y="4" width="29" height="29" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 26V11l14 15V11" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <text
        x="42"
        y="26"
        fill="currentColor"
        fontFamily='"Space Grotesk", sans-serif'
        fontSize="19"
        letterSpacing="1.2"
      >
        NORTHWIND
      </text>
    </svg>
  )
}
