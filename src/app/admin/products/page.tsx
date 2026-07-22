import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
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

      <main className="container" style={{ paddingBlock: "3rem" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Admin Products</h1>

        <div style={{ display: "grid", gap: "1rem" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem",
                display: "grid",
                gap: "0.35rem",
              }}
            >
              <strong>{product.name}</strong>
              <span>Category: {product.category?.name || "Uncategorized"}</span>
              <span>Artisan: {product.artisan?.name || "Unknown"}</span>
              <span>Price: ${product.price.toString()}</span>
              <span>Stock: {product.stock}</span>
              <Link href={`/admin/products/${product.id}/edit`}>Edit product</Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
