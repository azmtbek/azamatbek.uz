import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"

interface Props {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const post = await getPostBySlug(slug)
	if (!post) return { title: "Post not found — Azamatbek" }
	return {
		title: `${post.title} — Azamatbek`,
		description: post.description,
		openGraph: {
			title: `${post.title} — Azamatbek`,
			description: post.description,
			type: "article",
			url: `https://azamatbek.uz/blog/${post.slug}`,
		},
		twitter: {
			card: "summary",
			title: `${post.title} — Azamatbek`,
			description: post.description,
		},
	}
}

export function generateStaticParams() {
	return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	const post = await getPostBySlug(slug)
	if (!post) notFound()

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<Link
				href="/blog"
				className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
			>
				← Blog
			</Link>
			<h1 className="text-3xl font-bold tracking-tight mb-2">{post.title}</h1>
			<div className="flex items-center gap-3 mb-4">
				<p className="text-sm text-muted-foreground">{post.date}</p>
				<span className="text-sm text-muted-foreground">·</span>
				<p className="text-sm text-muted-foreground">{post.readingTime} min read</p>
			</div>
			{post.tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-10">
					{post.tags.map((tag) => (
						<Link
							key={tag}
							href={`/blog/tags/${tag}`}
							className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
						>
							{tag}
						</Link>
					))}
				</div>
			)}
			<div
				className="prose prose-neutral dark:prose-invert max-w-none"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: rehype-sanitize strips unsafe HTML
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
		</main>
	)
}
