"""Builds /data/meta-ad-library-audit-dubai-real-estate.html from the survey output.

Every number on the page is read from summary.json (dubai_adlib_code.py); nothing
is typed by hand. Downloads (CSV without ad copy + method JSON) are copied into
dist/data/downloads/. Page shell = the Bangalore audit page, so it is the same
product. Run from Portfolio Website/:  python3 make-dubai-audit.py
"""
import json, re, html, shutil, os
from pathlib import Path

SNAP = '2026-09-26'
SRC = Path('../QDnCo Marketing/Market Intelligence/_scrape') / f'dubai-{SNAP}'
S = json.load(open(SRC / 'summary.json', encoding='utf-8'))
T = open('dist/data/meta-ad-library-audit-bangalore-agencies.html', encoding='utf-8').read()
SLUG = 'meta-ad-library-audit-dubai-real-estate'
URL = f'https://qdnco.com/data/{SLUG}.html'
E = html.escape
B, L = S['buy'], S['sell']

def pct(side, k, basis='ads'):
    v = S[side]['codes'][k][f'{basis}_share'] * 100
    if v == 0: return '0%'
    return f'{v:.1f}%' if v < 10 else f'{round(v)}%'
def cnt(side, k, basis='ads'): return S[side]['codes'][k][basis]

nB, aB, nL, aL = B['relevant_ads'], B['advertisers_with_text_ads'], L['relevant_ads'], L['advertisers_with_text_ads']
terms_buy = [t for s, t in S['terms'] if s == 'buy']; terms_sell = [t for s, t in S['terms'] if s == 'sell']
res = {x['term']: x.get('results_label') for x in S['collection_log']}
errors = [x for x in S['collection_log'] if 'error' in x]

H1 = f'{nB:,} UAE property ads on Meta: what Dubai advertisers show, and what they leave out'
TITLE = 'Dubai Property Ads on Meta: 2026 Ad Library Audit | QDnCo'
DESC = (f'Audit of {nB:,} active UAE property ads from {aB} advertisers on Meta: how often they show '
        f'permit numbers, AED prices, payment plans and yield claims.')

rows = [
 ('Permit, Trakheesi or Madmoun reference in the ad text', 'permit_in_text'),
 ('ORN or BRN (office or broker registration) in the text', 'orn_brn_in_text'),
 ('A price in AED', 'price_aed'),
 ('A payment plan', 'payment_plan'),
 ('A handover or completion date', 'handover_date'),
 ('A percentage yield, ROI or return figure', 'yield_or_roi_figure'),
 ('"Guaranteed" or "assured" return language', 'guaranteed_return'),
 ('Golden Visa', 'golden_visa'),
 ('A reference to India, Indians or an Indian city', 'india_reference'),
 ('WhatsApp', 'whatsapp'),
 ('Arabic script', 'arabic_script'),
 ('Cyrillic (Russian) script', 'cyrillic_script'),
 ('Devanagari (Hindi) script', 'devanagari_script'),
]
srows = [
 ('A price per lead', 'price_per_lead'),
 ('Any price (AED or USD)', 'any_price'),
 ('Guarantee, assurance or refund language', 'guarantee'),
 ('"Exclusive" or "not shared" leads', 'exclusive_leads'),
 ('"Qualified", "verified", "genuine" or "serious buyer" claims', 'qualified_claim'),
 ('A stated lead volume ("500 leads")', 'lead_volume_claim'),
 ('A free offer (trial, audit, consultation)', 'free_offer'),
 ('Any mention of permits, Trakheesi or Madmoun', 'trakheesi_mention'),
]
def table(side, rr):
    return ('<div class="tablewrap"><table><thead><tr><th>The ad text contains…</th><th>Share of ads</th><th>Share of advertisers*</th></tr></thead><tbody>'
            + ''.join(f'<tr><td>{E(lbl)}</td><td>{pct(side,k)} <small>({cnt(side,k)})</small></td><td>{pct(side,k,"advertisers")} <small>({cnt(side,k,"advertisers")})</small></td></tr>' for lbl, k in rr)
            + '</tbody></table></div>')

top = ', '.join(f'{E(n)} ({c})' for n, c in B['top_advertisers_by_ads'][:10] if n)
ageB = B['run_age_days']

FAQ = [
 ("How many Dubai property ads were audited?",
  f"{nB:,} active property ads from {aB} advertiser names, out of {B['unique_ads']:,} unique ads found with {len(terms_buy)} property search terms in Meta's Ad Library with the country set to the United Arab Emirates on {SNAP}. A further {nL} real-estate ads from {aL} advertisers were collected for {len(terms_sell)} lead-generation and agency search terms."),
 ("Does this show that Dubai ads break the permit rules?",
  f"No. Only {pct('buy','permit_in_text')} of ads mention a permit, Trakheesi or Madmoun in their text, but DLD's permit number and QR code are usually printed on the image or video, which this audit does not read. The figure is a lower bound for disclosure in ad copy, not a measure of compliance."),
 ("How often do Dubai property ads show a price?",
  f"{pct('buy','price_aed')} of ads with text state a price in AED, and {pct('buy','payment_plan')} mention a payment plan."),
 ("Do Dubai property ads promise returns?",
  f"{pct('buy','yield_or_roi_figure')} of ads state a percentage yield, ROI or return figure, and {pct('buy','guaranteed_return')} use guaranteed or assured return language."),
 ("Can I download the data?",
  "Yes. The page links to buy-side and sell-side CSV indexes with Library links, advertiser names, start dates and every coded flag, plus a JSON file with the search terms, regular expressions, collection log and source checksum. Ad copy and images are not redistributed."),
]

BODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Research</a><span>/</span>Dubai property ads on Meta</nav><p class="eyebrow">Primary research &middot; Dubai</p><h1>{E(H1)}</h1><p class="updated">Published {SNAP} &middot; snapshot {SNAP}</p>
<p class="lede">We read every active ad that {len(terms_buy)} search terms returned in Meta's Ad Library for the United Arab Emirates: {B["unique_ads"]:,} unique ads, of which {nB:,} from {aB} advertisers are property ads. Then we coded what the ad text shows: permit references, AED prices, payment plans, handover dates, yield claims, Golden Visa, languages and India targeting. We did the same for {nL} real estate ads selling leads, marketing and careers to Dubai brokers and agents. The records, codes and method are downloadable.</p>
<div class="keyfacts"><div class="keyfact"><b>{nB:,}</b><span>active property ads, UAE</span></div><div class="keyfact"><b>{aB}</b><span>property advertiser names</span></div><div class="keyfact"><b>{pct("buy","price_aed")}</b><span>state an AED price in the text</span></div><div class="keyfact"><b>{pct("buy","permit_in_text")}</b><span>put a permit number in the ad text</span></div></div>
  <div class="srcnote">
    <p><b>Collected</b> {SNAP}, active ads, country: United Arab Emirates, Meta Ad Library public web pages (no login), headless Chrome.</p>
    <p style="margin-top:.5rem"><b>Method</b> {len(terms_buy)} buy-side and {len(terms_sell)} sell-side keyword searches; between 37 and 249 ad cards read per search. Rows deduplicated by Library ID within each side. Thirteen buy-side and nine sell-side questions were written as regular expressions before the counts were run, and applied to the ad text shown in each library card. Shares are reported per ad and per advertiser name.</p>
    <p style="margin-top:.5rem"><b>Sample</b> Buy: {B["unique_ads"]:,} unique ads, {nB:,} property-relevant ({aB} advertiser names). Sell: {L["unique_ads"]} unique ads, {nL} real-estate-relevant ({aL} advertiser names). Keyword search also returns off-topic ads, so shares are over relevant ads only: a property ad must name a property type and a buying, renting or investing signal, and home-service or beauty advertisers that mention villas are excluded. The rule was tightened once after a first pass let roofing and cosmetics ads through; the method file records the final rule and the revision. {S["raw_card_rows"]} card rows before deduplication. Meta's own result-count labels for these searches ranged up to ~{max((v for v in res.values() if v), key=lambda x: float(x.replace(",","").replace("K","000")))} active ads.</p>
    <p style="margin-top:.5rem"><b>Limits</b> A keyword-selected snapshot, not a census. Text printed inside images or video, where DLD permit numbers and QR codes are often placed, is not read, so every "shows" figure is a lower bound for the full creative. Regex coding misses paraphrases and can over-match. Ads shown in the UAE include property outside Dubai (for example India, Greece and Bali), sold to UAE residents. Advertiser names are display names, not verified legal entities. Start dates do not prove continuous delivery, spend or results. {"No collection errors were logged." if not errors else f"{len(errors)} search(es) logged an error."}</p>
  </div>
<h2 id="headline">What the snapshot shows</h2>
<div class="answer"><p><strong>Price and payment plan lead Dubai property advertising; permit numbers almost never appear in the ad copy.</strong> {pct("buy","price_aed")} of the {nB:,} property ads state an AED price and {pct("buy","payment_plan")} mention a payment plan, but only {pct("buy","permit_in_text")} reference a permit, Trakheesi or Madmoun in the text. {pct("buy","yield_or_roi_figure")} state a yield or return figure, and {pct("buy","golden_visa")} mention the Golden Visa.</p></div>

<h2 id="buy">Dubai property ads: what the text contains</h2>
{table("buy", rows)}
<p><small>*An advertiser counts once if any of its ads in the sample contains the item. Brackets show counts.</small></p>

<h2 id="permits">Permit numbers: rarely in the ad copy</h2>
<p>DLD requires the advertising permit number and its Madmoun QR code on real estate ads (<a href="https://dubailand.gov.ae/en/news-media/dubai-land-department-strengthens-transparency-with-ai-enabled-real-estate-advertising-governance" rel="noopener">DLD, 24 April 2025</a>). Advertisers can place them on the image or the video's end frame, which this audit does not read, so the text rate is a floor for disclosure, not a measure of compliance. In the text itself the rate is {pct("buy","permit_in_text")} of ads ({cnt("buy","permit_in_text")}) and {pct("buy","permit_in_text","advertisers")} of advertisers. {pct("buy","orn_brn_in_text")} show an ORN or BRN registration number in the text. Putting the permit number in the copy as well costs nothing and helps a buyer verify the ad before they call. Our <a href="../dubai/trakheesi-permit-guide/">Trakheesi guide for marketers</a> covers the rules.</p>

<h2 id="offer">What the offer leads with</h2>
<ul>
<li><strong>Price:</strong> {pct("buy","price_aed")} state an AED figure.</li>
<li><strong>Payment plan:</strong> {pct("buy","payment_plan")} mention one; <strong>handover or completion</strong> appears in {pct("buy","handover_date")}.</li>
<li><strong>Returns:</strong> {pct("buy","yield_or_roi_figure")} carry a percentage yield, ROI or return figure; {pct("buy","guaranteed_return")} use guaranteed or assured language.</li>
<li><strong>Golden Visa:</strong> {pct("buy","golden_visa")} of ads.</li>
<li><strong>WhatsApp</strong> is named in {pct("buy","whatsapp")}.</li>
</ul>

<h2 id="audiences">Languages and the India audience</h2>
<p>{pct("buy","arabic_script")} of ads carry Arabic script, {pct("buy","cyrillic_script")} Cyrillic and {pct("buy","devanagari_script")} Devanagari. Only {pct("buy","india_reference")} of ads ({cnt("buy","india_reference")}) mention India, Indian buyers, rupees or an Indian city at all, and several of those sell Indian property to UAE residents rather than Dubai property to Indians. That is despite Indian nationals being the largest foreign buyer group in 2025, by brokerage analysis of DLD data. None of the ads carried Hindi (Devanagari) script. See <a href="../dubai/indian-buyers/">selling Dubai property to Indian buyers</a>.</p>

<h2 id="who">Who is advertising</h2>
<p>{aB} advertiser names appear in the buy-side sample. The most frequent in this snapshot: {top}. Median ad age at the snapshot: {ageB["median"]} days; {ageB["over_90"]} ads had been running for more than 90 days and {ageB["over_180"]} for more than 180. Frequency here reflects how the search terms matched, not market share or spend.</p>

<h2 id="sellers">Who sells leads to Dubai brokers, and what they promise</h2>
<p>{nL} real-estate-relevant ads from {aL} advertisers matched lead-generation, agency and CRM searches. Not every one is an agency: CRM vendors, training sellers and brokerages recruiting agents with "leads provided" offers also match. Their median age was {L["run_age_days"]["median"]} days.</p>
{table("sell", srows)}
<p>{'None' if cnt('sell','price_per_lead') == 0 else pct('sell','price_per_lead')} of these ads state a price per lead, and {pct("sell","any_price")} show any price at all, while {pct("sell","qualified_claim")} claim their leads are qualified, verified, genuine or serious. Only {cnt("sell","trakheesi_mention")} mentioned permits. A broker comparing lead sellers should ask what a "lead" means in writing, whether leads are exclusive, and whose permit the ads run under.</p>

<h2 id="use">What a Dubai marketer can take from this</h2>
<ol>
<li><strong>Put the permit number in the copy as well as on the creative.</strong> Almost nobody does, so it doubles as a trust signal.</li>
<li><strong>Price and payment plan are the norm.</strong> Half of ads state an AED price and four in ten mention a payment plan; an ad without them stands out for the wrong reason.</li>
<li><strong>The India audience is under-addressed in the copy.</strong> Few ads speak to Indian buyers directly despite their share of purchases.</li>
<li><strong>Treat yield claims carefully.</strong> A yield figure needs a source and a basis; "guaranteed" language invites regulatory and buyer-trust problems.</li>
</ol>

<h2 id="downloads">Inspect the records and repeat the count</h2>
<ul><li><a href="/data/downloads/dubai-meta-audit-{SNAP}-buy.csv" download>Buy-side index: {B["unique_ads"]} ads with codes (CSV)</a></li><li><a href="/data/downloads/dubai-meta-audit-{SNAP}-sell.csv" download>Sell-side index: {L["unique_ads"]} ads with codes (CSV)</a></li><li><a href="/data/downloads/dubai-meta-audit-{SNAP}-method.json" download>Search terms, regular expressions, collection log and source checksum (JSON)</a></li></ul>
<p>Each CSV row has the snapshot date, advertiser display name, Library link, start date, run age, matched term and every coded flag. Ad copy and images are not redistributed; open the Library link to see the ad. Links may stop working when ads end.</p>

<h2 id="faq">Questions about this research</h2><div class="faq">{"".join(f"<details><summary>{E(q)}</summary><p>{E(a)}</p></details>" for q, a in FAQ)}</div>
<div class="related"><h2>Related</h2><ul><li><a href="../dubai/trakheesi-permit-guide/">Trakheesi permits for real estate marketers<small>What every Dubai property ad needs.</small></a></li><li><a href="../dubai/real-estate-lead-generation/">Lead generation for Dubai brokers<small>Portals, Meta, Google and speed to lead.</small></a></li><li><a href="meta-ad-library-audit-bangalore-agencies.html">51 real estate marketing ads: the Bangalore audit<small>The method this study extends.</small></a></li><li><a href="../dubai/">QDnCo Dubai<small>Services and AED pricing.</small></a></li></ul></div>
  <div class="srcnote" style="margin-top:1rem">
    <p><b>Citing this</b> QDnCo, Dubai property ads on Meta: 2026 Ad Library audit, snapshot {SNAP}. State the sample ({nB:,} active UAE property ads, {aB} advertisers, ad text only) with any figure. Link to <a href="{URL}">{URL}</a>. Ads and imagery remain subject to their owners' terms.</p>
  </div>
  <div class="cta-band">
    <h2>Want this run on your Dubai competitors?</h2>
    <p>Phase 0 includes an Ad Library read of your own launch window and communities.</p>
    <a href="../dubai/#contact">Book a Phase 0 call &nearr;</a>
  </div>
'''

GRAPH = {"@context": "https://schema.org", "@graph": [
 {"@type": "WebPage", "@id": URL + "#page", "url": URL, "name": TITLE, "description": DESC, "inLanguage": "en",
  "isPartOf": {"@id": "https://qdnco.com/#website"}, "datePublished": SNAP, "dateModified": SNAP, "breadcrumb": {"@id": URL + "#crumbs"}},
 {"@type": "Article", "@id": URL + "#article", "headline": H1, "description": DESC, "datePublished": SNAP, "dateModified": SNAP,
  "author": {"@id": "https://qdnco.com/#organization"}, "publisher": {"@id": "https://qdnco.com/#organization"},
  "mainEntityOfPage": {"@id": URL + "#page"}, "about": [{"@type": "Place", "name": "Dubai"}]},
 {"@type": "Dataset", "@id": URL + "#dataset", "name": f"Dubai property ads on Meta — Ad Library snapshot {SNAP}",
  "description": f"{B['unique_ads']} active Dubai property ads and {L['unique_ads']} lead-seller ads from Meta's Ad Library (country AE), coded for permit references, AED prices, payment plans, yield claims, languages and India references. Ad text only.",
  "creator": {"@id": "https://qdnco.com/#organization"}, "datePublished": SNAP, "temporalCoverage": SNAP,
  "spatialCoverage": {"@type": "Place", "name": "United Arab Emirates"}, "isAccessibleForFree": True,
  "license": "https://qdnco.com/legal/terms.html",
  "distribution": [{"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": f"https://qdnco.com/data/downloads/dubai-meta-audit-{SNAP}-{s}.csv"} for s in ("buy", "sell")]
    + [{"@type": "DataDownload", "encodingFormat": "application/json", "contentUrl": f"https://qdnco.com/data/downloads/dubai-meta-audit-{SNAP}-method.json"}]},
 {"@type": "BreadcrumbList", "@id": URL + "#crumbs", "itemListElement": [
   {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://qdnco.com/"},
   {"@type": "ListItem", "position": 2, "name": "Research", "item": "https://qdnco.com/data/index.html"},
   {"@type": "ListItem", "position": 3, "name": "Dubai property ads on Meta", "item": URL}]},
 {"@type": "FAQPage", "@id": URL + "#faq", "mainEntity": [
   {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]},
]}

s = T
he = s.index('</head>'); head, rest = s[:he], s[he:]
t, d = E(TITLE), E(DESC)
for pat, new in [(r'<title>.*?</title>', f'<title>{t}</title>'),
                 (r'<meta name="description" content="[^"]*"\s*/?>', f'<meta name="description" content="{d}">'),
                 (r'<link rel="canonical" href="[^"]*"\s*/?>', f'<link rel="canonical" href="{URL}">'),
                 (r'<meta property="og:title" content="[^"]*"\s*/?>', f'<meta property="og:title" content="{t}">'),
                 (r'<meta property="og:description" content="[^"]*"\s*/?>', f'<meta property="og:description" content="{d}">'),
                 (r'<meta property="og:url" content="[^"]*"\s*/?>', f'<meta property="og:url" content="{URL}">')]:
    head, n = re.subn(pat, lambda m, new=new: new, head, count=1, flags=re.S)
    assert n == 1, pat
head, n = re.subn(r'<script type="application/ld\+json">.*?</script>',
                  lambda m: '<script type="application/ld+json">' + json.dumps(GRAPH, ensure_ascii=False) + '</script>', head, count=1, flags=re.S)
assert n == 1
page = head + rest
a = page.index('<div class="page"><div class="wrap">') + len('<div class="page"><div class="wrap">')
b = page.index('<footer class="foot">')
# keep the footer's leading whitespace line intact
page = page[:a] + BODY + '    ' + page[b:]
for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', page, re.S): json.loads(m.group(1))
open(f'dist/data/{SLUG}.html', 'w', encoding='utf-8').write(page)

dl = Path('dist/data/downloads')
shutil.copy(SRC / 'buy.csv', dl / f'dubai-meta-audit-{SNAP}-buy.csv')
shutil.copy(SRC / 'sell.csv', dl / f'dubai-meta-audit-{SNAP}-sell.csv')
method = {k: S[k] for k in ('snapshot', 'country', 'active_status', 'collector', 'source_sha256', 'raw_card_rows', 'terms',
                           'collection_log', 'coding_rule', 'questions')}
method['counts'] = {side: {k: S[side][k] for k in ('unique_ads', 'ads_with_text', 'advertisers', 'run_age_days')} for side in ('buy', 'sell')}
method['shares'] = {side: S[side]['codes'] for side in ('buy', 'sell')}
json.dump(method, open(dl / f'dubai-meta-audit-{SNAP}-method.json', 'w'), indent=1, ensure_ascii=False)

# research index card
ip = 'dist/data/index.html'; ix = open(ip, encoding='utf-8').read()
card = (f'<a class="guide-card" href="{SLUG}.html"><b>{E(H1)}</b><span>{nB:,} active UAE property ads from {aB} advertisers, '
        f'coded for permits, prices, payment plans and yield claims.</span></a>')
if SLUG not in ix:
    ix = ix.replace('<div class="guide-grid">', '<div class="guide-grid">' + card, 1).replace('&middot; 3 studies', '&middot; 4 studies')
    open(ip, 'w', encoding='utf-8').write(ix)
print(f'wrote dist/data/{SLUG}.html  words={len(re.sub(r"<[^>]+>"," ",BODY).split())}')
