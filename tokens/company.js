// Page-group tokens for the company templates (PAGES_SPEC_COMPANY.md §2).
// Merged into theme.extend by tailwind.config.js; keys mirror theme.extend (colors, fontSize, boxShadow, borderRadius, ...).
//
// fontSize naming: `<role>` = XL value; `-lg` / `-md` / `-sm` = 960–1301 / 728–959 / <728 overrides
// where the spec gives one. Family and uppercase are applied separately (font-mono / font-fono / font-sans).
// The spec's `page-h1-sm` role is named `compact-h1-*` here (the `-sm` suffix is reserved for the SM range).

const t = (size, lineHeight, letterSpacing, fontWeight) => {
  const o = { lineHeight }
  if (letterSpacing) o.letterSpacing = letterSpacing
  if (fontWeight) o.fontWeight = fontWeight
  return [size, o]
}
const FONO = '0.01em' // Space Grotesk compensation (CLONE_SPEC §0 Fonts)

export default {
  colors: {
    // §2a
    teal: '#50C7B7',
    'teal-bright': '#53DBC9',
    'coral-red': '#FF7169',
    'filter-bg': '#EBE4DD',
    'lp-orange': '#E87D2F',
    'bar-gray': '#A8A29E',
    'muted-card': '#F8F6F3',
    'step-label': '#888888',
    error: '#E23F35',
    valid: 'rgba(6,132,117,0.804)',
    survey: { paper: '#FFFAF0', ink: '#16120C', track: '#ECE3CB', teal: '#32C7BD', orange: '#E8892F' },
    pg: {
      panel: '#0E0F0D', card: '#16170F', 'card-hi': '#15201C', 'card-bd': '#2A2B24', head: '#141312',
      body: '#56544C', 'body-light': '#A6A89E', rule: '#E6E3DB', 'quote-rule': '#EDEAE1', eyebrow: '#0F9C8A',
      'num-mute': '#C9C4B6', sub: '#6B6B6B', yellow: '#FFDE02',
      // §4 G17c callout, measured on the live page (pixel audit): bg, 1px border, eyebrow, body text
      'callout-bg': '#EFFAF7', 'callout-bd': '#CDEBE5', 'callout-eyebrow': '#0E8C7C', 'callout-body': '#3F5C57',
      quote: '#1B1C18', connector: '#8A8C82',
    },
    code: {
      bg: '#1E1E1E', keyword: '#569CD6', string: '#CE9178', comment: '#6A9955', number: '#B5CEA8', text: '#D4D4D4',
      red: '#FF5F57', yellow: '#FEBC2E', green: '#28C840',
    },
  },
  boxShadow: {
    // §2b
    'hard-10': '-10px 10px 0 0 #383838',
    'hard-14': '-14px 14px 0 0 #383838',
    'hard-20': '-20px 20px 0 0 #383838',
    'hard-r16': '16px 16px 0 0 #383838',
    'hard-6-black': '-6px 6px 0 0 #000000',
    'hard-6-survey': '-6px 6px 0 0 #16120C',
  },
  borderRadius: {
    // §2c
    pill: '999px',
    lg: '10px',
    xl: '12px',
    '2xl': '20px',
  },
  fontSize: {
    // §2d type roles
    'page-h1': t('80px', '96px'),
    'page-h1-md': t('56px', '67.2px'),
    'page-h1-sm': t('30px', '42px'),
    'careers-h1-sm': t('32px', '44.8px'),
    'about-h1': t('80px', '96px', '1.6px'),
    'about-h1-md': t('56px', '67.2px', '1.12px'),
    'about-h1-sm': t('30px', '42px', '0.6px'),
    // spec `page-h1-sm` (contact / support / product expert / support policy / book brief)
    'compact-h1': t('56px', '67.2px'),
    'compact-h1-48': t('48px', '67.2px'),
    'compact-h1-48t': t('48px', '57.6px'),
    'compact-h1-40': t('40px', '56px'),
    'compact-h1-32': t('32px', '44.8px'),
    'compact-h1-24': t('24px', '33.6px'),
    'page-sub': t('32px', '44.8px', '0.64px'),
    'page-sub-md': t('24px', '33.6px', '0.48px'),
    'page-sub-sm': t('18px', '25.2px', '0.36px'),
    'page-h2': t('32px', '44.8px'),
    'page-h2-sm': t('24px', '33.6px'),
    'page-h2-xs': t('18px', '25.2px'),
    'careers-h2': t('40px', '48px'),
    'careers-h2-md': t('32px', '44.8px'),
    'careers-h2-sm': t('24px', '33.6px'),
    'feature-h3': t('32px', '38.4px', '0.64px', '600'),
    'feature-h3-md': t('24px', '28.8px', '0.48px', '600'),
    'lp-h1': t('52px', '59.8px', FONO),
    'lp-h1-lg': t('44px', '50.6px', FONO),
    'lp-h1-md': t('32px', '36.8px', FONO),
    'lp-sub': t('22px', '26.4px', FONO),
    'lp-sub-md': t('18px', '25.2px', FONO),
    'lp-h2': t('40px', '52px'),
    'lp-h2-md': t('32px', '41.6px'),
    'lp-h2-sm': t('24px', '31.2px'),
    'lp-form-h2': t('36px', '43.2px'),
    'lp-eyebrow': t('12px', '12px', '0.6px'),
    'lp-tab': t('11px', '18.7px', '1.1px', '600'),
    'lp-card-h3': t('18px', '23.4px'),
    'lp-step-h3': t('17px', '22.1px'),
    'lp-finding-h3': t('19px', '24.7px'),
    'lp-card-h3-lg': t('32px', '41.6px'),
    'lp-stat': t('28px', '36.4px'),
    'lp-body': t('15px', '25.5px', '0.3px', '300'),
    'lp-step-body': t('14px', '22.4px', '0.28px', '300'),
    'faq-q': t('23px', '32.2px'),
    'faq-a': t('18px', '28.8px', '0.36px', '300'),
    'legal-lead': t('20px', '32px', 'normal', '300'),
    'legal-lead-md': t('15px', '24px', '0.3px', '300'),
    'legal-body': t('16px', '25.6px', '0.32px', '300'),
    'toc-title': t('18px', '25.2px', '0.36px'),
    'toc-link': t('16px', '25.6px', 'normal', '300'),
    'toc-link-sm': t('14px', '19.6px', 'normal', '300'),
    ticker: t('18px', '18px'),
    'ticker-sm': t('14px', '14px'),
    'ticker-lg': t('24px', '24px'),
    'ticker-lg-sm': t('16px', '16px'),
    // P1 / P2 / P3 / P4 primitives
    'link-label': t('16px', '19.2px', '0.32px', '400'),
    'link-muted': t('14px', '16.8px', '0.28px', '400'),
    'button-lg': t('16px', '19.2px', 'normal', '400'),
    input: t('16px', '25.6px', '0.32px', '400'),
    'input-ph': t('16px', '22.4px', 'normal', '300'),
    'input-float': t('12px', '16.8px', 'normal', '400'),
    'input-error': t('12px', '19.2px', 'normal', '300'),
    'check-label': t('16px', '25.6px', 'normal', '400'),
    'check-label-sm': t('14px', '22.4px', 'normal', '400'),
  },
}
