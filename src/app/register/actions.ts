"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { normalizeProfileImageUrl } from "@/lib/profile-image-url";

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const roleValue = (formData.get("role") as string) || "CUSTOMER";
  const profileImageUrlInput = formData.get("profileImageUrl") as string | null;

  if (!name || !email || !password) {
    throw new Error("Please provide your name, email, and password.");
  }

  const role = roleValue === "ARTISAN" ? Role.ARTISAN : Role.CUSTOMER;
  const normalizedProfileImageUrl = normalizeProfileImageUrl(profileImageUrlInput);

  if (profileImageUrlInput?.trim() && !normalizedProfileImageUrl) {
    throw new Error("Please provide a valid profile image URL.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("An account with that email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role,
      profileImageUrl: role === Role.ARTISAN ? normalizedProfileImageUrl : null,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  if (role === Role.ARTISAN) {
    redirect(
      "/success?message=" +
        encodeURIComponent("Your artisan account has been created successfully.") +
        "&redirect=" +
        encodeURIComponent("/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard")
    );
  }

  redirect(
    "/success?message=" +
      encodeURIComponent("Your customer account has been created successfully.") +
      "&redirect=" +
      encodeURIComponent("/customer") +
      "&buttonText=" +
      encodeURIComponent("Go to Dashboard")
  );
}
