/**
 * Compile the homepages' in-browser JSX at build time, and drop Babel Standalone.
 *
 * Why: each homepage shipped ~4,800 lines of JSX inside <script type="text/babel">
 * plus the Babel compiler (~3 MB) from unpkg, and compiled them in the visitor's
 * browser on every load. On a mid-range phone that is seconds of main-thread work
 * before React paints — a Core Web Vitals and mobile-ranking cost. Sucrase does
 * the same JSX transform once, here. Nothing else about the page changes.
 *
 * Reversible: the uncompiled page is kept in _jsx-source/ so the builders
 * (patch-india-for-dubai.py, make-dubai-home.py) can keep editing JSX.
 *
 *   node scripts/build/precompile-jsx.mjs              compile dist/index.html + dist/dubai/index.html
 *   node scripts/build/precompile-jsx.mjs --restore    put the JSX versions back into dist/ before editing
 */
import fs from 'fs'
import path from 'path'
import { transform } from 'sucrase'

const PAGES = ['index.html', 'dubai/index.html']
const SRC = '_jsx-source'
const BABEL_TAG = /<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>\n?/
const JSX = /<script type="text\/babel">([\s\S]*?)<\/script>/

fs.mkdirSync(SRC, { recursive: true })
const keep = (p) => path.join(SRC, p.replace(/\//g, '__'))

if (process.argv.includes('--restore')) {
  for (const p of PAGES) {
    const k = keep(p)
    if (!fs.existsSync(k)) { console.log(`no source kept for ${p}`); continue }
    fs.copyFileSync(k, path.join('dist', p))
    console.log(`restored JSX source → dist/${p}`)
  }
  process.exit(0)
}

for (const p of PAGES) {
  const file = path.join('dist', p)
  let html = fs.readFileSync(file, 'utf8')
  const m = html.match(JSX)
  if (!m) { console.log(`${p}: already compiled, skipped`); continue }
  fs.writeFileSync(keep(p), html)                       // the editable source
  const out = transform(m[1], { transforms: ['jsx'], production: true, jsxRuntime: 'classic' }).code
  if (out.includes('</script')) throw new Error(`${p}: compiled code contains </script`)
  const before = html.length
  html = html.replace(JSX, () => `<script>\n${out}\n</script>`)
  html = html.replace(BABEL_TAG, '')
  if (/text\/babel|@babel\/standalone/.test(html)) throw new Error(`${p}: Babel still referenced`)
  fs.writeFileSync(file, html)
  console.log(`${p}: JSX compiled, Babel removed  ${(before / 1024).toFixed(0)}KB → ${(html.length / 1024).toFixed(0)}KB`)
}
