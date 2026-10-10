import fs from 'fs'; import path from 'path'; import http from 'http'
import puppeteer from 'puppeteer-core'
const DIST='dist', T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'}
const srv=http.createServer((q,r)=>{let rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html';if(rel.endsWith('/'))rel+='index.html';fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':T[path.extname(rel)]||'application/octet-stream'});r.end(b)})}).listen(5194)
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless: 'new', args: ['--host-resolver-rules=MAP www.google-analytics.com 127.0.0.1, MAP region1.google-analytics.com 127.0.0.1, MAP analytics.google.com 127.0.0.1, MAP www.googletagmanager.com 127.0.0.1']})
for (const pg of ['index.html','dubai/index.html']) {
  const runs=[]
  for (let i=0;i<3;i++){
    const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message))
    await p.setViewport({width:390,height:844,isMobile:true,hasTouch:true}); await p.emulateCPUThrottling(4)
    const t0=Date.now()
    await p.goto('http://localhost:5194/'+pg,{waitUntil:'load',timeout:120000})
    // React mounted = boot loader removed
    await p.waitForFunction(()=>!document.getElementById('boot-loader'),{timeout:120000})
    const mounted=Date.now()-t0
    await new Promise(r=>setTimeout(r,1500))
    const m=await p.metrics()
    runs.push({mounted, script:Math.round(m.ScriptDuration*1000), task:Math.round(m.TaskDuration*1000), errs:errs.length})
    await p.close()
  }
  const med=k=>runs.map(r=>r[k]).sort((a,c)=>a-c)[1]
  console.log(`${pg.padEnd(18)} React mounted ${med('mounted')}ms · script ${med('script')}ms · main-thread ${med('task')}ms · page errors ${runs.map(r=>r.errs).join('/')}`)
}
await b.close(); srv.close()
