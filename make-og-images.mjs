/**
 * Link-preview images (WhatsApp, LinkedIn, Facebook, X) from each homepage's own hero.
 *   dist/og/og-india.jpg  ← https://qdnco.com/ hero      dist/og/og-dubai.jpg ← /dubai/ hero
 * captured at 1440×756 (same 1.91:1 ratio, desktop layout) and saved at 1200×630, light theme, floating UI hidden.
 */
import fs from 'fs'; import path from 'path'; import http from 'http'
import puppeteer from 'puppeteer-core'
const DIST = 'dist', T = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4'}
const srv = http.createServer((q, r) => { let rel = decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html'; if (rel.endsWith('/')) rel += 'index.html'
  fs.readFile(path.join(DIST, rel), (e, b) => { if (e) { r.writeHead(404).end(); return } r.writeHead(200, { 'Content-Type': T[path.extname(rel)] || 'application/octet-stream' }); r.end(b) }) }).listen(5197)
fs.mkdirSync('dist/og', { recursive: true })
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--host-resolver-rules=MAP www.google-analytics.com 127.0.0.1, MAP region1.google-analytics.com 127.0.0.1, MAP analytics.google.com 127.0.0.1, MAP www.googletagmanager.com 127.0.0.1', '--autoplay-policy=no-user-gesture-required'] })
for (const [page, out] of [['index.html', 'og-india'], ['dubai/index.html', 'og-dubai']]) {
  const p = await b.newPage()
  await p.evaluateOnNewDocument(() => { try { localStorage.setItem('qd-theme', 'light') } catch (e) {} })
  await p.setViewport({ width: 1440, height: 756, deviceScaleFactor: 1.5 })
  await p.goto('http://localhost:5197/' + page, { waitUntil: 'networkidle2', timeout: 90000 })
  await new Promise((r) => setTimeout(r, 6000))           // entrance animations + video frame
  await p.addStyleTag({ content: '.fixed.bottom-0,.fixed.bottom-4,.fixed.bottom-5,.fixed.bottom-6,[class*="scroll-orb"],#boot-loader{display:none!important}' })
  await p.evaluate(() => { for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e); if (cs.position === 'fixed' && e.getBoundingClientRect().top > 400) e.style.display = 'none' } })
  await new Promise((r) => setTimeout(r, 400))
  await p.screenshot({ path: `dist/og/${out}.png` })
  await p.close()
  console.log('captured', out)
}
await b.close(); srv.close()
