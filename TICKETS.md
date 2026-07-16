# Tickets

Status: `todo` · `in-progress` · `done`

---

## Phase 1 — Remove scaffold noise

| ID | Status | Title |
|----|--------|-------|
| T-01 | todo | Delete demo routes and data |
| T-02 | todo | Delete `hello.tsx` route |
| T-03 | todo | Delete dead `app/` directory |
| T-04 | todo | Replace Header with real site nav |

### T-01 — Delete demo routes and data
Delete `src/routes/demo/` (entire directory) and `src/data/demo.punk-songs.ts`.

### T-02 — Delete `hello.tsx` route
Delete `src/routes/hello.tsx`.

### T-03 — Delete dead `app/` directory
Delete the `app/` directory at the project root — leftover Next.js scaffold, not imported anywhere.

### T-04 — Replace Header with real site nav
Rewrite `src/components/Header.tsx`. Requirements:
- Top bar (not a sidebar)
- Links: Home `/`, Blog `/blog`, Projects `/projects`, Contact `/contact`
- Active link styled differently
- No TanStack logo, no drawer/hamburger complexity

---

## Phase 2 — Core pages

| ID | Status | Title |
|----|--------|-------|
| T-05 | todo | Home page |
| T-06 | todo | Blog listing page (static shell) |
| T-07 | todo | Blog post page (static shell) |
| T-08 | todo | Projects page |
| T-09 | todo | Contact page |

### T-05 — Home page
Rewrite `src/routes/index.tsx`. Content: name, one-line bio, links to Blog and Projects. Clean layout, no placeholder feature cards.

### T-06 — Blog listing page (static shell)
Create `src/routes/blog/index.tsx`. For now: page title + "No posts yet" placeholder. Wire up to real data in T-11.

### T-07 — Blog post page (static shell)
Create `src/routes/blog/$slug.tsx`. For now: renders the `$slug` param. Wire up to real data in T-12.

### T-08 — Projects page
Create `src/routes/projects/index.tsx`. Static list of projects with name, description, and links (GitHub / live URL).

### T-09 — Contact page
Create `src/routes/contact/index.tsx`. Email link + social links (GitHub, LinkedIn, etc.).

---

## Phase 3 — Markdown infrastructure

| ID | Status | Title |
|----|--------|-------|
| T-10 | todo | Add markdown packages |
| T-11 | todo | Create `src/lib/posts.ts` |
| T-12 | todo | Wire blog listing to `getAllPosts()` |
| T-13 | todo | Wire blog post page to `getPostBySlug()` |

### T-10 — Add markdown packages
```bash
pnpm add gray-matter remark remark-html
```
Add types if needed: `pnpm add -D @types/gray-matter`.

### T-11 — Create `src/lib/posts.ts`
Two exported functions:
- `getAllPosts()` — reads all `posts/*.md`, parses frontmatter with `gray-matter`, returns array sorted by `date` desc
- `getPostBySlug(slug)` — reads `posts/${slug}.md`, converts body to HTML with `remark` + `remark-html`

Frontmatter shape:
```markdown
---
title: "Post Title"
date: "2026-01-15"
description: "One-line summary"
tags: ["tag1", "tag2"]
---
```

### T-12 — Wire blog listing to `getAllPosts()`
Update `src/routes/blog/index.tsx` to call `getAllPosts()` via a route loader and render real post cards (title, date, description linking to `/blog/$slug`).

### T-13 — Wire blog post page to `getPostBySlug()`
Update `src/routes/blog/$slug.tsx` to call `getPostBySlug(slug)` via a route loader and render the HTML body. Add a back link to `/blog`.

---

## Phase 4 — Polish

| ID | Status | Title |
|----|--------|-------|
| T-14 | todo | Per-page `<meta>` titles and descriptions |
| T-15 | todo | 404 catch-all route |
| T-16 | todo | Dark mode |
| T-17 | todo | Mobile-responsive nav |

### T-14 — Per-page `<meta>` titles and descriptions
Use `Route.head()` in each route file to set `<title>` and `<meta name="description">`.

### T-15 — 404 catch-all route
Create `src/routes/$.tsx` — renders a friendly "Page not found" message with a link back to home.

### T-16 — Dark mode
Add dark mode support via Tailwind `dark:` classes driven by `prefers-color-scheme` media query (CSS-only, no JS toggle needed initially).

### T-17 — Mobile-responsive nav
Update `src/components/Header.tsx` so nav links collapse/stack cleanly on small screens.
