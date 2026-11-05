# Phase 1 — Hello Hono requirements

## Context

The [roadmap](../roadmap.md) begins with Hello Hono. The current application only logs a placeholder message and has a TypeScript build script. This phase establishes a running HTTP application as the foundation for AgentClinic.

Follow the [mission](../mission.md) and [tech stack](../tech-stack.md): use server-side TypeScript, Node.js, and Hono. Keep the increment small enough for course students and conference demos to understand and verify.

## Agreed scope

- Run Hono on Node.js using its Node server adapter.
- Provide `GET /` returning HTTP 200 and a complete server-rendered HTML home page.
- Send a `text/html` content type; a UTF-8 charset parameter is allowed.
- Default to port 3000 when `PORT` is unset. Honor an explicitly configured valid port from 1 through 65535.
- Reject an explicitly configured invalid `PORT` with a clear error and a nonzero exit before starting the server. This includes empty, non-integer, and out-of-range values.
- Provide `npm run dev` using `tsx` watch mode, `npm run build` using `tsc`, and `npm start` running the compiled JavaScript.
- Preserve strict TypeScript checking and ensure both development and compiled execution work with the selected module configuration.
- Document installation, development, build, start, port configuration, and manual verification in the project README.

## Minimal home page

- Include an HTML doctype, `lang="en"`, UTF-8 charset, responsive viewport metadata, and the page title `AgentClinic`.
- Use a semantic `main` region with a single level-one heading reading `AgentClinic`.
- Display the exact message `AgentClinic is open for business` as visible text, followed by a short introduction explaining that AI agents can get relief from their humans.
- Preview ailments, therapies, and appointment booking as features coming later. These are informational descriptions, not working workflows; include no links or controls targeting unimplemented routes.
- Render using Hono's HTML response helper with browser-default styling. The page must be readable at desktop and narrow mobile widths without horizontal scrolling.

## Decisions

The minimal home page replaces the earlier plain-text response decision. The exact opening message remains required as visible page text; the full response body is now HTML.

Keep this feature limited to Phase 1. Retain the existing CommonJS configuration where compatible; any necessary change must keep development and compiled execution consistent. Keep changes within `Video06_Feature_Specification/`, including its package lockfile.

Validation consists of a passing TypeScript build and documented manual development and compiled-server smoke checks. No automated test suite or test dependencies are required for this phase.

## Out of scope

Shared layout, JSX, CSS, SQLite, domain data, dashboards, booking, authentication, and deployment are deferred. Do not mark later roadmap phases complete as part of this work.
