// PAGES_SPEC_EXTRA X8 /webinar/:slug and /video/:slug.
// Standard (11 slugs, spec X8): VideoDetail L6 variant (no back link, shorter sand band, no sidebar / transcript / FAQ /
// related). Gated player -> GatedVideoModal registration form.
// Measured on the original but not covered by the spec (flagged in the hand-off):
//   - 3 slugs render a split-form registration LP (same values as X19): WebinarRegisterLP
//   - 1 slug renders the X17 sidebar-form generic page: WebinarSideForm
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { OffsetButton, Placeholder, TextInput, Checkbox, UnderlineLink } from '../ui'
import ArticleProse from '../content/ArticleProse.jsx'
import { PlayFrame, Doodle } from '../content/bits.jsx'
import { chars, title, exactTitle } from '../content/lorem.js'
import '../../styles/extra-media.css'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ---------------------------------------------------------------- shared form bits ---------------------------------------------------------------- */
function useFields(names) {
  const [v, setV] = useState(() => Object.fromEntries(names.map((n) => [n, ''])))
  const bind = (n) => ({ value: v[n], onChange: (e) => setV((s) => ({ ...s, [n]: e.target.value })) })
  return [v, bind]
}

function Consents({ className = '', labels = ['Subscribe to MotherDuck email updates', 'Subscribe to DuckDB ecosystem newsletter'] }) {
  const [a, setA] = useState(true)
  const [b, setB] = useState(true)
  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      <Checkbox label={labels[0]} checked={a} onChange={(e) => setA(e.target.checked)} />
      <Checkbox label={labels[1]} checked={b} onChange={(e) => setB(e.target.checked)} />
    </div>
  )
}

/* ---------------------------------------------------------------- X8 gated modal ---------------------------------------------------------------- */
// Overlay rgba(56,56,56,.4); content 720 wide (calc(100% - 40px) on small screens), white, 2px ink; inner cream,
// padding 32 24 52; form margin 0 34, column gap 24. On the original it opens on page load and cannot be dismissed;
// the clone also opens on load, re-opens from the thumbnail, and closes on Esc / overlay click (spec §9 clone note).
// Submitting swaps the thumbnail for the static PlayFrame. No network.
export function GatedVideoModal({ open, onClose, onDone }) {
  const [v, bind] = useFields(['first', 'last', 'email', 'company'])
  const valid = v.first && v.last && EMAIL.test(v.email) && v.company
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[120] flex items-end overflow-y-auto bg-overlay lg:block" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      {/* >=960: centred 720 box, top 158, 2px ink border; <960: full-width sheet on the bottom edge, 2px top border */}
      <div role="dialog" aria-modal="true" aria-label="Register to watch"
        className="xm-modal-rise relative w-full border-y-2 border-ink bg-white lg:mx-auto lg:mb-[40px] lg:mt-[158px] lg:w-[720px] lg:border-2">
        <div className="bg-cream px-[24px] pb-[52px] pt-[32px]">
          <form className="flex flex-col gap-[24px] md:mx-[16px] lg:mx-[34px]" onSubmit={(e) => { e.preventDefault(); if (valid) onDone() }}>
            <p className="m-0 pb-[10px] font-sans text-[18px] font-light leading-[28.8px] text-ink lg:text-[20px] lg:leading-[32px]">{chars(46, 8401).replace(/\.$/, '!')}</p>
            <TextInput label="First Name" {...bind('first')} />
            <TextInput label="Last Name" {...bind('last')} />
            <TextInput label="Work E-mail" type="email" {...bind('email')} />
            <TextInput label="Company Name" {...bind('company')} />
            {/* <728: labels Inter 14/19.6, gap 16 (measured) */}
            <Consents className="max-md:gap-[16px] max-md:[&_label]:text-[14px] max-md:[&_label]:leading-[19.6px]" />
            <div className="mt-[8px]">
              <OffsetButton type="submit" size="lg" disabled={!valid} disabledStyle>Submit</OffsetButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- X8 standard ---------------------------------------------------------------- */
function Player({ w }) {
  const [open, setOpen] = useState(w.player === 'gated')
  const [unlocked, setUnlocked] = useState(false)
  const frame = 'w-[calc(100%+48px)] -translate-x-[24px] border-2 border-ink bg-ink md:w-full md:translate-x-0'
  if (w.player === 'youtube' || unlocked) {
    return <div className={frame}><PlayFrame className="aspect-video w-full" /></div>
  }
  return (
    <>
      <button type="button" aria-label="Play video (registration required)" onClick={() => setOpen(true)}
        className={`${frame} relative block cursor-pointer p-0`}>
        <Placeholder label="Webinar video thumbnail" ratio="16 / 9" rounded="" bordered={false} />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
            <circle cx="36" cy="36" r="34" fill="rgba(0,0,0,0.45)" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M29 23v26l21-13z" fill="#FFFFFF" />
          </svg>
        </span>
      </button>
      <GatedVideoModal open={open} onClose={() => setOpen(false)} onDone={() => { setOpen(false); setUnlocked(true) }} />
    </>
  )
}

export function WebinarStandard({ w }) {
  return (
    <>
      {/* band 248 / 238 / 210 / 66 (padding-bottom 246 / 236 / 208 / 64 + 2px border) */}
      <section className="ct-sand-grid border-b-2 border-ink pb-[64px] md:pb-[208px] lg:pb-[236px] xl:pb-[246px]" />
      <div className="container relative -mt-[2px] md:-mt-[144px] lg:-mt-[156px] xl:-mt-[172px]">
        <section className="pb-[100px] xl:pb-[120px]">
          <div className="pb-[32px] md:pb-[46px] xl:pb-[56px]">
            <Player w={w} />
            <div id="video-title" className="pt-[24px] xl:pt-[32px]">
              <div className="flex flex-wrap gap-[8px] pb-[16px]">
                {w.tags.map((t) => (
                  <Link key={t} to={`/videos?category=${encodeURIComponent(t)}#videos-and-webinars-library`}
                    className="bg-sand-chip px-[8px] py-[4px] font-fono uppercase text-ink no-underline transition-colors duration-150 hover:bg-sand-dark text-video-tag-link lg:px-[12px] lg:py-[8px]">
                    {t}
                  </Link>
                ))}
              </div>
              <h1 className="m-0 font-fono font-normal uppercase text-ink text-[24px] leading-[33.6px] tracking-[0.01em] md:text-[32px] md:leading-[38.4px] xl:text-[38px] xl:leading-[45.6px]">{w.title}</h1>
              <span className="block pt-[16px] font-sans text-[14px] leading-[19.6px] text-gray-500">{w.date}</span>
              {w.featuring.length > 0 && (
                <span className="block pt-[8px] font-sans text-[14px] leading-[19.6px] text-gray-500">
                  Featuring:{' '}
                  {w.featuring.map((a, k) => (
                    <span key={a.slug}>
                      {k > 0 && ', '}
                      <span className="inline-block"><UnderlineLink to={`/authors/${a.slug}`} icon={null} inline>{a.name}</UnderlineLink></span>
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
          {w.body.length > 0 && <ArticleProse blocks={w.body} video className="min-w-0 xl:max-w-[816px] [&>*:first-child]:!mt-0" />}
        </section>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- split-form registration LP (X19 values) ---------------------------------------------------------------- */
// Left-panel bodies, measured per slug (element sizes); copy generated to the same lengths.
const LP_BODIES = {
  'data-discoverability-secoda-motherduck': {
    date: 21, logos: true, textarea: true,
    body: [['h2', 38, 'mb-[16px] mt-[40px]'], ['lede', 228], ['p', 150], ['logo'], ['p', 128], ['logo'], ['p', 150]],
  },
  'ducking-easy-insights-motherduck-dbt': {
    date: 17, body: [['h2', 47], ['lede', 282], ['logo'], ['p', 104]],
  },
  'scaling-duckdb-panel-ondemand': {
    date: 25, body: [['img'], ['p', 185], ['p', 52], ['ul', 4], ['p', 118], ['p', 187]],
  },
}

function LpBlock({ b, k }) {
  const [kind, n, extra = ''] = b
  const seed = 8600 + k * 7
  if (kind === 'h2') return <h2 className={`m-0 font-fono text-[24px] font-normal uppercase leading-[33.6px] tracking-[0.01em] text-ink md:text-[32px] md:leading-[38.4px] xl:text-[40px] xl:leading-[48px] ${extra || 'mb-[24px]'}`}>{exactTitle(n, seed)}</h2>
  if (kind === 'lede') return <p className="m-0 mb-[24px] font-sans text-[20px] font-light leading-[32px] text-ink max-lg:text-[16px] max-lg:leading-[25.6px]">{chars(n, seed)}</p>
  if (kind === 'p') return <p className="m-0 mb-[24px] font-sans text-[16px] font-light leading-[25.6px] text-ink">{chars(n, seed)}</p>
  if (kind === 'logo') return <div className="mb-[8px]"><Placeholder label="Partner logo icon" className="mb-[24px] h-[80px] w-[80px] !border-2 !border-ink md:h-[100px] md:w-[100px]" rounded="" /></div>
  if (kind === 'img') return <Placeholder label="Webinar image" ratio="16 / 9" rounded="" className="mb-[24px] !border-2 !border-ink" />
  if (kind === 'ul') {
    return (
      <ul className="m-0 mb-[24px] pl-[24px]">
        {Array.from({ length: n }, (_, i) => <li key={i} className="pl-[4px] font-sans text-[16px] font-light leading-[25.6px] text-ink">{chars(30, seed + i)}</li>)}
      </ul>
    )
  }
  return null
}

export function WebinarRegisterLP({ w }) {
  const cfg = LP_BODIES[w.slug] || LP_BODIES['ducking-easy-insights-motherduck-dbt']
  const names = ['first', 'last', 'email', 'company', ...(cfg.textarea ? ['note'] : [])]
  const [v, bind] = useFields(names)
  const [done, setDone] = useState(false)
  const valid = v.first && v.last && EMAIL.test(v.email) && v.company
  return (
    <>
      <div className="container relative overflow-hidden">
        <div className="mb-[64px] mt-[40px] flex flex-col items-center gap-[24px] md:mb-[100px] md:mt-[62px] md:gap-[20px] lg:mb-[120px] lg:mt-[90px] xl:mb-[140px] xl:mt-[110px]">
          <h1 className="m-0 text-center font-mono font-normal uppercase text-ink text-[24px] leading-[33.6px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[57.6px] xl:px-[120px] xl:text-[56px] xl:leading-[67.2px]">{w.title}</h1>
          <p className="m-0 text-center font-sans text-[16px] font-light uppercase leading-[25.6px] tracking-[0.32px] text-ink lg:text-[20px] lg:leading-[32px] lg:tracking-[0.4px]">{title(cfg.date, 8700)}</p>
          {cfg.logos && (
            <div className="mt-[16px] grid w-[327px] grid-cols-2 gap-[2px] border-2 border-ink bg-ink md:mt-[32px] md:w-[480px]">
              <div className="flex h-[64px] items-center justify-center bg-white px-[20px] py-[18px] md:h-[83px]"><Placeholder label="Company logo" className="h-full w-full" bordered={false} /></div>
              <div className="flex h-[64px] items-center justify-center bg-white px-[20px] py-[18px] md:h-[83px]"><Placeholder label="Partner logo" className="h-full w-full" bordered={false} /></div>
            </div>
          )}
        </div>
        <Doodle kind="arc" className="absolute right-[10px] top-[-20px] hidden h-[54px] w-[53px] xl:block" />
      </div>
      <div className="container relative pb-[100px]">
        <div className="grid grid-cols-1 border-2 border-ink xl:grid-cols-[619px_619px]">
          <div className="relative border-b-2 border-ink bg-sun px-[24px] pb-[60px] pt-[48px] md:px-[72px] md:pb-[112px] md:pt-[72px] xl:border-b-0 xl:border-r-2 xl:pt-[80px]">
            <div className="xl:max-w-[473px]">
              {cfg.body.map((b, k) => <LpBlock key={k} b={b} k={k} />)}
            </div>
          </div>
          <div className="relative min-h-[291px] bg-cream xl:min-h-[375px]">
            <div className="flex flex-col items-start gap-[24px] px-[24px] py-[52px] md:px-[72px] md:pb-[80px] md:pt-[72px] xl:py-[80px]">
              <h2 className="m-0 font-mono font-normal uppercase text-ink text-[18px] leading-[25.2px] lg:leading-[21.6px] xl:text-[24px] xl:leading-[28.8px]">Register</h2>
              <form className="flex w-full flex-col gap-[24px] xl:max-w-[475px]" onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true) }}>
                <TextInput label="First Name" {...bind('first')} />
                <TextInput label="Last Name" {...bind('last')} />
                <TextInput label="E-mail" type="email" {...bind('email')} />
                <TextInput label="Company Name" {...bind('company')} />
                {cfg.textarea && <TextInput multiline label={`${title(44, 8710)}?`} {...bind('note')} />}
                <Consents className="max-md:gap-[16px] max-md:[&_label]:text-[14px] max-md:[&_label]:leading-[19.6px]" />
                <div className="mt-[8px]">
                  <OffsetButton type="submit" size="lg" disabled={!valid} disabledStyle>Submit</OffsetButton>
                </div>
              </form>
            </div>
            {/* success overlay: opacity 0 -> 1 on submit. Measured from the original's styled source ($isVisible swaps
                opacity / pointer-events with no transition): instant on both sides. */}
            <div className={`absolute inset-x-0 top-0 flex flex-col gap-[36px] bg-cream p-[64px] max-md:p-[24px] ${done ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={!done}>
              <Placeholder label="Webinar cover" className="h-[251.6px] w-[240px]" />
              <p className="m-0 font-mono text-[30px] font-light uppercase leading-[42px] tracking-[0.6px] text-ink max-md:text-[20px] max-md:leading-[28px]">{chars(64, 8720)}</p>
            </div>
          </div>
        </div>
        <Doodle kind="circle" className="absolute left-[-30px] top-[170px] hidden h-[127px] w-[127px] xl:block" />
        <Doodle kind="loop" className="absolute bottom-[0px] right-[-60px] hidden h-[300px] w-[260px] xl:block" />
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- X17 sidebar-form generic page ---------------------------------------------------------------- */
export function WebinarSideForm({ w }) {
  const [v, bind] = useFields(['email'])
  const valid = EMAIL.test(v.email)
  const p = 'm-0 mb-[24px] font-sans text-[16px] font-light leading-[25.6px] text-ink'
  return (
    <div className="container pb-[24px] md:pb-[48px] lg:pt-[34px] xl:pt-[24px]">
      <h1 className="m-0 pb-[32px] pt-[40px] font-mono font-normal uppercase text-ink text-[32px] leading-[44.8px] md:text-[40px] md:leading-[56px] lg:pb-[36px] lg:text-[56px] lg:leading-[67.2px] xl:pt-[64px]">{w.title}</h1>
      <div className="grid grid-cols-1 gap-[40px] pb-[112px] xl:grid-cols-[824px_338px] xl:gap-[80px]">
        <div className="min-w-0 max-w-[816px]">
          <h2 className="m-0 mb-[16px] font-fono text-[24px] font-normal uppercase leading-[28.8px] tracking-[0.01em] text-ink">{exactTitle(52, 8801)}</h2>
          <h3 className="m-0 mb-[16px] font-fono text-[18px] font-normal uppercase leading-[25.2px] tracking-[0.01em] text-ink">{exactTitle(31, 8802)}</h3>
          <p className={p}>{chars(66, 8803)}</p>
          <div><Placeholder label="Webinar banner image" ratio="816 / 443" rounded="" className="mb-[24px] !border-2 !border-ink" /></div>
          <p className={p}>{chars(170, 8804)}</p>
          <p className={p}>{chars(170, 8805)}</p>
          <p className={p}>{chars(250, 8806)}</p>
          <p className={p}>{chars(52, 8807)} <strong className="font-bold">{exactTitle(36, 8808)}</strong> {chars(40, 8809)}</p>
          <ul className="m-0 mb-[24px] pl-[24px]">
            {[0, 1, 2].map((i) => <li key={i} className="pl-[4px] font-sans text-[16px] font-light leading-[25.6px] text-ink">{chars(48, 8810 + i)}</li>)}
          </ul>
        </div>
        <form id="page-form" className="h-fit max-w-[500px] overflow-auto border-2 border-ink px-[24px] pb-[32px] pt-[24px]" onSubmit={(e) => e.preventDefault()}>
          <p className="m-0 pb-[34px] font-mono text-[18px] uppercase leading-[25.2px] text-ink">Register for the webinar</p>
          <div className="flex flex-col gap-[36px]">
            <TextInput label="E-mail" type="email" {...bind('email')} />
            <Consents className="-mt-[8px]" labels={['Subscribe to MotherDuck news', 'Subscribe to DuckDB ecosystem newsletter']} />
            <div className="-mt-[10px]">
              <OffsetButton type="submit" size="lg" disabled={!valid} disabledStyle>Register</OffsetButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
