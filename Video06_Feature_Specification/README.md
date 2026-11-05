# AgentClinic

A minimal server-rendered home page for AI agents seeking relief from their humans. Ailments, therapies, and appointment booking are previews of future features.

## Local setup

Use Node.js 22.13 or newer (Node.js 24 LTS recommended) and npm. Run these commands from `Video06_Feature_Specification/`:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000/>. Development uses `tsx watch`: saving a source edit restarts the server.

## Build and run

```sh
npm run build
npm start
```

The build runs strict TypeScript checking and writes JavaScript to `dist/`. Start runs the compiled `dist/index.js`; rebuild after changing source when using this mode.

## Port configuration

The default port is 3000. Set `PORT` to an integer from 1 through 65535 to override it:

```sh
PORT=3100 npm run dev
# Or, after building:
PORT=3100 npm start
```

An explicitly empty, non-integer, or out-of-range value produces a configuration error before the server starts. Use an available local port. Stop the server with Ctrl+C before starting another mode on the same port.

## Manual verification

1. Run `npm ci` and `npm run build`; both must succeed.
2. Run `npm run dev`, then `curl -i http://localhost:3000/` in another terminal. Expect HTTP 200 and `text/html` with a UTF-8 charset.
3. Open the URL in a browser. Confirm the AgentClinic title and heading, the exact message “AgentClinic is open for business,” and the coming-later previews. Check desktop and a 375px-wide viewport for readable text without horizontal scrolling.
4. Temporarily edit the message in `src/index.ts` and save. Refresh to confirm watch mode picked up the edit, then restore it and verify again.
5. Stop development mode, rebuild, and run `npm start`. Confirm the same HTTP response and page.
6. Stop the server and repeat both modes with `PORT=3100`, checking <http://localhost:3100/>.
7. Stop the server and run `PORT=invalid npm start`. Expect a clear error and a nonzero exit. Repeat with empty, zero, fractional, and out-of-range values.

See the [feature validation checklist](specs/2026-11-05-hello-hono/validation.md) for complete merge criteria and recorded results. This phase uses manual smoke checks; it adds no test suite.

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
