// L3 / L4 case-study blocks: TitleHero (C1), TestimonialCarousel (C2), CaseStudyCard (C4),
// CaseDetailHero + QuoteBand + ProfileCard (C5), BackToTop.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LiftCard, OffsetButton, Placeholder, UnderlineLink, ArrowRight } from '../ui'
import { BackLink, Doodle, Icon } from './bits.jsx'
import { useInterval, usePrefersReducedMotion } from './hooks.js'

/* C1 */
export function TitleHero({ children }) {
  return (
    <section className="pb-[80px] pt-[24px] md:pb-[120px] md:pt-[64px] lg:pb-[140px] lg:pt-[80px] xl:pb-[160px] xl:pt-[100px]">
      <div className="container">
        <h1 className="mx-auto m-0 max-w-[300px] text-center font-mono font-normal uppercase text-ink text-page-h1-sm md:max-w-[600px] md:text-compact-h1-48t lg:max-w-none xl:text-compact-h1">{children}</h1>
      </div>
    </section>
  )
}

/* C2 */
function CarouselDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Doodle kind="wave" className="absolute left-[10px] top-[-120px] h-[53px] w-[106px] md:h-[77px] md:w-[154px] xl:h-[113px] xl:w-[176px]" />
      <Doodle kind="star" className="absolute right-[40px] top-[-50px] h-[31px] w-[30px] rotate-[16deg]" />
      <Doodle kind="zig" className="absolute right-[-40px] top-[40%] hidden h-[87px] w-[188px] lg:block" />
      <Doodle kind="circle" className="absolute left-[20px] top-[20px] h-[66px] w-[66px] -scale-x-100" />
      <Doodle kind="arc" className="absolute bottom-[10px] right-[10px] hidden h-[162px] w-[260px] -rotate-[8deg] md:block" />
    </div>
  )
}

export function TestimonialCarousel({ slides }) {
  const n = slides.length
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)
  // wrap behaviour at the last slide is UNMEASURED: rewinds to the first slide
  const go = (d) => setI((x) => (x + d + n) % n)
  useInterval(() => go(1), 8000, !reduced)
  return (
    <div className="container">
      <section className="relative rounded-sm border-2 border-ink bg-sun pb-[50px] pt-[80px] md:pb-[52px] md:pt-[64px] xl:pb-[64px] xl:pt-[72px]">
        <CarouselDecor />
        <p className="absolute left-1/2 top-0 m-0 w-max max-w-[calc(100%-84px)] -translate-x-1/2 -translate-y-[23px] border-2 border-ink bg-ink px-[16px] py-[8px] text-center font-mono uppercase text-white text-[18px] leading-[25.2px] max-md:max-w-[212px] md:-translate-y-1/2 md:text-[24px] md:leading-[33.6px] xl:px-[20px] xl:text-[30px] xl:leading-[42px]">
          Teams That Lead the Way
        </p>
        <div className="relative overflow-hidden">
          <div className="flex" style={{ transform: `translateX(calc(${-i} * (100% + 64px)))`, transition: reduced ? 'none' : 'transform 0.5s' }}>
            {slides.map((s, k) => (
              <div key={s.slug} className="relative mr-[64px] w-full shrink-0 px-[24px] md:px-[20px] lg:px-[60px] xl:px-[30px]" aria-hidden={k !== i || undefined}>
                {/* live: column [logo, (quote + person chip, gap 32 / 24 SM)], outer gap 52 (>=960) / 40 / 32;
                    logo box renders 47.6 tall @1440 and 74.6 @390 (contained image, max-height 60 / 52) */}
                <div className="flex flex-col items-center gap-[32px] md:gap-[40px] lg:gap-[52px]">
                  {/* logo link is external -> non-link */}
                  <Placeholder label={`${s.company} logo`} className="h-[74.6px] w-[180px] py-[8px] md:h-[47.6px]" />
                  <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
                    <blockquote className="m-0 max-w-[824px] pb-[8px] text-center font-sans text-ink text-case-quote-xl-md lg:text-case-quote-xl-lg xl:text-case-quote-xl">
                      {s.carouselQuote}
                    </blockquote>
                    <div className="grid grid-cols-[90px_auto] rounded-sm border-2 border-ink">
                      <Placeholder label="Headshot" rounded="" bordered={false} className="h-[90.4px] w-[90px] border-r-2 border-ink" />
                      <div className="flex flex-col justify-center gap-[4px] bg-white px-[24px] py-[16px] text-left">
                        <span className="font-sans text-ink text-person-name-lg-sm md:text-person-name-lg-md xl:text-person-name-lg">{s.person}</span>
                        <span className="font-sans text-ink text-person-role-lg-sm md:text-person-role-lg-lg xl:text-person-role-lg">{s.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/case-studies/${s.slug}`} className="absolute inset-0 opacity-0" tabIndex={k === i ? 0 : -1} aria-label={`Read case study: ${s.company}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-[20px] pt-[40px] md:pt-[48px] lg:gap-[32px] lg:pt-[50px] xl:pt-[52px]">
          {slides.map((_, k) => (
            <button key={k} type="button" aria-label={`Go to slide ${k + 1}`} onClick={() => setI(k)}
              className="relative flex h-[16px] w-[16px] items-center justify-center border-0 bg-transparent p-0">
              <span className={`block rounded-full bg-ink ${k === i ? 'h-[16px] w-[16px]' : 'h-[8px] w-[8px]'}`} />
            </button>
          ))}
        </div>
        <div className="absolute bottom-1/2 left-[24px] z-[1] hidden md:block xl:left-[80px]">
          <OffsetButton variant="secondary" size="icon-54-md" aria-label="Previous slide" onClick={() => go(-1)}><ArrowRight className="rotate-180" /></OffsetButton>
        </div>
        <div className="absolute bottom-1/2 right-[24px] z-[1] hidden md:block xl:right-[80px]">
          <OffsetButton variant="secondary" size="icon-54-md" aria-label="Next slide" onClick={() => go(1)}><ArrowRight /></OffsetButton>
        </div>
      </section>
    </div>
  )
}

/* C4 */
export function CaseStudyCard({ c }) {
  return (
    <LiftCard
      lift={14}
      as="div"
      innerAs="article"
      wrapperClassName="h-full"
      className="flex h-full min-h-[410px] flex-col gap-[20px] rounded-sm border-2 border-ink bg-white p-[24px] [transition-property:transform,border] md:min-h-[425px] lg:hover:mb-[-2px] xl:min-h-[489px] xl:gap-[24px] xl:p-[32px]"
    >
      <Link to={`/case-studies/${c.slug}`} className="absolute inset-0 z-0 opacity-0" aria-label={c.title} />
      {/* logo link is external -> non-link */}
      <div className="flex h-[44px] items-center py-[5px] xl:h-[52px] xl:py-[6px]">
        <Placeholder label={`${c.company} logo`} className="h-[34px] w-[140px] xl:h-[40px]" />
      </div>
      <h3 className="m-0 border-b-2 border-rule-faint pb-[32px] font-sans text-ink text-case-card-h3-sm md:text-case-card-h3">{c.title}</h3>
      <ul className="m-0 flex list-none flex-col gap-[16px] p-0">
        {c.bullets.map((b, k) => (
          <li key={k} className="relative pl-[16px] font-sans text-ink text-case-card-li-lg xl:text-case-card-li before:absolute before:left-0 before:content-['•']">{b}</li>
        ))}
      </ul>
      <div className="relative z-[1] ml-auto mt-auto">
        <UnderlineLink to={`/case-studies/${c.slug}`} tabIndex={-1}>READ MORE</UnderlineLink>
      </div>
    </LiftCard>
  )
}

/* C5 back-to-top (>=960) */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className={`sticky top-[calc(100%-96px)] mb-[32px] ml-auto mr-[32px] w-fit transition-opacity duration-150 ease-in-out xl:mr-[100px] ${show ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <span className="relative block [&_.lift]:!bg-transparent [&:hover_.lift-inner]:after:absolute [&:hover_.lift-inner]:after:left-[-2.5px] [&:hover_.lift-inner]:after:top-[-2.5px] [&:hover_.lift-inner]:after:h-[calc(100%-1px)] [&:hover_.lift-inner]:after:w-[calc(100%-1px)] [&:hover_.lift-inner]:after:rounded-sm [&:hover_.lift-inner]:after:border-[3px] [&:hover_.lift-inner]:after:border-ink [&:hover_.lift-inner]:after:content-['']">
          <OffsetButton variant="secondary" size="icon-64" noLift aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
            <Icon.arrowUp />
          </OffsetButton>
        </span>
      </div>
    </div>
  )
}

/* C5 quote marks: fill #6FC2FF with brightness(60%) contrast(200%) */
function Mark({ close }) {
  return (
    <svg viewBox="0 0 30 28" className={`h-[24px] w-[26px] lg:h-[28px] lg:w-[30px] ${close ? 'ml-auto mt-[10px] rotate-180' : 'mb-[10px]'}`} style={{ filter: 'brightness(60%) contrast(200%)' }} aria-hidden="true">
      <path d="M0 28V15C0 6 5 1 13 0l1 4c-5 1-7 4-7 9h6v15zm16 0V15c0-9 5-14 13-15l1 4c-5 1-7 4-7 9h6v15z" fill="#6FC2FF" />
    </svg>
  )
}

export function ProfileCard({ c }) {
  return (
    <div className="w-full shrink-0 bg-cream md:w-[312px] md:border-l-2 md:border-ink xl:absolute xl:right-[70px] xl:z-[1] xl:mt-[54px] xl:w-[359px] xl:border-2 min-[1440px]:right-[calc(50%-648px)]">
      <Placeholder label="Profile photo" rounded="" bordered={false} className="h-[298px] w-full border-b-2 border-ink md:h-[264px] xl:h-[326px]" />
      <div className="flex flex-col border-b-2 border-ink px-[24px] py-[22px] md:py-[16px]">
        <span className="font-sans text-ink text-profile-name-sm md:text-profile-name">{c.person}</span>
        <span className="font-sans text-ink text-profile-role-lg xl:text-profile-role">{c.role}</span>
      </div>
      <div className="flex h-[70px] items-center px-[24px] py-[20px] md:h-[62px] md:px-[20px] md:py-[16px] xl:px-[24px] xl:py-[14px]">
        <Placeholder label={`${c.company} logo`} className="h-[30px] w-[120px] xl:h-[34px]" />
      </div>
    </div>
  )
}

export function QuoteBand({ c }) {
  return (
    <section className="relative mb-[40px] border-2 border-ink bg-sky-hover md:mb-[48px] md:flex md:justify-center xl:mb-[64px]">
      <div className="flex flex-col justify-center border-b-2 border-ink px-[20px] py-[40px] text-center md:flex-1 md:border-b-0 md:px-[40px] md:py-[32px] md:text-left xl:mr-[430px] xl:h-[380px] xl:max-w-[971px] xl:gap-[16px] xl:pl-[100px] xl:pr-[40px] xl:text-center">
        <Mark />
        <blockquote className="m-0 font-sans text-ink text-case-band-quote-sm md:text-case-band-quote-md lg:text-case-band-quote">{c.quote}</blockquote>
        <Mark close />
      </div>
      <ProfileCard c={c} />
    </section>
  )
}

export function CaseDetailHero({ c, innerRef }) {
  return (
    <section ref={innerRef}>
      <div className="container pt-[32px] lg:pt-[46px] xl:pt-[52px]">
        <div className="pb-[32px]"><BackLink to="/case-studies">GO BACK TO CASE STUDIES</BackLink></div>
        <h1 className="m-0 pb-[40px] font-fono font-normal uppercase text-ink text-article-h1-sm md:pb-[48px] md:text-article-h1-md-case lg:pb-[40px] lg:text-article-h1">{c.h1}</h1>
      </div>
    </section>
  )
}
