import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/page.module.css";

export default function LogoutPage() {
  return (
    <>
      <Navbar />

      <main className="container" style={{ maxWidth: "560px", margin: "3.5rem auto", paddingInline: "1.5rem" }}>
        <section className={styles.card}>
          <span className={styles.badge}>Session Ended</span>
          <h1 className={styles.title} style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            You are now logged out
          </h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: "1.5rem" }}>
            Thanks for visiting Handcrafted Haven.
          </p>

          <Link href="/login" className={styles.submitBtn} style={{ display: "inline-flex", justifyContent: "center" }}>
            Sign in again
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
