# Environments

There is **no hosted environment** for Ruddr MCP Server. Each user runs a local stdio process. Names only — never put secret **values** in this repo, issues, or PRs.

## Runtime (MCP client)

| Name | Required | Role |
| --- | --- | --- |
| `RUDDR_API_KEY` | Yes | Bearer token for the Ruddr workspace API. Set in the MCP client `env` block or the OS environment the client can resolve. Created in Ruddr Settings → API Keys. |
| `RUDDR_BASE_URL` | No | Defaults to `https://www.ruddr.io/api/workspace`. |
| `RUDDR_ALLOW_WRITES` | No | Comma-separated write areas. Set to `time_entries` to enable create/update/delete time-entry tools. Default: writes off. |

“Deploy” = download `ruddr-mcp-vX.Y.Z.zip` from GitHub Releases (or `npm install` + `npm run build` from a clone), point the client at `dist/index.js`, set the names above, fully restart the client.

## Tests

| Name | Required | Role |
| --- | --- | --- |
| `RUDDR_API_KEY` | For integration only | Live smoke tests (`npm run test:integration`). Unit tests use the placeholder value `test` with mocked `fetch`. |
| `RUDDR_ALLOW_WRITES` | For write integration | Must include `time_entries`. |
| `RUDDR_RUN_WRITE_TESTS` | For write integration | Set to `1` to opt into tests that create/update/delete time entries. |

Do not run write tests against a production workspace casually.

## GitHub Actions

| Name | Where | Role |
| --- | --- | --- |
| `RUDDR_API_KEY` | Repository **Actions secret** of the same name | Optional. If present, `test.yml` and `release.yml` run live integration tests. If absent, those steps are skipped. |

Release workflow `.github/workflows/release.yml` runs on tags `v*` only and uploads `ruddr-mcp-vX.Y.Z.zip`.

`.env` and `.env.*` are gitignored. Do not commit them.
