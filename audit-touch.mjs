/* Tap-target check. Anything interactive under ~40px on a touch screen is a
   miss-tap waiting to happen; 44px is the figure both Apple and WCAG 2.5.8
   converge on. Measured on a real phone viewport, not inferred from classes. */
import fs from 'fs'
import path from 'path'
import http from 'http'
import puppeteer from 'puppeteer-core'

const DIST = 'dist', PORT = 5194
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

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true })
  await page.goto(`http://localhost:${PORT}/index.html`, {waitUntil:'domcontentloaded',timeout:120000})
  await page.waitForFunction(() => document.getElementById('root').innerText.split(/\s+/).length > 400,
    { timeout: 60000, polling: 200 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 1500))

  /* The brand marquee never stops, so a target can slide between two
     elementFromPoint probes and read as a miss that a finger would not see.
     Freeze animation before hit-testing. */
  await page.addStyleTag({ content: '*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }' })
  await new Promise((r) => setTimeout(r, 300))

  const probeAt = () => page.evaluate(() => {
    /* The box of the <a> is not the tap target — a pseudo-element can extend the
       hit area past it. So hit-test real points instead of trusting the rect:
       probe 21px above and below centre and ask what the browser would deliver
       the tap to. elementFromPoint reports the originating element for a
       pseudo-element, which is exactly what a finger would activate. */
    const rows = []
    for (const el of document.querySelectorAll('a[href], button, [role="button"]')) {
      const r = el.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) continue
      /* An element that cannot receive pointer events is not a tap target.
         The services carousel scales its background cards down and disables
         them, so their buttons measure small but were never tappable. */
      let dead = false
      for (let e = el; e; e = e.parentElement) {
        if (getComputedStyle(e).pointerEvents === 'none') { dead = true; break }
      }
      if (dead) continue
      /* Must be fully on screen with room for the probe points, or
         elementFromPoint returns null for reasons that have nothing to do with
         the tap target. The marquee clips logos at both edges. */
      if (r.top < 22 || r.bottom > innerHeight - 22) continue
      if (r.left < 22 || r.right > innerWidth - 22) continue
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      /* Compare by destination, not identity: the brand marquee renders two
         copies of its track, so a tap near one logo legitimately lands on the
         duplicate — same href, same result for the user. */
      const href = el.getAttribute('href')
      const owns = (x, y) => {
        const h = document.elementFromPoint(x, y)
        if (!h) return false
        if (h === el || el.contains(h) || h.contains(el)) return true
        const a = h.closest('a[href]')
        return !!a && href != null && a.getAttribute('href') === href
      }
      const vReach = owns(cx, cy - 21) && owns(cx, cy + 21)
      const hReach = owns(cx - 21, cy) && owns(cx + 21, cy)
      rows.push({
        tag: el.tagName.toLowerCase(),
        txt: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('href') || '').trim().slice(0, 26),
        w: Math.round(r.width), h: Math.round(r.height),
        boxOK: r.width >= 40 && r.height >= 40,
        reach44: vReach && hReach,
        sec: el.closest('section[id]')?.id || '(chrome)',
      })
    }
    return { rows }
  })

  /* Only what is in the viewport can be hit-tested, so sweep the page rather
     than judging the whole site by whatever the hero happens to show. */
  const seenKey = new Set()
  const onscreen = []
  for (const target of ['#top', '#services', '#projects', '#faq', '#contact']) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel)
      if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' })
    }, target)
    await new Promise((r) => setTimeout(r, 700))
    for (const row of (await probeAt()).rows) {
      const k = `${row.sec}|${row.txt}|${row.w}x${row.h}`
      if (seenKey.has(k)) continue
      seenKey.add(k)
      onscreen.push(row)
    }
  }
  const fail = onscreen.filter((r) => !r.boxOK && !r.reach44)
  const rescued = onscreen.filter((r) => !r.boxOK && r.reach44)
  console.log(`on-screen interactive elements tested: ${onscreen.length}`)
  console.log(`box already >=40px:                    ${onscreen.filter((r) => r.boxOK).length}`)
  console.log(`box small, but 44px hit area reaches:  ${rescued.length}`)
  console.log(`FAIL - under 44px and no reach:        ${fail.length}`)
  for (const s of rescued) console.log(`   ok   ${String(s.w).padStart(4)}x${String(s.h).padStart(3)}  [${s.sec}] ${s.txt}`)
  for (const s of fail) console.log(`   FAIL ${String(s.w).padStart(4)}x${String(s.h).padStart(3)}  [${s.sec}] ${s.txt}`)
} finally { await browser.close(); server.close() }
