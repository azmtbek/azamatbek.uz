# Plan: Personal Site (azamatbek.uz)

## Goal

Turn the TanStack Start scaffold into a real personal blog/portfolio site. Strip demo content, build actual pages, implement markdown blog rendering.

## Current state

- Framework: TanStack Start + Vite + Nitro, file-based routing in `src/routes/`
- `src/routes/index.tsx` — renders `<>API</>` (scaffold placeholder)
- `src/components/Header.tsx` — TanStack demo sidebar with demo links
- `src/routes/demo/` — scaffold demo routes, not part of the real site
- `app/` at project root — dead Next.js scaffold files (not active, not imported)
- `posts/` — directory exists, nothing reads it yet

---

## Phase 1 — Remove scaffold noise ✓

**Goal:** Get to a blank canvas with no demo clutter.

- [x] Delete `src/routes/demo/` and `src/data/demo.punk-songs.ts`
- [x] Delete `src/routes/hello.tsx`
- [x] Delete the `app/` directory (leftover Next.js scaffold)
- [x] Replace `src/components/Header.tsx` with a minimal real site header:
  - Links: Home `/`, Blog `/blog`, Projects `/projects`, Contact `/contact`
  - No sidebar, no TanStack logo

---

## Phase 2 — Core pages ✓

**Goal:** Real routes with real content.

### Home — `src/routes/index.tsx`

- [x] Name, short bio, links to blog and projects
- [x] Clean, simple layout — no animation modes

### Blog listing — `src/routes/blog/index.tsx`

- [x] Server-side: read all posts from `posts/*.md`, parse frontmatter
- [x] Render a list of post cards (title, date, description)

### Blog post — `src/routes/blog/$slug.tsx`

- [x] Read single post by slug, convert markdown body to HTML
- [x] Render with good typography

### Projects — `src/routes/projects/index.tsx`

- [x] Static list of projects (name, description, links)

### Contact — `src/routes/contact/index.tsx`

- [x] Email link and/or social links

---

## Phase 3 — Markdown infrastructure ✓

**Goal:** `posts/*.md` files become real rendered pages.

### Packages to add

```bash
pnpm add gray-matter      # frontmatter parsing
pnpm add remark remark-html   # markdown → HTML
```

### Frontmatter convention for `posts/*.md`

```markdown
---
title: "Post Title"
date: "2026-01-15"
description: "One-line summary shown in listing"
tags: ["tag1", "tag2"]
---
```

### `src/lib/posts.ts`

Two functions:
- `getAllPosts()` — reads `posts/*.md`, parses frontmatter, returns array sorted by date desc
- `getPostBySlug(slug)` — reads one file, converts body to HTML with remark

---

## Phase 4 — Polish ✓

- [x] Favicon (`public/favicon.ico`)
- [x] `<meta>` title/description per page (use `Route.head` in TanStack Router)
- [x] 404 — add a `src/routes/$.tsx` catch-all
- [x] Dark mode (Tailwind `dark:` classes + CSS `prefers-color-scheme`)
- [x] Responsive layout — mobile nav

---

## Target file structure

```
src/
  routes/
    __root.tsx          # HTML shell, <Header>
    index.tsx           # Home
    blog/
      index.tsx         # Blog listing
      $slug.tsx         # Single post
    projects/
      index.tsx
    contact/
      index.tsx
  components/
    Header.tsx          # Real site nav (replace demo version)
    ui/                 # shadcn/ui components
  lib/
    utils.ts
    posts.ts            # NEW: markdown reading utilities
  styles.css

posts/                  # Markdown content files
public/                 # Static assets
```

---

## Execution order

| # | Phase | Effort | Prerequisite |
|---|-------|--------|--------------|
| 1 | Remove demo scaffold | Low | — |
| 2 | Real header + home page | Low | Phase 1 |
| 3 | Blog listing + post pages (no markdown yet) | Low | Phase 2 |
| 4 | Markdown infrastructure | Medium | Phase 3 |
| 5 | Projects + Contact pages | Low | Phase 2 |
| 6 | Polish (meta, 404, dark mode) | Low | Phases 3–5 |

---

## Phase 5 — Hardening & polish ✓

Audit findings after Phases 1–4 were completed. Organized by priority.

### A. Cleanup — leftover scaffold & dead weight ✓

- [x] Delete `next.config.ts`, `next-env.d.ts` (Next.js scaffold, not active)
- [x] Delete `eslint.config.mjs` (imports `eslint-config-next` which isn't installed; conflicts with Biome)
- [x] Delete `.next/` directory (orphaned Next.js build artifact) + add `.next/` to `.gitignore`
- [x] Delete `public/tanstack-circle-logo.png` and `public/tanstack-word-logo-white.svg` (demo assets)
- [x] Fix `public/manifest.json` — name still says "TanStack App"; update to site name, author, correct colors
- [x] Remove dead deps: `pnpm remove class-variance-authority @tanstack/react-router-ssr-query`
- [x] Remove unused dev dep: `pnpm remove -D web-vitals`
- [x] Guard devtools in `src/routes/__root.tsx` — wrap `<TanStackDevtools>` in `import.meta.env.DEV` so it never ships to production

### B. SEO & discoverability ✓

- [x] Add OG meta tags to all pages via `Route.head`: `og:title`, `og:description`, `og:type`, `og:url`
  - Blog posts: `og:type = "article"`, use post title + description dynamically
- [x] Add Twitter Card tags: `twitter:card = "summary"`, `twitter:title`, `twitter:description`
- [x] RSS feed — generated via `scripts/generate-feeds.ts` as `public/rss.xml` (static file, served before routing)
- [x] Sitemap — generated via `scripts/generate-feeds.ts` as `public/sitemap.xml`

### C. Blog features (data exists, UI missing) ✓

- [x] Surface tags on blog listing (`src/routes/blog/index.tsx`) — render each tag as a small badge
- [x] Surface tags on individual post page (`src/routes/blog/$slug.tsx`) — show tags in post header
- [x] Tag browsing route — new `src/routes/blog/tags/$tag.tsx` that filters `getAllPosts()` by tag
- [x] Reading time — compute from word count in `src/lib/posts.ts`, add `readingTime: number` to `PostMeta`, display on listing cards and post header

### D. Accessibility ✓

- [x] Add `aria-label="Main navigation"` to `<nav>` in `src/components/Header.tsx`
- [x] Add `aria-label="Home"` to logo link in Header
- [x] Add `aria-current="page"` to active nav item via `activeProps` in Header
- [x] Add skip-to-content link in `src/routes/__root.tsx` before `<Header>` (visually hidden, visible on focus)

### E. Code correctness ✓

- [x] Fix date sort in `src/lib/posts.ts` — use `new Date(a.date) < new Date(b.date)` instead of string comparison
- [x] Add try-catch in `getAllPosts()` and `getPostBySlug()` — return `[]` / `null` on file read or parse failure
- [ ] Add HTML sanitization to blog post rendering — add `rehype-sanitize` to the remark pipeline in `src/lib/posts.ts`

---

## Phase 6 — Static build verification ✓

Goal: ensure blog posts are pre-rendered as static HTML at `pnpm build` time (no runtime server needed to serve them), and that a test suite validates the built output.

### Configure prerendering

Nitro's crawl-based prerendering is not invoked by TanStack Start's v1.132 build pipeline — `nitro.config.ts` and inline `prerender` config were both tried and had no effect. Pages are served SSR by the Nitro node-server preset.

### Build smoke tests ✓

`src/tests/build.test.ts` starts the production server (`node .output/server/index.mjs`) on port 3001 and tests all routes. Uses `describe.skipIf` to auto-skip when no build exists.

- [x] `/` → 200, contains owner name
- [x] `/blog` → 200, contains post listing with link to `/blog/getting-started`
- [x] `/blog/getting-started` → 200, post content, no Vite dev asset references
- [x] `/blog/tags/meta` → 200, filtered posts
- [x] `/rss.xml` → 200, XML content-type, valid RSS 2.0 (static file via `scripts/generate-feeds.ts`)
- [x] `/sitemap.xml` → 200, XML content-type, all routes (static file via `scripts/generate-feeds.ts`)
- [x] `/projects`, `/contact` → 200

### RSS + Sitemap static generation ✓

TanStack Start's `$/` catch-all route intercepted `/rss.xml` and `/sitemap.xml` before Nitro server route handlers. Fixed by generating them as static files into `public/` via `scripts/generate-feeds.ts` — Nitro serves static assets before routing. `prebuild` and `predev` hooks run the script automatically.

### Build test script ✓

```json
"test:build": "pnpm build && vitest run src/tests/build.test.ts"
```
