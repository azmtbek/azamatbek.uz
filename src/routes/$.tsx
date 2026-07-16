import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$")({
	head: () => ({ meta: [{ title: "Page not found — Azamatbek" }] }),
	component: NotFound,
})

function NotFound() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-20">
			<h1 className="text-2xl font-bold tracking-tight mb-3">Page not found</h1>
			<p className="text-muted-foreground mb-8">
				This page doesn't exist.
			</p>
			<Link
				to="/"
				className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
			>
				Go home
			</Link>
		</main>
	)
}
