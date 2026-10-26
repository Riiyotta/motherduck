// /try (PAGES_SPEC_EXTRA §12 X22): on the original a separate Next app (AI chat). Decision: a static shell with the
// same layout, colours and type and a non-functional prompt input: no AI calls, no network requests.
// Like the original there is no site header / footer (App.jsx renders /try bare): the root is a 100dvh flex column
// with overflow hidden and only the prompt area scrolls. Breakpoints are the original app's own (640 / 1024).
import { useEffect, useState } from 'react'
import { Placeholder } from '../../components/ui'
import { chars, exactTitle } from '../../components/content/lorem.js'
import '../../styles/extra-media.css'

const FONTS = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&family=Geist:wght@400;500;600&display=swap'

const CHIP = {
  analyze: 'text-[#74D4FF] bg-[rgba(0,188,255,0.15)]',
  dive: 'text-[#5EE9B5] bg-[rgba(0,215,148,0.15)]',
  flight: 'text-[#FFD23F] bg-[rgba(255,208,60,0.15)]',
  guide: 'text-[#C4B4FF] bg-[rgba(168,134,255,0.15)]',
}
// Six sample prompt cards: title / description lengths and chip sets as measured; copy generated.
const CARDS = [
  [8, 66, ['analyze', 'dive']], [14, 48, ['analyze', 'dive']], [15, 48, ['analyze', 'flight', 'dive']],
  [18, 51, ['analyze', 'flight', 'dive']], [17, 64, ['analyze', 'dive']], [32, 56, ['analyze', 'guide'], true],
]

function Chips({ list }) {
  return (
    <span className="ml-auto flex shrink-0 gap-[4px]">
      {list.map((c) => (
        <span key={c} className={`rounded-[4px] px-[6px] py-[2px] text-[9px] font-semibold uppercase leading-[13.5px] tracking-[0.225px] ${CHIP[c]}`}>{c}</span>
      ))}
    </span>
  )
}

function Tip({ className = '', onClose }) {
  return (
    <aside className={`relative border-[#D5CAB6] bg-[#FFFDF7] text-[#2B2820] ${className}`}>
      <div className="relative">
        <button type="button" aria-label="Dismiss tip" onClick={onClose}
          className="absolute right-[-4px] top-[-4px] flex h-[28px] w-[28px] cursor-pointer items-center justify-center border-0 bg-transparent text-[16px] text-[#8C8672]">×</button>
        <p className="m-0 pr-[20px]"><strong className="font-semibold text-[#2B2820]">{chars(64, 9701).replace(/\.$/, '.')}</strong></p>
      </div>
    </aside>
  )
}

const Glyph = ({ d }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
)

export default function Try() {
  const [tip, setTip] = useState(true)
  const [duck, setDuck] = useState(true)
  const [tab, setTab] = useState(1)
  useEffect(() => {
    if (!document.getElementById('font-try')) {
      const l = document.createElement('link')
      l.id = 'font-try'; l.rel = 'stylesheet'; l.href = FONTS
      document.head.appendChild(l)
    }
  }, [])
  const btn = 'flex h-[32px] cursor-pointer items-center border border-[#C9BFAF] bg-[#FAF7F2] text-[#5B5545]'
  return (
    <div className="try-sans flex h-dvh flex-col overflow-hidden bg-[#262624] text-[16px] leading-[24px] text-[#E8E6DC]">
      {/* top bar: 53 tall >=1024 (105 at 768, 182 at 390: wraps, the duck and the tip move inline) */}
      <header className="shrink-0 border-b border-[#DDD3C2] bg-cream text-ink">
        <div className="relative flex flex-wrap items-center gap-x-[8px] gap-y-[8px] px-[12px] py-[8px] min-[640px]:gap-x-[16px] min-[640px]:px-[28px] min-[1024px]:min-h-[52px]">
          <div className="flex items-center gap-[8px]">
            <span className="flex items-center gap-[8px] text-ink">
              <Placeholder kind="mascot" label="Mascot logo" className="h-[28px] w-[31.3px]" bordered={false} rounded="" />
              <span className="text-[15px] font-semibold leading-[22.5px] tracking-[-0.525px] min-[640px]:text-[17px] min-[640px]:leading-[25.5px] min-[640px]:tracking-[-0.595px]">Try MotherDuck!</span>
            </span>
            {duck && <Placeholder kind="mascot" label="Mascot peeking" className="h-[48px] w-[76.8px] min-[1024px]:hidden" bordered={false} rounded="" />}
          </div>
          {tip && (
            <div className="order-last w-full min-[640px]:order-none min-[640px]:ml-auto min-[640px]:w-[446.8px] min-[1024px]:hidden">
              <Tip onClose={() => setTip(false)} className="rounded-[16px] border px-[12px] py-[8px] text-[12px] leading-[19.5px]" />
            </div>
          )}
          <nav className="absolute left-1/2 top-[18px] hidden -translate-x-1/2 gap-[28px] min-[1024px]:flex">
            {['Cookbooks', 'Documentation', 'Agent skills'].map((l) => (
              <span key={l} className="text-[12px] font-medium leading-[16px] text-[#5B5545]">{l}</span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-[8px]">
            <button type="button" onClick={() => setDuck((d) => !d)} className={`${btn} h-[44px] rounded-full px-[12px] text-[12px] font-semibold leading-[16px] min-[640px]:h-[32px]`}>{duck ? 'Hide duck' : 'Show duck'}</button>
            <button type="button" aria-label="Accessibility options" className={`${btn} hidden w-[32px] justify-center rounded-full min-[640px]:flex`}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true"><circle cx="8.5" cy="3" r="1.5" fill="currentColor" /><path d="M3 6h11M8.5 6v4.5M6 15l2.5-4.5L11 15" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
            <span className="border-b border-ink p-[2px] text-[12px] font-medium uppercase leading-[16px] tracking-[0.24px] text-ink">Log in</span>
            <span className="border-2 border-ink bg-sky px-[14px] py-[6px] text-[12px] font-medium uppercase leading-[16px] tracking-[0.24px] text-ink">Start free</span>
          </div>
        </div>
      </header>

      <main className="flex min-h-0 flex-1">
        <section className="try-ui flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="relative flex justify-center px-[8px] pt-[12px] min-[640px]:px-[16px]">
            <div className="flex gap-[4px] rounded-[12px] border border-[#3E3E3A] bg-[#1F1E1B] p-[4px]">
              {[['ChatGPT', 'M6 9h6M9 6v6'], ['Claude', 'M9 4v10M4 9h10M5.5 5.5l7 7M12.5 5.5l-7 7'], ['Copilot', 'M6 7h6v4H6z']].map(([l, d], k) => (
                <button key={l} type="button" onClick={() => setTab(k)}
                  className={`flex cursor-pointer items-center gap-[8px] rounded-[8px] border-0 px-[16px] py-[6px] text-[14px] font-medium leading-[20px] ${tab === k ? 'bg-[#3A3A37] text-[#E8E6DC]' : 'bg-transparent text-[#B8B4A5]'}`}>
                  <Glyph d={d} />{l}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-[12px] min-[640px]:px-[16px]">
            <div className="mx-auto flex min-h-full max-w-[768px] flex-col justify-center py-[16px] min-[640px]:py-[24px]">
              <h1 className="try-serif m-0 text-center text-[24px] font-semibold leading-[32px] tracking-[-0.6px] text-[#E8E6DC]">What do you want to analyze?</h1>
              <p className="mx-auto mb-[24px] mt-[8px] max-w-[520px] text-center text-[12px] leading-[19.5px] text-[#B8B4A5]">{chars(84, 9702)}</p>
              <div className="rounded-[16px] border border-[#3E3E3A] bg-[#30302E] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2),0_4px_6px_-4px_rgba(0,0,0,0.2)]">
                <form onSubmit={(e) => e.preventDefault()}>
                  {/* non-functional: no AI call, no request on submit */}
                  <textarea rows={1} aria-label="Prompt" placeholder="How can I help you explore your data?"
                    className="try-prompt block h-[37px] w-full resize-none border-0 bg-transparent px-[16px] pb-0 pt-[14px] text-[15px] leading-[22.5px] text-[#E8E6DC] outline-none" />
                  <div className="mt-[6px] flex items-center gap-[8px] px-[10px] pb-[10px]">
                    <button type="button" aria-label="Attach file" className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#3E3E3A] bg-transparent text-[#B8B4A5]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3 3v9H4z M8 7v5M5.5 9.5h5" stroke="currentColor" strokeWidth="1.3" /></svg>
                    </button>
                    <div className="ml-auto flex items-center gap-[6px]">
                      <span className="px-[4px] text-[12px] leading-[16px] text-[#8F8B7E]">Default model</span>
                      <button type="submit" disabled aria-label="Send" className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border-0 bg-clay text-[16px] font-semibold text-white opacity-40">↑</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="mt-[24px]">
                <div className="mb-[16px] grid grid-cols-1 gap-[8px] min-[640px]:grid-cols-2">
                  {CARDS.map(([tl, dl, chips, wide], k) => (
                    <button key={k} type="button"
                      className={`flex flex-col gap-[4px] rounded-[8px] border border-[#3E3E3A] bg-[#1F1E1B] p-[12px] text-left ${wide ? 'min-[640px]:col-span-2' : ''}`}>
                      <div className="flex w-full items-center gap-[8px]">
                        <span className="text-[12px] font-semibold leading-[16px] text-[#E8E6DC]">{exactTitle(tl, 9710 + k)}</span>
                        <Chips list={chips} />
                      </div>
                      <p className="m-0 text-[12px] leading-[19.5px] text-[#B8B4A5]">{chars(dl, 9720 + k)}</p>
                    </button>
                  ))}
                </div>
                <div className="mb-[16px]">
                  <button type="button" className="flex items-center gap-[6px] border-0 bg-transparent p-[4px] text-[12px] leading-[16px] text-[#B8B4A5]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m4.5 3 3 3-3 3" stroke="currentColor" strokeWidth="1.3" /></svg>
                    <span aria-hidden="true">✨</span>Explore more prompt ideas
                  </button>
                </div>
                <p className="m-0 pt-[4px] text-center text-[12px] leading-[16px] text-[#8F8B7E]">{chars(48, 9703)}</p>
              </div>
            </div>
          </div>
        </section>
        {/* right rail (>=1024): 44 wide, cream, sticky */}
        <aside className="sticky top-0 hidden w-[44px] shrink-0 flex-col items-center bg-cream py-[12px] text-[#1C1A14] min-[1024px]:flex">
          <Placeholder kind="mascot" label="Mascot logo" className="mb-[8px] h-[16px] w-[17.9px]" bordered={false} rounded="" />
          <button type="button" aria-label="Expand panel" className="cursor-pointer border-0 bg-transparent px-[8px] py-[4px] text-[16px] leading-[24px] text-[#5B5545]">«</button>
          <div className="mt-[16px] flex flex-col items-center gap-[12px]">
            <span className="h-[8px] w-[8px] rounded-full bg-[#A8A193]" />
            <span className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#7D7663] [writing-mode:vertical-rl]">Live infra</span>
          </div>
        </aside>
      </main>

      {/* >=1024: fixed tip bubble + peeking mascot at the bottom right */}
      {tip && (
        <Tip onClose={() => setTip(false)} className="!fixed bottom-[80.5px] right-[16px] hidden w-[300px] rounded-[16px] border-2 border-ink p-[12px] text-[14px] leading-[19.25px] min-[1024px]:block" />
      )}
      {duck && <Placeholder kind="mascot" label="Mascot peeking" className="!fixed bottom-0 right-[12px] hidden h-[60px] w-[96px] min-[1024px]:flex" bordered={false} rounded="" />}
    </div>
  )
}
