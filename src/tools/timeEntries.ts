import { z } from "zod";
import { RuddrClient } from "../ruddr/client.js";
import { jsonResponse } from "../mcp/response.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const listInputSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
  startingAfter: z.string().uuid().optional(),
  endingBefore: z.string().uuid().optional(),
  memberId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
  timesheetId: z.string().uuid().optional(),
  typeId: z.enum(["project_time", "time_off"]).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateAfter: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateOnAfter: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateBefore: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateOnBefore: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const getInputSchema = z.object({
  id: z.string().uuid(),
});

export function registerTimeEntryTools(server: McpServer) {
  server.registerTool(
    "ruddr_list_time_entries",
    {
      title: "Ruddr List Time Entries",
      description:
        "List time entries in the Ruddr workspace (paginated). Use dateAfter/dateOnAfter and dateBefore/dateOnBefore for ranges.",
      inputSchema: listInputSchema,
    },
    async (args) => {
      const input = listInputSchema.parse(args);
      const client = new RuddrClient();
      const data = await client.list<unknown>("/time-entries", input);
      return jsonResponse(data);
    }
  );

  server.registerTool(
    "ruddr_get_time_entry",
    {
      title: "Ruddr Get Time Entry",
      description: "Get a single time entry by id (uuid).",
      inputSchema: getInputSchema,
    },
    async (args) => {
      const input = getInputSchema.parse(args);
      const client = new RuddrClient();
      const data = await client.get<unknown>(`/time-entries/${input.id}`);
      return jsonResponse(data);
    }
  );
}

