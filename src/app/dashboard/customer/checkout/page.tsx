import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { checkoutCartAction } from "@/actions/checkout-actions";
import styles from "./page.module.css";

export default async function CustomerCheckoutPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role === "ADMIN") {
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

  if (!cart || cart.items.length === 0) {
    redirect("/dashboard/customer/cart");
  }

  const total = cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  return (
    <>
      <Navbar />

      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.subtitle}>Review your order before placing it.</p>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Order summary</h2>

          <div className={styles.items}>
            {cart.items.map((item) => (
              <div key={item.id} className={styles.item}>
                <strong>{item.product.name}</strong>
                <p className={styles.itemText}>
                  Qty: {item.quantity} · Unit: ${item.product.price.toString()}
                </p>
              </div>
            ))}
          </div>

          <p className={styles.total}>Total: ${total.toFixed(2)}</p>

          <div className={styles.actions}>
            <Link href="/dashboard/customer/cart" className={styles.backLink}>
              Back to cart
            </Link>

            <form action={checkoutCartAction}>
              <button type="submit" className={styles.checkoutButton}>
                Place order
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
