/**
 * Normalises every creative in the reference folder to a true 9:16.
 *
 * The folder holds two ratios — 0.563 and 0.667 — and a single frame cannot
 * crop both from the bottom: whichever group is squatter than the frame loses
 * its sides instead. Rather than compromise the frame, the squat creatives are
 * converted.
 *
 * Conversion is by EXTENSION, not by cropping. Going from 0.667 to 0.5625 means
 * either cutting 15.6% off the width — which takes content off both sides — or
 * adding 18.5% of canvas height, which takes nothing. Every one of these
 * creatives ends in a flat footer band (measured deviation across the last row
 * is 0.1–0.9 of 255), so the added height is that same colour and reads as the
 * band simply being taller. Nothing is lost and nothing is invented.
 *
 * A short ramp blends the first added rows out of the true last row, so the
 * join survives even where the footer carries a slight gradient.
 *
 * Originals are moved to _originals/ rather than deleted. The build reads the
 * folder non-recursively, so they are out of the way, and a lossy step that
 * cannot be undone should not be the default.
 */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

const SRC = 'C:/Users/USER/OneDrive/Desktop/VS Code Files/QDnCo/Reference creatives'
const KEEP = path.join(SRC, '_originals')
const TARGET = 9 / 16
const TOL = 0.02
const RAMP = 10              // rows blended from real content into the flat fill

const decode = (f) => {
  const b = fs.readFileSync(f)
  if (/\.png$/i.test(f)) { const g = PNG.sync.read(b); return { w: g.width, h: g.height, d: g.data } }
  const g = jpeg.decode(b, { maxMemoryUsageInMB: 1024 })
  return { w: g.width, h: g.height, d: g.data }
}

if (!fs.existsSync(SRC)) { console.error('source folder not found:', SRC); process.exit(1) }

const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()
let converted = 0, already = 0

for (const f of files) {
  const full = path.join(SRC, f)
  const img = decode(full)
  const ratio = img.w / img.h

  if (Math.abs(ratio - TARGET) <= TOL) { already++; continue }

  if (ratio < TARGET) {
    /* Taller than 9:16. Extending would need width, which means inventing
       pixels beside real content — refuse rather than guess. */
    console.log(`  SKIP  ${f}  (ratio ${ratio.toFixed(3)} is taller than 9:16; would need side fill)`)
    continue
  }

  const newH = Math.round(img.w / TARGET)
  const addH = newH - img.h

  /* The fill colour is the mean of the true last row. */
  let mr = 0, mg = 0, mb = 0
  for (let x = 0; x < img.w; x++) {
    const i = ((img.h - 1) * img.w + x) << 2
    mr += img.d[i]; mg += img.d[i + 1]; mb += img.d[i + 2]
  }
  mr /= img.w; mg /= img.w; mb /= img.w

  const out = new PNG({ width: img.w, height: newH })
  /* Original, unchanged, at the top. */
  for (let y = 0; y < img.h; y++) {
    for (let x = 0; x < img.w; x++) {
      const s = (y * img.w + x) << 2, t = (y * img.w + x) << 2
      out.data[t] = img.d[s]; out.data[t + 1] = img.d[s + 1]
      out.data[t + 2] = img.d[s + 2]; out.data[t + 3] = 255
    }
  }
  /* Added band: each row eases from that column's own last pixel to the flat
     mean over RAMP rows, then holds. */
  for (let k = 0; k < addH; k++) {
    const y = img.h + k
    const t = Math.min(1, k / RAMP)
    for (let x = 0; x < img.w; x++) {
      const s = ((img.h - 1) * img.w + x) << 2
      const o = (y * img.w + x) << 2
      out.data[o]     = Math.round(img.d[s] * (1 - t) + mr * t)
      out.data[o + 1] = Math.round(img.d[s + 1] * (1 - t) + mg * t)
      out.data[o + 2] = Math.round(img.d[s + 2] * (1 - t) + mb * t)
      out.data[o + 3] = 255
    }
  }

  const base = f.replace(/\.(png|jpe?g)$/i, '')
  const outName = `${base} [9x16].png`
  fs.writeFileSync(path.join(SRC, outName), PNG.sync.write(out))

  fs.mkdirSync(KEEP, { recursive: true })
  fs.renameSync(full, path.join(KEEP, f))

  console.log(`  ${img.w}x${img.h} (${ratio.toFixed(3)})  ->  ${img.w}x${newH} (${(img.w / newH).toFixed(3)})` +
              `   +${addH}px  rgb(${Math.round(mr)},${Math.round(mg)},${Math.round(mb)})   ${f.slice(0, 40)}`)
  converted++
}

console.log(`\n${already} already 9:16, ${converted} converted`)
if (converted) console.log(`originals moved to ${KEEP}`)
