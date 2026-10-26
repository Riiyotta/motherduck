// X17 GenericPage (PAGES_SPEC_EXTRA §7): /support-policy variant of F1 LegalPage for 11 routes.
import { useLocation } from 'react-router-dom'
import { GenericPage as Layout, SideForm, FormBar } from '../../components/extra/generic.jsx'
import { GENERIC } from '../../components/extra/data/marketing.js'

export default function GenericPage() {
  const path = useLocation().pathname.replace(/\/$/, '')
  const cfg = GENERIC[path] || GENERIC['/acceptable-use-policy']
  const form = cfg.form && <SideForm {...cfg.form} />
  return (
    <>
      <Layout h1={cfg.h1} path={path in GENERIC ? path : '/acceptable-use-policy'} seed={cfg.seed} sideForm={form} />
      {cfg.form && <FormBar label={cfg.form.bar} />}
    </>
  )
}
