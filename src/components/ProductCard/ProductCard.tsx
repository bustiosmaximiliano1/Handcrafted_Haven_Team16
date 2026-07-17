import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/placeholder-data";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  /** Average rating, if known. */
  rating?: number;
  /** Number of reviews, if known. */
  reviewCount?: number;
}

/**
 * The single reusable card for showing a product in a grid.
 * Used by: the catalog, the (future) filtered results, and a seller's
 * collection on their profile. Change it here, it changes everywhere.
 */
export default function ProductCard({
  product,
  rating,
  reviewCount,
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      {/*
        Image placeholder. When products have real images, replace this block
        with next/image:
        <Image src={product.imageUrl} alt={product.title} fill ... />
      */}
      <div className={styles.image} aria-hidden="true">
        <span className={styles.imageHint}>photo</span>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>

        {typeof rating === "number" && (
          <StarRating value={rating} count={reviewCount} />
        )}

        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
