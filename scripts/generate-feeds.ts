import fs from "node:fs"
import path from "node:path"
import { getAllPosts } from "../src/lib/posts"

const SITE_URL = "https://azamatbek.uz"
const PUBLIC_DIR = path.join(process.cwd(), "public")

function escapeXml(str: string) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
}

function generateRss(posts: ReturnType<typeof getAllPosts>) {
	const items = posts
		.map(
			(post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
    </item>`,
		)
		.join("")

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Azamatbek&apos;s Blog</title>
    <link>${SITE_URL}</link>
    <description>Writing on web development, systems, and things I find interesting.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`
}

function generateSitemap(posts: ReturnType<typeof getAllPosts>) {
	const staticRoutes = [
		{ loc: "/", priority: "1.0" },
		{ loc: "/blog", priority: "0.9" },
		{ loc: "/projects", priority: "0.7" },
		{ loc: "/contact", priority: "0.7" },
	]

	const staticUrls = staticRoutes
		.map(
			({ loc, priority }) => `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <priority>${priority}</priority>
  </url>`,
		)
		.join("")

	const postUrls = posts
		.map(
			(post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <priority>0.8</priority>
  </url>`,
		)
		.join("")

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${postUrls}
</urlset>`
}

const posts = getAllPosts()
fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), generateRss(posts), "utf-8")
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), generateSitemap(posts), "utf-8")
console.log(`Generated rss.xml and sitemap.xml (${posts.length} posts)`)
