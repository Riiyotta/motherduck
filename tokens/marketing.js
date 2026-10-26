// Page-group tokens for the marketing templates (PAGES_SPEC_MARKETING.md §2).
// Merged into theme.extend by tailwind.config.js; keys mirror theme.extend (colors, fontSize, boxShadow, borderRadius, ...).
//
// fontSize naming: `<role>` = >=1302 value; `-lg` = 960–1301, `-md` = 728–959, `-sm` = <728 where the
// spec gives a different value. Family / uppercase are applied separately (font-mono / font-fono / font-sans).
// Keys that already exist in another group with the SAME value (teal, coral-red, pill, faq-q, faq-a,
// button-lg, link-label) are not redefined. The spec's `code-*` palette is named `prism` here because
// `colors.code` is already taken by the company group with different values.

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
    'sand-chip': '#ECE5DD',
    'row-hover': '#EFE8E0',
    aqua: '#53DBC9',
    apricot: '#FFC18A',
    stone: '#E4DED7',
    'tag-blue': '#A5C4D8',
    'tag-violet': '#C8A9F2',
    'ht-blue': '#1276BF',
    'ht-glow-1': 'rgba(193,162,255,0.75)',
    'ht-glow-2': 'rgba(162,115,255,0.75)',
    field: 'rgba(248,248,247,0.7)',
    'field-valid': 'rgba(6,132,117,0.804)',
    prism: {
      bg: '#383838', text: '#CCCCCC', comment: '#999999', keyword: '#CC99CD',
      operator: '#67CDCC', string: '#7EC699', function: '#F8C555', number: '#F08D49',
    },
    // EcosystemDiagram tile pairs (bg / border)
    eco: {
      sources: '#EBF9FF', 'sources-bd': '#54B4DE',
      agents: '#E8F5E9', 'agents-bd': '#38C1B0',
      ingestion: '#F7F1FF', 'ingestion-bd': '#B291DE',
      bi: '#F9FBE7', 'bi-bd': '#B3C419',
      retl: '#FFFDE7', 'retl-bd': '#E1C427',
      transform: '#ECEFF1', 'transform-bd': '#84A6BC',
      dsai: '#EAF0FF', 'dsai-bd': '#7597EE',
      orch: '#FFEBE9', 'orch-bd': '#F38E84',
      dq: '#FDEDDA', 'dq-bd': '#F5B161',
    },
  },
  boxShadow: {
    // §2b
    'hard-8': '-8px 8px 0 0 #383838',
    'hard-12': '-12px 12px 0 0 #383838',
    'hard-16': '-16px 16px 0 0 #383838',
  },
  borderRadius: {
    // §2b
    frame: '20px',
    window: '24px',
    inner: '12px',
    code: '3px',
  },
  fontFamily: {
    museo: ['MuseoModerno', 'sans-serif'],
  },
  fontSize: {
    // §2c headings (Mono unless noted)
    'h1-mono-xl': t('56px', '67.2px'),
    'h1-mono-xl-md': t('36px', '43.2px'),
    'h1-mono-xl-sm': t('28px', '39.2px'),
    'h1-left-lg': t('48px', '57.6px'),
    'h1-left-sm': t('24px', '28.8px'),
    'h1-left-sm-tall': t('24px', '33.6px'),
    'h1-trust': t('56px', '67.2px', '0.02em'),
    'h1-trust-lg': t('48px', '57.6px', '0.02em'),
    'h1-trust-sm': t('24px', '33.6px', '0.02em'),
    'h1-mono': t('44px', '52.8px'),
    'h1-mono-md': t('36px', '43.2px'),
    'h1-mono-sm': t('28px', '33.6px'),
    'h1-vs': t('40px', '48px'),
    'h1-vs-sm': t('28px', '33.6px'),
    'h1-persona': t('44px', '52.8px', FONO), // Fono
    'h1-persona-md': t('40px', '48px', FONO),
    'h1-persona-sm': t('30px', '42px', FONO),
    'h1-persona-sm-alt': t('32px', '44.8px', FONO),
    'hero-tagline-mono': t('24px', '33.6px', '0.48px', '300'),
    'hero-tagline-mono-lg': t('18px', '25.2px', '0.36px', '300'),
    'research-tagline': t('24px', '30px', '0.48px', '300'),
    'research-tagline-lg': t('20px', '24px', '0.4px', '300'),
    'research-tagline-md': t('18px', '21.6px', '0.36px', '300'),
    'h2-mono-md': t('24px', '28.8px'),
    'h2-mono-tall-sm': t('24px', '33.6px'),
    'h2-mono-faq-md': t('32px', '44.8px'),
    'h2-mono-tall': t('32px', '44.8px'),
    'h2-mono-xs': t('18px', '25.2px'),
    'h2-mono-52': t('52px', '72.8px'),
    'h2-mono-36': t('36px', '50.4px'),
    'h2-mono-30': t('30px', '36px'),
    'tag-40': t('40px', '48px'),
    'tag-40-tall': t('40px', '56px'),
    'tag-18': t('18px', '21.6px'),
    'tag-16': t('16px', '19.2px'),
    marquee: t('40px', '48px'),
    'marquee-alt': t('32px', '44.8px'),
    'marquee-sm': t('24px', '33.6px'),
    'faq-q-lg': t('24px', '33.6px'),
    'faq-q-md': t('17px', '23.8px'),
    'faq-q-sm': t('16px', '22.4px'),
    'card-h3-mono': t('24px', '28.8px'),
    'card-h3-mono-md': t('18px', '21.6px'),
    'card-h3-mono-sm': t('20px', '24px'),
    'card-h3-mono-tall': t('24px', '33.6px'),
    'card-h3-mono-tall-md': t('20px', '28px'),
    'card-h3-mono-tall-sm': t('18px', '25.2px'),
    'persona-h2': t('40px', '56px'),
    'persona-h2-lg': t('32px', '44.8px'),
    'persona-h2-md': t('24px', '33.6px'),
    'paper-h3': t('20px', '25px'),
    'paper-h3-md': t('18px', '22.5px'),
    'resource-h3': t('20px', '28px'),
    // Inter roles
    'sub-head': t('24px', '33.6px', 'normal', '400'),
    'sub-head-sm': t('20px', '28px', 'normal', '400'),
    'quote-carousel': t('20px', '24px', 'normal', '400'),
    'quote-carousel-md': t('18px', '21.6px', 'normal', '400'),
    'quote-spot': t('24px', '31.2px', '0.48px', '300'),
    'quote-spot-lg': t('22px', '28.6px', '0.44px', '300'),
    'quote-spot-md': t('20px', '26px', '0.4px', '300'),
    'case-quote': t('22px', '30.8px', '0.44px', '400'),
    'case-quote-short': t('44px', '61.6px', '0.88px', '400'),
    'person-name-lg': t('24px', '28.8px', '0.48px', '600'),
    'person-name-lg-md': t('18px', '28.8px', '0.36px', '600'),
    'person-name': t('16px', '25.6px', '0.32px', '600'),
    'person-role': t('14px', '19.6px', '0.28px', '400'),
    'link-sm': t('14px', '19.2px', '0.32px', '400'),
    'button-tier': t('15px', '18px', 'normal', '400'),
    'chip-mono': t('12px', '12px'),
    'chip-mono-tall': t('12px', '16.8px'),
    price: t('64px', '76.8px'),
    'price-lg': t('46px', '55.2px'),
    'price-md': t('32px', '38.4px'),
    'tier-name': t('24px', '33.6px', '0.48px', '300'),
    'tier-name-lg': t('18px', '25.2px', '0.36px', '300'),
    'body-xl': t('20px', '32px', 'normal', '300'),
    'body-lg': t('18px', '28.8px', 'normal', '300'),
    'body-md': t('16px', '25.6px', 'normal', '300'),
    'body-sm': t('14px', '19.6px', '0.28px', '300'),
    'code-block': t('14px', '23.8px'),
    'code-inline': t('15px', '18.75px', '0.3px', '600'),
  },
}
