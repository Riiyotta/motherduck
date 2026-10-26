Source: https://motherduck.com/

# Company, contact, legal and gated pages: build spec

Measured live with headless Playwright (Chromium) on 2026-10-23. Every route was loaded at 1440, 1280, 768 and 390 and read with `getComputedStyle` / `getBoundingClientRect`. Hover, press, focus, filled and error states come from scripted interaction (diffing computed styles before and after). Motion was checked three ways: before and after scroll-through, time sampling (1.5 s and 3 s), and scroll sampling every 150 px.

Read this together with `CLONE_SPEC.md` §0 (global tokens, container, fonts) and `src/components/ui/README.md` (primitives). Header and footer are the existing `Header.jsx` / `Footer.jsx`, identical on every route here (footer measured unchanged). All values below are in CSS px at 1440 unless a width is given.

**Content policy.** Copy is not transcribed. Text is recorded as role, character count, words and lines (for example `[52ch/8w] 4 lines`). Short UI labels and form labels are written out. Photos, logos, illustrations and book covers are inventoried by size and aspect only. Use `<Placeholder>` for all of them.

**Shorthand.** `Mono` = Aeonik Mono → `font-mono` (Fragment Mono). `Fono` = Aeonik Fono → `font-fono` (Space Grotesk, +0.01em). `Inter` = `font-sans`. `ink` = #383838. Breakpoint ranges follow the global system: **XL** ≥1302, **LG** 960–1301, **MD** 728–959, **SM** <728. Container math is unchanged at every width (content x/width: 99/1242 @1440, 180/920 @1280, 40/688 @768, 24/342 @390), so every block below sits in `<Container>` unless it says full-bleed.

---

## 1. Route → layout map (7 distinct layouts)

| Layout | Routes | Representative |
|---|---|---|
| **A. About** | `/about-us` | itself |
| **B. Careers** | `/careers` | itself |
| **C. Contact chooser** | `/contact-us` | itself |
| **D. Contact form (split)** | `/contact-us/product-expert` | itself |
| **E. Support hub** | `/customer-support` | itself |
| **F. Legal prose** | `/privacy-policy`, `/terms-of-use` (with TOC); `/support-policy` (variant without TOC, smaller H1, table) | `/privacy-policy` |
| **G. Gated LP template** | `/lp/ai-analytics-eval-field-guide-full`, `/lp/data-ai-survey-full`, `/lp/ducklake-lakehouse-table-format-book-full`, `/lp/guide-to-bi-in-the-agentic-era-full`, `/lp/postgres-analytics-guide-full`, `/duckdb-cheatsheet-full` | `/lp/ai-analytics-eval-field-guide-full` |
| **H. Book brief** | `/duckdb-book-brief` | itself |

The six G routes share the same shell: `LPHero` → N × `LPSection` (body blocks vary) → `GatedFormSection`. Only the body blocks differ, and they come from one library (§4).

Not in scope, but linked from these pages: `/contact-us/support/`, `/duckdb-book-summary-chapter1…11`, `/pdf/DuckDBInAction-final-MEAP-chapter7.pdf`, `/learn-more/*`, `/acceptable-use-policy/` (see §8).

---

## 2. New tokens (add to `tailwind.config.js` → `theme.extend`)

### 2a. Colors
| Token | Value | Used by |
|---|---|---|
| `teal` | `#50C7B7` (rgb 80,199,183) | Careers culture tag, benefits section, values card 1, LP "playbook" section, cheatsheet examples section |
| `teal-bright` | `#53DBC9` | LP tab header and part card (3rd colour), cheatsheet column rule |
| `coral-red` | `#FF7169` | About "GET IN TOUCH" tag, values card 3 |
| `filter-bg` | `#EBE4DD` | Careers filter panel |
| `lp-orange` | `#E87D2F` | LP "after" bars, BI column rules, BI highlight text and dot |
| `bar-gray` | `#A8A29E` | LP "baseline" bars |
| `muted-card` | `#F8F6F3` | BI "what's inside" cards |
| `step-label` | `#888888` | LP step-card "STEP n" label |
| `error` | `#E23F35` | input error border and message |
| `valid` | `rgba(6,132,117,0.804)` (= garden-dark @ 80%) | filled-valid input border |
| `survey-paper` `#FFFAF0`, `survey-ink` `#16120C`, `survey-track` `#ECE3CB`, `survey-teal` `#32C7BD`, `survey-orange` `#E8892F` | | Survey finding cards only |
| `pg-*`: panel `#0E0F0D`, card `#16170F`, card-hi `#15201C`, card-bd `#2A2B24`, head `#141312`, body `#56544C`, rule `#E6E3DB`, quote-rule `#EDEAE1`, eyebrow `#0F9C8A`, num-mute `#C9C4B6`, sub `#6B6B6B`, yellow `#FFDE02`, callout-bg (mint tint, see §4 G12) | | Postgres LP only |
| `code-bg` `#1E1E1E`; tokens: keyword `#569CD6`, string `#CE9178`, comment `#6A9955`, number `#B5CEA8`, text `#D4D4D4`; dots `#FF5F57` `#FEBC2E` `#28C840` | | Cheatsheet code window |

Existing tokens reused: `sun` #FFDE00 (every yellow section), `sky-hover` #6FC2FF (careers testimonials bg, LP "framework" tab, values card 2), `sky` #97D4FF (primary buttons), `sky-dark` #2BA5FF (input hover/focus), `yellow-chip` #FAF175 (LP eyebrow chip), `sand` #ECE6DF (product-expert hero), `surface-2` #F8F8F7, `gray-500/600`, `orange` #FF9538 (book-brief chapter-7 banner), `garden` #16AA98.

### 2b. Shadows
`hard-10: '-10px 10px 0 0 #383838'` (LP cover), `hard-14: '-14px 14px 0 0 #383838'` (LP cover hover), `hard-20: '-20px 20px 0 0 #383838'` (careers benefits card), `hard-r16: '16px 16px 0 0 #383838'` (careers how-we-work photo, note the positive x). Existing `hard-4` and `hard-6` are used by LP cards (LP-H uses `#000` or `#16120C` instead of ink; see the blocks).

### 2c. Radii
Add `pill: '999px'`, `lg: '10px'`, `xl: '12px'`, `2xl: '20px'`. Existing `md` 8, `tile` 14 and `bubble` 16 are reused.

### 2d. Type roles (new; existing roles are reused where noted)
Format: family size/line-height weight letter-spacing, then per-range overrides. All Mono/Fono display roles are UPPERCASE.

| Token | XL | LG | MD | SM | Where |
|---|---|---|---|---|---|
| `page-h1` | Mono 80/96 400 (About: ls 1.6px; others ls normal) | same | 56/67.2 (About ls 1.12) | About/Privacy/Terms 30/42 (ls .6 About); Careers 32/44.8 | About, Careers, Privacy, Terms |
| `page-h1-sm` | Mono 56/67.2 | contact 56/67.2; support & product-expert & book-brief 48 (lh 67.2 support, 57.6 others) | 48 (contact 48/67.2; support-policy 40/56) | 24/33.6 (support-policy 32/44.8) | Contact, Product expert, Support, Support policy, Book brief |
| `page-sub` | Mono 32/44.8 ls .64 | same | 24/33.6 ls .48 | 18/25.2 ls .36 | About "get to know us" |
| `page-h2` | Mono 32/44.8 ls normal | same | 24/33.6 | 24/33.6 | About, Support, Book brief (book brief keeps 32 at MD, 18/25.2 at SM) |
| `careers-h2` | Mono 40/48 | same | 32/44.8 | 24/33.6 | Careers section titles |
| `lede` (existing) | Inter 20/32 300 ls .4 | | 16/25.6 ls .32 | same | Careers hero, contact sub (ls .2/.16) |
| `feature-h3` | Inter 32/38.4 600 ls .64 | same | 24/28.8 ls .48 | 32/38.4 | Careers how-we-work |
| `lp-h1` | Fono 52/59.8 | 44/50.6 | 32/36.8 | 32/36.8 | LP hero |
| `lp-sub` | Fono 22/26.4 | same | 18/25.2 | 18/25.2 | LP hero h2 |
| `lp-h2` | Mono 40/52 | same | 32/41.6 | 24/31.2 | LP section titles |
| `lp-form-h2` | Mono 36/43.2, centred | | | | LP gated form title |
| `lp-eyebrow` | Mono 12/12 ls .6 | | | | LP hero chip |
| `lp-tab` | Mono 11/18.7 600 ls 1.1 | | | | LP card header bars, step labels |
| `lp-card-h3` | Mono 18/23.4 | | | | LP cards (17/22.1 for step cards, 19/24.7 for survey findings) |
| `lp-card-h3-lg` | Mono 32/41.6 | | | | LP dark feature grid, part cards, checklist card, author names |
| `lp-stat` | Mono 28/36.4 | | | | LP stat row |
| `lp-body` | Inter 15/25.5 300 ls .3 `#666` | | | | LP card body (14/22.4 ls .28 in step cards) |
| `faq-q` | Mono 23/32.2 | | | | FAQ question |
| `faq-a` | Inter 18/28.8 300 ls .36 | | | | FAQ answer |
| `legal-lead` | Inter 20/32 300 | same | 15/24 300 ls .3 | 15/24 | Legal intro paragraph |
| `legal-body` | Inter 16/25.6 300 (ls .32 in `<p>`, normal in lists) | | | | Legal body |
| `toc-title` | Mono 18/25.2 ls .36 | | | | Legal TOC |
| `toc-link` | Inter 16/25.6 300, active 600 | 14/19.6 | 14/19.6 | 14/19.6 | Legal TOC |
| `ticker` | Mono 18/18 (About band, careers dark band) or 24/24 (careers yellow band) | | | About 14/14, careers yellow 16/16 | Ticker bands |

---

## 3. Shared primitives (new, reused across layouts)

### P1. `UnderlineLink` (text link with arrow); not yet a shared primitive, but `Integrations.jsx` has the inline pattern
- Outer `a` or `button`: `display:flex; align-items:center; gap:6px; border:1px solid transparent; border-radius:2px`. Font Mono 16/19.2 ls .32 (the label span overrides it).
- Label span: Inter 16/19.2 400 ls .32, ink, `padding:1px 0; margin-bottom:1px; border-bottom:1px solid ink`. UPPERCASE labels are typed in caps; support cards apply `text-transform:uppercase`.
- Trailing icon 20×20 (arrow right, arrow down for "LEARN MORE", external-link icon for Slack). "LEARN MORE" arrow carries `transition: transform .2s ease-in-out`.
- **Hover:** label `border-bottom: calc(0.09em + 1px) solid #6FC2FF` (renders 2px) and `margin-bottom:0`, so the height does not change.
- **Press (`:active`):** text, underline and icon fill all turn `#6FC2FF`.
- Disabled: transparent border and background.
- Variant `tone="muted"` (careers "CLEAR ALL"): Inter 14/16.8 ls .28, `#666`, `flex-direction: row-reverse`, 18px reset icon before the label.

### P2. `OffsetButton` (EXISTING `src/components/ui/OffsetButton.jsx`)
Used for every primary CTA and submit here (careers "SEE OPEN POSITIONS", LP "GET THE GUIDE", form SUBMIT). Measured: 56.2 tall, padding 16.5/22, Inter 16/19.2 UPPER label (note this is **16px**, while the homepage `text-button` is 14px, so add a `size="lg"` prop or className override), border 2px ink, bg sky. Hover lifts 7px (120 ms), press goes back to 0 in 30 ms with bg `#6FC2FF`. **New disabled state** (gated forms until valid): text `#666`, bg `#F8F8F7`, border `#818181`, no lift on hover, cursor still pointer. Book-brief submit is 57.7 tall (padding 17.25/23).

### P3. `FloatingInput` / `FloatingTextarea` (all forms)
- Wrapper `position:relative`. `<label>` is visually hidden (1×1 sr-only).
- Input: full width, **58 tall**, padding `16px 40px 16px 24px`, border 2px ink, radius 2, bg `rgba(248,248,247,0.7)`, Inter 16/25.6 400 ls .32 ink, `outline:none`. Transition: all 0.2 s ease-in-out (padding 0 s).
- Placeholder element (a `<p>`, not native placeholder): absolute, left 24, vertically centred (`top:50%; translateY(-50%)`, i.e. y 19 inside the 58 box), Inter 16/22.4 **300** `#666`, padding-right 40, one line, ellipsis. Transition `all .15s ease-out`.
- **Hover:** border `#2BA5FF`.
- **Focus:** border `#2BA5FF`, padding-right 24.
  - Variant `float` (product-expert, book-brief): the placeholder moves above the field: `top:-5px; left:0; translateY(-100%)`, Inter 12/16.8 400 ink (it ends up 22px above the input top, x 0). It stays floated while the field is filled.
  - Variant `hide` (all LP forms): the placeholder is `display:none` while `:focus-within` or filled.
- **Filled and valid, after blur:** border `rgba(6,132,117,0.804)`.
- **Error** (on submit): border `#E23F35`. Message below the field: `↳ Email seems invalid`, Inter 12/19.2 300 `#E23F35`, full width, directly under the input (0 gap). Only email validity was observed producing an error. The LP hero email input is `type=email` and showed native browser validation (no custom message).
- Textarea: 114 tall (min), same padding, placeholder at y 18 (Inter 16/25.6), native resize handle visible, `overflow:auto`.

### P4. `Checkbox`
Row `display:flex; align-items:center`. A hidden native input (opacity 0, absolute, covers the whole row, cursor pointer). Visible box 18×18, border 2px ink, radius 2, centred 10×7 check SVG. Label Inter 16/25.6 400 ink (book brief: 14/22.4), padding-left 11. Rows stack with gap 10.
- Checked, variant `outline` (LP): box transparent, check ink. Variant `solid` (book brief): box bg ink, check white.
- Unchecked: check opacity 0.
- Hover/focus: box border `#2BA5FF`.
- Default state on load: **checked**.

### P5. `TiltedTag` (rotated label sticker)
Mono heading in a box: border 2px ink, padding 8/30, `transform: rotate(θ)`, sits on the section's top border with `z-index:1`.
- About "GET IN TOUCH": bg coral-red, rotate ≈ −10.8° (matrix 0.98232,−0.18721), translateY −12, 308.9×120.2 (3 lines of text box).
- Careers "OUR CULTURE": bg teal, rotate ≈ +2.9°, 285×79, centred horizontally, overlaps the yellow band by about 38px.
- Careers "BENEFITS": bg sun, 225×64.8, padding 8/32, Inter 32/44.8 ls .64 UPPER (not Mono), not rotated, absolute at the card top-left (+73, −29).

### P6. `TickerBand` (static rotated marquee strip)
Full-bleed band, `display:flex; justify-content:center; overflow:hidden`, repeated label spans (`padding:16px 0; margin:0 47px` About / `0 40px` careers yellow / `0 52px 0 40px` careers dark).
- **Not animated.** Both time and scroll probes showed zero movement.
- About hero band: bg sun, border-top and bottom 2px ink, height 174 box, rotated about −4.6° (derived from span positions), behind the illustration (`z-index:-1`), spans Mono 18/18.
- Careers "HOW WE WORK": bg sun, borders 2px, rotate ≈ −2.6° (matrix 0.998971,−0.045363), `position:sticky; top:275px` inside the section, spans Mono 24/24 (16/16 at SM). A visually hidden h2 carries the section title.
- Careers "JOIN THE FLOCK": bg ink, 65 tall, not rotated, spans Mono 18/18 `#F4EFEA`.

### P7. `Decor` scatter
Absolute SVG doodles (clouds, diamonds, stars, X-circles, blobs) appear everywhere at `z-index:-1`. Render them with `<Placeholder variant="shape">` or omit them. On Careers some decor is **scroll-parallaxed** (see B-motion). Treat all of this as optional decoration.

---

## 4. Section block library (with reuse mapping)

Reuse key: **[REUSE file]** means implement with the existing component; **[NEW]** means build a new block.

### A1. `PageHeroIllustrated` [NEW] (About, Careers, Support, Book brief)
Two-zone hero: text column on the left, absolute illustration on the right.

| Prop | About | Careers | Support | Book brief |
|---|---|---|---|---|
| section padding | 80 / 260 bottom, inner flex col gap 24, container margin-bottom −20 | 144 / 210, bg cream, `overflow:hidden; z-index:2` | 101 / 170 | 112 / 112 |
| text max-w | 860 | 720 | 674 | 810 |
| H1 | `page-h1` ls 1.6, `[28ch/4w]` 2 lines | `page-h1` `[14ch/3w]` 1 line | `page-h1-sm` `[47ch/9w]` 3 lines | `page-h1-sm` `[28ch/5w]` 2 lines |
| below H1 | `page-sub` `[14ch]` + 40×40 down-arrow button | `lede` `[135ch/22w]` 2 lines + CTA row (gap 40): OffsetButton "SEE OPEN POSITIONS" + UnderlineLink "LEARN MORE ↓" | gap 20, UnderlineLink "LEARN MORE ↓" | — |
| illustration | 608×299 at x723 y418 (natural 1472×721 ≈ 2.04:1, contain) + TickerBand behind | 610×531 at x860 y165 (953×806, fill) | 354×354 SVG at x936 | 380×256 SVG + 130×131 "FREE BOOK" badge |

Responsive: the illustration drops below the text at SM (About 390: under the arrow, about 342 wide; Careers 390: about 342×300 collage under the CTAs). At 768 the text max-width becomes 600 (careers) and the illustration shifts right but stays absolute. The careers CTA row wraps at SM (button, then link underneath).
"LEARN MORE" and the down arrow scroll to the next section (in-page anchor; careers "SEE OPEN POSITIONS" → `#open-positions`).

### A2. `ProseWithImage` [NEW] (About "Origin story")
Flex row, `align-items:center`, gap 105, padding 60/30/70. Left column 709.6 wide, flex col gap 24: h2 `page-h2` (margin-bottom 6), then 5 paragraphs Inter 16/25.6 300 ls .32 (`[473ch/83w]` 6 lines, `[494/85]` 6, `[567/90]` 7, `[352/59]` 4, `[350/68]` 4). Right column: illustration 427×441 (natural 1104×1140, about 0.97:1, contain, max-w 436). Below 1302 the column stacks (text 920/688/342 wide, illustration below at about 342 wide).

### A3. `FullWidthPhoto` [NEW, trivial] (About "Our team")
Section padding 27/0/132. Flex col gap 40: h2 `page-h2`, then image 1242×778 (natural 3720×2325, 1.6:1, cover) with **border 2px ink**. Scales with the container at every width (342×214 at 390).

### A4. `LogoRow` [NEW] (About "Investors")
Section `border-top:2px ink`, padding 72/0/164, flex col gap 48, with a 92px rotated star decor on the top border at x≈1000. h2 `page-h2`. Row: flex, centre, gap 76, 6 logos at 42 tall (widths 181/153/123/186×29/127/86).
Responsive: at LG gap 46 (31 tall); at MD it wraps with gap 32/100 (2 rows of 3); at SM it wraps with gap 16/28 (2 rows of 3, about 32 tall). Use 6 `<Placeholder>`s; no real logos.

### A5. `ContactBand` [NEW] (About "Get in touch")
Full-bleed `bg sun`, border-top/bottom 2px ink, 400 tall (inner), `overflow:hidden`. TiltedTag "GET IN TOUCH" straddles the top edge at x152. Inner padding-left 254, column `justify-content:center`. Two lines, gap 32, Inter 16/25.6 400 ls .32 UPPER-cased copy:
- "EMAIL US AT" plus an inline mailto link. Links are `text-decoration: underline`, offset 7px. Hover: underline colour `#6FC2FF`.
- "WORK WITH US!" plus a link to `/careers/#open-positions`.

Decor: a cloud at bottom-left (232×211) and a **Lottie-style animated character** 370×336 at x861 (continuous SVG `<g>` transform animation, time-driven). Rebuild it as a static `<Placeholder>`.
Responsive: at SM the text is centred and stacked, the character sits below (section about 500 tall).

### A6. `CommunityCTA` [NEW] (About "Join the flock")
Padding 153/30. Left text block margin-left 110, flex col gap 16: h2 `page-h2` "JOIN THE FLOCK" + UnderlineLink "CHAT WITH US ON SLACK" with an external icon (external link → render as a non-link). Right: banner image 886×175 (natural 1968×388, about 5.1:1) inside an absolute link, `scale(0.9)`, translateY ≈107 (scroll-linked offset). At ≥960 a gradient fade `::after` covers the right edge: `linear-gradient(90deg, transparent, #F4EFEA 95%)`, width 150, right −120, `scale(1.25)`. At SM it stacks: text, then the banner at full width.

### B1. `HowWeWork` [NEW] (Careers)
Section 1541 tall. Absolute layer with the sticky TickerBand (P6, `top:275`). Container flex row, `justify-content:space-between`, gap 60, padding-bottom 140.
- Left column 430: sticky (`top:275`) photo frame 430×480, border 2px ink, `box-shadow: 16px 16px 0 0 ink` (hard-r16). It holds 2 stacked images (natural 674×618, cover) that **cross-fade**: image 2 goes opacity 0 → 1 when feature 2 enters (about scroll 1050) and back to 0 by about 2700.
- Right column 752: padding-top 225, gap 315. Two feature blocks, each padding 80/0/160, gap 24, `translateY(-40px)`: h3 `feature-h3` `[11ch]` / `[17ch]` + p Inter 20/32 300 (`[262ch/36w]` 4 lines, `[301/52]` 4 lines).

Responsive: LG keeps 2 columns (960 container, gap 60, right col 560). MD keeps 2 columns (right col 348, h3 24/28.8). SM: no sticky; each feature renders photo (342×about 250 with the shadow), then h3, then p (see 390 screenshot).

### B2. `VideoFeature` [NEW] (Careers "Our culture")
TiltedTag "OUR CULTURE" + full-bleed `bg sun` band (border-top/bottom 2px, 770 tall, overflow hidden, about 1792-wide decorative SVG background). Centred frame 850×480: border 2px ink, grid one column 846, 16:9 SVG spacer, thumbnail image 846×476 (natural 1012×567, 16:9, fill) on a cream bg. Centred play button 76×76: circle, bg white, border 2px ink, 28.8px play glyph offset +2.9. Transition `background-color .1s ease-in-out`. Frame motion: scroll-reveal (B-motion), transition opacity/transform 0.75 s ease.
**Embedded video (third-party player; clicking opens it):** rebuild as a static thumbnail `<Placeholder ratio="16/9">` + play button; it should do nothing, or open a local static modal. Sizes: LG 700×395, MD 544×307, SM 342×194.

### B3. `ValuesCards` [NEW] (Careers "Our values")
Section padding-top 160. h2 `careers-h2` with padding-bottom 52. Row of 4 cards, each 312×288 with margin-right −2 (borders overlap). Card = LiftCard-like wrapper (ink bg) → inner white, border 2px ink:
- Art panel 308×222, padding 32, bottom border 2px ink, bg per card: teal / sky-hover / coral-red / sun. Centred illustration 156×156 (natural 238×237, contain).
- Toggle button 308×62, padding 16/24, white, `justify-content:space-between`: h3 Mono 18/25.2 UPPER (labels FLEXIBILITY, THOUGHTFULNESS, UNORTHODOXY, AGENCY) + 30×30 chevron. Chevron transition `transform .2s ease-in-out`.
- Collapsible body: height 0 → auto, transition `height .125s ease-in-out`, `overflow:hidden`. p Inter 14/22.4 400 ls .28, padding 0/20/24/24 (`[352ch/46w]`, `[324/55]`, `[388/57]`, `[301/40]`; 10–13 lines). The chevron rotates 180° when open.
- Entrance: each `<article>` uses `.scroll-animate-up` with staggered transition durations **0.4 s / 0.8 s / 1.2 s / 1.6 s** (opacity + transform, ease).

Responsive: XL is 4 across in 1242. **LG and MD turn into a horizontal scroll row** (cards about 439 wide at LG, about 337 at MD; the row overflows to the right). SM is a vertical stack, full width (342), gap about 24 (see screenshot).

### B4. `JobsBoard` [NEW] (Careers "Open positions", anchor `#open-positions`)
Container flex row `space-between`. Left 740 (LG 620, MD/SM full):
- h2 `careers-h2`, padding 50/0/52.
- **Filter panel** bg filter-bg: header row padding 16/20, flex `space-between`: "Filters" Inter 18/28.8 400 ls .36 + UnderlineLink muted "CLEAR ALL". Grid of 3 selects, columns 222.3 each, gap 16, padding 0/20/16. Transition `max-height, height, overflow .25s ease-in-out`.
- Select box: bg `rgba(248,248,247,.698)`, border 2px ink, 222×56.4. Inner padding 15/20, flex `space-between` gap 8: placeholder Inter 16/22.4 300 ls .32 `#666` ("Department", "Location", "Employment type") + 20px chevron (`transform .2s`).
- Open menu (`#dropdown-menu`): width `calc(100% + 3px)`, border 1.5px ink, left −1.5, animation `dropdown-in` 200 ms ease-out. EXISTING keyframe. Options were not measured (no filter values were opened).
- At SM the panel collapses to one "Filters ▾" bar 342×about 56 and the three selects stack (316×52, gap about 18) when expanded.
- Department groups (gap 60, margin-top 64, padding-bottom 48). Group h3 Mono 24/33.6 UPPER (padding-right 70, padding-bottom 24; 18/25.2 below 960) + list (gap 24).
- **JobCard** (`<a>`, external Ashby URL → render as a non-link `div`): bg white, border 2px ink, padding 32 (LG/MD 24, SM 20), grid `1fr 32px` gap 16 (LG 532/24 gap 12). Left: flex col gap 8. Title h4 Inter 24/28.8 600 (padding-bottom 4; 18/28.8 below 1302, 18/21.6 SM). Meta Inter 16/25.6 300 ink ("Dept • City, City • Full Time"; 14/19.6 below 1302). Optional comp line Inter 14/19.6 300 `#818181`. Right: 32px arrow in a div with `transition: transform .15s ease-in-out`. **Hover: the arrow moves translateX(−16px) at ≥1302, (−12px) below.** Counts: Engineering 1, Marketing 1, Sales 1 (3 cards; heights 162 / 134 / 162).
- After the list: a block max-w 540, padding 36/0/116, gap 20: Mono 32/44.8 UPPER `[39ch]` 2 lines + UnderlineLink "Join our Talent Community →".
- Right column: sticky (`top:302`) illustration 364×427 (natural 434×509, contain) with `scroll-animate-up` (1 s). Hidden below 960.

**Third-party embed: Ashby job board.** The data is baked into the page; links go to `jobs.ashbyhq.com`. Rebuild it as local static data with 3 placeholder jobs and no outbound links.

### B5. `PhotoMarquee` [NEW] (Careers gallery)
Section padding 100/0, `overflow:hidden`. Track: horizontal scroller (`overflow-x:auto` with a hidden scrollbar) holding a flex row of **30 groups** (10 unique groups × 3 for looping), each group 510×360 with margin-right 42. Each group is a collage of 1–3 absolutely placed photos with border 2px ink, `object-fit:cover`. Group patterns (w×h inside 510×360): [479×360]; [250×360 + 178×169 + 240×169]; [265×198 + 316×184]; [255×162 + 204×212 + 209×252]. Natural sizes range from 200×180 to 500×332.
**Motion:** a JS loop increments `scrollLeft` at about **60 px/s**, continuous, independent of scroll, wrapping seamlessly at one third of the track. Pause it under `prefers-reduced-motion`. At SM groups are about 342 tall-scaled (visible pieces about 200×150).

### B6. `BenefitsCard` [NEW] (Careers)
Full-bleed bg teal, border-top/bottom 2px, padding 175/0, `overflow:hidden`, about 1280×760 doodle SVG background. Centred card 699×410: bg white, border **1px** ink, `box-shadow:-20px 20px 0 0 ink`, scroll-reveal (1 s). TiltedTag "BENEFITS" (P5). `ul` padding 92/80, flex col gap 16, max-w 700: 5 items Inter 20/32 300 ls .4 with padding-left 28 and a bullet `::before` (12×12 circle, bg sun, border 2px ink, top 20%). Item lengths 42/51/51/18/9 ch. Heart and doodle SVG decor. MD: list 16/25.6, tag Inter 18/25.2. SM: card full width about 290, tag 16/22.4.

### B7. `TestimonialCarousel` [NEW] (Careers), preceded by the dark TickerBand "JOIN THE FLOCK"
Section bg sky-hover, border-bottom 2px, height **380** viewport (`overflow:hidden`). Track: flex column of 3 slides, each 1440×380, grid `938px 500px`.
- Quote side: padding 0/68/0/106, centred. Opening quote mark SVG 30×27 (margin-bottom 16), blockquote Inter 20/28 400 ls .4 (`[463ch/75w]` 7 lines, `[458/78]` 7, third `[587/105]` at 18/25.2 ls .36, 8 lines), closing mark rotated 180° (margin-top 10, right-aligned).
- Photo side 500×380, cover (naturals about 410×364, 398×387, 500×464; portrait-ish) with a name plate at bottom-left: bg cream, border-top/right 2px, padding 14/22/14/30, gap 4. Name Inter 24/28.8 600 ls .48, role Inter 16/20.8 300 ls .32. A 22.6px rotated-45° sky square with 2px top/right border at x926 forms a notch pointing at the photo.
- Controls: absolute at x45, two 24px chevrons (up, down) stacked with gap 60, cursor pointer, `transform .2s ease-in-out`. Click → track `translateY(−380px × index)` with `transition: transform .5s` (ease). **No autoplay.**
- LG/MD: horizontal slider instead (slides 1280 / 768 wide, grid 971/309 and 459/309, slide height 440); controls become left/right chevrons centred below the quote. SM: one column, photo on top (about 390×400) with the name plate centred under it, the quote below centred (Inter 16/22.4), arrows ‹ › centred at the bottom (see 390 screenshot). Real people → `<Placeholder>` photos and placeholder names.

### B8. `ClosingCTA` [NEW] (Careers "Can't find the role")
Padding 60/0. Container flex row `space-between` gap 20. Left max-w 600, flex col centre gap 16: Mono 32/44.8 UPPER `[39ch]` + UnderlineLink. Right: illustration 514×417 (natural 1028×834, contain). Both sides use `.scroll-animate-right` / `scroll-animate-*` with a 1 s transition. SM: stacked; text, then illustration about 300 wide.

### C1. `ContactChooser` [NEW] (Contact us)
Container padding 100/30/220. Header block centred, padding-bottom 80, gap 20: h1 `page-h1-sm` `[12ch]`, sub Inter 20/32 300 ls .2 `[60ch]` 1 line (MD/SM 16/25.6).
Grid of 2 cards, `605 605`, gap 32 (LG 444/444, MD 334/334 gap 20, SM 1 column gap 20). **Card = LiftCard** (EXISTING `src/components/ui/LiftCard.jsx`, `lift=14`, `hoverFrom="always"`, 120 ms): inner `<a>` bg white, border 2px ink, padding 22/30 (LG 22/24/22/32), flex row centre gap 30. Content: 36px line icon (headset / wrench), then a text block: title Inter 24/28.8 300 ls .48 (MD/SM 20/24), sub Inter 14/19.6 300 ls .28 at opacity .7, then a 36px arrow rotated −90° (an arrow-down glyph rotated to point right). Card height 100 (LG 120). Hover: inner `translate(14px,−14px)`.
Below: Inter 14/19.6 300 (LG and below 12/16.8) note with a `mailto:` link (underlined).
Decor SVGs. Card 1 → `/contact-us/product-expert/`, card 2 → `/contact-us/support/` (out of scope, see §8).

### D1. `ContactSplitForm` [NEW] (Product expert)
- **Hero strip:** full-bleed bg sand + `sand-grid-pattern.png` tile (a 24px-ish grid; rebuild it as a CSS `linear-gradient` grid in `#E1D6CB`), border-bottom 2px ink, 288 tall. h1 `page-h1-sm` `[27ch/5w]` 2 lines in a box with bg sand, max-w 595, margin 64/0/48.
- **Body:** container flex **row-reverse**, gap 110 (LG/MD 44), padding 0/30, margin-bottom 200.
  - Form column 549 (LG 368+, MD about 330): pulled up `margin-top:-170px` so the form overlaps the hero. An illustration 272×121 (natural 461×206) sits on top of the form at y −90.
  - Form: bg surface-2, border 2px ink, padding 80/52/52, flex col gap 40. Row 1 has 2 inputs side by side (gap 24); then E-mail, Company, and a textarea (P3 `float` variant). Fine print "This site is protected by reCAPTCHA." Inter 14/19.6 300 `#818181`, padding-top 32. SUBMIT = OffsetButton (P2), margin-top 16.
  - Info column 583 (LG 456): section padding-top 60. Lede Inter 20/28 300 ls .4 `[267ch/39w]` 7 lines (LG and below 16/22.4), padding-bottom 52. h3 Mono 18/25.2 UPPER (LG 16/22.4), padding-bottom 16. 3 `li` (flex gap 16, margin-bottom 16): yellow pill icon 20×14 (bg sun, border 2px ink, radius 50%, 10px check) + p Inter 16/22.4 300 ls .32 with a bold lead-in span (700). Lengths 136/185/132 ch.
  - Second h3 (padding-bottom 32) + logo wall: flex wrap gap 32, bg cream, 9 partner logos 20–34 tall (67×28, 91×33, 65×26, 88×34, 92×27, 118×20, 117×26, 102×34, 109×30) → placeholders.
- **SM:** single column; hero h1 first, then the form (full width 342, illustration overlapping its top), then lede, list, logos (4/3/2 per row).
- **Third-party:** HubSpot form submission + **Google reCAPTCHA v2 invisible** (floating 256×60 badge fixed bottom-right with `box-shadow: 0 0 5px gray`, `transition: right .3s`). Rebuild the form locally (no network), keep the fine-print line, and **omit the reCAPTCHA badge**.

### E1. `SupportCards` [NEW] (Customer support)
Section padding-bottom 140. h2 `page-h2` "OUR PHILOSOPHY". Then p Inter 20/32 300 `[198ch/36w]` 4 lines (MD/SM 16/25.6 **400**), padding 20/0/52, with an inline link to `/support-policy/` (underlined).
Grid 3 × 392.7, gap 32. **LG: container narrows to 740, 2 columns 354, 3rd card spans 2.** MD: 2 × 332 gap 24, 3rd spans. SM: 1 column gap 24.
Card = **LiftCard** (EXISTING, `lift=14`, `hoverFrom="lg"`; rule measured `@media (min-width:960px) :hover → translate(14px,-14px)`, 120 ms): inner `<a>` bg white, border 2px, padding 32/32/40, flex col gap 16, height 441. Content: 140×140 illustration (natural 360×360), h3 Mono 24/33.6 UPPER (MD/SM 18/25.2), p Inter 16/25.6 300 ls .32 (119–159 ch, 3–4 lines), UnderlineLink with an UPPER label pushed to the bottom (`margin-top:auto`, padding-top 16). Labels: "TALK WITH A PRODUCK EXPERT", "ASK A QUESTION IN SLACK", "SHARE YOUR IDEAS". Cards 2 and 3 link externally (Slack, Canny) → non-links.

### E2. `YellowCalloutCard` [NEW] (Customer support)
Full-container `<a>` (grid row), bg sun, border 2px ink, padding 36/80, grid `201.6px 812.4px` gap 64, `overflow:hidden`, height 306. Left: illustration 201.6×230 (natural 504×575, contain). Right: flex col centre gap 16: h3 Mono 32/44.8 UPPER `[35ch]` (LG and below 24/33.6, 2 lines) + p **Mono 18/25.2 300 UPPER** `[123ch/24w]` 2 lines with an inline underlined "REACH OUT". Decor SVGs. No hover change measured. LG padding 32, grid 184/424. MD padding 24. SM: 1 column (290), gap 40, illustration on top, height about 497.
Below it: UnderlineLink "MOTHERDUCK STATUS" (external → non-link), margin-top 32.

### F1. `LegalPage` [NEW] (Privacy, Terms; Support-policy variant)
- **Header:** padding 110/0/88, h1 `page-h1` (Support policy: `page-h1-sm` with padding 64/0/36 and no TOC).
- **Body:** flex **row-reverse**, gap 24, `justify-content:flex-end`. Content column max-w **816**, padding-bottom 240 (LG 180, MD/SM 120).
- **TOC (XL only side-by-side):** wrapper `position:sticky; top:148px`, margin-left 69, width 333, flex col gap 24. `<aside>` bg cream, border 2px ink:
  - Title "TABLE OF CONTENTS" `toc-title`, padding 24/24/20.
  - `<ol>` padding 0/16/16/24 (Terms: left 48, decimal markers), flex col gap 12, **max-height 638 (230 below 1302), overflow auto**.
  - Each top item: a `button` row (flex, gap 4, cursor pointer, transparent) containing `li > a` (`toc-link`, ink, no underline, **no hover change**) + an 18.5×20 chevron if the item has children (`transform .2s`; no rotation observed).
  - Children: `ul` padding-left 16, gap 12, `height` 0 → auto and `margin-top` 0 → 8, transition `height, margin-top .2s ease-in-out`, `overflow:hidden`.
  - **Scroll-spy:** the section currently in view gets weight 600 on its link. If it is a child, its parent is also 600 and the parent's sub-list expands. Click → jump (`scroll-behavior:auto`, no smooth) with the target at 160px from the viewport top. Headings have `scroll-margin-top:80px` and html has `scroll-padding-top:80px`, and the sticky header adds the rest.
  - Privacy: 6 top-level items, 2 with children (2 and 5 children). Terms: 16 flat numbered items.
- **Below 1302:** the TOC is static and stacked above the content (gap about 32–40 before "Last updated"). Width is content-sized: 250 @1280, 196 @768, full 342 @390. `toc-link` 14/19.6.
- **Content typography** (all ink):
  - "Last Updated: …" Inter 14/19.6 300 ls .28 (MD/SM 12/16.8); block gap 16, margin-bottom 48.
  - Lead paragraph `legal-lead` with bold (700) defined terms and underlined links (offset 4.4px). Privacy `[702ch/112w]` 12 lines, Terms `[322ch]` 4 lines.
  - Sections (`<section>`, 14 privacy / 16 terms) separated by one blank line (25.6) on Privacy and by 0 on Terms. Section heading: Privacy h2 = `<u><strong>` Inter 20/32 700 underlined; Privacy h3 = Inter 16/25.6 700 (sometimes underlined). Terms h2 = an inline Inter 16/25.6 700 inside a decimal `ol > li` (padding-left 32), with nested `ol` lower-latin (padding-left 25).
  - Body `legal-body`. Definition lists are `ul` with no bullets (`li > strong` lead-in). Bulleted lists are `ul` padding-left 20, disc. Inline links underline (offset 3.52px), no hover change.
  - Terms has one ALL-CAPS paragraph block (padding-left 10, Inter 16/25.6 300 uppercase).
- **Support-policy variant:** no TOC. Container padding 24/30/48. Body grid one column, gap 80 (LG and below 40), padding-bottom 112. Paragraphs Inter 16/25.6 300, margin-bottom 24, with bold lead-ins (8 paragraphs). **Table**: width 792 (fills 816 minus scroll), `border:2px solid ink`, `border-collapse:collapse`. Rows bg **white**. Cells `border:1px solid #000`, padding 10, Inter 15/21 300, header row bold 700. 5 rows × 5 cols (col widths about 52/154/110/105/107). At SM the table keeps its width and the column scrolls horizontally (grid col 350 > 342).

### G. Gated LP template blocks
Every LP body section is a full-bleed `<section>` with **border-top and bottom 1px ink**, padding **96/0** (MD 80, SM 64), `overflow:hidden`, holding `Container > div max-w 1280`. Standard section head: h2 `lp-h2` (margin-bottom 20) + optional p Inter 16/22.4 300 ls .32 (margin-bottom 16 or 32; opacity .6 on coloured sections, `#666` or ink otherwise). Then the block grid with margin-top 24 (32 for card grids).
**The original LP body grids do NOT collapse responsively**: the 2/3/4-column grids keep their column count at 768 and 390 (columns shrink to about 98–151px and text wraps per word, or the last column clips off-screen; see the 390 screenshot). Only the hero collapses (1 column below 728). Recommended clone behaviour: match the 1440/1280/768 measurements and **at SM use 1 column** (deliberate deviation; the original is visibly broken at 390). Flag this to the orchestrator.

| Block | Spec |
|---|---|
| **G1 `LPHero`** | bg cream, padding 40/0/136 (MD 32/55, SM 24/55). Grid `591 591` gap 60, `align-items:center` (LG 430/430, MD 314/314, SM 1 column gap 40). Left: flex col gap 20. Eyebrow chip (`lp-eyebrow`, bg yellow-chip, border 2px ink, padding 6/14). h1 `lp-h1` (17–90 ch, 1–5 lines). h2 `lp-sub` (30–102 ch). Optional body p Inter 18/28.8 300 ls .36 (DuckLake, BI, Cheatsheet; 182–304 ch). **Inline email form**: flex gap 10, margin-top 8: FloatingInput (`hide` variant, type=email, "Enter your email", flex 1) + OffsetButton (labels "GET THE GUIDE", "GET THE REPORT", "GET EARLY ACCESS", "DOWNLOAD FREE GUIDE", "GET THE CHEATSHEET"). At SM the button drops under the input. Fine print Inter 13/18.2 300 ls .26 opacity .7 (optional; absent on cheatsheet). **Media variant `cover`** (ai, survey, ducklake, bi): book cover image max-w 360 (about 361×472, natural 384×497–504, about 0.77:1), border 2px ink, radius 2, `box-shadow:-10px 10px 0 ink`; parent `perspective:1200px`; `transform: rotateY(-5deg) rotateX(2deg)`; **hover → `rotateY(-2deg) rotateX(1deg)` + shadow −14/14**, transition `transform, box-shadow .4s ease`. SM: 343×448 below the form. **Media variant `image`** (postgres, cheatsheet): 480×640 box, image `object-fit:contain` (natural 900×672 terminal render / 411×293 cheatsheet sheet), no tilt. Treat it as a static placeholder; it is an image, not DOM. |
| **G2 `BenchmarkCards`** (ai) | Grid `601 601` gap 40, margin-bottom 32. Card: border 2px ink, `hard-6`, `overflow:hidden`. Header bar bg ink, padding 8/12, `lp-tab` white. Body bg white, padding 24: 2 metric rows (gap 12), each a label row (Mono 14/23.8, value 600, `space-between`, margin-bottom 4) + track 8 tall `rgba(56,56,56,.1)` with a fill (baseline bar-gray, after lp-orange; width = %). Footnote Inter 14/19.6 300 opacity .6, margin-top 12. |
| **G3 `StatRow`** (ai, survey) | Grid 4 × 298.5, gap 16. Each padding 24: h3 `lp-stat` (margin-bottom 8) + p Inter 14/19.6 300 opacity .6. No borders. |
| **G4 `TwoColProse`** (ai) | Grid `380 380` gap 40, max-w 800. p Inter 16/28.8 300 ls .32 opacity .85 (`[207ch]`, `[191ch]`). |
| **G5 `CardGrid`** (ai "wrong", ai "inside", ai "playbook") | Grid 4 × 292.5 (or 3 × 398), gap 24. Card bg white, border 2px ink, `hard-6` (playbook: `hard-4`), padding 24. Optional top tab bar (`lp-tab` ink text, bg sky-hover / sun / teal-bright, border-bottom 2px, padding 8/12, card `overflow:hidden`). Optional step label (`lp-tab` `#888`, margin-bottom 12). h3 `lp-card-h3` (margin-bottom 8) + p `lp-body`. Counts: wrong 4, inside 3, playbook 7 (4+3). |
| **G6 `FindingCards`** (survey) | Grid `601 601` gap 40, `align-items:start`. Card bg survey-paper, border 2px survey-ink, **radius 14**, shadow `-6px 6px 0 survey-ink`. Header bar bg survey-ink, padding 9/14, `lp-tab` survey-paper. Body padding 24: h3 Mono 19/24.7 + optional caption Inter 11/15.4 300 ls 1.32 UPPER opacity .5. Variant `bars`: 5 rows flex gap 14 (label Mono 14/18.2 241.5 wide; track 10 tall survey-track radius pill; fill survey-ink; value Mono 14/23.8 700 right-aligned, 40 wide), row margin-bottom 12. Variant `stacked`: 3 items, gap 18: label Inter 12/16.8 700 ls 1.44 UPPER, track (fill survey-teal or survey-orange), note Inter 13/19.5 300 with a Mono bold lead. |
| **G7 `NumberedList`** (survey) | max-w 860, border-top 2px survey-ink. Rows padding 16/4, flex baseline gap 20, border-bottom 1px `rgba(22,18,12,.25)` (last row 2px solid). Number Mono 13/22.1 600 opacity .5. h3 Mono 17/22.1 UPPER + p Inter 14/22.4 300 ls .28 `#666` (margin-top 4). 7 rows, 81.5 tall each. |
| **G8 `DarkFeatureGrid`** (ducklake, bi, cheatsheet) | Section bg ink, h2/p white (p ls .32). Grid 3 × 403.3, gap 16. Item padding 24, **border-top 3px** colour (ducklake: sky-hover ×3 then sun ×3; bi: lp-orange ×3; cheatsheet: sky-hover, sun, teal-bright). h3 `lp-card-h3-lg` white (margin-bottom 8) + p Inter 16/22.4 300 white opacity .7. Items: ducklake 6, bi 3, cheatsheet 3. |
| **G9 `PartCards`** (ducklake) | Grid 3 × 398, gap 24. Card bg sky-hover / sun / teal-bright, border 2px **#000**, shadow `-6px 6px 0 #000`, padding 32. "PART 0n" Inter 13/18.2 600 ls .26 UPPER opacity .7 (margin-bottom 8). h3 `lp-card-h3-lg` (margin-bottom 12). p Inter 16/22.4 300. |
| **G10 `SplitChecklist`** (ducklake) | Grid `601 601` gap 40. Left: 2 p Inter 16/22.4 300 (margin-bottom 16). Right card: white, border 2px #000, shadow −6/6 #000, padding 32: h3 `lp-card-h3-lg` (margin-bottom 16) + 4 `li` Mono 18/30.6 with a "✓ " prefix, padding 8/0, border-bottom 1px `#EEEEEE`. |
| **G11 `AuthorsGrid`** (ducklake, on a sun section) | Grid `601 601` gap 40. Each: photo 200×200 cover, border 2px #000, shadow −6/6 #000, margin-bottom 16 → `<Placeholder>`. Name h3 `lp-card-h3-lg` centred (margin-bottom 4). Role Inter 16/22.4 300 centred (margin-bottom 16). Bio Inter 16/22.4 300 left (`[519ch/81w]`, `[448/69]`). |
| **G12 `FAQAccordion`** (ducklake 5 items, bi 9 items) | Section white with an inner `section` bg white. Title row padding 34/0 with inner padding 0/30: h2 Mono **40/48**. Items: padding 26/0, inner padding 0/30. Items 2..n have `border-top:2px ink`; the last item also has `border-bottom:2px ink`. Button full width, flex centre, transparent: h3 `faq-q` (margin-right 20) + 24px chevron (`transform .2s ease-in-out`, **open: rotate 180°**). Answer wrapper `max-height:0 → content`, `margin-top: 0 → 16`, `transition: all .25s ease-in-out`, `overflow:hidden`. Answer p `faq-a` (may contain internal links, underlined). Multiple items can be open at once; no hover change. Item transition `background .2s` (no change observed). |
| **G13 `MutedCardGrid`** (bi "inside") | Grid 3 × 398, gap 24. Card bg muted-card, **radius 8**, padding 20, no border, `transition: all .2s ease` (no hover change measured). h3 `lp-card-h3` (margin-bottom 8) + p Inter 15/21 300 ls .3 opacity .7 with underlined inline links. 6 cards. |
| **G14 `SpectrumCards`** (bi, dark section) | p max-w 640 opacity .7. Grid 4 × 295.5, gap 20, margin-top 36. Card bg `rgba(255,255,255,.06)`, border 1px `rgba(255,255,255,.08)`, **radius 10**, padding 28/24. h3 Mono 17/22.1 white (the 4th in lp-orange) (margin-bottom 6). Example p Inter 14/19.6 300 opacity .5 (margin-bottom 16). A divider block with border-top 1px `rgba(255,255,255,.1)` and padding-top 12: "LIFESPAN" Inter 12/16.8 300 ls .96 opacity .4 + value Inter 16/22.4 300 (margin-top 4). Dot 8×8 circle (first `rgba(255,255,255,.15)`, others lp-orange; the 4th card's text is orange), margin-top 16. |
| **G15 `InsightWithBars`** (bi) | Grid `601 601` gap 40, `align-items:start`. Left: quote p Inter 26/39 300 ls .52 `[309ch/49w]` 8 lines. Right: caption Inter 13/18.2 300 ls 1.04 UPPER opacity .5 (margin-bottom 16, inline underlined external link → non-link) + 4 bar rows as in G2, but the track is `rgba(255,255,255,.1)` with **radius 4**; fills bar-gray ×2 then lp-orange ×2; the last value is lp-orange. |
| **G16 `CodeWindow`** (cheatsheet, teal section) | Centred, max-w 720, margin-top 32. bg code-bg, border 1px `rgba(255,255,255,.1)`, **radius 12**, `overflow:hidden`. Title bar padding 12/16, flex gap 8: three 12px dots + filename `monospace 12/20.4 rgba(255,255,255,.3)` pushed right. `pre` padding 16/24/28, `SF Mono` → use `font-code`, 14/23.8, text `#D4D4D4`, token colours in §2a, 24 lines (5 commented snippets). Code content may be placeholder SQL. |
| **G17 Postgres-only blocks** | (a) `SignCards`: section head with eyebrow `ui-monospace` 12/20.4 ls 1.68 UPPER pg-eyebrow (margin-bottom 14), h2 **Mono 44/57.2 700 ls −1.32** pg-head max-w 760, p Inter 17/26.35 300 ls .34 pg-body max-w 620. Grid 4 × 263 gap 16 (max-w 1100): card white, border 1px pg-rule, radius 14, padding 24/22, flex col gap 11: number `ui-monospace` 13/22.1 700 garden; title Mono 18/22.5 700 pg-head; body Mono 14.5/21.75 `#6B6B6B`. 7 cards. (b) `ArchitecturePanel`: bg pg-panel, radius 20, padding 56, max-w 1080; eyebrow pg-yellow ls 1.92; h2 48/62.4 700 white ls −1.44; p pg-body-light `#A6A89E`. Flex row of 3 cards (258.7 wide, radius 16, padding 24/22, gap 9, bg pg-card / pg-card-hi with garden 1px border on the middle one) and 2 connectors 96 wide (labels `ui-monospace` 10.5/13.65 `#8A8C82`, a 26px yellow arrow, sub-label 10px). Card pills: `ui-monospace` 11/18.7, radius 7, padding 5/11. (c) `ChapterList`: max-w 980, border-top 1px pg-rule, rows padding 20/4 gap 18 with border-bottom 1px pg-rule, number `ui-monospace` 14/23.8 700 pg-num-mute, title Mono 19/22.8 700, sub Mono 15/22.5 `#6B6B6B`. 7 rows, then a mint callout card (radius 14, light mint bg, 1px tint border, padding about 22): eyebrow, Mono 19 bold title, Mono 13 body. (d) `QuoteCards` (sun section): grid 3 × 346.7 gap 20, card white, border 1px pg-rule, radius 16, padding 28/26, gap 16: quote mark Mono 40/20 700 pg-yellow, quote Mono 18/27 `#1B1C18` (8 lines), footer border-top 1px pg-quote-rule, padding-top 14, 7px garden dot + `ui-monospace` 12.5/21.25 `#6B6B6B` attribution. Note that Aeonik Mono is requested at weight 700, which is not loaded, so the browser renders synthetic bold. Use Fragment Mono 400 with `font-weight:700` to match. |
| **G18 `GatedFormSection`** (all 6, last section) | Section bg cream. Inner max-w 840, centred. h2 `lp-form-h2` centred (margin-bottom 12) + p Inter 18/28.8 300 ls .36 centred opacity .85 (margin-bottom 16). Form wrapper padding 0/72/80, flex col gap 24. Form grid `340 340` gap 16: First Name, Last Name (row 1); E-mail and Company Name each span 2; Checkbox (P4 `outline`, checked) "Subscribe to MotherDuck email updates"; SUBMIT OffsetButton (P2, **disabled until valid**), margin-top 8. Inputs are P3 `hide` variant, type text. MD: form 544 (264/264). SM: 294 (139/139, side-by-side kept). **Success overlay** (absolute over the form, bg cream, padding 0/64/64, gap 36, opacity 0 → 1 after submit): cover thumbnail 240 wide + Mono 30/42 300 ls .6 UPPER "Thanks… Redirecting you in N sec" countdown. In the clone, show it on local submit and do not redirect. **Third-party: HubSpot forms** (`hsforms`). Rebuild locally. |

Postgres hero is otherwise G1 (`image` variant, the h1 is 1 line, so the column is vertically centred within a 640 media height).

### H1. `BookOffer` [NEW] (Book brief)
After an h2 `page-h2` with margin-bottom −20 (container gap 40) and an intro p Inter 20/32 300 `[475ch/76w]` 4 lines (LG 18/28.8, MD/SM 16/25.6):
Grid wrapper bg ink (it shows as a 2px divider), border 2px ink, grid `920 316` gap 2, height 266, margin-bottom 40.
- Left **form** bg sun, padding 32/0/32/80, `overflow:hidden`, doodle SVGs. Title p Mono 24/33.6 **300** ls .48 UPPER "GET YOUR FREE BOOK!" (padding-bottom 32; LG 20/28, MD 18/25.2, SM 16/22.4). Grid `632 192` gap 20/16: FloatingInput (`float`, "Work Email") + OffsetButton "SUBMIT" (disabled style); under them 2 Checkboxes (`solid`, checked, 14/22.4): "Subscribe to MotherDuck news", "Subscribe to DuckDB ecosystem newsletter".
- Right panel bg teal, `overflow:hidden`: book cover 186×262 (natural 456×569, 0.8:1) bleeding off the bottom → placeholder.
- LG `650 264`, MD `472 210` (field grid 292/108). SM: one column (form, then the cover panel).

### H2. `ChapterBanner` [NEW]
Full-width bar bg orange, border 2px ink, padding 6/12, flex centre gap 14, 57 tall: 46×41 duck-logo SVG + Mono 16/22.4 300 ls .32 UPPER "DON'T MISS" + UnderlineLink (Mono 16/19.2 UPPER label "CHAPTER 7 ON MOTHERDUCK", 18px arrow). On this variant the hover keeps the underline **ink** (2px, not sky); press turns it sky-hover.

### H3. `ChapterCards` [NEW]
Grid `605 605` gap 40/32 (LG 444/444 gap 32, MD 332/332 gap 24, SM 1 column). 11 cards, each 605×450 (fixed height per row). Card `<article>` white, border 2px ink, padding 32/32/40, flex col gap 20:
- Header row (gap 20): "CHAPTER n" Mono 24/33.6 UPPER (LG 20/28, MD 18/25.2, SM 16/22.4). Chapter 7 adds a "CHAPTER PREVIEW" chip (peach bg, orange Mono 12 UPPER, duck icon).
- h3 > a Mono 32/44.8 UPPER (LG/MD 24/33.6, SM 18/25.2) linking to the summary page.
- `ul` padding 16/0/0/18, disc, li Inter 16/25.6 **400** ls .32 (MD/SM 14/22.4). 3–5 bullets, some with an inline Mono code link.
- Footer (margin-top auto, gap 12): UnderlineLink "SUMMARY →". Chapter 7 also has "READ THE CHAPTER →" (pdf).
No card hover.

---

## 5. Per-route composition

Section order top to bottom. Each line gives the block, then its props.

**`/about-us`** (doc 4970 @1440; 4932 / 4983 / 6065)
1. A1 PageHeroIllustrated `{variant:'about', ticker:'ABOUT US' ×27, illus 608×299}`
2. A2 ProseWithImage `{paragraphs:5, image:427×441}`
3. A3 FullWidthPhoto `{ratio:1.6}`
4. A4 LogoRow `{count:6, borderTop:true}`
5. A5 ContactBand `{bg:'sun', tag:'GET IN TOUCH'}`
6. A6 CommunityCTA

**`/careers`** (8746; 8395 / 8281 / 9779)
1. A1 `{variant:'careers', bg:'cream', cta:['SEE OPEN POSITIONS','LEARN MORE']}`
2. B1 HowWeWork `{features:2}`
3. B2 VideoFeature
4. B3 ValuesCards `{count:4}`
5. B4 JobsBoard `{groups:3, jobs:3, filters:3}`
6. B5 PhotoMarquee `{groups:10×3}`
7. B6 BenefitsCard `{items:5}`
8. P6 TickerBand dark, then B7 TestimonialCarousel `{slides:3}`
9. B8 ClosingCTA

**`/contact-us`** (1814; 1736 / 1784 / 2669): C1 ContactChooser `{cards:2}`.

**`/contact-us/product-expert`** (2390; 2216 / 2520 / 3839): D1 ContactSplitForm `{fields:[firstname,lastname,email,company,message], bullets:3, logos:9}`.

**`/customer-support`** (2818; 3103 / 3009 / 4314): A1 `{variant:'support'}` → E1 SupportCards `{cards:3}` → E2 YellowCalloutCard → status UnderlineLink.

**`/privacy-policy`** (7538; 7159 / 6391 / 10266): F1 `{toc:'nested', sections:14}`.
**`/terms-of-use`** (8393): F1 `{toc:'numbered', sections:16, lists:'decimal/lower-latin'}`.
**`/support-policy`** (2815; 2571 / 2866 / 4592): F1 `{toc:false, h1:'sm', table:{rows:5, cols:5}}`.

**`/lp/ai-analytics-eval-field-guide-full`** (5480; 5781 / 6091 / 8208)
G1 cover → [sun] h2 + G2 (2 cards) + G3 (4) → [white] G4 → [cream] G5 (4, no tab) → [white] G5 (3, tabs sky-hover/sun/teal-bright) → [teal] G5 (7 steps, hard-4) → [cream] G18.

**`/lp/data-ai-survey-full`** (4338)
G1 cover → [sun] G6 (bars + stacked) + G3 (4) → [white] G7 (7) → [cream] G18.

**`/lp/ducklake-lakehouse-table-format-book-full`** (6078)
G1 cover (+ body p) → [ink] G8 (6) → [white] G9 (3) → [cream] G10 → [sun] G11 (2) → [white] G12 (5) → [cream] G18.

**`/lp/guide-to-bi-in-the-agentic-era-full`** (6003)
G1 cover (+ body p) → [ink] G8 (3, orange) → [white] G13 (6) → [ink] G14 (4) → [cream] G15 → [white] G12 (9) → [cream] G18.

**`/lp/postgres-analytics-guide-full`** (6559)
G1 image → [white] G17a (7) → [cream] G17b → [white] G17c (7 + callout) → [sun] G17d (3) → [cream] G18.

**`/duckdb-cheatsheet-full`** (4226)
G1 image (+ body p, no fine print) → [ink] G8 (3) → [teal] G16 → [cream] G18.

**`/duckdb-book-brief`** (5531; 5989 / 5563 / 8149)
A1 `{variant:'book'}` → section padding 52/0/200, container flex col gap 40: h2 + p → H1 BookOffer → h2 + p (bold 400 span) → H2 ChapterBanner → H3 ChapterCards (11).

---

## 6. Motion summary (everything else is static)

| Where | Trigger | Values |
|---|---|---|
| Careers `.scroll-animate-up/down/left/right` | IntersectionObserver-style class toggle (`scroll-animate-visible` added on enter; it stays once added) | Initial `opacity:0; transform: translate(0,100px)` (down: −100 y; right: −100 x; left: +100 x). Visible: `opacity:1; transform:none`. Durations are per element: values cards 0.4/0.8/1.2/1.6 s ease (stagger by duration, no delay); video frame 0.75 s; jobs illustration, benefits card, closing CTA 1 s. Fires when the element is about 750px from the viewport top. |
| Careers decor parallax (`kWWtop`) | Scroll-linked, element in view | `translateY` interpolates linearly from −Y to +Y while the element crosses the viewport (about 0.31 px per px of scroll). Ranges ±55 / ±115 / ±160 / ±162 / ±194 / hero 91→219. Each also has `transition: opacity .3s ease-out`. Optional; implement with a small scroll hook or omit under reduced motion. |
| Careers how-we-work photo | Scroll | Second image opacity 0 → 1 while feature 2 is in view (no transition measured; instant swap). |
| Careers photo strip | Time | `scrollLeft += 60px/s`, infinite. |
| Careers testimonials | Click | `translateY(−380·i)`, `transform .5s` (horizontal on LG/MD/SM). |
| Careers values / About-hero arrow / chevrons | Click | Body height 0.125 s; chevron 0.2 s ease-in-out. |
| About "Get in touch" character | Time | Continuous Lottie-style SVG animation. Replace with a static placeholder. |
| About Slack banner | Scroll | translateY ≈ 107 offset (scroll-linked). Optional. |
| LP hero cover | Hover | rotateY −5° / rotateX 2° → −2° / 1°, shadow −10 → −14, 0.4 s ease. |
| LP FAQ | Click | max-height + margin-top 0.25 s ease-in-out; chevron 180° 0.2 s. |
| LP gated form success | Submit | Overlay opacity 0 → 1 + seconds countdown. |
| Legal TOC | Scroll-spy | Active weight 600; sub-list height/margin 0.2 s ease-in-out. |
| Inputs | Focus | Border colour (all 0.2 s ease-in-out), placeholder 0.15 s ease-out. |
| Buttons and cards | Hover/press | OffsetButton 7px / 120 ms / press 30 ms; LiftCard 14px / 120 ms; job-card arrow −16px (−12px <1302) / 150 ms. |

No load animations, no smooth scrolling (`scroll-behavior:auto`), no GSAP or Lenis. Pause all continuous loops under `prefers-reduced-motion` (README convention `data-motion="continuous"`).

---

## 7. Assets (sizes only; build everything with `<Placeholder>`)

| Route | Asset | Rendered | Natural | Notes |
|---|---|---|---|---|
| About | hero illustration (avif) | 608×299 | 1472×721 | contain |
| About | values-tags illustration | 427×441 | 1104×1140 | contain |
| About | team photo (webp) | 1242×778 | 3720×2325 | cover, 2px border |
| About | investor logos | 5 SVG + 1 PNG, 42 tall | 187×29 PNG | do not reproduce |
| About | Slack banner (avif) | 886×175 | 1968×388 | |
| About | noise bg PNG `noise-bg-dual-gradient.png` | — | — | loaded, not visibly used in main |
| Careers | hero collage | 610×531 | 953×806 | |
| Careers | how-we-work photos ×2 | 426×476 | 674×618 | cover |
| Careers | culture video thumb | 846×476 | 1012×567 | 16:9 |
| Careers | value illustrations ×4 | 156×156 | 238×237 | |
| Careers | world-map illustration | 364×427 | 434×509 | |
| Careers | strip photos ×10 unique | 158–360 tall | 200×180 … 500×332 | S3-hosted |
| Careers | testimonial portraits ×3 | 500×380 | ~410×364, 398×387, 500×464 | real people |
| Careers | closing illustration | 514×417 | 1028×834 | |
| Product expert | form illustration | 272×121 | 461×206 | |
| Product expert | partner logos ×9 | 20–34 tall | PNG | |
| Product expert | sand grid tile | repeat | PNG | rebuild in CSS |
| Support | card icons ×3 | 140×140 | 360×360 | |
| Support | callout duck | 202×230 | 504×575 | |
| LPs | book covers ×4 | 361×472 | 384×497–504 | |
| LPs | postgres terminal / cheatsheet sheet | 480×640 box | 900×672 / 411×293 | contain |
| LPs | success thumbnails | 240 w | 900×472 / 1275×1650 | hidden until submit |
| DuckLake | author photos ×2 | 200×200 | 953×953, 510×496 | real people |
| Book brief | cover | 186×262 | 456×569 | |
| All | footer AICPA/GDPR badges | existing Footer | | |

Fonts: the same set as the homepage (Aeonik Mono/Fono, Inter 300/400/700), all already mapped. The LP-Postgres `ui-monospace` and cheatsheet `SF Mono` are system fallbacks → `font-code`.

**Third-party embeds and services (all to be rebuilt as local static UI or dropped):**
- **HubSpot Forms** (`js.hsforms`, `perf-na1.hsforms.com`) behind every form (product expert, 6 LP heroes + 6 LP bottom forms, book brief).
- **Google reCAPTCHA v2** on product expert (fixed bottom-right badge, 256×60 iframe). Omit it.
- **Ashby** job board (data baked in; links to `jobs.ashbyhq.com`).
- Careers culture **video player** (thumbnail + play button only rendered until click).
- **Lottie-style SVG** animation (About).
- Tracking only, ignore: GTM/GA, Google Ads, LinkedIn, Reddit, Facebook, Apollo, Claydar, HubSpot analytics/banner/CTA.
- No maps, no Greenhouse, no iframes other than reCAPTCHA.

---

## 8. Links

**Internal destinations in scope** (route exists in `src/routes.js`): `/careers#open-positions` (About), `/contact-us/product-expert`, `/support-policy`, `/terms-of-use`, `/privacy-policy`; BI LP links `/product/mcp-server`, `/product/dives`, `/product/hypertenancy`, `/dive-gallery`, `/blog/introducing-embedded-dives`, `/videos/mcp-understand-it-set-it-up-use-it`, `/videos/more-than-a-vibe-ai-driven-sql-that-actually-works`, `/videos/preparing-data-warehouse-for-ai`, `/videos/text-to-sql-data-modeling-llms-mcp-dives` (all match product / blogPost / videoDetail templates); book brief `/blog/big-data-is-dead`. Legal in-page `#anchor` TOC links (keep).

**Internal but NOT in the route inventory** (render as non-links, or ask the orchestrator to add them): `/contact-us/support/` (Contact "Contact Support" card, Support "Getting started" card and callout), `/duckdb-book-summary-chapter1…11` (with and without trailing slash), `/pdf/DuckDBInAction-final-MEAP-chapter7.pdf`, `/learn-more/star-schema-data-warehouse-guide/`, `/learn-more/what-is-a-data-warehouse/`, `/acceptable-use-policy/` (Terms; written as an absolute motherduck.com URL).

**External** (exclude, render as plain text or non-link UI): `slack.motherduck.com` (About, Support), `motherduck.canny.io`, `status.motherduck.com`, `jobs.ashbyhq.com/*` (4), `duckdbsnippets.com` (+ /terms-of-service), `google.com/policies/privacy/partners`, `motherduck.gdprlocal.com/eu|uk`, `arxiv.org/pdf/2506.23719` (BI ×2), all `mailto:` (info@, people@). Absolute `https://motherduck.com/` and `https://motherduck.com/privacy-policy/` links inside legal text should be rewritten to `/` and `/privacy-policy`.

**/docs links:** none inside `main` on these routes (only the shared header and footer, already handled).

---

## 9. Not measurable / caveats
- Careers filter dropdown options and the filtered state were not opened. The open menu style is inferred from the shared `#dropdown-menu` rule (1.5px border, `dropdown-in` 200 ms).
- The video player UI after clicking play was not opened (third-party).
- The About Lottie frames and timing were not extracted (canvas-like SVG animation). Treat it as a static image.
- The LP success overlay was observed only in its hidden state (opacity 0). The redirect countdown copy and timing are not measured.
- The Postgres hero visual and the cheatsheet preview are raster images, so their inner "terminal" text is not DOM.
- Font weights 600/700 requested on Aeonik Mono (LP tabs, Postgres headings) have no loaded face and render as synthetic bold. Fragment Mono with the same `font-weight` reproduces this.
