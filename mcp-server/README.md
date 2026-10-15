# QD & Co. Site MCP Server

Minimal [Model Context Protocol](https://modelcontextprotocol.io/) server exposing QD & Co. site facts, `llms.txt`, and SEO keyword clusters for Cursor and other MCP clients.

## Tools

| Tool | Description |
|------|-------------|
| `get_site_summary` | Brand, geography, proof points, contact |
| `list_guides` | Published guide URLs on qdnco.com |
| `get_pricing_offer` | Phase 0, CPQL ₹550, Partnership, Studio |
| `get_llms_txt` | Contents of `public/llms.txt` |
| `search_seo_keywords` | Search `seo/keyword-clusters.json` |

## Run locally

```bash
cd mcp-server
node index.mjs
```

Uses `@modelcontextprotocol/sdk` when installed (`npm install` in this folder). Falls back to a zero-dependency JSON-RPC stdio stub otherwise.

## Add to Cursor `mcp.json`

**User-level** (`~/.cursor/mcp.json`) or **project-level** (`.cursor/mcp.json` in the portfolio repo):

```json
{
  "mcpServers": {
    "qdnco-site": {
      "command": "node",
      "args": [
        "C:/Users/USER/OneDrive/Desktop/VS Code Files/QDnCo/Portfolio Website/mcp-server/index.mjs"
      ]
    }
  }
}
```

Use forward slashes in the path on Windows. Adjust if the repo moves.

### Optional: with SDK installed

```json
{
  "mcpServers": {
    "qdnco-site": {
      "command": "node",
      "args": ["./mcp-server/index.mjs"],
      "cwd": "C:/Users/USER/OneDrive/Desktop/VS Code Files/QDnCo/Portfolio Website"
    }
  }
}
```

Restart Cursor after saving. The server reads:

- `../public/llms.txt`
- `../seo/keyword-clusters.json`

Hard-coded facts: **15 AI static creatives/month**, **₹550 CPQL**, **₹1.25–2.5L partnership band**.

## Regenerate SEO data

From portfolio root:

```bash
node scripts/build/generate-seo-corpus.mjs
node scripts/build/build-dist.mjs
```

See `../seo/README.md` for how dist copies `llms.txt`, `robots.txt`, and `seo/`.
