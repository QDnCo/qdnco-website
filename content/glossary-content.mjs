/**
 * Glossary.
 *
 * Definitional queries ("what is CPQL", "what does sales-ready mean") are the
 * cheapest class of answer-engine question to win, because the winning answer is
 * short, factual and has no competing interpretation. DefinedTerm markup makes
 * each entry individually addressable, so one page carries fifty entry points.
 *
 * Rule: a definition here must be usable by someone who does not buy from us.
 * The moment a definition becomes a pitch it stops being quotable, and an entry
 * that cannot be quoted is doing nothing that a paragraph on the pricing page
 * was not already doing.
 *
 * `note` is optional and is where a QDnCo-specific convention goes, kept
 * visually and structurally separate from the definition itself.
 */

export const HUB = {
  title: 'Glossary — Real Estate Marketing Terms | QDnCo',
  h1: 'Real estate performance marketing glossary',
  desc: 'Plain definitions of the terms used in real estate lead generation: CPQL, sales-ready rate, learning phase, attribution window, RERA registration, EOI and more.',
  lede: 'Fifty terms that come up in developer conversations, defined without the sales pitch. Where QDnCo uses a term in a specific way, the convention is marked separately from the general definition.',
}

export const GROUPS = [
  { id: 'economics', name: 'Lead economics' },
  { id: 'platform', name: 'Ad platform mechanics' },
  { id: 'funnel', name: 'Funnel and CRM' },
  { id: 'commercial', name: 'Commercial models' },
  { id: 'compliance', name: 'Compliance and legal' },
  { id: 'search', name: 'Search, answer and generative engines' },
]

export const TERMS = [
  /* ── Lead economics ───────────────────────────────────────────────────── */
  {
    group: 'economics',
    term: 'CPL — Cost per lead',
    def: 'Total media spend divided by the number of leads generated. The most quoted number in real estate marketing and the least informative on its own, because it says nothing about whether the leads were reachable, in budget or in catchment.',
    note: 'Working band for Bangalore residential is ₹350–₹500, moving with ticket size and catchment competitiveness.',
  },
  {
    group: 'economics',
    term: 'CPQL — Cost per qualified lead',
    def: 'The cost of a lead that meets a written qualification standard, rather than of any form submission. Distinguished from CPL by the fact that the qualification test is defined in advance and applied by the buyer, not the seller.',
    note: 'QDnCo charges ₹550 per qualified lead, ₹495 above 60 a month, ₹450 above 120, with a 60-lead monthly minimum.',
  },
  {
    group: 'economics',
    term: 'Qualified lead',
    def: 'A lead meeting a pre-agreed, testable standard. Without a written definition the term means whatever the party using it needs it to mean, which is why disputes in this category almost always resolve to it.',
    note: 'Five criteria: contactable within 48 hours across three attempts; budget inside the project band; intent within six months; valid catchment; not a CRM duplicate within 90 days.',
  },
  {
    group: 'economics',
    term: 'Sales-ready rate',
    def: 'The share of delivered leads that the client\'s own sales team judges worth pursuing after first contact. Multiplying CPL by the inverse of this rate gives the true cost of a useful lead.',
    note: '51% delivered on a premium North Bangalore residential launch at ₹266 CPL — an effective ₹520 per lead worth working.',
  },
  {
    group: 'economics',
    term: 'Cost per site visit',
    def: 'Media spend divided by the number of prospects who physically visited the project. The most useful intermediate metric in real estate, because it is available within weeks and is much harder to game than a form fill.',
  },
  {
    group: 'economics',
    term: 'Cost per booking',
    def: 'Total marketing cost divided by units booked. The only metric that settles whether a campaign worked, and the slowest to become reliable because it waits on a full sales cycle.',
  },
  {
    group: 'economics',
    term: 'Lead-to-booking ratio',
    def: 'How many raw leads it takes to produce one booking. Varies enormously with ticket size, sales capability and lead source.',
    note: 'Plan on 100:1 until your own sales data proves better — roughly 60% of raw leads qualify, and a strong team closes about 10% of those.',
  },
  {
    group: 'economics',
    term: 'Duplicate lead',
    def: 'An enquiry from a person already in the CRM. Charged twice by careless suppliers and a frequent cause of inflated volume figures.',
    note: 'A 90-day CRM lookback is part of the qualification test, so duplicates inside that window are not billable.',
  },
  {
    group: 'economics',
    term: 'Lead decay',
    def: 'The fall in contact and conversion rates as time passes between enquiry and first contact. Steep in property, where a buyer typically enquires with several projects in one session.',
  },
  {
    group: 'economics',
    term: 'Replacement guarantee',
    def: 'A commitment to replace, free of charge, any lead that fails the written qualification standard, provided it is flagged within an agreed window.',
    note: 'Seven days at QDnCo — short deliberately, so that leads are assessed while a fair assessment is still possible.',
  },

  /* ── Ad platform mechanics ────────────────────────────────────────────── */
  {
    group: 'platform',
    term: 'Learning phase',
    def: "A delivery-system learning period during which performance may fluctuate as the platform gathers events. Inspect tracking and lead quality throughout; the label is not a reason to ignore obvious problems or a guarantee of success when it ends.",
    note: "Review the current guidance for the specific platform and campaign type. Event volume, optimisation settings and recent edits matter; a learning label is not a universal currency-based budget rule.",
  },
  {
    group: 'platform',
    term: 'Optimisation event',
    def: 'The action an ad platform is instructed to maximise. Whatever you nominate is what the algorithm will find more of, which makes this the single most consequential setting in an account.',
    note: "A form-fill event measures form completion. A reliable CRM qualification signal can support a downstream optimisation test; it does not guarantee that the platform will find better leads.",
  },
  {
    group: 'platform',
    term: 'Optimisation floor',
    def: "An informal planning term for whether a test can gather enough relevant observations for its intended decision. There is no universal rupee threshold established here for Meta or Google.",
    note: "QDnCo’s published working media minimum of approximately ₹1,00,000 per month is an engagement policy. Confirm the objective, event-cost assumptions, duration and spending cap for the actual test.",
  },
  {
    group: 'platform',
    term: 'Creative fatigue',
    def: 'The decline in performance that follows an audience seeing the same creative repeatedly. Diagnosed by rising frequency accompanied by rising cost per result.',
    note: 'Frequency rising with cost means refresh the creative. Cost rising while frequency is flat means something changed in the auction — new creative will not fix it.',
  },
  {
    group: 'platform',
    term: 'Frequency',
    def: 'The average number of times each person in the target audience has seen the ad over a period. The leading indicator of fatigue.',
  },
  {
    group: 'platform',
    term: 'Instant form / lead form',
    def: 'A lead capture form that opens inside the ad platform rather than on a website. Produces more leads at lower cost and lower contact rates, because the friction that filtered out casual interest has been removed.',
    note: 'Adding qualifying questions restores some of that filter. The friction is the point.',
  },
  {
    group: 'platform',
    term: 'Retargeting',
    def: 'Advertising to people who have already interacted with the brand — site visitors, video viewers, form abandoners. Cheaper per conversion than prospecting and strictly limited by the size of the audience feeding it.',
  },
  {
    group: 'platform',
    term: 'TOF / MOF / BOF',
    def: 'Top, middle and bottom of funnel: the three layers of a campaign structure, addressing people who do not know the project, are evaluating it, and are close to acting.',
    note: 'Run with a fourth, separate retargeting layer, and with channel-partner and end-buyer demand as entirely separate pools.',
  },
  {
    group: 'platform',
    term: 'Attribution window',
    def: 'The period after seeing or clicking an ad within which a conversion is credited to it. Different windows produce materially different pictures of the same campaign.',
  },
  {
    group: 'platform',
    term: 'Last-click attribution',
    def: 'Crediting a conversion entirely to the final touchpoint before it. Systematically undervalues demand creation and overvalues demand capture.',
    note: 'Why Google usually looks better than Meta in a naive report, and why cutting Meta on that basis tends to degrade Google a few weeks later.',
  },
  {
    group: 'platform',
    term: 'Negative keyword',
    def: 'A term that prevents a search ad from showing. In real estate the negative list is load-bearing, because the category is surrounded by rental, resale, PG and jobs queries that look adjacent and convert at zero.',
  },
  {
    group: 'platform',
    term: 'Brand defence',
    def: 'Bidding on your own project and company names in search so that others cannot intercept the demand you created.',
    note: 'The cheapest traffic available. Left undefended, channel partners and aggregators will bid on your project name and resell you your own lead.',
  },
  {
    group: 'platform',
    term: 'Match type',
    def: 'How closely a search query must resemble a keyword before an ad is eligible. Broad match with a thin negative list is the fastest way to spend a real estate budget on irrelevant traffic.',
  },
  {
    group: 'platform',
    term: 'Ad set / campaign / ad',
    def: 'The three levels of a Meta account: campaign holds the objective, ad set holds budget, audience and placement, ad holds the creative. Budget and audience decisions live at ad set level, which is where most structural errors are made.',
  },
  {
    group: 'platform',
    term: 'CBO / ABO',
    def: 'Campaign budget optimisation lets the platform distribute budget across ad sets; ad set budget optimisation fixes it per ad set. CBO scales better; ABO gives cleaner tests because each cell is guaranteed spend.',
  },
  {
    group: 'platform',
    term: 'Meta Ad Library',
    def: "Meta’s public ad-search resource. Our research index records ad links, advertiser names and reported ages from a historical collection. Those fields do not establish spend, continuous delivery, conversions or profitability.",
    note: "The retained 9 August 2026 export has 152 scored rows and 147 unique links: 51 sell-side links across 41 advertiser names, plus 96 buy-side links across 45 names. This is a dated snapshot; no continuous monitoring is implied.",
  },

  /* ── Funnel and CRM ───────────────────────────────────────────────────── */
  {
    group: 'funnel',
    term: 'Lead routing',
    def: 'The rules that assign an incoming enquiry to a named owner. Leads arriving into a shared inbox, spreadsheet or WhatsApp group have no owner, and anything without an owner waits.',
  },
  {
    group: 'funnel',
    term: 'Speed to lead',
    def: 'Elapsed time between enquiry and first contact attempt. The highest-leverage number in a property sales process and usually the least measured.',
    note: 'Contactability inside 48 hours across three attempts is the minimum standard; median first-call times over 24 hours indicate a routing problem, not an effort problem.',
  },
  {
    group: 'funnel',
    term: 'Feedback loop',
    def: 'Sending qualification outcomes from the CRM back to the ad platforms, so optimisation targets a downstream event rather than the form fill.',
    note: 'Usually a few days of work and the highest-return technical task in a real estate funnel. Skipped more often than any other.',
  },
  {
    group: 'funnel',
    term: 'Status model',
    def: 'The set of stages a lead moves through in the CRM. Fails when designed for reporting rather than for the salespeople who must maintain it — an unmaintained status model produces confident, wrong reports.',
    note: 'Keep stages few and behavioural, and make the reason codes on "lost" mandatory. That field is where the marketing intelligence actually lives.',
  },
  {
    group: 'funnel',
    term: 'Site visit',
    def: 'A prospect physically visiting the project. The first genuinely reliable indicator of purchase intent in residential real estate, and the point at which marketing hands over to sales.',
  },
  {
    group: 'funnel',
    term: 'EOI — Expression of interest',
    def: 'A pre-booking indication of intent, usually with a small refundable amount, used to gauge demand before formal launch.',
    note: 'An EOI campaign against an unregistered project is still marketing that project, whatever it is called.',
  },
  {
    group: 'funnel',
    term: 'Channel partner',
    def: 'An independent broker or firm that introduces buyers in exchange for commission, typically 1–3% of unit value, paid on a closed sale.',
    note: 'Not a competitor to performance marketing but a different instrument. Most developers should run both, with the attribution rule written down in advance.',
  },
  {
    group: 'funnel',
    term: 'Attribution dispute',
    def: 'A disagreement over which channel caused a booking. Endemic where a channel partner introduces a buyer who first encountered the project through paid advertising.',
    note: 'Settle it before launch with a documented introduction window and a CRM first-touch record as tiebreak.',
  },

  /* ── Commercial models ────────────────────────────────────────────────── */
  {
    group: 'commercial',
    term: 'Client-funded media',
    def: 'An arrangement where the advertiser pays the ad platforms directly from their own account, rather than the agency buying media and rebilling it.',
    note: 'The standard at QDnCo. It makes spend auditable without asking, and the account, its history and its pixel data remain the client\'s if the engagement ends.',
  },
  {
    group: 'commercial',
    term: 'Retainer',
    def: 'A fixed monthly fee for an agreed scope, independent of results. Suits engagements where the constraint is the system around the leads rather than lead volume.',
    note: '₹50,000–₹75,000 a month plus 8% of media and 2% on units above a written threshold.',
  },
  {
    group: 'commercial',
    term: 'Performance fee',
    def: 'A fee tied to a delivered outcome rather than to time or activity. Only meaningful where the outcome has a written definition.',
  },
  {
    group: 'commercial',
    term: 'Phase 0',
    def: 'A paid market diagnostic run before any advertising spend, covering buyer interviews, addressable demand, competitor and pricing analysis, and the campaign architecture.',
    note: '₹75,000–₹1,25,000, two to three weeks. Structurally permitted to conclude that you should not spend — which research given away as pre-sales never is.',
  },
  {
    group: 'commercial',
    term: 'Media under management',
    def: 'Total advertising spend an agency is responsible for across clients. A scale indicator, not a quality one.',
    note: '₹6 lakh a month and above, client-funded.',
  },
  {
    group: 'commercial',
    term: 'Influenced pipeline',
    def: 'The total value of sales opportunities a marketing programme contributed to, as distinct from revenue it can be said to have caused. Always the larger and softer number of the two.',
    note: '₹37 crore across real estate engagements. Stated as influenced rather than closed, deliberately.',
  },

  /* ── Compliance ───────────────────────────────────────────────────────── */
  {
    group: 'compliance',
    term: 'RERA',
    def: 'The Real Estate (Regulation and Development) Act 2016, and the state authorities constituted under it. Governs registration, advertising and disclosure for property projects in India.',
  },
  {
    group: 'compliance',
    term: 'Section 3(1)',
    def: 'The provision prohibiting advertising, marketing, booking, selling or inviting persons to purchase any unit in a project that is not registered with the state authority.',
    note: 'A hard gate. QDnCo does not run advertising for an unregistered project.',
  },
  {
    group: 'compliance',
    term: 'RERA registration number',
    def: 'The identifier issued to a registered project, which must appear on advertising along with the authority\'s website address.',
  },
  {
    group: 'compliance',
    term: 'Sanctioned plan',
    def: 'The building plan approved by the local authority. Advertising must depict what has been sanctioned — showing planned-but-unapproved amenities is the compliance failure that catches otherwise careful advertisers.',
  },
  {
    group: 'compliance',
    term: 'Promoter',
    def: 'The person or entity developing and selling the project, as defined under RERA. Carries advertising liability — not the agency, the platform, or a channel partner who reposted the creative.',
  },
  {
    group: 'compliance',
    term: 'Misrepresentation risk',
    def: 'Exposure created when advertising depicts something the project does not or will not have. The reason AI-generated imagery of the building itself is never used, however cheap it becomes.',
  },

  /* ── Search and generative engines ────────────────────────────────────── */
  {
    group: 'search',
    term: 'SEO — Search engine optimisation',
    def: 'Improving a page\'s position in the ranked list of results a search engine returns. Optimises a page against a query.',
  },
  {
    group: 'search',
    term: 'AEO — Answer engine optimisation',
    def: 'Structuring content so an engine can extract a direct answer from it. The unit of optimisation is a passage rather than a page, which is why one question per URL outperforms one page answering eight.',
  },
  {
    group: 'search',
    term: 'GEO — Generative engine optimisation',
    def: 'Getting a business cited inside AI-generated answers — ChatGPT, Gemini, Claude, Perplexity, AI Overviews — rather than ranked in a list of links. Rewards specificity, self-containment, consistent entity identity and original measurement.',
    note: 'Near-duplicate content is the strongest negative signal available to it, and self-contradiction across a site is the second.',
  },
  {
    group: 'search',
    term: 'llms.txt',
    def: 'A plain-text file at a site\'s root summarising what the organisation is and does, intended for language models and research agents rather than for browsers.',
  },
  {
    group: 'search',
    term: 'Structured data / JSON-LD',
    def: 'Machine-readable markup embedded in a page describing what its content means — an organisation, a price, a question and its answer — rather than how it looks.',
  },
  {
    group: 'search',
    term: 'Entity consistency',
    def: 'Whether a business is described identically across every source that mentions it — same name, address, phone number and claims. Inconsistency prevents an engine from resolving the mentions to one entity, so authority accrues to nothing.',
  },
  {
    group: 'search',
    term: 'Citation (local SEO)',
    def: 'A mention of a business\'s name, address and phone number on a third-party site. Distinct from a link; the value is corroboration of the entity, not the link equity.',
  },
  {
    group: 'search',
    term: 'AI Overview',
    def: 'Google\'s generated answer shown above the traditional results, assembled from multiple sources and citing some of them. Appearing in it is a GEO outcome, not an SEO ranking.',
  },
  {
    group: 'search',
    term: 'Topical authority',
    def: 'The depth and coherence of a site\'s coverage of a subject, rather than the strength of any one page. Built by covering a subject completely enough that no obvious question is missing.',
  },
]
