import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";

export default async function CustomerDashboardPage() {
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

  return (
    <>
      <Navbar />

      <main className="container" style={{ paddingBlock: "3rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>Customer Dashboard</h1>
        <p style={{ marginBottom: "2rem", color: "var(--ink-soft)" }}>
          Welcome back to Handcrafted Haven. Explore handcrafted products and artisan stories.
        </p>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          <Link
            href="/products"
            style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1rem", textDecoration: "none", color: "inherit" }}
          >
            <strong>Shop Products</strong>
            <p style={{ marginBottom: 0 }}>Browse the full catalog and discover handmade pieces.</p>
          </Link>

          <Link
            href="/artisans"
            style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1rem", textDecoration: "none", color: "inherit" }}
          >
            <strong>Meet Artisans</strong>
            <p style={{ marginBottom: 0 }}>Discover the makers behind the collections.</p>
          </Link>

          <div
            style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1rem" }}
          >
            <strong>Your Account</strong>
            <p style={{ marginBottom: 0 }}>Use your customer profile to keep browsing and exploring the marketplace.</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
