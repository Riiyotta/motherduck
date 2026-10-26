import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox, Container, OffsetButton, Placeholder, TextInput, UnderlineLink } from '../ui'
import { Doodle } from './bits.jsx'
import { filler, heading } from './copy.js'
import { isEmail } from './forms.js'

const H2 = 'm-0 font-mono text-page-h2-xs font-normal uppercase md:text-page-h2'

// A1 PageHeroIllustrated, variant 'book'. Illustration and badge offsets measured on the original
// (section-relative, expressed from the centre line so they hold within each range).
export function BookHero() {
  return (
    <section className="relative overflow-x-clip pb-[126px] pt-[40px] md:pb-[132px] md:pt-[64px] lg:pb-[140px] lg:pt-[92px] xl:py-[112px]">
      <Container className="relative">
        <h1 className="m-0 font-mono text-compact-h1-24 font-normal uppercase md:max-w-[460px] md:text-compact-h1-48t xl:max-w-[810px] xl:text-compact-h1">
          {heading(28, 4900)}
        </h1>
      </Container>
      <div className="absolute left-[calc(50%+4px)] top-[127.3px] h-[105.8px] w-[157px] md:left-[calc(50%+80px)] md:top-[134.7px] md:h-[164.5px] md:w-[244px] lg:left-[calc(50%+40px)] lg:top-[130.7px] lg:h-[222.5px] lg:w-[330px] xl:left-[calc(50%+200px)] xl:top-[102.2px] xl:h-[256.2px] xl:w-[380px]">
        <Placeholder variant="shape" label="Book illustration" className="h-full w-full" />
      </div>
      <div className="absolute left-[calc(50%+127px)] top-[100.8px] flex h-[52.4px] w-[52px] items-center justify-center rounded-full border-2 border-ink bg-sun text-center font-mono text-[9px] uppercase leading-[10px] md:left-[calc(50%+274px)] md:top-[102.6px] md:h-[82.6px] md:w-[82px] md:text-[12px] md:leading-[14px] lg:left-[calc(50%+310px)] lg:top-[90.3px] lg:h-[110.8px] lg:w-[110px] lg:text-[14px] lg:leading-[16.8px] xl:left-[calc(50%+515px)] xl:top-[43.4px] xl:h-[131px] xl:w-[130px] xl:text-[16px] xl:leading-[19.2px]">
        Free book
      </div>
    </section>
  )
}

// H1 BookOffer. The teal cover panel comes first in the DOM (on top at SM); from MD the form takes column 1.
function BookOffer() {
  const [email, setEmail] = useState('')
  const [news, setNews] = useState(true)
  const [eco, setEco] = useState(true)
  const [sent, setSent] = useState(false)
  const ok = isEmail(email)
  return (
    <div className="grid grid-cols-1 gap-[2px] border-2 border-ink bg-ink md:grid-cols-[472px_210px] lg:grid-cols-[650px_264px] xl:grid-cols-[920px_316px]">
      <div className="relative h-[185px] overflow-hidden bg-teal md:order-2 md:h-auto">
        <Placeholder label="Book cover" bordered={false} className="!absolute left-1/2 top-[4px] h-[185px] w-[134px] -translate-x-1/2 border-2 border-ink md:top-0 md:h-[230px] md:w-[160px] lg:h-[256.8px] lg:w-[180px] xl:h-[262.4px] xl:w-[186px]" />
      </div>
      <div className="relative overflow-hidden bg-sun p-[24px] md:order-1 md:px-[28px] lg:px-[40px] lg:py-[32px] xl:pl-[80px] xl:pr-0">
        <Doodle kind="star" size={40} className="absolute right-[24px] top-[16px]" />
        <p className="m-0 pb-[24px] font-mono text-[16px] font-light uppercase leading-[22.4px] tracking-[0.32px] md:text-[18px] md:leading-[25.2px] md:tracking-[0.36px] lg:pb-[32px] lg:text-[20px] lg:leading-[28px] lg:tracking-[0.4px] xl:text-[24px] xl:leading-[33.6px] xl:tracking-[0.48px]">
          Get your free book!
        </p>
        {sent ? (
          <p role="status" className="m-0 font-mono text-[18px] uppercase leading-[25.2px]">Thanks! Your copy is on its way.</p>
        ) : (
          <form noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }}>
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-[1fr_auto] md:gap-x-[16px] md:gap-y-[20px] xl:grid-cols-[632px_192px]">
              <TextInput label="Work Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} valid={ok} />
              <div className="flex flex-col gap-[14px] max-md:order-1 md:col-span-2 md:row-start-2 md:gap-[10px]">
                <Checkbox variant="solid" size="sm" checked={news} onChange={(e) => setNews(e.target.checked)} label="Subscribe to product news" />
                <Checkbox variant="solid" size="sm" checked={eco} onChange={(e) => setEco(e.target.checked)} label="Subscribe to the ecosystem newsletter" />
              </div>
              <div className="max-md:order-2 md:col-start-2 md:row-start-1">
                <OffsetButton size="xl" type="submit" disabled={!ok} disabledStyle>Submit</OffsetButton>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// H2 ChapterBanner (SM: stacked, logo pinned top-left)
function ChapterBanner() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-[4px] border-2 border-ink bg-orange px-[12px] py-[10px] md:min-h-[57px] md:flex-row md:gap-[14px] md:py-[6px]">
      <Placeholder width={46} height={41} variant="shape" label="Logo mark" className="max-md:!absolute max-md:left-[6px] max-md:top-[4px] max-md:!h-[36.6px] max-md:!w-[41px]" />
      <span className="font-mono text-[16px] font-light uppercase leading-[22.4px] tracking-[0.32px] max-md:px-[34px]">Don&apos;t miss</span>
      <UnderlineLink to="/duckdb-book-summary-chapter7" hoverTone="ink" iconSize={18} labelClassName="!font-mono uppercase">Chapter 7 preview</UnderlineLink>
    </div>
  )
}

// [title chars, bullet chars...] per chapter, following the original's lengths
const CHAPTERS = [[25, [76, 21, 49]], [27, [49, 36, 21]], [21, [74, 65, 62, 43]], [41, [56, 88, 48, 37, 33]], [34, [31, 40, 64, 39, 36]], [37, [98, 29, 46, 35, 48]], [35, [26, 55, 38, 52, 41]], [35, [43, 48, 152, 36]], [32, [54, 63, 41, 72, 60]], [45, [58, 91, 48, 51, 59]], [10, []]]

// H3 ChapterCards: rows are 450 / 562 / 505 tall (XL / LG / MD), content-sized at SM.
function ChapterCards() {
  return (
    <div className="grid grid-cols-1 gap-[24px] md:grid-cols-[332px_332px] lg:grid-cols-[444px_444px] lg:gap-[32px] xl:grid-cols-[605px_605px] xl:gap-x-[32px] xl:gap-y-[40px]">
      {CHAPTERS.map(([tch, items], i) => (
        <article key={i} className="flex flex-col gap-[20px] border-2 border-ink bg-white p-[24px] md:h-[505px] lg:h-[562px] lg:p-[32px] xl:h-[450px] xl:pb-[40px]">
          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px] lg:gap-[20px]">
            <span className="font-mono text-[16px] uppercase leading-[22.4px] md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px] xl:text-[24px] xl:leading-[33.6px]">Chapter {i + 1}</span>
            {i === 6 && (
              <span className="flex items-center gap-[6px] bg-peach px-[8px] py-[4px] font-mono text-[12px] uppercase leading-[16.8px] text-orange">
                <span className="h-[8px] w-[8px] rounded-full bg-orange" aria-hidden="true" /> Chapter preview
              </span>
            )}
          </div>
          <div>
            <h3 className="m-0 font-mono text-[18px] font-normal uppercase leading-[25.2px] md:text-[24px] md:leading-[33.6px] xl:text-[32px] xl:leading-[44.8px]">
              <Link to={`/duckdb-book-summary-chapter${i + 1}`} className="text-ink no-underline">{heading(tch, 520 + i)}</Link>
            </h3>
            {items.length > 0 && <ul className="m-0 list-disc pl-[18px] pt-[16px]">
              {items.map((ch, k) => (
                <li key={k} className="font-sans text-[14px] font-normal leading-[22.4px] tracking-[0.32px] lg:text-[16px] lg:leading-[25.6px]">
                  {filler(ch, 540 + i * 7 + k)}
                  {k === 1 && i % 3 === 0 && i !== 6 && <> Uses <span className="font-mono">read_csv</span>.</>}
                </li>
              ))}
            </ul>}
          </div>
          {/* Live chapter 7: READ THE CHAPTER stacked above SUMMARY (same x, 37px apart). */}
          <div className="mt-auto flex flex-col gap-[12px]">
            {i === 6 && <UnderlineLink>READ THE CHAPTER</UnderlineLink>}
            <UnderlineLink to={`/duckdb-book-summary-chapter${i + 1}`}>SUMMARY</UnderlineLink>
          </div>
        </article>
      ))}
    </div>
  )
}

const P = 'm-0 font-sans text-[16px] font-light leading-[25.6px] lg:text-[18px] lg:leading-[28.8px] xl:text-[20px] xl:leading-[32px]'
export function BookBody() {
  return (
    <section className="pb-[100px] pt-[40px] lg:pb-[140px] xl:pb-[200px] xl:pt-[52px]">
      <Container className="flex flex-col gap-[32px] lg:gap-[40px]">
        <h2 className={`${H2} -mb-[16px] xl:-mb-[20px]`}>{heading(...BB.h1)}</h2>
        <p className={P}>{filler(...BB.p1)}</p>
        <div className="md:mb-[24px] xl:mb-[40px]"><BookOffer /></div>
        <h2 className={`${H2} -mb-[16px] xl:-mb-[20px]`}>{heading(...BB.h2)}</h2>
        <p className={P}>
          {filler(...BB.p2)} <span className="font-normal">Background reading:</span>{' '}
          <Link to="/blog/big-data-is-dead" className="text-ink underline">this post</Link>.
        </p>
        <ChapterBanner />
        <ChapterCards />
      </Container>
    </section>
  )
}
// [chars, seed] tuned to the original wraps
const BB = { h1: [27, 4090], p1: [475, 1921], h2: [28, 4068], p2: [231, 3905] }
