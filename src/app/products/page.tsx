import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { images: true, category: true },
  });

  return (
    <>
      <Navbar />

      <main className="products-page">
        <h1>Our Handcrafted Products</h1>

        <div className="products-grid">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="product-card"
            >
              <img
                src={product.images[0]?.url || "/placeholder.png"}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p>${product.price.toString()}</p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}