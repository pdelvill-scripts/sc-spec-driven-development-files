# AgentClinic MVP requirements

## Context and decisions

This feature completes roadmap phases 3–7 in `Video11_The_MVP/`. The existing application already implements agents, ailments, their relationships, a Hono JSX layout, and a SQLite migration/seed mechanism; retain and verify those workflows. Phase 2 is not marked complete in the roadmap, so verify its relevant acceptance checks instead of assuming its status from the heading.

The user chose a local demo with seeded therapists, persistent bookings, and **PicoCSS**. The current layout already loads PicoCSS and a project stylesheet. This decision resolves the conflicting plain-CSS-only statement in `specs/tech-stack.md`: update that document as part of implementation to name the actual PicoCSS setup and its local overrides. Use the existing stack: server-side TypeScript, Hono JSX, `better-sqlite3`, plain SQL migrations, and Vitest. Keep Pico's exact version reproducible and available locally for an offline demo; load it before project overrides without introducing a client-side framework.

Use fictional seeded data only. This is a local demonstration; authentication, authorization, deployment, email, payments, integrations, live AI therapy, and a standalone therapist-profile feature are deferred. Seeded therapists are selectable booking records, not authenticated users. Do not present the local demo as suitable for real personal or medical data.

## Therapies catalog

- Add persistent therapies with names and descriptions and a many-to-many relationship between ailments and recommended therapies. Seed at least five fictional therapies; each seeded ailment has at least one recommendation.
- `GET /therapies` lists the therapies, descriptions, and related ailments. Link to relevant therapies from the ailment catalog and make the catalog reachable through the shared navigation.
- The catalog provides useful empty states when records or recommendations are absent. Existing agent and ailment links continue working.

## Appointment booking

- Add persistent seeded therapists (at least three fictional named records) and appointments associated with an existing agent, therapy, and therapist. Therapist selection is a booking choice; no therapist login or profile page is required.
- From an agent detail page, provide a booking form with the agent fixed by the URL, selectable therapy and therapist, and a date/time. Use explicit labels and show the clinic timezone as **UTC** next to the date/time control and on all appointment views. Interpret input as UTC, store a normalized UTC instant, and reject invalid dates, past times, and times that are not on a 30-minute boundary.
- Each appointment reserves a fixed 30-minute therapist slot. Only one scheduled appointment may occupy a therapist's slot; enforce the rule atomically in SQLite, including competing submissions. A conflict yields a clear validation error and no duplicate booking.
- Validate required fields, existing agent/therapy/therapist IDs, and time on the server. Reject missing or forged IDs and preserve safe user input with field-specific feedback. Never trust the submitted agent identity over the URL.
- A successful POST redirects to a confirmation page showing agent, therapy, therapist, date/time in UTC, and status. Repeating a browser refresh of the confirmation page must not create a second appointment. Bookings persist after restart.

## Staff dashboard and appointment management

- `GET /dashboard` shows counts for agents, scheduled appointments, and distinct ailments linked to at least one agent. Label the last count clearly; it is not a clinical diagnosis or a count of appointments.
- Show a table or list of appointments with agent, therapy, therapist, UTC date/time, and status. Provide a useful empty state. Staff can cancel a scheduled booking through a POST action and see its status change to cancelled; cancellation releases its slot and retains the record. Repeated cancellation must be safe and must not change other records.
- No identity or authorization is implemented for this local demo. Clearly label the dashboard and cancellation action as demo-only; all local visitors have the same access. Do not expose real data.

## Accessibility, responsiveness, and hardening

- Apply the existing shared layout, semantic landmarks, labeled controls, readable contrast, visible keyboard focus, and mobile-first styles across all routes, including errors and validation feedback. Preserve all content and actions without page-level horizontal overflow at 320, 375, 768, and 1280 CSS-pixel widths and at 200% zoom in a 1280px window. Make wide appointment tables usable at narrow widths using a labeled, keyboard-accessible scroll region or a reflowing layout.
- Return consistent HTML 404 and 500 pages with the appropriate HTTP status and shared layout. Missing agent, appointment, and unknown routes must not expose internals; unexpected server errors are logged without sensitive data and show a generic message.
- Validate form values against allowlists/types and constraints. Use parameterized SQL and escaped JSX output, including rejected input. Reject unsupported or malformed data without executing SQL or rendering executable markup. Log method, path, response status, and duration without request bodies, secrets, or query strings; avoid leaking stack traces to users.
- Preserve foreign-key enforcement and existing data. Add ordered forward-only SQL migrations; run each migration and its tracking insert in one transaction. Migration and seed operations must be repeatable without duplicating records or erasing existing appointments. Ensure startup and seed behavior are documented and do not overwrite user-created data.

## Definition of MVP

A local user can browse existing agents and ailments, discover therapies, book an available therapist slot, receive confirmation, and see or cancel the booking from the demo dashboard. The same persisted state and accurate counts remain after restart. All required checks in [validation.md](validation.md) pass; implement the small increments in [plan.md](plan.md).
