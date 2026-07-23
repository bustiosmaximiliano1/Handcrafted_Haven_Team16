import { loginAction } from "./actions";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "@/app/auth-form.module.css";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className={`container ${styles.authMain}`}>
        <section className={`${styles.authCard} surface-card`}>
          <span className="section-label">Welcome Back</span>
          <h1 className={`page-title ${styles.authTitle}`}>Login</h1>

          <form action={loginAction} className={styles.authForm}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required className={styles.input} />
            </div>

            <button type="submit" className={`button button--primary button--subtle-lift ${styles.submit}`}>
              Sign In
            </button>
          </form>

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