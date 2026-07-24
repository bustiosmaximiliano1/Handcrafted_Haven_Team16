import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { addToCartAction } from "@/actions/cart-actions";
import AddToCartSubmitButton from "@/components/AddToCartButton/AddToCartSubmitButton";
import styles from "./ProductDetail.module.css";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      category: true,
      artisan: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className={`container ${styles.page}`}>
        <section className={styles.grid}>
          <div className={`${styles.imageCard} surface-card`}>
            {product.images[0] ? (
              <div className={styles.imageWrap}>
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="product-card__image"
                />
              </div>
            ) : (
              <div className={styles.imagePlaceholder}>No product image available yet.</div>
            )}
          </div>

          <article className={`${styles.infoCard} surface-card`}>
            <div className={styles.metaRow}>
              <span className={styles.pill}>{product.category?.name || "Uncategorized"}</span>
              <span className={styles.pill}>Stock: {product.stock}</span>
            </div>

            <h1 className={styles.title}>{product.name}</h1>

            <p className={styles.artisanText}>
              By{" "}
              {product.artisan?.id ? (
                <Link href={`/artisans/${product.artisan.id}/profile`} className={styles.artisanLink}>
                  {product.artisan.name || "Unknown Artisan"}
                </Link>
              ) : (
                "Unknown Artisan"
              )}
            </p>

            <p className={styles.price}>${product.price.toString()}</p>

            <p className={styles.description}>
              {product.description || "No description available yet."}
            </p>

            <div className={styles.actions}>
              {product.stock > 0 ? (
                <form action={addToCartAction}>
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="redirectTo" value={`/products/${product.id}`} />
                  <AddToCartSubmitButton
                    className="button button--primary button--subtle-lift"
                    idleText="Add to cart"
                    pendingText="Adding..."
                  />
                </form>
              ) : (
                <p className={styles.soldOut}>Sold out</p>
              )}

              <Link href="/products" className={styles.backLink}>
                Back to catalog
              </Link>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}
