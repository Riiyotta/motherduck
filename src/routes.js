// Route inventory: every internal page linked from the original homepage,
// grouped by the template that renders it. /docs/* is intentionally excluded.
export const ROUTES = {
  product: [
    '/product', '/product/app-developers', '/product/data-teams', '/product/duckdb-users',
    '/product/dives', '/product/ducklake', '/product/flights', '/product/guides',
    '/product/hypertenancy', '/product/mcp-server', '/product/postgres-integration',
    '/startups', '/research', '/trust-and-security', '/community-and-open-source',
  ],
  pricing: ['/product/pricing', '/product/pricing/duckdb-support'],
  about: ['/about-us'],
  careers: ['/careers'],
  contact: ['/contact-us', '/contact-us/product-expert', '/customer-support'],
  vs: [
    '/vs/bigquery-alternative', '/vs/clickhouse-alternative', '/vs/databricks-alternative',
    '/vs/postgresql-alternative', '/vs/redshift-alternative', '/vs/snowflake-alternative',
  ],
  legal: ['/privacy-policy', '/terms-of-use', '/support-policy'],
  blogIndex: ['/blog'],
  blogPost: ['/blog/:slug'],
  caseIndex: ['/case-studies'],
  caseDetail: ['/case-studies/:slug'],
  videoIndex: ['/videos'],
  videoDetail: ['/videos/:slug'],
  ecosystemIndex: ['/ecosystem'],
  ecosystemDetail: ['/ecosystem/:slug'],
  hub: ['/learn', '/events', '/duckdb-news', '/quacking-around-the-web', '/community-code', '/dive-gallery'],
  gated: [
    '/lp/:slug', '/duckdb-book-brief', '/duckdb-cheatsheet-full',
  ],
  // PAGES_SPEC_EXTRA chunk A
  glossaryIndex: ['/glossary'],
  glossaryTerm: ['/glossary/:slug'],
  diveDetail: ['/dive-gallery/dives/:slug'],
  author: ['/authors/:slug'],
  learnArticle: ['/learn/:slug'],
  researchPaper: ['/research/:slug'],
  bookChapter: Array.from({ length: 11 }, (_, i) => `/duckdb-book-summary-chapter${i + 1}`),
  // PAGES_SPEC_EXTRA chunk B
  eventDetail: ['/events/:slug'],
  eventsPast: ['/events/past', '/events/past/page/:n'],
  webinar: ['/webinar/:slug', '/video/:slug'],
  podcastIndex: ['/explain-analyze'],
  podcastEpisode: ['/explain-analyze/:slug'],
  try: ['/try'],
  redirect: [
    '/case-study-dexibit', '/case-study-dominik-moritz', '/case-study-saasworks', '/onboarding-sessions',
    '/ducklake-open-table-format-guide', '/glossary/dlt', '/glossary/time-series-database',
    '/learn-more', '/learn-more/:slug',
  ],
  // PAGES_SPEC_EXTRA chunk C
  persona2: ['/product/for-founders', '/product/for-operators'],
  euRegion: ['/product/eu-region'],
  azure: ['/product/azure'],
  vsIndex: ['/vs'],
  contactSupport: ['/contact-us/support'],
  genericPage: [
    '/motherduck-terms-of-service', '/acceptable-use-policy', '/fees-addendum', '/divemaxxing/rules', '/forms/finance-onboarding',
    '/hack-night', '/getting-started-with-motherduck', '/local-dev-cloud-prod-dagster-motherduck', '/react-components-testing',
    '/live-demo', '/duckdb-book-brief-orig',
  ],
  legalToc: ['/terms-of-service', '/candidate-privacy'],
  splitFormLP: ['/together-ai', '/duckdb-book-form', '/sql-duckdb-book-form'],
  lpExtra: ['/ducklake-open-table-format-full', '/divemaxxing-full', '/jev-full', '/lp/ducklake-lakehouse-table-format-book'],
}

// Paths that exist only on the original as separate apps; links to these are disabled.
export const EXCLUDED_PREFIXES = ['/docs']

// PAGES_SPEC_EXTRA §1a (chunk B): paths the original answers with an HTTP redirect -> final destination.
export const REDIRECTS = {
  '/case-study-dexibit': '/case-studies/dexibit',
  '/case-study-dominik-moritz': '/case-studies/dominik-moritz',
  '/case-study-saasworks': '/case-studies/finqore',
  '/onboarding-sessions': '/contact-us/product-expert',
  '/ducklake-open-table-format-guide': '/lp/ducklake-lakehouse-table-format-book',
  '/glossary/dlt': '/glossary/data-load-tool-dlt',
  '/glossary/time-series-database': '/glossary/time-series',
}
// §1a prefix redirects: /learn-more/<slug> -> /learn/<slug> (and /learn-more -> /learn).
export const REDIRECT_PREFIXES = { '/learn-more': '/learn' }
