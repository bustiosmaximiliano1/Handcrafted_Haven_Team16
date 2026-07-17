# Foundation guide — how this base maps to the board

This project is scaffolded so each user story has a clear home. **No user story
is implemented** — there is no auth, no database, and no working forms or
filters. Everything data-related uses mock data from `src/lib/placeholder-data.ts`
and is clearly marked to be replaced.

## What's already solid (reuse it, don't rebuild it)

| Piece | Where | What it gives you |
|---|---|---|
| Design system | `src/app/globals.css` | Colors, fonts, spacing as CSS variables |
| Shared chrome | `src/app/layout.tsx` | Navbar + Footer + `<main>` on **every** page automatically |
| Data model | `src/lib/types.ts` | `Product`, `Seller`, `Review` — the shapes the DB will return |
| Mock data | `src/lib/placeholder-data.ts` | Sample data + helpers so pages render before the DB exists |
| `ProductCard` | `src/components/ProductCard` | The one card for any product grid |
| `StarRating` | `src/components/StarRating` | Displays a rating (used by card + detail) |
| `PageHeader` | `src/components/PageHeader` | Consistent heading band for inner pages |
| Catalog (reference) | `src/app/products/page.tsx` | Full pattern: types → data → component → grid |

## Where each user story gets built

| User story | File to work in | Status |
|---|---|---|
| Register | `src/app/register/page.tsx` | Stub — build the form + save user |
| Log in / log out | `src/app/login/page.tsx` | Stub — build auth |
| Create seller profile | (new) `src/app/dashboard` or a profile form | Not scaffolded — team decides route |
| View seller profile | `src/app/sellers/[id]/page.tsx` | Scaffolded — routing works, build layout |
| List a product | (new) a "new product" form page | Not scaffolded — team decides route |
| Browse catalog | `src/app/products/page.tsx` | **Reference done** — swap mock for DB query |
| Filter products | `src/components/FilterBar` + catalog | UI placeholder — wire up the logic |
| Product detail | `src/app/products/[id]/page.tsx` | Scaffolded — routing works, build layout |
| Rating + review | product detail page + a form | Stub inside product detail |
| See ratings + reviews | product detail page | Stub inside product detail |

## The one pattern to copy

Look at `src/app/products/page.tsx`. Every data page follows the same shape:

1. Import the type and the data source.
2. Map over the data.
3. Render a reusable component.

When the database is ready, only step 1's *source* changes (a DB query instead
of the mock array). The components and layout stay the same.

## Remaining technical tasks (from the board)

- Set up the database and schema — the tables should match `types.ts`.
- Deploy to Vercel.
- Meet web standards: accessibility, responsive, SEO, validation.
- Write the README with all member names.
