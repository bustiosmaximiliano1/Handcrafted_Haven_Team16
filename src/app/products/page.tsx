import PageHeader from "@/components/PageHeader/PageHeader";
import FilterBar from "@/components/FilterBar/FilterBar";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products, getProductRating } from "@/lib/placeholder-data";
import styles from "./products.module.css";

/**
 * Product catalog — REFERENCE IMPLEMENTATION.
 *
 * This page shows the full pattern the rest of the app should follow:
 *   types (Product)  ->  data source (placeholder-data)  ->  reusable
 *   component (ProductCard)  ->  responsive grid.
 *
 * Right now it maps over mock data. The only real work left for the catalog
 * user story is to replace `products` with a database query that returns the
 * same Product[] — nothing else here needs to change.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Catalog"
        subtitle="Every piece is made by hand by an independent maker."
      />

      <div className={`container ${styles.layout}`}>
        <FilterBar />

        <section aria-label="Products" className={styles.results}>
          <ul className={styles.grid}>
            {products.map((product) => {
              const { average, count } = getProductRating(product.id);
              return (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    rating={average}
                    reviewCount={count}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
