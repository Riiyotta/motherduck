// X13 /product/eu-region (PAGES_SPEC_EXTRA §6): hero + overlapping contact form, partner logo row, on-demand webinar
// cards (LiftCard 14), latest posts (PostCard). All copy is placeholder text sized to the measured character counts.
import { useState } from 'react'
import { Checkbox, Container, LiftCard, OffsetButton, Placeholder, TextInput, UnderlineLink } from '../ui'
import { PostCard } from '../content/feedCards.jsx'
import { isEmail } from '../company/forms.js'
import { words } from './generic.jsx'
import '../../styles/extra-marketing.css'

const scrollTo = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' }) }

// ---------- 1. hero + contact form ----------
function EuForm() {
  const [v, setV] = useState({ firstname: '', lastname: '', email: '', company: '' })
  const [news, setNews] = useState(false)
  const [sent, setSent] = useState(false)
  const ok = v.firstname.trim() && v.lastname.trim() && isEmail(v.email) && v.company.trim()
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }}
      className="xm-compact relative w-full border-2 border-ink bg-white p-[24px] md:p-[32px] xl:px-[52px]">
      <p className="m-0 text-center font-sans text-[18px] font-light leading-[28.8px] lg:text-[20px] lg:leading-[32px]">{words(65, 7101)}</p>
      {sent ? (
        <div role="status" className="flex min-h-[443px] flex-col items-center justify-center gap-[12px] text-center">
          <p className="m-0 font-mono text-[24px] uppercase leading-[33.6px]">Thanks!</p>
          <p className="m-0 font-sans text-[16px] font-light leading-[25.6px]">We will be in touch soon. This preview does not send anything.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-[40px] pb-[24px] pt-[32px]">
            <TextInput variant="float" label="First Name" name="firstname" value={v.firstname} onChange={set('firstname')} />
            <TextInput variant="float" label="Last Name" name="lastname" value={v.lastname} onChange={set('lastname')} />
            <TextInput variant="float" label="Work Email" name="email" type="email" value={v.email} onChange={set('email')} valid={isEmail(v.email)} />
            <TextInput variant="float" label="Company" name="company" value={v.company} onChange={set('company')} />
          </div>
          <Checkbox variant="outline" size="sm" checked={news} onChange={(e) => setNews(e.target.checked)} label="Get product email updates" className="w-fit" />
          <div className="mt-[18px] flex justify-center">
            <OffsetButton type="submit" disabled={!ok} disabledStyle>Contact Us</OffsetButton>
          </div>
        </>
      )}
    </form>
  )
}

export function EuHero() {
  return (
    <section className="relative overflow-x-clip border-b-2 border-ink md:bg-sand-chip">
      <Container className="grid grid-cols-1 md:grid-cols-[330px_318px] md:gap-[40px] lg:grid-cols-[444px_436px] xl:grid-cols-[662px_500px] xl:gap-[80px]">
        <div className="relative -mx-[24px] border-b-2 border-ink bg-sand-chip px-[24px] pb-[250px] pt-[24px] md:mx-0 md:border-b-0 md:bg-transparent md:px-0 md:pb-[207px] md:pt-[72px] xl:pb-[286px] xl:pt-[80px]">
          <div className="relative z-[1]">
            <h1 className="m-0 pb-[16px] font-mono text-[32px] font-normal uppercase leading-[38.4px] md:text-[48px] md:leading-[57.6px] lg:pb-[20px] xl:pb-[24px] xl:text-[56px] xl:leading-[67.2px]">Our cloud has landed in Europe</h1>
            <p className="m-0 font-sans text-[18px] font-light leading-[28.8px] lg:text-[20px] lg:leading-[32px]">{words(132, 7102)}</p>
            <div className="mt-[32px] w-fit rounded-[5px] bg-sand-chip">
              <UnderlineLink href="#webinar-section" onClick={scrollTo('webinar-section')} icon="down">LEARN MORE</UnderlineLink>
            </div>
          </div>
          {/* decorative Lottie on the original -> static art, bottom-left behind the text */}
          <Placeholder label="Decorative map illustration" bordered={false} rounded=""
            className="!absolute bottom-0 left-[-285px] h-[305.1px] w-[800px] md:left-[-250px] md:h-[267px] md:w-[700px] lg:left-[-190px] xl:left-[-220px] xl:h-[362.4px] xl:w-[950px]" />
        </div>
        <div className="relative -mt-[30px] flex items-end md:mt-0 md:translate-y-[42px] xl:translate-y-[46px]">
          <Placeholder label="Cloud decoration" bordered={false} className="!absolute right-[-55px] top-[-50px] z-[1] hidden h-[100.5px] w-[216px] lg:flex" />
          <EuForm />
        </div>
      </Container>
    </section>
  )
}

// ---------- 2. partner logos ----------
// measured logo boxes (XL; the fifth is 55.5x22 below 728)
const LOGOS = [[101, 20], [232, 41], [148, 20], [77.3, 25], [70.6, 28], [104.6, 20], [72.3, 25]]
export function EuPartners() {
  return (
    <section className="relative pb-[52px] pt-[64px] md:pt-[93px] xl:pb-[64px] xl:pt-[88px]">
      <Container className="flex flex-col items-center gap-[32px] md:gap-[24px] xl:gap-[36px]">
        <h2 className="m-0 max-w-[300px] bg-cream p-[8px] text-center font-mono text-[18px] font-normal uppercase leading-[21.6px] md:max-w-none">Official launch partners in the region</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-[40px] gap-y-[32px] bg-cream p-[12px] md:gap-x-[52px] md:gap-y-[24px] lg:gap-x-[42px] xl:gap-y-[52px] xl:px-[8px] xl:py-[10px]">
          {LOGOS.map(([w, h], i) => (
            <div key={i} style={{ '--w': `${w}px`, '--h': `${h}px` }} className={i === 4 ? 'xm-logo5' : ''}>
              <Placeholder label={`Partner logo ${i + 1}`} bordered={false} className="h-[var(--h)] w-[var(--w)]" />
            </div>
          ))}
        </div>
      </Container>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-sand-dark" />
    </section>
  )
}

// ---------- 3. webinars ----------
const PlayIcon = () => (
  <svg width="28.3" height="28.3" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="-my-[5.75px] shrink-0">
    <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11.5 9.5v9l7-4.5z" fill="currentColor" />
  </svg>
)
// [panel bg, title chars, desc chars, title wraps at XL]
const WEBINARS = [['bg-teal', 33, 142], ['bg-sun', 59, 138], ['bg-sky-hover', 74, 172], ['bg-coral-red', 50, 166]]
export function EuWebinars() {
  return (
    <section id="webinar-section" className="pb-[92px] pt-[64px] xl:pb-[120px] xl:pt-[72px]">
      <Container className="flex flex-col items-center gap-[40px] xl:gap-[52px]">
        <h2 className="m-0 max-w-[342px] text-center font-mono text-[24px] font-normal uppercase leading-[28.8px] md:max-w-[420px] lg:text-[32px] lg:leading-[38.4px] xl:max-w-[500px]">Watch on-demand sessions with our partners</h2>
        <div className="flex w-full flex-col gap-[32px]">
          {WEBINARS.map(([bg, t, d], i) => (
            // the whole card links to YouTube on the original (external) -> non-link
            <LiftCard key={i} lift={14} hoverFrom="lg" innerAs="article" className="flex flex-col border-2 border-ink bg-white md:flex-row">
              <div className={`flex h-[190.1px] shrink-0 items-center justify-center overflow-hidden md:h-auto md:w-[200px] xl:w-[300px] ${bg}`}>
                <Placeholder label="Webinar thumbnail" bordered={false} rounded="" className="h-[190.1px] w-full md:h-[136.2px] xl:h-[204.3px]" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-[16px] p-[24px] md:gap-[20px] md:pb-[24px] md:pl-[24px] md:pr-[32px] md:pt-[24px] xl:pb-[32px] xl:pl-[32px] xl:pr-[40px] xl:pt-[32px]">
                <div className="flex flex-col gap-[4px] xl:gap-[8px]">
                  <h2 className="m-0 font-sans text-[16px] font-bold leading-[25.6px] md:text-[20px] md:leading-[24px] xl:text-[24px] xl:leading-[28.8px]">{words(t, 7200 + i, { title: true })}</h2>
                  <p className="m-0 font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] xl:text-[16px] xl:leading-[25.6px] xl:tracking-[0.32px]">{words(d, 7210 + i)}</p>
                </div>
                <div className="flex md:justify-end">
                  <OffsetButton noLift={false} className="!gap-[8px]">Watch On-Demand<PlayIcon /></OffsetButton>
                </div>
              </div>
            </LiftCard>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ---------- 4. latest posts ----------
const POSTS = [[26, 42, 300, 'sample-post-1'], [30, 32, 181, 'sample-post-2'], [27, 29, 150, 'sample-post-3']]
export function EuPosts() {
  return (
    <section className="border-t-2 border-ink bg-cream pb-[92px] pt-[64px] lg:pb-[120px] lg:pt-[72px]">
      <Container>
        <div className="flex flex-col gap-[32px] md:gap-[40px] lg:gap-[50px]">
          <h2 className="m-0 font-mono text-[24px] font-normal uppercase leading-[28.8px] lg:text-[32px] lg:leading-[38.4px]">Read our latest posts</h2>
          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-[332px_332px] lg:grid-cols-[448px_448px] xl:grid-cols-3 xl:gap-[32px]">
            {POSTS.map(([by, t, ex, slug], i) => (
              <div key={slug} className={i === 2 ? 'md:hidden xl:block' : ''}>
                <PostCard to={`/blog/${slug}`} item={{ byline: words(by, 7300 + i, { title: true }), title: words(t, 7310 + i, { sentence: false }), excerpt: words(ex, 7320 + i) }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[40px] flex justify-center lg:justify-end">
          <OffsetButton size="lg" to="/blog">View all</OffsetButton>
        </div>
      </Container>
    </section>
  )
}
