// L9 /learn: FeedHero(learn) -> LearnCard grid (68, all at once). As on the original, the h3 title is the link to
// /learn/<slug> and its ::after (absolute, inset 0) stretches it over the whole card.
import { Link } from 'react-router-dom'
import { Container, LiftCard, Placeholder, UnderlineLink } from '../../components/ui'
import FeedHero from '../../components/content/FeedHero.jsx'
import { learnItems } from '../../components/content/data.js'

function LearnCard({ item }) {
  return (
    <LiftCard lift={14} as="div" innerAs="article" wrapperClassName="h-full"
      className="relative flex h-full flex-col gap-[16px] rounded-sm border-2 border-ink bg-white p-[24px] lg:px-[32px] lg:pb-[40px] lg:pt-[32px]">
      <Placeholder label="Guide icon" className="h-[100px] w-[100px] md:h-[120px] md:w-[120px]" />
      <h3 className="m-0 font-mono font-normal uppercase text-ink text-learn-title-md lg:text-learn-title"><Link to={`/learn/${item.slug}`} className="text-ink no-underline after:absolute after:inset-0 after:content-['']">{item.title}</Link></h3>
      <p className="m-0 line-clamp-[7] font-sans text-[14px] font-light leading-[22.4px] tracking-[0.32px] lg:text-[16px] lg:leading-[25.6px]">{item.desc}</p>
      <div className="mt-auto pt-[16px]"><UnderlineLink uppercase>Learn More</UnderlineLink></div>
    </LiftCard>
  )
}

export default function LearnHub() {
  return (
    <div className="relative overflow-x-clip">
      <FeedHero variant="learn" h1="Learn" />
      <Container className="flex flex-col gap-[32px] pb-[100px] md:gap-[52px] lg:pb-[140px]">
        <div className="mx-auto grid w-full max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-2 lg:max-w-[740px] lg:gap-[32px] xl:max-w-none">
          {learnItems().map((it) => <LearnCard key={it.slug} item={it} />)}
        </div>
      </Container>
    </div>
  )
}
