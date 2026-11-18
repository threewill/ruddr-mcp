---
name: ruddr-mcp-minimal-tests
overview: "Add a lightweight test setup for the Ruddr MCP server: 4 fast unit tests (mocked fetch) covering the current 4 tools, plus optional integration smoke tests that run in CI only when `RUDDR_API_KEY` is present as a GitHub Actions secret."
todos:
  - id: add-test-runner
    content: Add vitest deps and npm scripts for unit/integration tests
    status: completed
  - id: refactor-create-server
    content: Create src/server.ts and update src/index.ts to use it
    status: completed
  - id: unit-tests-4
    content: Add 4 unit tests (mock fetch) for list_clients, list_projects, list_time_entries, get_time_entry
    status: completed
  - id: integration-smoke
    content: Add minimal integration smoke tests gated on RUDDR_API_KEY
    status: completed
  - id: ci-workflow
    content: Add CI workflow for tests and gate release on tests
    status: completed
isProject: false
---

## Goal

Establish a **minimal, repeatable** test pattern that catches the common breakages for an MCP API wrapper (endpoint/params, pagination cursors, env wiring, tool response shape) without building a heavy testing harness.

## Approach (minimal)

- **Test runner**: `vitest` (ESM-friendly, fast, minimal config).
- **Unit tests (always run, mocked HTTP)**:
  - Mock `globalThis.fetch`.
  - Assert each tool calls the correct Ruddr endpoint with expected query params.
  - Assert tool return shape is MCP-compatible (`{ content: [{ type: "text", text: "...json..." }] }`).
- **Integration smoke tests (optional)**:
  - Execute real Ruddr calls using `RUDDR_API_KEY`.
  - Run locally via `npm run test:integration`.
  - In CI, only run when `RUDDR_API_KEY` secret is present; otherwise skip.

## Code changes (Repo A: this repo)

### 1) Add test dependencies and scripts

Update [`package.json`](package.json):

- Add dev deps: `vitest`, `@vitest/coverage-v8` (optional), `tsx` already present.
- Add scripts:
  - `test`: runs unit tests
  - `test:integration`: runs integration tests (gated)
  - `test:ci`: runs unit + integration if secret present

### 2) Add a small “tool registration surface” for testing

Create [`src/server.ts`](src/server.ts):

- Exports `createServer()` that constructs `McpServer` and registers the three modules:
  - `registerClientTools(server)`
  - `registerProjectTools(server)`
  - `registerTimeEntryTools(server)`

Update [`src/index.ts`](src/index.ts) to call `createServer()` instead of duplicating registrations. This keeps tests from needing to import the CLI entrypoint.

### 3) Unit tests (4 total)

Create folder `test/unit/` and add 4 tests (one per tool):

- `test/unit/ruddr_list_clients.test.ts`
- `test/unit/ruddr_list_projects.test.ts`
- `test/unit/ruddr_list_time_entries.test.ts`
- `test/unit/ruddr_get_time_entry.test.ts`

Each unit test will:

- Set `process.env.RUDDR_API_KEY = "test"`.
- Stub `globalThis.fetch` and capture its `URL`.
- Return a mocked `Response` with `{ results: [], hasMore: false }` (or a single time entry for `get`).
- Invoke the tool via the MCP server’s execution entrypoint (SDK method on `McpServer`, e.g. `executeToolHandler`) and assert:
  - Called endpoint path is correct (`/clients`, `/projects`, `/time-entries`, `/time-entries/{id}`)
  - Query params are set when provided (e.g. `limit=100`, `dateOnAfter=...`)
  - Returned response is valid MCP “text content” JSON.

### 4) Integration smoke tests (small)

Create folder `test/integration/` with `test/integration/smoke.test.ts`:

- If `process.env.RUDDR_API_KEY` is missing, **skip** the suite.
- Run:
  - `ruddr_list_projects` with `{ limit: 1 }`
  - `ruddr_list_clients` with `{ limit: 1 }`
  - (optional) `ruddr_list_time_entries` with `{ limit: 1, dateOnAfter: <today-7>, dateOnBefore: <today> }`
- Assert the tool returns parseable JSON text and the expected top-level shape (`results`, `hasMore`).

## CI wiring

### 1) Add a test workflow

Create `.github/workflows/test.yml`:

- On `pull_request` and `push` to `main`/`master`.
- Steps:
  - `npm ci`
  - `npm run gen:types` (or skip if you decide to commit the generated types only)
  - `npm run build`
  - `npm test`
  - If secret present: run `npm run test:integration`

### 2) Gate release on tests

Update [`.github/workflows/release.yml`](.github/workflows/release.yml):

- Run the same test steps before packaging the zip.

## Notes / defaults

- **Mocking**: unit tests use mocked fetch so they don’t depend on Ruddr availability, rate limits, or credentials.
- **Integration**: kept intentionally tiny (2–3 calls) so CI stays stable.
- **No snapshot testing** in v0.1.x; we can add a tool-schema snapshot later if Phase 2 adds lots of tools.

## Test plan

- `npm test` runs 4 unit tests offline.
- `RUDDR_API_KEY=... npm run test:integration` runs 1 smoke suite against Ruddr.
- In GitHub Actions, integration suite runs only when `RUDDR_API_KEY` secret is configured.