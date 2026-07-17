import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

interface Props {
	params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params;
	return {
		title: `#${tag} — Azamatbek`,
		description: `Posts tagged "${tag}".`,
		openGraph: {
			title: `#${tag} — Azamatbek`,
			description: `Posts tagged "${tag}".`,
			type: "website",
			url: `https://azamatbek.uz/blog/tags/${tag}`,
			siteName: "azamatbek.uz",
		},
		twitter: {
			card: "summary_large_image",
			title: `#${tag} — Azamatbek`,
			description: `Posts tagged "${tag}".`,
		},
	};
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params;
	const posts = getAllPosts().filter((p) => p.tags.includes(tag));

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<Link
				href="/blog"
				className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
			>
				← Blog
			</Link>
			<h1 className="text-2xl font-bold tracking-tight mb-2">#{tag}</h1>
			<p className="text-sm text-muted-foreground mb-8">
				{posts.length} {posts.length === 1 ? "post" : "posts"}
			</p>
			{posts.length === 0 ? (
				<p className="text-muted-foreground">No posts with this tag.</p>
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
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
