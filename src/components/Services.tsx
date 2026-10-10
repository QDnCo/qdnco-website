import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SERVICES } from '../lib/services'
import { META_GRID } from '../lib/data'
import FadeIn from './FadeIn'

/**
 * Services, stated plainly. The numbered-row treatment is borrowed from the
 * 3D Creator template — but on a dark ground, and every row opens to the
 * actual deliverables rather than a single line of description.
 */
export default function Services() {
  const [open, setOpen] = useState<string | null>('01')

  return (
    <section id="services" className="relative bg-ink px-5 py-24 sm:px-8 md:px-12 lg:px-16">
      <div className="gridlines absolute inset-0 opacity-30" />

      <FadeIn className="relative">
        <div className="font-pixel mb-2 text-[12px] tracking-[0.28em] text-live">
          // WHAT I DO
        </div>
        <h2
          className="steel text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ lineHeight: 0.88 }}
        >
          Services
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
          Eight capabilities. Most engagements use four or five of them — the
          research gate decides which.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {META_GRID.sectors.map((s) => (
            <span
              key={s}
              className="glass font-pixel rounded-full px-3.5 py-1.5 text-[11px] tracking-widest text-white/70"
            >
              {s.toUpperCase()}
            </span>
          ))}
        </div>
      </FadeIn>

      <div className="relative mt-14 border-t border-white/10">
        {SERVICES.map((s, i) => {
          const isOpen = open === s.id
          return (
            <FadeIn key={s.id} delay={i * 0.05}>
              <div className="border-b border-white/10">
                <button
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  className="group flex w-full items-start gap-5 py-7 text-left transition-colors hover:bg-white/[0.02] md:gap-8 md:py-9"
                >
                  <span
                    className={`font-pixel shrink-0 text-3xl leading-none transition-colors md:text-5xl ${
                      isOpen ? 'text-live' : 'text-white/15'
                    }`}
                  >
                    {s.id}
                  </span>

                  <span className="flex-1">
                    <span className="block text-xl font-medium uppercase tracking-tight text-chalk md:text-3xl">
                      {s.name}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-white/50 md:text-sm">
                      {s.blurb}
                    </span>

                    <span
                      className={`grid transition-all duration-500 ${
                        isOpen
                          ? 'mt-5 grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                    >
                      <span className="overflow-hidden">
                        <span className="grid gap-2.5 border-l border-live/30 pl-5 md:grid-cols-2 md:gap-x-8">
                          {s.deliverables.map((d) => (
                            <span
                              key={d}
                              className="flex gap-2.5 text-[13px] leading-relaxed text-white/70"
                            >
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-live" />
                              {d}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </span>

                  <Plus
                    className={`mt-1 h-5 w-5 shrink-0 text-white/35 transition-transform duration-500 ${
                      isOpen ? 'rotate-45 text-live' : 'group-hover:text-white/70'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </button>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
