/** @type {import('tailwindcss').Config} */
// All values from CLONE_SPEC.md §0. Breakpoints are min-width and mobile-first:
//   base = <728, md = 728–959, lg = 960–1301, xl = >=1302 (sm = 500 is Swiper-only).
// Fono-role font sizes include the +0.01em Space Grotesk compensation (spec §0 Fonts).

// [size, lineHeight, letterSpacing?, fontWeight?]
const t = (size, lineHeight, letterSpacing, fontWeight) => {
  const o = { lineHeight }
  if (letterSpacing) o.letterSpacing = letterSpacing
  if (fontWeight) o.fontWeight = fontWeight
  return [size, o]
}
const FONO = '0.01em' // Space Grotesk compensation on top of a measured "normal"

import company from './tokens/company.js'
import marketing from './tokens/marketing.js'
import content from './tokens/content.js'

// Shallow-merges each page group's token file into theme.extend, one level deep per key.
const withGroups = (extend) => {
  for (const group of [company, marketing, content]) {
    for (const [key, values] of Object.entries(group)) {
      extend[key] = { ...(extend[key] || {}), ...values }
    }
  }
  return extend
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Replaces Tailwind's defaults: these are the original's only layout breakpoints.
    screens: {
      sm: '500px',
      md: '728px',
      lg: '960px',
      xl: '1302px',
    },
    container: {
      center: true,
      padding: { DEFAULT: '24px', md: '20px', xl: '30px' },
      // max-width per range: 100% (<728), 728, 960, 1302 (sm/500 intentionally excluded)
      screens: { md: '728px', lg: '960px', xl: '1302px' },
    },
    extend: withGroups({
      colors: {
        cream: '#F4EFEA',
        ink: '#383838',
        sky: '#97D4FF',
        'sky-hover': '#6FC2FF',
        'sky-dark': '#2BA5FF',
        'sky-tint': '#CEEBFF',
        pink: '#FEB9E2',
        yellow: '#F9EE3E',
        sun: '#FFDE00',
        'yellow-chip': '#FAF175',
        'yellow-chip-border': '#EBCD00',
        orange: '#FF9538',
        peach: '#FFDCBD',
        mint: '#B0FFF4',
        coral: '#FFCBC8',
        garden: '#16AA98',
        'garden-dark': '#068475',
        // Merged into Tailwind's gray scale so gray-400/500/600 resolve to spec values.
        gray: { 400: '#A1A1A1', 500: '#818181', 600: '#666666' },
        hairline: '#D7D7D7',
        'surface-0': '#FFFFFF',
        'surface-1': '#FCFCFB',
        'surface-2': '#F8F8F7',
        'surface-3': '#F0F0EF',
        sand: '#ECE6DF',
        'sand-dark': '#E1D6CB',
        'chip-gray': '#E8E8E8',
        clay: '#D97757',
        'clay-hover': '#DD8568',
        term: {
          bg: '#16161E', line: '#2E2E38', rule: '#34343E', text: '#E8E6EC', dim: '#8B8A96',
          prompt: '#6E6D7A', token: '#A5A0E8', hot: '#E8837A', amber: '#DFA348', caret: '#C9C4EE',
        },
      },
      fontFamily: {
        // Free substitutes only (spec §0 Fonts). Licensed families are intentionally not referenced.
        fono: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Fragment Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Original's code font resolves to ui-monospace (SF Mono on macOS); it never loads Source Code Pro.
        code: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        jet: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // Type scale (spec §0). Suffixes: -lg (960–1301 value), -md (728–959), -sm (<728 / below 1302
      // where the spec gives one value for every smaller range). Family/case are applied separately.
      fontSize: {
        // Fono display roles (ls includes +0.01em)
        h1: t('44px', '48px', FONO),
        'h1-md': t('40px', '43.6px', FONO),
        'h1-sm': t('28px', '30.52px', FONO),
        h2: t('40px', '48px', FONO),
        'h2-lg': t('32px', '38.4px', FONO),
        'h2-sm': t('28px', '33.6px', FONO),
        'h2-agent': t('40px', '48px', '0.03em'),
        'h2-agent-lg': t('36px', '43.2px', '0.03em'),
        'h2-agent-sm': t('28px', '33.6px', '0.03em'),
        'h2-blog': t('40px', '48px', FONO),
        'h2-blog-lg': t('36px', '43.2px', FONO),
        'h2-blog-md': t('30px', '36px', FONO),
        'card-h3': t('32px', '38.4px', FONO),
        'card-h3-sm': t('24px', '28.8px', FONO),
        stat: t('56px', '67.2px', '0.03em'),
        'stat-lg': t('48px', '57.6px', '0.03em'),
        'stat-sm': t('40px', '48px', '0.03em'),
        'blog-h3': t('18px', '22.5px', FONO),
        'blog-h3-sm': t('16px', '20px', FONO),
        'slab-label': t('18px', '21.6px', FONO),
        'slab-label-sm': t('16px', '19.2px', FONO),
        eyebrow: t('12.5px', '15px', FONO),
        'eyebrow-sm': t('12.5px', '17.5px', FONO),

        // Mono roles (Fragment Mono, no compensation)
        'h2-mono': t('40px', '48px'),
        'h2-mono-lg': t('32px', '38.4px'),
        'h2-mono-sm': t('28px', '33.6px'),
        label: t('12px', '16px'),
        'accordion-title': t('18px', '21.6px'),
        'accordion-title-sm': t('16px', '19.2px'),
        'diagram-title': t('14px', '16px', '0.28px', '400'),
        'quote-mark': t('48px', '48px'),
        'quote-mark-sm': t('56px', '56px'),
        'bar-title': t('20px', '24px'),
        'bar-title-sm': t('14px', '16.8px'),
        'agent-h3': t('18px', '21.6px', '0.36px', '400'),
        chip: t('12px', '12px'),

        // Inter roles
        'lede-hero': t('18px', '28.8px', '0.36px', '300'),
        'lede-hero-sm': t('16px', '25.6px', '0.32px', '300'),
        lede: t('20px', '32px', '0.4px', '300'),
        'lede-sm': t('16px', '25.6px', '0.32px', '300'),
        sub: t('16px', '22.4px', '0.32px', '400'),
        'sub-blog': t('16px', '22.4px', 'normal', '400'),
        'sub-blog-sm': t('15px', '21px', 'normal', '400'),
        nav: t('14px', '19.2px', '0.32px', '400'),
        'nav-mobile': t('16px', '19.2px', '0.32px', '400'),
        button: t('14px', '16.8px', 'normal', '400'),
        'accordion-body': t('16px', '25.6px', '0.32px', '300'),
        'card-body': t('16px', '22.4px', '0.32px', '300'),
        'diagram-body': t('12px', '16.8px', '0.24px', '300'),
        pill: t('12px', '12px', 'normal', '400'),
        quote: t('20px', '32px', 'normal', '300'),
        'quote-sm': t('18px', '28.8px', 'normal', '300'),
        caption: t('14px', '19.6px', '0.28px'), // quote name (700) / role (300): set weight
        'customer-quote': t('20px', '32px', '0.4px', '400'),
        'customer-quote-sm': t('18px', '28.8px', '0.36px', '400'),
        'agent-link': t('14px', '11.2px', 'normal', '400'),
        meta: t('12px', '16px', 'normal', '300'),
        tooltip: t('12px', '16px', 'normal', '400'),
        'footer-heading': t('16px', '25.6px', '0.32px', '700'),
        'footer-heading-sm': t('14px', '22.4px', '0.28px', '700'),
        'footer-link': t('16px', '20.8px', 'normal', '300'),
        'footer-link-sm': t('14px', '18.2px', 'normal', '300'),
        legal: t('14px', '19.6px', '0.28px', '300'),
      },
      borderRadius: { DEFAULT: '2px', sm: '2px', tip: '4px', md: '8px', tile: '14px', bubble: '16px' },
      boxShadow: {
        'hard-4': '-4px 4px 0 0 #383838',
        'hard-6': '-6px 6px 0 0 #383838',
        'chat-input': '0 4px 20px 0 rgba(0,0,0,0.08)',
        dropdown: '0 4px 8px 0 rgba(0,0,0,0.10)',
      },
      maxWidth: { container: '1302px', 'container-lg': '960px', 'container-md': '728px', lede: '1020px' },
      // Original uses the CSS keywords (ease-in-out = cubic-bezier(.42,0,.58,1)), not Tailwind's
      // default curves (cubic-bezier(.4,0,.2,1)), so map the utilities to the keywords.
      transitionTimingFunction: { DEFAULT: 'ease-in-out', 'in-out': 'ease-in-out', in: 'ease-in', out: 'ease-out' },
      transitionDuration: {
        30: '30ms', 60: '60ms', 120: '120ms', 125: '125ms', 150: '150ms',
        200: '200ms', 250: '250ms', 300: '300ms',
      },
      // Keyframes live in src/index.css (single source); these utilities reference them by name.
      animation: {
        'spin-slow': 'spin-slow 54s linear infinite',
        glow: 'glow 4s ease-in-out infinite alternate',
        blink: 'blink 1s step-end infinite',
        'dropdown-in': 'dropdown-in 0.2s ease-out forwards',
        // per-path: set --wire-dur, --from, --to inline (spec §4 wire table)
        'wire-flow': 'wire-flow var(--wire-dur) linear infinite',
      },
    }),
  },
  plugins: [],
}
