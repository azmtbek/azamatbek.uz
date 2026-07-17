---
title: "Getting Started"
date: "2026-07-16"
description: "A first post to kick things off."
tags: ["meta"]
---

Welcome to the blog. This is the first post — a place to write about web development, systems, and whatever else catches my interest.

## Why a blog?

Writing is thinking. Putting something into words forces you to understand it clearly, which means writing about technology is also a way of getting better at it.

> The best way to understand something is to try to explain it to someone else.

More practically: I keep notes anyway, so I might as well share them.

## What to expect

Posts will usually be short and focused. Topics I plan to cover:

- Web performance and Core Web Vitals
- TypeScript patterns
- Developer tooling
- Things I learned the hard way

## A code example

Here's the hello-world equivalent for this stack — reading a Markdown file in a Next.js server component:

```ts
import fs from "node:fs"
import matter from "gray-matter"

const raw = fs.readFileSync("posts/hello.md", "utf-8")
const { data, content } = matter(raw)
```

That's it. No API routes, no `getServerSideProps` — just a file read in a server component.

More content coming soon.
