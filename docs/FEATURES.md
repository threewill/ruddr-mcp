# Features

Shipped capabilities of **Ruddr MCP Server** (`ruddr-mcp`) as of **v0.3.0**. Product-facing wording also lives in `Shelf-Details.md`. Behavior changes must update this file in the same PR (or record `No features impact: <reason>`).

## By area

### Platform

- stdio MCP server (`StdioServerTransport`) for Cursor, Claude Desktop, and other MCP clients
- TypeScript ESM, Node.js 18+ (CI uses Node 20)
- OpenAPI-generated types from `https://docs.ruddr.io/openapi.json`
- Bearer HTTP client with cursor pagination and HTTP 429 backoff
- Zod-validated tool inputs
- Read-only by default

### Workspace reads (17 tools)

- Clients: `ruddr_list_clients`
- Projects: `ruddr_list_projects`
- Project members, tasks, expenses, budget expenses
- Time entries: `ruddr_list_time_entries`, `ruddr_get_time_entry`
- Timesheets: `ruddr_list_timesheets`
- Invoices
- Expense categories, reports, and items
- Holidays and opportunity stages
- Workspace members (`GET /members`)
- Allocations / planned capacity: `ruddr_list_allocations` (`GET /allocations`)

### Time-entry writes (3 tools, opt-in)

- `ruddr_create_time_entry`, `ruddr_update_time_entry`, `ruddr_delete_time_entry`
- Disabled unless `RUDDR_ALLOW_WRITES` includes `time_entries`

### Distribution and quality

- GitHub Release zip `ruddr-mcp-vX.Y.Z.zip` with prebuilt `dist/index.js`
- Unit tests (mocked `fetch`, always on)
- Optional live integration tests when `RUDDR_API_KEY` is set
- Optional mutating write tests when `RUDDR_RUN_WRITE_TESTS=1`
- MIT license, unofficial-integration disclaimer, `SECURITY.md`

**Tool count:** 20 registered tools (17 read + 3 gated write).

## Changelog

| Version | Date | Change |
| --- | --- | --- |
| 0.1.0 | 2026-05-08 | stdio server, OpenAPI types, fetch client, four Phase 1 read tools, GitHub Releases workflow. No GitHub Release asset was published for this version. |
| 0.2.0 | 2026-05-08 | Phase 2 read tools (members, tasks, expenses, invoices, timesheets, holidays, opportunity stages, and related list endpoints). No GitHub Release asset was published for this version. |
| 0.3.0 | 2026-05-08 (public tag 2026-07-05) | Gated time-entry writes; `ruddr_list_allocations` (PR #4, 2026-05-08); public MIT release and GitHub Release zip. |
