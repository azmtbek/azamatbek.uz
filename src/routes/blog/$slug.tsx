import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getPostBySlug } from "../../lib/posts"

const fetchPost = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(({ data: slug }) => getPostBySlug(slug))

export const Route = createFileRoute("/blog/$slug")({
	head: ({ loaderData: post }) => ({
		meta: post
			? [
					{ title: `${post.title} — Azamatbek` },
					{ name: "description", content: post.description },
					{ property: "og:title", content: `${post.title} — Azamatbek` },
					{ property: "og:description", content: post.description },
					{ property: "og:type", content: "article" },
					{ property: "og:url", content: `https://azamatbek.uz/blog/${post.slug}` },
					{ name: "twitter:card", content: "summary" },
					{ name: "twitter:title", content: `${post.title} — Azamatbek` },
					{ name: "twitter:description", content: post.description },
				]
			: [{ title: "Post not found — Azamatbek" }],
	}),
	loader: ({ params }) => fetchPost({ data: params.slug }),
	component: BlogPost,
})

function BlogPost() {
	const post = Route.useLoaderData()

	if (!post) {
		return (
			<main className="max-w-3xl mx-auto px-6 py-12">
				<Link
					to="/blog"
					className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
				>
					← Blog
				</Link>
				<p className="text-muted-foreground">Post not found.</p>
			</main>
		)
	}

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<Link
				to="/blog"
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
							to="/blog/tags/$tag"
							params={{ tag }}
							className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
						>
							{tag}
						</Link>
					))}
				</div>
			)}
			<div
				className="prose prose-neutral max-w-none"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: remark-html sanitizes raw HTML by default (allowDangerousHtml is false)
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
		</main>
	)
}
