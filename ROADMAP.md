# Roadmap

`ruddr-mcp` is a [Model Context Protocol](https://modelcontextprotocol.io/) server that wraps the [Ruddr REST API](https://docs.ruddr.io/) so AI agents (Cursor, Claude Desktop, etc.) can read Ruddr workspace data and create/update time entries.

It exists because hosted alternatives (e.g. the [MCP Bundles Ruddr bundle](https://www.mcpbundles.com/bundles/ruddr)) are read-only and exclude time entries — a common gap for PSA automation.

## Status

- [x] **Phase 1 — v0.1.0**: scaffold, types from OpenAPI, fetch client (bearer + 429 backoff + pagination), 4 read tools, GitHub Releases workflow.
- [x] **Phase 2 — v0.2.0**: read parity with MCP Bundles + extras (members, tasks, expenses, invoices, timesheets, holidays, opportunity stages).
- [x] **Phase 3 — v0.3.0**: time-entry writes (create / update / delete), gated by `RUDDR_ALLOW_WRITES=time_entries`.

## Future (not scheduled)

- `ruddr_list_allocations` and other OpenAPI endpoints not yet exposed as tools.
- Hosted Streamable HTTP transport.
- Writes outside time entries.
- npm publishing.

## Design choices

- TypeScript + ESM, stdio transport via `@modelcontextprotocol/sdk`.
- Auth: bearer API key per user (created in Ruddr Settings → API Keys).
- Writes off by default — opt in with `RUDDR_ALLOW_WRITES=time_entries`.
- Distribution: GitHub Releases zip (`ruddr-mcp-vX.Y.Z.zip`).
