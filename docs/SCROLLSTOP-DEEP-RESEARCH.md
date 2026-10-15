# Scroll Stop (scrollstop.agency): Deep Research and Transformation Brief

Audited: 15 Oct 2026 · Target: https://www.scrollstop.agency/ (+ `/portfolio`, `/about`, `/contact`)
Method: headless Chromium (gstack `$B`) at 1440 px and 390 px. Extracted rendered text, computed styles (font, size, weight, tracking, colour, radius, padding), section geometry, link map, video elements and Framer layer names. Screenshots reviewed for every page.
Compared against: current QDnCo site (`site/index.html`, see `docs/UI-AUDIT.md`).

**What this document is.** A teardown of what Scroll Stop does, why it works, and how to bring the same principles to QDnCo. It is a design and structure study. It is not a licence to copy their copy, client logos, videos or founder photos. Everything below is expressed as a principle or a pattern to re-implement with QDnCo's own content.

**What I could not capture** (so you do not rely on it):
- FAQ answer text. The accordions are collapsed Framer variants and the answers are not in the DOM until opened. The five questions are listed in section 3.8; answers are unknown.
- Exact scroll-triggered animation curves and durations. I saw the end states and the layer names, not the timeline.
- Hover states beyond what is inferable from the variant names.
- Analytics, pricing, conversion numbers. None are public.

---

## 1. One-paragraph read

Scroll Stop is a one-offer, one-action site. A dark, near-empty canvas, a single 70 px headline that states the outcome ("High-Converting Ads that Lower Your CAC"), a row of real vertical ad creatives as proof, a logo wall, a four-step process, four hard numbers, five FAQs, and a repeated blue "Book a call". Every section either proves the claim or pushes the same CTA. The whole home page is about 4,190 px tall on desktop, roughly five screens. There is no pricing, no blog, no case-study essay. The Contact page then **qualifies hard** ("spends over Rs 10L/month on Meta ads") so the funnel filters instead of collecting everything.

The lesson is restraint plus proof. The design is not clever. It is disciplined.

---

## 2. Tech and build facts

| Item | Finding |
|---|---|
| Builder | **Framer** (class names `framer-*`, layer names exposed via `data-framer-name`) |
| Hosting of media | `framerusercontent.com`, hero reels are **`.webm`**, muted, looped, 275 x 425 px (about 9:14) |
| Page weight signals | 77 images, 6 videos on home. Videos are `autoplay=false` in markup and started by Framer's viewport logic |
| Fonts | **Plus Jakarta Sans** (headings, nav, buttons), **Inter** (body paragraphs, nav links in footer, 13 px caps), **Archivo** (stat numerals). Syne is declared but not used on the pages I measured |
| Page background | `#0D0D0D` (rgb 13,13,13) on `body`, sections either transparent or the same `#0D0D0D` |
| Home page height | 4,187 px main, 5,454 px full at 1440 wide |
| Nav | Fixed, 92 px tall region, logo left, pill links centre, white "Book A Call" pill right |
| Stack signals | No GSAP, Lenis or ScrollTrigger globals found. Motion is Framer's native appear, scroll-linked and marquee components |
| SEO | `<title>` is just "Scroll Stop". Meta description is one sentence. Single OG image. Thin. QDnCo is already far ahead here |

---

## 3. Section by section

Page order on `/` (desktop, 1440 x 900):

| # | Section | Height | Background | Padding |
|---|---|---|---|---|
| 0 | Fixed nav | 92 | transparent over page | 30/7/6/20 |
| 1 | Hero + reel + logos | about 1,000 | `#0D0D0D` | `0 50px` |
| 2 | Services ("From Concept To Completion") | 1,123 | transparent | `0` |
| 3 | About + stats | 761 | transparent | `100px 50px` |
| 4 | FAQ | 716 | `#0D0D0D` | `100px 50px` |
| 5 | CTA + footer | 724 | `#0D0D0D` | `100px 50px 50px` |

### 3.1 Nav
- Logo is a two-line wordmark ("scroll / stop.") in white, top-left.
- Three text links (Home, Portfolio, About Us) with 14 x 16 px padding and a 26 px radius. Active link is **blue `#0072EF`**, others are white at 80% opacity.
- One primary action: white pill, `#0D0D0D` text, 147 x 44 px, radius 40 px, label "Book A Call".
- The nav sits on top of the hero with no background until you scroll. On scroll it compresses into a floating pill.
- Mobile: logo plus a single hamburger icon in a rounded square. No CTA in the collapsed bar.

**Why it works.** Three links, one button. Nothing to decide. The only high-contrast object in the bar is the CTA.

### 3.2 Hero
- H1: Plus Jakarta Sans 700, **70 px / 77 px line height, -3.5 px tracking (-0.05em)**, pure white, centred, two lines.
- Subhead: Inter 17 px / 25.5 px, white, one sentence, about 60 characters.
- Two CTAs, same blue `#0072EF`, pill radius 54 px, 167 x 60 px: "Book A Call" above the reel, "See Our Work" below it.
- Headline has a subtle gradient fade on its trailing letters, not a flat white.

**Why it works.** The headline states an outcome in the buyer's own metric (CAC), not what the agency is. The subhead says how. Neither is longer than a breath.

### 3.3 Ad reel (the proof)
- A horizontal row of 6 vertical video cards, 275 x 425 px, rounded about 20 px, with a gap of 14 to 16 px.
- It auto-scrolls as an infinite marquee. Cards bleed off both edges, which signals "there is more".
- Videos are muted loops of real client ads (UGC, talking heads, product macro).
- A "See Our Work" button sits directly under it, so the proof leads to the portfolio.

**Why it works.** The product is video ads, so the site shows the product instead of describing it. Vertical format matches how the ads actually run, so the buyer sees them as their customers will.

### 3.4 Brand logo wall
- Two stacked rows inside rounded-pill "tracks" with a 1 px low-contrast border.
- Logos are white or monochrome, equal height, with hairline dividers between cells.
- The rows move in **opposite directions** (marquee), with fade-out masks at both ends.
- About 25 brands (Dream11, Frido, Wakefit, Duroflex, Manyavar, Cult.fit, MakeMyTrip, Goibibo and others).

**Why it works.** Monochrome logos stop the wall from fighting the hero. Opposite-direction rows add life without a single hard animation.

### 3.5 Services: "From Concept To Completion: We've Got You Covered!"
- Two-column layout. Left: H2 in Plus Jakarta Sans 600, **30 px / 36 px, -0.6 px tracking**, **sticky**, it follows the reader while four cards scroll past on the right.
- Right: four stacked cards, each with H3 (600, **26 px / 39 px, -0.78 px**) and 14 to 15 px body in grey.
- Cards: 1 px low-contrast border, about 20 px radius, subtle top-left gradient sheen, transparent fill, generous inner padding.
- The four steps: **Research & Strategy → In-House Production → Post-Production → Test, Analyse & Scale.**
- Copy per card is 1 to 3 sentences. The last card is the longest and ends on the outcome ("unlocking scalable ROAS").

**Why it works.** The sticky heading keeps the claim in view while the proof stacks up. The process doubles as the pitch: it tells a nervous buyer exactly what happens to their money.

### 3.6 About and stats
- Left column label "About Our Agency" (H2, 30 px). Right column holds a large statement paragraph, about 24 px, with **mixed weight and opacity**: "Scroll Stop is a **performance-driven** creative agency..." where the key phrases are bright white and the rest is dimmed grey.
- Then a smaller paragraph and "Our Mission".
- Stats grid, 2 x 2: **65 Brands Helped, 2300+ Ads delivered, 12 Cr+ Ad spends, 50 Cr+ Revenue generated.**
- Numerals: Archivo 400, **64 px**, white at reduced opacity so they read as ghosted until scroll-in. Labels are 11 to 12 px caps, wide tracking, grey.
- A thin cross-shaped divider sits in the middle of the grid.

**Why it works.** Four numbers, two of which are money. The font is a different family on purpose, so the numerals read as data rather than copy.

### 3.7 About page extras
- "Meet The Founders!" with two large portrait cards: image, name, role tagline ("The Left Brain", "The Right Brain"), a short bio, and two full-width link rows (LinkedIn, Instagram) with an arrow.
- "Our Creative Playground: Where Brands Shine!": a 4-column logo grid inside a large rounded container, fading out at the bottom edge to imply more.

**Why it works.** The left/right brain device is memorable and maps to the two halves of the offer (performance and production). Founder faces remove the "faceless agency" objection.

### 3.8 FAQ
- Centred H2 ("Got Questions? We've Got Answers!"), five full-width accordion rows, max width about 760 px.
- Each row: 1 px border, 12 to 14 px radius, 15 px question text, chevron on the right.
- Questions (answers not captured): *What is Scroll Stop? · How do you charge? · How long does the process take? · Do you work with influencers? · Am I qualified to work with Scroll Stop?*
- The FAQ block is **reused on Home, About and Contact** with a different H2 each time ("Curious? Check Out the Scoop!" on Contact).

**Why it works.** The questions are the objections in the order a buyer has them: what, how much, how long, who is it for. The last one is a self-qualifier.

### 3.9 Closing CTA and footer
- A large rounded container with a **blue gradient glow from the top-left corner**, fading to `#0D0D0D`. It is the only coloured area on the page.
- Inside: H2 "Let's Scale your Brand with Video Ads" and a full-width pill button, `#0072EF`, 651 x 84 px, radius 54 px, label "Book a call" plus arrow icon.
- Below it, a second rounded card "Quick Links" (Home, Projects, About, Contact) in a 2-column list, 13 px caps Inter 600, active page in blue.
- Last row: two split link bars, LinkedIn and Instagram, each with an icon on the left and an arrow on the right.
- No legal wall of text, no 5-column mega footer.

**Why it works.** The page ends on the same ask it opened with. The footer is built from the same rounded cards as the content, so it feels like a continuation instead of a different zone.

### 3.10 Portfolio page
- H1 "Our Portfolio" (same 70 px scale), a logo marquee, then a **filter pill row**: Ads - UGC, Ads - High Production, Apps & Services, Fashion & Lifestyle, Food & Drink, Health & Wellness, Home Improvement, Kids & Pets, Personal Care, Tech & Products.
- Grid of vertical video cards, each tagged with category and brand name. 100+ items, loaded lazily (the full-page capture showed black placeholders for off-screen cards).
- Two dominant top-level pills in blue ("Ads - UGC", "Ads - High Production") above the category pills. That is a two-level filter: format first, vertical second.

**Why it works.** A buyer who sells skincare filters to Personal Care and sees only relevant ads in two clicks.

### 3.11 Contact page
- H1 "Contact us" (70 px), one friendly paragraph.
- A large rounded card, two columns.
  - Left: **"This is for you if your brand:"** with four bullets (has product-market fit; needs performance creatives to scale on Meta; spends over Rs 10L/month on Meta ads; is ready to scale).
  - Right: form with Name, Email, Phone, Brand name, Website URL, **Meta spend dropdown** (Less than 5L / 5-10L / 10-50L / 50L-1Cr / 1Cr+), "What would you like to discuss", "How did you hear about us".
- Inputs are dark grey `#2A2A2A`-ish fills, 8 px radius, 12 px labels above, blue pill Submit.

**Why it works.** The left column pre-qualifies before the form. The spend dropdown gives the sales team a score before they open the email.

---

## 4. Design system (extracted)

### 4.1 Colour

| Token | Value | Use |
|---|---|---|
| bg | `#0D0D0D` | page and section background |
| surface | about `#161616` to `#1A1A1A` | cards, inputs, footer blocks |
| border | white at 8 to 12% | 1 px card and pill outlines |
| text-primary | `#FFFFFF` | headings, key phrases |
| text-secondary | white at 60 to 80% | body, nav links |
| text-tertiary | white at 35 to 45% | ghosted stats, minor labels |
| accent | **`#0072EF`** | every primary CTA, active nav, active footer link, glow |
| on-accent | `#FFFFFF` | label on blue buttons |
| inverse | `#FFFFFF` bg / `#0D0D0D` text | the one nav CTA |

One accent colour, used for one job: "act". That is the entire palette discipline.

### 4.2 Typography

| Role | Family | Size / line | Weight | Tracking |
|---|---|---|---|---|
| H1 | Plus Jakarta Sans | 70 / 77 | 700 | -3.5 px (-0.05em) |
| H2 | Plus Jakarta Sans | 30 / 36 | 600 | -0.6 px (-0.02em) |
| H3 | Plus Jakarta Sans | 26 / 39 | 600 | -0.78 px (-0.03em) |
| Statement paragraph | Inter | about 24 / 30 | 300 to 400 | normal |
| Body | Inter | 14 to 17 / 1.5 | 400 | normal |
| Nav / buttons | Plus Jakarta Sans | 16 / 19 | 500 to 600 | normal |
| Footer links | Inter | 13 / 26 | 600, caps | wide |
| Stat numerals | Archivo | 64 | 400 | normal |
| Stat labels | Inter | 11 to 12 | 500, caps | wide |

Notes:
- Headings are **tightly tracked**. That is what gives the "premium agency" feel more than the font choice.
- The jump from H1 (70) to H2 (30) is 2.3x. There is no 40 to 56 px middle tier. Hierarchy is stark.
- The only light weight is in the statement paragraph, where it is used to dim secondary phrases.

### 4.3 Spacing and layout
- Section padding: **100 px top and bottom, 50 px sides** on desktop. Hero is `0 50px`.
- Content grid: two columns, roughly 1/3 label, 2/3 content, on About and Services.
- Max content width about 1,340 px, with FAQ and Contact intro narrower (about 760 px).
- Gaps inside card stacks: 14 to 24 px.
- Large empty bands between sections. The page breathes.

### 4.4 Shape
- Buttons and nav links: **fully pill** (26 to 54 px radius).
- Cards and containers: **20 to 36 px radius**, 1 px border.
- Inputs: 8 to 12 px radius.
- Everything is round. There is not one sharp corner on the page.

### 4.5 Depth and effect
- No drop shadows. Depth comes from borders, surface lightness and one blue glow.
- A very faint **vertical hairline pattern** runs across the background of About, FAQ and Contact (visible as thin vertical lines). It adds texture to a flat black without any imagery.
- The headline gradient fade and ghosted stats use opacity, not colour, to build hierarchy.

### 4.6 Motion (observed)
- Marquees: hero reel (one row, rightwards) and logo wall (two rows, opposite directions) with edge fade masks.
- Sticky H2 beside scrolling cards.
- Stats and text appear as they enter the viewport (Framer appear effect), numerals begin ghosted.
- Nav compresses from a full-width bar to a floating pill on scroll.
- Accordion: chevron rotation and height ease.
- Hero videos play only when in view.
- No parallax, no cursor effects, no scroll-jacking. Motion supports reading and never blocks it.

---

## 5. UX principles at work

1. **One offer, one action.** Every "Book a call" goes to `/contact`. There are 3 CTA buttons on the home page, all blue, all the same destination.
2. **Show the product.** The product is a video ad, so the second thing you see is video ads.
3. **Outcome headline in the buyer's own metric.** CAC and ROAS are the words their customers already use.
4. **Proof ladder.** Reel (see) → logos (trust) → process (how) → numbers (scale) → FAQ (risk). Each section answers the next objection.
5. **Qualify at the end, not the start.** The home page is open and warm. The contact page is strict. Low-spend brands self-select out.
6. **Short copy.** Hero 8 words, subhead 11 words, process cards 1 to 3 sentences. No paragraph exceeds about 60 words.
7. **Consistency across pages.** The FAQ, CTA and footer blocks are identical components on Home, About and Contact.
8. **Mobile is a reflow, not a redesign.** Reel becomes a 2-column grid of cards, process cards stack full width, stats become a single column, footer links stay as split bars.
9. **Low cognitive load.** Three nav items, five FAQs, four process steps, four stats. Nothing exceeds five.
10. **Honest weakness: weak SEO and AEO.** Title is only "Scroll Stop", one H1, no structured data signals I could see, and the FAQ answers are hidden from the crawlable DOM until opened. The design is strong and the discoverability is thin. QDnCo should keep its own SEO strengths.

### Mobile specifics (390 px)
- H1 drops to about 40 px and wraps to three lines.
- Nav collapses to logo plus hamburger. CTA is not in the bar, it is in the hero.
- Reel becomes a 2-column grid and logo wall becomes a 2 x 3 wrapped grid inside rounded containers.
- Section padding falls to about 20 px sides.
- CTA button goes full width with an arrow icon in a rounded square on the right.
- Footer link bars stay full width, large tap targets (about 50 px).

---

## 6. What QDnCo can take

QDnCo today (from `docs/UI-AUDIT.md` and `site/index.html`): React-prerendered home at 750 KB HTML, Kanit/Barlow/Instrument Serif/Inter, 100+ font sizes, 9 to 11 px text widely used, heavy motion, 12 sections on the home page (hero, intro, services, platforms, adreel, projects, pricing, roadmap, roadmap-detail, FAQ, contact).

Scroll Stop has 5 content sections and one font pair. The gap is not polish. It is **editing**.

### 6.1 Adopt (principles, high value, low risk)

| # | Principle | QDnCo action |
|---|---|---|
| A1 | One accent colour for "act" | Pick one accent and reserve it for CTAs, active nav and the closing glow. Remove accent use elsewhere |
| A2 | Two font families, three heading sizes | Collapse Kanit/Barlow/Instrument Serif/Inter to one display + one text family. Define H1/H2/H3 only |
| A3 | Tight tracking on headings (-0.03 to -0.05em) | Apply to H1 to H3 tokens |
| A4 | Floor on text size | 12 px minimum, 14 px for body on mobile. This also closes the biggest finding in `UI-AUDIT.md` |
| A5 | Pill buttons plus 20 to 36 px card radius, 1 px hairline border, no shadows | Replace shadow-based cards with border-based ones |
| A6 | Outcome headline in the buyer's metric | For QDnCo's real estate audience: cost per qualified site visit, cost per booking, or cost per lead that picks up. Pick one number the buyer already tracks |
| A7 | Reel as proof | Existing `#adreel` section is the right idea. Move it directly under the hero and make it the only thing on that fold besides the headline |
| A8 | Sticky left heading, stacked right cards for process | Use for "How we work" and fold the separate `roadmap` and `roadmap-detail` sections into it |
| A9 | Ghosted stat numerals with caps labels, 2 x 2 | Replace scattered proof points with four numbers, two of them money |
| A10 | Reuse the same FAQ + CTA + footer blocks on every page | Already close on the secondary pages. Extend to home |
| A11 | Qualifying contact page | "This is for you if your brand..." with real thresholds (project size, monthly ad spend, city) and a spend dropdown |
| A12 | Split footer link bars (social) with arrow | Replace footer icon row |

### 6.2 Adapt (needs a QDnCo-specific decision)

| # | Scroll Stop pattern | QDnCo variant |
|---|---|---|
| B1 | Dark `#0D0D0D` theme | QDnCo's hero is light (`hero-light`). Decide: go fully dark like them, or keep light and apply the same restraint. Both work; the discipline matters, not the colour |
| B2 | Logo wall of D2C brands | Use real estate developer and project marks only where you have permission. If few, use a **numbers wall** instead |
| B3 | Portfolio with category filters | Filter by city / asset type (residential, plotted, commercial, Dubai off-plan) rather than product vertical |
| B4 | Vertical video proof | Real estate buyers also trust **dashboards and lead-quality screenshots**. Put 2 or 3 of those in the reel mix with the ad creatives |
| B5 | No pricing page | QDnCo has `/pricing/`. Keep it but link to it from the process or FAQ, not from the hero, so the hero stays single-action |

### 6.3 Do not take
- Their copy, brand names, creatives, founder photos, "Left Brain / Right Brain" device, or any logo asset. These are theirs.
- Their thin SEO. QDnCo's answers, guides, schema and `llms.txt` work is a real advantage. A simpler home page must not remove crawlable text. Keep the content in the DOM and simplify what users see first.
- Marquee-only proof with no static fallback. Provide a reduced-motion version and keep one screen where the reel stops.

---

## 7. Suggested new home page structure

Target: from 12 sections to 7, and from 750 KB HTML to something far lighter.

| # | Section | Content | Replaces today |
|---|---|---|---|
| 1 | Nav | Logo, 3 links (Work, About, Pricing), one CTA | nav-desktop / nav-mobile |
| 2 | Hero | Outcome H1, one-line subhead, one CTA, secondary "See our work" | `#top`, `#intro` |
| 3 | Proof reel + numbers strip | Ad creatives and dashboard proof, 4 stats | `#adreel`, platforms strip |
| 4 | How we work | Sticky heading + 4 stacked cards | `#services`, `#roadmap`, `.roadmap-detail` |
| 5 | Work | 3 to 6 curated case cards, link to `/work/` | `#projects` |
| 6 | FAQ | 5 questions, answers in DOM (use `<details>`) | `#faq` |
| 7 | Close | Gradient CTA card, quick links, social bars | `#contact`, footer |

Pricing stays on `/pricing/` with a text link from section 4 or 6.

---

## 8. Token starter (adaptable)

```css
:root {
  --bg: #0d0d0d;
  --surface: #161616;
  --border: rgb(255 255 255 / 0.1);
  --text: #fff;
  --text-2: rgb(255 255 255 / 0.7);
  --text-3: rgb(255 255 255 / 0.4);
  --accent: /* QDnCo accent, one value */;
  --on-accent: #fff;

  --font-display: /* one family */;
  --font-text: /* one family */;

  --fs-h1: clamp(2.5rem, 5vw + 1rem, 4.375rem);   /* 40 → 70 */
  --fs-h2: clamp(1.5rem, 1.5vw + 1rem, 1.875rem); /* 24 → 30 */
  --fs-h3: clamp(1.25rem, 1vw + 1rem, 1.625rem);  /* 20 → 26 */
  --fs-body: 1rem;
  --fs-small: 0.875rem;
  --fs-caps: 0.75rem;

  --ls-h1: -0.05em;
  --ls-h2: -0.02em;
  --ls-h3: -0.03em;

  --radius-pill: 999px;
  --radius-card: 24px;
  --radius-input: 10px;

  --pad-section-y: clamp(64px, 8vw, 100px);
  --pad-section-x: clamp(20px, 3.5vw, 50px);
}
```

---

## 9. Risks and open decisions

1. **Dark vs light.** Scroll Stop's look depends on a dark canvas. QDnCo is light on the hero. Switching to dark is a brand decision, not a CSS tweak. *Needs your call.*
2. **Single-action funnel vs pricing visibility.** Their approach filters leads by hiding price. QDnCo already ranks for pricing queries. Hiding it could cost traffic. Recommendation: keep `/pricing/`, de-emphasise it on home.
3. **SEO regression.** Collapsing 12 sections into 7 can delete indexable text and internal links. Move text to the secondary pages, do not delete it, and re-run `audit-seo.mjs` and `audit-links.mjs`.
4. **Two build paths.** Home and `/dubai/` are React-prerendered, the other ~125 pages are static shells. A redesign must update both systems or the mismatch in `UI-AUDIT.md` gets worse.
5. **Qualification thresholds.** The contact page only works with real numbers. Rs 10L/month is Scroll Stop's number. QDnCo needs its own floor, and for Dubai a separate AED threshold.
6. **Video weight.** Their 6 `.webm` loops are small. Keep QDnCo's reel under a fixed budget (for example 6 clips, under 400 KB each, `preload="none"`, play on viewport).

---

## 10. Recommended next steps

1. Decide dark vs light and the single accent colour (risk 1).
2. Define the outcome metric for the H1 and the four stats (A6, A9).
3. Write the tokens from section 8 into the shared stylesheet and migrate the home page and `/dubai/` first.
4. Rebuild home to the 7-section structure behind a branch, then diff with `audit-seo.mjs`, `audit-responsive.mjs`, `audit-touch.mjs`.
5. Re-run `/design-review` and `/qa` on `/` and `/dubai/` before merging.

If useful, the next artifact is a one-page wireframe of the 7 sections at 1440 and 390 with real QDnCo copy slots, via `/design-shotgun` or `/design-html`.
