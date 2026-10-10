/* Temporary: for each phone/tablet size, checks that the intro track has a real
   scroll budget, that the card fits the pinned frame without clipping, and that
   every revealed element reaches full opacity. Delete once confirmed. */
import fs from 'fs'
import http from 'http'
import path from 'path'
import puppeteer from 'puppeteer-core'

const ROOT = 'dist'
const PORT = Number(process.env.PORT || 5641)
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
                '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.txt': 'text/plain' }
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0])
  if (f.endsWith('/')) f += 'index.html'
  const p = path.join(ROOT, f)
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end(); return }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' })
  res.end(fs.readFileSync(p))
})
await new Promise((r) => server.listen(PORT, r))

const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
                'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p))
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })

const VIEWS = [['SE1', 320, 568], ['android-sm', 360, 640], ['SE2', 375, 667],
               ['iPhone14', 390, 844], ['ProMax', 430, 932], ['tablet', 768, 1024],
               ['tablet-lg', 860, 1100], ['desktop', 1440, 900]]

let bad = 0
for (const [name, w, h] of VIEWS) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 900, hasTouch: w < 900 })
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1600))

  const g = await page.evaluate(() => {
    const s = document.getElementById('intro')
    return { top: s.offsetTop, h: s.offsetHeight, vh: window.innerHeight }
  })
  const budget = g.h - g.vh

  /* Walk the whole track and keep the best opacity each element reaches, plus
     the worst overflow of the card out of its pinned frame. */
  let best = null, clip = 0
  for (let i = 0; i <= 20; i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), Math.round(g.top + Math.max(0, budget) * (i / 20)))
    await new Promise((r) => setTimeout(r, 220))
    const m = await page.evaluate(() => {
      const op = (sel) => { const e = document.querySelector(sel)
        return e ? +parseFloat(getComputedStyle(e).opacity).toFixed(2) : null }
      const frame = document.querySelector('#intro > div')
      const card = document.querySelector('.intro-card')
      let over = 0
      if (frame && card) {
        const f = frame.getBoundingClientRect(), c = card.getBoundingClientRect()
        const cs = getComputedStyle(frame)
        const top = f.top + parseFloat(cs.paddingTop), bot = f.bottom - parseFloat(cs.paddingBottom)
        over = Math.round(Math.max(0, top - c.top) + Math.max(0, c.bottom - bot))
      }
      return { over, v: { title: op('.intro-card-title'), sub: op('.intro-card-sub'),
                          fig: op('.intro-card-figure'), stat: op('.intro-card-stats > div'),
                          sign: op('.intro-card-sign'), avail: op('.intro-avail') } }
    })
    clip = Math.max(clip, m.over)
    if (!best) best = m.v
    else for (const k of Object.keys(m.v)) if (m.v[k] !== null) best[k] = Math.max(best[k] ?? 0, m.v[k])
  }

  const missing = Object.entries(best).filter(([k, v]) => v !== null && v < 0.99).map(([k]) => k)
  const ok = budget > 0 && missing.length === 0 && clip === 0
  if (!ok) bad++
  console.log(`${name.padEnd(11)} ${String(w + 'x' + h).padEnd(9)} budget=${String(budget).padStart(5)}  ` +
              `clip=${String(clip).padStart(3)}px  ` +
              `${missing.length ? 'NEVER REVEALS: ' + missing.join(',') : 'all reveal'}  ${ok ? 'OK' : 'FAIL'}`)
  await page.close()
}

console.log(bad ? `\n${bad} viewport(s) failing` : '\nall viewports pass')
await browser.close()
server.close()
