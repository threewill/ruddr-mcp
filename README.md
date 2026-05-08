# Ruddr MCP Server

This repo contains a **stdio MCP server** that wraps the **Ruddr REST API** so Cursor (and other MCP clients) can query Ruddr workspace data and (later) create/update time entries.

## Requirements

- Node.js 18+
- A Ruddr API key (Ruddr workspace → Settings → API Keys)

## Local development

```bash
npm install
npm run gen:types
npm run dev
```

## Cursor setup (manual)

After building and unzipping a release asset (or using `dist/` locally), configure `%USERPROFILE%\.cursor\mcp.json`:

```json
{
  "mcpServers": {
    "ruddr": {
      "command": "node",
      "args": ["C:\\\\tools\\\\ruddr-mcp\\\\dist\\\\index.js"],
      "env": {
        "RUDDR_API_KEY": "<your-api-key>",
        "RUDDR_ALLOW_WRITES": "time_entries"
      }
    }
  }
}
```

