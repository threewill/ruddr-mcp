# TC-03 — Missing `RUDDR_API_KEY`

| | |
| --- | --- |
| **Area** | Auth |
| **Automated** | Partial — exercised whenever `requireRuddrApiKey()` runs without the env var |

## Steps

1. Unset `RUDDR_API_KEY`.
2. Invoke any read tool (for example `ruddr_list_projects` with `limit: 1`).

## Expected

- Error text explains that `RUDDR_API_KEY` is missing and should be set in the MCP client `env` for the `ruddr` server.
- No Ruddr HTTP request is sent.
