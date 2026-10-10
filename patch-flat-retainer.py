"""Retainer is one flat monthly fee: remove "% of media" and "upside" everywhere (owner, 26 Sep 2026).

Static pages, llms files, the SEO answer bank and the directory kit. The homepages are
handled at source by patch-india-for-dubai.py / make-dubai-home.py. Idempotent; fails
loudly if any of our own media-percentage or upside wording survives.
"""
import os, re

FILES = [os.path.join(r, f) for r, _, fs in os.walk('dist') for f in fs
         if f.endswith(('.html', '.txt', '.md', '.json')) and not (r == 'dist' and f == 'index.html')
         and os.path.join(r, f) != os.path.join('dist', 'dubai', 'index.html')]
FILES.append('../_RANK-1-COMMAND-CENTER/ready/directories/00-SHARED-FACTS.md')

REPL = [
 # whole elements that exist only to explain the upside
 (r'<h2[^>]*>What the 2% upside is tied to</h2>\s*<p>.*?</p>\s*', ''),
 (r'### What the 2% upside is tied to\n.*?\n(?=\n|#)', ''),
 (r'<li>2% on units sold above a threshold written before the engagement starts</li>', '<li>Scope, deliverables and billing terms agreed in writing before we start</li>'),
 (r'\s*<dd style="margin-top:\.6rem"><b>Note</b> The upside threshold is set from your own historical run-rate, so it only triggers on performance the campaign can be argued to have caused\.</dd>', ''),
 (r'<p>The 8% of media in the retainer model is a management fee on spend you can see, not a markup buried inside it\.</p>',
  '<p>Our fees are flat and published: no percentage of media, and no markup inside it.</p>'),
 (r' ?The threshold is set from your own historical run-rate, so the upside only triggers on performance the campaign can be argued to have caused\.( It is deliberately a small number attached to a real outcome rather than a large one attached to activity\.)?', ''),
 # sentences
 (r'₹75,000–₹1,00,000 a month, plus 8% of media spend, plus 2% on units sold above a written threshold agreed before the engagement starts\.',
  '₹75,000–₹1,00,000 a month, one flat fee agreed in writing before the engagement starts.'),
 (r'₹75,000–₹1,00,000 a month plus 8% of media and 2% on units sold above a (written threshold|threshold written down before the engagement starts)\.',
  '₹75,000–₹1,00,000 a month, one flat fee.'),
 (r'₹75,000–₹1,00,000 a month plus 8% of media and 2% on units above a written threshold\.', '₹75,000–₹1,00,000 a month, one flat fee.'),
 (r'Alternatively ₹75,000–₹1,00,000 a month plus 8% of media and 2% upside as a retainer\.', 'Alternatively a flat retainer of ₹75,000–₹1,00,000 a month.'),
 (r'₹75,000–₹1,00,000/month \+ 8% of media \+ 2% on units sold above a written threshold\.', '₹75,000–₹1,00,000/month, one flat fee.'),
 (r'₹75,000–₹1,00,000/mo \+ 8% media \+ 2% upside', '₹75,000–₹1,00,000/mo flat'),
 (r'Retainer: ₹75,000–₹1,00,000/month \+ 8% of media \+ 2% on units sold above a written threshold', 'Retainer: ₹75,000–₹1,00,000/month, one flat fee'),
 (r'per month \+ 8% of media \+ 2% upside', 'per month, flat fee'),
 (r'monthly retainer \+ 8% media \+ 2% upside', 'monthly retainer, flat fee'),
 (r'Retainer \+ Upside AED 20,000/month \+ 10% of media \+ 1% upside above an? (agreed|written) threshold\.', 'Monthly Retainer AED 20,000/month, one flat fee.'),
 (r'or Retainer \+ Upside AED 20,000/month \+ 10% of media \+ 1% upside above a written threshold\.', 'or Monthly Retainer AED 20,000/month, one flat fee.'),
 # names
 (r'What is the retainer and upside package\?', 'What is the retainer package?'),
 (r'Partnership — retainer and upside', 'Partnership — monthly retainer'),
 (r'Partnership — retainer plus upside', 'Partnership — monthly retainer'),
 (r'Retainer plus upside suits', 'The retainer suits'),
 (r'Retainer plus upside', 'Monthly retainer'),
 (r'Retainer \+ Upside', 'Monthly Retainer'),
 (r'retainer and upside', 'retainer'),
]
changed = 0
for p in FILES:
    s = open(p, encoding='utf-8').read(); o = s
    for pat, new in REPL:
        s = re.sub(pat, new, s, flags=re.S)
    if s != o:
        open(p, 'w', encoding='utf-8').write(s); changed += 1

# nothing of ours may survive (the "Percentage of media" alternatives row describes other agencies)
BAD = re.compile(r'8% of media|8% media|8% management|2% upside|2% on units|2% of value|10% of media|1% upside|1% of value|[Uu]pside|management percentage and')
left = []
for p in FILES + ['dist/index.html', 'dist/dubai/index.html']:
    s = open(p, encoding='utf-8').read()
    for m in BAD.finditer(s):
        left.append((p, s[max(0, m.start() - 70):m.end() + 50].replace('\n', ' ')))
print(f'{changed} files changed')
for x in left[:20]: print('LEFT', x)
assert not left, f'{len(left)} upside/media-% mentions remain'
