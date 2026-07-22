import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";

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
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700" }}>My Products</h1>
          <Link
            href="/artisan/products/new"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "0.375rem",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            + Add New Product
          </Link>
        </div>

        {products.length === 0 ? (
          <p>You have not added any products yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "0.75rem" }}>Name</th>
                <th style={{ padding: "0.75rem" }}>Category</th>
                <th style={{ padding: "0.75rem" }}>Price</th>
                <th style={{ padding: "0.75rem" }}>Stock</th>
                <th style={{ padding: "0.75rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "0.75rem" }}>{product.name}</td>
                  <td style={{ padding: "0.75rem" }}>{product.category?.name || "Uncategorized"}</td>
                  <td style={{ padding: "0.75rem" }}>${product.price.toString()}</td>
                  <td style={{ padding: "0.75rem" }}>{product.stock}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <Link
                      href={`/artisan/products/${product.id}/edit`}
                      style={{ color: "#2563eb", fontWeight: "500", textDecoration: "none" }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </>
  );
}