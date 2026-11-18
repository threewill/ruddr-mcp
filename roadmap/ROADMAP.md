# Roadmap

Horizons for **Ruddr MCP Server**. Item details and IDs live in [BACKLOG.md](BACKLOG.md). Tags: **Area**, **Driver**, **Type**. Dates are America/New_York.

The GitHub-facing shipped summary is the root [ROADMAP.md](../ROADMAP.md). This file is the working roadmap. Do not list already-shipped tools as future work.

## Proposed

Nothing currently waiting for a horizon assignment.

## Now

Cloud-prep documentation for future cloud agents, and product listing copy in `Shelf-Details.md`.

| ID | Item | Area | Driver | Type | Date |
| --- | --- | --- | --- | --- | --- |
| FEAT-05 | Docs cloud-prep: AGENTS.md, harvest, decisions, plans, public standards subset, Shelf-Details, FEATURES, QA, PR template, ENVIRONMENTS | Docs | Product | Feature | 2026-11-18 |

(Allocations docs in root `ROADMAP.md` / `CHANGELOG.md` are corrected in the same docs PR; that mismatch is closed, not a remaining Now item.)

## Next

| ID | Item | Area | Driver | Type | Date |
| --- | --- | --- | --- | --- | --- |
| TD-01 | Bring `.github/workflows/test.yml` in line with the CI minutes budget (path filters, concurrency, no duplicate PR+push, draft skip, `timeout-minutes`; avoid hitting the live OpenAPI URL on docs-only PRs) | CI | Cost | Tech debt | 2026-11-18 |
| FEAT-01 / FEAT-03 | Decide the next product slice: hosted Streamable HTTP transport **or** npm publish (not both as the immediate slice) | Platform | Product | Feature | 2026-05-07 / 2026-11-18 |

## Later

| ID | Item | Area | Driver | Type | Date |
| --- | --- | --- | --- | --- | --- |
| FEAT-02 | Writes outside time entries | Writes | Product | Feature | 2026-05-07 |
| FEAT-04 | Other Ruddr OpenAPI endpoints not yet wrapped (allocations is already shipped) | Reads | Product | Feature | 2026-05-07 |
| TD-02 | Replace the stub `lint` script with a real linter | Quality | Engineering | Tech debt | 2026-05-08 |

The leftover of FEAT-01 or FEAT-03 that is **not** chosen as Next stays Later.

## Parked

| ID | Item | Area | Driver | Type | Date |
| --- | --- | --- | --- | --- | --- |
| TD-04 | Delete leftover GitHub branch `master` (checkpoint `3f496e6`, 2026-05-07) after confirming it is unused | Repo | Hygiene | Tech debt | 2026-05-07 / 2026-11-18 |
