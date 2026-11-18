# Decision log

Ruddr MCP Server (`ruddr-mcp`). Dates are America/New_York. Sources are local Cursor chats harvested 18 Nov 2026; see [docs/agent/context-harvest.md](agent/context-harvest.md).

| ID | Date | Decision | Reason | Source | Status |
| --- | --- | --- | --- | --- | --- |
| D01 | 2026-05-07 | Put the MCP server in `threewill/ruddr-mcp`, not inside a team ops workspace. | Server is a separately versioned deliverable; ops docs stay out of this public repo. | C1, P-server | Accepted |
| D02 | 2026-05-07 | TypeScript ESM + local stdio (`StdioServerTransport`), not hosted Streamable HTTP. | Common MCP stack; API key stays on the user’s machine; no infra. Hosted HTTP deferred (`FEAT-01`). | P-server | Accepted |
| D03 | 2026-05-07 | Wrap Ruddr’s public REST API; do not depend on a hosted Ruddr MCP bundle. | Hosted option evaluated in May 2026 was read-only and omitted time entries. | P-server, C1 | Accepted |
| D04 | 2026-05-07 / 05-08 | Per-user Ruddr API key as Bearer token (`RUDDR_API_KEY`). Never commit it. | Matches Ruddr’s workspace API-key model. | C1, P-server, SECURITY.md | Accepted |
| D05 | 2026-05-07 | Distribute via GitHub Releases zip (`tsup` single `dist/index.js`). No npm publish in v0.x. | Unzip + point the MCP client at `dist/index.js`. npm is `FEAT-03`. | P-server, C3 | Accepted |
| D06 | 2026-05-07 (shipped 2026-05-08) | Time-entry writes only, gated by `RUDDR_ALLOW_WRITES=time_entries`. Default read-only. | Limit blast radius; explicit opt-in. | P-server, C1, `timeEntryWrites.ts` | Accepted |
| D07 | 2026-05-08 | Minimal vitest: mocked unit tests always; live integration only when `RUDDR_API_KEY` is present. | Thin wrapper; avoid a heavy harness. | C1, P-tests | Accepted |
| D08 | 2026-05-08 | Gate CI integration on `env.RUDDR_API_KEY`, not invalid `secrets.*` expressions. | First workflow failed with “Unrecognized named-value: 'secrets'”; fixed in `775ff45`. | C1, git | Accepted |
| D09 | 2026-05-08 | Document a full MCP-client restart after `mcp.json` / env changes. | Config is read when the server process is spawned. | C1, README | Accepted |
| D10 | 2026-05-08 | Keep the server workspace-generic. No org-specific filters in this repo. | Public MIT product; consumers filter in the client. | C1, public-repo policy | Accepted |
| D11 | 2026-05-08 | Name the allocations tool `ruddr_list_allocations` (`GET /allocations`). | Needed for planned capacity reads; shipped PR #4. | C2, `phase2.ts` | Accepted |
| D12 | 2026-07-05 | Publish under MIT after org sign-off. | No secrets or client data in the tree; fill the self-hosted gap. | C3, git `5188804` | Accepted |
