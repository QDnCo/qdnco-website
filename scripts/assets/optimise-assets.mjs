/**
 * The page was shipping ~18MB of local images plus 63 animated GIFs. The site
 * screenshots are 1920x1080 PNGs rendered into panels ~600-1100px wide, so most
 * of that weight is thrown away by the browser anyway.
 *
 * Downscale with a box filter and re-encode as JPEG (screenshots have no alpha),
 * and shrink the portrait cutout — which is composited 8+ times as stacked 3D
 * layers, so its decode cost is multiplied.
 */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

function boxResize(src, sw, sh, tw, th) {
  const out = Buffer.alloc(tw * th * 4)
  const xr = sw / tw
  const yr = sh / th
  for (let y = 0; y < th; y++) {
    const y0 = Math.floor(y * yr)
    const y1 = Math.min(sh, Math.max(y0 + 1, Math.floor((y + 1) * yr)))
    for (let x = 0; x < tw; x++) {
      const x0 = Math.floor(x * xr)
      const x1 = Math.min(sw, Math.max(x0 + 1, Math.floor((x + 1) * xr)))
      let r = 0, g = 0, b = 0, a = 0, n = 0
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * sw + sx) * 4
          const al = src[i + 3]
          r += src[i] * al; g += src[i + 1] * al; b += src[i + 2] * al
          a += al; n++
        }
      }
      const d = (y * tw + x) * 4
      if (a > 0) {
        out[d] = Math.round(r / a); out[d + 1] = Math.round(g / a); out[d + 2] = Math.round(b / a)
      }
      out[d + 3] = Math.round(a / n)
    }
  }
  return out
}

let before = 0, after = 0

// ── site screenshots → 1000px wide JPEG ──
const shotDir = 'public/shots'
for (const f of fs.readdirSync(shotDir).filter((f) => f.endsWith('.png'))) {
  const p = path.join(shotDir, f)
  before += fs.statSync(p).size
  const png = PNG.sync.read(fs.readFileSync(p))
  const tw = Math.min(1000, png.width)
  const th = Math.round((png.height / png.width) * tw)
  const data = boxResize(png.data, png.width, png.height, tw, th)
  const jp = jpeg.encode({ data, width: tw, height: th }, 76)
  const outPath = p.replace(/\.png$/, '.jpg')
  fs.writeFileSync(outPath, jp.data)
  after += jp.data.length
  fs.unlinkSync(p)
  console.log(`${f.padEnd(26)} ${png.width}x${png.height} -> ${tw}x${th}  ${(jp.data.length / 1024).toFixed(0)}KB`)
}

// ── portrait cutout → 620px wide PNG (alpha must survive) ──
{
  const p = 'public/portrait-cutout.png'
  const s = fs.statSync(p).size
  const png = PNG.sync.read(fs.readFileSync(p))
  const tw = 620
  const th = Math.round((png.height / png.width) * tw)
  const small = new PNG({ width: tw, height: th })
  boxResize(png.data, png.width, png.height, tw, th).copy(small.data)
  const buf = PNG.sync.write(small, { deflateLevel: 9 })
  fs.writeFileSync(p, buf)
  console.log(`portrait-cutout.png        ${png.width}x${png.height} -> ${tw}x${th}  ${(s / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`)
  before += s; after += buf.length
}

console.log(`\ntotal ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`)
