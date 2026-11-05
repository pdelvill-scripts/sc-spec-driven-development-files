# Phase 1 Validation — Hello Hono

## Definition of Done

All of the following must be true before this branch is merged.

### 1. TypeScript compiles cleanly

```
npm run typecheck
```

Must exit with code 0 and produce no errors or warnings.

### 2. Server starts

```
npm run dev
```

Must start without errors. The terminal should show the server is listening (port 3000 or logged port).

### 3. Route returns an HTML home page

```
npm test
```

Vitest must discover and pass the tests in `src/app.test.ts`, exiting 0. Tests request the exported app directly without starting a listening server. The home response must have status 200 and an HTML content type, and contain:

- An `<h1>` element with the text `AgentClinic`
- A tagline (any short descriptive text; exact wording is implementation choice)
- One header, main, and footer in that order, with the heading and tagline inside main
- A home link in the header and a copyright notice in the footer
- A stylesheet link whose URL returns status 200, a CSS content type, and nonempty body/header/main/footer rules

Unknown pages and missing static assets must return 404. No-test-files output is a failed check, not a passing suite.

### 4. Hono version is pinned

`package.json` must list `hono` without a `^` or `~` range prefix.

### 5. Strict TypeScript is on

`tsconfig.json` must contain `"strict": true`.

### 6. Production build succeeds

Run `npm run build`; it must exit 0. Tests should remain type-checked, but must not be emitted into `dist/`. Vitest does not validate the server's listening socket or visual rendering; retain the manual startup check above and browser checks when changing visual behavior.

### 7. Responsive browser validation

Run the home page in a modern browser and record browser/version, viewport, and results. These checks are required for UI changes in addition to Vitest:

- [ ] At 320, 375, 768, and 1280 CSS-pixel widths, the heading, tagline, home link, and footer are readable and available without clipping, overlap, or page-level horizontal scrolling.
- [ ] At 200% browser zoom in a 1280px window, the same content and home link remain usable and reflow without horizontal page scrolling. Browser scaling must not be restricted.
- [ ] Temporarily replace page text in browser developer tools with a long heading and a long unbroken string; both wrap inside main. Restore the page afterward.
- [ ] At narrow and wide widths, keyboard focus on the home link is visible, Enter activates it, and its target is at least 44px high.
- [ ] On a short page the footer follows main at the viewport bottom; with long content it follows the content without covering it.

Vitest checks viewport metadata and HTML structure but does not lay out CSS. Record any unavailable browser checks as pending; do not infer a visual pass from HTTP tests.

## Not Required

- No CI pipeline required
- No automated browser rendering or coverage tooling required

## Replanning verification — 2026-11-05

- `npm test`: passed, one file and five tests covering page content, single-region layout, linked CSS delivery, unknown pages, and missing assets.
- `npm run typecheck`: passed, including test source.
- `npm run build`: passed. Output inspection confirmed application files only, without test JavaScript.
- `git diff --check`: passed.
- Fixed the pre-existing nested main region in Home; Layout now owns the single main wrapper.
- No listening server was started during these checks. The manual startup check remains separate; visual rendering is not established by the request tests.

### Additional component suite

`src/components/Layout.test.tsx` adds six Vitest cases covering multiple page children, HTML escaping of untrusted text, empty page content, document metadata, and footer years with a controlled clock. Timers are restored after each footer test.

After adding this suite, `npm test` passed 11 tests across two files. Type checking, the production build, and `git diff --check` also passed.

### Responsive update — 2026-11-05

Shared CSS now uses fluid gutters and heading sizes, a bounded full-width main region, long-text wrapping, constrained media and controls, a 44px home-link target, visible focus styles, and a flex layout that keeps the footer after content. Viewport tests also reject scaling restrictions.

`npm test` passed all 11 tests, and type checking, the production build, and diff whitespace checks passed. The responsive browser checklist above remains **pending**: the browser connection host is unavailable and Safari Computer Use access was previously denied. Automated Node tests do not establish the viewport, zoom, overflow, or focus-rendering results.
