import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProduct } from "./actions";
import styles from "./page.module.css";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/products");
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
      artisan: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />

      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Admin Products</h1>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <strong>{product.name}</strong>
              <span>Category: {product.category?.name || "Uncategorized"}</span>
              <span>Artisan: {product.artisan?.name || "Unknown"}</span>
              <span>Price: ${product.price.toString()}</span>
              <span>Stock: {product.stock}</span>
              <div className={styles.actions}>
                <Link href={`/dashboard/admin/products/${product.id}/edit`}>Edit product</Link>
                <form action={deleteProduct.bind(null, product.id)}>
                  <button type="submit" className={styles.deleteButton}>
                    Delete product
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
