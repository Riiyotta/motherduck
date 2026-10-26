// L7 /ecosystem: EcoHero -> [Technology Partners + CategoryChips(11) + search] -> PartnerCard grid(73, JoinFlockCard after 3)
// -> Consulting Partners grid(11) -> BuildCTA; PartnerModal on "Become a Partner".
import { useCallback, useMemo, useState } from 'react'
import { Container } from '../../components/ui'
import CategoryChips from '../../components/content/CategoryChips.jsx'
import { SearchField } from '../../components/content/filters.jsx'
import { EcoHero, PartnerCard, JoinFlockCard, BuildCTA, PartnerModal } from '../../components/content/eco.jsx'
import { NoResults } from '../../components/content/bits.jsx'
import { useParams } from '../../components/content/hooks.js'
import { techPartners, consultingPartners, ECO_CATEGORIES } from '../../components/content/data.js'

const GRID = 'mx-auto grid max-w-[350px] grid-cols-1 gap-[24px] md:max-w-none md:grid-cols-2 lg:gap-[32px] xl:grid-cols-3'
const H2 = 'm-0 font-mono font-normal uppercase text-ink text-section-h2-mono-sm md:text-section-h2-mono-md lg:text-section-h2-mono'

export default function EcosystemIndex() {
  const [params, set] = useParams()
  const raw = params.get('category') || 'All'
  const cat = ECO_CATEGORIES.find((c) => c.toLowerCase() === raw.toLowerCase()) || 'All'
  const q = params.get('title') || ''
  const [modal, setModal] = useState(false)
  const open = useCallback(() => setModal(true), [])
  const close = useCallback(() => setModal(false), [])
  const match = (p) => !q || p.name.toLowerCase().includes(q.toLowerCase())
  const tech = useMemo(() => techPartners().filter((p) => (cat === 'All' || p.tags.includes(cat)) && match(p)), [cat, q]) // eslint-disable-line react-hooks/exhaustive-deps
  const consulting = useMemo(() => consultingPartners().filter(match), [q]) // eslint-disable-line react-hooks/exhaustive-deps
  const href = (l) => {
    const p = new URLSearchParams()
    if (l !== 'All') p.set('category', l)
    if (q) p.set('title', q)
    const s = p.toString()
    return `/ecosystem${s ? `?${s}` : ''}`
  }
  return (
    <>
      <EcoHero onOpen={open} />
      <Container className="pb-[100px] md:pb-[120px] xl:pb-[160px]">
        <h2 className={`${H2} pb-[32px] md:pb-[40px] lg:pb-[52px]`}>Technology Partners</h2>
        <div className="flex flex-col gap-[24px] pb-[72px] md:gap-[32px] md:pb-[64px]">
          <CategoryChips labels={ECO_CATEGORIES} active={cat} hrefFor={href} />
          <SearchField value={q} onCommit={(v) => set({ title: v }, { keepPage: true })} />
        </div>
        {tech.length === 0 ? <NoResults /> : (
          <div className={GRID}>
            {tech.map((p, k) => {
              const card = <PartnerCard key={p.slug} p={p} reveal={k >= 3} />
              return k === 2
                ? [card, <div key="join" className="xl:col-span-3"><JoinFlockCard onOpen={open} /></div>]
                : card
            })}
            {tech.length < 3 && <div className="xl:col-span-3"><JoinFlockCard onOpen={open} /></div>}
          </div>
        )}
      </Container>
      <Container className="pb-[100px] md:pb-[120px] xl:pb-[160px]">
        <h2 className={`${H2} pb-[32px] md:pb-[40px] lg:pb-[52px]`}>Consulting Partners</h2>
        <div className={GRID}>
          {consulting.map((p) => <PartnerCard key={p.slug} p={p} />)}
        </div>
      </Container>
      <BuildCTA onOpen={open} />
      <PartnerModal open={modal} onClose={close} />
    </>
  )
}
