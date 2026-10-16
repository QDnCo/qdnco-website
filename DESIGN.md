# QDnCo Design System

The single reference for every UI change on qdnco.com. If a change needs something this file does not cover, update this file first, then build.

- Applies to: `site/` (production). Homepage and `/dubai/` (React, prerendered), the ~125 static secondary pages, and `/work/`.
- Background research: [`docs/UI-AUDIT.md`](docs/UI-AUDIT.md), [`docs/SCROLLSTOP-DEEP-RESEARCH.md`](docs/SCROLLSTOP-DEEP-RESEARCH.md).
- Last updated: 15 Oct 2026.

---

## 1. Principles

1. **Restraint.** Fewer sections, fewer styles, fewer colours. If two components do the same job, keep one.
2. **One accent, applied evenly.** Brand violet marks actions and the headline value on cards. Whatever is violet on one card is violet on every card.
3. **Proof first.** Show the work (screenshots, figures, case studies) before claims. Every figure keeps its honest label.
4. **Readable everywhere.** No text under 12 px, no tap target under 44 px, nothing that only works on hover.
5. **SEO-safe by default.** Presentation changes never remove indexable text, links, headings or URLs.

---

## 2. Colour

### 2.1 Theme tokens

The site has light (default) and dark themes, switched by `data-theme` on `<html>`. Use tokens, never raw hex, except inside the fixed-light components in 2.3.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--page` | `#FFFFFF` | `#0A0D12` | Page background |
| `--panel` | `#F7F7F5` | `#0E1319` | Raised surfaces |
| `--ink` | `#0A0D12` | `#F2F6F8` | Headings, primary text |
| `--ink-body` | `#1B2430` | `#D7E2EA` | Body text |
| `--ink-rgb` | `10,13,18` | `215,226,234` | For `rgba(var(--ink-rgb), α)` greys |
| `--accent` | `#5E0ED7` | `#A87BFF` | Brand violet |
| `--veil` | `rgba(255,255,255,0.90)` | `rgba(10,13,18,0.82)` | Section backgrounds over the wallpaper |

Greys are always ink at an alpha, never a separate grey hex:

| Role | Value | Notes |
|---|---|---|
| Secondary text | `rgba(var(--ink-rgb), 0.68–0.74)` | Meets 4.5:1 on page |
| Hairline border | `rgba(var(--ink-rgb), 0.12–0.16)` | Cards, dividers |
| Strong border | `rgba(var(--ink-rgb), 0.22–0.30)` | Outline buttons, pills |
| Never below | `0.60` for any text | Below this, text fails contrast |

### 2.2 Brand violet rules

- **Hex:** `#5B32C8` (softened from `#5E0ED7` on 15 Oct 2026 so it reads calmer). Hover/pressed: `#4A28A6`. White on it is 7.7:1.
- **Use it for:**
  - the one primary CTA per section;
  - the active nav item;
  - every card's headline value and its divider tint;
  - the arrow on card buttons;
  - hover states (card border, outline button fill);
  - text links;
  - the focus ring;
  - result chips.
- **Never use it for:** backgrounds of large areas, decorative icons, body text, or more than one solid button in view. Never colour some cards' values and not others.
- **Contrast:** white on violet is 8.3:1, and violet on the card surface is 8.1:1. Both are safe at any size.

### 2.3 Fixed-light components

Project cards (homepage rail and `/work/`) stay light in both themes, so they use fixed values:

| Token (component scope) | Value |
|---|---|
| Card surface | `#FCFBF9` |
| Card text | `#0A0D12` |
| Card secondary text | `rgba(10,13,18,0.66)` |
| Card border | `rgba(10,13,18,0.14)`, hover `rgba(94,14,215,0.45)` |
| Logo panel (project with no screenshot) | `linear-gradient(160deg, #F7F5FB, #EBE8F3)` |
| Image placeholder | `#EEF0F3` |

### 2.4 Data tints

Only for labelling data sources in charts and evidence labels, never for UI chrome:

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `--tint-primary` | `#0E8F5B` | `#7DF0B4` | Owned / observed |
| `--tint-secondary` | `#A8129C` | `#E85BD0` | Client-reported |
| `--tint-historical` | `#2A5FAE` | `#8FB8FF` | Historical |

### 2.5 Known inconsistency (fix when touched)

Secondary pages (`site/work/`, `site/about/`, etc.) define their own `--accent`: `#7A00C2` in light and `#B683FF` in dark. Standardise them to `#5E0ED7` / `#A87BFF` the next time a secondary-page template is edited.

---

## 3. Typography

### 3.1 Families

| Role | Family | Status |
|---|---|---|
| Body and UI | **System sans-serif** (`system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial`) 400/500/600/700 | Everywhere: homepage, `/dubai/` and all secondary pages (done 15 Oct 2026). |
| Display headings | **System sans-serif 600**, uppercase, `-0.025em` tracking, line-height 0.95 | Hero H1 and section words ("SERVICES", "PROJECTS", "PRICING"…). Big and confident through size, not weight: never 800–900. |
| Serif | — | **Removed.** No serif anywhere; the former accents (intro title, "Custom quote", "Let's talk", stat figures, names, secondary-page H1s) use the system sans-serif. No web fonts are downloaded. |
| Card and list titles | **System sans-serif** 700 | H3s in services, pricing and roadmap cards in uppercase; project-card names in title case; `-0.01em` |
| Kanit, Barlow, Caveat | — | **Retired.** No longer downloaded. Do not reintroduce. |

Enforced by `<style id="type-unify">` (homepage, `/dubai/`) and the `shell-unify` block (secondary pages). Secondary-page H2/H3 are System sans-serif 700, not a display face.

**Exception:** the logo tagline ("The Next-Gen Brand Lab") is part of the logo lockup and may render at 9–10 px. It is decorative; the logo image carries the name.

### 3.2 Scale

| Token | Phone | Desktop | Use |
|---|---|---|---|
| caption | 12 px | 13 px | Footnotes, legal, tags. **Absolute minimum anywhere.** |
| small | 13–14 px | 14 px | Secondary copy, card meta, labels |
| body | 16 px | 17 px | Paragraphs, lists |
| lede | 18 px | 20 px | Intro paragraphs |
| h3 / card title | 20 px | 20–22 px | Card names |
| h2 | 26 px | 36 px | Section headings |
| h1 | 38 px | 64–67 px | Page titles |
| display | 40 px | 88–150 px | Hero words, section words ("PROJECTS") only |

### 3.3 Rules

- **Minimums:** nothing below 12 px, and light weight (300) never below 14 px.
- **Line height:** 1.5–1.7 for body, 1.1–1.25 for headings.
- **Tracking:** headings get `-0.01em` to `-0.03em`. All-caps labels get at most `+0.08em` under 14 px.
- **All caps:** display headings (System sans-serif 600), card titles (System sans-serif 700), small eyebrows and tags. Never in body copy. Heavy black weights (800–900) are retired.
- **Card values:** one style for every card value, number or word: 24 px / 800 / violet. Mixing colours or sizes across a row reads as random; all-ink reads as flat.
- **One H1 per page:** heading levels go in order and never skip.

---

## 4. Layout and spacing

| Item | Value |
|---|---|
| Breakpoints (use these only) | `<768` phone, `768–1023` tablet, `1024–1279` laptop, `≥1280` desktop |
| Test widths | 390, 768, 1024, 1440 |
| Side gutter | 16 px phone, 28 px tablet, 40 px desktop |
| Section padding | `var(--chrome-clear)` top on homepage sections; 48–96 px elsewhere |
| Content width | 1240 px homepage grids, 1180 px `/work/`, 940 px document pages |
| Gaps | 8 / 12 / 16 / 20 / 28 px. Cards in a row: 20 px. |
| Horizontal scroll | Never on the page. Only inside an explicit rail. |
| Page backdrop | Every page: shared wallpaper video, then the 62% wash, then a full-width `var(--veil)` layer. Content sits flat on it, never in a floating card with a drop shadow. |

The homepage CSS contains many other one-off breakpoints (340, 600, 640, 719, 860, 1099...). Do not add new ones; fold existing ones into the four above when touched.

---

## 5. Shape and depth

| Element | Radius |
|---|---|
| Buttons, pills, nav items | `999px` |
| Cards | `24px` |
| Logo chip | `10px` (on photo), `14px` (logo panel) |
| Inputs | `10px` |
| Section tops (homepage) | `40 / 50 / 60px` by breakpoint |

- **No drop shadows** on new components. Depth comes from borders, surface tone and the frosted chips.
- **Frosted elements:** `rgba(255,255,255,0.84)` with `backdrop-filter: blur(8px)` on photos; `rgba(10,13,18,0.55)` with blur for dark badges.

---

## 6. Components

### 6.1 Buttons

| Variant | Spec | Use |
|---|---|---|
| **Primary** | Solid `#5E0ED7`, white text, 52 px tall, 0 28 px padding, 700 weight. Hover `#4B0AAD`. | One per section: "Book Phase 0", "View all projects" |
| **Secondary (outline)** | Transparent, ink text, 1 px `rgba(ink,0.22)` border, 48 px tall. Hover fills violet with white text. | Repeated actions: "View case study" |
| **Tertiary** | Transparent, ink text, 1 px `rgba(ink,0.30)` border, 52 px tall | Utility controls: Pause / Play |
| **Text link** | Violet, no underline in nav, underline in body copy | Inline references |

All buttons have a minimum 44 × 44 px hit area, include an arrow `→` (with `aria-hidden`) when they navigate, and show a visible focus ring.

### 6.2 Project card

Used on the homepage rail (`.qd-card`) and `/work/` (`.guide-card.wc`). Keep both in step.

```
┌──────────────────────────┐
│ [06]          screenshot │  4:3, object-position: top
│                          │  bottom scrim 22%
│ [logo chip]              │  36 px frosted chip
├──────────────────────────┤
│ Location · City          │  13 px, secondary
│ Project Name             │  20 px / 700 / -0.02em
│ ──────────────────────── │  hairline
│ ₹395.25                  │  24 px / 800 / violet (same for words)
│ Cost per form lead*      │  13 px, secondary
│ ( View case study    → ) │  secondary button, full width
└──────────────────────────┘
```

- **Width:** `clamp(272px, 78vw, 340px)` in the rail; grid `minmax(300px, 1fr)` on `/work/`.
- **Figure choice:** first point labelled cost-per-lead or CPL, otherwise the first point.
- **Photos:** every card shows a photo. When several projects share one developer screenshot, each repeat pans to a different part of it (`object-position` 50%, 0%, 100%, 25%, 75%). A logo panel (2.3) is only for a project with no screenshot at all. Per-project photos replace this as soon as they exist.
- **Hover:** border turns violet, card lifts 3–4 px, image scales 1.03, arrow shifts 3 px. All of this is off under reduced motion.
- **Links:** every card links to its existing `/work/<slug>.html`. A project without a case study links to `/work/` with the label "View in portfolio".

### 6.3 Project rail (homepage)

- **Layout:** one row, drifting left at 90 s per loop, all projects in homepage order. The loop copy is `aria-hidden` and `inert`.
- **Pausing:** the rail pauses on hover, on keyboard focus, and with the Pause/Play button (`aria-pressed`).
- **Reduced motion:** no animation, a swipeable row with scroll snap, and the Pause button is hidden.
- **Edges:** fade masks of 6% each side.
- **Below the rail:** primary "View all N projects →" (to `/work/`) and the Pause/Play button.

### 6.4 Chips and pills

- **Result chip:** violet text, violet 35% border, violet 6% fill. Use only for publishable results ("₹266 CPL · 51% sales-ready").
- **Neutral chip:** ink 75% text, ink 18% border, ink 4% fill ("Illustrative planning model").
- **Filter / jump pill:** 44 px tall, outline. When active it is ink-filled with page-coloured text and `aria-pressed="true"`.

### 6.5 Hero

The first screen has one job: say what QDnCo sells and offer one action.

**In the hero (in this order):**
1. Eyebrow: who it is for, 13 px caps, at most two lines (`text-wrap: balance`).
2. H1: the offer in the buyer's own metric ("Priced per qualified lead"). **Do not change H1 text without an SEO review.**
3. One sub-line, at most about 25 words, 17–19 px, saying how it works.
4. Two buttons: primary "Book a Phase 0 call" (solid violet) and secondary "See the work" (outline, to `#projects`).
5. Developer logo strip along the bottom as passive proof.

**Not in the hero:**
- Statistics or KPIs (₹725 Cr, 43+, 60%+). They need footnotes and context, which a hero cannot carry. They live in the intro card directly below, with their qualification note.
- Footnotes or disclaimers.
- Tickers, "Live" pills or anything that scrolls text in the first screen.
- More than two buttons.

**Layout:** split hero from 1024 px up: the sculpture video owns the left half; the copy is one left-aligned column starting at the midline, vertically centred, H1 `clamp(48px, 4.4vw, 92px)`, sub-line max 34rem (about 65–75 characters per line). Below 1024 px the copy stacks left-aligned near the bottom; on phones the buttons go full width. Never park the copy in a corner. Light and dark themes follow the same content rules.

### 6.6 Platform band

Directly under the intro card: a single row of platform and tool logos (Meta Ads, Google Ads, Google Gemini, Snapchat Ads, X Ads, Claude, Cursor, Codex, Higgsfield) with the caption "The platforms the work runs on".

- Logo plus name, never text alone. Files live in `site/brands/platforms/`; each mark's light/dark treatment comes from `classify-platform-marks.mjs`.
- One band only. The old two-row text marquee (developer names, project facts, tool names in spaced caps) was removed: it repeated the logo strip in the hero and read as noise.
- Masked edges, slow drift, no click targets inside the band.

### 6.7 Focus ring

`outline: 3px solid var(--accent); outline-offset: 3px`. Never remove focus outlines.

---


### 6.8 How we work

Replaces the old "Every phase in full" accordion list (from the QDnCo New design). It sits after the construction-scene roadmap and before the FAQ, with `id="process"`.

- **Header:** "HOW WE WORK" display heading, a grey sub-line "Six steps from first brief to scale.", and a short lede on the right.
- **Steps:** six light cards (number, Pre-launch or Post-launch pill, title, duration), 6 across on desktop, 3 on tablet, 2 on phones. They are `<button aria-pressed>`; the selected card gets a violet border and number.
- **Detail panel:** shows the selected step's label, title and full description (`aria-live="polite"`).
- **Data:** reuses `SITE_STAGES`, the same array the roadmap scene uses, so the copy lives in one place.

### 6.9 Bento and card rules (UX polish pass)

Applied by `<style id="ux-polish">` on every page; presentation only.

- **Bento groups:** related facts sit in a row of equal tiles (intro stats ×3, ad-creative scope ×2, pricing scope ×2), 12–16 px gaps, 18–24 px radius, soft white fill, hairline border. The second tile of a pair may carry a 5% violet tint.
- **Lists of questions become cards:** each FAQ item is a 20 px-radius card with a violet hover border.
- **Footer:** link columns grouped on one soft card.
- **Solid buttons:** soft ink `#262B38`, never pure black; one violet button per section.
- **Motion:** cards rise 20–24 px and fade in as they enter the viewport (CSS scroll timeline). Off under `prefers-reduced-motion`; browsers without scroll timelines simply show the cards.
- **Guides grid:** the first card spans two columns from 900 px up, so the grid reads as bento rather than a uniform list.

### 6.10 Services

Replaces the nine-card carousel (QDnCo New design and copy). `id="services"` is unchanged so the nav still works.

- **Header:** "REAL ESTATE MARKETING SERVICES." with the grey sub-line "From the first ad to the site visit." and a short lede on the right.
- **Two bento columns:** Marketing ("Generate leads") and Technology ("Manage your leads"); the second column carries a faint violet tint.
- **Services are `<details>` rows:** title, one-line summary, round plus button (fills violet when open), checklist of what is included. The first service in each column starts open.
- **One outline CTA per column** linking to `#contact`.
- `/dubai/` shows its own creatives line and two extra Dubai-specific points.

### 6.11 Marketing cost calculator

Superseded by 6.17: the page now hosts the calculator card, indexed and linked, with the rates public at the owner's request (16 Oct 2026).

### 6.12 Results proof cards (`#results`)

Three linked cards after the intro: kind label (violet), big figure, label, client + ↗. Each opens its `/work/` case study.

### 6.13 Founder film (`#founder-film`)

Soft-ink panel `#262B38`: copy and three bordered points left, 9:16 video right. Plays muted only in view, pauses off-screen and on hidden tabs, never plays under reduced motion, and offers "▶ Play with sound". Video uses `preload="metadata"`.

### 6.14 Guides teaser (`#resources`)

Three cards (kind label, title, "Open ↗") into `/insights/` with an "All guides and worksheets" link. Dubai shows its own three.

### 6.15 Closing CTA band (`#get-plan`)

Soft-ink panel before the contact form: headline + violet second line, three ticks, then a violet primary button, a WhatsApp button (muted green `#1F8F55`) and a call link.

### 6.16 Markets map (`#worldwide`)

Corridor map (Chicago → Dubai → India) and an India close-up with keyboard-selectable pins, region cards and city pills that stay in sync. Land from `assets/world.json` (Natural Earth); the static prerender omits land paths (they load at runtime). Pins mark market coverage, not offices.

### 6.17 Marketing cost calculator (`/js/estimate/`): homepage `#pricing`, `/tools/marketing-cost-calculator.html`, blog embeds

Replaces the homepage price cards and the "Included / Quoted separately" split (16 Oct 2026). One wide card, two halves (stack below ~760px, price first):

- **Left, "01 / Your price":** role, the per-campaign price (Dubai: per project, AED) as one `role="status"` line in a fixed-height slot, a fees + recommended media = total monthly investment breakdown (India), terms, the four volume tiers with the current one outlined, and what the fee includes.
- **Right, "A couple of details.":** role, service, campaign stepper, "+ Add studio production" chips, "This works. Let's talk". That swaps the right half to the quick capture ("A small first step · Get your marketing estimate", name + phone, optional project) while the price stays visible.
- **Starter band** (`data-qd-estimate="starter"`, used on About): "Your next project" copy + name/phone card. "Get my free estimate" goes to `pricingPath` (`/#pricing` or `/dubai/#pricing`) with name/phone in `sessionStorage`, prefilled in the quick capture.
- **Rates:** developer / mandate firm ₹78,000 → ₹62,400, channel partner ₹54,000 → ₹43,200 per campaign per month; Dubai = INR × 4,650 / 54,000 in AED per project. Only Meta/Google Ad Campaigns for client roles are priced. All in `site/js/estimate/catalog.js` with media and the includes list.

```html
<div data-qd-estimate data-service="ads" data-source="guide:my-post"></div>
<script defer src="/js/estimate/embed.js?v=2026-10-16-4"></script>
```

- **Options:** `data-market` (fixes the market and hides the switch), `data-role`, `data-service`, `data-count`, `data-addons`, `data-source`, `data-tone="gold"`, `data-sync-url`; starter copy via `data-eyebrow`, `data-heading`, `data-heading-em`, `data-lede`.
- **Homepage:** `PricingCalculator` renders an empty host and calls `QDEstimateWidget.mountAll` (also on `qd-estimate-ready`). The prerendered host holds a plain rate list (`.qde-fallback`) generated from the catalog; regenerate it when rates change.
- **Cache:** bump `VERSION` in `embed.js` and every `?v=` whenever these files change.
- **Leads:** exact quote in `project`, market in `catchment`, `budget` = "Discuss on call".
- Tests: `tests/estimate.test.mjs` (every rate vs. the original calculator, TypeScript strict check).

### Secondary pages added

- `/insights/` + six field guides and `worksheets.csv` (secondary-page shell, Article schema).
- `/resources/`: every public page grouped by type, titles taken from each page's `<title>`.

## 7. Motion

| Use | Duration | Easing |
|---|---|---|
| Colour, border, background state | 200 ms | ease |
| Small transforms (lift, arrow nudge) | 200 ms | ease |
| Image zoom on hover | 400 ms | ease |
| Ambient loop (rail) | 90 s per loop | linear |

Rules:
- Motion must explain something (arrival, state change) or be ambient and pausable.
- **Every** animation has a `prefers-reduced-motion: reduce` fallback that shows the final, readable state.
- Anything that moves for more than 5 s has a visible pause control.
- **Do not use:**
  - sticky stacked cards that drop over each other (removed from Projects);
  - scroll-jacking;
  - blur-to-illegible "depth" effects on readable content.

---

## 8. Imagery and logos

- **Website screenshots:** 4:3 crop, `object-position: top`, `loading="lazy"` except above the fold.
- **Files:** WebP/AVIF at 2× display size. No 4,500 px logos or 6 MB PNGs (see audit P2-5).
- **Sizing:** always reserve space (aspect-ratio or width/height) to avoid layout shift.
- **Logos:** shown on a white or frosted chip, max 24 px tall on photos and 44 px in a logo panel. A logo that is too light to read on white needs a dark variant (currently Vajram).
- **Alt text:**
  - decorative screenshots in cards use `alt=""` when the card already names the project;
  - meaningful images get descriptive alt text;
  - loop duplicates always use `alt=""`.

---

## 9. Accessibility checklist (every change)

- [ ] Text contrast at least 4.5:1 (3:1 for 24 px+ or 19 px bold)
- [ ] No text under 12 px; no light weight under 14 px
- [ ] Tap targets at least 44 × 44 px, with 8 px+ between them
- [ ] Visible focus ring on every interactive element
- [ ] Native `<button>` / `<a>`; toggles expose `aria-pressed` or `aria-expanded`
- [ ] Repeated link text has distinct accessible names (`aria-label="View case study: Indium Group"`)
- [ ] Status changes are announced (`role="status"`) without moving focus
- [ ] `prefers-reduced-motion` respected; moving content can be paused
- [ ] No hover-only information
- [ ] No horizontal page scroll at 390 px

---

## 10. SEO guardrails

- Never change URLs, `<title>`, meta descriptions, canonicals, `hreflang`, schema (`ld+json`), heading text or order, internal links, or `_headers` as part of a design change.
- Hide with the `hidden` attribute or CSS rather than deleting indexable content; every case-study link stays in the DOM.
- Keep the homepage prerendered: after changing a React component, regenerate the matching static HTML (11.2).
- Before merging, run `python3 ci/build.py` and confirm that only intended files changed.

---

## 11. Implementation notes

### 11.1 Where styles live

| File | Block | Contents |
|---|---|---|
| `site/index.html`, `site/dubai/index.html` | `<style id="ui-p0">` | Text floor, tap targets, mobile nav fade |
| same | `<style id="qd-projects">` | Project rail and cards |
| same | inline `<script>` → `function ProjectsSection()` | Rail component (React 18 UMD, `React.createElement`) |
| `site/work/index.html` | `<style id="work-portfolio">` | Portfolio cards |
| All 126 secondary pages | `<style id="shell-unify">` | Homepage-matching backdrop: veil layer over the wallpaper, no floating card |
| Secondary pages | own `<style>` in each page | Shared shell tokens (section 2.5) |

`/` and `/dubai/` must always change together; the only intended difference is the work link base (`work/` vs `/work/`).

### 11.2 Regenerating the homepage prerender

The page mounts with `createRoot`, so React replaces the static HTML on load, but crawlers and no-JS visitors see the static copy. After changing a component:

1. Serve `site/` locally (for example `npx serve site -l 4000`).
2. Load the page in a browser and copy `document.querySelector('#<section-id>').outerHTML`.
3. Replace the matching `<section id="...">…</section>` in the static HTML.
4. Run `python3 ci/build.py`.

### 11.3 Open items

| Item | Section |
|---|---|
| Homepage uses ~30 distinct font sizes (secondary pages use 8–10); snap them to the 3.2 scale | 3.2 |
| Standardise secondary-page accent colours | 2.5 |
| One-row mobile header with a menu button | audit P0-3 |
| Image optimisation (screenshots, team photos, logos) | 8 |
| Dark Vajram logo variant | 8 |
| Per-project photos for the 5 Brigade projects (currently one shared screenshot) | 6.2 |
| Consolidate breakpoints | 4 |
| Secondary-page header (solid bar + "Back to site") still differs from the homepage's floating pill nav | 4 |

---

## 12. Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-10-15 | Text floor 12 px, tap targets 44 px | UI audit P0: 3,750 chars under 12 px and 102/166 small targets on mobile |
| 2026-10-15 | Projects: sticky stacked cards replaced by a light-card rail | 9,141 px section, one project visible at a time |
| 2026-10-15 | Rail drifts left in homepage order with pause control | Scroll Stop reference; WCAG 2.2.2 |
| 2026-10-15 | `/work/` is the all-projects page (no new URL) | Keeps existing rankings and links |
| 2026-10-15 | Ink + violet palette; one solid button per section | Black buttons dominated; violet was missing from the section |
| 2026-10-15 | Auto-generated "Brutalism, pink/cyan, Cinzel" system rejected | Conflicts with the QDnCo brand and the decisions above |
| 2026-10-15 | Every card shows a photo; repeat developers pan the shared shot | Logo panels read as missing photos |
| 2026-10-15 | All card values in ink, one style | Violet numbers next to ink words looked inconsistent |
| 2026-10-15 | All card values in violet, one style, plus violet CTA arrow and divider tint | All-ink cards looked flat and black; the colour must be consistent, not absent |
| 2026-10-15 | Secondary pages use the homepage backdrop (wash + veil, no floating card) | Grey gutters and a floating card made other pages feel like a different site |
| 2026-10-15 | Three families site-wide: System sans-serif (text), Kanit (display), Instrument Serif (accent); Barlow and Caveat retired; homepage lede 19 px → 17 px | Five families and two different body fonts made pages feel like different sites |
| 2026-10-15 | Hero: stats, footnote and Live ticker removed; eyebrow + H1 + one sub-line + two CTAs | Numbers crowded the first screen; they remain in the intro card below with their qualification note |
| 2026-10-15 | Hero copy moved from bottom-right to a vertically centred left-aligned column in the right half | Corner placement left a large empty area and read as stranded |
| 2026-10-15 | Two-row text marquee removed; the platform logo band (incl. Higgsfield) moved into its place under the intro | Spaced-caps text rows looked cluttered; the logo band says the same thing visually |
| 2026-10-15 | Display type moved from Kanit Black caps to Instrument Serif title case; card titles System sans-serif 700; Kanit retired (two families site-wide) | Heavy black caps felt loud and generic; the serif matches the intro card, names and secondary-page H1s and reads premium |
| 2026-10-15 | Display headings back to big uppercase sans: System sans-serif 600 with tight tracking (replaces the brief serif trial) | Owner wanted the bold heading presence kept, only lighter than Kanit Black |
| 2026-10-15 | System sans-serif replaces Inter as the single sans-serif (all 128 pages); headings 600 uppercase at -0.025em | Owner preferred it over Inter, Manrope, Sora, Outfit and Space Grotesk in a side-by-side; it is also Scroll Stop's typeface |
| 2026-10-15 | "Every phase in full" list replaced by the How we work step cards + detail panel; all fonts switched to the system sans-serif stack (no web fonts) | Owner preferred the QDnCo New design; system sans removes every font download |
| 2026-10-15 | UX polish pass: bento tiles, FAQ cards, footer card, softer violet #5B32C8 and ink #262B38, scroll-reveal motion | Visual hierarchy without touching words, links, headings or schema (verified: identical text and SEO snapshot on all 128 pages) |
| 2026-10-15 | Services carousel replaced by the QDnCo New two-column Marketing / Technology layout and copy | Owner request; easier to scan than a nine-card carousel with blurred neighbours |
| 2026-10-15 | Ported QDnCo New features on feature/new-site-port: proof cards, founder film, guides teaser, CTA band, markets map, field guides, resource library, cost calculator | Owner asked to bring everything new from the QDnCo New site; company profile PDF held back (stamped PRIVATE REVIEW) |
| 2026-10-16 | Estimate card ships in violet; gold kept only as an opt-in `data-tone="gold"` | Owner chose violet after a side-by-side /design-review: one accent sitewide (1.2, 2.2), no serif (3.1) |
| 2026-10-16 | Homepage pricing cards replaced by the marketing cost calculator; About gets the starter band instead of the calculator | Owner request: show exact price points; research favours ungated live pricing with fees, media and total shown separately |
