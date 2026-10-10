/**
 * Removes the stray duplicate copies of the site left by the two deploys that
 * landed too deep: /public_html and /public_html/public_html, both of which are
 * publicly crawlable and compete with the real pages.
 *
 * This deletes things recursively on a live web server, on an account whose
 * path layout already surprised us once, so it is deliberately hard to misfire:
 *
 *   - refuses any target that is the web root, empty, or not under /public_html
 *   - lists exactly what it found and stops, unless you pass --confirm
 *   - checks the live index.html exists before it starts and again after
 *   - never touches anything beside the target
 *
 * Dry run (default):   node cleanup-remote.mjs
 * Actually delete:     node cleanup-remote.mjs --confirm
 *
 * Credentials come from the environment, same as deploy.mjs.
 */
import * as ftp from 'basic-ftp'

const HOST = process.env.FTP_HOST || '91.108.107.146'
const USER = process.env.FTP_USER || 'u807410800.qdandco'
const PASSWORD = process.env.FTP_PASSWORD
const SECURE = process.env.FTP_INSECURE ? false : true
const CONFIRM = process.argv.includes('--confirm')

/* The web root is '/'. The duplicate is the public_html directory sitting
   inside it — which is also where this FTP account happens to log in, so the
   name alone is not enough to make it safe. */
const TARGET = '/public_html'

if (!PASSWORD) {
  console.error('FTP_PASSWORD is not set.')
  process.exit(1)
}
if (TARGET === '/' || TARGET.trim() === '' || !TARGET.startsWith('/public_html')) {
  console.error('Refusing: target is not a subdirectory of the web root.')
  process.exit(1)
}

const client = new ftp.Client(30000)
try {
  await client.access({ host: HOST, user: USER, password: PASSWORD, secure: SECURE, secureOptions: { rejectUnauthorized: false } })

  /* The real site must be at the root before we touch anything. If it is not,
     the path layout is not what we think it is and deleting would be reckless. */
  const rootList = await client.list('/')
  const hasSite = rootList.some((f) => f.name === 'index.html' && f.size > 100000)
  if (!hasSite) {
    console.error('Refusing: no index.html at / — the live site is not where expected.')
    process.exit(1)
  }
  console.log(`web root OK: / has index.html (${rootList.find((f) => f.name === 'index.html').size} bytes)`)

  let victims
  try {
    victims = await client.list(TARGET)
  } catch {
    console.log(`${TARGET} does not exist — nothing to clean up.`)
    process.exit(0)
  }

  console.log(`\n${TARGET} contains ${victims.length} entries:`)
  for (const f of victims.slice(0, 12)) console.log(`   ${f.isDirectory ? 'dir ' : 'file'}  ${f.name}`)
  if (victims.length > 12) console.log(`   ... and ${victims.length - 12} more`)

  if (!CONFIRM) {
    console.log('\nDry run. Nothing deleted. Re-run with --confirm to remove it.')
    process.exit(0)
  }

  /* Empty the directory but keep the directory itself. This FTP account's login
     lands in /public_html — delete it outright and the next connection has no
     home to chroot into, which breaks deploys for the sake of removing a folder
     that costs nothing once it is empty. An empty directory serves no page, so
     the duplicate-content problem is solved either way. */
  console.log(`\nemptying ${TARGET} (keeping the directory — it is the FTP login home) ...`)
  await client.cd(TARGET)
  await client.clearWorkingDir()

  const left = await client.list(TARGET)
  const after = await client.list('/')
  const stillThere = after.some((f) => f.name === 'index.html' && f.size > 100000)
  console.log(`\n${TARGET} now contains: ${left.length} entries`)
  console.log(`index.html still at /:  ${stillThere ? 'yes' : 'NO — CHECK THE SITE NOW'}`)
} catch (err) {
  console.error('failed:', err.message)
  process.exitCode = 1
} finally {
  client.close()
}
