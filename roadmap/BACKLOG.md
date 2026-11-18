# Backlog

Working list for **Ruddr MCP Server**. Horizons: see [ROADMAP.md](ROADMAP.md).

**IDs:** `BUG-nn` (bugs), `TD-nn` (tech debt), `UX-nn` (UX), `FEAT-nn` (features).  
**Tags:** Area, Driver, Type. Bug items also have **Severity** (blocker / high / medium / low).  
Dates are America/New_York.

## Open

### TD-01 — CI minutes budget gaps in `test.yml`

| | |
| --- | --- |
| **Horizon** | Next |
| **Area** | CI |
| **Driver** | Cost |
| **Type** | Tech debt |
| **Source** | Harvest 2026-11-18 vs `docs/agent/standards/docs/ci-minutes-budget.md` |
| **Date** | 2026-11-18 |

`.github/workflows/test.yml` runs on every `pull_request` and every `push` to `main`/`master`. It caches npm (good) but has no path filters, no `concurrency`, no draft skip, and no `timeout-minutes`. Docs-only PRs still run `npm ci`, live `npm run gen:types` (hits `https://docs.ruddr.io/openapi.json`), typecheck, and unit tests. Do **not** change the workflow in a docs-only PR.

Suggested fix and minutes estimate: docs PR body for the cloud-prep PR.

### TD-02 — Lint script is a stub

| | |
| --- | --- |
| **Horizon** | Later |
| **Area** | Quality |
| **Driver** | Engineering |
| **Type** | Tech debt |
| **Source** | `package.json` |
| **Date** | 2026-05-08 |

`npm run lint` is `echo "(no linter yet)"`. Typecheck and unit tests still run in CI.

### TD-04 — Leftover GitHub `master` branch

| | |
| --- | --- |
| **Horizon** | Parked |
| **Area** | Repo |
| **Driver** | Hygiene |
| **Type** | Tech debt |
| **Source** | Harvest inventory; `origin/master` at `3f496e6` (*checkpoint before checking out master*, 2026-05-07) |
| **Date** | 2026-05-07 / logged 2026-11-18 |

Small leftover from repo setup. Default branch is `main`. Safe to delete when a maintainer confirms nothing still points at it. `test.yml` still lists `master` in `push.branches`.

### FEAT-01 — Hosted Streamable HTTP transport

| | |
| --- | --- |
| **Horizon** | Next (candidate; decide vs FEAT-03) |
| **Area** | Platform |
| **Driver** | Product |
| **Type** | Feature |
| **Source** | P-server, root ROADMAP future |
| **Date** | 2026-05-07 |

v0.3.0 is stdio-only. A hosted HTTP transport would need its own auth, hosting, and security review.

### FEAT-02 — Writes outside time entries

| | |
| --- | --- |
| **Horizon** | Later |
| **Area** | Writes |
| **Driver** | Product |
| **Type** | Feature |
| **Source** | P-server, root ROADMAP future |
| **Date** | 2026-05-07 |

Create/update/delete exist only for time entries and stay behind `RUDDR_ALLOW_WRITES`.

### FEAT-03 — Publish to npm

| | |
| --- | --- |
| **Horizon** | Next (candidate; decide vs FEAT-01) |
| **Area** | Distribution |
| **Driver** | Product |
| **Type** | Feature |
| **Source** | P-server, root ROADMAP future |
| **Date** | 2026-05-07 |

v0.x ships GitHub Release zips only. An npm package could be added without breaking the zip install shape.

### FEAT-04 — Other OpenAPI endpoints

| | |
| --- | --- |
| **Horizon** | Later |
| **Area** | Reads |
| **Driver** | Product |
| **Type** | Feature |
| **Source** | Root ROADMAP future; C2 for allocations carve-out |
| **Date** | 2026-05-07 / 2026-05-08 |

Wrap additional Ruddr OpenAPI operations that are not tools yet. **`ruddr_list_allocations` is not in this item** — it shipped in PR #4.

### FEAT-05 — Cloud-prep / Shelf listing docs

| | |
| --- | --- |
| **Horizon** | Now |
| **Area** | Docs |
| **Driver** | Product |
| **Type** | Feature |
| **Source** | Cloud-prep harvest 2026-11-18 |
| **Date** | 2026-11-18 |

AGENTS.md, context harvest, decision log, plans index, public standards subset, Shelf-Details, FEATURES, backlog/roadmap shape, PR template, regression playbook, ENVIRONMENTS.md.

## Closed in this docs PR

### TD-03 — Allocations omitted from changelog/roadmap — **done**

| | |
| --- | --- |
| **Horizon** | Closed |
| **Area** | Docs |
| **Driver** | Accuracy |
| **Type** | Tech debt |
| **Source** | README vs root ROADMAP/CHANGELOG; PR #4 |
| **Date** | 2026-07-05 / fixed 2026-11-18 |

`ruddr_list_allocations` shipped 2026-05-08 (PR #4) and is listed in the README. Root `ROADMAP.md` and `CHANGELOG.md` now show it as shipped.

## Empty ID series

No open `BUG-nn` or `UX-nn` items at harvest time.
