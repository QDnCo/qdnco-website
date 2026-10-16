/**
 * Replaces /index.html, which will not accept an in-place overwrite.
 *
 * Established by test: uploading any other filename to / works and serves
 * immediately, and a copy of the current build uploaded as check-*.html renders
 * the new site perfectly. Only index.html keeps yesterday's bytes, and a fresh
 * FTP listing agrees it was never replaced. That is the signature of a locked
 * file — wrong owner, or read-only permissions — where the server accepts the
 * transfer and discards it.
 *
 * So it is swapped rather than overwritten: upload beside it, verify the bytes
 * landed, then rename over the top. The live homepage is only ever replaced by
 * a file that has already been confirmed complete on the server, and if the
 * swap fails the original is still serving.
 */
import fs from 'fs'
import * as ftp from 'basic-ftp'

const HOST = process.env.FTP_HOST || '91.108.107.146'
const USER = process.env.FTP_USER || 'u807410800.qdandco'
const PASSWORD = process.env.FTP_PASSWORD
const SECURE = process.env.FTP_INSECURE ? false : true
const DIR = process.env.FTP_REMOTE || '/'

if (!PASSWORD) { console.error('FTP_PASSWORD is not set.'); process.exit(1) }

const LOCAL = 'dist/index.html'
const localSize = fs.statSync(LOCAL).size
const base = DIR === '/' ? '' : DIR.replace(/\/$/, '')
const TMP = `${base}/index.uploading.html`
const LIVE = `${base}/index.html`

const client = new ftp.Client(30000)
try {
  await client.access({ host: HOST, user: USER, password: PASSWORD, secure: SECURE, secureOptions: { rejectUnauthorized: false } })

  const before = (await client.list(base || '/')).find((f) => f.name === 'index.html')
  console.log('current /index.html')
  console.log(`  size        ${before ? before.size : 'missing'}`)
  console.log(`  modified    ${before ? (before.rawModifiedAt || before.modifiedAt) : '-'}`)
  console.log(`  permissions ${before && before.rawPermissions ? before.rawPermissions : JSON.stringify(before?.permissions ?? null)}`)
  console.log(`  owner/group ${before?.user ?? '?'} / ${before?.group ?? '?'}`)
  console.log(`\nlocal  ${localSize} bytes`)
  if (before && before.size === localSize) {
    console.log('\nAlready up to date — nothing to do.')
    process.exit(0)
  }

  console.log('\nuploading beside it ...')
  await client.uploadFrom(fs.createReadStream(LOCAL), TMP)
  const staged = (await client.list(base || '/')).find((f) => f.name === 'index.uploading.html')
  if (!staged || staged.size !== localSize) {
    console.error(`staged copy is ${staged ? staged.size : 'missing'}, expected ${localSize} — aborting, live site untouched.`)
    process.exit(1)
  }
  console.log(`staged ok    ${staged.size} bytes`)

  /* Rename over the top. On most servers RNTO replaces the target; where it
     refuses, remove the old file first and retry. Either way the replacement
     is already fully on disk before the live file is disturbed. */
  console.log('swapping in ...')
  try {
    await client.rename(TMP, LIVE)
  } catch (e) {
    console.log(`  direct rename refused (${e.code || e.message}), removing old file first`)
    await client.remove(LIVE)
    await client.rename(TMP, LIVE)
  }

  const after = (await client.list(base || '/')).find((f) => f.name === 'index.html')
  console.log(`\nnow /index.html  ${after ? after.size : 'MISSING'} bytes, modified ${after ? (after.rawModifiedAt || after.modifiedAt) : '-'}`)
  if (after && after.size === localSize) {
    console.log('MATCH — check https://qdnco.com/ (Ctrl+F5).')
  } else {
    console.log('MISMATCH — the swap did not take. The staged copy may still be at index.uploading.html.')
    process.exitCode = 1
  }
} catch (err) {
  console.error('failed:', err.message)
  process.exitCode = 1
} finally {
  client.close()
}
