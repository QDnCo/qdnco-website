/**
 * Shared chrome for every static page outside the single-page app.
 *
 * The legal pages and the guides both have to look like the same product as the
 * landing page — same palette tokens, same fonts, same wallpaper, same theme
 * switch reading the same stored key. Keeping that in one module is the only
 * way two generators stay in step; when it lived in make-legal.mjs the guides
 * would have started as a copy and drifted on the first edit.
 */

export const CSS = `
/* The site's own tokens, verbatim, so these pages are the same product rather
   than a lookalike. Theme follows the attribute the main site writes, and the
   stored key is shared, so a choice made on the landing page carries here. */
:root{
  --page-rgb: 10,13,18;
  --ink-rgb: 244,246,248;
  --fill-rgb: 255,255,255;
  --page:#0A0D12; --ink:#F4F6F8;
  --veil: rgba(10,13,18,0.82);
  --accent:#B683FF;
  --content-max: 1720px;
}
:root[data-theme="light"]{
  --page-rgb: 255,255,255;
  --ink-rgb: 10,13,18;
  --fill-rgb: 10,13,18;
  --page:#FFFFFF; --ink:#0A0D12;
  --veil: rgba(255,255,255,0.90);
  --accent:#7A00C2;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0; background:var(--page); color:var(--ink);
  font:400 17px/1.68 'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  letter-spacing:-.005em; -webkit-font-smoothing:antialiased;
}

/* ── Wallpaper ──
   The same Mux stream the site runs, with the same wash over it. Fixed and
   behind everything, exactly as SiteWallpaper does it. */
.wall{position:fixed;inset:0;z-index:0;pointer-events:none;background:var(--page)}
.wall video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:saturate(1.45) contrast(1.12)}
:root[data-theme="light"] .wall video{filter:saturate(1.5) brightness(1.06)}
.wall .wash{position:absolute;inset:0;background:rgba(0,0,0,0.42)}
:root[data-theme="light"] .wall .wash{background:rgba(255,255,255,0.62)}

.shell{position:relative;z-index:1}
.page{padding:clamp(1.2rem,3vw,2.4rem) clamp(0.9rem,3vw,2rem) clamp(3rem,8vw,6rem)}
.wrap{
  max-width:940px;margin:0 auto;
  padding:clamp(1.6rem,4vw,3.2rem) clamp(1.2rem,4vw,3rem) clamp(2.4rem,6vw,4rem);
  background:var(--veil);
  -webkit-backdrop-filter:blur(26px) saturate(1.15);backdrop-filter:blur(26px) saturate(1.15);
  border:1px solid rgba(var(--ink-rgb),.12);
  border-radius:clamp(20px,2.4vw,32px);
  box-shadow:0 40px 100px -50px rgba(0,0,0,.6);
}

/* ── Chrome ── */
.bar{
  position:sticky;top:0;z-index:5;
  display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;
  padding:clamp(.8rem,2vw,1.1rem) clamp(1.1rem,5vw,2rem);
  background:rgba(var(--page-rgb),0.86);
  -webkit-backdrop-filter:blur(26px) saturate(1.35);backdrop-filter:blur(26px) saturate(1.35);
  border-bottom:1px solid rgba(var(--ink-rgb),.12);
}
/* Same lockup as the landing-page nav: qdco.png + tagline, same widths
   (desktop clamp 146–170, phone 112), theme-flipped on light. */
.home{
  display:inline-flex;align-items:center;text-decoration:none;color:var(--ink);line-height:1;
  border:1px solid rgba(255,255,255,.38);border-radius:999px;
  padding:clamp(.52rem,.86vw,.88rem) clamp(.8rem,1.1vw,1.15rem);
  transform:scaleX(1.05) scaleY(.95);transform-origin:left center;
  transition:border-color 260ms ease;
}
:root[data-theme="light"] .home{border-color:rgba(10,13,18,.32)}
.home-col{
  display:flex;flex-direction:column;gap:clamp(4px,.45vw,6px);
  width:clamp(146px,10.5vw,170px);container-type:inline-size;
}
.home img{width:100%;height:auto;display:block}
:root[data-theme="light"] .home img{filter:brightness(0) saturate(0)}
.home-tag{
  font-family:'Inter',system-ui,sans-serif;font-weight:400;text-transform:uppercase;
  letter-spacing:.095em;line-height:1;white-space:nowrap;
  color:rgba(255,255,255,.72);font-size:max(9px,5.85cqi);
}
:root[data-theme="light"] .home-tag{color:rgba(10,13,18,.72)}
.bar-right{display:flex;align-items:center;gap:.9rem}
.back{font-family:'Barlow',sans-serif;font-weight:600;font-size:.9rem;text-decoration:none;
  border:1px solid rgba(var(--ink-rgb),.24);border-radius:999px;padding:.6rem 1.15rem;
  color:var(--ink);min-height:44px;display:inline-flex;align-items:center;
  transition:border-color .2s ease,background .2s ease}
.back:hover{border-color:var(--accent);color:var(--accent)}

/* The site's switch, same geometry and the same Apple easing curve. */
.theme-switch{--sw-w:60px;--sw-h:31px;--sw-pad:3px;position:relative;flex-shrink:0;
  width:var(--sw-w);height:var(--sw-h);padding:0;border-radius:999px;cursor:pointer;appearance:none;
  border:1px solid rgba(var(--ink-rgb),.22);background:rgba(var(--ink-rgb),.10);
  box-shadow:inset 0 1px 3px rgba(0,0,0,.28);
  transition:background 420ms cubic-bezier(.32,.72,0,1),border-color 420ms cubic-bezier(.32,.72,0,1)}
.theme-switch-ico{position:absolute;top:0;bottom:0;width:calc(var(--sw-w)/2);z-index:2;
  display:grid;place-items:center;pointer-events:none;
  transition:color 420ms cubic-bezier(.32,.72,0,1),opacity 420ms cubic-bezier(.32,.72,0,1)}
.theme-switch-ico svg{width:calc(var(--sw-h)*.47);height:calc(var(--sw-h)*.47);display:block}
.theme-switch-moon{left:0}.theme-switch-sun{right:0}
:root:not([data-theme="light"]) .theme-switch-moon{color:#0A0D12;opacity:1}
:root:not([data-theme="light"]) .theme-switch-sun{color:rgb(var(--ink-rgb));opacity:.42}
:root[data-theme="light"] .theme-switch-sun{color:#fff;opacity:1}
:root[data-theme="light"] .theme-switch-moon{color:rgb(var(--ink-rgb));opacity:.42}
.theme-switch-knob{position:absolute;top:var(--sw-pad);left:var(--sw-pad);z-index:1;
  height:calc(var(--sw-h) - var(--sw-pad)*2 - 2px);width:calc(var(--sw-w)/2 - var(--sw-pad));
  border-radius:999px;background:linear-gradient(180deg,#FFF 0%,#ECEEF1 100%);
  box-shadow:0 2px 6px rgba(0,0,0,.34);
  transition:transform 460ms cubic-bezier(.32,.72,0,1),background 420ms cubic-bezier(.32,.72,0,1)}
:root[data-theme="light"] .theme-switch-knob{transform:translateX(calc(var(--sw-w)/2));
  background:linear-gradient(180deg,#2B2F36 0%,#14171C 100%)}

/* ── Type, on the site's scale ── */
.eyebrow{font-family:'Barlow',sans-serif;font-weight:600;text-transform:uppercase;
  letter-spacing:.2em;font-size:.72rem;color:var(--accent);margin:0 0 .7rem}
h1{font-family:'Instrument Serif',serif;font-weight:400;
  font-size:clamp(2.4rem,6vw,4.2rem);line-height:1.02;letter-spacing:-.02em;margin:0 0 .7rem}
.updated{font-family:'Barlow',sans-serif;color:rgba(var(--ink-rgb),.6);
  font-size:.92rem;margin:0 0 2.6rem}
h2{font-family:'Barlow',sans-serif;font-weight:700;
  font-size:clamp(1.2rem,2.2vw,1.6rem);line-height:1.24;margin:2.8rem 0 .8rem;letter-spacing:-.01em}
h3{font-family:'Barlow',sans-serif;font-weight:600;font-size:1.06rem;margin:1.7rem 0 .45rem}
p,li{color:rgba(var(--ink-rgb),.82)}
li{margin:.4rem 0}
ul,ol{padding-left:1.35rem}
strong{color:var(--ink);font-weight:600}
a{color:var(--accent);text-underline-offset:3px}

/* Panels use the section glass the site uses, not a flat grey. */
.card{background:rgba(var(--fill-rgb),.07);border:1px solid rgba(var(--ink-rgb),.18);
  border-radius:20px;padding:1.35rem 1.55rem;margin:1.6rem 0;
  -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.card p:last-child{margin-bottom:0}.card p:first-child{margin-top:0}
.todo{display:inline-block;background:rgba(182,0,168,.16);border:1px dashed var(--accent);
  color:var(--accent);border-radius:6px;padding:.05em .5em;font-size:.86em;font-weight:600}
/* Tables scroll inside their own box rather than pushing the page sideways.
   A four-column table at 375px cannot both fit and stay legible; letting it
   scroll horizontally keeps the column widths readable and keeps the document
   itself from overflowing, which is the thing that actually looks broken. */
.tablewrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:1.4rem 0;
  border-radius:12px}
.tablewrap table{margin:0}
.tablewrap table th,.tablewrap table td{white-space:normal}
@media (max-width:560px){ .tablewrap table{min-width:460px} }
table{width:100%;border-collapse:collapse;margin:1.4rem 0;font-size:.95rem}
th,td{text-align:left;padding:.7rem .8rem;border-bottom:1px solid rgba(var(--ink-rgb),.14);vertical-align:top}
th{color:var(--ink);font-weight:600;font-family:'Barlow',sans-serif}
td{color:rgba(var(--ink-rgb),.78)}

.foot{margin-top:4.5rem;padding-top:1.8rem;border-top:1px solid rgba(var(--ink-rgb),.14);
  color:rgba(var(--ink-rgb),.6);font-size:.9rem}
.foot nav{display:flex;flex-wrap:wrap;gap:.5rem 1.4rem;margin-bottom:1.1rem}
.foot a{text-decoration:none;font-family:'Barlow',sans-serif;font-weight:500}
.foot a:hover{text-decoration:underline}
.foot [aria-current]{color:var(--ink);font-weight:600}

@media (max-width:767px){
  .home{padding:.36rem .7rem;transform:none}
  .home-col{width:112px;gap:4px}
  .home-tag{letter-spacing:.065em;font-size:max(8px,6.2cqi)}
}
@media (max-width:560px){ body{font-size:16px} table{font-size:.88rem} .bar{position:static} }
@media (prefers-reduced-motion: reduce){ .wall video{display:none} .theme-switch,.theme-switch-knob{transition-duration:1ms} }
`

/** Same QDnCo lockup the landing page nav uses — image asset + tagline.
 *  Path is relative to /guides/* and /legal/* (one level under the site root). */
export const homeLockup = (href = '../index.html') =>
  `<a class="home" href="${href}">` +
  `<span class="home-col">` +
  `<img src="../brands/qdco.png" alt="QDnCo" width="170" height="34" decoding="async" />` +
  `<span class="home-tag">The Next-Gen Brand Lab</span>` +
  `</span></a>`

/* Guide-specific additions, appended to the shared sheet. */
export const GUIDE_CSS = `
.crumbs{font-family:'Barlow',sans-serif;font-size:.86rem;margin:0 0 1.1rem;
  color:rgba(var(--ink-rgb),.6)}
.crumbs a{color:rgba(var(--ink-rgb),.75);text-decoration:none}
.crumbs a:hover{color:var(--accent);text-decoration:underline}
.crumbs span{opacity:.5;padding:0 .45rem}

.lede{font-size:clamp(1.05rem,1.4vw,1.22rem);line-height:1.62;
  color:rgba(var(--ink-rgb),.9);margin:0 0 2rem}

.keyfacts{display:grid;gap:.9rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));
  margin:1.8rem 0 2.4rem}
.keyfact{background:rgba(var(--fill-rgb),.06);border:1px solid rgba(var(--ink-rgb),.16);
  border-radius:16px;padding:1rem 1.15rem}
.keyfact b{display:block;font-family:'Instrument Serif',serif;font-weight:400;
  font-size:clamp(1.5rem,2.4vw,2rem);line-height:1;color:var(--ink);margin-bottom:.35rem}
.keyfact span{font-family:'Barlow',sans-serif;font-size:.86rem;color:rgba(var(--ink-rgb),.7);line-height:1.4}

/* Answer-first block. An answer engine lifts the first sentence under a
   question, so the direct answer is set apart from the reasoning that follows
   rather than buried inside it. */
.answer{border-left:3px solid var(--accent);background:rgba(182,0,168,.07);
  border-radius:0 14px 14px 0;padding:1rem 1.25rem;margin:1.1rem 0 1.6rem}
.answer p{margin:0;color:rgba(var(--ink-rgb),.92);font-size:1.02rem;line-height:1.6}
.answer p+p{margin-top:.7rem}

.faq{margin-top:1.2rem}
.faq details{border:1px solid rgba(var(--ink-rgb),.16);border-radius:14px;
  padding:.2rem 1.1rem;margin-bottom:.7rem;background:rgba(var(--fill-rgb),.04)}
.faq summary{cursor:pointer;list-style:none;padding:.95rem 0;font-family:'Barlow',sans-serif;
  font-weight:600;font-size:1.02rem;color:var(--ink);display:flex;justify-content:space-between;gap:1rem}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:'+';color:var(--accent);font-weight:700;flex-shrink:0}
.faq details[open] summary::after{content:'−'}
.faq details>p{margin:0 0 1rem;color:rgba(var(--ink-rgb),.8);line-height:1.62}

.related{margin-top:3rem;padding-top:1.6rem;border-top:1px solid rgba(var(--ink-rgb),.14)}
.related h2{margin-top:0}
.related ul{list-style:none;padding:0;display:grid;gap:.7rem;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.related a{display:block;padding:.9rem 1.1rem;border-radius:14px;text-decoration:none;
  border:1px solid rgba(var(--ink-rgb),.16);background:rgba(var(--fill-rgb),.04);
  color:var(--ink);font-family:'Barlow',sans-serif;font-weight:600;font-size:.96rem;line-height:1.4}
.related a:hover{border-color:var(--accent);color:var(--accent)}
.related a small{display:block;font-weight:400;color:rgba(var(--ink-rgb),.62);
  font-size:.84rem;margin-top:.3rem}

.cta-band{margin-top:3rem;padding:clamp(1.3rem,3vw,2rem);border-radius:22px;
  border:1px solid rgba(182,0,168,.45);background:rgba(182,0,168,.09)}
.cta-band h2{margin:0 0 .5rem;font-size:clamp(1.2rem,2.2vw,1.6rem)}
.cta-band p{margin:0 0 1.1rem;color:rgba(var(--ink-rgb),.82)}
.cta-band a{display:inline-flex;align-items:center;gap:.5rem;min-height:50px;
  padding:.8rem 1.5rem;border-radius:999px;text-decoration:none;
  background:var(--ink);color:var(--page);font-family:'Barlow',sans-serif;font-weight:600}

.guide-grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));margin-top:2rem}
.guide-card{display:block;padding:1.3rem 1.45rem;border-radius:18px;text-decoration:none;
  border:1px solid rgba(var(--ink-rgb),.16);background:rgba(var(--fill-rgb),.04);color:var(--ink);
  transition:border-color .2s ease,transform .2s ease}
.guide-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.guide-card b{display:block;font-family:'Barlow',sans-serif;font-weight:700;
  font-size:1.06rem;line-height:1.3;margin-bottom:.45rem}
.guide-card span{display:block;color:rgba(var(--ink-rgb),.7);font-size:.92rem;line-height:1.5}
`
