import fs from 'fs'; import puppeteer from 'puppeteer-core'
const OUT='../QDnCo Marketing/Market Intelligence/_scrape/india-dubai-2026-09-29/trends.json'
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--lang=en-US']})
const res={}
for (const q of ['dubai property','property in dubai','dubai golden visa']) {
  const p=await b.newPage()
  await p.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36')
  const got={}
  p.on('response', async r=>{const u=r.url(); if(u.includes('/trends/api/widgetdata/comparedgeo')||u.includes('/trends/api/widgetdata/multiline')||u.includes('/trends/api/widgetdata/relatedsearches')){try{const t=await r.text(); (got[u.split('?')[0].split('/').pop()]??=[]).push({url:u.slice(0,400),body:t.replace(/^\)\]\}',?\n/,'')})}catch(e){}}})
  await p.goto('https://trends.google.com/trends/explore?geo=IN&q='+encodeURIComponent(q)+'&date=today%2012-m&hl=en',{waitUntil:'networkidle2',timeout:90000}).catch(e=>console.log('goto',e.message))
  await new Promise(r=>setTimeout(r,8000))
  const text=await p.evaluate(()=>document.body.innerText.slice(0,300))
  res[q]={widgets:Object.fromEntries(Object.entries(got).map(([k,v])=>[k,v.length])), raw:got, page:text}
  console.log(q, JSON.stringify(res[q].widgets), '|', text.replace(/\s+/g,' ').slice(0,120))
  await p.close(); await new Promise(r=>setTimeout(r,4000))
}
fs.writeFileSync(OUT, JSON.stringify(res,null,1)); await b.close()
