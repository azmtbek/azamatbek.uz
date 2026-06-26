# Project Plan: Develop a Personal Blog using shadcn/ui on TanStack.

## 📝 Goal & Scope
*A brief description of what this project aims to achieve and its boundaries.*

**Objective:** To create a modern, functional, and automated blogging platform that serves as a portfolio and a continuous learning diary for agentic AI concepts.
**Scope:** 
* **In Scope:** Blog posting functionality (CMS integration), user-friendly interface using `shadcn/ui`, data state management via TanStack Query/Router, robust automation (CI/CD setup, linting rules).
* **Out of Scope (for MVP):** Advanced user roles (e.g., commenting system by general public), complex payment features, dedicated e-commerce integration.

---

## ✅ To-Do List / Roadmap
*List all tasks needed to complete the project. Use a consistent format for tracking completion (e.g., [ ]).*

### Phase 0: Initial Deployment & Architecture Setup (Goal: Live MVP on GCP)
- [ ] **Tech Stack Initialization:** Set up the basic Next.js/React + shadcn boilerplate project structure.
- [ ] **Deployment Pipeline:** Configure initial CI/CD pipeline (e.g., GitHub Actions) to deploy a static site successfully to Google Cloud Platform (GCP). *Crucial step for early publishing.*
- [ ] **Core Page Structure:** Create the basic Home page, About page, and Blog Listing index using placeholder data.

### Phase 1: Basic Content Display & Local Experience (The Reading MVP)
- [ ] **Post Data Model:** Define the structure of a blog post (title, content, date).
- [ ] **Markdown/MDX Implementation:** Implement front matter handling and render local markdown files into view components.
- [ ] **Routing:** Use TanStack Router to map URLs to specific blog posts (`/blog/[slug]`).

### Phase 2: Content Creation & Automation (The Writing Experience)
- [ ] **Draft Editor Component:** Build a rich text editor simulation or component for composing new posts.
- [ ] **Local Persistence:** Implement local data saving mechanisms (e.g., writing to `drafts` folder).
- [ ] **Linting & Pre-commit Hooks:** Set up robust linting rules and git hooks to enforce code quality automatically.

### Phase 3: Refinement & Unique Feature Implementation
- [ ] **Learning Log Integration:** Build the dedicated section that tracks the journey of learning agentic programming concepts, making it a core feature.
- [ ] **UI Polish:** Enhance aesthetics using remaining `shadcn/ui` components (e.g., optimized typography, dark mode).

---

## 💡 Key Decisions & Notes
*A place to record important architectural decisions, assumptions, or research findings.*

**Decision:** Use Next.js framework for development due to its robust support for Static Site Generation (SSG) and excellent developer experience with shadcn/ui components.
**Hosting Target:** Firebase Hosting is selected as the primary deployment target within GCP. This offers superior ease of use, highly effective static site hosting for blogs, and an optimal cost-to-performance ratio compared to Cloud Run for our MVP phase.

---

## 📅 Milestones / Deadlines (Optional)
*Major checkpoints for the project.*

- Milestone 1: Working basic site deployed to Staging on Firebase Hosting (End of Phase 0/Start of Phase 1).
- Milestone 2: Ability to draft and render a new post locally without deployment issues (End of Phase 1).

***

**Status:** On Track | At Risk | Blocked