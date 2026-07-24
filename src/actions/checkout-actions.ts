"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkoutCartAction() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "CUSTOMER") {
    redirect("/products");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/dashboard/customer/cart");
  }

  const total = cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.product.price,
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  await prisma.cart.delete({
    where: { id: cart.id },
  });

  redirect(
    "/success?message=" +
      encodeURIComponent("Your order has been placed successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/customer/orders") +
      "&buttonText=" +
      encodeURIComponent("View Orders")
  );
}
