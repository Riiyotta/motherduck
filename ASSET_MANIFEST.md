Source: https://motherduck.com/

# Asset manifest: MotherDuck homepage

Do **not** download any of these. Build with same-size placeholders (neutral rectangles/SVGs). Sizes are the rendered CSS px @1440 unless noted. "nat" is the intrinsic size served by `/_next/image`. Original formats: PNG, WebP, AVIF and JPG via the Next image optimizer (q=75), plus inline SVG.

## Fonts (do not download the commercial ones; see CLONE_SPEC.md §0)
| Family | Files | License | Use instead |
|---|---|---|---|
| Aeonik Fono 400 | /fonts/AeonikMono/AeonikFono-Regular.woff2 | commercial | Space Grotesk 400 (+0.01em tracking) |
| Aeonik Mono 400 (700 declared) | /fonts/AeonikMono/AeonikMono-Regular.woff2 | commercial | Fragment Mono 400 |
| Inter 300/400/700 (600 declared) | /fonts/Inter/inter-*.woff2 | OFL | Inter (Google Fonts) 300/400/600/700 |
| JetBrains Mono 400/700 | /_next/static/media/558ca1a6aa3cb55e-s.p.woff2 (+ subsets) | OFL | JetBrains Mono (Google) |
| Source Code Pro | not loaded (falls back to system mono) | OFL | Source Code Pro (Google) or ui-monospace |

## Inline SVG (recreate or replace with a generic shape)
| Asset | Rendered | viewBox | Notes |
|---|---|---|---|
| Logo (wordmark + duck mark) | 174×31 header ≥1302; 154×27 below; footer 210×37 (185×33 <728) | 0 0 210 37 | brand mark: use a placeholder wordmark |
| Nav chevron | 20×20 | 0 0 24 24 | stroke ink; rotates 180° when open |
| Arrow right (CTA / links) | 20×20 (16 / 18 in places) | 0 0 20 20 | generic |
| Hamburger | 24×15 (button 24×21) | n/a | 3 strokes, 2px, #383838 |
| Cloud outline | many sizes (300×140, 171×80, 389×181, 190×88, 272×127, 313×149, 337×162, 239×115, 264×124, 414×197, 161×78, 256×119) | 0 0 86 40 | fill #fff, stroke #383838 0.7–0.9px. Generic: redraw |
| Architecture wire diagram | 778×451 (desktop/tablet), 337×742 (<728) | 0 0 746 432 / 0 0 327 720 | illustration (ducks, gears, cylinder, mascot) is placeholder art; animated wires are re-implemented (spec §4) |
| Isometric slabs | 276×147 each (×5) | 0 0 278 149 | generic: faces #818181/#575757, stroke #383838 2px |
| Platform connectors | various | n/a | 2px #383838 curves: generic |
| Integrations arc background | 1242×560 | 0 0 1440 649 | generic rings + spokes: recreate |
| Agent icons (Skills/MCP/CLI) | 28×28 | 0 0 28 28 / 27 27 | generic glyphs |
| Agent tab logos | 16×16 (hero agent line 14×14) | various | third-party marks: use neutral glyphs |
| Terminal mascot | 42×26 | 0 0 42 26 | pixel art: placeholder |
| Footer social icons ×6 | 32×32 (24 <728) | 0 0 24 24 etc. | use generic icon set (Slack, X, LinkedIn, YouTube, Mail, RSS) |
| Small UI icons (copy, plus, settings, send, chevrons, external ↗) | 11–24px | n/a | generic |

## Raster images
### Hero
| File (original) | Rendered | nat | Fit / position | Treatment |
|---|---|---|---|---|
| ahead-computing-logo.png | 197×24 (164×20 <728) | 196×24 | contain, 50% 50% | link; orange 6px dot top-right |
| do-something-logo.png | 29×24 (24×20) | 28×23 | contain | link + dot |
| david-ai-logo.png | 89×24 (74×20) | 89×24 | contain | not a link, no dot |
| godship-logo.png | 127×14 (109×12) | 127×13 | contain | link + dot |
| together-ai-logo.png | 114×24 (95×20) | 113×24 | contain | link + dot |
| finqore-logo.png | 79×24 (66×20) | 79×23 | contain | link + dot |
| Mux video (video variant only) | 596×335 inside 600×339 frame | 1280×720, 91.4s | cover | autoplay muted loop: use poster placeholder |

### Architecture
| File | Rendered | nat | Fit |
|---|---|---|---|
| ducklake.webp | 16×16 | 16×16 | contain |
| apache-iceberg.webp | 16×16 | 16×16 | contain |
| aws-s3.webp | 16×16 (circle-cropped, r 50%) | 16×16 | contain |
| together-ai-logo.png (quote) | 156×40 | 156×32 | contain, 0% 50% |

### Platform
| File | Rendered | nat | Fit |
|---|---|---|---|
| dives-icon.webp | 32×32 (diagram), 28×28 (card tab) | 50×50 / 44×44 | contain |
| flights-icon.webp | 32×32, 28×28 | 50×50 / 44×44 | contain |
| guides-icon.webp | 32×32, 28×28 | 32×32 / 44×44 | contain |
| dbt-labs / go / typescript / python / postgresql / hex / duckdb (.webp/.png) | 30×30 inside 48×48 tiles | 59×59 | contain |
| Storage pill icons (parquet, iceberg, ducklake, differential, cloud-object) | 18×18 | n/a | cloud-object uses `linear-gradient(45deg,#1B660F,#6CAE3E)` circle |
| Tier duck+gear icon | about 22×22 | n/a | placeholder |
| flights.webp (card screenshot) | 342×165 in 346×169 frame | 400×204 | contain |
| guides.webp | 342×165 | 400×195 | contain |
| dives.webp | 342×165 | 400×204 | contain |
| david-ai-logo.png (quote 2) | 156×40 | 126×34 | contain, 0% 50% |

### Integrations
| File | Rendered | nat | Fit |
|---|---|---|---|
| Arc logos ×11: hex, python, java, dbt-labs, cpp, dlthub, fivetran, tableau, looker, omni, apache(airflow) | 40×40 in 72×72 tiles (scale with arc: 10% of width) | 72×72 (dlthub 72×21, omni 72×28, tableau 72×70) | contain |
| Bar logos ×9: node, python, java, wasm, typescript, go, rust, postgresql, r | 40×40 | 40×40 | contain |
| duck-illustration.webp (mascot with speech bubble) | 200×155 (175×135 <1302, 92×71 <728) | 200×154 | fill |
| transparent-grid-pattern.png (texture) | bg-size 480px auto, repeat, pos 50% 100% | 1923×1371 | **generic: recreate in CSS** (cell ≈43.6×42.9, 1.5px lines rgba(225,214,204,.84)) |

### Customers
| File | Rendered | nat | Fit |
|---|---|---|---|
| together-ai-logo.png | 230×55 | 254×53 | contain, 0% 50% |
| finqore-logo.png | 182×54 | 148×45 | contain, 0% 50% |
| godship-logo.png | 166×27 | 189×20 | contain, 0% 50% |
| do-something-logo.png | 44×47 | 48×39 | contain, 0% 50% |
| ahead-computing-logo.png | 230×37 | 254×31 | contain, 0% 50% |

### Agent-native
| Asset | Rendered | Notes |
|---|---|---|
| Canvas dither strip | 1448×480 CSS (buffer 181×60, pixelated) | generic: recreate procedurally |
| agent-native-dither-sky.svg | requested (64×824) but not applied as a CSS background on the homepage | ignore |

### Blog carousel (20 slides)
| Asset | Rendered | Fit |
|---|---|---|
| 20 thumbnails (JPG/PNG/SVG from CMS S3) | 344×194 each | cover (photo thumbs); contain + padding 32 24 for logo thumbs (6 of 20) |
| arms-up-duck-illus.avif (mascot) | 247×246 (202×201 @1280; hidden <960) | contain |

### Footer
| File | Rendered | nat | Fit |
|---|---|---|---|
| simplified-aicpa-soc-logo.png | 72×72 (64 <960) | 135×135 | fill |
| simplified-gdpr-logo.png | 72×72 (64 <960) | 135×135 | fill |

### Header (unused visually)
| File | Notes |
|---|---|
| noise-bg-dual-gradient.png (500×500) | header ::before texture at opacity 0 in every tested state: may be omitted |

## Generic CSS-recreatable patterns
- Integrations grid texture (above).
- Integrations sunburst: `repeating-conic-gradient(#FFDE00 0deg 5deg, transparent 5deg 30deg)` + radial glows.
- Concentric arc rings + spokes (SVG circles/lines).
- Isometric slabs (simple SVG polygons).
- Cloud outlines (simple SVG path).
- Dither strip (canvas).
- Hard offset shadows via dark wrapper + translate.
