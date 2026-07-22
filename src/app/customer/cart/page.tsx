import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { checkoutCartAction } from "./actions";

export default async function CustomerCartPage() {
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

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const total = cart?.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0) ?? 0;

  return (
    <>
      <Navbar />

      <main className="container" style={{ paddingBlock: "3rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>Your Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {cart.items.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                <strong>{item.product.name}</strong>
                <p style={{ marginBottom: 0 }}>
                  Quantity: {item.quantity} · Price: ${item.product.price.toString()}
                </p>
              </div>
            ))}

            <div style={{ fontWeight: 700, marginTop: "0.5rem" }}>Total: ${total.toFixed(2)}</div>

            <form action={checkoutCartAction}>
              <button
                type="submit"
                style={{
                  marginTop: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "999px",
                  background: "var(--pine)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Checkout
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
