"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { normalizeProductImageUrl } from "@/lib/product-image-url";

export async function createOwnProductAction(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

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
  revalidatePath("/products");

  redirect(
    "/success?message=" +
      encodeURIComponent("Your product was created successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/artisan/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Dashboard")
  );
}

export async function updateOwnProductAction(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

  const productId = formData.get("productId") as string;

  if (!productId) {
    redirect("/dashboard/artisan/products");
  }

  const ownedProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      artisanId: artisan.id,
    },
    select: { id: true },
  });

  if (!ownedProduct) {
    redirect(
      "/success?message=" +
        encodeURIComponent("You can only edit your own products.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const normalizedImageUrl = normalizeProductImageUrl(imageUrl);

  await prisma.product.update({
    where: { id: ownedProduct.id },
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

  revalidatePath("/dashboard/artisan/products");
  revalidatePath(`/products/${ownedProduct.id}`);
  revalidatePath("/products");

  redirect(
    "/success?message=" +
      encodeURIComponent("Your product was updated successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/artisan/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Dashboard")
  );
}

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
      encodeURIComponent("/dashboard/admin/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Admin Dashboard")
  );
}

export async function deleteProduct(id: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/products");
  }

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });

  if (!product) {
    redirect(
      "/success?message=" +
        encodeURIComponent("The product no longer exists.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/admin/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Admin Dashboard")
    );
  }

  if (product._count.orderItems > 0) {
    redirect(
      "/success?message=" +
        encodeURIComponent("This product cannot be deleted because it is already part of one or more orders.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/admin/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Admin Dashboard")
    );
  }

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/dashboard/admin/products");
  revalidatePath("/products");
  revalidatePath("/artisans");

  redirect(
    "/success?message=" +
      encodeURIComponent("The product was deleted successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/admin/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Admin Dashboard")
  );
}

export async function deleteOwnProduct(id: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

  const product = await prisma.product.findFirst({
    where: {
      id,
      artisanId: artisan.id,
    },
    select: {
      id: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });

  if (!product) {
    redirect(
      "/success?message=" +
        encodeURIComponent("You can only delete your own products.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  if (product._count.orderItems > 0) {
    redirect(
      "/success?message=" +
        encodeURIComponent("This product cannot be deleted because it is already part of one or more orders.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  await prisma.product.delete({
    where: { id: product.id },
  });

  revalidatePath("/dashboard/artisan/products");
  revalidatePath("/products");
  revalidatePath("/artisans");

  redirect(
    "/success?message=" +
      encodeURIComponent("Your product was deleted successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/artisan/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Dashboard")
  );
}
