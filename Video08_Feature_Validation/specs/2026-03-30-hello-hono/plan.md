# Phase 1 Plan — Hello Hono

## Group 1 — Package Setup

1. Install `hono` (pin exact version, no `^` prefix)
2. Install `tsx` as a dev dependency
3. Verify `tsconfig.json` has `"strict": true` and a sensible `target`/`module` for Node

## Group 2 — Application Entry Point

4. Replace `src/index.ts` placeholder with a minimal Hono app
5. Add a single `GET /` route returning `"AgentClinic is open for business"`
6. Call `serve()` to bind the app to a port (default 3000)

## Group 3 — Dev Script

7. Add `"dev": "tsx src/index.ts"` (or `tsx watch`) to `package.json` scripts
8. Add `"typecheck": "tsc --noEmit"` to `package.json` scripts

## Group 4 — Home Page

9. Create a Hono JSX component for the home page (`src/pages/Home.tsx`)
10. Page renders an `<h1>` with "AgentClinic" and a short tagline
11. Update the `GET /` route to return the rendered JSX instead of a plain string

## Group 5 — Layout Component

12. Create `src/components/Layout.tsx` with a top-level shell (`<html>`, `<head>`, `<body>`); it imports `<Header>`, `<Main>`, and `<Footer>` from their own files
13. Create `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` as separate files, one component each
14. `<head>` links to `/static/style.css`; load CSS through the browser stylesheet link rather than importing CSS into the Node.js entry point
15. Create `static/base.css` for reset and typography; import it from `static/style.css` with `@import url("./base.css")` and keep header/main/footer layout rules in `style.css`
16. Serve the `static/` directory via `@hono/node-server/serve-static` in `src/index.tsx`
17. Update `src/pages/Home.tsx` to pass page content directly to `<Layout>`; Layout owns `<Header>`, `<Main>`, and `<Footer>` so each page has exactly one main region

## Group 6 — Verify

18. Run `npm run typecheck` — must exit 0 with no errors
19. Run `npm run dev` and confirm `curl localhost:3000` returns HTML containing the heading
20. Confirm `/static/style.css` and its imported `/static/base.css` both return HTTP 200 with a CSS content type
21. Inspect the HTML for exactly one header, main, and footer in that order; confirm the heading and tagline are inside main and the stylesheet link points to `/static/style.css`
