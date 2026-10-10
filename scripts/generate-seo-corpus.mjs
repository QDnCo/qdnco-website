/** Generate compact public search references from the maintained page modules. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ANSWERS } from '../answers-content.mjs'
import { AREAS } from '../areas-content.mjs'
import { GUIDES } from '../guides-content.mjs'
import { DATASETS } from '../data-content.mjs'
import { FACTS, PROOF } from '../llms-content.mjs'
import { orgNode, personNode, plain } from '../aeo-shell.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SEO = path.join(ROOT, 'seo')
const SITE = FACTS.site
const updated = process.env.LEGAL_DATE || new Date().toISOString().slice(0, 10)
fs.mkdirSync(SEO, { recursive: true })
const write = (name, value) => fs.writeFileSync(path.join(SEO, name), value + '\n')
const json = (name, value) => write(name, JSON.stringify(value, null, 2))
const clean = (text) => plain(text).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")

// Editorial targets are hypotheses, not measured search demand or difficulty.
const coverage = [
  ['real-estate-marketing', 'Real estate marketing', '/', ['real estate marketing agency', 'real estate marketing Bengaluru', 'property marketing agency'], 'commercial'],
  ['developer-launch', 'Developer launch marketing', '/guides/real-estate-performance-marketing-bangalore.html', ['property launch marketing', 'real estate performance marketing Bangalore'], 'commercial'],
  ['lead-qualification', 'Lead qualification', '/guides/what-counts-as-a-qualified-lead.html', ['qualified real estate lead definition', 'real estate lead qualification'], 'informational'],
  ['lead-economics', 'Lead and booking economics', '/guides/cost-per-qualified-lead-real-estate.html', ['cost per qualified lead real estate', 'CPL versus CPQL'], 'informational'],
  ['meta-ads', 'Meta acquisition', '/guides/meta-ads-for-real-estate-launches.html', ['Meta ads real estate developers', 'Facebook ads property launch'], 'commercial'],
  ['google-ads', 'Google acquisition', '/guides/google-ads-for-real-estate.html', ['Google ads real estate', 'property search campaigns'], 'commercial'],
  ['creative', 'Creative direction', '/guides/ai-creative-volume-vs-traditional-agency.html', ['real estate ad creative', 'AI creative real estate marketing'], 'commercial'],
  ['sales-follow-up', 'CRM and sales follow-up', '/guides/real-estate-crm-and-lead-funnel.html', ['real estate CRM lead funnel', 'real estate lead follow-up process'], 'informational'],
  ['budget', 'Campaign budget planning', '/answers/minimum-budget-real-estate-marketing.html', ['real estate marketing budget', 'property advertising budget'], 'informational'],
  ['pricing', 'Agency scope and pricing', '/pricing/index.html', ['real estate marketing agency pricing', 'real estate marketing retainer'], 'commercial'],
  ['ad-research', 'Ad research methodology', '/data/meta-ad-library-audit-bangalore-agencies.html', ['real estate Meta Ad Library audit', 'property marketing competitor research'], 'informational'],
  ['market-research', 'Market-sizing methodology', '/data/bangalore-developer-marketing-market-size.html', ['Bengaluru developer marketing market size', 'real estate marketing market research'], 'informational'],
  ['channel-partners', 'Channel partners and direct demand', '/guides/channel-partner-vs-direct-demand.html', ['channel partner versus direct demand', 'developer demand generation'], 'informational'],
  ['catchments', 'Local catchment planning', '/areas/index.html', ['Bengaluru property marketing catchment', 'Mysore real estate marketing'], 'local'],
  ['research-library', 'Real estate marketing research', '/data/index.html', ['real estate marketing research', 'property marketing data'], 'informational'],
]
const clusters = coverage.map(([id, pillar, target, keywords, intent], index) => ({
  id, pillar, intent, priority: index < 4 ? 'P0' : 'P1', targetUrl: SITE + target,
  keywords: keywords.map(keyword => ({ keyword, type: 'editorial-target', volumeTier: null, difficulty: null })),
  contentNotes: 'Editorial query hypothesis. Search volume, difficulty and ranking are unmeasured. Review the linked page for source context and scope.',
}))
json('keyword-clusters.json', {
  _meta: { site: SITE, generated: updated, practice: FACTS.brand, totalClusters: clusters.length, notes: 'Curated topic-to-page mapping. No automatic suffix expansion or fabricated volume/difficulty values.' },
  clusters,
})

const services = [
  { id: SITE + '/#research', name: 'Market research and positioning', description: 'Buyer, catchment, offer and campaign planning.' },
  { id: SITE + '/#creative', name: 'Creative direction', description: 'Research-informed messaging and creative testing; studio scope agreed separately.' },
  { id: SITE + '/#acquisition', name: 'Paid acquisition', description: 'Meta and Google campaign management with agreed objectives and client-funded media.' },
  { id: SITE + '/#growth', name: 'Organic search visibility', description: 'SEO, answer-oriented content and entity consistency.' },
  { id: SITE + '/#follow-up', name: 'Sales follow-up systems', description: 'CRM routing, qualification, reporting and feedback into campaign decisions.' },
]
const organization = orgNode()
const person = personNode()
json('entity-graph.json', {
  _meta: { site: SITE, generated: updated, notes: 'Brand identity mirrors the maintained site. Public business contacts only. Service areas are not office addresses. This graph makes no direct-client relationship assertions.' },
  organizations: [organization], people: [person], services,
  relationships: services.map(service => ({ from: organization['@id'], to: service.id, type: 'offersCapability' })),
  portfolioSource: SITE + '/work/index.html',
  experienceNotes: PROOF,
})

// Each question appears once and points to its own maintained canonical page.
write('aeo-answer-bank.md', [
  '# QD & Co. — answer reference', '',
  `Updated: ${updated}. Canonical site: ${SITE}.`, '',
  'This reference is generated from the same answer objects as the HTML pages. Follow the exact source link for the full explanation and evidence. Historical owner reports and illustrative models retain their limitations; inclusion here is not independent verification.', '',
  ...ANSWERS.flatMap(answer => [`## ${answer.q}`, '', clean(answer.a), '', `Source: ${SITE}/answers/${answer.slug}.html`, '']),
].join('\n'))

write('geo-local-signals.md', [
  '# QD & Co. — location and catchment reference', '', `Updated: ${updated}.`, '',
  `Business name: ${FACTS.brand}`, `Business location: ${FACTS.location}`, `Phone: ${FACTS.phone}`, `Email: ${FACTS.email}`, `Website: ${SITE}`, '',
  'The location above is the stated business locality. Catchment articles are editorial service-area references, not evidence of an office in every area. Do not use generic city coordinates as an office location or infer Business Profile eligibility from these articles.', '',
  '## Catchment articles', '',
  ...AREAS.map(area => `- ${area.h1}: ${SITE}/areas/${area.slug}.html`), '',
  '## Research sources and methods', '',
  ...DATASETS.map(dataset => `- ${dataset.h1}: ${SITE}/data/${dataset.slug}.html`), '',
  'Quarterly launch extrapolations are planning scenarios. An ad snapshot does not prove geographic demand or profitability. Evaluate the actual project, buyer evidence and sales cohorts before generalizing.',
].join('\n'))

json('schema-fragments.json', {
  _meta: { site: SITE, generated: updated, notes: 'Reference identity nodes from the maintained site. Actual page-specific Article, FAQ and Dataset markup is generated by aeo-render.mjs; never paste an unrelated page template into live markup.' },
  fragments: { organization: { '@context': 'https://schema.org', ...organization }, person: { '@context': 'https://schema.org', ...person } },
})

write('content-briefs.md', [
  '# QD & Co. — editorial coverage reference', '', `Updated: ${updated}.`, '',
  'These are maintained guide and research destinations, not fabricated keyword-demand measurements. Topic priority describes editorial relevance; it is not a ranking prediction.', '',
  '## Guides', '',
  ...GUIDES.map(guide => `- ${guide.h1 || guide.title}: ${SITE}/guides/${guide.slug}.html`), '',
  '## Research', '',
  ...DATASETS.map(dataset => `- ${dataset.h1}: ${SITE}/data/${dataset.slug}.html`), '',
  '## Extending coverage', '',
  'Before adding an article, define the reader’s specific decision, inspect existing coverage, gather dated source evidence and choose the most useful format. Publish original analysis, examples or methods that answer that decision. Keep unverified outcomes and planning scenarios labelled. Avoid generating city variants or repeating paragraphs solely to increase page count.',
].join('\n'))

write('README.md', [
  '# QD & Co. — search reference files', '', `Updated: ${updated}. Site: ${SITE}.`, '',
  'These files provide compact references to the maintained website. They do not establish indexing, rich-result eligibility, AI citations or rankings.', '',
  '- keyword-clusters.json: editorial queries mapped to specific pages; volume and difficulty remain unknown.',
  '- entity-graph.json: company identity, verified public profiles and capability references; no unverified direct-client graph.',
  '- aeo-answer-bank.md: one copy of each maintained answer, with its exact source URL.',
  '- geo-local-signals.md: business locality and catchment-article references, without invented offices.',
  '- schema-fragments.json: shared identity nodes; page-specific schema belongs to its rendered page.',
  '- content-briefs.md: maintained editorial coverage and criteria for extending it.', '',
  'For commercial terms, consult the current pricing page and written engagement agreement. These reference files do not set invoices or contract terms.', '',
  `Website map: ${SITE}/llms.txt`, `Full page corpus: ${SITE}/llms-full.txt`, '',
  'Generated by scripts/generate-seo-corpus.mjs from maintained content modules. Changes to source pages must be regenerated before deployment.',
].join('\n'))

console.log(`SEO references written: ${clusters.length} topic clusters, ${ANSWERS.length} unique sourced answers, ${AREAS.length} catchment links; 7 files.`)
