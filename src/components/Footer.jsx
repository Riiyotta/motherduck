import { Container, Placeholder } from './ui'
import { SocialGlyph, ExternalIcon, Wordmark } from './footer/icons.jsx'
import { COLUMNS, SOCIAL, LEGAL, OSS_HREF, COMPLIANCE_HREF } from './footer/links.js'
import { SiteLink } from '../lib/links.js'

// Spec §10 Footer (ink bg, white text).
const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-hover'

// Hover: 0.98px white bar at bottom -1.4px, full width. Active: text + bar #6FC2FF. Instant (§11 #14).
// Same-site targets are router links; external targets (ext) and /docs render as non-link text.
function FooterLink({ label, ext, href }) {
  return (
    <SiteLink
      href={ext ? null : href}
      className={`group relative flex items-center gap-[4px] self-start font-sans text-footer-link-sm text-white no-underline active:text-sky-hover xl:text-footer-link ${focusRing}`}
    >
      <span>{label}</span>
      {ext && <ExternalIcon />}
      <span aria-hidden="true" className="absolute bottom-[-1.4px] left-0 h-[0.98px] w-full bg-white opacity-0 group-hover:opacity-100 group-active:bg-sky-hover" />
    </SiteLink>
  )
}

// Legal / inline text links (measured): inline-block wrapper; <a> flex with a 1px transparent border, r 2;
// label span #F8F8F7, padding 1px 0, 1px #F8F8F7 underline that turns #6FC2FF on hover. 22.8 tall (21.6 <728).
// Original: legal links are internal with target _blank; the open-source link is external (non-link here).
function TextLink({ children, href }) {
  return (
    <span className="inline-block align-top">
      <SiteLink href={href} target="_blank" rel="noopener noreferrer" className={`flex rounded-sm border border-transparent pb-[1px] no-underline ${focusRing}`}>
        <span className="border-b border-surface-2 py-[1px] text-[13px] leading-[15.6px] text-surface-2 hover:border-sky-hover md:text-[14px] md:leading-[16.8px]">{children}</span>
      </SiteLink>
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink py-[64px] text-white md:py-[56px] lg:pb-[72px] lg:pt-[90px]">
      <Container className="flex flex-col justify-between gap-[52px] md:gap-[72px] lg:gap-[64px]">
        {/* Top row */}
        <div className="flex flex-col gap-[48px] md:gap-[52px] lg:flex-row lg:justify-between lg:gap-[40px] xl:gap-0">
          {/* Measured brand column: 164 wide at 960–1301 (164 + 40 + 716 = 920, no overflow), 230 at >=1302.
              Logo 185x33 / 187x33 (728–959) / 164x29 (960–1301) / 210x37. Icons 24 gap 16 / 32 gap 32 / 30 gap 20 / 32 gap 32. */}
          <div className="flex flex-col gap-[32px] lg:w-[164px] lg:shrink-0 xl:w-[230px] xl:gap-[40px]">
            <SiteLink href="/" aria-label="Home" className={`block self-start text-white ${focusRing}`}>
              <Wordmark className="h-[33px] w-[185px] md:w-[187px] lg:h-[29px] lg:w-[164px] xl:h-[37px] xl:w-[210px]" />
            </SiteLink>
            <div className="flex flex-wrap gap-[16px] md:gap-[32px] lg:gap-[20px] xl:max-w-[230px] xl:gap-[32px]">
              {SOCIAL.map((s) => (
                // All social targets are external / mailto / a static file -> non-link (SiteLink returns a span).
                <SiteLink
                  key={s.kind}
                  href={s.href}
                  role="img"
                  aria-label={s.label}
                  className={`block h-[24px] w-[24px] text-white transition-opacity duration-150 ease-in-out hover:opacity-60 md:h-[32px] md:w-[32px] lg:h-[30px] lg:w-[30px] xl:h-[32px] xl:w-[32px] ${focusRing}`}
                >
                  <SocialGlyph kind={s.kind} />
                </SiteLink>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 items-start gap-x-[20px] gap-y-[40px] md:grid-cols-[repeat(4,154px)] md:gap-[24px] lg:shrink-0 lg:grid-cols-[repeat(4,167px)] lg:gap-[16px] xl:grid-cols-[repeat(4,200px)] xl:gap-[32px]">
            {COLUMNS.map((col, i) => (
              <nav key={i} aria-label={col.groups[0].heading} className="flex flex-col gap-[20px] lg:gap-[22px] xl:gap-[24px]">
                {col.groups.map((g, gi) => (
                  <div key={g.heading} className={`contents`}>
                    <p className={`font-sans text-footer-heading-sm xl:text-footer-heading ${gi > 0 ? 'mt-[24px]' : ''}`}>{g.heading}</p>
                    {g.links.map((l) => (
                      <FooterLink key={l.label} {...l} />
                    ))}
                  </div>
                ))}
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-[32px] md:flex-row md:justify-between">
          <div className="flex flex-col justify-center gap-[20px] font-sans text-[13px] font-light leading-[18.2px] tracking-[0.26px] md:gap-[12px] md:text-[14px] md:leading-[19.6px] md:tracking-[0.28px]">
            <span>
              This site is built on <TextLink href={OSS_HREF}>open-source software</TextLink>
            </span>
            <div className="flex flex-wrap gap-[20px]">
              {LEGAL.map((l) => (
                <TextLink key={l.label} href={l.href}>{l.label}</TextLink>
              ))}
            </div>
          </div>
          <div className="flex gap-[20px]">
            {['Compliance badge 1', 'Compliance badge 2'].map((b) => (
              <SiteLink key={b} href={COMPLIANCE_HREF} className={`block ${focusRing}`}>
                <Placeholder label={b} variant="shape" className="h-[64px] w-[64px] lg:h-[72px] lg:w-[72px]" />
              </SiteLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
