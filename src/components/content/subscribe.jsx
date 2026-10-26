// F6 SubscribeTile, F7 SubscribeBanner, B2 SubscribeBand + the SM fixed Subscribe button.
// Forms are placeholders: Submit stays in the disabled state until the e-mail looks valid and consent is ticked.
import { useState } from 'react'
import { OffsetButton, TextInput, Checkbox, Placeholder } from '../ui'
import { Doodle } from './bits.jsx'
import { chars, title, shaped } from './lorem.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function useNewsletter() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  return { email, setEmail, ok, setOk, valid: EMAIL.test(email) && ok }
}

const TITLE = title(28, 8801) // [28ch/4w]
// [37ch] on the original; shortened so the Inter line width matches (275.9 @14px, 316.2 @16px, 1 line @390)
const CONSENT = shaped([9, 2, 6, 10, 5], 8802)

function Submit({ valid }) {
  return (
    <OffsetButton type="submit" size="submit" variant="primary" disabled={!valid} disabledStyle>
      Submit
    </OffsetButton>
  )
}

/* Four faint outline shapes, opacity .25 each (re-measured live at 1440 / 1280 / 768). */
function TileDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Doodle kind="wave" className="absolute bottom-[-20px] right-[-30px] h-[103.2px] w-[110px] opacity-25 lg:bottom-[-25px] lg:right-[-40px] lg:h-[112.6px] lg:w-[120px]" />
      <Doodle kind="star" className="absolute left-[80px] top-[50px] h-[17px] w-[17px] rotate-[75deg] opacity-25 lg:left-[110px] lg:top-[90px]" />
      <Doodle kind="circle" className="absolute left-[-25px] top-[20px] h-[50px] w-[50px] rotate-[25deg] opacity-25 lg:left-[-23px] lg:top-[15px] xl:left-[-27px] xl:top-[30px]" />
      <Doodle kind="burst" className="absolute right-[-25px] top-[160px] hidden h-[50px] w-[50px] opacity-25 md:block" />
    </div>
  )
}

/* F6: grid cell, hidden at SM. */
export function SubscribeTile({ className = '' }) {
  const f = useNewsletter()
  return (
    <div className={`relative hidden h-full md:block ${className}`}>
      <div className="relative h-full overflow-hidden rounded-sm border-2 border-ink bg-sun px-[24px] pb-[24px] pt-[130px] lg:px-[32px] lg:pb-[32px] lg:pt-[205px] xl:pt-[225px]">
        <TileDecor />
        <h2 className="relative m-0 font-mono font-normal uppercase text-ink text-subscribe-title-md lg:text-subscribe-title">{TITLE}</h2>
        <form className="relative flex flex-col gap-[20px] pt-[20px] lg:pt-[32px]" onSubmit={(e) => e.preventDefault()}>
          <TextInput variant="float" type="email" label="E-mail" value={f.email} onChange={(e) => f.setEmail(e.target.value)} className="w-[270px] max-w-full lg:w-[310px]" />
          <Checkbox variant="solid" size="sm" label={CONSENT} checked={f.ok} onChange={(e) => f.setOk(e.target.checked)} />
          <div className="mt-[4px]"><Submit valid={f.valid} /></div>
        </form>
      </div>
      <Placeholder label="Subscribe illustration" className="!absolute right-[15px] top-[-25px] h-[140px] w-[140px] lg:right-[18px] lg:top-[-35px] lg:h-[205px] lg:w-[205px]" />
    </div>
  )
}

/* F7: full-row banner (News grid, Events list), hidden at SM. */
export function SubscribeBanner({ className = '' }) {
  const f = useNewsletter()
  return (
    <div className={`relative my-[8px] hidden overflow-hidden rounded-sm border-2 border-ink bg-sun px-[32px] py-[28px] md:block lg:my-0 lg:px-[40px] lg:py-[32px] xl:h-[237.2px] xl:px-[240px] xl:py-[34px] ${className}`}>
      <TileDecor />
      <Placeholder label="Newsletter illustration" className="!absolute right-[-40px] top-[13px] h-[228px] w-[250px] lg:right-[-30px] lg:top-[10px] lg:h-[255px] lg:w-[280px] xl:right-[210px] xl:top-0 xl:h-[264px] xl:w-[290px]" />
      <h2 className="relative m-0 font-mono font-normal uppercase text-ink text-subscribe-title-md lg:text-subscribe-title">{TITLE}</h2>
      <form className="relative flex flex-col gap-[16px] pt-[32px]" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-start gap-[16px]">
          <TextInput variant="float" type="email" label="E-mail" value={f.email} onChange={(e) => f.setEmail(e.target.value)} className="w-[270px] lg:w-[310px]" />
          <Submit valid={f.valid} />
        </div>
        <Checkbox variant="solid" label={CONSENT} checked={f.ok} onChange={(e) => f.setOk(e.target.checked)}
          className="[&_label]:text-[15px] [&_label]:leading-[22.5px] lg:[&_label]:text-[16px] lg:[&_label]:leading-[25.6px]" />
      </form>
    </div>
  )
}

/* B2: after every blog post. */
export function SubscribeBand() {
  const f = useNewsletter()
  return (
    <section className="bg-sand-chip py-[40px] md:py-[64px] xl:py-[80px]">
      <div className="container flex flex-col gap-[24px] md:flex-row md:items-center md:justify-center xl:gap-[80px]">
        <Placeholder label="Newsletter icon" className="h-[100px] w-[100px] md:h-[130px] md:w-[130px] lg:h-[140px] lg:w-[140px]" />
        <form className="flex flex-col gap-[32px]" onSubmit={(e) => e.preventDefault()}>
          <h2 className="m-0 font-fono font-normal uppercase tracking-[0.01em] text-ink text-[16px] leading-[22.4px] lg:text-[24px] lg:leading-[33.6px]">{TITLE}</h2>
          <div className="grid grid-cols-1 gap-[16px] md:grid-cols-[1fr_auto] md:gap-x-[16px] md:gap-y-[20px]">
            <TextInput variant="float" type="email" label="E-mail" value={f.email} onChange={(e) => f.setEmail(e.target.value)}
              className="mb-[16px] xl:w-[434px]" inputClassName="!h-[56px]" />
            {/* Live: 113.7x55.2 (padding 16/24) >=728, 109.7x56.2 (16.5/22) at SM; SM order is e-mail, consent, submit */}
            <div className="order-3 md:order-none">
              <OffsetButton type="submit" size="submit" variant="primary" disabled={!f.valid} disabledStyle
                className="!h-auto !px-[22px] !py-[16.5px] md:!px-[24px] md:!py-[16px]">Submit</OffsetButton>
            </div>
            <Checkbox variant="solid" label={CONSENT} checked={f.ok} onChange={(e) => f.setOk(e.target.checked)}
              className="order-2 md:order-none md:col-span-2 max-md:[&_label]:leading-[22.4px]" />
          </div>
        </form>
      </div>
    </section>
  )
}

/* F6 SM replacement: fixed Subscribe button (target UNMEASURED -> non-link button). */
export function MobileSubscribeButton() {
  return (
    <div className="fixed bottom-[24px] right-[24px] z-[1] md:hidden">
      <OffsetButton size="lg" arrow>Subscribe</OffsetButton>
    </div>
  )
}
