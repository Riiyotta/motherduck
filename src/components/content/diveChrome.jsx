// Dive-gallery app chrome (D1): own fixed 66px nav and compact ink footer. App.jsx hides the site header and footer
// under /dive-gallery; used by /dive-gallery (DiveGallery.jsx) and /dive-gallery/dives/:slug (DiveDetail.jsx).
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../header/Logo.jsx'
import { useOutside } from './hooks.js'
import { SocialGlyph, Wordmark } from '../footer/icons.jsx'
import { SiteLink } from '../../lib/links.js'

const MENU_ITEM = 'block cursor-pointer px-[20px] py-[14px] text-[14px] uppercase leading-[14px] text-ink no-underline transition-[background] duration-200 ease-[ease] hover:bg-sand-dark'

export function DiveNav() {
  // Re-measured live at 1440 / 768 / 390: logo 168x29 aligned to the 1302 container (x99 @1440, x24 below),
  // "Dive Gallery" 12/12 600 right-aligned under it; links Inter 14/14 (padding-bottom 2), gap 32; SIGN IN
  // 98.6x36 (padding 10 20). Below 960 the links and SIGN IN collapse into a 32x32 two-bar menu button.
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  useOutside(menuRef, () => setOpen(false), open)
  return (
    <nav className="fixed inset-x-0 top-0 z-[50] h-[66px] border-b-2 border-transparent bg-cream">
      <div className="mx-auto flex h-full max-w-[1302px] items-center justify-between px-[24px] xl:px-[30px]">
        <Link to="/dive-gallery" className="flex flex-col items-end no-underline">
          <Logo className="h-[29px] w-[168px]" />
          <span className="-mt-[2px] font-sans text-[12px] font-semibold leading-[12px] tracking-[0.48px] text-gray-500">Dive Gallery</span>
        </Link>
        <div className="hidden items-center gap-[32px] lg:flex">
          <Link to="/dive-gallery" className="pb-[2px] font-sans text-[14px] uppercase leading-[14px] text-ink no-underline">Home</Link>
          <span className="cursor-pointer pb-[2px] font-sans text-[14px] uppercase leading-[14px] text-ink">About</span>
          <span className="cursor-pointer pb-[2px] font-sans text-[14px] uppercase leading-[14px] text-ink">Docs ↗</span>
          <span className="flex cursor-pointer items-center gap-[6px] font-sans text-[13px] leading-[13px] text-gray-500">
            <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true"><circle cx="3.5" cy="3.5" r="2.5" fill="#818181" /><circle cx="10.5" cy="3.5" r="2.5" fill="#818181" /><circle cx="3.5" cy="10.5" r="2.5" fill="#818181" /><circle cx="10.5" cy="10.5" r="2.5" fill="#818181" /></svg>
            Join our Slack
          </span>
          {/* Measured: bg #6FC2FF, transition transform .2s, box-shadow .2s; hover translate(3,-3) + -6px 6px 0 ink; :active resets */}
          <button type="button" className="rounded-sm border-2 border-ink bg-sky-hover px-[20px] py-[10px] font-mono text-[12px] uppercase leading-[12px] tracking-[0.6px] text-ink transition-[transform,box-shadow] duration-200 ease-[ease] hover:translate-x-[3px] hover:translate-y-[-3px] hover:shadow-[-6px_6px_0_0_#383838] active:translate-x-0 active:translate-y-0 active:shadow-none">Sign in</button>
        </div>
        {/* Mobile menu (measured @390): 220px dropdown (2px ink border, cream) at top 50 / right -24 of the 32px
            button; items Inter 14/14 UPPER, padding 14 20, 1px #E1D6CB separators, hover bg #E1D6CB (background .2s);
            a 2px ink rule above SIGN IN (transparent bg here). Closes on outside click. */}
        <div ref={menuRef} className="relative h-[32px] w-[32px] lg:hidden">
          <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
            className="flex h-[32px] w-[32px] flex-col justify-center gap-[5px] border-0 bg-transparent p-[4px]">
            <span className="block h-[2px] w-[24px] bg-ink" /><span className="block h-[2px] w-[24px] bg-ink" />
          </button>
          {open && (
            <div className="absolute right-[-24px] top-[50px] z-[10] w-[220px] border-2 border-ink bg-cream font-sans text-ink">
              <Link to="/dive-gallery" onClick={() => setOpen(false)} className={MENU_ITEM}>Home</Link>
              <span className={`${MENU_ITEM} border-t border-sand-dark`}>About</span>
              <span className={`${MENU_ITEM} border-t border-sand-dark`}>Docs ↗</span>
              <span className={`${MENU_ITEM} flex items-center gap-[8px] border-t border-sand-dark !normal-case`}>
                <svg width="18" height="18" viewBox="0 0 14 14" aria-hidden="true"><circle cx="3.5" cy="3.5" r="2.5" fill="#818181" /><circle cx="10.5" cy="3.5" r="2.5" fill="#818181" /><circle cx="3.5" cy="10.5" r="2.5" fill="#818181" /><circle cx="10.5" cy="10.5" r="2.5" fill="#818181" /></svg>
                Join our Slack
              </span>
              <div className="border-t-2 border-ink" />
              <span className={MENU_ITEM}>Sign in</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}


// Gallery footer (measured live @1440/1280/768/390): ink, padding 72/56 (>=960), 56 (728-959), 48 (<728); inner
// padding 48 100 (>=960) / 32 24. Top: brand column (logo 210x37.9 @>=1302, 180x32.5 below; 4 social icons
// 24px gap 20, 20px gap 16 <728) beside a 4-column link grid (equal max-content tracks, gap 32 @>=1302 / 16);
// below 960 it stacks (gap 40) and the grid is 3 columns gap 24 (728-959) / 2 columns gap 32x24 (<728).
// Columns: heading Inter 14/14 700 (16/16 @>=1302), links Inter 13/13 300 (14/14 @>=1302), gap 16 (14 <960).
// Bottom row: 1px rgba(255,255,255,.15) top border, padding-top 32, 48 below the grid; row space-between >=728,
// column gap 16 below; Inter 14/14 300 (13/13 <728); legal links gap 24 (16 <728).
const DF_COLS = [
  // /dive-gallery/submit redirects to the auth login on the original (auth URL -> non-link)
  ['Dive Gallery', [['Browse dives', '/dive-gallery/'], ['Submit one', null]]],
  ['Product', [['Overview', '/product/'], ['Dashboards', '/product/dives/'], ['Assistant access', '/product/mcp-server/'], ['Pricing', '/product/pricing/']]],
  ['Community', [['Blog', '/blog/'], ['Chat', 'https://slack.motherduck.com/'], ['Video channel', 'https://www.youtube.com/@motherduckdb'], ['Events', '/events/']]],
  ['Company', [['About us', '/about-us/'], ['Docs', '/docs/getting-started'], ['Careers', '/careers/'], ['Contact us', '/contact-us/']]],
]
const DF_SOCIAL = [['chat', 'Chat community'], ['post', 'Social feed'], ['network', 'Professional network'], ['video', 'Video channel']]
const DF_LEGAL = [['Terms of Use', '/terms-of-use/'], ['Privacy Policy', '/privacy-policy/'], ['Support Policy', '/support-policy/']]
const DF_LINK = 'block text-[13px] font-light leading-[13px] text-white no-underline hover:underline xl:text-[14px] xl:leading-[14px]'

export function DiveFooter() {
  return (
    <footer className="bg-ink py-[48px] font-sans text-white md:py-[56px] lg:pb-[56px] lg:pt-[72px]">
      <div className="px-[24px] py-[32px] lg:px-[100px] lg:py-[48px]">
        <div className="flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[40px] lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-[20px]">
              <SiteLink href="/" aria-label="Home" className="block self-start pb-[2px] text-white">
                <Wordmark className="block h-[32.5px] w-[180px] xl:h-[37.9px] xl:w-[210px]" />
              </SiteLink>
              {/* social targets are external -> non-link */}
              <div className="flex gap-[16px] md:gap-[20px]">
                {DF_SOCIAL.map(([kind, label]) => (
                  <span key={kind} role="img" aria-label={label} className="flex h-[20px] w-[20px] text-white md:h-[24px] md:w-[24px]">
                    <SocialGlyph kind={kind} />
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[24px] gap-y-[32px] md:grid-cols-3 md:gap-[24px] lg:grid-cols-4 lg:gap-[16px] xl:gap-[32px]">
              {DF_COLS.map(([head, links]) => (
                <nav key={head} aria-label={head} className="flex flex-col gap-[14px] lg:gap-[16px]">
                  <span className="block text-[14px] font-bold leading-[14px] xl:text-[16px] xl:leading-[16px]">{head}</span>
                  {links.map(([label, href]) => <SiteLink key={label} href={href} className={DF_LINK}>{label}</SiteLink>)}
                </nav>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[16px] border-t border-white/15 pt-[32px] md:flex-row md:items-center md:justify-between">
            <span className="block text-[13px] font-light leading-[13px] md:text-[14px] md:leading-[14px]">
              © 2026 Northwind · Built on the <span className="underline">engine</span>
            </span>
            <div className="flex gap-[16px] md:gap-[24px]">
              {DF_LEGAL.map(([label, href]) => <SiteLink key={label} href={href} className={DF_LINK.replace(/xl:/g, 'md:')}>{label}</SiteLink>)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
