Source: https://motherduck.com/

# Content templates: build spec (blog, case studies, videos, ecosystem, hub pages)

Measured live with headless Playwright (Chromium) on 2026-10-23 at 1440, 1280, 768 and 390. Values come from `getComputedStyle`, `getBoundingClientRect` and the site's own CSS rules (read from `document.styleSheets`). Anything not measured is marked **UNMEASURED**.

**Breakpoint shorthand** (same as CLONE_SPEC §0): **XL** ≥1302 · **LG** 960–1301 · **MD** 728–959 · **SM** <728. A value written "a / b / c / d" means XL / LG / MD / SM. "≥960" means both XL and LG.

**Font shorthand:** Mono = `font-mono` (Fragment Mono substituting Aeonik Mono), Fono = `font-fono` (Space Grotesk substituting Aeonik Fono, with +0.01em already in the existing Fono tokens), Inter = `font-sans`. `ink` = #383838. All Mono/Fono headings are UPPERCASE unless stated.

**Content policy:** this spec records roles, character/word/line counts and casing only. Short UI labels (chips, buttons, filter names) are written out. Generate placeholder copy with the same length and render every image, logo, avatar, mascot and thumbnail as `<Placeholder>`.

**Related specs:** global tokens are in `CLONE_SPEC.md` §0. `PAGES_SPEC_COMPANY.md` and `PAGES_SPEC_MARKETING.md` already define several tokens and primitives used here (`filter-bg`, `sand-chip`, `teal`, `coral-red`, `apricot`, `tag-violet`, `tag-blue`, `pill`, `code` radius, `faq-q`/`faq-a`, `text-link`, `toc-*`, `button-lg`, `OffsetButton size="lg"`). This spec re-uses those names and only adds what is missing (§3).

---

## 1. Route → layout map

| # | Layout | Routes | Shared with |
|---|---|---|---|
| L1 | **Feed listing**: centred hero + search/filter panel + card grid + infinite scroll | `/blog`, `/duckdb-news`, `/quacking-around-the-web` | All three use the same `PostCard`, grid, spinner and hidden "load more" link. Blog adds a featured card and the grid subscribe tile. News adds a newsletter digest card. Quack has external cards with a type badge. |
| L2 | **Article** with TOC sidebar | `/blog/:slug` (confirmed on 3 posts) | Prose styles (§6) are shared with L4, L6, L8 and L11 |
| L3 | **Case-study index**: title hero + yellow testimonial carousel + category chips + card grid | `/case-studies` | Chips are shared with L5 and L7 |
| L4 | **Case-study detail**: title + sky quote band with profile card + lede + prose + back-to-top | `/case-studies/:slug` | |
| L5 | **Video index**: sand-grid hero + featured video carousel + chips + search + video grid + infinite scroll | `/videos` | `VideoCard` is reused in L6 |
| L6 | **Video detail**: sand band + player frame + prose + TOC/CTA sidebar + FAQ + related videos | `/videos/:slug` | |
| L7 | **Ecosystem index**: illustrated hero + chips + search + partner grid ×2 + CTA card | `/ecosystem` | |
| L8 | **Partner detail**: sticky logo box + title/tags + prose + link icons | `/ecosystem/:slug` (confirmed on `sigma`, `airbyte`) | |
| L9 | **Learn hub**: centred hero + 2-column card grid (no filters, no paging) | `/learn` | |
| L10 | **Events**: illustrated hero + speaker banner + tabs + search/filter panel + event rows | `/events` | Filter panel is L1's |
| L11 | **Prose page** | `/community-code` | Same idea as COMPANY F1 `LegalPage` but with no TOC |
| L12 | **Dive gallery**: a separate Next.js app (basePath `/dive-gallery`) with its own top nav and pill-style UI | `/dive-gallery` | Only the site footer is shared |

Header and footer are the existing `Header`/`Footer` on every route except L12. Main content starts at y = 122 / 112 / 112 / 142, which matches `--header-total`. The page background is cream.

---

## 2. Global observations for these routes

- **Two display families.** Listing and hub headings use **Aeonik Mono** (`font-mono`). Article titles and prose headings use **Aeonik Fono** (`font-fono`). Keep the family per role as listed. Do not normalise them.
- **AeonikMono-Bold.woff2** is loaded on `/videos`, `/videos/:slug`, `/ecosystem`, `/ecosystem/:slug`, `/events` and `/dive-gallery`. The only measured 700 use is the dive-gallery H1. Fragment Mono has no bold, so either let the browser synthesise it or use `Space Mono 700` for that one role.
- **Scroll reveal exists on these pages, unlike the homepage.** `.scroll-animate-up {opacity:0; transform:translate(0,100px)}` becomes `.scroll-animate-visible {opacity:1; transform:translate(0)}` with `transition: opacity .5s, transform .5s` (ease). It is applied to `PostCard`, `VideoCard`, `SubscribeTile` and `PartnerCard`, but not to the first 3 ecosystem cards. It fires once, when the element's layout top is about 50px inside the viewport bottom (measured at 50px scroll steps: it fires when `rect.top ≤ innerHeight − ~50`). Implement it as an IntersectionObserver with `rootMargin: '0px 0px -50px 0px'`, threshold 0, unobserve after the first hit. Cards already in view on load are visible immediately. Respect `prefers-reduced-motion` and show cards immediately in that case.
- **Card lift pattern** = existing `LiftCard` (ink backing, inner translate on hover at ≥960, 120ms ease-in-out). Every listing card measured `translate(14px,-14px)`. The blog inner `<a>` also has its own `:hover translate(15px,-15px)` rule, but the measured result is 14. Use `lift={14}`.
- **No copy-code buttons** exist anywhere: no `<button>` inside any article body. Code blocks have no language label either.

---

## 3. New tokens (add only if a sibling spec has not already added them)

### 3a. Colours
| Token | Value | Used by |
|---|---|---|
| `filter-bg` (COMPANY) | `#EBE4DD` | SearchFilterPanel bg |
| `sand-chip` (MARKETING) | `#ECE5DD` | inactive category chips, Past tab, SpeakerBanner, video tag links, blog SubscribeBand bg |
| `sand` (existing) | `#ECE6DF` | video sand-grid hero band |
| `sand-dark` (existing) | `#E1D6CB` | chip hover, rec-card chip border, dive borders, secondary button `:active` |
| `field` (MARKETING) | `rgba(248,248,247,0.7)` | inputs and select boxes (select uses .698) |
| `callout` **new** | `#FEEFAD` | blog callout box (left border 4px `yellow-chip-border` #EBCD00) |
| `code-dim-*` **new** (highlight.js "github-dark-dimmed") | bg `#22272E`, text `#ADBAC7`, keyword/doctag/type `#F47067`, title/function `#DCBDFB`, attr/number/literal/operator/variable/meta `#59ACFF`, string/regexp/char `#96D0FF`, built_in/symbol `#F69D50`, comment/code `#768390`, name/quote/selector-tag `#8DDB8C`, section `#316DCA` (700), bullet `#EAC55F`, link/char.escape/prompt `#6CB6FF`, addition `#B4F1B4` on `#1B4721`, deletion `#FFD8D3` on `#78191B` | prose code blocks |
| `inline-code-bg` **new** | `rgba(56,56,56,0.08)` | inline `code` |
| `quote-bar` **new** | `rgba(56,56,56,0.1)` | 5px bar on prose blockquote |
| `rule-faint` **new** | `rgba(56,56,56,0.15)` | case card title divider |
| `coral-red` (COMPANY/MARKETING) | `#FF7169` | share icons, podcast badge, ecosystem link glyphs (tile bg `rgba(255,113,105,0.08)`) |
| `coral-soft` **new** | `#FF9A94` | ecosystem link tile variant (`TSxga`, use UNMEASURED) |
| `apricot` (MARKETING) | `#FFC18A` | event type tag |
| `teal` (COMPANY) | `#50C7B7` | video badge, partner-detail flower (`#50C7B7` fill) |
| Ecosystem category tag bgs **new** | Ingestion `#C8A9F2` (= `tag-violet`), Orchestration `#F38E84`, AI Agents `#38C1B0`, Business Intelligence `#E5F174`, Data Quality `#F5B161`, Transformation `#A5C4D8` (= `tag-blue`), Dev Tools `#F2A6C8`, Data Science & AI `#96B3FE`, Reverse ETL `#F4DC5A`, Data Apps `#A6EC85`; region tags (Europe, North America, DACH, France) `chip-gray` #E8E8E8 | PartnerCard / PartnerDetail tags |
| Quack type badge bgs | News `yellow` #F9EE3E, Article `sky` #97D4FF, Video `teal` #50C7B7, Podcast `coral-red` #FF7169 | PostCard (quack) badge |
| `overlay` **new** | `rgba(56,56,56,0.4)` | partner modal overlay |
| dive-only | pill border `sand-dark`, muted text `gray-500` #818181, pick badge `peach` #FFDCBD + `orange` #FF9538 border, hackathon chip `yellow-chip` #FAF175 (hover `sun`), card image bg `surface-2`, hover overlay `rgba(255,255,255,0.18)` | L12 |

### 3b. Type roles (new). Existing roles are reused where noted.
| Token | XL | LG | MD | SM | Where |
|---|---|---|---|---|---|
| `feed-h1` | Mono 80/96 | 80/96 | 56/67.2 | 30/42 (blog, quack), 32/44.8 (learn, news) | Blog/Learn hero. News: 80/96 · 64/76.8 · 54/64.8 · 32/44.8. Quack: 80/96 · 72/86.4 · 56/67.2 · 30/42 |
| `lede` (existing) | Inter 20/32 300 ls .4 | = | 16/25.6 ls .32 | = | feed hero ledes (centred) |
| `page-h1-sm` (COMPANY) | Mono 56/67.2 | = | 48/57.6 | 30/42 | Case-study index title (centred) |
| `eco-h1` | Mono 56/67.2 ls 1.12 | 48/57.6 ls .96 | = | 24/33.6 ls .48 | Ecosystem hero |
| `hero-tagline-mono` (MARKETING) | Mono 24/33.6 300 ls .48 | 18/25.2 ls .36 | = | 16/22.4 ls .32 | Ecosystem hero sub |
| `events-h1` | Mono 52/62.4 ls 1.04 | 40/48 ls .8 | = | 28/39.2 ls .56 | Events hero |
| `events-lede` | Inter 22/30.8 300 ls .44 | = | = | 18/25.2 ls .36 | Events hero sub |
| `video-h1` | Mono 56/67.2 | 52/62.4 | 42/58.8 | 24/33.6 | Video index hero |
| `section-h2-mono` | Mono 32/38.4 | 32/38.4 | 24/33.6 | 18/25.2 | "Technology/Consulting Partners", video library title. Case index uses 32/**44.8** at XL and 24/33.6 at LG. |
| `article-h1` | Fono 44/52.8 | = | 36/46.8 (case detail 36/50.4) | 28/39.2 | Blog post, case detail |
| `video-detail-h1` | Fono 38/45.6 | 32/38.4 | = | 24/33.6 | Video detail |
| `partner-h1` | Mono 56/67.2 | 32/38.4 | = | 32/44.8 | Partner detail |
| `card-title-mono` | Mono 20/28 | = | 18/25.2 | 18/25.2 | PostCard, VideoCard |
| `featured-title` | Mono 25/35 | 19/26.6 | 17/23.8 | 18/25.2 | Blog featured card |
| `card-date` | Inter 16/25.6 300 ls .32 | = | 14/19.6 ls .28 | = | PostCard date (opacity .6). VideoCard date is 16/25.6 at every width, colour `gray-400` #A1A1A1. |
| `card-excerpt` | Inter 16/25.6 300 ls .32 | = | 14/19.6 ls .28 | = | clamp 7 |
| `subscribe-title` | Mono 24/33.6 ls .48 | = | 18/25.2 ls .36 | (hidden) | SubscribeTile, SubscribeBanner |
| `filter-title` | Inter 18/28.8 400 ls .36 | 16/25.6 ls .32 | = | 16/25.6 (in the toggle bar) | SearchFilterPanel |
| `clear-all` | Inter 14/16.8 400 ls .28 #666 (ink when active) | = | = | = | SearchFilterPanel |
| `select-label` | Inter 16/22.4 300 ls .32 #666 (selected: 400 ink) | = | = | = | dropdown boxes |
| `select-option` | Inter 16/16 300 (hover 700) | = | = | = | dropdown menu |
| `chip-filter` (= `button` 14/16.8) | Inter 14/16.8 400 UPPER | = | = | = | CategoryChips, Events tabs |
| `toc-title-fono` | Fono 18/21.6 ls .36 | 16/22.4 ls .32 | = | (hidden) | Blog TOC title. The video TOC uses COMPANY `toc-title` (Mono 18/25.2 ls .36). |
| `toc-link` (COMPANY) | Inter 16/22.4 300 (blog), 16/25.6 (video); active **600** | 14/19.6 | = | 14/19.6 | TOC items |
| `rec-chip` | Mono 14/19.6 UPPER | 13/18.2 | 12/16.8 | 13/18.2 | Read-next card chip |
| `rec-title` | Fono 18/23.4 300 ls .36 | 16/22.4 ls .32 | 14/19.6 ls .28 | 16/22.4 | Read-next card title (clamp 3) |
| `case-quote-xl` | Inter 24/31.2 600 ls .48 | 22/28.6 ls .44 | 20/26 ls .4 | = | case index carousel quote |
| `person-name-lg` (MARKETING) | Inter 24/28.8 600 ls .48 | 18/28.8 ls .36 | = | 14/19.6 ls .28 | carousel name. Role: Inter 16/25.6 300 ls .32 · 14/19.6 · = · 14/16.8 |
| `case-card-h3` | Inter 24/28.8 600 | = | = | 20/24 | CaseStudyCard |
| `case-card-li` | Inter 16/22.4 400 | 14/19.6 | = | = | CaseStudyCard bullets |
| `case-band-quote` | Inter 22/30.8 400 ls .44 | = | 18/28.8 ls .36 | 16/25.6 ls .32 | case detail band |
| `case-lede` | Inter 20/32 300 ls .4 | 16/25.6 ls .32 | = | = | case detail lede |
| `profile-name` | Inter 24/38.4 600 ls .48 | = | = | 20/32 ls .4 | case profile card. Role: Inter 16/25.6 300 · 14/22.4 · = · = |
| `video-feat-title` | Mono 24/32.4 (lh 135%, word-spacing −.05em) | 24/31.2 | 24/33.6 | 18/25.2 | featured video |
| `duration` | Mono 18/25.2 300 ls .36 white | = | = (featured), 16/22.4 (grid <960) | 16/22.4 | duration badge |
| `video-tag` | Mono 12/16.8 300 ls .24 UPPER | = | = | 10/14 ls .2 | VideoCard tags |
| `kicker-chip` | Mono 12/16.8 UPPER | = | = | = | featured video date and type chips |
| `video-tag-link` | Fono 12/16.8 UPPER | = | = | = | video detail tag links |
| `partner-name` | Mono 24/28.8 (underlined) | = | 24/38.4 | 20/32 | PartnerCard |
| `eco-tag` | Mono 12/16.8 300 ls .24 UPPER | = | = | = | partner tags |
| `event-month` | Mono 24/28.8 | = | 24/33.6 | = | EventRow |
| `event-day` | Mono 56/67.2 | = | 24/33.6 | = | EventRow |
| `event-year` | Mono 16/16 **500** `gray-400` | = | 14/14 | = | EventRow |
| `event-title` | Inter 22/30.8 600 | 18/25.2 | = | = | EventRow |
| `event-loc` | Inter 14/19.6 500 `gray-400` | 13/18.2 | = | = | EventRow |
| `event-tag` | Mono 12/12 **600** UPPER | = | = | = | EventRow type tag |
| `news-digest-h2` | Mono 32/41.6 | = | 28/36.4 | 22/28.6 | News digest card title |
| `news-item` | Mono 18/25.2 **500** underline (offset 3px) | = | 16/22.4 | = | News digest item link |
| `learn-title` | Mono 24/33.6 | = | 18/25.2 | = | LearnCard |
| `faq-q` / `faq-a` (MARKETING) | Mono 23/32.2 / Inter 18/28.8 300 ls .36 | = | 17/23.8 / 15/22.5 | 16/22.4 / 14/21 | video detail FAQ |
| `related-h2` | Mono 40/48 | = | 40/56 | 24/33.6 | "Related Videos" |
| `dive-*` | see L12 block | | | | |

### 3c. Shadows / radii
No new hard shadows. Dive gallery only: `0 2px 12px rgba(0,0,0,0.15)` (hover pill) and `0 4px 16px rgba(0,0,0,0.1)` (sort menu). Radii: `pill` 999px (MARKETING) and `code` 3px (MARKETING) are reused. Sort menu radius 4 = existing `tip`.

### 3d. Motion / keyframes
| Name | Definition | Used by |
|---|---|---|
| `type-in` | `@keyframes {0%{width:0;overflow:hidden} 99.9%{overflow:hidden} 100%{width:100%;overflow:visible}}`, `800ms steps(N) forwards` where N = character count (15 on the original) | Blog hero H1 overlay span (≥728) |
| `caret-blink` | `@keyframes {0%{opacity:1}50%{opacity:0}100%{opacity:1}}` 1.1s ease-in-out infinite on a `::after` "\|" | Blog hero H1. At SM the caret blinks after static text. |
| `caret-cover` | `@keyframes {0%,99.9%{transform:translateX(0)} 100%{transform:translateX(100%)}}` 853.333ms ease forwards, on `::before` (cream bg/colour block at right:0) | Blog hero (≥728) |
| `menu-drop` | from `top: calc(100% - 16px); opacity:0` to `top:100%; opacity:1`, 200ms ease-out forwards | filter dropdown menu (differs from the existing `dropdown-in`, which goes to +16px) |
| spinner | ~66px SVG rotating, animation name `fEWCgj` 1s (keyframe text not readable cross-origin; the sampled matrices are pure rotations). Implement `rotate(360deg) 1s linear infinite` | feed infinite-scroll loader |
| reveal-up | see §2 | cards |
| parallax doodles | wrapper `transition: opacity 300ms ease-out`. `translateY` is scroll-linked (JS). Measured at 1440 on `/blog`: left doodle `306.2 → 435.1 → 564.0` px and right doodle `−85.9 → 46.8 → 179.5` px at scrollY 0/200/400, i.e. **+0.645×scrollY** and **+0.664×scrollY** | Blog, News, Quack hero doodles |
| `fab-pop` | `opacity 0 → 1`, `translateY(15px) → 0`, `0.15s ease-out` | video TOC popover (<1302) |
| `sidebar-in` | `jBcSpD` 250ms ease-out forwards (keyframe UNMEASURED; use a fade, opacity 0 → 1) | video detail sidebar |
| `modal-in` | `ghqoEY` 200ms ease-out (≥960) / `dWInNU` (<960, bottom sheet). Keyframes UNMEASURED; use fade+translateY(16px) and slide-up | partner modal |

---

## 4. Primitives: reuse map

| Need | Existing component | Notes |
|---|---|---|
| Offset buttons | `ui/OffsetButton.jsx` | primary sky / secondary cream. `size="lg"` (56.2 tall, padding 16.5 22, Inter 16/19.2) and `size="md"` (43.8, padding 11.5 18, Inter 14/16.8) per MARKETING 2d. Icon-only square variants are needed here: **44×44** (padding 12 10, Read-next arrows), **54×50** (padding 15, case carousel arrows; 42×38 with padding 10 at MD), **60×56** (padding 18, video TOC FAB) and **64×60** (padding 20, back-to-top). Lift 7 / press 30ms, as now. "View Details" on event rows has **no** button lift (`.imQprf:hover … transform:none`) because the whole row lifts instead. |
| Disabled submit | `OffsetButton disabled` | bg #F8F8F7, 2px #818181 border, text #666, Inter 16/19.2 UPPER, padding 17.4 23 (111.7×58). Hover: bg #F8F8F7. Every newsletter Submit here renders in this state until valid. |
| Underline text link | `ui/UnderlineLink.jsx` | back links ("GO BACK TO BLOG", "GO BACK TO CASE STUDIES", "BACK TO ECOSYSTEM", "BACK TO VIDEOS" with a left arrow and `row-reverse`), "READ MORE", "Learn More", "Read the full newsletter", "Apply to be a speaker" (Mono 16/19.2 UPPER variant), CLEAR ALL (14px, #666 variant, reset icon 18px leading). The back-link chevron is a 20px (16 at SM) chevron rotated 90° with gap 6. |
| Text input | `ui/TextInput.jsx` | Search field = variant `'hide'` plus a **new `icon` prop**: 24px search glyph at left 24, top 18, and input padding-left 64 (placeholder left 64). Email field = variant `'float'`. |
| Checkbox | `ui/Checkbox.jsx` | newsletter consent: `variant="solid"` (ink box, white check). Label Inter 14/22.4 (tile), 16/25.6 (band). |
| FAQ | `ui/Accordion.jsx` (COMPANY G12) | Identical values to the video-detail FAQ (§5 V6). Reuse it. |
| Lift cards | `ui/LiftCard.jsx` | every card below (lift 14) |
| Placeholder | `ui/Placeholder.jsx` | every image |
| Homepage `blog/BlogCard.jsx` | **not reusable as-is**. The homepage card is 16:9 + Fono 18 title + Mono chip + 12px meta. Listing cards use Mono 20 titles, an opacity date line and a 7-line excerpt. Build `PostCard` (below) on `LiftCard`. |
| `customers/CaseCard.jsx` | **not reusable**. That card has tinted hover backgrounds and different internals. Build `CaseStudyCard`. |
| `platform/QuoteCard.jsx` | not used here |
| Logo tooltip (`hero/LogoStrip.jsx` `<summary>` tooltip with 8px rotated nub) | reuse the pattern for ecosystem link icons (§5 E2) |

---

## 5. Block library

Grids below use `Container` (100% / 728 / 960 / 1302 with padding 24 / 20 / 20 / 30).

### F1. `FeedHero` (L1, L9) [NEW]
- **Blog:** section padding 80/0/70 · 90/0/80 · 52/0/42 · 52/0/42. H1 wrapper `width:fit-content; margin:0 auto`; H1 `feed-h1` centred, padding-bottom 30 (≥960) / 8. Typewriter (§3d): the real `<h1>` has opacity 0 and an absolutely positioned `<span>` copy animates. Lede `lede` centred, full width, 1 line @1440 ([55ch/7w]). Hero heights: 308 / 328 / 195 / 195.
- **News:** padding 90/0/100 · 84/0/70 · 64/0/70 · 40/0/40. H1 padding-bottom 32 / 24 / 16 / 8 (SM also padding 0 16). Lede [85ch/12w] centred.
- **Quack:** inner block padding 100/0/120 · 72/0/110 · 36/0/90 · 32/0/48, flex column gap 32/24/16/8. H1 max-width none / 720 / 540 / 290, centred. Lede [62ch/8w].
- **Learn:** padding 110/40/140 (≥960) · 64/40 · 40/24/60. H1 only ("Learn", 5ch), centred, no lede.
- **Doodles:** decorative line SVGs. Do not copy brand art; draw a simple neutral outline shape at the same size and position.
  - Blog: left 207×186 at `top:-240px; left:calc(50% - 785px)` (XL; LG `top:-370; left:calc(50% - 610px)`; hidden <960). Right 272×155 at `top:380px; right:calc(50% - 840px)` (XL; LG `right:calc(50% - 680px)`; MD 175×99 at `top:170; right:calc(50% - 470px)`). SM: one 175×99 doodle at bottom −65, right −136. Parallax per §3d.
  - News: left 190w (`top:-280; left:-120` XL), right 220w (`right:-185; bottom:160` XL), both hidden at SM, parallax.
  - Quack: left 214×150 (`left:-170` XL), right 162×176 (`right:-130`).
  - Learn: right 270w (`bottom:0; right:-110`, rotate −15°; 170w MD, 117w SM), left 200w (`top:70; left:-60`; 120w MD, 75w SM). Static.

### F2. `SearchFilterPanel` (Blog, Events, Quack) [NEW]
- Panel bg `filter-bg`, no border.
- **Header row (≥728):** flex space-between centre, padding 16 20 (XL) / 16. Left "Search and filter" `filter-title`. Right CLEAR ALL (reset icon 18 leading via `row-reverse`, gap 6). Inactive: #666 text, 1px #666 underline. With a filter set: ink. Hover: underline `calc(0.09em + 1px)` #6FC2FF, bg #F8F8F7. `:active`: text and icon #6FC2FF.
- **Fields grid:** padding 0 20 16 (XL) / 0 16 12 (MD–LG); column templates:
  - Blog: `70% 1fr` gap 22 (XL; 841.4 + 338.6 @1440) · `60% 1fr` gap 20 · `1fr 1fr` gap 22.
  - Events: `42% 1fr 1fr` gap 22 (504.8 / 326.6 / 326.6) · `37% 1fr 1fr` gap 20 · MD: search spans 2 columns on row 1, two selects on row 2, gap 22.
  - Quack: `66.4% 1fr` gap 30 (798 / 374) · `56% 1fr` gap 30 · `1fr 1fr` gap 24.
- **Search field:** 58 tall. See §4 TextInput with icon. Placeholder "Search". Hover and focus: border #2BA5FF. Focus: padding-right 24 and the placeholder hides.
- **Select ("Topic" / "Location" / "Type"):** box 58 tall, bg `rgba(248,248,247,.698)`, border 2px ink (1.5px at SM), square corners. Inner padding 15 20, gap 8. Label `select-label` with ellipsis, max-width `calc(100% - 28px)`. Chevron 20px rotates 180° on open (200ms ease-in-out).
  - **Menu:** absolute, `top:100%`, `left:-2px`, `width:calc(100% + 4px)`, bg white, 2px ink border, padding 24, flex column gap 16, max-height 300 (400 for Events at XL), overflow auto, z 3, animation `menu-drop`.
  - **Options:** `select-option`, min-height 18, ellipsis, hover weight 700. Selecting closes the menu.
- **SM (<728):** the header row is replaced by a full-width toggle bar (padding 16 12, cursor pointer): "Search and filter" Inter 16/25.6 400 ls .32 plus a 20px chevron (margin 0 8, rotates on open). The field list is collapsed (`max-height:0; overflow:hidden`) and animates open (`max-height` and `height` 250ms ease-in-out; measured open height 189 for 2 fields). Fields are one column, gap 16, padding 0 12. CLEAR ALL sits in its own right-aligned row at the end (padding-bottom 20).
- Panel heights: 134.8 (XL), 127.6 (LG/MD), 57.6 collapsed (SM). The distance to the next block comes from the wrapper's gap (F3).

### F3. Feed body wrapper (L1)
- Blog: `Container`, padding-top 32, flex column, gap **56 / 56 / 40 / 24** (panel → featured → grid).
- News: same, gap 40 / 40 / 32 / 24.
- Quack: the grid has padding-top 80 / 80 / 64 / 48 below the panel.
- Grid (`jqxYnQ`): 3 columns XL / 2 columns LG–MD / 1 column SM (max-width 350, centred); gap 32 (≥960) / 24. The wrapper below the grid has padding-bottom 200 / 180 / 150 / 150.

### F4. `PostCard` [NEW, on `LiftCard lift={14}`]
- **Structure:** `<article>` ink backing → `<a>` (2px ink border, flex column, full height) → photo (16:9, bg cream, 2px ink border-bottom, image `object-fit:cover`) → text (bg white, padding 32 (≥960) / 24, flex column gap 8, min-height 286 (≥960) / 220 (MD)).
- **Text roles:** date line `card-date` opacity .6 (lh 140% <960). Quack date line is "Mon D, YYYY - Source" and is 1–2 lines. Title `<h2>` with `card-title-mono`, 2–5 lines. Excerpt `card-excerpt` clamp 7.
- **Size @1440:** 392.7 wide, 542.6–645 tall. Rows stretch to the tallest card.
- **Quack variant:** type badge, absolute `right:32; top:-27` (≥960) / `right:24; top:-23`. Badge is 52×52 (44×44 <960), 2px ink border, padding 8, bg per type (§3a), with a 32px glyph (news/article/video use a 24-unit viewBox, podcast 32). The whole card links externally (`target=_blank`), so it renders as a non-link (§10).
- **Hover (≥960):** inner translate(14px,-14px), 120ms ease-in-out. No underline or image change.

### F5. `FeaturedPostCard` (Blog only)
- Same parts as PostCard. Full width (1242 @1440). At SM it is a normal PostCard (max-width 350).
- **≥728:** horizontal. Photo width 50% (XL) / `calc(50% - 16px)` (LG) / `calc(50% - 12px)` (MD), no aspect ratio, 2px ink border-right.
- **Text column:** width 50% / `calc(50% + 16px)` / `calc(50% + 12px)`; padding 32 / 20 20 20 32 / 18 18 18 24; min-height 350 / 246 / 190.
- Title `featured-title`, 2 lines @1440. Excerpt 5–7 lines.
- Measured heights: 354 / 292 / 260.

### F6. `SubscribeTile` (Blog grid, Video grid) [NEW]
- **Visibility:** `display:none` at SM.
- **Box:** bg `sun` #FFDE00, 2px ink border, padding 225/32/32 (XL) · 205/32/32 (LG) · 130/24/24 (MD), overflow hidden, full row height. It sits in the grid as a normal cell: blog XL row 1 col 3; LG/MD row 1 col 2. Video uses `order: 1` below XL and `order: 2` at XL.
- **Title:** `subscribe-title` [28ch/4w], 2 lines.
- **Form:** padding-top 32 (≥960) / 20, column gap 20.
  - Email `TextInput` float, width 310 (≥960) / 270, 58 tall. Placeholder "E-mail".
  - Consent `Checkbox` solid, label 14/22.4 [37ch].
  - Disabled Submit, margin-top 4.
- **Mascot:** image Placeholder 205×205 at `top:-35; right:18` (≥960); 140×140 at `top:-25; right:15` (MD). It overflows above the card.
- **Decor:** 4 faint outline shapes, opacity .25, stroke ink:
  - 110–120w at `right:-40; bottom:-25`
  - 17×17 at `top:90; left:110`, rotate 75°
  - 50×50 at `top:30; left:-27`, rotate 25°
  - 50×50 at `top:160; right:-25` (≥728)
- **Blog grid duplicate trick:** page 1 renders 19 cards. Card 3 (`hiYZxw`) shows only at XL, and a duplicate of it (`lQsqW`) is placed after the tile and hidden at XL. Each breakpoint therefore shows 17 grid cards plus the tile. Mirror this with two copies of card 3 behind the matching visibility classes.
- **SM replacement:** a fixed **Subscribe** `OffsetButton size="lg"` primary (165.3×56.2, label + 20px arrow) at `position:fixed; bottom:24; right:24; z-index:1`, hidden ≥728. It is visible from load. Click target UNMEASURED (render as a non-link button).

### F7. `SubscribeBanner` (News grid, Events list) [NEW]
- **Visibility:** hidden at SM.
- **Box:** sun bg, 2px ink border, overflow hidden.
  - MD: padding 28 32, margin 8 0, grid-column 1/3.
  - LG: padding 32 40.
  - XL: padding 34 240, grid-column 1/4, height 237.2.
- **Title:** `subscribe-title` (1 line).
- **Form:** padding-top 32, gap 16. Row 1: email (310 / 270 wide, 58 tall) + disabled Submit, gap 16. Row 2: Checkbox (label 16/25.6; 15/22.5 <960).
- **Mascot:** Placeholder 290w (XL, `top:0; right:210`), 280w (LG, `top:10; right:-30`), 250w (MD, `top:13; right:-40`).
- **Decor:** 4 shapes, opacity .25, positioned as in the tile.
- **Placement:** News: after row 1 (the first 3 cards). Events: after the first event row (list gap 32).

### F8. `NewsDigestCard` (News only) [NEW]
- Ink-backed `LiftCard` (inner transition transform 120ms; no hover rule observed on this card). Inner: white, 2px ink, padding 40 / 40 / 32 / 24, column gap 32 / 32 / 28 / 24.
- **Header** (gap 4): date `card-date` style (Inter 16/22.4 300, opacity .6, lh 140%) + `<h2>` `news-digest-h2` (1 line @1440, [42ch/6w]).
- **Items:** 4 articles, gap 32 between them. Each item: h3 link `news-item` (hover colour #2BA5FF; external, `target=_blank`) + description Inter 16/25.6 300, 1–2 lines.
- **Footer:** UnderlineLink "Read the full newsletter" → `/blog/<newsletter-slug>`.
- Height 590 @1440.

### F9. Infinite scroll + paging (L1, L5)
- **Sentinel:** an empty `div` (0 tall) right after the grid. A 65.6px spinner sits centred about 39px below it, only while fetching (60.5px at SM).
- **SEO fallback link:** `margin-top:48`, `opacity:0`, `pointer-events:none`, centred. Labels: "Load more blog posts" (Mono 16/16 500; Inter 16 500 underline per CSS) for blog/news, "Load more videos" for videos. href `?page=N+1`. Hidden when there is no next page.
- **Behaviour:** when the sentinel nears the viewport, fetch the next page client-side, append the cards, and `history.replaceState` to `?page=N` (observed `/blog/` → `/blog/?page=2` after wheel-scrolling; videos the same). A direct load of `?page=N` renders pages 1..N **cumulatively** (blog `?page=5` = 91 cards).
- **Filters** add params (`?topic=DuckLake&page=1`, `?title=duck&page=1`, `?type=news&page=1`). Results replace the grid. The blog featured card remains with a topic filter.
- **No results:** the grid is replaced by a centred two-line message ("There are no exact matches found" / "Please, try again!"). Typography UNMEASURED; use Inter 16/25.6.
- **Clone:** client-side state + URL params; no network. Page sizes are in §9.

### B1. `ArticleLayout` (L2) [NEW]
- **Grid wrapper** (inside `Container`), `display:grid`:
  - **XL:** columns `909px 333px` (= `minmax(0,1fr) auto`), row-gap 40, column-gap 0. Padding-top 58, padding-bottom 176. Hero at row 1 col 1; body at row 2 col 1 (max-width 816); sidebar at col 2 spanning rows 1–2, `margin-left:auto`, sticky `top:144px`. The sidebar starts level with the hero (y180 @1440).
  - **LG:** `630px 250px` (minmax(0,1fr) auto), gap 40. Padding 48 / 112. Hero spans both columns; body col 1; sidebar col 2, width 250, sticky `top:134px`.
  - **MD:** `452px 196px`, same rules, sidebar width 196.
  - **SM:** one column; the order is hero, body, sidebar (Read-next only). Padding-top 40.
- **Hero** (`article-hero`, no extra padding):
  1. Back row: chevron (rotated 90°) + UnderlineLink "GO BACK TO BLOG" → `/blog/`; padding-bottom 20 (≥960) / 16.
  2. H1 `article-hero-h1` (= `article-h1`), max-width 860 (XL), padding-bottom 26 / 26 / 20 / 16; 3 lines @1440, 4 at SM, [76ch/11w].
  3. Meta: `<time>` "Mon D, YYYY" + " · N min read", Inter 14/19.6 400 ls .28, opacity .6; flex wrap gap 12 20; padding-bottom 20 (≥960) / 24.
  4. Byline/share row: ≥960 is a row, space-between, align-items end, max-width 816 (XL). <960 is a column, align start, gap 24.
     - Left: "BY" (Inter 16/19.2 UPPER, padding-top 2) + author UnderlineLink(s) (UPPER), flex wrap gap 4 5, gap 8 from "BY".
     - Right: share group, padding-left 72, gap 16, three 24px icon buttons (X/Twitter, LinkedIn, Facebook). Colour `coral-red`, hover #6FC2FF, `color 125ms ease-in-out`. A `::before` "Share in" label (Inter, absolute top 4, left 0) shows at opacity .2 below 960. At ≥960 it is opacity 0 and becomes .6 while a share button is hovered (125ms). Share buttons open external share URLs, so render them as non-links.
- **Body:** ArticleProse (§6). It starts 40 below the hero.
- **Sidebar** (flex column gap 24):
  - **TOC (≥728 only):**
    - Wrapper gap 16. Title "Table of contents" `toc-title-fono` (outside the box).
    - Box `<aside>`: bg white, 2px ink border.
    - List: padding 12 16, gap 10 (≥960) / 8 (MD), overflow auto. max-height `calc(100vh - 80px - 40px - 570px)` XL (renders 176 tall @900 viewport), `calc(100vh - 70px - 40px - 508px)` LG, `… - 464px` MD, min-height 78.
    - Items: one per H2 (4–5 items), `toc-link`, line-height 140% at XL.
    - Scroll-spy: the item whose section is in view gets weight 600 (no colour change).
    - Click: jumps (no smooth scroll, no hash change) to the H2. The heading `scroll-margin-top` is 86 (XL: header 80 + 6) / 100 (MD–LG) / 70 (SM).
  - **Read-next carousel** (`RecCarousel`) [NEW]: max-width 400; SM margin 0 auto 42.
    - Box: 2px ink border, white, overflow hidden; a 1-slide viewport.
    - Track: flex. It starts at `translateX(-1 slide)` because a loop clone sits first. Transition `transform 0.2s`.
    - 3 real slides. Each slide is a card link with a 16:9 image (bg white, cover) and a body (padding 20 XL / 16, gap 8): `rec-chip` (label "BLOG" / "WEBINAR" etc.; bg cream; 2px `sand-dark` border; r2; padding 4 12 XL / 3 11 LG / 2 10 MD / 3 11 SM) and `rec-title` (clamp 3).
    - Card heights: 334.9 / 273.8 / 231.6 / 325.5.
    - Arrows (XL only): 44×44 secondary icon buttons, absolute `top:70px; left:-24px` / `right:-24px`, z 1; the left arrow is rotated 180°.
    - Dots below: flex centred, gap 32 (XL) / 24. Active dot 16×16, others 8×8, all ink, round.
    - Autoplay every ~8000ms (first move at 7.6s after a ~1s load), loops, pauses on hover (no movement during 10s of hover).
    - SM: a title "Read Next" (Fono 20/28 ls .4 UPPER) shows above the box and is hidden ≥728.
- **Floating CTA:** "Get Started" `OffsetButton size="md"` primary with arrow (162.8×43.8).
  - ≥728: an absolutely positioned overlay covers the whole grid (`pointer-events:none`). Inside it a wrapper is `position:sticky; top:calc(100% - 81px)`, margin `0 30px 45px auto` (XL) / `0 20px 45px auto`, z 2. Result: the button sits at the viewport bottom-right while the article is on screen.
  - SM: static, right-aligned after the article.
  - Destination is external (app signup), so render it as a `<button>` with no navigation.
- **After the grid:** `SubscribeBand` (B2).

### B2. `SubscribeBand` (after every blog post) [NEW]
- **Section:** bg `sand-chip` #ECE5DD, padding 80 / 64 / 64 / 40 vertical.
- **Inner:** flex. ≥728 is a centred row with gap 80 (XL) / 24. SM is a column, gap 24.
- **Icon:** image Placeholder 140 / 140 / 130 / 100 square.
- **Form** (column gap 32):
  - `<h2>` Fono 24/33.6 (≥960) / 16/22.4 UPPER, [28ch/4w], 1 line.
  - Grid `1fr auto` (≥728), gap 20 16: email TextInput float (434 wide @XL, 56 tall, margin-bottom 16) + disabled Submit (113.7×55.2). Consent checkbox below (label 16/25.6).
  - SM: one column, gap 16.
- Heights: 343 / 311 / 300 / 441.

### C1. `TitleHero` (case-study index) [NEW, trivial]
- Section padding 100/0/160 · 80/0/140 · 64/0/120 · 24/0/80.
- H1 `page-h1-sm` centred, max-width none / none / 600 / 300. "Case Studies" (12ch).
- The 160 bottom padding is space for the overlapping carousel tag.

### C2. `TestimonialCarousel` (case-study index) [NEW]. Distinct from MARKETING `QuoteCarousel` and `CaseStudyCarousel`.
- **Frame:** a `<section>` inside `Container`: bg `sun`, 2px ink border, padding 72/0/64 · 64/0/52 · 64/0/52 · 80/0/50. Height 582.4 / 554 / 510.4 / 666.4.
- **Top tag:** an ink box centred on the top border (`translate(-50%,-50%)` at ≥728; `translateY(-23px)` at SM with padding 0 42). Text "Ducks That Lead the Way" Mono 30/42 (XL, padding 8 20) / 24/33.6 (padding 8 16) / 18/25.2 (SM, max-width 212, 3 lines), white on ink, 2px ink border.
- **Swiper:** one slide per view. Slide padding 0 30 / 0 60 / 0 20 / 0 24; slide margin-right 64. Content is a centred column, gap 52 (≥960) / 40 (MD) / 32 (SM; measured 24 inside the text wrapper):
  1. Company logo link (external): Placeholder, max-height 60 (52 SM), padding 8 0, contain.
  2. Blockquote `case-quote-xl` centred, max-width 824, padding-bottom 8, 3–4 lines.
  3. Person chip: 2px ink border, grid `90px auto`. Headshot 90×90.4 square Placeholder with 2px ink border-right; info box bg white, padding 16 24, gap 4: name `person-name-lg` + role.
  4. An invisible full-slide link (opacity 0, absolute) → `/case-studies/<slug>/`. The whole quote area is the link.
- **Pagination:** below the slides, padding-top 52 / 50 / 48 / 40, gap 32 (≥960) / 20. Bullets 8×8 ink; active 16×16; each has an invisible 16px hit area. 6 bullets.
- **Arrows:** secondary icon buttons 54×50 (padding 15; arrow 20, left one rotated 180°) at ≥960, `position:absolute; bottom:50%`, left/right 80 (XL) / 24 (LG). MD 42×38 (padding 10). Not rendered at SM.
- **Autoplay:** one slide every ~8000ms (moves observed at t≈2s and t≈10s after load), 500ms transition (`transitionDuration 0.5s`), step = slide width + 64. Arrow click advances immediately. No loop clones were seen (7 slide nodes, 6 bullets); wrap behaviour UNMEASURED.
- **Decor:** 5 outline shapes around the frame:
  - 226×113 top-left above the frame
  - 30×31 rotated 16° top-right
  - 188×87 right edge
  - 66×66 mirrored, inside top-left
  - 260×162 rotated −8°, inside bottom-right
  - Scale them down per breakpoint (sizes measured at each width: 176/154/106 for the first).

### C3. `CategoryChips` (case-study index, videos, ecosystem) [NEW]
- **Optional heading above:**
  - Case: "Explore all case studies", Mono 32/44.8 / 24/33.6 / 24/33.6 / 18/25.2; section padding-top 64; heading→chips gap 32 (24 SM).
  - Videos: Mono `section-h2-mono`, padding-bottom 40 (32 SM).
  - Eco: Mono `section-h2-mono`, padding-bottom 52 / 52 / 40 / 32.
- **Chip row:** bg cream, flex wrap, gap 12 (≥960) / 8. Horizontal overflow scroll with edge fades: `::before`/`::after`, 40 wide, cream→transparent gradients, opacity 0 (150ms). Fades are not visible when wrapping.
- **Chip** (`<a>`): `chip-filter`, padding 15.5 20 (≥960) / 11.5 12, r2, height 47.8 / 39.8. Inactive: bg `sand-chip`, ink. Hover: `sand-dark`. Active: bg ink, text cream; hover stays ink. Transition `background, color 100ms ease-in-out`.
- **Wrapper:** padding-bottom 64 (38 SM case; 72 SM videos); gap 32 (24 SM) to the following search field (videos/eco).
- **Labels:**
  - Case: All, Data Warehousing, Customer Facing Analytics, AI, Agentic Analytics, Business Intelligence.
  - Videos (24): All, AI ML and LLMs, "AI, ML and LLMs", App Development, BI & Visualization, Data Pipelines, Ecosystem, Ingestion, Interview, MCP, Meetup, MotherDuck Features, Python, Quack & Code, SQL, Short, Sources, Stream, Talk, Tutorial, Wasm, Webinar, YouTube, dbt.
  - Ecosystem (11): All, Ingestion, Business Intelligence, Data Science & AI, Reverse ETL, AI Agents, Orchestration, Data Quality, Transformation, Dev Tools, Data Apps.
- **Behaviour:** client-side navigation to `?category=<Label>` (videos add `&page=1`), and the grid filters.
  - Case: the page scrolls so the grid top sits near the viewport top (scrollY 686 @1440; grid `scroll-margin-top: calc(52px + 40px)`).
  - Videos: scrolls to the grid (y 443).
  - Ecosystem: no scroll.
  - Counts: Case Data Warehousing 14, Customer Facing Analytics 7, AI 4, Agentic Analytics 4, Business Intelligence 1. Videos "App Development" 1. Ecosystem "Business Intelligence" 19 tech + 11 consulting (the filter applies to the tech grid only).

### C4. `CaseStudyCard` [NEW, on `LiftCard lift={14}`]
- **Frame:** ink backing → `<article>`: white, 2px ink border, padding 32 (XL) / 24, column gap 24 (XL) / 20; min-height 489 / 425 / 425 / 410. Transition `transform, border 120ms ease-in-out`. Hover (≥960): translate(14,-14) and `margin-bottom:-2px`.
- **Link:** an invisible full-card `<a>` (absolute inset, opacity 0) → `/case-studies/<slug>/`.
- **Contents, top to bottom:**
  1. Logo link (external): 52 tall (XL; padding 6 0) / 44 (padding 5 0). Logo contained, left-aligned, ~40/34 tall, auto width.
  2. `<h3>` `case-card-h3` [52–74ch], 4–5 lines, padding-bottom 32, border-bottom 2px `rule-faint`.
  3. `<ul>` column gap 16, 3 items `case-card-li`; each has padding-left 16 and a "•" `::before` at left 0.
  4. UnderlineLink "READ MORE" + arrow, `margin-left:auto; margin-top:auto` (bottom-right).
- **Grid:** 3 columns XL / 2 columns LG–MD / 1 column SM; gap 32 (≥728) / 24. Container padding-bottom 220 / 160. 20 cards, no paging.
- **Decor:** 3 outline shapes (155px rotated 40° left edge; 88.8px right edge; 418.8px rotated 135° bottom-right).

### C5. `CaseDetailHero` + `QuoteBand` + `CaseArticle` (L4) [NEW]
- **Hero:** padding-top 52 / 46 / 32 / 32.
  - Back row (chevron + UnderlineLink "GO BACK TO CASE STUDIES" → `/case-studies/`), padding-bottom 32.
  - H1 `article-h1` (MD 36/50.4), padding-bottom 40 / 40 / 48 / 40, 3–4 lines, [62ch/10w].
- **QuoteBand:** full-bleed `<section>`, bg `sky-hover` #6FC2FF, 2px ink border, margin-bottom 64 / 48 / 48 / 40.
  - ≥728: flex, justify centre.
  - **Quote column:**
    - XL: height 380, max-width 971, padding 32 40 32 100, margin-right 430, column gap 16, centred.
    - MD–LG: padding 32 40, left-aligned text.
    - SM: padding 40 20, border-bottom 2px ink, centred.
  - **Quote marks:** SVG 30×28 (≥960) / 26×24, fill #6FC2FF with `filter: brightness(60%) contrast(200%)` (renders dark blue). Opening mark top-left with margin-bottom 10; closing mark rotated 180°, bottom-right, margin-top 10.
  - **Blockquote:** `case-band-quote`, 3 lines @1440, 6 at MD/SM, [224ch/33w].
  - **Profile card:**
    - XL: absolute, `right: calc(50% - 648px)` (`right:70` between 1302 and 1439), margin-top 54, 359 wide (490 tall), cream bg, 2px ink border, z 1. It overhangs the band bottom by ~162px into the article area.
    - MD–LG: in flow at the right, 312 wide, border-left 2px.
    - SM: full width under the quote.
    - Parts: photo box 326 / 264 / 264 / 298 tall (cover, border-bottom 2px) → name block (padding 16 24; 22 24 at SM, border-bottom 2px; `profile-name` + role) → logo row (height 62, padding 14 24 XL / 16 20 MD–LG; 70 tall, 20 24 at SM; logo contained left, ~34 / 30 tall, external link).
- **Article:**
  - Container padding-right 450 (XL) and padding-bottom 32 (≥960) / 40.
  - Lede block: border-left 2px #6FC2FF, padding-left 24, `case-lede`, 3 lines @1440.
  - Markdown container: padding 32/0/128 (≥960) · 32/0/24 (MD) · 40/0/72 (SM).
  - Prose (§6), max-width 816. 3 H2 sections, ~9 paragraphs each, one bulleted list of 4 near the top.
  - XL-only decor: an 830w line drawing rotated 215° at the right, plus two 20px dots.
- **Back-to-top button (≥960):**
  - Inside an absolute full-page overlay, a sticky wrapper `top: calc(100% - 96px)`, margin `0 100px 32px auto` (XL) / `0 32px 32px auto`.
  - Secondary icon button 64×60 (padding 20) with an up arrow (20px arrow rotated 180°). It has no ink backing (transparent wrapper).
  - opacity 0 → 1 (150ms ease-in-out) once scrollY is greater than ~600 (measured 0 at 500, 1 at 700).
  - Hover: an inner 3px ink ring (`::after` inset −2.5px). Active: bg `sand-dark`. Click: scroll to top.

### V1. `SandGridHero` (video index) and `SandBand` (video detail) [NEW]
- bg `sand` #ECE6DF + tiling image `/images/sand-grid-pattern.png` (Placeholder: draw a 1px grid in `sand-dark` with a CSS gradient). Background-size 640 auto (≥728) / 490 auto (SM); background-position `center calc(100% + 15px)` XL / `+4px` LG / `−19px` MD / `−10px` SM. Border-bottom 2px ink.
- **Index:**
  - Padding 90/0/380 · 96/0/452 · 70/0/471 · 40/0/256.
  - H1 `video-h1` "Videos and Online Events" (24ch), centred, `width:fit-content`, padding 0 4, bg `sand` (so the grid lines do not cross the text). 1 line, 2 at SM.
  - The next block overlaps with margin-top −320 / −386 / −386 / −196.
- **Detail:** padding-bottom 242 (≥960) / 256 (MD) / 170 (SM); the content container overlaps with margin-top −263 / −274 / −260 / −170.

### V2. `FeaturedVideo` (video index) [NEW]
- **Frame:** a swiper inside a container: max-width 1302 (XL) / 728 (LG and MD; padding 0 20) / 100% (SM); swiper padding-top 30 at XL. Wrapper padding-bottom 52.
- **Slides:** 1 at measurement time, so no bullets are shown. If there are several, use C2's bullets: gap 32, padding-top 52 (XL) / 40 (≥728) / 24.
- **Card:** white, 2px ink.
  - XL: grid `45% 55%` (557 / 681 @1440, 387 tall), text on the left.
  - <1302: one column with the image first; max-width 688 (LG), 100% (MD), 350 (SM); 720.8 / 720.8 / 507 tall.
- **Text column:** padding 24 18 24 24 (XL) / 24 24 32 (MD–LG) / 24 (SM); gap 16 (≥728) / 8; min-height 332 / 312.
  - Kicker row: date chip (bg ink, white, 2px ink, padding 8 12 / 4 8, `kicker-chip`, gap 8 to an icon) + type chip (transparent, 2px ink, same padding, ellipsis).
  - Title `video-feat-title` (link, hover underline; 2 lines, clamp 3 at XL).
  - Description Inter 16/25.6 300 ls .32 (14/22.4 at SM), clamp 4; margin-top −8 (XL) / −6 (≥728); margin-bottom 16 below XL.
  - CTA `OffsetButton size="lg"` "Watch Now" + arrow (178.5×56.2), `margin-top:auto`; full width at SM.
- **Media:** 16:9 link (image cover), border-left 2px (XL) / border-bottom 2px. Duration badge absolute bottom-right: ink bg, `duration` text, padding 8 16.

### V3. `VideoCard` [NEW, on `LiftCard lift={14}`]
- **Same frame as PostCard.**
- **Thumb:** 16:9 (a viewBox 16×9 spacer + image cover, bg cream, border-bottom 2px) with a duration badge (ink, padding 8 16, Mono 18/25.2 300 ≥960 / 16/22.4).
- **Body:** white, padding 32 (≥960) / 24, gap 8, min-height 147 (≥728).
  - Date: Inter 16/25.6 300 `gray-400`.
  - Title h3: `card-title-mono` 2 lines.
  - Description `card-excerpt`, clamp 7, `white-space:pre-wrap`; line-height 140% <960.
  - Tags row: `margin-top:auto`, padding-top 10, flex wrap, gap 8. Each tag has bg `chip-gray` #E8E8E8, padding 8 12 (≥960) / 4 8, label `video-tag`. 2–4 tags.
- **Size:** 392.7 × 616–657 @1440.
- **Grid:** 3 / 2 / 2 / 1 (max-width 350 SM); gap 32 (≥960) / 24. Container padding-bottom 176. SubscribeTile is in the grid (F6).

### V4. `VideoPlayerFrame` (video detail) [NEW]
- 2px ink border, bg ink, grid with a 16:9 spacer.
- Width 100% (1242×700.4 XL, 920×519 LG). At SM it bleeds: `width: calc(100% + 48px); transform: translateX(-24px)` (390×221).
- The original embeds a YouTube iframe. The clone renders a **static placeholder frame**: black 16:9 area with a centred neutral play glyph. No iframe.

### V5. `VideoMeta` + body/sidebar (video detail) [NEW]
- **Back link** (above the frame): UnderlineLink "BACK TO VIDEOS" with a left arrow (`row-reverse`, icon rotated 180°) → `/videos/`. It sits on a `sand` chip (padding 0 4), margin 80 0 32 (XL) / 66 0 32.
- **Below the frame:** padding-top 32 (XL) / 24. The block's own padding-bottom is 56 / 46 / 46 / 32.
  - Tag links: flex wrap gap 8, padding-bottom 16. Each tag is `video-tag-link`, bg `sand-chip`, padding 8 12 (≥960) / 4 8, hover `sand-dark` (150ms) → `/videos/?category=<tag>#videos-and-webinars-library`.
  - H1 `video-detail-h1`, 2 lines @1440, 4 at SM, [68ch/12w].
  - Date Inter 14/19.6 `gray-500`, padding-top 16.
- **Body row:** flex space-between. Prose (§6; H2 20px at SM), max-width 816, 4 H2 sections.
- **Sidebar (XL):**
  - Sticky `top: 143px` (80 + 23 + 40), width 333, enter animation `sidebar-in`. Contents, gap 24:
  - **TOC box:** `<aside>` bg **cream**, 2px ink border. Title "TABLE OF CONTENTS" COMPANY `toc-title` (Mono 18/25.2 ls .36) with padding 24 24 20. List padding 0 16 16 24, gap 12; links `toc-link` 16/25.6. Same scroll-spy as B1.
  - **TryCard:**
    - Top: a 116-tall `yellow` #F9EE3E panel with a 2px ink border (no bottom), holding decorative line art (Placeholder).
    - Below: a 2px ink box, padding 20 24 24, centred: title Fono 18/25.2 ls .36 UPPER [27ch/4w] with padding-bottom 16, then `OffsetButton size="md"` "Try 7 Days Free" (external auth, so non-link).
- **Below 1302:**
  - The sidebar becomes a FAB: sticky wrapper `top: calc(100% - 90px)`, margin `0 0 -56px auto`, z 2. It holds a secondary icon button 60×56 (padding 18; list icon).
  - Click toggles the TOC popover: absolute `bottom: calc(100% - 2px); right:0`, width 100%, max-width 482. It goes from opacity 0 / translateY(15px) to 1 / 0 (`fab-pop`). Its list max-height is `calc(100vh - 260px - 40px)`.
  - The TryCard is hidden below 1302.

### V6. `FAQSection` (video detail): reuse `ui/Accordion.jsx`
- bg cream, full bleed.
- **Title row:** "FAQS" Mono 40/48, padding 34 0 (≥960) / 20 0.
- **Items** (5): 2px ink top border; padding 26 0 (≥960) / 20 0.
  - Question `faq-q`: 2–3 lines, margin-right 20 (≥960) / 8.
  - Chevron 24px (18.9 at SM), rotates 180° in 200ms ease-in-out.
  - Answer: max-height 0 → its content height, margin-top 0 → 16, `all 0.25s ease-in-out`, max-width 98%. Text `faq-a`, 3–4 lines.
  - No hover background (measured transparent).
- At XL the item content has a right margin of `calc(46% - 260px + 30px)`, leaving room for a 260×231 duck illustration (Placeholder) at the right, `bottom:77px`. The illustration is hidden below 1302.
- The last item has a 2px bottom border.

### V7. `RelatedVideos` (video detail) [NEW]
- **Section:** bg cream, border-top 2px ink, padding 80/0/160 (XL) · 80/0/64 (MD–LG) · 100/0/112 (SM).
- Heading "Related Videos" `related-h2`, gap 40 (≥728) / 32 to the grid. Grid of 3 VideoCards (3 / 2 / 2 / 1 columns, max-width 350 SM).
- Then a right-aligned `OffsetButton size="lg"` "View all" → `/videos/`, margin-top 40 / 32.

### E1. `EcoHero` (ecosystem index) [NEW]
- **Container:** flex space-between; padding-top 110 / 80 / 40 / 40, padding-bottom 180 / 170 / 218 / 215; `overflow:visible`; section `overflow:hidden`.
- **Text column:** gap 32 / 32 / 24 / 16; max-width 875 / 690 / 900 / 900.
  - H1 `eco-h1` "Meet the Flockers" (17ch, 1 line).
  - Sub `hero-tagline-mono` [71ch/9w], max-width 600 / 500 / 500, 2 lines.
  - `OffsetButton size="lg"` "Become a Partner" + arrow → opens the partner modal (E5).
- **Illustration:** Placeholder, absolute, z 1. XL 650w at `top:40; right:-95`; LG 450w at `top:45; right:-55`; MD 400w at `top:120; right:-112`; SM 283w at `bottom:40; right:-60`.
- **Decor:** a 282×260 outline rotated 20° at the far left; a 23×24 shape.

### E2. `PartnerCard` [NEW]
- **Frame:** `<article>` white; frame 2px ink, flex column, min-height 382 (≥960) / 315.
- **Card link:** padding 32 32 112 (≥960) / 24 24 96 → `/ecosystem/<slug>/`.
- **Contents:**
  - Logo box: height 60 (≥960) / 52; image contained, left-centred.
  - Tag row: padding 24 0 16, gap 4, wrap; tags padding 8 12 (≥960) / 4 8, `eco-tag`, bg per category (§3a). One tag usually; 0–3 seen.
  - Text block (bg white, column gap 8): `partner-name` (always underlined) + description Inter 16/25.6 300 ls .32 (14/19.6 lh 140% <960), clamp 3.
- **Icon bar:** absolute `bottom:0`, white, padding 32 (≥960) / 24. It holds a link-icon row (max-width 262 / 210, gap 8).
  - Each icon tile is 46×46 (padding 12, no border, bg `rgba(255,113,105,0.08)`) with a 22px glyph filled `coral-red`. Kinds: docs, blog, video, case-study.
  - Destinations: mostly external docs, plus some internal `/blog/…`, `/videos/…`, `/case-studies/…`, `/webinar/…` and `/docs/…`.
  - Tooltip on hover (≥960): `<summary>` absolute, 54px below the tile top, ink bg, padding 10 12. Text Inter 12/14.4 white (e.g. "Docs"). Nub 8×8 ink rotated 45° at `top:-4px; left:27px`.
  - Icon count per card: 0 icons on 76 cards, 1 on 46, 2 on 23, 3 on 8, 5 on 1.
  - Overflow button "+2" (Mono 16/16, padding-left 8, 55.8×44) reveals the rest. Exact styling and animation UNMEASURED; the bar has `transition: bottom 0.3s` and a hidden label row with `opacity 0.4s`.
- **No hover lift** on partner cards. Size @1440: ~380–419 wide × 394.4.
- **Grids:**
  - "Technology Partners": 73 cards. A JoinFlockCard sits after the first 3 cards (spans the full row at XL; one cell at MD–LG; full row at SM).
  - "Consulting Partners": heading `section-h2-mono`, padding-bottom 52 / 52 / 40 / 32; 11 cards.
  - Grid 3 / 2 / 2 / 1 columns (max-width 350 SM), gap 32 (≥960) / 24, padding-bottom 160 / 120 / 120 / 100. Reveal-up from card 4 onward.

### E3. `JoinFlockCard` [NEW]
- **Box:** sun bg, 2px ink border, overflow hidden.
  - XL: padding 28 270, min-height 230, content centred vertically.
  - LG: padding 32.
  - MD: padding 28, top-aligned, fills the cell height.
  - SM: padding 20 24.
- **Content** (z 2, column gap 16 XL / 12):
  - H3 Mono 24/33.6 UPPER (18/25.2 <960) "Want to join the flock?".
  - Paragraph Inter 16/24 300 ls .32 (15/22.5 <960), max-width 560, 2 lines.
  - `OffsetButton size="md"` "Become a Partner" + arrow → modal; margin-top 4.
- **Illustration:** Placeholder, absolute. 285w at `right:105; bottom:-35` (XL); 180w (LG); 150w (MD); hidden at SM.
- **Decor:** 4 shapes, opacity .25.

### E4. `BuildCTA` (ecosystem bottom) [NEW]
- **Section:** background image `transparent-grid-pattern.png` (Placeholder: 1px ink grid at low opacity). Size 648 / 604 / 524 / 534 auto. A 134px cream→transparent gradient at the top. Padding 120/0/160 · 100/0/120 · 92 · 92.
- **Card:** white, 2px ink border, max-width 1028 (XL; 360 at SM), centred; grid `1fr auto` (≥728) / one column; min-height 325 (XL).
  - Content: padding 87 80 / 52 68 / 35 30 35 40 / 32 24 0; column gap 32 (≥960) / 24.
    - Title Mono 32/38.4 (XL) / 24/28.8, `nowrap` ≥728, "Build with MotherDuck".
    - Description Inter 16/25.6 300, padding-top 12 (8 at SM), 2 lines.
    - `OffsetButton size="md"` "Become a Partner" (no arrow).
  - Illustration column: 480 / 340 / 260 wide (SM aspect 1/0.7). Light-blue `sky-tint` #CEEBFF masked shape plus a duck illustration (both Placeholders).

### E5. `PartnerModal` [NEW]
- **Overlay:** `overlay` colour, z 99.
- **Content:**
  - ≥960: 720 wide, white, 2px ink border, `top: calc(50% + 24px)`, centred, max-height `calc(100% - 108px)`, overflow auto. Measured box 720×792 at (360, 78).
  - <960: full-width bottom sheet, max-height `calc(100% - 86px)`, no side borders.
  - Opens with `modal-in`.
- **Form** (placeholder only; do not wire it up):
  - Intro line Inter 20/32 (2 lines).
  - Labelled fields, labels Mono UPPER with a red "*": First name + Last name (2 columns), E-mail, Company, Partner type (select "Select a partner type"), Supported regions (5 checkboxes in 2 columns: NAMER, LATAM, EMEA, APJ, Global), Submit.
  - Inputs follow the field style (58 tall, 2px ink border).
- The close mechanism was not found among buttons (only "Submit"). Use overlay click and Esc.

### E6. `PartnerDetail` (L8) [NEW]
- **Section:** padding-top 80 (XL) / 44.
- **Back row:** chevron (16px at SM) + UnderlineLink "BACK TO ECOSYSTEM" (14px at SM) → `/ecosystem/`.
- **Article grid:** padding 32/0/116 (≥728) · 40/0/80 (SM).
  - XL: `392px 1fr`, column-gap 48.
  - LG: `332px 1fr`, gap 24.
  - MD: `327px 1fr`, gap 24.
  - SM: one column in this order: title block, logo box, prose, icons.
- **Logo box:** white, 2px ink border, padding 40, square 392 (XL) / 327; grid-centred logo (max-height 120, contain). Sticky `top:186px` (XL) / `top:160px` (MD–LG); static at SM.
  - Decorative teal flower SVG 69px (58 at SM), rotate 30°, at `bottom:-35; right:80` (XL).
- **Title block:** padding-top 36 (XL) / 28 (MD–LG); max-width 800 / 480 / 480 / 332.
  - H1 `partner-h1` (name, 1 line).
  - Tags row (E2 tags), padding-top 8 (+ padding-bottom 24 at SM).
- **Prose** (§6): margin-top 32, max-width 816. One intro paragraph + one H2 section with ~1 paragraph.
- **Link icons:** E2 tiles, gap 12, padding-bottom 28 / 16 / 16; padding-top 24 at SM.
- **XL decor:** a 193×193 shape at `top:75; right:calc(50% - 780px)`.
- Page height ~2011 @1440 (very short page).

### H1. `EventsHero` [NEW]
- **Container:** padding 90/30/90 · 90/20/70 · 40/20/190 · 20/24/260; flex space-between.
- **Text column:** gap 32 (≥960) / 16; max-width 800 / 550 / 900.
  - H1 `events-h1`, 3 lines, [52ch/7w].
  - Lede `events-lede`, max-width 800 / 490 / 400, [70ch/14w].
- **Illustration:** Placeholder, absolute z 1. 330w at `bottom:30; right:70` (XL); 250w at `bottom:60; right:110` (LG); 270w at `bottom:0; right:20` (MD); 220w at the bottom (SM).
- **Decor:** about 8 small doodles.

### H2. `SpeakerBanner` (events) [NEW]
- **Section:** padding 30 0 (≥960) / 72 0 20 (MD) / 120 0 0 (SM).
- **Box:** bg `sand-chip`, centred text. Padding 21 67 21 180 (≥728) / 40 20 24 (SM).
- **Text:** Mono 16/22.4 UPPER [37ch/7w] with an inline UnderlineLink "Apply to be a speaker" (Mono 16/19.2 UPPER + arrow; a `<button>`, target UNMEASURED).
- **Mascot:** Placeholder 122×100, vertically centred at `left:240` (XL) / `left:80` (MD–LG). At SM it is 136×111 at `top:-80`, horizontally centred.

### H3. `EventTabs` [NEW]
- Two chips (C3 style; padding 16 20 at ≥960 / 12 16): "Upcoming" (active, ink) → `/events/` and "Past" → `/events/past/`.
- Gap 12 (≥960) / 8, margin-bottom 32.
- Section padding-top 60 (≥728) / 80 (SM).

### H4. `EventRow` [NEW, on `LiftCard lift={14}` at ≥960 only]
- **Frame:** `<a>` → ink backing (≥960) → `<article>` white, 2px ink border.
  - ≥960: flex row, 1242 × 210–266 @1440; hover translate(14,-14).
  - <960: column, no lift.
- **Date block:**
  - ≥960: column centred, padding 32 48, border-right 2px, 167.5 wide; `event-month` / `event-day` / `event-year` (year padding-top 4).
  - <960: a header row, padding 16 24, gap 8, border-bottom 2px; month, day and year inline.
- **Content:** padding 16 64 22 32 (XL) / 16 32 22 (LG) / 24 (<960). ≥960 is a row with space-between, centred, gap 20. <960 is a column, gap 24.
  - Text column (gap 8 ≥960 / 4):
    - Title `event-title`, 1–2 lines.
    - Description Inter 16/25.6 300 clamp 3 (XL) / 14/19.6 clamp 5 (MD) / clamp 7 (SM), margin-bottom 8 (≥960) / 12.
    - Location `event-loc`, 1 line.
    - Tag row: an `apricot` tag, 2px ink, padding 6 12, `event-tag`, 18px icon, gap 8 (e.g. "Online", "In Person").
  - CTA `OffsetButton size="lg"` "View Details" + arrow (186×56.2), `white-space:nowrap`. Its own lift is disabled.
- **List:** one column, gap 32 (≥728) / 24, padding-top 80 / 80 / 64 / 48. 7 upcoming events, with the SubscribeBanner (F7) after the first. Page padding-bottom 120 (≥960) / 96.
- **Filters:**
  - Location select: 4 options (Online + 3 venue strings).
  - Type select: Online, In Person.
  - Selecting sets `?type=Online&page=1` and filters client-side (Online gives 4).

### K1. `LearnCard` + grid (L9) [NEW, on `LiftCard lift={14}`]
- **Card:** white, 2px ink border, padding 32 32 40 (≥960) / 24; column gap 16.
  - Icon Placeholder 120×120 (100 at SM), contain.
  - Title h3 `learn-title`, 1–2 lines. Its `<a>` stretches over the whole card via `::after { inset:0 }`.
  - Description Inter 16/25.6 300 ls .32 (14/22.4 <960), clamp 7, 3–4 lines.
  - UnderlineLink "Learn More" (UPPER), padding-top 16, `margin-top:auto`.
- **Grid:** 2 columns at every width ≥728 (XL 605 + 605, gap 32; LG max-width 740 centred, 354 columns; MD 332 + 332, gap 24); SM 1 column, max-width 350.
- **Section:** column gap 52 (≥728) / 32; padding-bottom 140 (≥960) / 100.
- 68 cards, all rendered at once (no filter, no paging). Card heights ~429 (XL), 514 (LG), 426 (MD), 401 (SM).

### P1. `ProsePage` (community code, L11) [NEW, trivial]
- Container padding-top 24 (XL) / 34 (LG) / 0, padding-bottom 48 (≥960) / 24.
- H1 Mono 48/57.6 (≥960) / 48/67.2 (MD and SM; measured, although the site CSS declares 32/40/56, the computed value is 48 at every width), padding 64 0 36 (XL), 3 lines @1440, [25ch/4w].
- Body grid one column, padding-bottom 112. Prose (§6) max-width 834: H2, 4 paragraphs (strong lead-ins), H3, 1 paragraph, then a 200×200 image (contain, margin-bottom 24).
- Links are `mailto:` only (render as non-links).

### D1. Dive gallery (L12): separate app chrome [NEW, self-contained]
- **Top nav:** a `<nav>`, not the site header. `position:fixed`, 66 tall, bg cream, border-bottom 2px transparent. No eyebrow banner.
  - Left: logo glyph + wordmark (Placeholder), with "Dive Gallery" (Inter 12 600 ls .48 `gray-500`) under it.
  - Centre-right: HOME / ABOUT / DOCS ↗ (Inter 14 UPPER, ink).
  - "Join our Slack" with a 4-dot icon (Inter 13 `gray-500`).
  - "SIGN IN" outlined button (Mono 12 ls .6 UPPER, 99×36).
- **Hero:**
  - ≥960: row centred, gap 48, padding 48 80 0.
  - <960: column centred, gap 24, padding 32 24 0.
  - Image Placeholder width 45% (max 480; 420 below 960), aspect 1100/680.
  - Text (centred <960, left ≥960):
    - H1 Mono **700** 40/48 (≥960) / 28/33.6 UPPER, margin-bottom 12.
    - Paragraph Inter 15/24 300 ls .3 `gray-500`, max-width 440, 3 lines.
- **Filter band:** bg cream, padding 40 24 32 (≥960) / 24 16; column gap 16, centred, max-width 1280; inner gap 14.
  - Search: max-width 540, padding 11 18, Inter 14, 1px `sand-dark` border, r 999, white; focus border ink. Placeholder "Search dives by name, tag, or author…".
  - Two chip rows, centred, wrap, gap 5. Each row starts with a label ("FORMAT", "TOPIC": Mono 11 ls .66 UPPER `gray-500`, margin-right 6).
  - Format chips (11): Dashboard, Explorer, Map, Globe, Tutorial, Slides, Talk, Tool, Game, Showcase, Data Viz.
  - Topic chips (13): NYC, Sports, Music, Finance, Civic, Science, Astronomy, Energy, Weather, AI, SQL, DuckDB, MotherDuck.
  - Chip style: Inter 12.5, padding 4 9, r 999, 1px `sand-dark` border, white. Hover border ink. Active bg ink, white text.
  - A chip click sets `?tag=dashboard&page=1`.
- **Toolbar** (flex wrap, gap 10, margin-bottom 16):
  - Sort pill "Most Popular": Inter 14 500, padding 8 16, r 999, ink bg, white text, sliders icon + chevron 14; hover `gray-500`. Its menu: 180 wide, white, 1px ink border, r 4, shadow `0 4px 16px rgba(0,0,0,.1)`, padding 4; option "Most Recent" (Inter 13).
  - Toggle "MotherDuck's Pick": peach bg, orange border, r 999, padding 4 10, Inter 12.5, 10px star; hover bg orange.
  - Hackathon toggle: `yellow-chip` bg, ink border; hover `sun`.
- **DiveCard:**
  - Frame: white, 2px ink border, overflow hidden, flex column. No lift.
  - Link area:
    - Image 16:9, bg `surface-2`, border-bottom 2px cream.
    - Hover overlay `rgba(255,255,255,.18)`, opacity 0 → 1 in 200ms, with a centred pill (ink bg, white Inter 14 500, padding 10 20, r 999, shadow `0 2px 12px rgba(0,0,0,.15)`) [30ch].
    - Pick badge top-left 10: Mono 10 ls .4 UPPER, peach bg, orange 1px border, padding 2 6, star icon.
    - Title Inter 22/30.8 600 (18/25.2 <960), clamp 2; padding 24 32 16 (≥960) / 16 16 12.
  - Tag pills: Inter 12, padding 3 8, r 999, `surface-2` bg, 1px `sand-dark` border, `gray-500` text; row padding 0 24 20 (≥960) / 0 16 16, gap 6.
  - Footer bar:
    - `margin-top:auto`, bg `surface-2`, border-top 1px `sand-dark`, padding 12 24 (≥960) / 12 16, flex space-between.
    - Avatar 28 circle (1px `sand-dark`) + author link Inter 14 500 (hover underline).
    - Votes: "▲ N" (Inter 13 600, 2px cream border, r 2, padding 4 10, hover border ink) and "▼" (padding 4 6, hover border `coral-red`), gap 4.
  - Size 397.3 × ~424 @1440.
- **Grid:** 3 columns (≥1302) / 2 columns (960–1301) / 1 column; gap 24. Container max-width 1440, padding 24 100 (≥960) / 16 24.
- **Paging:** 9 per page. A visible button "Load more dives" (Mono 13 ls .65 UPPER, padding 11 22, white, 2px ink, r 2, hover `surface-2`; margin-top 40) links to `?page=N+1`. Infinite scroll also appends pages with no URL change (45 cards after scrolling). A direct `?page=N` load shows **only** page N (not cumulative). 15 pages; the last has 8.
- **Footer:** the site footer (455 tall @1440).

---

## 6. `ArticleProse`: full prose styles

Used by blog post, case detail, video detail, partner detail and community code. All selectors are scoped to the prose root. Every child gets `position:relative; font-family:Inter; word-break:break-word`. Max-width 816 at XL.

| Element | Style |
|---|---|
| Block spacing | `blockquote, details, dl, ol, ul, p, pre, table, img { margin: 0 0 24px }`. The last child has margin-bottom 0. |
| `h1` (rare) | Fono 32 (48 at ≥960), weight 400, margin 40 0 16 |
| `h2` | Fono **24/28.8** (lh 33.6 below 960; SM in video detail 20px), 400, UPPER (headings inherit the uppercase heading style), margin **40 0 16**, `clear:both`. `scroll-margin-top`: `var(--header-mobile)` (70) SM, 100 MD–LG, 86 XL. |
| `h3` | Fono **18/25.2**, margin 40 0 16 |
| `h4–h6` | Fono **16/22.4**, margin 40 0 16 |
| Heading anchor | Each heading ends with `<a class="heading-anchor">` (24px link icon, margin-left 8, inline-flex, vertical-align middle, svg margin-bottom 2; 4 in h2). opacity 0, shown on heading hover (`@media (hover:hover)`, 150ms ease-in-out); always shown on touch (`hover:none`) and on focus-visible. Path fill ink, hover #2BA5FF (150ms). href `#slug`. |
| `p` | Inter **16/25.6 300**, ls normal |
| `a` | inherit size, **700**, `text-decoration: underline` (ink, offset ~3.5px auto). No hover colour change observed. |
| `strong` | 700. `em`: italic 300. `u`: underline. `sup`: margin 0 4, no decoration. |
| `ul` / `ol` | disc / decimal; container line-height 16; `li`: Inter 16/25.6 300, margin-left 24, padding-left 4 (text starts 28 in from the list edge). Nested lists indent a further 28. Markers inherit ink. |
| `blockquote` | no border or bg; its `p`: Inter **16/25.6 500 italic**, colour **#000**, padding **12 24**, margin-bottom 24. `p::before` is the bar: absolute, top 0, left 0, 5px wide, full height, bg ink, opacity .1. Links inside inherit colour and weight. |
| inline `code` | `monospace` (system mono; Source Code Pro is not loaded) **14/17.5 600**, padding 2 4, r 3, bg `inline-code-bg`. 13px inside the FAQ (15 at ≥960). |
| `pre` | overflow auto, bg ink (#383838), margin-bottom 24 |
| `pre code` | block, monospace **15/21.75 400** (line-height 145%), padding **15px 42px 15px 18.75px**, bg **#22272E**, colour #ADBAC7, r 3 (the ink `pre` bg shows in the 3px corners). Token colours `code-dim-*`. No copy button, no language label, no line numbers. Measured blocks are 3–25 lines; long lines scroll horizontally. |
| Callout | `div` with padding 16 18 18, bg `callout` #FEEFAD, border-left 4px #EBCD00, Inter line-height 150% 300. Its `p` is weight 400, margin-bottom 16 (last 0). It can contain a `pre`, a `table` and inline code. Wrapper margin-bottom 24. |
| `table` | wrapper div `overflow:auto; max-width:100%; margin-bottom:24`. The table is `display:block; width:max-content; max-width:100%; overflow-x:auto; border:2px solid ink; border-collapse:collapse`. `thead` has border-bottom 2px ink. `th`: bg **sun #FFDE00**, padding 10 12, Inter **14/18.2 700 UPPER**, left-aligned (SM: padding 8 10, 12px). `tr` bg white. `td`: border 1px **#D7D7D7**, padding 10 12, Inter **15/21 300** (SM: 8 10, 13/16.9). `tfoot` has border-top 2px ink and cream bg. |
| `img` | border **2px ink**, max-width 100%, display block (inside a `p`, which then has margin-bottom 24). Measured 816 wide at XL, natural ~816×174–320 (diagrams). No captions (`figcaption` count 0 in every sampled post). |
| `iframe` | max-width 100%. Measured in posts: a 100%×600 interactive embed (vercel app) and YouTube embeds. Render both as **static placeholder frames** (the YouTube one 16:9) with 2px ink border. |
| `hr` | 1px ink top border only |
| Layout helpers | `.row` (column; row ≥600px, margin-bottom 10), `.columnPic` flex 30%, `.columnText` flex 70% (`h3` margin-top 0), `.newsheading` (borderless table used in newsletters; tds unpadded) |

Sampled body sizes:

| Post | Words | Elements |
|---|---|---|
| Blog A | 2362 | 5 H2, 2 H3, 43 p, 6 pre (inside callouts), 4 tables |
| Blog B | 3962 | 6 H2, 10 H3, 28 blockquotes, 3 images, 1 hr |
| Blog C | 1267 | 4 H2, 1 pre, 1 iframe, 2 images, ul/ol (nested) |
| Differential-storage post | — | 5 H2, 5 H3, 4 H4, ~40 p, 5 images |

Generate placeholder posts with this mix.

---

## 7. Per-route composition

| Route | Blocks (top → bottom) | Props / notes |
|---|---|---|
| `/blog` | FeedHero(blog, typewriter, doodles) → SearchFilterPanel(search + Topic select, `70%/1fr`) → FeaturedPostCard → PostCard grid with SubscribeTile at index 3 (+ duplicate trick F6) → F9 spinner/load-more → fixed Subscribe button (SM) | Topic options (34, as rendered): AI, Agent Skills, Agentic Analytics, Agents, Cloudflare, Data recovery, Dives, DuckDB, DuckLake, Edge computing, Features, Flights, Lakehouse, MCP, MotherDuck, Postgres endpoint, Product, Tutorial, Company, Data engineering, Data warehouse, Ducklake, Ecosystem news, Events, External tables, How to, Integrations, Lakehouse, Motherduck, Python, Self hosting, Sql, … (duplicates differ by case on the original; keep them or dedupe) |
| `/blog/:slug` | ArticleLayout(hero, prose, sidebar TOC + RecCarousel, floating Get Started) → SubscribeBand | TOC items = H2s. Rec slides 3 (BLOG/WEBINAR chips). |
| `/case-studies` | TitleHero → TestimonialCarousel(6) → CategoryChips(case, heading) → CaseStudyCard grid(20) | |
| `/case-studies/:slug` | CaseDetailHero → QuoteBand(+ProfileCard) → CaseArticle(lede, prose 3×H2) → BackToTop | |
| `/videos` | SandGridHero → FeaturedVideo(1 slide) → [heading `section-h2-mono` [25ch/4w] + CategoryChips(videos, 24) + search TextInput(icon, full width)] → VideoCard grid with SubscribeTile → F9 | search sets `?title=`. Grid id/anchor `videos-and-webinars-library`. |
| `/videos/:slug` | SandBand → back link → VideoPlayerFrame → VideoMeta → body + sidebar(TOC, TryCard) / FAB → FAQSection(5) → RelatedVideos(3) + View all | |
| `/ecosystem` | EcoHero → [heading "Technology Partners" + CategoryChips(eco, 11) + search] → PartnerCard grid(73, JoinFlockCard after 3) → heading "Consulting Partners" → PartnerCard grid(11, region tags) → BuildCTA; PartnerModal on "Become a Partner" | search + chip combine: `?category=Business+Intelligence&title=sig` |
| `/ecosystem/:slug` | PartnerDetail | |
| `/learn` | FeedHero(learn) → LearnCard grid(68) | |
| `/events` | EventsHero → SpeakerBanner → EventTabs → SearchFilterPanel(search + Location + Type) → EventRow list(7) with SubscribeBanner after #1 | |
| `/duckdb-news` | FeedHero(news) → NewsDigestCard → PostCard grid with SubscribeBanner after row 1 → F9 | cards link to `/blog/<newsletter>`. No filter panel. |
| `/quacking-around-the-web` | FeedHero(quack) → SearchFilterPanel(search + Type select: News, Article, Video, Podcast) → PostCard(quack badge) grid → F9; decor: 110px and 160px outline shapes at the bottom corners | all cards external (non-links) |
| `/community-code` | ProsePage | |
| `/dive-gallery` | D1 (own nav) → site Footer | |

---

## 8. Interactions summary

| Interaction | Behaviour (measured) |
|---|---|
| Typewriter H1 (`/blog` only) | ≥728: 800ms `steps(15)` width reveal + caret blink 1.1s + caret cover 853ms. SM: static text + blinking caret. Plays once on load. |
| Search fields | Typing updates the URL param (`?title=…&page=1`) and filters with no submit. The 2s settle covers debounce + fetch on the original; clone: filter on input (≤300ms debounce). Hover/focus border #2BA5FF 200ms; placeholder hides on focus. |
| Select dropdown | Click box → menu (`menu-drop` 200ms), chevron rotates 180°. Option hover weight 700. Select → closes and sets the param (`topic`, `type`, `location`) with `page=1`. Clicking outside closes. Selected value shows in ink 400. |
| CLEAR ALL | Resets all params. Hover underline #6FC2FF 2px, bg #F8F8F7. |
| Filter panel (SM) | Toggle bar expands or collapses the fields (250ms ease-in-out); chevron rotates. |
| Chips | `<a>` with a query param; client-side route; active chip ink. Scroll to grid (case, videos). |
| Infinite scroll | F9 (blog, news, quack, videos) and D1 (dive) |
| Card hover | ≥960 lift 14 (120ms). Partner and dive cards have no lift. Dive image overlay fades in (200ms). |
| Scroll reveal | §2 |
| Hero doodles | scroll parallax §3d |
| Blog TOC | scroll-spy weight 600; click jumps to the heading (instant) |
| Heading anchors | appear on heading hover (150ms) |
| Share icons | colour → #6FC2FF 125ms; "Share in" label 0 → .6 on hover (≥960) |
| Read-next carousel | autoplay 8s, 200ms slide, loop, pause on hover, arrows (XL), dots |
| Case testimonial carousel | autoplay ~8s, 500ms slide, arrows ≥728, bullets |
| Floating Get Started (post) | sticky to the viewport bottom-right while the article is in view (≥728) |
| Back-to-top (case detail) | ≥960; fades in after scrollY >~600; click scrolls to top |
| Video TOC FAB (<1302) | click toggles the popover (150ms) |
| FAQ | independent toggles; chevron 200ms; body 250ms |
| Partner icon tooltip | hover ≥960 shows a `<summary>` tooltip below the icon |
| "Become a Partner" | opens PartnerModal (overlay click / Esc to close in the clone) |
| Event rows | whole row lifts 14 on hover (≥960); the button does not lift |
| Copy-code buttons | **none on the original** |

---

## 9. Item counts and pagination (for placeholder generation)

| Route | Per page | Total (measured 2026-10-23) | Mechanism |
|---|---|---|---|
| `/blog` | page 1: 1 featured + 17 grid cards (19 card nodes incl. 1 duplicate) + subscribe tile. Pages 2+: 18. | 272 unique posts (273 card nodes on `?page=16`; `?page=15` = 271). 16 pages. | infinite scroll, `?page=N` cumulative, `?topic=`, `?title=` |
| `/duckdb-news` | page 1: 19 card nodes (one is the XL/non-XL duplicate) + banner; pages 2+: 18 | 43 card nodes over 3 pages (`?page=2` = 37) | infinite scroll |
| `/quacking-around-the-web` | 18 | 62 (18/18/18/8); by type: News 18+, Article 18+, Video 12, Podcast 5 (filtered pages show ≤18) | infinite scroll, `?type=`, `?title=` |
| `/videos` | page 1: 35 cards + subscribe tile; then 36 | 159 (page 2 cumulative 71; page 5 = 159) | infinite scroll, `?category=`, `?title=` |
| `/case-studies` | all | 20 cards; carousel 6 slides | chips `?category=` |
| `/ecosystem` | all | 73 technology + 11 consulting | chips `?category=` + `?title=` |
| `/learn` | all | 68 | none |
| `/events` | all | 7 upcoming | `?type=`, `?location=` |
| `/dive-gallery` | 9 | 134 (14 × 9 + 8; 15 pages) | infinite scroll + Load more button; `?page=N` = that page only; `?tag=` |
| Blog post sidebar | 3 rec slides | | |
| Video detail | FAQ 5, related 3 | | |

---

## 10. Links

**Internal destinations that exist in `src/routes.js`, so render them as router links:**
- `/blog/`, `/blog/<slug>` (cards, news digest footer, rec carousel BLOG slides)
- `/case-studies/`, `/case-studies/<slug>/`
- `/videos/`, `/videos/<slug>/`, `/videos/?category=…` (video tag links)
- `/ecosystem/`, `/ecosystem/<slug>/` (also absolute `https://motherduck.com/ecosystem/hex/` inside case prose: strip the origin)
- `/product`, `/product/dives/` (prose)
- `/` (post footer)
- listing self-links with params

**Internal paths NOT in the route map. Flag them; render as non-link spans (UnderlineLink without `to`) or point them to the 404 stub:**
- `/authors/<slug>` (post byline)
- `/webinar/<slug>` (rec carousel WEBINAR slides, ecosystem icons)
- `/learn/<slug>` (68 learn cards)
- `/events/<slug>/` and `/events/past/`
- `/dive-gallery/dives/<slug>` and `/dive-gallery/users/<id>`

**Excluded:** `/docs/*` links (prose, ecosystem icons; 23 on `/ecosystem`) must render as non-links.

**External (render as non-links; keep styling):**
- duckdb.org, substack, aws.amazon.com, wikipedia, github.com, slack.motherduck.com
- partner domains (airbyte.com, dagster.io, cube.dev … about 70 hosts on `/ecosystem`)
- case-study company logo links (aheadcomputing.com, together.ai, zero.health, linkedin.com …)
- every quack card (venturebeat.com, thenewstack.io, siliconangle.com, youtube.com …)
- news digest items
- app/auth links ("Get Started", "Try 7 Days Free" → auth.motherduck.com)
- share buttons (twitter/linkedin/facebook)
- `mailto:` links (community code, post footer)
- "Apply to be a speaker"

**Video embeds:** YouTube iframe on every `/videos/:slug` (`youtube.com/embed/<id>`) and occasional YouTube/vercel iframes inside blog posts. Use a static placeholder frame.

---

## 11. Assets (inventory only; render everything with `<Placeholder>`, download nothing)

| Asset | Where | Size / format |
|---|---|---|
| Post thumbnails | PostCard, featured | 16:9 cover; natural ~500×270–278 avif via next/image; displayed 388.7×216.6 @XL, 617×350 featured |
| Subscribe mascot | SubscribeTile | 205×205 (140 MD), avif (`blog-subscription-card`, natural 418×414) |
| Subscribe icon | SubscribeBand | 140×140 (130/100), avif (`blog-subscription-icon`, 400×400) |
| Newsletter mascot illustration | SubscribeBanner | 290×264 SVG illustration |
| Prose images | posts | 816 wide, 2px border, png/jpg via next/image (avif served) |
| Rec carousel images | sidebar | 16:9, 329×185 @XL (natural up to 6390×3445 png/jpg) |
| Case logos | carousel, cards, profile card | svg/png/webp; ~150–360 × 40–60 contain |
| Case headshots | carousel | 90×90 square (natural 89×89) |
| Case profile photo | detail | 355×324 cover (natural 358×358) |
| Video thumbnails | VideoCard, featured | 16:9, natural 350×196 / 620×348 |
| Sand grid pattern | video hero/band | `/images/sand-grid-pattern.png` (tile 640 wide); recreate with CSS |
| Transparent grid pattern | eco BuildCTA | `/images/transparent-grid-pattern.png` (648 wide); recreate with CSS |
| Blue misc mask | eco BuildCTA | `blue-bg-misc-desktop.avif` (mask image); use a plain rounded shape |
| Partner logos | eco cards/detail | mostly SVG; h60 contain; detail 308×120 |
| Learn icons | LearnCard | 120×120 png (natural 235–534) |
| Events mascot | SpeakerBanner | `feature-community.avif` 122×100 |
| Events illustration | EventsHero | 330×347 svg |
| Eco hero illustration | EcoHero | 650×360 svg |
| Dive hero image | D1 | 480×297 png (natural 819×516) |
| Dive card thumbnails / avatars | D1 | 16:9 webp; 28px circles (gravatar/auth0) |
| Decorative doodles | heroes, cards | inline SVG line art: neutral shapes only |
| `noise-bg-dual-gradient.png` | loaded on every page (as on the homepage) | where it is applied was not located on these templates; **UNMEASURED** |
| Fonts | | Same set as the homepage + `AeonikMono-Bold.woff2` (see §2) |

---

## 12. Not measurable / caveats

- Spinner, sidebar-in and modal keyframe bodies (`fEWCgj`, `jBcSpD`, `ghqoEY`, `dWInNU`) are not exposed in readable stylesheets. The substitutes are stated above.
- Mobile Subscribe button target, "Apply to be a speaker" target, and the ecosystem "+N" overflow behaviour were not inspected beyond geometry.
- Case carousel wrap/loop behaviour at the last slide is UNMEASURED.
- No-results typography is UNMEASURED; the label strings were recorded.
- Partner modal close control: none found. The form is a third-party style form; build it as a static placeholder.
- The dive gallery is a separate Next app. Its nav was measured at 1440 only. Mobile nav behaviour is UNMEASURED.
- Counts reflect the live site on 2026-10-23 and will drift.
