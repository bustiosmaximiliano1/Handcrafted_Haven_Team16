"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Please provide both email and password.");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password.");
  }

  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  if (user.role === Role.ARTISAN) {
    redirect(
      "/success?message=" +
        encodeURIComponent("You have logged in successfully.") +
        "&redirect=" +
        encodeURIComponent("/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  if (user.role === Role.ADMIN) {
    redirect(
      "/success?message=" +
        encodeURIComponent("You have logged in successfully.") +
        "&redirect=" +
        encodeURIComponent("/admin/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Admin Dashboard")
    );
  }

  redirect(
    "/success?message=" +
      encodeURIComponent("You have logged in successfully.") +
      "&redirect=" +
      encodeURIComponent("/customer") +
      "&buttonText=" +
      encodeURIComponent("Go to Dashboard")
  );
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");

  redirect("/login");
}