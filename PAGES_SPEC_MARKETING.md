Source: https://motherduck.com/

# Marketing page templates: product, pricing and vs routes

This spec is the build reference for these routes (keys `product`, `pricing` and `vs` in `src/routes.js`):

- **product**: `/product`, `/product/app-developers`, `/product/data-teams`, `/product/duckdb-users`, `/product/dives`, `/product/ducklake`, `/product/flights`, `/product/guides`, `/product/hypertenancy`, `/product/mcp-server`, `/product/postgres-integration`, `/startups`, `/research`, `/trust-and-security`, `/community-and-open-source`
- **pricing**: `/product/pricing`, `/product/pricing/duckdb-support`
- **vs**: `/vs/bigquery-alternative`, `/vs/clickhouse-alternative`, `/vs/databricks-alternative`, `/vs/postgresql-alternative`, `/vs/redshift-alternative`, `/vs/snowflake-alternative`

How it was measured: live Chromium (Playwright) on 2026-10-23. Every route was loaded at 1440. Every route was also loaded at 1280, 768 and 390, except four vs pages: bigquery, databricks, postgresql and redshift were measured at 1440 only. At 1440 all six vs pages have the same DOM and styles, so the 1280/768/390 values for the vs template come from snowflake and clickhouse. All values are `getComputedStyle` / `getBoundingClientRect` readings. Hover, press and click states were triggered with real pointer events. "@1440" means a 1440 viewport (1435 content width with the scrollbar). Anything not measured is marked **UNMEASURED**.

Content policy (same as CLONE_SPEC.md): no marketing copy, no logos, no illustrations. Text is recorded as role plus `[chars/words casing]` and line count. Short UI labels (buttons, tabs, plan names, column headers) are written out. Every image is a `Placeholder` at the stated size or aspect.

Global foundation: CLONE_SPEC.md §0 tokens, `src/components/ui/*` primitives, and the existing `Header` + `Footer`. These pages use the same fixed header as the homepage: main starts at y=122 @1440 (40 eyebrow + 82 nav) and y=142 @390. `App.jsx` already applies this offset. Page bg is `cream` #F4EFEA.

Font note: almost every heading on these pages uses **Aeonik Mono** (clone: `font-mono`, Fragment Mono). The homepage mostly used Aeonik Fono. Only the persona heroes, one ducklake newsletter heading and the guides legend use Fono (`font-fono`). One new display face appears on `/product/hypertenancy` only: **MuseoModerno 900** (Google Fonts, OFL, loaded via next/font). Inter 600 is loaded on these pages. It is used for person names, problem-card titles and the live-embed title.

---

## 1. Layout verdict: which routes share a template

| Template | Routes | Same layout? |
|---|---|---|
| **T1 vs comparison** | all 6 `/vs/*` | **Identical** block order and styles. Only copy and item counts differ, and `/vs/clickhouse-alternative` has no `BenchmarkPanel`. Build one `VsPage` component driven by data. |
| **T2 product feature** | `/product/dives`, `/product/ducklake`, `/product/flights`, `/product/guides`, `/product/mcp-server`, `/product/postgres-integration` | Shared spine: hero, then 1–3 middle blocks, then `StickyStack`, then (optional) `QuoteSpotlight`/`FAQ`, then `CTABand`. Heroes come in 4 variants and middle blocks differ per page. Compose from blocks; do not build one template component. |
| **T3 persona** | `/product/app-developers`, `/product/data-teams`, `/product/duckdb-users` | Same 3-part layout: `PersonaHero`, `PersonaSplitRows`, `PersonaTail`. The tail is identical apart from item counts. `/product/duckdb-users` adds FAQ + ContactForm to the tail and has no YellowCTA. |
| **T3b product overview** | `/product` | Uses `PersonaHero` + `FeatureGrid` + `ArchitecturePanel` + `EcosystemDiagram` + `CaseStudyCarousel` + `FAQ` + `ContactForm` from T3, plus 3 bespoke blocks. |
| **T4 pricing** | `/product/pricing` | Bespoke. `/product/pricing/duckdb-support` is a one-section page sharing the `PricingTabs` pill. |
| **T5 bespoke** | `/product/hypertenancy`, `/startups`, `/research`, `/trust-and-security`, `/community-and-open-source` | Each one is unique, but built mostly from shared blocks (see §4). |

Distinct layouts: 1 template (vs) + 1 composition spine (product feature) + 1 template (persona) + 7 bespoke pages.

---

## 2. New tokens (add to `tailwind.config.js`; existing tokens are reused wherever a value matches)

### 2a. Colours (new only; already-present values are listed for mapping)
| Token | Value | Used by |
|---|---|---|
| `sand-chip` | `#ECE5DD` | hero chips, filter/tab chips, annual-plan strip, comparison-table hairlines, region dropdown bg. Not the same as existing `sand` #ECE6DF. |
| `row-hover` | `#EFE8E0` | pricing matrix row hover |
| `teal` | `#50C7B7` | persona/pricing split panel, browser dot, "MotherDuck world" bg |
| `coral-red` | `#FF7169` | split panel, Architecture tab, browser dot, guides legend |
| `aqua` | `#53DBC9` | "More Comparisons" marquee band |
| `apricot` | `#FFC18A` | benchmark bullet checks |
| `stone` | `#E4DED7` | /product "old world" panel |
| `tag-blue` / `tag-violet` | `#A5C4D8` / `#C8A9F2` | community repo tags |
| `ht-blue` | `#1276BF` | hypertenancy hero primary button |
| `ht-glow-1` / `ht-glow-2` | `rgba(193,162,255,0.75)` / `rgba(162,115,255,0.75)` | hypertenancy radial glows (radial-gradient to transparent) |
| `field` | `rgba(248,248,247,0.7)` | form input bg (= surface-2 @70%) |
| `field-valid` | `rgba(6,132,117,0.804)` | input border after valid entry (garden-dark @80%) |
| `code-*` | bg `#383838`; text `#CCCCCC`; comment `#999999`; keyword `#CC99CD`; operator `#67CDCC`; string `#7EC699`; function `#F8C555`; number `#F08D49` | ducklake code panels (Prism "tomorrow" palette) |
| ecosystem tile pairs (bg / border) | Sources `#EBF9FF/#54B4DE`, AI Agents `#E8F5E9/#38C1B0`, Ingestion `#F7F1FF/#B291DE`, BI `#F9FBE7/#B3C419`, Reverse ETL `#FFFDE7/#E1C427`, Transformation `#ECEFF1/#84A6BC`, DS & AI `#EAF0FF/#7597EE`, Orchestration `#FFEBE9/#F38E84`, Data Quality `#FDEDDA/#F5B161` | EcosystemDiagram |

Existing tokens used heavily here: `sun` #FFDE00 (StickyStack bg, chips, check circles), `yellow` #F9EE3E (vs marquee, ducklake/guides stack bg), `sky-hover` #6FC2FF (as a **section bg**: RepoGrid, ArchitecturePanel, CaseStudyCarousel, InstancesSection), `sky-tint` #CEEBFF (CTA right panel), `garden` #16AA98 (split panel, startups apply bg), `peach`/`orange` (compare card number chip), `sand-dark` #E1D6CB (chip hover, table MD column border, benchmark cards), `gray-500` #818181, `gray-600` #666, `chip-gray` #E8E8E8 (paper tags), `hairline` #D7D7D7 (disabled plan chip), `sky-dark` #2BA5FF (input focus border).

### 2b. Shadows / radii
- New shadows (hard, ink, no blur): `hard-8` `-8px 8px 0 0 #383838` (dives live embed), `hard-12` `-12px 12px 0 0 #383838` (persona hero video, dives video frame), `hard-16` `-16px 16px 0 0 #383838` (ArchitecturePanel, startups apply card).
- New radii: `frame` 20px (media frames, code panel, hypertenancy panels), `window` 24px (guides window), `inner` 12px (guides inner panel), `pill` 999px (tab pills), `code` 3px (inline code).

### 2c. Type scale additions (Mono = `font-mono`, Inter = `font-sans`; size/line-height, weight 400 unless stated; all headings UPPER)
Columns: ≥1302 | 960–1301 | 728–959 | <728. "=" means the same as the column to its left.

| New role | ≥1302 | 960–1301 | 728–959 | <728 | Used by |
|---|---|---|---|---|---|
| `h1-mono-xl` (centered product heroes) | Mono 56/67.2 | = | 36/43.2 | 28/39.2 | Dives, Flights, Guides, MCP, Hypertenancy |
| `h1-mono-xl` (left heroes) | Mono 56/67.2 | 48/57.6 | 48/57.6 | 24/28.8 (research), 24/33.6 (startups, trust) | Research, Startups, Trust, Community. Trust adds ls 1.12px (0.02em); scale it with the size. |
| `h1-mono` | Mono 44/52.8 | 44/52.8 (pricing), 36/43.2 (postgres) | 36/43.2 | 28/33.6 | Pricing, DuckDB Support, Postgres |
| `h1-vs` | Mono 40/48 | = | = | 28/33.6 | vs hero |
| `h1-persona` (Fono) | Fono 44/52.8 | = | 40/48 | 30/42 (/product), 32/44.8 (duckdb-users) | PersonaHero |
| `h1-ducklake` | Mono 56/67.2 center | UNMEASURED @1280 | UNMEASURED | 28/33.6 | DuckLake hero |
| `hero-tagline-mono` | Mono 24/33.6 **300** ls .48 UPPER | 18/25.2 ls .36 | 18/25.2 | UNMEASURED | Startups, Trust, Community, Ecosystem sub. Research uses 24/30 (20/24 @1280, 18/21.6 @768). |
| `h2-mono-lg` (exists, 32/38.4) | = | **24/28.8** | 24/28.8 | 24/28.8 or 24/33.6 (per block) | most section heads. **Note:** the existing token drops to 32 at lg; here 24 is used below 1302. Add `h2-mono-md: 24px/28.8px`. |
| `h2-mono` (exists, 40/48) | = | = | 32/44.8 | 24/33.6 | FAQ "FAQS", Features, Compare Plans |
| `h2-tag` (ink tag titles) | Mono 32/38.4 or 32/44.8 | 24/28.8 | 16/19.2 or 24/33.6 | 16/19.2, 18/21.6 or 18/25.2 | tag headings (§3 `TagTitle`) |
| `marquee` | Mono 40/48 (vs) / 32/44.8 (persona, /product) | 32/44.8 | 32/44.8 (vs), 24/33.6 (persona) | 24/33.6 | MarqueeBand |
| `faq-q` | Mono 23/32.2 | = | 17/23.8 | 16/22.4 | FAQ question |
| `faq-q-lg` | Mono 24/33.6 | 23/32.2 | 17/23.8 | 16/22.4 | contained FAQ (flights, guides) |
| `card-h3-mono` | Mono 24/28.8 | 24/28.8 (stack), 18/21.6 (cookbook) | = | 20/24 (stack) | StickyStack, CompareCards, Cookbook, ProblemCards (title is Inter) |
| `card-h3-mono-tall` | Mono 24/33.6 | = | 20/28 | 18/25.2 | FeatureGrid, Persona sub-items, ProgramBenefits, Trust items |
| `persona-h2` | Mono 40/56 | 32/44.8 | 24/33.6 | 24/33.6 | PersonaSplitRows, Startups PersonaSplit, Hypertenancy tag h2 |
| `sub-head` | Inter 24/33.6 #666 | = | = | 20/28 | vs hero subtitle (h2) |
| `quote-carousel` | Inter 20/24 400 | 20/24 | 18/21.6 | 20/24 | QuoteCarousel blockquote |
| `quote-spot` | Inter 24/31.2 300 ls .48 | 22/28.6 ls .44 | 20/26 ls .4 | 20/26 ls .4 | QuoteSpotlight |
| `case-quote` | Inter 22/30.8 400 ls .44 (short quotes: 44/61.6 ls .88) | UNMEASURED | UNMEASURED | UNMEASURED | CaseStudyCarousel |
| `person-name-lg` | Inter 24/28.8 **600** ls .48 | = | 18/28.8 600 ls .36 (QuoteSpotlight @≤1301) | UNMEASURED | QuoteSpotlight, CaseStudyCarousel |
| `person-name` | Inter 16/25.6 600 ls .32 + role Inter 14/19.6 400 ls .28 | = | = | = | QuoteCarousel |
| `text-link` | Inter 16/19.2 400 ls .32 UPPER | = | = | = | all "LEARN MORE ⟶" links (§3 `TextLink`) |
| `text-link-sm` | Inter 14/19.2 400 ls .32 UPPER | = | = | = | compare cards, pricing "SEE INSTANCE TYPES" |
| `button-lg` | Inter 16/19.2 UPPER | = | = | = | OffsetButton size `lg` |
| `button-tier` | Inter 15/18 UPPER | = | = | = | pricing tier CTAs |
| `chip-mono` | Mono 12/12 or 12/16.8 UPPER (300 weight variant in Postgres / Community) | = | = | = | hero chips, tags |
| `price` | Mono 64/76.8 | 46/55.2 | 32/38.4 | UNMEASURED | tier price |
| `tier-name` | Mono 24/33.6 **300** ls .48 | 18/25.2 ls .36 | 18/25.2 | UNMEASURED | tier card name |
| `faq-a` / `lede-hero` (exists) | Inter 18/28.8 300 ls .36 | = | = | = | FAQ answer, section intros |
| `body` = `accordion-body` (exists) | Inter 16/25.6 300 ls .32 | = | = | = | card bodies |
| `code` | monospace 14/23.8 (tokens are Mono 14/23.8) | = | = | = | CodePanel. Inline code in FAQ: monospace 15/18.75 600 ls .3, bg rgba(56,56,56,.08), r3, p 2 4. |

### 2d. OffsetButton: add a `size` prop (the component is otherwise reused unchanged)
| size | Height | Padding | Label | Used |
|---|---|---|---|---|
| `md` (current) | 43.8 | 11.5 18 | Inter 14/16.8 | vs hero, CTABand, postgres hero, ducklake hero, pricing matrix header |
| `lg` (new) | 56.2 | 16.5 22 | Inter 16/19.2 | product feature heroes, persona heroes, pricing final CTA, dives gallery, ducklake "VISIT BLOG", startups |
| `tier` (new) | 52 (57.2 inside the scaled Business card) | 15 | Inter 15/18, centred, full width | pricing tier cards |

Also add `variant="white"` (bg #FFFFFF; the press bg is UNMEASURED) for the Lite/Enterprise tier CTAs, and `variant="ht"` (bg `ht-blue`, 2px **white** border, white text, **white** backing layer) plus `variant="ht-dark"` (bg ink, white border/text, white backing) for the hypertenancy hero. Leading icons: "View Documentation" has a 20px arrow **before** the label, gap 8. "Pg_duckdb on GitHub" has a 16px GitHub glyph before the label. Hover lift is 7px (120ms ease-in-out) for every size, same as now.

### 2e. Motion tokens (new)
| Token | Value | Used by |
|---|---|---|
| lift-14 hover-only | `transform 120ms ease-in-out` to `translate(14px,-14px)`. No `:active` return was observed (press keeps the lift). | CompareCard, FeatureCard, PaperCard, ResourceCard |
| lift-10 + bg | `transform, background-color 150ms ease-in-out` to `translate(10px,-10px)` | CookbookCard |
| pill-tab indicator | `::before` `left 0.2s ease-out`; tab text `color 0.2s ease-out` | PricingTabs, Hypertenancy code tabs |
| chip-tab | `background, color 0.1s ease-in-out`; `::after` 2px bottom bar | Research filters, Trust tabs |
| faq | chevron `transform 0.2s ease-in-out` (rotate 180°); body `all 0.25s ease-in-out` (max-height 0 to content); row `background 0.2s ease-in-out` (no visible change measured) | FAQ |
| crossfade | out: `@keyframes fade-out-half {0%{opacity:1}50%{opacity:0}100%{opacity:0}}` 0.4s ease-in-out; in: `fade-in {0%{opacity:0}100%{opacity:1}}` 0.4s ease-in-out | QuoteCarousel |
| matrix-row | `background-color 0.1s ease-in-out` | pricing matrix rows |
| field | input `all 0.2s ease-in-out` (padding 0s ease); floating label `all 0.15s ease-out` | forms |
| eco-tile | `transform, border-radius 0.2s cubic-bezier(0.34,0,0.12,1)`. Hover: `scale(1.15)`, radius 36px, border-bottom 4px | EcosystemDiagram tiles |
| bob | `@keyframes bob {0%{transform:translate(0,-8px)}50%{transform:translate(0,8px)}100%{transform:translate(0,-8px)}}` 3s ease-in-out infinite | split-row illustrations |
| float | `@keyframes float {0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-20px) rotate(var(--float-rotate))}}` ease-in-out infinite. Per item (rotate, duration, delay): (-6deg, 7s, -1s), (5deg, 6s, -3s), (-5deg, 5.5s, -2s), (6deg, 6.5s, -4s), (-5deg, 8s, -5s), (5deg, 7.5s, -2.5s) | Guides hero |
| stack | scroll-driven: see StickyStack | StickyStack |
| reveal-up | `.scroll-animate-up {opacity:0; transform:translateY(100px)}`. When in view it becomes `opacity:1; transform:none`, `transition: opacity .5s ease, transform .5s ease` | ResourceCarousel cards entering view |
| marquee | scroll-linked, JS: `translateX += 0.32 × scrollDelta` (moves **right** as you scroll down) | MarqueeBand |

All infinite loops (`bob`, `float`, hero bubbles) must get `data-motion="continuous"` so the existing reduced-motion rule pauses them.

---

## 3. Block library

Each block lists: where it is used, any reuse, geometry (@1440 first, then responsive), typography, colour and motion. "Container" means the existing `<Container>` (1302 / 960 / 728 / 100%, padding 30 / 20 / 20 / 24).

### Shared micro-components (build these first)

**`TextLink`** (new primitive; the same pattern as the homepage "VIEW ALL INTEGRATIONS ⟶" link in `Integrations.jsx`. Extract it rather than rebuild it.)
- Wrapper: `inline-flex`, r2, 1px transparent border. Label span: `text-link` (16/19.2 ls .32 UPPER) or `text-link-sm` (14), `border-bottom:1px solid #383838; padding:1px 0; margin-bottom:1px`. Then a 20×20 `ArrowRight`, gap 6. Height 25.2 (22.8 for the 14px size).
- Hover: underline becomes **2px `sky-hover` #6FC2FF** (span height +1). Instant, no transition.
- Rendered as `<a>` or `<button>` (card CTAs). The arrow faces down (rotated 90°) on hero "LEARN MORE" scroll buttons, and left on "BACK TO COMPARISONS".

**`TagTitle`** (new): a heading on an ink plate: bg ink, text white, Mono, padding 8 20 (vs, flights) / 8 32 (startups, /product) / 12 20 (community) / 10 30 (hypertenancy). Usually absolutely centred on the section's top edge: `left:50%; transform:translateX(-50%)`, top 0, or top -25 / -33 when it straddles a 2px border. Yellow variant: bg `sun`, ink text, 2px ink border (/product "Case Studies"). Coral variant (`coral-red` bg, ink text, border 2 0 2 2) and ink variant ("Architecture" in ArchitecturePanel) sit beside a white subtitle box.

**`Chip`** (hero eyebrow): bg `sand-chip`, padding 8 12 (or 10 12), Mono 12/12 or 12/16.8 UPPER ink, centred. Variant with status: two labels separated by a 4×4 dot svg, gap 10 (Mono label + Inter 12 "Public Preview"). DuckLake uses bg `yellow-chip-border` #EBCD00.

**`FieldInput`** (new form primitive, used by ContactForm, ApplyForm and Newsletter)
- Input: height 58, bg `field`, 2px ink border, r2, padding 16 40 16 24, Inter 16 400 ink. Focus: border `sky-dark` #2BA5FF, no outline, no shadow. Valid after entry: border `field-valid`.
- Floating label: absolutely positioned `<p>`, Inter 16/22.4 300 ls .32 #666, padding-right 40, vertically centred. When focused or filled it moves to the top (top -5px, Inter 12/16.8 ink), `transition: all 0.15s ease-out`. The final resting box was not captured; only the 12/16.8 and top -5 values are measured. Visually-hidden `<label>` for a11y.
- Textarea: same styling, height 114, the label stays at the top-left (Inter 16/25.6 300 #666).
- Error/alert slot: `role=alert` div under each field. Error text style is **UNMEASURED** (none rendered).

**`SectionHead`**: centred column, gap 12. H2 (`h2-mono-lg` 32/38.4) + intro `lede-hero` (Inter 18/28.8 300 ls .36). Max widths vary per block (stated in each block).

---

### B1. `VsHero` (T1 only)
- Container; padding 72 30 146 @1440 · 64 20 278 @1280 · 64 20 312 @768 · 40 24 342 @390.
- Left column max-width 742, flex-col gap 20 (16 @390):
  1. Back row: 20px chevron rotated 90° (pointing left) + `TextLink` "BACK TO COMPARISONS" → `/vs`. **`/vs` is not in routes.js** (render as non-link, or add an index route).
  2. H1 `h1-vs` `[34–59ch / 5–10w Mixed]`, 2 lines @1440, 3 lines @390.
  3. H2 `sub-head` Inter 24/33.6 #666 `[~68ch/10w]`, 2 lines.
  4. P `lede` Inter 20/32 300 ls .4 `[~230ch/32w]`, 4 lines. It drops to 18/28.8 ls .36 at ≤959.
  5. Buttons: margin-top 12, row gap 8. `OffsetButton md primary` "TRY MOTHERDUCK FREE" (auth link, external, so render as a non-link button) + `md secondary` "GET A DEMO" → `/contact-us/product-expert`. <728: column, full width, gap 8, margin-top 4.
- Illustration: `Placeholder` 365×358 absolute (left 958, top 156 @1440); a competitor logo sits inside it at 175×39 (do not reproduce). <1302 it sits below the content inside the reserved bottom padding: 320×314 @390, centred with margin 0 35 and translateX(20).

### B2. `MarqueeBand` (vs ×2, persona, /product)
- Full-bleed strip, border-top + border-bottom 2px ink, overflow hidden. Heights: 84 @1440 (80 inner) / 81 @1280–768 / 70 @390 (vs). Persona/`/product` strip is 78.8–80.8.
- Track: flex row, align center. N copies of the label (9 for vs, 13 for persona, 17 for /product). Each copy is a span with `marquee` type, padding 16 0, margin 0 50 (vs) / 0 70 (persona) / 0 60 (/product). The last copy is the semantic `<h2>`.
- Colours: vs "Why MotherDuck" = `yellow` #F9EE3E. vs "More Comparisons" = `aqua` #53DBC9. Persona "Why MotherDuck" = `sun` #FFDE00. /product "Use Cases" = `sun` (it has margin-top 48 and no bottom border because the next panel provides it).
- Motion: JS scroll-linked `translateX`, **+0.32 px per px scrolled** (measured: 200px scroll gives +64px, both vs bands). No CSS animation and no transition. The /product "Use Cases" strip showed **no** movement in the probe: treat it as static.

### B3. `ComparisonTable` (vs)
- Section bg cream; padding 60 0 @1440 · 80 0 @1280/768 · 72 0 @390. Container flex-col gap 64, items centred.
- Head: `SectionHead`. H2 `[31ch/5w]` 1 line (`h2-mono-lg`; 24/28.8 @1280; 24/33.6 @768/390). P full width 2 lines (11 lines @390).
- Table: wrapper `overflow-x:auto`; `<table>` border-collapse separate, width 100% (≥728). **<728 the table keeps min-width 688 and scrolls horizontally.**
  - Columns @1440: 286.5 / 457.7 / 497.8 (label / competitor / MotherDuck). @390: 154 / 267 / 267.
  - Header row: th1 is empty, padding 20 24 36 0. th2: border-left 1px `sand-chip`, padding 20 24 36, competitor logo `Placeholder` 196×44. th3: bg rgba(255,255,255,.5), border 2px `sand-dark` on top/left/right, padding 20 24 36, MotherDuck logo `Placeholder` 218×40. @390 every th has padding 20 16 36.
  - Body rows (8 or 10 per page): label td Inter 16/25.6 400, border-bottom 2px ink, padding 16 32 16 0. Competitor td: same font, border-left 1px ink + border-bottom 1px ink, padding 16 32 16 24. MotherDuck td: bg rgba(255,255,255,.5), border-left/right 2px ink + bottom 1px (the last row has a 2px bottom), padding 16 32 16 24. Its content is a flex row, gap 16: a **32×32 check circle** (bg `sun`, 2px ink, r50%, 12×9 check svg) + text Inter 16/25.6 400. @390 all tds have padding 16 and the label td gets the 1px left/bottom ink borders.
- No interactions.

### B4. `LogoBar` (vs). **Reuse:** the dot and tooltip logic from `src/components/hero/LogoStrip.jsx` (orange dot + `<summary>` tooltip with an 8px rotated `::before` nub, bg ink). Only the layout differs.
- Section padding 40 0 20, margin-bottom 50 (30 100 10 @1280, 30 60 10 @768, 20 0 0 @390). Row: flex, wrap, centred, gap 48.
- 6 logos at height 28 @1440 (widths 230, 33.6, 163 (h18), 104, 132.7, 92.4). @390 they are height 22 (184, 27, 130 (h14), 83, 106, 74). 5 of the 6 are linked to `/case-studies/*` and get the 6.1×6.1 orange dot (top -3, 8px right of the logo).
- Hover (linked): tooltip below, same as the hero LogoStrip.

### B5. `BenchmarkPanel` (vs except clickhouse)
- Section margin-top -40. Upper part: padding 80 0 107 (56 0 98 @1280/768, 48 0 64 @390), overflow hidden. Container flex-col gap 52 (64 @≤1301), centred.
- Head (max 895): H2 `[33ch/7w]` + P Inter 18/25.2 300 ls .36 1 line, gap 12.
- Chart frame: max-width 1047, white, 2px ink, padding 20 (10 @≤959). Image `Placeholder` aspect 1047:253 (1003×243 @1440).
- 2 cards: grid 2 × 511.5, gap 24 (448 @1280, 332 @768, one column @390). Card: bg cream, 2px `sand-dark` border, padding 32, flex-col gap 12. Title Inter 20/32 **700** ls .4 (1 line). `ul` flex-col gap 8. Each `li` is a flex row, gap 12: bullet 26×25, bg `apricot`, 2px ink, r100px, padding 6 5, margin-top 4, holding a 12×9 check; text Inter 18/28.8 400, 2 lines. 3 + 2 (or 3 + 3) bullets.
- Lower strip: border-top 2px `sand-dark`, padding 40 100 60 (40 24 60 @390), flex-col gap 16 centred. Mascot `Placeholder` 108×108 + `TextLink` "SEE BENCHMARK RESULTS" (**external**, benchmark.clickhouse.com, so render as non-link).

### B6. `QuoteCarousel` (vs, pricing, hypertenancy)
- Outer: border-top 2px ink on vs (none on pricing/hypertenancy). Inner section padding 170 0 100 (vs @1440) · 120 0 100 (@1280/768) · 100 0 (@390). Pricing: 70 0 45. Hypertenancy: bg cream, 120 0.
- `TagTitle` (vs only): absolute, top 0, centred. Mono 32/38.4 (24/28.8 @1280, 16/19.2 ≤959).
- Card: max-width 816, centred, white, 2px ink, overflow hidden. The track is a flex row of slides, each 812 wide.
- Slide: padding 40 52, flex-col, justify centre. Quote row: flex gap 8, padding-bottom 32, a 24×22 quote-mark svg + blockquote `quote-carousel` centred (2–4 lines). Attribution row (centred): a name block with padding-right 32, margin-right 32 and border-right 2px ink, holding `person-name` + role. Then the company logo `Placeholder` h40 (w ~98–172). Then an optional `TextLink` "READ THE CASE STUDY" with margin-top 32.
- Controls (only when there are 2+ slides): prev/next buttons 48×44. Use `OffsetButton secondary` icon-only, padding 12, 20px arrow (the prev arrow is rotated 180°). They are absolutely centred on the card's left and right edges (`translate(-24px,-22px)` / `translate(24px,-22px)`) at vertical centre. Hover lift 7. Dots below: margin-top 24, gap 32, centred. Active dot 16×16, inactive 8×8, ink, r50%, `transition: all`.
- Motion: next/prev moves the track by one slide width. The outgoing slide runs `fade-out-half` 0.4s and the incoming `fade-in` 0.4s (opacity, ease-in-out). **Autoplay:** it advanced once between 6 s and 8 s after load in the probe. The exact interval is **UNMEASURED** (likely 8 s).
- Counts: vs 3 slides, pricing 2, hypertenancy 1 (no controls, no dots).
- Decorative svgs absolutely positioned around the card (4 on vs) → omit or use small `Placeholder`s.

### B7. `StickyStack` (all T1 and T2 pages)
- Section: bg `sun` #FFDE00 (vs, dives, flights, mcp, postgres) or `yellow` #F9EE3E (ducklake, guides). Border-top 2px ink (+ border-bottom on product pages), `overflow: clip`.
- Container padding 80 30 180 (200 on guides) @1440 · 92 20 184 @1280/768 · 64 24 80 @390. Flex-col gap 100 (40 ≤1301), items centred.
- Intro (`SectionHead`): max 820 (vs, dives) / 720 (ducklake) / 800 (guides). H2 1 line; P 2–3 lines with margin-bottom 10. Guides P weight is **400**, everyone else 300.
- **≥728 (sticky stack):** the cards wrapper has `height: calc(565px + (n-1)×83.333vh)`, `view-timeline-name: --overlapping-cards; view-timeline-axis: block`. Inside it, a `position: sticky; top: 250px` box of 1242×492 (920×565 @1280) holds n `<article>`s, absolutely stacked, `margin-top:-10px` (-40 ≤1301), z-index 1..n.
  - Article @1440: 1242×492, white, 2px ink, overflow hidden, flex row, justify flex-end, gap 80. Left: image `Placeholder` 580×488 (margin-right -2) **on the left**. Right text column max 500: flex-col gap 12, centred vertically. H3 `card-h3-mono` 1–2 lines; P Inter 16/25.6 300 ls .32 (max 550–560), 3–5 lines; optional `TextLink` with margin-top 12.
  - @1280/768: the article is a column (920/688 wide, ~533–555 tall). The text comes first (P 16/22.4), then the image 470×394.
  - Animation (CSS scroll-driven, `animation-timeline: --overlapping-cards`, linear, fill both, `--scale-end: 0.9`):
    - card 1: `scale(1→0.9)` only;
    - middle cards: `translate: 0 1000px → 0` (slide up from below), then `scale(1→0.9)`;
    - last card: slide in only.
  - Ranges (`animation-range`, "cover a% cover b%"):
    - n=5: slides 20–35, 35–50, 50–65, 65–80; scales 20–35, 35–50, 50–65, 65–80.
    - n=4: steps 20–40, 40–60, 60–80.
    - n=3: steps 30–50, 50–70.
  - Pattern: card i scales over the same range in which card i+1 slides in. Provide an IntersectionObserver/scroll-progress JS fallback for browsers without scroll timelines.
- **<728:** no stack. Normal column, gap 52. Articles 327 wide (max 327), white, 2px ink. H3 20/24, P 16/22.4. Image `Placeholder` 304×254 at the bottom.
- Counts: vs 5 (all with links), dives 5 (links), ducklake 4 (links), flights 4 (links), mcp 4 (no links), postgres 4 (no links), guides 3 (no links).

### B8. `CompareCards` (vs): a `MarqueeBand` (aqua, "More Comparisons") followed by a grid
- Below the band: padding 64 0; container flex-col gap 64. H2 "Choose a comparison" Mono 32/38.4 **left** (24/28.8 centred @≤1301; 24/33.6 @768/390).
- Grid: 3 × 400.7, gap 20 @1440. 2 × 354, gap 32, centred @1280. 2 × 328 @768. 1 × 342 @390. 5 cards (every vs page except the current one, in fixed order: clickhouse, databricks, postgresql, bigquery, redshift, snowflake).
- Card: `LiftCard lift={14}` (hover only, **no press return**), white, 2px ink, padding 24, flex-col gap 12, height 332.8 (304 when the title is 1 line; 266.8 @≤1301; 258.8 @390). Number chip "01"–"05": Mono 14/14, bg `peach`, 2px `orange` border, padding 8 14. H3 link "MotherDuck vs X" `card-h3-mono` (1–2 lines) → `/vs/<x>-alternative`. Body Inter 16/25.6 300 ls .32, clamped to 5 lines (max-height 128, overflow hidden). Then a `TextLink` sm "LEARN MORE" (button; the whole card has `cursor:pointer` and navigates).

### B9. `FAQ`: **new** (the homepage `architecture/Accordion.jsx` is single-open card styling and must not be reused)
- **Variant `full`** (vs, /product, pricing, startups, duckdb-users): section bg cream (border-top 2px ink on vs).
  - Header row: padding 34 0 (20 0 @768/390). Container `h2-mono` "FAQS" left.
  - Item rows: border-top 2px ink, padding 26 0 (20 0 @≤959); the last row also has border-bottom 2px ink.
  - Inner: container, then a question block (width 900.7 @1440, i.e. margin-right 341 so ~72.5% of the container). Button: flex, align centre. H3 `faq-q` margin-right 20 (1–2 lines) + 24×24 chevron.
  - Answer: `max-width:98%; overflow:hidden; max-height:0`. It opens to the content height with `transition: all .25s ease-in-out`. Content margin-top 16; `faq-a` Inter 18/28.8 300 ls .36. Inline links underlined (style UNMEASURED beyond inheriting the font). Lists: li Inter 16/25.6 300, margin-left 24, padding-left 4, with strong Inter 18 700. Inline code per §2c.
  - Decorative illustration `Placeholder` 260×231 absolute at the bottom right (x 1038).
- **Variant `contained`** (flights, guides, hypertenancy, dives): wrapper bg cream, container, then a section with max-width 1028, centred.
  - flights: padding 20 0 100, inner padding 0 80, title `h2-mono` centred, items `faq-q-lg` 24/33.6, row padding 28 0.
  - guides: padding 10 0 40, otherwise as flights.
  - hypertenancy: padding 0 0 40, inner padding 0 72, title left, items 23/32.2, row padding 26 0.
  - dives: the section itself is 1028, padding 20 0, inner padding 0 30, title Mono 32/38.4 centred, items 23/32.2.
- Behaviour (all variants): click toggles that item; **multiple items can be open at once** (measured). Chevron rotates 180° (0.2s ease-in-out). Nothing is open by default. Row hover: no visual change measured.
- Counts: vs 7–9, /product 7, dives 8, flights 5, guides 4, hypertenancy 6, startups 5, duckdb-users 13, pricing 16.

### B10. `CTABand` (vs, all T2 pages, hypertenancy)
- Section: grid-pattern texture on cream (hypertenancy explicitly bg cream). The original is a 648px-wide PNG tile, `repeat`, position 50% 0. Recreate in CSS: 1px lines of ink at ~4% alpha (sampled #F1EBE4 on #F4EFEA) every **58.9px** in both directions (648/11). Overflow hidden.
- Padding: vs 160 0; product 120 0 160 @1440 · 100 0 120 @1280 · 92 0 @768/390.
- Card: max-width 1028, centred, white, 2px ink, overflow hidden, 2-column grid.
  - vs: [544 | 480], left padding 54 74 54 90.
  - product: [582 | 442], left padding 58 40 60 70.
  - @1280: [556 | 360], left padding 28 32 28 40. @768: [404 | 280]. <728: one column (max 360), left padding 32 24 0, gap 32.
- Left column: flex-col gap 32 (24 ≤959), justify centre. H2 `h2-mono-lg` 2 lines (3 on postgres; 24/28.8 ≤1301). P Inter 16/25.6 300, padding-top 12 (8 @390), max 340 on vs, 1–3 lines. Buttons:
  - vs: `md primary` "GET STARTED" → `/better-data-warehouse-trial` (**not in routes.js**) + `md secondary` "GET A DEMO" → `/contact-us/product-expert`, gap 8.
  - product: `md primary` (auth, non-link) + `TextLink` sm (docs, non-link), gap 24.
- Right column: a `sky-tint` #CEEBFF panel (480×376 @1440; it is scaled `matrix(1,0,0,1.6,23,0)` @1280 and `1.2,1.05` @390) under an illustration `Placeholder` (427×419 vs; 367×232 @1280; 338×237 @390 below the text).

### B11. `ProductHeroCentered` (dives, flights, guides, mcp; hypertenancy uses a dark variant, B17)
- Section border-bottom 2px ink, padding-bottom 72, overflow hidden. Container flex-col gap 32, centred.
- Text block: padding-top 72 (32 @768, 24 @390), flex-col gap 20 (16 ≤959), centred, max 815–1042. `Chip` (dives "DIVES"; mcp "MOTHERDUCK MCP SERVER"; guides "GUIDES"; flights "FLIGHTS · Public Preview"). H1 `h1-mono-xl` centred, 2 lines. P Inter 20/28 300 ls .4 (guides/flights 20/32) max 815, 2–3 lines (18/25.2 ≤959).
- Buttons: row gap 24, `lg primary` "GET STARTED FREE" (auth) + `lg secondary` "VIEW DOCUMENTATION" with a leading arrow (docs, so non-link).
- Decoration variants:
  - **guides**: 6 floating illustrations (`float` keyframes, values in §2e) + a 459×198 image bottom-left. Section padding-bottom 175. All `Placeholder`.
  - **flights**: 17 drifting bubble svgs (absolute, each `scale(0.37–1.46)`). JS moves them ~13–20 px/s and they react to the cursor (parallax away from the pointer). Use `Placeholder` circles with a simple requestAnimationFrame drift, or keep them static. The exact algorithm is **UNMEASURED**.
  - dives/mcp: none.

### B12. `ProblemCards` (mcp, postgres)
- Padding 72 0 120 @1440 · 56 0 92 @1280/768 · 48 0 64 @390. H2 centred (`h2-mono-lg`; 30/36 @1280; 24/28.8 below), P Inter 18/28.8 300 padding-top 12.
- Grid: 3 × 321.3, gap 32, max 1028, margin-top 52. @1280 3 × 290.7 gap 24; @768 3 × 213.3; @390 1 col gap 24.
- Card: white, 2px ink, padding 16 32 32 (16 24 24 ≤1301). Illustration `Placeholder` 120×120 (80 @768). Title p Inter 16/25.6 **600** padding-top 24 (2–3 lines). Body Inter 16/25.6 300 padding-top 12 (4 lines). No hover.

### B13. `MediaFrame` (flights, dives)
- Padding 72 0 120 @1440 (56 0 92 @768, 48 0 64 @390). Flex-col gap 52 (64 @768) centred. Head max 853 (flights) / 558 (dives): H2 1 line, P max 700.
- Frame: max 1028, r20, overflow hidden. Image `Placeholder` 1028×544 (aspect 3720:2073), r20. 920×487 @1280, 660×349 @768, 342×181 @390.

### B14. `QuoteSpotlight` (flights, mcp, postgres, startups)
- Wrapper border-bottom 2px ink (startups: border-y 2px). Section padding 162 0 102 (postgres 172 0 102; startups 140 0 110) @1440; 120 0 88 @≤1301; 104 0 92 @390.
- `TagTitle` absolute, top 0 (startups: top -25, straddling the border). Mono 32/38.4 → 24/28.8 → 18/21.6.
- Content: flex-col gap 52, centred, max 824. Blockquote `quote-spot` centred, 3–6 lines (it can contain `<strong>` at 700). Attribution card: 2px ink border, grid [90 | auto]. Photo `Placeholder` 90×90 (54×52 @390) with border-right 2px. Then a white panel, padding 16 24, flex-col gap 4: name `person-name-lg`, role Inter 16/25.6 300 ls .32. Optional `TextLink` "SEE CASE STUDY" with margin-top 20 (mcp, postgres).
- 4 decorative svgs → omit or `Placeholder`. Single slide; no controls.

### B15. `CTA`-less helpers on product pages

**`CookbookGrid`** (flights):
- Border-bottom 2px ink, padding 72 0 (56 0 92 @768). H2 with a cream highlight (padding 2 4) centred.
- Grid: 3 × 392, gap 32, max 1240. @≤1301 2 × 450/334, gap 20; @390 1 col.
- Card: `LiftCard lift={10}` with bg transition 150ms, white, 2px ink, padding 32, flex-col gap 32. Logo area 324×60 holding a logo `Placeholder` (max-w 200). Text flex-col gap 20: H3 `card-h3-mono` (18/21.6 ≤1301) + P Inter 14/19.6 300 ls .28. Then `TextLink` "GET STARTED". 6 cards; all link to /docs, so render them as non-links.

**`VideoFrame`** (dives): border-bottom 2px, padding 72 0 120 (48 0 64 @390). Frame max 800, 2px ink, `hard-12` shadow; inner bg #000, r2, 16:9 mux video → `Placeholder` 796×448 (no playback).

**`LiveEmbed`** (dives): border-bottom 2px, padding 72 0 120. Head gap 40. Frame max 900, 2px ink, `hard-8` shadow. Header bar: ink, padding 14 20, space-between. Title Inter 16/16 600 ls .48 white `[41ch/5w]`. Badge "LIVE QUERIES": Mono 12/12 500 ls .5, bg `sun`, padding 6 10. Body 896×600, bg `surface-2`, iframe (external app) → `Placeholder`.

**`GalleryTeaser`** (dives):
- Border-bottom 2px, padding 72 0 120. Head P colour **#818181**. Grid 3 × 324, gap 28, max 1028 (1 col @390).
- Item: `<a>` flex-col gap 12, `transition: transform .2s ease` (the hover transform is **UNMEASURED**). Thumbnail 324×182: white, 2px ink, r2, image `Placeholder` cover. Caption Inter 16/16 400.
- Below: `lg secondary` "VIEW ALL IN THE DIVE GALLERY" → `/dive-gallery`. Items link to `/dive-gallery/dives/<slug>`, which is **not in routes.js**.

**`BrowserWindowDemo`** (guides):
- Padding 72 0 120 (48 0 64 @390). Head max 925, gap 52.
- Window: white, 2px ink, r24. Top bar padding 24 with three 10px dots (`teal`, `sun`, `coral-red`), gap 8. Title block padding 4 346 24 24: H3 Mono 32/38.4 + P Inter 14/19.6 500 ls .28 with an inline Mono link → `/blog/context-belongs-in-the-warehouse`.
- Body padding 0 24 24: inner panel `sky-tint`, 2px ink, r12 (image `Placeholder` 1186×470), plus an overlay `Placeholder` 200×161 at the top right.
- Legend `ul`: flex wrap gap 12 19, centred. Two items in Fono 16.5/19.8 UPPER ("WITH GUIDES", "WITHOUT GUIDES"), each with a 19×19 swatch (`sun` / `coral-red`, 2px ink, r2).

### B16. DuckLake-only blocks
- **`DuckLakeHero`**:
  - Upper part: bg `sun`, padding 72 0 263 (24 0 254 @390). Horizon: a `sky-hover` ellipse 10820×2204 r50% absolutely placed at top 566, plus a decorative svg 1668×746 → recreate the ellipse in CSS and drop the svg.
  - Content flex-col gap 20, centred: `Chip` (bg #EBCD00) "MANAGED DUCKLAKE · Public Preview". H1 2 lines: line 1 is text; line 2 is a two-part svg wordmark (289×77 + 365×77). **Render line 2 as text in `h1-mono-xl` with ls 3.2px.** P Inter 20/32 300 centred max 636. Buttons gap 24, margin-top 16 (`md`).
  - Lower part: bg linear-gradient(`sky-hover` 0%, `sky` 25%, cream). The rest of the stops are **UNMEASURED**. Padding 120 0 (48 0 64 @390). H2 + P (max 720, padding 12 0 52), then `CodePanel` (6 lines).
- **`CodePanel`**: max 1028, bg ink, 2px rgba(255,255,255,.2) border, r20, overflow hidden. Header: padding 16 24, border-bottom 2px ink, space-between. "SQL" Inter 18/21.6 UPPER white + copy icon (44×24, padding 0 10). Click shows the text "Code copied!" (duration UNMEASURED). `pre` padding 16 24 24, overflow auto; colours per §2a. Write neutral placeholder SQL of the same line count (6 / 9 lines).
- **`IcebergVsDuckLake`**:
  - Border-top 2px, padding 0 100 128 (0 24 64 @390), flex-col gap 52 (40 @390).
  - Head: `TagTitle` (ink, 2px ink border) + P Inter 18/28.8 **400** ls .36 max 720.
  - Grid 2 × 612.5, gap 15 (1 col gap 10 @390). Each panel is a `Placeholder` 612.5×676 (aspect 1014:1352) with a label chip at the top centre (200 wide, padding 8 10, Mono 14/16.1 ls .28 UPPER). Chip 1: white bg, ink text "ICEBERG". Chip 2: ink bg, white text "DUCKLAKE".
- **`NewsletterSignup`**:
  - Border-top 2px, padding 74 0 82 (214 0 50 @390). Mascot `Placeholder` 410×468 absolute left (top -68).
  - Column max 575 (margin-left 577 @1440). H2 **Fono** 32/44.8 UPPER (24/33.6 @390), padding-bottom 12. P Inter 20/32 300 padding-bottom 40.
  - Form: grid [447 | 112], gap 20 16 (1 col @390). `FieldInput` "WORK EMAIL". Submit button in disabled styling: bg `surface-2`, 2px #818181, text #666 Inter 16/19.2 UPPER, padding 17.25 23, on an ink backing, `transition transform .12s`. Checkbox: 18×18, ink fill, 2px ink, r2, white 10×7 check (checked by default) + label Inter 16/25.6 400, padding-left 11. No real submission.
- **`CodeSample`**: padding 72 0 120. H2 + P (max 720, padding 12 0 52) + `CodePanel` (9 lines).
- **`ResourceCarousel`**:
  - Bg cream, border-top 2px, padding 80 0 0 (56 @390). H2 Mono 32/44.8 left. Track wrapper padding 40 0 32.
  - Cards: 392.7 wide, margin-right 32 (342 wide @390), height 621.8; 8 cards. `LiftCard lift={14}`, 2px ink. Thumbnail `Placeholder` 388.7×218.6 (500:270 cover), bg cream, border-bottom 2px. Body: white, padding 32, flex-col gap 8. Meta Inter 16/25.6 300 ls .32 at opacity .6 ("date · author"). H3 link Mono 20/28 UPPER (2–5 lines) → `/blog/<slug>`. P Inter 16/25.6 300 ls .32, clamped to 7 lines.
  - Cards outside the viewport start as `reveal-up` and animate in.
  - Controls row: padding-bottom 48, space-between. Left: prev/next 28×28 arrow svgs, gap 16 (disabled styling UNMEASURED; opacity stayed 1). Right: `lg primary` "VISIT BLOG" + 20px arrow → `/blog`.
  - Click "next": the track moves by one card (424.7px) with a transform transition (duration **UNMEASURED**).

### B17. Hypertenancy-only blocks
- **`DarkHero`** (two stacked sections on a dark illustrated backdrop):
  - Backdrop: 2250×1505 image centred → recreate as solid ink #383838 (sampled #383838–#3F3F3F) + two to three `ht-glow` radial gradients (860×780, 780×780 and 900×900 circles, r50%) behind the lower half.
  - Upper section: padding-top 72. `Chip` bg rgba(255,255,255,.1), white Mono 12/12, padding 10 12. H1 white `h1-mono-xl`, 2 lines; **line 2 is MuseoModerno 900 56/67.2**. P Inter 20/32 300 white max 800.
  - Buttons (margin-top 32, gap 12 24): `lg ht` "GET STARTED FREE" + `lg ht-dark` "VIEW DOCUMENTATION" (leading arrow; docs, non-link).
  - Media: 1028×573, bg ink, r20, image `Placeholder`, margin-top 66.
  - Lower section: padding 92 0 160 (80 0 @390). White H2 + P centred (gap 12).
  - **Code tabs**: tablist 512×56, margin 52 auto 24, bg rgba(255,255,255,.2), 2px ink border, r999, grid 3 equal columns (3 × 112.7 @390). Indicator `::before`: cream, 2px ink border, r999, 173.3×56, left -2 → 167.3 → …, `transition: left .2s ease-out`. Tabs "UI", "CURL", "PYTHON": Inter 16/19.2 UPPER, padding 0 28, active ink, inactive white (`color .2s ease-out`).
  - Tab panel: 1028×544, white, 2px ink, r20, overflow hidden, holding a screenshot `Placeholder` (cover). Click swaps the panel content instantly (no fade measured).
  - Decorative 1062×307 image at the bottom → omit.
- **`AlternatingFeatureRows`**:
  - Bg cream, border-top 2px, padding-bottom 120 (80 @390). `TagTitle` centred at the top: Mono 40/56, padding 10 30.
  - Grid 1 col, gap 132 (80 @390), padding-top 100. 5 articles, grid [581 | 581], gap 80 (1 col gap 24 @390), image side alternating L/R/L/R/L.
  - Image panel: white, 581×558.6, image `Placeholder` + a noise-texture overlay (omit).
  - Text: flex-col gap 12, vertically centred. `Chip` (Mono 12/16.8) + H3 `card-h3-mono` (1–2 lines) + P body 3–4 lines + optional `TextLink` with margin-top 20 (3 of 5; their targets are docs or `/blog/faster-ducks`).

### B18. Persona blocks (T3, /product)
- **`PersonaHero`** (app-dev, data-teams, /product; duckdb-users is variant `chip+illustration`):
  - Padding 92 0 156 (duckdb-users 56 0 100) @1440 · 70 0 100 @1280 · 40 0 160 @768/390. Container flex row, gap 80, centred (stacked ≤959).
  - Left max 560 (440 @1280): optional `Chip` (Fono 12/12, margin-bottom 20; duckdb-users). H1 `h1-persona` 2–4 lines, padding-bottom 32. H2 Inter 18/28.8 300 (16/25.6 @390), 3–5 lines, padding-bottom 32, with inline links (/product: → `/product/data-teams`, `/product/app-developers`, `/product/mcp-server`).
  - CTA row: wrap, gap 30 40. `lg primary` "GET STARTED" (auth, non-link) + `TextLink` "LEARN MORE" button with a **down** chevron (chevron `transform .2s`). Click smooth-scrolls to the next section (measured scrollY 636 from 0).
  - Right (app-dev, data-teams, /product): video thumbnail button 600×337.5. Bg ink, 2px ink, r2, wrapper `hard-12` shadow. Image `Placeholder` cover. Play disc 100×100 white, 2px ink, r50%, centred, `background-color .1s`. Decorative svgs: a 260×252 one animates in with `transform 1.1s cubic-bezier(.32,0,.67,0)`, plus a 870×489 one scaled 1.45. Click opens a video; the target UI is **UNMEASURED** (render as a static `Placeholder`). Right (duckdb-users): illustration `Placeholder` 540×440.
- **`PersonaSplitRows`**:
  - Starts with a `MarqueeBand` (sun, "Why MotherDuck", padding-top 20 on the section). Then 3 rows. Each row has border-bottom 2px ink and a full-bleed coloured side panel (absolute, 528 wide, on the illustration side): row 1 `garden` (left), row 2 `coral-red` (right), row 3 `sun` (left).
  - Inside the container, a flex row. The illustration column is 509 wide with border-right/left 2px ink, padding 80 0, margin 0 120 0 0 (or 0 0 0 120). It holds a sticky (top 325) illustration box 507×380 with `bob` 3s → `Placeholder`.
  - Text column max 600, padding 120 0, flex-col gap 52. Head (gap 24): H2 `persona-h2` 2–3 lines + P Inter 20/32 300 (8–14 lines, inline links). Then 2–3 sub-items, each flex-col gap 16: icon `Placeholder` 90×90 (74 ≤959), H3 `card-h3-mono-tall`, P body Inter 16/25.6 300.
  - ≤1301: stacked; the illustration panel becomes a full-width 335-tall strip (padding 20) above the text.
  - Sub-item counts: app-dev 2/2/2, data-teams 8 total, duckdb-users 8 total.
- **`FeatureGrid`** (all T3 + /product, identical):
  - Container padding 64 30 140. H2 `h2-mono` "FEATURES" padding-bottom 52 (24/33.6 @390).
  - Grid 3 × 392.7, gap 32 (1 col gap 24 @390; 2 cols in between, UNMEASURED exact).
  - Card: `LiftCard lift={14}` as `<a>`, white, 2px ink, padding 32 32 40, flex-col gap 16. Icon `Placeholder` 140×140. H3 `card-h3-mono-tall` 1–2 lines. P body 4–6 lines. `TextLink` "MORE DETAILS" (button) with padding-top 16 and margin-top auto.
  - 6 cards → `/product`, `/product/mcp-server`, docs (non-link), `/product/dives`, `/product/flights`, `/product/hypertenancy`.
- **`ArchitecturePanel`**:
  - Section bg `sky-hover` #6FC2FF, border-top 2px, padding 144 0 140 (88 0 @390).
  - Title row: `TagTitle` "ARCHITECTURE" (Mono 32/44.8, padding 12 20, border 2 0 2 2; coral-red bg + ink text on personas, ink bg + white text on /product) + subtitle box (white, 2px ink, padding 21.5 30, Inter 24/28.8 300, 3 lines).
  - Panel: white, 2px ink, `hard-16`, translateY(-36), holding an SVG diagram → `Placeholder` 1238×721 (/product, data-teams, duckdb-users). App-dev's panel is 1238×1645 with padding 100 80 121 and 3 H3 labels inside → `Placeholder` of that size.
  - Plus 6 small decorative svgs → omit.
- **`YellowCTA`** (app-dev, data-teams): bg `sun`, border-top 2px, padding 140 0. Left max 654, flex-col gap 20: H2 `h2-mono` 2 lines + P Mono 24/33.6 300 ls .48 UPPER 2 lines + `TextLink` (margin-top 20). Illustration `Placeholder` 430×373 absolute right + decorative svgs.
- **`EcosystemDiagram`**:
  - Section bg cream + grid texture, border-y 2px, padding 80 0 120 (40 0 60 @390). Title box: bg cream, padding 20 32. "ECOSYSTEM" Mono 56/67.2 (32/44.8 @390) + sub "MODERN DUCK STACK" `hero-tagline-mono`.
  - Diagram 1280×815: a 6-col grid (213.3, gap 60) plus a bottom row (gap 62). Background **video** 1380×660 (webm, autoplay, loop) → `Placeholder` (no video). Centre label "CLOUD DATA WAREHOUSE" (Mono 18/21.6, cream, padding 9 18) over a 205×205 svg.
  - 9 category tiles (360×145; Reverse ETL 300×145; Transformation 280×155): bg/border pairs per §2a, 2px border, padding 12 20, flex-col gap 8. H3 Mono 18/21.6 centred + 2–5 logo `Placeholder`s (h ~36) + a 38px "more" glyph. 7 of 9 tiles link to `/ecosystem?category=<name>` (query param; internal `/ecosystem`).
  - Tile hover: `scale(1.15)`, r36, border-bottom 4px (`eco-tile` timing).
  - @390: 6 cols × 55.8, gap 10 (a compressed diagram). Treat <728 as a single `Placeholder` 335×~400 if needed (exact mobile tile layout **UNMEASURED**).
- **`CaseStudyCarousel`**:
  - Title `TagTitle` yellow (Mono 32/44.8, padding 8 32, 2px ink border) absolute at top -32, left 102 (24/33.6, padding 8 16 @390).
  - Section 1440×380, bg `sky-hover`, border-bottom 2px, overflow hidden. Vertical track of N slides × 380 (flex-col).
  - Each slide is a grid [938 | 500] with border-right 2px. Slide bg alternates `sky-hover` / `sun`.
  - Left: padding 0 68 0 106. Open quote 30×28 svg (margin-bottom 16), blockquote `case-quote` 2–4 lines, close quote rotated 180° (margin-top 10), `TextLink` "READ MORE" → `/case-studies/<slug>`.
  - Right: photo `Placeholder` 500×380 cover. Name tag absolute bottom-left: bg cream, border-top/right 2px, padding 14 22 14 30. `person-name-lg` + role Inter 16/20.8 300 ls .32. A 22.6px square rotated 45° (slide bg, borders 2 2 0 0) forms a notch at the column seam.
  - Nav: a 24×108 column at left 45, vertically centred (translateY 54), with up/down 24px chevrons (gap 60, `transform .2s`). Click moves the track by 380px vertically (transition timing **UNMEASURED**). No autoplay (no movement over 9 s).
  - Slides: /product 13, app-dev 4, data-teams 14, duckdb-users 13. Some links are external or `/blog/*`.
  - @390: one column, 390 wide; full layout **UNMEASURED**.
- **`ContactForm`** (/product, duckdb-users):
  - Container padding 80 300 100 (80 24 100 @390). H2 Mono 32/44.8 "GET IN TOUCH" padding-bottom 12. P Inter 20/32 300 ls .4, padding-bottom 36.
  - Form flex-col gap 40: row of First/Last name (gap 24), Email, Company, Description textarea. Privacy note Inter 14/19.6 300 ls .28 #818181 (padding-top 32, 3 lines). `lg primary` "SUBMIT" (margin-top 16).
  - A reCAPTCHA iframe (256×60) is loaded by the original: **omit**.
  - Decorative: mirrored mascot `Placeholder` 320×240 + svgs.

### B19. /product-only bespoke blocks
- **`UseCaseSplit`** (after the "Use Cases" marquee): bg `teal`, border-top 2px. Left half bg `coral-red` with border-right 2px. Grid 2 × 720, each cell padding 40 30 64, flex-col gap 40, centred. Illustration `Placeholder` 440×340. H2 link on an ink plate (`TagTitle` style, Mono 32/44.8, padding 8 30): "FOR APP DEVS" → `/product/app-developers` and "FOR DATA TEAMS" → `/product/data-teams`. P Inter 20/32 **400** centred, 3 lines. `TextLink` "LEARN MORE".
- **`OldWorldNewWorld`** (5435 tall @1440):
  - Intro band: `sky-hover` bg, padding 175 0 110, H2 Mono 52/72.8 centred (24/33.6 @390) + a 42×56 icon.
  - Two story panels: "THE OLD WORLD" (right half bg `stone` #E4DED7, left half cream) and "THE MOTHERDUCK WORLD" (left half `teal`, right half `garden`). Each has a heading tag (ink plate, white Mono 36/50.4, padding 8 30) + a caption box (Inter 20/32 300, padding 8 24, 2px border; white or `sun` bg). Then 3 text items (H3 Mono 24/33.6 + P Inter 20/32 300) spaced 380 apart, and on the right a sticky (top 355) lottie-like svg driven by a scroll timeline (`dKwrDr`: `scale(var(--scale-from))` to `scale(var(--scale-to))`; scale-from 0.9, scale-to 0; range cover -10% cover 40%) → static `Placeholder` 433×302.
  - Closing band: `sky-hover`, cloud texture (omit), H2 tag "THE AI NATIVE CLOUD DATABASE" + a 470×418 svg → `Placeholder`.
  - Treat this as one block with static placeholders. The scroll-scrubbed vector animation is **not reproducible** without the original assets.
- **`AgentCardCarousel`**: padding 48 0 64. A 765-wide viewport centred, track of 4 cards (765×183, margin-right 32). Card: white, 2px ink, padding 32, gap 16. Title Mono 18/27 (uppercase in source) + P Inter 16/24 400, 3 lines. Inactive cards opacity .4 (`opacity .2s ease-in-out`). **Autoplay ~4.5 s**, translateX by 797 (transform transition, duration UNMEASURED). Dots as in QuoteCarousel (16 active / 8, gap 32, padding-top 52). It is followed by the `ArchitecturePanel` on a `sun` bg (padding 144 0 140).

### B20. Pricing blocks
- **`PricingTabs`** (pricing + duckdb-support): tablist 265.8×28, white, 2px ink, r999, grid 2 × 130.9. Indicator `::before`: `sun`, 2px ink, r999, 134.9×28, left -2 (Cloud) → right half (Support), `left .2s ease-out`. Tabs are `<a role=tab>`: Inter 12/14.4 UPPER, padding 0 10, active ink, inactive #818181, hover ink (`color .2s ease-out`). Labels "CLOUD DUCKDB" → `/product/pricing`, "DUCKDB SUPPORT" → `/product/pricing/duckdb-support` (route change; the indicator position is driven by the route). @390 the columns are 117.7.
- **`PricingHero`**: container; padding 100 0 60 (82 0 48 @1280; 62 0 20 @768), flex-col gap 32 (28 @768), centred. Tabs, then H1 `h1-mono` 2 lines + P `lede-hero` 1 line (gap 20). Decorative svgs at the edges.
- **`TierCards`**:
  - Section padding 90 0 50 (95 0 50 @1280, 68 0 50 @768, 32 0 50 @390). Grid 3 × 392.7, gap 32 (306.7 gap 20 @1280; 233.3 gap 14 @768; 1 col gap 52 @390).
  - Business (middle) card is `transform: scale(1.1)` at ≥728.
  - Card: 2px ink, flex-col. Mascot `Placeholder` 100×100 absolute (top -41, right 5; 110 on Business).
  - Top part: white, padding 32, space-between. Name `tier-name` "LITE" / "BUSINESS" / "ENTERPRISE". Price row (flex, gap 12, align centre): Lite = "STARTING FROM" (Mono 12/14.4 #818181, 2 lines) + `price` "$0". Business = `price` "$250" + "PER ORG / MONTH + USAGE" (Mono 16/22.4 #818181, 3 lines, padding-bottom 12). Enterprise = `price` "CUSTOM". Price margin-top -6. Description Inter 16/25.6 400 #818181, 2 lines (15/24 @1280).
  - CTA: `OffsetButton size="tier"` full width. Lite "START FREE" (white variant, auth); Business "TRY 7 DAYS FREE" (primary, auth); Enterprise "CONTACT US" (white variant) → `/contact-us/product-expert`. Hover lift 7.
  - List: white, padding 30 30 36, flex-col gap 16. Intro line Inter 16/25.6 400. Then li × 7 / 9 / 6: 24px check svg (margin-right 12) + Inter 16/25.6 400, 1–2 lines. Business and Enterprise end with `TextLink` sm "SEE INSTANCE TYPES" (margin-left 36) → `#instance-types`.
  - No card hover.
- **`AnnualPlanStrip`**: margin-top 92, bg `sand-chip`, padding 21 67 21 180. Text Mono 16/22.4 UPPER centred "LOOKING FOR AN ANNUAL PLAN?" + `TextLink` in **Mono** 16/19.2 "GET IN TOUCH" → `/contact-us/product-expert`. Illustration `Placeholder` 136×111 absolute at the left (x 400).
- **`QuoteCarousel`** (B6) with 2 slides, padding 70 0 45, dots only (+ arrows).
- **`PlanMatrix`** (`#info-table`):
  - Section padding 60 0 100. H2 `h2-mono` "COMPARE PLANS" centred.
  - Region selector row: padding 12 20, flex gap 10, centred. Label Inter 14/19.6 #818181 "Region". Dropdown 309×38.4, bg `sand-chip`, padding 8, `cursor:pointer`: 20px globe + value Inter 16/22.4 300 (max 175, ellipsis) + chevron (rotates 180°, `.2s ease-in-out`).
  - Dropdown menu: absolute, white, 2px ink, 328 wide, z3, no shadow. 7 options Inter 16/16 (43.4 tall each). Labels are region names; write them generically ("Region 1"…) or as written: "USA (N. Virginia): us-east-1", "USA (Oregon): us-west-2", "Europe (Frankfurt): eu-central-1", "Europe (Dublin): eu-west-1", "Japan (Tokyo): ap-northeast-1", "Australia (Sydney): ap-southeast-2", "Request a Different Region". Selecting one changes the prices shown (the data per region is **UNMEASURED**; keep the default values).
  - **Sticky header** (`position:sticky; top:120px; z-index:2`): bg cream, border-bottom 2px ink, grid [240 | 334 | 334 | 334] (@1280 [165 | 251.7×3]; @768 [110 | 192.7×3]; @390 [114×3] sticky top 70). Cells:
    - "PLANS": Mono 32/38.4, border-top/right 2px `sand-dark`, padding-left 20.
    - Plan columns: border-top 2px `sand-dark`, padding 16 20, flex-col. Name Mono 24/33.6 UPPER (18/25.2 @1280). Price line Inter 14/19.6 (bold part 400, rest 300), padding-bottom 16. `OffsetButton md`: Lite "START FREE" cream, Business "TRY 7 DAYS FREE" primary, Enterprise "CONTACT US" cream.
    - Business column header bg rgba(255,255,255,.282).
  - Group header rows (4): bg cream, border-bottom 2px ink, padding 64 20 24. Mono 18/25.2 300 ls -.16 UPPER: "MOTHERDUCK DATA WAREHOUSE", "WORKFLOW AND COLLABORATION", `[36ch/4w]`, "SUPPORT". @390 they are sticky top 100, padding 40 8 12, Mono 14/19.6.
  - Data rows (43): grid as the header. First row of a group has no border; others have border-top 2px `sand-chip` #ECE5DD. Cells padding 20, Inter 16/25.6 400 (the Business column text is #000).
    - Sub-rows (compute and flight instance sizes) indent the label: padding-left 50, height 89.2. Two-line values: value + Inter 14/19.6 400 #818181 (#666 in the Business column).
    - Booleans are 24px check (or dash) svgs.
    - **Hover:** row bg `row-hover` #EFE8E0 (`.1s ease-in-out`).
    - Some row labels carry a tooltip (`tooltip-container` + `<summary>`; same component as the LogoBar tooltip; ~40–60ch text with an inline link). Those label spans are 20px tall (vs 25.6), which suggests an underline decoration (style **UNMEASURED**).
  - **<728:** each row becomes a full-width label line (border-bottom 2px ink, padding 12 8, Inter 14/19.6) followed by 3 value cells of 114 (padding 12 6 12 8, Inter 14/19.6). Labels switch to short mobile text. A **sticky bottom CTA bar** (bg cream, border-top 2px, padding 14 24, opacity 0, `opacity .2s ease-in-out`) appears while the table is in view.
- **`InstancesSection`** (`#instance-types`, `#large-instance-types`):
  - Section bg `sky-hover`, border-y 2px, padding 0 0 174, margin-top 40. `TagTitle` "SERVERLESS INSTANCES" (Mono 32/44.8, padding 8 32) at the top. P Inter 20/32 300 centred max 910, margin 32 auto 160, with an inline link → `/product/hypertenancy`.
  - Grid 3 × 392.7, gap 32 (1 col gap 160 @≤959 because of the overhanging images).
  - Card: white, 2px ink, padding 104 24 32, flex-col gap 28. Illustration `Placeholder` 388.7×180 overhangs the top (absolute, top -96).
    - Head (border-bottom 2px, padding-bottom 28, gap 14, centred): name plate (ink bg, white Mono 24/28.8, padding 6 14) "PULSE"/"STANDARD"/"JUMBO"/"MEGA"/"GIGA" + P Inter 16/25.6 300 centred, 2 lines (13/18.2 @1280).
    - "Commonly used when..." Inter 16/25.6 300 ls .32 #818181 centred. `ul` gap 16, li margin-left 20, Inter 16/25.6 300, 3 items.
    - Footer: border-top 2px rgba(56,56,56,.15), padding-top 28. "Included Plans:" #818181 centred, then a chip row (gap 4, wrap, centred). Included plan chip: bg `sun`, padding 8, 16px check + Mono 12/16.8 UPPER. Excluded: bg `hairline` #D7D7D7, opacity .5, no icon.
  - Mid-heading between the grids: P Mono 40/48 UPPER centred, 2 lines, max 520 (32/38.4 @768), margin 116 auto 156, flanked by decorative svgs. Second grid: 2 × 394, gap 32 (Mega, Giga).
- **`MarketplaceLogos`**: grid-texture section, padding 140 30 220. H2 Mono 18/25.2 on a cream plate (padding 8), lowercase-mixed `[44ch/6w]`, 2 lines. Box: cream, padding 12, max 942, flex wrap gap 32 52, centred, 10 logo `Placeholder`s (h 21–34).
- **`PricingValueRows`** (`#built-for-humans`, `#support-with-heart`, `#gold-standard`): 3 rows, the same structure as `PersonaSplitRows` (side panels `coral-red` L, `sun` R, `teal` L; illustration with `bob` 3s; text column 551 or 520 wide, padding 120 0 or 120 40). Each has H2 Mono 32/44.8 (1–2 lines) + P Inter 20/32 300 (6–8 lines) + `TextLink` "LEARN MORE" → `/about-us`, `/customer-support`, `/trust-and-security#Compliance`. **Reuse `PersonaSplitRows`** with a `variant="compact"` (no sub-items; H2 32/44.8; no marquee).
- **`FAQ`** full, 16 items.
- **`FinalCTA`**: padding 120 0, flex-col gap 40, centred. Logo mark `Placeholder` 100×73. H3 Mono 32/44.8 1 line + P Inter 20/28 300 ls .4, 2 lines (gap 12). `lg primary` "TRY 7 DAYS FREE" + trailing arrow (auth, non-link).
- **`DuckDBSupportPanel`** (duckdb-support page only): padding 100 0 60, flex-col gap 32, centred. `PricingTabs` (Support active), then the tab panel max 720, gap 20, centred: icon svg 86×88 → `Placeholder`; H1 `h1-mono` 1 line "YOUR PLACE OR MINE?" (short UI-like heading; keep it, or use a neutral heading of 19 chars); P `lede-hero` 3 lines; `lg primary` "CONTACT US" with a leading arrow → `/contact-us/product-expert` (margin-top 12). Two decorative svgs (76×76, 92×92) at the page edges.

### B21. Startups blocks
- **`LeftHero`** (startups, research, trust, community share this skeleton):
  - Container flex row, space-between. Left column flex-col gap 20 (32 trust) with H1 `h1-mono-xl` + tagline `hero-tagline-mono` (research 24/30 max 540; trust max 700; community max 611; startups max 880). Right illustration `Placeholder` absolute (startups 440×368; research 500×324; trust 368×324; community 604×353). Small decorative svgs → omit.
  - Paddings: startups 102 30 132 (40 20 110 @≤1301, 32 24 254 @390); research section 100 0 148 (40 0 210 @768, 32 0 240 @390); trust 100 30 170 (70 20 170 @1280, 40 20 218 @768, 40 24 215 @390); community 102 30 164.
  - Startups adds `lg primary` button "APPLY NOW" (margin-top 12). It is a `<button>` that smooth-scrolls to the apply form.
- **`InvestorLogos`**: padding 110 0 (96 0 @1280, 80 @768, 64 @390). H2 Mono 24/33.6 centred (20/28 @1280, 18/25.2 @768, 16/22.4 @390). Row wrap gap 42 76, centred: 6 logo `Placeholder`s at height 42.
- **`ProgramBenefits`**: bg `sun`, border-y 2px, padding 92 0 120 (64 0 100 @≤1301, 52 0 64 @390). Container padding 0 40, flex-col gap 52 (32), items flex-start. `TagTitle` Mono 40/48 padding 12 32 (24/33.6 @1280, 18/25.2 @390). Grid 2 × 595, gap 32 (354 @1280; 312 gap 24 @768; 1 col @390). Card: white, 2px ink, padding 32 32 40, flex-col gap 16. Icon `Placeholder` 120×120, H3 `card-h3-mono-tall`, P Inter 16/25.6 300 ls .32 (6–7 lines, inline links → `/product/mcp-server`, `/product/dives`, `/product/hypertenancy`, `/ecosystem`). Decorative svgs.
- **`LogoMarquee`**: padding 110 0. H2 Mono 24/33.6 centred. Track 4500 wide: 18 items (9 logos × 2), each 180 wide, margin-right 70, height 42. The track moves by JS-stepped translateX with `transition: transform 3s linear` (observed at -561 @1440; it did not advance during a 6 s idle probe, so the stepping cadence is **UNMEASURED**). Logos link externally → non-links.
- **`PersonaSplitSticky`**:
  - Border-top 2px, padding 180 0 (150 @1280, 120 @768, 80 @390). Grid [440 | 690], gap 112 ([380 | 500] gap 40 @1280; [300 | 348] @768; 1 col @390).
  - Left: sticky (top 335) 440×340 image stack. 2 `Placeholder`s crossfade (opacity, `all .2s ease-in-out`) when the 2nd text item scrolls into position (switch measured between 0 and 300px of section scroll).
  - Right: padding 20 0 25, flex-col gap 140. Each item: eyebrow Mono 18/25.2 UPPER ("FOR DATA TEAMS", "FOR APP DEVS"), H2 `persona-h2` padding 8 0 20, P Inter 20/32 300, 5–7 lines. Then `TextLink` "LEARN MORE" → `/product/data-teams`, `/product/app-developers`.
- **`ApplyForm`**:
  - Bg `garden`, border-y 2px. Container padding 100 220 (100 20 @≤1301; 72 24 100 @390).
  - Card: white, 2px ink, `hard-16`, padding 64 80 (72 40 @≤1301). `TagTitle` "APPLY NOW!" absolute at top -30 (Mono 32/44.8). Intro P Inter 20/28 300 ls .4, 4 lines.
  - Eligibility box: bg `surface-2`, padding 20, margin-top 20, flex row. Label Inter 16/25.6 400 "Eligibility criteria:" + `ul` of 4 li Inter 16/25.6 300.
  - Form: margin-top 40, flex-col gap 40.
    - 2-col rows (gap 16) of `FieldInput`: First Name / Last Name; Role / Work e-mail. A helper line under the email: Inter 12/19.2 300 ls .24, right-aligned, margin-top 4.
    - Company website input (full width, margin-top -20).
    - Question label Mono 18/28.8 300 ls .36 UPPER (margin-bottom 20) + input.
    - "DO YOU HAVE A COUPON CODE?" + `TextLink` sm button "ADD COUPON" with a 16px plus icon. Click reveals 1 coupon input.
    - Two question labels + textareas (114 tall).
    - Note Inter 12/16.8 300 #818181. `lg primary` "SUBMIT".
  - Submitting empty: the fields show validation (border colours per `FieldInput`; message text **UNMEASURED**).
  - The form posts to an external service: do **not** submit; prevent default.

### B22. Research / Trust / Community blocks
- **`FilterChips`** (research `<a>`, trust `<button>`):
  - Research: container; H2 "PUBLICATIONS" Mono 32/38.4 padding-bottom 52. Row in a cream box: flex wrap, gap 12, overflow scroll; wrapper padding-bottom 64.
  - Chip: Inter 14/16.8 UPPER, padding 15.5 20, r2, height 47.8, bg `sand-chip`. Hover: bg `sand-dark` + `::after` (full width, 2px tall, bottom) rgba(56,56,56,.314). Active: bg ink, text cream, `::after` ink. Transition `background, color .1s ease-in-out`.
  - Research: 17 chips ("ALL" + 16 topics) linking to `/research?category=<name>`. Filtering client-side is acceptable; the original reloads with a query param.
  - Trust: 4 tabs: "COMPLIANCE", "SECURITY", "PRIVACY", "AVAILABILITY".
- **`PaperList`** (research):
  - Section bg cream, padding 0 0 200 (160 @1280, 120 @768/390). Grid 1 col, gap 32 (40 @≤1301, 24 @390).
  - Card: `LiftCard lift={14}`, 2px ink, grid [392 | 846] ([332 | 584] @1280; [332 | 352] @768; 1 col @390). An invisible full-card `<a>` overlay links to `/research/<slug>`, which is **not in routes.js** (render as non-link).
  - Image `Placeholder` 392×350 cover. Content: white, padding 32. Tag row (gap 10 wrap, padding-bottom 20): tags Mono 12/16.8 UPPER, bg `chip-gray`, padding 8 12. H3 Mono 20/25 UPPER (18/22.5 @768), 1–2 lines. P Inter 16/25.6 300, padding 8 0 32, 4–5 lines. `TextLink` "LEARN MORE" with margin-top auto.
  - 6 cards.
- **`TrustArticle`**:
  - Container padding 0 455 0 30 (text max 817), margin-bottom 136, flex-col gap 64 (52 ≤1301). Head gap 24: H2 `h2-mono` + P Inter 16/25.6 300, 4 lines.
  - Items flex-col gap 32: grid [74 | 711], gap 32 ([65 | 831] gap 24 @1280; 1 col gap 12 @390), margin-bottom 20. Icon `Placeholder` 74×74. Text column padding-top 20, gap 16: H3 `card-h3-mono-tall` (18/25.2 @1280) + an optional 20px external-link glyph; body Inter 16/25.6 300, 5–9 lines, inline links (mailto and external → non-links; `/product/pricing` and `/contact-us/product-expert` are internal).
  - Tabs swap the article: Compliance 2 items, Security 5, Privacy and Availability UNMEASURED counts. The URL hash becomes `#Security` etc. and the page scrolls so the tabs sit near the top (scrollY 258 @1440). Default `#Compliance`, and the pricing page links to `/trust-and-security#Compliance`.
  - Decorative svgs.
- **`RepoGrid`** (community):
  - Bg `sky-hover`, border-y 2px. `TagTitle` at top -33, left 102 (Mono 32/44.8, padding 12 20; 24/33.6 @768; 18/25.2 @390). Container padding 100 30.
  - Grid 2 × 609, gap 24 (448 @1280; 332 @768; 1 col @390).
  - Card: white, 2px ink, padding 32, flex-col. Logo `Placeholder` 120×120. Tags (padding 20 0, gap 4): Mono 12/16.8 300 ls .24 UPPER, padding 8 12, bg `tag-blue` / `tag-violet`. H3 Mono 24/28.8: "org/" at 400 + repo name `<strong>` at 700. Note `AeonikMono-Bold` is loaded for this; Fragment Mono has no bold, so use synthetic bold or `font-jet` 700 (designer's call). P Inter 16/25.6 300, 1 line.
  - Stars row (margin 32 0, gap 12): 32px icon + count Inter 20/20 300 + 24px star. Resource buttons 46×46, bg rgba(255,113,105,.08), padding 12, 22px icons, gap 8 (2–3 per card).
  - 4 cards. **All links are external** (GitHub, duckdb.org, YouTube, docs) → non-links. No hover measured.
- **`SocialCarousel`** (community):
  - Border-bottom 2px. Container padding 120 30 (88 20 @768), gap 32. H2 Mono 32/44.8 (24/33.6 @768, 18/25.2 @390).
  - Track of 19 cards, 392.7×326 (403×304 @768; 342×304 @390), margin-right 32. Card: white, 2px ink, padding 40. Header row: avatar `Placeholder` 46 r50% + name Inter 16/22.4 700 ls .32 + handle Inter 14/19 #666 + 24px platform icon on the right. Body Inter 16/22 400 ls .32, 4–6 lines.
  - **Autoplay:** advanced about every 4–5 s by one card (424.7px) with a `transform` transition (duration UNMEASURED). All links external → non-links.

---

## 4. Per-route block lists

Notation: `Block(props)`. Counts and bg are given; other props come from §3 defaults.

### T1 vs (all six)
1. `VsHero` (h1 2 lines; buttons md primary + md secondary)
2. `MarqueeBand` (bg `yellow`, label "WHY MOTHERDUCK", 9 copies, size vs)
3. `ComparisonTable` (rows: snowflake 8, clickhouse 8, databricks 8, redshift 8, bigquery 10, postgresql 10)
4. `LogoBar` (6 logos, 5 linked)
5. `BenchmarkPanel` (2 cards; bullets 3+2 snowflake, 3+3 others): **omit on clickhouse**
6. `QuoteCarousel` (3 slides, `TagTitle` on, arrows + dots)
7. `StickyStack` (bg `sun`, 5 cards, all with `TextLink`, intro max 820)
8. `CompareCards` (`MarqueeBand` bg `aqua` "MORE COMPARISONS", then 5 cards excluding self)
9. `FAQ` full (snowflake 8, bigquery 8, clickhouse 7, databricks 7, postgresql 7, redshift 9; border-top 2px)
10. `CTABand` vs variant (md primary "GET STARTED" + md secondary "GET A DEMO")

### T2 product feature
- **/product/dives**: `ProductHeroCentered` (chip "DIVES") · `VideoFrame` · `MediaFrame` (head max 558) · `StickyStack` (sun, 5, links) · `LiveEmbed` · `GalleryTeaser` (3 items + lg secondary) · `FAQ` contained-dives (8) · `CTABand` product.
- **/product/ducklake**: `DuckLakeHero` (+ `CodePanel` 6 lines) · `IcebergVsDuckLake` · `NewsletterSignup` · `StickyStack` (yellow, 4, links, intro max 720) · `CodeSample` (9 lines) · `ResourceCarousel` (8 cards) · `CTABand` product.
- **/product/flights**: `ProductHeroCentered` (chip "FLIGHTS · Public Preview", bubbles) · `MediaFrame` (head max 853) · `StickyStack` (sun, 4, links) · `QuoteSpotlight` (tag "CUSTOMERS ARE QUACKING", no link) · `CookbookGrid` (6) · `FAQ` contained (5) · `CTABand` product.
- **/product/guides**: `ProductHeroCentered` (chip "GUIDES", floats) · `BrowserWindowDemo` · `StickyStack` (yellow, 3, no links, intro max 800, body 400) · `FAQ` contained (4) · `CTABand` product.
- **/product/mcp-server**: `ProductHeroCentered` (chip "MOTHERDUCK MCP SERVER") · `ProblemCards` (3) · `StickyStack` (sun, 4, no links) · `QuoteSpotlight` (with link) · `CTABand` product.
- **/product/postgres-integration**: `SplitHero` (see below) · `ProblemCards` (3) · `StickyStack` (sun, 4, no links) · `QuoteSpotlight` (with link, padding-top 172) · `CTABand` product (h2 3 lines).
  - `SplitHero`: container padding 72 30 119 (32 20 496 @≤1301, 24 24 332 @390). Left max 600, gap 20. `Chip` (Mono 12/16.8 300 ls .24) + H1 `h1-mono` 3 lines + P Inter 20/32 300 ls .4 (18/28.8 ≤1301) + buttons `md` gap 32 margin-top 12 (primary auth; secondary "PG_DUCKDB ON GITHUB" with GitHub icon, external, non-link). Illustration `Placeholder` 800×471 absolute right (x 731, top 22) → below the text at ≤1301 (740×435, 728×428, 390×230 full-bleed).

### T3 persona
- **/product/app-developers**: `PersonaHero` (video) · `PersonaSplitRows` (marquee + 3 rows; sub-items 2/2/2) · `FeatureGrid` (6) · `ArchitecturePanel` (coral tab, tall 1645 panel) · `YellowCTA` · `EcosystemDiagram` · `CaseStudyCarousel` (4).
- **/product/data-teams**: same as app-dev; split sub-items 8 total; ArchitecturePanel standard (721 panel); `CaseStudyCarousel` (14).
- **/product/duckdb-users**: `PersonaHero` (chip + illustration 540×440) · `PersonaSplitRows` (8 sub-items) · `FeatureGrid` · `ArchitecturePanel` · `EcosystemDiagram` · `CaseStudyCarousel` (13) · `FAQ` full (13) · `ContactForm`.

### T3b /product
`PersonaHero` (video; inline links) · `MarqueeBand` ("USE CASES", sun, static) + `UseCaseSplit` · `OldWorldNewWorld` · `AgentCardCarousel` (4) + `ArchitecturePanel` (sun bg, ink tab) · `FeatureGrid` (6) · `EcosystemDiagram` · `CaseStudyCarousel` (13) · `FAQ` full (7) · `ContactForm`.

### T4 pricing
- **/product/pricing**: `PricingHero` · `TierCards` (+ `AnnualPlanStrip`) · `QuoteCarousel` (2) · `PlanMatrix` (4 groups / 43 rows) · `InstancesSection` (3 + 2) + `MarketplaceLogos` · `PricingValueRows` (3) · `FAQ` full (16) · `FinalCTA`.
- **/product/pricing/duckdb-support**: `DuckDBSupportPanel` only (the page is 1839 tall @1440 including the footer).

### T5 bespoke
- **/product/hypertenancy**: `DarkHero` (+ code tabs) · `QuoteCarousel` (1, cream, padding 120, flanked by two 800×461 decorative images → omit) · `AlternatingFeatureRows` (5) · `FAQ` contained-hypertenancy (6) · `CTABand` product (bg cream).
- **/startups**: `LeftHero` (+ APPLY NOW) · `QuoteSpotlight` (border-y, tag straddling) · `InvestorLogos` (6) · `ProgramBenefits` (4) · `LogoMarquee` (9×2) · `PersonaSplitSticky` (2) · `ApplyForm` · `FAQ` full (5).
- **/research**: `LeftHero` · `FilterChips` (17, links) · `PaperList` (6).
- **/trust-and-security**: `LeftHero` · `FilterChips` (4 tabs) · `TrustArticle`.
- **/community-and-open-source**: `LeftHero` · `RepoGrid` (4) · `SocialCarousel` (19).

---

## 5. Interactions summary (states and timings)

| Interaction | Where | Behaviour |
|---|---|---|
| Offset button hover/press | all buttons | Reuse `OffsetButton`: lift 7px 120ms; `:active` bg sky-hover (primary) / sand-dark (secondary). Tier "white" press colour UNMEASURED. |
| Card lift | CompareCard, FeatureCard, PaperCard, ResourceCard (14); CookbookCard (10) | Hover only (≥960 per `LiftCard` default). No press return observed on 14-lift cards. |
| Text link | everywhere | Underline 1px ink → 2px #6FC2FF on hover, instant. |
| Pricing tabs | pricing pages | Route links; yellow pill indicator slides `left .2s ease-out`; inactive text #818181 → ink on hover. |
| Code tabs | hypertenancy | Cream pill indicator `left .2s ease-out`; active text ink, inactive white; panel swaps instantly. |
| Chip filters / tabs | research, trust | Default sand-chip; hover sand-dark + 2px translucent bar; active ink/cream + ink bar; `.1s`. Trust updates the hash and scrolls. |
| FAQ | 9 pages | Independent toggles (multi-open), chevron 180° `.2s`, body max-height `.25s ease-in-out`, none open initially. |
| Region dropdown | pricing | Click toggles a white menu (2px ink, 7 options, z3), chevron rotates `.2s`. Close-on-outside-click behaviour UNMEASURED. |
| Matrix row hover | pricing | bg #EFE8E0 `.1s`. |
| Tooltips | LogoBar, PlanMatrix labels | Reuse the hero LogoStrip `<summary>` tooltip (ink, nub). Show on hover ≥960. |
| QuoteCarousel | vs, pricing | Arrows (lift 7), dots (16/8), crossfade 0.4s, autoplay (~8 s, UNMEASURED exactly). |
| AgentCardCarousel | /product | Autoplay ~4.5 s, inactive opacity .4. |
| SocialCarousel | community | Autoplay ~4–5 s, step 424.7px. |
| CaseStudyCarousel | T3, /product | Manual up/down arrows; vertical 380px steps; no autoplay. |
| ResourceCarousel | ducklake | Manual arrows; cards reveal-up on entering view. |
| StickyStack | T1, T2 | CSS scroll-timeline (§3 B7); none <728. |
| Marquee | vs, persona | Scroll-linked 0.32× translateX. |
| Floating/bob/bubbles | guides, persona, pricing value rows, flights | Infinite decorative loops; pause on reduced motion. |
| Forms | ContactForm, ApplyForm, Newsletter | Floating labels, focus border #2BA5FF, valid border garden-dark@80%; no network submit. reCAPTCHA omitted. |
| Code copy | ducklake | Click copy icon → header text "Code copied!" (restore timing UNMEASURED). |
| Hero "LEARN MORE" | persona heroes | Smooth-scroll to the next section. |
| Startups "APPLY NOW" | startups | Smooth-scroll to `ApplyForm`. |

There are no scroll-reveal entrance animations on these pages **except** the ducklake `ResourceCarousel` cards (`reveal-up`) and the scroll-timeline blocks listed above.

---

## 6. Links

Rules: internal paths become router links when the target is in `src/routes.js`. `/docs/*` and every external domain render as **non-links** (same element, no `href`, keep the visual). The auth sign-up URLs (`auth.motherduck.com/authorize…`) are external: render those buttons as non-links.

| Route | Internal destinations (in routes.js) | Internal but **NOT in routes.js** (decide: add the route or render as non-link) | /docs links | External domains |
|---|---|---|---|---|
| vs (each) | `/contact-us/product-expert`, `/case-studies/<slug>` (6–10 slugs), `/product/hypertenancy`, `/product/pricing`, `/product/dives`, the other five `/vs/*` | `/vs` (back link), `/better-data-warehouse-trial` (CTA), `/learn/data-warehouse-tco` (bigquery FAQ), `/learn/top-snowflake-alternatives-2026` (snowflake FAQ) | 2 (StickyStack links) | benchmark.clickhouse.com (all but clickhouse), auth |
| /product | `/product/data-teams`, `/product/app-developers`, `/product/mcp-server`, `/product`, `/product/dives`, `/product/flights`, `/product/hypertenancy`, `/ecosystem` (+`?category=`), `/case-studies/*` ×9, `/blog/dosomething-motherduck-data-warehouse-ROI` | none | 7 | getdashfuel.com, atm.com, github.com, auth |
| /product/app-developers | `/product/hypertenancy`, `/product/dives`, `/product/mcp-server`, `/product`, `/product/flights`, `/product/pricing`, `/ecosystem`, `/case-studies/*` ×3, `/blog/*` ×2 | `#architecture` (in-page anchor) | 1 | auth |
| /product/data-teams | as app-dev + `/blog/*` ×3, `/case-studies/*` ×7 | none | 1 | getdashfuel.com, thena.ai, atm.com, finqore.com, auth |
| /product/duckdb-users | `/product*`, `/ecosystem`, `/case-studies/*` ×9, `/blog/*` ×1 | none | 1 | getdashfuel.com, atm.com, auth |
| /product/dives | `/dive-gallery`, `/product/mcp-server`, `/blog/replacing-our-bi-tool-with-dives` | `/dive-gallery/dives/<slug>` ×3, `/learn/skip-the-cache-embedded-analytics` (`/learn` hub exists, detail does not) | 4 | auth, mux (video), embed-motherduck.com (iframe) |
| /product/ducklake | `/blog`, `/blog/<slug>` ×8 | none | 2 | auth |
| /product/flights | `/product/pricing` | none | 10 (6 cookbook cards + hero + FAQ) | auth |
| /product/guides | `/blog/context-belongs-in-the-warehouse` | none | 1 | auth |
| /product/hypertenancy | `/case-studies/pricemedic-…`, `/blog/faster-ducks` | `/learn/skip-the-cache-embedded-analytics` | 5 | auth |
| /product/mcp-server | `/case-studies/zero-health-ai-powered-analytics` | none | 1 | auth |
| /product/postgres-integration | `/case-studies/finqore` | none | 0 | github.com, auth |
| /product/pricing | `/product/pricing`, `/product/pricing/duckdb-support`, `/contact-us/product-expert`, `/product/mcp-server`, `/product/flights`, `/product/ducklake`, `/product/dives`, `/product/hypertenancy`, `/ecosystem`, `/about-us`, `/customer-support`, `/trust-and-security`, `/support-policy`, `/blog/introducing-instant-sql` | `/terms-of-service` (routes has `/terms-of-use`), `/contact-us/support`, `#info-table`, `#instance-types` (anchors) | 18 | motherduck.canny.io, auth |
| /product/pricing/duckdb-support | `/product/pricing`, `/product/pricing/duckdb-support`, `/contact-us/product-expert` | none | 0 | none |
| /research | `/research` (?category=) | `/research/<slug>` ×6 | 0 | none |
| /startups | `/product/mcp-server`, `/product/dives`, `/product/hypertenancy`, `/ecosystem`, `/product/data-teams`, `/product/app-developers` | none | 0 | 9 portfolio-company domains (logo marquee), mailto:startups@ |
| /trust-and-security | `/product/pricing`, `/contact-us/product-expert` | none | 0 | mailto ×2, motherduck.gdprlocal.com |
| /community-and-open-source | `/blog` | none | 2 | github.com, duckdb.org, youtube.com, docs.getdbt.com, linkedin.com, x.com, twitter.com (all repo and social cards) |

Header and footer links are covered by the existing components.

---

## 7. Assets (inventory only; everything renders as `Placeholder`)

- **Fonts loaded:** AeonikMono-Regular, AeonikFono-Regular, **AeonikMono-Bold** (/product, community strong), Inter 300/400/600/700, InterVariable (dives), **MuseoModerno 900** (hypertenancy, next/font subset). Substitutes: Fragment Mono / Space Grotesk / Inter as in §0. Load **MuseoModerno 900** from Google Fonts for hypertenancy.
- **Video/embeds (omit, placeholder):**
  - /product and personas: `ecosystem-bg-video-desktop.webm` and `-mobile.webm` (autoplay loop, 1380×660 frame).
  - /product/dives: `mux-player` HLS 16:9 (796×448) and an `embed-motherduck.com/sandbox` iframe (896×600).
  - /product and duckdb-users: reCAPTCHA iframe (forms).
- **Images by role (size @1440 / aspect):**
  - hero illustrations: vs 365×358; postgres 800×471 (831:489); research 500×324; trust 368×324; community 604×353; startups 440×368; duckdb-users 540×440; hypertenancy backdrop 2250×1505 + media 1028×573 (2698:1504).
  - persona video thumb 600×337.5 (16:9).
  - stack images 580×488 (709:597; one 1098:923).
  - media frames 1028×544 (3720:2073 / 3084:1719).
  - benchmark chart 1047:253.
  - logos: LogoBar 6 at h28; investors 6 at h42; marquee 9 at h42; marketplace 10 at h21–34; cookbook 6 (max-w 200); ecosystem ~35 at h36.
  - icons and illustrations: 120×120 (problem cards, program benefits, repo logos), 140×140 (feature cards), 90×90 (persona sub-items), 74×74 (trust), 108×108 (mascot), 100/110 (tier mascots).
  - papers 392×350 (882:787); resources 388.7×218.6 (500:270); dive gallery 324×182 (1425:801); guides window 1186×470 (2379:947) + overlay 200×161; Iceberg/DuckLake panels 612.5×676 (1014:1352); ducklake mascot 410×468 (764:872).
  - hypertenancy feature panels 581×558.6 (978:945); hypertenancy tab panels 1024×540 (2120:1138).
  - instance cards 388.7×180 (479:337).
  - avatars 46 (community), 90 (quote spotlight), case photos 500×380.
  - Formats on the original: mostly Next-optimised (webp/avif via `/_next/image`), a few png/avif.
- **Textures:** CTA/Ecosystem grid pattern → CSS (§3 B10). "noise-bg-light-gradient" overlay and "misc-bg-clouds" → omit.

---

## 8. Known gaps / UNMEASURED

- Exact autoplay intervals: QuoteCarousel (switch observed between 6 and 8 s), AgentCardCarousel (~4.5 s), SocialCarousel (~4–5 s). Track transition durations for these, ResourceCarousel and CaseStudyCarousel.
- Startups LogoMarquee stepping cadence (transition is 3s linear per step; the trigger was not observed).
- Flights hero bubble drift algorithm (JS; drift ~15 px/s plus cursor repulsion).
- Persona hero video click target (no modal or player observed; only reCAPTCHA appeared).
- DiveGallery card hover transform (transition `transform .2s ease` exists; value not captured).
- Field error message styles; floating-label final resting box; checkbox unchecked style; coupon-input reveal animation.
- Region dropdown: per-region price data, outside-click close, keyboard behaviour.
- PlanMatrix tooltip label decoration and tooltip text typography.
- Exact layouts at 960–1301 for FeatureGrid and RepoGrid columns, and <728 layouts of EcosystemDiagram and CaseStudyCarousel. They were not read in detail; build them stacked.
- `/vs/bigquery`, `/vs/databricks`, `/vs/postgresql` and `/vs/redshift` were measured only at 1440. They match snowflake/clickhouse there exactly.
- Scroll-timeline vector animations on `/product` (`OldWorldNewWorld`) and the Ecosystem background video cannot be reproduced without the original assets. Use static placeholders.
- DuckLake hero second-line wordmark (svg) and the lower-half gradient stops beyond `#6FC2FF 0%, #97D4FF 25%`.
