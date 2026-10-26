// Page-group tokens for the content templates (PAGES_SPEC_CONTENT.md §3).
// Merged into theme.extend by tailwind.config.js; keys mirror theme.extend (colors, fontSize, boxShadow, borderRadius, ...).
//
// Only adds what the company / marketing groups have not defined (filter-bg, sand-chip, field, teal,
// coral-red, apricot, tag-violet, tag-blue, pill, code radius, faq-q/faq-a, toc-*, hero-tagline-mono,
// person-name-lg, compact-h1-* are reused from there).
// fontSize naming: `<role>` = XL (>=1302) value; `-lg` = 960–1301, `-md` = 728–959, `-sm` = <728 where the
// spec gives a different value. Family / uppercase are applied separately (font-mono / font-fono / font-sans).
// Colour groups are named so they never collide with an existing nested key (`eco`, `code` are taken).

const t = (size, lineHeight, letterSpacing, fontWeight) => {
  const o = { lineHeight }
  if (letterSpacing) o.letterSpacing = letterSpacing
  if (fontWeight) o.fontWeight = fontWeight
  return [size, o]
}
const FONO = '0.01em' // Space Grotesk compensation (CLONE_SPEC §0 Fonts)
const fono = (px) => `calc(${px} + 0.01em)` // measured Fono letter-spacing + compensation

export default {
  colors: {
    // §3a
    callout: '#FEEFAD',
    'inline-code-bg': 'rgba(56,56,56,0.08)',
    'quote-bar': 'rgba(56,56,56,0.1)',
    'rule-faint': 'rgba(56,56,56,0.15)',
    'coral-soft': '#FF9A94',
    'coral-tile': 'rgba(255,113,105,0.08)',
    overlay: 'rgba(56,56,56,0.4)',
    'select-bg': 'rgba(248,248,247,0.698)',
    // highlight.js github-dark-dimmed
    'code-dim': {
      bg: '#22272E', text: '#ADBAC7', keyword: '#F47067', title: '#DCBDFB', attr: '#59ACFF',
      string: '#96D0FF', builtin: '#F69D50', comment: '#768390', name: '#8DDB8C', section: '#316DCA',
      bullet: '#EAC55F', link: '#6CB6FF', add: '#B4F1B4', 'add-bg': '#1B4721', del: '#FFD8D3', 'del-bg': '#78191B',
    },
    // Ecosystem category tags (Ingestion = tag-violet, Transformation = tag-blue; regions = chip-gray)
    ecotag: {
      orchestration: '#F38E84', agents: '#38C1B0', bi: '#E5F174', dq: '#F5B161',
      devtools: '#F2A6C8', dsai: '#96B3FE', retl: '#F4DC5A', apps: '#A6EC85',
    },
    'dive-hover': 'rgba(255,255,255,0.18)',
  },
  boxShadow: {
    // §3c dive gallery only
    'dive-pill': '0 2px 12px rgba(0,0,0,0.15)',
    'dive-menu': '0 4px 16px rgba(0,0,0,0.1)',
  },
  // §3d (keyframes live in src/styles/content.css)
  animation: {
    'menu-drop': 'menu-drop 0.2s ease-out forwards',
    'feed-spin': 'feed-spin 1s linear infinite',
    'fab-pop': 'fab-pop 0.15s ease-out forwards',
    'sidebar-in': 'sidebar-in 250ms ease-out forwards',
    'modal-in': 'modal-in 200ms ease-out forwards',
    'sheet-in': 'sheet-in 200ms ease-out forwards',
    'caret-blink': 'caret-blink 1.1s ease-in-out infinite',
  },
  fontSize: {
    // §3b feed heroes (Mono)
    'feed-h1': t('80px', '96px'),
    'feed-h1-md': t('56px', '67.2px'),
    'feed-h1-sm': t('30px', '42px'),
    'feed-h1-sm-alt': t('32px', '44.8px'), // learn, news
    'news-h1-lg': t('64px', '76.8px'),
    'news-h1-md': t('54px', '64.8px'),
    'quack-h1-lg': t('72px', '86.4px'),
    'eco-h1': t('56px', '67.2px', '1.12px'),
    'eco-h1-lg': t('48px', '57.6px', '0.96px'),
    'eco-h1-sm': t('24px', '33.6px', '0.48px'),
    'hero-tagline-mono-sm': t('16px', '22.4px', '0.32px', '300'),
    'events-h1': t('52px', '62.4px', '1.04px'),
    'events-h1-lg': t('40px', '48px', '0.8px'),
    'events-h1-sm': t('28px', '39.2px', '0.56px'),
    'events-lede': t('22px', '30.8px', '0.44px', '300'),
    'events-lede-sm': t('18px', '25.2px', '0.36px', '300'),
    'video-h1': t('56px', '67.2px'),
    'video-h1-lg': t('52px', '62.4px'),
    'video-h1-md': t('42px', '58.8px'),
    'video-h1-sm': t('24px', '33.6px'),
    'section-h2-mono': t('32px', '38.4px'),
    'section-h2-mono-md': t('24px', '33.6px'),
    'section-h2-mono-sm': t('18px', '25.2px'),
    'section-h2-mono-tall': t('32px', '44.8px'), // case index (XL)
    // Fono article titles
    'article-h1': t('44px', '52.8px', FONO),
    'article-h1-md': t('36px', '46.8px', FONO),
    'article-h1-md-case': t('36px', '50.4px', FONO),
    'article-h1-sm': t('28px', '39.2px', FONO),
    'video-detail-h1': t('38px', '45.6px', FONO),
    'video-detail-h1-lg': t('32px', '38.4px', FONO),
    'video-detail-h1-sm': t('24px', '33.6px', FONO),
    'partner-h1': t('56px', '67.2px'),
    'partner-h1-lg': t('32px', '38.4px'),
    'partner-h1-sm': t('32px', '44.8px'),
    // cards
    'card-title-mono': t('20px', '28px'),
    'card-title-mono-md': t('18px', '25.2px'),
    'featured-title': t('25px', '35px'),
    'featured-title-lg': t('19px', '26.6px'),
    'featured-title-md': t('17px', '23.8px'),
    'featured-title-sm': t('18px', '25.2px'),
    'card-date': t('16px', '25.6px', '0.32px', '300'),
    'card-date-md': t('14px', '19.6px', '0.28px', '300'),
    'card-excerpt': t('16px', '25.6px', '0.32px', '300'),
    'card-excerpt-md': t('14px', '19.6px', '0.28px', '300'),
    'subscribe-title': t('24px', '33.6px', '0.48px'),
    'subscribe-title-md': t('18px', '25.2px', '0.36px'),
    // filter panel
    'filter-title': t('18px', '28.8px', '0.36px', '400'),
    'filter-title-lg': t('16px', '25.6px', '0.32px', '400'),
    'select-label': t('16px', '22.4px', '0.32px', '300'),
    'select-option': t('16px', '16px', 'normal', '300'),
    // TOC / read next
    'toc-title-fono': t('18px', '21.6px', fono('0.36px')),
    'toc-title-fono-lg': t('16px', '22.4px', fono('0.32px')),
    'toc-link-blog': t('16px', '22.4px', 'normal', '300'),
    'rec-chip': t('14px', '19.6px'),
    'rec-chip-lg': t('13px', '18.2px'),
    'rec-chip-md': t('12px', '16.8px'),
    'rec-title': t('18px', '23.4px', fono('0.36px'), '300'),
    'rec-title-lg': t('16px', '22.4px', fono('0.32px'), '300'),
    'rec-title-md': t('14px', '19.6px', fono('0.28px'), '300'),
    // case studies
    'case-quote-xl': t('24px', '31.2px', '0.48px', '600'),
    'case-quote-xl-lg': t('22px', '28.6px', '0.44px', '600'),
    'case-quote-xl-md': t('20px', '26px', '0.4px', '600'),
    'person-name-lg-sm': t('14px', '19.6px', '0.28px', '600'),
    'person-role-lg': t('16px', '25.6px', '0.32px', '300'),
    'person-role-lg-lg': t('14px', '19.6px', '0.28px', '300'),
    'person-role-lg-sm': t('14px', '16.8px', '0.28px', '300'),
    'case-card-h3': t('24px', '28.8px', 'normal', '600'),
    'case-card-h3-sm': t('20px', '24px', 'normal', '600'),
    'case-card-li': t('16px', '22.4px', 'normal', '400'),
    'case-card-li-lg': t('14px', '19.6px', 'normal', '400'),
    'case-band-quote': t('22px', '30.8px', '0.44px', '400'),
    'case-band-quote-md': t('18px', '28.8px', '0.36px', '400'),
    'case-band-quote-sm': t('16px', '25.6px', '0.32px', '400'),
    'case-lede': t('20px', '32px', '0.4px', '300'),
    'case-lede-lg': t('16px', '25.6px', '0.32px', '300'),
    'profile-name': t('24px', '38.4px', '0.48px', '600'),
    'profile-name-sm': t('20px', '32px', '0.4px', '600'),
    'profile-role': t('16px', '25.6px', 'normal', '300'),
    'profile-role-lg': t('14px', '22.4px', 'normal', '300'),
    // videos
    'video-feat-title': t('24px', '32.4px'),
    'video-feat-title-lg': t('24px', '31.2px'),
    'video-feat-title-md': t('24px', '33.6px'),
    'video-feat-title-sm': t('18px', '25.2px'),
    duration: t('18px', '25.2px', '0.36px', '300'),
    'duration-sm': t('16px', '22.4px', '0.32px', '300'),
    'video-tag': t('12px', '16.8px', '0.24px', '300'),
    'video-tag-sm': t('10px', '14px', '0.2px', '300'),
    'kicker-chip': t('12px', '16.8px'),
    'video-tag-link': t('12px', '16.8px', FONO),
    'faq-a-md': t('15px', '22.5px', '0.3px', '300'),
    'faq-a-sm': t('14px', '21px', '0.28px', '300'),
    'related-h2': t('40px', '48px'),
    'related-h2-md': t('40px', '56px'),
    'related-h2-sm': t('24px', '33.6px'),
    // ecosystem
    'partner-name': t('24px', '28.8px'),
    'partner-name-md': t('24px', '38.4px'),
    'partner-name-sm': t('20px', '32px'),
    'eco-tag': t('12px', '16.8px', '0.24px', '300'),
    // events
    'event-month': t('24px', '28.8px'),
    'event-month-md': t('24px', '33.6px'),
    'event-day': t('56px', '67.2px'),
    'event-day-md': t('24px', '33.6px'),
    'event-year': t('16px', '16px', 'normal', '500'),
    'event-year-md': t('14px', '14px', 'normal', '500'),
    'event-title': t('22px', '30.8px', 'normal', '600'),
    'event-title-lg': t('18px', '25.2px', 'normal', '600'),
    'event-loc': t('14px', '19.6px', 'normal', '500'),
    'event-loc-lg': t('13px', '18.2px', 'normal', '500'),
    'event-tag': t('12px', '12px', 'normal', '600'),
    // news / learn
    'news-digest-h2': t('32px', '41.6px'),
    'news-digest-h2-md': t('28px', '36.4px'),
    'news-digest-h2-sm': t('22px', '28.6px'),
    'news-item': t('18px', '25.2px', 'normal', '500'),
    'news-item-md': t('16px', '22.4px', 'normal', '500'),
    'learn-title': t('24px', '33.6px'),
    'learn-title-md': t('18px', '25.2px'),
    // dive gallery (D1)
    'dive-h1': t('40px', '48px', 'normal', '700'),
    'dive-h1-sm': t('28px', '33.6px', 'normal', '700'),
    'dive-lede': t('15px', '24px', '0.3px', '300'),
    'dive-card-title': t('22px', '30.8px', 'normal', '600'),
    'dive-card-title-sm': t('18px', '25.2px', 'normal', '600'),
  },
}
