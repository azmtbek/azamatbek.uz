import { beforeAll, describe, expect, it } from "vitest"

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000"
let online = false

beforeAll(async () => {
	try {
		const res = await fetch(BASE, { signal: AbortSignal.timeout(3000) })
		online = res.status < 500
	} catch {
		online = false
		console.warn(`\n⚠  Server not reachable at ${BASE} — skipping server tests.\n   Run \`pnpm dev\` in another terminal, then re-run tests.\n`)
	}
})

function serverIt(name: string, fn: () => Promise<void>) {
	it(name, async () => {
		if (!online) return
		await fn()
	})
}

async function get(path: string) {
	return fetch(`${BASE}${path}`, {
		redirect: "follow",
		signal: AbortSignal.timeout(5000),
	})
}

async function html(path: string) {
	const res = await get(path)
	return { status: res.status, body: await res.text() }
}

describe("server routes", () => {
	describe("GET /", () => {
		serverIt("returns 200", async () => {
			const { status } = await html("/")
			expect(status).toBe(200)
		})

		serverIt("renders the owner name", async () => {
			const { body } = await html("/")
			expect(body).toContain("Azamatbek Mamarajabov")
		})

		serverIt("renders nav links", async () => {
			const { body } = await html("/")
			expect(body).toContain('href="/blog"')
			expect(body).toContain('href="/projects"')
			expect(body).toContain('href="/contact"')
		})

		serverIt("has correct page title", async () => {
			const { body } = await html("/")
			expect(body).toContain("<title>Azamatbek Mamarajabov</title>")
		})
	})

	describe("GET /blog", () => {
		serverIt("returns 200", async () => {
			const { status } = await html("/blog")
			expect(status).toBe(200)
		})

		serverIt("has correct page title", async () => {
			const { body } = await html("/blog")
			expect(body).toContain("<title>Blog — Azamatbek</title>")
		})

		serverIt("lists the getting-started post", async () => {
			const { body } = await html("/blog")
			expect(body).toContain("Getting Started")
			expect(body).toContain("A first post to kick things off.")
			expect(body).toContain("2026-07-16")
		})

		serverIt("shows reading time on post listing", async () => {
			const { body } = await html("/blog")
			expect(body).toContain("min read")
		})

		serverIt("shows tag badges on post listing", async () => {
			const { body } = await html("/blog")
			expect(body).toContain('href="/blog/tags/meta"')
		})

		serverIt("post titles link to /blog/$slug", async () => {
			const { body } = await html("/blog")
			expect(body).toContain('href="/blog/getting-started"')
		})
	})

	describe("GET /blog/:slug", () => {
		serverIt("returns 200 for an existing post", async () => {
			const { status } = await html("/blog/getting-started")
			expect(status).toBe(200)
		})

		serverIt("renders the post title and date", async () => {
			const { body } = await html("/blog/getting-started")
			expect(body).toContain("Getting Started")
			expect(body).toContain("2026-07-16")
		})

		serverIt("renders the markdown body as HTML", async () => {
			const { body } = await html("/blog/getting-started")
			expect(body).toContain("Welcome to the blog")
		})

		serverIt("has correct page title", async () => {
			const { body } = await html("/blog/getting-started")
			expect(body).toContain("<title>Getting Started — Azamatbek</title>")
		})

		serverIt("includes a back link to /blog", async () => {
			const { body } = await html("/blog/getting-started")
			expect(body).toContain('href="/blog"')
		})

		serverIt("shows reading time on post page", async () => {
			const { body } = await html("/blog/getting-started")
			expect(body).toContain("min read")
		})

		serverIt("shows tag badges on post page", async () => {
			const { body } = await html("/blog/getting-started")
			expect(body).toContain('href="/blog/tags/meta"')
		})

		serverIt("returns 200 with not-found message for missing slug", async () => {
			const { status, body } = await html("/blog/no-such-post")
			expect(status).toBe(200)
			expect(body).toContain("Post not found")
		})
	})

	describe("GET /projects", () => {
		serverIt("returns 200", async () => {
			const { status } = await html("/projects")
			expect(status).toBe(200)
		})

		serverIt("has correct page title", async () => {
			const { body } = await html("/projects")
			expect(body).toContain("<title>Projects — Azamatbek</title>")
		})
	})

	describe("GET /contact", () => {
		serverIt("returns 200", async () => {
			const { status } = await html("/contact")
			expect(status).toBe(200)
		})

		serverIt("has correct page title", async () => {
			const { body } = await html("/contact")
			expect(body).toContain("<title>Contact — Azamatbek</title>")
		})

		serverIt("renders email link", async () => {
			const { body } = await html("/contact")
			expect(body).toContain("mailto:azamatbek.dev@gmail.com")
		})

		serverIt("renders GitHub and LinkedIn links", async () => {
			const { body } = await html("/contact")
			expect(body).toContain("github.com/azamatbek-dev")
			expect(body).toContain("linkedin.com/in/azamatbek")
		})
	})

	describe("GET /blog/tags/:tag", () => {
		serverIt("returns 200 for a valid tag", async () => {
			const { status } = await html("/blog/tags/meta")
			expect(status).toBe(200)
		})

		serverIt("lists posts with the given tag", async () => {
			const { body } = await html("/blog/tags/meta")
			expect(body).toContain("Getting Started")
		})

		serverIt("has correct page title", async () => {
			const { body } = await html("/blog/tags/meta")
			expect(body).toContain("<title>#meta — Azamatbek</title>")
		})
	})

	describe("GET /rss.xml", () => {
		serverIt("returns RSS feed with correct content-type", async () => {
			const res = await get("/rss.xml")
			expect(res.status).toBe(200)
			expect(res.headers.get("content-type")).toContain("xml")
		})

		serverIt("contains blog post entries", async () => {
			const res = await get("/rss.xml")
			const body = await res.text()
			expect(body).toContain('version="2.0"')
			expect(body).toContain("Getting Started")
			expect(body).toContain("/blog/getting-started")
		})
	})

	describe("GET /sitemap.xml", () => {
		serverIt("returns sitemap with correct content-type", async () => {
			const res = await get("/sitemap.xml")
			expect(res.status).toBe(200)
			expect(res.headers.get("content-type")).toContain("xml")
		})

		serverIt("contains all static routes and blog posts", async () => {
			const res = await get("/sitemap.xml")
			const body = await res.text()
			expect(body).toContain("https://azamatbek.uz/")
			expect(body).toContain("https://azamatbek.uz/blog")
			expect(body).toContain("https://azamatbek.uz/blog/getting-started")
			expect(body).toContain("https://azamatbek.uz/projects")
			expect(body).toContain("https://azamatbek.uz/contact")
		})
	})

	describe("GET /[unknown]", () => {
		serverIt("returns 404 with not-found page content", async () => {
			const { status, body } = await html("/this-page-does-not-exist")
			expect(status).toBe(404)
			expect(body).toContain("Page not found")
		})

		serverIt("has correct page title on 404", async () => {
			const { body } = await html("/this-page-does-not-exist")
			expect(body).toContain("<title>Page not found — Azamatbek</title>")
		})
	})
})
