/**
 * Shared data model for Handcrafted Haven.
 *
 * These types are the single source of truth for the shapes the whole team
 * works with. They intentionally mirror the future database tables, so when
 * the DB task is done the queries can return these exact shapes and nothing
 * downstream has to change.
 *
 * Board task: "Set up the database and schema (users, products, reviews)".
 */

export type Category = "ceramics" | "textiles" | "jewelry" | "woodwork";

export const CATEGORIES: Category[] = [
  "ceramics",
  "textiles",
  "jewelry",
  "woodwork",
];

/** A seller/artisan account. (User story: register + create profile) */
export interface Seller {
  id: string;
  name: string;
  /** Short bio shown on the seller profile page. */
  story: string;
  /** Path or URL to the profile photo. Optional until uploaded. */
  photoUrl?: string;
}

/** A handcrafted item for sale. (User story: list a product) */
export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  /** Price in US dollars. */
  price: number;
  category: Category;
  /** Path or URL to the product image. Optional until uploaded. */
  imageUrl?: string;
}

/** A rating + written review left on a product. (User story: reviews) */
export interface Review {
  id: string;
  productId: string;
  authorName: string;
  /** Whole number from 1 to 5. */
  rating: number;
  comment: string;
  /** ISO date string, e.g. "2026-02-14". */
  createdAt: string;
}
