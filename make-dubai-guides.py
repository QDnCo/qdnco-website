"""Builds the Dubai child pages from the live Dubai hub's shell, and re-links the hub.

  /dubai/trakheesi-permit-guide/        Trakheesi for marketers
  /dubai/real-estate-lead-generation/   Lead generation for Dubai brokers
  /dubai/indian-buyers/                 Selling Dubai property to Indian buyers

Every factual claim carries its source inline. No Dubai results, benchmarks or
local presence are claimed. Run from Portfolio Website/:  python3 make-dubai-guides.py
"""
import json, re, html, os

HUB = 'dist/dubai/real-estate-marketing/index.html'
UPDATED = '2026-09-26'
T = open(HUB, encoding='utf-8').read()
E = html.escape

S = {
 'dld':   ('https://dubailand.gov.ae/en/eservices/real-estate-ad-permit/', 'Dubai Land Department — Real Estate Ad Permit'),
 'mad':   ('https://dubailand.gov.ae/en/news-media/dubai-land-department-strengthens-transparency-with-ai-enabled-real-estate-advertising-governance',
           'DLD — AI-enabled real estate advertising governance, 24 April 2025'),
 'fine':  ('https://dubailand.gov.ae/en/news-media/dld-fines-10-real-estate-companies-and-warns-another-30-for-not-adhering-to-advertising-requirements/',
           'DLD — fines for not adhering to advertising requirements, 20 October 2020'),
 'uaemc': ('https://uaemc.gov.ae/en/', 'UAE Media Council'),
 'gn':    ('https://gulfnews.com/uae/uae-issues-1800-advertiser-permits-for-social-media-1.500263962', 'Gulf News — UAE issues 1,800 Advertiser Permits'),
 'bayut': ('https://www.bayut.com/mybayut/trakheesi/', 'Bayut — Trakheesi for real estate professionals'),
 'ben':   ('https://www.benhams.ae/news/property-advice/whos-buying-in-dubai-2025-recap/', 'Benhams — Who is buying in Dubai, 2025 recap'),
 'rbi':   ('https://www.rbi.org.in/Scripts/FAQView.aspx?Id=115', 'Reserve Bank of India — Liberalised Remittance Scheme FAQs'),
}
def src(k): u, t = S[k]; return f'<a href="{u}" rel="noopener">{E(t)}</a>'
CTA = '''  <div class="cta-band">
    <h2>{h}</h2>
    <p>A Phase 0 call is a questionnaire, not a pitch. Email qdnco01@gmail.com or WhatsApp +91 88611 79992.</p>
    <a href="../#contact">Book a Phase 0 call &nearr;</a>
  </div>
'''
def related(items):
    return '<div class="related"><h2>Related</h2><ul>' + ''.join(
        f'<li><a href="{h}">{E(t)}<small>{E(d)}</small></a></li>' for h, t, d in items) + '</ul></div>\n'
def faq_html(faq): return '<h2>Questions marketers ask</h2>\n' + ''.join(f'<h3>{E(q)}</h3><p>{E(a)}</p>\n' for q, a in faq)
def crumbs(label): return (f'<nav class="crumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span>'
                           f'<a href="../">Dubai</a><span>/</span>{E(label)}</nav>\n')
NOT_LEGAL = ('<p class="updated">This is a marketing guide, not legal advice. Rules and fees change; confirm current requirements '
             'with the Dubai Land Department, RERA and your brokerage\'s compliance team before publishing an ad.</p>\n')

PAGES = []

# ─────────────────────────── 1. TRAKHEESI ───────────────────────────
FAQ1 = [
 ("Does a Facebook or Instagram property ad need a Trakheesi permit?",
  "Yes. DLD's permit covers electronic advertisements and real estate promotion platforms alongside print, SMS, outdoor and classified ads, so a paid Meta or Google ad for a Dubai property needs a permit before it runs, and the permit number and Madmoun QR code must appear on it."),
 ("How much does a Trakheesi permit cost?",
  "DLD lists AED 1,000 per permit and AED 5,000 for a project-launch event permit, plus a AED 20 Knowledge and Innovation fee. Exhibitions carry separate booking and per-exhibitor fees. The stated processing time is one working day."),
 ("Can a marketing agency apply for the permit?",
  "No. The permit is issued to a licensed real estate company. A broker applies with a copy of its marketing contract with the property owner. An agency builds the ad under the client's permit; it cannot hold one for the client."),
 ("What is Madmoun?",
  "Madmoun is the QR code linked to an advertising permit. DLD states that real estate companies must display it on all real estate advertisements, visual or written, so a buyer can check that the ad is approved by RERA."),
 ("What happens if an ad runs without a permit?",
  "DLD announced progressive fines of AED 50,000 per violation in 2020, for ads without permits, misuse of permit numbers and expired permits, with licence cancellation possible for repeat violations. Check current penalties with RERA."),
]
BODY1 = crumbs('Trakheesi permit guide') + f'''<p class="eyebrow">Dubai · Compliance for marketers</p>
<h1>Trakheesi permits for real estate marketers: what every Dubai property ad needs</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>Every Dubai property advertisement, including a Meta or Google ad, needs a Dubai Land Department advertising permit issued through Trakheesi before it runs. The permit is issued to the licensed brokerage or developer, costs AED 1,000 (AED 5,000 for a launch event) plus AED 20, and takes one working day. The ad must show the permit number and its Madmoun QR code. For marketers, that makes the permit a creative input from the first brief, not a stamp added at the end.</p></div>

<h2>What Trakheesi is</h2>
<p>Trakheesi is the Dubai Land Department's permit system. For real estate advertising, it issues the permit that lets a licensed company advertise a specific property, project or event. The Real Estate Regulatory Agency (RERA), part of DLD, supervises advertising against it. Portals check it too: Bayut and dubizzle will not publish a listing without a valid permit ({src('bayut')}).</p>

<h2>Which ads need a permit</h2>
<p>DLD's permit service lists fourteen categories ({src('dld')}). A performance marketer touches most of them:</p>
<div class="tablewrap"><table>
<thead><tr><th>DLD category</th><th>Where it shows up in a campaign</th></tr></thead>
<tbody>
<tr><td>Electronic advertisements</td><td>Meta and Instagram ads, Google Search, Display and YouTube, programmatic banners</td></tr>
<tr><td>Real estate promotion platforms</td><td>Portal listings, project microsites and landing pages</td></tr>
<tr><td>SMS advertisements</td><td>Broadcast SMS and bulk messaging</td></tr>
<tr><td>Classified advertisements</td><td>Portal and marketplace classifieds</td></tr>
<tr><td>Promotional campaigns</td><td>A launch campaign running across several channels at once</td></tr>
<tr><td>Open house events, project launch events</td><td>Event-led ads and the event itself</td></tr>
<tr><td>Newspaper, printed, outdoor, billboard, vehicle</td><td>Offline media that often runs beside a digital launch</td></tr>
<tr><td>Real estate exhibitions and seminars</td><td>Roadshows, including overseas roadshows aimed at Dubai buyers abroad</td></tr>
</tbody></table></div>

<h2>Who applies, what it costs, how long it takes</h2>
<div class="tablewrap"><table>
<thead><tr><th>Item</th><th>What DLD states</th></tr></thead>
<tbody>
<tr><td>Applicant</td><td>A licensed real estate company. Brokers supply a copy of their marketing contract with the property owner for most permit types.</td></tr>
<tr><td>Standard permit</td><td>AED 1,000</td></tr>
<tr><td>Project launch event</td><td>AED 5,000</td></tr>
<tr><td>Knowledge and Innovation fee</td><td>AED 20</td></tr>
<tr><td>Exhibitions</td><td>AED 10,200 preliminary booking (deducted from the final fee) and AED 1,020 per exhibitor; documents at least one month before the date</td></tr>
<tr><td>Processing time</td><td>One working day</td></tr>
<tr><td>Off-plan projects</td><td>Must be registered with DLD's Escrow Account Department</td></tr>
</tbody></table></div>
<p>Source: {src('dld')}.</p>

<h2>What has to appear on the ad</h2>
<ul>
<li><strong>The permit number.</strong> DLD requires the permit number in all real estate ads ({src('fine')}).</li>
<li><strong>The Madmoun QR code.</strong> DLD states that real estate companies must display the QR code on all real estate advertisements, whether visual or written, so buyers can verify the ad is approved by RERA ({src('mad')}).</li>
<li><strong>Only what the permit covers.</strong> The ad has to match the property, project or event on the permit. Price, payment plan and handover claims should come from the same verified fact sheet the permit was issued against.</li>
</ul>
<p>Enforcement is automated. DLD reported that its AI-enabled monitoring had checked more than 279,000 listings on Property Finder, dubizzle and Bayut, and that 29% were automatically modified ({src('mad')}).</p>

<h2>How the permit changes a Meta or Google campaign</h2>
<p>These are the working rules we build into a Dubai campaign. They follow from the requirements above; they are our operating practice, not additional DLD rules.</p>
<ol>
<li><strong>One permit map per campaign.</strong> Before creative starts, list every property or project the campaign will advertise and the permit that covers each. An ad set that rotates in a new project needs that project's permit first.</li>
<li><strong>Design a permit zone into every template.</strong> Reserve a fixed corner for the permit number and QR code in 1:1, 4:5 and 9:16 layouts, outside Meta's Stories and Reels safe-area overlays, and big enough to scan on a phone. Stamping a QR on a finished creative is how codes end up unreadable or covered by interface buttons.</li>
<li><strong>Carry the permit onto the landing page and form.</strong> The click lands on a promotion platform too. Put the same permit number and QR near the top of the landing page and in the instant-form intro.</li>
<li><strong>Track expiry like a budget.</strong> DLD has fined companies for using expired permits. Keep expiry dates in the campaign sheet and pause any ad whose permit lapses before it is renewed.</li>
<li><strong>Keep claims on the fact sheet.</strong> A cheaper-looking price or an earlier handover date than the permit's property supports is both a compliance risk and a lead-quality problem: the buyer calls about an offer that does not exist.</li>
<li><strong>Run it from the licensed company's account.</strong> The permit belongs to the brokerage or developer, so the ad account, page and landing domain should be theirs. That also keeps pixel history and audiences with the client.</li>
</ol>

<h2>Agents posting on their own social accounts</h2>
<p>Individuals who advertise on social media in the UAE need an Advertiser Permit from the UAE Media Council ({src('uaemc')}; {src('gn')}). That sits on top of the property ad's DLD permit, not instead of it. Confirm the current scope for your case with the Council and your brokerage's compliance team before an agent boosts a listing from a personal profile.</p>

<h2>Penalties</h2>
<p>In October 2020 DLD announced fines against ten companies and warnings to thirty more for advertising without permits, manipulating permit numbers and using expired permits. It described each fine as a progressive AED 50,000, with licence cancellation possible for repeat violations ({src('fine')}). Treat that as the floor of the risk, and check current penalties with RERA.</p>

<h2>Pre-launch checklist</h2>
<ul>
<li>Every property or project in the campaign is mapped to a valid permit, with its expiry date.</li>
<li>The permit is held by the client's licensed company; the marketing contract is on file.</li>
<li>Permit number and Madmoun QR sit in a reserved zone in every size, readable on a phone.</li>
<li>The landing page and instant form show the same permit number and QR.</li>
<li>Price, payment plan, handover and amenity claims match the verified fact sheet.</li>
<li>Off-plan project is registered with DLD's Escrow Account Department.</li>
<li>Agents boosting from personal profiles hold a Media Council Advertiser Permit.</li>
<li>Campaigns are created paused and approved by the client before spend.</li>
</ul>
<h2>For Indian agencies and channel partners marketing Dubai property</h2>
<ul>
<li><strong>The permit is never yours unless you are licensed in Dubai.</strong> An Indian agency or channel partner markets Dubai property under the licensed Dubai brokerage's or developer's permit, and the ad account and landing page should sit with that licensed party or run on its behalf.</li>
<li><strong>Ads shown in India still need the permit.</strong> Targeting India does not change what the ad is: a Dubai property advertisement, with its permit number and Madmoun QR code.</li>
<li><strong>Indian RERA registration is for projects in India.</strong> For a Dubai project the relevant approvals are DLD's, including escrow registration for off-plan.</li>
<li><strong>Property shows in Indian cities are exhibitions.</strong> DLD's exhibition permit requires documents at least one month before the date, sets a 30-day gap between exhibitions from the same country, and allows preliminary reservations only, not sales, at the exhibition ({src('dld')}).</li>
</ul>
<p>More on the India side: <a href="../indian-real-estate-performance-marketing-agency/">Indian performance marketing for Dubai real estate</a>.</p>
{NOT_LEGAL}{faq_html(FAQ1)}{related([
 ('../../data/meta-ad-library-audit-dubai-real-estate.html', 'Dubai property ads on Meta: 2026 audit', 'How often ads show a permit number, price and payment plan.'),
 ('../real-estate-lead-generation/', 'Lead generation for Dubai brokers', 'Portals, Meta, Google and speed to lead.'),
 ('../indian-buyers/', 'Selling Dubai property to Indian buyers', 'Targeting, remittance rules and follow-up from India.'),
 ('../real-estate-marketing/', 'Dubai real estate marketing', 'How a Dubai engagement is scoped.'),
 ('../', 'QDnCo Dubai', 'Services, AED pricing and how we work.'),
])}{CTA.format(h='Want the permit built into the creative from day one?')}'''
PAGES.append(dict(slug='trakheesi-permit-guide', label='Trakheesi permit guide',
  title='Trakheesi Permit Guide for Dubai Property Ads | QDnCo',
  desc='What every Dubai property ad needs: DLD Trakheesi permit, fees, Madmoun QR, and how the permit changes Meta and Google campaigns. Sourced to DLD.',
  kind='Article', headline='Trakheesi permits for real estate marketers: what every Dubai property ad needs',
  body=BODY1, faq=FAQ1))

# ─────────────────────────── 2. BROKER LEAD GENERATION ───────────────────────────
FAQ2 = [
 ("What is the best lead source for a Dubai real estate broker?",
  "There is no single best source. Portals catch buyers already searching listings, Meta creates demand for off-plan launches and reaches overseas investors, and Google captures people searching for a community, developer or project. Compare them on cost per qualified lead from your own CRM, not on cost per form fill."),
 ("How fast should a broker respond to a new lead?",
  "Within minutes, and on WhatsApp as well as by phone. A buyer who submitted three forms in an evening will speak to whichever agent answers first. An instant automated first reply, followed by a human call inside the working window, protects the lead while your team is busy."),
 ("Should overseas and UAE-resident buyers be in the same campaign?",
  "No. They differ in time zone, language, the questions they ask and how long they take to decide. Separate ad sets, creative and follow-up hours make both cheaper to qualify and easier to measure."),
 ("Can I buy Dubai real estate leads instead?",
  "You can, but shared or resold leads usually reach several agents at once, and you do not control how they were generated or which permit the ad ran under. Leads from campaigns in your own licensed account are yours alone, and every ad runs under your permit."),
 ("What should a broker track besides cost per lead?",
  "Qualification rate, media cost per qualified enquiry, contact rate, viewings arranged and attended, and reasons for rejection. Cost per lead alone rewards cheap, unreachable enquiries."),
]
BODY2 = crumbs('Lead generation for brokers') + f'''<p class="eyebrow">Dubai · Brokers and agents</p>
<h1>Real estate lead generation for Dubai brokers: portals, Meta, Google and speed to lead</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>Dubai brokers get leads from four places: property portals, Meta ads, Google search and referrals. The ones that turn into viewings share three things: an ad that describes real, permitted inventory, a reply within minutes on WhatsApp, and a written definition of a qualified enquiry that marketing and sales both agree on. Measure every source on media cost per qualified enquiry from your CRM, not on cost per form fill.</p></div>

<h2>The four lead sources, compared</h2>
<div class="tablewrap"><table>
<thead><tr><th>Source</th><th>What it is good for</th><th>Where it goes wrong</th></tr></thead>
<tbody>
<tr><td>Portals (Bayut, Property Finder, dubizzle)</td><td>Buyers and tenants already searching listings; secondary and ready stock</td><td>The same buyer enquires on many listings; response speed decides who wins</td></tr>
<tr><td>Meta (Facebook, Instagram)</td><td>Off-plan launches, payment-plan offers, overseas investors, retargeting site visitors</td><td>Instant forms attract low-intent fills unless the form and creative filter for budget and timeline</td></tr>
<tr><td>Google Search and YouTube</td><td>High intent: people searching a community, developer or project by name</td><td>Broad keywords such as "property in Dubai" spend fast on researchers, not buyers</td></tr>
<tr><td>Referrals and past clients</td><td>Highest trust, lowest cost</td><td>Not scalable on demand; needs a CRM that remembers who bought what</td></tr>
</tbody></table></div>
<p>Every paid ad and every portal listing needs a DLD advertising permit, with its number and Madmoun QR code on the ad. See our <a href="../trakheesi-permit-guide/">Trakheesi guide for marketers</a>.</p>

<h2>Run two pools: UAE residents and overseas investors</h2>
<p>A single Dubai launch draws residents upgrading or buying their first home, GCC buyers, and investors abroad. Indian nationals were the largest foreign buyer group in 2025, around 22% of foreign purchases according to brokerage analysis of DLD data ({src('ben')}). Put residents and overseas buyers in separate ad sets with their own creative, form questions and follow-up hours. Mixed together, one audience's cheap clicks hide the other's buyers, and neither can be qualified properly.</p>

<h2>Define a qualified enquiry before you buy traffic</h2>
<p>Agree five fields with your sales team in writing, then build the form, the first message and the CRM stages around them:</p>
<ol>
<li><strong>Budget fit.</strong> The buyer's range, in AED, and whether it means purchase price or available down payment. They are different numbers.</li>
<li><strong>Property and location fit.</strong> Property type and the communities considered. A nearby alternative is a different preference, not automatically a match.</li>
<li><strong>Timing.</strong> Buying now, within six months, or researching. Later-stage enquiries are worth nurturing, but they are not sales-ready.</li>
<li><strong>Contactability.</strong> Preferred channel and an agreed attempt window. One unanswered call is not a fake lead; answering is not intent.</li>
<li><strong>A distinct enquiry.</strong> Rules for repeat submissions and people already in your CRM, so returning prospects are not counted as new.</li>
</ol>

<h2>Speed to lead</h2>
<ul>
<li><strong>Reply in minutes, on WhatsApp.</strong> Send an automated first message the moment the form arrives, then a human call inside the agreed window.</li>
<li><strong>Plan hours per pool.</strong> India is 90 minutes ahead of Dubai; the UK is three to four hours behind. Overseas leads should not wait for the next Dubai morning.</li>
<li><strong>Route, do not broadcast.</strong> Assign each lead to one agent by project and language, with the enquiry details attached, rather than dropping it into a group chat.</li>
<li><strong>Record why leads are rejected.</strong> Budget mismatch, wrong community, duplicate, unreachable after the agreed attempts. Each reason points marketing at a specific fix.</li>
</ul>

<h2>The two numbers to report every week</h2>
<p><strong>Qualification rate</strong> = accepted qualified enquiries ÷ eligible enquiries reviewed.</p>
<p><strong>Media cost per qualified enquiry</strong> = attributed media spend ÷ accepted qualified enquiries.</p>
<p>State the review window, exclusions and how many leads are still awaiting review. If agency fees are included, label it as a fully loaded cost. Neither number proves revenue; keep viewings arranged, viewings attended and reservations as separate stages that your team updates.</p>

<h2>Creative that filters as well as attracts</h2>
<ul>
<li>Lead with the payment plan and handover date for off-plan; they are what an off-plan buyer decides on.</li>
<li>Show the starting price. Hiding it buys cheap clicks from buyers who cannot afford the unit.</li>
<li>Test one variable at a time, such as location convenience against layout, for the same verified offer.</li>
<li>Keep the permit zone fixed in every template so creative can be refreshed without a compliance re-check of the layout.</li>
</ul>

<h2>A note on published cost-per-lead figures</h2>
<p>Agencies publish Dubai cost-per-lead ranges, but they rarely say whether they mean a form fill, a contacted lead or a qualified enquiry, or which community and ticket size. We do not publish a Dubai benchmark until we have our own campaign data. Our India figures, with their method and limits, are in our <a href="../../data/real-estate-cost-per-lead-benchmarks.html">cost-per-lead benchmarks</a>.</p>

<h2>Where QDnCo fits</h2>
<p>We run research, creative testing and Meta and Google lead generation from your licensed account, under your permits. Your agents handle viewings, negotiation and closing. Our delivered work is in India; every Dubai engagement starts with a market read. Pricing is published in AED on <a href="../#pricing">QDnCo Dubai</a>.</p>
{faq_html(FAQ2)}{related([
 ('../trakheesi-permit-guide/', 'Trakheesi permits for marketers', 'What every Dubai property ad needs.'),
 ('../indian-buyers/', 'Selling Dubai property to Indian buyers', 'The largest foreign buyer group, reached from India.'),
 ('../../answers/how-fast-should-leads-be-called.html', 'How fast should leads be called?', 'Why the first minutes decide the conversion.'),
 ('../', 'QDnCo Dubai', 'Services, AED pricing and how we work.'),
])}{CTA.format(h='Want qualified enquiries from your own account?')}'''
PAGES.append(dict(slug='real-estate-lead-generation', label='Lead generation for brokers',
  title='Real Estate Lead Generation for Dubai Brokers | QDnCo',
  desc='How Dubai brokers get qualified leads: portals vs Meta vs Google, separate resident and overseas pools, a written qualification definition and speed to lead.',
  kind='Article', headline='Real estate lead generation for Dubai brokers: portals, Meta, Google and speed to lead',
  body=BODY2, faq=FAQ2))

# ─────────────────────────── 3. INDIAN BUYERS ───────────────────────────
FAQ3 = [
 ("How many Dubai property buyers are Indian?",
  "Indian nationals were the largest foreign buyer group in Dubai in 2025, around 22% of foreign purchases, up from 21% in 2024, according to brokerage analysis of Dubai Land Department data. DLD itself does not publish real-time nationality percentages."),
 ("How much can a resident Indian send abroad to buy property?",
  "Under the Reserve Bank of India's Liberalised Remittance Scheme, a resident individual can remit up to USD 250,000 per financial year for permitted transactions, and RBI's scheme covers acquiring immovable property outside India. Tax collected at source applies above an annual threshold; buyers should confirm the current rate and threshold with a tax adviser."),
 ("Can a Dubai developer run Meta ads to buyers in India?",
  "Yes. The ad still needs its DLD advertising permit, number and QR code, because it advertises Dubai property. Target by city and interest in India, answer Indian buyers' questions in the creative, and plan follow-up in Indian Standard Time."),
 ("Which Indian cities should a Dubai campaign target?",
  "Start where the buyer research points, typically large metros with high-income professionals and business owners, then let cost per qualified enquiry decide where budget goes. We do not assume a city list before the research."),
 ("Is an NRI in the UAE the same audience as a buyer in India?",
  "No. An Indian professional already living in Dubai is a UAE-resident buyer with local mortgage options and no remittance question. A buyer in India is an overseas investor. Run them as separate pools."),
]
BODY3 = crumbs('Indian buyers') + f'''<p class="eyebrow">Dubai · The India corridor</p>
<h1>Selling Dubai property to Indian buyers: targeting, rules and follow-up from India</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>Indian nationals are the largest foreign buyer group in Dubai property, around 22% of foreign purchases in 2025 according to brokerage analysis of DLD data. Reaching them well means running India as its own campaign: city-level targeting in India, creative that answers ownership, payment-plan and remittance questions, a DLD permit on every ad, and follow-up timed to Indian Standard Time, which is 90 minutes ahead of Dubai.</p></div>

<h2>Why Indian buyers matter to a Dubai launch</h2>
<p>Benhams' 2025 recap, based on brokerage analysis of DLD data, puts India first among foreign buyer nationalities, at about 22%, up from 21% in 2024 ({src('ben')}). DLD does not publish real-time nationality percentages, so treat the figure as an estimate rather than an official count.</p>

<h2>Three different Indian audiences</h2>
<div class="tablewrap"><table>
<thead><tr><th>Audience</th><th>What they need to hear</th><th>How to run it</th></tr></thead>
<tbody>
<tr><td>Indians living in the UAE</td><td>Community, commute, schools, mortgage eligibility, handover date</td><td>UAE-resident pool, local hours, Dubai sales team</td></tr>
<tr><td>Investors living in India</td><td>Ownership rules for foreigners, payment plan, rental yield claims only if sourced, how money moves from India, visits and handover</td><td>Separate India pool, IST follow-up, video walkthroughs and virtual viewings</td></tr>
<tr><td>Indian brokers and channel partners selling Dubai</td><td>Mandate terms, permitted marketing, co-branding rules, lead ownership</td><td>Partner recruitment campaign, kept apart from buyer campaigns</td></tr>
</tbody></table></div>

<h2>What an India-side campaign has to answer</h2>
<ul>
<li><strong>Can I own it?</strong> Freehold areas, ownership for foreign buyers, and what the title looks like. Link to the developer's or DLD's own explanation rather than paraphrasing law in an ad.</li>
<li><strong>How do I pay?</strong> Payment plan in AED with the INR equivalent and the date of the rate used. Off-plan buyers decide on the plan and the handover date.</li>
<li><strong>How does money leave India?</strong> The RBI Liberalised Remittance Scheme lets a resident individual remit up to USD 250,000 per financial year for permitted transactions, and the scheme covers acquiring property abroad ({src('rbi')}). Tax collected at source applies above an annual threshold. Point buyers to their bank and tax adviser for current rates; do not put a tax figure in the ad.</li>
<li><strong>Who will I deal with?</strong> The licensed Dubai brokerage or developer, named, with its permit on the ad, and a human who answers in Indian hours.</li>
</ul>

<h2>Compliance does not change with the audience</h2>
<p>An ad shown in Mumbai for a Dubai apartment is still a Dubai property advertisement. It needs a DLD advertising permit, the permit number and the Madmoun QR code ({src('dld')}; {src('mad')}). Overseas roadshows and seminars are permit categories of their own. Our <a href="../trakheesi-permit-guide/">Trakheesi guide for marketers</a> covers the details. Avoid guaranteed-return or fixed-yield promises; they invite regulatory trouble in both countries and attract the wrong buyer.</p>

<h2>Targeting and follow-up that fit India</h2>
<ol>
<li><strong>Cities from research, not habit.</strong> Start with the metros the buyer research points to, then move budget by cost per qualified enquiry.</li>
<li><strong>Video before the call.</strong> Walkthrough and community videos do the work a site visit would, and filter out people who only wanted a brochure.</li>
<li><strong>Qualify on money early.</strong> Ask for budget in INR or AED and whether the buyer has used the remittance route before; a buyer who has not may need weeks, not days.</li>
<li><strong>Answer in IST.</strong> Evenings in India are late afternoons in Dubai. An Indian lead that waits for the next Dubai morning is already speaking to someone else.</li>
<li><strong>Keep the pool separate in reporting.</strong> India and UAE qualification rates are different numbers; blending them hides both.</li>
</ol>

<h2>Why an India-based team</h2>
<p>We run property campaigns to Indian buyers every week: 43+ projects are active across our India work, with method and labelled numbers published in <a href="../../work/index.html">our case studies</a>. For Dubai developers and brokers, that means the India pool is built by people who already know how Indian buyers respond to price, payment-plan and trust signals. We have not yet run a Dubai campaign; every engagement starts with a market read you can judge before a retainer.</p>
{faq_html(FAQ3)}{related([
 ('../real-estate-lead-generation/', 'Lead generation for Dubai brokers', 'Portals, Meta, Google and speed to lead.'),
 ('../trakheesi-permit-guide/', 'Trakheesi permits for marketers', 'What every Dubai property ad needs.'),
 ('../../work/index.html', 'Our India case studies', 'Method and labelled numbers for each project.'),
 ('../', 'QDnCo Dubai', 'Services, AED pricing and how we work.'),
])}{CTA.format(h='Selling Dubai inventory to buyers in India?')}'''
PAGES.append(dict(slug='indian-buyers', label='Indian buyers',
  title='Selling Dubai Property to Indian Buyers | QDnCo',
  desc='Indian nationals are the largest foreign buyer group in Dubai. How to target them from India: audiences, LRS remittance, DLD permits and IST follow-up.',
  kind='Article', headline='Selling Dubai property to Indian buyers: targeting, rules and follow-up from India',
  body=BODY3, faq=FAQ3))


# ─────────────────────────── 4. OFF-PLAN LAUNCH (uses the audit's own numbers) ───────────────────────────
_A = json.load(open('../QDnCo Marketing/Market Intelligence/_scrape/dubai-2026-09-26/summary.json', encoding='utf-8'))['buy']
def _p(k):
    v = _A['codes'][k]['ads_share'] * 100
    return f'{v:.1f}%' if v < 10 else f'{round(v)}%'
AUD = '../../data/meta-ad-library-audit-dubai-real-estate.html'
S['moet'] = ('https://www.moet.gov.ae/en/-/what-are-the-conditions-for-granting-a-golden-visa-to-an-investor-in-real-estate-', 'UAE Ministry of Economy — Golden Visa conditions for real estate investors')
S['dldgv'] = ('https://dubailand.gov.ae/en/eservices/request-for-golden-visa-investor/', 'Dubai Land Department — Golden Visa application for investors')
FAQ4 = [
 ("How do you market an off-plan launch in Dubai?",
  "Plan it in three windows: a pre-launch register-interest phase, a launch window around the event or release, and a sustain phase for remaining inventory. Every ad runs under a DLD permit with its number and Madmoun QR code, leads with price and payment plan, and splits UAE residents from overseas investors."),
 ("Does an off-plan launch event need its own permit?",
  "Yes. DLD lists a project launch event permit at AED 5,000, separate from the AED 1,000 standard advertising permit, plus a AED 20 Knowledge and Innovation fee. Off-plan projects must also be registered with DLD's Escrow Account Department."),
 ("Can off-plan property qualify a buyer for the UAE Golden Visa?",
  "The UAE Ministry of Economy lists property worth at least AED 2 million as the real estate route to the 10-year Golden Visa, and eligible off-plan units from approved developers can count. Confirm current conditions with the authorities before using it in an ad."),
 ("What do Dubai off-plan ads usually show?",
  f"In our audit of {_A['relevant_ads']:,} active UAE property ads on Meta, {_p('price_aed')} stated an AED price in the text, {_p('payment_plan')} a payment plan, {_p('handover_date')} a handover or completion date and {_p('golden_visa')} the Golden Visa. Only {_p('permit_in_text')} put a permit reference in the ad text."),
]
BODY4 = crumbs('Off-plan launch marketing') + f"""<p class="eyebrow">Dubai · Developers and brokerages</p>
<h1>Marketing an off-plan launch in Dubai: a three-window playbook</h1>
<p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p>An off-plan launch in Dubai is won or lost in three windows: pre-launch registrations, the launch itself, and the months of remaining inventory after it. Every ad needs a DLD permit with its number and Madmoun QR code, the launch event needs its own AED 5,000 permit, and the creative has to lead with what off-plan buyers decide on: price, payment plan and handover date. Residents and overseas investors run as separate campaigns.</p></div>

<h2>What the market is already showing buyers</h2>
<p>In our <a href="{AUD}">audit of {_A['relevant_ads']:,} active UAE property ads on Meta</a> (snapshot 26 September 2026, ad text only), {_p('price_aed')} stated an AED price, {_p('payment_plan')} a payment plan, {_p('handover_date')} a handover or completion date and {_p('golden_visa')} the Golden Visa. Only {_p('permit_in_text')} put a permit reference in the text, and {_p('india_reference')} mentioned India at all. An ad without a price and a plan now stands out for the wrong reason; an ad that also carries its permit number in the copy stands out for the right one.</p>

<h2>Window 1 — Pre-launch: register interest</h2>
<ul>
<li><strong>Permit first.</strong> Pre-launch ads are still property ads. Apply for the permit before the first creative runs ({src('dld')}).</li>
<li><strong>Register-interest forms that qualify.</strong> Ask budget in AED, cash or mortgage, purchase timeline and country of residence, so the launch-day call list is already sorted.</li>
<li><strong>Two pools from day one.</strong> UAE residents and overseas investors get different creative, form questions and follow-up hours. See <a href="../indian-buyers/">selling to Indian buyers</a>.</li>
<li><strong>Warm the retargeting pool</strong> with walkthrough and location video, so launch-week spend reaches people who already know the project.</li>
</ul>

<h2>Window 2 — Launch: the event and the first weeks</h2>
<ul>
<li><strong>A separate event permit.</strong> DLD lists a project launch event permit at AED 5,000, alongside the AED 1,000 standard permit and a AED 20 fee ({src('dld')}).</li>
<li><strong>Escrow registration.</strong> DLD requires off-plan projects to be registered with its Escrow Account Department ({src('dld')}).</li>
<li><strong>Lead with the offer, one per ad:</strong> starting price, payment plan split, handover quarter, launch-only terms if they exist and are documented.</li>
<li><strong>Speed to lead.</strong> Answer on WhatsApp within minutes in the buyer's time zone; launch-week enquiries go cold fastest. See <a href="../real-estate-lead-generation/">lead generation for Dubai brokers</a>.</li>
</ul>

<h2>Window 3 — Sustain: remaining inventory</h2>
<ul>
<li>Move budget to the unit types and price bands still available, and update the creative the day inventory changes.</li>
<li>Use construction-progress updates as proof, and shift the message from "launch" to "handover in" a stated quarter.</li>
<li>Re-read qualification weekly; drop audiences and creatives whose leads stop reaching viewings.</li>
</ul>

<h2>Golden Visa: use it accurately</h2>
<p>The UAE Ministry of Economy lists property worth at least AED 2 million as the real estate route to the 10-year Golden Visa, and eligible off-plan units from approved developers can count ({src('moet')}; {src('dldgv')}). If the project qualifies, say so plainly with the threshold. Do not imply that every unit qualifies, or that the visa is guaranteed.</p>

<h2>The compliance checklist for a launch</h2>
<ul>
<li>Project registered with DLD's escrow department; marketing contract in place for brokers.</li>
<li>Advertising permit for every property ad; separate permit for the launch event.</li>
<li>Permit number and Madmoun QR in a fixed zone on every creative, landing page and form ({src('mad')}).</li>
<li>Price, payment plan, handover and Golden Visa claims match the verified fact sheet.</li>
<li>Campaigns created paused and approved by the licensed advertiser before spend.</li>
</ul>
<p>Full detail: <a href="../trakheesi-permit-guide/">Trakheesi permits for real estate marketers</a>.</p>
{NOT_LEGAL}{faq_html(FAQ4)}{related([
 (AUD, 'Dubai property ads on Meta: 2026 audit', 'What 984 active UAE property ads show.'),
 ('../trakheesi-permit-guide/', 'Trakheesi permits for marketers', 'What every Dubai property ad needs.'),
 ('../indian-buyers/', 'Selling Dubai property to Indian buyers', 'The largest foreign buyer group.'),
 ('../', 'QDnCo Dubai', 'Services, AED pricing and how we work.'),
])}{CTA.format(h='Launching off-plan in Dubai?')}"""
PAGES.append(dict(slug='off-plan-launch-marketing', label='Off-plan launch marketing',
  title='Off-Plan Launch Marketing in Dubai: A Playbook | QDnCo',
  desc='How to market an off-plan launch in Dubai: pre-launch, launch and sustain windows, DLD permits, escrow, Golden Visa claims and what 984 live ads show.',
  kind='Article', headline='Marketing an off-plan launch in Dubai: a three-window playbook',
  body=BODY4, faq=FAQ4))


def build(p):
    url = f"https://qdnco.com/dubai/{p['slug']}/"
    graph = {"@context": "https://schema.org", "@graph": [
      {"@type": "WebPage", "@id": url + "#page", "url": url, "name": p['title'], "description": p['desc'], "inLanguage": "en",
       "isPartOf": {"@id": "https://qdnco.com/#website"}, "dateModified": UPDATED, "breadcrumb": {"@id": url + "#crumbs"}},
      {"@type": p['kind'], "@id": url + "#article", "headline": p['headline'], "description": p['desc'],
       "datePublished": UPDATED, "dateModified": UPDATED, "inLanguage": "en", "mainEntityOfPage": {"@id": url + "#page"},
       "author": {"@id": "https://qdnco.com/#organization"}, "publisher": {"@id": "https://qdnco.com/#organization"},
       "about": [{"@type": "Place", "name": "Dubai"}]},
      {"@type": "BreadcrumbList", "@id": url + "#crumbs", "itemListElement": [
         {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://qdnco.com/"},
         {"@type": "ListItem", "position": 2, "name": "Dubai", "item": "https://qdnco.com/dubai/"},
         {"@type": "ListItem", "position": 3, "name": p['label'], "item": url}]},
      {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
         {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p['faq']]},
    ]}
    s = T
    he = s.index('</head>'); head, rest = s[:he], s[he:]
    t, d = E(p['title']), E(p['desc'])
    for pat, new in [(r'<title>.*?</title>', f'<title>{t}</title>'),
                     (r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{d}">'),
                     (r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">'),
                     (r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{t}">'),
                     (r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{d}">'),
                     (r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">'),
                     (r'<meta property="og:type" content="[^"]*">', '<meta property="og:type" content="article">')]:
        head, n = re.subn(pat, lambda m, new=new: new, head, count=1, flags=re.S); assert n == 1, pat
    head, n = re.subn(r'<script type="application/ld\+json">.*?</script>',
                      lambda m: '<script type="application/ld+json">' + json.dumps(graph, ensure_ascii=False) + '</script>', head, count=1, flags=re.S)
    assert n == 1
    page = head + rest
    a = page.index('<div class="page"><div class="wrap">') + len('<div class="page"><div class="wrap">')
    b = page.index('    <footer class="foot">')
    page = page[:a] + p['body'] + page[b:]
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', page, re.S): json.loads(m.group(1))
    out = f"dist/dubai/{p['slug']}/index.html"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(page)
    words = len(re.sub(r'<[^>]+>', ' ', p['body']).split())
    print(f'{out}  {words} words  {len(p["faq"])} FAQs')

for p in PAGES: build(p)

# ── Re-link the hub: breadcrumb → /dubai/, AED pricing, related → the new guides ──
h = open(HUB, encoding='utf-8').read()
def hrep(old, new):
    global h
    if new in h: return                      # idempotent re-runs
    assert h.count(old) == 1, old[:80]; h = h.replace(old, new)
hrep('<a href="../../index.html">Home</a><span>/</span>Dubai<span>/</span>',
     '<a href="../../index.html">Home</a><span>/</span><a href="../">Dubai</a><span>/</span>')
hrep('<p>Pricing is published in rupees on <a href="../../pricing/index.html">the pricing page</a>; Dubai engagements are quoted in AED on request.</p>',
     '<p>Dubai pricing is published in AED on <a href="../#pricing">QDnCo Dubai</a>: a fee per qualified lead, or a monthly retainer, with media paid by you directly to Meta and Google.</p>')
hrep('<div class="related"><h2>Related</h2><ul>\n',
     '<div class="related"><h2>Related</h2><ul>\n'
     '<li><a href="../">QDnCo Dubai<small>Services, AED pricing and how we work.</small></a></li>\n'
     '<li><a href="../trakheesi-permit-guide/">Trakheesi permits for marketers<small>What every Dubai property ad needs.</small></a></li>\n'
     '<li><a href="../real-estate-lead-generation/">Lead generation for Dubai brokers<small>Portals, Meta, Google and speed to lead.</small></a></li>\n'
     '<li><a href="../indian-buyers/">Selling Dubai property to Indian buyers<small>The India corridor.</small></a></li>\n')
hrep('<li><a href="../indian-buyers/">Selling Dubai property to Indian buyers<small>The India corridor.</small></a></li>\n',
     '<li><a href="../indian-buyers/">Selling Dubai property to Indian buyers<small>The India corridor.</small></a></li>\n'
     '<li><a href="../off-plan-launch-marketing/">Off-plan launch marketing in Dubai<small>Pre-launch, launch and sustain windows.</small></a></li>\n')
hrep('<a href="../../index.html#contact">Book a Phase 0 call &nearr;</a>', '<a href="../#contact">Book a Phase 0 call &nearr;</a>')
h = re.sub(r'<h2>The India → Dubai corridor</h2>.*?</ul>\n', '', h, flags=re.S)   # strip any earlier corridor block, then insert the current one
hrep('<h2>What the work is built on</h2>', '''<h2>The India → Dubai corridor</h2>
<p>Indian nationals are the largest foreign buyer group in Dubai property. Our work for that corridor:</p>
<ul>
<li><a href="../indian-real-estate-performance-marketing-agency/">Indian performance marketing for Dubai real estate</a>: who it is for and the evidence.</li>
<li><a href="../../data/india-dubai-buyer-acquisition-report.html">India → Dubai Buyer Acquisition Report 2026</a>: Dubai property ads shown in India and what Indians search.</li>
<li><a href="../property-lead-generation-from-india/">Dubai property lead generation from India</a>: the funnel from ad to Dubai visit.</li>
<li><a href="../nri-hni-real-estate-marketing/">NRI and HNI marketing for Dubai real estate</a>: five buyer segments.</li>
<li><a href="../off-plan-marketing-indian-buyers/">Dubai off-plan for Indian buyers</a>: rupee pricing, escrow and instalments.</li>
<li><a href="../meta-google-ads-dubai-property-india/">Meta and Google Ads for Dubai property in India</a>: structure, keywords and creative.</li>
<li><a href="../../data/meta-ad-library-audit-dubai-real-estate.html">Dubai property ads on Meta: 2026 audit</a>: 984 ads shown inside the UAE.</li>
<li><a href="../#pricing">AED pricing</a> · <a href="../../about/">About QDnCo and the team</a> · <a href="../../about/editorial-policy.html">Editorial policy</a></li>
</ul>
<h2>What the work is built on</h2>''')

hrep('{"@type": "ListItem", "position": 2, "name": "Dubai real estate marketing", "item": "https://qdnco.com/dubai/real-estate-marketing/"}',
     '{"@type": "ListItem", "position": 2, "name": "Dubai", "item": "https://qdnco.com/dubai/"}, {"@type": "ListItem", "position": 3, "name": "Dubai real estate marketing", "item": "https://qdnco.com/dubai/real-estate-marketing/"}')
open(HUB, 'w', encoding='utf-8').write(h)
print('hub re-linked')
