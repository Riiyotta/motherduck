import { ArrowRight, Container } from './ui'
import Arc from './integrations/Arc.jsx'
import Cloud from './integrations/Cloud.jsx'
import IntegrationsBar from './integrations/IntegrationsBar.jsx'

// Spec §6 Integrations: cream, overflow clip, padding 220 0 120 (>=1302), 96 0 88 (728-1301), 96 0 64 (<728).
// Grid texture recreated in CSS (cell 43.6 x 42.9, 1.5px rgba(225,214,204,.84) lines, fading toward the top).
const GRID = {
  backgroundImage:
    'linear-gradient(rgba(225,214,204,.84) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(225,214,204,.84) 1.5px, transparent 1.5px)',
  backgroundSize: '43.6px 42.9px',
  backgroundPosition: '50% 100%',
  maskImage: 'linear-gradient(to top, #000 60%, transparent)',
  WebkitMaskImage: 'linear-gradient(to top, #000 60%, transparent)',
}

export default function Integrations() {
  return (
    <section className="relative overflow-clip bg-cream pb-[64px] pt-[96px] md:pb-[88px] xl:pb-[120px] xl:pt-[220px]">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-[220px] xl:h-[640px]" style={GRID} />
      <Container className="relative z-[1]">
        <div className="relative">
          {/* Decorative clouds at top -150: 190x88 left -30, 272x127 at 571 (of 1242), 190x88 right -20 */}
          {/* Measured: clouds are hidden below 1302; the centre cloud sits 10px higher (top -160). */}
          <Cloud fillClass="fill-cream" className="absolute left-[-30px] top-[-150px] hidden h-[88px] w-[190px] xl:block" />
          <Cloud fillClass="fill-cream" className="absolute left-[46%] top-[-160px] hidden h-[127px] w-[272px] xl:block" />
          <Cloud fillClass="fill-cream" className="absolute right-[-20px] top-[-150px] hidden h-[88px] w-[190px] -scale-x-100 xl:block" />

          <div className="relative mb-[64px] flex flex-col items-center gap-[8px] text-center xl:mb-[56px]">
            <h2 className="m-0 font-fono text-h2-sm font-normal uppercase md:text-h2-lg xl:text-h2">Bring all the tools you know</h2>
            <p className="m-0 font-sans text-sub font-light">
              Work with the languages, notebooks and pipelines you know, from any runtime to BI.
            </p>
            <div className="mt-[32px]">
              {/* Measured: a = 1px transparent border, r 2, gap 6; label span padding 1px 0 + 1px underline (231x25.2 total) */}
              {/* Original target: /docs/integrations -> non-link with identical styling */}
              <span className="group flex items-center gap-[6px] rounded-sm border border-transparent pb-[1px] font-sans text-[16px] uppercase leading-[19.2px] tracking-[0.32px] text-ink no-underline">
                <span className="border-b border-ink py-[1px] group-hover:border-sky-hover">View all integrations</span>
                <ArrowRight />
              </span>
            </div>
          </div>
        </div>

        <Arc />
        <IntegrationsBar />
      </Container>
    </section>
  )
}
