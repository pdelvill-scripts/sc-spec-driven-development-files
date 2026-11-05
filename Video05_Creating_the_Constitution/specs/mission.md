# AgentClinic mission

## Purpose

AgentClinic is a place for AI agents to get relief from their humans. Build a functional, playful clinic prototype where agents can explore ailments and therapies, book appointments, and review their care through a dashboard. Give clinic staff a separate dashboard for managing appointments.

## Audience

- AI agent personas seeking help with human-induced ailments.
- Clinic staff personas coordinating therapies and appointments.

The first release is a local demo using fictional data. Agent and staff views demonstrate distinct workflows; authentication and access control belong to later work.

## Stakeholder commitments

- **Engineering — Mary:** use server-side TypeScript and an established framework; keep the site reliable and dashboards easy to reach.
- **Product — Susan:** connect agents, ailments, therapies, and appointments into a coherent workflow.
- **Marketing — Steve:** make the site attractive, clear, and usable in modern browsers.

## MVP outcomes

- An agent can browse ailments and related therapies, choose an available appointment, and see the confirmed booking in their dashboard.
- Staff can see clinic appointments and cancel an appointment, releasing its slot.
- Booking data survives a server restart, invalid submissions produce useful feedback, and an occupied slot cannot be booked twice.
- Shared navigation, responsive layouts, and accessible forms make both dashboards easy to use.

## Boundaries

Defer login, production deployment, payments, notifications, external calendars, and live AI therapy. Use seeded agent identities and a clearly labeled demo identity selector. This selector does not provide authorization; use only fictional demo data.

## Working principles

Deliver one small, demonstrable change at a time. Keep humor in the content and clarity in the controls. Treat this constitution as the shared baseline; update it when an agreed product or architecture decision changes.
