import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/auth/auth-form.module.css";
import RegisterArtisanForm from "./artisan/RegisterArtisanForm";

export default function RegisterPage() {
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
        </section>
      </main>

      <Footer />
    </>
  );
}
