/**
 * Replace the Tailwind Play CDN on the homepages with CSS generated at build time.
 *
 * The CDN script (~400 KB) scans the DOM and generates CSS in the visitor's
 * browser, with a MutationObserver running for the life of the page. Here the
 * same Tailwind version (3.4.x) and the same inline theme config generate the
 * CSS once from the page's own markup + compiled script, and it is inlined where
 * the CDN would have put it: at the end of <head>, after the site's own styles,
 * so the cascade order is unchanged.
 *
 * Run AFTER precompile-jsx.mjs. `node scripts/build/precompile-jsx.mjs --restore` brings back
 * the CDN version together with the JSX source.
 */
import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

const PAGES = ['index.html', 'dubai/index.html']
const CDN = /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\n?/
const CFG = /<script>\s*tailwind\.config = (\{[\s\S]*?\});\s*<\/script>\n?/

for (const p of PAGES) {
  const file = path.join('dist', p)
  let html = fs.readFileSync(file, 'utf8')
  if (!CDN.test(html)) { console.log(`${p}: no Tailwind CDN, skipped`); continue }
  if (/text\/babel/.test(html)) throw new Error(`${p}: run precompile-jsx.mjs first`)
  const cm = html.match(CFG)
  if (!cm) throw new Error(`${p}: inline tailwind.config not found`)
  const pageConfig = Function(`"use strict"; return (${cm[1]})`)()
  const config = { ...pageConfig, content: [{ raw: html, extension: 'html' }] }
  const out = await postcss([tailwindcss(config)]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', { from: undefined })
  const css = out.css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*\n/g, '\n')
  html = html.replace(CDN, '').replace(CFG, '')
  html = html.replace('</head>', `<style id="tw-build">\n${css}\n</style>\n</head>`)
  if (/cdn\.tailwindcss\.com|tailwind\.config =/.test(html)) throw new Error(`${p}: CDN still referenced`)
  fs.writeFileSync(file, html)
  console.log(`${p}: Tailwind CSS generated at build (${(css.length / 1024).toFixed(0)} KB inline), CDN removed`)
}
