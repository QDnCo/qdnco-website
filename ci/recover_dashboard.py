"""Recover only the verified October25 interrupted dashboard state write.

Never uploads public files. Rejects any state, backup or live-content drift.
"""
import json
import os
import urllib.request
from pathlib import Path, PurePosixPath
import deploy
from build import digest
from dashboard import validate


def check(evidence, state, backup, desired, actual):
    expected = {'commit': evidence['previous_commit'], 'files': evidence['previous']}
    if state != expected or backup != expected:
        raise ValueError('Unexpected private state or backup; recovery refused')
    if desired != evidence['desired'] or actual != evidence['desired']:
        raise ValueError('Release or live hash mismatch; recovery refused')


def main():
    evidence = json.loads(Path('ci/dashboard-recovery-oct26.json').read_text())
    desired = validate(Path('dashboard-site'))
    root = os.environ['FTP_REMOTE'].rstrip('/')
    if not root.startswith('/domains/') or not root.endswith('/qdnco.com/public_html'):
        raise ValueError('Unexpected production web root')
    parent = str(PurePosixPath(root).parent)
    state_path = parent + '/.qdnco-dashboard-deploy-state.json'
    backup_path = parent + '/.qdnco-deploy-backups/' + evidence['release_commit'] + '-1-growth-status/state.json'
    # Verify public serving before opening the short-lived state-write session.
    for name, expected in evidence['desired'].items():
        req = urllib.request.Request('https://qdnco.com/growth-status/' + name,
                                     headers={'Cache-Control': 'no-cache'})
        if digest(urllib.request.urlopen(req, timeout=30).read()) != expected:
            raise ValueError('Public hash mismatch: ' + name)
    ftp = deploy.connect()
    try:
        original = deploy.get(ftp, state_path)
        state = json.loads(original)
        backup = json.loads(deploy.get(ftp, backup_path))
        actual = {name: digest(deploy.get(ftp, root + '/growth-status/' + name)) for name in desired}
        check(evidence, state, backup, desired, actual)
        # Refuse a concurrent metadata edit after checking content.
        if deploy.get(ftp, state_path) != original:
            raise ValueError('Concurrent state edit')
        new_state = json.dumps({'commit': evidence['release_commit'], 'files': desired}, indent=2).encode()
        deploy.put_verified(ftp, state_path + '.recovery-oct26.tmp', new_state)
        ftp.rename(state_path + '.recovery-oct26.tmp', state_path)
        if deploy.get(ftp, state_path) != new_state:
            raise ValueError('Recovery readback failed')
        print('Recovered verified dashboard release metadata; no public files written.')
    finally:
        ftp.close()


if __name__ == '__main__':
    main()
