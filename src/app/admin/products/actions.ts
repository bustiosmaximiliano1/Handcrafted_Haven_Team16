"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { normalizeProductImageUrl } from "@/lib/product-image-url";

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const categoryId = formData.get("categoryId") as string;
  const artisanId = formData.get("artisanId") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const normalizedImageUrl = normalizeProductImageUrl(imageUrl);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      stock,
      categoryId: categoryId || null,
      artisanId: artisanId || null,
      images: normalizedImageUrl
        ? {
            deleteMany: {},
            create: [{ url: normalizedImageUrl }],
          }
        : undefined,
    },
  });

  revalidatePath(`/products/${id}`);
  revalidatePath("/products");
  revalidatePath("/artisans");

  redirect(
    "/success?message=" +
      encodeURIComponent("The product was updated successfully.") +
      "&redirect=" +
      encodeURIComponent("/admin/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Admin Dashboard")
  );
}