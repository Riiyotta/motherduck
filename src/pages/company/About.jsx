import '../../styles/company.css'
import { AboutHero, OriginStory, TeamPhoto, Investors, ContactBand, CommunityCTA } from '../../components/company/about.jsx'

// /about-us (PAGES_SPEC_COMPANY §5): A1 -> A2 -> A3 -> A4 -> A5 -> A6
export default function About() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <TeamPhoto />
      <Investors />
      <ContactBand />
      <CommunityCTA />
    </>
  )
}
