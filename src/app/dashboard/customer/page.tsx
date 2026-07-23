import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function CustomerDashboardPage() {
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

  return (
    <>
      <Navbar />

      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Customer Dashboard</h1>
        <p className={styles.subtitle}>
          Welcome back to Handcrafted Haven. Explore handcrafted products and artisan stories.
        </p>

        <div className={styles.grid}>
          <Link href="/products" className={styles.cardLink}>
            <strong>Shop Products</strong>
            <p className={styles.cardText}>Browse the full catalog and discover handmade pieces.</p>
          </Link>

          <Link href="/artisans" className={styles.cardLink}>
            <strong>Meet Artisans</strong>
            <p className={styles.cardText}>Discover the makers behind the collections.</p>
          </Link>

          <div className={styles.card}>
            <strong>Your Account</strong>
            <p className={styles.cardText}>Use your customer profile to keep browsing and exploring the marketplace.</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
