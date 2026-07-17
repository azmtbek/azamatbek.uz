import type { Metadata } from "next"
import Header from "@/components/Header"
import "./globals.css"

export const metadata: Metadata = {
	title: "Azamatbek Mamarajabov",
	description: "Software engineer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="alternate" type="application/rss+xml" title="Azamatbek's Blog" href="/rss.xml" />
				{/* Runs before first paint to avoid flash of wrong theme */}
				<script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&d))document.documentElement.classList.add('dark');})();` }} />
			</head>
			<body>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded focus:outline-none focus:ring-2 focus:ring-ring"
				>
					Skip to content
				</a>
				<Header />
				<div id="main-content">{children}</div>
			</body>
		</html>
	)
}
