import { loginAction } from "./actions";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/page.module.css";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="container" style={{ maxWidth: "560px", margin: "3.5rem auto", paddingInline: "1.5rem" }}>
        <section className={styles.card}>
          <span className={styles.badge}>Welcome Back</span>
          <h1 className={styles.title} style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Login</h1>

          <form action={loginAction} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
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
              Sign In
            </button>
          </form>

          <p style={{ marginTop: "1.25rem", textAlign: "center", color: "var(--ink-soft)" }}>
            No account? <a href="/register/customer" style={{ color: "var(--pine)", fontWeight: 600 }}>Create one</a>
          </p>
          <p style={{ marginTop: "0.5rem", textAlign: "center", color: "var(--ink-soft)" }}>
            Want to sell? <a href="/register/artisan" style={{ color: "var(--pine)", fontWeight: 600 }}>Become a seller</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}