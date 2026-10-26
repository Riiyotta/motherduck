// Shared micro-components for the marketing templates (PAGES_SPEC_MARKETING.md §3 "Shared micro-components").
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OffsetButton, UnderlineLink, ArrowRight } from '../ui'
import { ROUTES } from '../../routes.js'
import '../../styles/marketing.css'

export { usePrefersReducedMotion } from '../../lib/sim.js'

// ---------- Links (§6 rules) ----------
const PATTERNS = Object.values(ROUTES).flat().map((p) => new RegExp(`^${p.replace(/:[^/]+/g, '[^/]+')}$`))

// True when `path` (query / hash stripped) is a route in src/routes.js. Everything else
// (docs, auth, external, mailto, out-of-scope internal paths) renders as a non-link.
export function isRoute(path) {
  if (!path || typeof path !== 'string' || !path.startsWith('/')) return false
  const bare = path.split(/[?#]/)[0]
  return PATTERNS.some((re) => re.test(bare))
}

// Router navigation for <a href> elements that are not <Link>s (OffsetButton, card overlays).
export function useGo() {
  const navigate = useNavigate()
  return (to) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    navigate(to)
  }
}

// `TextLink` (§3) = the shared UnderlineLink primitive. `to` becomes a <Link> only for routes.js paths;
// `onClick` renders a <button>; otherwise a non-link span with identical styling.
export function TextLink({ to, size = 'md', icon = 'right', className = '', labelClassName = '', children, ...rest }) {
  const link = to && to.startsWith('#') ? { href: to } : isRoute(to) ? { to } : {}
  return (
    <UnderlineLink
      {...link}
      icon={icon}
      uppercase
      className={className}
      labelClassName={`${size === 'sm' ? '!text-link-sm' : ''} ${labelClassName}`}
      {...rest}
    >
      {children}
    </UnderlineLink>
  )
}

// OffsetButton wrapper: router paths get href + client-side navigation; anything else is a <button>.
export function Btn({ to, lead, children, ...rest }) {
  const go = useGo()
  const link = to && to.startsWith('#') ? { href: to } : isRoute(to) ? { href: to, onClick: go(to) } : {}
  return (
    <OffsetButton {...link} {...rest}>
      {lead}
      {children}
    </OffsetButton>
  )
}

// Inline text link inside body copy (underlined; style beyond inheriting the font is UNMEASURED).
export function InlineLink({ to, children }) {
  const go = useGo()
  if (isRoute(to)) return <a href={to} onClick={go(to)} className="text-inherit underline">{children}</a>
  return <span className="underline">{children}</span>
}

// ---------- Visual micro-components ----------

// `TagTitle` (§3): heading on an ink plate. tone 'ink' | 'sun' | 'coral'. Size/padding via className.
export function TagTitle({ as: Tag = 'h2', tone = 'ink', className = '', children, ...rest }) {
  const tones = {
    ink: 'bg-ink text-white',
    sun: 'bg-sun text-ink border-2 border-ink',
    coral: 'bg-coral-red text-ink',
  }
  return (
    <Tag className={`m-0 w-fit font-mono font-normal uppercase ${tones[tone]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// `Chip` (§3 hero eyebrow). `status` adds a 4×4 dot + Inter 12 label.
export function Chip({ status, className = '', tall = false, children }) {
  return (
    <p className={`m-0 flex w-fit items-center justify-center gap-[10px] px-[12px] py-[8px] font-mono uppercase text-ink ${tall ? 'text-chip-mono-tall' : 'text-chip-mono'} ${className || 'bg-sand-chip'}`}>
      <span>{children}</span>
      {status && (
        <>
          <svg width="4" height="4" viewBox="0 0 4 4" aria-hidden="true"><circle cx="2" cy="2" r="2" fill="currentColor" /></svg>
          <span className="font-sans text-[12px] normal-case leading-[12px]">{status}</span>
        </>
      )}
    </p>
  )
}

// `SectionHead` (§3): centred column, gap 12. H2 32/38.4 (24/28.8 below 1302) + lede-hero intro.
export function SectionHead({ title: h, children, className = '', h2Class = 'text-h2-mono-md xl:text-h2-mono-lg', pClass = 'text-lede-hero', as: H = 'h2', style }) {
  return (
    <div className={`mx-auto flex flex-col items-center gap-[12px] text-center ${className}`} style={style}>
      <H className={`m-0 font-mono font-normal uppercase text-ink ${h2Class}`}>{h}</H>
      {children && <p className={`m-0 font-sans text-ink ${pClass}`}>{children}</p>}
    </div>
  )
}

export function Check({ w = 12, h = 9, className = '' }) {
  return (
    <svg width={w} height={h} viewBox="0 0 12 9" fill="none" aria-hidden="true" className={className}>
      <path d="M1 4.5 4.3 7.8 11 1" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

// 32×32 sun check circle (ComparisonTable).
export function CheckCircle() {
  return (
    <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun text-ink">
      <Check />
    </span>
  )
}

// 24px check svg (tier lists, matrix booleans). Glyph colour/shape UNMEASURED: plain ink check.
export function Check24({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M5 12.5 9.8 17 19 7" stroke="#383838" strokeWidth="2" />
    </svg>
  )
}

export function Dash24() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M7 12h10" stroke="#818181" strokeWidth="1.5" />
    </svg>
  )
}

export function Chevron({ size = 24, open = false, rotate = 0, className = '', duration = 'duration-200' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      className={`shrink-0 transition-transform ${duration} ease-in-out ${className}`}
      style={{ transform: `rotate(${rotate + (open ? 180 : 0)}deg)` }}>
      <path d="M6 9.5 12 15.5 18 9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function QuoteMark({ w = 24, h = 22, className = '', style }) {
  return (
    <svg width={w} height={h} viewBox="0 0 24 22" fill="none" aria-hidden="true" className={`shrink-0 ${className}`} style={style}>
      <path d="M1 21V11.5C1 5.5 4 2 9.5 1v4C6.8 6 5.6 8 5.5 11H10v10H1Zm13 0V11.5C14 5.5 17 2 22.5 1v4c-2.7 1-3.9 3-4 6H23v10h-9Z" fill="#383838" />
    </svg>
  )
}

export function LeftArrow({ className = '' }) {
  return <ArrowRight className={`rotate-180 ${className}`} />
}

export function GitHubGlyph() {
  // Generic octocat-free "branch" glyph standing in for the GitHub icon.
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="4" cy="3.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4" cy="12.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 5.3v5.4M12 7.3c0 3-8 1.5-8 3.4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

// Leading 20px arrow used before "VIEW DOCUMENTATION" / "CONTACT US" (gap 8 comes from OffsetButton).
export const LeadArrow = <ArrowRight className="-my-[2px] shrink-0" />

// ---------- Hooks ----------

export function useMedia(query) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

// Calls `fn` every `ms` while `enabled`; restarts whenever `dep` changes (manual navigation resets the timer).
export function useAutoplay(fn, ms, enabled, dep) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    if (!enabled) return undefined
    const id = setInterval(() => ref.current(), ms)
    return () => clearInterval(id)
  }, [ms, enabled, dep])
}

// Sets `visible` once the element enters the viewport (stays true).
export function useInView(options = { threshold: 0.1 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return undefined
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, visible]
}

export function smoothScrollTo(el, offset = 0) {
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const y = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
}
