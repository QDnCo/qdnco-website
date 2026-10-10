/**
 * Verifies hero brand scroll is inside the fold and captures screenshots.
 * Also samples boot loader + Vaishnavi brand-scroll spacing.
 */
import fs from 'fs'
import http from 'http'
import path from 'path'
import puppeteer from 'puppeteer-core'

const ROOT = 'dist'
const PORT = 5644
const OUT = '_hero-verify'
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
                'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
  .find((p) => fs.existsSync(p))

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.json': 'application/json', '.txt': 'text/plain',
}

fs.mkdirSync(OUT, { recursive: true })
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0])
  if (f.endsWith('/')) f += 'index.html'
  const p = path.join(ROOT, f)
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end(); return }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' })
  res.end(fs.readFileSync(p))
})
await new Promise((r) => server.listen(PORT, r))

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
const views = [
  [390, 844, 'phone'],
  [1280, 800, 'lap'],
  [1920, 1080, 'desk'],
]
const themes = ['light', 'dark']
const results = []

for (const theme of themes) {
  for (const [w, h, name] of views) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: h, isMobile: w < 800, hasTouch: w < 800 })
    await page.evaluateOnNewDocument((t) => {
      try { localStorage.setItem('qd-theme', t) } catch {}
    }, theme)

    /* Boot loader sample — freeze before React dismisses it */
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => {
      const el = document.getElementById('boot-loader')
      if (el) { el.classList.remove('is-done'); el.style.opacity = '1'; el.style.visibility = 'visible' }
    })
    await new Promise((r) => setTimeout(r, 350))
    if (name === 'phone') {
      await page.screenshot({ path: path.join(OUT, `boot-${theme}-${name}.png`) })
    }

    /* Let the app settle, then measure fold */
    await page.evaluate(() => {
      const el = document.getElementById('boot-loader')
      if (el) el.remove()
    })
    await new Promise((r) => setTimeout(r, 2200))

    const m = await page.evaluate(() => {
      const brands = document.querySelector('#top .hero-brands')
      const ticker = document.querySelector('#top .hero-ticker')
      const b = brands?.getBoundingClientRect()
      const t = ticker?.getBoundingClientRect()
      const imgs = [...(brands?.querySelectorAll('img') || [])]
      const vaish = imgs.find((i) => /vaishnavi/i.test(i.src || i.alt || ''))
      const indium = imgs.find((i) => /indium/i.test(i.src || i.alt || ''))
      const kumar = imgs.find((i) => /kumar/i.test(i.src || i.alt || ''))
      const gap = (a, b) => {
        if (!a || !b) return null
        const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect()
        return Math.round(br.left - ar.right)
      }
      const boot = document.querySelector('#boot-loader .boot-logo')
      return {
        brandsInFold: b ? (b.top >= 0 && b.bottom <= innerHeight + 2 && b.height > 8) : false,
        brandsBottom: b ? Math.round(b.bottom) : null,
        viewportH: innerHeight,
        gapTickerToBrands: (t && b) ? Math.round(b.top - t.bottom) : null,
        gapKumarVaish: gap(kumar, vaish),
        gapVaishIndium: gap(vaish, indium),
        hasBootLogo: !!document.querySelector('.boot-logo, img[alt*="QD"]'),
        adReelH2: [...document.querySelectorAll('h2')].map((e) => e.textContent.trim()).find((x) => /50|ads/i.test(x)) || null,
      }
    })

    await page.screenshot({ path: path.join(OUT, `hero-${theme}-${name}.png`) })
    results.push({ theme, name, w, h, ...m })
    console.log(theme, name, w + 'x' + h, JSON.stringify(m))
    await page.close()
  }
}

await browser.close()
server.close()

const fails = results.filter((r) => !r.brandsInFold)
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(results, null, 2))
if (fails.length) {
  console.error('FAIL brand scroll not in fold:', fails.map((f) => `${f.theme}/${f.name}`).join(', '))
  process.exit(1)
}
console.log('PASS all views have hero brand scroll in fold')
