# MVP validation and merge criteria

## Status

Not run. This document specifies future implementation checks; creating it does not establish that the MVP is implemented or ready to merge. Record the date, Node/npm versions, browser/version, commands, actual results, and any limitations below or in the PR. An unavailable required browser check remains pending, not passed.

Run commands from `Video11_The_MVP/` against an isolated temporary or in-memory database. Do not overwrite a user's existing database. Ensure tests discover real test files; `--passWithNoTests` must not make an empty suite a successful validation.

## Automated checks

1. `npm ci`, `npm run typecheck`, `npm run build`, and `npm test` all succeed; the test output confirms tests ran. Keep existing Phase 1/2 coverage passing.
2. On a fresh database, apply all migrations and seed twice. Verify expected tables, foreign keys, seed counts and links, no duplicate seed records, and no migration errors. On an existing Phase 2 database containing a user-created record, upgrade and re-run migrations/seeds; verify the record and existing IDs remain intact.
3. Inject a migration failure and confirm its changes and tracking insert both roll back; fix it and confirm the migration can be re-run successfully.
4. Exercise `/`, `/agents`, a known agent, `/ailments`, `/therapies`, and `/dashboard`; check HTTP status, shared layout, expected seeded content, links, and empty states. Confirm PicoCSS and override stylesheets are locally served with a CSS content type.
5. Book a valid UTC 30-minute slot through the route, follow the redirect, and verify the confirmation and persisted database record. Re-request confirmation and restart against the same temporary database: exactly one booking remains and appears on the dashboard with correct counts.
6. Reject missing, malformed, past, off-boundary, forged, and nonexistent agent/therapy/therapist inputs without creating records. Submit executable HTML/SQL-like text and verify it is escaped or rejected and does not alter unrelated data.
7. Attempt two competing bookings for the same therapist/slot; exactly one succeeds and the other receives a useful conflict response. An appointment with another therapist or a different slot succeeds. Cancellation changes the original record to cancelled, is safe to repeat, reduces the scheduled count, and permits a new booking for the released slot.
8. Verify dashboard counts on empty and populated data, including distinct linked ailments and scheduled-only appointments. Check missing agent and appointment IDs and unknown routes yield HTML 404; inject an unexpected error to confirm a generic HTML 500, correct status, and logs without request bodies, query strings, or sensitive content.

## Manual browser and end-to-end checks

Use fictional seeded data. Start the app with the documented setup, keeping the database isolated.

- [ ] Browse home → agents → an agent's ailments → therapy catalog; navigate to booking, choose a seeded therapist and valid UTC slot, submit, and verify the confirmation and dashboard listing.
- [ ] Refresh confirmation without creating a duplicate, restart the server, and verify the booking and dashboard counts persist. Cancel it from the dashboard, verify the retained cancelled status, then rebook the freed slot.
- [ ] Attempt invalid and conflicting bookings; check clear field feedback, preserved safe input, and no duplicate records.
- [ ] Inspect home, agent list/detail, ailments, therapies, booking, confirmation, dashboard, 404, and 500 at 320, 375, 768, and 1280 CSS-pixel widths, and at 200% zoom in a 1280px window. Confirm readable content, visible controls, no page-level horizontal overflow or overlap, and a usable narrow dashboard.
- [ ] Traverse links, form fields, errors, dashboard actions, and any scrollable table with the keyboard. Check logical focus order, visible focus, explicit labels, and operable actions. Confirm UTC is displayed at input, confirmation, and dashboard.
- [ ] Confirm the local PicoCSS and override files load without network access, styling is readable and consistent, and no internal error details appear on error pages.

## Merge gate

- [ ] The automated checks pass with tests discovered, and no regression in existing agent/ailment functionality remains.
- [ ] Every browser and end-to-end checklist item is completed and recorded; unresolved or inaccessible checks remain open.
- [ ] README and `specs/tech-stack.md` describe the chosen PicoCSS approach, local demo limitations, SQLite setup, UTC rules, and verification commands.
- [ ] No unrelated lesson snapshot changes, generated databases, dependencies, or build artifacts are included in the implementation commit.
