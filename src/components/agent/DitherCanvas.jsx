import { useEffect, useRef } from 'react'
import { useInView, usePrefersReducedMotion } from '../../lib/sim.js'

// Spec §8 dither strip / §11 #23 -- algorithm and timing read from the original bundle:
// - buffer: cols = ceil(parent.clientWidth / 8) + 1, rows = 60; CSS width = 8 * cols, height 480,
//   image-rendering: pixelated. Colour #F9EE3E (text-yellow token) at alpha 255 or 0.
// - per pixel: 8x8 Bayer ordered dither against a density ramp of the row index (0 at the top ->
//   1 at row 29+), whose row is "warped" by 3D value noise (variant warp, speed .5, amplitude .2,
//   scale .1) so the edge drifts over time.
// - redraw throttled to 30fps (>= 33.33ms between frames) on requestAnimationFrame.
// - runs only while the canvas is within 200px of the viewport (IO rootMargin "200px 0% 200px 0%").
// - reduced motion: a single static frame at t = 0.
const ROWS = 60
const PX = 8
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22], [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21],
]
const THRESH = new Float64Array(64)
for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) THRESH[8 * y + x] = (BAYER[y][x] + 0.5) / 64
const RAMP = [[0, 0], [1, 1 / 16], [5, 1 / 4], [9, 3 / 8], [13, 0.5], [17, 5 / 8], [21, 13 / 16], [25, 15 / 16], [29, 1]]
const ramp = (r) => {
  if (r <= RAMP[0][0]) return RAMP[0][1]
  const lastP = RAMP[RAMP.length - 1]
  if (r >= lastP[0]) return lastP[1]
  for (let i = 1; i < RAMP.length; i++) {
    const [x1, y1] = RAMP[i]
    if (r <= x1) {
      const [x0, y0] = RAMP[i - 1]
      return y0 + ((y1 - y0) * (r - x0)) / (x1 - x0)
    }
  }
  return lastP[1]
}
const hash = (x, y, z) => {
  let h = Math.imul(x, 0x165667b1) ^ Math.imul(y, 0x27d4eb2f) ^ Math.imul(z, 0x4bf19f61)
  h = Math.imul(h ^ (h >>> 13), 0x4bf19f61)
  return ((h ^ (h >>> 16)) >>> 0) / 0xffffffff
}
const smooth = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t
const noise = (x, y, z) => {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const u = smooth(x - xi), v = smooth(y - yi), w = smooth(z - zi)
  const a = lerp(hash(xi, yi, zi), hash(xi + 1, yi, zi), u)
  const b = lerp(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u)
  const c = lerp(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u)
  const d = lerp(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u)
  return Math.max(-1, Math.min(1, (lerp(lerp(a, b, v), lerp(c, d, v), w) - 0.5) * 3.4))
}
const SPEED = 0.5, AMP = 0.2, SCALE = 0.1
const density = (x, y, t) => {
  const base = ramp(y)
  const k = 4 * base * (1 - base) * AMP
  if (k === 0) return base
  const z = t * SPEED
  const warp = noise(x * SCALE * 0.5, y * SCALE * 0.5, 0.3 * z)
  return ramp(y + noise(x * SCALE + warp, y * SCALE, z) * k * 26)
}

export default function DitherCanvas() {
  const ref = useRef(null)
  const [ioRef, inView] = useInView({ rootMargin: '200px 0% 200px 0%' })
  const reduced = usePrefersReducedMotion()
  const setRef = (el) => {
    ref.current = el
    ioRef(el)
  }

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return undefined
    const ctx = canvas.getContext('2d')
    const [r, g, b] = getComputedStyle(canvas).color.match(/\d+/g).map(Number)
    let img = null
    let cols = 0
    let raf = 0
    let last = 0
    let t0 = 0

    const resize = () => {
      const n = Math.max(1, Math.ceil(parent.clientWidth / PX) + 1)
      if (n === cols) return
      cols = n
      canvas.width = n
      canvas.height = ROWS
      canvas.style.width = `${PX * n}px`
      img = ctx.createImageData(n, ROWS)
    }
    const draw = (t) => {
      if (!img) return
      const data = img.data
      for (let y = 0; y < ROWS; y++) {
        const row = (y % 8) * 8
        for (let x = 0; x < cols; x++) {
          const on = density(x, y, t) > THRESH[row + (x % 8)]
          const i = (y * cols + x) * 4
          data[i] = r
          data[i + 1] = g
          data[i + 2] = b
          data[i + 3] = on ? 255 : 0
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw(t0 ? (performance.now() - t0) / 1000 : 0)
    })
    ro.observe(parent)
    if (reduced || !inView) {
      draw(0)
      return () => ro.disconnect()
    }
    t0 = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (now - last < 1000 / 30) return
      last = now
      draw((now - t0) / 1000)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [inView, reduced])

  return (
    <canvas
      ref={setRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-8px] left-1/2 h-[480px] w-[calc(100vw+8px)] -translate-x-1/2 text-yellow [image-rendering:pixelated]"
    />
  )
}
