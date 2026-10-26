// Image slot sized to the original's measured box (ASSET_MANIFEST.md: never use the originals).
// Renders a free photo (public/assets/photos; CC0/PDM/CC BY/BY-SA/Unsplash, see CREDITS.md) or original SVG artwork
// (ui/art.jsx), chosen by `kind` or inferred from `label`. Pass the spec's rendered size via
// width/height (px numbers) or via className for responsive sizes; `ratio` (e.g. "16 / 9") sizes
// it fluidly at 100% width. `variant="hatch"` with kind="none" keeps the old neutral stand-in.
import { useId, useState } from 'react'
import { useInRouterContext, useLocation } from 'react-router-dom'
import { PHOTOS, photoSrc } from './photos.js'
import { Illustration, Mascot, Wordmark, BookCover, UiWindow, Glyph } from './art.jsx'
import { ART_REGISTRY } from './art/index.js'
import { resolveImage, nextInPool } from './imageMap.js'

// First match wins; labels come from each call site's accessible name.
const KIND_RULES = [
  ['logo', /logo|wordmark|brand|emblem|badge|^company$/i],
  ['mascot', /mascot|character/i],
  ['cover', /cover|\bbook\b/i],
  ['avatar', /avatar|portrait|headshot|profile|person|speaker|author|face/i],
  ['photo', /photo|team|event|picture|thumbnail|thumb|video|media|story|image|collage/i],
  ['icon', /icon|glyph|symbol/i],
  ['illustration', /illustration|decor|doodle|hero|map/i],
  ['diagram', /diagram|screenshot|\bui\b|demo|window|chart|interface|preview|product|embedded|figure/i],
]

const inferKind = (label) => KIND_RULES.find(([, re]) => re.test(label || ''))?.[0] || 'illustration'

// Small stable hash so a slot keeps the same image across renders.
const hash = (s) => {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

// Router context is fixed for the life of the tree, so this conditional hook call is stable.
const usePathname = () => (useInRouterContext() ? useLocation().pathname : '/')

const ART = { illustration: Illustration, mascot: Mascot, logo: Wordmark, cover: BookCover, diagram: UiWindow, icon: Glyph }
const PHOTO_POOL = {
  photo: [...PHOTOS.work, ...PHOTOS.events, ...PHOTOS.people.slice(0, 4)],
  thumbnail: [...PHOTOS.work, ...PHOTOS.scenic],
  avatar: PHOTOS.people,
}

export default function Placeholder({
  width,
  height,
  ratio,
  variant = 'hatch',    // 'hatch' | 'shape' (only used with kind="none")
  kind,                 // 'photo' | 'thumbnail' | 'avatar' | 'illustration' | 'mascot' | 'logo' | 'cover' | 'diagram' | 'icon' | 'none'
  seed,                 // optional number to pick a specific image/variant
  label,                // accessible name (and optional visible caption via showLabel)
  showLabel = false,
  rounded = 'rounded-sm',
  bordered = true,
  className = '',
  style,
}) {
  const id = useId()
  const pathname = usePathname()
  // imageMap.js lookup first (per-slot subject match); otherwise infer from the label as before.
  const entry = kind ? null : resolveImage(label, pathname)
  const poolSize = entry?.srcPool?.length || entry?.artPool?.length || entry?.propsPool?.length || 0
  const [counted] = useState(() => (poolSize && !entry.indexFrom ? nextInPool(entry.poolKey || String(entry.label), pathname) : 0))
  const poolIndex = entry?.indexFrom ? entry.indexFrom(label || '') : counted
  const sizing = {
    ...(width != null && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height != null && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(ratio && { aspectRatio: ratio, width: width ?? '100%' }),
  }
  const k = entry?.kind || kind || inferKind(label)
  const n = seed ?? entry?.seed ?? (poolSize || entry?.indexFrom ? (entry.seedBase || 0) + poolIndex : hash(`${label || ''}${id}`))
  const photoUrl = entry
    ? entry.src || (entry.srcPool && entry.srcPool[poolIndex % entry.srcPool.length]) || null
    : PHOTO_POOL[k] && photoSrc(PHOTO_POOL[k][n % PHOTO_POOL[k].length])
  const artKey = entry && (entry.art || (entry.artPool && entry.artPool[poolIndex % entry.artPool.length]))
  const Art = entry ? (artKey ? ART_REGISTRY[artKey] : null) : ART[k]
  const neutral = k === 'none'
  const hatch =
    neutral && variant === 'hatch'
      ? { backgroundImage: 'repeating-linear-gradient(135deg, #D7D7D7 0 1px, transparent 1px 8px)' }
      : null
  return (
    <div
      role="img"
      aria-label={label || 'Image'}
      data-image-source={entry ? (photoUrl ? 'photo' : artKey ? 'art' : 'empty') : 'fallback'}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${
        entry?.bg ? entry.bg : neutral ? 'bg-surface-2' : k === 'logo' || k === 'icon' || k === 'mascot' ? 'bg-transparent' : 'bg-cream'
      } ${bordered && !entry?.frameless ? 'border border-gray-400' : ''} ${rounded} ${className}`}
      style={{ ...hatch, ...sizing, ...style }}
    >
      {photoUrl && (
        <img
          src={photoUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full ${entry?.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          style={entry?.objectPosition ? { objectPosition: entry.objectPosition } : undefined}
        />
      )}
      {Art && (
        <span className={`absolute ${entry?.inset ?? (k === 'logo' || k === 'icon' || k === 'mascot' ? 'inset-[6%]' : 'inset-0')}`}>
          <Art seed={n} label={label} {...entry?.props} {...entry?.propsPool?.[poolIndex % entry.propsPool.length]} />
        </span>
      )}
      {neutral && variant === 'shape' && (
        <svg viewBox="0 0 40 40" className="h-[60%] max-h-[64px] w-auto" aria-hidden="true">
          <rect x="4" y="4" width="32" height="32" fill="none" stroke="#A1A1A1" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="5" fill="#E1D6CB" />
          <path d="M6 34 18 22l7 7 4-4 7 9z" fill="#ECE6DF" stroke="#A1A1A1" strokeWidth="1" />
        </svg>
      )}
      {showLabel && label && (
        <span className="absolute bottom-[4px] left-[6px] font-mono text-label uppercase text-gray-500">{label}</span>
      )}
    </div>
  )
}
