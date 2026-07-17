# Plan: azamatbek.uz — Next Steps

## Current baseline

- Next.js 16 App Router, React 19, Tailwind v4, Biome, Vitest
- Pages: `/`, `/blog`, `/blog/[slug]`, `/blog/tags/[tag]`, `/projects`, `/contact`, 404
- RSS + sitemap via `scripts/generate-feeds.ts` → `public/`
- Server tests (`src/tests/server.test.ts`) + build smoke tests (`src/tests/build.test.ts`) passing

---

## Next steps (priority order)

### ~~1. HTML sanitization~~ ✓
**File:** `src/lib/posts.ts`
- `rehype-sanitize` added to the unified remark → remark-rehype → rehype-sanitize → rehype-highlight → rehype-stringify pipeline
- Strips `<script>` tags and event-handler attributes; preserves safe HTML

### ~~2. Syntax highlighting for code blocks~~ ✓
**File:** `src/lib/posts.ts`, `src/app/globals.css`
- `rehype-highlight` added to the same pipeline
- github.css (light) + github-dark.css (dark, via `prefers-color-scheme`) imported in `globals.css`

### ~~3. Dark mode toggle~~ ✓
- `src/components/ThemeToggle.tsx` — button that reads `<html class="dark">` state, toggles it, and persists `"dark"/"light"` to `localStorage`
- Added to `Header.tsx` (already `"use client"`)
- Inline `<script>` in `layout.tsx` `<head>` applies dark class before first paint to prevent FOUC

### ~~4. Blog post typography~~ ✓
- Installed `@tailwindcss/typography`; added `@plugin "@tailwindcss/typography"` to `globals.css`
- Content div in `blog/[slug]/page.tsx` uses `prose prose-neutral dark:prose-invert max-w-none`
- Updated `public/posts/getting-started.md` to include rich content (h2, blockquote, code block, list)

### 5. OG image generation
- Add `opengraph-image.tsx` per route using Next.js `ImageResponse`
- Auto-generates `og:image` for each blog post

### 6. Pagination
- Once there are 10+ posts: add pagination to `/blog`
- `generate-feeds.ts` already handles all posts in RSS; no changes needed until post count grows

### 7. Analytics
- Add Vercel Analytics or Plausible
- One import in `src/app/layout.tsx`

```bash
pnpm add @vercel/analytics
```
