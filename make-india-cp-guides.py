"""India channel-partner & broker guides — the high-volume ICP (growth plan Phase 2).

  guides/real-estate-leads-for-channel-partners.html   hub
  guides/how-to-get-real-estate-leads-without-portals.html
  guides/facebook-ads-for-real-estate-agents-india.html
  guides/real-estate-lead-cost-for-brokers.html
  guides/google-ads-for-real-estate-brokers.html
  guides/whatsapp-follow-up-real-estate-leads.html

Shell = an existing guide page, so they are the same product. Every rule is cited;
QDnCo figures are the ones already published on the homepage, with the same
labels. Idempotent. Run from Portfolio Website/:  python3 make-india-cp-guides.py
"""
import json, re, html, os

UPDATED = '2026-09-26'
T = open('dist/guides/meta-ads-for-real-estate-launches.html', encoding='utf-8').read()
E = html.escape
S = {
 'rera':   ('https://maharera.maharashtra.gov.in/guidance-for-agents-detail', 'MahaRERA — guidance for real estate agents'),
 'qr':     ('https://www.therealtytoday.com/news/maharera-makes-qr-code-registration-number-mandatory-in-ads-50000-penalty-for-violations/', 'The Realty Today — MahaRERA makes QR code and registration number mandatory in ads'),
 'trai':   ('https://trai.gov.in/tcccpr', 'TRAI — Telecom Commercial Communications Customer Preference Regulations'),
 'trai25': ('https://www.pib.gov.in/PressReleasePage.aspx?PRID=2102413', 'PIB — TRAI amendments to TCCCPR, February 2025'),
 'wa':     ('https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing', 'Meta — Pricing on the WhatsApp Business Platform'),
 'hbr':    ('https://hbr.org/2011/03/the-short-life-of-online-sales-leads', 'Harvard Business Review — The Short Life of Online Sales Leads, March 2011'),
}
def src(k): u, t = S[k]; return f'<a href="{u}" rel="noopener">{E(t)}</a>'
CTA = '''  <div class="cta-band">
    <h2>{h}</h2>
    <p>A Phase 0 call is a questionnaire, not a pitch. You get the market read before anyone spends a rupee on advertising.</p>
    <a href="../index.html#contact">Book a Phase 0 call &nearr;</a>
  </div>
'''
def keyfacts(items): return '<div class="keyfacts">' + ''.join(f'<div class="keyfact"><b>{E(a)}</b><span>{E(b)}</span></div>' for a, b in items) + '</div>'
def faq_html(faq):
    return ('<h2 id="faq">Questions channel partners ask</h2>\n<div class="faq">\n'
            + ''.join(f'    <details><summary>{E(q)}</summary><p>{E(a)}</p></details>\n' for q, a in faq) + '  </div>\n')
def related(items):
    return ('  <div class="related">\n    <h2>Related reading</h2>\n    <ul>\n'
            + ''.join(f'      <li><a href="{h}">{E(t)}<small>{E(d)}</small></a></li>\n' for h, t, d in items) + '    </ul>\n  </div>\n')
def crumbs(label): return (f'<nav class="crumbs" aria-label="Breadcrumb">\n    <a href="../index.html">Home</a><span>/</span>'
                           f'<a href="index.html">Guides</a><span>/</span>{E(label)}\n  </nav>')
OWN = ('Our own recent figures, published on our homepage: cost per form lead of ₹395–₹876 across four Bengaluru and Mysore '
       'campaigns between 24 August and 22 September 2026. These are form leads, not qualified leads or sales, and each covers one campaign only.')
HUB = ('real-estate-leads-for-channel-partners.html', 'Real estate lead generation for channel partners', 'The hub: every broker guide in one place.')
P = []

# ───────────────────────── 0. HUB ─────────────────────────
G = [
 ('how-to-get-real-estate-leads-without-portals.html', 'How to get real estate leads without portals', 'Own-account ads, WhatsApp, referrals, Google Business Profile and your database.'),
 ('facebook-ads-for-real-estate-agents-india.html', 'Facebook and Instagram ads for real estate agents in India', 'Account setup, forms that filter, budget and what to test first.'),
 ('google-ads-for-real-estate-brokers.html', 'Google Ads for real estate brokers', 'Keywords that buy, keywords that waste, and RERA on the landing page.'),
 ('real-estate-lead-cost-for-brokers.html', 'What a qualified lead costs a broker', 'The arithmetic from cost per lead to cost per booking, against your commission.'),
 ('whatsapp-follow-up-real-estate-leads.html', 'WhatsApp follow-up for real estate leads', 'Speed to lead, the 24-hour window and the rules on bulk messages.'),
]
FAQ0 = [
 ("How do channel partners get real estate leads in India?",
  "From five places: property portals, their own Meta and Google ads, WhatsApp and their existing contact database, referrals from past buyers, and local visibility such as a Google Business Profile. Portals are the fastest to start but the most shared. Own-account ads and a worked database give leads that are yours alone, and they compound."),
 ("Do channel partners need RERA registration to advertise?",
  "An agent facilitating sales in a RERA-registered project must register with the state RERA authority and quote that registration number, and must not facilitate sales in unregistered projects. The project's own RERA number must appear on its advertisements. Check your state authority's rules before a campaign runs."),
 ("What is a good cost per lead for a real estate broker?",
  "There is no single number. Ticket size, city, project and how strictly you define a lead all move it. Judge a source on cost per qualified lead and cost per booking against the commission you earn, not on cost per form fill. Our cost guide shows the arithmetic."),
 ("Should a broker buy leads or generate them?",
  "Bought leads are usually shared with other brokers and you cannot see how they were generated. Leads from your own ad account are exclusive, and the account keeps learning. Most brokers who scale do both at first, then shift budget to what their CRM shows actually books."),
]
BODY0 = crumbs('Real estate lead generation for channel partners') + f'''<p class="eyebrow">Channel partners &amp; brokers</p><h1>Real estate lead generation for channel partners and brokers in India</h1><p class="updated">Last updated {UPDATED} &middot; 6 min read</p><p class="lede">A channel partner earns on bookings, not on enquiries, so the only lead that matters is one that can book. This hub collects our working guides for brokers and channel partners: where leads come from, what they really cost, and how to follow them up before another broker does.</p>
{keyfacts([('5', 'lead sources worth running'), ('1 hour', 'the window that decides qualification, per HBR research'), ('₹395–₹876', 'our recent cost per form lead, four campaigns')])}
<h2 id="answer">The short answer</h2>
<div class="answer"><p><strong>Run your own lead engine beside the portals: Meta and Google ads from your own account, a landing page or instant form that filters on budget and timeline, a reply on WhatsApp within minutes, and a CRM that records which source books.</strong> Portals are useful but shared; leads from your own account are yours alone. Judge every source on cost per booking against your commission, not on cost per lead.</p></div>
<h2 id="sources">The five lead sources, and what each is for</h2>
<div class="tablewrap"><table>
<thead><tr><th>Source</th><th>Best for</th><th>Watch out for</th></tr></thead>
<tbody>
<tr><td>Portals (99acres, MagicBricks, Housing.com)</td><td>Buyers already searching listings; resale and rentals</td><td>The same buyer enquires with many brokers; speed decides who wins</td></tr>
<tr><td>Meta (Facebook, Instagram) from your account</td><td>New launches, payment offers, reaching buyers before they search</td><td>Instant forms fill cheaply unless they ask budget and timeline</td></tr>
<tr><td>Google Search from your account</td><td>People searching a project, locality or builder by name</td><td>Broad terms like "flats in Bangalore" spend fast on researchers</td></tr>
<tr><td>WhatsApp and your own database</td><td>Past enquirers, site visitors who did not book, investors</td><td>Bulk messages need consent and the right channel under TRAI and Meta rules</td></tr>
<tr><td>Referrals and local visibility</td><td>Highest trust; Google Business Profile reviews bring map searches</td><td>Slow to build; needs a system to ask every happy buyer</td></tr>
</tbody></table></div>
<h2 id="guides">The guides</h2>
<ul>
{"".join(f'<li><a href="{h}"><strong>{E(t)}</strong></a> — {E(d)}</li>' for h, t, d in G)}
</ul>
<h2 id="rules">The rules that apply to every source</h2>
<ul>
<li><strong>RERA registration.</strong> An agent facilitating sales in a registered project must hold a state RERA agent registration and must not facilitate sales in unregistered projects ({src('rera')}).</li>
<li><strong>Project RERA number on the ad.</strong> The project's registration number must appear on its advertising. Maharashtra goes further: since 1 August 2023 MahaRERA requires a QR code with the registration number on project ads ({src('qr')}). See <a href="rera-compliant-advertising.html">RERA-compliant advertising</a>.</li>
<li><strong>Bulk SMS and promotional calls.</strong> Commercial SMS must run through a DLT-registered header and template under TRAI's regulations, and unsolicited commercial calls are restricted ({src('trai')}).</li>
</ul>
<h2 id="who">Who we are, and what we do for brokers</h2>
<p>QDnCo runs research, creative testing and lead generation for developers and channel partners. We build campaigns in your own ad account and hand leads to your team; your team handles site visits, negotiation and closing. {OWN}</p>
{faq_html(FAQ0)}{related([(h, t, d) for h, t, d in G[:3]] + [('../compare/buying-leads-vs-generating-them.html', 'Buying leads vs generating them', 'When each one wins for a broker.')])}{CTA.format(h="Want a lead engine that is yours, not a portal’s?")}'''
P.append(dict(slug=HUB[0], label='Channel partner lead generation', eyebrow='Channel partners',
  title='Real Estate Leads for Channel Partners in India | QDnCo',
  desc='How channel partners and brokers in India get real estate leads: portals, own Meta and Google ads, WhatsApp, referrals, RERA rules and cost per booking.',
  headline='Real estate lead generation for channel partners and brokers in India', body=BODY0, faq=FAQ0))

# ───────────────────────── 1. WITHOUT PORTALS ─────────────────────────
FAQ1 = [
 ("Can a real estate agent get leads without 99acres or MagicBricks?",
  "Yes. Run Meta and Google ads from your own account to a form or landing page, work your existing database on WhatsApp with consent, ask every buyer for a referral, and build a Google Business Profile with reviews. These take longer to set up than a portal package but give leads no other broker receives."),
 ("What is the cheapest way to get real estate leads?",
  "Your own database and referrals, because the contacts already exist. Past enquirers who did not book and site visitors from earlier projects often convert on a new launch. The cheapest paid source varies by project; measure it by cost per booking, not cost per lead."),
 ("How many leads does a channel partner need per booking?",
  "It depends on the project, price and your team. We plan on 100 leads per closure until a sales team proves better. That is a planning assumption, not a benchmark. Track your own leads-to-site-visit and site-visit-to-booking rates for three months and use those."),
 ("Is Google Business Profile useful for a real estate broker?",
  "Yes, if your office is genuinely staffed and visited or you serve a defined area. Buyers search for brokers near a locality, and reviews from real clients build trust. Keep the name, address and phone identical everywhere, and ask every buyer for a review after possession or registration."),
]
BODY1 = crumbs('Real estate leads without portals') + f'''<p class="eyebrow">Channel partners &amp; brokers</p><h1>How to get real estate leads without portals: a channel partner's playbook</h1><p class="updated">Last updated {UPDATED} &middot; 8 min read</p><p class="lede">Portal leads are fast, but the buyer who fills one form usually fills five, and every broker on the listing calls them. The brokers who grow build a second engine that only they own: their own ads, their own database, and referrals that arrive already trusting them.</p>
{keyfacts([('5', 'owned lead channels'), ('1', 'ad account that should be in your own name'), ('100', 'leads per closure we plan on until your data says otherwise')])}
<h2 id="answer">The short answer</h2>
<div class="answer"><p><strong>Build five owned channels: Meta and Google ads from your own account, a working WhatsApp database, a referral routine, a Google Business Profile, and project-specific landing pages.</strong> Start with the database you already have, because it costs nothing, then add paid ads for each new mandate. Keep portals only where your CRM shows they book.</p></div>
<h2 id="database">1. Work the database you already have</h2>
<p>Most brokers hold thousands of past enquiries in phones, spreadsheets and old CRMs. A buyer who enquired about a 2 BHK in Whitefield last year and did not book is a better prospect for a new Whitefield launch than a stranger. Clean the list into one sheet with source, budget, locality and date. Message only people who gave consent to hear from you, and send each segment the one project that fits its budget and area rather than a blast of everything you sell.</p>
<h2 id="ads">2. Run ads from your own account</h2>
<p>An ad account, Facebook page and Google Ads account in your own brokerage's name are assets: every lead teaches the account who converts. Run one campaign per project, with the project's RERA number on the creative and your agent registration where your state requires it. Ask budget and timeline on the form so the form itself filters. Details: <a href="facebook-ads-for-real-estate-agents-india.html">Facebook ads for real estate agents</a> and <a href="google-ads-for-real-estate-brokers.html">Google Ads for brokers</a>.</p>
<h2 id="referrals">3. Make referrals a routine, not luck</h2>
<ul>
<li>Ask at the moment of highest goodwill: the day of booking, registration or handover.</li>
<li>Make it specific: "Who else in your office is looking in this area?"</li>
<li>Thank every referrer, whether or not the referral books, and record the source in your CRM.</li>
</ul>
<h2 id="gbp">4. Be findable on Google Maps</h2>
<p>A Google Business Profile puts your office in local searches such as "property broker near Sarjapur Road". It is only allowed where the business genuinely serves customers at that address or in a defined service area. Use the same name, phone and address everywhere, add photos of real site visits, and ask every client for a review.</p>
<h2 id="landing">5. One landing page per project</h2>
<p>A page with one project, one price basis, the RERA details and one form converts better than a list of every property you sell, and it lets you run Google ads without depending on the developer's website. Answer the questions buyers call to ask: price, configuration, possession date, location and payment plan.</p>
<h2 id="portals">Where portals still fit</h2>
<p>Keep a portal package if your CRM shows it produces bookings at a cost below what your own ads achieve. Respond to portal leads within minutes, because the buyer has contacted several brokers at once. Our answer on <a href="../answers/should-i-advertise-on-99acres-magicbricks-housing.html">whether to advertise on 99acres, MagicBricks and Housing</a> covers the trade-off.</p>
<h2 id="measure">Measure by booking, not by lead</h2>
<p>Tag every lead with its source from the first message, and record site visits and bookings against that source. After three months, move budget to the sources with the lowest cost per booking. {OWN}</p>
{faq_html(FAQ1)}{related([HUB, ('whatsapp-follow-up-real-estate-leads.html', 'WhatsApp follow-up for real estate leads', 'Speed to lead and the rules on bulk messages.'), ('real-estate-lead-cost-for-brokers.html', 'What a qualified lead costs a broker', 'From cost per lead to cost per booking.'), ('../compare/buying-leads-vs-generating-them.html', 'Buying leads vs generating them', 'When each one wins.')])}{CTA.format(h='Want your own lead engine set up?')}'''
P.append(dict(slug='how-to-get-real-estate-leads-without-portals.html', label='Leads without portals', eyebrow='Channel partners',
  title='How to Get Real Estate Leads Without Portals | QDnCo',
  desc='A channel partner playbook for real estate leads beyond 99acres and MagicBricks: your database, own ads, referrals, Google Business Profile, landing pages.',
  headline="How to get real estate leads without portals: a channel partner's playbook", body=BODY1, faq=FAQ1))

# ───────────────────────── 2. FACEBOOK ADS FOR AGENTS ─────────────────────────
FAQ2 = [
 ("How much should a real estate agent spend on Facebook ads in India?",
  "Set the test budget from the cost per lead you can afford and the number of leads you need to judge a campaign. For example, if you need about 60 leads to read results and expect ₹600 per lead, the test costs about ₹36,000 in media. Agree the cap before launch and scale only if leads qualify."),
 ("Should I use Facebook instant forms or a landing page?",
  "Instant forms produce more leads at a lower cost per lead; landing pages usually produce fewer, better ones. If you use instant forms, add a question on budget and one on timeline, and use Meta's higher-intent form type that adds a review step. Compare the two on cost per qualified lead."),
 ("Can I run ads for a project I am selling as a channel partner?",
  "Yes, if you are registered as an agent with the state RERA authority where required, the project is registered, and your mandate with the developer allows you to advertise. Show the project's RERA number and follow any developer brand guidelines in your agreement."),
 ("Why are my Facebook real estate leads fake or not answering?",
  "Usually the form is too easy. Pre-filled instant forms let people submit with one tap. Add qualifying questions, use the higher-intent form type, call within minutes, and send an automatic WhatsApp reply. Check that the ad states a price or price range so people outside the budget do not enquire."),
 ("Do I need to choose a special ad category for housing in India?",
  "Meta requires a special ad category for housing ads in certain countries, which narrows targeting. Check the prompt in Ads Manager when you create a campaign targeting India; if Meta asks for it, targeting options will be limited accordingly."),
]
BODY2 = crumbs('Facebook ads for real estate agents') + f'''<p class="eyebrow">Channel partners &amp; brokers</p><h1>Facebook and Instagram ads for real estate agents in India: setup, budget and lead quality</h1><p class="updated">Last updated {UPDATED} &middot; 9 min read</p><p class="lede">Meta ads can fill a broker's pipeline in a week, or fill it with people who never answer. The difference is not the creative. It is the account setup, the form, and how fast someone calls.</p>
{keyfacts([('3', 'form questions that filter: budget, timeline, locality'), ('60', 'leads to judge a test, as a working rule'), ('₹395–₹876', 'our recent cost per form lead, four campaigns')])}
<h2 id="answer">The short answer</h2>
<div class="answer"><p><strong>Run Meta ads from your own business account, one campaign per project, with the price range and RERA number on the creative, an instant form that asks budget and timeline, and a phone call plus WhatsApp reply within minutes.</strong> Set the test budget from the number of leads you need to judge the campaign, and scale only what your CRM shows qualifying.</p></div>
<h2 id="setup">Account setup that you own</h2>
<ol>
<li><strong>Business portfolio in your brokerage's name.</strong> Create the ad account, Facebook page and Instagram account under your own business, not a freelancer's personal profile. If an agency runs it, give it partner access.</li>
<li><strong>Pixel and Conversions API.</strong> Install the Meta pixel on your landing pages and connect your CRM so Meta learns which leads became site visits, not just which filled a form.</li>
<li><strong>Verify the domain and a payment method in your name</strong>, so the account and its history cannot be lost with a vendor.</li>
</ol>
<h2 id="structure">Campaign structure for a broker</h2>
<ul>
<li><strong>One campaign per project</strong>, so cost and quality are readable per mandate.</li>
<li><strong>Location by catchment, not by city.</strong> A Hebbal project draws buyers from specific localities and workplaces; target those and exclude areas that never book.</li>
<li><strong>Keep partner recruitment separate</strong> from buyer ads. Broker-network campaigns and end-buyer campaigns want different creative and cannot share a cost-per-lead target.</li>
<li><strong>Retarget people who watched your walkthrough video</strong> or opened the form without submitting.</li>
</ul>
<h2 id="form">A form that filters</h2>
<p>Instant forms convert because they are easy, which is also why they attract low intent. Add two or three questions: budget range, purchase timeline and preferred locality. Choose Meta's higher-intent form type, which adds a review screen before submission. Put the price range on the ad itself so buyers outside the budget filter themselves out.</p>
<h2 id="creative">Creative that sells a site visit</h2>
<ul>
<li>Lead with the reason to visit: price, payment plan, possession date or location, one per ad.</li>
<li>Show the project's RERA registration number, and follow state rules such as MahaRERA's QR code requirement for Maharashtra projects ({src('qr')}).</li>
<li>Use real walkthrough video where the developer allows it; it filters out brochure collectors.</li>
<li>Test one variable at a time, such as price-led against location-led for the same project.</li>
</ul>
<h2 id="budget">Setting the test budget</h2>
<p>Work backwards. Decide how many leads you need to judge a campaign, say about 60, and multiply by the cost per lead you expect. At ₹600 per lead that is about ₹36,000 of media for the test. Agree that cap before launch, and judge the result on qualified leads and site visits, not on the cost per lead alone. {OWN}</p>
<h2 id="follow">Follow-up decides the result</h2>
<p>Research on online leads found that companies which tried to contact a lead within an hour were nearly seven times as likely to qualify it as those that waited even an hour longer ({src('hbr')}). Send an automatic WhatsApp message the moment the form arrives and call within minutes. See <a href="whatsapp-follow-up-real-estate-leads.html">WhatsApp follow-up for real estate leads</a>.</p>
<h2 id="rules">Rules to check before you run</h2>
<ul>
<li>Your state RERA agent registration, and that the project is registered ({src('rera')}).</li>
<li>Your mandate with the developer allows you to advertise the project, and follows its brand rules.</li>
<li>Whether Meta asks you to declare a special ad category for the campaign; if it does, targeting narrows.</li>
</ul>
{faq_html(FAQ2)}{related([HUB, ('real-estate-lead-cost-for-brokers.html', 'What a qualified lead costs a broker', 'The arithmetic to judge any campaign.'), ('meta-ads-for-real-estate-launches.html', 'Meta Ads for real estate launches', 'The developer-side structure, for comparison.'), ('../answers/why-are-my-leads-bad.html', 'Why are my leads bad?', 'The usual causes, in order.')])}{CTA.format(h='Want Meta ads that fill site visits, not spreadsheets?')}'''
P.append(dict(slug='facebook-ads-for-real-estate-agents-india.html', label='Facebook ads for real estate agents', eyebrow='Channel partners',
  title='Facebook Ads for Real Estate Agents in India | QDnCo',
  desc='Facebook and Instagram ads for real estate agents in India: account setup, a form that filters, budget, creative, RERA rules and follow-up.',
  headline='Facebook and Instagram ads for real estate agents in India: setup, budget and lead quality', body=BODY2, faq=FAQ2))

# ───────────────────────── 3. LEAD COST FOR BROKERS ─────────────────────────
FAQ3 = [
 ("What is a good cost per lead for real estate in India?",
  "It varies with city, ticket size, project and how a lead is defined, so a single number is misleading. Our own cost per form lead across four Bengaluru and Mysore campaigns ranged from ₹395 to ₹876 between 24 August and 22 September 2026. Judge any figure on cost per qualified lead and cost per booking."),
 ("How do I calculate cost per qualified lead?",
  "Divide media spend by the number of leads that meet your written qualification definition. Equivalently, divide cost per lead by the qualification rate. At ₹600 per lead and 30% qualified, each qualified lead costs ₹2,000."),
 ("How much can a broker afford to spend per booking?",
  "Less than the commission the booking earns, after your team's costs. Divide your target marketing cost per booking by the number of qualified leads you need per booking to get the most you can pay per qualified lead."),
 ("Why is cost per lead a misleading number?",
  "Because the cheapest leads are often the least qualified. A campaign at ₹300 per lead with 10% qualified costs ₹3,000 per qualified lead; one at ₹800 with 50% qualified costs ₹1,600. The second is cheaper where it matters."),
]
BODY3 = crumbs('What a qualified lead costs a broker') + f'''<p class="eyebrow">Channel partners &amp; brokers</p><h1>What a qualified real estate lead costs a broker in India, and how to work out yours</h1><p class="updated">Last updated {UPDATED} &middot; 7 min read</p><p class="lede">Cost per lead is the number every vendor quotes and the one that matters least. A broker is paid on bookings, so the useful numbers are cost per qualified lead and cost per booking, measured against the commission the booking earns.</p>
{keyfacts([('₹395–₹876', 'our cost per form lead, four campaigns, Aug–Sep 2026'), ('÷', 'cost per lead ÷ qualification rate = cost per qualified lead'), ('100', 'leads per closure we plan on until your data says otherwise')])}
<h2 id="answer">The short answer</h2>
<div class="answer"><p><strong>Cost per qualified lead = cost per lead ÷ qualification rate. Cost per booking = cost per qualified lead × qualified leads needed per booking.</strong> A campaign is worth running when its cost per booking, plus any agency fee, sits comfortably below the commission a booking earns. Use your own CRM rates; published benchmarks rarely define a lead the same way you do.</p></div>
<h2 id="chain">The chain from lead to booking</h2>
<div class="tablewrap"><table>
<thead><tr><th>Step</th><th>Formula</th><th>Example (illustrative inputs)</th></tr></thead>
<tbody>
<tr><td>Cost per lead</td><td>Media spend ÷ leads</td><td>₹60,000 ÷ 100 = ₹600</td></tr>
<tr><td>Qualification rate</td><td>Qualified leads ÷ leads reviewed</td><td>30 ÷ 100 = 30%</td></tr>
<tr><td>Cost per qualified lead</td><td>Cost per lead ÷ qualification rate</td><td>₹600 ÷ 0.30 = ₹2,000</td></tr>
<tr><td>Qualified leads per booking</td><td>From your CRM history</td><td>15</td></tr>
<tr><td>Media cost per booking</td><td>Cost per qualified lead × qualified leads per booking</td><td>₹2,000 × 15 = ₹30,000</td></tr>
</tbody></table></div>
<p>The inputs in the example are illustrative, not benchmarks. Replace each with your own numbers.</p>
<h2 id="commission">Compare it with your commission</h2>
<p>Work out what one booking earns you after your team's costs, then set a ceiling on marketing cost per booking below that. Divide the ceiling by the qualified leads you need per booking to get the most you can pay for a qualified lead. For example, with a ₹1 crore unit and a hypothetical 2% commission, the booking earns ₹2 lakh; if you allow a quarter of that for marketing, the ceiling is ₹50,000 per booking. At 15 qualified leads per booking, you can afford about ₹3,300 per qualified lead. Use your actual commission terms.</p>
<h2 id="define">Define "qualified" before you count</h2>
<p>A qualified lead should meet all of: contactable within a set number of attempts, budget inside the project's price band, purchase timeline within six months, buying in or relocating to the project's area, and not already in your CRM. Our <a href="what-counts-as-a-qualified-lead.html">qualified-lead definition</a> is written out in full.</p>
<h2 id="levers">What lowers cost per booking</h2>
<ul>
<li><strong>A form that filters</strong> on budget and timeline, even if cost per lead rises.</li>
<li><strong>Speed:</strong> calling within minutes lifts the qualification rate without spending more ({src('hbr')}).</li>
<li><strong>Price on the ad</strong>, so buyers outside the budget do not enquire.</li>
<li><strong>Killing sources by booking, not by lead:</strong> move budget to what your CRM shows actually books.</li>
</ul>
<h2 id="ours">Our own numbers</h2>
<p>{OWN} Historical, owner-reported: ₹266 cost per lead with 51% qualified on one earlier North Bengaluru cohort, which is why we price our own work per qualified lead. Neither figure is a promise for a new campaign.</p>
{faq_html(FAQ3)}{related([HUB, ('cost-per-qualified-lead-real-estate.html', 'Cost per qualified lead for Indian real estate', 'The developer-side view of the same metric.'), ('../data/real-estate-cost-per-lead-benchmarks.html', 'Real estate lead costs: reported examples', 'Our published figures and their limits.'), ('../answers/how-many-leads-per-booking.html', 'How many leads per booking?', 'What to plan on before you have data.')])}{CTA.format(h='Want your cost per booking modelled before you spend?')}'''
P.append(dict(slug='real-estate-lead-cost-for-brokers.html', label='What a qualified lead costs a broker', eyebrow='Channel partners',
  title='Real Estate Lead Cost for Brokers in India | QDnCo',
  desc='What a qualified real estate lead costs a broker in India: from cost per lead to cost per booking against your commission, with worked formulas.',
  headline='What a qualified real estate lead costs a broker in India, and how to work out yours', body=BODY3, faq=FAQ3))

# ───────────────────────── 4. GOOGLE ADS FOR BROKERS ─────────────────────────
FAQ4 = [
 ("Can a real estate broker bid on a builder's project name on Google?",
  "Bidding on a project name is common, but the ad must not pretend to be the developer, and trademark complaints can limit using the brand in ad text. Check your mandate with the developer, say clearly that you are an authorised channel partner if you are, and show the project's RERA number on the landing page."),
 ("Which Google Ads keywords work for real estate brokers?",
  "Keywords naming a project, a locality with a configuration, or a builder in a locality usually carry intent, such as a project name plus 'price' or '3 BHK in' a named area. Broad terms like 'flats in Bangalore' or 'real estate' spend fast on researchers. Add negatives for rent, PG, jobs and loans unless you sell those."),
 ("Is Google Ads better than Facebook for a broker?",
  "They do different jobs. Google catches people already searching for a project or area; Meta reaches people before they search. Google usually costs more per lead and qualifies better. Run both where the budget allows and compare them on cost per booking."),
 ("How much budget does a broker need for Google Ads?",
  "Enough for each ad group to get meaningful clicks in a test window. Estimate clicks needed from your landing-page conversion rate and the leads you need to judge the test, then multiply by the likely cost per click. Cap spend before launch."),
]
BODY4 = crumbs('Google Ads for real estate brokers') + f'''<p class="eyebrow">Channel partners &amp; brokers</p><h1>Google Ads for real estate brokers in India: keywords, budget and compliance</h1><p class="updated">Last updated {UPDATED} &middot; 7 min read</p><p class="lede">Google Search reaches the buyer who has already decided on an area or a project and is typing its name. For a broker that is the highest-intent traffic available, and the easiest to waste on people who only want to know what a flat costs.</p>
{keyfacts([('3', 'keyword tiers kept in separate campaigns'), ('1', 'landing page per project, with its RERA number'), ('0', 'broad "real estate" keywords in a first campaign')])}
<h2 id="answer">The short answer</h2>
<div class="answer"><p><strong>Bid on project names, locality-plus-configuration searches and builder-plus-locality searches, in separate campaigns; send each to a project landing page with the RERA number and a short form; and add negative keywords for rent, PG, jobs and loans.</strong> Judge each campaign on cost per qualified lead and site visits from your CRM.</p></div>
<h2 id="tiers">Three keyword tiers</h2>
<div class="tablewrap"><table>
<thead><tr><th>Tier</th><th>Example searches</th><th>How to run it</th></tr></thead>
<tbody>
<tr><td>Project</td><td>A project name, alone or with "price", "floor plan", "possession"</td><td>Highest intent; exact and phrase match; project landing page</td></tr>
<tr><td>Locality + configuration</td><td>"3 BHK in Hebbal", "villa plots Sarjapur Road"</td><td>Good intent; a landing page showing the projects you hold there</td></tr>
<tr><td>Builder + locality</td><td>A developer's name with an area</td><td>Useful when you hold several of that developer's projects</td></tr>
</tbody></table></div>
<h2 id="negatives">Negative keywords to add on day one</h2>
<p>rent, rental, PG, hostel, jobs, career, salary, loan, EMI calculator, news, complaint, court case, and resale if you only sell primary inventory. Review the search terms report weekly and add every irrelevant query.</p>
<h2 id="landing">The landing page does half the work</h2>
<ul>
<li>One project, the price basis, configuration, possession date, and the project's RERA registration number and website, as RERA advertising rules require (<a href="rera-compliant-advertising.html">RERA-compliant advertising</a>).</li>
<li>For Maharashtra projects, the MahaRERA QR code ({src('qr')}).</li>
<li>Your agent RERA registration where your state requires it ({src('rera')}).</li>
<li>A short form or click-to-call, and a WhatsApp button that opens a pre-filled message.</li>
</ul>
<h2 id="brand">Using a developer's name</h2>
<p>Buyers search for project names, so brokers bid on them. Say plainly that you are an authorised channel partner if you are, never imply you are the developer, and check what your mandate allows. Trademark complaints can stop a brand name appearing in ad text.</p>
<h2 id="budget">Budget and measurement</h2>
<p>Estimate the clicks you need: if about 5% of visitors submit the form and you want 40 leads to judge a campaign, you need about 800 clicks. Multiply by the likely cost per click for the budget, and cap it before launch. Import site visits and bookings from your CRM as offline conversions so Google can learn which searches book. {OWN}</p>
{faq_html(FAQ4)}{related([HUB, ('google-ads-for-real-estate.html', 'Google Ads for real estate developers', 'The developer-side view, and the brand-term question.'), ('facebook-ads-for-real-estate-agents-india.html', 'Facebook ads for real estate agents', 'The other half of paid demand.'), ('../answers/meta-ads-vs-google-ads-real-estate.html', 'Meta Ads vs Google Ads for real estate', 'Which job each one does.')])}{CTA.format(h='Want search campaigns built on your projects?')}'''
P.append(dict(slug='google-ads-for-real-estate-brokers.html', label='Google Ads for real estate brokers', eyebrow='Channel partners',
  title='Google Ads for Real Estate Brokers in India | QDnCo',
  desc='Google Ads for real estate brokers in India: keyword tiers, negative keywords, project landing pages, RERA details, builder names and budget.',
  headline='Google Ads for real estate brokers in India: keywords, budget and compliance', body=BODY4, faq=FAQ4))

# ───────────────────────── 5. WHATSAPP FOLLOW-UP ─────────────────────────
FAQ5 = [
 ("How fast should a real estate lead be contacted?",
  "Within minutes. A widely cited Harvard Business Review study found firms that tried to contact a lead within an hour were nearly seven times as likely to qualify it as firms that waited even an hour longer, and more than 60 times as likely as those that waited a day or more."),
 ("Can I send bulk WhatsApp messages to my real estate leads?",
  "Only through the WhatsApp Business Platform with approved message templates, to people who have agreed to hear from you. Marketing templates are charged per delivered message. Replies inside the 24-hour window after a customer messages you are free non-template messages."),
 ("What should the first WhatsApp message to a lead say?",
  "Your name, your brokerage, the project they enquired about, and one easy question such as the best time to call. Attach the brochure or a short walkthrough only if they asked for it. Keep it short and personal."),
 ("How many times should I follow up with a real estate lead?",
  "Agree a sequence in advance, for example three call attempts over 48 hours alongside WhatsApp, then a slower nurture for leads with a longer timeline. Stop the moment someone asks you to, and record the outcome in your CRM."),
 ("Can I send promotional SMS to property leads?",
  "Commercial SMS in India must go through a DLT-registered sender header and template under TRAI's regulations, and should respect the recipient's preferences. Use a provider that handles DLT registration."),
]
BODY5 = crumbs('WhatsApp follow-up for real estate leads') + f'''<p class="eyebrow">Channel partners &amp; brokers</p><h1>WhatsApp follow-up for real estate leads: speed to lead, templates and the rules</h1><p class="updated">Last updated {UPDATED} &middot; 7 min read</p><p class="lede">Most real estate leads are lost after they arrive, not before. The buyer who filled a form at 9 pm has usually filled others, and the broker who replies first, on the app the buyer actually uses, gets the site visit.</p>
{keyfacts([('7×', 'more likely to qualify when contacted within an hour (HBR)'), ('24 h', 'window in which WhatsApp replies are free'), ('3', 'call attempts over 48 hours, as a working rule')])}
<h2 id="answer">The short answer</h2>
<div class="answer"><p><strong>Send an automatic, personal WhatsApp message the moment a lead arrives, call within minutes, and follow a written sequence of attempts over the next two days.</strong> Use the WhatsApp Business Platform for anything automated or at scale, with approved templates and the lead's consent, and log every outcome in your CRM.</p></div>
<h2 id="speed">Why minutes matter</h2>
<p>A Harvard Business Review study of online leads found that firms which tried to contact a lead within an hour were nearly seven times as likely to qualify it as those that tried an hour later, and more than 60 times as likely as those that waited 24 hours or longer ({src('hbr')}). The study was not about real estate, but a property buyer comparing brokers behaves the same way.</p>
<h2 id="sequence">A follow-up sequence that works</h2>
<ol>
<li><strong>Within a minute:</strong> automatic WhatsApp with your name, the project and one question.</li>
<li><strong>Within five minutes:</strong> first call. If unanswered, a short WhatsApp saying you tried.</li>
<li><strong>Same evening:</strong> second call at a time that suits working buyers.</li>
<li><strong>Next day:</strong> third call, then a message with the one thing they asked about: price, floor plan or site-visit slots.</li>
<li><strong>After 48 hours:</strong> move non-responders to a slower nurture, and record why each lead did or did not qualify.</li>
</ol>
<h2 id="templates">WhatsApp Business App or Platform?</h2>
<p>The free WhatsApp Business app suits one agent replying by hand. For automatic replies to ad leads, several agents on one number, or messages at scale, use the WhatsApp Business Platform through a provider. Since 1 July 2025 Meta charges the Platform per delivered template message, by category and the recipient's country; non-template replies sent inside the 24-hour customer service window are free ({src('wa')}). Marketing templates need the recipient's opt-in.</p>
<h2 id="first">What the first message should say</h2>
<ul>
<li>Your name and brokerage, and the project they asked about.</li>
<li>One easy question: "When is a good time to call?" or "Is your budget closer to ₹90 lakh or ₹1.2 crore?"</li>
<li>No wall of brochures. Send what they asked for.</li>
</ul>
<h2 id="rules">The rules on SMS and calls</h2>
<p>Commercial SMS in India must go through a DLT-registered header and template under TRAI's Telecom Commercial Communications Customer Preference Regulations, which also restrict unsolicited commercial calls ({src('trai')}). TRAI tightened these rules in February 2025 ({src('trai25')}). Call people who asked to be contacted about the project they enquired about, and stop when asked.</p>
<h2 id="crm">Close the loop in the CRM</h2>
<p>Record every attempt, reply, site visit and rejection reason against the lead's source. That is how you learn which campaigns book, and it is the data an agency needs to improve your leads. See <a href="real-estate-crm-and-lead-funnel.html">CRM and lead funnel setup</a>.</p>
{faq_html(FAQ5)}{related([HUB, ('../answers/how-fast-should-leads-be-called.html', 'How fast should a real estate lead be called?', 'Why three attempts and not one.'), ('real-estate-crm-and-lead-funnel.html', 'Real estate CRM and lead funnel setup', 'Where leads die, and how to stop it.'), ('facebook-ads-for-real-estate-agents-india.html', 'Facebook ads for real estate agents', 'Forms that filter before follow-up starts.')])}{CTA.format(h='Want leads answered in seconds, at any hour?')}'''
P.append(dict(slug='whatsapp-follow-up-real-estate-leads.html', label='WhatsApp follow-up for real estate leads', eyebrow='Channel partners',
  title='WhatsApp Follow-Up for Real Estate Leads | QDnCo',
  desc='How to follow up real estate leads on WhatsApp in India: reply within minutes, a 48-hour call sequence, Business Platform templates and TRAI rules.',
  headline='WhatsApp follow-up for real estate leads: speed to lead, templates and the rules', body=BODY5, faq=FAQ5))


def build(p):
    url = f"https://qdnco.com/guides/{p['slug']}"
    graph = {"@context": "https://schema.org", "@graph": [
      {"@type": "Article", "@id": url + "#article", "headline": p['headline'], "description": p['desc'],
       "datePublished": UPDATED, "dateModified": UPDATED, "inLanguage": "en-IN",
       "author": {"@id": "https://qdnco.com/#organization"}, "publisher": {"@id": "https://qdnco.com/#organization"},
       "mainEntityOfPage": url, "about": [{"@type": "Thing", "name": "Real estate lead generation"},
                                          {"@type": "Thing", "name": "Channel partners"}],
       "audience": {"@type": "BusinessAudience", "audienceType": "Real estate channel partners and brokers in India"}},
      {"@type": "BreadcrumbList", "@id": url + "#crumbs", "itemListElement": [
         {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://qdnco.com/"},
         {"@type": "ListItem", "position": 2, "name": "Guides", "item": "https://qdnco.com/guides/index.html"},
         {"@type": "ListItem", "position": 3, "name": p['label'], "item": url}]},
      {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
         {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p['faq']]},
    ]}
    s = T
    he = s.index('</head>'); head, rest = s[:he], s[he:]
    t, d = E(p['title']), E(p['desc'])
    for pat, new in [(r'<title>.*?</title>', f'<title>{t}</title>'),
                     (r'<meta name="description" content="[^"]*"\s*/?>', f'<meta name="description" content="{d}">'),
                     (r'<link rel="canonical" href="[^"]*"\s*/?>', f'<link rel="canonical" href="{url}">'),
                     (r'<meta property="og:title" content="[^"]*"\s*/?>', f'<meta property="og:title" content="{t}">'),
                     (r'<meta property="og:description" content="[^"]*"\s*/?>', f'<meta property="og:description" content="{d}">'),
                     (r'<meta property="og:url" content="[^"]*"\s*/?>', f'<meta property="og:url" content="{url}">')]:
        head, n = re.subn(pat, lambda m, new=new: new, head, count=1, flags=re.S)
        assert n == 1, (p['slug'], pat)
    head, n = re.subn(r'<script type="application/ld\+json">.*?</script>',
                      lambda m: '<script type="application/ld+json">' + json.dumps(graph, ensure_ascii=False) + '</script>', head, count=1, flags=re.S)
    assert n == 1
    page = head + rest
    a = page.index('<div class="page"><div class="wrap">') + len('<div class="page"><div class="wrap">')
    b = page.index('<footer class="foot">')
    page = page[:a] + p['body'] + '    ' + page[b:]
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', page, re.S): json.loads(m.group(1))
    open(f"dist/guides/{p['slug']}", 'w', encoding='utf-8').write(page)
    print(f"guides/{p['slug']:52s} {len(re.sub(r'<[^>]+>', ' ', p['body']).split())} words")

for p in P: build(p)

# guides index: a channel-partner group at the top
ip = 'dist/guides/index.html'; ix = open(ip, encoding='utf-8').read()
if HUB[0] not in ix:
    cards = ''.join(f'<a class="guide-card" href="{h}"><b>{E(t)}</b><span>{E(d)}</span></a>' for h, t, d in [HUB] + G)
    ix = ix.replace('<div class="guide-grid">', '<div class="guide-grid">' + cards, 1)
    open(ip, 'w', encoding='utf-8').write(ix)
    print('guides index: 6 channel-partner cards added')
