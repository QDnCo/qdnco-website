/**
 * Traces the silhouette border of public/portrait-cutout.png into an SVG path.
 *
 * Per row we take the left-most and right-most opaque pixel, then walk the left
 * edge top→bottom and the right edge bottom→top to close the loop. For a
 * crossed-arms bust that yields exactly the outer contour you'd draw by hand —
 * one clean closed curve, no interior holes to confuse a traced stroke.
 *
 * Output is a smoothed quadratic path in the image's own coordinate space, ready
 * to drop into an SVG with a matching viewBox.
 */
import fs from 'fs'
import { PNG } from 'pngjs'

const png = PNG.sync.read(
  fs.readFileSync('public/portrait-cutout.png'),
)
const { width: W, height: H, data } = png

const ALPHA = 40 // opaque enough to count as subject
const ROW_STEP = 8 // sample every Nth row

const alphaAt = (x, y) => data[(y * W + x) * 4 + 3]

const left = []
const right = []

for (let y = 0; y < H; y += ROW_STEP) {
  let lo = -1
  let hi = -1
  for (let x = 0; x < W; x++) {
    if (alphaAt(x, y) > ALPHA) {
      if (lo < 0) lo = x
      hi = x
    }
  }
  if (lo < 0) continue
  // Ignore hair-thin rows; they produce spikes in the outline.
  if (hi - lo < 6) continue
  left.push([lo, y])
  right.push([hi, y])
}

if (!left.length) {
  console.error('no opaque rows found — check ALPHA threshold')
  process.exit(1)
}

// Moving average to take the stair-stepping out of the edges.
function smooth(pts, win) {
  const out = []
  for (let i = 0; i < pts.length; i++) {
    let sx = 0
    let sy = 0
    let n = 0
    for (let k = -win; k <= win; k++) {
      const j = i + k
      if (j < 0 || j >= pts.length) continue
      sx += pts[j][0]
      sy += pts[j][1]
      n++
    }
    out.push([sx / n, sy / n])
  }
  return out
}

const L = smooth(left, 3)
const R = smooth(right, 3)

/**
 * L and R only describe the two side edges — the loop would otherwise jump in a
 * straight line across the base and across the crown. Insert real points along
 * both so the closed curve has a bottom edge to start the trace from.
 */
function bridge(a, b, n) {
  const out = []
  for (let i = 1; i < n; i++) {
    const t = i / n
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t])
  }
  return out
}

const bottomEdge = bridge(L[L.length - 1], R[R.length - 1], 12) // left→right across the base
const topEdge = bridge(R[0], L[0], 6) // right→left across the crown

// left edge top→bottom · base left→right · right edge bottom→top · crown right→left
let loop = [...L, ...bottomEdge, ...R.slice().reverse(), ...topEdge]

/**
 * Re-anchor the loop so it begins at the bottom-centre of the figure — the
 * buttons on the crossed hands. The trace then travels one full circuit and
 * returns to the same point, which is what makes it read as a closed circle
 * rather than a stroke that starts and stops somewhere arbitrary.
 */
const maxY = Math.max(...loop.map((p) => p[1]))
const cxAll = (Math.min(...loop.map((p) => p[0])) + Math.max(...loop.map((p) => p[0]))) / 2
let startIdx = 0
let best = Infinity
loop.forEach(([x, y], i) => {
  // weight vertical distance heavily so we land on the base, then pick the most central
  const d = Math.abs(y - maxY) * 3 + Math.abs(x - cxAll)
  if (d < best) { best = d; startIdx = i }
})
loop = [...loop.slice(startIdx), ...loop.slice(0, startIdx)]
console.log(`start pt   index ${startIdx} at (${loop[0][0].toFixed(0)}, ${loop[0][1].toFixed(0)})  [bottom-centre anchor]`)

// Quadratic smoothing through midpoints — gives a flowing curve a dash can ride.
let d = `M ${loop[0][0].toFixed(1)} ${loop[0][1].toFixed(1)}`
for (let i = 1; i < loop.length - 1; i++) {
  const [cx, cy] = loop[i]
  const mx = (loop[i][0] + loop[i + 1][0]) / 2
  const my = (loop[i][1] + loop[i + 1][1]) / 2
  d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`
}
d += ' Z'

fs.writeFileSync(
  'public/outline-path.json',
  JSON.stringify({ viewBox: `0 0 ${W} ${H}`, d }, null, 0),
)

console.log(`image      ${W}x${H}`)
console.log(`rows kept  ${left.length}`)
console.log(`points     ${loop.length}`)
console.log(`path chars ${d.length}`)
console.log(`x range    ${Math.min(...L.map(p => p[0])).toFixed(0)} → ${Math.max(...R.map(p => p[0])).toFixed(0)}`)
console.log(`y range    ${loop[0][1].toFixed(0)} → ${Math.max(...loop.map(p => p[1])).toFixed(0)}`)
console.log('written    public/outline-path.json')
