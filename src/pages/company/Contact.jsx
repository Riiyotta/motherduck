import { useLocation } from 'react-router-dom'
import '../../styles/company.css'
import { ContactChooser, ContactSplitForm, SupportHero, SupportBody } from '../../components/company/contact.jsx'

// contact key: /contact-us (C1), /contact-us/product-expert (D1), /customer-support (A1 support + E1 + E2)
export default function Contact() {
  const path = useLocation().pathname.replace(/\/$/, '')
  if (path === '/contact-us/product-expert') return <ContactSplitForm />
  if (path === '/customer-support') {
    return (
      <>
        <SupportHero />
        <SupportBody />
      </>
    )
  }
  return <ContactChooser />
}
