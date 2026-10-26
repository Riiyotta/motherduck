// PAGES_SPEC_EXTRA X9 /explain-analyze (podcast index) and X10 /explain-analyze/:slug (episode), dark theme (§2).
// Shared: useDarkTheme (body[data-theme=dark] + header overrides in extra-media.css), UnlockCard, PromptChip,
// PlatformIcons. Players and embeds are static (PlayFrame / Placeholder); platform targets are external -> non-links.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Placeholder, TextInput, Checkbox, UnderlineLink } from '../ui'
import ArticleProse from '../content/ArticleProse.jsx'
import { PlayFrame } from '../content/bits.jsx'
import { chars } from '../content/lorem.js'
import '../../styles/extra-media.css'

/* ---------------------------------------------------------------- page-level hooks ---------------------------------------------------------------- */
export function useDarkTheme() {
  useEffect(() => {
    document.body.dataset.theme = 'dark'
    return () => { delete document.body.dataset.theme }
  }, [])
}

// Per-page Google Fonts load (spec §2: Fira Mono only on the podcast pages).
export function useFont(id, href) {
  useEffect(() => {
    if (document.getElementById(id)) return
    const l = document.createElement('link')
    l.id = id
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
  }, [id, href])
}
export const FIRA_MONO = 'https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap'

/* ---------------------------------------------------------------- platform glyphs (generic shapes, not brand logos) ---------------------------------------------------------------- */
const G = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round', strokeLinecap: 'round' }
const GLYPHS = {
  video: (s) => <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="3" {...G} /><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" /></svg>,
  stream: (s) => <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" {...G} /><path d="M7 9.5c3.4-1 7-.7 10 .9M7.6 12.6c2.8-.7 5.6-.5 8.1.8M8.3 15.4c2.2-.5 4.3-.3 6.2.6" {...G} /></svg>,
  podcast: (s) => <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="10" r="2.6" {...G} /><path d="M12 13v7.5M7.5 14.5a6 6 0 1 1 9 0M5 17a9 9 0 1 1 14 0" {...G} /></svg>,
}
const PLATFORMS = [['video', 'Video platform'], ['stream', 'Streaming platform'], ['podcast', 'Podcast app']]

// size 48 (44 <960) hero tiles, 40 latest / episode header; tiles: bg rgba(0,0,0,.25), 1px #3A3A3A; hover border + icon sky.
export function PlatformTiles({ size = 40, className = '' }) {
  const box = size === 48 ? 'h-[44px] w-[44px] lg:h-[48px] lg:w-[48px]' : 'h-[36px] w-[36px] lg:h-[40px] lg:w-[40px]'
  return (
    <div className={`flex ${size === 48 ? 'gap-[12px]' : 'gap-[8px]'} ${className}`}>
      {PLATFORMS.map(([k, label]) => (
        <span key={k} role="img" aria-label={label}
          className={`flex ${box} items-center justify-center border border-[#3A3A3A] bg-[rgba(0,0,0,0.25)] text-[#F8F8F7] transition-colors duration-150 hover:border-sky hover:text-sky`}>
          {GLYPHS[k](size === 48 ? 24 : 20)}
        </span>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- terminal prompt chip ---------------------------------------------------------------- */
// H2 wrapper keeps the original's Mono 40/48 (32/44.8 MD, 24/33.6 SM) line box around the inline chip.
export function PromptChip({ verb, arg, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={`m-0 font-mono font-normal text-ink text-[24px] leading-[33.6px] md:text-[32px] md:leading-[44.8px] lg:text-[40px] lg:leading-[48px] ${className}`}>
      <span className="inline-flex gap-[8px] border border-[#2A2A2A] bg-[#0A0A0A] px-[14px] py-[8px] font-mono text-[13px] lowercase leading-[15.6px] tracking-[0.52px] lg:px-[16px] lg:py-[10px] lg:text-[14px] lg:leading-[16.8px] lg:tracking-[0.56px]">
        <span className="text-[#555555]">$</span>
        <span className="text-gray-500">{verb}</span>
        <span className="text-sky">{arg}</span>
      </span>
    </Tag>
  )
}

/* ---------------------------------------------------------------- unlock card ---------------------------------------------------------------- */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function UnlockCard({ className = '', onUnlock }) {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(true)
  const valid = EMAIL.test(email)
  return (
    <div className={`flex flex-col gap-[14px] border border-sky bg-[#0A0A0A] p-[20px] shadow-[0_0_0_1px_rgba(151,212,255,0.15),0_8px_24px_rgba(0,0,0,0.45)] lg:gap-[16px] lg:p-[22px] ${className}`}>
      <h3 className="m-0 flex flex-wrap items-baseline gap-[8px] font-mono text-[16px] font-normal lowercase leading-[19.2px] tracking-[0.32px] text-[#F8F8F7] lg:text-[17px] lg:leading-[20.4px] lg:tracking-[0.34px]">
        <span className="text-gray-600">$</span><span className="text-gray-500">sudo</span>
        <span className="font-semibold text-[#F8F8F7]">unlock</span><span className="text-sky">--all-shows</span>
      </h3>
      <p className="m-0 font-sans text-[13px] font-light leading-[18.85px] tracking-[0.26px] text-[#C0C0C0]">{chars(38, 9301)}</p>
      <form className="flex flex-col gap-[12px]" onSubmit={(e) => { e.preventDefault(); if (valid) onUnlock?.() }}>
        <TextInput variant="hide" type="email" label="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="ea-input" />
        <Checkbox variant="solid" label={chars(37, 9302).replace(/\.$/, '')} checked={ok} onChange={(e) => setOk(e.target.checked)} className="ea-check" />
        <button type="submit" disabled={!valid}
          className={`mt-[4px] h-[46px] w-full border-0 font-mono text-[14px] font-bold uppercase leading-[14px] tracking-[0.84px] transition-[transform,box-shadow,background-color] duration-[120ms] ${valid ? 'cursor-pointer bg-sky text-black' : 'cursor-not-allowed bg-[#2A2A2A] text-gray-500'}`}>
          Unlock
        </button>
      </form>
    </div>
  )
}

/* ---------------------------------------------------------------- X9 hero ---------------------------------------------------------------- */
// Own block-letter wordmark (6 rows, 7 columns per letter); not the original ASCII art.
const LETTERS = {
  E: ['███████', '██     ', '██████ ', '██     ', '██     ', '███████'],
  X: ['██   ██', ' ██ ██ ', '  ███  ', '  ███  ', ' ██ ██ ', '██   ██'],
  P: ['██████ ', '██   ██', '██████ ', '██     ', '██     ', '██     '],
  L: ['██     ', '██     ', '██     ', '██     ', '██     ', '███████'],
  A: [' █████ ', '██   ██', '███████', '██   ██', '██   ██', '██   ██'],
  I: ['███████', '  ███  ', '  ███  ', '  ███  ', '  ███  ', '███████'],
  N: ['███  ██', '████ ██', '██ ████', '██  ███', '██   ██', '██   ██'],
  Y: ['██   ██', ' ██ ██ ', '  ███  ', '  ███  ', '  ███  ', '  ███  '],
  Z: ['███████', '    ██ ', '   ██  ', '  ██   ', ' ██    ', '███████'],
}
// 59 columns per row (7 letters x 7 + 6 gaps + 4 trailing) -> 472px at Fira Mono 15px / ls -1, like the original box.
const word = (w) => Array.from({ length: 6 }, (_, r) => `${[...w].map((c) => LETTERS[c][r]).join(' ')}    `).join('\n')

export function PodcastHero() {
  return (
    <section className="relative pb-[12px] pt-[72px] text-[#F8F8F7] lg:pb-[16px] lg:pt-[112px] xl:pb-[20px] xl:pt-[144px]">
      <div className="grid grid-cols-1 gap-[28px] lg:grid-cols-[568px_320px] lg:gap-[32px] xl:grid-cols-[890px_320px]">
        <div className="min-w-0">
          <div className="mb-[20px] font-mono text-[12px] leading-[12px] tracking-[1.44px] text-sky lg:mb-[28px] lg:text-[13px] lg:leading-[13px] lg:tracking-[1.56px]">~/motherduck/podcast</div>
          <div className="relative flex">
            <h1 className="sr-only">Explain Analyze</h1>
            <div className="flex flex-col gap-[2px] xl:gap-[4px]" aria-hidden="true">
              <pre className="ea-ascii">{word('EXPLAIN')}</pre>
              <pre className="ea-ascii">{word('ANALYZE')}</pre>
            </div>
            {/* block cursor: `cursor-block` blink (extra-media.css .ea-cursor, measured) */}
            <span aria-hidden="true" className="ea-cursor mb-[2px] ml-[8px] block h-[42px] w-[18px] shrink-0 self-end bg-sky md:h-[60px] md:w-[24px] lg:h-[78px] lg:w-[32px] xl:h-[90px] xl:w-[38px]" />
          </div>
          <div className="mt-[24px] flex flex-col gap-[4px] font-mono text-[14px] lg:mt-[36px] leading-[23.8px] text-[#F8F8F7] lg:text-[17px] lg:leading-[28.9px] xl:text-[19px] xl:leading-[32.3px]">
            {[31, 36, 23].map((n, k) => (
              <span key={k} className="block"><span className="text-sky">&gt;</span> {chars(n - 2, 9310 + k)}</span>
            ))}
          </div>
          <PlatformTiles size={48} className="mt-[24px] lg:mt-[32px]" />
        </div>
        <div><UnlockCard className="w-full lg:w-[320px]" /></div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- X9 latest ---------------------------------------------------------------- */
function Meta({ items, card = false, className = '' }) {
  return (
    <p className={`m-0 flex flex-wrap gap-x-[12px] font-mono text-[12px] font-light leading-[16.8px] text-gray-500 ${card ? 'gap-y-[6px] tracking-[0.48px]' : 'gap-y-[4px] tracking-[0.72px]'} ${className}`}>
      {items.filter(Boolean).map((t) => <span key={t}>{t}</span>)}
    </p>
  )
}

function YtFrame({ className = '' }) {
  return (
    <div className={`border border-[#2A2A2A] bg-black ${className}`}>
      <PlayFrame className="aspect-video w-full" />
    </div>
  )
}

export function LatestEpisode({ ep }) {
  const to = `/explain-analyze/${ep.slug}`
  return (
    <section className="pb-[32px] lg:pb-[48px]">
      <PromptChip verb="cat" arg="latest-episode" className="mb-[16px]" />
      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[508px_380px] lg:gap-[32px] xl:grid-cols-[830px_380px]">
        <div className="flex min-w-0 flex-col gap-[12px]">
          <Link to={to} className="group flex flex-col gap-[8px] no-underline">
            <h3 className="m-0 font-mono font-normal uppercase text-white transition-colors duration-150 ease-[ease] group-hover:text-sky text-[22px] leading-[25.3px] md:text-[24px] md:leading-[27.6px] xl:text-[28px] xl:leading-[32.2px]">{ep.title}</h3>
            <Meta items={[ep.dateLong, ep.duration]} />
            <p className="m-0 font-sans text-[14px] font-light leading-[21px] tracking-[0.28px] text-[#F8F8F7]">{ep.tagline}</p>
          </Link>
          <p className="m-0 font-sans text-[14px] font-light leading-[21.7px] tracking-[0.28px] text-[#C0C0C0]">{ep.summary}</p>
          <PlatformTiles className="mt-[4px]" />
          <Placeholder label="Audio player embed" className="h-[152px] w-full !bg-[#1F1F1F]" bordered={false} rounded="" kind="none" />
          <Link to={to} className="group flex w-fit items-center gap-[8px] border border-sun px-[16px] py-[12px] font-mono text-[13px] uppercase leading-[13px] tracking-[0.78px] text-sun no-underline transition-colors duration-150 hover:bg-sun hover:text-black">
            See show notes
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" /></svg>
          </Link>
        </div>
        <div><YtFrame className="w-full lg:w-[380px]" /></div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- X9 grid ---------------------------------------------------------------- */
function EpisodeCard({ ep }) {
  return (
    <div className="flex flex-col border border-[#1F1F1F] bg-[#111111] transition-[border-color,transform] duration-150 ease-[ease] hover:-translate-y-[2px] hover:border-sky">
      <Link to={`/explain-analyze/${ep.slug}`} className="flex flex-1 flex-col text-[#F8F8F7] no-underline">
        {/* 16:9 applies to the border-box (img 384.9 + 1px border @768), as on the original */}
        <div className="relative aspect-video border-b border-[#1F1F1F] bg-[#0A0A0A]">
          <Placeholder label="Episode thumbnail" rounded="" bordered={false} className="!absolute inset-0 !h-full !w-full" />
        </div>
        <div className="flex flex-col gap-[8px] px-[16px] pb-[12px] pt-[16px] lg:px-[20px] lg:pb-[14px] lg:pt-[20px]">
          <Meta card items={[ep.date, ep.duration, ep.guest && `with ${ep.guest}`]} />
          <h2 className="m-0 font-mono font-normal uppercase text-white text-[17px] leading-[20.4px] md:text-[19px] md:leading-[22.8px]">{ep.title}</h2>
          <p className="m-0 line-clamp-2 font-sans text-[15px] font-light leading-[22.5px] tracking-[0.3px] text-[#C0C0C0]">{ep.summary}</p>
        </div>
      </Link>
      <div className="flex gap-[4px] border-t border-[#1A1A1A] px-[12px] pb-[12px] pt-[8px] lg:px-[16px] lg:pb-[14px]">
        {PLATFORMS.map(([k, label]) => (
          <span key={k} role="img" aria-label={label} className="flex h-[30px] w-[30px] items-center justify-center text-gray-400 transition-colors duration-150 hover:text-sky">{GLYPHS[k](18)}</span>
        ))}
      </div>
    </div>
  )
}

export function EpisodeGrid({ items }) {
  return (
    <div className="pt-[16px]">
      <PromptChip verb="ls" arg="episodes" className="mb-[32px]" />
      <div className="grid grid-cols-1 gap-[24px] pb-[96px] lg:grid-cols-2 lg:gap-[32px] xl:grid-cols-3">
        {items.map((ep) => <EpisodeCard key={ep.slug} ep={ep} />)}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- X10 episode ---------------------------------------------------------------- */
export function EpisodeBack() {
  return (
    <div className="mb-[12px] mt-[24px] inline-block px-[4px] xl:mb-[16px] xl:mt-[32px]">
      <UnderlineLink to="/explain-analyze" icon="left" className="flex-row-reverse !text-sky" labelClassName="!border-sky">BACK TO EXPLAIN ANALYZE</UnderlineLink>
    </div>
  )
}

function Chapters({ items }) {
  const SPEEDS = ['1x', '1.25x', '1.5x', '2x'] // values after 1.25x UNMEASURED
  const [speed, setSpeed] = useState(0)
  const [cur, setCur] = useState(0)
  return (
    <div className="overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="flex items-center justify-between gap-[12px] border-b border-[#2A2A2A] px-[14px] py-[10px]">
        <span className="font-mono text-[12px] uppercase leading-[12px] tracking-[0.72px] text-[#C0C0C0]">Chapters</span>
        <button type="button" onClick={() => setSpeed((s) => (s + 1) % SPEEDS.length)}
          className="cursor-pointer rounded-sm border border-[#2A2A2A] bg-transparent px-[8px] py-[3px] font-mono text-[12px] leading-[12px] tracking-[0.48px] text-[#F8F8F7]">{SPEEDS[speed]}</button>
      </div>
      <ul className="m-0 max-h-[260px] list-none overflow-auto p-[4px] lg:max-h-[320px]">
        {items.map((c, k) => (
          <li key={k} role="button" tabIndex={0} onClick={() => setCur(k)} onKeyDown={(e) => e.key === 'Enter' && setCur(k)}
            className={`flex cursor-pointer items-baseline gap-[10px] border-l-2 border-transparent px-[10px] py-[8px] hover:bg-[rgba(255,255,255,0.06)] ${k === cur ? 'bg-[rgba(255,255,255,0.06)]' : ''}`}>
            <span className="w-[46px] shrink-0 font-mono text-[12px] leading-[12px] text-[#C0C0C0]">{c.t}</span>
            <span className="font-sans text-[14px] leading-[19.6px] text-[#ECE5DD]">{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LinkItem({ text }) {
  return <li className="pl-[23px] font-mono text-[15px] leading-[22.5px] text-[#F8F8F7] underline">{text}</li>
}

function Paywall({ ep }) {
  const [open, setOpen] = useState(false) // local unlock (behaviour after unlock UNMEASURED)
  return (
    <section className="mt-[16px]">
      <div>
        <PromptChip verb="cat" arg="links" className="mb-[12px]" />
        <ul className="m-0 flex list-none flex-col gap-[6px] p-0">
          {ep.links.slice(0, 2).map((t) => <LinkItem key={t} text={t} />)}
        </ul>
      </div>
      <div className="relative mt-[24px]">
        <div className={open ? '' : 'ea-locked'} aria-hidden={!open}>
          <ul className="m-0 mb-[24px] flex list-none flex-col gap-[6px] p-0">
            {ep.links.slice(2).map((t) => <LinkItem key={t} text={t} />)}
          </ul>
          <PromptChip verb="cat" arg="notes" className="mb-[12px]" />
          <ArticleProse blocks={ep.notes} tone="dark" />
        </div>
        {!open && (
          <div className="absolute inset-0 z-[2] flex justify-center pt-[56px]">
            <UnlockCard className="h-fit w-full max-w-[440px]" onUnlock={() => setOpen(true)} />
          </div>
        )}
      </div>
    </section>
  )
}

// Light Transcript (content/videos.jsx) rebuilt in the dark tone (that file is not chunk-owned, so no tone prop was added).
// Loads expanded: max-height 640 (XL) / 520 (below XL, measured); a header click collapses it to 220 and shows the fade.
function DarkTranscript({ lines }) {
  const [full] = useState(() => (typeof window !== 'undefined' && window.matchMedia('(min-width: 1302px)').matches ? 640 : 520))
  const [tall, setTall] = useState(true)
  return (
    <section className="relative -mb-[24px] mt-[64px] overflow-hidden border-2 border-[#2A2A2A] lg:col-span-2 xl:mb-0 xl:mt-[80px]">
      <div role="button" tabIndex={0} onClick={() => setTall((t) => !t)} onKeyDown={(e) => e.key === 'Enter' && setTall((t) => !t)}
        className="flex cursor-pointer items-center justify-between gap-[12px] border-b-2 border-[#2A2A2A] bg-[#0A0A0A] px-[20px] py-[16px] lg:px-[24px] lg:py-[19px]">
        <h2 className="m-0 font-mono text-[14px] font-normal uppercase leading-[19.6px] tracking-[0.7px] text-[#F8F8F7] lg:text-[16px] lg:leading-[19.2px] lg:tracking-[0.8px]">Transcript</h2>
        <div className="flex items-center gap-[14px]">
          <button type="button" onClick={(e) => e.stopPropagation()}
            className="cursor-pointer rounded-sm border border-[#2A2A2A] bg-transparent px-[10px] py-[5px] font-sans text-[12px] font-semibold uppercase leading-[12px] tracking-[0.48px] text-sky">Copy</button>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`text-[#F8F8F7] ${tall ? 'rotate-180' : ''}`}>
            <path d="M5 8.5 12 15.5 19 8.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-auto transition-[max-height] duration-300 ease-[ease]" style={{ maxHeight: tall ? full : 220 }}>
          <div className="px-[20px] py-[16px] lg:px-[24px] lg:py-[20px]">
            {lines.map((l, k) => (
              <p key={k} className="m-0 flex cursor-pointer gap-[12px] border-l-2 border-transparent px-[12px] py-[8px]">
                <span className="w-[40px] shrink-0 font-mono text-[13px] font-light leading-[20.8px] tracking-[0.32px] text-[#C0C0C0]">{l.t}</span>
                <span className="font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] text-[#F8F8F7]">{l.text}</span>
              </p>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-[80px] bg-[linear-gradient(transparent,#0A0A0A)] transition-opacity duration-300 ${tall ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </section>
  )
}

export function EpisodeBody({ ep }) {
  return (
    <div className="max-w-[1080px] pb-[96px] text-[#F8F8F7] lg:pb-[128px]">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[508px_380px] lg:gap-x-[32px] xl:grid-cols-[668px_380px]">
        <div className="min-w-0">
          <div className="flex flex-col gap-[12px]">
            <h1 className="m-0 font-mono font-normal uppercase text-white text-[24px] leading-[26.4px] md:text-[28px] md:leading-[30.8px] xl:text-[34px] xl:leading-[37.4px]">{ep.title}</h1>
            <Meta items={[ep.date, ep.duration]} />
            <p className="m-0 font-sans text-[15px] font-light leading-[22.5px] tracking-[0.3px] text-[#F8F8F7]">{ep.pageTagline}</p>
            <p className="m-0 font-sans text-[16px] font-light leading-[24px] tracking-[0.32px] text-[#C0C0C0]">{ep.summary}</p>
            <PlatformTiles className="mt-[4px]" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-[16px] lg:row-span-2">
          <YtFrame className="w-full" />
          <Chapters items={ep.chapters} />
        </div>
        <div className="min-w-0"><Paywall ep={ep} /></div>
        {ep.transcript.length > 0 && <DarkTranscript lines={ep.transcript} />}
      </div>
    </div>
  )
}
