/**
 * Comparison pages.
 *
 * "X vs Y" is the highest-intent shape a buying question takes, and it is the
 * shape an assistant most often answers with a table. It is also the shape most
 * agencies refuse to write honestly, because an honest comparison has to
 * concede cases where the other option wins.
 *
 * The rule here: every page must contain at least one row where the alternative
 * beats us, stated plainly and without a recovery clause. A comparison with no
 * losing row is an advertisement, it reads as one, and an engine weighting
 * sources for balance will discount it accordingly. Conceding the real cases is
 * both the honest thing and the thing that makes the rest of the page credible.
 *
 * `verdict` is the liftable summary — written so it survives being quoted with
 * no surrounding page, including the concession.
 */

export const HUB = {
  title: 'Comparisons — How to Buy Real Estate Marketing | QDnCo',
  h1: 'Honest comparisons, including where we lose',
  desc: 'Straight comparisons for developers: performance marketing vs channel partners, per-lead vs retainer, in-house vs agency, and buying leads vs generating them.',
  lede: 'Each page compares two real options a developer chooses between, with the cases where the other one wins stated plainly. If a comparison never concedes anything it is an advertisement, and you should read it as one.',
}

export const COMPARISONS = [
  {
    slug: 'performance-marketing-vs-channel-partner',
    a: 'Performance marketing',
    b: 'Channel partner',
    h1: 'Performance marketing vs channel partners',
    blurb: 'Different instruments. Most developers should run both.',
    title: 'Performance Marketing vs Channel Partners | QDnCo',
    desc: 'Cost, risk and control compared for developers choosing between paid acquisition and channel partner commission — including when the partner is the better buy.',
    mins: 6,
    keywords: ['channel partner vs agency', 'real estate commission vs marketing', 'property marketing cost comparison'],
    lede: 'These are not competing versions of the same thing, which is why the usual comparison is dishonest in both directions. A channel partner sells you an accompanied, half-decided buyer. Performance marketing sells you reach you own and can measure. The question is not which is cheaper but which constraint you are actually trying to relieve.',
    verdict: 'Channel partners cost more per booking — typically 1–3% of unit value, so ₹2,00,000 on a ₹1 crore unit — but carry no upfront risk and deliver an accompanied, pre-qualified buyer. Performance marketing costs money before anything sells and is substantially cheaper per booking once the funnel works, but only if you have a sales team that can work leads inside 48 hours. If you do not have that team, the channel partner is the better buy and no amount of cheaper leads will change that.',
    table: {
      head: ['', 'Performance marketing', 'Channel partner'],
      rows: [
        ['When you pay', 'Before results, continuously', 'On a closed sale only'],
        ['Typical cost', 'Fee per campaign (see the calculator) + media, client-funded', '1–3% of unit value'],
        ['Cost on a ₹1 Cr unit', '~₹40,000 media + fee at 100 leads/booking', '~₹2,00,000 at 2%'],
        ['Who carries the risk', 'You, upfront', 'Them, until it closes'],
        ['Buyer arrives', 'As an enquiry needing qualification', 'Accompanied, often near-decided'],
        ['Needs an in-house sales team', 'Yes — non-negotiable', 'No'],
        ['Do you keep the asset', 'Yes — account, pixel, audiences, data', 'No'],
        ['Scales by', 'Budget and creative', 'Relationships and commission'],
      ],
    },
    body: [
      {
        id: 'where-partner-wins', h2: 'Where the channel partner genuinely wins',
        html: 'Three cases, and they are common ones.|||LIST:<strong>You have no sales team.</strong> Qualified leads decay in hours. A developer without people to call them is buying a list, and buying a list is how the money disappears with nothing to show. The partner brings their own follow-up.;;<strong>You need certainty of cost.</strong> Commission is a known percentage of a completed sale. Media is a committed spend against an uncertain outcome. If your project cannot tolerate a month of spend that produces nothing bookable, the partner is the correct instrument.;;<strong>The buyer network is closed to advertising.</strong> Some segments — NRI, HNI, specific community networks — transact on relationships that no amount of Meta budget reaches. Partners have access you cannot buy.|||None of these is recoverable by running better campaigns, which is why they are stated without a rebuttal.',
      },
      {
        id: 'where-performance-wins', h2: 'Where performance marketing wins',
        html: 'LIST:<strong>Cost per booking at volume.</strong> Once the funnel works, the arithmetic is not close. Commission scales linearly with units sold; media does not.;;<strong>You keep what you build.</strong> The ad account, its spend history, the pixel and the audiences are assets that make the next launch cheaper. A commission buys one transaction and leaves nothing behind.;;<strong>You can see what is happening.</strong> Partner performance is opaque until a booking appears. Campaign performance is visible daily, which means it is correctable daily.;;<strong>It is not exclusive.</strong> Advertising reaches buyers no partner has a relationship with, which is most of the market for most projects.',
      },
      {
        id: 'both', h2: 'Running both without paying twice',
        html: 'Most developers should run both, and most who do eventually have an attribution fight. A partner introduces a buyer who first saw your Meta ad, both channels claim the booking, and one of them gets paid for work the other did.|||Settle it before launch, in writing: a documented introduction window, with the CRM first-touch record as the tiebreak. It takes an afternoon to agree and it is impossible to agree fairly once there is a specific commission on the table.',
      },
    ],
    faqs: [
      { q: 'Is a channel partner cheaper than a marketing agency?', a: 'Per booking, usually not — 1–3% of unit value is ₹2,00,000 on a ₹1 crore unit, against roughly ₹40,000 of media plus fee at a ₹400 cost per lead and 100 leads per booking. But the partner carries the risk and delivers an accompanied buyer, so the comparison only holds if you have a sales team able to work leads inside 48 hours.' },
      { q: 'Can I use both channel partners and paid advertising?', a: 'Yes, and most developers should. Agree the attribution rule in writing before launch — a documented introduction window with a CRM first-touch tiebreak — because it cannot be agreed fairly once a specific commission is in dispute.' },
      { q: 'What commission do channel partners charge in Bangalore?', a: 'Typically 1–3% of unit value, paid on a closed sale. The rate moves with inventory pressure, ticket size and how much of the sales process the partner is carrying.' },
    ],
    related: ['cpql-vs-retainer-agency', 'buying-leads-vs-generating-them'],
  },

  {
    slug: 'cpql-vs-retainer-agency',
    a: 'Pay per qualified lead',
    b: 'Monthly retainer',
    h1: 'Paying per qualified lead vs paying a retainer',
    blurb: 'Which one you need depends on where your funnel actually breaks.',
    title: 'Cost Per Qualified Lead vs Retainer Agency | QDnCo',
    desc: 'Per-lead pricing against a monthly retainer for real estate marketing: what each buys, what each hides, and which fits a broken funnel versus a thin one.',
    mins: 6,
    keywords: ['CPQL vs retainer', 'real estate agency pricing model', 'pay per lead real estate'],
    lede: 'The instinct is that per-lead pricing is safer because it is tied to an outcome. That is true only when the outcome is defined, and it is the wrong model entirely when your problem is downstream of the lead.',
    verdict: 'Pay per qualified lead if your sales process already works and the top of the funnel is thin — you are buying volume against a written definition and moving acquisition risk onto the agency. Take a retainer if leads arrive and then rot: if nobody calls inside 48 hours, or you cannot state your cost per site visit, buying more leads makes the loss bigger, not smaller. Per-lead pricing with no written definition of "qualified" is worse than a retainer, because it looks accountable while being unmeasurable.',
    table: {
      head: ['', 'Per qualified lead', 'Retainer'],
      rows: [
        ['You pay for', 'A delivered unit', 'Scope and time'],
        ['Typical price', 'Fee per campaign, falling with campaign count', 'One fee agreed in writing'],
        ['Risk sits with', 'The agency', 'You'],
        ['Requires a written definition', 'Absolutely — or it means nothing', 'Helpful, not structural'],
        ['Covers funnel and CRM work', 'No', 'Yes'],
        ['Incentive risk', 'Volume over quality, if undefined', 'Activity over outcome'],
        ['Best when', 'Sales works, leads are thin', 'Leads arrive and are wasted'],
        ['Worst when', '"Qualified" is undefined', 'Nobody checks the output'],
      ],
    },
    body: [
      {
        id: 'failure-modes', h2: 'Each model has a characteristic failure',
        html: 'They are opposites, and knowing which one you are exposed to matters more than the price.|||<strong>Per-lead fails towards volume.</strong> If the unit is not defined tightly, the cheapest way to deliver more units is to loosen the targeting. The invoice goes up, the sales team gets busier, and nothing books. This is the single most common bad experience developers report in this category, and it is a definitional failure rather than a dishonesty one.|||<strong>Retainer fails towards activity.</strong> A fixed fee for a broad scope rewards visible effort — reports, meetings, decks — over outcomes nobody is measuring. It fails slowly and politely, which is why it can run for two quarters before anyone calls it.',
      },
      {
        id: 'diagnostic', h2: 'A two-question diagnostic',
        html: 'LIST:<strong>What is your median time to first call?</strong> If you cannot answer, or the answer is over 24 hours, your problem is not lead volume and per-lead pricing will not help you.;;<strong>What is your cost per site visit?</strong> If you cannot answer, nothing past the form fill is being measured, and buying more form fills is buying more of something you cannot evaluate.|||Two "cannot answer"s means take the retainer and fix the funnel. Two confident answers means buy leads — you have earned the right to treat acquisition as the constraint.',
      },
      {
        id: 'hybrid', h2: 'The sequence most developers actually need',
        html: 'Retainer first for a quarter to build the funnel, the routing, the CRM feedback loop and the reporting. Then move to per-lead once there is a working machine for leads to enter.|||Doing it in the other order — buying volume into an unbuilt funnel — is the most expensive ordering available, and it is the one the market defaults to because volume is easier to sell than plumbing.',
      },
    ],
    faqs: [
      { q: 'Is pay-per-lead better than a retainer for real estate?', a: 'Only if your sales process already works and "qualified" is defined in writing. If leads currently arrive and go unworked, a retainer that fixes the funnel is worth more than cheaper leads entering a broken one.' },
      { q: 'What is a fair price per qualified lead in India?', a: 'QDnCo prices Meta/Google campaigns per campaign, with the fee falling as campaign count rises and a written qualified-lead definition. See the calculator: https://qdnco.com/tools/marketing-cost-calculator.html' },
      { q: 'What is the risk with per-lead pricing?', a: 'That "qualified" is undefined, so the cheapest way for the agency to deliver more units is to loosen targeting. The protection is a written, testable definition and a replacement guarantee with a short flag window.' },
    ],
    related: ['performance-marketing-vs-channel-partner', 'in-house-vs-agency-real-estate'],
  },

  {
    slug: 'buying-leads-vs-generating-them',
    a: 'Buying leads from a reseller',
    b: 'Generating your own',
    h1: 'Buying leads vs generating your own',
    blurb: 'Why resold leads are cheap, and what the price is actually for.',
    title: 'Buying Real Estate Leads vs Generating Them | QDnCo',
    desc: 'Why resold property leads are cheap and convert badly, when buying them still makes sense, and what generating your own actually costs.',
    mins: 5,
    keywords: ['buy real estate leads', 'lead reseller', 'property lead generation India'],
    lede: 'Resold leads are the cheapest per unit and the most expensive per booking, and the reason is structural rather than a matter of supplier quality.',
    verdict: 'A resold lead is cheap because it is not exclusive — the same enquiry is typically sold to several developers, so you are competing for a buyer who is being called by your competitors on the same afternoon. Generating your own costs more per lead and produces a lead nobody else has, plus an ad account and audience data you keep. Buying resold leads is defensible only as a short-term fill for idle sales capacity, never as an acquisition strategy.',
    table: {
      head: ['', 'Resold leads', 'Own generation'],
      rows: [
        ['Cost per lead', 'Low — often ₹100–₹300', '₹350–₹500 in Bangalore residential'],
        ['Exclusive to you', 'Usually not', 'Yes'],
        ['Intent for your project', 'Generic category intent', 'Project-specific'],
        ['Contact rate', 'Poor — already called by others', 'Materially better'],
        ['Do you keep any asset', 'No', 'Account, pixel, audiences, creative'],
        ['Compliance control', 'None — you did not write the ad', 'Full'],
        ['Improves over time', 'No', 'Yes, as the pixel learns'],
      ],
    },
    body: [
      {
        id: 'why-cheap', h2: 'Why the price is low',
        html: 'Because the same lead is sold more than once. A reseller generates a generic enquiry — "apartments in Bangalore" rather than an enquiry about your project — and monetises it by selling it to several buyers. Your ₹200 is a share of a lead, not a lead.|||The buyer on the other end experiences this as four sales calls in one day from four projects they did not specifically ask about. Contact rates and tolerance are correspondingly poor, and none of that is fixable by calling faster.',
      },
      {
        id: 'compliance', h2: 'The compliance exposure nobody mentions',
        html: 'You did not write the advertisement that generated a resold lead, you cannot see it, and you generally cannot get it. If it made claims about pricing, approvals or amenities that your project cannot support, the enquiry arriving in your CRM came from a promise you did not make and cannot honour.|||Under RERA the promoter carries advertising liability. An arrangement where a third party advertises into your category and hands you the resulting enquiries is one where you have accepted the downstream of an advertisement you never approved.',
      },
      {
        id: 'when-ok', h2: 'When buying them is defensible',
        html: 'One case: you have idle sales capacity this month and no campaign running. Cheap leads keep a team in practice and occasionally produce a booking, and the alternative is people sitting still.|||Treat it as filling time, not as acquisition. The moment it becomes the plan, you are funding a competitor\'s lead generation and receiving the leftovers.',
      },
    ],
    faqs: [
      { q: 'Are bought real estate leads worth it?', a: 'Rarely as a strategy. They are cheap because they are non-exclusive — the same enquiry is typically sold to several developers — so contact and conversion rates are poor. They are defensible only as a short-term fill for idle sales capacity.' },
      { q: 'Why are resold property leads so cheap?', a: 'Because the cost is shared across several buyers of the same lead. You are purchasing a share of a generic category enquiry, not an exclusive enquiry about your project.' },
      { q: 'What is the compliance risk with bought leads?', a: 'You never see the advertisement that produced them. If it made claims your project cannot support, you are working enquiries generated by a promise you did not make — while, as promoter, carrying the advertising liability under RERA.' },
    ],
    related: ['performance-marketing-vs-channel-partner', 'cpql-vs-retainer-agency'],
  },

  {
    slug: 'in-house-vs-agency-real-estate',
    a: 'In-house team',
    b: 'External agency',
    h1: 'Building an in-house marketing team vs hiring an agency',
    blurb: 'The break-even is launches per year, not salary.',
    title: 'In-House vs Agency for Real Estate Marketing | QDnCo',
    desc: 'When a developer should hire in-house marketing versus using an agency, what the real break-even is, and the hybrid split that usually works better than either.',
    mins: 5,
    keywords: ['in-house vs agency marketing', 'real estate marketing team', 'hire performance marketer'],
    lede: 'The comparison is usually run on salary against retainer, which is the wrong axis. The question is whether you have enough continuous work to keep a specialist sharp.',
    verdict: 'Below roughly three concurrent launches, an agency is cheaper and better, because a specialist without continuous work stops being a specialist and learns on your budget. Above that, in-house starts to win on cost and on responsiveness. The hybrid beats both in most cases: one in-house owner holding the CRM, the sales interface and the reporting, with media buying and creative production run externally.',
    table: {
      head: ['', 'In-house', 'Agency'],
      rows: [
        ['Fixed cost', 'Salary, continuous', 'Fee, pausable between launches'],
        ['Ramp time', 'Months, including hiring', 'Weeks'],
        ['Breadth of pattern exposure', 'Your projects only', 'Many accounts and catchments'],
        ['Availability', 'Immediate, full attention', 'Shared across clients'],
        ['Knows your sales team', 'Yes — the decisive advantage', 'Only through you'],
        ['Continuity when someone leaves', 'Poor — knowledge walks out', 'Better, if documented'],
        ['Break-even', 'Roughly 3+ concurrent launches', 'Below that'],
      ],
    },
    body: [
      {
        id: 'real-cost', h2: 'The cost comparison people get wrong',
        html: 'A competent performance marketer in Bangalore costs meaningfully more per year than most specialist agency retainers, and salary is the smaller half of the number. Add tooling, creative production, the months before they are productive, and the budget they will spend learning your category.|||The honest version is that in-house is not cheaper at low volume. It is better at high volume, which is a different claim.',
      },
      {
        id: 'hybrid', h2: 'The split that usually works',
        html: 'One in-house owner, external execution. The in-house role holds the parts that cannot be outsourced — the CRM, the relationship with the sales team, and the authority to make them call leads inside 48 hours. Nobody outside your company can chase your own salespeople, and that chase is worth more than any optimisation.|||External handles media buying and creative production, which benefit from seeing many accounts and which do not require sitting in your office.',
      },
      {
        id: 'failure', h2: 'The failure mode is identical in both directions',
        html: 'A marketing hire with no authority over sales follow-up, or an agency with no counterpart inside the business who owns the outcome. Both produce the same result: leads arrive, nobody is accountable for what happens next, and by the time anyone looks the launch window has closed.|||If you take one thing from this comparison, make it this — the appointment that matters is not who buys the media, it is who owns the number.',
      },
    ],
    faqs: [
      { q: 'Should a developer hire an in-house marketing team?', a: 'Above roughly three concurrent launches, yes. Below that, a specialist lacks the continuous work to stay sharp and will learn on your budget, so an agency is both cheaper and better.' },
      { q: 'What is the best hybrid model?', a: 'One in-house owner holding the CRM, the sales-team relationship and the reporting, with media buying and creative production external. The in-house part is the part nobody outside the company can do.' },
    ],
    related: ['cpql-vs-retainer-agency', 'performance-marketing-vs-channel-partner'],
  },

  {
    slug: 'ai-creative-volume-vs-studio-production',
    a: 'AI-generated static creative',
    b: 'Studio production',
    h1: 'AI creative volume vs studio production',
    blurb: 'What each is for, and the line we do not cross with either.',
    title: 'AI Ad Creative vs Studio Production for Real Estate | QDnCo',
    desc: 'Where AI-generated ad creative beats studio production for real estate testing, where studio is the only honest option, and the RERA line that governs both.',
    mins: 5,
    keywords: ['AI ad creative real estate', 'studio production vs AI', 'real estate ad creative volume'],
    lede: 'This is not a quality argument. It is an argument about what the binding constraint on creative testing has always been, which is cost per asset.',
    verdict: 'AI-generated statics win on concepting, layout and the volume that real testing requires — bringing the marginal cost of a concept near zero changes which tests are worth running at all. Studio production wins, and is the only honest option, for anything depicting the actual property: the building, the elevation, the amenities, the view. Under RERA the promoter carries liability for what an advertisement depicts, so the project itself is photographed or rendered from approved plans, never generated.',
    table: {
      head: ['', 'AI static creative', 'Studio production'],
      rows: [
        ['Marginal cost per concept', 'Near zero', 'High'],
        ['Turnaround', 'Hours', 'Weeks'],
        ['Good for', 'Concept testing, layout, refresh on fatigue', 'The property itself'],
        ['May depict the building', 'No — never', 'Yes'],
        ['RERA exposure', 'High if misused', 'Controlled'],
        ['Included in the fee', '15 statics/month', 'Quoted separately'],
        ['Improves with iteration', 'Yes, cheaply', 'Yes, expensively'],
      ],
    },
    body: [
      {
        id: 'constraint', h2: 'What actually changes',
        html: 'At studio rates, running six distinct concepts through three refresh cycles is a budget line most launches refuse. So campaigns run tired creative and blame the audience, and the refresh happens when a change order clears rather than when the numbers say so.|||Dropping the marginal cost changes which tests are affordable. The advantage is operational — more shots on goal, taken at the right moment — and it shows up in the account rather than in the artwork.',
      },
      {
        id: 'line', h2: 'The line, stated plainly',
        html: 'No AI-generated imagery of the project, the elevation, the amenities or the view. Layout, typography, background treatment, lifestyle context, copy — all fine. The building — never.|||This is not caution for its own sake. Under RERA the promoter carries liability for what the advertisement depicts, and "the tool generated it" is not a defence anyone has successfully run. A generated image of a building that does not exist as depicted is a misrepresentation risk sitting on the developer, not on the agency that produced it.',
      },
      {
        id: 'together', h2: 'How they actually work together',
        html: 'Test the argument cheaply, then produce the winner properly. Use generated statics to find which concept the market responds to — price, location, amenity, urgency, proof — across a real test with enough cells to kill a loser.|||Then commission the studio against the concept that won, with approved photography of the actual asset. That sequencing spends the production budget on a known answer instead of on a guess, which is the whole benefit.',
      },
    ],
    faqs: [
      { q: 'Can I use AI-generated images in real estate ads?', a: 'For layout, typography, background and lifestyle context, yes. For the building, elevation, amenities or view, no — under RERA the promoter carries liability for what an advertisement depicts, and a generated image of the property is a misrepresentation risk.' },
      { q: 'How many creatives should a launch test?', a: 'Four to six distinct concepts, each with a few variations. Concepts are different arguments, not different crops — twenty variations of one message is a single bet, not a test.' },
      { q: 'Is AI creative included in the fee?', a: 'Yes, fifteen static AI creatives a month, refreshed on fatigue with no per-creative surcharge. Studio production is quoted separately through partner studios and approved before commission.' },
    ],
    related: ['cpql-vs-retainer-agency', 'in-house-vs-agency-real-estate'],
  },
]
