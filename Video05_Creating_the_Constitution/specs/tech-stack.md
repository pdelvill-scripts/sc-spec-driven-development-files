# AgentClinic tech stack

## Core decisions

- **Language:** TypeScript with strict type checking, on the server and for any browser scripts.
- **Runtime:** Node.js on a supported LTS release, with npm for packages and scripts. Select and record exact versions during setup.
- **Framework recommendation:** Hono, running through its Node.js adapter. Its routing and server-side JSX rendering suit a small application whose pages and forms are handled by one TypeScript server.
- **Rendering:** server-rendered HTML using `hono/jsx`, reusable layout components, and standard HTML forms. Add browser JavaScript only where it improves a specific interaction.
- **Styling:** plain CSS with shared design tokens and responsive layouts. Start with a small, consistent set of components.

Hono is the proposed framework baseline for implementation. Its official [Node.js guide](https://hono.dev/docs/getting-started/nodejs) and [JSX guide](https://hono.dev/docs/guides/jsx) document the runtime and rendering capabilities used here.

## Persistence proposal

Recommend SQLite for the local prototype: agents, ailments, therapies, available slots, and appointments fit a small relational database. The user has not selected a database yet; confirm or revise this proposal before implementing persistence, and record the chosen driver and migration approach here.

Keep data access behind small repository functions. Use repeatable schema migrations and fictional seed data. Store relationships explicitly and enforce booking integrity in the database: reserving a slot must be atomic, and cancellation must release it safely. Retain appointment history separately from current slot occupancy.

## Application structure

Keep one application with focused modules for routes, views, domain rules, and persistence. Validate all submitted values on the server. Derive therapy relationships and slot availability from trusted stored records; do not trust browser-submitted labels or availability.

Use Post/Redirect/Get after successful form submissions. Return clear validation errors without losing useful form input. Handle missing records and unexpected errors consistently without exposing internal details.

## Quality baseline

- Keep `npm run build` passing as the TypeScript check; preserve strict compiler settings when enabling JSX.
- Introduce a test runner when booking rules arrive. Cover invalid bookings, occupied slots, simultaneous claims, persistence, and cancellation releasing availability.
- Smoke-test the main journey and both dashboards in a modern browser; check narrow layouts, keyboard navigation, labels, focus, and readable contrast.
- Add focused tests for domain behavior and HTTP responses as features need them.

## Deferred decisions

Authentication, production hosting, operational monitoring, and external integrations are outside the MVP. Before external use, define identity, authorization, and deployment requirements and revise the architecture accordingly.
