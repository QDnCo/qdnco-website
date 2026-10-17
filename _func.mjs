import fs from 'fs'; import path from 'path'; import http from 'http'
import puppeteer from 'puppeteer-core'
const DIST='dist', T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'}
const srv=http.createServer((q,r)=>{let rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html';if(rel.endsWith('/'))rel+='index.html';fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':T[path.extname(rel)]||'application/octet-stream'});r.end(b)})}).listen(5195)
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless: 'new', args: ['--host-resolver-rules=MAP www.google-analytics.com 127.0.0.1, MAP region1.google-analytics.com 127.0.0.1, MAP analytics.google.com 127.0.0.1, MAP www.googletagmanager.com 127.0.0.1']})
for (const pg of ['index.html','dubai/index.html']) {
  const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,120))})
  await p.setViewport({width:1440,height:900})
  await p.goto('http://localhost:5195/'+pg,{waitUntil:'networkidle2',timeout:90000}); await new Promise(r=>setTimeout(r,2500))
  const res={}
  // lead dialog
  await p.evaluate(()=>{[...document.querySelectorAll('button,a')].find(e=>/Book Phase 0/i.test(e.textContent))?.click()})
  await new Promise(r=>setTimeout(r,800))
  res.dialog = await p.evaluate(()=>!!document.querySelector('[role="dialog"], dialog[open]') && !!document.querySelector('input[name="phone"]'))
  await p.keyboard.press('Escape'); await new Promise(r=>setTimeout(r,500))
  // FAQ toggle
  res.faqBefore = await p.evaluate(()=>document.getElementById('faq')?.innerText.length)
  await p.evaluate(()=>{const f=document.getElementById('faq'); [...f.querySelectorAll('button')][2]?.click()})
  await new Promise(r=>setTimeout(r,800))
  res.faqAfter = await p.evaluate(()=>document.getElementById('faq')?.innerText.length)
  // theme toggle
  const t0=await p.evaluate(()=>document.documentElement.dataset.theme)
  await p.evaluate(()=>{[...document.querySelectorAll('button')].find(e=>/theme|dark|light/i.test(e.getAttribute('aria-label')||''))?.click()})
  await new Promise(r=>setTimeout(r,500))
  res.theme = t0+'→'+await p.evaluate(()=>document.documentElement.dataset.theme)
  res.regionHref = await p.evaluate(()=>document.querySelector('a.region-cta')?.getAttribute('href'))
  res.sections = await p.evaluate(()=>[...document.querySelectorAll('section[id]')].map(s=>s.id).join(','))
  console.log(pg, JSON.stringify(res), 'errors:', errs.length ? errs.slice(0,5) : 'none')
  await p.close()
}
await b.close(); srv.close()
