import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects — Azamatbek",
	description: "Things I've built.",
	openGraph: {
		title: "Projects — Azamatbek",
		description: "Things I've built.",
		type: "website",
		url: "https://azamatbek.uz/projects",
		siteName: "azamatbek.uz",
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects — Azamatbek",
		description: "Things I've built.",
	},
};

const projects = [
	{
		name: "azamatbek.uz",
		description: "Personal site and blog built with Next.js.",
		github: "https://github.com/azmtbek/azamatbek.uz",
		url: "https://azamatbek.uz",
	},
];

export default function ProjectsPage() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-2xl font-bold tracking-tight mb-8">Projects</h1>
			<ul className="space-y-6">
				{projects.map((p) => (
					<li key={p.name} className="border-b pb-6 last:border-0">
						<div className="flex items-baseline justify-between gap-4 mb-1">
							<h2 className="font-semibold">{p.name}</h2>
							<div className="flex gap-3 text-sm">
								{p.url && (
									<a
										href={p.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Live
									</a>
								)}
								{p.github && (
									<a
										href={p.github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										GitHub
									</a>
								)}
							</div>
						</div>
						<p className="text-sm text-muted-foreground">{p.description}</p>
					</li>
				))}
			</ul>
		</main>
	);
}
