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
curl -s http://localhost:3000
```

HTTP status must be `200 OK`. Response body must be HTML and must contain:

- An `<h1>` element with the text `AgentClinic`
- A tagline (any short descriptive text; exact wording is implementation choice)

### 4. Hono version is pinned

`package.json` must list `hono` without a `^` or `~` range prefix.

### 5. Strict TypeScript is on

`tsconfig.json` must contain `"strict": true`.

### 6. Shared layout and CSS load

Inspect the returned HTML: exactly one header, main, and footer must appear in that order. The heading and tagline belong inside main. Confirm the head links `/static/style.css`.

Fetch `/static/style.css` and `/static/base.css`; both must return HTTP 200 with a `text/css` content type. Confirm `style.css` imports `./base.css`, and contains the header/main/footer rules. Confirm `base.css` contains the reset and typography styles.

## Not Required

- No automated tests needed for this phase
- No CI pipeline required
- Browser rendering not checked (curl is sufficient)

## Layout verification — 2026-11-05

- `npm run typecheck`: passed.
- `npm run dev`: started successfully on port 3000; stopped after verification.
- `GET /`: HTTP 200 with HTML containing one header, one main, and one footer, in that order. The heading and tagline are inside main and the head links `/static/style.css`.
- `GET /static/style.css` and `GET /static/base.css`: HTTP 200 with `text/css; charset=utf-8`. The linked stylesheet imports the base stylesheet and contains the layout rules.
- `git diff --check`: passed. No dependency versions were changed. Installation reported three existing dependency vulnerabilities (one low, one moderate, one high).
