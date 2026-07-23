import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function CustomerProfilePage() {
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
        <h1 className="page-title">My Profile</h1>
        <div className={`surface-card ${styles.card}`}>
          <p><strong>Name:</strong> {user.name || "—"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
