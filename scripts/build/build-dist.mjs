/**
 * Assembles the hosting bundle.
 *
 * Two things happen here that matter:
 *  1. v4-final.html becomes index.html, so any host serves it at "/".
 *  2. Absolute asset paths become relative. Absolute paths only resolve when the
 *     site sits at a domain root; relative ones also survive a subdirectory
 *     deploy and a plain double-click from the filesystem.
 */
import fs from 'fs'
import path from 'path'

const SRC = 'public'
const OUT = 'dist'
const SITE = 'https://qdnco.com'

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

// ── html ──
let html = fs.readFileSync(path.join(SRC, 'v4-final.html'), 'utf8')
if (!html.trimEnd().endsWith('</html>') || !html.includes('ReactDOM.createRoot')) {
  throw new Error('Homepage source is incomplete; refusing to overwrite dist/index.html.')
}
const before = html

html = html
  /* Any absolute asset path under a public/ subdirectory, not an enumerated
     pair — adding adreel/ silently broke both the rewrite and the copy. */
  .replace(/(["'(`])\/([a-z0-9][a-z0-9._-]*\/[^"'`)]+\.(?:png|jpg|jpeg|svg|json|webp|mp4))/gi, '$1$2')
  /* Any root-level asset, not an enumerated few — a hardcoded list silently
     404s the next file someone adds, which is exactly how signature.png
     shipped broken. */
  .replace(/(["'(])\/([a-z0-9][a-z0-9._-]*\.(?:png|jpg|jpeg|svg|json|webp|mp4))/gi, '$1$2')

/* A dateModified that never moves is worse than none — it tells a crawler the
   page is stale. Stamp it from the build instead. */
const buildDate = new Date().toISOString().slice(0, 10)
const dated = html.replace(/("dateModified":\s*")\d{4}-\d{2}-\d{2}(")/, `$1${buildDate}$2`)
if (dated === html) console.log('WARNING dateModified not found in JSON-LD')
html = dated

const stillAbsolute = [...html.matchAll(/["'(](\/(?:brands|shots)\/[^"')]+|\/[a-z-]+\.(?:png|jpg|json|svg))/g)].map((m) => m[1])
if (stillAbsolute.length) console.log('WARNING still absolute:', [...new Set(stillAbsolute)])

fs.writeFileSync(path.join(OUT, 'index.html'), html)
console.log(`index.html   ${(html.length / 1024).toFixed(0)}KB   (rewrote ${before.length - html.length >= 0 ? 'paths' : 'paths'})`)

// ── assets ──
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true })
  let n = 0
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const f = path.join(from, e.name), t = path.join(to, e.name)
    if (e.isDirectory()) n += copyDir(f, t)
    else { fs.copyFileSync(f, t); n++ }
  }
  return n
}

/* Mirror every subdirectory under public/, so a new asset folder needs no
   change here to ship. */
const dirCounts = {}
for (const e of fs.readdirSync(SRC, { withFileTypes: true })) {
  if (!e.isDirectory()) continue
  dirCounts[e.name] = copyDir(path.join(SRC, e.name), path.join(OUT, e.name))
}
/* Every root-level asset in public/, excluding the source HTML variants that
   are inputs to this build rather than outputs of it. */
let nRoot = 0
for (const e of fs.readdirSync(SRC, { withFileTypes: true })) {
  if (e.isDirectory() || /\.html$/i.test(e.name)) continue
  fs.copyFileSync(path.join(SRC, e.name), path.join(OUT, e.name))
  nRoot++
}
console.log(`root assets  ${nRoot} files`)
for (const [d, n] of Object.entries(dirCounts)) console.log(`${(d + '/').padEnd(13)}${n} files`)

// ── llms.txt + robots.txt ──
/* public/llms.txt is the canonical LLM site map (llms.txt convention).
   public/robots.txt is preferred when present — it includes AI bot rules and
   a comment pointing to /llms.txt. Fall back to the inline template otherwise. */
const llmsSrc = path.join(SRC, 'llms.txt')
if (fs.existsSync(llmsSrc)) {
  fs.copyFileSync(llmsSrc, path.join(OUT, 'llms.txt'))
  console.log('llms.txt     copied from public/')
} else {
  console.log('WARNING llms.txt not found in public/')
}

const robotsSrc = path.join(SRC, 'robots.txt')
const robotsFallback = `User-agent: *
Allow: /

# Answer engines — explicitly welcomed, since AEO/GEO visibility depends on them
# being allowed to read and cite the page.
# LLM-facing site map: ${SITE}/llms.txt
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: meta-externalagent
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
if (fs.existsSync(robotsSrc)) {
  let robots = fs.readFileSync(robotsSrc, 'utf8')
  if (!/llms\.txt/i.test(robots)) {
    robots = robots.replace(
      /^(User-agent: \*\nAllow: \/\n)/m,
      `$1\n# LLM-facing site map: ${SITE}/llms.txt\n`,
    )
  }
  fs.writeFileSync(path.join(OUT, 'robots.txt'), robots)
  console.log('robots.txt   copied from public/ (llms.txt comment ensured)')
} else {
  fs.writeFileSync(path.join(OUT, 'robots.txt'), robotsFallback)
  console.log('robots.txt   generated from inline template')
}

// ── seo/ corpus (AEO/GEO assets for crawlers) ──
const seoSrc = path.join('.', 'seo')
if (fs.existsSync(seoSrc)) {
  const nSeo = copyDir(seoSrc, path.join(OUT, 'seo'))
  console.log(`seo/         ${nSeo} files copied`)
} else {
  console.log('WARNING seo/ not found — run scripts/build/generate-seo-corpus.mjs')
}

// ── sitemap.xml ──
const today = fs.statSync(path.join(OUT, 'index.html')).mtime.toISOString().slice(0, 10)
/* The compliance pages are real URLs a crawler should have, unlike the section
   fragments below. Read from disk so adding a policy needs no edit here. */
const listHtml = (dir) => {
  const d = path.join(OUT, dir)
  return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.html')).sort() : []
}
/* Sections are declared rather than hardcoded into the XML below, so a new
   directory of pages under public/ reaches the sitemap by existing. The hub
   leads its section and outranks the pages beneath it. */
const SECTIONS = [
  { dir: 'pricing', changefreq: 'monthly', hub: '0.9', page: '0.9' },
  { dir: 'work', changefreq: 'monthly', hub: '0.9', page: '0.8' },
  { dir: 'guides', changefreq: 'monthly', hub: '0.9', page: '0.8' },
  { dir: 'answers', changefreq: 'monthly', hub: '0.9', page: '0.7' },
  { dir: 'data', changefreq: 'monthly', hub: '0.8', page: '0.8' },
  { dir: 'compare', changefreq: 'monthly', hub: '0.8', page: '0.7' },
  { dir: 'areas', changefreq: 'monthly', hub: '0.8', page: '0.7' },
  { dir: 'glossary', changefreq: 'monthly', hub: '0.7', page: '0.6' },
  { dir: 'legal', changefreq: 'yearly', hub: '0.3', page: '0.3' },
]
const hubFirst = (a, b) =>
  (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b))
const sectionUrls = SECTIONS.flatMap((s) =>
  listHtml(s.dir).sort(hubFirst).map((f) => `  <url>
    <loc>${SITE}/${s.dir}/${f}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${s.changefreq}</changefreq>
    <priority>${f === 'index.html' ? s.hub : s.page}</priority>
  </url>`))

/* One entry, no fragments. A crawler resolves #about to the same document as
   /, so the six anchor rows were six duplicate submissions of the home page —
   they cannot rank separately and only muddy the index report. Section
   addressability comes from the WebPage/ItemList schema, not the sitemap. */
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${sectionUrls.join('\n')}
</urlset>
`)
console.log(`sitemap.xml  ${sectionUrls.length + 1} URLs`)

// ── host config: SPA-safe, long cache on hashed-ish assets ──
fs.writeFileSync(path.join(OUT, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/brands/*
  Cache-Control: public, max-age=31536000, immutable

/shots/*
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable
`)

/* ── .htaccess: the caching rules that actually apply on this host ──
   _headers below is Netlify/Cloudflare syntax and Hostinger's LiteSpeed ignores
   it outright, which is why a deploy could land correctly on disk and the site
   would still serve the previous build until someone purged by hand.

   index.html must revalidate on every request — it is the one file that changes
   on every deploy, and it is cheap to check. Assets get a day rather than the
   customary year: the filenames are not fingerprinted, so an immutable asset
   that changes can never be refreshed without renaming it. */
fs.writeFileSync(path.join(OUT, '.htaccess'), `# Generated by build-dist.mjs — do not edit on the server, it is overwritten.
# Canonical host. www.qdnco.com currently answers 200 with the same content,
# which indexes the site twice and splits every signal between two hosts. The
# canonical tag mitigates it; a 301 removes it. HTTPS is forced for the same
# reason, and HSTS tells browsers to stop asking.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^www\.qdnco\.com$ [NC]
  RewriteRule ^(.*)$ https://qdnco.com/$1 [R=301,L]
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://qdnco.com/$1 [R=301,L]
</IfModule>
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# LiteSpeed keeps a server-side page cache. For a static page it buys nothing
# and it is what serves a stale index.html after a deploy.
<IfModule LiteSpeed>
  CacheDisable public /
</IfModule>

<IfModule mod_headers.c>
  # HTML: always revalidate.
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate, max-age=0"
  </FilesMatch>

  # Assets: cache for a day. Not "immutable" — these filenames carry no hash,
  # so a year-long cache would strand any updated logo or screenshot.
  <FilesMatch "\\.(png|jpe?g|svg|webp|woff2?|json)$">
    Header set Cache-Control "public, max-age=86400"
  </FilesMatch>

  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# robots.txt and sitemap.xml should never be served stale to a crawler.
<FilesMatch "^(robots\\.txt|sitemap\\.xml)$">
  <IfModule mod_headers.c>
    Header set Cache-Control "no-cache, must-revalidate, max-age=0"
  </IfModule>
</FilesMatch>
`)

fs.writeFileSync(path.join(OUT, 'README.txt'), `QDnCo — portfolio site
=========================

Deploy
------
Upload the CONTENTS of this folder to your web root. index.html must sit at "/".
Works as-is on Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any cPanel
public_html. No build step, no server code, no dependencies to install.

Domain
------
This build is configured for:
    ${SITE}

That domain is baked into the canonical link, the Open Graph and Twitter tags,
every schema @id in the JSON-LD, robots.txt and sitemap.xml. If it ever changes,
find and replace ${SITE} across index.html, robots.txt and sitemap.xml.

If you serve the site from www.qdnco.com, set a 301 from www to the bare domain
(or update the canonical) so both versions are not indexed separately.

Before going live
-----------------
1. Point the domain at your host and enable HTTPS.
2. Add the property in Google Search Console and Bing Webmaster Tools, then
   submit ${SITE}/sitemap.xml in both.
3. Create the Google Business Profile and use the exact same name, address and
   phone number that appear in the footer here — citation consistency is what
   local ranking is built on.

What is in here
---------------
index.html            the whole site — one page, all sections
brands/               client and ad-platform logos (colour + white variants)
shots/                client website screenshots used in the project cards
portrait-cutout.png   transparent portrait used by the 3D figure
outline-path.json     traced silhouette path for the border animation
robots.txt            crawler rules, AI answer-engine bots explicitly allowed
llms.txt              LLM-facing site map (llms.txt convention)
seo/                  keyword clusters, entity graph, AEO answer bank
sitemap.xml           section-level sitemap
_headers              cache + security headers (Netlify / Cloudflare Pages)

Important: index.html is prerendered
------------------------------------
The body of index.html contains the fully rendered page as static markup, baked
in by prerender.mjs. React still boots and takes over on load, but a crawler
that does not run JavaScript — which is every AI answer engine, including
GPTBot, PerplexityBot and ClaudeBot — reads the whole page from the raw HTML.

If you edit public/v4-final.html, rebuild with:

    npm run site

Running build-dist.mjs on its own produces a valid site, but one whose body is
empty to any crawler that does not execute JavaScript.

Loaded from CDN at runtime
--------------------------
React 18, Babel Standalone, Tailwind Play CDN, Framer Motion, Google Fonts,
two background videos on CloudFront, four decorative images. The page needs an
internet connection to render. See the note in the handover about pre-compiling
if you ever want it fully self-hosted.
`)

// ── size report ──
function size(dir) {
  let t = 0
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    t += e.isDirectory() ? size(f) : fs.statSync(f).size
  }
  return t
}
console.log(`\ndist total   ${(size(OUT) / 1048576).toFixed(2)} MB`)
