import { registerAction } from "./actions";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/page.module.css";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main className="container" style={{ maxWidth: "560px", margin: "3.5rem auto", paddingInline: "1.5rem" }}>
        <section className={styles.card}>
          <span className={styles.badge}>Become a Seller</span>
          <h1 className={styles.title} style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Create your artisan account</h1>

          <form action={registerAction} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label className={styles.label} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  marginTop: "0.4rem",
                }}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  marginTop: "0.4rem",
                }}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  marginTop: "0.4rem",
                }}
              />
            </div>

            <button type="submit" className={styles.submitBtn} style={{ marginTop: "1rem" }}>
              Create Seller Account
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
