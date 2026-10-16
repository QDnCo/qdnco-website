"""Old-site URLs that Google still lists (e.g. /inner_pages/blog.html, shown as the "Qd&Co." sitelink)
301 to their current equivalents, so no searcher ever lands on a 404. Idempotent."""
P = 'dist/.htaccess'
BLOCK = r'''
# ── Legacy URLs from the pre-2026 site (Google still lists some as sitelinks) → 301 to the live equivalent ──
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^inner_pages/blog\.html$ /guides/index.html [R=301,L]
  RewriteRule ^inner_pages/(blog|blogs|insights|articles|resources)[^/]*$ /guides/index.html [R=301,L]
  RewriteRule ^(blog|blogs|insights|articles|resources)(/.*)?$ /guides/index.html [R=301,L]
  RewriteRule ^inner_pages/(about|about-us|team|who-we-are)[^/]*$ /about/ [R=301,L]
  RewriteRule ^(about-us|team)(\.html)?/?$ /about/ [R=301,L]
  RewriteRule ^inner_pages/(portfolio|work|projects|case-stud)[^/]*$ /work/index.html [R=301,L]
  RewriteRule ^inner_pages/(pricing|plans|packages)[^/]*$ /pricing/index.html [R=301,L]
  RewriteRule ^inner_pages/(privacy)[^/]*$ /legal/privacy.html [R=301,L]
  RewriteRule ^inner_pages/(terms)[^/]*$ /legal/terms.html [R=301,L]
  RewriteRule ^inner_pages/(contact|contact-us|get-in-touch)[^/]*$ https://qdnco.com/#contact [R=301,NE,L]
  RewriteRule ^inner_pages/(services?|what-we-do|solutions)[^/]*$ https://qdnco.com/#services [R=301,NE,L]
  RewriteRule ^inner_pages(/.*)?$ / [R=301,L]
</IfModule>
'''
s = open(P, encoding='utf-8').read()
if 'inner_pages/blog' not in s:
    open(P, 'w', encoding='utf-8').write(s.rstrip() + '\n' + BLOCK)
print('legacy redirects in .htaccess')
