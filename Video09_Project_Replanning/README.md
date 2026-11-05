# AgentClinic

## Run and validate

From `Video09_Project_Replanning/`, using Node.js 22.12+ (or a supported newer LTS release):

```sh
npm ci
npm test
npm run typecheck
npm run build
npm run dev
```

The development server listens at <http://localhost:3000/>. Stop it with Ctrl+C.

`npm test` runs Vitest once; use `npx vitest` for watch mode. Tests import `src/app.tsx` and use Hono's request API to check page content, layout structure, stylesheet delivery, and 404 responses without starting a server. `src/index.tsx` owns server startup. An empty or failing suite exits nonzero.

Run tests from this directory so static assets resolve correctly. Tests live alongside source as `*.test.ts` or `*.test.tsx`. Type checking includes them; the production build excludes them. See the [feature validation checklist](specs/2026-03-30-hello-hono/validation.md) for merge requirements.

## Responsive validation

Responsive design is required for every UI feature. Check the home page at 320, 375, 768, and 1280 CSS-pixel widths, plus 200% browser zoom at a 1280px window. Confirm content wraps without page-level horizontal scrolling, the home link remains usable with visible keyboard focus, and the footer never overlaps content. Use the [responsive validation checklist](specs/2026-03-30-hello-hono/validation.md) to record browser results; Vitest alone does not validate CSS layout.

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
