/**
 * Generates a true transparent-background cutout from the studio portrait.
 *
 * The backdrop is near-white (~250-255) and the subject's darkest values are
 * the suit (~10-40), with skin in the middle (~150-200). So alpha comes from a
 * soft luminance ramp: fully opaque below LO, fully transparent above HI, with
 * a gradient between for a naturally anti-aliased edge.
 *
 * A flood fill from the borders makes sure only backdrop connected to the frame
 * edge is removed — anything bright but enclosed by the subject (a watch face,
 * a shirt highlight) is kept solid.
 *
 * Output: public/portrait-cutout.png, cropped to the subject's bounding box.
 */
import fs from 'fs'
import jpeg from 'jpeg-js'
import { PNG } from 'pngjs'

const LO = 232 // <= this is definitely subject
const HI = 250 // >= this is definitely backdrop

const src = jpeg.decode(fs.readFileSync('public/portrait.jpg'), { useTArray: true })
const { width: W, height: H, data } = src

const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]

// ── 1. Flood fill the backdrop inward from the frame border ──
const isBackdrop = new Uint8Array(W * H)
const stack = []
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return
  const p = y * W + x
  if (isBackdrop[p]) return
  if (lum(p * 4) < LO) return
  isBackdrop[p] = 1
  stack.push(p)
}
for (let x = 0; x < W; x++) {
  push(x, 0)
  push(x, H - 1)
}
for (let y = 0; y < H; y++) {
  push(0, y)
  push(W - 1, y)
}
while (stack.length) {
  const p = stack.pop()
  const x = p % W
  const y = (p - x) / W
  push(x + 1, y)
  push(x - 1, y)
  push(x, y + 1)
  push(x, y - 1)
}

// ── 2. Build RGBA with a soft alpha ramp, tracking the subject bbox ──
const out = new PNG({ width: W, height: H })
let minX = W,
  minY = H,
  maxX = 0,
  maxY = 0
let opaque = 0

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x
    const i = p * 4
    const l = lum(i)

    let a = 255
    if (isBackdrop[p]) {
      a = l >= HI ? 0 : Math.round(255 * (1 - (l - LO) / (HI - LO)))
    }

    out.data[i] = data[i]
    out.data[i + 1] = data[i + 1]
    out.data[i + 2] = data[i + 2]
    out.data[i + 3] = a

    if (a > 24) {
      opaque++
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

// ── 3. Crop to bbox with a small margin ──
const pad = 6
minX = Math.max(0, minX - pad)
minY = Math.max(0, minY - pad)
maxX = Math.min(W - 1, maxX + pad)
maxY = Math.min(H - 1, maxY + pad)
const cw = maxX - minX + 1
const ch = maxY - minY + 1

const cropped = new PNG({ width: cw, height: ch })
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const s = ((y + minY) * W + (x + minX)) * 4
    const d = (y * cw + x) * 4
    cropped.data[d] = out.data[s]
    cropped.data[d + 1] = out.data[s + 1]
    cropped.data[d + 2] = out.data[s + 2]
    cropped.data[d + 3] = out.data[s + 3]
  }
}

fs.writeFileSync('public/portrait-cutout.png', PNG.sync.write(cropped))

// ── Report ──
console.log(`source     ${W}x${H}`)
console.log(`backdrop   ${isBackdrop.reduce((a, b) => a + b, 0)} px removed`)
console.log(`subject    ${opaque} px kept (${((opaque / (W * H)) * 100).toFixed(1)}%)`)
console.log(`bbox       x${minX}-${maxX}  y${minY}-${maxY}`)
console.log(`written    public/portrait-cutout.png  ${cw}x${ch}`)

// Corner alpha proof — all four must be 0.
const ca = (x, y) => cropped.data[(y * cw + x) * 4 + 3]
console.log(
  `corner alpha  TL=${ca(0, 0)} TR=${ca(cw - 1, 0)} BL=${ca(0, ch - 1)} BR=${ca(cw - 1, ch - 1)}`,
)
