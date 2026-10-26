// L7 / L8 ecosystem blocks: EcoHero (E1), PartnerCard (E2), JoinFlockCard (E3), BuildCTA (E4), PartnerModal (E5),
// partner tags + link icons (shared with PartnerDetail, E6).
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { OffsetButton, Placeholder, Checkbox } from '../ui'
import { Reveal, Doodle, SmartLink } from './bits.jsx'
import { useMedia } from './hooks.js'
import { Select } from './filters.jsx'
import { ECO_TAG_BG } from './data.js'
import { chars, shaped } from './lorem.js'

/* E2 tags */
export function EcoTags({ tags, className = '' }) {
  if (!tags.length) return null
  return (
    <div className={`flex flex-wrap gap-[4px] ${className}`}>
      {tags.map((t) => (
        <span key={t} className={`px-[8px] py-[4px] font-mono uppercase text-ink text-eco-tag lg:px-[12px] lg:py-[8px] ${ECO_TAG_BG[t] || 'bg-chip-gray'}`}>{t}</span>
      ))}
    </div>
  )
}

/* E2 link icon glyphs (22px, coral-red) */
const GLYPHS = {
  docs: <path d="M6 3h7l4 4v12H6zM13 3v4h4M9 11h5M9 14h5" />,
  blog: <path d="M4 5h14v12H4zM7 9h8M7 12h8M7 15h5" />,
  video: <path d="M4 6h14v10H4zM10 9v4l3.5-2z" />,
  'case-study': <path d="M4 7h14v11H4zM8 7V4h6v3M4 12h14" />,
}
const TIP = { docs: 'Docs', blog: 'Blog', video: 'Video', 'case-study': 'Case Study' }

function LinkIcon({ icon }) {
  return (
    <div className="group/tip relative">
      <SmartLink href={icon.href} aria-label={TIP[icon.kind]}
        className="flex h-[46px] w-[46px] items-center justify-center bg-coral-tile p-[12px] text-coral-red">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{GLYPHS[icon.kind]}</svg>
      </SmartLink>
      {/* tooltip (>=960): 54px below the tile top, ink, nub 8x8 rotated 45 at top -4 / left 27 */}
      <span role="tooltip" className="pointer-events-none absolute left-0 top-[54px] z-[2] hidden whitespace-nowrap bg-ink px-[12px] py-[10px] font-sans text-[12px] leading-[14.4px] text-white lg:group-hover/tip:block">
        <span className="absolute left-[27px] top-[-4px] h-[8px] w-[8px] rotate-45 bg-ink" />
        {TIP[icon.kind]}
      </span>
    </div>
  )
}

// "+N" overflow, re-measured live: the row shows what fits next to a 55.8x44 "+N" button (Mono 16, padding-left 8):
// 3 tiles at >=960 (max-width 262), 2 below (210). No hover state. Clicking reveals the rest, the icon bar
// slides up (bottom 0 -> 24px, transition bottom .3s) and the button becomes a 32x24 icon-only toggle.
export function LinkIcons({ icons, className = '', gap = 'gap-[8px]', open = false, onToggle, collapse = true }) {
  const lg = useMedia('(min-width: 960px)')
  if (!icons.length) return null
  const fit = lg ? 3 : 2
  const over = collapse && icons.length > fit + 1
  const limit = over && !open ? fit : icons.length
  return (
    <div className={`flex flex-wrap items-center ${gap} ${className}`}>
      {icons.slice(0, limit).map((ic, k) => <LinkIcon key={k} icon={ic} />)}
      {over && (
        <button type="button" aria-expanded={open} onClick={() => onToggle?.(!open)}
          className={`relative z-[1] border-0 bg-transparent pl-[8px] text-left font-mono text-[16px] leading-[16px] text-ink ${open ? 'flex h-[24px] w-[32px] items-center' : 'h-[44px] w-[55.8px]'}`}>
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Show fewer" className="rotate-180"><path d="M5 8.5 12 15.5 19 8.5" stroke="currentColor" strokeWidth="1.5" /></svg>
          ) : `+${icons.length - limit}`}
        </button>
      )}
    </div>
  )
}

/* E2: no hover lift. Card link -> /ecosystem/<slug>; icon bar sits absolutely at the bottom. */
export function PartnerCard({ p, reveal = true }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal enabled={reveal} className="h-full">
      <article className="relative flex h-full min-h-[315px] flex-col rounded-sm border-2 border-ink bg-white lg:min-h-[382px]">
        <Link to={`/ecosystem/${p.slug}`} className="flex flex-1 flex-col px-[24px] pb-[96px] pt-[24px] text-ink no-underline lg:px-[32px] lg:pb-[112px] lg:pt-[32px]">
          <div className="flex h-[52px] items-center lg:h-[60px]">
            <Placeholder label={`${p.name} logo`} className="h-full w-[150px]" />
          </div>
          <EcoTags tags={p.tags} className="pb-[16px] pt-[24px]" />
          <div className={`flex flex-col gap-[8px] bg-white ${p.tags.length ? '' : 'pt-[24px]'}`}>
            <h3 className="m-0 font-mono font-normal uppercase underline text-partner-name-sm md:text-partner-name-md lg:text-partner-name">{p.name}</h3>
            <p className="m-0 line-clamp-3 font-sans text-[14px] font-light leading-[140%] tracking-[0.32px] lg:text-[16px] lg:leading-[25.6px]">{p.desc}</p>
          </div>
        </Link>
        <div className="absolute left-0 right-0 bg-white p-[24px] pb-[32px] [transition:bottom_0.3s] lg:p-[32px] lg:pb-[40px]" style={{ bottom: open ? 24 : 0 }}>
          <LinkIcons icons={p.icons} open={open} onToggle={setOpen} className="max-w-[210px] lg:max-w-[262px]" />
        </div>
      </article>
    </Reveal>
  )
}

/* E3 */
export function JoinFlockCard({ onOpen }) {
  return (
    <div className="relative h-full overflow-hidden rounded-sm border-2 border-ink bg-sun px-[24px] py-[20px] md:p-[28px] lg:p-[32px] xl:flex xl:min-h-[230px] xl:items-center xl:px-[270px] xl:py-[28px]">
      {/* decor re-measured live @1440 (wave 120x112.6 r-40 b-25, circle 50 rot 25 l-25 t32, star r90 t28) and
          @768/390 (wave 110x103.2) */}
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
        <Doodle kind="wave" className="absolute bottom-[-20px] right-[-30px] h-[103.2px] w-[110px] lg:bottom-[-25px] lg:right-[-40px] lg:h-[112.6px] lg:w-[120px]" />
        <Doodle kind="star" className="absolute right-[24px] top-[16px] h-[17px] w-[17px] rotate-[20deg] xl:right-[90px] xl:top-[28px]" />
        <Doodle kind="circle" className="absolute left-[-25px] top-[32px] h-[50px] w-[50px] rotate-[25deg]" />
      </div>
      <Placeholder label="Partner illustration" className="!absolute bottom-[-8px] right-[18px] hidden h-[136.4px] w-[150px] md:flex lg:h-[163.7px] lg:w-[180px] xl:bottom-[-33px] xl:right-[107px] xl:h-[259.2px] xl:w-[285px]" />
      <div className="relative z-[2] flex flex-col items-start gap-[12px] xl:gap-[16px]">
        <h3 className="m-0 font-mono font-normal uppercase text-ink text-[18px] leading-[25.2px] lg:text-[24px] lg:leading-[33.6px]">Want to join the group?</h3>
        <p className="m-0 max-w-[560px] font-sans text-[15px] font-light leading-[22.5px] tracking-[0.32px] lg:text-[16px] lg:leading-[24px]">{chars(104, 3901)}</p>
        <div className="mt-[4px]"><OffsetButton arrow onClick={onOpen}>Become a Partner</OffsetButton></div>
      </div>
    </div>
  )
}

/* E1 */
export function EcoHero({ onOpen }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative flex justify-between overflow-visible pb-[215px] pt-[40px] md:pb-[218px] lg:pb-[170px] lg:pt-[80px] xl:pb-[180px] xl:pt-[110px]">
        <Doodle kind="loop" className="absolute left-[-165px] top-[100px] hidden h-[167.6px] w-[185.3px] rotate-[20deg] md:block xl:left-[-200px] xl:top-[200px] xl:h-[193px] xl:w-[230px]" />
        <Doodle kind="star" className="absolute left-[45%] top-[30px] h-[24px] w-[23px]" />
        <div className="relative z-[2] flex max-w-[900px] flex-col items-start gap-[16px] md:gap-[24px] lg:max-w-[690px] lg:gap-[32px] xl:max-w-[875px]">
          <h1 className="m-0 font-mono font-normal uppercase text-ink text-eco-h1-sm md:text-eco-h1-lg xl:text-eco-h1">Meet the Partners</h1>
          <p className="m-0 max-w-[500px] font-mono uppercase text-ink text-hero-tagline-mono-sm md:text-hero-tagline-mono-lg xl:max-w-[600px] xl:text-hero-tagline-mono">{shaped([8, 3, 5, 2, 11, 4, 12, 9, 9], 3801)}</p>
          <OffsetButton size="lg" arrow onClick={onOpen}>Become a Partner</OffsetButton>
        </div>
        <Placeholder label="Ecosystem illustration" className="!absolute bottom-[40px] right-[-60px] z-[1] h-[157px] w-[283px] md:bottom-auto md:right-[-112px] md:top-[120px] md:h-[222px] md:w-[400px] lg:right-[-55px] lg:top-[45px] lg:h-[249px] lg:w-[450px] xl:right-[-95px] xl:top-[40px] xl:h-[360px] xl:w-[650px]" />
      </div>
    </section>
  )
}

/* E4 */
export function BuildCTA({ onOpen }) {
  return (
    <section className="ct-ink-grid relative py-[92px] lg:pb-[120px] lg:pt-[100px] xl:pb-[160px] xl:pt-[120px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[134px] bg-gradient-to-b from-cream to-transparent" />
      <div className="container relative">
        <div className="mx-auto grid max-w-[360px] grid-cols-1 gap-[32px] rounded-sm md:gap-0 border-2 border-ink bg-white md:max-w-none md:grid-cols-[1fr_auto] xl:min-h-[325px] xl:max-w-[1028px]">
          <div className="flex flex-col items-start gap-[24px] px-[24px] pb-0 pt-[32px] md:pb-[35px] md:pl-[40px] md:pr-[30px] md:pt-[35px] lg:gap-[32px] lg:px-[68px] lg:py-[52px] xl:px-[80px] xl:py-[87px]">
            <div>
              <h2 className="m-0 font-mono font-normal uppercase text-ink text-[24px] leading-[28.8px] md:whitespace-nowrap xl:text-[32px] xl:leading-[38.4px]">Build with Northwind</h2>
              <p className="m-0 pt-[8px] font-sans text-[16px] font-light leading-[25.6px] md:pt-[12px]">{chars(79, 3951)}</p>
            </div>
            <OffsetButton onClick={onOpen}>Become a Partner</OffsetButton>
          </div>
          <div className="relative aspect-[1/0.7] w-full md:aspect-auto md:w-[260px] lg:w-[340px] xl:w-[480px]">
            <div className="absolute inset-[12%] rounded-[40%] bg-sky-tint" />
            <Placeholder label="Illustration" className="!absolute inset-[22%] !h-auto !w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* E5 partner modal (static placeholder form). Overlay click / Esc closes. */
function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-[8px]">
      <span className="font-mono text-[12px] uppercase leading-[16px] text-ink">{label} <span className="text-error">*</span></span>
      {children}
    </label>
  )
}
const inputCls = 'h-[58px] w-full rounded-sm border-2 border-ink bg-field px-[24px] font-sans text-input text-ink outline-none hover:border-sky-dark focus:border-sky-dark'

export function PartnerModal({ open, onClose }) {
  const [type, setType] = useState('')
  const [regions, setRegions] = useState({})
  useEffect(() => {
    if (!open) return undefined
    const on = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', on)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', on); document.body.style.overflow = prev }
  }, [open, onClose])
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-[99]" role="dialog" aria-modal="true" aria-label="Become a partner">
      <div className="absolute inset-0 bg-overlay [animation:overlay-in_200ms_ease-out]" onClick={onClose} />
      <div className="absolute bottom-0 left-0 max-h-[calc(100%-86px)] w-full overflow-auto border-y-2 border-ink bg-white p-[24px] animate-sheet-in lg:bottom-auto lg:left-1/2 lg:top-[calc(50%+24px)] lg:max-h-[calc(100%-108px)] lg:w-[720px] lg:border-2 lg:p-[40px] lg:animate-modal-in">
        <form className="flex flex-col gap-[24px]" onSubmit={(e) => e.preventDefault()}>
          <p className="m-0 font-sans text-[20px] leading-[32px] text-ink">{chars(110, 3991)}</p>
          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
            <Field label="First name"><input className={inputCls} /></Field>
            <Field label="Last name"><input className={inputCls} /></Field>
          </div>
          <Field label="E-mail"><input type="email" className={inputCls} /></Field>
          <Field label="Company"><input className={inputCls} /></Field>
          <div className="flex flex-col gap-[8px]">
            <span className="font-mono text-[12px] uppercase leading-[16px] text-ink">Partner type <span className="text-error">*</span></span>
            <Select label="Select a partner type" value={type} options={['Technology', 'Consulting', 'Reseller']} onChange={setType} />
          </div>
          <fieldset className="m-0 flex flex-col gap-[12px] border-0 p-0">
            <legend className="mb-[12px] font-mono text-[12px] uppercase leading-[16px] text-ink">Supported regions <span className="text-error">*</span></legend>
            <div className="grid grid-cols-2 gap-[12px]">
              {['NAMER', 'LATAM', 'EMEA', 'APJ', 'Global'].map((r) => (
                <Checkbox key={r} label={r} checked={!!regions[r]} onChange={(e) => setRegions((x) => ({ ...x, [r]: e.target.checked }))} />
              ))}
            </div>
          </fieldset>
          <div><OffsetButton type="submit" size="lg">Submit</OffsetButton></div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
