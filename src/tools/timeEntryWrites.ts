import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { RuddrClient } from "../ruddr/client.js";
import { isWriteEnabled } from "../ruddr/env.js";
import { jsonResponse } from "../mcp/response.js";

function requireTimeEntryWritesEnabled() {
  if (!isWriteEnabled("time_entries")) {
    throw new Error(
      "Time entry writes are disabled. Set RUDDR_ALLOW_WRITES=time_entries in the MCP server env to enable."
    );
  }
}

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const timeSchema = z.string().regex(/^\d{2}:\d{2}$/);

const createSchema = z.object({
  typeId: z.enum(["project_time", "time_off"]),
  statusId: z.enum(["not_submitted", "pending_approval", "approved", "rejected"]).optional(),
  date: dateSchema,
  minutes: z.number().int().min(1).max(1440).nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
  startTime: timeSchema.nullable().optional(),
  endTime: timeSchema.nullable().optional(),
  memberId: z.string().uuid(),
  projectId: z.string().uuid().nullable().optional(),
  roleId: z.string().uuid().nullable().optional(),
  taskId: z.string().uuid().nullable().optional(),
  timeOffTypeId: z.string().uuid().nullable().optional(),
});

const updateSchema = z.object({
  id: z.string().uuid(),
  typeId: z.enum(["project_time", "time_off"]).optional(),
  statusId: z.enum(["not_submitted", "pending_approval", "approved", "rejected"]).optional(),
  date: dateSchema.optional(),
  minutes: z.number().int().min(1).max(1440).nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
  startTime: timeSchema.nullable().optional(),
  endTime: timeSchema.nullable().optional(),
  memberId: z.string().uuid().optional(),
  projectId: z.string().uuid().nullable().optional(),
  roleId: z.string().uuid().nullable().optional(),
  taskId: z.string().uuid().nullable().optional(),
  timeOffTypeId: z.string().uuid().nullable().optional(),
});

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export function registerTimeEntryWriteTools(server: McpServer) {
  server.registerTool(
    "ruddr_create_time_entry",
    {
      title: "Ruddr Create Time Entry",
      description:
        "Create a time entry in Ruddr. Requires RUDDR_ALLOW_WRITES=time_entries to be set for this MCP server.",
      inputSchema: createSchema,
    },
    async (args) => {
      requireTimeEntryWritesEnabled();
      const input = createSchema.parse(args);
      const client = new RuddrClient();
      const created = await client.post("/time-entries", input);
      return jsonResponse(created);
    }
  );

  server.registerTool(
    "ruddr_update_time_entry",
    {
      title: "Ruddr Update Time Entry",
      description:
        "Update a time entry in Ruddr. Requires RUDDR_ALLOW_WRITES=time_entries to be set for this MCP server.",
      inputSchema: updateSchema,
    },
    async (args) => {
      requireTimeEntryWritesEnabled();
      const { id, ...patch } = updateSchema.parse(args);
      const client = new RuddrClient();
      const updated = await client.patch(`/time-entries/${id}`, patch);
      return jsonResponse(updated);
    }
  );

  server.registerTool(
    "ruddr_delete_time_entry",
    {
      title: "Ruddr Delete Time Entry",
      description:
        "Delete a time entry in Ruddr. Requires RUDDR_ALLOW_WRITES=time_entries to be set for this MCP server.",
      inputSchema: deleteSchema,
    },
    async (args) => {
      requireTimeEntryWritesEnabled();
      const { id } = deleteSchema.parse(args);
      const client = new RuddrClient();
      await client.delete(`/time-entries/${id}`);
      return jsonResponse({ deleted: true, id });
    }
  );
}

