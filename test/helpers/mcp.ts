import { createServer } from "../../src/server.js";

export type McpTextResponse = {
  content: Array<{ type: "text"; text: string }>;
};

export function getToolHandler(toolName: string) {
  const server = createServer();
  const tool = (server as any)._registeredTools?.[toolName];
  if (!tool) throw new Error(`Tool not registered: ${toolName}`);
  if (!tool.handler) throw new Error(`Tool missing handler: ${toolName}`);
  return { server, tool };
}

export async function callTool(toolName: string, args: unknown): Promise<McpTextResponse> {
  const { server, tool } = getToolHandler(toolName);
  // Use SDK's tool execution pipeline so Zod input validation runs.
  // The extra argument is used for task tool polling; our tools are not tasks.
  return (await server.executeToolHandler(tool, args, {} as any)) as McpTextResponse;
}

export function parseToolJson(response: McpTextResponse): any {
  if (!response?.content?.[0] || response.content[0].type !== "text") {
    throw new Error("Unexpected MCP response shape");
  }
  return JSON.parse(response.content[0].text);
}

