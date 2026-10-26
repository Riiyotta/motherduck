// Slot -> image lookup for Placeholder, built from IMAGE_BRIEFS.md (one row per call site).
// Each entry matches on `label` (exact string or RegExp) and optionally `route` (string prefix or
// RegExp on the pathname), and resolves to one of:
//   { kind: 'photo', src }            single photo in public/assets/photos
//   { kind: 'photo', srcPool: [...] } listing slots: each instance takes the next photo in the pool
//   { kind: 'art', art: 'name' }      original SVG from ui/art (registry in ui/art/index.js)
//   { kind: 'art', artPool: [...] }   listing slots with rotating original art
// Optional: seed (fixed variant), objectPosition (photo crop), fit ('cover' | 'contain').
// First match wins, so route-specific rows go before generic ones. Credits: photos/CREDITS.json.
export const photo = (file) => `/assets/photos/${file}`

// Blog carousel (homepage): brief asks for ~6 presenter thumbnails, ~7 editorial graphics,
// 1 newsletter graphic and ~6 logo cards. Titles come from components/blog/posts.js.
const PRESENTER_POSTS = [
  'Columnar storage: a short talk',
  'Live session: a metrics layer from scratch',
  'Notes on columnar storage, part two of three',
  'Ten minutes on table formats',
  'Notes on columnar storage, the first part',
  'Office hours: your questions about change data capture, answered live',
]
const LOGO_POSTS = [
  'Moving nightly batch jobs to on-demand queries at a growing retail brand',
  'Notes on columnar storage, part 3',
  'Serving per-customer dashboards without running a separate cache tier at all',
  'Release notes: the latest drivers',
  'Field notes: October',
  'Cutting dashboard load times for a logistics team with one change',
]
const NEWSLETTER_POSTS = ['Query plans explained']
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const oneOf = (titles, prefix) => new RegExp(`^${prefix}(${titles.map(esc).join('|')})$`)


// ---- helpers for the company / content / marketing rows
const num = (label) => parseInt((label.match(/\d+/) || ['1'])[0], 10)
const scene = (variant, extra = {}) => ({ kind: 'illustration', art: 'house', props: { variant }, ...extra })
const spot = (variant, extra = {}) => ({ kind: 'illustration', art: 'spot', props: { variant }, ...extra })
// transparent, frameless: art that sits on a coloured band or card edge on the original
const loose = { frameless: true, bg: 'bg-transparent' }
const scenePool = (variants, extra = {}) => ({ kind: 'illustration', artPool: variants.map(() => 'house'), propsPool: variants.map((variant) => ({ variant })), ...extra })
const logoByNumber = (seedBase = 0) => ({ kind: 'logo', frameless: true, inset: 'inset-0', art: 'brand', indexFrom: num, seedBase })
const P = photo
const MARQUEE = ['workshop-1.jpg', 'social-1.jpg', 'offsite-1.jpg', 'workshop-2.jpg', 'social-2.jpg', 'workshop-3.jpg', 'offsite-2.jpg', 'social-3.jpg', 'workshop-4.jpg', 'offsite-3.jpg', 'workshop-5.jpg', 'social-4.jpg']
const HEADSHOTS = ['headshot-1.jpg', 'headshot-2.jpg', 'headshot-3.jpg', 'headshot-4.jpg', 'headshot-5.jpg', 'headshot-6.jpg']
const CUSTOMERS = ['customer-1.jpg', 'customer-2.jpg', 'customer-3.jpg', 'customer-4.jpg', 'customer-5.jpg', 'customer-6.jpg', 'customer-7.jpg', ...HEADSHOTS]
const PRESENTERS = [1, 2, 3, 4, 5, 6].map((k) => P(`presenter-${k}.jpg`))
// /blog grid: ~75% editorial graphics, ~15% newsletter, ~10% event/speaker, one photo-based graphic.
const BLOG_POOL = [
  ['editorialPost', {}], ['editorialPost', {}], ['newsletterPost', {}], ['editorialPost', {}], ['eventPost', { photos: PRESENTERS }],
  ['editorialPost', {}], ['editorialPost', {}], ['photoPost', { photo: P('sea-boat.jpg') }], ['editorialPost', {}], ['newsletterPost', {}],
  ['editorialPost', {}], ['editorialPost', {}], ['eventPost', { photos: PRESENTERS.slice(2) }], ['editorialPost', {}], ['editorialPost', {}],
  ['newsletterPost', {}], ['editorialPost', {}], ['editorialPost', {}],
]
// /duckdb-news: ~90% monthly newsletter graphics.
const NEWS_POOL = Array.from({ length: 18 }, (_, i) => (i % 9 === 4 ? ['editorialPost', {}] : ['newsletterPost', {}]))
// /quacking-around-the-web: ~35% illustrative art, ~25% site/podcast frames, ~25% talk cards, ~15% stock photos.
const QUACK_POOL = [
  ['quackPost', { kind: 'printer' }], ['presenterThumb', { photo: PRESENTERS[0] }], ['quackPost', { kind: 'site' }], ['quackPost', { kind: 'photo', photo: P('office-tower.jpg') }],
  ['quackPost', { kind: 'house' }], ['quackPost', { kind: 'podcast', photos: PRESENTERS.slice(1, 3) }], ['presenterThumb', { photo: PRESENTERS[3] }], ['editorialPost', {}],
  ['quackPost', { kind: 'photo', photo: P('retro-computer.jpg') }], ['quackPost', { kind: 'site' }], ['presenterThumb', { photo: PRESENTERS[4] }], ['editorialPost', {}],
  ['quackPost', { kind: 'printer' }], ['presenterThumb', { photo: PRESENTERS[5] }], ['quackPost', { kind: 'podcast', photos: PRESENTERS.slice(3, 5) }], ['quackPost', { kind: 'house' }],
  ['quackPost', { kind: 'photo', photo: P('office-tower.jpg') }], ['editorialPost', {}],
]
// /videos grid: ~80% creator thumbnails (one presenter, headline, UI inset), ~20% webinar frames.
const VIDEO_POOL = Array.from({ length: 36 }, (_, i) =>
  i % 5 === 4 ? ['webinarThumb', { photos: [PRESENTERS[(i + 1) % 6], PRESENTERS[(i + 3) % 6], PRESENTERS[(i + 4) % 6], PRESENTERS[(i + 5) % 6]] }] : ['creatorThumb', { photo: PRESENTERS[i % 6] }])
const pairs = (list, extra = {}) => ({ artPool: list.map(([a]) => a), propsPool: list.map(([, p]) => p), ...extra })
const FEATURES = {
  '/product/dives': ['chatChart', 'filterDash', 'workspace', 'saasCharts', 'agentHub'],
  '/product/ducklake': ['lakeLayers', 'lakeLayers', 'lakeLayers', 'lakeLayers'],
  '/product/flights': ['pipeClock', 'pyEditor', 'fileTree', 'sqlTerm'],
  '/product/guides': ['guideFn', 'pipIcons', 'mcpPanel'],
  '/product/mcp-server': ['agentHub', 'mcpPanel', 'chatChart', 'sqlTerm'],
  '/product/postgres-integration': ['sqlTerm', 'pipeClock', 'workspace', 'pyEditor'],
  '/vs': ['filterDash', 'sqlTerm', 'saasCharts', 'agentHub', 'pipIcons'],
}
const CTA = { '/product/dives': 'ctaDives', '/product/ducklake': 'ctaDucklake', '/product/flights': 'ctaFlights', '/product/guides': 'ctaGuides', '/product/mcp-server': 'ctaMcp', '/product/postgres-integration': 'ctaPostgres', '/product/hypertenancy': 'ctaHyper', '/vs': 'ctaVs' }

export const IMAGE_MAP = [
  // ---------------------------------------------------------------- Homepage (/)
  // Hero logo strip: 6 invented customer marks; slot 2 is near-square (29x24) so it gets a monogram.
  { label: 'Customer logo 2', route: '/', kind: 'logo', frameless: true, inset: 'inset-0', art: 'monogram', seed: 1 },
  { label: /^Customer logo \d+$/, route: '/', kind: 'logo', frameless: true, inset: 'inset-0', art: 'brand', poolKey: 'heroLogos', propsPool: [{}], seedBase: 0 },
  // Architecture shared-storage pills: table format, open table format, object store (16x16).
  { label: '', route: '/', kind: 'icon', inset: 'inset-0', artPool: ['storageGlyph'], propsPool: [{ variant: 'layers' }, { variant: 'peak' }, { variant: 'bucket' }] },
  { label: 'Company logo', route: '/', kind: 'logo', frameless: true, inset: 'inset-0', art: 'brand', seed: 11 },
  { label: 'Company logo placeholder', route: '/', kind: 'logo', frameless: true, inset: 'inset-0', art: 'brand', seed: 12 },
  // Platform diagram link cards (Visuals = Dives, Pipelines = Flights, Context = Guides).
  { label: 'Visuals icon placeholder', kind: 'icon', inset: 'inset-0', frameless: true, art: 'productIcon', props: { variant: 'dives' } },
  { label: 'Pipelines icon placeholder', kind: 'icon', inset: 'inset-0', frameless: true, art: 'productIcon', props: { variant: 'flights' } },
  { label: 'Context icon placeholder', kind: 'icon', inset: 'inset-0', frameless: true, art: 'productIcon', props: { variant: 'guides' } },
  // Product cards render in order Pipelines (Flights), Context (Guides), Visuals (Dives).
  { label: 'Product icon placeholder', kind: 'icon', inset: 'inset-0', frameless: true, art: 'productIcon', propsPool: [{ variant: 'flights' }, { variant: 'guides' }, { variant: 'dives' }] },
  { label: 'Product screenshot placeholder', kind: 'diagram', art: 'productShot', propsPool: [{ variant: 'flights' }, { variant: 'guides' }, { variant: 'dives' }] },
  { label: 'Illustration placeholder', route: '/', kind: 'mascot', inset: 'inset-0', art: 'pipPointing', frameless: true },
  // Customers case cards: logo 4 is 44x47 (square mark), the rest are wide wordmarks.
  { label: 'Customer logo placeholder', kind: 'logo', frameless: true, inset: 'inset-0', artPool: ['brand', 'brand', 'brand', 'monogram', 'brand'], seedBase: 6 },
  { label: 'Section illustration', route: '/', kind: 'mascot', inset: 'inset-0', art: 'pipWaving', frameless: true },
  // Blog carousel thumbnails.
  { label: oneOf(PRESENTER_POSTS, 'Thumbnail: '), kind: 'thumbnail', art: 'presenterThumb', poolKey: 'presenter',
    propsPool: [1, 2, 3, 4, 5, 6].map((k) => ({ photo: photo(`presenter-${k}.jpg`) })) },
  { label: oneOf(LOGO_POSTS, 'Thumbnail: '), kind: 'logo', bg: 'bg-white', inset: 'inset-0', art: 'brand', poolKey: 'blogLogo', propsPool: [{}], seedBase: 13 },
  { label: oneOf(NEWSLETTER_POSTS, 'Thumbnail: '), kind: 'thumbnail', art: 'newsletterThumb' },
  { label: /^Thumbnail: /, kind: 'thumbnail', art: 'editorialThumb', poolKey: 'editorial', propsPool: [{ variant: 'pip' }, { variant: 'chart' }, { variant: 'speakers' }] },

  // ---------------------------------------------------------------- Company
  { label: 'About hero illustration', ...scene('aboutHero'), ...loose },
  { label: 'Values illustration', ...scene('values'), ...loose },
  { label: 'Team photo', route: '/about-us', kind: 'photo', src: P('team-beach.jpg'), objectPosition: '50% 55%' },
  { label: /^Investor logo \d+$/, ...logoByNumber(20) },
  { label: 'Animated character (static)', ...spot('asterDrum'), ...loose },
  { label: 'Community banner', kind: 'diagram', art: 'communityBanner' },
  { label: 'Careers hero collage', kind: 'photo', art: 'careersCollage', ...loose, props: { photos: [P('careers-boat.jpg'), P('event-drink.jpg'), P('group-indoor.jpg')] } },
  { label: /^Team at work photo \d+$/, kind: 'photo', srcPool: [P('office-meeting.jpg'), P('offsite-group.jpg')], indexFrom: (l) => num(l) - 1 },
  { label: 'Culture video thumbnail', kind: 'photo', src: P('cheering-crowd.jpg'), objectPosition: '50% 40%' },
  { label: 'Flexibility illustration', ...scene('flexibility') },
  { label: 'Thoughtfulness illustration', ...scene('thoughtfulness') },
  { label: 'Unorthodoxy illustration', ...scene('unorthodoxy') },
  { label: 'Agency illustration', ...scene('agency') },
  { label: 'World map illustration', ...spot('worldMap'), ...loose },
  { label: /^Team photo \d+\.\d+$/, kind: 'photo', srcPool: MARQUEE.map(P), indexFrom: (l) => { const [a, b] = l.match(/\d+/g).map(Number); return (a - 1) * 3 + (b - 1) } },
  { label: /^Portrait \d+$/, route: '/careers', kind: 'photo', srcPool: [P('portrait-1.jpg'), P('portrait-2.jpg'), P('portrait-3.jpg')], indexFrom: (l) => num(l) - 1, objectPosition: '50% 30%' },
  { label: 'Closing illustration', route: '/careers', ...spot('careersClosing'), ...loose },
  { label: 'Form illustration', ...spot('formIllo'), ...loose },
  { label: /^Partner logo \d+$/, ...logoByNumber(30) },
  { label: 'Support illustration', ...spot('support'), ...loose },
  { label: 'Getting started illustration', ...spot('gettingStarted'), ...loose },
  { label: 'Community help illustration', ...spot('communityHelp'), ...loose },
  { label: 'Feature ideas illustration', ...spot('featureIdeas'), ...loose },
  { label: 'Callout illustration', ...spot('callout'), ...loose },
  { label: 'Book cover', route: '/lp/ai-analytics-eval-field-guide-full', kind: 'cover', art: 'bookCover', props: { variant: 'eval' } },
  { label: 'Book cover', route: '/lp/data-ai-survey-full', kind: 'cover', art: 'bookCover', props: { variant: 'survey' } },
  { label: 'Book cover', route: '/lp/guide-to-bi-in-the-agentic-era-full', kind: 'cover', art: 'bookCover', props: { variant: 'bi' } },
  { label: 'Book cover', route: '/lp/ducklake-lakehouse-table-format-book-full', kind: 'cover', art: 'bookCover', props: { variant: 'lakebook' } },
  { label: 'Book cover', route: '/duckdb-book-brief', kind: 'cover', art: 'bookCover', props: { variant: 'bookbrief' } },
  { label: 'Book cover', kind: 'cover', art: 'bookCover', props: { variant: 'eval' } },
  { label: 'Guide preview image', route: '/duckdb-cheatsheet-full', kind: 'diagram', art: 'guidePreview', props: { variant: 'cheatsheet' } },
  { label: 'Guide preview image', kind: 'diagram', art: 'guidePreview', props: { variant: 'pg' } },
  { label: /^Author \d+ photo$/, kind: 'photo', srcPool: [P('author-1.jpg'), P('author-2.jpg')], indexFrom: (l) => num(l) - 1, objectPosition: '50% 25%' },
  { label: 'Download thumbnail', route: '/lp/ai-analytics-eval-field-guide-full', kind: 'cover', art: 'bookCover', props: { variant: 'eval' } },
  { label: 'Download thumbnail', route: '/lp/data-ai-survey-full', kind: 'cover', art: 'bookCover', props: { variant: 'survey' } },
  { label: 'Download thumbnail', ...scene('support') },
  { label: 'Book illustration', ...spot('bookIllo'), ...loose },
  { label: 'Logo mark', route: '/duckdb-book-brief', kind: 'logo', frameless: true, inset: 'inset-0', art: 'brandMark', props: { outline: true } },
  { label: 'Logo mark', kind: 'logo', frameless: true, inset: 'inset-0', art: 'brandMark' },

  // ---------------------------------------------------------------- Content
  { label: 'Featured thumbnail', kind: 'thumbnail', art: 'newsletterFeatured' },
  { label: 'Post thumbnail', route: '/duckdb-news', kind: 'thumbnail', ...pairs(NEWS_POOL) },
  { label: 'Post thumbnail', route: '/quacking-around-the-web', kind: 'thumbnail', ...pairs(QUACK_POOL) },
  { label: 'Post thumbnail', kind: 'thumbnail', ...pairs(BLOG_POOL) },
  { label: 'Subscribe illustration', ...spot('subscribe'), ...loose },
  { label: 'Newsletter illustration', ...spot('asterDrum'), ...loose },
  { label: 'Newsletter icon', ...spot('newsletterIcon'), ...loose },
  { label: 'Read next image', kind: 'thumbnail', ...pairs([['editorialPost', { act: 'present' }], ['bookCover', { variant: 'eval' }], ['editorialPost', { act: 'pipes' }], ['newsletterPost', {}], ['editorialPost', { act: 'read' }]]) },
  { label: 'Article image', route: '/community-code', ...scene('pipHeart') },
  { label: 'Article image', kind: 'diagram', artPool: ['articleChart'], propsPool: [{}] },
  { label: 'Embedded content', kind: 'diagram', art: 'embed' },
  { label: /^Company \d+ logo$/, ...logoByNumber(40) },
  { label: 'Headshot', kind: 'photo', srcPool: HEADSHOTS.map(P), objectPosition: '50% 30%' },
  { label: 'Profile photo', kind: 'photo', src: P('profile-bw.jpg'), objectPosition: '50% 30%' },
  { label: 'Featured video thumbnail', kind: 'thumbnail', art: 'featuredVideo', props: { photo: P('presenter-cap.jpg') } },
  { label: 'Video placeholder', kind: 'thumbnail', art: 'creatorThumb', props: { photo: PRESENTERS[1], w: 1238, h: 696 } },
  { label: 'Decorative line art', ...scene('lineArt') },
  { label: 'FAQ illustration', ...spot('pipStandLeft'), ...loose },
  { label: 'Ecosystem illustration', ...spot('ecoHero'), ...loose },
  { label: /^Partner \d+ logo$/, ...logoByNumber(50) },
  { label: 'Partner illustration', ...spot('asterDrum'), ...loose },
  { label: 'Illustration', route: '/ecosystem', ...spot('ecoBlob'), ...loose },
  { label: 'Guide icon', ...scenePool(['lRing', 'lBolt', 'lChartDrum', 'lGrid', 'lCloudTerm', 'lPipFolders', 'lBookDrum', 'lPurple', 'lChartDrum', 'lLinked', 'lGrid', 'lDrums'], { art: undefined, artPool: Array(12).fill('spot'), ...loose }) },
  { label: 'Events illustration', ...spot('eventsHero'), ...loose },
  { label: 'Community illustration', ...spot('megaphoneSmall'), ...loose },
  { label: 'Dive gallery hero image', ...scene('diveHero') },
  { label: 'Dive thumbnail', kind: 'diagram', artPool: ['dashboard'], propsPool: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => ({ kind: ['kpi', 'gauge', 'table', 'map', 'scatter', 'music', 'game', 'grid', 'bars'][k], theme: [0, 1, 4, 5, 6].includes(k) ? 'dark' : 'light' })) },

  // ---------------------------------------------------------------- Marketing
  { label: 'Video thumbnail', route: /^\/product$/, kind: 'thumbnail', art: 'promoFrame', props: { variant: 'product' } },
  { label: 'Video thumbnail', route: '/product/app-developers', kind: 'thumbnail', art: 'promoFrame', props: { variant: 'appdev' } },
  { label: 'Video thumbnail', route: '/product/data-teams', kind: 'thumbnail', art: 'promoFrame', props: { variant: 'datateams' } },
  { label: 'Video thumbnail', kind: 'thumbnail', ...pairs(VIDEO_POOL) },
  { label: 'Hero illustration', route: '/product/duckdb-users', ...spot('terminalPeek'), ...loose },
  { label: 'Hero illustration', route: '/startups', ...spot('heroStartups'), ...loose },
  { label: 'Hero illustration', route: '/research', ...spot('heroResearch'), ...loose },
  { label: 'Hero illustration', route: '/trust-and-security', ...spot('heroTrust'), ...loose },
  { label: 'Hero illustration', route: '/community-and-open-source', ...spot('heroCommunity'), ...loose },
  { label: 'Use case illustration', ...scenePool(['useCaseLeft', 'useCaseRight']) },
  { label: 'Icon', route: /^\/product$/, ...spot('arrowDown'), ...loose },
  { label: 'Icon', ...scenePool(['iCloudTerm', 'iWinDb', 'iNotebook', 'iRing', 'iChartWin', 'iClipGear'], { artPool: Array(6).fill('spot'), ...loose }) },
  { label: 'Story illustration (static)', ...scenePool(['storyOld', 'storyNew']) },
  { label: 'Closing illustration', route: /^\/product$/, ...spot('closing'), ...loose },
  { label: 'Illustration', route: '/product/app-developers', ...scenePool(['pvRacing', 'pvMagnify', 'pvPiggy', 'pricingCta']) },
  { label: 'Illustration', route: '/product/data-teams', ...scenePool(['pvChart', 'pvJuggle', 'pvLaptop', 'pricingCta']) },
  { label: 'Illustration', route: '/product/duckdb-users', ...scenePool(['pvAsleep', 'pvNodes', 'pvFlock']) },
  { label: 'Illustration', route: '/product/pricing', ...scenePool(['piggyPip', 'pvCards', 'pvHeart', 'pvShield']) },
  { label: 'Product UI video thumbnail', kind: 'thumbnail', art: 'sqlNotebook' },
  { label: 'Feature icon', ...scenePool(['fServerless', 'fMcp', 'fContext', 'fLiveViz', 'fPipelines', 'fIsolated'], { artPool: Array(6).fill('spot'), ...loose }) },
  { label: 'Architecture diagram', route: '/product/app-developers', kind: 'diagram', artPool: ['tier'], propsPool: [{ tier: 0 }, { tier: 1 }, { tier: 2 }] },
  { label: 'Architecture diagram', route: /^\/product$/, kind: 'diagram', art: 'arch', props: { variant: 'product' } },
  { label: 'Architecture diagram', kind: 'diagram', art: 'arch', props: { variant: 'persona' } },
  { label: 'Background video (not reproduced)', ...scene('faintGrid'), frameless: true },
  { label: 'Warehouse emblem', kind: 'logo', inset: 'inset-[12%]', art: 'brandMark', props: { tile: true }, ...loose },
  { label: 'Tool logo', route: '/product/flights', kind: 'logo', frameless: true, inset: 'inset-0', artPool: ['brand', 'brand', 'brand', 'brand', 'brand', 'house'], propsPool: [{}, {}, {}, {}, {}, { variant: 'stopwatchSpot' }], seedBase: 60 },
  { label: 'Tool logo', kind: 'logo', frameless: true, inset: 'inset-0', artPool: ['brand'], propsPool: [{}], seedBase: 70 },
  { label: 'Customer photo', kind: 'photo', srcPool: CUSTOMERS.map(P), objectPosition: '50% 30%' },
  { label: 'Decorative illustration', ...scenePool(['pipStandLeft', 'pipLookUp'], { artPool: ['spot', 'spot'], ...loose }) },
  { label: 'Floating illustration', route: '/product/flights', ...spot('floatPlane'), ...loose },
  { label: 'Floating illustration', ...scenePool(['floatSheet', 'floatSheetBlue'], { artPool: ['spot', 'spot'], ...loose }) },
  { label: 'Guides illustration', ...spot('booksPile'), ...loose },
  { label: 'Integration illustration', ...spot('integrationHero'), ...loose },
  { label: 'Problem illustration', route: '/product/mcp-server', ...scenePool(['probStopwatch', 'probBubble', 'probCoins'], { artPool: Array(3).fill('spot'), ...loose }) },
  { label: 'Problem illustration', ...scenePool(['probSnail', 'probSpiky', 'probGear'], { artPool: Array(3).fill('spot'), ...loose }) },
  { label: 'Product screenshot', route: '/product/flights', kind: 'diagram', art: 'system', props: { variant: 'flights' } },
  { label: 'Product screenshot', kind: 'diagram', art: 'system', props: { variant: 'dives' } },
  { label: 'Product video (no playback)', kind: 'thumbnail', art: 'divesPoster' },
  { label: 'Live embedded app (external, not loaded)', kind: 'diagram', art: 'liveMap' },
  { label: 'Gallery thumbnail', kind: 'diagram', artPool: ['dashboard'], propsPool: [{ kind: 'kpi', theme: 'light', seed: 0 }, { kind: 'scatter', theme: 'dark' }, { kind: 'scatter', theme: 'light' }] },
  { label: 'Overlay', ...spot('overlayPeek'), ...loose },
  { label: 'Guides comparison chart', kind: 'diagram', art: 'guidesChart' },
  ...Object.entries(FEATURES).map(([route, list]) => ({ label: /^Feature image \d+$/, route, kind: 'diagram', art: 'featureImage', indexFrom: (l) => num(l) - 1, propsPool: list.map((variant) => ({ variant })) })),
  { label: /^Feature image \d+$/, kind: 'diagram', art: 'featureImage', indexFrom: (l) => num(l) - 1, propsPool: FEATURES['/product/dives'].map((variant) => ({ variant })) },
  ...Object.entries(CTA).map(([route, variant]) => ({ label: 'CTA illustration', route, ...spot(variant), ...loose })),
  { label: 'CTA illustration', ...spot('ctaDives'), ...loose },
  { label: 'Portrait', route: '/product/flights', kind: 'photo', src: P('headshot-1.jpg'), objectPosition: '50% 30%' },
  { label: 'Portrait', route: '/product/mcp-server', kind: 'photo', src: P('headshot-2.jpg'), objectPosition: '50% 30%' },
  { label: 'Portrait', route: '/product/postgres-integration', kind: 'photo', src: P('headshot-3.jpg'), objectPosition: '50% 30%' },
  { label: 'Portrait', kind: 'photo', src: P('headshot-4.jpg'), objectPosition: '50% 30%' },
  { label: 'Company logo', kind: 'logo', frameless: true, inset: 'inset-0', artPool: ['brand'], propsPool: [{}], seedBase: 80 },
  { label: /^FORMAT A diagram$/, kind: 'diagram', art: 'format', props: { variant: 'iceberg' } },
  { label: /diagram$/, route: '/product/ducklake', kind: 'diagram', art: 'format', props: { variant: 'ducklake' } },
  { label: 'Mascot illustration', route: '/product/ducklake', kind: 'cover', art: 'coverOnClouds', ...loose },
  { label: 'Mascot illustration', ...spot('vsSpot'), ...loose },
  { label: 'Article thumbnail', kind: 'thumbnail', artPool: ['editorialPost'], propsPool: ['desk', 'surf', 'house', 'fish', 'read', 'pipes', 'present', 'rocket'].map((act, i) => ({ act, tone: ['#16AA98', '#C9A7F5', '#FF7169'][i % 3] })) },
  { label: 'Product media', kind: 'diagram', art: 'routing' },
  { label: /^(UI|CURL|PYTHON) example screenshot$/, kind: 'diagram', art: 'adminTable', indexFrom: (l) => ['UI', 'CURL', 'PYTHON'].indexOf(l.split(' ')[0]), propsPool: [{ tab: 'UI' }, { tab: 'CURL' }, { tab: 'PYTHON' }] },
  { label: /^Feature panel \d+$/, kind: 'diagram', art: 'hyperPanel', indexFrom: (l) => num(l) - 1, propsPool: [1, 2, 3, 4, 5].map((n) => ({ n })) },
  { label: 'Tier mascot', ...scenePool(['tierLite', 'tierBusiness', 'tierEnterprise'], { artPool: Array(3).fill('spot'), ...loose }) },
  { label: 'Instance illustration', ...scenePool(['instPulse', 'instStandard', 'instJumbo', 'instMega', 'instGiga'], { artPool: Array(5).fill('spot'), ...loose }) },
  { label: /^Marketplace logo \d+$/, ...logoByNumber(90) },
  { label: 'Support icon', ...spot('supportRing'), ...loose },
  { label: 'Decoration', ...scenePool(['decoKite', 'decoDrum'], { artPool: ['spot', 'spot'], ...loose }) },
  { label: 'Comparison illustration', ...spot('vsHero'), ...loose },
  { label: 'Our platform logo', kind: 'logo', frameless: true, inset: 'inset-0', art: 'ownWordmark' },
  { label: /^Customer logo \d+$/, route: '/vs', kind: 'logo', frameless: true, inset: 'inset-0', indexFrom: num, artPool: ['brand', 'monogram', 'brand', 'brand', 'brand', 'brand', 'brand'], seedBase: 100 },
  { label: / logo$/, route: '/vs', kind: 'logo', frameless: true, inset: 'inset-0', art: 'brand', props: { name: 'Warehouse F' }, seed: 2 },
  { label: 'Benchmark chart', kind: 'diagram', art: 'benchmark' },
  // /startups program benefit cards (4, 120x120 spot icons).
  { label: 'Benefit icon', ...scenePool(['bTermChart', 'bLinks', 'bServers', 'bBox'], { artPool: Array(4).fill('spot'), ...loose }) },
  { label: /^Portfolio logo \d+$/, ...logoByNumber(110) },
  { label: /^Persona image \d+$/, kind: 'illustration', art: 'house', indexFrom: (l) => num(l) - 1, propsPool: [{ variant: 'useCaseRight' }, { variant: 'useCaseLeft' }] },
  { label: 'Paper figure', ...scenePool(['paperYellow', 'paperBlue', 'paperTeal', 'paperBlue', 'paperTeal', 'paperBlue']) },
  { label: 'Topic icon', kind: 'logo', frameless: true, inset: 'inset-0', artPool: ['seal'], propsPool: [{ variant: 'audit' }, { variant: 'privacy' }] },
  { label: 'Project logo', ...scenePool(['projRing', 'projInfinity', 'projHex', 'projWindow'], { artPool: Array(4).fill('spot'), ...loose }) },
  // Social avatars: mostly profile photos, a few cartoon avatars (Pip junior on a tint).
  { label: 'Avatar', kind: 'avatar', srcPool: [...HEADSHOTS, null, ...PRESENTERS.slice(0, 4).map((x) => x.replace(/^\/assets\/photos\//, '')), null, 'customer-1.jpg', 'customer-2.jpg'].map((f) => (f ? (f.startsWith('/') ? f : P(f)) : null)),
    artPool: [...HEADSHOTS.map(() => null), 'house', null, null, null, null, 'house', null, null], propsPool: Array(14).fill({ variant: 'avatarPip' }), objectPosition: '50% 30%' },

  // Footer (all routes): two round compliance seals.
  { label: 'Compliance badge 1', kind: 'logo', frameless: true, inset: 'inset-0', art: 'seal', props: { variant: 'audit' } },
  { label: 'Compliance badge 2', kind: 'logo', frameless: true, inset: 'inset-0', art: 'seal', props: { variant: 'privacy' } },
]

const matches = (test, value) =>
  test == null ? true : typeof test === 'string' ? value === test : test.test(value)
const routeMatches = (test, path) =>
  test == null ? true : typeof test === 'string' ? path === test || path.startsWith(`${test}/`) : test.test(path)

export function resolveImage(label, pathname = '/') {
  return IMAGE_MAP.find((e) => matches(e.label, label || '') && routeMatches(e.route, pathname)) || null
}

// Listing slots draw sequentially from their pool so neighbours on one page differ.
// Counters reset whenever a slot mounts on a different route.
let countersPath = null
const counters = new Map()
export function nextInPool(key, pathname) {
  if (countersPath !== pathname) {
    countersPath = pathname
    counters.clear()
  }
  const n = counters.get(key) || 0
  counters.set(key, n + 1)
  return n
}
