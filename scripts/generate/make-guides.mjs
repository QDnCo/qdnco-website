/**
 * Builds the guides section into public/guides/.
 *
 * Why static pages rather than more sections on the landing page:
 *
 *  - SEO. One page can rank for one primary intent. "Cost per qualified lead
 *    for real estate in India" and "RERA-compliant advertising" are different
 *    searches with different answers, and cramming both into a single document
 *    means competing with yourself for neither.
 *  - AEO. Answer engines lift a passage, not a page. Each guide leads with a
 *    direct answer in its own block, then supports it — so the liftable unit is
 *    the first thing under the question rather than something buried mid-scroll.
 *  - GEO. Generative engines favour material that is attributable, dated,
 *    internally consistent and specific. Every number here traces to the
 *    intelligence database or to a named engagement, and the ones that are
 *    estimates say so.
 *
 * They share site-shell.mjs with the legal pages, so the chrome, palette,
 * wallpaper and theme switch cannot drift from the landing page.
 */
import fs from 'fs'
import path from 'path'
import { CSS, GUIDE_CSS, homeLockup } from './site-shell.mjs'
import { GUIDES, HUB } from '../../content/guides-content.mjs'

const OUT = 'public/guides'
const SITE = 'https://qdnco.com'
const BRAND = 'QDnCo'
const LEGAL = 'QDnCo'
const EMAIL = 'qdnco01@gmail.com'
const PHONE = '+91 88611 79992'
const TEL = '+918861179992'
const UPDATED = process.env.LEGAL_DATE || new Date().toISOString().slice(0, 10)
const WALLPAPER = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const byId = Object.fromEntries(GUIDES.map((g) => [g.slug, g]))

/* ── Shared head + chrome ───────────────────────────────────────────────── */
const head = (p, jsonld) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${SITE}/guides/${p.slug}.html">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#0A0D12">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${SITE}/guides/${p.slug}.html">
<meta property="og:site_name" content="${BRAND}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico?v=qd2" sizes="48x48"><link rel="icon" href="/favicon.svg?v=qd2" type="image/svg+xml"><link rel="icon" href="/icon-192.png?v=qd2" type="image/png" sizes="192x192"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=qd2"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600;700;800&family=Kanit:wght@700;800&display=swap" rel="stylesheet">
<script>
(function(){try{var t=localStorage.getItem('qd-theme');
if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}
document.documentElement.dataset.theme=t}catch(e){}})();
</script>
<style>${CSS}${GUIDE_CSS}</style>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GZE73M9Q4M"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-GZE73M9Q4M',{content_group:location.pathname.indexOf('/dubai/')===0?'Dubai':'India'});</script>
</head>
<body>
<div class="wall" aria-hidden="true"><video id="wall" muted playsinline loop preload="none"></video><div class="wash"></div></div>
<div class="shell">
  <header class="bar">
    ${homeLockup('../index.html')}
    <div class="bar-right">
      <button type="button" class="theme-switch" id="tt" role="switch" aria-label="Toggle colour theme">
        <span class="theme-switch-ico theme-switch-moon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></span>
        <span class="theme-switch-ico theme-switch-sun" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5"/></svg></span>
        <span class="theme-switch-knob" aria-hidden="true"></span>
      </button>
      <a class="back" href="../index.html">&larr; Back to site</a>
    </div>
  </header>
  <div class="page"><div class="wrap">`

const tail = () => `
    <footer class="foot">
      <nav aria-label="Sections"><a href="index.html">All guides</a>
        <a href="../work/index.html">Work</a>
        <a href="../answers/index.html">Answers</a>
        <a href="../data/index.html">Research</a>
        <a href="../compare/index.html">Comparisons</a>
        <a href="../areas/index.html">Catchments</a>
        <a href="../glossary/index.html">Glossary</a>
        <a href="../pricing/index.html">Pricing</a>
        <a href="../legal/privacy.html">Privacy</a>
        <a href="../legal/disclaimer.html">Disclaimer</a>
      </nav>
      <p>${BRAND} &middot; Bangalore, Karnataka, India &middot;
         <a href="mailto:${EMAIL}">${EMAIL}</a> &middot; <a href="tel:${TEL}">${PHONE}</a></p>
      <p>&copy; ${UPDATED.slice(0, 4)} ${BRAND} All rights reserved. Figures are past results, not forecasts &mdash;
         see the <a href="../legal/disclaimer.html">disclaimer</a>.</p>
    </footer>
  </div></div>
</div>
<script>
(function(){var r=document.documentElement,b=document.getElementById('tt');
var sync=function(){b.setAttribute('aria-checked',r.dataset.theme==='light')};sync();
b.addEventListener('click',function(){r.dataset.theme=r.dataset.theme==='light'?'dark':'light';
try{localStorage.setItem('qd-theme',r.dataset.theme)}catch(e){}sync();});})();
(function(){var v=document.getElementById('wall');
if(!v||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var c=navigator.connection; if(c&&(c.saveData||/2g/.test(c.effectiveType||'')))return;
var native=function(){if(!v.canPlayType('application/vnd.apple.mpegurl'))return;
v.src='${WALLPAPER}';v.play().catch(function(){})};
var start=function(){var s=document.createElement('script');
s.src='https://unpkg.com/hls.js@1/dist/hls.min.js';
s.onload=function(){if(!window.Hls||!window.Hls.isSupported()){native();return}
var h=new window.Hls({capLevelToPlayerSize:true});h.loadSource('${WALLPAPER}');h.attachMedia(v);
h.on(window.Hls.Events.MANIFEST_PARSED,function(){v.play().catch(function(){})});};
s.onerror=native;document.head.appendChild(s)};
var done=false,once=function(){if(done)return;done=true;start()};
if('requestIdleCallback' in window)requestIdleCallback(once,{timeout:2000});
setTimeout(once,2000);})();
</script>
</body>
</html>
`

/* ── A guide ────────────────────────────────────────────────────────────── */
const renderGuide = (g) => {
  const crumbs = `<nav class="crumbs" aria-label="Breadcrumb">
    <a href="../index.html">Home</a><span>/</span><a href="index.html">Guides</a><span>/</span>${esc(g.h1)}
  </nav>`

  const facts = g.facts?.length ? `<div class="keyfacts">${g.facts
    .map((f) => `<div class="keyfact"><b>${esc(f.v)}</b><span>${esc(f.k)}</span></div>`).join('')}</div>` : ''

  const body = g.body.map((s) => `<h2 id="${s.id}">${esc(s.h2)}</h2>\n${s.html}`).join('\n\n')

  const faqs = g.faqs?.length ? `
  <h2 id="faq">Questions developers ask</h2>
  <div class="faq">${g.faqs.map((f) => `
    <details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('')}
  </div>` : ''

  const related = g.related?.length ? `
  <div class="related">
    <h2>Related reading</h2>
    <ul>${g.related.filter((r) => byId[r]).map((r) => `
      <li><a href="${r}.html">${esc(byId[r].h1)}<small>${esc(byId[r].blurb)}</small></a></li>`).join('')}
    </ul>
  </div>` : ''

  const cta = `
  <div class="cta-band">
    <h2>${esc(g.ctaH || 'Want this run on your project?')}</h2>
    <p>${g.ctaP || 'A Phase 0 call is a questionnaire, not a pitch. You get the market read before anyone spends a rupee on advertising.'}</p>
    <a href="../index.html#contact">Book a Phase 0 call &nearr;</a>
  </div>`

  /* Article + FAQPage + BreadcrumbList in one graph, so the crawler reads one
     coherent entity rather than three unrelated blobs. */
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${SITE}/guides/${g.slug}.html#article`,
        headline: g.h1,
        description: g.desc,
        inLanguage: 'en-IN',
        datePublished: g.published || UPDATED,
        dateModified: UPDATED,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: `${SITE}/guides/${g.slug}.html`,
        about: (g.keywords || []).map((k) => ({ '@type': 'Thing', name: k })),
        articleSection: 'Real estate performance marketing',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides/index.html` },
          { '@type': 'ListItem', position: 3, name: g.h1 },
        ],
      },
      ...(g.faqs?.length ? [{
        '@type': 'FAQPage',
        '@id': `${SITE}/guides/${g.slug}.html#faq`,
        mainEntity: g.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
        })),
      }] : []),
    ],
  }

  return head({ ...g, title: g.title }, jsonld) +
    crumbs +
    `<p class="eyebrow">${esc(g.eyebrow || 'Guide')}</p>` +
    `<h1>${esc(g.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${g.mins || 6} min read</p>` +
    `<p class="lede">${g.lede}</p>` +
    facts + body + faqs + related + cta +
    tail()
}

/* ── The hub ────────────────────────────────────────────────────────────── */
const renderIndex = () => {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE}/guides/index.html#page`,
        name: HUB.title,
        description: HUB.desc,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${SITE}/#website` },
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: GUIDES.length,
        itemListElement: GUIDES.map((g, i) => ({
          '@type': 'ListItem', position: i + 1, name: g.h1,
          url: `${SITE}/guides/${g.slug}.html`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides' },
        ],
      },
    ],
  }
  const cards = GUIDES.map((g) =>
    `<a class="guide-card" href="${g.slug}.html"><b>${esc(g.h1)}</b><span>${esc(g.blurb)}</span></a>`).join('')

  return head({ slug: 'index', title: HUB.title, desc: HUB.desc }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Guides</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Guides</p>` +
    `<h1>${esc(HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${GUIDES.length} guides</p>` +
    `<p class="lede">${HUB.lede}</p>` +
    HUB.body +
    `<div class="guide-grid">${cards}</div>` +
    `<div class="cta-band"><h2>Start with the market, not the media plan</h2>
      <p>A Phase 0 call is a questionnaire, not a pitch.</p>
      <a href="../index.html#contact">Book a Phase 0 call &nearr;</a></div>` +
    tail()
}

fs.mkdirSync(OUT, { recursive: true })
let words = 0
for (const g of GUIDES) {
  const html = renderGuide(g)
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const w = text.split(' ').length
  words += w
  fs.writeFileSync(path.join(OUT, `${g.slug}.html`), html)
  console.log(`  ${(g.slug + '.html').padEnd(46)} ${String(w).padStart(5)} words  ${g.faqs?.length || 0} Q&A`)
}
fs.writeFileSync(path.join(OUT, 'index.html'), renderIndex())
console.log(`\n${GUIDES.length} guides + hub written to ${OUT}/`)
console.log(`${words.toLocaleString()} indexable words across the guides`)
