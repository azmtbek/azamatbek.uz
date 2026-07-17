import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Page not found — Azamatbek",
}

export default function NotFound() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-20">
			<h1 className="text-2xl font-bold tracking-tight mb-3">Page not found</h1>
			<p className="text-muted-foreground mb-8">This page doesn't exist.</p>
			<Link
				href="/"
				className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
			>
				Go home
			</Link>
		</main>
	)
}
