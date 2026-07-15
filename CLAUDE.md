# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js version

This project uses **Next.js 16.2.9** — a version with breaking changes from what most training data covers. **Before writing any code that touches Next.js APIs, read the relevant guide in `node_modules/next/dist/docs/`.**

Key v16 breaking changes:
- **Turbopack is the default** for both `next dev` and `next build` (no `--turbopack` flag needed)
- **Async Request APIs are fully async** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` cannot be accessed synchronously. Always `await` them.
- **Middleware is now `proxy`** — the `middleware.ts` convention is deprecated
- **Linting uses the ESLint CLI directly** (`eslint`), not `next lint`

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

### Route groups

- `src/app/(index)/` — Home page only, with two display modes (adventure/simple)
- `src/app/(pages)/` — Public pages: `/blog`, `/projects`, `/contact`, `/middle-earth`, `/arcade`
- `src/app/(admin)/` — Admin routes: `/here` and `/why`, no auth guard (security-by-obscurity)

### State management (Zustand)

All global state lives in `src/store/`:

- `useMode` — toggles between `'adventure'` and `'simple'` home page layouts
- `useHaveBeen` — gamified progress tracker; records which of 7 named paths the user has visited and computes a `progress` percentage. The path names (e.g. `/middle-earth`, `/thoughts-forest`, `/project-mountains`) are creative aliases for the real routes.
- `usePrevPath` — tracks previous navigation path for transition effects

### Dual-mode home page

`src/app/(index)/Main.tsx` reads `useMode` and conditionally renders `AdventureMode` or `SimpleMode`. AdventureMode is an interactive scroll experience with stars, a contact section, and a link to "Middle Earth" (projects). SimpleMode is a minimal layout.

### UI components

shadcn/ui components are in `src/components/ui/`. Tailwind CSS v4 is configured via `postcss.config.mjs`.

### Blog

Markdown posts live in `posts/`. The blog page (`src/app/(pages)/blog/page.tsx`) renders them via `src/components/Grid.tsx` and `src/components/List.tsx` with a toggle between grid and list views.

### Database

`src/lib/planetscale.ts` has a PlanetScale connection stub (marked TODO). Requires `DATABASE_HOST`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` env vars.

### Page transition pattern

Pages use `useTimerCount` hook + Tailwind `opacity-0 / opacity-100` with `transition duration-1000` to fade in on mount.
