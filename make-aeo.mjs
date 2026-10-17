/**
 * Node entry point for the answer-engine surfaces.
 *
 * All rendering lives in aeo-render.mjs, which is filesystem-free so it can also
 * run under JavaScriptCore on a machine with no Node. This file exists only to
 * put the rendered map on disk.
 *
 *   node make-aeo.mjs
 *
 * Sequenced into `npm run site` before build-dist.mjs, which mirrors every
 * subdirectory of public/ into dist/ without needing to know these exist.
 */
import fs from 'fs'
import path from 'path'
import { render } from './aeo-render.mjs'

const { files, stats } = render()

for (const [rel, html] of Object.entries(files)) {
  const out = path.join('public', rel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}

console.log(`\n${stats.pages} pages written to public/`)
console.log(`  ${stats.answers} answers + hub      -> public/answers/`)
console.log(`  ${stats.terms} glossary terms      -> public/glossary/`)
console.log(`  ${stats.datasets} research studies + hub -> public/data/`)
console.log(`  ${stats.comparisons} comparisons + hub   -> public/compare/`)
console.log(`  ${stats.areas} catchments + hub    -> public/areas/`)
console.log(`${stats.words.toLocaleString()} indexable words`)
