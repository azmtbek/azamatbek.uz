"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/blog", label: "Blog" },
	{ href: "/projects", label: "Projects" },
	{ href: "/contact", label: "Contact" },
] as const;

export default function Header() {
	const pathname = usePathname();

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<header className="border-b px-6 py-4">
			<nav
				aria-label="Main navigation"
				className="max-w-3xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-3"
			>
				<Link
					href="/"
					aria-label="Home"
					className="flex items-center gap-2 font-semibold text-sm mr-auto"
				>
					<Logo className="size-5" />
					azamatbek.uz
				</Link>
				<ul className="flex items-center gap-5 flex-wrap">
					{links.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								aria-current={isActive(href) ? "page" : undefined}
								className={`text-sm transition-colors ${
									isActive(href)
										? "text-foreground font-medium"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
				<ThemeToggle />
			</nav>
		</header>
	);
}
