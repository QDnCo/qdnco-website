/* Dead space at section boundaries. For each section, the union of its visible
   descendants' boxes is compared with the section's own box; whatever is left
   at the top and bottom is space carrying nothing. Reported per theme because
   the two grounds make the same gap read very differently. */
import fs from 'fs'; import path from 'path'; import http from 'http'; import puppeteer from 'puppeteer-core'
const DIST='dist',PORT=5381
const CHROME=['C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p))
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4'}
const server=http.createServer((q,r)=>{const rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html'
 fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':MIME[path.extname(rel)]||'application/octet-stream'});r.end(b)})})
await new Promise(r=>server.listen(PORT,r))
const theme=process.argv[2]||'light'
const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--hide-scrollbars']})
const page=await br.newPage(); await page.setCacheEnabled(false)
await page.setViewport({width:1440,height:900})
await page.goto(`http://localhost:${PORT}/index.html`,{waitUntil:'networkidle2'})
await new Promise(r=>setTimeout(r,2600))
if(theme==='light'){
  await page.evaluate(()=>{const b=[...document.querySelectorAll('button,[role=button]')]
    .find(e=>/theme|light|dark|mode/i.test(e.getAttribute('aria-label')||'')); if(b)b.click()})
  await new Promise(r=>setTimeout(r,900))
}
/* Walk the page first so lazy/scroll-revealed content has mounted. */
const H=await page.evaluate(()=>document.body.scrollHeight)
for(let y=0;y<H;y+=700){ await page.evaluate(y=>scrollTo(0,y),y); await new Promise(r=>setTimeout(r,130)) }
await page.evaluate(()=>scrollTo(0,0)); await new Promise(r=>setTimeout(r,700))

const rows=await page.evaluate(()=>{
  const out=[]
  for(const sec of document.querySelectorAll('section[id]')){
    const sr=sec.getBoundingClientRect(), top=sr.top+scrollY
    let lo=Infinity, hi=-Infinity
    for(const el of sec.querySelectorAll('*')){
      const cs=getComputedStyle(el)
      if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) continue
      const r=el.getBoundingClientRect()
      if(r.width<2||r.height<2) continue
      /* Ignore full-bleed backgrounds and decorative layers — they fill the
         section by definition and would hide every gap. */
      if(r.height>=sr.height-2 && r.width>=sr.width-2) continue
      const t=r.top+scrollY, b=r.bottom+scrollY
      if(t<lo) lo=t
      if(b>hi) hi=b
    }
    if(lo===Infinity) continue
    out.push({id:sec.id, h:Math.round(sr.height),
              padTop:Math.round(lo-top), padBot:Math.round(top+sr.height-hi)})
  }
  return out
})
console.log(`theme ${theme}  (1440x900)`)
console.log('section'.padEnd(12)+'height'.padStart(8)+'empty top'.padStart(11)+'empty bottom'.padStart(14))
console.log('-'.repeat(45))
for(const r of rows){
  const flag=(r.padTop>240||r.padBot>240)?'  <-- large':''
  console.log(r.id.padEnd(12)+String(r.h).padStart(8)+String(r.padTop).padStart(11)+String(r.padBot).padStart(14)+flag)
}
await br.close(); server.close()
