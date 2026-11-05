# Phase 1 — Hello Hono implementation plan

These are future implementation tasks; creating this spec does not complete them. See [requirements.md](requirements.md) for scope and [validation.md](validation.md) for merge evidence.

## 1. Configure dependencies and commands

- [ ] Add Hono and its Node server adapter as runtime dependencies.
- [ ] Add `tsx` and Node.js type definitions as development dependencies; retain TypeScript.
- [ ] Add development and compiled-start scripts alongside the existing build script.
- [ ] Keep the lockfile synchronized and strict type checking enabled; confirm module settings work for both execution paths.

## 2. Implement the minimal HTTP server

- [ ] Replace the placeholder entry point with a typed Hono application and Node.js server startup.
- [ ] Wire `GET /` to the server-rendered home page defined in task group 3, returning HTTP 200 and `text/html`.
- [ ] Read and validate `PORT`, defaulting to 3000 only when unset.
- [ ] Fail clearly on invalid configuration and keep the application limited to Phase 1.

## 3. Build a minimal AgentClinic home page

- [ ] Render a complete HTML document using Hono's HTML response helper, with a doctype, English language declaration, UTF-8 charset, viewport metadata, and an `AgentClinic` page title.
- [ ] Add a semantic main region containing one `AgentClinic` heading, the exact message `AgentClinic is open for business`, and a short introduction describing relief from humans for AI agents.
- [ ] Include a brief preview of ailments, therapies, and appointment booking, clearly labeled as coming later; avoid links or controls for unimplemented routes.
- [ ] Keep the page readable using browser-default styles; defer JSX, shared layout components, navigation, and CSS to later work.

## 4. Document and verify the feature

- [ ] Update the project README with setup, scripts, port examples, and manual smoke-check instructions.
- [ ] Run the TypeScript build and the development and compiled-server checks in [validation.md](validation.md).
- [ ] Record commands, outcomes, runtime version, and any deviations in the validation document or PR.
- [ ] Review the diff for unintended files, generated output, and changes to other lesson snapshots.
