/**
 * Builds the two variants every client mark needs:
 *   <name>.png        colour, transparent background — used on the light chip in project cards
 *   <name>-white.png  pure white, transparent background — used on the dark hero brand scroll
 *
 * Source art arrives as an opaque JPEG with a white plate baked in, so the plate
 * has to be keyed out rather than filtered: `brightness(0) invert(1)` on an opaque
 * rectangle just produces a white block.
 *
 * Coverage comes from distance-from-white, which works because every one of these
 * marks is dark ink on white.
 */
import fs from 'fs'
import jpeg from 'jpeg-js'
import { PNG } from 'pngjs'

const JOBS = [
  { src: 'netri-src.jpg', name: 'netri', targetW: 900 },
]

function boxDown(src, sw, sh, tw, th) {
  const out = Buffer.alloc(tw * th * 4)
  const xr = sw / tw, yr = sh / th
  for (let y = 0; y < th; y++) {
    const y0 = Math.floor(y * yr), y1 = Math.min(sh, Math.max(y0 + 1, Math.floor((y + 1) * yr)))
    for (let x = 0; x < tw; x++) {
      const x0 = Math.floor(x * xr), x1 = Math.min(sw, Math.max(x0 + 1, Math.floor((x + 1) * xr)))
      let r = 0, g = 0, b = 0, a = 0, n = 0
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * sw + sx) * 4
          const al = src[i + 3]
          r += src[i] * al; g += src[i + 1] * al; b += src[i + 2] * al; a += al; n++
        }
      }
      const d = (y * tw + x) * 4
      if (a > 0) { out[d] = Math.round(r / a); out[d + 1] = Math.round(g / a); out[d + 2] = Math.round(b / a) }
      out[d + 3] = Math.round(a / n)
    }
  }
  return out
}

for (const job of JOBS) {
  const raw = jpeg.decode(fs.readFileSync(job.src), { useTArray: true, maxMemoryUsageInMB: 6144 })
  const { width: W, height: H, data } = raw

  // ── key the white plate out, keep colour ──
  const rgba = Buffer.alloc(W * H * 4)
  let minX = W, minY = H, maxX = 0, maxY = 0
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const dist = (255 - Math.min(r, g, b)) / 255
      const a = Math.round(Math.min(1, Math.pow(dist, 0.7) * 1.15) * 255)
      rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = a
      if (a > 30) {
        if (x < minX) minX = x; if (x > maxX) maxX = x
        if (y < minY) minY = y; if (y > maxY) maxY = y
      }
    }
  }

  const pad = Math.round(Math.max(W, H) * 0.005)
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad)
  maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad)
  const cw = maxX - minX + 1, ch = maxY - minY + 1

  const crop = Buffer.alloc(cw * ch * 4)
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const s = ((y + minY) * W + (x + minX)) * 4, d = (y * cw + x) * 4
      crop[d] = rgba[s]; crop[d + 1] = rgba[s + 1]; crop[d + 2] = rgba[s + 2]; crop[d + 3] = rgba[s + 3]
    }
  }

  const tw = Math.min(job.targetW, cw)
  const th = Math.round((ch / cw) * tw)
  const small = boxDown(crop, cw, ch, tw, th)

  const colour = new PNG({ width: tw, height: th })
  small.copy(colour.data)
  fs.writeFileSync(`public/brands/${job.name}.png`, PNG.sync.write(colour))

  const white = new PNG({ width: tw, height: th })
  for (let i = 0; i < small.length; i += 4) {
    white.data[i] = 255; white.data[i + 1] = 255; white.data[i + 2] = 255
    white.data[i + 3] = small[i + 3]
  }
  fs.writeFileSync(`public/brands/${job.name}-white.png`, PNG.sync.write(white))

  const ca = (buf, x, y) => buf[(y * tw + x) * 4 + 3]
  console.log(`${job.name.padEnd(12)} src ${W}x${H} -> crop ${cw}x${ch} -> ${tw}x${th}  aspect ${(tw / th).toFixed(3)}  corners ${ca(small, 0, 0)}/${ca(small, tw - 1, 0)}/${ca(small, 0, th - 1)}/${ca(small, tw - 1, th - 1)}`)
}

// ── Vaishnavi: it is already an SVG, so the white variant is just a fill swap ──
{
  const src = fs.readFileSync('public/brands/vaishnavi.svg', 'utf8')
  const white = src.replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="#FFFFFF"')
  fs.writeFileSync('public/brands/vaishnavi-white.svg', white)
  const fills = [...new Set(src.match(/fill="#[0-9A-Fa-f]{3,8}"/g) || [])]
  console.log(`vaishnavi    swapped ${fills.length} fill colours -> #FFFFFF  (${fills.join(' ')})`)
}
