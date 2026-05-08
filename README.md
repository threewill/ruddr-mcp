# Ruddr MCP Server

This repo contains a **stdio MCP server** that wraps the **Ruddr REST API** so Cursor (and other MCP clients) can query Ruddr workspace data.

## What it provides

Phase 1 tools:

- `ruddr_list_clients`
- `ruddr_list_projects`
- `ruddr_list_time_entries`
- `ruddr_get_time_entry`

## Requirements

- Node.js 18+
- A Ruddr API key (Ruddr workspace → Settings → API Keys)

## Install (recommended: GitHub Releases zip)

1. Download the latest `ruddr-mcp-vX.Y.Z.zip` from GitHub Releases.
2. Unzip it somewhere stable (example: `C:\tools\ruddr-mcp`).
3. Point Cursor at `dist/index.js` (see next section).

The release zip includes `dist/` and does **not** require `npm install`.

## Local development

```bash
npm install
npm run gen:types
npm test
npm run dev
```

## Cursor setup (manual)

After unzipping a release asset (or building locally), configure `%USERPROFILE%\.cursor\mcp.json`:

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

Then **restart Cursor completely** (quit + reopen) so it reloads MCP config.

## Environment variables

- `RUDDR_API_KEY` (required): Ruddr API key used as a Bearer token.
- `RUDDR_BASE_URL` (optional): defaults to `https://www.ruddr.io/api/workspace`.
- `RUDDR_ALLOW_WRITES` (reserved for Phase 3): write operations are not shipped yet, but this flag will gate time-entry writes when added.

## Testing

- Unit tests (offline): `npm test`
- Integration smoke (requires key): `npm run test:integration`

In GitHub Actions, integration tests run only when the repo secret `RUDDR_API_KEY` is set.

## Release

Tagging `vX.Y.Z` triggers `.github/workflows/release.yml` and publishes a zip asset `ruddr-mcp-vX.Y.Z.zip`.

