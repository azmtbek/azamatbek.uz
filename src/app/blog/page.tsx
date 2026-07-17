import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
	title: "Blog — Azamatbek",
	description:
		"Writing on web development, systems, and things I find interesting.",
	openGraph: {
		title: "Blog — Azamatbek",
		description:
			"Writing on web development, systems, and things I find interesting.",
		type: "website",
		url: "https://azamatbek.uz/blog",
		siteName: "azamatbek.uz",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog — Azamatbek",
		description:
			"Writing on web development, systems, and things I find interesting.",
	},
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-2xl font-bold tracking-tight mb-8">Blog</h1>
			{posts.length === 0 ? (
				<p className="text-muted-foreground">No posts yet.</p>
			) : (
				<ul className="space-y-8">
					{posts.map((post) => (
						<li key={post.slug} className="border-b pb-8 last:border-0">
							<Link href={`/blog/${post.slug}`} className="group">
								<h2 className="font-semibold text-lg group-hover:underline underline-offset-4 mb-1">
									{post.title}
								</h2>
							</Link>
							<div className="flex items-center gap-3 mb-2">
								<p className="text-xs text-muted-foreground">{post.date}</p>
								<span className="text-xs text-muted-foreground">·</span>
								<p className="text-xs text-muted-foreground">
									{post.readingTime} min read
								</p>
							</div>
							{post.description && (
								<p className="text-sm text-muted-foreground mb-3">
									{post.description}
								</p>
							)}
							{post.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
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
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
