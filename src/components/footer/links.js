// Spec §10 link columns. Measured counts: col 1: 2 + 5, col 2: 15, col 3: 13 (spec said 12), col 4: 6 + 7.
// Labels are tuned so each wraps to the original's line count at 200/16px, 167/14px, 154/14px and 161/14px.
// Neutral labels; `href` is the original's target; `ext` marks external links (16px ↗ icon; rendered as non-link text).
export const COLUMNS = [
  {
    groups: [
      { heading: 'Get started', links: [{ label: 'Docs', href: '/docs/getting-started/' }, { label: 'Pricing', href: '/product/pricing/' }] },
      {
        heading: 'Recent Sessions',
        links: [
          { label: 'Streaming without the pain: practical change data capture for analytics teams', href: '/videos/postgres-cdc-streamkap-motherduck/' },
          { label: 'The catalog inside your lakehouse: an architecture deep dive for teams', href: '/videos/ducklake-architecture-deep-dive/' },
          { label: 'Is your transactional database slow at analytics questions?', href: '/videos/postgres-slow-analytics-queries/' },
          { label: 'How retail data teams drive revenue with language models', href: '/videos/ecommerce-data-teams-llms-revenue/' },
          { label: 'Automated data engineering: a full end-to-end pipeline walkthrough', href: '/videos/agentic-data-engineering-pipelines-ai/' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: 'Product',
        links: [
          ['Overview', '/product/'], ['Multi-tenancy', '/product/hypertenancy/'], ['Integrations', '/ecosystem/'],
          ['AI Tooling', '/product/mcp-server/'], ['Notebooks', '/product/dives/'], ['Table Format', '/product/ducklake/'],
          ['Data Apps', '/product/flights/'], ['Warehousing & BI Tooling', '/product/data-teams/'],
          ['Embedded Analytics Apps', '/product/app-developers/'], ['For Local Users', '/product/duckdb-users/'],
          ['Postgres Connector', '/product/postgres-integration/'], ['Case Studies', '/case-studies/'], ['Startups', '/startups/'],
          ['Support', '/customer-support/'], ['Trust & Security', '/trust-and-security/'],
        ].map(([label, href]) => ({ label, href })),
      },
    ],
  },
  {
    groups: [
      {
        heading: 'Community',
        links: [
          { label: 'Blog', href: '/blog/' },
          { label: 'Chat', ext: true, href: 'https://slack.motherduck.com/' },
          { label: 'Events', href: '/events/' },
          { label: 'Video Channel', ext: true, href: 'https://www.youtube.com/@motherduckdb' },
          { label: 'Newsletter', ext: true, href: 'https://www.dataoutpost.ai/' },
          { label: 'Shop', ext: true, href: 'https://merch.motherduck.com/' },
          { label: 'Community and OSS', href: '/community-and-open-source/' },
          { label: 'Videos & Streams', href: '/videos/' },
          { label: 'Gallery', href: '/dive-gallery/' },
          // Original: the news link is internal (no icon); the snippets link is the external one.
          { label: 'News', href: '/duckdb-news/' },
          { label: 'Snippets', ext: true, href: 'https://duckdbsnippets.com/' },
          { label: 'Learn', href: '/learn/' },
          { label: 'Code of Conduct', href: '/community-code/' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: 'Company',
        links: [
          ['About us', '/about-us/'], ['Enterprise Support Options', '/product/pricing/duckdb-support/'], ['Careers', '/careers/'],
          ['Press', '/quacking-around-the-web/'], ['Research', '/research/'], ['Contact Us', '/contact-us/'],
        ].map(([label, href]) => ({ label, href })),
      },
      {
        heading: 'Books & Guides',
        links: [
          ['Lakehouse Field Manual', '/lp/ducklake-lakehouse-table-format-book-full/'], ['Embedded SQL Book', '/duckdb-book-brief/'],
          ['BI for Agent Workflows', '/lp/guide-to-bi-in-the-agentic-era-full/'], ['SQL Cheatsheet', '/duckdb-cheatsheet-full/'],
          ['The Database Is Full', '/lp/postgres-analytics-guide-full/'], ['From Hunches to Evals', '/lp/ai-analytics-eval-field-guide-full/'],
          ['Data & AI Survey: Annual Field Index', '/lp/data-ai-survey-full/'],
        ].map(([label, href]) => ({ label, href })),
      },
    ],
  },
]

// Original targets: Slack, X, LinkedIn, YouTube, mailto, /rss.xml -> all non-link (external / mailto / static file).
export const SOCIAL = [
  { kind: 'chat', label: 'Chat community', href: 'https://slack.motherduck.com/' },
  { kind: 'post', label: 'Social feed', href: 'https://twitter.com/motherduck' },
  { kind: 'network', label: 'Professional network', href: 'https://linkedin.com/company/motherduck' },
  { kind: 'video', label: 'Video channel', href: 'https://www.youtube.com/@motherduckdb' },
  { kind: 'mail', label: 'Email', href: 'mailto:info@motherduck.com' },
  { kind: 'feed', label: 'RSS feed', href: '/rss.xml' },
]

// Original legal links are internal but open in a new tab (target _blank).
export const LEGAL = [
  { label: 'Terms of Use', href: '/terms-of-use/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Support Policy', href: '/support-policy/' },
]
export const OSS_HREF = 'https://duckdb.org/'
export const COMPLIANCE_HREF = '/trust-and-security/#Compliance'
