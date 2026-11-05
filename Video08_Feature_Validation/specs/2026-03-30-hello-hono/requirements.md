# Phase 1 Requirements — Hello Hono

## Scope

Install and configure Hono with a `tsx` dev server. Expose a single page route `/` that renders a minimal HTML home page via Hono JSX. Confirm TypeScript types work end-to-end. Include a shared Layout component that imports separate Header, Main, and Footer components and renders each exactly once, in that order. Home supplies its content directly to Layout without adding a second main region.

Link `/static/style.css` from the document head. That stylesheet imports `/static/base.css` for reset and typography; layout rules live in `style.css`. Serve both files through Hono's static middleware with CSS content types. CSS is loaded by the browser, without a Node.js CSS loader or bundler.

## Out of Scope

- No navigation beyond the header's home link; further navigation remains deferred
- No test framework setup (Vitest deferred to a later phase)
- No database or additional page routes; static stylesheet routes are included
- No CI/CD pipeline

## Decisions

### Pin Hono version
Record the exact Hono version in `package.json` with no range prefix (e.g., `"hono": "4.x.y"`). Future phases must not silently upgrade without deliberate review.

### Enforce strict TypeScript
`tsconfig.json` must include `"strict": true`. This is non-negotiable from the first commit so the codebase never accumulates loose types.

## Context

This phase exists to prove the baseline works: Node runs TypeScript, Hono serves a response, and the dev loop is functional. Nothing more.

The home page should render an `<h1>` containing "AgentClinic" and a short tagline that reflects the mission. The route returns HTML, not a plain string — Hono JSX handles the rendering.

This is the first visible page a developer sees when they clone and run the project.

## Stakeholder Notes

- **Mary** needs TypeScript end-to-end (satisfied by `strict: true` + successful `tsc --noEmit`)
- **Steve** gets basic readable typography and a consistent header/main/footer shell
