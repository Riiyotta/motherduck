import { useState } from 'react'
import { Container, Placeholder, ArrowRight } from '../ui'
import { Btn, QuoteMark, TagTitle, TextLink, useAutoplay, usePrefersReducedMotion } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// §3 B6 QuoteCarousel. White card (max 816, 2px ink) holding a track of slides. Next/prev moves the
// track by one slide; outgoing slide runs fade-out-half 0.4s, incoming fade-in 0.4s. Autoplay interval
// measured on the original: advances every 7.5 s; the track moves with transform .4s. Paused under prefers-reduced-motion.
export const AUTOPLAY_MS = 7500

const PAD = {
  vs: 'border-t-2 border-ink',
  pricing: '',
  hypertenancy: 'bg-cream',
}
const INNER = {
  vs: 'pt-[100px] pb-[100px] md:pt-[120px] xl:pt-[170px]',
  pricing: 'pt-[70px] pb-[45px]',
  hypertenancy: 'py-[100px] lg:py-[120px]',
}

// `lens` ({ q, name, role: [chars...], logo: [px...] }) sizes each slide to the original's counts.
export function quoteSlides(n, seed, caseLinks = [], lens) {
  return Array.from({ length: n }, (_, i) => ({
    quote: lens?.q ? fit(lens.q[i], seed * 13 + i) : text(22 + i * 8, seed * 13 + i),
    name: lens?.name ? fitTitle(lens.name[i], seed * 3 + i) : `Person ${String.fromCharCode(65 + i)}`,
    role: lens?.role ? fitTitle(lens.role[i], seed * 5 + i) : title(3, seed * 5 + i),
    logoW: lens?.logo ? lens.logo[i] : [120, 98, 172][i % 3],
    link: caseLinks[i],
  }))
}

export default function QuoteCarousel({ slides, variant = 'vs', tag }) {
  const [state, setState] = useState({ i: 0, prev: null })
  const reduced = usePrefersReducedMotion()
  const n = slides.length
  const go = (to) => setState((s) => ({ i: (to + n) % n, prev: s.i }))
  useAutoplay(() => go(state.i + 1), AUTOPLAY_MS, n > 1 && !reduced, state.i)

  return (
    <div className={PAD[variant]}>
      <section className={`relative ${INNER[variant]}`}>
        {tag && (
          <TagTitle className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap px-[20px] py-[8px] text-tag-16 lg:text-h2-mono-md xl:text-h2-mono-lg">
            {tag}
          </TagTitle>
        )}
        <Container>
          {/* card: 450 max <728, full container 728–1301, 816 >=1302 */}
          <div className="relative mx-auto max-w-[450px] md:max-w-none xl:max-w-[816px]">
            <div className="overflow-hidden border-2 border-ink bg-white">
              <div className="flex" style={{ transform: `translateX(-${state.i * 100}%)`, transition: reduced ? 'none' : 'transform .4s' }}>
                {slides.map((s, k) => (
                  <figure
                    key={`${k}-${state.i}`}
                    aria-hidden={k !== state.i || undefined}
                    className={`m-0 flex w-full shrink-0 flex-col justify-center pb-[32px] pl-[24px] pr-[20px] pt-[32px] md:px-[52px] lg:py-[40px] ${
                      k === state.i && state.prev !== null ? 'mk-fade-in' : k === state.prev ? 'mk-fade-out' : ''
                    }`}
                  >
                    {/* <728 the mark sits above the quote (column, gap 20, pb 40) and the attribution stacks */}
                    <div className="flex flex-col gap-[20px] pb-[40px] md:flex-row md:gap-[8px] md:pb-[24px] lg:pb-[32px]">
                      <QuoteMark className="!h-[24px] !w-[26.2px] md:!h-[19.2px] md:!w-[21px] xl:!h-[22px] xl:!w-[24px]" />
                      <blockquote className="m-0 flex-1 font-sans text-ink text-quote-carousel md:text-center md:text-quote-carousel-md lg:text-quote-carousel">
                        {s.quote}
                      </blockquote>
                    </div>
                    <figcaption className="flex flex-col md:flex-row md:items-center md:justify-center">
                      <div className="mb-[20px] border-b-2 border-ink pb-[20px] md:mb-0 md:mr-[24px] md:border-b-0 md:border-r-2 md:pb-0 md:pr-[24px] lg:mr-[32px] lg:pr-[32px]">
                        <p className="m-0 font-sans text-person-name text-ink">{s.name}</p>
                        <p className="m-0 font-sans text-person-role text-ink">{s.role}</p>
                      </div>
                      <Placeholder label="Company logo" className="h-[48px] w-[200px] md:h-[40px] md:w-[var(--lw)]" style={{ '--lw': `${s.logoW}px` }} />
                    </figcaption>
                    {s.link && (
                      <div className="mt-[20px] flex justify-center md:mt-[26px] lg:mt-[32px]">
                        <TextLink to={s.link}>READ THE CASE STUDY</TextLink>
                      </div>
                    )}
                  </figure>
                ))}
              </div>
            </div>
            {n > 1 && (
              <>
                <div className="absolute left-0 top-1/2 z-[1] hidden -translate-x-[24px] -translate-y-[22px] md:block">
                  <Btn variant="secondary" aria-label="Previous quote" onClick={() => go(state.i - 1)} className="!px-[12px] !py-[10px]">
                    <ArrowRight className="rotate-180" />
                  </Btn>
                </div>
                <div className="absolute right-0 top-1/2 z-[1] hidden -translate-y-[22px] translate-x-[24px] md:block">
                  <Btn variant="secondary" aria-label="Next quote" onClick={() => go(state.i + 1)} className="!px-[12px] !py-[10px]">
                    <ArrowRight />
                  </Btn>
                </div>
              </>
            )}
          </div>
          {n > 1 && (
            <div className="mt-[24px] flex items-center justify-center gap-[32px]">
              {slides.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  aria-label={`Show quote ${k + 1}`}
                  aria-current={k === state.i || undefined}
                  onClick={() => go(k)}
                  className={`rounded-full border-0 bg-ink p-0 transition-all ${k === state.i ? 'h-[16px] w-[16px]' : 'h-[8px] w-[8px]'}`}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}
