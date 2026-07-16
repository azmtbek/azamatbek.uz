import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getPostBySlug } from "../../lib/posts"

const fetchPost = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(({ data: slug }) => getPostBySlug(slug))

export const Route = createFileRoute("/blog/$slug")({
	head: ({ loaderData: post }) => ({
		meta: post
			? [{ title: `${post.title} — Azamatbek` }, { name: "description", content: post.description }]
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
			<p className="text-sm text-muted-foreground mb-10">{post.date}</p>
			<div
				className="prose prose-neutral max-w-none"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown output from remark
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
		</main>
	)
}
