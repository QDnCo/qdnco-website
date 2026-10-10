"""Contextual links from the closest existing pages into the India broker guides. Idempotent."""
import re
ADD = {
 'dist/guides/meta-ads-for-real-estate-launches.html': ('facebook-ads-for-real-estate-agents-india.html', 'Facebook ads for real estate agents in India', 'The broker and channel-partner version: setup, forms, budget.'),
 'dist/guides/google-ads-for-real-estate.html': ('google-ads-for-real-estate-brokers.html', 'Google Ads for real estate brokers', 'Keyword tiers, negatives and builder names for channel partners.'),
 'dist/guides/channel-partner-vs-direct-demand.html': ('real-estate-leads-for-channel-partners.html', 'Real estate lead generation for channel partners', 'Every broker guide in one place.'),
 'dist/guides/cost-per-qualified-lead-real-estate.html': ('real-estate-lead-cost-for-brokers.html', 'What a qualified lead costs a broker', 'From cost per lead to cost per booking, against commission.'),
 'dist/guides/real-estate-crm-and-lead-funnel.html': ('whatsapp-follow-up-real-estate-leads.html', 'WhatsApp follow-up for real estate leads', 'Speed to lead, templates and TRAI rules.'),
 'dist/compare/buying-leads-vs-generating-them.html': ('../guides/how-to-get-real-estate-leads-without-portals.html', 'How to get real estate leads without portals', 'A channel partner playbook for owned lead sources.'),
 'dist/compare/performance-marketing-vs-channel-partner.html': ('../guides/real-estate-leads-for-channel-partners.html', 'Real estate lead generation for channel partners', 'Every broker guide in one place.'),
 'dist/answers/agency-vs-channel-partner.html': ('../guides/real-estate-leads-for-channel-partners.html', 'Real estate lead generation for channel partners', 'Every broker guide in one place.'),
 'dist/answers/should-i-advertise-on-99acres-magicbricks-housing.html': ('../guides/how-to-get-real-estate-leads-without-portals.html', 'How to get real estate leads without portals', 'Owned channels beside the portals.'),
 'dist/answers/how-fast-should-leads-be-called.html': ('../guides/whatsapp-follow-up-real-estate-leads.html', 'WhatsApp follow-up for real estate leads', 'A 48-hour sequence and the rules.'),
 'dist/answers/meta-ads-real-estate-basics.html': ('../guides/facebook-ads-for-real-estate-agents-india.html', 'Facebook ads for real estate agents in India', 'Setup, forms and budget for brokers.'),
 'dist/answers/google-ads-real-estate-basics.html': ('../guides/google-ads-for-real-estate-brokers.html', 'Google Ads for real estate brokers', 'Keyword tiers and landing pages.'),
 'dist/answers/what-is-good-cost-per-lead-bangalore.html': ('../guides/real-estate-lead-cost-for-brokers.html', 'What a qualified lead costs a broker', 'The arithmetic to judge any cost per lead.'),
}
n = 0
for p, (h, t, d) in ADD.items():
    s = open(p, encoding='utf-8').read()
    m = re.search(r'(<div class="related">.*?<ul>)(.*?)</ul>', s, re.S)
    if not m: print('no related block:', p); continue
    if h.split('/')[-1] in m.group(2): continue
    m = re.search(r'(<div class="related">.*?<ul>)', s, re.S)
    li = f'\n      <li><a href="{h}">{t}<small>{d}</small></a></li>'
    s = s[:m.end()] + li + s[m.end():]
    open(p, 'w', encoding='utf-8').write(s); n += 1
print(n, 'pages linked')
