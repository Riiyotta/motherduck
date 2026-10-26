// X17 GenericPage (support-policy variant of F1) + X18 legal-with-TOC shell, and the measured "shape" prose
// renderer they share. Bodies are rebuilt from SHAPES (data/marketing.js): the original's text blocks reduced to
// segment lengths + measured spacing per breakpoint, filled here with original placeholder words.
import { Fragment, cloneElement, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox, Container, OffsetButton, Placeholder, TextInput } from '../ui'
import ArticleProse from '../content/ArticleProse.jsx'
import { FootnoteRef } from './proseExtras.jsx'
import { PlayFrame } from '../content/bits.jsx'
import { isEmail } from '../company/forms.js'
import { routeProps } from '../company/links.js'
import { SHAPES } from './data/marketing.js'
import '../../styles/content.css'
import '../../styles/extra-marketing.css'

// ---------- breakpoint bucket (0 = XL >=1302, 1 = LG, 2 = MD, 3 = SM) ----------
const QUERIES = ['(min-width: 1302px)', '(min-width: 960px)', '(min-width: 728px)']
const bucketNow = () => {
  if (typeof window === 'undefined') return 0
  const i = QUERIES.findIndex((q) => window.matchMedia(q).matches)
  return i < 0 ? 3 : i
}
export function useBucket() {
  const [b, setB] = useState(bucketNow)
  useEffect(() => {
    const mqs = QUERIES.map((q) => window.matchMedia(q))
    const on = () => setB(bucketNow())
    mqs.forEach((m) => m.addEventListener('change', on))
    return () => mqs.forEach((m) => m.removeEventListener('change', on))
  }, [])
  return b
}

// ---------- exact-length placeholder text ----------
const VOCAB = (
  'service account customer party notice terms period data access usage plan order fees invoice rights ' +
  'section provider platform content support request record review update policy written prior reasonable ' +
  'applicable available limited general specific related other each such any all this that these those under ' +
  'within during after before upon without including between agreed stated described required permitted ' +
  'provide maintain process share protect receive deliver remove suspend renew cancel apply submit confirm'
).split(' ')
const GLUE = ['and', 'or', 'of', 'to', 'in', 'for', 'by', 'with', 'on', 'as', 'at', 'the', 'a']
const BY_LEN = {}
for (const w of [...VOCAB, ...GLUE, 'is', 'be', 'it', 'we', 'an', 'no', 'its', 'may', 'are', 'not', 'use', 'per', 'new']) (BY_LEN[w.length] = BY_LEN[w.length] || []).push(w)

export function rnd(seed) {
  let a = (Math.imul((seed | 0) + 1, 2654435761) ^ 0x9e3779b9) >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const cap = (w) => (w ? w[0].toUpperCase() + w.slice(1) : w)
const pickLen = (r, n) => {
  for (let k = n; k >= 1; k--) if (BY_LEN[k]) return BY_LEN[k][Math.floor(r() * BY_LEN[k].length)]
  return 'a'
}

// `len` characters of sentence-like text. opts.sentence: capitalise + full stops; opts.title: Title Case, no stops.
export function words(len, seed = 1, { sentence = true, title = false, start = true } = {}) {
  if (len <= 0) return ''
  const r = rnd(seed)
  let out = ''
  let upNext = start
  let since = 0
  while (out.length < len) {
    const room = len - out.length - (out ? 1 : 0)
    if (room <= 0) break
    let w
    if (room <= 10) w = pickLen(r, room)
    else {
      const pool = since % 3 === 2 ? GLUE : VOCAB
      w = pool[Math.floor(r() * pool.length)]
      if (w.length > room - 2) w = pickLen(r, Math.min(room - 2, 8))
    }
    since++
    const stop = sentence && !title && since > 9 && r() < 0.16 && w.length + 1 <= room
    if (title || upNext) w = cap(w)
    upNext = false
    if (stop) { w += '.'; upNext = true; since = 0 }
    out += (out ? ' ' : '') + w
  }
  if (out.length < len) out = out.padEnd(len, '.')
  return out
}

// ---------- segment renderer ----------
const FONT = { s: 'Inter, system-ui, sans-serif', m: '"Fragment Mono", ui-monospace, monospace', f: '"Space Grotesk", sans-serif' }
const styleOf = (S, i) => {
  const a = S[i]
  if (!a) return {}
  const [f, fs, lh, fw, up, ul, ls, it, ta] = a
  return {
    fontFamily: FONT[f], fontSize: fs, lineHeight: lh ? `${lh}px` : 'normal', fontWeight: fw,
    textTransform: up ? 'uppercase' : undefined, textDecoration: ul ? 'underline' : undefined,
    // Space Grotesk carries the +0.01em compensation used by every Fono role (CLONE_SPEC §0)
    letterSpacing: ls ? `${ls}px` : f === 'f' ? '0.01em' : undefined,
    fontStyle: it ? 'italic' : undefined, textAlign: ta === 'c' ? 'center' : undefined,
  }
}

function SegText({ segs, seed, ilh, label }) {
  let labelUsed = false
  return segs.map((sg, i) => {
    const [k, n, href] = sg
    if (k === 'br') return <br key={i} />
    if (k === 'fn') return <FootnoteRef key={i} n={{ n, id: n }} />
    const first = i === 0
    const last = i === segs.length - 1
    let txt
    if (label && !labelUsed && /[bu]/.test(k)) {
      // a TOC target: the heading text equals its TOC label
      labelUsed = true
      txt = label.length >= n ? label : `${label}${'.'.padEnd(n - label.length, ' ')}`
    } else if (k === 't' && n <= 2) txt = first || last ? '' : n === 1 ? ' ' : ', '
    else if (k === 't') {
      const lead = first ? 0 : 1
      const trail = last ? 0 : 1
      txt = `${lead ? ' ' : ''}${words(n - lead - trail, seed + i * 7, { start: first })}${trail ? ' ' : ''}`
    } else {
      const titleish = /b/.test(k) && n < 60
      txt = words(n, seed + i * 7, { title: titleish, sentence: !titleish })
      if (titleish && n > 3) txt = `${txt.slice(0, -1)}.`
    }
    const style = /b/.test(k) && ilh ? { lineHeight: `${ilh}px` } : undefined
    let node = txt
    if (/c/.test(k)) node = <code>{txt}</code>
    if (/i/.test(k)) node = <em>{node}</em>
    if (/u/.test(k) && !/a/.test(k)) node = <u>{node}</u>
    if (/a/.test(k)) {
      const rp = href ? routeProps(href) : {}
      node = rp.to
        ? <Link to={rp.to} className="xm-a">{node}</Link>
        : <span className="xm-a">{node}</span>
    }
    if (/b/.test(k)) node = <strong style={style}>{node}</strong>
    return <Fragment key={i}>{node}</Fragment>
  })
}

const ADMON = { 'rgb(229, 229, 229)': 'note', 'rgb(254, 239, 173)': 'tip', 'rgb(206, 235, 255)': 'info', 'rgb(255, 220, 189)': 'warning', 'rgb(255, 203, 200)': 'danger' }
const ADMON_LABEL = { note: 4, tip: 3, info: 4, warning: 7, danger: 6 }
const CODE_WORDS = ['SELECT', 'FROM', 'WHERE', 'sample_table', 'value', 'region', 'count(*)', 'GROUP BY', 'ORDER BY', 'event_day', '=', "'demo'", 'AS', 'total', 'LIMIT 10', 'JOIN', 'ON', 'id']
const codeLine = (n, seed) => {
  const r = rnd(seed)
  let s = ''
  while (s.length < n) {
    const w = CODE_WORDS[Math.floor(r() * CODE_WORDS.length)]
    s += (s ? ' ' : '') + w
  }
  return s.slice(0, n)
}

export function tocLabel(len, key) {
  return words(len, 900 + parseInt(String(key).replace(/\D/g, '') || '0', 10) * 13, { title: true })
}
const slugOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
// DOM id of a TOC target: slug of its placeholder label + the section key (labels can repeat)
const tocId = (label, key) => `${slugOf(label)}-${String(key).replace(/\D/g, '')}`

// Live-demo "tag label" row: Live stream chip + date chip (white boxes, 2px ink; first has a 12px left bar).
function TagRow({ kids, seed }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex w-fit items-center gap-[16px] border-2 border-l-[12px] border-ink bg-white px-[20px] py-[11px] max-md:py-[4px]">
        <Placeholder width={32} height={32} label="Live icon" bordered={false} />
        <b className="font-sans text-[20px] font-bold leading-[32px]">Live stream</b>
      </div>
      <div className="flex w-fit items-center gap-[16px] border-2 border-ink bg-white px-[20px] py-[11px] max-md:border-l-[12px] max-md:border-t-0 max-md:py-[4px] md:border-l-0">
        <Placeholder width={32} height={32} label="Calendar icon" bordered={false} />
        <span className="font-sans text-[20px] font-normal leading-[25.6px]"><b className="font-bold">{words(kids[1] > 12 ? 12 : kids[1], seed, { title: true })}</b>{kids[1] > 12 ? ` ${words(kids[1] - 13, seed + 1, { sentence: false })}` : ''}</span>
      </div>
    </div>
  )
}

// ShapeProse: replays a measured body. `path` = SHAPES key.
export function ShapeProse({ path, seed = 1, className = '' }) {
  const b = useBucket()
  const shape = SHAPES[path]
  const labels = useMemo(() => {
    const m = {}
    for (const [n, key, kids] of shape?.toc || []) {
      m[key] = tocLabel(n, key)
      for (const [kn, kk] of kids) m[kk] = tocLabel(kn, kk)
    }
    return m
  }, [shape])
  if (!shape) return null
  const { S, L, G, T } = shape
  const geo = G[b]
  const out = []
  for (let i = 0; i < L.length; i++) {
    const l = L[i]
    const [gap, x, rin, si, h, w, cellLines] = geo[i] || [0, 0, 0]
    const key = i
    const sd = seed * 1000 + i * 31
    const box = { marginTop: gap, marginLeft: x, marginRight: rin }
    const kind = l[0]
    if (kind === 'p' || kind === 'li' || kind === 'h') {
      const [, tag, segs, base, mk, id] = l
      const sty = styleOf(S, si ?? base)
      const ilh = S[si ?? base]?.[9] || 0
      const label = id ? labels[id] : undefined
      const domId = label ? tocId(label, id) : undefined
      const content = <SegText segs={segs} seed={sd} ilh={ilh} label={label} />
      const legal = domId ? 'legal-heading' : ''
      if (mk && mk[0] !== 'c' && mk[0] !== 'none') {
        const List = /decimal|alpha|roman/.test(mk[0]) ? 'ol' : 'ul'
        out.push(
          <List key={key} className="xm-list" style={{ listStyleType: mk[0], margin: `${gap}px ${rin}px 0 0`, paddingLeft: x }}>
            <li value={List === 'ol' ? mk[1] : undefined} id={domId} className={legal} style={sty}>{content}</li>
          </List>,
        )
      } else if (mk && mk[0] === 'c') {
        out.push(
          <div key={key} id={domId} className={`relative ${legal}`} style={{ ...box, ...sty }}>
            <span aria-hidden="true" className="absolute right-[calc(100%+10px)] top-0 whitespace-nowrap">{mk[1]}</span>
            {content}
          </div>,
        )
      } else {
        const Tag = kind === 'h' ? (/^h[1-6]$/.test(tag) ? tag : 'h3') : tag === 'p' ? 'p' : 'div'
        out.push(<Tag key={key} id={domId} className={legal} style={{ ...box, ...sty }}>{content}</Tag>)
      }
      continue
    }
    const wrap = (node, extra = {}) => out.push(<div key={key} style={{ ...box, ...extra }}>{node}</div>)
    if (kind === 'pre') {
      const code = l[1].map((n, k) => codeLine(n, sd + k)).join('\n')
      wrap(<ArticleProse blocks={[{ type: 'code', code, lang: 'sql' }]} />)
    } else if (kind === 'table') {
      // cells with explicit line breaks on the original keep the same number of lines
      const cell = ([, n, a, , base = 1], ri, ci) => {
        const lines = cellLines?.[ri]?.[ci] ?? base
        const sdc = sd + ri * 17 + ci
        if (lines <= 1) return words(n, sdc, { title: ri === 0 })
        const per = Math.max(1, Math.round(n / lines))
        return Array.from({ length: lines }, (_, q) => <Fragment key={q}>{q > 0 && <br />}{words(per, sdc + q)}</Fragment>)
      }
      const rows = l[1].map((r, ri) => r.map((c, ci) => cell(c, ri, ci)))
      const head = l[1][0].every((c) => c[0] === 'h') ? rows[0] : null
      // tables are max-content wide (as on the original; ArticleProse table styles); cells keep their measured
      // line counts. Header-less tables on the original have no thead.
      const body = head ? rows.slice(1) : rows
      wrap(
        <div className="ct-prose">
          <div className="ct-tablewrap">
            <table>
              {head && <thead><tr>{head.map((c, k) => <th key={k} colSpan={l[1][0][k][3] > 1 ? l[1][0][k][3] : undefined}>{c}</th>)}</tr></thead>}
              <tbody>{body.map((r, ri) => <tr key={ri}>{r.map((c, k) => { const src = l[1][ri + (head ? 1 : 0)][k]; const Cell = src[0] === 'h' ? 'th' : 'td'; return <Cell key={k} colSpan={src[3] > 1 ? src[3] : undefined}>{c}</Cell> })}</tr>)}</tbody>
            </table>
          </div>
        </div>,
        { marginRight: 0 },
      )
    } else if (kind === 'admon') {
      const k = ADMON[l[1]] || 'note'
      const title = words(Math.max(1, l[2] - ADMON_LABEL[k] - 2), sd, { title: true })
      wrap(<ArticleProse blocks={[{ type: 'admon', kind: k, title, children: l[3].map((n, q) => ({ type: 'p', inl: [words(n, sd + q)] })) }]} />)
    } else if (kind === 'fn') {
      // consecutive footnote wrappers on the original form one list
      const items = [...l[1]]
      let gapSum = gap
      while (L[i + 1] && L[i + 1][0] === 'fn') { i++; items.push(...L[i][1]) }
      out.push(
        <div key={key} style={{ ...box, marginTop: gapSum }}>
          <ArticleProse blocks={[{ type: 'footnotes', items: items.map((n, q) => ({ id: q + 1, inl: [words(n, sd + q)] })) }]} />
        </div>,
      )
    } else if (kind === 'media') {
      const full = !w || w >= 600
      // StreamYard / video iframes render 0 tall on the original (embed never sizes itself); the spec asks for a
      // static 16:9 PlayFrame there instead (PAGES_SPEC_EXTRA §7 X17)
      if (l[1] === 'iframe' && !h) {
        out.push(<div key={key} style={box}><PlayFrame className="aspect-video w-full" /></div>)
        continue
      }
      const hidden = !h
      if (hidden) continue
      out.push(
        <div key={key} style={box}>
          {l[1] === 'iframe'
            ? <Placeholder label="Embedded content" className="w-full" style={{ height: h }} />
            : <Placeholder label="Article image" rounded="" bordered={false} className={l[2] ? 'border-2 border-ink' : ''} style={{ width: full ? '100%' : w, height: h }} />}
        </div>,
      )
    } else if (kind === 'row') {
      wrap(<TagRow kids={l[1]} seed={sd} />)
    } else if (kind === 'hr') {
      out.push(<hr key={key} style={{ ...box, height: 0, border: 0, borderTop: '1px solid #383838' }} />)
    }
  }
  return <div className={`xm-shape ${className}`} style={{ paddingBottom: T[b] }}>{out.map((el) => cloneElement(el, { 'data-leaf': el.key }))}</div>
}

// ---------- X17 sidebar form (live demo / book brief) ----------
export function SideForm({ title, fields, cta, book = false }) {
  const [v, setV] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])))
  const [news, setNews] = useState(true)
  const [eco, setEco] = useState(true)
  const [sent, setSent] = useState(false)
  const ok = fields.every((f) => (f.type === 'email' ? isEmail(v[f.name]) : v[f.name].trim()))
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  return (
    <form id="page-form" noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }}
      className="w-full max-w-[500px] self-start overflow-auto border-2 border-ink px-[24px] pb-[32px] pt-[24px]">
      <p className="m-0 pb-[34px] font-mono text-[18px] uppercase leading-[25.2px]">{title}</p>
      {sent ? (
        <p role="status" className="m-0 font-sans text-[16px] font-light leading-[25.6px]">
          Thanks! You are on the list. This preview does not send anything.
        </p>
      ) : (
        <div className="flex flex-col gap-[36px]">
          {fields.map((f) => (
            <TextInput key={f.name} variant="float" label={f.label} name={f.name} type={f.type || 'text'} value={v[f.name]} onChange={set(f.name)}
              valid={f.type === 'email' ? isEmail(v[f.name]) : undefined} />
          ))}
          <div className="flex flex-col gap-[10px]">
            <Checkbox variant="solid" checked={news} onChange={(e) => setNews(e.target.checked)} label="Subscribe to product news" />
            <Checkbox variant="solid" checked={eco} onChange={(e) => setEco(e.target.checked)} label="Subscribe to the open-source ecosystem digest" />
          </div>
          <div className={book ? '-mt-[10px]' : ''}>
            <OffsetButton size="lg" type="submit" disabled={!ok} disabledStyle>{cta}</OffsetButton>
          </div>
        </div>
      )}
    </form>
  )
}

// Fixed "jump to form" bar shown below XL on the sidebar-form pages (measured 71.8 tall, padding 14 24;
// cream + 2px top border <728, transparent above; md button right-aligned, full width <728).
export function FormBar({ label }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex justify-end border-t-2 border-ink bg-cream px-[24px] py-[14px] md:border-t-0 md:bg-transparent xl:hidden">
      <OffsetButton arrow wrapperClassName="max-md:w-full" className="max-md:w-full"
        onClick={() => document.getElementById('page-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        {label}
      </OffsetButton>
    </div>
  )
}

// ---------- X17 layout (same values as the F1 support-policy variant) ----------
export function GenericPage({ h1, path, sideForm, seed = 1 }) {
  return (
    <Container className="pb-[24px] md:pb-[24px] lg:pb-[48px] lg:pt-[34px] xl:pt-[24px]">
      <h1 className="m-0 pb-[32px] pt-[40px] font-mono text-compact-h1-32 font-normal uppercase md:text-compact-h1-40 lg:pb-[36px] lg:text-compact-h1 xl:pt-[64px]">{h1}</h1>
      <div className={`grid grid-cols-1 gap-[40px] pb-[112px] ${sideForm ? 'xl:grid-cols-[824px_338px] xl:gap-[80px]' : 'xl:gap-[80px]'}`}>
        <div className="min-w-0 font-sans text-ink"><ShapeProse path={path} seed={seed} /></div>
        {sideForm}
      </div>
    </Container>
  )
}

// ---------- X18 legal shell with a nested, collapsible TOC (F1 Privacy style; measured nested on the original) ----------
function useScrollSpy(ids) {
  // live: nothing is active (every group collapsed, no bold) until the first heading reaches the threshold
  const [active, setActive] = useState(null)
  useEffect(() => {
    let raf = 0
    const on = () => {
      raf = 0
      let cur = null
      // live: a heading becomes active once its top is within the top 26% of the viewport (234 @900, 182 @700)
      const line = window.innerHeight * 0.26
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) cur = id
      }
      setActive(cur)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(on) }
    on()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [ids])
  return active
}

const jump = (e, id) => {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: 'auto' })
  history.replaceState(null, '', `#${id}`)
}

function TocChevron({ open }) {
  return (
    <svg width="18.5" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function LegalTocShell({ title, subtitle, toc, children }) {
  const items = useMemo(() => toc.map(([n, key, kids]) => {
    const t = tocLabel(n, key)
    return { t, id: tocId(t, key), kids: kids.map(([kn, kk]) => { const kt = tocLabel(kn, kk); return { t: kt, id: tocId(kt, kk) } }) }
  }), [toc])
  const ids = useMemo(() => items.flatMap((it) => [it.id, ...it.kids.map((k) => k.id)]), [items])
  const active = useScrollSpy(ids)
  const linkCls = (on) => `font-sans text-toc-link-sm text-ink no-underline xl:text-toc-link ${on ? '!font-semibold' : ''}`
  return (
    // the subtitle variant (ToS) adds 20px container padding-top at LG (measured)
    <Container className={`xl:pb-[38px] xl:pt-0 ${subtitle ? 'lg:pt-[20px]' : ''}`}>
      <header className="pb-[40px] pt-[35px] md:py-[60px] lg:pb-[80px] lg:pt-[60px] xl:pb-[88px] xl:pt-[110px]">
        <h1 className="m-0 font-mono text-page-h1-sm font-normal uppercase md:text-page-h1-md lg:text-page-h1">{title}</h1>
        {subtitle && (
          <p className="m-0 pt-[4px] font-mono text-[24px] uppercase leading-[33.6px] tracking-[0.48px] md:text-[32px] md:leading-[44.8px] md:tracking-[0.64px] lg:pt-[8px] lg:text-[40px] lg:leading-[48px] lg:tracking-[0.8px]">{subtitle}</p>
        )}
      </header>
      <div className="flex flex-col gap-[40px] xl:flex-row-reverse xl:justify-end xl:gap-[24px]">
        <div className="flex w-full flex-col gap-[24px] md:w-[196px] lg:w-[250px] xl:sticky xl:top-[148px] xl:ml-[69px] xl:w-[333px] xl:shrink-0 xl:self-start">
          <aside className="border-2 border-ink bg-cream">
            <p className="m-0 px-[24px] pb-[16px] pt-[24px] font-mono text-toc-title uppercase xl:pb-[20px]">Table of contents</p>
            <ol className="m-0 flex max-h-[230px] list-none flex-col gap-[12px] overflow-auto pb-[16px] pl-[24px] pr-[16px] font-sans font-light xl:max-h-[638px]">
              {items.map((it) => {
                const open = active === it.id || it.kids.some((k) => k.id === active)
                return (
                  <li key={it.id}>
                    <div className="flex items-start justify-between gap-[4px]">
                      <a href={`#${it.id}`} onClick={(e) => jump(e, it.id)} className={linkCls(open)}>{it.t}</a>
                      {it.kids.length > 0 && <span className="flex h-[25.6px] items-center"><TocChevron open={open} /></span>}
                    </div>
                    {it.kids.length > 0 && (
                      <div className="grid transition-[grid-template-rows,margin] duration-200" style={{ gridTemplateRows: open ? '1fr' : '0fr', marginTop: open ? 8 : 0 }}>
                        <ul className="m-0 flex list-none flex-col gap-[12px] overflow-hidden pl-[16px]">
                          {it.kids.map((k) => (
                            <li key={k.id}>
                              <a href={`#${k.id}`} onClick={(e) => jump(e, k.id)} tabIndex={open ? 0 : -1} className={linkCls(active === k.id)}>{k.t}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </aside>
        </div>
        <article className="w-full min-w-0 font-sans text-ink xl:max-w-[816px]">{children}</article>
      </div>
    </Container>
  )
}
