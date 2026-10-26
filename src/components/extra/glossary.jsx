// X1 glossary index blocks (hero, sticky search/letter bar, letter sections, no-results) and the term card
// shared with X2 (related terms). PAGES_SPEC_EXTRA §5 X1 / X2.
import { Link } from 'react-router-dom'
import '../../styles/extra-content.css'

export const LETTERS = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
export const letterId = (L) => `g-${L === '#' ? 'num' : L}`

/* Term card (white, 1px sand-dark; hover border ink + translateY(-2); arrow fades in and slides 3px). */
export function TermCard({ t }) {
  return (
    <Link to={`/glossary/${t.slug}`} className="xc-term-card">
      <span className="flex items-center gap-[7px]">
        <span className="xc-term-title">{t.term}</span>
        <span className="xc-term-arrow" aria-hidden="true">→</span>
      </span>
      <p className="xc-term-def">{t.summary}</p>
    </Link>
  )
}

export function GlossaryHero({ total, lede }) {
  return (
    <div className="border-b border-ink pb-[36px] pt-[64px] xl:pt-[80px]">
      <div className="xc-gloss-wrap">
        <h1 className="xc-mono xc-gloss-h1 m-0 text-ink">Data Engineering Glossary</h1>
        <p className="xc-gloss-lede m-0 mt-[20px] max-w-[681.9px]">
          {lede[0]} <b>{total} terms</b> {lede[1]}
        </p>
      </div>
    </div>
  )
}

function SearchGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2 text-ink">
      <circle cx="7.75" cy="7.75" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m11.75 11.75 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export function GlossaryBar({ barRef, query, onQuery, shown, total, active }) {
  const filtering = query.trim().length > 0
  return (
    <div ref={barRef} className="xc-gloss-bar border-b border-ink bg-cream py-[16px]">
      <div className="xc-gloss-wrap flex flex-col gap-[14px]">
        <div className="flex flex-wrap items-center gap-[14px]">
          <label className="relative min-w-[240px] flex-1 text-[14px] leading-[19.6px] md:text-[16px] md:leading-[25.6px]">
            <span className="sr-only">Search terms</span>
            <SearchGlyph />
            <input type="search" value={query} onChange={(e) => onQuery(e.target.value)}
              placeholder="Search terms & definitions…" className="xc-gloss-input" autoComplete="off" />
          </label>
          <span className="xc-gloss-count" aria-live="polite">
            {filtering ? <>Showing <b>{shown}</b> of {total}</> : <><b>{total}</b> terms</>}
          </span>
        </div>
        <nav aria-label="Glossary letters" className="flex flex-wrap gap-[3px]">
          {LETTERS.map((L) => (
            <a key={L} href={`#${letterId(L)}`} className="xc-gloss-letter" data-dim={active.has(L) ? undefined : ''}>{L}</a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function LetterSection({ letter, terms }) {
  return (
    <section id={letterId(letter)} className="xc-gloss-section">
      <div className="mb-[18px] flex items-baseline gap-[14px] border-b border-sand-dark pb-[10px]">
        <span className="font-mono text-[27.2px] font-semibold uppercase leading-[27.2px] text-ink">{letter}</span>
        <span className="font-mono text-[12px] leading-[12px] tracking-[0.72px] text-gray-500">{terms.length} terms</span>
      </div>
      <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-3">
        {terms.map((t) => <TermCard key={t.slug} t={t} />)}
      </div>
    </section>
  )
}

export function NoTerms() {
  return (
    <div className="py-[80px] text-center">
      <p className="m-0 font-mono text-[17.6px] font-light uppercase leading-[24.64px] text-ink">No terms match your search</p>
      <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] text-gray-500">Try a shorter or different keyword.</p>
    </div>
  )
}

/* X2 related terms: H2 Mono 18/25.2, 6 cards, 3 x 324 (XL) / 2 (LG) / 1 column. */
export function RelatedTerms({ terms }) {
  return (
    <section className="mt-[56px]">
      <h2 className="m-0 pb-[16px] font-mono text-[18px] font-normal uppercase leading-[25.2px] text-ink">Related terms</h2>
      <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-2 xl:grid-cols-3">
        {terms.map((t) => <TermCard key={t.slug} t={t} />)}
      </div>
    </section>
  )
}

/* X2 promo card in the term body (aside): white, 1px ink, padding 18/20, flex gap 16; 44px orange icon tile; text column
   max 485; eyebrow Inter 16/25.6 300 uppercase orange; H3 Fono 18/23.4; grey text; orange CTA (hover lifts -1,-1 with a
   2px ink offset shadow, 0.1s). Margin 32 0 (collapses with the following H2's 40). */
export function TermPromo({ p }) {
  return (
    <aside className="xc-promo">
      <span className="xc-promo-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M7 3.5h7.5L18 7v13.5H7z" /><path d="M14.5 3.5V7H18M9.5 11.5h6M9.5 15h6" />
        </svg>
      </span>
      <div className="xc-promo-body">
        <p className="xc-promo-eye">{p.eyebrow}</p>
        <h3 className="xc-promo-title">{p.title}</h3>
        <p className="xc-promo-text">{p.text}</p>
        <Link to={p.href} className="xc-promo-cta">{p.cta} <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
  )
}

export function BackToGlossary() {
  return (
    <Link to="/glossary" className="block w-fit pt-[40px] font-sans text-[14px] leading-[19.6px] text-sky-dark no-underline hover:underline xl:pt-[64px]">
      ← Back to Glossary
    </Link>
  )
}
