// X18 legal with TOC (PAGES_SPEC_EXTRA §7): /terms-of-service, /candidate-privacy.
import { useLocation } from 'react-router-dom'
import '../../styles/company.css'
import { LegalTocShell, ShapeProse } from '../../components/extra/generic.jsx'
import { LEGAL_TOC, SHAPES } from '../../components/extra/data/marketing.js'

export default function LegalToc() {
  const path = useLocation().pathname.replace(/\/$/, '')
  const key = path in LEGAL_TOC ? path : '/terms-of-service'
  const cfg = LEGAL_TOC[key]
  return (
    <LegalTocShell title={cfg.h1} subtitle={cfg.subtitle} toc={SHAPES[key].toc}>
      <ShapeProse path={key} seed={cfg.seed} />
    </LegalTocShell>
  )
}
