import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "@/app/auth/auth-form.module.css";
import RegisterArtisanForm from "./RegisterArtisanForm";

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

          <RegisterArtisanForm />

          <p className={styles.authHelp}>
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </p>
          <p className={`${styles.authHelp} ${styles.authHelpSecondary}`}>
            Looking to buy? <Link href="/auth/register/customer">Create a customer account</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
