"""Package the canonical production site without invoking legacy site generators."""
import hashlib
import json
from pathlib import Path
import re
import shutil

SOURCE = Path('site')
OUTPUT = Path('release')
RESERVED = {'growth-status', 'creative-review', 'togethired', '.well-known'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def validate(root):
    files = {}
    for p in sorted(root.rglob('*')):
        if p.is_symlink():
            raise ValueError(f'Symlink forbidden: {p}')
        if not p.is_file():
            continue
        rel = p.relative_to(root)
        if rel.parts[0] in RESERVED or any(x.startswith('.') and x != '.htaccess' for x in rel.parts):
            raise ValueError(f'Local/private path forbidden: {rel}')
        if p.suffix.lower() in {'.py', '.php', '.gs', '.zip', '.key', '.pem', '.env'}:
            raise ValueError(f'Non-static file forbidden: {rel}')
        data = p.read_bytes()
        if re.search(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}', data):
            raise ValueError(f'Credential pattern detected: {rel}')
        files[rel.as_posix()] = digest(data)
    for name in ['index.html', 'dubai/index.html', 'sitemap.xml', 'robots.txt', '.htaccess', 'js/lead-capture.js']:
        if name not in files:
            raise ValueError(f'Required production file missing: {name}')
    html = (root / 'index.html').read_text()
    start = html.find('<div id="root">')
    content = re.sub(r'<script.*?</script>', '', html[start:html.find('</body>', start)], flags=re.S)
    words = len(re.sub(r'<[^>]+>', ' ', content).split()) if start >= 0 else 0
    if words < 1500:
        raise ValueError(f'Homepage prerender missing: {words} words')
    return files


if __name__ == '__main__':
    files = validate(SOURCE)
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    shutil.copytree(SOURCE, OUTPUT)
    Path('release-manifest.json').write_text(json.dumps(files, indent=2) + '\n')
    print(f'Packaged and validated {len(files)} production files')
