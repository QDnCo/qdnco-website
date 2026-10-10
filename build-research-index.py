#!/usr/bin/env python3
"""Recount the retained August snapshot and export public, copy-free source indexes."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'QDnCo Marketing/Market Intelligence/_scrape/qdco_meta_scrape_latest.json'
OUT = ROOT / 'public/data/downloads'


def build():
    raw = SOURCE.read_bytes()
    data = json.loads(raw)
    ads = data['ads']
    summary = {
        'snapshot_utc': data['_scraped_utc'],
        'source_sha256': hashlib.sha256(raw).hexdigest(),
        'raw_items_reported_by_collector': data['_raw_items'],
        'retained_scored_rows': len(ads),
        'unique_library_urls': len({a['library_url'] for a in ads}),
        'search_terms': data['_search_terms'],
        'collection_error_records': len(data['_errors']),
        'method': 'Retained rows grouped by side; exact library URL deduplication; distinct advertiser display-name strings. No Page IDs retained. First row retained for each URL within each side.',
        'limits': 'Historical keyword-selected sample, not a census. Category labels are inherited from the collector and not independent business classifications. Ad age is a recorded field, not verified continuous delivery, spend or performance. No pricing-absence or profitability inference is supported.',
        'sides': {},
    }
    OUT.mkdir(parents=True, exist_ok=True)
    for side in ('sell', 'buy'):
        rows = [a for a in ads if a['side'] == side]
        unique = {}
        for a in rows:
            unique.setdefault(a['library_url'], a)
        summary['sides'][side] = {
            'retained_rows': len(rows), 'unique_library_urls': len(unique),
            'distinct_advertiser_names': len({a['advertiser'] for a in rows}),
        }
        with (OUT / f'meta-audit-2026-08-09-{side}.csv').open('w', newline='', encoding='utf-8') as f:
            fields = ['snapshot_utc', 'side', 'advertiser_name', 'library_url', 'recorded_days_running', 'matched_search_term']
            writer = csv.DictWriter(f, fieldnames=fields)
            writer.writeheader()
            for a in sorted(unique.values(), key=lambda a: (a['advertiser'], a['library_url'])):
                writer.writerow(dict(zip(fields, [data['_scraped_utc'], side, a['advertiser'], a['library_url'], a['days_running'], a['term']])))
    (OUT / 'meta-audit-2026-08-09-method.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({k: v for k, v in summary.items() if k not in ('search_terms', 'method', 'limits')}, indent=2))


if __name__ == '__main__':
    build()
