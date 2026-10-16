/* Audits the PRERENDERED dist, which is what a crawler that does not run
   JavaScript actually receives. Auditing the source would pass on markup the
   answer engines never see. */
import fs from 'fs'
const raw = fs.readFileSync('dist/index.html', 'utf8')
/* Strip the inline Babel bundle before counting anything. The JSX source ships
   inside the page, so scanning it whole finds <h1> and <img> in code and
   comments that no crawler will ever parse as markup. Keep the JSON-LD. */
const h = raw.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, '')
const say = (k, v) => console.log(k.padEnd(30), v)

const headings = [...h.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)]
  .map(m => [+m[1], m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()])
say('h1 count', headings.filter(x => x[0] === 1).length)
let prev = 0, jumps = []
for (const [lvl, txt] of headings) {
  if (prev && lvl > prev + 1) jumps.push(`h${prev}->h${lvl} "${txt.slice(0, 40)}"`)
  prev = lvl
}
say('heading level jumps', jumps.length ? jumps.join(' | ') : 'none')
say('h2 count', headings.filter(x => x[0] === 2).length)

const imgs = [...h.matchAll(/<img\b[^>]*>/gi)].map(m => m[0])
say('img total', imgs.length)
say('img missing alt', imgs.filter(t => !/\balt\s*=/i.test(t)).length)
say('img empty alt', imgs.filter(t => /\balt\s*=\s*(""|'')/.test(t)).length)
say('img missing dimensions', imgs.filter(t => !/\bwidth\s*=/i.test(t) || !/\bheight\s*=/i.test(t)).length)
say('img not lazy', imgs.filter(t => !/loading\s*=\s*["']lazy/i.test(t)).length)

const links = [...h.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
say('links total', links.length)
const bare = links.filter(m => !m[2].replace(/<[^>]+>/g, '').trim())
say('links with no text', bare.length)
const ext = links.filter(m => /^https?:/i.test(m[1]) && !m[1].includes('qdnco.com'))
say('external links', ext.length)
say('external missing noopener', ext.filter(m => /target=["']_blank/i.test(m[0]) && !/noopener/i.test(m[0])).length)

const ld = [...raw.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
say('ld+json blocks', ld.length)
let bad = 0, types = new Set()
/* Walk the parsed object rather than regexing the text: @type is often an
   array, and the pretty-printed form has a space after the colon — a text
   scan silently missed both, which is how an invalid type survived. */
const walk = (n) => {
  if (Array.isArray(n)) return n.forEach(walk)
  if (n && typeof n === 'object') {
    if (n['@type']) [].concat(n['@type']).forEach((t) => types.add(t))
    Object.values(n).forEach(walk)
  }
}
for (const m of ld) {
  try { walk(JSON.parse(m[1])) }
  catch (e) { bad++; console.log('   PARSE FAIL:', String(e).slice(0, 90)) }
}
say('ld+json parse failures', bad)
say('entity types', [...types].sort().join(', '))

const text = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim()
say('rendered words', text.split(' ').length)
const title = (h.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || ''
say('title chars', title.length + (title.length > 60 ? '  (>60, may truncate)' : ''))
const desc = (h.match(/name="description"\s+content="([^"]*)"/i) || [])[1] || ''
say('description chars', desc.length + (desc.length > 160 ? '  (>160, will truncate)' : ''))
