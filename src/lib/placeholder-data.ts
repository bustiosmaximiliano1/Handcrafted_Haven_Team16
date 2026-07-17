/**
 * Placeholder (mock) data + small helpers.
 *
 * This lets every page render real-looking content BEFORE the database exists.
 * When the DB task is finished, replace the arrays below with real queries that
 * return the same types — the components won't need to change.
 *
 * This mirrors the pattern used in the official Next.js "App Router" course.
 */

import type { Product, Review, Seller } from "./types";

export const sellers: Seller[] = [
  {
    id: "s1",
    name: "Mara Oliveira",
    story:
      "Potter working out of a small studio, making functional stoneware for everyday use.",
  },
  {
    id: "s2",
    name: "Tomás Herrera",
    story:
      "Woodworker turning locally sourced timber into bowls, boards, and small furniture.",
  },
  {
    id: "s3",
    name: "Lena Fischer",
    story:
      "Weaver and natural dyer creating textiles in small, seasonal batches.",
  },
  {
    id: "s4",
    name: "Priya Nair",
    story:
      "Metalsmith making minimalist jewelry, one piece at a time, entirely by hand.",
  },
];

export const products: Product[] = [
  { id: "p1", sellerId: "s1", title: "Speckled stoneware mug", description: "Wheel-thrown mug with a matte speckled glaze. Holds about 340 ml.", price: 28, category: "ceramics" },
  { id: "p2", sellerId: "s1", title: "Serving bowl, sage glaze", description: "Generous serving bowl finished in a soft sage green.", price: 46, category: "ceramics" },
  { id: "p3", sellerId: "s2", title: "Olive wood cutting board", description: "End-grain board turned from a single piece of olive wood.", price: 62, category: "woodwork" },
  { id: "p4", sellerId: "s2", title: "Hand-carved spoon set", description: "Set of two cooking spoons, oiled and food-safe.", price: 34, category: "woodwork" },
  { id: "p5", sellerId: "s3", title: "Handwoven wool throw", description: "Loom-woven throw in undyed and indigo wool.", price: 120, category: "textiles" },
  { id: "p6", sellerId: "s3", title: "Naturally dyed table runner", description: "Cotton runner dyed with madder root and onion skin.", price: 48, category: "textiles" },
  { id: "p7", sellerId: "s4", title: "Hammered brass hoops", description: "Lightweight hoops with a hand-hammered texture.", price: 39, category: "jewelry" },
  { id: "p8", sellerId: "s4", title: "Silver pebble ring", description: "Cast silver ring with an organic, river-pebble shape.", price: 54, category: "jewelry" },
];

export const reviews: Review[] = [
  { id: "r1", productId: "p1", authorName: "Ana", rating: 5, comment: "The glaze is even nicer in person. Perfect weight.", createdAt: "2026-02-10" },
  { id: "r2", productId: "p1", authorName: "Jorge", rating: 4, comment: "Lovely mug, a little smaller than I expected.", createdAt: "2026-02-18" },
  { id: "r3", productId: "p3", authorName: "Sofía", rating: 5, comment: "Beautiful board and clearly built to last.", createdAt: "2026-01-29" },
  { id: "r4", productId: "p5", authorName: "Marco", rating: 5, comment: "Warm, soft, and the indigo is gorgeous.", createdAt: "2026-02-02" },
  { id: "r5", productId: "p7", authorName: "Lucía", rating: 4, comment: "Great everyday earrings. Very light.", createdAt: "2026-02-21" },
];

/* --------------------------- helpers --------------------------- */

/** Format a dollar amount for display, e.g. 28 -> "$28.00". */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/** Look up the reviews that belong to a product. */
export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

/**
 * Average rating (0 if none) plus how many reviews there are.
 * Used by the product card and the product detail page.
 */
export function getProductRating(productId: string): {
  average: number;
  count: number;
} {
  const list = getReviewsForProduct(productId);
  if (list.length === 0) return { average: 0, count: 0 };
  const sum = list.reduce((total, r) => total + r.rating, 0);
  return { average: sum / list.length, count: list.length };
}

/** Look up a single product by id. */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Look up a single seller by id. */
export function getSellerById(id: string): Seller | undefined {
  return sellers.find((s) => s.id === id);
}
