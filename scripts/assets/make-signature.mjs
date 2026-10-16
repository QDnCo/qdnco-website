/**
 * Turns the supplied signature scan into a transparent, tightly-cropped asset.
 *
 * The source is black ink on a white plate. Dropped straight onto the page that
 * plate would show as a white rectangle on the dark ground, so coverage is
 * derived the same way the brand marks do it: how far each pixel sits from
 * white becomes its alpha, and every surviving pixel is painted pure black.
 * Black rather than the theme colour, because a single black-on-transparent
 * asset can be inverted to white with one CSS filter — two files would drift.
 *
 * Cropping to the ink matters for the animation: the reveal sweeps across the
 * image box, so any white margin baked into the source would be dead time at
 * each end of the sweep where nothing appears to happen.
 *
 * Usage: node scripts/assets/make-signature.mjs "<path to source png>"
 */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'

const SRC = process.argv[2]
if (!SRC || !fs.existsSync(SRC)) {
  console.error('usage: node scripts/assets/make-signature.mjs "<source.png>"')
  process.exit(1)
}
const OUT = 'public/signature.png'

const src = PNG.sync.read(fs.readFileSync(SRC))
const { width: W, height: H, data } = src

/* Coverage: 0 at pure white, 1 at pure black. Using the darkest channel rather
   than luminance keeps thin antialiased hairlines from washing out — the strokes
   in this signature get down to a pixel or two wide in places. */
const cover = new Float32Array(W * H)
let minX = W, minY = H, maxX = -1, maxY = -1
for (let i = 0, p = 0; i < data.length; i += 4, p++) {
  const darkest = Math.min(data[i], data[i + 1], data[i + 2])
  const a = data[i + 3] / 255
  /* A fully transparent source pixel contributes nothing regardless of colour. */
  const c = a * (1 - darkest / 255)
  cover[p] = c
  if (c > 0.12) {
    const x = p % W, y = (p / W) | 0
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
}
if (maxX < 0) { console.error('no ink found — is the source blank?'); process.exit(1) }

/* A couple of pixels of breathing room so the crop does not clip antialiasing. */
const PAD = 3
minX = Math.max(0, minX - PAD); minY = Math.max(0, minY - PAD)
maxX = Math.min(W - 1, maxX + PAD); maxY = Math.min(H - 1, maxY + PAD)
const cw = maxX - minX + 1, ch = maxY - minY + 1

/* The mark renders at about 190px across. Keeping 1264px of source would ship
   380KB for a decorative element, so it is box-averaged down to a 2x retina
   target. Averaging coverage rather than RGB is what keeps the hairlines from
   dropping out — a nearest-neighbour or naive RGB resample loses whole strokes
   at this reduction. */
const TARGET_W = 560
const scale = cw > TARGET_W ? TARGET_W / cw : 1
const ow = Math.max(1, Math.round(cw * scale))
const oh = Math.max(1, Math.round(ch * scale))
const step = 1 / scale

const out = new PNG({ width: ow, height: oh })
for (let y = 0; y < oh; y++) {
  const y0 = Math.floor(y * step), y1 = Math.min(ch, Math.max(y0 + 1, Math.floor((y + 1) * step)))
  for (let x = 0; x < ow; x++) {
    const x0 = Math.floor(x * step), x1 = Math.min(cw, Math.max(x0 + 1, Math.floor((x + 1) * step)))
    let sum = 0, n = 0
    for (let sy = y0; sy < y1; sy++) {
      for (let sx = x0; sx < x1; sx++) { sum += cover[(sy + minY) * W + (sx + minX)]; n++ }
    }
    const c0 = n ? sum / n : 0
    /* Black point. The scan's paper is not pure white — it carries a faint
       off-white noise floor, and without a threshold every one of those pixels
       survives at alpha 2-4/255. That is invisible on white but becomes a grey
       film across the whole box once the mark is inverted for the dark ground,
       which reads as a background plate behind the signature.
       Anything under the floor is discarded outright; what remains is rescaled
       so the real ink keeps its full weight rather than being dimmed. */
    const FLOOR = 0.16
    const c = c0 <= FLOOR ? 0 : (c0 - FLOOR) / (1 - FLOOR)
    const o = (y * ow + x) * 4
    out.data[o] = 0
    out.data[o + 1] = 0
    out.data[o + 2] = 0
    /* Gamma on the alpha ramp: the scan is soft and the downsample softens it
       further, so the strokes look anaemic without it. */
    out.data[o + 3] = c === 0 ? 0 : Math.round(255 * Math.min(1, Math.pow(c, 0.72) * 1.25))
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, PNG.sync.write(out))

const inkCols = []
for (let x = 0; x < cw; x++) {
  let s = 0
  for (let y = 0; y < ch; y++) s += cover[(y + minY) * W + (x + minX)]
  inkCols.push(s)
}
console.log(`source     ${W}x${H}`)
console.log(`cropped    ${cw}x${ch}  (aspect ${(cw / ch).toFixed(3)})`)
console.log(`output     ${ow}x${oh}`)
console.log(`written    ${OUT}  ${(fs.statSync(OUT).size / 1024).toFixed(1)} KB`)
console.log(`ink spans  ${inkCols.filter((v) => v > 0.5).length} of ${cw} columns`)
