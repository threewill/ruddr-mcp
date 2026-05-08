import { describe, expect, it, vi } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

describe("ruddr_list_time_entries", () => {
  it("calls /time-entries with date range filters and returns MCP text JSON", async () => {
    process.env.RUDDR_API_KEY = "test";

    const fetchMock = vi.fn(async (url: URL) => {
      expect(url.pathname).toBe("/api/workspace/time-entries");
      expect(url.searchParams.get("limit")).toBe("1");
      expect(url.searchParams.get("dateOnAfter")).toBe("2026-01-01");
      expect(url.searchParams.get("dateOnBefore")).toBe("2026-01-07");
      return new Response(JSON.stringify({ results: [], hasMore: false }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });

    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_list_time_entries", {
      limit: 1,
      dateOnAfter: "2026-01-01",
      dateOnBefore: "2026-01-07",
    });
    const json = parseToolJson(resp);
    expect(json).toEqual({ results: [], hasMore: false });
  });
});

