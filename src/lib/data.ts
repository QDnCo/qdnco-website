/**
 * Every figure below traces to `Client Shareable Portfolio.md`.
 * Where a number needs a definition to survive scrutiny, it carries a `note`
 * that the UI exposes on hover — the footnote is the credibility mechanism.
 */

export const IDENTITY = {
  name: 'V. Sai Kavshik',
  role: 'AI GTM Marketer · Consultant',
  disciplines: 'Performance Marketing · GTM Strategy · CRM & AI Automation',
  firm: 'QD & Co.',
  city: 'Bangalore',
  email: 'qdnco01@gmail.com',
  phone: '+91 88611 79992',
  linkedin: 'https://www.linkedin.com/in/v-s-kavshik',
  thesis: 'Built businesses before advising them. Operator first, consultant second.',
}

export const TRACK_RECORD = [
  {
    value: '₹5–6L',
    unit: '/month',
    label: 'Ad spend managed',
    note: 'Peak monthly media under management across active accounts.',
  },
  {
    value: '₹31–37',
    unit: 'Cr',
    label: 'Pipeline influenced',
    note: 'Lead value at site-visit stage, valued at project ticket price. Pipeline, not closed revenue.',
  },
  {
    value: '625×',
    unit: 'peak',
    label: 'Return class · Indium',
    note: 'Pipeline value influenced per ₹1 of media spend on the Indium engagement — ₹40k spend against ₹2.75 Cr of site-visit-stage pipeline in 14 days. Not closed revenue.',
  },
  {
    value: '500+',
    unit: 'clients',
    label: 'Founder venture · QD Prints',
    note: '10,000+ orders delivered. Paytm, Zepto, Google DSC and campus accounts.',
  },
]

export const META_GRID = {
  whatIDo: 'I build demand systems for launches where the ticket size is measured in crores.',
  services: [
    'Performance Marketing (Meta / Google / LinkedIn)',
    'Go-to-Market & Market Research',
    'Lead Generation · CPL/CPA Optimization',
    'Funnel & CRO · Landing Pages',
    'Tracking & CRM (GA4 · GTM · HubSpot · Zoho)',
    'AI Workflows (n8n / Zapier pipelines)',
  ],
  sectors: ['Real Estate', 'Education & EdTech', 'SaaS', 'D2C / B2B'],
}

export const MARQUEE_ITEMS = [
  'GODREJ PROPERTIES',
  '₹266 CPL',
  'BRIGADE GROUP',
  '51% SALES-READY',
  'FBC KUMAR DEVELOPERS',
  '₹2.75 CR PIPELINE',
  'INDIUM GROUP',
  '14 DAYS',
  'MARGA EDUCATION',
  '₹162 CPL',
  'NETRI LMS',
  '27+ ENROLLMENTS',
  'ROBOPRENR',
  '10,000+ ORDERS',
  'QD PRINTS',
  '₹5–6L / MONTH',
]

export type JourneyStation = {
  year: string
  venture: string
  built: string
  proof: string
  detail: string
}

export const JOURNEY: JourneyStation[] = [
  {
    year: '2023',
    venture: 'Quill Dynamics',
    built: 'Product + sales, from zero',
    proof: '100+ units in 3–4 months',
    detail:
      'First venture. Learned demand the hard way — by having to create it for a product I owned, with no budget and no brand.',
  },
  {
    year: '2024',
    venture: 'QD Prints LLP',
    built: 'Corporate merch at scale',
    proof: '500+ clients · 10,000+ orders',
    detail:
      'Paytm, Zepto, Google DSC and campus accounts. P&L, supply chain and client acquisition owned end to end.',
  },
  {
    year: '2024',
    venture: 'QD & Co.',
    built: 'Performance + AI GTM practice',
    proof: '₹5–6L / month ad spend',
    detail:
      'The operating discipline turned into a practice — research-led acquisition systems instead of campaign management.',
  },
  {
    year: '2025 →',
    venture: 'Consulting delivery',
    built: 'Launches across three sectors',
    proof: 'Real estate · EdTech · SaaS',
    detail:
      'High-ticket residential launches, admissions funnels and SaaS acquisition — all running the same delivery system.',
  },
]

export type Phase = {
  id: string
  title: string
  duration: string
  live: boolean
  summary: string
  points: string[]
}

export const PHASES: Phase[] = [
  {
    id: '0',
    title: 'Questionnaire & Business Learning',
    duration: '~2 weeks',
    live: false,
    summary: 'Research does not start until the brief is real.',
    points: [
      'Business model · goals · units · ticket · sales process',
      'Past ad history and brand assets audited',
      'Catchment, competitors, capacity, decision-makers',
      'Output: a brief that gates everything downstream',
    ],
  },
  {
    id: '1',
    title: 'Market Research & Intelligence',
    duration: '~2 weeks',
    live: false,
    summary: 'Primary, secondary and historical — run in parallel.',
    points: [
      'Primary — ICP interviews: what stops the scroll, what builds credibility',
      'Secondary — 12-step roadmap: TAM, competitive landscape, personas, pricing, unit economics',
      'Live scrapes — Meta Ads Library, Google Ads Transparency Center, competitor creative',
      'Historical — what worked before, what failed, what not to repeat',
    ],
  },
  {
    id: '2',
    title: 'Campaign Architecture & Creative Direction',
    duration: '10 days – 2 weeks',
    live: false,
    summary: 'Nothing goes into production without a positive approval.',
    points: [
      'Full-funnel structure — TOF / MOF / BOF / RTG',
      'Creative script pack: hooks, value props, high-CTR angles, CTAs',
      'Approval loop — negative routes back to live references',
      'Creative team produces only after client sign-off',
    ],
  },
  {
    id: '3',
    title: 'A/B Testing + Market Launch',
    duration: '~1 month',
    live: true,
    summary: 'You enter the market here. Budget works in market, not in decks.',
    points: [
      'Creative — hooks, formats, UGC vs graphic vs video',
      'Budget — pacing, test vs scale splits',
      'Allocation — TOF / MOF / BOF / RTG weights',
      'Platform, persona, segmentation and market response',
    ],
  },
  {
    id: '4',
    title: 'Lead Funnel · CRM · Dashboard',
    duration: '~1 week',
    live: true,
    summary: 'Absolute transparency — dashboard plus weekly reporting. No black box.',
    points: [
      'Sales/CIS process mapped and aligned',
      'Lead funnel designed and executed with sales',
      'Real-time CRM routing and alerts',
      'Weekly client dashboard: spend, CPL, quality, scaling decisions',
    ],
  },
  {
    id: '5',
    title: 'Track · Learn · Scale',
    duration: 'Ongoing',
    live: true,
    summary: 'Market response drives budget. Kill what fails, scale what converts.',
    points: [
      'Weekly CPL and lead-quality review',
      'Budget scaling gated on proven unit economics',
      'Creative refresh on fatigue signals',
      'Month 3 — the system is locked and repeatable',
    ],
  },
]

export type Project = {
  index: string
  name: string
  client: string
  sector: 'Real Estate' | 'Education' | 'SaaS'
  location: string
  role: 'Owned' | 'Led' | 'Executed (agency account)'
  band: 'results' | 'active'
  constraint: string
  decisions: string[]
  metrics: { k: string; v: string }[]
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Indium Group',
    client: 'Indium Group',
    sector: 'Real Estate',
    location: 'North Bangalore',
    role: 'Owned',
    band: 'results',
    constraint: '₹40k test budget. Premium residential. 14 days to prove the channel.',
    decisions: [
      'Ran the full research gate before a rupee of spend',
      'Single-market, single-persona test rather than a broad launch',
      'Qualified on sales-readiness, not raw lead count',
      'Scaled only after CPL and quality held for a week',
    ],
    metrics: [
      { k: 'Spend', v: '₹40k' },
      { k: 'Leads', v: '150+' },
      { k: 'CPL', v: '₹266' },
      { k: 'Sales-ready', v: '51%' },
      { k: 'Site visits', v: '27' },
      { k: 'Pipeline', v: '₹2.75 Cr+' },
    ],
  },
  {
    index: '02',
    name: 'Roboprenr',
    client: 'Roboprenr',
    sector: 'Education',
    location: 'Yelahanka · STEAM',
    role: 'Owned',
    band: 'results',
    constraint: 'Zero media budget. Digital presence built from nothing.',
    decisions: [
      'Google Business Profile and local SEO as the entire acquisition channel',
      'Citations and review velocity over paid reach',
      'Enrollment tracked to source, not to traffic',
    ],
    metrics: [
      { k: 'Spend', v: '₹0 (organic)' },
      { k: 'Enrollments', v: '27+' },
      { k: 'Revenue', v: 'up to ₹13L' },
    ],
  },
  {
    index: '03',
    name: 'Brigade Jeevan Sandya',
    client: 'FBC Kumar Developers · Brigade Group',
    sector: 'Real Estate',
    location: 'Kanakapura Rd · South Bengaluru',
    role: 'Led',
    band: 'results',
    constraint: '133 units · 2 acres · 28 floors · 3/4 BHK from 2,100 sqft. Aug 2026 launch.',
    decisions: [
      'Pre-launch and launch architecture split into separate funnels',
      'Meta + Google full-funnel with distinct RTG layer',
      'Media plan sized to unit velocity, not to a spend target',
    ],
    metrics: [
      { k: 'Media plan', v: '₹5L / month' },
      { k: 'Units', v: '133' },
      { k: 'Status', v: 'Launch window' },
    ],
  },
  {
    index: '04',
    name: 'Kumar Platina',
    client: 'Kumar Corp · FBC Kumar Developers',
    sector: 'Real Estate',
    location: 'Nagasandra · Tumkur Rd',
    role: 'Led',
    band: 'results',
    constraint: '184 units · 1.84 acres · 2 towers · 2.5/3 BHK. RERA approved.',
    decisions: [
      'Metro-corridor catchment targeting against the IKEA/Metro anchor',
      'RERA-compliant creative and claim discipline throughout',
      'Channel-partner and broker layer run separately from direct demand',
    ],
    metrics: [
      { k: 'Media plan', v: '₹4L / month' },
      { k: 'Units', v: '184' },
      { k: 'Compliance', v: 'RERA' },
    ],
  },
  {
    index: '05',
    name: 'Netri LMS',
    client: 'Netri',
    sector: 'SaaS',
    location: 'STEAM / EdTech SaaS',
    role: 'Owned',
    band: 'results',
    constraint: 'Controlled launch spend. New category, no existing demand.',
    decisions: [
      'GTM research before the funnel was designed',
      'C1–C4 staged funnel rather than a single conversion goal',
      'Lead forms over landing pages for the first cohort',
    ],
    metrics: [
      { k: 'CPL', v: '₹162' },
      { k: 'Funnel', v: 'C1–C4' },
    ],
  },
  {
    index: '06',
    name: 'Godrej Portfolio',
    client: 'Godrej Properties',
    sector: 'Real Estate',
    location: 'Woodscapes · Tiara · MSR City',
    role: 'Executed (agency account)',
    band: 'results',
    constraint:
      'Enterprise portfolio scale across three projects — ₹1.34 Cr to ₹4.4 Cr ticket sizes.',
    decisions: [
      'Enterprise Meta + Google execution at portfolio budget',
      'Airport-corridor and city-corridor catchments run as separate demand pools',
      'Volume held against a CPL ceiling rather than chasing lowest cost',
    ],
    metrics: [
      { k: 'Portfolio spend', v: '~₹1 Cr / month' },
      { k: 'CPL', v: '~₹450' },
      { k: 'Leads', v: '~22k / month' },
    ],
  },
  {
    index: '07',
    name: 'Marga Education',
    client: 'Marga Education',
    sector: 'Education',
    location: 'Bangalore',
    role: 'Owned',
    band: 'active',
    constraint: 'Ongoing growth partnership — scaling admissions demand.',
    decisions: [
      'Full-funnel demand generation across paid and organic',
      'Campaign architecture, creative direction, tracking and CRM flow',
      'Built to scale as intake grows',
    ],
    metrics: [{ k: 'Status', v: 'Active' }],
  },
  {
    index: '08',
    name: 'LogicLaunch',
    client: 'LogicLaunch',
    sector: 'SaaS',
    location: 'SaaS',
    role: 'Owned',
    band: 'active',
    constraint: 'Campaign-based engagement.',
    decisions: [
      'GTM strategy and funnel design',
      'CRM-connected acquisition',
    ],
    metrics: [{ k: 'Status', v: 'Active' }],
  },
]

export const TOOLS = [
  'Meta Ads',
  'Google Ads',
  'LinkedIn Ads',
  'Meta Ads Library',
  'Google Transparency',
  'GA4',
  'GTM',
  'Meta Pixel',
  'HubSpot',
  'Zoho',
  'n8n',
  'Semrush',
  'Ahrefs',
  'OpenAI',
  'Gemini',
]
