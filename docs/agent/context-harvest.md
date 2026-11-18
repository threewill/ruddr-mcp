# ruddr-mcp — harvested local-chat context

**GitHub:** https://github.com/threewill/ruddr-mcp (`origin`, default branch `main`)  
**Harvested:** 18 Nov 2026 (America/New_York). All timestamps below are America/New_York unless noted.  
**Verified against code:** 18 Nov 2026 for this docs PR, at `5188804` / tag `v0.3.0`. Where the harvest disagreed with source, this file follows **code** and records the correction under [Code verification](#code-verification).

This document captures decisions, conventions, pitfalls, and unfinished work from local Cursor chats so future cloud agents have the same context. It is process and product fact only. It does **not** include secret values, personal names, organization-specific PSA filters, or client names.

**Primary sources**

| ID | Artifact | Dates (ET) | Notes |
| --- | --- | --- | --- |
| [C1] | Cursor chat “MCP tool development for Ruddr” (`e63c246b`) | 2026-05-07 16:16 through 2026-05-08 16:24 | Main build thread. |
| [C2] | “Resource capacity planning tool integration” (`2da70221`) | 2026-05-08 17:46–17:53 | Adds `ruddr_list_allocations` (PR #4). |
| [C3] | “Public repository considerations” (`05bfb269`) | 2026-07-05 17:12–18:20 | Org sign-off, public MIT release, tag `v0.3.0`. |
| [P-server] | `docs/plans/ruddr-mcp-server_1a5b08ce.plan.md` | 2026-05-07 | Original server plan. Frontmatter todos still `pending`; work shipped. |
| [P-tests] | `docs/plans/ruddr-mcp-minimal-tests_1f382d1f.plan.md` | 2026-05-08 | Minimal vitest + CI. Todos completed. |
| [G] | git history on `main` (13 commits) and four merged PRs | 2026-05-07 – 2026-07-05 | PRs #1–#4 merged 2026-05-08. |
| [R] | repo files at `5188804` | 2026-07-05 | Source of truth for claims below. |

Public-repo harvest: internal ops chats, internal runbooks, and a third plan that was not about this repository were **not** copied here.

---

## Purpose and users

- **What it is:** A self-hosted **stdio MCP server** that wraps the [Ruddr REST API](https://docs.ruddr.io/) so Cursor, Claude Desktop, and other MCP clients can read a Ruddr workspace and, if the user opts in, create, update, or delete time entries. [R README, P-server]
- **Why it exists:** A hosted Ruddr MCP bundle available at the time of the 2026-05-07 research was read-only and omitted time entries. This server is local, uses each user’s own API key, and adds time-entry read plus gated write. [R README, P-server, C1]
- **Disclaimer:** Unofficial community integration; not affiliated with, endorsed by, or supported by Ruddr. Users need their own Ruddr workspace and API key. [R README, C3]
- **Users:** A developer or consultant who already uses Ruddr as a PSA and wants an MCP client to list clients, projects, time, invoices, expenses, allocations, and related workspace records.

**History (from chats + git)**

- 2026-05-07: Decision to put the server in a **new** GitHub repo (`threewill/ruddr-mcp`), not inside a team ops workspace. [C1, D01]
- 2026-05-07 evening: GitHub repo created (then private). [C1, G]
- 2026-05-08: Phases 1–3 and the allocations tool built, tested, and merged in PRs #1–#4. [C1, C2, G]
- 2026-07-05: Public MIT release; `v0.3.0` tagged. Visibility flipped in the GitHub UI. [C3, G]

---

## Architecture and stack

| Item | Actual (in repo) |
| --- | --- |
| Runtime | Node.js 18+ (`package.json` engines). CI uses Node 20. TypeScript ESM. |
| Entry | `src/index.ts` starts `StdioServerTransport`. `src/server.ts` exports `createServer()` (metadata name `ruddr-mcp`, version `0.3.0`) and registers tool modules. |
| Tool modules | `src/tools/clients.ts`, `projects.ts`, `timeEntries.ts`, `phase2.ts` (broader reads, including allocations), `timeEntryWrites.ts`. |
| HTTP client | `src/ruddr/client.ts` — Bearer token, 429 backoff (up to 3 retries), cursor pagination via query params. Types from `https://docs.ruddr.io/openapi.json` into `src/generated/ruddr-openapi.d.ts` via `openapi-typescript`. |
| Auth / flags | `src/ruddr/env.ts`: `RUDDR_API_KEY` required; `RUDDR_BASE_URL` optional (default `https://www.ruddr.io/api/workspace`); `RUDDR_ALLOW_WRITES` comma-separated, writes only if it includes `time_entries`. |
| Validation | Zod schemas on tools, `@modelcontextprotocol/sdk`. |
| Responses | Tools return MCP text content with pretty-printed JSON (`src/mcp/response.ts`). |
| Distribution | `tsup` bundles `dist/index.js`. Tag `vX.Y.Z` runs `.github/workflows/release.yml` and publishes `ruddr-mcp-vX.Y.Z.zip` (includes `dist/`; no `npm install` to run). No npm publish in v0.x. |
| Client config | MCP client launches `node <install-dir>/dist/index.js` with env. On-demand stdio, not a daemon. README example path: `C:\tools\ruddr-mcp`. |
| Tests | Vitest. Unit tests mock `fetch` and always run. Integration smoke hits the live API only when `RUDDR_API_KEY` is set. Write integration also needs `RUDDR_RUN_WRITE_TESTS=1` and `RUDDR_ALLOW_WRITES=time_entries`. |

**Registered tools (20)** — counted from `server.registerTool` in `src/tools/`:

Reads (17): `ruddr_list_clients`, `ruddr_list_projects`, `ruddr_list_time_entries`, `ruddr_get_time_entry`, `ruddr_list_project_members`, `ruddr_list_project_tasks`, `ruddr_list_project_expenses`, `ruddr_list_project_budget_expenses`, `ruddr_list_invoices`, `ruddr_list_expense_categories`, `ruddr_list_expense_reports`, `ruddr_list_expense_items`, `ruddr_list_holidays`, `ruddr_list_opportunity_stages`, `ruddr_list_workspace_members`, `ruddr_list_allocations`, `ruddr_list_timesheets`.

Writes (3, gated): `ruddr_create_time_entry`, `ruddr_update_time_entry`, `ruddr_delete_time_entry`.

---

## Key decisions

Tabular copy: [docs/decisions.md](../decisions.md).

### D01 — Separate repo for the server (2026-05-07)
Server code lives in `threewill/ruddr-mcp`. Team ops docs and client MCP config stay outside this repository. [C1, P-server]

### D02 — TypeScript + local stdio, not hosted HTTP (2026-05-07)
Common MCP server stack; the API key stays on the user’s machine; no infra to run. Hosted Streamable HTTP was deferred (`FEAT-01`). [P-server]

### D03 — Do not depend on a hosted Ruddr MCP bundle (2026-05-07)
The hosted option evaluated in May 2026 was unauthenticated in that setup and could not do time entries. This repo wraps the public REST API instead. [P-server, C1]

### D04 — Per-user Ruddr API key (2026-05-07 / 05-08)
Created in Ruddr Settings → API Keys; sent as `Authorization: Bearer`. Never committed. [C1, P-server, R SECURITY.md]

### D05 — GitHub Releases zip, no npm publish in v0.x (2026-05-07)
Single bundled `index.js` via tsup so install is unzip + point the client at `dist/index.js`. [P-server, C3]

### D06 — Writes limited to time entries and gated (2026-05-07, shipped 2026-05-08)
`RUDDR_ALLOW_WRITES=time_entries` is required; default is read-only. [P-server, C1 Phase 3, R]

### D07 — Minimal mocked unit tests plus optional CI integration (2026-05-08)
Thin vitest setup: mocked unit tests always; live smoke only when the Actions secret exists. [C1, P-tests]

### D08 — CI must not evaluate `secrets.*` in invalid contexts (2026-05-08)
First workflow failed: “Unrecognized named-value: 'secrets'”. Fixed in `775ff45` before PR #1 merged. Integration steps use `env.RUDDR_API_KEY` with an `if:` on the job env. [C1, G]

### D09 — Restart the MCP client after config changes (2026-05-08)
Closing a window is not enough; env and tool lists are read when the server is spawned. [C1, R README]

### D10 — Keep the server workspace-generic (2026-05-08)
Do not bake organization-specific member filters, timesheet templates, or meeting cadence into this public server. Consumers can filter in the client. [C1, public-repo policy]

### D11 — Allocations tool name `ruddr_list_allocations` (2026-05-08)
Exposes Ruddr `GET /allocations` (planned capacity per member and project over a date range). Shipped in PR #4 the same afternoon. [C2, R]

### D12 — Go public under MIT after org sign-off (2026-07-05)
History scan found no secrets or client data in the tree. Internal plan-file paths and private-repo flags were scrubbed; version 0.3.0 tagged; GitHub visibility set to public. [C3, G]

---

## Conventions

- Tool names are `ruddr_<verb>_<noun>` (`ruddr_list_projects`, `ruddr_create_time_entry`).
- Read-first: write tools throw a clear error when the env flag is off.
- Unit tests set `RUDDR_API_KEY=test` and mock `fetch`; they must not call the network.
- Releases are triggered only by `v*` tags.
- Public docs stay generic: no organization-only filters, no member emails or IDs, no client project codes.
- Plan-mode-first applies via the vendored standards copy and `.cursor/rules/plan-mode-first.mdc`.

---

## Known pitfalls and fixes

- **MCP config/env not picked up until a full quit and reopen** of Cursor or Claude Desktop. Tools can be missing, or calls can return “Missing `RUDDR_API_KEY`”, if the var is only in the shell. [C1, R README]
- **Invalid JSON in `mcp.json`** (trailing commas) prevents the server from loading. [R README]
- **GitHub Actions `secrets` context** cannot be used in some workflow positions; first CI wiring failed on PR #1 and was fixed the same day (`775ff45`). [C1, G]
- **Missing `dist/index.js`** at the configured path silently fails to expose tools. Release zips include `dist/`; a git clone still needs `npm install` and `npm run build`. [R README]
- **Integration tests mutate nothing** unless `RUDDR_RUN_WRITE_TESTS=1` and writes are enabled. Do not run write tests against a production workspace casually. [R README, SECURITY.md]
- **`package.json` `lint` script** is a stub: `echo "(no linter yet)"`. [R]
- **Root `ROADMAP.md` / `CHANGELOG.md` omitted allocations** until this docs PR. The tool shipped in PR #4 (2026-05-08) and is listed in the README. [R vs C2 / G]

---

## Open issues (see also `roadmap/BACKLOG.md`)

- `test.yml` does not meet the CI minutes budget (`TD-01`). Do not change workflows in a docs-only PR.
- No real linter (`TD-02`).
- v0.1.0 and v0.2.0 were never published as GitHub Releases; only `v0.3.0` exists (verified via the GitHub Releases API).
- Leftover remote branch `master` at the 2026-05-07 checkpoint (`TD-04`).
- Unscheduled product work: hosted Streamable HTTP (`FEAT-01`), writes outside time entries (`FEAT-02`), npm publishing (`FEAT-03`), other OpenAPI endpoints (`FEAT-04`). Allocations is **done**, not future.

---

## Environments and deployment

Secret **names** only. See [docs/ops/ENVIRONMENTS.md](../ops/ENVIRONMENTS.md).

There is no hosted environment for the server itself. “Deploy” means: download the release zip (or build locally), point the MCP client at `dist/index.js`, set env, restart the client.

`.env` files are gitignored.

---

## Glossary

| Term | Meaning |
| --- | --- |
| Ruddr | Third-party PSA with a public REST API and OpenAPI spec. |
| MCP / stdio server | Model Context Protocol server launched as a child process; talks to the client over stdin/stdout. |
| Allocations | Ruddr `GET /allocations` — planned capacity per resource and project over a date range. Tool: `ruddr_list_allocations`. |
| Write gate | `RUDDR_ALLOW_WRITES=time_entries` must be present or write tools refuse to run. |
| Release zip | `ruddr-mcp-vX.Y.Z.zip` from GitHub Releases, with a prebuilt `dist/`. |

---

## Stale or conflicting docs (at harvest)

- Root `ROADMAP.md` “Future” still listed allocations as not exposed. **Fixed in this PR.**
- `CHANGELOG.md` did not mention `ruddr_list_allocations`. **Fixed in this PR.**
- P-server frontmatter todos remain `pending` though Phases 1–3 shipped. Expected for a Cursor plan file; the index marks them completed/superseded.
- P-server layout (`src/client.ts`, per-domain files) was later folded into `src/ruddr/client.ts` and `src/tools/phase2.ts`. **Code is the source of truth.**

---

## Code verification

Checked 18 Nov 2026 against `src/`, `package.json`, workflows, README, SECURITY, CHANGELOG, ROADMAP, and GitHub Releases.

| Draft claim | Code / git |
| --- | --- |
| Twenty tools | **20** `registerTool` names (17 read + 3 gated write). The elevator pitch’s “twenty tools for workspace reads plus … writes” is easy to misread as 20 reads; the real split is 17+3. |
| Write tool descriptions tell the agent to confirm with the user first | Descriptions only require `RUDDR_ALLOW_WRITES=time_entries`. There is **no** “confirm with the user” sentence in `timeEntryWrites.ts`. |
| `ruddr_list_time_entries` filters include `from`/`to`/`statusId` (P-server) | Schema uses `date` / `dateAfter` / `dateOnAfter` / `dateBefore` / `dateOnBefore`, plus `memberId`, `projectId`, `timesheetId`, `typeId`. **No `statusId`.** |
| Layout `src/client.ts` and per-domain tool files | Client is `src/ruddr/client.ts`. Most Phase 2 reads live in `src/tools/phase2.ts`. |
| Four unit tests | Six unit files (`clients`, `projects`, `list_time_entries`, `get_time_entry`, `phase2_tools`, `time_entry_writes`) plus two integration files. |
| Allocations is future | Shipped PR #4, 2026-05-08; in the v0.3.0 tree and README. |
| Server metadata version | `0.3.0` in `src/server.ts` and `package.json`. |
| 429 backoff | Yes, max 3 retries, `Retry-After` or exponential 250ms. |
| Only `v0.3.0` GitHub Release | Confirmed; one release, asset `ruddr-mcp-v0.3.0.zip`. |

**Could not re-verify in this environment:** live Ruddr API behavior, MCP client restart UX on a desktop, whether leftover hosted-bundle MCP registrations exist on any developer machine, and GitHub Actions minute cost of `test.yml` (estimated in the docs PR body, not measured here).
