# Ruddr MCP Server

A self-hosted Model Context Protocol (MCP) server that wraps the Ruddr REST API so Cursor, Claude Desktop, and other MCP clients can work with a Ruddr workspace. It runs locally over stdio: each user supplies their own Ruddr API key, and the server calls Ruddr on their behalf. There is no hosted multi-tenant service to sign up for.

The current release (v0.3.0) exposes twenty tools. Most are read-only: clients, projects, members, tasks, expenses, invoices, timesheets, holidays, opportunity stages, allocations, and time entries. Create, update, and delete for time entries exist but stay disabled until the user opts in with an environment flag. The project ships as a GitHub Release zip with a prebuilt Node.js bundle, so install is unzip, point the MCP client at `dist/index.js`, and restart.

This is an unofficial community integration. It is not affiliated with, endorsed by, or supported by Ruddr. Users need their own Ruddr workspace and API key.

---

## A Value Proposition

PSA data is often stuck behind a web UI, so an AI assistant cannot list projects, check planned capacity, or draft time entries without copy-paste. Ruddr MCP Server runs on the user’s machine, uses their own API key, and covers a practical read surface plus optional, gated time-entry writes. The result is an assistant that can query the workspace and, when explicitly allowed, post time — without sending the API key to a third-party host.

The server is a single Node.js process launched by the MCP client. Types are generated from Ruddr’s public OpenAPI spec; the HTTP client paginates list endpoints and backs off on HTTP 429. Writes stay off until `RUDDR_ALLOW_WRITES=time_entries` is set.

---

## An Elevator Pitch

Ruddr MCP Server is a self-hosted MCP server for the Ruddr PSA API. Install the release, point Cursor or Claude Desktop at it with your own API key, and get twenty tools, including opt-in time-entry writes.

---

## The Key Features

### Setup and safety
- **Local stdio server** for Cursor, Claude Desktop, and other MCP clients
- **Your Ruddr API key** stays in the MCP client’s env or the OS environment, never in the repo
- **Read-only by default**; time-entry writes require `RUDDR_ALLOW_WRITES=time_entries`
- **Unofficial** integration with a public-API disclaimer and a security policy

### Workspace reads
- **Clients and projects**, including project members, tasks, and expenses
- **Time entries and timesheets**, with list and get-by-id
- **Invoices, expense categories, reports, and items**
- **Workspace members, holidays, and opportunity stages**
- **Allocations** for planned resource capacity over a date range

### Time-entry writes (opt-in)
- **Create, update, and delete** time entries, only when the write gate is on
- **Write tools refuse to run** until the environment flag is set

### Distribution and quality
- **GitHub Release zip** with a prebuilt `dist/index.js` (no `npm install` required to run)
- **OpenAPI-derived types**, pagination, and 429 backoff against the Ruddr API
- **Unit tests** (mocked, always on) and optional live integration tests
