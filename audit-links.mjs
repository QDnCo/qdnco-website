/* Every local href in the built site must point at a file that exists.
   The footer shipped two links to "#top" labelled Privacy and Terms for
   months; a static check is what catches that class of thing. */
import fs from 'fs'
import path from 'path'

const DIST = 'dist'
let bad = 0, checked = 0

const localHrefs = (html) =>
  [...new Set([...html.matchAll(/href=["']([^"']+)["']/g)].map((m) => m[1])
    .filter((u) => !/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(u)))]

const strip = (html) =>
  html.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, '')

const check = (file, base) => {
  const html = strip(fs.readFileSync(file, 'utf8'))
  for (const u of localHrefs(html)) {
    checked++
    const target = path.join(base, u.split('#')[0].split('?')[0])
    if (!fs.existsSync(target)) { bad++; console.log(`  BROKEN  ${path.relative(DIST, file)} -> ${u}`) }
  }
}

check(path.join(DIST, 'index.html'), DIST)
/* Every generated section, not just the one that existed when this was written
   — a hardcoded list is exactly how the guides would have shipped unchecked. */
for (const dir of ['legal', 'guides']) {
  const d = path.join(DIST, dir)
  if (!fs.existsSync(d)) continue
  for (const f of fs.readdirSync(d).filter((f) => f.endsWith('.html'))) {
    check(path.join(d, f), d)
  }
}

console.log(`local links   ${checked} checked, ${bad} broken`)
if (bad) process.exit(1)
