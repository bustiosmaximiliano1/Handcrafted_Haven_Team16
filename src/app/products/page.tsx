import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
    },
  });

  return (
    <>
      <Navbar />

      <main className="products-page" style={{ padding: "2rem" }}>
        <h1>Our Handcrafted Products</h1>

        <div
          className="products-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {products.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="product-card"
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "1rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={product.images[0]?.url || "/placeholder.png"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <h2 style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
                {product.name}
              </h2>
              <p style={{ fontWeight: "bold" }}>${product.price.toString()}</p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
