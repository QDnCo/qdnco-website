import fs from 'fs'; import path from 'path'; import http from 'http'; import puppeteer from 'puppeteer-core'
const DIST='dist',PORT=5404
const CHROME=['C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p))
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4'}
const server=http.createServer((q,r)=>{const rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html'
 fs.readFile(path.join(DIST,rel),(e,b)=>{if(e){r.writeHead(404).end();return}r.writeHead(200,{'Content-Type':MIME[path.extname(rel)]||'application/octet-stream'});r.end(b)})})
await new Promise(r=>server.listen(PORT,r))
const theme=process.argv[2]||'dark', ids=(process.argv[3]||'pricing').split(',')
const off=+(process.argv[4]||170), W=+(process.argv[5]||1440), H=+(process.argv[6]||900)
const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--hide-scrollbars']})
const page=await br.newPage(); await page.setCacheEnabled(false); await page.setViewport({width:W,height:H})
await page.goto(`http://localhost:${PORT}/index.html`,{waitUntil:'networkidle2'})
await new Promise(r=>setTimeout(r,2500))
if(theme==='light'){await page.evaluate(()=>{const b=[...document.querySelectorAll('button,[role=button]')]
  .find(e=>/theme|light|dark|mode/i.test(e.getAttribute('aria-label')||'')); if(b)b.click()})
  await new Promise(r=>setTimeout(r,900))}
for(const id of ids){
  await page.evaluate(([id,off])=>{const s=document.getElementById(id); scrollTo(0,s.offsetTop+off)},[id,off])
  await new Promise(r=>setTimeout(r,900))
  await page.screenshot({path:`q-${theme}-${id}.png`}); console.log('shot',id)
}
await br.close(); server.close()
