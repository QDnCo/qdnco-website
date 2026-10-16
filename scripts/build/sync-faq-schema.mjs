/* Regenerates the FAQPage JSON-LD in <head> from the FAQS array in the body.
 *
 * The two were hand-maintained mirrors of each other, which is a drift waiting
 * to happen: the visible FAQ and the structured data crawlers read could say
 * different things and nothing would complain. The array is the single source
 * of truth; this rewrites the head block from it.
 *
 * It has to be a build step rather than runtime JS, because the answer engines
 * that matter here (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) do not
 * execute JavaScript — the JSON-LD must already be in the served HTML.
 *
 * Run after editing FAQS:  node scripts/build/sync-faq-schema.mjs
 * Verify without writing:  node scripts/build/sync-faq-schema.mjs --check
 */
import fs from 'fs'

const SRC = 'public/v4-final.html'
const check = process.argv.includes('--check')
const html = fs.readFileSync(SRC, 'utf8')

/* The source is CRLF. Every pattern below tolerates either, and what gets
   emitted reuses the file's own ending — otherwise the rewrite would leave
   mixed line endings inside a single file. */
const NL = html.includes('\r\n') ? '\r\n' : '\n'

/* ── Read the array ─────────────────────────────────────────────────────── */
const arr = html.match(/const FAQS = \[([\s\S]*?)\r?\n\];/)
if (!arr) { console.error('FAIL: could not locate the FAQS array'); process.exit(1) }

/* Entries are  { q: "...",\n    a: "..." },  double-quoted, and the answers
   contain apostrophes and em dashes but never a raw double quote. */
const entries = [...arr[1].matchAll(/\{\s*q:\s*"((?:[^"\\]|\\.)*)",\s*a:\s*"((?:[^"\\]|\\.)*)"\s*\}/g)]
  .map((m) => ({ q: m[1], a: m[2] }))

if (!entries.length) { console.error('FAIL: parsed 0 FAQ entries'); process.exit(1) }

/* ── Rebuild mainEntity, matching the surrounding indentation ───────────── */
const body = entries.map(({ q, a }) => [
  '        {',
  '          "@type": "Question",',
  `          "name": ${JSON.stringify(q)},`,
  '          "acceptedAnswer": {',
  '            "@type": "Answer",',
  `            "text": ${JSON.stringify(a)}`,
  '          }',
  '        }',
].join(NL)).join(',' + NL)

const re = /("@type": "FAQPage",[\s\S]*?"mainEntity": \[\r?\n)([\s\S]*?)(\r?\n {6}\])/
const block = html.match(re)
if (!block) { console.error('FAIL: could not locate the FAQPage mainEntity block'); process.exit(1) }

const before = (block[2].match(/"@type": "Question"/g) || []).length
const next = html.slice(0, block.index) + block[1] + body + block[3] +
             html.slice(block.index + block[0].length)

console.log(`FAQS entries        ${entries.length}`)
console.log(`schema entries      ${before}`)

if (check) {
  const same = next === html
  console.log(same ? 'IN SYNC' : 'OUT OF SYNC — run without --check to fix')
  process.exit(same ? 0 : 1)
}

fs.writeFileSync(SRC, next)
console.log(`FAQPage JSON-LD regenerated from FAQS (${before} -> ${entries.length})`)
