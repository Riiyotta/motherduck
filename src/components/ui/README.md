# Shared foundation: tokens and primitives

Source of truth: `CLONE_SPEC.md` §0. Config: `tailwind.config.js`. Globals and keyframes: `src/index.css`.

## Breakpoints (min-width, mobile-first, replace Tailwind defaults)
`sm` 500 (Swiper only) · `md` 728 · `lg` 960 · `xl` 1302. No `2xl`.
Base styles = <728; `md:` = 728–959; `lg:` = 960–1301; `xl:` = >=1302.

## Colors
`cream` `ink` `sky` `sky-hover` `sky-dark` `sky-tint` `pink` `yellow` `sun` `yellow-chip` `yellow-chip-border`
`orange` `peach` `mint` `coral` `garden` `garden-dark` `gray-400` `gray-500` `gray-600` `hairline`
`surface-0..3` `sand` `sand-dark` `chip-gray` `clay` `clay-hover`
`term-bg` `term-line` `term-rule` `term-text` `term-dim` `term-prompt` `term-token` `term-hot` `term-amber` `term-caret`

## Fonts
`font-fono` Space Grotesk (display) · `font-mono` Fragment Mono (UI labels, body default) · `font-sans` Inter ·
`font-code` `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (the
original's code font resolves to ui-monospace / SF Mono; no webfont is loaded) · `font-jet` JetBrains Mono. Licensed Aeonik fonts are not referenced.

## Type scale (`text-<role>`; sets size + line-height + letter-spacing, + weight where the spec fixes it)
Family and `uppercase` are separate. Fono roles already carry the +0.01em compensation.
Suffix: `-lg` = 960–1301 value, `-md` = 728–959, `-sm` = smallest (or "below 1302" when the spec has one value).

| Role | Classes (mobile-first) |
|---|---|
| H1 hero (fono) | `text-h1-sm md:text-h1-md lg:text-h1` |
| H2 default (fono) | `text-h2-sm md:text-h2-lg xl:text-h2` |
| H2 architecture (mono) | `text-h2-mono-sm md:text-h2-mono-lg xl:text-h2-mono` |
| H2 agent (fono) | `text-h2-agent-sm md:text-h2-agent-lg xl:text-h2-agent` |
| H2 blog (fono) | `text-h2-blog-md lg:text-h2-blog-lg xl:text-h2-blog` |
| Product card H3 (fono) | `text-card-h3-sm xl:text-card-h3` |
| Customer stat (fono) | `text-stat-sm md:text-stat-lg xl:text-stat` |
| Blog card H3 (fono) | `text-blog-h3-sm xl:text-blog-h3` |
| Slab label (fono) | `text-slab-label` / `text-slab-label-sm` (AGENT CONTEXT) |
| Eyebrow banner (fono) | `text-eyebrow-sm md:text-eyebrow` |
| Hero lede | `text-lede-hero-sm md:text-lede-hero` |
| Section lede | `text-lede-sm xl:text-lede` (+ `max-w-lede`) |
| Section sub | `text-sub` (integrations: add `font-light`) |
| Blog sub | `text-sub-blog-sm xl:text-sub-blog` |
| Nav link / mobile | `text-nav` / `text-nav-mobile` |
| Button label | `text-button` |
| Mono UI label / eyebrow chip | `text-label` |
| Accordion title / body | `text-accordion-title-sm xl:text-accordion-title` / `text-accordion-body` |
| Product card body | `text-card-body` |
| Diagram title / body / pill | `text-diagram-title` / `text-diagram-body` / `text-pill` |
| Quote / mark | `text-quote-sm xl:text-quote` / `text-quote-mark-sm xl:text-quote-mark` |
| Quote name, role | `text-caption font-bold` / `text-caption font-light text-gray-600` |
| Customer quote | `text-customer-quote-sm xl:text-customer-quote` |
| Integrations bar title | `text-bar-title-sm xl:text-bar-title` |
| Agent card H3 / link | `text-agent-h3` / `text-agent-link` |
| Blog chip / meta | `text-chip` / `text-meta` |
| Tooltip | `text-tooltip` |
| Footer heading / link / legal | `text-footer-heading-sm xl:text-footer-heading` / `text-footer-link-sm xl:text-footer-link` / `text-legal` |

## Other tokens
- Radii: `rounded` / `rounded-sm` 2px · `rounded-tip` 4 · `rounded-md` 8 · `rounded-tile` 14 · `rounded-bubble` 16 ·
  (tokens/company.js) `rounded-lg` 10 · `rounded-xl` 12 · `rounded-2xl` 20 · `rounded-pill` 999
- Shadows: `shadow-hard-4` · `shadow-hard-6` · `shadow-chat-input` · `shadow-dropdown`
- Max widths: `max-w-container` 1302 · `max-w-container-lg` 960 · `max-w-container-md` 728 · `max-w-lede` 1020
- Durations: `duration-30/60/120/125/150/200/250/300`; default easing `ease-in-out`
- Animations (keyframes in index.css): `animate-spin-slow` · `animate-glow` · `animate-blink` · `animate-dropdown-in` ·
  `animate-wire-flow` (set `--wire-dur`, `--from`, `--to` inline per path). These are paused under
  `prefers-reduced-motion`; add `data-motion="continuous"` to other loops to pause them too.
- Content group (tokens/content.js, keyframes in src/styles/content.css): colours `callout`, `code-dim-*`,
  `inline-code-bg`, `quote-bar`, `rule-faint`, `coral-soft`, `coral-tile`, `overlay`, `select-bg`, `ecotag-*`,
  `dive-hover`; shadows `shadow-dive-pill` / `shadow-dive-menu`; animations `animate-menu-drop`, `animate-feed-spin`,
  `animate-fab-pop`, `animate-sidebar-in`, `animate-modal-in`, `animate-sheet-in`, `animate-caret-blink`; type roles
  per PAGES_SPEC_CONTENT §3b (`text-feed-h1*`, `text-article-h1*`, `text-card-title-mono*`, ... see the token file).
- CSS vars: `--header-desktop` 80px, `--header-mobile` 70px, `--eyebrow-desktop` 40px, `--eyebrow-mobile` 70px,
  `--header-total` 142 / 112 / 122 (wrapper padding-top, already applied in App.jsx).

## Primitives (`import { ... } from './ui'`)

**`<Container as className padX>`** – spec container: 100%/728/960/1302 max-width, padding 24/20/20/30, centred.
- `padX` (optional, default = container padding): a number sets both side paddings in px at every width (inline
  style, beats any class), e.g. `padX={40}`; a string is appended as Tailwind classes for responsive values, e.g.
  `padX="md:px-[40px] xl:px-[220px]"` (bespoke 40 / 220, persona 300). Plain `px-*` utilities in `className` also win
  over `.container` (components layer), so existing `!px-*` call sites are unaffected.

**`<OffsetButton variant size href arrow leadingIcon fullWidth disabled disabledStyle className wrapperClassName>`**
- `variant`: `'primary'` (sky, active sky-hover) | `'secondary'` (cream, active sand-dark) | `'white'` (#FFF; press bg
  UNMEASURED, stays white) | `'ht'` (#1276BF, 2px white border, white text, white backing) | `'ht-dark'` (ink bg, white
  border/text, white backing).
- `size`: `'md'` (default, 43.8 tall, padding 11.5/18, Inter 14/16.8) | `'lg'` (56.2, padding 16.5/22, Inter 16/19.2) |
  `'xl'` (57.7, padding 17.25/23, Inter 16/19.2; book-brief submit) | `'tier'` (52, padding 15, Inter 15/18; pass `fullWidth`).
- Content additions (PAGES_SPEC_CONTENT §4): `size="submit"` (newsletter Submit, 58 tall, padding 17.4/23, Inter 16/19.2;
  pair with `disabled disabledStyle`), `size="submit-auto"` (same padding/type as `submit` but `height:auto`, so it is
  content-driven: 58.0 at the default padding; use it when the call site changes padding per breakpoint instead of
  forcing `!h-auto`, e.g. SubscribeBand 109.7x56.2 SM / 113.7x55.2 >=728), icon-only squares `'icon-44'` (44×44, padding 12/10, read-next arrows),
  `'icon-54'` (54×50, padding 15), `'icon-42'` (42×38, padding 10), `'icon-54-md'` (42×38 <960, 54×50 ≥960; case
  carousel arrows), `'icon-60'` (60×56, padding 18, video TOC FAB), `'icon-64'` (64×60, padding 20, back-to-top). Pass
  the 20px icon as children and an `aria-label`.
- `to`: renders a react-router `<Link>` (internal routes). `noLift`: keeps the button enabled but removes its own hover
  lift (event rows, where the whole row lifts instead).
- `leadingIcon`: node rendered before the label (gap 8). `arrow` adds the trailing 20px arrow.
- `disabled` sets native disabled + no lift (unchanged). Add `disabledStyle` for the company/marketing disabled look:
  text #666, bg #F8F8F7, border #818181, cursor pointer.
- `href` renders `<a>`, otherwise `<button type="button">` (pass `type="submit"` for forms).
- Hover lift 7px (120ms), press back in 30ms. Other props go to the inner `<a>/<button>`.

**`<UnderlineLink to href onClick icon size tone hoverTone uppercase inline iconSize className labelClassName>`**
(also exported as **`TextLink`**). Text link + 20px icon, gap 6, 1px transparent border, r 2. Label Inter 16/19.2 ls .32
(`size="sm"`: 14/19.2) with 1px ink underline, padding 1px 0, margin-bottom 1px. Hover (instant): 2px #6FC2FF underline,
margin-bottom 0 (height unchanged); `hoverTone="ink"` keeps it ink. :active: text/underline/icon #6FC2FF.
- Element: `to` -> router `<Link>`, `href` -> `<a>`, `onClick` -> `<button>`, none -> non-link `<span>` (same styling;
  use for external / out-of-scope targets).
- `icon`: `'right'` (default) | `'down'` | `'left'` | `'plus'` (16px) | `'external'` | `'reset'` (18px) | `null`.
- `tone="muted"`: Inter 14/16.8 ls .28 #666, icon before the label (careers CLEAR ALL).
- `uppercase` applies text-transform; `inline` makes the wrapper inline-flex (marketing TextLink) instead of flex.
- `size="sm-below-lg"` (opt-in): label Inter 15/18 ls .3 below 960 (link 24.0 tall), 16/19.2 ls .32 at >=960 (25.2);
  the original /customer-support card links.
- `bare` (opt-in): drops the 1px transparent border box and the label's bottom padding/margin (label padding 1/0/0),
  so the link is 21.2 tall instead of 25.2 (blog post author byline). Hover still adds the 2px underline (+1px).

**`<TextInput label value onChange variant multiline error valid type name>`** (also exported as **`FieldInput`**)
Controlled floating-label field. 58 tall, padding 16/40/16/24, 2px ink, r 2, bg rgba(248,248,247,.7), Inter 16/25.6.
Placeholder is a `<p>` (Inter 16/22.4 300 ls .32 #666, left 24, centred; ls .32 measured on every original form) + sr-only `<label>`. Hover/focus border #2BA5FF, focus
padding-right 24. Filled-valid after blur: border rgba(6,132,117,.804) (`valid` overrides the default "non-empty" check).
- `variant`: `'float'` (label moves above: top -5, translateY(-100%), Inter 12/16.8 ink) | `'hide'` (label hidden on focus/filled).
- `error` (string): #E23F35 border + `role="alert"` message "↳ {error}" Inter 12/19.2 300 directly under the field.
  (Marketing error text style is UNMEASURED; this is the company-measured style.)
- `icon` (content search field): `'search'` (built-in 24px magnifier) or any 24px node, at left 24 / top 18; the input
  and placeholder then start at 64. Use with `variant="hide"` for the listing search fields.
- `multiline`: textarea, min 114 tall, placeholder at y 18 (Inter 16/25.6 ls .32), left 24 / right 0, `white-space:
  break-spaces`, so long placeholders wrap instead of ellipsing (original). Transitions: field all .2s (padding 0s), label .15s ease-out.

**`<Checkbox label checked onChange variant size>`** – 18×18 box, 2px ink, r 2, 10×7 check; label Inter 16/25.6 (`size="sm"`
14/22.4), padding-left 11. Hidden native input covers the row. `variant`: `'outline'` (transparent box, ink check) |
`'solid'` (ink box, white check). Hover/focus: box border #2BA5FF.

**`<Accordion items={[{ q, a }]}>`** – multi-open FAQ (company G12): items 2..n border-top 2px ink, last also border-bottom;
item padding 26/0, inner 0/30; question Mono 23/32.2 + 24px chevron (180deg, .2s); answer Inter 18/28.8 300, max-height
+ margin-top 0 -> 16 over .25s ease-in-out.
Optional overrides (defaults unchanged): `itemClassName` (item padding), `innerClassName` (inner padding),
`qClassName` (question type + margin), `aClassName` (answer type), `chevronClassName`, `answerClassName` (answer wrapper,
e.g. `max-w-[98%]`), `firstBorder` (top border on item 1 too; content video FAQ), `questionClassName` (the question row `<button>`: h3 +
chevron; e.g. a width cap instead of `innerClassName="[&>*]:..."`). `answerClassName` is the matching hook on the
collapsible answer wrapper.

**`<LiftCard lift hoverFrom pressDuration bg hoverBg activeBg as innerAs wrapperProps wrapperClassName className>`**
- `lift` px (quote 15, product 10, customer 14, agent 10, blog 14). `hoverFrom` `'lg'` (default, >=960) | `'always'`.
- `pressDuration` ms (default 60). `bg`/`hoverBg`/`activeBg` for tinted cards (customers); when set, inner bg is
  driven by these (do not also add a `bg-*` class) and background-color joins the transition.
- `as` = wrapper tag (dark #383838 backing, r 2), `innerAs` = inner tag. `className` + remaining props go to the
  inner element; `wrapperProps` to the wrapper. Add your own `border-2 border-ink rounded-sm` etc. to `className`.

**`<Placeholder width height ratio variant label showLabel rounded bordered className>`**
- Neutral box (surface-2, 1px gray-400 border) with `variant` `'hatch'` (diagonal lines) or `'shape'`.
- Size from `width`/`height` (px numbers), `ratio` (fluid), or responsive classes in `className`.
- Never substitute real logos, mascots or brand marks.

**`<ArrowRight size className>`** – generic 20×20 arrow, `currentColor`.
