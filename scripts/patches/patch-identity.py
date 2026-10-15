"""One entity, everywhere. Run AFTER build-homepages.sh and the page builders. Idempotent.

1. Organization.sameAs on every page = the same verified profiles (Google Business
   Profile, LinkedIn company, Instagram, Facebook) + hasMap → GBP. Google links a
   site to its profiles and knowledge panel through these.
2. Static pages: a visible "Follow" line with the same profiles in the footer.
3. Legal pages: noindex,follow and out of the sitemap, so sitelinks come from real
   service pages instead of "Accessibility Statement".
4. Branded 404 page (replaces Hostinger's default template and its trackers) and
   .htaccess ErrorDocument + manifest MIME type.
"""
import json, os, re

GBP_SHARE = 'https://share.google/FodoeqQ5BsOYxikAz'
GBP_KG = 'https://www.google.com/search?kgmid=/g/11zyzyy85d'
PROFILES = [
    'https://www.linkedin.com/company/qd-co/',
    'https://www.instagram.com/qdnco.official/',
    'https://www.facebook.com/profile.php?id=61583765303879',
    GBP_KG,
]
FOLLOW = ('<p class="follow">Follow QDnCo: '
          '<a href="https://www.linkedin.com/company/qd-co/" rel="me noopener">LinkedIn</a> &middot; '
          '<a href="https://www.instagram.com/qdnco.official/" rel="me noopener">Instagram</a> &middot; '
          '<a href="https://www.facebook.com/profile.php?id=61583765303879" rel="me noopener">Facebook</a> &middot; '
          f'<a href="{GBP_SHARE}" rel="me noopener">Google reviews</a></p>')

ADARSH_IG = 'https://www.instagram.com/theadarshg/'   # co-founder & CEO's niche-audience handle (owner, 29 Sep 2026)
def fix_person(node):
    if not isinstance(node, dict) or node.get('@id') != 'https://qdnco.com/#adarsh': return False
    same = node.get('sameAs') or []
    same = [same] if isinstance(same, str) else same
    ch = False
    if ADARSH_IG not in same: same = same + [ADARSH_IG]; ch = True
    if node.get('name') != 'Adarsh Jee Pandey': node['name'] = 'Adarsh Jee Pandey'; ch = True
    node['sameAs'] = same
    return ch

def fix_org(node):
    if not isinstance(node, dict): return False
    t = node.get('@type'); t = t if isinstance(t, list) else [t]
    if node.get('@id') != 'https://qdnco.com/#organization' or 'Organization' not in t: return False
    same = node.get('sameAs') or []
    same = [same] if isinstance(same, str) else same
    new = same + [u for u in PROFILES if u not in same]
    changed = new != same or node.get('hasMap') != GBP_SHARE
    node['sameAs'] = new; node['hasMap'] = GBP_SHARE
    # Brand spellings (owner, 29 Sep 2026): QDnCo is the brand; QDnCo where '&' is not allowed; domain qdnco.com.
    alt = node.get('alternateName') or []
    alt = [alt] if isinstance(alt, str) else alt
    want = ['QDnCo', 'QDnCo', 'QDnCo', 'QDnCo', 'QDnCo', 'QDnCo', 'qdnco.com', "QDnCo"]
    alt2 = [a for a in alt if a != 'QDnCo'] + [a for a in want if a not in alt]
    alt2 = list(dict.fromkeys(alt2))
    if alt2 != alt: node['alternateName'] = alt2; changed = True
    # Owner, 29 Sep 2026: all three are co-founders (known publicly by title: CEO, Head of Sales, CTO).
    FOUNDERS = [{'@id': 'https://qdnco.com/#adarsh'}, {'@id': 'https://qdnco.com/#person'}, {'@id': 'https://qdnco.com/#vinayak-tiwari'}]
    if node.get('founder') != FOUNDERS: node['founder'] = FOUNDERS; changed = True
    return changed

stats = dict(schema=0, follow=0, noindex=0)
for root, _, files in os.walk('dist'):
    for f in files:
        if not f.endswith('.html'): continue
        p = os.path.join(root, f); rel = os.path.relpath(p, 'dist')
        s = open(p, encoding='utf-8').read(); orig = s

        def sub_ld(m):
            try: g = json.loads(m.group(2))
            except Exception: return m.group(0)
            nodes = g.get('@graph', [g]) if isinstance(g, dict) else g
            if any([fix_org(n) for n in nodes] + [fix_person(n) for n in nodes]):
                stats['schema'] += 1
                return m.group(1) + json.dumps(g, ensure_ascii=False) + m.group(3)
            return m.group(0)
        s = re.sub(r'(<script type="application/ld\+json">)(.*?)(</script>)', sub_ld, s, flags=re.S)
        s = s.replace('Adarsh Ji Pandey', 'Adarsh Jee Pandey')   # owner spelling, 29 Sep 2026

        if rel not in ('index.html', os.path.join('dubai', 'index.html')) and 'og:image' not in s and '</head>' in s:
            img = 'https://qdnco.com/og/og-dubai.jpg' if rel.startswith('dubai' + os.sep) else 'https://qdnco.com/og/og-india.jpg'
            tags = (f'<meta property="og:image" content="{img}">\n<meta property="og:image:width" content="1200">\n'
                    f'<meta property="og:image:height" content="630">\n<meta name="twitter:image" content="{img}">\n')
            if 'twitter:card' not in s: tags += '<meta name="twitter:card" content="summary_large_image">\n'
            s = s.replace('</head>', tags + '</head>', 1)
        if '<footer class="foot">' in s and 'class="follow"' not in s:
            s = s.replace('</footer>', f'  {FOLLOW}\n    </footer>', 1); stats['follow'] += 1

        if rel.startswith('legal' + os.sep):
            s2 = re.sub(r'<meta (name="robots" content="[^"]*"|content="[^"]*" name="robots")\s*/?>',
                        '<meta name="robots" content="noindex, follow">', s, count=1)
            if 'noindex' not in s2:
                s2 = s2.replace('</head>', '<meta name="robots" content="noindex, follow">\n</head>', 1)
            if s2 != s: stats['noindex'] += 1
            s = s2
        if s != orig: open(p, 'w', encoding='utf-8').write(s)

# sitemap: legal pages out
sm = open('dist/sitemap.xml', encoding='utf-8').read()
sm2 = re.sub(r'\s*<url>\s*<loc>https://qdnco\.com/legal/[^<]+</loc>.*?</url>', '', sm, flags=re.S)
removed = sm.count('<url>') - sm2.count('<url>')
open('dist/sitemap.xml', 'w', encoding='utf-8').write(sm2)

# 404 page from a static shell, all links root-absolute
shell = open('dist/guides/index.html', encoding='utf-8').read()
head, rest = shell[:shell.index('</head>')], shell[shell.index('</head>'):]
head = re.sub(r'<title>.*?</title>', '<title>Page not found | QDnCo</title>', head, flags=re.S)
head = re.sub(r'<meta (name="description" content="[^"]*"|content="[^"]*" name="description")\s*/?>', '<meta name="description" content="This page does not exist on qdnco.com. Find QDnCo guides, research, pricing and the India and Dubai homepages.">', head, count=1)
head = re.sub(r'<meta (name="robots" content="[^"]*"|content="[^"]*" name="robots")\s*/?>', '<meta name="robots" content="noindex, follow">', head, count=1)
head = re.sub(r'<link (rel="canonical" href="[^"]*"|href="[^"]*" rel="canonical")\s*/?>\n?', '', head)
head = re.sub(r'<script type="application/ld\+json">.*?</script>', '', head, flags=re.S)
page = head + rest
a = page.index('<div class="page"><div class="wrap">') + len('<div class="page"><div class="wrap">')
b = page.index('<footer class="foot">')
BODY = '''<p class="eyebrow">404</p><h1>This page does not exist</h1>
<p class="lede">The link may be old or mistyped. These are the pages most people are looking for:</p>
<div class="guide-grid">
<a class="guide-card" href="/"><b>QDnCo India</b><span>Real estate marketing and lead generation for developers and channel partners.</span></a>
<a class="guide-card" href="/dubai/"><b>QDnCo Dubai</b><span>Lead generation for Dubai brokerages, developers and agents, priced in AED.</span></a>
<a class="guide-card" href="/guides/real-estate-leads-for-channel-partners.html"><b>Guides for channel partners</b><span>Leads without portals, Facebook ads, cost per booking, WhatsApp follow-up.</span></a>
<a class="guide-card" href="/guides/index.html"><b>All guides</b><span>How real estate performance marketing works, step by step.</span></a>
<a class="guide-card" href="/data/index.html"><b>Research</b><span>Our Meta Ad Library audits and published figures.</span></a>
<a class="guide-card" href="/pricing/index.html"><b>Pricing</b><span>Published fees, in rupees and in AED.</span></a>
</div>
'''
page = page[:a] + BODY + '    ' + page[b:]
page = re.sub(r'(href|src)="(?:\.\./)+', r'\1="/', page)
page = re.sub(r'(href|src)="(?!/|https?:|mailto:|tel:|#)([^"]+)"', r'\1="/guides/\2"', page)   # shell was /guides/
open('dist/404.html', 'w', encoding='utf-8').write(page)

ht = open('dist/.htaccess', encoding='utf-8').read()
if 'ErrorDocument 404' not in ht:
    ht += ('\n# Branded 404 (Hostinger default template carried third-party trackers).\nErrorDocument 404 /404.html\n'
           '\n# Web app manifest was served as text/plain.\nAddType application/manifest+json .webmanifest\n')
    open('dist/.htaccess', 'w', encoding='utf-8').write(ht)
print(f"schema updated on {stats['schema']} pages · follow line on {stats['follow']} · legal noindex {stats['noindex']} · sitemap -{removed} legal URLs · 404.html + .htaccess")
