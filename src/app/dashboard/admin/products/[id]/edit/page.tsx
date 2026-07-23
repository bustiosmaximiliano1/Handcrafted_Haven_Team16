import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/ProductForm/ProductForm";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client"; // <-- Importamos Role
import { notFound } from "next/navigation";
import { updateProduct } from "../../actions";
import styles from "./page.module.css";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const [product, categories, artisans] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { category: true, artisan: true },
    }),
    prisma.category.findMany(),
    prisma.user.findMany({
      where: { role: Role.ARTISAN }, // <-- Usamos el enum directamente
      select: { id: true, name: true },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <>
      <Navbar />

      <main className={`container ${styles.main}`}>
        <h1 className="page-title">Edit Product</h1>

        <ProductForm
          initialData={product}
          categories={categories}
          artisans={artisans}
          action={updateProductWithId}
          buttonText="Save Changes"
        />
      </main>

      <Footer />
    </>
  );
}