import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

// Explicit interfaces to satisfy strict TypeScript checks
interface ProductImage {
  id: string;
  url: string;
}

interface ProductCategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: { toString(): string } | number | string;
  description?: string | null;
  images: ProductImage[];
  category?: ProductCategory | null;
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const activeCategory = params.category?.trim().toLowerCase();
  const query = params.q?.trim();

  const filters = [];

  if (activeCategory) {
    filters.push({
      category: {
        name: {
          equals: activeCategory,
          mode: "insensitive" as const,
        },
      },
    });
  }

  if (query) {
    filters.push({
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
        {
          category: {
            name: {
              contains: query,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    });
  }

  const products = await prisma.product.findMany({
    where: filters.length > 0 ? { AND: filters } : undefined,
    include: {
      images: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />

      <main className={`products-page ${styles.main}`}>
        <h1 className="page-title">Our Handcrafted Products</h1>
        <p className="section-subtitle">
          {activeCategory && query
            ? `Showing results for "${query}" in ${activeCategory}.`
            : activeCategory
              ? `Showing ${activeCategory} pieces from independent makers.`
              : query
                ? `Showing results for "${query}".`
                : "Discover handmade pieces created by independent makers and small-batch artisans."}
        </p>

        {(activeCategory || query) && (
          <div className={styles.clearFilterWrap}>
            <Link href="/products" className={`button button--secondary ${styles.clearFilterButton}`}>
              Clear filters
            </Link>
          </div>
        )}

        <div className="products-grid">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="product-card"
            >
              {product.images[0]?.url ? (
                <div className="product-card__image-wrap">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1120px) 50vw, 33vw"
                    className="product-card__image"
                  />
                </div>
              ) : (
                <div className="product-card__placeholder" aria-hidden="true">
                  No image yet
                </div>
              )}
              <h2 className="product-card__title">{product.name}</h2>
              <p className="product-card__price">${product.price.toString()}</p>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <p className={`section-subtitle ${styles.emptyState}`}>
            No products found with the current filters.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
