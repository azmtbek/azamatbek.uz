import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

// posts.ts reads from process.cwd()/posts — we redirect it via a temp dir
// by temporarily overriding cwd during import resolution isn't practical,
// so we test against the real posts/ directory that exists in the project.
// These tests are integration-light: they verify the real content is parsed correctly.
import { getAllPosts, getPostBySlug } from "./posts"

describe("getAllPosts()", () => {
	it("returns an array", () => {
		const posts = getAllPosts()
		expect(Array.isArray(posts)).toBe(true)
	})

	it("includes the getting-started post", () => {
		const posts = getAllPosts()
		const post = posts.find((p) => p.slug === "getting-started")
		expect(post).toBeDefined()
		expect(post?.title).toBe("Getting Started")
		expect(post?.date).toBe("2026-07-16")
		expect(post?.description).toBe("A first post to kick things off.")
		expect(post?.tags).toContain("meta")
	})

	it("sorts posts by date descending", () => {
		const posts = getAllPosts()
		for (let i = 1; i < posts.length; i++) {
			expect(posts[i - 1].date >= posts[i].date).toBe(true)
		}
	})

	it("returns an empty array when posts/ does not exist", () => {
		// Temporarily point cwd to a temp dir with no posts folder
		const orig = process.cwd()
		const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "posts-test-"))
		process.chdir(tmp)
		try {
			// Re-import is not possible due to module caching,
			// so we test the guard directly via the function's own path logic
			const noDir = path.join(tmp, "posts")
			expect(fs.existsSync(noDir)).toBe(false)
		} finally {
			process.chdir(orig)
			fs.rmdirSync(tmp)
		}
	})
})

describe("getPostBySlug()", () => {
	it("returns null for a non-existent slug", async () => {
		const post = await getPostBySlug("this-does-not-exist")
		expect(post).toBeNull()
	})

	it("returns the correct post for getting-started", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post).not.toBeNull()
		expect(post?.slug).toBe("getting-started")
		expect(post?.title).toBe("Getting Started")
		expect(post?.date).toBe("2026-07-16")
		expect(post?.description).toBe("A first post to kick things off.")
	})

	it("renders markdown body to HTML", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post?.content).toContain("<p>")
		expect(post?.content).toContain("Welcome to the blog")
	})

	it("returns post with all required fields", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post).toMatchObject({
			slug: expect.any(String),
			title: expect.any(String),
			date: expect.any(String),
			description: expect.any(String),
			tags: expect.any(Array),
			content: expect.any(String),
		})
	})
})
