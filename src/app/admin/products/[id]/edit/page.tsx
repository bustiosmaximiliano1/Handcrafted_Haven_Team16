import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/ProductForm/ProductForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProduct } from "../../actions";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { category: true },
    }),
    prisma.category.findMany(),
  ]);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <>
      <Navbar />

      <main className="container" style={{ paddingBlock: "3rem" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Edit Product</h1>
        
        <ProductForm
          initialData={product}
          categories={categories}
          action={updateProductWithId}
          buttonText="Save Changes"
        />
      </main>

      <Footer />
    </>
  );
}