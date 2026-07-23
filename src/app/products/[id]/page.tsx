import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDetail.module.css";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

async function addToCart(formData: FormData) {
  "use server";

  const productId = formData.get("productId") as string;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "CUSTOMER") {
    redirect("/products");
  }

  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity: 1,
    },
  });

  redirect("/dashboard/customer/cart");
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
              <form action={addToCart}>
                <input type="hidden" name="productId" value={product.id} />
                <button type="submit" className="button button--primary button--subtle-lift">
                  Add to cart
                </button>
              </form>

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
