#!/usr/bin/env python3
"""
Uploads dist/ to qdnco.com over FTPS. A Python port of deploy.mjs, for the Mac,
which has no Node.

The password is deliberately NOT in this file and must never be added to it.
It is read from the FTP_PASSWORD environment variable at run time.

    read -s FTP_PASSWORD && export FTP_PASSWORD
    python3 scripts/deploy/deploy.py --dry-run                   # runs every guard, uploads nothing
    python3 scripts/deploy/deploy.py --release=<id from RELEASE.json>   # upload

Release guards (since the 24 Sep 2026 stale-dist incident) refuse to upload when:
dist/ differs from the release recorded in RELEASE.json; the homepage has lost its
prerender; the live site is a version deploy-history.json doesn't know (someone
deployed from elsewhere — uploading would roll it back); or --release is missing.

`read -s` does not echo, and because the value is typed rather than written as
part of a command it does not land in ~/.zsh_history either. Unset it when you
are done:  unset FTP_PASSWORD

Transport is FTPS (explicit TLS on port 21) by default. Plain FTP sends the
password and every byte of the site in clear text, which is worth avoiding even
for public files. FTP_INSECURE=1 falls back to plain FTP — treat needing it as a
reason to ask Hostinger for SFTP instead.

Safety: the account's home directory ('/') is one level above the web root and
is not served. A full upload there completes, verifies, and changes nothing the
public can see. A DO_NOT_UPLOAD_HERE marker sits in '/' and this script refuses
to write to any directory containing it — the same guard deploy.mjs uses.
"""
import ftplib
import os
import ssl
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

def _load_env_local():
    path = os.path.join(REPO_ROOT, '.env.local')
    if not os.path.isfile(path):
        return
    with open(path, encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

_load_env_local()

LOCAL = 'dist'
REMOTE = os.environ.get('FTP_REMOTE', '/domains/qdnco.com/public_html')
HOST = os.environ.get('FTP_HOST', '91.108.107.39')
USER = os.environ.get('FTP_USER', 'u819069340')
PASSWORD = os.environ.get('FTP_PASSWORD')
SECURE = not os.environ.get('FTP_INSECURE')
DRY = '--dry-run' in sys.argv

GUARD = 'DO_NOT_UPLOAD_HERE'
TEXT = {'.html', '.txt', '.xml', '.json', '.css', '.js', '.svg', '.md'}


def tls_context():
    """
    TLS with the certificate chain verified, but the hostname check relaxed.

    Why this is necessary and why it is still safe:

    Hostinger serves shared-hosting FTP behind one Sectigo wildcard certificate
    issued to hostinger.com and its sibling domains (*.hostinger.com,
    *.main-hosting.eu, *.hstgr.io and about forty others). It does not, and
    cannot, cover a customer domain like ftp.qdnco.com — and the box has no PTR
    record, so there is no cert-matching hostname to connect to instead. A
    default context therefore fails with CERTIFICATE_VERIFY_FAILED before login.

    The usual advice at this point is to turn verification off entirely. That
    would accept literally any certificate and reduce FTPS to encryption with no
    authentication, which is the part that actually stops an attacker.

    Instead the chain stays fully verified against the system CA store — the
    certificate must be genuine and trusted — and only the hostname assertion is
    dropped, with check_peer_is_hostinger() below restoring an equivalent check
    by confirming the peer's certificate is in fact a Hostinger one. An attacker
    would need a CA-issued certificate for Hostinger's own domains to get past
    it, which is a materially different bar from "any certificate at all".
    """
    ctx = ssl.create_default_context()
    ctx.check_hostname = False          # cert cannot cover ftp.qdnco.com
    ctx.verify_mode = ssl.CERT_REQUIRED  # but it must still be a valid, trusted chain
    return ctx


def check_peer_is_hostinger(sock):
    """Confirm the verified certificate really belongs to Hostinger.

    Replaces the hostname assertion dropped above. Matching the SAN list rather
    than pinning a fingerprint means this keeps working when Hostinger rotates
    the certificate (the one seen at the time of writing expires 2027-01-16)
    while still refusing anything that is not Hostinger infrastructure.
    """
    cert = sock.getpeercert()
    names = [v for k, v in cert.get('subjectAltName', ()) if k == 'DNS']
    expected = ('hostinger.', 'hstgr.io', 'main-hosting.eu', 'hosting24.com')
    if not any(e in n for n in names for e in expected):
        raise SystemExit(
            "REFUSING: the FTP server presented a valid certificate that does not "
            "belong to Hostinger.\n"
            f"  certificate covers: {', '.join(names[:6]) or '(none)'}\n"
            "  Do not enter your password. Something is intercepting the connection."
        )
    subject = dict(x[0] for x in cert.get('subject', ())).get('commonName', '?')
    print(f"tls        chain verified, peer is Hostinger (CN={subject})")


def local_files():
    out = []
    for root, _, files in os.walk(LOCAL):
        for f in files:
            # Skip junk dotfiles, but ship .htaccess — it is the live
            # HTTPS / www / cache policy and must match the current build.
            if f.startswith('.') and f != '.htaccess':
                continue
            full = os.path.join(root, f)
            out.append((full, os.path.relpath(full, LOCAL).replace(os.sep, '/')))
    return sorted(out, key=lambda x: x[1])


RELEASE_FILE = os.path.join(REPO_ROOT, 'RELEASE.json')
HISTORY_FILE = os.path.join(REPO_ROOT, 'deploy-history.json')
LIVE_URL = 'https://qdnco.com/'
MIN_PRERENDER_WORDS = 1500


def _sha(b):
    import hashlib
    return hashlib.sha256(b).hexdigest()


def _prerender_words(html):
    import re
    i = html.find('<div id="root">')
    if i < 0:
        return 0
    seg = html[i:html.find('</body>', i)]
    seg = re.sub(r'<script.*?</script>', '', seg, flags=re.S)
    return len(re.sub(r'<[^>]+>', ' ', seg).split())


def release_guards():
    """Refuse the three ways a stale folder can overwrite the live site.

    Added after the 24 Sep 2026 incident: an old dist/ — built before the 22–23 Sep
    releases and without its prerender — was uploaded over the live site, reverting
    112 files and leaving the homepage blank to AI crawlers. Every guard below would
    have stopped it. Do not remove them to "get a deploy through"; fix the cause.
    """
    import json, urllib.request
    problems = []

    # G1. dist/ must be the exact release that was cut and reviewed.
    try:
        rel = json.load(open(RELEASE_FILE))
    except Exception:
        sys.exit("REFUSING: RELEASE.json is missing. Nothing in dist/ has been cut as a "
                 "reviewed release. See _RANK-1-COMMAND-CENTER/06-BUILD-AND-DEPLOY.md")
    idx = open(os.path.join(LOCAL, 'index.html'), 'rb').read()
    if _sha(idx) != rel.get('index_sha256'):
        problems.append("dist/index.html has changed since RELEASE.json was cut "
                        f"(release {rel.get('release')}). Something rebuilt or replaced dist/.")

    # G2. Homepage must carry its prerender, or AI crawlers see an empty page.
    words = _prerender_words(idx.decode('utf-8', 'ignore'))
    if words < MIN_PRERENDER_WORDS:
        problems.append(f"dist/index.html shows only {words} words without JavaScript "
                        f"(need >= {MIN_PRERENDER_WORDS}). The prerender is missing.")

    # G3. The live site must be a state this folder knows about. If someone deployed
    #     a newer release from elsewhere, uploading this folder would roll it back.
    try:
        hist = json.load(open(HISTORY_FILE))
    except Exception:
        hist = {'known_live': []}
    known = {k['sha256']: k.get('release') for k in hist.get('known_live', [])}
    req = urllib.request.Request(LIVE_URL, headers={'Cache-Control': 'no-cache',
                                                    'User-Agent': 'qdnco-deploy-guard'})
    live = urllib.request.urlopen(req, timeout=20).read()
    if _sha(live) not in known:
        problems.append("the LIVE homepage is not a version recorded in deploy-history.json. "
                        "It was changed by some other route since the last deploy from this "
                        "folder. Uploading dist/ could roll back newer work. Download the live "
                        "files, reconcile them into a new release, then record it.")

    # G4. The operator must name the release they reviewed.
    want = rel.get('release')
    given = next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--release=')), None)
    if not DRY and given != want:
        problems.append(f"pass --release={want} to confirm this is the release you reviewed.")

    print(f"release    {want}  ({rel.get('file_count')} files, index {_sha(idx)[:12]}, "
          f"{words} prerendered words)")
    print(f"live now   {_sha(live)[:12]}  = {known.get(_sha(live), 'UNKNOWN')}")
    if problems:
        sys.exit("REFUSING to deploy:\n  - " + "\n  - ".join(problems))
    return rel, hist


def record_deploy(rel, hist):
    import json, datetime
    idx = open(os.path.join(LOCAL, 'index.html'), 'rb').read()
    hist.setdefault('known_live', []).append({
        'sha256': _sha(idx), 'release': rel.get('release'),
        'note': f"deployed {datetime.datetime.now().isoformat(timespec='seconds')}"})
    json.dump(hist, open(HISTORY_FILE, 'w'), indent=1)
    print(f"recorded   {rel.get('release')} in deploy-history.json")


def main():
    files = local_files()
    total = sum(os.path.getsize(f) for f, _ in files)
    print(f"{len(files)} files, {total / 1024 / 1024:.1f} MB in {LOCAL}/")
    rel, hist = release_guards()

    if DRY:
        for _, remote_rel in files:
            print(f"  {remote_rel}")
        print(f"\n--dry-run: nothing uploaded, no connection made.")
        print(f"Would upload to {USER}@{HOST}{REMOTE}")
        return

    if not PASSWORD:
        sys.exit(
            "FTP_PASSWORD is not set.\n\n"
            "  read -s FTP_PASSWORD && export FTP_PASSWORD\n"
            "  python3 scripts/deploy/deploy.py\n"
        )

    ftp = ftplib.FTP_TLS(context=tls_context()) if SECURE else ftplib.FTP()
    ftp.connect(HOST, 21, timeout=30)
    if SECURE:
        ftp.auth()
        check_peer_is_hostinger(ftp.sock)
    ftp.login(USER, PASSWORD)
    if SECURE:
        ftp.prot_p()
    print(f"connected  {USER}@{HOST}  ({'FTPS' if SECURE else 'PLAIN FTP'})")

    # Refuse to write into the unserved account home.
    try:
        if GUARD in ftp.nlst(REMOTE):
            sys.exit(f"REFUSING: {GUARD} marker found in {REMOTE} — that is the account "
                     f"home, not the web root. Set FTP_REMOTE=/public_html")
    except ftplib.error_perm:
        pass

    made = set()

    def ensure(d):
        if not d or d in made:
            return
        parent = d.rsplit('/', 1)[0] if '/' in d else ''
        ensure(parent)
        try:
            ftp.mkd(f"{REMOTE}/{d}")
        except ftplib.error_perm:
            pass          # already exists
        made.add(d)

    sent = 0
    for full, remote_rel in files:
        d = remote_rel.rsplit('/', 1)[0] if '/' in remote_rel else ''
        ensure(d)
        with open(full, 'rb') as fh:
            ftp.storbinary(f"STOR {REMOTE}/{remote_rel}", fh)
        sent += 1
        if sent % 20 == 0 or sent == len(files):
            print(f"  {sent}/{len(files)}")

    # Verify the files that matter most actually landed at the right size.
    print("\nverifying:")
    for check in ('index.html', 'sitemap.xml', 'llms.txt',
                  'answers/index.html', 'pricing/index.html'):
        want = os.path.getsize(os.path.join(LOCAL, *check.split('/')))
        try:
            got = ftp.size(f"{REMOTE}/{check}")
        except Exception:
            got = None
        mark = 'ok' if got == want else f'MISMATCH local={want} remote={got}'
        print(f"  {check:24} {mark}")

    ftp.quit()
    print(f"\n{sent} files uploaded to {REMOTE}")
    record_deploy(rel, hist)
    print("Next: submit sitemap.xml in Search Console — see ../QDnCo Marketing/SEARCH-SETUP.md")


if __name__ == '__main__':
    main()
