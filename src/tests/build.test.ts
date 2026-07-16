import { spawn } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

const BUILD_PORT = 3001
const serverEntry = path.join(process.cwd(), ".output/server/index.mjs")
const buildExists = fs.existsSync(serverEntry)

let serverProcess: ReturnType<typeof spawn> | null = null

async function get(route: string) {
	return fetch(`http://localhost:${BUILD_PORT}${route}`, {
		redirect: "follow",
		signal: AbortSignal.timeout(5000),
	})
}

describe.skipIf(!buildExists)("production build", () => {
	beforeAll(async () => {
		serverProcess = spawn("node", [serverEntry], {
			env: { ...process.env, NITRO_PORT: String(BUILD_PORT) },
			stdio: "pipe",
		})

		// Wait until the server responds
		await new Promise<void>((resolve, reject) => {
			const timeout = setTimeout(() => reject(new Error("Server did not start within 15s")), 15_000)
			const poll = () =>
				fetch(`http://localhost:${BUILD_PORT}`, { signal: AbortSignal.timeout(1000) })
					.then(() => { clearTimeout(timeout); resolve() })
					.catch(() => setTimeout(poll, 500))
			serverProcess!.on("error", (err) => { clearTimeout(timeout); reject(err) })
			setTimeout(poll, 1000)
		})
	}, 20_000)

	afterAll(() => {
		serverProcess?.kill()
	})

	it("/ returns 200 with owner name", async () => {
		const res = await get("/")
		expect(res.status).toBe(200)
		expect(await res.text()).toContain("Azamatbek Mamarajabov")
	})

	it("/blog returns 200 with post listing", async () => {
		const res = await get("/blog")
		expect(res.status).toBe(200)
		const body = await res.text()
		expect(body).toContain("Getting Started")
		expect(body).toContain('href="/blog/getting-started"')
	})

	it("/blog/getting-started is served with post content", async () => {
		const res = await get("/blog/getting-started")
		expect(res.status).toBe(200)
		const body = await res.text()
		expect(body).toContain("Getting Started")
		expect(body).toContain("Welcome to the blog")
	})

	it("/blog/getting-started HTML does not reference Vite dev assets", async () => {
		const body = await (await get("/blog/getting-started")).text()
		expect(body).not.toContain("/@react-refresh")
		expect(body).not.toContain("/@vite/")
	})

	it("/blog/tags/meta returns 200 with filtered posts", async () => {
		const res = await get("/blog/tags/meta")
		expect(res.status).toBe(200)
		expect(await res.text()).toContain("Getting Started")
	})

	it("/rss.xml returns a valid RSS feed", async () => {
		const res = await get("/rss.xml")
		expect(res.status).toBe(200)
		expect(res.headers.get("content-type")).toContain("xml")
		const body = await res.text()
		expect(body).toContain('version="2.0"')
		expect(body).toContain("Getting Started")
		expect(body).toContain("/blog/getting-started")
	})

	it("/sitemap.xml returns a valid sitemap", async () => {
		const res = await get("/sitemap.xml")
		expect(res.status).toBe(200)
		expect(res.headers.get("content-type")).toContain("xml")
		const body = await res.text()
		expect(body).toContain("https://azamatbek.uz/")
		expect(body).toContain("https://azamatbek.uz/blog")
		expect(body).toContain("https://azamatbek.uz/blog/getting-started")
		expect(body).toContain("https://azamatbek.uz/projects")
		expect(body).toContain("https://azamatbek.uz/contact")
	})

	it("/projects returns 200", async () => {
		const res = await get("/projects")
		expect(res.status).toBe(200)
		expect(await res.text()).toContain("Projects")
	})

	it("/contact returns 200 with contact links", async () => {
		const res = await get("/contact")
		expect(res.status).toBe(200)
		expect(await res.text()).toContain("mailto:azamatbek.dev@gmail.com")
	})
})
