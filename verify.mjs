import fs from 'fs'; import path from 'path'; import http from 'http'; import puppeteer from 'puppeteer-core'
const DIST='dist',PORT=5311
const CHROME=['C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p))
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.txt':'text/plain','.xml':'application/xml'}
const server=http.createServer((q,r)=>{const rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html'
 fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':MIME[path.extname(rel)]||'application/octet-stream'});r.end(b)})})
await new Promise(r=>server.listen(PORT,r))
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
let fail=0
for (const [w,h,label] of [[1440,900,'desktop'],[390,844,'phone']]) {
  const page=await br.newPage(); await page.setCacheEnabled(false); await page.setViewport({width:w,height:h})
  const errs=[], missing=[]
  page.on('pageerror',e=>errs.push(String(e).slice(0,140)))
  page.on('console',m=>{ if(m.type()==='error') errs.push('console: '+m.text().slice(0,140)) })
  page.on('response',r=>{ if(r.status()>=400) missing.push(`${r.status()} ${r.url().replace(`http://localhost:${PORT}/`,'')}`) })
  await gotoRetry(page, `http://localhost:${PORT}/index.html`)
  await new Promise(r=>setTimeout(r,2500))
  // walk the whole page so every scroll-driven section mounts
  const H=await page.evaluate(()=>document.body.scrollHeight)
  for(let y=0;y<H;y+=Math.round(h*0.7)){ await page.evaluate(y=>scrollTo(0,y),y); await new Promise(r=>setTimeout(r,240)) }
  const sections=await page.evaluate(()=>[...document.querySelectorAll('section[id]')].map(s=>s.id))
  const intro=await page.evaluate(()=>{const c=document.querySelector('.intro-card')
    if(!c) return 'MISSING'
    const r=c.getBoundingClientRect()
    return {w:Math.round(r.width),h:Math.round(r.height),
      img:!!document.querySelector('.intro-card-figure img'),
      sign:!!document.querySelector('.intro-sign-img'),
      avail:!!document.querySelector('.intro-avail')}})
  console.log(`\n[${label} ${w}x${h}]`)
  console.log('  sections   ', sections.length, sections.join(','))
  console.log('  intro card ', JSON.stringify(intro))
  console.log('  404s       ', missing.length?[...new Set(missing)].join(' | '):'none')
  console.log('  js errors  ', errs.length?[...new Set(errs)].join(' | '):'none')
  if(errs.length||missing.length||intro==='MISSING') fail=1
  await page.close()
}
await br.close(); server.close()
console.log(fail?'\nFAIL':'\nPASS - no errors, no 404s, intro intact')
process.exit(fail)
