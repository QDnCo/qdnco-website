/* Finds components and constants that are defined but never referenced.
 *
 * This matters more than usual here: the whole app is one file served to every
 * visitor, with no bundler and therefore no tree shaking. Anything unreachable
 * still costs bytes on the wire and still gets parsed by Babel in the browser.
 *
 * Usage: node scripts/audit/audit-deadcode.mjs
 */
import fs from 'fs'

const SRC = 'public/v4-final.html'
const s = fs.readFileSync(SRC, 'utf8')

const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const defs = [...s.matchAll(/^function ([A-Z][A-Za-z0-9_]*)\s*\(/gm)].map((m) => m[1])
const arrowDefs = [...s.matchAll(/^const ([A-Z][A-Za-z0-9_]*)\s*=\s*\(/gm)].map((m) => m[1])
const all = [...new Set([...defs, ...arrowDefs])]

const dead = all.filter((n) => {
  const jsx = (s.match(new RegExp('<' + esc(n) + '[\\s/>]', 'g')) || []).length
  /* -1 discounts the definition site itself. */
  const call = Math.max(0, (s.match(new RegExp('\\b' + esc(n) + '\\s*\\(', 'g')) || []).length - 1)
  const ref = (s.match(new RegExp('[=,({\\[]\\s*' + esc(n) + '\\b', 'g')) || []).length
  return jsx + call + ref === 0
})

const consts = [...s.matchAll(/^const ([A-Z][A-Z0-9_]{2,})\s*=/gm)].map((m) => m[1])
const deadConsts = consts.filter((n) => (s.match(new RegExp('\\b' + esc(n) + '\\b', 'g')) || []).length <= 1)

console.log(`source            ${s.length.toLocaleString()} bytes`)
console.log(`components        ${all.length}`)
console.log(`unreferenced      ${dead.length ? dead.join(', ') : 'none'}`)
console.log(`unused constants  ${deadConsts.length ? deadConsts.join(', ') : 'none'}`)

/* Rough weight of the unreachable components, measured to the next definition. */
let bytes = 0
for (const n of dead) {
  const i = s.search(new RegExp('^(function|const) ' + esc(n) + '\\b', 'm'))
  if (i < 0) continue
  const next = s.slice(i + 1).search(/^(function [A-Z]|const [A-Z])/m)
  bytes += next < 0 ? 0 : next
}
if (dead.length) console.log(`dead weight       ~${(bytes / 1024).toFixed(1)} KB shipped to every visitor`)
process.exit(dead.length || deadConsts.length ? 1 : 0)
