// X14 /product/azure (PAGES_SPEC_EXTRA §6): SQL-IDE waitlist form (inline inputs, Execute / Cmd+Enter validates
// locally, no network), "what's coming" cards, region vote card, 3-step strip, contained FAQ, ink closing band.
import { useEffect, useRef, useState } from 'react'
import { Accordion, Checkbox, Container, OffsetButton, Placeholder, TextInput, UnderlineLink } from '../ui'
import { isEmail } from '../company/forms.js'
import { words } from './generic.jsx'
import '../../styles/extra-marketing.css'

const H2 = 'm-0 font-mono text-[32px] font-normal uppercase leading-[35.2px] md:text-[44px] md:leading-[48.4px] lg:text-[56px] lg:leading-[61.6px]'
const BODY = 'm-0 font-sans text-[16px] font-light leading-[24px] tracking-[0.32px]'

// ---------- IDE pieces ----------
const MENU = ['File', 'Edit', 'View', 'Query', 'Tools', 'Window', 'Help']
const FIELDS = [
  { name: 'firstname', ph: 'Dana', req: true },
  { name: 'lastname', ph: 'Scully', req: true },
  { name: 'email', ph: 'dana@contoso.com', req: true, email: true },
  { name: 'company', ph: 'Contoso', req: false },
  { name: 'azure_region', ph: 'westeurope', req: true },
]
const COLUMNS = ['first_name (varchar, not null)', 'last_name (varchar, not null)', 'email (varchar, not null)', 'company (varchar, null)', 'region (varchar, not null)']

function validate(v) {
  const errs = []
  for (const f of FIELDS) {
    const val = v[f.name].trim()
    if (f.req && !val) errs.push(`${f.name} cannot be empty`)
    else if (f.email && val && !isEmail(val)) errs.push('email is not a valid address')
  }
  return errs
}

function Quoted({ f, value, onChange, optional }) {
  const ch = Math.max((value || f.ph).length, 1)
  return (
    <label className={`inline-flex h-[24px] items-center rounded-none border px-[4px] ${optional ? 'border-gray-400 bg-surface-2' : 'border-[#1276BF] bg-sky-tint'} text-error`}>
      <span aria-hidden="true">'</span>
      <input name={f.name} value={value} onChange={onChange} placeholder={f.ph} aria-label={f.name.replace('_', ' ')}
        style={{ width: `${ch}ch` }}
        className="m-0 h-[22px] border-0 bg-transparent p-0 font-mono text-[14px] leading-[22px] text-error outline-none placeholder:text-gray-500 md:text-[16px]" />
      <span aria-hidden="true">'</span>
    </label>
  )
}

function Line({ n, children }) {
  return (
    <div className="flex min-h-[26px] items-start md:min-h-[30px]">
      <span className="flex h-[26px] w-[24px] shrink-0 items-start justify-center pt-[0px] font-mono text-[12px] leading-[22px] text-[#356A91] md:h-[30px] md:w-[42px] md:text-[14px]">{n}</span>
      <div className="ml-[18px] min-w-0 flex-1 font-mono text-[14px] leading-[22px] text-ink md:ml-[38px] md:text-[16px]">{children}</div>
    </div>
  )
}
const K = ({ children }) => <span className="text-[#1276BF]">{children}</span>
const G = ({ children }) => <span className="text-gray-500">{children}</span>
const C = ({ children }) => <span className="text-garden-dark">{children}</span>

function IdeForm({ onBoring }) {
  const [v, setV] = useState(() => Object.fromEntries(FIELDS.map((f) => [f.name, ''])))
  const [news, setNews] = useState(false)
  const [msg, setMsg] = useState(null) // { ok, lines[] }
  const formRef = useRef(null)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const run = (e) => {
    e?.preventDefault()
    const errs = validate(v)
    setMsg(errs.length ? { ok: false, lines: errs.map((x) => `Msg 515: ${x}.`) } : { ok: true, lines: ['(1 row affected)', 'You are on the waitlist. This preview stored nothing and sent nothing.'] })
  }
  useEffect(() => {
    const el = formRef.current
    const key = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run(e) }
    el?.addEventListener('keydown', key)
    return () => el?.removeEventListener('keydown', key)
  })
  return (
    <form ref={formRef} noValidate onSubmit={run} className="flex w-full flex-col items-center gap-[36px]">
      <div className="relative z-[1] w-full border-2 border-ink bg-sky-tint shadow-hard-8 xl:max-w-[1160px] max-xl:max-w-[980px]">
        {/* menu bar */}
        <div className="flex items-center gap-[4px] px-[8px] pb-[2px] pt-[6px] md:px-[12px] md:pb-[4px] md:pt-[8px]">
          <Placeholder label="App icon" width={18} height={18} bordered={false} />
          {MENU.map((m, i) => (
            <span key={m} className={`ml-[6px] px-[6px] py-[2px] font-sans text-[14px] leading-[18px] first-of-type:ml-[6px] ${i > 2 ? 'hidden md:inline' : ''}`}>{m}</span>
          ))}
          <span className="ml-auto hidden rounded-tip border border-sky bg-white px-[10px] py-[2px] font-sans text-[13px] leading-[18px] text-gray-600 lg:inline">⌕ Search</span>
        </div>
        {/* toolbar */}
        <div className="mx-[8px] mb-[8px] mt-[4px] flex items-center gap-[8px] rounded-[6px] border border-sky bg-white p-[4px] md:mx-[12px] md:mb-[10px] md:px-[6px] md:py-[5px]">
          <span className="flex w-[198.8px] items-center justify-between gap-[8px] rounded-tip border border-[#C0C0C0] px-[8px] py-[5px] font-sans text-[13px] leading-[18px] text-gray-600 md:w-[220px]">azure_waitlist<span aria-hidden="true">▾</span></span>
          <span aria-hidden="true" className="h-[26px] w-px bg-hairline" />
          <button type="submit" className="flex items-center gap-[8px] rounded-tip border border-sky bg-white py-[5px] pl-[10px] pr-[12px] font-sans text-[14px] font-semibold leading-[18px] text-ink hover:bg-sky-tint">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1.5v9l8-4.5z" fill="#16AA98" /></svg>Execute
          </button>
          <span aria-hidden="true" className="hidden items-center gap-[14px] px-[4px] font-sans text-[15px] leading-[18px] text-[#C0C0C0] md:flex">
            <span className="h-[10px] w-[10px] bg-[#C0C0C0]" />✓<span>⊞</span><span>▤</span>
          </span>
          <span className="ml-auto hidden pr-[6px] font-sans text-[13px] leading-[18px] text-gray-600 lg:inline">⌘ + ↵</span>
        </div>
        {/* body */}
        <div className="flex gap-[8px] px-[8px] pb-[8px] md:gap-[10px] md:px-[12px] md:pb-[12px]">
          <div className="hidden w-[295.6px] shrink-0 flex-col border border-sky bg-white xl:flex">
            <div className="flex items-center justify-between border-b border-hairline px-[10px] py-[6px] font-sans text-[14px] leading-[18px]">
              Object Explorer<span className="tracking-[2.8px] text-gray-500">⌄ ✕</span>
            </div>
            <ul className="m-0 list-none p-[8px_6px] font-sans text-[13px] leading-[18px] text-ink">
              {[['−', 'md:cloud (Azure)', 0], ['−', 'Databases', 1], ['−', 'azure_waitlist', 2], ['−', 'Tables', 3], ['−', 'main.azure_waitlist', 4, true]].map(([g, t, d, sel]) => (
                <li key={t} style={{ paddingLeft: d * 16 }} className="py-[2.5px]">
                  <span className={`inline-flex items-center gap-[6px] px-[4px] py-px ${sel ? 'bg-[#1276BF] text-white' : ''}`}>
                    <span className="flex h-[9px] w-[9px] items-center justify-center border border-gray-400 text-[9px] leading-[9px] text-gray-600">{g}</span>{t}
                  </span>
                </li>
              ))}
              {COLUMNS.map((c) => <li key={c} style={{ paddingLeft: 80 }} className="py-[2px] text-gray-600">▪ {c}</li>)}
              {[['Views', 3], ['Programmability', 3], ['Security', 1], ['Server Objects', 1], ['Management', 1]].map(([t, d]) => (
                <li key={t} style={{ paddingLeft: d * 16 }} className="py-[2.5px]">
                  <span className="inline-flex items-center gap-[6px] px-[4px] py-px">
                    <span className="flex h-[9px] w-[9px] items-center justify-center border border-gray-400 text-[9px] leading-[9px] text-gray-600">+</span>{t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="flex w-full items-center gap-[10px] self-start border-x border-t border-sky bg-white px-[10px] py-[6px] font-sans text-[13px] leading-[18px] shadow-[inset_0_2px_0_#1276BF] md:w-auto">
              <span className="truncate">SQLQuery1.sql - md:cloud.azure_waitlist (you)</span>
              <span className="tracking-[5.2px] text-gray-600">⊥✕</span>
            </span>
            <div className="h-[356px] overflow-auto border border-sky bg-white pt-[16px] md:h-[338px]">
              <Line n={1}><K>INSERT INTO </K>azure_waitlist</Line>
              <Line n={2}><span className="pl-[2ch]"><G>(</G>first_name<G>, </G>last_name<G>, </G>email<G>, </G>company<G>, </G>region<G>)</G></span></Line>
              <Line n={3}><K>VALUES </K><G>(</G></Line>
              <Line n={4}><span className="pl-[2ch]"><Quoted f={FIELDS[0]} value={v.firstname} onChange={set('firstname')} /><G>, </G><Quoted f={FIELDS[1]} value={v.lastname} onChange={set('lastname')} /><G>,</G></span></Line>
              <Line n={5}><span className="pl-[2ch]"><Quoted f={FIELDS[2]} value={v.email} onChange={set('email')} /><G>,</G></span></Line>
              <Line n={6}><span className="pl-[2ch]"><Quoted f={FIELDS[3]} value={v.company} onChange={set('company')} optional /><G>,</G> <span className="pl-[2ch]"><C>-- optional</C></span></span></Line>
              <Line n={7}><span className="pl-[2ch]"><Quoted f={FIELDS[4]} value={v.azure_region} onChange={set('azure_region')} /> <span className="pl-[2ch]"><C>-- preferred Azure region</C></span></span></Line>
              <Line n={8}><G>);</G></Line>
              <Line n={9}>
                <label className="inline-flex items-center gap-[10px] text-garden-dark">
                  <input type="checkbox" name="subscribe_md_emails" checked={news} onChange={(e) => setNews(e.target.checked)} className="h-[15px] w-[15px] accent-[#068475]" />
                  -- also send me product news
                </label>
              </Line>
            </div>
            <div className="h-[154px] border-t-4 border-sky-tint bg-white" aria-live="polite">
              <div className="flex h-full flex-col">
                <span className="mt-px flex w-fit items-center gap-[6px] bg-white px-[12px] py-[6px] font-sans text-[13px] leading-[18px] shadow-[inset_0_-2px_0_#1276BF]">
                  <span aria-hidden="true" className="h-[10px] w-[12px] border border-gray-500" />Messages
                </span>
                <div className="flex-1 overflow-auto px-[16px] pt-[12px]">
                  {msg ? (
                    msg.lines.map((l) => <p key={l} className={`m-0 font-mono text-[14px] font-light leading-[22.4px] tracking-[0.32px] md:text-[16px] ${msg.ok ? 'text-garden-dark' : 'text-error'}`}>{l}</p>)
                  ) : (
                    <p className="m-0 font-mono text-[14px] font-light leading-[22.4px] tracking-[0.32px] text-gray-600 md:text-[16px]">Edit the values in quotes, then press Execute (⌘ + ↵).</p>
                  )}
                </div>
                <div className="flex items-center justify-between bg-sky-tint font-sans text-[12px] leading-[18px]">
                  <span className="px-[10px] py-[4px]">{msg ? (msg.ok ? 'Query executed' : 'Query failed') : 'Ready'}</span>
                  <span className="flex">
                    {['md:cloud (Azure)', 'azure_waitlist', '00:00:00', msg?.ok ? '1 row' : '0 rows'].map((s, i) => (
                      <span key={i} className={`border-l border-ink px-[10px] py-[4px] ${i < 3 ? 'hidden md:inline' : ''}`}>{s}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="m-0 flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[8px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-gray-600">
        Rather click than type?
        <button type="button" onClick={onBoring} className="border-0 bg-transparent p-0 font-sans text-[16px] font-light uppercase leading-[22.4px] tracking-[0.32px] text-ink underline">Use the boring form →</button>
      </p>
    </form>
  )
}

// Plain-form styling is UNMEASURED on the original: FloatingInput (float) + OffsetButton lg, as the spec suggests.
function BoringForm({ onBack }) {
  const [v, setV] = useState({ firstname: '', lastname: '', email: '', company: '', azure_region: '' })
  const [news, setNews] = useState(false)
  const [sent, setSent] = useState(false)
  const [errs, setErrs] = useState({})
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const n = {}
    if (!v.firstname.trim()) n.firstname = 'Required'
    if (!v.lastname.trim()) n.lastname = 'Required'
    if (!isEmail(v.email)) n.email = 'Enter a valid work email'
    if (!v.azure_region.trim()) n.azure_region = 'Required'
    setErrs(n)
    if (!Object.keys(n).length) setSent(true)
  }
  return (
    <div className="flex w-full flex-col items-center gap-[36px]">
      <div className="relative z-[1] w-full max-w-[640px] border-2 border-ink bg-white p-[24px] shadow-hard-8 md:p-[40px]">
        {sent ? (
          <div role="status" className="flex flex-col gap-[12px] py-[40px] text-center">
            <p className="m-0 font-mono text-[24px] uppercase leading-[33.6px]">You're on the list</p>
            <p className="m-0 font-sans text-[16px] font-light leading-[25.6px]">We will email you when your region opens. This preview sends nothing.</p>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="flex flex-col gap-[36px]">
            <TextInput label="First name" name="firstname" value={v.firstname} onChange={set('firstname')} error={errs.firstname} />
            <TextInput label="Last name" name="lastname" value={v.lastname} onChange={set('lastname')} error={errs.lastname} />
            <TextInput label="Work email" name="email" type="email" value={v.email} onChange={set('email')} error={errs.email} valid={isEmail(v.email)} />
            <TextInput label="Company (optional)" name="company" value={v.company} onChange={set('company')} />
            <TextInput label="Azure region" name="azure_region" value={v.azure_region} onChange={set('azure_region')} error={errs.azure_region} />
            <Checkbox checked={news} onChange={(e) => setNews(e.target.checked)} label="Also send me product news" />
            <div><OffsetButton size="lg" type="submit">Submit</OffsetButton></div>
          </form>
        )}
      </div>
      <p className="m-0 flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[8px] font-sans text-[16px] font-light leading-[22.4px] tracking-[0.32px] text-gray-600">
        Changed your mind?
        <button type="button" onClick={onBack} className="border-0 bg-transparent p-0 font-sans text-[16px] font-light uppercase leading-[22.4px] tracking-[0.32px] text-ink underline">Back to SQL →</button>
      </p>
    </div>
  )
}

export function AzureWaitlist() {
  const [boring, setBoring] = useState(false)
  return (
    <section id="azure-waitlist" className="relative overflow-clip bg-cream pb-[88px] pt-[56px] lg:pb-[112px] lg:pt-[104px]">
      <Placeholder label="Cloud illustration" bordered={false} className="!absolute right-[24px] top-[16px] hidden h-[142.8px] w-[220px] lg:flex xl:right-[64px] xl:h-[175.2px] xl:w-[270px]" />
      <Container className="flex flex-col items-center gap-[40px] lg:gap-[56px]">
        <div className="flex flex-col items-center gap-[20px] text-center lg:gap-[28px]">
          <span className="bg-sky px-[12px] py-[10px] font-mono text-[12px] uppercase leading-[12px] tracking-[0.96px]">Waitlist · early access by region</span>
          <h1 className="m-0 font-mono text-[40px] font-normal uppercase leading-[40px] tracking-[-0.4px] md:text-[64px] md:leading-[64px] md:tracking-[-0.64px] lg:text-[88px] lg:leading-[88px] lg:tracking-[-0.88px] xl:text-[104px] xl:leading-[104px] xl:tracking-[-1.04px]">Our cloud on Azure</h1>
          <p className="m-0 font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] lg:text-[24px] lg:leading-[38.4px] lg:tracking-[0.48px]">{words(136, 8101)}</p>
        </div>
        {boring ? <BoringForm onBack={() => setBoring(false)} /> : <IdeForm onBoring={() => setBoring(true)} />}
      </Container>
    </section>
  )
}

// ---------- 2. what's coming ----------
const COMING = [[21, 113, 'h-[154.8px] w-[240px]'], [39, 117, 'h-[170.2px] w-[220px]'], [26, 87, 'h-[153.9px] w-[130px]'], [31, 154, 'h-[154.6px] w-[240px]']]
export function AzureComing() {
  return (
    <section className="border-t-2 border-ink bg-white pb-[80px] pt-[72px] lg:pb-[120px] lg:pt-[112px]">
      <Container>
        <div className="flex flex-col gap-[20px] pb-[48px] lg:flex-row lg:items-end lg:justify-between lg:gap-[48px] lg:pb-[64px]">
          <h2 className={`${H2} lg:max-w-[452px] xl:max-w-[760px]`}>What's coming to Azure</h2>
          <p className="m-0 max-w-[420px] font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px]">{words(96, 8201)}</p>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 gap-[24px] p-0 md:grid-cols-2 xl:grid-cols-4">
          {COMING.map(([t, p, art], i) => (
            <li key={i} className="flex flex-col border-2 border-ink bg-white">
              <div className="flex h-[220px] items-center justify-center border-b-2 border-ink bg-cream p-[20px]">
                <Placeholder label="Feature illustration" bordered={false} className={art} />
              </div>
              <div className="flex flex-col gap-[12px] px-[24px] pb-[32px] pt-[28px]">
                <span className="font-mono text-[13px] leading-[13px] tracking-[0.52px] text-[#1276BF]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="m-0 font-mono text-[22px] font-normal uppercase leading-[26.4px]">{words(t, 8210 + i, { title: true })}</h3>
                <p className={BODY}>{words(p, 8220 + i)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

// ---------- 3. region vote ----------
export function AzureVote() {
  return (
    <section className="border-t-2 border-ink bg-cream pb-[80px] pt-[72px] lg:pb-[120px] lg:pt-[112px]">
      <Container className="flex flex-col gap-[48px] lg:flex-row lg:items-center lg:gap-[80px]">
        <div className="flex flex-col gap-[32px] lg:w-[500px] xl:w-[722px]">
          <div>
            <h2 className={H2}>Where should we land first?</h2>
            <p className="m-0 max-w-[560px] pt-[20px] font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px]">{words(154, 8301)}</p>
          </div>
          <div className="border-2 border-ink bg-white shadow-hard-6">
            <pre className="m-0 whitespace-pre-wrap border-b-2 border-ink bg-surface-2 px-[24px] py-[16px] font-mono text-[15px] leading-[22px]">SELECT count(*) AS regions FROM azure_regions;</pre>
            <div className="flex items-baseline justify-between gap-[24px] px-[24px] py-[20px]">
              <span className="font-mono text-[13px] leading-[13px] text-gray-600">regions</span>
              <span className="font-mono text-[48px] leading-[48px]">58</span>
            </div>
            <a href="#azure-waitlist" onClick={(e) => { e.preventDefault(); document.getElementById('azure-waitlist')?.scrollIntoView({ block: 'start' }) }}
              className="block px-[24px] pb-[20px] font-mono text-[13px] leading-[13px] text-gray-600 underline">We start with one. Pick yours in the form above ↑</a>
          </div>
        </div>
        <Placeholder label="Region map illustration" bordered={false} className="mx-auto h-[328.5px] w-[280px] lg:mx-0 lg:h-[398.9px] lg:w-[340px] xl:h-[516.2px] xl:w-[440px]" />
      </Container>
    </section>
  )
}

// ---------- 4. how it works ----------
const STEPS = [[18, 55], [17, 98], [22, 82]]
export function AzureSteps() {
  return (
    <section className="border-t-2 border-ink bg-white pb-[80px] pt-[72px] lg:pb-[120px] lg:pt-[96px]">
      <Container>
        <div className="flex items-end justify-between gap-[32px]">
          <div className="pb-[40px] lg:max-w-[588px] lg:pb-[56px] xl:max-w-[720px]">
            <h2 className={H2}>What happens after you hit Execute</h2>
          </div>
          <Placeholder label="Steps illustration" bordered={false} className="-mb-[2px] mr-[40px] hidden h-[218.1px] w-[260px] lg:flex" />
        </div>
        <ol className="m-0 flex list-none flex-col border-2 border-ink p-0 lg:flex-row">
          {STEPS.map(([t, p], i) => (
            <li key={i} className={`flex flex-1 flex-col gap-[14px] px-[24px] pb-[32px] pt-[28px] lg:px-[28px] lg:pb-[36px] lg:pt-[32px] ${i === 0 ? 'bg-sky-tint' : 'border-t-2 border-ink bg-white lg:border-l-2 lg:border-t-0'}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[40px] leading-[44px]">{String(i + 1).padStart(2, '0')}</span>
                {i === 0 && <span className="bg-sun px-[8px] py-[6px] font-mono text-[12px] uppercase leading-[12px] tracking-[0.72px]">You are here</span>}
              </div>
              <h3 className="m-0 font-mono text-[22px] font-normal uppercase leading-[26.4px]">{words(t, 8410 + i, { title: true })}</h3>
              <p className={BODY}>{words(p, 8420 + i)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

// ---------- 5. FAQ ----------
const FAQ_LENS = [[39, 210], [25, 180], [43, 240], [35, 150], [36, 200], [31, 170]]
export function AzureFaq() {
  const items = FAQ_LENS.map(([q, a], i) => ({
    q: `${words(q - 1, 8500 + i, { sentence: false })}?`,
    a: <p className="m-0">{words(a, 8510 + i)}</p>,
  }))
  return (
    <section className="border-t-2 border-ink bg-cream pb-[80px] pt-[72px] lg:pb-[120px] lg:pt-[112px]">
      <Container className="flex flex-col gap-[32px] xl:flex-row xl:gap-[96px]">
        <div className="flex flex-col xl:w-[420px] xl:shrink-0">
          <h2 className={H2}>Before you run it</h2>
          <div className="hidden pt-[56px] xl:block"><Placeholder label="FAQ illustration" bordered={false} className="h-[225px] w-[260px]" /></div>
        </div>
        <section id="faqs" className="xm-faq flex-1 bg-cream">
          <Accordion
            items={items}
            itemClassName="py-[20px] lg:py-[26px]"
            innerClassName="px-[24px] md:px-[20px] lg:px-[30px]"
            qClassName="mr-[2.7px] md:mr-[20px] text-[16px] uppercase leading-[22.4px] md:text-[17px] md:leading-[23.8px] lg:text-[20px] lg:leading-[28px]"
            chevronClassName="!ml-0"
            aClassName="text-[18px] font-light leading-[28.8px] tracking-[0.36px]"
          />
        </section>
      </Container>
    </section>
  )
}

// ---------- 6. closing band ----------
export function AzureClosing() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[72px] lg:pb-[112px] lg:pt-[104px]">
      <Container className="relative z-[1]">
        <div className="flex max-w-[640px] flex-col gap-[24px]">
          <h2 className="m-0 font-mono text-[36px] font-normal uppercase leading-[37.8px] text-white md:text-[48px] md:leading-[50.4px] lg:text-[64px] lg:leading-[67.2px]">Start with us today</h2>
          <p className="m-0 max-w-[540px] font-sans text-[18px] font-light leading-[28.8px] tracking-[0.36px] text-hairline">{words(92, 8601)}</p>
          <div className="flex flex-col items-start gap-[24px] pt-[8px] md:flex-row md:items-center md:gap-[32px]">
            {/* sign-up is an auth URL -> non-link button */}
            <OffsetButton size="lg">Start free</OffsetButton>
            <UnderlineLink to="/contact-us/product-expert" icon={null} className="!text-surface-2" labelClassName="!border-surface-2">Talk to us about Azure →</UnderlineLink>
          </div>
        </div>
      </Container>
      <div className="flex justify-end pt-[32px] lg:absolute lg:right-0 lg:top-[123.8px] lg:pt-0 xl:top-[65.4px]">
        <Placeholder label="Closing illustration" bordered={false} className="h-[253.1px] w-full md:h-[272.6px] md:w-[420px] xl:h-[389.4px] xl:w-[600px]" />
      </div>
    </section>
  )
}
