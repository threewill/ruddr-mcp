import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerClientTools } from "./tools/clients.js";
import { registerProjectTools } from "./tools/projects.js";
import { registerTimeEntryTools } from "./tools/timeEntries.js";
import { registerPhase2Tools } from "./tools/phase2.js";
import { registerTimeEntryWriteTools } from "./tools/timeEntryWrites.js";

export function createServer() {
  const server = new McpServer({
    name: "ruddr-mcp",
    version: "0.3.0",
  });

  registerClientTools(server);
  registerProjectTools(server);
  registerTimeEntryTools(server);
  registerPhase2Tools(server);
  registerTimeEntryWriteTools(server);

  return server;
}

