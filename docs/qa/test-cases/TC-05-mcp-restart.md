# TC-05 — MCP client restart after config change

| | |
| --- | --- |
| **Area** | Setup |
| **Automated** | No (desktop client) |

## Steps

1. Install from the GitHub Release zip (or `npm run build`) so `dist/index.js` exists.
2. Put `RUDDR_API_KEY` in the MCP client `env` block (not only in a terminal).
3. **Fully quit and reopen** Cursor or Claude Desktop (closing a window is not enough).
4. Confirm the `ruddr` tools appear (20 tools when writes are configured; write tools still exist when gated — they error until the flag is on).

## Expected

- Tools load after a full restart.
- Missing key in `env` produces “Missing `RUDDR_API_KEY`”.
- Trailing commas in `mcp.json` prevent the server from loading; JSON must be valid.
