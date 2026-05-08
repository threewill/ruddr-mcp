import { describe, expect, it } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

const hasKey = Boolean(process.env.RUDDR_API_KEY);

describe.skipIf(!hasKey)("integration smoke", () => {
  it("ruddr_list_projects returns JSON results", async () => {
    const resp = await callTool("ruddr_list_projects", { limit: 1 });
    const json = parseToolJson(resp);
    expect(Array.isArray(json.results ?? [])).toBe(true);
    if (json.hasMore !== undefined) expect(typeof json.hasMore).toBe("boolean");
  });

  it("ruddr_list_clients returns JSON results", async () => {
    const resp = await callTool("ruddr_list_clients", { limit: 1 });
    const json = parseToolJson(resp);
    expect(Array.isArray(json.results ?? [])).toBe(true);
    if (json.hasMore !== undefined) expect(typeof json.hasMore).toBe("boolean");
  });

  it("ruddr_list_time_entries returns JSON results for a small date window", async () => {
    const to = new Date();
    const from = new Date(to);
    from.setDate(to.getDate() - 14);

    const fmt = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;

    const resp = await callTool("ruddr_list_time_entries", {
      limit: 1,
      dateOnAfter: fmt(from),
      dateOnBefore: fmt(to),
    });
    const json = parseToolJson(resp);
    expect(Array.isArray(json.results ?? [])).toBe(true);
    if (json.hasMore !== undefined) expect(typeof json.hasMore).toBe("boolean");
  });
});

