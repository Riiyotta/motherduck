import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, LiftCard, OffsetButton, Placeholder, TextInput, UnderlineLink } from '../ui'
import { Doodle } from './bits.jsx'
import { filler, heading } from './copy.js'
import { isEmail } from './forms.js'

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })

const ArrowDown36 = ({ className = '' }) => (
  <svg width="36" height="36" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
    <path d="M10 4v11M5.5 10.5 10 15 14.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
)
const ICONS = {
  headset: <path d="M7 21v-5a11 11 0 0 1 22 0v5M7 19h4v8H7zM25 19h4v8h-4zM29 27c0 3-3 4-7 4" />,
  wrench: <path d="M23 7a6 6 0 0 0-6 8L7 25l4 4 10-10a6 6 0 0 0 8-6l-4 3-3-1-1-3Z" />,
}

// C1 ContactChooser. Cards: XL row (pad 22/30, gap 30, icon 36); LG row (pad 22/24/22/32, gap 32, icon 32);
// MD/SM column (pad 24, gap 12, icon 32). Heights are content-driven (100.4 / 120 / 157.6).
export function ContactChooser() {
  const cards = [
    { icon: 'headset', title: 'Sales questions', sub: 'Questions about plans, pricing or fit for your team', to: '/contact-us/product-expert' },
    { icon: 'wrench', title: 'Product support', sub: 'Help with an existing account, a bug or a question on usage' }, // /contact-us/support: out of scope
  ]
  return (
    <section className="relative isolate overflow-x-clip">
      <Doodle kind="cloud" size={160} className="absolute left-[3%] top-[120px] -z-[1] hidden lg:block" />
      <Doodle kind="diamond" size={60} className="absolute right-[6%] top-[320px] -z-[1] hidden lg:block" />
      <Container className="pb-[160px] pt-[40px] md:pb-[200px] md:pt-[64px] lg:pb-[220px] lg:pt-[100px]">
        <div className="flex flex-col items-center gap-[20px] pb-[64px] text-center lg:pb-[80px]">
          <h1 className="m-0 font-mono text-compact-h1-24 font-normal uppercase md:text-compact-h1-48 lg:text-compact-h1">Talk with us</h1>
          <p className="m-0 font-sans text-[16px] font-light leading-[25.6px] tracking-[0.16px] lg:text-[20px] lg:leading-[32px] lg:tracking-[0.2px]">
            {filler(60, 81)}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-[334px_334px] lg:grid-cols-[444px_444px] lg:gap-[32px] xl:grid-cols-[605px_605px]">
          {cards.map((c) => (
            <LiftCard
              key={c.title}
              lift={14}
              hoverFrom="always"
              innerAs={c.to ? Link : 'div'}
              {...(c.to ? { to: c.to } : {})}
              className="flex flex-col items-start gap-[12px] border-2 border-ink bg-white p-[24px] text-ink no-underline lg:flex-row lg:items-center lg:gap-[32px] lg:py-[22px] lg:pl-[32px] lg:pr-[24px] xl:gap-[30px] xl:px-[30px]"
            >
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-[32px] w-[32px] shrink-0 xl:h-[36px] xl:w-[36px]">
                {ICONS[c.icon]}
              </svg>
              <span className="flex w-full flex-1 items-center justify-between gap-[12px]">
                <span className="flex flex-col">
                  <span className="mb-[4px] font-sans text-[20px] font-light leading-[24px] tracking-[0.4px] lg:text-[24px] lg:leading-[28.8px] lg:tracking-[0.48px]">{c.title}</span>
                  <span className="font-sans text-[12px] font-light leading-[16.8px] tracking-[0.24px] opacity-70 lg:text-[14px] lg:leading-[19.6px] lg:tracking-[0.28px]">{c.sub}</span>
                </span>
                <ArrowDown36 className="-rotate-90" />
              </span>
            </LiftCard>
          ))}
        </div>
        <p className="m-0 mt-[20px] font-sans text-[12px] font-light leading-[16.8px] tracking-[0.24px] xl:mt-[32px] xl:text-[14px] xl:leading-[19.6px] xl:tracking-[0.28px]">
          For other questions and requests, write to <span className="underline">hello@example-mail.com</span>
        </p>
      </Container>
    </section>
  )
}

const BULLETS = [[160, 'Fast setup.', 93], [217, 'Clear guidance.', 96], [183, 'Room to grow.', 97]]
// Partner logo boxes [w, h]: below XL / XL (measured)
const LOGO_SIZES = [
  [[45.5, 19], [67.1, 28]], [[63.5, 23], [91.2, 33]], [[57.8, 23], [65.3, 26]], [[67.6, 26], [88.4, 34]], [[75.2, 22], [92.3, 27]],
  [[100, 17], [117.7, 20]], [[103.4, 23], [116.9, 26]], [[81.2, 27], [102.3, 34]], [[87.5, 24], [109.4, 30]],
]

function ExpertForm() {
  const [v, setV] = useState({ firstname: '', lastname: '', email: '', company: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (err[k]) setErr((s) => ({ ...s, [k]: undefined }))
  }
  // Original: an empty e-mail is never flagged (empty submit does nothing); a malformed one is flagged on blur and on
  // submit; typing clears the message. The message floats under the field (form height unchanged).
  const badEmail = (s) => s.trim() !== '' && !isEmail(s)
  const checkEmail = () => { if (badEmail(v.email)) setErr((s) => ({ ...s, email: 'Email seems invalid' })) }
  const submit = (e) => {
    e.preventDefault()
    if (badEmail(v.email)) { setErr({ email: 'Email seems invalid' }); return }
    if (!v.email.trim()) return
    setSent(true)
  }
  if (sent) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-[16px] border-2 border-ink bg-surface-2 px-[24px] py-[80px] text-center md:px-[52px]">
        <p className="m-0 font-mono text-[24px] uppercase leading-[33.6px]">Thanks!</p>
        <p className="m-0 font-sans text-[16px] font-light leading-[25.6px]">Your message was received in this preview. Nothing was sent.</p>
      </div>
    )
  }
  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-[36px] border-2 border-ink bg-surface-2 px-[24px] pb-[24px] pt-[64px] lg:gap-[40px] xl:px-[52px] xl:pb-[52px] xl:pt-[80px]">
      <div className="flex flex-col gap-[36px] lg:flex-row lg:gap-[24px]">
        <TextInput label="First Name" name="firstname" value={v.firstname} onChange={set('firstname')} className="lg:flex-1" />
        <TextInput label="Last Name" name="lastname" value={v.lastname} onChange={set('lastname')} className="lg:flex-1" />
      </div>
      <TextInput label="E-mail" name="email" type="email" value={v.email} onChange={set('email')} onBlur={checkEmail} error={err.email} errorFloat valid={isEmail(v.email)} />
      <TextInput label="Company" name="company" value={v.company} onChange={set('company')} />
      {/* textarea, fine print and submit are one flex item on the original (no 40px gaps between them) */}
      <div>
        <TextInput label="How can we help?" name="message" multiline value={v.message} onChange={set('message')} className="pb-[2px]" />
        <p className="m-0 pt-[32px] font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] text-gray-500">This site is protected by reCAPTCHA.</p>
        <div className="mt-[16px]">
          <OffsetButton size="lg" type="submit">Submit</OffsetButton>
        </div>
      </div>
    </form>
  )
}

// D1 ContactSplitForm. Hero 343.2 / 322.8 / 322.8 / 288.4; the form column is pulled up into it
// (-132 / -220 / -220 / -170) with the illustration sitting on the form's top edge.
export function ContactSplitForm() {
  return (
    <>
      <section className="sand-grid border-b-2 border-ink">
        <Container className="pt-[56px] md:pt-[20px] xl:pt-[40px]">
          <h1 className="m-0 mb-[218px] w-full max-w-[404px] bg-sand font-mono text-compact-h1-24 font-normal uppercase md:mb-[56px] md:mt-[72px] md:max-w-[340px] md:text-compact-h1-48t xl:mb-[48px] xl:mt-[64px] xl:max-w-[595px] xl:text-compact-h1">
            {heading(27, 91)}
          </h1>
        </Container>
      </section>
      <Container className="mb-[160px] flex flex-col md:mb-[200px] md:flex-row-reverse md:justify-between md:gap-[44px] xl:gap-[110px]">
        <div className="relative -mt-[132px] mb-[40px] w-full max-w-[400px] shrink-0 md:-mt-[220px] md:mb-0 md:w-[300px] md:max-w-none lg:w-[420px] xl:-mt-[170px] xl:w-[549px]">
          <Placeholder label="Form illustration" className="!absolute left-[71px] top-[-68px] z-[1] h-[91px] w-[204px] md:left-[45px] lg:left-[100px] lg:top-[-75px] lg:h-[100px] lg:w-[230px] xl:left-[155px] xl:top-[-90px] xl:h-[121px] xl:w-[272px]" />
          <ExpertForm />
        </div>
        <div className="w-full md:w-[344px] lg:w-[456px] xl:w-[583px]">
          <div className="mb-[32px] md:pt-[40px] xl:mb-[52px] xl:pt-[60px]">
            <p className="m-0 pb-[32px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] xl:pb-[52px] xl:text-[20px] xl:leading-[28px] xl:tracking-[0.4px]">{filler(267, 92)}</p>
            <h3 className="m-0 pb-[16px] font-mono text-[16px] font-normal uppercase leading-[22.4px] xl:text-[18px] xl:leading-[25.2px]">What you can expect from working with us</h3>
            <ul className="m-0 list-none p-0">
              {BULLETS.map(([ch, lead, seed], i) => (
                <li key={i} className="mb-[16px] flex items-start gap-[16px]">
                  <span className="flex h-[14px] w-[20px] shrink-0 items-center justify-center rounded-[50%] border-2 border-ink bg-sun px-[3px]" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5 4 7.5 8.5 2.5" stroke="#383838" strokeWidth="1.5" /></svg>
                  </span>
                  <p className="m-0 font-sans text-[14px] font-light leading-[19.6px] tracking-[0.28px] xl:text-[16px] xl:leading-[22.4px] xl:tracking-[0.32px]">
                    <span className="font-bold">{lead}</span> {filler(ch - lead.length - 1, seed)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <h3 className="m-0 pb-[32px] font-mono text-[16px] font-normal uppercase leading-[22.4px] xl:text-[18px] xl:leading-[25.2px]">Teams of every size work with us already</h3>
          <div className="flex flex-wrap items-center gap-[24px] bg-cream xl:gap-[32px]">
            {LOGO_SIZES.map(([s, x], i) => (
              <div key={i} style={{ '--w': `${s[0]}px`, '--h': `${s[1]}px`, '--wx': `${x[0]}px`, '--hx': `${x[1]}px` }}>
                <Placeholder label={`Partner logo ${i + 1}`} className="h-[var(--h)] w-[var(--w)] xl:h-[var(--hx)] xl:w-[var(--wx)]" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

// A1 variant 'support'. Illustration 154 / 224 / 240 / 354 square, absolute at the measured offsets.
export function SupportHero() {
  return (
    <section className="relative isolate overflow-x-clip pb-[180px] pt-[40px] md:pb-[190px] md:pt-[64px] lg:pb-[136px] lg:pt-[84px] xl:pb-[170px] xl:pt-[101px]">
      <Container className="relative">
        <div className="relative z-[1] flex max-w-[415px] flex-col gap-[24px] md:max-w-none md:gap-[20px] lg:max-w-[590px] xl:max-w-[674px]">
          <h1 className="m-0 font-mono text-compact-h1-24 font-normal uppercase md:text-compact-h1-48 xl:text-compact-h1">{heading(47, SUPPORT_H1_SEED)}</h1>
          <UnderlineLink icon="down" onClick={() => scrollToId('support-cards')}>LEARN MORE</UnderlineLink>
        </div>
      </Container>
      <div className="absolute left-[212px] top-[136px] h-[154px] w-[154px] md:left-[510px] md:top-[213px] md:h-[224px] md:w-[224px] lg:left-[calc(50%+160px)] lg:top-[92px] lg:h-[240px] lg:w-[240px] xl:left-[calc(50%+216px)] xl:top-[44px] xl:h-[354px] xl:w-[354px]">
        <Placeholder variant="shape" label="Support illustration" className="h-full w-full" />
      </div>
    </section>
  )
}

const SUPPORT_H1_SEED = 102
const SUPPORT_CARDS = [
  { title: 'Getting started', ch: 131, seed: 146, cta: 'Talk with a product expert', to: '/contact-us/support' }, // original card href: /contact-us/support/
  { title: 'Community help', ch: 159, seed: 225, cta: 'Ask a question in Slack' },
  { title: 'Feature ideas', ch: 159, seed: 600, cta: 'Share your ideas' },
]

// E1 SupportCards + E2 YellowCalloutCard + status link, all items of one grid (gap 32 / 24).
// LG: grid narrows to 740 (2 x 354), third card and callout span both columns.
export function SupportBody() {
  return (
    <section id="support-cards" className="pb-[100px] pt-[20px] md:pt-0 lg:pb-[120px] xl:pb-[140px]">
      <Container>
        <h2 className="m-0 font-mono text-page-h2-sm font-normal uppercase lg:text-page-h2">How we help</h2>
        <p className="m-0 py-[32px] font-sans text-[16px] font-normal leading-[25.6px] lg:pb-[40px] lg:pt-[20px] lg:text-[20px] lg:font-light lg:leading-[32px] xl:pb-[52px]">
          {filler(PHILO[0], PHILO[1])} Read our <Link to="/support-policy" className="text-ink underline">support policy</Link> for details.
        </p>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-[332px_332px] lg:mx-auto lg:max-w-[740px] lg:grid-cols-[354px_354px] lg:gap-[32px] xl:max-w-none xl:grid-cols-3">
          {SUPPORT_CARDS.map((c, i) => (
            <LiftCard
              key={c.title}
              lift={14}
              hoverFrom="lg"
              wrapperClassName={i === 2 ? 'md:col-span-2 xl:col-span-1' : ''}
              innerAs={c.to ? Link : 'div'}
              {...(c.to ? { to: c.to } : {})}
              className="flex h-full flex-col gap-[16px] border-2 border-ink bg-white p-[24px] text-ink no-underline lg:px-[32px] lg:pb-[40px] lg:pt-[32px]"
            >
              <Placeholder variant="shape" label={`${c.title} illustration`} className="h-[100px] w-[100px] md:h-[130px] md:w-[130px] lg:h-[140px] lg:w-[140px]" />
              <h3 className="m-0 font-mono text-[18px] font-normal uppercase leading-[25.2px] lg:text-[24px] lg:leading-[33.6px]">{c.title}</h3>
              <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] lg:text-legal-body">{filler(c.ch, c.seed)}</p>
              <div className="mt-auto pt-[16px]">
                <UnderlineLink uppercase>{c.cta}</UnderlineLink>
              </div>
            </LiftCard>
          ))}
          {/* E2: full-container link to /contact-us/support */}
          <Link to="/contact-us/support" className="relative grid grid-cols-1 gap-[40px] overflow-hidden border-2 border-ink bg-sun text-ink no-underline p-[24px] md:col-span-2 md:grid-cols-[164.8px_407.2px] md:gap-[64px] lg:grid-cols-[184px_424px] lg:p-[32px] xl:col-span-3 xl:grid-cols-[201.6px_812.4px] xl:px-[80px] xl:py-[36px]">
            <Doodle kind="star" size={48} className="absolute right-[24px] top-[20px]" />
            <Placeholder label="Callout illustration" className="h-[188px] w-full lg:h-[210px] xl:h-[230px]" />
            <div className="flex flex-col justify-center gap-[16px]">
              <h3 className="m-0 font-mono text-[24px] font-normal uppercase leading-[33.6px] xl:text-[32px] xl:leading-[44.8px]">{heading(35, CALLOUT[0])}</h3>
              <p className="m-0 font-mono text-[16px] font-light uppercase leading-[22.4px] tracking-[0.32px] xl:text-[18px] xl:leading-[25.2px] xl:tracking-normal">
                {filler(CALLOUT[1], CALLOUT[2])} <span className="underline">Reach out</span>.
              </p>
            </div>
          </Link>
          <div className="md:col-span-2 xl:col-span-3">
            <UnderlineLink icon="external">SERVICE STATUS</UnderlineLink>
          </div>
        </div>
      </Container>
    </section>
  )
}

// [chars, seed] tuned so wraps match the original at 1440 / 1280 / 768 / 390
const PHILO = [160, 235]
const CALLOUT = [121, 110, 387]
