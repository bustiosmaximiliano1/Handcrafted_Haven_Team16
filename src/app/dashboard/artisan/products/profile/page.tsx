import { prisma } from "@/lib/prisma";
import { normalizeProfileImageUrl } from "@/lib/profile-image-url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./ProfilePage.module.css";

// Server Action to update the profile
async function updateProfile(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const profileImageUrlInput = formData.get("profileImageUrl") as string | null;

  if (!userId) return;

  const normalizedProfileImageUrl = normalizeProfileImageUrl(profileImageUrlInput);

  if (profileImageUrlInput?.trim() && !normalizedProfileImageUrl) {
    throw new Error("Please provide a valid profile image URL.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      bio,
      profileImageUrl: normalizedProfileImageUrl,
    },
  });

  redirect("/success?message=Your%20changes%20have%20been%20saved%20successfully.&redirect=/dashboard/artisan/products&buttonText=Return%20to%20Dashboard");
}

export default async function ArtisanProfileEditPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

  return (
    <>
      <Navbar />
      <main className={`container ${styles.main}`}>
        <section className={styles.card}>
          <span className="section-label">Account Settings</span>
          <h1 className={`page-title ${styles.title}`}>Edit Your Artisan Profile</h1>
          <p className={`section-subtitle ${styles.subtitle}`}>
            Update your public name and share your story with customers visiting your profile.
          </p>

          <form action={updateProfile} className={styles.form}>
            <input type="hidden" name="userId" value={artisan.id} />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Artisan Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={artisan.name || ""}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="bio">
                Our Story & Craft (Bio)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={6}
                defaultValue={artisan.bio || ""}
                placeholder="Tell customers about your background, materials, and passion for crafting..."
                className={styles.textarea}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="profileImageUrl">
                Profile Photo URL
              </label>
              <input
                type="url"
                id="profileImageUrl"
                name="profileImageUrl"
                defaultValue={artisan.profileImageUrl || ""}
                placeholder="https://..."
                className={styles.input}
              />
            </div>

            <button type="submit" className={`button button--primary button--subtle-lift ${styles.submit}`}>
              Save Changes
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}