// Generic outline cloud (ASSET_MANIFEST "Cloud outline", viewBox 0 0 86 40). Original path.
export default function Cloud({ fillClass = 'fill-surface-0', strokeWidth = 1.5, className = '', style }) {
  return (
    <svg viewBox="0 0 86 40" fill="none" aria-hidden="true" className={className} style={style}>
      <path
        d="M14 38C6.5 38 1 33.6 1 28s5.5-9.8 12.3-9.8c.9 0 1.7.1 2.5.2C17.6 11 24 6 31.5 6c2.8 0 5.4.6 7.6 1.8C42.3 3.6 47.4 1 53 1c8.8 0 16 6.2 17 14.3C78.5 15.6 85 21 85 27.4 85 33.4 79.5 38 72.5 38z"
        className={`stroke-ink ${fillClass}`}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
