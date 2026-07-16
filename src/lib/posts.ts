import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDir = path.join(process.cwd(), "posts")

export interface PostMeta {
	slug: string
	title: string
	date: string
	description: string
	tags: string[]
}

export interface Post extends PostMeta {
	content: string
}

export function getAllPosts(): PostMeta[] {
	if (!fs.existsSync(postsDir)) return []

	return fs
		.readdirSync(postsDir)
		.filter((f) => f.endsWith(".md"))
		.map((filename) => {
			const slug = filename.replace(/\.md$/, "")
			const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8")
			const { data } = matter(raw)
			return {
				slug,
				title: data.title ?? slug,
				date: data.date ?? "",
				description: data.description ?? "",
				tags: data.tags ?? [],
			} satisfies PostMeta
		})
		.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const filepath = path.join(postsDir, `${slug}.md`)
	if (!fs.existsSync(filepath)) return null

	const raw = fs.readFileSync(filepath, "utf-8")
	const { data, content: body } = matter(raw)
	const processed = await remark().use(html).process(body)

	return {
		slug,
		title: data.title ?? slug,
		date: data.date ?? "",
		description: data.description ?? "",
		tags: data.tags ?? [],
		content: processed.toString(),
	}
}
