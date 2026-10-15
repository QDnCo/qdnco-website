/* Decides, per platform mark, whether it needs help on the dark ground, the
 * light ground, both, or neither — by measuring the artwork instead of eyeing it.
 *
 * The rule being implemented: a mark must never camouflage into the page. A
 * near-black mark disappears on the dark ground and a near-white or very light
 * mark disappears on the white one. Anything genuinely coloured — Meta blue,
 * Claude orange, the Google Ads set — already contrasts against both and is
 * left exactly as the brand ships it.
 *
 * Method: pull every fill from the SVG, weight nothing (these are flat marks,
 * not gradients), and take the mean relative luminance. An SVG with no fill at
 * all inherits currentColor, which renders black — that counts as near-black.
 *
 * Usage: node scripts/assets/classify-platform-marks.mjs
 */
import fs from 'fs'
import path from 'path'

const DIR = 'public/brands/platforms'

/* WCAG relative luminance. */
const lum = (r, g, b) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const hex = (h) => {
  h = h.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
/* Contrast of a colour against the two page grounds. */
const DARK_BG = lum(10, 13, 18)
const LIGHT_BG = lum(255, 255, 255)
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

const rows = []
for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith('.svg'))) {
  const svg = fs.readFileSync(path.join(DIR, f), 'utf8')
  const fills = [...svg.matchAll(/fill=["'](#[0-9a-fA-F]{3,6})["']/g)].map((m) => m[1])
  const stops = [...svg.matchAll(/stop-color=["'](#[0-9a-fA-F]{3,6})["']/g)].map((m) => m[1])
  /* White is NOT filtered out. An earlier version stripped it as "background",
     which made a purely white mark fall through to the black default and get
     the exact opposite treatment — X and Gemini both ship white and were being
     inverted on the dark ground where they were already fine, then left alone
     on white where they vanished entirely. */
  const all = [...fills, ...stops]

  /* No explicit fill means currentColor, which paints black. */
  const cols = all.length ? all : ['#000000']
  const L = cols.reduce((a, c) => a + lum(...hex(c)), 0) / cols.length

  const onDark = ratio(L, DARK_BG)
  const onLight = ratio(L, LIGHT_BG)
  /* 2.2 is where a flat mark stops separating from its ground at strip size —
     below WCAG's 3:1 for graphics, because these carry a text label beside
     them and do not have to stand alone. */
  const LIM = 2.2
  const needsDark = onDark < LIM
  const needsLight = onLight < LIM

  /* How a failing ground is corrected depends on whether the mark carries real
     colour. An achromatic mark can simply be inverted — white becomes black and
     stays true to the brand's monochrome intent. A chromatic one (Snapchat's
     yellow) would invert to blue, so it is darkened instead: hue kept, value
     dropped. */
  const chroma = cols.reduce((a, c) => {
    const [r, g, b] = hex(c)
    return Math.max(a, (Math.max(r, g, b) - Math.min(r, g, b)) / 255)
  }, 0)
  const achromatic = chroma < 0.18

  let treat = 'leave'
  if (needsDark && needsLight) treat = 'BOTH?'
  else if (needsDark) treat = achromatic ? 'invert-on-dark' : 'lighten-on-dark'
  else if (needsLight) treat = achromatic ? 'invert-on-light' : 'darken-on-light'

  rows.push({
    file: f,
    colours: cols.slice(0, 3).join(' '),
    lum: L.toFixed(3),
    onDark: onDark.toFixed(2),
    onLight: onLight.toFixed(2),
    treat,
  })
}

rows.sort((a, b) => a.file.localeCompare(b.file))
console.log('file                  colours                    lum   onDark  onLight  treatment')
console.log('-'.repeat(92))
for (const r of rows) {
  console.log(
    r.file.padEnd(22) + r.colours.padEnd(27) + r.lum.padStart(5) +
    r.onDark.padStart(8) + r.onLight.padStart(9) + '  ' + r.treat)
}

for (const t of ['invert-on-dark', 'invert-on-light', 'darken-on-light', 'lighten-on-dark', 'BOTH?']) {
  const hit = rows.filter((r) => r.treat === t)
  if (hit.length) console.log(`
${t.padEnd(16)}: ` + hit.map((r) => r.file).join(', '))
}
