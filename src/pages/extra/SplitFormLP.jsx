// X19 split-form LP (PAGES_SPEC_EXTRA §7): /together-ai, /duckdb-book-form, /sql-duckdb-book-form.
import { useLocation } from 'react-router-dom'
import { SplitFormPage } from '../../components/extra/splitForm.jsx'
import { words } from '../../components/extra/generic.jsx'
import { SPLIT } from '../../components/extra/data/marketing.js'

// measured-length placeholder prose -> ArticleProse blocks
const toBlocks = (prose) => prose.map((b) => (b.type === 'p'
  ? { type: 'p', inl: [words(b.len, b.seed)] }
  : { type: 'ul', items: b.lens.map((n, i) => ({ inl: [words(n, b.seed + i)] })) }))

export default function SplitFormLP() {
  const path = useLocation().pathname.replace(/\/$/, '')
  const cfg = SPLIT[path] || SPLIT['/duckdb-book-form']
  return <SplitFormPage cfg={{ ...cfg, lede: words(cfg.lede[0], cfg.lede[1]), prose: toBlocks(cfg.prose) }} />
}
