import { Container } from './ui'
import PlatformDiagram from './platform/PlatformDiagram.jsx'
import ProductCard from './platform/ProductCard.jsx'
import QuoteCard from './platform/QuoteCard.jsx'

// Spec §5 Platform: cream, border-top 2px ink, overflow clip.
// Padding-top 100 (80 for 728-1301, 56 <728), padding-bottom 0. Placeholder copy matches
// the original's character/word counts (H2 46ch/7w, lede 109ch/18w, cards 101-114ch, quote 336ch/53w).
// Card 1 (115ch) and the quote (338ch) are tuned to the original's line counts: 3/4/3/4 and 4/4/5/11 lines @1440/1280/768/390.
const PRODUCTS = [
  {
    title: 'Pipelines',
    body: 'A workflow runtime that runs on managed compute. Schedule data loads, run classifiers and more on a flexible setup.',
    bgClass: 'bg-peach',
    href: '/product/flights/',
  },
  {
    title: 'Context',
    body: 'A context layer for agents. Give agents the shared knowledge they need for faster, more reliable work.',
    bgClass: 'bg-sky-tint',
    href: '/docs/key-tasks/guides/', // docs -> non-link card
  },
  {
    title: 'Visuals',
    body: 'Interactive charts built by agents. Use them in house or embed them in your product, no BI tool needed.',
    bgClass: 'bg-mint',
    href: '/product/dives/',
  },
]

export default function Platform() {
  return (
    <section className="relative overflow-clip border-t-2 border-ink bg-cream pt-[56px] md:pt-[80px] xl:pt-[100px]">
      <Container>
        <h2 className="m-0 font-fono text-h2-sm font-normal uppercase md:text-h2-lg xl:text-h2">
          A single platform for compute, storage, agents
        </h2>
        <p className="m-0 mt-[12px] max-w-lede font-sans text-lede-sm xl:text-lede">
          A shared foundation that links raw files, compute workers and the agent tools that turn questions into answers.
        </p>

        <PlatformDiagram />

        <div className="mt-[56px] flex flex-col gap-[24px] lg:grid lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>

        <QuoteCard
          className="mt-[56px]"
          quote="Our previous cluster kept failing under heavy reporting workloads, even after we added more hardware to it. With large partners relying on our numbers every day, that was no longer acceptable. Moving to this platform made our slowest queries several times faster, and it is now the main source of truth for all of our core reporting work."
          name="Jordan Avery"
          role="Co-Founder & CTO"
          href="/case-studies/"
        />
      </Container>
    </section>
  )
}
