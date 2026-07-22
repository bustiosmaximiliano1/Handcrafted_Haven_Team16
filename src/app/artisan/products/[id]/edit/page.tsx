import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/ProductForm/ProductForm";
import { prisma } from "@/lib/prisma";
import { normalizeProductImageUrl } from "@/lib/product-image-url";

interface EditProductProps {
  params: Promise<{ id: string }>;
}

export default async function EditArtisanProductPage({ params }: EditProductProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/login");
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

  async function updateProduct(formData: FormData) {
    "use server";

    if (!artisan) return;

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const normalizedImageUrl = normalizeProductImageUrl(imageUrl);

    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        description,
        categoryId: categoryId || null,
        images: normalizedImageUrl
          ? {
              deleteMany: {},
              create: [{ url: normalizedImageUrl }],
            }
          : undefined,
      },
    });

    revalidatePath("/artisan/products");
    redirect(
      "/success?message=" +
        encodeURIComponent("Your product was updated successfully.") +
        "&redirect=" +
        encodeURIComponent("/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem" }}>
          Edit Product
        </h1>

        <ProductForm
          initialData={product}
          categories={categories}
          defaultArtisanId={artisan.id}
          action={updateProduct}
          buttonText="Save Changes"
        />
      </main>
      <Footer />
    </>
  );
}