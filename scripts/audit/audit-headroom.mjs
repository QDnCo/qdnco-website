/* Every section's first heading must clear the fixed nav bar on arrival, on
   every screen class. Measures the gap between the bar's bottom edge and the
   heading's top when the section is scrolled to its own start. Negative means
   the heading lands underneath the bar. */
import fs from 'fs'; import path from 'path'; import http from 'http'; import puppeteer from 'puppeteer-core'
const DIST='dist',PORT=5371
const CHROME=['C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p))
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4'}
const server=http.createServer((q,r)=>{const rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html'
 fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':MIME[path.extname(rel)]||'application/octet-stream'});r.end(b)})})
await new Promise(r=>server.listen(PORT,r))

const VIEWPORTS=[['phone',390,844],['tablet',768,1024],['laptop',1280,720],
                 ['macbook',1440,900],['24in',1920,1080],['ultrawide',3440,1440],
                 ['projector',1024,768]]
const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--hide-scrollbars']})

/* Navigation retry.
 * Chained after another audit that has just torn down a dozen browser
 * sessions, the first navigation here can exceed its deadline while the OS is
 * still reclaiming them — the page is fine, the machine is briefly busy. One
 * retry turns a spurious suite failure into a short pause. */
const gotoRetry = async (page, url) => {
  for (let attempt = 1; ; attempt++) {
    try { return await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }) }
    catch (e) {
      if (attempt >= 3) throw e
      await new Promise((r) => setTimeout(r, 2000 * attempt))
    }
  }
}
let worst=Infinity, worstAt=''
console.log('viewport      ' + 'section'.padEnd(11) + 'gap below nav')
console.log('-'.repeat(46))
for(const [label,W,H] of VIEWPORTS){
  const page=await br.newPage(); await page.setCacheEnabled(false)
  /* The wallpaper stream is decoration and it is what stalls navigation on the
     bigger viewports. Blocking it makes the audit measure layout, not
     bandwidth. Interception must be total once enabled: a handler that throws
     leaves later requests hanging and DOMContentLoaded never fires. */
  await page.setRequestInterception(true)
  page.on('request',(rq)=>{
    try { /mux\.com|\.m3u8|\.ts(\?|$)/.test(rq.url()) ? rq.abort() : rq.continue() }
    catch (e) { try { rq.continue() } catch (_) {} }
  })
  await page.setViewport({width:W,height:H})
  await gotoRetry(page, `http://localhost:${PORT}/index.html`)
  await new Promise(r=>setTimeout(r,2400))
  const ids=await page.evaluate(()=>[...document.querySelectorAll('section[id]')].map(s=>s.id))
  for(const id of ids){
    if(id==='top') continue
    await page.evaluate((id)=>{const s=document.getElementById(id); scrollTo(0,s.offsetTop)},id)
    await new Promise(r=>setTimeout(r,420))
    const g=await page.evaluate((id)=>{
      const sec=document.getElementById(id)
      const bar=document.querySelector('nav')||document.querySelector('header')
      if(!bar) return null
      const hd=sec.querySelector('h1,h2')
      if(!hd) return null
      const hr=hd.getBoundingClientRect()
      if(hr.height===0) return null
      return Math.round(hr.top - bar.getBoundingClientRect().bottom)
    },id)
    if(g===null) continue
    if(g<worst){worst=g; worstAt=`${label}/${id}`}
    if(g<0) console.log(`${label.padEnd(14)}${id.padEnd(11)}${String(g).padStart(5)}  <-- UNDER THE BAR`)
  }
  await page.close()
}
await br.close(); server.close()
console.log(`\nworst clearance ${worst}px at ${worstAt}`)
console.log(worst>=0 ? 'PASS - every heading starts below the bar' : 'FAIL')
