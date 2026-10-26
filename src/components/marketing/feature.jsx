// T2 product-feature blocks (PAGES_SPEC_MARKETING.md §3 B11, B12, B13, B15, §4 SplitHero).
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, LiftCard, Placeholder } from '../ui'
import { Btn, Chip, GitHubGlyph, LeadArrow, SectionHead, TextLink, InlineLink, usePrefersReducedMotion } from './bits.jsx'
import { fit, fitTitle, text, title } from './copy.js'

// ---------- B11 ProductHeroCentered ----------
// §2e float values per item: rotate, duration, delay. Positions/sizes UNMEASURED (placed at the edges, >=1302 only).
const FLOATS = [
  ['-6deg', '7s', '-1s', 'left-[4%] top-[60px]'],
  ['5deg', '6s', '-3s', 'right-[5%] top-[40px]'],
  ['-5deg', '5.5s', '-2s', 'left-[10%] top-[300px]'],
  ['6deg', '6.5s', '-4s', 'right-[9%] top-[290px]'],
  ['-5deg', '8s', '-5s', 'left-[20%] bottom-[60px]'],
  ['5deg', '7.5s', '-2.5s', 'right-[16%] bottom-[50px]'],
]

// Flights bubbles: 17 circles, scale 0.37–1.46, drift ~13–20 px/s, pushed away from the pointer.
// Algorithm UNMEASURED: simple rAF drift with wrap-around + a short-range pointer repulsion.
function Bubbles() {
  const host = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const el = host.current
    if (!el) return undefined
    const nodes = [...el.children]
    const W = () => el.clientWidth
    const H = () => el.clientHeight
    const b = nodes.map((n, i) => {
      const a = (i * 2.399) % (Math.PI * 2)
      const sp = 13 + ((i * 7) % 8)
      return { n, x: ((i * 173) % 97) / 97 * W(), y: ((i * 89) % 83) / 83 * H(), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, ox: 0, oy: 0 }
    })
    const place = () => b.forEach((p) => { p.n.style.transform = `translate(${p.x + p.ox}px, ${p.y + p.oy}px) scale(${p.n.dataset.s})` })
    place()
    if (reduced) return undefined
    let mx = -1e4, my = -1e4, last = performance.now(), raf = 0
    const onMove = (e) => { const r = el.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top }
    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t
      b.forEach((p) => {
        p.x = (p.x + p.vx * dt + W() + 60) % (W() + 60) - 30
        p.y = (p.y + p.vy * dt + H() + 60) % (H() + 60) - 30
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy)
        const push = d < 160 ? (160 - d) / 160 * 40 : 0
        p.ox += ((d ? dx / d : 0) * push - p.ox) * 0.1
        p.oy += ((d ? dy / d : 0) * push - p.oy) * 0.1
      })
      place()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove) }
  }, [reduced])
  return (
    <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 17 }, (_, i) => (
        <span key={i} data-s={(0.37 + ((i * 0.31) % 1.09)).toFixed(2)} className="absolute left-0 top-0 h-[40px] w-[40px] rounded-full border-2 border-ink bg-sky-tint opacity-60" />
      ))}
    </div>
  )
}

// Per-page hero geometry (measured): h1 max-width scales with the font (em), the chip is 32 tall on
// dives/mcp (padding 10 12), 28 on flights, 32.8 on guides (12/16.8); mcp keeps 56px at 960–1301.
const HERO = {
  dives: { h1: 52, p: 190, h1Max: 'max-w-[17.36em]', chip: '!py-[10px]', lgH1: 'lg:text-h1-left-lg xl:text-h1-mono-xl', arrow: false },
  mcp: { h1: 37, p: 235, h1Max: 'max-w-[11.78em]', chip: '!py-[10px]', lgH1: 'lg:text-h1-mono-xl', arrow: false },
  flights: { h1: 39, p: 126, h1Max: 'max-w-[9.92em] md:max-w-[14.88em] xl:max-w-[18.6em]', chip: '', lgH1: 'lg:text-h1-left-lg xl:text-h1-mono-xl', arrow: true, long: true },
  guides: { h1: 32, p: 196, h1Max: 'max-w-[9.92em]', chip: '', tall: true, lgH1: 'lg:text-h1-left-lg xl:text-h1-mono-xl', arrow: true, long: true, pMax: 'max-w-[800px]' },
}

export function ProductHeroCentered({ chip, status, deco, page = 'dives', seed = 1 }) {
  const guides = deco === 'guides'
  const g = HERO[page] || HERO.dives
  return (
    <section className={`relative overflow-hidden border-b-2 border-sand-dark ${guides ? 'pb-[175px]' : 'pb-[72px]'}`}>
      {deco === 'flights' && <Bubbles />}
      {guides && (
        <>
          {FLOATS.map(([rot, dur, delay, pos], i) => (
            <div key={i} data-motion="continuous" className={`mk-float absolute hidden xl:block ${pos}`} style={{ '--float-rotate': rot, '--float-dur': dur, '--float-delay': delay }}>
              <Placeholder width={96} height={96} variant="shape" label="Floating illustration" />
            </div>
          ))}
          <Placeholder width={459} height={198} label="Guides illustration" className="!absolute bottom-0 left-0 hidden md:flex" />
        </>
      )}
      <Container className="relative flex flex-col items-center gap-[32px]">
        <div className="flex w-full max-w-[1042px] flex-col items-center gap-[16px] pt-[24px] text-center md:pt-[32px] lg:gap-[20px] lg:pt-[72px]">
          <Chip status={status} tall={g.tall} className={`bg-sand-chip ${g.chip}`}>{chip}</Chip>
          <h1 className={`m-0 font-mono font-normal uppercase text-ink text-h1-mono-xl-sm md:text-h1-mono-xl-md ${g.lgH1} ${g.h1Max}`}>{fitTitle(g.h1, seed)}</h1>
          <p className={`m-0 ${g.pMax || 'max-w-[815px]'} font-sans font-light text-ink text-[18px] tracking-[0.36px] lg:text-[20px] lg:tracking-[0.4px] ${g.long ? 'leading-[28.8px] lg:leading-[32px]' : 'leading-[25.2px] lg:leading-[28px]'}`}>
            {fit(g.p, seed + 1)}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-[24px]">
          <Btn variant="primary" size="lg">GET STARTED FREE</Btn>
          <Btn variant="secondary" size="lg" lead={g.arrow ? LeadArrow : null}>VIEW DOCUMENTATION</Btn>
        </div>
      </Container>
    </section>
  )
}

// ---------- §4 SplitHero (postgres) ----------
// lens = [chip chars, h1 chars, p chars]
export function SplitHero({ lens = [20, 50, 86], seed = 1 }) {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative pb-[332px] pt-[24px] md:pb-[496px] md:pt-[32px] xl:pb-[119px] xl:pt-[72px]">
        <div className="relative z-[1] flex flex-col gap-[16px] xl:max-w-[600px] xl:gap-[20px]">
          <Chip tall className="bg-sand-chip !font-light tracking-[0.24px]">{fitTitle(lens[0], seed + 5).toUpperCase()}</Chip>
          <h1 className="m-0 font-mono font-normal uppercase text-ink text-h1-mono-sm md:text-h1-mono-md xl:text-h1-mono">{fitTitle(lens[1], seed)}</h1>
          <p className="m-0 font-sans text-ink text-lede-hero xl:text-lede">{fit(lens[2], seed + 1)}</p>
          <div className="mt-[16px] flex flex-col items-start gap-[12px] md:flex-row md:gap-[24px] xl:mt-[12px] xl:gap-[32px]">
            <Btn variant="primary">GET STARTED NOW</Btn>
            {/* github.com -> non-link */}
            <Btn variant="secondary" lead={<GitHubGlyph />}>VIEW REPO ON GITHUB</Btn>
          </div>
        </div>
        <Placeholder
          label="Integration illustration"
          className="!absolute bottom-[-55px] left-[55px] h-[229.5px] w-[390px] md:bottom-[-104px] md:left-[104px] md:h-[428.4px] md:w-[728px] lg:left-[324px] lg:h-[435.4px] lg:w-[740px] xl:bottom-auto xl:left-[662px] xl:top-[22px] xl:h-[470.8px] xl:w-[800px]"
        />
      </Container>
    </section>
  )
}

// ---------- B12 ProblemCards ----------
// lens = { h2, p, cards: [[title chars, body chars] x3], h2Max }
export function ProblemCards({ lens = { h2: 43, p: 80, cards: [[41, 120], [40, 121], [15, 129]] }, seed = 1 }) {
  return (
    <section className="pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] xl:pb-[120px] xl:pt-[72px]">
      <Container>
        <SectionHead
          title={fitTitle(lens.h2, seed)}
          h2Class={`text-h2-mono-md lg:text-h2-mono-30 xl:text-h2-mono-lg ${lens.h2Max || ''}`}
          pClass="text-body-md xl:text-body-lg pt-[12px]"
          className="!gap-0"
        >
          {fit(lens.p, seed + 1)}
        </SectionHead>
        <div className="mx-auto mt-[52px] grid max-w-[1028px] grid-cols-1 gap-[24px] md:grid-cols-3 xl:gap-[32px]">
          {lens.cards.map(([tc, bc], i) => (
            <div key={i} className="border-2 border-ink bg-white px-[24px] pb-[24px] pt-[16px] xl:px-[32px] xl:pb-[32px]">
              <Placeholder label="Problem illustration" variant="shape" className="h-[120px] w-[120px] md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px]" />
              <p className="m-0 pt-[24px] font-sans text-[16px] font-semibold leading-[25.6px] text-ink">{fitTitle(tc, seed * 3 + i)}</p>
              <p className="m-0 pt-[12px] font-sans text-body-md text-ink">{fit(bc, seed * 5 + i)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ---------- B13 MediaFrame ----------
// lens = [h2 chars, p chars]. Frame 1028 / 920 / 660 / 342 wide at 1028:544.
export function MediaFrame({ headMax = 'max-w-[853px]', lens = [25, 62], seed = 1 }) {
  return (
    <section className="pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] lg:pb-[120px] lg:pt-[72px]">
      <Container className="flex flex-col items-center gap-[52px] md:gap-[64px] lg:gap-[52px]">
        <SectionHead title={fitTitle(lens[0], seed)} className={headMax} pClass="text-accordion-body lg:text-lede-hero max-w-[700px]">{fit(lens[1], seed + 1)}</SectionHead>
        <div className="w-full max-w-[660px] overflow-hidden rounded-frame lg:max-w-[1028px]">
          <Placeholder ratio="1028 / 544" rounded="rounded-frame" label="Product screenshot" />
        </div>
      </Container>
    </section>
  )
}

// ---------- B15 CookbookGrid (flights) ----------
// Section bg (measured): the grid-pattern tile on a ::before at opacity .65 (640px tile) >=960, .75 (550px) below.
// lens = { h2, cards: [[h3 chars, p chars] x6] }
export function CookbookGrid({ lens = { h2: 29, cards: [[23, 62], [24, 50], [24, 50], [23, 50], [25, 54], [27, 44]] }, seed = 1 }) {
  return (
    <section className="mk-cookbook-bg relative border-b-2 border-ink pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] lg:pb-[100px] lg:pt-[72px] xl:pb-[72px]">
      <Container className="relative flex flex-col items-center gap-[40px] lg:gap-[52px]">
        <h2 className="m-0 max-w-[270px] bg-cream px-[4px] py-[2px] text-center font-mono font-normal uppercase text-ink text-h2-mono-md md:max-w-none lg:text-h2-mono-lg">
          {fitTitle(lens.h2, seed)}
        </h2>
        <div className="grid w-full max-w-[420px] grid-cols-1 gap-[20px] md:max-w-none md:grid-cols-[repeat(2,334px)] md:justify-center lg:grid-cols-[repeat(2,450px)] xl:max-w-[1240px] xl:grid-cols-[repeat(3,392px)] xl:gap-[32px]">
          {lens.cards.map(([hc, pc], i) => (
            <LiftCard key={i} lift={10} bg="#FFFFFF" className="flex h-full flex-col gap-[20px] border-2 border-ink p-[24px] !duration-150 xl:gap-[32px] xl:p-[32px]">
              <div className="flex h-[48px] items-center xl:h-[60px]">
                <Placeholder label="Tool logo" className="h-[48px] w-[110px] max-w-[200px] xl:h-[60px] xl:w-[138px]" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-[20px] xl:min-h-[160px]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-md xl:text-card-h3-mono">{fitTitle(hc, seed * 7 + i)}</h3>
                  <p className="m-0 font-sans text-body-sm text-ink">{fit(pc, seed * 9 + i)}</p>
                </div>
                {/* /docs -> non-link */}
                <TextLink size="sm" labelClassName="xl:!text-link-label" className="self-start">GET STARTED</TextLink>
              </div>
            </LiftCard>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ---------- B15 VideoFrame (dives) ----------
export function VideoFrame() {
  return (
    <section className="border-b-2 border-sand-dark pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] lg:pb-[120px] lg:pt-[72px]">
      <Container>
        <div className="mx-auto max-w-[800px] border-2 border-ink shadow-hard-12">
          <div className="rounded-sm bg-black">
            <Placeholder ratio="16 / 9" label="Product video (no playback)" />
          </div>
        </div>
      </Container>
    </section>
  )
}

// ---------- B15 LiveEmbed (dives) ----------
export function LiveEmbed({ lens = [15, 80, 41], seed = 1 }) {
  return (
    <section className="border-b-2 border-sand-dark pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] lg:pb-[120px] lg:pt-[72px]">
      <Container className="flex flex-col items-center gap-[40px]">
        <SectionHead title={fitTitle(lens[0], seed)} className="max-w-[820px]" pClass="text-accordion-body lg:text-lede-hero">{fit(lens[1], seed + 1)}</SectionHead>
        {/* shadow -8 8 >=960, -4 4 728–959, none <728; body stays 600 tall at every width */}
        <div className="w-full max-w-[900px] border-2 border-ink md:shadow-[-4px_4px_0_0_#383838] lg:shadow-hard-8">
          <div className="flex items-center justify-between gap-[12px] bg-ink px-[16px] py-[12px] md:px-[20px] md:py-[14px]">
            <p className="m-0 font-sans text-[14px] font-semibold leading-[14px] tracking-[0.42px] text-white md:text-[16px] md:leading-[16px] md:tracking-[0.48px]">{fitTitle(lens[2], seed + 2)}</p>
            <span className="shrink-0 bg-sun px-[10px] py-[6px] font-mono text-[11px] font-medium uppercase leading-[11px] tracking-[0.5px] text-ink md:text-[12px] md:leading-[12px]">Live queries</span>
          </div>
          <Placeholder height={600} rounded="" bordered={false} label="Live embedded app (external, not loaded)" className="w-full" />
        </div>
      </Container>
    </section>
  )
}

// ---------- B15 GalleryTeaser (dives) ----------
// slugs: the three dives the original /product/dives teaser links, in its order
const TEASER_DIVES = ['kpi-dashboard-using-tableau-superstore-data', 'oil-gas-demo-anadarko-basin-explorer', 'nba-game-quality-explorer-2025-26-by-matson']
export function GalleryTeaser({ lens = [26, 115], seed = 1, slugs = TEASER_DIVES }) {
  return (
    <section className="border-b-2 border-sand-dark pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] lg:pb-[120px] lg:pt-[72px]">
      <Container className="flex flex-col items-center gap-[52px]">
        <SectionHead title={fitTitle(lens[0], seed)} className="max-w-[1028px]" pClass="text-accordion-body lg:text-lede-hero !text-gray-500">{fit(lens[1], seed + 1)}</SectionHead>
        <div className="grid w-full max-w-[1028px] grid-cols-1 gap-[24px] md:grid-cols-3 md:gap-[20px] xl:gap-[28px]">
          {slugs.map((slug, i) => (
            <Link key={slug} to={`/dive-gallery/dives/${slug}`} className="flex flex-col gap-[12px] text-ink no-underline [transition:transform_.2s_ease]">
              <div className="overflow-hidden rounded-sm border-2 border-ink bg-white">
                <Placeholder ratio="16 / 9" rounded="" bordered={false} label="Gallery thumbnail" />
              </div>
              <p className="m-0 font-sans text-[14px] leading-[14px] text-ink lg:text-[16px] lg:leading-[16px]">{fitTitle(14, seed * 3 + i)}</p>
            </Link>
          ))}
        </div>
        <Btn variant="secondary" size="lg" to="/dive-gallery">VIEW ALL IN THE FULL GALLERY</Btn>
      </Container>
    </section>
  )
}

// ---------- B15 BrowserWindowDemo (guides) ----------
// Measured @1440 / 768 / 390: window r24 / r16, chrome padding 24 / 16, title block right padding
// 346.6 / 191.5 / 114.9 (room for the overlay art), chart r12 / r8 at 2379:947, legend Fono 16.5 / 14 / 12.
// lens = [h2, p, h3, p2, link]
export function BrowserWindowDemo({ lens = [30, 104, 37, 68, 20], seed = 1 }) {
  return (
    <section className="pb-[64px] pt-[48px] md:pb-[92px] md:pt-[56px] lg:pb-[120px] lg:pt-[72px]">
      <Container className="flex flex-col items-center gap-[40px] lg:gap-[52px]">
        <SectionHead title={fitTitle(lens[0], seed)} h2Class="text-h2-mono-md lg:text-h2-mono-lg" className="w-full max-w-[925px]" pClass="text-accordion-body lg:text-lede-hero">{fit(lens[1], seed + 1)}</SectionHead>
        <div className="w-full rounded-[16px] border-2 border-ink bg-white lg:rounded-window">
          <div className="flex gap-[8px] p-[16px] lg:p-[24px]">
            {['bg-teal', 'bg-sun', 'bg-coral-red'].map((c) => <span key={c} className={`h-[10px] w-[10px] rounded-full ${c}`} />)}
          </div>
          <div className="flex flex-col gap-[8px] pb-[16px] pl-[16px] pr-[114.9px] md:pr-[191.5px] lg:gap-[10px] lg:pb-[24px] lg:pl-[24px] lg:pr-[256.5px] xl:pr-[346.6px] lg:pt-[4px]">
            <h3 className="m-0 font-mono font-normal uppercase text-ink text-card-h3-mono-md md:text-h2-mono-md lg:text-h2-mono-lg">{fitTitle(lens[2], seed + 2)}</h3>
            <p className="m-0 font-sans text-[12px] font-medium leading-[16.8px] tracking-[0.28px] text-ink md:text-[14px] md:leading-[19.6px]">
              {fit(lens[3], seed + 3)}{' '}
              <span className="font-mono"><InlineLink to="/blog/context-belongs-in-the-warehouse">{fitTitle(lens[4], seed + 4)}</InlineLink></span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-[12px] px-[16px] pb-[16px] lg:gap-[14px] lg:px-[24px] lg:pb-[24px]">
            <div className="relative w-full">
              <Placeholder
                label="Overlay"
                className="!absolute bottom-full right-[12.2px] h-[68.8px] w-[85.7px] translate-y-[11.2px] md:right-[45px] md:h-[88.3px] md:w-[109.9px] md:translate-y-[14.2px] lg:right-[82.1px] lg:h-[161.1px] lg:w-[200.5px] lg:translate-y-[25.3px]"
              />
              <div className="overflow-hidden rounded-[8px] border-2 border-ink bg-sky-tint lg:rounded-inner">
                <Placeholder ratio="2379 / 947" rounded="" bordered={false} label="Guides comparison chart" className="!bg-sky-tint" />
              </div>
            </div>
            <ul className="m-0 flex list-none flex-wrap justify-center gap-x-[19px] gap-y-[12px] p-0">
              {[['bg-sun', 'WITH GUIDES'], ['bg-coral-red', 'WITHOUT GUIDES']].map(([c, l]) => (
                <li key={l} className="flex items-center gap-[6px] font-fono text-[12px] uppercase leading-[14.4px] text-ink md:gap-[9px] md:text-[14px] md:leading-[16.8px] lg:text-[16.5px] lg:leading-[19.8px]">
                  <span className={`h-[14px] w-[14px] rounded-sm border-2 border-ink md:h-[19px] md:w-[19px] ${c}`} />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
