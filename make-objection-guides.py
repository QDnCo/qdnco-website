"""Build the two regional objection guides from the reviewed editorial data."""
from pathlib import Path
import json, html, re, shutil
ROOT=Path(__file__).resolve().parent
DIST=ROOT/'dist'
ASSETS=ROOT.parent/'_RANK-1-COMMAND-CENTER/ready/objection-playbook'
E=html.escape
T=(DIST/'guides/meta-ads-for-real-estate-launches.html').read_text()
data=json.loads((ASSETS/'content.json').read_text())
for p in data:
    region=p['region']; url='https://qdnco.com/guides/'+p['slug']
    desc=f"Real estate objection handling in {region.title()}: ten buyer questions, practical responses, evidence checklists and next steps. Download the free QDnCo playbook."
    pdf=f'qdnco-objection-handling-{region}.pdf'
    home='/dubai/' if region=='dubai' else '/'
    other='dubai' if region=='india' else 'india'
    body=f'''<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/guides/index.html">Guides</a> / {region.title()} objection handling</nav>
<p class="eyebrow">{E(p['audience'])}</p><h1>{E(p['title'])}</h1>
<p class="updated">Updated 1 October 2026 · By QDnCo</p>
<p class="lede">A buyer objection is a request for clarity. Use these ten conversations to identify the concern, show the right evidence and agree a useful next step.</p>
<div class="answer"><p><strong>Acknowledge → clarify → answer with proof → agree the next step.</strong> The goal is an informed decision, not pressure. These scripts are adaptable examples, not statements about a particular development.</p></div>
<p><a href="/downloads/{pdf}" download>Download the free {region.title()} playbook (PDF)</a> · <a href="/downloads/objection-tracker-template.csv" download>Download the objection tracker (CSV)</a></p>
<h2>How to use this with your sales team</h2><p>Developers should maintain the approved project facts and document pack. Channel partners should use authorised versions, identify unanswered questions and route them to the responsible person. Marketing teams should log recurring objections and test clearer ads, landing pages and follow-up material. Sales teams own visits, negotiation and closing.</p>
<p>Before a call, confirm the current dated cost sheet, approved project details, payment schedule and source of each claim. Ask one clarifying question before sending documents. Never replace missing evidence with confidence or an invented deadline.</p>
<h2>Choose the buyer's concern</h2><ol>''' + ''.join(f'<li><a href="#objection-{i}">{E(o["objection"])}</a></li>' for i,o in enumerate(p['objections'],1))+'</ol>'
    for i,o in enumerate(p['objections'],1):
        body+=f'<section id="objection-{i}"><p class="eyebrow">{i:02d} / {E(o["tag"])}</p><h2>{E(o["objection"])}</h2>'
        for k,label in [('clarify','Ask first'),('answer','Suggested response'),('proof','Evidence to prepare'),('next','Next step'),('avoid','Avoid')]:
            body+=f'<p><strong>{label}:</strong> {E(o[k])}</p>'
        body+='</section>'
    body+='''<h2>Turn objections into better marketing</h2><p>Record the concern in the buyer's own words, the campaign source, evidence shared, next action and its date. Review unresolved questions weekly. If price comparisons recur, improve the total-cost explanation. If trust concerns recur, surface verified project details earlier. If buyers cannot understand the location, improve practical travel and amenity information rather than adding broad lifestyle promises.</p>
<p>Track the proportion of conversations that reach a mutually agreed next step, visits attended and confirmed bookings separately. A reply, lead, visit and booking are different events. This playbook does not promise a conversion rate.</p>
<h2>Official verification resources</h2><p>Check the relevant current authority records and project documents. This is a communication framework; obtain qualified advice on legal, tax or financing questions.</p><ul>''' + ''.join(f'<li><a href="{E(u)}">{E(t)}</a></li>' for t,u in p['sources'])+'</ul>'
    body+=f'''<h2>Related resources</h2><ul><li><a href="real-estate-objection-handling-{other}.html">The {other.title()} objection-handling playbook</a></li><li><a href="/tools/real-estate-lead-cost-calculator.html">Real estate lead cost calculator</a></li><li><a href="{home}">QDnCo real estate marketing in {region.title()}</a></li></ul>
<div class="cta-band"><h2>Make your next campaign answer the questions buyers actually ask.</h2><p>QDnCo connects research, positioning, creative testing and lead generation with your team's feedback. Bring your recurring objections to a Phase 0 call.</p><a href="{home}#contact">Book a Phase 0 call ↗</a></div>'''
    graph={'@context':'https://schema.org','@graph':[{'@type':'Article','headline':p['title'],'description':desc,'datePublished':'2026-10-01','dateModified':'2026-10-01','mainEntityOfPage':url,'author':{'@type':'Organization','name':'QDnCo','url':'https://qdnco.com/'},'audience':{'@type':'BusinessAudience','audienceType':p['audience']}},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':'https://qdnco.com/'},{'@type':'ListItem','position':2,'name':'Guides','item':'https://qdnco.com/guides/index.html'},{'@type':'ListItem','position':3,'name':p['title'],'item':url}]}]}
    page=T
    for pattern,value in [(r'<title>.*?</title>',f'<title>{E(p["title"])} | QDnCo</title>'),(r'<meta name="description" content="[^"]*"\s*/?>',f'<meta name="description" content="{E(desc)}">'),(r'<link rel="canonical" href="[^"]*"\s*/?>',f'<link rel="canonical" href="{url}">')]:
        page,n=re.subn(pattern,lambda m:value,page,count=1,flags=re.S); assert n==1
    for prop,value in [('title',p['title']),('description',desc),('url',url)]:
        page=re.sub(r'<meta property="og:'+prop+r'" content="[^"]*"\s*/?>',lambda m:f'<meta property="og:{prop}" content="{E(value)}">',page,count=1)
    page=re.sub(r'<script type="application/ld\+json">.*?</script>',lambda m:'<script type="application/ld+json">'+json.dumps(graph,ensure_ascii=False)+'</script>',page,count=1,flags=re.S)
    a=page.index('<div class="page"><div class="wrap">')+len('<div class="page"><div class="wrap">'); b=page.index('<footer class="foot">')
    page=page[:a]+body+page[b:]
    (DIST/'guides'/p['slug']).write_text(page)
    (DIST/'downloads').mkdir(exist_ok=True)
    shutil.copy2(ASSETS/'output'/pdf,DIST/'downloads'/pdf)
    index=DIST/'guides/index.html'; s=index.read_text()
    if p['slug'] not in s: index.write_text(s.replace('<div class="guide-grid">',f'<div class="guide-grid"><a class="guide-card" href="{p["slug"]}"><b>{E(p["title"])}</b><span>Ten buyer objections, practical responses and a free PDF for {E(p["audience"].lower())}.</span></a>',1))
    sitemap=DIST/'sitemap.xml'; s=sitemap.read_text()
    if url not in s: sitemap.write_text(s.replace('</urlset>',f'<url><loc>{url}</loc><lastmod>2026-10-01</lastmod></url>\n</urlset>'))
    print(p['slug'],len(re.sub('<[^>]+>',' ',body).split()),'words')
shutil.copy2(ASSETS/'output/objection-tracker-template.csv',DIST/'downloads/objection-tracker-template.csv')
