# TC-04 — List allocations

| | |
| --- | --- |
| **Area** | Reads |
| **Automated** | Yes — `test/unit/phase2_tools.test.ts` (`ruddr_list_allocations calls /allocations`). Live JSON shape is optional. |

## Steps

1. With writes **off**, invoke `ruddr_list_allocations` with `limit: 1` and optional `endOnAfter` / `startOnBefore` for a short window.
2. On a live workspace, confirm JSON text with `results` / `hasMore`.

## Expected

- Path is `/allocations`.
- Tool is available without `RUDDR_ALLOW_WRITES`.
- Date filters are `YYYY-MM-DD`.
