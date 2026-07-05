# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 0.3.x   | Yes       |
| < 0.3   | No        |

## Reporting a vulnerability

If you discover a security issue in this MCP server (not in Ruddr itself), please email the maintainers via a private channel rather than opening a public GitHub issue.

For vulnerabilities in the Ruddr platform or API, contact [Ruddr support](https://www.ruddr.io/) directly.

## API keys

- **Never commit** `RUDDR_API_KEY` or paste it into issues, PRs, or chat logs.
- Store keys in your MCP client's `env` block or OS environment variables only.
- Use a dedicated API key with the minimum permissions your workflow needs.
- Rotate keys promptly if you suspect exposure.

## Write operations

Time entry create/update/delete tools are **disabled by default**. Only enable writes when you explicitly set `RUDDR_ALLOW_WRITES=time_entries` in the MCP server environment.
