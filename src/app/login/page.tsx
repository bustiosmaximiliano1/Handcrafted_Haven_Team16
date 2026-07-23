import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "@/app/auth-form.module.css";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className={`container ${styles.authMain}`}>
        <section className={`${styles.authCard} surface-card`}>
          <span className="section-label">Welcome Back</span>
          <h1 className={`page-title ${styles.authTitle}`}>Login</h1>

          <LoginForm />

          <p className={styles.authHelp}>
            No account? <Link href="/register/customer">Create one</Link>
          </p>
          <p className={styles.authHelp} style={{ marginTop: "0.5rem" }}>
            Want to sell? <Link href="/register/artisan">Become a seller</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}