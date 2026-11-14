export type Probe = { reachable: boolean; ok: boolean; status: number | null; message: string };
export type GatewayStatus = {
  configured: boolean;
  model: string | null;
  health: Probe | null;
  readiness: Probe | null;
  checkedAt: string;
};
