/**
 * Removes the diagnostic files left on the live server while tracking down why
 * index.html would not update: probe-*.txt, check-*.html and any orphaned
 * index.uploading.html.
 *
 * check-*.html matters most — it is a byte-for-byte copy of the homepage at a
 * crawlable URL, which is the duplicate-content problem we already cleaned up
 * once at /public_html.
 *
 * Only files matching those exact patterns are touched; anything else in the
 * directory is listed and left alone. Dry run by default.
 */
import * as ftp from 'basic-ftp'

const HOST = process.env.FTP_HOST || '91.108.107.146'
const USER = process.env.FTP_USER || 'u807410800.qdandco'
const PASSWORD = process.env.FTP_PASSWORD
const SECURE = process.env.FTP_INSECURE ? false : true
const DIR = process.env.FTP_REMOTE || '/'
const CONFIRM = process.argv.includes('--confirm')

if (!PASSWORD) { console.error('FTP_PASSWORD is not set.'); process.exit(1) }

const DISPOSABLE = /^(probe-[a-z0-9]+\.txt|check-[a-z0-9]+\.html|index\.uploading\.html)$/

const base = DIR === '/' ? '' : DIR.replace(/\/$/, '')
const client = new ftp.Client(30000)
try {
  await client.access({ host: HOST, user: USER, password: PASSWORD, secure: SECURE, secureOptions: { rejectUnauthorized: false } })
  const list = await client.list(base || '/')

  const doomed = list.filter((f) => f.isFile && DISPOSABLE.test(f.name))
  const keep = list.filter((f) => !DISPOSABLE.test(f.name))

  console.log(`keeping ${keep.length} entries: ${keep.map((f) => f.name).join(', ')}`)
  console.log(`\ndisposable (${doomed.length}):`)
  for (const f of doomed) console.log(`   ${f.name}  ${f.size} bytes`)
  if (!doomed.length) { console.log('nothing to clean up.'); process.exit(0) }

  if (!CONFIRM) {
    console.log('\nDry run. Re-run with --confirm to delete these.')
    process.exit(0)
  }

  /* Never remove the live homepage, whatever the pattern says. */
  for (const f of doomed) {
    if (f.name === 'index.html') continue
    await client.remove(`${base}/${f.name}`)
    console.log(`removed ${f.name}`)
  }

  const after = await client.list(base || '/')
  const idx = after.find((f) => f.name === 'index.html')
  console.log(`\nindex.html still present: ${idx ? `yes, ${idx.size} bytes` : 'NO — CHECK THE SITE'}`)
  console.log(`leftovers remaining:      ${after.filter((f) => DISPOSABLE.test(f.name)).length}`)
} catch (err) {
  console.error('failed:', err.message)
  process.exitCode = 1
} finally {
  client.close()
}
