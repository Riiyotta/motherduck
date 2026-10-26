// Hero logo strip (spec §3 "Logo strip", ASSET_MANIFEST Hero). Customer logos are replaced by
// neutral Placeholder boxes at the rendered sizes (>=728 / <728). Linked logos get the 6x6 orange
// dot (top -3, right -14) and, >=960, a hover tooltip (bg ink, padding 6 6 6 8, 8x8 nub).
import { Placeholder } from '../ui'
import { SiteLink } from '../../lib/links.js'

// [width, height] @>=960, [width, height] @<960 (measured: 768 uses the small set), linked?
// Strip: <1302 full width, space-between; >=1302 max-width 450, gap 16/32, start.
const LOGOS = [
// href = the original logo's case-study target.
  { d: [196.8, 24], m: [164, 20], link: true, href: '/case-studies/ahead-computing-agent-first-data-platform/' },
  { d: [28.8, 24], m: [24, 20], link: true, href: '/case-studies/dosomething-non-profit-tco-cost-savings/' },
  { d: [89.13, 24], m: [74, 20], link: false },
  { d: [127.05, 14], m: [109, 12], link: true, href: '/case-studies/goodship-ai-transportation-analyst/' },
  { d: [113.77, 24], m: [95, 20], link: true, href: '/case-studies/together-ai-scaling-with-motherduck/' },
  { d: [79.18, 24], m: [66, 20], link: true, href: '/case-studies/finqore/' },
]

function Logo({ d, m, i }) {
  return (
    <Placeholder
      label={`Customer logo ${i + 1}`}
      className="h-[var(--mh)] w-[var(--mw)] lg:h-[var(--dh)] lg:w-[var(--dw)]"
      style={{ '--dw': `${d[0]}px`, '--dh': `${d[1]}px`, '--mw': `${m[0]}px`, '--mh': `${m[1]}px` }}
    />
  )
}

export default function LogoStrip() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="shrink-0 font-mono text-label uppercase text-gray-600">TRUSTED BY BUILDERS</span>
        <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
      </div>
      <ul className="m-0 flex list-none flex-wrap items-center justify-between gap-[16px] p-0 xl:max-w-[450px] xl:justify-start xl:gap-x-[32px] xl:gap-y-[16px]">
        {LOGOS.map((l, i) => (
          <li key={i} className="group relative flex">
            {l.link ? (
              <SiteLink href={l.href} aria-label={`Read customer story ${i + 1}`} className="relative flex">
                <Logo {...l} i={i} />
                {/* Measured dot: 4.84px, right -12 below 1302; 6.06px, right -14 at >=1302 */}
                <span aria-hidden="true" className="absolute right-[-12px] top-[-3px] h-[4.84px] w-[4.84px] rounded-full bg-orange xl:right-[-14px] xl:h-[6.06px] xl:w-[6.06px]" />
              </SiteLink>
            ) : (
              <Logo {...l} i={i} />
            )}
            {l.link && (
              // Tooltip: inner typography UNMEASURED -> shared tooltip role (Inter 12/16, white on ink)
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-[1] hidden -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink py-[6px] pl-[8px] pr-[6px] font-sans text-tooltip text-white lg:group-hover:block"
              >
                <span aria-hidden="true" className="absolute bottom-[calc(100%-4px)] left-1/2 h-[8px] w-[8px] -translate-x-1/2 rotate-45 bg-ink" />
                <span className="relative">Read the story</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
