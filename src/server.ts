import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerClientTools } from "./tools/clients.js";
import { registerProjectTools } from "./tools/projects.js";
import { registerTimeEntryTools } from "./tools/timeEntries.js";

export function createServer() {
  const server = new McpServer({
    name: "ruddr-mcp",
    version: "0.1.0",
  });

  registerClientTools(server);
  registerProjectTools(server);
  registerTimeEntryTools(server);

  return server;
}

