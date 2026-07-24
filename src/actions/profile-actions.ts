"use server";

import { prisma } from "@/lib/prisma";
import { normalizeProfileImageUrl } from "@/lib/profile-image-url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateArtisanProfileAction(formData: FormData) {
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
  const bio = formData.get("bio") as string;
  const profileImageUrlInput = formData.get("profileImageUrl") as string | null;

  const normalizedProfileImageUrl = normalizeProfileImageUrl(profileImageUrlInput);

  if (profileImageUrlInput?.trim() && !normalizedProfileImageUrl) {
    throw new Error("Please provide a valid profile image URL.");
  }

  await prisma.user.update({
    where: { id: artisan.id },
    data: {
      name,
      bio,
      profileImageUrl: normalizedProfileImageUrl,
    },
  });

  redirect(
    "/success?message=" +
      encodeURIComponent("Your changes have been saved successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/artisan/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Dashboard")
  );
}
