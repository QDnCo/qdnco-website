/**
 * Shared chrome for the answer-engine surfaces: /answers/, /glossary/,
 * /compare/, /data/ and /areas/.
 *
 * Why these are separate sections rather than more guides:
 *
 *  - /answers/  One question per URL. An answer engine lifts a passage, and the
 *               passage it lifts is whatever sits immediately under the question
 *               it matched. A guide that answers eight questions gives the engine
 *               eight chances to lift the wrong one. A page that answers one
 *               gives it no choice.
 *  - /data/     Generative engines cite sources for numbers far more readily than
 *               they cite sources for opinions. The Ad Library scrape and the TAM
 *               model are original measurements nobody else in this category has
 *               published, which makes them the most citable thing on the domain.
 *  - /glossary/ Definitional queries ("what is CPQL") resolve against DefinedTerm
 *               markup. Fifty terms is fifty entry points that cost one page.
 *  - /compare/  "X vs Y" is the highest-intent shape a buyer question takes and
 *               the shape assistants most often answer with a table.
 *  - /areas/    Catchment pages with real corridor facts, not the same paragraph
 *               with the place name swapped.
 *
 * Everything renders through site-shell.mjs so the palette, wallpaper and theme
 * switch cannot drift from the landing page or the guides.
 */
import { CSS, GUIDE_CSS, homeLockup } from './site-shell.mjs'

export const SITE = 'https://qdnco.com'
export const BRAND = 'QDnCo'
export const LEGAL = 'QDnCo'
export const EMAIL = 'qdnco01@gmail.com'
export const PHONE = '+91 88611 79992'
export const TEL = '+918861179992'
/* Guarded because this module also runs under JavaScriptCore, which has no
   `process`. Same override as the guide and legal builders when Node is used. */
export const UPDATED =
  (typeof process !== 'undefined' && process.env && process.env.LEGAL_DATE) ||
  new Date().toISOString().slice(0, 10)
const WALLPAPER = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/* Strip tags for schema text fields — JSON-LD wants prose, not markup. */
export const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

/* ── Content helpers, same vocabulary as guides-content.mjs ─────────────── */
export const P = (s) => `<p>${s}</p>`
export const UL = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`
export const OL = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`
export const ANSWER = (s) => `<div class="answer">${s}</div>`
export const TABLE = (head, rows) =>
  `<div class="tablewrap"><table><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>` +
  rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('') +
  '</table></div>'

/* Extra CSS for the surfaces the guide sheet does not cover. Kept small and
   in the same idiom rather than introducing a second design vocabulary. */
export const AEO_CSS = `
.ans-grid{display:grid;gap:.75rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));margin-top:1.6rem}
.ans-card{display:block;padding:1rem 1.2rem;border-radius:15px;text-decoration:none;
  border:1px solid rgba(var(--ink-rgb),.16);background:rgba(var(--fill-rgb),.04);color:var(--ink);
  transition:border-color .2s ease,transform .2s ease}
.ans-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.ans-card b{display:block;font-family:'Barlow',sans-serif;font-weight:600;
  font-size:.99rem;line-height:1.35}
.ans-card span{display:block;color:rgba(var(--ink-rgb),.65);font-size:.85rem;margin-top:.3rem;line-height:1.45}

.topic-head{font-family:'Barlow',sans-serif;font-weight:700;text-transform:uppercase;
  letter-spacing:.09em;font-size:.78rem;color:var(--accent);margin:2.4rem 0 .2rem}

.terms{display:grid;gap:.8rem;margin-top:1.6rem}
.term{border:1px solid rgba(var(--ink-rgb),.16);border-radius:15px;
  padding:1rem 1.2rem;background:rgba(var(--fill-rgb),.04)}
.term dt{font-family:'Barlow',sans-serif;font-weight:700;font-size:1.02rem;
  color:var(--ink);margin-bottom:.35rem}
.term dd{margin:0;color:rgba(var(--ink-rgb),.8);line-height:1.6;font-size:.96rem}
.term dd+dd{margin-top:.5rem;font-size:.88rem;color:rgba(var(--ink-rgb),.6)}

.srcnote{margin-top:2.4rem;padding:1rem 1.2rem;border-radius:14px;
  border:1px dashed rgba(var(--ink-rgb),.28);background:rgba(var(--fill-rgb),.03)}
.srcnote p{margin:0;font-size:.88rem;line-height:1.6;color:rgba(var(--ink-rgb),.7)}
.srcnote b{color:rgba(var(--ink-rgb),.85)}

.jump{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.4rem 0 2rem}
.jump a{padding:.42rem .85rem;border-radius:999px;text-decoration:none;font-size:.85rem;
  font-family:'Barlow',sans-serif;font-weight:600;
  border:1px solid rgba(var(--ink-rgb),.2);color:rgba(var(--ink-rgb),.8);
  background:rgba(var(--fill-rgb),.04)}
.jump a:hover{border-color:var(--accent);color:var(--accent)}

/* Result chip on a work flashcard. Only cards with a publishable figure get
   the accent treatment — if every card were highlighted the highlight would
   carry no information. */
.chip{display:inline-block;margin-top:.7rem;padding:.28rem .7rem;border-radius:999px;
  font-family:'Barlow',sans-serif;font-weight:600;font-size:.78rem;line-height:1.3;
  border:1px solid rgba(var(--ink-rgb),.2);color:rgba(var(--ink-rgb),.7);
  background:rgba(var(--fill-rgb),.05)}
.chip-result{border-color:rgba(182,0,168,.5);color:var(--accent);background:rgba(182,0,168,.09)}
.guide-card b{overflow-wrap:anywhere}
`

/* ── Head + chrome ──────────────────────────────────────────────────────── */
export const head = (p, jsonld, depth = '..') => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${p.canonical}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#0A0D12">
<meta property="og:type" content="${p.ogType || 'article'}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${p.canonical}">
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
<style>${CSS}${GUIDE_CSS}${AEO_CSS}</style>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GZE73M9Q4M"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-GZE73M9Q4M',{content_group:location.pathname.indexOf('/dubai/')===0?'Dubai':'India'});</script>
</head>
<body>
<div class="wall" aria-hidden="true"><video id="wall" muted playsinline loop preload="none"></video><div class="wash"></div></div>
<div class="shell">
  <header class="bar">
    ${homeLockup(`${depth}/index.html`)}
    <div class="bar-right">
      <button type="button" class="theme-switch" id="tt" role="switch" aria-label="Toggle colour theme">
        <span class="theme-switch-ico theme-switch-moon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></span>
        <span class="theme-switch-ico theme-switch-sun" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5"/></svg></span>
        <span class="theme-switch-knob" aria-hidden="true"></span>
      </button>
      <a class="back" href="${depth}/index.html">&larr; Back to site</a>
    </div>
  </header>
  <div class="page"><div class="wrap">`

export const tail = (depth = '..') => `
    <footer class="foot">
      <nav aria-label="Sections">
        <a href="${depth}/work/index.html">Work</a>
        <a href="${depth}/guides/index.html">Guides</a>
        <a href="${depth}/answers/index.html">Answers</a>
        <a href="${depth}/dubai/real-estate-marketing/">Dubai</a>
        <a href="${depth}/data/index.html">Data</a>
        <a href="${depth}/glossary/index.html">Glossary</a>
        <a href="${depth}/pricing/index.html">Pricing</a>
        <a href="${depth}/legal/privacy.html">Privacy</a>
        <a href="${depth}/legal/disclaimer.html">Disclaimer</a>
      </nav>
      <p>${BRAND} &middot; Bangalore, Karnataka, India &middot;
         <a href="mailto:${EMAIL}">${EMAIL}</a> &middot; <a href="tel:${TEL}">${PHONE}</a></p>
      <nav aria-label="QDnCo social profiles"><a href="https://www.facebook.com/profile.php?id=61583765303879" rel="me">Facebook</a><a href="https://www.instagram.com/qdnco.official/" rel="me">Instagram</a></nav>
      <p>&copy; ${UPDATED.slice(0, 4)} ${BRAND} All rights reserved. Reported results and illustrative models are labelled separately; outcomes vary &mdash;
         see the <a href="${depth}/legal/disclaimer.html">disclaimer</a>.</p>
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

/* ── Shared JSON-LD nodes ───────────────────────────────────────────────── */

/* One organisation node, referenced by @id from every page, so the whole site
   resolves to a single entity in a knowledge graph rather than to twenty
   unlinked mentions of a similar name. sameAs links are restricted to
   verified public profiles of this organisation, not its founder. */
export const orgNode = () => ({
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'QDnCo',
  alternateName: ['QDnCo', 'QDnCo', 'QDnCo', 'QDnCo', "QDnCo"],
  sameAs: ["https://www.facebook.com/profile.php?id=61583765303879", "https://www.instagram.com/qdnco.official/"],
  url: SITE,
  email: EMAIL,
  telephone: `+91${TEL.slice(3)}`,
  foundingLocation: { '@type': 'Place', name: 'Bangalore, Karnataka, India' },
  /* Must match the Google Business Profile character for character (NAP consistency). */
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15A, 4th Cross, Varanasi Main Road, Bell Town Layout, Jinkethimmanahalli, Ramamurthy Nagar',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560036',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'City', name: 'Mysore' },
    { '@type': 'State', name: 'Karnataka' },
  ],
  knowsAbout: [
    'Real estate marketing',
    'Real estate positioning and creative',
    'Real estate performance marketing',
    'Cost per qualified lead',
    'Meta Ads for real estate',
    'Google Ads for real estate',
    'RERA compliant advertising',
    'Go-to-market research',
    'Generative engine optimisation',
  ],
  founder: { '@id': `${SITE}/#person` },
})

export const personNode = () => ({
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'V. Sai Kavshik',
  jobTitle: 'Founder · Performance Marketing & Go-to-Market Consultant',
  worksFor: { '@id': `${SITE}/#organization` },
  email: EMAIL,
  telephone: `+91${TEL.slice(3)}`,
  knowsAbout: [
    'Real estate marketing',
    'Real estate positioning and creative',
    'Real estate performance marketing',
    'Qualified lead definition',
    'Meta Ads',
    'Google Ads',
    'Karnataka RERA advertising rules',
  ],
})

export const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    ...(it.item ? { item: it.item } : {}),
  })),
})
