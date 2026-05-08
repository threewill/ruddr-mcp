export function requireRuddrApiKey(): string {
  const key = process.env.RUDDR_API_KEY;
  if (!key) {
    throw new Error(
      "Missing RUDDR_API_KEY. Set it in Cursor mcp.json env for the ruddr server."
    );
  }
  return key;
}

export function ruddrBaseUrl(): string {
  return process.env.RUDDR_BASE_URL ?? "https://www.ruddr.io/api/workspace";
}

