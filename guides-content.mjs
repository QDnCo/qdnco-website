/**
 * Guide content.
 *
 * Separated from the generator so the writing can be edited without touching
 * the rendering, and so the whole corpus can be checked in one place for the
 * thing that actually matters: every number here has to trace to the
 * intelligence database, a named engagement, or a stated estimate. A guide that
 * invents a benchmark is worse than no guide, because it will be quoted back.
 *
 * Sources referenced throughout:
 *   SID  — Market Intelligence/QDnCo_Strategic_Intelligence_Database.md
 *   Meta — the August 2026 Meta Ad Library scrape, 41 sell-side advertisers
 *   PM   — Overall Learnings/Performance-Marketing-Learnings-Brainstorm.md
 */

const P = (s) => `<p>${s}</p>`
const UL = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`
const OL = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`
const ANSWER = (s) => `<div class="answer">${s}</div>`
const TABLE = (head, rows) =>
  `<div class="tablewrap"><table><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>` +
  rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('') + '</table></div>'

export const HUB = {
  title: 'Real Estate Marketing Guides — Bangalore | QDnCo',
  h1: 'Guides for developers who are tired of buying leads',
  desc: 'Practical guides to real estate performance marketing in Bangalore: qualified-lead economics, Meta and Google Ads, RERA, CRM and launch budgets.',
  lede: 'Everything here comes out of running paid acquisition for crore-ticket residential launches in Bangalore and Mysore. Where a number appears it is either a result from a named engagement or a figure from our own market research, and where something is an estimate it says so.',
  body: P(
    'Most agency content in this category is written to rank, not to be used. These are written the other way round: each one answers a question a developer or channel partner has actually asked on a call, in the order the question is usually asked in. If a guide tells you not to spend money, that is the guide working.'
  ),
}

export const GUIDES = [
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'real-estate-performance-marketing-bangalore',
    h1: 'Real estate performance marketing in Bangalore: how it actually works',
    blurb: 'The full sequence, from market read to locked scaling rules.',
    title: 'Real Estate Performance Marketing in Bangalore | QDnCo',
    desc: 'How paid acquisition for Bangalore property launches actually runs: research before spend, campaign architecture, and qualified-lead economics.',
    eyebrow: 'Pillar guide',
    mins: 9,
    keywords: ['real estate performance marketing', 'Bangalore real estate marketing', 'real estate lead generation', 'Meta Ads real estate', 'Google Ads real estate'],
    lede: 'Performance marketing for a property launch is not a media plan with a property attached. The order of operations is what decides the outcome, and most launches get it backwards — buying media first and researching the market afterwards, when the budget is already committed.',
    facts: [
      { v: '24,400', k: 'Q1 2026 Bengaluru launches reported by ANAROCK; see the source below' },
      { v: '~325', k: 'project equivalents in a scenario; not an observed annual count' },
      { v: '51', k: 'unique sell-side ad links in the retained August snapshot' },
      { v: '₹350–500', k: 'working cost-per-lead band for Bangalore residential' },
    ],
    body: [
      {
        id: 'what-it-is', h2: 'What performance marketing means for a property launch',
        html: ANSWER(P(
          '<strong>Performance marketing for real estate is paid acquisition where every rupee is traceable to a lead, every lead is measured against a written definition of "qualified", and budget only scales after the numbers hold for a full test window.</strong> It is distinguished from brand advertising by the fact that the campaign can be switched off on evidence.'
        )) + P(
          'That definition sounds obvious and is rare in practice. The dominant complaint from developers in this market is being sold volume they cannot use — leads that are uncontactable, out of budget, out of catchment, or already in the CRM from a previous campaign. The response is not more leads. It is a definition, applied before the invoice.'
        ),
      },
      {
        id: 'sequence', h2: 'The sequence that decides the outcome',
        html: P(
          'Six phases, and the ordering is the method. Nothing is bought before the market is read, and nothing scales before a controlled test says it can.'
        ) + OL([
          '<strong>Questionnaire and business learning (~2 weeks).</strong> Business model, unit mix, ticket size, the real sales process, past campaign history, catchment, competitors, capacity and who signs off. The output is a written brief that gates everything after it.',
          '<strong>Market research and intelligence (~2 weeks).</strong> Three tracks in parallel — primary interviews with the actual buyer, secondary desk research on addressable market and pricing, and historical study of what already worked or failed for the brand.',
          '<strong>Architecture and creative direction (10 days – 2 weeks).</strong> Full-funnel structure across top, middle, bottom and a separate retargeting layer, plus the creative script pack. Nothing enters production without written sign-off.',
          '<strong>A/B testing and market launch (~1 month).</strong> This is T-0, where money goes to market. Controlled spend establishes cost per lead and lead quality before anything scales.',
          '<strong>Lead funnel, CRM and dashboard (~1 week).</strong> Routing, alerts, and a weekly report carrying spend, cost per qualified lead, quality and the reasoning behind each scaling decision.',
          '<strong>Track, learn, scale (ongoing).</strong> Budget scales only onto proven unit economics. By month three the funnel, the reporting and the scaling rules are locked.',
        ]) + P(
          'You are live in market from roughly week six. The three weeks before that are the cheapest weeks of the whole engagement, because they are the only ones where changing your mind costs nothing.'
        ),
      },
      {
        id: 'economics', h2: 'The economics you should plan against',
        html: P(
          'Plan on <strong>100 leads per closure</strong> until your sales team proves better. That is deliberately the worst case, with market and sales reality included, and it is the number to build a budget on. Roughly 60% of raw leads will meet a reasonable qualification bar; a strong sales team closes around 10% of those.'
        ) + TABLE(
          ['Line', 'Working assumption', 'For 10 units'],
          [
            ['Leads required', '100 per closure (conservative)', '1,000 leads'],
            ['Cost per lead', '₹350 baseline for Bangalore residential', '—'],
            ['Media spend', '1,000 × ₹350', '₹3.5 lakh'],
            ['GST on media', '18%', '₹63,000'],
            ['Total ad cost', 'media + GST', '<strong>₹4.13 lakh</strong>'],
          ]
        ) + P(
          'Against ₹35 lakh units, ten sales is ₹3.5 crore of revenue for under ₹5 lakh of advertising. That ratio is why the argument for research-first is an economic one rather than an aesthetic one: the expensive mistake in this category is never the media budget, it is spending three months of it against the wrong positioning.'
        ),
      },
      {
        id: 'market', h2: 'What the Bangalore market actually looks like',
        html: P(
          "Our <a href=\"/data/bangalore-developer-marketing-market-size.html\">Bengaluru sizing scenario</a> uses ANAROCK’s reported 24,400 Q1 2026 launches. Repeating that quarter four times and assuming 300 units per project gives about 325 project equivalents. These are planning assumptions, not measured annual launches or verified agency demand."
        ) + P(
          "The retained August ad snapshot has 51 unique sell-side links across 41 advertiser names, including CRM vendors. It does not prove an absence of pricing or qualification terms. These are practical checks to make in any proposal:"
        ) + UL([
          "<strong>Commercial clarity.</strong> Ask for the fee basis, scope, exclusions and media billing arrangement.",
          "<strong>Research scope.</strong> Ask what evidence informs the recommendation and what findings would change it.",
          "<strong>Qualification.</strong> Agree testable lead criteria, rejection reasons and a replacement window.",
        ]),
      },
      {
        id: 'choosing', h2: 'How to judge an agency before you sign',
        html: P('Four questions, and the answers are more informative than any deck.') + OL([
          '<strong>What is your written definition of a qualified lead, and what happens when one fails it?</strong> If the answer is a paragraph rather than a list of conditions, there is no definition.',
          '<strong>Who owns the ad account?</strong> If the agency owns it, you cannot audit spend and you cannot leave with your data.',
          '<strong>Is media billed through you or direct to the platform?</strong> Media billed through an agency is the easiest place in this business to hide a margin.',
          '<strong>What would make you tell me not to run this campaign?</strong> An agency that has no answer has never said no, which means the research is decorative.',
        ]),
      },
    ],
    faqs: [
      { q: 'How long before a real estate campaign produces leads?', a: 'You are live in market at roughly week six. The first three to four weeks are the questionnaire and the three research tracks, then about two weeks of campaign architecture and creative before spend starts. Leads begin in the first week of the testing phase, but the numbers that matter — cost per qualified lead and the sales-ready percentage — need a full test window of around a month before they mean anything.' },
      { q: 'What is a realistic monthly budget for a Bangalore launch?', a: 'Media and fees are separate. On media, plan from the unit target backwards: 100 leads per closure at ₹350–500 a lead. Ten units a month implies roughly ₹3.5–5 lakh of media plus GST. On fees, specialist real-estate retainers in this market run ₹1–3 lakh a month and bundled all-in quotes reach ₹7–10 lakh once media is folded in.' },
      { q: 'Should a developer run Meta or Google first?', a: 'Both, as one funnel rather than two campaigns. Google captures people already searching, which is a smaller and more expensive pool with higher intent. Meta creates demand among people who were not searching yet, which is where volume comes from at a workable cost. Running only one means either paying a premium for a small pool or generating interest with nowhere to capture it.' },
      { q: 'Who should own the ad account?', a: 'You should. The media invoice from Meta or Google is the only independent proof of what was actually spent, and if the agency owns the account you lose both the audit trail and the campaign history when the engagement ends. Any agency that resists this is telling you something.' },
    ],
    related: ['cost-per-qualified-lead-real-estate', 'what-counts-as-a-qualified-lead', 'how-much-should-a-developer-spend', 'meta-ads-for-real-estate-launches'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'cost-per-qualified-lead-real-estate',
    h1: 'Cost per qualified lead for Indian real estate: real benchmarks',
    blurb: 'Why cost per lead misleads, and what to measure instead.',
    title: 'Cost Per Qualified Lead in Real Estate | QDnCo',
    desc: 'Real cost-per-lead figures from Bangalore property campaigns, why CPL alone misleads, and how to work out what a lead is worth to you.',
    eyebrow: 'Benchmarks',
    mins: 7,
    keywords: ['cost per lead real estate', 'cost per qualified lead', 'real estate CPL India', 'Bangalore real estate leads'],
    lede: 'Cost per lead is the most quoted number in this industry and the least useful one. A ₹200 lead that never books a site visit is more expensive than a ₹600 lead that does, and any agency quoting you a CPL without telling you its qualification rate is quoting you half a number.',
    facts: [
      { v: '₹266', k: 'cost per lead, premium North Bangalore residential (Indium Group)' },
      { v: '51%', k: 'of those leads qualified as sales-ready' },
      { v: '~₹450', k: 'cost per lead at ~₹1 crore/month of media, enterprise portfolio' },
      { v: '₹350–500', k: 'the working band for Bangalore residential' },
    ],
    body: [
      {
        id: 'what-good', h2: 'What a good cost per lead looks like',
        html: ANSWER(P(
          '<strong>For Bangalore residential the working band is ₹350–500 per raw lead, and roughly 60% of those should survive a reasonable qualification bar.</strong> On a premium North Bangalore project we ran leads at ₹266 with 51% qualifying as sales-ready. At the other end of the scale, on an enterprise portfolio running about ₹1 crore a month of media, cost per lead sat near ₹450 across roughly 22,000 leads a month.'
        )) + P(
          'Those two figures are worth holding side by side, because they show the thing CPL benchmarks usually hide: <strong>the cheaper lead came from the smaller, more tightly targeted campaign.</strong> Scale pushes cost per lead up, not down, because you exhaust the highest-intent audience first and then pay progressively more for the next tier.'
        ),
      },
      {
        id: 'why-misleading', h2: 'Why cost per lead on its own misleads',
        html: P('A lead is a form fill. It is not a buyer, and it is not evidence of anything until it has been qualified. Three campaigns can report the same ₹300 CPL and be worth wildly different amounts:') +
          TABLE(
            ['Campaign', 'CPL', 'Qualified', 'Cost per qualified lead'],
            [
              ['A — broad reach, no filter', '₹300', '20%', '₹1,500'],
              ['B — mid-funnel, some filtering', '₹300', '45%', '₹667'],
              ['C — tight targeting, qualified on intake', '₹300', '75%', '₹400'],
            ]
          ) + P(
            'Same headline number, nearly a 4× spread in what it actually costs to put a real prospect in front of the sales team. This is why the unit we price against is the qualified lead, not the lead — and why the definition has to be written down before the campaign starts rather than argued about after the invoice.'
          ),
      },
      {
        id: 'what-to-measure', h2: 'What to measure instead',
        html: OL([
          '<strong>Cost per qualified lead.</strong> Media spend divided by leads meeting the written definition. This is the number that should appear on the invoice.',
          '<strong>Cost per site visit.</strong> The first point at which a lead has spent something of their own — time — and the strongest single predictor of a booking.',
          '<strong>Cost per booking.</strong> The only number the finance team cares about. Lagging, but it is the one that closes the loop.',
          '<strong>Sales-ready percentage, weekly.</strong> Not as a report card, as an early-warning system. When it falls, creative or targeting is drifting and you have about a week to catch it before the budget follows.',
        ]) + P(
          'Note what is missing: impressions, reach, click-through rate, cost per click. Those are diagnostics for the person running the account. They are not results, and an agency that leads a monthly report with them is managing your attention rather than your budget.'
        ),
      },
      {
        id: 'what-lead-worth', h2: 'Working out what a lead is worth to you',
        html: P('Do this before you accept anyone\'s CPL as good or bad. It takes five minutes and it is the only benchmark that matters for your project.') +
          OL([
            'Take your average unit value. Say ₹1.5 crore.',
            'Take your gross margin on a unit — ask finance, do not guess.',
            'Divide by leads per closure. At the conservative 100:1, one lead carries a hundredth of one sale\'s margin.',
            'That is your ceiling. Anything below it is profitable volume; anything above it is expensive regardless of how it compares to a market average.',
          ]) + P(
            'A developer selling ₹1.5 crore units can rationally pay far more per lead than one selling ₹45 lakh units, and the same ₹500 CPL is a bargain for the first and possibly ruinous for the second. Industry benchmarks cannot tell you which you are.'
          ),
      },
    ],
    faqs: [
      { q: 'What is a good cost per lead for real estate in Bangalore?', a: 'The working band is ₹350–500 per raw lead for residential, but the figure is meaningless without the qualification rate beside it. On a premium North Bangalore project we ran leads at ₹266 with 51% qualifying as sales-ready. On an enterprise portfolio at roughly ₹1 crore a month of media, cost per lead sat near ₹450 across about 22,000 leads a month. Measure cost per qualified lead and cost per site visit, not cost per form fill.' },
      { q: 'Why does cost per lead go up as I spend more?', a: 'Because you exhaust the highest-intent audience first. The cheapest leads come from the people closest to buying, and there are a finite number of them in any catchment. Scaling means paying progressively more to reach the next tier out. A campaign whose CPL stays flat as budget triples is usually either not actually scaling or is buying worse leads at the same price.' },
      { q: 'Is a ₹200 lead better than a ₹600 lead?', a: 'Not necessarily, and usually not. A ₹200 lead that never books a site visit costs infinitely more than a ₹600 lead that does. Cheap leads in this category typically come from broad targeting and low-friction forms, which is exactly the combination that produces uncontactable and out-of-budget enquiries. Judge on cost per site visit and cost per booking.' },
      { q: 'How many leads does it take to sell one unit?', a: 'Plan on 100 raw leads per closure until your own sales data proves better. Around 60% of raw leads should meet a reasonable qualification bar, and a strong sales team closes roughly 10% of those qualified leads — which would be a far better ratio. The 100:1 figure is deliberately the worst case, because a budget built on the optimistic number fails in exactly the month you cannot afford it to.' },
    ],
    related: ['what-counts-as-a-qualified-lead', 'how-much-should-a-developer-spend', 'real-estate-performance-marketing-bangalore', 'real-estate-crm-and-lead-funnel'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'what-counts-as-a-qualified-lead',
    h1: 'What counts as a qualified lead, in writing',
    blurb: 'A five-point definition you can hold an agency to.',
    title: 'What Counts As A Qualified Real Estate Lead | QDnCo',
    desc: 'A written five-point definition of a qualified real estate lead — contactable, budget, timeline, catchment, not a duplicate — made contractual.',
    eyebrow: 'Definitions',
    mins: 6,
    keywords: ['qualified lead definition', 'real estate lead qualification', 'sales ready leads'],
    lede: "A lead definition should be agreed before delivery begins. Without testable criteria, a buyer and an agency can count different things under the same label. This guide explains the criteria QDnCo uses and how to record acceptance or rejection.",
    facts: [
      { v: '5', k: 'conditions, all of which must hold' },
      { v: '7 days', k: 'window to flag a lead that fails' },
      { v: '51%', k: 'sales-ready rate achieved on a premium North Bangalore project' },
    ],
    body: [
      {
        id: 'definition', h2: 'The five-point definition',
        html: ANSWER(P(
          '<strong>A qualified lead meets all five conditions: contactable, budget-matched, timeline under six months, inside the catchment, and not a duplicate.</strong> Any lead failing one of them is replaced free, flagged within seven days.'
        )) + P('Taken one at a time, and why each is there:') + OL([
          '<strong>Contactable.</strong> The number connects and the person acknowledges the enquiry. This single condition removes the largest category of junk in Indian real estate lead generation.',
          '<strong>Budget-matched.</strong> The stated budget overlaps the project\'s price band. A genuinely interested buyer for a ₹60 lakh flat is not a lead for a ₹3 crore one.',
          '<strong>Timeline under six months.</strong> Intent decays. Someone buying "sometime next year" is a nurture contact, not a lead the sales team should be spending calls on this month.',
          '<strong>In catchment.</strong> Inside the geography the project can realistically serve, however you define it — commute, corridor, or the buyer profile you are actually chasing.',
          '<strong>Not a duplicate.</strong> Already in the CRM from a previous campaign means you are being billed twice for the same person.',
        ]),
      },
      {
        id: 'evidence', h2: 'What counts as evidence',
        html: P(
          'A definition nobody can adjudicate is not a definition. Three things make it real:'
        ) + UL([
          '<strong>Call recordings.</strong> Whether the lead was contactable and what they said about budget and timeline is a matter of record, not opinion.',
          '<strong>CRM status.</strong> The shared artefact both sides look at. Disputes get resolved against the record rather than against memory.',
          '<strong>A seven-day window.</strong> Long enough for the sales team to work the lead, short enough that the record is still fresh. After that the lead is deemed accepted.',
        ]) + P(
          'The replacement guarantee matters more than the definition does. A definition with no consequence is marketing copy. A definition where a failing lead is replaced free puts the cost of a bad lead on the party who chose the targeting — which is the only place it can sit if the incentives are going to point the same way.'
        ),
      },
      {
        id: 'not-qualified', h2: 'What qualification is not',
        html: P('Three things that get sold as qualification and are not:') + UL([
          '<strong>A form with more fields.</strong> Friction reduces volume; it does not verify anything. A buyer can type any budget into a dropdown.',
          '<strong>A lead score.</strong> An opaque number produced by a model you cannot inspect is not a definition, it is a proxy for one. Ask what the score is made of; if the answer is vague, it is decoration.',
          '<strong>"We only send you good leads."</strong> Without conditions and a consequence, this is a promise to try.',
        ]),
      },
    ],
    faqs: [
      { q: 'What is the difference between a lead and a qualified lead?', a: 'A lead is a form fill. A qualified lead meets a written definition — in our case all five of: contactable, budget-matched, timeline under six months, inside the catchment, and not a duplicate. The distinction matters commercially, because the sales team can only work the second kind and you should only be paying for the second kind.' },
      { q: 'What happens if a lead does not meet the definition?', a: 'It is replaced free, provided it is flagged within seven days. Call recordings and CRM status are the shared evidence, so the question is settled against the record rather than argued. Seven days is long enough for the sales team to have worked the lead and short enough that the record is still current.' },
      { q: 'How do you verify a lead is contactable?', a: 'The number connects and the person acknowledges the enquiry, evidenced by the call recording. This one condition removes the largest single category of junk in Indian real estate lead generation, which is why it is first on the list rather than buried.' },
      { q: 'Can an agency guarantee sales-ready leads?', a: 'An agency can guarantee a definition and a replacement, which is a commitment it controls. It cannot guarantee a sales outcome, which depends on price, product, inventory, the sales team\'s response time and the market. Any agency guaranteeing bookings is either pricing that risk into the fee or does not intend to honour it.' },
    ],
    related: ['cost-per-qualified-lead-real-estate', 'real-estate-crm-and-lead-funnel', 'real-estate-performance-marketing-bangalore'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'meta-ads-for-real-estate-launches',
    h1: 'Meta Ads for real estate launches: structure that holds',
    blurb: 'Funnel architecture, creative testing and what breaks at scale.',
    title: 'Meta Ads For Real Estate Launches | QDnCo',
    desc: 'How to structure Meta Ads for a property launch: four funnel layers, angle-first creative testing, and the failure modes that appear at scale.',
    eyebrow: 'Channel',
    mins: 8,
    keywords: ['Meta Ads real estate', 'Facebook Ads property', 'Instagram Ads real estate', 'real estate campaign structure'],
    lede: '91% of Indian real estate already runs AI-generated creative, so producing more variants stopped being an advantage some time ago. What still separates campaigns is structure: which pools you build, what you test against what, and what you do when a number moves.',
    facts: [
      { v: '91%', k: 'of Indian real estate advertisers already run AI creative' },
      { v: '4', k: 'funnel layers — top, middle, bottom, retargeting' },
      { v: '2', k: 'demand pools kept separate: channel partner and end buyer' },
    ],
    body: [
      {
        id: 'structure', h2: 'The structure',
        html: ANSWER(P(
          '<strong>Build four layers — top, middle, bottom and a separate retargeting layer — and keep channel-partner demand in a different pool from end-buyer demand.</strong> Those two audiences want opposite things from the same project, and mixing them corrupts both the creative and the reporting.'
        )) + P('What each layer is for:') + UL([
          '<strong>Top.</strong> Reach people who were not searching. This is where volume comes from and where cost per lead is lowest, and it is also where the least qualified enquiries originate. Judge it on qualified leads, never on raw volume.',
          '<strong>Middle.</strong> People who engaged but did not convert. Video viewers, page engagers, partial form completions. Cheaper than top and considerably better qualified.',
          '<strong>Bottom.</strong> Ready to act. Small, expensive per impression, cheapest per booking.',
          '<strong>Retargeting.</strong> Deliberately its own layer rather than a setting inside the others, so its spend and its returns can be read separately. Mixed in, it flatters everything it touches.',
        ]),
      },
      {
        id: 'creative', h2: 'Creative testing when everyone has infinite creative',
        html: P(
          'When variants are free, the constraint moves from production to knowing what to make. The useful unit of testing is not the image, it is the <strong>angle</strong> — the specific claim about why this project is worth a site visit.'
        ) + P('Angles worth testing on a Bangalore launch, each traceable to something the research said:') + UL([
          '<strong>Commute.</strong> Minutes to the metro, the tech park, the school. Specific numbers, not "well connected".',
          '<strong>Price band against the corridor.</strong> A per-square-foot comparison against the obvious alternative, where the comparison is favourable and verifiable.',
          '<strong>Stage.</strong> Pre-launch, EOI, founder allocation. Scarcity that is real, because scarcity that is not real is both a compliance problem and a trust problem.',
          '<strong>Buyer identity.</strong> Investor versus end user. These are different products sold to different people with the same floor plan.',
        ]) + P(
          'Test angles against each other first, formats second. A weak angle in a beautiful video loses to a strong angle in a plain graphic, and finding that out costs a fraction of a production budget.'
        ),
      },
      {
        id: 'failure', h2: 'What breaks when you scale',
        html: TABLE(
          ['Symptom', 'Usual cause', 'What to do'],
          [
            ['CPL flat, quality falling', 'Audience exhausted; platform reaching further out', 'Widen the angle, not the budget'],
            ['CPL rising, quality steady', 'Normal scaling', 'Continue if it is still inside your ceiling'],
            ['Sudden CPL drop', 'Almost always a tracking break, not a win', 'Check the pixel and the CAPI before celebrating'],
            ['Volume fine, sales team quiet', 'Qualification or routing failure', 'Audit the CRM handoff, not the campaign'],
          ]
        ) + P(
          'The third row is the one that catches people. A cost per lead that halves overnight is far more likely to be duplicate conversion events than a breakthrough, and the campaign will happily scale into the error while the dashboard looks excellent.'
        ),
      },
    ],
    faqs: [
      { q: 'How should Meta Ads be structured for a real estate launch?', a: 'Four layers — top, middle, bottom of funnel and a separate retargeting layer — with channel-partner demand kept in a different pool from end-buyer demand. Retargeting is deliberately separated rather than folded into the other layers, because mixed in it flatters every metric it touches and you lose the ability to read what prospecting is actually doing.' },
      { q: 'Does AI-generated ad creative still work for real estate?', a: 'It works, but it is no longer an advantage — around 91% of Indian real estate advertisers already run it, so volume of variants is table stakes. What differentiates is the angle: the specific, research-backed claim about why the project is worth a site visit. Test angles against each other before you test formats.' },
      { q: 'Why did my cost per lead suddenly drop?', a: 'Check tracking before celebrating. A sudden halving of cost per lead is far more often duplicate conversion events, a misfiring pixel or a Conversions API deduplication failure than a genuine improvement. The dangerous part is that the campaign will scale into the error while the dashboard looks excellent.' },
      { q: 'Should channel partners and end buyers be targeted together?', a: 'No. They want opposite things from the same project — partners want inventory, margin and speed; end buyers want a home, a commute and a price. Running them in one pool corrupts both the creative and the reporting, and you lose the ability to tell which audience is actually producing the bookings.' },
    ],
    related: ['google-ads-for-real-estate', 'real-estate-performance-marketing-bangalore', 'what-counts-as-a-qualified-lead', 'rera-compliant-advertising'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'google-ads-for-real-estate',
    h1: 'Google Ads for real estate developers: capturing existing intent',
    blurb: 'Search, the brand-term question, and where budget leaks.',
    title: 'Google Ads For Real Estate Developers | QDnCo',
    desc: 'Running Google Ads for a property launch: three intent tiers, the brand-term question, negatives, and where developer budgets leak.',
    eyebrow: 'Channel',
    mins: 7,
    keywords: ['Google Ads real estate', 'real estate search ads', 'property PPC India'],
    lede: 'Google does something Meta cannot: it reaches people who have already decided to look. That pool is smaller and more expensive per click, and it is also the closest thing to a booking you can buy.',
    facts: [
      { v: 'Higher', k: 'intent than social, at a higher cost per click' },
      { v: '3', k: 'intent tiers worth separating' },
      { v: 'Direct', k: 'media billing — the invoice is your proof' },
    ],
    body: [
      {
        id: 'tiers', h2: 'Three intent tiers, kept apart',
        html: ANSWER(P(
          '<strong>Separate branded, category and competitor searches into different campaigns.</strong> They have different costs, different conversion rates and different arguments for existing, and averaging them together hides all three.'
        )) + UL([
          '<strong>Branded.</strong> People searching your project by name. Cheapest clicks, highest conversion, and the tier where the "are we just paying for traffic we would have got anyway" argument is genuinely worth having.',
          '<strong>Category.</strong> "3 BHK apartments in Whitefield", "new launch Sarjapur Road". The volume tier, and where most of the budget belongs.',
          '<strong>Competitor.</strong> People searching a rival project by name. Expensive, legally sensitive in some framings, and occasionally very effective. Treat as an experiment with its own budget.',
        ]),
      },
      {
        id: 'brand-terms', h2: 'Should you bid on your own name?',
        html: P(
          'The honest answer is that it depends on whether anyone else is. If a competitor or a listing portal is bidding on your project name, the top of the page is not yours and the click is going somewhere else. If nobody is, branded bidding is largely paying for a click you would have received organically.'
        ) + P(
          'Test it properly rather than arguing about it: pause branded for two weeks and watch total branded traffic and total bookings, not just paid clicks. If total volume holds, the spend was redundant. If it falls, it was not.'
        ),
      },
      {
        id: 'leaks', h2: 'Where developer budgets leak',
        html: OL([
          '<strong>No negative keywords.</strong> "Rent", "jobs", "salary", "PG", "resale", the names of other developers, and every locality you do not serve. Without these you are paying for traffic that could never buy.',
          '<strong>Broad match with no supervision.</strong> Broad match plus a conversion goal that fires on any form is a machine for spending money on the wrong searches.',
          '<strong>One landing page for every keyword.</strong> Someone searching a specific locality should land on that locality, not the homepage. This is the single cheapest conversion-rate improvement available.',
          '<strong>Conversions counted on page views.</strong> If the conversion event fires on a thank-you page load rather than a validated submission, the platform optimises toward whatever produces page loads.',
        ]),
      },
    ],
    faqs: [
      { q: 'Should real estate developers bid on their own brand name?', a: 'Only if someone else is. If a competitor or a listing portal is bidding on your project name, you are ceding the top of the page and the click goes elsewhere. If nobody is, you are largely paying for clicks you would have had organically. Test it by pausing branded for two weeks and watching total bookings rather than paid clicks.' },
      { q: 'What negative keywords should a property campaign have?', a: 'At minimum: rent, rental, jobs, salary, PG, hostel, resale, and the names of localities you do not serve. Add competitor names unless you are deliberately running a competitor campaign with its own budget. Without a negative list you are paying for searches that could never result in a purchase.' },
      { q: 'Is Google or Meta better for real estate leads?', a: 'They do different jobs and a launch needs both. Google captures people already searching — higher intent, smaller pool, higher cost per click. Meta creates demand among people who were not searching, which is where volume comes from. Running only Google means paying a premium for a small pool; running only Meta means generating interest with nothing capturing the people who then go and search.' },
      { q: 'What should a Google Ads conversion be set to for real estate?', a: 'A validated form submission, not a thank-you page view. If the event fires on a page load, the platform optimises toward whatever produces page loads — including bot traffic and accidental submissions. Where possible, feed qualified-lead status back so the bidding optimises toward leads the sales team can actually work.' },
    ],
    related: ['meta-ads-for-real-estate-launches', 'real-estate-performance-marketing-bangalore', 'cost-per-qualified-lead-real-estate'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'rera-compliant-advertising',
    h1: 'RERA-compliant real estate advertising: what the ad must carry',
    blurb: 'Where the obligation sits and what to check before a campaign runs.',
    title: 'RERA-Compliant Real Estate Advertising | QDnCo',
    desc: 'What the Real Estate (Regulation and Development) Act, 2016 requires of property advertising, where the obligation sits, and a pre-campaign checklist.',
    eyebrow: 'Compliance',
    mins: 6,
    keywords: ['RERA advertising', 'RERA compliant ads', 'real estate advertising rules India'],
    lede: 'Real estate advertising in India is regulated under the Real Estate (Regulation and Development) Act, 2016. The obligation to hold a valid registration and to advertise accurately sits with the promoter — not with the agency — which is exactly why an agency should check it before running anything.',
    facts: [
      { v: '2016', k: 'Real Estate (Regulation and Development) Act' },
      { v: 'Promoter', k: 'where the legal obligation sits' },
      { v: 'Before spend', k: 'when the check should happen' },
    ],
    body: [
      {
        id: 'requirement', h2: 'The core requirement',
        html: ANSWER(P(
          '<strong>A registered project\'s advertising must carry its RERA registration number and the web address of the relevant state RERA authority, and must not misrepresent the project.</strong> Marketing a registrable project that is not registered is the problem the Act exists to address.'
        )) + P(
          'The practical consequence for a campaign is that the registration details belong in the creative and on the landing page, not only in a terms document nobody opens. Karnataka projects register with K-RERA; the state authority\'s portal is where a buyer verifies what you have claimed.'
        ),
      },
      {
        id: 'accuracy', h2: 'Accuracy is the larger exposure',
        html: P(
          'Carrying the registration number is the easy part. The harder discipline is that everything else in the ad has to be true and current:'
        ) + UL([
          '<strong>Prices.</strong> "Starting at" figures must correspond to inventory that actually exists at that price. A starting price for one unit on one floor, advertised as the project price, is the classic exposure.',
          '<strong>Areas.</strong> Carpet area is the defined term under the Act. Advertising super built-up as though it were the comparable figure invites exactly the dispute you do not want.',
          '<strong>Amenities.</strong> Distinguish delivered from planned from approved. A render is not a fact.',
          '<strong>Distances and commute times.</strong> "Five minutes to the metro" is a claim. Measure it, and state the conditions.',
          '<strong>Approvals and possession dates.</strong> Both change. An ad that was accurate last quarter may not be this one.',
        ]),
      },
      {
        id: 'checklist', h2: 'Pre-campaign checklist',
        html: OL([
          'Confirm the project is registered and the registration is current.',
          'Get the registration number and the state authority URL in writing from the developer.',
          'Place both in the creative and on the landing page.',
          'Verify every price, area, distance and date in the copy against a current source document.',
          'Label renders as artistic impressions and planned amenities as planned.',
          'Re-verify at each creative refresh — the details drift, and old creative keeps running.',
        ]) + P(
          'None of this is legal advice, and an agency is not the right party to give it. Where a claim is uncertain, the developer\'s counsel decides. What an agency can and should do is refuse to run copy nobody will stand behind.'
        ),
      },
    ],
    faqs: [
      { q: 'What must a RERA-compliant property advertisement include?', a: 'The project\'s RERA registration number and the website address of the relevant state RERA authority — for Karnataka projects, K-RERA. The advertisement must also not misrepresent the project. Both details should appear in the creative and on the landing page, not only in a terms document.' },
      { q: 'Who is responsible for RERA compliance — the developer or the agency?', a: 'The legal obligation sits with the promoter, meaning the developer. The agency is not the regulated party. In practice a competent agency verifies registration before running anything, because a campaign built on an unregistered or misdescribed project harms both sides regardless of where the statutory duty formally sits.' },
      { q: 'Can you advertise a project before RERA registration?', a: 'Marketing a registrable project before it is registered is precisely what the Act was written to prevent. Whether a specific pre-launch activity is registrable is a question for the developer\'s legal counsel, not for a marketing agency — and an agency that waves it away is not one to trust with the rest of the campaign either.' },
      { q: 'Should carpet area or super built-up area be advertised?', a: 'Carpet area is the term defined under the Act and it is the figure buyers are entitled to compare on. Advertising super built-up area as though it were the comparable number is the source of a large share of buyer disputes in this category. Where both are shown, label them unambiguously.' },
    ],
    related: ['real-estate-performance-marketing-bangalore', 'meta-ads-for-real-estate-launches', 'pre-launch-eoi-playbook'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'how-much-should-a-developer-spend',
    h1: 'How much should a developer spend on marketing a launch?',
    blurb: 'Work backwards from units, not forwards from a percentage.',
    title: 'How Much Should A Developer Spend On Marketing? | QDnCo',
    desc: 'Size a launch budget from the unit target backwards, what agency fees cost in Bangalore, and why percentage-of-revenue rules mislead.',
    eyebrow: 'Budgeting',
    mins: 7,
    keywords: ['real estate marketing budget', 'property launch marketing cost', 'real estate agency fees India'],
    lede: 'The common approach is to take a percentage of projected revenue and call it the marketing budget. It produces a number quickly and it is almost always the wrong one, because it is disconnected from how many leads you actually need.',
    facts: [
      { v: '₹3.5L', k: 'media to sell 10 units at ₹350 CPL, conservative funnel' },
      { v: '₹1–3L', k: 'monthly range for specialist real-estate retainers' },
      { v: '₹7–10L', k: 'typical all-in monthly quote once media is bundled' },
    ],
    body: [
      {
        id: 'backwards', h2: 'Work backwards from units',
        html: ANSWER(P(
          '<strong>Start from how many units you need to sell, multiply by leads per closure, multiply by cost per lead. That is your media budget. Agency fees are a separate line.</strong>'
        )) + TABLE(
          ['Step', 'Working', 'Ten units'],
          [
            ['Units to sell', 'given', '10'],
            ['Leads per closure', '100, conservative', '1,000 leads'],
            ['Cost per lead', '₹350 baseline', '—'],
            ['Media', '1,000 × ₹350', '₹3.5 lakh'],
            ['GST on media', '18%', '₹63,000'],
            ['<strong>Total media</strong>', '', '<strong>₹4.13 lakh</strong>'],
          ]
        ) + P(
          'Against ₹35 lakh units that is ₹3.5 crore of revenue for roughly ₹4 lakh of advertising. The point of doing it this way is not the precision — the inputs are estimates and will move — it is that every number in the chain is one you can argue about with evidence. A percentage-of-revenue figure gives you nothing to argue with.'
        ),
      },
      {
        id: 'fees', h2: 'What the fee side actually costs',
        html: P('Three structures dominate this market, and they carry the risk differently.') + UL([
          '<strong>Monthly retainer.</strong> Specialist real-estate retainers run roughly ₹1–3 lakh a month. Predictable, and the agency carries no volume risk.',
          '<strong>Percentage of media.</strong> Commonly 10–20% of spend. Simple, and it creates an obvious incentive problem: the agency earns more the more you spend, whether or not spending more is right.',
          '<strong>Per qualified lead.</strong> You pay per lead meeting a written definition. The agency carries the volume risk, which is the point, and it only works if the definition is real.',
        ]) + P(
          'Bundled all-in quotes in this market commonly reach <strong>₹7–10 lakh a month</strong> once media is folded into the fee. That is not necessarily bad value, but it is opaque by construction: with media inside the fee you cannot see what was actually spent on advertising, and the agency\'s margin moves inversely with your media budget.'
        ),
      },
      {
        id: 'unbundle', h2: 'Why unbundling matters',
        html: P(
          'Keep media billed directly to you by Meta and Google. Three reasons, none of them about trust:'
        ) + OL([
          '<strong>The invoice is independent evidence.</strong> You can reconcile what was spent against what was reported without asking anyone.',
          '<strong>The incentive stays clean.</strong> If your agency does not profit from your media, "spend more" stops being the default recommendation.',
          '<strong>You keep the account.</strong> Campaign history, audience data and learning are assets. If the account is the agency\'s, they leave with it.',
        ]),
      },
    ],
    faqs: [
      { q: 'What percentage of revenue should real estate marketing be?', a: 'Percentage-of-revenue rules are the wrong tool here. Size the budget from the unit target backwards: units × leads per closure × cost per lead. Ten units at 100 leads per closure and ₹350 a lead is roughly ₹3.5 lakh of media plus GST — and every input in that chain is one you can challenge with evidence, which a percentage is not.' },
      { q: 'What do real estate marketing agencies charge in Bangalore?', a: 'Fees depend on scope and may be structured as retainers, a share of media or payment per qualified lead. Ask for a dated quote with media, production and taxes separated. QDnCo publishes its own commercial terms; our ad snapshot is not a market-wide pricing survey.' },
      { q: 'Should media spend be billed through the agency?', a: 'No. Keep it billed directly to you by Meta and Google. The platform invoice is independent evidence of what was actually spent, the agency does not profit from recommending more spend, and you retain the ad account with its campaign history and audience data when the engagement ends.' },
      { q: 'Is a percentage-of-media fee a problem?', a: 'It creates an incentive worth naming: the agency earns more when you spend more, regardless of whether spending more is the right call. It is workable when the percentage is modest and the reporting is genuinely transparent, but it should never be the only accountability in the arrangement.' },
    ],
    related: ['cost-per-qualified-lead-real-estate', 'real-estate-performance-marketing-bangalore', 'what-counts-as-a-qualified-lead'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'real-estate-crm-and-lead-funnel',
    h1: 'CRM and lead funnel setup for property developers',
    blurb: 'Where leads die between the ad and the sales call.',
    title: 'Real Estate CRM And Lead Funnel Setup | QDnCo',
    desc: 'Where property leads die between the ad and the sales call — routing, response time, qualification at intake, and the weekly report that matters.',
    eyebrow: 'Operations',
    mins: 7,
    keywords: ['real estate CRM', 'lead funnel setup', 'lead routing', 'real estate sales pipeline'],
    lede: 'The most expensive failure in real estate marketing is not a bad campaign. It is a good campaign whose leads sit in an inbox for two days. Nothing on the media side recovers from a broken handoff.',
    facts: [
      { v: 'Minutes', k: 'the window in which response time still matters' },
      { v: 'Weekly', k: 'cadence for cost, quality and scaling review' },
      { v: '5', k: 'qualification conditions applied at intake' },
    ],
    body: [
      {
        id: 'where-leads-die', h2: 'Where leads die',
        html: ANSWER(P(
          '<strong>Leads are lost at four points: the handoff from platform to CRM, the delay before first contact, the absence of an owner, and the absence of a follow-up sequence.</strong> All four are operational, and none of them is fixed by better targeting.'
        )) + UL([
          '<strong>The handoff.</strong> Leads arriving by email, or in a spreadsheet pulled once a day, are already stale. Route them into the CRM in real time.',
          '<strong>Response time.</strong> In a category where the buyer is enquiring on several projects the same evening, the first credible caller has a structural advantage. Minutes, not hours.',
          '<strong>Ownership.</strong> A lead assigned to nobody is worked by nobody. Assignment should happen at intake, automatically.',
          '<strong>Follow-up.</strong> A single call is not a follow-up sequence. Most site visits come from the second, third or fourth contact.',
        ]),
      },
      {
        id: 'setup', h2: 'What a working setup looks like',
        html: OL([
          '<strong>Real-time routing.</strong> Platform lead form to CRM without a human step, with an alert to the assigned owner.',
          '<strong>Qualification at intake.</strong> The five conditions applied when the lead lands, so the sales team\'s time goes to leads that meet them.',
          '<strong>Source preserved end to end.</strong> Campaign, ad set and creative carried through to the CRM record. Without this you cannot tell which creative produced bookings, only which produced forms.',
          '<strong>Status that means something.</strong> A small set of stages everyone uses the same way beats a large set nobody maintains.',
          '<strong>Feedback to the platform.</strong> Push qualified status back so bidding optimises toward leads the sales team can work rather than toward form fills.',
        ]),
      },
      {
        id: 'reporting', h2: 'The reporting that keeps it honest',
        html: P('One weekly report, five numbers, no commentary needed to interpret them:') + UL([
          'Spend',
          'Cost per qualified lead',
          'Sales-ready percentage',
          'Site visits booked',
          'The scaling decision taken, and why',
        ]) + P(
          'The last line is the one that matters. A report that shows numbers without saying what was decided on the strength of them is a status update, not management. If nothing changed, that should be stated too — deciding to hold is a decision.'
        ),
      },
    ],
    faqs: [
      { q: 'How fast should a real estate lead be contacted?', a: 'Within minutes. Buyers enquire on several projects in the same session, and the first credible caller has a structural advantage that no amount of media optimisation recovers. A campaign producing excellent leads into a queue that is worked the next morning will underperform a mediocre campaign with instant response.' },
      { q: 'What should a real estate CRM track for each lead?', a: 'Source down to campaign, ad set and creative; the five qualification conditions and whether each is met; assigned owner; contact attempts with outcomes; and current stage. Without source carried through to the record you can see which creative produced forms but not which produced bookings, which is the only version worth knowing.' },
      { q: 'Should qualified-lead status be sent back to the ad platform?', a: 'Yes, where the platform supports it. Feeding qualified status back lets bidding optimise toward leads the sales team can actually work rather than toward whatever produces the most form fills. Without that feedback the platform is optimising for a proxy and will find the cheapest version of it.' },
      { q: 'How often should campaign performance be reviewed?', a: 'Weekly, on five numbers: spend, cost per qualified lead, sales-ready percentage, site visits booked, and the scaling decision taken. Monthly is too slow to catch quality drift — by the time a monthly report shows it, a month of budget has already followed it.' },
    ],
    related: ['what-counts-as-a-qualified-lead', 'cost-per-qualified-lead-real-estate', 'real-estate-performance-marketing-bangalore'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'pre-launch-eoi-playbook',
    h1: 'The pre-launch and EOI campaign playbook',
    blurb: 'How to build demand before inventory is sellable.',
    title: 'Pre-Launch And EOI Campaign Playbook | QDnCo',
    desc: 'Running a pre-launch or EOI campaign: what to promise, what not to, and how to measure a phase that has no bookings yet.',
    eyebrow: 'Playbook',
    mins: 6,
    keywords: ['pre-launch campaign', 'EOI real estate', 'expression of interest property', 'property launch marketing'],
    lede: 'A pre-launch campaign sells a decision to pay attention, not a flat. That distinction governs everything about how it should be built and how it should be judged, and getting it wrong produces a database of people who will not answer the phone at launch.',
    facts: [
      { v: 'Interest', k: 'what is being collected, not commitment' },
      { v: 'Real', k: 'the only kind of scarcity worth advertising' },
      { v: 'Warm-rate', k: 'the metric that predicts launch performance' },
    ],
    body: [
      {
        id: 'what-selling', h2: 'What you are actually selling',
        html: ANSWER(P(
          '<strong>In pre-launch you are buying a qualified audience you can activate on launch day, not bookings.</strong> The campaign should be judged on how many of those people are still reachable and still interested when inventory opens — not on how many registrations it produced.'
        )) + P(
          'This is why registration volume is a vanity metric at this stage. Ten thousand registrations that go cold in six weeks are worth less than four hundred that convert to site visits in the first fortnight, and the cheap version is almost always the first one.'
        ),
      },
      {
        id: 'promise', h2: 'What to promise, and what not to',
        html: P('Pre-launch is where compliance exposure is highest, because the project is least defined.') + UL([
          '<strong>Safe:</strong> the location, the corridor, the developer\'s track record, the unit configurations under consideration, the stage the project is at, and an honest statement that pricing is indicative.',
          '<strong>Dangerous:</strong> a firm price, a possession date, amenities not yet approved, and any scarcity claim you cannot evidence.',
          '<strong>Non-negotiable:</strong> if the project is registrable and not yet registered, that determines what can be advertised at all. That is a question for the developer\'s counsel, before the campaign, not after.',
        ]) + P(
          '"Founder allocation", "EOI stage", "only 20 units at this price" — these work precisely because buyers believe they are real. Used when they are not, they poison the launch they were meant to accelerate.'
        ),
      },
      {
        id: 'measuring', h2: 'Measuring a phase with no bookings',
        html: OL([
          '<strong>Cost per registration.</strong> The volume metric. Necessary, insufficient.',
          '<strong>Qualification rate at intake.</strong> The same five conditions. A pre-launch list that fails them is a list of names.',
          '<strong>Warm-rate at reactivation.</strong> Contact a sample two to three weeks after registration. What proportion still remember the project and still want the call? This is the number that predicts launch performance, and almost nobody measures it.',
          '<strong>Site-visit conversion at launch.</strong> The retrospective verdict on the whole phase.',
        ]) + P(
          'The third one is the useful one and it costs almost nothing to run. A pre-launch list with a 15% warm rate and one with a 60% warm rate will behave completely differently on launch day, and you can know which you have three weeks before it matters rather than on the day.'
        ),
      },
    ],
    faqs: [
      { q: 'What is an EOI campaign in real estate?', a: 'An expression-of-interest campaign collects registrations from prospective buyers before inventory is formally on sale, so there is a warm audience to activate at launch. It sells a decision to pay attention rather than a flat, which is why it should be judged on how many registrants are still reachable and interested at launch — not on registration volume.' },
      { q: 'Can you advertise a price during pre-launch?', a: 'Indicative pricing can usually be communicated if it is clearly labelled as indicative and subject to change. A firm price for inventory that is not yet sellable is the risky version. Where the project is registrable and not yet registered, what can be advertised at all is a legal question for the developer\'s counsel before the campaign starts.' },
      { q: 'How do you measure a pre-launch campaign with no sales?', a: 'Cost per registration, qualification rate at intake, and — the one that actually predicts launch performance — warm-rate at reactivation. Contact a sample two to three weeks after registration and measure what proportion still remember the project and still want the call. A 15% warm rate and a 60% warm rate behave completely differently on launch day.' },
      { q: 'Is scarcity marketing allowed in real estate advertising?', a: 'Scarcity claims are allowed when they are true and evidenced. "Only 20 units at this price" is fine if there are twenty units at that price. Used when it is not true it is both a compliance exposure under the accuracy requirements of the Act and a fast way to lose the trust of the exact audience you spent the pre-launch budget building.' },
    ],
    related: ['rera-compliant-advertising', 'real-estate-performance-marketing-bangalore', 'meta-ads-for-real-estate-launches', 'real-estate-crm-and-lead-funnel'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'channel-partner-vs-direct-demand',
    h1: 'Channel partner demand and direct buyer demand are different products',
    blurb: 'Why mixing the two pools corrupts both.',
    title: 'Channel Partner vs Direct Buyer Demand | QDnCo',
    desc: 'Why channel-partner and end-buyer acquisition belong in separate pools, and how the creative, funnel and measurement differ.',
    eyebrow: 'Strategy',
    mins: 6,
    keywords: ['channel partner marketing', 'real estate broker acquisition', 'direct buyer demand'],
    lede: 'Most developer campaigns run one funnel and hope it serves both audiences. It cannot. A channel partner and an end buyer want opposite things from the same building, and an ad that speaks to one is close to noise for the other.',
    facts: [
      { v: '2', k: 'separate pools, separate budgets, separate reporting' },
      { v: 'Margin', k: 'what a partner is buying' },
      { v: 'A home', k: 'what an end buyer is buying' },
    ],
    body: [
      {
        id: 'different', h2: 'What each audience is actually buying',
        html: ANSWER(P(
          '<strong>A channel partner is buying inventory they can move, a margin they can rely on and a developer who pays on time. An end buyer is buying a home, a commute and a price they can defend to their family.</strong> The same project satisfies both, but almost no single advertisement does.'
        )) + TABLE(
          ['', 'Channel partner', 'End buyer'],
          [
            ['Motivation', 'Commission, velocity, reliability', 'Home, location, value'],
            ['Decides on', 'Payout, saleability, developer reputation', 'Commute, configuration, price, trust'],
            ['Timeline', 'Immediate — they have buyers now', 'Weeks to months'],
            ['Volume', 'Small audience, high value each', 'Large audience, lower value each'],
            ['Objection', '"Will I actually get paid?"', '"Is this worth ₹1.5 crore?"'],
          ]
        ),
      },
      {
        id: 'why-separate', h2: 'Why mixing them corrupts the numbers',
        html: P('Beyond the creative problem, there is a measurement problem that is easy to miss.') + UL([
          '<strong>Blended cost per lead is meaningless.</strong> Partner leads are far more expensive and worth far more. Averaged together, the blended number describes neither and hides both.',
          '<strong>The algorithm optimises to the cheaper pool.</strong> Given one campaign and a lead goal, the platform finds the cheapest leads — which will be end buyers — and partner acquisition quietly stops.',
          '<strong>Qualification differs.</strong> "Budget-matched" means something different for someone buying for themselves and someone selling to others. One definition cannot serve both.',
        ]),
      },
      {
        id: 'running', h2: 'Running them properly',
        html: OL([
          '<strong>Separate campaigns, separate budgets.</strong> Not separate ad sets in one campaign, where the budget will drift to the cheaper pool.',
          '<strong>Separate creative.</strong> Partner creative leads with payout structure, inventory and reliability. Buyer creative leads with commute, configuration and price.',
          '<strong>Separate landing pages.</strong> Different form, different qualification questions, different next step.',
          '<strong>Separate reporting.</strong> Two cost-per-qualified-lead figures, judged against two different ceilings.',
        ]) + P(
          'This costs more to set up and it is the difference between knowing which audience produced your bookings and guessing.'
        ),
      },
    ],
    faqs: [
      { q: 'Should channel partners and end buyers be in the same campaign?', a: 'No. They are different products sold to different people. Beyond the creative mismatch, a single campaign with a lead goal will optimise toward the cheaper pool — end buyers — and partner acquisition quietly stops while the blended cost per lead looks fine. Separate campaigns, budgets, creative, landing pages and reporting.' },
      { q: 'What does a channel partner want to see in an ad?', a: 'Payout structure, inventory availability, saleability, and evidence the developer pays reliably and on time. Their objection is "will I actually get paid?", not "is this a nice home". Creative that leads with lifestyle imagery is speaking to the wrong motivation entirely.' },
      { q: 'Is channel partner acquisition more expensive per lead?', a: 'Substantially, and it should be. The audience is far smaller and each relationship is worth far more, because a single active partner can move multiple units. Judge partner acquisition against its own cost ceiling derived from expected units per partner, not against the end-buyer cost per lead.' },
    ],
    related: ['meta-ads-for-real-estate-launches', 'real-estate-performance-marketing-bangalore', 'cost-per-qualified-lead-real-estate'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'ai-creative-volume-vs-traditional-agency',
    h1: 'Real estate ad creatives: research, testing and studio production',
    blurb: 'What the creative package includes and how each test earns its place.',
    title: 'AI Creative Volume vs Traditional Agency | QDnCo',
    desc: 'How research guides AI ad creative testing, what the 15-static monthly package includes, and when a property campaign needs separate studio production.',
    eyebrow: 'Differentiator',
    mins: 8,
    keywords: ['AI ad creative real estate', 'performance marketing creative volume', 'traditional vs AI advertising agency', 'Meta ads creative testing'],
    lede: 'The performance package includes fifteen static AI-generated creatives a month and AI ad copy, with refreshes guided by fatigue. Research sets the argument; testing checks buyer response. Studio production is quoted separately. Daily production capacity has not been measured in a timed pilot, so it is not a delivery promise.',
    facts: [
      { v: '15', k: 'static AI creatives included per month' },
      { v: 'AI copy', k: 'included against the research brief' },
      { v: '2', k: 'packages: AI volume included · studio production quoted separately' },
      { v: 'Research → scripts → pipeline → test', k: 'the order that makes volume useful rather than noisy' },
    ],
    body: [
      {
        id: 'claim', h2: 'What “volume game” actually means',
        html: ANSWER(P(
          '<strong>QDnCo includes fifteen static AI-generated creatives per month plus AI ad copy in the performance package.</strong> Each concept starts with a buyer question, an evidenced project fact and a testable argument. Refresh decisions use campaign and sales feedback. Additional production capacity is assessed against the brief; no daily quota or winning result is promised.'
        )) + P(
          'Traditional creative production — brief, concept, shoot, edit, revise — is built for a small number of hero assets. That model is excellent when you need a drone pass, a UGC creator day, or a controlled product shoot. It is the wrong cost structure for finding which of forty hooks the Bangalore buyer actually answers.'
        ),
      },
      {
        id: 'compare', h2: 'Traditional agency vs AI volume pipeline',
        html: TABLE(
          ['Dimension', 'Traditional studio path', 'QDnCo AI volume path'],
          [
            ['Cadence', 'Agreed shoot and edit schedule', '15 statics per month, with fatigue-led refreshes'],
            ['Cost driver', 'Shoot days, editors, talent, revisions', 'Pipeline capacity — already in the fee'],
            ['What you buy', 'A polished hero (or a few)', 'A continuous test surface'],
            ['Fatigue response', 'New brief, new invoice', 'Refresh from the same pipeline'],
            ['Best for', 'Film, drone, UGC/IGC, brand films', 'Meta/Google testing at launch speed'],
          ]
        ) + P(
          'We do not pretend the left column is obsolete. We refuse to make you pay left-column rates for right-column work.'
        ),
      },
      {
        id: 'included', h2: 'What is included — and what is not',
        html: P('<strong>Included in every package</strong>') + UL([
          'AI-generated ad copy — hooks, angles, CTAs, written against the research brief',
          'Fifteen static AI-generated ad creatives per month in the grade of the ad reel',
          'Creative refresh when fatigue or sales-ready rate says the angle is dying',
          'No separate creative fee for the included fifteen static creatives',
        ]) + P('<strong>Quoted separately — the studio package</strong>') + UL([
          'Professional shoot and product shoot',
          'Professional edit',
          'Videographers',
          'Drone cinematography',
          'UGC and IGC creator content',
          'Motion graphics and industry-standard graphic design',
        ]) + P(
          'Studio work runs through creative agencies we partner with, priced per project, and commissioned only after you approve the brief. Two doors: volume inside the fee, or studio when the brief genuinely needs a camera.'
        ),
      },
      {
        id: 'stack', h2: 'Volume only works after research',
        html: P(
          'Fifty weak ads a day is just expensive noise. The stack that makes volume a weapon is the same stack the rest of the practice runs on:'
        ) + OL([
          '<strong>Research gate.</strong> Buyer interviews, desk research, historical performance, and scheduled scrapes of what is already spending in the catchment.',
          '<strong>Script pack.</strong> Hooks and angles written against findings — commute, PSF, approval, partner margin — not against taste.',
          '<strong>Pipeline.</strong> AI systems produce the daily variant batch from that pack.',
          '<strong>Performance layer.</strong> Meta and Google; weekly cost per lead and sales-ready review.',
          '<strong>Scale on evidence.</strong> Winners get budget; losers die; the next batch replaces them.',
        ]) + P(
          'That is why the differentiator is not “we use AI.” It is research-intensity plus a volume engine plus strategy — the combination that puts a launch in front of the market faster than a studio queue.'
        ),
      },
      {
        id: 'when-studio', h2: 'When you should still buy the studio package',
        html: P(
          'Choose traditional production when the asset’s job is trust, place, or craft that a generated still cannot carry: a drone master of the site, a founder-led walkthrough, creator UGC for social proof, or a controlled interior shoot for high-ticket inventory. Use the volume pipeline for the testing surface that decides which message deserves that budget.'
        ) + P(
          'Most launches need both over a cycle — volume first to learn, studio later to deepen the winners — which is why they are priced as different packages rather than bundled into an opaque “creative fee.”'
        ),
      },
    ],
    faqs: [
      { q: 'What creative work is included?', a: 'Fifteen static AI-generated creatives per month and AI ad copy are included, with fatigue-led refreshes. Studio production, including shoots, drone, UGC/IGC, professional editing and motion graphics, is quoted separately.' },
      { q: 'Is daily creative volume guaranteed?', a: 'No. Daily capacity has not been established by a timed production pilot. The package commits to fifteen static AI creatives per month; research, review and testing determine which assets are ready to run.' },
      { q: 'Are AI ads lower quality than studio ads?', a: 'They are a different job. The reel on our site is the quality bar for the volume path. Studio craft still wins for film, drone, and creator work — which is why that path exists as its own package rather than being pretended away.' },
      { q: 'Doesn’t every agency use AI now?', a: 'Using a tool is common. The useful distinction is a documented research gate, a clear monthly creative scope and sales feedback that guides the next test.' },
    ],
    related: ['meta-ads-for-real-estate-launches', 'real-estate-performance-marketing-bangalore', 'how-much-should-a-developer-spend', 'cost-per-qualified-lead-real-estate'],
  },
]
