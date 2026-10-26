// Deterministic placeholder datasets for the content templates (PAGES_SPEC_CONTENT §9 counts).
// Names, titles and copy are generated; partner / company / author names are generic ("Partner 12").
import { CASE_ORDER, CASE_PROFILES } from './caseProfiles.js'
import { diveTitle, learnTitle, eventTitleFromSlug, UPCOMING_EVENT_FACTS, authorDisplayName, BLOG_AUTHOR_SLUGS } from './slugNames.js'
import { BLOG_SHAPES, NEWS_SHAPES, QUACK_SHAPES, VIDEOS_SHAPES, CASES_SHAPES, LEARN_SHAPES, DIVES_SHAPES } from './shapes.js'
import { rng, chars, title, int, pick, fmtDate, daysAgo, hash, monthShort, MONTHS_LONG, shaped, exactTitle } from './lorem.js'

const lazy = (fn) => { let v; return () => (v ??= fn()) }

/* ---------------- Real slugs (PAGES_SPEC_EXTRA §11) ----------------
   Hub cards and bylines link into the extra templates (src/pages/extra), so they carry the original's slugs, listed
   in the order the original hub pages list them (2026-10-26). Titles and copy stay generated placeholders. */
// /dive-gallery default "Most Popular" order (15 pages x 9)
const DIVE_ORDER = ["financial-reporting-briefing-book", "database-explorer-f8b99c", "who-powers-ai", "business-graph-explorer", "supply-chain-command-center", "also-cs-ai-agents-the-growing-family", "a-home-fit-for-you", "the-time-machine-of-music", "butterfly-effect-rewrite-human-history", "night-sky-atlas", "kpi-dashboard-using-tableau-superstore-data", "duckdoom-doom-raycaster-running-in-sql-on-motherduck", "the-bay-builds-out-not-up", "after-the-rainbow-pride-coverage-20152026", "dive-into-pivoting", "stress-as-rothko", "waste-atlas-europe-drawn-by-its-own-industrial-waste", "football-match-replay-passes-with-statsbomb-360-96b900", "flight-deck-ducklington-pond", "confmap-what-tech-conferences-talk-about", "skyfall-1350-nights-of-drones-missiles-over-ukraine", "data-jobs-2025-a-year-of-hiring", "cern-open-data-high-energy-particle-collisions", "nba-game-quality-explorer-2025-26-by-matson", "wrth-x-lila-nikole-prdp26-pr-by-the-numbers-culture-drives-commerce", "the-goblin-containment-unit-has-failed", "2026-world-cup-bracket-predictor-by-tia-2026-05-20", "the-kanto-gauntlet", "slides-this-is-a-talk-about-sql-and-ai-data-engineer-things-by-mxxx", "snack-planet", "where-goals-come-from-shot-quality-explorer", "queens-puzzle", "wrth-x-lila-nikole-prdp26-four-voices-one-float", "compound-claude-code-memory", "wrth-lila-nikole-prdp26-collector-dna-what-they-collect", "global-earthquake-explorer", "motherduck-duckdb-quiz-by-dumky", "best-practices-for-dives-by-matson-2026-04-29-2", "plenty-of-fish", "duckdash", "what-does-healthcare-actually-cost", "damnlines-nyc-restaurant-lines", "the-tartan-armys-boston-playbook", "the-flavor-pairing-engine-by-molecular-kinship", "fifa-world-cup-2026-match-tracker", "quackshot-fowl-play", "duck-power-analytics", "wrth-x-lila-nikole-prdp26-the-cultural-origin-map", "how-to-create-beautiful-dataviz-vibecoding-dashboard", "oil-gas-demo-anadarko-basin-explorer", "global-conflict-markets-console", "dive-share", "world-clock", "arxiv-the-shape-of-science", "quote-atlas-what-the-crowd-remembers-0c40f0", "local-spreadsheet", "the-air-we-breathe", "cloud-is-regional-which-cloud-do-data-job-ads-ask-for", "nfl-coaching-tree", "where-does-help-arrive-slowest", "disease-time-machine-animated-map", "spotify-tracks-explorer", "the-vibe-coded-web-measured-common-crawl", "galactic-coffee-theme-gallery", "duckboy-advance", "the-bi-universe-explore-the-lineage-of-todays-analytics-founders-6a3fe0", "the-world-from-your-airport", "jev-jobs", "washington-snowpack-wy2026-vs-last-5-years", "duck-duck-where-guess-the-duck-by-its-range", "anatomy-of-a-parquet-file", "a-visual-history-of-data-visualization-by-dumky-2026-03-25-2", "6-degrees-of-josh-johnson", "hidden-gems-watch-the-world-get-discovered-96d2ae", "anonymous-search-console-opportunity-map", "duckdb-beginners-guide-spj-dataset", "the-marvel-social-network", "duckdb-pypi-download-stats-by-mehdio-2026-03-24", "dive-into-claude-outages", "duckdb-code-atlas-by-sahilng1997", "nikola-joki-career-arc", "the-salmon-run-columbia-basin-migration-atlas", "the-flavor-universe-a-star-map-of-450-ingredients", "afl-analyst-round-summaries", "wsdot-live-feeds-for-travel-times-border-waits-and-cameras", "are-ya-ready-divers-by-dumky", "eval-explorer-v2", "dbt-charts-in-motherduck-dives", "financial-statements", "kindling-for-mass-war", "agentic-sql-benchmark-including-local-models", "welcome-to-motherduck-movies-dataset", "genius-music-explorer", "builders-room-cost-architecture", "a-year-of-the-worlds-daily-high-temperatures-noaa-ghcn", "tahoe-100m-driver-mutation-oncoplot", "sample-hcp-prescriber-explorer", "webalizer-themed-analytics-demo", "spreadsheets-with-shareable-url", "there-and-back-again", "the-met-measured-five-centuries-of-art-one-group-by", "duckworth", "irc-watchlist-geography-prototype", "animal-facts", "duckmaxxing-tracing-how-wild-ducks-turn-into-digital-ducks-on-duckdb-5eff91", "duckverse-the-evolution-of-duckdb", "nycs-top-dog-names-by-blossom", "xcel-perfect-10-score-physics-simulator", "nyc-taxi-operations-dashboard", "interactive-map-filtering-by-alex-2026-03-30-3", "the-duck-world-cup", "real-estate-development-pl-bank-ready-statement", "nyc-311-service-requests", "the-captured-grid-who-owns-southeast-asias-data-center-boom", "ducks-rule-the-world", "psychoactive-experience-explorer", "motherdoom", "232000-theorems-and-counting", "tom-brown-treatment-cost-explorer", "database-explorer-be8f64", "wrth-x-lila-nikole-prdp26-cultural-sentiment-heatmap-live-control-room", "nyc-park-ranger-animal-request-trends", "who-air-quality-index", "meridian-where-can-irc-have-the-greatest-impact", "control-tower-observability-for-databases-flights-and-dives", "dive-analytics", "duckverse-chronicles", "what-does-hacker-news-think-of-each-ai-lab", "grand-exchange-alpha-a-field-guide-to-gielinors-markets", "tpc-h-query-reference", "money-in-law-out", "wisconsin-single-family-home-affordability", "machine-learning-interpretability-dashboard", "fifa-world-cup-team-dna-comparison", "walt-disney-world-orlando-live-ride-planner"]
// /learn card order
const LEARN_ORDER = ["what-is-duckdb", "what-is-OLAP", "data-application", "dataframes", "data-application-architecture", "what-is-a-data-warehouse", "duckdb-vs-sqlite-databases", "web-assembly", "big-data", "sql-group-by-examples-duckdb", "why-choose-parquet-table-file-format", "partitioned-writes-parquet-ducklake", "ducklake-guide", "acid-transactions-sql", "star-schema-data-warehouse-guide", "data-lake-vs-data-warehouse-vs-lakehouse", "columnar-storage-guide", "reduce-cloud-data-warehouse-costs-duckdb-motherduck", "cloud-data-warehouse-startup-guide", "modern-data-warehouse-playbook", "data-warehouse-tco", "bigquery-alternative-motherduck", "fix-slow-bi-dashboards", "modern-data-warehouse-use-cases", "no-etl-query-raw-files", "diagnose-fix-slow-queries", "hybrid-analytics-guide", "self-service-analytics-startups", "secure-startup-data-warehouse", "pandas-dataframes-guide", "reduce-snowflake-costs-duckdb", "duckdb-python-quickstart-part1", "duckdb-python-quickstart-part2", "product-analytics-motherduck-duckdb", "duckdb-struct-nested-data", "what-is-a-data-lakehouse", "customer-facing-analytics-embedded-analytics-guide", "duckdb-vs-postgres-embedded-analytics", "outgrowing-postgres-analytics", "enterprise-data-warehouse", "data-warehouse-as-a-service", "select-olap-solution-postgres", "customer-facing-analytics-database", "best-cloud-data-warehouses-real-time-analytics-2026", "top-10-data-warehouse-platforms-2026", "best-cloud-data-warehouses-multi-tenant-analytics", "best-cloud-data-warehouses-embedded-analytics", "best-analytics-db-llm-ai-agents", "top-snowflake-alternatives-2026", "top-bigquery-alternatives", "databricks-alternatives", "customer-facing-analytics-saas", "customer-analytics-dashboard", "top-clickhouse-alternatives", "building-vs-buying-custom-saas-analytics-tool", "top-amazon-redshift-alternatives", "fivetran-vs-python-vs-warehouse-native-ingestion", "what-is-data-ingestion-pipeline", "agent-native-data-ingestion-ai-etl", "best-columnar-databases-2026", "fastest-olap-databases-compared", "materialized-views-vs-on-the-fly-queries", "aws-athena-trino-alternatives-serverless-olap", "migrate-nosql-to-cloud-warehouse", "motherduck-ai-agent-data-layer", "how-motherduck-scales-distributed-architecture", "skip-the-cache-embedded-analytics", "csv-vs-parquet-benchmark"]
// /events upcoming rows (same order as data/media.js upcomingEvents())
const EVENT_ORDER = ["ducklake-performance-optimization-faster-queries-from-your-lakehouse-2026", "the-data-teams-new-tools-motherduck-at-helsinki-data-week-2026", "data-outpost-2026-2026", "duckdb-20-how-to-speed-up-your-workloads-2026", "aligned-on-decisions-how-our-product-lead-builds-with-data-agents-in-motherduck-2026", "forward-data-conference-2026-2026", "everyone-gets-a-data-agent-whats-coming-in-motherduck-from-our-ceo-2026"]
// Bylines name the original's 23 most frequent blog authors (slugNames.js BLOG_AUTHOR_SLUGS) with the same generated
// display name their /authors/<slug> page shows; authorPath() maps a byline name back to that page.
const authorAt = (k) => authorDisplayName(BLOG_AUTHOR_SLUGS[k % BLOG_AUTHOR_SLUGS.length])
const AUTHOR_BY_NAME = new Map(BLOG_AUTHOR_SLUGS.map((s) => [authorDisplayName(s), s]))
export const authorPath = (name) => {
  const s = AUTHOR_BY_NAME.get(String(name))
  return s ? `/authors/${s}` : null
}
// /webinar/<slug> targets the original's ecosystem icons use (also the blog read-next WEBINAR slide)
const ECO_WEBINARS = ['ducking-easy-insights-motherduck-dbt', 'take-flight-with-the-modern-duck-stack']
export const webinarPath = (i) => `/webinar/${ECO_WEBINARS[Math.abs(i) % ECO_WEBINARS.length]}`
// Use the live card shape for index k when one exists (shapes.js), else the random generator.
const sTitle = (shapes, k, seed, fallback) => (shapes[k] ? shaped(shapes[k].t, seed) : fallback)
const sDesc = (shapes, k, seed, fallback) => (shapes[k] && shapes[k].d > 20 ? chars(shapes[k].d, seed) : fallback)

/* ---------------- Blog (272 posts) ---------------- */
// §7 topic options (34, deduped; brand / company names replaced with generic labels)
export const BLOG_TOPICS = [
  'AI', 'Agent Skills', 'Agentic Analytics', 'Agents', 'Serverless', 'Data recovery', 'Dives', 'DuckDB', 'DuckLake',
  'Edge computing', 'Features', 'Flights', 'Lakehouse', 'MCP', 'Platform', 'Postgres endpoint', 'Product', 'Tutorial',
  'Company', 'Data engineering', 'Data warehouse', 'Ecosystem news', 'Events', 'External tables', 'How to',
  'Integrations', 'Python', 'Self hosting', 'Sql', 'Performance', 'Security', 'Streaming', 'Benchmarks', 'Community',
]
const MIXES = ['A', 'B', 'C', 'D']

function makePost(i, slug) {
  const r = rng(i * 13 + 1)
  const t = sTitle(BLOG_SHAPES, i - 1, i, title(int(r, 40, 100), i))
  const d = daysAgo((i % 272) * 3 + int(r, 0, 2))
  return {
    i,
    slug: slug || `sample-post-${i + 1}`,
    title: t,
    h1: title(76, i + 5000),
    date: fmtDate(d),
    excerpt: i === 0 ? chars(360, i + 100) : sDesc(BLOG_SHAPES, i - 1, i + 100, chars(int(r, 150, 330), i + 100)), // featured: 5 lines @1440 like the live card
    topic: BLOG_TOPICS[(i * 7) % BLOG_TOPICS.length],
    readMin: int(r, 4, 18),
    authors: Array.from({ length: r() > 0.8 ? 2 : 1 }, (_, k) => authorAt((i + k * 5) % 23)),
    byline: `${fmtDate(d)} · ${authorAt(i % 23)}`,
    tags: [BLOG_TOPICS[(i * 7) % BLOG_TOPICS.length], BLOG_TOPICS[(i * 7 + 13) % BLOG_TOPICS.length]].map((t) => t.split(' ')[0]),
    mix: MIXES[i % 4],
    seed: i + 1,
  }
}
export const blogPosts = lazy(() => Array.from({ length: 272 }, (_, i) => makePost(i)))
export function getPost(slug) {
  return blogPosts().find((p) => p.slug === slug) || makePost(1000 + (hash(slug) % 9000), slug)
}

/* ---------------- DuckDB news (42 unique; 43 card nodes incl. the XL duplicate) ---------------- */
export const newsItems = lazy(() => Array.from({ length: 42 }, (_, i) => {
  const r = rng(i * 17 + 3)
  return {
    i,
    slug: `newsletter-issue-${42 - i}`,
    title: sTitle(NEWS_SHAPES, i, i + 300, title(int(r, 40, 90), i + 300)),
    date: fmtDate(daysAgo(i * 14 + 2)),
    byline: `${fmtDate(daysAgo(i * 14 + 2))} · ${authorAt(i % 19)}`,
    excerpt: sDesc(NEWS_SHAPES, i, i + 400, chars(int(r, 150, 320), i + 400)),
  }
}))
export const newsDigest = lazy(() => {
  // Word lengths / description lengths mirror the live digest card (590 tall @1440, 890.7 @390).
  const T = [[11, 13, 8, 3, 2, 17, 3], [6, 5, 4, 8, 8, 1, 6, 6], [6, 9, 5, 6], [8, 2, 11, 11, 8]]
  const D = [288, 110, 106, 111]
  return {
    date: fmtDate(daysAgo(2)),
    title: shaped([6, 9, 10, 1, 7, 4], 901),
    slug: 'newsletter-issue-43',
    items: T.map((w, k) => ({ title: shaped(w, 910 + k), desc: chars(D[k], 920 + k) })),
  }
})

/* ---------------- Quacking around the web (62) ---------------- */
export const QUACK_TYPES = ['News', 'Article', 'Video', 'Podcast']
export const quackItems = lazy(() => {
  // News 23, Article 22, Video 12, Podcast 5 (spec: News 18+, Article 18+, Video 12, Podcast 5)
  const types = [...Array(23).fill('News'), ...Array(22).fill('Article'), ...Array(12).fill('Video'), ...Array(5).fill('Podcast')]
  const r0 = rng(5)
  for (let i = types.length - 1; i > 0; i--) { const j = Math.floor(r0() * (i + 1)); [types[i], types[j]] = [types[j], types[i]] }
  return types.map((type, i) => {
    const r = rng(i * 19 + 11)
    return {
      i,
      type,
      title: sTitle(QUACK_SHAPES, i, i + 600, title(int(r, 40, 95), i + 600)),
      // live lines read "Mon D, YYYY - <outlet / writer>" (~34ch, 2 lines at SM on most cards)
      date: `${fmtDate(daysAgo(i * 6 + 1))} - Source Writer ${(i % 17) + 1}${[0, 1, 4].includes(i % 10) ? ' and Contributing Editor' : ''}`,
      excerpt: sDesc(QUACK_SHAPES, i, i + 700, chars(int(r, 150, 320), i + 700)),
    }
  })
})

/* ---------------- Videos (159 + 1 featured) ---------------- */
// §5 C3 video chips (brand-named chips replaced with labels of the same rendered width: "Product Feature Talk"
// 213.2 vs 214.9, "Snack & Code" 144.7 vs 146.0 @1440)
export const VIDEO_CATEGORIES = [
  'All', 'AI ML and LLMs', 'AI, ML and LLMs', 'App Development', 'BI & Visualization', 'Data Pipelines', 'Ecosystem',
  'Ingestion', 'Interview', 'MCP', 'Meetup', 'Product Feature Talk', 'Python', 'Snack & Code', 'SQL', 'Short', 'Sources',
  'Stream', 'Talk', 'Tutorial', 'Wasm', 'Webinar', 'YouTube', 'dbt',
]
const VTAGS = VIDEO_CATEGORIES.filter((c) => c !== 'All' && c !== 'App Development')
const dur = (r) => `${int(r, 1, 59)}:${String(int(r, 0, 59)).padStart(2, '0')}`
function makeVideo(i, slug) {
  const r = rng(i * 23 + 9)
  // Live cards carry 3-4 tags with the long "features" tag second, so the tag row wraps to 2 lines (83.6 tall).
  const LONG = VTAGS.filter((t) => t.length >= 12 && t !== 'Product Feature Talk')
  const tags = [pick(r, VTAGS.filter((t) => t.length <= 7)), 'Product Feature Talk', pick(r, LONG)]
  if (r() > 0.35) { const t = pick(r, LONG); if (!tags.includes(t)) tags.push(t) }
  if (i === 40) tags[0] = 'App Development' // spec: "App Development" filter returns 1
  return {
    i,
    slug: slug || `sample-video-${i + 1}`,
    title: sTitle(VIDEOS_SHAPES, i, i + 1200, title(int(r, 38, 60), i + 1200)),
    h1: title(68, i + 1300),
    date: fmtDate(daysAgo((i % 159) * 4 + 3)),
    desc: sDesc(VIDEOS_SHAPES, i, i + 1400, chars(int(r, 120, 300), i + 1400)),
    tags,
    duration: dur(r),
    seed: i + 1,
  }
}
export const videos = lazy(() => Array.from({ length: 159 }, (_, i) => makeVideo(i)))
export const featuredVideo = lazy(() => ({ ...makeVideo(500, 'featured-sample-video'), type: 'Webinar', date: fmtDate(daysAgo(-12)) }))
export function getVideo(slug) {
  return videos().find((v) => v.slug === slug) || makeVideo(2000 + (hash(slug) % 9000), slug)
}

/* ---------------- Case studies (20) ---------------- */
export const CASE_CATEGORIES = ['All', 'Data Warehousing', 'Customer Facing Analytics', 'AI', 'Agentic Analytics', 'Business Intelligence']
// counts: DW 14, CFA 7, AI 4, Agentic 4, BI 1
const CASE_CATS = Array.from({ length: 20 }, (_, i) => {
  const c = []
  if (i < 14) c.push('Data Warehousing')
  if (i >= 13 && i < 20) c.push('Customer Facing Analytics')
  if ([1, 5, 9, 16].includes(i)) c.push('AI')
  if ([2, 6, 15, 19].includes(i)) c.push('Agentic Analytics')
  if (i === 4) c.push('Business Intelligence')
  return c
})
function makeCase(i, slug) {
  const r = rng(i * 29 + 4)
  // Grid cards carry the live slugs (live /case-studies grid order); a measured profile sizes the detail page.
  const sl = slug || CASE_ORDER[i] || `case-study-${i + 1}`
  const prof = CASE_PROFILES[sl]
  return {
    i,
    slug: sl,
    profile: prof || null,
    company: `Company ${i + 1}`,
    title: sTitle(CASES_SHAPES, i, i + 2100, title(int(r, 52, 74), i + 2100)),
    h1: prof ? exactTitle(prof.h1, i + 2200) : shaped([8, 3, 7, 1, 4, 8, 5, 7, 3, 7], i + 2200), // live word lengths: 2 lines @1440, 3 @390
    bullets: (CASES_SHAPES[i]?.li || [0, 0, 0]).slice(0, 3).map((n, k) => chars(n > 10 ? n : int(r, 30, 70), i * 10 + k + 2300)),
    categories: CASE_CATS[i % 20],
    quote: chars(prof ? prof.bq : 224, i + 2400),
    person: `Person ${i + 1}`,
    role: title(int(r, 18, 30), i + 2500),
    lede: chars(prof ? prof.lede : 214, i + 2600), // live 216ch: 3 lines @1440
    seed: i + 1,
  }
}
export const caseStudies = lazy(() => Array.from({ length: 20 }, (_, i) => makeCase(i)))
export function getCase(slug) {
  const key = String(slug || '').replace(/\/+$/, '')
  return caseStudies().find((c) => c.slug === key) || makeCase(3000 + (hash(key) % 9000), key)
}
export const caseSlides = lazy(() => caseStudies().slice(0, 6).map((c, k) => ({
  // live slide quote lengths (4 lines @1440 on slide 1) and ~46ch name + role chips
  ...c, carouselQuote: chars([215, 226, 168, 156, 283, 234][k], k + 2700), role: title(36, k + 2750),
})))

/* ---------------- Ecosystem (73 technology + 11 consulting) ---------------- */
export const ECO_CATEGORIES = [
  'All', 'Ingestion', 'Business Intelligence', 'Data Science & AI', 'Reverse ETL', 'AI Agents', 'Orchestration',
  'Data Quality', 'Transformation', 'Dev Tools', 'Data Apps',
]
export const ECO_TAG_BG = {
  Ingestion: 'bg-tag-violet', Orchestration: 'bg-ecotag-orchestration', 'AI Agents': 'bg-ecotag-agents',
  'Business Intelligence': 'bg-ecotag-bi', 'Data Quality': 'bg-ecotag-dq', Transformation: 'bg-tag-blue',
  'Dev Tools': 'bg-ecotag-devtools', 'Data Science & AI': 'bg-ecotag-dsai', 'Reverse ETL': 'bg-ecotag-retl',
  'Data Apps': 'bg-ecotag-apps',
}
const REGIONS = ['Europe', 'North America', 'DACH', 'France']
const ICON_KINDS = ['docs', 'blog', 'video', 'case-study']
// icon counts per card scaled from the measured distribution (0:76, 1:46, 2:23, 3:8, 5:1 of 154 nodes)
const ICON_COUNTS = [...Array(41).fill(0), ...Array(25).fill(1), ...Array(13).fill(2), ...Array(4).fill(3), 5]
const iconHref = (kind, i) => ({
  docs: i % 3 === 0 ? `/docs/integrations/partner-${i}` : `https://example.com/partner-${i}/docs`,
  blog: `/blog/sample-post-${(i % 40) + 2}`,
  video: i % 2 ? `/videos/sample-video-${(i % 30) + 1}` : webinarPath(i / 2),
  'case-study': `/case-studies/${CASE_ORDER[i % 20]}`,
}[kind])
function makePartner(i, slug, consulting = false) {
  const r = rng(i * 37 + 2)
  const cats = ECO_CATEGORIES.slice(1).filter((c) => c !== 'Business Intelligence')
  let tags
  if (consulting) tags = Array.from(new Set([pick(r, REGIONS), ...(r() > 0.6 ? [pick(r, REGIONS)] : [])]))
  else if (i < 19) tags = ['Business Intelligence', ...(r() > 0.85 ? [pick(r, cats)] : [])]
  else tags = r() > 0.95 ? [] : [pick(r, cats), ...(r() > 0.85 ? [pick(r, cats)] : [])]
  tags = Array.from(new Set(tags))
  const n = ICON_COUNTS[(i * 11 + (consulting ? 5 : 0)) % ICON_COUNTS.length]
  const icons = Array.from({ length: n }, (_, k) => {
    const kind = ICON_KINDS[(k + i) % ICON_KINDS.length]
    return { kind, href: iconHref(kind, i + k) }
  })
  const num = consulting ? 74 + i : i + 1
  return {
    i,
    slug: slug || `partner-${num}`,
    name: `Partner ${num}`,
    tags,
    desc: chars(int(r, 90, 170), i + (consulting ? 3500 : 3300)),
    icons,
    consulting,
    seed: num,
  }
}
// Business-Intelligence partners are spread through the list rather than grouped at the top.
export const techPartners = lazy(() => {
  const list = Array.from({ length: 73 }, (_, i) => makePartner(i))
  const order = list.map((p, k) => [((k * 37) % 73), p]).sort((a, b) => a[0] - b[0]).map(([, p]) => p)
  return order
})
export const consultingPartners = lazy(() => Array.from({ length: 11 }, (_, i) => makePartner(i, null, true)))
export function getPartner(slug) {
  return [...techPartners(), ...consultingPartners()].find((p) => p.slug === slug) || makePartner(4000 + (hash(slug) % 9000), slug)
}

/* ---------------- Learn (68) ---------------- */
export const learnItems = lazy(() => Array.from({ length: 68 }, (_, i) => {
  const r = rng(i * 41 + 6)
  // title: the same generated words the /learn/<slug> article H1 shows (slugNames.learnTitle)
  return { i, slug: LEARN_ORDER[i], title: LEARN_SHAPES[i] ? learnTitle(LEARN_ORDER[i], LEARN_SHAPES[i].t) : title(int(r, 14, 40), i + 5100), desc: sDesc(LEARN_SHAPES, i, i + 5200, chars(int(r, 150, 260), i + 5200)) }
}))

/* ---------------- Events (7 upcoming) ---------------- */
export const EVENT_LOCATIONS = ['Online', 'Conference Center, City A', 'Tech Hub, City B', 'Community Hall, City C']
export const EVENT_TYPES = ['Online', 'In Person']
export const events = lazy(() => {
  // Title, date and format come from the same source as the /events/<slug> pages (slugNames.js); in-person rows take
  // the generic venue names in order.
  const venues = ['Conference Center, City A', 'Tech Hub, City B', 'Community Hall, City C']
  let v = 0
  return EVENT_ORDER.map((slug, i) => {
    const [y, m, day, inPerson] = UPCOMING_EVENT_FACTS[slug]
    const d = new Date(Date.UTC(y, m - 1, day))
    const loc = inPerson ? venues[v++ % venues.length] : 'Online'
    return {
      i,
      slug,
      month: MONTHS_LONG[d.getUTCMonth()],
      monthShort: monthShort(d),
      day: String(day).padStart(2, '0'),
      year: y,
      title: eventTitleFromSlug(slug),
      // description lengths follow the live rows (266 / 235 / 210 tall @1440)
      desc: chars([252, 252, 172, 227, 241, 179, 220][i], i + 5500),
      location: loc,
      type: inPerson ? 'In Person' : 'Online',
    }
  })
})

/* ---------------- Dive gallery (135) ---------------- */
export const DIVE_FORMATS = ['Dashboard', 'Explorer', 'Map', 'Globe', 'Tutorial', 'Slides', 'Talk', 'Tool', 'Game', 'Showcase', 'Data Viz']
// "MotherDuck" topic chip replaced with the generic "Platform"
export const DIVE_TOPICS = ['NYC', 'Sports', 'Music', 'Finance', 'Civic', 'Science', 'Astronomy', 'Energy', 'Weather', 'AI', 'SQL', 'DuckDB', 'Platform']
export const dives = lazy(() => withPopularSlugs(Array.from({ length: DIVE_ORDER.length }, (_, i) => {
  const r = rng(i * 47 + 12)
  const tags = Array.from(new Set([pick(r, DIVE_FORMATS), pick(r, DIVE_TOPICS), ...(r() > 0.5 ? [pick(r, DIVE_TOPICS)] : [])]))
  return {
    i,
    slug: `dive-${i + 1}`,
    // seed 6109 for card 9: its shaped title then fits one line at 1280 like the live one
    title: sTitle(DIVES_SHAPES, i, i === 8 ? 6109 : i + 6100, title(int(r, 20, 60), i + 6100)),
    tags,
    author: `user${(i * 7) % 61 + 1}`,
    // The 9 shaped titles (DIVES_SHAPES = the live first page, in order) must be the 9 most-voted so the default
    // "Most Popular" sort shows them first; the rest keep their random 0-220 votes.
    votes: ((v) => (i < 9 ? 229 - i : v))(int(r, 0, 220)),
    pick: i % 9 === 2 || i === 3, // live first page: cards 3 and 4 carry the pick badge
    hackathon: i % 13 === 5,
    recency: i,
  }
})))
// Slugs follow the original's "Most Popular" order: the k-th card under the page's default sort (votes desc, stable)
// gets the original's k-th slug, so every other generated field (votes, tags, picks) is unchanged.
function withPopularSlugs(list) {
  const ranked = [...list].sort((a, b) => b.votes - a.votes)
  // the card title is the one the /dive-gallery/dives/<slug> page shows (slug words, slugNames.diveTitle)
  ranked.forEach((d, k) => { d.slug = DIVE_ORDER[k]; d.title = diveTitle(d.slug) })
  return list
}
