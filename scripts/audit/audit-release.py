#!/usr/bin/env python3
"""Audit built HTML, metadata, JSON-LD and local links without launching a browser."""
import argparse
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = self.description = self.current = ''
        self.in_title = self.in_json = False
        self.canonical = None
        self.h1 = 0
        self.images, self.links, self.schemas = [], [], []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title':
            self.in_title = True
        if tag == 'h1':
            self.h1 += 1
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'img':
            self.images.append(attrs)
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_json, self.current = True, ''

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.in_json:
            self.schemas.append(self.current)
            self.in_json = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_json:
            self.current += data


def audit(root):
    root = root.resolve()
    rows, issues, titles, descriptions = [], [], {}, {}
    link_count = 0
    for file in sorted(root.rglob('*.html')):
        page = Page()
        page.feed(file.read_text(encoding='utf-8'))
        rel = str(file.relative_to(root))
        if rel == '404.html':   # noindex error page: no canonical, not in sitemap
            continue
        def issue(kind, detail):
            issues.append({'path': rel, 'kind': kind, 'detail': detail})
        if not page.title or len(page.title) > 65:
            issue('title', page.title)
        if not 50 <= len(page.description) <= 160:
            issue('description', page.description)
        for value, registry, kind in [(page.title, titles, 'duplicate_title'),
                                      (page.description, descriptions, 'duplicate_description')]:
            if value in registry:
                issue(kind, registry[value])
            registry[value] = rel
        if page.h1 != 1:
            issue('h1_count', page.h1)
        if not page.canonical or not page.canonical.startswith('https://qdnco.com/'):
            issue('canonical', page.canonical)
        missing = sum('alt' not in image for image in page.images)
        if missing:
            issue('missing_alt', missing)
        for schema in page.schemas:
            try:
                json.loads(schema)
            except ValueError as error:
                issue('invalid_jsonld', str(error))
        for link in page.links:
            parsed = urlparse(link)
            if parsed.scheme and parsed.scheme not in ('http', 'https'):
                continue
            if parsed.netloc and parsed.netloc not in ('qdnco.com', 'www.qdnco.com'):
                continue
            path = unquote(parsed.path)
            if not path:
                continue
            target = root / path.lstrip('/') if path.startswith('/') or parsed.netloc else file.parent / path
            if target.is_dir():
                target /= 'index.html'
            link_count += 1
            if not target.exists():
                issue('broken_local_link', link)
        rows.append({'path': rel, 'title': page.title, 'title_length': len(page.title),
                     'description': page.description, 'description_length': len(page.description),
                     'h1': page.h1, 'images': len(page.images), 'missing_alt': missing,
                     'jsonld_blocks': len(page.schemas)})
    return {'pages': len(rows), 'internal_links_checked': link_count,
            'jsonld_blocks': sum(row['jsonld_blocks'] for row in rows),
            'missing_alt': sum(row['missing_alt'] for row in rows),
            'issues': issues, 'rows': rows,
            'limits': 'Local structural checks only; not ranking, legal, factual, rich-result eligibility or visual certification.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[2] / 'dist')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    report = audit(args.root)
    if args.output:
        args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    print(json.dumps({key: value for key, value in report.items() if key != 'rows'}, indent=2))
    raise SystemExit(bool(report['issues']))
