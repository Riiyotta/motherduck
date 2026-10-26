// Small shared company-page pieces: TiltedTag (P5), TickerBand (P6), Chevron, decor shapes (P7).

// P5 rotated label sticker. Mono heading in a 2px ink box, padding 8/30, sits on a section top border.
export function TiltedTag({ as: Tag = 'h2', bg, rotate = 0, className = '', style, children }) {
  return (
    <Tag
      className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} z-[1] m-0 w-fit border-2 border-ink px-[30px] py-[8px] font-mono font-normal uppercase text-ink ${className}`}
      style={{ background: bg, transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
    >
      {children}
    </Tag>
  )
}

// P6 static marquee strip (not animated: spec measured zero movement). Full-bleed, flex centre, overflow hidden.
export function TickerBand({ label, count, spanClassName = '', className = '', style, ariaHidden = true }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={`flex justify-center overflow-hidden whitespace-nowrap ${className}`}
      style={style}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`shrink-0 py-[16px] font-mono uppercase ${spanClassName}`}>
          {label}
        </span>
      ))}
    </div>
  )
}

export function Chevron({ size = 24, open = false, dir = 'down', className = '', duration = 'duration-200' }) {
  const rot = { down: 0, up: 180, left: 90, right: -90 }[dir]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      className={`shrink-0 transition-transform ${duration} ease-in-out ${className}`}
      style={{ transform: `rotate(${rot + (open ? 180 : 0)}deg)` }}>
      <path d="M6 9.5 12 15.5 18 9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// P7 decor doodle (generic geometric outline, no brand marks).
export function Doodle({ kind = 'star', size = 60, className = '', style }) {
  const paths = {
    star: <path d="M30 4 36 24 56 30 36 36 30 56 24 36 4 30 24 24Z" />,
    diamond: <path d="M30 4 56 30 30 56 4 30Z" />,
    cloud: <path d="M14 44h34a10 10 0 0 0 0-20 14 14 0 0 0-27-4A12 12 0 0 0 14 44Z" />,
    xcircle: <><circle cx="30" cy="30" r="24" /><path d="M20 20 40 40M40 20 20 40" /></>,
    blob: <path d="M30 6c14 0 24 8 24 22s-12 26-26 26S6 46 6 32 16 6 30 6Z" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="#383838" strokeWidth="2"
      aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      {paths[kind]}
    </svg>
  )
}
