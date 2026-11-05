# AgentClinic roadmap

Implement phases in order. Each phase should be independently reviewable and demonstrable. Write detailed requirements and validation criteria when beginning that phase; this document sets implementation order rather than a schedule.

| Phase | Small increment | Done when |
| --- | --- | --- |
| 1 | Start the server | Hono serves a basic page locally and the TypeScript build passes. |
| 2 | Add the site shell | A shared header, navigation, footer, and responsive page layout appear on the home page. |
| 3 | Establish persistent demo data | The database choice is resolved and recorded; migrations and seeds create fictional agents and ailments reproducibly. |
| 4 | Browse agents | An agent list and detail page show seeded profiles; unknown agents produce a useful missing-page response. |
| 5 | Browse ailments | Ailment list and detail pages describe the agents' problems and link from relevant profiles. |
| 6 | Browse therapies | Seeded therapies have detail pages and are linked from the ailments they address. |
| 7 | Show appointment availability | Persisted demo slots show a therapy, time, duration, and availability; the clinic timezone is explicitly displayed. |
| 8 | Book one appointment | A labeled demo identity selector and booking form create a persistent appointment and display confirmation; invalid or occupied slots are rejected. |
| 9 | Verify booking integrity | Focused automated checks demonstrate that simultaneous claims cannot reserve the same slot and bookings survive reopening the database. |
| 10 | Add the agent dashboard | The selected demo agent can see their appointments with therapy, time, and status. |
| 11 | Add the staff dashboard | Staff can view clinic appointments and cancel a booking; its slot becomes bookable again while history is retained. |
| 12 | Polish the complete journey | Home → ailment → therapy → booking → dashboard works with consistent styling, accessible forms, clear empty/error states, and narrow layouts. |

## MVP completion

The outcomes in [mission.md](mission.md) are demonstrated using fictional seeded data. The build and focused booking checks pass, and the agent and staff journeys pass browser smoke checks. Document local setup, seed/reset steps, and known demo limitations in the project README.

## Later work

Login and authorization, production deployment, notifications, payments, external calendars, and live AI therapy require separate scope decisions after the demo MVP. No phase here depends on them.
