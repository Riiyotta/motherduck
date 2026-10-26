import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Container, Placeholder } from './ui'
import BlogCard from './blog/BlogCard.jsx'
import { POSTS } from './blog/posts.js'

// The original carousel's 20 slide targets, in slide order (POSTS[i] -> HREFS[i]).
const HREFS = [
  '/videos/how-hazel-built-ai-coworker-consumer-brands/', '/blog/duckdb-ecosystem-newsletter-october-2026/',
  '/case-studies/byzfunder-using-jev-for-a-second-opinion/', '/blog/motherduck-announce-jev-image/', '/blog/azure-waitlist/',
  '/blog/chief-of-staff-guide-ai-agents-metrics/', '/videos/aligned-on-numbers-chief-of-staff-data-apps/',
  '/blog/cache-invalidation-problem-data-engineering-josh-wills/', '/videos/jev-for-analytics-use-cases/',
  '/blog/jev-analytics-use-cases/', '/blog/data-outpost-2026-workshops/', '/blog/data-outpost-2026-agenda/',
  '/videos/build-a-data-agent-workshop/', '/videos/prompt-jev-sql-text-classification/', '/videos/motherduck-cli-vs-mcp/',
  '/ecosystem/sigma/', '/ecosystem/basedash/', '/ecosystem/kilo-code/', '/case-studies/hazel-ai-co-worker-ecommerce/',
  '/case-studies/goodship-ai-transportation-analyst/',
]

// Spec §9 Blog section: Swiper, loop false, speed 300 (ease), no autoplay / free-mode.
const BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 16 },
  500: { slidesPerView: 1.5, spaceBetween: 24 },
  728: { slidesPerView: 2, spaceBetween: 24 },
  960: { slidesPerView: 2.5, spaceBetween: 32 },
  1302: { slidesPerView: 3.35, spaceBetween: 32 },
}

const Chevron = ({ dir }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={dir === 'prev' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'} stroke="currentColor" strokeWidth="2" />
  </svg>
)

export default function Blog() {
  const [swiper, setSwiper] = useState(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const sync = (s) => setEdges({ start: s.isBeginning, end: s.isEnd })

  const navBtn =
    'flex h-[44px] w-[44px] items-center justify-center text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-hover disabled:cursor-default'

  return (
    <section className="relative border-b-2 border-ink bg-yellow py-[56px] lg:py-[76px] xl:py-[80px]">
      <Container>
        <div className="relative mb-[32px] flex flex-col gap-[8px] xl:mb-[40px]">
          <h2 className="font-fono text-h2-blog-md uppercase lg:text-h2-blog-lg xl:text-h2-blog">Latest from the desk</h2>
          <p className="pt-[8px] font-sans text-sub-blog-sm xl:text-sub-blog">
            Guides, field notes, release news, and thoughtful reading from our engineers and our friends.
          </p>
          {/* Mascot illustration slot: 247x246 at top -151.6 / right -22 (>=1302); 202x201 at top -119 / right -26 (960–1301); hidden <960 */}
          <div aria-hidden="true" className="absolute right-[-26px] top-[-119px] z-[2] hidden h-[201px] w-[202px] lg:block xl:right-[-22px] xl:top-[-151.6px] xl:h-[246px] xl:w-[247px]">
            <Placeholder label="Section illustration" variant="shape" className="h-full w-full" />
          </div>
        </div>

        {/* pt/-mt 14px keeps the 14px hover lift from being clipped by .swiper's overflow:hidden */}
        <Swiper
          className="!-mt-[14px] mb-[32px] !pt-[14px]"
          speed={300}
          loop={false}
          breakpoints={BREAKPOINTS}
          onSwiper={(s) => {
            setSwiper(s)
            sync(s)
          }}
          onSlideChange={sync}
          onBreakpoint={sync}
          onResize={sync}
        >
          {POSTS.map((post, i) => (
            <SwiperSlide key={post.title} className="!h-auto">
              <BlogCard post={post} href={HREFS[i]} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-between gap-[16px]">
          <div className="flex gap-[16px] xl:gap-[8px]">
            {/* Disabled styling is UNMEASURED (original kept opacity 1): only the cursor changes. */}
            <button type="button" aria-label="Previous slide" className={navBtn} disabled={edges.start} onClick={() => swiper?.slidePrev()}>
              <Chevron dir="prev" />
            </button>
            <button type="button" aria-label="Next slide" className={navBtn} disabled={edges.end} onClick={() => swiper?.slideNext()}>
              <Chevron dir="next" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
