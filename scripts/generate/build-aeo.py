#!/usr/bin/env python3
"""
Builds the answer-engine surfaces on a machine that has no Node.

This Mac has neither Node nor Homebrew, but macOS ships JavaScriptCore, which
runs ES modules. So the same aeo-render.mjs that `npm run site` uses on the
Windows box is executed here through jsc, which prints the rendered pages as
JSON, and this script writes them to public/.

    python3 scripts/generate/build-aeo.py

Byte-identical to `node scripts/generate/make-aeo.mjs` because it is the same renderer — this
file contributes no markup of its own, only file writes.
"""
import json
import os
import subprocess
import sys

JSC = ("/System/Library/Frameworks/JavaScriptCore.framework"
       "/Versions/A/Helpers/jsc")
HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))


def main():
    if not os.path.exists(JSC):
        sys.exit(f"JavaScriptCore not found at {JSC}\n"
                 "On a machine with Node, run `node scripts/generate/make-aeo.mjs` instead.")

    proc = subprocess.run(
        [JSC, "-m", "aeo-emit.mjs"],
        cwd=HERE, capture_output=True, text=True,
    )
    if proc.returncode != 0:
        sys.exit(f"jsc failed:\n{proc.stderr or proc.stdout}")

    # jsc prints the JSON on the last line; anything before it is a warning.
    out = proc.stdout.strip().splitlines()
    if not out:
        sys.exit("jsc produced no output")
    payload = json.loads(out[-1])

    files, stats = payload["files"], payload["stats"]
    for rel, html in files.items():
        dest = os.path.join(REPO_ROOT, "public", rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "w", encoding="utf-8") as fh:
            fh.write(html)

    print(f"\n{stats['pages']} pages written to public/")
    print(f"  {stats['answers']} answers + hub      -> public/answers/")
    print(f"  {stats['terms']} glossary terms      -> public/glossary/")
    print(f"  {stats['datasets']} research studies + hub -> public/data/")
    print(f"  {stats['comparisons']} comparisons + hub   -> public/compare/")
    print(f"  {stats['areas']} catchments + hub    -> public/areas/")
    print(f"{stats['words']:,} indexable words")


if __name__ == "__main__":
    main()
