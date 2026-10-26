// Generic isometric slab (ASSET_MANIFEST "Isometric slabs", viewBox 0 0 278 149):
// top face gray-500 (#818181), side faces #575757, 2px #383838 outline. Original simplified geometry.
// Labels are white Fono, skewed onto the left / right side faces (transforms measured, spec §5),
// anchored at the centre seam so words of any length read outward from the separator.
const SIDE = '#575757'
const LEFT_T = 'rotate(20.7deg) skewX(18.15deg) scaleY(0.95)'
const RIGHT_T = 'rotate(-20.7deg) skewX(-23.24deg) scaleY(0.92)'
// Anchor points in viewBox units (seam-side end of each word, and the separator centre).
const VB_W = 278
const VB_H = 149
const pct = (x, y) => ({ left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%` })

function Word({ text, side, size }) {
  const left = side === 'left'
  return (
    <span className="absolute h-0 w-0" style={{ ...pct(left ? 127 : 151, 127), transform: left ? LEFT_T : RIGHT_T, transformOrigin: '0 0' }}>
      <span
        className={`absolute top-0 -translate-y-1/2 whitespace-nowrap font-fono uppercase leading-[1.2] text-white ${left ? 'right-0' : 'left-0'}`}
        style={{ fontSize: size, letterSpacing: '0.01em' }}
      >
        {text}
      </span>
    </span>
  )
}

export default function Slab({ left, top, width, height, a, b, sep, size, sizeB }) {
  return (
    <div className="absolute" style={{ left, top, width, height }} aria-hidden="true">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <g className="stroke-ink" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
          <path d="M2 55 139 108v39L2 94z" fill={SIDE} vectorEffect="non-scaling-stroke" />
          <path d="M139 108 276 55v39l-137 53z" fill={SIDE} vectorEffect="non-scaling-stroke" />
          <path d="M139 2 276 55 139 108 2 55z" className="fill-gray-500" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <Word text={a} side="left" size={size} />
      {sep && (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 font-fono leading-[1.2] text-white"
          style={{ ...pct(139, 127.5), fontSize: size }}
        >
          {sep}
        </span>
      )}
      <Word text={b} side="right" size={sizeB || size} />
    </div>
  )
}

// 2px #383838 curved connector inside a measured bounding box (spec §5 "Connector lines").
// Generic S-curve corner to corner; `flip` mirrors it like the original's scaleY(-1)/rotate(180).
export function Connector({ left, top, width, height, transform }) {
  const vertical = height > width
  const d = vertical ? 'M1 0C1 45 99 55 99 100' : 'M0 1C45 1 55 99 100 99'
  return (
    <div className="absolute" style={{ left, top, width, height, transform }} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <path d={d} className="stroke-ink" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
