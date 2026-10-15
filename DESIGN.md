# QDnCo Design System

The single reference for every UI change on qdnco.com. If a change needs something this file does not cover, update this file first, then build.

- Applies to: `site/` (production). Homepage and `/dubai/` (React, prerendered), the ~125 static secondary pages, and `/work/`.
- Background research: [`docs/UI-AUDIT.md`](docs/UI-AUDIT.md), [`docs/SCROLLSTOP-DEEP-RESEARCH.md`](docs/SCROLLSTOP-DEEP-RESEARCH.md).
- Last updated: 15 Oct 2026.

---

## 1. Principles

1. **Restraint.** Fewer sections, fewer styles, fewer colours. If two components do the same job, keep one.
2. **One accent, one job.** Brand violet means "act" or "this is a real number". Nothing decorative is violet.
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

- **Hex:** `#5E0ED7` (the "Book Phase 0" colour). Hover/pressed: `#4B0AAD`.
- **Use it for:**
  - the one primary CTA per section;
  - the active nav item;
  - real figures (₹, %, counts, acres);
  - text links;
  - the focus ring;
  - result chips.
- **Never use it for:** backgrounds of large areas, decorative icons, body text, or more than one solid button in view.
- **Contrast:** white on violet is 8.3:1, and violet on the card surface is 8.1:1. Both are safe at any size.

### 2.3 Fixed-light components

Project cards (homepage rail and `/work/`) stay light in both themes, so they use fixed values:

| Token (component scope) | Value |
|---|---|
| Card surface | `#FCFBF9` |
| Card text | `#0A0D12` |
| Card secondary text | `rgba(10,13,18,0.66)` |
| Card border | `rgba(10,13,18,0.14)`, hover `rgba(94,14,215,0.45)` |
| Logo panel (repeat developer) | `linear-gradient(160deg, #F7F5FB, #EBE8F3)` |
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
| Body and UI | **Inter** 400/500/600 | Target everywhere. Secondary pages already use it. |
| Display | **Kanit** 600/800 | Headlines, big numerals, section words only. **Not for body.** |
| Accent serif | **Instrument Serif** 400 + italic | Sparing editorial accents (names, pull quotes) |
| Barlow, Caveat | — | **Being removed.** Do not use in new work. |

The homepage still sets `body` to Kanit; moving homepage body text to Inter is an open item (section 11).

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
- **All caps:** one- or two-word tags only. Longer labels are sentence case.
- **Figures vs words:** in a figure slot, real numbers render 28 px / 800 / violet. Words ("Luxury", "Meta + Google") render 20 px / 600 / ink.
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
│ ₹395.25                  │  28 px / 800 / violet (figure)
│ Cost per form lead*      │  13 px, secondary
│ ( View case study    → ) │  secondary button, full width
└──────────────────────────┘
```

- **Width:** `clamp(272px, 78vw, 340px)` in the rail; grid `minmax(300px, 1fr)` on `/work/`.
- **Figure choice:** first point labelled cost-per-lead or CPL, otherwise the first point.
- **Repeat developers:** only the first card for a developer shows the website screenshot; later cards show a centred logo panel (2.3).
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

### 6.5 Focus ring

`outline: 3px solid var(--accent); outline-offset: 3px`. Never remove focus outlines.

---

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
| Homepage body font from Kanit to Inter; drop Barlow and Caveat | 3.1 |
| Standardise secondary-page accent colours | 2.5 |
| One-row mobile header with a menu button | audit P0-3 |
| Image optimisation (screenshots, team photos, logos) | 8 |
| Dark Vajram logo variant | 8 |
| Per-project images for Brigade projects | 6.2 |
| Consolidate breakpoints | 4 |

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
