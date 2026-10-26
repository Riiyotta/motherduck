import { Link } from 'react-router-dom'
import { Container, Placeholder, UnderlineLink } from '../ui'
import { TickerBand, TiltedTag, Doodle } from './bits.jsx'
import { filler } from './copy.js'
import { routeProps } from './links.js'

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })

// A1 PageHeroIllustrated, variant 'about'. Padding lives on the container (as on the original) so the
// absolute illustration / ticker offsets below are the measured container-relative values.
export function AboutHero() {
  return (
    <section className="relative isolate overflow-x-clip">
      <Container className="relative pb-[220px] pt-[20px] md:pb-[280px] md:pt-[80px] lg:pb-[240px] lg:pt-[100px] xl:-mb-[20px] xl:pb-[260px] xl:pt-[80px]">
        <div className="flex flex-col gap-[24px]">
          <h1 className="m-0 max-w-[330px] font-mono text-about-h1-sm font-normal uppercase md:max-w-[600px] md:text-about-h1-md lg:max-w-[860px] lg:text-about-h1">
            Building calm tools together
          </h1>
          <p className="m-0 font-mono text-page-sub-sm uppercase md:text-page-sub-md lg:text-page-sub">Meet the group</p>
          <button
            type="button"
            aria-label="Scroll to next section"
            onClick={() => scrollToId('about-origin')}
            className="flex h-[40px] w-[40px] items-center justify-center border-0 bg-transparent p-0 text-ink"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M20 8v22M11 21l9 9 9-9" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        {/* P6 ticker: 54px band (40 at SM) rotated -4.6deg about its centre, behind the illustration */}
        <TickerBand
          label="About us"
          count={26}
          className="absolute -left-[9.75px] -right-[9.75px] top-[307.2px] -z-[1] h-[40px] items-center border-y-2 border-ink bg-sun md:-left-[39.2px] md:-right-[39.2px] md:top-[412px] md:h-[54px] lg:-left-[192px] lg:-right-[192px] lg:top-[480.8px] xl:-left-[105px] xl:-right-[105px] xl:top-[444px]"
          style={{ transform: 'rotate(-4.6deg)' }}
          spanClassName="mx-[30px] text-ticker-sm md:mx-[42px] md:text-ticker xl:mx-[47px]"
        />
        {/* Illustration box (contain): 368x180 / 522x255 / 522x255 / 608x299 */}
        <div className="absolute left-[41px] top-[227.2px] h-[180px] w-[368px] md:left-[286px] md:top-[301px] md:h-[255px] md:w-[522px] lg:left-[458px] lg:top-[359.8px] xl:left-[654px] xl:top-[295.8px] xl:h-[299px] xl:w-[608px]">
          <Placeholder label="About hero illustration" className="h-full w-full" />
        </div>
      </Container>
    </section>
  )
}

// [chars, seed] tuned so line counts match the original at 1440 / 1280 / 768 / 390
const ORIGIN = [[473, 1], [494, 4], [568, 64], [352, 3], [350, 14]]

// A2 ProseWithImage
export function OriginStory() {
  return (
    <section id="about-origin">
      <Container className="flex flex-col items-center pb-[22px] pt-[40px] md:pb-0 md:pt-[60px] lg:pb-[34px] xl:flex-row xl:gap-[105px] xl:pb-[70px]">
        <div className="flex w-full flex-col gap-[10px] xl:w-[709.6px] xl:shrink-0 xl:gap-[24px]">
          <h2 className="m-0 mb-[6px] font-mono text-page-h2-sm font-normal uppercase lg:text-page-h2">How we started</h2>
          {ORIGIN.map(([ch, seed], i) => (
            <p key={i} className="m-0 font-sans text-legal-body">{filler(ch, seed)}</p>
          ))}
        </div>
        <Placeholder ratio="436 / 450.2" label="Values illustration" style={{ width: undefined }} className="mt-[32px] w-full max-w-[436px] md:mt-[52px] xl:mt-0 xl:w-[427.4px]" />
      </Container>
    </section>
  )
}

// A3 FullWidthPhoto (2px border outside a 1.6:1 image, so the ratio applies to the content box)
export function TeamPhoto() {
  return (
    <section>
      <Container className="flex flex-col gap-[40px] pb-[59px] pt-[50px] md:py-[82px] lg:pb-[132px] lg:pt-[27px]">
        <h2 className="m-0 font-mono text-page-h2-sm font-normal uppercase lg:text-page-h2">Our team</h2>
        <Placeholder ratio="1.6" label="Team photo" bordered={false} className="border-2 border-ink" style={{ width: 'calc(100% - 4px)', boxSizing: 'content-box' }} />
      </Container>
    </section>
  )
}

// Measured logo boxes per range: [w, h] at SM / MD / LG / XL
const LOGOS = [
  [[103.5, 24], [168.1, 39], [133.6, 31], [181, 42]],
  [[87.5, 24], [142.1, 39], [113, 31], [153, 42]],
  [[70.4, 24], [114.4, 39], [90.9, 31], [123, 42]],
  [[100, 15.5], [162, 25.1], [110, 17], [186, 28.8]],
  [[72.5, 24], [117.9, 39], [93.7, 31], [127, 42]],
  [[57, 24], [86, 39], [60, 31], [86, 42]],
]

// A4 LogoRow
export function Investors() {
  return (
    <section className="relative border-t-2 border-ink">
      <Doodle kind="star" size={92} className="absolute left-[282px] top-[-34px] h-[68px] w-[69px] md:left-[587px] md:top-[-38.5px] md:h-[78px] md:w-[80px] lg:left-[959px] lg:top-[-38.8px] xl:left-[1001px] xl:top-[-45.3px] xl:h-[90px] xl:w-[92px]" />
      <Container className="flex flex-col gap-[40px] pb-[88px] pt-[48px] md:gap-[48px] md:pb-[112px] md:pt-[64px] lg:pb-[136px] lg:pt-[68px] xl:pb-[164px] xl:pt-[72px]">
        <h2 className="m-0 font-mono text-page-h2-sm font-normal uppercase lg:text-page-h2">Backed by</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-[28px] gap-y-[16px] md:justify-start md:gap-x-[100px] md:gap-y-[32px] md:px-[4px] lg:flex-nowrap lg:justify-center lg:gap-[46px] lg:px-0 xl:gap-[76px]">
          {LOGOS.map(([sm, md, lg, xl], i) => (
            <div key={i} style={{ '--ws': `${sm[0]}px`, '--hs': `${sm[1]}px`, '--wm': `${md[0]}px`, '--hm': `${md[1]}px`, '--wl': `${lg[0]}px`, '--hl': `${lg[1]}px`, '--wx': `${xl[0]}px`, '--hx': `${xl[1]}px` }}>
              <Placeholder label={`Investor logo ${i + 1}`} className="h-[var(--hs)] w-[var(--ws)] md:h-[var(--hm)] md:w-[var(--wm)] lg:h-[var(--hl)] lg:w-[var(--wl)] xl:h-[var(--hx)] xl:w-[var(--wx)]" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// A5 ContactBand. Inner height 400 (XL/LG) / 450 (MD); SM flows: text from 92px, character below.
export function ContactBand() {
  return (
    <section className="relative border-y-2 border-ink bg-sun">
      <Container className="absolute inset-x-0 -top-[2px]">
        <TiltedTag
          bg="#FF7169"
          className="about-tag absolute left-[24px] top-0 text-page-h2-xs md:left-[32px] md:text-page-h2-sm lg:left-[64px] lg:text-page-h2 xl:left-[86px]"
        >
          Get in touch
        </TiltedTag>
      </Container>
      <div className="relative overflow-hidden">
        <Doodle kind="cloud" size={232} className="absolute left-[-71.4px] top-[294px] h-[137px] w-[151px] md:left-[74.8px] md:top-[380.7px] md:h-[148px] md:w-[162px] lg:left-[214.8px] lg:top-[330.7px] xl:left-[57px] xl:top-[299px] xl:h-[211px] xl:w-[232px]" />
        <Container className="relative flex flex-col items-center gap-[32px] pb-[45px] pt-[92px] text-center md:min-h-[450px] md:items-start md:justify-center md:py-0 md:pl-[94px] md:text-left lg:min-h-[400px] lg:pl-[160px] xl:pl-[254px]">
          <p className="m-0 w-fit font-sans text-[16px] font-normal uppercase leading-[25.6px] tracking-[0.32px]">
            Email us at{' '}
            <span className="underline decoration-ink underline-offset-[7px] hover:decoration-sky-hover max-lg:block">info@example-mail.com</span>
          </p>
          <p className="m-0 w-fit max-w-[235px] font-sans text-[16px] font-normal uppercase leading-[25.6px] tracking-[0.32px] md:max-w-none">
            Work with us!{' '}
            <UnderlineInline path="/careers#open-positions" className="max-lg:block">See all of our open roles</UnderlineInline>
          </p>
          <div className="ml-[126.3px] self-start md:absolute md:left-[434px] md:top-[120px] md:ml-0 lg:left-[640px] lg:top-[56px] xl:left-[792px] xl:top-[32px]">
            <Placeholder variant="shape" label="Animated character (static)" className="h-[271px] w-[298px] md:h-[252.9px] md:w-[278px] lg:h-[291.1px] lg:w-[320px] xl:h-[336.5px] xl:w-[370px]" />
          </div>
        </Container>
      </div>
    </section>
  )
}

function UnderlineInline({ path, className = '', children }) {
  const { to } = routeProps(path)
  const cls = `text-ink underline decoration-ink underline-offset-[7px] hover:decoration-sky-hover ${className}`
  // In-page anchor on another route: the Careers page scrolls to the hash on mount.
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <span className={cls}>{children}</span>
}

// A6 CommunityCTA. Banner 984x194 is absolute at every width (scaled 0.9 at LG+, 0.8 at MD; 162 tall at SM).
export function CommunityCTA() {
  return (
    <section className="overflow-x-clip">
      <Container className="relative pb-[270px] pt-[72px] md:py-[141px] xl:py-[153px]">
        <div className="relative z-[1] flex flex-col gap-[16px] md:w-fit xl:ml-[110px]">
          <h2 className="m-0 font-mono text-page-h2-sm font-normal uppercase lg:text-page-h2">Join the community</h2>
          <UnderlineLink icon="external">CHAT WITH US ON SLACK</UnderlineLink>
        </div>
        <div className="fade-right absolute left-[24px] top-[182.8px] h-[162px] w-[984px] md:left-[204px] md:top-[91.1px] md:h-[194px] md:scale-[0.8] lg:left-[376px] lg:top-[96.7px] lg:scale-90 xl:left-[588px] xl:top-[108.7px]">
          <Placeholder label="Community banner" className="h-full w-full" />
        </div>
      </Container>
    </section>
  )
}
