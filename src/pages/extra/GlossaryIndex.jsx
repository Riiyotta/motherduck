// X1 /glossary: hero -> sticky search / letter bar -> letter sections (all terms, no paging, no reveal).
// Search filters client-side over term + definition without touching the URL. The bar sticks below the fixed
// header (top: var(--header-total)), a deliberate deviation from the original's top:0 (hidden under the header).
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { GlossaryHero, GlossaryBar, LetterSection, NoTerms, LETTERS } from '../../components/extra/glossary.jsx'
import { glossaryTerms, GLOSSARY_LEDE } from '../../components/extra/data/content.js'

export default function GlossaryIndex() {
  const all = glossaryTerms()
  const [query, setQuery] = useState('')
  const barRef = useRef(null)
  const [barH, setBarH] = useState(null)
  useLayoutEffect(() => {
    const el = barRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(() => setBarH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const q = query.trim().toLowerCase()
  const shown = useMemo(() => (q ? all.filter((t) => t.term.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)) : all), [all, q])
  const groups = useMemo(() => LETTERS.map((L) => [L, shown.filter((t) => t.letter === L)]).filter(([, ts]) => ts.length), [shown])
  const active = useMemo(() => new Set(groups.map(([L]) => L)), [groups])
  return (
    <div style={barH ? { '--xc-bar-h': `${barH}px` } : undefined}>
      <GlossaryHero total={all.length} lede={GLOSSARY_LEDE} />
      <GlossaryBar barRef={barRef} query={query} onQuery={setQuery} shown={shown.length} total={all.length} active={active} />
      <div className="pb-[48px] pt-[8px]">
        <div className="xc-gloss-wrap">
          {groups.length ? groups.map(([L, ts]) => <LetterSection key={L} letter={L} terms={ts} />) : <NoTerms />}
        </div>
      </div>
    </div>
  )
}
