import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/ProductForm/ProductForm";
import { prisma } from "@/lib/prisma";
import { normalizeProductImageUrl } from "@/lib/product-image-url";

export default async function NewArtisanProductPage() {
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

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  async function createProduct(formData: FormData) {
    "use server";

    if (!artisan) return;

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const normalizedImageUrl = normalizeProductImageUrl(imageUrl);

    await prisma.product.create({
      data: {
        name,
        price,
        stock,
        description,
        categoryId: categoryId || null,
        artisanId: artisan.id,
        images: normalizedImageUrl
          ? {
              create: [{ url: normalizedImageUrl }],
            }
          : undefined,
      },
    });

    revalidatePath("/dashboard/artisan/products");
    redirect(
      "/success?message=" +
        encodeURIComponent("Your product was created successfully.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem" }}>
          Add New Product
        </h1>

        <ProductForm
          categories={categories}
          defaultArtisanId={artisan.id}
          action={createProduct}
          buttonText="Save Product"
        />
      </main>
      <Footer />
    </>
  );
}