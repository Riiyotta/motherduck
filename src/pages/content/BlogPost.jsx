// L2 /blog/:slug: ArticleLayout (hero, prose, sidebar TOC + RecCarousel, floating Get Started) -> SubscribeBand.
import { useMemo } from 'react'
import { useParams as useRouteParams } from 'react-router-dom'
import { Container, OffsetButton, UnderlineLink } from '../../components/ui'
import ArticleProse from '../../components/content/ArticleProse.jsx'
import RecCarousel from '../../components/content/RecCarousel.jsx'
import { BlogToc } from '../../components/content/Toc.jsx'
import { SubscribeBand } from '../../components/content/subscribe.jsx'
import { BackLink } from '../../components/content/bits.jsx'
import { genArticle, genProfileBody, headingsOf } from '../../components/content/articleGen.js'
import { BLOG_PAGE1, BLOG_PROFILES } from '../../components/content/blogProfiles.js'
import { getPost, blogPosts, authorPath, webinarPath } from '../../components/content/data.js'
import { title, exactTitle } from '../../components/content/lorem.js'

/* Generic share glyphs (no third-party logos). Share URLs are external -> buttons with no navigation. */
const SHARE = [
  { label: 'Share on X', d: 'M5 5l14 14M19 5 5 19' },
  { label: 'Share on LinkedIn', d: 'M5 9v10M5 5v.5M10 19v-6a3 3 0 0 1 6 0v6M10 9v10' },
  { label: 'Share on Facebook', d: 'M14 4h3M14 4a3 3 0 0 0-3 3v13M8 11h8' },
]
function ShareRow() {
  return (
    <div className="ct-share relative flex gap-[16px] pl-[72px]">
      {SHARE.map((s) => (
        <button key={s.label} type="button" aria-label={s.label} className="flex h-[24px] w-[24px] items-center justify-center border-0 bg-transparent p-0 text-coral-red transition-colors duration-125 ease-in-out hover:text-sky-hover">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d={s.d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function Hero({ post }) {
  return (
    <header className="lg:col-span-2 xl:col-span-1">
      <div className="pb-[16px] lg:pb-[20px]"><BackLink to="/blog">GO BACK TO BLOG</BackLink></div>
      <h1 className="m-0 max-w-[860px] pb-[16px] font-fono font-normal uppercase text-ink text-article-h1-sm md:pb-[20px] md:text-article-h1-md lg:pb-[26px] lg:text-article-h1">{post.h1}</h1>
      {/* Live: topic chips (Mono 14/19.6, sand-chip, 2px ink, padding 6 14, 32 tall) precede the date */}
      <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[12px] pb-[24px] lg:pb-[20px]">
        <div className="flex flex-wrap gap-[12px]">
          {post.tags.map((t) => (
            <span key={t} className="rounded-sm border-2 border-ink bg-sand-chip px-[14px] py-[6px] font-mono text-[14px] uppercase leading-[19.6px] text-ink">{t}</span>
          ))}
        </div>
        <span className="font-sans text-[14px] leading-[19.6px] tracking-[0.28px] opacity-60"><time>{post.date}</time> · {post.readMin} min read</span>
      </div>
      <div className="flex flex-col items-start gap-[24px] lg:flex-row lg:items-end lg:justify-between xl:max-w-[816px]">
        <div className="flex gap-[8px]">
          <span className="pt-[2px] font-sans text-[16px] uppercase leading-[19.2px]">BY</span>
          <div className="flex flex-wrap gap-x-[5px] gap-y-[4px]">
            {post.authors.map((a) => <UnderlineLink key={a} to={authorPath(a)} icon={null} uppercase className="!border-0" labelClassName="!mb-0 !pb-0 !pt-[1px]">{a}</UnderlineLink>)}
          </div>
        </div>
        <ShareRow />
      </div>
    </header>
  )
}

export default function BlogPost() {
  const { slug } = useRouteParams()
  const base = getPost(slug)
  // Measured live body (blogProfiles.js): by slug (e.g. big-data-is-dead), else the k-th post on /blog page 1 gets the
  // live page-1 post k's block structure; other posts keep the generic mixes.
  const profile = BLOG_PROFILES[slug] || (base.i < BLOG_PAGE1.length ? BLOG_PROFILES[BLOG_PAGE1[base.i]] : null)
  const post = useMemo(() => (profile ? { ...base, h1: exactTitle(profile.h1, base.seed + 5000) } : base), [base, profile])
  const blocks = useMemo(() => (profile ? genProfileBody(profile.b, post.seed) : genArticle(post.seed, post.mix)), [profile, post.seed, post.mix])
  const toc = useMemo(() => headingsOf(blocks), [blocks])
  const rec = useMemo(() => {
    const all = blogPosts()
    return [0, 1, 2].map((k) => {
      const p = all[(post.i + 1 + k * 5) % all.length]
      return k === 1
        ? { chip: 'WEBINAR', title: title(60, post.seed + 77), href: webinarPath(post.i) }
        : { chip: 'BLOG', title: p.title, href: `/blog/${p.slug}` }
    })
  }, [post])

  return (
    <>
      <Container>
        <div className="relative grid grid-cols-1 gap-y-[40px] pb-0 pt-[40px] md:pb-[112px] md:grid-cols-[minmax(0,1fr)_196px] md:gap-x-[40px] lg:grid-cols-[minmax(0,1fr)_250px] lg:pt-[48px] xl:grid-cols-[minmax(0,1fr)_333px] xl:gap-x-0 xl:pb-[176px] xl:pt-[58px]">
          <div className="md:col-span-2 lg:col-span-2 xl:col-span-1 xl:row-start-1"><Hero post={post} /></div>
          <div className="min-w-0 md:col-start-1 xl:row-start-2 xl:max-w-[816px]">
            <ArticleProse blocks={blocks} />
          </div>
          <aside className="flex flex-col gap-[24px] self-start md:sticky md:col-start-2 md:top-[134px] md:ml-auto md:w-[196px] lg:w-[250px] xl:row-span-2 xl:row-start-1 xl:top-[144px] xl:w-[333px]">
            <BlogToc items={toc} />
            <RecCarousel slides={rec} />
          </aside>
          {/* Floating CTA overlay (>=728): sticky to the viewport bottom-right while the article is on screen */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-[-20px] hidden md:block xl:right-[-30px]">
            <div className="pointer-events-auto sticky top-[calc(100%-81px)] z-[2] mb-[45px] ml-auto mr-[20px] mt-0 w-fit xl:mr-[30px]">
              <OffsetButton arrow>Get Started</OffsetButton>
            </div>
          </div>
        </div>
        {/* SM: static after the grid, margin 0 20 45 auto (live) */}
        <div className="mb-[45px] mr-[20px] flex justify-end md:hidden">
          <OffsetButton arrow>Get Started</OffsetButton>
        </div>
      </Container>
      <SubscribeBand />
    </>
  )
}
