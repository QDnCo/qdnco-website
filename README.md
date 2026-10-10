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

## Deployment and configuration

Publishing this repository does not deploy the website. No automatic deployment is configured. Copy `.env.example` to `.env.local` and supply your own deployment configuration only when deliberately deploying. Never commit credentials. Existing deployment scripts also require local release records and authorization.

The Apps Script lead backend is in `lead-backend.gs`. Configure the `SHEET_ID` Script Property in your Apps Script deployment. Frontend lead endpoints must be configured for your own deployment before collecting enquiries. Tests use mocked Sheets and email services and send no messages.

## Repository scope

Includes application source, public website assets and landing pages, build/audit scripts, and tests. Local credentials, dependencies, generated hosting output, internal business notes, deployment history, archived copies, and unpublished private redesigns are intentionally ignored. They remain on the original workstation.

## Rights

No open-source license is granted by this repository. QDnCo branding and third-party logos, photography and other media retain their respective owners’ rights.
