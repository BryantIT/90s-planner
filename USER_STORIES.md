# User Stories — 90s Digital Daily Planner

A Next.js, mobile-first daily planner with a nostalgic 90s aesthetic. Users
create an account and pick a theme skin — **Goth**, **Jock**, **Nerd**, or
**Cheer** — each offered in an **A** (more feminine) and **B** (more
masculine) styling, with a live preview before committing.

Format: `As a [user], I want [goal], so that [benefit]`, followed by
acceptance criteria.

---

## Epic 1 — Account & Authentication

### 1.1 Sign up
As a new user, I want to create an account with email + password (or an
OAuth provider), so that my planner data is saved and private to me.
- Email/password sign-up with validation (format, password strength, confirm
  password).
- Optional OAuth (Google) sign-up.
- Duplicate-email error handling.
- Email verification flow (or a clear "unverified" state) before full access.
- New users are routed into theme selection immediately after sign-up.

### 1.2 Log in
As a returning user, I want to log in, so that I can access my saved planner
data.
- Log in with email/password or OAuth.
- "Forgot password" reset flow via email link.
- Friendly error states (wrong password, unknown account) without leaking
  which field was wrong.
- Session persists across app restarts ("remember me" / secure session
  cookie).

### 1.3 Log out
As a logged-in user, I want to log out, so that my account is protected on a
shared device.
- Logout clears session and returns to the landing/login screen.

### 1.4 Delete / manage account
As a user, I want to update my email/password or delete my account, so that
I stay in control of my data.
- Change password (requires current password).
- Change email (requires re-verification).
- Delete account with a confirmation step, which removes all planner data.

---

## Epic 2 — Theme Selection & Personalization

### 2.1 Browse themes
As a new (or existing) user, I want to browse the four theme families —
Goth, Jock, Nerd, Cheer — so that I can find a style that fits me.
- Theme gallery screen shows all 4 families with representative art/colors.
- Each theme family clearly exposes its A (feminine-leaning) and B
  (masculine-leaning) variants — 8 selectable skins total.
- Gallery is browsable without an account (for marketing/landing) but
  selection requires login to save.

### 2.2 Preview a theme before choosing
As a user, I want to preview a full theme + variant (colors, fonts, icons,
textures) on real planner UI, so that I can decide before committing.
- Selecting a theme card opens a live preview rendered on an actual planner
  screen (not just a swatch), so typography, buttons, and layout are visible
  in context.
- User can toggle between A/B variant within the same family from the
  preview without leaving the screen.
- User can flip between different theme families from the preview screen.
- Preview is non-destructive — nothing is saved until the user confirms.

### 2.3 Confirm/apply a theme
As a user, I want to confirm my chosen theme + variant, so that it becomes
my planner's active look.
- Confirmation applies the theme instantly across the whole app.
- Choice is persisted to the user's account (syncs across devices/sessions).

### 2.4 Change theme later
As an existing user, I want to change my theme + variant at any time from
settings, so that I can switch things up without losing my planner data.
- Settings screen re-opens the same preview/selection flow.
- Switching themes never alters or deletes planner content (tasks, notes,
  etc.) — only the skin changes.

---

## Epic 3 — Daily Planner Core

### 3.1 View today's page
As a user, I want to land on "today" by default, so that I immediately see
what matters right now.
- App opens to the current date's planner page.
- Current date is clearly displayed in the theme's 90s style (e.g.
  notebook-margin date stamp, locker-tag, etc.).

### 3.2 Navigate between days
As a user, I want to move forward/back between days (and jump to a specific
date), so that I can plan ahead or review the past.
- Prev/next day controls (swipe-friendly on mobile).
- Date picker / mini calendar jump.
- "Jump to today" shortcut.

### 3.3 To-do list
As a user, I want to add, check off, edit, reorder, and delete tasks for a
day, so that I can track what I need to do.
- Quick-add input for new tasks.
- Checkbox toggle for done/not-done with a satisfying themed animation
  (e.g. sticker stamp, checkmark scribble).
- Edit task text inline; delete with confirmation or undo.
- Reorder via drag (touch-friendly).
- Optional priority flag (e.g. star/highlight) per task.

### 3.4 Hour-by-hour schedule
As a user, I want a time-blocked agenda for the day, so that I can plan
appointments and time-sensitive activities.
- Scrollable hourly (or half-hour) grid, tap/drag to create a timed block.
- Edit block title/time/duration; delete a block.
- Current time indicator on today's schedule.
- Overlap handling/warning for double-booked blocks.

### 3.5 Notes / journal space
As a user, I want a free-text notes area on each day, so that I can jot
thoughts, reminders, or a quick journal entry.
- Rich-ish text (bold/italic/bullets) or plain text, themed like
  notebook-paper.
- Autosaves as the user types.

### 3.6 Top priorities / goals of the day
As a user, I want to flag my top 3 "must-do" items separately from the
general to-do list, so that I stay focused on what matters most.
- Dedicated "Top 3" (or similar) widget on the day view.
- Pulls from or links to existing to-do items, or accepts standalone entries.

---

## Epic 4 — Planner Extras

### 4.1 Habit tracker
As a user, I want to track recurring habits (e.g. water, exercise, reading),
so that I can build consistency over time.
- Define a habit once; check it off per day.
- Simple streak/consistency indicator (themed, e.g. varsity-jacket patches
  for Jock, constellation chart for Nerd).

### 4.2 Mood tracker
As a user, I want to log my mood for the day, so that I can reflect on
patterns over time.
- Small set of themed mood icons/stickers to pick from per day.
- Mood shown on a week/month overview.

### 4.3 Recurring tasks
As a user, I want to mark a task as recurring (daily/weekly/custom), so that
I don't have to re-add it every day.
- Recurrence rule editor (daily, weekly on selected days, custom interval).
- Completing/skipping one occurrence doesn't affect future occurrences.

### 4.4 Reminders/notifications
As a user, I want optional reminders for tasks or schedule blocks, so that I
don't miss something important.
- Opt-in browser/push notification per task or event.
- Respect device notification permissions gracefully if denied.

### 4.5 Week & month overview
As a user, I want a week and month view, so that I can see the bigger
picture beyond a single day.
- Week view: condensed list/grid of each day's top items.
- Month view: calendar grid with completion/mood indicators per day,
  tap-through to that day's full page.

### 4.6 Search & history
As a user, I want to search past entries (tasks, notes), so that I can find
something I wrote or planned before.
- Search bar filters across tasks/notes by keyword and optional date range.
- Results link directly to the relevant day.

---

## Epic 5 — Mobile-First Experience

### 5.1 Mobile-first layout
As a mobile user, I want the planner to feel designed for my phone first, so
that it's fast and comfortable to use one-handed.
- Primary layouts, spacing, and tap targets are designed at mobile
  breakpoints first, then progressively enhanced for tablet/desktop.
- Bottom navigation (or thumb-reachable controls) for core sections (Day,
  Week, Month, Settings).
- Swipe gestures for day navigation and task actions (e.g. swipe to
  complete/delete).

### 5.2 Responsive scale-up
As a tablet/desktop user, I want the layout to make good use of extra screen
space, so that the experience doesn't feel stretched or empty.
- Multi-column layout at wider breakpoints (e.g. schedule + notes
  side-by-side).
- Theme assets (textures, borders) scale appropriately without pixelation.

### 5.3 Performance & offline resilience
As a user on a spotty connection, I want the app to stay usable and not lose
my edits, so that I trust it as my daily tool.
- Optimistic UI updates with background sync.
- Clear "saving/saved/offline" state indicator.

---

## Epic 6 — Settings & Account Management

### 6.1 Profile settings
As a user, I want a settings page for my profile (name, avatar/nickname,
theme), so that I can manage my account in one place.
- Update display name / optional avatar.
- Quick link back into theme preview/selection (see 2.4).

### 6.2 Data export
As a user, I want to export my planner data (e.g. CSV/JSON/PDF), so that I
own a copy of what I've written.
- Export current month or full history.

### 6.3 Notification preferences
As a user, I want to control which reminders/notifications I receive, so
that the app isn't noisy.
- Granular toggles (task reminders, daily summary, habit nudges).

---

## Out of Scope (for initial release)
- Real-time multi-user collaboration/shared planners.
- Native mobile apps (this is a responsive web app via Next.js).
- Third-party calendar sync (Google Calendar, Outlook) — candidate for a
  later phase.
