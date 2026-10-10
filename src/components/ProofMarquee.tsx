import { MARQUEE_ITEMS } from '../lib/data'

/**
 * The 3D Creator template scrolls a wall of images here. Images would be
 * decoration; the equivalent asset in this portfolio is the evidence itself —
 * so the marquee carries client names and the numbers they produced, alternating.
 */
export default function ProofMarquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink py-6">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => {
          const isMetric = /[₹%×]|DAYS|ORDERS|ENROLLMENTS|SALES-READY/.test(item)
          return (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span
                className={
                  isMetric
                    ? 'font-pixel text-sm tracking-[0.15em] text-live'
                    : 'text-sm font-medium tracking-[0.22em] text-white/55'
                }
              >
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
            </span>
          )
        })}
      </div>

      {/* Edge fades so the loop reads as continuous */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  )
}
