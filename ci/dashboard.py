"""Publish only the six audited dashboard files through GitHub Actions."""
import json
from pathlib import Path
import re
import shutil
import sys
from build import digest
import deploy

ALLOWED = {'index.html', 'status.json', 'diagnostic-script.txt', 'prospect-scorecard.json',
           'operating-playbook.json', 'content-experiments.json'}
STATUSES = {'Completed', 'In progress', 'Blocked', 'Owner action', 'Scheduled', 'Waiting', 'Yet to do'}

def validate(root):
    entries = list(root.rglob('*'))
    if any(p.is_symlink() or not p.is_file() for p in entries):
        raise ValueError('Dashboard must contain only regular files')
    if {p.name for p in entries} != ALLOWED:
        raise ValueError('Unexpected dashboard file set')
    for p in entries:
        data = p.read_bytes()
        if re.search(rb'/Users/|-----BEGIN .*PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}', data):
            raise ValueError('Private data pattern in dashboard')
        if p.suffix == '.json':
            json.loads(data)
    state = json.loads((root / 'status.json').read_text())
    tasks = state['tasks']
    if len({t['id'] for t in tasks}) != len(tasks):
        raise ValueError('Duplicate task IDs')
    if any(t['status'] not in STATUSES for t in tasks):
        raise ValueError('Unknown task status')
    return {p.name: digest(p.read_bytes()) for p in sorted(entries)}

def package():
    files = validate(Path('dashboard-site'))
    shutil.rmtree('dashboard-release', ignore_errors=True)
    shutil.copytree('dashboard-site', 'dashboard-release')
    Path('dashboard-manifest.json').write_text(json.dumps(files, indent=2) + '\n')
    print('Validated dashboard: six files, unique IDs and known statuses')

if __name__ == '__main__':
    if '--deploy' in sys.argv:
        deploy.main(artifact='dashboard-release', manifest='dashboard-manifest.json',
                    validator=validate, scope='growth-status',
                    state_name='.qdnco-dashboard-deploy-state.json',
                    baseline='ci/dashboard-baseline.json', public_paths=sorted(ALLOWED))
    else:
        package()
