Source: https://motherduck.com/

# MotherDuck homepage: clone build spec

Measured live with Playwright (Chromium) on 2026-10-23 at viewport widths 1440, 1280, 768 and 390. All values are `getComputedStyle` / `getBoundingClientRect` readings. Anything not measured is marked **UNMEASURED**.

Content policy: we copy the design system and behaviour, not the copy. Marketing text is recorded only as role, character/word count, line count and casing (for example `[166ch/30w], 3 lines @1440`). Short UI labels (nav items, button labels, tab labels) are written out verbatim. Use lorem or neutral placeholder copy of the same length.

Stack of the original: Next.js (pages router) with styled-components, plus a Tailwind build for utility classes. Swiper drives the blog carousel, `mux-player` drives the hero video variant, and a canvas draws the dither strip. No GSAP, Lenis or AOS. There are **no scroll-reveal/entrance animations** on sections: every element is opacity 1 with no transform before scrolling. Motion is limited to hover/press transitions, accordion/tab state, scripted "typing" sims that start when in view, and infinite CSS loops (see the Motion section).

Viewport note: at 1440 the document content width is 1435 (scrollbar). Container math below uses the content width.

---

## 0. Global tokens (drop into `tailwind.config.js`)

```js
// tailwind.config.js -> theme.extend
{
  screens: {            // the original's only layout breakpoints (min-width)
    sm: '500px',        // swiper only
    md: '728px',
    lg: '960px',
    xl: '1302px',
  },
  colors: {
    cream:      '#F4EFEA', // page bg, header bg, secondary buttons
    ink:        '#383838', // all text, all 2px borders, dark fills, footer bg
    sky:        '#97D4FF', // sky sections, primary CTA fill
    'sky-hover':'#6FC2FF', // link hover underline, CTA :active, focus outline
    'sky-dark': '#2BA5FF',
    'sky-tint': '#CEEBFF',
    pink:       '#FEB9E2', // eyebrow banner
    yellow:     '#F9EE3E', // blog section bg, dither pixels
    sun:        '#FFDE00', // integrations sunburst, video "tap for sound" button
    'yellow-chip':'#FAF175', 'yellow-chip-border':'#EBCD00',
    orange:     '#FF9538', // quote marks, logo dots, glow
    peach:      '#FFDCBD',
    mint:       '#B0FFF4',
    coral:      '#FFCBC8',
    garden:     '#16AA98', 'garden-dark':'#068475',
    'gray-600': '#666666', // secondary text
    'gray-500': '#818181',
    'gray-400': '#A1A1A1',
    hairline:   '#D7D7D7',
    'surface-0':'#FFFFFF', 'surface-1':'#FCFCFB', 'surface-2':'#F8F8F7',
    'surface-3':'#F0F0EF', 'sand':'#ECE6DF', 'sand-dark':'#E1D6CB', 'chip-gray':'#E8E8E8',
    clay:       '#D97757', 'clay-hover':'#DD8568',     // chat send button
    term: { bg:'#16161E', line:'#2E2E38', rule:'#34343E', text:'#E8E6EC', dim:'#8B8A96',
            prompt:'#6E6D7A', token:'#A5A0E8', hot:'#E8837A', amber:'#DFA348', caret:'#C9C4EE' },
  },
  fontFamily: {
    // see Fonts below for licensing + substitutes
    fono: ['"Space Grotesk"', '"Aeonik Fono"', 'sans-serif'],          // display headings
    mono: ['"Fragment Mono"', '"Aeonik Mono"', 'ui-monospace', 'monospace'], // UI labels, body default
    sans: ['Inter', 'system-ui', 'sans-serif'],                          // paragraphs, nav, buttons
    code: ['"Source Code Pro"', 'ui-monospace', 'monospace'],
    jet:  ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
  },
  borderRadius: { DEFAULT: '2px', sm: '2px', tip: '4px', md: '8px', tile: '14px', bubble: '16px' },
  boxShadow: {
    'hard-4': '-4px 4px 0 0 #383838',
    'hard-6': '-6px 6px 0 0 #383838',
    'chat-input': '0 4px 20px 0 rgba(0,0,0,0.08)',
    dropdown: '0 4px 8px 0 rgba(0,0,0,0.10)',
  },
  maxWidth: { container: '1302px', 'container-lg': '960px', 'container-md': '728px', lede: '1020px' },
  transitionTimingFunction: { DEFAULT: 'ease-in-out' },
  transitionDuration: { 30:'30ms', 60:'60ms', 120:'120ms', 125:'125ms', 150:'150ms', 200:'200ms', 250:'250ms', 300:'300ms' },
  keyframes: {
    'spin-slow': { to: { transform: 'rotate(360deg)' } },
    'glow':      { from: { opacity: '0' }, to: { opacity: '0.6' } },
    'blink':     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
    'dropdown-in': { from: { top: '100%', opacity: '0' }, to: { top: 'calc(100% + 16px)', opacity: '1' } },
    'rise-in':   { from: { transform: 'translateY(1rem)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } }, // defined on site (toast), unused on homepage
    'wire-flow': { from: { strokeDashoffset: 'var(--from)' }, to: { strokeDashoffset: 'var(--to)' } },
  },
  animation: {
    'spin-slow': 'spin-slow 54s linear infinite',
    'glow': 'glow 4s ease-in-out infinite alternate',
    'blink': 'blink 1s steps(1) infinite',
    'dropdown-in': 'dropdown-in 0.2s ease-out forwards',
  },
}
```

### Layout system
| Range | Container `max-width` | Horizontal padding | Outer margin |
|---|---|---|---|
| ≥1302 | 1302px | 30px | auto (66.5px @1435 content width) |
| 960–1301 | 960px | 20px | auto |
| 728–959 | 728px | 20px | auto |
| <728 | 100% | 24px | 0 |

Content width is 1242 at ≥1302, 920 at 960–1301, 688 at 728–959, and 337 at a 390 viewport.
Most two-column layouts (hero, architecture, quote card, agent section) only go side-by-side at **≥1302**. At 1280 they are already stacked.

### Border / surface language (applies everywhere)
- Borders are almost always `2px solid #383838` with `border-radius: 2px`. Cards are flat. There are no blurred shadows except the chat input and the dropdown.
- **"Offset shadow" press pattern** (buttons, cards): an outer wrapper with `background:#383838; border-radius:2px` contains the inner element at `transform:none`. On hover the inner element gets `translate(X, -X)`, which shows the dark wrapper as a hard shadow at bottom-left. On `:active` it goes back to `translate(0,0)` with a faster transition. The per-component X values are listed below.
- Section dividers: `border-top: 2px solid #383838` on the sky and cream feature sections.
- `::selection` (only rule found): `rgba(255,149,56,0.667)`.
- Root font-size is 16px. `scroll-behavior: auto`. Body `font-family: "Aeonik Mono", monospace; color:#383838; background:#F4EFEA`.

### Fonts (network-loaded) and licensing
| Family on site | Files actually loaded | License | Substitute (Google Fonts) | Compensation |
|---|---|---|---|---|
| **Aeonik Fono** 400 | `/fonts/AeonikMono/AeonikFono-Regular.woff2` | Commercial (CoType Foundry). Do NOT download. | **Space Grotesk 400** | Measured with canvas, 40px uppercase test string: Aeonik Fono 942.1px vs Space Grotesk 927.0px (-1.6%). Add **+0.01em** letter-spacing on top of the measured value. Cap height is identical (0.70em). Lowercase is used rarely (18px card titles are uppercase anyway). |
| **Aeonik Mono** 400 (700 declared, never used) | `/fonts/AeonikMono/AeonikMono-Regular.woff2` | Commercial (CoType). Do NOT download. | **Fragment Mono 400** | 40px uppercase: 1016.8 vs 1013.5 (-0.3%); 16px lowercase: 426.6 vs 425.2. Cap height identical (0.70em). No compensation needed. Second choice: Space Mono (-1.3%). Note that weight 300 is requested in many places but only 400 exists, so it renders as 400. Use 400. |
| **Inter** 300/400/700 (600 declared, not loaded) | `/fonts/Inter/inter-{300,400,700}.woff2` | OFL (free) | **Inter** from Google Fonts | Several elements request weight 500 (no 500 face loaded, so it renders as 400). Use **400** wherever the spec says "500 (renders 400)". Dropdown headings request 600 and render with the 600 face if available (600 is declared but was not loaded on homepage, so it rendered as 700). Use 600. |
| **JetBrains Mono** 400/700 | next/font subset `558ca1a6aa3cb55e-s.p.woff2` | OFL (free) | **JetBrains Mono** (Google) | none |
| Source Code Pro (requested in code blocks) | **not loaded**: falls back to the system monospace | OFL | Load **Source Code Pro** 400/700 from Google, or use `ui-monospace` to match the fallback the site actually renders | none |

Defined CSS vars on `:root` (from the site) worth mirroring: `--header-desktop:80px; --header-mobile:70px; --eyebrow-desktop:40px; --eyebrow-mobile:70px`.

### Type scale (every distinct text role, computed)
Format: family | size/line-height | weight | letter-spacing | transform | color. Values are @1440; responsive overrides are in the Δ column.

| Role | @1440 | Δ 960–1301 | Δ 728–959 | Δ <728 |
|---|---|---|---|---|
| H1 hero | Fono 44/48 400, ls normal, UPPER, ink | 44/48 | 40/43.6 | 28/30.52 |
| H2 section (default) | Fono 40/48 400 UPPER | 32/38.4 | 32/38.4 | 28/33.6 |
| H2 "architecture" section (only this one is **Aeonik Mono**) | Mono 40/48 400 UPPER | 32/38.4 | 32/38.4 | 28/33.6 |
| H2 agent-native section | Fono 40/48, ls 0.8px (0.02em) | 36/43.2 ls .72 | 36/43.2 | 28/33.6 ls .56 |
| H2 blog section | Fono 40/48 | 36/43.2 | 30/36 | 30/36 |
| Lede (hero) | Inter 18/28.8 300 ls .36px (0.02em) | same | same | 16/25.6 ls .32 |
| Lede (section intro, max-width 1020) | Inter 20/32 300 ls .4px | 16/25.6 ls .32 | 16/25.6 | 16/25.6 |
| Section sub (customers/agent/integrations) | Inter 16/22.4 400 ls .32 (integrations: 300) | same | same | same |
| Blog sub | Inter 16/22.4 400 ls normal, padding-top 8 | 15/21 | 15/21 | 15/21 |
| Nav link (desktop) | Inter 14/19.2 400 ls .32px, labels typed in caps | n/a (hamburger) | n/a | mobile menu: Inter 16/19.2 |
| Button label | Inter 14/16.8 400 UPPER, ls normal | same | same | same |
| Small UI label / eyebrow chip | Mono 12/16 400 UPPER, color #666 or ink | same | same | same |
| Accordion title | Mono 18/21.6 400 UPPER | 16/19.2 | 16/19.2 | 16/19.2 |
| Accordion body | Inter 16/25.6 300 ls .32 | same | same | same |
| Product card H3 | Fono 32/38.4 UPPER | 24/28.8 | 24/28.8 | 24/28.8 |
| Product card body | Inter 16/22.4 300 ls .32 | same | same | same |
| Diagram card title | Mono 14/16 300(→400) ls .28 UPPER | same | n/a | n/a |
| Diagram card body | Inter 12/16.8 300 ls .24 #666 | | | |
| Diagram pill label | Inter 12/12 400 UPPER | | | |
| Quote blockquote | Inter 20/32 300 | 18/28.8 | 18/28.8 | 18/28.8 |
| Quote mark | Mono 48/48 #FF9538 | 56/56 | 56/56 | 56/56 |
| Quote name / role | Inter 14/19.6 700 ls .28 ink / 300 #666 | | | |
| Customer big quote | Inter 20/32 400 ls .4 | 18/28.8 ls .36 | same | same |
| Customer stat number | Fono 56/67.2 ls 1.12 (0.02em) UPPER | 48/57.6 ls .96 | 48/57.6 | 40/48 ls .8 |
| Customer small text | Inter 16/22.4 400 ls .32 | | | |
| Integrations bar title | Mono 20/24 UPPER white | 14/16.8 | 14/16.8 | 14/16.8 |
| Agent card H3 | Mono 18/21.6 400 ls .36 UPPER | same | same | same |
| Agent card link | Inter 14/11.2 400 UPPER | | | |
| Blog card type chip | Mono 12/12 UPPER, bg #E8E8E8, 2px #A1A1A1 border, p 4px 6px, r 2 | | | |
| Blog card H3 | Fono 18/22.5 UPPER | 16/20 | 16/20 | 16/20 |
| Blog card meta | Inter 12/16 300 #666 | | | |
| Tooltip | Inter 12/16 400 white on #383838 | | | |
| Footer col heading | Inter 16/25.6 700 ls .32 white | 14/22.4 ls .28 | same | same |
| Footer link | Inter 16/20.8 300 white | 14/18.2 | 14/18.2 | 14/18.2 |
| Footer legal | Inter 14/19.6 300 ls .28 white; link spans #F8F8F7 | | | |
| Eyebrow banner | Fono 12.5/15 400 UPPER #000 centered | | | 12.5/17.5 (wraps to 2 lines) |

### Motion timings (global)
| Token | Value | Used by |
|---|---|---|
| press-hover | `transform 120ms ease-in-out` | CTA buttons, product/quote/customer/blog/agent cards |
| press-active | `transform 30ms ease-in-out` (buttons) / `60ms` (cards) | :active return to 0,0 |
| tooltip | `opacity 150ms ease-in-out` | icon tooltips |
| diagram card | `transform, box-shadow, background-color 150ms ease-in-out` | platform diagram cards |
| icon tile | `transform, box-shadow 200ms ease-in-out` | integration and tool icon tiles |
| header | `border-bottom, background-color 200ms ease-in-out` | sticky header |
| eyebrow | `height, margin-top, padding 200ms ease-in-out` | eyebrow banner |
| chevron | `transform 200ms ease-in-out` (rotate 180°) | nav dropdown chevrons |
| accordion card | `background-color, box-shadow 200ms ease-in-out` | architecture accordion |
| accordion body | `max-height 250ms ease-in-out` | architecture accordion |
| dropdown enter | `dropdown-in 200ms ease-out forwards` | desktop mega menus |
| tabs | `background-color 125ms ease-in-out` | agent client tabs |
| mobile menu | `right 200ms ease-in-out, opacity 500ms ease-in-out, visibility 0s linear 500ms` | mobile nav panel |
| mobile submenu | `height 150ms ease-in-out` | mobile nav accordions |
| swiper | 300ms, `ease` | blog carousel |
| dropdown item | `background-color 200ms ease` / `color 200ms ease` | mega-menu links |

---

## 1. Page skeleton and section order

```
<a skip-link href="#main-content">          (visually hidden; focus: static, white bg, 2px ink border, px 20 py 12, 16/24, underline, outline 2px #2BA5FF offset 2)
<div wrapper style="padding-top: var(--header-total)">   122 / 112 / 142 px (≥1302 / 728–1301 / <728)
  <header fixed>          §2 Eyebrow + Navbar
  <main>
    §3 Hero                      cream
    §4 Architecture              sky,   border-top 2px
    §5 Platform                  cream, border-top 2px
    §6 Integrations              cream (grid texture bottom)
    §7 Customers                 sky,   border-top 2px
    <div> §8 Agent-native (sky) + §9 Blog (yellow) </div>
  </main>
  <footer> §10 Footer            ink
```

Measured section boxes @1440 (top y / height): hero 122/652, architecture 774/1169, platform 1943/1655, integrations 3598/1263, customers 4862/848, agent-native 5710/865, blog 6575/734, footer 7309/1007–1021. Total document height is 8315–8330.

---

## 2. Header (fixed) = Eyebrow banner + Navbar

**Header element:** `position:fixed; top:0; left:0; right:0; z-index:99; background:#F4EFEA; border-bottom:2px solid transparent`.
- **Scroll behaviour:** at `scrollY>0` the border-bottom becomes `#383838` (transition 200ms ease-in-out). The header never hides or shrinks; it stays the same height while scrolling up or down.
- A `::before` (absolute, bottom -2px, full width, height `calc(var(--header-desktop)+2px)` ≥1302 else `calc(var(--header-mobile)+2px)`, bg-image noise texture @250px, opacity 0, transition opacity 200ms). It stayed at opacity 0 in every state tested. Optional; can be omitted.
- Total height: 122 (≥1302) = 40 eyebrow + 80 nav + 2 border; 112 (728–1301) = 40 + 70 + 2; 142 (<728) = 70 + 70 + 2.

### 2a. Eyebrow banner
- `display:flex; align-items:center; height:40px` (<728: 70px); bg `#FEB9E2`; `border-top/bottom: 2px solid #383838`; overflow hidden.
- Inner: centered flex row, padding 0 10px, `transform: translateY(1px)`.
- Text: Fono 12.5/15 UPPER #000, centered, `[56ch/12w]`, 1 line (2 lines <728, lh 17.5). It starts with an emoji glyph.
- Then an 8px spacer (6px <728) and an inline link `[35ch/6w]` UPPER with a 1px solid #000 bottom border on the label span (padding-bottom 1px) and a 18×18 right-arrow icon (16×16 <728), gap 6px.
- Link hover: underline color stays #000; arrow path fill → #000 on active.

### 2b. Navbar row (inside container)
- Row: `display:flex; justify-content:space-between; align-items:center; padding:12px 0; height:80px` (70px below 1302).
- **Left group** (flex, gap 40px): logo, then the desktop nav.
  - Logo: inline SVG wordmark + duck mark, viewBox `0 0 210 37`, rendered **174×31** (≥1302) / **154×27** (<1302) / footer 210×37 (185×33 <728). Inside a `<button aria-label="Motherduck home">`. Placeholder: same-size SVG.
  - Desktop nav (`≥1302` only; hidden below): flex row, gap **24px**, align center.
    - Items: `PRODUCT ▾`, `COMMUNITY ▾`, `COMPANY ▾` (buttons), `DOCS`, `PRICING`, `CONTACT US` (links).
    - Label: Inter 14/19.2 400 ls .32px ink. Label span has `padding:1px 0; margin-bottom:1px; border-bottom:1px solid transparent`. Wrapper has `margin-bottom:-4px`.
    - Dropdown items: label + 20×20 chevron (viewBox 24, stroke ink), gap 8px. The chevron rotates to `rotate(180deg)` when open (transition transform 200ms ease-in-out).
    - **Hover:** label span `border-bottom: 0.09em solid #383838; margin-bottom:1px` (underline). **Active:** underline color `#6FC2FF`.
- **Right group** (≥1302): flex, gap 24px.
  - `LOG IN`: same style as the nav links.
  - `START FREE` CTA: **primary offset button** (spec §2d), 123×44.
- **<1302:** both navs hidden; a hamburger button 24×21 (svg 24×15, three 2px #383838 strokes) is shown right-aligned. When open its aria-label becomes "Close menu" (icon swaps to close; exact icon geometry UNMEASURED).

### 2c. Desktop mega-menu dropdowns (open on **click**, not hover)
- Panel: `position:absolute; left:-20px` relative to the nav item; animates `dropdown-in` (top 100% → calc(100% + 16px), opacity 0→1, 200ms ease-out forwards). z-index 3. bg #fff, `border:2px solid #383838`, shadow `0 4px 8px rgba(0,0,0,.1)`, radius 0. Only one is open at a time; clicking the same button closes it.
- **PRODUCT** (852×476): two columns.
  - Main column 648 wide: section headings (`USE CASES`, `FEATURES`, `COMPARISONS`) in Inter 10/14 600 UPPER #818181, padding 20 20 0.
  - Link grid: 2 cols × 316px, padding 12 8 8. Each item is a flex row, gap 12, padding 12, with a 32×32 icon, a title (Inter 14/22.4 400 ls .196 ink) and a sub line (Inter 12/16.8 #818181). Height 63.
  - Dividers: 2px #F1F1F1.
  - Comparisons row: heading plus a `NEW` badge (Mono 10/10 600 ls .5 UPPER, bg #FFFBB6, padding 2 6, r 3) and a right-aligned `See all →` (Inter 12/12 #818181, color transition 200ms). A 3-col grid of 192px with gap 8/16 holds 6 links (Inter 14/22.4 500 ink).
  - Side column 200 wide, bg #F8F8F7: `MORE` heading (padding 20 20 12) and 5 links (Inter 14/22.4, padding 12 20, height 46).
  - Item hover: bg `#F1F1F1` (200ms ease). Sub-text hover color `#383838`.
- **COMMUNITY** (736×336): main column 332 with 5 icon links, plus two side columns of 200 (bg #F8F8F7) with 6 links each.
- **COMPANY** (367×336): single column with 5 icon links (title + sub).

### 2d. Primary / secondary offset buttons
- Wrapper: `background:#383838; border-radius:2px` (same size as the button).
- Button: `display:flex; gap:8px; align-items:center; justify-content:center; padding:11.5px 18px; border:2px solid #383838; border-radius:2px; height:44px; transition: transform 120ms ease-in-out`.
- Primary bg `#97D4FF`; secondary bg `#F4EFEA`. Label Inter 14/16.8 400 UPPER ink. Optional trailing 20×20 arrow icon (margin -2px 0).
- **Hover:** `transform: translate(7px,-7px)`. **Active:** `transform:none` (30ms); primary bg `#6FC2FF`, secondary bg `#E1D6CB`.
- Hero sizes: `Try 7 Days Free →` 186×44, `Book a Demo` 139×44. <728: both full-width (337) stacked, gap 8.

### 2e. Mobile / tablet menu (<1302)
- Panel: `position:absolute; top:<header-height - 2>px (110 / 140); left:100% → 0; width:100%; height:calc(100vh - header); background:#F4EFEA; padding:32px 0 56px; overflow:auto`. Transition `right 200ms ease-in-out, opacity 500ms ease-in-out, visibility 0s linear 500ms`. Opening locks page scroll (`html{overflow:hidden}`).
- Inner nav: flex column, gap 32px, padding-bottom 40px, inside container padding.
  - Accordion groups `PRODUCT`, `COMMUNITY`, `COMPANY`: Inter 16/19.2 ls .32 with a chevron. Collapsed height 25. Expanding animates `height 150ms ease-in-out`. Children are a column with gap 24, each item Inter 16/25.6 400 ink, padding 0 4, gap 8 to an optional 20px icon. Item hover: `font-weight:600; letter-spacing:0.01em`.
  - Then `DOCS`, `PRICING`, `CONTACT US`, `LOG IN` links (Inter 16).
  - Then `START FREE` primary button (123×44), margin-left 1px.

---

## 3. Hero (`section`, bg #F4EFEA, overflow clip)

**A/B test:** cookie `md_homepage-hero-media-variant` = `control` | `video`. The local saved copy and our build target is **control** (tabbed product sim). The video variant is documented at the end of this section.

### Layout
- Container: flex column, gap 48. Padding **48 30 64** (≥1302), 48 20 64 (960–1301), 32 20 48 (728–959), 32 24 48 (<728). (Video variant at ≥1302: padding 100 30 118.)
- Row: ≥1302 `flex-direction:row; align-items:center; gap:80px`; height 540. Left column max-width **560**; right media is **600** wide. Below 1302: column, `align-items:flex-start`, gap 40; the media goes full container width (920/688/337).
- Section height @1440: 652.

### Left column (flex column, gap 40 ≥1302 / 32 / 32 / 24 <728)
1. **Text block** (flex column, gap 24):
   - Heading group (gap 20): **H1** `[31ch/5w]` UPPER, 2 lines @1440 (560 wide), 1 line @1280, 2 lines @768/390. **Lede** `[166ch/30w]` sentence case, 3 lines @1440, 5 lines @390.
   - CTA group (flex column, gap 12):
     - Buttons row: flex, gap 16, wrap (<728: column, stretch, gap 8). Buttons: primary `TRY 7 DAYS FREE →`, secondary `BOOK A DEMO` (§2d).
     - Agent line: flex, gap 8, wrap. A label `[32ch/6w]` in Inter 12/16 500 (renders 400) #666, then the `COPY PROMPT` button: flex, gap 6, padding 2, margin -2, r 2. It holds three 14×14 agent logo glyphs (gap 5), the label in Inter 12/12 400 UPPER ink, and a 14×14 copy icon. Hover: label underline, offset 0.2em. Click behaviour (copy to clipboard and any feedback) is UNMEASURED.
2. **Logo strip** (flex column, gap 16):
   - Label row: `TRUSTED BY BUILDERS` (Mono 12/16 UPPER #666), then a 1px hairline (#D7D7D7) that fills the remaining width, gap 16.
   - Logos: max-width 450 (337 <728); `display:flex; flex-wrap:wrap; gap:16px 32px; align-items:center` (<728: `justify-content:space-between; gap 16`). 6 customer logos at height 24 (heights in the manifest). Five of them are links, and each linked logo gets a **6×6 orange dot** (`#FF9538`, r 50%) absolutely positioned at top -3px, right -14px.
   - Hover (≥960): a tooltip `<summary>` appears (`display:block`) at top calc(100%+8px), left 50%: bg #383838, padding 6 6 6 8, nowrap, z 1, with an 8×8 #383838 `::before` nub at bottom calc(100% - 4px). Tooltip text is about 14 chars. Its font and colour inside are UNMEASURED (the container reports Mono 16/16).

### Right column: "interface examples" product sim (control variant), 600×540 @1440
- Wrapper: bg #F4EFEA, r 2, overflow hidden, flex column. (<728: margin 0 -2px.)
- **Tab bar** (role tablist), height 34, flex-wrap. Tabs `ASK (MCP)`, `SQL`, `PYTHON`, `CLI`: Mono 12/16 UPPER, padding 8 20, `border:2px solid #383838`, margin `0 -2px -2px 0` (borders overlap), height 36. Selected tab: bg #383838, text #fff. Unselected: transparent bg, text #666. There is no CSS hover rule (hover keeps the same colours). Tabs do **not** auto-rotate (checked over 20s).
- **Panel** 600×470: padding 16 20, `border:2px solid #383838`, overflow hidden. Background depends on the tab: ASK `#FCFCFB`, SQL `#383838`, PYTHON `#FCFCFB`, CLI `#1E1E24`.
- **Status bar** 600×36: flex, space-between, padding 8 20, bg #F4EFEA, borders 0 2 2 2 #383838. Left: an 8×8 dot #16AA98, `CONNECTED` (Mono 12/16 300 ls .24 UPPER), gap 8, and a region chip (Mono 10/12 UPPER, padding 2 8, bg #FAF175, `2px solid #EBCD00`, r 2).

**ASK (MCP) tab content** (flex column, gap 12):
- User bubble: right-aligned, max-width 400, padding 8 16, bg #F0F0EF, radius `16px 16px 2px 16px`. Text Inter 14/20 300 ls .28 `[52ch/8w]`.
- Step rows: an 18×18 icon slot (duck mark or orange asterisk SVG), gap 12, text Inter 12/19.2 300 ls .24 (#666 for tool names, ink for narration). Between steps there is a 22px-wide rail with a 1×8px #D7D7D7 line.
- Tool card: bg #fff, r 8, padding 4 8 8 2, gap 4. Its header is "MotherDuck Query". The inner request box is bg #fff, `0.5px solid #D7D7D7`, r 8, padding 8. Inside that, a bg #F8F8F7 block (r 6, padding 8 12, gap 8) holds the label `Request` (Inter 10/16 500 ls .2) and a `<pre>` SQL of 5 lines in Source Code Pro (fallback mono) 12/15.6, colour **#16AA98**. A vertical rail 1px #D7D7D7, 156 high, runs at left.
- Answer row: Inter 14/20 300, 2 lines.
- Chat input card: bg #fff, `0.5px solid #D7D7D7`, r 16, padding 12, shadow `0 4px 20px rgba(0,0,0,.08)`, gap 12, border-color transition 120ms. `:focus-within` border is #A1A1A1. It holds a textarea (placeholder "Ask a follow-up about your data…", padding 4 0 0 6), a status dot 8×8 #16AA98 at top 10 right 10, and a toolbar row (space-between). Toolbar left: a 28×28 "+" button, r 8. Toolbar right (gap 8): a model selector (Inter 12/19.2 300, padding 0 12, r 8, 11px chevron at opacity .75), a 28×28 settings icon, and a 28×28 **send** button (bg #D97757, r 8, white 16px up-arrow; hover bg #DD8568).
- **Typing sim (measured timeline after clicking the tab; also plays on page load):** t=0 user bubble shown → ~500ms step 1 appears → ~1000ms step 2 text streams at about 65 chars/s → ~2100ms tool card appears and the SQL streams at about 180 chars/s → ~3000ms answer streams at about 60 chars/s → done at ~5000ms. It plays once per tab activation and does not loop.

**SQL tab:** bg #383838 panel holding a single `<pre>` in Source Code Pro (fallback) 12/19.2 with colour roles: comment #A1A1A1, keyword #97D4FF, function/number #FAF175, string/identifiers #53DBC9, plain #F8F8F7. About 15 lines.

**PYTHON tab:** a notebook-style card: bg #fff, `1px solid #CDD9F8`, r 3.
- Toolbar 32 high: a kernel chip (bg #F0F4FD, `1px solid #AFC0F2`, r 3) and a right label (Inter 12/19.2 300 #666).
- Code area: gutter of line numbers (Mono 12/16.8 #666, padding 0 14 0 16) and code in Mono 12/16.8 ink, with token colours #494AB9 and #05635A. 6 lines.
- Output header row: `1px rgba(0,0,0,.1)` top border, Inter 12/19.2.
- Result table: bg #FCFCFD, 1px #E8E8E8 top border, header row 28 high, body rows 24 high, cells padding 0 8. Column widths 36 / 200 / 130 / rest. Body cells are white. Numeric cells use Source Code Pro 12/24 300.

**CLI tab:** bg #1E1E24 terminal, Mono 12/19 throughout.
- Prompt glyph #9A9AA5 (yellow #FFDE00 for the second prompt), command #F8F8F7, dim lines #9A9AA5.
- Result is an ASCII-style table: box `1px solid #6E6E7A`, 370 wide, 2 cols (240 + 128), rows 19 high, padding 0 8.

### Video variant (`md_homepage-hero-media-variant=video`)
- The media box is 600×339 (16:9): `border:2px solid #383838; background:#383838; r 2; overflow hidden`.
- `mux-player` absolutely fills it (596×335): autoplay muted, loop, 1280×720 source, 91.4s, accent `#FF9538`.
- Overlay button `TAP FOR SOUND`: absolute left 16, bottom 56. Inter 12/12 500 UPPER ls .24, padding 8 14, bg #FFDE00, `2px solid #383838`, r 2, flex gap 8 with a 16px muted-speaker icon. Hover: bg #F9EE3E and `translateY(-1px)`, transition `transform 150ms, background-color 150ms`. Focus-visible: outline 2px #6FC2FF, offset 2.
- Use a same-size placeholder (poster frame) if building this variant.

---

## 4. Architecture section (bg **#97D4FF**, `border-top:2px solid #383838`, overflow clip)

- Padding: **80 0 180** (≥1302), 80 0 88 (728–1301), 56 0 64 (<728).
- **Decorative clouds** layer: an absolutely positioned 1440-wide box centred via `left:50%; translateX(-720px)`. It holds 3 outline cloud SVGs (viewBox `0 0 86 40`, fill #fff, stroke #383838 0.7–0.9px):
  - 300×140 at left 25 / top 762;
  - 171×80 at left 1209 / top 100, flipped `scale(-1,-1)`;
  - 389×181 at left 1141 / top 966 (bottom 20), flipped.
  - All are hidden <728. They are generic shapes and can be redrawn.
- Content (z 1):
  - **H2** `[27ch/3w]` UPPER, **Aeonik Mono** (→ Fragment Mono), 1 line @1440, 2 lines <728.
  - **Lede** `[147ch/19w]`, margin-top 12, max-width 1020, 2 lines @1440.
- **Body row** (margin-top 56; 32 below 1302): ≥1302 `flex-direction:row; gap:64; align-items:stretch` with accordion column 400 and diagram 778 (flex 1). Below 1302: column, gap 64 (16 <728).

### Accordion (single-open, click toggles; no auto-advance)
- Column: flex, gap 16. 4 items; item 1 is open by default.
- Item card: `border:2px solid #383838; r 2`, transition `background-color, box-shadow 200ms ease-in-out`.
  - **Open:** bg #fff, `box-shadow:-4px 4px 0 0 #383838`.
  - **Closed:** bg #F8F8F7, no shadow.
- Header button: flex, space-between, align center, gap 12, padding **24** (<728: 24 12), height 70 (68). Title is Mono 18/21.6 UPPER (16/19.2 below 1302), 1 line, about 19–24 chars. The trailing indicator is the text glyph `+` (closed) or `-` (open) in Mono 20/20.
- Body: wrapper `overflow:hidden; transition:max-height 250ms ease-in-out` (0 when closed). The paragraph is Inter 16/25.6 300 ls .32, padding 0 24 24, about 120–151 chars, 4–5 lines @400 wide.
- Item heights @1440: open 174, closed 74.

### Diagram (right, 778×510 @1440)
- **Wire diagram SVG** (viewBox `0 0 746 432`, rendered 778×451, margin-bottom -45, z 2). It shows 4 white top cards (160×134 / 160×104, rx 2, at x 12/199/387/574 in viewBox units). Each card has a coloured label chip, small duck + gear icons, and a size label: `YOU` sky / `TEAMMATE` yellow / `DBT PIPELINE` orange / `AGENTS` mint. Size labels are `PULSE`, `STANDARD`, `JUMBO`, and three small `PULSE` for agents, on dark #383838 chips with white text. Wires run from each card down into a shared "database" cylinder (glass cylinder, clouds, file-box mascot illustration).
  - **Animated wires**: each wire is 3 stacked paths with `stroke-linecap:round`:
    - halo: 9px, opacity .24, blurred by a `feGaussianBlur stdDeviation=2.5` filter;
    - main: 5px;
    - core: 1.75px.
  - Strokes use radial gradients (r=110): white at 0–48%, then the colour at 100%. Wire colours: agents `#16AA98` (core `#B0FFF4`), you `#2BA5FF` (core `#CEEBFF`), teammate `#EBCD00` (core `#FFF8B0`), dbt `#FF9538` (core `#FFDCBD`).
  - Dashes flow with `stroke-dashoffset` keyframes, **linear, infinite**:

| wire | duration | halo dasharray (offset from→to) | main dasharray | core dasharray |
|---|---|---|---|---|
| agents | 312.5ms | 32.94 20.19 (53.125→0) | 18.06 35.06 (38.25→-14.875) | 8.5 44.63 (28.69→-24.44) |
| you | 625ms | 51.68 31.68 (83.36→0) | 28.34 55.02 (60.02→-23.34) | 13.34 70.02 (45.02→-38.35) |
| teammate | 1250ms | 81.10 49.71 (130.81→0) | 44.48 86.33 (94.18→-36.63) | 20.93 109.88 (70.64→-60.17) |
| dbt pipeline | 2500ms | 127.26 78.00 (205.26→0) | 69.79 135.47 (147.79→-57.47) | 32.84 172.42 (110.84→-94.42) |

  - The underlying illustration (ducks, cylinder, mascot, clouds) is artwork: use a **same-size placeholder SVG** and keep the animated wires.
  - **<728:** a vertical variant SVG is used instead, 337×742 (viewBox 327×720), stacking the same nodes vertically.
- **Storage stack** (below the SVG, 778×104 container):
  - 3 stacked plates: back plate inset 16px left/right, 16px lower; middle plate inset 8/8; both bg #ECE6DF with `2px solid #383838`, r 2.
  - Front plate (z 1, height 88): bg #F4EFEA, 2px border, flex centre, padding 0 24. It holds a column with gap 10:
    - chip `SHARED STORAGE` (Mono 12/16 UPPER, padding 4 8, bg #CEEBFF, `2px solid #2BA5FF`, r 2);
    - a row (gap 8) of 4 items, each a 16×16 icon + label in Inter 12/16 500 (renders 400) UPPER #666, gap 8: `DUCKLAKE`, `DIFFERENTIAL STORAGE`, `APACHE ICEBERG`, `OBJECT STORAGE`.
  - <728: front plate is 142 high, padding 40 24 28, content left-aligned and wrapped.

### Quote card (margin-top 56; 24 below 1302)
- Offset-shadow link: wrapper `a` bg #383838, r 2; inner `figure` bg #fff, `2px solid #383838`, r 2, transition transform 120ms. **Hover (≥960): `translate(15px,-15px)`.**
- ≥1302 figure: flex row, align center, gap 40, padding 32 40, height 161. Below 1302: column, gap 32, padding 26 18.
- Quote block: row with gap 24 (column with gap 16 below 1302):
  - `“` glyph: Mono 48/48 #FF9538, margin -10 0 0 -10 (56/56 below 1302, overflow hidden, 35×28 box);
  - blockquote: Inter 20/32 300 (18/28.8 below 1302), `[172ch/24w]`, 2 lines @1440, 6 lines @390.
- Figcaption: column, gap 12. Company logo 156×40 (object-fit contain, position 0% 50%). Name and role in a column with gap 2: name Inter 14/19.6 700 ls .28; role Inter 14/19.6 300 #666 `[28ch/4w]`.

---

## 5. Platform section (bg #F4EFEA, `border-top:2px solid #383838`, overflow clip)

- Padding-top **100** (80 for 728–1301, 56 <728), padding-bottom 0.
- **H2** `[46ch/7w]` UPPER (1 line @1440, 3 lines @390). **Lede** `[109ch/18w]`, margin-top 12, max-width 1020.

### Isometric platform diagram (margin-top 56)
There are three separate DOM variants, absolutely positioned inside a relatively positioned box:
| Range | Box | Notes |
|---|---|---|
| ≥1302 | 1240×634 (max-width 1240) | full layout, measured below |
| 728–1301 | 688×575 (max-width 688, centred) | compact; slab labels 12.2/14.64 |
| <728 | 327×1302 (max-width 327, margin 0 5) | vertical; slab labels 10.5/12.6 |

**Desktop layout (coordinates relative to the 1240×634 box):**
- **Isometric slabs** (generic, recreate as SVG): 4 rhombus "slabs", each 276×147 (viewBox 278×149) with top face #818181, side faces #575757, and a 2px #383838 outline.
  - Centre column, stacked bottom to top at top = 389 (SHARED STORAGE), 282 (COMPUTE · DUCKLINGS), ~196 (GUIDES · AGENT CONTEXT), plus two slabs side-by-side at the top (TOOLS & LANGUAGES at left ~238, AGENT INTERFACES at left ~520).
  - Labels are white Fono 18/21.6 UPPER (AGENT CONTEXT at 16/19.2), skewed onto the faces: the left face uses `matrix(0.935,0.353,-0.044,0.999,0,0)` and the right face uses `matrix(0.935,-0.353,-0.044,1.0,0,0)`. Separators `-` and `&` sit between the two words.
- **Connector lines**: 2px #383838 curved SVG paths from slabs to cards (no animation).
- **Cards** (all `bg #fff; border:2px solid #383838; r 2`; transition `transform, box-shadow, background-color 150ms ease-in-out`; flex):
  1. **Tools & Languages**: 392×112 at (0,0), column, gap 12, padding 16 16 16 12.
     - Title `TOOLS & LANGUAGES` in Mono 12/16 UPPER.
     - A row of 7 icon tiles, each 48×48 (bg #fff, `1px solid #383838`, **r 8**, 30×30 logo, gap 4).
     - Tile hover: `translate(2px,-2px)` + `box-shadow:-4px 4px 0 #383838` (200ms), and a tooltip fades in above (see §6 tooltip).
  2. **Dives** card: 244×112 at (0,120). Row, gap 8, padding 16 16 16 12. 32×32 icon. Title Mono 14/16 UPPER, desc Inter 12/16.8 300 #666 (2 lines). `GET STARTED →` (Inter 12/12 UPPER, gap 2) bottom-right. Hover: title underline.
  3. **Flights** card: 244×112 at (0,239), same pattern.
  4. **Storage** card: 244×276 at (154,358). Column, gap 12, padding 16. Title, then 5 pill links 208×36 (bg #F4EFEA, `2px solid #383838`, r 2, padding 8 16, Inter 12/12 UPPER, centred, gap 8, 18px icon): `APACHE PARQUET`, `APACHE ICEBERG`, `DUCKLAKE`, `DIFFERENTIAL STORAGE`, `CLOUD OBJECT STORAGE`. Each pill is 44px apart.
  5. **Interfaces** card: 320×100 at (928,7). 40px icon + title + 3 pills (`MCP`, `CLI`, `REST`; 91/83/66 wide, h 36), gap 4.
  6. **Guides** card: 244×112 at (937,154), same as Dives.
  7. **Scale up or out** card: 341×294 at (900,285). Column, gap 12, padding 16. Title (Mono 14), sub (Inter 12/16.8 #666). Then a table of 5 rows, each 42 high with `border-bottom:2px solid #383838` (the first row also has a top border). Each row's coloured label cell has padding 12 20, gap 8, a 22px duck+gear icon, and Inter 14/14 UPPER text:
     - `GIGA` bg #FFCBC8 width 98
     - `MEGA` #B0FFF4 width 105
     - `JUMBO` #CEEBFF width 115
     - `STANDARD` #FFCBC8 width 139
     - last row: 3× `PULSE` cells (#B0FFF4, 109 wide each, 2px right border); the third is cut off by the card's overflow and fades (as seen in the screenshot).
- Compact (728–1301) and mobile variants use the same components with smaller paddings: diagram card padding 12, gap 8. Exact per-card coordinates are in the walk data; recreate proportionally.

### Product cards (3-up), margin-top 56
- ≥960: CSS grid `repeat(3, 1fr)`, gap 24 (398px each @1440, 291 @1280). Below 960: flex column, gap 24, each max-width 450 and centred (768); full width <728.
- Each card: `<article>` wrapper bg #383838 (shadow layer) with an inner `a`, flex column. Gap 32 (24 below 1302), padding 32 24 (16 10 below 1302), `2px solid #383838`, transition transform 120ms. **Hover (≥960): `translate(10px,-10px)`; active `translate(0,0)` 60ms.**
  - Card bgs: 1 **#FFDCBD** (peach), 2 **#CEEBFF** (sky tint), 3 **#B0FFF4** (mint).
  - Corner icon tab: 44×44 absolutely at top-right, bg #F4EFEA, borders `0 0 2px 2px #383838`, 28×28 icon.
  - **H3** (single word, UPPER) Fono 32/38.4 (24/28.8 below 1302).
  - Body `[101–114ch]`, 3 lines.
  - Screenshot frame: bg #fff, `2px solid #383838`, overflow hidden, 346×169 @1440. Image 342×165, object-fit contain.
  - `LEARN MORE →` (Inter 14/16.8 UPPER) at the bottom.

### Quote card 2 (margin-top 56)
Same component as §4: 1242×196 @1440. Blockquote `[336ch/53w]`, 4 lines. Logo 156×40. Hover: translate(15,-15).

---

## 6. Integrations section (bg #F4EFEA, overflow clip)

- Padding **220 0 120** (≥1302), 96 0 88 (728–1301), 96 0 64 (<728).
- **Grid texture** at the bottom: an absolute layer pinned to the section bottom (height 640 @1440, 220 below 1302, z 0) with `background-image` (a transparent grid PNG), `background-size:480px auto; background-position:50% 100%; background-repeat:repeat`.
  - **Generic, recreate in CSS:** line colour `rgb(225,214,204)` at about 0.84 alpha, line width about 1.5px, cell about 43.6px wide × 42.9px tall, fading out toward the top.
  - Suggested CSS: `background-image: linear-gradient(rgba(225,214,204,.84) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(225,214,204,.84) 1.5px, transparent 1.5px); background-size: 43.6px 42.9px; mask-image: linear-gradient(to top, #000 60%, transparent)`. The fade amount is approximated from the screenshot.
- Decorative clouds: 3 outline clouds (viewBox 86×40) at top -150 (190×88 left -30; 272×127 centre-left 571; 190×88 right -20).
- **Header block** (flex column, centred, gap 8, margin-bottom 56; 64 below 1302):
  - H2 `[28ch/6w]` centred;
  - sub `[92ch/17w]` Inter 16/22.4 300 centred;
  - link `VIEW ALL INTEGRATIONS →` (Inter 16/19.2 ls .32 with an underline span, 20px arrow) with margin-top 32. Text-link hover: underline colour `#6FC2FF` (`calc(0.09em + 1px)` border-bottom).
- **Arc** (1242×560 @1440; scales with width at aspect 2.218: 920×415, 688×310, 337×152):
  - Background SVG (viewBox `0 0 1440 649`): concentric half-rings. Circles alternate fill #ECE6DF / #F4EFEA with stroke #E1D6CB 1.75px. 5 radial spokes are `line`s, stroke #E1D6CB 1.5px, opacity .7. Generic: recreate.
  - **Sun** (centred at 50% x, 68.4% y; size 30% of the arc width = 373px @1440):
    - rays layer inset -30%: `border-radius:50%; background: repeating-conic-gradient(#FFDE00 0deg 5deg, rgba(255,222,0,0) 5deg 30deg)`, **rotating 360° over 54s linear infinite**;
    - core glow inset -2%: `radial-gradient(circle, #FFDE00 0%, rgba(255,222,0,0) 70%)`;
    - orange glow inset -2%: `radial-gradient(circle, #FF9538 0%, rgba(255,149,56,0) 62%)`, **opacity 0→0.6, 4s ease-in-out infinite alternate**.
  - **11 icon tiles**: 72×72 (scales to 10% of arc width: 69 @688, 34 @337) centred on their point with `translate(-50%,-50%)`. Tile bg #fff, `1px solid #383838`, **r 14**, 40×40 logo. Hover: `translate(3px,-3px)` + `box-shadow:-6px 6px 0 #383838` (200ms). Positions (centre, % of arc box):

| tile | left | top |
|---|---|---|
| 1 | 50.00% | 6.90% |
| 2 | 34.83% | 12.62% |
| 3 | 65.49% | 12.62% |
| 4 | 20.83% | 27.35% |
| 5 | 80.66% | 27.35% |
| 6 | 50.00% | 33.63% |
| 7 | 36.49% | 38.69% |
| 8 | 62.24% | 38.69% |
| 9 | 24.08% | 57.84% |
| 10 | 50.00% | 57.84% |
| 11 | 75.42% | 57.84% |

  - **Tooltip** on each tile: absolute, top -36px, left 50% with `translateX(-50%)`, bg #383838, Inter 12/16 white, padding 6 8, flex gap 4 (with a 16px external-link icon), z 4. Opacity 0 → 1 on hover (150ms ease-in-out). `::after` is a 4px CSS triangle (border-color #383838 transparent transparent) at top 100%, centred.
- **Integrations bar card** (1242×164, `bg #fff; 2px solid #383838; r 2`):
  - **Duck mascot illustration** 200×155 sitting on the top edge (absolute, top -143, centred, z 3); 175×135 below 1302, 92×71 <728. The speech-bubble text is part of the image. Use a placeholder.
  - Header strip: bg #383838, flex space-between, padding 8 20, height 40. Title in Mono 20/24 UPPER white (14/16.8 below 1302). Chip `CHOOSE YOUR STACK` (Mono 14/16 UPPER, padding 4 12, bg #FAF175, `2px solid #EBCD00`, r 2).
  - Body: flex row, centred, gap 32, padding 40 (column with gap 20 and padding 32 below 1302; 28 20 <728). It holds a row of 9 language logos 40×40 (gap 52 @1440; wrap with gap 20 below 1302) and the trailing text `+ ODBC · HTTP · CLI` (Mono 14/16 UPPER).
  - Logo hover: tooltip (r 4, same style as above).

---

## 7. Customers section (bg **#97D4FF**, `border-top:2px solid #383838`, overflow clip)

- Clouds layer: 6 outline clouds (86×40 viewBox) scattered (sizes 313×149, 337×162, 239×115, 264×124, 414×197, 161×78; some mirrored with `scaleX(-1)`). Visible at all widths; exact <1302 positions are UNMEASURED (they scale with the 1440 layer centred).
- Container (z 1): flex column, gap **56** (48 for 728–1301, 40 <728). Padding **80 30** (64 20; 48 24 <728).
- Header (gap 8): H2 `[32ch/4w]`, sub `[90ch/11w]` Inter 16/22.4 400.
- Grid: flex column, gap 32 (24 @768, 16 <728):
  - Row 1 (height 300, gap 32): **wide card 744** + **stat card 466** (@1440; 527 + 361 @1280). The widths come from intrinsic content (`flex: 0 1 auto`); use a 61.5% / 38.5% split.
  - Row 2 (height 220, gap 32): 3 cards of **411 / 377 / 390** (@1440); use `flex:1`.
  - Below 960: column.
- Card: wrapper bg #383838 (shadow layer); inner `a` is a flex column (space-between) with bg #fff, `2px solid #383838`, transition `transform, background-color 120ms ease-in-out`.
  - Logo row: padding 32 32 0 (24 24 0 below 1302). Logo object-fit contain, position 0% 50%. Rendered sizes: 230×55, 182×54, 166×27, 44×47, 230×37.
  - Bottom block: flex column, justify-end, gap 20, padding 0 32 32 (20 24 24 below 1302).
    - Content: quote card text Inter 20/32 400 ls .4 `[82ch/11w]` 2 lines; or stat (Fono 56/67.2 ls 1.12 UPPER, e.g. a short "Xh → Ym" figure) + Inter 16/22.4 `[60ch]`; or small cards Inter 16/22.4 `[62–70ch]` 2 lines.
    - `READ CASE STUDY →` (Inter 14/16.8 UPPER, 16px arrow, gap 6).
  - **Hover (≥960): `translate(14px,-14px)` + bg tint per card. Active: back to 0,0 (60ms) with a deeper tint:**

| card | hover bg | active bg |
|---|---|---|
| 1 wide | #FDDFF6 | #FBCAF0 |
| 2 stat | #E1F1F8 | #CCE8F3 |
| 3 | #DEE6FF | #C8D6FF |
| 4 | #FFF7E6 | #FFF1D6 |
| 5 | #DAEEE8 | #C2E2D9 |

---

## 8. Agent-native section (bg **#97D4FF**, overflow clip, no top border)

- One outline cloud 256×119 at top 2 / left 901.5 (202×94 @1280; hidden below 960).
- **Dither strip** (canvas): absolute, bottom -8, centred (`left:50%; translateX(-50%)`), width viewport + 8, height **480**. The canvas buffer is 181×60 px upscaled with `image-rendering:pixelated`. It draws #F9EE3E pixels on transparent in an animated dither pattern (content changes every frame), dissolving from sky into the yellow blog section below. Generic: recreate with a small canvas, random/ordered dither, density increasing toward the bottom, re-randomised on requestAnimationFrame. The exact algorithm and frame rate are UNMEASURED.
- Container (z 1): flex column, gap 56 (40 below 1302), padding 80 30 (56 20; 56 24 <728).
- Header (gap 8): H2 (max-width 760; ls 0.02em) `[22ch/2w]`, sub `[101ch/17w]`.
- Row: ≥1302 `flex-direction:row; align-items:flex-end; gap:32`. Below 1302: column, gap 32.

### Left: agent client tabs + terminal sim (600×571 @1440; full width below)
- Wrapper r 2, overflow clip.
- Tablist (`overflow:auto`), tabs `CLAUDE CODE`, `CURSOR`, `CHATGPT`: flex centre, gap 4, padding 8 16, height 36, `2px solid #383838`, margin `0 -2 -2 0`. 16px logo icon. Label Mono 14/16 ls .28 UPPER.
  - Selected: bg #383838, label #fff, icon `filter:brightness(0) invert(1)`.
  - Unselected: bg #F4EFEA, label #666, icon `brightness(0) invert(.4)`. Hover: label #383838, icon `invert(.22)`.
  - Transition: bg 125ms ease-in-out. Focus-visible: outline 2px #6FC2FF, offset -2.
- Panel: `2px solid #383838`, 600×483 (≥1302); 185 tall at 960–1301 and 728–959; 222 tall <728 (content clipped).
- **Claude Code panel:** bg #16161E, padding 18 0 14, overflow clip.
  - Header row (padding 0 16, gap 14): a 42×26 pixel-art mascot SVG, plus three JetBrains Mono 13/21 lines (bold product name #E8E6EC, rest #8B8A96).
  - Transcript (margin-top 10, gap 10): rows in Source Code Pro (fallback) 13/21 with a 26px gutter glyph column.
    - User prompt rows: bg #2E2E38, padding 2 16, glyph `❯` #6E6D7A.
    - Bullet rows: `●` #E8E6EC.
    - Text colours: #E8E6EC main, #8B8A96 dim, tokens #A5A0E8, spinner glyph `✻` #E8837A for the "working" line, bold `strong`.
  - Input: `border-top:1px solid #34343E` (`:focus-within` #8B8A96), padding 10 16 6, prompt `❯` 16px. Blinking caret 7×15 bg #C9C4EE, r 1, **animation blink 1s steps(1) infinite**.
  - Footer hint: a bold `▶▶ …` label in #DFA348 and the rest #8B8A96.
- **Cursor panel:** bg #14171D, padding 16 16 12. Inner bubbles bg #232832. Text is system-ui 13/18 at several white alphas (.44–.75) and #D6D6D6/#EDEDED; code is JetBrains Mono 12.5/16.
- **ChatGPT panel:** bg #fff, padding 12 16. Surfaces #E9EAEA / #F3F3F4 / #ECECEC. Text Inter 14/19.6 300 #0D0D0D and 12.5/15 #67686A. Code is JetBrains Mono 11.5/14.
- **Typing sim:** starts **when the panel scrolls into view** (verified: idle at ~145 chars while off-screen, then streamed to 557 chars over about 5.0s after `scrollIntoView`). It also replays on tab switch. It plays once and does not loop.
- Footer strip under the panel: bg #F4EFEA, borders 0 2 2 2 #383838, flex space-between, wrap, gap 12, padding 8 20, height 54.
  - Left: `ANY MCP-CAPABLE AGENT` (Mono 12/16 UPPER) over `[38ch]` (Inter 12/16.8 300 #666).
  - Right: `DOCS ↗` button (Inter 12/12 UPPER, padding 8 16, bg #97D4FF, `2px solid #383838`, r 2, gap 4; hover bg #6FC2FF).

### Right: 3 stacked link cards (610 wide; column, justify-end, gap 16; 12 below 960)
- Each: wrapper bg #383838; inner `a` bg #fff, `2px solid #383838`, r 2, padding 24, column, gap 12, height 169.
- Contents: 28×28 icon + H3 (Mono 18/21.6 ls .36 UPPER: `SKILLS`, `MCP SERVER`, `CLI`), gap 12. Body Inter 16/22.4 400 ls .32 `[89–100ch]` 2 lines. Right-aligned link (`SKILLS DOCS →` etc., Inter 14 UPPER, 18px arrow).
- **Hover (≥960): `translate(10px,-10px)`; active 0,0 + bg #F8F8F7 (60ms).**

---

## 9. Blog / "fresh" section (bg **#F9EE3E**, `border-bottom:2px solid #383838`)

- Padding **80 0** (76 @1280, 56 below 960).
- Header (gap 8, margin-bottom 40): H2 `[20ch/4w]`, sub `[86ch/13w]`.
  - **Mascot** "arms up duck" illustration 247×246 absolute at top -151.6, right -22 (z 2), overlapping the section above; 202×201 @1280; hidden below 960. Use a placeholder.
- **Swiper carousel** (margin-bottom 32): 20 slides. `loop:false`, speed 300, no autoplay, no free-mode. Breakpoints:

| min-width | slidesPerView | spaceBetween |
|---|---|---|
| 0 | 1 | 16 |
| 500 | 1.5 | 24 |
| 728 | 2 | 24 |
| 960 | 2.5 | 32 |
| 1302 | 3.35 | 32 |

- Slide card: wrapper bg #383838; inner `a` bg #fff, `2px solid #383838`, column. **Hover (≥960): `translate(14px,-14px)`; active 0,0 (60ms).** Card 348×369 @1440.
  - Thumbnail: bg #F4EFEA, `border-bottom:2px solid #383838`, 344×194, `object-fit:cover`. For logo-type thumbs use `contain` with padding 32 24.
  - Body: bg #fff, column, gap 8, padding 22 16 24 24 (19 14 20 20 below 1302). Type chip (`VIDEO`, `BLOG`, `CASE STUDY`, `ECOSYSTEM`), H3 Fono 18/22.5 UPPER (1–3 lines, 30–74ch), meta Inter 12/16 300 #666 (date · duration).
- Controls row: flex space-between, gap 16. Prev/next: two 44×44 buttons, gap 8 (16 below 1302), 24px chevron icons, no border/bg, colour #383838, cursor pointer. Disabled-state styling is UNMEASURED (opacity stayed 1 at the start position). A hidden right-side element (`display:none` at all tested widths) is ignored.

---

## 10. Footer (bg **#383838**, text white)

- Padding **90 0 72** (≥960), 56 0 (728–959), 64 0 (<728).
- Outer: flex column, space-between, gap 64 (72 @768, 52 <728).
- **Top row** (≥960: flex row, space-between; gap 40 @960–1301; <960: column, gap 52/48):
  - Brand column (max-width 240 / 182 @1280; column, gap 40 / 32):
    - logo 210×37 (white version);
    - social icons 32×32 (24 <728) in a wrapping row (gap 32; 20 @1280; 16 <728; max-width 230): Slack, X/Twitter, LinkedIn, YouTube, Mail, RSS. Hover opacity .6 (150ms).
  - Links grid: `grid-template-columns: repeat(4, 200px)` gap 32 (≥1302); `repeat(4,167px)` gap 16 (1280); `repeat(4,154px)` gap 24 (768); `repeat(2,1fr)` gap 40/20 (<728). Each column is a `nav`, flex column, gap 24 (22/20).
    - Headings (Inter 16/25.6 700 ls .32): col 1 `MotherDuck` + second heading `Recent Webinars` (margin-top 24); col 2 `Product`; col 3 `Community`; col 4 `Company` + `Free Books & Guides`.
    - Links: Inter 16/20.8 300 white (14/18.2 below 1302); some wrap to 2–4 lines; external ones have a 16px ↗ icon (gap 4). Link counts: col 1: 2 + 5 webinar titles; col 2: 15; col 3: 12; col 4: 6 + 7.
    - **Hover:** a 0.98px white underline bar (absolute, bottom -1.4px, full width) appears. **Active:** text #6FC2FF and bar #6FC2FF.
- **Bottom row** (flex space-between; <728 column, gap 32):
  - Left (column, centred, gap 12 / 20): "powered by" line Inter 14/19.6 300 ls .28 with an inline `DuckDB` link; legal links `Terms of Use`, `Privacy Policy`, `Support Policy` (gap 20, wrap). Link spans are #F8F8F7 with `border-bottom` underline on hover (#6FC2FF).
  - Right: 2 compliance badges 72×72 (64 below 960), gap 20, object-fit fill.

---

## 11. Motion inventory (everything that moves)

| # | Element | Trigger | Animation | Duration / easing / delay | Notes |
|---|---|---|---|---|---|
| 1 | Header bottom border | scrollY > 0 | border-color transparent → #383838 | 200ms ease-in-out | stays fixed, never hides |
| 2 | Desktop mega-menus | click on nav item | `dropdown-in` top +16px & fade | 200ms ease-out forwards | chevron rotate 180° 200ms |
| 3 | Mobile menu panel | hamburger click | slide in from right | right 200ms ease-in-out; opacity 500ms | locks scroll |
| 4 | Mobile submenus | click | height | 150ms ease-in-out | |
| 5 | Offset buttons | hover / active | translate(7px,-7px) | 120ms / 30ms ease-in-out | |
| 6 | Quote cards | hover ≥960 | translate(15px,-15px) | 120ms ease-in-out | |
| 7 | Product cards | hover ≥960 | translate(10px,-10px) | 120ms; active 60ms | |
| 8 | Customer cards | hover ≥960 | translate(14px,-14px) + tint | 120ms; active 60ms | |
| 9 | Agent link cards | hover ≥960 | translate(10px,-10px) | 120ms; active 60ms | |
| 10 | Blog cards | hover ≥960 | translate(14px,-14px) | 120ms; active 60ms | |
| 11 | Integration tiles | hover | translate(3px,-3px) + hard-6 shadow | 200ms ease-in-out | + tooltip |
| 12 | Tool tiles (diagram) | hover | translate(2px,-2px) + hard-4 shadow | 200ms ease-in-out | + tooltip |
| 13 | Tooltips | hover | opacity 0→1 | 150ms ease-in-out | |
| 14 | Text links | hover / active | underline (border-bottom 0.09em+1px) colour #6FC2FF | none (instant) | |
| 15 | Architecture accordion | click | max-height + bg/shadow swap | 250ms / 200ms ease-in-out | single-open |
| 16 | Hero tabs | click | instant panel swap + typing sim | sim ≈5s, once | no auto-rotate |
| 17 | Hero ASK typing sim | page load and tab activation | staged reveal + char streaming | see §3 timeline | |
| 18 | Architecture wires | always | stroke-dashoffset loop | 312.5 / 625 / 1250 / 2500ms linear infinite | §4 table |
| 19 | Integrations sun rays | always | rotate 360° | 54s linear infinite | |
| 20 | Integrations orange glow | always | opacity 0 → .6 | 4s ease-in-out infinite alternate | |
| 21 | Agent terminal sim | **scroll into view** (and tab switch) | line/char streaming | ≈5s, once | |
| 22 | Terminal caret | always | blink | 1s steps(1) infinite | |
| 23 | Dither strip canvas | always (rAF) | random yellow pixel dither | per frame | UNMEASURED algorithm |
| 24 | Blog carousel | arrow click / swipe | translateX slide | 300ms ease | |
| 25 | Footer social icons | hover | opacity .6 | 150ms ease-in-out | |
| 26 | Video variant unmute btn | hover | translateY(-1px) + bg | 150ms | variant only |

There are no cursor effects, no parallax, no scroll-linked transforms and no marquee (the logo strip is static).
`@media (prefers-reduced-motion: reduce)` is defined on the site (1 rule; target UNMEASURED). Implement it by pausing items 18–23.

---

## 12. Known gaps / UNMEASURED
- Hamburger "open" (close) icon geometry.
- Hero logo tooltip inner typography; COPY PROMPT click feedback.
- Exact positions of the customer-section clouds below 1302.
- Dither canvas algorithm and frame rate.
- Swiper arrow disabled state.
- Compact (728–1301) and mobile (<728) platform-diagram per-card coordinates are captured in raw data but not tabulated. Build them proportionally from the desktop layout using the box sizes in §5.
- Cursor and ChatGPT sim transcript structure (colours and fonts are measured in §8; the line-by-line layout is not).
