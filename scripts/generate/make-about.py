"""/about/ (About QDnCo + team) and /about/editorial-policy.html (how every number is labelled).
Shell = an existing depth-1 static page. No LLP name, no founder claim (owner to confirm), no Dubai office/licence.
Run from Portfolio Website/:  python3 scripts/generate/make-about.py
"""
import json, os, re, html
E = html.escape
UPDATED = '2026-09-29'
T = open('dist/answers/what-is-phase-0.html', encoding='utf-8').read()
ORG = 'https://qdnco.com/#organization'

TEAM = [
 ('https://qdnco.com/#adarsh', 'Adarsh Jee Pandey', 'CEO', 'Leads company strategy, partnerships and growth.', 'https://www.linkedin.com/in/adarshjeepandey', '/team/adarsh-r02.png'),
 ('https://qdnco.com/#person', 'V. Sai Kavshik', 'Head of Sales', 'Runs the client side of every launch and coordinates multi-project real estate marketing engagements.', 'https://www.linkedin.com/in/v-s-kavshik', '/team/sai-r02.png'),
 ('https://qdnco.com/#vinayak-tiwari', 'Vinayak Tiwari', 'CTO', 'Builds the technology behind every campaign: tracking, CRM and AI automation.', 'https://www.linkedin.com/in/vinayaktiwari-ai', '/team/vinayak-r02.png'),
]
PROFILES = [('LinkedIn', 'https://www.linkedin.com/company/qd-co/'), ('Instagram', 'https://www.instagram.com/qdnco.official/'),
            ('Facebook', 'https://www.facebook.com/profile.php?id=61583765303879'), ('Google Business Profile', 'https://share.google/FodoeqQ5BsOYxikAz')]

ABOUT = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>About</nav>
<p class="eyebrow">About QDnCo.</p><h1>About QDnCo</h1><p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p><strong>QDnCo is a Bengaluru-based performance marketing practice for real estate developers, brokerages and channel partners.</strong> We run research-led Meta and Google acquisition, creative testing, landing pages, lead qualification, CRM routing and WhatsApp follow-up, and we are measured on qualified leads rather than form fills. Our delivered work is Indian residential real estate. Our Dubai practice is built for the India→Dubai buyer corridor and grounded in our own Dubai market research.</p></div>
<div class="keyfacts"><div class="keyfact"><b>2024</b><span>founded, Bengaluru</span></div><div class="keyfact"><b>14</b><span>residential campaigns, 10 developer brands</span></div><div class="keyfact"><b>2</b><span>markets: India delivered; Dubai corridor</span></div><div class="keyfact"><b>6</b><span>languages: English, Hindi, Telugu, Tamil, Marathi, Kannada</span></div></div>

<h2 id="what">What we do</h2>
<ul>
<li><strong>Research first:</strong> buyer interviews, competitor and Meta Ad Library analysis, catchment and price-to-income work before any media is spent.</li>
<li><strong>Performance acquisition:</strong> Meta and Google campaigns in the client's own ad account, with media paid by the client directly to the platform.</li>
<li><strong>Qualification, not volume:</strong> a written five-point definition of a qualified lead, CRM routing and WhatsApp follow-up in minutes.</li>
<li><strong>Creative testing:</strong> fifteen AI-generated static creatives a month included, tested as distinct arguments.</li>
</ul>
<p>We do not sell property, handle site visits or close sales. Your team does that; we build and run the demand behind it.</p>

<h2 id="markets">Where we work</h2>
<div class="tablewrap"><table><thead><tr><th>Market</th><th>What we have done</th><th>Evidence</th></tr></thead><tbody>
<tr><td>India</td><td>Residential marketing for developers and channel partners in Bengaluru, Mysore and Chennai, including Brigade, Godrej, Kumar, Vaishnavi, Nambiar and Vajram projects</td><td><a href="../work/index.html">Case studies with evidence ledgers</a></td></tr>
<tr><td>Dubai (India→Dubai corridor)</td><td>Research into how Dubai property is advertised in the UAE and to Indian buyers, and DLD permit requirements. We have not yet run a Dubai campaign.</td><td><a href="../data/india-dubai-buyer-acquisition-report.html">India→Dubai buyer report</a> · <a href="../data/meta-ad-library-audit-dubai-real-estate.html">Dubai ad audit</a></td></tr>
</tbody></table></div>
<p>We have no Dubai office and hold no RERA broker licence. Dubai work is delivered remotely under the client's own DLD permits.</p>

<h2 id="team">The team</h2>
<ul>
{"".join(f'<li><strong>{E(n)}</strong>, {E(r)}. {E(b)} <a href="{l}" rel="noopener me">LinkedIn</a>' + (' · <a href="https://www.instagram.com/theadarshg/" rel="noopener me">Instagram</a>' if n.startswith('Adarsh') else '') + '</li>' for _, n, r, b, l, _ in TEAM)}
</ul>

<h2 id="evidence">How we handle numbers</h2>
<p>Every figure we publish is labelled as observed, client-reported, a client-supplied project fact, owner-reported, a model or a market estimate. Read the <a href="editorial-policy.html">editorial policy</a>.</p>

<h2 id="how">How to work with us</h2>
<p>Pay per qualified lead or a flat monthly retainer (minimum three months), published on the <a href="../pricing/index.html">India pricing page</a> and in AED on <a href="../dubai/#pricing">QDnCo Dubai</a>. Every engagement starts with Phase 0, a paid market read.</p>

<h2 id="contact">Contact and profiles</h2>
<p>15A, 4th Cross, Varanasi Main Road, Bell Town Layout, Jinkethimmanahalli, Ramamurthy Nagar, Bengaluru, Karnataka 560036, India · <a href="tel:+918861179992">+91 88611 79992</a> · <a href="mailto:qdnco01@gmail.com">qdnco01@gmail.com</a></p>
<p>{" · ".join(f'<a href="{u}" rel="noopener me">{E(k)}</a>' for k, u in PROFILES)}</p>
<div class="cta-band"><h2>Start with the market read</h2><p>A Phase 0 call is a questionnaire, not a pitch.</p><a href="../index.html#contact">Book a Phase 0 call &nearr;</a></div>
'''

POLICY = f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">About</a><span>/</span>Editorial policy</nav>
<p class="eyebrow">About QDnCo.</p><h1>Editorial policy: how every number is labelled</h1><p class="updated">Last updated {UPDATED}</p>
<div class="answer"><p><strong>Every number on qdnco.com carries one of six labels: observed, client-reported, client-supplied project fact, owner-reported, model or market estimate.</strong> We do not publish results we cannot source, we date every figure, and we state the sample and limits of every piece of research. Evidence over adjectives.</p></div>

<h2 id="labels">The six labels</h2>
<div class="tablewrap"><table><thead><tr><th>Label</th><th>Meaning</th><th>Example on this site</th></tr></thead><tbody>
<tr><td>Observed</td><td>Read by us from an ad platform, analytics or a public source, with a stated date window</td><td>Cost per form lead for one named campaign, 24 Aug–22 Sep 2026</td></tr>
<tr><td>Client-reported</td><td>Reported by the client's own team, such as a sales team scoring lead quality</td><td>Sales-ready percentage scored by a client's sales team</td></tr>
<tr><td>Client-supplied project fact</td><td>Project scale or specification from the client's brief; describes the project, not our result</td><td>Number of homes, acres, towers</td></tr>
<tr><td>Owner-reported</td><td>Historical figures reported by QDnCo's owners and not yet reconciled to platform exports</td><td>₹266 cost per lead and 51% sales-ready on an earlier North Bengaluru cohort</td></tr>
<tr><td>Model</td><td>A planning assumption or scenario with its inputs shown; never a result</td><td>"We plan on 100 leads per closure until your sales team proves better"</td></tr>
<tr><td>Market estimate</td><td>A third-party figure, cited to its source, with its method caveats</td><td>Indian nationals ≈22% of foreign Dubai purchases in 2025, brokerage analysis of DLD data</td></tr>
</tbody></table></div>

<h2 id="rules">The rules</h2>
<ul>
<li>No invented results, clients, reviews, offices or licences. If we have not done something, the page says so.</li>
<li>No superlatives we cannot prove: no "#1", "best" or "only agency".</li>
<li>Every research page states what was collected, how, when, the sample size and the limits, and offers the underlying records for download.</li>
<li>Pipeline influence is never presented as booked revenue; form leads are never presented as sales.</li>
<li>Regulatory statements (RERA, DLD, TRAI, RBI) link to the regulator or a named primary source and are marked as not legal advice.</li>
<li>Advertising creatives we produce with AI are labelled as AI-generated where the platform supports it.</li>
</ul>

<h2 id="corrections">Corrections</h2>
<p>If a figure or statement on this site is wrong, email <a href="mailto:qdnco01@gmail.com">qdnco01@gmail.com</a> with the page and the source. We correct confirmed errors, date the change and, where a published claim was withdrawn, say so on the page, as we did on our Bangalore Meta audit.</p>
<div class="related"><h2>See it applied</h2><ul>
<li><a href="../work/index.html">Case studies<small>Each with an evidence ledger.</small></a></li>
<li><a href="../data/index.html">Research<small>Methods, samples, limits and downloads.</small></a></li>
<li><a href="index.html">About QDnCo<small>Who we are and where we work.</small></a></li>
</ul></div>
'''

def graph(url, name, desc, typ, extra):
    return {"@context": "https://schema.org", "@graph": [
        {"@type": typ, "@id": url + "#page", "url": url, "name": name, "description": desc, "inLanguage": "en",
         "isPartOf": {"@id": "https://qdnco.com/#website"}, "about": {"@id": ORG}, "dateModified": UPDATED,
         "breadcrumb": {"@id": url + "#crumbs"}},
        {"@type": "BreadcrumbList", "@id": url + "#crumbs", "itemListElement": extra['crumbs']},
    ] + extra.get('nodes', [])}

def build(out, url, title, desc, body, g):
    s = T
    he = s.index('</head>'); head, rest = s[:he], s[he:]
    t, d = E(title), E(desc)
    for pat, new in [(r'<title>.*?</title>', f'<title>{t}</title>'),
                     (r'<meta name="description" content="[^"]*"\s*/?>', f'<meta name="description" content="{d}">'),
                     (r'<link rel="canonical" href="[^"]*"\s*/?>', f'<link rel="canonical" href="{url}">'),
                     (r'<meta property="og:title" content="[^"]*"\s*/?>', f'<meta property="og:title" content="{t}">'),
                     (r'<meta property="og:description" content="[^"]*"\s*/?>', f'<meta property="og:description" content="{d}">'),
                     (r'<meta property="og:url" content="[^"]*"\s*/?>', f'<meta property="og:url" content="{url}">')]:
        head, n = re.subn(pat, lambda m, new=new: new, head, count=1, flags=re.S); assert n == 1, (out, pat)
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', '', head, flags=re.S)
    head = head.replace('</head>', '') + '<script type="application/ld+json">' + json.dumps(g, ensure_ascii=False) + '</script>\n'
    page = head + rest
    a = page.index('<div class="page"><div class="wrap">') + len('<div class="page"><div class="wrap">')
    b = page.index('<footer class="foot">')
    page = page[:a] + body + '    ' + page[b:]
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(page)
    print(out, len(re.sub(r'<[^>]+>', ' ', body).split()), 'words')

U1 = 'https://qdnco.com/about/'
people = [{"@type": "Person", "@id": i, "name": n, "jobTitle": r, "worksFor": {"@id": ORG}, "sameAs": [l] + (['https://www.instagram.com/theadarshg/'] if n.startswith('Adarsh') else []),
           "image": 'https://qdnco.com' + img} for i, n, r, _, l, img in TEAM]
build('dist/about/index.html', U1, 'About QDnCo — Real Estate Performance Marketing | QDnCo',
      'QDnCo is a Bengaluru performance marketing practice for real estate developers and channel partners in India and the India→Dubai buyer corridor.',
      ABOUT, graph(U1, 'About QDnCo', 'Who QDnCo is, what it does, where it works, the team and how it labels evidence.', 'AboutPage',
                   {'crumbs': [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://qdnco.com/"},
                               {"@type": "ListItem", "position": 2, "name": "About", "item": U1}], 'nodes': people}))
U2 = 'https://qdnco.com/about/editorial-policy.html'
build('dist/about/editorial-policy.html', U2, 'Editorial Policy: How We Label Every Number | QDnCo',
      'Every number on qdnco.com is labelled observed, client-reported, client-supplied, owner-reported, model or market estimate. Our rules and corrections policy.',
      POLICY, graph(U2, 'Editorial policy', 'How QDnCo labels evidence and corrects errors.', 'WebPage',
                    {'crumbs': [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://qdnco.com/"},
                                {"@type": "ListItem", "position": 2, "name": "About", "item": U1},
                                {"@type": "ListItem", "position": 3, "name": "Editorial policy", "item": U2}]}))
