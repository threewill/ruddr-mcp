import { describe, expect, it, vi } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

describe("ruddr_list_projects", () => {
  it("calls /projects with query params and returns MCP text JSON", async () => {
    process.env.RUDDR_API_KEY = "test";

    const fetchMock = vi.fn(async (url: URL) => {
      expect(url.pathname).toBe("/api/workspace/projects");
      expect(url.searchParams.get("limit")).toBe("10");
      expect(url.searchParams.get("statusId")).toBe("in_progress");
      expect(url.searchParams.get("nameContains")).toBe("Support");
      return new Response(JSON.stringify({ results: [], hasMore: false }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });

    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_list_projects", {
      limit: 10,
      statusId: "in_progress",
      nameContains: "Support",
    });
    const json = parseToolJson(resp);
    expect(json).toEqual({ results: [], hasMore: false });
  });
});

