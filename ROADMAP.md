# Roadmap

`ruddr-mcp` is a [Model Context Protocol](https://modelcontextprotocol.io/) server that wraps the [Ruddr REST API](https://docs.ruddr.io/) so AI agents (Cursor, Claude, etc.) can read ThreeWill PSA data and create/update time entries.

It exists because the existing community options (e.g. the MCP Bundles Ruddr bundle) are read-only and exclude time entries — the operation we most want to automate.

The detailed plan lives in [`.cursor/plans/ruddr-mcp-server.plan.md`](.cursor/plans/ruddr-mcp-server.plan.md).

## Status

- [ ] **Phase 1 — v0.1.0**: scaffold, types from OpenAPI, fetch client (bearer + 429 backoff + pagination), 4 read tools, GitHub Releases workflow.
- [ ] **Phase 2 — v0.2.0**: read parity with MCP Bundles + extras (members, tasks, expenses, invoices, timesheets, holidays, opportunity stages).
- [ ] **Phase 3 — v0.3.0**: time-entry writes (create / update / delete), gated by `RUDDR_ALLOW_WRITES=time_entries`.
- [ ] **Repo B (ThreeWilly) follow-up**: standards doc, auto-attach rule, runbook, `AGENTS.md` update; remove the old `user-ruddr` MCP Bundles placeholder.

## Phase 1 scope (v0.1.0)

Tools shipped:

- `ruddr_list_clients`
- `ruddr_list_projects`
- `ruddr_list_time_entries` (filters: `from`, `to`, `memberId`, `projectId`, `timesheetId`, `statusId`)
- `ruddr_get_time_entry`

Distribution: GitHub Release zip (`ruddr-mcp-vX.Y.Z.zip`) — unpack, point an `mcp.json` entry at `dist/index.js`, set `RUDDR_API_KEY` in the `env` block.

## Design choices (locked)

- TypeScript + ESM, stdio transport via `@modelcontextprotocol/sdk`.
- Auth: bearer API key per user (created in Ruddr Settings → API Keys).
- Writes off by default — opt in with `RUDDR_ALLOW_WRITES=time_entries`.
- Distribution: GitHub Releases zip (no npm publish in v0.x).

## Non-goals (for now)

- Hosted Streamable HTTP deployment.
- Writes outside time entries.
- npm publishing.