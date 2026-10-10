/**
 * Bakes the rendered DOM into any dist page (prerender.mjs, generalised).
 *
 * Why this exists
 * ---------------
 * The site is one file: React from a CDN, JSX compiled in the browser by Babel
 * Standalone. That means the server ships `<div id="root"></div>` and nothing
 * else — every word of copy is produced by JavaScript after load.
 *
 * Google renders JavaScript and would eventually see it. The answer engines do
 * not. GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot fetch raw HTML and
 * never execute a script, so all of the FAQ prose and case-study copy — the
 * exact material AEO and GEO depend on — was invisible to them. robots.txt
 * politely invited crawlers to read an empty page.
 *
 * So the page is rendered once here, in real Chrome, and the resulting markup
 * is written into #root as its initial content. A crawler now gets the whole
 * document from the first byte. A browser still boots React, and because
 * createRoot().render() replaces the container's children outright there is no
 * hydration contract to violate — the baked markup is a starting frame, not a
 * tree React has to agree with.
 *
 * Chrome comes from the local install via puppeteer-core; nothing is downloaded.
 */
import fs from 'fs'
import path from 'path'
import http from 'http'
import puppeteer from 'puppeteer-core'

const DIST = 'dist'
/* Which page to bake: `node prerender-page.mjs dubai/index.html`. */
const TARGET = process.argv[2] || 'index.html'
const PORT = 5191

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => p && fs.existsSync(p))

if (!CHROME) {
  console.error('No Chrome or Edge found — cannot prerender.')
  process.exit(1)
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain',
}

/* Chrome has to fetch the page over http — file:// would break the relative
   asset paths and the fetch of outline-path.json. */
const server = http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html'
  if (rel.endsWith('/')) rel += 'index.html'
  const file = path.join(DIST, rel)
  if (!file.startsWith(path.resolve(DIST)) && !path.resolve(file).startsWith(path.resolve(DIST))) {
    res.writeHead(403).end(); return
  }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404).end('not found'); return }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    res.end(buf)
  })
})

await new Promise((r) => server.listen(PORT, r))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--host-resolver-rules=MAP www.google-analytics.com 127.0.0.1, MAP region1.google-analytics.com 127.0.0.1, MAP analytics.google.com 127.0.0.1, MAP www.googletagmanager.com 127.0.0.1', '--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
})

try {
  const page = await browser.newPage()
  /* A desktop viewport, because several sections branch on width and the
     desktop tree is the fuller one. */
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

  const failures = []
  page.on('pageerror', (e) => failures.push(`pageerror: ${e.message}`))
  page.on('requestfailed', (r) => {
    /* The CDN videos and decorative images are not part of the text payload and
       may be blocked in a headless context; only same-origin misses matter. */
    if (r.url().includes(`localhost:${PORT}`)) failures.push(`404: ${r.url()}`)
  })

  await page.goto(`http://localhost:${PORT}/${TARGET}`, { waitUntil: 'networkidle2', timeout: 60000 })

  /* Babel has to compile ~2,100 lines of JSX before React even starts, so
     "load" means nothing here. Wait for real content instead. */
  await page.waitForFunction(
    () => {
      const r = document.getElementById('root')
      return r && r.children.length > 0 && r.innerText.trim().split(/\s+/).length > 500
    },
    { timeout: 60000, polling: 200 },
  )

  /* Let entrance animations settle so the baked frame is the resting state
     rather than something caught at opacity 0. */
  await new Promise((r) => setTimeout(r, 2500))

  const snapshot = await page.evaluate(() => {
    window.scrollTo(0, 0)

    /* hls.js attaches a blob: URL to each <video> during this render. Those
       blobs belong to the prerender origin and are dead everywhere else, so
       baking them in gives every real visitor two "not allowed to load local
       resource" errors and a blank video until hls.js re-attaches. Drop the
       attribute and let the player set its own on load. */
    let stripped = 0
    for (const v of document.querySelectorAll('video[src^="blob:"]')) {
      v.removeAttribute('src'); stripped++
    }

    return {
      strippedBlobs: stripped,
      html: document.getElementById('root').innerHTML,
      words: document.body.innerText.replace(/\s+/g, ' ').trim().split(' ').length,
      h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim()),
      sections: [...document.querySelectorAll('section[id]')].map((s) => s.id),
    }
  })

  if (failures.length) {
    console.log('WARNING during render:')
    for (const f of [...new Set(failures)].slice(0, 10)) console.log('  ' + f)
  }

  const file = path.join(DIST, TARGET)
  let html = fs.readFileSync(file, 'utf8')

  const marker = '<div id="root"></div>'
  if (!html.includes(marker)) {
    /* Re-running against an already-baked file would nest one snapshot inside
       the last. Fail loudly instead — build-dist.mjs writes a clean file. */
    throw new Error('empty <div id="root"></div> not found — run build-dist.mjs first')
  }

  const before = html.length
  /* Everything is in the single frame now. The process section used to mount
     one phase at a time, which forced a scroll-sweep here to collect the other
     five into a <noscript> block; the timeline renders all six, so the whole
     page is captured in one pass and that machinery is gone. */
  html = html.replace(marker, `<div id="root">${snapshot.html}</div>`)
  fs.writeFileSync(file, html)

  console.log(`rendered      ${snapshot.words} words, ${snapshot.sections.length} sections`)
  if (snapshot.strippedBlobs) console.log(`blob srcs     ${snapshot.strippedBlobs} stripped from <video>`)
  console.log(`h1            ${JSON.stringify(snapshot.h1)}`)
  console.log(`index.html    ${(before / 1024).toFixed(0)}KB -> ${(html.length / 1024).toFixed(0)}KB`)
} finally {
  await browser.close()
  server.close()
}
