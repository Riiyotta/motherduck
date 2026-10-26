// X19 split-form LP (PAGES_SPEC_EXTRA §7): /together-ai, /duckdb-book-form, /sql-duckdb-book-form.
// Hero (centred) -> 2-column split panel (sun prose | cream form with local success overlay) -> optional Sneak Peek.
import { useState } from 'react'
import { Checkbox, Container, OffsetButton, Placeholder, TextInput } from '../ui'
import ArticleProse from '../content/ArticleProse.jsx'
import { Doodle } from '../company/bits.jsx'
import { isEmail } from '../company/forms.js'
import { words } from './generic.jsx'
import '../../styles/content.css'
import '../../styles/marketing.css'
import '../../styles/extra-marketing.css'

function SplitHero({ h1, lede, logos }) {
  return (
    <Container className="relative">
      <div className="mb-[64px] mt-[40px] flex flex-col items-center gap-[24px] text-center md:mb-[100px] md:mt-[62px] md:gap-[20px] lg:mb-[120px] lg:mt-[90px] xl:mb-[140px] xl:mt-[110px]">
        <h1 className="m-0 font-mono text-[24px] font-normal uppercase leading-[33.6px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[57.6px] xl:px-[120px] xl:text-[56px] xl:leading-[67.2px]">{h1}</h1>
        <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] lg:text-[20px] lg:leading-[32px] lg:tracking-[0.4px]">{lede}</p>
        {logos && (
          <div className="mt-[16px] grid w-[327px] grid-cols-2 gap-[2px] border-2 border-ink bg-ink md:mt-[32px] md:w-[480px]">
            {['Partner logo 1', 'Partner logo 2'].map((l) => (
              <div key={l} className="flex h-[60px] bg-white px-[10px] py-[12px] md:h-[83px] md:px-[20px] md:py-[18px]">
                <Placeholder label={l} bordered={false} className="h-full w-full" />
              </div>
            ))}
          </div>
        )}
      </div>
      <Doodle kind="star" size={53} className="absolute right-[-21px] top-[-22.6px] hidden md:block lg:right-[-24px] xl:right-[-22px]" />
      <Doodle kind="blob" size={54} className="absolute right-[-30px] top-[2px] md:hidden" />
    </Container>
  )
}

function LeadForm({ cfg }) {
  const [v, setV] = useState(() => Object.fromEntries(cfg.fields.map((f) => [f.name, ''])))
  const [news, setNews] = useState(false)
  const [eco, setEco] = useState(false)
  const [sent, setSent] = useState(false)
  const ok = cfg.fields.every((f) => (f.type === 'email' ? isEmail(v[f.name]) : v[f.name].trim()))
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  return (
    // form and success overlay share one grid cell (as on the original): the column is as tall as the taller of the two
    <div className="grid bg-cream lg:min-h-[291px] xl:min-h-[375px]">
      <div className="col-start-1 row-start-1 flex flex-col items-start gap-[24px] self-start px-[24px] py-[52px] md:px-[72px] md:pb-[80px] md:pt-[72px] xl:pt-[80px]" aria-hidden={sent || undefined}>
        <h2 className="m-0 font-mono text-[18px] font-normal uppercase leading-[25.2px] lg:leading-[21.6px] xl:text-[24px] xl:leading-[28.8px]">{cfg.formTitle}</h2>
        <form noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }} className="flex w-full max-w-[475px] flex-col gap-[24px] md:max-w-none xl:w-[475px]">
          {cfg.fields.map((f) => (
            <TextInput key={f.name} variant="float" label={f.label} name={f.name} type={f.type || 'text'} value={v[f.name]} onChange={set(f.name)}
              valid={f.type === 'email' ? isEmail(v[f.name]) : undefined} />
          ))}
          {cfg.checkboxes && (
            <div className="flex flex-col gap-[16px] md:gap-[10px]">
              <Checkbox variant="outline" checked={news} onChange={(e) => setNews(e.target.checked)} label="Subscribe to product email updates" />
              <Checkbox variant="outline" checked={eco} onChange={(e) => setEco(e.target.checked)} label="Subscribe to the open-source ecosystem digest" />
            </div>
          )}
          <div className="mt-[8px]">
            <OffsetButton size="lg" type="submit" disabled={!ok} disabledStyle>Submit</OffsetButton>
          </div>
        </form>
      </div>
      <div role="status" aria-hidden={!sent || undefined}
        className={`z-[1] col-start-1 row-start-1 flex flex-col items-start gap-[36px] self-start bg-cream px-[24px] py-[64px] transition-opacity duration-300 md:px-[80px] lg:px-[156px] xl:px-[64px] ${sent ? 'opacity-100' : 'pointer-events-none invisible opacity-0'}`}>
        <Placeholder label="Book cover" className="mx-auto h-[209.7px] w-[200px] md:mx-0 md:h-[230.7px] md:w-[220px] lg:h-[251.6px] lg:w-[240px]" />
        <p className="m-0 font-mono text-[24px] font-light uppercase leading-[33.6px] tracking-[0.48px] md:text-[30px] md:leading-[42px] md:tracking-[0.6px]">{cfg.success}</p>
      </div>
    </div>
  )
}

export function SplitPanel({ cfg }) {
  return (
    <Container className="relative">
      <div className="relative z-[1] mb-[100px] grid grid-cols-1 border-2 border-ink xl:grid-cols-[619px_619px]">
        <div className="border-b-2 border-ink bg-sun px-[24px] pb-[60px] pt-[48px] md:px-[72px] md:pb-[112px] md:pt-[72px] xl:border-b-0 xl:border-r-2 xl:pt-[80px]">
          <ArticleProse className="pb-[24px] xl:max-w-[473px]" blocks={cfg.prose} />
        </div>
        <LeadForm cfg={cfg} />
      </div>
      <Doodle kind="cloud" size={500} className="absolute right-[-250px] top-[282px] hidden md:block" />
      <Doodle kind="blob" size={127} className="absolute left-[-29px] top-[161px] hidden xl:block" />
    </Container>
  )
}

// Sneak Peek (book routes): the PersonaSplitRows row as measured here. XL: coral image panel 619 (border-right 2,
// margin-right 140, bobbing 400px cover) + 456 text column (padding 112 0). Below XL: a full-width 375-tall coral
// image block (padding 20, image 290 tall) above the text (padding 112 0 LG / 72 0 below).
export function SneakPeek({ text }) {
  return (
    <section className="flex flex-col border-t-2 border-ink xl:flex-row">
      <div className="flex h-[375px] items-center bg-coral-red xl:h-auto xl:w-[619.2px] xl:shrink-0 xl:justify-center xl:border-r-2 xl:border-ink">
        {/* mk-bob (measured on /duckdb-book-form and /sql-duckdb-book-form): 3s ease-in-out infinite ±8px on the
            cover block at every width, not disabled under reduced motion. /together-ai has no Sneak Peek. */}
        <div className="mk-bob flex h-[330px] w-full p-[20px] xl:hidden">
          <Placeholder label="Book cover preview" className="h-[290px] w-full" />
        </div>
        <div className="mk-bob hidden xl:block">
          <Placeholder label="Book cover" className="h-[400px] w-[400px]" bordered={false} />
        </div>
      </div>
      <Container className="xl:!mx-0 xl:!max-w-none xl:!px-0">
        <div className="flex flex-col gap-[32px] py-[72px] md:w-[456px] lg:py-[112px] xl:ml-[140px]">
          <h2 className="m-0 font-mono text-[18px] font-normal uppercase leading-[25.2px] md:text-[24px] md:leading-[33.6px] lg:text-[32px] lg:leading-[44.8px]">Sneak peek</h2>
          <p className="m-0 whitespace-pre-wrap font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] md:text-[20px] md:leading-[32px] md:tracking-[0.4px]">{text}</p>
        </div>
      </Container>
    </section>
  )
}

export function SplitFormPage({ cfg }) {
  return (
    <div className="overflow-x-clip">
      <SplitHero h1={cfg.h1} lede={cfg.lede} logos={cfg.logos} />
      <SplitPanel cfg={cfg} />
      {cfg.sneak && <SneakPeek text={cfg.sneak[0].map((n, i) => (n === 0 ? '' : i === 0 ? words(n, cfg.sneak[1]) : `-${words(n > 40 ? n - 4 : n - 1, cfg.sneak[1] + i, { title: true })}`)).join('\n')} />}
    </div>
  )
}
