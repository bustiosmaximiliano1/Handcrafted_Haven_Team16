import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/ProductForm/ProductForm";
import { prisma } from "@/lib/prisma";
import { createOwnProductAction } from "@/actions/product-actions";
import styles from "./page.module.css";

export default async function NewArtisanProductPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Add New Product
        </h1>

        <ProductForm
          categories={categories}
          defaultArtisanId={artisan.id}
          action={createOwnProductAction}
          buttonText="Save Product"
        />
      </main>
      <Footer />
    </>
  );
}