# Tech Stack

AgentClinic is a server-side TypeScript application. All rendering happens on the server; the browser receives plain HTML that works well and looks good.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | **Hono** | Lightweight, TypeScript-first, fast, excellent DX; routes and middleware feel natural |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | Plain CSS + CSS custom properties | No build step required; Steve gets a modern, attractive result |

## Responsive UI

- Apply responsive design to every existing and new web feature. Use mobile-first CSS, fluid spacing and typography, flexible widths, and bounded content areas; introduce media queries when content needs a layout change.
- Keep `width=device-width, initial-scale=1.0` viewport metadata in the shared layout. Do not disable zoom or hide overflow to mask layout defects.
- Reflow from 320px upward without page-level horizontal scrolling. Wrap long labels and URLs, constrain media and controls to their containers, and retain all essential content and actions. Future dense tables may use a clearly identified scroll region instead of overflowing the page.
- Keep interactive targets at least 44px high and keyboard focus visible. Future multi-column views must stack when space is insufficient.
- Validate at 320, 375, 768, and 1280 CSS-pixel widths, plus 200% browser zoom at a 1280px window. Check touch-sized controls, keyboard access, long content, clipping, and horizontal overflow.
- Vitest validates server-rendered structure, viewport metadata, and asset delivery. Actual reflow and visual usability require browser checks; passing Node tests alone does not establish responsive correctness.

## Recommended: Hono

[Hono](https://hono.dev) is chosen over Express/Fastify because:

- First-class TypeScript with zero config
- Built-in JSX renderer for server-side HTML
- Middleware model is simple and composable
- Runs on Node, Deno, Bun, and edge runtimes without changes

## Data

- **SQLite** (via `better-sqlite3`) for local development and early production — simple, embedded, no infrastructure
- Migrations via plain SQL files; no ORM to start

## Testing

- **Vitest** is the test runner for automated feature validation. Add focused tests for behavior and acceptance criteria as features are implemented, including domain rules and Hono route responses.
- Run `npm test` (`vitest run`) for a single validation run that exits with a nonzero status on failures. For interactive watch mode, use `npx vitest`.
- Keep test files named `*.test.ts` or `*.test.tsx` alongside the code they validate. Use the Node test environment for server-side code; render Hono JSX on the server rather than introducing a browser framework.
- Feature validation should require passing Vitest tests and `npm run typecheck`; retain manual browser checks for visual behavior when relevant.
- `npm run build` uses `tsconfig.build.json` to exclude test files from production output. `npm run typecheck` uses the main configuration and checks both application and test code.
- An empty test suite is not successful validation. The initial tooling setup may report no test files until the first behavior tests are added.
- See the [official Vitest guide](https://vitest.dev/guide/) for runner usage. Use a supported Node.js release compatible with the installed Vitest and Vite versions.

## Tooling

- `tsx` for development (run TypeScript directly, no build step needed)
- `tsc -p tsconfig.build.json` for production builds
- `prettier` for formatting

## What We Are Not Using

- No React, Vue, or Svelte — server-side rendering keeps the stack simple
- No ORM — SQL is sufficient at this scale
- No Docker — not yet; that's a later phase concern
