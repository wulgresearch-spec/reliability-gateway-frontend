import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "rg_console_session";
const SESSION_TTL_SECONDS = 12 * 60 * 60;

export const sessionCookieName = SESSION_COOKIE;

export function hasOperatorCredentials(): boolean {
  return Boolean(
    process.env.DASHBOARD_ACCESS_PASSWORD &&
    process.env.DASHBOARD_ACCESS_PASSWORD.length >= 12 &&
    process.env.DASHBOARD_SESSION_SECRET &&
    process.env.DASHBOARD_SESSION_SECRET.length >= 32,
  );
}

function sign(value: string): string {
  return createHmac("sha256", process.env.DASHBOARD_SESSION_SECRET ?? "")
    .update(value)
    .digest("base64url");
}

export function verifyPassword(submitted: string): boolean {
  if (!hasOperatorCredentials() || submitted.length > 4096) return false;
  const expectedHash = createHash("sha256")
    .update(process.env.DASHBOARD_ACCESS_PASSWORD!)
    .digest();
  const receivedHash = createHash("sha256").update(submitted).digest();
  return timingSafeEqual(expectedHash, receivedHash);
}

export function createSession(): string {
  if (!hasOperatorCredentials()) throw new Error("Console credentials not configured");
  const body = `${Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS}.${randomBytes(18).toString("base64url")}`;
  return `${body}.${sign(body)}`;
}

export function isValidSession(value: string | undefined): boolean {
  if (!value || !hasOperatorCredentials()) return false;
  const segments = value.split(".");
  if (segments.length !== 3) return false;
  const [expiry, nonce, signature] = segments;
  if (!/^\d{10,12}$/.test(expiry) || nonce.length !== 24) return false;
  const expiresAt = Number(expiry);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() / 1000) return false;
  const expected = Buffer.from(sign(`${expiry}.${nonce}`), "utf8");
  const received = Buffer.from(signature, "utf8");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function isOperatorAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return isValidSession(jar.get(SESSION_COOKIE)?.value);
}

export const sessionOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host && new URL(origin).protocol === new URL(request.url).protocol;
  } catch {
    return false;
  }
}
