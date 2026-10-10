/* Verify discrete screen-tier tokens: within a class, hero type must not drift
   when the viewport is resized a few dozen pixels; across classes it must step. */
import fs from 'fs'
import path from 'path'
import http from 'http'
import puppeteer from 'puppeteer-core'

const DIST = 'dist'
const PORT = 5477
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p))
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.js': 'application/javascript',
  '.css': 'text/css',
}

const server = http.createServer((q, r) => {
  const rel = decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html'
  fs.readFile(path.join(DIST, rel), (e, b) => {
    if (e) { r.writeHead(404).end(); return }
    r.writeHead(200, { 'Content-Type': MIME[path.extname(rel)] || 'application/octet-stream' })
    r.end(b)
  })
})
await new Promise((r) => server.listen(PORT, r))

const TIERS = [
  { name: 'phone', w: 390, h: 844, screen: 'phone', h1: [24, 36], display: [32, 48] },
  { name: 'tablet', w: 768, h: 1024, screen: 'tablet', h1: [34, 46], display: [48, 64] },
  { name: 'laptop', w: 1280, h: 720, screen: 'laptop', h1: [36, 52], display: [52, 78] },
  { name: 'projector', w: 1024, h: 768, screen: 'laptop', h1: [34, 48], display: [48, 72] },
  { name: 'desktop', w: 1440, h: 900, screen: 'desktop', h1: [52, 68], display: [72, 100] },
  { name: 'wide', w: 1920, h: 1080, screen: 'wide', h1: [58, 76], display: [84, 112] },
  { name: 'ultrawide', w: 3440, h: 1440, screen: 'wide', h1: [58, 76], display: [84, 112] },
]

const br = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
})

const measure = async (page) => page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement)
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    return Math.round(parseFloat(getComputedStyle(el).fontSize))
  }
  return {
    screen: cs.getPropertyValue('--screen').trim(),
    contentMax: cs.getPropertyValue('--content-max').trim(),
    fsH1: cs.getPropertyValue('--fs-h1').trim(),
    h1: pick('.hero-dark-h1, .hero-light-h1'),
    display: pick('.hero-heading'),
    brandBottom: (() => {
      const el = document.querySelector('.hero-brands')
      if (!el) return null
      return Math.round(el.getBoundingClientRect().bottom)
    })(),
    vh: innerHeight,
  }
})

let fails = 0
console.log('tier'.padEnd(12) + 'screen'.padEnd(10) + 'h1'.padStart(6) + 'disp'.padStart(6) + 'fold'.padStart(8) + '  verdict')
console.log('-'.repeat(56))

for (const t of TIERS) {
  const page = await br.newPage()
  await page.setCacheEnabled(false)
  await page.setViewport({ width: t.w, height: t.h, deviceScaleFactor: 1 })
  await page.setRequestInterception(true)
  page.on('request', (rq) => {
    try { /mux\.com|\.m3u8|\.ts(\?|$)/.test(rq.url()) ? rq.abort() : rq.continue() }
    catch { try { rq.continue() } catch {} }
  })
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1800))

  const m = await measure(page)
  const issues = []
  if (m.screen !== t.screen) issues.push(`screen=${m.screen}≠${t.screen}`)
  if (m.h1 == null) issues.push('missing h1')
  else if (m.h1 < t.h1[0] || m.h1 > t.h1[1]) issues.push(`h1=${m.h1} out ${t.h1}`)
  if (m.display != null && (m.display < t.display[0] || m.display > t.display[1])) {
    issues.push(`disp=${m.display} out ${t.display}`)
  }
  if (m.brandBottom != null && m.brandBottom > m.vh + 2) issues.push(`brands below fold (${m.brandBottom}>${m.vh})`)

  /* Intra-tier stability: nudge width ±40px, h1 must stay within 2px */
  if (t.w >= 1024) {
    await page.setViewport({ width: t.w + 40, height: t.h, deviceScaleFactor: 1 })
    await new Promise((r) => setTimeout(r, 200))
    const m2 = await measure(page)
    if (m.h1 != null && m2.h1 != null && Math.abs(m.h1 - m2.h1) > 2) {
      issues.push(`drift ${m.h1}→${m2.h1} within tier`)
    }
  }

  const ok = issues.length === 0
  if (!ok) fails++
  console.log(
    t.name.padEnd(12) +
    String(m.screen || '?').padEnd(10) +
    String(m.h1 ?? '-').padStart(6) +
    String(m.display ?? '-').padStart(6) +
    (m.brandBottom != null ? `${m.brandBottom}/${m.vh}` : '-').padStart(8) +
    '  ' + (ok ? 'PASS' : 'FAIL ' + issues.join('; '))
  )
  await page.close()
}

await br.close()
server.close()
if (fails) {
  console.log(`\n${fails} tier(s) failed`)
  process.exit(1)
}
console.log('\nAll screen tiers locked.')
