import { registerAction } from "../actions";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "@/app/auth/auth-form.module.css";

export default function RegisterCustomerPage() {
  return (
    <>
      <Navbar />

      <main className={`container ${styles.authMain}`}>
        <section className={`${styles.authCard} surface-card`}>
          <span className="section-label">Create Account</span>
          <h1 className={`page-title ${styles.authTitle}`}>Create your customer account</h1>
          <p className={`section-subtitle ${styles.authSubtitle}`}>
            Create a customer account to browse products, add items to your cart, and place orders.
          </p>

          <form action={registerAction} className={styles.authForm}>
            <input type="hidden" name="role" value="CUSTOMER" />

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

            <button type="submit" className={`button button--primary button--subtle-lift ${styles.submit}`}>
              Create Customer Account
            </button>
          </form>

          <p className={styles.authHelp}>
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </p>
          <p className={`${styles.authHelp} ${styles.authHelpSecondary}`}>
            Want to sell? <Link href="/auth/register/artisan">Become a seller</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
