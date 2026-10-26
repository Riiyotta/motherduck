// Desktop mega-menu panels (spec §2c). Positioned by the caller's relative nav item.
// Panel: absolute, left -20px, z 3, bg #fff, 2px ink border, dropdown shadow, radius 0,
// enters with `dropdown-in` (top 100% -> calc(100% + 16px), opacity 0 -> 1, 200ms ease-out forwards).
import { ArrowRight } from '../ui'
import NavLink from './NavLink.jsx'
import { PRODUCT, COMMUNITY, COMPANY } from './navData.js'

// #F1F1F1 (item hover / dividers) and #FFFBB6 (NEW badge) have no shared token: scoped here.
const HOVER = 'hover:bg-[#F1F1F1]'
const heading = 'font-sans text-[10px] leading-[14px] font-semibold uppercase text-gray-500'
const sideLink = `flex items-center gap-[8px] px-[20px] py-[12px] font-sans text-[14px] leading-[22.4px] tracking-[0.196px] text-ink no-underline transition-colors duration-200 ease-[ease] ${HOVER}`

function Panel({ width, children }) {
  return (
    <div
      className="absolute left-[-20px] top-full z-[3] flex animate-dropdown-in rounded-none border-2 border-ink bg-white opacity-0 shadow-dropdown"
      style={{ width }}
    >
      {children}
    </div>
  )
}

function IconLink({ title, sub, to }) {
  return (
    <NavLink
      to={to}
      className={`group/item flex h-[63.2px] items-center gap-[12px] p-[12px] no-underline transition-colors duration-200 ease-[ease] ${HOVER}`}
    >
      {/* 32x32 icon slot: neutral placeholder glyph */}
      <span aria-hidden="true" className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-sm bg-surface-3">
        <span className="h-[12px] w-[12px] rounded-full border-2 border-gray-500" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-sans text-[14px] leading-[22.4px] tracking-[0.196px] text-ink">{title}</span>
        <span className="font-sans text-[12px] leading-[16.8px] text-gray-500 transition-colors duration-200 ease-[ease] group-hover/item:text-ink">
          {sub}
        </span>
      </span>
    </NavLink>
  )
}

// Measured: the first side column carries a 2px #F1F1F1 left divider; a heading-less column keeps
// its 46px heading slot (padding 20 20 12 + 14px line).
function SideColumn({ heading: h, links, divider = false, headingPad = 'px-[20px] pb-[12px] pt-[20px]' }) {
  return (
    <div className={`w-[200px] shrink-0 bg-surface-2 ${divider ? 'border-l-2 border-[#F1F1F1]' : ''}`}>
      <p className={`${heading} ${headingPad} m-0 h-[46px]`}>{h}</p>
      {links.map((l) => (
        <NavLink key={l.title} to={l.to} className={sideLink}>
          {l.title}
        </NavLink>
      ))}
    </div>
  )
}

export function ProductMenu() {
  return (
    <Panel width={852}>
      <div className="w-[648px] shrink-0">
        {PRODUCT.sections.map((s, i) => (
          <div key={s.heading} className={i > 0 ? 'border-t-2 border-[#F1F1F1]' : ''}>
            <p className={`${heading} m-0 px-[20px] pt-[20px]`}>{s.heading}</p>
            <div className="grid grid-cols-[repeat(2,316px)] px-[8px] pb-[8px] pt-[12px]">
              {s.items.map((it) => (
                <IconLink key={it.title} {...it} />
              ))}
            </div>
          </div>
        ))}
        <div className="border-t-2 border-[#F1F1F1]">
          <div className="flex h-[34px] items-center justify-between gap-[8px] px-[20px] pt-[20px]">
            <div className="flex items-center gap-[8px]">
              <p className={`${heading} m-0 tracking-[0.5px]`}>COMPARISONS</p>
              <span className="rounded-[3px] bg-[#FFFBB6] px-[6px] py-[2px] font-mono text-[10px] font-semibold leading-[10px] tracking-[0.5px] text-ink">
                NEW
              </span>
            </div>
            <NavLink
              to={PRODUCT.comparisonsAll}
              className="flex items-center gap-[4px] font-sans text-[12px] leading-[12px] text-gray-500 no-underline transition-colors duration-200 ease-[ease] hover:text-ink"
            >
              See all <ArrowRight size={14} />
            </NavLink>
          </div>
          {/* 3 flex columns of 192, column gap 16, padding 12 20 16, links 14/22.4 */}
          <div className="grid grid-cols-[repeat(3,192px)] gap-x-[16px] px-[20px] pb-[16px] pt-[12px]">
            {[0, 1, 2].map((col) => (
              <div key={col} className="flex flex-col">
                {PRODUCT.comparisons.slice(col * 2, col * 2 + 2).map((c) => (
                  <NavLink key={c.title} to={c.to} className="block font-sans text-[14px] leading-[22.4px] tracking-[0.196px] text-ink no-underline hover:underline">
                    {c.title}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <SideColumn heading="MORE" links={PRODUCT.more} divider />
    </Panel>
  )
}

export function CommunityMenu() {
  return (
    <Panel width={736}>
      <div className="w-[332px] shrink-0 p-[8px]">
        {COMMUNITY.items.map((it) => (
          <IconLink key={it.title} {...it} />
        ))}
      </div>
      {COMMUNITY.columns.map((c, i) => (
        <SideColumn key={i} heading={c.heading} links={c.links} divider={i === 0} />
      ))}
    </Panel>
  )
}

export function CompanyMenu() {
  return (
    <Panel width={367}>
      <div className="w-full p-[8px]">
        {COMPANY.items.map((it) => (
          <IconLink key={it.title} {...it} />
        ))}
      </div>
    </Panel>
  )
}

export const MENUS = { product: ProductMenu, community: CommunityMenu, company: CompanyMenu }
