/** Published commercial terms; prices and schema derive from the same object. */

export const PRICING = {
  slug: 'index',
  title: 'Pricing — Real Estate Marketing, Published | QDnCo',
  h1: 'What this costs, published',
  desc: 'Compare QDnCo real estate marketing fees: qualified-lead pricing, monthly retainers and a paid market diagnostic. Client-funded media is separate.',
  eyebrow: 'Pricing',
  mins: 5,
  keywords: [
    'real estate marketing agency pricing',
    'cost per qualified lead pricing',
    'real estate marketing cost Bangalore',
    'performance marketing agency price India',
  ],
  lede: "Published fees help you assess fit before a sales call. Compare the service scope, qualification definition, media billing and exclusions alongside the headline price. Our ad snapshot does not establish that competitors lack published prices.",

  facts: [
    { v: 'Per campaign', k: 'fee falls as campaign count rises' },
    { v: 'Media separate', k: 'paid by you directly to Meta and Google' },
    { v: 'Calculator', k: 'your monthly fee after a 20-second sign-up' },
    { v: '5 criteria', k: 'written definition of a qualified lead' },
  ],

  /* Each door is a real Offer. `price` and `priceRange` feed schema directly. */
  doors: [
    {
      id: 'phase-0',
      name: 'Phase 0 — the market read',
      price: 'Scoped in writing',
      priceLow: null,
      priceHigh: null,
      unit: 'one-off, 2–3 weeks',
      lede: 'A paid diagnostic that runs before any advertising money is committed.',
      includes: [
        'Primary interviews with your actual buyer',
        'Addressable demand and catchment analysis',
        'Competitor scrape — Meta Ad Library and Google Ads Transparency, with run durations',
        'Pricing position and unit economics',
        'A study of what has already worked or failed for your brand',
        'Campaign architecture with a budget floor',
      ],
      note: 'This is the only one of the three that can end with us telling you not to spend. That is what you are paying for — research given away as pre-sales has exactly one permitted conclusion, and it is not "no".',
      forWhom: 'Anyone not yet certain the demand is there. Also the standard way to start if you already have an agency you are happy with — the brief is yours and they can execute against it.',
    },
    {
      id: 'cpql',
      name: 'Performance — per qualified lead',
      price: 'Priced per campaign',
      priceLow: null,
      priceHigh: null,
      unit: 'per qualified lead · 60/month minimum',
      lede: 'You pay for leads that meet a written five-part definition, and nothing else.',
      includes: [
        'Fee per campaign by campaign count: see the cost calculator',
        'Campaign management across Meta and Google',
        '15 static AI creatives per month, refreshed on fatigue, no per-creative surcharge',
        'Weekly review — spend, cost per qualified lead, quality rate, scaling decision',
        'Free replacement of any lead failing the definition, flagged within 7 days',
      ],
      note: 'Media is funded by you, directly to Meta and Google, from your own ad account. It is never billed through us and never marked up. The account, its history, its pixel and its audiences stay yours if we stop working together.',
      forWhom: 'Developers whose sales process already works and whose constraint is the top of the funnel. Requires an in-house team able to work leads inside 48 hours — without one, this is the wrong purchase.',
    },
    {
      id: 'retainer',
      name: 'Partnership — retainer and upside',
      price: 'Agreed in writing',
      priceLow: null,
      priceHigh: null,
      unit: 'per month + 8% of media + 2% upside',
      lede: 'For launches where the constraint is the system around the leads, not the number of them.',
      includes: [
        'Everything in the research gate, run continuously rather than once',
        'Full funnel build — routing, CRM, alerts, status model',
        'Feedback loop from CRM back to the ad platforms',
        'Included AI creatives and ongoing test design',
        'Sales-pipeline alignment and weekly dashboard',
        '2% on units sold above a threshold written before the engagement starts',
      ],
      note: 'The upside threshold is set from your own historical run-rate, so it only triggers on performance the campaign can be argued to have caused.',
      forWhom: 'Developers whose leads arrive and then rot — nobody calling inside 48 hours, no answer to "what is your cost per site visit". Buying more leads into that makes the loss bigger.',
    },
    {
      id: 'studio',
      name: 'Studio package',
      price: 'Quoted per project',
      priceLow: null,
      priceHigh: null,
      unit: 'separate quote',
      lede: 'Photo and video production, drone, UGC and IGC, motion graphics.',
      includes: [
        'Commissioned through partner studios',
        'Scoped and approved by you before anything is commissioned',
        'Used for the property itself, which is never AI-generated',
      ],
      note: 'Deliberately outside the fee rather than bundled into it. Bundling production into a retainer means you pay for it whether or not the campaign needs it, and it is the line item most often used to pad an agency invoice.',
      forWhom: 'Any project past the concept-testing stage that needs approved imagery of the actual asset.',
    },
  ],

  sections: [
    {
      id: 'floor',
      h2: "The working media minimum and the test plan",
      html: "Our published working media minimum is approximately ₹1,00,000 per month, separate from fees. This is an engagement-planning policy, not a universal platform requirement.|||Set the test budget from the objective, expected event cost, number of comparisons, duration and acceptable risk. Budget alone does not establish that tracking is correct, leads are qualified or a campaign is commercially successful.|||If a proposed test is too broad for the available budget, consider a narrower question or a different first step. Confirm the scope and spending cap in writing before launch.",
    },
    {
      id: 'media',
      h2: 'Media is yours, always',
      html: 'You pay Meta and Google directly from your own ad account. We never fund media and rebill it, and we never take a margin on it.|||This is the single most important commercial term on the page. When an agency funds media and rebills, three things become unverifiable at once: what was actually spent, what the platform actually charged, and what sits between them. Nearly every dispute in this category eventually reduces to that opacity.|||The 8% of media in the retainer model is a management fee on spend you can see, not a markup buried inside it.',
    },
    {
      id: 'compare',
      h2: 'How this compares to the alternatives',
      html: "TABLE:Route|Commercial basis to confirm|Delivery questions;;Channel partner|Commission and triggering event in the agreement|Who handles the buyer, visit and booking?;;Retainer agency|Monthly fee plus stated exclusions|What deliverables, reporting and account access are included?;;Percentage of media|Disclosed management percentage|What decisions govern increasing or reducing spend?;;Purchased leads|Per-record price, consent and exclusivity terms|Is the enquiry current, relevant and lawfully usable?;;QDnCo. CPQL|Published lead fee plus client-funded media|Does each accepted lead meet the written criteria?|||Compare written scope, ownership, lead definitions and total costs. The payment model alone does not establish an agency’s quality or incentives in practice.",
    },
    {
      id: 'no',
      h2: 'When we will say no',
      html: 'LIST:The project is not RERA-registered or in the process of registering. Section 3(1) bars advertising an unregistered project, and this is a hard gate rather than a preference.;;Media budget below the ~₹1,00,000/month floor.;;No in-house sales team able to work leads inside 48 hours. Qualified leads decay; without a team to work them you are buying a list.;;Outside Bangalore, Mysore and Karnataka Tier-2, where we have no catchment knowledge and therefore no edge.;;Capacity is full. The practice runs roughly one partnership plus three or four performance engagements at a time, so sometimes the honest answer is a date rather than a yes.',
    },
  ],

  faqs: [
    { q: 'How much does QDnCo charge?', a: 'QDnCo prices Meta/Google ad campaigns by the number of campaigns or projects and the agreed service scope. Media spend is separate and paid directly to the ad platforms. SEO, AI search visibility, landing pages and CRM automation are quoted separately. See your monthly fee in the marketing cost calculator: https://qdnco.com/tools/marketing-cost-calculator.html' },
    { q: 'Is media included in the fee?', a: 'No. You fund Meta and Google directly from your own ad account. The fee is separate and is the only money that comes to us — which means the platform invoice and the spend history are yours to audit and yours to keep.' },
    { q: 'What is the minimum to get started?', a: 'The published working media minimum is approximately ₹1,00,000 per month, plus fees. This is our engagement-planning policy, not a minimum imposed universally by Meta or Google. Confirm a project-specific scope and test budget before launch.' },
    { q: 'Are ad creatives an extra cost?', a: 'No. Fifteen static AI creatives a month are included in the performance fee, refreshed on fatigue with no per-creative surcharge. Studio production — shoots, drone, UGC, motion graphics — is quoted separately and approved before commission.' },
    { q: 'Do you charge for the first conversation?', a: 'No. Phase 0 is a paid engagement, but the conversation that establishes whether Phase 0 is the right thing to buy is not. It is a questionnaire rather than a pitch, and it can end with us saying the project is not a fit.' },
    { q: 'Why do you publish prices?', a: 'So a developer can assess commercial fit before a sales call. Compare the published scope and exclusions, and confirm the applicable terms in writing. We do not claim that other agencies never publish prices.' },
  ],
}
