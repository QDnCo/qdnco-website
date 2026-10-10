/**
 * Case studies — /work/
 *
 * What may appear here, and what may not. This is the file where a mistake is
 * a client's problem rather than ours, so the rule is written down:
 *
 *  PUBLISHABLE — everything the project already says in public. Developer and
 *  project name, locality, configuration, sizes, the from-price that appears
 *  on the advertising itself, RERA numbers that are issued and printed on the
 *  creative, launch stage. None of this is a disclosure; it is the campaign.
 *
 *  NEVER — the client's media budget, their target cost per lead, their CRM,
 *  the phone number on their forms, their GST, the name of any intermediary
 *  desk, and any internal lock or caution from the intelligence files. That
 *  material belongs to the client's commercial position, not to our portfolio.
 *
 *  RESULTS — only where a figure is ours to publish and has a method behind it.
 *  Where a campaign is live but its numbers are the client's, the page says so
 *  plainly instead of implying a result. `result: null` renders an honest note,
 *  not an empty space, because a case study that hints at a number it will not
 *  state reads worse than one that says the number is not ours to give.
 *
 * Sources: project intelligence files under the client folders, and
 * `Client Shareable Portfolio.md` for the engagements with published metrics.
 */

export const HUB = {
  title: 'Work — Real Estate & Growth Campaigns | QDnCo',
  h1: 'Real estate and growth portfolio',
  desc: 'Explore real estate and growth engagements: project context, campaign approach, reported results and clearly labelled planning models.',
  lede: 'Portfolio profiles across residential, plotted and villa developments, enterprise agency-account execution, and education and SaaS growth. Historical figures are owner-reported and await export reconciliation. Illustrative planning models are labelled separately; portfolio inclusion does not imply a direct developer appointment.',
}

export const CATEGORIES = [
  { id: 'launch', name: 'Residential launches' },
  { id: 'plotted', name: 'Plotted, villa and township' },
  { id: 'enterprise', name: 'Enterprise portfolio' },
  { id: 'growth', name: 'Education, SaaS and growth' },
]

export const PROJECTS = [
  /* ── Engagements with published, delivered numbers ────────────────────── */
  {
    slug: 'indium-north-bangalore',
    category: 'launch',
    project: 'Indium Group',
    developer: 'Indium Group',
    h1: 'Indium Group — reported acquisition and site-visit pipeline',
    blurb: '₹266 per lead at 51% sales-ready. Fourteen days.',
    title: 'Indium Group Case Study — ₹266 CPL, 51% Sales-Ready | QDnCo',
    desc: 'A premium North Bangalore campaign with reported lead cost, sales-readiness and site-visit pipeline. Review the test context and evidence limitations.',
    location: 'North Bangalore',
    product: 'Premium residential',
    stage: 'Delivered',
    chip: '₹266 CPL · 51% sales-ready',
    facts: [
      { v: '₹266', k: 'cost per lead' },
      { v: '51%', k: 'sales-ready, scored by the client' },
      { v: '₹2.75 Cr', k: 'site-visit pipeline' },
      { v: '14 days', k: 'test window' },
    ],
    lede: 'This is the engagement behind the benchmark quoted everywhere else on this site, and the one number worth understanding properly before it is quoted back.',
    result: 'The historical portfolio reports 150+ leads at approximately ₹266 cost per lead over fourteen days, with 51% scored sales-ready by the client and about ₹2.75 crore of site-visit pipeline. These are owner-reported figures; platform exports and sales records have not yet been reconciled for this publication. Pipeline is not booked revenue.',
    body: [
      {
        h2: 'Pipeline is not booked revenue',
        html: 'Site-visit pipeline represents potential inventory value associated with buyer visits. It is not collected revenue or confirmed bookings. The historical portfolio reports a fourteen-day test; no revenue-return multiple is stated because a closed-revenue reconciliation is not available.',
      },
      {
        h2: 'Why the quality rate is on the card',
        html: '₹266 on its own is a cost per form fill. Paired with 51% sales-ready — scored by the client\'s sales team, not by us — it becomes an effective ₹520 per lead worth calling.|||We do not publish the first figure without the second. A ₹150 lead at 10% sales-ready costs ₹1,500 per useful lead and looks better on a dashboard, which is how most agency benchmarks in this category are constructed.',
      },
      {
        h2: 'What made it work',
        html: 'LIST:A tight catchment drawn from the buyer research rather than from the postcode;;Creative tested as distinct arguments — price, connectivity, proof — not as colour variants of one message;;A qualification standard agreed before launch, so "good lead" meant the same thing to both sides on day one;;A short, controlled test window rather than a slow burn, which is what made the fourteen-day read trustworthy',
      },
    ],
  },
  {
    slug: 'godrej-woodscapes',
    category: 'enterprise',
    project: 'Godrej Woodscapes',
    developer: 'Godrej Properties',
    h1: 'Godrej Woodscapes — enterprise-scale acquisition in East Bangalore',
    blurb: 'Agency-account experience; reported enterprise-portfolio figures.',
    title: 'Godrej Woodscapes Case Study — Enterprise Scale | QDnCo',
    desc: 'Large-format residential at Budigere Cross, East Bangalore: approximately ₹450 cost per lead at around 22,000 leads a month across an enterprise portfolio.',
    location: 'Budigere Cross · East Bangalore',
    product: 'Large-format residential · ~₹2.73 Cr',
    stage: 'Delivered',
    chip: 'Reported portfolio · ~22k leads/mo',
    facts: [
      { v: '~₹450', k: 'cost per lead at scale' },
      { v: '~22,000', k: 'leads per month, portfolio' },
      { v: 'Portfolio', k: 'historical agency-account execution' },
      { v: '~₹2.73 Cr', k: 'ticket size' },
    ],
    lede: 'The counterpart to the Indium engagement: what the same discipline looks like when the constraint is scale rather than proof, and why the cost per lead is deliberately higher.',
    result: 'The historical portfolio reports approximately ₹450 per lead and around 22,000 monthly leads across an enterprise portfolio. This is agency-account execution experience, not a direct-client claim or a project-specific result. Platform exports, dates and scope remain to be reconciled for publication.',
    body: [
      {
        h2: 'Why ₹450 here and ₹266 there',
        html: 'Because volume and cost move against each other, always. A fourteen-day test into a tightly drawn catchment can hold ₹266. Sustaining ~22,000 leads a month means reaching far past the cheapest audience, and the marginal lead costs more than the first one.|||Any agency showing you a low CPL at high volume is either new to the account, reporting a partial window, or not counting something. The honest version of scale is that efficiency degrades and you plan for it.',
      },
      {
        h2: 'What changes at portfolio scale',
        html: 'LIST:Creative fatigue arrives on a schedule rather than as an event, so refresh becomes a standing process instead of a reaction;;Audience overlap between concurrent projects has to be managed or the projects bid against each other;;Reporting shifts from "did it work" to "which cell is degrading and how fast";;The optimisation event matters more, not less — at 22,000 leads a month, a wrong event compounds into a very expensive month',
      },
    ],
  },
  {
    slug: 'godrej-tiara',
    model: { spendLakh: '7.0', cpl: 480, leads: 1458, svPct: '2.9', siteVisits: 42, bookings: 15 },
    category: 'enterprise',
    project: 'Godrej Tiara',
    developer: 'Godrej Properties',
    h1: 'Godrej Tiara — luxury acquisition on the Tumkur Road corridor',
    blurb: 'Enterprise Meta and Google execution at a ~₹4.4 Cr ticket.',
    title: 'Godrej Tiara Case Study — Luxury Residential | QDnCo',
    desc: 'Luxury residential at Yeshwanthpur on the Tumkur Road corridor, ~₹4.4 crore ticket, run as enterprise-scale Meta and Google acquisition.',
    location: 'Yeshwanthpur · Tumkur Road',
    product: 'Luxury residential · ~₹4.4 Cr',
    stage: 'Delivered',
    chip: 'Enterprise Meta + Google',
    facts: [
      { v: '~₹4.4 Cr', k: 'ticket size' },
      { v: 'Meta + Google', k: 'as one funnel' },
      { v: 'Yeshwanthpur', k: 'metro corridor' },
    ],
    lede: 'A luxury ticket on a corridor whose buyer is locally rooted rather than transient — which changes the argument more than the budget does.',
    result: null,
    body: [
      {
        h2: 'Why a ₹4.4 crore ticket is a different campaign',
        html: 'The audience is small enough that broad prospecting exhausts it quickly, and the decision cycle is long enough that a last-click report will consistently undervalue the work that created the demand.|||So the structure leans harder on search defence and retargeting than a mid-market launch would, and success is read on cost per site visit rather than cost per lead — because at this ticket, a hundred cheap leads are worth less than three people who came to look.',
      },
      {
        h2: 'The West Bangalore particular',
        html: 'Yeshwanthpur buyers are, more than in any other Bangalore corridor, already local. They do not need the locality explained and creative that orients them reads as condescending. What they evaluate is the specific building and the specific price, which is why value clarity outperforms aspiration here even at a luxury ticket.',
      },
    ],
  },
  {
    slug: 'godrej-msr-city',
    model: { spendLakh: '6.5', cpl: 310, leads: 2097, svPct: '3.4', siteVisits: 71, bookings: 21 },
    category: 'enterprise',
    project: 'Godrej MSR City',
    developer: 'Godrej Properties',
    h1: 'Godrej MSR City — airport-corridor execution at Devanahalli',
    blurb: 'Investor-weighted demand on the North Bangalore growth corridor.',
    title: 'Godrej MSR City Case Study — Devanahalli | QDnCo',
    desc: 'Airport-corridor residential at Shettigere, Devanahalli: 2 BHK at ~₹1.34 crore, marketed into North Bangalore\'s investor-weighted demand.',
    location: 'Shettigere · Devanahalli',
    product: '2 BHK · ~₹1.34 Cr',
    stage: 'Delivered',
    chip: 'Airport corridor',
    facts: [
      { v: '~₹1.34 Cr', k: '2 BHK ticket' },
      { v: 'Devanahalli', k: 'airport corridor' },
      { v: 'Investor-led', k: 'demand profile' },
    ],
    lede: 'North Bangalore is the most investor-weighted catchment in the city, and that single fact rewrites the advertising argument.',
    result: null,
    body: [
      {
        h2: 'Selling a timeline, not a home',
        html: 'A buyer here is making a bet on the airport corridor, the metro extension and the northern employment belt. Intent windows are longer and budget bands wider than the same ticket implies elsewhere, so the qualification conversation runs differently.|||Connectivity and appreciation are the product. That is also the risk: infrastructure claims are promises about things the developer does not control, and under RERA the promoter carries what the advertisement implies. Sanctioned and dated only; never merely announced.',
      },
    ],
  },

  /* ── Live developer campaigns ─────────────────────────────────────────── */
  {
    slug: 'kumar-platina',
    model: { spendLakh: '6.5', cpl: 355, leads: 1831, svPct: '3.2', siteVisits: 59, bookings: 18 },
    category: 'launch',
    project: 'Kumar Platina',
    developer: 'Kumar Properties',
    h1: 'Kumar Platina — Nagasandra, opposite the metro',
    blurb: '184 apartments on 1.84 acres, opposite Nagasandra Metro.',
    title: 'Kumar Platina Case Study — Nagasandra, Bangalore | QDnCo',
    desc: 'Performance marketing for Kumar Properties\' Kumar Platina at Nagasandra on Tumkur Road: 2.5 and 3 BHK from ₹1.9 crore, RERA-registered, opposite the metro.',
    location: 'Nagasandra · Tumkur Road',
    product: '2.5 / 3 BHK · from ₹1.9 Cr',
    stage: 'Live',
    chip: 'RERA-registered · metro-adjacent',
    facts: [
      { v: '184', k: 'apartments, 2 towers' },
      { v: '1.84 acres', k: 'site' },
      { v: '₹1.9 Cr', k: 'from-price in market' },
      { v: 'Mar 2031', k: 'possession' },
    ],
    lede: 'A metro-adjacent launch on Tumkur Road, and a useful example of how much of a campaign\'s outcome is decided by things that are not the campaign.',
    result: null,
    body: [
      {
        h2: 'The location is the argument',
        html: 'Opposite Nagasandra Metro and opposite IKEA. In West and North-West Bangalore, walking-minutes-to-metro outperforms amenity lists reliably enough that it earns the headline rather than a supporting line.|||The creative lock the client set was a single instruction — make Tumkur Road bold — and it was the correct one. Corridor recognition does more work here than the project name.',
      },
      {
        h2: 'What we fixed that was not advertising',
        html: 'The lead form initially carried the wrong contact number, and leads were not reaching the CRM reliably. Both were found and corrected in the first week.|||This is the ordinary reality of launch marketing and the reason the funnel is treated as part of the engagement rather than as the client\'s problem. A campaign delivering perfectly into a broken form produces a report full of leads and a sales team with nothing to call. The advertising was never the constraint in that week.',
      },
      {
        h2: 'RERA discipline',
        html: 'The project carries an issued RERA registration, so the number appears on the creative and on the form. Where a project in our portfolio does not have one issued, no RERA claim appears anywhere in its advertising — not "RERA approved", not "RERA applied", not a sibling project\'s number.|||That rule costs reach on some campaigns. It is not negotiable, because the promoter carries the liability for what the advertisement says and an agency that treats it casually is handing its client an exposure it will never see.',
      },
    ],
  },
  {
    slug: 'brigade-eternia',
    model: { spendLakh: '6.8', cpl: 385, leads: 1766, svPct: '3.0', siteVisits: 53, bookings: 18 },
    category: 'launch',
    project: 'Brigade Eternia',
    developer: 'Brigade Group',
    h1: 'Brigade Eternia — Yelahanka, North Bangalore',
    blurb: '3 BHK from ₹2.47 Cr, RERA-registered, on the NH-44 corridor.',
    title: 'Brigade Eternia Case Study — Yelahanka | QDnCo',
    desc: 'Performance marketing for Brigade Group\'s Brigade Eternia at Yelahanka on the Doddaballapur Road / NH-44 corridor: 3 BHK from ₹2.47 crore, RERA-registered.',
    location: 'Yelahanka · Doddaballapur Rd / NH-44',
    product: '3 BHK · from ₹2.47 Cr',
    stage: 'Live',
    chip: 'RERA-registered',
    facts: [
      { v: '₹2.47 Cr', k: '3 BHK from-price' },
      { v: 'Mar 2030', k: 'possession, per RERA' },
      { v: 'NH-44', k: 'airport corridor' },
      { v: 'Registered', k: 'RERA, on-image' },
    ],
    lede: 'A North Bangalore launch from a developer whose name is an asset — which is less common in this market than you would expect, and changes the creative approach entirely.',
    result: null,
    body: [
      {
        h2: 'When the developer name leads',
        html: 'Much real estate advertising in this market deliberately withholds the developer name and sells curiosity instead. Where the brand is strong enough to carry the ad on its own, that tactic is wasted — the name is the strongest single element available and burying it to manufacture intrigue costs conversion.|||Eternia is the second case. Brigade leads, the RERA number sits on the image, and the price is stated. Nothing is held back to force an enquiry.',
      },
      {
        h2: 'Price stated, not gated',
        html: 'The from-price is taken from the developer\'s own published FAQ rather than from an aggregator listing, and aggregator figures that disagreed with it were discarded rather than averaged.|||Publishing the price loses some leads and improves nearly every number after the form. Enquiries that would have failed the budget criterion never enter the funnel, so the sales team spends its day on people who can actually transact.',
      },
      {
        h2: 'What is held back',
        html: 'The 1 and 2 BHK inventory exists and is not advertised. Running every configuration at once splits the audience signal and produces a campaign that optimises toward the cheapest enquiry rather than the intended buyer.|||Configurations are released to market deliberately, one buyer profile at a time.',
      },
    ],
  },
  {
    slug: 'brigade-jeevan-sandya',
    model: { spendLakh: '7.0', cpl: 410, leads: 1707, svPct: '3.0', siteVisits: 51, bookings: 17 },
    category: 'launch',
    project: 'Brigade Jeevan Sandya',
    developer: 'Brigade Group',
    h1: 'Brigade Jeevan Sandya — Kanakapura Road',
    blurb: '3, 3.5 and 4 BHK from ₹3.09 Cr on the Green Line belt.',
    title: 'Brigade Jeevan Sandya Case Study — Kanakapura Road | QDnCo',
    desc: 'Performance marketing for Brigade Group\'s Jeevan Sandya on Kanakapura Road, South Bengaluru: 3 to 4 BHK from ₹3.09 crore, marketed at EOI stage.',
    location: 'Kanakapura Road · South Bengaluru',
    product: '3 / 3.5 / 4 BHK · from ₹3.09 Cr',
    stage: 'Live · EOI',
    chip: 'EOI stage',
    facts: [
      { v: '₹3.09 Cr', k: '3 BHK from-price' },
      { v: '2,100 sqft', k: '3 BHK, onwards' },
      { v: 'Green Line', k: 'metro belt' },
      { v: 'EOI', k: 'launch stage' },
    ],
    lede: 'A large-format launch on the Green Line belt, marketed at expression-of-interest stage — which imposes a discipline most pre-launch advertising ignores.',
    result: null,
    body: [
      {
        h2: 'Advertising at EOI, correctly',
        html: 'An expression-of-interest campaign is still marketing the project. It is not a loophole around registration, and treating it as one is the most common compliance failure in Indian pre-launch advertising.|||Where a registration has not been issued, no RERA claim appears in any form — including the softer phrasings that imply one. The advertising sells the location, the format and the stage, and says nothing it cannot support.',
      },
      {
        h2: 'Landmark over locality',
        html: 'The anchor in the creative is a named landmark on the road rather than the locality name. In South Bangalore, where several launches compete for an overlapping audience in the same month, the landmark is what a buyer can place instantly; the locality name is what every competitor is also saying.',
      },
      {
        h2: 'Possession dates are not marketing copy',
        html: 'Where the client\'s stated completion and the public record disagree, the campaign prints neither until they are reconciled. A possession year is the single most quoted-back line in a property advertisement and the easiest to be held to.',
      },
    ],
  },
  {
    slug: 'brigade-granada',
    model: { spendLakh: '6.4', cpl: 330, leads: 1939, svPct: '3.4', siteVisits: 66, bookings: 19 },
    category: 'plotted',
    project: 'Brigade Granada',
    developer: 'Brigade Group',
    h1: 'Brigade Granada — a Spanish-themed township at Whitefield',
    blurb: 'Mixed-use township on the Whitefield–Kadugodi road, EOI open.',
    title: 'Brigade Granada Case Study — Whitefield | QDnCo',
    desc: 'Performance marketing for Brigade Group\'s Granada, a Spanish-themed mixed-use township on the Whitefield–Kadugodi road in East Bangalore, at EOI stage.',
    location: 'Whitefield–Kadugodi · East Bangalore',
    product: 'Mixed-use township',
    stage: 'Live · EOI',
    chip: 'Township · EOI',
    facts: [
      { v: '40+ acres', k: 'township scale' },
      { v: 'Whitefield', k: 'IT employment belt' },
      { v: 'EOI', k: 'open now' },
    ],
    lede: 'A township is not a large apartment project, and advertising it as one wastes the only thing that makes it distinctive.',
    result: null,
    body: [
      {
        h2: 'Selling a place, not a plan',
        html: 'The winning concept in testing led on the theme and the scale — live, work, relax within one development — rather than on configuration and price.|||At township scale the buyer is choosing an environment they will live inside for a decade. Leading with square footage answers a question they have not reached yet.',
      },
      {
        h2: 'The East Bangalore constraint',
        html: 'Whitefield is the most commute-decided catchment in the city. A project twenty minutes further out is in a different market, not a slightly worse one, so the catchment is drawn tightly and geography does real work in the qualification standard.|||It is also where search budgets die: rental, resale and PG queries surround every property term here, and the negative keyword list has to be built before launch rather than after the first invoice.',
      },
    ],
  },
  {
    slug: 'brigade-vanagaram',
    model: { spendLakh: '6.5', cpl: 360, leads: 1806, svPct: '3.1', siteVisits: 56, bookings: 18 },
    category: 'launch',
    project: 'Brigade Vanagaram',
    developer: 'Brigade Group',
    h1: 'Brigade Vanagaram — west Chennai pre-launch',
    blurb: 'Premium mixed-use off NH-48, launching October 2026.',
    title: 'Brigade Vanagaram Case Study — Chennai | QDnCo',
    desc: 'Pre-launch marketing for Brigade Group\'s Vanagaram development in west Chennai: 2 and 3 BHK, 10 acres off the NH-48 bypass, launching October 2026.',
    location: 'Vanagaram · Noombal · west Chennai',
    product: '2 / 3 BHK · 1,200–1,900 sqft',
    stage: 'Pre-launch',
    chip: 'Chennai · Oct 2026',
    facts: [
      { v: '10 acres', k: 'mixed-use' },
      { v: 'NH-48', k: 'bypass, immediately north' },
      { v: 'Oct 2026', k: 'official launch' },
      { v: 'Mid-2031', k: 'handover' },
    ],
    lede: 'The first engagement outside Karnataka, and a deliberate test of how much of a catchment playbook transfers to a city where we have no delivered history.',
    result: null,
    body: [
      {
        h2: 'What transfers and what does not',
        html: 'The mechanics transfer completely — funnel structure, the separation of channel-partner and end-buyer pools, the qualification standard, creative test design. Those are properties of the platforms and of sales physics, not of the city.|||What does not transfer is the catchment knowledge. Ambattur\'s IT cluster is not Whitefield\'s, and assuming otherwise is how an agency arrives with confident targeting and a poor result. The research gate here did more discovery and less pattern-matching, and cost more time as a consequence.',
      },
      {
        h2: 'Pre-launch without a price',
        html: 'Where the client has not released a from-price, none is used — including the figures circulating on aggregator and channel-partner listings, which are frequently wrong and are never the developer\'s to be quoted on.|||A pre-launch campaign can run honestly on location, format and stage. It cannot run on a price nobody has confirmed.',
      },
    ],
  },
  {
    slug: 'vaishnavi-life-mysore',
    model: { spendLakh: '6.3', cpl: 240, leads: 2625, svPct: '3.5', siteVisits: 92, bookings: 26 },
    category: 'plotted',
    project: 'Vaishnavi Life Mysore',
    developer: 'Vaishnavi Group',
    h1: 'Vaishnavi Life — gated plots in Mysore city',
    blurb: 'MDA-approved plots at RT Nagar, from ₹6,000/sqft.',
    title: 'Vaishnavi Life Mysore Case Study — Plotted Development | QDnCo',
    desc: 'Performance marketing for Vaishnavi Group\'s plotted development at RT Nagar, Mysore city: 30×40 to 40×60 plots from ₹6,000 per square foot, ready by 2028.',
    location: 'RT Nagar · Mysore city',
    product: 'Gated plots · 30×40 to 40×60',
    stage: 'Live',
    chip: 'Tier-2 · plotted',
    facts: [
      { v: '₹6,000', k: 'per sqft, from' },
      { v: '1,200–2,400', k: 'sqft plot sizes' },
      { v: '2028', k: 'ready by' },
      { v: 'MDA', k: 'approving authority' },
    ],
    lede: 'Our best-performing Tier-2 engagement, and the one that most clearly shows why apartment creative fails on plotted inventory.',
    result: null,
    body: [
      {
        h2: 'Plot buyers convert on trust, not aspiration',
        html: 'A plot buyer is purchasing a legal position and a future intention. Every doubt they hold is about whether that position is sound — title, approvals, boundaries, dimensions.|||So the creative is documentary rather than lifestyle. Approval authority, plot dimensions, what is legally established as against what is planned. Renders of a clubhouse address none of the questions actually being asked, which is why apartment creative carried across to plotted inventory reliably underperforms.',
      },
      {
        h2: 'City, not corridor — and the approving authority matters',
        html: 'Mysore city and Mysore Road are different markets and the campaign was corrected early to say so. A buyer looking in Mysore city is not looking on the Bangalore–Mysore road, and conflating the two produces enquiries that fail the geography criterion on arrival.|||The approving authority is named accurately as the Mysore Development Authority. Much competing advertising in this market still names an authority that was dissolved in 2025. Getting that right is a small thing that a serious plot buyer notices, and it is free.',
      },
      {
        h2: 'The Tier-2 arbitrage, stated honestly',
        html: 'Cost per lead in Mysore and Tier-2 Karnataka runs at roughly half the Bangalore level, because the auction is far less contested.|||The offsetting truth is that the sales cycle is slower and more of the decision happens in person. Half the cost per lead against double the time to booking is not an improvement in cost per booking, and a developer who reads only the first half of that sentence will be disappointed.',
      },
    ],
  },
  {
    slug: 'nambiar-bannerghatta',
    model: { spendLakh: '6.0', cpl: 520, leads: 1154, svPct: '2.8', siteVisits: 32, bookings: 12 },
    category: 'plotted',
    project: 'Nambiar Bannerghatta',
    developer: 'Nambiar Group',
    h1: 'Nambiar — a grand villa community at Bannerghatta',
    blurb: '76 acres, 298 villa plots, from ₹5.22 Cr.',
    title: 'Nambiar Bannerghatta Case Study — Villa Community | QDnCo',
    desc: 'Pre-launch marketing for Nambiar Group\'s eco-themed grand villa community at Bannerghatta, South Bangalore: 76-acre master plan, 298 plots, from ₹5.22 crore.',
    location: 'Bannerghatta · South Bengaluru',
    product: 'Eco-themed villa plots',
    stage: 'Pre-launch',
    chip: '₹5.22 Cr · villas',
    facts: [
      { v: '76 acres', k: 'master plan' },
      { v: '36 acres', k: 'phase one' },
      { v: '298', k: 'plots' },
      { v: '₹5.22 Cr', k: 'from-price' },
    ],
    lede: 'A ₹5 crore-plus villa ticket, where the audience is small enough that precision matters more than budget.',
    result: null,
    body: [
      {
        h2: 'A small audience changes the arithmetic',
        html: 'At this ticket the reachable audience in the catchment is measured in thousands, not lakhs. Frequency climbs quickly and creative fatigue arrives far sooner than the same spend would produce on a mid-market launch.|||So the campaign runs on a deliberately modest daily budget with a wider creative rotation, rather than a large budget against a narrow set of assets. Spending faster into a small audience buys frequency, not reach.',
      },
      {
        h2: 'Reconciling the client\'s numbers with the public ones',
        html: 'The client\'s own brief and the project\'s public marketing site stated different acreages. The campaign uses the figure the client confirmed in writing, and the public figure is treated as unverified rather than averaged into something neither party said.|||This sounds pedantic until a buyer quotes an advertisement back during a site visit. Every number in the creative traces to a document the client has confirmed.',
      },
    ],
  },
  {
    slug: 'vajram-kogilu',
    model: { spendLakh: '6.2', cpl: 340, leads: 1824, svPct: '3.3', siteVisits: 60, bookings: 18 },
    category: 'launch',
    project: 'Vajram KGF 2.0',
    developer: 'Vajram Group',
    h1: 'Vajram — 3 BHK at Kogilu, North Bangalore',
    blurb: 'From ₹1.71 Cr, EOI stage, on the airport corridor.',
    title: 'Vajram Kogilu Case Study — North Bangalore | QDnCo',
    desc: 'Performance marketing for Vajram Group\'s 3 BHK development at Kogilu, North Bangalore: 1,600–1,628 sqft from ₹1.71 crore, at EOI stage.',
    location: 'Kogilu · North Bengaluru',
    product: '3 BHK · 1,600–1,628 sqft',
    stage: 'Live · EOI',
    chip: '₹1.71 Cr · EOI',
    facts: [
      { v: '₹1.71 Cr', k: 'from-price' },
      { v: '3 BHK', k: 'single configuration' },
      { v: '~8 km', k: 'to Manyata' },
      { v: 'EOI', k: 'stage' },
    ],
    lede: 'A single-configuration launch, which is a considerable advantage in testing and an underused one in this market.',
    result: null,
    body: [
      {
        h2: 'One configuration is a cleaner test',
        html: 'Most launches advertise every configuration at once, which splits the audience signal and produces a campaign that drifts toward whichever unit type fills forms most readily — usually the cheapest, and usually not the one the developer needs to move.|||Here the inventory is 3 BHK only. The entire budget tests messages against one buyer, so a result means something on the first read rather than after untangling which configuration produced it.',
      },
      {
        h2: 'What is not claimed',
        html: 'There is no metro station opposite this project, and the advertising does not imply one. Connectivity is stated in real distances to real employment centres.|||Where the group has registration numbers for other inventory, none of them appear here. A sibling project\'s RERA number on the wrong campaign is a misrepresentation, however convenient.',
      },
    ],
  },
  {
    slug: 'nikoo-homes-9',
    model: { spendLakh: '6.6', cpl: 365, leads: 1808, svPct: '3.2', siteVisits: 58, bookings: 18 },
    category: 'launch',
    project: 'Nikoo Homes 9',
    developer: 'Bhartiya City · Nikoo Homes',
    h1: 'Nikoo Homes 9 — the first outside Thanisandra',
    blurb: 'KIADB Aerospace corridor, studio to 3-bed loft.',
    title: 'Nikoo Homes 9 Case Study — KIADB, North Bangalore | QDnCo',
    desc: 'Marketing for Bhartiya City\'s Nikoo Homes 9 at the KIADB Aerospace Park junction, Bagalur — the first Nikoo development outside the Thanisandra township.',
    location: 'KIADB · Bagalur · North Bengaluru',
    product: 'Studio to 3-bed loft',
    stage: 'Launch window',
    chip: 'Aerospace corridor',
    facts: [
      { v: 'From ₹0.62 Cr', k: 'studio' },
      { v: '₹2.56–2.66 Cr', k: '3-bed loft' },
      { v: 'KIADB', k: 'Aerospace Park' },
      { v: 'First', k: 'Nikoo outside Thanisandra' },
    ],
    lede: 'A wide configuration range on an emerging corridor — two conditions that between them make audience discipline the whole job.',
    result: null,
    body: [
      {
        h2: 'A studio buyer and a loft buyer are not one audience',
        html: 'From ₹62 lakh to ₹2.66 crore is not a price range; it is several different people. Run together, the campaign optimises toward the cheapest enquiry and reports a healthy cost per lead while failing to reach the buyer the inventory needs.|||Each band runs as its own campaign with its own creative and its own qualification threshold.',
      },
      {
        h2: 'Marketing a corridor that is still becoming one',
        html: 'The Aerospace Park and the airport belt are the underlying thesis, and buyers here are explicitly betting on a timeline. That makes infrastructure the product, and infrastructure claims the principal compliance risk.|||What is sanctioned and dated may be stated. What is announced may not. That distinction is where most airport-corridor advertising in this city quietly overreaches.',
      },
      {
        h2: 'One claim per frame',
        html: 'Creative for this project runs on a strict discipline: a single claim per image, with distinct concepts tested against each other rather than a single message repeated in variations.|||It is a slower way to build a creative pack and it is the only way a test tells you which argument the market responded to, as opposed to which colourway.',
      },
    ],
  },
  {
    slug: 'urbanrise-paradise-on-earth',
    model: { spendLakh: '6.5', cpl: 350, leads: 1857, svPct: '3.2', siteVisits: 59, bookings: 19 },
    category: 'launch',
    project: 'Urbanrise Paradise on Earth',
    developer: 'Urbanrise',
    h1: 'Urbanrise Paradise on Earth',
    blurb: 'Large-format residential, research and creative pipeline.',
    title: 'Urbanrise Paradise on Earth Case Study | QDnCo',
    desc: 'Research, campaign architecture and creative production for Urbanrise\'s Paradise on Earth residential development.',
    location: 'Bengaluru',
    product: 'Large-format residential',
    stage: 'In pipeline',
    chip: 'Research + creative',
    facts: [
      { v: 'Research', k: 'gate completed' },
      { v: 'Creative', k: 'pack produced' },
    ],
    lede: 'One of the developments running through the research and creative pipeline, at a stage where the honest thing to publish is the process rather than a result.',
    result: null,
    body: [
      {
        h2: 'What exists at this stage',
        html: 'The competitive scrape, the buyer research and the creative production are complete or in progress. Campaign performance is not ours to publish and, at this stage, would not mean much if it were.|||We publish projects at pipeline stage because the pipeline is the product — the research gate, the architecture and the compliance check happen before any money reaches a platform, and that ordering is the thing a developer is actually buying.',
      },
    ],
  },

  /* ── Growth, EdTech, SaaS ─────────────────────────────────────────────── */
  {
    slug: 'roboprenr',
    category: 'growth',
    project: 'Roboprenr',
    developer: 'Roboprenr',
    h1: 'Roboprenr — 27+ enrolments on zero media spend',
    blurb: 'Organic only: Google Business Profile and local SEO.',
    title: 'Roboprenr Case Study — Organic Growth, Zero Media | QDnCo',
    desc: 'The Roboprenr Yelahanka engagement: local SEO and Google Business Profile work, with reported enrolments and the limits of the available evidence.',
    location: 'Yelahanka · Bangalore',
    product: 'STEAM education',
    stage: 'Delivered',
    chip: '₹0 media · 27+ enrolments',
    facts: [
      { v: '₹0', k: 'media spend' },
      { v: '27+', k: 'enrolments' },
      { v: 'up to ₹13L', k: 'value' },
      { v: 'GBP + local SEO', k: 'entire channel' },
    ],
    lede: 'The engagement we point to when a client asks whether they need to advertise at all. Sometimes the honest answer is no.',
    result: '27+ enrolments and up to ₹13 lakh in value, on zero rupees of advertising spend, through Google Business Profile optimisation and local SEO alone.',
    body: [
      {
        h2: 'Why this worked without media',
        html: 'A local education centre serves a catchment measured in kilometres, and the people in it are already searching — for classes near them, by name, with intent. That demand exists whether or not anyone advertises against it.|||Capturing it needs a complete and correct Google Business Profile, consistent local citations, and pages that answer the questions parents actually type. None of that is a media buy.',
      },
      {
        h2: 'When advertising is the wrong recommendation',
        html: 'If existing demand in a tight catchment is not being captured, buying more demand is the expensive way to solve a cheaper problem. Media should follow the point at which organic capture is saturated.|||We would rather say this and be right than sell a retainer against it — and it is the same reasoning behind selling the market read as a paid diagnostic that is permitted to conclude "do not spend".',
      },
    ],
  },
  {
    slug: 'netri-lms',
    category: 'growth',
    project: 'Netri LMS',
    developer: 'Netri',
    h1: 'Netri — STEAM EdTech go-to-market at ₹162 per lead',
    blurb: 'GTM and a four-stage funnel for an EdTech SaaS launch.',
    title: 'Netri LMS Case Study — EdTech GTM, ₹162 CPL | QDnCo',
    desc: 'Go-to-market and full-funnel build for Netri, a STEAM EdTech SaaS platform, delivering leads at ₹162 on controlled launch spend.',
    location: 'India',
    product: 'STEAM EdTech SaaS',
    stage: 'Delivered',
    chip: '₹162 CPL',
    facts: [
      { v: '₹162', k: 'cost per lead' },
      { v: 'C1–C4', k: 'funnel stages built' },
      { v: 'Controlled', k: 'launch spend' },
    ],
    lede: 'A software launch rather than a property one, and a useful demonstration of which parts of the method are about real estate and which are not.',
    result: 'Leads at ₹162 on controlled launch spend, against a four-stage funnel built from the go-to-market research.',
    body: [
      {
        h2: 'What carried across from property',
        html: 'The sequence did. Research before spend, a written definition of what counts as a qualified lead, distinct creative concepts rather than variants, and a feedback loop from the CRM back to the platforms.|||None of that is real-estate knowledge. It is how paid acquisition works when it is done deliberately.',
      },
      {
        h2: 'What did not',
        html: 'Every prior. Catchment knowledge, RERA workflow, buyer research, the cost-per-lead benchmarks — all of it is property-specific and none of it transfers. A ₹162 lead here and a ₹266 lead on a residential launch are not comparable quantities and we do not present them as a trend.|||So the research gate did more genuine discovery on this engagement and less pattern-matching, which is the honest trade when working outside a specialism.',
      },
    ],
  },
  {
    slug: 'marga-education',
    category: 'growth',
    project: 'Marga Education',
    developer: 'Marga',
    h1: 'Marga — admissions growth and enrolment GTM',
    blurb: 'Meta and Google funnels for parent and student acquisition.',
    title: 'Marga Education Case Study — Admissions Growth | QDnCo',
    desc: 'Meta and Google acquisition funnels, parent and student targeting, and enrolment go-to-market for Marga Education.',
    location: 'India',
    product: 'Education · admissions',
    stage: 'Delivered',
    chip: 'Meta + Google',
    facts: [
      { v: 'Meta + Google', k: 'as one funnel' },
      { v: 'Parent + student', k: 'separated audiences' },
      { v: 'Enrolment', k: 'measured outcome' },
    ],
    lede: 'Admissions marketing has a structural problem in common with real estate: the person who searches and the person who pays are frequently not the same person.',
    result: null,
    body: [
      {
        h2: 'Two audiences, one enrolment',
        html: 'The student researches and the parent decides, and they respond to opposite arguments — outcomes and credibility for one, experience and fit for the other. Run as a single campaign, the platform optimises toward whichever fills forms more readily and the other is quietly under-served.|||They run as separate pools, the same way channel-partner and end-buyer demand are separated on a property launch. It is the same structural error in a different market.',
      },
      {
        h2: 'The deadline shape',
        html: 'Admissions demand is seasonal in a way property demand is not — a hard intake deadline concentrates intent into weeks. That rewards front-loading the test window so that the scaling decision lands before the season rather than during it.',
      },
    ],
  },
  {
    slug: 'logiclaunch',
    category: 'growth',
    project: 'LogicLaunch',
    developer: 'LogicLaunch',
    h1: 'LogicLaunch — B2B SaaS demand generation',
    blurb: 'Funnel and CRM-led acquisition for B2B SaaS.',
    title: 'LogicLaunch Case Study — B2B SaaS Demand Gen | QDnCo',
    desc: 'B2B SaaS scaling, demand generation, and funnel and CRM-led acquisition with go-to-market support for LogicLaunch.',
    location: 'India',
    product: 'B2B SaaS',
    stage: 'Delivered',
    chip: 'B2B · demand gen',
    facts: [
      { v: 'B2B SaaS', k: 'category' },
      { v: 'CRM-led', k: 'acquisition' },
      { v: 'GTM', k: 'support' },
    ],
    lede: 'The longest sales cycle of any engagement here, and the one where last-click attribution is most comprehensively misleading.',
    result: null,
    body: [
      {
        h2: 'Why the CRM is the campaign',
        html: 'In B2B the gap between first touch and closed deal spans months and several people. A platform optimising on form fills is optimising on the least informative event in the whole process.|||So the qualification event fired back from the CRM is not an improvement here, it is the entire mechanism. Without it the algorithm hunts for form-fillers, and in B2B that population and the buying population barely overlap.',
      },
      {
        h2: 'The same trap as real estate demand creation',
        html: 'Search will look efficient and social will look wasteful on a last-click report, because demand creation is invisible to last-click. Cut the demand creation and search performance degrades a few weeks later, having been fed by it all along.|||This is identical to the Meta-versus-Google misreading on property launches. Different industry, same measurement error.',
      },
    ],
  },
]
