import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/ProductForm/ProductForm";
import { prisma } from "@/lib/prisma";
import { updateOwnProductAction } from "@/actions/product-actions";
import styles from "./page.module.css";

interface EditProductProps {
  params: Promise<{ id: string }>;
}

export default async function EditArtisanProductPage({ params }: EditProductProps) {
  const { id } = await params;
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

  const product = await prisma.product.findFirst({
    where: {
      id,
      artisanId: artisan.id,
    },
    include: {
      images: true,
    },
  });

  if (!product) {
    notFound();
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
          Edit Product
        </h1>

        <ProductForm
          initialData={product}
          categories={categories}
          defaultArtisanId={artisan.id}
          action={updateOwnProductAction}
          buttonText="Save Changes"
        />
      </main>
      <Footer />
    </>
  );
}