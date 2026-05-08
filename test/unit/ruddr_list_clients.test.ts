import { describe, expect, it, vi } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

describe("ruddr_list_clients", () => {
  it("calls /clients with query params and returns MCP text JSON", async () => {
    process.env.RUDDR_API_KEY = "test";

    const fetchMock = vi.fn(async (url: URL, init?: RequestInit) => {
      expect(url.pathname).toBe("/api/workspace/clients");
      expect(url.searchParams.get("limit")).toBe("5");
      expect(url.searchParams.get("code")).toBe("ABC");
      expect(init?.headers).toBeTruthy();
      const auth = (init?.headers as any)?.Authorization ?? (init?.headers as any)?.authorization;
      expect(auth).toBe("Bearer test");
      return new Response(JSON.stringify({ results: [], hasMore: false }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });

    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_list_clients", { limit: 5, code: "ABC" });
    const json = parseToolJson(resp);
    expect(json).toEqual({ results: [], hasMore: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

