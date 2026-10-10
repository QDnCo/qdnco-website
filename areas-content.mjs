/**
 * Catchment pages.
 *
 * The trap this file exists to avoid: the previous corpus generated 39 "local
 * landing angles" from five paragraphs by cycling the place name, which is
 * doorway spam whatever it is called and reads as such to anything that
 * compares two of them.
 *
 * So the constraint here is that each page must contain something that is only
 * true of that catchment — a different buyer, a different argument, a different
 * language mix, a different reason the auction prices the way it does. If a
 * paragraph would survive a find-and-replace of the corridor name, it does not
 * belong on the page.
 *
 * Six pages, because there are six catchments we can say something specific
 * about. There is no seventh, and inventing one would undo the point.
 *
 * Named delivered proof appears on exactly one page (North Bangalore), because
 * that is the only catchment where we have a published metric. The others say
 * so rather than borrowing it.
 */

export const HUB = {
  title: 'Catchments — Bangalore, Mysore & Karnataka | QDnCo',
  h1: 'Where we work, and how each catchment buys differently',
  desc: 'Compare real estate marketing across Bangalore, Mysore and Tier-2 Karnataka: buyer priorities, catchment strategy, language and campaign planning.',
  lede: 'Six catchments, each with a different buyer and a different argument that works on them. Where we have a delivered number for a corridor it is on that page; where we do not, the page says so rather than borrowing one from somewhere else.',
}

export const AREAS = [
  {
    slug: 'north-bangalore',
    h1: 'Real estate marketing in North Bangalore',
    blurb: 'Airport corridor, investor-heavy, infrastructure-led.',
    title: 'North Bangalore Real Estate Marketing | QDnCo',
    desc: 'Real estate marketing along the North Bangalore airport corridor: buyer intent, project positioning and how to judge lead quality alongside cost.',
    mins: 5,
    corridors: 'Devanahalli · Yelahanka · Hebbal · Thanisandra · Jakkur · Bagalur · the airport corridor along NH-44',
    keywords: ['North Bangalore real estate marketing', 'Devanahalli property marketing', 'airport corridor real estate ads'],
    lede: 'North Bangalore is the most investor-weighted catchment in the city, and that single fact changes the advertising argument more than any demographic detail does.',
    proof: 'This is the catchment behind our published benchmark: <strong>₹266 cost per lead at a 51% sales-ready rate</strong> on a premium residential launch, with the quality rate scored by the client\'s own sales team.',
    body: [
      {
        id: 'buyer', h2: 'Who is actually buying',
        html: 'A materially larger share of investors than anywhere else in Bangalore, buying against future appreciation rather than immediate occupation. The airport, the metro extension and the employment corridors north of Hebbal are the underlying thesis, and buyers here are explicitly making a bet on timelines.|||That changes what a lead is. An investor enquiry has no urgency about possession and a great deal of interest in what the corridor will look like in five years, so the qualification conversation runs differently — intent windows are longer and budget bands are wider than the same ticket size would imply elsewhere.',
      },
      {
        id: 'argument', h2: 'The argument that works',
        html: 'Connectivity and appreciation, evidenced. This is the one catchment where infrastructure timelines are genuinely the product, and where specific, checkable claims about them outperform lifestyle imagery.|||The corresponding risk is the one to manage carefully: infrastructure claims are promises about things you do not control. An advertisement implying a metro date or a road completion that slips becomes a complaint later, and under RERA the promoter carries it. Cite what is sanctioned and dated; do not imply what is merely announced.',
      },
      {
        id: 'auction', h2: 'Why leads cost what they do here',
        html: 'North Bangalore during launch season carries one of the more contested ad auctions in the city, because a large number of projects are addressing an overlapping investor audience with a similar message. Cost per lead sits at the upper half of the ₹350–₹500 Bangalore residential band in most months.|||The ₹266 we delivered is below that band and should be read as what a well-targeted premium launch achieved, not as what the corridor costs generally.',
      },
      {
        id: 'language', h2: 'Language and targeting notes',
        html: 'English-dominant with meaningful Kannada uplift in the outer stretches towards Bagalur and Devanahalli. Worth split-testing rather than assuming; the assumption that everyone in the corridor reads English advertising quietly costs reach at the edges.|||NRI targeting is more productive here than in any other Bangalore catchment, and it needs its own campaign — different time zones, different creative, and a sales process that can handle a buyer who will not visit the site before booking.',
      },
    ],
    faqs: [
      { q: 'What is the cost per lead for North Bangalore real estate?', a: 'Typically the upper half of the ₹350–₹500 Bangalore residential band, because the corridor carries a contested auction during launch season. We delivered ₹266 at 51% sales-ready on one premium residential launch, which is below band and should be read as a specific result rather than a corridor average.' },
      { q: 'Are North Bangalore buyers mostly investors?', a: 'A materially larger share than in other Bangalore catchments. Demand is weighted towards appreciation against the airport, metro and northern employment corridors, which lengthens intent windows and changes the qualification conversation.' },
      { q: 'Is NRI targeting worth it in North Bangalore?', a: 'More so than in any other Bangalore catchment, but it needs a separate campaign and a sales process that can close a buyer who will not visit the site first.' },
    ],
  },

  {
    slug: 'east-bangalore',
    h1: 'Real estate marketing in East Bangalore',
    blurb: 'Whitefield and the ORR belt — employment-led, commute-decided.',
    title: 'East Bangalore Real Estate Marketing — Whitefield, ORR | QDnCo',
    desc: 'How to market residential projects around Whitefield and the ORR, with campaign messaging shaped by employment, commute time and buyer priorities.',
    mins: 5,
    corridors: 'Whitefield · Budigere Cross · Varthur · Sarjapur Road · Marathahalli · the Outer Ring Road tech belt',
    keywords: ['East Bangalore real estate marketing', 'Whitefield property ads', 'Sarjapur Road real estate marketing'],
    lede: 'East Bangalore is the most end-user-driven catchment in the city and the one where a single variable — commute time — decides more sales than price does.',
    proof: null,
    body: [
      {
        id: 'buyer', h2: 'Who is actually buying',
        html: 'Salaried technology employees buying to live in, with the decision anchored to a specific office. The ORR tech belt and Whitefield campuses are the gravitational centre, and the catchment for any given project is drawn far more tightly than its postcode suggests — a project twenty minutes further out is competing in a different market, not a slightly worse one.|||The practical consequence is that the geography criterion in a qualified-lead definition does more work here than anywhere else. A lead from the wrong side of the ORR is not a marginal lead, it is a lead that will not visit.',
      },
      {
        id: 'argument', h2: 'The argument that works',
        html: 'Commute, stated in minutes to named employers, and school access. Those two carry more weight than amenity lists in this catchment, and they are checkable, which makes them safe to advertise specifically.|||Ready-to-move and near-possession inventory has a structural advantage here that it does not have in North Bangalore, because the buyer has a lease ending and a date in mind. Under-construction projects in this corridor are advertising against a competitor the buyer can move into next month, and the campaign has to acknowledge that rather than ignore it.',
      },
      {
        id: 'auction', h2: 'Why leads cost what they do here',
        html: 'High volume, high competition, and a large body of resale and rental inventory advertising into the same queries. This is the catchment where the Google negative keyword list matters most — "rent", "rental", "PG", "resale" and their variants will consume a search budget here faster than in any other part of the city.|||Cost per lead sits within the ₹350–₹500 band, with the wide variance driven mostly by how tightly the commute radius is drawn.',
      },
      {
        id: 'language', h2: 'Language and targeting notes',
        html: 'The most English-dominant catchment in the city, and the one where a multilingual split test is least likely to pay. It is also the most transient — a significant share of the audience has moved to Bangalore within a few years, which makes locality familiarity low and explicit orientation in the creative more valuable than it would be in West or South Bangalore.',
      },
    ],
    faqs: [
      { q: 'What matters most when marketing property in Whitefield?', a: 'Commute time to named employers, stated in minutes, and school access. Both outweigh amenity lists for this buyer, and both are checkable, which makes them safe to advertise specifically.' },
      { q: 'Why do East Bangalore search campaigns waste budget?', a: 'A large volume of rental and resale inventory competes for the same queries. Without a thorough negative keyword list — rent, rental, PG, resale and local variants — a search budget is consumed by traffic that converts at zero.' },
      { q: 'Is under-construction inventory harder to sell in East Bangalore?', a: 'It competes against ready-to-move stock for a buyer who often has a lease ending on a known date. The campaign has to address possession timing directly rather than avoid it.' },
    ],
  },

  {
    slug: 'west-bangalore',
    h1: 'Real estate marketing in West Bangalore',
    blurb: 'Metro-led, end-user, price-sensitive, locally rooted.',
    title: 'West Bangalore Real Estate Marketing | QDnCo',
    desc: 'Marketing residential projects in West Bangalore: value-led end-user demand along the metro corridor, why the buyer is locally rooted, and what that changes.',
    mins: 5,
    corridors: 'Yeshwanthpur · Nagasandra · Peenya · Rajajinagar · Malleshwaram fringe · Tumkur Road along the metro',
    keywords: ['West Bangalore real estate marketing', 'Yeshwanthpur property marketing', 'Tumkur Road real estate ads'],
    lede: 'West Bangalore has the most locally rooted buyer in the city, and campaigns written for the transient East Bangalore audience consistently underperform here for that reason.',
    proof: null,
    body: [
      {
        id: 'buyer', h2: 'Who is actually buying',
        html: 'End users with existing family and community ties in the area, frequently buying within a few kilometres of where they already live, and often upgrading rather than entering the market. Business-owning and trading households are better represented here than in the technology corridors.|||This is the most important difference in the city and the one most often missed. The buyer already knows the locality — they do not need it explained, and creative that orients them reads as condescending rather than helpful. What they are evaluating is the specific building and the specific price.',
      },
      {
        id: 'argument', h2: 'The argument that works',
        html: 'Value, clearly stated, and metro proximity in walking minutes. Price sensitivity here is genuine rather than performed, and a campaign that hides the price band to force an enquiry generates volume that fails the budget criterion at qualification.|||Publishing the entry price in the creative costs some leads and improves nearly every downstream number. In a catchment this price-sensitive, that trade is almost always correct.',
      },
      {
        id: 'auction', h2: 'Why leads cost what they do here',
        html: 'Less contested than North or East, with fewer simultaneous launches addressing the same audience. Cost per lead tends to the lower half of the ₹350–₹500 band.|||The offsetting factor is ticket size. Lower average ticket means the same cost per lead consumes a larger share of the per-unit marketing budget, so the cost-per-lead advantage is smaller than it looks once expressed per booking.',
      },
      {
        id: 'language', h2: 'Language and targeting notes',
        html: 'The catchment where Kannada creative earns its place most reliably. A Kannada and English split test is worth running as standard here rather than as an experiment, and the uplift is usually in reach and cost rather than in conversion rate.|||Radius targeting also works better here than interest-based targeting, because the buyer genuinely is local — a tight geographic ring around the project outperforms a demographic profile drawn across the city.',
      },
    ],
    faqs: [
      { q: 'Should real estate ads in Bangalore be in Kannada?', a: 'Worth split-testing everywhere and most reliably worthwhile in West Bangalore and outside the central IT corridors. The gain usually shows up as reach and cost per lead rather than as a higher conversion rate.' },
      { q: 'Should I put the price in the ad?', a: 'In a price-sensitive catchment like West Bangalore, usually yes. It reduces lead volume and improves nearly every downstream number, because enquiries that would have failed the budget criterion never enter the funnel.' },
      { q: 'What targeting works best in West Bangalore?', a: 'Tight radius targeting around the project. The buyer is genuinely local and frequently purchasing within a few kilometres of where they already live, so a geographic ring outperforms a city-wide demographic profile.' },
    ],
  },

  {
    slug: 'south-bangalore',
    h1: 'Real estate marketing in South Bangalore',
    blurb: 'The most contested auction in the city, and the most mixed demand.',
    title: 'South Bangalore Real Estate Marketing | QDnCo',
    desc: 'Marketing residential projects in South Bangalore: mixed premium and mid-market demand, the most competitive ad auction in the city, and how to segment it.',
    mins: 5,
    corridors: 'Kanakapura Road · JP Nagar · Bannerghatta Road · Jayanagar · Electronic City fringe · Uttarahalli',
    keywords: ['South Bangalore real estate marketing', 'Kanakapura Road property ads', 'Bannerghatta Road real estate'],
    lede: 'South Bangalore is the hardest catchment in the city to run a single campaign for, because it is not one market — established premium and outward-expanding mid-market sit inside the same geography and buy nothing alike.',
    proof: null,
    body: [
      {
        id: 'buyer', h2: 'Two buyers in one catchment',
        html: 'The established south — Jayanagar, JP Nagar and their surrounds — is old-money, premium, extremely locality-loyal and small in volume. The expanding south along Kanakapura Road and towards Electronic City is mid-market, price-led and high in volume.|||Running these as one campaign is the characteristic mistake here. The premium buyer is repelled by value messaging, the mid-market buyer is priced out by premium messaging, and a combined campaign optimises towards whichever fills forms more readily — which is the mid-market — while reporting a healthy cost per lead to a developer selling premium inventory.',
      },
      {
        id: 'argument', h2: 'The argument that works, per segment',
        html: 'For the established south: locality permanence, build quality and the specific address. This buyer is not being sold on a corridor; they have chosen the corridor and are evaluating a building within it.|||For the expanding south: price, connectivity to Electronic City and the southern employment belt, and possession timeline. Closer in character to East Bangalore than to the premium pockets a few kilometres away.',
      },
      {
        id: 'auction', h2: 'Why leads cost what they do here',
        html: 'This is the most contested auction in the city — the largest number of simultaneous advertisers addressing overlapping audiences, across the widest range of ticket sizes. Cost per lead is volatile and can exceed the ₹350–₹500 band during heavy launch periods.|||The practical defence is narrowness. Broad targeting in South Bangalore competes with everyone; a tightly drawn segment with a specific argument competes with far fewer advertisers for a much more relevant audience, and prices better despite the smaller pool.',
      },
      {
        id: 'language', h2: 'Language and targeting notes',
        html: 'Mixed, and it splits along the same line as everything else here. The established south is comfortably bilingual with strong Kannada resonance; the expanding south skews closer to the transient, English-dominant profile of the tech corridors.|||A single language strategy across the catchment will be wrong for one half of it. This is one of the few places where running two language treatments is worth the added campaign complexity.',
      },
    ],
    faqs: [
      { q: 'Why is South Bangalore expensive to advertise in?', a: 'It carries the largest number of simultaneous advertisers across the widest range of ticket sizes, so the auction is the most contested in the city. Narrow, specifically argued targeting prices better than broad targeting despite reaching fewer people.' },
      { q: 'Can one campaign cover all of South Bangalore?', a: 'It should not. Established premium pockets and the outward-expanding mid-market buy nothing alike, and a combined campaign drifts towards whichever segment fills forms more readily while reporting a healthy cost per lead.' },
    ],
  },

  {
    slug: 'mysore',
    h1: 'Real estate marketing in Mysore',
    blurb: 'Half the cost per lead, a slower cycle, and a plot-led market.',
    title: 'Mysore Real Estate Marketing — Plots and Residential | QDnCo',
    desc: 'Marketing property in Mysore: roughly half the Bangalore cost per lead, plot-dominant demand, and why trust signals outperform lifestyle creative here.',
    mins: 5,
    corridors: 'Mysore city · Ring Road corridors · Bogadi · Hunsur Road · Nanjangud Road · Bangalore–Mysore expressway belt',
    keywords: ['Mysore real estate marketing', 'Mysore plot marketing', 'Tier-2 Karnataka property ads'],
    lede: 'Mysore is our delivered second market and the clearest cost arbitrage available in Karnataka — with a slower sales cycle attached that most people quoting the cost advantage leave out.',
    proof: 'Delivered cost per lead in Mysore and Tier-2 Karnataka has run at <strong>roughly half the Bangalore level</strong>, because the auction is far less contested. We publish this as a ratio rather than an absolute because it moves with ticket size.',
    body: [
      {
        id: 'buyer', h2: 'Who is actually buying',
        html: 'Three groups that need separating. Local end users buying to build. Bangalore-based buyers acquiring land as an appreciation play against the expressway. And returning or retiring buyers with family roots in the region.|||The second group is reachable from Bangalore and behaves like an investor; the first two are local and behave like end users. They justify different campaigns, and the Bangalore-based investor pool is the one most often missed because the geography targeting is drawn around Mysore.',
      },
      {
        id: 'argument', h2: 'Trust, not lifestyle',
        html: 'Plot buyers here convert on clear title, approvals, boundary clarity and documentation far more than on rendered lifestyle imagery. The creative that wins in Bangalore apartment marketing frequently underperforms in this market for exactly that reason.|||Anything that reduces perceived transaction risk — approval status, survey clarity, plot dimensions, what is legally established rather than planned — outperforms aspiration. This is a market where the honest, document-led advertisement is also the better-performing one.',
      },
      {
        id: 'arbitrage', h2: 'The cost advantage, stated honestly',
        html: 'Roughly half the Bangalore cost per lead, against a slower sales cycle and a smaller absolute audience. Half the cost per lead with double the time to booking is not an improvement in cost per booking, and the arbitrage is only real for a project that can carry the longer cycle.|||More of the decision also happens offline and in person here than in Bangalore, which means the handover from marketing to sales matters more and a purely digital funnel will underperform its lead numbers.',
      },
      {
        id: 'evidence', h2: 'What the observed spend says',
        html: "Our August ad snapshot includes plot and land advertising, but the retained buy-side set mixes geographies. It does not establish Karnataka-specific demand or profitability.|||Use local enquiry and sales evidence to validate the catchment. Public ad references can inform what to test; their recorded ages cannot prove which offers will sell.",
      },
    ],
    faqs: [
      { q: 'Are real estate leads cheaper in Mysore than Bangalore?', a: 'Yes, roughly half, because the ad auction is far less contested. The sales cycle is also slower and more of the decision happens in person, so the advantage in cost per booking is smaller than the cost-per-lead figure suggests.' },
      { q: 'What works in Mysore plot marketing?', a: 'Trust signals — clear title, approval status, boundary and survey clarity, documentation. Plot buyers here convert on reduced transaction risk far more than on lifestyle imagery, so the document-led advertisement is also the better-performing one.' },
      { q: 'Should Mysore projects target Bangalore buyers?', a: 'Often yes, as a separate campaign. Bangalore-based buyers acquiring land against the expressway behave like investors and are missed entirely when geography targeting is drawn tightly around Mysore.' },
    ],
  },

  {
    slug: 'karnataka-tier-2',
    h1: 'Real estate marketing in Tier-2 Karnataka',
    blurb: 'Where the arbitrage is real and where the data runs out.',
    title: 'Tier-2 Karnataka Real Estate Marketing | QDnCo',
    desc: 'Marketing property in Tier-2 Karnataka beyond Bangalore and Mysore: what transfers from the metro playbook, what does not, and what we do not have data on.',
    mins: 4,
    corridors: 'Tumkur · Hassan · Mandya · Ramanagara · Chikkaballapur · Doddaballapur · the expressway and highway belts',
    keywords: ['Tier-2 Karnataka real estate marketing', 'Tumkur property marketing', 'small city real estate ads India'],
    lede: 'Tier-2 Karnataka is a genuine opportunity and the catchment where we have the least data, so this page is shorter than the others and says where the edges are.',
    proof: null,
    body: [
      {
        id: 'transfers', h2: 'What transfers from the metro playbook',
        html: 'The mechanics do. Funnel structure, the separation of channel-partner and end-buyer pools, the qualified-lead definition, the CRM feedback loop and the budget floor all behave the same way, because they are properties of the platforms and of sales physics rather than of the city.|||The trust-led creative approach that works in Mysore transfers well across the region, and for the same reason: these are predominantly plot and land markets where the buyer is assessing transaction risk.',
      },
      {
        id: 'does-not', h2: 'What does not transfer',
        html: "Audience size, relevance and expected event volume affect test design. A narrow catchment may produce limited reach or rising frequency; those observations need to be read alongside qualification and sales outcomes.|||Do not expand the geography merely to accumulate platform events. Broaden only when evidence supports an additional buyer catchment, then track those enquiries separately.",
      },
      {
        id: 'honest', h2: 'What we do not know',
        html: 'We have not sized the developer population across Tier-2 Karnataka, and our market model explicitly leaves it out — the Bangalore figure is bottom-up and the Tier-2 addition is unsized. The cost arbitrage is documented from delivered work; the market depth behind it is not.|||So this page does not carry a benchmark, and any agency quoting you a confident Tier-2 cost per lead across the region generally is quoting a number they cannot support. The honest answer is that it is cheaper than Bangalore and that a specific project needs a specific read.',
      },
    ],
    faqs: [
      { q: 'Does real estate marketing work in smaller Karnataka cities?', a: 'It needs a locally validated offer, relevant catchment and a test proportionate to the reachable audience. Limited event volume can restrict conclusions; it does not by itself prove the market will or will not work.' },
      { q: 'What is the cost per lead in Tier-2 Karnataka?', a: 'Cheaper than Bangalore — delivered work in Mysore and Tier-2 has run at roughly half — but we do not publish a regional benchmark, because the sample does not support one. Anyone quoting a confident figure across the whole region is quoting a number they cannot support.' },
    ],
  },
]
