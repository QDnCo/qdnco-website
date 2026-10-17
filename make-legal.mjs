/**
 * Generates the compliance pages into public/legal/.
 *
 * Separate static files rather than routes in the single-page app: a legal page
 * has to be readable by a regulator, a client's counsel and a crawler with
 * JavaScript disabled, and it must not depend on 300KB of React booting first.
 * build-dist mirrors every subdirectory under public/, so these ship with no
 * change to the build.
 *
 * Anything the owner must supply — registered address, entity registration
 * number, GST — is written as a visible TODO rather than invented. A policy
 * that states a false registered address is worse than one that admits a gap.
 */
import fs from 'fs'
import path from 'path'

const OUT = 'public/legal'
const SITE = 'https://qdnco.com'

/* ── The entity ──
 * QDnCo is the operating brand; QDnCo is the registered entity that
 * contracts, invoices and carries the registrations. Everything legal therefore
 * names the LLP, and QDnCo is described as its division — a trading name is
 * not a legal person and cannot be the data fiduciary or the counterparty.
 *
 * Fill ADDRESS, LLPIN and GSTIN once and every page picks them up. Until they
 * are real they render as a visible TODO: a policy that states a wrong
 * registered address or GSTIN is worse than one that admits the gap.
 */
const ENTITY = {
  legal: 'QDnCo',
  brand: 'QDnCo',
  address: '15A, 4th Cross, Varanasi Main Road, Bell Town Layout, Jinkethimmanahalli, Ramamurthy Nagar, Bengaluru, Karnataka 560036',
  llpin: 'ACO-7601',
  gstin: null,     // null is correct while unregistered
}

const BRAND = ENTITY.brand
const LEGAL = ENTITY.legal
const EMAIL = 'qdnco01@gmail.com'
const PHONE = '+91 88611 79992'
const TEL = '+918861179992'
const CITY = 'Bangalore, Karnataka, India'
const UPDATED = process.env.LEGAL_DATE || new Date().toISOString().slice(0, 10)
const TODO = (what) => `<span class="todo">[TO BE COMPLETED: ${what}]</span>`
const ADDRESS = ENTITY.address || TODO('registered address of ' + LEGAL)
const LLPIN = ENTITY.llpin || TODO('LLPIN of ' + LEGAL)
/* Not registered is a fact, not a gap — say so plainly rather than leave a hole
   that reads as an oversight. */
const GSTIN = ENTITY.gstin || 'Not GST-registered at present.'

/* Shared chrome. Theme-aware from the OS, matching the app's own two grounds. */
import { CSS, homeLockup } from './site-shell.mjs'

const PAGES = [
  { file: 'privacy.html', nav: 'Privacy Policy', title: 'Privacy Policy',
    desc: `How ${BRAND} collects, uses, stores and protects personal data, and the rights you have under India's Digital Personal Data Protection Act, 2023.`,
    body: `
<p>This policy explains what personal data ${BRAND} ("we", "us") collects through
<a href="${SITE}">qdnco.com</a> and in the course of providing marketing services, why we collect it,
how long we keep it, and what you can require us to do with it. It is written to meet the
<strong>Digital Personal Data Protection Act, 2023</strong> (DPDP Act) and the
<strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data
or Information) Rules, 2011</strong>.</p>

<h2>1. Who is responsible for your data</h2>
<p><strong>${LEGAL}</strong> is the <strong>Data Fiduciary</strong> for personal data collected through
this website. ${BRAND} is a division of ${LEGAL} and is the brand the marketing practice trades under; the
LLP is the entity that holds the registrations and enters into contracts.</p>
<div class="card">
  <p><strong>Registered entity:</strong> ${LEGAL}<br>
  <strong>Trading as:</strong> ${BRAND}<br>
  <strong>Registered address:</strong> ${ADDRESS}<br>
  <strong>LLPIN:</strong> ${LLPIN}<br>
  <strong>GSTIN:</strong> ${GSTIN}<br>
  <strong>Operating location:</strong> ${CITY}<br>
  <strong>Email:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a><br>
  <strong>Phone:</strong> <a href="tel:${TEL}">${PHONE}</a></p>
</div>

<h2>2. What we collect</h2>
<p>We collect only what the enquiry needs. There is no account system on this site and no login.</p>
<table>
  <tr><th>Data</th><th>Where it comes from</th><th>Why</th></tr>
  <tr><td>Name</td><td>The enquiry form</td><td>To address you and to identify the enquiry</td></tr>
  <tr><td>Phone number</td><td>The enquiry form</td><td>To respond — this is the primary channel we reply on</td></tr>
  <tr><td>Project name</td><td>The enquiry form</td><td>To research the project before the first call</td></tr>
  <tr><td>Catchment / location</td><td>The enquiry form</td><td>To assess the market before quoting</td></tr>
  <tr><td>Indicative budget</td><td>The enquiry form</td><td>To judge whether we are the right fit</td></tr>
  <tr><td>Page the enquiry came from</td><td>Captured automatically on submit</td><td>To understand which part of the site prompted contact</td></tr>
  <tr><td>Anonymous usage data (pages viewed, device type, approximate city, how you arrived)</td><td>Google Analytics 4 cookies, see the <a href="cookies.html">Cookie Policy</a></td><td>To measure which pages are useful and which lead to enquiries</td></tr>
  <tr><td>Submission timestamp</td><td>Captured automatically on submit</td><td>Record-keeping and duplicate detection</td></tr>
</table>
<p>We do <strong>not</strong> ask for, and you should not send us, financial account details, government
identifiers, health information, or any other category treated as sensitive personal data.</p>

<h2>3. Legal basis</h2>
<p>We process enquiry data on the basis of your <strong>consent</strong>, given when you submit the form,
and for the <strong>legitimate purpose</strong> of responding to a business enquiry you initiated. Providing
the data is voluntary; without a phone number we cannot reply.</p>

<h2>4. Who else sees it</h2>
<p>Enquiry data is transmitted to and stored in <strong>Google Sheets</strong> and processed by
<strong>Google Apps Script</strong>, and a notification is sent by <strong>Gmail</strong>, and site visits are measured by <strong>Google Analytics 4</strong> — all operated by
Google LLC, acting as our processor. This may involve storage on servers outside India. We do not sell
personal data, and we do not share it with any other third party except where we are legally compelled to.</p>
<p>Client campaign data handled during an engagement is governed by the individual contract with that client,
not by this policy.</p>

<h2>5. How long we keep it</h2>
<ul>
  <li><strong>Enquiries that do not become engagements:</strong> retained for up to 24 months, then deleted.</li>
  <li><strong>Enquiries that become engagements:</strong> retained for the life of the engagement and for
      8 years afterwards, which is the retention period Indian tax and company law expects for business records.</li>
  <li><strong>Email notifications:</strong> retained in the mailbox for the same periods above.</li>
</ul>

<h2>6. Your rights</h2>
<p>Under the DPDP Act you may:</p>
<ul>
  <li>ask what personal data of yours we hold and how it is being processed;</li>
  <li>have inaccurate or incomplete data corrected, or have it updated;</li>
  <li>have your data erased, unless we are required to retain it by law;</li>
  <li>withdraw consent at any time — this stops future processing but does not undo processing already done;</li>
  <li>nominate another person to exercise these rights on your behalf in the event of death or incapacity;</li>
  <li>escalate a grievance to the Data Protection Board of India if we do not resolve it.</li>
</ul>
<p>To exercise any of these, email <a href="mailto:${EMAIL}">${EMAIL}</a>. We respond within
<strong>30 days</strong>.</p>

<h2>7. Grievance Officer</h2>
<p>As required by the DPDP Act and the IT Rules, the contact for privacy complaints is:</p>
<div class="card">
  <p><strong>Name:</strong> V. Sai Kavshik<br>
  <strong>Designation:</strong> Grievance Officer<br>
  <strong>Email:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a><br>
  <strong>Phone:</strong> <a href="tel:${TEL}">${PHONE}</a><br>
  <strong>Address for service:</strong> ${ADDRESS}</p>
  <p>Complaints are acknowledged within 24 hours and resolved within 30 days.</p>
</div>

<h2>8. Security</h2>
<p>Enquiry data is transmitted over HTTPS and stored in access-controlled Google accounts protected by
two-factor authentication. No transmission over the internet is completely secure, and we cannot guarantee
absolute security; we can and do limit who has access.</p>

<h2>9. Children</h2>
<p>This site is aimed at businesses and is not directed at children. We do not knowingly collect data from
anyone under 18. If you believe a child has submitted data, contact us and we will delete it.</p>

<h2>10. Changes</h2>
<p>If this policy changes materially we will update the date at the top of this page. Continued use of the
site after a change means you accept the revised policy.</p>
` },

  { file: 'terms.html', nav: 'Terms of Use', title: 'Terms of Use',
    desc: `The terms governing use of the ${BRAND} website, and how they relate to a signed engagement.`,
    body: `
<p>These terms govern your use of <a href="${SITE}">qdnco.com</a>. By using the site you accept them. If you
do not accept them, please do not use the site.</p>
<div class="card">
  <p>${BRAND} is a division of <strong>${LEGAL}</strong>. Where these terms or any engagement refer to
  "we" or "us", the contracting party is ${LEGAL}. Invoices are raised by ${LEGAL}.</p>
  <p><strong>Registered address:</strong> ${ADDRESS}<br>
  <strong>LLPIN:</strong> ${LLPIN}<br>
  <strong>GSTIN:</strong> ${GSTIN}</p>
</div>

<h2>1. What this site is</h2>
<p>This site describes ${BRAND}'s performance marketing services and shows examples of past work. It is
<strong>informational</strong>. Nothing on it is an offer capable of acceptance, and submitting the enquiry
form does not create a contract or oblige either of us to proceed.</p>

<h2>2. Engagements are governed by a separate contract</h2>
<p>Any actual engagement is governed by a written agreement signed by both parties covering scope, fees,
payment terms, confidentiality, ownership of work and termination. Where anything in that agreement conflicts
with these terms or with anything published on this site, <strong>the signed agreement prevails</strong>.</p>

<h2>3. Pricing shown on this site</h2>
<p>Pricing published on this site is <strong>indicative</strong>. Actual fees depend on scope, market,
ticket size, media budget and the outcome of the Phase 0 assessment, and are confirmed in writing before any
work begins. Published prices may change at any time without notice.</p>

<h2>4. Results and figures</h2>
<p>Metrics shown — cost per lead, pipeline influenced, sales-ready rates, return on ad spend — are actual
results from named past engagements under the conditions of those engagements. They are <strong>not a
forecast and not a guarantee</strong> of what any future campaign will achieve. See the
<a href="disclaimer.html">Disclaimer</a>.</p>

<h2>5. Intellectual property</h2>
<p>The text, layout, code, graphics and original creative on this site belong to ${BRAND} unless stated
otherwise. Client logos, brand names and campaign creative shown as work examples remain the property of the
respective owners and appear here to identify the work performed. You may not reproduce or republish material
from this site without written permission, other than brief quotation with attribution and a link.</p>

<h2>6. Acceptable use</h2>
<p>You agree not to attempt to gain unauthorised access to the site or its backing systems, submit false or
misleading information through the enquiry form, use automated means to submit enquiries, or use the site in
a way that damages it or interferes with anyone else's use of it.</p>

<h2>7. Third-party links</h2>
<p>This site links to client websites and third-party platforms. We do not control those sites and are not
responsible for their content, their availability or their privacy practices.</p>

<h2>8. Liability</h2>
<p>The site is provided "as is". To the extent Indian law permits, we exclude liability for indirect or
consequential loss, and for any loss of profit, revenue or business opportunity arising from your use of, or
reliance on, this site. Nothing here excludes liability that cannot lawfully be excluded — including for
fraud or for death or personal injury caused by negligence.</p>

<h2>9. Governing law</h2>
<p>These terms are governed by the laws of India. The courts at <strong>Bangalore, Karnataka</strong> have
exclusive jurisdiction over any dispute arising from them.</p>

<h2>10. Contact</h2>
<p>Questions about these terms: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
` },

  { file: 'cookies.html', nav: 'Cookie Policy', title: 'Cookie Policy',
    desc: `What this site stores in your browser, and what it does not.`,
    body: `
<p>This page explains what <a href="${SITE}">qdnco.com</a> stores in your browser.</p>

<h2>1. Analytics: Google Analytics 4 only</h2>
<p>This site uses <strong>Google Analytics 4</strong> to count visits and see which pages lead to enquiries. It sets first-party cookies named <code>_ga</code> and <code>_ga_*</code> (lifetime up to 2 years). We use it only to measure the site, not to advertise to you: there is <strong>no Meta Pixel, no remarketing tag and no advertising cookie</strong>, and Google Analytics 4 does not log or store IP addresses. You can block it with the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">Google Analytics opt-out browser add-on</a>, your browser's tracking protection, or by clearing site data.</p>

<h2>2. What is stored locally</h2>
<table>
  <tr><th>What</th><th>Type</th><th>Purpose</th><th>Lifetime</th></tr>
  <tr><td>Theme preference</td><td>Browser local storage</td>
      <td>Remembers whether you chose the light or dark version so it does not reset on every visit</td>
      <td>Until you clear site data</td></tr>
</table>
<p>This is stored by your browser on your own device. It is not a cookie, it is not sent to our server, and
it identifies nothing about you.</p>

<h2>3. Third-party services that load on this page</h2>
<p>Some assets are served by third parties, and those requests necessarily reveal your IP address and browser
to them, as any web request does:</p>
<ul>
  <li><strong>Google Fonts</strong> — typefaces.</li>
  <li><strong>unpkg</strong> — JavaScript libraries the page runs on.</li>
  <li><strong>Mux</strong> — the background video.</li>
</ul>
<ul><li><strong>Google Analytics 4</strong> (Google LLC) — visit measurement, described in section 1.</li></ul>
<p>Apart from Google Analytics 4, none of these is used by us to measure or profile visitors.</p>

<h2>4. When you submit the enquiry form</h2>
<p>Submitting the form sends the details you typed to our Google Apps Script endpoint. That is a deliberate
action by you, not passive tracking. What happens to that data is covered in the
<a href="privacy.html">Privacy Policy</a>.</p>

<h2>5. Controlling local storage</h2>
<p>You can clear the stored theme preference at any time through your browser's "clear site data" or
"clear browsing data" controls. The site will still work; it will simply follow your operating system's
light or dark setting again.</p>
` },

  { file: 'disclaimer.html', nav: 'Disclaimer', title: 'Disclaimer',
    desc: `What the results shown on this site do and do not represent, and the limits of real estate marketing claims.`,
    body: `
<h2>1. Results are historical, not promised</h2>
<p>Every figure published on this site — cost per lead, pipeline influenced, percentage of leads that were
sales-ready, return on ad spend, ad spend under management — describes what actually happened on a specific
past engagement, in that market, at that ticket size, with that budget, at that time.</p>
<p><strong>Marketing results are not guaranteed and are not predictable in advance.</strong> They depend on
factors outside our control: the product, the price, the location, the inventory, the sales team's response
time, competitor activity, platform algorithm changes, interest rates and market sentiment. Nothing on this
site should be read as a promise, projection or warranty of any particular outcome for your project.</p>

<h2>2. No investment or financial advice</h2>
<p>${BRAND}, a division of ${LEGAL}, is a marketing services provider. Nothing on this site is investment advice, financial advice or
a recommendation to buy, sell or invest in any property, security or asset. Property values can fall as well
as rise. Take independent professional advice before any investment decision.</p>

<h2>3. Third-party property claims</h2>
<p>Campaign creative shown on this site was produced for developer clients. Prices, unit sizes, amenities,
approvals, possession dates, distances and RERA registration numbers in that creative are the
<strong>respective developer's representations</strong>, current as at the date the campaign ran. They may
have changed. ${BRAND} does not verify, endorse or take responsibility for them. Anyone considering a
purchase should verify directly with the developer and against the relevant RERA registration.</p>

<h2>4. RERA</h2>
<p>Real estate advertising in India is regulated under the Real Estate (Regulation and Development) Act, 2016.
Campaign material we produce carries the client's RERA registration details where the law requires it. The
obligation to hold a valid registration and to make accurate representations rests with the developer, not
with the marketing agency.</p>

<h2>5. Client names and logos</h2>
<p>Client names, logos and creative appear to identify work actually performed. They do not imply that the
client endorses, sponsors or recommends ${BRAND}. Any client can ask to be removed from this site and we
will comply.</p>

<h2>6. Research and market data</h2>
<p>Market figures cited on this site come from our own research, publicly available sources and third-party
data, gathered at a point in time. Markets move. We do not warrant that any figure remains current, and we
are not liable for decisions taken in reliance on it.</p>

<h2>7. External links</h2>
<p>Links to client and third-party sites are provided for reference. We do not control their content and
are not responsible for it.</p>

<h2>8. Questions</h2>
<p>If any claim on this site is unclear, ask: <a href="mailto:${EMAIL}">${EMAIL}</a>. We would rather
explain a number than have it misread.</p>
` },

  { file: 'refund.html', nav: 'Refunds & Cancellation', title: 'Refund & Cancellation Policy',
    desc: `How fees, cancellation and refunds work across the Phase 0 assessment, retainers and per-qualified-lead engagements.`,
    body: `
<p>This policy covers fees paid to ${LEGAL}, trading as ${BRAND}. Where a signed engagement agreement says
something different, <strong>that agreement prevails</strong>.</p>
<p>Fees are invoiced by ${LEGAL}. ${ENTITY.gstin
  ? `GST is charged at the applicable rate under GSTIN ${ENTITY.gstin}.`
  : `${LEGAL} is not currently registered for GST, so no GST is charged on our fees. Media spend billed to you directly by Meta or Google carries its own tax treatment, set by those platforms.`}</p>

<h2>1. The Phase 0 call is free</h2>
<p>The initial Phase 0 conversation costs nothing and commits you to nothing. No payment is taken before a
scope and a fee are agreed in writing.</p>

<h2>2. Fees are for work performed, not for outcomes</h2>
<p>Retainer fees pay for strategy, research, campaign build, creative direction, media management and
reporting — the work itself. Because marketing outcomes depend on factors outside our control (see the
<a href="disclaimer.html">Disclaimer</a>), <strong>fees are not refundable on the basis that a campaign did
not reach a particular result</strong>, unless a specific performance term is written into the engagement
agreement.</p>

<h2>3. Media spend is not our fee</h2>
<p>Money paid to Meta, Google or any other platform is <strong>your media budget</strong>, billed by that
platform. It is separate from our fee. Once spent it cannot be recovered by us. Where we hold media budget
on your behalf, any unspent balance is returned in full within 14 working days of the engagement ending.</p>

<h2>4. Cancelling a retainer</h2>
<ul>
  <li><strong>Notice:</strong> either party may end a monthly retainer with 30 days' written notice.</li>
  <li><strong>The notice month:</strong> payable in full — the work continues through it, including an
      orderly handover.</li>
  <li><strong>Cancelling before work starts:</strong> if you cancel in writing before onboarding begins, any
      advance is refunded in full less costs already committed on your instruction.</li>
  <li><strong>Cancelling mid-month:</strong> the current month is not pro-rated, because research and
      campaign build are front-loaded rather than spread evenly.</li>
</ul>

<h2>5. Per-qualified-lead engagements</h2>
<p>Where the engagement is priced per qualified lead, you are invoiced only for leads that meet the
qualification criteria agreed in writing before the campaign starts. A lead that fails those criteria is not
billable. Disputes over qualification must be raised within <strong>7 days</strong> of the invoice, with the
reason; we review the record and credit anything wrongly billed.</p>

<h2>6. What we hand over on exit</h2>
<p>On termination, once outstanding invoices are cleared, you receive the campaign assets, the creative
produced for you, the research outputs, and administrative access to any ad account or CRM configuration we
built for you. We do not hold accounts hostage.</p>

<h2>7. Late payment</h2>
<p>Invoices are payable within the period stated on the invoice. We may pause delivery on overdue accounts
after written notice. Paused work resumes once the account is settled.</p>

<h2>8. How to raise a refund request</h2>
<p>Email <a href="mailto:${EMAIL}">${EMAIL}</a> with the invoice reference and the reason. We acknowledge
within 3 working days and resolve within 15 working days. Approved refunds are returned by the original
payment method.</p>
` },

  { file: 'accessibility.html', nav: 'Accessibility', title: 'Accessibility Statement',
    desc: `What this site does to be usable by everyone, what is known to fall short, and how to report a barrier.`,
    body: `
<p>This site aims to meet <strong>WCAG 2.1 Level AA</strong>. This statement records where it stands, honestly.</p>

<h2>1. What has been done</h2>
<ul>
  <li><strong>Contrast</strong> — text over the background video is measured against the rendered pixels,
      not estimated, and holds at or above the AA threshold.</li>
  <li><strong>Touch targets</strong> — interactive controls are at least 44&times;44 CSS pixels.</li>
  <li><strong>Responsive</strong> — tested from 272px to 4K with no horizontal scrolling and no clipped text.</li>
  <li><strong>Reduced motion</strong> — the marquees, the ad reel and the decorative animations stop for
      anyone whose system requests reduced motion.</li>
  <li><strong>Semantics</strong> — one <code>h1</code>, an unbroken heading order, real landmarks, alt text
      on meaningful images and empty alt on decorative ones.</li>
  <li><strong>Both themes</strong> — a light and a dark version, following the system setting by default.</li>
</ul>

<h2>2. Known limitations</h2>
<ul>
  <li>Several sections reveal content as you scroll. The content is present without scrolling for assistive
      technology, but the visual sequence assumes a scrolling device.</li>
  <li>The ad creative shown in the reel is decorative and marked as such; the text inside those images is not
      available to a screen reader. The claims in them are described in the surrounding copy.</li>
  <li>The background video is decorative and has no captions, because it carries no information.</li>
</ul>

<h2>3. Reporting a barrier</h2>
<p>If something on this site is unusable for you, tell us and we will fix it. Email
<a href="mailto:${EMAIL}">${EMAIL}</a> or call <a href="tel:${TEL}">${PHONE}</a>. Please say which page and
what happened. We reply within 5 working days.</p>
<p>If you need any information from this site in another format — plain text, large print, or read to you
over the phone — ask, and we will provide it.</p>
` },
]

const navLinks = (current) => PAGES.map((p) =>
  p.file === current
    ? `<span aria-current="page">${p.nav}</span>`
    : `<a href="${p.file}">${p.nav}</a>`).join('\n    ')

const WALLPAPER = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

const render = (p) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title} | ${BRAND}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${SITE}/legal/${p.file}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0A0D12">
<link rel="icon" href="/favicon.ico?v=qd2" sizes="48x48"><link rel="icon" href="/favicon.svg?v=qd2" type="image/svg+xml"><link rel="icon" href="/icon-192.png?v=qd2" type="image/png" sizes="192x192"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=qd2"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://unpkg.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600;700;800&family=Kanit:wght@700;800&display=swap" rel="stylesheet">
<script>
/* Applied before paint so the page never flashes the wrong ground. Same key the
   main site writes, so the choice made there carries straight over. */
(function(){try{var t=localStorage.getItem('qd-theme');
if(t!=='light'&&t!=='dark')t='light';
document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();
</script>
<style>${CSS}</style>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GZE73M9Q4M"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-GZE73M9Q4M',{content_group:location.pathname.indexOf('/dubai/')===0?'Dubai':'India'});</script>
</head>
<body>

<div class="wall" aria-hidden="true">
  <video id="wall" muted playsinline loop preload="none"></video>
  <div class="wash"></div>
</div>

<div class="shell">
  <header class="bar">
    ${homeLockup('../index.html')}
    <div class="bar-right">
      <button type="button" class="theme-switch" id="tt" role="switch" aria-label="Toggle colour theme">
        <span class="theme-switch-ico theme-switch-moon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </span>
        <span class="theme-switch-ico theme-switch-sun" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5"/></svg>
        </span>
        <span class="theme-switch-knob" aria-hidden="true"></span>
      </button>
      <a class="back" href="../index.html">&larr; Back to site</a>
    </div>
  </header>

  <div class="page">
  <div class="wrap">
    <main>
      <p class="eyebrow">${BRAND} &middot; Legal</p>
      <h1>${p.title}</h1>
      <p class="updated">Last updated ${UPDATED} &middot; Applies to ${SITE}</p>
      ${p.body.trim()}
    </main>

    <footer class="foot">
      <nav aria-label="Legal pages">
      ${navLinks(p.file)}
      </nav>
      <p>${LEGAL} &middot; trading as ${BRAND} &middot; ${CITY} &middot;
         <a href="mailto:${EMAIL}">${EMAIL}</a> &middot;
         <a href="tel:${TEL}">${PHONE}</a></p>
      <p>&copy; ${UPDATED.slice(0, 4)} ${LEGAL}. All rights reserved.</p>
    </footer>
  </div>
  </div>
</div>

<script>
/* Theme toggle, writing the key the main site reads. */
(function(){var r=document.documentElement,b=document.getElementById('tt');
var sync=function(){b.setAttribute('aria-checked',r.dataset.theme==='light')};sync();
b.addEventListener('click',function(){
  r.dataset.theme=r.dataset.theme==='light'?'dark':'light';
  try{localStorage.setItem('qd-theme',r.dataset.theme)}catch(e){}sync();});})();

/* The wallpaper is decoration, so it must never delay the text. Loaded after
   the page settles, skipped entirely for reduced-motion and for anyone on a
   metered or slow connection. */
(function(){
  var v=document.getElementById('wall');
  if(!v||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var c=navigator.connection;
  if(c&&(c.saveData||/2g/.test(c.effectiveType||'')))return;
  /* hls.js is tried FIRST, exactly as the site's HlsVideo does. Desktop Chrome
     returns "maybe" from canPlayType for an HLS manifest despite having no
     native HLS decoder, so leading with that check made Chrome fetch the whole
     manifest and every chunk and then sit at readyState 0 — a silent failure
     that also wasted the bandwidth. Native playback is the fallback, for Safari. */
  var native=function(){
    if(!v.canPlayType('application/vnd.apple.mpegurl'))return;
    v.src=${'`'}${WALLPAPER}${'`'};v.play().catch(function(){});
  };
  var start=function(){
    var s=document.createElement('script');
    s.src='https://unpkg.com/hls.js@1/dist/hls.min.js';
    s.onload=function(){
      if(!window.Hls||!window.Hls.isSupported()){native();return}
      var h=new window.Hls({capLevelToPlayerSize:true});
      h.loadSource(${'`'}${WALLPAPER}${'`'});h.attachMedia(v);
      h.on(window.Hls.Events.MANIFEST_PARSED,function(){v.play().catch(function(){})});};
    s.onerror=native;
    document.head.appendChild(s);
  };
  /* Both, guarded to fire once. requestIdleCallback alone is not reliable: on a
     page the browser treats as hidden — a background tab, for instance — it can
     be starved indefinitely, and the wallpaper would then never appear even
     after the user switches to it. The timer is the floor. */
  var done=false;
  var once=function(){if(done)return;done=true;start()};
  if('requestIdleCallback' in window)requestIdleCallback(once,{timeout:2000});
  setTimeout(once,2000);
})();
</script>
</body>
</html>
`

fs.mkdirSync(OUT, { recursive: true })
let todos = 0
for (const p of PAGES) {
  const html = render(p)
  todos += (html.match(/TO BE COMPLETED/g) || []).length
  fs.writeFileSync(path.join(OUT, p.file), html)
  console.log(`${p.file.padEnd(20)} ${(html.length / 1024).toFixed(1)} KB   ${p.title}`)
}
console.log(`\n${PAGES.length} pages written to ${OUT}/`)
if (todos) console.log(`${todos} owner-supplied fields still marked TO BE COMPLETED`)
