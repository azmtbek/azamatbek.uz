# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Framework**: TanStack Start (SSR/SSG via Nitro, file-based routing via TanStack Router)
- **Runtime**: React 19, Vite 7, TypeScript
- **Styling**: Tailwind CSS v4 — configured via `@tailwindcss/vite` plugin, no `tailwind.config.*` file
- **Components**: shadcn/ui (config in `components.json`)
- **Linting/Formatting**: Biome (config in `biome.json`) — not ESLint, not Prettier
- **Testing**: Vitest
- **Package manager**: pnpm only — `npm` and `yarn` are blocked by `preinstall` hook

## Commands

```bash
pnpm dev        # Dev server at http://localhost:3000
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm test       # Run Vitest
pnpm lint       # Biome lint
pnpm format     # Biome format
pnpm check      # Biome lint + format
```

## Architecture

### Routing

Routes live in `src/routes/` and are picked up automatically by the TanStack Router Vite plugin.

- `src/routes/__root.tsx` — root layout: HTML shell, `<Header>`, devtools
- `src/routes/index.tsx` — home page (`/`)
- `src/routes/hello.tsx` — `/hello`
- `src/routes/demo/` — scaffold demo routes (can be deleted)

**`src/routeTree.gen.ts` is auto-generated on every save — never edit it manually.**

### Adding a route

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div>About</div>,
})
```

### Server functions

TanStack Start exposes server functions via `createServerFn`. See `src/routes/demo/start.server-funcs.tsx` for an example.

### Styles

Global CSS is at `src/styles.css`. Tailwind v4 uses CSS-based config (`@theme` block inside that file) — there is no JS config file.

### shadcn/ui

Add components with:
```bash
pnpm dlx shadcn@latest add <component>
```

Components land in `src/components/ui/`.

## Key gotchas

- `src/routeTree.gen.ts` — auto-generated, do not touch
- `app/` directory — leftover Next.js scaffold files, not active
- Biome uses tabs for indentation and double quotes for JS strings (see `biome.json`)
- Tailwind v4: no `tailwind.config.ts`, utilities defined in CSS via `@theme`
