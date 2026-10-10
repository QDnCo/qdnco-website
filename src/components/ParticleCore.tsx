import { useEffect, useRef, useState } from 'react'
import { JOURNEY } from '../lib/data'

/**
 * THE CORE — a volumetric scan of the operator, with the record orbiting it.
 *
 * The portrait is shot on white with a near-black suit, so a luminance
 * threshold separates subject from backdrop cleanly: bright pixels are simply
 * never sampled and there is no background to hide. What survives becomes a
 * point cloud, given volume by a cosine bulge on Z and split into a front and
 * back shell so the silhouette stays convincing through a full rotation.
 *
 * Everything is one canvas + real 3D projection — no WebGL, no model pipeline.
 * Labels are DOM (so type stays crisp) positioned by the same projection.
 *
 * Scroll drives rotation and advances the journey stations. Drag overrides.
 */

const DEPTH = 900 // perspective distance
const SAMPLE_W = 250 // portrait is downscaled to this before sampling
const STEP = 2
const LUMA_CUT = 224 // above this = backdrop, discarded
const BULGE = 78

type P = { x: number; y: number; z: number; r: number; g: number; b: number }

const ORBITS: string[][] = [
  ['100+ UNITS', '3–4 MONTHS', 'NO BUDGET'],
  ['500+ CLIENTS', '10,000+ ORDERS', 'PAYTM', 'ZEPTO', 'GOOGLE DSC'],
  ['₹5–6L / MONTH', 'META + GOOGLE', 'AI PIPELINES'],
  ['₹266 CPL', '51% SALES-READY', '₹2.75 CR', '625× PEAK'],
]

export default function ParticleCore() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  const cloud = useRef<P[]>([])
  const scrollP = useRef(0)
  const dragOffset = useRef(0)
  const dragging = useRef(false)
  const dragStart = useRef({ px: 0, base: 0 })
  const raf = useRef(0)

  const [station, setStation] = useState(0)
  const [ready, setReady] = useState(false)

  /* ── Build the point cloud from the portrait ── */
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/portrait.jpg'
    img.onload = () => {
      const h = Math.round((img.height / img.width) * SAMPLE_W)
      const off = document.createElement('canvas')
      off.width = SAMPLE_W
      off.height = h
      const octx = off.getContext('2d', { willReadFrequently: true })!
      octx.drawImage(img, 0, 0, SAMPLE_W, h)
      const { data } = octx.getImageData(0, 0, SAMPLE_W, h)

      const pts: P[] = []
      let n = 0
      for (let y = 0; y < h; y += STEP) {
        for (let x = 0; x < SAMPLE_W; x += STEP) {
          const i = (y * SAMPLE_W + x) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const lum = 0.299 * r + 0.587 * g + 0.114 * b
          if (lum > LUMA_CUT) continue // backdrop — never sampled

          const nx = x - SAMPLE_W / 2
          const ny = y - h / 2
          // Cosine bulge: full depth at the centre line, tapering to the edges.
          const t = Math.abs(nx) / (SAMPLE_W / 2)
          const shell = Math.cos(Math.min(t, 1) * (Math.PI / 2)) * BULGE
          const side = n % 2 === 0 ? 1 : -1
          n++

          // Cool scan tint: deep green-slate through to chalk by luminance.
          const k = lum / 255
          pts.push({
            x: nx * 2.05,
            y: ny * 2.05,
            z: side * shell + (Math.random() - 0.5) * 9,
            r: Math.round(34 + k * 190),
            g: Math.round(74 + k * 158),
            b: Math.round(62 + k * 166),
          })
        }
      }
      cloud.current = pts
      setReady(true)
    }
  }, [])

  /* ── Scroll → progress + active station ── */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      scrollP.current = p
      const s = Math.min(JOURNEY.length - 1, Math.floor(p * JOURNEY.length))
      setStation((prev) => (prev === s ? prev : s))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /* ── Render loop ── */
  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2
      // Fit the cloud to the viewport height.
      const fit = Math.min(w / 620, h / 700, 1.15)

      const angle = scrollP.current * Math.PI * 3 + dragOffset.current

      ctx.clearRect(0, 0, w, h)

      const ca = Math.cos(angle)
      const sa = Math.sin(angle)

      /* Orbit rings — drawn behind and in front by depth */
      const rings = [
        { rad: 330, tilt: 0.34, y: -40 },
        { rad: 420, tilt: -0.2, y: 90 },
        { rad: 260, tilt: 0.5, y: 210 },
      ]
      rings.forEach((ring, ri) => {
        ctx.beginPath()
        for (let a = 0; a <= 64; a++) {
          const t = (a / 64) * Math.PI * 2
          const x0 = Math.cos(t) * ring.rad
          const z0 = Math.sin(t) * ring.rad
          const rx = x0 * ca + z0 * sa
          const rz = -x0 * sa + z0 * ca
          const yy = ring.y + Math.sin(t) * ring.rad * ring.tilt
          const s = DEPTH / (DEPTH + rz * fit)
          const px = cx + rx * fit * s
          const py = cy + yy * fit * s
          if (a === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = ri === 1 ? 'rgba(94,233,160,0.20)' : 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      /* Point cloud — painter's algorithm via two passes on depth sign */
      const pts = cloud.current
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i]
          const rz = -p.x * sa + p.z * ca
          const behind = rz > 0
          if ((pass === 0) !== behind) continue

          const rx = p.x * ca + p.z * sa
          const s = (DEPTH / (DEPTH + rz * fit)) * fit
          const px = cx + rx * s
          const py = cy + p.y * s

          // Depth cue: back shell recedes into the page.
          const depth = 1 - (rz + BULGE) / (BULGE * 2)
          const alpha = 0.26 + depth * 0.62
          const size = Math.max(0.7, 1.9 * s)

          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`
          ctx.fillRect(px, py, size, size)
        }
      }

      /* Project the orbiting labels onto ring 1 */
      const labels = labelRefs.current
      const count = ORBITS[station].length
      for (let i = 0; i < labels.length; i++) {
        const el = labels[i]
        if (!el) continue
        if (i >= count) {
          el.style.opacity = '0'
          continue
        }
        const t = (i / count) * Math.PI * 2 + angle * 0.55
        const x0 = Math.cos(t) * 420
        const z0 = Math.sin(t) * 420
        const rx = x0 * ca + z0 * sa
        const rz = -x0 * sa + z0 * ca
        const yy = 90 + Math.sin(t) * 420 * -0.2
        const s = DEPTH / (DEPTH + rz * fit)
        const px = cx + rx * fit * s
        const py = cy + yy * fit * s
        const front = 1 - (rz + 420) / 840
        el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${(0.72 + front * 0.36).toFixed(3)})`
        el.style.opacity = String(0.2 + front * 0.8)
        el.style.zIndex = front > 0.5 ? '20' : '5'
      }

      raf.current = requestAnimationFrame(draw)
    }

    raf.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [ready, station])

  /* ── Manual rotation ── */
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true
    dragStart.current = { px: e.clientX, base: dragOffset.current }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    dragOffset.current = dragStart.current.base + (e.clientX - dragStart.current.px) * 0.006
  }
  const onUp = (e: React.PointerEvent) => {
    dragging.current = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
  }

  const active = JOURNEY[station]

  return (
    <section id="core" ref={sectionRef} className="relative h-[460vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="gridlines absolute inset-0 opacity-30" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 50% 48%, rgba(94,233,160,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Canvas + orbiting labels */}
        <div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <canvas ref={canvasRef} className="h-full w-full" />

          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  labelRefs.current[i] = el
                }}
                className="glass font-pixel absolute left-0 top-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.18em] text-live"
                style={{ willChange: 'transform, opacity', opacity: 0 }}
              >
                {ORBITS[station][i] ?? ''}
              </div>
            ))}
          </div>
        </div>

        {/* Section framing */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 py-8 sm:px-8 md:px-12 lg:px-16">
          <div>
            <div className="font-pixel text-[12px] tracking-[0.28em] text-live">
              // THE CORE — JOURNEY MAP
            </div>
            <h2
              className="steel mt-1 max-w-md text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl"
              style={{ lineHeight: 0.9 }}
            >
              Operator first
            </h2>
          </div>

          {/* Active station */}
          <div className="max-w-sm">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-pixel text-[11px] tracking-[0.24em] text-live">
                  {active.year}
                </span>
                <span className="font-pixel text-[11px] tracking-widest text-white/30">
                  0{station + 1} / 0{JOURNEY.length}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-chalk md:text-2xl">
                {active.venture}
              </h3>
              <p className="font-pixel mt-1 text-[11px] text-white/50">
                {active.built}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/65">
                {active.detail}
              </p>
              <div className="mt-4 border-t border-white/10 pt-3 text-base font-semibold tracking-tight text-live">
                {active.proof}
              </div>
            </div>

            {/* Station rail */}
            <div className="mt-4 flex gap-1.5">
              {JOURNEY.map((s, i) => (
                <div
                  key={s.venture}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                    i <= station ? 'bg-live' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>

            <div className="font-pixel mt-3 text-[10px] tracking-[0.2em] text-white/30">
              SCROLL TO TRAVEL · DRAG TO ROTATE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
