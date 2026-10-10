"""India → Dubai corridor cluster (QDnCo). Every number is read from the survey outputs.

  /data/india-dubai-buyer-acquisition-report.html          the report (+ downloads)
  /dubai/indian-real-estate-performance-marketing-agency/  flagship
  /dubai/property-lead-generation-from-india/              funnel, ad → Dubai visit
  /dubai/nri-hni-real-estate-marketing/                    segments
  /dubai/off-plan-marketing-indian-buyers/                 off-plan, India-specific
  /dubai/meta-google-ads-dubai-property-india/             channels

No Dubai results, office or licence claimed. Idempotent. Run from Portfolio Website/.
"""
import json, os, re, html, shutil
from pathlib import Path

E = html.escape
UPDATED = '2026-09-29'
MI = Path('../QDnCo Marketing/Market Intelligence/_scrape')
C = json.load(open(MI / 'india-dubai-2026-09-29' / 'corridor-summary.json', encoding='utf-8'))
S = json.load(open(MI / 'india-dubai-2026-09-29' / 'search-summary.json', encoding='utf-8'))
A = json.load(open(MI / 'dubai-2026-09-26' / 'summary.json', encoding='utf-8'))['buy']
COMMS = json.load(open(MI / 'india-dubai-2026-09-29' / 'communities.json', encoding='utf-8'))['counts']
FX = 26.17

def pc(d, k):
    v = d['codes'][k]['ads_share'] * 100
    return '0%' if v == 0 else (f'{v:.1f}%' if v < 10 else f'{round(v)}%')
def n(d, k): return d['codes'][k]['ads']
NC, NA = C['relevant_ads'], C['advertisers']
NU = A['relevant_ads']
TH = S['themes']
ST = S['trends_state_interest'].get('property in dubai', [])
GV = S['trends_state_interest'].get('dubai golden visa', [])
CITY = C['city_mentions_ads']
REPORT = '/data/india-dubai-buyer-acquisition-report.html'
AUD = '/data/meta-ad-library-audit-dubai-real-estate.html'
FLAG = '/dubai/indian-real-estate-performance-marketing-agency/'
LG, NRI, OFF, ADS = '/dubai/property-lead-generation-from-india/', '/dubai/nri-hni-real-estate-marketing/', '/dubai/off-plan-marketing-indian-buyers/', '/dubai/meta-google-ads-dubai-property-india/'
SRC = {
 'ben': ('https://www.benhams.ae/news/property-advice/whos-buying-in-dubai-2025-recap/', 'Benhams — Who is buying in Dubai, 2025 recap'),
 'rbi': ('https://www.rbi.org.in/Scripts/FAQView.aspx?Id=115', 'Reserve Bank of India — Liberalised Remittance Scheme FAQs'),
 'dld': ('https://dubailand.gov.ae/en/eservices/real-estate-ad-permit/', 'Dubai Land Department — Real Estate Ad Permit'),
 'mad': ('https://dubailand.gov.ae/en/news-media/dubai-land-department-strengthens-transparency-with-ai-enabled-real-estate-advertising-governance', 'DLD — advertising governance, 24 April 2025'),
 'moet': ('https://www.moet.gov.ae/en/-/what-are-the-conditions-for-granting-a-golden-visa-to-an-investor-in-real-estate-', 'UAE Ministry of Economy — Golden Visa for real estate investors'),
 'oai': ('https://platform.openai.com/docs/bots', 'OpenAI — crawlers'),
}
def src(k): u, t = SRC[k]; return f'<a href="{u}" rel="noopener">{E(t)}</a>'
def faq_html(faq, h='Questions'): return f'<h2 id="faq">{h}</h2>\n' + ''.join(f'<h3>{E(q)}</h3><p>{E(a)}</p>\n' for q, a in faq)
def related(items): return '<div class="related"><h2>The India → Dubai cluster</h2><ul>' + ''.join(f'<li><a href="{h}">{E(t)}<small>{E(d)}</small></a></li>' for h, t, d in items) + '</ul></div>\n'
def cta(h): return f'<div class="cta-band"><h2>{E(h)}</h2><p>A Phase 0 call is a questionnaire, not a pitch. Email qdnco01@gmail.com or WhatsApp +91 88611 79992.</p><a href="/dubai/#contact">Book a Phase 0 call &nearr;</a></div>\n'
CLUSTER = [
 (FLAG, 'Indian performance marketing for Dubai real estate', 'Who we are for, what we run, and the evidence.'),
 (REPORT, 'India → Dubai Buyer Acquisition Report 2026', f'{NC} Dubai property ads shown in India, and what Indians search.'),
 (LG, 'Dubai property lead generation from India', 'The funnel from ad to Dubai visit.'),
 (NRI, 'NRI and HNI marketing for Dubai real estate', 'Five Indian buyer segments, five playbooks.'),
 (OFF, 'Dubai off-plan marketing to Indian buyers', 'Rupee framing, escrow, instalments within LRS.'),
 (ADS, 'Meta and Google Ads for Dubai property, targeting India', 'Campaign structure, keywords and creative.'),
 ('/dubai/trakheesi-permit-guide/', 'Trakheesi permits for marketers', 'What every Dubai property ad needs.'),
 (AUD, 'Dubai property ads on Meta: 2026 audit', f'{NU:,} ads shown inside the UAE.'),
]
def rel_except(url): return related([c for c in CLUSTER if c[0] != url][:6])
NOT_DONE = ('Our delivered real-estate acquisition work is in India; our Dubai practice is built specifically for the India→Dubai buyer '
            'corridor and is grounded in original Dubai market research. We have not yet run a Dubai campaign, and we will publish '
            'our first India→Dubai results, labelled, when we have them.')
state_rows = ''.join(f'<tr><td>{E(s)}</td><td>{v}</td><td>{dict(GV).get(s, "—")}</td></tr>' for s, v in ST[:10])
city_rows = ''.join(f'<tr><td>{E(c)}</td><td>{v}</td></tr>' for c, v in sorted(CITY.items(), key=lambda x: -x[1]) if v)
comm_rows = ''.join(f'<tr><td>{E(c)}</td><td>{v["india_ads"]}</td><td>{v["suggestions"]}</td></tr>' for c, v in COMMS.items() if v['india_ads'] or v['suggestions'])
theme_rows = ''.join(f'<tr><td>{E(k)}</td><td>{v["count"]}</td><td>{E("; ".join(v["examples"][:4]))}</td></tr>' for k, v in sorted(TH.items(), key=lambda x: -x[1]['count']))
cmp_rows = ''.join(f'<tr><td>{E(lbl)}</td><td>{pc(C, k)}</td><td>{pc(A, ka) if ka else "—"}</td></tr>' for lbl, k, ka in [
 ('A payment plan', 'payment_plan', 'payment_plan'), ('A price in rupees', 'price_inr', None), ('A price in AED', 'price_aed', 'price_aed'),
 ('An expo, roadshow or event', 'expo_event', None), ('Golden Visa', 'golden_visa', 'golden_visa'), ('A handover or completion date', 'handover_date', 'handover_date'),
 ('"Tax-free" framing', 'tax_free', None), ('A percentage yield or ROI', 'yield_or_roi', 'yield_or_roi_figure'), ('"Guaranteed" or "assured" returns', 'guaranteed', 'guaranteed_return'),
 ('A permit, Trakheesi or Madmoun reference', 'permit_dld', 'permit_in_text'), ('WhatsApp', 'whatsapp', 'whatsapp'), ('India or Indians named', 'indian_buyer', 'india_reference'),
 ('NRIs named', 'nri_mention', None), ('Loans, remittance or tax', 'tax_remit_loan', None), ('Hindi (Devanagari) script', 'hindi_script', 'devanagari_script')])
top_adv = ', '.join(f'{E(a)} ({c})' for a, c in C['top_advertisers'][:8] if a)

# ─────────────────────────── REPORT ───────────────────────────
RFAQ = [
 ("How many Dubai property ads are shown to people in India?",
  f"Our 29 September 2026 snapshot of Meta's Ad Library with the country set to India found {NC} active Dubai property ads from {NA} advertisers across {len(C['terms'])} search terms. Meta's own result counts for broader terms ran to tens of thousands, so this is a keyword-selected sample, not a census."),
 ("How do Dubai property ads aimed at India differ from ads shown in the UAE?",
  f"They lean far harder on the payment plan ({pc(C,'payment_plan')} against {pc(A,'payment_plan')} of UAE ads), price in rupees ({pc(C,'price_inr')}) more often than in AED ({pc(C,'price_aed')}), and a quarter promote an expo or event in an Indian city. Very few name NRIs ({pc(C,'nri_mention')}) and none of the snapshot used Hindi script."),
 ("Which Indian states search most for Dubai property?",
  f"In Google Trends over the past 12 months, relative interest in 'property in Dubai' was highest in {', '.join(s for s, _ in ST[:5])}. Trends shows relative interest, not search volumes."),
 ("What do Indians search about Dubai property?",
  f"Across {S['unique_suggestions']:,} unique Google suggestions collected from India, the largest themes were price and budget (often in rupees), rules and tax for Indians, specific Dubai areas, renting out and yield, and residency or Golden Visa."),
 ("Does QDnCo publish Dubai cost-per-lead benchmarks?",
  "Not yet. We will publish India→Dubai campaign benchmarks only when we have first-party campaign data, labelled as observed, with the date window and sample."),
]
RBODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Research</a><span>/</span>India → Dubai buyer report</nav><p class="eyebrow">Primary research &middot; India → Dubai</p><h1>The India → Dubai Real Estate Buyer Acquisition Report 2026</h1><p class="updated">Published {UPDATED} &middot; snapshots 26–29 September 2026</p>
<p class="lede">Indian nationals were the largest foreign buyer group in Dubai property in 2025. This report looks at the other side of that demand: what Dubai developers and brokers actually show people in India, what Indians search before they enquire, and where the interest is concentrated. It combines {NC} Dubai property ads shown in India, {NU:,} ads shown inside the UAE, {S["unique_suggestions"]:,} Google search suggestions and Google Trends. Every record is downloadable.</p>
<div class="keyfacts"><div class="keyfact"><b>{NC}</b><span>Dubai property ads shown in India, {NA} advertisers</span></div><div class="keyfact"><b>{pc(C,"payment_plan")}</b><span>lead with a payment plan (UAE ads: {pc(A,"payment_plan")})</span></div><div class="keyfact"><b>{pc(C,"price_inr")}</b><span>price in rupees; {pc(C,"price_aed")} in AED</span></div><div class="keyfact"><b>{pc(C,"nri_mention")}</b><span>name NRIs at all</span></div></div>
<div class="srcnote">
<p><b>Collected</b> Meta Ad Library, active ads, country India, 29 September 2026 ({len(C["terms"])} searches, {C["raw_card_rows"]:,} card rows, {C["unique_ads"]} unique ads); Meta Ad Library, country UAE, 26 September 2026 ({NU:,} property ads); Google autocomplete, hl=en, gl=in, {S["queries_run"]} queries; Google Trends, India, past 12 months.</p>
<p style="margin-top:.5rem"><b>Method</b> Ads deduplicated by Library ID. A Dubai property ad must name a property type, a buying or investing signal and Dubai/UAE or a Dubai developer; service businesses are excluded. Eighteen coding questions were written as regular expressions before counting and applied to the ad text; after a spot-check four rules were tightened, and the method file records each revision. Search suggestions were grouped by declared theme rules.</p>
<p style="margin-top:.5rem"><b>Limits</b> Keyword-selected samples, not censuses. Text inside images and video (where permits, prices and QR codes often sit) is not read, so shares are floors. Suggestions show what people type, not how often. Trends is a relative index, and one Trends query was rate-limited and is missing. Advertiser names are display names. No spend, lead or sales data is included.</p>
</div>

<h2 id="s1">1. Where Indian demand for Dubai property comes from</h2>
<p>Indian nationals made up about 22% of foreign Dubai property purchases in 2025, according to brokerage analysis of DLD data ({src("ben")}). Google Trends shows where in India the interest concentrates.</p>
<div class="tablewrap"><table><thead><tr><th>State (Google Trends, India, 12 months)</th><th>"property in Dubai"</th><th>"Dubai golden visa"</th></tr></thead><tbody>{state_rows}</tbody></table></div>
<p>Relative index, 100 = highest. Delhi and Haryana (Gurugram) lead both queries. Cities do not appear often enough in search suggestions to rank them, so the city view below comes from the ads themselves.</p>
<div class="tablewrap"><table><thead><tr><th>Indian city named in Dubai property ads shown in India</th><th>Ads</th></tr></thead><tbody>{city_rows}</tbody></table></div>
<p>Most city mentions are property shows and roadshows. Advertisers take Dubai inventory to Delhi NCR, Ahmedabad, Hyderabad, Mumbai, Lucknow, Bengaluru, Pune and Surat, which says as much about where they find buyers as about where buyers search.</p>

<h2 id="s2">2. What Indians search about Dubai property</h2>
<p>We collected {S["unique_suggestions"]:,} unique Google suggestions from {S["queries_run"]} queries run with Indian settings, then grouped them by declared theme rules. A suggestion can belong to more than one theme.</p>
<div class="tablewrap"><table><thead><tr><th>Theme</th><th>Suggestions</th><th>Examples</th></tr></thead><tbody>{theme_rows}</tbody></table></div>
<p>Two things stand out. Budget questions are asked in rupees ("property in dubai under 1 crore in rupees", "dubai flat price in indian rupees"), and many questions are about permission and rules ("can indian buy property in dubai on loan", "buying property in dubai from india tax"). Rising searches over the year included "dubai property prices drop" (breakout) and "dubai property news".</p>

<h3 id="communities">Which Dubai communities come up</h3>
<div class="tablewrap"><table><thead><tr><th>Community</th><th>Named in Dubai ads shown in India</th><th>In Indian search suggestions</th></tr></thead><tbody>{comm_rows}</tbody></table></div>
<p>Advertisers aiming at India name Downtown Dubai most often; Indian searchers most often type Dubai Hills, Dubai Marina and JVC. Where the inventory fits, those searched communities are an under-used angle for India-facing creative.</p>

<h2 id="s3">3. What Dubai property advertisers say to India, and to the UAE</h2>
<div class="tablewrap"><table><thead><tr><th>The ad text contains…</th><th>Ads shown in India (n={NC})</th><th>Ads shown in the UAE (n={NU:,})</th></tr></thead><tbody>{cmp_rows}</tbody></table></div>
<p>The most frequent advertisers in the India snapshot: {top_adv}. Median ad age was {C["run_age_days"]["median"]} days.</p>

<h2 id="s4">4. The offers being used</h2>
<ul>
<li><strong>The payment plan is the offer.</strong> {pc(C,"payment_plan")} of India-facing ads lead with one: small booking amounts, monthly instalments and post-handover splits.</li>
<li><strong>Rupee pricing.</strong> {pc(C,"price_inr")} quote a rupee price or a monthly amount in rupees, against {pc(C,"price_aed")} in AED.</li>
<li><strong>Events.</strong> {pc(C,"expo_event")} promote a property show, roadshow or seminar, usually in a named Indian city.</li>
<li><strong>Residency.</strong> {pc(C,"golden_visa")} mention the Golden Visa; the real estate route requires property worth at least AED 2 million, about ₹{2e6*FX/1e7:.1f} crore at ₹{FX} ({src("moet")}).</li>
<li><strong>Tax framing.</strong> {pc(C,"tax_free")} use "tax-free" language, while {pc(C,"tax_remit_loan")} say anything about loans, remittance or Indian tax, the questions Indians actually search.</li>
</ul>

<h2 id="s5">5. What Indian buyers ask before they enquire</h2>
<div class="tablewrap"><table><thead><tr><th>Question</th><th>How it shows up in search</th><th>Where to answer it</th></tr></thead><tbody>
<tr><td>Can I own it?</td><td>"can indian buy property in dubai", "can nri buy property in dubai"</td><td>Landing page FAQ; link to developer or DLD explanation</td></tr>
<tr><td>How do I pay?</td><td>"on installments", "with zero down payment", "on loan"</td><td>Ad and first message: payment plan in AED with rupee equivalent and date of rate</td></tr>
<tr><td>How does money leave India?</td><td>"buying property in dubai from india tax"</td><td>FAQ pointing to the RBI's remittance scheme ({src("rbi")}) and a tax adviser</td></tr>
<tr><td>What does it cost in rupees?</td><td>"under 1 crore in rupees", "price in indian rupees"</td><td>Price shown in both currencies</td></tr>
<tr><td>Will it earn?</td><td>"buy property in dubai and rent it", "dubai apartment average rent"</td><td>Sourced rent data only; no guaranteed yields</td></tr>
<tr><td>Is it safe?</td><td>"dubai property scams", "is dubai property a good investment"</td><td>Permit number and QR, escrow registration, named licensed broker</td></tr>
<tr><td>Can I get residency?</td><td>"buy property in dubai for golden visa"</td><td>State the AED 2 million threshold plainly</td></tr>
</tbody></table></div>
<p>Only {pc(C,"nri_mention")} of India-facing ads name NRIs and only {pc(C,"tax_remit_loan")} address loans, remittance or tax. The questions Indians ask are mostly answered after the enquiry, if at all.</p>

<h2 id="s6">6. The acquisition funnel, India → Dubai</h2>
<ol>
<li><strong>Ad</strong> shown in India, carrying the DLD permit number and QR code ({src("mad")}).</li>
<li><strong>Landing page</strong> answering the seven questions above, with prices in AED and rupees.</li>
<li><strong>Qualification</strong>: budget and currency, funding route (savings, loan, remittance), timeline, residency status, visit plan.</li>
<li><strong>WhatsApp</strong> reply within minutes, in Indian Standard Time.</li>
<li><strong>Sales conversation</strong> with the licensed Dubai broker or developer.</li>
<li><strong>Visit</strong>: a Dubai trip, a virtual viewing, or a property show in an Indian city.</li>
<li><strong>Booking</strong>, with instalments planned against the remittance limit.</li>
</ol>
<p>Our operating detail for each stage is in <a href="{LG}">Dubai property lead generation from India</a>.</p>

<h2 id="s7">7. Benchmarks: what we will and will not publish</h2>
<p>We do not publish India→Dubai cost-per-lead figures yet. Figures in circulation rarely say whether they mean a form fill or a qualified buyer, or which city and ticket size. We will publish our own benchmarks once we have first-party campaign data, labelled as observed with the date window and sample, under our <a href="../about/editorial-policy.html">editorial policy</a>. The metrics we will report: cost per lead, qualification rate, cost per qualified lead, contact rate in IST, viewings (virtual or in Dubai) and bookings, each by Indian city.</p>

<h2 id="downloads">Downloads</h2>
<ul><li><a href="/data/downloads/india-dubai-2026-09-29-ads.csv" download>Dubai property ads shown in India: every ad with codes (CSV)</a></li>
<li><a href="/data/downloads/india-dubai-2026-09-29-search.json" download>Search suggestions, themes and Trends data (JSON)</a></li>
<li><a href="/data/downloads/india-dubai-2026-09-29-method.json" download>Search terms, rules, revisions, collection log and checksums (JSON)</a></li>
<li><a href="{AUD}">UAE-side audit and its downloads</a></li></ul>
<p>The CSV has the Library link, advertiser, start date and coded flags per ad; ad copy and images are not redistributed.</p>
{faq_html(RFAQ, "Questions about this report")}
{rel_except(REPORT)}
<div class="srcnote" style="margin-top:1rem"><p><b>Citing this</b> QDnCo, The India → Dubai Real Estate Buyer Acquisition Report 2026, snapshots 26–29 September 2026. State the sample with any figure and link to https://qdnco.com{REPORT}.</p></div>
{cta("Selling Dubai property to Indian buyers?")}'''

# ─────────────────────────── FLAGSHIP ───────────────────────────
WHY = [
 ('Indian real-estate acquisition experience', 'Fourteen residential campaigns across ten developer brands, each with an evidence ledger.', '/work/index.html', 'Case studies'),
 ('Indian buyer understanding', 'Campaigns built around how Indian buyers decide: price bands, payment plans, family decision-making and trust signals.', '/guides/real-estate-leads-for-channel-partners.html', 'Our India buyer guides'),
 ('India-city segmentation', f'Targeting planned from where interest actually concentrates: Trends puts {", ".join(s for s, _ in ST[:4])} at the top.', REPORT + '#s1', 'The state and city data'),
 ('Dubai-specific research', f'Our own audits of {NU:,} Dubai property ads in the UAE and {NC} shown in India.', REPORT, 'The report'),
 ('DLD-aware campaign construction', 'The permit number and Madmoun QR are designed into every creative from the brief.', '/dubai/trakheesi-permit-guide/', 'Trakheesi guide'),
 ('Qualified-lead economics', 'Priced and optimised against a written five-point qualified-lead definition, not form fills.', '/dubai/#pricing', 'AED pricing'),
 ('CRM and WhatsApp', 'Leads routed into your CRM and answered on WhatsApp within minutes, in IST and GST.', LG, 'The funnel'),
]
FFAQ = [
 ("Can an Indian agency run ads for Dubai property?",
  "Yes, when the ads run under the licensed Dubai broker's or developer's DLD advertising permit, with the permit number and Madmoun QR code on the ad. QDnCo builds and runs the campaigns from the client's own ad accounts; the permit belongs to the client."),
 ("How does QDnCo target Indian buyers for Dubai property?",
  "As a separate campaign pool from UAE residents: Indian states and cities where interest concentrates, creative that answers ownership, payment and remittance questions, prices in AED and rupees, and follow-up timed to Indian Standard Time."),
 ("Have you run Dubai campaigns?", NOT_DONE),
 ("Who is this for?",
  "Dubai developers and brokerages selling to Indian buyers, Indian brokers and channel partners holding Dubai mandates, and Indian developers launching in Dubai."),
 ("How much does it cost?",
  "For Dubai clients, published in AED: AED 200 per qualified lead with a 100-lead monthly minimum, or a flat AED 20,000 monthly retainer, minimum three months. Media is paid by the client directly to Meta and Google."),
 ("Do you sell property or take a commission?",
  "No. We run marketing and lead generation; the licensed broker or developer handles viewings, negotiation and sales."),
]
FBODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../">Dubai</a><span>/</span>Indian performance marketing for Dubai real estate</nav>
<p class="eyebrow">India → Dubai · Real estate performance marketing</p>
<h1>Indian performance marketing agency for Dubai real estate</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>QDnCo is a Bengaluru-based performance marketing agency for real estate developers, brokerages and channel partners targeting Indian buyers for Dubai property. We run Google and Meta acquisition, India-city targeting, NRI and HNI funnels, landing pages, CRM qualification and WhatsApp follow-up. Our Dubai offering is built from our experience marketing high-ticket residential property to Indian buyers, combined with original research into Dubai's advertising market and DLD requirements.</p></div>
<div class="keyfacts"><div class="keyfact"><b>22%</b><span>of foreign Dubai purchases by Indians, 2025 (brokerage analysis of DLD data)</span></div><div class="keyfact"><b>{NC}</b><span>Dubai property ads shown in India, analysed</span></div><div class="keyfact"><b>{pc(C,"nri_mention")}</b><span>of them name NRIs</span></div></div>

<p><strong>QDnCo: India-to-Dubai real estate performance marketing, backed by original buyer and advertising research.</strong></p>

<h2 id="who">Who it is for</h2>
<ul>
<li><strong>Dubai developers and brokerages</strong> selling off-plan or ready inventory to buyers in India.</li>
<li><strong>Indian brokers and channel partners</strong> holding Dubai mandates and needing India-side demand.</li>
<li><strong>Indian developers launching in Dubai</strong> who want their Indian buyer base reached properly.</li>
</ul>

<h2 id="why">Why developers and brokerages use QD for India-side acquisition</h2>
<ol>
{"".join(f'<li><strong>{E(t)}.</strong> {E(d)} <a href="{u}">{E(l)} &rarr;</a></li>' for t, d, u, l in WHY)}
</ol>

<h2 id="what">What we run</h2>
<div class="tablewrap"><table><thead><tr><th>Layer</th><th>What it does for an India → Dubai campaign</th></tr></thead><tbody>
<tr><td>Meta (Facebook, Instagram)</td><td>India-state and city pools, lead forms that ask budget, currency, funding route and timeline, creative in AED and rupees</td></tr>
<tr><td>Google Search and Performance Max</td><td>Captures "buy property in dubai from india", project and community searches; negatives for jobs, visas and travel</td></tr>
<tr><td>YouTube</td><td>Walkthrough and community video that does the job of a first viewing</td></tr>
<tr><td>Landing pages</td><td>Answer the seven questions Indians ask before enquiring, with the permit number and QR code</td></tr>
<tr><td>Qualification and CRM</td><td>A written qualified-lead definition, routing to the right broker, stages to viewing and booking</td></tr>
<tr><td>WhatsApp</td><td>Reply within minutes, in Indian Standard Time</td></tr>
<tr><td>Compliance</td><td>DLD permit and Madmoun QR on every ad, under the client's licence</td></tr>
</tbody></table></div>

<h2 id="funnel">The India → Dubai funnel</h2>
<p>India → ad → landing page → qualification → WhatsApp → sales → Dubai visit or virtual viewing → booking. <a href="{LG}">How we run each stage</a>.</p>

<h2 id="cities">Where the interest is</h2>
<div class="tablewrap"><table><thead><tr><th>State (Google Trends, 12 months)</th><th>"property in Dubai"</th><th>"Dubai golden visa"</th></tr></thead><tbody>{state_rows}</tbody></table></div>
<p>Communities: Indian searchers most often type Dubai Hills, Dubai Marina and JVC; India-facing ads most often name Downtown Dubai. <a href="{REPORT}#communities">Community data</a>.</p>
<p>City mentions in Dubai property ads shown in India: {", ".join(f"{E(c)} {v}" for c, v in sorted(CITY.items(), key=lambda x: -x[1]) if v >= 10)}. Full data in the <a href="{REPORT}#s1">report</a>.</p>

<h2 id="evidence">The evidence behind it</h2>
<p>{E(NOT_DONE)}</p>
<ul>
<li><a href="{REPORT}">India → Dubai Buyer Acquisition Report 2026 &rarr;</a></li>
<li><a href="{AUD}">Dubai Ad Library research &rarr;</a></li>
<li><a href="/work/index.html">India real estate case studies &rarr;</a></li>
<li><a href="/dubai/trakheesi-permit-guide/">DLD advertising guide &rarr;</a></li>
<li><a href="/about/editorial-policy.html">How we label every number &rarr;</a></li>
<li><a href="/about/">About QDnCo and the team &rarr;</a></li>
<li><a href="/dubai/#pricing">AED pricing &rarr;</a></li>
</ul>

<h2 id="pricing">Pricing</h2>
<p>Dubai clients: AED 200 per qualified lead (100-lead monthly minimum) or a flat AED 20,000 monthly retainer, minimum three months, published on <a href="/dubai/#pricing">QDnCo Dubai</a>. Indian brokers and developers are quoted in rupees on the <a href="/pricing/index.html">India pricing page</a>. Media is always paid by you, directly to Meta and Google.</p>
{faq_html(FFAQ, "Questions Dubai developers and brokers ask")}
{rel_except(FLAG)}{cta("Want Indian buyers for your Dubai inventory?")}'''

# ─────────────────────────── LEAD GEN FROM INDIA ───────────────────────────
LFAQ = [
 ("What should a lead form ask an Indian buyer of Dubai property?",
  "Budget and the currency they think in, how they will fund it (savings, loan, remittance), purchase timeline, whether they live in India or abroad, and whether they plan a Dubai visit or prefer a virtual viewing."),
 ("When should Indian leads be called?",
  "Within minutes, in Indian Standard Time, which is 90 minutes ahead of Dubai. An evening enquiry in India arrives in the Dubai late afternoon; do not leave it for the next Dubai morning."),
 ("Should Indian and UAE-resident buyers be in the same campaign?",
  "No. Their questions, currency, funding and time zones differ. Separate pools make both cheaper to qualify and possible to measure."),
 ("Do property shows in Indian cities work?",
  f"They are common: {pc(C,'expo_event')} of the Dubai property ads we found in India promoted a show, roadshow or seminar. Run them as a campaign with registration, reminders and post-event follow-up, under the relevant DLD permit category."),
]
LBODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../">Dubai</a><span>/</span>Lead generation from India</nav>
<p class="eyebrow">India → Dubai · Lead generation</p>
<h1>Dubai property lead generation from India: from ad to Dubai visit</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>Generating Dubai property leads from India means running India as its own funnel: ads targeted by Indian state and city, a landing page that answers ownership, payment, remittance and safety questions, qualification on budget, funding route and residency, a WhatsApp reply within minutes in IST, and a visit step that can be a Dubai trip, a virtual viewing or a property show in an Indian city.</p></div>

<h2 id="stages">The seven stages, and what to measure</h2>
<div class="tablewrap"><table><thead><tr><th>Stage</th><th>What good looks like</th><th>Measure</th></tr></thead><tbody>
<tr><td>1. Ad, shown in India</td><td>One offer per ad; price in AED and rupees; permit number and QR</td><td>Cost per lead, by state and city</td></tr>
<tr><td>2. Landing page</td><td>Answers the seven questions Indians search before enquiring</td><td>Conversion rate; form completion</td></tr>
<tr><td>3. Qualification</td><td>Budget and currency, funding route, timeline, residency, visit plan</td><td>Qualification rate; rejection reasons</td></tr>
<tr><td>4. WhatsApp reply</td><td>Within minutes, in IST</td><td>Time to first reply; contact rate</td></tr>
<tr><td>5. Sales conversation</td><td>The licensed broker or developer, named</td><td>Conversations held</td></tr>
<tr><td>6. Visit</td><td>Dubai trip, virtual viewing or city property show</td><td>Viewings booked and attended</td></tr>
<tr><td>7. Booking</td><td>Instalments planned against the remittance limit</td><td>Reservations; cost per booking</td></tr>
</tbody></table></div>

<h2 id="channels">Channels by stage</h2>
<ul>
<li><strong>Meta:</strong> reach before search. State and city pools where interest concentrates; lead forms with the qualification questions. See <a href="{ADS}">Meta and Google Ads for Dubai property in India</a>.</li>
<li><strong>Google Search:</strong> intent already stated, as in "buy property in dubai from india", "dubai flat price in indian rupees" or a named project.</li>
<li><strong>YouTube:</strong> walkthroughs and community tours that stand in for a first viewing.</li>
<li><strong>Property shows:</strong> {pc(C,"expo_event")} of India-facing Dubai property ads promoted one. They need their own registration and follow-up flow.</li>
<li><strong>WhatsApp:</strong> the first reply and the nurture channel.</li>
</ul>

<h2 id="where">Where to target</h2>
<p>Google Trends puts {", ".join(f"{s} ({v})" for s, v in ST[:6])} at the top for "property in Dubai" (relative index). Advertisers most often name Delhi NCR, Ahmedabad, Hyderabad, Mumbai, Lucknow and Bengaluru. Start there, then move budget by cost per qualified lead, city by city.</p>

<h2 id="qualify">Qualification fields for Indian buyers</h2>
<ol>
<li><strong>Budget, and the currency it is in.</strong> A buyer who says "1 crore" and one who says "AED 400,000" are in the same band; record both.</li>
<li><strong>Funding route.</strong> Savings, a loan, or money remitted from India under the RBI's Liberalised Remittance Scheme, which allows a resident individual up to USD 250,000 per financial year ({src("rbi")}).</li>
<li><strong>Timeline.</strong> Now, within six months, or researching.</li>
<li><strong>Residency.</strong> Resident in India, NRI in the Gulf, or NRI elsewhere; each needs a different conversation.</li>
<li><strong>Visit plan.</strong> Dubai trip, virtual viewing or property show.</li>
</ol>

<h2 id="crm">CRM stages</h2>
<p>Enquiry → contacted → qualified → viewing booked → viewing attended → reservation. Record the Indian city and the rejection reason for every lead; that is what makes city-level budget decisions possible. {E(NOT_DONE)}</p>
{faq_html(LFAQ)}
{rel_except(LG)}{cta("Want India-side demand for your Dubai project?")}'''

# ─────────────────────────── NRI / HNI ───────────────────────────
SEG = [
 ('Resident Indian HNIs and business owners', 'Diversification, rental income, a family asset abroad', 'Remittance under LRS, rupee pricing, tax questions, developer credibility', 'Google Search, LinkedIn, YouTube, property shows', 'Price in both currencies; escrow and permit as proof; point tax questions to an adviser'),
 ('NRIs in the Gulf', 'A home near where they already live and work', 'Local mortgage eligibility, community, schools, handover', 'Meta and Google in the UAE, WhatsApp', 'Treat as UAE residents, not as overseas investors'),
 ('NRIs in the UK, US and Singapore', 'An investment in a familiar hub; family links to India and the Gulf', 'Returns, currency, management while abroad', 'Google, YouTube, LinkedIn', 'Sourced rent data, property management, virtual viewings'),
 ('Golden Visa seekers', 'Residency for the family', 'Threshold, eligibility, off-plan eligibility', 'Google Search, Meta', f'State the AED 2 million threshold (≈ ₹{2e6*FX/1e7:.1f} crore at ₹{FX}); never imply every unit qualifies'),
 ('First-time Dubai buyers from Indian metros', 'Entry-level investment, often under ₹1 crore', 'Safety, payment plan, "is it worth it"', 'Meta, YouTube, property shows', 'Payment plan, escrow, named licensed broker, realistic rent'),
]
NFAQ = [
 ("Is an NRI in Dubai the same audience as an Indian investor in Mumbai?",
  "No. An Indian living in the UAE is a UAE-resident buyer with local financing and no remittance question. An investor in Mumbai is an overseas buyer who thinks in rupees and asks about remittance and tax. Run them as separate campaigns."),
 ("How do Dubai developers reach Indian HNIs?",
  "Through search intent (Google), professional and business context (LinkedIn), video (YouTube) and invitation-led property shows in the cities where interest concentrates, with prices in both currencies and proof of permit and escrow."),
 ("Can resident Indians send money abroad to buy Dubai property?",
  "The RBI's Liberalised Remittance Scheme allows a resident individual to remit up to USD 250,000 per financial year for permitted transactions. Buyers should confirm the current rules and tax with their bank and adviser."),
 ("Which languages should Dubai property ads to India use?",
  f"English carries most of it, but in our snapshot no India-facing ad used Hindi script and only {pc(C,'other_indic_script')} used another Indian script. Testing Hindi or regional-language creative for specific cities is an open opportunity; QDnCo works in English, Hindi, Telugu, Tamil, Marathi and Kannada."),
]
NBODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../">Dubai</a><span>/</span>NRI and HNI marketing</nav>
<p class="eyebrow">India → Dubai · Buyer segments</p>
<h1>NRI and HNI marketing for Dubai real estate</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>"Indian buyers" is five audiences, not one. Resident Indian HNIs, NRIs in the Gulf, NRIs in the UK, US and Singapore, Golden Visa seekers and first-time buyers from Indian metros want different things, ask different questions and are reached on different channels. Dubai property marketing to Indians works when each is a separate campaign with its own message and follow-up.</p></div>
<div class="keyfacts"><div class="keyfact"><b>5</b><span>Indian buyer segments</span></div><div class="keyfact"><b>{pc(C,"nri_mention")}</b><span>of India-facing Dubai ads name NRIs</span></div><div class="keyfact"><b>0</b><span>used Hindi script in our snapshot</span></div></div>

<h2 id="segments">The five segments</h2>
<div class="tablewrap"><table><thead><tr><th>Segment</th><th>What they want</th><th>What they ask</th><th>Channels</th><th>What to say</th></tr></thead><tbody>
{"".join(f"<tr><td>{E(a)}</td><td>{E(b)}</td><td>{E(c)}</td><td>{E(d)}</td><td>{E(e)}</td></tr>" for a, b, c, d, e in SEG)}
</tbody></table></div>

<h2 id="gap">The gap in the market</h2>
<p>Of {NC} Dubai property ads we found running in India, {pc(C,"nri_mention")} named NRIs, {pc(C,"tax_remit_loan")} said anything about loans, remittance or tax, and none used Hindi script, while Indian search suggestions are full of exactly those questions. See the <a href="{REPORT}#s5">report</a>.</p>

<h2 id="money">Money questions, answered carefully</h2>
<ul>
<li><strong>Remittance:</strong> resident Indians can remit up to USD 250,000 per financial year under the RBI's Liberalised Remittance Scheme ({src("rbi")}). Point buyers to their bank for current rules.</li>
<li><strong>Tax:</strong> never state a tax figure in an ad; refer to an adviser.</li>
<li><strong>Currency:</strong> show AED with the rupee equivalent and the date of the rate.</li>
<li><strong>Golden Visa:</strong> property worth at least AED 2 million ({src("moet")}).</li>
</ul>
<p>{E(NOT_DONE)}</p>
{faq_html(NFAQ)}
{rel_except(NRI)}{cta("Reaching Indian buyers for Dubai property?")}'''

# ─────────────────────────── OFF-PLAN FOR INDIAN BUYERS ───────────────────────────
OFAQ = [
 ("How should Dubai off-plan prices be shown to Indian buyers?",
  "In AED with the rupee equivalent and the date of the exchange rate. Search suggestions from India are full of rupee questions such as 'property in dubai under 1 crore in rupees'."),
 ("Is Dubai off-plan property safe for Indian buyers?",
  "Show the proof rather than asserting it: off-plan projects must be registered with the Dubai Land Department's escrow department, every ad needs a DLD permit and Madmoun QR code, and the buyer should deal with a named licensed broker or developer."),
 ("How do Indian buyers pay Dubai off-plan instalments?",
  "Resident Indians typically remit under the RBI's Liberalised Remittance Scheme, which caps remittances at USD 250,000 per financial year. A payment plan that spreads instalments across financial years can fit that limit; buyers should confirm with their bank."),
 ("Does off-plan property qualify for the Golden Visa?",
  "Eligible off-plan units from approved developers can count toward the AED 2 million threshold. State the threshold and conditions; do not imply every unit qualifies."),
]
OBODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../">Dubai</a><span>/</span>Off-plan for Indian buyers</nav>
<p class="eyebrow">India → Dubai · Off-plan</p>
<h1>Marketing Dubai off-plan property to Indian buyers</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>Indian buyers already know off-plan: they buy under-construction homes with construction-linked payment plans at home. What changes for Dubai is the currency, the rules and the trust question. Show prices in AED and rupees, lead with the payment plan, prove safety with the escrow registration, permit and QR code, and plan instalments around the RBI's USD 250,000 annual remittance limit.</p></div>
<div class="keyfacts"><div class="keyfact"><b>{pc(C,"payment_plan")}</b><span>of India-facing Dubai ads lead with a payment plan</span></div><div class="keyfact"><b>{TH["Is it safe or worth it"]["count"]}</b><span>"is it safe / worth it" search suggestions</span></div><div class="keyfact"><b>USD 250k</b><span>LRS limit per financial year</span></div></div>

<h2 id="differs">What is different when the buyer is in India</h2>
<div class="tablewrap"><table><thead><tr><th>Element</th><th>General Dubai off-plan campaign</th><th>For Indian buyers</th></tr></thead><tbody>
<tr><td>Price</td><td>AED</td><td>AED with rupee equivalent and date of rate</td></tr>
<tr><td>Payment plan</td><td>Split and handover date</td><td>Split, monthly amount in rupees, instalments timed across financial years</td></tr>
<tr><td>Trust</td><td>Developer brand</td><td>Escrow registration, DLD permit and QR, named licensed broker</td></tr>
<tr><td>Viewing</td><td>Site visit</td><td>Virtual viewing, Dubai trip or property show in an Indian city</td></tr>
<tr><td>Follow-up</td><td>GST hours</td><td>IST hours</td></tr>
<tr><td>Residency</td><td>Golden Visa if eligible</td><td>AED 2 million threshold stated with its rupee equivalent</td></tr>
</tbody></table></div>
<p>For the general launch sequence, see the <a href="/dubai/off-plan-launch-marketing/">three-window off-plan playbook</a>.</p>

<h2 id="safety">Answer the safety question in the ad</h2>
<p>{TH["Is it safe or worth it"]["count"]} of the Indian search suggestions we collected ask whether Dubai property is safe or worth it, including "dubai property scams". The strongest answers are verifiable: DLD requires off-plan projects to be registered with its Escrow Account Department ({src("dld")}), and every ad must carry its permit number and Madmoun QR code ({src("mad")}). Only {pc(C,"permit_dld")} of India-facing ads put a permit reference in their text.</p>

<h2 id="instalments">Instalments and the remittance limit</h2>
<p>Resident Indians can remit up to USD 250,000 per financial year under the RBI's Liberalised Remittance Scheme ({src("rbi")}). A payment plan whose instalments fall across two or three financial years can fit that limit without strain. Say so on the landing page, point buyers to their bank, and never state a tax position in an ad.</p>

<h2 id="shows">Property shows in Indian cities</h2>
<p>{pc(C,"expo_event")} of India-facing Dubai property ads promoted a property show, roadshow or seminar, most often in Delhi NCR, Ahmedabad, Hyderabad, Mumbai and Lucknow. Exhibitions and seminars are DLD permit categories of their own.</p>
<p>{E(NOT_DONE)}</p>
{faq_html(OFAQ)}
{rel_except(OFF)}{cta("Launching off-plan to Indian buyers?")}'''

# ─────────────────────────── META & GOOGLE ADS ───────────────────────────
AFAQ = [
 ("Can you target India with Meta ads for Dubai property?",
  "Yes. Build India as its own campaign pool, by state and city, with lead-form questions on budget, currency, funding and timeline. The ad still needs the DLD permit number and Madmoun QR code because it advertises Dubai property."),
 ("Which Google keywords do Indians use for Dubai property?",
  "From suggestions collected in India: 'buy property in dubai from india', 'dubai flat price in indian rupees', 'property in dubai under 1 crore in rupees', 'can indian buy property in dubai on loan' and project or community names. Verify volumes in Keyword Planner before bidding."),
 ("Should Dubai property ads to India be in Hindi?",
  "English carries most searches, but no India-facing Dubai ad in our snapshot used Hindi script. Test Hindi or regional creative in specific cities as an experiment, measured on qualified leads."),
 ("What negative keywords should an India → Dubai campaign use?",
  "Jobs, work visa, visa agent, flights, holiday, hotel, rent (unless you market rentals), and India-only property terms."),
]
ABODY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../">Dubai</a><span>/</span>Meta and Google Ads, India</nav>
<p class="eyebrow">India → Dubai · Channels</p>
<h1>Meta and Google Ads for Dubai property, targeting India</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>For Dubai property sold to Indian buyers, Meta finds people before they search and Google catches those already asking. Run India as its own pool by state and city, price in AED and rupees, ask budget, funding and timeline in the form, bid on the questions Indians actually search, and carry the DLD permit number and QR code on every ad.</p></div>

<h2 id="meta">Meta: structure</h2>
<ul>
<li><strong>Pools:</strong> India (by state or city) separate from UAE residents and other NRIs.</li>
<li><strong>Where:</strong> start with the states where interest concentrates ({", ".join(s for s, _ in ST[:5])}) and cities advertisers already use, then move budget by cost per qualified lead.</li>
<li><strong>Form:</strong> budget and currency, funding route, timeline, residency, visit preference.</li>
<li><strong>Creative:</strong> one offer per ad. What competitors already use in India: payment plan {pc(C,"payment_plan")}, rupee price {pc(C,"price_inr")}, events {pc(C,"expo_event")}, Golden Visa {pc(C,"golden_visa")}. What almost nobody uses: NRI-specific messages ({pc(C,"nri_mention")}), loan and remittance answers ({pc(C,"tax_remit_loan")}), permit in the copy ({pc(C,"permit_dld")}).</li>
</ul>

<h2 id="google">Google: what to bid on</h2>
<div class="tablewrap"><table><thead><tr><th>Theme</th><th>Suggestions from India</th><th>Examples</th></tr></thead><tbody>{theme_rows}</tbody></table></div>
<p>Suggestions show what people type, not volumes; check each theme in Keyword Planner with India as the location. Keep project and community terms in their own campaign, and send each theme to a landing page that answers it.</p>

<h2 id="youtube">YouTube</h2>
<p>Walkthroughs and community tours stand in for a first viewing for buyers who will not fly before shortlisting. Use them as the retargeting pool for Meta and Search.</p>

<h2 id="compliance">Compliance</h2>
<p>An ad shown in India for Dubai property is still a Dubai property advertisement: it needs the DLD permit, the permit number and the Madmoun QR code ({src("dld")}; {src("mad")}). See the <a href="/dubai/trakheesi-permit-guide/">Trakheesi guide</a>.</p>
<p>{E(NOT_DONE)}</p>
{faq_html(AFAQ)}
{rel_except(ADS)}{cta("Want the India pool built properly?")}'''

PAGES = [
 dict(out='dist' + FLAG + 'index.html', url='https://qdnco.com' + FLAG, label='Indian performance marketing for Dubai real estate', typ='Service',
      title='Indian Performance Marketing for Dubai Real Estate | QDnCo',
      desc='Bengaluru performance marketing agency for Dubai developers and brokerages targeting Indian buyers: Google and Meta, India-city targeting, NRI/HNI funnels.',
      body=FBODY, faq=FFAQ),
 dict(out='dist' + LG + 'index.html', url='https://qdnco.com' + LG, label='Lead generation from India', typ='Article',
      title='Dubai Property Lead Generation from India | QDnCo',
      desc='How to generate Dubai property leads from India: seven funnel stages, channels, city targeting, qualification for Indian buyers and IST follow-up.',
      body=LBODY, faq=LFAQ),
 dict(out='dist' + NRI + 'index.html', url='https://qdnco.com' + NRI, label='NRI and HNI marketing', typ='Article',
      title='NRI and HNI Marketing for Dubai Real Estate | QDnCo',
      desc='Five Indian buyer segments for Dubai property, from resident HNIs to Gulf NRIs and Golden Visa seekers: what each asks, channels and what to say.',
      body=NBODY, faq=NFAQ),
 dict(out='dist' + OFF + 'index.html', url='https://qdnco.com' + OFF, label='Off-plan for Indian buyers', typ='Article',
      title='Dubai Off-Plan Marketing to Indian Buyers | QDnCo',
      desc='Marketing Dubai off-plan to Indian buyers: rupee pricing, payment plans, escrow and permit proof, instalments within the LRS limit, city property shows.',
      body=OBODY, faq=OFAQ),
 dict(out='dist' + ADS + 'index.html', url='https://qdnco.com' + ADS, label='Meta and Google Ads, India', typ='Article',
      title='Meta and Google Ads for Dubai Property in India | QDnCo',
      desc='Meta and Google Ads for Dubai property targeting India: state and city pools, lead forms, keywords Indians search, YouTube and DLD compliance.',
      body=ABODY, faq=AFAQ),
]

def shell(depth):
    return open('dist/dubai/trakheesi-permit-guide/index.html' if depth == 2 else 'dist/data/meta-ad-library-audit-dubai-real-estate.html', encoding='utf-8').read()
def build(out, url, title, desc, body, graph, depth):
    s = shell(depth)
    he = s.index('</head>'); head, rest = s[:he], s[he:]
    t, d = E(title), E(desc)
    for pat, new in [(r'<title>.*?</title>', f'<title>{t}</title>'),
                     (r'<meta name="description" content="[^"]*"\s*/?>', f'<meta name="description" content="{d}">'),
                     (r'<link rel="canonical" href="[^"]*"\s*/?>', f'<link rel="canonical" href="{url}">'),
                     (r'<meta property="og:title" content="[^"]*"\s*/?>', f'<meta property="og:title" content="{t}">'),
                     (r'<meta property="og:description" content="[^"]*"\s*/?>', f'<meta property="og:description" content="{d}">'),
                     (r'<meta property="og:url" content="[^"]*"\s*/?>', f'<meta property="og:url" content="{url}">')]:
        head, k = re.subn(pat, lambda m, new=new: new, head, count=1, flags=re.S); assert k == 1, (out, pat)
    head, k = re.subn(r'<script type="application/ld\+json">.*?</script>', lambda m: '<script type="application/ld+json">' + json.dumps(graph, ensure_ascii=False) + '</script>', head, count=1, flags=re.S)
    assert k == 1
    page = head + rest
    a = page.index('<div class="page"><div class="wrap">') + len('<div class="page"><div class="wrap">')
    b = page.index('<footer class="foot">')
    page = page[:a] + body + '    ' + page[b:]
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', page, re.S): json.loads(m.group(1))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(page)
    print(f'{out:78s} {len(re.sub(r"<[^>]+>", " ", body).split())} words')

ORG = {"@id": "https://qdnco.com/#organization"}
def crumbs(url, label, mid=('Dubai', 'https://qdnco.com/dubai/')):
    return {"@type": "BreadcrumbList", "@id": url + "#crumbs", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://qdnco.com/"},
        {"@type": "ListItem", "position": 2, "name": mid[0], "item": mid[1]},
        {"@type": "ListItem", "position": 3, "name": label, "item": url}]}
def faqpage(url, faq): return {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]}

for p in PAGES:
    u = p['url']
    main = ({"@type": "Service", "@id": u + "#service", "name": "Performance marketing for Dubai real estate, targeting Indian buyers",
             "serviceType": "Real estate performance marketing", "provider": ORG,
             "areaServed": [{"@type": "Country", "name": "India"}, {"@type": "City", "name": "Dubai"}, {"@type": "Country", "name": "United Arab Emirates"}],
             "audience": {"@type": "BusinessAudience", "audienceType": "Dubai real estate developers and brokerages; Indian brokers and channel partners with Dubai mandates"}}
            if p['typ'] == 'Service' else
            {"@type": "Article", "@id": u + "#article", "headline": p['title'].split(' | ')[0], "description": p['desc'], "datePublished": UPDATED,
             "dateModified": UPDATED, "author": ORG, "publisher": ORG, "mainEntityOfPage": u, "inLanguage": "en"})
    g = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebPage", "@id": u + "#page", "url": u, "name": p['title'], "description": p['desc'], "inLanguage": "en",
         "isPartOf": {"@id": "https://qdnco.com/#website"}, "dateModified": UPDATED, "breadcrumb": {"@id": u + "#crumbs"}},
        main, crumbs(u, p['label']), faqpage(u, p['faq'])]}
    build(p['out'], u, p['title'], p['desc'], p['body'], g, 2)

RU = 'https://qdnco.com' + REPORT
RT = 'India → Dubai Real Estate Buyer Report 2026 | QDnCo'
RD = f'Original research: {NC} Dubai property ads shown in India, {S["unique_suggestions"]:,} Indian search suggestions and Trends data on Indian demand for Dubai property.'
rg = {"@context": "https://schema.org", "@graph": [
    {"@type": "WebPage", "@id": RU + "#page", "url": RU, "name": RT, "description": RD, "inLanguage": "en", "isPartOf": {"@id": "https://qdnco.com/#website"},
     "datePublished": UPDATED, "dateModified": UPDATED, "breadcrumb": {"@id": RU + "#crumbs"}},
    {"@type": "Article", "@id": RU + "#article", "headline": "The India → Dubai Real Estate Buyer Acquisition Report 2026", "description": RD,
     "datePublished": UPDATED, "dateModified": UPDATED, "author": ORG, "publisher": ORG, "mainEntityOfPage": RU},
    {"@type": "Dataset", "@id": RU + "#dataset", "name": "Dubai property ads shown in India, Meta Ad Library, 29 Sep 2026",
     "description": f"{NC} Dubai property ads from {NA} advertisers shown to people in India, coded for currency, payment plan, Golden Visa, events, permits, NRI and Indian-city mentions; plus Indian search suggestions and Google Trends state interest.",
     "creator": ORG, "datePublished": UPDATED, "spatialCoverage": [{"@type": "Country", "name": "India"}, {"@type": "City", "name": "Dubai"}], "isAccessibleForFree": True,
     "license": "https://qdnco.com/legal/terms.html",
     "distribution": [{"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://qdnco.com/data/downloads/india-dubai-2026-09-29-ads.csv"},
                      {"@type": "DataDownload", "encodingFormat": "application/json", "contentUrl": "https://qdnco.com/data/downloads/india-dubai-2026-09-29-search.json"},
                      {"@type": "DataDownload", "encodingFormat": "application/json", "contentUrl": "https://qdnco.com/data/downloads/india-dubai-2026-09-29-method.json"}]},
    crumbs(RU, 'India → Dubai buyer report', ('Research', 'https://qdnco.com/data/index.html')), faqpage(RU, RFAQ)]}
build('dist' + REPORT, RU, RT, RD, RBODY, rg, 1)

dl = Path('dist/data/downloads')
shutil.copy(MI / 'india-dubai-2026-09-29' / 'corridor.csv', dl / 'india-dubai-2026-09-29-ads.csv')
shutil.copy(MI / 'india-dubai-2026-09-29' / 'search-summary.json', dl / 'india-dubai-2026-09-29-search.json')
method = {k: C[k] for k in ('snapshot', 'country', 'collector', 'source_sha256', 'terms', 'collection_log', 'raw_card_rows', 'unique_ads', 'relevant_ads', 'advertisers', 'relevance_rule', 'coding_rule', 'revisions', 'questions', 'codes', 'city_mentions_ads', 'run_age_days')}
method['search'] = {k: S[k] for k in ('collected', 'autocomplete_endpoint', 'queries_run', 'unique_suggestions', 'theme_rules', 'trends_note', 'source_sha256')}
json.dump(method, open(dl / 'india-dubai-2026-09-29-method.json', 'w'), indent=1, ensure_ascii=False)

ip = 'dist/data/index.html'; ix = open(ip, encoding='utf-8').read()
if 'india-dubai-buyer-acquisition-report' not in ix:
    card = (f'<a class="guide-card" href="india-dubai-buyer-acquisition-report.html"><b>The India → Dubai Real Estate Buyer Acquisition Report 2026</b>'
            f'<span>{NC} Dubai property ads shown in India, {S["unique_suggestions"]:,} Indian search suggestions and Trends data.</span></a>')
    ix = ix.replace('<div class="guide-grid">', '<div class="guide-grid">' + card, 1)
    ix = re.sub(r'&middot; (\d+) studies', lambda m: f'&middot; {int(m.group(1)) + 1} studies', ix, count=1)
    open(ip, 'w', encoding='utf-8').write(ix)
print('report card on research index')
