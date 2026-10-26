import Slab, { Connector } from './Slab.jsx'
import { InterfacesCard, LinkCard, ScaleCard, StorageCard, ToolsCard } from './DiagramCards.jsx'

// Isometric platform diagram (spec §5). Three separate layouts, each absolutely positioned inside
// a relative box: >=1302 1240x634, 728-1301 688x575 (centred), <728 327x1302 (margin 0 5).
// Slab / connector / card coordinates are the original's measured inline positions (px, top-left).

const CARDS = {
  visuals: { title: 'Visuals', desc: 'Agent-built charts and embeddable reporting views', href: '/product/dives/' },
  pipelines: { title: 'Pipelines', desc: 'Managed runtime for loads, enrichment and more', tint: 'peach', href: '/product/flights/' },
  // Original context card targets /docs -> non-link
  context: { title: 'Context', desc: 'Shared knowledge for more accurate agent queries', href: '/docs/key-tasks/guides/' },
}

// Slab label pairs (original-neutral wording). AGENT CONTEXT renders smaller (16 / 10.9 / 9.3).
const SLABS = [
  { a: 'Shared', b: 'Storage' },
  { a: 'Compute', b: 'Workers', sep: '-' },
  { a: 'Rules', b: 'Agent context', sep: '-', small: true },
  { a: 'Tools', b: 'Languages', sep: '&' },
  { a: 'Agent', b: 'Interfaces' },
]

const LAYOUTS = {
  desktop: {
    box: 'hidden xl:block h-[634px] max-w-[1240px] mx-auto',
    slab: { w: 275.586, h: 146.829, size: 18, small: 16 },
    slabs: [
      [481.72, 389.3],
      [481.72, 282.47],
      [481.72, 175.64],
      [339.88, 88.81],
      [624.54, 88.81],
    ],
    connectors: [
      [237.88, 273.53, 244.513, 91.791],
      [238.82, 177.5, 244.208, 78.657],
      [272.63, 106.99, 70.916, 54.457],
      [895.25, 100.2, 101.455, 58.776, 'scaleY(-1)'],
      [754.78, 211.1, 187.513, 47.219, 'scaleY(-1)'],
      [737.11, 356.55, 187.184, 94.589, 'scaleY(-1)'],
      [396.57, 464.53, 88.153, 11.76, 'rotate(180deg)'],
    ],
    tools: [0, -0.19],
    interfaces: [928, 6.81],
    visuals: [0, 120],
    pipelines: [0, 239],
    context: [937, 154.39],
    storage: [154.46, 358],
    scale: [900, 284.73],
  },
  compact: {
    box: 'hidden md:block xl:hidden h-[575px] max-w-[688px] mx-auto',
    slab: { w: 186.01, h: 99.104, size: 12.2, small: 10.9 },
    slabs: [
      [250.672, 403.898],
      [250.672, 311.793],
      [250.672, 219.688],
      [154.93, 121.082],
      [347.062, 121.082],
    ],
    connectors: [
      [530.164, 97.977, 31.149, 76.325],
      [433.977, 260.104, 66.913, 101.729],
      [144.484, 97.793, 16.203, 76.77],
      [189, 268.829, 64.812, 20.952],
      [230.711, 453.491, 24.944, 81.254],
      [430.211, 365.354, 28.514, 62.245],
    ],
    tools: [0, -0.28],
    interfaces: [426, -0.09],
    visuals: [0, 209.15],
    pipelines: [498, 209.15],
    storage: [0, 331.45],
    scale: [457, 331.45],
  },
  mobile: {
    box: 'md:hidden h-[1302px] max-w-[327px] mx-[5px]',
    slab: { w: 160.851, h: 85.7, size: 10.5, small: 9.3 },
    slabs: [
      [82.797, 711.056],
      [82.797, 631.408],
      [82.797, 551.761],
      [0, 466.491],
      [166.148, 466.491],
    ],
    connectors: [
      [243.208, 680.331, 51.717, 383.446],
      [42.763, 751.721, 43.693, 61.558],
      [29.356, 89.913, 16.204, 391.763],
      [71.699, 332.17, 12.749, 264.199, 'scaleY(-1)'],
      [241.681, 451.92, 49.701, 224.166, 'scaleY(-1)'],
      [208.62, 206.59, 56.248, 276.377, 'rotate(180deg)'],
    ],
    tools: [0, -0.28, 327],
    interfaces: [65, 107.72],
    visuals: [0, 217.72],
    pipelines: [137, 341.72],
    storage: [0, 806.76],
    scale: [96, 1058.76],
  },
}

const pos = ([left, top, width]) => ({ left, top, ...(width && { width }) })

function Layout({ variant }) {
  const L = LAYOUTS[variant]
  return (
    <div className={`relative ${L.box}`}>
      {L.connectors.map(([left, top, width, height, transform], i) => (
        <Connector key={i} left={left} top={top} width={width} height={height} transform={transform} />
      ))}
      {L.slabs.map(([left, top], i) => {
        const s = SLABS[i]
        return (
          <Slab
            key={i}
            left={left}
            top={top}
            width={L.slab.w}
            height={L.slab.h}
            a={s.a}
            b={s.b}
            sep={s.sep}
            size={`${L.slab.size}px`}
            sizeB={s.small ? `${L.slab.small}px` : undefined}
          />
        )
      })}
      <ToolsCard variant={variant} style={pos(L.tools)} />
      <InterfacesCard variant={variant} style={pos(L.interfaces)} />
      <LinkCard variant={variant} {...CARDS.visuals} style={pos(L.visuals)} />
      <LinkCard variant={variant} {...CARDS.pipelines} style={pos(L.pipelines)} />
      {L.context && <LinkCard variant={variant} {...CARDS.context} style={pos(L.context)} />}
      <StorageCard variant={variant} style={pos(L.storage)} />
      <ScaleCard variant={variant} style={pos(L.scale)} />
    </div>
  )
}

export default function PlatformDiagram() {
  return (
    <div className="mt-[56px]">
      <Layout variant="desktop" />
      <Layout variant="compact" />
      <Layout variant="mobile" />
    </div>
  )
}
