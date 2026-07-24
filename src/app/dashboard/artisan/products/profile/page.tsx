import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { updateArtisanProfileAction } from "@/actions/profile-actions";
import styles from "./ProfilePage.module.css";

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

          <form action={updateArtisanProfileAction} className={styles.form}>
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