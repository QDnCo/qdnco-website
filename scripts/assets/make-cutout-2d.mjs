/**
 * Builds the transparent cutout from the straight-on 2D portrait.
 *
 * Same method as make-cutout.mjs — flood fill the near-white backdrop inward
 * from the frame edge, then a soft luminance ramp for an anti-aliased edge — but
 * reading a PNG rather than a JPEG, and from the replacement photo where the
 * subject faces the camera square on.
 *
 * The flood fill matters here: the shirt highlights and the watch face are bright
 * enough to trip a plain threshold, but they are enclosed by the subject, so a
 * fill that only reaches backdrop connected to the border leaves them solid.
 *
 * Prints the aspect ratio, which has to be copied into Model3D's aspectRatio and
 * into the FIG_H multiplier — those two numbers describe this file and nothing
 * else, so a new photo with different proportions silently distorts the figure
 * if they are left alone.
 */
import fs from 'fs'
import { PNG } from 'pngjs'

const SRC = process.argv[2] || 'C:/Users/USER/Downloads/file_000000000a8c8206b0f68daf362418c2.png'
const OUT = 'public/portrait-cutout.png'

const LO = 232 // at or below this is definitely subject
const HI = 250 // at or above this is definitely backdrop

const src = PNG.sync.read(fs.readFileSync(SRC))
const { width: W, height: H, data } = src

const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]

// ── 1. flood fill the backdrop inward from the border ──
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
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1) }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y) }
while (stack.length) {
  const p = stack.pop()
  const x = p % W
  const y = (p - x) / W
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1)
}

// ── 2. soft alpha, tracking the subject bbox ──
const out = new PNG({ width: W, height: H })
let minX = W, minY = H, maxX = 0, maxY = 0, opaque = 0
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x
    const i = p * 4
    const l = lum(i)
    let a = 255
    if (isBackdrop[p]) a = l >= HI ? 0 : Math.round(255 * (1 - (l - LO) / (HI - LO)))
    out.data[i] = data[i]; out.data[i + 1] = data[i + 1]; out.data[i + 2] = data[i + 2]
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

// ── 3. crop to the subject ──
const pad = 6
minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad)
maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad)
const cw = maxX - minX + 1, ch = maxY - minY + 1

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
fs.writeFileSync(OUT, PNG.sync.write(cropped))

const ca = (x, y) => cropped.data[(y * cw + x) * 4 + 3]
console.log(`source        ${W}x${H}`)
console.log(`subject       ${opaque} px kept (${((opaque / (W * H)) * 100).toFixed(1)}%)`)
console.log(`written       ${OUT}  ${cw}x${ch}`)
console.log(`corner alpha  TL=${ca(0, 0)} TR=${ca(cw - 1, 0)} BL=${ca(0, ch - 1)} BR=${ca(cw - 1, ch - 1)}`)
console.log(``)
console.log(`>> aspectRatio  '${cw} / ${ch}'`)
console.log(`>> FIG_H factor ${(ch / cw).toFixed(4)}`)
