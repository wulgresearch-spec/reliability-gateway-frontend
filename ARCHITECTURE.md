# Frontend architecture decisions

1. **Separate repository, separate deployable** from the Java Data Plane, to keep web releases and Java runtime gates decoupled.
2. **One Next.js application** with group layouts: marketing and authenticated console.
3. **Server-side BFF:** browser never sees `GATEWAY_API_KEY` or provider secrets. Gateway base URL is an operator-configured allowlisted origin, not a user-controlled URL.
4. **MVP single-operator authentication only:** HMAC signed HttpOnly cookie, short TTL, strict SameSite, secure in prod. Replace with OIDC/SSO + enterprise RBAC, rate limiting, robust CSRF defenses, revocation and audit before customer deployment.
5. **No simulated operational metrics.** Status and metrics endpoints read the Java Data Plane in real time; disconnections are visible.
6. **Exact brand tokens:** ice `#EDF3FB`, navy `#1C3052`. Components use semantic CSS tokens; Tailwind v4 is available.
7. **No invented control-plane API.** Upcoming settings and management features are explicitly planned-only.
8. **No autopilot business decisions.** Application domain rules, RAG, memory and final approvals remain outside the gateway boundary.
9. **No fake multi-tenant isolation claim:** Java V2 governance tenant boundary remains decision-gated; do not build a tenant policy editor until contracts and isolation are verified.

## Incremental API roadmap

- Phase 1 (included): website, authentication preview, health, metrics, prompt playground.
- Phase 2: OIDC/SSO, protected environments, structured frontend telemetry, test coverage.
- Phase 3: Control Plane API for providers, policies, durable usage, audit history and roles.
- Phase 4: multi-organization features only after tenant boundary decision and corresponding Java implementation.
