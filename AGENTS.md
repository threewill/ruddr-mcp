# Ruddr MCP Server — agent notes

Self-hosted **stdio MCP server** that wraps the [Ruddr REST API](https://docs.ruddr.io/). Package name `ruddr-mcp`, current version **0.3.0**. Unofficial community integration; not affiliated with, endorsed by, or supported by Ruddr.

**Stack:** Node.js 18+ (CI uses 20), TypeScript ESM, `@modelcontextprotocol/sdk`, Zod, `tsup` bundle to `dist/index.js`. Data lives in the **caller’s Ruddr workspace** over HTTPS; this repo stores no workspace data.

Product marketing copy: `Shelf-Details.md`. Public-repo rule: no secret **values**, no personal names in docs, no organization-specific PSA filters, no client names.

## Read first

1. `docs/agent/standards/` — vendored public subset of ThreeWill engineering standards (never edit by hand; see `docs/agent/standards/README.md` for SHA). Paths in those files that say `.cursor/rules/` mean this copy.
2. `docs/agent/context-harvest.md` — harvested local-chat context (verified against code).
3. `docs/decisions.md` — decision log D01–D12.
4. `docs/plans/` — historical Cursor plans (see `docs/plans/README.md` for done/superseded).
5. `README.md`, `SECURITY.md`, `docs/FEATURES.md`, `docs/ops/ENVIRONMENTS.md`.
6. `src/server.ts` and `src/tools/` before adding or renaming tools.
7. `roadmap/ROADMAP.md` and `roadmap/BACKLOG.md` for horizons. Root `ROADMAP.md` is the short GitHub-facing shipped view.

## Plan first

**Always plan first except bug fixes.** Features, enhancements, and refactors: written plan, then approval, then implementation (local Cursor Plan mode, or a `docs/plans/<topic>.md` PR for cloud agents). Bug fixes may go straight to a PR. Maintainers review and merge; do not merge.

## Pitfalls (do not regress)

- **MCP config is read at spawn.** After changing `mcp.json` or env, fully quit and reopen the MCP client. Closing a window is not enough.
- **`RUDDR_API_KEY` must be in the MCP `env` block** (or resolvable by the client process). A key only in your shell will not reach the server.
- **Writes stay off** unless `RUDDR_ALLOW_WRITES` includes `time_entries`. Write tools must keep the clear error when the gate is off.
- **Unit tests mock `fetch`** and set `RUDDR_API_KEY=test`. They must not call the network. Live integration needs the real key; mutating write tests also need `RUDDR_RUN_WRITE_TESTS=1`.
- **Release zip includes `dist/`.** A fresh git clone still needs `npm install` and `npm run build`.
- **Do not change `.github/workflows/` in a docs PR.** CI minutes gaps are `TD-01`.
- **This repo is public MIT.** Do not copy internal runbooks, tenant IDs, or secret values into docs or PRs. Secret **names** (`RUDDR_API_KEY`, …) are fine.

## Documented exceptions (team non-negotiables)

- **App Insights:** not applicable. This is a local stdio process with no hosted runtime; errors return as MCP tool errors. Alternate: client logs plus Ruddr API error text.
- **Automatic versioning:** GitHub Releases are driven by `v*` tags and `package.json` version (currently `0.3.0`). Not CI-bumped on every build.
- **Lint:** `npm run lint` is a stub (`TD-02`). Typecheck and unit tests run in CI.
- **Hosted health endpoint:** none; there is no hosted HTTP server in v0.3.0 (see `FEAT-01`).

## PRs, docs, versioning

- Same-PR checklist: `.github/PULL_REQUEST_TEMPLATE.md` (features, architecture, regression — or `No … impact: <reason>`).
- Behavior change → update `docs/FEATURES.md`, README tool list if needed, and `CHANGELOG.md`.
- Horizons live in `roadmap/`; do not reintroduce a second conflicting future list in root `ROADMAP.md`.
- Releases: tag `vX.Y.Z` → `.github/workflows/release.yml` publishes `ruddr-mcp-vX.Y.Z.zip`. No npm publish in v0.x (`FEAT-03`).
- Regression: `docs/qa/REGRESSION-PLAYBOOK.md` and `docs/qa/test-cases/`.
- Batch commits and push once per review round (CI minutes).
