/**
 * Uploads dist/ to the live site.
 *
 * The password is deliberately NOT in this file. It is read from the
 * FTP_PASSWORD environment variable at run time, so the credential lives in
 * your shell session and never in the repo, in git history, or in a chat log.
 *
 *   Windows PowerShell:
 *     $env:FTP_PASSWORD = 'your-password'
 *     npm run deploy
 *
 *   Git Bash / macOS / Linux:
 *     FTP_PASSWORD='your-password' npm run deploy
 *
 * Transport: FTPS (explicit TLS over port 21) by default. Plain FTP sends the
 * password and every byte of the site in clear text over the network, which is
 * worth avoiding even for public files. If the host refuses TLS, re-run with
 * FTP_INSECURE=1 — but treat that as a reason to ask the host for SFTP.
 *
 * Pass --dry-run to list what would be uploaded without connecting.
 */
import fs from 'fs'
import path from 'path'
import * as ftp from 'basic-ftp'

const LOCAL = 'dist'
/* The web root is /public_html — the directory this account logs in at.
   '/' is the account home one level above it and is not served: a full upload
   there completes, verifies byte-for-byte, and changes nothing the public can
   see, because the FTP listing and the web server are looking at two different
   directories. Confirmed by size: /public_html/index.html is what qdnco.com
   returns. A DO_NOT_UPLOAD_HERE marker sits in '/' and the guard below refuses
   to write to any directory containing it. */
const REMOTE = process.env.FTP_REMOTE || '/public_html'
const HOST = process.env.FTP_HOST || '91.108.107.146'
const USER = process.env.FTP_USER || 'u807410800.qdnco.com'
const PASSWORD = process.env.FTP_PASSWORD
const SECURE = process.env.FTP_INSECURE ? false : true
const DRY = process.argv.includes('--dry-run')

if (!fs.existsSync(path.join(LOCAL, 'index.html'))) {
  console.error(`No ${LOCAL}/index.html. Run "npm run site" first.`)
  process.exit(1)
}

/* Refuse to publish a build whose body never got baked — that ships a page the
   answer engines read as blank, which is the whole thing prerendering fixes. */
const html = fs.readFileSync(path.join(LOCAL, 'index.html'), 'utf8')
if (html.includes('<div id="root"></div>')) {
  console.error('index.html is not prerendered. Run "npm run site", not "node scripts/build/build-dist.mjs".')
  process.exit(1)
}

const files = []
;(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) walk(f)
    else files.push(path.relative(LOCAL, f).replace(/\\/g, '/'))
  }
})(LOCAL)

const bytes = files.reduce((t, f) => t + fs.statSync(path.join(LOCAL, f)).size, 0)
console.log(`${files.length} files, ${(bytes / 1048576).toFixed(2)} MB`)
console.log(`${HOST} -> ${REMOTE}   ${SECURE ? 'FTPS (TLS)' : 'PLAIN FTP - credentials sent in clear text'}`)

if (DRY) {
  for (const f of files) console.log('  ' + f)
  console.log('\ndry run — nothing uploaded')
  process.exit(0)
}

if (!PASSWORD) {
  console.error('\nFTP_PASSWORD is not set. See the header of this file.')
  process.exit(1)
}

const client = new ftp.Client(30000)
client.ftp.verbose = false
try {
  await client.access({ host: HOST, user: USER, password: PASSWORD, secure: SECURE, secureOptions: { rejectUnauthorized: false } })

  /* Print where the login lands and where the files are actually going. These
     two differ on this host, which is exactly the trap that made earlier
     deploys look successful while changing nothing. */
  console.log(`login directory: ${await client.pwd()}`)
  await client.ensureDir(REMOTE)
  const target = await client.pwd()
  console.log(`upload target:   ${target}`)

  /* Refuse to write to a directory that is not served. An upload to the account
     home completes and verifies perfectly while the live site stays stale — the
     one failure this script cannot detect from its own results. */
  if ((await client.list(target)).some((e) => e.name === 'DO_NOT_UPLOAD_HERE')) {
    console.error(`\n${target} is marked DO_NOT_UPLOAD_HERE — it is not the web root. Aborting.`)
    process.exit(1)
  }

  /* Every file is written to an explicit absolute path.
     uploadFromDir() resolves against the session's working directory, and on
     this account that silently diverged from the target — it reported success
     while /index.html kept yesterday's bytes and yesterday's timestamp. An
     absolute path has no working directory to disagree with. */
  const base = target.replace(/\/$/, '')
  const dirs = [...new Set(files.map((f) => path.posix.dirname(f)).filter((d) => d !== '.'))].sort()
  for (const d of dirs) await client.ensureDir(`${base}/${d}`)

  /* index.html is written last, and by swap rather than overwrite.
     This server accepts an in-place PUT over index.html, reports success, and
     keeps the old bytes — every other filename in the same directory updates
     normally, and the file is plain 644 owned by this very account, so it is
     not a permissions problem. Whatever holds it, renaming over the top works.
     Staging first also means the homepage is only ever replaced by a file
     already confirmed complete on the server. */
  const INDEX = 'index.html'
  const rest = files.filter((f) => f !== INDEX)

  let done = 0
  for (const f of rest) {
    await client.uploadFrom(fs.createReadStream(path.join(LOCAL, f)), `${base}/${f}`)
    done++
    process.stdout.write(`\r  ${String(done).padStart(3)}/${files.length}  ${f.padEnd(46).slice(0, 46)}`)
  }

  const indexSize = fs.statSync(path.join(LOCAL, INDEX)).size
  const tmp = `${base}/index.uploading.html`
  await client.uploadFrom(fs.createReadStream(path.join(LOCAL, INDEX)), tmp)
  const staged = (await client.list(base || '/')).find((e) => e.name === 'index.uploading.html')
  if (!staged || staged.size !== indexSize) {
    console.error(`\n\nstaged index.html is ${staged ? staged.size : 'missing'}, expected ${indexSize} — aborting, live page untouched.`)
    process.exit(1)
  }
  try {
    await client.rename(tmp, `${base}/${INDEX}`)
  } catch {
    await client.remove(`${base}/${INDEX}`)
    await client.rename(tmp, `${base}/${INDEX}`)
  }
  process.stdout.write(`\r  ${String(files.length).padStart(3)}/${files.length}  ${INDEX.padEnd(46)}`)

  /* Verify from the server's own directory listing, not from size(). size()
     was the check that produced a false MATCH — it answered for a path that
     was not the one being served. A listing enumerates what is actually in the
     directory, which is the same thing the web server reads. */
  const listing = await client.list(base || '/')
  const entry = listing.find((e) => e.name === 'index.html')
  const localSize = fs.statSync(path.join(LOCAL, 'index.html')).size
  console.log(`\n\nindex.html  local ${localSize}  remote ${entry ? entry.size : 'MISSING'}`)
  if (!entry || entry.size !== localSize) {
    console.log(`MISMATCH — the file being served is not the one just built.`)
    console.log(`Listing of ${base || '/'} reports ${entry ? `${entry.size} bytes` : 'no index.html'}.`)
    process.exitCode = 1
  } else {
    console.log(`modified    ${entry.rawModifiedAt || entry.modifiedAt}`)
    console.log('MATCH — uploaded. Check https://qdnco.com/ and hard-refresh (Ctrl+F5).')
  }
} catch (err) {
  console.error('\nupload failed:', err.message)
  if (SECURE) console.error('If the host does not support FTPS, retry with FTP_INSECURE=1 set.')
  process.exitCode = 1
} finally {
  client.close()
}
