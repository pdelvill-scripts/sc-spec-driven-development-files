# Phase 1 — Hello Hono validation

## Status

Implemented on 2026-11-05. Installation, build, and command-line smoke checks passed. Browser visual checks remain pending; this feature has not yet satisfied every merge criterion.

## Setup

Run commands from `Video06_Feature_Specification/`. Use a Node.js version supported by the selected dependencies and record `node --version` and `npm --version`. Ensure ports 3000 and 3100 are available, or record a substitute override port.

1. Run `npm ci`; installation must succeed using the committed lockfile.
2. Run `npm run build`; it must exit successfully with strict TypeScript checking and produce the entry point used by `npm start`.

## Development server checks

1. With `PORT` unset, run `npm run dev`.
2. From another terminal, run `curl -i http://localhost:3000/`. Expect status 200, a `text/html` content type with an optional charset, and a complete HTML document containing the required home-page content from [requirements.md](requirements.md).
3. Open the same URL in a modern browser and complete the home-page checks below.
4. Make a temporary edit to the response text, save, and confirm watch mode serves the changed text without manually restarting. Restore the required text and confirm it is served again.
5. Stop the process. Run `PORT=3100 npm run dev` and confirm the same response at `http://localhost:3100/`. Stop the process before continuing.

## Compiled server checks

1. Re-run `npm run build` after restoring any temporary edits.
2. With `PORT` unset, run `npm start` and confirm the same status, HTML content type, and required home-page content at `http://localhost:3000/`. Repeat the home-page checks below.
3. Stop the process. Run `PORT=3100 npm start` and confirm the same result at `http://localhost:3100/`.
4. Stop the process. For compiled startup, try `PORT=invalid npm start`, `PORT= npm start`, `PORT=0 npm start`, `PORT=1.5 npm start`, and `PORT=65536 npm start`. Each must report a useful configuration error, exit nonzero, and leave no running server.

## Home-page checks

1. Inspect the returned HTML or browser DOM: confirm a doctype, English language declaration, UTF-8 charset, viewport metadata, and the title `AgentClinic`.
2. Confirm one `main` region and one level-one heading reading `AgentClinic`.
3. Confirm the exact visible message `AgentClinic is open for business`, an introduction about AI agents getting relief from humans, and previews of ailments, therapies, and appointment booking clearly marked as coming later.
4. Confirm there are no controls or links promising workflows that have not been implemented.
5. Check desktop and a 375px-wide viewport: text remains readable and the page has no horizontal scrolling.

The response body is HTML; do not compare the full response bytes to the opening message alone. Verify both the HTTP response and the rendered page manually.

## Merge criteria

- [x] Dependency installation and the strict TypeScript build pass.
- [x] Development mode serves the correct response, reloads edits, and honors the port override.
- [x] Compiled execution serves the correct response on the default and override ports.
- [x] Invalid port configuration fails clearly and exits nonzero.
- [ ] The home page meets the content, HTML structure, and desktop/mobile readability checks.
- [x] README commands match observed behavior and the supported runtime is recorded.
- [x] Only Phase 1 implementation and documentation are included; temporary edits and generated artifacts are absent.
- [ ] The PR or this document records actual check results and any unresolved issues; all required checks pass before merge.

Automated tests are not a merge requirement for this phase, as agreed with the user.

## Execution record — 2026-11-05

- Environment: macOS, Node.js `v24.14.0`, npm `11.9.0`.
- `npm ci`: passed; no vulnerabilities reported. Dependencies were downloaded outside the sandbox because registry DNS was blocked within it.
- `npm run build`: passed with the existing strict CommonJS TypeScript configuration; `npm start` successfully ran `dist/index.js`.
- `npm run dev`: HTTP checks passed on default port 3000 and override port 3100. The sandbox blocked tsx IPC, so runtime checks used approved execution outside it.
- Watch reload: temporarily changed the opening message, fetched the changed response, restored the source, and fetched the required message again without restarting manually.
- `npm start`: HTTP checks passed on default port 3000 and override port 3100 after rebuilding restored source.
- Each of the four HTTP checks returned 200 and `text/html; charset=UTF-8`. Response inspection confirmed the doctype, language, charset, viewport, title, one main region, one level-one heading, exact opening message, introduction, and all three previews with no unimplemented links or controls.
- `PORT=invalid`, empty `PORT`, `PORT=0`, `PORT=1.5`, and `PORT=65536` with `npm start`: each exited 1 with `Invalid PORT: expected an integer from 1 through 65535.` Validation happens before the server is created.
- All smoke-check servers were stopped. Temporary response edits were restored. Existing ignore rules were preserved and `/dist` was added to exclude generated builds.
- `git diff --check`: passed. Changes are confined to this lesson snapshot; no automated test suite was added.
- **Pending:** visually inspect the page in a modern browser at desktop and 375px widths, including readable text and absence of horizontal overflow, for development and compiled execution. Browser inventory reported its connection host unavailable; Computer Use denied Safari access. HTTP inspection does not establish visual correctness. Run the browser steps above before merge.
