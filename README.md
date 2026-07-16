# azamatbek.uz

Personal site built with TanStack Start, React 19, Tailwind CSS v4, and shadcn/ui.

## Requirements

- **pnpm** (enforced — `npm install` and `yarn` will error)
- Node.js 20+

## Setup

```bash
pnpm install
```

## Commands

```bash
pnpm dev        # Start dev server at http://localhost:3000
pnpm build      # Production build
pnpm preview    # Preview production build locally
pnpm test       # Run tests with Vitest
pnpm lint       # Lint with Biome
pnpm format     # Format with Biome
pnpm check      # Lint + format together
```

## Tech stack

| Layer | Tool |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) |
| Router | [TanStack Router](https://tanstack.com/router) (file-based) |
| Server | [Nitro](https://nitro.build/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Linting | [Biome](https://biomejs.dev/) |
| Testing | [Vitest](https://vitest.dev/) |
| Package manager | pnpm |

## Project structure

```
src/
  routes/           # File-based routes (TanStack Router)
    __root.tsx      # Root layout (HTML shell, Header)
    index.tsx       # Home page (/)
    hello.tsx       # /hello
    demo/           # Demo routes (safe to delete)
  components/
    Header.tsx
  lib/
    utils.ts
  router.tsx
  styles.css
  routeTree.gen.ts  # Auto-generated — do not edit
```

## Adding a route

Create a file in `src/routes/`. TanStack Router's Vite plugin auto-generates `routeTree.gen.ts` on save.

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div>About</div>,
})
```

## Adding shadcn/ui components

```bash
pnpm dlx shadcn@latest add button
```
