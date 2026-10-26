"""Read-only inspection of a specific interrupted dashboard release."""
import json
import os
from pathlib import Path, PurePosixPath
import deploy
from build import digest
from dashboard import validate


def main():
    root = os.environ['FTP_REMOTE'].rstrip('/')
    if not root.startswith('/domains/') or not root.endswith('/qdnco.com/public_html'):
        raise ValueError('Unexpected production web root')
    parent = str(PurePosixPath(root).parent)
    desired = validate(Path('dashboard-site'))
    ftp = deploy.connect()
    try:
        state = json.loads(deploy.get(ftp, parent + '/.qdnco-dashboard-deploy-state.json'))
        backup = json.loads(deploy.get(ftp, parent + '/.qdnco-deploy-backups/b2d3963e5940379ba28871c143754bfd9733a72e-1-growth-status/state.json'))
        rows = []
        for name, expected in sorted(desired.items()):
            actual = digest(deploy.get(ftp, root + '/growth-status/' + name))
            rows.append(dict(file=name, sha256=actual, matches_desired=actual == expected,
                             matches_state=actual == state['files'].get(name)))
        print(json.dumps(dict(state_commit=state.get('commit'),
                              state_matches_backup=state['files'] == backup['files'],
                              files=rows), indent=2))
    finally:
        ftp.close()


if __name__ == '__main__':
    main()
