import { describe, expect, it, vi } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

describe("time entry write tools (unit)", () => {
  it("ruddr_create_time_entry errors when writes disabled", async () => {
    process.env.RUDDR_API_KEY = "test";
    delete process.env.RUDDR_ALLOW_WRITES;

    await expect(
      callTool("ruddr_create_time_entry", {
        typeId: "project_time",
        date: "2026-05-08",
        memberId: "a91e4c70-3f28-4d85-b6c9-7e2d8a150f43",
        projectId: "c5d7e2a8-9f14-4b63-8e71-a0d3c6b582f9",
        minutes: 30,
      })
    ).rejects.toThrow(/writes are disabled/i);
  });

  it("ruddr_create_time_entry POSTs /time-entries when enabled", async () => {
    process.env.RUDDR_API_KEY = "test";
    process.env.RUDDR_ALLOW_WRITES = "time_entries";

    const fetchMock = vi.fn(async (url: URL, init?: RequestInit) => {
      expect(url.pathname).toBe("/api/workspace/time-entries");
      expect(init?.method).toBe("POST");
      const body = JSON.parse(String((init as any).body));
      expect(body.minutes).toBe(30);
      return new Response(JSON.stringify({ id: "11111111-1111-1111-1111-111111111111" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_create_time_entry", {
      typeId: "project_time",
      date: "2026-05-08",
      memberId: "a91e4c70-3f28-4d85-b6c9-7e2d8a150f43",
      projectId: "c5d7e2a8-9f14-4b63-8e71-a0d3c6b582f9",
      minutes: 30,
    });
    expect(parseToolJson(resp).id).toBe("11111111-1111-1111-1111-111111111111");
  });

  it("ruddr_update_time_entry PATCHes /time-entries/{id} when enabled", async () => {
    process.env.RUDDR_API_KEY = "test";
    process.env.RUDDR_ALLOW_WRITES = "time_entries";

    const id = "22222222-2222-2222-2222-222222222222";
    const fetchMock = vi.fn(async (url: URL, init?: RequestInit) => {
      expect(url.pathname).toBe(`/api/workspace/time-entries/${id}`);
      expect(init?.method).toBe("PATCH");
      const body = JSON.parse(String((init as any).body));
      expect(body.minutes).toBe(60);
      expect(body.id).toBeUndefined();
      return new Response(JSON.stringify({ id, minutes: 60 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_update_time_entry", { id, minutes: 60 });
    const json = parseToolJson(resp);
    expect(json.id).toBe(id);
    expect(json.minutes).toBe(60);
  });

  it("ruddr_delete_time_entry DELETEs /time-entries/{id} when enabled", async () => {
    process.env.RUDDR_API_KEY = "test";
    process.env.RUDDR_ALLOW_WRITES = "time_entries";

    const id = "33333333-3333-3333-3333-333333333333";
    const fetchMock = vi.fn(async (url: URL, init?: RequestInit) => {
      expect(url.pathname).toBe(`/api/workspace/time-entries/${id}`);
      expect(init?.method).toBe("DELETE");
      return new Response(null, { status: 204 });
    });
    vi.stubGlobal("fetch", fetchMock as any);

    const resp = await callTool("ruddr_delete_time_entry", { id });
    expect(parseToolJson(resp)).toEqual({ deleted: true, id });
  });
});

