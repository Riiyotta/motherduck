// Spec §0 Layout system. max-width 100% / 728 / 960 / 1302 with padding 24 / 20 / 20 / 30
// (content widths 337@390, 688, 920, 1242). Backed by Tailwind's `container` (configured in
// tailwind.config.js), centred with auto margins.
//
// padX (optional) replaces the side padding for blocks that sit inside a wider/narrower gutter:
// - number: px at every width, applied inline so it beats any class (e.g. padX={40});
// - string: Tailwind padding classes appended last, for responsive values
//   (e.g. padX="md:px-[40px] xl:px-[220px]"); utilities sit after the `container` component layer, so they win.
export default function Container({ as: Tag = 'div', className = '', padX, style, children, ...rest }) {
  const num = typeof padX === 'number'
  return (
    <Tag
      className={`container ${className}${!num && padX ? ` ${padX}` : ''}`}
      style={num ? { paddingLeft: padX, paddingRight: padX, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
