import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { matchPath, useSearchParams } from 'react-router-dom'
import { ROUTES, EXCLUDED_PREFIXES } from '../../routes.js'
import { usePrefersReducedMotion } from '../../lib/sim.js'

export { usePrefersReducedMotion }

/* ---------- §10 link resolution ---------- */
const PATTERNS = Object.values(ROUTES).flat()
// Returns the router path for internal destinations that exist in src/routes.js, otherwise null
// (render a non-link with the same styling). Absolute same-site URLs are stripped to their path.
export function internalPath(href) {
  if (!href) return null
  let path = href.replace(/^https?:\/\/(www\.)?motherduck\.com/, '')
  if (!path.startsWith('/') || EXCLUDED_PREFIXES.some((p) => path.startsWith(p))) return null
  const [pathAndQuery, hash] = path.split('#')
  const [pathname, query] = pathAndQuery.split('?')
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  if (clean === '/' || PATTERNS.some((p) => matchPath(p, clean))) {
    return `${clean}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
  }
  return null
}

/* ---------- media query ---------- */
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

/* ---------- §2 scroll reveal ----------
   Live (/blog @1440, default and prefers-reduced-motion: reduce alike): a card starts its 0.5s fade/slide-up once its
   (translated) top passes innerHeight - 25px, fires once; cards jumped past stay hidden; cards already in view at
   mount show without animating. The original does not honour reduced motion here, so neither does the clone. */
export function useReveal(enabled = true) {
  const ref = useRef(null)
  const [state, setState] = useState(enabled ? 'hidden' : 'instant')
  useLayoutEffect(() => {
    if (!enabled) { setState('instant'); return undefined }
    const el = ref.current
    if (!el) return undefined
    if (el.getBoundingClientRect().top <= window.innerHeight - 25) { setState('instant'); return undefined }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState('visible'); io.disconnect() }
    }, { rootMargin: '0px 0px -25px 0px', threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [enabled])
  const cls = !enabled ? '' : state === 'hidden' ? 'ct-reveal' : state === 'visible' ? 'ct-reveal ct-visible' : 'ct-reveal ct-visible ct-instant'
  return [ref, cls]
}

/* ---------- §3d scroll-linked doodles: translateY = base + k * scrollY ---------- */
export function useScrollY(enabled = true) {
  const reduced = usePrefersReducedMotion()
  const [y, setY] = useState(0)
  useEffect(() => {
    if (!enabled || reduced) { setY(0); return undefined }
    let raf = 0
    const on = () => {
      if (raf) return
      raf = requestAnimationFrame(() => { raf = 0; setY(window.scrollY) })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf) }
  }, [enabled, reduced])
  return y
}

/* ---------- URL params ---------- */
export function useParams() {
  const [params, setParams] = useSearchParams()
  const set = useCallback((patch, { keepPage = false } = {}) => {
    const next = new URLSearchParams(window.location.search)
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === undefined || v === '') next.delete(k)
      else next.set(k, v)
    }
    if (!keepPage) next.set('page', '1')
    setParams(next, { replace: true, preventScrollReset: true })
  }, [setParams])
  const clear = useCallback(() => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true }), [setParams])
  return [params, set, clear]
}

const pageFromUrl = () => {
  const n = parseInt(new URLSearchParams(window.location.search).get('page') || '1', 10)
  return Number.isFinite(n) && n > 0 ? n : 1
}
// Writes ?page=N without a router navigation (original: history.replaceState).
export function replacePageParam(n) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', String(n))
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
}

/* ---------- F9 infinite scroll ----------
   pageSizes: [first, rest]. Direct ?page=N renders pages 1..N cumulatively. `resetKey` (filters) returns to
   the URL page (page=1 after a filter change).
   Live (/duckdb-news, /blog @1440 and @390): the next page is requested once the hidden "Load more" link's top is
   ~88px above the viewport bottom (the clone's sentinel sits at the link's top), and the cards land ~1.2-2.4s later
   (prefetched JSON + render), with no spinner. `offset` = sentinel top threshold relative to innerHeight. */
export function useInfinite({ total, first, rest, resetKey = '', delay = 1200, offset = -88, cumulative = true, updateUrl = true }) {
  const pagesFor = (n) => (n <= first ? 1 : 1 + Math.ceil((n - first) / rest))
  const maxPages = Math.max(1, pagesFor(total))
  const [pages, setPages] = useState(() => Math.min(pageFromUrl(), maxPages))
  const [startAt, setStartAt] = useState(() => Math.min(pageFromUrl(), maxPages))
  const [loading, setLoading] = useState(false)
  const busy = useRef(false)
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return }
    const p = Math.min(pageFromUrl(), maxPages)
    setPages(p)
    setStartAt(p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])
  const startPage = cumulative ? 1 : startAt
  const count = (n) => (n <= 0 ? 0 : Math.min(total, first + (n - 1) * rest))
  const from = count(startPage - 1)
  const to = count(pages)
  const hasMore = pages < maxPages
  const loadMore = useCallback(() => {
    if (busy.current || !hasMore) return
    busy.current = true
    setLoading(true)
    setTimeout(() => {
      setPages((p) => {
        const n = p + 1
        if (updateUrl) replacePageParam(n)
        return n
      })
      setLoading(false)
      busy.current = false
    }, delay)
  }, [hasMore, delay, updateUrl])
  // Scroll anchoring would keep the footer pinned while cards are appended above it, re-triggering loads.
  useEffect(() => {
    const de = document.documentElement
    const prev = de.style.overflowAnchor
    de.style.overflowAnchor = 'none'
    return () => { de.style.overflowAnchor = prev }
  }, [])
  // sentinel
  const [node, setNode] = useState(null)
  const sentinelRef = useCallback((el) => setNode(el), [])
  // Fires once the sentinel top is `offset` px from the viewport bottom or already above it (a scroll-position
  // check rather than an IntersectionObserver so jumps past the sentinel - End key, scrollbar drag - still load).
  useEffect(() => {
    if (!node || !hasMore) return undefined
    let raf = 0
    const check = () => {
      raf = 0
      if (node.getBoundingClientRect().top <= window.innerHeight + offset) loadMore()
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(check) }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [node, hasMore, loadMore, pages, offset])
  return { from, to, pages, hasMore, loading, loadMore, sentinelRef }
}

/* ---------- B1/V5 scroll-spy ----------
   Live (1440x900 and 1440x700): an item turns 600 once its H2 top is <= 26% of the viewport height (234 / 182px);
   nothing is active above the first H2 (all 300 at load). */
export function useScrollSpy(ids, ratio = 0.26) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let raf = 0
    const on = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const line = window.innerHeight * ratio
        let cur = null
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) cur = id
        }
        setActive(cur)
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf) }
  }, [ids, ratio])
  return active
}

// Instant jump, no hash change. Live @1440 the clicked H2 lands 172px below the viewport top
// (2 x its 86px scroll-margin-top); the same 2x rule is used at the other widths.
export function jumpTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const m = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 2 * m, behavior: 'auto' })
}

/* ---------- click outside ---------- */
export function useOutside(ref, onOut, active) {
  useEffect(() => {
    if (!active) return undefined
    const on = (e) => { if (ref.current && !ref.current.contains(e.target)) onOut() }
    document.addEventListener('mousedown', on)
    return () => document.removeEventListener('mousedown', on)
  }, [ref, onOut, active])
}

/* ---------- autoplay with pause ---------- */
export function useInterval(fn, ms, enabled) {
  const cb = useRef(fn)
  cb.current = fn
  useEffect(() => {
    if (!enabled) return undefined
    const id = setInterval(() => cb.current(), ms)
    return () => clearInterval(id)
  }, [ms, enabled])
}

/* ---------- debounced value ---------- */
export function useDebounced(value, ms = 250) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}
