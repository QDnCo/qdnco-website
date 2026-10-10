import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, X, ArrowDown } from 'lucide-react'
import { IDENTITY, META_GRID, TRACK_RECORD } from '../lib/data'

const LINKS = [
  { label: 'SERVICES', href: '#services' },
  { label: 'JOURNEY', href: '#core' },
  { label: 'SYSTEM', href: '#system' },
  { label: 'WORK', href: '#work' },
  { label: 'TALK', href: '#talk' },
]

const rise = {
  initial: { opacity: 0, y: 24, filter: 'blur(9px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * Hero is deliberately typographic — no portrait. The figure appears later,
 * mid-scroll, as the Core. Opening on a claim rather than a face keeps the
 * page reading as a practice instead of a personal brand.
 */
export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      <div className="gridlines absolute inset-0 opacity-[0.55]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 70% at 50% 0%, rgba(255,255,255,0.055) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ── NAV ── */}
        <motion.nav
          {...rise}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-between py-6"
        >
          <div className="flex items-baseline gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-live text-[13px] font-black text-ink">
              K
            </span>
            <span className="font-pixel text-[11px] tracking-[0.28em] text-white/50">
              QD &amp; CO.
            </span>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-pixel text-[11px] tracking-[0.22em] text-white/70 transition-opacity hover:opacity-60"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#talk"
              className="glass-strong flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium tracking-widest text-white"
            >
              BOOK PHASE 0
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 transition-opacity hover:opacity-70 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </motion.nav>

        {/* ── STATEMENT ── */}
        <div className="flex flex-1 flex-col justify-center py-10">
          <motion.div
            {...rise}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="glass mb-8 inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3.5">
              <span className="rounded-full bg-live px-2.5 py-0.5 text-[10px] font-bold text-ink">
                LIVE
              </span>
              <span className="font-pixel text-[11px] text-white/75">
                Brigade Jeevan Sandya · launch window open
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...rise}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-[15ch] text-[3rem] font-medium uppercase tracking-tight text-chalk sm:text-[4.2rem] md:text-[5.4rem] lg:text-[6.4rem] xl:text-[7.4rem]"
            style={{ lineHeight: 0.8 }}
          >
            I build{' '}
            <span className="font-pixel steel inline-block text-[1.2em] leading-none">
              demand systems
            </span>{' '}
            for high-ticket{' '}
            <span className="font-pixel steel inline-block text-[1.2em] leading-none">
              launches
            </span>
          </motion.h1>

          <motion.div
            {...rise}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 grid gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                {META_GRID.whatIDo}
              </p>
              <p className="font-pixel mt-4 text-[12px] leading-relaxed text-live/85">
                {IDENTITY.thesis}
              </p>
            </div>

            <div className="lg:col-span-7 lg:justify-self-end">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:gap-x-10">
                {TRACK_RECORD.map((s) => (
                  <div key={s.label} title={s.note} className="cursor-help">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold tracking-tight text-chalk md:text-2xl">
                        {s.value}
                      </span>
                      <span className="font-pixel text-[10px] text-white/45">
                        {s.unit}
                      </span>
                    </div>
                    <div className="font-pixel mt-1 text-[10px] leading-tight text-white/45">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-pixel mt-5 text-[10px] leading-relaxed text-white/25">
                Pipeline = site-visit-stage lead value at project ticket price. Not closed revenue.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── FOOT ── */}
        <motion.div
          {...rise}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 py-6"
        >
          <div>
            <div className="text-base tracking-wide text-chalk">
              V. SAI <span className="font-pixel text-2xl">KAVSHIK</span>
            </div>
            <p className="font-pixel mt-1 text-[11px] text-white/45">
              {IDENTITY.disciplines} · {IDENTITY.city}
            </p>
          </div>

          <a
            href="#services"
            className="font-pixel flex items-center gap-2 text-[11px] tracking-[0.22em] text-white/45 transition-colors hover:text-white"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            SERVICES
          </a>
        </motion.div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md transition-all duration-500 ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-live text-[13px] font-black text-ink">
            K
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 transition-opacity hover:opacity-70"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`font-pixel text-2xl tracking-widest text-chalk transition-all duration-500 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
