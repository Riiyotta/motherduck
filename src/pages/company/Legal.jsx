import { useLocation } from 'react-router-dom'
import '../../styles/company.css'
import { PrivacyPolicy, TermsOfUse, SupportPolicy } from '../../components/company/legal.jsx'

// legal key: /privacy-policy (nested TOC), /terms-of-use (numbered TOC), /support-policy (no TOC + table)
export default function Legal() {
  const path = useLocation().pathname.replace(/\/$/, '')
  if (path === '/terms-of-use') return <TermsOfUse />
  if (path === '/support-policy') return <SupportPolicy />
  return <PrivacyPolicy />
}
