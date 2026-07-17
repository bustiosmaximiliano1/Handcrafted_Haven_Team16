# Handcrafted Haven — Project Foundation

The starter base for the WDD 430 group project, built on the required stack:
**Next.js (App Router) · TypeScript · ESLint · `src/` directory · CSS Modules
(no Tailwind) · fonts via `next/font`.**

This is a **foundation**, not a finished app. It gives the team a solid
skeleton — routes, a shared layout, a data model, reusable components, and mock
data — so each user story is straightforward to build. **No user story is
implemented:** there is no authentication, no database, and no working forms or
filters. Everything is scaffolded and clearly marked.

## How to use it in the group project

1. Create the Next.js app as the assignment says:
   ```bash
   npx create-next-app@latest .
   # TypeScript: Yes · ESLint: Yes · React Compiler: No · Tailwind: No · src/: Yes · App Router: Yes
   ```
2. Copy the `src/` folder from this package into your project, replacing the
   generated `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`.
3. Run it:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Try these routes

- `/` — landing page
- `/products` — catalog (renders mock products — this is the reference pattern)
- `/products/p1` — product detail (scaffolded)
- `/sellers/s1` — seller profile (scaffolded)
- `/login`, `/register` — auth pages (scaffolded)

## Read this next

**`FOUNDATION.md`** maps every route and component to its user story on the
board, and shows the one pattern to copy for data pages.

## Previews (no install needed)

- `preview-home.html` — the landing page
- `preview-catalog.html` — the catalog with product cards

Open either in a browser to see the design without running Next.js.
