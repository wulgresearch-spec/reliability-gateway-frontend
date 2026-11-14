# Reliability Gateway — Frontend

**Enterprise AI infrastructure website + protected operator console.** Standalone Next.js 16 / React 19 / TypeScript project for the [Reliability Gateway Java backend](https://github.com/wulgresearch-spec/dataplane-gateway).

Design uses your exact colors: **ice blue `#EDF3FB`** and **deep navy `#1C3052`**.

## What's included

| Area | Route | Status |
| --- | --- | --- |
| Public website | `/` | Implemented: responsive hero, architecture diagram, features and calls to action |
| Product | `/platform` | Implemented: grounded explanation of current Java modules |
| Request architecture | `/how-it-works` | Implemented: 12 mandatory pipeline stages |
| Use cases | `/solutions` | Implemented: insurance claims and customer support workflows |
| Documentation links | `/docs` | Implemented: links to actual Java repo docs |
| Contact | `/contact` | Implemented: GitHub contact/contribution entry points; no fake form submission |
| Operator login | `/login` | Implemented: server-side password + signed HttpOnly session cookie |
| Console overview | `/console` | Implemented: actual health/readiness status from backend |
| API Playground | `/console/playground` | Implemented: server-side proxy for chat completions; optional SSE streaming |
| Health & metrics | `/console/health` | Implemented: raw metrics with bounded responses; no fake graphs |
| Roadmap | `/console/roadmap` | Clear planned-only features, no fake providers or policy editing |

**Current limitation:** The existing Java gateway has HTTP chat, health, readiness, and metrics endpoints, but does not expose a full web-oriented administration/control-plane API. Provider and policy settings, durable usage history, tenant management and audit search cannot be built as genuine CRUD screens yet. The console labels these as future work rather than pretending they function.

## Run locally

Prerequisites: **Node.js 22**, npm, and optionally the Java gateway running on a private loopback address.

```bash
npm install
cp .env.example .env.local
# Edit the .env.local values using your own secrets/configuration.
npm run dev
```

Open **http://localhost:3000** for the website, and **http://localhost:3000/login** for the protected console.

To start the Java backend, follow the [gateway README](https://github.com/wulgresearch-spec/dataplane-gateway/blob/develop/README.md). For the local launcher, you need `GATEWAY_PROVIDER_API_KEY`, `GATEWAY_PROVIDER_BASE_URI`, `GATEWAY_MODEL`, and `GATEWAY_API_KEY` on the Java side. In the frontend, configure `GATEWAY_BASE_URL`, the **same gateway client token** (`GATEWAY_API_KEY`), and the same canonical model (`GATEWAY_MODEL`).

### Example frontend `.env.local`

```dotenv
GATEWAY_BASE_URL=http://127.0.0.1:8080
GATEWAY_API_KEY=your-java-gateway-client-token
GATEWAY_MODEL=your-canonical-model
DASHBOARD_ACCESS_PASSWORD=choose-a-strong-unique-operator-password
DASHBOARD_SESSION_SECRET=replace-with-at-least-32-random-characters
```

All environment variables above are server-only. **Never prefix credentials with `NEXT_PUBLIC_`.** The browser makes requests to `/api/gateway/*`, and only the Next.js server forwards the gateway token to Java.

The console rejects login when the operator password or signing secret are missing/weak. Use **HTTPS** when deployed so the session cookie can be marked `Secure` in production.

## Architecture

```text
Public browser
    │
    ├── Public marketing pages (Next.js App Router)
    │
    └── Operator /console ── signed HttpOnly session cookie
                  │
                  ▼
           Next.js API (BFF)
                  │  server-only GATEWAY_API_KEY
                  ▼
           Java Data Plane Gateway
              ├── GET /health
              ├── GET /ready
              ├── GET /metrics
              └── POST /v1/chat/completions
                      │
                      ▼
              Configured AI provider
```

**Request integrity:** `POST /api/gateway/chat` requires the authenticated operator session and a same-origin request, accepts only a bounded prompt, uses the *server-configured* model, targets only the *server-configured* gateway URL, and supports streaming responses. It does not accept an arbitrary upstream URL or forward client-controlled gateway credentials.

**Do not treat this operator password as production SaaS authentication.** Before deploying a multi-customer console, replace it with a proper OIDC/SSO identity provider, organization-scoped authorization/RBAC, audit trails for admin changes, login rate limits, session revocation and CSRF controls appropriate to the hosting infrastructure. Tenant governance isolation and Control Plane contracts must be resolved on the backend first.

## Commands

```bash
npm run dev        # Development server
npm run typecheck  # TypeScript strict mode
npm run lint       # Next.js lint
npm run format     # Format source code
npm run build      # Production build
npm run start      # Run a built production server
```

After the first networked `npm install`, commit the generated `package-lock.json` and switch CI from `npm install` to `npm ci` for reproducibility. **This deliverable was authored in an environment without outbound npm network access**, so the dependency install, Next.js build, and browser E2E tests have not yet been executed. Source syntax and static assets can still be inspected offline.

## Project structure

```text
src/
├── app/
│   ├── (marketing)/            Website, product, solutions, docs
│   ├── (console)/console/      Protected dashboard routes
│   ├── api/auth/               Operator session endpoints
│   ├── api/gateway/            Secure server-side gateway proxy
│   ├── login/                  Operator login
│   └── globals.css             Brand theme and responsive layouts
├── components/                Reusable frontend and console UI
└── lib/                       Server auth, gateway client, types
```


## Publish as its own GitHub repository

This frontend project is intentionally separate from the Java Data Plane repo. The connected GitHub assistant integration **does not expose a create-repository action**, so the initial repository must be created with your own GitHub account/CLI.

After reviewing the code, install GitHub CLI, authenticate and run:

```bash
npm install  # produces package-lock.json
gh auth login
./scripts/publish-to-github.sh wulgresearch-spec private
```

The script creates `wulgresearch-spec/reliability-gateway-frontend` (or uses it if it already exists), initializes Git, commits the frontend, and pushes `main`. Use `public` instead of `private` only if you want to publish the source. On Windows, run the script with Git Bash or WSL.

Once the lockfile exists, prefer `npm ci` in CI (currently the first-run workflow uses `npm install` because an npm registry was unavailable in the authoring environment).

## Deployment guidance

- Deploy using a **Node.js server runtime**, not a static export; authentication and proxy routes require a server.
- Keep the Java Data Plane behind a private network address or an authenticated internal HTTPS endpoint.
- Provide server environment variables through your hosting provider's secret manager.
- Start with a single operator on local infrastructure. Do **not** expose this MVP operator login publicly for multi-user production.
- Connect telemetry and configuration storage only after the backend interfaces exist; don't invent operational metrics.

## License

No license is granted by default. Add a license after deciding how the standalone frontend repository should be distributed.
