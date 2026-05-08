import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { RuddrClient } from "../ruddr/client.js";
import { jsonResponse } from "../mcp/response.js";

const cursorSchema = {
  limit: z.number().int().min(1).max(100).optional(),
  startingAfter: z.string().uuid().optional(),
  endingBefore: z.string().uuid().optional(),
};

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export function registerPhase2Tools(server: McpServer) {
  const client = () => new RuddrClient();

  // Project members
  const projectMembersSchema = z.object({ ...cursorSchema, projectId: z.string().uuid().optional() });
  server.registerTool(
    "ruddr_list_project_members",
    {
      title: "Ruddr List Project Members",
      description: "List project members (optionally filtered by projectId).",
      inputSchema: projectMembersSchema,
    },
    async (args) => {
      const input = projectMembersSchema.parse(args);
      return jsonResponse(await client().list("/project-members", input));
    }
  );

  // Project tasks
  const projectTasksSchema = z.object({
    ...cursorSchema,
    projectId: z.string().uuid().optional(),
    code: z.string().optional(),
    name: z.string().optional(),
    nameContains: z.string().optional(),
    nameStartsWith: z.string().optional(),
    nameEndsWith: z.string().optional(),
  });
  server.registerTool(
    "ruddr_list_project_tasks",
    {
      title: "Ruddr List Project Tasks",
      description: "List project tasks (optionally filtered by projectId).",
      inputSchema: projectTasksSchema,
    },
    async (args) => {
      const input = projectTasksSchema.parse(args);
      return jsonResponse(await client().list("/project-tasks", input));
    }
  );

  // Project expenses
  const projectExpensesSchema = z.object({ ...cursorSchema, projectId: z.string().uuid().optional() });
  server.registerTool(
    "ruddr_list_project_expenses",
    {
      title: "Ruddr List Project Expenses",
      description: "List project expenses (optionally filtered by projectId).",
      inputSchema: projectExpensesSchema,
    },
    async (args) => {
      const input = projectExpensesSchema.parse(args);
      return jsonResponse(await client().list("/project-expenses", input));
    }
  );

  // Project budget expenses
  const projectBudgetExpensesSchema = z.object({
    ...cursorSchema,
    projectId: z.string().uuid().optional(),
  });
  server.registerTool(
    "ruddr_list_project_budget_expenses",
    {
      title: "Ruddr List Project Budget Expenses",
      description: "List project budget expenses (optionally filtered by projectId).",
      inputSchema: projectBudgetExpensesSchema,
    },
    async (args) => {
      const input = projectBudgetExpensesSchema.parse(args);
      return jsonResponse(await client().list("/project-budget-expenses", input));
    }
  );

  // Invoices
  const invoicesSchema = z.object({
    ...cursorSchema,
    clientId: z.string().uuid().optional(),
    issuedOn: dateSchema.optional(),
    issuedOnAfter: dateSchema.optional(),
    issuedOnOnAfter: dateSchema.optional(),
    issuedOnBefore: dateSchema.optional(),
    issuedOnOnBefore: dateSchema.optional(),
  });
  server.registerTool(
    "ruddr_list_invoices",
    {
      title: "Ruddr List Invoices",
      description: "List invoices (optionally filtered by clientId and issuedOn date filters).",
      inputSchema: invoicesSchema,
    },
    async (args) => {
      const input = invoicesSchema.parse(args);
      return jsonResponse(await client().list("/invoices", input));
    }
  );

  // Expense categories
  const expenseCategoriesSchema = z.object({ ...cursorSchema, name: z.string().optional() });
  server.registerTool(
    "ruddr_list_expense_categories",
    {
      title: "Ruddr List Expense Categories",
      description: "List expense categories (optionally filtered by name).",
      inputSchema: expenseCategoriesSchema,
    },
    async (args) => {
      const input = expenseCategoriesSchema.parse(args);
      return jsonResponse(await client().list("/expense-categories", input));
    }
  );

  // Expense reports
  const expenseReportsSchema = z.object({ ...cursorSchema });
  server.registerTool(
    "ruddr_list_expense_reports",
    {
      title: "Ruddr List Expense Reports",
      description: "List expense reports (paginated).",
      inputSchema: expenseReportsSchema,
    },
    async (args) => {
      const input = expenseReportsSchema.parse(args);
      return jsonResponse(await client().list("/expense-reports", input));
    }
  );

  // Expense items
  const expenseItemsSchema = z.object({ ...cursorSchema, expenseReportId: z.string().uuid().optional() });
  server.registerTool(
    "ruddr_list_expense_items",
    {
      title: "Ruddr List Expense Items",
      description: "List expense items (optionally filtered by expenseReportId).",
      inputSchema: expenseItemsSchema,
    },
    async (args) => {
      const input = expenseItemsSchema.parse(args);
      return jsonResponse(await client().list("/expense-items", input));
    }
  );

  // Holidays
  const holidaysSchema = z.object({ ...cursorSchema, name: z.string().optional() });
  server.registerTool(
    "ruddr_list_holidays",
    {
      title: "Ruddr List Holidays",
      description: "List holidays (optionally filtered by name).",
      inputSchema: holidaysSchema,
    },
    async (args) => {
      const input = holidaysSchema.parse(args);
      return jsonResponse(await client().list("/holidays", input));
    }
  );

  // Opportunity stages
  const opportunityStagesSchema = z.object({ ...cursorSchema, name: z.string().optional() });
  server.registerTool(
    "ruddr_list_opportunity_stages",
    {
      title: "Ruddr List Opportunity Stages",
      description: "List opportunity stages (optionally filtered by name).",
      inputSchema: opportunityStagesSchema,
    },
    async (args) => {
      const input = opportunityStagesSchema.parse(args);
      return jsonResponse(await client().list("/opportunity-stages", input));
    }
  );

  // Workspace members (Ruddr API uses /members)
  const membersSchema = z.object({
    ...cursorSchema,
    name: z.string().optional(),
    nameContains: z.string().optional(),
    nameStartsWith: z.string().optional(),
    nameEndsWith: z.string().optional(),
    email: z.string().optional(),
    emailContains: z.string().optional(),
    emailStartsWith: z.string().optional(),
    emailEndsWith: z.string().optional(),
  });
  server.registerTool(
    "ruddr_list_workspace_members",
    {
      title: "Ruddr List Workspace Members",
      description: "List workspace members (optionally filtered by name/email).",
      inputSchema: membersSchema,
    },
    async (args) => {
      const input = membersSchema.parse(args);
      return jsonResponse(await client().list("/members", input));
    }
  );

  // Allocations (resource capacity / planning; Ruddr API GET /allocations)
  const allocationsSchema = z.object({
    ...cursorSchema,
    assignmentTypeId: z.enum(["project", "time_off"]).optional(),
    memberId: z.string().uuid().optional(),
    startBefore: dateSchema.optional(),
    startOnBefore: dateSchema.optional(),
    endAfter: dateSchema.optional(),
    endOnAfter: dateSchema.optional(),
  });
  server.registerTool(
    "ruddr_list_allocations",
    {
      title: "Ruddr List Allocations",
      description:
        "List allocations (resource capacity planning): hours assigned per member per project or time off, with optional filters on assignment type, member, and allocation start/end dates (YYYY-MM-DD). Combine date filters to select allocations overlapping a range (e.g. endOnAfter + startOnBefore). Paginated.",
      inputSchema: allocationsSchema,
    },
    async (args) => {
      const input = allocationsSchema.parse(args);
      return jsonResponse(await client().list("/allocations", input));
    }
  );

  // Timesheets
  const timesheetsSchema = z.object({
    ...cursorSchema,
    memberId: z.string().uuid().optional(),
    start: dateSchema.optional(),
    startOnAfter: dateSchema.optional(),
    startOnBefore: dateSchema.optional(),
    end: dateSchema.optional(),
    endOnAfter: dateSchema.optional(),
    endOnBefore: dateSchema.optional(),
  });
  server.registerTool(
    "ruddr_list_timesheets",
    {
      title: "Ruddr List Timesheets",
      description: "List timesheets (optionally filtered by memberId and start/end date filters).",
      inputSchema: timesheetsSchema,
    },
    async (args) => {
      const input = timesheetsSchema.parse(args);
      return jsonResponse(await client().list("/timesheets", input));
    }
  );
}

