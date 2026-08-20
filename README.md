# 90s Planner

A mobile-first digital daily planner with a 90s aesthetic. Users create an
account, choose from four themes — **Goth**, **Jock**, **Nerd**, **Cheer**
— each with a more feminine (A) or more masculine (B) variant, and manage
their day: tasks, a time-blocked schedule, notes, habits, mood, and more.

See [`USER_STORIES.md`](./USER_STORIES.md) for the full feature scope and
[`DEVELOPMENT_PLAN.md`](./DEVELOPMENT_PLAN.md) for the phased build plan.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- ESLint

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — lint the codebase
- `npm test` — run the test suite

## Local Setup

Copy `.env.example` to `.env.local` (for Next.js) and `.env` (for the
Prisma CLI), filling in `DATABASE_URL` and `AUTH_SECRET`
(`npx auth secret` generates one). Then apply the database schema:

```bash
npx prisma migrate dev
```

## Project Status

**Phase 2: Auth & Account Foundation** — email/password sign up, log in,
log out, protected `/dashboard`, and password reset (reset links are
logged to the server console — no email provider configured yet). See
`DEVELOPMENT_PLAN.md` for what's next.
