import { z } from "zod";
import { RuddrClient } from "../ruddr/client.js";
import { jsonResponse } from "../mcp/response.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const inputSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
  startingAfter: z.string().uuid().optional(),
  endingBefore: z.string().uuid().optional(),
  code: z.string().optional(),
});

export function registerClientTools(server: McpServer) {
  server.registerTool(
    "ruddr_list_clients",
    {
      title: "Ruddr List Clients",
      description: "List clients in the Ruddr workspace (paginated).",
      inputSchema,
    },
    async (args) => {
      const input = inputSchema.parse(args);
      const client = new RuddrClient();
      const data = await client.list<unknown>("/clients", input);
      return jsonResponse(data);
    }
  );
}

