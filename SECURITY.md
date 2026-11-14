# Security notes

The operator console is an **MVP preview**, not a production identity/authorization system.

- Store all model-provider and Java gateway credentials in server environment variables.
- Never commit `.env.local` or place secrets into `NEXT_PUBLIC_*` variables.
- Use HTTPS and private backend networking in production; the proxy intentionally permits plain HTTP only for local loopback targets.
- Use a unique `DASHBOARD_ACCESS_PASSWORD` of at least 12 characters and a separate random `DASHBOARD_SESSION_SECRET` of at least 32 characters.
- Current auth is single-operator, does not have account lockouts, durable rate limiting, session revocation or full audit. Implement enterprise identity and authorization before public deployment.
- Protect against SSRF by keeping the backend origin server-configured; browser-supplied upstream URLs are not accepted.
- Browser requests are checked for same-origin POSTs, sessions are signed and stored in HttpOnly cookies, and chat payload size is bounded. This does not replace comprehensive production security controls.
- Schema-conformant model output does not imply correct business decisions.
