"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReviewAction(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
    },
  });

  if (!user) {
    redirect("/products");
  }

  const productId = formData.get("productId") as string;
  const ratingValue = Number(formData.get("rating"));
  const titleInput = formData.get("title");
  const bodyInput = formData.get("body");

  const title = typeof titleInput === "string" ? titleInput.trim() : "";
  const body = typeof bodyInput === "string" ? bodyInput.trim() : "";

  if (!productId || !Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5 || !body) {
    redirect(`/products/${productId || ""}`);
  }

  await prisma.review.create({
    data: {
      productId,
      userId: user.id,
      rating: ratingValue,
      title: title || null,
      body,
    },
  });

  revalidatePath(`/products/${productId}`);

  redirect(`/products/${productId}`);
}