import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact — Azamatbek",
	description: "Get in touch.",
	openGraph: {
		title: "Contact — Azamatbek",
		description: "Get in touch.",
		type: "website",
		url: "https://azamatbek.uz/contact",
		siteName: "azamatbek.uz",
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact — Azamatbek",
		description: "Get in touch.",
	},
};

const links = [
	{ label: "Email", href: "mailto:azamatbek.dev@gmail.com" },
	{ label: "GitHub", href: "https://github.com/azamatbek-dev" },
	{ label: "LinkedIn", href: "https://linkedin.com/in/azamatbek" },
];

export default function ContactPage() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-2xl font-bold tracking-tight mb-4">Contact</h1>
			<p className="text-muted-foreground mb-8">
				The best way to reach me is by email.
			</p>
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
	);
}
