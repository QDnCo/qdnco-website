/* Names the specific elements behind the two failures the matrix audit found:
   text rendering below a readable size, and reading columns that stretch with
   the monitor instead of capping. */
import fs from 'fs'
import path from 'path'
import http from 'http'
import puppeteer from 'puppeteer-core'

const DIST = 'dist', PORT = 5193
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`].find((p) => p && fs.existsSync(p))
const MIME = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' }
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html'
  fs.readFile(path.join(DIST, rel), (e, b) => {
    if (e) { res.writeHead(404).end(); return }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(rel)] || 'application/octet-stream' }); res.end(b)
  })
})
await new Promise((r) => server.listen(PORT, r))
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'] })

const run = async (w, h, label) => {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h })
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle2' })
  await page.waitForFunction(() => document.getElementById('root').innerText.split(/\s+/).length > 400,
    { timeout: 60000, polling: 200 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 1200))
  const out = await page.evaluate(() => {
    const small = [], wide = []
    for (const el of document.querySelectorAll('p, li, h1, h2, h3, span, a, div')) {
      const t = el.textContent.trim()
      if (!t || el.children.length) continue
      const r = el.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) continue
      const fs = parseFloat(getComputedStyle(el).fontSize)
      const sec = el.closest('section[id]')?.id || '(chrome)'
      if (fs < 11) small.push({ fs: Math.round(fs * 10) / 10, sec, txt: t.slice(0, 34) })
      if (r.width > 900) wide.push({ w: Math.round(r.width), sec, txt: t.slice(0, 34) })
    }
    const key = (a) => a.sec + '|' + a.fs
    const seen = new Set(), uniq = []
    for (const s of small.sort((a, b) => a.fs - b.fs)) {
      if (seen.has(key(s))) continue; seen.add(key(s)); uniq.push(s)
    }
    return { small: uniq.slice(0, 12), smallCount: small.length,
             wide: wide.sort((a, b) => b.w - a.w).slice(0, 6), wideCount: wide.length }
  })
  console.log(`\n=== ${label} (${w}x${h}) ===`)
  console.log(`text under 11px: ${out.smallCount} elements`)
  for (const s of out.small) console.log(`   ${String(s.fs).padStart(5)}px  [${s.sec}] ${s.txt}`)
  console.log(`text wider than 900px: ${out.wideCount} elements`)
  for (const x of out.wide) console.log(`   ${String(x.w).padStart(5)}px  [${x.sec}] ${x.txt}`)
  await page.close()
}

try {
  await run(375, 667, 'phone')
  await run(768, 1024, 'iPad portrait')
  await run(3840, 2160, '4K')
} finally { await browser.close(); server.close() }
