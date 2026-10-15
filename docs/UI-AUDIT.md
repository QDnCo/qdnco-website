# QDnCo Website UI Audit

Audited: 15 Oct 2026 · Branch: `feature/ui-changes` · Source: `site/` (the production tree)
Method: rendered the live static site locally (`http://localhost:4000`) in headless Chromium at 390 px (phone) and 1440 px (desktop), took screenshots, and measured computed font sizes, tap targets and page weight with scripts. Static CSS was read from the inlined `<style>` blocks.

Pages sampled: `/`, `/dubai/`, `/about/`, `/pricing/`, `/work/`, `/guides/`, `/answers/`. The other ~120 pages (answers, guides, work, areas, compare, data, legal, dubai guides) share the secondary-page template, so findings there apply to all of them.

---

## 1. Summary

The site has two visual systems that do not match each other.

| | Homepage + `/dubai/` | All other pages (~125) |
|---|---|---|
| Build | React app, prerendered, 750-780 KB HTML each | Static shell, 20-43 KB HTML each |
| Body font | **Kanit** (a display face) | Inter |
| Type scale | Token-driven (`--fs-*`), 100+ distinct font-size values | Simple, consistent |
| Smallest text | 9-11 px, widely used | 12 px (footer, labels) |
| Mobile body | 16 px, but 40% of characters are 9-13 px | 16 px, consistent |
| Feel | Bold, editorial, heavy motion | Clean, calm, document-like |

The secondary pages are in good shape. Almost every real problem is on the homepage and its Dubai twin, and most of it is **small text and small tap targets on phones**.

### Scorecard

| Area | Homepage / Dubai | Secondary pages |
|---|---|---|
| Body text size | Needs work | Good |
| Small text (under 12 px) | **Poor** | Fair |
| Tap targets (44 px) | **Poor** | Fair |
| Mobile navigation | **Poor** | Good |
| Heading hierarchy and scale | Good on desktop, fair on mobile | Good |
| Font strategy | **Poor** (5 families) | Fair (4 families) |
| Image weight | Fair | Fair |
| Layout / horizontal overflow | Good (no horizontal scroll) | Good |

---

## 2. Priority fixes

### P0: fix first (readability and usability on phones)

#### P0-1. Too much text under 12 px on the homepage

Measured on `/` at 390 px, by character count:

| Size | Characters | Where |
|---|---|---|
| 9 px | 129 | metrics footnote ("Qualification covers overall leads...") |
| 10 px | 2,352 | service-card body copy, stat labels, team role labels, brand tagline |
| 11 px | 1,277 | service-card detail lists ("One-to-one interviews with your id...") |
| 12 px | 4,271 | most captions and chips |

On desktop, 2,311 characters are 11 px. Thin weights make it worse: `font-body font-light` at 10 px (15 text nodes) is the hardest text on the page to read.

Rule of thumb: nothing below 12 px, anything a user must read to decide (service detail, stat labels, footnotes) at 14 px or more.

Fix:
- Raise the floor. In the token block, set `--fs-micro` to `clamp(0.75rem, 0.9vw, 0.86rem)` (12 px minimum, already close) and **remove the literal `9px`, `10px`, `11px` declarations**: `.metrics-attribution`, `.intro-metrics-note`, `.intro-stat-k`, `.project-source-note`, `.hero-light-stat .tracking-widest`, plus the Tailwind-style `text-[10px]`/`text-[11px]` classes on the service cards.
- Service-card detail text (`rounded-md.font-body` at 11 px, `font-light` at 10 px): move to 14 px, weight 400.
- Drop `font-light` below 14 px everywhere.

#### P0-2. Tap targets: 102 of 166 interactive elements are under 44 px (mobile)

Same on `/dubai/`: 106 of 173. Secondary pages are 26-40 per page, mostly footer link rows.

Fix:
- Give footer links, chip filters, carousel dots and the service-card expander a minimum 44 x 44 px hit area. Padding is enough; the visual size can stay.
- Carousel dots under the services slider are about 6 px. Make the clickable area 44 px and keep the dot visual.
- Add `@media (pointer: coarse)` rules (the file already has two) to apply this only on touch devices so desktop density is unchanged.

#### P0-3. Mobile header is two rows and clips its own navigation

At 390 px the header takes about 130 px of the 844 px viewport, and the nav pill row is cut off ("R..." after Pricing, so Roadmap and FAQ are unreachable without a sideways swipe nobody knows exists). The "Live" ticker pill also clips mid-word (`:GF 2.0`, `Kumar P`).

Fix:
- Collapse to one row on phones: logo, "Book Phase 0", menu button. Move the six links into a menu sheet.
- Keep the Home/Services/... pill nav for 1024 px and up only.
- Let the Live ticker truncate with an ellipsis and a fade, or hide it below 480 px.

### P1: do next (visual polish)

#### P1-1. Body font is a display face

`body { font-family: Kanit }` on `/` and `/dubai/`. Kanit is heavy, geometric and tuned for headlines. In paragraphs it reads dense and uneven, especially at 10-13 px in light weights. The secondary pages already use Inter for body and look noticeably calmer.

Fix: Inter (or Barlow) for body and UI text; keep Kanit and Instrument Serif for display headings and big numerals only.

#### P1-2. Five font families, 20+ weights, one render-blocking request

The homepage loads Inter (4 weights), Instrument Serif (2 styles), Caveat (3 weights), Barlow (6 weights) and Kanit (7 weights) in one Google Fonts URL. Caveat is only needed on the homepage and Dubai page (and was not seen in use in the sampled sections).

Fix:
- Cut to three families: **Inter** (body/UI), **Kanit** (display), **Instrument Serif** (accent).
- Limit each to the weights actually used: Inter 400/500/600, Kanit 600/800, Instrument Serif 400 and italic.
- Drop Caveat and Barlow if a visual check confirms they are unused.
- Self-host (woff2, `font-display: swap`) to remove the third-party request.

Expected result: fewer bytes, less layout shift on first paint, one consistent voice.

#### P1-3. Hero composition on desktop

- "PRICED / PER QUALIFIED / LEAD" is right-aligned with a ragged left edge and visually competes with the 3D sculpture and the three stats. The eye does not know where to start.
- The stat row (725 Cr / 43+ / 60%+) is scattered across two rows with different alignment.
- The brand-logo strip at the bottom clips a logo behind the circular scroll button at far left ("RE... PERTIES").

Fix:
- Pick one reading line: headline top-right, stats in a single aligned row beneath it, CTA after.
- Use `text-wrap: balance` on the headline so the break is even.
- Add 120 px left padding to the logo strip (or move the circular control) so no logo sits under it.

#### P1-4. Service cards: blurred neighbours are unreadable, active card truncates

On the Services carousel the side cards (04, 06) are blurred to the point that text is illegible, which is intended as depth but shows as "broken" at a glance. The active card's list cuts mid-sentence ("Studio package (quoted separately): professional") with no visible scroll hint.

Fix:
- Reduce blur from the current level to about 2-3 px and raise opacity so titles stay legible.
- Give the active card's content a visible fade and "scroll" affordance, or let it grow to fit.

#### P1-5. Mobile hero overlaps the sculpture

At 390 px "PRICED PER QUALIFIED LEAD" is drawn on top of the 3D object, which reduces contrast on the letters that sit over the dark parts.

Fix: stack on mobile (sculpture first, then headline), or add a soft scrim behind the headline.

#### P1-6. Letter-spaced caps overused for labels

Many labels use all caps with 0.12 to 0.16 em tracking at 10-12 px (stat labels, team roles, marquee text). All caps plus wide tracking at small sizes slows reading.

Fix: sentence case or title case for labels longer than two words; reserve all caps for one-word tags. Keep tracking at or below 0.08 em under 14 px.

### P2: cleanup (consistency and hygiene)

#### P2-1. 100+ distinct font-size values, many one-offs

Examples of near-duplicates: `0.75rem`, `0.76rem`, `0.8rem`, `0.9rem`, `0.92rem`, `0.95rem`, `14px`, `14.5px`, `15px`, `17px`, `21px`, plus 10 different `clamp()` expressions.

Fix: standardise on the existing tokens and add two or three missing steps. Proposed scale:

| Token | Phone | Desktop | Use |
|---|---|---|---|
| `--fs-caption` | 12 px | 13 px | footnotes, legal, tags (minimum anywhere) |
| `--fs-small` | 14 px | 14 px | secondary copy, card detail, labels |
| `--fs-body` | 16 px | 17 px | paragraphs, lists |
| `--fs-lede` | 18 px | 20 px | intro paragraphs |
| `--fs-h3` | 20 px | 22 px | card titles |
| `--fs-h2` | 26 px | 36 px | section headings |
| `--fs-h1` | 38 px | 64 px | page titles (matches current secondary pages) |
| `--fs-display` | 40 px | 88-120 px | hero numerals and section words only |

Line-height: 1.55 to 1.7 for body, 1.1 to 1.2 for display. Both templates are already near this.

#### P2-2. Secondary pages: 8-9 px logo tagline and 12 px footer

- `THE NEXT-GEN BRAND LAB` under the logo renders at 8 px (mobile) and 9 px (desktop) on every secondary page. Raise to 10-11 px (decorative, but still visible) or drop it on phones.
- Footer links and legal lines are 12 px with low-contrast purple. Raise to 14 px, add vertical spacing (the rows are about 20 px apart and fail the 44 px target rule).
- The grey "Last updated" line and stat captions on `/about/` are light grey on near-white. Check contrast and darken to at least 4.5:1 (contrast was **not** measured in this audit, only visually reviewed).

#### P2-3. Two H1-style headlines per page in the homepage markup

Only one `<h1>` exists on `/` (confirmed in the rendered page), but the raw HTML contains two. Check the prerendered source; the second is probably a hidden or alternate-language variant. Keep exactly one visible H1 per page.

#### P2-4. Two visual identities

A visitor going from `/` (dark, heavy, animated) to `/pricing/` (white, quiet, document) sees a different brand. The "Back to site" pill on secondary pages also points to a page with a different header.

Fix (low effort): bring the secondary-page header and footer closer to the homepage: same logo lockup, same "Book Phase 0" button style, same footer links. Keep the calm body layout, that part works.

#### P2-5. Images: large sources, small displays

| File | Source size | Shown at |
|---|---|---|
| `shots/nambiar-hero.png` | 6.7 MB | hero image |
| `team/*-r02.png` | 1.3 to 1.7 MB each | about 112 px portraits |
| `portrait-cutout.png` | 1.3 MB | portrait |
| `vajram.webp` / `kumar.png` (logo strip) | 4,500 px wide | 109 px and 141 px |

Fix: export 2x of the displayed size as WebP/AVIF, keep PNG only where transparency needs it. Add explicit `width`/`height` to every `<img>` to avoid layout shift. 40 of 95 homepage images already use `loading="lazy"`; the rest should too, except the first screen.

This is the biggest page-speed win and has no visual effect.

---

## 3. Per-page notes

| Page | Verdict | Notes |
|---|---|---|
| `/` | Needs work | P0-1, P0-2, P0-3, P1-1 to P1-6. 31,666 px tall on phone; consider a short sticky section index. |
| `/dubai/` | Needs work | Same template as `/`, same issues. Fix once, both pages benefit. |
| `/about/` | Good | Clear hierarchy, readable 17 px body. Fix footer size (P2-2); stat boxes feel flat, add a one-line context under each number. |
| `/pricing/` | Good | Check the pricing table at 390 px for sideways scroll (not reproduced, but 188 chars at 13 px suggests tight cells). Raise table text to 14 px. |
| `/work/` | Good | 1,799 chars at 15 px and 820 at 14 px for card metadata. Fine, but card meta could be one step larger. |
| `/guides/` | Good | Clean list layout. Add reading time and a visual cue per guide to break the wall of text. |
| `/answers/` | Fair | 3,182 chars at 14 px in the question lists. Raise to 15-16 px; these are the pages people actually read. |
| `/legal/*` | Not sampled | Same shell as `/about/`. |

---

## 4. What is already good (keep it)

- Heading scale on secondary pages (38 px phone, 67 px desktop) is confident and consistent.
- Body line-height (1.68) and 17 px desktop body are comfortable.
- No horizontal scroll at 390 px or 1440 px on any sampled page.
- Light/dark toggle is present and works.
- Reduced-motion is honoured (15 `prefers-reduced-motion` rules).
- No console errors on any sampled page.
- The "Book Phase 0" CTA is clear and repeated at sensible points (header, floating button, end of page).

---

## 5. Suggested implementation order

1. **Type floor + tap targets** (P0-1, P0-2): CSS only, no markup change, lowest risk, biggest usability gain.
2. **Mobile header** (P0-3): one component.
3. **Font diet** (P1-1, P1-2): body font swap and font loading. Check every page once visually.
4. **Image optimisation** (P2-5): no visual change, faster pages.
5. **Hero and service cards** (P1-3 to P1-5): needs design sign-off.
6. **Scale clean-up and secondary-page header/footer alignment** (P2-1, P2-4): do last, touches many files.

Where the homepage CSS lives: it is generated, not hand-edited. The page is built from `src/` and the generator scripts at the repo root (`prerender.mjs`, `build-dist.mjs`, `site-shell.mjs`, `_jsx-source/`) and then copied into `site/`. Change the source and regenerate, or edit `site/index.html` and `site/dubai/index.html` directly and keep the two in step. Confirm with the team which route is current, because editing only `site/` can be overwritten by the next regeneration.

---

## 6. SEO safety checklist (the site ranks well; protect it)

Every change above is presentation-only. While making them:

- Do not change URLs, titles, meta descriptions, canonicals, heading text or order, schema (`ld+json`), internal links or `_headers`.
- Keep exactly one `<h1>` per page, with the same text.
- Do not hide existing text with CSS to make the page look shorter; resize it instead.
- Keep image `alt` text and file names unless redirects are added (changing a file name changes its URL).
- Keep the homepage prerendered HTML intact; do not move content to client-side only rendering.
- Font and image changes help Core Web Vitals (LCP, CLS), which is a ranking input, so they are a net positive if done carefully.
- Verify before merging: run `python3 ci/build.py` and compare the release manifest for files you did not intend to change.

### SEO hygiene note (not UI, flag for the team)

The homepage head contains **45 `hreflang` link tags that are 15 repeats of the same three** (`en-IN`, `en-AE`, `x-default`). Duplicates are harmless to Google but are noise, and they suggest a generator step that appends instead of replacing. `/dubai/` has the correct three. Worth fixing at the source with a one-line dedupe, after confirming with whoever owns the SEO tooling.

---

## 7. What this audit did not cover

- **Colour contrast** was reviewed visually, not computed per element. Run an automated check (axe, Lighthouse) on `/`, `/about/` and `/pricing/` before and after the changes.
- **Dark mode** was not reviewed in depth, only that the toggle exists.
- **Real devices**: measurements are from a headless browser at fixed viewports. Check one real iPhone and one mid-range Android.
- **Animation performance** (scroll-driven sections, 3D sculpture, video wallpaper) was not profiled.
- **The remaining ~120 secondary pages** were assumed to follow the shell of the sampled ones. A quick screenshot sweep after changes would catch outliers.
- **Forms**: the lead-capture form was not exercised, as it posts to the live backend.
