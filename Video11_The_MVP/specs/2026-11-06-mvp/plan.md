# MVP implementation plan

Complete these small task groups in order. Each is independently reviewable; add or update focused Vitest coverage with the behavior it introduces. This file is a plan, not a record of completed implementation.

## 1. Establish and reconcile the baseline

- [ ] Run the existing tests and typecheck; inspect Phase 2 agent/ailment routes, database, layout, and seed behavior. Record baseline failures and do not mark Phase 2 complete without evidence.
- [ ] Reconcile the PicoCSS decision with `specs/tech-stack.md`, pin an exact local PicoCSS dependency, serve its stylesheet before the project overrides, and document local setup. Preserve the existing layout and mobile-first behavior.

## 2. Make migrations and seeds safe to extend

- [ ] Wrap each ordered migration and its tracking insert in one SQLite transaction; preserve foreign keys and existing data.
- [ ] Verify fresh setup, upgrade from the existing three migrations, and repeat migration/seed runs without duplicate records or lost user appointments.

## 3. Add therapies and recommendations

- [ ] Add therapy and ailment–therapy migrations with keys, constraints, and repeatable seed data.
- [ ] Build the therapies list, ailment recommendation links, navigation, and empty states.

## 4. Add therapists and appointment storage

- [ ] Add migrations and idempotent fictional seeds for therapists and appointments, including status and UTC slot data.
- [ ] Enforce referential integrity, valid status, and unique scheduled therapist slots at the database boundary. Preserve cancelled history and release cancelled slots.

## 5. Implement booking

- [ ] Add the agent-detail booking entry point and accessible form with therapy, therapist, and UTC 30-minute slot inputs.
- [ ] Validate all submitted values and references on the server; reject malformed, past, off-grid, and occupied slots with actionable errors and no writes.
- [ ] Persist valid appointments atomically; redirect successful POSTs to a persistent confirmation page. Verify refresh does not duplicate a booking.

## 6. Implement the staff dashboard

- [ ] Add the dashboard counts, appointment listing, empty state, navigation link, UTC labels, and demo-only notice.
- [ ] Add an idempotent POST cancellation action that retains the record and makes the slot available again.

## 7. Harden routes and data handling

- [ ] Add consistent shared-layout HTML 404/500 handling; test unknown routes and missing records and keep error details out of responses.
- [ ] Use parameterized queries, server-side validation, escaped output, and minimal request logging without bodies, secrets, or query strings. Cover hostile form data and failures.

## 8. Audit the whole experience

- [ ] Review navigation, labels, errors, focus order, semantics, contrast, and keyboard access on all existing and new pages.
- [ ] Check each page at the widths and zoom in [validation.md](validation.md), including the dashboard's narrow layout; correct overflow and inaccessible controls.

## 9. Verify and document

- [ ] Run all automated and manual checks in [validation.md](validation.md), record actual results and environment, and resolve failures before merge.
- [ ] Document setup, local PicoCSS, migrations, idempotent seeds, UTC scheduling, demo-only access, tests, and recovery steps in the README.
- [ ] Update the roadmap to reflect only work actually completed, and keep unrelated lesson snapshots and existing uncommitted changes intact.
