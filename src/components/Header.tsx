import { Link } from "@tanstack/react-router"

const links = [
	{ to: "/", label: "Home" },
	{ to: "/blog", label: "Blog" },
	{ to: "/projects", label: "Projects" },
	{ to: "/contact", label: "Contact" },
] as const

export default function Header() {
	return (
		<header className="border-b px-6 py-4">
			<nav className="max-w-3xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-3">
				<Link to="/" className="font-semibold text-sm mr-auto">
					azamatbek.uz
				</Link>
				<ul className="flex items-center gap-5 flex-wrap">
					{links.map(({ to, label }) => (
						<li key={to}>
							<Link
								to={to}
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								activeProps={{ className: "text-sm text-foreground font-medium" }}
								activeOptions={to === "/" ? { exact: true } : undefined}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
