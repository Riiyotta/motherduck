import { LiftCard, ArrowRight } from '../ui'
import { CardIcon } from './icons.jsx'

// Spec §8 "Right: 3 stacked link cards" (610 wide @>=1302; gap 16, 12 below 960).
// Hover >=960 translate(10px,-10px) 120ms; :active back to 0,0 in 60ms with bg #F8F8F7 (surface-2).
const CARDS = [
  {
    icon: 'skills',
    title: 'Skills',
    body: 'Reusable instructions your agent pulls in only when needed: query habits, table notes, playbooks.',
    link: 'Skills docs',
  },
  {
    icon: 'server',
    title: 'MCP Server',
    body: 'Scoped read and write access over a standard tool protocol, with isolated compute and narrow keys.',
    link: 'MCP server docs',
  },
  {
    icon: 'cli',
    title: 'CLI',
    body: 'A terminal-first command line: stream queries, inspect plans, and pass sessions on without context loss.',
    link: 'CLI docs',
  },
]

export default function AgentCards() {
  return (
    <div className="flex w-full flex-col justify-end gap-[12px] lg:gap-[16px] xl:w-[610px] xl:shrink-0">
      {CARDS.map((c) => (
        <LiftCard
          key={c.title}
          lift={10}
          wrapperClassName="rounded-none"
          pressDuration={60}
          // Original: transform + background-color 120ms; :active returns in 60ms with bg #F8F8F7
          bg="#FFFFFF"
          activeBg="#F8F8F7"
          // Original card targets are all /docs -> non-link cards (LiftCard default inner div)
          className="flex flex-col gap-[12px] rounded-sm border-2 border-ink p-[24px] text-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-hover"
        >
          <div className="flex items-center gap-[12px]">
            <CardIcon kind={c.icon} />
            <h3 className="flex-1 font-mono text-agent-h3 uppercase">{c.title}</h3>
          </div>
          <p className="font-sans text-sub">{c.body}</p>
          {/* Measured: link row padding-top 2, gap 6 (20px tall) -> card 168.8 @2 lines */}
          <span className="mt-auto flex items-center gap-[6px] self-end pt-[2px] font-sans text-agent-link uppercase">
            {c.link}
            <ArrowRight size={18} />
          </span>
        </LiftCard>
      ))}
    </div>
  )
}
