import fs from 'fs'; import path from 'path'; import http from 'http'; import puppeteer from 'puppeteer-core'
const [,, page, text, out] = process.argv
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4'}
const srv=http.createServer((q,r)=>{let rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html';if(rel.endsWith('/'))rel+='index.html';fs.readFile(path.join('dist',rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':T[path.extname(rel)]||'application/octet-stream'});r.end(b)})}).listen(5199)
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--host-resolver-rules=MAP www.google-analytics.com 127.0.0.1, MAP region1.google-analytics.com 127.0.0.1, MAP www.googletagmanager.com 127.0.0.1']})
const p=await b.newPage(); await p.setViewport({width:390,height:844,isMobile:true,hasTouch:true})
await p.goto('http://localhost:5199/'+page,{waitUntil:'networkidle2'}); await new Promise(r=>setTimeout(r,2500))
const y=await p.evaluate(t=>{const el=[...document.querySelectorAll('h3,h2,p')].find(e=>e.textContent.includes(t)); return el? el.getBoundingClientRect().top+scrollY-120 : -1}, text)
await p.evaluate(yy=>scrollTo(0,yy),y); await new Promise(r=>setTimeout(r,1800)); await p.screenshot({path:out,type:'jpeg',quality:70})
await p.evaluate(yy=>scrollTo(0,yy+780),y); await new Promise(r=>setTimeout(r,1500)); await p.screenshot({path:out.replace('.jpg','-2.jpg'),type:'jpeg',quality:70})
console.log('y',y); await b.close(); srv.close()
