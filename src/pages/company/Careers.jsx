import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../styles/company.css'
import {
  CareersHero, HowWeWork, VideoFeature, ValuesCards, JobsBoard, PhotoMarquee, BenefitsCard, Testimonials, ClosingCTA,
} from '../../components/company/careers.jsx'

// /careers (PAGES_SPEC_COMPANY §5): A1 -> B1 -> B2 -> B3 -> B4 -> B5 -> B6 -> P6 + B7 -> B8
export default function Careers() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto' }))
    return () => cancelAnimationFrame(id)
  }, [hash])
  return (
    <>
      <CareersHero />
      <HowWeWork />
      <VideoFeature />
      <ValuesCards />
      <JobsBoard />
      <PhotoMarquee />
      <BenefitsCard />
      <Testimonials />
      <ClosingCTA />
    </>
  )
}
