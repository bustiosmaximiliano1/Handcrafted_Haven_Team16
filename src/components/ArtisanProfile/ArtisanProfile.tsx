import Link from "next/link";
// Importamos el CSS module desde la misma carpeta del componente
import styles from "./ArtisanProfile.module.css";

interface Product {
  id: string;
  name: string;
  price: { toString: () => string } | number;
  category?: { name: string } | null;
}

interface ArtisanProfileProps {
  artisan: {
    id: string;
    name: string | null;
    bio: string | null;
    products: Product[];
  };
}

export default function ArtisanProfile({ artisan }: ArtisanProfileProps) {
  return (
    <div className={styles.container}>
      {/* Tarjeta de la historia del artesano */}
      <section className={styles.card}>
        <span className={styles.badge}>
          Artisan Profile
        </span>
        
        <h1 className={styles.title}>
          {artisan.name || "Unnamed Artisan"}
        </h1>

        <div className={styles.storyHeader}>
          <h2 className={styles.label}>
            Our Story & Craft
          </h2>
          <p className={styles.subtitle} style={{ whiteSpace: "pre-line", marginBottom: 0 }}>
            {artisan.bio || `Welcome to the craft space of ${artisan.name || "this artisan"}. Every piece in this collection is thoughtfully designed and handcrafted with quality, care, and attention to detail.`}
          </p>
        </div>
      </section>

      {/* Sección de la Colección */}
      <section>
        <h2 className={styles.sectionTitle}>
          Handcrafted Collection ({artisan.products.length})
        </h2>

        {artisan.products.length === 0 ? (
          <p className={styles.subtitle}>
            This artisan does not have any active products listed right now.
          </p>
        ) : (
          <div className={styles.grid}>
            {artisan.products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div>
                  <span className={styles.categoryTag}>
                    {product.category?.name || "Handcrafted"}
                  </span>
                  <h3 className={styles.productName}>
                    {product.name}
                  </h3>
                  <p className={styles.price}>
                    ${product.price.toString()}
                  </p>
                </div>

                <Link href={`/products/${product.id}`} className={styles.submitBtn}>
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}