export type McpTextResponse = {
  content: Array<{
    type: "text";
    text: string;
  }>;
};

export function textResponse(text: string): McpTextResponse {
  return { content: [{ type: "text", text }] };
}

export function jsonResponse(value: unknown): McpTextResponse {
  return textResponse(JSON.stringify(value, null, 2));
}

