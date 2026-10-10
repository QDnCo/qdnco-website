import fs from 'fs'; import path from 'path'; import http from 'http'
import puppeteer from 'puppeteer-core'
const DIST='dist', T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'}
const srv=http.createServer((q,r)=>{let rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html';if(rel.endsWith('/'))rel+='index.html';fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':T[path.extname(rel)]||'application/octet-stream'});r.end(b)})}).listen(5196)
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'})
const PROPS=['display','position','width','height','margin-top','margin-left','padding-top','padding-left','font-size','font-family','font-weight','line-height','letter-spacing','color','background-color','border-top-width','border-radius','opacity','gap','grid-template-columns','flex-direction','justify-content','align-items','text-transform','z-index','overflow','inset']
async function snap(url,w,h){
  const p=await b.newPage(); await p.setViewport({width:w,height:h})
  await p.evaluateOnNewDocument(()=>{try{localStorage.setItem('qd-theme','light')}catch(e){}})
  await p.goto(url,{waitUntil:'networkidle2',timeout:90000}); await new Promise(r=>setTimeout(r,3500))
  const s=await p.evaluate((PROPS)=>{const out=[];const els=document.querySelectorAll('#root [class]');for(const e of els){const cs=getComputedStyle(e);out.push(e.tagName+'.'+String(e.className).slice(0,60)+'|'+PROPS.map(k=>cs.getPropertyValue(k)).join(';'))}return out},PROPS)
  await p.close(); return s
}
for (const [a,c] of [['zz-cdn-index.html','index.html'],['dubai/zz-cdn-index.html','dubai/index.html']]) for (const [w,h] of [[1440,900],[390,844]]) {
  const A=await snap('http://localhost:5196/'+a,w,h), C=await snap('http://localhost:5196/'+c,w,h)
  let diff=0; const ex=[]
  const n=Math.min(A.length,C.length)
  for(let i=0;i<n;i++){ if(A[i]!==C[i]){ diff++; if(ex.length<6){const x=A[i].split('|'),y=C[i].split('|');const xa=x[1].split(';'),ya=y[1].split(';');const d=PROPS.map((k,j)=>xa[j]!==ya[j]?`${k}: ${xa[j]} → ${ya[j]}`:null).filter(Boolean);ex.push(x[0]+' :: '+d.slice(0,3).join(' | '))}}}
  console.log(`${c} @${w}: elements ${A.length}/${C.length}, differing ${diff}`); ex.forEach(e=>console.log('   ',e))
}
await b.close(); srv.close()
