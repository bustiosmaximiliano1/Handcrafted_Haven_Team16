import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main
        className="product-detail-page"
        style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}
      >
        <h1>{product.name}</h1>
        <p style={{ color: "#666", textTransform: "uppercase" }}>
          {product.category?.name}
        </p>

        {product.images[0] && (
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              margin: "1rem 0",
            }}
          />
        )}

        <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          ${product.price.toString()}
        </p>

        <p>{product.description}</p>
      </main>

      <Footer />
    </>
  );
}
