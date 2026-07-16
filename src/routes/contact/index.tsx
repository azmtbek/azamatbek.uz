import { createFileRoute } from "@tanstack/react-router"

const links = [
	{ label: "Email", href: "mailto:azamatbek.dev@gmail.com" },
	{ label: "GitHub", href: "https://github.com/azamatbek-dev" },
	{ label: "LinkedIn", href: "https://linkedin.com/in/azamatbek" },
]

export const Route = createFileRoute("/contact/")({
	head: () => ({
		meta: [
			{ title: "Contact — Azamatbek" },
			{ name: "description", content: "Get in touch." },
			{ property: "og:title", content: "Contact — Azamatbek" },
			{ property: "og:description", content: "Get in touch." },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://azamatbek.uz/contact" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: "Contact — Azamatbek" },
			{ name: "twitter:description", content: "Get in touch." },
		],
	}),
	component: Contact,
})

function Contact() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-2xl font-bold tracking-tight mb-4">Contact</h1>
			<p className="text-muted-foreground mb-8">The best way to reach me is by email.</p>
			<ul className="space-y-3">
				{links.map(({ label, href }) => (
					<li key={label}>
						<a
							href={href}
							target={href.startsWith("mailto") ? undefined : "_blank"}
							rel="noopener noreferrer"
							className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
						>
							{label}
						</a>
					</li>
				))}
			</ul>
		</main>
	)
}
