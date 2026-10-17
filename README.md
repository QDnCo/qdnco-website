# QDnCo website

Website source and landing-page tooling for [qdnco.com](https://qdnco.com).

## Local development

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

The Vite entry point is the React/TypeScript site in `src/`. The standalone marketing homepage is `public/v4-final.html`; India and Dubai editable JSX snapshots are in `_jsx-source/`. Static landing pages and website media live in `public/`. Root-level generators and audit scripts support the static site workflow.

```sh
npm run build
node --test tests/lead-capture.test.mjs
```

`npm run build` builds the Vite application into `dist/`. `node build-dist.mjs` assembles the standalone static site from `public/` and **replaces dist/**. Some historical scripts require locally installed Chrome or an existing hosting bundle. Do not run these builders over a production release without a backup. The source variants are retained for traceability and are not all the current production site.

## Automatic production deployment

Pushes to `main` run `.github/workflows/hostinger.yml`: install dependencies, run Node and Python tests, check the React build, package `site/`, and deploy over verified FTPS to **https://qdnco.com**. Pull requests run CI only. A manual Actions run is also available on `main`.

**Edit `site/` for production website changes.** It is the canonical static production source, imported byte-for-byte from Hostinger on 10 October 2026. The older React/Vite application (`src/`) and generator inputs (`public/`, `_jsx-source/`) remain development tools; their output does not automatically replace the production site. To use a generator, preview its output and deliberately copy the approved files into `site/`.

Production credentials are encrypted GitHub environment secrets. Deployment never uploads repository files, credentials, or private drafts. It preserves separately managed `growth-status/`, `creative-review/`, `togethired/`, and `.well-known/` server paths. See [deployment operations](ci/README.md) for drift handling and rollback.

The Apps Script lead backend is in `lead-backend.gs`. Configure the `SHEET_ID` Script Property when deploying that backend separately. Frontend lead endpoints must be configured for your own deployment before collecting enquiries. Tests mock Sheets and email services and send no messages.

## Repository scope

Includes application source, public website assets and landing pages, build/audit scripts, and tests. Local credentials, dependencies, local generated hosting output, internal business notes, deployment history, archived copies, and unpublished private redesigns are intentionally ignored. They remain on the original workstation.

## Rights

No open-source license is granted by this repository. QDnCo branding and third-party logos, photography and other media retain their respective owners’ rights.
