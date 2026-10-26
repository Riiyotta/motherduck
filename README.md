# MotherDuck clone: information architecture

`ia.json` is the only file to hand-edit. `IA.md` and `matrix.csv` are generated from it by `build.mjs`; `validate.mjs` checks it. Never edit `IA.md` or `matrix.csv` directly.

Re-run after any change to `ia.json`:

```bash
node validate.mjs && node build.mjs
```

Route accounting: `meta.totalRoutes` (1583) is the number of distinct URLs in the live sitemap, and each template's `routeCount` is how many of those URLs the clone resolves to it (counts sum to 1583, each URL maps to exactly one template). The seven client-redirect source URLs are counted under the template of their destination page and listed in `redirectSources`. `/product/guides` and `/glossary` exist only in the clone's route table (no sitemap equivalent), so their templates have `routeCount: 0` and the paths sit in `cloneOnlyRoutes`. Templates may carry an optional `note` field; `build.mjs` and `validate.mjs` ignore it. Scope numbers inside section prose were derived from the data, so if you add or move routes, re-check them against the validate output.

## Findings

- Eight slug-driven collections (glossary 347, blog 272, events 251, videos 149, dives 135, authors 120, ecosystem partners 84, learn 68) are 1426 of the 1583 routes (90%). The design and build effort is in the other 157 routes, which span 63 templates; 45 templates cover a single route.
- Only 56 of 245 sections appear in more than one template. Eight of them are chrome (skip link, announcement bar, header, menus, footer, dive nav and footer), leaving 48 content blocks reused; 189 are single-use and should stay page-local until a second caller appears. The reuse that exists is concentrated in the marketing blocks (FAQ accordion 10 templates, CTA band 8, sticky stack 7) and in `ArticleProse` (10 templates, 972 routes).
- Several meanings are implemented twice: legal shell (`LegalShell` and `LegalTocShell`), back-to-top (case studies vs events), FAQ accordion (three components), and the sand-grid band (a shared `SandBand` plus an inline copy in the webinar page). These are candidates for consolidation.
- Chrome is not uniform: 12 routes use the dark header theme (podcast), 136 use the dive-gallery nav and footer, one route (`/try`) is bare, and one is LP-only (the DuckLake book landing page, reachable in the sitemap only via the `/ducklake-open-table-format-guide` redirect). `/lp/agents-run-your-analytics-full` is mapped to the gated LP template but the clone has no body for that slug yet and still renders the not-found-style stub.
