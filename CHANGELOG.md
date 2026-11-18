# Changelog

All notable changes to this project are documented here.

## [0.3.0] — 2026-07-05

### Added

- Gated time entry write tools: `ruddr_create_time_entry`, `ruddr_update_time_entry`, `ruddr_delete_time_entry`.
- Opt-in via `RUDDR_ALLOW_WRITES=time_entries`.
- `ruddr_list_allocations` (resource capacity / planning; Ruddr `GET /allocations`). Shipped in PR #4 on 2026-05-08; included in this public tag.

## [0.2.0]

### Added

- Read tools: project members, tasks, expenses, budget expenses, invoices, expense categories/reports/items, holidays, opportunity stages, workspace members, timesheets.

## [0.1.0]

### Added

- Initial release: stdio MCP server, OpenAPI-derived types, fetch client with pagination and 429 backoff.
- Read tools: `ruddr_list_clients`, `ruddr_list_projects`, `ruddr_list_time_entries`, `ruddr_get_time_entry`.
- GitHub Releases workflow publishing `ruddr-mcp-vX.Y.Z.zip`.
