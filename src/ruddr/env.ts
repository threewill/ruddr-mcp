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

export function isWriteEnabled(area: "time_entries"): boolean {
  const raw = process.env.RUDDR_ALLOW_WRITES ?? "";
  const enabled = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return enabled.includes(area);
}

