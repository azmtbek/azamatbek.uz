// @vitest-environment jsdom
import { cleanup, fireEvent, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import ThemeToggle from "@/components/ThemeToggle"

// jsdom v27 localStorage doesn't expose .clear() — use a manual mock instead
function makeLocalStorageMock() {
	let store: Record<string, string> = {}
	return {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => { store[key] = value },
		removeItem: (key: string) => { delete store[key] },
		clear: () => { store = {} },
	}
}

// Inline script logic extracted for unit testing
function applyInitialTheme() {
	const saved = localStorage.getItem("theme")
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
	if (saved === "dark" || (!saved && prefersDark)) {
		document.documentElement.classList.add("dark")
	} else {
		document.documentElement.classList.remove("dark")
	}
}

describe("theme initialization (inline script logic)", () => {
	let ls: ReturnType<typeof makeLocalStorageMock>

	beforeEach(() => {
		ls = makeLocalStorageMock()
		vi.stubGlobal("localStorage", ls)
		document.documentElement.classList.remove("dark")
		vi.spyOn(window, "matchMedia").mockReturnValue({
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as MediaQueryList)
	})

	afterEach(() => {
		vi.restoreAllMocks()
		vi.unstubAllGlobals()
	})

	it("applies dark class when localStorage has 'dark'", () => {
		localStorage.setItem("theme", "dark")
		applyInitialTheme()
		expect(document.documentElement.classList.contains("dark")).toBe(true)
	})

	it("does not apply dark class when localStorage has 'light'", () => {
		localStorage.setItem("theme", "light")
		applyInitialTheme()
		expect(document.documentElement.classList.contains("dark")).toBe(false)
	})

	it("applies dark class when system prefers dark and nothing in localStorage", () => {
		vi.spyOn(window, "matchMedia").mockReturnValue({
			matches: true,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as MediaQueryList)
		applyInitialTheme()
		expect(document.documentElement.classList.contains("dark")).toBe(true)
	})

	it("does not apply dark class when system prefers light and nothing in localStorage", () => {
		applyInitialTheme()
		expect(document.documentElement.classList.contains("dark")).toBe(false)
	})
})

describe("ThemeToggle component", () => {
	let ls: ReturnType<typeof makeLocalStorageMock>

	beforeEach(async () => {
		ls = makeLocalStorageMock()
		vi.stubGlobal("localStorage", ls)
		document.documentElement.classList.remove("dark")
		vi.spyOn(window, "matchMedia").mockReturnValue({
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as MediaQueryList)
	})

	afterEach(() => {
		cleanup()
		vi.restoreAllMocks()
		vi.unstubAllGlobals()
	})

	it("renders a button with an accessible label", () => {
		const { getByRole } = render(<ThemeToggle />)
		const btn = getByRole("button")
		expect(btn).toBeTruthy()
		expect(btn.getAttribute("aria-label")).toBeTruthy()
	})

	it("adds dark class to <html> on first click (light → dark)", () => {
		const { getByRole } = render(<ThemeToggle />)
		expect(document.documentElement.classList.contains("dark")).toBe(false)
		fireEvent.click(getByRole("button"))
		expect(document.documentElement.classList.contains("dark")).toBe(true)
	})

	it("removes dark class on second click (dark → light)", () => {
		const { getByRole } = render(<ThemeToggle />)
		fireEvent.click(getByRole("button"))
		fireEvent.click(getByRole("button"))
		expect(document.documentElement.classList.contains("dark")).toBe(false)
	})

	it("persists 'dark' to localStorage when toggling on", () => {
		const { getByRole } = render(<ThemeToggle />)
		fireEvent.click(getByRole("button"))
		expect(localStorage.getItem("theme")).toBe("dark")
	})

	it("persists 'light' to localStorage when toggling off", () => {
		const { getByRole } = render(<ThemeToggle />)
		fireEvent.click(getByRole("button"))
		fireEvent.click(getByRole("button"))
		expect(localStorage.getItem("theme")).toBe("light")
	})

	it("initialises as dark when <html> already has dark class", () => {
		document.documentElement.classList.add("dark")
		const { getByRole } = render(<ThemeToggle />)
		fireEvent.click(getByRole("button"))
		expect(document.documentElement.classList.contains("dark")).toBe(false)
		expect(localStorage.getItem("theme")).toBe("light")
	})
})
