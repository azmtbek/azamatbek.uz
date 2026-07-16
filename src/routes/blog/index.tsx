import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getAllPosts } from "../../lib/posts"

const fetchPosts = createServerFn({ method: "GET" }).handler(() => getAllPosts())

export const Route = createFileRoute("/blog/")({
	head: () => ({
		meta: [{ title: "Blog — Azamatbek" }, { name: "description", content: "Writing on web development, systems, and things I find interesting." }],
	}),
	loader: () => fetchPosts(),
	component: BlogListing,
})

function BlogListing() {
	const posts = Route.useLoaderData()

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-2xl font-bold tracking-tight mb-8">Blog</h1>
			{posts.length === 0 ? (
				<p className="text-muted-foreground">No posts yet.</p>
			) : (
				<ul className="space-y-8">
					{posts.map((post) => (
						<li key={post.slug} className="border-b pb-8 last:border-0">
							<Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
								<h2 className="font-semibold text-lg group-hover:underline underline-offset-4 mb-1">
									{post.title}
								</h2>
							</Link>
							<p className="text-xs text-muted-foreground mb-2">{post.date}</p>
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
