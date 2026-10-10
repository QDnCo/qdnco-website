# Production deployment

## Source and workflow

`site/` is the canonical static source for qdnco.com. `ci/build.py` validates required pages, the homepage prerender, allowed static paths and credential patterns, then copies it to `release/` with a SHA-256 manifest. The Vite build is checked independently and is not deployed.

Every push to main runs CI then deploys to Hostinger; pull requests cannot access deployment secrets. GitHub environment `production` permits main only. Workflow permissions are read-only, action versions are pinned to commit SHAs, and concurrency prevents overlapping production runs. A superseded main commit is refused before deployment.

Environment secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_REMOTE`. Credentials are never committed. FTPS validates the certificate chain and Hostinger’s exact `*.hstgr.io` SAN before login, because this account connects by IP. Plain FTP is unsupported.

## Server behavior

The pipeline downloads and hashes managed server files through three read-only FTPS sessions before changing anything. Writes are serial. On the first run, `production-baseline.json` establishes the verified migration state. Later runs use `.qdnco-deploy-state.json` in the domain directory, **outside public_html**. A mismatch indicates out-of-band changes and stops the run. New files cannot overwrite untracked remote files. File removal from site/ fails rather than silently deleting server content.

Changed files are backed up outside public_html under `.qdnco-deploy-backups/<commit>-<attempt>/`, uploaded to temporary names, verified by SHA-256, then renamed. HTML follows assets; the root homepage is switched last. Deployment is atomic per file, not across the entire site. Ordinary upload/verification failures restore files already switched. A runner termination or network outage may require manual recovery from the retained backups. Backups are retained; review storage periodically.

Root and Dubai pages are fetched over public HTTPS and checked against the build manifest. Only a verified run updates server deployment state. Unknown server paths are never deleted. Growth dashboard, creative reviews, the separate hiring site, and domain verification directories remain separately managed.

## Rollback and drift

For a normal content rollback, revert the relevant site/ commit on main and push; this runs the same verified deployment process. Re-running an old workflow is deliberately blocked once main has moved. Avoid reverting the migration commit itself. For an interrupted deployment, retrieve the backup files and state.json from the private server backup directory, reconcile live hashes and restore the affected files before resuming CI.

If somebody edits a managed file directly on Hostinger, the next deployment refuses to overwrite it. Download and review that file, reconcile it into site/, and deliberately reconcile the private server state after verifying all affected hashes. Do not disable drift protection or reset state merely to make a failed run pass.

## Local verification

```sh
npm test
python3 -m unittest discover -s ci -p 'test_*.py'
python3 ci/build.py
# With deployment variables already set (never echo credentials):
python3 ci/deploy.py --dry-run
```

The old manual deploy scripts remain historical tools. Use GitHub Actions for future production releases; manual uploads will trigger drift protection if they change managed files.
