# Roadmap

Each phase is a reviewable, testable slice of work. Break larger phases into small implementation increments.

Validation baseline: each feature includes focused Vitest behavior tests. Before merge, run `npm test`, `npm run typecheck`, and `npm run build`; all must pass with tests discovered. Manual startup and relevant visual checks complement the automated suite.

Responsive design applies to every UI phase, including the existing home page. Each feature spec must include narrow/wide layout behavior and browser validation at 320, 375, 768, and 1280 CSS pixels and 200% zoom at a 1280px window. Preserve content and actions without page-level horizontal overflow.

---

## Phase 1 — Hello Hono ✅
- Install and configure Hono with `tsx` dev server
- Single `/` page route rendering the AgentClinic home page
- Confirm TypeScript types work end-to-end

## Phase 2 — Base Layout, Agents & Ailments

### Base layout
- Server-side JSX layout component (header, nav, main, footer)
- Basic CSS (custom properties, reset, typography)
- All routes render inside the shared layout
- Use fluid spacing, constrained content widths, wrapping, and visible keyboard focus from the start

### Agent list
- SQLite database + first migration (`agents` table)
- Seed a handful of fictional agents
- `/agents` page listing all agents

### Agent detail
- `/agents/:id` page showing a single agent's profile
- Name, model type, current status, presenting complaints

### Ailments catalog
- `ailments` table + seed data (e.g., "context-window claustrophobia", "prompt fatigue")
- `/ailments` list page
- Link agents to one or more ailments

## Phase 3 — Therapies Catalog
- `therapies` table + seed data
- `/therapies` list page
- Map ailments → recommended therapies

## Phase 4 — Appointment Booking
- `appointments` table (agent, therapist, datetime, status)
- Form to book an appointment from an agent's detail page
- Basic validation and confirmation page

## Phase 5 — Staff Dashboard
- `/dashboard` with summary counts: agents, open appointments, ailments in-flight
- Simple table views for staff to manage records
- Mary's dashboard is now real

## Phase 6 — Polish & Accessibility
- Audit and refine responsive layouts across all features; responsive behavior is already required in every preceding UI phase
- Semantic HTML audit
- Keyboard navigation and focus styles

## Phase 7 — Hardening
- Error pages (404, 500)
- Input sanitization on all forms
- Basic logging middleware

---

Later phases (not yet planned): auth, email notifications, therapist profiles, reporting.
