"""Evidence ledger on every real-estate case study: each figure labelled by its source,
using the same labels the homepage project cards already publish. Idempotent.

Evidence types (see /about/editorial-policy.html):
  Observed · Client-reported · Client-supplied project fact · Owner-reported (historical) · Model · Market estimate
"""
import json, re

SRC = open('_jsx-source/index.html', encoding='utf-8').read()
SRC = SRC[SRC.index('<script type="text/babel">'):]
blk = SRC[SRC.index('const GROUPS = ['):]
blk = blk[:blk.index('];\n')]
ROWS = re.findall(r'\{brand: BRANDS\.\w+, "name": "([^"]+)", "cat": "([^"]+)", "role": "([^"]+)", "points": (\[\[.*?\]\]), "work": "([^"]+)"\}', blk)
PAGE = {'Brigade Eternia': 'brigade-eternia', 'Brigade Granada': 'brigade-granada', 'Brigade Jeevan Sandya': 'brigade-jeevan-sandya',
        'Brigade Vanagaram': 'brigade-vanagaram', 'Godrej Woodscapes': 'godrej-woodscapes', 'Godrej Tiara': 'godrej-tiara',
        'Godrej MSR City': 'godrej-msr-city', 'Vaishnavi Life': 'vaishnavi-life-mysore', 'Nikoo Homes 9': 'nikoo-homes-9',
        'Nambiar Bannerghatta': 'nambiar-bannerghatta', 'Urbanrise Paradise on Earth': 'urbanrise-paradise-on-earth',
        'Vajram KGF 2.0': 'vajram-kogilu', 'Kumar Platina': 'kumar-platina', 'Indium Group': 'indium-north-bangalore'}

def kind(label):
    l = label.lower()
    if 'owner report' in l: return 'Owner-reported (historical, not yet reconciled to platform exports)'
    if 'cost per form lead' in l or 'impressions' in l:
        return 'Observed — ad-platform figure for one named campaign, 24 Aug–22 Sep 2026'
    if any(k in l for k in ('client', 'brief', 'project scale', 'master plan', 'phase 1', 'layout scale', 'development')):
        return 'Client-supplied project fact (scale, not a marketing result)'
    if 'reported test period' in l: return 'Owner-reported (historical)'
    return 'Project description'

E = lambda x: x.replace('&', '&amp;').replace('<', '&lt;')
n = 0
for name, cat, role, pts, work in ROWS:
    slug = PAGE.get(name)
    if not slug: continue
    p = f'dist/work/{slug}.html'
    s = open(p, encoding='utf-8').read()
    if 'id="evidence"' in s: continue
    points = json.loads(pts)
    rows = [(v, lbl, kind(lbl)) for v, lbl in points if re.search(r'\d', v)]
    tr = ''.join(f'<tr><td>{E(v)}</td><td>{E(lbl.rstrip("*"))}</td><td>{E(k)}</td></tr>' for v, lbl, k in rows)
    unpublished = ('qualified-lead %, sales-ready %, site visits and bookings' if 'owner report' not in json.dumps(points).lower()
                   else 'platform exports, CRM reconciliation and booked revenue')
    html = f'''<h2 id="evidence">Evidence ledger</h2>
<p>Every figure on this page, labelled by where it comes from. Our <a href="../about/editorial-policy.html">editorial policy</a> explains the labels.</p>
<div class="tablewrap"><table><thead><tr><th>Figure</th><th>What it is</th><th>Evidence type</th></tr></thead><tbody>
<tr><td>{E(role)}</td><td>Our role on this project</td><td>Delivery-role statement</td></tr>
<tr><td>{E(cat)}</td><td>Location</td><td>Project description</td></tr>
{tr}</tbody></table></div>
<p><strong>Scope notes:</strong> {E(work)}</p>
<p><strong>Not yet published:</strong> {unpublished}. We publish these only when the client's CRM or platform export supports them, and label them when we do.</p>
'''
    k = s.find('<div class="related">')
    if k < 0: k = s.find('<div class="cta-band">')
    s = s[:k] + html + s[k:]
    open(p, 'w', encoding='utf-8').write(s); n += 1
print(f'{n} case studies given an evidence ledger ({len(ROWS)} projects on the homepage)')
