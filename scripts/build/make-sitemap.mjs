#!/usr/bin/env node
/* Build site/sitemap.xml from the pages in site/.

   - A page is listed when it has a canonical tag and is not noindex.
   - <loc> is the page's own canonical URL, so sitemap and canonical always agree.
   - <lastmod> is the date of the last git commit that changed the file's content.
     A commit whose diff to the file disappears once MECHANICAL_REWRITES are
     applied to both sides (e.g. /pricing/index.html -> /pricing/) is not a
     content change and is skipped. This works on diffs, not commit hashes, so it
     survives squash merges.
   - A page with no commit yet (new, uncommitted) gets today's date.

   Needs full git history. In CI the checkout uses fetch-depth: 0.

   Usage: node scripts/build/make-sitemap.mjs [--check]
     --check  exit 1 if site/sitemap.xml is out of date, without writing it. */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const SITE_DIR = path.join(ROOT, 'site')
const OUT_FILE = path.join(SITE_DIR, 'sitemap.xml')
/** Site-wide rewrites that change no reader-visible content. Add one per mechanical sweep. */
const MECHANICAL_REWRITES = [
  // 2026-11-28: hub URLs moved from /x/index.html to /x/.
  [/(?<![\w-])(pricing|work|guides|answers|data|compare|areas|glossary)\/index\.html/g, '$1/'],
  // 2026-11-28: images re-encoded as WebP (same picture, new file format).
  [/\b((?:shots|brands|adreel)\/[\w-]+)\.(?:png|jpe?g|webp)\b/g, '$1.img'],
  // Cache-busting ?v= tags on our own scripts and stylesheets.
  [/(\/(?:js|css)\/[\w./-]+\.(?:js|css)\?v=)[\w-]+/g, '$1v'],
]
const SKIP_DIRS = new Set(['growth-status', 'creative-review', 'togethired', '.well-known', 'seo'])
const HOME = 'https://qdnco.com/'

/** @param {string} dir @returns {string[]} absolute paths of .html files */
function listHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : listHtml(full)
    return entry.name.endsWith('.html') ? [full] : []
  })
}

/** @param {string} html @returns {string | null} */
function canonicalOf(html) {
  const tag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0]
  return tag?.match(/\bhref="([^"]+)"/i)?.[1] ?? null
}

/** @param {string} html @returns {boolean} */
function isNoindex(html) {
  const tags = html.match(/<meta\b[^>]*\bname="robots"[^>]*>/gi) ?? []
  return tags.some((tag) => /noindex/i.test(tag))
}

/** @param {string} line @returns {string} */
function normalize(line) {
  return MECHANICAL_REWRITES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), line)
}

/** @param {string[]} removed @param {string[]} added @returns {boolean} */
function isMechanical(removed, added) {
  if (removed.length !== added.length) return false
  return removed.every((line, i) => normalize(line) === normalize(added[i]))
}

/** @param {string} file @returns {{ date: string, removed: string[], added: string[] }[]} newest first */
function fileHistory(file) {
  const log = execFileSync('git', ['log', '--format=@@commit %cs', '-p', '--unified=0', '--no-color', '--', file], {
    cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024,
  })
  const commits = []
  for (const line of log.split('\n')) {
    if (line.startsWith('@@commit ')) commits.push({ date: line.slice(9), removed: [], added: [] })
    else if (line.startsWith('-') && !line.startsWith('---')) commits.at(-1)?.removed.push(line.slice(1))
    else if (line.startsWith('+') && !line.startsWith('+++')) commits.at(-1)?.added.push(line.slice(1))
  }
  return commits
}

/** @param {string} file @returns {string} YYYY-MM-DD */
function lastContentDate(file) {
  const commits = fileHistory(file)
  const real = commits.find((c) => !isMechanical(c.removed, c.added))
  return (real ?? commits.at(-1))?.date ?? new Date().toISOString().slice(0, 10)
}

function assertFullHistory() {
  const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: ROOT, encoding: 'utf8' }).trim()
  if (shallow === 'true') throw new Error('make-sitemap: shallow clone, lastmod dates would be wrong. Use fetch-depth: 0.')
}

/** @returns {{ loc: string, lastmod: string }[]} */
function collectEntries() {
  const byLoc = new Map()
  for (const file of listHtml(SITE_DIR)) {
    const html = fs.readFileSync(file, 'utf8')
    const loc = canonicalOf(html)
    if (!loc || isNoindex(html)) continue
    if (byLoc.has(loc)) throw new Error(`make-sitemap: duplicate canonical ${loc} in ${byLoc.get(loc).file} and ${file}`)
    byLoc.set(loc, { loc, lastmod: lastContentDate(file), file })
  }
  const entries = [...byLoc.values()].map(({ loc, lastmod }) => ({ loc, lastmod }))
  return entries.sort((a, b) => (a.loc === HOME ? -1 : b.loc === HOME ? 1 : a.loc.localeCompare(b.loc)))
}

/** @param {{ loc: string, lastmod: string }[]} entries @returns {string} */
function render(entries) {
  const urls = entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

function main() {
  assertFullHistory()
  const entries = collectEntries()
  const xml = render(entries)
  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, 'utf8') : ''
    if (current !== xml) {
      console.error('site/sitemap.xml is out of date. Run: node scripts/build/make-sitemap.mjs')
      process.exit(1)
    }
    console.log(`sitemap.xml up to date (${entries.length} URLs)`)
    return
  }
  fs.writeFileSync(OUT_FILE, xml)
  console.log(`sitemap.xml  ${entries.length} URLs written`)
}

main()
