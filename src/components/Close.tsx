import { ArrowUpRight, Mail, Phone, Link2 } from 'lucide-react'
import { IDENTITY, TOOLS } from '../lib/data'
import FadeIn from './FadeIn'

/**
 * Two doors, one page. The same evidence sold to a hiring manager and a
 * developer — the only thing that changes is what you're asked to do next.
 */
export default function Close() {
  return (
    <section id="talk" className="relative bg-ink px-5 pb-14 pt-24 sm:px-8 md:px-12 lg:px-16">
      <div className="gridlines absolute inset-0 opacity-30" />

      {/* Tools marquee */}
      <div className="relative mb-16 overflow-hidden border-y border-white/10 py-4">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[...TOOLS, ...TOOLS].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-pixel text-[12px] tracking-[0.18em] text-white/35"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <FadeIn className="relative">
        <h2
          className="steel max-w-3xl text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl"
          style={{ lineHeight: 0.9 }}
        >
          Two ways this goes
        </h2>
      </FadeIn>

      <div className="relative mt-12 grid gap-5 md:grid-cols-2">
        <FadeIn delay={0.1}>
          <div className="glass flex h-full flex-col rounded-3xl p-7 md:p-9">
            <div className="font-pixel text-[11px] tracking-[0.24em] text-live">
              DOOR 01 — YOU&apos;RE HIRING
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-chalk md:text-3xl">
              Growth marketer who runs paid acquisition as a research problem
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
              Market mapping, controlled tests, CPL/CPA unit economics, and the
              automation that reports on it. The delivery system above is the
              method — it transfers to any acquisition problem.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${IDENTITY.email}`}
                className="glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium tracking-widest text-white"
              >
                DOWNLOAD RÉSUMÉ
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] tracking-widest text-white/60 transition-colors hover:text-white"
              >
                <Link2 className="h-4 w-4" />
                LINKEDIN
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="glass flex h-full flex-col rounded-3xl p-7 md:p-9">
            <div className="font-pixel text-[11px] tracking-[0.24em] text-live">
              DOOR 02 — YOU&apos;RE LAUNCHING
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-chalk md:text-3xl">
              Research before spend. ₹40k proof. Then scale.
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
              Phase 0 starts with a questionnaire, not a proposal. Absolute
              transparency — dashboard plus weekly reporting. No black box.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${IDENTITY.email}?subject=Phase%200%20call`}
                className="inline-flex items-center gap-2 rounded-full bg-live px-5 py-2.5 text-[12px] font-bold tracking-widest text-ink transition-opacity hover:opacity-90"
              >
                BOOK A PHASE 0 CALL
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${IDENTITY.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] tracking-widest text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                WHATSAPP
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <footer className="relative mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
        <div>
          <div className="text-lg tracking-wide text-chalk">
            V. SAI <span className="font-pixel text-2xl">KAVSHIK</span>
          </div>
          <p className="font-pixel mt-2 text-[11px] leading-relaxed text-white/40">
            {IDENTITY.firm} · {IDENTITY.city}
            <br />
            {IDENTITY.disciplines}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[12px] text-white/50 sm:items-end">
          <a
            href={`mailto:${IDENTITY.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />
            {IDENTITY.email}
          </a>
          <a
            href={`tel:${IDENTITY.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            {IDENTITY.phone}
          </a>
          <span className="font-pixel mt-2 text-[10px] tracking-widest text-white/25">
            AUGUST 2026 · QD &amp; CO.
          </span>
        </div>
      </footer>
    </section>
  )
}
