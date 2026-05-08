import { describe, expect, it, vi } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

function mockListEndpoint(expectedPath: string) {
  return vi.fn(async (url: URL) => {
    expect(url.pathname).toBe(`/api/workspace${expectedPath}`);
    return new Response(JSON.stringify({ results: [], hasMore: false }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  });
}

describe("phase 2 tools (unit)", () => {
  it("ruddr_list_project_members calls /project-members", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/project-members");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_project_members", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_project_tasks calls /project-tasks", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/project-tasks");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_project_tasks", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_project_expenses calls /project-expenses", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/project-expenses");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_project_expenses", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_project_budget_expenses calls /project-budget-expenses", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/project-budget-expenses");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_project_budget_expenses", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_invoices calls /invoices", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/invoices");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_invoices", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_expense_categories calls /expense-categories", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/expense-categories");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_expense_categories", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_expense_reports calls /expense-reports", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/expense-reports");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_expense_reports", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_expense_items calls /expense-items", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/expense-items");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_expense_items", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_holidays calls /holidays", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/holidays");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_holidays", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_opportunity_stages calls /opportunity-stages", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/opportunity-stages");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_opportunity_stages", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_workspace_members calls /members", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/members");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_workspace_members", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });

  it("ruddr_list_timesheets calls /timesheets", async () => {
    process.env.RUDDR_API_KEY = "test";
    const fetchMock = mockListEndpoint("/timesheets");
    vi.stubGlobal("fetch", fetchMock as any);
    const resp = await callTool("ruddr_list_timesheets", { limit: 1 });
    expect(parseToolJson(resp)).toEqual({ results: [], hasMore: false });
  });
});

