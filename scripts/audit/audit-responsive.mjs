/**
 * Measures the built site across the real device matrix.
 *
 * Guessing at breakpoints from the source is how responsive bugs survive. This
 * loads dist/ in real Chrome at every viewport that matters and reports what
 * actually overflows, what falls below the fold, and what renders too small to
 * read — so the fixes land on measured problems.
 *
 * Run with `node scripts/audit/audit-responsive.mjs` after `npm run site`.
 */
import fs from 'fs'
import path from 'path'
import http from 'http'
import puppeteer from 'puppeteer-core'

const DIST = 'dist'
const PORT = 5192

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
].find((p) => p && fs.existsSync(p))

const VIEWPORTS = [
  ['watch-ish min', 272, 340],
  ['iPhone SE 1', 320, 568],
  ['Android small', 360, 640],
  ['iPhone SE 2', 375, 667],
  ['iPhone 14', 390, 844],
  ['Pro Max', 430, 932],
  ['phone landscape', 667, 375],
  ['iPad portrait', 768, 1024],
  ['iPad landscape', 1024, 768],
  ['iPad Air ls', 1180, 820],
  ['laptop', 1280, 800],
  ['laptop 768p', 1366, 768],
  ['MacBook', 1440, 900],
  ['24in 1080p', 1920, 1080],
  ['27in 1440p', 2560, 1440],
  ['ultrawide', 3440, 1440],
  ['4K', 3840, 2160],
]

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain',
}
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html'
  fs.readFile(path.join(DIST, rel), (err, buf) => {
    if (err) { res.writeHead(404).end(); return }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(rel)] || 'application/octet-stream' })
    res.end(buf)
  })
})
await new Promise((r) => server.listen(PORT, r))

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
})

const probe = () => {
  const vw = window.innerWidth, vh = window.innerHeight
  const docW = document.documentElement.scrollWidth

  /* Which elements actually stick out. Report the widest few by their own box,
     ignoring anything deliberately clipped by an ancestor. */
  const offenders = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const over = Math.round(r.right - vw)
    if (over > 2 && r.left < vw) {
      const cs = getComputedStyle(el)
      if (cs.position === 'fixed') continue
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 38),
        over,
        w: Math.round(r.width),
      })
    }
  }
  offenders.sort((a, b) => b.over - a.over)

  /* Hero must fit: the client logo row is the lowest element in it. */
  const hero = document.getElementById('top')
  const logos = hero ? [...hero.querySelectorAll('img')].filter((i) => /brands\//.test(i.src)) : []
  const heroBottom = logos.length ? Math.max(...logos.map((i) => i.getBoundingClientRect().bottom)) : null

  /* Smallest actually-rendered text, and how wide the reading column gets —
     on a 3440 monitor an unconstrained paragraph becomes unreadable. */
  let minFont = 999, widestText = 0
  for (const el of document.querySelectorAll('p, li, h1, h2, h3, span, a')) {
    if (!el.textContent.trim() || el.children.length) continue
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    const fs = parseFloat(getComputedStyle(el).fontSize)
    if (fs < minFont) minFont = fs
    if (r.width > widestText) widestText = Math.round(r.width)
  }

  return {
    vw, vh,
    overflow: Math.max(0, docW - vw),
    offenders: offenders.slice(0, 4),
    heroOverflowsFold: heroBottom == null ? null : Math.round(heroBottom - vh),
    minFont: minFont === 999 ? null : Math.round(minFont * 10) / 10,
    widestText,
  }
}

const rows = []
try {
  const page = await browser.newPage()
  for (const [name, w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h })
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.waitForFunction(() => {
      const r = document.getElementById('root')
      return r && r.innerText.trim().split(/\s+/).length > 400
    }, { timeout: 60000, polling: 200 }).catch(() => {})
    await new Promise((r) => setTimeout(r, 1200))
    rows.push({ name, ...(await page.evaluate(probe)) })
  }
} finally {
  await browser.close()
  server.close()
}

const F = (s, n) => String(s).padEnd(n)
console.log(F('viewport', 17) + F('size', 12) + F('x-overflow', 12) + F('hero vs fold', 14) + F('min font', 10) + 'widest text')
console.log('-'.repeat(78))
for (const r of rows) {
  const fold = r.heroOverflowsFold == null ? 'n/a' : r.heroOverflowsFold <= 0 ? 'fits' : `+${r.heroOverflowsFold}px OVER`
  console.log(
    F(r.name, 17) + F(`${r.vw}x${r.vh}`, 12) +
    F(r.overflow ? `${r.overflow}px BAD` : 'none', 12) +
    F(fold, 14) + F(r.minFont ? `${r.minFont}px` : '-', 10) + `${r.widestText}px`,
  )
}
const bad = rows.filter((r) => r.overflow > 0)
if (bad.length) {
  console.log('\noverflow detail:')
  for (const r of bad) {
    console.log(`  ${r.vw}x${r.vh}`)
    for (const o of r.offenders) console.log(`     +${o.over}px  ${o.tag}.${o.cls} (w=${o.w})`)
  }
}
