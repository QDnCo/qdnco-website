"""Links the India homepage (dist/index.html) to the Dubai homepage. Idempotent.

hreflang pair, Dubai in Organization.areaServed, footer link -> /dubai/, and a
permanent India <-> Dubai cross-link CTA (header pill on every screen + a
full-sentence hero button on desktop), flashing on the same rhythm as the
Book Phase 0 button. make-dubai-home.py flips REGION_LINK for the Dubai page.

The CTA is React source, so the homepage prerender is emptied here and must be
re-baked afterwards:  node scripts/build/prerender-page.mjs index.html
"""
import json, re
P = 'dist/index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, n=1):
    global s
    if new in s and old not in s: return
    c = s.count(old); assert c == n, f'{c}x {old[:80]!r}'; s = s.replace(old, new)

# Replace the existing locale set before adding it: repeated builds must not duplicate tags.
s = re.sub(r'^[ \t]*<link rel="alternate" hreflang="(?:en-IN|en-AE|x-default)" href="https://qdnco\.com/(?:dubai/)?" />\n', "", s, flags=re.M)
rep('<link rel="canonical" href="https://qdnco.com/" />',
    '<link rel="canonical" href="https://qdnco.com/" />\n'
    '    <link rel="alternate" hreflang="en-IN" href="https://qdnco.com/" />\n'
    '    <link rel="alternate" hreflang="en-AE" href="https://qdnco.com/dubai/" />\n'
    '    <link rel="alternate" hreflang="x-default" href="https://qdnco.com/" />')
rep("{ l: 'Dubai real estate marketing', h: 'dubai/real-estate-marketing/' },", "{ l: 'QDnCo Dubai', h: 'dubai/' },")
rep("      { l: 'All guides', h: 'guides/index.html' },\n",
    "      { l: 'All guides', h: 'guides/index.html' },\n      { l: 'For channel partners & brokers', h: 'guides/real-estate-leads-for-channel-partners.html' },\n")

mm = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
g = json.loads(mm.group(1)); org = g['@graph'][0]
for node in g['@graph']:
    if node.get('@type') == 'WebPage' and node.get('@id') == 'https://qdnco.com/#webpage':
        node['name'] = 'Real Estate Performance Marketing Agency in India | QDnCo'
        node['description'] = 'Real estate lead generation for developers and channel partners in India: research, creative testing, Meta and Google ads, priced per qualified lead.'
s = s[:mm.start(1)] + json.dumps(g, ensure_ascii=False) + s[mm.end(1):]
mm = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
g = json.loads(mm.group(1)); org = g['@graph'][0]
if not any(a.get('name') == 'Dubai' for a in org['areaServed']):
    org['areaServed'] += [{'@type': 'City', 'name': 'Dubai'}, {'@type': 'Country', 'name': 'United Arab Emirates'}]
    s = s[:mm.start(1)] + json.dumps(g, ensure_ascii=False) + s[mm.end(1):]

# India homepage targets India now that Dubai has its own homepage (/dubai/).
for pat, new in [(r'<title>[^<]*</title>', '<title>Real Estate Performance Marketing Agency in India | QDnCo</title>'),
                 (r'<meta name="description" content="[^"]*" />', '<meta name="description" content="Real estate lead generation for developers and channel partners in India: research, creative testing, Meta and Google ads, priced per qualified lead." />'),
                 (r'<meta property="og:title" content="[^"]*" />', '<meta property="og:title" content="Real Estate Performance Marketing Agency in India | QDnCo" />'),
                 (r'<meta name="twitter:title" content="[^"]*" />', '<meta name="twitter:title" content="Real Estate Performance Marketing Agency in India | QDnCo" />'),
                 (r'<meta property="og:description" content="[^"]*" />', '<meta property="og:description" content="Real estate lead generation for developers and channel partners in India: research, creative testing, Meta and Google ads, priced per qualified lead." />'),
                 (r'<meta name="twitter:description" content="[^"]*" />', '<meta name="twitter:description" content="Real estate lead generation for developers and channel partners in India: research, creative testing, Meta and Google ads, priced per qualified lead." />')]:
    s, n = re.subn(pat, lambda m, new=new: new, s, count=1); assert n == 1, pat

# Link previews (WhatsApp/LinkedIn/FB/X) show the India hero, not a client's site (make-og-images.mjs)
OG_IMG = 'https://qdnco.com/og/og-india.jpg'
for pat, new in [(r'<meta property="og:image" content="[^"]*" />', f'<meta property="og:image" content="{OG_IMG}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="QDnCo — real estate performance marketing, priced per qualified lead" />'),
                 (r'<meta name="twitter:image" content="[^"]*" />', f'<meta name="twitter:image" content="{OG_IMG}" />')]:
    if 'og:image:width' in new and 'og:image:width' in s: continue
    s, n = re.subn(pat, lambda m, new=new: new, s, count=1); assert n == 1, pat

# The timezone-only suggestion pill is superseded by the permanent CTA.
s = re.sub(r'<script>/\* Region suggestion.*?</script>\n', '', s, flags=re.S)

# ── Cross-link CTA ──
CSS = '''<style>
/* India <-> Dubai cross-link. Same ring + sheen rhythm as .nav-cta, but ink-filled
   with a gold ring and a pulsing dot, so it never competes with the violet
   Book Phase 0 button yet is always the second thing the eye finds. */
.region-cta{position:relative;overflow:hidden;isolation:isolate;display:inline-flex;align-items:center;gap:.5rem;
 background:var(--ink);color:var(--page)!important;text-decoration:none!important;border-radius:999px;
 padding:.62rem 1.05rem;font-family:'Barlow',sans-serif;font-weight:600;line-height:1;white-space:nowrap;
 font-size:clamp(.82rem,.98vw,.98rem);box-shadow:0 6px 18px -8px rgba(0,0,0,.45);
 animation:region-cta-ring 2.6s ease-out infinite;transition:transform 200ms ease,filter 200ms ease}
.region-cta:hover{transform:translateY(-1px);filter:brightness(1.15)}
.region-cta:focus-visible{outline:2px solid #E0A526;outline-offset:3px}
.region-cta::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:-1;
 background:linear-gradient(105deg,transparent 30%,rgba(255,206,110,.6) 48%,rgba(255,255,255,.2) 56%,transparent 70%);
 transform:translateX(-130%);animation:nav-cta-shine 2.6s ease-in-out infinite}
.region-cta .rc-dot{flex:none;width:7px;height:7px;border-radius:999px;background:#E0A526;animation:live-pulse 1.3s ease-in-out infinite}
.region-cta .rc-arrow{flex:none;transition:transform 200ms ease}
.region-cta:hover .rc-arrow{transform:translate(2px,-2px)}
@keyframes region-cta-ring{
 0%{box-shadow:0 6px 18px -8px rgba(0,0,0,.45),0 0 0 0 rgba(224,165,38,.8)}
 60%{box-shadow:0 6px 18px -8px rgba(0,0,0,.45),0 0 0 11px rgba(224,165,38,0)}
 100%{box-shadow:0 6px 18px -8px rgba(0,0,0,.45),0 0 0 0 rgba(224,165,38,0)}}
.region-cta .rc-pre,.region-cta .rc-brand{display:none}
@media(min-width:1024px){.region-cta .rc-brand{display:inline}}
@media(min-width:1600px){.region-cta .rc-pre{display:inline}}
.region-cta.is-hero .rc-pre,.region-cta.is-hero .rc-brand{display:inline}
.region-cta.is-hero{font-size:var(--fs-body);padding:.6rem 1.15rem;display:none}
@media(min-width:768px){.region-cta.is-hero{display:inline-flex}}
.region-cta.is-compact{padding:.55rem .85rem;font-size:.95rem;min-height:40px}
@media(prefers-reduced-motion:reduce){.region-cta,.region-cta::after,.region-cta .rc-dot{animation:none}.region-cta::after{display:none}}
</style>
'''
if '.region-cta{' not in s:
    rep('</head>', CSS + '</head>')

COMPONENT = '''/* India <-> Dubai cross-link. A real <a> inside the prerendered bar, so crawlers
   and answer engines see the two homepages linked, not just visitors. The label
   collapses by width: full sentence on very wide screens and in the hero,
   "QDnCo Dubai" on laptops, "Dubai" on phones. */
const REGION_LINK = { href: '/dubai/', pre: 'Selling in Dubai? Go to ', brand: 'QDnCo ', place: 'Dubai' };
function RegionSwitch({ compact = false, hero = false, className = '' }) {
  const r = REGION_LINK;
  return (
    <a href={r.href} title={r.pre + r.brand + r.place}
       className={`region-cta${compact ? ' is-compact' : ''}${hero ? ' is-hero' : ''} ${className}`}>
      <span className="rc-dot" aria-hidden="true" />
      <span><span className="rc-pre">{r.pre}</span><span className="rc-brand">{r.brand}</span>{r.place}</span>
      <ArrowUpRight className="rc-arrow h-4 w-4" />
    </a>
  );
}

function Navbar() {'''
if 'function RegionSwitch' not in s:
    rep('function Navbar() {', COMPONENT)

rep('''      <div className="justify-self-end flex items-center justify-end" style={{ height: 48 }}>
        <ThemeToggle />''', '''      <div className="justify-self-end flex items-center justify-end gap-3" style={{ height: 48 }}>
        <RegionSwitch />
        <ThemeToggle />''')
rep('''        <ThemeToggle compact />
      </div>''', '''        <div className="flex items-center gap-2 shrink-0">
          <RegionSwitch compact />
          <ThemeToggle compact />
        </div>
      </div>''')
# Hero full-sentence cross-link REMOVED by owner decision (ga4-clean, 26 Sep 2026); the top-bar RegionSwitch stays.
s = s.replace('''          <div className="flex items-center justify-end gap-4">
            <RegionSwitch hero />
            <motion.button custom={6}''', '''          <div className="flex items-center justify-end gap-4">
            <motion.button custom={6}''')

# ── Social / entity chips in the closing rail (company profiles + Google Business Profile) ──
ICONS = """const InstagramIcon = ({ className, style }) => (
  <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = ({ className, style }) => (
  <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z"/>
  </svg>
);
const GoogleIcon = ({ className, style }) => (
  <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.2ZM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Zm-5.6-8a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9l3.3-2.5ZM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6Z"/>
  </svg>
);

function FadeIn({"""
if 'const InstagramIcon' not in s:
    rep("\nfunction FadeIn({", "\n" + ICONS)
rep("""            <div className="closing-rail-row">
              <a className="footer-chip" href="https://www.linkedin.com/in/v-s-kavshik" target="_blank" rel="noreferrer noopener">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a className="footer-chip" href="#pricing">
                Pricing <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>""", """            <div className="closing-rail-row">
              <a className="footer-chip" href="https://www.linkedin.com/company/qd-co/" target="_blank" rel="noreferrer noopener me">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a className="footer-chip" href="https://www.instagram.com/qdnco.official/" target="_blank" rel="noreferrer noopener me">
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
              <a className="footer-chip" href="https://www.facebook.com/profile.php?id=61583765303879" target="_blank" rel="noreferrer noopener me">
                <FacebookIcon className="h-4 w-4" /> Facebook
              </a>
            </div>
            <div className="closing-rail-row">
              <a className="footer-chip" href="https://share.google/FodoeqQ5BsOYxikAz" target="_blank" rel="noreferrer noopener me">
                <GoogleIcon className="h-4 w-4" /> Google reviews
              </a>
              <a className="footer-chip" href="#pricing">
                Pricing <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>""")

# ── Footer links into the India→Dubai cluster and About (29 Sep 2026) ──
rep("{ l: 'QDnCo Dubai', h: 'dubai/' },", "{ l: 'QDnCo Dubai', h: 'dubai/' },\n      { l: 'Indian buyers for Dubai property', h: 'dubai/indian-real-estate-performance-marketing-agency/' },\n      { l: 'India → Dubai buyer report 2026', h: 'data/india-dubai-buyer-acquisition-report.html' },\n      { l: 'About QDnCo', h: 'about/' },")

# ── Retainer is a flat monthly fee: no % of media, no upside (owner, 26 Sep 2026) ──
rep("    name: 'Retainer + Upside',", "    name: 'Monthly Retainer',")
rep("    unit: 'per month + 8% of media + 2% upside',", "    unit: 'per month, flat fee',")
rep("You fund the media; any outcome-linked fee follows the written agreement.", "You fund the media directly; the retainer is one flat monthly fee.", n=s.count("You fund the media; any outcome-linked fee follows the written agreement.") or 1)
rep("'You fund the media spend directly — the 8% management fee is disclosed separately'", "'You fund the media spend directly to Meta and Google — no percentage of media, no markup'")
rep("'2% of value only on units sold above a threshold agreed in writing before we start'", "'Scope, deliverables and billing terms agreed in writing before we start'")
rep("note: 'The retainer, management percentage and upside are separate from your platform media spend. Agree the scope, sales threshold and billing terms in writing.'",
    "note: 'The retainer is one flat monthly fee, separate from your platform media spend. Agree the scope and billing terms in writing.'")
rep("{ l: 'Retainer + Upside', h: '#pricing' },", "{ l: 'Monthly Retainer', h: '#pricing' },")

# ── Owner, 29 Sep 2026: spelling "Adarsh Jee Pandey"; retainer minimum three months ──
rep("name: 'Adarsh Ji Pandey'", "name: 'Adarsh Jee Pandey'")
rep("'Scope, deliverables and billing terms agreed in writing before we start',", "'Scope, deliverables and billing terms agreed in writing before we start',\n      'Minimum three-month engagement',")

# The baked frame no longer matches the source; empty it for a fresh prerender.
a = s.index('<div id="root">'); b = s.index('<script src="/js/lead-capture.js">')
s = s[:a] + '<div id="root"></div>\n' + s[b:]
assert s.count('<div id="root">') == 1
open(P, 'w', encoding='utf-8').write(s)
print('india homepage linked to /dubai/ — now run: node scripts/build/prerender-page.mjs index.html')
