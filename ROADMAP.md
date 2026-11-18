# Roadmap

`ruddr-mcp` is a [Model Context Protocol](https://modelcontextprotocol.io/) server that wraps the [Ruddr REST API](https://docs.ruddr.io/) so AI agents (Cursor, Claude Desktop, etc.) can read Ruddr workspace data and, when opted in, create/update/delete time entries.

**Working roadmap and backlog:** [roadmap/ROADMAP.md](roadmap/ROADMAP.md) (horizons) and [roadmap/BACKLOG.md](roadmap/BACKLOG.md) (IDs). This file is the short GitHub-facing shipped view so the two do not drift.

## Status (shipped)

- [x] **Phase 1 — v0.1.0**: scaffold, types from OpenAPI, fetch client (bearer + 429 backoff + pagination), 4 read tools, GitHub Releases workflow.
- [x] **Phase 2 — v0.2.0**: broader reads (members, tasks, expenses, invoices, timesheets, holidays, opportunity stages).
- [x] **Phase 3 — v0.3.0**: time-entry writes (create / update / delete), gated by `RUDDR_ALLOW_WRITES=time_entries`.
- [x] **`ruddr_list_allocations`**: shipped in [PR #4](https://github.com/threewill/ruddr-mcp/pull/4) (2026-05-08); included in the v0.3.0 tree. Public tag 2026-07-05.

## Next (summary)

See [roadmap/ROADMAP.md](roadmap/ROADMAP.md): CI minutes fixes (`TD-01`), then a product decision between hosted Streamable HTTP (`FEAT-01`) and npm publishing (`FEAT-03`). Writes beyond time entries and other OpenAPI endpoints are Later.

## Design choices

- TypeScript + ESM, stdio transport via `@modelcontextprotocol/sdk`.
- Auth: bearer API key per user (created in Ruddr Settings → API Keys).
- Writes off by default — opt in with `RUDDR_ALLOW_WRITES=time_entries`.
- Distribution: GitHub Releases zip (`ruddr-mcp-vX.Y.Z.zip`).
