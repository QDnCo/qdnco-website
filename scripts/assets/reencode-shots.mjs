/**
 * Re-encodes the site screenshots for the project cards.
 *
 * The first pass went to 1000px at q76, but the panel renders up to ~1130 CSS px
 * on a 1920 screen — so the browser was upscaling every thumbnail, which is what
 * made them look soft and blocky. 1600px at q88 gives headroom above the largest
 * render size and holds up on a 1.5x display, at roughly 250KB each.
 *
 * Lanczos-ish separable resampling rather than a box filter: box averaging is
 * what turned fine UI text in the captures into mush.
 */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

const SRC = 'hires'
const OUT = 'public/shots'
const TARGET_W = 1600
const QUALITY = 88

// Catmull-Rom: sharper through edges than a box average, no ringing to speak of.
function cubic(t) {
  const a = Math.abs(t)
  if (a <= 1) return 1.5 * a * a * a - 2.5 * a * a + 1
  if (a < 2) return -0.5 * a * a * a + 2.5 * a * a - 4 * a + 2
  return 0
}

function resample1D(src, sw, sh, tw, horizontal) {
  const th = horizontal ? sh : Math.round(sh)
  const outW = horizontal ? tw : sw
  const outH = horizontal ? sh : tw
  const out = Buffer.alloc(outW * outH * 4)
  const scale = horizontal ? sw / tw : sh / tw
  const support = Math.max(1, scale) * 2

  for (let o = 0; o < tw; o++) {
    const center = (o + 0.5) * scale - 0.5
    const start = Math.max(0, Math.ceil(center - support))
    const end = Math.min((horizontal ? sw : sh) - 1, Math.floor(center + support))
    const weights = []
    let wsum = 0
    for (let i = start; i <= end; i++) {
      const w = cubic((i - center) / Math.max(1, scale))
      weights.push(w)
      wsum += w
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

let total = 0
for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.png'))) {
  const png = PNG.sync.read(fs.readFileSync(path.join(SRC, f)))
  const tw = Math.min(TARGET_W, png.width)
  const th = Math.round((png.height / png.width) * tw)

  const pass1 = resample1D(png.data, png.width, png.height, tw, true)
  const pass2 = resample1D(pass1.data, pass1.w, pass1.h, th, false)

  const jp = jpeg.encode({ data: pass2.data, width: pass2.w, height: pass2.h }, QUALITY)
  const dest = path.join(OUT, f.replace(/\.png$/, '.jpg'))
  fs.writeFileSync(dest, jp.data)
  total += jp.data.length
  console.log(`${f.padEnd(24)} ${png.width}x${png.height} -> ${pass2.w}x${pass2.h}  ${(jp.data.length / 1024).toFixed(0)}KB`)
}
console.log(`\ntotal ${(total / 1048576).toFixed(2)}MB`)
