"""Adds 'For brokers' (India channel-partner hub) and 'Dubai' (/dubai/) to the
Sections footer nav of every static content page, so the new hubs are one click
from ~110 pages. Idempotent; skips the two React homepages."""
import os, re
n = 0
for root, _, files in os.walk('dist'):
    for f in files:
        if not f.endswith('.html'): continue
        p = os.path.join(root, f); rel = os.path.relpath(p, 'dist')
        if rel in ('index.html', os.path.join('dubai', 'index.html')): continue
        s = open(p, encoding='utf-8').read()
        m = re.search(r'<nav aria-label="Sections">(.*?)</nav>', s, re.S)
        if not m: continue
        depth = rel.count(os.sep)
        up = '../' * depth
        nav = m.group(1); changed = False
        # an existing Dubai link to the hub is repointed at the Dubai homepage
        nav2 = re.sub(r'<a href="(?:\.\./)*dubai/real-estate-marketing/">Dubai</a>', f'<a href="{up}dubai/">Dubai</a>', nav)
        if nav2 != nav: nav, changed = nav2, True
        adds = []
        if 'real-estate-leads-for-channel-partners.html' not in nav:
            adds.append(f'<a href="{up}guides/real-estate-leads-for-channel-partners.html">For brokers</a>')
        if f'href="{up}dubai/"' not in nav:
            adds.append(f'<a href="{up}dubai/">Dubai</a>')
        if f'href="{up}about/"' not in nav and not rel.startswith('about'):
            adds.append(f'<a href="{up}about/">About</a>')
        if adds:
            k = nav.find(f'<a href="{up}legal/privacy.html"')
            ins = '\n        '.join(adds) + '\n        '
            nav = (nav[:k] + ins + nav[k:]) if k >= 0 else nav.rstrip() + '\n        ' + ins
            changed = True
        if changed:
            s = s[:m.start(1)] + nav + s[m.end(1):]
            open(p, 'w', encoding='utf-8').write(s); n += 1
print(f'{n} pages updated')
