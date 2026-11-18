# Historical Cursor plans

These files are original local Cursor plans from May 2026 (America/New_York). They are **historical**. Prefer current source (`src/server.ts`, `src/tools/`, `src/ruddr/`) and `docs/agent/context-harvest.md` / `docs/decisions.md` when they disagree.

| File | Topic | Status vs shipped code |
| --- | --- | --- |
| [ruddr-mcp-server_1a5b08ce.plan.md](ruddr-mcp-server_1a5b08ce.plan.md) | New TypeScript stdio MCP server wrapping Ruddr REST | **Done (Phases 1–3), layout superseded.** Frontmatter todos remain `pending`. Planned `src/client.ts` and per-domain tool files; shipped `src/ruddr/client.ts` and `src/tools/phase2.ts`. Planned time-entry filters `from`/`to`/`statusId`; shipped date* + `typeId` (no `statusId`). Allocations were not in this plan; they shipped later (PR #4). Hosted HTTP and npm publish remain open (`FEAT-01`, `FEAT-03`). |
| [ruddr-mcp-minimal-tests_1f382d1f.plan.md](ruddr-mcp-minimal-tests_1f382d1f.plan.md) | Vitest unit + optional CI integration | **Done.** Todos marked completed. Suite later grew (Phase 2 + write unit/integration tests). `test.yml` still matches the plan’s PR+push shape and is now `TD-01` vs the CI minutes budget. |

A third historical plan about timesheet drafting lived in a different workspace and was **not** copied here (public-repo scope).

## Public-repo scrubs

`ruddr-mcp-server_1a5b08ce.plan.md` is the original plan with the following removed or generalized (not a rewrite of the Repo A technical design):

- Personal filesystem paths
- Names of a team ops workspace beyond a generic “outside this repo”
- Pointers to internal MCP routing docs, runbooks, and skills
- References to unrelated internal platforms
- Hosted-bundle registration folder names that were only used locally

`ruddr-mcp-minimal-tests_1f382d1f.plan.md` needed no scrubs.
