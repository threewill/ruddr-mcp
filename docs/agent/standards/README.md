# ThreeWill engineering standards (vendored public subset)

**Do not edit this folder by hand.** Refresh it only with a copy-and-sync PR.

This is a **public** MIT repository. Standards are a **copy**, never a git submodule.

| | |
| --- | --- |
| **Source repo** | [https://github.com/threewill/threewill-engineering-standards](https://github.com/threewill/threewill-engineering-standards) |
| **Branch copied** | `master` |
| **Commit SHA** | `5baefffbf49d3d9dae2ae996f2d2be6687f53439` |
| **Copy date** | 2026-11-18 (America/New_York) |

This `README.md` is the only file written by the sync (source, SHA, date, and the include/exclude list). It is not the upstream README; that README describes a **git submodule** at `.cursor/rules/`, which this product repo does **not** use.

## How this product consumes the copy

- Cursor loads thin pointers from **`.cursor/rules/*.mdc`**, which point here.
- Product-only guidance lives in **`AGENTS.md`**, **`docs/agent/`** (outside this folder), and **`docs/decisions.md`**.
- Paths inside the vendored `*.mdc` files that say `.cursor/rules/…` mean **this folder** (`docs/agent/standards/…`).

## Included (curated public subset)

Copied from that commit:

- `plan-mode-first.mdc` and `docs/plan-mode-first.md`
- `team-non-negotiables.mdc` and `docs/team-non-negotiables.md`
- `ci-minutes-budget.mdc` and `docs/ci-minutes-budget.md`
- `mcp-microsoft-learn.mdc` and `docs/mcp/microsoft-learn.md`
- `generated-image-preview.mdc`

SPFx rules were not copied; this product is a Node.js stdio MCP server, not SharePoint Framework.

## Left out of this copy

Intentionally **not** vendored (internal plumbing, not relevant to this public repo, or both):

- Managed Services Dataverse MCP docs and `mcp-dataverse-managed-services.mdc`
- Internal Ruddr MCP routing rule (`mcp-ruddr.mdc`) and `docs/mcp/ruddr.md`
- Work IQ (`mcp-workiq.mdc`, `docs/mcp/workiq.md`)
- `link-memory-bridge.mdc`
- `managed-services-canvas-top-of-mind.mdc`
- Replicate image-handling rule (`replicate-image-handling.mdc`)
- Managed Services `AGENTS` snippet (`templates/AGENTS.mcp-managed-services.snippet.md`)
- All of `tools/*.ps1`
- SPFx rules, style guide, new-solution docs, demo-data, provisioning, ThreeWill UI, and `patterns/ThreeWillFooter`
- Remaining `templates/` (product snippet, prerequisites snippet, SPFx asset typings)
- Upstream `README.md`, `docs/prerequisites.md`, `docs/mcp/README.md`

`generated-image-preview.mdc` still mentions a Replicate-specific companion rule that is **not** in this folder. Treat image preview-and-approve as the rule; ignore the missing Replicate path.

## How to refresh (sync PR)

1. Check out `threewill-engineering-standards` at the desired `master` commit.
2. Replace the included files listed above (keep this `README.md`).
3. Update the SHA and copy date (America/New_York) in this file.
4. Keep `.cursor/rules/*.mdc` as pointers (add a pointer if a new **included** root `*.mdc` appeared).
5. Do not add the left-out files.
6. Open a PR that only refreshes the copy (plus pointer files if needed).
