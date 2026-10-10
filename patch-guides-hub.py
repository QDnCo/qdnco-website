"""Guides hub = India + Dubai (it is also where /inner_pages/blog.html now 301s, i.e. a Google sitelink).
Retitles the hub for both markets, adds a Dubai / India→Dubai section, keeps every existing India card. Idempotent."""
import re, json, html
P = 'dist/guides/index.html'
s = open(P, encoding='utf-8').read()
TITLE = 'Real Estate Marketing Guides: India & Dubai | QDnCo'
DESC = 'Practical real estate marketing guides for India and Dubai: qualified leads, Meta and Google Ads, RERA and DLD rules, channel partners and Indian buyers.'
s = re.sub(r'<title>[^<]*</title>', f'<title>{html.escape(TITLE)}</title>', s, count=1)
s = re.sub(r'<meta name="description" content="[^"]*"\s*/?>', f'<meta name="description" content="{html.escape(DESC)}">', s, count=1)
s = re.sub(r'<meta property="og:title" content="[^"]*"\s*/?>', f'<meta property="og:title" content="{html.escape(TITLE)}">', s, count=1)
s = re.sub(r'<meta property="og:description" content="[^"]*"\s*/?>', f'<meta property="og:description" content="{html.escape(DESC)}">', s, count=1)
s = s.replace('"name":"Real Estate Marketing Guides — Bangalore | QDnCo"', f'"name":"{TITLE}"')
s = re.sub(r'<h1>[^<]*</h1>', '<h1>Real estate marketing guides for India and Dubai</h1>', s, count=1)
s = re.sub(r'<p class="lede">.*?</p>', '<p class="lede">Working guides from QDnCo for real estate developers, brokerages and channel partners in India and Dubai. Everything comes out of running paid acquisition for residential launches and from our own published research. Where a number appears it is labelled: observed, client-reported, a model or a market estimate.</p>', s, count=1, flags=re.S)
DUBAI = [('/dubai/indian-real-estate-performance-marketing-agency/', 'Indian performance marketing for Dubai real estate', 'The India→Dubai buyer corridor: who it is for and the evidence.'),
         ('/data/india-dubai-buyer-acquisition-report.html', 'India → Dubai Buyer Acquisition Report 2026', 'Dubai property ads shown in India and what Indians search.'),
         ('/dubai/trakheesi-permit-guide/', 'Trakheesi permits for real estate marketers', 'What every Dubai property ad needs.'),
         ('/dubai/real-estate-lead-generation/', 'Lead generation for Dubai brokers', 'Portals, Meta, Google and speed to lead.'),
         ('/dubai/property-lead-generation-from-india/', 'Dubai property lead generation from India', 'The funnel from ad to Dubai visit.'),
         ('/dubai/nri-hni-real-estate-marketing/', 'NRI and HNI marketing for Dubai real estate', 'Five Indian buyer segments.'),
         ('/dubai/off-plan-launch-marketing/', 'Off-plan launch marketing in Dubai', 'Pre-launch, launch and sustain windows.'),
         ('/dubai/off-plan-marketing-indian-buyers/', 'Dubai off-plan for Indian buyers', 'Rupee pricing, escrow, instalments.'),
         ('/dubai/meta-google-ads-dubai-property-india/', 'Meta and Google Ads for Dubai property in India', 'Structure, keywords, creative.'),
         ('/dubai/indian-buyers/', 'Selling Dubai property to Indian buyers', 'Targeting, remittance and follow-up.')]
if 'id="dubai-guides"' not in s:
    grid_end = s.index('</div>', s.index('<div class="guide-grid">'))
    # close the first grid, then add the Dubai section; India cards above keep their order
    block = ('\n<h2 id="india-guides" style="margin-top:2.2rem">India</h2><p>For developers and channel partners in Bengaluru and across India.</p>' if 'id="india-guides"' not in s else '')
    s = s.replace('<div class="guide-grid">', block + '<div class="guide-grid">', 1)
    grid_end = s.index('</div>', s.index('<div class="guide-grid">'))
    dub = ('\n<h2 id="dubai-guides" style="margin-top:2.2rem">Dubai and the India → Dubai corridor</h2>'
           '<p>For Dubai developers, brokerages and agents, and for anyone selling Dubai property to Indian buyers.</p><div class="guide-grid">'
           + ''.join(f'<a class="guide-card" href="{h}"><b>{html.escape(t)}</b><span>{html.escape(d)}</span></a>' for h, t, d in DUBAI) + '</div>')
    s = s[:grid_end + 6] + dub + s[grid_end + 6:]
s = re.sub(r'<p class="updated">[^<]*</p>', f'<p class="updated">Last updated 2026-09-29 &middot; India and Dubai</p>', s, count=1)
open(P, 'w', encoding='utf-8').write(s)
print('guides hub: India + Dubai')
