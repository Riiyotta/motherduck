import { useEffect, useMemo, useRef, useState } from 'react'
import { Container, OffsetButton, Placeholder, UnderlineLink } from '../ui'
import { usePrefersReducedMotion } from '../../lib/sim.js'
import { Chevron, Doodle, TickerBand, TiltedTag } from './bits.jsx'
import { Collapse, Parallax, Reveal, useMedia } from './motion.jsx'
import { filler, heading } from './copy.js'
import { Scene } from '../ui/art/kit.jsx'
import { C as ART } from '../ui/art/palette.js'

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
const H2 = 'm-0 font-mono text-careers-h2-sm font-normal uppercase md:text-careers-h2-md lg:text-careers-h2'

// A1 PageHeroIllustrated, variant 'careers'. Below XL the collage drops under the text (section
// bottom padding reserves its space); offsets are the measured section-relative positions.
export function CareersHero() {
  return (
    <section className="relative z-[2] overflow-hidden bg-cream pb-[365px] pt-[30px] md:pb-[420px] md:pt-[64px] lg:pb-[480px] lg:pt-[92px] xl:pb-[210px] xl:pt-[144px]">
      <Parallax from={91} to={219} className="pointer-events-none absolute right-[3%] top-[300px] -z-[1] max-md:hidden">
        <Doodle kind="diamond" size={56} />
      </Parallax>
      <Container className="relative">
        <div className="relative z-[1] flex max-w-[571px] flex-col gap-[24px] md:max-w-[600px] lg:max-w-[720px]">
          <h1 className="m-0 font-mono text-careers-h1-sm font-normal uppercase md:text-page-h1-md lg:text-page-h1">Work with care</h1>
          <p className="m-0 font-sans text-lede-sm lg:text-lede">{filler(135, 11)}</p>
          <div className="flex flex-col items-start gap-[32px] pt-[12px] md:flex-row md:items-center md:gap-[40px] md:pt-0">
            <OffsetButton size="lg" onClick={() => scrollToId('open-positions')}>See open positions</OffsetButton>
            <UnderlineLink icon="down" onClick={() => scrollToId('how-we-work')}>LEARN MORE</UnderlineLink>
          </div>
        </div>
      </Container>
      {/* Collage: 460x320 / 602x430 / 702x514 below the text; 610x531 beside it at XL */}
      <div className="absolute left-[calc(50%-230px)] top-[355.6px] h-[320px] w-[460px] md:left-[calc(50%-252.8px)] md:top-[276.6px] md:h-[430px] md:w-[602px] lg:left-[calc(50%-245.7px)] lg:top-[322.2px] lg:h-[514px] lg:w-[702px] xl:left-[calc(50%+140px)] xl:top-[43.2px] xl:h-[531px] xl:w-[610px]">
        <Placeholder label="Careers hero collage" className="h-full w-full" />
      </div>
    </section>
  )
}

// [heading chars, heading seed, paragraph chars, paragraph seed]
const FEATURES = [[11, 21, 262, 8], [17, 22, 301, 30]]

// B1 HowWeWork
export function HowWeWork() {
  const f2 = useRef(null)
  const [second, setSecond] = useState(false)
  useEffect(() => {
    const on = () => {
      const el = f2.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setSecond(r.top < window.innerHeight * 0.75 && r.bottom > 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <section id="how-we-work" className="relative">
      <h2 className="sr-only">How we work</h2>
      {/* Sticky ticker layer (P6): 60px band (52 at SM), rotate -2.6deg, sticky 86 / 300 / 305 / 275 */}
      <div className="pointer-events-none absolute inset-0 overflow-x-clip pb-[70px] pt-[18px] md:pb-[480px] md:pt-[100px] lg:pb-[525px] xl:pb-[605px]" aria-hidden="true">
        <div className="sticky top-[86px] md:top-[300px] lg:top-[305px] xl:top-[275px]">
          <TickerBand
            label="How we work"
            count={20}
            className="hww-ticker h-[52px] w-full items-center border-y-2 border-ink bg-sun md:h-[60px]"
            spanClassName="mx-[30px] text-ticker-lg-sm md:mx-[40px] md:text-ticker-lg"
          />
        </div>
      </div>
      <Container className="relative flex flex-col pb-[140px] pt-[72px] md:flex-row md:justify-between md:gap-[40px] md:pt-0 lg:gap-[60px]">
        <div className="hidden md:block md:w-[300px] md:shrink-0 md:pt-[100px] lg:pb-[45px] xl:w-[430px]">
          <div className="sticky top-[300px] h-[400px] w-full border-2 border-ink bg-cream shadow-[12px_12px_0_0_#383838] lg:top-[305px] xl:top-[275px] xl:h-[480px] xl:shadow-hard-r16">
            <Placeholder label="Team at work photo 1" bordered={false} rounded="" className="!absolute inset-0 !h-full !w-full" />
            <Placeholder label="Team at work photo 2" bordered={false} rounded="" variant="shape"
              className="!absolute inset-0 !h-full !w-full" style={{ opacity: second ? 1 : 0 }} />
          </div>
        </div>
        <div className="flex w-full flex-col gap-[80px] md:w-[348px] md:gap-[380px] md:pb-[70px] md:pt-[190px] lg:w-[560px] lg:gap-[400px] lg:pb-[100px] lg:pt-[180px] xl:w-[752px] xl:gap-[315px] xl:pb-0 xl:pt-[225px]">
          {FEATURES.map(([hch, hseed, pch, pseed], i) => (
            <div key={i} ref={i === 1 ? f2 : undefined} className="flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px] lg:pt-[10px] xl:-translate-y-[40px] xl:pb-[160px] xl:pt-[80px]">
              <div className="mb-[20px] h-[300px] w-full max-w-[364px] border-2 border-ink shadow-[8px_8px_0_0_#383838] md:hidden">
                <Placeholder label={`Team at work photo ${i + 1}`} bordered={false} rounded="" className="h-full w-full" />
              </div>
              <h3 className="m-0 font-sans text-feature-h3 md:text-feature-h3-md lg:text-feature-h3">{heading(hch, hseed)}</h3>
              <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] lg:text-[20px] lg:leading-[32px]">{filler(pch, pseed)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// B2 VideoFeature. The tag sits in flow above the band and is pushed down onto its top border.
export function VideoFeature() {
  return (
    <section className="relative">
      <TiltedTag bg="#50C7B7" className="culture-tag mx-auto !px-[24px] text-page-h2-xs md:!px-[30px] md:text-page-h2-sm lg:text-page-h2">Our culture</TiltedTag>
      <div className="relative overflow-hidden border-y-2 border-ink bg-sun">
        <Doodle kind="cloud" size={220} className="absolute -left-[40px] top-[40px] opacity-60" />
        <Doodle kind="blob" size={180} className="absolute -right-[30px] bottom-[20px] opacity-60" />
        <Container className="flex h-[540px] items-center justify-center md:h-[636px] lg:h-[736px] xl:h-[766px]">
          <Reveal dir="up" duration={0.75}
            className="relative grid w-[342px] max-w-full border-2 border-ink bg-cream md:w-[544px] lg:w-[700px] xl:w-[850px]">
            <Placeholder ratio="16 / 9" label="Culture video thumbnail" bordered={false} rounded="" />
            <button
              type="button"
              aria-label="Play video (unavailable in this preview)"
              className="absolute left-1/2 top-1/2 flex h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-white p-0 [transition:background-color_.1s_ease-in-out] md:h-[76px] md:w-[76px]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] translate-x-[1.8px] md:h-[28.8px] md:w-[28.8px] md:translate-x-[2.88px]">
                <path d="M6 3.5v17L20 12Z" fill="#383838" />
              </svg>
            </button>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}

const VALUES = [
  ['Flexibility', '#50C7B7', 352, 0.4, 9],
  ['Thoughtfulness', '#6FC2FF', 324, 0.8, 40],
  ['Unorthodoxy', '#FF7169', 388, 1.2, 83],
  ['Agency', '#FFDE00', 301, 1.6, 122],
]

function ValueCard({ title, bg, ch, dur, seed }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal as="article" dir="up" duration={dur}
      className="mb-[24px] w-full shrink-0 bg-ink md:mb-0 md:mr-[24px] md:w-[313.4px] lg:w-[415.1px] xl:-mr-[2px] xl:w-[312px]">
      {/* live: an open card shows a 12px ink band below it (padding-bottom .125s ease-in-out; removed instantly on close) */}
      <div className={open ? 'pb-[12px] [transition:padding-bottom_.125s_ease-in-out]' : ''}>
      <div className="border-2 border-ink bg-white">
        <div className="flex h-[210px] items-center justify-center border-b-2 border-ink px-[32px] pb-[32px] pt-[20px] md:h-[214px] md:pt-[24px] lg:h-[222px] lg:p-[32px]" style={{ background: bg }}>
          <Placeholder width={156} height={156} variant="shape" label={`${title} illustration`} />
        </div>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-[54.4px] w-full items-center justify-between border-0 bg-white px-[20px] py-[16px] text-ink md:h-[60px] md:px-[24px] md:py-[18px] lg:h-[62px] lg:py-[16px]"
        >
          <h3 className="m-0 font-mono text-[16px] font-normal uppercase leading-[22.4px] lg:text-[18px] lg:leading-[25.2px]">{title}</h3>
          <Chevron size={30} open={open} className="!h-[20px] !w-[20px] md:!h-[24px] md:!w-[24px] lg:!h-[30px] lg:!w-[30px]" />
        </button>
        <Collapse open={open} duration={125}>
          <p className="m-0 px-[20px] pb-[20px] font-sans text-[14px] font-normal leading-[19.6px] tracking-[0.28px] md:pb-[24px] md:pl-[24px] lg:leading-[22.4px]">{filler(ch, seed)}</p>
        </Collapse>
      </div>
      </div>
    </Reveal>
  )
}

// B3 ValuesCards. Container reserves room for an opened card (min-height 670 / 680 / 710).
// MD/LG: the row runs past the container to the viewport edge and scrolls horizontally.
export function ValuesCards() {
  return (
    <section className="pt-[100px] md:pt-[120px] lg:pt-[140px] xl:pt-[160px]">
      <Container className="pb-[50px] md:min-h-[670px] md:pb-0 lg:min-h-[680px] xl:min-h-[710px]">
        <h2 className={`${H2} pb-[32px] md:pb-[40px] lg:pb-[52px]`}>What we value</h2>
        <div className="no-scrollbar flex flex-col items-start md:mr-[calc((100%-100vw)/2)] md:flex-row md:overflow-x-auto xl:mr-0 xl:overflow-visible">
          {VALUES.map(([t, bg, ch, dur, seed]) => (
            <ValueCard key={t} title={t} bg={bg} ch={ch} dur={dur} seed={seed} />
          ))}
        </div>
      </Container>
    </section>
  )
}

const JOBS = [
  { dept: 'Engineering', title: 'Data Engineer, Core Team', location: 'City Alpha, City B', type: 'Full Time', comp: 'Compensation range placeholder' },
  { dept: 'Marketing', title: 'Content Marketer', location: 'City Alpha, City Beta, City Gamma, Remote', type: 'Full Time' },
  { dept: 'Sales', title: 'Account Executive, Placeholder Region', location: 'City B, City C', type: 'Full Time', comp: 'Compensation range placeholder, plus equity too' },
]
const FILTERS = [
  ['dept', 'Department'],
  ['location', 'Location'],
  ['type', 'Employment type'],
]
const optionsFor = (key) =>
  key === 'location'
    ? [...new Set(JOBS.flatMap((j) => j.location.split(', ')))]
    : [...new Set(JOBS.map((j) => j[key]))]

function Select({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[52px] w-full items-center justify-between gap-[8px] border-2 border-ink bg-[rgba(248,248,247,0.698)] px-[20px] py-[15px] md:h-[56.4px]"
      >
        <span className={`truncate font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] ${value ? 'text-ink' : 'text-gray-600'}`}>
          {value || label}
        </span>
        <Chevron size={20} open={open} />
      </button>
      {open && (
        // Measured on the original: 2px ink border, white, padding 24, options Inter 16/16 300 gap 16,
        // hover -> weight 700 (no background). Overlaps the trigger's bottom border by 2px.
        <ul
          id="dropdown-menu"
          role="listbox"
          className="absolute left-0 top-[calc(100%-2px)] z-[3] m-0 flex w-full animate-dropdown-in list-none flex-col gap-[16px] border-2 border-ink bg-white p-[24px]"
        >
          {options.map((o) => (
            <li key={o} role="option" aria-selected={value === o} className="pb-[2px]">
              <button
                type="button"
                onClick={() => { onChange(value === o ? '' : o); setOpen(false) }}
                className={`block w-full border-0 bg-transparent p-0 text-left font-sans text-[16px] leading-[16px] text-ink hover:font-bold ${value === o ? 'font-bold' : 'font-light'}`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function JobCard({ job }) {
  return (
    <div className="group grid grid-cols-[1fr_24px] items-center gap-[12px] border-2 border-ink bg-white p-[20px] md:p-[24px] xl:grid-cols-[1fr_32px] xl:gap-[16px] xl:p-[32px]">
      <div className="flex flex-col gap-[8px]">
        <h4 className="m-0 pb-[4px] font-sans text-[18px] font-semibold leading-[21.6px] md:leading-[28.8px] xl:text-[24px]">{job.title}</h4>
        <p className="m-0 font-sans text-[14px] font-light leading-[19.6px] xl:text-[16px] xl:leading-[25.6px]">
          {job.dept} • {job.location} • {job.type}
        </p>
        {job.comp && <p className="m-0 font-sans text-[12px] font-light leading-[16.8px] text-gray-500 xl:text-[14px] xl:leading-[19.6px]">{job.comp}</p>}
      </div>
      <div className="self-start transition-transform duration-150 ease-in-out group-hover:-translate-x-[12px] xl:group-hover:-translate-x-[16px]">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="block h-[24px] w-[24px] xl:h-[32px] xl:w-[32px]">
          <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>
    </div>
  )
}

// B4 JobsBoard (Ashby embed rebuilt as local static data)
export function JobsBoard() {
  const [f, setF] = useState({ dept: '', location: '', type: '' })
  const [panelOpen, setPanelOpen] = useState(false)
  const jobs = JOBS.filter(
    (j) => (!f.dept || j.dept === f.dept) && (!f.location || j.location.split(', ').includes(f.location)) && (!f.type || j.type === f.type),
  )
  const groups = useMemo(() => [...new Set(jobs.map((j) => j.dept))], [jobs])
  const selects = (
    <div className="grid grid-cols-1 gap-[18.4px] px-[13px] pb-[16px] md:grid-cols-3 md:gap-[16px] md:px-[16px] md:pb-[12px] xl:px-[20px] xl:pb-[16px]">
      {FILTERS.map(([key, label]) => (
        <Select key={key} label={label} value={f[key]} options={optionsFor(key)} onChange={(v) => setF((s) => ({ ...s, [key]: v }))} />
      ))}
    </div>
  )
  return (
    <section id="open-positions" className="scroll-mt-[var(--header-total)] pb-[120px] md:pb-[64px] lg:pb-[44px] xl:pb-0">
      <Container className="lg:flex lg:justify-between">
        <div className="w-full lg:w-[620px] xl:w-[740px]">
          <h2 className={`${H2} pb-[32px] pt-[10px] md:pb-[40px] md:pt-[30px] lg:pt-[40px] xl:pb-[52px] xl:pt-[50px]`}>Open positions</h2>
          <div className="bg-filter-bg">
            <div className="flex items-center justify-between px-[12px] py-[16px] md:px-[16px] xl:px-[20px]">
              <button
                type="button"
                onClick={() => setPanelOpen((o) => !o)}
                aria-expanded={panelOpen}
                className="flex items-center gap-[8px] border-0 bg-transparent p-0 font-sans text-[16px] font-normal leading-[25.6px] tracking-[0.32px] text-ink max-md:w-full max-md:justify-between md:pointer-events-none xl:text-[18px] xl:leading-[28.8px] xl:tracking-[0.36px]"
              >
                {/* live <728: chevron at the row's right edge (margin 0 8) */}
                Filters <Chevron size={20} open={panelOpen} className="mx-[8px] md:hidden" />
              </button>
              <UnderlineLink tone="muted" icon="reset" className="max-md:hidden" onClick={() => setF({ dept: '', location: '', type: '' })}>CLEAR ALL</UnderlineLink>
            </div>
            <div className="hidden md:block">{selects}</div>
            <div className={`overflow-hidden [transition:max-height_.25s_ease-in-out] md:hidden ${panelOpen ? 'max-h-[400px]' : 'max-h-0'}`} style={panelOpen ? { overflow: 'visible' } : undefined}>
              {selects}
              {/* live <728: CLEAR ALL sits in the open panel, right-aligned, 20px above the panel bottom */}
              <div className="flex justify-end px-[12px] pb-[20px] pt-[3.2px]">
                <UnderlineLink tone="muted" icon="reset" onClick={() => setF({ dept: '', location: '', type: '' })}>CLEAR ALL</UnderlineLink>
              </div>
            </div>
          </div>
          <div className="mt-[32px] flex flex-col gap-[32px] pb-[32px] md:mt-[52px] md:gap-[52px] md:pb-[48px] lg:mt-[64px] xl:gap-[60px]">
            {groups.length === 0 && <p className="m-0 font-sans text-[16px] font-light leading-[25.6px]">No open positions match these filters.</p>}
            {groups.map((g) => (
              <div key={g}>
                <h3 className="m-0 pb-[24px] pr-[70px] font-mono text-[18px] font-normal uppercase leading-[25.2px] lg:text-[24px] lg:leading-[33.6px]">{g}</h3>
                <div className="flex flex-col gap-[24px]">
                  {jobs.filter((j) => j.dept === g).map((j) => <JobCard key={j.title} job={j} />)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[24px] pb-[80px] pt-[36px] md:gap-[16px] md:pt-[24px] lg:gap-[20px] lg:pb-[72px] lg:pt-[36px] xl:max-w-[540px] xl:pb-[116px]">
            <p className="m-0 font-mono text-[18px] uppercase leading-[25.2px] md:text-[24px] md:leading-[33.6px] lg:text-[32px] lg:leading-[44.8px]">{heading(39, 1)}</p>
            <UnderlineLink>Join our Talent Community</UnderlineLink>
          </div>
        </div>
        <div className="flex justify-center lg:block lg:shrink-0 xl:mx-[38px]">
          <Reveal dir="up" duration={1} className="h-[290px] w-[247px] md:h-[407px] md:w-[335px] lg:sticky lg:top-[372px] lg:h-[280px] lg:w-[230px] xl:top-[302px] xl:h-[427px] xl:w-[364px]">
            <Placeholder label="World map illustration" className="h-full w-full" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// Group layouts measured inside a 510x360 group (x scales with group width, y with height).
// Sequence of the 10 unique groups: A B A C D A B A C D.
const GA = [[20.4, 0, 479.4, 360]]
const GB = [[0, 0, 249.9, 360], [270.3, 0, 178.5, 169.2], [270.3, 190.8, 239.7, 169.2]]
const GC = [[0, 0, 265.2, 198], [168.3, 176.4, 316.2, 183.6]]
const GD = [[7.6, 0, 255, 162], [33.1, 147.6, 204, 212.4], [293.3, 0, 209.1, 252]]
const PATTERNS = [GA, GB, GA, GC, GD]
const pct = (v, total) => `${(v / total) * 100}%`

// B5 PhotoMarquee: scrollLeft += 60px/s, wraps at one third of the track.
export function PhotoMarquee() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return undefined
    const el = ref.current
    let raf = 0
    let last = performance.now()
    let pos = el.scrollLeft
    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000
      last = now
      const third = el.scrollWidth / 3
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft // user scrolled manually
      pos += 60 * dt
      if (pos >= third) pos -= third
      el.scrollLeft = pos
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])
  return (
    <section className="overflow-hidden pb-[64px] pt-[12px] md:py-[100px]" aria-label="Team photos">
      <div ref={ref} data-motion="continuous" className="no-scrollbar overflow-x-auto">
        <div className="flex w-max">
          {Array.from({ length: 30 }, (_, i) => {
            const pattern = PATTERNS[i % PATTERNS.length]
            return (
              <div key={i} className="relative mr-[14px] h-[184px] w-[260px] shrink-0 md:mr-[28px] md:h-[332px] md:w-[460px] xl:mr-[42px] xl:h-[360px] xl:w-[510px]" aria-hidden={i >= 10 || undefined}>
                {pattern.map(([x, y, w, h], k) => (
                  <Placeholder
                    key={k}
                    label={`Team photo ${(i % 10) + 1}.${k + 1}`}
                    bordered={false}
                    variant={k % 2 ? 'shape' : 'hatch'}
                    className="!absolute border border-ink md:border-2"
                    style={{ left: pct(x, 510), top: pct(y, 360), width: pct(w, 510), height: pct(h, 360) }}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const BENEFITS = [[42, 1], [51, 21], [51, 61], [18, 7], [9, 5]]

// Line-art doodle field behind the card (composed from the shared art kit, outline only). Live: one 1280x760 layer
// centred at >=960; below that a 1.1-aspect layer (699x635 @768, 615x559 @390) that fills the teal height, centred.
const LINE = { fill: 'none' }
const FIELD_LG = [
  ['xcircle', 217, 20, 3.8, LINE], ['leaf', 415, 58, 2.4, LINE, -30], ['burst', 912, 23, 1, { fill: 'none', r: 56, n: 11 }],
  ['diamond', 599, 64, 1.15, LINE], ['diamond', 861, 99, 0.85, LINE], ['diamond', 246, 146, 0.85, LINE],
  ['diamond', 285, 334, 0.85, LINE], ['diamond', 1036, 466, 0.85, LINE], ['diamond', 901, 676, 0.85, LINE],
  ['ticket', 199, 230, 1.2, LINE, -14], ['xcircle', 1104, 246, 2.7, LINE], ['pebble', 1010, 380, 2.6, LINE, 20],
  ['xcircle', 89, 466, 2.1, LINE], ['planet', 270, 498, 1.9, LINE, -30], ['oval', 695, 672, 1.4, {}, -12],
  ['oval', 805, 652, 1.4, {}, -12], ['xcircle', 504, 729, 3.8, LINE], ['rocket', 1060, 668, 2.4, { fill: 'none', accent: 'none' }, -15],
  ['oval', 220, 830, 6, {}],
]
const FIELD_SM = [
  ['xcircle', 50, 13, 2.8, LINE], ['leaf', 190, 73, 2, LINE, -30], ['burst', 600, 13, 1, { fill: 'none', r: 48, n: 11 }],
  ['diamond', 338, 56, 1, LINE], ['diamond', 573, 103, 0.7, LINE], ['diamond', 633, 429, 0.7, LINE], ['diamond', 80, 178, 0.7, LINE],
  ['xcircle', 423, 93, 3.4, LINE, 45], ['ticket', 23, 231, 1, LINE, -14], ['xcircle', 657, 193, 2.1, LINE],
  ['xcircle', 54, 326, 1.6, LINE], ['pebble', 618, 313, 2.2, LINE, 20], ['planet', 65, 458, 1.3, LINE, -30],
  ['oval', 180, 690, 5.5, {}], ['oval', 430, 585, 1.1, {}, -12], ['oval', 520, 575, 1.1, {}, -12], ['xcircle', 335, 625, 2.2, LINE],
  ['rocket', 615, 568, 2.2, { fill: 'none', accent: 'none' }, -15],
]

// B6 BenefitsCard + the "join" ticker: one section, 829 / 829 / 704 / 628 tall (teal 764 / 764 / 639 / 563 + 65).
// Card 342 / 502 / 698.7 wide (content-sized on the original; fixed here). Stickers: heart at the card's top-right
// (81x72 @>=960, 53x47 below), teal coin badge on the top edge (93x90, >=960 only).
export function BenefitsCard() {
  return (
    <section>
      <div className="relative overflow-hidden border-y-2 border-ink bg-teal py-[100px] md:py-[131px] lg:py-[175px]">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 hidden h-[760px] w-[1280px] -translate-x-1/2 lg:block">
          <Scene w={1280} h={760} items={FIELD_LG} slice={false} />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 top-0 aspect-[699/635] -translate-x-1/2 lg:hidden">
          <Scene w={699} h={635} items={FIELD_SM} slice={false} />
        </div>
        <Container className="relative flex justify-center">
          <Reveal dir="up" duration={1} className="relative w-full border border-ink bg-white shadow-[-8px_8px_0_0_#383838] md:w-[502px] md:shadow-hard-20 lg:w-[698.7px]">
            <div aria-hidden="true" className="absolute left-[370px] top-[-69px] z-[2] hidden h-[90px] w-[93px] lg:block">
              <Scene w={93} h={90} items={[['xcircle', 46.5, 45, 4.2, { fill: '#50C7B7' }, 45]]} slice={false} />
            </div>
            <div aria-hidden="true" className="absolute right-[-16px] top-[8px] z-[2] h-[47px] w-[53px] md:right-[30px] md:top-[-24px] lg:right-[-37px] lg:top-[-29px] lg:h-[72px] lg:w-[81px]">
              <Scene w={92} h={82} items={[['heart', 46, 44, 1, { fill: ART.red }]]} slice={false} />
            </div>
            <h2 className="absolute left-[24px] top-[-14px] z-[1] m-0 border-2 border-ink bg-sun px-[24px] py-[8px] font-sans text-[16px] font-normal uppercase leading-[22.4px] tracking-[0.32px] md:left-[40px] md:top-[-11px] md:text-[18px] md:leading-[25.2px] md:tracking-[0.36px] lg:left-[72px] lg:top-[-30px] lg:px-[32px] lg:text-[32px] lg:leading-[44.8px] lg:tracking-[0.64px]">
              Benefits
            </h2>
            <ul className="m-0 flex list-none flex-col gap-[12px] px-[40px] py-[52px] md:gap-[16px] md:px-[60px] md:py-[64px] lg:px-[80px] lg:py-[92px]">
              {BENEFITS.map(([ch, seed], i) => (
                <li key={i} className="benefit-li relative pl-[28px] font-sans text-lede-sm lg:text-lede">{filler(ch, seed)}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
      {/* Live label is 14 characters (Aeonik Mono 18 -> 156px per item); placeholder keeps the length */}
      <TickerBand
        label="Come build now"
        count={15}
        className="h-[65px] items-center border-y-2 border-ink bg-ink"
        spanClassName="ml-[40px] mr-[52px] text-ticker text-cream"
      />
    </section>
  )
}

// [chars, seed]; quote 3 is set at 18/25.2 on XL/LG
const QUOTES = [
  { ch: 466, seed: 63, size: 'lg:text-[20px] lg:leading-[28px] lg:tracking-[0.4px]' },
  { ch: 458, seed: 86, size: 'lg:text-[20px] lg:leading-[28px] lg:tracking-[0.4px]' },
  { ch: 587, seed: 92, size: 'lg:text-[18px] lg:leading-[25.2px] lg:tracking-[0.36px]' },
]

const QuoteMark = ({ className = '' }) => (
  <svg viewBox="0 0 30 27" aria-hidden="true" className={`h-[23.1px] w-[26px] xl:h-[26.7px] xl:w-[30px] ${className}`}>
    <path d="M0 27V15C0 6 5 1 13 0v5c-4 1-6 4-6 9h6v13Zm17 0V15c0-9 5-14 13-15v5c-4 1-6 4-6 9h6v13Z" fill="#383838" />
  </svg>
)

// P6 dark band + B7 TestimonialCarousel. XL: vertical 380px slides; below: horizontal slides
// (440 tall at LG/MD; SM stacks photo 356 over the quote).
export function Testimonials() {
  const [i, setI] = useState(0)
  const xl = useMedia('(min-width: 1302px)')
  const n = QUOTES.length
  // Autoplay (measured live @1440/390): starts once the carousel is in view, advances every 9000ms with the 500ms
  // ease slide, stops on the last slide (no wrap) and stops for good once the pointer enters the carousel or the
  // reader navigates manually. Skipped under prefers-reduced-motion.
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } })
    io.observe(el)
    return () => io.disconnect()
  }, [inView])
  useEffect(() => {
    if (!auto || !inView || reduced || i >= n - 1) return undefined
    const t = setTimeout(() => setI((v) => Math.min(v + 1, n - 1)), 9000)
    return () => clearTimeout(t)
  }, [auto, inView, reduced, i, n])
  const go = (d) => { setAuto(false); setI((v) => (v + d + n) % n) }
  const ctrl = 'flex items-center justify-center border-0 bg-transparent p-0 text-ink transition-transform duration-200 ease-in-out'
  return (
    <>
      <section ref={ref} onMouseEnter={() => setAuto(false)} className="relative overflow-hidden border-b-2 border-ink bg-sky-hover xl:h-[380px]" aria-roledescription="carousel">
        <div
          className="flex items-start transition-transform duration-500 ease-[ease] md:items-stretch xl:flex-col"
          style={{ transform: xl ? `translateY(${-380 * i}px)` : `translateX(${-100 * i}%)` }}
        >
          {QUOTES.map((q, k) => (
            <div key={k} aria-hidden={k !== i || undefined}
              className="flex w-full shrink-0 flex-col-reverse md:grid md:h-[440px] md:grid-cols-[459fr_309fr] lg:grid-cols-[971fr_309fr] xl:h-[380px] xl:grid-cols-[938px_500px]">
              <div className="flex flex-col items-center justify-center border-t-2 border-ink px-[24px] pb-[74px] pt-[40px] md:border-t-0 md:px-[40px] md:pb-[40px] md:pt-[10px] xl:py-0 xl:pl-[106px] xl:pr-[68px]">
                <div className="flex w-full flex-col items-start">
                  <QuoteMark className="mb-[10px] xl:mb-[16px]" />
                  <blockquote className={`m-0 w-full font-sans xl:max-w-[762px] text-[16px] font-normal leading-[22.4px] tracking-[0.32px] max-lg:text-center ${q.size}`}>{filler(q.ch, q.seed)}</blockquote>
                  <QuoteMark className="mt-[10px] rotate-180 self-end" />
                </div>
              </div>
              <div className="relative h-[356px] md:h-full">
                <Placeholder bordered={false} rounded="" label={`Portrait ${k + 1}`} className="!absolute inset-0 !h-full !w-full" />
                <span aria-hidden="true" className="absolute left-[calc(50%-8px)] top-[349px] z-[1] h-[22.6px] w-[22.6px] -rotate-45 border-r-2 border-t-2 border-ink bg-sky-hover md:left-[-8.5px] md:top-[396.5px] md:rotate-45 xl:top-[330px]" />
                <div className="absolute bottom-0 flex flex-col gap-[4px] border-r-2 border-t-2 border-ink bg-cream py-[14px] pl-[30px] pr-[22px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:items-center max-md:border-l-2 max-md:pb-[18px] max-md:pr-[30px] max-md:text-center md:left-0">
                  <span className="whitespace-nowrap font-sans text-[20px] font-semibold leading-[24px] tracking-[0.4px] md:text-[16px] md:leading-[19.2px] md:tracking-[0.32px] xl:text-[24px] xl:leading-[28.8px] xl:tracking-[0.48px]">Team Member {k + 1}</span>
                  <span className="whitespace-nowrap font-sans text-[16px] font-light leading-[20.8px] tracking-[0.32px] md:text-[14px] md:leading-[18.2px] md:tracking-[0.28px] xl:text-[16px] xl:leading-[20.8px] xl:tracking-[0.32px]">Role placeholder, Team</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {xl ? (
          <div className="absolute left-[45px] top-1/2 flex -translate-y-1/2 flex-col gap-[60px]">
            <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={ctrl}><Chevron size={24} dir="up" /></button>
            <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={ctrl}><Chevron size={24} dir="down" /></button>
          </div>
        ) : (
          <div className="absolute bottom-[32px] left-1/2 flex -translate-x-1/2 gap-[40px] md:left-[calc(30%)] lg:left-[38%]">
            <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={ctrl}><Chevron size={24} dir="left" /></button>
            <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={ctrl}><Chevron size={24} dir="right" /></button>
          </div>
        )}
      </section>
    </>
  )
}

// B8 ClosingCTA. Text column 342 / 305.6 / 411.1 / 516.8; illustration 327x279 / 400x320 / 514x417.
export function ClosingCTA() {
  return (
    <section className="overflow-x-clip pb-[32px] pt-[80px] md:py-[60px]">
      <Container className="flex flex-col gap-[20px] md:flex-row md:justify-between">
        <Reveal dir="right" duration={1} className="flex flex-col items-start justify-center gap-[24px] md:w-[305.6px] md:shrink-0 md:gap-[16px] lg:w-[411.1px] xl:w-[516.8px]">
          <p className="m-0 font-mono text-[24px] uppercase leading-[33.6px] lg:text-[32px] lg:leading-[44.8px]">{heading(39, 50)}</p>
          <UnderlineLink>Join our Talent Community</UnderlineLink>
        </Reveal>
        <Reveal dir="left" duration={1} className="flex justify-center md:flex-1">
          <Placeholder label="Closing illustration" className="h-[279px] w-[327px] lg:h-[320px] lg:w-[400px] xl:h-[417px] xl:w-[514px]" />
        </Reveal>
      </Container>
    </section>
  )
}
