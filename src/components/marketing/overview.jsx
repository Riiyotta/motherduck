// /product-only bespoke blocks (PAGES_SPEC_MARKETING.md §3 B19).
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Placeholder } from '../ui'
import { TagTitle, TextLink, useAutoplay, usePrefersReducedMotion } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// ---------- UseCaseSplit ----------
// Measured: cells padding 32 24 50 / 40 54 / 40 30 64, gap 24 / 40; art 185 / 201 / 340 tall; ink tag
// 18/25.2 (12 20) · 24/33.6 (8 24) · 32/44.8 (8 30); copy 16/25.6 below 960, 20/32 above.
export function UseCaseSplit({ seed = 1 }) {
  const cells = [
    ['FOR APP DEVS', '/product/app-developers', 'bg-coral-red', 164],
    ['FOR DATA TEAMS', '/product/data-teams', 'bg-teal', 195],
  ]
  return (
    <section className="grid grid-cols-1 border-t-2 border-ink bg-teal md:grid-cols-2">
      {cells.map(([label, to, cls, pc], i) => (
        <div key={to} className={`flex flex-col items-center gap-[24px] px-[24px] pb-[50px] pt-[32px] text-center md:gap-[40px] md:px-[54px] md:pb-[40px] md:pt-[40px] xl:px-[30px] xl:pb-[64px] ${cls}`}>
          <Placeholder label="Use case illustration" variant="shape" className="h-[185px] w-full max-w-[440px] md:h-[201px] xl:h-[340px]" />
          <TagTitle className="px-[20px] py-[12px] text-h2-mono-xs md:px-[24px] md:py-[8px] md:text-h2-mono-tall-sm xl:px-[30px] xl:text-h2-mono-tall">
            <Link to={to} className="text-white no-underline">{label}</Link>
          </TagTitle>
          <p className="m-0 max-w-[660px] font-sans text-[16px] font-normal leading-[25.6px] text-ink xl:text-[20px] xl:leading-[32px]">{fit(pc, seed + i)}</p>
          <TextLink to={to}>LEARN MORE</TextLink>
        </div>
      ))}
    </section>
  )
}

// ---------- OldWorldNewWorld ----------
// Story art: static Placeholders, sticky at top 355, scale scrubbed by scroll (marketing.css .mk-story-art). Geometry measured @390 / 768 / 1280 / 1440:
// 2-column grid >=728 (344 / 460 / 621 each), text column padding-top 275 / 285 / 360 with items 275 / 285 / 380
// apart; the tag + caption plate straddles the panel top (-22 / -25 / -26 / -34). <728 the art comes first.
function StoryPanel({ tag, caption, captionBg, wrapBg, leftBg, items, last, seed }) {
  return (
    <div className={`relative border-t-2 border-ink ${wrapBg}`}>
      <div aria-hidden="true" className={`absolute inset-y-0 left-0 hidden w-1/2 md:block ${leftBg}`} />
      {/* the original's scroll "portal": a 208 (728-959) / 237 tall box at the top of the second panel whose view
          timeline drives both panels' art (measured) */}
      {last && <div aria-hidden="true" className="mk-story-portal pointer-events-none absolute left-0 top-0 hidden h-[208px] w-px md:block lg:h-[237px]" />}
      <Container className="relative flex flex-col-reverse md:grid md:grid-cols-[344px_344px] md:justify-between lg:grid-cols-[460px_460px] xl:grid-cols-[621px_621px]">
        <div className="absolute left-[24px] top-[-22px] z-[1] flex flex-col items-start md:left-[20px] md:top-[-25px] lg:top-[-26px] xl:left-[30px] xl:top-[-34px]">
          <TagTitle as="h3" className="px-[20px] py-[12px] text-h2-mono-xs md:px-[24px] lg:text-h2-mono-tall-sm xl:px-[30px] xl:py-[8px] xl:text-h2-mono-36">{tag}</TagTitle>
          <p className={`m-0 w-fit border-2 border-ink px-[16px] py-[6px] font-sans text-[16px] font-light leading-[25.6px] text-ink xl:px-[24px] xl:py-[8px] xl:text-body-xl ${captionBg}`}>{caption}</p>
        </div>
        <div className={`relative flex flex-col gap-[62px] pt-[52px] md:gap-[275px] md:pr-[36px] md:pt-[275px] lg:gap-[285px] lg:pr-[56px] lg:pt-[285px] xl:gap-[380px] xl:pr-[72px] xl:pt-[360px] ${last ? 'pb-[170px] md:pb-[380px] lg:pb-[430px] xl:pb-[540px]' : 'pb-[100px] md:pb-[260px] lg:pb-[300px] xl:pb-[370px]'}`}>
          <div aria-hidden="true" className={`absolute inset-y-0 left-[-24px] right-[-24px] border-t-2 border-ink md:hidden ${leftBg}`} />
          {items.map(([hc, pc], k) => (
            <div key={k} className="relative ml-[24px] flex flex-col gap-[8px] md:ml-[16px] lg:ml-[46px] lg:gap-[16px] xl:ml-[32px]">
              <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-tall-sm lg:text-[20px] lg:leading-[28px] xl:text-card-h3-mono-tall">{fitTitle(hc, seed + k)}</h3>
              <p className="m-0 font-sans text-body-md text-ink lg:text-[18px] lg:leading-[28.8px] xl:text-body-xl">{fit(pc, seed * 3 + k)}</p>
            </div>
          ))}
        </div>
        {/* >=728 (measured @768 / 1280 / 1440): the art column fills its grid cell minus its margins (304 / 410 / 481
            wide) and is the full row tall; the first panel adds its top margin on top (so it overhangs the panel by
            100 / 130, as on the original), the second has none and its sticky track stops 150 / 200 short. Sticky top
            400 (728–1301) / 355 for the first panel, 450 for the second. The sticky box is the full column width with
            the art child at its width (overflowing the box, which is 198 / 238 / 294 tall); the original shifts it with
            translate 0 calc(-50% + 90 | 135 px) (first) / calc(-50% + 50px) (second). Scale is scroll-linked on the
            portal's view timeline (measured): first 0.9 -> 0 over cover -10%..40%, second 0 -> 1.1 over cover
            20%..80%, ease-in-out, fill both (so each holds .9 / 1.1 outside its range). */}
        <div className={`mx-auto mb-[40px] mt-[114px] w-full max-w-[400px] md:mx-0 md:mb-0 md:ml-[40px] md:h-full md:w-auto md:max-w-none lg:ml-[50px] xl:mx-[70px] ${last ? 'md:mt-0' : 'md:mt-[100px] xl:mt-[130px]'}`}>
          <div className={last ? 'md:h-[calc(100%-150px)] xl:h-[calc(100%-200px)]' : 'md:h-full'}>
            <div className={`md:sticky md:h-[198px] lg:h-[238px] xl:h-[294px] ${last ? 'mk-story-art mk-story-art--in md:top-[450px] md:[translate:0_calc(-50%+50px)]' : 'mk-story-art mk-story-art--out md:top-[400px] md:[translate:0_calc(-50%+90px)] xl:top-[355px] xl:[translate:0_calc(-50%+135px)]'}`}>
              <Placeholder label="Story illustration (static)" className={`aspect-[342/238.7] w-full ${last ? 'md:aspect-[481/306.5]' : 'md:aspect-[433/302]'}`} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export function OldWorldNewWorld({ seed = 1 }) {
  return (
    <section className="mk-story-scope">
      <div className="border-t-2 border-ink bg-sky-hover pb-[90px] pt-[125px] lg:pb-[105px] lg:pt-[150px] xl:pb-[110px] xl:pt-[175px]">
        <Container className="flex flex-col items-center gap-[20px] text-center xl:gap-[36px]">
          <h2 className="m-0 max-w-[275px] font-mono text-[24px] font-normal uppercase leading-[33.6px] text-ink md:max-w-[460px] md:text-persona-h2 lg:max-w-none xl:text-h2-mono-52">{fitTitle(29, seed)}</h2>
          <Placeholder label="Icon" className="h-[39px] w-[29px] md:h-[50px] md:w-[37px] xl:h-[56px] xl:w-[42px]" />
        </Container>
      </div>
      <StoryPanel tag="THE OLD WORLD" caption={fitTitle(34, seed + 1)} captionBg="bg-white" wrapBg="bg-stone" leftBg="bg-cream" items={[[28, 153], [29, 188], [33, 210]]} seed={seed * 5} />
      <StoryPanel tag="THE PLATFORM WORLD" caption={fitTitle(35, seed + 2)} captionBg="bg-sun" wrapBg="bg-garden" leftBg="bg-teal" items={[[33, 254], [39, 237], [35, 273]]} last seed={seed * 7} />
      {/* Closing band: cloud texture omitted */}
      {/* measured @1440: 630.7 tall, tag (32/44.8, 8 30) 270 below the top; the 470×418 art is decorative (absolute) */}
      <div className="relative overflow-hidden border-t-2 border-ink bg-sky-hover pb-[180px] pt-[150px] xl:pb-[300px] xl:pt-[270px]">
        <Placeholder label="Closing illustration" className="!absolute bottom-0 right-[5%] hidden aspect-[470/418] w-[470px] xl:flex" />
        <Container className="relative flex flex-col items-center">
          <TagTitle className="px-[20px] py-[8px] text-center text-h2-mono-tall-sm md:px-[30px] md:text-h2-mono-tall">{fitTitle(28, seed + 3)}</TagTitle>
        </Container>
      </div>
    </section>
  )
}

// ---------- AgentCardCarousel ----------
export const AGENT_AUTOPLAY_MS = 5500 // measured on the original: 5.5 s per step
export const AGENT_SLIDE_MS = 400 // measured: transform .4s

export function AgentCardCarousel({ seed = 1 }) {
  const [i, setI] = useState(0)
  const reduced = usePrefersReducedMotion()
  const n = 4
  useAutoplay(() => setI((v) => (v + 1) % n), AGENT_AUTOPLAY_MS, !reduced, i)
  return (
    // Neighbouring cards stay visible at opacity .4; the section clips them at the viewport edge.
    <section className="overflow-hidden pb-[64px] pt-[48px]">
      <Container>
        <div className="mx-auto max-w-[765px]">
          <div className="flex w-full gap-[32px]" style={{ transform: `translateX(calc(${-i} * (100% + 32px)))`, transition: reduced ? 'none' : `transform ${AGENT_SLIDE_MS}ms ease-in-out` }}>
            {Array.from({ length: n }, (_, k) => (
              <div key={k} aria-hidden={k !== i || undefined} className={`flex w-full shrink-0 flex-col gap-[16px] border-2 border-ink bg-white p-[32px] transition-opacity duration-200 ease-in-out md:min-h-[183px] ${k === i ? 'opacity-100' : 'opacity-40'}`}>
                <h3 className="m-0 font-mono text-[18px] font-normal uppercase leading-[27px] text-ink">{title(4, seed + k)}</h3>
                <p className="m-0 font-sans text-[16px] font-normal leading-[24px] text-ink">{text(30, seed * 3 + k)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-[32px] pt-[52px]">
          {Array.from({ length: n }, (_, k) => (
            <button key={k} type="button" aria-label={`Show card ${k + 1}`} aria-current={k === i || undefined} onClick={() => setI(k)}
              className={`rounded-full border-0 bg-ink p-0 transition-all ${k === i ? 'h-[16px] w-[16px]' : 'h-[8px] w-[8px]'}`} />
          ))}
        </div>
      </Container>
    </section>
  )
}
