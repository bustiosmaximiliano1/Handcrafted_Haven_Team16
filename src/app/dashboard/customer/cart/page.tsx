import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { checkoutCartAction } from "@/actions/checkout-actions";
import styles from "./page.module.css";

export default async function CustomerCartPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
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

      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Your Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className={styles.grid}>
            {cart.items.map((item) => (
              <div key={item.id} className={styles.item}>
                <strong>{item.product.name}</strong>
                <p className={styles.itemText}>
                  Quantity: {item.quantity} · Price: ${item.product.price.toString()}
                </p>
              </div>
            ))}

            <div className={styles.total}>Total: ${total.toFixed(2)}</div>

            <form action={checkoutCartAction}>
              <button type="submit" className={styles.checkoutButton}>
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
