#!/usr/bin/env python3
"""
Pushes every URL in sitemap.xml to IndexNow (Bing, Yandex, Naver, Seznam).

Why this matters more than it looks: Bing currently indexes zero pages of
qdnco.com, and ChatGPT Search and Copilot both lean on Bing's index. Waiting to
be crawled could take weeks for a low-authority domain. IndexNow is a push —
the URLs are submitted the moment this runs.

Google does NOT participate in IndexNow. Google discovery still comes from
Search Console (sitemap + URL inspection).

    python3 scripts/deploy/submit-indexnow.py            # submit every sitemap URL
    python3 scripts/deploy/submit-indexnow.py --dry-run  # show what would be sent

Prerequisite: the key file must be live at https://qdnco.com/KEY.txt — that is
how IndexNow verifies you own the domain. It ships in dist/, so it is live as
soon as the build is deployed.
"""
import json, sys, urllib.request, xml.etree.ElementTree as ET

KEY = "86db4c75ed9c1080d1dc5d1daa76dc0c"
HOST = "qdnco.com"
SITEMAP = f"https://{HOST}/sitemap.xml"
ENDPOINT = "https://api.indexnow.org/IndexNow"
DRY = "--dry-run" in sys.argv

def main():
    xml = urllib.request.urlopen(SITEMAP, timeout=30).read()
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [e.text for e in ET.fromstring(xml).iter(f"{{{ns['s']}}}loc")]
    print(f"{len(urls)} URLs in sitemap")

    # Verify the key file is actually reachable before submitting — a 404 here
    # makes every submission silently invalid.
    key_url = f"https://{HOST}/{KEY}.txt"
    try:
        got = urllib.request.urlopen(key_url, timeout=15).read().decode().strip()
        print(f"key file  {key_url}  ->  {'ok' if got == KEY else 'MISMATCH: ' + got}")
        if got != KEY:
            sys.exit("Key file content does not match the key. Redeploy dist/.")
    except Exception as e:
        sys.exit(f"Key file not reachable ({e}). Deploy dist/ first.")

    if DRY:
        for u in urls: print("  ", u)
        print("\n--dry-run: nothing submitted.")
        return

    payload = json.dumps({
        "host": HOST, "key": KEY, "keyLocation": key_url, "urlList": urls,
    }).encode()
    req = urllib.request.Request(ENDPOINT, data=payload,
                                 headers={"Content-Type": "application/json; charset=utf-8"})
    with urllib.request.urlopen(req, timeout=30) as r:
        # 200 or 202 both mean accepted. 422 usually means key/host mismatch.
        print(f"IndexNow responded {r.status} — {len(urls)} URLs submitted")

if __name__ == "__main__":
    main()
