import { registerAction } from "../actions";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "@/app/auth-form.module.css";

export default function RegisterArtisanPage() {
  return (
    <>
      <Navbar />

      <main className={`container ${styles.authMain}`}>
        <section className={`${styles.authCard} surface-card`}>
          <span className="section-label">Become a Seller</span>
          <h1 className={`page-title ${styles.authTitle}`}>Create your artisan account</h1>

          <p className={`section-subtitle ${styles.authSubtitle}`}>
            Create an artisan account to manage your products, update your profile, and sell your handcrafted pieces.
          </p>

          <form action={registerAction} className={styles.authForm}>
            <input type="hidden" name="role" value="ARTISAN" />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="profileImageUrl">Profile Photo URL (optional)</label>
              <input type="url" id="profileImageUrl" name="profileImageUrl" placeholder="https://..." className={styles.input} />
            </div>

            <button type="submit" className={`button button--primary button--subtle-lift ${styles.submit}`}>
              Create Seller Account
            </button>
          </form>

          <p className={styles.authHelp}>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
          <p className={styles.authHelp} style={{ marginTop: "0.5rem" }}>
            Looking to buy? <Link href="/register/customer">Create a customer account</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
