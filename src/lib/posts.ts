import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import rehypeHighlight from "rehype-highlight"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import { remark } from "remark"
import remarkRehype from "remark-rehype"

const postsDir = path.join(process.cwd(), "public/posts")

export interface PostMeta {
	slug: string
	title: string
	date: string
	description: string
	tags: string[]
	readingTime: number
}

export interface Post extends PostMeta {
	content: string
}

export function getAllPosts(): PostMeta[] {
	if (!fs.existsSync(postsDir)) return []

	try {
		return fs
			.readdirSync(postsDir)
			.filter((f) => f.endsWith(".md"))
			.map((filename) => {
				const slug = filename.replace(/\.md$/, "")
				const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8")
				const { data, content: body } = matter(raw)
				const wordCount = body.split(/\s+/).filter(Boolean).length
				return {
					slug,
					title: data.title ?? slug,
					date: data.date ?? "",
					description: data.description ?? "",
					tags: data.tags ?? [],
					readingTime: Math.max(1, Math.ceil(wordCount / 200)),
				} satisfies PostMeta
			})
			.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
	} catch {
		return []
	}
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const filepath = path.join(postsDir, `${slug}.md`)
	if (!fs.existsSync(filepath)) return null

	try {
		const raw = fs.readFileSync(filepath, "utf-8")
		const { data, content: body } = matter(raw)
		const processed = await remark()
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeSanitize)
			.use(rehypeHighlight)
			.use(rehypeStringify)
			.process(body)
		const wordCount = body.split(/\s+/).filter(Boolean).length

		return {
			slug,
			title: data.title ?? slug,
			date: data.date ?? "",
			description: data.description ?? "",
			tags: data.tags ?? [],
			readingTime: Math.max(1, Math.ceil(wordCount / 200)),
			content: processed.toString(),
		}
	} catch {
		return null
	}
}
