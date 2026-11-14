/** Server-only integration helpers. Never export secrets or configured endpoints to client bundles. */
const DEFAULT_TIMEOUT_MS = 7000;

export function gatewayEnvironment() {
  const raw = process.env.GATEWAY_BASE_URL;
  const apiKey = process.env.GATEWAY_API_KEY;
  const model = process.env.GATEWAY_MODEL;
  if (!raw || !apiKey || !model) return { connected: false as const, model: null };

  let uri: URL;
  try {
    uri = new URL(raw);
  } catch {
    return { connected: false as const, model: null };
  }

  // Explicitly configured destination only; never accept URLs from client request bodies.
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(uri.hostname);
  if (uri.username || uri.password || uri.search || uri.hash || uri.pathname !== "/" ||
      !(uri.protocol === "https:" || (uri.protocol === "http:" && loopback))) {
    return { connected: false as const, model: null };
  }
  return { connected: true as const, url: uri.origin, apiKey, model };
}

export async function gatewayGet(path: "/health" | "/ready" | "/metrics", timeoutMs = DEFAULT_TIMEOUT_MS) {
  const env = gatewayEnvironment();
  if (!env.connected) throw new Error("Gateway environment is not configured");
  return fetch(`${env.url}${path}`, {
    method: "GET",
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
    headers: { Accept: path === "/metrics" ? "text/plain" : "*/*" },
  });
}

export function gatewayErrorMessage(error: unknown): string {
  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) return "Gateway request timed out";
  return "Gateway is unavailable or unreachable";
}
