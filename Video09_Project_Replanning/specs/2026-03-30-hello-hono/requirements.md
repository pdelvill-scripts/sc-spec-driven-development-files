# Phase 1 Requirements — Hello Hono

## Scope

Install and configure Hono with a `tsx` dev server. Expose a single `/` page route that renders a minimal HTML home page via Hono JSX. Use the existing shared Layout with separate Header, Main, and Footer components, and link the served `/static/style.css`. Confirm TypeScript types work end-to-end and validate the existing behavior with Vitest tests.

## Out of Scope

- No additional layout features or navigation beyond the existing home link
- No browser automation or coverage tooling
- No database or additional page routes
- No CI/CD pipeline

## Decisions

### Validate with Vitest

`npm test` runs `vitest run` in the Node environment. Tests must cover the successful home-page response and its content, the single header/main/footer structure, the linked stylesheet response, and 404 responses for unknown pages and missing static assets. Tests use `app.request()` without opening network ports. An empty suite must fail rather than count as successful validation.

Export the app and static routes from `src/app.tsx`; reserve server startup for `src/index.tsx`. Home passes its content directly to Layout to avoid nested main regions. Preserve the existing public page and stylesheet URLs.

Run tests from this lesson's directory so static paths resolve consistently. Vitest uses the existing TypeScript/Hono JSX configuration without adding a browser framework. Feature merge validation requires passing tests, strict type checking, and the production build.

### Pin Hono version
Record the exact Hono version in `package.json` with no range prefix (e.g., `"hono": "4.x.y"`). Future phases must not silently upgrade without deliberate review.

### Enforce strict TypeScript
`tsconfig.json` must include `"strict": true`. This is non-negotiable from the first commit so the codebase never accumulates loose types.

## Context

This phase establishes the application baseline: Node runs TypeScript, Hono serves a response, and the dev loop is functional. During replanning, automated validation was added to protect the existing page and layout behavior.

The home page should render an `<h1>` containing "AgentClinic" and a short tagline that reflects the mission. The route returns HTML, not a plain string — Hono JSX handles the rendering.

This is the first visible page a developer sees when they clone and run the project.

## Stakeholder Notes

- **Mary** needs TypeScript end-to-end (satisfied by `strict: true` + successful `tsc --noEmit`)
- **Steve** needs the existing home page and layout preserved; HTTP tests validate structure and CSS delivery, while future visual changes still need manual browser checks
