/** Research content: observations, assumptions and source limits are stated separately. */
export const HUB = {
  "title": "Research and Data — Bangalore Real Estate Marketing | QDnCo",
  "h1": "Real estate marketing research, with the evidence attached",
  "desc": "Explore real estate marketing research: a Meta Ad Library audit, a Bangalore market-size model and lead-cost benchmarks with methods and limits.",
  "lede": "A reproducible ad snapshot, a market-planning scenario and historical owner-reported campaign figures. Each page separates observations, assumptions and questions the evidence cannot answer."
}

export const DATASETS = [
  {
    "slug": "meta-ad-library-audit-bangalore-agencies",
    "h1": "51 real estate marketing ads: a reproducible Meta audit",
    "blurb": "51 unique sell-side ad links, 41 advertiser names and a downloadable method.",
    "title": "Meta Ad Library Audit — 51 Marketing Ads | QDnCo",
    "desc": "Explore 51 unique sell-side Meta ad links from an August 2026 snapshot, with 41 advertiser names, downloadable indexes, collection method and limits.",
    "eyebrow": "Primary research",
    "published": "2026-08-09",
    "mins": 7,
    "keywords": [
      "real estate marketing agency Bangalore",
      "Meta Ad Library research",
      "agency pricing transparency",
      "real estate advertising benchmarks"
    ],
    "lede": "Our retained 9 August 2026 snapshot contains 51 unique sell-side ad links across 41 advertiser display names. The sample includes marketing agencies and CRM vendors. This is a keyword-selected view of advertising activity, with a downloadable index so readers can inspect the records and repeat the count.",
    "facts": [
      {
        "v": "51",
        "k": "unique sell-side ad links"
      },
      {
        "v": "41",
        "k": "sell-side advertiser display names"
      },
      {
        "v": "152",
        "k": "retained scored rows; 147 unique links"
      },
      {
        "v": "12",
        "k": "search terms in the collection record"
      }
    ],
    "method": {
      "collected": "9 August 2026; counts reconciled 13 September 2026",
      "how": "Recount of the retained Apify export. Group rows by the collector’s sell/buy label, deduplicate exact library URLs within each group, and count distinct advertiser display-name strings. The raw collection reports 204 items; 152 scored rows were retained. Three actors appear in the fallback log. Search terms and the source-file checksum are in the method download.",
      "n": "Sell: 56 retained rows, 51 unique ad links, 41 advertiser names. Buy: 96 retained rows, 96 unique ad links, 45 advertiser names. The combined retained set has 147 unique links.",
      "limits": "Not a census of Bangalore agencies. CRM vendors are included; names are not verified legal entities or unique Page IDs. The export records one collection error. Search terms and collector labels constrain coverage; no agency websites were exhaustively audited. Retained run-age fields do not prove continuous delivery, spend, profitability or demand. The original raw 204 items are not all available in this retained export."
    },
    "body": [
      {
        "id": "headline",
        "h2": "What the retained data establishes",
        "html": "ANSWER:<strong>The August snapshot contains 51 unique sell-side ad links across 41 advertiser-name strings, plus 96 buy-side links across 45 names.</strong> Five duplicate sell-side URLs remain among the 152 scored rows. Counting rows as unique ads would overstate this retained sample.|||The collector labels describe how records were grouped for research. They do not establish that every seller is an agency, that every advertiser serves Bengaluru, or that every buy-side record is in Karnataka."
      },
      {
        "id": "downloads",
        "h2": "Inspect the records and repeat the count",
        "html": "LIST:<a href=\"/data/downloads/meta-audit-2026-08-09-sell.csv\" download>Download the 51-link sell-side index (CSV)</a>.;;<a href=\"/data/downloads/meta-audit-2026-08-09-buy.csv\" download>Download the 96-link buy-side context index (CSV)</a>.;;<a href=\"/data/downloads/meta-audit-2026-08-09-method.json\" download>Download search terms, counts, method and source checksum (JSON)</a>.|||Each CSV contains the snapshot date, collector category, advertiser name, library link, recorded ad age and matched search term. Ad copy, images, personal contacts and account credentials are excluded. Library links may change availability after the snapshot.|||To reproduce the index counts, count distinct library_url values and advertiser_name strings in each CSV. The JSON separately records the pre-deduplication row counts from the retained export. When the same link matched more than one search term, the first retained row supplies the displayed term and age."
      },
      {
        "id": "interpretation",
        "h2": "Activity is a starting point for questions",
        "html": "An advertiser’s continued presence can justify investigating its offer and creative. It cannot tell you whether the campaign produced qualified enquiries or bookings. The retained export has no spend, conversion or revenue fields.|||Compare the promise, destination, price presentation and qualification process against your own brief. Then test the relevant hypothesis in your own account with a defined lead-quality measure. A long-running ad is a research reference, not a proven winning creative."
      },
      {
        "id": "pricing",
        "h2": "What we can say about transparency",
        "html": "This snapshot does not establish that no agency publishes prices, sells research or defines a qualified lead. Captured ad excerpts are not an exhaustive review of websites, proposals or commercial terms. Earlier wording made that unsupported inference; this revision withdraws it.|||Our own commitments remain concrete: <a href=\"/pricing/index.html\">published commercial terms</a>, a documented research process and <a href=\"/answers/what-counts-as-qualified-lead.html\">a written qualified-lead definition</a>. Buyers can assess these directly without a claim that competitors lack them."
      },
      {
        "id": "reuse",
        "h2": "How to cite or extend the audit",
        "html": "Cite QDnCo, the snapshot date, this page and the size of the relevant subset. Describe it as a keyword-selected snapshot. Preserve the distinction between rows, unique links and advertiser names.|||For a stronger follow-up, retain Page IDs, document geographic inclusion rules, review landing pages with dates and predefine the coding questions before collecting new records. That would support a different study; these downloads do not substitute for it."
      }
    ],
    "faqs": [
      {
        "q": "How many agencies were audited?",
        "a": "The retained sell-side sample has 41 advertiser display names, including CRM vendors. It is not a verified count of 41 agencies. There are 51 unique sell-side ad URLs."
      },
      {
        "q": "Does this audit show that agencies hide their prices?",
        "a": "No. The retained ad snapshot cannot establish an absence of prices across websites or proposals. Earlier wording overstated this conclusion and has been withdrawn."
      },
      {
        "q": "Does a long-running ad prove profitability?",
        "a": "No. The export has an ad-age field but no spend, conversion or revenue data. Age cannot establish delivery continuity or commercial results."
      },
      {
        "q": "Can I download the underlying records?",
        "a": "Yes. This page links to sell-side and buy-side CSV indexes plus a JSON method record. They contain public ad links and collection metadata, without reproducing ad copy or images."
      }
    ],
    "related": [
      "bangalore-developer-marketing-market-size",
      "real-estate-cost-per-lead-benchmarks"
    ],
    "spatialCoverage": "India-focused real estate search terms; advertiser geography not independently verified",
    "temporalCoverage": "2026-08-09",
    "downloads": [
      {
        "path": "/data/downloads/meta-audit-2026-08-09-sell.csv",
        "encodingFormat": "text/csv"
      },
      {
        "path": "/data/downloads/meta-audit-2026-08-09-buy.csv",
        "encodingFormat": "text/csv"
      },
      {
        "path": "/data/downloads/meta-audit-2026-08-09-method.json",
        "encodingFormat": "application/json"
      }
    ]
  },
  {
    "slug": "bangalore-developer-marketing-market-size",
    "h1": "Bengaluru developer marketing: a transparent sizing scenario",
    "blurb": "A cited launch input and adjustable assumptions, not a measured market total.",
    "title": "Bangalore Developer Marketing Market Size | QDnCo",
    "desc": "A model of the Bangalore developer-marketing market, with assumptions, arithmetic and sensitivity to average project size. This is an estimate.",
    "eyebrow": "Planning scenario",
    "published": "2026-08-11",
    "mins": 6,
    "keywords": [
      "Bangalore real estate market size",
      "developer marketing TAM",
      "real estate launches Bengaluru",
      "property marketing market India"
    ],
    "lede": "ANAROCK reports 24,400 Bengaluru residential launches in Q1 2026. We use that quarterly input to demonstrate a market-sizing method. Every subsequent step is an assumption or calculation; the output is neither observed agency demand nor a forecast.",
    "facts": [
      {
        "v": "24,400",
        "k": "Q1 2026 launches, ANAROCK-reported"
      },
      {
        "v": "97,600",
        "k": "units in a four-quarter run-rate scenario"
      },
      {
        "v": "~325",
        "k": "project equivalents at an assumed 300 units"
      },
      {
        "v": "₹39.04 Cr",
        "k": "conditional annual fee pool before selection"
      }
    ],
    "method": {
      "collected": "Q1 2026 source; model revised 13 September 2026",
      "how": "Multiply ANAROCK’s reported Q1 launches by four; divide by an assumed 300 units per project equivalent; apply an assumed ₹1 lakh monthly agency fee for 12 months. A separate 50% selection scenario halves the result.",
      "n": "24,400 residential units reported for Q1 2026. This is a launch-volume input, not a sample of agency contracts or an observed annual project count.",
      "limits": "Quarterly activity may be seasonal. Unit counts include project phases and do not identify distinct engagements. Average project size, agency take-up, fee and engagement duration are unmeasured assumptions. The 50% selection factor is not a measured share clearing a budget threshold. Excludes existing inventory, non-residential work and other geographies."
    },
    "body": [
      {
        "id": "source",
        "h2": "The sourced input and the correction",
        "html": "<a href=\"https://websitemedia.anarock.com/media/Bengaluru_Q1_2026_Residential_Market_Viewpoints_84d41ec09a.pdf\">ANAROCK’s Bengaluru Q1 2026 Residential Market Viewpoints</a> reports 24,400 launches. Read the original report for its coverage and rounding conventions.|||An earlier version used 27,000 from a search snippet. We replaced it with this directly checked report on 13 September 2026. The revised arithmetic below should not be combined with estimates from another provider without reconciling coverage."
      },
      {
        "id": "model",
        "h2": "Calculate a scenario, step by step",
        "html": "ANSWER:<strong>With the assumptions below, the conditional fee pool is ₹39.04 crore; a 50% selection scenario gives ₹19.52 crore. Neither figure is a measured addressable or serviceable market.</strong>|||TABLE:Step|Basis|Scenario value;;Quarterly launches|ANAROCK Q1 2026 reported units|24,400;;Four-quarter run rate|24,400 × 4; assumes the quarter repeats|97,600 units;;Project equivalents|97,600 ÷ assumed 300 units|325.33 equivalents;;Fee per equivalent|Assumed ₹1 lakh/month × 12 months|₹12 lakh;;Conditional fee pool|325.33 × ₹12 lakh; unrounded calculation|₹39.04 crore;;Optional selection scenario|Assumed 50% take-up or eligibility|₹19.52 crore"
      },
      {
        "id": "sensitivity",
        "h2": "Show how assumptions change the answer",
        "html": "TABLE:Assumed units per equivalent|Equivalent count|Fee pool at ₹12 lakh/year|At assumed 50% selection;;200|488|₹58.56 crore|₹29.28 crore;;300|325.33|₹39.04 crore|₹19.52 crore;;400|244|₹29.28 crore|₹14.64 crore|||A six-month engagement instead of twelve halves every fee-pool result. A lower fee or agency take-up reduces it again. These independent assumptions matter as much as project size; selecting only an optimistic combination would create false precision."
      },
      {
        "id": "use",
        "h2": "What this helps you decide",
        "html": "Use the model to identify which inputs need field research: unique project and phase counts, in-house versus agency delivery, actual contract duration and fee distribution. A list of verified potential buyers is more useful for sales planning than the fee-pool headline.|||This model does not establish QDnCo’s obtainable revenue or prove that demand exceeds delivery capacity. Replace the assumptions with documented observations before using it for hiring or investment decisions."
      }
    ],
    "faqs": [
      {
        "q": "How many residential projects launch in Bengaluru annually?",
        "a": "This model does not measure that count. It produces about 325 project equivalents if one quarter repeats four times and each equivalent has 300 units. Both assumptions require validation."
      },
      {
        "q": "Is 97,600 an annual launch forecast?",
        "a": "No. It is four times a reported quarterly input, used for a planning scenario. It is neither observed annual activity nor an ANAROCK annual forecast."
      },
      {
        "q": "What is the developer marketing market worth?",
        "a": "We have not measured the total. Under the stated fee, duration and project-size assumptions, this scenario gives ₹39.04 crore before selection and ₹19.52 crore at an assumed 50% selection rate."
      }
    ],
    "related": [
      "meta-ad-library-audit-bangalore-agencies",
      "real-estate-cost-per-lead-benchmarks"
    ],
    "temporalCoverage": "2026-01-01/2026-03-31",
    "spatialCoverage": "Bengaluru, India"
  },
  {
    "slug": "real-estate-cost-per-lead-benchmarks",
    "h1": "Real estate lead costs: reported examples and planning limits",
    "blurb": "Historical owner reports, lead-quality arithmetic and limits on comparisons.",
    "title": "Real Estate Cost Per Lead Benchmarks — Bangalore | QDnCo",
    "desc": "Real estate lead-cost benchmarks for Bangalore and Karnataka, with lead quality, campaign context, source notes and limits for comparison.",
    "eyebrow": "Reported examples",
    "published": "2026-08-11",
    "mins": 6,
    "keywords": [
      "real estate cost per lead",
      "CPL benchmark Bangalore",
      "property lead generation cost",
      "real estate marketing benchmarks India"
    ],
    "lede": "These historical figures were reported by QDnCo’s owner. They have not been independently reconciled to dated platform exports and CRM cohorts for this publication. Use the examples to understand measurement, not as an industry benchmark or a forecast for your project.",
    "facts": [
      {
        "v": "₹266",
        "k": "owner-reported residential CPL"
      },
      {
        "v": "51%",
        "k": "owner-reported sales-ready rate in that example"
      },
      {
        "v": "~₹522",
        "k": "₹266 ÷ 51%; calculated useful-lead cost"
      },
      {
        "v": "₹350–500",
        "k": "illustrative CPL planning band; not surveyed"
      }
    ],
    "method": {
      "collected": "Historical reports retained by August 2026; source status reviewed 13 September 2026",
      "how": "Owner-reported figures retained in project notes. Illustrative cost per useful lead equals CPL divided by the quality rate. Underlying reporting periods, denominators and attribution need reconciliation before independently verified case-study claims can be made.",
      "n": "Selected examples, not a pooled or representative sample. The reported total engagement count is not the denominator for these CPL calculations.",
      "limits": "The ₹266/51% example and enterprise portfolio report have different scopes. Enterprise experience may include execution through agency accounts and does not imply a direct developer appointment. Sales-ready is a historical label, not automatically the current contractual qualified-lead definition. No geography-wide or causal targeting conclusion follows from these examples."
    },
    "body": [
      {
        "id": "numbers",
        "h2": "Read the source status with the number",
        "html": "TABLE:Example|Reported figure|Source status and scope;;Premium North Bengaluru residential|₹266 CPL; 51% sales-ready|Owner-reported; export and CRM reconciliation pending;;Enterprise portfolio experience|Approximately 22,000 leads/month at ₹450 CPL|Owner-reported portfolio-level experience through agency accounts; not a result for one named development;;Budget illustration|₹350–500 CPL|Planning assumption; not an industry survey|||The first example gives about ₹522 per sales-ready lead by arithmetic. It does not establish the cost of a booking or collected revenue."
      },
      {
        "id": "quality",
        "h2": "Compare useful leads on consistent definitions",
        "html": "Illustrative comparison: ₹200 CPL at a 15% useful-lead rate gives about ₹1,333 per useful lead. ₹600 CPL at 60% gives ₹1,000. The lower raw CPL has the higher useful-lead cost in this example.|||Define the qualification criteria, duplicate window, reporting period and attribution method before comparing campaigns. Report the raw count and qualified count alongside percentages so small or incomplete cohorts are visible."
      },
      {
        "id": "variance",
        "h2": "Test the drivers instead of assuming them",
        "html": "LIST:<strong>Offer and catchment.</strong> Ticket size, location and buyer readiness can change both acquisition cost and conversion.;;<strong>Targeting.</strong> Broadening an audience may change volume and quality; the direction and size need to be measured.;;<strong>Optimisation and feedback.</strong> CRM qualification signals can support a downstream test when the integration and data quality are reliable. They do not guarantee an improvement.;;<strong>Follow-up.</strong> Contact speed, sales coverage and qualification consistency affect how many form submissions become useful conversations."
      },
      {
        "id": "planning",
        "h2": "Build a booking-cost scenario",
        "html": "For an illustration only, assume a 1% raw-lead-to-booking rate and ₹400 CPL. Ten bookings would require 1,000 leads and ₹4 lakh in media before agency fees and applicable taxes. At 0.5% conversion the same target requires twice the media; at 2% it requires half.|||Use completed sales cohorts to replace these assumptions. A recent lead cohort that has not finished its sales cycle cannot yet establish booking conversion."
      }
    ],
    "faqs": [
      {
        "q": "What is a good real estate CPL in Bengaluru?",
        "a": "There is no universal threshold established by these examples. Evaluate useful-lead and booking costs against your project economics; the ₹350–500 range here is a planning assumption, not a surveyed benchmark."
      },
      {
        "q": "Is the ₹266 CPL independently verified?",
        "a": "No. It is a historical owner-reported example, paired with a reported 51% sales-ready rate. Dated platform and CRM reconciliation remains pending."
      },
      {
        "q": "Are leads always cheaper in Tier-2 Karnataka?",
        "a": "This material does not establish that conclusion. Compare matching offers and complete cohorts in the relevant markets before assuming a geographic discount."
      }
    ],
    "related": [
      "meta-ad-library-audit-bangalore-agencies",
      "bangalore-developer-marketing-market-size"
    ]
  }
]
