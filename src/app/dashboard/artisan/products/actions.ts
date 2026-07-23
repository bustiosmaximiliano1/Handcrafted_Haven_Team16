"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteOwnProduct(id: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/login");
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
