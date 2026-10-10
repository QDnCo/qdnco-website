/**
 * Builds the light-chip and dark-scroll variants for Vaishnavi Life and Marga
 * Education.
 *
 * Vaishnavi ships as a dark-background lockup: the wordmark is already white,
 * and only the small icon block (cyan outer, navy inner) and a pink accent carry
 * colour. So the two variants need opposite treatments:
 *
 *   -white.svg  cyan -> white, pink -> white, and the navy inner block set to the
 *               page colour so it still reads as a knockout instead of merging
 *               into a solid white square.
 *   .svg        the wordmark inverted to dark ink so it survives on the light chip.
 *
 * Marga is ordinary dark-ink-on-white artwork, so coverage comes from
 * distance-from-white in the usual way.
 */
import fs from 'fs'
import { PNG } from 'pngjs'

const PAGE_BG = '#0A0D12'
const INK = '#16202B'

// ─────────────────────────── Vaishnavi ───────────────────────────
{
  const src = fs.readFileSync('public/brands/vaishnavi-src.svg', 'utf8')

  const white = src
    .replace(/fill="#1FACE3"/g, 'fill="#FFFFFF"')
    .replace(/fill="#CE5C78"/g, 'fill="#FFFFFF"')
    .replace(/fill="#3B376C"/g, `fill="${PAGE_BG}"`)
  fs.writeFileSync('public/brands/vaishnavi-white.svg', white)

  const colour = src.replace(/fill="white"/g, `fill="${INK}"`)
  fs.writeFileSync('public/brands/vaishnavi.svg', colour)

  const dim = src.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
  console.log(`vaishnavi    ${dim[1]}x${dim[2]}  aspect ${(dim[1] / dim[2]).toFixed(3)}`)
  console.log(`  white.svg  cyan+pink -> #FFFFFF, navy -> ${PAGE_BG} (knockout), wordmark already white`)
  console.log(`  colour.svg wordmark white -> ${INK}, brand colours untouched`)
}

// ───────────────────────────── Marga ─────────────────────────────
{
  const png = PNG.sync.read(fs.readFileSync('public/brands/marga-src.png'))
  const { width: W, height: H, data } = png

  let minX = W, minY = H, maxX = 0, maxY = 0
  const cov = new Uint8Array(W * H)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const srcA = data[i + 3] / 255
      const dist = (255 - Math.min(data[i], data[i + 1], data[i + 2])) / 255
      const a = Math.round(Math.min(1, Math.pow(dist, 0.7) * 1.15) * srcA * 255)
      cov[y * W + x] = a
      if (a > 30) {
        if (x < minX) minX = x; if (x > maxX) maxX = x
        if (y < minY) minY = y; if (y > maxY) maxY = y
      }
    }
  }

  const pad = 3
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad)
  maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad)
  const cw = maxX - minX + 1, ch = maxY - minY + 1

  const colour = new PNG({ width: cw, height: ch })
  const white = new PNG({ width: cw, height: ch })
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const s = ((y + minY) * W + (x + minX)) * 4
      const d = (y * cw + x) * 4
      const a = cov[(y + minY) * W + (x + minX)]
      colour.data[d] = data[s]; colour.data[d + 1] = data[s + 1]; colour.data[d + 2] = data[s + 2]; colour.data[d + 3] = a
      white.data[d] = 255; white.data[d + 1] = 255; white.data[d + 2] = 255; white.data[d + 3] = a
    }
  }
  fs.writeFileSync('public/brands/marga.png', PNG.sync.write(colour))
  fs.writeFileSync('public/brands/marga-white.png', PNG.sync.write(white))

  const ca = (p, x, y) => p.data[(y * cw + x) * 4 + 3]
  console.log(`marga        src ${W}x${H} -> crop ${cw}x${ch}  aspect ${(cw / ch).toFixed(3)}  corners ${ca(white, 0, 0)}/${ca(white, cw - 1, 0)}/${ca(white, 0, ch - 1)}/${ca(white, cw - 1, ch - 1)}`)
}
