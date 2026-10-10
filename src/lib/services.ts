/** Services — verbatim scope from `Client Shareable Portfolio.md`, expanded into deliverables. */

export type Service = {
  id: string
  name: string
  blurb: string
  deliverables: string[]
}

export const SERVICES: Service[] = [
  {
    id: '01',
    name: 'Performance Marketing',
    blurb: 'Meta · Google · LinkedIn — planning, launch, optimization.',
    deliverables: [
      'Full-funnel campaign architecture (TOF / MOF / BOF / RTG)',
      'Platform mix and budget pacing',
      'Weekly CPL, CTR and lead-quality optimization',
      'Scale decisions gated on proven unit economics',
    ],
  },
  {
    id: '02',
    name: 'Go-to-Market & Research',
    blurb: 'Market mapping · personas · 12-step campaign intelligence.',
    deliverables: [
      'TAM sizing and competitive landscape',
      'Persona and segmentation mapping',
      'Meta Ads Library + Google Transparency competitor scrapes',
      'Pricing strategy, unit economics, risk scenarios',
    ],
  },
  {
    id: '03',
    name: 'Lead Generation',
    blurb: 'CPL/CPA optimization · broker & channel-partner targeting.',
    deliverables: [
      'Cost-per-lead and cost-per-acquisition targets set against ticket size',
      'Channel-partner and broker demand run as a separate pool',
      'Lead-quality scoring against sales feedback',
      'Geo and catchment strategy',
    ],
  },
  {
    id: '04',
    name: 'Funnel & CRO',
    blurb: 'Landing pages · retargeting · conversion tracking.',
    deliverables: [
      'Landing page design and build',
      'Retargeting ladders by funnel stage',
      'Conversion tracking and event design',
      'A/B testing across creative, offer and layout',
    ],
  },
  {
    id: '05',
    name: 'Tracking & CRM',
    blurb: 'Pixel · GA4 · GTM · HubSpot · Zoho automation.',
    deliverables: [
      'Meta Pixel, GA4 and GTM implementation',
      'Real-time CRM lead routing and alerts',
      'Sales/CIS process alignment',
      'Weekly client dashboard — no black box',
    ],
  },
  {
    id: '06',
    name: 'Growth Marketing',
    blurb: 'SEO · GEO · GBP · citations · PR · backlinks.',
    deliverables: [
      'Google Business Profile and local SEO',
      'Citation and review velocity',
      'Backlink and PR groundwork',
      'Organic demand as a compounding channel',
    ],
  },
  {
    id: '07',
    name: 'Creative Direction',
    blurb: 'UGC · drone · influencer · graphics via agency partners.',
    deliverables: [
      'Creative script pack — hooks, value props, CTAs',
      'High-volume hook testing',
      'UGC, drone and influencer production via partners',
      'Approval cycle before any production spend',
    ],
  },
  {
    id: '08',
    name: 'AI Workflows',
    blurb: 'Copy generation · reporting automation · n8n / Zapier pipelines.',
    deliverables: [
      'Automated reporting pipelines',
      'Research and scrape automation',
      'Copy generation systems with brand constraints',
      'n8n / Zapier operational plumbing',
    ],
  },
]
