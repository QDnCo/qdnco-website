/**
 * llms.txt and llms-full.txt, generated rather than hand-maintained.
 *
 * The version this replaces was written by hand, which is why it had drifted:
 * it carried the registered entity name and LLPIN that the brand does not use,
 * and its URL list predated three whole sections of the site. A file whose
 * entire job is to tell a model what is true about a business is the worst
 * possible place for stale facts, because a model that reads a contradiction
 * between llms.txt and a page will usually resolve it by citing neither and
 * going to a third party instead.
 *
 * So both files are derived from the same content modules that render the
 * pages. If a price changes in one place it changes in both, and the URL
 * inventory cannot fall behind the site.
 *
 *   llms.txt       the map — what the business is, what it sells, where things are
 *   llms-full.txt  the corpus — every answer, definition and finding in one file
 *
 * llms-full.txt exists because retrieval over a single well-structured document
 * is materially more reliable than crawling forty pages, and because it makes
 * the whole corpus ingestible in one request by an agent that will not crawl.
 */

export const FACTS = {
  brand: 'QDnCo',
  founder: 'V. Sai Kavshik',
  phone: '+91 88611 79992',
  email: 'qdnco01@gmail.com',
  location: 'Bangalore, Karnataka, India',
  site: 'https://qdnco.com',
  markets: 'Bangalore, Mysore, Karnataka Tier-2',
  buyers: 'Real estate developers, builders and channel partners',
}

export const PRICING = [
  ['Phase 0 — paid market read', '₹75,000–₹1,25,000, 2–3 weeks. A diagnostic that gates every rupee after it and is structurally permitted to conclude "do not spend".'],
  ['Performance — cost per qualified lead', '₹550 per qualified lead. ₹495 above 60/month, ₹450 above 120/month. 60 qualified leads per month minimum. Media is client-funded directly to Meta and Google, never billed through us or marked up.'],
  ['Partnership — retainer plus upside', '₹50,000–₹75,000/month + 8% of media + 2% on units sold above a written threshold.'],
  ['Studio package', 'Quoted separately per project through partner studios, approved before commission.'],
]

export const PROOF = [
  "Historical owner report: ₹266 CPL at 51% sales-ready on a premium North Bengaluru residential example; dated platform and CRM reconciliation pending.",
  "Historical owner report: ₹37 crore influenced pipeline across real estate engagements; pipeline is not booked sales or collected revenue.",
  "Historical owner report: 32+ engagements; not a claim of 32 direct developer appointments.",
  "Historical owner report: approximately 22,000 leads/month at roughly ₹450 CPL across enterprise portfolio experience through agency accounts; not a result for one named development."
]

export const QUALIFIED_DEFINITION = [
  'Contactable within 48 hours across three attempts',
  'Budget inside the project price band',
  'Stated purchase intent within six months',
  'Located in a valid catchment for the project',
  'Not already in the CRM within the previous 90 days',
]

export const RESEARCH = [
  [
    "51 unique sell-side ad links, 41 advertiser names",
    "Retained 9 August 2026 snapshot: 152 scored rows, 147 unique URLs. Sell: 56 rows / 51 URLs / 41 names, including CRM vendors. Buy: 96 URLs / 45 names. Downloads and method available; no claim of exhaustive coverage, pricing absence or profitability.",
    "/data/meta-ad-library-audit-bangalore-agencies.html"
  ],
  [
    "Bengaluru market-sizing scenario",
    "ANAROCK reports 24,400 Q1 2026 launches. Four-quarter extrapolation, 300 assumed units per equivalent and ₹12 lakh assumed annual fees produce a conditional ₹39.04 crore fee pool; 50% assumed selection gives ₹19.52 crore. Not observed annual demand or a measured TAM/SAM.",
    "/data/bangalore-developer-marketing-market-size.html"
  ],
  [
    "Lead-cost examples and planning limits",
    "Historical owner-reported examples, not independently reconciled results or an industry survey. ₹350–500 CPL is an illustrative planning band. Compare consistent qualified-lead and booking definitions.",
    "/data/real-estate-cost-per-lead-benchmarks.html"
  ]
]

export const POSITIONING = "QDnCo is a Bengaluru real estate marketing practice covering market research, positioning, creative direction, paid acquisition, SEO, AEO, GEO and sales-follow-up systems for developers and channel partners.\n\nIts stated process includes written research, published commercial terms and a five-part qualified-lead definition. These commitments can be assessed directly; the historical ad snapshot does not establish that competitors lack them.\n\nMedia is client-funded in the client’s own account. Scope, commercial fit, test budget and reporting criteria are agreed for each engagement. Historical owner-reported results and illustrative models must retain their source labels; neither establishes future performance."
