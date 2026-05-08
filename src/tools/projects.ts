import { z } from "zod";
import { RuddrClient } from "../ruddr/client.js";
import { jsonResponse } from "../mcp/response.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const inputSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
  startingAfter: z.string().uuid().optional(),
  endingBefore: z.string().uuid().optional(),
  clientId: z.string().uuid().optional(),
  code: z.string().optional(),
  projectTypeId: z.string().uuid().optional(),
  statusId: z
    .enum([
      "tentative",
      "not_started",
      "in_progress",
      "paused",
      "completed",
      "cancelled",
    ])
    .optional(),
  name: z.string().optional(),
  nameContains: z.string().optional(),
  nameStartsWith: z.string().optional(),
  nameEndsWith: z.string().optional(),
  poNumber: z.string().optional(),
});

export function registerProjectTools(server: McpServer) {
  server.registerTool(
    "ruddr_list_projects",
    {
      title: "Ruddr List Projects",
      description: "List projects in the Ruddr workspace (paginated).",
      inputSchema,
    },
    async (args) => {
      const input = inputSchema.parse(args);
      const client = new RuddrClient();
      const data = await client.list<unknown>("/projects", input);
      return jsonResponse(data);
    }
  );
}

