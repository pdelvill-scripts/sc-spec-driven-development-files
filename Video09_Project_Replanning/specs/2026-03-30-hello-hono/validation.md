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
