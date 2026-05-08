import { describe, expect, it, vi } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

describe("ruddr_get_time_entry", () => {
  it("calls /time-entries/{id} and returns MCP text JSON", async () => {
    process.env.RUDDR_API_KEY = "test";

    const id = "f8a2c4e1-7b3d-4f96-ae52-d1c8b9f03e74";

    const fetchMock = vi.fn(async (url: URL) => {
      expect(url.pathname).toBe(`/api/workspace/time-entries/${id}`);
      return new Response(JSON.stringify({ id }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });

    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_get_time_entry", { id });
    const json = parseToolJson(resp);
    expect(json).toEqual({ id });
  });
});

