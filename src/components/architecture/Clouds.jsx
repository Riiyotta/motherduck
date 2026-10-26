// Decorative outline clouds (spec §4): 1440-wide layer centred via left 50% / translateX(-720px),
// hidden <728. Generic cloud path (viewBox 0 0 86 40), fill white, stroke ink ~0.8px.
// Positions measured live: 728-1301 uses smaller clouds (200 / 130 / 260) anchored as below;
// >=1302 uses 300 / 171 / 389. Heights follow the viewBox aspect (w * 40 / 86).
const CLOUD = 'M12 39h62a11 11 0 0 0 1.5-21.9A15 15 0 0 0 48 9.5 14 14 0 0 0 23.5 15 12 12 0 0 0 12 39z'

const POS = [
  { cls: 'left-[16px] bottom-[360px] w-[200px] xl:bottom-auto xl:left-[25px] xl:top-[762.18px] xl:w-[300px]', flip: false },
  { cls: 'left-[1286px] top-[60px] w-[130px] xl:left-[1209px] xl:top-[100px] xl:w-[171px]', flip: true },
  { cls: 'left-[1250px] bottom-[40px] w-[260px] xl:left-[1141px] xl:bottom-[20px] xl:w-[389px]', flip: true },
]

export default function Clouds() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[1440px] -translate-x-[720px] md:block">
      {POS.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 86 40"
          className={`absolute h-auto text-ink ${c.cls}`}
          style={{ aspectRatio: '86 / 40', transform: c.flip ? 'scale(-1,-1)' : undefined }}
        >
          <path d={CLOUD} fill="#fff" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      ))}
    </div>
  )
}
