import { registerAction } from "../actions";
import styles from "@/app/page.module.css";

export default function RegisterCustomerPage() {
  return (
    <div className={styles.container} style={{ maxWidth: "460px", margin: "4rem auto", padding: "2rem" }}>
      <section className={styles.card}>
        <span className={styles.badge}>Create Account</span>
        <h1 className={styles.title} style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Create your customer account</h1>
        <p style={{ marginBottom: "1.5rem", color: "var(--ink-soft)" }}>
          Create a customer account to browse products, add items to your cart, and place orders.
        </p>

        <form action={registerAction} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <input type="hidden" name="role" value="CUSTOMER" />

          <div>
            <label className={styles.label} htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", marginTop: "0.4rem" }} />
          </div>

          <div>
            <label className={styles.label} htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", marginTop: "0.4rem" }} />
          </div>

          <div>
            <label className={styles.label} htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", marginTop: "0.4rem" }} />
          </div>

          <button type="submit" className={styles.submitBtn} style={{ marginTop: "1rem" }}>
            Create Customer Account
          </button>
        </form>
      </section>
    </div>
  );
}
