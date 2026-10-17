/**
 * Prepares the reference creatives for the ad reel.
 *
 * The source folder holds 12 files totalling ~20MB — PNG exports and WhatsApp
 * JPEGs at full creative resolution. Shipping those to a strip that renders each
 * one about 250 CSS px wide would be roughly 20MB of page weight for thumbnails,
 * so each is resampled down and re-encoded as JPEG.
 *
 * Reuses the Catmull-Rom two-pass resampler from reencode-shots.mjs: a box
 * average at this reduction turns fine ad copy to mush, and cubic keeps the
 * type legible at tile size.
 *
 * Output is a manifest as well as the images, so the site's reel data is
 * generated from what actually exists on disk rather than hand-listed — a
 * hand-list is how the last asset ended up 404ing.
 *
 * Usage: node make-adreel.mjs
 */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

const SRC = 'C:/Users/USER/OneDrive/Desktop/VS Code Files/QDnCo/Reference creatives'
const OUT = 'public/adreel'
const TARGET_W = 620          // ~2.5x the largest rendered tile width
const QUALITY = 82

function cubic(t) {
  const a = Math.abs(t)
  if (a <= 1) return 1.5 * a * a * a - 2.5 * a * a + 1
  if (a < 2) return -0.5 * a * a * a + 2.5 * a * a - 4 * a + 2
  return 0
}

/* One axis at a time; two passes give a separable 2D cubic. */
function resample1D(src, sw, sh, target, horizontal) {
  const outW = horizontal ? target : sw
  const outH = horizontal ? sh : target
  const out = Buffer.alloc(outW * outH * 4)
  const scale = (horizontal ? sw : sh) / target
  const support = Math.max(1, scale) * 2

  for (let o = 0; o < target; o++) {
    const center = (o + 0.5) * scale - 0.5
    const start = Math.max(0, Math.ceil(center - support))
    const end = Math.min((horizontal ? sw : sh) - 1, Math.floor(center + support))
    const weights = []
    let wsum = 0
    for (let i = start; i <= end; i++) {
      const w = cubic((i - center) / Math.max(1, scale))
      weights.push(w); wsum += w
    }
    const lines = horizontal ? sh : sw
    for (let l = 0; l < lines; l++) {
      let r = 0, g = 0, b = 0, a = 0
      for (let i = start, k = 0; i <= end; i++, k++) {
        const w = weights[k] / (wsum || 1)
        const si = horizontal ? (l * sw + i) * 4 : (i * sw + l) * 4
        r += src[si] * w; g += src[si + 1] * w; b += src[si + 2] * w; a += src[si + 3] * w
      }
      const di = horizontal ? (l * outW + o) * 4 : (o * outW + l) * 4
      out[di] = Math.max(0, Math.min(255, Math.round(r)))
      out[di + 1] = Math.max(0, Math.min(255, Math.round(g)))
      out[di + 2] = Math.max(0, Math.min(255, Math.round(b)))
      out[di + 3] = Math.max(0, Math.min(255, Math.round(a)))
    }
  }
  return { data: out, w: outW, h: outH }
}

function decode(file) {
  const buf = fs.readFileSync(file)
  if (/\.png$/i.test(file)) {
    const p = PNG.sync.read(buf)
    return { data: p.data, w: p.width, h: p.height }
  }
  const j = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true })
  return { data: Buffer.from(j.data), w: j.width, h: j.height }
}

if (!fs.existsSync(SRC)) { console.error('source folder not found:', SRC); process.exit(1) }
fs.mkdirSync(OUT, { recursive: true })
for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f))

/* ── One ratio, no compromise ──
 * Every creative in the folder is a true 9:16, so the tile is 9:16 and the
 * frame ratio equals the artwork ratio: nothing is cropped and nothing is
 * letterboxed. The five that arrived at 2:3 were converted by
 * convert-creatives-916.mjs, which EXTENDS the flat footer band downward
 * rather than cutting anything — see the note in that file.
 *
 * The ratio check stays as a guard: a future drop-in that is not 9:16 is named
 * and skipped rather than silently distorted.
 */
const TARGET_RATIO = 9 / 16
const RATIO_TOL = 0.02
const DROP = [
  /* Asked to be pulled from the reel. */
  'WhatsApp Image 2026-08-07 at 12.02.46 PM (1) [9x16].png',
]

const all = fs.readdirSync(SRC)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .filter((f) => !DROP.includes(f))
  .sort()
const files = []
const skipped = []
for (const f of all) {
  const d = decode(path.join(SRC, f))
  const r = d.w / d.h
  if (Math.abs(r - TARGET_RATIO) <= RATIO_TOL) files.push(f)
  else skipped.push(`${f}  (${d.w}x${d.h}, ratio ${r.toFixed(3)})`)
}
if (skipped.length) {
  console.log(`
skipped ${skipped.length} off-ratio file(s) — run convert-creatives-916.mjs:`)
  for (const sk of skipped) console.log('  ' + sk)
  console.log('')
}
if (!files.length) { console.error('no 9:16 creatives found in ' + SRC); process.exit(1) }

const manifest = []
let inBytes = 0, outBytes = 0

for (const [i, f] of files.entries()) {
  const full = path.join(SRC, f)
  inBytes += fs.statSync(full).size
  const src = decode(full)

  const scale = Math.min(1, TARGET_W / src.w)
  const tw = Math.max(1, Math.round(src.w * scale))
  const th = Math.max(1, Math.round(src.h * scale))

  const pass1 = resample1D(src.data, src.w, src.h, tw, true)
  const pass2 = resample1D(pass1.data, pass1.w, pass1.h, th, false)

  const name = `ad-${String(i + 1).padStart(2, '0')}.jpg`
  const jp = jpeg.encode({ data: pass2.data, width: pass2.w, height: pass2.h }, QUALITY)
  fs.writeFileSync(path.join(OUT, name), jp.data)
  outBytes += jp.data.length

  const ratio = pass2.w / pass2.h
  manifest.push({
    file: name,
    w: pass2.w,
    h: pass2.h,
    /* Every tile is 9:16 by construction, so the shape is informational only. */
    shape: '9:16',
    ratio: +ratio.toFixed(4),
    source: f,
  })
  console.log(`  ${name}  ${String(pass2.w).padStart(4)}x${String(pass2.h).padStart(4)}  ` +
              `${(jp.data.length / 1024).toFixed(0).padStart(4)} KB  ← ${f.slice(0, 46)}`)
}

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`\n${files.length} creatives`)
console.log(`in   ${(inBytes / 1048576).toFixed(1)} MB`)
console.log(`out  ${(outBytes / 1048576).toFixed(2)} MB  (${(100 - outBytes / inBytes * 100).toFixed(0)}% smaller)`)
console.log(`manifest → ${path.join(OUT, 'manifest.json')}`)
