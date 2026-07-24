import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function CustomerOrdersPage() {
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

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />

      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Your Orders</h1>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <div className={styles.grid}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <strong>Order #{order.id.slice(0, 8)}</strong>
                <p>Status: {order.status}</p>
                <p>Total: ${Number(order.total).toFixed(2)}</p>
                <div>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.product.name} × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
