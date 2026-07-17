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

### ~~5. OG image generation~~ ✓
- `src/lib/og.tsx` — shared `OgImage` component + `ogSize`/`ogContentType` constants
- `opengraph-image.tsx` added to every route: `src/app/`, `src/app/blog/`, `src/app/blog/[slug]/` (dynamic per post), `src/app/blog/tags/[tag]/` (dynamic per tag), `src/app/projects/`, `src/app/contact/`
- `metadataBase` set in `layout.tsx` so generated `og:image` URLs resolve to `azamatbek.uz` instead of `localhost` in production

### 6. Pagination
- Once there are 10+ posts: add pagination to `/blog`
- `generate-feeds.ts` already handles all posts in RSS; no changes needed until post count grows

### ~~7. Analytics~~ ✓
- `@vercel/analytics` installed; `<Analytics />` added to `src/app/layout.tsx`

### 8. More blog content
- Pipeline (sanitization, highlighting, typography, dark mode, OG images) is fully built but only exercised by one post (`getting-started.md`)
- Writing a few more posts exercises tags (`/blog/tags/[tag]`), RSS, and sitemap generation in production rather than just in smoke tests

### ~~9. Telegram link preview~~ ✓
- `og:site_name` added to every page's `openGraph` block (Next does not deep-merge `openGraph` between layout and page, so it has to be set per page, not just in `layout.tsx`)
- `twitter:card` upgraded from `summary` to `summary_large_image` everywhere, matching the 1200×630 images
- `blog/[slug]/page.tsx` now sets `openGraph.publishedTime`, `authors`, `tags` (renders as `article:*` meta tags)
- `blog/[slug]/page.tsx` markup wraps the post in `<article itemScope itemType="https://schema.org/BlogPosting">` with `itemProp` on the headline, `<time>` (`datePublished`), author `<meta>`, and the content div (`articleBody`) — no visual change, but gives a Telegram Instant View template (or any other scraper) unambiguous fields to target

### 10. Telegram Instant View (manual, needs your Telegram account)
- IV is opt-in per domain; it's built and submitted at https://instantview.telegram.org/my, not via code
- Steps: open the tool → "Create new template" → paste a live post URL (e.g. `https://azamatbek.uz/blog/getting-started`) → the sandbox shows the rendered HTML and lets you write `iv` template rules (CSS-like selectors) mapping title/subtitle/author/published/cover/body
- Item 9's microdata makes this fast: point the template at `//article`, `[itemprop=headline]`, `[itemprop=datePublished]`, `[itemprop=author]`, `[itemprop=articleBody]` instead of guessing at class names
- Submit the template for review once it renders correctly for a couple of different posts; Telegram's team approves it for the domain
