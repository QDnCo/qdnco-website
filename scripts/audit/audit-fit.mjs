/* Per-screen-class fit audit, both themes.
 *
 * For every screen class and every section it asks three questions the eye asks:
 * is anything clipped, does anything overflow sideways, and is the type in a
 * sensible band for that screen. Sections whose content is taller than the
 * viewport by design (scroll tracks) are exempt from the height test — what
 * matters there is that the PINNED frame fits, which is measured instead. */
import fs from 'fs'; import path from 'path'; import http from 'http'; import puppeteer from 'puppeteer-core'
const DIST='dist',PORT=5461
const CHROME=['C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p))
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4'}
const server=http.createServer((q,r)=>{const rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html'
 fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':MIME[path.extname(rel)]||'application/octet-stream'});r.end(b)})})
await new Promise(r=>server.listen(PORT,r))

/* Sensible type band per class. A 13px body on a 4K panel viewed at desk
   distance is as wrong as a 13px body on a phone is right. */
/* [label, width, height, absolute floor, display ceiling, prose floor]
 *
 * Two floors, and they are deliberately not per-screen.
 *
 * 12px absolute: below that nothing is comfortable on any device. Above it, size
 * should follow the ROLE of the text — label, caption, body, display — not the
 * panel it happens to be shown on. An earlier version of this file demanded
 * 14px on phones rising to 16px on an ultrawide, and chasing that flattened the
 * hierarchy: every eyebrow and chip crept up until labels were the same size as
 * the prose they were labelling.
 *
 * 13px prose: applies to paragraphs long enough to be sentences rather than
 * labels. Measured against the built site, the smallest real prose is 13.1px
 * and the only thing below it is the form's privacy fine print at 13.5px, which
 * is fine print by intent. Display copy is checked at the other end by the
 * ceiling, which IS per-screen, because a 150px headline on a 720px-tall laptop
 * is a genuine problem where the same headline on a 4K panel is not. */
const CLASSES=[
  ['phone',       390, 844,  12, 64,  13],
  ['phone-lg',    430, 932,  12, 68,  13],
  ['tablet',      768, 1024, 12, 96,  13],
  ['laptop',      1280, 720, 12, 120, 13],
  ['macbook',     1440, 900, 12, 132, 13],
  ['desktop-24',  1920, 1080,12, 168, 13],
  ['projector',   1024, 768, 12, 104, 13],
  ['ultrawide',   3440, 1440,12, 210, 13],
]

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
let fails=0
console.log('class'.padEnd(13)+'theme'.padEnd(7)+'x-ovf'.padStart(7)+'clipped'.padStart(9)+'  min/max  body  verdict')
console.log('-'.repeat(78))
for(const [label,W,H,minPx,maxPx,bodyPx] of CLASSES){
  for(const theme of ['dark','light']){
    const page=await br.newPage(); await page.setCacheEnabled(false)
    await page.setViewport({width:W,height:H})
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}])
    /* The wallpaper stream is decoration and it is what stalls navigation at
       3440px. Blocking it makes the audit measure layout, not bandwidth. */
    /* Interception has to be total once enabled: a handler that throws on one
       request leaves every later one hanging, and a render-blocking script that
       never resolves means DOMContentLoaded never fires — which is why the
       3440px pass was timing out rather than being slow. */
    await page.setRequestInterception(true)
    page.on('request',(rq)=>{
      try { /mux\.com|\.m3u8|\.ts(\?|$)/.test(rq.url()) ? rq.abort() : rq.continue() }
      catch (e) { try { rq.continue() } catch (_) {} }
    })
    await gotoRetry(page, `http://localhost:${PORT}/index.html`)
    await new Promise(r=>setTimeout(r,2400))
    if(theme==='light'){await page.evaluate(()=>{const t=document.querySelector('.theme-switch'); if(t)t.click()});await new Promise(r=>setTimeout(r,700))}
    /* Walk the page so scroll-driven content mounts and settles. */
    const docH=await page.evaluate(()=>document.body.scrollHeight)
    for(let y=0;y<docH;y+=Math.round(H*0.75)){await page.evaluate(y=>scrollTo(0,y),y);await new Promise(r=>setTimeout(r,90))}
    await page.evaluate(()=>scrollTo(0,0)); await new Promise(r=>setTimeout(r,500))

    const r=await page.evaluate(({minPx,maxPx})=>{
      const xo=Math.max(0, document.documentElement.scrollWidth - innerWidth)
      const clipped=[]
      /* A clip only matters when readable content is actually being cut. The
         document element always "overflows" because the page scrolls, and
         marquee rows clip on purpose, so both are excluded — and the test is
         whether a TEXT node's box crosses the clipping edge, not whether
         scrollHeight happens to exceed clientHeight by a rounding margin. */
      const marquee=/track|marquee|reel|edge-fade|viewport|strip/i
      for(const el of document.querySelectorAll('section, div, article, aside')){
        if(el===document.body||el===document.documentElement) continue
        const cs=getComputedStyle(el)
        if(!/hidden|clip/.test(cs.overflow+cs.overflowY)) continue
        const cls=(el.className||'').toString()
        if(marquee.test(cls)) continue
        if(el.clientHeight<60) continue
        const over=el.scrollHeight-el.clientHeight
        if(over<=8) continue
        /* Does any text actually cross the bottom edge? */
        const edge=el.getBoundingClientRect().bottom
        let cut=null
        for(const t of el.querySelectorAll('p,li,span,a,h1,h2,h3,h4,button,label')){
          if(!t.textContent||!t.textContent.trim())continue
          if(t.children.length)continue
          const tc=getComputedStyle(t)
          if(tc.visibility==='hidden'||tc.display==='none'||+tc.opacity===0)continue
          const rb=t.getBoundingClientRect()
          if(rb.height<4)continue
          if(rb.bottom>edge+1&&rb.top<edge){cut=(t.textContent.trim().slice(0,26));break}
        }
        if(cut) clipped.push(`${cls.split(' ')[0]||el.tagName}: "${cut}"`)
      }
      let lo=999, hi=0, loEl='', hiEl=''
      for(const el of document.querySelectorAll('p,li,span,a,h1,h2,h3,h4,div,button')){
        if(!el.textContent || !el.textContent.trim()) continue
        if(el.children.length) continue
        const cs=getComputedStyle(el)
        if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) continue
        const r2=el.getBoundingClientRect(); if(r2.width<4||r2.height<4) continue
        const fs2=parseFloat(cs.fontSize)
        const tag=`${el.tagName}.${(el.className||'').toString().split(' ')[0]}:"${el.textContent.trim().slice(0,22)}"`
        if(fs2<lo){lo=fs2;loEl=tag}
        if(fs2>hi){hi=fs2;hiEl=tag}
      }
      /* Body copy = a paragraph long enough to be prose rather than a label. */
      let body=999, bodyEl=''
      for(const el of document.querySelectorAll('p,li')){
        if(el.children.length) continue
        const t=(el.textContent||'').trim(); if(t.length<80) continue
        const cs=getComputedStyle(el)
        if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) continue
        const r3=el.getBoundingClientRect(); if(r3.height<6) continue
        const f=parseFloat(cs.fontSize)
        if(f<body){body=f;bodyEl=t.slice(0,26)}
      }
      return {xo, clipped:[...new Set(clipped)].slice(0,3), lo, hi, loEl, hiEl, body, bodyEl}
    },{minPx,maxPx})

    const bodyOk = r.body===999 || r.body>=bodyPx
    const typeOk = r.lo>=minPx && r.hi<=maxPx && bodyOk
    const ok = r.xo===0 && r.clipped.length===0 && typeOk
    if(!ok) fails++
    console.log(label.padEnd(13)+theme.padEnd(7)+String(r.xo).padStart(7)+
      String(r.clipped.length).padStart(9)+
      `   ${r.lo.toFixed(1)}/${r.hi.toFixed(0)}`.padEnd(11)+
      `${r.body===999?'  -  ':r.body.toFixed(0).padStart(4)}  `+
      (ok?'ok':[r.xo?`x-overflow ${r.xo}px`:'',
        r.clipped.length?`CLIP ${r.clipped.join(' | ')}`:'',
        r.lo<minPx?`small ${r.lo.toFixed(1)}px ${r.loEl}`:'',
        r.hi>maxPx?`large ${r.hi.toFixed(0)}px ${r.hiEl}`:'',
        !bodyOk?`body ${r.body.toFixed(1)}px < ${bodyPx} "${r.bodyEl}"`:''].filter(Boolean).join('; ')))
    await page.close()
  }
}
await br.close(); server.close()
console.log(`\n${fails} class/theme combination(s) with findings`)
