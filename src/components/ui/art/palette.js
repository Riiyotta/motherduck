// Site token palette (tailwind.config.js) plus the extra house-style hues named in IMAGE_BRIEFS.md.
export const C = {
  cream: '#F4EFEA', ink: '#383838', sky: '#97D4FF', skyTint: '#CEEBFF', pink: '#FEB9E2',
  yellow: '#F9EE3E', sun: '#FFDE00', orange: '#FF9538', peach: '#FFDCBD', mint: '#B0FFF4',
  coral: '#FFCBC8', teal: '#16AA98', white: '#FFFFFF',
  // house style (briefs)
  blue: '#6FC2FF', aqua: '#53DBC9', red: '#FF7169', gold: '#FFE14D',
  // UI greys
  line: '#D7D7D7', mute: '#A1A1A1', soft: '#ECE6DF', grey: '#818181',
}
export const svgProps = (slice = true) => ({
  width: '100%',
  height: '100%',
  preserveAspectRatio: slice ? 'xMidYMid slice' : 'xMidYMid meet',
  'aria-hidden': true,
  focusable: 'false',
  style: { display: 'block' },
})
export const pick = (arr, seed, k = 0) => arr[Math.abs(seed + k * 7) % arr.length]
