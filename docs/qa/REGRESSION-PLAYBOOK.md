# Regression playbook

Manual and automated checks for **Ruddr MCP Server**. Automated coverage is vitest (mocked unit tests always; live integration only with credentials). Starter cases: [test-cases/](test-cases/).

Use this playbook when changing tools, env gating, the HTTP client, or MCP registration docs. Record `No regression impact: <reason>` on PRs that cannot affect runtime behavior (for example docs-only cloud-prep).

## Always (no Ruddr workspace required)

1. `npm test` — mocked unit tests must pass and must not call the network.
2. `npm run typecheck`.
3. Confirm write tools still error when `RUDDR_ALLOW_WRITES` is unset ([TC-02](test-cases/TC-02-write-gate.md)).
4. Confirm missing `RUDDR_API_KEY` still errors clearly ([TC-03](test-cases/TC-03-missing-api-key.md)).

## When a live key is available (optional)

5. `npm run test:integration` — list projects/clients/time entries with `limit: 1`.
6. Allocations list with a small date window ([TC-04](test-cases/TC-04-list-allocations.md)).
7. Do **not** run `RUDDR_RUN_WRITE_TESTS=1` against a production workspace unless that is explicitly requested.

## After MCP client config changes

8. Full quit and reopen of Cursor or Claude Desktop ([TC-05](test-cases/TC-05-mcp-restart.md)).
9. Confirm `dist/index.js` exists at the configured path (release zip or local `npm run build`).

## Tool-count guard

There are **20** `server.registerTool` registrations (17 read + 3 gated write). Adding or removing a tool is a features + README + FEATURES.md + regression change in the same PR.
