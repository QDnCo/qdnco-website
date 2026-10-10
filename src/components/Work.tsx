import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PROJECTS, type Project } from '../lib/data'
import FadeIn from './FadeIn'

/**
 * Sticky-stacking cards, lifted from the 3D Creator template — but each card
 * carries a constraint, the decisions taken, and the numbers, instead of a
 * gallery. Role badges are deliberate: an honestly-labelled agency account
 * makes the owned results read as more credible, not less.
 */

const ROLE_STYLE: Record<Project['role'], string> = {
  Owned: 'bg-live/15 text-live',
  Led: 'bg-white/10 text-white/80',
  'Executed (agency account)': 'bg-white/[0.06] text-white/50',
}

function Card({ p, i, total, progress }: {
  p: Project
  i: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const targetScale = 1 - (total - 1 - i) * 0.03
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  return (
    <div className="sticky top-24 h-[78vh] md:top-28">
      <motion.article
        style={{ scale, top: `${i * 24}px` }}
        className="glass relative flex h-full flex-col overflow-hidden rounded-[36px] p-6 md:p-9"
      >
        <div className="gridlines absolute inset-0 opacity-25" />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-5">
            <span className="font-pixel text-5xl leading-none text-white/12 md:text-7xl">
              {p.index}
            </span>
            <div>
              <div className="font-pixel text-[11px] tracking-[0.22em] text-white/40">
                {p.sector.toUpperCase()} · {p.location.toUpperCase()}
              </div>
              <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-chalk md:text-4xl">
                {p.name}
              </h3>
              <div className="mt-1 text-[13px] text-white/50">{p.client}</div>
            </div>
          </div>

          <span
            className={`font-pixel rounded-full px-3 py-1 text-[10px] tracking-widest ${ROLE_STYLE[p.role]}`}
          >
            {p.role.toUpperCase()}
          </span>
        </div>

        <div className="relative mt-7 grid flex-1 content-start gap-7 md:grid-cols-2">
          <div>
            <div className="font-pixel text-[11px] uppercase tracking-[0.2em] text-white/35">
              The constraint
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/75 md:text-sm">
              {p.constraint}
            </p>

            <div className="font-pixel mt-6 text-[11px] uppercase tracking-[0.2em] text-white/35">
              Decisions
            </div>
            <ul className="mt-2 space-y-1.5">
              {p.decisions.map((d) => (
                <li
                  key={d}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-white/60"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-live/70" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-pixel text-[11px] uppercase tracking-[0.2em] text-white/35">
              {p.band === 'active' ? 'Engagement' : 'Numbers'}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {p.metrics.map((m) => (
                <div key={m.k} className="border-t border-white/10 pt-2.5">
                  <div className="text-lg font-semibold tracking-tight text-chalk md:text-2xl">
                    {m.v}
                  </div>
                  <div className="font-pixel mt-0.5 text-[10px] tracking-widest text-white/40">
                    {m.k.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            {p.band === 'active' && (
              <p className="font-pixel mt-5 text-[11px] leading-relaxed text-white/35">
                Active engagement. Results reported privately.
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="work"
      ref={ref}
      className="relative -mt-10 rounded-t-[40px] bg-ink px-5 pb-24 pt-20 sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-12 lg:px-16"
    >
      <FadeIn className="relative mb-14">
        <div className="font-pixel mb-2 text-[12px] tracking-[0.28em] text-live">
          // THE WORK
        </div>
        <h2
          className="steel text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl"
          style={{ lineHeight: 0.9 }}
        >
          Constraint → decision → number
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
          Eight engagements across real estate, education and SaaS. Every card
          states what the role actually was.
        </p>
      </FadeIn>

      <div className="relative">
        {PROJECTS.map((p, i) => (
          <Card
            key={p.index}
            p={p}
            i={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
