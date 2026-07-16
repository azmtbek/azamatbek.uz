import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getAllPosts } from "../../../lib/posts"

const fetchPostsByTag = createServerFn({ method: "GET" })
	.inputValidator((tag: string) => tag)
	.handler(({ data: tag }) => getAllPosts().filter((p) => p.tags.includes(tag)))

export const Route = createFileRoute("/blog/tags/$tag")({
	head: ({ params }) => ({
		meta: [
			{ title: `#${params.tag} — Azamatbek` },
			{ name: "description", content: `Posts tagged "${params.tag}".` },
			{ property: "og:title", content: `#${params.tag} — Azamatbek` },
			{ property: "og:description", content: `Posts tagged "${params.tag}".` },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: `https://azamatbek.uz/blog/tags/${params.tag}` },
		],
	}),
	loader: ({ params }) => fetchPostsByTag({ data: params.tag }),
	component: TagListing,
})

function TagListing() {
	const posts = Route.useLoaderData()
	const { tag } = Route.useParams()

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<Link
				to="/blog"
				className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
			>
				← Blog
			</Link>
			<h1 className="text-2xl font-bold tracking-tight mb-2">
				#{tag}
			</h1>
			<p className="text-sm text-muted-foreground mb-8">
				{posts.length} {posts.length === 1 ? "post" : "posts"}
			</p>
			{posts.length === 0 ? (
				<p className="text-muted-foreground">No posts with this tag.</p>
			) : (
				<ul className="space-y-8">
					{posts.map((post) => (
						<li key={post.slug} className="border-b pb-8 last:border-0">
							<Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
								<h2 className="font-semibold text-lg group-hover:underline underline-offset-4 mb-1">
									{post.title}
								</h2>
							</Link>
							<div className="flex items-center gap-3 mb-2">
								<p className="text-xs text-muted-foreground">{post.date}</p>
								<span className="text-xs text-muted-foreground">·</span>
								<p className="text-xs text-muted-foreground">{post.readingTime} min read</p>
							</div>
							{post.description && (
								<p className="text-sm text-muted-foreground">{post.description}</p>
							)}
						</li>
					))}
				</ul>
			)}
		</main>
	)
}
