/* Temporary: why is the intro track short on a phone? Delete once confirmed. */
import fs from 'fs'
import http from 'http'
import path from 'path'
import puppeteer from 'puppeteer-core'

const ROOT = 'dist'
const PORT = Number(process.env.PORT || 5631)
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
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1800))

const out = await page.evaluate(() => {
  const s = document.getElementById('intro')
  const cs = getComputedStyle(s)
  const rules = []
  for (const sheet of document.styleSheets) {
    let list
    try { list = sheet.cssRules } catch (e) { continue }
    const walk = (rs, cond) => {
      for (const r of rs) {
        if (r.type === CSSRule.MEDIA_RULE) walk(r.cssRules, r.conditionText)
        else if (r.selectorText && r.style && r.style.height) {
          try { if (s.matches(r.selectorText)) rules.push({ sel: r.selectorText, h: r.style.height,
                     imp: r.style.getPropertyPriority('height'), cond: cond || '(none)' }) } catch (e) {}
        }
      }
    }
    walk(list, null)
  }
  return {
    inline: s.getAttribute('style'),
    computedH: cs.height, offsetH: s.offsetHeight,
    vh: window.innerHeight, docVh: document.documentElement.clientHeight,
    mq640: window.matchMedia('(max-width: 640px)').matches,
    mq767: window.matchMedia('(max-width: 767px)').matches,
    rules,
  }
})
console.log(JSON.stringify(out, null, 2))

await browser.close()
server.close()
