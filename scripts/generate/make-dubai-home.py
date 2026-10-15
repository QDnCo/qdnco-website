"""Builds dist/dubai/index.html — the Dubai homepage — from the India homepage.

Same page, same components, same design. Only what the Dubai ICP needs changes:
copy, AED pricing (owner floor ₹5–5.5 lakh/project/month in AED at FX below), Dubai FAQs +
schema, Trakheesi compliance, a new "Built for Dubai" section, form fields, footer.

Every replacement must match an exact count, so a change to the India page that
moves a string fails the build loudly instead of silently shipping India copy.

Run:  python3 scripts/generate/make-dubai-home.py   then   node scripts/build/prerender-page.mjs dubai/index.html
"""
import json, re, os, html as H

SRC = 'dist/index.html'
OUT = 'dist/dubai/index.html'
URL = 'https://qdnco.com/dubai/'
UPDATED = '2026-09-26'

# ── Pricing: owner floor ₹5–5.5 lakh per client per project per month, quoted in AED ──
# AED 1 = ₹26.17 (25 Sep 2026). Both plans floor at AED 20,000/month (≈ ₹5.23 lakh); media extra.
# Market check (Sep 2026): pay-per-lead AED 80–250/qualified lead; retainers AED 8–15k; mgmt 12–20% of media.
FX = 26.17
FLOOR_LO, FLOOR_HI = round(5.0e5 / FX), round(5.5e5 / FX)                      # 19,106 / 21,017
FLOOR = 20000
assert FLOOR_LO <= FLOOR <= FLOOR_HI, (FLOOR_LO, FLOOR_HI)
PPL, PPL60, PPL120 = 200, 180, 160          # per qualified lead; tiers above 150 and 250 a month
PPL_MIN = FLOOR // PPL                      # 100 qualified leads a month minimum = AED 20,000
T1, T2 = 150, 250
RET_LO = RET_HI = FLOOR
# Retainer is a flat monthly fee — no % of media, no upside (owner, 26 Sep 2026).
RET = f'AED {FLOOR:,}'

PIPE_AED_M = round(725e7 / FX / 1e6)                                           # ₹725 Cr → AED 277M
assert PIPE_AED_M == 277

s = open(SRC, encoding='utf-8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, f'{c}× (want {n}) {old[:90]!r}'
    s = s.replace(old, new)

# ── India-only additions (patch-india-for-dubai.py) are removed first ──
s = re.sub(r'\n    <link rel="alternate" hreflang="[^"]+" href="[^"]+" />', '', s)
s = re.sub(r'<script>/\* Region suggestion.*?</script>\n', '', s, flags=re.S)
assert 'hreflang' not in s and 'qd-region-dismissed' not in s

# ── 0. Drop the India prerender; the Dubai page is baked fresh ──
a = s.index('<div id="root">'); b = s.index('<script src="/js/lead-capture.js">')
s = s[:a] + '<div id="root"></div>\n' + s[b:]
assert s.count('<div id="root">') == 1

# ── 1. <head> ──
TITLE = 'Real Estate Marketing &amp; Lead Generation in Dubai | QDnCo'
DESC = ('India-to-Dubai real estate performance marketing, backed by original buyer and advertising research: Meta, Google, Trakheesi-ready ads, AED pricing.')
def hsub(pat, new):
    global s
    s, n = re.subn(pat, lambda m: new, s, count=1)
    assert n == 1, pat
hsub(r'<title>[^<]*</title>', f'<title>{TITLE}</title>')
hsub(r'<meta name="description" content="[^"]*" />', f'<meta name="description" content="{DESC}" />')
rep('<link rel="canonical" href="https://qdnco.com/" />',
    f'<link rel="canonical" href="{URL}" />\n'
    '    <link rel="alternate" hreflang="en-IN" href="https://qdnco.com/" />\n'
    f'    <link rel="alternate" hreflang="en-AE" href="{URL}" />\n'
    '    <link rel="alternate" hreflang="x-default" href="https://qdnco.com/" />')
a = s.index('    <!-- Geography.'); b = s.index('    <meta property="og:type"')
s = s[:a] + s[b:]   # geo.position would claim a Dubai location we do not have
rep('<meta property="og:locale" content="en_IN" />', '<meta property="og:locale" content="en_AE" />')
rep('<meta property="og:url" content="https://qdnco.com/" />', f'<meta property="og:url" content="{URL}" />')
hsub(r'<meta property="og:title" content="[^"]*" />', f'<meta property="og:title" content="{TITLE}" />')
hsub(r'<meta name="twitter:title" content="[^"]*" />', f'<meta name="twitter:title" content="{TITLE}" />')
hsub(r'<meta property="og:description" content="[^"]*" />', f'<meta property="og:description" content="{DESC}" />')
hsub(r'<meta name="twitter:description" content="[^"]*" />', f'<meta name="twitter:description" content="{DESC}" />')

s = s.replace('https://qdnco.com/og/og-india.jpg', 'https://qdnco.com/og/og-dubai.jpg')
s = s.replace('QDnCo — real estate performance marketing, priced per qualified lead', 'QDnCo Dubai — real estate lead generation, paid only if qualified')
assert s.count('og-dubai.jpg') == 2, s.count('og-dubai.jpg')

# ── 2. Relative paths → root-absolute (the page now lives one folder down) ──
DIRS = 'brands|shots|legal|work|guides|data|pricing|glossary|compare|dubai|areas|answers|js|team|adreel'
s, nrel = re.subn(rf'''(["'])(?:\./)?({DIRS})/''', r'\1/\2/', s)
assert nrel > 40, nrel

# ── 3. Ticker, hero (light + dark) ──
rep('''              Live
            </span>''', '''              Live · India
            </span>''', n=2)
rep('''    "mark": "₹",
    "n": "725",
    "suffix": "Cr",
    "k": "Pipeline influence\\nto date*"''', f'''    "mark": "AED",
    "n": "{PIPE_AED_M}",
    "suffix": "M",
    "k": "India pipeline\\ninfluence to date*"''')
rep('"k": "Projects currently\\nactive*"', '"k": "Projects active\\nin India*"')
rep("const HERO_LIGHT_WORDS = ['Priced', 'Per Qualified', 'Lead'];",
    "const HERO_LIGHT_WORDS = ['Dubai Leads', 'Paid If', 'Qualified'];")
rep('<p className="metrics-attribution">*Pipeline influence is not booked revenue.</p>',
    f'<p className="metrics-attribution">*India figures. AED at ₹{FX}. Pipeline influence is not booked revenue.</p>')
rep('              Real estate marketing for developers and channel partners\n',
    '              Dubai real estate lead generation for brokers and developers\n')
rep('            India experience · Dubai enquiries\n', '            Dubai · UAE · Run remotely from Bengaluru\n')
rep('text="Your property portfolio. Our lead-generation system."',
    'text="Your Dubai inventory. Our lead-generation system."')
for key in ('HERO_PROOF', 'INTRO_STATS'):
    rep(f'''const {key} = [
  {{
    "v": "₹725 Cr",
    "k": "Pipeline influence to date"
  }},
  {{
    "v": "43+",
    "k": "Projects currently active"
  }},''', f'''const {key} = [
  {{
    "v": "AED {PIPE_AED_M}M",
    "k": "India pipeline influence"
  }},
  {{
    "v": "43+",
    "k": "Projects active in India"
  }},''')
rep('<p className="metrics-attribution">Pipeline influence is not booked revenue.</p>',
    f'<p className="metrics-attribution">India figures, AED at ₹{FX}. Pipeline influence is not booked revenue.</p>')
rep("        Marketing experience across leading developer projects\n",
    "        Proof from India's leading developer projects\n")

# ── 4. Intro card ──
rep('''                Build buyer demand,{' '}''', '''                Build Dubai demand,{' '}''')
rep('''                We&apos;re QDnCo. We build real estate marketing for developers and channel partners —
                research, positioning, creative testing and lead generation. India experience. Dubai engagements begin with market discovery. Your team handles sales.''',
    '''                We&apos;re QDnCo. We build real estate lead generation for Dubai brokerages, developers and agents —
                research, positioning, creative testing and campaigns, with the Trakheesi permit designed into every ad. Our delivered work is in India; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original Dubai market research. Your agents handle sales.''')
rep('<p className="intro-metrics-note">Qualification covers overall leads generated; pipeline influence is not booked revenue.</p>',
    '<p className="intro-metrics-note">Figures are from our India work. Qualification covers overall leads generated; pipeline influence is not booked revenue.</p>')
rep("['SNAPCHAT ADS', 0], ['CHATGPT ADS', 0], ['JIO ADS', 0],", "['SNAPCHAT ADS', 0], ['CHATGPT ADS', 0], ['TRAKHEESI-READY CREATIVE', 0],")

# ── 5. Services — Dubai wording, same nine cards ──
for old, new in [
    ("'Channel-partner and end-buyer demand run as separate pools'", "'UAE-resident and overseas-investor demand run as separate pools'"),
    ("'Every rupee traceable to a source'", "'Every dirham traceable to a source'"),
    ("'Python scrapers pull Meta Ad Library and Google Ads Transparency on a schedule'",
     "'Python scrapers pull Meta Ad Library and Google Ads Transparency for Dubai advertisers on a schedule'"),
    ("'Nothing enters production without written sign-off; RERA-compliant from the brief onward'",
     "'Nothing enters production without written sign-off; DLD permit number and QR planned into the layout from the brief'"),
    ("'Answers website chat, voice and WhatsApp in seconds, 11pm included'",
     "'Answers website chat, voice and WhatsApp in seconds, across UAE and India hours'"),
    ("'Qualifies on budget, locality, possession timeline and financing before a call'",
     "'Qualifies on budget, community, handover timeline, cash or mortgage, and residency before a call'"),
    ("'RERA number, pricing basis and disclaimers placed where the rules require them'",
     "'Trakheesi permit number, QR code, pricing basis and disclaimers placed where the rules require them'"),
    ("'Analytics and conversion tracking live before the first rupee of media'",
     "'Analytics and conversion tracking live before the first dirham of media'"),
    ("'One pipeline for Meta, Google, portal, website and WhatsApp leads'",
     "'One pipeline for Meta, Google, Bayut, Property Finder, website and WhatsApp leads'"),
    ("'Stages tracked from enquiry to qualified lead to site visit to booking'",
     "'Stages tracked from enquiry to qualified lead to viewing to reservation'"),
    ("means:'Secondary research means reading the entire market before a rupee is committed.'",
     "means:'Secondary research means reading the entire market before a dirham is committed.'"),
    ("'Full-funnel structure — TOF / MOF / BOF / RTG','Creative script pack",
     "'Full-funnel structure — TOF / MOF / BOF / RTG','Trakheesi permit and QR placement agreed per creative','Creative script pack"),
]:
    rep(old, new)

# ── 6. Projects: honest framing for a Dubai reader ──
rep("note:'Developer-project marketing through client and agency portfolios. Project scale and campaign outcomes are labelled separately.'",
    "note:'Our delivered real-estate acquisition work is in India; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original Dubai market research. We have not yet run a Dubai campaign. Every project below carries an evidence ledger, and project scale and campaign outcomes are labelled separately.'")

# ── 7. Pricing — AED, India card less 20% ──
rep("""    price: '₹550',
    unit: 'per qualified lead',""", f"""    price: 'AED {PPL}',
    unit: 'per qualified lead',""")
rep("'Qualified means all five: contactable, budget-matched, timeline under six months, in catchment, not a duplicate'",
    "'Qualified means all five: contactable, budget-matched in AED, buying within six months, right community or investor profile, not a duplicate'")
rep("'You own the ad account, so the media invoice is your own proof of every rupee'",
    "'You own the ad account, so the media invoice is your own proof of every dirham'")
rep("'₹495 above 60 leads a month, ₹450 above 120 · 60 qualified leads a month minimum'",
    f"'AED {PPL60} above {T1} leads a month, AED {PPL120} above {T2} · {PPL_MIN} qualified leads a month minimum (AED {PPL*PPL_MIN:,})'")
rep("""    price: '₹75,000 – ₹1,00,000',
    unit: 'per month, flat fee',""", f"""    price: '{RET}',
    unit: 'per month, flat fee',""")
rep("'Weekly reporting on spend, cost per qualified lead, lead quality and site visits'",
    "'Weekly reporting on spend, cost per qualified lead, lead quality and viewings'")
rep('          Most developers start here\n', '          Most brokerages start here\n')
rep('''            Two ongoing engagement models, with scope and billing agreed before we start. If you have not
            worked with us before, use the published terms to assess fit before a call.''',
    '''            Two ongoing engagement models, billed in AED, with scope and billing agreed before we start. If you
            have not worked with us before, use the published terms to assess fit before a call.''')
rep('''          Every project is checked for RERA registration before a single ad goes live.''',
    '''          Every Dubai ad is checked for a valid DLD advertising permit before it goes live.''')

# India pricing rationale lives in a code comment; not for the Dubai page source
s = re.sub(r' \* Market Intelligence/pricing_recommendation\.md for how each number was derived —\n(?: \*[^\n]*\n)*?(?= \*/| \*\n)', ' * Market Intelligence/pricing_recommendation.md for how each number was derived.\n', s, count=1)

# ── 8. FAQs (visible + FAQPage schema from the same list) ──
FAQS = [
 ("How do you market an off-plan project in Dubai?",
  "Research first, media second. Every engagement starts with a business questionnaire and three research tracks: interviews with the buyers you actually sell to, desk research on competing launches, pricing, payment plans and the Meta Ad Library, and a review of what your past campaigns did. Campaigns are then built across Meta and Google with UAE residents and overseas investors in separate pools, the DLD permit number and QR designed into every creative, and spend scaled only after cost per qualified lead holds for a full test window."),
 ("What does every Dubai property ad need before it goes live?",
  "A Dubai Land Department real estate advertising permit, applied for through the Trakheesi system, with the permit number shown in the ad. DLD also requires the Madmoun QR code linked to that permit on real estate advertisements. DLD lists the fee as AED 1,000 per permit and AED 5,000 for a project-launch event permit, plus a AED 20 Knowledge and Innovation fee. Portals such as Bayut and dubizzle will not publish a listing without a permit."),
 ("Who applies for the Trakheesi permit, you or us?",
  "You do. The permit is issued to the licensed brokerage or developer, and a broker applies with its marketing contract from the owner. QDnCo is not a licensed broker and does not apply for permits. We plan the permit into the creative from the brief, so every ad carries the right number and QR from day one and nothing has to be rebuilt after approval."),
 ("What is a good cost per lead for real estate in Dubai?",
  "There is no single reliable number. Community, ticket size, off-plan versus ready, the audience's country and the qualification definition all move it, and published Dubai figures vary widely because they measure different things. We will not publish a Dubai benchmark until we have our own campaign data. Judge any agency on cost per accepted qualified lead from your CRM, not on cost per form fill."),
 ("What exactly counts as a qualified lead?",
  "All five conditions, written into the contract: contactable by phone or WhatsApp within three attempts over 48 hours; budget stated in AED inside the project's price band; buying within six months; the right community, or a matching investor profile for overseas buyers; and not already in your CRM within 90 days. A lead that fails is replaced free if you flag it within seven days. Call recordings and CRM status are the shared evidence."),
 ("How much do you charge in Dubai?",
  f"Two published models, billed in AED. Pay per qualified lead: AED {PPL} per lead that meets the five-point definition, AED {PPL60} above {T1} a month and AED {PPL120} above {T2}, with a minimum of {PPL_MIN} a month (AED {PPL*PPL_MIN:,}). Monthly Retainer: {RET} a month, one flat fee, minimum three months. Media spend is separate and paid by you directly to Meta and Google."),
 ("Who pays for the ad spend, you or us?",
  "You do, directly to Meta and Google. The ad account stays in your brokerage's or company's name, so you remain the advertiser of record under the permit, media costs are visible to you rather than bundled, and a falling cost per lead shows up on your own invoice. Our fee is separate and covers the work, not the media."),
 ("Do you have an office or a licence in Dubai?",
  "No. QDnCo works from Bengaluru, India, and serves Dubai clients remotely. We do not hold a RERA broker licence and we do not sell property. We build and run the marketing inside your accounts and under your permits; your agents handle viewings, negotiation and closing."),
 ("Have you run campaigns in Dubai before?",
  "Not yet. Our delivered real-estate acquisition work is in India, across ten developer brands; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original research: an audit of 984 Dubai property ads in the UAE and 521 shown in India. Every Dubai engagement starts with Phase 0, a market read you can judge before any retainer, and every India figure on this page is labelled as India. We will publish our first India→Dubai results, labelled, when we have them."),
 ("Do you work with agents and brokerages as well as developers?",
  "Yes. Brokerages holding off-plan mandates, independent agents and channel partners running under their own licence, and developers launching off-plan all fit. Campaigns run from your own ad account and brand, so the leads are yours alone and are not resold to other agents."),
 ("How do you reach Indian buyers for Dubai property?",
  "Indian nationals were the largest foreign buyer group in Dubai in 2025, around 22% of foreign purchases according to brokerage analysis of DLD data. We already run campaigns to Indian property buyers every week, so we run India-side campaigns for Dubai inventory as a separate pool: city-level targeting, creative that answers the questions Indian buyers ask about ownership, payment plans and remittance, and follow-up timed for India, which is 90 minutes ahead of Dubai."),
 ("Can an agent promote listings on their personal Instagram?",
  "Individuals who advertise on social media in the UAE need an Advertiser Permit from the UAE Media Council, and the property ad still needs its DLD permit. Confirm the current scope for your case with the Media Council and your brokerage's compliance team before posting."),
 ("Which platforms work best for Dubai property?",
  "Meta and Google carry most paid demand: Meta for discovery and off-plan launches, Google for high-intent searches on communities, developers and project names. Portals such as Bayut, Property Finder and dubizzle stay with your listings team; we route their leads into the same CRM. LinkedIn suits high-ticket and investor audiences, and Snapchat is used where the buyer profile justifies it. The research decides the mix."),
 ("How long does it take to see results?",
  "You are live in market from roughly week six. The questionnaire, research and campaign architecture take about five to six weeks, then a month of live A/B testing produces the scale playbook. By month three the funnel, CRM routing and weekly dashboard are running and repeatable."),
 ("What reporting do you provide?",
  "A weekly dashboard and report covering spend, cost per lead, lead quality, sales-ready percentage, viewings, creative approvals and every budget-scaling decision. No metric that cannot be traced to a source."),
 ("Do you charge extra for more ad creatives?",
  "No. Both plans include fifteen static AI-generated creatives a month plus AI ad copy, regenerated on fatigue without a separate creative invoice. Studio production such as shoots, drone, UGC and motion graphics is a separate package, quoted per project and approved before commissioning."),
]
a = s.index('const FAQS = ['); b = s.index('function FAQSection()')
js_faqs = 'const FAQS = [\n' + ''.join(f'  {{ q: {json.dumps(q, ensure_ascii=False)},\n    a: {json.dumps(x, ensure_ascii=False)} }},\n' for q, x in FAQS) + '];\n\n'
s = s[:a] + js_faqs + s[b:]

# ── 9. Footer ──
a = s.index('const FOOTER_NAV = ['); b = s.index('function CtaFooter()')
s = s[:a] + f'''const FOOTER_NAV = [
  {{
    h: 'Offers',
    links: [
      {{ l: 'Pay per Qualified Lead — AED {PPL}', h: '#pricing' }},
      {{ l: 'Monthly Retainer', h: '#pricing' }},
      {{ l: 'Creative add-ons', h: '#pricing' }},
    ],
  }},
  {{
    h: 'The work',
    links: [
      {{ l: 'Built for Dubai', h: '#dubai' }},
      {{ l: 'Services', h: '#services' }},
      {{ l: 'Projects', h: '#projects' }},
      {{ l: 'Ad creative', h: '#adreel' }},
      {{ l: 'How we work together', h: '#roadmap' }},
      {{ l: 'Questions', h: '#faq' }},
    ],
  }},
  {{
    h: 'Dubai guides',
    links: [
      {{ l: 'Indian buyers for Dubai property', h: '/dubai/indian-real-estate-performance-marketing-agency/' }},
      {{ l: 'India → Dubai buyer report 2026', h: '/data/india-dubai-buyer-acquisition-report.html' }},
      {{ l: 'Dubai real estate marketing', h: '/dubai/real-estate-marketing/' }},
      {{ l: 'Trakheesi permits for marketers', h: '/dubai/trakheesi-permit-guide/' }},
      {{ l: 'Lead generation for Dubai brokers', h: '/dubai/real-estate-lead-generation/' }},
      {{ l: 'Selling Dubai property to Indian buyers', h: '/dubai/indian-buyers/' }},
      {{ l: 'Off-plan launch marketing', h: '/dubai/off-plan-launch-marketing/' }},
      {{ l: 'Dubai Meta ad audit (original research)', h: '/data/meta-ad-library-audit-dubai-real-estate.html' }},
      {{ l: 'Lead generation from India', h: '/dubai/property-lead-generation-from-india/' }},
      {{ l: 'NRI and HNI marketing', h: '/dubai/nri-hni-real-estate-marketing/' }},
      {{ l: 'Off-plan for Indian buyers', h: '/dubai/off-plan-marketing-indian-buyers/' }},
      {{ l: 'Meta & Google Ads from India', h: '/dubai/meta-google-ads-dubai-property-india/' }},
    ],
  }},
  {{
    h: 'India work',
    links: [
      {{ l: 'QDnCo India', h: '/' }},
      {{ l: 'About QDnCo', h: '/about/' }},
      {{ l: 'All case studies', h: '/work/index.html' }},
      {{ l: 'Indium — ₹266 CPL at 51%', h: '/work/indium-north-bangalore.html' }},
      {{ l: 'Kumar Platina', h: '/work/kumar-platina.html' }},
      {{ l: 'Meta Ad Library audit — 41 agencies', h: '/data/meta-ad-library-audit-bangalore-agencies.html' }},
      {{ l: 'All guides', h: '/guides/index.html' }},
    ],
  }},
  {{
    h: 'Legal',
    links: [
      {{ l: 'Privacy Policy', h: '/legal/privacy.html' }},
      {{ l: 'Terms of Use', h: '/legal/terms.html' }},
      {{ l: 'Cookie Policy', h: '/legal/cookies.html' }},
      {{ l: 'Disclaimer', h: '/legal/disclaimer.html' }},
      {{ l: 'Refunds & Cancellation', h: '/legal/refund.html' }},
    ],
  }},
];

''' + s[b:]
rep('before anyone spends a rupee', 'before anyone spends a dirham')
rep('                Bangalore &amp; Mysore, Karnataka.\n', '                Based in Bengaluru, India. Serving Dubai and the UAE remotely.\n')
rep('                Every project is checked for RERA registration before a single ad runs.\n',
    '                Every Dubai ad is checked for a valid DLD advertising permit before it runs.\n')

# ── 10. Lead form ──
rep("""  'Under ₹1L / month',
  '₹1L – ₹3L / month',
  '₹3L – ₹6L / month',
  '₹6L+ / month',""", """  'Under AED 10k / month',
  'AED 10k – 25k / month',
  'AED 25k – 60k / month',
  'AED 60k+ / month',""")
rep('placeholder="+91 88611 79992" />', 'placeholder="+971 50 123 4567" />')
rep('<span>Catchment</span>', '<span>Community / area</span>')
rep('placeholder="Sarjapur, North Bangalore, Mysore…" />', 'placeholder="Dubai Marina, JVC, Business Bay…" />')
rep("encodeURIComponent('Website enquiry — '", "encodeURIComponent('Dubai website enquiry — '")

# ── 11. Nav + the new section ──
rep("""  { l: 'Home', h: '#top' },
  { l: 'Services', h: '#services' },""", """  { l: 'Home', h: '#top' },
  { l: 'Dubai', h: '#dubai' },
  { l: 'Services', h: '#services' },""")
rep("  top: '#top', intro: '#top', services: '#services',", "  top: '#top', intro: '#top', dubai: '#dubai', services: '#services',")

DUBAI_SECTION = r'''
/* ═══════════ DUBAI — who, what every ad needs, and the India corridor ═══════════
 * The one section the India page does not have. Three blocks, each answering a
 * question a Dubai broker asks before anything else: is this for me, do you know
 * the permit rules, and why a Bengaluru team. */
const DUBAI_ICP = [
  { k: '01', t: 'Brokerages', s: 'Off-plan mandates · secondary stock',
    d: 'Launch-window volume for the projects you hold and a steady flow for secondary listings, scored against a written definition before it reaches your agents.' },
  { k: '02', t: 'Developers', s: 'Off-plan launches · sales centres',
    d: 'Research-led positioning and full-funnel campaigns feeding your sales centre and broker network with enquiries they can actually work.' },
  { k: '03', t: 'Agents & channel partners', s: 'Your licence · your brand',
    d: 'Campaigns run from your own licensed account under your permits. The leads are yours alone, never a shared pool resold to five other agents.' },
  { k: '04', t: 'Selling to Indian buyers', s: 'The largest foreign buyer group',
    d: 'India-side campaigns for Dubai inventory: city-level targeting, answers to the ownership and payment-plan questions Indian buyers ask, and follow-up timed to IST.' },
];
const PERMIT_STEPS = [
  { n: '01', t: 'Marketing contract', d: 'Your licensed brokerage holds a marketing contract with the owner or developer for the unit or project.' },
  { n: '02', t: 'Trakheesi permit', d: 'You apply to the Dubai Land Department. AED 1,000 per permit, AED 5,000 for a launch event, plus AED 20.' },
  { n: '03', t: 'Permit number + QR on the ad', d: 'We design the permit number and Madmoun QR into the creative from the brief, not stamped on after approval.' },
  { n: '04', t: 'Live on every channel', d: 'Meta, Google and landing pages go live under that permit. Bayut and dubizzle need it to publish a listing too.' },
];
const CORRIDOR = [
  { v: '~22%', k: 'Share of foreign Dubai purchases by Indian nationals in 2025, brokerage analysis of DLD data',
    src: 'https://www.benhams.ae/news/property-advice/whos-buying-in-dubai-2025-recap/' },
  { v: '90 min', k: 'India runs ahead of Dubai. Follow-up windows are planned for both time zones', src: null },
  { v: '43+', k: 'Projects we are running for Indian buyers right now', src: null },
];

const WHY_QD = [
  { t: 'Indian real-estate acquisition', d: 'Fourteen residential campaigns across ten developer brands, each with an evidence ledger.', h: '/work/index.html', l: 'Case studies' },
  { t: 'Indian buyer understanding', d: 'Campaigns built around how Indian buyers decide: price bands, payment plans and trust signals.', h: '/guides/real-estate-leads-for-channel-partners.html', l: 'India guides' },
  { t: 'India-city segmentation', d: 'Targeting planned from where interest concentrates: Delhi, Haryana, Goa, Maharashtra, Karnataka.', h: '/data/india-dubai-buyer-acquisition-report.html#s1', l: 'State and city data' },
  { t: 'Dubai-specific research', d: 'Our own audits of 984 Dubai property ads in the UAE and 521 shown in India.', h: '/data/india-dubai-buyer-acquisition-report.html', l: 'The report' },
  { t: 'DLD-aware construction', d: 'Permit number and Madmoun QR designed into every creative from the brief.', h: '/dubai/trakheesi-permit-guide/', l: 'Trakheesi guide' },
  { t: 'Qualified-lead economics', d: 'Optimised against a written five-point qualified-lead definition, not form fills.', h: '#pricing', l: 'AED pricing' },
  { t: 'CRM and WhatsApp', d: 'Leads routed to your CRM and answered on WhatsApp within minutes, in IST and GST.', h: '/dubai/property-lead-generation-from-india/', l: 'The funnel' },
];

function DubaiSection() {
  const card = { background: 'var(--veil)', border: '1px solid rgba(var(--ink-rgb),0.18)' };
  const up = (i) => ({ initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 }, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } });
  const kicker = { color: 'rgba(var(--ink-rgb),0.7)', letterSpacing: '0.16em', fontSize: 'var(--fs-micro)' };
  const body = { color: 'rgba(var(--ink-rgb),0.9)', fontSize: 'var(--fs-text)', lineHeight: 1.5 };
  const h3 = { color: 'var(--ink)', fontSize: 'clamp(1.6rem, 3.6vw, 2.9rem)', lineHeight: 0.95 };
  return (
    <section id="dubai" className="relative px-4 sm:px-7 md:px-10 pb-20 sm:pb-24 md:pb-28"
             style={{ background: 'var(--veil)', paddingTop: 'calc(var(--chrome-clear) + clamp(0.5rem, 2vh, 1.5rem))' }}>
      <SeamFade edge="top" />
      <SeamFade edge="bottom" />
      <div className="relative z-10 mx-auto" style={{ maxWidth: 'var(--content-max)' }}>

        <motion.div {...up(0)} className="text-center">
          <h2 className="font-black uppercase"
              style={{ color: 'var(--ink)', fontSize: 'clamp(2.3rem, 8.5vw, 118px)', lineHeight: 0.9 }}>Built for Dubai</h2>
          <p className="font-light max-w-2xl mx-auto mt-3"
             style={{ color: 'rgba(var(--ink-rgb),0.92)', fontSize: 'var(--fs-text-lg)' }}>
            Who we work with, what every Dubai property ad needs before it runs, and why a team that
            already markets to Indian buyers every week.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 mt-11 sm:mt-14"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
          {DUBAI_ICP.map((c, i) => (
            <motion.article key={c.k} {...up(i)} className="rounded-[26px] flex flex-col"
                            style={{ ...card, padding: 'clamp(1.3rem, 1.8vw, 1.8rem)' }}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-black tabular-nums"
                      style={{ color: 'rgba(var(--ink-rgb),0.55)', fontSize: 'clamp(1.3rem,1.8vw,1.8rem)', lineHeight: 1 }}>{c.k}</span>
                <span className="font-body uppercase text-right" style={kicker}>{c.s}</span>
              </div>
              <h3 className="font-semibold uppercase mt-3"
                  style={{ color: 'var(--ink)', fontSize: 'clamp(1.2rem,1.7vw,1.55rem)', lineHeight: 1.05 }}>{c.t}</h3>
              <p className="font-body mt-3" style={body}>{c.d}</p>
            </motion.article>
          ))}
        </div>

        <motion.div {...up(0)} className="rounded-[30px] mt-6 sm:mt-8"
                    style={{ ...card, background: 'rgba(var(--fill-rgb),0.06)', padding: 'clamp(1.4rem, 3vw, 2.6rem)' }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="font-body uppercase" style={kicker}>Compliance, before creative</p>
              <h3 className="font-black uppercase mt-2" style={h3}>Every ad carries its Trakheesi permit</h3>
            </div>
            <a href="/dubai/trakheesi-permit-guide/" className="font-body font-medium inline-flex items-center gap-2 shrink-0"
               style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 'var(--fs-caption)' }}>
              Read the Trakheesi guide for marketers <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <ol className="grid gap-4 mt-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))' }}>
            {PERMIT_STEPS.map((p) => (
              <li key={p.n} className="pt-4" style={{ borderTop: '2px solid rgba(var(--ink-rgb),0.35)' }}>
                <p className="font-black tabular-nums" style={{ color: 'var(--accent)', fontSize: 'var(--fs-caption)' }}>{p.n}</p>
                <p className="font-semibold uppercase mt-1" style={{ color: 'var(--ink)', fontSize: 'var(--fs-text)', letterSpacing: '0.02em' }}>{p.t}</p>
                <p className="font-body mt-2" style={{ ...body, color: 'rgba(var(--ink-rgb),0.8)' }}>{p.d}</p>
              </li>
            ))}
          </ol>
          <p className="font-body mt-6" style={{ color: 'rgba(var(--ink-rgb),0.66)', fontSize: 'var(--fs-micro)', lineHeight: 1.5 }}>
            Sources: <a href="https://dubailand.gov.ae/en/eservices/real-estate-ad-permit/" rel="noopener" style={{ color: 'inherit' }}>Dubai Land Department, Real Estate Ad Permit</a> ·{' '}
            <a href="https://dubailand.gov.ae/en/news-media/dubai-land-department-strengthens-transparency-with-ai-enabled-real-estate-advertising-governance" rel="noopener" style={{ color: 'inherit' }}>DLD advertising governance update, April 2025</a>.
            QDnCo is not a licensed broker; permits are issued to your brokerage or developer.
          </p>
        </motion.div>

        <motion.div {...up(0)} className="rounded-[30px] mt-6 sm:mt-8" style={{ ...card, padding: 'clamp(1.4rem, 3vw, 2.6rem)' }}>
          <p className="font-body uppercase" style={kicker}>The India–Dubai corridor</p>
          <h3 className="font-black uppercase mt-2" style={h3}>Your biggest overseas buyer is our home market</h3>
          <div className="grid gap-6 mt-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}>
            {CORRIDOR.map((c) => (
              <div key={c.v}>
                <p className="font-heading italic" style={{ color: 'var(--ink)', fontSize: 'clamp(2.4rem, 4.6vw, 4rem)', lineHeight: 1 }}>{c.v}</p>
                <p className="font-body mt-2" style={{ ...body, color: 'rgba(var(--ink-rgb),0.8)' }}>
                  {c.k}{c.src && <> · <a href={c.src} rel="noopener" style={{ color: 'var(--accent)' }}>source</a></>}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="/dubai/indian-real-estate-performance-marketing-agency/" className="intro-btn intro-btn-solid">Indian buyers for Dubai property</a>
            <a href="/data/india-dubai-buyer-acquisition-report.html" className="intro-btn intro-btn-ghost">India → Dubai buyer report</a>
          </div>
        </motion.div>

        <motion.div {...up(0)} className="rounded-[30px] mt-6 sm:mt-8" style={{ ...card, background: 'rgba(var(--fill-rgb),0.06)', padding: 'clamp(1.4rem, 3vw, 2.6rem)' }}>
          <p className="font-body uppercase" style={kicker}>Why QD for Indian buyers</p>
          <h3 className="font-black uppercase mt-2" style={h3}>Why developers and brokerages use QD for India-side acquisition</h3>
          <ol className="grid gap-5 mt-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))' }}>
            {WHY_QD.map((w, i) => (
              <li key={w.t} className="pt-4" style={{ borderTop: '2px solid rgba(var(--ink-rgb),0.35)' }}>
                <p className="font-black tabular-nums" style={{ color: 'var(--accent)', fontSize: 'var(--fs-caption)' }}>{String(i + 1).padStart(2, '0')}</p>
                <p className="font-semibold uppercase mt-1" style={{ color: 'var(--ink)', fontSize: 'var(--fs-text)', letterSpacing: '0.02em' }}>{w.t}</p>
                <p className="font-body mt-2" style={{ ...body, color: 'rgba(var(--ink-rgb),0.8)' }}>{w.d}{' '}
                  <a href={w.h} style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}>{w.l} →</a></p>
              </li>
            ))}
          </ol>
          <p className="font-body mt-7" style={{ ...body, color: 'rgba(var(--ink-rgb),0.78)' }}>
            Our delivered real-estate acquisition work is in India; our Dubai practice is built for the India→Dubai buyer corridor and
            grounded in original Dubai market research. We have not yet run a Dubai campaign.{' '}
            <a href="/about/editorial-policy.html" style={{ color: 'var(--accent)' }}>How we label every number →</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
'''
rep('function PriceCard({ p, i }) {', DUBAI_SECTION + '\nfunction PriceCard({ p, i }) {')
rep('''      <Intro />
      <MarqueeSection />
      <ServicesSection />''', '''      <Intro />
      <MarqueeSection />
      <DubaiSection />
      <ServicesSection />''')

# ── 12. JSON-LD: reuse the entity nodes, replace page/FAQ nodes with Dubai ones ──
m = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
g = json.loads(m.group(1))
nodes = [n for n in g['@graph'] if n.get('@type') not in ('WebPage', 'FAQPage')]
org = nodes[0]; assert org['@id'] == 'https://qdnco.com/#organization'
if not any(a.get('name') == 'Dubai' for a in org['areaServed']):
    org['areaServed'] = org['areaServed'] + [{'@type': 'City', 'name': 'Dubai'}, {'@type': 'Country', 'name': 'United Arab Emirates'}]
dubai_area = [{'@type': 'City', 'name': 'Dubai'}, {'@type': 'Country', 'name': 'United Arab Emirates'}]
nodes += [
 {'@type': 'WebPage', '@id': URL + '#webpage', 'url': URL, 'name': H.unescape(TITLE), 'description': DESC,
  'isPartOf': {'@id': 'https://qdnco.com/#website'}, 'about': {'@id': 'https://qdnco.com/#organization'},
  'inLanguage': 'en-AE', 'datePublished': UPDATED, 'dateModified': UPDATED,
  'breadcrumb': {'@id': URL + '#breadcrumb'}},
 {'@type': 'BreadcrumbList', '@id': URL + '#breadcrumb', 'itemListElement': [
   {'@type': 'ListItem', 'position': 1, 'name': 'QDnCo', 'item': 'https://qdnco.com/'},
   {'@type': 'ListItem', 'position': 2, 'name': 'Dubai', 'item': URL}]},
 {'@type': 'Service', '@id': URL + '#service', 'name': 'Real estate marketing and lead generation in Dubai',
  'serviceType': 'Real estate performance marketing', 'provider': {'@id': 'https://qdnco.com/#organization'},
  'areaServed': dubai_area,
  'audience': {'@type': 'BusinessAudience', 'audienceType': 'Real estate brokerages, developers and agents in Dubai'},
  'offers': [
   {'@type': 'Offer', 'name': 'Pay per Qualified Lead', 'priceCurrency': 'AED', 'price': PPL,
    'description': f'Per qualified lead meeting a five-point written definition. AED {PPL60} above {T1} a month, AED {PPL120} above {T2}. Minimum {PPL_MIN} a month. Media billed separately by Meta and Google.'},
   {'@type': 'Offer', 'name': 'Monthly Retainer', 'priceCurrency': 'AED',
    'priceSpecification': {'@type': 'UnitPriceSpecification', 'price': FLOOR, 'priceCurrency': 'AED', 'unitText': 'month'},
    'description': 'One flat monthly fee. Media billed separately by Meta and Google.'}]},
 {'@type': 'FAQPage', '@id': URL + '#faq', 'isPartOf': {'@id': URL + '#webpage'},
  'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': x}} for q, x in FAQS]},
]
g['@graph'] = nodes
s = s[:m.start(1)] + json.dumps(g, ensure_ascii=False) + s[m.end(1):]

# Dubai headline has one long word per line more than India's; phones get a touch less size
rep('@media(max-width:767px){ #faq{padding-top:88px!important} }',
    '@media(max-width:767px){ #faq{padding-top:88px!important} }\n/* Dubai hero headline — fits 3–4 lines on a 360–390px phone */\n@media(max-width:767px){ .hero-light-h1{font-size:clamp(30px,8.6vw,46px)!important} }')

# ── 13. Cross-link CTA points back to India (component comes from patch-india-for-dubai.py) ──
rep("const REGION_LINK = { href: '/dubai/', pre: 'Selling in Dubai? Go to ', brand: 'QDnCo ', place: 'Dubai' };",
    "const REGION_LINK = { href: '/', pre: 'Marketing an Indian project? Go to ', brand: 'QDnCo ', place: 'India' };")

# ── checks ──
code = s
for bad in ('₹550', '₹75,000', 'Sarjapur', 'JIO ADS', 'before a rupee', 'Bangalore &amp; Mysore', 'hreflang="en-IN" href="https://qdnco.com/dubai'):
    assert bad not in code, bad
assert code.count('<div id="root"></div>') == 1
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(s)
print(f'wrote {OUT}  {len(s)//1024} KB  · {nrel} paths absolutised · PPL AED {PPL}/{PPL60}/{PPL120} · retainer {RET} · FAQs {len(FAQS)}')
