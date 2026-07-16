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

## Phase 1 — Remove scaffold noise

**Goal:** Get to a blank canvas with no demo clutter.

- [ ] Delete `src/routes/demo/` and `src/data/demo.punk-songs.ts`
- [ ] Delete `src/routes/hello.tsx`
- [ ] Delete the `app/` directory (leftover Next.js scaffold)
- [ ] Replace `src/components/Header.tsx` with a minimal real site header:
  - Links: Home `/`, Blog `/blog`, Projects `/projects`, Contact `/contact`
  - No sidebar, no TanStack logo

---

## Phase 2 — Core pages

**Goal:** Real routes with real content.

### Home — `src/routes/index.tsx`

- [ ] Name, short bio, links to blog and projects
- [ ] Clean, simple layout — no animation modes

### Blog listing — `src/routes/blog/index.tsx`

- [ ] Server-side: read all posts from `posts/*.md`, parse frontmatter
- [ ] Render a list of post cards (title, date, description)

### Blog post — `src/routes/blog/$slug.tsx`

- [ ] Read single post by slug, convert markdown body to HTML
- [ ] Render with good typography

### Projects — `src/routes/projects/index.tsx`

- [ ] Static list of projects (name, description, links)

### Contact — `src/routes/contact/index.tsx`

- [ ] Email link and/or social links

---

## Phase 3 — Markdown infrastructure

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

## Phase 4 — Polish

- [ ] Favicon (`public/favicon.ico`)
- [ ] `<meta>` title/description per page (use `Route.head` in TanStack Router)
- [ ] 404 — add a `src/routes/$.tsx` catch-all
- [ ] Dark mode (Tailwind `dark:` classes + `localStorage` preference, or CSS `prefers-color-scheme`)
- [ ] Responsive layout — mobile nav

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
