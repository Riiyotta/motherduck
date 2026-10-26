// Menu structure and destinations mirror the original header (counts per §2c: PRODUCT USE CASES 2,
// FEATURES 6, COMPARISONS 6, MORE 5; COMMUNITY 5 + 6 + 6; COMPANY 5). Labels are neutral placeholders.
// `to` is an in-scope route; `to: null` marks an external / docs / auth destination, rendered as non-link text.
const item = (title, sub, to) => ({ title, sub, to })
const link = (title, to) => ({ title, to })

export const PRODUCT = {
  sections: [
    {
      heading: 'USE CASES',
      items: [
        item('Embedded analytics', 'Dashboards inside your app', '/product/app-developers'),
        item('Warehousing + BI', 'Shared queries for data teams', '/product/data-teams'),
      ],
    },
    {
      heading: 'FEATURES',
      items: [
        item('Isolated compute', 'One engine per user or job', '/product/hypertenancy'),
        item('Agent access', 'Connect assistants to your data', '/product/mcp-server'),
        item('Guides', 'Rules that steer every answer', '/product/guides'),
        item('Integrations', 'Tools that plug straight in', '/ecosystem'),
        item('Live dashboards', 'Interactive views from a prompt', '/product/dives'),
        item('Data pipelines', 'Scheduled loads and transforms', '/product/flights'),
      ],
    },
  ],
  // Order follows the original menu; names match COMPETITORS in components/marketing/copy.js.
  comparisons: [
    link('vs Warehouse F', '/vs/snowflake-alternative'),
    link('vs Warehouse C', '/vs/postgresql-alternative'),
    link('vs Warehouse D', '/vs/bigquery-alternative'),
    link('vs Warehouse E', '/vs/redshift-alternative'),
    link('vs Warehouse B', '/vs/databricks-alternative'),
    link('vs Warehouse A', '/vs/clickhouse-alternative'),
  ],
  comparisonsAll: null, // /vs index is not in scope
  more: [
    link('Overview', '/product'),
    link('For engine users', '/product/duckdb-users'),
    link('Case Studies', '/case-studies'),
    link('Trust & Security', '/trust-and-security'),
    link('Support', '/customer-support'),
  ],
}

export const COMMUNITY = {
  items: [
    item('Blog', 'Articles and release notes', '/blog'),
    item('Videos & Streams', 'Talks, demos and live sessions', '/videos'),
    item('Chat Community', 'Ask questions, share answers', null),
    item('Events', 'Meetups and live sessions', '/events'),
    item('Dashboard Gallery', 'Examples built by the community', '/dive-gallery'),
  ],
  columns: [
    {
      heading: 'LEARN',
      links: [
        link('Video Channel', null),
        link('Snippets', null),
        link('Free Engine Book', '/duckdb-book-brief'),
        link('Free Lakehouse Book', '/lp/ducklake-lakehouse-table-format-book-full'),
        link('BI Field Guide', '/lp/guide-to-bi-in-the-agentic-era-full'),
        link('SQL Cheatsheet', '/duckdb-cheatsheet-full'),
      ],
    },
    {
      heading: '',
      links: [
        link('Learn', '/learn'),
        link('Conference', null),
        link('Merch', null),
        link('Newsletter', '/duckdb-news'),
        link('Postgres Guide', '/lp/postgres-analytics-guide-full'),
        link('Eval Field Guide', '/lp/ai-analytics-eval-field-guide-full'),
      ],
    },
  ],
}

export const COMPANY = {
  items: [
    item('About Us', 'Who we are', '/about-us'),
    item('Engine Support', 'Help for self-hosted teams', '/product/pricing/duckdb-support'),
    item('Careers', 'Open roles', '/careers'),
    item('Around the Web', 'Mentions and community posts', '/quacking-around-the-web'),
    item('Research', 'Papers and benchmarks', '/research'),
  ],
}

export const DROPDOWNS = [
  { key: 'product', label: 'PRODUCT' },
  { key: 'community', label: 'COMMUNITY' },
  { key: 'company', label: 'COMPANY' },
]
export const LINKS = [link('DOCS', null), link('PRICING', '/product/pricing'), link('CONTACT US', '/contact-us/product-expert')]
