// X6 author page blocks (PAGES_SPEC_EXTRA §5 X6): hero, "N BLOG POSTS AND VIDEOS" grid (PostCard + VideoCard,
// reveal-up + lift 14), links, and the subscribe band (About ContactBand frame with a form inside).
import { useState } from 'react'
import { Container, Placeholder, UnderlineLink, TextInput, Checkbox, OffsetButton } from '../ui'
import { PostCard, FEED_GRID } from '../content/feedCards.jsx'
import { VideoCard } from '../content/videos.jsx'
import { TiltedTag, Doodle } from '../company/bits.jsx'
import { chars } from '../content/lorem.js'
import { SocialGlyph } from '../footer/icons.jsx'
import '../../styles/extra-content.css'

/* Decorative sticker over the photo corner (neutral kit shape, not a brand mark). */
function Sticker({ className = '' }) {
  return (
    <svg viewBox="0 0 62 66" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path d="M31 2 39 20 59 18 47 34 58 52 38 50 31 64 24 50 4 52 15 34 3 18 23 20Z" fill="#FFDE00" stroke="#383838" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
/* 207x186 outline doodle at the hero's right edge (generic loop, ink stroke). */
function HeroDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 207 186" fill="none" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path d="M4 120c18-70 70-112 120-96s70 72 30 98-96 8-86-36 70-66 110-44 30 70 0 88" stroke="#383838" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Photo({ seed, className = '' }) {
  return (
    <div className={`relative h-[340px] w-[340px] shrink-0 border-2 border-ink ${className}`}>
      <Placeholder kind="avatar" seed={seed} rounded="" bordered={false} label="Author headshot" className="!h-full !w-full" />
      <Sticker className="left-[249px] top-[306px] h-[52px] w-[49px] lg:left-[216px] lg:top-[304px] lg:h-[66px] lg:w-[62px]" />
    </div>
  )
}

const BODY = 'm-0 font-sans text-[16px] font-light leading-[25.6px] tracking-[0.32px] text-ink'

/* One H1 for every width: <960 a single column (H1, photo, role, bio); >=960 a 340 | 498 grid whose text rows
   sit between two 1fr rows, i.e. vertically centred on the photo (gap 40, text column translateY(-4)). */
export function AuthorHero({ a }) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink pb-[80px] pt-[55px] lg:pb-[104px] lg:pt-[100px] xl:py-[110px]">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_498px] lg:grid-rows-[1fr_auto_auto_auto_auto_1fr] lg:gap-x-[40px]">
          <h1 className="xc-mono xc-author-h1 m-0 pb-[24px] text-ink lg:col-start-2 lg:row-start-2 lg:-translate-y-[4px] lg:py-[8px]">{a.name}</h1>
          <Photo seed={a.seed} className="mb-[40px] lg:col-start-1 lg:row-span-6 lg:row-start-1 lg:mb-0" />
          <p className={`${BODY} mb-[16px] md:text-[20px] md:leading-[32px] md:tracking-[0.4px] lg:col-start-2 lg:row-start-3 lg:-translate-y-[4px]`}>{a.role}</p>
          <p className={`${BODY} lg:col-start-2 lg:row-start-4 lg:-translate-y-[4px]`}>{a.bio}</p>
          {a.social > 0 && (
            // profile links are external -> non-link icons (24px, gap 16, padding-top 8, 16 below the bio)
            <div className="mt-[16px] flex gap-[16px] pt-[8px] lg:col-start-2 lg:row-start-5 lg:-translate-y-[4px]">
              {['network', 'post', 'chat', 'video', 'network'].slice(0, a.social).map((k, j) => (
                <span key={j} role="img" aria-label="Profile link" className="flex h-[24px] w-[24px] text-ink"><SocialGlyph kind={k} /></span>
              ))}
            </div>
          )}
        </div>
      </Container>
      <HeroDoodle className="right-[-60px] top-[55px] hidden h-[186px] w-[207px] md:block lg:top-[100px] xl:top-[110px]" />
    </section>
  )
}

export function AuthorGrid({ a }) {
  const n = a.total ?? a.items.length
  return (
    <section className="pb-[112px] pt-[56px] lg:pb-[160px] lg:pt-[104px]">
      <Container>
        <h2 className="m-0 font-mono text-[24px] font-normal uppercase leading-[33.6px] text-ink lg:text-[32px] lg:leading-[44.8px]">{n} Blog posts and videos</h2>
        <div className={`${FEED_GRID} pb-[64px] pt-[32px] lg:pb-[80px] lg:pt-[48px]`}>
          {a.items.map((it, k) => (it.kind === 'post'
            ? <PostCard key={k} item={it} to={it.to} />
            : <VideoCard key={k} v={it.v} />))}
        </div>
        <div className="flex flex-col items-center gap-[40px]">
          <UnderlineLink to="/blog">SEE ALL BLOG POSTS</UnderlineLink>
          <UnderlineLink to="/videos">SEE ALL VIDEOS</UnderlineLink>
        </div>
      </Container>
    </section>
  )
}

export function AuthorSubscribe() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  return (
    <section id="subscribe" className="relative border-y-2 border-ink bg-sun">
      <Container className="absolute inset-x-0 -top-[2px]">
        <TiltedTag bg="#FF7169" className="xc-sub-tag absolute left-[24px] top-0 text-[18px] leading-[25.2px] md:left-[32px] md:text-[32px] md:leading-[44.8px] lg:left-[64px] xl:left-[86px]">
          Subscribe
        </TiltedTag>
      </Container>
      <div className="relative overflow-hidden">
        <Doodle kind="cloud" size={232} className="absolute hidden md:left-[74.8px] md:top-[380.7px] md:block md:h-[148px] md:w-[162px] lg:left-[214.8px] lg:top-[330.7px] xl:left-[57px] xl:top-[299px] xl:h-[211px] xl:w-[232px]" />
        <Container className="relative flex min-h-[508px] flex-col pt-[92px] md:min-h-[450px] md:justify-center md:py-0 md:pl-[94px] lg:min-h-[400px] lg:pl-[160px] xl:pl-[254px]">
          <form className="relative z-[1] w-full max-w-[418px]" onSubmit={(e) => e.preventDefault()}>
            <h3 className="m-0 pb-[28px] font-mono text-[18px] font-normal uppercase leading-[25.2px] text-ink lg:text-[24px] lg:leading-[33.6px] xl:pb-[32px]">Subscribe to MotherDuck Blog</h3>
            <div className="flex flex-col gap-[20px]">
              <TextInput label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Checkbox variant="solid" checked={ok} onChange={(e) => setOk(e.target.checked)} label={chars(42, 7311).replace(/\.$/, '')} />
              <div className="mt-[4px]">
                <OffsetButton size="lg" type="submit" disabled={!email || !ok} disabledStyle>Submit</OffsetButton>
              </div>
            </div>
          </form>
          <div className="mt-[24px] self-center md:absolute md:left-[434px] md:top-[120px] md:mt-0 lg:left-[640px] lg:top-[56px] xl:left-[792px] xl:top-[32px]">
            <Placeholder kind="mascot" seed={1} rounded="" bordered={false} label="Mascot illustration"
              className="h-[266px] w-[298px] md:h-[246px] md:w-[278px] lg:h-[288px] lg:w-[320px] xl:h-[336px] xl:w-[370px]" />
          </div>
        </Container>
      </div>
    </section>
  )
}
