// X21 /divemaxxing-full (PAGES_SPEC_EXTRA §7): contest LP (no gated form) built from measured blocks.
// Placeholder copy sized to the original's character counts; judges are anonymous placeholders.
import { Link } from 'react-router-dom'
import { Container, Placeholder } from '../ui'
import { Doodle } from '../company/bits.jsx'
import { words } from './generic.jsx'

const SEC = 'overflow-hidden py-[64px] md:py-[80px] lg:py-[96px]'
const RULED = 'border-y border-ink'
const H2 = 'm-0 font-mono text-[32px] font-bold uppercase leading-[41.6px]'
const SUB = 'm-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-gray-600'

function Hero() {
  return (
    <section className="overflow-hidden bg-cream pb-[64px] pt-[24px] md:pb-[80px] md:pt-[32px] lg:pb-[96px] lg:pt-[40px]">
      <Container>
        <div className="relative flex flex-col items-center gap-[16px] pb-[4px] pt-[40px] text-center">
          {/* decorative shapes at opacity .4-.6 */}
          <Doodle kind="cloud" size={180} className="absolute left-[50px] top-[30px] hidden opacity-50 lg:block" />
          <Doodle kind="blob" size={100} className="absolute left-[348px] top-[-8px] hidden opacity-40 lg:block" />
          <Doodle kind="diamond" size={140} className="absolute right-[37px] top-[255px] hidden opacity-60 lg:block" />
          <Doodle kind="star" size={70} className="absolute left-[186px] top-[245px] hidden opacity-40 lg:block" />
          <p className="relative m-0 mb-[8px] rounded-sm border-2 border-ink px-[12px] py-[5px] font-sans text-[11px] font-semibold uppercase leading-[15.4px] tracking-[0.88px] text-gray-600 lg:px-[16px] lg:py-[6px] lg:text-[13px] lg:leading-[18.2px] lg:tracking-[1.04px]">Competition · May 28 – June 22, 2026</p>
          <h1 className="relative m-0 flex justify-center font-mono font-normal uppercase">
            <span className="text-[36px] font-extrabold leading-[46.8px] tracking-[1.44px] md:text-[48px] md:leading-[62.4px] md:tracking-[1.92px] lg:text-[72px] lg:leading-[93.6px] lg:tracking-[2.88px]">Dive</span>
            <span className="bg-sun px-[8px] text-[36px] font-extrabold leading-[46.8px] tracking-[1.44px] md:text-[48px] md:leading-[62.4px] md:tracking-[1.92px] lg:text-[72px] lg:leading-[93.6px] lg:tracking-[2.88px]">contest</span>
          </h1>
          <p className="relative m-0 font-sans text-[20px] font-light leading-[28px] tracking-[0.4px] text-gray-600">{words(56, 11001)}</p>
          <div className="relative inline-flex items-center gap-[8px] rounded-[100px] bg-[rgba(255,222,0,0.15)] px-[20px] py-[8px]">
            <Placeholder label="Prize icon" width={18} height={18} bordered={false} />
            <span className="font-mono text-[13px] font-medium uppercase leading-[22.1px] tracking-[0.52px] text-[#555]">Win a custom mini desktop</span>
          </div>
          <div className="relative flex justify-center">
            <Link to="/dive-gallery" className="rounded-sm border-2 border-ink bg-sky-hover px-[28px] py-[14px] font-mono text-[15px] font-semibold uppercase leading-[25.5px] text-ink no-underline">See the dives</Link>
          </div>
          <div className="relative flex flex-wrap justify-center gap-x-[24px] gap-y-[4px] pt-[8px] font-mono text-[12px] font-medium uppercase leading-[20.4px] tracking-[0.72px] text-[#888]">
            {['Build with AI', 'Win a prize', 'Vote for your favorite', 'Free to enter'].map((t, i) => (
              <span key={t} className="contents">{i > 0 && <span className="font-normal tracking-normal text-[#CCC]">·</span>}<span>{t}</span></span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Embed() {
  return (
    <section className="overflow-hidden bg-cream pb-[47px] pt-[64px] md:pb-[63px] md:pt-[80px] lg:pb-[79px] lg:pt-[96px]">
      <Container>
        <div className="mx-auto max-w-[900px] rounded-sm border-2 border-ink shadow-hard-8">
          <div className="bg-ink px-[16px] py-[10px] font-mono text-[13px] font-medium leading-[22.1px] text-white">Embedded Dive: {words(25, 11010, { title: true })}</div>
          <div className="border-2 border-sand-dark">
            <Placeholder label="Embedded interactive dive" bordered={false} rounded="" className="h-[600px] w-full" />
          </div>
        </div>
        <p className="m-0 mt-[12px] text-center font-sans text-[13px] font-light leading-[18.2px] tracking-[0.26px] text-[#999]">
          {words(48, 11011)} {/* external sandbox -> non-link */}<span className="font-mono text-sky-hover">Try it yourself→</span>
        </p>
      </Container>
    </section>
  )
}

const BULLET = ['bg-sky-hover', 'bg-sun', 'bg-teal']
function WhatsADive() {
  return (
    <section className={`bg-white ${SEC}`}>
      <Container className="flex flex-col items-center gap-[16px] text-center">
        <h2 className={H2}>What's a dive</h2>
        <p className="m-0 max-w-[700px] font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] text-gray-600">{words(127, 11020)}</p>
        <div className="mt-[24px] flex w-full max-w-[1100px] items-center gap-[60px] text-left">
          <div className="flex flex-1 flex-col gap-[24px]">
            {[[22, 96, 11040], [27, 80, 11041], [24, 84, 11043]].map(([h, p, ps], i) => (
              <div key={i} className="flex gap-[16px]">
                <span className={`mt-[7px] h-[8px] w-[8px] shrink-0 border-2 border-ink ${BULLET[i]}`} />
                <div>
                  <h3 className="m-0 font-mono text-[18px] font-semibold uppercase leading-[23.4px]">{words(h, 11030 + i, { title: true })}</h3>
                  <p className="m-0 mb-[15px] mt-[4px] font-sans text-[15px] font-light leading-[22.5px] tracking-[0.3px] text-gray-600">{words(p, ps)}</p>
                </div>
              </div>
            ))}
          </div>
          <Placeholder label="Dive screenshot" className="hidden h-[387.7px] w-[460px] !border-2 !border-ink shadow-hard-8 lg:flex" bordered={false} />
        </div>
      </Container>
    </section>
  )
}

// [header bg, tag, h3 chars, p chars, note chars, p seed, note seed] (lengths / seeds fitted to the original line counts)
const TRACKS = [['bg-sky-hover', 'Craft / clarity', 12, 67, 131, 11070, 11080], ['bg-teal', 'Surprise / originality', 13, 86, 98, 11073, 11081], ['bg-sun', 'Community vote', 18, 104, 102, 11072, 11082]]
function Competition() {
  return (
    <section className={`bg-cream ${RULED} ${SEC}`}>
      <Container className="flex flex-col items-center gap-[8px] text-center">
        <h2 className={`${H2} max-lg:text-[26px] max-lg:leading-[33.8px]`}>The competition</h2>
        <p className="m-0 max-w-[700px] font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] text-gray-600 lg:text-[18px] lg:leading-[28.8px] lg:tracking-[0.36px]">{words(174, 11050)}</p>
        <div className="mt-[40px] flex w-full max-w-[1100px] flex-col gap-[28px] text-left lg:flex-row lg:gap-[24px]">
          {TRACKS.map(([bg, tag, h, p, n, ps, ns], i) => (
            <div key={i} className="flex-1 border-2 border-ink bg-white shadow-hard-6">
              <div className={`border-b-2 border-ink px-[12px] py-[8px] font-mono text-lp-tab uppercase ${bg}`}>{tag}</div>
              <div className="p-[20px] lg:p-[24px]">
                <h3 className="m-0 font-mono text-[20px] font-bold uppercase leading-[26px]">{words(h, 11060 + i, { title: true })}</h3>
                <p className="m-0 mt-[8px] font-sans text-[14px] font-light leading-[21px] tracking-[0.28px] text-gray-600">{words(p, ps)}</p>
                <p className="m-0 mb-[13px] mt-[12px] font-sans text-[13px] font-light leading-[19.5px] tracking-[0.26px] text-[#888]">{words(n, ns)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Judges() {
  return (
    <section className={`bg-white ${RULED} ${SEC}`}>
      <Container className="relative">
        <Placeholder label="Mascot decoration" kind="mascot" width={150} height={135} bordered={false} className="!absolute bottom-0 right-[37px] hidden lg:flex" />
        <h2 className={H2}>Judges</h2>
        <p className={`${SUB} mt-[8px]`}>{words(37, 11090)}</p>
        <div className="mt-[40px] flex flex-col items-center gap-[32px] xl:flex-row xl:justify-center xl:gap-[60px]">
          {[[14, 10, 87], [15, 18, 71], [16, 25, 63]].map(([n, o, b], i) => (
            <div key={i} className="w-[220px] text-center">
              <Placeholder label="Judge headshot" kind="avatar" width={120} height={120} rounded="rounded-full" bordered={false} />
              <p className="m-0 mt-[12px] font-sans text-[18px] font-semibold leading-[25.2px] tracking-[0.36px]">{words(n, 11100 + i, { title: true })}</p>
              <p className="m-0 mt-[4px] font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] text-[#888]">{words(o, 11110 + i, { title: true })}</p>
              <p className="m-0 mt-[4px] font-sans text-[13px] font-light leading-[18.2px] tracking-[0.26px] text-gray-600">{words(b, 11120 + i)}</p>
              {/* LinkedIn profile (external) -> non-link */}
              <span className="mt-[8px] inline-block font-mono text-[13px] leading-[22.1px] text-sky-hover underline">LinkedIn</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Timeline() {
  return (
    <section className={`bg-white ${RULED} ${SEC}`}>
      <Container>
        <h2 className={H2}>Timeline</h2>
        <p className={`${SUB} mt-[8px]`}>{words(23, 11130)}</p>
        <div className="mx-auto mt-[40px] flex max-w-[800px] flex-col gap-[24px]">
          {[['May 27 – Jun 22', 16, 173], ['June 22', 17, 44], ['June 24', 17, 127]].map(([d, t, p], i, all) => (
            <div key={i} className={`flex flex-row gap-[24px] ${i < all.length - 1 ? 'border-b border-[#EEE] pb-[24px]' : ''}`}>
              <p className="m-0 w-[140px] shrink-0 font-sans text-[13px] font-semibold uppercase leading-[18.2px] tracking-[1.04px] text-sky-hover">{d}</p>
              <div>
                <p className="m-0 font-sans text-[16px] font-semibold leading-[22.4px] tracking-[0.32px]">{words(t, 11140 + i, { title: true })}</p>
                <p className="m-0 mb-[14px] mt-[4px] font-sans text-[14px] font-light leading-[21px] tracking-[0.28px] text-gray-600">{words(p, 11150 + i)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// closing strip (measured; spec marked it UNMEASURED): trophy 160x158.4 + "Prizes" h2 + 3-line paragraph with a link to the rules
function Prizes() {
  return (
    <section className={`bg-cream ${RULED} ${SEC}`}>
      <Container>
        <div className="mx-auto flex max-w-[1100px] flex-row items-center gap-[40px]">
          <Placeholder label="Trophy illustration" width={160} height={158.4} bordered={false} />
          <div className="flex-1">
            <h2 className={H2}>Prizes</h2>
            <p className="m-0 mt-[12px] font-sans text-[17px] font-light leading-[28.9px] tracking-[0.34px] text-gray-600">
              {words(190, 11160)} <Link to="/divemaxxing/rules" className="font-mono text-gray-600 underline">Full contest rules</Link>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function DivemaxxingLP() {
  return (
    <>
      <Hero />
      <Embed />
      <WhatsADive />
      <Competition />
      <Judges />
      <Timeline />
      <Prizes />
    </>
  )
}
