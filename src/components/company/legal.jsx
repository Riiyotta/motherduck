import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui'
import { Chevron } from './bits.jsx'
import { Collapse } from './motion.jsx'
import { filler, heading } from './copy.js'

const LINK = 'text-ink underline underline-offset-[3.52px]'
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ---------- data (original neutral placeholder copy) ----------
// Privacy (live structure, placeholder copy): 14 sections in one column, each heading followed by one blank line.
// TOC = H2 groups with their H3 sections as kids (title lengths follow the live TOC: 31 / 41 / 59 / 46 / ...).
// Blocks: { p: chars } paragraph; { ul: [[chars, boldLeadChars] | chars], disc } list; { gap: n } n blank lines
// (n x the body line height); `s` = explicit filler seed (wrap tuning); `sep: false` = no blank line after the section.
const PRIVACY = [
  { h: 2, t: 'Information we gather about you', blocks: [{ p: 515 }, { gap: 1 }] },
  { h: 3, t: 'A. Information you share with us directly', blocks: [{ gap: 1 }, { ul: [[337, 48], [567, 15], [290, 20], [369, 8]] }] },
  { h: 3, t: 'B. Information gathered automatically when you use the site', blocks: [{ gap: 1 }, { ul: [[151, 21], [174, 19], [250, 18], [670, 50]] }, { gap: 1 }, { p: 268 }, { gap: 1 }] },
  { h: 2, t: 'How we use the personal details that we gather', sep: false, blocks: [{ gap: 1 }, { p: 43 }, { ul: [66, 114, 62, 219, 175, 106, 67, 81, 224, 97], disc: true }, { gap: 1 }] },
  { h: 2, t: 'Legal grounds for processing information in some regions', sep: false, blocks: [{ gap: 1 }, { p: 194 }, { ul: [[126, 8], [226, 22], [227, 35], [538, 21]], disc: true }, { gap: 1 }] },
  { h: 2, t: 'How we disclose the personal details that we gather', blocks: [{ gap: 1 }, { ul: [[208, 24], [373, 30], [334, 19], [499, 43], [401, 39], [106, 8, 1]] }] },
  { h: 3, t: 'Your options and rights', blocks: [{ gap: 1 }, { ul: [[235, 25], [125, 13], [182, 27], [197, 18], [175, 43], [112, 35], [360, 21], [109, 109], [89, 11], [137, 79]] }, { p: 464 }] },
  { h: 3, t: 'Other parties', blocks: [{ gap: 1 }, { p: 425 }] },
  { h: 3, t: 'Security', blocks: [{ gap: 1 }, { p: 356 }] },
  { h: 3, t: 'Privacy for minors', blocks: [{ gap: 1 }, { p: 303 }] },
  { h: 3, t: 'Visitors from far away', blocks: [{ gap: 1 }, { p: 1206, b: 6 }] },
  { h: 2, t: 'How long we keep personal details', blocks: [{ gap: 1 }, { p: 361 }] },
  { h: 3, t: 'Updates to this privacy notice', blocks: [{ gap: 1 }, { p: 332 }] },
  { h: 3, t: 'How to get in touch', sep: false, blocks: [{ gap: 1 }, { p: 399, b: 14 }, { gap: 5 }, { ul: [22, 20, 10, 25], plain: true }] },
]
// Privacy wrap tuning: text-unit index (render order) -> filler seed; see PrivacyPolicy.
const PRIVACY_SEEDS = { 0: 1, 4: 1, 5: 4, 16: 1, 21: 1, 23: 22, 26: 2, 27: 1, 30: 1, 31: 5, 42: 221, 44: 29, 45: 7, 46: 104, 47: 12, 48: 107 }
const TERMS = [
  'Acceptance', 'Eligibility', 'Accounts', 'Acceptable use', 'Customer data', 'Fees and payment', 'Third-party services',
  'Intellectual property', 'Feedback', 'Confidentiality', 'Term and termination', 'Disclaimers', 'Limitation of liability',
  'Indemnification', 'Governing law', 'General terms',
]

// ---------- TOC with scroll-spy ----------
// Live (/terms-of-use, probed at 1440x900 and 1440x700 with direct jumps): the active item is the first section
// (DOM order) whose box intersects the band 25%-50% of the viewport height (top edge pinned by /privacy-policy kid transitions); if none does, the last section above
// the band stays active (bottom of the page); above the first section nothing is active.
function useScrollSpy(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let raf = 0
    const on = () => {
      raf = 0
      const top = window.innerHeight * 0.25
      const bottom = window.innerHeight * 0.5
      let hit = null
      let above = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.bottom > top && r.top < bottom) { hit = id; break }
        if (r.bottom <= top) above = id
      }
      setActive(hit ?? above)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(on) }
    on()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [ids])
  return active
}

const jump = (e, id) => {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  // Target lands 160px from the viewport top (no smooth scrolling).
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: 'auto' })
  history.replaceState(null, '', `#${id}`)
}

function Toc({ items, numbered }) {
  const ids = useMemo(() => items.flatMap((it) => [it.id, ...it.kids.map((k) => k.id)]), [items])
  const active = useScrollSpy(ids)
  const linkCls = (on) =>
    `font-sans text-toc-link-sm text-ink no-underline xl:text-toc-link ${on ? '!font-semibold' : ''}`
  return (
    <div className="flex w-full flex-col gap-[24px] md:w-[196px] lg:w-[250px] xl:sticky xl:top-[148px] xl:ml-[69px] xl:w-[333px] xl:shrink-0 xl:self-start">
      <aside className="border-2 border-ink bg-cream">
        <p className="m-0 px-[24px] pb-[16px] pt-[24px] font-mono text-toc-title uppercase xl:pb-[20px]">Table of contents</p>
        <ol
          className={`m-0 flex max-h-[230px] flex-col gap-[12px] overflow-auto pb-[16px] pr-[16px] font-sans font-light xl:max-h-[638px] ${
            numbered ? 'list-decimal pl-[48px]' : 'list-none pl-[24px]'
          }`}
        >
          {items.map((it) => {
            const open = active === it.id || it.kids.some((k) => k.id === active)
            return (
              <li key={it.id}>
                <div className="flex cursor-pointer items-center gap-[4px] bg-transparent">
                  <a href={`#${it.id}`} onClick={(e) => jump(e, it.id)} className={linkCls(open)}>{it.t}</a>
                  {it.kids.length > 0 && (
                    <span className="flex h-[20px] w-[18.5px] items-center"><Chevron size={18.5} /></span>
                  )}
                </div>
                {it.kids.length > 0 && (
                  <Collapse open={open} duration={200} extraOpenStyle={{ marginTop: 8 }}>
                    <ul className="m-0 flex list-none flex-col gap-[12px] pl-[16px]">
                      {it.kids.map((k) => (
                        <li key={k.id}>
                          <a href={`#${k.id}`} onClick={(e) => jump(e, k.id)} tabIndex={open ? 0 : -1} className={linkCls(active === k.id)}>{k.t}</a>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                )}
              </li>
            )
          })}
        </ol>
      </aside>
    </div>
  )
}

// ---------- shells ----------
// TOC comes first in the DOM (as on the original): XL row-reverse puts it on the right of the content;
// below XL it stacks above the content with a 40px gap.
// Article (live): full container width below 1302 (920 @1280), 816 at >=1302; body Inter 14/19.6 below 960,
// 16/25.6 from 960 (both legal pages). `articleClassName` carries per-page extras (terms letter-spacing).
function LegalShell({ title, toc, numbered, articleClassName = '', children }) {
  return (
    <>
      <Container as="header" className="pb-[40px] pt-[35px] md:py-[60px] lg:pb-[80px] lg:pt-[80px] xl:pb-[88px] xl:pt-[110px]">
        <h1 className="m-0 font-mono text-page-h1-sm font-normal uppercase md:text-page-h1-md lg:text-page-h1">{title}</h1>
      </Container>
      <Container className="flex flex-col gap-[40px] xl:flex-row-reverse xl:justify-end xl:gap-[24px]">
        <Toc items={toc} numbered={numbered} />
        <article className={`w-full pb-[120px] font-sans text-[14px] font-light leading-[19.6px] text-ink lg:pb-[180px] lg:text-[16px] lg:leading-[25.6px] xl:max-w-[816px] xl:pb-[278px] ${articleClassName}`}>{children}</article>
      </Container>
    </>
  )
}

// "Last Updated" + lead paragraph share one block (gap 16, margin-bottom 48)
function Intro({ ch, seed, children }) {
  return (
    <div className="mb-[48px] flex flex-col gap-[16px]">
      <span className="font-sans text-[12px] font-light leading-[16.8px] tracking-[0.24px] lg:text-[14px] lg:leading-[19.6px] lg:tracking-[0.28px]">Last Updated: January 1, 2026</span>
      <p className="m-0 font-sans text-legal-lead-md lg:text-legal-lead">
        This placeholder statement explains how <strong className="font-bold">the Company</strong> handles information for{' '}
        <strong className="font-bold">the Service</strong>. {filler(ch, seed)} {children}
      </p>
    </div>
  )
}

// F1 Privacy (nested TOC: 5 H2 groups with their H3 sections). Live type: body Inter 14/19.6 (<960) / 16/25.6,
// letter-spacing normal; H2 16/25.6 (14/19.6 <960) around a 20px bold underlined <u> (line box 32 / 24); H3 Inter
// 16/25.6 700 at every width; one blank body line after each heading and between sections.
export function PrivacyPolicy() {
  const toc = []
  PRIVACY.forEach((s) => {
    const item = { t: s.t, id: slug(s.t), kids: [] }
    if (s.h === 2) toc.push(item)
    else toc[toc.length - 1].kids.push(item)
  })
  // Every text unit (paragraph / list item, in render order) gets seed PRIVACY_SEEDS[i] ?? 200 + 2i.
  let unit = 0
  const nextSeed = () => { const i = unit++; return PRIVACY_SEEDS[i] ?? 200 + 2 * i }
  const lead = (c, b, sd) => (
    <><strong className="font-bold">{heading(b, sd + 1)}.</strong> {filler(Math.max(c - b - 2, 8), sd)}</>
  )
  const block = (bl, k) => {
    if (bl.gap) return <div key={k} aria-hidden="true" style={{ height: `calc(var(--lh) * ${bl.gap})` }} />
    if (bl.p) {
      const sd = nextSeed()
      return <p key={k} className="m-0">{bl.b ? lead(bl.p, bl.b, sd) : filler(bl.p, sd)}</p>
    }
    return (
      <ul key={k} className={`m-0 ${bl.disc ? 'list-disc pl-[20px]' : 'list-none p-0'}`}>
        {bl.ul.map((it, j) => {
          const [c, b, extra] = Array.isArray(it) ? it : [it]
          const sd = nextSeed()
          return (
            <li key={j} style={extra ? { paddingBottom: `calc(var(--lh) * ${extra})` } : undefined}>
              {b ? lead(c, b, sd) : bl.plain ? heading(c, sd) : filler(c, sd)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <LegalShell title="Privacy policy" toc={toc}>
      <Intro ch={810} seed={357}>
        See also our <Link to="/terms-of-use" className={`${LINK} underline-offset-[4.4px]`}>terms of use</Link>.
      </Intro>
      <div className="[--lh:19.6px] lg:[--lh:25.6px]">
        {PRIVACY.map((s) => (
          <section key={s.t} id={slug(s.t)} className="legal-heading" style={s.sep === false ? undefined : { marginBottom: 'var(--lh)' }}>
            {s.h === 2 ? (
              <h2 className="m-0 font-sans text-[14px] font-bold leading-[19.6px] lg:text-[16px] lg:leading-[25.6px]">
                <u className="text-[20px] leading-[24px] lg:leading-[32px]">{s.t}</u>
              </h2>
            ) : (
              <h3 className="m-0 font-sans text-[16px] font-bold leading-[25.6px]">{s.t}</h3>
            )}
            {s.blocks.map(block)}
          </section>
        ))}
      </div>
    </LegalShell>
  )
}

// F1 Terms (numbered flat TOC, 16 sections). Live structure (@1440): intro (Last Updated + 4-line lead, a one-line
// notice with 10px bottom padding and 31.4px below it, an 8-line caps paragraph with a bold lead), then per section a
// decimal item: bold 16px heading on its own 25.6px line, then a paragraph or a lower-latin list (25px indent);
// 25.6px between sections. Block sizes are the live character counts (placeholder copy, same lengths):
// number = paragraph / list item chars; { up } = set in capitals; { free } = un-numbered run inside a list;
// { c, s } = explicit filler seed, tuned so the block wraps to the live line count at 1440 / 1280 / 768 / 390.
const TERMS_BODY = [
  [[88, { c: 758, s: 15 }, { free: 255 }, { c: 637, s: 18 }, { c: 840, s: 15 }]],
  [369], [{ c: 711, s: 1 }], [723], [613], [161], [430],
  [{ c: 51, up: true }, [{ c: 105, s: 7 }, 157, { c: 350, s: 18 }, 307, 110, 73, 146, 162, 58, 228, 148]],
  [{ c: 455, s: 1 }], [345], [1321], [721], [{ c: 1126, s: 2 }],
  [[{ c: 780, s: 55, up: true }, { c: 678, s: 686, up: true }, { c: 212, s: 15, up: true }]],
  [[{ c: 589, s: 1, up: true }, { c: 298, s: 1, up: true }, { c: 464, s: 2, up: true }]],
  [[{ c: 1209, s: 38 }, 424, { c: 165, s: 1 }, { c: 462, s: 2350 }, { c: 339, s: 3 }, 272, { c: 468, s: 5 }, 365]],
]

export function TermsOfUse() {
  const toc = TERMS.map((t) => ({ t, id: slug(t), kids: [] }))
  let seed = 300
  const text = (b) => {
    const c = typeof b === 'number' ? b : b.c
    const sd = seed++
    return <span className={b.up ? 'uppercase' : ''}>{filler(c, b.s ?? sd)}</span>
  }
  const item = (it, j) => {
    if (it.free) {
      return <li key={j} className="list-none"><strong className="font-bold">{heading(15, seed++)}</strong> {filler(it.free, seed++)}</li>
    }
    return <li key={j}>{text(it)}</li>
  }
  const block = (b, k) => {
    if (Array.isArray(b)) return <ol key={k} className="m-0 list-[lower-latin] pl-[25px]">{b.map(item)}</ol>
    return <p key={k} className="m-0">{text(b)}</p>
  }
  return (
    <LegalShell title="Terms of use" toc={toc} numbered articleClassName="tracking-[0.28px] lg:tracking-[0.32px]">
      <Intro ch={173} seed={299}>
        Use of the Service is also covered by our <Link to="/privacy-policy" className={`${LINK} underline-offset-[4.4px]`}>privacy policy</Link>.
      </Intro>
      <p className="m-0 mb-[32.4px] pb-[4px] uppercase lg:mb-[31.4px] lg:pb-[10px]">{heading(44, 77)}</p>
      <p className="m-0 uppercase"><strong className="font-bold">{heading(35, 78)}</strong> {filler(527, 282)}</p>
      <ol className="m-0 list-decimal p-0 pl-[20px] lg:pl-[32px]">
        {TERMS.map((t, i) => (
          <li key={t} id={slug(t)} className="legal-heading mb-[19.6px] last:mb-0 lg:mb-[25.6px]">
            <h2 className="m-0 inline font-sans text-[14px] font-bold leading-[19.6px] lg:text-[16px] lg:leading-[25.6px]">{t}.</h2>
            {TERMS_BODY[i].map(block)}
          </li>
        ))}
      </ol>
    </LegalShell>
  )
}

// 5 x 5 table; cell text lengths follow the original (col 2 carries the long descriptions)
const TABLE = [
  ['Priority level', 'Description', 'First reply', 'Update rate', 'Channels'],
  // [chars, seed] cells are tuned so each row wraps to the original's height at 1440 / 1280 / 768 / 390
  ['Level 1', [97, 422], 'Within 1 business hour', 'Every two hours', 'Email and Slack'],
  ['Level 2', 49, 'Within 4 business hours', 'Every four hours', 'Email and Slack'],
  ['Level 3', [114, 434], 'Within 1 business day', 'Daily until fixed', 'Email or Slack'],
  ['Level 4', [98, 425], 'Within 2 business days', 'Twice per week', 'Email or Slack'],
]
const COLS = [
  'w-[16.7%] md:w-[12.1%] lg:w-[8.9%] xl:w-[9.9%]',
  'w-[23.9%] md:w-[39.7%] lg:w-[49.6%] xl:w-[29.2%]',
  'w-[22%] md:w-[18%] lg:w-[15.4%] xl:w-[20.8%]',
  'w-[18.1%] md:w-[15%] lg:w-[13.1%] xl:w-[19.9%]',
  'w-[19.3%] md:w-[15.2%] lg:w-[13%] xl:w-[20.2%]',
]
// [chars, seed, bold lead] for the 7 paragraphs after "Last Updated"; the table follows the 5th
// (B. and E. tuned to the original's line counts at all four widths)
const SP_PARAS = [[284, 401], [167, 701], [277, 1001, 'A.'], [600, 1301, 'B.'], [253, 1605, 'C.'], [135, 1901, 'D.'], [514, 2205, 'E.']]

// F1 Support-policy variant (no TOC, smaller H1, table). Paragraphs Inter 16/25.6 300, margin-bottom 24.
export function SupportPolicy() {
  const para = ([ch, seed, lead]) => (
    <p key={seed} className="m-0 mb-[24px] text-[16px] font-light leading-[25.6px] tracking-[0.32px] xl:tracking-normal">
      {lead && <strong className="font-bold">{lead} </strong>}{filler(ch, seed)}
    </p>
  )
  return (
    <>
      <Container className="lg:pt-[34px] xl:pt-[24px]">
        <h1 className="m-0 pb-[32px] pt-[40px] font-mono text-compact-h1-32 font-normal uppercase md:text-compact-h1-40 lg:pb-[36px] lg:text-compact-h1 xl:pt-[64px]">Customer support policy</h1>
      </Container>
      {/* Measured: 24px below the content block <960, 48 above */}
      <Container className="pb-[24px] lg:pb-[48px]">
        {/* Original <728: the table scroller is 100vw-64 wide (+24 padding), which widens this grid column to
            100vw-40 (350 @390), 8px past the container padding. */}
        <div className="pb-[112px] font-sans text-ink max-md:w-[calc(100vw-40px)] xl:max-w-[816px]">
          <p className="m-0 mb-[24px] text-[16px] font-light leading-[25.6px] tracking-[0.32px] xl:tracking-normal">Last Updated: 01/01/2026</p>
          {SP_PARAS.slice(0, 5).map(para)}
          <div className="max-w-full overflow-x-auto pr-[24px]">
            <table className="w-full min-w-[415.7px] border-collapse border-2 border-ink">
              {/* measured auto-layout column split per range (SM / MD / LG / XL, % of table width) */}
              <colgroup>{COLS.map((c, i) => <col key={i} className={c} />)}</colgroup>
              <tbody>
                {TABLE.map((row, r) => (
                  <tr key={r} className="bg-white">
                    {row.map((c, k) => {
                      const Cell = r === 0 ? 'th' : 'td'
                      return (
                        <Cell key={k} className={`border border-black p-[10px] text-left align-baseline text-[13px] leading-[16.9px] md:text-[15px] md:leading-[21px] ${r === 0 ? 'font-bold' : 'font-light'}`}>
                          {typeof c === 'number' ? filler(c, 420 + r) : Array.isArray(c) ? filler(c[0], c[1]) : c}
                        </Cell>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[24px]">{SP_PARAS.slice(5).map(para)}</div>
        </div>
      </Container>
    </>
  )
}
