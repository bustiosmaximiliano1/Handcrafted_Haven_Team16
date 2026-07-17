import Link from "next/link";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 id="cta-title" className={styles.title}>
            Make things? Open your shop.
          </h2>
          <p className={styles.text}>
            Set up a seller profile, tell your story, and list your work. Keep
            more of every sale.
          </p>
        </div>
        <Link href="/register" className={styles.button}>
          Become a seller
        </Link>
      </div>
    </section>
  );
}
