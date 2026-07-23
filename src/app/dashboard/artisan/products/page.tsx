import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { deleteOwnProduct } from "./actions";
import styles from "./page.module.css";

export default async function ArtisanProductsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

  const products = await prisma.product.findMany({
    where: { artisanId: artisan.id },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={`page-title ${styles.title}`}>My Products</h1>
          <Link
            href="/dashboard/artisan/products/new"
            className="button button--primary"
          >
            + Add New Product
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="section-subtitle">You have not added any products yet.</p>
        ) : (
          <div className={`surface-card ${styles.tableWrap}`}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.row}>
                  <th className={styles.cell}>Name</th>
                  <th className={styles.cell}>Category</th>
                  <th className={styles.cell}>Price</th>
                  <th className={styles.cell}>Stock</th>
                  <th className={styles.cell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={styles.row}>
                    <td className={styles.cell}>
                      <Link href={`/products/${product.id}`} className={styles.productLink}>
                        {product.name}
                      </Link>
                    </td>
                    <td className={`${styles.cell} ${styles.muted}`}>{product.category?.name || "Uncategorized"}</td>
                    <td className={styles.cell}>${product.price.toString()}</td>
                    <td className={styles.cell}>{product.stock}</td>
                    <td className={styles.cell}>
                      <div className={styles.actions}>
                        <Link href={`/dashboard/artisan/products/${product.id}/edit`} className={styles.editLink}>
                          Edit
                        </Link>
                        <form action={deleteOwnProduct.bind(null, product.id)}>
                          <button type="submit" className={styles.deleteButton}>
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}