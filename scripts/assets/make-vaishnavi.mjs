/**
 * Builds the Vaishnavi brand assets from the logo supplied by the client.
 *
 * The source is a colour lockup — cyan tick plate, then the wordmark. It cannot
 * be used as-is in either theme: the wordmark is white, so it vanishes on the
 * light site, and the cyan plate is a foreign colour against both grounds. So
 * this flattens it to two monochrome cuts, cropped tight to the artwork:
 *
 *   vaishnavi.svg        solid ink   — for light grounds
 *   vaishnavi-white.svg  solid white — for dark grounds
 *
 * Shape is taken from the alpha channel where the source has one, and from
 * "not the background colour" where it does not, so a logo delivered on a flat
 * white or flat transparent background both work. The output is a PNG payload
 * wrapped in an SVG so the two filenames the page already references keep
 * working and stay resolution-independent in layout.
 *
 * Usage: node scripts/assets/make-vaishnavi.mjs [path-to-source]
 */
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer-core'

const SRC = process.argv[2] || 'public/brands/vaishnavi-source.png'
const OUT_INK = 'public/brands/vaishnavi.svg'
const OUT_WHITE = 'public/brands/vaishnavi-white.svg'
const INK = [10, 13, 18]

const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
                'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p))
if (!CHROME) { console.error('Chrome not found'); process.exit(1) }
if (!fs.existsSync(SRC)) { console.error(`source not found: ${SRC}`); process.exit(1) }

const dataUrl = `data:image/png;base64,${fs.readFileSync(SRC).toString('base64')}`

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
const page = await browser.newPage()
await page.setContent('<body></body>')

const out = await page.evaluate(async (src, ink) => {
  const img = new Image()
  img.src = src
  await img.decode()

  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const ctx = c.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0)
  const d = ctx.getImageData(0, 0, c.width, c.height)
  const px = d.data

  /* If nothing is transparent the logo was delivered on a flat ground, so the
     ground has to be inferred. The corner pixel is that ground. */
  let minA = 255
  for (let i = 3; i < px.length; i += 4) if (px[i] < minA) minA = px[i]
  const hasAlpha = minA < 250
  const bg = [px[0], px[1], px[2]]

  const visible = (i) => {
    if (hasAlpha) return px[i + 3] > 24
    const dr = px[i] - bg[0], dg = px[i + 1] - bg[1], db = px[i + 2] - bg[2]
    return (dr * dr + dg * dg + db * db) > 900          // ~30 per channel
  }

  let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      if (!visible((y * c.width + x) * 4)) continue
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
  if (x1 < 0) return { error: 'no visible pixels found' }

  const w = x1 - x0 + 1
  const h = y1 - y0 + 1

  /* The icon is a coloured plate with a white tick sitting in it, and the
     wordmark beside it is white too. Flattened naively the plate and the tick
     collapse to the same colour and the tick disappears into a solid block, so
     the two whites have to be told apart before anything is recoloured.

     Region does it. The plate is the only saturated artwork in the file, so its
     bounding box is the icon; inside that box the coloured pixels are the plate
     and the white ones are the tick, which becomes a hole for the page to show
     through. Outside it, white is the wordmark and stays. */
  const sat = (i) => {
    const r = px[i], g = px[i + 1], b = px[i + 2]
    return Math.max(r, g, b) - Math.min(r, g, b)
  }
  let ix0 = c.width, iy0 = c.height, ix1 = -1, iy1 = -1
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = (y * c.width + x) * 4
      if (!visible(i) || sat(i) <= 25) continue
      if (x < ix0) ix0 = x
      if (x > ix1) ix1 = x
      if (y < iy0) iy0 = y
      if (y > iy1) iy1 = y
    }
  }
  const inPlate = (x, y) => ix1 >= 0 && x >= ix0 && x <= ix1 && y >= iy0 && y <= iy1

  /* One flat colour everywhere the artwork is, with the shape carried entirely
     by alpha. Anti-aliased edges keep their softness because the coverage they
     already encode becomes the alpha. */
  const cut = (rgb) => {
    const o = document.createElement('canvas')
    o.width = w
    o.height = h
    const octx = o.getContext('2d')
    const od = octx.createImageData(w, h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = ((y + y0) * c.width + (x + x0)) * 4
        const di = (y * w + x) * 4
        let a = 0
        if (inPlate(x + x0, y + y0)) {
          /* Plate body = saturated pixels → primary colour.
             Tick = near-white inside the plate → opposite colour at full alpha
             (not a knockout hole). A hole vanished on white grounds; a filled
             opposite-colour tick stays readable in both themes. */
          const isTick = sat(si) <= 25
          const cover = isTick
            ? (hasAlpha ? px[si + 3] / 255 : 1)
            : Math.max(0, Math.min(1, (sat(si) - 18) / 14))
          a = Math.round(cover * 255)
          if (isTick) {
            od.data[di] = 255 - rgb[0]
            od.data[di + 1] = 255 - rgb[1]
            od.data[di + 2] = 255 - rgb[2]
            od.data[di + 3] = a
            continue
          }
        } else if (visible(si)) {
          if (hasAlpha) a = px[si + 3]
          else {
            /* Distance from the ground stands in for coverage, so edge pixels
               that are part way between the mark and the ground stay soft. */
            const dr = px[si] - bg[0], dg = px[si + 1] - bg[1], db = px[si + 2] - bg[2]
            a = Math.min(255, Math.round(Math.sqrt(dr * dr + dg * dg + db * db) / 441 * 255 * 3))
          }
        }
        od.data[di] = rgb[0]
        od.data[di + 1] = rgb[1]
        od.data[di + 2] = rgb[2]
        od.data[di + 3] = a
      }
    }
    octx.putImageData(od, 0, 0)
    return o.toDataURL('image/png')
  }

  return { w, h, hasAlpha, ink: cut(ink), white: cut([255, 255, 255]) }
}, dataUrl, INK)

await browser.close()

if (out.error) { console.error(out.error); process.exit(1) }

const wrap = (href) =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
  `width="${out.w}" height="${out.h}" viewBox="0 0 ${out.w} ${out.h}">` +
  `<image href="${href}" width="${out.w}" height="${out.h}"/></svg>\n`

fs.writeFileSync(OUT_INK, wrap(out.ink))
fs.writeFileSync(OUT_WHITE, wrap(out.white))

const kb = (p) => (fs.statSync(p).size / 1024).toFixed(1) + ' KB'
console.log(`source        ${path.basename(SRC)}  ${out.hasAlpha ? 'transparent' : 'flat ground'}`)
console.log(`cropped to    ${out.w} x ${out.h}`)
console.log(`${OUT_INK}   ${kb(OUT_INK)}  (ink, for light grounds)`)
console.log(`${OUT_WHITE}  ${kb(OUT_WHITE)}  (white, for dark grounds)`)
console.log(`aspect ratio  ${(out.w / out.h).toFixed(4)}  — set BRANDS.vaishnavi.ar to this`)
