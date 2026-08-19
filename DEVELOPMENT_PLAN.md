# Development Plan — 90s Digital Daily Planner

Builds out [USER_STORIES.md](./USER_STORIES.md) in testable phases. Each
phase ships a working, demoable slice — nothing is "big bang." Phase 1 is
intentionally minimal: just enough to get a real Next.js app committed and
pushed to GitLab on `main`. Every phase after that happens on its own
branch.

---

## Branching Strategy

- **Phase 1** — commit directly to `main`. This is the only phase that
  touches `main` directly.
- **Phase 2 onward** — one branch per phase, e.g. `feature/phase-2-auth`,
  `feature/phase-3-theming`, branched from `main` after the previous phase
  is merged. Merge back to `main` (via MR) once a phase's Definition of Done
  is met.
- Keep phases small enough that each MR is reviewable in one sitting. If a
  phase starts to sprawl, split it (e.g. 4a/4b) rather than let one branch
  carry two epics.

---

## Assumed Tech Stack

(Flag now if you want to swap any of these — easiest to decide before Phase
1.)

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS, with theme values driven by CSS custom
  properties so the 8 theme skins are data, not duplicated components
- **Auth:** Auth.js (NextAuth) — credentials + Google OAuth
- **Database/ORM:** Prisma + PostgreSQL (e.g. Neon/Supabase for hosted dev
  DB; SQLite acceptable for local-only early phases)
- **Testing:** Vitest + React Testing Library (unit/component), Playwright
  (e2e) introduced once there's a real flow to test
- **Hosting target:** Vercel (or GitLab CI/CD to your host of choice)

---

## Phase 1 — Project Bootstrap *(branch: `main`)*

**Goal:** A minimal, working Next.js app, committed and pushed to GitLab on
`main`. No features yet — just a clean, deployable skeleton everything else
builds on.

**Covers:** Infrastructure only (no user stories yet).

**Tasks**
- [ ] `create-next-app` with TypeScript, App Router, Tailwind, ESLint
- [ ] Confirm `npm run dev` serves a placeholder home page locally
- [ ] Add Prettier + lint-staged/husky pre-commit (optional but cheap now)
- [ ] `.gitignore` (node_modules, `.env*`, `.next`, etc.)
- [ ] `.env.example` placeholder (empty for now — real vars land in Phase 2)
- [ ] `README.md`: what the project is, stack, `npm install && npm run dev`
- [ ] Minimal placeholder landing page (project name, "under construction"
      — no theme styling yet)
- [ ] One smoke test (e.g. renders the home page) with Vitest + RTL wired up
      so `npm test` works from commit one
- [ ] `git init`, initial commit, create GitLab project, push `main`
- [ ] (Optional) minimal GitLab CI: `npm ci && npm run lint && npm run
      build && npm test` on push — cheap insurance, not required to ship
      this phase

**Definition of Done / Testing**
- `npm run dev` runs locally with no errors.
- `npm run build` succeeds.
- `npm test` runs and passes (one smoke test).
- Repo is visible on GitLab with this history on `main`.

---

## Phase 2 — Auth & Account Foundation *(branch: `feature/phase-2-auth`)*

**Goal:** Real accounts. A user can sign up, log in, log out, and hit a
protected route.

**Covers:** Epic 1 (1.1–1.4)

**Tasks**
- [ ] Provision database, add Prisma schema for `User` (+ password hash
      field, or delegate to OAuth-only if you'd rather skip credentials)
- [ ] Wire up Auth.js with credentials + Google provider
- [ ] Sign-up page + validation (email format, password strength, confirm)
- [ ] Log-in page + error states (wrong password/unknown account, generic
      message)
- [ ] Log-out action
- [ ] Password reset flow (request email → reset link → new password)
- [ ] Basic protected-route middleware (redirect unauthenticated users to
      login)
- [ ] Placeholder "dashboard" page behind auth, just to prove the gate works
- [ ] Account deletion + change email/password (can trail the phase if
      time-boxed — flag if you want this split out)

**Definition of Done / Testing**
- Manual: sign up → land on placeholder dashboard → log out → log back in.
- Manual: wrong password shows a graceful error; duplicate email on sign-up
  is rejected.
- Automated: unit tests for validation logic; one Playwright flow
  (sign up → logout → login) if e2e is set up by this point.
- `npm run build` still succeeds; CI (if enabled) green.

---

## Phase 3 — Theme System & Selection *(branch: `feature/phase-3-theming`)*

**Goal:** The 8 theme skins (4 families × A/B) exist as real, swappable
styling, with a browse → preview → confirm flow, persisted per user.

**Covers:** Epic 2 (2.1–2.4)

**Tasks**
- [ ] Define theme tokens (colors, fonts, textures/icons) for all 8 skins as
      data (CSS variables or a theme config object) — start with 1–2 fully
      fleshed-out skins, stub the rest with placeholder tokens so the
      *mechanism* is proven before all art is final
- [ ] `Theme` field on `User` (family + variant) in Prisma schema
- [ ] Theme gallery screen (4 families, each showing A/B)
- [ ] Live preview: selecting a card renders an actual (stubbed) planner
      screen in that theme, non-destructively
- [ ] A/B toggle and family-switching from within the preview
- [ ] Confirm action persists theme to the user's account and applies it
      app-wide
- [ ] New sign-ups are routed into this flow before landing on the
      dashboard
- [ ] Settings entry point to reopen theme selection later, without
      touching planner data

**Definition of Done / Testing**
- Manual: new user is prompted to pick a theme, previews at least 2 skins,
  confirms one, and sees it applied globally.
- Manual: changing theme later from settings doesn't lose any (stub) data.
- Automated: component test that switching theme context updates rendered
  tokens/classes.

---

## Phase 4 — Daily Planner Core *(branch: `feature/phase-4-planner-core`)*

**Goal:** The actual planner. A themed user can manage a real day: tasks,
schedule, notes, top priorities.

**Covers:** Epic 3 (3.1–3.6)

**Tasks**
- [ ] Prisma models: `Task`, `ScheduleBlock`, `Note`, `Day` (or derive "day"
      from date fields rather than a standalone table — decide during
      schema design)
- [ ] Today view: default landing page for authenticated users, current
      date displayed in theme style
- [ ] Day navigation: prev/next, date picker, "jump to today"
- [ ] To-do list: add/edit/delete/reorder/toggle-complete, optional priority
      flag
- [ ] Hourly schedule grid: create/edit/delete time blocks, current-time
      indicator, overlap warning
- [ ] Notes area with autosave
- [ ] "Top 3 priorities" widget
- [ ] Replace Phase 3's stubbed preview screen with this real planner UI

**Definition of Done / Testing**
- Manual: create tasks, complete/reorder/delete them; add schedule blocks;
  write a note; set top 3 — all persist across a page reload.
- Manual: navigate several days back/forward and confirm data is
  per-day-correct (no bleed between days).
- Automated: unit tests for CRUD logic/hooks; component tests for
  task list and schedule grid interactions.

---

## Phase 5 — Planner Extras *(branch: `feature/phase-5-planner-extras`)*

**Goal:** The features that make it feel like a full planner, not just a
to-do list.

**Covers:** Epic 4 (4.1–4.6)

**Tasks**
- [ ] Habit tracker: define habits, daily check-off, streak indicator
- [ ] Mood tracker: themed mood picker per day
- [ ] Recurring tasks: recurrence rules, per-occurrence complete/skip
      without affecting the series
- [ ] Reminders/notifications: opt-in, permission handling, per-task/event
- [ ] Week view (condensed per-day summary) and Month view (calendar grid
      with completion/mood indicators, tap-through to day)
- [ ] Search across tasks/notes with date-range filter, results link to day

**Definition of Done / Testing**
- Manual: each sub-feature works end-to-end in isolation (habit streak
  increments daily, recurring task generates correctly, month view reflects
  real data, search finds a known entry).
- Automated: unit tests for recurrence-rule generation (highest bug risk
  here) and search filtering logic.

*(Consider splitting this phase — e.g. 5a: habits/recurring/reminders, 5b:
week/month/search — if it's getting large for one MR.)*

---

## Phase 6 — Mobile Polish, Responsive Scale-Up & Resilience
*(branch: `feature/phase-6-responsive-polish`)*

**Goal:** Everything built so far genuinely feels mobile-first, scales well
to larger screens, and holds up on a flaky connection.

**Covers:** Epic 5 (5.1–5.3)

> Note: mobile-first layout should already be the default assumption in
> Phases 3–5 (build small screens first, always). This phase is the
> dedicated pass to catch what slipped, add tablet/desktop layouts, and
> add resilience — not to retrofit mobile support from scratch.

**Tasks**
- [ ] Audit all screens against mobile breakpoints; fix tap targets,
      spacing, bottom nav
- [ ] Swipe gestures: day navigation, swipe-to-complete/delete on tasks
- [ ] Tablet/desktop layouts (e.g. schedule + notes side-by-side at wide
      breakpoints)
- [ ] Optimistic UI updates + background sync for task/note edits
- [ ] Saving/saved/offline status indicator
- [ ] Verify theme assets scale cleanly across breakpoints (no pixelation)

**Definition of Done / Testing**
- Manual: full walkthrough on an actual phone-sized viewport (devtools or
  real device) for every screen built so far.
- Manual: throttle/kill network mid-edit, confirm no data loss and a clear
  offline indicator.
- Automated: Playwright suite run at mobile + desktop viewport sizes.

---

## Phase 7 — Settings & Account Management
*(branch: `feature/phase-7-settings`)*

**Goal:** Round out account/profile controls and data ownership features.

**Covers:** Epic 6 (6.1–6.3)

**Tasks**
- [ ] Profile settings: display name, avatar/nickname
- [ ] Data export (CSV/JSON/PDF) for current month or full history
- [ ] Notification preference toggles (task reminders, daily summary, habit
      nudges) wired to Phase 5's reminder system

**Definition of Done / Testing**
- Manual: update profile, export data and verify file contents match what's
  in the app, toggle notification prefs and confirm they're respected.
- Automated: unit test for export formatting logic.

---

## Phase 8 — Hardening & Launch Readiness
*(branch: `feature/phase-8-launch-readiness`)*

**Goal:** Production-ready polish pass before calling v1 done.

**Tasks**
- [ ] Accessibility pass (keyboard nav, color contrast per theme, ARIA on
      interactive widgets — schedule grid, drag-reorder)
- [ ] Error monitoring/logging hooked up (e.g. Sentry)
- [ ] Performance pass (Lighthouse on mobile: LCP/CLS/bundle size)
- [ ] Env/config review for production deploy (secrets, DB, OAuth
      redirect URIs)
- [ ] Full regression pass across all 8 theme skins
- [ ] Deploy to production hosting, smoke-test live URL

**Definition of Done / Testing**
- Lighthouse mobile score meets an agreed bar (e.g. 90+ perf/a11y).
- Full manual regression checklist across all epics passes on the deployed
  build.

---

## Out of Scope (matches USER_STORIES.md)
Real-time collaboration, native mobile apps, third-party calendar sync —
none of these appear in this plan; revisit as a Phase 9+ if prioritized
later.
