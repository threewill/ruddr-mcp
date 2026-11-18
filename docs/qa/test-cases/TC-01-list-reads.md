# TC-01 — List reads (mocked)

| | |
| --- | --- |
| **Area** | Reads |
| **Automated** | Yes — `test/unit/ruddr_list_clients.test.ts`, `ruddr_list_projects.test.ts`, `ruddr_list_time_entries.test.ts`, `phase2_tools.test.ts` |

## Steps

1. `RUDDR_API_KEY=test` (unit tests set this).
2. Mock `fetch` to return `{ results: [], hasMore: false }` (or a single object for get-by-id).
3. Invoke `ruddr_list_clients`, `ruddr_list_projects`, and `ruddr_list_time_entries` with `limit: 1`.

## Expected

- Request paths are `/clients`, `/projects`, `/time-entries` under the default base URL.
- Tool result is MCP text content containing JSON with `results` / `hasMore` where the API uses that shape.
- No real network call.
