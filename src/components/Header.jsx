// Spec §2 Header (fixed): eyebrow banner (§2a) + navbar (§2b), click-open mega menus (§2c),
// mobile / tablet slide-in menu (§2e). Total height 142 / 112 / 122 = --header-total.
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, OffsetButton, ArrowRight } from './ui'
import Logo from './header/Logo.jsx'
import NavLink from './header/NavLink.jsx'
import Chevron from './header/Chevron.jsx'
import { MENUS } from './header/MegaMenus.jsx'
import MobileMenu from './header/MobileMenu.jsx'
import { DROPDOWNS, LINKS } from './header/navData.js'

// Nav label underline (§2b): span padding 1px 0, margin-bottom 1px, 1px transparent border;
// hover border-bottom 0.09em ink; active colour sky-hover. Wrapper margin-bottom -4px.
// Measured structure: wrapper (margin-bottom -4) > button/a (1px transparent border, r 2, flex gap 6)
// > label span. Dropdown chevrons sit OUTSIDE the button in a flex row (gap 8, align centre).
// Original: the button/link box computes to Aeonik Mono 16/19.2 (-> Fragment Mono), while the visible label
// lives in an Inter span (14/19.2 desktop). Hover/press states sit on the span and are unchanged.
const navLabel =
  'flex font-sans text-nav border-b border-transparent py-[1px] mb-[1px] group-hover:border-b-[0.09em] group-hover:border-ink group-active:border-sky-hover'
const navItem =
  'group flex items-center gap-[6px] rounded-sm border border-transparent bg-transparent p-0 font-mono text-[16px] leading-[19.2px] tracking-[0.32px] text-ink no-underline'

// Original: below 728 the banner collapses once scrolled (height 0, padding 0, margin-top -4px),
// transition height / margin-top / padding 200ms ease-in-out.
function Eyebrow({ collapsed = false }) {
  return (
    <div
      className={`flex h-[70px] items-center justify-center overflow-hidden border-y-2 border-ink bg-pink transition-[height,margin-top,padding] duration-200 ease-in-out md:h-[40px] ${
        collapsed ? 'max-md:-mt-[4px] max-md:h-0 max-md:p-0' : ''
      }`}
    >
      <div className="flex translate-y-[1px] items-center justify-center px-[10px]">
        {/* Placeholder announcement [56ch/12w] + link [35ch/6w] */}
        <p className="m-0 text-center font-fono text-eyebrow-sm uppercase text-black md:text-eyebrow md:max-lg:text-[13px] md:max-lg:leading-[15.6px] md:max-lg:tracking-[0.13px]">
          ✦ New: shared team spaces are now open to all our users
          <span className="inline-block w-[6px] md:w-[8px]" aria-hidden="true" />
          <span className="inline-block">
            {/* Original target is an external event site: non-link */}
            <NavLink className="group flex items-center gap-[6px] rounded-sm border border-transparent text-black no-underline">
              <span className="mb-[1px] border-b border-black pb-[1px] md:pt-[1px]">Read about everything new this week</span>
              <ArrowRight size={18} className="hidden md:block" />
              <ArrowRight size={16} className="md:hidden" />
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(null) // open desktop dropdown key
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)
  const { pathname } = useLocation()

  // Navigating from a menu closes it
  useEffect(() => {
    setMenu(null)
    setMobileOpen(false)
  }, [pathname])

  // §11 #1 (original hook): scrolled = innerWidth < 728 ? scrollY > 70 : scrollY > 20.
  // Drives the border-bottom (transparent -> ink, 200ms) and the <728 eyebrow collapse.
  useEffect(() => {
    const onScroll = () => setScrolled(window.innerWidth < 728 ? window.scrollY > 70 : window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close an open dropdown on outside click / Escape (close behaviour UNMEASURED; standard pattern)
  useEffect(() => {
    if (!menu) return
    const onDown = (e) => navRef.current && !navRef.current.contains(e.target) && setMenu(null)
    const onKey = (e) => e.key === 'Escape' && setMenu(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  // Mobile menu locks page scroll (html overflow hidden); closes when crossing to >=1302
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    if (!mobileOpen) return
    const mq = window.matchMedia('(min-width: 1302px)')
    const onChange = (e) => e.matches && setMobileOpen(false)
    mq.addEventListener('change', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[99] border-b-2 bg-cream transition-[border-color,background-color] duration-200 ease-in-out ${
        scrolled ? 'border-ink' : 'border-transparent'
      }`}
    >
      <Eyebrow collapsed={scrolled} />
      <Container>
        <div className="flex h-[70px] items-center justify-between py-[12px] xl:h-[80px]">
          <div className="flex items-center gap-[40px]">
            <Link to="/" aria-label="Home" className="flex bg-transparent p-0">
              <Logo className="h-[27px] w-[154px] xl:h-[31px] xl:w-[174px]" />
            </Link>
            <nav ref={navRef} aria-label="Main" className="hidden items-center gap-[24px] xl:flex">
              {DROPDOWNS.map(({ key, label }) => {
                const Menu = MENUS[key]
                const open = menu === key
                return (
                  <div key={key} className="relative">
                    <div className="flex items-center gap-[8px]">
                      <div className="-mb-[4px]">
                        <button
                          type="button"
                          aria-expanded={open}
                          onClick={() => setMenu(open ? null : key)}
                          className={navItem}
                        >
                          <span className={navLabel}>{label}</span>
                        </button>
                      </div>
                      <Chevron open={open} className="cursor-pointer" onClick={() => setMenu(open ? null : key)} />
                    </div>
                    {open && <Menu />}
                  </div>
                )
              })}
              {LINKS.map((l) => (
                <div key={l.title} className="-mb-[4px]">
                  <NavLink to={l.to} className={navItem}>
                    <span className={navLabel}>{l.title}</span>
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>

          {/* LOG IN / START FREE target the external auth app: non-link / plain button */}
          <div className="hidden items-center gap-[24px] xl:flex">
            <div className="-mb-[4px]">
              <NavLink className={navItem}>
                <span className={navLabel}>LOG IN</span>
              </NavLink>
            </div>
            {/* Original CTA box: Aeonik Mono 16/16 (-> Fragment Mono) around an Inter 14/16.8 label span */}
            <OffsetButton variant="primary" type="button" className="!font-mono !text-[16px] !leading-[16px]">
              <span className="font-sans text-button">START FREE</span>
            </OffsetButton>
          </div>

          {/* Hamburger <1302: button 24x21, svg 24x15, three 2px ink strokes. Close icon geometry UNMEASURED. */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-[21px] w-[24px] items-center justify-center bg-transparent p-0 xl:hidden"
          >
            <svg width="24" height="15" viewBox="0 0 24 15" fill="none" aria-hidden="true" className="text-ink">
              {mobileOpen ? (
                <path d="M4.5 0.5 19.5 14.5M19.5 0.5 4.5 14.5" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M0 1h24M0 7.5h24M0 14h24" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </Container>
      <MobileMenu id="mobile-menu" open={mobileOpen} />
    </header>
  )
}
