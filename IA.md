# MotherDuck clone: information architecture

Source: https://motherduck.com/ (live sitemap, 1583 URLs) as reproduced by the React/Vite clone in this repo
Status: **measured-from-clone-code** · production approved: **false**
1583 routes · 71 templates · 245 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Glossary term, Blog post, Event detail) account for 870 of 1583 routes (55%). The remaining 713 routes span 68 templates.

| template | routes | share |
|---|---:|---:|
| Glossary term | 347 | 22% |
| Blog post | 272 | 17% |
| Event detail | 251 | 16% |
| Video detail | 149 | 9% |
| Dive detail | 135 | 9% |
| Author profile | 120 | 8% |
| Ecosystem partner detail | 84 | 5% |
| Learn article | 68 | 4% |
| Case study detail | 23 | 1% |
| Events: past archive | 13 | 1% |
| Book chapter summary | 11 | 1% |
| Webinar or video page | 11 | 1% |
| Podcast episode | 11 | 1% |
| Generic prose page | 9 | 1% |
| Competitor comparison | 6 | 0% |
| Research paper | 6 | 0% |
| Gated landing page (guide or report) | 5 | 0% |
| Legal document with table of contents | 4 | 0% |
| Webinar registration landing | 3 | 0% |
| Audience page (app developers and data teams) | 2 | 0% |
| Contact: product expert | 2 | 0% |
| Generic prose page with side form | 2 | 0% |
| Gated landing page with FAQ | 2 | 0% |
| Split-form landing with sneak peek | 2 | 0% |
| Homepage | 1 | 0% |
| Product overview | 1 | 0% |
| Audience page (DuckDB users) | 1 | 0% |
| Product feature: Dives | 1 | 0% |
| Product feature: Flights | 1 | 0% |
| Product feature: MCP server | 1 | 0% |
| Product feature: Postgres integration | 1 | 0% |
| Product: DuckLake | 1 | 0% |
| Product: Hypertenancy | 1 | 0% |
| Startups program | 1 | 0% |
| Research hub | 1 | 0% |
| Trust and security | 1 | 0% |
| Community and open source | 1 | 0% |
| Pricing | 1 | 0% |
| Pricing: DuckDB support | 1 | 0% |
| Persona landing: founders | 1 | 0% |
| Persona landing: operators | 1 | 0% |
| EU region | 1 | 0% |
| Azure waitlist | 1 | 0% |
| Comparisons index | 1 | 0% |
| About | 1 | 0% |
| Careers | 1 | 0% |
| Contact hub | 1 | 0% |
| Customer support overview | 1 | 0% |
| Contact support form | 1 | 0% |
| Support policy | 1 | 0% |
| Community code | 1 | 0% |
| Free book brief | 1 | 0% |
| Landing page: DuckLake guide | 1 | 0% |
| Landing page: DuckLake book (LP-only chrome) | 1 | 0% |
| Landing page: dive contest | 1 | 0% |
| Landing page: savings calculator | 1 | 0% |
| Split-form landing | 1 | 0% |
| Blog index | 1 | 0% |
| Case studies index | 1 | 0% |
| Videos index | 1 | 0% |
| Ecosystem index | 1 | 0% |
| News index | 1 | 0% |
| Web links feed | 1 | 0% |
| Learn hub | 1 | 0% |
| Events: upcoming | 1 | 0% |
| Dive gallery | 1 | 0% |
| Webinar with side form | 1 | 0% |
| Podcast index | 1 | 0% |
| Try app | 1 | 0% |
| Product feature: Guides | 0 | 0% |
| Glossary index | 0 | 0% |

## Page chrome

**1433 routes carry chrome = `full`** — Homepage, Product overview, Audience page (app developers and data teams), Audience page (DuckDB users), Product feature: Dives, Product feature: Flights, Product feature: MCP server, Product feature: Postgres integration, Product feature: Guides, Product: DuckLake, Product: Hypertenancy, Startups program, Research hub, Trust and security, Community and open source, Pricing, Pricing: DuckDB support, Persona landing: founders, Persona landing: operators, EU region, Azure waitlist, Competitor comparison, Comparisons index, About, Careers, Contact hub, Contact: product expert, Customer support overview, Contact support form, Legal document with table of contents, Support policy, Generic prose page, Generic prose page with side form, Community code, Gated landing page (guide or report), Gated landing page with FAQ, Free book brief, Landing page: DuckLake guide, Landing page: dive contest, Landing page: savings calculator, Split-form landing with sneak peek, Split-form landing, Book chapter summary, Blog index, Blog post, Case studies index, Case study detail, Videos index, Video detail, Ecosystem index, Ecosystem partner detail, News index, Web links feed, Learn hub, Events: upcoming, Events: past archive, Author profile, Learn article, Research paper, Glossary index, Glossary term, Event detail, Webinar or video page, Webinar registration landing, Webinar with side form.

**1 routes carry chrome = `lp-only`** — Landing page: DuckLake book (LP-only chrome).

**136 routes carry chrome = `own-nav`** — Dive gallery, Dive detail.

**12 routes carry chrome = `dark`** — Podcast index, Podcast episode.

**1 routes carry chrome = `bare`** — Try app.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.skip-link` | SHELL | 71 | 1583 | `src/App.jsx > App` | Rendered by the app root on every route, including the chrome-less and own-nav ones. |
| `shell.announcement-bar` | SHELL | 67 | 1445 | `src/components/Header.jsx > Eyebrow` | Part of the fixed site header, so it appears on every route that carries the full site chrome (1445 routes). |
| `shell.site-header` | SHELL | 67 | 1445 | `src/components/Header.jsx > Header` | Carried by every template whose chrome is full or dark (1445 routes); absent on own-nav, lp-only and bare routes. |
| `shell.mega-menus` | SHELL | 67 | 1445 | `src/components/header/MegaMenus.jsx > MENUS` | Opened from the site header on all 1445 routes that carry it. |
| `shell.mobile-menu` | SHELL | 67 | 1445 | `src/components/header/MobileMenu.jsx` | Toggled from the site header on all 1445 routes that carry it. |
| `shell.site-footer` | SHELL | 67 | 1445 | `src/components/Footer.jsx` | Closes every full or dark chrome route (1445 routes); absent on own-nav, lp-only and bare routes. |
| `content.article-prose` | CONTENT | 10 | 972 | `src/components/content/ArticleProse.jsx` | Every article-shaped page: blog, case study, video, webinar, learn, research, glossary, book chapter, ecosystem partner, community code (972 routes). |
| `content.faq-section-article` | CONTENT | 4 | 575 | `src/components/content/videos.jsx > FAQSection` | Video detail, learn articles, glossary terms and book chapters (575 routes). |
| `editorial.read-next-grid` | EDITORIAL | 2 | 415 | `src/components/extra/readNext.jsx` | Learn articles and glossary terms (415 routes). |
| `content.glossary-term-header` | CONTENT | 1 | 347 | `src/pages/extra/GlossaryTerm.jsx > GlossaryTerm` | Every glossary term page (347 routes). |
| `content.related-terms` | CONTENT | 1 | 347 | `src/components/extra/glossary.jsx > RelatedTerms` | Every glossary term page (347 routes). |
| `conversion.term-promo` | CONVERSION | 1 | 347 | `src/components/extra/glossary.jsx > TermPromo` | Glossary term pages (347 routes). |
| `utility.back-to-glossary` | UTILITY | 1 | 347 | `src/components/extra/glossary.jsx > BackToGlossary` | Every glossary term page (347 routes). |
| `content.article-hero-header` | CONTENT | 1 | 272 | `src/pages/content/BlogPost.jsx > Hero` | Every blog post (272 routes). |
| `editorial.recommendation-carousel` | EDITORIAL | 1 | 272 | `src/components/content/RecCarousel.jsx` | Every blog post (272 routes). |
| `conversion.subscribe-band` | CONVERSION | 1 | 272 | `src/components/content/subscribe.jsx > SubscribeBand` | Blog post pages (272 routes). |
| `conversion.floating-get-started` | CONVERSION | 1 | 272 | `src/pages/content/BlogPost.jsx > BlogPost` | Blog post pages (272 routes). |
| `utility.blog-toc` | UTILITY | 1 | 272 | `src/components/content/Toc.jsx > BlogToc` | Every blog post (272 routes). |
| `hero.event-hero` | HERO | 1 | 251 | `src/components/extra/events.jsx > EventHero` | Every event detail page (251 routes). |
| `content.event-body` | CONTENT | 1 | 251 | `src/components/extra/events.jsx > EventBody` | Every event detail page (251 routes). |
| `editorial.more-events` | EDITORIAL | 1 | 251 | `src/components/extra/events.jsx > MoreEvents` | Every event detail page (251 routes). |
| `conversion.event-newsletter-band` | CONVERSION | 1 | 251 | `src/components/extra/events.jsx > EventNewsletterBand` | Every event detail page (251 routes). |
| `conversion.mobile-register-bar` | CONVERSION | 1 | 251 | `src/components/extra/events.jsx > MobileRegisterBar` | Every event detail page (251 routes). |
| `utility.back-to-top-event` | UTILITY | 1 | 251 | `src/components/extra/events.jsx > EventBackToTop` | Every event detail page (251 routes). |
| `utility.toc-fab` | UTILITY | 2 | 217 | `src/components/content/videos.jsx > TocFab` | Video detail and learn articles (217 routes). |
| `hero.sand-grid-band` | HERO | 2 | 160 | `src/components/content/videos.jsx > SandBand` | Video detail pages and standard webinar pages (160 routes). |
| `content.video-player-frame` | CONTENT | 1 | 149 | `src/components/content/videos.jsx > VideoPlayerFrame` | Video detail pages (149 routes). |
| `content.video-title-meta` | CONTENT | 1 | 149 | `src/pages/content/VideoDetail.jsx > VideoDetail` | Video detail pages (149 routes). |
| `content.transcript` | CONTENT | 1 | 149 | `src/components/content/videos.jsx > Transcript` | Video detail pages (149 routes). |
| `editorial.related-videos` | EDITORIAL | 1 | 149 | `src/components/content/videos.jsx > RelatedVideos` | Video detail pages (149 routes). |
| `utility.video-toc-sidebar` | UTILITY | 1 | 149 | `src/components/content/videos.jsx > VideoSidebar` | Video detail pages (149 routes). |
| `shell.dive-nav` | SHELL | 2 | 136 | `src/components/content/diveChrome.jsx > DiveNav` | Used instead of the site header by the gallery and dive-detail templates, 136 routes in total. |
| `shell.dive-footer` | SHELL | 2 | 136 | `src/components/content/diveChrome.jsx > DiveFooter` | Used instead of the site footer by the gallery and dive-detail templates, 136 routes in total. |
| `content.dive-detail-card` | CONTENT | 1 | 135 | `src/components/extra/dive.jsx > DiveCard` | Every dive detail page (135 routes). |
| `content.dive-prompts-used` | CONTENT | 1 | 135 | `src/components/extra/dive.jsx > PromptsUsed` | Every dive detail page (135 routes). |
| `content.dive-comments` | CONTENT | 1 | 135 | `src/components/extra/dive.jsx > Comments` | Every dive detail page (135 routes). |
| `utility.browse-dives-link` | UTILITY | 1 | 135 | `src/components/extra/dive.jsx > BrowseDivesLink` | Every dive detail page (135 routes). |
| `hero.author-hero` | HERO | 1 | 120 | `src/components/extra/author.jsx > AuthorHero` | Every author page (120 routes). |
| `editorial.author-content-grid` | EDITORIAL | 1 | 120 | `src/components/extra/author.jsx > AuthorGrid` | Every author page (120 routes). |
| `conversion.author-subscribe` | CONVERSION | 1 | 120 | `src/components/extra/author.jsx > AuthorSubscribe` | Every author page (120 routes). |
| `content.partner-detail` | CONTENT | 1 | 84 | `src/pages/content/EcosystemDetail.jsx > EcosystemDetail` | Every ecosystem partner page (84 routes). |
| `utility.back-link` | UTILITY | 1 | 84 | `src/components/content/bits.jsx > BackLink` | Ecosystem partner pages (84 routes). |
| `hero.learn-hero` | HERO | 1 | 68 | `src/components/extra/learn.jsx > LearnHero` | Every learn article (68 routes). |
| `conversion.learn-start-card` | CONVERSION | 1 | 68 | `src/components/extra/learn.jsx > StartCard` | Every learn article (68 routes). |
| `utility.learn-sidebar` | UTILITY | 1 | 68 | `src/components/extra/learn.jsx > LearnSidebar` | Every learn article (68 routes). |
| `content.faq-accordion` | CONTENT | 10 | 36 | `src/components/marketing/FAQ.jsx` | Product feature pages, pricing, startups, product overview and DuckDB users pages, competitor pages and some case studies (36 routes). |
| `hero.case-detail-hero` | HERO | 1 | 23 | `src/components/content/cases.jsx > CaseDetailHero` | Every case study detail page (23 routes). |
| `proof.case-quote-band` | PROOF | 1 | 23 | `src/components/content/cases.jsx > QuoteBand` | Every case study detail page (23 routes). |
| `content.case-lede` | CONTENT | 1 | 23 | `src/pages/content/CaseDetail.jsx > CaseDetail` | Every case study detail page (23 routes). |
| `utility.back-to-top-rail` | UTILITY | 1 | 23 | `src/components/content/cases.jsx > BackToTop` | Every case study detail page (23 routes). |
| `utility.search-filter-panel` | UTILITY | 4 | 16 | `src/components/content/filters.jsx > SearchFilterPanel` | Blog index, web-links feed and both events listings (16 routes). |
| `hero.events-hero` | HERO | 2 | 14 | `src/pages/content/EventsHub.jsx > EventsHero` | Upcoming and past events listings (14 routes). |
| `conversion.speaker-banner` | CONVERSION | 2 | 14 | `src/pages/content/EventsHub.jsx > SpeakerBanner` | Upcoming and past events listings (14 routes). |
| `utility.events-tabs` | UTILITY | 2 | 14 | `src/pages/content/EventsHub.jsx > EventsHub` | Upcoming and past events listings (14 routes). |
| `editorial.past-event-list` | EDITORIAL | 1 | 13 | `src/components/extra/events.jsx > PastEventRow` | Past events listing (13 routes). |
| `utility.pagination` | UTILITY | 1 | 13 | `src/components/extra/events.jsx > Pagination` | Past events listing (13 routes). |
| `conversion.cta-band` | CONVERSION | 8 | 12 | `src/components/marketing/CTABand.jsx` | Product feature pages, DuckLake, Hypertenancy and the competitor pages (12 routes). |
| `content.compact-page-title` | CONTENT | 3 | 12 | `src/components/extra/generic.jsx > GenericPage` | Generic prose pages and community code (12 routes). |
| `features.sticky-stack` | FEATURES | 7 | 11 | `src/components/marketing/StickyStack.jsx` | Product feature pages, DuckLake and the competitor pages (11 routes). |
| `content.shape-prose` | CONTENT | 2 | 11 | `src/components/extra/generic.jsx > ShapeProse` | Generic prose pages (11 routes). |
| `content.webinar-player` | CONTENT | 1 | 11 | `src/components/extra/webinar.jsx > Player` | Standard webinar and video pages (11 routes). |
| `content.webinar-meta` | CONTENT | 1 | 11 | `src/components/extra/webinar.jsx > WebinarStandard` | Standard webinar and video pages (11 routes). |
| `content.chapter-header` | CONTENT | 1 | 11 | `src/components/extra/bookChapter.jsx > ChapterHeader` | Every book chapter summary (11 routes). |
| `content.chapter-sidebar` | CONTENT | 1 | 11 | `src/components/extra/bookChapter.jsx > ChapterSidebar` | Every book chapter summary (11 routes). |
| `content.episode-body` | CONTENT | 1 | 11 | `src/components/extra/podcast.jsx > EpisodeBody` | Every podcast episode page (11 routes). |
| `conversion.chapter-cta` | CONVERSION | 1 | 11 | `src/components/extra/bookChapter.jsx > ChapterCta` | Every book chapter summary (11 routes). |
| `conversion.book-panel` | CONVERSION | 1 | 11 | `src/components/extra/bookChapter.jsx > BookPanel` | Every book chapter summary (11 routes). |
| `conversion.read-ebook-bar` | CONVERSION | 1 | 11 | `src/components/extra/bookChapter.jsx > ReadEbookBar` | Every book chapter summary (11 routes). |
| `utility.gated-video-modal` | UTILITY | 1 | 11 | `src/components/extra/webinar.jsx > GatedVideoModal` | Standard webinar and video pages (11 routes). |
| `utility.chapter-back-link` | UTILITY | 1 | 11 | `src/pages/extra/BookChapter.jsx > BookChapter` | Every book chapter summary (11 routes). |
| `utility.episode-back` | UTILITY | 1 | 11 | `src/components/extra/podcast.jsx > EpisodeBack` | Every podcast episode page (11 routes). |
| `hero.lp-hero` | HERO | 4 | 9 | `src/components/company/lp.jsx > LPHero` | Every gated landing page, including the bespoke book LPs (9 routes). |
| `content.lp-band-sections` | CONTENT | 4 | 9 | `src/components/company/lp.jsx > LPSection` | Every gated landing page body; band contents vary per page (9 routes). |
| `proof.quote-carousel` | PROOF | 3 | 8 | `src/components/marketing/QuoteCarousel.jsx` | Pricing, Hypertenancy and the competitor pages (8 routes). |
| `conversion.gated-form` | CONVERSION | 3 | 8 | `src/components/company/lp.jsx > GatedFormSection` | Gated landing pages and the book LP variants (8 routes). |
| `features.marquee-band` | FEATURES | 2 | 7 | `src/components/marketing/MarqueeBand.jsx` | Product overview and the six competitor pages (7 routes). |
| `hero.vs-hero` | HERO | 1 | 6 | `src/components/marketing/vs.jsx > VsHero` | The six competitor comparison pages. |
| `hero.research-hero` | HERO | 1 | 6 | `src/components/extra/research.jsx > ResearchHero` | Every research paper page (6 routes). |
| `features.benchmark-panel` | FEATURES | 1 | 6 | `src/components/marketing/vs.jsx > BenchmarkPanel` | Competitor comparison pages (6 routes). |
| `features.compare-cards` | FEATURES | 1 | 6 | `src/components/marketing/vs.jsx > CompareCards` | The six competitor pages. |
| `proof.logo-bar` | PROOF | 1 | 6 | `src/components/marketing/vs.jsx > LogoBar` | The six competitor pages. |
| `content.comparison-table` | CONTENT | 1 | 6 | `src/components/marketing/vs.jsx > ComparisonTable` | The six competitor pages. |
| `content.last-updated-note` | CONTENT | 1 | 6 | `src/components/marketing/vs.jsx > LastUpdated` | The six competitor pages. |
| `utility.research-toc-box` | UTILITY | 1 | 6 | `src/components/extra/research.jsx > TocBox` | Every research paper (6 routes). |
| `utility.research-sidebar` | UTILITY | 1 | 6 | `src/components/extra/research.jsx > ResearchSidebar` | Every research paper (6 routes). |
| `utility.view-paper-fab` | UTILITY | 1 | 6 | `src/components/extra/research.jsx > ViewPaperFab` | Every research paper (6 routes). |
| `hero.left-hero` | HERO | 4 | 4 | `src/components/marketing/bespoke.jsx > LeftHero` | The four bespoke product pages: startups, research, trust and open source. |
| `hero.feed-hero` | HERO | 4 | 4 | `src/components/content/FeedHero.jsx` | Blog index, news, web-links feed and learn hub (4 routes). |
| `proof.quote-spotlight` | PROOF | 4 | 4 | `src/components/marketing/QuoteSpotlight.jsx` | Flights, MCP server, Postgres integration and startups pages. |
| `utility.load-more-footer` | UTILITY | 4 | 4 | `src/components/content/bits.jsx > FeedFooter` | Blog, news, web-links feed and videos (4 routes). |
| `hero.persona-hero` | HERO | 3 | 4 | `src/components/marketing/persona.jsx > PersonaHero` | Product overview and the three audience pages (4 routes). |
| `features.persona-split-rows` | FEATURES | 3 | 4 | `src/components/marketing/persona.jsx > PersonaSplitRows` | Audience pages and the pricing page (4 routes). |
| `features.feature-grid` | FEATURES | 3 | 4 | `src/components/marketing/persona.jsx > FeatureGrid` | Product overview and the three audience pages (4 routes). |
| `features.architecture-panel` | FEATURES | 3 | 4 | `src/components/marketing/persona.jsx > ArchitecturePanel` | Product overview and the three audience pages (4 routes). |
| `features.ecosystem-diagram` | FEATURES | 3 | 4 | `src/components/marketing/persona.jsx > EcosystemDiagram` | Product overview and the three audience pages (4 routes). |
| `proof.case-study-carousel` | PROOF | 3 | 4 | `src/components/marketing/persona.jsx > CaseStudyCarousel` | Product overview and the three audience pages (4 routes). |
| `content.lp-faq` | CONTENT | 3 | 4 | `src/components/company/lp.jsx > FAQSection` | Landing pages with a FAQ band (4 routes). |
| `legal.document-title` | LEGAL | 1 | 4 | `src/components/company/legal.jsx > LegalShell` | All legal documents that carry a table of contents (4 routes). |
| `legal.toc-sidebar` | LEGAL | 1 | 4 | `src/components/company/legal.jsx > Toc` | All legal documents that carry a table of contents (4 routes). |
| `legal.document-article` | LEGAL | 1 | 4 | `src/components/company/legal.jsx > PrivacyPolicy` | All legal documents that carry a table of contents (4 routes). |
| `hero.product-hero-centered` | HERO | 4 | 3 | `src/components/marketing/feature.jsx > ProductHeroCentered` | Feature pages for Dives, Flights, MCP server and the (clone-only) Guides page. |
| `editorial.post-card-grid` | EDITORIAL | 3 | 3 | `src/components/content/feedCards.jsx > PostCard` | Blog index, news and web-links feed (3 routes). |
| `utility.category-chips` | UTILITY | 3 | 3 | `src/components/content/CategoryChips.jsx` | Case studies, videos and ecosystem indexes (3 routes). |
| `hero.split-form-hero` | HERO | 2 | 3 | `src/components/extra/splitForm.jsx > SplitHero` | The three split-form landing pages (3 routes). |
| `conversion.split-form-panel` | CONVERSION | 2 | 3 | `src/components/extra/splitForm.jsx > SplitPanel` | The three split-form pages (3 routes). |
| `conversion.webinar-register-lp` | CONVERSION | 1 | 3 | `src/components/extra/webinar.jsx > WebinarRegisterLP` | On-demand webinar pages with a registration form. |
| `hero.persona2-hero` | HERO | 2 | 2 | `src/components/extra/persona2.jsx > PersonaHero2` | The two persona landing pages (2 routes). |
| `features.media-frame` | FEATURES | 2 | 2 | `src/components/marketing/feature.jsx > MediaFrame` | Dives and Flights pages. |
| `features.problem-cards` | FEATURES | 2 | 2 | `src/components/marketing/feature.jsx > ProblemCards` | MCP server and Postgres integration pages. |
| `features.dark-features` | FEATURES | 2 | 2 | `src/components/extra/persona2.jsx > DarkFeatures` | The two persona landing pages (2 routes). |
| `features.agent-links` | FEATURES | 2 | 2 | `src/components/extra/persona2.jsx > AgentLinks` | The two persona landing pages (2 routes). |
| `proof.persona2-logo-strip` | PROOF | 2 | 2 | `src/components/extra/persona2.jsx > LogoStrip2` | The two persona landing pages (2 routes). |
| `proof.industry-swiper` | PROOF | 2 | 2 | `src/components/extra/persona2.jsx > IndustrySwiper` | The two persona landing pages (2 routes). |
| `conversion.contact-form` | CONVERSION | 2 | 2 | `src/components/marketing/persona.jsx > ContactForm` | Product overview and DuckDB users page (2 routes). |
| `conversion.persona2-pricing-band` | CONVERSION | 2 | 2 | `src/components/extra/persona2.jsx > PricingBand2` | The two persona landing pages (2 routes). |
| `conversion.persona2-closing-band` | CONVERSION | 2 | 2 | `src/components/extra/persona2.jsx > ClosingBand2` | The two persona landing pages (2 routes). |
| `conversion.subscribe-tile` | CONVERSION | 2 | 2 | `src/components/content/subscribe.jsx > SubscribeTile` | Blog and videos listings (2 routes). |
| `conversion.subscribe-banner` | CONVERSION | 2 | 2 | `src/components/content/subscribe.jsx > SubscribeBanner` | News and upcoming events listings (2 routes). |
| `utility.search-field` | UTILITY | 2 | 2 | `src/components/content/filters.jsx > SearchField` | Videos and ecosystem indexes (2 routes). |
| `content.sneak-peek` | CONTENT | 1 | 2 | `src/components/extra/splitForm.jsx > SneakPeek` | Two of the three split-form pages. |
| `conversion.yellow-cta` | CONVERSION | 1 | 2 | `src/components/marketing/persona.jsx > YellowCTA` | Two of the three audience pages. |
| `conversion.contact-split-form` | CONVERSION | 1 | 2 | `src/components/company/contact.jsx > ContactSplitForm` | Product expert contact page and its onboarding redirect (2 routes). |
| `conversion.side-form` | CONVERSION | 1 | 2 | `src/components/extra/generic.jsx > SideForm` | The two generic pages that carry a form. |
| `conversion.form-bar` | CONVERSION | 1 | 2 | `src/components/extra/generic.jsx > FormBar` | The two generic pages that carry a form. |
| `shell.lp-anchor-nav` | SHELL | 1 | 1 | `src/pages/extra/LpExtra.jsx > LpNav` | Only on the book landing page that renders without site chrome (reached directly and via a redirect, 1 routes). |
| `hero.home-hero` | HERO | 1 | 1 | `src/components/Hero.jsx > Hero` | Homepage only. |
| `hero.split-hero` | HERO | 1 | 1 | `src/components/marketing/feature.jsx > SplitHero` | Postgres integration page only. |
| `hero.ducklake-hero` | HERO | 1 | 1 | `src/components/marketing/ducklake.jsx > DuckLakeHero` | DuckLake product page only. |
| `hero.dark-hero` | HERO | 1 | 1 | `src/components/marketing/hypertenancy.jsx > DarkHero` | Hypertenancy product page only. |
| `hero.vs-index-hero` | HERO | 1 | 1 | `src/components/extra/vsIndex.jsx > VsIndexHero` | The comparisons index only. |
| `hero.eu-hero` | HERO | 1 | 1 | `src/components/extra/euRegion.jsx > EuHero` | EU region page only. |
| `hero.about-hero` | HERO | 1 | 1 | `src/components/company/about.jsx > AboutHero` | About page only. |
| `hero.careers-hero` | HERO | 1 | 1 | `src/components/company/careers.jsx > CareersHero` | Careers page only. |
| `hero.support-hero` | HERO | 1 | 1 | `src/components/company/contact.jsx > SupportHero` | Customer support overview only. |
| `hero.contact-support-title` | HERO | 1 | 1 | `src/pages/extra/ContactSupport.jsx > ContactSupport` | Contact support form page only. |
| `hero.book-hero` | HERO | 1 | 1 | `src/components/company/book.jsx > BookHero` | Free book brief page only. |
| `hero.case-title-hero` | HERO | 1 | 1 | `src/components/content/cases.jsx > TitleHero` | Case studies index only. |
| `hero.sand-grid-hero` | HERO | 1 | 1 | `src/components/content/videos.jsx > SandGridHero` | Videos index only. |
| `hero.eco-hero` | HERO | 1 | 1 | `src/components/content/eco.jsx > EcoHero` | Ecosystem index only. |
| `hero.podcast-hero` | HERO | 1 | 1 | `src/components/extra/podcast.jsx > PodcastHero` | Podcast index only. |
| `hero.dive-gallery-hero` | HERO | 1 | 1 | `src/pages/content/DiveGallery.jsx > DiveGallery` | Dive gallery index only. |
| `hero.divemaxxing-hero` | HERO | 1 | 1 | `src/components/extra/divemaxxing.jsx > Hero` | Dive contest landing page only. |
| `hero.jev-hero` | HERO | 1 | 1 | `src/components/extra/jev.jsx > Hero` | Savings landing page only. |
| `features.architecture-diagram` | FEATURES | 1 | 1 | `src/components/Architecture.jsx > Architecture` | Homepage only. |
| `features.platform-overview` | FEATURES | 1 | 1 | `src/components/Platform.jsx > Platform` | Homepage only. |
| `features.integrations-ecosystem` | FEATURES | 1 | 1 | `src/components/Integrations.jsx > Integrations` | Homepage only. |
| `features.agent-native-showcase` | FEATURES | 1 | 1 | `src/components/AgentNative.jsx > AgentNative` | Homepage only. |
| `features.use-case-split` | FEATURES | 1 | 1 | `src/components/marketing/overview.jsx > UseCaseSplit` | Product overview only. |
| `features.old-world-new-world` | FEATURES | 1 | 1 | `src/components/marketing/overview.jsx > OldWorldNewWorld` | Product overview only. |
| `features.agent-card-carousel` | FEATURES | 1 | 1 | `src/components/marketing/overview.jsx > AgentCardCarousel` | Product overview only. |
| `features.divemaxxing-embed` | FEATURES | 1 | 1 | `src/components/extra/divemaxxing.jsx > Embed` | Dive contest landing page only. |
| `features.video-frame` | FEATURES | 1 | 1 | `src/components/marketing/feature.jsx > VideoFrame` | Dives page only. |
| `features.live-embed` | FEATURES | 1 | 1 | `src/components/marketing/feature.jsx > LiveEmbed` | Dives page only. |
| `features.gallery-teaser` | FEATURES | 1 | 1 | `src/components/marketing/feature.jsx > GalleryTeaser` | Dives page only. |
| `features.cookbook-grid` | FEATURES | 1 | 1 | `src/components/marketing/feature.jsx > CookbookGrid` | Flights page only. |
| `features.format-compare` | FEATURES | 1 | 1 | `src/components/marketing/ducklake.jsx > FormatCompare` | DuckLake page only. |
| `features.resource-carousel` | FEATURES | 1 | 1 | `src/components/marketing/ducklake.jsx > ResourceCarousel` | DuckLake page only. |
| `features.alternating-feature-rows` | FEATURES | 1 | 1 | `src/components/marketing/hypertenancy.jsx > AlternatingFeatureRows` | Hypertenancy page only. |
| `features.program-benefits` | FEATURES | 1 | 1 | `src/components/marketing/bespoke.jsx > ProgramBenefits` | Startups page only. |
| `features.persona-split-sticky` | FEATURES | 1 | 1 | `src/components/marketing/bespoke.jsx > PersonaSplitSticky` | Startups page only. |
| `features.repo-grid` | FEATURES | 1 | 1 | `src/components/marketing/bespoke.jsx > RepoGrid` | Open source community page only. |
| `features.split-media` | FEATURES | 1 | 1 | `src/components/extra/persona2.jsx > SplitMedia` | Founder landing page only. |
| `features.gallery-row` | FEATURES | 1 | 1 | `src/components/extra/persona2.jsx > GalleryRow` | Operator landing page only. |
| `features.security-split` | FEATURES | 1 | 1 | `src/components/extra/persona2.jsx > SecuritySplit` | Operator landing page only. |
| `features.vs-why-band` | FEATURES | 1 | 1 | `src/components/extra/vsIndex.jsx > WhyBand` | Comparisons index only. |
| `features.all-comparisons` | FEATURES | 1 | 1 | `src/components/extra/vsIndex.jsx > AllComparisons` | Comparisons index only. |
| `features.azure-steps` | FEATURES | 1 | 1 | `src/components/extra/azure.jsx > AzureSteps` | Azure page only. |
| `features.values-cards` | FEATURES | 1 | 1 | `src/components/company/careers.jsx > ValuesCards` | Careers page only. |
| `features.benefits-card` | FEATURES | 1 | 1 | `src/components/company/careers.jsx > BenefitsCard` | Careers page only. |
| `features.tech-partner-directory` | FEATURES | 1 | 1 | `src/components/content/eco.jsx > PartnerCard` | Ecosystem index only. |
| `proof.customer-stories` | PROOF | 1 | 1 | `src/components/Customers.jsx > Customers` | Homepage only. |
| `proof.investor-logos` | PROOF | 1 | 1 | `src/components/marketing/bespoke.jsx > InvestorLogos` | Startups page only. |
| `proof.logo-marquee` | PROOF | 1 | 1 | `src/components/marketing/bespoke.jsx > LogoMarquee` | Startups page only. |
| `proof.eu-partners` | PROOF | 1 | 1 | `src/components/extra/euRegion.jsx > EuPartners` | EU region page only. |
| `proof.investors` | PROOF | 1 | 1 | `src/components/company/about.jsx > Investors` | About page only. |
| `proof.team-photo` | PROOF | 1 | 1 | `src/components/company/about.jsx > TeamPhoto` | About page only. |
| `proof.careers-testimonials` | PROOF | 1 | 1 | `src/components/company/careers.jsx > Testimonials` | Careers page only. |
| `proof.testimonial-carousel` | PROOF | 1 | 1 | `src/components/content/cases.jsx > TestimonialCarousel` | Case studies index only. |
| `proof.case-study-grid` | PROOF | 1 | 1 | `src/components/content/cases.jsx > CaseStudyCard` | Case studies index only. |
| `proof.consulting-partner-directory` | PROOF | 1 | 1 | `src/components/content/eco.jsx > PartnerCard` | Ecosystem index only. |
| `content.origin-story` | CONTENT | 1 | 1 | `src/components/company/about.jsx > OriginStory` | About page only. |
| `content.how-we-work` | CONTENT | 1 | 1 | `src/components/company/careers.jsx > HowWeWork` | Careers page only. |
| `content.video-feature` | CONTENT | 1 | 1 | `src/components/company/careers.jsx > VideoFeature` | Careers page only. |
| `content.jobs-board` | CONTENT | 1 | 1 | `src/components/company/careers.jsx > JobsBoard` | Careers page only. |
| `content.photo-marquee` | CONTENT | 1 | 1 | `src/components/company/careers.jsx > PhotoMarquee` | Careers page only. |
| `content.support-body` | CONTENT | 1 | 1 | `src/components/company/contact.jsx > SupportBody` | Customer support overview only. |
| `content.contact-support-help` | CONTENT | 1 | 1 | `src/pages/extra/ContactSupport.jsx > ContactSupport` | Contact support form page only. |
| `content.book-body` | CONTENT | 1 | 1 | `src/components/company/book.jsx > BookBody` | Free book brief page only. |
| `content.research-chips` | CONTENT | 1 | 1 | `src/components/marketing/bespoke.jsx > ResearchChips` | Research page only. |
| `content.trust-section` | CONTENT | 1 | 1 | `src/components/marketing/bespoke.jsx > TrustSection` | Trust and security page only. |
| `content.code-sample` | CONTENT | 1 | 1 | `src/components/marketing/ducklake.jsx > CodeSample` | DuckLake page only. |
| `content.azure-coming` | CONTENT | 1 | 1 | `src/components/extra/azure.jsx > AzureComing` | Azure page only. |
| `content.azure-faq` | CONTENT | 1 | 1 | `src/components/extra/azure.jsx > AzureFaq` | Azure page only. |
| `content.divemaxxing-what-is-a-dive` | CONTENT | 1 | 1 | `src/components/extra/divemaxxing.jsx > WhatsADive` | Dive contest landing page only. |
| `content.divemaxxing-competition` | CONTENT | 1 | 1 | `src/components/extra/divemaxxing.jsx > Competition` | Dive contest landing page only. |
| `content.divemaxxing-judges` | CONTENT | 1 | 1 | `src/components/extra/divemaxxing.jsx > Judges` | Dive contest landing page only. |
| `content.divemaxxing-timeline` | CONTENT | 1 | 1 | `src/components/extra/divemaxxing.jsx > Timeline` | Dive contest landing page only. |
| `content.divemaxxing-prizes` | CONTENT | 1 | 1 | `src/components/extra/divemaxxing.jsx > Prizes` | Dive contest landing page only. |
| `editorial.home-blog-teaser` | EDITORIAL | 1 | 1 | `src/components/Blog.jsx > Blog` | Homepage only. |
| `editorial.featured-post-card` | EDITORIAL | 1 | 1 | `src/components/content/feedCards.jsx > FeaturedPostCard` | Blog index only. |
| `editorial.news-digest-card` | EDITORIAL | 1 | 1 | `src/components/content/feedCards.jsx > NewsDigestCard` | News index only. |
| `editorial.learn-card-grid` | EDITORIAL | 1 | 1 | `src/pages/content/LearnHub.jsx > LearnCard` | Learn hub only. |
| `editorial.featured-video` | EDITORIAL | 1 | 1 | `src/components/content/videos.jsx > FeaturedVideo` | Videos index only. |
| `editorial.video-card-grid` | EDITORIAL | 1 | 1 | `src/components/content/videos.jsx > VideoCard` | Videos index only. |
| `editorial.event-row-list` | EDITORIAL | 1 | 1 | `src/pages/content/EventsHub.jsx > EventRow` | Upcoming events only. |
| `editorial.paper-list` | EDITORIAL | 1 | 1 | `src/components/marketing/bespoke.jsx > PaperList` | Research page only. |
| `editorial.social-carousel` | EDITORIAL | 1 | 1 | `src/components/marketing/bespoke.jsx > SocialCarousel` | Open source community page only. |
| `editorial.eu-webinars` | EDITORIAL | 1 | 1 | `src/components/extra/euRegion.jsx > EuWebinars` | EU region page only. |
| `editorial.eu-posts` | EDITORIAL | 1 | 1 | `src/components/extra/euRegion.jsx > EuPosts` | EU region page only. |
| `editorial.latest-episode` | EDITORIAL | 1 | 1 | `src/components/extra/podcast.jsx > LatestEpisode` | Podcast index only. |
| `editorial.episode-grid` | EDITORIAL | 1 | 1 | `src/components/extra/podcast.jsx > EpisodeGrid` | Podcast index only. |
| `editorial.dive-card-grid` | EDITORIAL | 1 | 1 | `src/pages/content/DiveGallery.jsx > DiveCard` | Dive gallery index only. |
| `conversion.newsletter-signup` | CONVERSION | 1 | 1 | `src/components/marketing/ducklake.jsx > NewsletterSignup` | DuckLake page only. |
| `conversion.apply-form` | CONVERSION | 1 | 1 | `src/components/marketing/bespoke.jsx > ApplyForm` | Startups page only. |
| `conversion.azure-waitlist` | CONVERSION | 1 | 1 | `src/components/extra/azure.jsx > AzureWaitlist` | Azure page only. |
| `conversion.azure-vote` | CONVERSION | 1 | 1 | `src/components/extra/azure.jsx > AzureVote` | Azure page only. |
| `conversion.azure-closing` | CONVERSION | 1 | 1 | `src/components/extra/azure.jsx > AzureClosing` | Azure page only. |
| `conversion.contact-band` | CONVERSION | 1 | 1 | `src/components/company/about.jsx > ContactBand` | About page only. |
| `conversion.community-cta` | CONVERSION | 1 | 1 | `src/components/company/about.jsx > CommunityCTA` | About page only. |
| `conversion.careers-closing-cta` | CONVERSION | 1 | 1 | `src/components/company/careers.jsx > ClosingCTA` | Careers page only. |
| `conversion.contact-chooser` | CONVERSION | 1 | 1 | `src/components/company/contact.jsx > ContactChooser` | Contact hub only. |
| `conversion.support-request-form` | CONVERSION | 1 | 1 | `src/pages/extra/ContactSupport.jsx > SupportForm` | Contact support form page only. |
| `conversion.gated-form-alt` | CONVERSION | 1 | 1 | `src/components/extra/lpBlocks.jsx > GatedFormSection2` | DuckLake guide LP only. |
| `conversion.webinar-side-form` | CONVERSION | 1 | 1 | `src/components/extra/webinar.jsx > WebinarSideForm` | One webinar page. |
| `conversion.mobile-subscribe-button` | CONVERSION | 1 | 1 | `src/components/content/subscribe.jsx > MobileSubscribeButton` | Blog index only. |
| `conversion.eco-join-card` | CONVERSION | 1 | 1 | `src/components/content/eco.jsx > JoinFlockCard` | Ecosystem index only. |
| `conversion.eco-build-cta` | CONVERSION | 1 | 1 | `src/components/content/eco.jsx > BuildCTA` | Ecosystem index only. |
| `conversion.jev-closing` | CONVERSION | 1 | 1 | `src/components/extra/jev.jsx > Closing` | Savings landing page only. |
| `commerce.pricing-hero` | COMMERCE | 1 | 1 | `src/components/marketing/pricing.jsx > PricingHero` | Pricing page only. |
| `commerce.tier-cards` | COMMERCE | 1 | 1 | `src/components/marketing/pricing.jsx > TierCards` | Pricing page only. |
| `commerce.plan-matrix` | COMMERCE | 1 | 1 | `src/components/marketing/pricing.jsx > PlanMatrix` | Pricing page only. |
| `commerce.instances` | COMMERCE | 1 | 1 | `src/components/marketing/pricing.jsx > InstancesSection` | Pricing page only. |
| `commerce.pricing-final-cta` | COMMERCE | 1 | 1 | `src/components/marketing/pricing.jsx > FinalCTA` | Pricing page only. |
| `commerce.duckdb-support-panel` | COMMERCE | 1 | 1 | `src/components/marketing/pricing.jsx > DuckDBSupportPanel` | DuckDB support pricing page only. |
| `commerce.jev-calculator` | COMMERCE | 1 | 1 | `src/components/extra/jev.jsx > Calculator` | Savings landing page only. |
| `commerce.jev-pricing` | COMMERCE | 1 | 1 | `src/components/extra/jev.jsx > Pricing` | Savings landing page only. |
| `legal.support-policy-document` | LEGAL | 1 | 1 | `src/components/company/legal.jsx > SupportPolicy` | Support policy page only. |
| `utility.partner-modal` | UTILITY | 1 | 1 | `src/components/content/eco.jsx > PartnerModal` | Ecosystem index only. |
| `utility.dive-search-filter-bar` | UTILITY | 1 | 1 | `src/pages/content/DiveGallery.jsx > DiveGallery` | Dive gallery index only. |
| `utility.dive-sort-toolbar` | UTILITY | 1 | 1 | `src/pages/content/DiveGallery.jsx > SortMenu` | Dive gallery index only. |
| `app.try-workspace` | APP | 1 | 1 | `src/pages/extra/Try.jsx > Try` | Try page only; no site header or footer. |
| `hero.glossary-hero` | HERO | 1 | 0 | `src/components/extra/glossary.jsx > GlossaryHero` | Glossary index (clone-only route). |
| `features.browser-window-demo` | FEATURES | 1 | 0 | `src/components/marketing/feature.jsx > BrowserWindowDemo` | Guides feature page (clone-only route). |
| `content.glossary-letters` | CONTENT | 1 | 0 | `src/components/extra/glossary.jsx > LetterSection` | Glossary index (clone-only route). |
| `utility.glossary-bar` | UTILITY | 1 | 0 | `src/components/extra/glossary.jsx > GlossaryBar` | Glossary index (clone-only route). |

**56 shared sections** appear in more than one template and belong in a component library.

**189 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.home-hero` | page-local |
| 7 | FEATURES | `features.architecture-diagram` | page-local |
| 8 | FEATURES | `features.platform-overview` | page-local |
| 9 | FEATURES | `features.integrations-ecosystem` | page-local |
| 10 | PROOF | `proof.customer-stories` | page-local |
| 11 | FEATURES | `features.agent-native-showcase` | page-local |
| 12 | EDITORIAL | `editorial.home-blog-teaser` | page-local |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Product overview — `template.product-overview`

1 route · `/product` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.persona-hero` | shared ×3 |
| 7 | FEATURES | `features.marquee-band` | shared ×2 |
| 8 | FEATURES | `features.use-case-split` | page-local |
| 9 | FEATURES | `features.old-world-new-world` | page-local |
| 10 | FEATURES | `features.agent-card-carousel` | page-local |
| 11 | FEATURES | `features.architecture-panel` | shared ×3 |
| 12 | FEATURES | `features.feature-grid` | shared ×3 |
| 13 | FEATURES | `features.ecosystem-diagram` | shared ×3 |
| 14 | PROOF | `proof.case-study-carousel` | shared ×3 |
| 15 | CONTENT | `content.faq-accordion` | shared ×10 |
| 16 | CONVERSION | `conversion.contact-form` | shared ×2 |
| 17 | SHELL | `shell.site-footer` | shared ×67 |

### Audience page (app developers and data teams) — `template.product-persona-solutions`

2 routes · `/product/app-developers`, `/product/data-teams` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.persona-hero` | shared ×3 |
| 7 | FEATURES | `features.persona-split-rows` | shared ×3 |
| 8 | FEATURES | `features.feature-grid` | shared ×3 |
| 9 | FEATURES | `features.architecture-panel` | shared ×3 |
| 10 | CONVERSION | `conversion.yellow-cta` | page-local |
| 11 | FEATURES | `features.ecosystem-diagram` | shared ×3 |
| 12 | PROOF | `proof.case-study-carousel` | shared ×3 |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Audience page (DuckDB users) — `template.product-persona-duckdb`

1 route · `/product/duckdb-users` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.persona-hero` | shared ×3 |
| 7 | FEATURES | `features.persona-split-rows` | shared ×3 |
| 8 | FEATURES | `features.feature-grid` | shared ×3 |
| 9 | FEATURES | `features.architecture-panel` | shared ×3 |
| 10 | FEATURES | `features.ecosystem-diagram` | shared ×3 |
| 11 | PROOF | `proof.case-study-carousel` | shared ×3 |
| 12 | CONTENT | `content.faq-accordion` | shared ×10 |
| 13 | CONVERSION | `conversion.contact-form` | shared ×2 |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Product feature: Dives — `template.product-dives`

1 route · `/product/dives` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.product-hero-centered` | shared ×4 |
| 7 | FEATURES | `features.video-frame` | page-local |
| 8 | FEATURES | `features.media-frame` | shared ×2 |
| 9 | FEATURES | `features.sticky-stack` | shared ×7 |
| 10 | FEATURES | `features.live-embed` | page-local |
| 11 | FEATURES | `features.gallery-teaser` | page-local |
| 12 | CONTENT | `content.faq-accordion` | shared ×10 |
| 13 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Product feature: Flights — `template.product-flights`

1 route · `/product/flights` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.product-hero-centered` | shared ×4 |
| 7 | FEATURES | `features.media-frame` | shared ×2 |
| 8 | FEATURES | `features.sticky-stack` | shared ×7 |
| 9 | PROOF | `proof.quote-spotlight` | shared ×4 |
| 10 | FEATURES | `features.cookbook-grid` | page-local |
| 11 | CONTENT | `content.faq-accordion` | shared ×10 |
| 12 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Product feature: MCP server — `template.product-mcp-server`

1 route · `/product/mcp-server` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.product-hero-centered` | shared ×4 |
| 7 | FEATURES | `features.problem-cards` | shared ×2 |
| 8 | FEATURES | `features.sticky-stack` | shared ×7 |
| 9 | PROOF | `proof.quote-spotlight` | shared ×4 |
| 10 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Product feature: Postgres integration — `template.product-postgres`

1 route · `/product/postgres-integration` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.split-hero` | page-local |
| 7 | FEATURES | `features.problem-cards` | shared ×2 |
| 8 | FEATURES | `features.sticky-stack` | shared ×7 |
| 9 | PROOF | `proof.quote-spotlight` | shared ×4 |
| 10 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Product feature: Guides — `template.product-guides`

0 route ·  · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.product-hero-centered` | shared ×4 |
| 7 | FEATURES | `features.browser-window-demo` | page-local |
| 8 | FEATURES | `features.sticky-stack` | shared ×7 |
| 9 | CONTENT | `content.faq-accordion` | shared ×10 |
| 10 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Product: DuckLake — `template.product-ducklake`

1 route · `/product/ducklake` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.ducklake-hero` | page-local |
| 7 | FEATURES | `features.format-compare` | page-local |
| 8 | CONVERSION | `conversion.newsletter-signup` | page-local |
| 9 | FEATURES | `features.sticky-stack` | shared ×7 |
| 10 | CONTENT | `content.code-sample` | page-local |
| 11 | FEATURES | `features.resource-carousel` | page-local |
| 12 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Product: Hypertenancy — `template.product-hypertenancy`

1 route · `/product/hypertenancy` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.dark-hero` | page-local |
| 7 | PROOF | `proof.quote-carousel` | shared ×3 |
| 8 | FEATURES | `features.alternating-feature-rows` | page-local |
| 9 | CONTENT | `content.faq-accordion` | shared ×10 |
| 10 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Startups program — `template.startups`

1 route · `/startups` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.left-hero` | shared ×4 |
| 7 | PROOF | `proof.quote-spotlight` | shared ×4 |
| 8 | PROOF | `proof.investor-logos` | page-local |
| 9 | FEATURES | `features.program-benefits` | page-local |
| 10 | PROOF | `proof.logo-marquee` | page-local |
| 11 | FEATURES | `features.persona-split-sticky` | page-local |
| 12 | CONVERSION | `conversion.apply-form` | page-local |
| 13 | CONTENT | `content.faq-accordion` | shared ×10 |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Research hub — `template.research-hub`

1 route · `/research` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.left-hero` | shared ×4 |
| 7 | CONTENT | `content.research-chips` | page-local |
| 8 | EDITORIAL | `editorial.paper-list` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Trust and security — `template.trust-security`

1 route · `/trust-and-security` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.left-hero` | shared ×4 |
| 7 | CONTENT | `content.trust-section` | page-local |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Community and open source — `template.open-source-community`

1 route · `/community-and-open-source` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.left-hero` | shared ×4 |
| 7 | FEATURES | `features.repo-grid` | page-local |
| 8 | EDITORIAL | `editorial.social-carousel` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Pricing — `template.pricing`

1 route · `/product/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | COMMERCE | `commerce.pricing-hero` | page-local |
| 7 | COMMERCE | `commerce.tier-cards` | page-local |
| 8 | PROOF | `proof.quote-carousel` | shared ×3 |
| 9 | COMMERCE | `commerce.plan-matrix` | page-local |
| 10 | COMMERCE | `commerce.instances` | page-local |
| 11 | FEATURES | `features.persona-split-rows` | shared ×3 |
| 12 | CONTENT | `content.faq-accordion` | shared ×10 |
| 13 | COMMERCE | `commerce.pricing-final-cta` | page-local |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Pricing: DuckDB support — `template.pricing-duckdb-support`

1 route · `/product/pricing/duckdb-support` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | COMMERCE | `commerce.duckdb-support-panel` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×67 |

### Persona landing: founders — `template.persona-founders`

1 route · `/product/for-founders` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.persona2-hero` | shared ×2 |
| 7 | PROOF | `proof.persona2-logo-strip` | shared ×2 |
| 8 | FEATURES | `features.dark-features` | shared ×2 |
| 9 | FEATURES | `features.split-media` | page-local |
| 10 | PROOF | `proof.industry-swiper` | shared ×2 |
| 11 | CONVERSION | `conversion.persona2-pricing-band` | shared ×2 |
| 12 | FEATURES | `features.agent-links` | shared ×2 |
| 13 | CONVERSION | `conversion.persona2-closing-band` | shared ×2 |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Persona landing: operators — `template.persona-operators`

1 route · `/product/for-operators` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.persona2-hero` | shared ×2 |
| 7 | PROOF | `proof.persona2-logo-strip` | shared ×2 |
| 8 | FEATURES | `features.dark-features` | shared ×2 |
| 9 | FEATURES | `features.gallery-row` | page-local |
| 10 | FEATURES | `features.security-split` | page-local |
| 11 | CONVERSION | `conversion.persona2-pricing-band` | shared ×2 |
| 12 | PROOF | `proof.industry-swiper` | shared ×2 |
| 13 | FEATURES | `features.agent-links` | shared ×2 |
| 14 | CONVERSION | `conversion.persona2-closing-band` | shared ×2 |
| 15 | SHELL | `shell.site-footer` | shared ×67 |

### EU region — `template.eu-region`

1 route · `/product/eu-region` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.eu-hero` | page-local |
| 7 | PROOF | `proof.eu-partners` | page-local |
| 8 | EDITORIAL | `editorial.eu-webinars` | page-local |
| 9 | EDITORIAL | `editorial.eu-posts` | page-local |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Azure waitlist — `template.azure-waitlist`

1 route · `/product/azure` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONVERSION | `conversion.azure-waitlist` | page-local |
| 7 | CONTENT | `content.azure-coming` | page-local |
| 8 | CONVERSION | `conversion.azure-vote` | page-local |
| 9 | FEATURES | `features.azure-steps` | page-local |
| 10 | CONTENT | `content.azure-faq` | page-local |
| 11 | CONVERSION | `conversion.azure-closing` | page-local |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Competitor comparison — `template.vs-comparison`

6 routes · `/vs/clickhouse-alternative`, `/vs/databricks-alternative`, `/vs/postgresql-alternative`, `/vs/snowflake-alternative`, `/vs/bigquery-alternative`, `/vs/redshift-alternative` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.vs-hero` | page-local |
| 7 | FEATURES | `features.marquee-band` | shared ×2 |
| 8 | CONTENT | `content.comparison-table` | page-local |
| 9 | CONTENT | `content.last-updated-note` | page-local |
| 10 | PROOF | `proof.logo-bar` | page-local |
| 11 | FEATURES | `features.benchmark-panel` | page-local |
| 12 | PROOF | `proof.quote-carousel` | shared ×3 |
| 13 | FEATURES | `features.sticky-stack` | shared ×7 |
| 14 | FEATURES | `features.compare-cards` | page-local |
| 15 | CONTENT | `content.faq-accordion` | shared ×10 |
| 16 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 17 | SHELL | `shell.site-footer` | shared ×67 |

### Comparisons index — `template.vs-index`

1 route · `/vs` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.vs-index-hero` | page-local |
| 7 | FEATURES | `features.vs-why-band` | page-local |
| 8 | FEATURES | `features.all-comparisons` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### About — `template.about`

1 route · `/about-us` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.about-hero` | page-local |
| 7 | CONTENT | `content.origin-story` | page-local |
| 8 | PROOF | `proof.team-photo` | page-local |
| 9 | PROOF | `proof.investors` | page-local |
| 10 | CONVERSION | `conversion.contact-band` | page-local |
| 11 | CONVERSION | `conversion.community-cta` | page-local |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.careers-hero` | page-local |
| 7 | CONTENT | `content.how-we-work` | page-local |
| 8 | CONTENT | `content.video-feature` | page-local |
| 9 | FEATURES | `features.values-cards` | page-local |
| 10 | CONTENT | `content.jobs-board` | page-local |
| 11 | CONTENT | `content.photo-marquee` | page-local |
| 12 | FEATURES | `features.benefits-card` | page-local |
| 13 | PROOF | `proof.careers-testimonials` | page-local |
| 14 | CONVERSION | `conversion.careers-closing-cta` | page-local |
| 15 | SHELL | `shell.site-footer` | shared ×67 |

### Contact hub — `template.contact-hub`

1 route · `/contact-us` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONVERSION | `conversion.contact-chooser` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×67 |

### Contact: product expert — `template.contact-product-expert`

2 routes · `/contact-us/product-expert`, `/onboarding-sessions` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONVERSION | `conversion.contact-split-form` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×67 |

### Customer support overview — `template.customer-support`

1 route · `/customer-support` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.support-hero` | page-local |
| 7 | CONTENT | `content.support-body` | page-local |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Contact support form — `template.contact-support-form`

1 route · `/contact-us/support` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.contact-support-title` | page-local |
| 7 | CONVERSION | `conversion.support-request-form` | page-local |
| 8 | CONTENT | `content.contact-support-help` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Legal document with table of contents — `template.legal-toc-document`

4 routes · `/terms-of-use`, `/terms-of-service`, `/privacy-policy`, `/candidate-privacy` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | LEGAL | `legal.document-title` | page-local |
| 7 | LEGAL | `legal.toc-sidebar` | page-local |
| 8 | LEGAL | `legal.document-article` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Support policy — `template.legal-support-policy`

1 route · `/support-policy` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | LEGAL | `legal.support-policy-document` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×67 |

### Generic prose page — `template.generic-prose-page`

9 routes · `/local-dev-cloud-prod-dagster-motherduck`, `/acceptable-use-policy`, `/motherduck-terms-of-service`, `/getting-started-with-motherduck`, `/hack-night`, `/react-components-testing`, `/forms/finance-onboarding`, `/fees-addendum`, `/divemaxxing/rules` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONTENT | `content.compact-page-title` | shared ×3 |
| 7 | CONTENT | `content.shape-prose` | shared ×2 |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Generic prose page with side form — `template.generic-prose-page-with-form`

2 routes · `/live-demo`, `/duckdb-book-brief-orig` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONTENT | `content.compact-page-title` | shared ×3 |
| 7 | CONTENT | `content.shape-prose` | shared ×2 |
| 8 | CONVERSION | `conversion.side-form` | page-local |
| 9 | CONVERSION | `conversion.form-bar` | page-local |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Community code — `template.community-code`

1 route · `/community-code` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONTENT | `content.compact-page-title` | shared ×3 |
| 7 | CONTENT | `content.article-prose` | shared ×10 |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Gated landing page (guide or report) — `template.gated-lp-guide`

5 routes · `/duckdb-cheatsheet-full`, `/lp/ai-analytics-eval-field-guide-full`, `/lp/postgres-analytics-guide-full`, `/lp/data-ai-survey-full`, `/lp/agents-run-your-analytics-full` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.lp-hero` | shared ×4 |
| 7 | CONTENT | `content.lp-band-sections` | shared ×4 |
| 8 | CONVERSION | `conversion.gated-form` | shared ×3 |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Gated landing page with FAQ — `template.gated-lp-guide-faq`

2 routes · `/lp/guide-to-bi-in-the-agentic-era-full`, `/lp/ducklake-lakehouse-table-format-book-full` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.lp-hero` | shared ×4 |
| 7 | CONTENT | `content.lp-band-sections` | shared ×4 |
| 8 | CONTENT | `content.lp-faq` | shared ×3 |
| 9 | CONVERSION | `conversion.gated-form` | shared ×3 |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Free book brief — `template.gated-book-brief`

1 route · `/duckdb-book-brief` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.book-hero` | page-local |
| 7 | CONTENT | `content.book-body` | page-local |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Landing page: DuckLake guide — `template.lp-ducklake-guide`

1 route · `/ducklake-open-table-format-full` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.lp-hero` | shared ×4 |
| 7 | CONTENT | `content.lp-band-sections` | shared ×4 |
| 8 | CONTENT | `content.lp-faq` | shared ×3 |
| 9 | CONVERSION | `conversion.gated-form-alt` | page-local |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Landing page: DuckLake book (LP-only chrome) — `template.lp-ducklake-book-only`

1 route · `/ducklake-open-table-format-guide` · chrome: **lp-only**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.lp-anchor-nav` | page-local |
| 3 | HERO | `hero.lp-hero` | shared ×4 |
| 4 | CONTENT | `content.lp-band-sections` | shared ×4 |
| 5 | CONTENT | `content.lp-faq` | shared ×3 |
| 6 | CONVERSION | `conversion.gated-form` | shared ×3 |

### Landing page: dive contest — `template.lp-divemaxxing`

1 route · `/divemaxxing-full` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.divemaxxing-hero` | page-local |
| 7 | FEATURES | `features.divemaxxing-embed` | page-local |
| 8 | CONTENT | `content.divemaxxing-what-is-a-dive` | page-local |
| 9 | CONTENT | `content.divemaxxing-competition` | page-local |
| 10 | CONTENT | `content.divemaxxing-judges` | page-local |
| 11 | CONTENT | `content.divemaxxing-timeline` | page-local |
| 12 | CONTENT | `content.divemaxxing-prizes` | page-local |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Landing page: savings calculator — `template.lp-savings`

1 route · `/jev-full` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.jev-hero` | page-local |
| 7 | COMMERCE | `commerce.jev-calculator` | page-local |
| 8 | COMMERCE | `commerce.jev-pricing` | page-local |
| 9 | CONVERSION | `conversion.jev-closing` | page-local |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Split-form landing with sneak peek — `template.split-form-lp-sneak-peek`

2 routes · `/duckdb-book-form`, `/sql-duckdb-book-form` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.split-form-hero` | shared ×2 |
| 7 | CONVERSION | `conversion.split-form-panel` | shared ×2 |
| 8 | CONTENT | `content.sneak-peek` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Split-form landing — `template.split-form-lp`

1 route · `/together-ai` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.split-form-hero` | shared ×2 |
| 7 | CONVERSION | `conversion.split-form-panel` | shared ×2 |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Book chapter summary — `template.book-chapter`

11 routes · `/duckdb-book-summary-chapter11`, `/duckdb-book-summary-chapter5`, `/duckdb-book-summary-chapter6`, `/duckdb-book-summary-chapter8`, `/duckdb-book-summary-chapter9`, `/duckdb-book-summary-chapter3`, `/duckdb-book-summary-chapter4`, `/duckdb-book-summary-chapter2`, `/duckdb-book-summary-chapter1`, `/duckdb-book-summary-chapter10`, `/duckdb-book-summary-chapter7` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | UTILITY | `utility.chapter-back-link` | page-local |
| 7 | CONTENT | `content.chapter-header` | page-local |
| 8 | CONVERSION | `conversion.chapter-cta` | page-local |
| 9 | CONVERSION | `conversion.book-panel` | page-local |
| 10 | CONTENT | `content.article-prose` | shared ×10 |
| 11 | CONTENT | `content.chapter-sidebar` | page-local |
| 12 | CONTENT | `content.faq-section-article` | shared ×4 |
| 13 | CONVERSION | `conversion.read-ebook-bar` | page-local |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.feed-hero` | shared ×4 |
| 7 | UTILITY | `utility.search-filter-panel` | shared ×4 |
| 8 | EDITORIAL | `editorial.featured-post-card` | page-local |
| 9 | EDITORIAL | `editorial.post-card-grid` | shared ×3 |
| 10 | CONVERSION | `conversion.subscribe-tile` | shared ×2 |
| 11 | UTILITY | `utility.load-more-footer` | shared ×4 |
| 12 | CONVERSION | `conversion.mobile-subscribe-button` | page-local |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Blog post — `template.blog-post`

272 routes · `/blog/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONTENT | `content.article-hero-header` | page-local |
| 7 | CONTENT | `content.article-prose` | shared ×10 |
| 8 | UTILITY | `utility.blog-toc` | page-local |
| 9 | EDITORIAL | `editorial.recommendation-carousel` | page-local |
| 10 | CONVERSION | `conversion.floating-get-started` | page-local |
| 11 | CONVERSION | `conversion.subscribe-band` | page-local |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Case studies index — `template.case-index`

1 route · `/case-studies` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.case-title-hero` | page-local |
| 7 | PROOF | `proof.testimonial-carousel` | page-local |
| 8 | UTILITY | `utility.category-chips` | shared ×3 |
| 9 | PROOF | `proof.case-study-grid` | page-local |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Case study detail — `template.case-detail`

23 routes · `/case-studies/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.case-detail-hero` | page-local |
| 7 | PROOF | `proof.case-quote-band` | page-local |
| 8 | CONTENT | `content.case-lede` | page-local |
| 9 | CONTENT | `content.article-prose` | shared ×10 |
| 10 | CONTENT | `content.faq-accordion` | shared ×10 |
| 11 | UTILITY | `utility.back-to-top-rail` | page-local |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Videos index — `template.video-index`

1 route · `/videos` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.sand-grid-hero` | page-local |
| 7 | EDITORIAL | `editorial.featured-video` | page-local |
| 8 | UTILITY | `utility.category-chips` | shared ×3 |
| 9 | UTILITY | `utility.search-field` | shared ×2 |
| 10 | EDITORIAL | `editorial.video-card-grid` | page-local |
| 11 | CONVERSION | `conversion.subscribe-tile` | shared ×2 |
| 12 | UTILITY | `utility.load-more-footer` | shared ×4 |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Video detail — `template.video-detail`

149 routes · `/videos/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.sand-grid-band` | shared ×2 |
| 7 | CONTENT | `content.video-player-frame` | page-local |
| 8 | CONTENT | `content.video-title-meta` | page-local |
| 9 | CONTENT | `content.article-prose` | shared ×10 |
| 10 | UTILITY | `utility.video-toc-sidebar` | page-local |
| 11 | UTILITY | `utility.toc-fab` | shared ×2 |
| 12 | CONTENT | `content.transcript` | page-local |
| 13 | CONTENT | `content.faq-section-article` | shared ×4 |
| 14 | EDITORIAL | `editorial.related-videos` | page-local |
| 15 | SHELL | `shell.site-footer` | shared ×67 |

### Ecosystem index — `template.ecosystem-index`

1 route · `/ecosystem` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.eco-hero` | page-local |
| 7 | UTILITY | `utility.category-chips` | shared ×3 |
| 8 | UTILITY | `utility.search-field` | shared ×2 |
| 9 | FEATURES | `features.tech-partner-directory` | page-local |
| 10 | CONVERSION | `conversion.eco-join-card` | page-local |
| 11 | PROOF | `proof.consulting-partner-directory` | page-local |
| 12 | CONVERSION | `conversion.eco-build-cta` | page-local |
| 13 | UTILITY | `utility.partner-modal` | page-local |
| 14 | SHELL | `shell.site-footer` | shared ×67 |

### Ecosystem partner detail — `template.ecosystem-detail`

84 routes · `/ecosystem/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | UTILITY | `utility.back-link` | page-local |
| 7 | CONTENT | `content.partner-detail` | page-local |
| 8 | CONTENT | `content.article-prose` | shared ×10 |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### News index — `template.news-index`

1 route · `/duckdb-news` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.feed-hero` | shared ×4 |
| 7 | EDITORIAL | `editorial.news-digest-card` | page-local |
| 8 | EDITORIAL | `editorial.post-card-grid` | shared ×3 |
| 9 | CONVERSION | `conversion.subscribe-banner` | shared ×2 |
| 10 | UTILITY | `utility.load-more-footer` | shared ×4 |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Web links feed — `template.web-links-feed`

1 route · `/quacking-around-the-web` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.feed-hero` | shared ×4 |
| 7 | UTILITY | `utility.search-filter-panel` | shared ×4 |
| 8 | EDITORIAL | `editorial.post-card-grid` | shared ×3 |
| 9 | UTILITY | `utility.load-more-footer` | shared ×4 |
| 10 | SHELL | `shell.site-footer` | shared ×67 |

### Learn hub — `template.learn-hub`

1 route · `/learn` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.feed-hero` | shared ×4 |
| 7 | EDITORIAL | `editorial.learn-card-grid` | page-local |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Events: upcoming — `template.events-upcoming`

1 route · `/events` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.events-hero` | shared ×2 |
| 7 | CONVERSION | `conversion.speaker-banner` | shared ×2 |
| 8 | UTILITY | `utility.events-tabs` | shared ×2 |
| 9 | UTILITY | `utility.search-filter-panel` | shared ×4 |
| 10 | EDITORIAL | `editorial.event-row-list` | page-local |
| 11 | CONVERSION | `conversion.subscribe-banner` | shared ×2 |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Events: past archive — `template.events-past`

13 routes · `/events/past/page/{n}` (2–13) · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.events-hero` | shared ×2 |
| 7 | CONVERSION | `conversion.speaker-banner` | shared ×2 |
| 8 | UTILITY | `utility.events-tabs` | shared ×2 |
| 9 | UTILITY | `utility.search-filter-panel` | shared ×4 |
| 10 | EDITORIAL | `editorial.past-event-list` | page-local |
| 11 | UTILITY | `utility.pagination` | page-local |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Dive gallery — `template.dive-gallery`

1 route · `/dive-gallery` · chrome: **own-nav**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.dive-nav` | shared ×2 |
| 3 | HERO | `hero.dive-gallery-hero` | page-local |
| 4 | UTILITY | `utility.dive-search-filter-bar` | page-local |
| 5 | UTILITY | `utility.dive-sort-toolbar` | page-local |
| 6 | EDITORIAL | `editorial.dive-card-grid` | page-local |
| 7 | SHELL | `shell.dive-footer` | shared ×2 |

### Dive detail — `template.dive-detail`

135 routes · `/dive-gallery/dives/{slug}` · chrome: **own-nav**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.dive-nav` | shared ×2 |
| 3 | UTILITY | `utility.browse-dives-link` | page-local |
| 4 | CONTENT | `content.dive-detail-card` | page-local |
| 5 | CONTENT | `content.dive-prompts-used` | page-local |
| 6 | CONTENT | `content.dive-comments` | page-local |
| 7 | SHELL | `shell.dive-footer` | shared ×2 |

### Author profile — `template.author`

120 routes · `/authors/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.author-hero` | page-local |
| 7 | EDITORIAL | `editorial.author-content-grid` | page-local |
| 8 | CONVERSION | `conversion.author-subscribe` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Learn article — `template.learn-article`

68 routes · `/learn/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.learn-hero` | page-local |
| 7 | CONTENT | `content.article-prose` | shared ×10 |
| 8 | UTILITY | `utility.learn-sidebar` | page-local |
| 9 | CONVERSION | `conversion.learn-start-card` | page-local |
| 10 | UTILITY | `utility.toc-fab` | shared ×2 |
| 11 | CONTENT | `content.faq-section-article` | shared ×4 |
| 12 | EDITORIAL | `editorial.read-next-grid` | shared ×2 |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Research paper — `template.research-paper`

6 routes · `/research/efficient-data-wrangling-llms-code-generation`, `/research/motherduck-duckdb-in-the-cloud-and-in-the-client`, `/research/declarative-caching-in-motherduck`, `/research/query-log-informed-schema-descriptions-text-to-sql`, `/research/results-on-results-cached-partial-results`, `/research/cost-based-hybrid-query-optimization-in-motherduck` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.research-hero` | page-local |
| 7 | CONTENT | `content.article-prose` | shared ×10 |
| 8 | UTILITY | `utility.view-paper-fab` | page-local |
| 9 | UTILITY | `utility.research-toc-box` | page-local |
| 10 | UTILITY | `utility.research-sidebar` | page-local |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Glossary index — `template.glossary-index`

0 route ·  · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.glossary-hero` | page-local |
| 7 | UTILITY | `utility.glossary-bar` | page-local |
| 8 | CONTENT | `content.glossary-letters` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Glossary term — `template.glossary-term`

347 routes · `/glossary/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | UTILITY | `utility.back-to-glossary` | page-local |
| 7 | CONTENT | `content.glossary-term-header` | page-local |
| 8 | CONTENT | `content.article-prose` | shared ×10 |
| 9 | CONVERSION | `conversion.term-promo` | page-local |
| 10 | CONTENT | `content.related-terms` | page-local |
| 11 | CONTENT | `content.faq-section-article` | shared ×4 |
| 12 | EDITORIAL | `editorial.read-next-grid` | shared ×2 |
| 13 | SHELL | `shell.site-footer` | shared ×67 |

### Event detail — `template.event-detail`

251 routes · `/events/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.event-hero` | page-local |
| 7 | CONTENT | `content.event-body` | page-local |
| 8 | CONVERSION | `conversion.event-newsletter-band` | page-local |
| 9 | EDITORIAL | `editorial.more-events` | page-local |
| 10 | UTILITY | `utility.back-to-top-event` | page-local |
| 11 | CONVERSION | `conversion.mobile-register-bar` | page-local |
| 12 | SHELL | `shell.site-footer` | shared ×67 |

### Webinar or video page — `template.webinar-standard`

11 routes · `/webinar/scaling-duckdb-panel`, `/video/fix-slow-postrges-analytics`, `/webinar/building-data-apps-and-customer-facing-analytics`, `/webinar/practical-ai-use-cases-for-data`, `/webinar/getting-started-with-motherduck-hosted-ducklake`, `/webinar/from-raw-data-to-insights`, `/webinar/simplifying-the-transformation-layer`, `/webinar/ducklake-livestream`, `/video/reliable-ai-agents-for-business-analytics-llms-warehouse`, `/webinar/building-an-efficient-data-stack`, `/webinar/unlocking-duckdb-in-your-gold-layer` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.sand-grid-band` | shared ×2 |
| 7 | CONTENT | `content.webinar-player` | page-local |
| 8 | CONTENT | `content.webinar-meta` | page-local |
| 9 | CONTENT | `content.article-prose` | shared ×10 |
| 10 | UTILITY | `utility.gated-video-modal` | page-local |
| 11 | SHELL | `shell.site-footer` | shared ×67 |

### Webinar registration landing — `template.webinar-register-lp`

3 routes · `/webinar/data-discoverability-secoda-motherduck`, `/webinar/ducking-easy-insights-motherduck-dbt`, `/webinar/scaling-duckdb-panel-ondemand` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONVERSION | `conversion.webinar-register-lp` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×67 |

### Webinar with side form — `template.webinar-side-form`

1 route · `/webinar/take-flight-with-the-modern-duck-stack` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | CONVERSION | `conversion.webinar-side-form` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×67 |

### Podcast index — `template.podcast-index`

1 route · `/explain-analyze` · chrome: **dark**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | HERO | `hero.podcast-hero` | page-local |
| 7 | EDITORIAL | `editorial.latest-episode` | page-local |
| 8 | EDITORIAL | `editorial.episode-grid` | page-local |
| 9 | SHELL | `shell.site-footer` | shared ×67 |

### Podcast episode — `template.podcast-episode`

11 routes · `/explain-analyze/0001-ai-tooling-wars`, `/explain-analyze/0002-github-stars-65-lines-markdown`, `/explain-analyze/0003-duckdb-breaks-the-lakehouse`, `/explain-analyze/0004-data-infra-printing-money`, `/explain-analyze/0005-data-viz-javascript`, `/explain-analyze/0006-ai-inside-sql`, `/explain-analyze/0007-safest-bet-ai-hardware`, `/explain-analyze/0008-ai-still-writes-python-311`, `/explain-analyze/0009-agents-md-vs-skills`, `/explain-analyze/0010-aws-bought-ducklabs`, `/explain-analyze/0011-reliable-ai-agents-checkpoints` · chrome: **dark**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | SHELL | `shell.announcement-bar` | shared ×67 |
| 3 | SHELL | `shell.site-header` | shared ×67 |
| 4 | SHELL | `shell.mega-menus` | shared ×67 |
| 5 | SHELL | `shell.mobile-menu` | shared ×67 |
| 6 | UTILITY | `utility.episode-back` | page-local |
| 7 | CONTENT | `content.episode-body` | page-local |
| 8 | SHELL | `shell.site-footer` | shared ×67 |

### Try app — `template.try-app`

1 route · `/try` · chrome: **bare**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.skip-link` | shared ×71 |
| 2 | APP | `app.try-workspace` | page-local |

## Section reference

### SHELL

_Chrome that wraps pages: skip link, announcement bar, headers, menus, footers and the alternative navs of sub-apps._

**`shell.skip-link`** — Visually hidden "skip to main content" anchor, the first focusable element; becomes a visible boxed link pinned to the top-left on focus and targets the main landmark.

· Rendered by the app root on every route, including the chrome-less and own-nav ones. · appears on 1583 routes · implemented by `src/App.jsx > App`

**`shell.announcement-bar`** — Full-width accent strip above the navbar carrying a one-line announcement and an arrow link; on narrow viewports it collapses once the page is scrolled.

· Part of the fixed site header, so it appears on every route that carries the full site chrome (1445 routes). · appears on 1445 routes · implemented by `src/components/Header.jsx > Eyebrow`

**`shell.site-header`** — Fixed top navigation: wordmark, primary links, dropdown triggers and action buttons, plus a scroll-driven bottom border. Its offset (--header-total) is applied to the page wrapper.

· Carried by every template whose chrome is full or dark (1445 routes); absent on own-nav, lp-only and bare routes. · appears on 1445 routes · implemented by `src/components/Header.jsx > Header`

**`shell.mega-menus`** — Click-open dropdown panels under the Product, Community and Company nav items; closes on outside click or Escape.

· Opened from the site header on all 1445 routes that carry it. · appears on 1445 routes · implemented by `src/components/header/MegaMenus.jsx > MENUS`

**`shell.mobile-menu`** — Slide-in navigation panel used below the desktop breakpoint.

· Toggled from the site header on all 1445 routes that carry it. · appears on 1445 routes · implemented by `src/components/header/MobileMenu.jsx`

**`shell.site-footer`** — Dark footer: wordmark and social glyphs on the left, four link columns, open-source note, legal links and two compliance badge placeholders.

· Closes every full or dark chrome route (1445 routes); absent on own-nav, lp-only and bare routes. · appears on 1445 routes · implemented by `src/components/Footer.jsx`

**`shell.dive-nav`** — Compact top bar of the Dive Gallery sub-app (replaces the site header).

· Used instead of the site header by the gallery and dive-detail templates, 136 routes in total. · appears on 136 routes · implemented by `src/components/content/diveChrome.jsx > DiveNav`

**`shell.dive-footer`** — Short footer of the Dive Gallery sub-app (replaces the site footer).

· Used instead of the site footer by the gallery and dive-detail templates, 136 routes in total. · appears on 136 routes · implemented by `src/components/content/diveChrome.jsx > DiveFooter`

**`shell.lp-anchor-nav`** — Fixed single-purpose landing-page bar: logo that returns to top, in-page anchor links and one primary call to action. The site header and footer are hidden through a body attribute while this page is mounted.

· Only on the book landing page that renders without site chrome (reached directly and via a redirect, 1 routes). · appears on 1 routes · implemented by `src/pages/extra/LpExtra.jsx > LpNav`

### HERO

_Page-opening block: headline, lede and primary action, sometimes with art or meta._

**`hero.home-hero`** — Homepage opening: headline with primary calls to action, an interactive product simulation (ask panel, code panels) and a customer logo strip.

· Homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx > Hero`

**`hero.persona-hero`** — Audience landing opening: headline, supporting line and actions, in a text or illustrated variant; the /product overview adds quick links to the three audience pages.

· Product overview and the three audience pages (4 routes). · appears on 4 routes · implemented by `src/components/marketing/persona.jsx > PersonaHero`

**`hero.product-hero-centered`** — Centered product-feature opening: product chip (optionally with a status pill), headline, sub-line, actions and decorative art.

· Feature pages for Dives, Flights, MCP server and the (clone-only) Guides page. · appears on 3 routes · implemented by `src/components/marketing/feature.jsx > ProductHeroCentered`

**`hero.split-hero`** — Two-column product opening: text and actions on one side, illustration on the other.

· Postgres integration page only. · appears on 1 routes · implemented by `src/components/marketing/feature.jsx > SplitHero`

**`hero.ducklake-hero`** — Opening of the DuckLake page: headline and actions over a horizon-style illustration.

· DuckLake product page only. · appears on 1 routes · implemented by `src/components/marketing/ducklake.jsx > DuckLakeHero`

**`hero.dark-hero`** — Dark-background opening of the Hypertenancy page: headline, actions and a tabbed code panel.

· Hypertenancy product page only. · appears on 1 routes · implemented by `src/components/marketing/hypertenancy.jsx > DarkHero`

**`hero.left-hero`** — Left-aligned page opening with headline, lede and optional action, parametrised by page (startups, research, trust, community).

· The four bespoke product pages: startups, research, trust and open source. · appears on 4 routes · implemented by `src/components/marketing/bespoke.jsx > LeftHero`

**`hero.persona2-hero`** — Opening of the founder and operator landing pages: headline, lede, actions and a product visual.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > PersonaHero2`

**`hero.vs-hero`** — Opening of a competitor comparison page: headline naming the competitor, lede and a primary action.

· The six competitor comparison pages. · appears on 6 routes · implemented by `src/components/marketing/vs.jsx > VsHero`

**`hero.vs-index-hero`** — Opening of the comparisons index: headline and lede introducing the competitor list.

· The comparisons index only. · appears on 1 routes · implemented by `src/components/extra/vsIndex.jsx > VsIndexHero`

**`hero.eu-hero`** — EU region page opening: headline, lede and an inline interest form.

· EU region page only. · appears on 1 routes · implemented by `src/components/extra/euRegion.jsx > EuHero`

**`hero.about-hero`** — Illustrated about-page opening with a ticker band.

· About page only. · appears on 1 routes · implemented by `src/components/company/about.jsx > AboutHero`

**`hero.careers-hero`** — Illustrated careers opening; the collage drops under the text below the wide breakpoint.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > CareersHero`

**`hero.support-hero`** — Customer-support opening: headline and lede with support illustration.

· Customer support overview only. · appears on 1 routes · implemented by `src/components/company/contact.jsx > SupportHero`

**`hero.contact-support-title`** — Sand-grid title band carrying only the page heading, overlapped by the form column beneath.

· Contact support form page only. · appears on 1 routes · implemented by `src/pages/extra/ContactSupport.jsx > ContactSupport`

**`hero.book-hero`** — Book landing opening: cover art, headline and primary download action.

· Free book brief page only. · appears on 1 routes · implemented by `src/components/company/book.jsx > BookHero`

**`hero.lp-hero`** — Gated landing-page opening: eyebrow chip, headline, sub-line, optional body and fine print, and a single call to action that scrolls to the form; optional cover image.

· Every gated landing page, including the bespoke book LPs (9 routes). · appears on 9 routes · implemented by `src/components/company/lp.jsx > LPHero`

**`hero.feed-hero`** — Opening band for listing pages (blog, news, quack feed, learn): headline, optional lede and scroll-linked doodles; the blog variant types its headline.

· Blog index, news, web-links feed and learn hub (4 routes). · appears on 4 routes · implemented by `src/components/content/FeedHero.jsx`

**`hero.events-hero`** — Events listing opening: headline, lede, decorative doodles and an illustration.

· Upcoming and past events listings (14 routes). · appears on 14 routes · implemented by `src/pages/content/EventsHub.jsx > EventsHero`

**`hero.case-title-hero`** — Case-studies index title band.

· Case studies index only. · appears on 1 routes · implemented by `src/components/content/cases.jsx > TitleHero`

**`hero.case-detail-hero`** — Customer story opening: customer logo, headline, key facts and company profile card.

· Every case study detail page (23 routes). · appears on 23 routes · implemented by `src/components/content/cases.jsx > CaseDetailHero`

**`hero.sand-grid-hero`** — Sand-grid title band for the videos index; the featured video card overlaps its lower edge.

· Videos index only. · appears on 1 routes · implemented by `src/components/content/videos.jsx > SandGridHero`

**`hero.sand-grid-band`** — Empty sand-grid band behind the top of a video page; the player frame overlaps it. A webinar page re-implements the same band inline.

· Video detail pages and standard webinar pages (160 routes). · appears on 160 routes · implemented by `src/components/content/videos.jsx > SandBand`

**`hero.eco-hero`** — Ecosystem index opening: headline, lede and a "become a partner" action that opens the partner modal.

· Ecosystem index only. · appears on 1 routes · implemented by `src/components/content/eco.jsx > EcoHero`

**`hero.author-hero`** — Author profile opening: photo, name and bio with decorative stickers.

· Every author page (120 routes). · appears on 120 routes · implemented by `src/components/extra/author.jsx > AuthorHero`

**`hero.learn-hero`** — Learn-article opening: article title and meta.

· Every learn article (68 routes). · appears on 68 routes · implemented by `src/components/extra/learn.jsx > LearnHero`

**`hero.research-hero`** — Research-paper opening: paper title and meta.

· Every research paper page (6 routes). · appears on 6 routes · implemented by `src/components/extra/research.jsx > ResearchHero`

**`hero.event-hero`** — Event detail opening on a sand band: back link, headline and meta row (type tag, date and time, location).

· Every event detail page (251 routes). · appears on 251 routes · implemented by `src/components/extra/events.jsx > EventHero`

**`hero.glossary-hero`** — Glossary index opening: headline, lede and total term count.

· Glossary index (clone-only route). · appears on 0 routes · implemented by `src/components/extra/glossary.jsx > GlossaryHero`

**`hero.podcast-hero`** — Dark podcast landing opening: show title, tagline and platform tiles.

· Podcast index only. · appears on 1 routes · implemented by `src/components/extra/podcast.jsx > PodcastHero`

**`hero.split-form-hero`** — Centered opening of a split-form landing page: headline, lede and optional partner logo pair.

· The three split-form landing pages (3 routes). · appears on 3 routes · implemented by `src/components/extra/splitForm.jsx > SplitHero`

**`hero.dive-gallery-hero`** — Gallery intro: illustration beside headline and lede.

· Dive gallery index only. · appears on 1 routes · implemented by `src/pages/content/DiveGallery.jsx > DiveGallery`

**`hero.divemaxxing-hero`** — Opening of the dive-contest landing page: headline and entry action.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > Hero`

**`hero.jev-hero`** — Dark opening of the savings landing page with pill actions and headline figures.

· Savings landing page only. · appears on 1 routes · implemented by `src/components/extra/jev.jsx > Hero`

### FEATURES

_Product explanation and capability modules: diagrams, feature cards, comparisons, directories of tools._

**`features.marquee-band`** — Full-width colored strip with a scrolling (or still) repeated label, used as a section divider.

· Product overview and the six competitor pages (7 routes). · appears on 7 routes · implemented by `src/components/marketing/MarqueeBand.jsx`

**`features.architecture-diagram`** — Homepage section explaining the platform architecture with an animated diagram, storage stack, accordion and a quote card.

· Homepage only. · appears on 1 routes · implemented by `src/components/Architecture.jsx > Architecture`

**`features.platform-overview`** — Homepage section of product cards and a platform diagram.

· Homepage only. · appears on 1 routes · implemented by `src/components/Platform.jsx > Platform`

**`features.integrations-ecosystem`** — Homepage band of integration glyphs in an arc with hover tooltips.

· Homepage only. · appears on 1 routes · implemented by `src/components/Integrations.jsx > Integrations`

**`features.agent-native-showcase`** — Homepage section on agent-native use: terminal animation and agent cards over a dither canvas.

· Homepage only. · appears on 1 routes · implemented by `src/components/AgentNative.jsx > AgentNative`

**`features.use-case-split`** — Product overview grid of use-case cells, each with an ink tag, copy and art.

· Product overview only. · appears on 1 routes · implemented by `src/components/marketing/overview.jsx > UseCaseSplit`

**`features.old-world-new-world`** — Two-column before/after story: sticky art that scales on scroll beside stacked text items, with tag and caption plates.

· Product overview only. · appears on 1 routes · implemented by `src/components/marketing/overview.jsx > OldWorldNewWorld`

**`features.agent-card-carousel`** — Auto-advancing carousel of agent capability cards.

· Product overview only. · appears on 1 routes · implemented by `src/components/marketing/overview.jsx > AgentCardCarousel`

**`features.divemaxxing-embed`** — Framed embed placeholder showing an example dive.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > Embed`

**`features.persona-split-rows`** — Stack of colored two-column rows (text with sub-items on one side, a colored art panel on the other) alternating sides; compact variant used for value rows on the pricing page.

· Audience pages and the pricing page (4 routes). · appears on 4 routes · implemented by `src/components/marketing/persona.jsx > PersonaSplitRows`

**`features.feature-grid`** — Grid of capability cards with icon art, heading and short body.

· Product overview and the three audience pages (4 routes). · appears on 4 routes · implemented by `src/components/marketing/persona.jsx > FeatureGrid`

**`features.architecture-panel`** — Large framed panel illustrating the data architecture, in coral or ink tone.

· Product overview and the three audience pages (4 routes). · appears on 4 routes · implemented by `src/components/marketing/persona.jsx > ArchitecturePanel`

**`features.ecosystem-diagram`** — Diagram of partner tools around the platform with connecting wires.

· Product overview and the three audience pages (4 routes). · appears on 4 routes · implemented by `src/components/marketing/persona.jsx > EcosystemDiagram`

**`features.video-frame`** — Static video player frame with a play affordance.

· Dives page only. · appears on 1 routes · implemented by `src/components/marketing/feature.jsx > VideoFrame`

**`features.media-frame`** — Heading with lede above a large framed product screenshot.

· Dives and Flights pages. · appears on 2 routes · implemented by `src/components/marketing/feature.jsx > MediaFrame`

**`features.problem-cards`** — Heading plus three problem/solution cards.

· MCP server and Postgres integration pages. · appears on 2 routes · implemented by `src/components/marketing/feature.jsx > ProblemCards`

**`features.sticky-stack`** — Stack of full-width feature cards that stick and overlay as the page scrolls, under an intro heading; each card has heading, body, optional link and art.

· Product feature pages, DuckLake and the competitor pages (11 routes). · appears on 11 routes · implemented by `src/components/marketing/StickyStack.jsx`

**`features.live-embed`** — Framed live-embed placeholder of an interactive dive with heading and lede.

· Dives page only. · appears on 1 routes · implemented by `src/components/marketing/feature.jsx > LiveEmbed`

**`features.gallery-teaser`** — Teaser strip of sample dives linking to the gallery.

· Dives page only. · appears on 1 routes · implemented by `src/components/marketing/feature.jsx > GalleryTeaser`

**`features.cookbook-grid`** — Heading above a grid of six cookbook cards.

· Flights page only. · appears on 1 routes · implemented by `src/components/marketing/feature.jsx > CookbookGrid`

**`features.browser-window-demo`** — Browser-window mockup demonstrating the guided workflow.

· Guides feature page (clone-only route). · appears on 0 routes · implemented by `src/components/marketing/feature.jsx > BrowserWindowDemo`

**`features.format-compare`** — Tag plate and two panels comparing two table formats, with label chips.

· DuckLake page only. · appears on 1 routes · implemented by `src/components/marketing/ducklake.jsx > FormatCompare`

**`features.resource-carousel`** — Auto-advancing carousel of resource cards (articles, videos).

· DuckLake page only. · appears on 1 routes · implemented by `src/components/marketing/ducklake.jsx > ResourceCarousel`

**`features.alternating-feature-rows`** — Rows alternating text and illustration, each describing one tenancy capability.

· Hypertenancy page only. · appears on 1 routes · implemented by `src/components/marketing/hypertenancy.jsx > AlternatingFeatureRows`

**`features.program-benefits`** — Benefit cards for the startup program.

· Startups page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > ProgramBenefits`

**`features.persona-split-sticky`** — Split layout with a sticky text column beside scrolling persona panels.

· Startups page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > PersonaSplitSticky`

**`features.repo-grid`** — Grid of open-source repository cards.

· Open source community page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > RepoGrid`

**`features.dark-features`** — Dark section of feature cards for a persona landing page.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > DarkFeatures`

**`features.split-media`** — Two-column text and media block.

· Founder landing page only. · appears on 1 routes · implemented by `src/components/extra/persona2.jsx > SplitMedia`

**`features.gallery-row`** — Row of example gallery thumbnails.

· Operator landing page only. · appears on 1 routes · implemented by `src/components/extra/persona2.jsx > GalleryRow`

**`features.security-split`** — Two-column security statement.

· Operator landing page only. · appears on 1 routes · implemented by `src/components/extra/persona2.jsx > SecuritySplit`

**`features.agent-links`** — Row of links and prompts for working with the product through AI agents.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > AgentLinks`

**`features.vs-why-band`** — Strip of reasons to choose the platform, below the index hero.

· Comparisons index only. · appears on 1 routes · implemented by `src/components/extra/vsIndex.jsx > WhyBand`

**`features.all-comparisons`** — Grid of cards linking to every competitor comparison.

· Comparisons index only. · appears on 1 routes · implemented by `src/components/extra/vsIndex.jsx > AllComparisons`

**`features.benchmark-panel`** — Heading, bullets and a benchmark chart comparing performance against the competitor; absent on one comparison page.

· Competitor comparison pages (6 routes). · appears on 6 routes · implemented by `src/components/marketing/vs.jsx > BenchmarkPanel`

**`features.compare-cards`** — Cards linking to the other competitor comparisons, excluding the current one.

· The six competitor pages. · appears on 6 routes · implemented by `src/components/marketing/vs.jsx > CompareCards`

**`features.azure-steps`** — Horizontal row of numbered steps (stacked on small screens) with a steps illustration; the first step is tinted and carries a "you are here" tag.

· Azure page only. · appears on 1 routes · implemented by `src/components/extra/azure.jsx > AzureSteps`

**`features.values-cards`** — Row of expandable company-value cards; scrolls horizontally at tablet widths.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > ValuesCards`

**`features.benefits-card`** — Employee-benefits card with stickers, combined with the "join us" ticker band in one section.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > BenefitsCard`

**`features.tech-partner-directory`** — Technology partner cards in a three-column grid with a join-us card inserted after the third; filtered by category chips and search.

· Ecosystem index only. · appears on 1 routes · implemented by `src/components/content/eco.jsx > PartnerCard`

### PROOF

_Social proof: customer logos, quotes, case-study cards, investors, testimonials._

**`proof.customer-stories`** — Homepage customer section: case-study cards and logos.

· Homepage only. · appears on 1 routes · implemented by `src/components/Customers.jsx > Customers`

**`proof.quote-carousel`** — Autoplaying carousel of customer quotes with logo, name, role and an optional case-study link; variants per page.

· Pricing, Hypertenancy and the competitor pages (8 routes). · appears on 8 routes · implemented by `src/components/marketing/QuoteCarousel.jsx`

**`proof.quote-spotlight`** — Single large customer quote with tag line and attribution.

· Flights, MCP server, Postgres integration and startups pages. · appears on 4 routes · implemented by `src/components/marketing/QuoteSpotlight.jsx`

**`proof.case-study-carousel`** — Horizontal carousel of customer-story cards.

· Product overview and the three audience pages (4 routes). · appears on 4 routes · implemented by `src/components/marketing/persona.jsx > CaseStudyCarousel`

**`proof.logo-bar`** — Row of customer logos on the comparison pages.

· The six competitor pages. · appears on 6 routes · implemented by `src/components/marketing/vs.jsx > LogoBar`

**`proof.investor-logos`** — Row of investor and partner logos for the startups program.

· Startups page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > InvestorLogos`

**`proof.logo-marquee`** — Auto-scrolling marquee of customer logos.

· Startups page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > LogoMarquee`

**`proof.persona2-logo-strip`** — Customer logo strip under a persona hero.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > LogoStrip2`

**`proof.industry-swiper`** — Swiper of industry tabs, each with example use-case tiles.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > IndustrySwiper`

**`proof.eu-partners`** — Grid of EU-region partner logos and blurbs.

· EU region page only. · appears on 1 routes · implemented by `src/components/extra/euRegion.jsx > EuPartners`

**`proof.investors`** — Investor logo list.

· About page only. · appears on 1 routes · implemented by `src/components/company/about.jsx > Investors`

**`proof.team-photo`** — Full-width team photo in a bordered frame.

· About page only. · appears on 1 routes · implemented by `src/components/company/about.jsx > TeamPhoto`

**`proof.careers-testimonials`** — Dark band with an employee testimonial carousel (vertical slides at wide widths, horizontal below).

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > Testimonials`

**`proof.testimonial-carousel`** — Hero carousel of customer testimonial slides linking to stories.

· Case studies index only. · appears on 1 routes · implemented by `src/components/content/cases.jsx > TestimonialCarousel`

**`proof.case-study-grid`** — Three-column grid of case-study cards with decorative doodles, filtered by category chips.

· Case studies index only. · appears on 1 routes · implemented by `src/components/content/cases.jsx > CaseStudyCard`

**`proof.case-quote-band`** — Pull-quote band under a case-study hero.

· Every case study detail page (23 routes). · appears on 23 routes · implemented by `src/components/content/cases.jsx > QuoteBand`

**`proof.consulting-partner-directory`** — Consulting partner cards in the same card style as technology partners, under their own heading.

· Ecosystem index only. · appears on 1 routes · implemented by `src/components/content/eco.jsx > PartnerCard`

### CONTENT

_Substantive reading material and structured information: article bodies, FAQs, tables, transcripts, event and partner details._

**`content.faq-accordion`** — Ruled accordion of question/answer rows with optional inline links and a trailing empty row; variants per page.

· Product feature pages, pricing, startups, product overview and DuckDB users pages, competitor pages and some case studies (36 routes). · appears on 36 routes · implemented by `src/components/marketing/FAQ.jsx`

**`content.faq-section-article`** — FAQ block placed under an article or video: heading and accordion rows sized for article width.

· Video detail, learn articles, glossary terms and book chapters (575 routes). · appears on 575 routes · implemented by `src/components/content/videos.jsx > FAQSection`

**`content.lp-faq`** — FAQ accordion that is part of a gated landing page, styled to match the LP bands.

· Landing pages with a FAQ band (4 routes). · appears on 4 routes · implemented by `src/components/company/lp.jsx > FAQSection`

**`content.lp-band-sections`** — Sequence of full-width colored bands (sun, white, cream, ink, teal), each with title, intro and a body widget (stat rows, card grids, checklists, chapter lists, quotes, code window) that differs per landing page.

· Every gated landing page body; band contents vary per page (9 routes). · appears on 9 routes · implemented by `src/components/company/lp.jsx > LPSection`

**`content.article-prose`** — Long-form body renderer for generated article blocks: headings, paragraphs, lists, quotes, code, tables, admonitions and footnotes.

· Every article-shaped page: blog, case study, video, webinar, learn, research, glossary, book chapter, ecosystem partner, community code (972 routes). · appears on 972 routes · implemented by `src/components/content/ArticleProse.jsx`

**`content.compact-page-title`** — Compact all-caps page heading above long-form text; the same heading style is inlined in the community-code page.

· Generic prose pages and community code (12 routes). · appears on 12 routes · implemented by `src/components/extra/generic.jsx > GenericPage`

**`content.shape-prose`** — Placeholder policy-style prose generated from a measured block shape, 816px column.

· Generic prose pages (11 routes). · appears on 11 routes · implemented by `src/components/extra/generic.jsx > ShapeProse`

**`content.origin-story`** — Company origin narrative as prose beside an image.

· About page only. · appears on 1 routes · implemented by `src/components/company/about.jsx > OriginStory`

**`content.how-we-work`** — Text and imagery on how the team works.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > HowWeWork`

**`content.video-feature`** — Featured culture video frame with caption.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > VideoFeature`

**`content.jobs-board`** — Open-roles board (an embedded job board rebuilt from static data): select filters and a list of job cards.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > JobsBoard`

**`content.photo-marquee`** — Auto-scrolling strip of team photos.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > PhotoMarquee`

**`content.support-body`** — Support overview body: a grid of support option cards, a yellow callout card and a status-page link.

· Customer support overview only. · appears on 1 routes · implemented by `src/components/company/contact.jsx > SupportBody`

**`content.contact-support-help`** — Right-hand help column: heading, long copy and three link actions (overview, policy, status).

· Contact support form page only. · appears on 1 routes · implemented by `src/pages/extra/ContactSupport.jsx > ContactSupport`

**`content.book-body`** — Book brief body: offer card, descriptive copy, chapter banner and chapter cards linking to the chapter summaries.

· Free book brief page only. · appears on 1 routes · implemented by `src/components/company/book.jsx > BookBody`

**`content.research-chips`** — Row of topic chips filtering the paper list.

· Research page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > ResearchChips`

**`content.trust-section`** — Tabbed trust and security content.

· Trust and security page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > TrustSection`

**`content.code-sample`** — Heading, lede and tabbed SQL code panel with copy button.

· DuckLake page only. · appears on 1 routes · implemented by `src/components/marketing/ducklake.jsx > CodeSample`

**`content.comparison-table`** — Feature-by-feature table of the platform against the named competitor.

· The six competitor pages. · appears on 6 routes · implemented by `src/components/marketing/vs.jsx > ComparisonTable`

**`content.last-updated-note`** — Small "last updated" note under the comparison table.

· The six competitor pages. · appears on 6 routes · implemented by `src/components/marketing/vs.jsx > LastUpdated`

**`content.azure-coming`** — Heading with an intro paragraph above a grid of four numbered cards (illustration, number, title, short text) describing what is coming to Azure.

· Azure page only. · appears on 1 routes · implemented by `src/components/extra/azure.jsx > AzureComing`

**`content.azure-faq`** — Azure-specific FAQ accordion with its own styling.

· Azure page only. · appears on 1 routes · implemented by `src/components/extra/azure.jsx > AzureFaq`

**`content.case-lede`** — Lede paragraph with accent left rule that opens the case-study article column.

· Every case study detail page (23 routes). · appears on 23 routes · implemented by `src/pages/content/CaseDetail.jsx > CaseDetail`

**`content.partner-detail`** — Partner profile: logo card, name, category tags, prose body and external link icons.

· Every ecosystem partner page (84 routes). · appears on 84 routes · implemented by `src/pages/content/EcosystemDetail.jsx > EcosystemDetail`

**`content.video-player-frame`** — Static 16:9 video player frame.

· Video detail pages (149 routes). · appears on 149 routes · implemented by `src/components/content/videos.jsx > VideoPlayerFrame`

**`content.video-title-meta`** — Tag chips, headline and date under the player.

· Video detail pages (149 routes). · appears on 149 routes · implemented by `src/pages/content/VideoDetail.jsx > VideoDetail`

**`content.transcript`** — Collapsible timestamped transcript.

· Video detail pages (149 routes). · appears on 149 routes · implemented by `src/components/content/videos.jsx > Transcript`

**`content.webinar-player`** — Player frame that can be gated behind a registration modal before play.

· Standard webinar and video pages (11 routes). · appears on 11 routes · implemented by `src/components/extra/webinar.jsx > Player`

**`content.webinar-meta`** — Tag chips, headline, date and featured author links under the webinar player.

· Standard webinar and video pages (11 routes). · appears on 11 routes · implemented by `src/components/extra/webinar.jsx > WebinarStandard`

**`content.article-hero-header`** — Blog article header: back link, headline, topic chips, date and read time, byline links and share buttons.

· Every blog post (272 routes). · appears on 272 routes · implemented by `src/pages/content/BlogPost.jsx > Hero`

**`content.event-body`** — Event article column beside a sticky sidebar that holds the registration action.

· Every event detail page (251 routes). · appears on 251 routes · implemented by `src/components/extra/events.jsx > EventBody`

**`content.glossary-term-header`** — Term headline, last-updated stamp and summary paragraph.

· Every glossary term page (347 routes). · appears on 347 routes · implemented by `src/pages/extra/GlossaryTerm.jsx > GlossaryTerm`

**`content.related-terms`** — Chip list of related glossary terms.

· Every glossary term page (347 routes). · appears on 347 routes · implemented by `src/components/extra/glossary.jsx > RelatedTerms`

**`content.glossary-letters`** — A-Z grouped term lists with anchors, filtered by the search bar.

· Glossary index (clone-only route). · appears on 0 routes · implemented by `src/components/extra/glossary.jsx > LetterSection`

**`content.chapter-header`** — Chapter number, read-time label above the chapter headline.

· Every book chapter summary (11 routes). · appears on 11 routes · implemented by `src/components/extra/bookChapter.jsx > ChapterHeader`

**`content.chapter-sidebar`** — Sidebar for navigating the book chapter summaries.

· Every book chapter summary (11 routes). · appears on 11 routes · implemented by `src/components/extra/bookChapter.jsx > ChapterSidebar`

**`content.episode-body`** — Dark episode page body: title, meta, summary, platform tiles, embedded player with chapters, paywall card and transcript.

· Every podcast episode page (11 routes). · appears on 11 routes · implemented by `src/components/extra/podcast.jsx > EpisodeBody`

**`content.dive-detail-card`** — Detail card of one dive: embedded interactive preview, title, author and actions.

· Every dive detail page (135 routes). · appears on 135 routes · implemented by `src/components/extra/dive.jsx > DiveCard`

**`content.dive-prompts-used`** — List of prompts used to build the dive.

· Every dive detail page (135 routes). · appears on 135 routes · implemented by `src/components/extra/dive.jsx > PromptsUsed`

**`content.dive-comments`** — Comment thread under a dive.

· Every dive detail page (135 routes). · appears on 135 routes · implemented by `src/components/extra/dive.jsx > Comments`

**`content.divemaxxing-what-is-a-dive`** — Explainer of what a dive is.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > WhatsADive`

**`content.divemaxxing-competition`** — Competition rules overview.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > Competition`

**`content.divemaxxing-judges`** — Judges panel.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > Judges`

**`content.divemaxxing-timeline`** — Contest timeline.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > Timeline`

**`content.divemaxxing-prizes`** — Prize list.

· Dive contest landing page only. · appears on 1 routes · implemented by `src/components/extra/divemaxxing.jsx > Prizes`

**`content.sneak-peek`** — Pre-wrapped bullet list previewing what the ebook contains, under the split panel.

· Two of the three split-form pages. · appears on 2 routes · implemented by `src/components/extra/splitForm.jsx > SneakPeek`

### EDITORIAL

_Feeds and teasers of dated or curated editorial items: posts, news, videos, events, episodes, recommendations._

**`editorial.home-blog-teaser`** — Homepage strip of latest blog cards.

· Homepage only. · appears on 1 routes · implemented by `src/components/Blog.jsx > Blog`

**`editorial.featured-post-card`** — Large horizontal card for the newest blog post.

· Blog index only. · appears on 1 routes · implemented by `src/components/content/feedCards.jsx > FeaturedPostCard`

**`editorial.post-card-grid`** — Grid of post cards (thumbnail, topic or type badge, title, date) laid out on the shared feed grid.

· Blog index, news and web-links feed (3 routes). · appears on 3 routes · implemented by `src/components/content/feedCards.jsx > PostCard`

**`editorial.news-digest-card`** — Wide card summarising the latest news digest.

· News index only. · appears on 1 routes · implemented by `src/components/content/feedCards.jsx > NewsDigestCard`

**`editorial.learn-card-grid`** — Two-column grid of learn guide cards with icon, title, description and link.

· Learn hub only. · appears on 1 routes · implemented by `src/pages/content/LearnHub.jsx > LearnCard`

**`editorial.featured-video`** — Large featured video card overlapping the videos hero.

· Videos index only. · appears on 1 routes · implemented by `src/components/content/videos.jsx > FeaturedVideo`

**`editorial.video-card-grid`** — Three-column grid of video cards with a subscribe tile inserted.

· Videos index only. · appears on 1 routes · implemented by `src/components/content/videos.jsx > VideoCard`

**`editorial.related-videos`** — Three related video cards under a video page.

· Video detail pages (149 routes). · appears on 149 routes · implemented by `src/components/content/videos.jsx > RelatedVideos`

**`editorial.event-row-list`** — Vertical list of upcoming events, each a bordered row with date block, title, description, location, type tag and details button; a subscribe banner follows the first.

· Upcoming events only. · appears on 1 routes · implemented by `src/pages/content/EventsHub.jsx > EventRow`

**`editorial.past-event-list`** — Vertical list of past events with recording tags.

· Past events listing (13 routes). · appears on 13 routes · implemented by `src/components/extra/events.jsx > PastEventRow`

**`editorial.more-events`** — Strip of other upcoming events under an event.

· Every event detail page (251 routes). · appears on 251 routes · implemented by `src/components/extra/events.jsx > MoreEvents`

**`editorial.paper-list`** — List of research paper cards.

· Research page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > PaperList`

**`editorial.social-carousel`** — Autoplaying carousel of community social posts.

· Open source community page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > SocialCarousel`

**`editorial.eu-webinars`** — Cards for EU-region webinars.

· EU region page only. · appears on 1 routes · implemented by `src/components/extra/euRegion.jsx > EuWebinars`

**`editorial.eu-posts`** — Post cards for EU-region articles.

· EU region page only. · appears on 1 routes · implemented by `src/components/extra/euRegion.jsx > EuPosts`

**`editorial.recommendation-carousel`** — Sticky sidebar carousel recommending two articles and a webinar.

· Every blog post (272 routes). · appears on 272 routes · implemented by `src/components/content/RecCarousel.jsx`

**`editorial.read-next-grid`** — Grid of "read next" cards with a footer link back to the parent index.

· Learn articles and glossary terms (415 routes). · appears on 415 routes · implemented by `src/components/extra/readNext.jsx`

**`editorial.author-content-grid`** — Grid of the author’s posts and videos.

· Every author page (120 routes). · appears on 120 routes · implemented by `src/components/extra/author.jsx > AuthorGrid`

**`editorial.latest-episode`** — Large dark card for the newest podcast episode.

· Podcast index only. · appears on 1 routes · implemented by `src/components/extra/podcast.jsx > LatestEpisode`

**`editorial.episode-grid`** — Grid of podcast episode cards.

· Podcast index only. · appears on 1 routes · implemented by `src/components/extra/podcast.jsx > EpisodeGrid`

**`editorial.dive-card-grid`** — Gallery grid of dive cards (thumbnail, tags, author, vote buttons) plus its own load-more link.

· Dive gallery index only. · appears on 1 routes · implemented by `src/pages/content/DiveGallery.jsx > DiveCard`

### CONVERSION

_Blocks whose job is to capture a lead, registration, subscription or click-through: forms, CTA bands, gated downloads, registration bars._

**`conversion.cta-band`** — Closing call-to-action band with headline, optional sub-line and one or two buttons; variants per page.

· Product feature pages, DuckLake, Hypertenancy and the competitor pages (12 routes). · appears on 12 routes · implemented by `src/components/marketing/CTABand.jsx`

**`conversion.yellow-cta`** — Yellow band with headline and action between the architecture panel and the ecosystem diagram.

· Two of the three audience pages. · appears on 2 routes · implemented by `src/components/marketing/persona.jsx > YellowCTA`

**`conversion.contact-form`** — Contact sales form on the overview and DuckDB-user pages with validation and a success state.

· Product overview and DuckDB users page (2 routes). · appears on 2 routes · implemented by `src/components/marketing/persona.jsx > ContactForm`

**`conversion.newsletter-signup`** — Inline newsletter signup band with a large mascot, in the DuckLake page.

· DuckLake page only. · appears on 1 routes · implemented by `src/components/marketing/ducklake.jsx > NewsletterSignup`

**`conversion.apply-form`** — Startup-program application form that the hero action scrolls to.

· Startups page only. · appears on 1 routes · implemented by `src/components/marketing/bespoke.jsx > ApplyForm`

**`conversion.persona2-pricing-band`** — Pricing summary band on a persona landing page with start action.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > PricingBand2`

**`conversion.persona2-closing-band`** — Closing call to action of a persona landing page.

· The two persona landing pages (2 routes). · appears on 2 routes · implemented by `src/components/extra/persona2.jsx > ClosingBand2`

**`conversion.azure-waitlist`** — Waitlist opening styled as a code editor, with a playful and a plain form.

· Azure page only. · appears on 1 routes · implemented by `src/components/extra/azure.jsx > AzureWaitlist`

**`conversion.azure-vote`** — Interest block on the Azure page: a headline and intro beside a query-style card showing a region count, with a link that scrolls up to the waitlist form, and a region-map illustration. It has no voting control of its own.

· Azure page only. · appears on 1 routes · implemented by `src/components/extra/azure.jsx > AzureVote`

**`conversion.azure-closing`** — Closing action of the Azure page.

· Azure page only. · appears on 1 routes · implemented by `src/components/extra/azure.jsx > AzureClosing`

**`conversion.contact-band`** — About-page band inviting visitors to get in touch.

· About page only. · appears on 1 routes · implemented by `src/components/company/about.jsx > ContactBand`

**`conversion.community-cta`** — About-page community call to action.

· About page only. · appears on 1 routes · implemented by `src/components/company/about.jsx > CommunityCTA`

**`conversion.careers-closing-cta`** — Closing call to action of the careers page.

· Careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > ClosingCTA`

**`conversion.contact-chooser`** — Contact hub: headline and a set of cards, each linking to a contact path.

· Contact hub only. · appears on 1 routes · implemented by `src/components/company/contact.jsx > ContactChooser`

**`conversion.contact-split-form`** — Hero with a product-expert request form pulled up over it and an illustration on the form edge.

· Product expert contact page and its onboarding redirect (2 routes). · appears on 2 routes · implemented by `src/components/company/contact.jsx > ContactSplitForm`

**`conversion.support-request-form`** — Support request form (name, email, company, message) with validation and local success state.

· Contact support form page only. · appears on 1 routes · implemented by `src/pages/extra/ContactSupport.jsx > SupportForm`

**`conversion.gated-form`** — Download form that closes a gated landing page: name, email, company fields, consent and submit, with local success state.

· Gated landing pages and the book LP variants (8 routes). · appears on 8 routes · implemented by `src/components/company/lp.jsx > GatedFormSection`

**`conversion.gated-form-alt`** — Variant of the gated download form used on the long DuckLake guide LP.

· DuckLake guide LP only. · appears on 1 routes · implemented by `src/components/extra/lpBlocks.jsx > GatedFormSection2`

**`conversion.split-form-panel`** — Two-column panel: sun prose column beside a cream lead form with success overlay.

· The three split-form pages (3 routes). · appears on 3 routes · implemented by `src/components/extra/splitForm.jsx > SplitPanel`

**`conversion.side-form`** — Registration or download form in a side column beside generic prose.

· The two generic pages that carry a form. · appears on 2 routes · implemented by `src/components/extra/generic.jsx > SideForm`

**`conversion.form-bar`** — Bottom bar that scrolls to the side form on small screens.

· The two generic pages that carry a form. · appears on 2 routes · implemented by `src/components/extra/generic.jsx > FormBar`

**`conversion.webinar-register-lp`** — Registration landing: centered headline, logo pair, body copy and registration form beside a cover image.

· On-demand webinar pages with a registration form. · appears on 3 routes · implemented by `src/components/extra/webinar.jsx > WebinarRegisterLP`

**`conversion.webinar-side-form`** — Webinar page with banner and copy beside a registration form.

· One webinar page. · appears on 1 routes · implemented by `src/components/extra/webinar.jsx > WebinarSideForm`

**`conversion.subscribe-tile`** — Newsletter subscribe tile that sits inside feed grids.

· Blog and videos listings (2 routes). · appears on 2 routes · implemented by `src/components/content/subscribe.jsx > SubscribeTile`

**`conversion.subscribe-banner`** — Wide newsletter banner inside a feed, spanning the grid.

· News and upcoming events listings (2 routes). · appears on 2 routes · implemented by `src/components/content/subscribe.jsx > SubscribeBanner`

**`conversion.subscribe-band`** — Full-width newsletter band closing an article.

· Blog post pages (272 routes). · appears on 272 routes · implemented by `src/components/content/subscribe.jsx > SubscribeBand`

**`conversion.mobile-subscribe-button`** — Floating subscribe button for small screens.

· Blog index only. · appears on 1 routes · implemented by `src/components/content/subscribe.jsx > MobileSubscribeButton`

**`conversion.floating-get-started`** — Get-started button pinned to the viewport bottom-right while the article is on screen; static after the grid on small screens.

· Blog post pages (272 routes). · appears on 272 routes · implemented by `src/pages/content/BlogPost.jsx > BlogPost`

**`conversion.eco-join-card`** — Card inviting tools to join the partner program, opens the partner modal.

· Ecosystem index only. · appears on 1 routes · implemented by `src/components/content/eco.jsx > JoinFlockCard`

**`conversion.eco-build-cta`** — Closing "build with us" band.

· Ecosystem index only. · appears on 1 routes · implemented by `src/components/content/eco.jsx > BuildCTA`

**`conversion.speaker-banner`** — Sand banner inviting speaker applications.

· Upcoming and past events listings (14 routes). · appears on 14 routes · implemented by `src/pages/content/EventsHub.jsx > SpeakerBanner`

**`conversion.event-newsletter-band`** — Newsletter band under an event.

· Every event detail page (251 routes). · appears on 251 routes · implemented by `src/components/extra/events.jsx > EventNewsletterBand`

**`conversion.mobile-register-bar`** — Sticky bottom registration bar for small screens that hides while the sidebar action is visible.

· Every event detail page (251 routes). · appears on 251 routes · implemented by `src/components/extra/events.jsx > MobileRegisterBar`

**`conversion.author-subscribe`** — Subscribe band closing an author page.

· Every author page (120 routes). · appears on 120 routes · implemented by `src/components/extra/author.jsx > AuthorSubscribe`

**`conversion.learn-start-card`** — Get-started card in the sidebar at wide widths and inline below the body otherwise.

· Every learn article (68 routes). · appears on 68 routes · implemented by `src/components/extra/learn.jsx > StartCard`

**`conversion.term-promo`** — Promotional block inserted inside the term body on terms that define one.

· Glossary term pages (347 routes). · appears on 347 routes · implemented by `src/components/extra/glossary.jsx > TermPromo`

**`conversion.chapter-cta`** — Call to action below the chapter headline.

· Every book chapter summary (11 routes). · appears on 11 routes · implemented by `src/components/extra/bookChapter.jsx > ChapterCta`

**`conversion.book-panel`** — Book promotion panel inline in the chapter article.

· Every book chapter summary (11 routes). · appears on 11 routes · implemented by `src/components/extra/bookChapter.jsx > BookPanel`

**`conversion.read-ebook-bar`** — Sticky bottom bar pointing to the ebook.

· Every book chapter summary (11 routes). · appears on 11 routes · implemented by `src/components/extra/bookChapter.jsx > ReadEbookBar`

**`conversion.jev-closing`** — Closing call to action of the savings landing page.

· Savings landing page only. · appears on 1 routes · implemented by `src/components/extra/jev.jsx > Closing`

### COMMERCE

_Pricing and cost-model blocks: plans, matrices, calculators._

**`commerce.pricing-hero`** — Pricing page opening: the pricing tab strip (active on the first tab), a centered all-caps page title and a one-line lede.

· Pricing page only. · appears on 1 routes · implemented by `src/components/marketing/pricing.jsx > PricingHero`

**`commerce.tier-cards`** — Plan tier cards with price, feature bullets and action.

· Pricing page only. · appears on 1 routes · implemented by `src/components/marketing/pricing.jsx > TierCards`

**`commerce.plan-matrix`** — Feature comparison table across plans, with a region select.

· Pricing page only. · appears on 1 routes · implemented by `src/components/marketing/pricing.jsx > PlanMatrix`

**`commerce.instances`** — Compute instance cards with sizes.

· Pricing page only. · appears on 1 routes · implemented by `src/components/marketing/pricing.jsx > InstancesSection`

**`commerce.pricing-final-cta`** — Closing sign-up band of the pricing page.

· Pricing page only. · appears on 1 routes · implemented by `src/components/marketing/pricing.jsx > FinalCTA`

**`commerce.duckdb-support-panel`** — Panel presenting the DuckDB support offering.

· DuckDB support pricing page only. · appears on 1 routes · implemented by `src/components/marketing/pricing.jsx > DuckDBSupportPanel`

**`commerce.jev-calculator`** — Interactive savings calculator with range slider and result figures.

· Savings landing page only. · appears on 1 routes · implemented by `src/components/extra/jev.jsx > Calculator`

**`commerce.jev-pricing`** — Dark pricing block of the savings landing page.

· Savings landing page only. · appears on 1 routes · implemented by `src/components/extra/jev.jsx > Pricing`

### LEGAL

_Legal and policy documents and their navigation._

**`legal.document-title`** — Page-title header of a legal document (optionally with a subtitle). A near-identical second implementation, LegalTocShell in src/components/extra/generic.jsx, serves the terms of service and candidate privacy routes.

· All legal documents that carry a table of contents (4 routes). · appears on 4 routes · implemented by `src/components/company/legal.jsx > LegalShell`

**`legal.toc-sidebar`** — Bordered "table of contents" card with scroll-spy and collapsible sub-sections, sticky on the right at wide widths. Second implementation inside LegalTocShell.

· All legal documents that carry a table of contents (4 routes). · appears on 4 routes · implemented by `src/components/company/legal.jsx > Toc`

**`legal.document-article`** — Long-form legal text with headings matched to the table of contents (privacy policy, terms of use, terms of service, candidate privacy); body is placeholder prose of measured shape.

· All legal documents that carry a table of contents (4 routes). · appears on 4 routes · implemented by `src/components/company/legal.jsx > PrivacyPolicy`

**`legal.support-policy-document`** — Compact-title support policy: dated lede and paragraphs around a bordered table; no table of contents.

· Support policy page only. · appears on 1 routes · implemented by `src/components/company/legal.jsx > SupportPolicy`

### UTILITY

_Navigation and interaction helpers: filters, search, pagination, tables of contents, modals, back links and floating buttons._

**`utility.search-filter-panel`** — Bordered panel with search field and select dropdowns (topic, type, location) and a clear action.

· Blog index, web-links feed and both events listings (16 routes). · appears on 16 routes · implemented by `src/components/content/filters.jsx > SearchFilterPanel`

**`utility.category-chips`** — Row of category filter chips that drive a query parameter.

· Case studies, videos and ecosystem indexes (3 routes). · appears on 3 routes · implemented by `src/components/content/CategoryChips.jsx`

**`utility.search-field`** — Standalone search input committing to a query parameter, paired with category chips.

· Videos and ecosystem indexes (2 routes). · appears on 2 routes · implemented by `src/components/content/filters.jsx > SearchField`

**`utility.load-more-footer`** — Infinite-load footer with a load-more link that is also an intersection sentinel.

· Blog, news, web-links feed and videos (4 routes). · appears on 4 routes · implemented by `src/components/content/bits.jsx > FeedFooter`

**`utility.events-tabs`** — Upcoming / Past chip pair switching between the two event listings.

· Upcoming and past events listings (14 routes). · appears on 14 routes · implemented by `src/pages/content/EventsHub.jsx > EventsHub`

**`utility.pagination`** — Numbered page links with ellipsis windows for the past events archive.

· Past events listing (13 routes). · appears on 13 routes · implemented by `src/components/extra/events.jsx > Pagination`

**`utility.partner-modal`** — Modal opened from the ecosystem hero, join card and closing band, for applying to the partner program.

· Ecosystem index only. · appears on 1 routes · implemented by `src/components/content/eco.jsx > PartnerModal`

**`utility.gated-video-modal`** — Registration modal that unlocks playback of a gated webinar video.

· Standard webinar and video pages (11 routes). · appears on 11 routes · implemented by `src/components/extra/webinar.jsx > GatedVideoModal`

**`utility.back-link`** — Small uppercase back link to the parent index.

· Ecosystem partner pages (84 routes). · appears on 84 routes · implemented by `src/components/content/bits.jsx > BackLink`

**`utility.back-to-top-rail`** — Floating back-to-top button spanning the article via an absolutely positioned rail; shows after 600px of scroll.

· Every case study detail page (23 routes). · appears on 23 routes · implemented by `src/components/content/cases.jsx > BackToTop`

**`utility.back-to-top-event`** — Floating back-to-top button that fades in between 300 and 500px of scroll (a separate implementation from the case-study one).

· Every event detail page (251 routes). · appears on 251 routes · implemented by `src/components/extra/events.jsx > EventBackToTop`

**`utility.blog-toc`** — Sticky sidebar table of contents built from article headings.

· Every blog post (272 routes). · appears on 272 routes · implemented by `src/components/content/Toc.jsx > BlogToc`

**`utility.video-toc-sidebar`** — Sticky table-of-contents sidebar beside video-style article body.

· Video detail pages (149 routes). · appears on 149 routes · implemented by `src/components/content/videos.jsx > VideoSidebar`

**`utility.toc-fab`** — Floating button that opens a table-of-contents sheet on narrow screens.

· Video detail and learn articles (217 routes). · appears on 217 routes · implemented by `src/components/content/videos.jsx > TocFab`

**`utility.learn-sidebar`** — Sticky sidebar for learn articles: table of contents and start card at wide widths.

· Every learn article (68 routes). · appears on 68 routes · implemented by `src/components/extra/learn.jsx > LearnSidebar`

**`utility.research-toc-box`** — Table-of-contents box shown beneath the article below the wide breakpoint.

· Every research paper (6 routes). · appears on 6 routes · implemented by `src/components/extra/research.jsx > TocBox`

**`utility.research-sidebar`** — Sticky sidebar with table of contents and paper card at wide widths.

· Every research paper (6 routes). · appears on 6 routes · implemented by `src/components/extra/research.jsx > ResearchSidebar`

**`utility.view-paper-fab`** — Floating action linking to the full paper.

· Every research paper (6 routes). · appears on 6 routes · implemented by `src/components/extra/research.jsx > ViewPaperFab`

**`utility.glossary-bar`** — Sticky bar with search and A-Z jump letters.

· Glossary index (clone-only route). · appears on 0 routes · implemented by `src/components/extra/glossary.jsx > GlossaryBar`

**`utility.back-to-glossary`** — Back link to the glossary index.

· Every glossary term page (347 routes). · appears on 347 routes · implemented by `src/components/extra/glossary.jsx > BackToGlossary`

**`utility.chapter-back-link`** — Back link to the book contents list.

· Every book chapter summary (11 routes). · appears on 11 routes · implemented by `src/pages/extra/BookChapter.jsx > BookChapter`

**`utility.browse-dives-link`** — Link back to the dive gallery.

· Every dive detail page (135 routes). · appears on 135 routes · implemented by `src/components/extra/dive.jsx > BrowseDivesLink`

**`utility.dive-search-filter-bar`** — Cream band with pill search and format/topic filter pills.

· Dive gallery index only. · appears on 1 routes · implemented by `src/pages/content/DiveGallery.jsx > DiveGallery`

**`utility.dive-sort-toolbar`** — Sort dropdown plus Pick and Hackathon toggle pills.

· Dive gallery index only. · appears on 1 routes · implemented by `src/pages/content/DiveGallery.jsx > SortMenu`

**`utility.episode-back`** — Back link to the podcast index.

· Every podcast episode page (11 routes). · appears on 11 routes · implemented by `src/components/extra/podcast.jsx > EpisodeBack`

### APP

_A self-contained interactive app surface embedded as a page._

**`app.try-workspace`** — Full-viewport separate chat-style app: own top bar with mascot and actions, model tabs, prompt box, example cards, right rail, dismissible tip and mascot. Non-functional in the clone.

· Try page only; no site header or footer. · appears on 1 routes · implemented by `src/pages/extra/Try.jsx > Try`
