# Ruddr MCP Server

This repo contains a **stdio MCP server** that wraps the **[Ruddr REST API](https://docs.ruddr.io/)** so Cursor, Claude Desktop, and other MCP clients can query Ruddr workspace data.

> **Disclaimer:** This is an unofficial community integration. It is not affiliated with, endorsed by, or supported by Ruddr. You need your own Ruddr workspace and API key. “Ruddr” is a trademark of its respective owner.

## Why this exists

| | **ruddr-mcp** (this repo) | **MCP Bundles Ruddr** |
| --- | --- | --- |
| Hosting | Self-hosted (local stdio) | Hosted remote server |
| Auth | Your Ruddr API key | OAuth via MCP Bundles |
| Time entries | Read + optional write | Not included |
| Writes | Time entries only, gated by env | Read-only |

## What it provides

Phase 1 tools:

- `ruddr_list_clients`
- `ruddr_list_projects`
- `ruddr_list_time_entries`
- `ruddr_get_time_entry`

Phase 2 tools (read-only):

- `ruddr_list_project_members`
- `ruddr_list_project_tasks`
- `ruddr_list_project_expenses`
- `ruddr_list_project_budget_expenses`
- `ruddr_list_invoices`
- `ruddr_list_expense_categories`
- `ruddr_list_expense_reports`
- `ruddr_list_expense_items`
- `ruddr_list_holidays`
- `ruddr_list_opportunity_stages`
- `ruddr_list_workspace_members`
- `ruddr_list_allocations` (resource capacity / planning; `GET /allocations`)
- `ruddr_list_timesheets`

Phase 3 tools (time entry writes; gated):

- `ruddr_create_time_entry`
- `ruddr_update_time_entry`
- `ruddr_delete_time_entry`

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
        "RUDDR_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

Then **restart Cursor completely** (quit + reopen) so it reloads MCP config.

## Claude Desktop setup

Add to your Claude Desktop MCP config (path varies by OS):

```json
{
  "mcpServers": {
    "ruddr": {
      "command": "node",
      "args": ["/path/to/ruddr-mcp/dist/index.js"],
      "env": {
        "RUDDR_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

Restart Claude Desktop after editing the config.

### Enabling time entry writes (optional)

By default, this server is safe to run in **read-only** mode.

To enable time entry writes, add:

```json
{
  "RUDDR_ALLOW_WRITES": "time_entries"
}
```

## Troubleshooting

### “Missing RUDDR_API_KEY”

If tools return an error like “Missing RUDDR_API_KEY”, it means the MCP server process was started without the env var.

- Verify `RUDDR_API_KEY` is present in the `env` block for the `ruddr` server in `%USERPROFILE%\\.cursor\\mcp.json` (or that `${env:RUDDR_API_KEY}` resolves in the Cursor process environment).
- Quit Cursor completely and reopen it (MCP config/env is read at server spawn time).

### Tools don’t show up in Cursor

- Quit Cursor completely and reopen it (closing the window is not enough).
- Confirm `dist/index.js` exists at the path you configured.
- Ensure your `mcp.json` is valid JSON (no trailing commas).

## Security

- Never commit your `RUDDR_API_KEY`. Keep it in the MCP `env` block or OS environment only.
- Write tools are off by default. See [SECURITY.md](SECURITY.md) for the full policy.

## Environment variables

- `RUDDR_API_KEY` (required): Ruddr API key used as a Bearer token.
- `RUDDR_BASE_URL` (optional): defaults to `https://www.ruddr.io/api/workspace`.
- `RUDDR_ALLOW_WRITES` (optional): comma-separated list of enabled write areas. To enable time entry writes, set to `time_entries`.
- `RUDDR_RUN_WRITE_TESTS` (tests only): set to `1` to opt-in to integration tests that create/update/delete time entries.

## Testing

- Unit tests (offline): `npm test`
- Integration smoke (requires key): `npm run test:integration`
- Integration time entry writes (mutates data; opt-in):
  - `RUDDR_ALLOW_WRITES=time_entries`
  - `RUDDR_RUN_WRITE_TESTS=1`

In GitHub Actions, integration tests run only when the repo secret `RUDDR_API_KEY` is set.

## Release

Tagging `vX.Y.Z` triggers `.github/workflows/release.yml` and publishes a zip asset `ruddr-mcp-vX.Y.Z.zip`.

## License

[MIT](LICENSE) — Copyright (c) ThreeWill

