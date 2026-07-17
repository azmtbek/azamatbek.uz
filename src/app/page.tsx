import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Azamatbek Mamarajabov",
	description: "Software engineer. Writing about web development and things I find interesting.",
	openGraph: {
		title: "Azamatbek Mamarajabov",
		description: "Software engineer. Writing about web development and things I find interesting.",
		type: "website",
		url: "https://azamatbek.uz/",
	},
	twitter: {
		card: "summary",
		title: "Azamatbek Mamarajabov",
		description: "Software engineer. Writing about web development and things I find interesting.",
	},
}

export default function Home() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-20">
			<h1 className="text-3xl font-bold tracking-tight mb-3">Azamatbek Mamarajabov</h1>
			<p className="text-muted-foreground text-lg mb-8">
				Software engineer. I write about web development, systems, and things I find interesting.
			</p>
			<div className="flex gap-4">
				<Link
					href="/blog"
					className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
				>
					Blog
				</Link>
				<Link
					href="/projects"
					className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
				>
					Projects
				</Link>
			</div>
		</main>
	)
}
