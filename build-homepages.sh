#!/bin/bash
# Rebuild both homepages in the only safe order. Run from Portfolio Website/.
#   JSX source back → India patches → bake India → Dubai from India → bake Dubai → compile JSX (Babel removed) → Tailwind CSS at build (CDN removed)
set -euo pipefail
node precompile-jsx.mjs --restore
python3 patch-india-for-dubai.py
node prerender-page.mjs index.html
python3 make-dubai-home.py
node prerender-page.mjs dubai/index.html
node precompile-jsx.mjs
node precompile-css.mjs
python3 patch-identity.py
for f in dist/index.html dist/dubai/index.html; do
  for must in "createElement(RegionSwitch, { compact: true," "InstagramIcon" "gtag/js?id=G-GZE73M9Q4M" "generate_lead" "Google reviews" "og:image:width"; do
    grep -q "$must" "$f" || { echo "BUILD GUARD FAILED: '$must' missing in $f"; exit 1; }
  done
done
grep -q "createElement(RegionSwitch, { hero: true," dist/index.html && { echo "BUILD GUARD FAILED: hero cross-link must stay removed"; exit 1; }
echo "homepages rebuilt; now: python3 audit-release.py, then cut RELEASE.json"
