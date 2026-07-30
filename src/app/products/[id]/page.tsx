import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { addToCartAction } from "@/actions/cart-actions";
import AddToCartSubmitButton from "@/components/AddToCartButton/AddToCartSubmitButton";
import { createReviewAction } from "@/actions/review-actions";
import { cookies } from "next/headers";
import styles from "./ProductDetail.module.css";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

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
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profileImageUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const currentUser = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          role: true,
        },
      })
    : null;

  const canLeaveReview = Boolean(currentUser);

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

        <section className={`${styles.reviewsCard} surface-card`}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.reviewsTitle}>Reviews</h2>
            <p className={styles.reviewsSubtitle}>{product.reviews.length} review{product.reviews.length === 1 ? "" : "s"}</p>
          </div>

          {product.reviews.length === 0 ? (
            <p className={styles.emptyReviews}>No one has reviewed this product yet.</p>
          ) : (
            <div className={styles.reviewList}>
              {product.reviews.map((review) => (
                <article key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewTopRow}>
                    <div>
                      <strong className={styles.reviewerName}>{review.user.name || "Anonymous"}</strong>
                      <p className={styles.reviewMeta}>Rating: {review.rating}/5</p>
                    </div>
                    <time className={styles.reviewDate} dateTime={review.createdAt.toISOString()}>
                      {review.createdAt.toLocaleDateString()}
                    </time>
                  </div>

                  {review.title && <h3 className={styles.reviewTitle}>{review.title}</h3>}
                  <p className={styles.reviewBody}>{review.body}</p>
                </article>
              ))}
            </div>
          )}

          <div className={styles.reviewFormWrap}>
            <h3 className={styles.reviewFormTitle}>Write a review</h3>

            {currentUser ? (
              canLeaveReview ? (
                <form action={createReviewAction} className={styles.reviewForm}>
                  <input type="hidden" name="productId" value={product.id} />

                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Rating</span>
                    <select name="rating" defaultValue="5" className={styles.select} required>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Great</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Title</span>
                    <input
                      type="text"
                      name="title"
                      className={styles.input}
                      placeholder="Optional short summary"
                      maxLength={120}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Review</span>
                    <textarea
                      name="body"
                      className={styles.textarea}
                      placeholder="Share what you thought about the product"
                      rows={5}
                      maxLength={2000}
                      required
                    />
                  </label>

                  <button type="submit" className="button button--primary button--subtle-lift">
                    Submit review
                  </button>
                </form>
              ) : (
                <p className={styles.reviewGate}>Only logged-in users can review this product.</p>
              )
            ) : (
              <p className={styles.reviewGate}>
                <Link href="/auth/login" className={styles.reviewLink}>
                  Log in
                </Link>{" "}
                to write a review.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
