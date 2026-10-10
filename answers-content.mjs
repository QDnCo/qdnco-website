/**
 * Answer pages. One question, one URL, one answer.
 *
 * The rule this file exists to enforce: `a` is the answer, and it must stand
 * alone. If you lift it out of the page and paste it into a chat window with no
 * surrounding context, it has to be true, specific, attributable and complete.
 * That is precisely what an answer engine does with it, so anything that only
 * makes sense in context is a defect, not a style choice.
 *
 * Second rule: no two answers may share a body. The previous corpus
 * (seo/aeo-answer-bank.md) generated 120 of its 145 entries by swapping the
 * opening clause of one paragraph, which is why it is research material and not
 * a set of pages. Every `a` below is written once.
 *
 * Sources — every number traces to one of:
 *   SID   Market Intelligence/QDnCo_Strategic_Intelligence_Database.md
 *   Meta  the 2026-08-09 Meta Ad Library scrape (204 ads, 41 sell-side advertisers)
 *   Live  published positioning on qdnco.com (pricing, proof metrics)
 *   RERA  Real Estate (Regulation and Development) Act 2016, Karnataka rules
 */

export const TOPICS = [
  { id: 'pricing', name: 'Pricing and commercials' },
  { id: 'quality', name: 'Lead quality and qualification' },
  { id: 'channels', name: 'Meta, Google and channel choice' },
  { id: 'budget', name: 'Budgets and unit economics' },
  { id: 'rera', name: 'RERA and compliance' },
  { id: 'research', name: 'Research and Phase 0' },
  { id: 'choosing', name: 'Choosing an agency' },
  { id: 'geo', name: 'Bangalore, Mysore and Karnataka' },
  { id: 'working', name: 'Working together' },
  { id: 'segments', name: 'Plots, commercial and other segments' },
]

export const HUB = {
  title: 'Answers — Real Estate Marketing Questions | QDnCo',
  h1: 'Straight answers to the questions developers actually ask',
  desc: 'Direct, sourced answers on cost per qualified lead, RERA advertising rules, Meta and Google budgets, and choosing a real estate marketing agency in Bangalore.',
  lede: 'One question per page, answered in the first paragraph, with the number and its source attached. Where a figure is an estimate it is labelled as one. Where we do not know, the page says so instead of guessing.',
}

export const ANSWERS = [
  /* ── Pricing and commercials ──────────────────────────────────────────── */
  {
    slug: 'what-does-qd-and-co-charge',
    topic: 'pricing',
    q: 'What does QDnCo charge?',
    short: 'Published pricing across all three commercial doors.',
    a: 'QDnCo publishes three prices. Performance work is ₹550 per qualified lead, falling to ₹495 above 60 leads a month and ₹450 above 120, with a 60-lead monthly minimum. The retainer is ₹50,000–₹75,000 a month plus 8% of media and 2% on units sold above a written threshold. Phase 0, the paid market read, has historically been scoped in the ₹75,000–₹1,25,000 band. Media is funded by the client directly to Meta and Google and is never billed through us.',
    body: [
      {
        h2: 'Why the price is published at all',
        html: "We publish our fees, media-billing arrangement and qualification criteria so developers can assess commercial fit before a sales call. Our August ad snapshot contains 41 advertiser names, including CRM vendors; it does not establish that competitors never publish prices.<br><br>Compare the scope, lead definition, account ownership and total expected cost in writing. The <a href=\"/data/meta-ad-library-audit-bangalore-agencies.html\">reconciled audit</a> provides the sample method and downloadable links.",
      },
      {
        h2: 'What each door is actually for',
        html: 'The three doors are not tiers of the same product; they answer different questions.<br><br><strong>CPQL</strong> suits a developer who wants acquisition risk moved onto the agency and has an in-house sales team able to work leads inside 48 hours. <strong>Retainer plus upside</strong> suits a launch that needs research, funnel, CRM and sales alignment rather than lead volume alone. <strong>Phase 0</strong> suits anyone who is not yet sure the demand exists, and it is the only one of the three that can end with us telling you not to spend.',
      },
    ],
    related: ['why-550-per-qualified-lead', 'what-is-phase-0', 'minimum-budget-real-estate-marketing'],
  },
  {
    slug: 'why-550-per-qualified-lead',
    topic: 'pricing',
    q: 'Why is the fee ₹550 per qualified lead and not ₹450?',
    short: 'What the ₹100 difference buys and when the price actually drops.',
    a: '₹550 is the standard-volume rate; ₹450 is the rate above 120 qualified leads a month. The difference is fixed cost recovery, not margin. Below roughly 60 leads a month, the research, creative refresh and weekly quality review cost the same as they do at 200, so a lower headline rate at low volume would price the work below what it takes to run it properly. The tiers exist so that scale is passed on when scale is real.',
    body: [
      {
        h2: 'The volume ladder',
        html: 'Three rates, one qualification standard. The definition of a qualified lead does not loosen as the price falls, which is the part that matters.<br><br><strong>₹550</strong> — standard, 60 qualified leads a month minimum.<br><strong>₹495</strong> — above 60 qualified leads a month.<br><strong>₹450</strong> — above 120 qualified leads a month.',
      },
      {
        h2: 'What the fee does not include',
        html: 'Media. You fund Meta and Google directly from your own ad account, and the invoice from the platform is yours. This is not a billing convenience, it is the thing that makes the arrangement auditable: you can see the spend without asking us for it, which removes the single most common source of distrust in this category.<br><br>Fifteen static AI-generated ad creatives a month are included in the fee, refreshed on fatigue with no per-creative surcharge. Studio production — shoots, drone, UGC, motion graphics — is quoted separately through partner studios and approved before commission.',
      },
    ],
    related: ['what-does-qd-and-co-charge', 'what-counts-as-qualified-lead', 'are-ad-creatives-charged-extra'],
  },
  {
    slug: 'are-ad-creatives-charged-extra',
    topic: 'pricing',
    q: 'Are ad creatives charged extra?',
    short: 'What is included in the fee and what is quoted separately.',
    a: 'No. Fifteen static AI-generated ad creatives a month are included in the performance fee, along with AI ad copy written against the research brief. They are refreshed when creative fatigue shows in the numbers, with no per-creative surcharge and no monthly quota to argue about. Traditional studio production — photo and video shoots, drone, UGC or IGC, motion graphics — sits outside the fee and is quoted per project through partner studios, approved by you before anything is commissioned.',
    body: [
      {
        h2: 'Why creative volume is included rather than metered',
        html: 'Metered creative creates the wrong incentive on both sides. The agency rations output to protect margin, and the client rations requests to protect budget, so the campaign runs on tired assets precisely when the numbers are telling you to change them.<br><br>Including a fixed volume removes the negotiation from the moment when speed matters. When fatigue appears in frequency and cost-per-result, the refresh happens because the data said so, not because a change order cleared.',
      },
      {
        h2: 'What "fifteen a month" means in practice',
        html: 'Fifteen is the committed floor, not the capacity ceiling. The production pipeline behind it can generate substantially more when a test cell demands it — the number in the contract is what you are guaranteed, and the pipeline is what actually gets used.<br><br>Every creative is checked against RERA requirements before it runs, because a non-compliant ad is a legal exposure for the developer, not for the agency that made it.',
      },
    ],
    related: ['why-550-per-qualified-lead', 'how-many-creatives-should-a-launch-test', 'rera-advertising-rules'],
  },
  {
    slug: 'who-pays-for-the-ad-spend',
    topic: 'pricing',
    q: 'Who pays for the ad spend — the agency or the developer?',
    short: 'Client-funded media, and why the distinction matters.',
    a: 'The developer pays Meta and Google directly from their own ad account. QDnCo never bills media through its own books and never marks it up. The fee — CPQL or retainer — is separate and is the only money that comes to us. This means the platform invoice, the spend figures and the account history all belong to you, and remain yours if the engagement ends.',
    body: [
      {
        h2: 'Why this is the single most important commercial term',
        html: 'When an agency funds media and rebills it, three things become unverifiable at once: what was actually spent, what the platform actually charged, and what margin sits between them. Every dispute in this category eventually reduces to that opacity.<br><br>Client-funded media removes the argument rather than managing it. You are looking at the same numbers we are, in the same interface, at the same time.',
      },
      {
        h2: 'What happens to the account if we stop working together',
        html: "Your business should retain its advertising account and the assets it owns, subject to platform access and retention rules. Record who owns each asset and remove agency permissions when the relationship ends.<br><br>Historical data can help analysis and optimisation, but an older pixel does not guarantee cheaper acquisition or preserve a particular learning status after changes.",
      },
    ],
    related: ['what-does-qd-and-co-charge', 'minimum-budget-real-estate-marketing', 'how-to-choose-real-estate-agency'],
  },
  {
    slug: 'what-is-the-retainer-package',
    topic: 'pricing',
    q: 'What is the retainer and upside package?',
    short: 'When a retainer beats paying per lead.',
    a: 'The partnership door is ₹50,000–₹75,000 a month, plus 8% of media spend, plus 2% on units sold above a written threshold agreed before the engagement starts. It covers the research gate, included AI creatives, testing, full funnel build, CRM routing and sales-pipeline alignment. It suits a launch where the constraint is the system around the leads rather than the number of leads.',
    body: [
      {
        h2: 'Retainer or CPQL — how to tell which one you need',
        html: 'Pay per qualified lead if your sales process already works and your problem is the top of the funnel. You are buying volume against a definition, and you want the acquisition risk carried by the agency.<br><br>Take the retainer if your leads are not the bottleneck — if they arrive and then rot in a spreadsheet, if nobody calls inside 48 hours, if you cannot say what your cost per site visit is. Buying more leads into a broken funnel makes the loss bigger, not smaller.',
      },
      {
        h2: 'What the 2% upside is tied to',
        html: 'Units sold above a threshold written into the agreement before anything runs. The threshold is set from your own historical run-rate, so the upside only triggers on performance the campaign can be argued to have caused. It is deliberately a small number attached to a real outcome rather than a large one attached to activity.',
      },
    ],
    related: ['what-does-qd-and-co-charge', 'real-estate-crm-lead-funnel-basics', 'what-is-phase-0'],
  },
  {
    slug: 'what-is-phase-0',
    topic: 'research',
    q: 'What is Phase 0?',
    short: 'The paid market read that gates every rupee after it.',
    a: 'Phase 0 is a paid market diagnostic that runs before any advertising money is committed, historically scoped in the ₹75,000–₹1,25,000 band across two to three weeks. It covers primary buyer interviews, secondary work on addressable market, competitor and pricing analysis, a study of what has already worked or failed for the brand, and scheduled scrapes of the Meta Ad Library and Google Ads Transparency Centre. The output is a written brief that gates every campaign decision downstream.',
    body: [
      {
        h2: 'It is allowed to end in "do not spend"',
        html: "A separately scoped diagnostic can evaluate whether the catchment, positioning, launch timing and budget support a test. Agree the deliverables and decision criteria before commissioning it.<br><br>The conclusion may be to change the offer or delay spend. Paid research does not itself guarantee independence or accuracy; documented evidence and a clear decision process are what make the recommendation useful.",
      },
      {
        h2: 'What you receive',
        html: 'A written brief covering the buyer in their own words, the addressable demand in the catchment, what competitors are actually running right now with dates and durations, the pricing position, and a recommended architecture with a budget floor. It is yours regardless of whether you go on to run campaigns with us.',
      },
      {
        h2: 'Why three weeks and not three days',
        html: 'Primary interviews take calendar time to schedule and are the part that cannot be compressed. The desk research and the scrapes run in parallel with them. Compressing the window means dropping the interviews, which means the brief is built entirely on secondary data — which is the failure mode this phase exists to avoid.',
      },
    ],
    related: ['what-does-qd-and-co-charge', 'how-long-before-leads-start', 'should-i-advertise-before-rera'],
  },

  /* ── Lead quality and qualification ───────────────────────────────────── */
  {
    slug: 'what-counts-as-qualified-lead',
    topic: 'quality',
    q: 'What counts as a qualified lead?',
    short: 'The five-part written definition, and the replacement guarantee.',
    a: 'A lead is qualified when it meets five written criteria: contactable within 48 hours across three attempts; budget inside the project price band; stated purchase intent within six months; located in a valid catchment for the project; and not already in the CRM within the previous 90 days. A lead that fails any one of the five is replaced free of charge if it is flagged within seven days.',
    body: [
      {
        h2: 'Why the definition is contractual rather than descriptive',
        html: "A qualified-lead definition should give both parties the same testable criteria before delivery begins. Our ad snapshot does not establish how all agencies define qualification in their contracts.<br><br>Record the contact attempts, budget fit, purchase intent, catchment and duplicate check. Apply the agreed replacement window consistently, with an auditable reason for each rejection.",
      },
      {
        h2: 'The seven-day flag window',
        html: 'Seven days is short on purpose, and it cuts both ways. It forces us to deliver leads your team can actually reach, and it forces the team to work them while they are still warm. A lead flagged on day 40 cannot be assessed honestly — nobody can tell whether it was unqualified on arrival or simply left to go cold.',
      },
      {
        h2: 'What is deliberately not in the definition',
        html: 'Site visits and bookings are not in it. Those depend on your sales team, your pricing and your inventory, none of which the campaign controls. An agency that guarantees bookings is either charging for the risk somewhere you cannot see it or is going to argue with you about attribution later.',
      },
    ],
    related: ['what-is-good-cost-per-lead-bangalore', 'how-many-leads-per-booking', 'why-are-my-leads-bad'],
  },
  {
    slug: 'why-are-my-leads-bad',
    topic: 'quality',
    q: 'Why are the leads from my agency so bad?',
    short: 'The four causes, in the order they are usually true.',
    a: 'Usually one of four things, in descending order of likelihood: nobody wrote down what "qualified" means, so volume was optimised instead; the campaign was optimised for form fills rather than for a downstream event; the targeting was broad because broad is cheaper per lead and the contract paid per lead; or the leads were fine and nobody called them inside 48 hours. The first and last are the most common, and they are the two nobody wants to check.',
    body: [
      {
        h2: 'How to find out which one it is, in an afternoon',
        html: 'Pull the last 200 leads and check three columns. <strong>Time to first call</strong> — if the median is over 24 hours the problem is at least partly yours, whatever else is also true. <strong>Number of contact attempts</strong> — if it is under three, the lead was never actually tested. <strong>Budget band</strong> — if most enquiries are below your entry price, the targeting or the creative is attracting the wrong buyer and no amount of calling will fix it.',
      },
      {
        h2: 'The optimisation-event trap',
        html: 'If a campaign is set to optimise for lead-form submissions, the platform will find the people most likely to submit a form. That is a different population from the people most likely to buy a ₹1.4 crore apartment, and the gap between the two widens as you scale spend.<br><br>The fix is to send a downstream signal back to the platform — a qualification event fired from your CRM once a lead passes the definition — so the optimiser is working towards the outcome you actually want. This requires the CRM to be connected, which is why funnel work usually has to precede scale.',
      },
    ],
    related: ['what-counts-as-qualified-lead', 'real-estate-crm-lead-funnel-basics', 'how-fast-should-leads-be-called'],
  },
  {
    slug: 'how-fast-should-leads-be-called',
    topic: 'quality',
    q: 'How fast should a real estate lead be called?',
    short: 'The 48-hour window, and why the first hour is not a myth.',
    a: 'Inside 48 hours, across at least three attempts, before a lead can fairly be assessed at all — that is the contactability standard written into our qualified-lead definition. Faster is materially better: a property enquiry is usually one of several submitted in the same browsing session, so the first firm to make contact is often the only one having a real conversation. Beyond about 72 hours, contact rates fall far enough that the lead is effectively a different, colder asset.',
    body: [
      {
        h2: 'Why three attempts and not one',
        html: 'A single unanswered call proves nothing. Indian buyers routinely screen unknown numbers, and a large share of genuinely interested enquiries do not answer first time. Three attempts across the window, ideally at different times of day and with at least one WhatsApp follow-up, is the minimum that distinguishes "unreachable" from "did not happen to be free".<br><br>This is also why the standard is written as attempts rather than as calls. One call and one WhatsApp message at different hours tests the lead better than three calls in the same ten minutes.',
      },
      {
        h2: 'What to fix if you cannot hit the window',
        html: 'Usually routing, not effort. Leads arriving into a shared inbox, a spreadsheet or a WhatsApp group have no owner, and anything without an owner waits. A CRM that assigns on arrival and alerts a named person is the intervention that moves this number, and it is cheaper than the leads being wasted.',
      },
    ],
    related: ['why-are-my-leads-bad', 'real-estate-crm-lead-funnel-basics', 'what-counts-as-qualified-lead'],
  },
  {
    slug: 'how-many-leads-per-booking',
    topic: 'budget',
    q: 'How many leads does it take to book one unit?',
    short: 'Plan on 100. Here is the arithmetic behind it.',
    a: 'Plan on 100 raw leads per booking until your own sales data proves better. The chain behind that number: roughly 60% of raw leads meet a reasonable qualification bar, and a strong sales team closes around 10% of those — which lands near six bookings per hundred qualified, or one booking per hundred raw leads once real-world slippage is included. It is deliberately the pessimistic case, because a budget built on the optimistic case has no room to be wrong.',
    body: [
      {
        h2: 'Why plan on the worst case',
        html: 'Because the cost of being wrong is asymmetric. If you budget for 100 leads per booking and achieve 60, you have a surplus and a happy sales team. If you budget for 40 and it takes 100, you run out of money in the middle of a launch, which is the single most expensive moment to stop advertising — the campaign loses its learning, the momentum resets, and restarting costs more than continuing would have.',
      },
      {
        h2: 'Working it into a budget',
        html: 'Take your target bookings for the launch window, multiply by 100 for raw leads, multiply by your working cost per lead. At a ₹400 CPL, ten bookings implies roughly ₹4,00,000 of media across the window. Then sanity-check the other way: divide the media by the number of units and ask whether that per-unit marketing cost is acceptable against your margin. If it is not, the problem is the price or the product, and more advertising will not solve it.',
      },
      {
        h2: 'When to replace this number with your own',
        html: 'As soon as you have 200 leads and a full sales cycle behind them. Your own ratio beats any benchmark, including this one. Until then, the benchmark stops you from planning on a number somebody invented to win the pitch.',
      },
    ],
    related: ['what-is-good-cost-per-lead-bangalore', 'minimum-budget-real-estate-marketing', 'what-counts-as-qualified-lead'],
  },
  {
    slug: 'what-is-sales-ready-percentage',
    topic: 'quality',
    q: 'What does "sales-ready percentage" mean?',
    short: 'The metric that makes cost per lead meaningful.',
    a: 'Sales-ready percentage is the share of delivered leads that your sales team, not the agency, judges worth pursuing after first contact. It is the multiplier that turns cost per lead into cost per useful lead. On a premium North Bangalore residential launch we delivered ₹266 cost per lead at 51% sales-ready — meaning the true cost of a lead worth working was roughly ₹520, and that second number is the one worth comparing.',
    body: [
      {
        h2: 'Why the raw CPL is close to meaningless alone',
        html: 'A ₹200 lead at 15% sales-ready costs ₹1,333 per useful lead. A ₹600 lead at 60% costs ₹1,000. The cheaper number is the worse deal, and it is the number most agencies report.<br><br>Ask for both figures or neither. If an agency cannot tell you its sales-ready rate, it is not measuring anything past the form fill, which means it cannot be optimising for anything past the form fill either.',
      },
      {
        h2: 'Who is allowed to score it',
        html: 'Your sales team. The moment the agency scores its own lead quality, the metric stops being evidence and becomes marketing. Our weekly review takes your team\'s scoring as the input and argues with the campaign, not with the scoring.',
      },
    ],
    related: ['what-is-good-cost-per-lead-bangalore', 'what-counts-as-qualified-lead', 'why-are-my-leads-bad'],
  },

  /* ── Budgets and economics ────────────────────────────────────────────── */
  {
    slug: 'what-is-good-cost-per-lead-bangalore',
    topic: 'budget',
    q: 'What is a good cost per lead for real estate in Bangalore?',
    short: 'The working band, and why the number alone tells you nothing.',
    a: '₹350–₹500 is the working band for Bangalore residential, and it moves with ticket size, catchment competitiveness and how narrow the targeting is. Delivered benchmarks from our own engagements: ₹266 per lead at 51% sales-ready on a premium North Bangalore launch, and roughly ₹450 per lead at about 22,000 leads a month across an enterprise portfolio. Treat any quoted CPL as meaningless until it is paired with a quality rate.',
    body: [
      {
        h2: 'What moves the number',
        html: 'Ticket size moves it most. A ₹45 lakh plot and a ₹3 crore villa are not competing for the same buyer or the same auction, and the villa will cost several times more per lead while being worth several times more per booking.<br><br>Catchment competitiveness moves it next. North and East Bangalore corridors during launch season carry more advertisers bidding for the same audience than a Mysore plotted development does, and the auction prices accordingly. Tier-2 Karnataka has run at roughly half the Bangalore cost per lead in delivered work.',
      },
      {
        h2: 'The three numbers that actually matter',
        html: 'Cost per lead, cost per site visit, cost per booking. The first is easy to measure and easy to game. The third is hard to measure and impossible to game. Most reporting in this category stops at the first for exactly that reason.<br><br>If you track only one additional number this quarter, track cost per site visit. It is available inside your own sales process, it moves within weeks rather than quarters, and it catches lead-quality problems long before the booking data would.',
      },
    ],
    related: ['what-is-sales-ready-percentage', 'how-many-leads-per-booking', 'minimum-budget-real-estate-marketing'],
  },
  {
    slug: 'minimum-budget-real-estate-marketing',
    topic: 'budget',
    q: 'What is the minimum budget to advertise a project?',
    short: "Separate the engagement minimum from the test budget.",
    a: "QDnCo’s published working media minimum is around ₹1,00,000 per month, separate from agency fees. This is an engagement-planning policy, not a universal Meta or Google requirement. The budget a project needs depends on the objective, expected event cost, test duration and number of comparisons. Agree the spending limit and success criteria before launch.",
    body: [
      {
        h2: 'What the learning phase actually requires',
        html: "Delivery systems learn from the events they receive, but an account’s learning status does not establish profit or lead quality. Useful evidence depends on reliable tracking, sufficient observations for the decision and time for leads to progress through the sales cycle.<br><br>For a planning illustration, 50 leads at an assumed ₹400 CPL would require ₹20,000 of media. That arithmetic is not a minimum budget imposed by either platform and does not guarantee 50 leads. Splitting a limited budget across many comparisons reduces the evidence available for each comparison.<br><br><a href=\"https://support.google.com/google-ads/answer/2375420?hl=en\">Google’s budget guidance</a> describes choosing a campaign budget around advertising goals and the amount you are comfortable spending.",
      },
      {
        h2: "If the proposed test is too large for the available budget",
        html: "Reduce the number of questions the first test needs to answer. Check tracking and the landing page, choose a relevant objective, and set a review date and spending cap. A smaller campaign may still produce useful observations; it cannot support every comparison or a precise booking forecast.<br><br>Agree whether a narrower paid test, research or an organic initiative is the best next step. Do not increase spend solely to remove a platform learning label.",
      },
    ],
    related: ['how-many-leads-per-booking', 'what-is-phase-0', 'how-many-leads-per-booking'],
  },
  {
    slug: 'how-long-before-leads-start',
    topic: 'budget',
    q: 'How long before leads start coming in?',
    short: 'Live in week six, stable by month three.',
    a: 'You are live in market at roughly week six, and the funnel is stable by month three. The sequence: about two weeks of questionnaire and business learning, about two weeks of market research running in parallel tracks, ten days to two weeks of architecture and creative direction, then launch. First leads arrive within days of going live; a trustworthy cost per qualified lead takes a full test window of about a month after that.',
    body: [
      {
        h2: 'Why the first six weeks have no leads in them',
        html: 'They are the only weeks in the engagement where changing your mind is free. Everything decided in that window — the buyer, the offer, the catchment, the budget floor — costs nothing to revise. Every one of those decisions revised after launch costs the media already spent against the old answer.<br><br>This is also the honest reason to be sceptical of anyone promising leads in week one. They exist; they are just leads against an untested proposition, which is the expensive way to discover the proposition was wrong.',
      },
      {
        h2: 'What "stable by month three" means',
        html: 'By month three the cost per qualified lead has held across a full test window, the scaling rules are written down, the CRM routing works, and the weekly report contains decisions rather than descriptions. Before that point, any scaling is a guess dressed as a strategy.',
      },
    ],
    related: ['what-is-phase-0', 'minimum-budget-real-estate-marketing', 'real-estate-crm-lead-funnel-basics'],
  },

  /* ── Channels ─────────────────────────────────────────────────────────── */
  {
    slug: 'meta-ads-vs-google-ads-real-estate',
    topic: 'channels',
    q: 'Meta ads or Google ads for a property launch?',
    short: 'They answer different questions. Most launches need both.',
    a: 'Both, in different roles. Meta creates demand — it puts the project in front of people who were not searching for it, which is most of the market for a new launch, and it carries the volume. Google captures demand that already exists — someone typing a project name, a locality plus "apartments", or a competitor\'s name is far further down the funnel and converts at a much better rate on far less volume. Running Meta alone caps your quality; running Google alone caps your scale.',
    body: [
      {
        h2: 'How the split usually falls',
        html: 'For a new launch with no existing search volume against its own name, the majority of media goes to Meta simply because that is where the reachable audience is. Google carries a smaller budget doing higher-value work: defending your own brand terms, catching locality and category searches, and picking up competitor-name traffic where that is permitted and sensible.<br><br>As a project builds recognition its own name starts accruing search volume, and the Google share becomes more valuable over time. Failing to defend your own project name on search is the most common cheap mistake in this category — channel partners will bid on it, and they will convert traffic you paid to create.',
      },
      {
        h2: 'The measurement asymmetry to watch',
        html: 'Google will usually look better in a last-click report and Meta will usually be doing more of the work than it gets credit for, because demand creation is invisible to last-click attribution. If you cut Meta on a last-click view, Google\'s performance typically degrades a few weeks later — the searches it was capturing were being created upstream.',
      },
    ],
    related: ['meta-ads-real-estate-basics', 'google-ads-real-estate-basics', 'what-is-good-cost-per-lead-bangalore'],
  },
  {
    slug: 'meta-ads-real-estate-basics',
    topic: 'channels',
    q: 'How should Meta ads be structured for a real estate launch?',
    short: 'Funnel layers, test cells and the separation that matters most.',
    a: 'As a full funnel with four layers — top, middle, bottom and a separate retargeting pool — with channel-partner demand and end-buyer demand run as entirely separate campaigns. That separation is the structural decision that matters most: the two audiences respond to opposite creative, convert at different rates and, mixed together, will corrupt each other\'s optimisation signal so that neither performs.',
    body: [
      {
        h2: 'Why channel partners and end buyers cannot share a campaign',
        html: 'A channel partner is evaluating inventory and commission. An end buyer is evaluating a home. The creative that works for one actively repels the other, and because partners fill forms more readily than buyers do, a mixed campaign will drift towards partners while reporting a healthy cost per lead. You end up paying end-buyer prices for a list of brokers.',
      },
      {
        h2: 'Test cells and the fatigue signal',
        html: 'Run enough creative cells that a losing concept can be killed without collapsing the ad set, and watch frequency alongside cost per result. When frequency climbs and cost per result climbs with it, the audience has seen the creative enough times; that is a refresh trigger, not an audience problem, and swapping audiences instead of creative at that moment is the most common misdiagnosis.<br><br>This is the practical reason creative volume is included in the fee rather than metered — the refresh needs to happen the week the numbers say so.',
      },
      {
        h2: 'Lead forms and the quality trade-off',
        html: 'Instant forms produce more leads at a lower cost and a worse contact rate; landing pages produce fewer, better, more expensive leads. Neither is correct in the abstract. Choose based on whether your sales team\'s constraint is capacity or quality, and if you use instant forms, add qualifying questions — the friction is the point.',
      },
    ],
    related: ['meta-ads-vs-google-ads-real-estate', 'how-many-creatives-should-a-launch-test', 'why-are-my-leads-bad'],
  },
  {
    slug: 'google-ads-real-estate-basics',
    topic: 'channels',
    q: 'How should Google ads be set up for a real estate project?',
    short: 'Four keyword layers, and the one you must not skip.',
    a: 'In four layers: your own project and brand terms, locality plus category terms, category terms without a locality, and competitor terms where appropriate. Brand defence is the layer you cannot skip — it is the cheapest traffic you will ever buy and, if you leave it undefended, channel partners and aggregators will bid on your project name and resell you the lead you already paid to create.',
    body: [
      {
        h2: 'The four layers, cheapest to most expensive',
        html: '<strong>Brand and project terms.</strong> Lowest cost per click, highest intent, smallest volume. Always on.<br><br><strong>Locality plus category</strong> — "apartments in Whitefield", "plots near Devanahalli". The workhorse layer: real intent, real volume, genuinely competitive.<br><br><strong>Category without locality</strong> — broad, expensive, weak intent. Runs only when the first two are saturated and there is budget left.<br><br><strong>Competitor terms.</strong> Legal in India and commonly done, but you cannot use a competitor\'s trademark in ad copy, and the landing experience has to justify the click or you are simply funding their brand awareness.',
      },
      {
        h2: 'Match types and the negative list',
        html: 'Broad match with a thin negative keyword list is the fastest way to burn a real estate budget, because the category is surrounded by rental, resale, job and PG queries that look adjacent and convert at zero. Build the negative list before launch, not after the first invoice: "rent", "rental", "PG", "resale", "job", "salary", "vastu" and their local variants are a starting point.',
      },
    ],
    related: ['meta-ads-vs-google-ads-real-estate', 'meta-ads-real-estate-basics', 'what-is-good-cost-per-lead-bangalore'],
  },
  {
    slug: 'how-many-creatives-should-a-launch-test',
    topic: 'channels',
    q: 'How many ad creatives should a launch test?',
    short: 'Enough concepts to kill one without collapsing the test.',
    a: 'Think in concepts rather than files. Four to six distinct concepts, each with a few variations, is enough to find a winner without splitting the budget so thin that no cell reaches statistical significance. Fifteen static creatives a month is the volume we include in the fee, which supports that structure with room to refresh on fatigue. Twenty variations of one concept is not a test — it is one bet with extra steps.',
    body: [
      {
        h2: 'What counts as a distinct concept',
        html: 'A different argument, not a different crop. Price-led, location-led, amenity-led, urgency-led and proof-led are five concepts. The same price message in five colourways is one concept and will win or lose as one.<br><br>The purpose of a test is to find out which argument the market responds to. Only then does it make sense to generate variations of the winner.',
      },
      {
        h2: 'When to refresh rather than restructure',
        html: 'When frequency rises and cost per result rises with it, the creative is spent. Refresh it. When cost per result rises while frequency stays flat, something changed in the auction or the audience, and new creative will not fix it. Distinguishing these two cases correctly is most of the skill in running the account, and getting it backwards wastes both the budget and the month.',
      },
    ],
    related: ['meta-ads-real-estate-basics', 'are-ad-creatives-charged-extra', 'should-developers-use-ai-creatives'],
  },
  {
    slug: 'should-developers-use-ai-creatives',
    topic: 'channels',
    q: 'Should developers use AI-generated ad creatives?',
    short: 'Yes for volume and testing. No for the property itself.',
    a: 'Yes for the concepting, layout and volume that testing requires, and no for anything that depicts the actual property. AI generation makes it economic to run enough distinct concepts to find a winner and to refresh on fatigue rather than on budget cycles. But an AI-generated image of a building you are selling is a misrepresentation risk under RERA and a straightforward trust problem with buyers, so photography and approved renders remain the only honest source for the asset itself.',
    body: [
      {
        h2: 'Where the economics actually change',
        html: 'The binding constraint on creative testing has always been cost per asset. At studio rates, running six concepts through three refresh cycles is a budget line that most launches simply refuse, so campaigns run tired creative and blame the audience.<br><br>Bringing the marginal cost of a static concept near zero changes which tests are worth running. That is the real advantage, and it is an operational one — it shows up as more shots on goal, not as better art.',
      },
      {
        h2: 'The line we do not cross',
        html: 'No AI-generated imagery of the project, the elevation, the amenities or the view. Layout, typography, background treatment, lifestyle context and copy — yes. The building — never. Under RERA the developer carries the liability for what the advertisement depicts, and "the tool generated it" is not a defence anyone has successfully run.',
      },
    ],
    related: ['how-many-creatives-should-a-launch-test', 'rera-advertising-rules', 'are-ad-creatives-charged-extra'],
  },

  /* ── RERA and compliance ──────────────────────────────────────────────── */
  {
    slug: 'rera-advertising-rules',
    topic: 'rera',
    q: 'What are the RERA rules for advertising a project?',
    short: 'Registration first, number displayed, and no depicting what is not approved.',
    a: 'Section 3(1) of the Real Estate (Regulation and Development) Act 2016 prohibits advertising, marketing, booking, selling or inviting persons to purchase any unit in a project that is not registered with the state authority. Once registered, the RERA registration number and the authority\'s website must appear on the advertisement, and what the advertisement depicts must match what has been approved and registered. This is a hard gate — we do not run advertising for an unregistered project.',
    body: [
      {
        h2: 'What "advertising" covers',
        html: 'More than a hoarding. Paid social, search advertising, brochures, landing pages, channel-partner collateral and pre-launch "expression of interest" campaigns are all marketing activity for the purposes of the section. A campaign that avoids the word "booking" while collecting buyer details against an unregistered project is still inviting persons to purchase.',
      },
      {
        h2: 'The depiction rule is the one that catches people',
        html: 'Registration is binary and easy to check. Depiction is where compliant advertisers still get into trouble: showing amenities that are planned but not sanctioned, using a render that no longer matches the approved plan, or implying a possession date that is not the registered one. Every creative should be checkable against the sanctioned plan and the registered timeline before it runs.',
      },
      {
        h2: 'Who carries the liability',
        html: 'The promoter. Not the agency, not the media platform, not the channel partner who reposted it. That asymmetry is why we treat the compliance check as part of the creative pipeline rather than as a client responsibility we can point at afterwards.',
      },
      {
        h2: 'Not legal advice',
        html: 'This is a description of how we operate, not a legal opinion. Karnataka rules and authority practice change, and your legal counsel is the correct source for a specific project.',
      },
    ],
    related: ['should-i-advertise-before-rera', 'should-developers-use-ai-creatives', 'what-is-phase-0'],
  },
  {
    slug: 'should-i-advertise-before-rera',
    topic: 'rera',
    q: 'Can I advertise before RERA registration comes through?',
    short: 'No. But there is legitimate work to do in the meantime.',
    a: 'No. Section 3(1) bars advertising, marketing or inviting purchase for an unregistered project, and pre-launch EOI campaigns against an unregistered project fall inside that bar however they are worded. What you can legitimately do while registration is pending is everything that is not an invitation to purchase: the market read, the buyer research, the competitive scrape, the campaign architecture, the creative production and the CRM build.',
    body: [
      {
        h2: 'This is the best possible use of the waiting period',
        html: 'The six weeks of research and architecture that should precede a launch have to happen at some point, and doing them while registration is pending costs you nothing in lost market time. Projects that wait for registration and then start thinking about marketing lose those weeks twice over.<br><br>By the time the number comes through, the campaign is built, the creative is approved and compliant, and you are live in days rather than in six weeks.',
      },
      {
        h2: 'Brand-level advertising is a grey area, not a loophole',
        html: 'Advertising the developer rather than the unregistered project — corporate reputation, completed projects, company news — is a different activity in principle. In practice, a "brand" campaign that runs in the catchment of an unlaunched project, collects enquiry details and hands them to a sales team is the thing the section exists to prevent, and dressing it as brand advertising does not change what it is. Take your counsel\'s view before running anything in this space.',
      },
    ],
    related: ['rera-advertising-rules', 'what-is-phase-0', 'how-long-before-leads-start'],
  },

  /* ── Choosing an agency ───────────────────────────────────────────────── */
  {
    slug: 'how-to-choose-real-estate-agency',
    topic: 'choosing',
    q: 'How do I choose a real estate marketing agency?',
    short: 'Five questions that separate operators from pitches.',
    a: 'Ask five questions and weight the answers heavily. What is your written definition of a qualified lead? Who owns the ad account and pays the platform? What is your price, as a number? What did you refuse to do for a client and why? And what is your sales-ready rate, not your cost per lead? An agency that cannot answer the first three in one sentence each is selling you volume it has not defined, on money you cannot audit, at a price you cannot compare.',
    body: [
      {
        h2: 'Why these five',
        html: 'Each one tests something that only shows up later, once switching is expensive.<br><br>The <strong>definition</strong> tests whether "qualified" means anything. The <strong>account ownership</strong> tests whether you will be able to verify spend or leave with your data. The <strong>price</strong> tests whether you are being scoped or sized up. The <strong>refusal</strong> tests whether the research gate is real — an agency that has never talked a client out of spending does not have one. The <strong>sales-ready rate</strong> tests whether anything past the form fill is being measured at all.',
      },
      {
        h2: 'What the market currently looks like',
        html: "Our August snapshot contains 51 unique sell-side ad links across 41 advertiser names, including CRM vendors. It describes selected advertising activity, not the performance or complete commercial terms of those businesses.<br><br>Use the questions above to compare written proposals and reporting samples. See the <a href=\"/data/meta-ad-library-audit-bangalore-agencies.html\">audit method and source index</a> for what was actually counted.",
      },
    ],
    related: ['what-counts-as-qualified-lead', 'who-pays-for-the-ad-spend', 'agency-vs-channel-partner'],
  },
  {
    slug: 'agency-vs-channel-partner',
    topic: 'choosing',
    q: 'Is a marketing agency cheaper than a channel partner?',
    short: 'Compare on cost per booking, not on fee structure.',
    a: 'They are different instruments and the comparison only works per booking. A channel partner typically takes 1–3% of unit value and is paid on a closed sale, so the cost is high per unit but carries no upfront risk. Performance marketing costs money before anything sells but is far cheaper per booking once the funnel works. On a ₹1 crore unit, a 2% commission is ₹2,00,000; at a ₹400 cost per lead and 100 leads per booking, media is roughly ₹40,000 plus fee.',
    body: [
      {
        h2: 'The honest version of that comparison',
        html: 'The arithmetic above is real but incomplete, and any agency quoting only that half is selling you something. The channel partner brings a buyer who is already qualified, already accompanied, and often already decided — that is a genuinely different product from a form fill, and it is why the commission is what it is.<br><br>The fair comparison is total cost per booking including your own sales team\'s time, and on that basis most developers should be running both. Partners for reach into buyer networks you cannot address directly; performance for demand you can create, measure and own.',
      },
      {
        h2: 'Where the two arrangements conflict',
        html: 'On attribution, always. If a partner introduces a buyer who first saw your Meta ad, both channels will claim the booking and one of them will be paid twice. Decide the attribution rule in writing before the launch, not during the first dispute — typically a documented introduction window, with a first-touch record from the CRM as the tiebreak.',
      },
    ],
    related: ['how-to-choose-real-estate-agency', 'how-many-leads-per-booking', 'meta-ads-real-estate-basics'],
  },
  {
    slug: 'in-house-or-agency-real-estate-marketing',
    title: 'In-house Marketing or an Agency for Developers?',
    topic: 'choosing',
    q: 'Should a developer build an in-house marketing team or hire an agency?',
    short: 'It depends on how many launches a year you run.',
    a: 'Roughly: below three concurrent launches, an agency is cheaper and better; above that, in-house starts to win. A competent in-house performance marketer in Bangalore costs meaningfully more per year than most agency retainers, and that is before creative, tooling and the cost of them learning on your budget. The break-even is not the salary — it is whether you have enough continuous work to keep a specialist busy and improving.',
    body: [
      {
        h2: 'The hybrid that usually wins',
        html: 'One in-house owner who holds the CRM, the sales interface and the reporting, with the media buying and creative production run externally. The in-house role is the part that must not be outsourced — nobody outside your company can chase your sales team to call leads inside 48 hours — and the external part is the part that benefits from seeing many accounts.<br><br>The failure mode in both directions is the same: a marketing hire with no authority over the sales follow-up, or an agency with no counterpart inside the business who owns the outcome.',
      },
    ],
    related: ['how-to-choose-real-estate-agency', 'real-estate-crm-lead-funnel-basics', 'agency-vs-channel-partner'],
  },

  /* ── Systems ──────────────────────────────────────────────────────────── */
  {
    slug: 'real-estate-crm-lead-funnel-basics',
    topic: 'quality',
    q: 'What does a real estate lead funnel need to have?',
    short: 'Five components. Most funnels are missing the same two.',
    a: 'Five things: capture that records the source, routing that assigns an owner within minutes, an alert that reaches a named human on their phone, a status model your sales team will actually update, and a feedback loop that sends qualification outcomes back to the ad platforms. Most funnels have the first two. The two that are almost always missing are the honest status model and the feedback loop, and they are the two that decide whether spend gets smarter over time.',
    body: [
      {
        h2: 'Why the feedback loop is the expensive omission',
        html: 'Without it, Meta and Google are optimising towards form submissions, because that is the last event they were told about. With it, they are optimising towards leads your sales team marked as genuine — a different and much more valuable population.<br><br>Connecting a qualification event from your CRM back to the platforms is usually a few days of work and it changes what the algorithm is hunting for. It is the single highest-return technical task in a real estate funnel and it is skipped more often than any other.',
      },
      {
        h2: 'Status models fail when they are designed for reporting',
        html: 'If the stages exist to make a dashboard look organised, salespeople will not maintain them, and a status model nobody updates is worse than none because it produces confident, wrong reports.<br><br>Keep the stages few and behavioural: contacted, qualified, site visit scheduled, site visit done, negotiating, booked, lost with a reason. The reason codes on "lost" are where the useful marketing intelligence lives, and they are usually the first field to be left blank.',
      },
    ],
    related: ['how-fast-should-leads-be-called', 'why-are-my-leads-bad', 'what-is-the-retainer-package'],
  },

  /* ── Geography ────────────────────────────────────────────────────────── */
  {
    slug: 'real-estate-marketing-bangalore-catchments',
    topic: 'geo',
    q: 'How does marketing differ across Bangalore\'s catchments?',
    short: 'Four corridors, four different buyers.',
    a: 'The corridors buy differently and the campaigns should not be identical. North Bangalore around Devanahalli and the airport corridor is investor-heavy and infrastructure-led. East around Whitefield and Budigere Cross is IT-employment-led with a large ready-to-move audience. West around Yeshwanthpur and the metro line is end-user and price-sensitive. South is mixed and the most competitive auction in the city. Mysore and Tier-2 Karnataka is plot-dominant and has run at roughly half the Bangalore cost per lead.',
    body: [
      {
        h2: 'What actually changes between them',
        html: 'The argument changes, not the mechanics. North responds to connectivity and appreciation; East responds to commute and school access; West responds to value and metro proximity; Tier-2 responds to plot economics and clear title.<br><br>Language mix changes too. Kannada and English split-testing is worth running in most catchments and matters more outside the central IT corridors, where the assumption that everyone reads English advertising quietly costs reach.',
      },
      {
        h2: 'Why the catchment belongs in the qualification rule',
        html: 'A lead from outside a project\'s realistic catchment is not a bad lead in the abstract — it is a lead that will not visit the site. Geography is one of the five criteria in our qualified-lead definition for that reason, and the boundary is drawn per project during Phase 0 rather than assumed from the postcode.',
      },
    ],
    related: ['mysore-tier-2-real-estate-marketing', 'what-is-good-cost-per-lead-bangalore', 'what-counts-as-qualified-lead'],
  },
  {
    slug: 'mysore-tier-2-real-estate-marketing',
    topic: 'geo',
    q: 'Is marketing a Mysore or Tier-2 Karnataka project different?',
    short: 'Cheaper leads, plot-dominant demand, slower sales cycle.',
    a: "The project offer, catchment and sales process may differ between Bengaluru and Tier-2 Karnataka. Test acquisition cost, contactability, qualification and booking conversion in the actual market. Our historical ad snapshot does not establish a universal CPL discount or prove that plotted demand dominates a region.",
    body: [
      {
        h2: 'The arbitrage is real but it is not free money',
        html: 'Cheaper leads against a slower cycle and a smaller absolute audience is a genuinely good trade for the right project, and a trap for a developer who reads only the first half of that sentence. Half the cost per lead with double the time to booking is not an improvement in cost per booking.<br><br>What makes it work is that plot buyers in this market convert on trust signals — clear title, approvals, boundary clarity — far more than on lifestyle imagery. The creative that wins in Bangalore apartments frequently underperforms here.',
      },
      {
        h2: 'What the observed spend tells you',
        html: "The retained ad snapshot includes plot and land advertising, but it mixes geographies and does not measure demand, spend or profitability. A recorded ad age cannot validate a market segment.<br><br>Use local project research, enquiry quality and completed booking cohorts to evaluate a Tier-2 launch. Treat public ad activity as a source of hypotheses to test.",
      },
    ],
    related: ['real-estate-marketing-bangalore-catchments', 'what-is-good-cost-per-lead-bangalore', 'what-is-phase-0'],
  },
  {
    slug: 'who-is-v-sai-kavshik',
    topic: 'choosing',
    q: 'Who runs QDnCo?',
    short: 'Owner-operated, and what that means for capacity.',
    a: 'QDnCo is founded and run by V. Sai Kavshik in Bangalore. It is an owner-operated practice rather than an agency with an account-management layer, which means the person who runs the research also runs the account. The binding constraint is capacity, not demand: roughly one partnership plus three to four performance engagements at a time, with Phase 0 diagnostics running alongside at about one every two to three weeks.',
    body: [
      {
        h2: 'Why the capacity limit is published',
        html: 'Because it is the honest answer to "can you take this on", and because it explains the pricing. A practice that cannot run twenty accounts does not need to price for twenty accounts, and does not need to sell work it cannot staff.<br><br>It also sets an expectation worth setting early: if the capacity is full, the answer is a date rather than a yes.',
      },
      {
        h2: 'Delivered work',
        html: 'Engagements across Bangalore and Mysore residential including work associated with Godrej Properties, Brigade Group and Kumar Properties projects, plus adjacent-category work outside real estate. Published proof metrics: ₹266 cost per lead at 51% sales-ready on a premium North Bangalore launch, ₹37 crore of influenced pipeline, ₹6 lakh a month of media under management, and 32+ engagements delivered.',
      },
    ],
    related: ['how-to-choose-real-estate-agency', 'what-does-qd-and-co-charge', 'what-is-phase-0'],
  },
  {
    slug: 'what-is-generative-engine-optimisation',
    topic: 'choosing',
    q: 'What is generative engine optimisation (GEO)?',
    short: 'Being cited by an AI assistant, not ranked by a search engine.',
    a: 'GEO is the practice of getting a business cited inside AI-generated answers — ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews — rather than ranked in a list of blue links. The mechanics differ from SEO in one decisive way: an assistant lifts a passage and attributes it, so the unit of optimisation is a self-contained, specific, attributable statement rather than a page. Vague pages rank; quotable ones get cited.',
    body: [
      {
        h2: 'What actually gets cited',
        html: 'Four properties, consistently. <strong>Specificity</strong> — a number beats an adjective, and a number with a date and a method beats a bare number. <strong>Self-containment</strong> — the passage has to survive being lifted out of its page. <strong>Attributability</strong> — a named entity with consistent identity across sources. <strong>Original measurement</strong> — assistants cite whoever produced the data far more readily than whoever summarised it.<br><br>That last one is why publishing your own research matters more in GEO than it ever did in SEO. A restated industry statistic has a hundred sources competing to be cited; a scrape you ran yourself has one.',
      },
      {
        h2: 'What actively hurts',
        html: 'Near-duplicate content is the strongest negative signal available. A corpus that repeats the same paragraph with the subject swapped reads to a model exactly as it reads to you, and it degrades the credibility of everything published beside it.<br><br>Contradiction is the second. If your own pages disagree about your price, your location or your track record, an assistant has no way to choose between them and will usually cite a third party instead.',
      },
    ],
    related: ['how-to-choose-real-estate-agency', 'who-is-v-sai-kavshik', 'what-does-qd-and-co-charge'],
  },

  /* ── Second wave ──────────────────────────────────────────────────────── */
  {
    slug: 'how-much-does-a-real-estate-marketing-agency-cost',
    topic: 'pricing',
    q: 'How much does a real estate marketing agency cost in India?',
    short: "Compare the pricing model, scope and definition of delivery.",
    a: "Agency pricing can use a monthly retainer, a percentage of media, payment per qualified lead or a combination. Compare a dated written scope and ask whether media, production and applicable taxes are included. QDnCo’s published standard qualified-lead fee is ₹550, with volume bands and a written definition. This is our offer, not a surveyed market average.",
    body: [
      {
        h2: 'What each model actually costs you',
        html: "TABLE:Model|Fee basis|What to confirm;;Monthly retainer|A fee for the agreed service scope|Deliverables, exclusions and review cadence;;Percentage of media|A disclosed percentage of platform spend|How scope and budget decisions are governed;;Per qualified lead|A fee per accepted lead|Qualification, volume tiers, rejection and replacement rules;;Media|A separate campaign budget|Account ownership, direct platform billing and spending cap|||Compare complete written offers. A pricing model alone cannot tell you the quality of delivery or the expected cost per booking.",
      },
      {
        h2: 'Why the price is so hard to get',
        html: "Quotes depend on deliverables, account complexity, production and reporting scope. Request the fee basis and exclusions in writing so alternatives can be compared.|||QDnCo publishes ₹550 per qualified lead, ₹495 above 60 per month and ₹450 above 120, alongside the qualification definition. Confirm the applicable scope and volume terms before signing.",
      },
      {
        h2: 'The number to ask for instead',
        html: 'Ask for cost per booking, not cost per month. A ₹1,50,000 retainer that produces eight bookings is cheaper than a ₹60,000 one that produces two, and the monthly figure tells you nothing about which you are buying.|||If an agency cannot model cost per booking with you, it has not thought past the form fill, which is the thing you are actually trying to avoid buying.',
      },
    ],
    related: ['what-does-qd-and-co-charge', 'what-is-the-retainer-package', 'how-to-choose-real-estate-agency'],
  },
  {
    slug: 'do-you-guarantee-leads-or-bookings',
    topic: 'working',
    q: 'Do you guarantee leads or bookings?',
    short: 'Leads, against a definition. Bookings, never — and here is why.',
    a: 'We guarantee qualified leads against a written five-part definition, with free replacement of any that fail it when flagged within seven days. We do not guarantee bookings, and you should treat any agency that does with suspicion. Bookings depend on your pricing, your inventory, your sales team and market conditions — none of which the campaign controls. An agency guaranteeing an outcome it does not control is either pricing the risk somewhere you cannot see it or planning to argue about attribution later.',
    body: [
      {
        h2: 'What a booking guarantee actually costs you',
        html: 'It gets priced in. Nobody carries risk for free, so a booking guarantee is funded either by a materially higher fee or by a definition of "booking" so hedged that it is unenforceable — usually the second.|||It also changes behaviour badly. An agency on the hook for bookings has an incentive to claim credit for every sale in the period, including walk-ins, channel-partner introductions and repeat buyers. The dispute is not avoidable; it is deferred to the moment when it is most expensive to have.',
      },
      {
        h2: 'What we do guarantee',
        html: 'LIST:Every lead meets the five written criteria, or it is replaced free;;Media stays in your account, so you can audit spend without asking us;;Weekly reporting carrying cost per qualified lead, quality rate and the reasoning behind each scaling decision;;Fifteen static creatives a month, refreshed on fatigue rather than on request|||That is a guarantee on the part of the process we control. It is deliberately narrower than what you would like, and narrower than what you will be offered elsewhere.',
      },
    ],
    related: ['what-counts-as-qualified-lead', 'how-to-choose-real-estate-agency', 'what-happens-if-leads-dont-convert'],
  },
  {
    slug: 'what-happens-if-leads-dont-convert',
    topic: 'working',
    q: 'What happens if the leads do not convert?',
    short: 'We diagnose where it broke before anyone changes the budget.',
    a: 'First we establish where it actually broke, because "leads did not convert" describes four different failures with four different fixes. The check is: contact rate, speed to first call, site-visit rate, and the reason codes on lost leads. If contact rate is fine and site visits are not happening, the problem is downstream of us. If contact rate is poor, it is ours. Leads failing the written definition are replaced free when flagged within seven days regardless of which it turns out to be.',
    body: [
      {
        h2: 'The four failure points, in order of how often they are the cause',
        html: 'OL is not available here, so read this as a ranked list.|||LIST:<strong>Speed to first call.</strong> Median over 24 hours and nothing downstream can be assessed fairly. This is the most common cause and the least popular finding.;;<strong>Targeting or creative attracting the wrong buyer.</strong> Shows up as enquiries clustering below your entry price. Ours to fix.;;<strong>Optimisation event.</strong> If the campaign optimises for form fills rather than a CRM qualification event, the platform is finding form-fillers. Ours to fix, and it needs your CRM connected.;;<strong>Price or product.</strong> Contact rate good, site visits good, nobody books. At that point advertising is not the constraint and continuing to spend is the wrong move.',
      },
      {
        h2: 'The fourth one is the important one',
        html: 'If the diagnosis lands on price or product, we will say so, and the recommendation will be to stop spending rather than to change the creative. That is unusual and it is the reason Phase 0 is charged for — a research gate that cannot conclude "no" is not a gate.|||It is also the least commercially convenient thing we do, which is roughly the point.',
      },
    ],
    related: ['why-are-my-leads-bad', 'how-fast-should-leads-be-called', 'do-you-guarantee-leads-or-bookings'],
  },
  {
    slug: 'what-do-you-need-from-me-to-start',
    topic: 'working',
    q: 'What do you need from me to start?',
    short: 'Six things, and one of them is a person.',
    a: 'Six things: RERA registration status, the project price band and unit mix, your catchment definition, access to your ad accounts and CRM, whatever campaign history exists, and a named person on your side who owns the outcome. The last one is the one engagements fail without. Media buying can be outsourced; chasing your own sales team to call leads inside 48 hours cannot be, and an engagement with no internal counterpart produces leads nobody is accountable for.',
    body: [
      {
        h2: 'The checklist',
        html: 'LIST:<strong>RERA status.</strong> Registered or registering. Hard gate — we do not advertise an unregistered project.;;<strong>Price band and unit mix.</strong> Sets the budget criterion in the qualified-lead definition.;;<strong>Catchment.</strong> Your view of it. Phase 0 will test it, and it is frequently drawn wider than the buyer behaves.;;<strong>Ad account and CRM access.</strong> Your accounts, our access. Never the other way round.;;<strong>Campaign history.</strong> What ran, what it cost, what happened. Failures are more useful than successes here.;;<strong>A named owner.</strong> Someone with authority over the sales follow-up.',
      },
      {
        h2: 'What you do not need to have ready',
        html: 'Creative, copy, a landing page or a media plan. Those come out of the research rather than into it, and arriving with them fixed is a common way to spend the first fortnight unwinding decisions made before the market was read.',
      },
    ],
    related: ['what-is-phase-0', 'how-long-before-leads-start', 'real-estate-crm-lead-funnel-basics'],
  },
  {
    slug: 'what-is-in-the-weekly-report',
    topic: 'working',
    q: 'What is in the weekly report?',
    short: 'Decisions, not a description of activity.',
    a: 'Spend, cost per qualified lead, lead quality rate, sales-ready percentage as scored by your team, and the scaling decision for the coming week with the reasoning behind it. The last item is the one that distinguishes a report from a status update: every week the report says what changes and why, or it says explicitly that nothing changes and why that is correct. A report that only describes what happened is an activity log.',
    body: [
      {
        h2: 'The five lines',
        html: 'TABLE:Line|What it answers;;Spend|What went out, from your own account, verifiable independently;;Cost per qualified lead|Against the written definition, not against form fills;;Quality rate|What share met the definition;;Sales-ready %|Scored by your team, not by us;;Decision|Scale, hold or cut — and the evidence for it|||The quality rate and the sales-ready percentage are deliberately separate. The first is our measurement against a contractual standard; the second is your team\'s judgement. When they diverge, that gap is the most useful thing in the report.',
      },
      {
        h2: 'What is deliberately not in it',
        html: 'Impressions, reach, engagement rate and follower growth. None of them is a decision input for a launch campaign, and including them makes a thin week look busy.',
      },
    ],
    related: ['what-is-sales-ready-percentage', 'what-happens-if-leads-dont-convert', 'do-you-guarantee-leads-or-bookings'],
  },
  {
    slug: 'should-i-advertise-on-99acres-magicbricks-housing',
    topic: 'channels',
    q: 'Should I advertise on 99acres, MagicBricks or Housing.com?',
    short: 'Different instrument, different failure mode. Usually alongside, not instead.',
    a: 'Portals capture buyers already searching for property, which makes their intent high and their volume capped by however many people are looking in your catchment this month. They are a reasonable complement to paid social and a poor replacement for it, because they cannot create demand — only compete for demand that exists. The characteristic problem is that your listing sits beside every competitor in the same locality, so you compete on price and photographs on a page you do not control.',
    body: [
      {
        h2: 'What portals are good at',
        html: 'High-intent capture at predictable cost, and reaching buyers who start their search on a portal rather than on a search engine — which in India is a substantial share.|||They are also useful early, before a project has any brand recognition, because the buyer is browsing a category rather than looking for you specifically.',
      },
      {
        h2: 'The two structural problems',
        html: 'LIST:<strong>You are listed beside your competitors.</strong> A portal page is a comparison surface by design. If your project is not the best value on that page, the page is working against you.;;<strong>You do not own the relationship or the data.</strong> Leads arrive through the portal\'s system, on their terms, and the audience you build there is not portable. Contrast an ad account where the pixel, the audiences and the spend history stay yours.|||Portal leads also tend to be shared or resold depending on the package, which places some of them close to the resold-lead problem — cheap, non-exclusive, and already being called by others.',
      },
      {
        h2: 'The sensible split',
        html: 'Portals for capture, paid social for creation, search for defence. If you only have budget for one, the answer depends on whether people are already searching for property in your catchment at the volume you need — which is a Phase 0 question, not a general one.',
      },
    ],
    related: ['meta-ads-vs-google-ads-real-estate', 'why-are-my-leads-bad', 'what-is-good-cost-per-lead-bangalore'],
  },
  {
    slug: 'how-long-to-test-a-campaign',
    title: 'How Long Should a Real Estate Campaign Test Run?',
    topic: 'budget',
    q: 'How long should I run a campaign before deciding it does not work?',
    short: 'A full test window. Killing early is the more expensive error.',
    a: "Set the review window before launch using expected event volume, the project sales cycle and the decision being tested. A month may be a planning starting point, but no fixed duration or event count guarantees stable delivery or a valid conclusion. Check tracking and obvious mismatches immediately; assess qualified-lead and booking outcomes over cohorts with enough follow-up time.",
    body: [
      {
        h2: 'Why early judgement is so costly',
        html: 'Restarting resets the learning. A campaign killed at day 10 and relaunched at day 20 has paid for the unstable phase twice and has no more information than it did at the start.|||Compounding this, performance during learning is genuinely worse and genuinely unrepresentative, so the data most likely to make you kill a campaign is the data least worth acting on.',
      },
      {
        h2: 'What you may act on early',
        html: 'Creative-level decisions, not campaign-level ones. If one concept out of five is clearly not producing after enough impressions, turning it off is a within-test decision and does not reset anything.|||Structural changes — objective, audience, budget distribution — restart learning. Make them deliberately and rarely, and not on a Tuesday because the weekend was quiet.',
      },
    ],
    related: ['minimum-budget-real-estate-marketing', 'how-many-creatives-should-a-launch-test', 'why-did-my-cost-per-lead-increase'],
  },
  {
    slug: 'why-did-my-cost-per-lead-increase',
    topic: 'budget',
    q: 'Why did my cost per lead suddenly increase?',
    short: 'Five causes, distinguishable in about twenty minutes.',
    a: "Possible contributors include creative fatigue, auction changes, audience saturation, tracking problems, seasonality, offer changes and delivery edits. Rising frequency alongside cost is a clue, not proof of fatigue. Compare reach, spend, funnel conversion, qualification and recent changes before deciding whether to change the creative, targeting, offer or budget.",
    body: [
      {
        h2: 'The diagnostic order',
        html: 'TABLE:Symptom|Likely cause|Fix;;Frequency up, cost up|Creative fatigue|Refresh creative;;Frequency flat, cost up|Auction pressure or seasonality|Wait, or narrow targeting;;Reach falling, cost up|Audience exhaustion|Widen audience or new catchment;;Cost up right after an edit|Learning phase restarted|Revert, or wait it out;;Cost flat, quality down|Optimisation drift|Check the optimisation event|||The last row is the one that gets missed, because cost per lead looks fine. If quality falls while cost holds, the campaign is finding a cheaper, worse population — usually because the optimisation event is a form fill rather than a qualification.',
      },
      {
        h2: 'What not to do first',
        html: 'Do not raise the budget to compensate. A significant budget increase restarts learning, so you add an unstable phase on top of whatever the original problem was, and now you cannot tell them apart.|||Diagnose, then change one thing.',
      },
    ],
    related: ['how-long-to-test-a-campaign', 'how-many-creatives-should-a-launch-test', 'why-are-my-leads-bad'],
  },
  {
    slug: 'how-to-market-a-plotted-development',
    topic: 'segments',
    q: 'How do I market a plotted development?',
    short: 'Trust and title, not lifestyle and amenities.',
    a: "For plotted developments, test messaging about documented approval status, title review, boundary clarity, dimensions and access alongside lifestyle benefits. Distinguish established infrastructure from future plans and have project-specific legal claims reviewed. Our ad snapshot does not establish that documentary creative always outperforms lifestyle creative or that plotted demand dominates Tier-2 Karnataka.",
    body: [
      {
        h2: 'Why the argument inverts',
        html: 'An apartment buyer is purchasing a finished thing they can stand inside. A plot buyer is purchasing a legal position and a future intention, and every doubt they have is about whether the position is sound.|||So the questions that decide the sale are: is the title clear, are the approvals real, is the boundary certain, what exactly am I buying. Renders of a clubhouse do not address any of them, and a campaign that leads with lifestyle is answering questions the buyer is not asking.',
      },
      {
        h2: 'The two buyer pools to separate',
        html: 'Local end users buying to build, and metro-based investors buying to hold. They behave completely differently — the first wants to know about construction feasibility and neighbourhood, the second about appreciation and exit.|||In Tier-2 Karnataka the investor pool is frequently based in Bangalore, and it is routinely missed because the geography targeting is drawn tightly around the project. That is the most common avoidable error in plot campaigns.',
      },
      {
        h2: 'What this does to the funnel',
        html: 'More of the decision happens offline and in person than in apartment sales, so a purely digital funnel underperforms its lead numbers. Budget for the site visit as the real conversion event and measure cost per site visit rather than cost per lead.',
      },
    ],
    related: ['mysore-tier-2-real-estate-marketing', 'what-is-good-cost-per-lead-bangalore', 'what-counts-as-qualified-lead'],
  },
  {
    slug: 'how-to-market-commercial-property',
    title: 'Commercial vs Residential Property Marketing',
    topic: 'segments',
    q: 'Is marketing commercial or office space different from residential?',
    short: 'Yes — smaller audience, longer cycle, and search matters more.',
    a: 'Substantially different in three ways. The audience is far smaller and defined by business need rather than demographics, so broad social targeting wastes most of its reach. The decision cycle is longer and involves more people, which makes retargeting and content far more important than a single conversion push. And search carries disproportionate weight, because commercial requirements are actively searched with specific terms — square footage, locality, floor plate — in a way homes usually are not.',
    body: [
      {
        h2: 'Where the budget should sit',
        html: 'Weighted more towards search and LinkedIn than a residential launch would be, with Meta used for retargeting and awareness within a tightly drawn business audience rather than for volume prospecting.|||The cost per lead will look alarming against residential benchmarks and should not be compared to them. A commercial lead is worth many times a residential one, so the only meaningful comparison is cost per booking.',
      },
      {
        h2: 'What we will tell you honestly',
        html: 'Our published proof is residential. We have delivered commercial-adjacent work, but the benchmarks on this site — ₹266 cost per lead, 51% sales-ready — are residential figures from residential campaigns and do not transfer.|||If your project is commercial, the honest answer is that Phase 0 would be doing more genuine discovery and less pattern-matching than it would on a residential launch. That is worth knowing before you buy it.',
      },
    ],
    related: ['what-is-good-cost-per-lead-bangalore', 'meta-ads-vs-google-ads-real-estate', 'what-is-phase-0'],
  },
  {
    slug: 'do-i-need-a-landing-page',
    topic: 'channels',
    q: 'Do I need a landing page, or are lead forms enough?',
    short: 'Depends on whether your constraint is capacity or quality.',
    a: 'Instant lead forms produce more leads at lower cost with worse contact rates; landing pages produce fewer, better and more expensive leads. Neither is correct in the abstract. If your sales team has spare capacity and you need volume to find the market, use instant forms with qualifying questions. If your team is saturated and wasting time on unreachable enquiries, a landing page filters before the lead exists, which is cheaper than filtering afterwards.',
    body: [
      {
        h2: 'The friction is the mechanism',
        html: 'Everything that makes a landing page convert worse is also what makes its leads better. A buyer who clicks through, waits for a page to load, reads it and then fills a form has demonstrated more intent than one who tapped a pre-filled overlay.|||So the choice is really about where you want to spend the filtering — in the ad platform, or in your sales team\'s afternoon.',
      },
      {
        h2: 'If you use instant forms, do this',
        html: 'LIST:Add two or three qualifying questions — budget band, timeline, locality preference;;Switch the form to the higher-intent setting where the platform offers one;;Make sure the CRM connection fires a qualification event back, or you are optimising for the wrong thing;;Route to a named owner on arrival, because instant-form leads decay fastest',
      },
    ],
    related: ['meta-ads-real-estate-basics', 'real-estate-crm-lead-funnel-basics', 'why-are-my-leads-bad'],
  },
  {
    slug: 'can-you-work-with-my-existing-agency',
    topic: 'working',
    q: 'Can you work alongside my existing agency?',
    short: 'Sometimes. Not on the same channel.',
    a: 'Yes, where the split is clean — for example, they hold brand and offline while we hold performance, or they run creative production against a research brief we produce. No, where two parties are optimising the same ad account, because two people making budget decisions on one campaign produces worse results than either would alone, and neither can be held to a number. If the arrangement cannot be described in one sentence naming who owns which metric, it will not work.',
    body: [
      {
        h2: 'Splits that work',
        html: 'LIST:Research and strategy with us, execution with them;;Performance with us, brand and offline with them;;Media with us, creative production with their studio against our brief;;Phase 0 with us as a one-off diagnostic, everything else unchanged|||The last is the most common way people start, and it is deliberately low-commitment: a paid market read that their existing agency can then execute against.',
      },
      {
        h2: 'The split that does not work',
        html: 'Both parties buying media in the same account towards the same objective. Beyond the coordination problem, it makes accountability impossible — every result has two authors and every failure has none.|||If the existing relationship is valued and they are already running the ad account well, the honest recommendation may be that you do not need us for performance at all. Phase 0 is still useful, and it is separable.',
      },
    ],
    related: ['what-do-you-need-from-me-to-start', 'how-to-choose-real-estate-agency', 'what-is-phase-0'],
  },
  {
    slug: 'do-you-work-outside-real-estate',
    topic: 'choosing',
    q: 'Do you work outside real estate?',
    short: 'Yes, but the published proof is real estate and it should be read that way.',
    a: "QDnCo’s recorded experience includes EdTech and other adjacent categories. Research, tracking and lead-quality discipline can transfer, but project economics and buyer behaviour need fresh validation. Historical real estate examples should not be presented as benchmarks for another industry.",
    body: [
      {
        h2: 'What transfers and what does not',
        html: 'TABLE:Transfers|Does not transfer;;Funnel structure and test design|Catchment and corridor knowledge;;Written qualification standard|The specific five criteria, which are property-shaped;;CRM feedback loop and optimisation events|RERA compliance workflow;;Creative volume and fatigue discipline|Published cost-per-lead benchmarks;;Research-before-spend sequence|Buyer research and personas|||So the process transfers and the priors do not, which means non-real-estate work involves more genuine discovery and less pattern-matching. That usually means Phase 0 is doing more of the work, and it is worth knowing that before commissioning it.',
      },
      {
        h2: 'Why the site is real-estate-first anyway',
        html: 'Because that is where the delivered proof, the market research and the specialisation genuinely are, and a practice that claims every category equally is claiming none of them.|||If you are outside real estate and the process above is what you want, the conversation is worth having. Just do not buy it on the strength of a ₹266 cost per lead that came from a Bangalore apartment launch.',
      },
    ],
    related: ['who-is-v-sai-kavshik', 'what-is-phase-0', 'how-to-choose-real-estate-agency'],
  },
  {
    slug: 'best-time-to-launch-a-real-estate-campaign',
    topic: 'budget',
    q: 'When is the best time to launch a real estate campaign?',
    short: 'Six weeks before you want leads, and not during your competitors\' peak.',
    a: 'Work backwards: you need roughly six weeks of research, architecture and creative before going live, so the campaign starts when the launch is six weeks out. Beyond that, the two timing factors that matter are festival season, which lifts intent across Indian property markets and lifts auction prices with it, and the launch calendar of your own catchment. Launching into a corridor where three competitors went live last week means paying a premium for the same audience.',
    body: [
      {
        h2: 'How to check your catchment\'s launch pressure',
        html: 'The Meta Ad Library, free and public. Search advertisers in your locality and look at how many are currently running and how long they have been live. A corridor with several ads started in the last fortnight is a contested auction you are about to enter.|||This takes about twenty minutes and is the highest-value free check available before committing a launch budget. It is also part of what Phase 0 does formally.',
      },
      {
        h2: 'The festival trade-off',
        html: 'Intent genuinely rises and so does cost. Whether that is good for you depends on your margin per unit and whether your inventory is differentiated enough to win a contested auction. A premium project with a clear position often does well; an undifferentiated one pays the higher prices without the offsetting conversion lift.|||The one thing not to do is launch into festival season unprepared because the season is coming. Arriving late with untested creative into the most expensive auction of the year is the worst of both.',
      },
    ],
    related: ['how-long-before-leads-start', 'minimum-budget-real-estate-marketing', 'what-is-phase-0'],
  },
  {
    slug: 'what-is-a-good-site-visit-ratio',
    topic: 'quality',
    q: 'What is a good lead-to-site-visit ratio?',
    short: 'The metric that catches problems months before bookings do.',
    a: 'There is no reliable industry benchmark worth quoting, and anyone offering you one is guessing — it varies enormously with ticket size, distance and how the visit is scheduled. What matters is your own ratio, tracked from the first month, because it moves within weeks and it catches lead-quality and sales-process problems long before booking data would. Track it as cost per site visit rather than as a percentage, since that makes it comparable across campaigns.',
    body: [
      {
        h2: 'Why this is the metric to add first',
        html: 'Cost per lead is fast to measure and easy to game. Cost per booking is honest but arrives a full sales cycle late, by which point the launch window may have closed.|||Cost per site visit sits between them: available within weeks, hard to game, and directly attached to something your sales team already tracks. If you add one number to your reporting this quarter, add this one.',
      },
      {
        h2: 'What a falling ratio tells you',
        html: 'If leads hold and site visits fall, either the lead quality has drifted or the sales follow-up has. Check speed to first call before concluding it is the campaign — that single variable explains more site-visit decline than targeting does.|||If cost per lead falls and cost per site visit rises at the same time, the campaign has found a cheaper and worse audience. That combination is the clearest signal available that the optimisation event is wrong.',
      },
    ],
    related: ['what-is-sales-ready-percentage', 'how-many-leads-per-booking', 'how-fast-should-leads-be-called'],
  },
  {
    slug: 'difference-between-lead-and-enquiry',
    topic: 'quality',
    q: 'What is the difference between a lead and an enquiry?',
    short: 'Mostly nothing — which is why the word "qualified" carries the weight.',
    a: 'In practice the two are used interchangeably and neither means anything on its own. Both describe a person who submitted their details, which tells you nothing about whether they can be reached, can afford the unit, are in your catchment, or already exist in your CRM. This is precisely why the useful term is "qualified lead" with a written definition attached, and why an agency quoting a price per lead without that definition is quoting a price for an undefined unit.',
    body: [
      {
        h2: 'The distinction worth making instead',
        html: 'Not lead versus enquiry, but raw versus qualified.|||A raw lead is any submitted set of contact details. A qualified lead has been tested against criteria agreed in advance — in our case contactability within 48 hours across three attempts, budget inside the price band, intent within six months, valid catchment, and no CRM duplicate within 90 days.|||The gap between those two numbers is where every dispute in this category lives, and it is worth measuring in your own CRM regardless of who does your marketing.',
      },
      {
        h2: 'A note on vocabulary as a warning sign',
        html: 'If a proposal uses "leads", "enquiries", "prospects" and "opportunities" apparently interchangeably, it usually means no definition sits behind any of them. Ask which one is being sold and how it is tested. The quality of the answer tells you most of what you need to know.',
      },
    ],
    related: ['what-counts-as-qualified-lead', 'how-to-choose-real-estate-agency', 'what-is-sales-ready-percentage'],
  },
]
