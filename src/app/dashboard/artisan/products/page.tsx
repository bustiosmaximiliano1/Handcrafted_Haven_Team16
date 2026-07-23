import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { deleteOwnProduct } from "./actions";

export default async function ArtisanProductsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/login");
  }

  const products = await prisma.product.findMany({
    where: { artisanId: artisan.id },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>My Products</h1>
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
          <div className="surface-card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <th style={{ padding: "0.9rem" }}>Name</th>
                  <th style={{ padding: "0.9rem" }}>Category</th>
                  <th style={{ padding: "0.9rem" }}>Price</th>
                  <th style={{ padding: "0.9rem" }}>Stock</th>
                  <th style={{ padding: "0.9rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "0.9rem" }}>
                      <Link
                        href={`/products/${product.id}`}
                        style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "0.2em" }}
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td style={{ padding: "0.9rem", color: "var(--ink-soft)" }}>{product.category?.name || "Uncategorized"}</td>
                    <td style={{ padding: "0.9rem" }}>${product.price.toString()}</td>
                    <td style={{ padding: "0.9rem" }}>{product.stock}</td>
                    <td style={{ padding: "0.9rem" }}>
                      <div style={{ display: "flex", gap: "0.9rem", alignItems: "center", flexWrap: "wrap" }}>
                        <Link
                          href={`/dashboard/artisan/products/${product.id}/edit`}
                          style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "0.2em" }}
                        >
                          Edit
                        </Link>
                        <form action={deleteOwnProduct.bind(null, product.id)}>
                          <button
                            type="submit"
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#b42318",
                              cursor: "pointer",
                              textDecoration: "underline",
                              textUnderlineOffset: "0.2em",
                              padding: 0,
                              font: "inherit",
                            }}
                          >
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