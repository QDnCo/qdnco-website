/* Where does the *content* sit?
 *
 * These are full-bleed designs, so "uniform margin" finds nothing — the photo
 * reaches every edge. What matters for a crop is where the type, logos and
 * price boxes are, and those are high-frequency: sharp local contrast against
 * their surroundings. Smooth sky, render gradients and blurred foreground are
 * low-frequency and cheap to lose.
 *
 * So: per-row and per-column edge energy, then ask what share of the whole
 * image's energy sits inside the band a given crop would remove. */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

const SRC = 'C:/Users/USER/OneDrive/Desktop/VS Code Files/QDnCo/Reference creatives'

const decode = (f) => {
  const b = fs.readFileSync(f)
  if (/\.png$/i.test(f)) { const g = PNG.sync.read(b); return { w: g.width, h: g.height, d: g.data } }
  const g = jpeg.decode(b, { maxMemoryUsageInMB: 1024 }); return { w: g.width, h: g.height, d: g.data }
}
const lum = (img, x, y) => {
  const i = (y * img.w + x) << 2
  return img.d[i] * 0.299 + img.d[i + 1] * 0.587 + img.d[i + 2] * 0.114
}

/* Energy = summed absolute gradient. Type produces a lot of it per pixel;
   a gradient sky produces almost none. */
const energy = (img) => {
  const rows = new Float64Array(img.h), cols = new Float64Array(img.w)
  for (let y = 1; y < img.h; y++) {
    for (let x = 1; x < img.w; x++) {
      const g = Math.abs(lum(img, x, y) - lum(img, x - 1, y)) +
                Math.abs(lum(img, x, y) - lum(img, x, y - 1))
      rows[y] += g; cols[x] += g
    }
  }
  return { rows, cols, total: rows.reduce((a, b) => a + b, 0) }
}

const share = (arr, from, to) => {
  let s = 0; for (let i = from; i < to; i++) s += arr[i]
  const t = arr.reduce((a, b) => a + b, 0)
  return t ? s / t : 0
}

const files = fs.readdirSync(SRC).filter((x) => /\.(png|jpe?g)$/i.test(x)).sort()
const data = []
console.log('Content energy inside the band a crop would remove\n')
console.log('file'.padEnd(44) + 'ratio'.padStart(7) + '  bottom8.5%  bottom15.7%   sides3.9%')
console.log('-'.repeat(88))
for (const f of files) {
  const img = decode(path.join(SRC, f))
  const e = energy(img)
  const r = img.w / img.h
  const b85 = share(e.rows, Math.floor(img.h * (1 - 0.085)), img.h)
  const b157 = share(e.rows, Math.floor(img.h * (1 - 0.157)), img.h)
  const sides = share(e.cols, 0, Math.floor(img.w * 0.039)) +
                share(e.cols, Math.floor(img.w * (1 - 0.039)), img.w)
  data.push({ f, r, b85, b157, sides })
  console.log(f.slice(0, 43).padEnd(44) + r.toFixed(3).padStart(7) +
    (b85 * 100).toFixed(1).padStart(11) + '%' +
    (b157 * 100).toFixed(1).padStart(11) + '%' +
    (sides * 100).toFixed(1).padStart(11) + '%')
}
const tall = data.filter((d) => d.r < 0.61)
const squat = data.filter((d) => d.r >= 0.61)
console.log('\n' + '-'.repeat(88))
console.log(`tall  worst bottom 8.5%  = ${(Math.max(...tall.map(d => d.b85)) * 100).toFixed(1)}% of content energy`)
console.log(`tall  worst bottom 15.7% = ${(Math.max(...tall.map(d => d.b157)) * 100).toFixed(1)}% of content energy`)
console.log(`squat worst sides 3.9%   = ${(Math.max(...squat.map(d => d.sides)) * 100).toFixed(1)}% of content energy`)
console.log(`\n(An even spread would put 8.5% of energy in 8.5% of rows. Below that = quiet band, cheap to lose.)`)
