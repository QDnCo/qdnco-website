/**
 * Builds white-on-transparent versions of the brand marks for the hero row.
 *
 * The colour logos can't just be run through `brightness(0) invert(1)`: Indium
 * and Logic Launch ship as opaque rectangles with a white background baked in,
 * so that filter would turn the whole rectangle into a white block.
 *
 * Instead, derive coverage from how far each pixel sits from white — the logo
 * ink becomes opaque, the white plate becomes transparent — then paint every
 * surviving pixel white. The project cards keep the colour originals; only the
 * hero row uses these.
 */
import fs from 'fs'
import { PNG } from 'pngjs'

const JOBS = [
  ['public/brands/indium.png', 'public/brands/indium-white.png'],
  ['public/brands/logiclaunch.png', 'public/brands/logiclaunch-white.png'],
]

for (const [src, dest] of JOBS) {
  const png = PNG.sync.read(fs.readFileSync(src))
  const { width: W, height: H, data } = png
  const out = new PNG({ width: W, height: H })

  let opaque = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const srcA = data[i + 3] / 255

    // distance from white, normalised — 0 on pure white, 1 on pure black/saturated
    const dist = (255 - Math.min(r, g, b)) / 255
    // a little gamma so faint anti-aliased edges do not disappear
    const cov = Math.min(1, Math.pow(dist, 0.75) * 1.12)
    const a = Math.round(cov * srcA * 255)

    out.data[i] = 255
    out.data[i + 1] = 255
    out.data[i + 2] = 255
    out.data[i + 3] = a
    if (a > 24) opaque++
  }

  fs.writeFileSync(dest, PNG.sync.write(out))
  const ca = (x, y) => out.data[(y * W + x) * 4 + 3]
  console.log(
    `${dest.split('/').pop().padEnd(24)} ${W}x${H}  opaque ${opaque} (${((opaque / (W * H)) * 100).toFixed(0)}%)  ` +
    `corners ${ca(0, 0)}/${ca(W - 1, 0)}/${ca(0, H - 1)}/${ca(W - 1, H - 1)}`,
  )
}
