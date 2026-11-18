# TC-02 — Time-entry write gate

| | |
| --- | --- |
| **Area** | Writes |
| **Automated** | Yes — `test/unit/time_entry_writes.test.ts` |

## Steps

1. Set `RUDDR_API_KEY=test`. Leave `RUDDR_ALLOW_WRITES` unset.
2. Invoke `ruddr_create_time_entry` with a valid payload (uuid member/project, `typeId`, `date`, `minutes`).
3. Set `RUDDR_ALLOW_WRITES=time_entries` and mock `fetch`.
4. Invoke `ruddr_create_time_entry` again.

## Expected

- Step 2 throws (or returns an error) that writes are disabled and mentions `RUDDR_ALLOW_WRITES=time_entries`.
- Step 4 `POST`s `/time-entries` on the workspace API.
