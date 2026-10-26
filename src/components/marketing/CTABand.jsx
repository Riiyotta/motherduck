import { Container, Placeholder } from '../ui'
import { Btn, TextLink } from './bits.jsx'
import { fit, fitTitle } from './copy.js'

// §3 B10 CTABand. Grid-texture section; white card (max 1028, 2px ink) with text left and a sky-tint
// panel + illustration right. Each route sizes its card differently on the original, so the geometry is a
// per-page table (measured @1440 / 1280 / 768 / 390). `cream` = hypertenancy (cream bg, borderless card).
//   cols: grid columns md / lg / xl · left: left-column padding md / lg / xl · stackLg: buttons stack ≤1301
//   mobR: right column height <728 · lens: [h2 chars, p chars | 0, primary label, secondary label | null]
const GEO = {
  vs: {
    pad: 'py-[92px] lg:pb-[120px] lg:pt-[100px] xl:py-[160px]',
    cols: 'md:grid-cols-[396px_288px] lg:grid-cols-[526px_390px] xl:grid-cols-[544px_480px]',
    left: 'md:pb-[26px] md:pl-[32px] md:pr-[20px] md:pt-[26px] lg:pb-[32px] lg:pl-[88px] lg:pr-[92px] lg:pt-[32px] xl:pb-[54px] xl:pl-[90px] xl:pr-[74px] xl:pt-[54px]',
    mobR: 'h-[270.4px] md:min-h-[276px] lg:min-h-[304px] xl:min-h-[376px]',
    art: 'left-[91.25px] top-[37.2px] h-[281.8px] w-[287.3px] md:left-[31.7px] md:top-[30.5px] md:h-[293.8px] md:w-[299.5px] lg:left-[72.2px] lg:top-[22.8px] lg:h-[340.5px] lg:w-[347.1px] xl:left-[91.2px] xl:top-[28.4px] xl:h-[419px] xl:w-[427.2px]',
  },
  dives: {
    cols: 'md:grid-cols-[404px_280px] lg:grid-cols-[556px_360px] xl:grid-cols-[529px_495px]',
    left: 'md:pb-[28px] md:pl-[40px] md:pr-[32px] md:pt-[28px] xl:px-[80px] xl:py-[50px]',
    stackLg: true,
    mobR: 'h-[236.6px]',
  },
  ducklake: {
    cols: 'md:grid-cols-[364px_320px] lg:grid-cols-[556px_360px] xl:grid-cols-[582px_442px]',
    left: 'md:pb-[35px] md:pl-[40px] md:pr-[30px] md:pt-[35px] lg:px-[68px] lg:py-[52px] xl:pb-[60px] xl:pl-[70px] xl:pr-[40px] xl:pt-[58px]',
    stackLg: true,
    mobR: 'h-[270.4px]',
  },
  flights: {
    cols: 'md:grid-cols-[384px_300px] lg:grid-cols-[536px_380px] xl:grid-cols-[589px_435px]',
    left: 'md:pb-[35px] md:pl-[40px] md:pr-[30px] md:pt-[35px] lg:px-[68px] lg:py-[52px] xl:p-[80px]',
    mobR: 'h-[219.7px]',
    mobGap: 'gap-[12px]',
  },
  guides: {
    cols: 'md:grid-cols-[366px_318px] lg:grid-cols-[506px_410px] xl:grid-cols-[514px_510px]',
    left: 'md:pb-[35px] md:pl-[40px] md:pr-[30px] md:pt-[35px] lg:px-[68px] lg:py-[60px] xl:p-[80px]',
    stackLg: true,
    mobR: 'h-[236.6px]',
  },
  mcp: {
    cols: 'md:grid-cols-[398px_286px] lg:grid-cols-[556px_360px] xl:grid-cols-[562px_462px]',
    left: 'md:pb-[35px] md:pl-[40px] md:pr-[30px] md:pt-[35px] lg:px-[68px] lg:py-[52px] xl:px-[80px] xl:py-[82px]',
    stackLg: true,
    mobR: 'h-[270.4px]',
  },
  postgres: {
    cols: 'md:grid-cols-[444px_240px] lg:grid-cols-[592px_324px] xl:grid-cols-[504px_520px]',
    left: 'md:pb-[35px] md:pl-[40px] md:pr-[30px] md:pt-[35px] lg:px-[68px] lg:py-[52px] xl:px-[80px] xl:py-[87px]',
    stackLg: true,
    mobR: 'h-[270.4px]',
  },
  hypertenancy: {
    cols: 'md:grid-cols-[468px_220px] lg:grid-cols-[590px_330px] xl:grid-cols-[647px_381px]',
    left: 'md:py-[40px] md:pl-[40px] md:pr-[42px] lg:pl-[64px] lg:pr-[104px] lg:py-[50px] xl:px-[80px] xl:py-[59px]',
    stackLg: true,
    mobR: 'h-[324.9px]',
    borderless: true,
  },
}
const PRODUCT_PAD = 'py-[92px] lg:pb-[120px] lg:pt-[100px] xl:pb-[160px] xl:pt-[120px]'

export default function CTABand({ variant = 'product', page = variant === 'vs' ? 'vs' : 'dives', cream = false, lens = [32, 71, 'GET STARTED', 'GET A DEMO'], seed = 5 }) {
  const g = GEO[page] || GEO.dives
  const [h2c, pc, primary, secondary] = lens
  const vs = variant === 'vs'
  return (
    <section className={`overflow-hidden ${cream ? 'mk-grid-texture mk-grid-texture--ht' : 'mk-grid-texture'} ${g.pad || PRODUCT_PAD}`}>
      <Container>
        <div className={`mx-auto grid max-w-[360px] grid-cols-1 ${g.mobGap || 'gap-[32px]'} overflow-hidden bg-white md:max-w-[1028px] md:gap-0 ${g.borderless ? '' : 'border-2 border-ink'} ${g.cols}`}>
          <div className={`flex flex-col justify-center gap-[24px] px-[24px] pt-[32px] lg:gap-[32px] ${g.left}`}>
            <div>
              <h2 className="m-0 font-mono font-normal uppercase text-ink text-h2-mono-md xl:text-h2-mono-lg">{fitTitle(h2c, seed)}</h2>
              {pc > 0 && (
                <p className={`m-0 pt-[8px] font-sans text-body-md text-ink md:pt-[12px] ${vs ? 'md:max-w-[340px] lg:max-w-none xl:max-w-[340px]' : ''}`}>
                  {fit(pc, seed + 1)}
                </p>
              )}
            </div>
            {vs ? (
              <div className="flex flex-col gap-[8px] md:flex-row md:items-center">
                {/* /better-data-warehouse-trial is not in routes.js -> non-link button */}
                <Btn variant="primary" fullWidth wrapperClassName="md:!inline-flex md:!w-auto" className="md:!w-auto">{primary}</Btn>
                <Btn variant="secondary" to="/contact-us/product-expert" fullWidth wrapperClassName="md:!inline-flex md:!w-auto" className="md:!w-auto">{secondary}</Btn>
              </div>
            ) : (
              <div className={`flex flex-col items-start gap-[24px] ${g.stackLg ? 'xl:flex-row xl:items-center' : 'md:flex-row md:items-center'}`}>
                <Btn variant="primary">{primary}</Btn>
                {secondary && <TextLink size="sm">{secondary}</TextLink>}
              </div>
            )}
          </div>
          <div className={`relative ${g.mobR} md:h-auto ${variant === 'vs' ? '' : 'xl:min-h-[321px]'}`}>
            <div aria-hidden="true" className="absolute inset-0 bg-sky-tint" />
            <Placeholder
              label="CTA illustration"
              className={`!absolute ${g.art || 'inset-0 !h-full !w-full'}`}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
