// X21 gated LP bodies (PAGES_SPEC_EXTRA §7): /ducklake-open-table-format-full, /divemaxxing-full, /jev-full, and the
// /lp/ducklake-lakehouse-table-format-book redirect target (LP-only fixed nav, no site header / footer; §1a, §12).
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../styles/company.css'
import {
  LPHero, LPSection, FAQSection, GatedFormSection, DarkFeatureGrid, PartCards, SplitChecklist, AuthorsGrid,
} from '../../components/company/lp.jsx'
import { filler, heading } from '../../components/company/copy.js'
import { OffsetButton } from '../../components/ui'
import Logo from '../../components/header/Logo.jsx'
import { OutlineCardGrid, ColorCardGrid, DarkTable, FitChecklist, GatedFormSection2 } from '../../components/extra/lpBlocks.jsx'
import DivemaxxingLP from '../../components/extra/divemaxxing.jsx'
import JevLP from '../../components/extra/jev.jsx'
import { words } from '../../components/extra/generic.jsx'
import '../../styles/extra-marketing.css'

const SKY = '#6FC2FF'
const SUN = '#FFDE00'

// ---------- /ducklake-open-table-format-full ----------
function DucklakeFull() {
  return (
    <>
      <div id="home"><LPHero chip="Free guide · open table formats" h1={words(47, 13001, { title: true })} sub={words(31, 13002, { title: true })} body={words(273, 13003)} finePrint={words(44, 13004)} cta="Download the guide" /></div>
      <div id="why-ducklake">
        <LPSection bg="ink" title={words(40, 13010, { title: true })} intro={words(291, 13011)}>
          <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-white">{words(98, 13012)}</p>
          <OutlineCardGrid items={[[20, 67], [14, 63], [17, 43], [14, 63], [16, 49]]} />
        </LPSection>
      </div>
      <div id="what-s-inside">
        <LPSection bg="white" title="Inside the guide" intro={words(96, 13020)} introTone="ink">
          <ColorCardGrid items={[['Architecture', 18, 142], ['Tutorial', 25, 112], ['Reference', 19, 120], ['Operations', 24, 119], ['Pipelines', 24, 120], ['Security', 21, 127]]} />
        </LPSection>
      </div>
      <div id="comparison">
        <LPSection bg="ink" title="Three table formats compared" intro={words(51, 13030)}>
          <DarkTable head={['Feature', 'Our format', 'Format B', 'Format C']}
            rows={[[16, 38, 36, 39], [17, 32, 17, 17], [19, 36, 24, 35], [16, 37, 31, 33], [14, 27, 59, 34]]} note={words(109, 13031)} />
        </LPSection>
      </div>
      <LPSection bg="sun"><FitChecklist title="Is this guide for you?" items={[75, 78, 53, 64, 75, 74]} /></LPSection>
      <div id="faq">
        <FAQSection count={7} qs={[[17, 13040], [59, 13041], [24, 13042], [47, 13043], [22, 13044], [19, 13045], [40, 13046]]}
          as={[[368, 13050], [525, 13051], [227, 13052], [346, 13053], [279, 13054], [280, 13055], [546, 13056]]} />
      </div>
      <div id="download"><GatedFormSection2 title="Download the guide" intro={words(75, 13060)} /></div>
    </>
  )
}

// ---------- /lp/ducklake-lakehouse-table-format-book (LP-only nav) ----------
const NAV = [['Home', 'home'], ['Why it matters', 'why-ducklake'], ["What's inside", 'what-s-inside'], ['Authors', 'authors'], ['FAQ', 'faq'], ['Get early access', 'get-early-access']]
const jump = (id) => (e) => {
  e.preventDefault()
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'auto' })
}
function LpNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[99] flex h-[66px] items-center justify-between border-b-2 border-ink bg-white px-[24px] lg:h-[62px] lg:px-[48px] xl:h-[77.8px]">
      <a href="#home" onClick={jump('home')} aria-label="Back to top" className="flex"><Logo className="h-[28px] w-[159px]" /></a>
      <div className="hidden items-center gap-[24px] lg:flex">
        {NAV.map(([l, id]) => (
          <a key={id} href={`#${id}`} onClick={jump(id)} className="font-sans text-[14px] font-medium uppercase leading-[14px] text-ink no-underline hover:underline">{l}</a>
        ))}
      </div>
      <OffsetButton href="#get-early-access" onClick={jump('get-early-access')} wrapperClassName="hidden xl:inline-flex">Get early access</OffsetButton>
    </nav>
  )
}
function DucklakeBook() {
  useEffect(() => {
    document.body.dataset.xmLpOnly = ''
    return () => { delete document.body.dataset.xmLpOnly }
  }, [])
  // same body as the book's -full LP (company Gated.jsx lens values), under the LP-only nav
  return (
    <>
      <LpNav />
      <div className="pt-[64px]">
        <div id="home" className="[&>section]:pb-[55px] [&>section]:pt-[55px] lg:[&>section]:pb-[136px] lg:[&>section]:pt-[136px]">
          <LPHero chip="Free book · early release" h1={heading(31, 4899)} sub={heading(56, 4595)} body={filler(197, 3349)} finePrint={filler(109, 3275)} cta="Get early access" />
        </div>
        <div id="why-ducklake">
          <LPSection bg="ink" title={heading(12, 2141)} intro={filler(195, 838)}>
            <DarkFeatureGrid rules={[SKY, SKY, SKY, SUN, SUN, SUN]}
              items={[[20, 667, 60, 3193], [14, 344, 62, 102], [14, 3669, 63, 3269], [20, 3553, 64, 367], [18, 3337, 67, 317], [16, 682, 49, 2713]]} />
          </LPSection>
        </div>
        <div id="what-s-inside">
          <LPSection bg="white" title={heading(23, 682)} intro={filler(61, 975)} introTone="ink">
            <PartCards items={[[21, 2166, 186, 683], [30, 4827, 163, 2276], [27, 3098, 165, 4552]]} />
          </LPSection>
        </div>
        <LPSection bg="cream" title={heading(29, 583)}>
          <SplitChecklist paras={[[227, 4192], [273, 4027]]} title={[25, 2622]} checks={[[49, 4459], [44, 1494], [33, 676], [44, 120]]} />
        </LPSection>
        <div id="authors">
          <LPSection bg="sun" title={heading(16, 3274)} intro={filler(70, 4105)} introTone="ink"><AuthorsGrid bios={[[519, 3818], [448, 1727]]} /></LPSection>
        </div>
        <div id="faq">
          <FAQSection count={5} title={heading(26, 4927)} qs={[[53, 1125], [10, 3785], [32, 2519], [27, 4502], [19, 492]]}
            as={[[117, 3396], [81, 3826], [238, 1696], [215, 4853], [200, 3063]]} />
        </div>
        <div id="get-early-access"><GatedFormSection title={heading(32, 1434)} intro={filler(81, 549)} /></div>
      </div>
    </>
  )
}

const PAGES = {
  '/ducklake-open-table-format-full': DucklakeFull,
  '/divemaxxing-full': DivemaxxingLP,
  '/jev-full': JevLP,
  '/lp/ducklake-lakehouse-table-format-book': DucklakeBook,
}

export default function LpExtra() {
  const path = useLocation().pathname.replace(/\/$/, '')
  const Page = PAGES[path] || DucklakeFull
  return <Page />
}
