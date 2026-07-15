# Refactor Plan: Simple Blog Website

## Goal

Simplify the current over-engineered portfolio into a clean, functional blog site. Strip adventure-mode complexity, fix the broken dependency tree, implement real markdown blog rendering, and leave a maintainable codebase.

---

## Phase 1 — Fix Broken Foundations

**Problem:** `package.json` is missing nearly every library the code actually imports. The project will not build.

### Steps

- [ ] Audit and update `package.json` — add all missing runtime dependencies:
  - `zustand` (state)
  - `next-themes` (theme persistence)
  - `clsx` + `tailwind-merge` (classname utils)
  - `lucide-react` (icons)
  - `react-hook-form` + `@hookform/resolvers` + `zod` (admin forms)
  - `gray-matter` (markdown frontmatter parsing)
  - `remark` + `remark-html` (markdown-to-HTML rendering)
  - `@radix-ui/*` packages required by shadcn/ui components
- [ ] Run `npm install` and verify `npm run build` passes
- [ ] Delete duplicate files:
  - Remove `src/app/Navbar.tsx` (keep lowercase `src/app/navbar.tsx`)
  - Remove `src/components/Grid.tsx` and `src/components/List.tsx`

---

## Phase 2 — Remove Adventure Mode Complexity

**Problem:** Gamified navigation (progress bars, path gating, Zustand stores, Stars, Mountains, Moon, MovingPoint) adds hundreds of lines of maintenance burden with no blog value.

### Files to delete

| File | Reason |
|------|--------|
| `src/app/(index)/AdventureMode.tsx` | Replaced by simple home |
| `src/app/(index)/SimpleMode.tsx` | WIP, unused |
| `src/app/(index)/Main.tsx` | No longer needed |
| `src/app/map.tsx` | Adventure map dialog |
| `src/app/mode-switcher.tsx` | Adventure/simple toggle |
| `src/app/moving-point.tsx` | Mostly commented-out, decorative |
| `src/app/Stars.tsx` + `Stars.module.css` | Decorative only |
| `src/app/(pages)/projects/Mountains.tsx` | Decorative only |
| `src/app/(pages)/projects/Moon.tsx` | Decorative only |
| `src/app/(pages)/middle-earth/` | Fantasy-named hub page |
| `src/app/(pages)/arcade/` | Empty placeholder |
| `src/store/useHaveBeen.ts` | Path-gating progress logic |
| `src/store/usePrevPath.ts` | Never read anywhere |
| `src/store/useMode.ts` | No longer two modes |
| `src/icon/sword.tsx` | Never used |
| `src/hooks/useElementsOnScreen.tsx` | Only used for adventure scroll trigger |
| `src/lib/planetscale.ts` | TODO stub, no DB planned |

### Files to simplify

- [ ] `src/app/layout.tsx` — remove `ModeSwitcher`, `MovingPoint` wrapper; keep `ThemeProvider`, `Navbar`, `ThemeButton`
- [ ] `src/app/(index)/page.tsx` — render a simple `<Home />` component directly

---

## Phase 3 — Implement Real Blog

**Problem:** `posts/` directory exists with markdown files but nothing reads or renders them.

### Tasks

- [ ] Create **`src/lib/posts.ts`** with two functions:
  - `getAllPosts()` — reads `posts/*.md`, parses frontmatter with `gray-matter`, returns array sorted by date
  - `getPostBySlug(slug)` — reads one post, converts body to HTML with `remark`
- [ ] Adopt this frontmatter convention for `posts/*.md`:
  ```markdown
  ---
  title: "Post Title"
  date: "2026-01-15"
  description: "One-line summary shown in listing"
  tags: ["tag1", "tag2"]
  ---
  ```
- [ ] Update **`src/app/(pages)/blog/page.tsx`** — server component, call `getAllPosts()`, render real post list
- [ ] Create **`src/app/(pages)/blog/[slug]/page.tsx`** — dynamic route, call `getPostBySlug(slug)`, render HTML, add `generateStaticParams`
- [ ] Create **`src/app/(pages)/blog/PostCard.tsx`** — single reusable card replacing both `Grid.tsx` and `List.tsx`

---

## Phase 4 — Simplify Navigation & Routing

**Problem:** Routes use fantasy names; navigation is split across two modes.

### Route changes

| Old | New |
|-----|-----|
| `/middle-earth` | removed (use `/projects`) |
| Contact Sea page title | rename to just "Contact" |
| `/arcade` | removed |

### Navbar tasks

- [ ] Update `src/app/navbar.tsx` links: Home `/`, Blog `/blog`, Projects `/projects`, Contact `/contact`
- [ ] Remove any `MapMenu` / adventure import from layout

---

## Phase 5 — Clean Up Components & State

- [ ] Drop Zustand entirely if no global state remains after Phase 2 (`next-themes` covers theme state)
- [ ] Rename `src/hooks/useTimerCount.tsx` → `src/hooks/useMounted.ts` for clarity
- [ ] Audit `src/components/ui/` — remove shadcn components that are only referenced by deleted files
- [ ] Admin pages (`src/app/(admin)/`) — keep but stub out the empty `thoughts/` page with a basic form matching `projects/` editor

---

## Phase 6 — Polish

- [ ] Write a real home page: name, bio, links to blog and projects, theme toggle
- [ ] Add `generateMetadata` to blog listing and individual post pages for SEO
- [ ] Verify `not-found.tsx` renders cleanly after route removals
- [ ] Update `README.md` with new structure and dev commands

---

## Target File Structure

```
src/
├── app/
│   ├── (admin)/
│   │   ├── here/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   └── thoughts/page.tsx
│   │   └── why/page.tsx
│   ├── (index)/
│   │   └── page.tsx              ← simple home
│   ├── (pages)/
│   │   ├── layout.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          ← lists all posts
│   │   │   ├── [slug]/page.tsx   ← renders single post  (NEW)
│   │   │   └── PostCard.tsx      ← card component       (NEW)
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       ├── page.tsx
│   │       └── Contact.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── navbar.tsx
│   └── theme-button.tsx
│
├── components/
│   └── ui/                       ← only shadcn components actually used
│
├── hooks/
│   └── useMounted.ts             ← renamed from useTimerCount
│
├── lib/
│   ├── utils.ts
│   └── posts.ts                  ← NEW: markdown reading utilities
│
└── icon/
    └── leetcode.tsx

posts/                            ← markdown content
```

---

## Execution Order

| # | Phase | Effort | Risk |
|---|-------|--------|------|
| 1 | Fix `package.json` + install deps | Low | Medium — build may surface more issues |
| 2 | Delete adventure-mode files | Low | Low — isolated code |
| 3 | Implement markdown blog | Medium | Low |
| 4 | Simplify routing & navbar | Low | Low |
| 5 | Clean up components & state | Medium | Low |
| 6 | Polish home page + SEO | Low | Low |

Start with Phase 1 (un-breaks the build) then Phase 2 (clears the noise) before writing new code in Phases 3–6.