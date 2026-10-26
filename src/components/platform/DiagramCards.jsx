import { ArrowRight, Placeholder } from '../ui'
import Glyph from '../integrations/Glyph.jsx'
import Tooltip from '../integrations/Tooltip.jsx'
import { SiteLink } from '../../lib/links.js'

// Platform diagram cards (spec §5 "Cards"). bg #fff, 2px ink border, r 2,
// transition transform/box-shadow/background-color 150ms ease-in-out.
// All variants measured live: compact (728-1301) and mobile (<728) share the same card geometry
// except the Tools card, which is 327x96 with 40px tiles on mobile.
// Hover (measured live on the original at 1440/1280/390, no breakpoint gating): translate(6px,-6px),
// box-shadow -12px 12px 0 ink and a per-card tint, 150ms ease-in-out. Holds while pressed and after
// release while the pointer stays over the card; returns to rest on leave.
export const CARD =
  'absolute flex rounded-sm border-2 border-ink bg-surface-0 text-ink no-underline transition-[transform,box-shadow,background-color] duration-150 ease-in-out hover:translate-x-[6px] hover:-translate-y-[6px] hover:[box-shadow:-12px_12px_0_0_theme(colors.ink)]'
// Per-card hover tints (measured): Tools rgb(83,219,201), Storage rgb(255,154,148) have no token.
export const TINT = {
  tools: 'hover:bg-[#53DBC9]',
  interfaces: 'hover:bg-sky-tint',
  storage: 'hover:bg-[#FF9A94]',
  yellow: 'hover:bg-yellow-chip', // Dives (visuals) + Guides (context): #FAF175
  peach: 'hover:bg-peach', // Flights (pipelines) + Scale: #FFDCBD
}
const TITLE = 'm-0 font-mono text-diagram-title uppercase'
const DESC = 'm-0 font-sans text-diagram-body text-gray-600'
const PILL =
  'flex h-[36px] items-center justify-center gap-[8px] whitespace-nowrap rounded-sm border-2 border-ink bg-cream font-sans text-pill uppercase text-ink no-underline'

// All seven original tool tiles target /docs -> non-link tiles.
const TOOLS = ['Transform', 'Systems', 'Typed web', 'Scripting', 'Relational', 'Notebook', 'Engine']

// 1. Tools & Languages: title (Mono 12/16) + 7 tiles 48x48, r 8, 1px ink, 30px glyph, gap 4.
// Tile hover: translate(2px,-2px) + -4px 4px 0 ink shadow (200ms) + tooltip.
export function ToolsCard({ variant, style }) {
  const desktop = variant === 'desktop'
  const mobile = variant === 'mobile'
  return (
    <div
      className={`${CARD} ${TINT.tools} flex-col gap-[12px] ${mobile ? 'p-[12px]' : 'py-[16px] pl-[12px] pr-[16px]'}`}
      style={style}
    >
      <p className="m-0 font-mono text-label uppercase tracking-[0.24px]">Tools &amp; Languages</p>
      <div className={`flex gap-[4px] ${mobile ? 'justify-between' : ''}`}>
        {TOOLS.map((label, i) => (
          <span key={label} aria-label={label} className="group relative block">
            <span
              className={`flex items-center justify-center rounded-md border border-ink bg-surface-0 transition-[transform,box-shadow] duration-200 ease-in-out group-hover:translate-x-[2px] group-hover:translate-y-[-2px] group-hover:shadow-hard-4 ${
                mobile ? 'h-[40px] w-[40px]' : 'h-[48px] w-[48px]'
              }`}
            >
              <Glyph index={i} className="h-[30px] w-[30px]" />
            </span>
            <Tooltip>{label}</Tooltip>
          </span>
        ))}
      </div>
    </div>
  )
}

function GetStarted({ className = '' }) {
  return (
    <span className={`flex items-center gap-[2px] font-sans text-pill uppercase ${className}`}>
      Get started
      <ArrowRight size={14} />
    </span>
  )
}

// 2/3/6. Link cards (Visuals / Pipelines / Context). Desktop 244x112: row, gap 8, padding 16 16 16 12,
// 32px icon. Compact/mobile: column (icon + title row, description, GET STARTED aligned end).
export function LinkCard({ variant, title, desc, href, style, tint = 'yellow' }) {
  if (variant === 'desktop') {
    return (
      <SiteLink href={href} className={`${CARD} ${TINT[tint]} group w-[244px] gap-[8px] py-[16px] pl-[12px] pr-[16px]`} style={style}>
        <Placeholder width={32} height={32} variant="shape" label={`${title} icon placeholder`} />
        {/* Measured: column gap 8, GET STARTED aligned end; natural height 111.59 */}
        <span className="flex flex-1 flex-col gap-[8px]">
          <span className="flex flex-col gap-[4px]">
            <span className={`${TITLE} group-hover:underline`}>{title}</span>
            <span className={DESC}>{desc}</span>
          </span>
          <GetStarted className="self-end" />
        </span>
      </SiteLink>
    )
  }
  return (
    <SiteLink href={href} className={`${CARD} ${TINT[tint]} group z-[2] w-[195px] flex-col gap-[8px] px-[8px] py-[10px]`} style={style}>
      <span className="flex flex-col gap-[4px]">
        <span className="flex items-center gap-[8px]">
          <Placeholder width={32} height={32} variant="shape" label={`${title} icon placeholder`} />
          <span className={`${TITLE} group-hover:underline`}>{title}</span>
        </span>
        <span className={DESC}>{desc}</span>
      </span>
      <GetStarted className="self-end" />
    </SiteLink>
  )
}

const INTERFACES = [
  { label: 'MCP', w: 91.27, glyph: 3, href: '/product/mcp-server/' },
  { label: 'CLI', w: 82.77, glyph: 11, href: '/docs/getting-started/interfaces/motherduck-cli/' },
  { label: 'REST', w: 66.33, href: '/docs/sql-reference/rest-api/motherduck-rest-api/' },
]

// 5. Interfaces: 40px icon + title + 3 pills (91/83/66 wide, h 36), gap 4.
export function InterfacesCard({ variant, style }) {
  const desktop = variant === 'desktop'
  const pills = (
    <div className="flex gap-[4px]">
      {INTERFACES.map((p) => (
        <SiteLink
          key={p.label}
          href={p.href}
          className={`${PILL} shrink-0 px-[16px] py-[8px]`}
          style={{ width: p.w }}
        >
          {p.glyph != null && <Glyph index={p.glyph} className="h-[20px] w-[20px] shrink-0" />}
          {p.label}
        </SiteLink>
      ))}
    </div>
  )
  if (desktop) {
    return (
      <div className={`${CARD} ${TINT.interfaces} h-[100px] w-[320.38px] items-start gap-[8px] py-[16px] pl-[12px] pr-[16px]`} style={style}>
        {/* Measured icon slot 32x32 */}
        <Glyph index={10} className="h-[32px] w-[32px] shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
          <p className={TITLE}>Interfaces</p>
          {pills}
        </div>
      </div>
    )
  }
  return (
    <div className={`${CARD} ${TINT.interfaces} w-[276.38px] flex-col gap-[8px] p-[12px]`} style={style}>
      <div className="flex items-center gap-[8px]">
        <Glyph index={10} className="h-[32px] w-[32px] shrink-0" />
        <p className={TITLE}>Interfaces</p>
      </div>
      {pills}
    </div>
  )
}

const STORAGE = ['Columnar files', 'Open tables', 'Lake format', 'Differential storage', 'Cloud object storage']
// Original pill targets (docs ones render as non-link pills).
const STORAGE_HREF = [
  '/docs/integrations/file-formats/parquet/', '/docs/integrations/file-formats/apache-iceberg/', '/product/ducklake/',
  '/blog/differential-storage-building-block-for-data-warehouse/', '/docs/key-tasks/cloud-storage/',
]

// 4. Storage: column, gap 12, padding 16, 5 pills 208x36 (padding 8 16, 18px icon, gap 8), 44px apart.
// Compact/mobile: padding 12, gap 8, pill gap 4 (fits the measured 244px card height).
export function StorageCard({ variant, style }) {
  const desktop = variant === 'desktop'
  return (
    <div
      className={`${CARD} ${TINT.storage} flex-col ${desktop ? 'h-[276px] w-[244px] gap-[12px] p-[16px]' : 'h-[248px] w-[236px] gap-[8px] p-[12px]'}`}
      style={style}
    >
      <p className={TITLE}>Storage</p>
      <div className={`flex flex-col ${desktop ? 'gap-[8px]' : 'gap-[4px]'}`}>
        {STORAGE.map((label, i) => (
          <SiteLink key={label} href={STORAGE_HREF[i]} className={`${PILL} w-full px-[16px] py-[8px]`}>
            {i === 4 ? (
              <span
                className={`h-[20px] w-[20px] shrink-0 rounded-full`}
                style={{ background: 'linear-gradient(45deg,#1B660F,#6CAE3E)' }}
                aria-hidden="true"
              />
            ) : (
              <Glyph index={i + 5} className={`h-[20px] w-[20px] shrink-0`} />
            )}
            {label}
          </SiteLink>
        ))}
      </div>
    </div>
  )
}

// 7. Scale card: 341x294, column, gap 12, padding 16. Table of 5 rows, 42 high incl. 2px bottom
// border (first row also top border). Label cell: padding 0 20, gap 8, 22px icon, Inter 14/14 UPPER,
// measured widths; last row has 3 cells 109 wide, the third clipped by the card and faded.
const TIERS = [
// w = desktop cell width, wc = compact/mobile cell width (rows 31.59 apart, padding 0 12)
  { label: 'Max', bg: 'bg-coral', w: 97.57, wc: 77.57 },
  { label: 'High', bg: 'bg-mint', w: 104.57, wc: 77.57 },
  { label: 'Mid', bg: 'bg-sky-tint', w: 114.57, wc: 85.57 },
  { label: 'Standard', bg: 'bg-coral', w: 138.57, wc: 107.57 },
]
const SMALL = { label: 'Lite', bg: 'bg-mint', w: 108.57, wc: 85.57 }

// Measured desktop rows are 42px apart (first row's top border included): cells 38 (first) / 40 tall.
function TierCell({ t, desktop, fade, first }) {
  return (
    <div
      className={`flex shrink-0 items-center border-r-2 border-ink font-sans uppercase ${t.bg} ${
        desktop
          ? `${first ? 'h-[38px]' : 'h-[40px]'} gap-[8px] px-[20px] text-[14px] leading-[14px]`
          : `${first ? 'h-[27.59px]' : 'h-[29.59px]'} gap-[8px] px-[12px] text-[14px] leading-[14px]`
      }`}
      style={{
        width: desktop ? t.w : t.wc,
        ...(fade && { maskImage: 'linear-gradient(90deg,#000 20%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,#000 20%,transparent)' }),
      }}
    >
      <Glyph index={4} className="h-[27.59px] w-[15.57px] shrink-0" />
      {t.label}
    </div>
  )
}

export function ScaleCard({ variant, style }) {
  const desktop = variant === 'desktop'
  return (
    <div
      className={`${CARD} ${TINT.peach} flex-col overflow-hidden ${desktop ? 'h-[293.8px] w-[341px]' : 'h-[241.77px] w-[243px]'} gap-[12px] p-[16px]`}
      style={style}
    >
      <div className="flex flex-col gap-[3px]">
        <p className={TITLE}>Size to fit</p>
        <p className={DESC}>Isolated compute per user</p>
      </div>
      <div className="flex flex-col">
        {TIERS.map((t, i) => (
          <div key={t.label} className={`flex border-b-2 border-ink ${i === 0 ? 'border-t-2' : ''}`}>
            <TierCell t={t} desktop={desktop} first={i === 0} />
          </div>
        ))}
        <div className="flex border-b-2 border-ink">
          <TierCell t={SMALL} desktop={desktop} />
          <TierCell t={SMALL} desktop={desktop} />
          <TierCell t={SMALL} desktop={desktop} fade />
        </div>
      </div>
    </div>
  )
}
