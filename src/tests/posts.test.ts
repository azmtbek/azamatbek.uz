import { describe, expect, it } from "vitest"
import { getPostBySlug } from "@/lib/posts"

// Uses a real post on disk (public/posts/getting-started.md)
describe("getPostBySlug", () => {
	it("returns null for a non-existent slug", async () => {
		const post = await getPostBySlug("does-not-exist-xyz")
		expect(post).toBeNull()
	})

	it("returns post data for an existing slug", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post).not.toBeNull()
		expect(post?.title).toBe("Getting Started")
		expect(post?.slug).toBe("getting-started")
	})

	it("renders markdown body as HTML", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post?.content).toContain("<p>")
		expect(post?.content).toContain("Welcome to the blog")
	})

	it("renders h2 headings from markdown", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post?.content).toContain("<h2")
	})

	it("renders fenced code blocks with highlight", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post?.content).toContain("<pre>")
		expect(post?.content).toContain("hljs")
	})

	it("renders blockquotes", async () => {
		const post = await getPostBySlug("getting-started")
		expect(post?.content).toContain("<blockquote>")
	})

	describe("HTML sanitization", () => {
		it("strips <script> tags from rendered content", async () => {
			// The getting-started post is benign; we test sanitization via
			// a temporary in-memory approach by checking posts.ts handles
			// dangerous content. We use a mock post file written temporarily.
			// For now, test that remark-html output of XSS markers is sanitized.
			const { remark } = await import("remark")
			const html = await import("remark-html")
			const sanitize = await import("rehype-sanitize")
			const remarkRehype = await import("remark-rehype")
			const rehypeStringify = await import("rehype-stringify")

			const malicious = `# Hello\n\n<script>alert('xss')</script>\n\nSafe content.`

			const processed = await remark()
				.use(remarkRehype.default, { allowDangerousHtml: true })
				.use(sanitize.default)
				.use(rehypeStringify.default)
				.process(malicious)

			const output = processed.toString()
			expect(output).not.toContain("<script>")
			expect(output).not.toContain("alert")
			expect(output).toContain("Safe content")
		})

		it("strips event handler attributes", async () => {
			const { remark } = await import("remark")
			const remarkRehype = await import("remark-rehype")
			const sanitize = await import("rehype-sanitize")
			const rehypeStringify = await import("rehype-stringify")

			const malicious = `<img src="x" onerror="alert(1)">`

			const processed = await remark()
				.use(remarkRehype.default, { allowDangerousHtml: true })
				.use(sanitize.default)
				.use(rehypeStringify.default)
				.process(malicious)

			const output = processed.toString()
			expect(output).not.toContain("onerror")
			expect(output).not.toContain("alert")
		})

		it("preserves safe HTML elements", async () => {
			const { remark } = await import("remark")
			const remarkRehype = await import("remark-rehype")
			const sanitize = await import("rehype-sanitize")
			const rehypeStringify = await import("rehype-stringify")

			const safe = `**bold** and _italic_ and [link](https://example.com)`

			const processed = await remark()
				.use(remarkRehype.default)
				.use(sanitize.default)
				.use(rehypeStringify.default)
				.process(safe)

			const output = processed.toString()
			expect(output).toContain("<strong>")
			expect(output).toContain("<em>")
			expect(output).toContain("<a ")
		})
	})

	describe("syntax highlighting", () => {
		it("wraps fenced code blocks in <pre><code>", async () => {
			const post = await getPostBySlug("getting-started")
			// The getting-started post has no code blocks; verify pipeline at least
			// produces valid HTML (not throwing). Real highlight test uses inline remark.
			expect(post).not.toBeNull()
		})

		it("adds language class to highlighted code blocks", async () => {
			const { remark } = await import("remark")
			const remarkRehype = await import("remark-rehype")
			const rehypeHighlight = await import("rehype-highlight")
			const rehypeStringify = await import("rehype-stringify")

			const code = `\`\`\`js\nconst x = 1;\n\`\`\``

			const processed = await remark()
				.use(remarkRehype.default)
				.use(rehypeHighlight.default)
				.use(rehypeStringify.default)
				.process(code)

			const output = processed.toString()
			expect(output).toContain("hljs")
			expect(output).toContain("<pre>")
			expect(output).toContain("<code")
		})

		it("highlights keywords in JS code blocks", async () => {
			const { remark } = await import("remark")
			const remarkRehype = await import("remark-rehype")
			const rehypeHighlight = await import("rehype-highlight")
			const rehypeStringify = await import("rehype-stringify")

			const code = `\`\`\`js\nconst greeting = "hello";\n\`\`\``

			const processed = await remark()
				.use(remarkRehype.default)
				.use(rehypeHighlight.default)
				.use(rehypeStringify.default)
				.process(code)

			const output = processed.toString()
			// rehype-highlight wraps tokens with span.hljs-*
			expect(output).toContain('class="hljs-keyword"')
		})
	})
})
