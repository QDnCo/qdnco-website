/**
 * Builds public/brands/platforms/higgsfield.svg from the supplied logo raster.
 *
 * The file that shipped before was a placeholder — a rounded square with an "H"
 * — invented because the real mark was not in the project. This traces the
 * actual artwork instead.
 *
 * Only the squiggle glyph is taken, not the full lockup: the platform strip
 * renders a mark and then writes the product's name beside it, so importing the
 * wordmark would read "Higgsfield Higgsfield".
 *
 * Vector rather than a cropped PNG because the glyph is ~38px wide in the
 * source and the strip draws it at up to 28px CSS — on a 2x display that is a
 * visible upscale, sitting next to Meta, Google and X, which are all SVG.
 *
 * Pipeline: isolate the glyph, supersample the coverage so the contour has
 * sub-pixel accuracy, march the squares to closed loops, then Chaikin-smooth.
 * Tracing the 38px bitmap directly gives a staircase; supersampling first is
 * what makes the curve read as drawn rather than as pixels.
 */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'

const SRC = process.argv[2] || 'C:/Users/USER/Downloads/download.png'
const OUT = 'public/brands/platforms/higgsfield.svg'

const SS = 4          // supersample factor
const CHAIKIN = 3     // corner-cutting passes
const INK = 0.5       // coverage threshold

const png = PNG.sync.read(fs.readFileSync(SRC))
const { width: W, height: H, data } = png

/* Coverage in 0..1, 1 = full ink. Taken from luminance and premultiplied by
   alpha so a transparent source behaves the same as a white-backed one. */
const cov = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return 0
  const i = (y * W + x) << 2
  const a = data[i + 3] / 255
  const l = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
  return (1 - l) * a
}

/* ── Isolate the glyph ───────────────────────────────────────────────────── */
const colInk = new Array(W).fill(0)
for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) if (cov(x, y) > INK) colInk[x]++

const xs = colInk.map((v, i) => [i, v]).filter((a) => a[1] > 0).map((a) => a[0])
if (!xs.length) throw new Error('no ink found in ' + SRC)

/* The lockup is glyph, gap, wordmark. Cut at the first gap of 4px or more. */
let gapEnd = xs[xs.length - 1]
let run = 0
for (let x = xs[0]; x <= xs[xs.length - 1]; x++) {
  if (colInk[x] === 0) { run++ } else { if (run >= 4) { gapEnd = x - run - 1; break } run = 0 }
}
const gx0 = xs[0]
const gx1 = gapEnd

let gy0 = H, gy1 = 0
for (let y = 0; y < H; y++) {
  for (let x = gx0; x <= gx1; x++) {
    if (cov(x, y) > INK) { if (y < gy0) gy0 = y; if (y > gy1) gy1 = y; break }
  }
}
const gw = gx1 - gx0 + 1
const gh = gy1 - gy0 + 1
console.log(`glyph        x ${gx0}-${gx1}  y ${gy0}-${gy1}   (${gw}x${gh})`)

/* ── Supersampled binary mask, with a 1px transparent margin so every contour
      is closed rather than running off the edge ──────────────────────────── */
const MW = gw * SS + 2
const MH = gh * SS + 2
const mask = new Uint8Array(MW * MH)

const bilinear = (fx, fy) => {
  const x0 = Math.floor(fx), y0 = Math.floor(fy)
  const tx = fx - x0, ty = fy - y0
  const a = cov(x0, y0), b = cov(x0 + 1, y0)
  const c = cov(x0, y0 + 1), d = cov(x0 + 1, y0 + 1)
  return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty
}

for (let my = 1; my < MH - 1; my++) {
  for (let mx = 1; mx < MW - 1; mx++) {
    const fx = gx0 + (mx - 1 + 0.5) / SS - 0.5
    const fy = gy0 + (my - 1 + 0.5) / SS - 0.5
    mask[my * MW + mx] = bilinear(fx, fy) > INK ? 1 : 0
  }
}

/* ── Marching squares ────────────────────────────────────────────────────── */
const at = (x, y) => (x < 0 || y < 0 || x >= MW || y >= MH ? 0 : mask[y * MW + x])

/* Emit the contour segments cell by cell, then stitch them into loops by
   matching endpoints. Going through segments rather than walking the lattice
   directly keeps the two saddle cases explicit — a hand-written turn table got
   them wrong and collapsed the glyph to 45 points. */
const KEY = (x, y) => `${Math.round(x * 2)},${Math.round(y * 2)}`
const segs = []

for (let y = 0; y < MH - 1; y++) {
  for (let x = 0; x < MW - 1; x++) {
    const a = at(x, y), b = at(x + 1, y), c = at(x, y + 1), d = at(x + 1, y + 1)
    const code = a | (b << 1) | (d << 2) | (c << 3)
    if (code === 0 || code === 15) continue
    const T = [x + 0.5, y], R = [x + 1, y + 0.5], B = [x + 0.5, y + 1], L = [x, y + 0.5]
    const push = (p, q) => segs.push([p, q])
    switch (code) {
      case 1:  push(L, T); break
      case 2:  push(T, R); break
      case 3:  push(L, R); break
      case 4:  push(R, B); break
      case 5:  push(L, T); push(R, B); break   // saddle
      case 6:  push(T, B); break
      case 7:  push(L, B); break
      case 8:  push(B, L); break
      case 9:  push(B, T); break
      case 10: push(T, R); push(B, L); break   // saddle
      case 11: push(R, B); break
      case 12: push(R, L); break
      case 13: push(T, R); break
      case 14: push(L, T); break
    }
  }
}

/* Stitch. The segments are treated as UNDIRECTED: the per-case lookup above
   emits them in whatever winding reads most naturally for that case, so half of
   them point "backwards" relative to their neighbour. Chaining on start-point
   only therefore dead-ends after a few steps and leaves the glyph in fragments.
   Matching either end and flipping as needed closes every loop. */
const ends = new Map()
const add = (k, s) => { if (!ends.has(k)) ends.set(k, []); ends.get(k).push(s) }
for (const s of segs) {
  add(KEY(s[0][0], s[0][1]), s)
  add(KEY(s[1][0], s[1][1]), s)
}

const used = new Set()
const contours = []
for (const s0 of segs) {
  if (used.has(s0)) continue
  used.add(s0)
  const loop = [s0[0], s0[1]]
  let guard = 0
  /* Walk forward from the tail until we return to the head or run dry. */
  for (;;) {
    const tail = loop[loop.length - 1]
    const cand = (ends.get(KEY(tail[0], tail[1])) || []).find((s) => !used.has(s))
    if (!cand) break
    used.add(cand)
    const [p, q] = cand
    const next = KEY(p[0], p[1]) === KEY(tail[0], tail[1]) ? q : p
    loop.push(next)
    if (++guard > segs.length + 4) break
  }
  if (loop.length >= 12) contours.push(loop)
}
console.log(`segments     ${segs.length}`)
console.log(`contours     ${contours.length}  (${contours.map((c) => c.length).join(', ')} pts)`)

/* ── Smoothing ───────────────────────────────────────────────────────────── */

/* A moving average first. The traced boundary is a staircase of axis-aligned
   half-pixel steps; Chaikin alone rounds each step into its own little bump,
   which is what made the first render look lumpy. Averaging flattens the
   staircase into a line before the corner cutting rounds it. */
const boxBlur = (pts, win, passes) => {
  let p = pts
  for (let k = 0; k < passes; k++) {
    const n = p.length
    const out = new Array(n)
    for (let i = 0; i < n; i++) {
      let sx = 0, sy = 0
      for (let j = -win; j <= win; j++) {
        const q = p[(i + j + n * 2) % n]
        sx += q[0]; sy += q[1]
      }
      out[i] = [sx / (win * 2 + 1), sy / (win * 2 + 1)]
    }
    p = out
  }
  return p
}

const chaikin = (pts, n) => {
  let p = pts
  for (let k = 0; k < n; k++) {
    const out = []
    for (let i = 0; i < p.length; i++) {
      const [x0, y0] = p[i]
      const [x1, y1] = p[(i + 1) % p.length]
      out.push([x0 * 0.75 + x1 * 0.25, y0 * 0.75 + y1 * 0.25])
      out.push([x0 * 0.25 + x1 * 0.75, y0 * 0.25 + y1 * 0.75])
    }
    p = out
  }
  return p
}

/* Ramer-Douglas-Peucker, so the emitted path carries only points that actually
   describe the curve. Without it the file is 17 KB of collinear noise. */
const rdp = (pts, eps) => {
  if (pts.length < 3) return pts
  const keep = new Uint8Array(pts.length)
  keep[0] = keep[pts.length - 1] = 1
  const stack = [[0, pts.length - 1]]
  while (stack.length) {
    const [i0, i1] = stack.pop()
    const [x0, y0] = pts[i0], [x1, y1] = pts[i1]
    const dx = x1 - x0, dy = y1 - y0
    const len = Math.hypot(dx, dy) || 1
    let best = -1, bestD = eps
    for (let i = i0 + 1; i < i1; i++) {
      const d = Math.abs((pts[i][0] - x0) * dy - (pts[i][1] - y0) * dx) / len
      if (d > bestD) { bestD = d; best = i }
    }
    if (best > 0) { keep[best] = 1; stack.push([i0, best], [best, i1]) }
  }
  return pts.filter((_, i) => keep[i])
}

/* ── Emit ────────────────────────────────────────────────────────────────── */
const VB = 100
const sx = VB / (gw * SS)
const fmt = (v) => (Math.round(v * 100) / 100).toString().replace(/^0\./, '.').replace(/^-0\./, '-.')

const paths = contours.map((c) => {
  const smoothed = chaikin(boxBlur(c, 2, 1), 3)
  /* Scale into viewBox units first so the RDP tolerance is expressed in the
     same space as the output coordinates. */
  const scaled = smoothed.map(([x, y]) => [(x - 1) * sx, (y - 1) * sx])
  const pts = rdp(scaled, 0.16)
  /* Quadratic through midpoints: each retained point becomes a control point
     and the curve passes through the midpoint between neighbours, which keeps
     the stroke round without needing a real curve fit. */
  const n = pts.length
  const mid = (i, j) => [(pts[i][0] + pts[j][0]) / 2, (pts[i][1] + pts[j][1]) / 2]
  let d = `M${fmt(mid(0, 1)[0])} ${fmt(mid(0, 1)[1])}`
  for (let i = 1; i <= n; i++) {
    const cur = pts[i % n]
    const m = mid(i % n, (i + 1) % n)
    d += `Q${fmt(cur[0])} ${fmt(cur[1])} ${fmt(m[0])} ${fmt(m[1])}`
  }
  return d + 'Z'
})

const vbH = Math.round((gh * SS) * sx)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${vbH}" role="img" aria-label="Higgsfield">
  <title>Higgsfield</title>
  <path fill="#000" fill-rule="evenodd" d="${paths.join('')}"/>
</svg>
`

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, svg)
console.log(`points       ${paths.map((p) => (p.match(/Q/g) || []).length).join(', ')} curves`)
console.log(`viewBox      0 0 ${VB} ${vbH}`)
console.log(`written      ${OUT}   ${(svg.length / 1024).toFixed(1)} KB`)
