// F2 SearchFilterPanel + Select dropdown + search field (shared by Blog, Events, Quack; search also on Videos/Ecosystem).
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TextInput, UnderlineLink } from '../ui'
import { Chevron } from './bits.jsx'
import { useDebounced, useMedia, useOutside } from './hooks.js'

/* URL-bound search field: filters on input (250ms debounce), writes `param`. */
export function SearchField({ value, onCommit, label = 'Search', className = '' }) {
  const [v, setV] = useState(value || '')
  const d = useDebounced(v, 250)
  const first = useRef(true)
  useEffect(() => { setV(value || '') }, [value])
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if ((d || '') !== (value || '')) onCommit(d)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d])
  return (
    <TextInput variant="hide" icon="search" label={label} value={v} onChange={(e) => setV(e.target.value)} className={className} />
  )
}

/* F2 select: 58 box, menu-drop menu, chevron rotates 180 (200ms). */
export function Select({ label, value, options, onChange, menuClassName = 'max-h-[300px]' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutside(ref, () => setOpen(false), open)
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[58px] w-full items-center justify-between gap-[8px] rounded-none border-[1.5px] border-ink bg-select-bg px-[20px] py-[15px] text-left md:border-2"
      >
        <span className={`block max-w-[calc(100%-28px)] overflow-hidden text-ellipsis whitespace-nowrap font-sans text-select-label ${value ? '!font-normal text-ink' : 'text-gray-600'}`}>
          {value || label}
        </span>
        <Chevron open={open} />
      </button>
      {open && (
        <ul role="listbox" className={`absolute left-[-2px] top-full z-[3] m-0 flex w-[calc(100%+4px)] list-none flex-col gap-[16px] overflow-auto border-2 border-ink bg-white p-[24px] animate-menu-drop ${menuClassName}`}>
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button
                type="button"
                onClick={() => { onChange(o); setOpen(false) }}
                className="block min-h-[18px] w-full overflow-hidden text-ellipsis whitespace-nowrap border-0 bg-transparent p-0 text-left font-sans text-select-option text-ink hover:font-bold"
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ClearAll({ active, onClick }) {
  return (
    <UnderlineLink onClick={onClick} tone="muted" icon="reset" className={`hover:bg-surface-2 ${active ? '!text-ink' : ''}`}>
      CLEAR ALL
    </UnderlineLink>
  )
}

/* gridClassName: the field grid template per page (F2). `children` are the fields. */
export function SearchFilterPanel({ gridClassName, active, onClear, children }) {
  const md = useMedia('(min-width: 728px)')
  const [open, setOpen] = useState(false)
  const [h, setH] = useState(0)
  const inner = useRef(null)
  useLayoutEffect(() => {
    if (!inner.current) return undefined
    const ro = new ResizeObserver(() => setH(inner.current.scrollHeight))
    ro.observe(inner.current)
    return () => ro.disconnect()
  }, [])
  return (
    <div className="bg-filter-bg">
      <div className="hidden items-center justify-between p-[16px] md:flex xl:px-[20px]">
        <p className="m-0 font-sans text-ink text-filter-title-lg xl:text-filter-title">Search and filter</p>
        <ClearAll active={active} onClick={onClear} />
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center border-0 bg-transparent px-[12px] py-[16px] text-left md:hidden"
      >
        <span className="font-sans text-ink text-filter-title-lg">Search and filter</span>
        <Chevron open={open} className="mx-[8px]" />
      </button>
      <div
        className="ct-collapse md:!max-h-none md:!overflow-visible"
        style={md ? undefined : { maxHeight: open ? h : 0, overflow: open ? 'visible' : 'hidden' }}
      >
        <div ref={inner}>
          <div className={`grid grid-cols-1 gap-[16px] px-[12px] md:px-[16px] md:pb-[12px] xl:px-[20px] xl:pb-[16px] ${gridClassName}`}>
            {children}
          </div>
          <div className="flex justify-end px-[12px] pb-[20px] pt-[16px] md:hidden">
            <ClearAll active={active} onClick={onClear} />
          </div>
        </div>
      </div>
    </div>
  )
}
