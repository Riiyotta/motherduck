// Icon tooltip (spec §6 "Tooltip"): absolute, top -36px, centred via translateX(-50%), bg ink,
// Inter 12/16 white, padding 6 8, flex gap 4 with a 16px external-link icon, z 4.
// Opacity 0 -> 1 on parent hover (parent needs `group`), 150ms ease-in-out.
// ::after: 4px CSS triangle (#383838 transparent transparent) at top 100%, centred.
export function ExternalIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M6 4h6v6M12 4 5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  )
}

export default function Tooltip({ children, rounded = '', className = '' }) {
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute left-1/2 top-[-36px] z-[4] flex -translate-x-1/2 items-center gap-[4px] whitespace-nowrap bg-ink px-[8px] py-[6px] font-sans text-tooltip text-white opacity-0 transition-opacity duration-150 ease-in-out after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[4px] after:border-transparent after:border-t-ink after:content-[''] group-hover:opacity-100 group-focus-visible:opacity-100 ${rounded} ${className}`}
    >
      {children}
      <ExternalIcon />
    </span>
  )
}
