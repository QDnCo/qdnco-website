import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { PHASES } from '../lib/data'
import FadeIn from './FadeIn'

/**
 * Journey B — the client's path, Phase 0 → Month 3.
 * The rail is sticky; prep phases render muted and everything from Phase 3
 * flips to signal green. That colour change carries the argument in the
 * source document ("from Phase 3 onward you are live in the market") without
 * needing a line of copy to explain it.
 */
export default function DeliverySystem() {
  const [active, setActive] = useState(0)
  const panels = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx)
            setActive(i)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    panels.current.forEach((p) => p && io.observe(p))
    return () => io.disconnect()
  }, [])

  return (
    <section id="system" className="relative bg-ink px-5 py-24 sm:px-8 md:px-12 lg:px-16">
      <div className="gridlines absolute inset-0 opacity-30" />

      <FadeIn className="relative">
        <div className="font-pixel mb-2 text-[12px] tracking-[0.28em] text-live">
          // JOURNEY B — YOURS
        </div>
        <h2
          className="steel max-w-3xl text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl"
          style={{ lineHeight: 0.9 }}
        >
          The delivery system
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
          Six phases to a system that holds. Prep is short and purposeful — from
          Phase 3 your budget is working in market, not sitting in decks.
        </p>
      </FadeIn>

      <div className="relative mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ── STICKY RAIL ── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <ol className="space-y-1">
              {PHASES.map((p, i) => {
                const on = i === active
                return (
                  <li key={p.id}>
                    <div
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-300 ${
                        on ? 'bg-white/[0.05]' : ''
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-md font-pixel text-[12px] transition-colors duration-300 ${
                          p.live
                            ? on
                              ? 'bg-live text-ink'
                              : 'bg-live/20 text-live'
                            : on
                              ? 'bg-white/85 text-ink'
                              : 'bg-white/[0.07] text-white/45'
                        }`}
                      >
                        {p.id}
                      </span>
                      <span
                        className={`flex-1 text-[13px] leading-tight transition-colors duration-300 ${
                          on ? 'text-chalk' : 'text-white/40'
                        }`}
                      >
                        {p.title}
                      </span>
                      {p.live && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" />
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className="glass mt-6 rounded-2xl p-4">
              <div className="font-pixel text-[11px] tracking-widest text-live">
                MONTH 3 — OUTCOME
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                A system where the expensive unknowns are resolved before scale
                spend. Learnings, funnel and execution locked.
              </p>
            </div>
          </div>
        </div>

        {/* ── PANELS ── */}
        <div className="space-y-5 lg:col-span-8">
          {PHASES.map((p, i) => (
            <div
              key={p.id}
              data-idx={i}
              ref={(el) => {
                panels.current[i] = el
              }}
              className={`glass rounded-3xl p-6 transition-opacity duration-500 md:p-8 ${
                i === active ? 'opacity-100' : 'opacity-45'
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-pixel text-5xl leading-none text-white/12 md:text-6xl">
                  {p.id}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold tracking-tight text-chalk md:text-2xl">
                      {p.title}
                    </h3>
                    {p.live && (
                      <span className="font-pixel inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-0.5 text-[10px] tracking-widest text-live">
                        <span className="h-1.5 w-1.5 rounded-full bg-live" />
                        LIVE IN MARKET
                      </span>
                    )}
                  </div>
                  <div className="font-pixel mt-1 text-[11px] tracking-widest text-white/40">
                    {p.duration}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {p.summary}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[13px] leading-relaxed text-white/60">
                    <Check
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                        p.live ? 'text-live' : 'text-white/30'
                      }`}
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
