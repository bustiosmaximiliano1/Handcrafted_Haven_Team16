import { prisma } from "@/lib/prisma";
import { normalizeProfileImageUrl } from "@/lib/profile-image-url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/page.module.css";

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

  redirect("/success?message=Your%20changes%20have%20been%20saved%20successfully.&redirect=/artisan/products&buttonText=Return%20to%20Dashboard");
}

export default async function ArtisanProfileEditPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{ maxWidth: "760px", margin: "3.5rem auto", paddingInline: "1.5rem" }}>
        <section
          className={styles.card}
          style={{ border: "none", boxShadow: "none", background: "transparent", padding: 0 }}
        >
          <span className="section-label">Account Settings</span>
          <h1 className="page-title" style={{ marginTop: "0.8rem" }}>Edit Your Artisan Profile</h1>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
            Update your public name and share your story with customers visiting your profile.
          </p>

          <form action={updateProfile} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <input type="hidden" name="userId" value={artisan.id} />

            <div>
              <label className={styles.label} htmlFor="name">
                Artisan Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={artisan.name || ""}
                required
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  fontSize: "1rem",
                  marginTop: "0.5rem",
                }}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="bio">
                Our Story & Craft (Bio)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={6}
                defaultValue={artisan.bio || ""}
                placeholder="Tell customers about your background, materials, and passion for crafting..."
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  fontSize: "1rem",
                  marginTop: "0.5rem",
                  fontFamily: "inherit",
                  lineHeight: "1.6",
                }}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="profileImageUrl">
                Profile Photo URL
              </label>
              <input
                type="url"
                id="profileImageUrl"
                name="profileImageUrl"
                defaultValue={artisan.profileImageUrl || ""}
                placeholder="https://..."
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  fontSize: "1rem",
                  marginTop: "0.5rem",
                }}
              />
            </div>

            <button type="submit" className="button button--primary button--subtle-lift" style={{ alignSelf: "flex-start" }}>
              Save Changes
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}