# Design repo for the MotherDuck site clone

**Status: design-review-pending (productionApproved: false). Repository version 1.0.0, PageSpec version 2.0.0.**

This is an AI-ready design repo: tokens, primitives, components, section contracts, page templates, a compatibility graph,
a PageSpec schema, a semantic validator and the evidence ledger behind them. It describes what the cloned site renders and
how it behaves, never how one framework builds it. The source stack (React 18, Vite 5, Tailwind 3.4, react-router-dom 6,
swiper) is recorded only as a documentation note in `registry.manifest.json` (`sourceStack`).

The package is a snapshot of a clone of a **live commercial site** (https://motherduck.com/). Treat it as sensitive: do not
publish it or the zip. It reproduces no source logos, customer wordmarks, people photos, marketing copy, illustrations or characters (the
only real names it holds are the deny-list entries in `schema/source-brand.json`), and generated pages must contain none either (see Modes and `assets/asset-roles.json`).

## What is in the package (counts recomputed from disk by `extraction/verify_all.py`)

| Layer | Count |
|---|---|
| Tokens | 776 total: 612 foundation, 63 semantic, 78 component, 23 layout; 2 themes (light, dark) |
| Motion patterns | 38 (tokens/00-foundation/motion-patterns.json) |
| Primitives / components | 14 / 31 |
| Section contracts | 231 (212 retrieval-eligible, 19 ineligible runtime or utility UI) |
| Templates (page shapes) | 59 across 10 families |
| Route patterns / redirects | 100 page patterns and 9 redirects (the 108 patterns of the 40 route keys in src/routes.js plus the home route), each mapped exactly once |
| Sitemap URLs resolved | 1583 of 1583 to a pattern |
| Asset roles | 34 (8 reference-only, 17 generation-safe, 9 blocked-for-generation) |
| Graph rules | 10 |
| Example PageSpecs | 2 reference, 9 generated |

## Layout

`tokens/` (00-foundation, 10-semantic, 20-component, 30-layout, themes, llm) - `primitives/` - `components/` - `sections/` (one contract per
section type; id equals the file name) - `templates/` (templates.json, routes.json) - `compatibility/graph.json` - `assets/asset-roles.json` -
`schema/` (pagespec.schema.json, section-contract.schema.json, source-brand.json, semantic_validate.py, example.pagespec.json, examples/, tests/) -
`extraction/` (measured-values.json, verify_all.py, wrapper_gate.py, prove_drift.py, measure_sections.mjs, compare_live_bands.mjs).

## Modes (R1, R2)

Every PageSpec carries a required, closed `mode`.

* `reference`: a faithful reconstruction of the source. The real brand, real CTA strings and reference-only assets are evidence and are allowed. The route must be served by the declared template.
* `generated`: a new page for someone else. The semantic validator rejects the source brand and every variant, product names, source CTAs, source URLs and endpoints (including store links), ratings, real people and customers, reused reference copy, and any non-generation-safe asset, each under its own rule: `GENERATED_MODE_BRAND`, `_CTA`, `_COPY`, `_URL`, `_ASSET`, `_PERSON`, `_RATING`. All patterns live in one registry, `schema/source-brand.json` (`sourceBrand.patterns`), and each literal is grep-verified against the clone or its specs.

## Structurally unusual things (recorded, not normalised away)

1. **It is a clone of a real company site.** Licensing and generation guidance is load-bearing. Real logos, customer wordmarks, investor marks, third-party tool marks, certification seals, people photos, the company mascot art, product screenshots, book covers and live embeds are never reproducible; `assets/asset-roles.json` pins them (customer-logo, investor-logo, partner-tool-logo, compliance-badge, brand-wordmark, company-mascot-art, person-portrait, team-photo, embedded-app are blocked-for-generation; the rest of the real roles are reference-only). The two commercial typefaces (Aeonik Fono, Aeonik Mono) must not be downloaded; free substitutes are in tokens/00-foundation/typography.json.
2. **All page copy in the clone is placeholder text** sized to the original lengths (the content policy in CLONE_SPEC). The clone mascot **Pip** and the art in `src/components/ui/art` are original, not the company's. The clone also ships 91 free-licensed photographs of real strangers as portrait and team stand-ins (attribution in the clone's public/assets/photos/CREDITS.md); they are not reusable for generated pages.
3. **`/docs/*`, external and auth links are deliberately plain text, not links** (src/lib/links.js, EXCLUDED_PREFIXES in src/routes.js). Link fields in contracts therefore allow an empty href.
4. **`/try` is a static, non-functional shell** with no network requests; template `try-app` has one runtime-excluded node (`app.try-shell`), so the route is not retrieval-eligible.
5. **Nine REDIRECTS are not templates** (seven path redirects plus the `/learn-more` prefix pair); they are listed in routes.json with their destinations.
6. **The shared header and footer are hidden on some routes**: `/try` (bare), `/dive-gallery` and its dive pages (own nav and footer), and `/lp/ducklake-lakehouse-table-format-book` (landing-page-only nav, no footer). Templates `try-app`, `dive-gallery`, `dive-detail` and `lp-book-own-nav` model this with their own shell nodes, and the compatibility graph carries the named exceptions.
7. **Known clone gap (not fixed):** `/lp/agents-run-your-analytics-full` is a real sitemap URL that matches `/lp/:slug` but currently renders the not-found style stub because the gated landing page dataset has no entry for that slug (src/pages/company/Gated.jsx). Recorded in measured-values.json `knownGaps` and in template `gated-lp`.
8. **Residual height deltas against the live original** exist; see Clone quality evidence.
9. Runtime UI (skip link, mega menus, mobile menu, back-to-top, floating buttons, fixed bars, modals, success overlay, scroll-scrub effect) has `retrievalEligible: false` with a reason and is listed per template in `runtimeUi`, never as a node. No cookie or consent banner exists in the clone (grep found none).

## Reconciliation and what was measured (R11)

The package was reconciled against the clone as it stands: every pattern of `src/routes.js` and every path of `MISSING_ROUTES.txt` is re-checked by `verify_all.py` when the sibling source exists, and all 1583 sitemap URLs resolve to a pattern. Heights in `sectionHeights` and `liveVsCloneHeights` were measured by this build at **1440px only**. Tablet (768) and mobile (390) behaviour comes from the PAGES_SPEC_* measurements (1440, 1280, 768, 390) and is recorded in each contract as the structured `responsive` field (columns per range, stack breakpoint, hidden-below breakpoint, evidence); this build did not re-measure those widths.

## Evidence levels

Sections and routes carry `evidence.level`: `measured` (Playwright readings in the PAGES_SPEC files), `partially-measured` (the spec lists what it did not measure; the note says which) or `inferred`. Template `routeEvidence` keeps each family member honest: for example `/candidate-privacy` is `inferred` (the TOC nesting of that page family is UNMEASURED) while `/privacy-policy` is `measured`. Copy budgets (`maxWords`) are measured only where the spec states `[Nch/Mw]` (the homepage); elsewhere they are layout-fit estimates and never below the clone's own reference copy (`content.copyBudgetBasis` says which).

## Clone quality evidence (R12)

* The clone is runnable: a copy of the project in an empty directory installed with `npm ci` and built with `npm run build` (verified 2026-10-26; see `cloneRunnability`). This package ships no dependency folders.
* **There is no live-versus-clone pixel-parity harness for this project.** No parity percentage is claimed. QA rounds measured section heights and tokens against the live site; the numbers are in the PAGES_SPEC_* files and in `extraction/measured-values.json`.
* A real section-height comparison against the live site (1440px, run with `extraction/compare_live_bands.mjs`) is recorded in `liveVsCloneHeights`: about-us, careers, contact-us/product-expert and privacy-policy match the live document height exactly; the homepage bands match within 1px (document +14 px); `/vs/snowflake-alternative` is +29 px; `/product/pricing` is -202 px; `/blog` is +12 px. This is a height comparison only.
* Per-template section heights at 1440px (one sample route per template) are recorded in `sectionHeights` and judged by `extraction/wrapper_gate.py` (R9): HERO bands above 1800px warn, above 3000px fail; a single section holding over 50% of its page warns, over 60% fails unless whitelisted. Whitelist entries are marked as agent attestations, not human sign-offs.

## Verify

```bash
python3 extraction/verify_all.py            # allowlist parity, citations, counts, versions, routes, assets, pins, tokens, graph, gate, examples, hygiene
python3 schema/semantic_validate.py         # every example PageSpec (Draft-07 + semantic rules)
python3 schema/tests/adversarial_test.py    # mutations must be rejected, controls must pass
python3 extraction/prove_drift.py           # scratch-copy proof that every drift check actually fails on bad input
```

Dependencies: Python 3 and the `jsonschema` package. Re-measuring heights needs Node, Playwright and a running copy of the clone:
`NODE_PATH=$(npm root -g) MD_BASE_URL=http://localhost:5190 node extraction/measure_sections.mjs` (optional `MD_BROWSER_PATH`).
Without the sibling source tree, citations degrade to a bounds check against recorded line counts and a warning is printed.

## Token usage in PageSpecs

A PageSpec has no free-form style or token-override field (recorded in `tokens/llm/token-policy.json` under `overrides.gap`). It references tokens only through the closed `theme` enum and the closed per-node `surface` enum, both validated against `tokens/llm/token-catalog.json` and the section contracts. Raw colours, arbitrary spacing and font declarations in content are rejected (`TOKEN_RAW_*`).

## Packaging

Build the zip with the CLI `zip` after the checks pass, never with a GUI archiver; exclude `__pycache__`, `__MACOSX`, `.DS_Store`. The project is not a git repository; if it becomes one, keep `design-repo.zip` out of version control.
