// B1 blog TOC and V5 video TOC list. Scroll-spy sets weight 600 (no colour change); click jumps instantly
// to the heading (scroll-margin-top from the prose styles), with no hash change.
import { useScrollSpy, jumpTo } from './hooks.js'

export function TocList({ items, variant = 'blog', className = '', style, onPick }) {
  const ids = items.map((h) => h.id)
  const active = useScrollSpy(ids)
  const link = variant === 'blog'
    ? 'text-toc-link-sm xl:text-toc-link-blog'
    : 'text-toc-link-sm lg:text-toc-link'
  return (
    <ul className={`m-0 flex list-none flex-col overflow-auto p-0 ${className}`} style={style}>
      {items.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => { e.preventDefault(); jumpTo(h.id); onPick?.() }}
            className={`block font-sans text-ink no-underline ${link} ${active === h.id ? '!font-semibold' : ''}`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

/* B1 blog sidebar TOC (>=728). */
export function BlogToc({ items }) {
  return (
    <div className="hidden flex-col gap-[16px] md:flex">
      <p className="m-0 font-fono uppercase text-ink text-toc-title-fono-lg xl:text-toc-title-fono">Table of contents</p>
      <aside className="rounded-sm border-2 border-ink bg-white">
        <TocList
          items={items}
          className="ct-toc-list min-h-[78px] gap-[8px] px-[16px] py-[12px] lg:gap-[10px]"
        />
      </aside>
    </div>
  )
}
