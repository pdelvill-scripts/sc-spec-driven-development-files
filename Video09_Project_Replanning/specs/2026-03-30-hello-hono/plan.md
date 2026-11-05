# Phase 1 Plan — Hello Hono

## Group 1 — Package Setup

1. Install `hono` (pin exact version, no `^` prefix)
2. Install `tsx` as a dev dependency
3. Verify `tsconfig.json` has `"strict": true` and a sensible `target`/`module` for Node

## Group 2 — Application Entry Point

4. Export the Hono application from `src/app.tsx`, including its routes and static middleware, without opening a listening socket
5. Add a single `GET /` page route returning the home-page JSX
6. Keep `serve()` in `src/index.tsx` to bind the imported app to port 3000; tests import the app directly

## Group 3 — Dev Script

7. Add `"dev": "tsx watch src/index.tsx"` to `package.json` scripts
8. Add `"typecheck": "tsc --noEmit"` to `package.json` scripts

## Group 4 — Home Page

9. Create a Hono JSX component for the home page (`src/pages/Home.tsx`)
10. Page renders an `<h1>` with "AgentClinic" and a short tagline
11. Update the `GET /` route to return the rendered JSX instead of a plain string

## Group 5 — Layout Component

12. Create `src/components/Layout.tsx` with a top-level shell (`<html>`, `<head>`, `<body>`); it imports `<Header>`, `<Main>`, and `<Footer>` from their own files
13. Create `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` as separate files, one component each
14. `<head>` links to `/static/style.css`
15. Create `static/style.css` with minimal base styles
16. Serve the `static/` directory via `@hono/node-server/serve-static` in `src/app.tsx`
17. Update `src/pages/Home.tsx` to pass content directly to `<Layout>`; Layout owns the single `<Main>` wrapper

## Group 6 — Automated Validation

18. Install Vitest as a pinned development dependency and add `"test": "vitest run"`
19. Add `src/app.test.ts` using the Node environment and `app.request()`; cover the home-page status/content type, heading and tagline, one header/main/footer, working stylesheet link, and missing page/asset responses
20. Run `npm test`, `npm run typecheck`, and `npm run build`; all must exit 0 and tests must actually be discovered
21. Keep `npm run dev` as the manual server-start check; automated request tests validate application behavior without starting a server
