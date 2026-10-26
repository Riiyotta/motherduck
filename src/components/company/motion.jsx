import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/sim.js'

// Careers `.scroll-animate-*` reveal (spec §6): `scroll-animate-visible` is added once the element's
// top is about 750px from the viewport top, and stays.
export function Reveal({ as: Tag = 'div', dir = 'up', duration = 1, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return undefined
    const check = () => {
      if (el.getBoundingClientRect().top < 750) setVisible(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [visible])
  return (
    <Tag
      ref={ref}
      className={`scroll-animate-${dir} ${visible ? 'scroll-animate-visible' : ''} ${className}`}
      style={{ '--reveal-dur': `${duration}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Scroll-linked parallax (spec §6 "kWWtop"): translateY interpolates linearly from `from` to `to`
// while the element crosses the viewport. Static under prefers-reduced-motion.
export function Parallax({ from, to, className = '', style, children }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [y, setY] = useState(from)
  useEffect(() => {
    if (reduced) { setY(0); return undefined }
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.parentElement.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      setY(from + (to - from) * p)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [from, to, reduced])
  return (
    <div ref={ref} className={`[transition:opacity_.3s_ease-out] ${className}`} style={{ transform: `translateY(${y}px)`, ...style }}>
      {children}
    </div>
  )
}

// height 0 -> auto collapsible (values cards .125s, legal TOC .2s).
export function Collapse({ open, duration = 125, className = '', extraOpenStyle, children }) {
  const inner = useRef(null)
  const [h, setH] = useState(0)
  useEffect(() => {
    if (!inner.current) return undefined
    const ro = new ResizeObserver(() => setH(inner.current.scrollHeight))
    ro.observe(inner.current)
    return () => ro.disconnect()
  }, [])
  return (
    <div
      className={`overflow-hidden ease-in-out ${className}`}
      style={{
        height: open ? h : 0,
        transitionProperty: 'height, margin-top',
        transitionDuration: `${duration}ms`,
        ...(open ? extraOpenStyle : null),
      }}
      aria-hidden={!open}
    >
      <div ref={inner}>{children}</div>
    </div>
  )
}

export function useMedia(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}
