import { Container, Placeholder } from '../ui'
import { TagTitle, TextLink } from './bits.jsx'
import { fit, fitTitle } from './copy.js'

// §3 B14 QuoteSpotlight: single quote, tag title on the top edge, attribution card [90 | auto].
// variant 'default' (flights, mcp) | 'postgres' (padding-top 172) | 'startups' (border-y, tag straddles at -25).
const PT = { default: 'xl:pt-[162px] xl:pb-[102px]', postgres: 'xl:pt-[172px] xl:pb-[102px]', startups: '!pt-[96px] !pb-[82px] md:!pt-[140px] md:!pb-[120px] xl:!pb-[110px]' }

// lens = { q: quote chars, strong: bold-run chars (0 = none), name, role }
// `rule`: bottom rule of the default variants, measured per page — flights 2px #E1D6CB ('sand'), mcp-server /
// postgres none.
export default function QuoteSpotlight({ tag = 'WHAT TEAMS SAY', link, variant = 'default', rule = 'none', lens = { q: 193, strong: 0, name: 12, role: 7 }, seed = 41 }) {
  const startups = variant === 'startups'
  const strongLen = lens.strong || 0
  return (
    <div className={startups ? 'border-y-2 border-ink' : rule === 'sand' ? 'border-b-2 border-sand-dark' : ''}>
      <section className={`relative pb-[92px] pt-[104px] md:pb-[88px] md:pt-[120px] ${PT[variant]}`}>
        <TagTitle
          className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap py-[8px] text-tag-18 md:text-h2-mono-md xl:text-h2-mono-lg ${
            startups ? 'top-0 -translate-y-1/2 px-[20px]' : 'top-0 px-[20px]'
          }`}
        >
          {tag}
        </TagTitle>
        <Container>
          {/* quote column 342 / 640 (728–959) / 824; gaps 32 / 40 / 52 */}
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-[32px] md:gap-[40px] lg:max-w-[700px] xl:max-w-[824px] xl:gap-[52px]">
            <blockquote className="m-0 text-center font-sans text-ink text-quote-spot-md lg:text-quote-spot-lg xl:text-quote-spot">
              {strongLen > 0 ? (
                <><strong className="font-bold">{fitTitle(strongLen, seed + 1).toLowerCase()}</strong> {fit(lens.q - strongLen - 1, seed)}</>
              ) : fit(lens.q, seed)}
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-[54px_auto] border-2 border-ink md:grid-cols-[84px_auto] lg:grid-cols-[90px_auto]">
                <Placeholder label="Portrait" bordered={false} rounded="" className="h-full min-h-[52.4px] w-[54px] border-r-2 border-ink md:w-[84px] lg:w-[90px]" />
                <div className="flex flex-col justify-center gap-[4px] bg-white px-[12px] py-[8px] md:px-[24px] md:py-[16px]">
                  <p className="m-0 font-sans text-[14px] font-semibold leading-[19.6px] tracking-[0.28px] text-ink md:text-person-name-lg-md xl:text-person-name-lg">{fitTitle(lens.name, seed + 5)}</p>
                  <p className="m-0 font-sans text-[14px] font-light leading-[16.8px] tracking-[0.28px] text-ink md:leading-[19.6px] xl:text-accordion-body">{fitTitle(lens.role, seed + 3)}</p>
                </div>
              </div>
              {link && <TextLink to={link} className="mt-[64px] xl:mt-[72px]">SEE CASE STUDY</TextLink>}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
