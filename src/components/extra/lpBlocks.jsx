// X21 gated LP body blocks for /ducklake-open-table-format-full (PAGES_SPEC_EXTRA §7), used inside the company LP shell
// (LPHero / LPSection / FAQSection / GatedFormSection, imported read-only). Like the other LP bodies, grids keep their
// column count at every width (columns shrink to their min-content; the section clips any overflow).
import { useState } from 'react'
import { Checkbox, Container, OffsetButton, Placeholder, TextInput } from '../ui'
import { isEmail } from '../company/forms.js'
import { words } from './generic.jsx'

const P = 'm-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px]'
// 3 columns at every width, each at least its min-content width (as measured on the original)
const GRID3 = 'grid grid-cols-[repeat(3,minmax(min-content,1fr))] gap-[20px]'

// [ink] five outline cards: padding 28, 1px rgba(255,255,255,.2), r8; h3 Mono 18/23.4 white; p opacity .8
export function OutlineCardGrid({ items }) {
  return (
    <div className={`mt-[32px] ${GRID3}`}>
      {items.map(([h, p], i) => (
        <div key={i} className="rounded-md border border-[rgba(255,255,255,0.2)] p-[28px]">
          <h3 className="m-0 mb-[8px] font-mono text-lp-card-h3 font-normal uppercase text-white">{words(h, 10100 + i, { title: true })}</h3>
          <p className={`${P} text-white opacity-80`}>{words(p, 10110 + i)}</p>
        </div>
      ))}
    </div>
  )
}

// [white] six colour cards cycling sky-hover / sun / teal-bright: padding 32, r8; label 13/18.2 600 UPPER .7;
// h3 Mono 32/41.6 UPPER; p 16/22.4 300
const CARD_BG = ['bg-sky-hover', 'bg-sun', 'bg-teal-bright']
export function ColorCardGrid({ items }) {
  return (
    <div className={`mt-[32px] ${GRID3}`}>
      {items.map(([label, h, p], i) => (
        <div key={i} className={`rounded-md p-[32px] ${CARD_BG[i % 3]}`}>
          <p className="m-0 mb-[8px] font-sans text-[13px] font-semibold uppercase leading-[18.2px] tracking-[0.26px] opacity-70">{label}</p>
          <h3 className="m-0 mb-[12px] font-mono text-[24px] font-normal uppercase leading-[31.2px] lg:text-lp-card-h3-lg">{words(h, 10200 + i, { title: true })}</h3>
          {p > 0 && <p className={P}>{words(p, 10210 + i)}</p>}
        </div>
      ))}
    </div>
  )
}

// [ink] comparison table: Mono 15/25.5 white, th 600, cells padding 12 16, no borders; the first data column is sun
export function DarkTable({ head, rows, note }) {
  return (
    <>
      <div className="mt-[24px] overflow-auto">
        <table className="w-full border-collapse font-mono text-[15px] leading-[25.5px] text-white">
          <thead>
            <tr>{head.map((h, i) => <th key={i} className={`px-[16px] py-[12px] text-left font-semibold ${i === 1 ? 'text-sun' : ''}`}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>{r.map((n, ci) => <td key={ci} className={`px-[16px] py-[12px] align-top font-normal ${ci === 1 ? 'text-sun' : ''}`}>{words(n, 10300 + ri * 7 + ci, { title: ci === 0 })}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="m-0 mb-[14px] mt-[24px] font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] text-white opacity-70">{note}</p>
    </>
  )
}

// [sun] "is this for you" checklist: centred h2 (max 720, mb 32) + 2 columns (430 / 324 / 151) gap 16/40, max 900
export function FitChecklist({ title, items }) {
  return (
    <>
      <div className="mx-auto mb-[32px] max-w-[720px] text-center">
        <h2 className="m-0 font-mono text-lp-h2-sm font-normal uppercase md:text-lp-h2-md lg:text-lp-h2">{title}</h2>
      </div>
      <div className="mx-auto grid max-w-[900px] grid-cols-[151px_151px] justify-center gap-x-[40px] gap-y-[16px] md:grid-cols-[324px_324px] lg:grid-cols-[430px_430px]">
        {items.map((n, i) => (
          <p key={i} className={`${P} border-b border-[rgba(0,0,0,0.1)] py-[12px]`}>✓ {words(n - 2, 10400 + i)}</p>
        ))}
      </div>
    </>
  )
}

// G18 GatedFormSection variant with the two opt-in checkboxes this LP shows (the company component has one).
// Same classes / behaviour as company/lp.jsx GatedFormSection (local validation, cream success overlay, no network).
export function GatedFormSection2({ title, intro }) {
  const [v, setV] = useState({ first: '', last: '', email: '', company: '' })
  const [sub, setSub] = useState(true)
  const [eco, setEco] = useState(true)
  const [sent, setSent] = useState(false)
  const ok = v.first.trim() && v.last.trim() && isEmail(v.email) && v.company.trim()
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  return (
    <section className="overflow-hidden border-y border-ink bg-cream py-[64px] md:py-[80px] lg:py-[96px]">
      <Container>
        <div className="mx-auto max-w-[840px]">
          <h2 className="m-0 mb-[12px] text-center font-mono text-[28px] font-normal uppercase leading-[39.2px] md:text-[36px] md:leading-[50.4px] lg:text-lp-form-h2">{title}</h2>
          <p className="m-0 mb-[16px] text-center font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] opacity-85">{intro}</p>
          <div className="relative flex flex-col gap-[24px] px-[24px] pb-[80px] md:px-[72px]">
            <form noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }}
              className="grid grid-cols-2 gap-[16px] xl:grid-cols-[340px_340px]" aria-hidden={sent || undefined}>
              <TextInput variant="hide" label="First Name" name="firstname" value={v.first} onChange={set('first')} />
              <TextInput variant="hide" label="Last Name" name="lastname" value={v.last} onChange={set('last')} />
              <TextInput variant="hide" label="E-mail" name="email" value={v.email} onChange={set('email')} valid={isEmail(v.email)} className="col-span-2" />
              <TextInput variant="hide" label="Company Name" name="company" value={v.company} onChange={set('company')} className="col-span-2" />
              <div className="col-span-2 flex flex-col gap-[10px]">
                <Checkbox checked={sub} onChange={(e) => setSub(e.target.checked)} label="Subscribe to email updates" />
                <Checkbox checked={eco} onChange={(e) => setEco(e.target.checked)} label="Subscribe to the ecosystem newsletter" />
              </div>
              <div className="col-span-2 mt-[8px]">
                <OffsetButton size="lg" type="submit" disabled={!ok} disabledStyle>Submit</OffsetButton>
              </div>
            </form>
            <div role="status"
              className={`absolute inset-0 flex flex-col items-center gap-[36px] bg-cream px-[24px] pb-[64px] transition-opacity duration-300 md:px-[64px] ${sent ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
              {sent && (
                <>
                  <Placeholder width={240} ratio="900 / 472" label="Download thumbnail" />
                  <p className="m-0 text-center font-mono text-[30px] font-light uppercase leading-[42px] tracking-[0.6px]">Thanks! Your guide is ready (preview: no redirect)</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
