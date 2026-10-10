/**
 * Extracts the white "QDnCo" wordmark out of the branded JPEG.
 *
 * The mark is pure white sitting on a blue gradient that runs from near-black
 * navy to a fairly bright periwinkle, so brightness alone will not separate it —
 * the light corner of the gradient is bright too. What does separate it is
 * neutrality: white has all three channels equal and high, the background is
 * always strongly blue-dominant.
 *
 *   score = min(r,g,b) - 2 * (max(r,g,b) - min(r,g,b))
 *
 * pure white  → 255            light periwinkle → ~10          navy → negative
 *
 * The tagline pill above the wordmark is cropped off; it is redrawn as live text
 * in the nav so it stays crisp at any size.
 */
import fs from 'fs'
import jpeg from 'jpeg-js'
import { PNG } from 'pngjs'

const raw = jpeg.decode(fs.readFileSync('../QD&CO.logo (1).jpg'), { useTArray: true })
const { width: W, height: H, data } = raw

const HI = 190 // fully opaque at or above
const LO = 120 // fully transparent at or below
const PILL_CUT = 0.42 // ignore everything above this fraction of the height (the tagline pill)

const out = new PNG({ width: W, height: H })
let minX = W, minY = H, maxX = 0, maxY = 0, kept = 0

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const mn = Math.min(r, g, b)
    const mx = Math.max(r, g, b)
    const score = mn - 2 * (mx - mn)

    let a = 0
    if (y / H > PILL_CUT) {
      a = score >= HI ? 255 : score <= LO ? 0 : Math.round(255 * ((score - LO) / (HI - LO)))
    }

    // force the surviving pixels to pure white — the mark is a flat white logo
    out.data[i] = 255
    out.data[i + 1] = 255
    out.data[i + 2] = 255
    out.data[i + 3] = a

    if (a > 24) {
      kept++
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

const pad = 4
minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad)
maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad)
const cw = maxX - minX + 1, ch = maxY - minY + 1

const crop = new PNG({ width: cw, height: ch })
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const s = ((y + minY) * W + (x + minX)) * 4
    const d = (y * cw + x) * 4
    crop.data[d] = 255; crop.data[d + 1] = 255; crop.data[d + 2] = 255
    crop.data[d + 3] = out.data[s + 3]
  }
}

fs.writeFileSync('public/brands/qdco.png', PNG.sync.write(crop))

const ca = (x, y) => crop.data[(y * cw + x) * 4 + 3]
console.log(`source        ${W}x${H}`)
console.log(`kept          ${kept} px`)
console.log(`bbox          x${minX}-${maxX}  y${minY}-${maxY}`)
console.log(`written       public/brands/qdco.png  ${cw}x${ch}  (aspect ${(cw / ch).toFixed(3)})`)
console.log(`corner alpha  TL=${ca(0, 0)} TR=${ca(cw - 1, 0)} BL=${ca(0, ch - 1)} BR=${ca(cw - 1, ch - 1)}`)
