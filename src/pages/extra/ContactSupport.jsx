// X16 /contact-us/support (PAGES_SPEC_EXTRA §6): the D1 ContactSplitForm layout with support values, composed here
// from the shared primitives (contact.jsx is read-only for this chunk).
import { useState } from 'react'
import '../../styles/company.css'
import { Container, OffsetButton, Placeholder, TextInput, UnderlineLink } from '../../components/ui'
import { Doodle } from '../../components/company/bits.jsx'
import { isEmail } from '../../components/company/forms.js'
import { words } from '../../components/extra/generic.jsx'

function SupportForm() {
  const [v, setV] = useState({ firstname: '', lastname: '', email: '', company: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (err[k]) setErr((s) => ({ ...s, [k]: undefined }))
  }
  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!v.email.trim()) next.email = 'Please enter your e-mail'
    else if (!isEmail(v.email)) next.email = 'Email seems invalid'
    if (!v.message.trim()) next.message = 'Please leave us a message'
    setErr(next)
    if (!Object.keys(next).length) setSent(true)
  }
  const box = 'border-2 border-ink bg-surface-2 px-[24px] pb-[24px] pt-[64px] md:pt-[85px] xl:px-[52px] xl:pb-[52px] xl:pt-[132px]'
  if (sent) {
    return (
      <div role="status" className={`flex min-h-[560px] flex-col items-center justify-center gap-[16px] text-center ${box}`}>
        <p className="m-0 font-mono text-[24px] uppercase leading-[33.6px]">Thanks!</p>
        <p className="m-0 font-sans text-[16px] font-light leading-[25.6px]">Your message was received in this preview. Nothing was sent.</p>
      </div>
    )
  }
  return (
    <form noValidate onSubmit={submit} className={`flex flex-col gap-[36px] lg:gap-[40px] ${box}`}>
      <div className="flex flex-col gap-[36px] lg:flex-row lg:gap-[24px]">
        <TextInput label="First Name" name="firstname" value={v.firstname} onChange={set('firstname')} className="lg:flex-1" />
        <TextInput label="Last Name" name="lastname" value={v.lastname} onChange={set('lastname')} className="lg:flex-1" />
      </div>
      <TextInput label="E-mail" name="email" type="email" value={v.email} onChange={set('email')} error={err.email} errorFloat valid={isEmail(v.email)}
        onBlur={() => { if (v.email.trim() && !isEmail(v.email)) setErr((s) => ({ ...s, email: 'Email seems invalid' })) }} />
      <TextInput label="Company" name="company" value={v.company} onChange={set('company')} />
      <div>
        <TextInput label="Leave us a message." name="message" multiline value={v.message} onChange={set('message')} error={err.message} errorFloat className="pb-[2px]" />
        <p className="m-0 pt-[32px] font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] text-gray-500">This site is protected by reCAPTCHA.</p>
        <div className="mt-[16px]">
          <OffsetButton size="lg" type="submit">Submit</OffsetButton>
        </div>
      </div>
    </form>
  )
}

const LINK = '!font-light'

export default function ContactSupport() {
  return (
    <div className="overflow-x-clip">
      <section className="sand-grid border-b-2 border-ink">
        <Container className="pt-[56px] md:pt-[20px] xl:pt-[70px]">
          <div className="mb-[290px] flex min-h-[130.4px] w-full flex-col bg-sand md:mb-[52px] md:mt-[72px] md:min-h-0 md:w-fit md:max-w-[209px] xl:mt-[64px] xl:max-w-none">
            <h1 className="m-0 font-mono text-compact-h1-24 font-normal uppercase md:text-compact-h1-48t xl:text-compact-h1">Contact Support</h1>
          </div>
        </Container>
      </section>
      <Container className="relative isolate mb-[120px] flex flex-col gap-[40px] md:flex-row-reverse md:gap-[44px] xl:mb-[160px] xl:gap-[100px]">
        <Doodle kind="blob" size={280} className="absolute left-[625px] top-[424px] -z-[1] hidden rotate-[30deg] xl:block" />
        <Doodle kind="cloud" size={288} className="absolute right-[-60px] top-[-13px] -z-[1] hidden rotate-[25deg] xl:block" />
        <Doodle kind="blob" size={208} className="absolute right-[-60px] top-[490px] -z-[1] hidden rotate-[30deg] md:block xl:hidden" />
        {/* the original column extends 17.7 (MD) / 49.3 (LG) below the form (in-flow rotated doodle); kept as padding */}
        <div className="relative w-full max-w-[400px] shrink-0 -mt-[163px] md:-mt-[160px] md:w-[300px] md:max-w-none md:pb-[17.7px] lg:w-[420px] lg:pb-[49.3px] xl:-mt-[125px] xl:w-[549px] xl:pb-0">
          <Placeholder label="Support illustration" className="!absolute left-1/2 top-[-80px] z-[1] h-[150px] w-[171px] -translate-x-1/2 xl:top-[-105px] xl:h-[218px] xl:w-[249px]" />
          <SupportForm />
        </div>
        <section className="w-full md:w-[344px] md:pt-[40px] lg:w-[456px] xl:w-[593px] xl:pt-[60px]">
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <h2 className="m-0 font-mono text-[18px] font-normal uppercase leading-[25.2px] xl:text-[24px] xl:leading-[33.6px]">Need a hand? Our team is ready to help</h2>
              {/* the original serves a shorter paragraph below 728 */}
              {/* >=728 the original paragraph is three pre-line blocks separated by blank lines */}
              <p className="m-0 hidden whitespace-pre-line font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] md:block xl:text-[20px] xl:leading-[28px] xl:tracking-[0.4px]">
                {`${words(102, 4101)}\n\n${words(110, 4102)}\n\n${words(71, 4103)}`}
              </p>
              <p className="m-0 font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] md:hidden">{words(200, 4100)}</p>
            </div>
            <div className="flex flex-col gap-[24px]">
              <UnderlineLink to="/customer-support" uppercase labelClassName={LINK}>Support Overview</UnderlineLink>
              <UnderlineLink to="/support-policy" uppercase labelClassName={LINK}>Support Policy</UnderlineLink>
              {/* status page is external -> non-link */}
              <UnderlineLink uppercase icon="external" labelClassName={LINK}>Status Page</UnderlineLink>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
