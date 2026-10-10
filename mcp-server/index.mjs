#!/usr/bin/env node
/**
 * QD & Co. site MCP server — stdio JSON-RPC.
 * Uses @modelcontextprotocol/sdk when installed; otherwise a minimal MCP-compatible loop.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const LLMS_PATH = path.join(ROOT, 'public', 'llms.txt')
const KEYWORDS_PATH = path.join(ROOT, 'seo', 'keyword-clusters.json')

const SITE_FACTS = {
  site: 'https://qdnco.com',
  brand: 'QD & Co.',
  tradingAs: 'QD & Co.',
  llpin: 'ACO-7601',
  founder: 'V. Sai Kavshik',
  phone: '+91 88611 79992',
  email: 'qdnco01@gmail.com',
  geography: ['Bangalore', 'Mysore', 'Karnataka Tier-2'],
  idealClients: ['Real estate developers', 'Builders', 'Channel partners'],
  capabilities: [
    'Performance Marketing (Meta + Google → CPQL)',
    'Go-to-Market & Market Research / AI GTM',
    'Growth Marketing (SEO · AEO · GEO)',
    'Creative Direction (15 AI statics/mo included)',
    'AI Workflows & Pipelines',
  ],
  offers: {
    phase0: { name: 'Phase 0 Market Read', price: '₹75,000–₹1,25,000 one-time when scoped', duration: '2–3 weeks' },
    performance: {
      name: 'Performance CPQL',
      cpqlFee: 550,
      cpqlTiers: { standard: 550, volume61: 495, volume121: 450 },
      mediaModel: 'client-funded (Structure B)',
      aiCreativesIncluded: '15 static AI ad creatives per month',
      qualifiedDefinition: '5-part contractual definition with 7-day replacement guarantee',
    },
    partnership: { name: 'Retainer + Upside', retainer: '₹50,000–₹75,000/month + 8% of media + 2% upside' },
    studio: { name: 'Studio Package', pricing: 'Separate quote', includes: ['shoots', 'drone', 'UGC/IGC', 'motion graphics'] },
  },
  proof: {
    cpl: 266,
    salesReadyPct: 51,
    pipelineInfluenced: '₹37 Cr',
    mediaManaged: '₹6L+/month',
    engagements: '32+',
  },
  clients: {
    realEstate: ['Brigade Group', 'Godrej Properties', 'Kumar Properties (Kumar Platina)', 'Vaishnavi Group (Vaishnavi Life)', 'Sattva', 'Indium Group'],
    adjacent: ['Roboprenr', 'Netri Academy', 'Marga Education', 'Logic Launch'],
  },
}

const GUIDES = [
  { slug: 'real-estate-performance-marketing-bangalore', title: 'Real Estate Performance Marketing Bangalore', url: 'https://qdnco.com/guides/real-estate-performance-marketing-bangalore.html' },
  { slug: 'cost-per-qualified-lead-real-estate', title: 'Cost Per Qualified Lead Real Estate', url: 'https://qdnco.com/guides/cost-per-qualified-lead-real-estate.html' },
  { slug: 'what-counts-as-a-qualified-lead', title: 'What Counts as a Qualified Lead', url: 'https://qdnco.com/guides/what-counts-as-a-qualified-lead.html' },
  { slug: 'meta-ads-for-real-estate-launches', title: 'Meta Ads for Real Estate Launches', url: 'https://qdnco.com/guides/meta-ads-for-real-estate-launches.html' },
  { slug: 'google-ads-for-real-estate', title: 'Google Ads for Real Estate', url: 'https://qdnco.com/guides/google-ads-for-real-estate.html' },
  { slug: 'rera-compliant-advertising', title: 'RERA Compliant Advertising', url: 'https://qdnco.com/guides/rera-compliant-advertising.html' },
  { slug: 'how-much-should-a-developer-spend', title: 'How Much Should a Developer Spend', url: 'https://qdnco.com/guides/how-much-should-a-developer-spend.html' },
  { slug: 'channel-partner-vs-direct-demand', title: 'Channel Partner vs Direct Demand', url: 'https://qdnco.com/guides/channel-partner-vs-direct-demand.html' },
  { slug: 'ai-creative-volume-vs-traditional-agency', title: 'AI Creative Volume vs Traditional Agency', url: 'https://qdnco.com/guides/ai-creative-volume-vs-traditional-agency.html' },
  { slug: 'pre-launch-eoi-playbook', title: 'Pre-Launch EOI Playbook', url: 'https://qdnco.com/guides/pre-launch-eoi-playbook.html' },
  { slug: 'real-estate-crm-and-lead-funnel', title: 'Real Estate CRM and Lead Funnel', url: 'https://qdnco.com/guides/real-estate-crm-and-lead-funnel.html' },
]

function readSafe(filePath, fallback = '') {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return fallback
  }
}

function loadKeywords() {
  try {
    return JSON.parse(readSafe(KEYWORDS_PATH, '{}'))
  } catch {
    return { clusters: [] }
  }
}

const TOOLS = [
  {
    name: 'get_site_summary',
    description: 'Summary of QD & Co. practice, geography, proof points, and contact',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_guides',
    description: 'List published guide pages on qdnco.com',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_pricing_offer',
    description: 'Phase 0, Performance CPQL (₹550), Partnership retainer, and studio package details',
    inputSchema: {
      type: 'object',
      properties: {
        offer: { type: 'string', enum: ['all', 'phase0', 'performance', 'partnership', 'studio'], description: 'Which offer to return' },
      },
    },
  },
  {
    name: 'get_llms_txt',
    description: 'Return public/llms.txt LLM-facing site map',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'search_seo_keywords',
    description: 'Search seo/keyword-clusters.json by keyword or cluster pillar',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term' },
        limit: { type: 'number', description: 'Max results (default 20)' },
      },
      required: ['query'],
    },
  },
]

function searchKeywords(query, limit = 20) {
  const data = loadKeywords()
  const q = query.toLowerCase()
  const results = []
  for (const cluster of data.clusters || []) {
    const pillarMatch = (cluster.pillar || '').toLowerCase().includes(q)
    const idMatch = (cluster.id || '').toLowerCase().includes(q)
    for (const kw of cluster.keywords || []) {
      const text = (kw.keyword || kw).toString().toLowerCase()
      if (pillarMatch || idMatch || text.includes(q)) {
        results.push({
          clusterId: cluster.id,
          pillar: cluster.pillar,
          keyword: kw.keyword || kw,
          type: kw.type,
          targetUrl: cluster.targetUrl,
        })
        if (results.length >= limit) return results
      }
    }
  }
  return results
}

function callTool(name, args = {}) {
  switch (name) {
    case 'get_site_summary':
      return { content: [{ type: 'text', text: JSON.stringify(SITE_FACTS, null, 2) }] }
    case 'list_guides':
      return { content: [{ type: 'text', text: JSON.stringify({ hub: 'https://qdnco.com/guides/', guides: GUIDES }, null, 2) }] }
    case 'get_pricing_offer': {
      const key = args.offer || 'all'
      const offers = key === 'all' ? SITE_FACTS.offers : { [key]: SITE_FACTS.offers[key] }
      return { content: [{ type: 'text', text: JSON.stringify(offers, null, 2) }] }
    }
    case 'get_llms_txt':
      return { content: [{ type: 'text', text: readSafe(LLMS_PATH, '# llms.txt not found — run build from Portfolio Website root') }] }
    case 'search_seo_keywords':
      return { content: [{ type: 'text', text: JSON.stringify(searchKeywords(args.query, args.limit || 20), null, 2) }] }
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

async function runWithSdk() {
  const { Server } = await import('@modelcontextprotocol/sdk/server/index.js')
  const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js')
  const { ListToolsRequestSchema, CallToolRequestSchema } = await import('@modelcontextprotocol/sdk/types.js')

  const server = new Server({ name: 'qdnco-site-mcp', version: '1.0.0' }, { capabilities: { tools: {} } })

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }))
  server.setRequestHandler(CallToolRequestSchema, async (req) => callTool(req.params.name, req.params.arguments || {}))

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

function runStub() {
  const send = (obj) => process.stdout.write(JSON.stringify(obj) + '\n')

  process.stdin.setEncoding('utf8')
  let buffer = ''
  process.stdin.on('data', (chunk) => {
    buffer += chunk
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.trim()) continue
      let msg
      try {
        msg = JSON.parse(line)
      } catch {
        continue
      }
      const { id, method, params } = msg
      if (method === 'initialize') {
        send({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'qdnco-site-mcp', version: '1.0.0' },
          },
        })
      } else if (method === 'notifications/initialized') {
        // no response
      } else if (method === 'tools/list') {
        send({ jsonrpc: '2.0', id, result: { tools: TOOLS } })
      } else if (method === 'tools/call') {
        try {
          const result = callTool(params.name, params.arguments || {})
          send({ jsonrpc: '2.0', id, result })
        } catch (err) {
          send({ jsonrpc: '2.0', id, error: { code: -32603, message: err.message } })
        }
      } else if (method === 'ping') {
        send({ jsonrpc: '2.0', id, result: {} })
      } else if (id !== undefined) {
        send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } })
      }
    }
  })
}

async function main() {
  try {
    await import('@modelcontextprotocol/sdk/server/index.js')
    await runWithSdk()
  } catch {
    runStub()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
