Source: https://motherduck.com/

# Extra page templates: build spec (sitemap routes the clone does not have yet)

This spec covers the 1009 paths in `MISSING_ROUTES.txt` (plus the `/glossary` index, which exists on the original but is not in that list). It was measured live with headless Playwright (Chromium) on 2026-10-26 at 1440, 1280, 768 and 390. All values are `getComputedStyle` / `getBoundingClientRect` readings. Hover, focus, click and scroll states were triggered with real pointer events. HTTP redirects were checked for all 1009 paths with `curl -L`. Anything that was not measured is marked **UNMEASURED**.

**Breakpoint shorthand** (same as CLONE_SPEC §0): **XL** ≥1302 · **LG** 960–1301 · **MD** 728–959 · **SM** <728. "a / b / c / d" means XL / LG / MD / SM. Where only one value is given, it holds at every width.

**Font shorthand:** Mono = `font-mono`, Fono = `font-fono`, Inter = `font-sans`, ink = #383838. Every Mono/Fono heading is UPPERCASE unless stated.

**Container:** `Container` (100% / 728 / 960 / 1302, padding 24 / 20 / 20 / 30). Content x/width: 99/1242 @1440, 180/920 @1280, 40/688 @768, 24/342 @390. Every block sits in `Container` unless it says full-bleed or names its own max-width.

**Content policy (same as the sibling specs):** text is recorded as role plus `[chars/words]` and line count only. Short UI labels (buttons, chips, field placeholders, section labels) are written out. No article bodies, glossary definitions, event descriptions, bios or transcripts are copied. Every image, logo, avatar, embed and illustration is a `<Placeholder>` at the stated size.

**Related specs.** Reuse their tokens and components and do not re-measure them: CLONE_SPEC §0 (tokens, header, footer), PAGES_SPEC_MARKETING (MarqueeBand B2, CompareCards B8, FAQ B9, GalleryTeaser, PersonaSplitRows B18), PAGES_SPEC_COMPANY (P1–P4 primitives, D1 ContactSplitForm, F1 LegalPage, G LP blocks, H BookOffer), PAGES_SPEC_CONTENT (PostCard F4, SubscribeBand B2, EventRow H4, SearchFilterPanel F2, VideoDetail L6 blocks V1–V7, ArticleProse §6, ProsePage P1, Dive gallery D1). Header and footer are the existing `Header` / `Footer` on every route here except where §2 says otherwise.

---

## 1. Route inventory

### 1a. Redirects (HTTP 3xx on the original; build these as client redirects, not templates)

| Path | Final destination | Destination in clone? |
|---|---|---|
| `/case-study-dexibit` | `/case-studies/dexibit` | yes (`caseDetail`) |
| `/case-study-dominik-moritz` | `/case-studies/dominik-moritz` | yes (`caseDetail`) |
| `/case-study-saasworks` | `/case-studies/finqore` | yes (`caseDetail`) |
| `/onboarding-sessions` | `/contact-us/product-expert` | yes (`contact`) |
| `/ducklake-open-table-format-guide` | `/lp/ducklake-lakehouse-table-format-book` | route exists (`gated` `/lp/:slug`), but this slug is not one of the six LP datasets in `Gated.jsx`. On the original this LP has its **own minimal nav** (fixed 77.8-tall white bar with 2px ink bottom border; no site header). See §12. |
| `/glossary/dlt` | `/glossary/data-load-tool-dlt` | new (X2) |
| `/glossary/time-series-database` | `/glossary/time-series` | new (X2) |

`/learn-more/*` (linked from chapter summaries) also redirects to `/learn/*` on the original (checked: `/learn-more` → `/learn`). Every other path in `MISSING_ROUTES.txt` returns 200 with no redirect. `/authors`, `/webinar`, `/video` and `/forms` have no index page (404 on the original), so do not build index routes for them.

### 1b. Template map (detail in §5–§8; component files in §13)

| # | Template | Routes | New or reuse |
|---|---|---|---|
| X1 | Glossary index | `/glossary` | NEW |
| X2 | Glossary term | `/glossary/:slug` (347) | NEW, shares ReadNextGrid with X7 |
| X3 | Event detail | `/events/:slug` (251) | NEW |
| X4 | Past events list | `/events/past`, `/events/past/page/:n` (2–13) | **Variant of existing EventsHub (L10)** |
| X5 | Dive detail | `/dive-gallery/dives/:slug` (135) | NEW, inside the existing dive-gallery chrome (D1) |
| X6 | Author | `/authors/:slug` (120) | NEW, reuses PostCard + VideoCard + ContactBand-style band |
| X7 | Learn article | `/learn/:slug` (68) | NEW, reuses VideoDetail sidebar/FAB, FAQSection, ArticleProse |
| X8 | Webinar / video detail | `/webinar/:slug` (13), `/video/:slug` (2) | **Variant of existing VideoDetail (L6)** |
| X9 | Podcast index (dark) | `/explain-analyze` | NEW |
| X10 | Podcast episode (dark) | `/explain-analyze/:slug` (11) | NEW |
| X11 | Research paper | `/research/:slug` (6) | NEW, close to blog ArticleLayout |
| X12 | Persona landing | `/product/for-founders`, `/product/for-operators` | NEW (not ProductRouter blocks except GalleryTeaser) |
| X13 | EU region | `/product/eu-region` | NEW (bespoke) |
| X14 | Azure waitlist | `/product/azure` | NEW (bespoke) |
| X15 | Comparisons index | `/vs` | NEW hero + reused MarqueeBand and CompareCards |
| X16 | Contact support | `/contact-us/support` | **Reuse D1 ContactSplitForm** (variant) |
| X17 | Generic page | `/motherduck-terms-of-service`, `/acceptable-use-policy`, `/fees-addendum`, `/divemaxxing/rules`, `/forms/finance-onboarding`, `/hack-night`, `/getting-started-with-motherduck`, `/local-dev-cloud-prod-dagster-motherduck`, `/react-components-testing`; sidebar-form variant: `/live-demo`, `/duckdb-book-brief-orig` | **Same DOM/styles as the existing `/support-policy` variant of F1 LegalPage** and `/community-code` ProsePage |
| X18 | Legal with TOC | `/terms-of-service`, `/candidate-privacy` | **Reuse F1 LegalPage (TOC variant)**; ToS adds a subtitle line |
| X19 | Split-form LP | `/together-ai`, `/duckdb-book-form`, `/sql-duckdb-book-form` | NEW (one template, 3 routes) |
| X20 | Book chapter summary | `/duckdb-book-summary-chapter1` … `chapter11` | NEW |
| X21 | Gated LP bodies | `/ducklake-open-table-format-full`, `/divemaxxing-full`, `/jev-full` | **Reuse G LP shell (LPSection, FAQ, GatedFormSection)**; new body blocks |
| X22 | Try app | `/try` | Separate app (not the site shell). Recommend excluding like `/docs` (§12). |

---

## 2. Global observations

- **Header.** Every route uses the standard fixed header (main starts at 122 / 112 / 112 / 142) except:
  - `/dive-gallery/dives/:slug`: dive-gallery app nav (66 tall, items "Dive Gallery | HOME | ABOUT | DOCS ↗ | Join our Slack | SIGN IN"), main at y=66. It is already covered by `OWN_NAV_PREFIXES = ['/dive-gallery']` in `App.jsx`, and its nav is D1's nav.
  - `/explain-analyze` and `/explain-analyze/:slug`: same header DOM, but the page body background is ink, so the header renders **dark**: eyebrow banner unchanged (#FEB9E2); nav row transparent over ink; all nav labels, LOG IN and caret icons `#FFFFFF`; logo wordmark paths white (duck mark keeps #FF9538); START FREE button bg `ht-blue` #1276BF with a 2px white border and white label. Implement this without editing `Header.jsx`: on mount, X9/X10 set `document.body.dataset.theme = 'dark'` (and remove it on unmount), and the extra stylesheet scopes overrides under `body[data-theme="dark"] header`. The footer on these pages is the standard footer on an ink body (its links render white, measured `rgb(255,255,255)`). Flag: verify against the existing `Footer` markup when building.
  - `/try`: separate app with its own 53-tall top bar (§12).
- **Body background** is cream everywhere except X9/X10 (`body` bg #383838 plus a full-size `::before` on the page root with `noise-bg-dual-gradient.png`, `background-size: 250px auto`, opacity 1, absolute inset 0, z 0). Render the noise as a CSS noise substitute or omit it.
- **Scroll reveal** (`.scroll-animate-up`, content spec §2) is used on: X6 cards, X13 "latest posts" cards. Not used on X1, X2, X7, X11.
- **LiftCard lift 14** (ink backing, translate(14,-14) on hover ≥960, 120ms ease-in-out) is used on: ReadNext cards (X2, X7), author grid cards (X6), past-event rows (X4), event "More upcoming" cards (X3; measured **translate(12,-12)**), EU-region webinar rows (X13).
- **New fonts** (all OFL on Google Fonts, load per page, not globally): **Fira Mono 400** (X9 ASCII title), **Geist 600 / Geist Mono 400/500/700** and **Anybody 100–900** (X21 `/jev-full` only), **Source Serif 4 + Geist** (`/try` only, excluded). AeonikMono-Bold is requested on several pages (X1, X2, X21): use the same synthetic-bold approach as the sibling specs.

---

## 3. New tokens (add only if a sibling spec has not already added them)

### 3a. Colours
| Token | Value | Used by |
|---|---|---|
| `term-blue` (= existing `sky-dark`) | `#2BA5FF` | glossary card titles, glossary back link |
| `ring-orange` (= existing `orange`) | `#FF9538` | glossary search focus ring `0 0 0 3px` |
| `recording` **new** | `#75E8D9` | "Recording Available" event tag (X4) |
| `hairline-mid` **new** | `#C0C0C0` | event-details sidebar row dividers (1px), explain subtext |
| `ea-*` **new** (X9/X10 dark palette) | bg page `#383838` (body), panel `#0A0A0A`, card `#111111`, card-border `#1F1F1F`, rule `#1A1A1A`, line `#2A2A2A`, icon-border `#3A3A3A`, input `#161616`, input-border `#2F2F2F`, prompt-dim `#555555`, sub `#C0C0C0`, text `#F8F8F7`, accent `#97D4FF` (= `sky`), notes-cta `#FFDE00` (= `sun`), chapter hover `rgba(255,255,255,0.06)`, icon-tile bg `rgba(0,0,0,0.25)` | podcast pages |
| `admon-*` **new** (prose admonitions; X17 `/react-components-testing`, X20) | NOTE bg `#E5E5E5` bar `#C1C1C1` title ink · TIP bg `#FEEFAD` (= `callout`) bar `#EBCD00` title `#746500` · INFO bg `#CEEBFF` (= `sky-tint`) bar `#5CBAFF` title `#135586` · WARNING bg `#FFDCBD` (= `peach`) bar `#FF9538` title `#A45916` · DANGER bg `#FFCBC8` bar `#FF7169` title `#932720` | ArticleProse admonition block |
| `ide-*` **new** (X14) | frame bg `#CEEBFF`, pane border `#97D4FF`, sql keyword `#1276BF`, line-number `#356A91`, placeholder value `#818181`, editable value `#E23F35` (= `error`) on `#CEEBFF`, toolbar separators `#D7D7D7`, select border `#C0C0C0` | Azure SQL-IDE form |
| `jev-*` **new** (X21 `/jev-full`) | bg `#141413`, card `#1F1F1C`, line `#3A3A35`, muted `#A19C91`, text `#F4EFEA`, note on yellow `#3D3A1E`; accent `sun` #FFDE00 | Jev LP |
| `lp-dark-outline` | `rgba(255,255,255,0.2)` | X21 ducklake "why" cards border |
| `teal-bright` (COMPANY) | `#53DBC9` | research TryCard header, ducklake LP card |
| `peach` / `orange` (existing) | `#FFDCBD` / `#FF9538` | "gated" ReadNext card (peach body + orange chip), founders gated card |
| `garden` (existing) | `#16AA98` | chapter-summary book panel |

### 3b. Type roles (new; existing roles reused where noted)
| Token | XL | LG | MD | SM | Where |
|---|---|---|---|---|---|
| `gloss-h1` | Mono 56/67.2 | = | 40/56 | 32/44.8 | X1, X2 H1 (X2 also X17 H1 at MD/SM) |
| `gloss-lede` | Inter 18.4/28.52 300 ls .368 `gray-500` #818181 | = | = | = | X1 hero lede (inline count Mono 18.4 600 ink) |
| `gloss-count` | Mono 12.5/12.5 ls .75 UPPER #818181 (number 700 ink) | = | = | = | X1 sticky bar count |
| `gloss-letter` | Mono 27.2/27.2 600 UPPER | = | = | = | X1 section letter |
| `gloss-card-title` | Inter 16.8/16.8 600 ls −.084 #2BA5FF | = | = | = | term cards |
| `gloss-card-def` | Inter 14.8/22.2 300 ls .296 #818181, clamp 2 | = | = | = | term cards |
| `readnext-h2` | Mono 36/50.4 | 28/39.2 | 32/44.8 | 24/33.6 | "READ NEXT" (X2, X7) |
| `rec-title-mono` | Mono 20/28 | = | 18/25.2 | = | ReadNext card title |
| `event-h1` | Mono 56/67.2 | 48/57.6 | = | 32/38.4 | X3 |
| `event-h2` | Mono 28/33.6 | = | 32/44.8 | 24/33.6 | X3 "About This Event" |
| `event-about` | Inter 18/28.8 300 ls .36 | 16/25.6 ls .32 | = | = | X3 |
| `event-card-title` | Mono 22/26.4 | 18/21.6 | = | = | X3 more-events cards |
| `author-h1` | Mono 56/67.2 | = | 40/56 | 32/44.8 | X6 |
| `learn-h1` | Mono 48/57.6 | 32/38.4 | = | 24/33.6 | X7 |
| `research-h1` | Mono 56/67.2 | 48/57.6 | = | 32/38.4 | X11 |
| `ea-title-row` | Mono 19/32.3 | 17/28.9 | 14/23.8 | = | X9 tagline rows |
| `ea-h3-latest` | Mono 28/32.2 white | 24/27.6 | = | 22/25.3 | X9 latest episode |
| `ea-card-title` | Mono 19/22.8 white | = | = | 17/20.4 | X9 grid cards |
| `ea-h1` | Mono 34/37.4 white | 28/30.8 | = | 24/26.4 | X10 |
| `ea-meta` | Mono 12/16.8 300 ls .72 #818181 | = | = | = | dates/durations |
| `ea-prompt` | Mono 14/16.8 ls .56 lowercase (`$` #555, verb #818181, arg #97D4FF) | = | = | = | terminal-style section labels |
| `persona-h1` | Mono 44/48 | = | 40/43.6 | 28/30.52 | X12 hero H1 and closing H2 |
| `persona-h2` | Mono 40/48 | 32/38.4 | = | 28/33.6 | X12 section H2 |
| `persona-h3` | Mono 20/26 ls .4 | = | = | 18/23.4 ls .36 | X12 feature titles |
| `persona-lede` | Inter 18/28.8 **400** ls .36 | = | = | 16/25.6 ls .32 | X12 paragraphs (note 400, not 300) |
| `azure-h1` | Mono 104/104 ls −1.04 centred | 88/88 ls −.88 | 64/64 ls −.64 | 40/40 ls −.4 | X14 |
| `azure-h2` | Mono 56/61.6 | = | 44/48.4 | 32/35.2 | X14 |
| `azure-cta-h2` | Mono 64/67.2 white | = | 48/50.4 | 36/37.8 | X14 closing band |
| `page-h1-sm` (COMPANY) | Mono 56/67.2 | = | 40/56 | 32/44.8 | X17 (padding 64/0/36 · 40/0/36 · 40/0/32 · 40/0/32) |
| `lp-split-h1` | Mono 56/67.2 centred | 48/57.6 | 40/48 | 24/33.6 | X19 |
| `chapter-h1` | Mono 56/67.2 | = | 48/57.6 | 32/44.8 | X20 |

### 3c. Shadows / radii
New hard shadows: `hard-4` (exists), `hard-6` (exists), `hard-8` (MARKETING) `-8px 8px 0 0 #383838` (Azure IDE, divemaxxing embed). Hover shadows on X12: `-4px 4px 0 0 ink` (nav arrows, logo tiles), `-6px 6px 0 0 ink` (agent cards), `-12px 12px 0 0 ink` (gated card hover). X9 card glow: `0 0 0 1px rgba(151,212,255,.15), 0 8px 24px rgba(0,0,0,.45)`. Radii: X12 media frames 20 (16 MD, 10 SM); X21 jev cards 28 / 24 / pill 999.

### 3d. Motion / keyframes (new)
| Name | Definition | Used by |
|---|---|---|
| `cursor-block` | `0%,49% {opacity:1} 50%,100% {opacity:0}`, 1.05s `steps(2,start)` infinite | X9 block cursor after the ASCII title |
| `feature-rise` | `0% {opacity:0; transform:translateY(12px)} 100% {opacity:1; transform:none}`, 0.45s `cubic-bezier(0.34,1.4,0.64,1)`; per item: icon delay `i×0.08s`, title and text delay `(i+1)×0.08s`; starts when the list enters the viewport (opacity 0 before) | X12 dark feature list |
| `hero-diagram-*` | stroke-draw `stroke-dashoffset 1→0` 0.32s `cubic-bezier(.33,1,.68,1)` (delays .26/.31/.36/.41s); fades `opacity 0, translateY(4–10px) → none` 0.16–0.36s `cubic-bezier(.22,1,.36,1)` (delays 0–1.26s); chip pop `scale(.6)→1` 0.16s; once on load | X12 hero SVG diagram (rebuild as a static Placeholder; optional) |
| `bob` | existing PersonaSplitRows image bob (`cAtcfa` 3s ease-in-out infinite) | X19 sneak-peek panel |
| `jv-flick` | `0%,97%,100% {opacity:1} 98% {opacity:.82} 99% {opacity:.95}`, 6s `steps(1)` infinite | X21 jev headings |
| `jv-type` | width `calc(12ch - .24em)` → 0 → back, `steps(12)` | X21 jev typed line |
| `modal-in` (CONTENT) | 200ms | X8 gated-video modal |

---

## 4. Reuse map (existing components → where they are reused here)

| Existing | Reused in | Notes |
|---|---|---|
| `content/feedCards.jsx` `PostCard` | X6 grid, X13 "latest posts" | unchanged (lift 14, reveal-up) |
| `content/videos.jsx` `VideoCard` | X6 grid (mixed with PostCard) | unchanged |
| `content/videos.jsx` `SandBand`, `VideoPlayerFrame` | X8 | X8 has no back link, so the content overlap differs (§6 X8) |
| `content/videos.jsx` `VideoSidebar` + `TocFab` | X7 | X7 swaps the yellow TryCard for a cream "Start using" card (§5 X7) |
| `content/videos.jsx` `FAQSection` (= `ui/Accordion`) | X2 (inside the 1000 column), X7, X20 (chapter 1), X14 (contained) | same values as V6 |
| `content/ArticleProse.jsx` | X2, X7, X8, X10 (dark), X11, X17, X19, X20 | add the admonition block (§3a `admon-*`, §8) and a `tone="dark"` variant for X10 |
| `content/Toc.jsx` | X11 (blog-style TOC, cream box, Mono title), X18 | |
| `content/subscribe.jsx` `SubscribeBand` | X3 ("Hear about upcoming events!" band: same layout, Fono 24 title) | title text differs only |
| `content/filters.jsx` `SearchFilterPanel` | X4 | unchanged |
| `content/cases.jsx` `BackToTop` | X3 (fades in at scrollY 500; hidden <960) | threshold measured 0 at 300, 1 at 500 |
| `content/EventsHub.jsx` hero, SpeakerBanner, EventRow | X4 | |
| `company/contact.jsx` `ContactSplitForm` | X16 | variant props §7 |
| `company/legal.jsx` | X17, X18 | add variants §7 |
| `company/lp.jsx` `LPHero`, `LPSection`, `FAQSection`, `GatedFormSection` | X21 | |
| `company/about.jsx` `ContactBand` (sun band + TiltedTag coral −10.8°) | X6 subscribe band | same frame; contents swapped for a form (§5 X6) |
| `marketing/MarqueeBand.jsx` | X15 (yellow "WHY MOTHERDUCK") | unchanged |
| `marketing/vs.jsx` CompareCards | X15 (6 cards, no exclusion) | unchanged otherwise |
| `marketing/feature.jsx` `GalleryTeaser` | X12 for-operators "See what you can build" | same classes on the original (`sc-4a23933f`) |
| `marketing/persona.jsx` `PersonaSplitRows` row | X19 "Sneak Peek" panel | same classes (`sc-6b8397dd`), coral-red image panel |
| `ui/OffsetButton`, `UnderlineLink`, `TextInput`, `Checkbox`, `LiftCard`, `Placeholder` | everywhere | |

---

## 5. Slug-driven templates

### X1. Glossary index `/glossary`

**Section order:** Hero → sticky search/letter bar → letter sections (A–Z) → site footer. No scroll reveal, no paging (all 347 terms rendered at once).

**Own inner container** (not `Container`): max-width 1120, padding 0 24, centred (x=160 @1440, 80 @1280, 0 below 1120 + 48).

- **Hero:** full-bleed, padding 80/0/36 (XL) · 64/0/36 (other), border-bottom 1px ink. Heights 290.8 / 274.8 / 263.5 / 355.2.
  - H1 `gloss-h1` "Data Engineering Glossary" (25ch), 1 line (2 at SM).
  - Lede `gloss-lede`, margin-top 20, max-width 681.9, [148ch/24w] 3 lines (5 at SM). It contains an inline bold count "N terms" (Mono 18.4/28.52 600 ink).
- **Sticky bar:** full-bleed, bg cream, padding 16 0, border-bottom 1px ink, `position:sticky; top:0; z-index:20`. Inner flex column gap 14. Heights 129.6 / 129.6 / 161.6 / 187.6.
  - Row 1 (flex wrap, align centre, gap 14): search label (relative; 981.5 / 981.5 / 629.5 / 251.5 wide) + count.
    - Input `type=search`: 53.6 tall (47.6 SM), padding 13 16 13 44, bg white, 1px ink border, square, Inter 16/25.6 400. Placeholder "Search terms & definitions…". 18px search glyph absolute at left 15, vertically centred.
    - Focus: border ink + `box-shadow: 0 0 0 3px #FF9538`, outline none.
    - Count `gloss-count`: "347 terms" at rest; "Showing N of 347" while filtering.
  - Row 2: letter nav, flex wrap gap 3. Items "#", A…Z (27 links), each 30×29 (29×29 SM), grid-centred, 1px transparent border, Mono 13/13 ink, href `#g-<L>` (`#g-num` for "#").
    - Hover: border-color ink (no bg).
    - Letters with no (matching) terms: opacity .32. On the full list "#", X and Y are dimmed.
  - **Original bug:** the bar sticks at `top:0`, i.e. underneath the fixed 122px header, so it is hidden once stuck. Clone: use `top: var(--header-total)`. Deliberate deviation; flag it.
- **Letter sections:** main padding 8/0/48. Each `section#g-<L>` padding-top 40, `scroll-margin-top: 140px`.
  - Header row: flex, baseline, gap 14, padding-bottom 10, margin-bottom 18, border-bottom 1px `sand-dark` #E1D6CB. Letter `gloss-letter`; count Mono 12/12 ls .72 #818181 ("27 terms").
  - Grid: 3 × 348, gap 14 (≥960; 1072 wide); 1 column below 960 (720 @768, 342 @390).
- **Term card** (`<a>` → `/glossary/<slug>/`): white, 1px #E1D6CB border, padding 16 18, height 102.2.
  - Title row: flex, centre, gap 7; title `gloss-card-title` (1 line) + a "→" (Mono 16.8 600 #818181, 10 wide).
  - Definition `gloss-card-def`, margin-top 7, clamp 2.
  - Hover: border ink, `translateY(-2px)` (`border-color, transform .12s ease`); arrow opacity 0 → 1 and `translateX(-3px)` → 0 (`all .12s ease`). Title colour unchanged.
- **Behaviour:**
  - Letter click: instant jump (`scroll-behavior:auto`), sets `location.hash`, section lands 140 below the viewport top.
  - Search filters client-side as you type over title and definition. Sections with no matches disappear and their letters dim. The URL is not changed.
  - No results: the sections are replaced by a centred block (padding 80 0): `p.big` Mono 17.6/24.64 300 UPPER ink "No terms match your search", then Inter 16/22.4 300 #818181 "Try a shorter or different keyword."
- **Counts:** 347 terms (sections: A 27, B 6, …; derive the rest from the slug list).
- **Data:** `{ slug, term, letter, summary }`; the summary is shared with X2's lede.

### X2. Glossary term `/glossary/:slug` (347; samples `acid`, `ai`)

**Section order:** Container (back link → H1 → meta → lede → prose body → Related terms → optional FAQ) → full-bleed ReadNext section → footer.

- **Column:** `Container` with padding 24 30 48 (XL) · 34 20 48 (LG) · 0 20 24 (MD) · 0 24 24 (SM). Inner column max-width 1000, centred (x 220 @1440; full container width below).
- **Back link:** `<a>` "← Back to Glossary", Inter 14/19.6 400 #2BA5FF, padding-top 64 (XL) / 40. Hover: underline.
- **H1:** `gloss-h1`, padding 12 0 16 (term name, 2–40ch).
- **Meta:** "Last updated <time>Month YYYY</time>", Inter 14/14 400, opacity .6, padding-bottom 16.
- **Lede:** Inter 18/28.8 300 ls .36 #818181, padding-bottom 32, [120–240ch] 3 lines @1440.
- **Body:** ArticleProse (§6 of CONTENT; h2 Fono 24/28.8 → 24/33.6 below 960). Shapes seen:
  - (a) 3–4 sections, each H2 + p/ul, about 700px tall @1440;
  - (b) 2 paragraphs only, with bold external links and a "Watch:" line linking a `/videos/<slug>`.
- **Related terms:** margin-top 56. H2 "Related terms" Mono 18/25.2 UPPER, padding-bottom 16. Grid of 6 term cards (X1 card): 3 × 324 gap 14 (XL), 2 × 453 (LG), 1 column (MD/SM).
- **FAQ (optional, present on `acid`, absent on `ai`):** `section#faqs`, bg cream, constrained to the 1000 column. It is the CONTENT V6 FAQSection: title row "FAQS" Mono 40/48 padding 34 0; items with a 2px ink top border, padding 26 0; question `faq-q` (23/32.2 · = · 17/23.8 · 16/22.4); at XL the item content has margin-right 202.4 and the 260×231 duck illustration sits absolute right (hidden <1302). 2–5 items.
- **ReadNext section** (shared with X7; build once as `ReadNextGrid`):
  - Full-bleed, border-top 2px ink, padding 80/0/160 (≥960) · 80/0/112 (MD) · 112/0/112 (SM). Inside `Container`.
  - H2 `readnext-h2` "READ NEXT", margin-bottom 40 / 40 / 32 / 32.
  - Grid: 3 columns (392.7 XL, 285.3 LG, gap 32); 1 column, max-width 400, centred, gap 24 (MD/SM).
  - Card: `LiftCard lift={14}` (measured translate(14,-14) on hover). Ink backing → `<a>` with 2px ink border, flex column → photo 16:9 (bg cream, border-bottom 2px, image cover) → body (white, padding 32 (≥960) / 24, gap 12): kind chip (Mono 12/16.8 ls .48 UPPER, bg cream, 1px ink border, padding 4 8; labels seen BLOG, DOCS, VIDEO, ECOSYSTEM, PRODUCT) + title `rec-title-mono` (1–3 lines).
  - Gated/product variant (seen on X7): photo bg `peach`, body bg `peach`, chip bg `orange`, plus a trailing label "Explore the product" (Mono 14/14 500 ls .56 UPPER). The `rec-gated-card` link goes to a product page.
  - Footer: UnderlineLink "View all terms" (X2) / "View all articles" (X7) → `/glossary/` / `/learn/`. Right-aligned (≥960) / centred (<960), margin-top 40.
- **Heights @1440:** term `acid` page 3780, `ai` page 2870.
- **Data:** `{ slug, term, summary, updated: 'Month YYYY', body: blocks[], related: slug[6], faqs: {q,a}[0–5], readNext: {kind, title, href, image}[3] }`. Redirect aliases (§1a) map to canonical slugs.

### X3. Event detail `/events/:slug` (251; samples `ai-council-2026` upcoming, `ai-by-the-bay-2025` past)

**Section order:** Sand hero → 2-column body (article + sticky sidebar) → newsletter band → "More Upcoming Events" → BackToTop overlay. Upcoming and past events use the same template; optional blocks simply disappear.

- **Hero:** full-bleed, bg `sand-chip` #ECE5DD, border-bottom 2px ink, padding 56 0 (XL) · 60 0 (LG) · 60/0/40 (MD) · 64/0/40 (SM). Heights 317.6 / 316 / 407.2 / 417.6.
  1. Back row: 20px chevron rotated 90° (pointing left) + UnderlineLink "BACK TO EVENTS" → `/events/`, gap 6, padding-bottom 32 (≥960) / 24.
  2. H1 `event-h1`, margin-bottom 24 (1–2 lines).
  3. Meta row: margin-top 32 (≥960) / 24. Row, align centre, gap 18/24 (≥960); column, gap 18 (<960).
     - Type tag: bg `apricot` #FFC18A, 2px ink, padding 6 12, gap 8, 20px icon + Mono 14/14 600 UPPER ("In Person" / "Online"). Margin-bottom 8 at <960.
     - Two info items, each: 32px line icon + text block (gap 12). Label Inter 14/19.6 #818181 ("Date & Time", "Location"), margin-bottom 2. Value Inter 16/25.6 400 ink (date line 36–44ch; location 17–28ch, may start with a flag emoji).
- **Body grid** (`Container`): columns `818px 318px` gap 106 (XL) · `570px 318px` gap 32 (LG) · one column, gap 80 (MD) / 40 (SM). Padding 80/30/120 · 56/20/120 · 48/20/120 · 40/24/120.
  - **Article:**
    - H2 `event-h2` "About This Event" (margin-bottom 16) + p `event-about` [250–530ch] 3–8 lines.
    - Optional "What You'll Learn" card: margin-top 40, white, 2px ink, padding 32 (XL) / 24. H3 Mono 18/21.6 UPPER (margin-bottom 16). List: margin-top 16, column, gap 12; each item = 28px check icon + Inter 16/25.6 300 (padding-top 2), 1–2 lines; 3 items.
    - Optional "Who Should Attend": margin-top 40. H3 as above + p Inter 16/25.6 300 ls .32 ("This event is ideal for:") + tag row (margin-top 16, wrap, gap 8). Tags: bg `sand-chip`, 2px ink, padding 6 12, Mono 12/16.8 500 UPPER; 4 tags.
  - **Sidebar** `aside#detail-sidebar`: sticky `top:168px` (XL) / `142px` (LG); static at <960 (full width). Box: white, 2px ink, padding 24.
    - H3 "Event Details" Mono 18/21.6 UPPER, margin-bottom 16.
    - 5 rows: Date, Time, Format, Location, Price. Each row: flex space-between, gap 48 (≥960) / 32, padding 12 0, border-bottom 1px #C0C0C0. Label Inter 14/19.6 400 ink; value Inter 16/25.6 300 right-aligned (1–2 lines).
    - CTA: margin-top 24, `OffsetButton size="lg"` primary full width (266 @XL) "Register" + arrow. External registration URL, so render it as a non-link button. Past events keep the same "Register" button.
- **Newsletter band:** full-bleed, bg `sand-chip`, padding 80 0 (XL) · 64 0 (LG/MD) · 40 0 (SM).
  - Row, centred, gap 80 (XL) / 24 (LG/MD); column, gap 24 at SM.
  - Icon Placeholder 140 / 140 / 130 / full width × 100.
  - Form: column, gap 32. H2 Fono 24/33.6 (≥960) / 16/22.4 UPPER "Hear about upcoming events!". Grid `434px 113.7px` (402 @768) gap 20/16: email TextInput float 56 tall (placeholder "E-mail") + disabled Submit (113.7×55.2), then the solid Checkbox (label [37ch]). One column at SM.
  - This is the CONTENT B2 SubscribeBand with a different title. If `SubscribeBand` does not already take a `title` prop, build `EventNewsletterBand` in `components/extra/events.jsx` with these values rather than editing `subscribe.jsx`.
- **More Upcoming Events:** full-bleed, border-top 2px ink, padding 80/0/120 (≥960) / 64/0/120.
  - H2 Mono 24/28.8 UPPER "More Upcoming Events", margin-bottom 40 (24 SM).
  - Grid 3 × 392.7 gap 32 (XL) · 3 × 290.7 gap 24 (LG) · 2 × 332 gap 24 (MD) · 1 column (SM).
  - Card: ink backing; `<a>` white, 2px ink, padding 24, column gap 8; height 278.4 / 259.6 / 251.6 / 251.6. Contents: type tag (as hero, but 18px icon, Mono 12/12, margin-bottom 8) → date line Inter 16/24 300 #818181 clamp 1 → H3 link `event-card-title` (1–3 lines) → UnderlineLink "LEARN MORE" + arrow (padding-top 32, `margin-top:auto`).
  - Hover (≥960): translate(12px,-12px), 120ms.
  - Then a centred `OffsetButton size="lg"` primary "View Category" → `/events/`, margin-top 40.
- **BackToTop:** CONTENT C5 component at margin `0 100px 32px auto` (XL) / `0 32px 32px auto` (LG). Opacity 0 at scrollY 300, 1 at 500 (150ms). Hidden <960.
- **Data:** `{ slug, title, type: 'In Person'|'Online', dateLong, date, time, tz, location, format, price, about, learn?: string[3], audience?: string[≤4], registerUrl (external), past: bool, recording?: bool }`. "More Upcoming" = the next 3 upcoming events (the same 3 cards on both samples).

### X4. Past events `/events/past` and `/events/past/page/:n` (variant of EventsHub L10)

Same page as `/events` (EventsHero, SpeakerBanner, EventTabs, SearchFilterPanel with Location + Type, EventRow list). Differences:
- The **"Past" tab is active** (ink bg, cream text); "Upcoming" is inactive (`sand-chip`).
- **No SubscribeBanner** inside the list.
- **20 rows per page**, 13 pages (pages 1–12 have 20 rows; page 13 has 4). 244 past events in total.
- Rows can show a second tag after the type tag: "Recording Available" (bg `recording` #75E8D9; same tag style).
- Row CTA is "Watch Recording" (`OffsetButton size="lg"`, 232.4×56.2) when a recording exists, else "View Details". The row lifts 14 on hover (≥960).
- **Numbered pagination** under the list: centred row, gap 12, margin-top 60 (≥960) / 48.
  - Desktop group (≥728): page links "1 2 3 4 5 … 13" with gap 8. On page 2 it shows "1…7 … 13" around the current page. On the last page: "1 … 9 10 11 12 13".
  - Mobile group (<728): a shorter window, "1 2 3 … 13".
  - Page labels: Inter 16/19.2 ls .32 ink; current page weight 600, others 400; no hover change measured.
  - Prev/next: 14×24 chevron links at either end (prev hidden on page 1). Every link targets `/events/past/page/N/#event-list` (page 1 → `/events/past/#event-list`).
- Filters on past pages: UNMEASURED beyond being the same controls; reuse the `/events` behaviour (`?type=` / `?location=`).
- The visually hidden H2 changes to "Past Data Conferences & Events" (30ch).
- **Data:** past events reuse X3's dataset (`past: true`); rows need `{ month, day, year, title, description, locationLine, type, recording }`.

### X5. Dive detail `/dive-gallery/dives/:slug` (135; samples `232000-theorems-and-counting`, `a-home-fit-for-you`)

Lives inside the dive-gallery app chrome (D1 nav, 66 tall; site footer). Only Inter (Google Fonts 300/400/600) is loaded on this page.

- **Page:** wrapper max-width 1440, padding 48 100 (≥960) / 32 24. Inner column max-width 900, centred (x 270 @1440; full width below 948).
- **Back link:** "← Browse Dives" Inter 14/14 #818181 (hover ink) → `/dive-gallery/`, gap 6, margin-bottom 24.
- **Dive card:** white, 2px ink, margin-bottom 32.
  1. Toolbar: flex space-between, gap 12, padding 8 16 (8 12 <960), bg `surface-2` #F8F8F7, border-bottom 1px `sand-dark`. It wraps at SM (109 tall).
     - Left: "Copy Dive to My Account": bg `sky-hover` #6FC2FF, 1px ink, r 2, padding 6 14, Inter 13 500. Hover bg #2BA5FF.
     - Right group (gap 6): "Copy source", "Copy link" (buttons) and "Full screen" (link to `/dive-gallery/embed/<slug>`, new tab). Each: white, 1px `sand-dark`, r 4, padding 5 12, 14px icon + Inter 12 500 #818181. Hover: bg cream, ink text, ink border (.15s).
     - Click feedback: the label did not change within 300ms (UNMEASURED).
  2. Embed area: 630 tall (min 400), bg `surface-2`, border-bottom 2px cream. The original is an `embed-motherduck.com` sandbox iframe (896×628). Clone: static Placeholder frame.
  3. Title block: padding 24 32 16 (≥960) / scaled. H1 Inter 28/39.2 600 (22/30.8 <960), 1–2 lines.
  4. Description: padding 0 32 21, Inter 14/22.4 300 ls .28 #818181, [260–700ch] 3–6 lines.
  5. Tag row: bg `surface-2`, border-top 1px cream, padding 14 32, wrap, gap 8. Pills: white, 1px `sand-dark`, r 999, padding 4 10, Inter 12.5 400 ink (labels from D1 Format/Topic chips), 3–5 pills.
  6. Footer bar: bg ink, border-top 2px ink, padding 12 32 (12 16 <960), flex space-between.
     - Left: "Author: <link> · <date> Region: <code>" Inter 14/14 rgba(255,255,255,.7); author link 600 white → `/dive-gallery/users/<id>` (not in routes, so non-link); region Mono 12 rgba(255,255,255,.85).
     - Right: votes "▲ N" (1px rgba(255,255,255,.3) border, r 2, padding 4 10, Inter 13 600) and "▼" (padding 4 6, Inter 12). Hover: border #6FC2FF, bg rgba(255,255,255,.08).
- **AI Prompts Used** (optional, 0–5): section margin-bottom 40. H2 Inter 22/26.4 600 (18/25.2 <960), margin-bottom 16. Column gap 16.
  - Each prompt: 2px ink frame. Header: bg cream, border-bottom 2px, padding 10 16, gap 10 — 24px circle (bg #1A1A2E, white Inter 12 600 number), label "Prompt N" Inter 13 #666, copy-icon button 22×22 at the right.
  - Body: `<pre>` padding 16, Inter 14/22.4 #111 (wraps), 5–8 lines.
- **Comments:** H2 "Comments" as above.
  - Prompt line: "Log in to leave a comment." Inter 14/19.6 300 #666, with a "Log in" link 600 #1A1A2E (auth, non-link), margin-bottom 16.
  - Empty state: "No comments yet. Be the first!" Inter 14 300 #999.
  - Comment: padding 12 0, border-bottom 1px #F3F4F6. 28px round avatar + name Inter 13 600 + date Inter 12 #999 (gap 8, margin-bottom 6). Text Inter 14/21 300 #333. "Reply" button Inter 12 #666.
- **Data:** `{ slug, title, description, tags[], author: {name, id}, date, region, votes, prompts: string[0–5], comments: {name, date, text}[] }`. The list cards in `/dive-gallery` should link here once built (see §11).

### X6. Author `/authors/:slug` (120; samples `alex-monahan` 31 items, `adi-polak` 1 item)

**Section order:** Hero → "N BLOG POSTS AND VIDEOS" grid → links → Subscribe band → footer.

- **Hero:** full-bleed, padding 110 0 (XL) · 100/0/104 (LG) · 55/0/80 (MD/SM), border-bottom 2px ink, `overflow:hidden`.
  - ≥960: row, align centre, gap 40: photo frame 340×340 (2px ink; image 336 square, Placeholder) + text column (498 wide, gap 16, `translateY(-4px)`): H1 `author-h1` (name), role Inter 20/32 300 ls .4 (16/25.6 SM), bio Inter 16/25.6 300 ls .32 [100–200ch] 2–4 lines.
  - <960: column, gap 40. The H1 moves above the photo (separate element, padding-bottom 24), then the photo (340, not scaled), then role + bio.
  - Decor: a 62×66 sticker shape over the photo's bottom-right (49×52 <960) and a 207×186 outline doodle at the far right (hidden SM).
- **Content grid:** padding 104/0/160 (≥960) / 56/0/112.
  - H2 Mono 32/44.8 (24/33.6 <960) "N BLOG POSTS AND VIDEOS". The count is not pluralised: "1 BLOG POSTS AND VIDEOS".
  - Grid padding 48/0/80 (≥960) / 32/0/64: 3 columns (XL), 2 × 444 (LG, gap 32), 2 × 332 (MD, gap 24), 1 column max-width 350 (SM).
  - Items are newest first, mixing `PostCard` (blog; date line "Mon D, YYYY · Author Name") and `VideoCard` (video; duration badge + tags). Both have reveal-up and lift 14.
  - No paging and no filters (31 items all rendered).
- **Links:** column, centred, gap 40: UnderlineLink "SEE ALL BLOG POSTS" → `/blog/`, "SEE ALL VIDEOS" → `/videos/`.
- **Subscribe band** (`section#subscribe`): the About ContactBand frame.
  - Sun bg, borders 2px top and bottom, inner min-height 400 (450 MD, 508 SM). Inner padding-left 254 (XL) / 160 (LG) / 94 (MD); SM padding 92/24/0.
  - TiltedTag "SUBSCRIBE": coral-red, Mono 32/44.8 (18 SM), rotate −10.8°, translateY −12 (−8 SM), on the top border at left 86 / 64 / 32 / 24.
  - Form (max-width 418): H3 Mono 24/33.6 (18/25.2 <960) "Subscribe to MotherDuck Blog", padding-bottom 32 (28 below XL). Then column gap 20: email TextInput float (418×58), solid Checkbox (label [42ch]), disabled Submit (109.7×56.2, margin-top 4).
  - Right: a 370×336 animated mascot (Lottie in the original) → static Placeholder (320×288 LG, 278×246 MD, 298×266 SM below the form). Bottom-left decor 232×211 (162×148 <1302, hidden SM).
- **Data:** `{ slug, name, role, bio, photo, items: [{kind:'post'|'video', slug, title, date, excerpt, image, duration?, tags?}] }`. Byline links in blog posts (`/authors/<slug>`) resolve here.

### X7. Learn article `/learn/:slug` (68; samples `acid-transactions-sql`, `best-analytics-db-llm-ai-agents`)

**Section order:** Sand hero (title + icon) → article + sticky sidebar (TOC + Start card) → FAQ → ReadNext (X2) → footer.

- **Hero:** full-bleed, bg `sand-chip`, border-bottom 2px ink, padding 80/0/75 (XL) · 64/0/48 (LG/MD) · 64/0/40 (SM).
  - Grid: `815px 333px` gap 94 (XL) · `760px 120px` gap 40 (LG) · `568px 100px` gap 20 (MD) · `246px 76px` gap 20 (SM).
  - Left column (flex column, gap 8):
    1. Back row: chevron + UnderlineLink "BACK TO LEARN" → `/learn/`.
    2. H1 `learn-h1`, padding 16 0 8, [60–80ch] 3–4 lines (8 at SM).
    3. Meta: "N min read · Last updated <time>Month YYYY</time>", Inter 14/14 opacity .6.
    4. Byline: "BY" (Inter 16/19.2 UPPER) + author UnderlineLink(s) UPPER → `/authors/<slug>/` (the blog-post byline row).
  - Right: icon Placeholder 192 square (120 / 100 / 76), contain, vertically centred.
- **Body:** wrapper padding 58/0/132 (XL) · 58/0/124 (LG) · 48/0/124 (MD) · 40/0/124 (SM).
  - XL: row, space-between: ArticleProse max-width 816 + sidebar 333.
  - <1302: column, gap 44 (20 SM); the prose takes the full width.
  - Prose content seen: intro paragraphs, "Key takeaways" list, image 816×480 (2px ink), tables (yellow header, CONTENT §6 table), code blocks, H3 sub-sections; 9–10 H2 sections.
- **Sidebar (XL):** the VideoDetail sidebar (`VideoSidebar`): sticky `top:143px`, width 333, column gap 24.
  - TOC: cream box, 2px ink, "TABLE OF CONTENTS" Mono 18/25.2 ls .36 (padding 24 24 20); list padding 0 16 16 24, gap 12; links Inter 16/25.6 300; scroll-spy weight 600; 8–9 items.
  - "Start" card (replaces the video TryCard): cream bg, 2px ink, padding 30 60, column centred, gap 24, max-width 404. Text Mono 16/22.4 300 ls .32 UPPER centred "Start using MotherDuck now!" (2 lines) + `OffsetButton size="lg"` primary "Try 7 Days Free" (209×56.2, external auth, so non-link).
- **Below 1302:** the sidebar becomes the VideoDetail TOC FAB: sticky wrapper `top: calc(100% - 90px)`, 60×56 primary icon button at the right; the popover TOC is 482 wide (342 SM). The Start card moves to the end of the article: centred, max-width 404, padding 30 60 (30 at SM, 322 wide), gap 16.
- **FAQ:** CONTENT V6 FAQSection, full-bleed, 8–13 items.
- **ReadNext:** X2 `ReadNextGrid`. The first card is often the gated/product variant (peach). Footer link "View all articles" → `/learn/`.
- **Data:** `{ slug, title, readMin, updated, authors: slug[], icon, body: blocks[] (with toc from H2s), faqs: {q,a}[8–13], readNext[3] }`. The `/learn` hub cards should link here once built (§11).

---
### X8. Webinar / video detail `/webinar/:slug` (13), `/video/:slug` (2) — variant of VideoDetail (L6)

Same DOM and classes as `/videos/:slug` (SandBand + `VideoPlayerFrame` + VideoMeta + ArticleProse). Differences, measured on `/webinar/ducklake-livestream`, `/webinar/scaling-duckdb-panel`, `/video/fix-slow-postrges-analytics` and `/video/reliable-ai-agents-for-business-analytics-llms-warehouse`:

- **No back link.** The sand band is shorter and the overlap is smaller:
  - band height 248 / 238 / 210 / 66 (padding-bottom 246 / 236 / 208 / 64);
  - content margin-top −172 / −156 / −144 / −2.
  - At SM the frame bleeds the full 390 (`translateX(-24px)`), as on L6.
- **No sidebar** (no TOC, no TryCard, no FAB), **no Transcript, no FAQ, no Related videos.** The article is full container width (prose max-width 816). Section padding-bottom 120 (XL) / 100.
- **Title block** (`#video-title`, padding-top 32 / 24):
  - Tag chips: Fono 12/16.8 UPPER, bg `sand-chip`, padding 8 12 (4 8 <960), hover `sand-dark` .15s → `/videos/?category=<Tag>#videos-and-webinars-library`; 1–2 chips ("Webinar", "Interview", …).
  - H1 Fono 38/45.6 · 32/38.4 · 32/38.4 · 24/33.6 (2–3 lines).
  - Date Inter 14/19.6 #818181, padding-top 16.
  - Optional **"Featuring:"** line (Inter 14/19.6 #818181, padding-top 8): comma-separated UnderlineLinks (Inter 16/19.2) to `/authors/<slug>/` (resolve to X6).
- **Player — two kinds:**
  1. Public: YouTube iframe (`/video/fix-slow-postrges-analytics`). Render it with the existing static `PlayFrame`.
  2. **Gated (on-demand webinar):** a 16:9 thumbnail image (Placeholder) with a play glyph. Clicking it opens a **registration modal** (ReactModal):
     - Overlay `rgba(56,56,56,0.4)`. Content 720 wide, white, 2px ink, about 631 tall, top ≈158 @1440, animation `modal-in` (200ms).
     - Intro p Inter 20/32 300 (2 lines).
     - FloatingInput float fields: First Name, Last Name, Work E-mail, Company Name.
     - Two solid Checkboxes: "Subscribe to MotherDuck email updates", "Subscribe to DuckDB ecosystem newsletter".
     - Disabled Submit until valid.
     - Clone: open the modal locally; submitting swaps the thumbnail for `PlayFrame`. No network.
- **Prose:** blockquotes with an attribution paragraph ("— Name [mm:ss]"), `hr` separators between H2 sections, bold lead-ins.
- **Data:** `{ slug, kind: 'webinar'|'video', title, tags[], date, featuring: authorSlug[], player: 'youtube'|'gated', thumb, body }`.

### X9. Podcast index `/explain-analyze` (dark)

Dark theme (§2): body ink, header dark variant, noise overlay. Root `min-height:900`. Everything sits in `Container` (z 1).

**1. Hero** (padding 144/0/20 · 112/0/16 · 72/0/12 · 72/0/12). Grid `890px 320px` gap 32 (XL) · `568px 320px` (LG) · one column gap 28 (MD/SM).
- Left:
  - Path label "~/motherduck/podcast" Mono 13/13 ls 1.56 #97D4FF (12/12 ls 1.44 <960), margin-bottom 28 (20).
  - Title: a visually hidden `<h1>` "EXPLAIN ANALYZE", plus two `<pre>` ASCII-art blocks (column, gap 4). Each is Fira Mono 15/15 ls −1 #F8F8F7 (13/13 LG; 10/10 ls −.5 MD; 7/7 ls −.5 SM), 472×90 @XL, 6 rows each. **Do not copy the art.** Draw an equivalent block-letter wordmark or use a Placeholder of the same box.
  - Block cursor: 38×90 (32×78 / 24×60 / 18×42), bg #97D4FF, margin 0 0 2 8, aligned to the end of the second block, animation `cursor-block`.
  - Tagline: margin-top 36, column gap 4, three rows `ea-title-row` #F8F8F7, each prefixed with a ">" (rendered sky in the screenshot), [23–36ch] each.
  - Platform links: margin-top 32, gap 12. Three 48×48 tiles (44 <960): bg `rgba(0,0,0,.25)`, 1px #3A3A3A, icon centred (YouTube, Spotify, Apple Podcasts). Hover: border and icon #97D4FF (.15s). External, so non-links.
- Right — **Unlock card** (`sudo unlock`; shared with X10):
  - 320 wide (full width <960). bg #0A0A0A, 1px #97D4FF, shadow `0 0 0 1px rgba(151,212,255,.15), 0 8px 24px rgba(0,0,0,.45)`, padding 22 (20 <960), column gap 16 (14).
  - Title row (wrap, baseline, gap 8): Mono 17/20.4 ls .34 lowercase — "$" #666, "sudo" #818181, "unlock" 600 #F8F8F7, "--all-shows" #97D4FF.
  - Sub Inter 13/18.85 300 ls .26 #C0C0C0 [38ch].
  - Form (column gap 12):
    - email input: 58 tall, bg #161616, 1px #2F2F2F, r2, padding 16 40 16 24; placeholder "you@company.com" #666; focus border #97D4FF.
    - Checkbox: checked box bg/border #97D4FF; label Inter 16/25.6 #F8F8F7 [37ch] 2 lines.
    - Button full width, 46 tall, margin-top 4, Mono 14/14 700 ls .84 UPPER "Unlock".
      - Disabled: bg #2A2A2A, text #818181, `cursor:not-allowed`.
      - Valid email: bg #97D4FF, text #000, pointer (`transform, box-shadow, background-color .12s`).

**2. Latest episode** (padding-bottom 48 / 48 / 32 / 32).
- Prompt chip H2: inline box bg #0A0A0A, 1px #2A2A2A, padding 10 16, `ea-prompt` "$ cat latest-episode", margin-bottom 16.
- Grid `830px 380px` gap 32 · `508px 380px` · one column gap 20.
- Left (column gap 12):
  - Link block (column gap 8) → `/explain-analyze/<slug>/`:
    - H3 `ea-h3-latest` (2 lines). Hover colour #97D4FF (`color .15s ease`).
    - Meta row: long date "Month D, YYYY" + duration "mm:ss", `ea-meta`, gap 4/12.
    - Tagline Inter 14/21 300 ls .28 #F8F8F7 (1 line).
  - Summary Inter 14/21.7 300 ls .28 #C0C0C0 [~265ch] 3 lines.
  - Platform icons 40×40 (margin-top 4, gap 8).
  - Spotify embed 152 tall → Placeholder.
  - "See show notes" outline button: 1px #FFDE00, padding 12 16, Mono 13/13 ls .78 UPPER #FFDE00, 8px gap to an icon. Hover: bg #FFDE00, text #000 (.15s). Goes to the episode page.
- Right: YouTube frame, 16:9, 380×214.6 (686×388 MD, 340×193 SM), bg #000, 1px #2A2A2A → static `PlayFrame`.

**3. Episodes grid** (padding-top 16).
- Prompt chip "$ ls episodes", margin-bottom 32.
- Grid 3 columns gap 32 (XL) · 2 × 444 (LG) · one column gap 24 (MD/SM); padding-bottom 96.
- Card: bg #111111, 1px #1F1F1F, column.
  - Thumb 16:9 (390.7×218.7), bg #0A0A0A, border-bottom 1px #1F1F1F, cover.
  - Body padding 20 20 14, gap 8:
    - meta row (`ea-meta` ls .48: "Mon D, YYYY", "mm:ss", "with Guest Name"; gap 6/12);
    - title `ea-card-title` (2–3 lines);
    - summary Inter 15/22.5 300 ls .3 #C0C0C0, clamp 2.
  - Footer row: border-top 1px #1A1A1A, padding 8 16 14, gap 4, three 30×30 platform icon links (`color .15s`).
  - Hover: border #97D4FF, `translateY(-2px)` (`border-color, transform .15s ease`). The title stays white.
- 11 cards, newest first; the newest is also the "latest" block.

### X10. Podcast episode `/explain-analyze/:slug` (11; samples `0001-ai-tooling-wars`, `0010-aws-bought-ducklabs`)

Dark theme as X9.
- **Back link:** "BACK TO EXPLAIN ANALYZE" UnderlineLink with a left arrow (`row-reverse`), label #97D4FF. Margin 32/0/16 (XL) / 24/0/12.
- **Wrapper:** max-width 1080, padding-bottom 128 (96 <960).
- **Grid:** `668px 380px` gap 24/32 (XL) · `508px 380px` (LG) · one column gap 24 (MD/SM). Order at <960: header, video, chapters, paywall, transcript.
  - **Header** (column gap 12):
    - H1 `ea-h1` [50–75ch] 2–3 lines;
    - meta row (`ea-meta`: "Month D, YYYY", "mm:ss");
    - tagline Inter 15/22.5 300 ls .3 #F8F8F7 [≤40ch];
    - summary Inter 16/24 300 ls .32 #C0C0C0 [~220ch] 3 lines;
    - platform icons 40×40 (gap 8, margin-top 4).
  - **Right column** (column gap 16):
    - YouTube frame 380×214.6 → `PlayFrame`.
    - **Chapters** panel: bg #0A0A0A, 1px #2A2A2A, overflow hidden.
      - Header: padding 10 14, border-bottom 1px #2A2A2A, space-between. "Chapters" Mono 12/12 ls .72 UPPER #C0C0C0 + speed button "1x" (Mono 12/12 ls .48 #F8F8F7, 1px #2A2A2A, r2, padding 3 8). Click cycles 1x → 1.25x → … (next values UNMEASURED).
      - List: max-height 320, overflow auto, padding 4.
      - Item: flex baseline, gap 10, padding 8 10, border-left 2px transparent, cursor pointer. Time Mono 12/12 #C0C0C0 (46 wide) + label Inter 14/19.6 #ECE5DD (1–2 lines). Hover / current: bg `rgba(255,255,255,.06)`. On the original a click seeks the video; in the clone, highlight only.
      - 16 chapters.
  - **Paywall section** (margin-top 16):
    - Prompt chip H2 "$ cat links" (margin-bottom 12), then a list of 2 visible links: Mono 15/22.5 #F8F8F7 underline, external → non-link; list gap 6, items indented 23.
    - A locked area (margin-top 24): wrapper max-height 460, `filter: blur(6px)`, `mask-image: linear-gradient(#000 30%, transparent 100%)`. It holds ~8 more link items (plain spans) and "$ cat notes" + dark ArticleProse (H2 Fono 24/28.8 #F8F8F7; p Inter 16/25.6 300 #F8F8F7; "Show notes" and "Key takeaways" sections).
    - Over the locked area, an absolute flex overlay (padding-top 56, z 2) centres the X9 unlock card at max-width 440.
    - Clone: keep it locked; an optional local unlock removes blur and mask (behaviour after unlock UNMEASURED).
  - **Transcript** (grid row 2, full width):
    - Margin-top 80 (64 and margin-bottom −24 below XL). 2px #2A2A2A border, overflow hidden.
    - Header: bg #0A0A0A, padding 19 24, border-bottom 2px #2A2A2A, cursor pointer. "Transcript" Mono 16/19.2 ls .8 UPPER #F8F8F7 + "Copy" button (Inter 12/12 600 ls .48 UPPER #97D4FF, 1px #2A2A2A, r2, padding 5 10).
    - Content: max-height **640** at load (XL), overflow auto, `transition: max-height .3s ease`. A header click toggles it to **220**, and a bottom fade (80 tall, `linear-gradient(transparent, #0A0A0A)`, opacity 0 → 1 .3s) appears. Below XL the load state is 220 tall (580 box).
    - Paragraph: flex, gap 12, padding 8 12, border-left 2px transparent, cursor pointer. Time Mono 13/20.8 300 ls .32 #C0C0C0 (40 wide) + text Inter 16/25.6 300 ls .32 #F8F8F7. About 144 paragraphs.
    - **Reuse:** the existing light `Transcript` (`content/videos.jsx`; light header bg `sand-chip`, fade to cream) with a `tone="dark"` prop.
- **Data:** `{ n: '0001', slug, title, date, duration, guest?, tagline, summary, platforms: {youtube, spotify, apple} (external), chapters: {t, label}[16], links: string[2 visible + ~8 locked], notes: blocks, transcript: {t, text}[] }`.

### X11. Research paper `/research/:slug` (6; samples `declarative-caching-in-motherduck`, `motherduck-duckdb-in-the-cloud-and-in-the-client`)

- **Hero:** padding-top 80 / 72 / 64 / 44.
  - Back: UnderlineLink "BACK TO RESEARCH" with a left arrow → `/research/`.
  - H1 `research-h1`, padding 32 0 (24/0/16 SM), [33–50ch] 2–4 lines.
  - Meta (max-width 816, column gap 8): date Inter 14/19.6 300 ls .28 #818181 + row "By" + author string (Inter 16/22.4 400 ls .32; 1 name to a 290ch comma list, 1–4 lines; plain text, not links).
- **Body wrapper:** padding 58/0/176 (XL) · 58/0/112 (LG) · 48/0/112 (MD) · 40/0/0 (SM).
  - XL: row: article (ArticleProse, max-width 816; H2s carry heading-anchor links; images 816 wide; 7–8 H2 sections, 5k–15k px tall) + sidebar (margin-left 93, width 333, sticky `top:148px`, column gap 24):
    - TOC box: same markup as X7 (cream, 2px ink, "TABLE OF CONTENTS" Mono 18/25.2 ls .36; 8 items).
    - **Paper card:**
      - Top panel 116 tall, bg `teal-bright` #53DBC9, 2px ink border (no bottom), an inner grid-pattern image (`grid-bg-pattern.png`; rebuild as a CSS 1px grid), and a mascot Placeholder 145×132 centred at top −18 (overflowing above).
      - Box: 2px ink, padding 20 24 24, centred: "Get the full document" Fono 18/25.2 ls .36 UPPER (padding-bottom 20) + `OffsetButton size="md"` "View Paper" (151.5×43.8). The paper is an external PDF, so the button is a non-link.
  - <1302: column-reverse, gap 40. The TOC renders first, static (250 / 196 / 342 wide). The paper card is hidden and replaced by a floating "View Paper" button layer (absolute full-height overlay at LG/MD; a 43.8-tall block after the article at SM; exact sticky offsets UNMEASURED; use X7's FAB pattern with the md button).
- **Data:** `{ slug, title, date, authors: string, paperUrl (external), body: blocks (toc from H2) }`. The existing `/research` PaperList should link here (§11).

---

## 6. Product and marketing one-offs

### X12. Persona landing `/product/for-founders`, `/product/for-operators` (one template, two block lists)

Shared typography: `persona-h1`, `persona-h2`, `persona-h3`, `persona-lede` (§3b). Section vertical padding is 96 / 88 / 80 / 64 unless stated. Primary buttons on this template are `OffsetButton size="lg"` with **bg `sky-hover` #6FC2FF** (not `sky`); on dark sections the button has a 2px #F8F8F7 border and a #F8F8F7 backing.

| # | Block | Founders | Operators |
|---|---|---|---|
| 1 | `PersonaHero` | ✓ | ✓ |
| 2 | `CustomerLogoStrip` | label "Founders build on MotherDuck" | own label |
| 3 | `DarkFeatureList` (4) | ✓ (1 inline link) | ✓ |
| 4 | `SplitMedia` "AI without the exports" | ✓ | — |
| 4b | `GalleryTeaser` (REUSE MARKETING) + `SecuritySplit` | — | ✓ |
| 5 | `PricingBand` | cream, border-top | **sun**, border-top + bottom |
| 6 | `IndustrySwiper` | white bg | cream bg |
| 7 | `AgentLinks` | ✓ | ✓ |
| 8 | `ClosingBand` | **ink** bg, padding 96/0/0 | **sun** bg, padding 96 0 |

Order: founders 1, 2, 3, 4, 6, 5, 7, 8; operators 1, 2, 3, 4b (GalleryTeaser, then SecuritySplit), 5, 6, 7, 8.

- **1 `PersonaHero`:** cream, padding 48/0/64 (≥960) · 32/0/48, `overflow:clip`.
  - Container row, space-between, align centre, gap 64 (XL) / 48 (LG); column gap 48 (<960).
  - Text column 600 (475.6 LG; full below), gap 32 (24 <960):
    - H1 `persona-h1` [23–37ch] 2 lines;
    - p `persona-lede`, max-width 540, 4–5 lines;
    - CTA row (wrap, gap 16/32, padding-top 8): primary "Start free" (auth, so non-link button) + UnderlineLink "Join startup program" → `/startups/`.
  - Media: 500×438 (396×348 LG, 616×540 MD, 342×300 SM), white, 2px ink, radius 20, overflow hidden. It holds an animated SVG product diagram (612×536 viewBox; "agent asks → live Dive" story; stroke-draw + fade-in sequence `hero-diagram-*` §3d, plays once on load). Clone: static Placeholder (optional fade-in).
- **2 `CustomerLogoStrip`:** white, border-top and bottom 2px ink, padding 48 0 (XL) · 40 0 (LG/MD) · 32 0 (SM).
  - Label Mono 12/16 300 ls .24 UPPER #666, gap 16.
  - List: XL flex space-between (margin −8 0), 6 links 48 tall, padding 8, r2, logo contain h32 → `/case-studies/<slug>/`. Hover `translateY(-2px)` (.12s).
  - Below XL: a 3-column grid (2 rows), gap 16.
- **3 `DarkFeatureList`:** bg ink.
  - Container column gap 48. H2 `persona-h2` #F8F8F7 (1–2 lines).
  - `ul` grid: 4 × 310.5 gap 0 (XL; each li padding-right 40 except the last) · 2 × 440 gap 48/40 (LG) · 2 × 324 (MD) · one column gap 40 (SM).
  - li (column, gap 16): 56×56 icon Placeholder → h3 `persona-h3` #F8F8F7 (2 lines) → p Inter 16/25.6 400 ls .32 #F8F8F7 (3–5 lines) → optional UnderlineLink (Inter 14/19.2 UPPER, white label and underline) → `/blog/<slug>`.
  - **Motion:** `feature-rise` on entering the viewport (opacity 0 before; stagger 0.08s; §3d). Hover on one li dims its siblings to opacity .6 (`opacity .2s ease-in-out`).
  - CTA row below the list: primary "Start building free".
- **4 `SplitMedia`** (founders): cream.
  - Row, space-between, align centre, gap 40 (≥960); column gap 40 (<960).
  - Text max-width 566, gap 24: H2 `persona-h2` + p `persona-lede` + CTA row: primary "Try it with your data" (auth) + UnderlineLink "Hot dog or not?" (external, so non-link).
  - Media frame 666.7×390 (506×297 LG, 688×403 MD, 342×201 SM), white, 2px ink, radius 20 / 20 / 16 / 10; image Placeholder (natural 696×405).
- **4b** (operators):
  - `GalleryTeaser` (MARKETING, same classes): white; H2 "See what you can build." + p [53ch] (column max 760, gap 24); grid 3 × 395.3 gap 28; tiles link to `/dive-gallery/dives/<slug>` (X5); UnderlineLink "See More Examples" → `/dive-gallery/`.
  - Then `SecuritySplit` (cream):
    - Row, gap 64. Left column 438, gap 48: H2 `persona-h2` (3 lines) + badge list (wrap, gap 16/32): 2 items, each a 56×56 badge Placeholder + Inter 14/20 500 ("SOC 2 Type II", "GDPR"), gap 12.
    - Right `ol` (740): rows with border-top 2px ink, padding 24 0, row gap 32: h3 `persona-h3` (232 wide, 2 lines) + p Inter 16/25.6 400 ls .32 (2 lines). 2+ rows (third row partially measured; UNMEASURED).
- **5 `PricingBand`:** padding 64 / 56 / 56 / 48, border-top 2px.
  - Row, space-between, align centre, gap 64 (≥960); column, align start, gap 32 (<960).
  - Text max-width 960, gap 24: H2 `persona-h2` (1 line) + p `persona-lede` (1 line).
  - Primary "See plans & pricing" → `/product/pricing/`.
- **6 `IndustrySwiper`:**
  - Header row: space-between, align end, gap 32 (column gap 24 <960). H2 `persona-h2`, max-width 640, 2 lines. Controls (gap 24):
    - text link "All customer stories →" (Inter 16/19.2 ls .32 UPPER underline) → `/case-studies/`;
    - two 48×48 arrow buttons, 2px ink, r2 (prev bg cream, next bg `sky-hover`). Hover `translate(4px,-4px)` + `box-shadow:-4px 4px 0 0 ink` (.12s ease-in-out).
  - Swiper (margin-top 48): slides 379.2 / 417.1 / 421 / 309.5 wide, margin-right 24 (16 SM), height 360 (431 SM). 6 slides.
    - Autoplay: advanced one slide (403.2px) within 6s of load. Exact interval and transition UNMEASURED; use 5s and 500ms ease.
    - A "next" click advances one slide immediately. Loop behaviour UNMEASURED.
  - Slide card: bg `surface-2`, 2px ink, r2, padding 28 (20 SM), column gap 20.
    - Header (gap 16): 40×40 colour square (2px ink, r2; colours in order coral-soft #FF9A94, sky #97D4FF, yellow #F9EE3E, teal #50C7B7, apricot #FFC18A, sand-chip #ECE5DD) + H3 Mono 20/24 ls .4 UPPER (industry name, ≤20ch).
    - Logo tiles (wrap, gap 12): 72 tall, white, 1px #D7D7D7, r2, padding 0 14, logo contain h28 (Placeholder) → `/case-studies/<slug>/`. A tile is full width when the row has 1 logo, else 153.6 (2 per row); 2–5 tiles per slide.
    - Tile hover: `translate(4px,-4px)`, border ink, `box-shadow: inset 0 0 0 1px ink, -4px 4px 0 0 ink` (.12s).
- **7 `AgentLinks`:** white, border-top and bottom 2px.
  - Header row: space-between, align end, gap 40, margin-bottom 48 (column, gap 24, margin-bottom 32 <960). H2 `persona-h2` (max-width 1010) + "Copy all links" button: white, 2px ink, r2, padding 12 18, 18px icon + Inter 14/16.8 500 ls .56 UPPER. Hover `translate(6px,-6px)` + shadow −6/6. Click → label "Copied 5 links ✓" (revert timing UNMEASURED). Clone: copy the 5 hrefs to the clipboard.
  - Grid: 3 columns gap 32 (≥960); column gap 20 (<960).
  - **Gated card** (first, spans 2 columns; 817.3 XL, 602.7 LG; full width <960):
    - bg `peach`, 2px ink, r2, `box-shadow:-6px 6px 0 0 ink` (−4/4 <960).
    - Hover `translate(6px,-6px)` + shadow −12/12 (.12s).
    - ≥960 row / <960 column. Left panel 382 wide: bg `apricot`, border-right 2px, padding 40, centred book cover 236×305 (white, 2px ink; Placeholder).
    - Right column: padding 32, gap 16:
      - chip "Guide" (Mono 12/16.8 ls .48 UPPER, bg `orange`, 1px ink, r2, padding 4 8);
      - title Mono 28/35 ls .56 UPPER (22/27.5 <960), 1–3 lines;
      - desc Inter 16/24 400 ls .16 [88ch];
      - footer (margin-top auto, border-top 2px `rgba(56,56,56,.15)`, padding-top 20, space-between): "Free 18-page guide" Inter 14/19.6 + "Get the guide →" Inter 16/19.2 600 ls .32 UPPER underline.
    - Link → `/lp/guide-to-bi-in-the-agentic-era-full` (in routes).
  - **Link cards** (4):
    - white, 2px ink, r2. Hover `translate(6px,-6px)` + shadow −6/6.
    - ≥960 column:
      - media 204 tall (bg cream, border-bottom 2px, image cover). The video variant adds a 52×52 `sky-hover` play square (2px ink, r2) at bottom-left 16 and a duration chip (ink bg, Mono 12/16.8 ls .48 white, padding 4 8, r2) at bottom-right 12.
      - body padding 28 32 32, gap 16: kind chip (Video: bg `rgba(83,219,201,.4)`; Docs: `sand-chip`; Mono 12 UPPER, 1px ink, r2, padding 4 8); title Mono 20/26 ls .4 UPPER, clamp 2 (min-height 52); desc Inter 15/22.5 400 ls .15, clamp 1; footer (border-top 2px `rgba(56,56,56,.15)`, padding-top 20): meta Inter 14/19.6 ("44 min video") + CTA Inter 16/19.2 ls .32 UPPER underline ("Watch →", "Read the docs →").
    - <960: a horizontal card (113.8 tall MD, 155.4 SM), padding 14 0 14 14, thumbnail at left.
    - Targets: `/videos/<slug>` (L6), `/blog/<slug>`, `/docs/...` (excluded, so non-link).
- **8 `ClosingBand`:** column, align start, gap 40.
  - H2 Mono 44/48 (`persona-h1`), max-width 560, 2 lines; #F8F8F7 on ink, ink on sun.
  - CTA row: primary "Start free" + UnderlineLink "Join startup program" (white variant on ink).
- **Data:** per page `{ hero: {h1, lede}, logos: caseSlug[6], features: {title, text, link?}[4], industries: {name, colour, cases: slug[]}[6], agentLinks: [gatedGuide, ...4 cards] }`.

### X13. EU region `/product/eu-region`

1. **Hero + contact form:** full-bleed `sand-chip`, border-bottom 2px.
   - Grid `662px 500px` gap 80 (XL) · `444px 436px` gap 40 (LG) · `330px 318px` gap 40 (MD) · one column (SM).
   - Left: padding 80/0/286 (XL) · 72/0/207 (LG/MD). At SM the left column becomes its own full-bleed sand block (padding 24 24 250, border-bottom 2px, `translateX(-24px)`).
     - H1 Mono 56/67.2 · 48/57.6 · 48/57.6 · 32/38.4, padding-bottom 24/20/16/16 [31ch] 2–3 lines.
     - p Inter 20/32 300 (18/28.8 <960) [132ch].
     - UnderlineLink "LEARN MORE" (Inter 14/19.2) on a sand chip (r5), margin-top 32 → `#webinar-section`.
     - Decorative Lottie animation 950×362 (700×267 LG/MD, 800×305 SM), absolute, bottom-left, behind the text → static Placeholder.
   - Right: the form column is translated down 46 (42 <1302) so the form overlaps the hero's bottom border. SM: in flow, margin-top −30.
     - Form: white, 2px ink, padding 32 52 (32 LG/MD, 24 SM), 500 / 436 / 318 / 342 wide, about 575 tall.
     - Intro p Inter 20/32 300 centred [65ch] 2 lines.
     - Fields column, gap 40, padding 32/0/24: 4 compact FloatingInputs (46.4 tall, padding 10 32 10 16, Inter 16/22.4; placeholder at left 16): "First Name", "Last Name" + 2 more (labels UNMEASURED; the HubSpot pattern suggests email and company).
     - Checkbox (outline) "Get MotherDuck email updates" (Inter 14/19.6).
     - Disabled `OffsetButton size="md"` "Contact Us" (131.1×43.8), centred, margin-top 18.
2. **Partner logos:** padding 88/0/64 (XL) · 93/0/52 (LG/MD) · 64/0/52 (SM).
   - A 2px `sand-dark` rule spans the full width at the section bottom.
   - Column, centred, gap 36: H2 Mono 18/21.6 UPPER centred on a cream chip (padding 8) [38ch] 2 lines.
   - Logo row: bg cream, padding 10 8 (12 below XL), wrap, centred, gap 52/42 · 24/42 · 24/52 · 32/40; 7 partner logos 20–41 tall (Placeholders).
3. **Webinars** `#webinar-section`: padding 72/0/120. Column, centred, gap 52.
   - H2 Mono 32/38.4 (24/28.8 <960) centred, max-width 500 (420 LG) [42ch].
   - List: column, gap 32, 4 cards.
   - Card: `LiftCard lift={14}` (≥960) → white `article`, 2px ink, row (column at SM).
     - Left panel 300 (200 LG/MD; full width × 190 SM), bg per card (teal #50C7B7, sun, …), overflow hidden, holding a webinar image 300×204 (Placeholder).
     - Right column: padding 32 40 32 32, space-between, gap 20. Title Inter 24/28.8 700 (20/24 <1302; 16/25.6 SM) 1 line + desc Inter 16/25.6 300 ls .32 2 lines; then a right-aligned `OffsetButton size="md"` "Watch On-Demand".
     - The whole card links to YouTube (external), so render it as a non-link.
4. **Latest posts:** cream, border-top 2px, padding 72/0/120 (64/0/92 <960).
   - H2 Mono 32/38.4 "Read our latest posts", gap 50.
   - `PostCard` grid: 3 columns (XL) · 2 × 448 gap 24 (LG) · 2 × 332 (MD) · 1 column max-width 350 (SM); 3 cards; reveal-up.
   - Right-aligned `OffsetButton size="lg"` "View all" → `/blog/`.

### X14. Azure waitlist `/product/azure`

1. **`#azure-waitlist`:** cream, padding 104/0/112 (≥960) / 56/0/88, overflow clip.
   - Cloud illustration 270×175 at top 16, right 64 (220×143 LG; hidden <960).
   - Column, centred, gap 56:
     - Header (column centred, gap 28): chip Mono 12/12 ls .96 UPPER on `sky` bg, padding 10 12 ("WAITLIST · EARLY ACCESS BY REGION") + H1 `azure-h1` "MotherDuck on Azure" + p Inter 24/38.4 300 ls .48 centred (18/28.8 ls .36 <960) [136ch].
     - **SQL-IDE form** (`form`, column centred, gap 36):
       - Frame: max-width 1160 (980 below XL), bg #CEEBFF, 2px ink, `box-shadow:-8px 8px 0 0 ink`, z 1, 633 tall.
       - Menu bar (padding 8 12 4, gap 4): "File Edit View Query Tools Window Help" (Inter 14/18, padding 2 6, each preceded by a small glyph at 40px) + a "⌕ Search" pill at the right (white, 1px `sky`, r4, padding 2 10, Inter 13 #666).
       - Toolbar (margin 4 12 10, white, 1px `sky`, r6, padding 5 6, gap 8):
         - database select 220 wide (1px #C0C0C0, r4, padding 5 8, label "azure_waitlist");
         - a 1×26 #D7D7D7 divider;
         - "Execute" button (white, 1px `sky`, r4, padding 5 12 5 10, Inter 14/18 600, play icon);
         - status glyphs;
         - "⌘ + ↵" Inter 13 #666 at the far right.
       - Body (row, gap 10, padding 0 12 12):
         - **Object Explorer** pane 295.6 wide (white, 1px `sky`; header padding 6 10 with a border-bottom 1px #D7D7D7; tree of ±-glyph rows describing the waitlist table's 5 columns). Hidden below XL.
         - **Editor** column:
           - Tab "SQLQuery1.sql - md:motherduck.azure_waitlist (you)": white, 1px `sky` sides/top, `box-shadow: inset 0 2px 0 #1276BF`, padding 6 10.
           - Code pane: white, 1px `sky`, 338 tall. Aeonik Mono 16/22; line numbers Mono 14/22 #356A91; keywords #1276BF; 9 lines forming an `INSERT INTO azure_waitlist (...) VALUES (...)` statement. **Each quoted value is an inline `<input>`**: text #E23F35 on a #CEEBFF label background; placeholders #818181 "Dana", "Scully", "dana@contoso.com", "Contoso", "westeurope". There are trailing comments ("-- optional", "-- preferred Azure region") and a "-- also send me MotherDuck product news" line with a checkbox.
           - Results pane: 154 tall, border-top 4px #CEEBFF. "Messages" tab + a hint line ("Edit the values in quotes, then press Execute (⌘ + ↵).") + a status bar ("Ready · md:motherduck (Azure) · azure_waitlist · 00:00:00 · 0 rows").
       - Fields: `firstname`, `lastname`, `email`, `company` (optional), `azure_region`, `subscribe_md_emails` (checkbox).
       - Execute or ⌘/Ctrl+↵ validates and "runs". The success copy is UNMEASURED; show "1 row inserted" style feedback in Messages. No network.
       - Below the frame: "Rather click than type?" Inter 16/22.4 300 #666 + a button "USE THE BORING FORM →" (Inter 16/22.4 300 UPPER underline). It swaps the IDE for a plain form with the same fields (First name, Last name, Work email, Company (optional), Azure region, "Also send me MotherDuck product news", Submit), plus "Changed your mind? BACK TO SQL →". Plain-form styling UNMEASURED; use FloatingInput float + `OffsetButton size="lg"`.
2. **"What's coming to Azure":** white, border-top 2px, padding 112/0/120.
   - Header row: space-between, align end, gap 48, padding-bottom 64. H2 `azure-h2` (max-width 760) + p Inter 18/28.8 300 ls .36 (max-width 420).
   - Grid 4 × 292.5 gap 24 (XL) · 2 × 448 (LG) · 2 × 332 (MD) · 1 column (SM).
   - Card: white, 2px ink, column.
     - Art panel 220 tall, bg cream, border-bottom 2px, padding 20, illustration Placeholder (240×155, 220×170, 130×154, 240×155).
     - Body padding 28 24 32, gap 12: number Mono 13/13 ls .52 #1276BF ("01"–"04"), H3 Mono 22/26.4 UPPER (1–3 lines), p Inter 16/24 300 ls .32 (5 lines).
3. **"Where should we land first?":** cream, border-top 2px, padding 112/0/120.
   - Row, align centre, gap 80 (column below XL).
   - Text column 722, gap 32: H2 `azure-h2` + p (padding-top 20, max-width 560).
   - Vote card: white, 2px ink, shadow −6/6.
     - `pre` query line: bg `surface-2`, border-bottom 2px, padding 16 24, Mono 15/22 [46ch].
     - Result row: padding 20 24, space-between, baseline: "regions" Mono 13 #666 + count Mono 48/48 ("58").
     - Footnote link Mono 13/13 #666 underline, padding 0 24 20 → `#azure-waitlist`.
   - Right: illustration 440×516 (Placeholder).
4. **"How it works":** white, border-top 2px, padding 96/0/120.
   - Header row: space-between, align end. H2 (max-width 720, padding-bottom 56) + an illustration 260×218 sitting on the steps box (margin 0 40 −2 0).
   - Steps `ol`: 2px ink frame, row (column <960), 3 steps (411–413 wide; 238–269 tall).
     - Step: padding 32 28 36, column gap 14.
     - Header row: number Mono 40/44 ("01"–"03"); step 1 also has a "You are here" chip (Mono 12/12 ls .72 UPPER, bg `sun`, padding 6 8).
     - H3 Mono 22/26.4 UPPER (1 line); p Inter 16/24 300 ls .32 (2–3 lines).
     - Step 1 bg #CEEBFF; steps 2–3 white with border-left 2px (border-top <960).
5. **"Before you run it" FAQ:** cream, border-top 2px, padding 112/0/120.
   - Row, gap 96 (column, gap 32 below XL). Left 420: H2 `azure-h2` + illustration 260×225 (padding-top 56).
   - Right: contained FAQ, 6 items: padding 26 0, question Mono 20/28 UPPER, answer Inter 18/28.8 300 ls .36, chevron 24. Reuse MARKETING FAQ "contained" with the smaller question size.
6. **Closing band:** ink bg, padding 104/0/112 (≥960) · 72/0/0 (<960), overflow hidden.
   - Column (max-width 640, gap 24, z 1): H2 `azure-cta-h2` white + p Inter 18/28.8 300 ls .36 #D7D7D7 (max-width 540) + CTA row (gap 32, padding-top 8): `OffsetButton size="lg"` primary "Start free" (auth, non-link) + UnderlineLink (white) → `/contact-us/product-expert/`.
   - Illustration 600×389 absolute right (`translateY(-195px)`; 420×273 LG); in flow below (padding-top 32) at <960.

### X15. Comparisons index `/vs`

1. **Hero:** wrapper border-bottom 2px `sand-dark`, overflow hidden. Container padding 100/30/120 (XL) · 32/20/182 (LG/MD) · 24/24/195 (SM). Column, centred, gap 32.
   - Text (max-width 1028, gap 20): H1 Mono 56/67.2 · 36/43.2 · 36/43.2 · 28/33.6 centred ("How MotherDuck stacks up", 24ch) + p Inter 20/32 300 ls .4 centred (18/28.8 ls .36 and max-width 688 below XL) [136ch].
   - Buttons (gap 24): `OffsetButton size="md"` primary "TRY MOTHERDUCK FREE" (auth, non-link) + md secondary "GET A DEMO" → `/contact-us/product-expert/`.
   - Illustration 250×258 absolute (right 150, bottom −80 @XL; right 0 LG/MD; centred SM).
2. **`MarqueeBand`** (MARKETING B2): bg `yellow` #F9EE3E, label "Why MotherDuck", margin-top −2, z 1. Heights 84 / 80.8 / 80.8 / 69.6; label Mono 40/48 · 32/44.8 · 32/44.8 · 24/33.6. Same scroll-linked drift as on the vs pages.
3. **CompareCards** (MARKETING B8) `section#motherduck-vs-competitors`: padding 64 0 (XL) · 64/0/92 (LG/MD) · 64/0/80 (SM). H2 "Choose a comparison". **6 cards** (all vs pages, none excluded), numbered 01–06. The first two are snowflake and redshift; the order of the remaining four is UNMEASURED (collapsed in the dump). Grid and card values exactly as B8.

### X16. Contact support `/contact-us/support` (reuse D1 `ContactSplitForm`)

Same DOM as `/contact-us/product-expert` (form classes are identical). Props / differences:
- **Hero strip:** sand + grid pattern, border-bottom 2px; heights 255.2 / 261.2 / 261.2 / 478.4 (container padding-top 70; the H1 box has margin 64/0/52 and bg sand). H1 "Contact Support" (15ch) Mono 56/67.2 · 48/57.6 · 48/57.6 · 24/33.6.
- **Body:** row-reverse, gap 100 (XL) / 44; column at SM (form first).
- **Form column:** 549 / 420 / 300 / 342 (max-width 400 SM), margin-top −125 (XL) / −160 (LG/MD) / −163 (SM).
- **Form:** padding 132 52 52 (XL) · 85 24 24 (LG/MD) · 64 24 24 (SM); gap 40 (36 <960).
- **Illustration** 249×218 (171×150 <1302) at top −105 (−80), z 1.
- **Fields:** First Name + Last Name (row, gap 24), E-mail, Company, textarea (placeholder "Leave us a message.", 114 tall). Fine print [36ch] Inter 14/19.6 300 #818181 (padding-top 32). `OffsetButton size="lg"` "Submit" (margin-top 16). reCAPTCHA omitted.
- **Info column** (593 / 456 / 344 / 342; padding-top 60 / 40 / 40 / 0; margin-bottom 52 / 120):
  - H2 Mono 24/33.6 (18/25.2 <1302) [36ch];
  - p Inter 20/28 300 ls .4 (16/22.4 ls .32 <1302) [285ch] 8–10 lines. At SM a **shorter** paragraph variant is served [182ch].
  - Links (column gap 24): UnderlineLinks (Inter 16/19.2 **300** UPPER) "Support Overview" → `/customer-support/`, "Support Policy" → `/support-policy/`, "Status Page" (external, non-link).
- Two outline doodles (280 rotated 30°; 288×226 rotated 25°) behind the form, z −1.
- Also update the existing "Contact Support" links on `/contact-us` and `/customer-support` to point here (§11).

---

## 7. Variants of existing company templates

### X17. Generic page (= the `/support-policy` variant of F1 `LegalPage`; same classes as `/community-code`)

Routes: `/motherduck-terms-of-service`, `/acceptable-use-policy`, `/fees-addendum`, `/divemaxxing/rules`, `/forms/finance-onboarding`, `/hack-night`, `/getting-started-with-motherduck`, `/local-dev-cloud-prod-dagster-motherduck`, `/react-components-testing`; sidebar-form variant: `/live-demo`, `/duckdb-book-brief-orig`.

- **Container:** padding 24/30/48 · 34/20/48 · 0/20/24 · 0/24/24.
- **H1** `page-h1-sm` with padding 64/0/36 · 40/0/36 · 40/0/32 · 40/0/32; 2–3 lines (up to 6 at SM).
- **Body grid:** one column, gap 80 (XL) / 40, padding-bottom 112. Prose (ArticleProse) max-width 816.
- **Per-route body shape** (placeholder generation only):

| Route | Height @1440 (doc) | Body |
|---|---|---|
| `/motherduck-terms-of-service` | 8180 | long legal prose (numbered sections, bold lead-ins) |
| `/acceptable-use-policy` | 2229 | short legal prose, 1 bulleted list |
| `/fees-addendum` | 5306 | first line ". Last Updated: MM/DD/YYYY", then legal prose with lists |
| `/divemaxxing/rules` | 9984 | an inner prose `h1` (Fono 48/57.6, padding-bottom 34, margin 40/0/16) then long rules prose |
| `/forms/finance-onboarding` | 2456 | short prose. Despite the path there is **no form** on the original (0 forms). |
| `/hack-night` | 5114 | H2 sections with long anchors, code blocks, links. At <1302 the original grid column renders 1140.9 wide (overflows; original bug). Use 100%. |
| `/getting-started-with-motherduck`, `/local-dev-cloud-prod-dagster-motherduck` | 2782 / 2873 | H2 intro + paragraphs + an embedded StreamYard video iframe (static `PlayFrame`, 16:9) |
| `/react-components-testing` | 3975 | prose component showcase: 6 admonitions (NOTE, TIP, INFO, WARNING, DANGER, NOTE), footnote refs + footnote list, 2 tables. Use it as the visual test page for the ArticleProse additions in §8. |

- **Sidebar-form variant** (`/live-demo`, `/duckdb-book-brief-orig`):
  - Body grid `824px 338px` gap 80 (XL); one column, gap 40 below XL (the form drops after the prose, max-width 500, left aligned).
  - Form `#page-form`: no bg (cream shows through), 2px ink, padding 24 24 32, max-width 500, overflow auto.
    - Title Mono 18/25.2 UPPER, padding-bottom 34 ("Register to participate!" / "Get your free book!").
    - Fields: column, gap 36, FloatingInput float. Live demo: First name, Last Name, E-mail, Company (the last two labels UNMEASURED). Book: E-mail.
    - Then two solid Checkboxes ("Subscribe to MotherDuck news" + a [40ch] ecosystem-newsletter label) and a disabled `OffsetButton size="lg"` ("Register" / book: margin-top −10).
  - Live-demo prose starts with tag-label lines (Inter 20/32 700 "Live stream", Inter 20/25.6 time and date spans) above the paragraphs.
- **Implementation:** build `GenericPage({ h1, body, sideForm? })` in `components/extra/generic.jsx` with the same values as the existing `SupportPolicy` layout (copy the layout classes; do not edit `legal.jsx` / `Legal.jsx`), and register these paths under the `genericPage` key (§13).

### X18. Legal with TOC `/terms-of-service`, `/candidate-privacy` (F1 `LegalPage`)

- **Header:** padding 110/0/88 (XL) · 60/0/80 (LG) · 60/0/60 (MD) · 35/0/40 (SM). H1 `page-h1` 80/96 · 80/96 · 56/67.2 · 30/42.
  - `/terms-of-service` adds a **subtitle** under the H1: "Master Subscription" Mono 40/48 ls .8 UPPER, padding-top 8 (32/44.8 ls .64 and padding-top 4 at MD; 24/33.6 ls .48 at SM). Header height 350 @1440 vs 294 without it.
- **TOC:** the Privacy style (list padding 0 16 16 24, unnumbered). The sticky TOC box is 711 tall (ToS) / 514 (candidate privacy). Nested vs flat structure UNMEASURED; build flat H2 items.
- Body: F1 values unchanged ("Last Updated: YYYY-MM-DD" line). Doc heights 14319 (ToS) and 6930 (candidate privacy).
- **Data:** `{ h1, subtitle?, updated, sections: {id, title, blocks}[] }`.

### X19. Split-form LP `/together-ai`, `/duckdb-book-form`, `/sql-duckdb-book-form` (NEW, one template)

1. **Hero** (container, overflow hidden):
   - Column, centred, gap 20 (24 SM); margin 110/0/140 · 90/0/120 · 62/0/100 · 40/0/64.
   - H1 `lp-split-h1` (padding 0 120 at XL), 1–2 lines.
   - p Inter 20/32 300 ls .4 centred (16/25.6 ls .32 <960) [45–160ch].
   - Optional logo pair (`/together-ai` only): margin-top 32 (16 SM), 480 wide (327 SM), grid 2 columns, gap 2, bg ink, 2px ink; cells white, 83 tall (64 SM), logos contain, padding 18 20 → Placeholders.
   - Decor: outline doodles (53, 127, 500 px).
2. **Split panel:** 2px ink frame, grid `619px 619px` (XL); one column below XL; margin-bottom 100.
   - Left: bg `sun`, padding 80 72 112 (72 72 112 LG/MD; 48 24 60 SM), border-right 2px (border-bottom below XL). ArticleProse max-width 473: a bold lead line, paragraphs and a 3–4 item bullet list.
   - Right: bg cream, min-height 375 / 291. Inner padding 80 72 (72 72 80 below XL; 52 24 SM), column, gap 24, align start.
     - H2 Mono 24/28.8 (18/21.6 LG; 18/25.2 MD/SM): "Get your free ebook" / "Chat with sales".
     - Form (column gap 24, 475 wide): FloatingInput float fields (books: First Name, Last Name, E-mail; together-ai: E-mail only); books add two **outline** Checkboxes (unchecked look, gap 10: "Subscribe to MotherDuck email updates" [37ch], "Subscribe to DuckDB ecosystem newsletter" [40ch]); disabled Submit (margin-top 8).
     - **Success overlay** (absolute over the panel, bg cream, padding 64, gap 36, opacity 0 → 1 on submit): cover image 240×251.6 + Mono 30/42 300 ls .6 UPPER message [51–108ch].
3. **Sneak Peek** (book routes only): the MARKETING `PersonaSplitRows` row.
   - Border-top 2px.
   - XL: coral-red image panel 619 wide (border-right 2px, margin-right 140) with a 400×400 book image (`bob` 3s) + text column 456 (max-width 530, padding 112 0, column centred, gap 32): H2 Mono 32/44.8 (24/33.6 MD, 18/25.2 SM) "Sneak Peek" + p Inter 20/32 300 ls .4 [391ch] 13 lines.
   - Below XL: text only, padding 72 0 (the desktop image panel is hidden; mobile image block UNMEASURED).
- **Data:** `{ h1, lede, logos?: 2, prose: blocks, formTitle, fields: [...], checkboxes: bool, success: {image, text}, sneakPeek?: text }`.

### X20. Book chapter summary `/duckdb-book-summary-chapter1` … `chapter11` (NEW)

- **Container:** padding 64/30/160 · 60/20/130 · 40/20/100 · 40/24/100.
- **Back link:** UnderlineLink "BACK TO TABLE OF CONTENTS" (left arrow) → `/duckdb-book-brief/#chapter-list`, margin-bottom 44.
- **Grid** `374px 824px` gap 44 (XL; sidebar left); one column below XL (gap 48 / 48 / 40; the sidebar moves after the article).
- **Sidebar** (XL: sticky `top:156px`):
  - Book panel 374×210 (min-height 88), bg `garden` #16AA98, 2px ink. Book cover 181.8×226.6 absolute at top −20.6, centred (it overflows above the panel). Decorative star 82px.
  - Form `#page-form`: bg cream, 2px ink (no top border at XL), padding 24 24 32.
    - Title Mono 18/25.2 UPPER "Get your free book!" (padding-bottom 30).
    - Email FloatingInput float (322×58).
    - A hidden block (opacity 0, absolute, `transition: all .25s ease-in-out`) reveals on focus/fill: two **solid** Checkboxes (Inter 14/22.4: "Subscribe to MotherDuck news", [40ch]) and a disabled `OffsetButton size="lg"` "Download Book" (192.7×56.2), gap 26.
  - Below XL only the form shows (max-width 500; 342 SM; full 2px border); the book panel is hidden.
- **Article** (column gap 32):
  - Header row: chip "Chapter N" (bg ink, white Mono 24/33.6 UPPER, padding 12 24; 18/25.2 MD; 16/22.4 with padding 12 15 SM) + "N min read" Inter 16/22.4 400 opacity .6, margin-left 16.
  - H1 `chapter-h1` [35–75ch] 2–4 lines.
  - INFO admonition (§8) with a Mono body: header "INFO" Mono 16/24 600 #135586 + 24px icon; body Mono 16/24 300 [103ch] with an italic Mono book title and a link "Download the complete book" → `/duckdb-book-brief/`.
  - ArticleProse: numbered headings ("7.1 …", "7.1.1 …"), inline INFO admonitions with titles, many inline links to `/glossary/<term>/` (X2), `/learn-more/<slug>/` (redirects to `/learn/<slug>`), `/docs/...` (excluded).
- **Optional FAQ** (chapter 1 has it; chapter 7 does not): full-bleed CONTENT V6 FAQSection after the container.
- Doc heights: 13578 (ch1), 6503 (ch7).
- **Data:** `{ n, slug: 'duckdb-book-summary-chapter<n>', title, readMin, body: blocks, faqs? }`. The book-brief `ChapterCards` "SUMMARY →" links (currently non-links per the COMPANY spec) should resolve here (§11).

### X21. Gated LP bodies (reuse G shell: `LPHero`, `LPSection`, FAQ, `GatedFormSection`)

**`/ducklake-open-table-format-full`** (doc 6398):
- G1 `LPHero` (cover variant): eyebrow "Free Guide · Open Table Formats", h1 3 lines, h2 1 line, body p 5 lines, inline email form, fine print.
- [ink] Why section:
  - h2 + 2 p;
  - grid 3 columns gap 20, margin-top 32, of **5 outline cards** (new `OutlineCardGrid`): padding 28, 1px `rgba(255,255,255,.2)`, r8; h3 Mono 18/23.4 UPPER white (margin-bottom 8); p Inter 16/22.4 300 ls .32 white, opacity .8.
- [white] "Inside the guide":
  - h2 + p;
  - grid 3 columns gap 20 of **6 colour cards** (new `ColorCardGrid`): padding 32, r8, bg cycling `sky-hover` / `sun` / `teal-bright`; label Inter 13/18.2 600 ls .26 UPPER opacity .7 (margin-bottom 8); h3 Mono 32/41.6 UPPER (margin-bottom 12); p Inter 16/22.4 300.
- [ink] Comparison:
  - h2 + p;
  - table (new `DarkTable`; wrapper margin-top 24, overflow auto): Aeonik Mono 15/25.5 white; `th` 600, padding 12 16, left; `td` padding 12 16; no cell borders measured; 6 rows × 4 columns, full width;
  - footnote Inter 14/19.6 300 opacity .7 (margin 24/0/14).
- [sun] "Is this guide for you?":
  - centred h2 (max-width 720, margin-bottom 32);
  - 2-column grid `430px 430px`, gap 16/40, max-width 900, of 6 items (new `FitChecklist`): p Inter 16/22.4 300 ls .32, padding 12 0, border-bottom 1px `rgba(0,0,0,.1)`.
- [white] FAQ (G12, 7 items).
- [cream] `#download` GatedFormSection (h2 "Download the guide").

**`/divemaxxing-full`** (doc 5481; contest page, no gated form). LP section shell with bespoke blocks:
1. Centred hero:
   - badge (Inter 13/18.2 600 ls 1.04 UPPER #666, 2px ink, r2, padding 6 16) [36ch];
   - H1 two spans "DIVE" + "MAXXING" (the second on a `sun` bg, padding 0 8): Mono 72/93.6 800 ls 2.88 (72 LG, 48/62.4 MD, 36/46.8 SM);
   - sub Inter 20/28 300 #666 centred;
   - prize pill (bg `rgba(255,222,0,.15)`, r100, padding 8 20, Mono 13/22.1 500 ls .52 UPPER #555) [27ch];
   - CTA `a` "SEE THE DIVES" (`sky-hover`, 2px ink, r2, padding 14 28, Mono 15/25.5 600) → `/dive-gallery/`;
   - a dot-separated tag row (Mono 12/20.4 500 ls .72 UPPER #888; "·" #CCC);
   - 4 decorative shapes at opacity .4–.6.
2. Embedded Dive: 900 wide, 2px ink, r2, shadow −8/8. Header bar ink, padding 10 16, Mono 13/22.1 500 white [41ch]. Iframe 600 tall → Placeholder. Caption Inter 13/18.2 300 #999 centred + Mono link "Try it yourself→" #6FC2FF (external).
3. [white] "What's a Dive": h2 Mono 32/41.6 **700** centred; p Inter 18/28.8 300 #666 (max-width 700, centred); row (gap 60, max-width 1100) of 3 bullet items (8×8 squares in `sky-hover` / `sun` / `teal`, 2px ink) + image 460×388 (2px ink, shadow −8/8).
4. [cream] "The Competition": h2, intro p (3 lines), 3 cards (row, gap 24; column, gap 28 <960). Card: 2px ink, shadow −6/6; header bar (`sky-hover` / `teal` / `sun`) padding 8 12, Mono 11/18.7 600 ls 1.1 UPPER; body padding 24: h3 Mono 20/26 700 UPPER, p Inter 14/21 300 #666, p Inter 13/19.5 300 #888.
5. [white] "Judges": h2 + sub p; flex wrap, centred, gap 60 (column, gap 32 below XL). 3 judges, 220 wide: 120 round photo (Placeholder), name Inter 18/25.2 600, org Inter 14/19.6 300 #888, bio Inter 13/18.2 300 #666, "LinkedIn" Mono 13 #6FC2FF underline (external). Plus a 150×135 duck decoration.
6. [white] "Timeline": h2 + sub; list (max-width 800, gap 24). Row: border-bottom 1px #EEE, padding-bottom 24, gap 24: date Inter 13/18.2 600 ls 1.04 UPPER #6FC2FF (140 wide) + title Inter 16/22.4 600 + p Inter 14/21 300 #666. 3 rows.
7. [cream] closing strip (160 tall content; trophy illustration 160×158; contents UNMEASURED).

**`/jev-full`** (doc 5383): a fully bespoke dark LP in the LP section shell. Sections: `#141413` hero → `sun` ROI calculator → `#141413` pricing → `sun` closing. Uses Geist / Geist Mono / Anybody (§2). Build it as one component with Placeholders.
- **Hero:** grid `784px 360px` gap 56 (one column, gap 32 <960).
  - "CRT" heading: Mono 87/85.3 700 ls −2.6 UPPER, transparent text filled with a scanline `repeating-linear-gradient` (scales to 56 LG, 76 MD, 38 SM); 4 lines, the last is a typed line (`jv-type`).
  - Sub Inter 21/31.5 300 #A19C91 with a Mono 500 #F4EFEA strong span.
  - Pill CTAs (56 tall, r999, padding 0 28; solid `sun` and outline #F4EFEA).
  - Vertical video 360×640, r22 → Placeholder.
  - Proof row: 4 stats (border-top 1px #3A3A35; 2 columns <1302); value Geist Mono 60.5/57.5 700; caption Geist Mono 12/20.4 #A19C91.
  - Sources pill row: Geist Mono 14/23.8 500, 1px #3A3A35, r999, padding 8 16; the last pill is `sun`.
- **ROI calculator:** bg `sun`, 2px #141413, r28.
  - Range input "Rows per month" with a large value (Anybody 72/64.8 800).
  - "Compare against" option pills.
  - Output strip on #141413: 3 cells, label Geist Mono 12 ls .96 UPPER #A19C91, value Geist Mono 72/68.4 700 CRT. The default state shows "10,000,000" rows. The calculation formula is UNMEASURED; compute something monotonic locally.
- **Pricing:**
  - Fitted heading (125–141px, `jv-flick`).
  - Two meter cards (#1F1F1C, 1px #3A3A35, r28) inside a 1px `sun` r34 frame.
  - "Duckling sizes" table in an r24 box: `th` Geist Mono 11/18.7 500 UPPER #A19C91; `td` Aeonik Mono 16/27.2 600 #F4EFEA; row border-bottom 1px #3A3A35; padding 17 24; 6 rows × 5 columns.
  - Two plan cards (r24) with pill CTAs.
- **Closing (sun):** UNMEASURED detail.

---

## 8. ArticleProse additions (build once; used by X2, X7, X8, X10, X11, X17, X19, X20)

| Element | Style |
|---|---|
| **Admonition** | block, padding 16 18 18, margin-bottom 24, border-left 4px, bg/bar/title colours per type (`admon-*` §3a). Header row: flex, gap 14, padding-bottom 14; 24px type icon + title Inter 16/24 600 (e.g. "INFO: Title"; the chapter-summary CTA variant uses Mono 16/24 600). Body p Inter 16/25.6 300 (Mono 16/24 300 in the chapter CTA). |
| **Footnotes** | in-text `<sup><a href="#fnN">N</a></sup>` (Inter 13.33 700 underline). Footnote list after a `div` with border-top 1px #A1A1A1 and padding-top 12. Each note: flex, gap 8, padding 8 20, r2, `transition: background-color .3s`; number Inter 14/19.6 300 ("1."), text Inter 14/19.6 300. Target highlight colour on jump UNMEASURED. |
| **Tables** | as CONTENT §6 (sun header, 1px #D7D7D7 cells). Measured again on X7: `th` Inter 14/18.2 700 UPPER padding 10 12; `td` Inter 15/21 300. |
| **hr** | 1px ink top border (X8 uses it between H2 sections) |
| **Blockquote + attribution** | CONTENT §6 blockquote; the attribution is a second `p` inside the same blockquote ("— Name [mm:ss]"), same italic 500 #000 |
| **Embedded video iframe** | StreamYard / YouTube → static `PlayFrame` 16:9 |
| **Dark tone** (`tone="dark"`) | X10 notes: h2 Fono 24/28.8 #F8F8F7; p and li Inter 16/25.6 300 #F8F8F7; links #F8F8F7 underline |

---

## 9. Interactions and motion summary

| Where | Trigger | Behaviour |
|---|---|---|
| X1 search | input | client-side filter on title + definition; count "Showing N of 347"; empty letters dim to .32; no URL change; no-results block |
| X1 letter nav | click | instant jump, hash `#g-L`, `scroll-margin-top:140`; hover border ink |
| X1/X2 term card | hover | border ink, translateY(−2), arrow fades in and slides 3px (.12s ease) |
| X2/X7 ReadNext card | hover ≥960 | translate(14,−14) 120ms |
| X2 back link | hover | underline (colour stays #2BA5FF) |
| X3 sidebar | scroll | sticky top 168 (XL) / 142 (LG) |
| X3 more-events card | hover ≥960 | translate(12,−12) |
| X3 BackToTop | scroll | opacity 0 → 1 between scrollY 300 and 500 (150ms); hidden <960 |
| X4 rows | hover ≥960 | translate(14,−14) |
| X5 toolbar buttons | hover | bg cream, ink text/border (.15s); CTA hover bg #2BA5FF; votes hover border #6FC2FF + bg rgba(255,255,255,.08); back link hover ink |
| X6 cards | scroll / hover | reveal-up (once, −50px rootMargin) / lift 14 |
| X7 sidebar | scroll / <1302 | sticky 143; scroll-spy weight 600; FAB + popover below XL (V5 behaviour) |
| X8 gated player | click | registration modal (200ms in); overlay click / Esc closes (clone) |
| X9 cursor | time | `cursor-block` 1.05s steps(2) infinite |
| X9/X10 unlock button | input validity | disabled (#2A2A2A) ↔ enabled (#97D4FF) |
| X9 card | hover | border #97D4FF + translateY(−2) .15s; latest title colour #97D4FF; "See show notes" fills yellow |
| X10 chapters | hover / click | bg rgba(255,255,255,.06); speed button cycles 1x → 1.25x … |
| X10 transcript | header click | max-height 640 ↔ 220 (.3s ease) + bottom fade (.3s) |
| X12 hero diagram | load | stroke-draw + staggered fades over ~1.3s, once (optional) |
| X12 feature list | in view / hover | `feature-rise` stagger 0.08s; sibling dim to .6 (.2s) |
| X12 swiper | time / click | autoplay ≈5s per slide (UNMEASURED exact); arrows step 1 slide; arrow hover translate(4,−4) + shadow |
| X12 logo tiles / agent cards / copy button | hover / click | translate(4,−4) / (6,−6) + hard shadow; "Copied 5 links ✓" |
| X13 hero Lottie | time | continuous; replace with a static Placeholder |
| X13 webinar cards | hover ≥960 | translate(14,−14) |
| X14 IDE | typing / ⌘↵ | inline inputs, execute → message; "boring form" toggle |
| X15 marquee | scroll | MARKETING B2 scroll-linked drift |
| X19 success | submit | overlay opacity 0 → 1 |
| X20 sidebar form | focus/fill | checkboxes + button reveal (.25s); sticky 156 at XL |
| X21 jev | time / input | `jv-flick` 6s, `jv-type`, range slider recompute |
| All carousels / loops | `prefers-reduced-motion` | pause / show static |

---

## 10. Links (resolution rules for these pages)

- **Become router links once their templates exist:** `/glossary/<slug>/` (glossary cards, chapter summaries, learn prose), `/events/<slug>/` (EventRow and more-events cards), `/events/past/…`, `/authors/<slug>/` (blog bylines, learn bylines, X8 "Featuring"), `/learn/<slug>/` (learn hub, ReadNext), `/webinar/<slug>` (CONTENT RecCarousel WEBINAR slides, ecosystem icons), `/research/<slug>` (research PaperList), `/dive-gallery/dives/<slug>` (dive grid, GalleryTeaser), `/explain-analyze/<slug>/`, `/contact-us/support/`, `/vs` (vs-page back link), `/duckdb-book-summary-chapterN` (book brief), `/terms-of-service` (pricing), `/acceptable-use-policy` (terms).
- **Redirect-only paths** (§1a), and `/learn-more/<slug>` → `/learn/<slug>`.
- **Still non-links:** `/dive-gallery/users/<id>`, `/dive-gallery/embed/<slug>`, `/dive-gallery/api/auth/login`, `/docs/*`, `/try` (if excluded), auth URLs, YouTube / Spotify / Apple / LinkedIn / StreamYard / mux / S3 PDF / partner and registration URLs, `mailto:`.
- **Slugs:** use the real slugs from `MISSING_ROUTES.txt` so internal links resolve. Generate titles and copy with the same lengths; never copy the original text.

---

## 11. Follow-up edits outside the new files (do after the chunks merge; they touch existing files)

These are needed to make existing pages link into the new templates. They are **not** part of the parallel chunks because they edit shared files:
1. `content/data.js`: switch the generated slugs (`guide-N`, `sample-event-N`, dive slugs) to the real slugs in `MISSING_ROUTES.txt`, and make the hub cards (LearnHub, EventsHub rows + "Past" tab, DiveGallery cards) router links.
2. `content/EventsHub.jsx`: make the "Past" tab a link to `/events/past/`.
3. `company/contact.jsx` / `book.jsx`, `marketing/vs.jsx`, `marketing/bespoke.jsx` (`PaperList`), `content/RecCarousel.jsx`, blog byline: flip the listed non-links to router links (or simply rely on a shared `isRoute()` check that now returns true).
4. `Header` dark mode: if the body-attribute override (§2) is not enough, add a `tone` prop to `Header.jsx`.

---

## 12. Not measurable / caveats

- **`/try`** is a separate Next/Tailwind app: body #0F1115, a 53-tall top bar ("Try MotherDuck! | Cookbooks | Documentation | Agent skills | Hide duck | LOG IN | START FREE"), an AI chat UI (assistant tabs, heading Source Serif 4 24/32 600 #E8E6DC "What do you want to analyze?", sample prompt cards with ANALYZE / DIVE actions) and a 44px cream right rail ("Live infra"). It is an interactive product surface, not a marketing page. **Recommendation:** add `/try` to `EXCLUDED_PREFIXES` (links render as non-links). If a page must exist, render a static dark shell with Placeholders and no chat behaviour. **Needs a decision from the orchestrator.**
- **`/lp/ducklake-lakehouse-table-format-book`** (redirect target) and **`/divemaxxing`** (linked from `/divemaxxing-full`, not in the missing list) use an LP-only fixed nav (77.8 tall, white, 2px ink bottom border, logo left, 4 anchor links centre, `OffsetButton size="md"` right, no eyebrow) and no site header. Out of scope here; flag for the gated owner.
- Original bugs reproduced or fixed: X1 sticky bar hidden under the fixed header (fix with `top: var(--header-total)`); `/hack-night` grid column overflows below XL (use 100%).
- Third-party embeds rebuilt as static UI: YouTube / StreamYard / mux / Spotify iframes, `embed-motherduck.com` dive sandbox, reCAPTCHA (omit), HubSpot forms (local), Lottie animations (X6 mascot, X13 hero). Static Placeholders.
- UNMEASURED: X12 swiper interval and easing; X12 operators security rows beyond 2; X13 last two form-field labels; X15 card order after the first two; X18 TOC nesting; X21 divemaxxing closing strip and jev closing; jev calculator formula; X10 behaviour after unlock and speed values after 1.25x; X11 floating "View Paper" geometry below XL; X19 mobile image block for Sneak Peek; footnote highlight colour; X14 success copy and plain-form styling.
- Counts measured 2026-10-26 (they will drift): glossary 347, events 251 (7 upcoming + 244 past), dives 135, authors 120, learn 68, webinars 13 + videos 2, podcast 11, research 6, chapters 11.

---

## 13. URL group → template → component file

New page group **`src/pages/extra/`** with `src/pages/extra/index.js` (registered once in `App.jsx` in step 0: `import extra from './pages/extra/index.js'` and `...extra` in `TEMPLATES`). New blocks go in **`src/components/extra/`**, one file per template family (no cross-imports between chunk-owned files; shared helpers below). New routes keys go in `src/routes.js`. Redirects: add `export const REDIRECTS = { '/case-study-dexibit': '/case-studies/dexibit', … }` to `routes.js` and a `redirect` key listing those paths; the `extra` index maps `redirect` to a tiny `<Navigate replace>` component.

| URL group | Count | Template | Routes key | Page component | Blocks file | Reuses |
|---|---|---|---|---|---|---|
| `/glossary` | 1 | X1 NEW | `glossaryIndex` | `pages/extra/GlossaryIndex.jsx` | `components/extra/glossary.jsx` | — |
| `/glossary/:slug` | 347 | X2 NEW | `glossaryTerm` | `pages/extra/GlossaryTerm.jsx` | `components/extra/glossary.jsx`, `components/extra/readNext.jsx` | ArticleProse, FAQSection |
| `/events/:slug` | 251 | X3 NEW | `eventDetail` | `pages/extra/EventDetail.jsx` | `components/extra/events.jsx` | SubscribeBand, BackToTop, UnderlineLink |
| `/events/past`, `/events/past/page/:n` | 13 | X4 variant of L10 | `eventsPast` | `pages/extra/EventsPast.jsx` | `components/extra/events.jsx` (Pagination, RecordingTag) | EventsHub blocks (import, do not edit) |
| `/dive-gallery/dives/:slug` | 135 | X5 NEW (dive chrome) | `diveDetail` | `pages/extra/DiveDetail.jsx` | `components/extra/dive.jsx` | dive nav from `DiveGallery.jsx` (import) |
| `/authors/:slug` | 120 | X6 NEW | `author` | `pages/extra/Author.jsx` | `components/extra/author.jsx` | PostCard, VideoCard, TiltedTag |
| `/learn/:slug` | 68 | X7 NEW | `learnArticle` | `pages/extra/LearnArticle.jsx` | `components/extra/learn.jsx`, `readNext.jsx` | VideoSidebar/TocFab, FAQSection, ArticleProse |
| `/webinar/:slug`, `/video/:slug` | 15 | X8 variant of L6 | `webinar` | `pages/extra/Webinar.jsx` | `components/extra/webinar.jsx` (GatedVideoModal) | SandBand, VideoPlayerFrame, PlayFrame |
| `/explain-analyze` | 1 | X9 NEW (dark) | `podcastIndex` | `pages/extra/PodcastIndex.jsx` | `components/extra/podcast.jsx` | — |
| `/explain-analyze/:slug` | 11 | X10 NEW (dark) | `podcastEpisode` | `pages/extra/PodcastEpisode.jsx` | `components/extra/podcast.jsx` | Transcript (tone dark), ArticleProse (dark) |
| `/research/:slug` | 6 | X11 NEW | `researchPaper` | `pages/extra/ResearchPaper.jsx` | `components/extra/research.jsx` | Toc, ArticleProse |
| `/product/for-founders`, `/product/for-operators` | 2 | X12 NEW | `persona2` | `pages/extra/PersonaLanding.jsx` | `components/extra/persona2.jsx` | GalleryTeaser, OffsetButton |
| `/product/eu-region` | 1 | X13 NEW | `euRegion` | `pages/extra/EuRegion.jsx` | `components/extra/euRegion.jsx` | PostCard |
| `/product/azure` | 1 | X14 NEW | `azure` | `pages/extra/Azure.jsx` | `components/extra/azure.jsx` | FAQ (contained) |
| `/vs` | 1 | X15 NEW hero + reuse | `vsIndex` | `pages/extra/VsIndex.jsx` | `components/extra/vsIndex.jsx` | MarqueeBand, CompareCards |
| `/contact-us/support` | 1 | X16 reuse D1 | `contactSupport` | `pages/extra/ContactSupport.jsx` | — | ContactSplitForm parts (compose in the page; do not edit `contact.jsx`) |
| `/motherduck-terms-of-service`, `/acceptable-use-policy`, `/fees-addendum`, `/divemaxxing/rules`, `/forms/finance-onboarding`, `/hack-night`, `/getting-started-with-motherduck`, `/local-dev-cloud-prod-dagster-motherduck`, `/react-components-testing`, `/live-demo`, `/duckdb-book-brief-orig` | 11 | X17 = F1 support-policy variant | `genericPage` | `pages/extra/GenericPage.jsx` | `components/extra/generic.jsx` (SideForm) | SupportPolicy layout, ArticleProse |
| `/terms-of-service`, `/candidate-privacy` | 2 | X18 = F1 TOC variant | `legalToc` | `pages/extra/LegalToc.jsx` | `components/extra/generic.jsx` | LegalPage TOC parts |
| `/together-ai`, `/duckdb-book-form`, `/sql-duckdb-book-form` | 3 | X19 NEW | `splitFormLP` | `pages/extra/SplitFormLP.jsx` | `components/extra/splitForm.jsx` | PersonaSplitRows row, FloatingInput |
| `/duckdb-book-summary-chapter1…11` | 11 | X20 NEW | `bookChapter` | `pages/extra/BookChapter.jsx` | `components/extra/bookChapter.jsx` | ArticleProse, FAQSection |
| `/ducklake-open-table-format-full` | 1 | X21 reuse G + 4 blocks | `lpExtra` | `pages/extra/LpExtra.jsx` | `components/extra/lpBlocks.jsx` | LPHero, LPSection, FAQSection, GatedFormSection |
| `/divemaxxing-full` | 1 | X21 bespoke LP | `lpExtra` | `pages/extra/LpExtra.jsx` | `components/extra/divemaxxing.jsx` | LPSection |
| `/jev-full` | 1 | X21 bespoke LP | `lpExtra` | `pages/extra/LpExtra.jsx` | `components/extra/jev.jsx` | LPSection |
| `/try` | 1 | X22 separate app | (exclude) | `EXCLUDED_PREFIXES` += `/try` | — | — |
| redirects (§1a) | 7 | redirect | `redirect` | `pages/extra/Redirect.jsx` | — | `REDIRECTS` map in routes.js |

**Setup step (step 0, tiny, done once by the orchestrator before the chunks start):** register the `extra` group in `App.jsx`, create an empty `src/pages/extra/index.js`, and create `src/components/extra/proseExtras.jsx` (the §8 additions as a wrapper around the existing `ArticleProse`: admonition, footnotes, `tone="dark"`). After step 0 no chunk edits a file another chunk owns. `readNext.jsx` is used only by X2 and X7, which are both in chunk A.

---

## 14. Proposed build split (3 independent chunks)

Each chunk owns its page files, block files, CSS file and dataset file. Shared edits are limited to `src/routes.js` (each chunk appends only its own keys) and `src/pages/extra/index.js` (each chunk appends only its own entries). Step 0 (§13) happens before the chunks start.

| Chunk | Templates | Files owned | Notes |
|---|---|---|---|
| **A: Content detail** | X1, X2, X5, X6, X7, X11, X20 + `readNext` | `pages/extra/{GlossaryIndex,GlossaryTerm,DiveDetail,Author,LearnArticle,ResearchPaper,BookChapter}.jsx`, `components/extra/{glossary,readNext,dive,author,learn,research,bookChapter}.jsx`, `components/extra/data/content.js`, `styles/extra-content.css` | Largest slug counts (glossary 347, dives 135, authors 120, learn 68). |
| **B: Events, media, podcast, redirects** | X3, X4, X8, X9, X10, redirects (§1a), `/try` exclusion | `pages/extra/{EventDetail,EventsPast,Webinar,PodcastIndex,PodcastEpisode,Redirect}.jsx`, `components/extra/{events,webinar,podcast}.jsx`, `components/extra/data/media.js`, `styles/extra-media.css` | Owns the dark theme (§2 body attribute + header overrides inside `extra-media.css`), the Fira Mono load, and the `REDIRECTS` / `EXCLUDED_PREFIXES` lines in `routes.js`. |
| **C: Marketing and company one-offs** | X12, X13, X14, X15, X16, X17, X18, X19, X21 | `pages/extra/{PersonaLanding,EuRegion,Azure,VsIndex,ContactSupport,GenericPage,LegalToc,SplitFormLP,LpExtra}.jsx`, `components/extra/{persona2,euRegion,azure,vsIndex,generic,splitForm,lpBlocks,divemaxxing,jev}.jsx`, `components/extra/data/marketing.js`, `styles/extra-marketing.css` | Imports existing marketing/company components read-only. Loads Geist / Geist Mono / Anybody, scoped to `/jev-full`. |

Order / dependencies: step 0 first, then A, B and C in parallel with no cross-chunk imports (all three may import `proseExtras.jsx` and existing components read-only). The §11 link pass runs after all three merge.
