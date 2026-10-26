// Mobile / tablet menu panel (<1302, spec §2e).
// Absolute under the header at top = header-total - 2 (110 / 140), slides in from the right:
// transition right 200ms ease-in-out, opacity 500ms ease-in-out, visibility 0s linear 500ms.
import { useLayoutEffect, useRef, useState } from 'react'
import { OffsetButton } from '../ui'
import Chevron from './Chevron.jsx'
import NavLink from './NavLink.jsx'
import { DROPDOWNS, LINKS, PRODUCT, COMMUNITY, COMPANY } from './navData.js'

const GROUP_ITEMS = {
  // measured order: section items, then comparisons, then MORE links (19 items)
  product: [...PRODUCT.sections.flatMap((s) => s.items), ...PRODUCT.comparisons, ...PRODUCT.more],
  community: [...COMMUNITY.items, ...COMMUNITY.columns.flatMap((c) => c.links)],
  company: COMPANY.items,
}
const COLLAPSED = 25 // measured collapsed group height
const GROUP_GAP = 24 // measured: first child sits 24px below the 25.2px label button
// Label structure mirrors the desktop nav: 1px transparent border (r 2), flex gap 6, label span
// padding 1 0 / margin-bottom 1 / 1px transparent bottom border -> 25.2px tall.
// Original: box Aeonik Mono 16/19.2 (-> Fragment Mono), label span Inter 16/19.2.
const labelBtn = 'group flex items-center gap-[6px] rounded-sm border border-transparent bg-transparent p-0 font-mono text-[16px] leading-[19.2px] tracking-[0.32px] text-ink no-underline'
const labelSpan = 'flex font-sans text-nav-mobile mb-[1px] border-b border-transparent py-[1px] group-hover:border-b-[0.09em] group-hover:border-ink group-active:border-sky-hover'

const itemCls =
  'flex items-center gap-[8px] px-[4px] font-sans text-[16px] leading-[25.6px] font-normal text-ink no-underline hover:font-semibold hover:tracking-[0.01em]'

function Group({ id, label, open, onToggle }) {
  const listRef = useRef(null)
  const [listH, setListH] = useState(0)
  useLayoutEffect(() => {
    if (listRef.current) setListH(listRef.current.scrollHeight)
  }, [])
  return (
    <div
      className="overflow-hidden transition-[height] duration-150 ease-in-out"
      style={{ height: open ? 25.2 + GROUP_GAP + listH : COLLAPSED }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`m-${id}`}
        onClick={onToggle}
        className={labelBtn}
      >
        <span className={labelSpan}>{label}</span>
        <Chevron open={open} duration="duration-150" />
      </button>
      <ul
        id={`m-${id}`}
        ref={listRef}
        className="m-0 flex list-none flex-col gap-[24px] p-0"
        style={{ marginTop: GROUP_GAP }}
      >
        {GROUP_ITEMS[id].map((it) => (
          <li key={it.title}>
            <NavLink to={it.to} className={itemCls} tabIndex={open && it.to ? 0 : -1}>
              {it.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MobileMenu({ open, id }) {
  const [group, setGroup] = useState(null)
  return (
    <div
      id={id}
      aria-hidden={!open}
      className="absolute w-full overflow-auto bg-cream pb-[56px] pt-[32px] xl:hidden"
      style={{
        top: 'calc(var(--header-total) - 2px)',
        height: 'calc(100vh - var(--header-total) + 2px)',
        right: open ? 0 : '-100%',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: open
          ? 'right 200ms ease-in-out, opacity 500ms ease-in-out, visibility 0s linear 0s'
          : 'right 200ms ease-in-out, opacity 500ms ease-in-out, visibility 0s linear 500ms',
      }}
    >
      <div className="container relative">
      <nav aria-label="Mobile" className="flex flex-col gap-[32px] pb-[40px]">
        {DROPDOWNS.map((d) => (
          <Group
            key={d.key}
            id={d.key}
            label={d.label}
            open={group === d.key}
            onToggle={() => setGroup((g) => (g === d.key ? null : d.key))}
          />
        ))}
        {[...LINKS, { title: 'LOG IN', to: null }].map((l) => (
          <div key={l.title} className="flex">
            <div className={l.title === 'LOG IN' ? '-mb-[4px]' : ''}>
              <NavLink to={l.to} className={labelBtn}>
                <span className={labelSpan}>{l.title}</span>
              </NavLink>
            </div>
          </div>
        ))}
      </nav>
      {/* Measured: CTA sits outside the nav (after its 40px bottom padding), margin-left 1 */}
      <div className="ml-[1px] flex flex-col gap-[56px]">
        <div>
          {/* Sign-up goes to the external auth app: rendered as a button with no destination */}
          <OffsetButton variant="primary" type="button" className="!font-mono !text-[16px] !leading-[16px]">
            <span className="font-sans text-button">START FREE</span>
          </OffsetButton>
        </div>
      </div>
      </div>
    </div>
  )
}
