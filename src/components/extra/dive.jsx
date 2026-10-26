// X5 dive detail blocks (PAGES_SPEC_EXTRA §5 X5): back link, dive card (toolbar, static embed frame, title,
// description, tags, dark footer bar), AI prompts, comments. The dive-gallery nav / footer are shared with
// /dive-gallery: components/content/diveChrome.jsx.
import { Link } from 'react-router-dom'
import { Placeholder } from '../ui'
import '../../styles/extra-content.css'

export function BrowseDivesLink() {
  return (
    <Link to="/dive-gallery" className="mb-[24px] flex h-[16px] w-fit items-end gap-[6px] font-sans text-[14px] leading-[14px] text-gray-500 no-underline transition-colors hover:text-ink">
      <span aria-hidden="true">←</span>Browse Dives
    </Link>
  )
}

const I = {
  copy: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="4.5" y="4.5" width="8" height="8" stroke="currentColor" strokeWidth="1.2" /><path d="M9.5 4.5v-3h-8v8h3" stroke="currentColor" strokeWidth="1.2" /></svg>,
  link: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.8.8M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.8-.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  full: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1.5 5V1.5H5M9 1.5h3.5V5M12.5 9v3.5H9M5 12.5H1.5V9" stroke="currentColor" strokeWidth="1.2" /></svg>,
}
const TOOL = 'inline-flex cursor-pointer items-center gap-[6px] rounded-[4px] border border-sand-dark bg-white px-[12px] py-[5px] font-sans text-[12px] font-medium leading-[normal] text-gray-500 no-underline transition-[background-color,color,border-color] duration-150 hover:border-ink hover:bg-cream hover:text-ink'

function Toolbar() {
  return (
    <div className="flex items-center justify-between gap-[12px] border-b border-sand-dark bg-surface-2 px-[12px] py-[8px] lg:px-[16px]">
      <button type="button" className="cursor-pointer rounded-sm border border-ink bg-sky-hover px-[14px] py-[6px] text-left font-sans text-[13px] font-medium leading-[normal] text-ink transition-colors duration-150 hover:bg-sky-dark">Copy Dive to My Account</button>
      <div className="flex flex-wrap items-center justify-end gap-[6px]">
        <button type="button" className={TOOL}>{I.copy}Copy source</button>
        <button type="button" className={TOOL}>{I.link}Copy link</button>
        {/* /dive-gallery/embed/<slug> is not in the route map -> non-link (§10) */}
        <span className={`${TOOL} leading-[12px]`}>{I.full}Full screen</span>
      </div>
    </div>
  )
}

const VOTE = 'cursor-pointer rounded-sm border border-[rgba(255,255,255,0.3)] bg-transparent py-[4px] font-sans text-white transition-colors hover:border-sky-hover hover:bg-[rgba(255,255,255,0.08)]'

export function DiveCard({ d }) {
  return (
    <div className="mb-[32px] border-2 border-ink bg-white">
      <Toolbar />
      {/* Original: embed-motherduck.com sandbox iframe (896x628). Clone: static frame with a poster and pill. */}
      <div className="relative h-[630px] min-h-[400px] border-b-2 border-cream bg-surface-2">
        <Placeholder kind="diagram" seed={d.seed} rounded="" bordered={false} label="Dive preview" className="!absolute inset-x-0 top-0 !h-[628px] !w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-pill bg-ink px-[24px] py-[12px] font-sans text-[14px] font-medium leading-[20px] text-white shadow-dive-pill">Static preview of this dive</span>
        </div>
      </div>
      <div className="px-[16px] pb-[12px] pt-[16px] lg:px-[32px] lg:pb-[16px] lg:pt-[24px]">
        <h1 className="m-0 font-sans text-[22px] font-semibold leading-[30.8px] text-ink lg:text-[28px] lg:leading-[39.2px]">{d.title}</h1>
      </div>
      <div className="px-[16px] pb-[21px] lg:px-[32px]">
        <p className="m-0 font-sans text-[14px] font-light leading-[22.4px] tracking-[0.28px] text-gray-500">{d.description}</p>
      </div>
      <div className="flex flex-wrap gap-[8px] border-t border-cream bg-surface-2 px-[16px] py-[12px] lg:px-[32px] lg:py-[14px]">
        {d.tags.map((t) => (
          <span key={t} className="rounded-pill border border-sand-dark bg-white px-[10px] py-[4px] font-sans text-[12.5px] leading-[12.5px] text-ink">{t}</span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-[12px] border-t-2 border-ink bg-ink px-[16px] py-[12px] lg:px-[32px]">
        <span className="font-sans text-[13px] leading-[13px] text-[rgba(255,255,255,0.7)] lg:text-[14px] lg:leading-[14px]">
          {/* /dive-gallery/users/<id> is not in the route map -> non-link */}
          Author: <span className="cursor-pointer font-semibold text-white">{d.author}</span> · {d.date} Region: <span className="font-mono text-[12px] leading-[12px] text-[rgba(255,255,255,0.85)]">{d.region}</span>
        </span>
        <span className="flex shrink-0 items-center gap-[4px]">
          <button type="button" aria-label="Upvote" className={`${VOTE} px-[8px] text-[12px] font-semibold leading-[18px] lg:px-[10px] lg:text-[13px] lg:leading-[20px]`}>▲ {d.votes}</button>
          <button type="button" aria-label="Downvote" className={`${VOTE} px-[6px] text-[12px] leading-[15px]`}>▼</button>
        </span>
      </div>
    </div>
  )
}

const H2 = 'm-0 mb-[16px] font-sans text-[18px] font-semibold leading-[25.2px] text-ink lg:text-[22px] lg:leading-[26.4px]'

export function PromptsUsed({ prompts }) {
  if (!prompts.length) return null
  return (
    <section className="mb-[40px]">
      <h2 className={H2}>AI Prompts Used</h2>
      <div className="flex flex-col gap-[16px]">
        {prompts.map((p, k) => (
          <div key={k} className="border-2 border-ink">
            <div className="flex items-center gap-[10px] border-b-2 border-ink bg-cream px-[16px] py-[10px]">
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#1A1A2E] font-sans text-[12px] font-semibold leading-[12px] text-white">{k + 1}</span>
              <span className="flex-1 font-sans text-[13px] leading-[13px] text-gray-600">Prompt {k + 1}</span>
              <button type="button" aria-label={`Copy prompt ${k + 1}`} className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center border-0 bg-transparent p-[4px] text-gray-600 hover:text-ink">{I.copy}</button>
            </div>
            <pre className="m-0 whitespace-pre-wrap p-[16px] font-sans text-[14px] leading-[22.4px] text-[#111]">{p}</pre>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Comments({ comments }) {
  return (
    <section className="mb-[40px]">
      <h2 className={H2}>Comments</h2>
      <p className="m-0 mb-[16px] font-sans text-[14px] font-light leading-[19.6px] text-gray-600">
        {/* auth flow -> non-link */}
        <span className="cursor-pointer font-semibold text-[#1A1A2E]">Log in</span> to leave a comment.
      </p>
      {comments.length === 0 ? (
        <p className="m-0 font-sans text-[14px] font-light leading-[19.6px] text-[#999]">No comments yet. Be the first!</p>
      ) : comments.map((c, k) => (
        <div key={k} className="border-b border-[#F3F4F6] py-[12px]">
          <div className="mb-[6px] flex items-center gap-[8px]">
            <span className="h-[28px] w-[28px] shrink-0 rounded-full border border-sand-dark bg-sand" aria-hidden="true" />
            <span className="font-sans text-[13px] font-semibold text-ink">{c.name}</span>
            <span className="font-sans text-[12px] text-[#999]">{c.date}</span>
          </div>
          <p className="m-0 font-sans text-[14px] font-light leading-[21px] text-[#333]">{c.text}</p>
          <button type="button" className="mt-[4px] cursor-pointer border-0 bg-transparent p-0 font-sans text-[12px] text-gray-600">Reply</button>
        </div>
      ))}
    </section>
  )
}
