// Shared motion helpers. Behaviour mirrors the original's measured implementation:
// - typing sims advance through numbered stages; a stage either streams text with a
//   setInterval typewriter (speedMs per tick, charsPerTick chars) and advances when done,
//   or waits a fixed timer (ms) before advancing.
// - sims start once their container is >=30% visible (IntersectionObserver threshold 0.3,
//   triggerOnce) and never loop. Panels remount on tab activation, so a selected tab replays.
// - continuous CSS loops only run while their container is within 200px (vertically) of the
//   viewport (IntersectionObserver rootMargin "200px 0% 200px 0%").
// - prefers-reduced-motion: sims render their final stage immediately.
import { Fragment, createElement, useCallback, useEffect, useRef, useState } from 'react'

const RM_QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(RM_QUERY).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(RM_QUERY)
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

// Returns [ref, inView]. once=true latches the first true value (triggerOnce).
export function useInView({ threshold = 0, rootMargin = '0px', once = false } = {}) {
  const [inView, setInView] = useState(false)
  const [node, setNode] = useState(null)
  const ref = useCallback((el) => setNode(el), [])
  useEffect(() => {
    if (!node) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        // Same rule as react-intersection-observer (used by the original): the initial callback
        // reports isIntersecting for any overlap, so also require ratio >= threshold.
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [node, threshold, rootMargin, once])
  return [ref, inView]
}

// Continuous-loop gate (wires, sun rays, glow): returns [ref, inView] with the original's margin.
export const LOOP_MARGIN = '200px 0% 200px 0%'
export const useLoopInView = () => useInView({ rootMargin: LOOP_MARGIN })

// Stage machine (original: stage -1 idle -> 0 once animate && inView; timers[n] advances n -> n+1).
export function useSimStage({ animate, inView, last, timers = {} }) {
  const [stage, setStage] = useState(() => (animate ? -1 : last))
  const advance = useCallback((n) => setStage((s) => (s < n ? n : s)), [])
  useEffect(() => {
    if (!animate) setStage(last)
  }, [animate, last])
  useEffect(() => {
    if (animate && inView) advance(0)
  }, [animate, inView, advance])
  useEffect(() => {
    const ms = timers[stage]
    if (ms === undefined) return undefined
    const t = setTimeout(() => advance(stage + 1), ms)
    return () => clearTimeout(t)
  }, [stage, timers, advance])
  return { stage, advance }
}

// setInterval typewriter: first chars appear after one tick.
export function useTypewriter(text, { speedMs = 24, charsPerTick = 1 } = {}) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const id = setInterval(() => {
      setN((c) => {
        const next = c + charsPerTick
        if (next >= text.length) {
          clearInterval(id)
          return text.length
        }
        return next
      })
    }, speedMs)
    return () => clearInterval(id)
  }, [text, speedMs, charsPerTick])
  return { text: text.slice(0, n), done: n >= text.length }
}

// Streams `text`, calls onDone once complete. Rendered inline so it inherits font/colour.
export function Typewriter({ text, speedMs, charsPerTick, onDone }) {
  const { text: shown, done } = useTypewriter(text, { speedMs, charsPerTick })
  const cb = useRef(onDone)
  cb.current = onDone
  useEffect(() => {
    if (done) cb.current?.()
  }, [done])
  return createElement('span', null, shown)
}

// Renders `text` streamed while `stage === at`, in full once `stage > at`.
export function Streamed({ stage, at, text, speedMs, charsPerTick, advance }) {
  if (stage > at) return text
  return createElement(Typewriter, { text, speedMs, charsPerTick, onDone: () => advance(at + 1) })
}

// Segmented stream (original t3/t4): the concatenated text types at speedMs; each segment renders
// through its own `render` (e.g. bold or code chip) as its characters arrive.
const renderSegs = (segments, shown) => {
  let at = 0
  return segments.map((seg, i) => {
    const part = shown.slice(at, at + seg.text.length)
    at += seg.text.length
    if (!part) return null
    return createElement(Fragment, { key: i }, seg.render ? seg.render(part) : part)
  })
}
function SegmentTypewriter({ segments, speedMs, charsPerTick, onDone }) {
  const full = segments.map((s) => s.text).join('')
  const { text: shown, done } = useTypewriter(full, { speedMs, charsPerTick })
  const cb = useRef(onDone)
  cb.current = onDone
  useEffect(() => {
    if (done) cb.current?.()
  }, [done])
  return createElement(Fragment, null, renderSegs(segments, shown))
}
export function StreamedSegments({ stage, at, segments, speedMs, charsPerTick, advance }) {
  const full = segments.map((s) => s.text).join('')
  if (stage > at) return createElement(Fragment, null, renderSegs(segments, full))
  return createElement(SegmentTypewriter, { segments, speedMs, charsPerTick, onDone: () => advance(at + 1) })
}
