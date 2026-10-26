import { Container } from './ui'
import Cloud from './agent/Cloud.jsx'
import DitherCanvas from './agent/DitherCanvas.jsx'
import AgentTerminal from './agent/AgentTerminal.jsx'
import AgentCards from './agent/AgentCards.jsx'

// Spec §8 Agent-native section (sky, overflow clip, no top border).
export default function AgentNative() {
  return (
    <section className="relative overflow-clip bg-sky">
      <DitherCanvas />
      {/* Cloud 256x119 at top 2 / left 901.5 @1440 (= centre + 184px); 202x94 @1280; hidden <960.
          Left offset at 960–1301 is UNMEASURED: the same centre offset is reused. */}
      {/* Measured left: 878 @1280 (= centre + 238), 904 @1440 (= centre + 184) */}
      <Cloud className="absolute left-[calc(50%+238px)] top-[2px] hidden h-[94px] w-[202px] lg:block xl:left-[calc(50%+184px)] xl:h-[119px] xl:w-[256px]" />

      <Container className="relative z-[1] flex flex-col gap-[40px] py-[56px] xl:gap-[56px] xl:py-[80px]">
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-fono xl:max-w-[760px] text-h2-agent-sm uppercase md:text-h2-agent-lg xl:text-h2-agent">
            Agent-first Interfaces
          </h2>
          <p className="font-sans text-sub">
            Automated clients act unlike people do. Pick the tools, links, and surfaces that suit your work best.
          </p>
        </div>

        <div className="flex flex-col gap-[32px] xl:flex-row xl:items-end">
          <AgentTerminal />
          <AgentCards />
        </div>
      </Container>
    </section>
  )
}
