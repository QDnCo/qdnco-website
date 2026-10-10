"""Verified, non-deleting FTPS deployment with drift protection and rollback."""
from concurrent.futures import ThreadPoolExecutor
import ftplib
import io
import json
import os
from pathlib import Path, PurePosixPath
import ssl
import sys
import urllib.request
from build import digest, validate


def safe_path(name):
    p = PurePosixPath(name)
    if p.is_absolute() or '..' in p.parts or '\\' in name or '\n' in name or '\r' in name:
        raise ValueError('Unsafe deployment path')
    return name


def connect():
    ctx = ssl.create_default_context()
    # The verified Hostinger IP uses a shared *.hstgr.io certificate.
    # Verify its CA chain and exact infrastructure SAN before sending credentials.
    ctx.check_hostname = False
    ftp = ftplib.FTP_TLS(context=ctx, timeout=60)
    ftp.connect(os.environ['FTP_HOST'], 21)
    ftp.auth()
    sans = {v for k, v in ftp.sock.getpeercert().get('subjectAltName', ()) if k == 'DNS'}
    if '*.hstgr.io' not in sans:
        raise ValueError('Unexpected FTPS certificate identity')
    ftp.login(os.environ['FTP_USER'], os.environ['FTP_PASSWORD'])
    ftp.prot_p()
    return ftp


def get(ftp, path, optional=False):
    out = io.BytesIO()
    try:
        ftp.retrbinary('RETR ' + path, out.write)
    except ftplib.error_perm as exc:
        if optional and str(exc).startswith('550'):
            return None
        raise
    return out.getvalue()


def mkdirs(ftp, path):
    current = ''
    for part in PurePosixPath(path).parts:
        if part == '/':
            current = '/'
            continue
        current = current.rstrip('/') + '/' + part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            # Only tolerate an existing directory, not a permission failure.
            ftp.cwd(current)


def put_verified(ftp, path, data):
    ftp.storbinary('STOR ' + path, io.BytesIO(data))
    if digest(get(ftp, path)) != digest(data):
        raise ValueError('Upload verification failed: ' + path)


def plan(desired, previous, actual):
    if set(previous) - set(desired):
        raise ValueError('File removals require an explicit migration; refusing silent leftovers')
    for name, expected in previous.items():
        if actual.get(name) != expected:
            raise ValueError('Server drift detected: ' + name)
    for name in set(desired) - set(previous):
        if actual.get(name) is not None:
            raise ValueError('New path already exists remotely: ' + name)
    return [name for name in desired if desired[name] != actual.get(name)]


def main():
    desired = validate(Path('release'))
    declared = json.loads(Path('release-manifest.json').read_text())
    if desired != declared:
        raise ValueError('Artifact manifest mismatch')
    root = os.environ['FTP_REMOTE'].rstrip('/')
    if not root.startswith('/domains/') or not root.endswith('/qdnco.com/public_html'):
        raise ValueError('Unexpected production web root')
    sha = os.environ.get('GITHUB_SHA', 'local-check')
    safe_path(sha)
    parent = str(PurePosixPath(root).parent)
    state_path = parent + '/.qdnco-deploy-state.json'
    backup = parent + '/.qdnco-deploy-backups/' + sha + '-' + os.environ.get('GITHUB_RUN_ATTEMPT', '1')
    ftp = connect()
    old_state = get(ftp, state_path, optional=True)
    previous = json.loads(old_state)['files'] if old_state else json.loads(Path('ci/production-baseline.json').read_text())
    ftp.quit()
    actual, originals = {}, {}
    names = sorted(set(previous) | set(desired))
    def inspect_shard(shard):
        reader = connect()
        results = []
        try:
            for i, name in enumerate(shard):
                safe_path(name)
                data = get(reader, root + '/' + name, optional=True)
                value = digest(data) if data is not None else None
                results.append((name, value, data if value != desired.get(name) else None))
                if (i + 1) % 25 == 0:
                    print(f'Verification worker checked {i + 1}/{len(shard)} files', flush=True)
        finally:
            reader.quit()
        return results
    # Three independent read-only sessions bound round-trip latency. Writes stay serial.
    with ThreadPoolExecutor(max_workers=3) as pool:
        for results in pool.map(inspect_shard, [names[i::3] for i in range(3)]):
            for name, value, data in results:
                actual[name] = value
                if value != desired.get(name):
                    originals[name] = data
    changes = plan(desired, previous, actual)
    ftp = connect()
    print(f'Drift checks passed; {len(changes)} files to update', flush=True)
    if '--dry-run' in sys.argv:
        ftp.quit()
        return
    mkdirs(ftp, backup)
    put_verified(ftp, backup + '/state.json', old_state or json.dumps({'files': previous}).encode())
    changed = []
    try:
        # Upload/verify every candidate before switching any live file.
        for name in changes:
            if originals[name] is not None:
                mkdirs(ftp, backup + '/' + str(PurePosixPath(name).parent))
                put_verified(ftp, backup + '/' + name, originals[name])
            mkdirs(ftp, root + '/' + str(PurePosixPath(name).parent))
            put_verified(ftp, root + '/' + name + '.qdnco-upload', (Path('release') / name).read_bytes())
        for name in sorted(changes, key=lambda n: (n == 'index.html', n.endswith('.html'), n)):
            # Refuse edits made while staging this deployment.
            current = get(ftp, root + '/' + name, optional=True)
            if (digest(current) if current is not None else None) != actual[name]:
                raise ValueError('Concurrent server edit: ' + name)
            ftp.rename(root + '/' + name + '.qdnco-upload', root + '/' + name)
            changed.append(name)
            if digest(get(ftp, root + '/' + name)) != desired[name]:
                raise ValueError('Post-deploy file mismatch: ' + name)
        for name in ['index.html', 'dubai/index.html']:
            url = 'https://qdnco.com/' + ('' if name == 'index.html' else 'dubai/') + '?deploy=' + sha
            request = urllib.request.Request(url, headers={'Cache-Control': 'no-cache', 'User-Agent': 'QDnCo-GitHub-Actions'})
            if digest(urllib.request.urlopen(request, timeout=60).read()) != desired[name]:
                raise ValueError('Public HTTP verification failed: ' + name)
        new_state = json.dumps({'commit': sha, 'files': desired}, indent=2).encode()
        put_verified(ftp, state_path + '.tmp', new_state)
        ftp.rename(state_path + '.tmp', state_path)
    except Exception:
        for name in reversed(changed):
            if originals[name] is None:
                ftp.delete(root + '/' + name)
            else:
                put_verified(ftp, root + '/' + name + '.qdnco-rollback', originals[name])
                ftp.rename(root + '/' + name + '.qdnco-rollback', root + '/' + name)
        raise
    finally:
        ftp.quit()
    print(f'Production verified for {sha}; backup retained outside web root', flush=True)


if __name__ == '__main__':
    main()
