import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

async function addToCart(formData: FormData) {
  "use server";

  const productId = formData.get("productId") as string;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
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
        <section className="surface-card" style={{ padding: "1.5rem" }}>
          <h1>{product.name}</h1>
          <p className="section-label" style={{ marginTop: "0.5rem", marginBottom: "1rem", textTransform: "uppercase" }}>
            {product.category?.name}
          </p>

          {product.images[0] && (
            <div className="product-detail__image-wrap" style={{ margin: "1rem 0" }}>
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                className="product-card__image"
              />
            </div>
          )}

          <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            ${product.price.toString()}
          </p>

          <p className="text-muted">{product.description}</p>

          <form action={addToCart}>
            <input type="hidden" name="productId" value={product.id} />
            <button type="submit" className="button button--primary" style={{ marginTop: "1rem" }}>
              Add to cart
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
