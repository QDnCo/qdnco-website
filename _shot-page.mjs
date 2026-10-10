import fs from 'fs'; import path from 'path'; import http from 'http'
import puppeteer from 'puppeteer-core'
const DIST='/Users/vsaikavshik/Desktop/VS Code Files/QDnCo/Portfolio Website/dist', OUT=process.argv[2], PAGE=process.argv[3]||'dubai/index.html'
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'}
const srv=http.createServer((q,r)=>{let rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html';if(rel.endsWith('/'))rel+='index.html';fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':T[path.extname(rel)]||'application/octet-stream'});r.end(b)})}).listen(5193)
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args: ['--host-resolver-rules=MAP www.google-analytics.com 127.0.0.1, MAP region1.google-analytics.com 127.0.0.1, MAP analytics.google.com 127.0.0.1, MAP www.googletagmanager.com 127.0.0.1', '--hide-scrollbars']})
const errs=[]
for (const [name,w,h,mob] of [['d',1440,900,false],['m',390,844,true]]) {
  const p=await b.newPage(); p.on('pageerror',e=>errs.push(name+': '+e.message)); p.on('requestfailed',r=>{if(r.url().includes('localhost'))errs.push('404 '+r.url())})
  await p.setViewport({width:w,height:h,isMobile:mob,hasTouch:mob,deviceScaleFactor:1})
  await p.goto('http://localhost:5193/'+PAGE,{waitUntil:'networkidle2',timeout:60000}); await new Promise(r=>setTimeout(r,3500))
  await p.screenshot({path:`${OUT}/${name}-00-hero.jpg`,type:'jpeg',quality:70})
  for (const id of (process.env.IDS||'dubai,pricing,faq,contact').split(',').filter(Boolean)) {
    const y=await p.evaluate(i=>{const e=document.getElementById(i);return e?e.getBoundingClientRect().top+scrollY:-1},id)
    if(y<0){errs.push('missing '+id);continue}
    const H=await p.evaluate(i=>document.getElementById(i).offsetHeight,id)
    for(let k=0;k*h<H && k<4;k++){await p.evaluate(yy=>scrollTo(0,yy),y+k*h*0.9);await new Promise(r=>setTimeout(r,1300));await p.screenshot({path:`${OUT}/${name}-${id}-${k}.jpg`,type:'jpeg',quality:70})}
  }
}
console.log(errs.join('\n')||'no errors'); await b.close(); srv.close()
