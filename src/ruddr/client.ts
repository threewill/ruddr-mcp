import { requireRuddrApiKey, ruddrBaseUrl } from "./env.js";

type RuddrListResponse<T> = {
  results?: T[];
  hasMore?: boolean;
};

export type RuddrRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
};

export class RuddrClient {
  readonly baseUrl: string;

  constructor(baseUrl = ruddrBaseUrl()) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async get<T>(path: string, query?: RuddrRequestOptions["query"]): Promise<T> {
    return this.request<T>(path, query ? { method: "GET", query } : { method: "GET" });
  }

  async list<T>(
    path: string,
    query?: RuddrRequestOptions["query"]
  ): Promise<RuddrListResponse<T>> {
    return this.request<RuddrListResponse<T>>(
      path,
      query ? { method: "GET", query } : { method: "GET" }
    );
  }

  private async request<T>(
    path: string,
    options: RuddrRequestOptions
  ): Promise<T> {
    const apiKey = requireRuddrApiKey();

    const url = new URL(this.baseUrl + (path.startsWith("/") ? path : `/${path}`));
    for (const [k, v] of Object.entries(options.query ?? {})) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    };
    const init: RequestInit = { method: options.method ?? "GET", headers };

    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }

    const maxRetries = 3;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const res = await fetch(url, init);

      if (res.status === 429 && attempt < maxRetries) {
        const retryAfter = res.headers.get("retry-after");
        const delayMs = retryAfter ? Number(retryAfter) * 1000 : 250 * 2 ** attempt;
        await new Promise((r) => setTimeout(r, Number.isFinite(delayMs) ? delayMs : 500));
        continue;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Ruddr API ${options.method ?? "GET"} ${url.pathname} failed: ${res.status} ${res.statusText}${
            text ? `\n${text}` : ""
          }`
        );
      }

      // Ruddr always returns JSON for these endpoints.
      return (await res.json()) as T;
    }

    // Should be unreachable because the loop returns or throws.
    throw new Error("Ruddr API request failed after retries.");
  }
}

